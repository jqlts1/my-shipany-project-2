#!/bin/bash

# =============================================================================
# sync-from-template.sh
# 用于派生项目从"二次模板"同步更新
# 
# 使用方法：
# 1. 将此脚本复制到你的派生项目根目录
# 2. 修改下方 DEFAULT_UPSTREAM_URL 为你的二次模板地址
# 3. 运行 bash sync-from-template.sh
# =============================================================================

# --- 配置区域 (派生项目需要修改这里) ---
MY_BRANCH="dev"              # 派生项目的分支
TARGET_BRANCH="dev"           # 上游模板的分支
DEFAULT_UPSTREAM_URL="git@github.com:jqlts1/my-shipany-project-2.git"  # 二次模板地址
TEMPLATE_IDENTIFIER="jqlts1/my-shipany-project-2"

# 保护的路径 - 派生项目的自定义内容不会被覆盖
PROTECTED_PATHS=(
    # 项目特有配置
    ".env"
    ".env.development"
    ".env.production"
    # 项目特有内容
    "public/imgs"
    "src/config/locale/messages"
    # AI 技能和定制化
    ".agent"
    ".claude"
    # 添加你项目独有的文件或目录...
)

echo "========================================"
echo "🔄 同步模板更新 (二次模板 → 派生项目)"
echo "========================================"
echo "上游: $DEFAULT_UPSTREAM_URL"
echo ""

# --- 1. 检查/初始化 Git ---
if [ ! -d ".git" ]; then
    echo "⚠️  未检测到 Git 仓库，正在初始化..."
    git init
    git branch -M $MY_BRANCH
    git remote add upstream "$DEFAULT_UPSTREAM_URL"
    git fetch upstream
    git reset --mixed "upstream/$TARGET_BRANCH"
    git add .
    git commit -m "Initial setup: Sync with template"
else
    echo "✅ Git 已就绪。"
fi

# --- 2. 确保 Upstream 存在 ---
if ! git remote | grep -q "upstream"; then
    echo "⚠️  未检测到 upstream，正在添加..."
    git remote add upstream "$DEFAULT_UPSTREAM_URL"
    echo "✅ Upstream 已添加。"
else
    # 确保 upstream URL 是正确的
    CURRENT_UPSTREAM=$(git remote get-url upstream 2>/dev/null)
    if [ "$CURRENT_UPSTREAM" != "$DEFAULT_UPSTREAM_URL" ]; then
        echo "⚠️  更新 upstream URL..."
        git remote set-url upstream "$DEFAULT_UPSTREAM_URL"
    fi
fi

# --- 3. 检查 Origin (派生项目自己的仓库) ---
ORIGIN_URL=$(git remote get-url origin 2>/dev/null)
echo "🔍 当前 Origin: ${ORIGIN_URL:-'未配置'}"

SHOULD_REMOVE_ORIGIN=false

# 检测是否错误指向模板地址
if [[ "$ORIGIN_URL" == *"$TEMPLATE_IDENTIFIER"* ]]; then
    echo "⚠️  Origin 指向了模板仓库 -> 标记移除。"
    SHOULD_REMOVE_ORIGIN=true
fi

# 检测 Origin 是否有效
if [ -n "$ORIGIN_URL" ] && [ "$SHOULD_REMOVE_ORIGIN" = false ]; then
    echo "📡 正在测试 Origin 连接..."
    if ! git ls-remote origin HEAD &>/dev/null; then
        echo "❌ Origin 连接失败。"
        SHOULD_REMOVE_ORIGIN=true
    else
        echo "✅ Origin 连接正常。"
    fi
fi

if [ "$SHOULD_REMOVE_ORIGIN" = true ]; then
    git remote remove origin
    echo "🗑️  已移除无效 Origin。"
fi

# --- 4. 自动创建派生项目仓库 ---
if ! git remote | grep -q "origin"; then
    echo "----------------------------------------"
    echo "🤖 正在自动创建派生项目仓库..."
    
    if command -v gh &> /dev/null; then
        if gh auth status &> /dev/null; then
            REPO_NAME=$(basename "$PWD")
            echo "   仓库名: $REPO_NAME"
            
            if gh repo create "$REPO_NAME" --private --source=. --remote=origin; then
                echo "🎉 派生项目仓库 '$REPO_NAME' 创建成功！"
            else
                echo "❌ 创建失败。仓库可能已存在。"
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
    echo "🛡️  备份受保护文件..."
    for path in "${PROTECTED_PATHS[@]}"; do
        if [ -e "$path" ]; then
            echo "   - $path"
            tar -rf "$TEMP_BACKUP_DIR/protected.tar" "$path" 2>/dev/null
            HAS_PROTECTED_FILES=true
        fi
    done
fi

# --- 6. 同步 ---
echo ""
echo "🔄 拉取模板更新..."
CURRENT_BRANCH=$(git symbolic-ref --short HEAD)
if [ "$CURRENT_BRANCH" != "$MY_BRANCH" ]; then
    git checkout -b $MY_BRANCH 2>/dev/null || git checkout $MY_BRANCH
fi

git fetch upstream

if git pull upstream $TARGET_BRANCH --rebase -Xtheirs; then
    echo "✅ 代码同步成功。"
else
    echo "❌ 同步冲突，尝试恢复..."
    git rebase --abort 2>/dev/null
    if [ "$HAS_PROTECTED_FILES" = true ]; then
        tar -xf "$TEMP_BACKUP_DIR/protected.tar"
    fi
    exit 1
fi

# --- 7. 恢复受保护文件 ---
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
    echo ""
    echo "========================================"
    echo "🎉 同步完成！"
    echo "========================================"
else
    echo "❌ 推送失败。"
    echo "   请检查: $(git remote get-url origin)"
    exit 1
fi
