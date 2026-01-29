# 项目背景

| 项目 | 内容 |
|------|------|
| **品牌名** | 呼吸波 (Breath Wave) |
| **一句话描述** | 帮助用户通过科学呼吸练习缓解压力、改善睡眠的智能引导App |
| **目标用户** | 焦虑/压力人群、冥想爱好者、失眠者、办公白领 |
| **核心功能** | 多种呼吸模式引导、可视化呼吸动画、背景音效、练习记录统计 |
| **GitHub** | https://github.com/jqlts1/breath-wave |
| **分类** | Health |

---

# ShipAny Project Overview

这是一个基于 Next.js + i18n 的数据驱动型网站模板项目 (ShipAny)。核心理念是通过 JSON 配置驱动页面生成，支持多语言和多主题。

---

## 开发流程概览

本项目区分两类开发场景，请根据需求选择对应路径：

| 场景 | 说明 | 入口 Skill | 复杂度 |
|------|------|-----------|--------|
| **前台页面** | 营销落地页、产品介绍页 | `.agent/skills/shipany-page-builder/SKILL.md` | 低（仅 JSON） |
| **后台管理** | Admin 面板的 CRUD 模块 | `.agent/skills/shipany-admin-builder/SKILL.md` | 高（需写代码） |
| **新增区块** | 开发新的 UI 区块组件 | `docs/提示词/AI-Add-Block-Prompt.md` | 中（React 组件） |

### 快速判断

- **只需要新页面**？→ 使用 `shipany-page-builder`，只写 JSON 文件
- **需要新 UI 组件**？→ 先创建区块，再用于页面
- **需要后台功能**？→ 使用 `shipany-admin-builder`

---

## 核心机制

### 1. 数据驱动 (Data-Driven)

- 页面内容由 JSON 定义：`src/config/locale/messages/{locale}/pages/*.json`
- **自动路由**：创建 JSON 文件后页面自动生效，无需在 `index.ts` 中注册
- 支持定时发布：通过 `metadata.publishedAt` 控制页面上线时间

### 2. 主题系统 (Theming) ⚠️ 重要

> **核心理念**：区块组件是主题的一部分，不要在错误的主题目录下创建文件。

1. **识别当前主题**：检查 `.env.development` 中的 `NEXT_PUBLIC_THEME` 变量
2. **主题目录结构**：
   ```
   src/themes/<theme>/
   ├── blocks/      # UI 区块组件
   ├── layouts/     # 页面布局
   └── components/  # 主题专属组件
   ```
3. **当前主题**：`huxibo`
4. **禁止**：在其他主题目录创建/修改文件

### 3. 多语言 (i18n)

- 默认语言：`en`（英语）、`zh`（中文）
- 页面 JSON 按语言分目录存放

---

## 常用命令

```bash
pnpm dev      # 启动开发服务器
pnpm build    # 构建生产版本（用于验证）
```

---

## 文档与学习

### Skills（技能入口）

| 技能 | 路径 | 用途 |
|------|------|------|
| Page Builder | `.agent/skills/shipany-page-builder/SKILL.md` | 创建前台页面 |
| Admin Builder | `.agent/skills/shipany-admin-builder/SKILL.md` | 创建后台模块 |

### 参考文档

- **区块参数规格**（权威参考）：`.agent/skills/shipany-page-builder/references/02-block-specs.md`
- **系统默认区块**：`docs/添加路由/系统默认区块.md`
- **区块配置示例**：`docs/添加路由/区块配置示例/`

---

## 目录结构速查

```
src/
├── app/[locale]/
│   ├── (default)/       # 前台页面路由
│   └── (admin)/admin/   # 后台管理路由（14 个模块）
├── config/locale/
│   └── messages/{locale}/pages/  # 页面 JSON 配置
├── themes/<theme>/      # 主题组件与布局
└── components/          # 通用组件

.agent/skills/           # AI 技能定义
docs/添加路由/           # 区块配置文档
```
