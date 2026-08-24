---
name: seo-audit-technical
description: Audit hieubdn pages for technical SEO signals — structured data, indexability, rendered metadata, canonical consistency, and page-experience basics, matched to this Next.js repo's actual setup (no sitemap/robots/JSON-LD/locale routes exist yet).
---

# SEO Audit Technical

Focused technical SEO check. Follows `_shared/workflow.md`; validation via `_shared/validation.md`.

Use for: JSON-LD/schema (currently none in the repo — greenfield recommendation), indexability, canonical vs rendered metadata, page-experience basics, JS-render risks, PWA/manifest correctness.

Don't use for: source-only metadata (`seo-audit-basic`), readability (`seo-audit-readability`), links (`seo-audit-links`), emphasis (`content-emphasis`), full perf work.

## Baseline: what already exists

- **No `sitemap.xml` or `robots.txt`** — neither `apps/web/app/sitemap.ts` nor `apps/web/app/robots.ts` exists. Flag as a real gap only if the user wants to close it; don't assume they're missing by accident.
- **No JSON-LD / structured data anywhere in the app.** Any schema recommendation here is a from-scratch addition, not a fix to something broken.
- **No locale routes** — there is no hreflang/`translations` concept to check; locale switching is client-side only (see `_shared/workflow.md`).
- **Metadata** comes from Next.js `Metadata` objects (`apps/web/app/layout.tsx` site-wide, optional per-route `export const metadata`), not frontmatter.
- **PWA**: `@ducanh2912/next-pwa` is enabled only in production builds (`next.config.js`), with `manifest.json` and `public/icons/`. A strict CSP + security headers are already set in `next.config.js` — don't propose changes there without flagging it as a config change, not a content fix.

## Workflow

1. **Resolve page** — route path or component file.

2. **Read source.** Capture the route's `Metadata` (own or inherited from `layout.tsx`), page structure (H1/H2 flow across its section components), and whether it renders any FAQ/breadcrumb-like content that could later carry schema.

3. **Inspect rendered output when needed.**
   ```bash
   pnpm build && pnpm --filter web start
   ```
   Check `<title>`, meta description, canonical (Next.js sets this from `metadataBase` + route), robots meta, OG/Twitter tags, single H1, and confirm content isn't hidden behind client-only rendering that Google can't see (this app is mostly `"use client"` components rendered via SSR/RSC, so verify important text still appears in the initial HTML, not just after hydration).

4. **Structured data (optional, greenfield).** If proposing schema, keep it minimal and truthful:
   - `Person` (or `ProfileType`/`WebSite`) on the home page — name, job title, sameAs (GitHub/LinkedIn/etc. from `SOCIAL_LINKS` in `apps/web/config/path.ts`).
   - `CreativeWork`/`SoftwareSourceCode`-style entries per project are optional and low-value for a portfolio this size — don't over-engineer.
   - Never invent reviews, ratings, offers, or organization claims — there is no company/product being sold here.

5. **Indexability / crawlability.** No `noindex` accidentally added; canonical matches the route; if the user wants a sitemap/robots file, that's a new build (`apps/web/app/sitemap.ts` / `apps/web/app/robots.ts`), not a fix — say so explicitly rather than assuming one exists to audit.

6. **Page experience basics.** Flag only obvious SEO-relevant issues: oversized hero images missing `next/image` sizing, missing `alt`, layout-shift risk, mobile-unfriendly structure. Not a full perf audit.

7. **AI search readability.** Check that important pages are parseable by AI-driven search/answer engines: clear H2/H3 structure, key claims/descriptions not hidden behind client-only rendering, consistent naming for the person/projects across the page.

8. **Recommend conservatively.** Signal/area, current state, suggested fix, why. When editing: keep schema truthful and minimal; don't add sitemap/robots/schema without flagging it as new scope first.

9. **Validate** — `pnpm check-types`; `pnpm build` when rendered output/metadata needs inspecting.

## Output

```markdown
## Technical SEO Audit Result
- Page: `<page>`
- Indexability / Structured data / Rendered metadata / Page experience / AI readability: `<pass|warn|fail|unknown|n/a>`
- Main issue: `<short>`

## Technical SEO Findings
- Indexability / Canonical-vs-rendered / Schema / Page experience / AI readability: `<finding>`

## Recommended Fixes
1. `<signal/area>`
   - Suggested: `<change>`
   - Why: `<reason>`

## Validation
- `<check>`: `<result or blocker>`

## Next Step
Ask whether to apply edits unless the user already asked.
```

## Rules

- Page-scoped; never expand into a sitewide crawl.
- Never invent schema claims, reviews, ratings, or offers — this is a personal portfolio, not a business with products.
- Schema must match visible content.
- Adding sitemap/robots/JSON-LD is new scope, not a bug fix — call it out as such.
- Core Web Vitals = awareness only unless perf work is requested.
- If rendered output isn't available, report source-level confidence and validation blockers.
