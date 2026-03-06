# `generate-page` Workflow

This workflow guides you through generating the JSON payload for a Programmatic SEO page.

## 1. Pre-flight Taxonomy Check (MANDATORY)
Before generating ANY pages, you MUST verify the site's PSEO architecture to prevent orphan pages and URL bloat.
- **Read the Ledger**: Check if `content/pseo-architecture.md` exists.
- **Branch A (Missing)**: If it does NOT exist, STOP. Do not generate pages. Enter "Architect Mode". Interview the user to define 3-5 core PSEO Hubs (e.g., `/sleep`, `/anxiety`) based on their product. Generate and save `pseo-architecture.md`.
- **Branch B (Exists)**: If it exists, READ IT. You MUST route the user's requested keywords into one of the designated Hubs specified in this document (e.g., routing "fear of flying" to the `/anxiety` hub). DO NOT invent new top-level directories unless explicitly negotiating an architecture update with the user.

## 2. Context Acquisition (MANDATORY)
- **Identify the App**: Read project context.
- **Active Theme**: Read `NEXT_PUBLIC_THEME` from `.env.development` or `.env`.
- **Reference Material**: Read existing landing pages in `src/config/locale/messages/en/pages/` to clone the brand tone.
- **Block Specs**: READ `src/themes/{NEXT_PUBLIC_THEME}/block-specs.md` to know what blocks are available for this specific project design.

## 2. Page Template Strategies
Select one of the following macro-templates to structure `page.show_sections`:

### Template A: Competitor Alternative (The "VS" Page)
1. `hero-pseo`: Direct callout of the competitor's flaw + our solution.
2. `comparison-table`: Hard feature/cost comparison matrix.
3. `pros-cons`: Addressing switching costs and highlighting native advantages.
4. `faq`: SEO-optimized questions about migrating data.
5. `cta`: Final conversion push.

### Template B: Glossary / Educational (The "Q&A" Page)
1. `hero-pseo`: Clear, authoritative definition.
2. `features-list`: Step-by-step breakdown.
3. `faq`: Deep dive into specific long-tail questions (Crucial for SEO snippets).
4. `cta`: Conversion push.

### Template C: Custom Golden Template (By Example)
- The user provides an already perfect JSON file.
- **STRICTLY MIRROR** its exact array in `page.show_sections` and block configurations. 
- Rewrite ONLY the localized text to fit the new keyword.

## 3. Delegation (Missing Blocks)
If a needed block isn't in `src/themes/{NEXT_PUBLIC_THEME}/block-specs.md`, DO NOT invent fake JSON. Instruct the user to run the `create-block` track first.

## 4. Strict SEO Semantics & Copywriting Rules (MANDATORY)
When generating content for the JSON blocks, you MUST adhere to the following technical SEO standards:
1. **H-Tag Hierarchy**: 
   - The `title` of the `hero-pseo` or `hero` block is your **H1**. It MUST contain the exact target keyword. There can only be ONE H1 per page.
   - The `title` properties of all subsequent main blocks (e.g., `comparison-table`, `faq`) act as **H2**s. They should include secondary or LSI (Latent Semantic Indexing) keywords.
   - The questions inside the `faq` block act as **H3**s. They should target long-tail search intent (e.g., "People Also Ask" questions).
   - **NO HTML IN TITLES**: You MUST NEVER use HTML tags (like `<br/>`, `<strong>`, `<em>`) inside any `title` field across ANY block in the JSON. The React UI components render `title` props as plain text (`{title}`), so HTML tags will break the UI and display as raw text. Only use HTML in `description` or `tip` fields.
2. **Keyword Density & Placement**:
   - Do NOT keyword stuff. Maintain a natural density (~1-2%).
   - The target keyword MUST appear in the first 100 words of the `hero` description.
   - Use bold tags (`<strong>`) in descriptions for semantic emphasis on LSI keywords.
3. **Search Intent Matching**:
   - Ensure the tone matches the intent (Transactional for "VS" pages, Informational for "Glossary" pages).
4. **Global Root Metadata (CRITICAL FOR `<title>`)**:
   - YOU MUST generate a `metadata` object at the very root of the JSON file (sibling to `page`).
   - This `metadata` object MUST contain `title` (max 60 chars) and `description` (max 160 chars) properties. If you omit this, the page will inherit the website's generic SEO title, destroying the PSEO keyword strategy.

## 5. Multi-Language Output, URL Siloing & Internal Linking Matrix
To build a strong SEO structure, encourage the user to place related pages into nested directories (e.g., `pages/alternatives/calm.json`, `pages/sleep/4-7-8.json`). This creates powerful URL silos.

**CRITICAL RULE: Internal Linking Matrix (Topic Clusters)**
When generating a new PSEO page within an existing cluster (e.g., `/anxiety/`), you MUST inject an internal linking block (typically using the `showcases` block) right before the `faq` section.
- This block (e.g., `"related-scenarios"`) should link out to 2-3 other PSEO pages within the same cluster.
- Provide a thumbnail image, description, and the exact relative URL (`url: "/anxiety/other-page"`).
- This prevents orphan pages and ensures SEO link juice flows across the cluster.

**CRITICAL RULE: Smart Hub Detection & The Spoke Model**
1. **Detect Existing Hubs First:** Before creating a new directory, check if a relevant one already exists (e.g., if the user asks for a "Box Breathing" page, check if `pages/sleep` already exists).
2. **Append if Exists:** If the hub (`index.json`) already exists, DO NOT overwrite it. Instead, **read** the existing `index.json`, add the new spoke page to its `showcases` items array, and **update** the file.
3. **Create if Missing:** If you must create a new nested directory (e.g., `pages/anxiety/`), you MUST also generate the "Hub" page for that directory: `pages/anxiety/index.json`. 
   - The `index.json` should act as a directory/pillar page (using `hero` and `showcases` blocks to link out to all the child isolated pages).
   - Without this `index.json`, the user will hit a 404 if they navigate to `/anxiety`, destroying the SEO silo.
   - LIKE ALL OTHER PAGES, this `index.json` MUST ALSO contain the root `metadata` object with a unique `<title>` and `description`.

You MUST output the JSON structure for multiple supported locales (English and Chinese):
1. Output English to `src/config/locale/messages/en/pages/{cluster-dir}/{slug}.json` (And update/create the `index.json`).
2. Output Chinese to `src/config/locale/messages/zh/pages/{cluster-dir}/{slug}.json` (And update/create the `index.json`).
3. Register BOTH the exact nested string (e.g., `pages/alternatives/calm`) AND the hub (`pages/alternatives/index`, if new) in `src/config/locale/index.ts`.

**CRITICAL**: Never use generic SaaS lorem ipsum. Match the project's exact voice.
