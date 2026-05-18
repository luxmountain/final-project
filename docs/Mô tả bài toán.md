# Mô tả bài toán

### **1\. TỔNG QUAN BÀI TOÁN**

Nhu cầu giải trí và tham gia các sự kiện ca nhạc, văn hóa, nghệ thuật tại Việt Nam đang tăng trưởng mạnh mẽ, tuy nhiên thị trường hiện tại đang phân mảnh và thiếu một nền tảng tích hợp toàn diện. Dự án hướng tới việc xây dựng một nền tảng Web SaaS (bao gồm B2B cho Ban tổ chức và cộng đồng cho người dùng) phục vụ phân phối vé sự kiện, kết hợp bán chéo vật phẩm (merchandise) và tích hợp sàn giao dịch thứ cấp an toàn. Hệ thống được thiết kế hoàn toàn trên nền tảng Web, triển khai trên kiến trúc Microservices, ứng dụng Blockchain để minh bạch hóa vé và AI để tối ưu hóa trải nghiệm người dùng thông qua gợi ý thông minh và Chatbot Q\&A.

### **2\. PHẠM VI GIẢI PHÁP**

Phạm vi giải pháp tập trung toàn lực vào hệ sinh thái Web SaaS với các giới hạn công nghệ và nghiệp vụ sau:

* **Kiến trúc hệ thống:** Ứng dụng kiến trúc Microservices chia nhỏ các dịch vụ độc lập để đảm bảo khả năng chịu tải cao (High Concurrency) cho các đợt flash sale.  
* **Trí tuệ nhân tạo (AI):** Tập trung vào hai tính năng thực tiễn mang lại giá trị trực tiếp: Hệ thống gợi ý sự kiện/vật phẩm thông minh (Recommender System) và Chatbot Q\&A giải đáp thắc mắc người dùng tự động.  
* **Blockchain & Vé điện tử:** Ứng dụng Blockchain trong quy trình phát hành NFT Ticketing để chống làm giả, kết hợp công nghệ QR động (TOTP xoay 30 giây) để kiểm soát check-in.  
* **Sàn giao dịch thứ cấp:** Cung cấp môi trường (Resale) với cơ chế Escrow (giữ tiền tạm thời) và giới hạn giá trần để chống đầu cơ.  
* **Thương mại vật phẩm (Merchandise):** Tích hợp luồng mua vật phẩm trực tiếp trong quá trình đặt vé (Cross-selling/Upsell) hoặc mua độc lập.

### **3\. PHÂN TÍCH QUY TRÌNH NGHIỆP VỤ CỐT LÕI**

* **Quản lý danh tính & Phân quyền:**  
  * Cung cấp tính năng đăng ký/đăng nhập qua Email và Google OAuth.  
  * Hệ thống xác thực JWT, cấp Access Token và Refresh Token.  
  * Phân quyền RBAC rõ ràng cho 4 nhóm: USER, ORGANIZER, STAFF, ADMIN.  
* **Quản lý sự kiện & Sơ đồ ghế:**  
  * Ban tổ chức tạo sự kiện, thiết kế sơ đồ ghế (Block \-\> Row \-\> Seat) định dạng JSON và cấu hình hạng vé.  
  * Yêu cầu phê duyệt từ Admin trước khi sự kiện được hiển thị công khai.  
* **Đặt vé & Thanh toán (High Concurrency):**  
  * Ứng dụng Redis Distributed Lock (SETNX) để khóa ghế tối đa 10-15 phút, đảm bảo Zero Oversell.  
  * Hỗ trợ mua combo vé kèm merchandise.  
  * Thanh toán bất đồng bộ qua Kafka để giảm coupling.  
* **Phát hành & Quản lý vé điện tử:**  
  * Sinh mã vé TOTP Secret duy nhất, tạo QR động thay đổi mỗi 30 giây chống chụp màn hình.  
  * Nhân viên soát vé (Staff) sử dụng ứng dụng web/PWA có khả năng đồng bộ offline/online.  
* **Giao dịch vé thứ cấp (Resale):**  
  * Người dùng có thể niêm yết vé với giá không vượt quá 120% giá gốc (chống đầu cơ).  
  * Khi giao dịch thành công, TOTP Secret cũ bị hủy, sinh mã mới cho người mua (Buyer).  
* **Thương mại vật phẩm (Merchandise):**  
  * Gắn vật phẩm với sự kiện, tạo combo ưu đãi để bán chéo trong luồng đặt vé (Upsell).  
  * Trừ tồn kho realtime thông qua Kafka event sau khi thanh toán thành công.  
* **Hỗ trợ thông minh (AI):**  
  * *Luồng Recommender:* Gợi ý sự kiện/vật phẩm tương tự dựa trên thuật toán TF-IDF và Cosine Similarity.  
  * *Luồng Chatbot Q\&A:* Sử dụng Semantic Search truy xuất Knowledge base FAQ để trả lời tự động các câu hỏi của người dùng về sự kiện.

### **4\. YÊU CẦU NGƯỜI DÙNG**

#### **4.1. Yêu cầu của Người dùng cuối (User \- Khách hàng tham dự / Người mua / Người bán)**

Người dùng cuối là đối tượng trực tiếp tiêu thụ vé và vật phẩm, đồng thời tham gia vào sàn giao dịch thứ cấp.

* **Đăng ký & Định danh cá nhân:**  
  * Người dùng cần có khả năng đăng ký và đăng nhập nhanh chóng bằng Email hoặc tài khoản Google OAuth để giảm thiểu rào cản tham gia.  
  * Trong các sự kiện có độ "hot" cao, người dùng phải có khả năng xác thực OTP qua số điện thoại/Email và điền thông tin định danh (CCCD/CMND) để hệ thống chống đầu cơ (Black market).  
* **Tìm kiếm & Nhận tư vấn thông minh (AI):**  
  * Người dùng cần hệ thống tự động gợi ý (Recommender) các sự kiện tương tự hoặc vật phẩm liên quan dựa trên ngữ cảnh đang xem để dễ dàng ra quyết định mua sắm.  
  * Người dùng cần một Chatbot Q\&A xử lý bằng ngôn ngữ tự nhiên để truy vấn tức thì các thông tin như giờ mở cổng, quy định sự kiện mà không cần liên hệ tổng đài hỗ trợ.  
* **Đặt vé, Chọn ghế & Mua Merchandise:**  
  * Người dùng cần tương tác với sơ đồ ghế trực quan ngay trên trình duyệt Web để chọn chính xác vị trí, với thời gian giữ ghế tối đa 10 \- 15 phút để hoàn tất thanh toán.  
  * Người dùng cần có tùy chọn mua kết hợp (Combo Upsell) vé và vật phẩm (như áo, lightstick) trong cùng một luồng thanh toán, hoặc truy cập trang Merchandise để mua độc lập vật phẩm.  
* **Thanh toán & Quản lý vé điện tử:**  
  * Người dùng cần thanh toán linh hoạt qua các cổng VNPay, MoMo để nhận vé ngay lập tức sau khi giao dịch thành công.  
  * Người dùng cần truy cập vé điện tử hiển thị dưới dạng mã QR động TOTP xoay mã mỗi 30 giây ngay trên ứng dụng Web (PWA) để chống hành vi chụp màn hình chia sẻ trái phép.  
* **Giao dịch trên Sàn thứ cấp (Resale Market):**  
  * **Với tư cách Người bán (User-Seller):** Cần một môi trường an toàn để niêm yết vé không còn nhu cầu sử dụng, với điều kiện giá bán lại không được vượt quá 120% giá gốc. Người bán cần có thể chủ động hủy niêm yết bất kỳ lúc nào nếu vé chưa có người mua.  
  * **Với tư cách Người mua (User-Buyer):** Cần tìm kiếm và mua vé an toàn trên sàn. Khi thanh toán thành công, người mua cần nhận được một mã vé với TOTP Secret hoàn toàn mới, đồng thời mã vé của người bán bị hủy hoàn toàn để đảm bảo quyền sở hữu tuyệt đối.

#### **4.2. Yêu cầu của Ban tổ chức (Organizer)**

Ban tổ chức là các đơn vị/công ty tạo ra và vận hành sự kiện, chịu trách nhiệm về nội dung và cung cấp vật phẩm.

* **Tạo và Cấu hình Sự kiện:**  
  * Ban tổ chức cần công cụ quản trị để nhập thông tin sự kiện (tên, mô tả, thời gian, địa điểm, banner) và gửi yêu cầu phê duyệt lên hệ thống.  
  * Ban tổ chức cần công cụ thiết kế sơ đồ ghế phân cấp linh hoạt từ Khu vực (Zone) \-\> Block \-\> Hàng (Row) \-\> Ghế (Seat) và định nghĩa giá bán cùng số lượng cho từng hạng vé (VIP, Standard...).  
* **Quản lý Vật phẩm (Merchandise):**  
  * Ban tổ chức cần tính năng tạo vật phẩm, tải ảnh sản phẩm, thiết lập giá và cập nhật tồn kho để bán cho khách hàng.  
  * Ban tổ chức cần nhận được cảnh báo tự động từ hệ thống khi hàng hóa trong kho sắp hết.  
* **Theo dõi & Báo cáo:**  
  * Ban tổ chức cần một Trang Dashboard quản trị chuyên nghiệp để theo dõi doanh thu và tiến độ bán vé, bán vật phẩm theo thời gian thực (Real-time).

#### **4.3. Yêu cầu của Nhân viên soát vé (Staff)**

Nhân viên soát vé là người trực tiếp điều phối luồng khán giả tại cổng sự kiện.

* **Kiểm soát Check-in tại cổng:**  
  * Nhân viên cần sử dụng App nội bộ (Staff App) hoặc thiết bị PDA để quét mã QR động của khách hàng một cách cực nhanh và chính xác.  
  * Nhân viên cần nhận được phản hồi tức thì từ hệ thống về tính hợp lệ của vé (đúng sự kiện, chưa được sử dụng) để cho phép khách vào cổng hoặc từ chối.  
* **Hoạt động trong môi trường mất kết nối (Offline Mode):**  
  * Nhân viên cần khả năng tải trước (preload) danh sách hash vé (dữ liệu mã hóa) trước khi sự kiện diễn ra để đảm bảo quá trình quét vé và xác thực (Verify TOTP local) không bị gián đoạn ngay cả khi địa điểm tổ chức mất kết nối mạng.  
  * Khi có mạng trở lại, ứng dụng của nhân viên phải tự động đồng bộ (Sync) dữ liệu check-in cục bộ lên máy chủ trung tâm.

#### **4.4. Yêu cầu của Quản trị viên hệ thống (Admin)**

Quản trị viên là những người vận hành nền tảng Web SaaS, đảm bảo tính minh bạch, tuân thủ pháp lý và ổn định của toàn hệ sinh thái.

* **Kiểm duyệt & Quản lý:**  
  * Quản trị viên cần thẩm định và phê duyệt các tài khoản Organizer đăng ký mới trước khi cấp quyền tạo sự kiện để đảm bảo uy tín của nền tảng.  
  * Quản trị viên cần xem xét và phê duyệt (hoặc từ chối) các sự kiện do Organizer tạo ra trước khi sự kiện được hiển thị công khai tới người dùng.  
* **Xử lý Ngoại lệ & Đối soát:**  
  * Quản trị viên cần công cụ xử lý hoàn tiền (Refund) hàng loạt khi có yêu cầu đột xuất hoặc sự kiện bị hủy/dời lịch.  
  * Quản trị viên cần hệ thống lưu vết (Audit log) mọi giao dịch và quản lý module kết nối với các đối tác xuất hóa đơn điện tử để đảm bảo tuân thủ nghĩa vụ thuế.

### **5\. RÀNG BUỘC & TUÂN THỦ**

Để đảm bảo hệ thống vận hành hợp pháp và bảo mật, các yêu cầu phi chức năng sau cần được đáp ứng:

* **Tuân thủ Thuế & Hóa đơn (Nghị định 123/2020/NĐ-CP):** Vé điện tử xuất ra đồng thời là hóa đơn, hệ thống phải có module tích hợp API với các nhà cung cấp dịch vụ hóa đơn điện tử (VNPT, Viettel, MISA...).  
* **Phân bóc doanh thu:** Tách biệt doanh thu dịch vụ vé và hàng hóa vật lý (Merchandise) để tính thuế GTGT khác nhau.  
* **Lưu trữ & Minh bạch (Nghị định 70/2025/NĐ-CP):** Dữ liệu vé và log giao dịch phải được lưu trữ bất biến, có cổng tra cứu độc lập cho phép khách hàng kiểm tra tính hợp lệ của vé.  
* **Bảo mật Thông tin (Luật An toàn thông tin mạng):** Mã hóa (AES-256) tại database đối với dữ liệu định danh (PII) và tuân thủ tiêu chuẩn PCI-DSS khi đẩy giao dịch qua các cổng thanh toán.

### **6\. RỦI RO & BIỆN PHÁP GIẢM THIỂU**

Theo kỹ thuật Risk Analysis and Management, bài toán ghi nhận các rủi ro cốt lõi cần kiến trúc giải quyết:

* **Rủi ro nghẽn cổ chai (Flash sale):** Giải quyết bằng Redis Lock và thiết kế hàng đợi Kafka (at-least-once delivery).  
* **Rủi ro vé giả/chụp màn hình:** Giảm thiểu 98% rủi ro nhờ công nghệ QR động TOTP xoay 30 giây và NFT Ticketing.  
* **Rủi ro tranh chấp Resale:** Xử lý triệt để bằng cơ chế khóa QR cũ, cấp QR mới và giữ tiền Escrow trung gian cho đến khi hoàn tất.  
* **Rủi ro mất kết nối mạng khi soát vé:** Giải quyết bằng cơ chế 3 lớp offline: PWA Cache \+ Wallet \+ Local Sync trên thiết bị quét vé.

# Staff App (Note)

Thay vì phát triển một ứng dụng Native riêng biệt phải tải từ các kho ứng dụng, "Staff App" trong ngữ cảnh dự án sẽ là một **phân hệ web độc lập (Web Module) hoặc ứng dụng PWA (Progressive Web App)** chạy trực tiếp trên trình duyệt của thiết bị di động hoặc PDA.

Dưới góc nhìn nghiệp vụ và phân tích kiến trúc, quá trình này diễn ra theo các bước sau:

**1\. Xác thực và Điều hướng (Authentication & Routing)**

* Nhân viên (Staff) truy cập vào cổng đăng nhập chung của nền tảng Web SaaS.  
* Sau khi nhập thông tin hợp lệ, hệ thống xử lý luồng xác thực và phát hành JWT Access Token có chứa định danh role=STAFF.  
* Dựa vào cơ chế Phân quyền (RBAC) với tập quyền hạn riêng biệt, Frontend của hệ thống Web sẽ tự động điều hướng nhân viên đó vào không gian làm việc (Workspace) dành riêng cho việc soát vé, ẩn đi hoàn toàn các tính năng không liên quan của User hay Organizer.

**2\. Vận hành tính năng Quét vé (Scanning Execution)**

* Tại giao diện soát vé này, nền tảng Web sẽ yêu cầu quyền truy cập Camera của thiết bị thông qua các Web API của trình duyệt.  
* Nhân viên tiến hành quét mã QR động (TOTP xoay mỗi 30 giây) hiển thị trên vé điện tử của khách hàng tham dự.

**3\. Xử lý bài toán Mất kết nối mạng (Offline Mode)**

* Để đáp ứng yêu cầu soát vé ngay cả khi địa điểm tổ chức mất mạng, phân hệ này phải được triển khai dưới dạng PWA (Progressive Web App) kết hợp Service Worker.  
* Trước sự kiện (khi còn mạng), nhân viên mở phân hệ này để tải trước danh sách hash vé (dữ liệu mã hóa) và lưu cục bộ trên trình duyệt.  
* Khi thiết bị chuyển sang trạng thái offline, trình duyệt vẫn có thể xác thực tính hợp lệ của vé (Verify TOTP local), ghi log check-in cục bộ và tự động đồng bộ (Sync) dữ liệu lên máy chủ ngay khi có kết nối mạng trở lại.

# Yêu cầu về Kế toán & Thuế

### [**API Misa for dev**](https://www.misa.vn/154989/tai-lieu-open-api-tich-hop-hoa-don-dien-tu-misa-meinvoice-dau-ra/?utm_source=chatgpt.com)

### **1\. Ở phân hệ của Admin (Quản trị viên nền tảng)**

Admin là người "Xây dựng đường ống" và kiểm soát vĩ mô. Tính năng thuế của Admin thiên về **Cấu hình hệ thống (System Configuration) và Đối soát nền tảng**:

* **Tích hợp & Quản lý Đối tác Hóa đơn (Cấu hình lõi):** Admin là người nhập các tham số API Key, cấu hình kết nối (Endpoint) với các nhà cung cấp dịch vụ hóa đơn điện tử lớn (VNPT, Viettel, MISA...).  
* **Thiết lập Danh mục Thuế suất (Tax Dictionary):** Admin tạo ra một danh mục các mức thuế suất tiêu chuẩn theo quy định của Nhà nước (ví dụ: 0%, 5%, 8%, 10%) để các Organizer sử dụng, đảm bảo tính đồng nhất trên toàn hệ thống và tránh việc Organizer nhập sai số liệu.  
* **Thuế của Nền tảng (Platform Tax):** Hệ thống của Admin sẽ tự động xuất hóa đơn GTGT (VAT) cho phần "Phí dịch vụ/Phí sử dụng nền tảng" mà GreenPlate thu từ Ban tổ chức (Organizer) hoặc thu từ người dùng cuối (nếu có phí tiện ích).  
* **Kiểm toán & Báo cáo vĩ mô:** Admin có Dashboard để theo dõi tổng dòng tiền đi qua sàn, cảnh báo các sự kiện có dấu hiệu trốn thuế hoặc dòng tiền bất thường (phục vụ mục đích thanh tra khi cơ quan chức năng yêu cầu).

### **2\. Ở phân hệ của Organizer (Ban tổ chức sự kiện)**

Organizer là "Người bán hàng" trực tiếp cho người tham dự. Tính năng thuế của Organizer thiên về **Khai báo pháp lý và Cấu hình cho từng sản phẩm**:

* **Khai báo Thông tin doanh nghiệp (Legal Profile):** Organizer bắt buộc phải khai báo Mã số thuế (MST), Tên pháp nhân, Địa chỉ đăng ký kinh doanh. Dữ liệu này sẽ được hệ thống dùng để in lên vé điện tử/hóa đơn xuất cho khách hàng.  
* **Cấu hình Thuế suất cho từng sản phẩm (Tax Mapping):** Đây là yêu cầu cực kỳ quan trọng (như đã phân tích ở quy định Merchandise). Organizer khi tạo sự kiện phải tự gán mức thuế suất cho từng hạng mục:  
  * *Ví dụ:* Vé sự kiện văn hóa (áp thuế 5%), Áo thun/Merchandise (áp thuế 10%).  
  * Hệ thống sẽ dựa vào cấu hình này để tự động "phân bóc doanh thu" trên cùng một đơn hàng Combo.  
* **Quản lý Hóa đơn đầu ra:** Dashboard của Organizer sẽ có một tab "Hóa đơn/Thuế". Tại đây, họ xem được danh sách các vé điện tử (kiêm hóa đơn) đã tự động phát hành cho khách hàng của mình, và có thể kết xuất (Export) báo cáo doanh thu theo từng mức thuế suất để nộp cho kế toán công ty mình.

### **3\. Tóm tắt luồng nghiệp vụ (Workflow)**

1. **Admin** cấu hình cổng nối với MISA/VNPT và thiết lập danh mục thuế (5%, 8%, 10%).  
2. **Organizer** vào tạo sự kiện, điền Mã số thuế công ty mình, chọn vé ca nhạc áp thuế 5%, chọn áo thun áp thuế 10%.  
3. **Người dùng (User)** mua 1 combo (Vé \+ Áo thun) và thanh toán 1 cục tiền.  
4. **Hệ thống** tự động tách cục tiền đó ra, gọi API qua MISA/VNPT để xuất 1 hóa đơn (hoặc vé điện tử có mã cơ quan thuế) gửi cho User, trên đó ghi rõ phần nào 5%, phần nào 10% dưới tên công ty của Organizer.  
5. Cuối tháng, **Admin** rút báo cáo thu phí dịch vụ của Organizer và xuất hóa đơn nền tảng cho Organizer.

