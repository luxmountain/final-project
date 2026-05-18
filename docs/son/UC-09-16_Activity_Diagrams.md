# Activity Diagrams (Mermaid) – UC-09 đến UC-16

---

## UC-09: Phát hành vé điện tử, QR động và NFT Ticket

```mermaid
flowchart TD
    A([Bắt đầu]) --> B[Nhận event PAYMENT_CONFIRMED từ Kafka]
    B --> C[Tạo Ticket ID - UUID v4 cho từng vé]
    C --> D[Mapping ticket với order, user, event, seat, class]
    D --> E[Sinh TOTP Secret - RFC 6238]
    E --> F[Tạo QR động - xoay 30s]
    F --> G{Sự kiện bật NFT Ticketing?}
    G -->|Có| H[Mint NFT Ticket - ERC-721 trên Polygon]
    H --> I{Mint thành công?}
    I -->|Có| J[Lưu vé vào DB - status ACTIVE]
    I -->|Không| K[Đánh dấu off-chain, đưa vào retry queue]
    K --> J
    G -->|Không| J
    J --> L{Lưu DB thành công?}
    L -->|Có| M[Publish event TICKET_ISSUED lên Kafka]
    L -->|Không| N[Rollback, đưa vào dead-letter queue]
    N --> O([Kết thúc - Lỗi])
    M --> P[Notification Service gửi thông báo cho USER]
    P --> Q[USER xem vé trong ví vé điện tử]
    Q --> R([Kết thúc])
```

---

## UC-10: Quản lý ví vé điện tử của người dùng

```mermaid
flowchart TD
    A([Bắt đầu]) --> B[USER truy cập Ví vé]
    B --> C[Client gửi request GET /tickets]
    C --> D{JWT hợp lệ?}
    D -->|Không| E[Refresh token flow]
    E --> C
    D -->|Có| F[Ticket Service truy vấn danh sách vé theo user_id]
    F --> G[Trả về danh sách vé - nhóm theo upcoming/past]
    G --> H[Hiển thị danh sách vé với badge trạng thái]
    H --> I[USER chọn xem chi tiết một vé]
    I --> J{Trạng thái vé?}
    J -->|ACTIVE| K[Hiển thị QR động - auto-refresh 30s]
    J -->|USED| L[Hiển thị lịch sử check-in]
    J -->|REFUNDED| M[Hiển thị thông tin hoàn tiền, ẩn QR]
    J -->|FROZEN| N[Hiển thị trạng thái đang resale, ẩn QR]
    K --> O[Hiển thị thông tin chi tiết vé]
    L --> O
    M --> O
    N --> O
    O --> P{USER chọn hành động?}
    P -->|Lưu vào Wallet| Q[Tạo PKPass / JWT Pass]
    P -->|Niêm yết resale| R[Chuyển sang UC-13]
    P -->|Xem hướng dẫn| S[Hiển thị modal hướng dẫn]
    Q --> T([Kết thúc])
    R --> T
    S --> T
```

---

## UC-11: Check-in vé tại cổng

```mermaid
flowchart TD
    A([Bắt đầu]) --> B[STAFF mở Staff App - PWA]
    B --> C[STAFF chọn sự kiện và cổng được phân công]
    C --> D[STAFF kích hoạt camera quét QR]
    D --> E[USER xuất trình QR động trên ví vé]
    E --> F[Staff App quét và giải mã QR]
    F --> G[Gửi request verify đến Ticket Service]
    G --> H{TOTP hợp lệ? - ±30s window}
    H -->|Không| I[Hiển thị CHECK-IN INVALID - màn hình đỏ]
    I --> J[Ghi log quét thất bại]
    J --> K([Kết thúc - Từ chối])
    H -->|Có| L{Kiểm tra trạng thái vé}
    L -->|Đã USED| M[Cảnh báo - Vé đã sử dụng + thời điểm check-in cũ]
    M --> K
    L -->|Sai sự kiện/cổng| N[Từ chối - Sai sự kiện/cổng]
    N --> K
    L -->|ACTIVE + đúng sự kiện| O[Cập nhật status = USED]
    O --> P[Ghi log check-in thành công]
    P --> Q[Publish event lên Kafka checkin-events]
    Q --> R[Hiển thị CHECK-IN THÀNH CÔNG - màn hình xanh + info ghế]
    R --> S[STAFF cho USER vào cổng]
    S --> T([Kết thúc - Thành công])
```

---

## UC-12: Check-in offline và đồng bộ dữ liệu

```mermaid
flowchart TD
    A([Bắt đầu]) --> B[STAFF mở Staff App khi có mạng]
    B --> C[Tải trước danh sách hash vé vào IndexedDB]
    C --> D[Service Worker cache dữ liệu - mã hóa AES-256]
    D --> E{Trạng thái mạng?}
    E -->|Có mạng| F[Check-in online - UC-11]
    F --> Z([Kết thúc])
    E -->|Mất mạng| G[Chuyển sang Offline Mode - hiển thị badge OFFLINE]
    G --> H[STAFF quét QR của USER]
    H --> I{Vé có trong local cache?}
    I -->|Không| J[Hiển thị: Không thể xác minh offline]
    J --> Z
    I -->|Có| K[Verify TOTP local từ IndexedDB]
    K --> L{TOTP hợp lệ?}
    L -->|Không| M[Hiển thị INVALID]
    M --> Z
    L -->|Có| N{Vé đã USED trong local cache?}
    N -->|Đã used| O[Hiển thị: Vé đã sử dụng]
    O --> Z
    N -->|Chưa used| P[Ghi check-in vào IndexedDB - status PENDING]
    P --> Q[Đánh dấu vé = USED trong local cache]
    Q --> R[Hiển thị CHECK-IN OK OFFLINE]
    R --> S{Có mạng trở lại?}
    S -->|Chưa| H
    S -->|Có| T[Service Worker kích hoạt Background Sync]
    T --> U[Gửi batch check-in logs về server]
    U --> V[Server xử lý từng record - kiểm tra conflict]
    V --> W[Trả kết quả sync: synced N, conflicts M]
    W --> X[Cập nhật sync_status trong IndexedDB]
    X --> Z
```

---

## UC-13: Giao dịch vé thứ cấp trên Resale Market

```mermaid
flowchart TD
    A([Bắt đầu]) --> B[Seller chọn vé ACTIVE từ ví vé]
    B --> C{Kiểm tra điều kiện vé}
    C -->|Không đủ điều kiện| D[Trả lỗi - không thể niêm yết]
    D --> Z([Kết thúc])
    C -->|Đủ điều kiện| E[Seller nhập giá bán]
    E --> F{Giá ≤ 120% giá gốc?}
    F -->|Không| G[Từ chối - vượt giá trần]
    G --> Z
    F -->|Có| H[Freeze vé - status FROZEN]
    H --> I[Tạo listing trên Resale Market]
    I --> J[Listing hiển thị trên marketplace]
    J --> K[Buyer tìm kiếm và chọn listing]
    K --> L[Buyer xác nhận mua]
    L --> M[Tạo escrow transaction]
    M --> N{Thanh toán thành công?}
    N -->|Không| O[Thông báo thanh toán thất bại - listing vẫn active]
    O --> Z
    N -->|Có| P[Chuyển quyền sở hữu - owner_id = buyer_id]
    P --> Q[Hủy TOTP Secret cũ của Seller]
    Q --> R[Sinh TOTP Secret mới cho Buyer]
    R --> S[Giải ngân cho Seller - trừ phí nền tảng]
    S --> T[Publish event resale-events lên Kafka]
    T --> U[Gửi thông báo cho Seller và Buyer]
    U --> Z
```

---

## UC-14: Quản lý merchandise, combo và tồn kho

```mermaid
flowchart TD
    A([Bắt đầu]) --> B[ORGANIZER truy cập module Merchandise]
    B --> C[Tạo sản phẩm: tên, mô tả, ảnh, SKU, giá, biến thể, tồn kho]
    C --> D{Validate dữ liệu}
    D -->|SKU trùng| E[Từ chối - SKU đã tồn tại]
    E --> Z([Kết thúc])
    D -->|Hợp lệ| F[Lưu sản phẩm vào DB]
    F --> G[Gắn sản phẩm với sự kiện]
    G --> H[Tạo combo vé + merchandise hoặc cấu hình upsell]
    H --> I[Sản phẩm hiển thị trên storefront sự kiện]
    I --> J[USER thêm merchandise vào giỏ hàng]
    J --> K{Stock đủ?}
    K -->|Không| L[Yêu cầu USER cập nhật giỏ hàng]
    L --> Z
    K -->|Có| M[Thanh toán thành công]
    M --> N[Publish event stock-events lên Kafka]
    N --> O[Merchandise Service trừ tồn kho - atomic]
    O --> P{Stock < ngưỡng cảnh báo?}
    P -->|Không| Z
    P -->|Có| Q[Gửi cảnh báo sắp hết hàng cho ORGANIZER]
    Q --> Z
```

---

## UC-15: Quản trị, báo cáo, đối soát, refund và hóa đơn

```mermaid
flowchart TD
    A([Bắt đầu]) --> B[ADMIN/ORGANIZER truy cập dashboard]
    B --> C[Finance Service load dữ liệu báo cáo realtime]
    C --> D[Hiển thị dashboard: doanh thu, vé bán, check-in, refund]
    D --> E{Hành động?}
    E -->|Đối soát| F[Gọi MoMo Reconciliation API]
    F --> G{Dữ liệu khớp?}
    G -->|Có| H[Đánh dấu RECONCILED]
    G -->|Không| I[Đánh dấu MISMATCH + alert Admin]
    H --> Z([Kết thúc])
    I --> Z
    E -->|Refund| J[Admin chọn orders + loại refund]
    J --> K[Gọi MoMo Refund API]
    K --> L{Refund thành công?}
    L -->|Có| M[Cập nhật order/ticket status = REFUNDED]
    M --> N[Gửi thông báo refund cho USER]
    N --> Z
    L -->|Không| O[Lưu REFUND_FAILED - cho phép retry]
    O --> Z
    E -->|Xuất hóa đơn| P[Gọi MISA Invoice API]
    P --> Q{Xuất thành công?}
    Q -->|Có| R[Lưu invoice_id + ký số]
    Q -->|Không| S[Đưa vào retry queue + alert]
    R --> Z
    S --> Z
    E -->|Export báo cáo| T[Generate file Excel/CSV/PDF]
    T --> U[Trả download link]
    U --> Z
```

---

## UC-16: Hỏi đáp với AI Chatbot

```mermaid
flowchart TD
    A([Bắt đầu]) --> B[USER mở chatbot widget]
    B --> C[USER nhập câu hỏi bằng ngôn ngữ tự nhiên]
    C --> D[Client gửi message đến AI Service]
    D --> E[Phân tích ý định - Intent Classification]
    E --> F{Intent = personal_order?}
    F -->|Có| G{USER đã đăng nhập?}
    G -->|Không| H[Yêu cầu đăng nhập trước]
    H --> Z([Kết thúc])
    G -->|Có| I[Truy vấn thông tin đơn hàng cá nhân]
    I --> N
    F -->|Không| J[Semantic Search trên Knowledge Base - TF-IDF + Cosine]
    J --> K{Có kết quả relevant?}
    K -->|Không| L[Trả lời: Chưa có thông tin + đề xuất liên hệ support]
    L --> Z
    K -->|Có| M{Confidence ≥ 0.7?}
    M -->|Không| O[Trả lời không chắc chắn + đề xuất support/hỏi lại]
    O --> Z
    M -->|Có| N[Sinh câu trả lời từ KB + đính kèm related links]
    N --> P[Hiển thị câu trả lời + suggested questions]
    P --> Q[USER đánh giá thumbs up/down - optional]
    Q --> R{USER hỏi tiếp?}
    R -->|Có| C
    R -->|Không| S[Lưu lịch sử hội thoại vào MongoDB]
    S --> Z
```


---

# Sequence Diagrams – UC-09 đến UC-16

---

## UC-09 Sequence: Phát hành vé điện tử, QR động và NFT Ticket

```mermaid
sequenceDiagram
    participant Kafka
    participant TicketSvc as Ticket Service
    participant DB as PostgreSQL
    participant BlockchainSvc as Blockchain Service
    participant IPFS
    participant NotifSvc as Notification Service
    participant User as USER (Client)

    Kafka->>TicketSvc: Event PAYMENT_CONFIRMED (order_id, user_id, seats[])
    TicketSvc->>TicketSvc: Tạo Ticket ID (UUID v4) cho từng seat
    TicketSvc->>TicketSvc: Mapping ticket ↔ order, user, event, seat, class
    TicketSvc->>TicketSvc: Sinh TOTP Secret (RFC 6238)
    TicketSvc->>TicketSvc: Tạo QR động (xoay 30s)
    TicketSvc->>DB: Query event config (NFT enabled?)
    DB-->>TicketSvc: nft_enabled = true/false
    alt NFT enabled
        TicketSvc->>BlockchainSvc: Mint NFT (ticket_id, event_id, seat_id, owner)
        BlockchainSvc->>IPFS: Upload metadata JSON
        IPFS-->>BlockchainSvc: ipfs_hash
        BlockchainSvc->>BlockchainSvc: Call ERC-721 contract on Polygon
        BlockchainSvc-->>TicketSvc: tx_hash
    end
    TicketSvc->>DB: INSERT ticket (status=ACTIVE, totp_secret, nft_tx_hash)
    DB-->>TicketSvc: OK
    TicketSvc->>Kafka: Publish TICKET_ISSUED
    Kafka->>NotifSvc: Event TICKET_ISSUED
    NotifSvc->>User: Email + Push "Vé đã sẵn sàng"
```

---

## UC-10 Sequence: Quản lý ví vé điện tử

```mermaid
sequenceDiagram
    participant User as USER
    participant Client as React PWA
    participant Gateway as API Gateway
    participant TicketSvc as Ticket Service
    participant DB as PostgreSQL

    User->>Client: Mở "Ví vé"
    Client->>Gateway: GET /tickets?user_id={id} + JWT
    Gateway->>Gateway: Validate JWT
    Gateway->>TicketSvc: Forward request
    TicketSvc->>DB: SELECT tickets WHERE owner_id = user_id JOIN events
    DB-->>TicketSvc: tickets[]
    TicketSvc-->>Client: Response JSON (tickets with event info)
    Client->>Client: Render danh sách (upcoming / past)
    User->>Client: Chọn vé cụ thể
    alt status = ACTIVE
        Client->>Client: Sinh QR từ TOTP Secret (auto-refresh 30s)
        Client->>User: Hiển thị QR động + chi tiết vé
    else status = USED
        Client->>User: Hiển thị lịch sử check-in
    else status = REFUNDED
        Client->>User: Hiển thị thông tin hoàn tiền
    else status = FROZEN
        Client->>User: Hiển thị trạng thái đang resale
    end
```

---

## UC-11 Sequence: Check-in vé tại cổng

```mermaid
sequenceDiagram
    participant Staff as STAFF
    participant StaffApp as Staff App (PWA)
    participant User as USER
    participant TicketSvc as Ticket Service
    participant DB as PostgreSQL
    participant Kafka

    Staff->>StaffApp: Mở app, chọn sự kiện + cổng
    Staff->>StaffApp: Kích hoạt camera
    User->>StaffApp: Xuất trình QR động
    StaffApp->>StaffApp: Decode QR → ticket_id + otp_code
    StaffApp->>TicketSvc: POST /tickets/check-in {ticket_id, otp_code, gate_id, staff_id}
    TicketSvc->>DB: SELECT totp_secret WHERE ticket_id
    DB-->>TicketSvc: totp_secret
    TicketSvc->>TicketSvc: Verify TOTP (current ± 1 step)
    alt TOTP invalid
        TicketSvc-->>StaffApp: 401 INVALID
        StaffApp->>Staff: Màn hình đỏ "CHECK-IN INVALID"
    else TOTP valid
        TicketSvc->>DB: SELECT status, event_id WHERE ticket_id
        DB-->>TicketSvc: status, event_id
        alt status ≠ ACTIVE hoặc sai event
            TicketSvc-->>StaffApp: 409 REJECTED (reason)
            StaffApp->>Staff: Hiển thị lý do từ chối
        else Tất cả OK
            TicketSvc->>DB: UPDATE status='USED', checked_at, gate_id, staff_id
            TicketSvc->>DB: INSERT checkin_logs
            TicketSvc->>Kafka: Publish checkin-events
            TicketSvc-->>StaffApp: 200 SUCCESS {seat_info}
            StaffApp->>Staff: Màn hình xanh "✓ THÀNH CÔNG" + info ghế
            Staff->>User: Cho vào cổng
        end
    end
```

---

## UC-12 Sequence: Check-in offline và đồng bộ

```mermaid
sequenceDiagram
    participant Staff as STAFF
    participant App as Staff App (PWA)
    participant SW as Service Worker
    participant IDB as IndexedDB
    participant TicketSvc as Ticket Service
    participant User as USER

    Note over Staff,App: === PHASE 1: Preload (có mạng) ===
    Staff->>App: Nhấn "Tải dữ liệu offline"
    App->>TicketSvc: GET /tickets/offline-pack?event_id&gate_id
    TicketSvc-->>App: [{ticket_id, totp_secret_encrypted, seat_info}]
    App->>IDB: Lưu data (mã hóa AES-256)

    Note over Staff,App: === PHASE 2: Offline check-in ===
    App->>App: Phát hiện mất mạng → Offline Mode
    User->>App: Xuất trình QR
    App->>App: Decode QR → ticket_id + otp
    App->>IDB: Tra cứu ticket_id
    alt Không tìm thấy
        App->>Staff: "Không thể xác minh offline"
    else Tìm thấy
        App->>App: Verify TOTP local
        alt TOTP invalid
            App->>Staff: INVALID
        else TOTP valid + chưa used
            App->>IDB: Ghi check-in (PENDING) + đánh dấu USED
            App->>Staff: "✓ CHECK-IN OK (OFFLINE)"
        end
    end

    Note over Staff,App: === PHASE 3: Sync (có mạng lại) ===
    SW->>SW: Phát hiện online → Background Sync
    SW->>IDB: Lấy records PENDING
    SW->>TicketSvc: POST /tickets/sync-checkin (batch)
    TicketSvc->>TicketSvc: Xử lý từng record, detect conflicts
    TicketSvc-->>SW: {synced: N, conflicts: M}
    SW->>IDB: Cập nhật sync_status
```

---

## UC-13 Sequence: Giao dịch vé thứ cấp (Resale)

```mermaid
sequenceDiagram
    participant Seller as USER (Seller)
    participant Client as React Client
    participant ResaleSvc as Resale Service
    participant TicketSvc as Ticket Service
    participant PaymentSvc as Payment Service
    participant Buyer as USER (Buyer)
    participant Kafka
    participant NotifSvc as Notification Service

    Seller->>Client: Chọn vé → "Bán lại"
    Client->>ResaleSvc: POST /resale/listings {ticket_id, asking_price}
    ResaleSvc->>TicketSvc: Verify ticket (ACTIVE, allow_resale, no active listing)
    TicketSvc-->>ResaleSvc: OK
    ResaleSvc->>ResaleSvc: Validate giá ≤ 120% giá gốc
    ResaleSvc->>TicketSvc: Freeze vé (status=FROZEN)
    ResaleSvc->>ResaleSvc: Tạo listing (status=ACTIVE)
    ResaleSvc-->>Seller: Listing created

    Buyer->>Client: Duyệt marketplace, chọn listing
    Client->>ResaleSvc: POST /resale/purchase {listing_id}
    ResaleSvc->>PaymentSvc: Tạo escrow transaction
    PaymentSvc->>Buyer: Redirect thanh toán MoMo
    Buyer->>PaymentSvc: Thanh toán thành công
    PaymentSvc-->>ResaleSvc: Escrow confirmed

    ResaleSvc->>TicketSvc: Transfer ownership (seller → buyer)
    TicketSvc->>TicketSvc: Hủy TOTP cũ
    TicketSvc->>TicketSvc: Sinh TOTP mới cho buyer
    TicketSvc->>TicketSvc: Update owner_id = buyer_id, status=ACTIVE
    ResaleSvc->>PaymentSvc: Release escrow → seller (trừ fee)
    ResaleSvc->>Kafka: Publish resale-events
    Kafka->>NotifSvc: Event
    NotifSvc->>Seller: "Vé đã bán thành công"
    NotifSvc->>Buyer: "Vé mới đã sẵn sàng"
```

---

## UC-14 Sequence: Quản lý merchandise, combo và tồn kho

```mermaid
sequenceDiagram
    participant Org as ORGANIZER
    participant Client as Organizer Portal
    participant MerchSvc as Merchandise Service
    participant DB as PostgreSQL
    participant User as USER
    participant BookingSvc as Booking Service
    participant PaymentSvc as Payment Service
    participant Kafka
    participant NotifSvc as Notification Service

    Org->>Client: Tạo sản phẩm (tên, SKU, giá, stock, variants)
    Client->>MerchSvc: POST /merchandise/products
    MerchSvc->>DB: Check SKU unique per organizer_id
    alt SKU trùng
        MerchSvc-->>Client: 409 SKU already exists
    else OK
        MerchSvc->>DB: INSERT product
        MerchSvc-->>Client: Product created
    end
    Org->>Client: Gắn product với event + tạo combo
    Client->>MerchSvc: POST /merchandise/combos

    Note over User,BookingSvc: === User mua hàng ===
    User->>BookingSvc: Thêm merchandise vào giỏ
    BookingSvc->>MerchSvc: Check stock available
    MerchSvc-->>BookingSvc: stock OK / out of stock
    User->>PaymentSvc: Thanh toán
    PaymentSvc->>Kafka: Publish PAYMENT_CONFIRMED
    Kafka->>MerchSvc: stock-events {sku_id, qty_delta=-N}
    MerchSvc->>DB: UPDATE stock = stock - N (atomic)
    MerchSvc->>MerchSvc: Check stock < threshold?
    alt Dưới ngưỡng
        MerchSvc->>Kafka: Alert event
        Kafka->>NotifSvc: notification-events
        NotifSvc->>Org: "Sản phẩm X sắp hết hàng"
    end
```

---

## UC-15 Sequence: Quản trị, báo cáo, đối soát, refund và hóa đơn

```mermaid
sequenceDiagram
    participant Admin as ADMIN
    participant Client as Admin Portal
    participant FinSvc as Finance Service
    participant PaymentSvc as Payment Service
    participant MoMo as MoMo API
    participant MISA as MISA Invoice API
    participant BookingSvc as Booking Service
    participant TicketSvc as Ticket Service
    participant NotifSvc as Notification Service
    participant User as USER

    Admin->>Client: Mở Dashboard
    Client->>FinSvc: GET /finance/dashboard
    FinSvc-->>Client: {revenue, tickets_sold, checkin_rate, refunds}

    Note over Admin,MoMo: === Đối soát ===
    Admin->>Client: Nhấn "Đối soát"
    Client->>FinSvc: POST /finance/reconcile {date_range}
    FinSvc->>MoMo: GET transactions (reconciliation API)
    MoMo-->>FinSvc: momo_transactions[]
    FinSvc->>FinSvc: So sánh internal vs momo (amount, status)
    FinSvc-->>Client: {reconciled: N, mismatches: M}

    Note over Admin,User: === Refund ===
    Admin->>Client: Chọn orders → Refund
    Client->>PaymentSvc: POST /payments/refund {order_ids[], type}
    PaymentSvc->>MoMo: Refund API (payment_id, amount)
    alt Thành công
        MoMo-->>PaymentSvc: refund_success
        PaymentSvc->>BookingSvc: Update order status=REFUNDED
        PaymentSvc->>TicketSvc: Update ticket status=REFUNDED
        PaymentSvc->>NotifSvc: Send refund notification
        NotifSvc->>User: "Đơn hàng đã hoàn tiền"
    else Thất bại
        MoMo-->>PaymentSvc: error
        PaymentSvc-->>Client: REFUND_FAILED (retry available)
    end

    Note over Admin,MISA: === Hóa đơn ===
    Admin->>Client: Xuất hóa đơn
    Client->>FinSvc: POST /finance/invoices
    FinSvc->>MISA: Create e-invoice (legal_info, items, tax_rates)
    MISA-->>FinSvc: invoice_id
    FinSvc-->>Client: Invoice issued
```

---

## UC-16 Sequence: Hỏi đáp với AI Chatbot

```mermaid
sequenceDiagram
    participant User as USER
    participant Client as React (Chat Widget)
    participant Gateway as API Gateway
    participant AISvc as AI Service (FastAPI)
    participant MongoDB
    participant NotifSvc as Notification Service

    User->>Client: Mở chatbot widget
    Client->>User: Greeting message
    User->>Client: Nhập câu hỏi (ngôn ngữ tự nhiên)
    Client->>Gateway: POST /ai/chat {conversation_id, message, user_id?}
    Gateway->>AISvc: Forward

    AISvc->>AISvc: Intent Classification
    alt Intent = personal_order & chưa login
        AISvc-->>Client: "Vui lòng đăng nhập để xem thông tin đơn hàng"
    else Intent = general/event_info/faq
        AISvc->>MongoDB: Semantic Search (TF-IDF + Cosine Similarity) trên KB
        MongoDB-->>AISvc: top-K documents + similarity scores
        alt Không có kết quả relevant
            AISvc-->>Client: "Chưa có thông tin. Liên hệ support?"
        else Confidence < 0.7
            AISvc-->>Client: "Không chắc chắn. Thử hỏi lại hoặc liên hệ support"
        else Confidence ≥ 0.7
            AISvc->>AISvc: Compose answer + related_links
            AISvc-->>Client: {answer, confidence, related_links, suggestions}
        end
    end

    Client->>User: Hiển thị câu trả lời + gợi ý
    User->>Client: Feedback 👍/👎 (optional)
    Client->>AISvc: POST /ai/feedback {conversation_id, score}
    AISvc->>MongoDB: Lưu conversation history + feedback
```
