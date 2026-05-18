# THIẾT KẾ GIAO DIỆN (UI DESIGN)

## MỤC LỤC

1. Nguyên tắc thiết kế
2. Sitemap & Navigation Flow
3. Danh sách màn hình chính
4. Thiết kế chi tiết từng màn hình
   - 4.1. Màn hình chung (Xác thực)
   - 4.2. Màn hình USER
   - 4.3. Màn hình ORGANIZER
   - 4.4. Màn hình STAFF
   - 4.5. Màn hình ADMIN

---

## 1. NGUYÊN TẮC THIẾT KẾ

### 1.1. Nguyên tắc chung

| STT | Nguyên tắc | Mô tả |
|-----|-----------|-------|
| 1 | Responsive Design | Giao diện hiển thị tốt trên mọi viewport từ 375px (mobile) đến 1920px (desktop FullHD). Thiết kế theo 3 breakpoint chính: 375px, 768px, 1280px. |
| 2 | Mobile-First | Ưu tiên thiết kế cho mobile trước, sau đó mở rộng cho tablet và desktop. |
| 3 | Hiệu năng | First Contentful Paint (FCP) ≤ 3 giây trên kết nối 4G mô phỏng. Lazy loading cho hình ảnh và component nặng. |
| 4 | Ngôn ngữ & Định dạng | Tiếng Việt mặc định. Ngày: dd/MM/yyyy. Tiền: #.### VNĐ. Font hỗ trợ Unicode UTF-8. |
| 5 | Phản hồi trạng thái | Mọi thao tác > 1 giây phải hiển thị loading indicator. Kết quả (thành công/thất bại) hiển thị trong ≤ 3 giây. |
| 6 | Thông báo lỗi | 100% error message bằng tiếng Việt, mô tả cụ thể nguyên nhân và hướng giải quyết. Không hiển thị stack trace. Độ dài ≤ 120 ký tự. |
| 7 | Nhất quán | Sử dụng Design System thống nhất: màu sắc, typography, spacing, component library (shadcn/ui + Tailwind CSS). |
| 8 | Trợ năng (Accessibility) | Tuân thủ WCAG 2.1 Level AA. Contrast ratio tối thiểu 4.5:1 cho text. Hỗ trợ keyboard navigation. |

### 1.2. Hệ thống màu sắc (Color Palette)

| Tên | Mã màu | Sử dụng |
|-----|--------|---------|
| Primary | #2563EB (Blue-600) | Nút CTA chính, liên kết, trạng thái active |
| Secondary | #7C3AED (Violet-600) | Accent, badge VIP, highlight |
| Success | #16A34A (Green-600) | Thông báo thành công, trạng thái Available |
| Warning | #CA8A04 (Yellow-600) | Cảnh báo, trạng thái Locked |
| Danger | #DC2626 (Red-600) | Lỗi, trạng thái Sold, hành động xóa |
| Neutral | #1F2937 (Gray-800) | Text chính |
| Background | #F9FAFB (Gray-50) | Nền trang |
| Surface | #FFFFFF | Nền card, modal |

### 1.3. Typography

| Cấp độ | Font | Size | Weight | Line-height |
|--------|------|------|--------|-------------|
| H1 | Inter | 32px / 2rem | Bold (700) | 1.25 |
| H2 | Inter | 24px / 1.5rem | Semibold (600) | 1.3 |
| H3 | Inter | 20px / 1.25rem | Semibold (600) | 1.4 |
| Body | Inter | 16px / 1rem | Regular (400) | 1.5 |
| Small | Inter | 14px / 0.875rem | Regular (400) | 1.5 |
| Caption | Inter | 12px / 0.75rem | Medium (500) | 1.5 |

### 1.4. Spacing System

Sử dụng hệ thống spacing 4px base: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px.

### 1.5. Shared UI Components

| STT | Component | Mô tả |
|-----|-----------|-------|
| 1 | Button | Primary, Secondary, Outline, Ghost, Danger. Có trạng thái: default, hover, active, disabled, loading. |
| 2 | Input | Text, Password, Email, Number. Có label, placeholder, helper text, error message. |
| 3 | Modal / Dialog | Confirmation, Form, Alert. Có overlay, close button, action buttons. |
| 4 | Table | Sortable, filterable, paginated. Responsive (collapse thành card trên mobile). |
| 5 | Card | Event card, Ticket card, Product card. Có thumbnail, title, metadata, action. |
| 6 | Toast / Notification | Success, Error, Warning, Info. Auto-dismiss sau 5 giây. |
| 7 | DatePicker | Hỗ trợ định dạng dd/MM/yyyy. Range picker cho filter. |
| 8 | SeatMap | Canvas-based (Konva.js). Zoom, pan, tap-to-select. Color-coded theo trạng thái. |
| 9 | QRCode | Dynamic QR với countdown 30 giây. Auto-refresh. |
| 10 | Tabs / Navigation | Bottom tabs (mobile), Sidebar (desktop). Active state indicator. |

---

## 2. SITEMAP & NAVIGATION FLOW

### 2.1. Cấu trúc tổng thể

```
Hệ thống Web SaaS
├── [PUBLIC] Trang công khai (không cần đăng nhập)
│   ├── Trang chủ / Khám phá sự kiện
│   ├── Chi tiết sự kiện
│   ├── Tìm kiếm & Lọc sự kiện
│   ├── Đăng ký / Đăng nhập
│   └── AI Chatbot (phạm vi công khai)
│
├── [USER] Portal Người dùng
│   ├── Trang chủ (có gợi ý cá nhân hóa)
│   ├── Chi tiết sự kiện
│   ├── Sơ đồ ghế & Chọn ghế
│   ├── Giỏ hàng / Checkout
│   ├── Thanh toán (redirect Payment Gateway)
│   ├── Ví vé điện tử
│   │   ├── Danh sách vé
│   │   └── Chi tiết vé + QR động
│   ├── Resale Market
│   │   ├── Duyệt vé resale
│   │   └── Niêm yết vé bán lại
│   ├── Merchandise
│   │   ├── Danh sách sản phẩm
│   │   └── Chi tiết sản phẩm
│   ├── Thông báo
│   ├── Hồ sơ cá nhân
│   └── AI Chatbot
│
├── [ORGANIZER] Portal Ban tổ chức
│   ├── Dashboard (doanh thu, vé bán, check-in)
│   ├── Quản lý sự kiện
│   │   ├── Danh sách sự kiện
│   │   ├── Tạo / Chỉnh sửa sự kiện
│   │   ├── Thiết kế sơ đồ ghế (Drag & Drop / Import JSON)
│   │   └── Cấu hình hạng vé
│   ├── Quản lý Merchandise
│   │   ├── Danh sách sản phẩm
│   │   ├── Tạo / Chỉnh sửa sản phẩm
│   │   └── Quản lý tồn kho
│   ├── Báo cáo & Thống kê
│   │   ├── Doanh thu
│   │   ├── Check-in
│   │   └── Export (Excel/CSV/PDF)
│   ├── Hóa đơn & Thuế
│   └── Hồ sơ tổ chức
│
├── [STAFF] Staff App (PWA)
│   ├── Chọn sự kiện & Cổng
│   ├── Quét QR / Check-in
│   ├── Kết quả check-in (Thành công / Thất bại)
│   ├── Chế độ Offline
│   │   ├── Tải dữ liệu offline
│   │   └── Đồng bộ khi online
│   └── Nhật ký check-in
│
└── [ADMIN] Portal Quản trị
    ├── Dashboard (tổng quan hệ thống)
    ├── Phê duyệt Organizer
    │   ├── Danh sách chờ duyệt
    │   └── Chi tiết hồ sơ
    ├── Phê duyệt Sự kiện
    │   ├── Danh sách chờ duyệt
    │   └── Chi tiết sự kiện
    ├── Quản lý User
    │   ├── Danh sách user
    │   └── Chi tiết / Khóa tài khoản
    ├── Quản lý Refund
    │   ├── Danh sách yêu cầu
    │   └── Xử lý refund (toàn phần/một phần/batch)
    ├── Đối soát & Tài chính
    │   ├── Đối soát Payment Gateway
    │   ├── Payout Organizer
    │   └── Hóa đơn điện tử
    ├── Báo cáo
    │   └── Export (Excel/CSV/PDF)
    ├── CMS (Banner, FAQ)
    └── Cấu hình hệ thống
        ├── Danh mục thuế suất
        ├── Tích hợp Payment Gateway
        └── Tích hợp E-Invoice (MISA)
```

### 2.2. Luồng điều hướng chính (Navigation Flow)

**Luồng đặt vé (USER):**
```
Trang chủ → Tìm kiếm/Khám phá → Chi tiết sự kiện → Sơ đồ ghế (chọn ghế)
→ Giỏ hàng (thêm merchandise nếu muốn) → Checkout → Thanh toán
→ Xác nhận đơn hàng → Ví vé (xem vé + QR động)
```

**Luồng check-in (STAFF):**
```
Đăng nhập → Chọn sự kiện & Cổng → Quét QR → Kết quả (✓/✗) → Quét tiếp
```

**Luồng tạo sự kiện (ORGANIZER):**
```
Dashboard → Quản lý sự kiện → Tạo mới → Nhập thông tin → Thiết kế sơ đồ ghế
→ Cấu hình hạng vé → Lưu nháp / Gửi phê duyệt
```

**Luồng phê duyệt (ADMIN):**
```
Dashboard → Danh sách chờ duyệt → Chi tiết → Phê duyệt / Từ chối / Yêu cầu bổ sung
```



---

## 3. DANH SÁCH MÀN HÌNH CHÍNH

| STT | Mã màn hình | Tên màn hình | Actor | Mức ưu tiên |
|-----|-------------|-------------|-------|-------------|
| 1 | SCR-AUTH-01 | Đăng ký / Đăng nhập | Tất cả | Cao |
| 2 | SCR-AUTH-02 | Xác thực OTP | Tất cả | Cao |
| 3 | SCR-AUTH-03 | Quên mật khẩu | Tất cả | Trung bình |
| 4 | SCR-USER-01 | Trang chủ / Khám phá sự kiện | USER, Khách | Cao |
| 5 | SCR-USER-02 | Chi tiết sự kiện | USER, Khách | Cao |
| 6 | SCR-USER-03 | Sơ đồ ghế & Chọn ghế | USER | Rất cao |
| 7 | SCR-USER-04 | Giỏ hàng / Checkout | USER | Rất cao |
| 8 | SCR-USER-05 | Thanh toán | USER | Rất cao |
| 9 | SCR-USER-06 | Xác nhận đơn hàng | USER | Cao |
| 10 | SCR-USER-07 | Ví vé điện tử | USER | Rất cao |
| 11 | SCR-USER-08 | Chi tiết vé + QR động | USER | Rất cao |
| 12 | SCR-USER-09 | Resale Market | USER | Cao |
| 13 | SCR-USER-10 | Merchandise | USER | Cao |
| 14 | SCR-USER-11 | AI Chatbot | USER, Khách | Cao |
| 15 | SCR-USER-12 | Hồ sơ cá nhân | USER | Trung bình |
| 16 | SCR-ORG-01 | Dashboard Organizer | ORGANIZER | Cao |
| 17 | SCR-ORG-02 | Quản lý sự kiện (danh sách) | ORGANIZER | Cao |
| 18 | SCR-ORG-03 | Tạo / Chỉnh sửa sự kiện | ORGANIZER | Cao |
| 19 | SCR-ORG-04 | Thiết kế sơ đồ ghế | ORGANIZER | Cao |
| 20 | SCR-ORG-05 | Cấu hình hạng vé | ORGANIZER | Cao |
| 21 | SCR-ORG-06 | Quản lý Merchandise | ORGANIZER | Cao |
| 22 | SCR-ORG-07 | Báo cáo & Thống kê | ORGANIZER | Cao |
| 23 | SCR-STAFF-01 | Chọn sự kiện & Cổng | STAFF | Rất cao |
| 24 | SCR-STAFF-02 | Quét QR / Check-in | STAFF | Rất cao |
| 25 | SCR-STAFF-03 | Kết quả Check-in | STAFF | Rất cao |
| 26 | SCR-STAFF-04 | Chế độ Offline | STAFF | Cao |
| 27 | SCR-ADMIN-01 | Dashboard Admin | ADMIN | Cao |
| 28 | SCR-ADMIN-02 | Phê duyệt Organizer | ADMIN | Cao |
| 29 | SCR-ADMIN-03 | Phê duyệt Sự kiện | ADMIN | Cao |
| 30 | SCR-ADMIN-04 | Quản lý User | ADMIN | Cao |
| 31 | SCR-ADMIN-05 | Quản lý Refund | ADMIN | Cao |
| 32 | SCR-ADMIN-06 | Đối soát & Hóa đơn | ADMIN | Cao |

---

## 4. THIẾT KẾ CHI TIẾT TỪNG MÀN HÌNH

### 4.1. Màn hình chung (Xác thực)

#### SCR-AUTH-01: Đăng ký / Đăng nhập

| Thuộc tính | Nội dung |
|-----------|---------|
| Mục đích | Cho phép người dùng đăng ký tài khoản mới hoặc đăng nhập vào hệ thống |
| Actor | Tất cả (USER, ORGANIZER, STAFF, ADMIN) |
| Điều kiện vào | Người dùng truy cập hệ thống chưa có phiên đăng nhập |
| Điều kiện ra | Chuyển sang màn hình OTP (đăng ký) hoặc vào trang chủ theo role (đăng nhập) |

**Wireframe mô tả:**

```
┌─────────────────────────────────────────────────┐
│  [Logo]          GreenPlate                     │
├─────────────────────────────────────────────────┤
│                                                 │
│         ┌─────────────────────────┐             │
│         │                         │             │
│         │   [Tab: Đăng nhập]      │             │
│         │   [Tab: Đăng ký]        │             │
│         │                         │             │
│         │   ┌───────────────────┐ │             │
│         │   │ Email             │ │             │
│         │   └───────────────────┘ │             │
│         │   ┌───────────────────┐ │             │
│         │   │ Mật khẩu     [👁] │ │             │
│         │   └───────────────────┘ │             │
│         │                         │             │
│         │   [  Đăng nhập  ]       │  ← Primary  │
│         │                         │             │
│         │   ─── hoặc ───         │             │
│         │                         │             │
│         │   [G] Đăng nhập Google  │  ← Outline  │
│         │                         │             │
│         │   Quên mật khẩu?        │  ← Link     │
│         │                         │             │
│         └─────────────────────────┘             │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Thành phần giao diện:**
- Logo + tên hệ thống ở header
- Tab chuyển đổi giữa Đăng nhập / Đăng ký
- Form đăng nhập: Email, Mật khẩu (có toggle hiển thị), nút Đăng nhập
- Form đăng ký: Email, Mật khẩu, Xác nhận mật khẩu, Họ tên, nút Đăng ký
- Nút đăng nhập Google OAuth
- Link "Quên mật khẩu?"
- reCAPTCHA v3 (ẩn)

**Tương tác:**
- Validate realtime khi blur khỏi input
- Hiển thị loading spinner khi submit
- Thông báo lỗi inline dưới mỗi field
- Sau 5 lần đăng nhập sai → hiển thị thông báo khóa tạm thời 15 phút

---

### 4.2. Màn hình USER

#### SCR-USER-01: Trang chủ / Khám phá sự kiện

| Thuộc tính | Nội dung |
|-----------|---------|
| Mục đích | Hiển thị sự kiện nổi bật, gợi ý cá nhân hóa, tìm kiếm & lọc |
| Actor | USER, Khách vãng lai |
| Điều kiện vào | Truy cập trang chủ hệ thống |
| Điều kiện ra | Chuyển sang Chi tiết sự kiện khi click vào event card |

**Wireframe mô tả:**

```
┌─────────────────────────────────────────────────┐
│  [Logo]   [🔍 Tìm kiếm...]   [🔔] [Avatar]    │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─────────────────────────────────────────┐    │
│  │         BANNER SỰ KIỆN NỔI BẬT         │    │
│  │     (Carousel auto-slide 5 giây)        │    │
│  │                                         │    │
│  │  Tên sự kiện lớn                        │    │
│  │  📅 dd/MM/yyyy  📍 Địa điểm            │    │
│  │  [  Mua vé ngay  ]                      │    │
│  └─────────────────────────────────────────┘    │
│                                                 │
│  ── Dành cho bạn (AI Recommendation) ──────     │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐   │
│  │ [Ảnh]  │ │ [Ảnh]  │ │ [Ảnh]  │ │ [Ảnh]  │   │
│  │ Tên SK │ │ Tên SK │ │ Tên SK │ │ Tên SK │   │
│  │ 📅 Ngày│ │ 📅 Ngày│ │ 📅 Ngày│ │ 📅 Ngày│   │
│  │ 💰 Giá │ │ 💰 Giá │ │ 💰 Giá │ │ 💰 Giá │   │
│  └────────┘ └────────┘ └────────┘ └────────┘   │
│                          ← Scroll ngang →       │
│                                                 │
│  ── Sự kiện sắp diễn ra ──────────────────     │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐   │
│  │ [Ảnh]  │ │ [Ảnh]  │ │ [Ảnh]  │ │ [Ảnh]  │   │
│  │ Tên SK │ │ Tên SK │ │ Tên SK │ │ Tên SK │   │
│  │ 📅 Ngày│ │ 📅 Ngày│ │ 📅 Ngày│ │ 📅 Ngày│   │
│  │ 💰 Giá │ │ 💰 Giá │ │ 💰 Giá │ │ 💰 Giá │   │
│  └────────┘ └────────┘ └────────┘ └────────┘   │
│                                                 │
│  ── Bộ lọc ───────────────────────────────     │
│  [Thể loại ▼] [Địa điểm ▼] [Thời gian ▼]     │
│  [Khoảng giá ▼]                                │
│                                                 │
├─────────────────────────────────────────────────┤
│  [🏠 Trang chủ] [🎫 Vé] [🛒 Giỏ] [👤 Tôi]    │
└─────────────────────────────────────────────────┘
```

**Thành phần giao diện:**
- Header: Logo, thanh tìm kiếm, icon thông báo, avatar user
- Banner carousel: Sự kiện nổi bật, auto-slide, có CTA "Mua vé ngay"
- Section "Dành cho bạn": Gợi ý cá nhân hóa từ AI (scroll ngang)
- Section "Sự kiện sắp diễn ra": Grid/List event cards
- Bộ lọc: Thể loại, Địa điểm, Thời gian, Khoảng giá
- Bottom navigation (mobile): Trang chủ, Vé, Giỏ hàng, Tài khoản
- Floating chatbot button (góc phải dưới)

**Tương tác:**
- Pull-to-refresh (mobile)
- Infinite scroll hoặc pagination cho danh sách sự kiện
- Tap vào event card → chuyển sang SCR-USER-02
- Tap vào thanh tìm kiếm → mở trang tìm kiếm full-screen (mobile)



#### SCR-USER-02: Chi tiết sự kiện

| Thuộc tính | Nội dung |
|-----------|---------|
| Mục đích | Hiển thị đầy đủ thông tin sự kiện, hạng vé, merchandise liên quan |
| Actor | USER, Khách vãng lai |
| Điều kiện vào | Click vào event card từ trang chủ hoặc kết quả tìm kiếm |
| Điều kiện ra | Chuyển sang Sơ đồ ghế khi nhấn "Mua vé" |

**Wireframe mô tả:**

```
┌─────────────────────────────────────────────────┐
│  [←]  Chi tiết sự kiện            [♡] [↗]      │
├─────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────┐    │
│  │           BANNER SỰ KIỆN                │    │
│  │         (Ảnh bìa full-width)            │    │
│  └─────────────────────────────────────────┘    │
│                                                 │
│  TÊN SỰ KIỆN LỚN                               │
│  ─────────────────────────────────────────      │
│  📅 dd/MM/yyyy - dd/MM/yyyy                     │
│  🕐 HH:mm - HH:mm                              │
│  📍 Tên địa điểm, Thành phố                    │
│  🏷️ Thể loại: Ca nhạc                          │
│  👤 Ban tổ chức: Tên Organizer                  │
│                                                 │
│  ── Mô tả ─────────────────────────────────    │
│  Lorem ipsum dolor sit amet...                  │
│  [Xem thêm]                                    │
│                                                 │
│  ── Hạng vé ───────────────────────────────    │
│  ┌─────────────────────────────────────────┐    │
│  │ VIP        │ 2.000.000 VNĐ │ Còn 50/100│    │
│  │ Standard   │ 1.000.000 VNĐ │ Còn 200   │    │
│  │ Early Bird │   800.000 VNĐ │ Hết        │    │
│  └─────────────────────────────────────────┘    │
│                                                 │
│  ── Merchandise ───────────────────────────    │
│  ┌────────┐ ┌────────┐ ┌────────┐              │
│  │ [Ảnh]  │ │ [Ảnh]  │ │ [Ảnh]  │              │
│  │ Áo thun│ │ Light  │ │ Poster │              │
│  │ 350.000│ │ 500.000│ │ 150.000│              │
│  └────────┘ └────────┘ └────────┘              │
│                                                 │
│  ── Quy định sự kiện ─────────────────────    │
│  • Không mang đồ ăn từ bên ngoài               │
│  • Trẻ em dưới 12 tuổi cần người lớn đi kèm   │
│                                                 │
├─────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────┐    │
│  │         [   MUA VÉ NGAY   ]             │    │ ← Sticky bottom
│  └─────────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
```

**Thành phần giao diện:**
- Header: Nút back, tiêu đề, nút yêu thích, nút chia sẻ
- Banner ảnh sự kiện (full-width, có thể swipe nếu nhiều ảnh)
- Thông tin cơ bản: Tên, ngày giờ, địa điểm, thể loại, ban tổ chức
- Mô tả sự kiện (có "Xem thêm" nếu dài)
- Bảng hạng vé: Tên, giá, số lượng còn lại
- Merchandise liên quan (scroll ngang)
- Quy định sự kiện
- Nút CTA "Mua vé ngay" (sticky bottom bar)

---

#### SCR-USER-03: Sơ đồ ghế & Chọn ghế

| Thuộc tính | Nội dung |
|-----------|---------|
| Mục đích | Hiển thị seat map realtime, cho phép chọn ghế và giữ ghế tạm thời |
| Actor | USER |
| Điều kiện vào | Nhấn "Mua vé" từ Chi tiết sự kiện |
| Điều kiện ra | Chuyển sang Giỏ hàng khi nhấn "Tiếp tục" |

**Wireframe mô tả:**

```
┌─────────────────────────────────────────────────┐
│  [←]  Chọn ghế              ⏱️ 14:59 còn lại   │
├─────────────────────────────────────────────────┤
│                                                 │
│  ── Chú thích ─────────────────────────────    │
│  🟢 Trống  🟡 Đang giữ  🔴 Đã bán  ⬜ Ghế bạn │
│                                                 │
│  ┌─────────────────────────────────────────┐    │
│  │                                         │    │
│  │            ═══ SÂN KHẤU ═══            │    │
│  │                                         │    │
│  │     ┌─── VIP Zone ───┐                 │    │
│  │     │ 🟢🟢🔴🟢⬜🟢🟢🔴│                 │    │
│  │     │ 🟢🔴🟢🟢🟢🟡🟢🟢│                 │    │
│  │     └─────────────────┘                 │    │
│  │                                         │    │
│  │  ┌──── Standard Zone ────┐             │    │
│  │  │ 🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢│             │    │
│  │  │ 🟢🟢🟢🔴🔴🟢🟢🟢🟢🟢│             │    │
│  │  │ 🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢│             │    │
│  │  └────────────────────────┘             │    │
│  │                                         │    │
│  │  [+] Zoom in   [-] Zoom out            │    │
│  └─────────────────────────────────────────┘    │
│                                                 │
│  ── Ghế đã chọn ──────────────────────────    │
│  • VIP - Hàng A - Ghế 5    1.500.000 VNĐ      │
│  • VIP - Hàng A - Ghế 6    1.500.000 VNĐ      │
│                                                 │
│  Tổng: 3.000.000 VNĐ                           │
│                                                 │
├─────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────┐    │
│  │         [   TIẾP TỤC   ]               │    │
│  └─────────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
```

**Thành phần giao diện:**
- Header: Nút back, tiêu đề, bộ đếm thời gian giữ ghế (countdown từ 15 phút)
- Chú thích màu sắc trạng thái ghế
- Seat map canvas (Konva.js): Zoom, pan, tap-to-select
- Danh sách ghế đã chọn + tổng tiền
- Nút "Tiếp tục" (sticky bottom)

**Tương tác:**
- Realtime update trạng thái ghế qua WebSocket
- Tap ghế trống → lock ghế (Redis SETNX, TTL 15 phút) → ghế chuyển màu trắng
- Countdown hết → tự động nhả ghế, hiển thị thông báo "Phiên giữ ghế đã hết"
- Pinch-to-zoom trên mobile

---

#### SCR-USER-04: Giỏ hàng / Checkout

| Thuộc tính | Nội dung |
|-----------|---------|
| Mục đích | Tổng hợp vé + merchandise, áp dụng voucher, xác nhận đơn hàng |
| Actor | USER |
| Điều kiện vào | Nhấn "Tiếp tục" từ Sơ đồ ghế |
| Điều kiện ra | Chuyển sang Thanh toán khi nhấn "Thanh toán" |

**Wireframe mô tả:**

```
┌─────────────────────────────────────────────────┐
│  [←]  Giỏ hàng                 ⏱️ 12:30        │
├─────────────────────────────────────────────────┤
│                                                 │
│  ── Vé ────────────────────────────────────    │
│  ┌─────────────────────────────────────────┐    │
│  │ 🎫 VIP - Hàng A - Ghế 5               │    │
│  │    Sự kiện ABC | dd/MM/yyyy             │    │
│  │    1.500.000 VNĐ              [🗑️]     │    │
│  ├─────────────────────────────────────────┤    │
│  │ 🎫 VIP - Hàng A - Ghế 6               │    │
│  │    Sự kiện ABC | dd/MM/yyyy             │    │
│  │    1.500.000 VNĐ              [🗑️]     │    │
│  └─────────────────────────────────────────┘    │
│                                                 │
│  ── Gợi ý mua thêm (Upsell) ──────────────    │
│  ┌────────┐ ┌────────┐ ┌────────┐              │
│  │ [Ảnh]  │ │ [Ảnh]  │ │ [Ảnh]  │              │
│  │ Áo thun│ │ Combo  │ │ Light  │              │
│  │ 350.000│ │ 250.000│ │ 500.000│              │
│  │ [Thêm] │ │ [Thêm] │ │ [Thêm] │              │
│  └────────┘ └────────┘ └────────┘              │
│                                                 │
│  ── Mã giảm giá ──────────────────────────    │
│  ┌──────────────────────┐ ┌──────────┐         │
│  │ Nhập mã voucher      │ │ Áp dụng │         │
│  └──────────────────────┘ └──────────┘         │
│                                                 │
│  ── Tổng kết ─────────────────────────────    │
│  Tạm tính:              3.000.000 VNĐ          │
│  Giảm giá:                      0 VNĐ          │
│  ─────────────────────────────────────────      │
│  Tổng cộng:             3.000.000 VNĐ          │
│                                                 │
├─────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────┐    │
│  │      [   THANH TOÁN   ]                 │    │
│  └─────────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
```

**Thành phần giao diện:**
- Header: Nút back, tiêu đề, countdown giữ ghế
- Danh sách vé đã chọn (có nút xóa từng item)
- Section gợi ý mua thêm merchandise (upsell/combo)
- Ô nhập mã voucher + nút "Áp dụng"
- Bảng tổng kết: Tạm tính, Giảm giá, Tổng cộng
- Nút "Thanh toán" (sticky bottom)

---

#### SCR-USER-07: Ví vé điện tử

| Thuộc tính | Nội dung |
|-----------|---------|
| Mục đích | Hiển thị danh sách vé của người dùng, nhóm theo trạng thái |
| Actor | USER |
| Điều kiện vào | Nhấn tab "Vé" trên bottom navigation |
| Điều kiện ra | Chuyển sang Chi tiết vé khi tap vào vé |

**Wireframe mô tả:**

```
┌─────────────────────────────────────────────────┐
│  Ví vé của tôi                                  │
├─────────────────────────────────────────────────┤
│                                                 │
│  [Sắp diễn ra]  [Đã qua]                       │
│                                                 │
│  ── Sắp diễn ra ──────────────────────────    │
│  ┌─────────────────────────────────────────┐    │
│  │ [Ảnh SK]  Tên sự kiện ABC              │    │
│  │           📅 dd/MM/yyyy  🕐 HH:mm      │    │
│  │           📍 Địa điểm                   │    │
│  │           🎫 VIP - A5                   │    │
│  │           [ACTIVE] ●                    │    │
│  └─────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────┐    │
│  │ [Ảnh SK]  Tên sự kiện XYZ              │    │
│  │           📅 dd/MM/yyyy  🕐 HH:mm      │    │
│  │           📍 Địa điểm                   │    │
│  │           🎫 Standard - B10             │    │
│  │           [FROZEN] ● (Đang bán lại)     │    │
│  └─────────────────────────────────────────┘    │
│                                                 │
├─────────────────────────────────────────────────┤
│  [🏠 Trang chủ] [🎫 Vé] [🛒 Giỏ] [👤 Tôi]    │
└─────────────────────────────────────────────────┘
```

**Thành phần giao diện:**
- Tab filter: "Sắp diễn ra" / "Đã qua"
- Ticket card: Ảnh sự kiện, tên, ngày giờ, địa điểm, hạng vé + ghế, badge trạng thái
- Badge trạng thái: ACTIVE (xanh), USED (xám), REFUNDED (đỏ), FROZEN (vàng)
- Bottom navigation

**Tương tác:**
- Tap vào ticket card → chuyển sang SCR-USER-08 (Chi tiết vé + QR động)
- Pull-to-refresh để cập nhật danh sách

---

#### SCR-USER-08: Chi tiết vé + QR động

| Thuộc tính | Nội dung |
|-----------|---------|
| Mục đích | Hiển thị QR động (TOTP 30s) để check-in, thông tin chi tiết vé |
| Actor | USER |
| Điều kiện vào | Tap vào vé từ Ví vé |
| Điều kiện ra | Quay lại Ví vé hoặc chuyển sang Niêm yết resale |

**Wireframe mô tả:**

```
┌─────────────────────────────────────────────────┐
│  [←]  Chi tiết vé                               │
├─────────────────────────────────────────────────┤
│                                                 │
│         ┌─────────────────────┐                 │
│         │                     │                 │
│         │    ┌───────────┐    │                 │
│         │    │           │    │                 │
│         │    │  QR CODE  │    │                 │
│         │    │  (Động)   │    │                 │
│         │    │           │    │                 │
│         │    └───────────┘    │                 │
│         │                     │                 │
│         │   ⏱️ Cập nhật: 27s  │                 │
│         │   ████████████░░░   │  ← Progress bar │
│         │                     │                 │
│         └─────────────────────┘                 │
│                                                 │
│  ── Thông tin vé ─────────────────────────    │
│  Mã vé:      TKT-2026-XXXXX                    │
│  Sự kiện:    Tên sự kiện ABC                   │
│  Ngày:       dd/MM/yyyy                         │
│  Giờ:        HH:mm - HH:mm                     │
│  Địa điểm:   Tên venue, Thành phố              │
│  Khu vực:    VIP Zone                           │
│  Hàng:       A                                  │
│  Ghế:        5                                  │
│  Hạng vé:    VIP                                │
│  Trạng thái: [ACTIVE] ●                        │
│                                                 │
│  ── Hành động ────────────────────────────    │
│  [📱 Lưu Apple/Google Wallet]                   │
│  [💰 Bán lại trên Resale Market]                │
│  [ℹ️  Hướng dẫn vào cổng]                      │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Thành phần giao diện:**
- QR Code động (tự động refresh mỗi 30 giây) với countdown + progress bar
- Thông tin chi tiết vé: Mã vé, sự kiện, ngày giờ, địa điểm, khu vực, hàng, ghế, hạng vé, trạng thái
- Các nút hành động: Lưu Wallet, Bán lại, Hướng dẫn vào cổng

**Tương tác:**
- QR tự động cập nhật mỗi 30 giây (TOTP)
- Nếu vé USED → ẩn QR, hiển thị lịch sử check-in
- Nếu vé REFUNDED → ẩn QR, hiển thị thông tin hoàn tiền
- Nếu vé FROZEN → ẩn QR, hiển thị link listing trên Resale



---

### 4.3. Màn hình ORGANIZER

#### SCR-ORG-01: Dashboard Organizer

| Thuộc tính | Nội dung |
|-----------|---------|
| Mục đích | Tổng quan doanh thu, vé bán, check-in, merchandise realtime |
| Actor | ORGANIZER |
| Điều kiện vào | Đăng nhập với role ORGANIZER |
| Điều kiện ra | Điều hướng sang các module quản lý |

**Wireframe mô tả:**

```
┌─────────────────────────────────────────────────────────────┐
│  [≡]  Dashboard Organizer              [🔔] [Avatar ▼]     │
├──────────────┬──────────────────────────────────────────────┤
│              │                                              │
│  📊 Dashboard│  ── Tổng quan ──────────────────────────    │
│  📅 Sự kiện │  ┌──────────┐┌──────────┐┌──────────┐┌────┐ │
│  🛍️ Merch   │  │ Doanh thu││ Vé đã bán││ Check-in ││Merch│ │
│  📈 Báo cáo │  │ 150.5M   ││ 1.250    ││ 890      ││ 45 │ │
│  🧾 Hóa đơn │  │ ↑ 12%    ││ ↑ 8%     ││ 71%      ││ ↑5%│ │
│  👤 Hồ sơ   │  └──────────┘└──────────┘└──────────┘└────┘ │
│              │                                              │
│              │  ── Biểu đồ doanh thu (7 ngày) ─────────   │
│              │  ┌──────────────────────────────────────┐    │
│              │  │         📈 Line Chart                │    │
│              │  │    (Recharts - realtime update)      │    │
│              │  └──────────────────────────────────────┘    │
│              │                                              │
│              │  ── Sự kiện sắp diễn ra ────────────────   │
│              │  ┌──────────────────────────────────────┐    │
│              │  │ Tên SK  │ Ngày    │ Vé bán │ Trạng thái│  │
│              │  │ ABC     │ 20/05   │ 80%    │ Đã duyệt │  │
│              │  │ XYZ     │ 25/05   │ 45%    │ Chờ duyệt│  │
│              │  └──────────────────────────────────────┘    │
│              │                                              │
└──────────────┴──────────────────────────────────────────────┘
```

**Thành phần giao diện:**
- Sidebar navigation (desktop) / Hamburger menu (mobile)
- KPI cards: Doanh thu, Vé đã bán, Tỷ lệ check-in, Merchandise bán
- Biểu đồ doanh thu theo thời gian (Recharts, line chart)
- Bảng sự kiện sắp diễn ra với trạng thái

---

#### SCR-ORG-04: Thiết kế sơ đồ ghế

| Thuộc tính | Nội dung |
|-----------|---------|
| Mục đích | Cho phép Organizer thiết kế seat map bằng drag & drop hoặc import JSON |
| Actor | ORGANIZER |
| Điều kiện vào | Chọn "Thiết kế sơ đồ ghế" trong quản lý sự kiện |
| Điều kiện ra | Lưu seat map thành công |

**Wireframe mô tả:**

```
┌─────────────────────────────────────────────────────────────┐
│  [←]  Thiết kế sơ đồ ghế - Sự kiện ABC    [Lưu] [Preview] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ── Toolbar ───────────────────────────────────────────    │
│  [+ Zone] [+ Block] [+ Row] [+ Seat] [Import JSON] [Undo] │
│                                                             │
│  ┌───────────────────────────────────────────────────┐      │
│  │                                                   │      │
│  │              ═══ SÂN KHẤU ═══                    │      │
│  │                                                   │      │
│  │    ┌─── VIP Zone (kéo thả) ───┐                 │      │
│  │    │ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○      │                 │      │
│  │    │ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○      │                 │      │
│  │    └───────────────────────────┘                 │      │
│  │                                                   │      │
│  │    ┌─── Standard Zone ────────┐                 │      │
│  │    │ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  │                 │      │
│  │    │ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  │                 │      │
│  │    │ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  │                 │      │
│  │    └───────────────────────────┘                 │      │
│  │                                                   │      │
│  │  [+] [-] [↺] Zoom / Rotate                      │      │
│  └───────────────────────────────────────────────────┘      │
│                                                             │
│  ── Properties Panel (bên phải) ───────────────────────    │
│  Zone: VIP                                                  │
│  Block: A                                                   │
│  Rows: 2                                                    │
│  Seats/Row: 10                                              │
│  [Áp dụng]                                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Thành phần giao diện:**
- Toolbar: Thêm Zone/Block/Row/Seat, Import JSON, Undo/Redo
- Canvas chính (Konva.js): Drag & drop, zoom, rotate
- Properties panel (bên phải): Cấu hình thuộc tính zone/block/row đang chọn
- Nút Lưu và Preview

---

### 4.4. Màn hình STAFF

#### SCR-STAFF-02: Quét QR / Check-in

| Thuộc tính | Nội dung |
|-----------|---------|
| Mục đích | Quét QR động của USER để check-in vé tại cổng sự kiện |
| Actor | STAFF |
| Điều kiện vào | Đã chọn sự kiện và cổng check-in |
| Điều kiện ra | Hiển thị kết quả check-in (thành công/thất bại) |

**Wireframe mô tả:**

```
┌─────────────────────────────────────────────────┐
│  Sự kiện: ABC          Cổng: A1                │
│  [ONLINE ●] / [OFFLINE ●]                      │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─────────────────────────────────────────┐    │
│  │                                         │    │
│  │                                         │    │
│  │         ┌─────────────────┐             │    │
│  │         │                 │             │    │
│  │         │   CAMERA VIEW   │             │    │
│  │         │                 │             │    │
│  │         │  ┌───────────┐  │             │    │
│  │         │  │ QR Frame  │  │             │    │
│  │         │  └───────────┘  │             │    │
│  │         │                 │             │    │
│  │         └─────────────────┘             │    │
│  │                                         │    │
│  │                                         │    │
│  └─────────────────────────────────────────┘    │
│                                                 │
│  Đã check-in: 890 / 1.250                      │
│  ████████████████████░░░░░░ 71%                 │
│                                                 │
│  [📋 Nhật ký]  [📥 Tải offline]  [🔄 Đồng bộ] │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Thành phần giao diện:**
- Header: Tên sự kiện, cổng, trạng thái kết nối (Online/Offline)
- Camera viewfinder (full-width, chiếm phần lớn màn hình)
- QR scanning frame (vùng nhận diện QR)
- Thanh tiến trình check-in: Số đã check-in / Tổng, progress bar
- Nút hành động: Nhật ký, Tải offline, Đồng bộ

**Tương tác:**
- Camera tự động bật khi vào màn hình
- Quét QR → hiển thị kết quả (SCR-STAFF-03) trong 3 giây → tự động reset
- Kết quả thành công: Màn hình xanh + ✓ + thông tin ghế
- Kết quả thất bại: Màn hình đỏ + ✗ + lý do (vé đã dùng, sai sự kiện, QR hết hạn...)
- Badge "OFFLINE" khi mất mạng, tự động chuyển chế độ verify local

---

### 4.5. Màn hình ADMIN

#### SCR-ADMIN-01: Dashboard Admin

| Thuộc tính | Nội dung |
|-----------|---------|
| Mục đích | Tổng quan toàn hệ thống: doanh thu, giao dịch, sự kiện, monitoring |
| Actor | ADMIN |
| Điều kiện vào | Đăng nhập với role ADMIN |
| Điều kiện ra | Điều hướng sang các module quản trị |

**Wireframe mô tả:**

```
┌─────────────────────────────────────────────────────────────┐
│  [≡]  Admin Dashboard                  [🔔] [Avatar ▼]     │
├──────────────┬──────────────────────────────────────────────┤
│              │                                              │
│  📊 Dashboard│  ── Tổng quan hệ thống ────────────────    │
│  ✅ Duyệt Org│  ┌──────────┐┌──────────┐┌──────────┐┌────┐ │
│  ✅ Duyệt SK │  │Tổng DT   ││Giao dịch ││Sự kiện   ││User│ │
│  👥 Users   │  │ 2.5 tỷ   ││ 15.230   ││ 45 active││8.5K│ │
│  💸 Refund  │  │ ↑ 15%    ││ ↑ 22%    ││ ↑ 5      ││↑12%│ │
│  🧾 Đối soát │  └──────────┘└──────────┘└──────────┘└────┘ │
│  📈 Báo cáo │                                              │
│  ⚙️ Cấu hình│  ── Cần xử lý ─────────────────────────   │
│              │  ⚠️ 3 Organizer chờ duyệt                   │
│              │  ⚠️ 5 Sự kiện chờ duyệt                     │
│              │  ⚠️ 2 Yêu cầu refund                        │
│              │  ⚠️ 1 Lệch đối soát                         │
│              │                                              │
│              │  ── Biểu đồ doanh thu (30 ngày) ────────   │
│              │  ┌──────────────────────────────────────┐    │
│              │  │         📈 Line Chart                │    │
│              │  └──────────────────────────────────────┘    │
│              │                                              │
│              │  ── Health System ───────────────────────   │
│              │  API Gateway:  ● Online  (latency: 45ms)    │
│              │  Booking:      ● Online  (latency: 120ms)   │
│              │  Payment:      ● Online  (latency: 89ms)    │
│              │  Kafka:        ● Online  (lag: 0)           │
│              │                                              │
└──────────────┴──────────────────────────────────────────────┘
```

**Thành phần giao diện:**
- Sidebar navigation (desktop)
- KPI cards: Tổng doanh thu, Giao dịch, Sự kiện active, Tổng user
- Section "Cần xử lý": Danh sách cảnh báo cần action (Organizer chờ duyệt, Sự kiện chờ duyệt, Refund, Lệch đối soát)
- Biểu đồ doanh thu 30 ngày
- Health monitoring: Trạng thái các service, latency

---

#### SCR-ADMIN-03: Phê duyệt Sự kiện

| Thuộc tính | Nội dung |
|-----------|---------|
| Mục đích | Xem chi tiết và phê duyệt/từ chối sự kiện do Organizer gửi |
| Actor | ADMIN |
| Điều kiện vào | Click vào sự kiện trong danh sách chờ duyệt |
| Điều kiện ra | Sự kiện được duyệt/từ chối, quay lại danh sách |

**Wireframe mô tả:**

```
┌─────────────────────────────────────────────────────────────┐
│  [←]  Phê duyệt sự kiện                                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ── Thông tin sự kiện ─────────────────────────────────    │
│  Tên:        Sự kiện ABC                                    │
│  Organizer:  Công ty XYZ (MST: 0123456789)                  │
│  Thời gian:  dd/MM/yyyy HH:mm - dd/MM/yyyy HH:mm           │
│  Địa điểm:   Nhà hát Lớn, Hà Nội                           │
│  Thể loại:   Ca nhạc                                        │
│  Trạng thái:  [Chờ duyệt] ●                                │
│                                                             │
│  ── Banner & Hình ảnh ─────────────────────────────────    │
│  [Ảnh 1] [Ảnh 2] [Ảnh 3]                                   │
│                                                             │
│  ── Sơ đồ ghế ────────────────────────────────────────    │
│  [Preview seat map]                                         │
│  Tổng ghế: 1.250 | VIP: 100 | Standard: 1.150              │
│                                                             │
│  ── Hạng vé ──────────────────────────────────────────    │
│  VIP:        2.000.000 VNĐ  (Quota: 100)                   │
│  Standard:   1.000.000 VNĐ  (Quota: 1.150)                 │
│                                                             │
│  ── Quy định sự kiện ─────────────────────────────────    │
│  • Không mang đồ ăn từ bên ngoài                           │
│  • Trẻ em dưới 12 tuổi cần người lớn đi kèm               │
│                                                             │
│  ── Ghi chú kiểm duyệt ───────────────────────────────    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Nhập ghi chú / lý do (nếu từ chối)...              │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌────────────┐ ┌──────────────────┐ ┌────────────┐        │
│  │ Phê duyệt │ │ Yêu cầu bổ sung │ │  Từ chối  │        │
│  └────────────┘ └──────────────────┘ └────────────┘        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Thành phần giao diện:**
- Thông tin đầy đủ sự kiện: Tên, Organizer, thời gian, địa điểm, thể loại
- Preview banner/hình ảnh
- Preview sơ đồ ghế + thống kê
- Bảng hạng vé
- Quy định sự kiện
- Textarea ghi chú kiểm duyệt
- 3 nút hành động: Phê duyệt (xanh), Yêu cầu bổ sung (vàng), Từ chối (đỏ)

**Tương tác:**
- Nhấn "Phê duyệt" → popup xác nhận → cập nhật trạng thái "Đã duyệt" → gửi thông báo Organizer
- Nhấn "Từ chối" → bắt buộc nhập lý do → cập nhật trạng thái "Từ chối" → gửi thông báo
- Nhấn "Yêu cầu bổ sung" → bắt buộc nhập ghi chú → cập nhật trạng thái → gửi thông báo
- Mọi thao tác ghi audit log

---

#### SCR-USER-11: AI Chatbot

| Thuộc tính | Nội dung |
|-----------|---------|
| Mục đích | Hỏi đáp tự động về sự kiện, mua vé, chính sách bằng ngôn ngữ tự nhiên |
| Actor | USER, Khách vãng lai |
| Điều kiện vào | Click vào floating chat button (góc phải dưới) |
| Điều kiện ra | Đóng cửa sổ chat |

**Wireframe mô tả:**

```
                              ┌─────────────────────────┐
                              │  🤖 Trợ lý AI    [─] [✕]│
                              ├─────────────────────────┤
                              │                         │
                              │  🤖 Xin chào! Tôi có   │
                              │  thể giúp gì cho bạn?  │
                              │                         │
                              │        Sự kiện ABC mở  │
                              │        cổng lúc mấy giờ?│
                              │                    👤   │
                              │                         │
                              │  🤖 Sự kiện ABC sẽ mở  │
                              │  cổng lúc 18:00 ngày    │
                              │  20/05/2026 tại Nhà hát │
                              │  Lớn, Hà Nội.           │
                              │                         │
                              │  📎 Xem chi tiết sự kiện│
                              │                         │
                              │  Gợi ý:                 │
                              │  • Cách mua vé?         │
                              │  • Chính sách hoàn vé?  │
                              │                         │
                              │  [👍] [👎]              │
                              │                         │
                              ├─────────────────────────┤
                              │ ┌───────────────┐ [Gửi] │
                              │ │ Nhập câu hỏi..│       │
                              │ └───────────────┘       │
                              └─────────────────────────┘
```

**Thành phần giao diện:**
- Floating button (góc phải dưới màn hình)
- Cửa sổ chat: Header (tên bot, nút thu nhỏ, nút đóng)
- Vùng hiển thị tin nhắn: Bot (trái), User (phải)
- Liên kết đính kèm trong câu trả lời
- Câu hỏi gợi ý (suggestion chips)
- Nút đánh giá (👍/👎) cho mỗi câu trả lời
- Input nhập câu hỏi + nút Gửi

**Tương tác:**
- Gõ câu hỏi → gửi → hiển thị typing indicator → nhận câu trả lời
- Nếu confidence thấp → hiển thị "Tôi không chắc chắn. Bạn có muốn liên hệ hỗ trợ?"
- Nếu hỏi về đơn hàng cá nhân → yêu cầu đăng nhập
- Hỗ trợ hội thoại nhiều lượt (duy trì ngữ cảnh)



---

## 5. THIẾT KẾ RESPONSIVE

### 5.1. Chiến lược Responsive

| Breakpoint | Viewport | Layout | Navigation |
|-----------|----------|--------|-----------|
| Mobile | 375px – 767px | Single column, full-width cards | Bottom tab bar |
| Tablet | 768px – 1279px | 2-column grid, collapsible sidebar | Top navbar + hamburger |
| Desktop | 1280px – 1920px | Multi-column, fixed sidebar | Fixed sidebar + top bar |

### 5.2. Nguyên tắc thích ứng

| Thành phần | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| Seat Map | Full-screen, pinch-to-zoom | Split view (map + panel) | Side-by-side (map + properties) |
| Table | Collapse thành card list | Horizontal scroll | Full table |
| Navigation | Bottom tabs (4 items) | Top bar + hamburger | Fixed sidebar |
| Modal | Full-screen sheet (bottom-up) | Center modal (60% width) | Center modal (40% width) |
| Form | Single column, stacked | 2-column layout | 2-3 column layout |
| Dashboard charts | Stacked, swipeable | 2-column grid | 3-4 column grid |
| Event card | Full-width, vertical | 2-column grid | 3-4 column grid |
| QR Code | Full-screen, centered | Centered (50% width) | Centered (30% width) |

### 5.3. Staff App (PWA) – Thiết kế đặc biệt

Staff App được thiết kế tối ưu cho mobile (PWA) với các đặc điểm:

- **Orientation**: Ưu tiên Portrait mode
- **Camera**: Full-screen viewfinder, tối ưu cho quét QR nhanh
- **Offline**: Badge trạng thái kết nối luôn hiển thị, nút "Tải offline" / "Đồng bộ" dễ tiếp cận
- **Kết quả check-in**: Full-screen overlay (xanh = thành công, đỏ = thất bại), auto-dismiss 3 giây
- **Font size**: Lớn hơn 20% so với app thường để dễ đọc trong điều kiện ánh sáng ngoài trời
- **Contrast**: Tối thiểu 7:1 (WCAG AAA) cho text quan trọng

---

## 6. TỔNG KẾT

### 6.1. Ma trận màn hình – Use Case

| Màn hình | Use Case liên quan |
|---------|-------------------|
| SCR-AUTH-01, SCR-AUTH-02 | UC-01 (Đăng ký, đăng nhập) |
| SCR-ADMIN-02 | UC-02 (Phê duyệt Organizer) |
| SCR-ORG-03 | UC-03 (Tạo sự kiện) |
| SCR-ORG-04, SCR-ORG-05 | UC-04 (Sơ đồ ghế & Hạng vé) |
| SCR-ADMIN-03 | UC-05 (Phê duyệt sự kiện) |
| SCR-USER-01 | UC-06 (Tìm kiếm & Gợi ý) |
| SCR-USER-03 | UC-07 (Đặt vé & Chọn ghế) |
| SCR-USER-04, SCR-USER-05 | UC-08 (Thanh toán) |
| SCR-USER-06 | UC-09 (Phát hành vé & QR) |
| SCR-USER-07, SCR-USER-08 | UC-10 (Ví vé điện tử) |
| SCR-STAFF-02, SCR-STAFF-03 | UC-11 (Check-in vé) |
| SCR-STAFF-04 | UC-12 (Check-in offline) |
| SCR-USER-09 | UC-13 (Resale Market) |
| SCR-ORG-06 | UC-14 (Merchandise) |
| SCR-ADMIN-01, SCR-ADMIN-05, SCR-ADMIN-06, SCR-ORG-07 | UC-15 (Quản trị & Báo cáo) |
| SCR-USER-11 | UC-16 (AI Chatbot) |

### 6.2. Công nghệ triển khai giao diện

| Thành phần | Công nghệ | Ghi chú |
|-----------|-----------|---------|
| Framework UI | React 18 + Vite 5 | SPA, code-splitting, tree-shaking |
| Styling | Tailwind CSS 3 + shadcn/ui | Utility-first, headless components |
| State Management | Zustand + React Query | Global state + server state cache |
| Seat Map | Konva.js (Canvas 2D) | Hiệu năng cao cho 10.000+ ghế |
| Charts | Recharts | Dashboard realtime |
| QR Code | qrcode.js + TOTP logic | Auto-refresh 30 giây |
| PWA | Vite PWA Plugin + Workbox | Service Worker, offline support |
| Realtime | Socket.IO Client | Seat status, notifications |
| Build | Vite 5 | HMR, fast build |

