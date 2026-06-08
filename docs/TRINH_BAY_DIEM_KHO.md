# Trình bày: Các điểm khó / phức tạp / ý tưởng mới

> Thời lượng: 2–3 phút

---

## Mở đầu (~15 giây)

Xin chào mọi người, em xin trình bày các điểm khó, phức tạp và ý tưởng mới trong phần công việc mà em đã thực hiện, bao gồm: **Phân tích quy trình nghiệp vụ**, **Thiết kế giao diện**, và **Phân tích/trực quan hóa nghiệp vụ** cho hệ thống vé sự kiện tích hợp AI.

---

## 1. Phân tích quy trình nghiệp vụ (~45 giây)

Phần khó nhất là áp dụng phương pháp luận **BABOK v3** một cách có hệ thống: sử dụng mô hình **SIPOC** cho từng quy trình, kết hợp với **ma trận tương tác giữa các quy trình** (Process Interaction Matrix) và **ma trận RACI**.

Điểm phức tạp nổi bật nhất là **quy trình Đặt vé & Thanh toán (BP-03)** – đây là core process đòi hỏi xử lý đồng thời cao (High Concurrency) với cơ chế **Redis Distributed Lock** (SETNX + TTL) để đảm bảo **Zero Oversell** – nghĩa là mỗi ghế chỉ 1 user giữ tại 1 thời điểm.

Ý tưởng mới ở đây là **giao tiếp bất đồng bộ qua Kafka** giữa các service (Booking → Ticket, Notification, Merchandise), giúp giảm coupling và tăng khả năng chịu tải.

---

## 2. Thiết kế giao diện (~30 giây)

Hệ thống có **4 app riêng biệt** (User, Organizer, Staff, Admin) chạy trong **Turborepo monorepo**, tổng cộng **29 màn hình**.

Điểm phức tạp là phải thiết kế nhất quán theo hệ thống Dark Mode (zinc-900/950, green-500 accent) với responsive mobile-first từ 375px đến 1920px, đồng thời phải xử lý các interaction phức tạp như:

- **Seat map realtime** có countdown giữ ghế
- **QR động** cập nhật mỗi 30 giây trên màn hình vé

---

## 3. Phân tích / Trực quan hóa nghiệp vụ (~45 giây)

Phần này em đã xây dựng **16 Use Case** với đầy đủ: Scenario (kịch bản chính + ngoại lệ), Activity Diagram, và mô tả luồng Activity chi tiết từng bước.

Điểm phức tạp nhất là các UC liên quan đến **luồng đa tác nhân** – ví dụ:

- **UC-05 (Phê duyệt sự kiện)**: Admin có 4 lựa chọn (Phê duyệt / Yêu cầu bổ sung / Từ chối / Khóa)
- **UC-12 (Check-in offline)**: xử lý **đồng bộ dữ liệu** khi mất mạng với cơ chế **eventual consistency** và xử lý trùng lặp check-in giữa nhiều thiết bị

Ý tưởng mới đáng chú ý:

- **UC-09**: QR động TOTP xoay mỗi 30 giây (RFC 6238) – ảnh chụp màn hình QR sẽ hết hạn → chống vé giả hoàn toàn
- Hệ thống hỗ trợ **NFT Ticketing** tùy cấu hình
- **Resale Market** với giá trần 120% + escrow logic

---

## Kết (~15 giây)

Tóm lại, các điểm khó/mới tập trung ở:

1. Xử lý đồng thời cao với **Redis Lock + Kafka**
2. **QR động TOTP** chống vé giả
3. Cơ chế **offline sync** cho check-in
4. Thiết kế hệ thống phân tán theo microservices với phương pháp luận **BABOK v3** chuẩn

Em xin cảm ơn!
