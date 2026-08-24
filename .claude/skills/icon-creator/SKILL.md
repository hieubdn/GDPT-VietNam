---
name: icon-creator
description: Create hieubdn website icons, SVG illustrations, and simple visual assets that match page content, brand style, accessibility, and performance needs.
---

# Icon Creator

Brand palette and voice in `_shared/brand.md`. Validation via `_shared/validation.md`.

Use for: section illustrations, service icons, engagement-model graphics, process diagrams, card icons, simple hero support graphics, replacing poor/generic page images.

Don't use for: full brand identity, complex campaigns, social media batches, photo editing, UI component design, layout-only changes.

## Asset rules

Must: match exact section message; SVG first; clean flat illustration; load fast and scale well; fit brand colors/tone; avoid generic AI art; useful alt text; reuse existing site patterns.

## Required context (ask only what changes direction)

1. **Target page/component** — file path, section title, current image
2. **Message** — what the section says, what the user should understand, what should NOT be implied
3. **Asset type** — icon / section illustration / process diagram / card graphic / hero support
4. **Placement & size** — inline / card / two-column / hero, existing dims or aspect ratio
5. **Output** — concept only / external-tool prompt / SVG draft / final asset / page reference update

## Visual direction

Prefer: simple shapes, clear business meaning, 1 main idea per image, limited palette, human + workflow visuals when helpful, soft rounded shapes, thin outlines or flat fills, balanced whitespace.

Avoid: too many people/devices, abstract blobs, stock-photo style, 3D mascot, tiny unreadable details, text inside images (unless required), fake dashboards, overly complex isometric.

## Color palette (`apps/web/app/globals.scss`)

Site has no single fixed brand color — it's a neutral zinc/gray palette with light and dark themes.

- Light — page bg `#f8f9fa`, text primary `#18181b`, text muted `#52525b` / `#6b7280`, border `#e6e6e6`, accent `#dc2626`
- Dark — page bg `#1c1c1d`, text primary `#ffffff`, text muted `#b8bcc4` / `#8b9099`, border `#3d4044`, accent `#f87171`

## Color modes

Default mono. Allowed: mono (default for small/repeated/utility/nav/tag), two-color (simple service cards or section icons needing depth), three-color (richer section illustrations or process visuals). More than 3 main colors needs approval.

For multi-color: max 3 main; neutral grey/zinc primary; darker zinc for outlines / strong contrast; light surface for fills; accent red/coral only for highlights; no rainbow / heavy gradients; still readable at small size and in both light and dark mode.

Smart derivation: start from palette; lighter backgrounds from `#f8f9fa` (light) / `#2a2c2e` (dark); darker lines from `#18181b` / `#52525b`; prefer opacity over new colors; match surrounding section palette first; always check the icon reads correctly in both themes.

## Icon backgrounds

Use when icon appears in card grid / needs contrast / surrounding set already uses boxes / needs softer visual weight.

Shapes: soft rounded square; soft circle; light blob for larger illustrations; no bg for inline / nav / very small.

Color: neutral surface tint (`#f8f9fa` light / `#2a2c2e` dark); accent color only when mark is a single flat fill; consistent across same set; don't mix circles/squares unless existing design does.

**Alternating colorful backgrounds** — for card grids when user wants a stronger set: alternate backgrounds while keeping one shared shape, canvas, stroke/fill density, palette. Systematic, not random — each icon still feels like same family.

## Set consistency

Same set/grid/section/area must share one style. Before creating/replacing one icon: inspect nearby icons; match stroke width, corner radius, fill style, color mode, bg shape, density, canvas/viewBox, detail level. Don't introduce richer style into mono set, or flat mono into richer illustration set, unless intentional. If a new icon must differ, explain why first.

Known patterns: case-study tag icons (mostly single-color SVG); engagement-model feature cards (52px blue icon box, centered 28px icon); mega menu icons (compact service/industry); success-story icons (square consistent set).

## Concept process

Propose 2–3 concepts. Each: **Name**, **Visual idea**, **Message fit**, **Risk**.

When request asks for stronger / "game changer" visuals, include at least one bolder brand-safe variant. Bolder = better composition / background treatment / metaphor clarity — never extra colors / clutter / gradients / off-brand decoration.

Recommend one — most clear, least generic, easiest to maintain, best fit, strongest upgrade when standout is wanted.

## Asset reuse cache

Before creating, search existing by file-name keywords, page/topic name, section purpose, alt text, similar visual meaning in `apps/web/assets/image/` and `apps/web/public/icons/`.

Reuse when message same/close, style fits, asset still accurate, only alt/placement needs changing.

Create new only when no match, old is poor/outdated/misleading, dim/format diverges enough, user asks for new direction.

When creating new SVG, add metadata comment near top:

```xml
<!-- icon-creator: topic="project-timeline" purpose="delivery-flow" reuse-key="project-scope-build-ship" -->
```

`reuse-key` describes visual meaning, not file path.

## SVG rules

- Semantic kebab-case file names
- Local files under `apps/web/assets/image/` (or `apps/web/public/icons/` for app/manifest icons)
- Readable and compact; use `viewBox`
- No embedded raster / external fonts / scripts / animation / event handlers / remote refs / design-tool metadata / hardcoded text (unless asked)

Security: no `<script>`, no `onload`/`onclick`/event handlers, no external URLs, no `foreignObject` without strong reason.

## File naming

```text
apps/web/assets/image/<page-or-topic>/<asset-purpose>.svg
```

Examples: `skill/nextjs-icon.svg`, `project/deployment-pipeline.svg`, `about/timeline-milestone.svg`.

## Alt text

Describe meaning, not shapes. Short. Match page message. No keyword stuffing.

Good: `Project delivery flow from scope planning to release`
Bad: `Best full stack developer portfolio project illustration`

## Integration

Preserve content meaning; replace only the relevant image reference; keep existing layout unless asked; use existing image components / MDX patterns; run validation when available; verify visible changes in browser preview.

## Output

Brainstorming:

```markdown
## Visual Concepts
### Concept A: <name>
- **Visual idea**: ...
- **Message fit**: ...
- **Risk**: ...

## Recommendation
<concept and why>
```

Implementation:

```markdown
## Created Asset
- File: `<path>`
- Type: `<icon|illustration|diagram>`
- Alt text: `<alt>`
- Used in: `<page/component>`

## Verification
- `<check>`
```

## Canva MCP

Use only for Brand Kit templates, sales deck visuals, social variants, PDF/presentation exports, many campaign sizes. Default to local SVG for website work — custom concept → SVG draft → browser preview verification.

## Principles

YAGNI (solves only current need), KISS (concept understandable fast), DRY (reuses site style), Performance (lightweight), Accessibility (useful alt).
