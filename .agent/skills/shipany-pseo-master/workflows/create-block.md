# `create-block` Workflow

If you are asked to create a new frontend React UI block, you **MUST** strictly follow these steps:

## 1. Read the Golden Rules
You MUST first read `.agent/skills/shipany-pseo-master/prompts/add-block-prompt.md`. This contains critical rules regarding Defensive Prop Extraction to prevent blank UIs. DO NOT write code before reading it.

## 2. Determine the Active Theme (CRITICAL ROUTING RULE)
Read the project's `.env` or `.env.development` file to find `NEXT_PUBLIC_THEME`.
- If `NEXT_PUBLIC_THEME=huxibo`, you MUST create your new component in `src/themes/huxibo/blocks/your-new-block.tsx`.
- If `NEXT_PUBLIC_THEME=ocean`, it goes in `src/themes/ocean/blocks/`.
**CRITICAL**: NEVER dump project-specific `.tsx` blocks into `src/themes/default/blocks/` unless the environment variable explicitly states the theme IS "default". Dumping everything into default ruins the project's multi-theme organization.

## 3. UI Implementation
- Check existing blocks in the theme's folder to copy UI tokens (spacing, dark mode colors).
- Export your component in `src/themes/<YOUR_THEME>/blocks/index.tsx`.

## 4. JSON Schema Registration
If this block is used for PSEO generation, you MUST document its JSON schema (with an example) at the bottom of `src/themes/{NEXT_PUBLIC_THEME}/block-specs.md` so that the `generate-page` orchestrator knows it exists.
