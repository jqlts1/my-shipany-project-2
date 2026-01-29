# ShipAny Page Builder — Guide (v1)

## Goal

Create a new dynamic page from a short spec by:

- Creating locale JSON files for **all configured locales**
> **注意**：系统已支持自动路由，无需手动注册。

## Route → slug → files

- **Route**: `/features/ai-image-generator`
- **Slug**: `features/ai-image-generator`

Files to create (for each configured locale in `localeNames`):

- `src/config/locale/messages/<locale>/pages/features/ai-image-generator.json`

> **自动路由**：JSON 文件创建后页面自动生效，无需在 `index.ts` 中注册。

## Hard constraints (v1)

- Only create **new** page JSON files under `src/config/locale/messages/<locale>/pages/**` (one per configured locale).
- **不需要**修改 `src/config/locale/index.ts`（路由已自动化）。
- **Images must be placeholders** (do not add real images to `public/`).
- When writing JSON string content, avoid control/special characters that can break JSON parsing. Ensure generated output is valid JSON (the script sanitizes text before writing).

## Placeholder image rule

Whenever the JSON uses an image field (e.g. `hero.image`, `hero.background_image`), it must be a placeholder image URL.

Recommended placeholder source:

- `https://picsum.photos/seed/<seed>/<width>/<height>`

Notes:

- `<seed>` must be a **single string path segment** (no `/`). If your route slug contains `/`, convert it to a single token like `features-ai-image-generator-hero`.

In this repo, blocks will auto-set `unoptimized` for `http(s)://` images, so placeholders work without Next.js image domain configuration.

## JSON shape (minimal)

Use a simple landing-style set of sections:

- `hero`
- `introduce`
- `benefits`
- `features`
- `faq`
- `cta`

Each section chooses a block by `section.block`.

**IMPORTANT**: Strictly follow `references/02-block-specs.md` for the exact JSON schema and props for each block. Do not guess fields.

## Script usage (可选)

脚本 `create_dynamic_page.py` 仍可用，但现在**直接创建 JSON 文件即可**。

```bash
# 如果需要批量生成多语言文件，可使用脚本
python3 .agent/skills/shipany-page-builder/scripts/create_dynamic_page.py
```
