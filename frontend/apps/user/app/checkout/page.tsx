import Link from "next/link";
import { CheckCircle, Ticket, Calendar, MapPin, Download, ArrowRight } from "lucide-react";

export default function CheckoutPage() {
  const order = {
    id: "ORD-2026-001",
    date: "01/06/2026 10:30",
    items: [
      { name: "VIP - Hàng A - Ghế 5", event: "Sky Tour 2026", price: 3000000 },
      { name: "VIP - Hàng A - Ghế 6", event: "Sky Tour 2026", price: 3000000 },
    ],
    total: 6000000,
    paymentMethod: "Vietcombank ****6789",
  };

  return (
    <div className="mx-auto max-w-lg space-y-6 p-4 py-8">
      {/* Success icon */}
      <div className="text-center space-y-3">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 ring-4 ring-green-500/10">
          <CheckCircle className="h-10 w-10 text-green-400" />
        </div>
        <h1 className="text-xl font-bold text-zinc-100">Đặt hàng thành công!</h1>
        <p className="text-sm text-zinc-400">Mã đơn hàng: <span className="font-mono font-medium text-zinc-200">{order.id}</span></p>
      </div>

      {/* Order details */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 space-y-4">
        <h3 className="text-sm font-semibold text-zinc-300">Chi tiết đơn hàng</h3>
        <div className="space-y-3">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Ticket className="h-4 w-4 text-green-400" />
                <div>
                  <p className="text-sm text-zinc-200">{item.name}</p>
                  <p className="text-xs text-zinc-500">{item.event}</p>
                </div>
              </div>
              <span className="text-sm font-medium text-zinc-300">{item.price.toLocaleString("vi-VN")}đ</span>
            </div>
          ))}
        </div>
        <hr className="border-zinc-800" />
        <div className="flex justify-between">
          <span className="text-sm text-zinc-400">Tổng cộng</span>
          <span className="text-base font-bold text-green-400">{order.total.toLocaleString("vi-VN")}đ</span>
        </div>
        <div className="flex justify-between text-xs text-zinc-500">
          <span>Thanh toán qua</span>
          <span>{order.paymentMethod}</span>
        </div>
      </div>

      {/* Event info */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-zinc-300">
          <Calendar className="h-4 w-4 text-zinc-500" /> 15/06/2026 - 19:00
        </div>
        <div className="flex items-center gap-2 text-sm text-zinc-300">
          <MapPin className="h-4 w-4 text-zinc-500" /> Sân vận động Mỹ Đình, Hà Nội
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Link href="/tickets" className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/30 hover:from-green-500 hover:to-emerald-400">
          <Ticket className="h-4 w-4" /> Xem vé của tôi
        </Link>
        <Link href="/" className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 py-3 text-sm font-medium text-zinc-300 hover:bg-zinc-700">
          Tiếp tục khám phá <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
