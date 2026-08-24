---
name: image-creator
description: Create hieubdn website and content images via GPT Image 2, Codex Image 2, Gemini Flash Image, proxy API, or Canva — with brand-fit prompts, export plan, and accessibility.
---

# Image Creator

Use for richer-than-icon visuals: section images, hero supports, blog/Medium covers, OG/social images, branded illustrations, agent-side image generation, export planning.

For small SVG icons or repeated card icons → `icon-creator`.

Load `_shared/brand.md` for palette, voice, content DNA, logo assets.

## 1. Required context

Identify before generating:

- **Input**: page path / topic / direct instruction / current image
- **Message**: main idea + audience (recruiter, potential client/collaborator, fellow developer, general)
- **Asset type**: section | hero | blog cover | OG/social | conceptual | diagram | photo-style
- **Placement & dimensions**: inline, two-column, hero, OG (1200×630), square (1080×1080), blog cover (1600×900)
- **Workflow**: prompt-only | generate | integrate; which generator

Ask only when missing info changes direction.

## 2. Style

Default: clean developer-portfolio aesthetic, semi-flat illustration, neutral zinc/gray anchors matching the site's light/dark theme, restrained accent color (red/coral), balanced whitespace, simple shapes.

Character illustrations: dark/light structural neutrals + restrained accent for human energy, clean flat fills, minimal facial detail, friendly collaborative scenes.

Avoid: stock-handshakes, neon sci-fi, busy isometric, fake dashboards, unreadable UI text, mixed icon styles, off-brand colors.

Styles allowed: clean developer-portfolio tech (default), semi-flat illustration, flat vector, high-tech editorial (restrained), diagram/infographic, photo-realistic workspace, soft 3D (restrained).

Use sparingly: vintage/retro, chibi/playful (culture only), anime, cyberpunk (only if requested).

Tuning: flatter > shadowy; medium-high contrast; clean left/primary text area; accent color subordinate to the neutral palette; check both light and dark backgrounds.

## 3. Branding & text in images

**OG/social images** — no fixed logo file exists in the repo yet:
- Default to a text wordmark ("hieubdn") composited afterward, not model-rendered; add a real logo file under `apps/web/public/` if/when one exists and composite that instead.
- Use a simple flat plate behind the wordmark when background is busy. Width ~190–240px at 1200×630.
- Wordmark/logo stays inside safe margins; never as repeating watermark.

**Text in images**:
- Reserve clean empty space in the generated base, composite text afterward (not model-rendered).
- Short headline / label / diagram tags only.
- Fonts: Roboto Serif for H2-style headlines, Open Sans for subtitles/labels. State fallbacks used.
- Localized pages need localized text.
- Don't ask the model to render exact headlines, company names, or certification text.
- Important meaning must also be in alt text / page copy.

## 4. Generator & fallback

- **GPT Image 2** (`gpt-image-2`): default for polished website / hero / OG / campaign.
- **Codex Image 2** (`codex-image-2`): alternative when proxy/agent uses Codex naming.
- **Gemini Flash Image** (`gemini-3.1-flash-image-preview`): fast drafts, variants, low-cost exploration.
- **Canva**: Brand Kit, reusable templates, multi-size social exports.
- **Manual SVG**: precise vector diagrams.

Fallback modes: `strict` (fail-stop), `fallback-allowed` (chain), `auto` (best-available, report what was used). Default to auto when unspecified. Always report requested vs actual model.

## 5. Proxy API execution

Set `IMAGE_PROXY_URL` to your own proxy endpoint (no default is configured for this repo). Never hardcode keys; use env vars / `.env.local` (gitignored). Don't print secrets.

Env template:
```dotenv
IMAGE_PROXY_URL="https://your-image-proxy.example.com/"
IMAGE_PROXY_API_KEY=""
IMAGE_PROXY_DEFAULT_MODEL="gpt-image-2"
IMAGE_PROXY_DRAFT_MODEL="gemini-3.1-flash-image-preview"
IMAGE_PROXY_FALLBACK_MODEL="codex-image-2"
```

Generic call:
```bash
curl -s -X POST "${IMAGE_PROXY_URL%/}/images/generations" \
  -H "Authorization: Bearer $IMAGE_PROXY_API_KEY" \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg model "<model>" --arg prompt "$IMAGE_PROMPT" \
    --arg size "1200x900" --arg format "png" \
    '{model:$model,prompt:$prompt,size:$size,format:$format}')" \
  | jq -r '.data[0].b64_json // .image.b64_json // .b64_json // .candidates[0].content.parts[]?.inlineData.data' \
  | base64 --decode > "$OUTPUT_PATH"
```

If extraction path is unknown, run with `| jq 'keys'` first — don't paste full responses (may contain signed URLs / diagnostics).

If proxy fails: report status/error, suggest retry / simpler prompt / fallback model. Don't pretend an image was generated when only prompt support exists.

After generation: prefer WebP for website (`cwebp -q 82 in.png -o out.webp`); keep PNG/JPG for OG.

## 6. Prompt shapes

**GPT/Codex Image 2** (final website / hero / OG):
```text
Create a clean developer-portfolio illustration for hieubdn about [topic]. Show [subject/metaphor] with [supporting elements]. Modern, credible, practical style for recruiters, clients, and developers. Palette: neutral zinc/gray (#18181b, #52525b, #f8f9fa in light mode; #ffffff, #b8bcc4, #1c1c1d in dark mode), restrained accent red/coral (#dc2626 / #f87171). Composition: [aspect ratio], clear focal point, balanced whitespace, simple shapes, no clutter. Avoid text in image, random dashboards, stock clichés, neon sci-fi, off-brand colors.
```

**Gemini Flash Image** (drafts / variants):
```text
Generate a clean hieubdn developer-portfolio image about [topic]. Show [subject] for [audience/placement]. Polished semi-flat website illustration. Anchors: neutral zinc/gray palette matching light/dark theme, with a restrained accent red/coral and supporting colors [list]. Composition: [aspect ratio], clear focal point, no text, no logos, no fake dashboards, no clutter, no neon, no stock clichés.
```

Prompt must specify: subject, context, composition (safe area for later text), style, constraints, output intent.

## 7. Export formats

| Use | Format | Notes |
| --- | --- | --- |
| Website inline (vector) | SVG | clean shapes / diagrams |
| Website inline (raster) | WebP `q=78–84` | default 82 |
| Website (transparency / lossless) | PNG | only when needed |
| OG / social (branded) | PNG | `1200×630`, target ≤500KB |
| OG / social (photo-heavy) | JPG progressive `q=82–88` | strip metadata |
| Square social | PNG/JPG `1080×1080` | |
| Blog cover | PNG/JPG `1600×900` or platform spec | |

PNG OG compression: `pngquant --quality=82-95 --strip` when available. SVG wrappers around raster images: label as wrappers, never use as `og:image`.

## 8. File organization

Default output: `apps/web/assets/image/<topic>/<semantic-name>.<ext>` (lowercase kebab-case), matching the existing `apps/web/assets/image/` layout. App-icons/manifest assets stay under `apps/web/public/icons/`.

Existing semantic folders take precedence when they fit:
```
apps/web/assets/image/skill/
apps/web/assets/image/contact-info/
```

Drafts and rejects → `.assets/archive/<asset-name>/` (non-public).

## 9. Asset reuse

Before generating, check existing assets by page name, section purpose, current image reference, files under `apps/web/assets/image/` and `apps/web/public/icons/`, similar metaphors on the site. Reuse / adapt when message matches and only cropping or alt updates are needed.

## 10. Concept process

For non-trivial requests, propose 2–3 concepts before finalizing. Each: name, visual idea, message fit, best format, risk. Recommend one — clearest for message, least generic, most reusable.

## 11. Output

Prompt-only / concept work:
```markdown
## Image Direction
- Topic/page, asset type, generator, format, aspect ratio, execution mode

## Concepts
### Concept A: <name>
- Visual idea / Message fit / Best format / Risk

## Recommendation
<which + why>

## Prompt
<prompt block>

## Execution Notes
- Mode, tool, save path, model used, fallback history

## Export Plan
- Website / social / alt text
```

Implementation:
```markdown
## Created Image Asset
- File, type, workflow, alt text, used in

## Verification
- Brand fit, channel fit, performance, alt accuracy, reuse check
```

## Decline

Don't use this skill for utility/card/nav icons, full brand identity work, UI layout design, or photo editing. Hand off to the right skill.
