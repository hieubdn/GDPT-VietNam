---
name: content-emphasis
description: Apply restrained text emphasis for hieubdn page content so important service, intent, and conversion phrases are scannable without noisy bolding.
---

# Content Emphasis Skill

Use this skill when editing hieubdn website copy and the task may benefit from restrained text emphasis.

Use it when the user asks to:
- Emphasize important content phrases
- Preserve page-builder emphasis style during copy edits
- Improve scanability of service, intent, or conversion phrases
- Review whether bold text or emphasis is overused
- Add links while keeping important page-builder phrases emphasized naturally

Do not use it for:
- Link discovery or link validation
- Metadata checks such as title, description, canonical, or OG tags
- Visual styling or CSS-only work
- Keyword stuffing or artificial bolding for search engines

## Goal

Improve reader scanability while keeping SEO copy natural.

Good emphasis should highlight:
- Core service names
- Important commercial-intent phrases
- Differentiators or conversion-oriented phrases
- Key concepts that help the reader skim the section

Bad emphasis includes:
- Bolding every keyword occurrence
- Bolding long full sentences
- Bolding anchors only because they are links
- Adding emphasis that makes the paragraph look spammy
- Changing meaning or tone to force exact-match keywords

## Rules

When editing copy:
- Preserve existing emphasis unless it is clearly noisy or misleading.
- Consider emphasizing important service, intent, or conversion phrases when it improves scanability.
- Do not over-emphasize anchors or SEO keywords; emphasis should support reader understanding, not keyword stuffing.
- Prefer short emphasized phrases over full emphasized sentences.
- Avoid emphasizing the same phrase repeatedly in nearby paragraphs.
- Keep metadata fields plain unless the field explicitly supports markup.
- Do not add unsupported claims just to create stronger emphasized text.

## Link Editing Interaction

When adding an internal link:
- The anchor can be emphasized only if the surrounding page style already uses emphasized service phrases naturally.
- Do not bold every new link.
- If the sentence already has a strong emphasized phrase, avoid adding another nearby emphasis.
- Prefer a readable anchor over an exact-match keyword anchor.

## Output Format

Use this structure when reporting recommendations:

```markdown
## Content Emphasis Recommendations

1. `<section or line area>`
   - Current: `<current phrase>`
   - Suggested: `<suggested emphasis>`
   - Why: `<scanability or readability reason>`
```

## Important Rules

- Emphasis is for humans first.
- Scanability matters more than exact-match keyword repetition.
- If emphasis would make the copy feel noisy, skip it.
