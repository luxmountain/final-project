import Link from "next/link";
import { RefreshCw, Calendar, MapPin, TrendingUp } from "lucide-react";

const mockResaleTickets = [
  { id: "r1", eventTitle: "Đêm nhạc Sơn Tùng M-TP: Sky Tour 2026", eventDate: "2026-06-15T19:00:00", venue: "Sân vận động Mỹ Đình", ticketClass: "VIP", originalPrice: 3000000, resalePrice: 3500000, seller: "Nguyễn V." },
  { id: "r2", eventTitle: "Festival Âm nhạc Quốc tế Hội An 2026", eventDate: "2026-07-20T17:00:00", venue: "Phố cổ Hội An", ticketClass: "Standard 3 ngày", originalPrice: 2500000, resalePrice: 2200000, seller: "Trần M." },
  { id: "r3", eventTitle: "EDM Party: Alan Walker Vietnam Tour", eventDate: "2026-08-10T21:00:00", venue: "Trung tâm Hội nghị Quốc gia", ticketClass: "VVIP", originalPrice: 5000000, resalePrice: 4800000, seller: "Lê H." },
  { id: "r4", eventTitle: "Liveshow Mỹ Tâm: Tri Âm", eventDate: "2026-07-10T19:30:00", venue: "Nhà hát Hòa Bình", ticketClass: "VIP", originalPrice: 3000000, resalePrice: 3200000, seller: "Phạm A." },
];

export default function ResalePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600">
          <RefreshCw className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-zinc-100">Resale Market</h1>
          <p className="text-xs text-zinc-500">Mua bán vé an toàn, minh bạch</p>
        </div>
      </div>

      {/* Info banner */}
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-300">
        💡 Tất cả vé resale đều được xác thực qua hệ thống. Giá bán lại không vượt quá 120% giá gốc.
      </div>

      {/* Listings */}
      <div className="space-y-3">
        {mockResaleTickets.map((ticket) => {
          const priceDiff = ticket.resalePrice - ticket.originalPrice;
          return (
            <Link key={ticket.id} href={`/resale/${ticket.id}`} className="group block rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition hover:border-zinc-700 hover:bg-zinc-800/80">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-2">
                  <p className="font-semibold text-zinc-100 group-hover:text-green-400 transition-colors">{ticket.eventTitle}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-zinc-400">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(ticket.eventDate).toLocaleDateString("vi-VN")}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{ticket.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-300 ring-1 ring-zinc-700">{ticket.ticketClass}</span>
                    <span className="text-xs text-zinc-500">bởi {ticket.seller}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-400">{ticket.resalePrice.toLocaleString("vi-VN")}đ</p>
                  <p className="text-xs text-zinc-500 line-through">{ticket.originalPrice.toLocaleString("vi-VN")}đ</p>
                  <span className={`mt-1 inline-flex items-center gap-0.5 text-xs font-medium ${priceDiff > 0 ? "text-red-400" : "text-green-400"}`}>
                    <TrendingUp className="h-3 w-3" />{priceDiff > 0 ? "+" : ""}{((priceDiff / ticket.originalPrice) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
