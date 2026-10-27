# Nhật ký thực thi: contact-info-services-fix

## 1 Thêm email, số điện thoại mẫu vào `config/site.ts` và cập nhật test — HOÀN THÀNH

- Thời gian: 2026-10-27 12:18
- File đã đổi: `config/site.ts`, `tests/footer.test.tsx`, `tests/site.test.ts`
- Kiểm chứng: `pnpm test && pnpm build && grep -q "mailto:contact@digitalcortexia.com" out/contact.html && grep -q "tel:+842432006688" out/contact.html` → exit 0 ((Use `node --trace-deprecation ...` to show where the warning was created)) [spec-done tự chạy lại]
- Requirements: 1.1, 1.3
- Commit: `spec(contact-info-services-fix): 1 Thêm email, số điện thoại mẫu vào…`
- Ghi chú: Điền email, phone mẫu (ghi chú SAMPLE), taxId để trống; cập nhật tests/site.test.ts, tests/footer.test.tsx cho phép link mailto/tel

## 2 Sửa padding thẻ có ảnh trong `ServiceList`, `FeatureGrid` và thêm test — HOÀN THÀNH

- Thời gian: 2026-10-27 12:19
- File đã đổi: `components/sections/feature-grid.tsx`, `components/sections/service-list.tsx`, `components/sections/styles.ts`, `tests/sections.test.tsx`
- Kiểm chứng: `pnpm build && pnpm check && pnpm lint && pnpm test && pnpm exec tsc --noEmit` → exit 0 ((Use `node --trace-deprecation ...` to show where the warning was created)) [spec-done tự chạy lại]
- Requirements: 1.2, 1.3
- Commit: `spec(contact-info-services-fix): 2 Sửa padding thẻ có ảnh trong…`
- Ghi chú: Tách cardBase (không padding) khỏi card; thẻ có ảnh ở ServiceList và FeatureGrid dùng cardBase; thêm test class thẻ
