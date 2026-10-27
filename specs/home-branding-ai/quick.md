# Spec nhanh: Logo mới, thêm hình ảnh và nội dung Automation/AI cho trang Home

## Mục tiêu

Header và footer đang dùng logo SVG tạm (chữ C trên nền tím). Cần thay bằng logo thật trong `Logo/Logo Cortexia xanh tím tối giản.png`. Trang Home hiện chỉ có chữ và thẻ, nhìn trống: cần thêm hình ảnh, thêm khối giới thiệu công ty và khối dự án Automation & AI.

## 1. Tiêu chí chấp nhận

1. KHI trang bất kỳ được tải, header và footer PHẢI hiển thị logo từ file PNG trong thư mục `Logo/` (đã thu nhỏ, đặt tại `public/images/logo/cortexia-logo.png`), có `alt` mô tả và vẫn là link về `/` với `aria-label` "Cortexia home".
2. KHI trang Home được tải, hero PHẢI có một ảnh minh hoạ lớn bên dưới phần chữ, và mỗi thẻ trong khối "Core Engineering & Telecom Services" PHẢI có ảnh.
3. KHI trang Home được tải, trang PHẢI có khối giới thiệu công ty (h2, đoạn văn, danh sách điểm mạnh, ảnh, link tới `/about`).
4. KHI trang Home được tải, trang PHẢI có khối "Automation & AI" gồm ít nhất 3 dự án mẫu (ngành, tên h3, mô tả, kết quả, công nghệ, ảnh), nội dung nằm trong `content/digital.ts` vốn đã ghi chú NỘI DUNG MẪU.
5. Mọi ảnh nội dung mới PHẢI có `alt` mô tả; ảnh trang trí PHẢI có `alt=""`. Ảnh mới PHẢI được nén (mỗi file ≤ 300 KB) và không mang tên cấm hay tên ảnh mẫu của Template.
6. Trang Home PHẢI vẫn có đúng 1 h1; `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm test` PHẢI vẫn đạt; các trang khác PHẢI giữ nguyên nội dung.

## Thiết kế

- Logo: dùng `sips` thu nhỏ PNG gốc về chiều cao 96px (hiển thị 32px, đủ cho màn hình 3x), lưu `public/images/logo/cortexia-logo.png`. `components/ui/logo.tsx` đổi SVG sang `next/image`. Nếu logo đã có chữ "Cortexia" thì bỏ `<span>` tên để không lặp chữ; nếu chỉ là biểu tượng thì giữ. Favicon `app/icon.svg` giữ nguyên, vì `pnpm check` đang kiểm tra file này.
- Ảnh: lấy từ lịch sử git của site cũ (commit `300a79a`) những ảnh không mang tên cấm (`banner-global-tech.jpg`, `about-why-choose.jpg`) cùng 6 ảnh dịch vụ đã có, nén bằng `sips` (rộng tối đa 1600px, JPEG chất lượng 70), lưu vào `public/images/home/`. Ảnh cho dự án AI tạm dùng lại ảnh hiện có phù hợp chủ đề; anh thay ảnh thật sau, chỉ cần đổi đường dẫn trong content.
- `components/sections/page-hero.tsx`: thêm prop tuỳ chọn `image {src, alt}` hiển thị dưới nút, bo góc, viền gradient. Trang khác không truyền nên giữ nguyên.
- `components/sections/feature-grid.tsx`: thêm trường tuỳ chọn `image` cho `FeatureItem`; có ảnh thì thẻ hiển thị ảnh 16:9 ở trên như `ServiceList`.
- Thêm `components/sections/image-split.tsx`: khối hai cột (ảnh một bên; eyebrow, h2, đoạn văn, danh sách điểm mạnh, link bên kia), dùng cho phần giới thiệu công ty.
- `CaseStudy` trong `content/digital.ts` thêm trường tuỳ chọn `image`; `case-studies.tsx` hiển thị ảnh nếu có. Thêm `aiCases` gồm 3 dự án mẫu: tự động hoá quy trình bằng RPA và AI, trợ lý AI/chatbot chăm sóc khách hàng dựa trên LLM, phân tích dự báo và tự động hoá vận hành bằng machine learning.
- `content/pages.ts`: thêm `home.about`, `home.automation` và ảnh cho `home.hero` và `home.services`. Nội dung bằng tiếng Anh như phần còn lại của site.
- `app/(default)/page.tsx` sắp lại thứ tự: Hero (ảnh), Stats, Services (ảnh), About (ImageSplit), Automation & AI (CaseStudies), Why Us, Tech Stack, Testimonials, CTA.

## Phạm vi file

- `components/ui/logo.tsx`
- `components/sections/**`
- `content/**`
- `app/(default)/page.tsx`
- `public/images/**`
- `tests/**`

## Tasks

- [x] 1 Thu nhỏ logo vào `public/images/logo/cortexia-logo.png`, đổi `components/ui/logo.tsx` sang `next/image`; viết test logo có ảnh với alt và link `/`
  - Kiểm chứng: `pnpm test` đạt
  - _Requirements: 1.1, 1.5_
- [ ] 2 Lấy và nén ảnh cho Home vào `public/images/home/`; thêm prop ảnh cho `PageHero`, `FeatureGrid`, `CaseStudies` và component `ImageSplit`; viết test render ảnh và alt
  - Kiểm chứng: `pnpm test` đạt và mọi file trong `public/images/home/` ≤ 300 KB
  - _Requirements: 1.2, 1.3, 1.5_
- [ ] 3 Thêm nội dung `home.about`, `home.automation`, `aiCases` (3 dự án mẫu) và ảnh trong content; ghép vào trang Home; viết test trang Home có 1 h1, khối giới thiệu và ≥ 3 dự án AI
  - Kiểm chứng: `pnpm test` đạt
  - _Requirements: 1.2, 1.3, 1.4, 1.6_
- [ ] 4 Chạy build, check, lint, test toàn bộ và sửa mọi lỗi
  - Kiểm chứng: `pnpm build && pnpm check && pnpm lint && pnpm test` đạt
  - _Requirements: 1.5, 1.6_
