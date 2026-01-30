# Step 10 — Secondary Pages (Blog, Updates, Content)

## Goal

Customize blog page, updates page, and MDX content files to match the project branding and remove default placeholder content.

## Files

### Page JSON Configuration
- `src/config/locale/messages/*/pages/blog.json`
- `src/config/locale/messages/*/pages/updates.json`

### MDX Content Files (if present)
- `content/posts/*.mdx` — Blog articles
- `content/logs/*.mdx` — Update/changelog entries

## Replacements for blog.json / updates.json

| Placeholder | Replace with |
|------------|--------------|
| `ShipAny Blog` | `{projectName} Blog` |
| `ShipAny` | `{projectName}` |
| Generic descriptions | Product-specific descriptions based on **productDescription** |

### Example Transformations

**blog.json (EN)**
```json
{
  "metadata": {
    "title": "{projectName} Blog",
    "description": "Guides, tips, and updates for {projectName}."
  },
  "page": {
    "title": "{projectName} Blog",
    "sections": {
      "blog": {
        "title": "Blog",
        "description": "Read the latest {productDescription} guides and tutorials."
      }
    }
  }
}
```

**updates.json (EN)**
```json
{
  "metadata": {
    "title": "{projectName} Changelog",
    "description": "See what's new in {projectName}."
  },
  "page": {
    "sections": {
      "updates": {
        "title": "{projectName} Changelog",
        "description": "Track new features, improvements, and bug fixes."
      }
    }
  }
}
```

## MDX Blog Posts Strategy

### Option A: Keep Existing Posts (Recommended for v1)
If user has NOT provided custom blog content:
1. Update frontmatter `author` to match project maintainer
2. Keep general topic posts if relevant to the product domain
3. Delete posts that are clearly unrelated to the product

### Option B: Delete All Posts (Clean Slate)
If user explicitly requests:
1. Delete all files in `content/posts/`
2. Keep the directory empty (blog page will show "No Content")

### Option C: Create Product-Specific Posts
If user provides blog topics or content:
1. Create new `.mdx` files with proper frontmatter
2. Include both EN and ZH versions if the project is bilingual

## MDX Changelog/Logs Strategy

For `content/logs/*.mdx`:
1. **Keep v1.0 as template** — Use it as the starting point
2. Update version number if user provides a different starting version
3. Update content to reflect actual product features for v1

### Changelog Frontmatter Example
```yaml
---
title: "v1.0 - Initial Release"
description: "{projectName} first public release"
date: "2024-XX-XX"
---
```

## Constraints

- Do NOT create fake blog content — either keep relevant existing content or leave empty
- Maintain bilingual consistency (if EN exists, ZH should match)
- Keep frontmatter structure intact (`title`, `description`, `date`, `author`, `category`)
- If deleting posts, update both language versions together
