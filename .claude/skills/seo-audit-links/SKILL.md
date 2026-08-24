---
name: seo-audit-links
description: Run focused hieubdn page link audits for internal links, external links, broken/dead targets, and practical body-link placement recommendations.
---

# SEO Audit Links

Focused link audits — manual review, since this repo has no automated link-graph tool. Follows `_shared/workflow.md`; commands in `_shared/validation.md`.

Use for: page internal/external link audits, broken-link checks, finding links to add, outbound target & anchor review, post-edit validation.

Don't use for: metadata checks (`seo-audit-basic`), full content writing, UI styling, non-website code, generic SEO advice without a page.

## Workflow

1. **Resolve page** — route path (from `apps/web/config/path.ts` → `PATH_URL`) or component file path.

2. **Read the target's section components** under `apps/web/components/pages/**` for the page. There is no built link-graph report to read — this is a direct source read.

3. **Inventory current links** in the target: search for `<Link href=` and raw `<a href=` in the relevant components.
   ```bash
   grep -rn "Link href=\|<a href=" apps/web/components/pages/<page>/
   ```
   For each: is the target a route that exists in `PATH_URL` (or a valid external URL)? Any hardcoded path string that should instead reference `PATH_URL`?

4. **Find natural internal-link opportunities.** This site is small (Home, About, Projects, Contact, News, Acadify/survey) — realistic internal links are mostly: About → Projects/Contact, Projects card/detail → Contact, Home blocks → Projects/About/Contact, News → external source articles (already external by design). Don't invent link opportunities the page doesn't have room for; a personal portfolio doesn't need dense internal linking.

5. **Check external links** (GitHub, LinkedIn, live project URLs in `apps/web/config/path.ts` → `SOCIAL_LINKS`, and `projectUrl` in `apps/web/config/projects-data.ts`): confirm they're not obviously stale/placeholder (`#`), and use `rel="noopener noreferrer"` with `target="_blank"` per the existing pattern in `project-detail.tsx`.

6. **Produce placement recommendations**: target route/URL, anchor text, source file + section, existing sentence to edit or new sentence, reason. Don't force links into unrelated copy.

7. **Ask before editing** unless the user already asked.

   When editing: preserve meaning; no keyword stuffing; descriptive anchors; use `PATH_URL` constants instead of hardcoded route strings; external links keep `target="_blank" rel="noopener noreferrer"`; use `content-emphasis` for bold edits.

8. **Validate** — `pnpm check-types` and `pnpm lint`. Manually click through changed links in the dev server if unsure a route resolves.

## Output

```markdown
## SEO Link Audit Result
- Page: `<page>`
- Current internal links: `<count>`
- Current external links: `<count>`
- Main issue: `<short>`

## Findings
- `<link>` — `<target exists? yes/no>` — `<issue, or none>`

## Body Placement Recommendations
1. `<section/line>`
   - Add: `<anchor>` → `<target>`
   - Suggested text: `<sentence>`
   - Why: `<reason>`

## Next Step
Ask whether to apply edits.
```

## Rules

- This is a manual review — no CLI link-graph tool exists in this repo.
- Don't add links that hurt readability or feel forced on a small personal site.
- Never invent a route; check `apps/web/config/path.ts` first.
- Exact body placement is a human review step.
- All edits from reports are pending approval until the user agrees.
