# Nhật ký thực thi: real-photos

## 1 Tải 14 ảnh Unsplash theo bảng, nén ≤ 300 KB, ghi đè file hiện có, cập nhật alt; thêm `content/image-credits.ts` và test nguồn ảnh — HOÀN THÀNH

- Thời gian: 2026-10-27 12:06
- File đã đổi: `content/digital.ts`, `content/image-credits.ts`, `content/pages.ts`, `public/images/home/about-engineering-team.jpg`, `public/images/home/ai-document-automation.jpg`, `public/images/home/ai-fleet-maintenance.jpg`, `public/images/home/ai-support-copilot.jpg`, `public/images/home/home-hero.jpg`, `public/images/home/service-custom-software.jpg`, `public/images/home/service-offshore-teams.jpg`, `public/images/home/service-telecom-platform.jpg`, `public/images/services/service-cloud-devops.jpg`, `public/images/services/service-mobile-app.jpg`, `public/images/services/service-odc-teams.jpg`, `public/images/services/service-security-maintenance.jpg`, `public/images/services/service-software-eng.jpg`, `public/images/services/service-telecom-network.jpg`, `tests/image-credits.test.ts`
- Kiểm chứng: `pnpm test && pnpm build && pnpm check` → exit 0 ((Use `node --trace-deprecation ...` to show where the warning was created)) [spec-done tự chạy lại]
- Requirements: 1.1, 1.2, 1.4
- Commit: `spec(real-photos): 1 Tải 14 ảnh Unsplash theo bảng, nén ≤ 300 KB, ghi…`
- Ghi chú: Tải 14 ảnh Unsplash miễn phí qua CDN, mỗi file dưới 190 KB; cập nhật alt; thêm content/image-credits.ts và tests/image-credits.test.ts

## 2 Thay ảnh Open Graph vẽ bằng code bằng `app/opengraph-image.jpg` tĩnh, cập nhật `lib/metadata.ts` và test — HOÀN THÀNH

- Thời gian: 2026-10-27 12:07
- File đã đổi: `app/opengraph-image.alt.txt`, `app/opengraph-image.jpg`, `app/opengraph-image.tsx`, `lib/metadata.ts`, `tests/properties/metadata.property.test.ts`
- Kiểm chứng: `pnpm build && pnpm check && pnpm test && grep -q "og:image\" content=\"https://digitalcortexia.com/opengraph-image.jpg" out/index.html` → exit 0 ((Use `node --trace-deprecation ...` to show where the warning was created)) [spec-done tự chạy lại]
- Requirements: 1.3, 1.4
- Commit: `spec(real-photos): 2 Thay ảnh Open Graph vẽ bằng code bằng…`
- Ghi chú: Xoá opengraph-image.tsx, thêm opengraph-image.jpg 1200x630 cắt từ ảnh hero (129 KB) và alt.txt; metadata trỏ /opengraph-image.jpg
