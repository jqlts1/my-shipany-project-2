#!/bin/bash

# --- 配置区域 ---
MY_BRANCH="dev"
TARGET_BRANCH="dev"
DEFAULT_UPSTREAM_URL="git@github.com:shipanyai/shipany-template-two.git"
TEMPLATE_IDENTIFIER="shipanyai/shipany-template-two"
LEGACY_TEMPLATE_IDENTIFIER="shipanyai/shipany-template-two"

PROTECTED_PATHS=(
    ".agent"
    ".claude"
    ".claude/skills/shipany-page-builder"
    "public/imgs"
    "src/shared/blocks/common/mdx-content.tsx"
    "source.config.ts"
    "src/app/sitemap.ts"
    "src/app/[locale]/(landing)/page.tsx"
    "src/config/locale/index.ts"
)

echo "========================================"
echo "🛠️  正在检查仓库环境..."
echo "========================================"

# --- 1. 检查/初始化 Git ---
if [ ! -d ".git" ]; then
    echo "⚠️  未检测到 Git 仓库，正在初始化..."
    git init
    git branch -M $MY_BRANCH
    git remote add upstream "$DEFAULT_UPSTREAM_URL"
    git fetch upstream
    git reset --mixed "upstream/$TARGET_BRANCH"
    git add .
    git commit -m "Initial setup: Sync with upstream template"
else
    echo "✅ Git 已就绪。"
fi

# --- 2. 确保 Upstream 存在 ---
if ! git remote | grep -q "upstream"; then
    echo "⚠️  未检测到 upstream，正在添加..."
    git remote add upstream "$DEFAULT_UPSTREAM_URL"
    echo "✅ Upstream 已添加。"
fi

# --- 3. 智能处理 Origin (关键修复) ---
ORIGIN_URL=$(git remote get-url origin 2>/dev/null)
echo "🔍 当前 Origin: ${ORIGIN_URL:-'未配置'}"

SHOULD_REMOVE_ORIGIN=false

# A. 检测是否是模板地址
if [[ "$ORIGIN_URL" == *"$TEMPLATE_IDENTIFIER"* ]] || [[ "$ORIGIN_URL" == *"$LEGACY_TEMPLATE_IDENTIFIER"* ]]; then
    echo "⚠️  Origin 指向了模板仓库 -> 标记移除。"
    SHOULD_REMOVE_ORIGIN=true
fi

# B. 检测 Origin 是否有效 (是否存在于服务器)
# 如果 Origin 配置了但远端不存在 (比如之前的自动建库失败了但 Remote 留下了)，git push 就会报 Repository not found
if [ -n "$ORIGIN_URL" ] && [ "$SHOULD_REMOVE_ORIGIN" = false ]; then
    echo "� 正在测试 Origin 连接..."
    if ! git ls-remote origin HEAD &>/dev/null; then
        echo "❌ Origin 连接失败 (Repository not found 或无权限)。"
        echo "   这通常意味着本地配置了 Origin，但 GitHub 上没有对应的仓库。"
        echo "   -> 标记移除，以便重新自动创建。"
        SHOULD_REMOVE_ORIGIN=true
    else
        echo "✅ Origin 连接正常。"
    fi
fi

if [ "$SHOULD_REMOVE_ORIGIN" = true ]; then
    git remote remove origin
    echo "🗑️  已移除无效或模板 Origin。"
fi

# --- 4. 自动创建新仓库 ---
if ! git remote | grep -q "origin"; then
    echo "----------------------------------------"
    echo "🤖 正在自动创建新仓库..."
    
    if command -v gh &> /dev/null; then
        if gh auth status &> /dev/null; then
            REPO_NAME=$(basename "$PWD")
            echo "   仓库名: $REPO_NAME"
            
            # 使用 public (根据你的需求调整)
            if gh repo create "$REPO_NAME" --public --source=. --remote=origin; then
                echo "🎉 新仓库 '$REPO_NAME' 创建成功！"
            else
                echo "❌ 创建失败。可能原因：仓库名已存在。"
                echo "   尝试关联现有仓库..."
                # 如果创建失败可能是因为仓库已存在但没关联 check
                if gh repo view "$REPO_NAME" &>/dev/null; then
                    USER_NAME=$(gh api user -q .login)
                    git remote add origin "git@github.com:$USER_NAME/$REPO_NAME.git"
                    echo "🔗 已关联到现有仓库 $USER_NAME/$REPO_NAME"
                else
                    exit 1
                fi
            fi
        else
            echo "❌ GitHub CLI 未登录 (gh auth login)。"
            exit 1
        fi
    else
        echo "❌ 未安装 gh 工具。"
        exit 1
    fi
else
    echo "✅ Origin 检查完毕。"
fi

echo ""

# --- 5. 保护现场 ---
if [ -n "$(git status --porcelain)" ]; then
    echo "📦 保存本地修改..."
    git add .
    git commit -m "chore: save local changes before sync"
fi

TEMP_BACKUP_DIR=$(mktemp -d)
HAS_PROTECTED_FILES=false

if [ ${#PROTECTED_PATHS[@]} -gt 0 ]; then
    for path in "${PROTECTED_PATHS[@]}"; do
        if [ -e "$path" ]; then
            tar -rf "$TEMP_BACKUP_DIR/protected.tar" "$path" 2>/dev/null
            HAS_PROTECTED_FILES=true
        fi
    done
fi

# --- 6. 同步 ---
echo ""
echo "🔄 拉取 Upstream..."
CURRENT_BRANCH=$(git symbolic-ref --short HEAD)
if [ "$CURRENT_BRANCH" != "$MY_BRANCH" ]; then
    git checkout -b $MY_BRANCH 2>/dev/null || git checkout $MY_BRANCH
fi

if git pull upstream $TARGET_BRANCH --rebase -Xtheirs; then
    echo "✅ 代码同步成功。"
else
    echo "❌ 同步冲突，尝试恢复..."
    if [ "$HAS_PROTECTED_FILES" = true ]; then
        tar -xf "$TEMP_BACKUP_DIR/protected.tar"
    fi
    exit 1
fi

# --- 7. 恢复 ---
if [ "$HAS_PROTECTED_FILES" = true ]; then
    echo "🛡️  恢复受保护文件..."
    tar -xf "$TEMP_BACKUP_DIR/protected.tar"
    if [ -n "$(git status --porcelain)" ]; then
        git add .
        git commit -m "chore: restore protected paths"
    fi
    rm -rf "$TEMP_BACKUP_DIR"
fi

# --- 8. 推送 ---
echo ""
echo "🚀 推送到 Origin..."
if git push origin $MY_BRANCH --force; then
    echo "🎉 同步完成！"
else
    echo "❌ 推送失败。"
    # 最后的挽救：如果是因为 origin 不对，提示用户
    echo "   请检查: $(git remote get-url origin)"
    exit 1
fi