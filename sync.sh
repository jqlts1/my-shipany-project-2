#!/bin/bash
# PROTECTED_PATHS 可以自定义排除文件

# --- 配置区域 ---
# 你的本地分支 (通常建议设置为 dev 或 main)
MY_BRANCH="dev"
# 原作者的分支 (通常是 main 或 master)
TARGET_BRANCH="dev"
# 默认的上游仓库地址
DEFAULT_UPSTREAM_URL="git@github.com:shipanyai/shipany-template-two.git"
HTTPS_UPSTREAM_URL="https://github.com/shipanyai/shipany-template-two.git"

echo "========================================"
echo "🛠️  正在检查仓库环境..."
echo "========================================"

# --- 1. 检查/初始化 Git ---
if [ ! -d ".git" ]; then
    echo "⚠️  未检测到 Git 仓库，正在初始化..."
    git init
    git branch -M $MY_BRANCH
    
    # 添加上游
    echo "🔗 添加默认上游: $DEFAULT_UPSTREAM_URL"
    git remote add upstream "$DEFAULT_UPSTREAM_URL"
    
    # 获取上游历史以建立基准
    echo "📥 获取上游代码历史..."
    git fetch upstream
    
    # 重置到上游状态，保留本地文件修改
    echo "🔄 重置本地历史到 upstream/$TARGET_BRANCH..."
    git reset --mixed "upstream/$TARGET_BRANCH"
    
    echo "📦 提交当前本地文件..."
    git add .
    git commit -m "Initial setup: Sync with upstream template"
    
    echo "✅ Git 初始化完成，基准已建立。"
else
    echo "✅ Git 已初始化。"
fi

# --- 2. 确保 Upstream 存在 ---
if ! git remote | grep -q "upstream"; then
    echo "⚠️  未检测到 upstream，正在添加..."
    git remote add upstream "$DEFAULT_UPSTREAM_URL"
    echo "✅ Upstream 已添加。"
fi

# --- 3. 确保 Origin 存在 (Github) ---

# [新增] 检查 Origin 是否错误地指向了官方模板（这会导致无权限推送）
ORIGIN_URL=$(git remote get-url origin 2>/dev/null)

# 更加宽松的检查：只要 URL 里包含 shipanyai/shipany-template-two 就认为是错的
if [[ "$ORIGIN_URL" == *"shipanyai/shipany-template-two"* ]]; then
    echo "⚠️  检测到 origin 指向了官方只读模板 ($ORIGIN_URL)。"
    echo "🔧 正在移除错误的 remote origin..."
    git remote remove origin
fi

if ! git remote | grep -q "origin"; then
    echo "⚠️  未检测到 remote origin (你的远程仓库)。"
    
    # 尝试使用 GitHub CLI (gh) 自动创建
    if command -v gh &> /dev/null; then
        # 检查是否已登录
        if gh auth status &> /dev/null; then
            echo "🤖 GitHub CLI 已就绪，正在自动创建远程仓库..."
            REPO_NAME=$(basename "$PWD")
            
            echo "   目标仓库名: $REPO_NAME"
            echo "   正在创建并推送..."
            
            if gh repo create "$REPO_NAME" --public --source=. --remote=origin; then
                echo "🎉 GitHub 仓库 '$REPO_NAME' 创建成功并已关联！"
            else
                echo "❌ 自动创建失败。"
                echo "   请尝试手动创建仓库，然后运行: git remote add origin <URL>"
                exit 1
            fi
        else
            echo "⚠️  检测到 GitHub CLI (gh)，但似乎未登录。"
            echo "   💡 温馨提示：请运行 'gh auth login' 登录 GitHub，"
            echo "      然后再次运行此脚本，即可体验一键自动建库！"
            echo ""
            exit 1
        fi
    else
        echo "❌ 未找到 GitHub CLI (gh)。无法自动创建仓库。"
        echo "   💡 温馨提示：推荐安装 gh (运行 'brew install gh') 以启用自动建库功能。"
        echo "      如果不安装，请手动在 GitHub 创建仓库，然后运行："
        echo "      git remote add origin <你的git地址>"
        exit 1
    fi
else
    echo "✅ Origin 已存在: $(git remote get-url origin)"
fi

echo ""

# --- 3.5. 检查并保存本地修改 ---
# 在拉取之前，必须保证工作区是干净的，否则 rebase 会失败
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  检测到本地有未提交的修改（或新文件）。"
    echo "📦 正在自动提交这些修改，以便进行同步..."
    
    git add .
    if git commit -m "chore: save local changes before sync"; then
        echo "✅ 本地修改已保存。"
    else
        echo "⚠️  提交因为某些原因没东西可提交（可能是空改动），继续..."
    fi
else
    echo "✅ 工作区干净，准备同步。"
fi

# --- [新增] 保护特定目录不被覆盖/合并 ---
# 这里配置你不希望被 upstream 更新影响的目录或文件
# 例如: "src/config" "specific-file.txt"
# 请在这个括号内添加你要保护的路径
PROTECTED_PATHS=(
    ".claude/skills/shipany-page-builder",
    "public/imgs",
    "src/shared/blocks/common/mdx-content.tsx",
)

TEMP_BACKUP_DIR=$(mktemp -d)
HAS_PROTECTED_FILES=false

if [ ${#PROTECTED_PATHS[@]} -gt 0 ]; then
    echo ""
    echo "🛡️  正在备份受保护的路径 (避免被 Upstream 修改)..."
    for path in "${PROTECTED_PATHS[@]}"; do
        if [ -e "$path" ]; then
            # 保持目录结构备份
            # 使用 tar 是最稳妥的，能保留目录结构
            # 2>/dev/null 抑制可能的 "Removing leading /" 警告等
            tar -rf "$TEMP_BACKUP_DIR/protected.tar" "$path" 2>/dev/null
            HAS_PROTECTED_FILES=true
            echo "   - 已备份: $path"
        else
             echo "   ⚠️ 警告: 保护路径不存在: $path (跳过)"
        fi
    done
fi

echo ""
echo "========================================"
echo "🔄 4. 开始同步流程 (Upstream -> Local)..."
echo "========================================"

# 确保在正确的分支
CURRENT_BRANCH=$(git symbolic-ref --short HEAD)
if [ "$CURRENT_BRANCH" != "$MY_BRANCH" ]; then
    echo "⚠️  当前分支是 $CURRENT_BRANCH，切换到 $MY_BRANCH ..."
    git checkout -b $MY_BRANCH 2>/dev/null || git checkout $MY_BRANCH
fi

# 拉取更新 (Rebase)
# 使用 -Xtheirs 策略：如果发生冲突，优先保留"你"的改动 (在 rebase 中，"theirs" 指的是正在应用的当前分支修改)
echo "🔍 正在拉取 upstream 更新 (Rebase模式)..."
if git pull upstream $TARGET_BRANCH --rebase -Xtheirs; then
    echo "✅ 本地代码已同步到最新 upstream。"
else
    echo "❌ 同步失败 (可能有严重冲突)。"
    echo "   请手动解决冲突后运行 'git rebase --continue'。"
    exit 1
fi

# --- [新增] 恢复受保护文件 ---
if [ "$HAS_PROTECTED_FILES" = true ]; then
    echo ""
    echo "🛡️  正在恢复受保护的路径..."
    tar -xf "$TEMP_BACKUP_DIR/protected.tar"
    
    # 检查是否有导致变动（即 Upstream 是否真的动了这些文件）
    if [ -n "$(git status --porcelain)" ]; then
        echo "⚠️  Upstream 试图修改受保护的文件，正在强制覆盖回你的版本..."
        git add .
        git commit -m "chore: restore protected paths after sync"
        echo "✅ 受保护文件已恢复原样。"
    else
        echo "✅ 受保护文件未受影响 (内容一致)。"
    fi
    rm -rf "$TEMP_BACKUP_DIR"
fi

echo ""
echo "========================================"
echo "🚀 5. 推送到你的仓库 (Local -> Origin)..."
echo "========================================"

# 强制推送 (因为用了 rebase，或者是新仓库)
echo "⚠️  正在推送到 origin (强制推送)..."
if git push origin $MY_BRANCH --force; then
    echo ""
    echo "🎉 全部完成！同步成功！"
    echo "🔗 你的仓库地址: $(git remote get-url origin)"
else
    echo "❌ 推送失败，请检查网络或权限。"
    exit 1
fi