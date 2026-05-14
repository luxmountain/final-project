# **ĐẶC TẢ USE CASE HỆ THỐNG PHÂN PHỐI VÉ VÀ VẬT PHẨM SỰ KIỆN**

## **1\. Giới thiệu**

### **1.1. Mục đích tài liệu**

Tài liệu này mô tả các use case cốt lõi của hệ thống Web SaaS phân phối vé sự kiện, bán vật phẩm sự kiện, hỗ trợ sàn giao dịch vé thứ cấp, AI recommendation/chatbot, blockchain/NFT ticketing và quy trình check-in bằng QR động.

### **1.2. Phạm vi hệ thống**

Hệ thống bao gồm các nhóm nghiệp vụ chính:

* Quản lý danh tính, đăng nhập và phân quyền.  
* Quản lý sự kiện, venue, sơ đồ ghế và hạng vé.  
* Quản lý đặt vé, giữ ghế, giỏ hàng và thanh toán.  
* Quản lý vé điện tử, QR động, TOTP và check-in.  
* Quản lý sàn giao dịch vé thứ cấp.  
* Quản lý vật phẩm sự kiện và combo upsell.  
* AI gợi ý sự kiện/vật phẩm và chatbot Q\&A.  
* Quản lý thông báo.  
* Quản lý báo cáo, tài chính, đối soát và hóa đơn.  
* Quản lý blockchain/NFT ticketing.  
* Quản trị hệ thống, kiểm duyệt và tích hợp bên thứ ba.

### **1.3. Tác nhân hệ thống**

| Actor | Loại actor | Mô tả |
| ----- | ----- | ----- |
| Khách vãng lai | Actor độc lập | Người chưa đăng nhập, có thể xem/tìm kiếm sự kiện công khai, xem chi tiết sự kiện, đăng ký tài khoản và hỏi chatbot ở phạm vi thông tin công khai. |
| Thành viên hệ thống | Actor tổng quát | Người đã có tài khoản trong hệ thống, có các hành vi chung như đăng nhập, đăng xuất, quản lý hồ sơ, đổi/khôi phục mật khẩu, nhận thông báo. |
| USER | Actor chuyên biệt kế thừa từ Thành viên hệ thống | Người dùng cuối, người mua vé, người mua vật phẩm, người bán/mua vé resale; trong check-in là người xuất trình vé/QR cho Staff quét. |
| ORGANIZER | Actor chuyên biệt kế thừa từ Thành viên hệ thống | Ban tổ chức sự kiện, có quyền tạo sự kiện, cấu hình vé, quản lý merchandise và xem báo cáo. |
| STAFF | Actor chuyên biệt kế thừa từ Thành viên hệ thống | Nhân viên soát vé tại cổng, thực hiện quét QR và check-in cho USER. |
| ADMIN | Actor chuyên biệt kế thừa từ Thành viên hệ thống | Quản trị viên nền tảng, có quyền phê duyệt organizer, phê duyệt sự kiện, xử lý refund, quản trị hệ thống. |

## **2\. Danh sách Use Case cốt lõi**

| Mã UC | Tên Use Case | Actor chính | Mức độ ưu tiên |
| ----- | ----- | ----- | ----- |
| UC-01 | Đăng ký, đăng nhập và quản lý tài khoản | Khách vãng lai, Thành viên hệ thống | Cao |
| UC-02 | Đăng ký và phê duyệt Organizer | ORGANIZER, ADMIN | Cao |
| UC-03 | Tạo và cấu hình sự kiện | ORGANIZER | Cao |
| UC-04 | Thiết kế sơ đồ ghế và cấu hình hạng vé | ORGANIZER | Cao |
| UC-05 | Phê duyệt sự kiện | ADMIN | Cao |
| UC-06 | Tìm kiếm, khám phá và nhận gợi ý sự kiện/vật phẩm | Khách vãng lai, USER | Cao |
| UC-07 | Đặt vé, chọn ghế và giữ ghế tạm thời | USER | Rất cao |
| UC-08 | Thanh toán đơn hàng vé/merchandise | USER | Rất cao |
| UC-09 | Phát hành vé điện tử, QR động và NFT Ticket | USER | Rất cao |
| UC-10 | Quản lý ví vé điện tử của người dùng | USER | Cao |
| UC-11 | Check-in vé tại cổng | USER, STAFF | Rất cao |
| UC-12 | Check-in offline và đồng bộ dữ liệu | STAFF | Cao |
| UC-13 | Giao dịch vé thứ cấp trên Resale Market | USER | Cao |
| UC-14 | Quản lý merchandise, combo và tồn kho | ORGANIZER | Cao |
| UC-15 | Quản trị, báo cáo, đối soát, refund và hóa đơn | ADMIN, ORGANIZER | Cao |
| UC-16 | Hỏi đáp với AI Chatbot | Khách vãng lai, USER, ADMIN | Cao |

## **3\. Sơ đồ Use Case tổng quát**

## **4\. Đặc tả chi tiết Use Case**

## **UC-01. Đăng ký, đăng nhập và quản lý tài khoản**

| Thuộc tính | Nội dung |
| ----- | ----- |
| Mã Use Case | UC-01 |
| Tên Use Case | Đăng ký, đăng nhập và quản lý tài khoản |
| Actor chính | USER, ORGANIZER, STAFF, ADMIN |
| Actor phụ | SYSTEM |
| Mục tiêu | Cho phép người dùng truy cập hệ thống an toàn bằng Email/Password hoặc Google OAuth, đồng thời quản lý hồ sơ cá nhân và phiên đăng nhập. |
| Tiền điều kiện | Người dùng có email hợp lệ hoặc tài khoản Google. |
| Hậu điều kiện | Tài khoản được tạo/kích hoạt hoặc người dùng đăng nhập thành công và nhận phiên truy cập hợp lệ. |
| Mức ưu tiên | Cao |

### **Luồng chính**

1. Người dùng chọn đăng ký hoặc đăng nhập.  
2. Hệ thống hiển thị phương thức Email/Password hoặc Google OAuth.  
3. Người dùng nhập thông tin hoặc xác thực qua Google.  
4. Hệ thống kiểm tra email, mật khẩu, trạng thái tài khoản.  
5. Nếu đăng ký mới, hệ thống gửi OTP xác thực.  
6. Người dùng nhập OTP.  
7. Hệ thống xác thực OTP và kích hoạt tài khoản.  
8. Hệ thống cấp Access Token và Refresh Token.  
9. Người dùng truy cập hệ thống theo quyền được cấp.

### **Luồng thay thế/ngoại lệ**

* A1. Email đã tồn tại: hệ thống thông báo và yêu cầu đăng nhập hoặc dùng email khác.  
* A2. OTP sai/hết hạn: hệ thống yêu cầu gửi lại OTP.  
* A3. Đăng nhập sai nhiều lần: tài khoản bị khóa tạm thời.  
* A4. Người dùng quên mật khẩu: hệ thống chuyển sang quy trình reset password bằng OTP.  
* A5. Token hết hạn: hệ thống dùng Refresh Token để cấp Access Token mới.

### **Quy tắc nghiệp vụ**

* Email không được trùng.  
* OTP có thời hạn hiệu lực.  
* Mật khẩu phải được mã hóa trước khi lưu.  
* Sau khi reset password, toàn bộ session cũ phải bị thu hồi.  
* Role mặc định của tài khoản thường là USER.

## **UC-02. Đăng ký và phê duyệt Organizer**

| Thuộc tính | Nội dung |
| ----- | ----- |
| Mã Use Case | UC-02 |
| Tên Use Case | Đăng ký và phê duyệt Organizer |
| Actor chính | ORGANIZER, ADMIN |
| Actor phụ | SYSTEM |
| Mục tiêu | Cho phép đơn vị tổ chức đăng ký tài khoản Organizer và được Admin phê duyệt trước khi tạo sự kiện. |
| Tiền điều kiện | Người dùng đã có tài khoản hệ thống. |
| Hậu điều kiện | Organizer được phê duyệt hoặc bị từ chối kèm lý do. |
| Mức ưu tiên | Cao |

### **Luồng chính**

1. Người dùng chọn đăng ký trở thành Organizer.  
2. Hệ thống hiển thị form thông tin tổ chức.  
3. Organizer nhập thông tin pháp nhân, người đại diện, giấy phép/tài liệu xác minh.  
4. Organizer gửi hồ sơ phê duyệt.  
5. Hệ thống chuyển trạng thái hồ sơ sang “Chờ duyệt”.  
6. Admin xem danh sách hồ sơ Organizer.  
7. Admin kiểm tra thông tin và tài liệu.  
8. Admin phê duyệt hồ sơ.  
9. Hệ thống cấp quyền ORGANIZER và gửi thông báo kết quả.

### **Luồng thay thế/ngoại lệ**

* A1. Hồ sơ thiếu thông tin: hệ thống yêu cầu bổ sung.  
* A2. Admin từ chối hồ sơ: hệ thống lưu lý do từ chối và thông báo cho Organizer.  
* A3. Organizer vi phạm chính sách: Admin khóa quyền Organizer.

### **Quy tắc nghiệp vụ**

* Chỉ Organizer được phê duyệt mới có quyền tạo sự kiện.  
* Một Organizer chỉ được quản lý dữ liệu thuộc tenant của mình.  
* Mọi thao tác phê duyệt/từ chối phải được ghi audit log.

## **UC-03. Tạo và cấu hình sự kiện**

| Thuộc tính | Nội dung |
| ----- | ----- |
| Mã Use Case | UC-03 |
| Tên Use Case | Tạo và cấu hình sự kiện |
| Actor chính | ORGANIZER |
| Actor phụ | ADMIN |
| Mục tiêu | Cho phép Organizer tạo sự kiện với đầy đủ thông tin cơ bản, truyền thông, thời gian, địa điểm và trạng thái vận hành. |
| Tiền điều kiện | Organizer đã được phê duyệt. |
| Hậu điều kiện | Sự kiện được tạo ở trạng thái nháp hoặc chờ phê duyệt. |
| Mức ưu tiên | Cao |

### **Luồng chính**

1. Organizer truy cập trang quản lý sự kiện.  
2. Organizer chọn tạo sự kiện mới.  
3. Hệ thống hiển thị form nhập thông tin sự kiện.  
4. Organizer nhập tên, mô tả, thời gian, địa điểm, banner, thể loại và quy định sự kiện.  
5. Organizer lưu bản nháp.  
6. Organizer hoàn thiện thông tin và gửi yêu cầu phê duyệt.  
7. Hệ thống kiểm tra dữ liệu bắt buộc.  
8. Hệ thống chuyển sự kiện sang trạng thái “Chờ duyệt”.

### **Luồng thay thế/ngoại lệ**

* A1. Thiếu thông tin bắt buộc: hệ thống cảnh báo các trường cần bổ sung.  
* A2. Thời gian sự kiện không hợp lệ: hệ thống từ chối lưu.  
* A3. Organizer hủy sự kiện: hệ thống chuyển trạng thái “Đã hủy” và kích hoạt quy trình thông báo/refund nếu đã bán vé.

### **Quy tắc nghiệp vụ**

* Sự kiện chỉ được public sau khi Admin phê duyệt.  
* Organizer chỉ được sửa sự kiện thuộc tenant của mình.  
* Nếu sự kiện đã mở bán, việc thay đổi thời gian/địa điểm cần ghi nhận lịch sử và thông báo người dùng.

## **UC-04. Thiết kế sơ đồ ghế và cấu hình hạng vé**

| Thuộc tính | Nội dung |
| ----- | ----- |
| Mã Use Case | UC-04 |
| Tên Use Case | Thiết kế sơ đồ ghế và cấu hình hạng vé |
| Actor chính | ORGANIZER |
| Actor phụ | SYSTEM |
| Mục tiêu | Cho phép Organizer thiết kế venue/seat map và cấu hình hạng vé, giá vé, quota, thời gian mở bán. |
| Tiền điều kiện | Sự kiện đã được tạo. |
| Hậu điều kiện | Sơ đồ ghế và chính sách vé sẵn sàng để mở bán. |
| Mức ưu tiên | Cao |

### **Luồng chính**

1. Organizer chọn sự kiện cần cấu hình.  
2. Organizer tạo venue hoặc chọn venue có sẵn.  
3. Organizer thiết kế Zone, Block, Row, Seat.  
4. Organizer import seat map JSON hoặc kéo thả trực quan.  
5. Organizer tạo hạng vé: VIP, Standard, Early Bird, Presale, Combo.  
6. Organizer thiết lập giá, quota, giới hạn mua và thời gian mở bán.  
7. Hệ thống kiểm tra tính hợp lệ của seat map và quota.  
8. Organizer lưu cấu hình.

### **Luồng thay thế/ngoại lệ**

* A1. Ghế bị trùng mã/vị trí: hệ thống từ chối lưu sơ đồ ghế.  
* A2. Tổng quota vượt sức chứa venue: hệ thống cảnh báo.  
* A3. Giá vé không hợp lệ: hệ thống yêu cầu điều chỉnh.

### **Quy tắc nghiệp vụ**

* Ghế trong cùng sự kiện phải có định danh duy nhất.  
* Quota từng hạng vé không được vượt tổng số ghế khả dụng.  
* Một ghế chỉ gắn với một trạng thái tại một thời điểm: Available, Locked, Sold, Used, Disabled.

## **UC-05. Phê duyệt sự kiện**

| Thuộc tính | Nội dung |
| ----- | ----- |
| Mã Use Case | UC-05 |
| Tên Use Case | Phê duyệt sự kiện |
| Actor chính | ADMIN |
| Actor phụ | ORGANIZER |
| Mục tiêu | Đảm bảo sự kiện được kiểm duyệt trước khi hiển thị công khai. |
| Tiền điều kiện | Organizer đã gửi sự kiện để phê duyệt. |
| Hậu điều kiện | Sự kiện được phê duyệt hoặc bị từ chối kèm lý do. |
| Mức ưu tiên | Cao |

### **Luồng chính**

1. Admin truy cập danh sách sự kiện chờ duyệt.  
2. Admin xem chi tiết thông tin sự kiện, sơ đồ ghế, hạng vé, chính sách bán.  
3. Admin kiểm tra nội dung, pháp lý, hình ảnh, thời gian và quy định sự kiện.  
4. Admin chọn phê duyệt.  
5. Hệ thống chuyển trạng thái sự kiện sang “Đã duyệt”.  
6. Hệ thống cho phép sự kiện được public theo lịch mở bán.  
7. Hệ thống gửi thông báo cho Organizer.

### **Luồng thay thế/ngoại lệ**

* A1. Admin từ chối sự kiện: hệ thống yêu cầu nhập lý do.  
* A2. Sự kiện cần chỉnh sửa: hệ thống chuyển trạng thái về “Yêu cầu bổ sung”.  
* A3. Sự kiện vi phạm chính sách nghiêm trọng: Admin khóa sự kiện hoặc khóa Organizer.

### **Quy tắc nghiệp vụ**

* Chỉ Admin có quyền phê duyệt sự kiện.  
* Mọi thao tác kiểm duyệt phải có audit log.  
* Sự kiện chưa duyệt không được hiển thị công khai.

## **UC-06. Tìm kiếm, khám phá và nhận gợi ý sự kiện/vật phẩm**

| Thuộc tính | Nội dung |
| ----- | ----- |
| Mã Use Case | UC-06 |
| Tên Use Case | Tìm kiếm, khám phá và nhận gợi ý sự kiện/vật phẩm |
| Actor chính | USER |
| Actor phụ | SYSTEM |
| Mục tiêu | Giúp người dùng tìm sự kiện/vật phẩm phù hợp thông qua tìm kiếm, bộ lọc và AI Recommendation. |
| Tiền điều kiện | Có sự kiện đã được public; có dữ liệu sự kiện/vật phẩm đủ để tìm kiếm hoặc gợi ý. |
| Hậu điều kiện | Người dùng xem được danh sách sự kiện/vật phẩm phù hợp với nhu cầu hoặc hành vi. |
| Mức ưu tiên | Cao |

### **Luồng chính**

1. Người dùng truy cập trang khám phá sự kiện hoặc trang chi tiết sự kiện.  
2. Người dùng nhập từ khóa hoặc chọn bộ lọc theo địa điểm, thời gian, giá, thể loại.  
3. Hệ thống truy vấn danh sách sự kiện phù hợp.  
4. AI Service phân tích hành vi, lịch sử xem/mua và nội dung sự kiện/vật phẩm.  
5. Hệ thống hiển thị kết quả tìm kiếm và danh sách gợi ý sự kiện/vật phẩm liên quan.  
6. Người dùng chọn một sự kiện hoặc vật phẩm để xem chi tiết.

### **Luồng thay thế/ngoại lệ**

* A1. Không có kết quả: hệ thống đề xuất sự kiện tương tự hoặc sự kiện nổi bật.  
* A2. Người dùng chưa đăng nhập: hệ thống vẫn cho phép tìm kiếm nhưng gợi ý cá nhân hóa bị giới hạn.  
* A3. AI không đủ dữ liệu: hệ thống dùng gợi ý phổ biến, gợi ý theo thể loại hoặc gợi ý theo sự kiện đang xem.

### **Quy tắc nghiệp vụ**

* Chỉ hiển thị sự kiện đã được phê duyệt và public.  
* Recommendation phải tuân thủ quyền riêng tư dữ liệu người dùng.  
* Kết quả gợi ý không được hiển thị sự kiện đã hủy, hết vé hoặc bị khóa nếu hệ thống không cho phép bán.  
* Gợi ý merchandise phải ưu tiên vật phẩm còn tồn kho và liên quan tới sự kiện.

## **UC-07. Đặt vé, chọn ghế và giữ ghế tạm thời**

| Thuộc tính | Nội dung |
| ----- | ----- |
| Mã Use Case | UC-07 |
| Tên Use Case | Đặt vé, chọn ghế và giữ ghế tạm thời |
| Actor chính | USER |
| Actor phụ | SYSTEM |
| Mục tiêu | Cho phép người dùng chọn ghế/vé và giữ ghế tạm thời trong thời gian thanh toán, đảm bảo không bán trùng ghế. |
| Tiền điều kiện | Người dùng đã đăng nhập; sự kiện đang mở bán; còn vé khả dụng. |
| Hậu điều kiện | Ghế/vé được lock tạm thời và đưa vào giỏ hàng hoặc được giải phóng nếu hết TTL. |
| Mức ưu tiên | Rất cao |

### **Luồng chính**

1. Người dùng mở trang chi tiết sự kiện.  
2. Hệ thống hiển thị seat map realtime.  
3. Người dùng chọn ghế hoặc loại vé.  
4. Hệ thống kiểm tra trạng thái ghế/vé.  
5. Hệ thống dùng distributed lock để khóa ghế tạm thời.  
6. Hệ thống hiển thị thời gian giữ ghế còn lại.  
7. Người dùng thêm vé vào giỏ hàng.  
8. Người dùng tiếp tục thanh toán.

### **Luồng thay thế/ngoại lệ**

* A1. Ghế đã bị người khác giữ: hệ thống báo không khả dụng và cập nhật seat map.  
* A2. Hết thời gian giữ ghế: hệ thống tự động nhả ghế.  
* A3. Người dùng rời trang hoặc hủy giỏ hàng: hệ thống giải phóng ghế.  
* A4. Tải hệ thống cao: người dùng được đưa vào waiting room/queue mua vé.

### **Quy tắc nghiệp vụ**

* Một ghế chỉ được lock bởi một người tại cùng thời điểm.  
* TTL giữ ghế khuyến nghị 10–15 phút.  
* Không cho phép double booking.  
* Khi order timeout, toàn bộ lock liên quan phải được giải phóng.

## **UC-08. Thanh toán đơn hàng vé/merchandise**

| Thuộc tính | Nội dung |
| ----- | ----- |
| Mã Use Case | UC-08 |
| Tên Use Case | Thanh toán đơn hàng vé/merchandise |
| Actor chính | USER |
| Actor phụ | Không có |
| Mục tiêu | Cho phép người dùng thanh toán đơn hàng gồm vé, merchandise hoặc combo. |
| Tiền điều kiện | Người dùng có giỏ hàng hợp lệ; ghế/vé đang được giữ; tồn kho merchandise đủ. |
| Hậu điều kiện | Đơn hàng được xác nhận, vé được phát hành, tồn kho được trừ và thông báo được gửi. |
| Mức ưu tiên | Rất cao |

### **Luồng chính**

1. Người dùng kiểm tra giỏ hàng.  
2. Hệ thống tính tổng tiền, phí, voucher và điều kiện combo.  
3. Người dùng chọn phương thức thanh toán.  
4. Hệ thống tạo order trạng thái Pending Payment.  
5. Hệ thống chuyển người dùng sang Payment Gateway.  
6. Người dùng thanh toán thành công.  
7. Payment Gateway gửi callback/webhook về hệ thống.  
8. Hệ thống xác thực callback.  
9. Hệ thống cập nhật order thành Confirmed.  
10. Hệ thống phát hành vé điện tử và trừ tồn kho merchandise.  
11. Hệ thống gửi thông báo xác nhận đơn hàng.

### **Luồng thay thế/ngoại lệ**

* A1. Thanh toán thất bại: order chuyển sang Failed hoặc cho phép retry.  
* A2. Callback không hợp lệ: hệ thống từ chối cập nhật trạng thái.  
* A3. Quá thời gian thanh toán: order timeout, ghế được nhả.  
* A4. Tồn kho merchandise thay đổi: hệ thống yêu cầu cập nhật giỏ hàng.

### **Quy tắc nghiệp vụ**

* Payment callback/webhook phải được xác thực chữ ký.  
* Không phát hành vé nếu thanh toán chưa xác nhận.  
* Đơn hàng timeout phải tự động hủy.  
* Không lưu thông tin thẻ/thanh toán nhạy cảm dạng plaintext.

## **UC-09. Phát hành vé điện tử, QR động và NFT Ticket**

| Thuộc tính | Nội dung |
| ----- | ----- |
| Mã Use Case | UC-09 |
| Tên Use Case | Phát hành vé điện tử, QR động và NFT Ticket |
| Actor chính | SYSTEM |
| Actor phụ | USER |
| Mục tiêu | Phát hành vé điện tử sau thanh toán, tạo QR động chống giả mạo và ghi nhận NFT/on-chain nếu áp dụng. |
| Tiền điều kiện | Đơn hàng đã thanh toán thành công. |
| Hậu điều kiện | Vé điện tử được tạo, liên kết với người mua và hiển thị trong ví vé. |
| Mức ưu tiên | Rất cao |

### **Luồng chính**

1. Hệ thống nhận sự kiện thanh toán thành công.  
2. Hệ thống tạo Ticket ID duy nhất.  
3. Hệ thống mapping ticket với order, user, event, seat và ticket class.  
4. Hệ thống sinh TOTP Secret cho từng vé.  
5. Hệ thống tạo QR động thay đổi theo chu kỳ.  
6. Hệ thống mint NFT Ticket hoặc ghi transaction hash nếu cấu hình blockchain được bật.  
7. Hệ thống lưu metadata vé.  
8. Hệ thống gửi thông báo vé đã sẵn sàng cho người dùng.

### **Luồng thay thế/ngoại lệ**

* A1. Mint NFT thất bại: vé vẫn được phát hành ở trạng thái off-chain và hệ thống retry blockchain sau.  
* A2. Lỗi phát hành vé: hệ thống rollback hoặc đưa vào hàng đợi xử lý lại.  
* A3. Seat mapping lỗi: hệ thống cảnh báo Admin xử lý ngoại lệ.

### **Quy tắc nghiệp vụ**

* Mỗi vé phải có Ticket ID duy nhất.  
* QR động phải được tạo từ TOTP Secret riêng của vé.  
* QR/TOTP cũ phải bị vô hiệu khi vé được chuyển nhượng resale.  
* Transaction hash blockchain không được sửa đổi.

## **UC-10. Quản lý ví vé điện tử của người dùng**

| Thuộc tính | Nội dung |
| ----- | ----- |
| Mã Use Case | UC-10 |
| Tên Use Case | Quản lý ví vé điện tử |
| Actor chính | USER |
| Actor phụ | SYSTEM |
| Mục tiêu | Cho phép người dùng xem và quản lý vé điện tử đã mua. |
| Tiền điều kiện | Người dùng đã đăng nhập và có vé hợp lệ. |
| Hậu điều kiện | Người dùng xem được thông tin vé, trạng thái vé và QR động. |
| Mức ưu tiên | Cao |

### **Luồng chính**

1. Người dùng truy cập ví vé điện tử.  
2. Hệ thống hiển thị danh sách vé theo sự kiện.  
3. Người dùng chọn một vé.  
4. Hệ thống hiển thị thông tin vé, seat, thời gian, địa điểm, trạng thái và QR động.  
5. Người dùng có thể xem hướng dẫn vào cổng, lưu vé, hoặc niêm yết resale nếu đủ điều kiện.

### **Luồng thay thế/ngoại lệ**

* A1. Vé đã refund: hệ thống hiển thị trạng thái Refunded và không hiển thị QR check-in.  
* A2. Vé đã used: hệ thống hiển thị lịch sử check-in.  
* A3. Vé đang resale: hệ thống hiển thị trạng thái Frozen/Listed.

### **Quy tắc nghiệp vụ**

* Chỉ chủ sở hữu hiện tại mới được xem QR động của vé.  
* Vé đã used/refunded không được niêm yết resale.  
* QR động phải cập nhật theo chu kỳ và không phụ thuộc ảnh chụp màn hình tĩnh.

## **UC-11. Check-in vé tại cổng**

| Thuộc tính | Nội dung |
| ----- | ----- |
| Mã Use Case | UC-11 |
| Tên Use Case | Check-in vé tại cổng |
| Actor chính | USER, STAFF |
| Actor phụ | Không có |
| Mục tiêu | Cho phép Staff quét QR động để xác thực vé và đánh dấu người dùng đã vào cổng. |
| Tiền điều kiện | Staff đã đăng nhập, được phân quyền cổng check-in; vé hợp lệ. |
| Hậu điều kiện | Vé hợp lệ được chuyển sang trạng thái USED; vé không hợp lệ bị từ chối. |
| Mức ưu tiên | Rất cao |

### **Luồng chính**

1. Staff mở Staff App/PWA.  
2. Staff chọn sự kiện và cổng được phân công.  
3. Staff quét QR của người dùng.  
4. Hệ thống giải mã và verify TOTP.  
5. Hệ thống kiểm tra vé đúng sự kiện, đúng thời gian, chưa used, chưa refund, không bị freeze.  
6. Hệ thống trả kết quả hợp lệ.  
7. Staff cho phép người dùng vào cổng.  
8. Hệ thống đánh dấu vé là USED và ghi log check-in.

### **Luồng thay thế/ngoại lệ**

* A1. QR hết hạn/sai: hệ thống từ chối.  
* A2. Vé đã check-in: hệ thống cảnh báo vé đã sử dụng.  
* A3. Vé không thuộc sự kiện/cổng: hệ thống từ chối.  
* A4. Mất mạng: chuyển sang UC-12 check-in offline.

### **Quy tắc nghiệp vụ**

* Vé chỉ được check-in một lần.  
* Staff chỉ được check-in tại cổng được phân công.  
* Mọi lần quét phải được ghi log.  
* Dynamic QR phải được xác thực theo thời gian hiện tại và khoảng lệch cho phép.

## **UC-12. Check-in offline và đồng bộ dữ liệu**

| Thuộc tính | Nội dung |
| ----- | ----- |
| Mã Use Case | UC-12 |
| Tên Use Case | Check-in offline và đồng bộ dữ liệu |
| Actor chính | STAFF |
| Actor phụ | SYSTEM |
| Mục tiêu | Đảm bảo Staff vẫn có thể check-in khi mất kết nối mạng và đồng bộ lại khi online. |
| Tiền điều kiện | Staff đã preload dữ liệu hash vé trước sự kiện. |
| Hậu điều kiện | Dữ liệu check-in offline được lưu cục bộ và đồng bộ về server khi có mạng. |
| Mức ưu tiên | Cao |

### **Luồng chính**

1. Trước sự kiện, Staff tải trước danh sách hash vé được phân quyền.  
2. Khi mất mạng, Staff App chuyển sang offline mode.  
3. Staff quét QR người dùng.  
4. Ứng dụng verify TOTP local dựa trên dữ liệu đã cache.  
5. Nếu hợp lệ, ứng dụng ghi nhận check-in cục bộ.  
6. Khi có mạng trở lại, ứng dụng đồng bộ log check-in về server.  
7. Server xử lý conflict và cập nhật trạng thái vé.

### **Luồng thay thế/ngoại lệ**

* A1. Vé không có trong cache: hệ thống từ chối hoặc đánh dấu cần xác minh thủ công.  
* A2. Trùng check-in giữa hai thiết bị offline: server xử lý conflict theo timestamp và rule ưu tiên.  
* A3. Dữ liệu cache hết hạn: ứng dụng yêu cầu đồng bộ lại.

### **Quy tắc nghiệp vụ**

* Dữ liệu cache phải được mã hóa.  
* Offline log không được sửa/xóa thủ công.  
* Khi sync, server phải phát hiện vé bị check-in trùng.

## **UC-13. Giao dịch vé thứ cấp trên Resale Market**

| Thuộc tính | Nội dung |
| ----- | ----- |
| Mã Use Case | UC-13 |
| Tên Use Case | Giao dịch vé thứ cấp trên Resale Market |
| Actor chính | USER |
| Actor phụ | ADMIN |
| Mục tiêu | Cho phép người dùng bán lại/mua lại vé an toàn, có escrow và chống đầu cơ. |
| Tiền điều kiện | Người bán sở hữu vé hợp lệ, chưa used/refund; sự kiện cho phép resale. |
| Hậu điều kiện | Vé được chuyển quyền sở hữu cho người mua, QR cũ bị hủy và QR mới được cấp. |
| Mức ưu tiên | Cao |

### **Luồng chính**

1. Người bán truy cập ví vé và chọn niêm yết resale.  
2. Hệ thống kiểm tra điều kiện vé.  
3. Người bán nhập giá bán.  
4. Hệ thống kiểm tra giá không vượt trần quy định.  
5. Hệ thống freeze vé và tạo listing.  
6. Người mua tìm kiếm vé resale.  
7. Người mua chọn listing và thanh toán.  
8. Hệ thống giữ tiền qua escrow.  
9. Sau khi thanh toán thành công, hệ thống chuyển quyền sở hữu vé.  
10. Hệ thống vô hiệu hóa QR/TOTP cũ của người bán.  
11. Hệ thống sinh QR/TOTP mới cho người mua.  
12. Hệ thống giải ngân cho người bán theo chính sách.

### **Luồng thay thế/ngoại lệ**

* A1. Giá bán vượt trần: hệ thống từ chối listing.  
* A2. Người bán hủy listing trước khi có người mua: hệ thống unfreeze vé.  
* A3. Thanh toán thất bại: listing vẫn còn hiệu lực hoặc được giải phóng theo rule.  
* A4. Có tranh chấp: Admin xử lý hoàn tiền hoặc giữ escrow.

### **Quy tắc nghiệp vụ**

* Vé resale phải chưa check-in, chưa refund, chưa bị khóa.  
* Một vé chỉ được có một listing active.  
* Giá resale không vượt quá ngưỡng hệ thống quy định, ví dụ 120% giá gốc.  
* Khi chuyển nhượng thành công, QR cũ phải bị vô hiệu hoàn toàn.

## **UC-14. Quản lý merchandise, combo và tồn kho**

| Thuộc tính | Nội dung |
| ----- | ----- |
| Mã Use Case | UC-14 |
| Tên Use Case | Quản lý merchandise, combo và tồn kho |
| Actor chính | ORGANIZER |
| Actor phụ | USER, SYSTEM |
| Mục tiêu | Cho phép Organizer bán vật phẩm sự kiện, quản lý tồn kho và tạo combo vé \+ merchandise. |
| Tiền điều kiện | Organizer đã được phê duyệt; sự kiện đã được tạo. |
| Hậu điều kiện | Merchandise được tạo, có thể bán độc lập hoặc bán kèm vé. |
| Mức ưu tiên | Cao |

### **Luồng chính**

1. Organizer truy cập module Merchandise.  
2. Organizer tạo sản phẩm mới.  
3. Organizer nhập tên, mô tả, hình ảnh, SKU, giá, biến thể và tồn kho.  
4. Organizer gắn sản phẩm với sự kiện.  
5. Organizer tạo combo vé \+ merchandise hoặc cấu hình upsell.  
6. Người dùng thêm merchandise vào giỏ hàng trong luồng mua vé hoặc mua độc lập.  
7. Sau thanh toán thành công, hệ thống trừ tồn kho.  
8. Hệ thống gửi cảnh báo nếu tồn kho thấp.

### **Luồng thay thế/ngoại lệ**

* A1. SKU trùng: hệ thống từ chối tạo sản phẩm.  
* A2. Tồn kho không đủ: hệ thống không cho thanh toán hoặc yêu cầu cập nhật số lượng.  
* A3. Sản phẩm ngừng bán: hệ thống ẩn khỏi trang mua hàng.

### **Quy tắc nghiệp vụ**

* SKU phải duy nhất trong phạm vi Organizer.  
* Không bán vượt tồn kho.  
* Tồn kho chỉ trừ khi thanh toán thành công.  
* Combo phải áp dụng đúng điều kiện khuyến mãi.

## **UC-15. Quản trị, báo cáo, đối soát, refund và hóa đơn**

| Thuộc tính | Nội dung |
| ----- | ----- |
| Mã Use Case | UC-15 |
| Tên Use Case | Quản trị, báo cáo, đối soát, refund và hóa đơn |
| Actor chính | ADMIN, ORGANIZER |
| Actor phụ | Không có |
| Mục tiêu | Hỗ trợ quản trị hệ thống, giám sát doanh thu, đối soát giao dịch, xử lý refund và xuất hóa đơn điện tử. |
| Tiền điều kiện | Actor đã đăng nhập và có quyền truy cập module quản trị/báo cáo. |
| Hậu điều kiện | Dữ liệu báo cáo được hiển thị/xuất file; giao dịch được đối soát; refund/hóa đơn được xử lý. |
| Mức ưu tiên | Cao |

### **Luồng chính**

1. Admin/Organizer truy cập dashboard.  
2. Hệ thống hiển thị số liệu doanh thu vé, doanh thu merchandise, số vé bán, tỷ lệ check-in, refund, payout.  
3. Organizer xem dữ liệu thuộc tenant của mình.  
4. Admin xem dữ liệu toàn hệ thống.  
5. Admin thực hiện đối soát giao dịch với Payment Gateway.  
6. Nếu có yêu cầu refund, Admin tạo yêu cầu refund toàn phần/một phần/batch.  
7. Hệ thống cập nhật trạng thái giao dịch và gửi thông báo người dùng.  
8. Hệ thống xuất hóa đơn điện tử hoặc đồng bộ sang E-Invoice Service.  
9. Admin/Organizer export báo cáo Excel/CSV/PDF.

### **Luồng thay thế/ngoại lệ**

* A1. Dữ liệu payment gateway không khớp: hệ thống đánh dấu lệch đối soát.  
* A2. Refund thất bại: hệ thống lưu trạng thái lỗi và cho phép retry.  
* A3. Xuất hóa đơn thất bại: hệ thống retry hoặc đưa vào danh sách xử lý thủ công.  
* A4. Người dùng không đủ quyền export: hệ thống từ chối truy cập.

### **Quy tắc nghiệp vụ**

* Organizer chỉ được xem dữ liệu thuộc tenant của mình.  
* Admin có quyền xem toàn hệ thống.  
* Refund phải tuân thủ chính sách sự kiện và trạng thái thanh toán.  
* Hóa đơn phải được ký số và lưu vết.  
* Tất cả thao tác quản trị, refund, đối soát phải ghi audit log.

## **UC-16. Hỏi đáp với AI Chatbot**

| Thuộc tính | Nội dung |
| ----- | ----- |
| Mã Use Case | UC-16 |
| Tên Use Case | Hỏi đáp với AI Chatbot |
| Actor chính | USER |
| Actor phụ | ADMIN |
| Mục tiêu | Cho phép người dùng đặt câu hỏi bằng ngôn ngữ tự nhiên để tra cứu nhanh thông tin sự kiện, quy định, giờ mở cổng, hướng dẫn mua vé, thanh toán, refund và resale. |
| Tiền điều kiện | Người dùng truy cập hệ thống; Knowledge Base/FAQ đã được cấu hình. |
| Hậu điều kiện | Người dùng nhận được câu trả lời phù hợp hoặc yêu cầu được chuyển tiếp cho bộ phận hỗ trợ khi chatbot không đủ độ tin cậy. |
| Mức ưu tiên | Cao |

### **Luồng chính**

1. Người dùng mở AI Chatbot trên website.  
2. Người dùng nhập câu hỏi bằng ngôn ngữ tự nhiên.  
3. Hệ thống gửi câu hỏi đến AI Service.  
4. AI Service phân tích ý định câu hỏi và truy xuất dữ liệu liên quan từ FAQ/Knowledge Base.  
5. AI Service tính độ tin cậy của câu trả lời.  
6. Nếu độ tin cậy đạt ngưỡng, chatbot trả lời người dùng.  
7. Người dùng có thể tiếp tục đặt câu hỏi hoặc chọn xem liên kết sự kiện/hướng dẫn liên quan.  
8. Hệ thống lưu lịch sử hội thoại phục vụ cải thiện chất lượng hỗ trợ theo chính sách quyền riêng tư.

### **Luồng thay thế/ngoại lệ**

* A1. Câu hỏi nằm ngoài phạm vi dữ liệu: chatbot thông báo chưa có thông tin phù hợp.  
* A2. Độ tin cậy thấp: chatbot đề xuất chuyển tiếp cho bộ phận hỗ trợ hoặc hiển thị thông tin liên hệ.  
* A3. Người dùng hỏi về đơn hàng cá nhân: hệ thống yêu cầu đăng nhập/xác thực trước khi cung cấp thông tin.  
* A4. AI Service lỗi: hệ thống hiển thị FAQ phổ biến hoặc thông báo thử lại sau.

### **Quy tắc nghiệp vụ**

* Chatbot chỉ được trả lời dựa trên dữ liệu hệ thống, FAQ, chính sách và thông tin sự kiện đã được duyệt.  
* Không cung cấp thông tin cá nhân, đơn hàng hoặc vé nếu người dùng chưa xác thực.  
* Khi confidence score thấp hơn ngưỡng quy định, chatbot phải chuyển hướng sang support hoặc trả lời ở mức gợi ý, không khẳng định chắc chắn.  
* Nội dung trả lời không được mâu thuẫn với chính sách sự kiện, refund, check-in và resale đã cấu hình.  
* Lịch sử hội thoại phải tuân thủ quy định bảo mật và quyền riêng tư.

## **5\. Ma trận liên kết Actor \- Use Case**

| Use Case | USER | ORGANIZER | STAFF | ADMIN |
| ----- | ----- | ----- | ----- | ----- |
| UC-01 Đăng ký/đăng nhập | x | x | x | x |
| UC-02 Đăng ký/phê duyệt Organizer |  | x |  | x |
| UC-03 Tạo sự kiện |  | x |  |  |
| UC-04 Thiết kế sơ đồ ghế/hạng vé |  | x |  |  |
| UC-05 Phê duyệt sự kiện |  |  |  | x |
| UC-06 Tìm kiếm/gợi ý sự kiện | x |  |  |  |
| UC-07 Đặt vé/chọn ghế | x |  |  |  |
| UC-08 Thanh toán | x |  |  |  |
| UC-09 Phát hành vé/QR/NFT | x |  |  |  |
| UC-10 Quản lý ví vé | x |  |  |  |
| UC-11 Check-in vé | x |  | x |  |
| UC-12 Check-in offline |  |  | x |  |
| UC-13 Resale Market | x |  |  |  |
| UC-14 Merchandise & tồn kho | x | x |  |  |
| UC-15 Quản trị/báo cáo/refund/hóa đơn |  | x |  | x |
| UC-16 Hỏi đáp với AI Chatbot | x |  |  | x |

