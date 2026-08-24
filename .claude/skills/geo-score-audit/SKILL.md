---
name: geo-score-audit
description: Score one hieubdn page for GEO / AI-search readiness on a 100-point rubric, with evidence, confidence, gaps, quick wins, and estimated score lift.
---

# GEO Score Audit

Use this skill when the user asks to score, grade, audit, benchmark, or recheck a page for GEO, AI Search, AI Overview, ChatGPT Search, Perplexity, Gemini, Claude Search, Bing Copilot, AEO, answer-engine visibility, or AI citation readiness.

This skill is for **measurement first**. It may recommend fixes, but it should not rewrite or edit a page unless the user asks.

## Core position

GEO scoring is an **AI-search readiness score**, not a real ranking score.

Always include this disclaimer:

> This is not a real Google, ChatGPT, Perplexity, or Bing ranking score. It is a readiness score based on visible page signals.

Use Google Search Central guidance as the highest-trust source. For Google Search, GEO/AEO should be treated as SEO fundamentals applied to AI-search surfaces. Do not present unsupported GEO hacks as requirements.

## Inputs

Accept any of these:

- Page URL.
- Local page file, usually under `apps/web/app/**/page.tsx` and its section components in `apps/web/components/pages/**`.
- Rendered HTML or copied page content.
- Optional page type: home | about | projects | contact | news | acadify/survey | other.
- Optional display language: the site supports 7 UI languages via client-side switching (see `locale-dictionary-audit`), but there are no separate localized routes/pages to audit per market.
- Optional primary AI-search intent.
- Optional primary keyword or query cluster.
- Optional target audience.
- Optional competitor/reference pages.

If the target page is missing, ask for it. If optional data is missing, infer from the visible page when safe and mark those items as `Estimated`.

## Evidence rules

Label every important finding as one of:

- **Measured** — checked from URL, rendered page, source file, metadata, schema, sitemap, robots, or tool output.
- **User-provided** — supplied by the user.
- **Estimated** — inferred from visible content or page context.
- **Not available** — could not be checked.

Never present estimates as measured facts.

## Research basis

Use these source priorities:

1. Google Search Central AI optimization and helpful content guidance.
2. Existing hieubdn SEO skills: `seo-audit-basic`, `seo-audit-readability`, `seo-audit-technical`, `seo-audit-links`, `page-ai-overview-optimization`.
3. Audit workflow ideas from SEO/GEO/AEO skill patterns: homepage or page fetch, robots, sitemap, key page discovery when needed.
4. GEO scoring ideas from AI-search skill patterns: answer readiness, citability, entity clarity, authority, structure, and technical discoverability.

Do not over-weight tactics that Google does not confirm as special ranking levers, including `llms.txt`, artificial content chunking, fake mentions, or schema that does not match visible content.

## Audit scope

Default scope is **one page**.

For a URL, check the page itself first. If needed, also check high-signal supporting assets:

- `robots.txt`
- sitemap entry
- canonical target
- related internal links
- visible schema or source metadata

Do not crawl the whole site unless the user asks for a sitewide or batch audit.

## 100-point rubric

### 1. Answer Readiness — 18 points

Checks whether AI systems and users can extract a direct answer.

Score signals:

- Direct answer near the top.
- Clear definition using patterns like “X is...” where useful.
- Hero and first content section answer the main query.
- Question-style or topic-clear headings.
- Concise answer blocks that stand alone.
- Low marketing fluff before useful information.

Guide:

- 16–18: clear, direct, extractable answer flow.
- 12–15: good, but answer blocks or intro need sharpening.
- 7–11: useful content exists, but answers are buried or indirect.
- 0–6: hard to extract a clear answer.

### 2. Citability — 16 points

Checks whether the page has content AI can quote or cite.

Score signals:

- Specific facts, numbers, examples, or concrete claims.
- Standalone quotable statements.
- Source attribution for important factual claims.
- Comparison blocks, tables, lists, steps, or checklists.
- Original insight, practical experience, or company-specific proof.
- No unsupported broad claims.

Guide:

- 14–16: strong citation-ready content with proof.
- 10–13: useful but needs more data, examples, or attribution.
- 5–9: mostly generic content with limited quotable material.
- 0–4: weak, vague, or unsupported claims.

### 3. Entity Clarity — 12 points

Checks whether the page makes key entities easy to understand.

Score signals:

- Brand, service, industry, technology, location, and audience are clear.
- Entity names are consistent.
- Important terms are explained.
- The page connects to the right topic cluster.
- No major cannibalization or page-purpose confusion.

Guide:

- 11–12: entities are clear and consistent.
- 8–10: mostly clear, with minor gaps.
- 4–7: entity or page purpose is partly unclear.
- 0–3: unclear topic, entity, or audience.

### 4. Search Intent Coverage — 14 points

Checks whether the page answers likely AI-search and user questions.

Score signals:

- Covers what it is, who it is for, when to use it, and why it matters.
- Covers benefits, process, risks, trade-offs, and examples when relevant.
- Covers cost, timeline, delivery model, or engagement model when relevant.
- Includes FAQ or natural Q&A coverage.
- Matches the page type and buyer journey.

Guide:

- 12–14: strong intent coverage with useful follow-up answers.
- 9–11: good coverage, with some missing questions.
- 5–8: partial coverage, important intent gaps remain.
- 0–4: wrong or very weak intent match.

### 5. Authority and Trust — 14 points

Checks whether the page gives users and AI systems reasons to trust it.

Score signals:

- Case studies, testimonials, client proof, or project examples.
- Certifications, ISO proof, awards, partnerships, or credible company signals.
- Named author, reviewer, team, or expert signal when relevant.
- Freshness signals for time-sensitive topics.
- External sources for important claims.
- Clear contact, company, social, or brand profile signals.

Guide:

- 12–14: strong trust and proof.
- 9–11: credible, but proof can be stronger.
- 5–8: some trust signals, but not enough.
- 0–4: weak trust and little proof.

### 6. Structure and Readability — 10 points

Checks whether the page is easy to scan, parse, and quote.

Score signals:

- Clean H1/H2/H3 hierarchy.
- Logical section order.
- Short paragraphs.
- Lists, tables, cards, FAQs, or summary blocks.
- No dense walls of text.
- CTA does not interrupt the answer flow too early.

Guide:

- 9–10: very easy to scan and parse.
- 7–8: good structure with minor issues.
- 4–6: readable, but dense or uneven.
- 0–3: hard to scan.

### 7. Technical Discoverability — 8 points

Checks basic technical signals that affect discovery and interpretation.

Score signals:

- Page is indexable.
- Correct canonical.
- Title, meta description, H1, and OG basics exist.
- Structured data is appropriate and matches visible content.
- Important content is visible in HTML or server-rendered output.
- Robots and sitemap do not block expected discovery (note: this repo has no `sitemap.ts`/`robots.ts` yet — treat as a gap to flag, not a bug).
- Hreflang: not applicable — there are no locale-specific routes on this site.

Guide:

- 7–8: technically discoverable with no major blockers.
- 5–6: small technical gaps.
- 2–4: several technical issues.
- 0–1: major blocker such as noindex, wrong canonical, or inaccessible content.

### 8. Internal Link and Topical Support — 8 points

Checks whether the page is supported by the wider site.

Score signals:

- Links to related service, industry, technology, case study, blog, or contact pages.
- Descriptive anchors.
- Inbound support from relevant pages when visible.
- Page is not isolated.

Guide:

- 7–8: strong topical support.
- 5–6: acceptable, with some missing links.
- 2–4: weak support.
- 0–1: isolated or confusing link context.

## Verdict bands

- 90–100: Excellent AI-search readiness.
- 75–89: Good, with clear improvement areas.
- 60–74: Medium, important gaps remain.
- 40–59: Weak, needs major content work.
- 0–39: Poor, not ready for AI-search citation.

## Confidence

Report confidence separately:

- **High** — URL/rendered page and key technical signals were checked.
- **Medium** — source/content was checked, but rendered/technical signals were partly unavailable.
- **Low** — only partial content or user summary was available.

## Required output

Return this format:

```markdown
# GEO Score Audit

Page: `<url-or-file>`
Page type: `<type or Estimated>`
Market/language: `<market or Estimated>`
Primary AI-search intent: `<intent or Estimated>`

Overall score: `x/100`
Verdict: `<band>`
Confidence: `<High|Medium|Low>`

> This is not a real Google, ChatGPT, Perplexity, or Bing ranking score. It is a readiness score based on visible page signals.

## Score Breakdown

| Category | Score | Max | Status | Evidence |
| --- | ---: | ---: | --- | --- |
| Answer Readiness | x | 18 | ✅/⚠️/❌ | ... |
| Citability | x | 16 | ✅/⚠️/❌ | ... |
| Entity Clarity | x | 12 | ✅/⚠️/❌ | ... |
| Search Intent Coverage | x | 14 | ✅/⚠️/❌ | ... |
| Authority and Trust | x | 14 | ✅/⚠️/❌ | ... |
| Structure and Readability | x | 10 | ✅/⚠️/❌ | ... |
| Technical Discoverability | x | 8 | ✅/⚠️/❌ | ... |
| Internal Link and Topical Support | x | 8 | ✅/⚠️/❌ | ... |

## What Works Well

1. ...
2. ...
3. ...

## Biggest Gaps

1. **...**
   - Evidence: ...
   - Why it matters: ...
   - Fix: ...

## Quick Wins

| Action | Expected lift | Effort | Owner |
| --- | --- | --- | --- |
| ... | +x to +y | Low/Medium/High | SEO/Content/Developer/Design |

## High-Impact Improvements

1. ...
2. ...
3. ...

## Estimated Score Lift

- Quick wins: `+x to +y points`
- Full improvement: `+x to +y points`
- Possible new score range: `x–y/100`

## Metric Labels

- Measured: ...
- User-provided: ...
- Estimated: ...
- Not available: ...

## Final Verdict

...
```

## Recommendation rules

- Be strict. Do not score generously when proof, direct answers, or technical basics are missing.
- Do not invent metrics, case studies, client names, author credentials, testimonials, URLs, or source citations.
- Do not recommend fake mentions, keyword stuffing, hidden content, or schema that does not match visible content.
- Do not treat `llms.txt` as mandatory.
- Do not treat structured data as a magic AI Overview lever.
- For hieubdn portfolio pages, pay extra attention to proof-of-work clarity, recruiter/client intent, project depth, technical capability, and a clear path to contact.

## Relationship to other skills

- Use `seo-audit` for a full SEO audit.
- Use `page-ai-overview-optimization` when the user wants to edit or optimize the page after scoring.
- Use `seo-audit-technical` for deeper technical SEO checks.
- Use `seo-audit-links` for deeper link analysis.
- Use `seo-audit-readability` for deeper readability analysis.

## Tone

Reply in Vietnamese unless the user asks for another language.
Be direct, practical, and clear for marketing and content teams.
Use tables and action lists.
Push back when the page is weak or the score is uncertain.
