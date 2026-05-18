# Activity Diagrams (PlantUML) – UC-09 đến UC-16

---

## UC-09: Phát hành vé điện tử, QR động và NFT Ticket

```plantuml
@startuml UC-09_Activity
|Hệ thống|
start
:Nhận sự kiện thanh toán thành công\n(mã đơn hàng, người mua, sự kiện, danh sách ghế);
:Sinh mã vé duy nhất cho mỗi ghế trong đơn hàng;
:Ghi nhận liên kết:\nmã vé ↔ đơn hàng ↔ người mua ↔ sự kiện ↔ ghế ↔ hạng vé;
:Tạo mã bảo mật TOTP riêng cho từng vé;
:Sinh mã QR động từ TOTP\n(QR tự động thay đổi mỗi 30 giây);

if (Sự kiện có bật NFT?) then (Có)
  :Mint NFT Ticket với metadata vé;
  if (Mint thành công?) then (Có)
  else (Không)
    :Đánh dấu off-chain, thử lại sau;
  endif
else (Không)
endif

:Lưu vé vào cơ sở dữ liệu\n(trạng thái ACTIVE);

if (Lưu thành công?) then (Có)
  :Gửi Email xác nhận vé\n+ Push "Vé của bạn đã sẵn sàng";

  |Người dùng|
  :Mở ví vé điện tử,\nthấy vé mới với QR động tự động cập nhật;
  stop
else (Không)
  |Hệ thống|
  :Rollback và đưa vào\nhàng đợi xử lý lại;
  stop
endif

@enduml
```

---

## UC-10: Quản lý ví vé điện tử của người dùng

```plantuml
@startuml UC-10_Activity
|Người dùng|
start
:Nhấn vào mục "Ví vé" / "My Tickets"\ntrên giao diện chính;

|Hệ thống|
:Lấy danh sách vé của người dùng;
:Hiển thị danh sách vé,\nnhóm theo: Sắp diễn ra / Đã qua\n+ badge trạng thái;

|Người dùng|
:Chọn một vé cụ thể để xem chi tiết;

|Hệ thống|
if (Trạng thái vé?) then (ACTIVE)
  :Hiển thị QR động tự động\ncập nhật mỗi 30 giây kèm countdown;
  :Hiển thị đầy đủ thông tin chi tiết vé:\ntên sự kiện, ngày giờ, địa điểm,\nkhu vực, hàng, ghế, hạng vé, mã vé;

  |Người dùng|
  if (Chọn hành động?) then (Lưu vào Wallet)
    |Hệ thống|
    :Tạo pass cho Apple/Google Wallet;
    stop
  elseif (Niêm yết resale)
    :Chuyển sang UC-13;
    stop
  else (Xem hướng dẫn)
    :Hiển thị modal hướng dẫn vào cổng;
    stop
  endif
elseif (USED)
  :Hiển thị lịch sử check-in\n(thời gian, cổng);
  stop
elseif (REFUNDED)
  :Hiển thị thông tin hoàn tiền, ẩn QR;
  stop
else (FROZEN)
  :Hiển thị link listing trên Resale Market;
  stop
endif

@enduml
```

---

## UC-11: Check-in vé tại cổng

```plantuml
@startuml UC-11_Activity
|STAFF|
start
:Mở Staff App, đăng nhập\nvới tài khoản nhân viên soát vé;
:Chọn sự kiện đang diễn ra\nvà cổng check-in được phân công;
:Nhấn "Quét vé", ứng dụng\nkích hoạt camera, hiển thị viewfinder;

|USER|
:Mở ví vé, chọn vé,\nmàn hình hiển thị QR động đang tự động cập nhật;

|Hệ thống|
:Quét QR code, giải mã ra\nthông tin vé và mã xác thực;

if (Mã TOTP hợp lệ?) then (Hợp lệ)
  if (Kiểm tra trạng thái vé) then (Tất cả OK)
    :Cập nhật vé sang trạng thái USED,\nghi nhận thời gian, nhân viên và cổng;
    :Ghi log check-in;
    :Hiển thị màn hình xanh\n"✓ CHECK-IN THÀNH CÔNG"\n+ thông tin ghế (tự động reset sau 3s);

    |STAFF|
    :Cho USER đi qua cổng;
    stop
  elseif (Vé đã USED)
    :Cảnh báo "Vé đã sử dụng"\nkèm thời điểm check-in lần đầu;
    stop
  else (Sai sự kiện/cổng)
    :Từ chối, hiển thị "Sai sự kiện/cổng";
    stop
  endif
else (Không hợp lệ)
  :Hiển thị CHECK-IN INVALID\n(màn hình đỏ);
  :Ghi log quét thất bại;
  stop
endif

@enduml
```

---

## UC-12: Check-in offline và đồng bộ dữ liệu

```plantuml
@startuml UC-12_Activity
|STAFF|
start
:Mở Staff App (khi có mạng),\nchọn sự kiện/cổng,\nnhấn "Tải dữ liệu offline";

|Hệ thống|
:Tải và lưu trữ danh sách vé (mã hóa)\nvào bộ nhớ cục bộ thiết bị;
:Phát hiện mất mạng → Chuyển sang\nchế độ offline, hiển thị badge "OFFLINE";

|STAFF|
:Quét QR động của USER bằng camera;

|Hệ thống|
:Giải mã ra thông tin vé và mã xác thực;

if (Vé có trong bộ nhớ cục bộ?) then (Tìm thấy)
  if (Xác thực mã TOTP cục bộ?) then (Hợp lệ)
    if (Vé đã sử dụng trong bộ nhớ cục bộ?) then (Chưa used)
      :Ghi nhận check-in cục bộ,\nđánh dấu vé đã sử dụng;
      :Hiển thị "✓ CHECK-IN OK (OFFLINE)"\n+ thông tin ghế + badge "Chờ đồng bộ";

      if (Có mạng trở lại?) then (Có)
        :Tự động kích hoạt đồng bộ dữ liệu;
        :Gửi toàn bộ bản ghi check-in\nchờ đồng bộ về server;
        :Server xử lý:\n- Vé chưa sử dụng → cập nhật\n- Vé đã sử dụng bởi thiết bị khác → đánh dấu trùng lặp;
        :Trả kết quả đồng bộ,\ncập nhật trạng thái các bản ghi;
        stop
      else (Chưa)
        stop
      endif
    else (Đã used)
      :Hiển thị "Vé đã sử dụng";
      stop
    endif
  else (Không hợp lệ)
    :Hiển thị INVALID;
    stop
  endif
else (Không tìm thấy)
  :Hiển thị "Không thể xác minh offline\n– cần kết nối mạng";
  stop
endif

@enduml
```

---

## UC-13: Giao dịch vé thứ cấp trên Resale Market

```plantuml
@startuml UC-13_Activity
|Seller|
start
:Từ ví vé, chọn vé ACTIVE\nvà nhấn "Bán lại";

|Hệ thống|
if (Kiểm tra điều kiện vé?) then (Đủ điều kiện)
else (Không đủ)
  :Trả lỗi, hiển thị lý do;
  stop
endif

|Seller|
:Nhập giá mong muốn\n(giao diện hiển thị giá gốc và giá trần 120%);

|Hệ thống|
if (Giá ≤ 120% giá gốc?) then (Hợp lệ)
  :Đóng băng vé (FROZEN)\nvà tạo niêm yết trên Resale Market;
  :Niêm yết xuất hiện trên sàn giao dịch;
else (Vượt trần)
  :Từ chối, hiển thị\n"Giá vượt mức cho phép";
  stop
endif

|Buyer|
:Duyệt sàn, chọn niêm yết phù hợp,\nnhấn "Mua ngay";

|Hệ thống|
:Giữ tiền qua escrow;

if (Buyer thanh toán thành công?) then (Thành công)
  :Chuyển quyền sở hữu vé cho buyer,\ncập nhật niêm yết = ĐÃ BÁN;
  :Vô hiệu hóa mã bảo mật cũ của seller;
  :Sinh mã bảo mật mới cho buyer\n(vé trở lại ACTIVE với chủ mới);
  :Giải ngân cho seller (trừ phí nền tảng);
  :Gửi thông báo cho seller và buyer;
  stop
else (Thất bại)
  :Thông báo thanh toán thất bại,\nniêm yết vẫn hiệu lực;
  stop
endif

@enduml
```

---

## UC-14: Quản lý merchandise, combo và tồn kho

```plantuml
@startuml UC-14_Activity
|ORGANIZER|
start
:Đăng nhập Organizer Portal,\nchọn menu "Merchandise";
:Nhấn "Tạo sản phẩm mới", nhập thông tin:\ntên, mô tả, ảnh, SKU, giá, biến thể, tồn kho;

|Hệ thống|
if (Kiểm tra dữ liệu?) then (Hợp lệ)
  :Lưu sản phẩm;
else (SKU trùng)
  :Hiển thị lỗi "SKU đã tồn tại";
  stop
endif

|ORGANIZER|
:Chọn sự kiện → Gắn sản phẩm với sự kiện;
:Tạo combo/upsell:\nchọn hạng vé + sản phẩm, đặt giá combo\nhoặc cấu hình gợi ý mua thêm;

|Hệ thống|
:Trang sự kiện hiển thị tab "Merchandise"\nvà popup gợi ý khi USER checkout;

|USER|
:Chọn sản phẩm/combo, thêm vào giỏ;

|Hệ thống|
if (Kiểm tra tồn kho?) then (Đủ)
  :Thêm vào giỏ thành công;
else (Hết)
  :Hiển thị "Hết hàng";
  stop
endif

|USER|
:Thanh toán thành công;

|Hệ thống|
:Trừ tồn kho;

if (Tồn kho dưới ngưỡng cảnh báo?) then (Có)
  :Gửi cảnh báo cho Organizer:\n"Sản phẩm sắp hết hàng";
  stop
else (Không)
  stop
endif

@enduml
```

---

## UC-15: Quản trị, báo cáo, đối soát, refund và hóa đơn

```plantuml
@startuml UC-15_Activity
|ADMIN / ORGANIZER|
start
:Đăng nhập, được điều hướng vào\ntrang quản trị tương ứng theo vai trò;

|Hệ thống|
:Truy vấn dữ liệu: tổng doanh thu,\nsố vé bán, tỷ lệ check-in, refund, payout\n(lọc theo phạm vi nếu là Organizer);
:Hiển thị dashboard:\nbiểu đồ doanh thu, các chỉ số KPI;

|ADMIN / ORGANIZER|
if (Lựa chọn hành động?) then (Đối soát)

  |Hệ thống|
  :Lấy danh sách giao dịch từ cổng thanh toán;
  if (So sánh từng giao dịch?) then (Khớp)
    :Đánh dấu đã đối soát;
    stop
  else (Không khớp)
    :Đánh dấu lệch + cảnh báo Admin;
    stop
  endif

elseif (Refund)

  |ADMIN / ORGANIZER|
  :Chọn đơn hàng cần refund,\nchọn loại (toàn phần/một phần/hàng loạt),\nnhập lý do;

  |Hệ thống|
  :Gọi cổng thanh toán để hoàn tiền;
  if (Hoàn tiền thành công?) then (Có)
    :Cập nhật trạng thái đơn hàng và vé\n= ĐÃ HOÀN TIỀN,\nnhả ghế nếu sự kiện chưa diễn ra;
    :Gửi thông báo hoàn tiền cho người dùng;
    stop
  else (Không)
    :Lưu trạng thái lỗi, cho phép thử lại;
    stop
  endif

elseif (Xuất hóa đơn)

  |Hệ thống|
  :Xuất hóa đơn điện tử, ký số;
  if (Xuất thành công?) then (Có)
    :Lưu hóa đơn đã ký số,\nliên kết với đơn hàng;
    stop
  else (Không)
    :Đưa vào hàng đợi thử lại,\ncảnh báo Admin;
    stop
  endif

else (Export báo cáo)

  |ADMIN / ORGANIZER|
  :Chọn khoảng thời gian + loại báo cáo;

  |Hệ thống|
  :Tạo file Excel/CSV/PDF,\ntrả link tải về;
  stop

endif

@enduml
```

---

## UC-16: Hỏi đáp với AI Chatbot

```plantuml
@startuml UC-16_Activity
|Người dùng|
start
:Click vào biểu tượng chat trên website\n(cửa sổ chat mở ra với lời chào);
:Gõ câu hỏi bằng ngôn ngữ tự nhiên\nvà nhấn Gửi;

|Hệ thống|
:Gửi câu hỏi đến dịch vụ AI;
:Phân tích ý định câu hỏi;

if (Câu hỏi về đơn hàng cá nhân?) then (Có)
  if (Người dùng đã đăng nhập?) then (Có)
    :Truy vấn thông tin đơn hàng cá nhân;
    :Tổng hợp câu trả lời từ dữ liệu cá nhân;
  else (Không)
    :Yêu cầu đăng nhập trước;
    stop
  endif
else (Không)
  :Tìm kiếm ngữ nghĩa trên Knowledge Base;
  if (Có kết quả liên quan?) then (Có)
    if (Độ tin cậy đạt ngưỡng?) then (Đạt)
      :Tổng hợp câu trả lời từ nội dung tài liệu,\nđính kèm liên kết liên quan và câu hỏi gợi ý;
    else (Không đạt)
      :Trả lời "Không chắc chắn"\n+ đề xuất liên hệ hỗ trợ hoặc hỏi lại;
      stop
    endif
  else (Không)
    :Trả lời "Chưa có thông tin,\nliên hệ hỗ trợ?";
    stop
  endif
endif

:Hiển thị câu trả lời với nội dung,\nliên kết và câu hỏi gợi ý tiếp theo;

|Người dùng|
:Nhấn like và unlike để đánh giá (tùy chọn);

if (Hỏi tiếp?) then (Có)
  :Gõ câu hỏi tiếp theo\n(hệ thống duy trì ngữ cảnh);
  note right: Quay lại bước phân tích ý định
  stop
else (Không)
  |Hệ thống|
  :Lưu lịch sử hội thoại\nphục vụ cải thiện chất lượng;
  stop
endif

@enduml
```

---
