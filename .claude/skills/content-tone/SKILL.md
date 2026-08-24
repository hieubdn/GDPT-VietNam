---
name: content-tone
description: Review and improve hieubdn website copy tone — brand voice, B2B clarity, seniority, directness, reducing generic AI-sounding text.
---

# Content Tone

Focused tone polish. Follows `_shared/workflow.md`; validation via `_shared/validation.md`.

Use for: professional/senior/strategic voice, less generic / AI-like wording, brand voice match, B2B clarity, direct & confident wording, removing fluff/hype/vague claims.

Don't use for: broad revision (`content-revise`), structure (`content-structure`), CTA/lead flow (`content-conversion`), bolding (`content-emphasis`), metadata (`seo-audit-basic`), readability (`seo-audit-readability`), full rewrites unless asked.

## hieubdn voice

Clear, practical, confident, technical enough for B2B, helpful not hype-heavy, specific not generic, global and professional.

## Workflow

1. **Resolve scope** — page / file / section / pasted block.

2. **Read target only.** Capture hero, section intros, CTA copy, claims/proof, repeated phrasing, tone differences across sections.

3. **Identify issues.** Generic AI-sounding phrases; empty claims; overly casual / overly complex wording; hype; weak verbs; repeated sentence patterns; inconsistent voice; claims stronger than the page supports.

4. **Recommend focused edits.** Shorter sentences, stronger verbs, specific service language, clear buyer value, realistic claims, professional B2B wording.

   Avoid: changing meaning, adding unsupported claims, making every sentence sales-heavy, page-wide rewrites when polish is enough.

5. **Escalate only when needed.**
   - Tone issue comes from section order → `content-structure`
   - Tone weakens CTA or buyer action → `content-conversion`
   - Edits need emphasis decisions → `content-emphasis`

   Don't turn tone tasks into SEO audits.

6. **Validate** — `pnpm check-types` and `pnpm lint` (no dedicated content-token/SEO linter exists in this repo).

## Output

```markdown
## Content Tone Review
- Target: `<page/content>`
- Tone: `<pass|warn|fail>`
- Main issue: `<short>`

## Findings
- Brand voice / Clarity / Specificity / Credibility / Generic-or-AI wording: `<finding>`

## Recommended Changes
1. `<section/line>`
   - Current: `<text>`
   - Suggested: `<replacement>`
   - Why: `<reason>`

## Next Step
Ask whether to apply edits unless the user already asked.
```

## Rules

- Preserve meaning.
- Keep claims truthful.
- Clear and specific > louder.
- Polish only what needs polish.
