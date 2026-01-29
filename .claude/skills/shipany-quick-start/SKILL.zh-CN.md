---
name: shipany-quick-start
description: Automate first-pass customization of a new ShipAny (ShipAny Two) project from a short project brief (app name, domain/app URL, product description/features, reference links, and branding preferences). Use when the user says they are starting a new project.
---

# ShipAny 快速启动 (项目引导)

此技能被有意地拆分为多个小型参考模块。请仅加载您需要的模块。

## v1 修改范围（硬性限制）

在第一阶段，**仅修改 `references/09-checklist.md` 中列出的文件**。

- **不要**更改任何其他文件（不涉及路由、组件、模板或额外的语言包文件）。
- **不要**引入登录/认证/支付功能，除非有明确要求。

## 开发工作流程（必需）

- 开始修改前：运行 `pnpm install`（执行一次）以确保已安装依赖项。
- 完成所有修改后：在验证前**清除 Next.js 缓存**，否则您可能会看到旧的资源（例如旧的 `logo.png`）：
  - macOS/Linux: `rm -rf .next`
  - Windows (PowerShell): `Remove-Item -Recurse -Force .next`
  - Windows (cmd): `rmdir /s /q .next`
- 然后运行 `pnpm build` 来验证项目（构建 + Lint 检查）。如果失败，请**仅修复 v1 白名单范围内**的问题，除非用户扩大了范围。

## 项目简报

首先规范化用户的请求：

- `references/00-project-brief.md`

## 执行顺序 (ShipAny Two)

1. 应用基础（环境变量驱动）：`references/01-env-app-info.md`
2. SEO 元数据：`references/02-seo-metadata.md`
3. 落地页（中/英）：`references/03-landing-page.md`
   - 页面各区块位于 `src/config/locale/messages/{locale}/pages/index.json`
   - 页眉/页脚/导航位于 `src/config/locale/messages/{locale}/landing.json`
4. 主题样式：`references/04-theme-styles.md`
5. Logo + 网站图标：`references/05-logo-favicon.md`
6. 站点地图：`references/06-sitemap.md`
7. 法律页面：`references/07-legal-pages.md`
8. 图片（从链接中提取或使用 Picsum 占位符）：`references/08-images.md`
9. 最小检查清单：`references/09-checklist.md`

## 捆绑脚本

- `scripts/fetch_og_image.py`: 为参考链接尽力而为的 OG/Twitter 预览图下载器。
