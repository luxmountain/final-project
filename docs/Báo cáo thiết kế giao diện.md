# BÁO CÁO THIẾT KẾ GIAO DIỆN (UI DESIGN REPORT)

## 1. Tổng quan

- **Công nghệ:** Next.js (App Router), React, TypeScript, Tailwind CSS, Lucide Icons
- **Kiến trúc:** Turborepo monorepo (4 app: user, organizer, staff, admin)
- **Theme:** Dark mode (zinc-900/950 background, green-500 accent)
- **Responsive:** Mobile-first (375px → 1920px)

## 2. Danh sách màn hình

### 2.1. Xác thực

| STT | Tên màn hình | Đường dẫn |
|-----|-------------|-----------|
| 1 | Đăng nhập / Đăng ký | `http://localhost:3001/auth/login` |

### 2.2. USER

| STT | Tên màn hình | Đường dẫn |
|-----|-------------|-----------|
| 2 | Trang chủ | `http://localhost:3001/` |
| 3 | Danh sách sự kiện | `http://localhost:3001/events` |
| 4 | Chi tiết sự kiện | `http://localhost:3001/events/1` |
| 5 | Sơ đồ ghế & Chọn ghế | `http://localhost:3001/events/1/seats` |
| 6 | Giỏ hàng | `http://localhost:3001/cart` |
| 7 | Xác nhận đặt hàng | `http://localhost:3001/checkout` |
| 8 | Ví vé | `http://localhost:3001/tickets` |
| 9 | Chi tiết vé + QR động | `http://localhost:3001/tickets/TKT-2026-001` |
| 10 | Resale Market | `http://localhost:3001/resale` |
| 11 | Merchandise | `http://localhost:3001/merchandise` |
| 12 | Lịch sử mua hàng | `http://localhost:3001/orders` |
| 13 | Chi tiết đơn hàng | `http://localhost:3001/orders/ORD-2026-001` |
| 14 | Hồ sơ cá nhân | `http://localhost:3001/profile` |
| 15 | Thông báo | `http://localhost:3001/notifications` |
| 16 | Phương thức thanh toán | `http://localhost:3001/payment-methods` |
| 17 | Cài đặt tài khoản | `http://localhost:3001/settings` |

### 2.3. ORGANIZER

| STT | Tên màn hình | Đường dẫn |
|-----|-------------|-----------|
| 18 | Dashboard Organizer | `http://localhost:3002/` |
| 19 | Quản lý sự kiện | `http://localhost:3002/events` |
| 20 | Quản lý Merchandise | `http://localhost:3002/merchandise` |
| 21 | Báo cáo & Thống kê | `http://localhost:3002/reports` |

### 2.4. STAFF

| STT | Tên màn hình | Đường dẫn |
|-----|-------------|-----------|
| 22 | Chọn sự kiện & Cổng | `http://localhost:3003/` |
| 23 | Quét QR / Check-in | `http://localhost:3003/scan` |
| 24 | Nhật ký check-in | `http://localhost:3003/log` |

### 2.5. ADMIN

| STT | Tên màn hình | Đường dẫn |
|-----|-------------|-----------|
| 25 | Dashboard Admin | `http://localhost:3004/` |
| 26 | Phê duyệt Organizer | `http://localhost:3004/organizers` |
| 27 | Phê duyệt Sự kiện | `http://localhost:3004/events` |
| 28 | Quản lý User | `http://localhost:3004/users` |
| 29 | Quản lý Refund | `http://localhost:3004/refunds` |

## 3. Hướng dẫn chạy

```bash
cd /mnt/d/project/ptit/final-project/frontend
yarn dev
```

Các app chạy trên:
- **user:** http://localhost:3001
- **organizer:** http://localhost:3002
- **staff:** http://localhost:3003
- **admin:** http://localhost:3004

## 4. Mô tả chi tiết từng màn hình

### 4.1. Đăng nhập / Đăng ký

- **Mô tả:** Form đăng nhập/đăng ký với tab chuyển đổi, hỗ trợ Google OAuth
- **Thành phần:** Logo VENTIX, Tab login/register, Input email + password (toggle hiện/ẩn), Nút đăng nhập Google

<!-- Chèn ảnh chụp màn hình tại đây -->

---

### 4.2. Trang chủ (Khám phá sự kiện)

- **Mô tả:** Banner hero, danh mục 8 loại sự kiện, xu hướng hot, sự kiện sắp diễn ra
- **Thành phần:** Search bar, Hero Banner, Category grid (8 icon), Trending carousel, Event cards grid, Bottom navigation

<!-- Chèn ảnh chụp màn hình tại đây -->

---

### 4.3. Danh sách sự kiện

- **Mô tả:** Tìm kiếm & lọc sự kiện theo thể loại
- **Thành phần:** Header, Search input, Category tabs (scroll ngang), Event cards grid

<!-- Chèn ảnh chụp màn hình tại đây -->

---

### 4.4. Chi tiết sự kiện

- **Mô tả:** Thông tin đầy đủ sự kiện với banner, hạng vé, merchandise
- **Thành phần:** Header (back, like, share), Banner, Event info, Mô tả, Danh sách hạng vé, Merchandise, Sticky CTA "Mua vé ngay"

<!-- Chèn ảnh chụp màn hình tại đây -->

---

### 4.5. Sơ đồ ghế & Chọn ghế

- **Mô tả:** Bản đồ ghế tương tác với countdown giữ ghế
- **Thành phần:** Header + countdown, Legend (trống/giữ/bán/chọn), Stage, Seat map (VIP + Standard), Summary + CTA

<!-- Chèn ảnh chụp màn hình tại đây -->

---

### 4.6. Giỏ hàng

- **Mô tả:** Quản lý vé đã chọn, mã giảm giá, tổng tiền
- **Thành phần:** Header + countdown, Danh sách vé, Input voucher, Summary, Sticky CTA "Thanh toán"

<!-- Chèn ảnh chụp màn hình tại đây -->

---

### 4.7. Xác nhận đặt hàng

- **Mô tả:** Trang xác nhận sau thanh toán thành công
- **Thành phần:** Success icon, Mã đơn, Chi tiết đơn, Thông tin sự kiện, CTA "Xem vé" + "Tiếp tục khám phá"

<!-- Chèn ảnh chụp màn hình tại đây -->

---

### 4.8. Ví vé (Danh sách vé)

- **Mô tả:** Tất cả vé người dùng, chia theo trạng thái
- **Thành phần:** Header, Section "Sắp diễn ra", Section "Đã qua", Ticket cards

<!-- Chèn ảnh chụp màn hình tại đây -->

---

### 4.9. Chi tiết vé + QR động

- **Mô tả:** Thẻ vé với QR code tự động cập nhật mỗi 30 giây
- **Thành phần:** QR Card (countdown + progress bar), Thông tin vé (mã, hạng, khu vực, ghế), Actions (Wallet, Bán lại, Hướng dẫn)

<!-- Chèn ảnh chụp màn hình tại đây -->

---

### 4.10. Resale Market

- **Mô tả:** Sàn mua bán vé lại (giới hạn 120% giá gốc)
- **Thành phần:** Header, Info banner, Danh sách vé resale (giá gốc vs resale, % chênh lệch)

<!-- Chèn ảnh chụp màn hình tại đây -->

---

### 4.11. Merchandise

- **Mô tả:** Vật phẩm chính hãng từ sự kiện
- **Thành phần:** Header, Grid sản phẩm (ảnh, tên, giá, tồn kho, nút thêm giỏ)

<!-- Chèn ảnh chụp màn hình tại đây -->

---

### 4.12. Lịch sử mua hàng

- **Mô tả:** Danh sách đơn hàng với trạng thái
- **Thành phần:** Header, Order cards (mã, trạng thái, items, ngày, tổng tiền)

<!-- Chèn ảnh chụp màn hình tại đây -->

---

### 4.13. Chi tiết đơn hàng

- **Mô tả:** Chi tiết một đơn hàng
- **Thành phần:** Header, Timeline, Danh sách vé, Thông tin sự kiện, Tóm tắt thanh toán

<!-- Chèn ảnh chụp màn hình tại đây -->

---

### 4.14. Hồ sơ cá nhân

- **Mô tả:** Thông tin người dùng và menu điều hướng
- **Thành phần:** Profile card (avatar, stats), Menu (Vé, Lịch sử, Thanh toán, Cài đặt), Nút đăng xuất

<!-- Chèn ảnh chụp màn hình tại đây -->

---

### 4.15. Thông báo

- **Mô tả:** Danh sách thông báo phân loại theo type
- **Thành phần:** Header + "Đọc tất cả", Notification items (Vé/Thanh toán/Khuyến mãi)

<!-- Chèn ảnh chụp màn hình tại đây -->

---

### 4.16. Phương thức thanh toán

- **Mô tả:** Quản lý phương thức thanh toán đã lưu
- **Thành phần:** Header + nút Thêm, Danh sách (bank/ewallet, badge mặc định), Info PCI DSS

<!-- Chèn ảnh chụp màn hình tại đây -->

---

### 4.17. Cài đặt tài khoản

- **Mô tả:** Cài đặt thông tin, bảo mật, thông báo
- **Thành phần:** Form thông tin cá nhân, Section bảo mật (đổi MK, 2FA), Section thông báo (toggles)

<!-- Chèn ảnh chụp màn hình tại đây -->

---

### 4.18. Dashboard Organizer

- **Mô tả:** Tổng quan doanh thu, vé bán, check-in, merchandise
- **Thành phần:** Sidebar navigation, KPI cards (Doanh thu, Vé bán, Check-in, Merch), Biểu đồ doanh thu 7 ngày, Bảng sự kiện sắp diễn ra

<!-- Chèn ảnh chụp màn hình tại đây -->

---

### 4.19. Quản lý sự kiện (Organizer)

- **Mô tả:** Danh sách sự kiện với trạng thái, tìm kiếm, tạo mới
- **Thành phần:** Header + nút Tạo sự kiện, Search, Event cards (tên, trạng thái, ngày, địa điểm, progress vé bán)

<!-- Chèn ảnh chụp màn hình tại đây -->

---

### 4.20. Quản lý Merchandise (Organizer)

- **Mô tả:** Bảng sản phẩm merchandise với tồn kho
- **Thành phần:** Header + nút Thêm, Search, Table (sản phẩm, sự kiện, giá, tồn kho, đã bán)

<!-- Chèn ảnh chụp màn hình tại đây -->

---

### 4.21. Báo cáo & Thống kê (Organizer)

- **Mô tả:** Thống kê doanh thu, vé, check-in theo thời gian
- **Thành phần:** KPI summary, Biểu đồ doanh thu theo tháng, Bảng chi tiết theo sự kiện, Nút xuất báo cáo

<!-- Chèn ảnh chụp màn hình tại đây -->

---

### 4.22. Chọn sự kiện & Cổng (Staff)

- **Mô tả:** Trang chọn sự kiện và cổng check-in trước khi bắt đầu quét
- **Thành phần:** Logo + trạng thái Online, Dropdown chọn sự kiện, Info sự kiện, Grid nút chọn cổng, CTA "Bắt đầu Check-in"

<!-- Chèn ảnh chụp màn hình tại đây -->

---

### 4.23. Quét QR / Check-in (Staff)

- **Mô tả:** Màn hình camera quét QR với kết quả overlay (xanh/đỏ)
- **Thành phần:** Header (sự kiện, cổng, online status), Camera viewfinder + QR frame, Progress bar check-in, Kết quả overlay full-screen (auto-dismiss 3s)

<!-- Chèn ảnh chụp màn hình tại đây -->

---

### 4.24. Nhật ký check-in (Staff)

- **Mô tả:** Lịch sử các lần quét QR
- **Thành phần:** Header, Danh sách entries (icon thành công/thất bại, tên, vé, thời gian, lý do lỗi)

<!-- Chèn ảnh chụp màn hình tại đây -->

---

### 4.25. Dashboard Admin

- **Mô tả:** Tổng quan hệ thống: KPI, cảnh báo cần xử lý, health monitoring
- **Thành phần:** Sidebar, KPI cards (Doanh thu, Giao dịch, Sự kiện, User), Alert list (chờ duyệt, refund), System health (service status + latency)

<!-- Chèn ảnh chụp màn hình tại đây -->

---

### 4.26. Phê duyệt Organizer (Admin)

- **Mô tả:** Danh sách organizer chờ duyệt với thông tin MST, đại diện
- **Thành phần:** Header, Organizer cards (tên công ty, MST, đại diện, email, SĐT, trạng thái, nút Phê duyệt/Từ chối)

<!-- Chèn ảnh chụp màn hình tại đây -->

---

### 4.27. Phê duyệt Sự kiện (Admin)

- **Mô tả:** Danh sách sự kiện chờ duyệt với chi tiết
- **Thành phần:** Header, Event cards (tên, organizer, ngày, địa điểm, thể loại, số ghế, 3 nút: Phê duyệt/Yêu cầu bổ sung/Từ chối)

<!-- Chèn ảnh chụp màn hình tại đây -->

---

### 4.28. Quản lý User (Admin)

- **Mô tả:** Bảng danh sách tất cả user hệ thống
- **Thành phần:** Header, Search, Table (tên, email, role badge, trạng thái Active/Banned, ngày tham gia, số đơn hàng)

<!-- Chèn ảnh chụp màn hình tại đây -->

---

### 4.29. Quản lý Refund (Admin)

- **Mô tả:** Danh sách yêu cầu hoàn tiền chờ xử lý
- **Thành phần:** Header, Refund cards (mã, trạng thái, số tiền, user, vé, lý do, ngày, nút Chấp nhận/Từ chối)

<!-- Chèn ảnh chụp màn hình tại đây -->

---

## 5. Nguyên tắc thiết kế

| Nguyên tắc | Giá trị |
|------------|---------|
| Theme | Dark mode (zinc-900/950) |
| Primary Color | Green-500/600 |
| Font | Inter / Geist |
| Icons | Lucide React |
| Spacing | 4px base |
| Components | Tailwind CSS + shadcn/ui |
| Responsive | 375px / 768px / 1280px breakpoints |
