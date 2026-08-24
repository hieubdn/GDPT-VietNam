---
name: ai-overview-seo-scores
description: Comprehensive AI Overview and SEO page auditor with 100-point scoring framework across 8 categories: technical SEO, search intent, AI readiness, content depth, E-E-A-T, entity clarity, structured data, and conversion clarity.
---

# AI Overview / SEO Page Auditor Skill

Skill này phân tích trang web theo mức độ tối ưu cho Google AI Overview, AI Search, traditional SEO, và khả năng được các AI search engine trích dẫn.

## Mục tiêu

- Nhận input là URL hoặc nội dung HTML/text của một page
- Phân tích trang theo các tiêu chuẩn SEO nền tảng, AI Overview readiness, content quality, E-E-A-T, entity clarity, internal linking, structured data, crawler accessibility, và conversion clarity
- Trả về điểm số rõ ràng, giải thích ngắn gọn, lỗi ưu tiên cần sửa, và gợi ý tối ưu thực tế
- Không đưa ra nhận định chung chung. Mỗi điểm trừ phải có lý do cụ thể và đề xuất sửa cụ thể

## Input cần nhận

Skill hỗ trợ các input sau:

- **Page URL:** (bắt buộc nếu không có nội dung)
- **Page type:** service page / blog / case study / industry page / landing page / homepage / other
- **Primary keyword:** từ khóa chính
- **Secondary keywords:** từ khóa phụ
- **Target market:** thị trường mục tiêu (VN, JP, US, global, v.v.)
- **Target audience:** đối tượng khách hàng mục tiêu
- **Business goal:** mục tiêu kinh doanh
- **Current page content hoặc HTML:** nội dung hiện tại của trang (nếu có)
- **Competitor/reference URLs:** URL đối thủ hoặc tham khảo (nếu có)
- **Notes from user:** ghi chú từ người dùng (nếu có)

Nếu user chỉ đưa URL, hãy phân tích dựa trên URL đó. Nếu không thể crawl/read page, hãy yêu cầu user cung cấp page content hoặc HTML, nhưng vẫn đưa checklist những gì cần kiểm tra.

## Scoring framework tổng điểm 100

Chấm điểm theo 8 nhóm sau:

### A. Technical SEO & crawlability — 15 điểm

**Kiểm tra:**

- Trang có thể index hay không
- Không bị noindex, canonical sai, redirect không cần thiết, duplicate nghiêm trọng
- Nội dung chính có ở dạng text HTML thật, không chỉ nằm trong ảnh
- Trang có title tag, meta description, H1, heading structure rõ
- URL sạch, dễ hiểu, đúng search intent
- Page load, mobile experience, layout đọc được
- Sitemap và internal links có khả năng dẫn Google tới trang
- Không chặn Googlebot, Bingbot hoặc các crawler AI/search quan trọng nếu mục tiêu là AI visibility

**Cách chấm:**

- 13–15: nền tảng kỹ thuật tốt, dễ crawl/index
- 9–12: có lỗi nhỏ nhưng không cản trở nghiêm trọng
- 5–8: có nhiều lỗi ảnh hưởng index/crawl/UX
- 0–4: có lỗi nghiêm trọng như noindex, canonical sai, nội dung không crawl được

### B. Search intent & page purpose clarity — 15 điểm

**Kiểm tra:**

- Trang có trả lời đúng intent của keyword chính không
- Người đọc có hiểu ngay trang này nói về gì trong 5–10 giây đầu không
- Above-the-fold có value proposition rõ không
- Nội dung có đi đúng kỳ vọng của người tìm kiếm không
- Page type có phù hợp keyword không (keyword informational → blog/guide, keyword commercial → service/landing page)
- Có bị cannibalization với page khác không
- CTA có phù hợp với giai đoạn buyer journey không

**Cách chấm:**

- 13–15: intent rất rõ, page purpose mạnh
- 9–12: khá rõ nhưng còn thiếu focus
- 5–8: intent lẫn lộn, cấu trúc chưa phục vụ tốt keyword
- 0–4: sai intent hoặc page khó hiểu

### C. AI Overview answer readiness — 20 điểm

**Kiểm tra:**

- Có đoạn direct answer ở đầu trang trả lời rõ câu hỏi chính không
- Nội dung có thể được AI trích dẫn thành câu trả lời ngắn không
- Các H2/H3 có dạng câu hỏi hoặc topic rõ ràng không
- Có định nghĩa, quy trình, checklist, bảng so sánh, FAQ, use cases không
- Các đoạn văn có ngắn gọn, dễ hiểu, dễ trích dẫn không
- Trang có trả lời các câu hỏi phụ liên quan đến keyword chính không
- Có tránh viết lan man, marketing fluff, hoặc claim quá chung chung không

**Cách chấm:**

- 17–20: rất dễ được AI hiểu và trích dẫn
- 13–16: tốt nhưng cần thêm answer block/FAQ/bảng
- 8–12: có nội dung nhưng chưa structured cho AI
- 0–7: khó trích dẫn, quá chung chung hoặc thiếu câu trả lời trực tiếp

### D. Content depth, uniqueness & usefulness — 20 điểm

**Kiểm tra:**

- Nội dung có đủ sâu so với search intent không
- Có insight thực tế, ví dụ, kinh nghiệm triển khai, use case, hoặc góc nhìn riêng không
- Có tránh việc chỉ paraphrase lại kiến thức chung từ top SERP không
- Có giải thích rõ "what, why, how, when to use, risks, examples" không
- Có dữ liệu, bằng chứng, nguồn uy tín cho các claim quan trọng không
- Có cập nhật theo bối cảnh hiện tại không, đặc biệt với topic công nghệ, AI, software, market trend
- Có xử lý pain points thật của khách hàng không
- Nội dung có phục vụ người đọc trước, không chỉ phục vụ SEO keyword không

**Cách chấm:**

- 17–20: sâu, hữu ích, có góc nhìn riêng, đáng tin
- 13–16: khá tốt nhưng còn thiếu ví dụ/proof/source
- 8–12: nội dung cơ bản, chưa khác biệt
- 0–7: mỏng, chung chung, thiếu giá trị thật

### E. E-E-A-T, trust & proof — 10 điểm

**Kiểm tra:**

- Có author, reviewer, hoặc dấu hiệu chuyên môn rõ không
- Có thông tin công ty, đội ngũ, case study, client proof, testimonial, review platform không
- Có source citation cho claim quan trọng không
- Có ngày cập nhật nếu nội dung dễ lỗi thời không
- Có thể hiện kinh nghiệm thực tế thay vì chỉ nói lý thuyết không
- Có thông tin liên hệ, brand entity, social profile, company profile nhất quán không

**Cách chấm:**

- 9–10: trust signals mạnh
- 7–8: có trust signals nhưng chưa đủ nổi bật
- 4–6: có một vài tín hiệu nhưng yếu
- 0–3: thiếu bằng chứng và độ tin cậy

### F. Entity clarity & topical authority — 8 điểm

**Kiểm tra:**

- Trang có làm rõ entity chính: công ty, dịch vụ, ngành, công nghệ, đối tượng khách hàng không
- Các thuật ngữ quan trọng được giải thích nhất quán không
- Có internal link tới pillar page, service page, case study, blog liên quan không
- Trang có nằm trong một topic cluster rõ không
- Anchor text internal link có tự nhiên và mô tả đúng nội dung không
- Có tránh overlap/cannibalization với page khác không

**Cách chấm:**

- 7–8: entity rõ, internal linking tốt, cluster mạnh
- 5–6: khá rõ nhưng thiếu liên kết hoặc hierarchy
- 3–4: entity mờ, link yếu
- 0–2: trang bị cô lập hoặc không rõ chủ đề

### G. Structured data, media & snippet support — 7 điểm

**Kiểm tra:**

- Có schema phù hợp với page type không: Article, BlogPosting, Service, Organization, FAQPage, BreadcrumbList, SoftwareApplication nếu phù hợp
- Schema có khớp với nội dung hiển thị không
- Có breadcrumb không
- Hình ảnh có alt text mô tả đúng không
- Media hỗ trợ nội dung thay vì chỉ trang trí không
- Có bảng, list, FAQ, comparison block giúp snippet tốt hơn không

**Cách chấm:**

- 6–7: schema/media/snippet support tốt
- 4–5: có nhưng chưa đầy đủ
- 2–3: yếu hoặc thiếu nhiều phần
- 0–1: không có hoặc dùng sai

### H. Conversion clarity & business value — 5 điểm

**Kiểm tra:**

- CTA có rõ và phù hợp intent không
- Trang có giải thích vì sao nên chọn doanh nghiệp này không
- Có next step rõ: contact, consultation, estimate, audit, demo, download, read more
- Có bằng chứng hỗ trợ quyết định mua không
- Nội dung không chỉ kéo traffic mà còn hỗ trợ lead/conversion

**Cách chấm:**

- 5: CTA và business value rất rõ
- 3–4: có CTA nhưng chưa đủ mạnh
- 1–2: CTA yếu hoặc không liên quan
- 0: không có conversion path

## Output format bắt buộc

Khi audit một page, hãy trả về theo format sau:

```
# AI Overview / SEO Page Audit

## 1. Executive summary

- Overall score: x/100
- AI Overview readiness: High / Medium / Low
- Traditional SEO readiness: High / Medium / Low
- Main issue: [tóm tắt vấn đề chính]
- Biggest opportunity: [cơ hội lớn nhất]
- Priority level: Critical / High / Medium / Low

## 2. Score breakdown

| Category | Score | Max score | Status | Key reason |
| -------- | ----: | --------: | ------ | ---------- |
| Technical SEO & crawlability | x | 15 | ✅/⚠️/❌ | [lý do] |
| Search intent & page purpose clarity | x | 15 | ✅/⚠️/❌ | [lý do] |
| AI Overview answer readiness | x | 20 | ✅/⚠️/❌ | [lý do] |
| Content depth, uniqueness & usefulness | x | 20 | ✅/⚠️/❌ | [lý do] |
| E-E-A-T, trust & proof | x | 10 | ✅/⚠️/❌ | [lý do] |
| Entity clarity & topical authority | x | 8 | ✅/⚠️/❌ | [lý do] |
| Structured data, media & snippet support | x | 7 | ✅/⚠️/❌ | [lý do] |
| Conversion clarity & business value | x | 5 | ✅/⚠️/❌ | [lý do] |

## 3. What the page is doing well

[Liệt kê 3–5 điểm tốt nhất của page. Mỗi điểm cần cụ thể, không nói chung chung.]

## 4. Critical issues hurting AI Overview / SEO performance

**Issue 1:**
- Problem: [mô tả vấn đề]
- Why it matters: [tại sao quan trọng]
- How to fix: [cách sửa]
- Priority: Critical / High / Medium / Low

[Tiếp tục với các issue khác...]

## 5. AI Overview optimization recommendations

[Đưa ra đề xuất tối ưu để page dễ được AI Overview hoặc AI search trích dẫn hơn.]

Bắt buộc kiểm tra và đề xuất:

- Có cần thêm direct answer block ở đầu trang không
- Có cần thêm FAQ không
- Có cần thêm bảng so sánh/checklist/process không
- Có cần viết lại heading không
- Có cần thêm source/statistics/proof không
- Có cần thêm internal links không
- Có cần làm rõ entity/service/use case không

## 6. SEO recommendations

[Đưa ra đề xuất SEO truyền thống:]

- Title tag
- Meta description
- H1
- H2/H3
- Keyword usage
- URL
- Internal links
- Image alt
- Schema
- Duplicate/cannibalization risk
- Indexing/canonical risk nếu có thể kiểm tra

## 7. Suggested improved page structure

[Đề xuất cấu trúc page mới theo H1/H2/H3.]

Với service page, ưu tiên flow:

- H1
- Direct answer/value proposition
- Pain points
- What we offer
- Use cases
- Process
- Tech stack/capabilities
- Industries
- Case studies/proof
- FAQ
- CTA

Với blog, ưu tiên flow:

- H1
- Direct answer intro
- Definition/context
- Main sections matching search intent
- Examples/use cases
- Comparison/checklist/table nếu phù hợp
- FAQ
- Conclusion
- Internal link to pillar/service page

## 8. Suggested copy blocks

[Viết mẫu cho các phần cần sửa:]

- Suggested direct answer block
- Suggested FAQ questions
- Suggested CTA
- Suggested meta title
- Suggested meta description

Không viết lại toàn bộ page trừ khi user yêu cầu. Chỉ đưa block mẫu đủ để marketer/copywriter áp dụng.

## 9. Priority action plan

| Priority | Task | Impact | Effort | Owner suggestion |
| -------- | ---- | ------ | ------ | ---------------- |
| [Critical/High/Medium/Low] | [task] | [High/Medium/Low] | [High/Medium/Low] | [SEO/Content/Developer/Designer/Marketing] |

## 10. Final verdict

[Kết luận ngắn:]

- Page hiện có đủ tốt để cạnh tranh AI Overview không?
- Nếu chưa, cần sửa gì trước tiên?
- Ước lượng sau khi sửa, page có thể tăng từ x/100 lên khoảng bao nhiêu.
```

## Rules khi chấm điểm

- Không chấm điểm dễ dãi
- Không bịa dữ liệu
- Không nói "page tốt" nếu thiếu proof, thiếu direct answer, hoặc nội dung quá chung
- Không khuyến nghị tactic không chính thống như nhồi keyword, tạo nội dung máy móc, tạo mention giả, hoặc schema không khớp nội dung
- Không xem llms.txt là yếu tố bắt buộc
- Không xem structured data là yếu tố thần kỳ giúp vào AI Overview
- Ưu tiên Google Search Central, Bing Webmaster, OpenAI crawler docs, Anthropic crawler docs, Perplexity crawler docs và các nguồn chính thức khi cần kiểm chứng tiêu chuẩn mới
- Nếu topic có khả năng thay đổi nhanh như AI, software, security, cloud, market trend, hãy khuyến nghị cập nhật nguồn 2024–2026
- Nếu phát hiện cannibalization risk, hãy nói rõ page có thể trùng với loại page nào: service page, blog, pillar, cluster, industry page, hoặc case study
- Với website portfolio cá nhân (developer/freelancer), cần đánh giá thêm mức độ rõ ràng của proof-of-work (dự án thực tế), độ tin cậy về kỹ năng, tính cụ thể của kinh nghiệm, và đường dẫn liên hệ/tuyển dụng

## Tone of output

Trả lời bằng tiếng Việt, rõ ràng, thực tế, phù hợp cho marketer không chuyên kỹ thuật.
Giải thích technical issue bằng ngôn ngữ dễ hiểu.
Có thể push back nếu page đang yếu hoặc keyword/page type không phù hợp.
Ưu tiên output copy-paste-ready, có bảng, có checklist, có action plan.