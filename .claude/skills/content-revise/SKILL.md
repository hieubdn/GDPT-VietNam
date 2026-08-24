---
name: content-revise
description: Full hieubdn content revision composer. Reviews and, when requested, updates page copy through content-structure, content-tone, content-conversion, and content-emphasis guidance.
---

# Content Revise

Composer for hieubdn content editing. Follows `_shared/workflow.md`; validation via `_shared/validation.md`.

Combines: `content-structure` (order/flow/density), `content-tone` (voice/B2B clarity), `content-conversion` (CTA/proof/pain), `content-emphasis` (restrained bolding).

Use for: revise/polish/clean/professionalize copy without full rewrite.

Don't use for: SEO-only audits (`seo-audit*`), full page creation (`page-builder`), locale dictionary work (`locale-dictionary-audit`).

## Workflow

1. **Resolve scope** — route / file / page / section / pasted block. Batch bulk requests.

2. **Read target only.** Capture page metadata when relevant, hero, H2/H3 flow, section order, body paragraphs, proof/trust, FAQ, CTA labels + surrounding copy, existing emphasis/links.

3. **Light composer pass.** Don't run every helper deeply by default. Identify which areas need work:
   - Structure → `content-structure`
   - Tone → `content-tone`
   - Conversion → `content-conversion`
   - Emphasis → `content-emphasis`

   Skip areas already fine.

4. **Review in order.**
   - Structure: section order, heading flow, dense sections, overlap, missing blocks, CTA position.
   - Tone: generic / AI-like wording, vague claims, casual/complex imbalance, weak verbs, filler, hieubdn brand-voice fit.
   - Conversion: value prop, buyer pain, proof, CTA clarity, objections, lead flow.
   - Emphasis: only when bolding/scanability decoration is in scope. Don't bold every keyword or new link.

5. **Recommend before editing** unless user asked to apply.

   When editing: high-confidence only; preserve meaning, positioning, factual claims; never invent proof / numbers / project outcomes / guarantees / capabilities; no keyword stuffing; no full rewrite when focused edits suffice; metadata stays plain unless task includes metadata; preserve useful links/emphasis; if English copy changes, check whether the corresponding key in `database/locales/en.json` needs updating too (see `locale-dictionary-audit`).

6. **Validate** — `pnpm check-types` and `pnpm lint` (no dedicated content-token/SEO linter exists in this repo). If metadata or internal links changed, manually verify the route exists in `apps/web/config/path.ts` and the metadata still matches `apps/web/app/layout.tsx` conventions.

## Output

```markdown
## Content Revision Result
- Target: `<page/content>`
- Structure / Tone / Conversion / Emphasis: `<pass|warn|fail>`
- Main issue: `<short>`

## Findings
- Structure / Tone / Conversion / Emphasis: `<finding>`

## Recommended Changes
1. `<section/line>`
   - Suggested: `<change>`
   - Why: `<reason>`

## Applied Changes
- `<change made, or none>`

## Validation
- `<check>`: `<result or blocker>`

## Next Step
Ask whether to apply edits unless the user already asked.
```

## Rules

- Composer, not auto-rewriter — check first, edit only when asked.
- Preserve meaning and factual accuracy.
- Never invent proof or claims.
- Focused edits > full rewrites.
- SEO audits stay in `seo-audit`.
- English copy changes may need a matching update in `database/locales/en.json` — check with `locale-dictionary-audit`.
