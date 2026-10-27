# Spec nhanh: Favicon, ảnh không trùng giữa các trang, rà soát nội dung cho thống nhất

## Mục tiêu

`Logo/Favicon.png` chưa được dùng: favicon vẫn là SVG tạm và ảnh Open Graph vẫn vẽ biểu tượng cũ. Ảnh trên site đang bị trùng: 3 thẻ dịch vụ ở Home và 2 dự án AI dùng lại đúng ảnh của trang Services (chỉ nén lại). Nội dung có chỗ lệch nhau hoặc lặp lại giữa các trang (xem bảng rà soát ở Thiết kế). Cần dùng favicon thật, mỗi ảnh nội dung chỉ xuất hiện ở một chỗ, và nội dung các trang nói cùng một câu chuyện.

## 1. Tiêu chí chấp nhận

1. KHI trang bất kỳ được tải, favicon và apple-touch-icon PHẢI lấy từ `Logo/Favicon.png` (đã thu nhỏ), và ảnh Open Graph PHẢI dùng biểu tượng đó thay cho SVG tạm.
2. Mỗi ảnh nội dung (jpg/png trong `public/images/`, trừ logo và ảnh trang trí SVG) PHẢI chỉ được dùng ở đúng một vị trí trên toàn site, và không có hai file ảnh nào có nội dung byte giống nhau.
3. NẾU bản build có một ảnh nội dung xuất hiện ở hơn một vị trí, hoặc hai file ảnh trùng nội dung, THÌ `pnpm check` PHẢI báo lỗi nêu rõ file và trang.
4. Mọi ảnh nội dung PHẢI có `alt` khớp với nội dung ảnh theo nhãn của site cũ, mỗi file ≤ 300 KB.
5. Nội dung các trang PHẢI thống nhất: không còn mô tả dự án/sản phẩm không có trên site, không có hai case study cùng một dự án, cùng một chỉ số không mang hai giá trị khác nhau, không lặp cùng một khối (số liệu, lời chứng thực, link) trên nhiều trang hoặc hai lần trong một trang.
6. Mỗi trang PHẢI vẫn có đúng 1 h1; `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm test` PHẢI vẫn đạt.

## Thiết kế

Favicon và ảnh Open Graph:

- `sips` thu `Logo/Favicon.png` (1254×1254) thành `app/icon.png` (256px) và `app/apple-icon.png` (180px) theo file convention của Next.js; xoá `app/icon.svg`.
- `app/opengraph-image.tsx` đọc `app/icon.png` thành data URI và vẽ bằng `<img>` thay cho SVG.
- `scripts/check-build.mjs` đổi kiểm tra `icon.svg` thành `icon.png` và `apple-icon.png`; fixture `tests/fixtures/build-good` cập nhật theo.

Quy tắc không trùng ảnh trong `scripts/check-build.mjs`:

- Gom `src` của mọi `<img>` trong 5 trang, bỏ qua `.svg` và `/images/logo/`. Mỗi `src` chỉ được xuất hiện ở một trang và một lần trong trang đó.
- Băm SHA-256 mọi file jpg/png trong `out/images/`; hai file cùng hash thì báo lỗi.
- Thêm fixture lỗi vào test để kiểm tra cả hai trường hợp.

Phân bổ ảnh, mỗi ảnh một vị trí. Em không xem trực tiếp được nội dung ảnh, nên nhãn dựa trên `alt` hoặc tên file mà site cũ đặt; 14 ảnh có nhãn rõ được dùng đúng một lần:

| Vị trí | Ảnh gốc (site cũ, commit `300a79a`) | Alt mới |
|---|---|---|
| Home hero | `home-3/banner-global-tech.jpg` | Global technology network |
| Home: Custom Software Engineering | `portfolio/portfolio-erp-logistics.jpg` | Enterprise supply chain ERP system |
| Home: Offshore Dedicated Teams | `inner-image/contact-consultation.jpg` | Solutions consultation with a client team |
| Home: Telecom & Network Solutions | `portfolio/telecom-…-dashboard.jpg` (đổi tên khi lưu) | Carrier-grade telecom platform dashboard |
| Home: About Cortexia | `inner-image/about-why-choose.jpg` | Cortexia engineering team |
| Home AI: Document & Process Automation | `portfolio/portfolio-fintech-banking.jpg` | Digital banking application |
| Home AI: LLM Support Copilot | `portfolio/portfolio-cloud-devops.jpg` | Kubernetes cloud platform dashboard |
| Home AI: Predictive Maintenance | `portfolio/portfolio-fleet-telematics.jpg` | Commercial fleet IoT telematics dashboard |
| Services: 6 dịch vụ | 6 ảnh `services/service-*.jpg` hiện có | giữ alt hiện tại |

- Ảnh Home lưu lại vào `public/images/home/` với tên mới theo vị trí. Xoá các bản sao cũ (`service-*.jpg`, `ai-*.jpg` là bản nén lại của ảnh trang Services).
- 6 ảnh trang Services (750–970 KB) nén về ≤ 300 KB.
- Ba ảnh nền không có nhãn (`services-hero-bg`, `portfolio-hero-bg`, `contact-hero-bg`) không dùng, vì không biết ảnh chụp gì.

Rà soát nội dung:

| # | Vấn đề | Sửa |
|---|---|---|
| a | Services hero nhắc "autonomous AI agent systems", sót lại từ 2 sản phẩm cũ đã bỏ | Viết lại: custom software, AI-powered automation, telecom, offshore teams |
| b | Portfolio hero nói "verified case studies… telecom intelligence, autonomous AI agent gateways, mission-critical ERPs", không khớp 7 case đang hiển thị (và đây là nội dung mẫu) | Viết lại theo đúng các ngành: banking, commerce, healthcare, data & AI, cloud |
| c | `serviceCases` "AI Customer Service Assistant" trùng dự án với `aiCases` "LLM Support Copilot & Chatbot" | Đổi case ở Services thành nền tảng Cloud Contact Center & VoIP (đúng mảng telecom) |
| d | `aiCases` "Predictive Analytics" (dự báo nhu cầu, Manufacturing) trùng với Portfolio "Data Lakehouse & AI Insights" | Đổi thành bảo trì dự đoán IoT cho đội xe (Logistics), khớp ảnh fleet telematics, bỏ phần dự báo nhu cầu |
| e | Stats ghi uptime 99.95%, About ghi "99.99% Reliability" | Stats đổi thành 99.99% |
| f | Home có 2 link "Discover Our Story" (About block và Why Us) | Bỏ link ở Why Us |
| g | Khối Stats và Testimonials lặp ở cả Home và About | Chỉ giữ ở Home, bỏ khỏi About |
| h | Home có khối Automation & AI nhưng meta description và form liên hệ không nhắc tới | Thêm vào `home.meta.description` và thêm lựa chọn "AI & Process Automation" trong form |

- (a) và (b) là câu của site cũ đang được `tests/fixtures/legacy-text.json` kiểm tra, nên cập nhật fixture theo câu mới. Đây là thay đổi có chủ ý so với yêu cầu giữ nguyên văn của spec `nextjs-migration`.

## Phạm vi file

- `app/icon.svg`
- `app/icon.png`
- `app/apple-icon.png`
- `app/opengraph-image.tsx`
- `app/(default)/page.tsx`
- `app/(default)/about/page.tsx`
- `scripts/check-build.mjs`
- `components/sections/**`
- `content/**`
- `public/images/**`
- `tests/**`

## Tasks

- [x] 1 Tạo `app/icon.png`, `app/apple-icon.png` từ `Logo/Favicon.png`, xoá `app/icon.svg`, đổi ảnh Open Graph sang biểu tượng mới, cập nhật `check-build.mjs` và fixture build-good
  - Kiểm chứng: `pnpm build && pnpm check && pnpm test` đạt và `out/icon.png`, `out/apple-icon.png` tồn tại
  - _Requirements: 1.1, 1.6_
- [x] 2 Thêm quy tắc không trùng ảnh (cùng `src` trên nhiều vị trí, trùng hash) vào `check-build.mjs`; viết test với fixture lỗi cho cả hai trường hợp
  - Kiểm chứng: `pnpm test` đạt; `pnpm build && pnpm check` báo lỗi trùng ảnh trên code hiện tại
  - _Requirements: 1.2, 1.3_
- [x] 3 Phân bổ lại ảnh theo bảng: lấy ảnh từ commit `300a79a`, nén, lưu vào `public/images/home/`, xoá bản sao cũ, nén 6 ảnh Services, cập nhật đường dẫn và alt trong content
  - Kiểm chứng: `pnpm build && pnpm check && pnpm test` đạt (gồm quy tắc không trùng ảnh) và không file nào trong `public/images` > 300 KB
  - _Requirements: 1.2, 1.4_
- [ ] 4 Sửa nội dung theo bảng rà soát (a–h), cập nhật `legacy-text.json` và test liên quan
  - Kiểm chứng: `pnpm test` đạt
  - _Requirements: 1.5, 1.6_
- [ ] 5 Chạy build, check, lint, test toàn bộ và sửa mọi lỗi
  - Kiểm chứng: `pnpm build && pnpm check && pnpm lint && pnpm test` đạt
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_
