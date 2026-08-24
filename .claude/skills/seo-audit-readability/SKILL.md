---
name: seo-audit-readability
description: Audit hieubdn page copy for SEO readability, including word count, paragraph density, heading scanability, repetition, keyword overuse, and CTA clarity.
---

# SEO Audit Readability

Focused readability check. Follows `_shared/workflow.md`; validation via `_shared/validation.md`.

Use for: word count / depth / thin content risk, paragraph density, heading scanability, repetition / keyword overuse, buyer scan-friendliness, CTA clarity, trim/expand/restructure decisions.

Don't use for: metadata (`seo-audit-basic`), links (`seo-audit-links`), emphasis rules (`content-emphasis`), full rewrite, perf/a11y/UI QA unrelated to readable text.

## Workflow

1. **Resolve page** — URL / file path / name.

2. **Read target source only.** Capture: page `Metadata` title + description (own or inherited from `apps/web/app/layout.tsx`), hero/intro copy, H2/H3 flow, main body sections, CTA labels + surrounding copy, from the page's components under `apps/web/components/pages/**`. Readability findings are main-content findings; ignore global header, footer, nav drawer, and shared layout copy unless explicitly requested.

3. **Judge content depth.** Approximate word count against Yoast minimums: regular posts/pages ≥ 300 words, cornerstone content ≥ 900 words. Judge thin/bloated sections against page intent, FAQ coverage of search intent, balance of explanation / proof / process / CTA. Don't pad word count — only recommend more content when intent genuinely requires it.

4. **Check scanability against Yoast thresholds.**

   | Signal | Yoast threshold | Flag when |
   |---|---|---|
   | Sentence length | ≤ 25% of sentences exceed 20 words | > 25% are long |
   | Passive voice | ≤ 10% of sentences | > 10% passive |
   | Transition words | ≥ 30% of sentences contain one | < 30% (orange < 20% = red) |
   | Paragraph length | ≤ ~150 words per paragraph | paragraphs clearly over |
   | Subheading distribution | H2/H3 at least every 300 words | long stretches with no heading |
   | Consecutive same-word starts | ≤ 3 sentences in a row | > 3 starting with same word |
   | Flesch Reading Ease | > 60 = good; 50–60 = needs work; < 50 = difficult | score below 60 |

   H2 clarity / buyer value, H3 substructure, long lists needing grouping, CTA placement and surrounding context. Prefer minimal edits to broad rewrites.

   Cornerstone content applies stricter standards: longer minimum length, more subheadings, denser linking from other pages.

5. **Check repetition.** Exact-match primary keyword overused, awkward secondary keywords, repeated brand/service phrases in adjacent paragraphs, keyword-stuffed headings or CTAs. Suggest natural alternatives only when repetition hurts readability.

6. **Escalate only when needed.**
   - Broader copy edits across structure/tone/conversion/emphasis → `content-revise`
   - Section / heading / paragraph restructuring → `content-structure`
   - Generic / hype-heavy / off-tone wording → `content-tone`
   - CTA / proof / pain / lead flow → `content-conversion`
   - Bold / emphasized phrases → `content-emphasis`

   Don't turn readability audits into full rewrites.

7. **Recommend conservatively.** Per issue: section/line area, current problem (if short), suggested direction or replacement, why.

   When editing: preserve meaning and positioning; no keyword stuffing; no word-count padding without value; keep metadata plain; supporting skills only when edits truly need them.

8. **Validate** — `pnpm check-types` and `pnpm lint` (no dedicated content-token/SEO linter exists in this repo). Link changes → use `seo-audit-links` validation.

## Output

```markdown
## SEO Readability Audit Result
- Page: `<page>`
- Readability / Depth / Scanability: `<pass|warn|fail>`
- Main issue: `<short>`

## Readability Findings
- Word count / depth: `<finding + vs minimum>`
- Sentence length: `<% long sentences vs 25% threshold>`
- Passive voice: `<% passive vs 10% threshold>`
- Transition words: `<% with transitions vs 30% threshold>`
- Paragraph density / Subheading distribution: `<finding>`
- Repetition / CTA clarity: `<finding>`

## Recommended Fixes
1. `<section/line>`
   - Suggested: `<change>`
   - Why: `<reason>`

## Validation
- `<check>`: `<result or blocker>`

## Next Step
Ask whether to apply edits unless the user already asked.
```

## Rules

- Page-scoped.
- Never recommend word-count padding. Minimums (300 / 900 words) flag thin content, not targets to hit mechanically.
- No whole-page rewrite unless explicitly asked.
- Word count is evidence, not goal.
- Clear buyer value > exact keyword repetition.
- Report Yoast thresholds as context, not absolute rules — a page may justify exceptions if intent fits.
- Cornerstone pages: apply stricter minimums and expect denser subheading + internal link coverage.
