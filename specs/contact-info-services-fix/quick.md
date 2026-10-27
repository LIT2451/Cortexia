# Spec nhanh: Thêm email, số điện thoại mẫu và sửa lỗi thẻ ảnh ở trang Services

## Mục tiêu

1. Thông tin liên hệ hiện chỉ có địa chỉ (`config/site.ts` để trống `email`, `phone`), nên footer và trang Contact trông thiếu. Anh muốn thêm email, số điện thoại mẫu cho đầy đủ, chuyên nghiệp.
2. Lỗi ở `/services`: thẻ dịch vụ dùng class `${card} p-0` để ảnh sát mép thẻ, nhưng `card` đã có `p-6`. Trong CSS build ra, `.p-6` đứng sau `.p-0` nên `p-6` thắng: ảnh bị thụt vào 24px, góc bo của ảnh lệch với góc thẻ. Lỗi giống vậy xảy ra ở thẻ có ảnh của `FeatureGrid` (khối dịch vụ ở Home).

## 1. Tiêu chí chấp nhận

1. Footer và trang Contact PHẢI hiển thị địa chỉ, email `contact@digitalcortexia.com` (link `mailto:`) và số điện thoại mẫu `+84 24 3200 6688` (link `tel:+842432006688`); `config/site.ts` PHẢI ghi chú đây là thông tin mẫu cần thay trước khi chạy thật.
2. KHI hiển thị thẻ có ảnh trong `ServiceList` và `FeatureGrid`, thẻ PHẢI không có padding (ảnh sát mép trên, nội dung có `p-6` riêng); class của thẻ PHẢI không chứa đồng thời `p-0` và `p-6`.
3. Hành vi cũ PHẢI giữ nguyên: thẻ không có ảnh vẫn có `p-6`; mục liên hệ trống vẫn bị ẩn (`taxId` vẫn để trống nên không hiện); mỗi trang đúng 1 h1; `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm test` đạt.

## Thiết kế

- `config/site.ts`: điền `email`, `phone` mẫu, thêm comment "SAMPLE"; `taxId` để trống (mã số thuế mẫu dễ trùng mã thật của doanh nghiệp khác).
- `components/sections/styles.ts`: tách `cardBase` (không padding) và `card = cardBase + " p-6"`.
- `components/sections/service-list.tsx`, `components/sections/feature-grid.tsx`: thẻ có ảnh dùng `cardBase` thay cho `${card} p-0`.
- Test: `tests/site.test.ts` cập nhật giá trị mẫu và danh sách mục mặc định (address, email, phone); `tests/sections.test.tsx` kiểm tra class thẻ có ảnh không chứa `p-6`, thẻ không ảnh vẫn có `p-6`.

## Phạm vi file

- `config/site.ts`
- `components/sections/styles.ts`
- `components/sections/service-list.tsx`
- `components/sections/feature-grid.tsx`
- `tests/**`

## Tasks

- [x] 1 Thêm email, số điện thoại mẫu vào `config/site.ts` và cập nhật test
  - Kiểm chứng: `pnpm test` đạt và `out/contact.html` có `mailto:contact@digitalcortexia.com`, `tel:+842432006688` sau `pnpm build`
  - _Requirements: 1.1, 1.3_
- [ ] 2 Sửa padding thẻ có ảnh trong `ServiceList`, `FeatureGrid` và thêm test
  - Kiểm chứng: `pnpm build && pnpm check && pnpm lint && pnpm test` đạt
  - _Requirements: 1.2, 1.3_
