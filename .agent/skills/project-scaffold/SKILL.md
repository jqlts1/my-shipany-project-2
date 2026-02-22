---
name: project-scaffold
description: 一键创建新的 Web 项目。使用场景：(1) 用户说"创建一个xxx项目"，(2) 需要从模板快速生成新项目，(3) 批量创建多个项目。本技能会自动克隆模板、创建 GitHub 仓库、配置同步脚本，并收集项目信息后生成首页。
---

# Project Scaffold (项目脚手架)

本技能用于从二次模板一键创建新的 Web 项目。

## 完整流程

```
用户: "创建一个 xxx 项目"
         ↓
1️⃣  确认分类目录 → 是否需要新建分类？
         ↓
2️⃣  克隆模板 → git clone -b dev <模板> <项目名>
         ↓
3️⃣  创建 GitHub 私有仓库 → gh repo create
         ↓
4️⃣  更新同步脚本 → 修改 sync-from-template.sh
         ↓
5️⃣  收集项目信息 → 交互式问答
         ↓
6️⃣  生成首页 → 调用 shipany-page-builder
```

---

## Step 1: 智能分类判断

**在创建项目之前，AI 需要先分析项目类型并确定分类目录。**

### 分类思考流程

```
用户: "创建一个呼吸训练 App"
         ↓
AI 分析: 这是一个健康/冥想类应用
         ↓
建议分类: Health 或 Wellness
```

### 常见分类参考

| 分类名 | 适用项目类型 | 示例 |
|--------|-------------|------|
| `SaaS` | B2B/B2C 软件服务 | CRM、项目管理、分析工具 |
| `Tools` | 实用工具类 | 图片处理、PDF 转换、AI 助手 |
| `Ecommerce` | 电商相关 | 商城、收银、库存管理 |
| `Health` | 健康/健身 | 呼吸训练、睡眠追踪、健身计划 |
| `Education` | 教育/学习 | 在线课程、笔记工具、语言学习 |
| `Content` | 内容/媒体 | 博客、播客、视频平台 |
| `Finance` | 金融/财务 | 记账、投资、财务分析 |

### 执行步骤

1. **分析项目描述**：根据用户说的"创建一个xxx项目"判断类型
2. **建议分类**：向用户确认分类（或自动选择）
3. **检查现有分类**：
   ```bash
   ls ~/CascadeProjects/
   ```
4. **创建/进入分类目录**：
   ```bash
   mkdir -p ~/CascadeProjects/<分类名>
   cd ~/CascadeProjects/<分类名>
   ```

### 示例对话

```
用户: 创建一个电商图片修复的项目

AI: 好的！我来帮你创建项目。
    
    📂 项目分类分析：
    - 这是一个图片处理工具，主要服务电商场景
    - 建议分类：Tools 或 Ecommerce
    
    当前已有分类：
    - SaaS/
    - Tools/
    - Health/
    
    ❓ 你想把这个项目放在哪个分类？
    1. Tools（推荐）
    2. Ecommerce
    3. 新建分类
```

---

## Step 2: 克隆模板

```bash
# 进入分类目录
cd ~/CascadeProjects/<分类>

# 克隆模板
git clone -b dev git@github.com:zhangte/my-shipany-project-2.git <项目名>

# 进入项目
cd <项目名>

# 移除原始 origin
git remote remove origin
```

---

## Step 3: 创建 GitHub 私有仓库

```bash
# 创建私有仓库并关联
gh repo create <项目名> --private --source=. --remote=origin

# 推送初始代码
git push -u origin dev
```

---

## Step 4: 更新同步脚本

编辑 `sync-from-template.sh`，更新以下配置：

```bash
# 确认上游地址正确
DEFAULT_UPSTREAM_URL="git@github.com:zhangte/my-shipany-project-2.git"

# 根据需要调整分支
MY_BRANCH="dev"
TARGET_BRANCH="dev"
```

---

## Step 5: 收集项目信息

通过交互式问答收集以下信息：

### 必填信息

| 问题 | 示例回答 |
|------|---------|
| 项目名称/品牌名 | "PicSet AI" |
| 一句话描述 | "AI 驱动的图片处理工具" |
| 目标用户 | "设计师和内容创作者" |
| 核心功能 (3-5 个) | "去背景, 图片增强, 批量处理" |

### 可选信息

| 问题 | 默认值 |
|------|--------|
| 主色调 | 由 AI 建议 |
| 需要的页面 | 首页, 功能, 定价, FAQ |
| 是否需要博客 | 是 |

### 问答模板

```
我来帮你创建新项目！请回答以下问题：

1. **项目名称**：你的品牌/产品叫什么名字？
2. **一句话描述**：用一句话描述这个产品是做什么的？
3. **目标用户**：主要服务哪类人群？
4. **核心功能**：列出 3-5 个主要功能
5. **竞品参考**：有没有类似的产品可以参考？（可选）
```

---

## Step 6: 生成首页

将收集的信息转化为 `shipany-page-builder` 的输入：

```
route: /
keywords: [<从描述提取>]
referenceCopy: <用户提供的描述和功能>
sectionsWanted: [hero, introduce, benefits, features, faq, cta]
```

然后调用 `shipany-page-builder` 生成首页 JSON。

---

## 快速命令

整合的初始化命令：

```bash
# 一键初始化（在项目目录内运行）
bash scripts/init-project.sh <github用户名> <项目名>
```

---

## 后续操作提示

项目创建完成后，提醒用户：

1. `cd <项目路径>` 进入项目
2. `pnpm install` 安装依赖
3. `pnpm dev` 启动开发服务器
4. 根据 `shipany-page-builder` 继续添加其他页面
