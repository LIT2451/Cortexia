# Nhật ký thực thi: site-consistency

## 1 Tạo `app/icon.png`, `app/apple-icon.png` từ `Logo/Favicon.png`, xoá `app/icon.svg`, đổi ảnh Open Graph sang biểu tượng mới, cập nhật `check-build.mjs` và fixture build-good — HOÀN THÀNH

- Thời gian: 2026-10-27 11:47
- File đã đổi: `app/apple-icon.png`, `app/icon.png`, `app/icon.svg`, `app/opengraph-image.tsx`, `scripts/check-build.mjs`, `tests/fixtures/build-bad/about.html`, `tests/fixtures/build-bad/contact.html`, `tests/fixtures/build-bad/portfolio.html`, `tests/fixtures/build-bad/services.html`, `tests/fixtures/build-good/about.html`, `tests/fixtures/build-good/apple-icon.png`, `tests/fixtures/build-good/contact.html`, `tests/fixtures/build-good/icon.png`, `tests/fixtures/build-good/icon.svg`, `tests/fixtures/build-good/index.html`, `tests/fixtures/build-good/portfolio.html`, `tests/fixtures/build-good/services.html`
- Kiểm chứng: `pnpm build && pnpm check && pnpm test && test -f out/icon.png && test -f out/apple-icon.png` → exit 0 ((Use `node --trace-deprecation ...` to show where the warning was created)) [spec-done tự chạy lại]
- Requirements: 1.1, 1.6
- Commit: `spec(site-consistency): 1 Tạo app/icon.png, app/apple-icon.png từ…`
- Ghi chú: Favicon/apple-icon từ Logo/Favicon.png, OG dùng icon mới, check-build kiểm icon.png + apple-icon.png

## 2 Thêm quy tắc không trùng ảnh (cùng `src` trên nhiều vị trí, trùng hash) vào `check-build.mjs`; viết test với fixture lỗi cho cả hai trường hợp — HOÀN THÀNH

- Thời gian: 2026-10-27 11:48
- File đã đổi: `scripts/check-build.mjs`, `tests/check-build.test.ts`
- Kiểm chứng: `pnpm test && pnpm build && pnpm check` → exit 0 ((Use `node --trace-deprecation ...` to show where the warning was created)) [spec-done tự chạy lại]
- Requirements: 1.2, 1.3
- Commit: `spec(site-consistency): 2 Thêm quy tắc không trùng ảnh (cùng src trên…`
- Ghi chú: Thêm kiểm tra src ảnh dùng >1 lần và trùng SHA-256. Lưu ý: bản sao ở Home là ảnh đã nén lại (khác byte, khác src) nên check không bắt được; task 3 xoá thủ công.

## 3 Phân bổ lại ảnh theo bảng: lấy ảnh từ commit `300a79a`, nén, lưu vào `public/images/home/`, xoá bản sao cũ, nén 6 ảnh Services, cập nhật đường dẫn và alt trong content — HOÀN THÀNH

- Thời gian: 2026-10-27 11:50
- File đã đổi: `content/digital.ts`, `content/pages.ts`, `public/images/home/about-engineering-team.jpg`, `public/images/home/ai-assistant.jpg`, `public/images/home/ai-document-automation.jpg`, `public/images/home/ai-fleet-maintenance.jpg`, `public/images/home/ai-predictive-ops.jpg`, `public/images/home/ai-process-automation.jpg`, `public/images/home/ai-support-copilot.jpg`, `public/images/home/company-team.jpg`, `public/images/home/service-custom-software.jpg`, `public/images/home/service-offshore-teams.jpg`, `public/images/home/service-software.jpg`, `public/images/home/service-teams.jpg`, `public/images/home/service-telecom-platform.jpg`, `public/images/home/service-telecom.jpg`, `public/images/services/service-cloud-devops.jpg`, `public/images/services/service-mobile-app.jpg`, `public/images/services/service-odc-teams.jpg`, `public/images/services/service-security-maintenance.jpg`, `public/images/services/service-software-eng.jpg`, `public/images/services/service-telecom-network.jpg`, `tests/sections.test.tsx`
- Kiểm chứng: `pnpm build && pnpm check && pnpm test && test -z "$(find public/images -type f -size +300k)"` → exit 0 ((Use `node --trace-deprecation ...` to show where the warning was created)) [spec-done tự chạy lại]
- Requirements: 1.2, 1.4
- Commit: `spec(site-consistency): 3 Phân bổ lại ảnh theo bảng: lấy ảnh từ commit…`
- Ghi chú: 8 ảnh Home lấy từ 8 file site cũ khác nhau (blob khác ảnh Services), xoá bản sao; 6 ảnh Services nén về ≤300 KB; thêm test src không trùng và giới hạn 300 KB cho toàn public/images

## 4 Sửa nội dung theo bảng rà soát (a–h), cập nhật `legacy-text.json` và test liên quan — HOÀN THÀNH

- Thời gian: 2026-10-27 11:52
- File đã đổi: `app/(default)/about/page.tsx`, `app/(default)/page.tsx`, `content/digital.ts`, `content/pages.ts`, `tests/contact-form.test.tsx`, `tests/content-consistency.test.tsx`, `tests/digital.test.ts`, `tests/fixtures/legacy-text.json`
- Kiểm chứng: `pnpm test` → exit 0 ((Use `node --trace-deprecation ...` to show where the warning was created)) [spec-done tự chạy lại]
- Requirements: 1.5, 1.6
- Commit: `spec(site-consistency): 4 Sửa nội dung theo bảng rà soát (a–h), cập…`
- Ghi chú: a–h: hero Services/Portfolio viết lại (cập nhật legacy-text.json), case Services đổi sang Cloud Contact Center & VoIP, case AI đổi sang Predictive Fleet Maintenance, uptime 99.99%, bỏ link trùng Why Us, About bỏ Stats/Testimonials, meta Home và form thêm AI & Process Automation; thêm tests/content-consistency.test.tsx
