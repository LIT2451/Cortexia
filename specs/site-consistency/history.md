# Nhật ký thực thi: site-consistency

## 1 Tạo `app/icon.png`, `app/apple-icon.png` từ `Logo/Favicon.png`, xoá `app/icon.svg`, đổi ảnh Open Graph sang biểu tượng mới, cập nhật `check-build.mjs` và fixture build-good — HOÀN THÀNH

- Thời gian: 2026-10-27 11:47
- File đã đổi: `app/apple-icon.png`, `app/icon.png`, `app/icon.svg`, `app/opengraph-image.tsx`, `scripts/check-build.mjs`, `tests/fixtures/build-bad/about.html`, `tests/fixtures/build-bad/contact.html`, `tests/fixtures/build-bad/portfolio.html`, `tests/fixtures/build-bad/services.html`, `tests/fixtures/build-good/about.html`, `tests/fixtures/build-good/apple-icon.png`, `tests/fixtures/build-good/contact.html`, `tests/fixtures/build-good/icon.png`, `tests/fixtures/build-good/icon.svg`, `tests/fixtures/build-good/index.html`, `tests/fixtures/build-good/portfolio.html`, `tests/fixtures/build-good/services.html`
- Kiểm chứng: `pnpm build && pnpm check && pnpm test && test -f out/icon.png && test -f out/apple-icon.png` → exit 0 ((Use `node --trace-deprecation ...` to show where the warning was created)) [spec-done tự chạy lại]
- Requirements: 1.1, 1.6
- Commit: `spec(site-consistency): 1 Tạo app/icon.png, app/apple-icon.png từ…`
- Ghi chú: Favicon/apple-icon từ Logo/Favicon.png, OG dùng icon mới, check-build kiểm icon.png + apple-icon.png
