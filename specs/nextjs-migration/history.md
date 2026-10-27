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
