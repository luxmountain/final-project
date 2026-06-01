import Link from "next/link";
import { Ticket, Calendar, MapPin, QrCode } from "lucide-react";
import type { Ticket as TicketType } from "@repo/types";

const mockTickets: TicketType[] = [
  { id: "TKT-2026-001", eventId: "1", eventTitle: "Đêm nhạc Sơn Tùng M-TP: Sky Tour 2026", eventDate: "2026-06-15T19:00:00", venue: "Sân vận động Mỹ Đình", zone: "VIP", row: "A", seatNumber: 5, ticketClass: "VIP", status: "active" },
  { id: "TKT-2026-002", eventId: "1", eventTitle: "Đêm nhạc Sơn Tùng M-TP: Sky Tour 2026", eventDate: "2026-06-15T19:00:00", venue: "Sân vận động Mỹ Đình", zone: "VIP", row: "A", seatNumber: 6, ticketClass: "VIP", status: "active" },
  { id: "TKT-2026-003", eventId: "3", eventTitle: "Stand-up Comedy: Trấn Thành Live", eventDate: "2026-05-30T20:00:00", venue: "Nhà hát Bến Thành", zone: "Standard", row: "C", seatNumber: 10, ticketClass: "Standard", status: "used" },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  active: { label: "Sắp diễn ra", color: "bg-green-500/20 text-green-400 ring-1 ring-green-500/30" },
  used: { label: "Đã sử dụng", color: "bg-zinc-500/20 text-zinc-400 ring-1 ring-zinc-500/30" },
  refunded: { label: "Đã hoàn tiền", color: "bg-red-500/20 text-red-400 ring-1 ring-red-500/30" },
  frozen: { label: "Đang bán lại", color: "bg-yellow-500/20 text-yellow-400 ring-1 ring-yellow-500/30" },
};

export default function TicketsPage() {
  const upcoming = mockTickets.filter((t) => t.status === "active");
  const past = mockTickets.filter((t) => t.status !== "active");

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600">
          <Ticket className="h-5 w-5 text-white" />
        </div>
        <h1 className="text-xl font-bold text-zinc-100">Vé của tôi</h1>
      </div>

      {upcoming.length > 0 && (
        <section>
          <h3 className="mb-3 text-sm font-semibold text-green-400">Sắp diễn ra ({upcoming.length})</h3>
          <div className="space-y-3">
            {upcoming.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section>
          <h3 className="mb-3 text-sm font-semibold text-zinc-500">Đã qua ({past.length})</h3>
          <div className="space-y-3">
            {past.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} opacity />
            ))}
          </div>
        </section>
      )}

      {mockTickets.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <Ticket className="h-12 w-12 text-zinc-600" />
          <p className="text-zinc-400">Bạn chưa có vé nào</p>
          <Link href="/events" className="rounded-full bg-green-600 px-5 py-2 text-sm font-medium text-white hover:bg-green-500">
            Khám phá sự kiện
          </Link>
        </div>
      )}
    </div>
  );
}

function TicketCard({ ticket, opacity }: { ticket: TicketType; opacity?: boolean }) {
  const config = statusConfig[ticket.status]!;
  return (
    <Link
      href={`/tickets/${ticket.id}`}
      className={`group relative block overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition hover:border-zinc-700 hover:bg-zinc-800/80 ${opacity ? "opacity-60" : ""}`}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green-500 to-emerald-400" />
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <p className="font-semibold text-zinc-100 group-hover:text-green-400 transition-colors">{ticket.eventTitle}</p>
          <div className="space-y-1 text-xs text-zinc-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-zinc-500" />
              {new Date(ticket.eventDate).toLocaleDateString("vi-VN", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" })}
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-zinc-500" />
              {ticket.venue}
            </div>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <span className="rounded bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-300 ring-1 ring-zinc-700">
              {ticket.ticketClass}
            </span>
            <span className="text-xs text-zinc-500">
              {ticket.row}{ticket.seatNumber}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${config.color}`}>{config.label}</span>
          <QrCode className="h-8 w-8 text-zinc-600" />
        </div>
      </div>
    </Link>
  );
}
