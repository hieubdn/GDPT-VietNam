# hieubdn Shared Brand Reference

Load only when a skill needs brand details (colors, voice, content DNA).

## Palette (theme tokens)

Site uses a neutral zinc/gray palette with light and dark themes (no single fixed "brand color"). Full tokens live in `apps/web/app/globals.scss`.

- Light — page background: `#f8f9fa`, text primary: `#18181b`, text muted: `#52525b` / `#6b7280`, border: `#e6e6e6`, accent/hover: `#dc2626`
- Dark — page background: `#1c1c1d`, text primary: `#ffffff`, text muted: `#b8bcc4` / `#8b9099`, border: `#3d4044`, accent/hover: `#f87171`

## Voice

Confident, direct, practical, technically credible. Reads like a full-stack developer presenting real, shipped work — not a sales or marketing pitch. First-person portfolio voice where natural ("I build...", "I focus on...").

## Content DNA (apply to all pages)

1. Lead with what was built and why it matters, then the technology behind it.
2. Show technical depth without over-explaining fundamentals.
3. Be specific; avoid "passionate", "rockstar", "ninja", "cutting-edge" unless backed by a concrete example.
4. Build trust through real projects, hands-on experience, and specific, verifiable outcomes — not client logos or certifications.
5. Sound human: direct, simple sentences, no buzzword chains.
6. Stay practical; theory only on explicitly educational pages (e.g. the news/tech-articles page).
7. Respect the reader: recruiters, potential clients/collaborators, and fellow developers.

## Position

hieubdn is: an individual full-stack developer with a focused, shippable portfolio of real projects.
hieubdn is NOT: an agency, a company, a team, or a vendor claiming enterprise-scale delivery.

## Stats & personal facts

There is no token-substitution system in this repo (no `{{...}}` templating). Never invent or hardcode a number from memory — pull real figures from their actual source:

- Work history / experience → `apps/web/components/pages/about/company-experience/company-experience-data.ts`
- Project count / list → `apps/web/config/projects-data.ts`
- Any other stat shown on the home page's stats block → its component under `apps/web/components/pages/home/stats-block/`

If a needed number isn't in any of those, ask the user rather than guessing.

## Image style (default)

Clean, modern developer-portfolio aesthetic: flat or semi-flat illustration, neutral grayscale/zinc palette matching the site's light/dark theme, restrained accent color, balanced whitespace, simple shapes, no clutter, no neon, no fake dashboards, no stock-photo clichés.

## Logo / identity assets

No logo file exists in the repo yet. Default to a text wordmark ("hieubdn") or a single initial ("H") where a mark is required. App icons live under `apps/web/public/icons/`.

## Locales

- Supported: `en`, `vi`, `ja`, `zh-CN`, `ko`, `de`, `fr` — dictionaries in `database/locales/*.json`.
- Locale switching is cookie/localStorage based (`profile-locale`), not URL-path based — there are no market-specific routes like `/vn/` or `/jp/`.
