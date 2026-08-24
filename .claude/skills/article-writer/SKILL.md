---
name: article-writer
description: Writes hieubdn SEO articles optimized for traditional SEO, AI Overview, GEO, readability, E-E-A-T, and conversion. Sends an outline for user approval before drafting the full article.
---

# Article Writer

Write long-form hieubdn articles optimized for traditional SEO + AI Overview + GEO from a keyword, topic, or brief.

Load `_shared/brand.md` for voice / content DNA / tokens.

Use when: SEO article, blog post from a keyword, AI-Overview-optimized draft, GEO content, 1500-word article, long-form for hieubdn.

Don't use for: revising existing pages (`content-revise`), auditing (`seo-audit`), metadata only (`seo-audit-basic`), link work (`seo-audit-links`), technical SEO (`seo-audit-technical`), building site pages/components (`page-builder`), locale dictionary work (`locale-dictionary-audit`).

## Defaults

- ~1500 words
- Audience: developers, recruiters, potential clients/collaborators, technical readers
- SEO title: ≤60 chars, includes target keyword
- Meta description: ≤155 chars, includes target keyword
- Uniqueness target: >90%
- Tone: conversational, human, credible, technically grounded
- Sections: intro → main body (H2/H3) → conclusion → Key Takeaways → FAQ → internal/external link suggestions → AI Overview notes → GEO notes → source-verification notes

## Inputs

Required: target keyword. If missing, ask one short question.

Optional: secondary keywords, market, search intent, product/service angle, audience details, competitor URLs/notes, preferred internal/external links, brand/service page, CTA preference, language, length.

## Workflow

### 1. Resolve brief

Identify target keyword, search intent, audience, brand context, word count, language, must-includes, avoid-list. If workable but partial, proceed with defaults and state assumptions.

### 2. Analyze search intent

Classify: informational / commercial / transactional / navigational / mixed. Identify main user question, related questions, buyer pain, decision criteria, expected depth, role (educate / compare / guide / persuade).

### 3. Outline (competitor-informed)

If competitor URLs / live data exist, study common outline patterns but don't copy mechanically. Otherwise build from SEO best practices, search intent, topic coverage, related entities, common questions, AI Overview / GEO structure.

Improve with clearer flow, answer-first structure, practical examples, FAQ coverage, structured snippets, comparison tables/checklists.

### 4. Send outline for approval (gate)

Send the outline using the format in § Outline Output. Ask the user to approve / reject / revise. **Do not draft the full article until approved.** On request, revise and re-ask.

### 5. Metadata

Create SEO title (≤60), meta description (≤155), slug, H1. Title and H1 include / closely match the target keyword. Slug short, lowercase, hyphenated, keyword-aligned. No clickbait.

### 6. Introduction

Natural, explains what reader learns, leads forward. Direct answer to main intent within first 100–150 words (AI-Overview-extractable). Target keyword used naturally. No long generic openings.

### 7. Key Takeaways (near top)

3–6 short, factual, extractable bullets supporting AI Overview / GEO. Don't restate the intro.

### 8. Main body (H2/H3)

Each H2 addresses a sub-intent, major user question, topic cluster, decision factor, step, comparison point, or practical concern.

Include where relevant: definitions, short direct answers, lists, tables, checklists, step-by-step, pros/cons, common mistakes, examples, business implications, source-verification notes.

Avoid duplicate sections, keyword stuffing, long paragraphs, unsupported claims, fake stats, promo-heavy copy, thin generic explanations.

### 9. AI Overview optimization

Answer the main question near the top. Concise, factual, standalone sentences. Short summaries under important headings when useful. Structured lists/tables when classifiable/comparable. Definitions for key terms. FAQ with direct answers. Avoid "best", "#1", "guaranteed" unless supported. Mark stats/quotes/claims that need verification.

### 10. GEO optimization

Cover main entity, related entities, audience, problem, solution, benefits, risks, decision criteria, next steps.

Answer **What / Why / How / When / Who**. Make important paragraphs standalone enough that an AI system can quote them without losing context.

### 11. Voice & brand

Human, conversational, clear, helpful, credible, professional. Natural transitions, reader-friendly explanations, practical examples, direct-not-pushy CTAs.

Brand: mention `hieubdn` naturally in the body; never in headings; don't overuse. Don't invent case studies, numbers, guarantees, client names, certifications, or capabilities.

### 12. E-E-A-T

- Experience: examples, scenarios, implementation context.
- Expertise: accurate terms, clear explanations.
- Authoritativeness: balanced reasoning, source-aware claims.
- Trustworthiness: no exaggeration, fake data, or unsupported guarantees.

Mark statistics, quotes, or legal/financial/medical/security/market-size claims:

```markdown
[Cần kiểm chứng nguồn trước khi xuất bản]
```

Never fabricate sources.

### 13. Conclusion

Summarize main points, reinforce key takeaway, thank reader naturally, suggest contacting hieubdn for questions or collaboration. Not overly sales-heavy.

### 14. FAQ

4–6 items. Tied to target keyword and intent. AI-Overview / GEO friendly. Short clear answers. Not copy-pasted from the body. Schema-ready.

### 15. Links

Internal: 3–5 suggestions (anchor, URL, placement, reason).
External: 2–3 credible suggestions when useful (source name/type, anchor, reason).

If exact URLs are unknown: `Cần thay bằng URL thực tế của website.` Never invent URLs.

### 16. Optimization notes

End with: AI Overview Notes, GEO Notes, Notes cần kiểm chứng trước khi publish (if any). Concise.

## Outline Output

```markdown
## Proposed SEO Article Outline

### SEO Title Draft
`<title ≤60>`

### Meta Description Draft
`<≤155>`

### Suggested Slug
`<slug>`

### Search Intent
`<info/commercial/...> + short why`

### Target Audience
- `<segment>`

### H1
# `<H1>`

### H2/H3 Structure
## `<H2>`
### `<H3>`

### Key Takeaways Draft
- `<takeaway>`

### FAQ Questions Draft
1. `<question>`

### AI Overview Notes
- `<note>`

### GEO Notes
- `<note>`

### Assumptions
- `<assumption or none>`

## Approval Needed
Please approve this outline or tell me what to change. I will not write the full article until you approve.
```

## Final Article Output

```markdown
## SEO Title
`<≤60>`

## Meta Description
`<≤155>`

## Suggested Slug
`<slug>`

## Search Intent
`<intent> + why`

## Target Audience
- `<segment>`

## Semantic Keywords / Related Entities
- `<entity>`

## H1
# `<H1>`

## Full Article
`<full body with H2/H3>`

## Key Takeaways
- `<takeaway>`

## FAQ
### `<question>`
`<answer>`

## Internal Link Suggestions
1. Anchor: `<text>` — URL: `<url or placeholder>` — Placement: `<section>` — Reason: `<reason>`

## External Link Suggestions
1. Source: `<name>` — Anchor: `<text>` — Reason: `<reason>`

## AI Overview Notes
- `<note>`

## GEO Notes
- `<note>`

## Notes Cần Kiểm Chứng Trước Khi Publish
- `<claim or none>`
```

## Validation

Outline gate: keyword in title draft, title ≤60, keyword in meta draft, meta ≤155, H1 matches keyword, intent covered, AI Overview + GEO considered, FAQ included, outline approved before full draft.

Final gate: outline was approved; metadata within limits; H1 matches keyword; ~1500 words unless requested otherwise; direct answer in first 100–150; `hieubdn` in body, not in headings; Key Takeaways present; 4–6 FAQ items; AI Overview + GEO notes; no fake stats / sources / claims / URLs; verification markers added where needed.

## Rules

- Always send outline for approval before drafting.
- Don't copy competitor content.
- Don't fabricate stats, sources, clients, case studies, certifications, guarantees.
- Don't keyword-stuff or over-promote.
- Useful for real readers first, then search / generative engines.
- Match article language to user's language / requested content language.
- Ask one short question only when the keyword or core topic is missing.
