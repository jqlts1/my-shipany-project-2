#!/bin/bash

# =============================================================================
# init-project.sh - 快速初始化新项目
# 
# 用法: bash init-project.sh <项目名>
# 示例: bash init-project.sh my-awesome-app
# =============================================================================

set -e

# --- 配置 ---
TEMPLATE_REPO="git@github.com:jqlts1/my-shipany-project-2.git"
TEMPLATE_BRANCH="dev"
DEFAULT_CATEGORY_PATH="/Users/zhangte/Documents/WebProjects"

# --- 颜色 ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# --- 函数 ---
info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
success() { echo -e "${GREEN}✅ $1${NC}"; }
warn() { echo -e "${YELLOW}⚠️  $1${NC}"; }
error() { echo -e "${RED}❌ $1${NC}"; exit 1; }

# --- 参数检查 ---
if [ -z "$1" ]; then
    error "请提供项目名称: bash init-project.sh <项目名>"
fi

PROJECT_NAME="$1"
CATEGORY="${2:-WebProjects}"  # 默认分类

echo ""
echo "========================================"
echo "🚀 创建新项目: $PROJECT_NAME"
echo "========================================"
echo ""

# --- Step 1: 确认分类目录 ---
info "检查分类目录..."
CATEGORY_PATH="$DEFAULT_CATEGORY_PATH/$CATEGORY"

if [ ! -d "$CATEGORY_PATH" ]; then
    warn "分类 '$CATEGORY' 不存在，正在创建..."
    mkdir -p "$CATEGORY_PATH"
    success "创建分类目录: $CATEGORY_PATH"
else
    success "使用现有分类: $CATEGORY_PATH"
fi

PROJECT_PATH="$CATEGORY_PATH/$PROJECT_NAME"

if [ -d "$PROJECT_PATH" ]; then
    error "项目已存在: $PROJECT_PATH"
fi

# --- Step 2: 克隆模板 ---
info "克隆模板..."
cd "$CATEGORY_PATH"
git clone -b "$TEMPLATE_BRANCH" "$TEMPLATE_REPO" "$PROJECT_NAME"
success "模板克隆完成"

cd "$PROJECT_PATH"

# --- Step 3: 移除原始 origin ---
info "清理 Git 配置..."
git remote remove origin 2>/dev/null || true

# --- Step 4: 创建 GitHub 仓库 ---
info "创建 GitHub 私有仓库..."
if command -v gh &> /dev/null; then
    if gh auth status &> /dev/null; then
        if gh repo create "$PROJECT_NAME" --private --source=. --remote=origin; then
            success "GitHub 仓库创建成功"
        else
            warn "仓库可能已存在，尝试关联..."
            USER_NAME=$(gh api user -q .login)
            git remote add origin "git@github.com:$USER_NAME/$PROJECT_NAME.git"
        fi
    else
        error "请先登录 GitHub CLI: gh auth login"
    fi
else
    error "未安装 GitHub CLI"
fi

# --- Step 5: 推送初始代码 ---
info "推送初始代码..."
git push -u origin "$TEMPLATE_BRANCH"
success "代码已推送"

# --- Step 6: 更新同步脚本 ---
info "更新同步脚本配置..."
# sync-from-template.sh 中的 upstream 已经是正确的，无需修改

# --- 完成 ---
echo ""
echo "========================================"
echo "🎉 项目创建成功！"
echo "========================================"
echo ""
echo "项目路径: $PROJECT_PATH"
echo ""
echo "下一步操作："
echo "  1. cd $PROJECT_PATH"
echo "  2. pnpm install"
echo "  3. pnpm dev"
echo ""
