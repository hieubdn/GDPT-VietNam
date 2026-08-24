---
name: seo-audit-basic
description: Run basic on-page SEO checks for hieubdn pages, including title, meta description, keywords, canonical, OG/social tags, og:image, and image alt text.
---

# SEO Audit Basic

Fast, page-scoped on-page SEO check. Follows `_shared/workflow.md`; validation via `_shared/validation.md`.

Use for: title length/quality, meta description, primary keyword alignment with title/desc/H1/intro/body, canonical, OG/social tags, `og:image`, alt text, basic heading structure, basic indexability signals.

Don't use for: link audits (`seo-audit-links`), full content writing, sitewide crawls without a specific page, Core Web Vitals, UI QA beyond SEO-relevant images/metadata.

## Workflow

1. **Resolve page** — URL path / content file path / page name. Ask one short question only when ambiguous.

2. **Read target source only.** There's no frontmatter in this repo — metadata is a Next.js `Metadata` object. Capture:
   - Site-wide defaults in `apps/web/app/layout.tsx` (`title`, `description`, `openGraph`, `twitter`, `metadataBase`)
   - Any per-route override via `export const metadata` or `generateMetadata` in the route's `page.tsx` (most routes currently inherit the layout defaults — check before assuming a page has its own)
   - Hero/intro copy and H2/H3 flow from the page's section components under `apps/web/components/pages/**`
   - Image references and `alt` text in those components

   Intro, heading, keyphrase placement, image-alt, and E-E-A-T content findings should focus on the target page's main content and ignore global header, footer, nav drawer, and shared layout assets unless the user explicitly asks to audit site shell content.

   Don't scan unrelated pages unless confirming duplication or canonical conflicts.

3. **Use validation tools when useful.** There's no dedicated SEO/content-token linter in this repo — this is a manual read-through. Run `pnpm check-types` if you edit the `Metadata` object itself; `pnpm build` only if rendered HTML/OG output needs inspecting. Don't repeat expensive checks.

4. **Check basic fields against Yoast standards.**

   **Title**
   - Max **60 characters** (pixel-equivalent); flag if longer
   - Clear, specific, contains main service/topic naturally; no spammy duplication
   - Primary keyphrase present

   **Meta Description**
   - Max **155 characters**; flag if longer or missing
   - Clear value proposition, primary keyphrase natural, no stuffing

   **Primary Keyphrase placement** — check all five locations:
   - SEO title ✓/✗
   - Meta description ✓/✗
   - URL / slug ✓/✗
   - First paragraph / intro ✓/✗ (Yoast requires keyphrase in opening paragraph)
   - At least one H2/H3 subheading ✓/✗

   **Keyphrase density**
   - Target **0.5% – 3%** of total word count; flag both under and over
   - Below 0.5%: keyword too sparse — orange; Above 3%: risk of keyword stuffing — red

   **E-E-A-T signals** — note presence/absence of:
   - *Experience*: personal examples, images, first-hand context
   - *Expertise*: author qualification, factual depth, cited sources
   - *Authoritativeness*: references from/to recognized sources in niche
   - *Trustworthiness*: HTTPS, transparent authorship, minimal intrusive ads, outbound links to credible sources

   **Secondary keywords** — only where natural, not forced

   **Canonical** — route matches the entry in `apps/web/config/path.ts` (`PATH_URL`); flag missing/ambiguous only when observable

   **Open Graph** — title/description/image present, via the route's own `metadata` export or inherited from `apps/web/app/layout.tsx`

   **`og:image`** — relevant, not broken / generic / mismatched

   **Headings** — one clear page topic, logical H2/H3, no skipped or duplicated heading levels; primary keyphrase in at least one heading

   **Images** — meaningful alt for content images; decorative icons get concise alt only when the component expects it; primary keyphrase in alt of at least one image

5. **Recommend conservatively.** For each issue: field, current value (if short), suggested replacement, why.

   When editing: preserve meaning and offer; no keyword stuffing; use `content-emphasis` for bold text edits; keep metadata human-readable and conversion-focused; prefer existing assets over inventing image URLs; add external refs only when they add trust.

6. **Validate** — run smallest relevant checks from `_shared/validation.md` (`pnpm check-types` if the `Metadata` object changed; `pnpm build` only when rendered metadata/OG output needs inspecting).

## Output

```markdown
## Basic SEO Audit Result
- Page: `<page>`
- Title / Meta / Keyword alignment / Canonical / OG image / Alt / E-E-A-T: `<pass|warn|fail>`
- Main issue: `<short>`

## Field Checklist
- Title: `<value>` (`<char count>` chars) — `<pass|warn: over 60>`
- Meta description: `<value>` (`<char count>` chars) — `<pass|warn: over 155>`
- Keyphrase in title: `<yes|no>`
- Keyphrase in meta: `<yes|no>`
- Keyphrase in slug: `<yes|no>`
- Keyphrase in intro: `<yes|no>`
- Keyphrase in subheading: `<yes|no>`
- Keyphrase density: `<approx %>` — `<green 0.5–3% | orange | red>`
- E-E-A-T signals: `<present | weak | missing>`

## Recommended Fixes
1. `<field/section>`
   - Current: `<value>`
   - Suggested: `<replacement>`
   - Why: `<reason>`

## Validation
- `<check>`: `<result or blocker>`

## Next Step
Ask whether to apply edits unless the user already asked.
```

## Rules

- Page-scoped. Don't crawl the whole site for one metadata issue.
- Never invent canonical or image URLs.
- Tool output is evidence, not final judgment.
- Metadata serves searchers first, not keyword density.
- Keyphrase density 0.5–3% is a guide, not a mechanical target — natural fit takes priority.
- E-E-A-T flags are advisory: note absence, don't fabricate signals in metadata.
