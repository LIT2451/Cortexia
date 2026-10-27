# Nhật ký thực thi: home-hero-remove

## 1 Bỏ ảnh hero khỏi content và trang chủ, xoá file ảnh, chuyển nguồn ảnh sang Open Graph, cập nhật test — HOÀN THÀNH

- Thời gian: 2026-10-27 12:10
- File đã đổi: `app/(default)/page.tsx`, `content/image-credits.ts`, `content/pages.ts`, `public/images/home/home-hero.jpg`, `tests/home-page.test.tsx`, `tests/image-credits.test.ts`, `tests/sections.test.tsx`
- Kiểm chứng: `pnpm test && pnpm build && pnpm check && pnpm lint && pnpm exec tsc --noEmit` → exit 0 (npx @next/codemod@canary next-lint-to-eslint-cli .) [spec-done tự chạy lại]
- Requirements: 1.1, 1.2, 1.3
- Commit: `spec(home-hero-remove): 1 Bỏ ảnh hero khỏi content và trang chủ, xoá…`
- Ghi chú: Bỏ ảnh hero ở Home, xoá home-hero.jpg, nguồn ảnh chuyển sang opengraph-image.jpg, cập nhật test
