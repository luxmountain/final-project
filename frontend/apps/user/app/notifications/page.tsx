import { Bell, Ticket, CreditCard, Megaphone, Check } from "lucide-react";

const mockNotifications = [
  { id: "1", type: "ticket", title: "Vé đã sẵn sàng", message: "Vé VIP Sky Tour 2026 đã được thêm vào ví vé của bạn.", time: "2 giờ trước", read: false },
  { id: "2", type: "payment", title: "Thanh toán thành công", message: "Đơn hàng ORD-2026-001 đã thanh toán thành công. Tổng: 6.000.000đ", time: "2 giờ trước", read: false },
  { id: "3", type: "promo", title: "Ưu đãi đặc biệt", message: "Giảm 15% cho sự kiện Festival Hội An. Mã: HOIAN15", time: "1 ngày trước", read: true },
  { id: "4", type: "ticket", title: "Sự kiện sắp diễn ra", message: "Sky Tour 2026 sẽ diễn ra trong 14 ngày nữa. Đừng quên!", time: "2 ngày trước", read: true },
  { id: "5", type: "payment", title: "Hoàn tiền thành công", message: "Đơn hàng ORD-2026-004 đã được hoàn tiền 2.400.000đ", time: "5 ngày trước", read: true },
];

const typeConfig: Record<string, { icon: typeof Bell; color: string }> = {
  ticket: { icon: Ticket, color: "text-green-400 bg-green-500/20" },
  payment: { icon: CreditCard, color: "text-blue-400 bg-blue-500/20" },
  promo: { icon: Megaphone, color: "text-amber-400 bg-amber-500/20" },
};

export default function NotificationsPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600">
            <Bell className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-zinc-100">Thông báo</h1>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg bg-zinc-800 px-3 py-2 text-xs font-medium text-zinc-400 ring-1 ring-zinc-700 hover:text-zinc-200">
          <Check className="h-3.5 w-3.5" /> Đọc tất cả
        </button>
      </div>

      <div className="space-y-2">
        {mockNotifications.map((notif) => {
          const config = typeConfig[notif.type]!;
          const Icon = config.icon;
          return (
            <div key={notif.id} className={`flex gap-3 rounded-xl border p-4 transition hover:bg-zinc-800/80 ${notif.read ? "border-zinc-800 bg-zinc-900/50 opacity-70" : "border-zinc-700 bg-zinc-900"}`}>
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${config.color}`}>
                <Icon className="h-4 w-4" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-zinc-200">{notif.title}</p>
                  {!notif.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-400" />}
                </div>
                <p className="mt-0.5 text-xs text-zinc-400 line-clamp-2">{notif.message}</p>
                <p className="mt-1.5 text-xs text-zinc-600">{notif.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
