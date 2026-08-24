---
name: page-ai-overview-optimization
description: Audit and optimize hieubdn pages for Google AI Overview and AI answer-engine visibility using only this site's existing React components — no invented UI patterns.
---

# Page AI Overview Optimization

Use when auditing or optimizing hieubdn pages for Google AI Overview, ChatGPT Search, Claude Search, Perplexity, Bing Copilot, AEO, or GEO visibility.

Do not use for general SEO-only audits; use `seo-audit` unless the user asks for AI Overview / AI answer-engine optimization.

Load on demand:
- Shared workflow → `_shared/workflow.md`
- Shared validation → `_shared/validation.md`
- Brand rules → `_shared/brand.md`

## Core rules

- Reuse this site's actual existing components only — grep `apps/web/components/pages/**` for the closest match before proposing anything. There is no MDX/component-catalog system here; components are hand-written TSX under `apps/web/components/`.
- Do not invent components that don't exist (no `TechStackTabs`, `ArticleGrid`, `Accordion`, or contact-form-layout components exist in this repo unless you find them — check first).
- Ask the user for missing proof/source material instead of inventing claims.
- Keep recommendations page-scoped unless the user asks for sitewide strategy.
- Optimize for human usefulness first, then extractability for AI systems.

## Required brief

Resolve these before editing. Infer from the existing page when safe; ask only when missing info changes the direction.

- Target page: home | about | projects | contact | news | acadify/survey.
- Primary AI search intent: the main question the page should answer.
- Target audience: recruiter / potential client-collaborator / fellow developer.
- Conversion goal and CTA (usually the Contact page or a social/GitHub link).
- Approved proof: real projects, work history, or testimonials already present in `projects-data.ts` / `company-experience-data.ts` — never invented ones.

Blockers:
- Missing target page.
- Missing primary AI intent for an AI Overview optimization task.
- Missing proof for claims that require evidence.

## Audit checklist

Score each as `pass`, `warn`, or `fail`:

| Area | Check |
| --- | --- |
| Indexability | no accidental `noindex`, wrong canonical, or restrictive metadata |
| Intent match | H1/hero/direct answer match the target query (e.g. "who is hieubdn", "what has hieubdn built") |
| Direct answer | first content section gives a concise answer in 2–4 sentences |
| E-E-A-T/trust | real projects, work history, and verifiable links (GitHub/LinkedIn) are visible — not certifications or client logos |
| Extractable structure | clear H2/H3s, lists, or structured blocks where the page already supports them |
| Internal links | relevant links to Projects/About/Contact with natural anchors |
| Metadata | title, description, OG tags match visible content (`apps/web/app/layout.tsx` or route-level `metadata`) |
| Conversion | CTA to Contact or a real project link appears where it makes sense — don't force one onto every section |

## Missing-information protocol

When proof or source material is missing, ask:

```markdown
I can continue, but these items affect AI Overview quality:

Required:
1. `<missing item>` — why it matters.

Optional but useful:
1. `<missing proof/source>` — where it would improve trust.

Please provide these, or say "infer from existing page" if you want me to proceed with safe assumptions.
```

Never invent metrics, projects, client names, certifications, testimonials, URLs, or capabilities.

## Validation

```bash
pnpm check-types
pnpm lint
```

If UI-visible changes were made, run the dev server and verify the actual page, not just types/lint.

## Output

For audit-only:

```markdown
## AI Overview Page Audit
- Page: `<page>`
- Primary intent: `<intent>`
- Overall status: `<pass|warn|fail>`
- Main blocker: `<short>`

## Scorecard
| Area | Status | Finding |
| --- | --- | --- |

## Recommended Fixes
1. `<issue>`
   - Suggested: `<fix>`
   - Why: `<AI Overview/user/SEO reason>`
   - Needs from user: `<missing info or none>`
```

For edits:

```markdown
## AI Overview Optimization Applied
- Page: `<page>`
- Files changed: `<files>`
- Main improvements: `<summary>`
- Validation: `<checks>`
- Remaining user-supplied gaps: `<gaps>`
```
