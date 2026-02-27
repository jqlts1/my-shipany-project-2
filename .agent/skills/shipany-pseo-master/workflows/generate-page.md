# `generate-page` Workflow

This workflow guides you through generating the JSON payload for a Programmatic SEO page.

## 1. Context Acquisition (MANDATORY)
- **Identify the App**: Read project context.
- **Active Theme**: Read `NEXT_PUBLIC_THEME` from `.env.development` or `.env`.
- **Reference Material**: Read existing landing pages in `src/config/locale/messages/en/pages/` to clone the brand tone.
- **Block Specs**: READ `.agent/skills/shipany-pseo-master/references/block-specs.md` to know what blocks are available.

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
If a needed block isn't in `block-specs.md`, DO NOT invent fake JSON. Instruct the user to run the `create-block` track first.

## 4. Strict SEO Semantics & Copywriting Rules (MANDATORY)
When generating content for the JSON blocks, you MUST adhere to the following technical SEO standards:
1. **H-Tag Hierarchy**: 
   - The `title` of the `hero-pseo` or `hero` block is your **H1**. It MUST contain the exact target keyword. There can only be ONE H1 per page.
   - The `title` properties of all subsequent main blocks (e.g., `comparison-table`, `faq`) act as **H2**s. They should include secondary or LSI (Latent Semantic Indexing) keywords.
   - The questions inside the `faq` block act as **H3**s. They should target long-tail search intent (e.g., "People Also Ask" questions).
2. **Keyword Density & Placement**:
   - Do NOT keyword stuff. Maintain a natural density (~1-2%).
   - The target keyword MUST appear in the first 100 words of the `hero` description.
   - Use bold tags (`<strong>`) in descriptions for semantic emphasis on LSI keywords.
3. **Search Intent Matching**:
   - Ensure the tone matches the intent (Transactional for "VS" pages, Informational for "Glossary" pages).

## 5. Multi-Language Output & URL Siloing (Topic Clusters)
To build a strong SEO structure, encourage the user to place related pages into nested directories (e.g., `pages/alternatives/calm.json`, `pages/glossary/hrv.json`). This creates powerful URL silos.

**CRITICAL RULE: The Hub & Spoke Model**
If you suggest creating a new nested directory (e.g., `pages/alternatives/`), you MUST also generate the "Hub" page for that directory: `pages/alternatives/index.json`. 
- The `index.json` should act as a directory/pillar page (using `hero` and `showcases` blocks to link out to all the child isolated pages like `calm.json` and `oura.json`).
- Without this `index.json`, the user will hit a 404 if they navigate to `/alternatives`, destroying the SEO silo.

You MUST output the JSON structure for multiple supported locales (English and Chinese):
1. Output English to `src/config/locale/messages/en/pages/{cluster-dir}/{slug}.json` (And the `index.json` if new).
2. Output Chinese to `src/config/locale/messages/zh/pages/{cluster-dir}/{slug}.json` (And the `index.json` if new).
3. Register BOTH the exact nested string (e.g., `pages/alternatives/calm`) AND the hub (`pages/alternatives/index`) in `src/config/locale/index.ts`.

**CRITICAL**: Never use generic SaaS lorem ipsum. Match the project's exact voice.
