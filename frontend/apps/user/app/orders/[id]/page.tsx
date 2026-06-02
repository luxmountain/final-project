import Link from "next/link";
import { ArrowLeft, Calendar, Ticket, CreditCard, MapPin, Package } from "lucide-react";

export default function OrderDetailPage() {
  const order = {
    id: "ORD-2026-001",
    date: "2026-06-01T10:30:00",
    status: "completed",
    paymentMethod: "Vietcombank ****6789",
    items: [
      { name: "VIP - Hàng A - Ghế 5", event: "Đêm nhạc Sơn Tùng M-TP: Sky Tour 2026", price: 3000000 },
      { name: "VIP - Hàng A - Ghế 6", event: "Đêm nhạc Sơn Tùng M-TP: Sky Tour 2026", price: 3000000 },
    ],
    eventDate: "15/06/2026 - 19:00",
    venue: "Sân vận động Mỹ Đình, Hà Nội",
    subtotal: 6000000,
    discount: 0,
    total: 6000000,
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/orders" className="rounded-full p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="font-semibold text-zinc-100">Chi tiết đơn hàng</h1>
          <p className="font-mono text-xs text-zinc-500">{order.id}</p>
        </div>
        <span className="ml-auto rounded-full bg-green-500/20 px-2.5 py-0.5 text-xs font-medium text-green-400 ring-1 ring-green-500/30">Hoàn thành</span>
      </div>

      {/* Timeline */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Calendar className="h-3.5 w-3.5" />
          Đặt hàng lúc {new Date(order.date).toLocaleString("vi-VN")}
        </div>
      </div>

      {/* Items */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 space-y-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-300">
          <Ticket className="h-4 w-4 text-green-400" /> Vé ({order.items.length})
        </h3>
        <div className="space-y-3">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg bg-zinc-800/50 p-3">
              <div>
                <p className="text-sm font-medium text-zinc-200">{item.name}</p>
                <p className="text-xs text-zinc-500">{item.event}</p>
              </div>
              <span className="text-sm font-semibold text-zinc-300">{item.price.toLocaleString("vi-VN")}đ</span>
            </div>
          ))}
        </div>
      </div>

      {/* Event info */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 space-y-2">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-300">
          <Package className="h-4 w-4 text-blue-400" /> Thông tin sự kiện
        </h3>
        <div className="space-y-1.5 text-sm text-zinc-400">
          <p className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5 text-zinc-500" />{order.eventDate}</p>
          <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-zinc-500" />{order.venue}</p>
        </div>
      </div>

      {/* Payment summary */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 space-y-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-300">
          <CreditCard className="h-4 w-4 text-purple-400" /> Thanh toán
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-zinc-400">Tạm tính</span><span className="text-zinc-200">{order.subtotal.toLocaleString("vi-VN")}đ</span></div>
          {order.discount > 0 && <div className="flex justify-between"><span className="text-green-400">Giảm giá</span><span className="text-green-400">-{order.discount.toLocaleString("vi-VN")}đ</span></div>}
          <hr className="border-zinc-800" />
          <div className="flex justify-between font-bold"><span className="text-zinc-100">Tổng cộng</span><span className="text-green-400">{order.total.toLocaleString("vi-VN")}đ</span></div>
          <div className="flex justify-between text-xs text-zinc-500"><span>Phương thức</span><span>{order.paymentMethod}</span></div>
        </div>
      </div>
    </div>
  );
}
