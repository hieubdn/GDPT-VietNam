# Shared Audit/Edit Workflow

Common steps shared across SEO and content skills.

## 1. Resolve target

Accept a route path (e.g. `/about`), a component/content file path, or a page name. Ask one short question only when ambiguous.

For bulk requests, batch and keep output compact.

## 2. Read target source first

Read the target page (`apps/web/app/**/page.tsx`) and its content components (`apps/web/components/pages/**`), plus any data it pulls from (`apps/web/config/*.ts`, `database/locales/en.json` for the visible strings). Capture only fields the skill needs.

Do not scan unrelated pages unless there is a concrete reason.

Unless the user explicitly asks to review sitewide shell content, focus page-content work on the page-specific main content: hero, body sections, FAQs, CTAs, related content blocks, and visible copy owned by the target page. Ignore global header, footer, nav drawer, notification/toast UI, theme/locale switchers, and other shared layout copy for content, readability, tone, conversion, and body-link placement findings.

## 3. Recommend before editing

Unless the user clearly asks to apply edits, report recommendations first.

When editing is approved:

- Preserve meaning and page positioning.
- Avoid keyword stuffing.
- Do not invent claims, images, URLs, project outcomes, numbers, or guarantees.
- Prefer root-relative internal links via `apps/web/config/path.ts` (`PATH_URL`) rather than hardcoded strings.
- Never hardcode user-facing copy — add/update the key in `database/locales/en.json` and consume it through `LocaleProvider`/`useLocaleText`, per `CLAUDE.md`.

## 4. Validate

Use `_shared/validation.md`. Run the smallest relevant subset.

## 5. Report

Use the skill's defined output format. Keep findings short; lead with the main issue.

## Localization rules

This site has no per-market pages or routes (no `/vn/`, `/jp/`, etc.). Localization is JSON-dictionary based — see `locale-dictionary-audit` for the mechanism.

- Never invent a locale route; there isn't one.
- New user-facing copy always starts as a key in `database/locales/en.json`; other locales are backfilled by `pnpm generate:locales`, not hand-translated.
- Don't judge or rewrite translation quality unless explicitly asked — that dictionary is machine-translated by design.
- If a content change removes an English string, check whether its key is now orphaned in the other 6 locale files (see `locale-dictionary-audit`).
