#!/bin/bash

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
# 检查 URL 是否包含 shipany-template-two 且不包含你自己的用户名(这里简单判断是否是原版URL)
# 更稳妥的方式是看它是否完全等于 DEFAULT_UPSTREAM_URL 或 HTTPS_UPSTREAM_URL
if [[ "$ORIGIN_URL" == *"$DEFAULT_UPSTREAM_URL"* ]] || [[ "$ORIGIN_URL" == *"$HTTPS_UPSTREAM_URL"* ]]; then
    echo "⚠️  检测到 origin 指向了官方只读模板 ($ORIGIN_URL)。"
    echo "🔧 正在移除错误的 remote origin..."
    git remote remove origin
fi

if ! git remote | grep -q "origin"; then
    echo "⚠️  未检测到 remote origin (你的远程仓库)。"
    
    # 尝试使用 GitHub CLI (gh) 自动创建
    if command -v gh &> /dev/null; then
        echo "🤖 检测到 GitHub CLI，尝试自动创建远程仓库..."
        # 获取当前目录名作为仓库名
        REPO_NAME=$(basename "$PWD")
        
        echo "   目标仓库名: $REPO_NAME"
        echo "   正在创建并推送..."
        
        # 尝试创建公开仓库 (public)，如果需要私有请改 --private
        # --source=. 表示使用当前目录代码
        # --remote=origin 表示添加为 origin 远程
        if gh repo create "$REPO_NAME" --public --source=. --remote=origin; then
            echo "🎉 GitHub 仓库 '$REPO_NAME' 创建成功并已关联！"
        else
            echo "❌ 自动创建失败。请确保你已登录 gh (运行 'gh auth login')。"
            echo "或者手动创建仓库后运行: git remote add origin <URL>"
            exit 1
        fi
    else
        echo "❌ 未找到 GitHub CLI (gh)。无法自动创建仓库。"
        echo "请手动在 GitHub 创建仓库，然后运行："
        echo "git remote add origin <你的git地址>"
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
echo "🔍 正在拉取 upstream 更新 (Rebase模式)..."
if git pull upstream $TARGET_BRANCH --rebase; then
    echo "✅ 本地代码已同步到最新 upstream。"
else
    echo "❌ 同步失败 (可能有冲突)。请解决冲突后继续。"
    exit 1
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