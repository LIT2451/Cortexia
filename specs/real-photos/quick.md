# Spec nhanh: Thay toàn bộ ảnh nội dung bằng ảnh chụp thật miễn phí (Unsplash)

## Mục tiêu

Một phần ảnh hiện tại không phải ảnh chụp: 5 ảnh "dashboard" của site cũ (`images/portfolio/*.jpg`) được chụp từ các file HTML trong `images/portfolio/templates/` (commit `ac96970`), một số ảnh khác được thêm dưới dạng "bespoke illustrations" (commit `065a037`), và ảnh Open Graph được vẽ bằng code (`app/opengraph-image.tsx`). Anh yêu cầu dùng ảnh thật tải về, không dùng hình làm bằng code. Thay cả 14 ảnh nội dung bằng ảnh chụp miễn phí từ Unsplash (Unsplash License: dùng thương mại miễn phí, không bắt buộc ghi nguồn), và ảnh Open Graph bằng một ảnh chụp tĩnh.

## 1. Tiêu chí chấp nhận

1. Mọi ảnh nội dung ở Home và Services PHẢI là ảnh chụp tải từ Unsplash (chỉ ảnh miễn phí, không Unsplash+), có `alt` mô tả đúng ảnh theo mô tả trên Unsplash.
2. Mỗi ảnh PHẢI có nguồn ghi trong `content/image-credits.ts` (đường dẫn file, link ảnh Unsplash, tác giả); test PHẢI báo lỗi NẾU ảnh nội dung nào thiếu nguồn hoặc file nguồn ghi không tồn tại.
3. Ảnh Open Graph PHẢI là file ảnh chụp tĩnh (1200×630), không còn vẽ bằng `ImageResponse`; `og:image` vẫn là URL tuyệt đối trên digitalcortexia.com.
4. Quy tắc cũ PHẢI giữ nguyên: mỗi ảnh dùng đúng một vị trí, không trùng nội dung, mỗi file ≤ 300 KB, mỗi trang đúng 1 h1; `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm test` đạt.

## Thiết kế

- Tải bản gốc bằng `curl -L "https://unsplash.com/photos/<id>/download?force=true"`, rồi `sips -Z 1600` (hero) / `-Z 1200` (thẻ), JPEG chất lượng ~65, ≤ 300 KB. Ghi đè đúng tên file hiện có, cập nhật `alt` trong `content/pages.ts`, `content/digital.ts`.
- Ảnh trang trí SVG (nền mờ, illustration của template), icon và logo giữ nguyên: đó là đồ hoạ giao diện, không phải ảnh nội dung.
- Ảnh Open Graph: xoá `app/opengraph-image.tsx`, thêm `app/opengraph-image.jpg` (cắt từ ảnh hero, 1200×630) và `app/opengraph-image.alt.txt`; `lib/metadata.ts` trỏ `images` sang file đó; cập nhật test property metadata.
- `content/image-credits.ts`: mảng `{ file, source, author }`; test đối chiếu với mọi `src` ảnh trong content.

Phân bổ ảnh (tất cả ảnh miễn phí trên Unsplash):

| Vị trí | File | Ảnh Unsplash | Tác giả |
|---|---|---|---|
| Home hero + Open Graph | `home/home-hero.jpg` | `modern-data-center-with-rows-of-white-server-cabinets-fImCPTZ026U` | Tony Marinescu |
| Home: Custom Software | `home/service-custom-software.jpg` | `people-coding-at-monitors-in-workspace-Im_cQ6hQo10` | Compagnons |
| Home: Offshore Teams | `home/service-offshore-teams.jpg` | `team-collaborating-around-a-computer-in-an-office-UikYLDQj9_I` | Vitaly Gariev |
| Home: Telecom | `home/service-telecom-platform.jpg` | `man-using-ip-phone-inside-room-WEDDt-u3q3o` | Berkeley Communications |
| Home: About | `home/about-engineering-team.jpg` | `people-sitting-down-near-table-with-assorted-laptop-computers-SYTO3xs06fU` | Marvin Meyer |
| AI: Document Automation | `home/ai-document-automation.jpg` | `stacks-of-paper-documents-and-file-folders-snNHKZ-mGfE` | Wesley Tingey |
| AI: Support Copilot | `home/ai-support-copilot.jpg` | `women-wearing-headsets-in-workspace-mHusyBu4bxM` | Charanjeet Dhiman |
| AI: Fleet Maintenance | `home/ai-fleet-maintenance.jpg` | `several-semi-trucks-parked-in-a-row-kuDtwayYiSA` | Sijmen van Hooff |
| Services: Software | `services/service-software-eng.jpg` | `laptop-screen-displaying-colorful-code-8qEB0fTe9Vw` | Mohammad Rahmani |
| Services: ODC | `services/service-odc-teams.jpg` | `people-collaborating-in-modern-office-workspace-UpsEF48wAgk` | Cherrydeck |
| Services: Telecom | `services/service-telecom-network.jpg` | `cable-network-M5tzZtFCOfs` | Taylor Vick |
| Services: Mobile | `services/service-mobile-app.jpg` | `smartphone-and-laptop-workspace-xsGxhtAsfSA` | Rahul Chakraborty |
| Services: Cloud & DevOps | `services/service-cloud-devops.jpg` | `server-racks-in-data-center-klWUhr-wPJ8` | imgix |
| Services: Security | `services/service-security-maintenance.jpg` | `red-padlock-on-black-computer-keyboard-mT7lXZPjk7U` | FlyD |

## Phạm vi file

- `public/images/home/**`
- `public/images/services/**`
- `content/**`
- `app/opengraph-image.tsx`
- `app/opengraph-image.jpg`
- `app/opengraph-image.alt.txt`
- `lib/metadata.ts`
- `tests/**`

## Tasks

- [x] 1 Tải 14 ảnh Unsplash theo bảng, nén ≤ 300 KB, ghi đè file hiện có, cập nhật alt; thêm `content/image-credits.ts` và test nguồn ảnh
  - Kiểm chứng: `pnpm test && pnpm build && pnpm check` đạt
  - _Requirements: 1.1, 1.2, 1.4_
- [ ] 2 Thay ảnh Open Graph vẽ bằng code bằng `app/opengraph-image.jpg` tĩnh, cập nhật `lib/metadata.ts` và test
  - Kiểm chứng: `pnpm build && pnpm check && pnpm test` đạt và `out/index.html` có `og:image` trỏ tới file jpg
  - _Requirements: 1.3, 1.4_
- [ ] 3 Chạy build, check, lint, test toàn bộ và sửa mọi lỗi
  - Kiểm chứng: `pnpm build && pnpm check && pnpm lint && pnpm test` đạt
  - _Requirements: 1.1, 1.2, 1.3, 1.4_
