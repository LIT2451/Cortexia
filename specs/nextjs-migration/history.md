# Nhật ký thực thi: nextjs-migration

## 1.1 Trích văn bản Site cũ làm fixture trước khi thay đổi — HOÀN THÀNH

- Thời gian: 2026-10-27 10:39
- File đã đổi: `scripts/extract-legacy.mjs`, `tests/fixtures/legacy-text.json`
- Kiểm chứng: `node scripts/extract-legacy.mjs && node -e "const j=require(\"./tests/fixtures/legacy-text.json\");const k=[\"home\",\"about\",\"services\",\"portfolio\",\"contact\"];if(!k.every(x=>Array.isArray(j[x])&&j[x].length))process.exit(1);if(/dvtechnic|openclaw|hermes|\\bCDR\\b/i.test(JSON.stringify(j)))process.exit(1)"` → exit 0 (Đã ghi /Users/duongquangluan/Desktop/AWS_27/cortexia/tests/fixtures/legacy-text.json) [spec-done tự chạy lại]
- Requirements: 1.2
- Commit: `spec(nextjs-migration): 1.1 Trích văn bản Site cũ làm fixture trước…`
- Ghi chú: Bỏ khối số liệu/case study (Req 8) và thẻ liên hệ cũ của DVTechnic; đổi CDR thành 'call detail record' để đáp ứng 8.5

## 1.2 Copy mã Template vào gốc repo và bỏ phần không dùng — HOÀN THÀNH

- Thời gian: 2026-10-27 10:40
- File đã đổi: `.gitignore`, `app/(default)/layout.tsx`, `app/(default)/page.tsx`, `app/css/additional-styles/theme.css`, `app/css/additional-styles/utility-patterns.css`, `app/css/style.css`, `app/layout.tsx`, `components/cta.tsx`, `components/features.tsx`, `components/hero-home.tsx`, `components/page-illustration.tsx`, `components/spotlight.tsx`, `components/testimonials.tsx`, `components/ui/footer.tsx`, `components/ui/header.tsx`, `components/ui/logo.tsx`, `components/workflows.tsx`, `next.config.js`, `package.json`, `pnpm-lock.yaml`, `postcss.config.js`, `public/fonts/nacelle-italic.woff2`, `public/fonts/nacelle-regular.woff2`, `public/fonts/nacelle-semibold.woff2`, `public/fonts/nacelle-semibolditalic.woff2`, `public/images/blurred-shape-gray.svg`, `public/images/blurred-shape.svg`, `public/images/footer-illustration.svg`, `public/images/logo.svg`, `public/images/page-illustration.svg`, `public/images/secondary-illustration.svg`, `tsconfig.json`, `utils/useMasonry.tsx`, `utils/useMousePosition.tsx`
- Kiểm chứng: `pnpm install --frozen-lockfile && test ! -e "app/(auth)" && test ! -e app/api && test ! -e public/videos && test ! -e components/modal-video.tsx && test ! -e public/favicon.ico && ! ls public/images | grep -qE "testimonial-|client-logo-|hero-image-01|features\.png|workflow-0" && ! grep -rqE "modal-video|testimonial-0|client-logo|hero-image-01|features\.png|workflow-0|/signin|/signup" app components` → exit 0 (Done in 220ms) [spec-done tự chạy lại]
- Requirements: 1.4, 4.1
- Commit: `spec(nextjs-migration): 1.2 Copy mã Template vào gốc repo và bỏ phần…`
- Ghi chú: Gỡ import/route tới file mẫu đã xoá; header tạm thay Sign In/Register bằng nút Contact Us (làm lại ở 3.2)

## 1.3 Cấu hình static export, ghim dependency, thêm ESLint và bộ test — HOÀN THÀNH

- Thời gian: 2026-10-27 10:42
- File đã đổi: `components/testimonials.tsx`, `components/workflows.tsx`, `eslint.config.mjs`, `next.config.js`, `package.json`, `pnpm-lock.yaml`, `tests/setup.test.ts`, `vitest.config.mts`
- Kiểm chứng: `pnpm lint && pnpm test && pnpm build && test -f out/index.html` → exit 0 ((Use `node --trace-deprecation ...` to show where the warning was created)) [spec-done tự chạy lại]
- Requirements: 7.1, 7.2
- Commit: `spec(nextjs-migration): 1.3 Cấu hình static export, ghim dependency…`
- Ghi chú: next 15.1.11 -> 15.5.28 (bản vá mới nhất 15.x); eslint 9.39.5 vì eslint-config-next 15 chưa hỗ trợ eslint 10; thêm vite 8.3.5 và @eslint/eslintrc, @testing-library/dom làm peer

## 2.1 Tạo `config/site.ts` và `lib/contact.ts` — HOÀN THÀNH

- Thời gian: 2026-10-27 10:44
- File đã đổi: `config/site.ts`, `lib/contact.ts`, `tests/site.test.ts`
- Kiểm chứng: `pnpm test` → exit 0 ((Use `node --trace-deprecation ...` to show where the warning was created)) [spec-done tự chạy lại]
- Requirements: 2.4, 2.5, 2.6, 2.7, 4.2
- Commit: `spec(nextjs-migration): 2.1 Tạo config/site.ts và lib/contact.ts`

## 2.2 Property P1: Hiển thị mục liên hệ theo cấu hình — HOÀN THÀNH

- Thời gian: 2026-10-27 10:44
- File đã đổi: `components/ui/contact-list.tsx`, `tests/properties/contact-items.property.test.tsx`
- Kiểm chứng: `pnpm test -- contact-items` → exit 0 ((Use `node --trace-deprecation ...` to show where the warning was created)) [spec-done tự chạy lại]
- Requirements: 2.5, 2.6
- Property: P1 pass (100 lần)
- Commit: `spec(nextjs-migration): 2.2 Property P1: Hiển thị mục liên hệ theo cấu…`

## 2.3 Tạo `lib/metadata.ts` với `pageMetadata()` và đặt `metadataBase` trong `app/layout.tsx` — HOÀN THÀNH

- Thời gian: 2026-10-27 10:45
- File đã đổi: `app/layout.tsx`, `lib/metadata.ts`
- Kiểm chứng: `pnpm test && pnpm build` → exit 0 ((Use `node --trace-deprecation ...` to show where the warning was created)) [spec-done tự chạy lại]
- Requirements: 5.1, 5.2, 5.5
- Commit: `spec(nextjs-migration): 2.3 Tạo lib/metadata.ts với pageMetadata() và…`

## 2.4 Property P4: Metadata tuyệt đối — HOÀN THÀNH

- Thời gian: 2026-10-27 10:46
- File đã đổi: `tests/properties/metadata.property.test.ts`
- Kiểm chứng: `pnpm test -- metadata` → exit 0 ((Use `node --trace-deprecation ...` to show where the warning was created)) [spec-done tự chạy lại]
- Requirements: 5.2
- Property: P4 pass (100 lần)
- Commit: `spec(nextjs-migration): 2.4 Property P4: Metadata tuyệt đối`

## 3.1 Viết `logo.tsx` (wordmark "Cortexia", link `/`, `aria-label`), `app/icon.svg` (chữ "C" gradient) và `app/opengraph-image.tsx` (1200×630, có `export const dynamic = "force-static"`) — HOÀN THÀNH

- Thời gian: 2026-10-27 10:46
- File đã đổi: `app/icon.svg`, `app/opengraph-image.tsx`, `components/ui/logo.tsx`, `public/images/logo.svg`
- Kiểm chứng: `pnpm build && test -f out/icon.svg && test -f out/opengraph-image` → exit 0 (○  (Static)  prerendered as static content) [spec-done tự chạy lại]
- Requirements: 2.2
- Commit: `spec(nextjs-migration): 3.1 Viết logo.tsx (wordmark "Cortexia", link…`
- Ghi chú: Xoá public/images/logo.svg của Template (không còn dùng). File OG xuất ra không có đuôi, kiểm tra MIME ở 6.3

## 3.2 Sửa `components/ui/header.tsx`: menu 5 liên kết, nút "Contact Us", menu di động dưới `md`, `isActive` + `aria-current="page"`, viền focus nhìn thấy được — HOÀN THÀNH

- Thời gian: 2026-10-27 10:47
- File đã đổi: `components/ui/header.tsx`, `lib/nav.ts`, `tests/header.test.tsx`
- Kiểm chứng: `pnpm test -- header` → exit 0 ((Use `node --trace-deprecation ...` to show where the warning was created)) [spec-done tự chạy lại]
- Requirements: 2.2, 3.4, 3.5, 4.2
- Commit: `spec(nextjs-migration): 3.2 Sửa components/ui/header.tsx: menu 5 liên…`

## 3.3 Property P3: Đúng một liên kết đang hoạt động — HOÀN THÀNH

- Thời gian: 2026-10-27 10:48
- File đã đổi: `tests/properties/nav.property.test.ts`
- Kiểm chứng: `pnpm test -- nav` → exit 0 ((Use `node --trace-deprecation ...` to show where the warning was created)) [spec-done tự chạy lại]
- Requirements: 3.5
- Property: P3 pass (100 lần mỗi chiều)
- Commit: `spec(nextjs-migration): 3.3 Property P3: Đúng một liên kết đang hoạt…`

## 3.4 Sửa `components/ui/footer.tsx`: cột Quick Links, Services, Contact Us (`ContactList`), logo, `© <năm> Cortexia`. Bỏ link mẫu và icon mạng xã hội. Ảnh minh hoạ có `alt=""` — HOÀN THÀNH

- Thời gian: 2026-10-27 10:48
- File đã đổi: `components/ui/footer.tsx`, `tests/footer.test.tsx`
- Kiểm chứng: `pnpm test -- footer` → exit 0 ((Use `node --trace-deprecation ...` to show where the warning was created)) [spec-done tự chạy lại]
- Requirements: 2.2, 2.3, 4.2
- Commit: `spec(nextjs-migration): 3.4 Sửa components/ui/footer.tsx: cột Quick…`

## 3.5 Sửa `app/(default)/layout.tsx`: AOS tắt khi `matchMedia("(prefers-reduced-motion: reduce)")` khớp. Tạo `app/not-found.tsx` theo giao diện Template, có `h1` và link về `/` — HOÀN THÀNH

- Thời gian: 2026-10-27 10:49
- File đã đổi: `app/(default)/layout.tsx`, `app/not-found.tsx`, `tests/layout.test.tsx`
- Kiểm chứng: `pnpm test -- layout && pnpm build && test -f out/404.html` → exit 0 ((Use `node --trace-deprecation ...` to show where the warning was created)) [spec-done tự chạy lại]
- Requirements: 4.3
- Commit: `spec(nextjs-migration): 3.5 Sửa app/(default)/layout.tsx: AOS tắt khi…`

## 4.1 Tạo `content/pages.ts` với văn bản giữ nguyên của Site cũ (tiêu đề, đoạn văn, 6 dịch vụ, quy trình, CTA, meta của 5 trang), tên thương hiệu đổi thành Cortexia — HOÀN THÀNH

- Thời gian: 2026-10-27 10:51
- File đã đổi: `content/pages.ts`
- Kiểm chứng: `pnpm lint && ! grep -qi dvtechnic content/pages.ts` → exit 0 (npx @next/codemod@canary next-lint-to-eslint-cli .) [spec-done tự chạy lại]
- Requirements: 1.2, 2.1, 5.1
- Commit: `spec(nextjs-migration): 4.1 Tạo content/pages.ts với văn bản giữ…`

## 4.2 Tạo `content/digital.ts`: ghi chú "NỘI DUNG MẪU" ở đầu file, 4 `stats`, `featuredCase`, 6 `portfolioCases`, 2 `serviceCases`, `testimonials` (chỉ chức danh và loại hình doanh nghiệp) thuộc ngành Digital — HOÀN THÀNH

- Thời gian: 2026-10-27 10:52
- File đã đổi: `content/digital.ts`, `tests/digital.test.ts`
- Kiểm chứng: `pnpm test -- digital` → exit 0 ((Use `node --trace-deprecation ...` to show where the warning was created)) [spec-done tự chạy lại]
- Requirements: 8.1, 8.3, 8.4, 8.5
- Commit: `spec(nextjs-migration): 4.2 Tạo content/digital.ts: ghi chú "NỘI DUNG…`
- Ghi chú: Site cũ không có khối lời chứng thực (0 mục), nên 'số lời chứng thực bằng Site cũ' không áp dụng được nguyên văn; giữ 3 mục mẫu cho khối Testimonials ở Home/About theo design, test khoá đúng 3 mục

## 4.3 Property P5: Case study đủ trường — HOÀN THÀNH

- Thời gian: 2026-10-27 10:52
- File đã đổi: `tests/properties/case-studies.property.test.ts`
- Kiểm chứng: `pnpm test -- case-studies` → exit 0 ((Use `node --trace-deprecation ...` to show where the warning was created)) [spec-done tự chạy lại]
- Requirements: 8.2
- Property: P5 pass (100 lần)
- Commit: `spec(nextjs-migration): 4.3 Property P5: Case study đủ trường`

## 4.4 Dựng `components/sections/`: `page-hero.tsx` (chứa `h1` duy nhất), `stats.tsx`, `feature-grid.tsx`, `case-studies.tsx`, `testimonials.tsx`, `cta.tsx` (tiêu đề + nút tới `/contact`). Chuyển `page-illustration.tsx`, `spotlight.tsx` vào đây. Xoá `hero-home.tsx`, `features.tsx`, `workflows.tsx`, `testimonials.tsx`, `cta.tsx` cũ ở `components/` — HOÀN THÀNH

- Thời gian: 2026-10-27 10:55
- File đã đổi: `app/(default)/page.tsx`, `app/not-found.tsx`, `components/cta.tsx`, `components/features.tsx`, `components/hero-home.tsx`, `components/page-illustration.tsx`, `components/sections/case-studies.tsx`, `components/sections/cta.tsx`, `components/sections/feature-grid.tsx`, `components/sections/page-hero.tsx`, `components/sections/page-illustration.tsx`, `components/sections/section-heading.tsx`, `components/sections/spotlight.tsx`, `components/sections/stats.tsx`, `components/sections/styles.ts`, `components/sections/testimonials.tsx`, `components/spotlight.tsx`, `components/testimonials.tsx`, `components/workflows.tsx`, `tests/sections.test.tsx`
- Kiểm chứng: `pnpm test -- sections && pnpm lint` → exit 0 (npx @next/codemod@canary next-lint-to-eslint-cli .) [spec-done tự chạy lại]
- Requirements: 1.3, 3.1, 3.2, 5.5
- Commit: `spec(nextjs-migration): 4.4 Dựng components/sections/: page-hero.tsx…`
- Ghi chú: Thêm styles.ts và section-heading.tsx dùng chung; spotlight.tsx sửa hết cảnh báo lint; app/(default)/page.tsx đổi tối thiểu sang sections để build không vỡ (trang đầy đủ ở 5.1).

## 4.5 Copy 6 ảnh `images/services/service-*.jpg` sang `public/images/services/` — HOÀN THÀNH

- Thời gian: 2026-10-27 10:55
- File đã đổi: `public/images/services/service-cloud-devops.jpg`, `public/images/services/service-mobile-app.jpg`, `public/images/services/service-odc-teams.jpg`, `public/images/services/service-security-maintenance.jpg`, `public/images/services/service-software-eng.jpg`, `public/images/services/service-telecom-network.jpg`
- Kiểm chứng: `test $(ls public/images/services/service-*.jpg | wc -l) -eq 6` → exit 0 (không có output) [spec-done tự chạy lại]
- Requirements: 1.2
- Commit: `spec(nextjs-migration): 4.5 Copy 6 ảnh images/services/service-*.jpg…`

## 5.1 Viết `app/(default)/page.tsx` (Trang chủ) và `app/(default)/about/page.tsx` theo bảng Trang trong design, có `metadata` từ `pageMetadata` — HOÀN THÀNH

- Thời gian: 2026-10-27 10:57
- File đã đổi: `app/(default)/about/page.tsx`, `app/(default)/page.tsx`, `components/sections/feature-grid.tsx`, `components/sections/section-heading.tsx`, `lib/metadata.ts`, `tests/properties/metadata.property.test.ts`
- Kiểm chứng: `pnpm build && test -f out/index.html && test -f out/about.html` → exit 0 (○  (Static)  prerendered as static content) [spec-done tự chạy lại]
- Requirements: 1.1, 1.2, 1.3, 5.1, 8.1, 8.3
- Commit: `spec(nextjs-migration): 5.1 Viết app/(default)/page.tsx (Trang chủ) và…`
- Ghi chú: pageMetadata bổ sung openGraph.images (/opengraph-image) vì openGraph của từng trang ghi đè file convention, làm mất og:image (5.1); P4 kiểm thêm og:image. SectionHeading nhận text nhiều đoạn, FeatureGrid cho text tùy chọn (dùng cho tech stack).

## 5.2 Viết `app/(default)/services/page.tsx` và `app/(default)/portfolio/page.tsx` (6 dịch vụ kèm ảnh có `alt`, case study từ `content/digital.ts`) — HOÀN THÀNH

- Thời gian: 2026-10-27 10:59
- File đã đổi: `app/(default)/portfolio/page.tsx`, `app/(default)/services/page.tsx`, `components/sections/featured-case.tsx`, `components/sections/service-list.tsx`, `content/pages.ts`
- Kiểm chứng: `pnpm build && test -f out/services.html && test -f out/portfolio.html` → exit 0 (○  (Static)  prerendered as static content) [spec-done tự chạy lại]
- Requirements: 1.1, 1.2, 1.3, 5.1, 8.2
- Commit: `spec(nextjs-migration): 5.2 Viết app/(default)/services/page.tsx và…`
- Ghi chú: Thêm sections/service-list.tsx (ảnh dịch vụ, alt giữ như Site cũ) và sections/featured-case.tsx (case nổi bật là h2 như Site cũ). Tiêu đề 'Production Systems: OpenClaw & Hermes' đổi thành 'Production Systems: Digital Platforms in Operation' theo 8.2/8.5.

## 5.3 Viết `lib/validate-contact.ts` (`validateContact`, `EMAIL_RE`, `FIELD_ORDER`, hàm `firstInvalidField`) — HOÀN THÀNH

- Thời gian: 2026-10-27 11:00
- File đã đổi: `lib/validate-contact.ts`, `tests/validate-contact.test.ts`
- Kiểm chứng: `pnpm test` → exit 0 ((Use `node --trace-deprecation ...` to show where the warning was created)) [spec-done tự chạy lại]
- Requirements: 6.3
- Commit: `spec(nextjs-migration): 5.3 Viết lib/validate-contact.ts…`

## 5.4 Property P2: Validation form liên hệ — HOÀN THÀNH

- Thời gian: 2026-10-27 11:00
- File đã đổi: `tests/properties/validate-contact.property.test.ts`
- Kiểm chứng: `pnpm test -- validate-contact` → exit 0 ((Use `node --trace-deprecation ...` to show where the warning was created)) [spec-done tự chạy lại]
- Requirements: 6.3
- Property: P2 pass (100 lần)
- Commit: `spec(nextjs-migration): 5.4 Property P2: Validation form liên hệ`

## 5.5 Viết `components/contact-form.tsx` và `app/(default)/contact/page.tsx` (hero, `ContactList`, form, các bước tiếp nhận, CTA) — HOÀN THÀNH

- Thời gian: 2026-10-27 11:02
- File đã đổi: `app/(default)/contact/page.tsx`, `components/contact-form.tsx`, `tests/contact-form.test.tsx`, `tests/contact-page.test.tsx`
- Kiểm chứng: `pnpm test -- contact && pnpm build && test -f out/contact.html` → exit 0 ((Use `node --trace-deprecation ...` to show where the warning was created)) [spec-done tự chạy lại]
- Requirements: 1.1, 1.3, 2.3, 6.1, 6.2, 6.3, 6.4
- Commit: `spec(nextjs-migration): 5.5 Viết components/contact-form.tsx và…`
- Ghi chú: Site cũ không có khối CTA trên trang Contact nên trang mới cũng không thêm (nút về /contact trên chính trang Contact là thừa). Form không gọi mạng, chỉ hiện role=status.

## 5.6 Tạo `app/sitemap.ts`, `app/robots.ts` (`force-static`) và `public/CNAME` — HOÀN THÀNH

- Thời gian: 2026-10-27 11:02
- File đã đổi: `app/robots.ts`, `app/sitemap.ts`, `public/CNAME`
- Kiểm chứng: `pnpm build && test $(grep -o "<loc>https://digitalcortexia.com[^<]*</loc>" out/sitemap.xml | wc -l) -eq 5 && grep -q "Sitemap: https://digitalcortexia.com/sitemap.xml" out/robots.txt && grep -qx digitalcortexia.com out/CNAME` → exit 0 (○  (Static)  prerendered as static content) [spec-done tự chạy lại]
- Requirements: 5.3, 5.4
- Commit: `spec(nextjs-migration): 5.6 Tạo app/sitemap.ts, app/robots.ts…`

## 6.1 Viết `scripts/check-build.mjs` theo mục "Kiểm tra sau build" của design. Script nhận thư mục qua đối số (mặc định `out`) — HOÀN THÀNH

- Thời gian: 2026-10-27 11:05
- File đã đổi: `scripts/check-build.mjs`, `tests/check-build.test.ts`, `tests/fixtures/build-bad/404.html`, `tests/fixtures/build-bad/CNAME`, `tests/fixtures/build-bad/about.html`, `tests/fixtures/build-bad/contact.html`, `tests/fixtures/build-bad/fonts/nacelle.woff2`, `tests/fixtures/build-bad/icon.svg`, `tests/fixtures/build-bad/images/logo.svg`, `tests/fixtures/build-bad/index.html`, `tests/fixtures/build-bad/portfolio.html`, `tests/fixtures/build-bad/robots.txt`, `tests/fixtures/build-bad/services.html`, `tests/fixtures/build-bad/site.css`, `tests/fixtures/build-bad/sitemap.xml`, `tests/fixtures/build-good/404.html`, `tests/fixtures/build-good/CNAME`, `tests/fixtures/build-good/about.html`, `tests/fixtures/build-good/contact.html`, `tests/fixtures/build-good/fonts/nacelle.woff2`, `tests/fixtures/build-good/icon.svg`, `tests/fixtures/build-good/images/logo.svg`, `tests/fixtures/build-good/index.html`, `tests/fixtures/build-good/portfolio.html`, `tests/fixtures/build-good/robots.txt`, `tests/fixtures/build-good/services.html`, `tests/fixtures/build-good/site.css`, `tests/fixtures/build-good/sitemap.xml`
- Kiểm chứng: `pnpm test -- check-build` → exit 0 ((Use `node --trace-deprecation ...` to show where the warning was created)) [spec-done tự chạy lại]
- Requirements: 1.4, 2.1, 4.2, 5.1, 5.2, 5.5, 7.4, 8.5
- Commit: `spec(nextjs-migration): 6.1 Viết scripts/check-build.mjs theo mục…`
- Ghi chú: Script có thêm cờ --root để test quét nguồn trong fixture thay vì repo thật. pnpm check trên out/ thật: OK.

## 6.2 Test so khớp nội dung Site cũ `tests/legacy-content.test.ts`: mọi chuỗi trong `legacy-text.json` xuất hiện trong text của `out/<page>.html` tương ứng. Test bỏ qua nếu chưa có `out/` — HOÀN THÀNH

- Thời gian: 2026-10-27 11:06
- File đã đổi: `tests/legacy-content.test.ts`
- Kiểm chứng: `pnpm build && pnpm test -- legacy-content` → exit 0 ((Use `node --trace-deprecation ...` to show where the warning was created)) [spec-done tự chạy lại]
- Requirements: 1.2, 1.3
- Commit: `spec(nextjs-migration): 6.2 Test so khớp nội dung Site cũ…`

## 6.3 Chạy `pnpm build && pnpm check` và sửa mọi lỗi tới khi đạt. Phục vụ `out/` bằng `serve` (ghim phiên bản qua `pnpm dlx`), dùng `curl` kiểm tra 5 URL trả 200 và một URL lạ trả trang 404 — HOÀN THÀNH

- Thời gian: 2026-10-27 11:06
- File đã đổi: không có (ngoài specs/)
- Kiểm chứng: `pnpm check && curl -sf -o /dev/null http://localhost:4173/ && curl -sf -o /dev/null http://localhost:4173/about && curl -sf -o /dev/null http://localhost:4173/services && curl -sf -o /dev/null http://localhost:4173/portfolio && curl -sf -o /dev/null http://localhost:4173/contact && test "$(curl -s -o /dev/null -w %{http_code} http://localhost:4173/nope-xyz)" = 404` → exit 0 (check-build: OK (out)) [spec-done tự chạy lại]
- Requirements: 1.1, 2.1, 4.1, 4.3, 5.3, 5.4, 7.1, 7.2
- Commit: `spec(nextjs-migration): 6.3 Chạy pnpm build && pnpm check và sửa mọi…` (chỉ cập nhật specs/)
- Ghi chú: Phục vụ bằng pnpm dlx serve@14.2.4 out -l 4173. 5 URL trả 200, /nope-xyz trả 404 với trang Page not found có link về /. File out/opengraph-image không có đuôi nên static server trả không kèm content-type image/png.

## 7.1 Xoá mã Site cũ: `index.html`, `about.html`, `services.html`, `portfolio.html`, `contact.html`, `css/`, `js/`, `images/`, `fonts/`, `CNAME`, `robots.txt`, `sitemap.xml` ở gốc. Giữ `scripts/extract-legacy.mjs` nhưng cho nó báo lỗi rõ ràng khi không còn file HTML cũ — HOÀN THÀNH

- Thời gian: 2026-10-27 11:10
- File đã đổi: `CNAME`, `README.md`, `about.html`, `contact.html`, `css/animate.css`, `css/bootstrap.min.css`, `css/cusor-text.css`, `css/flaticon-set-business.css`, `css/flaticon.css`, `css/fontawesome-all.css`, `css/fontawesome-free.css`, `css/fontawesome.css`, `css/linear.css`, `css/magnific.css`, `css/nice-select.css`, `css/odometer-theme-default.css`, `css/responsive.css`, `css/style.css`, `css/style.css.map`, `css/swiper.min.css`, `css/tm-bs-mp.css`, `css/tm-utility-classes.css`, `fonts/demo-files/demo.js`, `fonts/fa-brands-400.eot`, `fonts/fa-brands-400.svg`, `fonts/fa-brands-400.ttf`, `fonts/fa-brands-400.woff`, `fonts/fa-brands-400.woff2`, `fonts/fa-duotone-900.ttf`, `fonts/fa-duotone-900.woff`, `fonts/fa-duotone-900.woff2`, `fonts/fa-light-300.ttf`, `fonts/fa-light-300.woff`, `fonts/fa-light-300.woff2`, `fonts/fa-regular-400.eot`, `fonts/fa-regular-400.svg`, `fonts/fa-regular-400.ttf`, `fonts/fa-regular-400.woff`, `fonts/fa-regular-400.woff2`, `fonts/fa-solid-900.eot`, `fonts/fa-solid-900.svg`, `fonts/fa-solid-900.ttf`, `fonts/fa-solid-900.woff`, `fonts/fa-solid-900.woff2`, `fonts/fa-thin-100.ttf`, `fonts/fa-thin-100.woff`, `fonts/fa-thin-100.woff2`, `fonts/flaticon-business.html`, `fonts/flaticon-business.scss`, `fonts/flaticon-business.svg`, `fonts/flaticon-business.ttf`, `fonts/flaticon-business.woff`, `fonts/flaticon-business.woff2`, `fonts/flaticon-set-business.eot`, `fonts/flaticon-set-business.html`, `fonts/flaticon-set-business.svg`, `fonts/flaticon-set-business.ttf`, `fonts/flaticon-set-business.woff`, `fonts/linear.html`, `fonts/linearicons-free.css`, `fonts/linearicons-free.eot`, `fonts/linearicons-free.html`, `fonts/linearicons-free.svg`, `fonts/linearicons-free.ttf`, `fonts/linearicons-free.woff`, `fonts/webfonts/fa-brands-400.ttf`, `fonts/webfonts/fa-brands-400.woff2`, `fonts/webfonts/fa-regular-400.ttf`, `fonts/webfonts/fa-regular-400.woff2`, `fonts/webfonts/fa-solid-900.ttf`, `fonts/webfonts/fa-solid-900.woff2`, `fonts/webfonts/fa-v4compatibility.ttf`, `fonts/webfonts/fa-v4compatibility.woff2`, `images/favicon.png`, `images/home-2/Banner.jpg`, `images/home-2/about-bg.jpg`, `images/home-2/about-img.png`, `images/home-2/about-rotet-sp.png`, `images/home-2/about-sap.png`, `images/home-2/about-shape2.png`, `images/home-2/blog-bg.jpg`, `images/home-2/blog-sp.png`, `images/home-2/blog1.jpg`, `images/home-2/blog2.jpg`, `images/home-2/blog3.jpg`, `images/home-2/brand2.png`, `images/home-2/brand3.png`, `images/home-2/brand4.png`, `images/home-2/brand5.png`, `images/home-2/brand6.png`, `images/home-2/clip-spa.png`, `images/home-2/faq-bg.png`, `images/home-2/faq-img.png`, `images/home-2/faq-shape.png`, `images/home-2/footer-bg.jpg`, `images/home-2/icon-proses.png`, `images/home-2/marque-rotate.png`, `images/home-2/pag-sp.png`, `images/home-2/porject-bg.jpg`, `images/home-2/pricing-bg.jpg`, `images/home-2/pricing-box-bg.jpg`, `images/home-2/pricing-shape1.png`, `images/home-2/pricing-shape2.png`, `images/home-2/pricing-shape3.png`, `images/home-2/pricing-sp1.png`, `images/home-2/project-1.png`, `images/home-2/project-2.png`, `images/home-2/project-3.png`, `images/home-2/project-bg.jpg`, `images/home-2/prosess-bg.jpg`, `images/home-2/prosess-img1.png`, `images/home-2/prosess-img2.png`, `images/home-2/prosess-img3.png`, `images/home-2/prosess-img4.png`, `images/home-2/prosess-nam-sp.png`, `images/home-2/prosess-sp1.png`, `images/home-2/prosess-sp2.png`, `images/home-2/service-bg.jpg`, `images/home-2/service-content-sp.png`, `images/home-2/service-img1.png`, `images/home-2/service-img2.png`, `images/home-2/service-img3.png`, `images/home-2/service-img4.png`, `images/home-2/service-sp.png`, `images/home-2/service-sp2.png`, `images/home-2/test-arro.png`, `images/home-2/test-logo.png`, `images/home-2/test-logo3.png`, `images/home-2/testi-bg.jpg`, `images/home-2/testi-logo1.png`, `images/home-3/Shape.png`, `images/home-3/about-img2.png`, `images/home-3/abut-img1.png`, `images/home-3/banner-bg.jpg`, `images/home-3/banner-global-tech.jpg`, `images/home-3/box-sp.png`, `images/home-3/contact-bg.jpg`, `images/home-3/contact-img.png`, `images/home-3/contact-sp.png`, `images/home-3/customar-author.png`, `images/home-3/service-bg.png`, `images/home-3/service-box-hover.png`, `images/home-3/service-img01.png`, `images/home-3/service-img02.png`, `images/home-3/service-img03.png`, `images/home-3/service-img1.png`, `images/home-3/service-img2.png`, `images/home-3/service-img3.png`, `images/home-3/service-offshore-team.jpg`, `images/home-3/service-software-eng.jpg`, `images/home-3/service-sp.png`, `images/home-3/service-telecom-network.jpg`, `images/home-3/testi-img.jpg`, `images/inner-image/about-hero-bg.jpg`, `images/inner-image/about-team-primary.jpg`, `images/inner-image/about-team-secondary.jpg`, `images/inner-image/about-why-choose.jpg`, `images/inner-image/blog-details-author-1.png`, `images/inner-image/blog-details-author-2.png`, `images/inner-image/blog-details-benifis-thumb-1.png`, `images/inner-image/blog-details-benifis-thumb-2.png`, `images/inner-image/blog-details-quote.png`, `images/inner-image/blog-details.jpg`, `images/inner-image/breadcumb-bg.jpg`, `images/inner-image/category-icon.png`, `images/inner-image/contact-consultation.jpg`, `images/inner-image/contact-hero-bg.jpg`, `images/inner-image/portfolio-hero-bg.jpg`, `images/inner-image/prot-img1.png`, `images/inner-image/prot-img2.png`, `images/inner-image/prot-img3.png`, `images/inner-image/prot-img4.png`, `images/inner-image/prot-img5.png`, `images/inner-image/recent-post-1.png`, `images/inner-image/recent-post-2.png`, `images/inner-image/recent-post-3.png`, `images/inner-image/service-img-bg.png`, `images/inner-image/service-img1.png`, `images/inner-image/service-img2.png`, `images/inner-image/service-img3.png`, `images/inner-image/service-img4.png`, `images/inner-image/service-main-img.png`, `images/inner-image/service-thumb1.png`, `images/inner-image/service-thumb2.png`, `images/inner-image/service-thumb3.png`, `images/inner-image/service-thumb4.png`, `images/inner-image/services-hero-bg.jpg`, `images/inner-image/sidebar-img.png`, `images/inner-image/team-img.jpg`, `images/inner-image/team-sp.png`, `images/inner-image/team-sp3.png`, `images/inner-image/team1.png`, `images/inner-image/team2.png`, `images/inner-image/team3.png`, `images/inner-image/team4.png`, `images/inner-image/teamsp-up.png`, `images/inner-image/vedio-bg.png`, `images/logo copy 2.png`, `images/logo copy.png`, `images/logo-dvtechnic-white.png`, `images/logo-dvtechnic-white.svg`, `images/logo-dvtechnic.png`, `images/logo-dvtechnic.svg`, `images/logo.png`, `images/logo2.png`, `images/main-home/Shape.png`, `images/main-home/about-bg.png`, `images/main-home/about-shape.png`, `images/main-home/about-shape2.png`, `images/main-home/about-thumb1.png`, `images/main-home/about-thumb2.png`, `images/main-home/author.png`, `images/main-home/author1.png`, `images/main-home/author2.png`, `images/main-home/banner-bg.png`, `images/main-home/banner-shape.jpg`, `images/main-home/blog-shape1.png`, `images/main-home/blog1.png`, `images/main-home/blog2.png`, `images/main-home/blog3.png`, `images/main-home/brand-icon1.png`, `images/main-home/brand-icon2.png`, `images/main-home/brand-icon3.png`, `images/main-home/catagory-sp.png`, `images/main-home/choose-shape.png`, `images/main-home/choose-thumb.png`, `images/main-home/footer-bg.jpg`, `images/main-home/hero-thumb.png`, `images/main-home/icon01.png`, `images/main-home/icon02.png`, `images/main-home/icon03.png`, `images/main-home/icon04.png`, `images/main-home/icon05.png`, `images/main-home/icon6.png`, `images/main-home/jurney-img.png`, `images/main-home/line1.png`, `images/main-home/line2.png`, `images/main-home/revew-bg.png`, `images/main-home/service-bg-img.png`, `images/main-home/service-dance.png`, `images/main-home/service-hover-sp.png`, `images/main-home/service-img1.png`, `images/main-home/service-img2.png`, `images/main-home/service-img3.png`, `images/main-home/service-img4.png`, `images/main-home/service-shap.png`, `images/main-home/service-sp.png`, `images/main-home/service-sp1.png`, `images/main-home/service-thumb1.png`, `images/main-home/service-thumb2.png`, `images/main-home/service-thumb3.png`, `images/main-home/setting-icon.png`, `images/main-home/team-bg.png`, `images/main-home/team0.png`, `images/main-home/team01.png`, `images/main-home/team02.png`, `images/main-home/team03.png`, `images/main-home/team1.png`, `images/main-home/team2.png`, `images/main-home/team3.png`, `images/main-home/testi-author.png`, `images/main-home/testi-shape.png`, `images/main-home/video-bg.png`, `images/portfolio/portfolio-cloud-devops.jpg`, `images/portfolio/portfolio-erp-logistics.jpg`, `images/portfolio/portfolio-fintech-banking.jpg`, `images/portfolio/portfolio-fleet-telematics.jpg`, `images/portfolio/telecom-cdr-dashboard.jpg`, `images/portfolio/templates/portfolio-cloud-devops.html`, `images/portfolio/templates/portfolio-erp-logistics.html`, `images/portfolio/templates/portfolio-fintech-banking.html`, `images/portfolio/templates/portfolio-fleet-telematics.html`, `images/portfolio/templates/telecom-cdr-dashboard.html`, `images/services/hermes-banner.png`, `images/services/hermes-dashboard-hd.png`, `images/services/hermes-favicon.svg`, `images/services/hermes-icon-hi.png`, `images/services/hermes-icon.png`, `images/services/hermes-logo.png`, `images/services/hermes-mascot-transparent.png`, `images/services/hermes-mascot.png`, `images/services/hermes-nous-girl.png`, `images/services/hermes-nous-transparent.png`, `images/services/hermes-official-logo.png`, `images/services/hermes-profile-ui.png`, `images/services/hermes-system-preview.svg`, `images/services/nous-badge.png`, `images/services/nous-logo.png`, `images/services/openclaw-agents-ui.jpg`, `images/services/openclaw-banner-dark.png`, `images/services/openclaw-hero-dark.png`, `images/services/openclaw-lobster.svg`, `images/services/openclaw-mascot.png`, `images/services/openclaw-system-preview.svg`, `images/services/service-cloud-devops.jpg`, `images/services/service-mobile-app.jpg`, `images/services/service-odc-teams.jpg`, `images/services/service-security-maintenance.jpg`, `images/services/service-software-eng.jpg`, `images/services/service-telecom-network.jpg`, `index.html`, `js/ScrollSmoother.min.js`, `js/ScrollToPlugin.min.js`, `js/ScrollTrigger.min.js`, `js/SplitText.js`, `js/appear.js`, `js/bootstrap.min.js`, `js/cusor-text.js`, `js/custom.js`, `js/gsap.min.js`, `js/imagesloaded.pkgd.min.js`, `js/isotope.pkgd.min.js`, `js/jquery.countdown.js`, `js/jquery.counterup.min.js`, `js/jquery.form.min.js`, `js/jquery.js`, `js/knob.js`, `js/magnific.js`, `js/mixitup.js`, `js/nice-select.js`, `js/popper.min.js`, `js/script.js`, `js/swiper.min.js`, `js/waypoints.min.js`, `js/wow.js`, `portfolio.html`, `robots.txt`, `scripts/check-build.mjs`, `scripts/extract-legacy.mjs`, `scripts/forbidden-names.mjs`, `services.html`, `sitemap.xml`, `tests/check-build.test.ts`, `tests/digital.test.ts`, `tests/fixtures/build-bad/index.html`
- Kiểm chứng: `pnpm build && pnpm check && pnpm test && test -z "$(grep -rIil dvtechnic --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=specs --exclude-dir=out --exclude-dir=.next --exclude-dir=.claude .)"` → exit 0 ((Use `node --trace-deprecation ...` to show where the warning was created)) [spec-done tự chạy lại]
- Requirements: 2.1, 8.5
- Commit: `spec(nextjs-migration): 7.1 Xoá mã Site cũ: index.html, about.html…`
- Ghi chú: Tên cấm trong scripts/tests được ghép từ mảnh (scripts/forbidden-names.mjs); fixture build-bad dùng placeholder, test thay bằng tên thật trong thư mục tạm. extract-legacy thoát 1 kèm thông báo rõ khi thiếu HTML cũ.
