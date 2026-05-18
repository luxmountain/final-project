# ĐẶC TẢ SCENARIO DIAGRAM – ACTIVITY DIAGRAM – LUỒNG ACTIVITY

## (UC-09 đến UC-16)

---

## 9. UC-09. Phát hành vé điện tử, QR động và NFT Ticket

### a. Scenario

| Thuộc tính | Nội dung |
|---|---|
| Use case | Phát hành vé điện tử, QR động và NFT Ticket |
| Actor | SYSTEM, USER (nhận vé) |
| Tiền điều kiện | Đơn hàng đã thanh toán thành công; thông tin ghế, sự kiện và người mua hợp lệ. |
| Hậu điều kiện | Vé điện tử được tạo, liên kết với người mua và hiển thị trong ví vé; QR động hoạt động; NFT được mint (nếu cấu hình). |
| Kịch bản chính | 1. Hệ thống nhận sự kiện thanh toán thành công. 2. Hệ thống tạo Ticket ID duy nhất cho từng vé trong đơn hàng. 3. Hệ thống liên kết vé với đơn hàng, người mua, sự kiện, ghế và hạng vé. 4. Hệ thống sinh mã bảo mật TOTP cho từng vé. 5. Hệ thống tạo QR động từ mã TOTP, QR thay đổi theo chu kỳ 30 giây. 6. Hệ thống kiểm tra cấu hình blockchain của sự kiện (có bật NFT Ticketing hay không). 7. Nếu blockchain được bật: Hệ thống mint NFT Ticket và ghi transaction hash. 8. Hệ thống lưu thông tin vé vào cơ sở dữ liệu với trạng thái ACTIVE. 9. Hệ thống gửi thông báo "Vé của bạn đã sẵn sàng" cho người dùng qua Email/Push. 10. Người dùng mở ví vé điện tử và thấy vé mới với QR động tự động cập nhật mỗi 30 giây. |
| Ngoại lệ | 7a. Mint NFT thất bại → Vé vẫn được phát hành ở trạng thái off-chain, hệ thống thử lại sau. 8a. Lỗi phát hành vé → Hệ thống rollback và đưa vào hàng đợi xử lý lại. 3a. Ghế không tồn tại hoặc đã bị hủy → Hệ thống cảnh báo Admin để xử lý ngoại lệ. |

### b. Activity Diagram

*(Sơ đồ Activity Diagram)*

### c. Mô tả luồng Activity

| Bước | Mô tả |
|---|---|
| Bước 1 | Hệ thống nhận sự kiện thanh toán thành công chứa thông tin: mã đơn hàng, người mua, sự kiện, danh sách ghế. |
| Bước 2 | Hệ thống sinh mã vé duy nhất cho mỗi ghế trong đơn hàng. |
| Bước 3 | Hệ thống ghi nhận liên kết: mã vé ↔ đơn hàng ↔ người mua ↔ sự kiện ↔ ghế ↔ hạng vé. |
| Bước 4 | Hệ thống tạo mã bảo mật TOTP riêng cho từng vé. |
| Bước 5 | Từ mã TOTP, hệ thống sinh mã QR động. QR tự động thay đổi mỗi 30 giây khi hiển thị trên ứng dụng. |
| Bước 6 | Hệ thống kiểm tra cấu hình blockchain của sự kiện: Có bật NFT → Bước 7. Không bật → Bước 8. |
| Bước 7 | Hệ thống mint NFT Ticket với metadata vé. Thành công → Bước 8. Thất bại → đánh dấu off-chain, thử lại sau, chuyển Bước 8. |
| Bước 8 | Hệ thống lưu vé vào cơ sở dữ liệu với trạng thái ACTIVE. Thành công → Bước 9. Thất bại → rollback và đưa vào hàng đợi xử lý lại. |
| Bước 9 | Hệ thống gửi Email xác nhận vé + Push notification "Vé của bạn đã sẵn sàng". |
| Bước 10 | Người dùng mở ví vé điện tử, hệ thống hiển thị danh sách vé mới với QR động tự động cập nhật. Kết thúc luồng. |

---

## 10. UC-10. Quản lý ví vé điện tử của người dùng

### a. Scenario

| Thuộc tính | Nội dung |
|---|---|
| Use case | Quản lý ví vé điện tử |
| Actor | USER |
| Tiền điều kiện | Người dùng đã đăng nhập và có ít nhất một vé hợp lệ trong ví. |
| Hậu điều kiện | Người dùng xem được thông tin vé, trạng thái vé và QR động. |
| Kịch bản chính | 1. Người dùng A truy cập ví vé điện tử từ menu chính ("Ví vé" / "My Tickets"). 2. Hệ thống hiển thị danh sách vé nhóm theo: Sắp diễn ra (upcoming) và Đã qua (past), mỗi vé hiển thị badge trạng thái (ACTIVE/USED/REFUNDED/FROZEN). 3. A chọn một vé cụ thể. 4. Hệ thống hiển thị chi tiết vé: tên sự kiện, ngày giờ, địa điểm, khu vực, hàng, ghế, hạng vé, mã vé. 5. Hệ thống hiển thị QR động (tự động cập nhật mỗi 30s) cho vé có trạng thái ACTIVE kèm countdown. 6. A có thể chọn: "Xem hướng dẫn vào cổng" / "Lưu vé vào Apple/Google Wallet" / "Niêm yết resale" (nếu đủ điều kiện). |
| Ngoại lệ | 3a. Vé đã refund → hiển thị trạng thái REFUNDED, ẩn QR, hiển thị thông tin hoàn tiền. 3b. Vé đã used → hiển thị trạng thái USED kèm lịch sử check-in (thời gian, cổng). 3c. Vé đang resale → hiển thị trạng thái FROZEN/LISTED, ẩn QR, hiển thị link listing. |

### b. Activity Diagram

*(Sơ đồ Activity Diagram)*

### c. Mô tả luồng Activity

| Bước | Mô tả |
|---|---|
| Bước 1 | USER nhấn vào mục "Ví vé" / "My Tickets" trên giao diện chính. |
| Bước 2 | Hệ thống lấy danh sách vé của người dùng. |
| Bước 3 | Hệ thống hiển thị danh sách vé, nhóm theo: Sắp diễn ra và Đã qua. Hiển thị badge trạng thái. |
| Bước 4 | USER chọn một vé cụ thể để xem chi tiết. |
| Bước 5 | Hệ thống kiểm tra trạng thái vé: - ACTIVE → chuyển Bước 6. - USED → hiển thị lịch sử check-in, kết thúc. - REFUNDED → hiển thị thông tin hoàn tiền, kết thúc. - FROZEN → hiển thị link listing trên Resale Market, kết thúc. |
| Bước 6 | Hệ thống hiển thị QR động tự động cập nhật mỗi 30 giây kèm countdown. |
| Bước 7 | Hệ thống hiển thị đầy đủ thông tin chi tiết vé: tên sự kiện, ngày giờ, địa điểm, khu vực, hàng, ghế, hạng vé, mã vé. |
| Bước 8 | USER có thể chọn: Lưu vào Apple/Google Wallet. Niêm yết resale → Chuyển sang UC-13. Xem hướng dẫn vào cổng → Hiển thị modal hướng dẫn. Kết thúc luồng. |

---

## 11. UC-11. Check-in vé tại cổng

### a. Scenario

| Thuộc tính | Nội dung |
|---|---|
| Use case | Check-in vé tại cổng |
| Actor | USER (xuất trình vé), STAFF (quét QR) |
| Tiền điều kiện | Staff đã đăng nhập Staff App, được phân quyền cổng check-in; USER có vé hợp lệ với trạng thái ACTIVE. |
| Hậu điều kiện | Vé hợp lệ được chuyển sang trạng thái USED và ghi log check-in; vé không hợp lệ bị từ chối. |
| Kịch bản chính | 1. Staff S mở Staff App trên thiết bị di động và đăng nhập. 2. S chọn sự kiện đang diễn ra và cổng check-in được phân công. 3. S nhấn "Quét vé", ứng dụng kích hoạt camera và hiển thị viewfinder. 4. USER A mở ví vé, chọn vé, màn hình hiển thị QR động đang tự động cập nhật mỗi 30s. 5. S đưa camera quét QR code của A. 6. Hệ thống xác thực mã QR: kiểm tra mã TOTP hợp lệ trong khoảng thời gian cho phép — hợp lệ. 7. Hệ thống kiểm tra: vé đúng sự kiện, trạng thái ACTIVE, chưa sử dụng, chưa hoàn tiền, không bị đóng băng — tất cả OK. 8. Hệ thống cập nhật vé sang trạng thái USED, ghi nhận thời gian check-in, nhân viên và cổng. 9. Hệ thống ghi log check-in. 10. Staff App hiển thị màn hình xanh "✓ CHECK-IN THÀNH CÔNG" kèm thông tin ghế. Tự động reset sau 3s. 11. S cho A đi qua cổng. |
| Ngoại lệ | 6a. QR hết hạn/sai → hiển thị CHECK-IN INVALID (màn hình đỏ), Staff từ chối. 7a. Vé đã check-in trước đó → cảnh báo "Vé đã sử dụng" kèm thời điểm check-in lần đầu. 7b. Vé không thuộc sự kiện/cổng → từ chối, hiển thị "Sai sự kiện/cổng". 3a. Mất mạng → Staff App chuyển sang chế độ offline (UC-12). |

### b. Activity Diagram

*(Sơ đồ Activity Diagram)*

### c. Mô tả luồng Activity

| Bước | Mô tả |
|---|---|
| Bước 1 | STAFF mở Staff App, đăng nhập với tài khoản nhân viên soát vé. |
| Bước 2 | STAFF chọn sự kiện đang diễn ra và cổng check-in được phân công. |
| Bước 3 | STAFF nhấn "Quét vé", ứng dụng kích hoạt camera, hiển thị viewfinder. |
| Bước 4 | USER mở ví vé, chọn vé, màn hình hiển thị QR động đang tự động cập nhật. |
| Bước 5 | Staff App quét QR code, giải mã ra thông tin vé và mã xác thực. |
| Bước 6 | Hệ thống xác thực mã TOTP: Hợp lệ → Bước 7. Không hợp lệ → hiển thị INVALID (màn hình đỏ), ghi log quét thất bại. Kết thúc. |
| Bước 7 | Hệ thống kiểm tra trạng thái vé: Tất cả OK → Bước 8. Vé đã USED → cảnh báo "Vé đã sử dụng". Sai sự kiện → từ chối. Kết thúc. |
| Bước 8 | Hệ thống cập nhật vé sang trạng thái USED, ghi nhận thời gian, nhân viên và cổng check-in. |
| Bước 9 | Hệ thống ghi log check-in. |
| Bước 10 | Staff App hiển thị màn hình xanh "✓ CHECK-IN THÀNH CÔNG" + thông tin ghế. Tự động reset sau 3s. |
| Bước 11 | STAFF cho USER đi qua cổng. Kết thúc luồng. |

---

## 12. UC-12. Check-in offline và đồng bộ dữ liệu

### a. Scenario

| Thuộc tính | Nội dung |
|---|---|
| Use case | Check-in offline và đồng bộ dữ liệu |
| Actor | STAFF |
| Tiền điều kiện | Staff đã tải trước dữ liệu vé (mã hóa) trước sự kiện khi còn kết nối mạng. |
| Hậu điều kiện | Dữ liệu check-in offline được lưu cục bộ và đồng bộ về server khi có mạng. |
| Kịch bản chính | 1. Trước sự kiện (khi có mạng), Staff S mở Staff App và nhấn "Tải dữ liệu offline" cho sự kiện/cổng được phân quyền. 2. Ứng dụng tải và lưu trữ dữ liệu vé (mã hóa) vào bộ nhớ cục bộ của thiết bị. 3. Khi mất mạng, Staff App tự động phát hiện và chuyển sang chế độ offline, hiển thị badge "OFFLINE". 4. S quét QR của USER. Ứng dụng giải mã ra thông tin vé và mã xác thực. 5. Ứng dụng tra cứu vé trong dữ liệu đã tải — tìm thấy. 6. Ứng dụng xác thực mã TOTP cục bộ — hợp lệ. 7. Ứng dụng kiểm tra: vé chưa bị đánh dấu đã sử dụng trong bộ nhớ cục bộ — chưa used. 8. Ứng dụng ghi nhận check-in cục bộ, đánh dấu vé đã sử dụng trong bộ nhớ. 9. Hiển thị "✓ CHECK-IN OK (OFFLINE)" + badge "Chờ đồng bộ". 10. Khi có mạng trở lại, ứng dụng tự động đồng bộ dữ liệu check-in về server. 11. Server xử lý từng bản ghi: vé chưa sử dụng → cập nhật; vé đã sử dụng bởi thiết bị khác → đánh dấu trùng lặp. 12. Server trả kết quả đồng bộ cho ứng dụng. |
| Ngoại lệ | 5a. Vé không có trong dữ liệu đã tải → hiển thị "Không thể xác minh offline – cần kết nối mạng". 11a. Trùng check-in giữa hai thiết bị offline → Server ưu tiên thời gian sớm nhất, đánh dấu bản ghi sau là trùng lặp. 2a. Dữ liệu đã tải hết hạn (quá 24h) → yêu cầu tải lại khi có mạng. |

### b. Activity Diagram

*(Sơ đồ Activity Diagram)*

### c. Mô tả luồng Activity

| Bước | Mô tả |
|---|---|
| Bước 1 | STAFF mở Staff App (khi có mạng), chọn sự kiện/cổng, nhấn "Tải dữ liệu offline". |
| Bước 2 | Ứng dụng tải và lưu trữ danh sách vé (mã hóa) vào bộ nhớ cục bộ thiết bị. |
| Bước 3 | Ứng dụng phát hiện mất mạng → Chuyển sang chế độ offline, hiển thị badge "OFFLINE". |
| Bước 4 | STAFF quét QR động của USER bằng camera. Giải mã ra thông tin vé và mã xác thực. |
| Bước 5 | Ứng dụng tra cứu vé trong bộ nhớ cục bộ: Tìm thấy → Bước 6. Không tìm thấy → hiển thị "Không thể xác minh offline". Kết thúc. |
| Bước 6 | Ứng dụng xác thực mã TOTP cục bộ: Hợp lệ → Bước 7. Không hợp lệ → hiển thị INVALID. Kết thúc. |
| Bước 7 | Ứng dụng kiểm tra trạng thái cục bộ: Chưa used → Bước 8. Đã used → hiển thị "Vé đã sử dụng". Kết thúc. |
| Bước 8 | Ứng dụng ghi nhận check-in cục bộ, đánh dấu vé đã sử dụng. |
| Bước 9 | Hiển thị "✓ CHECK-IN OK (OFFLINE)" + thông tin ghế + badge "Chờ đồng bộ". |
| Bước 10 | Khi có mạng trở lại, ứng dụng tự động kích hoạt đồng bộ dữ liệu. |
| Bước 11 | Ứng dụng gửi toàn bộ bản ghi check-in chờ đồng bộ về server. |
| Bước 12 | Server xử lý: Vé chưa sử dụng → cập nhật trạng thái. Vé đã sử dụng bởi thiết bị khác → đánh dấu trùng lặp. |
| Bước 13 | Server trả kết quả đồng bộ. Ứng dụng cập nhật trạng thái các bản ghi. Kết thúc luồng. |

---

## 13. UC-13. Giao dịch vé thứ cấp trên Resale Market

### a. Scenario

| Thuộc tính | Nội dung |
|---|---|
| Use case | Giao dịch vé thứ cấp trên Resale Market |
| Actor | USER (Seller), USER (Buyer), ADMIN (xử lý tranh chấp) |
| Tiền điều kiện | Người bán sở hữu vé hợp lệ (trạng thái ACTIVE, chưa sử dụng/hoàn tiền); sự kiện cho phép bán lại. |
| Hậu điều kiện | Vé được chuyển quyền sở hữu cho người mua, QR cũ bị hủy và QR mới được cấp cho người mua. |
| Kịch bản chính | 1. Người bán A truy cập ví vé, chọn vé muốn bán lại, nhấn "Bán lại". 2. Hệ thống kiểm tra điều kiện vé: trạng thái ACTIVE, sự kiện cho phép resale, chưa có niêm yết đang hoạt động. 3. A nhập giá bán mong muốn. Giao diện hiển thị giá gốc và giá trần (120%) để tham khảo. 4. Hệ thống kiểm tra giá không vượt 120% giá gốc — hợp lệ. 5. Hệ thống đóng băng vé (trạng thái FROZEN) và tạo niêm yết trên Resale Market. 6. Niêm yết xuất hiện trên sàn giao dịch, có thể tìm kiếm/lọc theo sự kiện, giá, khu vực. 7. Người mua B tìm thấy niêm yết phù hợp, nhấn "Mua ngay". 8. Hệ thống giữ tiền B trong tài khoản trung gian (escrow). B thanh toán — thành công. 9. Hệ thống chuyển quyền sở hữu vé cho B, cập nhật niêm yết = ĐÃ BÁN. 10. Hệ thống vô hiệu hóa mã bảo mật cũ của A. Nếu có NFT: chuyển quyền sở hữu on-chain. 11. Hệ thống sinh mã bảo mật mới cho B. Vé trở lại trạng thái ACTIVE với chủ sở hữu mới. 12. Hệ thống giải ngân cho A (trừ phí nền tảng). 13. Gửi thông báo cho cả A ("Vé đã bán thành công") và B ("Vé đã sẵn sàng trong ví"). |
| Ngoại lệ | 4a. Giá vượt trần (>120%) → từ chối tạo niêm yết, hiển thị "Giá vượt mức cho phép". 5a. Người bán hủy niêm yết trước khi có người mua → hệ thống bỏ đóng băng vé, xóa niêm yết. 8a. Thanh toán thất bại → niêm yết vẫn hiệu lực, thông báo người mua. Sau giao dịch: Có tranh chấp → Admin can thiệp xử lý escrow. |

### b. Activity Diagram

*(Sơ đồ Activity Diagram)*

### c. Mô tả luồng Activity

| Bước | Mô tả |
|---|---|
| Bước 1 | USER (Seller) từ ví vé, chọn vé ACTIVE và nhấn "Bán lại". |
| Bước 2 | Hệ thống kiểm tra điều kiện: Đủ → Bước 3. Không đủ → trả lỗi, hiển thị lý do. Kết thúc. |
| Bước 3 | Seller nhập giá mong muốn. Giao diện hiển thị giá gốc và giá trần (120%). |
| Bước 4 | Hệ thống kiểm tra giá: Hợp lệ → Bước 5. Vượt trần → từ chối, hiển thị "Giá vượt mức cho phép". Kết thúc. |
| Bước 5 | Hệ thống đóng băng vé (FROZEN) và tạo niêm yết trên Resale Market. |
| Bước 6 | Niêm yết xuất hiện trên sàn giao dịch. |
| Bước 7 | USER (Buyer) duyệt sàn, chọn niêm yết phù hợp, nhấn "Mua ngay". |
| Bước 8 | Hệ thống giữ tiền qua escrow, Buyer thanh toán: Thành công → Bước 9. Thất bại → thông báo buyer. Kết thúc. |
| Bước 9 | Hệ thống chuyển quyền sở hữu vé cho buyer, cập nhật niêm yết = ĐÃ BÁN. |
| Bước 10 | Hệ thống vô hiệu hóa mã bảo mật cũ của seller. Nếu có NFT: chuyển quyền sở hữu on-chain. |
| Bước 11 | Hệ thống sinh mã bảo mật mới cho buyer. Vé trở lại trạng thái ACTIVE với chủ mới. |
| Bước 12 | Hệ thống giải ngân cho seller (trừ phí nền tảng). |
| Bước 13 | Gửi thông báo cho cả seller và buyer. Kết thúc luồng. |

---

## 14. UC-14. Quản lý merchandise, combo và tồn kho

### a. Scenario

| Thuộc tính | Nội dung |
|---|---|
| Use case | Quản lý merchandise, combo và tồn kho |
| Actor | ORGANIZER (quản lý sản phẩm), USER (mua hàng) |
| Tiền điều kiện | Organizer đã được phê duyệt; sự kiện đã được tạo. |
| Hậu điều kiện | Merchandise được tạo, có thể bán độc lập hoặc bán kèm vé; tồn kho được cập nhật realtime. |
| Kịch bản chính | 1. Organizer O truy cập Organizer Portal, chọn menu "Merchandise". 2. O nhấn "Tạo sản phẩm mới", nhập: tên, mô tả, upload hình ảnh, mã SKU, giá, biến thể (size/color), số lượng tồn kho. 3. Hệ thống kiểm tra: mã SKU duy nhất, giá hợp lệ, tồn kho hợp lệ, file ảnh đúng định dạng — hợp lệ. 4. Hệ thống lưu sản phẩm. 5. O gắn sản phẩm với sự kiện cụ thể. 6. O tạo combo (vé + sản phẩm, giá combo ưu đãi hơn tổng giá lẻ) hoặc cấu hình gợi ý mua thêm (upsell). 7. Trang sự kiện hiển thị tab "Merchandise" và popup gợi ý khi USER đang checkout. 8. USER chọn sản phẩm/combo, thêm vào giỏ hàng. Hệ thống kiểm tra tồn kho — đủ. 9. Sau khi thanh toán thành công, hệ thống trừ tồn kho tương ứng. 10. Nếu tồn kho xuống dưới ngưỡng cảnh báo → gửi thông báo cho Organizer. |
| Ngoại lệ | 3a. Mã SKU trùng → từ chối, hiển thị "SKU đã tồn tại". 8a. Tồn kho không đủ → yêu cầu USER cập nhật giỏ hàng. Sau khi tạo: Sản phẩm ngừng bán → Organizer đánh dấu ngừng hoạt động, ẩn khỏi trang. |

### b. Activity Diagram

*(Sơ đồ Activity Diagram)*

### c. Mô tả luồng Activity

| Bước | Mô tả |
|---|---|
| Bước 1 | ORGANIZER đăng nhập Organizer Portal, chọn menu "Merchandise". |
| Bước 2 | ORGANIZER nhấn "Tạo sản phẩm mới", nhập thông tin: tên, mô tả, ảnh, SKU, giá, biến thể, tồn kho. |
| Bước 3 | Hệ thống kiểm tra: Hợp lệ → Bước 4. SKU trùng → hiển thị lỗi. Kết thúc. |
| Bước 4 | Hệ thống lưu sản phẩm. |
| Bước 5 | ORGANIZER chọn sự kiện → Gắn sản phẩm với sự kiện. |
| Bước 6 | ORGANIZER tạo combo/upsell: chọn hạng vé + sản phẩm, đặt giá combo hoặc cấu hình gợi ý mua thêm. |
| Bước 7 | Trang sự kiện hiển thị tab "Merchandise" và popup gợi ý khi USER checkout. |
| Bước 8 | USER chọn sản phẩm/combo, thêm vào giỏ. Hệ thống kiểm tra tồn kho: Đủ → thêm thành công. Hết → hiển thị "Hết hàng". Kết thúc. |
| Bước 9 | Sau thanh toán thành công, hệ thống trừ tồn kho: Thành công → Bước 10. |
| Bước 10 | Kiểm tra ngưỡng: tồn kho dưới ngưỡng → Bước 11. Trên ngưỡng → Kết thúc. |
| Bước 11 | Hệ thống gửi cảnh báo cho Organizer: "Sản phẩm sắp hết hàng". Kết thúc luồng. |

---

## 15. UC-15. Quản trị, báo cáo, đối soát, refund và hóa đơn

### a. Scenario

| Thuộc tính | Nội dung |
|---|---|
| Use case | Quản trị, báo cáo, đối soát, refund và hóa đơn |
| Actor | ADMIN (toàn hệ thống), ORGANIZER (dữ liệu của mình) |
| Tiền điều kiện | Actor đã đăng nhập và có quyền truy cập module quản trị/báo cáo. |
| Hậu điều kiện | Dữ liệu báo cáo được hiển thị/xuất file; giao dịch được đối soát; refund/hóa đơn được xử lý. |
| Kịch bản chính | 1. Admin K đăng nhập và truy cập dashboard quản trị. 2. Hệ thống hiển thị số liệu realtime: doanh thu vé, doanh thu merchandise, số vé bán, tỷ lệ check-in, refund, payout. 3. Organizer O đăng nhập và xem dữ liệu thuộc phạm vi của mình. 4. K xem dữ liệu toàn hệ thống. 5. K nhấn "Đối soát", hệ thống so sánh dữ liệu nội bộ với dữ liệu từ cổng thanh toán — khớp. 6. K chọn đơn hàng cần refund, chọn loại (toàn phần/một phần/hàng loạt), nhập lý do. 7. Hệ thống gọi cổng thanh toán để hoàn tiền — thành công. 8. Hệ thống cập nhật trạng thái đơn hàng và vé = ĐÃ HOÀN TIỀN, nhả ghế nếu sự kiện chưa diễn ra. 9. Gửi thông báo hoàn tiền cho người dùng. 10. Hệ thống xuất hóa đơn điện tử, ký số — thành công. 11. K/O export báo cáo Excel/CSV/PDF. 12. Mọi thao tác được ghi nhật ký kiểm toán (audit log). |
| Ngoại lệ | 5a. Dữ liệu không khớp → đánh dấu lệch đối soát, cảnh báo Admin xử lý thủ công. 7a. Refund thất bại → lưu trạng thái lỗi, cho phép thử lại. 10a. Xuất hóa đơn thất bại → đưa vào hàng đợi thử lại, cảnh báo Admin. 3a. Organizer truy cập ngoài phạm vi → từ chối truy cập. |

### b. Activity Diagram

*(Sơ đồ Activity Diagram)*

### c. Mô tả luồng Activity

| Bước | Mô tả |
|---|---|
| Bước 1 | ADMIN / ORGANIZER đăng nhập, được điều hướng vào trang quản trị tương ứng theo vai trò. |
| Bước 2 | Hệ thống truy vấn dữ liệu: tổng doanh thu, số vé bán, tỷ lệ check-in, refund, payout. Lọc theo phạm vi nếu là Organizer. |
| Bước 3 | Hệ thống hiển thị dashboard: biểu đồ doanh thu, các chỉ số KPI. |
| Bước 4 | ADMIN lựa chọn: Đối soát → Bước 5. Refund → Bước 7. Xuất hóa đơn → Bước 11. Export báo cáo → Bước 13. |
| Bước 5 | ADMIN nhấn "Đối soát". Hệ thống lấy danh sách giao dịch từ cổng thanh toán. |
| Bước 6 | Hệ thống so sánh từng giao dịch: Khớp → đánh dấu đã đối soát. Không khớp → đánh dấu lệch + cảnh báo Admin. |
| Bước 7 | ADMIN chọn đơn hàng cần refund, chọn loại (toàn phần/một phần/hàng loạt), nhập lý do. |
| Bước 8 | Hệ thống gọi cổng thanh toán để hoàn tiền: Thành công → Bước 9. Thất bại → lưu lỗi, cho thử lại. Kết thúc. |
| Bước 9 | Cập nhật trạng thái đơn hàng và vé = ĐÃ HOÀN TIỀN, nhả ghế nếu sự kiện chưa diễn ra. |
| Bước 10 | Gửi thông báo hoàn tiền cho người dùng. |
| Bước 11 | Hệ thống xuất hóa đơn điện tử, ký số: Thành công → Bước 12. Thất bại → đưa vào hàng đợi thử lại. Kết thúc. |
| Bước 12 | Lưu hóa đơn đã ký số, liên kết với đơn hàng. |
| Bước 13 | ADMIN/ORGANIZER chọn khoảng thời gian + loại báo cáo. Hệ thống tạo file Excel/CSV/PDF, trả link tải về. |
| Bước 14 | Mọi thao tác được ghi nhật ký kiểm toán. Kết thúc luồng. |

---

## 16. UC-16. Hỏi đáp với AI Chatbot

### a. Scenario

| Thuộc tính | Nội dung |
|---|---|
| Use case | Hỏi đáp với AI Chatbot |
| Actor | USER (bao gồm Khách vãng lai), ADMIN (quản lý Knowledge Base) |
| Tiền điều kiện | Người dùng truy cập hệ thống (có thể chưa đăng nhập); Knowledge Base/FAQ đã được cấu hình bởi Admin. |
| Hậu điều kiện | Người dùng nhận được câu trả lời phù hợp hoặc yêu cầu được chuyển tiếp cho bộ phận hỗ trợ. |
| Kịch bản chính | 1. Người dùng A click vào biểu tượng chat ở góc phải dưới website. Cửa sổ chat mở ra với lời chào. 2. A gõ câu hỏi bằng ngôn ngữ tự nhiên (VD: "Sự kiện ABC mở cổng lúc mấy giờ?") và nhấn Gửi. 3. Hệ thống gửi câu hỏi đến dịch vụ AI. 4. Dịch vụ AI phân tích ý định câu hỏi: thông tin sự kiện / hướng dẫn mua vé / chính sách hoàn tiền / FAQ chung / đơn hàng cá nhân. 5. Dịch vụ AI tìm kiếm ngữ nghĩa trên Knowledge Base, lấy các tài liệu liên quan nhất. 6. Dịch vụ AI tính độ tin cậy của câu trả lời. 7. Độ tin cậy đạt ngưỡng: Chatbot tổng hợp câu trả lời từ nội dung tài liệu, đính kèm liên kết liên quan. 8. Chatbot hiển thị câu trả lời kèm link và các câu hỏi gợi ý tiếp theo. 9. A có thể tiếp tục hỏi (hội thoại nhiều lượt) hoặc đánh giá câu trả lời (👍/👎). 10. Hệ thống lưu lịch sử hội thoại phục vụ cải thiện chất lượng. |
| Ngoại lệ | 5a. Không tìm thấy tài liệu liên quan → Chatbot: "Xin lỗi, tôi chưa có thông tin. Bạn có muốn liên hệ hỗ trợ không?" 6a. Độ tin cậy thấp → Chatbot: "Tôi không chắc chắn. Bạn có thể liên hệ hỗ trợ hoặc thử hỏi lại." 4a. Câu hỏi về đơn hàng cá nhân → yêu cầu đăng nhập trước khi cung cấp thông tin. 3a. Dịch vụ AI lỗi → hiển thị FAQ phổ biến dạng tĩnh + "Chatbot đang bảo trì, vui lòng thử lại sau". |

### b. Activity Diagram

*(Sơ đồ Activity Diagram)*

### c. Mô tả luồng Activity

| Bước | Mô tả |
|---|---|
| Bước 1 | USER click vào biểu tượng chat trên website. Cửa sổ chat mở ra với lời chào. |
| Bước 2 | USER gõ câu hỏi bằng ngôn ngữ tự nhiên và nhấn Gửi. |
| Bước 3 | Hệ thống gửi câu hỏi đến dịch vụ AI. |
| Bước 4 | Dịch vụ AI phân tích ý định câu hỏi: - Câu hỏi về đơn hàng cá nhân → yêu cầu đăng nhập. Kết thúc (chờ đăng nhập). - Các ý định khác → Bước 5. |
| Bước 5 | Dịch vụ AI tìm kiếm ngữ nghĩa trên Knowledge Base: - Có kết quả liên quan → Bước 6. - Không có → trả lời "Chưa có thông tin, liên hệ hỗ trợ?". Kết thúc. |
| Bước 6 | Tính độ tin cậy: - Đạt ngưỡng → Bước 7. - Dưới ngưỡng → đề xuất liên hệ hỗ trợ hoặc hỏi lại. Kết thúc. |
| Bước 7 | Dịch vụ AI tổng hợp câu trả lời từ nội dung tài liệu, đính kèm liên kết liên quan và câu hỏi gợi ý. |
| Bước 8 | Hệ thống hiển thị câu trả lời với nội dung, liên kết và câu hỏi gợi ý tiếp theo. |
| Bước 9 | USER (tùy chọn) nhấn 👍/👎 để đánh giá chất lượng câu trả lời. |
| Bước 10 | USER có thể hỏi tiếp (hội thoại nhiều lượt, hệ thống duy trì ngữ cảnh). Quay lại Bước 2. |
| Bước 11 | Hệ thống lưu lịch sử hội thoại phục vụ cải thiện chất lượng. Kết thúc luồng. |

---
