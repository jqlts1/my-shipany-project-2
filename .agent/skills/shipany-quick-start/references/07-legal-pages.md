# Step 7 — Legal pages

## Goal

Remove placeholders and make contact/domain/brand consistent across all legal pages.

## Files

- `content/pages/privacy-policy.mdx` (EN)
- `content/pages/privacy-policy.zh.mdx` (ZH)
- `content/pages/privacy-policy.ja.mdx` (JA, if present)
- `content/pages/terms-of-service.mdx` (EN)
- `content/pages/terms-of-service.zh.mdx` (ZH)
- `content/pages/terms-of-service.ja.mdx` (JA, if present)

## Replacements

| Placeholder | Replace with |
|------------|--------------|
| `YourAppName` | **projectName** |
| `your-domain.com` | **domain** |
| `support@your-domain.com` | **socialLinks.supportEmail** (or `support@{domain}`) |
| `[Company Name]` | **projectName** or company name if provided |
| `[Your Address]` | Remove or replace with actual address if provided |
| `[Privacy Officer Email]` | **socialLinks.supportEmail** |

## Frontmatter Updates

Update the frontmatter metadata to match project branding:

```yaml
---
title: "Privacy Policy - {projectName}"
description: "{projectName}'s privacy policy and data handling practices"
---
```

## Content Sections to Review

1. **Introduction** — Update app/service name
2. **Contact Information** — Update email addresses
3. **Data Collection** — Review if any app-specific data collection needs to be mentioned
4. **Third Party Services** — Keep generic unless user specifies integrations
5. **Effective Date** — Update to current date or project launch date

## Constraints

- Keep legal structure and tone intact
- Do not add unusualclaims or promises
- If you cannot produce good legal Chinese/Japanese, keep minimally edited but correct
- Maintain consistency across all language versions
- Do NOT remove required legal sections

