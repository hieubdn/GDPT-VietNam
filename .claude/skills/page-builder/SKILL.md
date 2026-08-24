---
name: page-builder
description: Create or update hieubdn website pages and content with correct brief, tone, SEO, structure, links, localization, and validation.
---

# Page Builder

Use when creating or updating hieubdn website content: the Home page blocks, About, Projects listing/detail copy, Contact, News, Acadify/survey, or substantive updates to existing pages.

For a single project entry (card + detail + images), prefer `project-entry-builder` — it's more specific.

Do not use for: typo fixes, code refactors, style-only changes, deploy tasks.

Load on demand:
- Brand voice, palette, position, stats sourcing → `_shared/brand.md`
- Workflow scaffolding + localization rules → `_shared/workflow.md`
- Validation commands → `_shared/validation.md`

## 1. Brief (gate)

Resolve these before drafting. Infer from page type or existing page when possible; only ask when missing info would change the direction.

- Content type: home block | about | projects | contact | news | acadify/survey | update
- Action: create | update | rewrite | seo-only
- Audience: recruiter / potential client-collaborator / fellow developer / general visitor
- Goal: hiring interest | showcase work | explain background | contact conversion | seo
- Primary keyword (only relevant for SEO-focused updates; most pages don't need one)
- Main CTA + target route (from `apps/web/config/path.ts` → `PATH_URL`)
- Source material + preservation rule (preserve | light edit | restructure | full rewrite)

Blockers: missing audience for a new section, missing CTA target for a conversion-focused change.

## 2. Tone by page type

| Page type | Tone |
| --- | --- |
| Home | Confident, direct, portfolio-first |
| About | Trust-building, personal, mature |
| Projects | Credible, evidence-based |
| Contact | Warm, direct, low-friction |
| News | Friendly, helpful, expert |

Don't mix tones without reason. Apply hieubdn Content DNA from `_shared/brand.md`.

## 3. Site context

```text
apps/web/app/{about,projects,contact,news,acadify}/page.tsx   # routes (App Router)
apps/web/components/pages/{home,about,projects,contact,news}/  # section components
apps/web/config/{path.ts,projects-data.ts}                     # static content data
database/locales/en.json                                       # all user-facing strings
```

Stack: Next.js 16 App Router, React 19, SCSS Modules, `next-pwa`. No CMS, no MDX content collections — content lives in TSX components, TS config objects, and the locale JSON dictionary.

## 4. Metadata

Page metadata is set via Next.js `Metadata`/`generateMetadata` in `apps/web/app/layout.tsx` (site-wide) and per-route `page.tsx` where present — there is no YAML frontmatter. When adding/updating a route's metadata, follow the existing pattern in `app/layout.tsx` (`title`, `description`, `openGraph`, `twitter`) rather than inventing a new schema.

Slugs/routes: register any new route in `apps/web/config/path.ts` (`PATH_URL`) so header/footer/nav pick it up — see `CLAUDE.md`.

## 5. Structure

Home page block order is defined by the `HOME_BLOCKS` array in `apps/web/components/pages/home/home.tsx`: profile → skills → about → projects → selected-work → competencies ("hobby") → quote → testimonials → social → stats → company → blog (renders `PrinciplesBlock`) → call-to-action → atlas. Don't reorder blocks without an explicit ask; add/edit copy within a block's own component under `apps/web/components/pages/home/<name>-block/`.

For a new section on About/Contact/News, keep it consistent with the page's existing block pattern rather than inventing a new one-off layout.

Hero/intro copy must answer: what / who / value / next action.

FAQ blocks only when they help users — none of the current pages use one; don't add one speculatively.

## 6. Emphasis

Emphasize key value, service terms, proof points, decisive differences, CTA-supporting phrases. One or two short bolds per section. Never bold full paragraphs, generic claims, or every keyword.

For deeper guidance, hand off to `content-emphasis`.

## 7. Links

Internal links connect: landing → service → case study → blog → contact. Use natural anchors; avoid "click here", repeated exact-match anchors, or linking the same target many times. Verify every link target exists.

External links only when they add trust (official docs, standards, research). Avoid competitors, thin sources, fragile pages. Follow existing project link-attribute patterns; don't invent `nofollow`/`target=_blank` behavior.

Place CTAs after important sections, not after every block.

- `ActionPanel` — contextual next step inside content.
- `CtaBanner` — page-level conversion moment.

## 8. Stats & images

Stats: never hardcode a number from memory — pull it from its real source per `_shared/brand.md` (`company-experience-data.ts`, `projects-data.ts`, or the relevant home block component), or ask.

Images: reuse existing local assets first (`apps/web/assets/image/`, `apps/web/public/icons/`). Don't invent URLs. Every meaningful image needs descriptive alt. For new visuals, write a brief and hand off to `icon-creator` or `image-creator`.

## 9. Localization

No market routes — see `_shared/workflow.md`. New copy is a key in `database/locales/en.json`, consumed via `LocaleProvider`/`useLocaleText`; other locales are backfilled by `pnpm generate:locales` (see `locale-dictionary-audit`). Never hardcode user-facing strings directly in a component.

## 10. Compliance

Content is public. No unapproved personal data, unverified metrics, or claims that need legal proof.

## 11. Update vs new

**Update existing**: read the page/component, classify sections (keep / outdated / weak / remove). Keep routes and internal links unless broken. Don't remove sections without reason.

**New**: copy structure from the closest existing page/block. Add any new copy as a locale key first, then build the component. Reuse existing components — don't invent new ones unless reuse would worsen the page.

## 12. Validate & report

Run the smallest useful subset from `_shared/validation.md`. After UI-visible changes, preview in the browser using `preview_*` tools — don't ask the user to check.

Final report: files changed, what changed, checks run, content gaps.

## Golden rules

- Reuse existing patterns. Preserve useful existing content.
- Set tone before planning. Don't invent facts. Don't hardcode stats.
- Don't keyword-stuff. Don't break internal links. Don't skip validation.
