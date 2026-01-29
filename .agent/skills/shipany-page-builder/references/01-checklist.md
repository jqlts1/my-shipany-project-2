# Checklist (v1)

## Files created

- For each configured locale in `src/config/locale/index.ts` (`localeNames`):
  - `src/config/locale/messages/<locale>/pages/<slug>.json` created

## Schema Validation

- JSON structure strictly follows `references/02-block-specs.md`
- All block props match the documented types

## Registration updated

- `src/config/locale/index.ts` contains exactly one entry:
  - `'pages/<slug>'`

## Placeholder images

- Any image fields in the new JSON use placeholder URLs (recommended: `picsum.photos`)
- No edits under `public/` were made

## Routing sanity

- Slug contains no `.` (dot), otherwise it will 404
- Page can be visited at:
  - `/...` (EN)
  - `/zh/...` (ZH)

## Validation (required)

- Build must pass: `pnpm build`
