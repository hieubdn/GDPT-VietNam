---
name: content-structure
description: Review and improve hieubdn page content structure — section order, H2/H3 flow, intro-to-CTA progression, dense sections, missing blocks.
---

# Content Structure

Focused structure review. Follows `_shared/workflow.md`; validation via `_shared/validation.md`.

Use for: section order, H2/H3 flow, scanability, splitting dense sections, intro/proof/process/FAQ/CTA progression, missing blocks.

Don't use for: broad revision (`content-revise`), metadata (`seo-audit-basic`), links (`seo-audit-links`), technical (`seo-audit-technical`), word-count/repetition (`seo-audit-readability`), tone (`content-tone`), CTA-only (`content-conversion`), bolding (`content-emphasis`).

## Default flow

1. Clear promise → 2. Buyer problem → 3. Service scope → 4. Proof / differentiators → 5. Process / delivery model → 6. Related services / use cases → 7. FAQ → 8. CTA.

`ActionPanel` for contextual next-step moments after proof, lists, comparisons, results, decision points. `CtaBanner` for final or standalone page-level CTA. Don't force every page into this exact order — fit page intent.

## Workflow

1. **Resolve scope** — page / file / section / pasted block.

2. **Read target only.** Capture hero, H2/H3, section order, repeats/overlaps, dense paragraphs/lists, CTA positions, FAQ position.

3. **Identify issues.** Weak/missing intro; unnatural order; H2 lacking buyer value; noisy H3; dense blocks needing split; repeated ideas; missing proof/process/CTA support; FAQ placed wrong for the page.

4. **Recommend minimal changes.** Prefer moving sections, renaming headings, splitting paragraphs, merging duplicates, adding only sections that serve the goal. Avoid broad rewrites unless asked.

5. **Escalate only when needed.**
   - Structure change needs voice polish → `content-tone`
   - Structure issue is really CTA/lead flow → `content-conversion`
   - Moved/rewritten text needs emphasis → `content-emphasis`

   Don't turn structure tasks into full SEO audits.

6. **Validate** — `pnpm check-types` and `pnpm lint` (no dedicated content-token/SEO linter exists in this repo). If headings/section order changed, re-check the page still reads correctly against `_shared/workflow.md`.

## Output

```markdown
## Content Structure Review
- Target: `<page/content>`
- Structure: `<pass|warn|fail>`
- Main issue: `<short>`

## Findings
- Section order / Heading flow / Density / Missing sections / CTA placement: `<finding>`

## Recommended Changes
1. `<section/heading>`
   - Suggested: `<change>`
   - Why: `<reason>`

## Next Step
Ask whether to apply edits unless the user already asked.
```

## Rules

- Structure first, rewrite second.
- Move and tighten existing content before adding.
- No filler sections.
- Don't force every page into the same template.
- Keep buyer journey clear.
