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
