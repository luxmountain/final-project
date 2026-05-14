# SCENARIO (PTTK) + ACTIVITY DIAGRAM + MÔ TẢ LUỒNG ACTIVITY
## (Mẫu SRS1 – UC-09 đến UC-16)

---

## UC-09: Phát hành vé điện tử, QR động và NFT Ticket

### 1. Scenario (Kịch bản PTTK)

| Thuộc tính | Nội dung |
|---|---|
| Mã Use Case | UC-09 |
| Tên Use Case | Phát hành vé điện tử, QR động và NFT Ticket |
| Actor chính | SYSTEM |
| Actor phụ | USER |
| Mục tiêu | Phát hành vé điện tử sau thanh toán, tạo QR động chống giả mạo và ghi nhận NFT/on-chain nếu áp dụng |
| Tiền điều kiện | Đơn hàng đã thanh toán thành công (Payment Service gửi event PAYMENT_CONFIRMED qua Kafka) |
| Hậu điều kiện | Vé điện tử được tạo, liên kết với người mua và hiển thị trong ví vé |
| Kịch bản chính (Main Scenario) | 1. Hệ thống nhận sự kiện thanh toán thành công từ Kafka topic `payment-events`.<br>2. Hệ thống tạo Ticket ID duy nhất cho từng vé trong đơn hàng.<br>3. Hệ thống mapping ticket với order, user, event, seat và ticket class.<br>4. Hệ thống sinh TOTP Secret (RFC 6238) cho từng vé.<br>5. Hệ thống tạo QR động thay đổi theo chu kỳ 30 giây.<br>6. Hệ thống kiểm tra cấu hình blockchain của sự kiện.<br>7. Nếu blockchain được bật: Hệ thống mint NFT Ticket (ERC-721 trên Polygon) và ghi transaction hash.<br>8. Hệ thống lưu metadata vé vào database (PostgreSQL schema: tickets).<br>9. Hệ thống publish event TICKET_ISSUED lên Kafka topic `ticket-events`.<br>10. Notification Service nhận event và gửi thông báo vé đã sẵn sàng cho người dùng (Email/Push). |
| Kịch bản thay thế / Ngoại lệ | A1. Mint NFT thất bại → Vé vẫn được phát hành ở trạng thái off-chain, hệ thống đưa vào retry queue và thử lại sau.<br>A2. Lỗi phát hành vé (DB timeout, service crash) → Hệ thống rollback transaction hoặc đưa vào dead-letter queue để xử lý lại.<br>A3. Seat mapping lỗi (ghế không tồn tại hoặc đã bị hủy) → Hệ thống cảnh báo Admin qua Notification Service để xử lý ngoại lệ. |
| Quy tắc nghiệp vụ | - Mỗi vé phải có Ticket ID duy nhất (UUID v4).<br>- QR động phải được tạo từ TOTP Secret riêng của vé, xoay mã mỗi 30 giây.<br>- QR/TOTP cũ phải bị vô hiệu khi vé được chuyển nhượng resale.<br>- Transaction hash blockchain không được sửa đổi (immutable). |

### 2. Mô tả luồng Activity Diagram (Dạng bảng – Mẫu SRS1)

| STT | Hoạt động (Activity) | Actor thực hiện | Mô tả chi tiết | Điều kiện rẽ nhánh |
|---|---|---|---|---|
| 1 | Nhận event PAYMENT_CONFIRMED | Ticket Service | Ticket Service subscribe Kafka topic `payment-events`, nhận message chứa order_id, user_id, event_id, seats[], amount, status=SUCCESS | — |
| 2 | Tạo Ticket ID | Ticket Service | Sinh UUID v4 duy nhất cho mỗi seat trong danh sách seats[] của đơn hàng | — |
| 3 | Mapping ticket metadata | Ticket Service | Ghi nhận liên kết: ticket_id ↔ order_id ↔ user_id ↔ event_id ↔ seat_id ↔ ticket_class | — |
| 4 | Sinh TOTP Secret | Ticket Service | Tạo TOTP Secret theo chuẩn RFC 6238 (Base32, 160-bit) cho từng ticket | — |
| 5 | Tạo QR động | Ticket Service | Từ TOTP Secret, sinh mã OTP hiện tại và encode thành QR Code. QR tự động refresh mỗi 30 giây khi hiển thị trên client | — |
| 6 | Kiểm tra cấu hình blockchain | Ticket Service | Truy vấn Event Service (gRPC) để kiểm tra event có bật tính năng NFT Ticketing hay không | Có bật → Bước 7. Không bật → Bước 8 |
| 7 | Mint NFT Ticket | Blockchain Service | Gọi smart contract ERC-721 trên Polygon, mint NFT với metadata (ticket_id, event_id, seat_id, owner). Upload metadata lên IPFS (Pinata). Lưu transaction hash | Thành công → Bước 8. Thất bại → A1: Đánh dấu trạng thái off-chain, đưa vào retry queue |
| 8 | Lưu vé vào database | Ticket Service | INSERT vào PostgreSQL schema `tickets` với trạng thái ACTIVE, bao gồm totp_secret_hash, nft_tx_hash (nếu có) | Thành công → Bước 9. Thất bại → A2: Rollback và đưa vào dead-letter queue |
| 9 | Publish event TICKET_ISSUED | Ticket Service | Publish message lên Kafka topic `ticket-events` với payload: ticket_id, user_id, event_id, seat_id, action=ISSUED | — |
| 10 | Gửi thông báo cho người dùng | Notification Service | Nhận event từ `ticket-events`, gửi Email xác nhận vé + Push notification "Vé của bạn đã sẵn sàng" | — |
| 11 | Hiển thị vé trong ví | Client (React PWA) | Người dùng mở ví vé điện tử, hệ thống hiển thị danh sách vé mới với QR động auto-refresh 30s | — |

---


## UC-10: Quản lý ví vé điện tử của người dùng

### 1. Scenario (Kịch bản PTTK)

| Thuộc tính | Nội dung |
|---|---|
| Mã Use Case | UC-10 |
| Tên Use Case | Quản lý ví vé điện tử |
| Actor chính | USER |
| Actor phụ | SYSTEM |
| Mục tiêu | Cho phép người dùng xem và quản lý vé điện tử đã mua |
| Tiền điều kiện | Người dùng đã đăng nhập và có ít nhất một vé hợp lệ trong ví |
| Hậu điều kiện | Người dùng xem được thông tin vé, trạng thái vé và QR động |
| Kịch bản chính (Main Scenario) | 1. Người dùng truy cập ví vé điện tử từ menu chính.<br>2. Hệ thống truy vấn Ticket Service để lấy danh sách vé theo user_id.<br>3. Hệ thống hiển thị danh sách vé được nhóm theo sự kiện (upcoming / past).<br>4. Người dùng chọn một vé cụ thể.<br>5. Hệ thống hiển thị chi tiết vé: tên sự kiện, ngày giờ, địa điểm, seat, ticket class, trạng thái.<br>6. Hệ thống hiển thị QR động (auto-refresh 30s) cho vé có trạng thái ACTIVE.<br>7. Người dùng có thể chọn: Xem hướng dẫn vào cổng / Lưu vé vào Apple/Google Wallet / Niêm yết resale (nếu đủ điều kiện). |
| Kịch bản thay thế / Ngoại lệ | A1. Vé đã refund → Hệ thống hiển thị trạng thái REFUNDED, ẩn QR động, hiển thị thông tin hoàn tiền.<br>A2. Vé đã used → Hệ thống hiển thị trạng thái USED kèm lịch sử check-in (thời gian, cổng).<br>A3. Vé đang resale → Hệ thống hiển thị trạng thái FROZEN/LISTED, ẩn QR động, hiển thị link đến listing trên Resale Market. |
| Quy tắc nghiệp vụ | - Chỉ chủ sở hữu hiện tại (current owner) mới được xem QR động của vé.<br>- Vé đã used/refunded không được niêm yết resale.<br>- QR động phải cập nhật theo chu kỳ 30s, không phụ thuộc ảnh chụp màn hình tĩnh.<br>- Hỗ trợ lưu vé vào Apple Wallet (PKPass) và Google Wallet (JWT Pass) nếu được cấu hình. |

### 2. Mô tả luồng Activity Diagram (Dạng bảng – Mẫu SRS1)

| STT | Hoạt động (Activity) | Actor thực hiện | Mô tả chi tiết | Điều kiện rẽ nhánh |
|---|---|---|---|---|
| 1 | Truy cập ví vé | USER | Người dùng nhấn vào mục "Ví vé" / "My Tickets" trên giao diện chính | — |
| 2 | Gửi request lấy danh sách vé | Client (React) | Gọi API GET /tickets?user_id={id} qua API Gateway, đính kèm JWT token | — |
| 3 | Xác thực JWT | API Gateway | Kiểm tra token hợp lệ, extract user_id từ payload | Token hợp lệ → Bước 4. Token hết hạn → Refresh token flow |
| 4 | Truy vấn danh sách vé | Ticket Service | Query PostgreSQL schema `tickets` WHERE owner_id = user_id, JOIN với Event Service để lấy thông tin sự kiện | — |
| 5 | Trả về danh sách vé | Ticket Service → Client | Response JSON chứa array tickets[] với các trường: ticket_id, event_name, date, venue, seat, class, status | — |
| 6 | Hiển thị danh sách vé | Client (React) | Render danh sách vé, nhóm theo: Sắp diễn ra (upcoming) và Đã qua (past). Hiển thị badge trạng thái (ACTIVE/USED/REFUNDED/FROZEN) | — |
| 7 | Chọn xem chi tiết vé | USER | Người dùng tap/click vào một vé cụ thể | — |
| 8 | Kiểm tra trạng thái vé | Client + Ticket Service | Xác định trạng thái hiện tại của vé | ACTIVE → Bước 9. USED → A2. REFUNDED → A1. FROZEN → A3 |
| 9 | Hiển thị QR động | Client (React) | Lấy TOTP Secret (đã lưu local hoặc request từ server), sinh OTP code hiện tại, encode thành QR. Đặt setInterval refresh mỗi 30s với countdown UI | — |
| 10 | Hiển thị thông tin chi tiết | Client (React) | Hiển thị đầy đủ: tên sự kiện, ngày giờ, địa điểm, khu vực, hàng, ghế, hạng vé, mã vé, hướng dẫn vào cổng | — |
| 11 | Chọn hành động bổ sung | USER | Người dùng có thể: (a) Lưu vào Wallet → Gọi API tạo PKPass/JWT Pass. (b) Niêm yết resale → Chuyển sang UC-13. (c) Xem hướng dẫn → Hiển thị modal hướng dẫn | — |

---


## UC-11: Check-in vé tại cổng

### 1. Scenario (Kịch bản PTTK)

| Thuộc tính | Nội dung |
|---|---|
| Mã Use Case | UC-11 |
| Tên Use Case | Check-in vé tại cổng |
| Actor chính | USER, STAFF |
| Actor phụ | — |
| Mục tiêu | Cho phép Staff quét QR động để xác thực vé và đánh dấu người dùng đã vào cổng |
| Tiền điều kiện | Staff đã đăng nhập Staff App (PWA), được phân quyền cổng check-in; USER có vé hợp lệ với trạng thái ACTIVE |
| Hậu điều kiện | Vé hợp lệ được chuyển sang trạng thái USED; vé không hợp lệ bị từ chối |
| Kịch bản chính (Main Scenario) | 1. Staff mở Staff App/PWA trên thiết bị di động.<br>2. Staff chọn sự kiện và cổng được phân công.<br>3. Staff kích hoạt camera để quét QR.<br>4. USER xuất trình QR động trên ví vé điện tử.<br>5. Staff App quét và giải mã QR code.<br>6. Hệ thống (Ticket Service) verify TOTP: kiểm tra OTP code hợp lệ trong khoảng ±1 chu kỳ (±30s).<br>7. Hệ thống kiểm tra: vé đúng sự kiện, đúng thời gian, chưa used, chưa refund, không bị freeze.<br>8. Hệ thống trả kết quả CHECK-IN VALID (màn hình xanh + thông tin ghế).<br>9. Staff cho phép USER vào cổng.<br>10. Hệ thống đánh dấu vé là USED, ghi log check-in (ticket_id, gate_id, staff_id, timestamp).<br>11. Hệ thống publish event lên Kafka topic `checkin-events`. |
| Kịch bản thay thế / Ngoại lệ | A1. QR hết hạn/sai (TOTP verify fail) → Hệ thống hiển thị CHECK-IN INVALID (màn hình đỏ), Staff từ chối vào cổng.<br>A2. Vé đã check-in trước đó → Hệ thống cảnh báo "Vé đã sử dụng" kèm thời điểm check-in lần đầu, Staff từ chối.<br>A3. Vé không thuộc sự kiện/cổng hiện tại → Hệ thống từ chối, hiển thị "Sai sự kiện/cổng".<br>A4. Mất mạng → Staff App chuyển sang chế độ offline (UC-12). |
| Quy tắc nghiệp vụ | - Vé chỉ được check-in một lần duy nhất.<br>- Staff chỉ được check-in tại cổng được phân công.<br>- Mọi lần quét (thành công/thất bại) phải được ghi log.<br>- Dynamic QR phải được xác thực theo thời gian hiện tại và khoảng lệch cho phép (±30s).<br>- Thời gian từ quét QR đến hiển thị kết quả ≤ 2 giây. |

### 2. Mô tả luồng Activity Diagram (Dạng bảng – Mẫu SRS1)

| STT | Hoạt động (Activity) | Actor thực hiện | Mô tả chi tiết | Điều kiện rẽ nhánh |
|---|---|---|---|---|
| 1 | Mở Staff App | STAFF | Staff truy cập PWA Staff App trên trình duyệt mobile, đăng nhập với tài khoản role=STAFF | — |
| 2 | Chọn sự kiện và cổng | STAFF | Staff chọn sự kiện đang diễn ra và cổng check-in được phân công từ danh sách | — |
| 3 | Kích hoạt camera quét QR | STAFF | Staff nhấn nút "Quét vé", trình duyệt yêu cầu quyền camera (Web API), hiển thị viewfinder | — |
| 4 | Xuất trình QR động | USER | USER mở ví vé trên điện thoại, chọn vé, màn hình hiển thị QR động đang auto-refresh 30s | — |
| 5 | Quét và giải mã QR | Staff App | Camera capture QR code, decode ra payload chứa: ticket_id + current_otp | — |
| 6 | Gửi request verify | Staff App → Ticket Service | POST /tickets/check-in với body: {ticket_id, otp_code, gate_id, staff_id, event_id} | — |
| 7 | Verify TOTP | Ticket Service | Lấy totp_secret của ticket_id từ DB, tính toán OTP window (current ± 1 step), so sánh với otp_code nhận được | TOTP hợp lệ → Bước 8. TOTP không hợp lệ → A1: Trả về INVALID |
| 8 | Kiểm tra trạng thái vé | Ticket Service | Kiểm tra: status=ACTIVE, event_id khớp, thời gian sự kiện hợp lệ, vé không bị freeze | Tất cả OK → Bước 9. Vé đã USED → A2. Sai sự kiện → A3 |
| 9 | Cập nhật trạng thái USED | Ticket Service | UPDATE tickets SET status='USED', checked_at=NOW(), checked_by=staff_id, gate_id=gate_id | — |
| 10 | Ghi log check-in | Ticket Service | INSERT vào bảng checkin_logs: ticket_id, gate_id, staff_id, checked_at, is_valid=true | — |
| 11 | Publish event checkin | Ticket Service | Publish lên Kafka topic `checkin-events`: {ticket_id, gate_id, checked_at, staff_id, is_valid=true} | — |
| 12 | Hiển thị kết quả | Staff App | Màn hình xanh "✓ CHECK-IN THÀNH CÔNG" + hiển thị: tên khách, khu vực, hàng, ghế. Tự động reset sau 3s để quét vé tiếp | — |
| 13 | Cho phép vào cổng | STAFF | Staff xác nhận bằng mắt kết quả trên màn hình và cho USER đi qua cổng | — |

---


## UC-12: Check-in offline và đồng bộ dữ liệu

### 1. Scenario (Kịch bản PTTK)

| Thuộc tính | Nội dung |
|---|---|
| Mã Use Case | UC-12 |
| Tên Use Case | Check-in offline và đồng bộ dữ liệu |
| Actor chính | STAFF |
| Actor phụ | SYSTEM |
| Mục tiêu | Đảm bảo Staff vẫn có thể check-in khi mất kết nối mạng và đồng bộ lại khi online |
| Tiền điều kiện | Staff đã preload dữ liệu hash vé (TOTP secrets mã hóa) trước sự kiện khi còn kết nối mạng |
| Hậu điều kiện | Dữ liệu check-in offline được lưu cục bộ (IndexedDB) và đồng bộ về server khi có mạng |
| Kịch bản chính (Main Scenario) | 1. Trước sự kiện (khi có mạng), Staff mở Staff App và tải trước danh sách hash vé được phân quyền.<br>2. Service Worker cache dữ liệu vé (ticket_id + totp_secret_hash) vào IndexedDB.<br>3. Khi mất mạng, Staff App tự động phát hiện và chuyển sang offline mode (hiển thị indicator).<br>4. Staff quét QR của USER.<br>5. Staff App verify TOTP local: giải mã QR → lấy ticket_id + otp_code → tra cứu totp_secret trong IndexedDB → tính toán verify.<br>6. Nếu hợp lệ: Ghi nhận check-in cục bộ vào IndexedDB (ticket_id, timestamp, gate_id, staff_id, is_valid=true). Đánh dấu vé đã used trong local cache.<br>7. Khi có mạng trở lại, Service Worker kích hoạt Background Sync.<br>8. Staff App gửi batch check-in logs về Ticket Service (POST /tickets/sync-checkin).<br>9. Server xử lý từng record: kiểm tra conflict (vé đã được check-in bởi thiết bị khác?) và cập nhật trạng thái. |
| Kịch bản thay thế / Ngoại lệ | A1. Vé không có trong cache (chưa preload hoặc vé mới phát hành sau khi preload) → Staff App hiển thị "Không thể xác minh offline – cần kết nối mạng" hoặc đánh dấu cần xác minh thủ công.<br>A2. Trùng check-in giữa hai thiết bị offline → Server xử lý conflict theo rule: ưu tiên timestamp sớm nhất (first-come-first-served), đánh dấu record sau là duplicate.<br>A3. Dữ liệu cache hết hạn (quá 24h kể từ preload) → Staff App yêu cầu đồng bộ lại khi có mạng trước khi cho phép check-in offline. |
| Quy tắc nghiệp vụ | - Dữ liệu cache phải được mã hóa (AES-256) trên thiết bị.<br>- Offline log không được sửa/xóa thủ công (append-only trong IndexedDB).<br>- Khi sync, server phải phát hiện vé bị check-in trùng và xử lý theo timestamp.<br>- Preload data chỉ chứa hash vé thuộc cổng/sự kiện được phân quyền cho Staff đó. |

### 2. Mô tả luồng Activity Diagram (Dạng bảng – Mẫu SRS1)

| STT | Hoạt động (Activity) | Actor thực hiện | Mô tả chi tiết | Điều kiện rẽ nhánh |
|---|---|---|---|---|
| 1 | Preload dữ liệu vé | STAFF (khi có mạng) | Staff mở Staff App, chọn sự kiện/cổng, nhấn "Tải dữ liệu offline". App gọi API GET /tickets/offline-pack?event_id={}&gate_id={} | — |
| 2 | Cache vào IndexedDB | Service Worker | Nhận response chứa danh sách {ticket_id, totp_secret_encrypted, seat_info, status}. Lưu vào IndexedDB, mã hóa AES-256 với device key | — |
| 3 | Phát hiện mất mạng | Staff App (PWA) | Navigator.onLine = false hoặc fetch fail → Chuyển UI sang offline mode, hiển thị badge "OFFLINE" | — |
| 4 | Quét QR (offline) | STAFF | Staff quét QR động của USER bằng camera. Decode ra: ticket_id + current_otp | — |
| 5 | Tra cứu vé trong local cache | Staff App | Tìm ticket_id trong IndexedDB | Tìm thấy → Bước 6. Không tìm thấy → A1: Hiển thị cảnh báo |
| 6 | Verify TOTP local | Staff App | Giải mã totp_secret từ IndexedDB, tính OTP window (current ± 1 step), so sánh với otp_code | TOTP hợp lệ → Bước 7. Không hợp lệ → Hiển thị INVALID |
| 7 | Kiểm tra trạng thái local | Staff App | Kiểm tra trong IndexedDB: vé chưa bị đánh dấu USED trong local cache | Chưa used → Bước 8. Đã used → Hiển thị "Vé đã sử dụng" |
| 8 | Ghi nhận check-in cục bộ | Staff App | INSERT vào IndexedDB bảng offline_checkin_logs: {ticket_id, gate_id, staff_id, checked_at, is_valid, sync_status='PENDING'}. Đánh dấu vé = USED trong local cache | — |
| 9 | Hiển thị kết quả | Staff App | Màn hình xanh "✓ CHECK-IN OK (OFFLINE)" + thông tin ghế. Badge "Chờ đồng bộ" | — |
| 10 | Phát hiện có mạng trở lại | Service Worker | Navigator.onLine = true → Kích hoạt Background Sync event | — |
| 11 | Gửi batch sync | Service Worker | Lấy tất cả records có sync_status='PENDING' từ IndexedDB. POST /tickets/sync-checkin với body: [{ticket_id, gate_id, staff_id, checked_at, is_valid},...] | — |
| 12 | Xử lý conflict trên server | Ticket Service | Với mỗi record: Nếu vé chưa USED trên server → UPDATE status=USED. Nếu vé đã USED (by another device) → Đánh dấu record là DUPLICATE, log conflict | — |
| 13 | Trả kết quả sync | Ticket Service → Staff App | Response: {synced: N, conflicts: M, details: [...]}. Staff App cập nhật sync_status='SYNCED' hoặc 'CONFLICT' trong IndexedDB | — |

---


## UC-13: Giao dịch vé thứ cấp trên Resale Market

### 1. Scenario (Kịch bản PTTK)

| Thuộc tính | Nội dung |
|---|---|
| Mã Use Case | UC-13 |
| Tên Use Case | Giao dịch vé thứ cấp trên Resale Market |
| Actor chính | USER (Seller), USER (Buyer) |
| Actor phụ | ADMIN |
| Mục tiêu | Cho phép người dùng bán lại/mua lại vé an toàn, có escrow và chống đầu cơ |
| Tiền điều kiện | Người bán sở hữu vé hợp lệ (status=ACTIVE, chưa used/refund); sự kiện cho phép resale |
| Hậu điều kiện | Vé được chuyển quyền sở hữu cho người mua, QR/TOTP cũ bị hủy và QR/TOTP mới được cấp |
| Kịch bản chính (Main Scenario) | 1. Người bán truy cập ví vé và chọn vé muốn niêm yết resale.<br>2. Hệ thống (Resale Service) kiểm tra điều kiện vé: status=ACTIVE, sự kiện cho phép resale, vé chưa có listing active.<br>3. Người bán nhập giá bán mong muốn.<br>4. Hệ thống kiểm tra giá không vượt trần quy định (≤120% giá gốc).<br>5. Hệ thống freeze vé (status=FROZEN) và tạo listing trên Resale Market.<br>6. Người mua tìm kiếm/duyệt vé resale trên marketplace.<br>7. Người mua chọn listing và xác nhận mua.<br>8. Hệ thống giữ tiền qua escrow (Payment Service tạo escrow transaction).<br>9. Sau thanh toán thành công: Hệ thống chuyển quyền sở hữu vé (owner_id = buyer_id).<br>10. Hệ thống vô hiệu hóa TOTP Secret cũ của người bán.<br>11. Hệ thống sinh TOTP Secret mới cho người mua.<br>12. Hệ thống giải ngân cho người bán (trừ phí nền tảng) theo chính sách payout.<br>13. Hệ thống publish event lên Kafka topic `resale-events`. Notification Service gửi thông báo cho cả hai bên. |
| Kịch bản thay thế / Ngoại lệ | A1. Giá bán vượt trần (>120% giá gốc) → Hệ thống từ chối tạo listing, hiển thị thông báo lỗi.<br>A2. Người bán hủy listing trước khi có người mua → Hệ thống unfreeze vé (status=ACTIVE), xóa listing.<br>A3. Thanh toán thất bại → Listing vẫn còn hiệu lực, vé vẫn FROZEN, thông báo buyer thanh toán thất bại.<br>A4. Có tranh chấp → Admin can thiệp: có thể hoàn tiền buyer từ escrow hoặc giữ escrow chờ xử lý. |
| Quy tắc nghiệp vụ | - Vé resale phải chưa check-in, chưa refund, chưa bị khóa.<br>- Một vé chỉ được có một listing active tại một thời điểm.<br>- Giá resale không vượt quá 120% giá gốc.<br>- Khi chuyển nhượng thành công, TOTP Secret cũ phải bị vô hiệu hoàn toàn, NFT ownership phải được transfer on-chain (nếu có). |

### 2. Mô tả luồng Activity Diagram (Dạng bảng – Mẫu SRS1)

| STT | Hoạt động (Activity) | Actor thực hiện | Mô tả chi tiết | Điều kiện rẽ nhánh |
|---|---|---|---|---|
| 1 | Chọn vé niêm yết | USER (Seller) | Từ ví vé, seller chọn vé ACTIVE và nhấn "Bán lại" | — |
| 2 | Kiểm tra điều kiện vé | Resale Service | Verify: status=ACTIVE, event.allow_resale=true, không có listing active nào cho ticket_id này | Đủ điều kiện → Bước 3. Không đủ → Trả lỗi |
| 3 | Nhập giá bán | USER (Seller) | Seller nhập giá mong muốn. UI hiển thị giá gốc và giá trần (120%) để tham khảo | — |
| 4 | Validate giá trần | Resale Service | Kiểm tra: asking_price ≤ original_price × 1.2 | Hợp lệ → Bước 5. Vượt trần → A1: Từ chối |
| 5 | Freeze vé + Tạo listing | Resale Service + Ticket Service | Ticket Service: UPDATE status='FROZEN'. Resale Service: INSERT listing (ticket_id, seller_id, asking_price, status='ACTIVE', created_at) | — |
| 6 | Hiển thị trên marketplace | Resale Service | Listing xuất hiện trên trang Resale Market, có thể tìm kiếm/lọc theo sự kiện, giá, khu vực | — |
| 7 | Tìm kiếm và chọn mua | USER (Buyer) | Buyer duyệt marketplace, chọn listing phù hợp, nhấn "Mua ngay" | — |
| 8 | Tạo escrow transaction | Payment Service | Tạo giao dịch escrow: giữ tiền buyer (asking_price) trong tài khoản trung gian. Buyer thanh toán qua MoMo/VNPay | Thanh toán OK → Bước 9. Thất bại → A3 |
| 9 | Chuyển quyền sở hữu | Resale Service + Ticket Service | UPDATE tickets SET owner_id=buyer_id. UPDATE listing SET status='SOLD' | — |
| 10 | Hủy TOTP cũ | Ticket Service | Xóa/vô hiệu totp_secret cũ của seller. Nếu có NFT: gọi Blockchain Service transfer ownership on-chain | — |
| 11 | Sinh TOTP mới | Ticket Service | Tạo TOTP Secret mới (RFC 6238) cho buyer. Vé trở lại status='ACTIVE' với owner mới | — |
| 12 | Giải ngân cho seller | Payment Service + Finance Service | Release escrow: chuyển tiền cho seller (trừ platform_fee). Ghi nhận revenue sharing | — |
| 13 | Publish event + Thông báo | Resale Service + Notification Service | Publish `resale-events`: {listing_id, seller_id, buyer_id, old_ticket_id, new_ticket_id, escrow_amount}. Gửi notification cho cả seller và buyer | — |

---


## UC-14: Quản lý merchandise, combo và tồn kho

### 1. Scenario (Kịch bản PTTK)

| Thuộc tính | Nội dung |
|---|---|
| Mã Use Case | UC-14 |
| Tên Use Case | Quản lý merchandise, combo và tồn kho |
| Actor chính | ORGANIZER |
| Actor phụ | USER, SYSTEM |
| Mục tiêu | Cho phép Organizer bán vật phẩm sự kiện, quản lý tồn kho và tạo combo vé + merchandise |
| Tiền điều kiện | Organizer đã được phê duyệt (role=ORGANIZER active); sự kiện đã được tạo |
| Hậu điều kiện | Merchandise được tạo, có thể bán độc lập hoặc bán kèm vé; tồn kho được cập nhật realtime |
| Kịch bản chính (Main Scenario) | 1. Organizer truy cập module Merchandise trên Organizer Portal.<br>2. Organizer tạo sản phẩm mới: nhập tên, mô tả, upload hình ảnh, SKU, giá, biến thể (size/color), số lượng tồn kho.<br>3. Hệ thống validate: SKU duy nhất trong phạm vi Organizer, giá > 0, tồn kho ≥ 0.<br>4. Organizer gắn sản phẩm với sự kiện cụ thể.<br>5. Organizer tạo combo vé + merchandise (VD: Vé VIP + Áo thun + Lightstick) hoặc cấu hình upsell popup.<br>6. Sản phẩm hiển thị trên trang mua hàng của sự kiện.<br>7. USER thêm merchandise vào giỏ hàng (trong luồng mua vé hoặc mua độc lập).<br>8. Sau thanh toán thành công, Merchandise Service nhận event từ Kafka topic `stock-events`.<br>9. Hệ thống trừ tồn kho realtime (atomic decrement).<br>10. Nếu tồn kho xuống dưới ngưỡng cảnh báo → Notification Service gửi alert cho Organizer. |
| Kịch bản thay thế / Ngoại lệ | A1. SKU trùng → Hệ thống từ chối tạo sản phẩm, hiển thị lỗi "SKU đã tồn tại".<br>A2. Tồn kho không đủ khi thanh toán → Booking Service kiểm tra stock trước khi confirm order; nếu hết hàng → yêu cầu USER cập nhật giỏ hàng.<br>A3. Sản phẩm ngừng bán → Organizer đánh dấu inactive, hệ thống ẩn khỏi trang mua hàng. |
| Quy tắc nghiệp vụ | - SKU phải duy nhất trong phạm vi Organizer (tenant isolation).<br>- Không bán vượt tồn kho (stock ≥ 0 luôn đúng).<br>- Tồn kho chỉ trừ khi thanh toán thành công (event-driven via Kafka).<br>- Combo phải áp dụng đúng điều kiện khuyến mãi (giá combo < tổng giá lẻ).<br>- Thuế suất merchandise (10%) khác thuế suất vé sự kiện (5%) – cần phân bóc trên hóa đơn. |

### 2. Mô tả luồng Activity Diagram (Dạng bảng – Mẫu SRS1)

| STT | Hoạt động (Activity) | Actor thực hiện | Mô tả chi tiết | Điều kiện rẽ nhánh |
|---|---|---|---|---|
| 1 | Truy cập module Merchandise | ORGANIZER | Organizer đăng nhập Organizer Portal, chọn menu "Merchandise" | — |
| 2 | Tạo sản phẩm mới | ORGANIZER | Nhập: tên sản phẩm, mô tả, upload ảnh (jpg/png, max 5MB), SKU, giá, biến thể (size: S/M/L/XL, color), số lượng tồn kho ban đầu | — |
| 3 | Validate dữ liệu | Merchandise Service | Kiểm tra: SKU unique per organizer_id, giá > 0, tồn kho ≥ 0, file ảnh hợp lệ | Hợp lệ → Bước 4. SKU trùng → A1 |
| 4 | Lưu sản phẩm | Merchandise Service | INSERT vào PostgreSQL schema `merch`: product_id, organizer_id, sku, name, price, variants[], stock, status='ACTIVE' | — |
| 5 | Gắn sản phẩm với sự kiện | ORGANIZER | Chọn sự kiện từ danh sách → Tạo liên kết event_id ↔ product_id | — |
| 6 | Tạo combo/upsell | ORGANIZER | Tạo combo: chọn hạng vé + sản phẩm, đặt giá combo (< tổng giá lẻ). Hoặc cấu hình upsell popup hiển thị khi USER checkout | — |
| 7 | Hiển thị trên storefront | Client (React) | Trang sự kiện hiển thị tab "Merchandise" với danh sách sản phẩm, combo. Upsell popup xuất hiện khi USER thêm vé vào giỏ | — |
| 8 | USER thêm vào giỏ hàng | USER | USER chọn sản phẩm/combo, chọn biến thể, số lượng → Thêm vào cart. Booking Service kiểm tra stock available | Stock đủ → Thêm thành công. Stock hết → A2 |
| 9 | Thanh toán thành công | Payment Service | Sau khi payment confirmed, publish event lên Kafka topic `stock-events`: {sku_id, quantity_delta=-N, trigger='PURCHASE'} | — |
| 10 | Trừ tồn kho | Merchandise Service | Subscribe `stock-events`, atomic UPDATE: stock = stock - quantity_delta WHERE sku_id AND stock >= quantity_delta | Thành công → Bước 11. Race condition → Retry with optimistic lock |
| 11 | Kiểm tra ngưỡng cảnh báo | Merchandise Service | Nếu stock < threshold (configurable, default=10) → Publish alert event | Dưới ngưỡng → Bước 12. Trên ngưỡng → Kết thúc |
| 12 | Gửi cảnh báo Organizer | Notification Service | Gửi Email/Push cho Organizer: "Sản phẩm {name} sắp hết hàng (còn {stock} đơn vị)" | — |

---


## UC-15: Quản trị, báo cáo, đối soát, refund và hóa đơn

### 1. Scenario (Kịch bản PTTK)

| Thuộc tính | Nội dung |
|---|---|
| Mã Use Case | UC-15 |
| Tên Use Case | Quản trị, báo cáo, đối soát, refund và hóa đơn |
| Actor chính | ADMIN, ORGANIZER |
| Actor phụ | — |
| Mục tiêu | Hỗ trợ quản trị hệ thống, giám sát doanh thu, đối soát giao dịch, xử lý refund và xuất hóa đơn điện tử |
| Tiền điều kiện | Actor đã đăng nhập và có quyền truy cập module quản trị/báo cáo (role=ADMIN hoặc role=ORGANIZER) |
| Hậu điều kiện | Dữ liệu báo cáo được hiển thị/xuất file; giao dịch được đối soát; refund/hóa đơn được xử lý |
| Kịch bản chính (Main Scenario) | 1. Admin/Organizer truy cập dashboard quản trị.<br>2. Hệ thống (Finance Service) hiển thị số liệu realtime: doanh thu vé, doanh thu merchandise, số vé bán, tỷ lệ check-in, refund, payout.<br>3. Organizer xem dữ liệu thuộc tenant của mình (filtered by organizer_id).<br>4. Admin xem dữ liệu toàn hệ thống (cross-tenant).<br>5. Admin thực hiện đối soát giao dịch: Finance Service so sánh dữ liệu nội bộ với dữ liệu từ Payment Gateway (MoMo reconciliation API).<br>6. Nếu có yêu cầu refund: Admin tạo yêu cầu refund (toàn phần/một phần/batch).<br>7. Payment Service xử lý refund qua MoMo API, cập nhật trạng thái giao dịch.<br>8. Hệ thống gửi thông báo kết quả refund cho USER.<br>9. Finance Service xuất hóa đơn điện tử: gọi MISA Invoice API để phát hành e-invoice.<br>10. Admin/Organizer export báo cáo Excel/CSV/PDF. |
| Kịch bản thay thế / Ngoại lệ | A1. Dữ liệu payment gateway không khớp với dữ liệu nội bộ → Hệ thống đánh dấu "MISMATCH" trong bảng reconciliation, alert Admin để xử lý thủ công.<br>A2. Refund thất bại (MoMo API error) → Hệ thống lưu trạng thái REFUND_FAILED, cho phép Admin retry.<br>A3. Xuất hóa đơn thất bại (MISA API unavailable) → Đưa vào retry queue, gửi alert Admin.<br>A4. Organizer cố truy cập dữ liệu ngoài tenant → API Gateway + RBAC từ chối, trả 403 Forbidden. |
| Quy tắc nghiệp vụ | - Organizer chỉ được xem dữ liệu thuộc tenant của mình (multi-tenant isolation).<br>- Admin có quyền xem toàn hệ thống.<br>- Refund phải tuân thủ chính sách sự kiện và trạng thái thanh toán (chỉ refund order status=CONFIRMED).<br>- Hóa đơn phải được ký số và lưu vết (audit log append-only).<br>- Tất cả thao tác quản trị, refund, đối soát phải ghi audit log (actor_id, action, timestamp, before/after state). |

### 2. Mô tả luồng Activity Diagram (Dạng bảng – Mẫu SRS1)

| STT | Hoạt động (Activity) | Actor thực hiện | Mô tả chi tiết | Điều kiện rẽ nhánh |
|---|---|---|---|---|
| 1 | Truy cập dashboard | ADMIN / ORGANIZER | Đăng nhập hệ thống, được điều hướng vào Admin Portal hoặc Organizer Portal tùy role | — |
| 2 | Load dữ liệu báo cáo | Finance Service | Query PostgreSQL schema `finance`: tổng doanh thu, số vé bán, tỷ lệ check-in, refund amount, payout status. Filter theo organizer_id nếu role=ORGANIZER | — |
| 3 | Hiển thị dashboard realtime | Client (React + Recharts) | Render biểu đồ doanh thu theo thời gian, pie chart phân bổ vé/merch, KPI cards (tổng doanh thu, conversion rate, refund rate) | — |
| 4 | Thực hiện đối soát | ADMIN | Admin nhấn "Đối soát", Finance Service gọi MoMo Reconciliation API lấy danh sách giao dịch trong khoảng thời gian | — |
| 5 | So sánh dữ liệu | Finance Service | So sánh từng transaction: internal_amount vs momo_amount, internal_status vs momo_status | Khớp → Đánh dấu RECONCILED. Không khớp → A1: Đánh dấu MISMATCH + alert |
| 6 | Tạo yêu cầu refund | ADMIN | Admin chọn order(s) cần refund, chọn loại: FULL / PARTIAL / BATCH. Nhập lý do refund | — |
| 7 | Xử lý refund | Payment Service | Gọi MoMo Refund API với payment_id, amount. Chờ response | Thành công → Bước 8. Thất bại → A2: Lưu REFUND_FAILED, cho retry |
| 8 | Cập nhật trạng thái | Payment Service + Booking Service + Ticket Service | Order status → REFUNDED. Ticket status → REFUNDED (nếu refund full). Nhả ghế nếu sự kiện chưa diễn ra | — |
| 9 | Gửi thông báo refund | Notification Service | Gửi Email/Push cho USER: "Đơn hàng {order_id} đã được hoàn tiền {amount} VNĐ" | — |
| 10 | Xuất hóa đơn điện tử | Finance Service | Gọi MISA Invoice API: tạo e-invoice với thông tin pháp nhân Organizer, chi tiết sản phẩm, thuế suất (5% vé, 10% merch). Lưu invoice_id, ký số | Thành công → Bước 11. Thất bại → A3: Retry queue |
| 11 | Export báo cáo | ADMIN / ORGANIZER | Chọn khoảng thời gian + loại báo cáo (doanh thu/refund/payout). Finance Service generate file Excel/CSV/PDF. Trả download link | — |
| 12 | Ghi audit log | Finance Service | Mọi thao tác (đối soát, refund, xuất hóa đơn, export) đều được ghi vào audit_logs: {actor_id, action, resource_type, resource_id, timestamp, before_state, after_state} | — |

---


## UC-16: Hỏi đáp với AI Chatbot

### 1. Scenario (Kịch bản PTTK)

| Thuộc tính | Nội dung |
|---|---|
| Mã Use Case | UC-16 |
| Tên Use Case | Hỏi đáp với AI Chatbot |
| Actor chính | USER (bao gồm cả Khách vãng lai) |
| Actor phụ | ADMIN |
| Mục tiêu | Cho phép người dùng đặt câu hỏi bằng ngôn ngữ tự nhiên để tra cứu nhanh thông tin sự kiện, quy định, hướng dẫn mua vé, thanh toán, refund và resale |
| Tiền điều kiện | Người dùng truy cập hệ thống (có thể chưa đăng nhập); Knowledge Base/FAQ đã được cấu hình bởi Admin |
| Hậu điều kiện | Người dùng nhận được câu trả lời phù hợp hoặc yêu cầu được chuyển tiếp cho bộ phận hỗ trợ khi chatbot không đủ độ tin cậy |
| Kịch bản chính (Main Scenario) | 1. Người dùng mở AI Chatbot widget trên website (floating button góc phải dưới).<br>2. Người dùng nhập câu hỏi bằng ngôn ngữ tự nhiên (VD: "Sự kiện ABC mở cổng lúc mấy giờ?").<br>3. Client gửi message đến AI Service qua API Gateway.<br>4. AI Service phân tích ý định (intent classification) của câu hỏi.<br>5. AI Service thực hiện Semantic Search trên Knowledge Base (FAQ documents, thông tin sự kiện đã duyệt) sử dụng TF-IDF + Cosine Similarity.<br>6. AI Service tính confidence score cho câu trả lời tìm được.<br>7. Nếu confidence ≥ threshold (configurable, default 0.7): Chatbot trả lời người dùng với nội dung từ Knowledge Base.<br>8. Chatbot hiển thị câu trả lời kèm link liên quan (link đến sự kiện, trang hướng dẫn).<br>9. Người dùng có thể tiếp tục đặt câu hỏi (multi-turn conversation) hoặc đánh giá câu trả lời (thumbs up/down).<br>10. Hệ thống lưu lịch sử hội thoại (conversation_id, messages[], timestamps) phục vụ cải thiện chất lượng. |
| Kịch bản thay thế / Ngoại lệ | A1. Câu hỏi nằm ngoài phạm vi dữ liệu (no relevant document found) → Chatbot trả lời: "Xin lỗi, tôi chưa có thông tin về vấn đề này. Bạn có muốn liên hệ bộ phận hỗ trợ không?"<br>A2. Confidence score < threshold → Chatbot đề xuất: "Tôi không chắc chắn về câu trả lời. Bạn có thể liên hệ hỗ trợ qua email/hotline hoặc thử hỏi lại với cách diễn đạt khác."<br>A3. Người dùng hỏi về đơn hàng cá nhân (VD: "Đơn hàng của tôi ở đâu?") → Chatbot yêu cầu đăng nhập/xác thực trước khi cung cấp thông tin cá nhân.<br>A4. AI Service lỗi (timeout/crash) → Client hiển thị FAQ phổ biến dạng static + thông báo "Chatbot đang bảo trì, vui lòng thử lại sau". |
| Quy tắc nghiệp vụ | - Chatbot chỉ được trả lời dựa trên dữ liệu hệ thống, FAQ, chính sách và thông tin sự kiện đã được duyệt.<br>- Không cung cấp thông tin cá nhân, đơn hàng hoặc vé nếu người dùng chưa xác thực.<br>- Khi confidence < threshold: phải chuyển hướng sang support, không khẳng định chắc chắn.<br>- Nội dung trả lời không được mâu thuẫn với chính sách sự kiện, refund, check-in và resale đã cấu hình.<br>- Lịch sử hội thoại phải tuân thủ quy định bảo mật và quyền riêng tư (xóa sau 90 ngày hoặc theo yêu cầu user). |

### 2. Mô tả luồng Activity Diagram (Dạng bảng – Mẫu SRS1)

| STT | Hoạt động (Activity) | Actor thực hiện | Mô tả chi tiết | Điều kiện rẽ nhánh |
|---|---|---|---|---|
| 1 | Mở chatbot widget | USER | Người dùng click vào floating chat icon trên website. Widget mở ra với greeting message | — |
| 2 | Nhập câu hỏi | USER | Người dùng gõ câu hỏi bằng ngôn ngữ tự nhiên (tiếng Việt/Anh) vào input box và nhấn Enter/Send | — |
| 3 | Gửi message đến AI Service | Client (React) | POST /ai/chat với body: {conversation_id, message, user_id (nếu đã login), context: current_page_url} | — |
| 4 | Phân tích ý định (Intent) | AI Service (FastAPI) | NLP pipeline: tokenize → intent classification (event_info / ticket_purchase / refund_policy / general_faq / personal_order) | Intent = personal_order → A3: Yêu cầu đăng nhập |
| 5 | Semantic Search trên KB | AI Service | Vectorize câu hỏi (TF-IDF), tính Cosine Similarity với tất cả documents trong Knowledge Base (MongoDB). Lấy top-K results (K=3) | Có kết quả (similarity > 0.3) → Bước 6. Không có → A1 |
| 6 | Tính confidence score | AI Service | Confidence = max(similarity_scores). Nếu nhiều documents relevant → aggregate answer | Confidence ≥ 0.7 → Bước 7. Confidence < 0.7 → A2 |
| 7 | Sinh câu trả lời | AI Service | Compose response từ document content + metadata (event_name, date, venue). Đính kèm related_links[] | — |
| 8 | Trả response cho client | AI Service → Client | Response JSON: {answer: "...", confidence: 0.85, related_links: [{title, url}], suggestions: ["Câu hỏi gợi ý 1", ...]} | — |
| 9 | Hiển thị câu trả lời | Client (React) | Render message bubble với formatted answer, clickable links, suggested follow-up questions | — |
| 10 | Đánh giá câu trả lời | USER (optional) | Người dùng nhấn 👍/👎 để feedback chất lượng. Data gửi về AI Service để improve model | — |
| 11 | Tiếp tục hội thoại | USER (optional) | Người dùng có thể hỏi tiếp (multi-turn). AI Service duy trì context qua conversation_id + message history (last 5 turns) | — |
| 12 | Lưu lịch sử hội thoại | AI Service | INSERT/UPDATE conversation trong MongoDB: {conversation_id, user_id, messages: [{role, content, timestamp}], feedback_scores[]} | — |
| 13 | Escalate to support | AI Service (khi A1/A2) | Nếu user đồng ý chuyển support: tạo support ticket (gửi email đến team support) hoặc hiển thị thông tin liên hệ (hotline, email) | — |

---

