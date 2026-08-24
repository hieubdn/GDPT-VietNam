---
name: seo-audit
description: Full hieubdn page SEO audit composer. Runs basic metadata/image checks, readability checks, technical SEO checks, focused link audit checks, and delegates text emphasis guidance to content-emphasis when needed.
---

# SEO Audit

Full page SEO audit composer. Combines basic / readability / technical / link checks; delegates emphasis to `content-emphasis`. Follows `_shared/workflow.md`; runs commands from `_shared/validation.md`.

## Routing

Use **this skill** for general page audits combining metadata + links + readability + technical.

Use a focused sub-skill instead when the user asks only for one area:

| Ask | Skill |
| --- | --- |
| Internal/external/inbound/broken links, anchor text, crawl depth | `seo-audit-links` |
| Title (≤60 chars) / meta (≤155 chars) / keyphrase density (0.5–3%) / keyword placement / canonical / OG / `og:image` / alt text / headings / E-E-A-T signals | `seo-audit-basic` |
| Word count (≥300 / ≥900 cornerstone) / sentence length / passive voice / transition words / paragraph density / subheading distribution / Flesch score / scanability / keyword overuse / CTA copy | `seo-audit-readability` |
| Schema / JSON-LD / indexability / robots / sitemap / hreflang / Core Web Vitals / AI search readability | `seo-audit-technical` |
| Emphasis / bolding / scanability decoration | `content-emphasis` |

## Workflow

1. **Resolve pages** — accept URL path, content path, or page name. Ask one short question only when ambiguous. Batch bulk requests; keep output compact.
2. **Basic** — title (≤60 chars), meta (≤155 chars), keyphrase in title/meta/slug/intro/subheading, keyphrase density (0.5–3%), E-E-A-T signals, hero/H1, canonical, OG/social, `og:image`, alt text, basic heading structure. Read only the target source.
3. **Readability** — word count vs minimums (300 regular / 900 cornerstone), sentence length (≤25% over 20 words), passive voice (≤10%), transition words (≥30%), subheading every 300 words, paragraph density, Flesch score, scanability, repetition / keyword overuse, CTA clarity. Don't recommend word-count padding.
4. **Technical** — structured data (currently none in the repo; any schema is a from-scratch addition), indexability, rendered metadata vs canonical, page-experience basics, AI search readability, JS-render risks. There's no sitemap/robots/hreflang to check yet (no locale routes exist) — see `seo-audit-technical`. Don't turn the audit into a full site crawl.
5. **Links** — current internal/external links, broken/dead targets, anchor quality, natural body placements. This repo has no link-graph tool — manual review via `seo-audit-links`.
6. **Editing escalation** — only when relevant:
   - Broad copy edits across structure/tone/conversion/emphasis → `content-revise`
   - Section order / heading flow / dense blocks → `content-structure`
   - Generic / hype-heavy / off-tone copy → `content-tone`
   - CTA / proof / buyer pain / lead flow → `content-conversion`
   - Emphasized text / phrase decoration → `content-emphasis`

   Don't turn every audit into a full rewrite.

## Priority

**High** — missing/duplicate/weak title or meta; missing or irrelevant `og:image`; wrong canonical or route mismatch; accidental noindex / rendered-metadata mismatch; broken internal links.

**Medium** — weak heading structure; thin / bloated / dense / repetitive body; unclear CTA; generic alt text on meaningful images; missing schema worth adding (see `seo-audit-technical`); overloaded / weak anchor text.

**Low** — minor wording; optional social polish; minor page-experience notes; nice-to-have links; minor readability polish; optional emphasis improvements.

## Edits & validation

Recommend before editing unless the user already asked to apply.

When editing: only high-confidence metadata / image / text / link improvements; preserve meaning and positioning; no keyword stuffing; schema stays truthful to visible content; prefer `PATH_URL` constants over hardcoded routes; never add weak links to raise scores; never invent image / canonical URLs or unsupported claims; use `content-emphasis` guidance when emphasis is involved.

Run smallest relevant checks from `_shared/validation.md`. Typical:

```bash
pnpm check-types
pnpm lint
# for rendered-output checks
pnpm build
```

## Output

```markdown
## Page SEO Audit Result
- Page: `<page>`
- Basic / Readability / Technical / Links: `<pass|warn|fail>`
- Main issue: `<short>`

## Basic Findings
- Title / Meta / Keyword alignment / Canonical / OG image / Alt: `<finding>`

## Readability Findings
- Depth / Density / Scanability / Repetition / CTA clarity: `<finding>`

## Technical Findings
- Indexability / Canonical-vs-rendered / Schema / Sitemap-robots-redirects / Page experience: `<finding>`

## Link Findings
- Internal count / External count / Inbound gap / Broken / Localized→EN fallback (when relevant): `<finding>`

## Recommended Fixes
1. `<field/section/link>`
   - Suggested: `<change>`
   - Why: `<reason>`

## Validation
- `<check>`: `<result or blocker>`

## Next Step
Ask whether to apply edits unless the user already asked.
```

## Rules

- Keep audits page-scoped and bounded.
- Don't let page SEO become sitewide crawling.
- Don't add weak links, fake metadata, invented URLs, or unsupported claims to raise a score.
