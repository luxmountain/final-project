# DIỄN GIẢI SƠ ĐỒ ACTIVITY VÀ SEQUENCE DIAGRAM
## (UC-09 đến UC-16)

---

## UC-09: Phát hành vé điện tử, QR động và NFT Ticket

### Diễn giải Activity Diagram

Sơ đồ hoạt động UC-09 mô tả quy trình tự động phát hành vé điện tử sau khi thanh toán thành công. Luồng được kích hoạt bởi sự kiện (event-driven) từ hệ thống Kafka.

**Luồng chính:**
- Quy trình bắt đầu khi Ticket Service nhận được event `PAYMENT_CONFIRMED` từ Kafka message broker.
- Hệ thống tuần tự thực hiện: tạo Ticket ID duy nhất (UUID v4), mapping metadata, sinh TOTP Secret theo chuẩn RFC 6238, và tạo QR động xoay mỗi 30 giây.
- Tại nút quyết định "Sự kiện bật NFT Ticketing?", luồng rẽ nhánh: nếu có, hệ thống gọi Blockchain Service để mint NFT ERC-721 trên Polygon; nếu không, bỏ qua bước này.

**Xử lý ngoại lệ:**
- Nếu mint NFT thất bại, vé vẫn được phát hành ở trạng thái off-chain và đưa vào retry queue (đảm bảo tính sẵn sàng).
- Nếu lưu database thất bại, hệ thống rollback và đưa message vào dead-letter queue để xử lý sau.

**Kết thúc:** Sau khi lưu thành công, hệ thống publish event `TICKET_ISSUED` và Notification Service gửi thông báo cho người dùng.

### Diễn giải Sequence Diagram

Sơ đồ tuần tự UC-09 thể hiện tương tác giữa các thành phần hệ thống theo trình tự thời gian trong quá trình phát hành vé.

**Các participant chính:** Kafka (message broker), Ticket Service (xử lý nghiệp vụ vé), PostgreSQL (lưu trữ), Blockchain Service (NFT), IPFS (lưu metadata bất biến), Notification Service (thông báo), USER Client.

**Luồng tương tác:**
1. Kafka gửi message đến Ticket Service – đây là điểm khởi đầu bất đồng bộ.
2. Ticket Service thực hiện chuỗi xử lý nội bộ (self-call): tạo ID, mapping, sinh TOTP, tạo QR.
3. Ticket Service query Event Service để kiểm tra cấu hình NFT.
4. Khối `alt` (alternative) thể hiện logic điều kiện: nếu NFT enabled, chuỗi gọi Blockchain Service → IPFS → Smart Contract được thực thi.
5. Kết quả cuối cùng được persist vào DB và broadcast qua Kafka đến Notification Service.

**Đặc điểm kiến trúc thể hiện:** Event-driven architecture, loose coupling giữa services, async processing.

---

## UC-10: Quản lý ví vé điện tử của người dùng

### Diễn giải Activity Diagram

Sơ đồ hoạt động UC-10 mô tả luồng người dùng truy cập và quản lý ví vé điện tử – nơi lưu trữ tất cả vé đã mua.

**Luồng chính:**
- Bắt đầu khi USER truy cập mục "Ví vé" trên giao diện.
- Client gửi request kèm JWT token, API Gateway xác thực trước khi forward đến Ticket Service.
- Tại nút quyết định "JWT hợp lệ?": nếu token hết hạn, hệ thống thực hiện refresh token flow (vòng lặp quay lại bước gửi request).
- Danh sách vé được hiển thị, nhóm theo upcoming/past.

**Rẽ nhánh theo trạng thái vé:**
- ACTIVE: hiển thị QR động auto-refresh 30s – đây là trạng thái bình thường.
- USED: hiển thị lịch sử check-in (thời gian, cổng) – vé đã sử dụng.
- REFUNDED: hiển thị thông tin hoàn tiền, ẩn QR – vé đã hoàn.
- FROZEN: hiển thị trạng thái đang niêm yết resale – vé bị khóa tạm.

**Hành động bổ sung:** Từ chi tiết vé, USER có thể lưu vào Apple/Google Wallet, niêm yết resale (liên kết sang UC-13), hoặc xem hướng dẫn vào cổng.

### Diễn giải Sequence Diagram

Sơ đồ tuần tự UC-10 thể hiện chuỗi request-response giữa USER, Client, API Gateway, Ticket Service và Database.

**Luồng tương tác:**
1. USER → Client: hành động mở ví vé.
2. Client → API Gateway: gửi HTTP GET kèm JWT – thể hiện pattern API Gateway authentication.
3. Gateway validate JWT rồi forward đến Ticket Service.
4. Ticket Service query DB (JOIN tickets + events) và trả về danh sách.
5. Client render UI và chờ USER chọn vé.
6. Khối `alt` thể hiện 4 nhánh xử lý tùy theo trạng thái vé, mỗi nhánh có response khác nhau cho USER.

**Đặc điểm:** Luồng đồng bộ (synchronous request-response), xác thực tập trung tại Gateway, client-side rendering cho QR động.

---

## UC-11: Check-in vé tại cổng

### Diễn giải Activity Diagram

Sơ đồ hoạt động UC-11 mô tả quy trình check-in vé tại cổng sự kiện – một nghiệp vụ yêu cầu tốc độ xử lý nhanh (≤ 2 giây) và độ chính xác cao.

**Luồng chính:**
- STAFF mở Staff App (PWA), chọn sự kiện/cổng, kích hoạt camera.
- USER xuất trình QR động, Staff App quét và giải mã.
- Request verify được gửi đến Ticket Service.

**Chuỗi kiểm tra (2 nút quyết định liên tiếp):**
1. "TOTP hợp lệ?" – xác thực mã OTP trong khoảng ±30s. Nếu sai → từ chối ngay (fast-fail).
2. "Kiểm tra trạng thái vé" – 3 nhánh: đã USED (từ chối + hiển thị thời điểm check-in cũ), sai sự kiện/cổng (từ chối), hoặc ACTIVE + đúng sự kiện (cho phép).

**Khi hợp lệ:** Hệ thống cập nhật trạng thái USED, ghi log, publish event lên Kafka, hiển thị màn hình xanh với thông tin ghế. Staff cho USER vào cổng.

**Đặc điểm:** Thiết kế fail-fast (kiểm tra TOTP trước, rẻ hơn query DB), mọi lần quét đều ghi log (audit trail).

### Diễn giải Sequence Diagram

Sơ đồ tuần tự UC-11 thể hiện tương tác real-time giữa STAFF, Staff App, USER, Ticket Service, Database và Kafka.

**Luồng tương tác:**
1. Staff thao tác trên app → kích hoạt camera → USER xuất trình QR.
2. Staff App decode QR và gửi POST request đến Ticket Service.
3. Ticket Service thực hiện 2 bước verify tuần tự: TOTP verify (tính toán nội bộ) → DB query (kiểm tra trạng thái).
4. Hai khối `alt` lồng nhau thể hiện logic phân nhánh: ngoài (TOTP valid/invalid), trong (status check).
5. Khi thành công: UPDATE DB → INSERT log → Publish Kafka → Response 200 cho Staff App.

**Đặc điểm kiến trúc:** Synchronous flow (yêu cầu latency thấp), optimistic locking trên DB, event publishing cho analytics/reporting.

---

## UC-12: Check-in offline và đồng bộ dữ liệu

### Diễn giải Activity Diagram

Sơ đồ hoạt động UC-12 mô tả cơ chế check-in khi mất kết nối mạng – một yêu cầu quan trọng cho sự kiện ngoài trời hoặc địa điểm có sóng yếu.

**3 pha rõ ràng:**
1. **Preload (có mạng):** Staff tải trước dữ liệu hash vé vào IndexedDB, mã hóa AES-256.
2. **Offline check-in:** Khi mất mạng, app chuyển sang offline mode. Quét QR → tra cứu local cache → verify TOTP local → ghi kết quả vào IndexedDB.
3. **Sync (có mạng lại):** Service Worker phát hiện online → Background Sync → gửi batch logs về server → server xử lý conflict.

**Các nút quyết định:**
- "Trạng thái mạng?" – phân luồng online (UC-11) vs offline.
- "Vé có trong local cache?" – nếu không → không thể xác minh.
- "TOTP hợp lệ?" và "Vé đã USED trong local cache?" – logic verify tương tự online nhưng chạy hoàn toàn trên thiết bị.

**Xử lý conflict:** Server áp dụng rule first-come-first-served theo timestamp khi phát hiện cùng một vé được check-in bởi nhiều thiết bị offline.

### Diễn giải Sequence Diagram

Sơ đồ tuần tự UC-12 được chia thành 3 phần (Note blocks) tương ứng 3 pha hoạt động.

**Phase 1 – Preload:**
- Staff App gọi API lấy offline-pack → Ticket Service trả về danh sách encrypted ticket data → lưu vào IndexedDB.

**Phase 2 – Offline check-in:**
- Tất cả tương tác diễn ra LOCAL (giữa App, IndexedDB, và logic verify nội bộ). Không có arrow nào đi ra ngoài thiết bị – thể hiện rõ tính offline.
- Khối `alt` lồng nhau: không tìm thấy → tìm thấy → TOTP valid/invalid → ghi kết quả.

**Phase 3 – Sync:**
- Service Worker tự động kích hoạt khi phát hiện online.
- Gửi batch POST đến Ticket Service → server xử lý và trả kết quả (synced/conflicts).
- Cập nhật sync_status trong IndexedDB.

**Đặc điểm:** PWA + Service Worker + IndexedDB = offline-first architecture. Background Sync đảm bảo dữ liệu không bị mất.

---

## UC-13: Giao dịch vé thứ cấp trên Resale Market

### Diễn giải Activity Diagram

Sơ đồ hoạt động UC-13 mô tả toàn bộ lifecycle của một giao dịch resale – từ niêm yết đến chuyển nhượng hoàn tất.

**Luồng chính (2 giai đoạn):**

*Giai đoạn 1 – Seller niêm yết:*
- Seller chọn vé → hệ thống kiểm tra điều kiện (ACTIVE, allow_resale, no active listing) → nhập giá → validate giá trần (≤120% giá gốc) → freeze vé → tạo listing.

*Giai đoạn 2 – Buyer mua:*
- Buyer tìm kiếm → chọn listing → thanh toán qua escrow → chuyển quyền sở hữu → hủy TOTP cũ → sinh TOTP mới → giải ngân cho seller → thông báo.

**Các nút quyết định quan trọng:**
- "Kiểm tra điều kiện vé" – gate đầu tiên, ngăn vé không đủ điều kiện.
- "Giá ≤ 120% giá gốc?" – cơ chế chống đầu cơ.
- "Thanh toán thành công?" – nếu thất bại, listing vẫn active (không mất cơ hội bán).

**Đặc điểm bảo mật:** Hủy TOTP cũ + sinh TOTP mới đảm bảo seller không thể sử dụng vé sau khi bán. Escrow bảo vệ buyer.

### Diễn giải Sequence Diagram

Sơ đồ tuần tự UC-13 thể hiện tương tác phức tạp giữa nhiều service: Resale Service (orchestrator), Ticket Service, Payment Service, và Notification Service.

**Luồng Seller (nửa trên):**
1. Seller → Client → Resale Service: tạo listing.
2. Resale Service → Ticket Service: verify + freeze vé.
3. Response về cho Seller: listing created.

**Luồng Buyer (nửa dưới):**
1. Buyer → Resale Service: purchase request.
2. Resale Service → Payment Service: tạo escrow.
3. Payment Service → Buyer: redirect thanh toán.
4. Sau thanh toán: chuỗi transfer ownership (Resale → Ticket: hủy TOTP cũ, sinh mới, update owner).
5. Resale → Payment: release escrow cho seller.
6. Kafka → Notification: thông báo cả hai bên.

**Đặc điểm:** Saga pattern (chuỗi transaction phân tán), escrow mechanism, TOTP rotation đảm bảo security.

---

## UC-14: Quản lý merchandise, combo và tồn kho

### Diễn giải Activity Diagram

Sơ đồ hoạt động UC-14 mô tả hai luồng chính: Organizer tạo/quản lý sản phẩm và USER mua merchandise.

**Luồng Organizer (tạo sản phẩm):**
- Truy cập module → nhập thông tin sản phẩm → validate (SKU unique) → lưu DB → gắn với sự kiện → tạo combo/upsell.
- Nút quyết định "Validate dữ liệu": nếu SKU trùng → từ chối.

**Luồng USER (mua hàng):**
- Thêm vào giỏ → kiểm tra stock → thanh toán → publish event Kafka → trừ tồn kho atomic.
- Nút quyết định "Stock đủ?": nếu hết → yêu cầu cập nhật giỏ.
- Nút quyết định "Stock < ngưỡng cảnh báo?": nếu có → gửi alert cho Organizer.

**Đặc điểm:** Event-driven inventory management (trừ kho qua Kafka, không trừ trực tiếp khi đặt hàng), atomic operation tránh oversell, proactive alerting.

### Diễn giải Sequence Diagram

Sơ đồ tuần tự UC-14 chia thành 2 phần bằng Note block.

**Phần 1 – Organizer tạo sản phẩm:**
- Organizer → Portal → Merchandise Service → DB: CRUD sản phẩm.
- Khối `alt`: SKU trùng → 409 error; OK → INSERT.

**Phần 2 – User mua hàng:**
- User → Booking Service → Merchandise Service: check stock.
- Payment confirmed → Kafka → Merchandise Service: trừ kho (atomic UPDATE).
- Khối `alt` cuối: nếu stock dưới ngưỡng → Kafka → Notification → Organizer alert.

**Đặc điểm:** Tách biệt write path (Organizer CRUD) và read/consume path (User purchase). Kafka đảm bảo eventual consistency cho inventory.

---

## UC-15: Quản trị, báo cáo, đối soát, refund và hóa đơn

### Diễn giải Activity Diagram

Sơ đồ hoạt động UC-15 mô tả các chức năng quản trị tài chính – UC phức tạp nhất với nhiều nhánh song song.

**Điểm bắt đầu chung:** Admin/Organizer truy cập dashboard → load dữ liệu realtime → hiển thị biểu đồ.

**4 nhánh hành động (từ nút quyết định "Hành động?"):**
1. **Đối soát:** Gọi MoMo Reconciliation API → so sánh → đánh dấu RECONCILED hoặc MISMATCH.
2. **Refund:** Chọn orders → gọi MoMo Refund API → thành công (cập nhật status + thông báo user) hoặc thất bại (cho retry).
3. **Xuất hóa đơn:** Gọi MISA Invoice API → thành công (lưu + ký số) hoặc thất bại (retry queue).
4. **Export báo cáo:** Generate file Excel/CSV/PDF → trả download link.

**Đặc điểm:** Mọi nhánh đều kết thúc bằng ghi audit log (compliance requirement). Multi-tenant isolation: Organizer chỉ thấy data của mình.

### Diễn giải Sequence Diagram

Sơ đồ tuần tự UC-15 thể hiện tương tác với external systems (MoMo API, MISA API) – đặc trưng của integration patterns.

**3 phần (Note blocks):**

*Đối soát:*
- Finance Service → MoMo: lấy transactions → so sánh nội bộ → trả kết quả.

*Refund:*
- Payment Service → MoMo: refund request.
- Khối `alt`: thành công → cascade update (Booking + Ticket + Notification); thất bại → lưu lỗi.

*Hóa đơn:*
- Finance Service → MISA: tạo e-invoice với thông tin pháp nhân + thuế suất.

**Đặc điểm:** Integration với third-party APIs (MoMo, MISA), retry mechanism cho external failures, cascade updates across multiple services.

---

## UC-16: Hỏi đáp với AI Chatbot

### Diễn giải Activity Diagram

Sơ đồ hoạt động UC-16 mô tả luồng xử lý câu hỏi của người dùng bởi AI Chatbot – kết hợp NLP và Information Retrieval.

**Luồng chính:**
- USER mở widget → nhập câu hỏi → gửi đến AI Service.
- AI Service phân tích intent (ý định).

**Chuỗi nút quyết định:**
1. "Intent = personal_order?" → nếu có: kiểm tra đăng nhập (chưa login → yêu cầu đăng nhập).
2. "Có kết quả relevant?" → nếu không: trả lời "chưa có thông tin" + đề xuất support.
3. "Confidence ≥ 0.7?" → nếu không: trả lời không chắc chắn + đề xuất hỏi lại/support.
4. Nếu confidence đủ: sinh câu trả lời + related links.

**Vòng lặp:** Nút quyết định "USER hỏi tiếp?" tạo loop quay lại bước nhập câu hỏi (multi-turn conversation).

**Kết thúc:** Lưu lịch sử hội thoại vào MongoDB.

**Đặc điểm:** Confidence-based routing (đảm bảo chatbot không trả lời sai), graceful degradation (escalate to human support), privacy-aware (yêu cầu auth cho thông tin cá nhân).

### Diễn giải Sequence Diagram

Sơ đồ tuần tự UC-16 thể hiện luồng xử lý AI pipeline từ input đến output.

**Participants:** USER, React Chat Widget, API Gateway, AI Service (FastAPI), MongoDB.

**Luồng tương tác:**
1. USER → Client → Gateway → AI Service: gửi message.
2. AI Service thực hiện Intent Classification (self-call).
3. Khối `alt` ngoài: personal_order (chưa login) → reject; general → tiếp tục.
4. AI Service → MongoDB: Semantic Search (TF-IDF + Cosine Similarity).
5. Khối `alt` lồng trong: no results → fallback message; confidence < 0.7 → uncertain response; confidence ≥ 0.7 → compose full answer.
6. Response trả về Client → hiển thị cho USER.
7. Optional: USER feedback (👍/👎) → Client → AI Service → MongoDB (lưu để improve).

**Đặc điểm:** RAG-like pattern (Retrieval-Augmented Generation), confidence scoring, feedback loop cho continuous improvement, context management qua conversation_id.
