---
name: shipany-pseo-master
description: The Unified PSEO (Programmatic SEO) Factory. This master skill routes to page-generation, block-creation workflows, and contains all necessary JSON schemas and UI prompts.
---

# `shipany-pseo-master` (The PSEO Factory)

This is the **Unified PSEO Suite** for ShipAny. It acts as the routing mastermind. Instead of carrying out tasks directly, it instructs the AI on which sub-workflow to load based on the user's request.

## Core Directives (Router)

When a user interacts with this skill, immediately classify their request into one of the following two tracks and follow the exact instructions.

### Track 1: Page Orchestration ("I need a landing page / PSEO page")
If the user wants to generate a new PSEO page (e.g., "Create a competitor alternative page for Oura"):
1. YOU MUST read the workflow instructions at:
   `view_file: .agent/skills/shipany-pseo-master/workflows/generate-page.md`
2. Follow that workflow to understand the Context, Templates (VS/Q&A), and Multi-language JSON output generation.
3. You will need to refer to `.agent/skills/shipany-pseo-master/references/block-specs.md` to know what JSON blocks exist.

### Track 2: UI Component Engineering ("I need to build a new React block")
If the user wants to build a new UI React Block, OR if Track 1 determines a required block is missing:
1. YOU MUST read the workflow instructions at:
   `view_file: .agent/skills/shipany-pseo-master/workflows/create-block.md`
2. You MUST read the critical rules for Defensive Prop Extraction at:
   `view_file: .agent/skills/shipany-pseo-master/prompts/add-block-prompt.md`
3. Execute the React component creation flawlessly into the **ACTIVE THEME** directory (as mandated by the workflow), NOT the default directory.

---
**PORTABILITY NOTE:**
To reuse this entire PSEO engine in another ShipAny project, simply copy this entire `shipany-pseo-master` folder into the `.agent/skills/` directory of the new project. No other external prompt files are needed.
