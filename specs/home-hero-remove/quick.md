# Spec nhanh: Bỏ ảnh hero ở trang chủ

## Mục tiêu

Anh muốn bỏ ảnh lớn (data center, `home/home-hero.jpg`) nằm dưới tiêu đề và nút ở đầu trang chủ. Sau khi bỏ, hero chỉ còn tiêu đề, đoạn giới thiệu và 2 nút, tiếp theo là khối số liệu.

## 1. Tiêu chí chấp nhận

1. KHI mở trang chủ, phần hero PHẢI không còn ảnh nào; tiêu đề h1, đoạn văn và 2 nút giữ nguyên.
2. File `public/images/home/home-hero.jpg` PHẢI được xoá vì không còn dùng; nguồn ảnh của Open Graph (cắt từ ảnh này) PHẢI vẫn được ghi trong `content/image-credits.ts`.
3. Quy tắc cũ PHẢI giữ nguyên: ảnh Open Graph không đổi, mỗi trang đúng 1 h1, mọi ảnh nội dung có nguồn; `PageHero` vẫn hiển thị ảnh khi trang khác truyền prop `image`; `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm test` đạt.

## Thiết kế

- `content/pages.ts`: xoá `home.hero.image`.
- `app/(default)/page.tsx`: bỏ prop `image={hero.image}` của `PageHero`. Component `PageHero` không đổi (prop `image` vốn là tuỳ chọn).
- Xoá `public/images/home/home-hero.jpg`.
- `content/image-credits.ts`: đổi mục hero thành `file: "/opengraph-image.jpg"` (Tony Marinescu); test nguồn ảnh tìm file trong `public/` hoặc `app/`.
- Test: `tests/home-page.test.tsx` kiểm tra hero không có ảnh; bỏ `home.hero.image` khỏi `tests/sections.test.tsx` và `tests/image-credits.test.ts`; test `PageHero` trong `sections.test.tsx` dùng ảnh khác còn tồn tại.

## Phạm vi file

- `content/pages.ts`
- `content/image-credits.ts`
- `app/(default)/page.tsx`
- `public/images/home/home-hero.jpg`
- `tests/**`

## Tasks

- [x] 1 Bỏ ảnh hero khỏi content và trang chủ, xoá file ảnh, chuyển nguồn ảnh sang Open Graph, cập nhật test
  - Kiểm chứng: `pnpm test && pnpm build && pnpm check && pnpm lint` đạt
  - _Requirements: 1.1, 1.2, 1.3_
