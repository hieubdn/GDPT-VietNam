---
name: project-entry-builder
description: Add or update a project entry on the hieubdn portfolio — `apps/web/config/projects-data.ts`, poster/detail images, locale description key, and project-detail wiring.
---

# Project Entry Builder

Use this skill when creating or updating a project shown on `/projects` and its detail page.

Load on demand:
- Brand voice and content DNA → `_shared/brand.md`
- Validation commands → `_shared/validation.md`

Use for:
- Adding a new project card + detail page.
- Updating an existing project's copy, images, or links.
- Fixing broken poster/detail image wiring for a project.

Don't use for:
- The About, Contact, or Home page content — use `page-builder`.
- Pure SCSS/layout refactors of the projects page itself.

## 1. Where a project lives

A project is defined across three places that must stay in sync:

1. **`apps/web/config/projects-data.ts`** — one `ProjectData` object per project:
   ```ts
   {
     slug: "kebab-case-id",
     name: "Display Name",
     category: "Web Development" | "Web & App Development" | ...,
     description: "Fallback English description (also used as source text for i18n).",
     design: "Designer/Agency Name" | ["Name A", "Name B"],
     client: "Client Name" | ["Client A", "Client B"],
     projectUrl: "https://live-project-url.example.com/",
   }
   ```
   `design`/`client` accept a single string or a string array (rendered as multiple chips). Use `"#"` for `projectUrl` only if there is genuinely no live link.

2. **`apps/web/components/pages/projects/project-detail/project-detail.tsx`** — poster and detail images are wired by slug in two lookup maps:
   ```ts
   const PROJECT_IMAGES: Record<string, StaticImageData> = { "<slug>": posterImport, ... };
   const PROJECT_DETAIL_IMAGES: Record<string, StaticImageData[]> = { "<slug>": [detailImport1, ...], ... };
   ```
   Add a new `import` for each image under `apps/web/assets/image/projects-page/<project-folder>/`, then register it in both maps (poster is required; detail images are optional).

3. **`database/locales/en.json`** — the rendered description comes from a translation key, not the raw `description` field:
   ```json
   "project.<slug>.description": "<same text as, or refined version of, the description field>"
   ```
   The `description` field in `projects-data.ts` is a fallback/source string; the live page renders `t("project.<slug>.description")`.

## 2. Workflow

1. **Resolve intent** — new project vs. update; which fields/images/links change.
2. **Gather inputs**: project name, category, one-paragraph description, designer/agency credit, client name, live URL, poster image, optional detail images (screenshots).
3. **Add/update the `ProjectData` entry** in `projects-data.ts`. Keep `slug` stable once published (it's the route param and the image-map key).
4. **Add image imports + poster/detail map entries** in `project-detail.tsx`. Reuse existing images under `apps/web/assets/image/projects-page/` if the project already has assets; otherwise ask for image files or hand off to `image-creator`/`icon-creator` for a generated poster only if no real screenshot exists (prefer real product screenshots over generated art for project proof).
5. **Add the `project.<slug>.description` key** to `database/locales/en.json`, matching (or lightly polishing) the `description` field text.
6. **Run `pnpm generate:locales`** so the description key gets machine-translated into `vi`, `ja`, `zh-CN`, `ko`, `de`, `fr`. Review generated translations only if the user asks for a quality pass — the script is a first draft, not a final translation.
7. **Update `apps/web/components/pages/projects/project-detail/project-nav.tsx`** only if project ordering/navigation is affected — check whether it derives order from `PROJECTS_DATA` automatically before editing it directly.

## 3. Writing rules

Apply `_shared/brand.md` content DNA. Specifically for project copy:
- Lead with what the project is and who it's for, then the technical angle.
- Name real technologies/patterns used (e.g. "BLoC pattern", "CLEAN architecture") when known — existing entries do this in the `design` field.
- Don't invent metrics, client names, or outcomes not in the source material.
- Keep `description` to one focused paragraph (existing entries run ~2–4 sentences).

## 4. Validation

```bash
pnpm check-types
pnpm lint
```

If locale files changed:
```bash
pnpm generate:locales
```

Visually verify the new/updated card on `/projects` and the detail route before reporting done.

## 5. Output

```markdown
## Project Entry Result
- Slug / Action: `<slug>` — `<create|update>`

## Files Changed
- `apps/web/config/projects-data.ts`
- `apps/web/components/pages/projects/project-detail/project-detail.tsx`
- `database/locales/en.json`

## Validation
- `<command>`: `<result>`

## Remaining Gaps
- `<image not provided, translation not reviewed, etc., or none>`
```
