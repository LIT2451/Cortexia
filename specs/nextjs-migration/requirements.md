# Tài liệu Requirements: Site Cortexia trên Next.js theo template Cruip

## Giới thiệu

Repo `cortexia` là bản sao của site DVTechnic (5 trang HTML tĩnh dựng trên Bootstrap/jQuery). Chủ site muốn dùng nó làm nền cho thương hiệu mới **Cortexia** tại tên miền `digitalcortexia.com`, đồng thời đổi sang phong cách của template `cruip/open-react-template` (nền tối, gradient, font Nacelle, hiệu ứng AOS) và dựng lại trên Next.js. Kết quả mong muốn: 5 trang mang thương hiệu Cortexia, giữ cấu trúc nội dung của site cũ, build ra file tĩnh để deploy GitHub Pages. Repo gốc `Landing-DVTechnic` không bị thay đổi.

## Thuật ngữ

- **Site cũ**: 5 file `index.html`, `about.html`, `services.html`, `portfolio.html`, `contact.html` cùng `css/`, `js/`, `images/`, `fonts/` ở gốc repo `cortexia`.
- **Template**: mã nguồn `cruip/open-react-template` (Next.js 15, React 19, Tailwind CSS 4, AOS), bản clone tại `../_template/open-react-template`.
- **Site mới**: ứng dụng Next.js dựng từ Template, chứa nội dung của Site cũ đã đổi sang thương hiệu Cortexia.
- **Bản build tĩnh**: thư mục kết quả của lệnh build với static export (`output: 'export'`), chỉ gồm HTML/CSS/JS/ảnh.
- **Thông tin thương hiệu**: tên "Cortexia", tên miền `digitalcortexia.com`, địa chỉ "Tầng 6, tòa C, 22 Thành Công, Ba Đình, Hà Nội", cùng logo, email, số điện thoại, mã số thuế (xem mục Câu hỏi mở).

## Phạm vi

- Trong phạm vi:
  - Dựng Site mới với 5 trang tương ứng 5 trang Site cũ, dùng hệ thống giao diện của Template.
  - Chuyển nội dung văn bản và dịch vụ của Site cũ sang Site mới.
  - Viết mới số liệu thống kê, case study và lời chứng thực theo ngành Digital cho Cortexia.
  - Thay toàn bộ thương hiệu DVTechnic bằng Cortexia: tên, logo, favicon, tên miền, địa chỉ, thông tin liên hệ, metadata SEO.
  - `sitemap.xml`, `robots.txt`, `CNAME` cho `digitalcortexia.com`.
  - Bản build tĩnh chạy được trên GitHub Pages.
  - Xoá mã của Site cũ (Bootstrap, jQuery, CSS/JS cũ, ảnh/logo DVTechnic) khỏi repo `cortexia` sau khi Site mới thay thế.
- Ngoài phạm vi:
  - Mọi thay đổi trong repo `Landing-DVTechnic`.
  - Các trang đăng nhập/đăng ký/quên mật khẩu và API route mẫu của Template.
  - Backend xử lý form liên hệ (gửi email, lưu dữ liệu).
  - Thiết kế logo Cortexia; viết lại các đoạn văn giới thiệu và dịch vụ ngoài việc đổi tên thương hiệu; đa ngôn ngữ.
  - Tạo repo GitHub mới, cấu hình DNS, thiết lập CI/GitHub Actions.

## Requirements

### Requirement 1: Đủ 5 trang với nội dung đầy đủ

**User Story:** Là khách truy cập, tôi muốn xem đủ các trang Trang chủ, Giới thiệu, Dịch vụ, Dự án, Liên hệ, để hiểu năng lực của Cortexia.

#### Tiêu chí chấp nhận

1. Site mới PHẢI có 5 trang: Trang chủ, About, Services, Portfolio, Contact.
2. Mỗi trang của Site mới PHẢI chứa mọi tiêu đề (h1–h3), đoạn văn và danh sách dịch vụ có trên trang tương ứng của Site cũ, giữ nguyên văn tiếng Anh, chỉ thay tên thương hiệu. Số liệu, case study và lời chứng thực theo Requirement 8.
3. Mỗi trang PHẢI hiển thị khối CTA cuối trang với tiêu đề giống Site cũ (ví dụ "Ready to Elevate Your Engineering Capabilities?" trên Trang chủ) và nút dẫn đến trang Contact.
4. Site mới PHẢI không còn bất kỳ nội dung mẫu nào của Template (chữ "Open PRO", lời chứng thực, ảnh mẫu, video mẫu).

### Requirement 2: Thương hiệu Cortexia

**User Story:** Là chủ thương hiệu Cortexia, tôi muốn mọi nơi trên site hiển thị đúng thông tin của Cortexia, để khách hàng không nhầm với DVTechnic.

#### Tiêu chí chấp nhận

1. KHI tìm chuỗi "dvtechnic" (không phân biệt hoa thường) trong mã nguồn và Bản build tĩnh của Site mới, kết quả PHẢI là 0 lần xuất hiện.
2. Header, footer, favicon và ảnh `og:image` PHẢI dùng logo Cortexia.
3. Footer và trang Contact PHẢI hiển thị địa chỉ "Tầng 6, tòa C, 22 Thành Công, Ba Đình, Hà Nội".
4. Thông tin thương hiệu (tên, tên miền, địa chỉ, email, điện thoại, mã số thuế) PHẢI được khai báo ở một nơi duy nhất trong mã nguồn để đổi một lần áp dụng cho mọi trang.
5. NẾU email, số điện thoại hoặc mã số thuế để trống trong khai báo thương hiệu, THÌ Site mới PHẢI ẩn hoàn toàn mục đó (cả nhãn và biểu tượng) ở footer, trang Contact và metadata, không hiển thị giá trị của DVTechnic hay giá trị giả.
6. KHI email hoặc số điện thoại được điền vào khai báo thương hiệu, footer và trang Contact PHẢI hiển thị chúng dưới dạng liên kết `mailto:` / `tel:` mà không cần sửa component.
7. Ở bản phát hành đầu tiên, email, số điện thoại và mã số thuế PHẢI để trống.

### Requirement 3: Phong cách giao diện theo Template

**User Story:** Là chủ site, tôi muốn site có giao diện hiện đại giống Template, để tạo ấn tượng chuyên nghiệp với khách hàng doanh nghiệp.

#### Tiêu chí chấp nhận

1. Site mới PHẢI dùng bảng màu nền tối, kiểu chữ (font Nacelle cho tiêu đề), gradient tiêu đề, kiểu nút và hiệu ứng xuất hiện khi cuộn (AOS) của Template.
2. Các khối nội dung của Site cũ PHẢI được dựng bằng các mẫu khối tương ứng của Template (hero, lưới tính năng, workflows, testimonials, CTA, header, footer).
3. KHI người dùng tải trang ở độ rộng màn hình từ 360px đến 1920px, Site mới PHẢI hiển thị không có thanh cuộn ngang và không có chữ bị cắt.
4. KHI độ rộng màn hình nhỏ hơn 768px, Header PHẢI thu gọn menu thành nút mở menu di động; bấm nút PHẢI hiện đủ 5 liên kết trang.
5. Header PHẢI hiển thị liên kết của trang đang xem với màu khác các liên kết còn lại và gắn `aria-current="page"`.

### Requirement 4: URL

**User Story:** Là khách truy cập, tôi muốn đường dẫn ngắn gọn và ổn định, để dễ chia sẻ và tìm thấy trên công cụ tìm kiếm.

#### Tiêu chí chấp nhận

1. Bản build tĩnh PHẢI phục vụ các URL `/`, `/about`, `/services`, `/portfolio`, `/contact` và mỗi URL trả về trang tương ứng trên GitHub Pages.
2. Mọi liên kết nội bộ (header, footer, nút CTA) PHẢI trỏ đến các URL ở tiêu chí 4.1.
3. NẾU người dùng truy cập một URL không tồn tại, THÌ Site mới PHẢI hiển thị trang 404 theo giao diện Template, có liên kết quay về Trang chủ.

### Requirement 5: SEO và metadata

**User Story:** Là chủ site, tôi muốn mỗi trang có thẻ SEO đúng thương hiệu Cortexia, để kết quả tìm kiếm và bản xem trước khi chia sẻ hiển thị chính xác.

#### Tiêu chí chấp nhận

1. Mỗi trang PHẢI có `<title>`, `meta description`, `og:type`, `og:url`, `og:title`, `og:description`, `og:image`; nội dung lấy từ trang tương ứng của Site cũ với tên thương hiệu đổi thành Cortexia.
2. Mọi `og:url`, `og:image` và URL canonical PHẢI là URL tuyệt đối bắt đầu bằng `https://digitalcortexia.com`.
3. Bản build tĩnh PHẢI chứa `sitemap.xml` liệt kê đúng 5 URL ở tiêu chí 4.1 trên tên miền `digitalcortexia.com` và `robots.txt` có dòng `Sitemap: https://digitalcortexia.com/sitemap.xml`.
4. Bản build tĩnh PHẢI chứa file `CNAME` với nội dung `digitalcortexia.com`.
5. Mỗi trang PHẢI có `lang="en"` trên thẻ `<html>` và đúng một thẻ `h1`.

### Requirement 6: Form liên hệ

**User Story:** Là khách hàng tiềm năng, tôi muốn gửi yêu cầu qua form liên hệ, để Cortexia liên lạc lại.

#### Tiêu chí chấp nhận

1. Trang Contact PHẢI có form với các trường giống Site cũ (Name, Phone Number, Business Email, loại dịch vụ, Message), mỗi trường có nhãn gắn với ô nhập.
2. KHI người dùng gửi form với đủ trường bắt buộc hợp lệ, trang Contact PHẢI hiển thị thông báo "Thank you for contacting Cortexia! Our team will reach out to you within 24 hours." ngay trên trang (không dùng hộp thoại `alert`) và xoá nội dung form.
3. NẾU người dùng gửi form thiếu trường bắt buộc (Name, Business Email, Message) hoặc email sai định dạng, THÌ trang Contact PHẢI không gửi, hiển thị lỗi cạnh trường sai và đưa focus vào trường sai đầu tiên.
4. Trang Contact PHẢI hiển thị các bước quy trình tiếp nhận yêu cầu như Site cũ.

### Requirement 7: Build và deploy tĩnh

**User Story:** Là người bảo trì, tôi muốn build site bằng một lệnh và deploy lên GitHub Pages, để không cần máy chủ Node.

#### Tiêu chí chấp nhận

1. KHI chạy lệnh build của dự án, quá trình PHẢI kết thúc thành công, không có lỗi TypeScript hay lint, và tạo Bản build tĩnh.
2. Bản build tĩnh PHẢI hoạt động khi phục vụ bằng một static file server bất kỳ ở gốc tên miền, không cần Node.js lúc chạy.
3. README PHẢI mô tả thương hiệu Cortexia, cách cài đặt, chạy dev, build và deploy Bản build tĩnh lên GitHub Pages.
4. NẾU Bản build tĩnh tham chiếu một ảnh hoặc font không tồn tại, THÌ việc kiểm tra liên kết sau build PHẢI báo lỗi (không có tài nguyên 404 trên 5 trang).

### Requirement 8: Nội dung ngành Digital

**User Story:** Là chủ thương hiệu Cortexia, tôi muốn số liệu, case study và lời chứng thực nói về lĩnh vực Digital, để site phản ánh đúng định vị của Cortexia thay vì của DVTechnic.

#### Tiêu chí chấp nhận

1. Khối số liệu thống kê trên Trang chủ và About PHẢI gồm 4 chỉ số thuộc lĩnh vực Digital (ví dụ số dự án chuyển đổi số, số nền tảng digital đã triển khai, số người dùng cuối phục vụ, tỷ lệ uptime), thay cho 10+, 150+, 50+, 99.9% của DVTechnic.
2. Trang Portfolio và Services PHẢI thay toàn bộ case study của DVTechnic (OpenClaw AI Gateway, Hermes AI Agent Platform, Telecom CDR...) bằng cùng số lượng case study thuộc lĩnh vực Digital (ví dụ chuyển đổi số, thương mại điện tử, nền tảng dữ liệu và AI, digital marketing), mỗi case study có tên, ngành khách hàng, mô tả, công nghệ và kết quả định lượng.
3. Lời chứng thực PHẢI thay bằng nội dung lĩnh vực Digital, chỉ ghi chức danh và loại hình doanh nghiệp, PHẢI không ghi tên người hay tên công ty có thật.
4. Toàn bộ số liệu, case study và lời chứng thực PHẢI nằm trong một file nội dung riêng, có ghi chú đầu file rằng đây là nội dung mẫu cần chủ site xác nhận trước khi phát hành.
5. NẾU tìm các tên OpenClaw, Hermes, CDR trong mã nguồn Site mới, THÌ kết quả PHẢI là 0 lần xuất hiện.

## Yêu cầu phi chức năng

1. Mỗi trang của Bản build tĩnh PHẢI đạt điểm Lighthouse (mobile) Performance ≥ 85, Accessibility ≥ 90, SEO ≥ 95.
2. Ảnh nội dung PHẢI có thuộc tính `alt`; ảnh trang trí PHẢI có `alt=""`.
3. Mọi phần tử tương tác (liên kết, nút, ô nhập) PHẢI truy cập được bằng bàn phím và có viền focus nhìn thấy được.
4. KHI người dùng bật `prefers-reduced-motion`, Site mới PHẢI tắt hiệu ứng AOS.
5. Các dependency PHẢI được ghim phiên bản chính xác trong `package.json`.

## Câu hỏi mở và giả định

- [Giả định] Nội dung giữ tiếng Anh như Site cũ (trừ địa chỉ tiếng Việt anh cung cấp); chỉ đổi tên thương hiệu, không viết lại nội dung.
- [Giả định] Dùng URL ngắn `/about`, `/services`... vì tên miền mới chưa có thứ hạng tìm kiếm cũ cần giữ.
- [Giả định] Chưa có logo Cortexia thì dùng logo chữ "Cortexia" (wordmark) theo font của Template, và tạm dùng favicon tạo từ chữ "C". Anh gửi logo thì em thay.
- [Giả định] Form liên hệ chỉ hiện thông báo, không gửi dữ liệu đi đâu, như Site cũ.
- [Giả định] Giữ pnpm như Template.
- [Giả định] Email, số điện thoại, mã số thuế chưa có nên để trống và ẩn (tiêu chí 2.5, 2.7).
- [Giả định] Số liệu, case study, lời chứng thực do em viết mới theo ngành Digital là nội dung mẫu; chủ site chịu trách nhiệm xác nhận tính đúng trước khi công bố, vì số liệu và lời chứng thực không có thật có thể bị coi là quảng cáo sai sự thật.
- [Giả định] Danh mục dịch vụ giữ như Site cũ (software, ODC, telecom, mobile, cloud, maintenance), chỉ đổi tên thương hiệu.
