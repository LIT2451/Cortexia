# Nhật ký thực thi: home-branding-ai

## 1 Thu nhỏ logo vào `public/images/logo/cortexia-logo.png`, đổi `components/ui/logo.tsx` sang `next/image`; viết test logo có ảnh với alt và link `/` — HOÀN THÀNH

- Thời gian: 2026-10-27 11:26
- File đã đổi: `components/ui/logo.tsx`, `public/images/logo/cortexia-logo.png`, `tests/logo.test.tsx`
- Kiểm chứng: `pnpm test` → exit 0 ((Use `node --trace-deprecation ...` to show where the warning was created)) [spec-done tự chạy lại]
- Requirements: 1.1, 1.5
- Commit: `spec(home-branding-ai): 1 Thu nhỏ logo vào…`
- Ghi chú: Logo gốc có chữ Cortexia màu xanh navy tối, không đọc được trên nền tối của site, nên chỉ cắt phần biểu tượng (96x96, 11 KB) và giữ tên dạng chữ bên cạnh.

## 2 Lấy và nén ảnh cho Home vào `public/images/home/`; thêm prop ảnh cho `PageHero`, `FeatureGrid`, `CaseStudies` và component `ImageSplit`; viết test render ảnh và alt — HOÀN THÀNH

- Thời gian: 2026-10-27 11:28
- File đã đổi: `components/sections/case-studies.tsx`, `components/sections/feature-grid.tsx`, `components/sections/image-split.tsx`, `components/sections/page-hero.tsx`, `components/sections/types.ts`, `content/digital.ts`, `public/images/home/ai-assistant.jpg`, `public/images/home/ai-predictive-ops.jpg`, `public/images/home/ai-process-automation.jpg`, `public/images/home/company-team.jpg`, `public/images/home/home-hero.jpg`, `public/images/home/service-software.jpg`, `public/images/home/service-teams.jpg`, `public/images/home/service-telecom.jpg`, `tests/sections.test.tsx`
- Kiểm chứng: `pnpm test && test -z "$(find public/images/home -type f -size +300k)"` → exit 0 ((Use `node --trace-deprecation ...` to show where the warning was created)) [spec-done tự chạy lại]
- Requirements: 1.2, 1.3, 1.5
- Commit: `spec(home-branding-ai): 2 Lấy và nén ảnh cho Home vào…`
- Ghi chú: 8 ảnh JPEG trong public/images/home (123-219 KB), lấy từ site cũ commit 300a79a và ảnh dịch vụ hiện có. Thêm components/sections/types.ts cho kiểu ContentImage.

## 3 Thêm nội dung `home.about`, `home.automation`, `aiCases` (3 dự án mẫu) và ảnh trong content; ghép vào trang Home; viết test trang Home có 1 h1, khối giới thiệu và ≥ 3 dự án AI — HOÀN THÀNH

- Thời gian: 2026-10-27 11:29
- File đã đổi: `app/(default)/page.tsx`, `content/digital.ts`, `content/pages.ts`, `tests/home-page.test.tsx`
- Kiểm chứng: `pnpm test` → exit 0 ((Use `node --trace-deprecation ...` to show where the warning was created)) [spec-done tự chạy lại]
- Requirements: 1.2, 1.3, 1.4, 1.6
- Commit: `spec(home-branding-ai): 3 Thêm nội dung home.about, home.automation…`
- Ghi chú: aiCases (3 dự án mẫu) nằm trong content/digital.ts (đã ghi chú NỘI DUNG MẪU); home.about và home.automation là nội dung mới, có comment trong content/pages.ts.
