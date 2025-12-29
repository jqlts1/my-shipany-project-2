# ShipAny Project Overview

这是一个基于 Next.js + i18n 的数据驱动型网站模板项目 (ShipAny)。核心理念是通过 JSON 配置驱动页面生成，支持多语言和多主题。

## 核心机制

1.  **数据驱动 (Data-Driven)**
    -   页面内容由 JSON 定义：`src/config/locale/messages/{locale}/pages/*.json`
    -   不需要编写 `.tsx` 页面文件，只需配置 JSON 和注册路由。

2.  **路由注册 (Route Registration)**
    -   新页面需在 `src/config/locale/index.ts` 中的 `localeMessagesPaths` 注册 slug。

3.  **主题系统 (Theming)**
    -   主题目录：`src/themes/` (当前: `huxibo`)
    -   布局文件：`src/themes/{theme}/layouts/`
    -   环境配置：`.env.development` 指定主题。

## 常用命令

-   `pnpm dev` - 启动开发服务器
-   `pnpm build` - 构建生产版本
-   `python3 .claude/skills/shipany-page-builder/scripts/create_dynamic_page.py` - (推荐) 快速创建新页面脚本

## 核心文档指南

-   **页面创建 SOP**: [Page Builder Skill](.claude/skills/shipany-page-builder/SKILL.md)
    -   包含创建新页面的完整流程、JSON 结构和脚本使用方法。
-   **参考指南**: `.claude/skills/shipany-page-builder/references/`
    -   `00-guide.md`: 页面规划指南
    -   `02-block-specs.md`: JSON 区块参数定义的权威参考

## 目录结构速查

```
src/
├── config/locale/       # 多语言与页面内容配置
│   ├── messages/        # JSON 内容文件
│   └── index.ts         # 路由注册表
├── themes/              # 主题组件与布局
└── components/          # 通用组件
scripts/                 # 辅助脚本 (如创建页面)
```
