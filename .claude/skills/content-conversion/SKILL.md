---
name: content-conversion
description: Review and improve hieubdn service-page copy for buyer action — CTA clarity, pain points, value proposition, proof, trust signals, lead-focused flow.
---

# Content Conversion

Focused conversion review. Follows `_shared/workflow.md`; validation via `_shared/validation.md`.

Use for: improve conversion, lead-focus, CTA copy/placement, buyer pain, service value, trust signals, proof, problem→contact path.

Don't use for: broad revision (`content-revise`), metadata (`seo-audit-basic`), links (`seo-audit-links`), technical (`seo-audit-technical`), structure (`content-structure`), tone (`content-tone`), bolding (`content-emphasis`), full landing-page strategy.

## Conversion flow

Strong service-page flow answers: buyer problem → service offered → why trust hieubdn → what happens after contact → next action.

## Workflow

1. **Resolve scope** — page / file / CTA / hero / pasted block.

2. **Read target only.** Capture hero promise, pain points, service scope, differentiators, proof/trust, CTA labels + nearby copy, FAQ objections, contact/consultation flow.

3. **Identify issues.** Weak value prop; generic CTA labels; CTA without supporting reason; missing proof near important claims; vague pain points; benefits not tied to business outcomes; too much explanation before first action; FAQ missing common objections; unsupported strong claims.

4. **Recommend focused edits.** Clear CTA labels, short supporting CTA copy, specific benefits, proof tied to visible claims, objection-handling FAQ, better placement of existing proof/CTA.

   `ActionPanel` when context is built and reader needs next step (after proof, lists, comparisons, decision points). `CtaBanner` for major standalone action — final CTA or campaign section.

   Avoid: fake urgency, unsupported guarantees, over-promising, claims absent from business context, full-page rewrites.

5. **Escalate only when needed.**
   - Blocked by section order → `content-structure`
   - Sounds vague/weak/hype → `content-tone`
   - CTA/proof needs emphasis → `content-emphasis`

   Don't turn conversion tasks into SEO audits.

6. **Validate** — `pnpm check-types` and `pnpm lint` (no dedicated content-token/SEO linter exists in this repo). Manually re-check CTA link targets against `apps/web/config/path.ts` if a CTA route changed.

## Output

```markdown
## Content Conversion Review
- Target: `<page/content>`
- Conversion readiness: `<pass|warn|fail>`
- Main issue: `<short>`

## Findings
- Value prop / Buyer pain / Proof / CTA clarity / Objection handling: `<finding>`

## Recommended Changes
1. `<section/line>`
   - Suggested: `<change>`
   - Why: `<reason>`

## Next Step
Ask whether to apply edits unless the user already asked.
```

## Rules

- Conversion is not hype.
- Preserve truthful claims.
- Never invent proof, case studies, numbers, guarantees.
- CTAs clear and specific.
- Fewer strong fixes > many small noisy edits.
