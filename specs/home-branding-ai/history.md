# Nhật ký thực thi: home-branding-ai

## 1 Thu nhỏ logo vào `public/images/logo/cortexia-logo.png`, đổi `components/ui/logo.tsx` sang `next/image`; viết test logo có ảnh với alt và link `/` — HOÀN THÀNH

- Thời gian: 2026-10-27 11:26
- File đã đổi: `components/ui/logo.tsx`, `public/images/logo/cortexia-logo.png`, `tests/logo.test.tsx`
- Kiểm chứng: `pnpm test` → exit 0 ((Use `node --trace-deprecation ...` to show where the warning was created)) [spec-done tự chạy lại]
- Requirements: 1.1, 1.5
- Commit: `spec(home-branding-ai): 1 Thu nhỏ logo vào…`
- Ghi chú: Logo gốc có chữ Cortexia màu xanh navy tối, không đọc được trên nền tối của site, nên chỉ cắt phần biểu tượng (96x96, 11 KB) và giữ tên dạng chữ bên cạnh.
