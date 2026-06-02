import Link from "next/link";
import { ShoppingBag, Calendar, ChevronRight } from "lucide-react";

const mockOrders = [
  { id: "ORD-2026-001", date: "2026-06-01T10:30:00", items: "2x VIP - Sky Tour 2026", total: 6000000, status: "completed" },
  { id: "ORD-2026-002", date: "2026-05-20T14:00:00", items: "1x Standard - Trấn Thành Live", total: 800000, status: "completed" },
  { id: "ORD-2026-003", date: "2026-05-28T09:15:00", items: "1x Áo thun Sky Tour + 1x Lightstick", total: 850000, status: "shipping" },
  { id: "ORD-2026-004", date: "2026-05-10T16:45:00", items: "2x GA - Alan Walker Tour", total: 2400000, status: "refunded" },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  completed: { label: "Hoàn thành", color: "bg-green-500/20 text-green-400 ring-1 ring-green-500/30" },
  shipping: { label: "Đang giao", color: "bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/30" },
  pending: { label: "Chờ xử lý", color: "bg-yellow-500/20 text-yellow-400 ring-1 ring-yellow-500/30" },
  refunded: { label: "Đã hoàn tiền", color: "bg-red-500/20 text-red-400 ring-1 ring-red-500/30" },
};

export default function OrdersPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600">
          <ShoppingBag className="h-5 w-5 text-white" />
        </div>
        <h1 className="text-xl font-bold text-zinc-100">Lịch sử mua hàng</h1>
      </div>

      <div className="space-y-3">
        {mockOrders.map((order) => {
          const config = statusConfig[order.status]!;
          return (
            <Link key={order.id} href={`/orders/${order.id}`} className="group block rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition hover:border-zinc-700 hover:bg-zinc-800/80">
              <div className="flex items-start justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-zinc-500">{order.id}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${config.color}`}>{config.label}</span>
                  </div>
                  <p className="text-sm font-medium text-zinc-200">{order.items}</p>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <Calendar className="h-3 w-3" />
                    {new Date(order.date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-green-400">{order.total.toLocaleString("vi-VN")}đ</span>
                  <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-zinc-400" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
