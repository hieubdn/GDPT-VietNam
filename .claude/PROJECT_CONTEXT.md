# GĐPT Việt Nam — Project Context (living doc)

> Cập nhật file này ngay trong cùng lần thay đổi bất cứ khi nào bạn thêm/sửa tính năng, config, package, hoặc kể cả CSS/styling — để nó luôn phản ánh đúng hiện trạng repo, không phải lịch sử. File này được tự động nạp vào context ở đầu mỗi session (xem `.claude/settings.json` — SessionStart hook) cùng với `.claude/rule.md`, để tránh code trùng lặp/mâu thuẫn với những gì đã có.

## Stack & cấu trúc repo

- Turborepo monorepo, package manager: **pnpm** (pinned `pnpm@9.15.9` qua `packageManager` trong root `package.json`)
- `pnpm-workspace.yaml`: `apps/*`, `packages/*`
- **apps/web** — Next.js 16 (Turbopack), dev port **3000**, favicon = `app/icon.png` (Next.js App Router file convention), title "GĐPT Việt Nam"
- **apps/docs** — Next.js 16 (Turbopack), dev port **3001**, favicon = `app/icon.png` (copy của `apps/web`, cùng brand), title "GĐPT Việt Nam — Docs"
- **apps/api** — NestJS 11, dev port **3002** (đổi từ mặc định 3000 trong `main.ts` để không đụng `web`), có script `dev` = `nest start --watch` (bản gốc chỉ có `start:dev`)
- **packages/eslint-config, packages/typescript-config, packages/ui** — shared workspace packages (`@repo/*`)

## Quyết định / gotcha quan trọng (đừng làm lại hoặc phá vỡ)

- `.npmrc` có `link-workspace-packages=true` — **bắt buộc** để pnpm resolve `@repo/*` từ workspace thay vì gọi npm registry (thiếu dòng này → lỗi 404 khi install)
- Dependency trong `apps/web`, `apps/docs` dùng version range `"*"` cho `@repo/*` (không dùng `workspace:*` protocol) — đã hoạt động đúng nhờ dòng `.npmrc` trên
- Root `package.json`: `devEngines.packageManager` phải là `pnpm`, không phải `npm` — turbo sẽ chặn chạy nếu lệch (`package_manager_lockfile_mismatch`)
- Port riêng biệt cho từng app (web=3000, docs=3001, api=3002) để `pnpm dev` (`turbo run dev`, chạy song song) không xung đột
- `apps/api` từng có `.git` lồng bên trong (nested repo) khiến root repo không track được code của nó — đã xóa `.git` con này
- Không commit `apps/api/node_modules` hay `apps/api/pnpm-lock.yaml` riêng — chỉ dùng lockfile gốc `pnpm-lock.yaml` ở root
- Đã xóa `package-lock.json` (npm) ở root để tránh lẫn lockfile — toàn repo dùng pnpm

## Conventions

- Favicon/tab icon: dùng Next.js App Router file convention `app/icon.(png|jpg|svg)` trong từng app — không cần `<link>` thủ công
- `tsconfig.json` của `apps/api`: không dùng `baseUrl`/`paths` (chỉ import relative) — không thêm lại trừ khi thực sự cần alias import
- `apps/web` và `apps/docs` đều có alias `@/*` → root của app (`paths: { "@/*": ["./*"] }` trong `tsconfig.json`). **Không cần `baseUrl`** — đã test thực nghiệm (`tsc --noEmit`, `next typegen`, `next build` thật) rằng TS 5.9 + `moduleResolution: "Bundler"` tự resolve `paths` tương đối theo vị trí `tsconfig.json`, không cần khai báo `baseUrl` nữa
- Không dùng file `index.ts` để barrel-export — import thẳng vào file cụ thể (xem `@repo/ui/*` export map bên dưới, và các component tự viết trong `apps/*`)
- Component dùng chung giữa `apps/web` và `apps/docs` → đặt trong `packages/ui/src/`, không đặt trong `apps/web/components` (vì `apps/docs` không thấy được)
- Styling: dùng CSS Modules; SCSS được hỗ trợ (đã cài `sass` làm devDependency ở `apps/web`, `apps/docs`, `packages/ui` — bắt buộc phải có ở mọi app thực sự build/dev file `.scss`, không chỉ ở nơi chứa source)
- `packages/ui/package.json` → `exports."./*" ` chỉ map sang `.tsx` (`"./src/*.tsx"`); file `.ts`/`.scss` khác trong cùng thư mục con (vd. hook, types, css module) được import bằng đường dẫn tương đối như bình thường bên trong package, không đi qua `exports` map — chỉ cần thêm key `exports` mới nếu app ngoài cần import trực tiếp file đó
- `packages/ui/src/styles.d.ts`: ambient type declare cho `*.module.scss`/`*.module.css` — cần thiết vì `packages/ui` không extend TS config của Next.js (không có `next-env.d.ts`) nên không tự có type CSS Modules như trong `apps/*`
- Ví dụ đã áp dụng: `packages/ui/src/scroll-reveal/` (component `ScrollReveal` + hook `useScrollReveal`, hiệu ứng "xuất hiện khi cuộn" dùng IntersectionObserver) — import qua `@repo/ui/scroll-reveal/scroll-reveal`
  - **Gotcha đã fix (2026-08-24):** div được `elementRef` (IntersectionObserver) theo dõi **không được** cũng là div mang transform slide-in. Trước đó cả hai là cùng một div → với hướng dọc (`fromTop`/`fromBottom`) trên phần tử nằm sát mép viewport (vd. header ở `top: 0`), trạng thái `hidden` tự dịch phần tử ra ngoài viewport (translateY âm) → intersection ratio luôn bằng 0 → không bao giờ được kích hoạt để hiện ra (một số nav item vĩnh viễn không hiện). Đã sửa: `elementRef` đặt trên div bọc ngoài không có class/transform, div con bên trong mới mang `finalClassName`/transform. Đồng thời bỏ truyền `delay` xuống `useScrollReveal` (chỉ dùng `--delay` cho CSS `transition-delay`) vì trước đó độ trễ bị áp dụng 2 lần (JS `setTimeout(delay)` rồi CSS `transition-delay` lại chờ thêm `delay` nữa). Nếu sau này sửa lại component này, giữ nguyên 2 điểm trên.
- **Typography dùng classname global bắt buộc — `title` / `subtitle` / `paragraph`:** mọi heading chính của section phải có `className="title"`, tiêu đề phụ/tagline phải có `className="subtitle"`, đoạn văn bản thân bài phải có `className="paragraph"`. Đây là **string literal thuần**, không đi qua CSS Module (`styles.title`) — vì CSS Module hash tên class nên sẽ không bao giờ khớp được selector global. CSS thật cho 3 class này định nghĩa **một lần duy nhất** ở `apps/web/app/globals.scss`; không được định nghĩa lại `font-size`/`font-weight`/`line-height`/`letter-spacing`/`color` cho title/subtitle/paragraph trong bất kỳ `*.module.scss` nào của component.
  - Cần chỉnh riêng theo layout (margin, max-width, text-align...) thì kết hợp thêm class module: `className={\`title ${styles.heroTitle}\`}` — class global đứng trước để có base typography, class module chỉ thêm phần layout, không ghi đè lại thuộc tính typography.
  - Chi tiết đầy đủ + rationale nằm ở `.claude/rule.md` (section "FRONTEND STYLING — SHARED TYPOGRAPHY CLASSNAMES").
- **`packages/ui/tsconfig.json` bắt buộc phải có `"noEmit": true`.** Package này chỉ được consume qua `exports` map trỏ thẳng `.tsx`/`.ts` source (JIT-compile bởi Next.js của app dùng nó), không bao giờ thật sự build ra `dist`. Từng thử xoá `outDir: "dist"` (kế thừa từ `react-library.json`/`base.json`, vốn có `declaration: true`) mà không set `noEmit` → chạy `tsc` (không có cờ `--noEmit`, đúng như cách IDE/TS Language Service đọc config) đã **emit `.js`/`.d.ts` thẳng vào `src/`**, làm bẩn source tree. Đã dọn và fix bằng `noEmit: true` — đừng lặp lại lỗi này khi đụng vào `packages/ui/tsconfig.json`

## Đã dọn sạch UI mặc định của create-turbo/create-next-app (2026-08-24)

`apps/web` và `apps/docs` ban đầu là trang demo mặc định của template (logo Turborepo/Vercel, link ra ngoài, nút "Open alert", `page.module.css` với style nút/link mặc định). Đã xoá sạch, cả 2 app hiện là trang trắng tối giản (`<main><h1>...</h1></main>`) sẵn sàng để xây UI thật:

- Xoá `app/page.module.css` ở cả 2 app (không còn dùng)
- `app/globals.css`: chỉ giữ CSS reset cơ bản (`:root` màu nền/chữ, box-sizing, `a` reset) — đã bỏ hẳn `.imgDark`/`.imgLight` (class riêng cho demo) **và bỏ hẳn dark mode** (`prefers-color-scheme: dark`) theo yêu cầu — site này luôn nền trắng, không theo theme hệ điều hành
- Xoá toàn bộ `public/*.svg` mặc định (turborepo-dark/light, vercel, next, globe, window, file-text) ở cả 2 app — folder `public/` hiện không tồn tại (rỗng thì xoá luôn, tạo lại khi có asset thật)
- Xoá `apps/docs/app/favicon.ico` mặc định, dùng chung `icon.png` với `apps/web`
- Xoá 3 stub component demo trong `packages/ui/src/`: `button.tsx`, `card.tsx`, `code.tsx` (chỉ được dùng bởi trang demo đã xoá, không còn nơi nào tham chiếu — đã grep xác nhận trước khi xoá)
- Vẫn giữ font Geist (`app/fonts/*.woff` + `next/font/local` trong `layout.tsx`) — đây là lựa chọn font, không phải "UI mặc định", có thể đổi sau nếu cần

## Cách chạy

- `pnpm install` từ root (không chạy trong từng `apps/*`)
- `pnpm dev` từ root chạy cả 3 app song song qua turbo

<!-- Thêm section mới khi có: state management, styling approach (CSS modules/Tailwind/...), auth, API contract giữa web/api, database, deployment, v.v. -->
