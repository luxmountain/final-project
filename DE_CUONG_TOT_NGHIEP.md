# ĐỀ CƯƠNG ĐỒ ÁN TỐT NGHIỆP

## XÂY DỰNG HỆ SINH THÁI PHÂN PHỐI VÉ VÀ VẬT PHẨM SỰ KIỆN TÍCH HỢP SÀN GIAO DỊCH THỨ CẤP VÀ ỨNG DỤNG TRÍ TUỆ NHÂN TẠO DỰA TRÊN KIẾN TRÚC MICROSERVICES

---

## MỤC LỤC

1. [Giới thiệu đề tài](#1-giới-thiệu-đề-tài)
2. [Mục tiêu đồ án](#2-mục-tiêu-đồ-án)
3. [Phạm vi dự án và đối tượng sử dụng](#3-phạm-vi-dự-án-và-đối-tượng-sử-dụng)
4. [Yêu cầu chức năng chi tiết](#4-yêu-cầu-chức-năng-chi-tiết)
5. [Yêu cầu phi chức năng](#5-yêu-cầu-phi-chức-năng)
6. [Giải pháp kỹ thuật cho các bài toán trọng tâm](#6-giải-pháp-kỹ-thuật-cho-các-bài-toán-trọng-tâm)
7. [Kiến trúc hệ thống](#7-kiến-trúc-hệ-thống)
8. [Công nghệ áp dụng](#8-công-nghệ-áp-dụng)
9. [Kế hoạch triển khai](#9-kế-hoạch-triển-khai)
10. [Kết quả dự kiến](#10-kết-quả-dự-kiến)
11. [Tài liệu tham khảo](#11-tài-liệu-tham-khảo)

---

## 1. GIỚI THIỆU ĐỀ TÀI

### 1.1. Đặt vấn đề

Thị trường sự kiện giải trí tại Việt Nam đang bùng nổ với hàng loạt concert, lễ hội âm nhạc và sự kiện thể thao quy mô lớn. Tuy nhiên, hệ sinh thái phân phối vé hiện tại đang tồn tại nhiều bất cập nghiêm trọng:

- **Phân mảnh trải nghiệm:** Người dùng phải sử dụng nhiều nền tảng riêng lẻ cho từng nhu cầu — một app để mua vé, một website khác để mua merchandise, và không có kênh chính thức nào để chuyển nhượng vé an toàn. Điều này tạo ra trải nghiệm rời rạc và bất tiện.
- **Nghẽn cổ chai khi mở bán (Flash Sale Bottleneck):** Các sự kiện hot thường bán hết vé trong vài phút. Hệ thống monolithic truyền thống không đủ khả năng xử lý hàng nghìn request đồng thời, dẫn đến sập trang, mất đơn hàng và trải nghiệm tồi tệ cho người dùng.
- **Nạn vé giả và "phe vé":** Việc thiếu cơ chế chuyển nhượng chính thức đẩy người dùng sang các kênh không chính thống (mạng xã hội, chợ đen), nơi rủi ro lừa đảo bằng vé giả hoặc vé đã sử dụng là rất cao. Giá vé bị đẩy lên gấp nhiều lần giá gốc mà không có kiểm soát.
- **Thiếu cá nhân hóa:** Các nền tảng hiện tại chủ yếu hiển thị sự kiện theo danh mục tĩnh, chưa tận dụng dữ liệu hành vi người dùng để gợi ý sự kiện phù hợp hay hỗ trợ khách hàng tự động.

### 1.2. Lý do chọn đề tài

Đề tài được lựa chọn nhằm giải quyết đồng thời các bài toán trên bằng một nền tảng **"All-in-One"** duy nhất, đồng thời là cơ hội để nghiên cứu và áp dụng các kỹ thuật phần mềm hiện đại:

- Kiến trúc **Microservices** với khả năng mở rộng độc lập từng module nghiệp vụ.
- Kỹ thuật xử lý **High Concurrency** bằng Redis Distributed Lock cho bài toán flash sale.
- Ứng dụng **Trí tuệ nhân tạo** (TF-IDF, Cosine Similarity, Semantic Search) vào cá nhân hóa và tự động hóa chăm sóc khách hàng.
- Giải pháp **chống gian lận vé** bằng TOTP (Time-based One-Time Password) kết hợp tích hợp Apple/Google Wallet.

### 1.3. Tính mới và đóng góp

| Tiêu chí | Nền tảng hiện tại (Ticketbox, Eventbrite...) | Hệ thống đề xuất |
|---|---|---|
| Mua vé + Merchandise | Tách biệt hoặc không có | Tích hợp Upsell trong cùng luồng đặt vé |
| Chuyển nhượng vé | Không hỗ trợ chính thức | Sàn giao dịch thứ cấp có kiểm soát giá trần |
| Chống vé giả | QR tĩnh (dễ sao chép) | QR động xoay mỗi 30 giây (TOTP) |
| Check-in offline | Phụ thuộc mạng | PWA + Wallet offline + Staff App sync local |
| AI cá nhân hóa | Gợi ý cơ bản hoặc không có | Recommender + Chatbot Q&A dựa trên Semantic Search |

---

## 2. MỤC TIÊU ĐỒ ÁN

### 2.1. Mục tiêu nghiệp vụ

Xây dựng nền tảng hệ sinh thái sự kiện hoàn chỉnh với luồng trải nghiệm liền mạch:

```
Khám phá sự kiện → Đặt vé → Mua vật phẩm (Upsell) → Thanh toán
    → Nhận vé (Wallet/PWA) → Chuyển nhượng (nếu cần) → Check-in sự kiện
```

Cụ thể:
- Cung cấp trải nghiệm mua vé thời gian thực với sơ đồ ghế tương tác cho người dùng cuối.
- Tích hợp thương mại điện tử vật phẩm sự kiện (merchandise) ngay trong luồng đặt vé để tối đa hóa doanh thu cho nhà tổ chức.
- Vận hành sàn giao dịch vé thứ cấp có kiểm soát, đảm bảo quyền lợi cả người mua lẫn người bán.
- Tự động hóa chăm sóc khách hàng và cá nhân hóa gợi ý bằng AI.

### 2.2. Mục tiêu kỹ thuật

| # | Mục tiêu | Chỉ số đo lường |
|---|---|---|
| 1 | Kiến trúc Microservices có khả năng mở rộng | Mỗi service deploy, scale độc lập; giao tiếp qua API Gateway + Kafka |
| 2 | Xử lý đồng thời cao (High Concurrency) | Chịu tải ≥ 1.000 request/giây cho luồng đặt vé mà không xảy ra overselling |
| 3 | Đảm bảo tính nhất quán dữ liệu | Không bán trùng ghế (Zero Oversell) nhờ Redis Distributed Lock |
| 4 | Chống gian lận vé | QR động TOTP xoay mỗi 30 giây, vô hiệu hóa ảnh chụp màn hình |
| 5 | Hoạt động offline | PWA cache vé, Wallet lưu vé native, Staff App check-in không cần mạng |
| 6 | Ứng dụng AI | Recommender đạt độ chính xác hợp lý trên tập dữ liệu test; Chatbot trả lời đúng ngữ cảnh sự kiện |

---

## 3. PHẠM VI DỰ ÁN VÀ ĐỐI TƯỢNG SỬ DỤNG

### 3.1. Đối tượng sử dụng

| Vai trò | Mô tả | Ứng dụng tương tác |
|---|---|---|
| **Khách hàng (User)** | Người mua vé, mua vật phẩm, chuyển nhượng vé | User Portal (Web PWA) |
| **Nhà tổ chức (Organizer)** | Tạo sự kiện, thiết kế sơ đồ ghế, quản lý doanh thu | Organizer Portal (Web Admin) |
| **Nhân viên soát vé (Staff)** | Quét QR check-in tại cổng sự kiện | Staff App (Mobile Flutter) |
| **Quản trị hệ thống (Admin)** | Quản lý toàn bộ nền tảng, duyệt sự kiện, xử lý tranh chấp | Organizer Portal (quyền Admin) |

### 3.2. Các ứng dụng Client (Frontend)

**a) User Portal — Web Progressive Web App (PWA)**
- Giao diện responsive, hoạt động mượt trên cả desktop và mobile.
- Tích hợp PWA: Service Worker cache trang "Vé của tôi" để truy cập offline.
- Tích hợp Apple Wallet / Google Wallet: Người dùng thêm vé vào ví điện thoại ngay sau thanh toán, hiển thị vé 100% offline.
- Hiển thị QR động (TOTP) xoay mỗi 30 giây trực tiếp trên trình duyệt.

**b) Organizer Portal — Web Admin (ReactJS)**
- Dashboard tổng quan: Doanh thu, lượng vé bán, tỷ lệ check-in theo thời gian thực.
- Công cụ vẽ sơ đồ ghế trực quan: Kéo thả tạo Zone → Block → Row → Seat.
- Quản lý merchandise: Thêm/sửa/xóa vật phẩm, theo dõi tồn kho.
- Báo cáo và xuất dữ liệu.

**c) Staff App — Mobile Flutter**
- Tối ưu cho một mục đích duy nhất: quét QR nhanh nhất có thể.
- Chế độ Offline Sync: Tải trước danh sách hash vé hợp lệ về local, check-in không cần mạng.
- Đồng bộ kết quả check-in lên server khi có kết nối trở lại.

### 3.3. Hệ thống Backend (Microservices)

Hệ thống được phân tách thành các nhóm service theo nguyên tắc **Single Responsibility**:

```
┌─────────────────────────────────────────────────────────────┐
│                    INFRASTRUCTURE LAYER                      │
│  ┌──────────┐  ┌───────────┐  ┌─────────────┐              │
│  │  Eureka   │  │  Gateway   │  │ Config Server│             │
│  │ (Registry)│  │ (Routing)  │  │ (Centralized)│             │
│  └──────────┘  └───────────┘  └─────────────┘              │
├─────────────────────────────────────────────────────────────┤
│                      CORE SERVICES                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Identity  │  │ Catalog   │  │ Booking   │  │ Payment   │  │
│  │ Service   │  │ Service   │  │ Service   │  │ Service   │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│  ┌──────────┐                                               │
│  │ Ticket    │                                               │
│  │ Service   │                                               │
│  └──────────┘                                               │
├─────────────────────────────────────────────────────────────┤
│                   EXPANSION SERVICES                         │
│  ┌──────────────┐  ┌──────────────┐                         │
│  │ Merchandise   │  │   Resale      │                        │
│  │ Service       │  │   Service     │                        │
│  └──────────────┘  └──────────────┘                         │
├─────────────────────────────────────────────────────────────┤
│                  INTELLIGENCE SERVICES                       │
│  ┌──────────────┐  ┌──────────────┐                         │
│  │  AI Service   │  │ Notification  │                        │
│  │ (Flask/Python)│  │   Service     │                        │
│  └──────────────┘  └──────────────┘                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. YÊU CẦU CHỨC NĂNG CHI TIẾT

### 4.1. Phân hệ Quản lý Danh tính (Identity Service)

| Mã | Chức năng | Mô tả |
|---|---|---|
| ID-01 | Đăng ký / Đăng nhập | Hỗ trợ email + mật khẩu, OAuth2 (Google). Phát hành JWT Access Token + Refresh Token |
| ID-02 | Phân quyền RBAC | Các role: USER, ORGANIZER, STAFF, ADMIN với quyền hạn khác nhau |
| ID-03 | Quản lý hồ sơ | Cập nhật thông tin cá nhân, avatar, lịch sử giao dịch |

### 4.2. Phân hệ Danh mục Sự kiện (Catalog Service)

| Mã | Chức năng | Mô tả |
|---|---|---|
| CT-01 | CRUD sự kiện | Organizer tạo/sửa/xóa sự kiện với thông tin chi tiết (tên, mô tả, thời gian, địa điểm, banner) |
| CT-02 | Sơ đồ ghế động | Organizer thiết kế sơ đồ chỗ ngồi theo cấu trúc **Zone → Block → Row → Seat**. Dữ liệu lưu dạng JSON trên MongoDB để linh hoạt với mọi layout |
| CT-03 | Quản lý hạng vé | Định nghĩa nhiều hạng vé (VIP, Standard, Economy) với giá và số lượng riêng |
| CT-04 | Tìm kiếm & Lọc | Full-text search sự kiện qua Elasticsearch, lọc theo danh mục/ngày/địa điểm/khoảng giá |
| CT-05 | Duyệt sự kiện | Admin review và phê duyệt sự kiện trước khi công khai |

### 4.3. Phân hệ Đặt vé (Booking Service) ⭐ Core

| Mã | Chức năng | Mô tả |
|---|---|---|
| BK-01 | Chọn ghế thời gian thực | Hiển thị trạng thái ghế (Trống / Đang giữ / Đã bán) realtime trên sơ đồ |
| BK-02 | Khóa ghế tạm thời | Khi user chọn ghế → Redis Distributed Lock khóa ghế trong **10 phút**. Hết thời gian không thanh toán → tự động nhả |
| BK-03 | Tạo đơn hàng | Tạo Order với trạng thái PENDING, ghi nhận thông tin ghế + giá + combo merchandise (nếu có) |
| BK-04 | Hủy đơn hàng | User hủy đơn trước khi thanh toán → nhả lock ghế ngay lập tức |
| BK-05 | Upsell Merchandise | Trong luồng đặt vé, gợi ý combo vật phẩm liên quan (VD: "Thêm Lightstick chỉ 200K") |

### 4.4. Phân hệ Thanh toán (Payment Service)

| Mã | Chức năng | Mô tả |
|---|---|---|
| PM-01 | Tích hợp VNPay | Redirect user sang cổng VNPay, xử lý callback IPN xác nhận thanh toán |
| PM-02 | Tích hợp MoMo | Tương tự VNPay, hỗ trợ thanh toán qua ví MoMo |
| PM-03 | Xử lý callback bất đồng bộ | Nhận kết quả thanh toán qua Kafka → cập nhật trạng thái Order → trigger sinh vé |
| PM-04 | Hoàn tiền (Refund) | Xử lý hoàn tiền khi hủy đơn hoặc sự kiện bị hủy (theo chính sách) |

### 4.5. Phân hệ Quản lý Vé (Ticket Service)

| Mã | Chức năng | Mô tả |
|---|---|---|
| TK-01 | Sinh vé điện tử | Sau thanh toán thành công → sinh vé với mã QR chứa TOTP seed riêng biệt |
| TK-02 | QR động (TOTP) | Mã QR hiển thị trên PWA/Wallet thay đổi mỗi **30 giây**, chống chụp ảnh chia sẻ |
| TK-03 | Tích hợp Wallet | Sinh file `.pkpass` (Apple) / Google Wallet Object để user thêm vé vào ví điện thoại |
| TK-04 | Check-in | Staff quét QR → xác thực TOTP → đánh dấu vé đã sử dụng |
| TK-05 | Check-in Offline | Staff App tải trước danh sách hash vé → xác thực local → sync kết quả khi có mạng |

### 4.6. Phân hệ Thương mại Vật phẩm (Merchandise Service)

| Mã | Chức năng | Mô tả |
|---|---|---|
| MC-01 | Quản lý sản phẩm | CRUD vật phẩm sự kiện (áo, lightstick, poster...) gắn với từng event |
| MC-02 | Quản lý tồn kho | Theo dõi số lượng tồn kho realtime, cảnh báo khi sắp hết hàng |
| MC-03 | Bán chéo (Upsell/Combo) | Organizer tạo combo "Vé + Vật phẩm" với giá ưu đãi, hiển thị trong luồng Booking |
| MC-04 | Đơn hàng vật phẩm | Xử lý đơn hàng merchandise độc lập hoặc gộp chung với đơn vé |

### 4.7. Phân hệ Sàn Giao dịch Vé Thứ cấp (Resale Service) ⭐ Highlight

| Mã | Chức năng | Mô tả |
|---|---|---|
| RS-01 | Niêm yết vé bán lại | User đăng bán vé khi không thể tham dự. Vé bị **đóng băng** (không thể sử dụng) trong thời gian niêm yết |
| RS-02 | Kiểm soát giá trần | Hệ thống tự động chặn nếu giá bán vượt quá **120% giá gốc**, ngăn chặn đầu cơ |
| RS-03 | Mua vé từ sàn | Người mua thanh toán qua hệ thống → tiền giữ tạm (Escrow logic) |
| RS-04 | Chuyển nhượng an toàn | Giao dịch thành công → **Hủy mã QR/TOTP seed cũ** của người bán → **Sinh mã QR/TOTP seed mới** cho người mua. Vé cũ hoàn toàn vô hiệu lực |
| RS-05 | Hủy niêm yết | Người bán rút vé khỏi sàn → vé được kích hoạt lại bình thường |

### 4.8. Phân hệ Trí tuệ Nhân tạo (AI Service) ⭐ Highlight

| Mã | Chức năng | Mô tả |
|---|---|---|
| AI-01 | **Recommender — Gợi ý sự kiện** | Phân tích nội dung mô tả sự kiện bằng **TF-IDF**, tính **Cosine Similarity** để gợi ý sự kiện tương tự với sự kiện user đang xem hoặc đã mua vé |
| AI-02 | **Recommender — Gợi ý vật phẩm** | Gợi ý merchandise phù hợp dựa trên sự kiện user quan tâm (VD: xem concert K-pop → gợi ý lightstick) |
| AI-03 | **Chatbot Q&A — Hỏi đáp sự kiện** | User hỏi bằng ngôn ngữ tự nhiên (VD: "Mấy giờ mở cổng?") → Hệ thống dùng **Semantic Search** (TF-IDF vectorize mô tả sự kiện) để tìm đoạn văn bản liên quan nhất và trả lời |
| AI-04 | **Chatbot Q&A — FAQ tự động** | Trả lời các câu hỏi thường gặp về quy định check-in, chính sách hoàn vé, hướng dẫn sử dụng dựa trên knowledge base |

### 4.9. Phân hệ Thông báo (Notification Service)

| Mã | Chức năng | Mô tả |
|---|---|---|
| NF-01 | Email thông báo | Gửi email xác nhận đặt vé, thanh toán thành công, nhắc nhở sự kiện sắp diễn ra |
| NF-02 | Push notification | Thông báo đẩy qua PWA khi có cập nhật về sự kiện, vé được chuyển nhượng thành công |
| NF-03 | Xử lý bất đồng bộ | Nhận message từ Kafka, đảm bảo không mất thông báo khi hệ thống tải cao |

---

## 5. YÊU CẦU PHI CHỨC NĂNG

| # | Yêu cầu | Mô tả chi tiết |
|---|---|---|
| NFR-01 | **Hiệu năng** | Luồng đặt vé xử lý ≥ 1.000 concurrent requests. API response time trung bình < 500ms |
| NFR-02 | **Tính nhất quán** | Zero Oversell — không bao giờ bán trùng ghế dù có hàng nghìn request đồng thời |
| NFR-03 | **Khả dụng** | Các service core (Booking, Payment, Ticket) có khả năng chạy nhiều instance, tự phục hồi khi 1 instance lỗi |
| NFR-04 | **Bảo mật** | JWT + RBAC phân quyền. TOTP chống giả mạo vé. HTTPS toàn bộ. Dữ liệu nhạy cảm được mã hóa |
| NFR-05 | **Khả năng mở rộng** | Mỗi microservice scale độc lập. Thêm service mới không ảnh hưởng service hiện tại |
| NFR-06 | **Offline-first** | PWA + Wallet đảm bảo user truy cập vé khi mất mạng. Staff App check-in offline |
| NFR-07 | **Khả năng quan sát** | Centralized logging, health check endpoint cho mỗi service, Eureka dashboard giám sát trạng thái |

---

## 6. GIẢI PHÁP KỸ THUẬT CHO CÁC BÀI TOÁN TRỌNG TÂM

### 6.1. Bài toán Flash Sale — Xử lý đặt vé tải cao (High Concurrency Booking)

**Vấn đề:** 1.000+ người dùng cùng lúc bấm chọn ghế A1 khi sự kiện hot mở bán. Nếu dùng database lock truyền thống (SELECT ... FOR UPDATE), hệ thống sẽ nghẽn và có nguy cơ bán trùng ghế.

**Giải pháp: Redis Distributed Lock với SETNX**

```
┌──────────┐     ┌──────────────┐     ┌──────────┐     ┌──────────┐
│  1000+   │────▶│   API        │────▶│  Redis    │────▶│ PostgreSQL│
│  Users   │     │   Gateway    │     │  SETNX    │     │  (Order)  │
└──────────┘     └──────────────┘     │  Atomic   │     └──────────┘
                                      └──────────┘
```

**Luồng xử lý:**
1. Request đến Booking Service → gọi lệnh `SETNX lock:event:{id}:seat:{seatId} {userId}` trên Redis.
2. Redis đảm bảo tính **Atomic**: trong hàng nghìn request đồng thời, chỉ đúng 1 lệnh SETNX trả về `true`.
3. **Người thắng:** Tạo đơn hàng trạng thái `PENDING` trong PostgreSQL, bắt đầu đếm ngược 10 phút.
4. **Người thua:** Nhận response ngay lập tức — "Ghế đã có người giữ, vui lòng chọn ghế khác".
5. **Hết 10 phút** không thanh toán → Redis TTL hết hạn → Lock tự động nhả → Ghế trở lại trạng thái trống.
6. **Thanh toán thành công** → Cập nhật Order sang `CONFIRMED`, xóa lock, đánh dấu ghế `SOLD` trong DB.

**Tại sao không dùng Database Lock?**
- DB Lock (Pessimistic Lock) tạo bottleneck tại tầng database, giới hạn throughput.
- Redis xử lý in-memory, latency ~1ms, throughput hàng trăm nghìn ops/giây — phù hợp cho flash sale.

### 6.2. Bài toán Chống vé giả — QR động với TOTP

**Vấn đề:** Người dùng chụp ảnh màn hình mã QR rồi gửi cho nhiều người khác cùng vào cổng.

**Giải pháp: Time-based One-Time Password (TOTP)**

```
┌─────────────────────────────────────────────────┐
│  Mỗi vé được gán 1 TOTP Secret Key riêng biệt  │
│                                                   │
│  QR Content = HMAC(secret, floor(time/30))        │
│                                                   │
│  Cứ mỗi 30 giây → QR code thay đổi hoàn toàn    │
│                                                   │
│  Ảnh chụp cũ → hết hạn sau 30s → KHÔNG hợp lệ   │
└─────────────────────────────────────────────────┘
```

**Cơ chế:**
1. Khi sinh vé, hệ thống tạo một `TOTP Secret` duy nhất cho mỗi vé, lưu trong DB.
2. Trên PWA/Wallet, client dùng secret + thời gian hiện tại để generate mã QR mới mỗi 30 giây (thuật toán RFC 6238).
3. Staff quét QR → gửi mã lên server (hoặc verify local) → server dùng cùng secret + time window để xác thực.
4. Ảnh chụp màn hình chỉ chứa mã tại thời điểm chụp → hết 30 giây là vô hiệu.

**Khi chuyển nhượng vé (Resale):** TOTP Secret cũ bị hủy, sinh secret mới cho người mua → người bán không thể sử dụng vé đã bán.

### 6.3. Bài toán Check-in Offline tại sự kiện

**Vấn đề:** Sân vận động/nhà thi đấu thường nghẽn mạng khi hàng nghìn người tập trung. Staff không thể gọi API để verify vé.

**Giải pháp: 3 lớp Offline**

| Lớp | Đối tượng | Cơ chế |
|---|---|---|
| **Lớp 1: Apple/Google Wallet** | User | Vé được lưu native trong ví điện thoại, hiển thị QR động offline (TOTP tính local) |
| **Lớp 2: PWA Cache** | User | Service Worker cache trang "Vé của tôi" + TOTP secret vào IndexedDB. Mất mạng vẫn mở được vé |
| **Lớp 3: Staff App Local Sync** | Staff | Trước sự kiện, app tải danh sách `{ticketHash, totpSecret}` về SQLite local. Quét QR → verify TOTP tại chỗ → ghi log check-in local → sync lên server khi có mạng |

### 6.4. Bài toán Giao tiếp giữa các Microservices — Event-Driven Architecture

**Vấn đề:** Khi thanh toán thành công, cần đồng thời: sinh vé, gửi email, cập nhật tồn kho merchandise, thông báo cho organizer. Nếu gọi đồng bộ (REST) sẽ tạo coupling chặt và chậm.

**Giải pháp: Apache Kafka làm Message Broker**

```
Payment Service ──publish──▶ [Topic: payment.completed]
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
              Ticket Service  Notification    Merchandise
              (Sinh vé)      Service         Service
                             (Gửi email)    (Trừ kho)
```

- Các service subscribe vào Kafka topic tương ứng, xử lý bất đồng bộ.
- Đảm bảo **at-least-once delivery**: không mất message ngay cả khi consumer tạm thời down.
- Giảm coupling: Payment Service không cần biết ai sẽ xử lý sau nó.

---

## 7. KIẾN TRÚC HỆ THỐNG

### 7.1. Kiến trúc tổng quan

```
                            ┌─────────────┐
                            │   Clients    │
                            │ PWA│Admin│App│
                            └──────┬──────┘
                                   │ HTTPS
                            ┌──────▼──────┐
                            │ API Gateway  │◄──── Rate Limiting
                            │(Spring Cloud)│      Load Balancing
                            └──────┬──────┘      JWT Validation
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
              ┌─────▼─────┐ ┌─────▼─────┐ ┌─────▼─────┐
              │   Core     │ │ Expansion │ │Intelligence│
              │ Services   │ │ Services  │ │ Services   │
              │            │ │           │ │            │
              │ Identity   │ │Merchandise│ │ AI Service │
              │ Catalog    │ │ Resale    │ │(Flask/Py)  │
              │ Booking    │ │           │ │Notification│
              │ Payment    │ │           │ │            │
              │ Ticket     │ │           │ │            │
              └─────┬──┬──┘ └─────┬─────┘ └─────┬─────┘
                    │  │          │              │
         ┌─────────┘  │    ┌─────┘              │
         ▼            ▼    ▼                    ▼
   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
   │PostgreSQL│ │  Redis    │ │ MongoDB  │ │Elastic-  │
   │(OLTP)    │ │(Cache/   │ │(Sơ đồ   │ │search    │
   │          │ │ Lock)    │ │ ghế JSON)│ │(Search)  │
   └──────────┘ └──────────┘ └──────────┘ └──────────┘
                       │
                 ┌─────▼─────┐
                 │  Apache    │
                 │  Kafka     │
                 │ (Async Msg)│
                 └───────────┘
```

### 7.2. Service Discovery & Configuration

- **Eureka Server:** Mỗi service khi khởi động tự đăng ký với Eureka. API Gateway tra cứu Eureka để route request đến instance khả dụng.
- **Config Server:** Quản lý cấu hình tập trung (database URL, API keys, feature flags) trên Git repository. Các service pull config khi khởi động.

### 7.3. Luồng dữ liệu chính — Đặt vé End-to-End

```
User chọn ghế ──▶ Gateway ──▶ Booking Service
                                    │
                              ┌─────▼─────┐
                              │ Redis SETNX│ ── Thất bại ──▶ "Ghế đã có người giữ"
                              │ (Lock ghế) │
                              └─────┬─────┘
                                    │ Thành công
                              ┌─────▼─────┐
                              │ Tạo Order  │
                              │ PENDING    │
                              └─────┬─────┘
                                    │
User thanh toán ──▶ Gateway ──▶ Payment Service ──▶ VNPay/MoMo
                                    │
                              VNPay callback (IPN)
                                    │
                              ┌─────▼─────┐
                              │   Kafka    │
                              │ publish:   │
                              │ payment.ok │
                              └──┬──┬──┬──┘
                                 │  │  │
                    ┌────────────┘  │  └────────────┐
                    ▼               ▼               ▼
              Ticket Service  Notification    Merchandise
              (Sinh vé +     (Email xác      (Trừ kho
               TOTP secret)   nhận)           combo)
                    │
                    ▼
              User nhận vé trên PWA / Wallet
```

---

## 8. CÔNG NGHỆ ÁP DỤNG

### 8.1. Backend

| Công nghệ | Vai trò | Lý do lựa chọn |
|---|---|---|
| **Java 17 + Spring Boot 3.2** | Nền tảng microservices chính | Hệ sinh thái Spring Cloud hoàn chỉnh (Gateway, Eureka, Config), cộng đồng lớn, hiệu năng tốt |
| **Python + Flask** | AI Service | Hệ sinh thái ML/AI phong phú (Scikit-learn, NumPy), phù hợp cho prototype nhanh |
| **PostgreSQL** | Database giao dịch (OLTP) | ACID compliance, hỗ trợ transaction phức tạp cho booking/payment |
| **MongoDB** | Lưu trữ sơ đồ ghế | Schema-free JSON phù hợp cho cấu trúc sơ đồ ghế linh hoạt (Zone/Block/Row) |
| **Redis** | Cache + Distributed Lock | In-memory, latency ~1ms, SETNX atomic — lý tưởng cho flash sale lock |
| **Apache Kafka** | Message broker | Throughput cao, đảm bảo thứ tự message, at-least-once delivery |
| **Elasticsearch** | Full-text search | Tìm kiếm sự kiện nhanh, hỗ trợ fuzzy search và filter phức tạp |
| **Spring Cloud Gateway** | API Gateway | Routing, rate limiting, JWT validation tập trung |
| **Spring Cloud Netflix Eureka** | Service Discovery | Tự động phát hiện và cân bằng tải giữa các service instance |
| **Spring Cloud Config** | Centralized Config | Quản lý cấu hình tập trung, hỗ trợ refresh config không cần restart |

### 8.2. Frontend

| Công nghệ | Ứng dụng | Lý do lựa chọn |
|---|---|---|
| **Next.js 14** | User Portal (PWA) | SSR/SSG tối ưu SEO, tích hợp PWA module dễ dàng, React ecosystem |
| **ReactJS** | Organizer Portal | SPA phù hợp cho admin dashboard, component-based architecture |
| **Flutter** | Staff App (Mobile) | Cross-platform (iOS + Android) từ 1 codebase, hiệu năng native-like, phù hợp cho app đơn chức năng |
| **JPasskit** | Sinh vé Wallet | Thư viện Java tạo file `.pkpass` cho Apple Wallet |

### 8.3. AI / Machine Learning

| Kỹ thuật | Ứng dụng | Chi tiết |
|---|---|---|
| **TF-IDF** (Term Frequency - Inverse Document Frequency) | Vector hóa văn bản | Chuyển mô tả sự kiện/vật phẩm thành vector số để so sánh |
| **Cosine Similarity** | Đo độ tương đồng | Tính góc giữa 2 vector TF-IDF → xếp hạng sự kiện/vật phẩm tương tự |
| **Semantic Search** | Chatbot Q&A | Vectorize câu hỏi user + mô tả sự kiện → tìm đoạn văn bản có similarity cao nhất → trích xuất câu trả lời |
| **Scikit-learn + NumPy** | Thư viện ML | Implement TF-IDF vectorizer, cosine similarity matrix |

### 8.4. DevOps & Infrastructure

| Công nghệ | Vai trò |
|---|---|
| **Docker + Docker Compose** | Container hóa mỗi service, đồng nhất môi trường dev/staging/production |
| **Git + GitHub** | Quản lý mã nguồn, branching strategy |

---

## 9. KẾ HOẠCH TRIỂN KHAI

### 9.1. Phân chia giai đoạn

| Giai đoạn | Thời gian | Nội dung | Deliverable |
|---|---|---|---|
| **Phase 1: Foundation** | Tuần 1–3 | Setup infrastructure (Eureka, Gateway, Config Server), Identity Service, Catalog Service cơ bản | Hệ thống microservices chạy được, đăng ký/đăng nhập, CRUD sự kiện |
| **Phase 2: Core Booking** | Tuần 4–7 | Booking Service (Redis Lock), Payment Service (VNPay/MoMo), Ticket Service (sinh vé + QR) | Luồng đặt vé → thanh toán → nhận vé hoàn chỉnh |
| **Phase 3: Sơ đồ ghế + PWA** | Tuần 8–9 | Sơ đồ ghế động (MongoDB), PWA offline, tích hợp Apple/Google Wallet | User chọn ghế trực quan, nhận vé offline |
| **Phase 4: Expansion** | Tuần 10–12 | Merchandise Service, Resale Service (sàn giao dịch thứ cấp) | Mua vật phẩm, chuyển nhượng vé an toàn |
| **Phase 5: Intelligence** | Tuần 13–14 | AI Recommender, Chatbot Q&A, Notification Service | Gợi ý thông minh, hỏi đáp tự động |
| **Phase 6: Staff App + Polish** | Tuần 15–16 | Staff App Flutter (check-in offline), testing toàn diện, tối ưu hiệu năng | Hệ thống hoàn chỉnh, sẵn sàng demo |

### 9.2. Chiến lược kiểm thử

| Loại test | Phạm vi | Công cụ |
|---|---|---|
| Unit Test | Logic nghiệp vụ từng service | JUnit 5, Mockito |
| Integration Test | Giao tiếp giữa service ↔ DB, service ↔ Redis, service ↔ Kafka | Spring Boot Test, Testcontainers |
| Load Test | Mô phỏng flash sale 1.000+ concurrent users | JMeter / k6 |
| E2E Test | Luồng đặt vé end-to-end từ UI đến DB | Manual + Postman Collection |

---

## 10. KẾT QUẢ DỰ KIẾN

### 10.1. Sản phẩm bàn giao

1. **User Portal (Web PWA):** Giao diện mua vé, mua vật phẩm, xem vé offline, tham gia sàn giao dịch, chat với AI.
2. **Organizer Portal (Web Admin):** Dashboard quản lý sự kiện, vẽ sơ đồ ghế, báo cáo doanh thu.
3. **Staff App (Mobile Flutter):** Ứng dụng soát vé QR với khả năng check-in offline.
4. **Hệ thống Backend Microservices:** 10+ services chạy trên Docker, giao tiếp qua API Gateway + Kafka.
5. **AI Module:** Recommender gợi ý sự kiện/vật phẩm + Chatbot Q&A tự động.
6. **Tài liệu:** Đề cương, báo cáo đồ án, API documentation, hướng dẫn triển khai.

### 10.2. Chỉ số đánh giá thành công

| Tiêu chí | Mục tiêu |
|---|---|
| Luồng đặt vé hoàn chỉnh | User chọn ghế → thanh toán → nhận vé → check-in thành công |
| Zero Oversell | Load test 1.000 concurrent requests cùng 1 ghế → chỉ 1 người đặt được |
| QR động hoạt động | Mã QR thay đổi mỗi 30 giây, ảnh chụp cũ bị từ chối |
| Offline check-in | Staff App verify vé thành công khi không có kết nối mạng |
| AI Recommender | Gợi ý sự kiện tương tự có độ liên quan hợp lý (đánh giá định tính) |
| Chatbot Q&A | Trả lời đúng ≥ 70% câu hỏi về thông tin sự kiện trên tập test |
| Sàn giao dịch | Chuyển nhượng vé thành công, QR cũ bị vô hiệu, QR mới hoạt động |

---

## 11. TÀI LIỆU THAM KHẢO

1. Sam Newman, *Building Microservices: Designing Fine-Grained Systems*, O'Reilly Media, 2nd Edition, 2021.
2. Chris Richardson, *Microservices Patterns: With Examples in Java*, Manning Publications, 2018.
3. Martin Kleppmann, *Designing Data-Intensive Applications*, O'Reilly Media, 2017.
4. Spring Cloud Documentation — https://spring.io/projects/spring-cloud
5. Redis Documentation — Distributed Locks (Redlock) — https://redis.io/docs/manual/patterns/distributed-locks/
6. RFC 6238 — TOTP: Time-Based One-Time Password Algorithm — https://datatracker.ietf.org/doc/html/rfc6238
7. Apache Kafka Documentation — https://kafka.apache.org/documentation/
8. Scikit-learn Documentation — TF-IDF Vectorizer — https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.TfidfVectorizer.html
9. Apple Developer — Wallet Passes — https://developer.apple.com/wallet/
10. Google Developers — Google Wallet API — https://developers.google.com/wallet
