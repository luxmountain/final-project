import Link from "next/link";
import { Ticket, Calendar, MapPin } from "lucide-react";
import type { Ticket as TicketType } from "@repo/types";

const mockTickets: TicketType[] = [
  { id: "TKT-2026-001", eventId: "1", eventTitle: "Đêm nhạc Sơn Tùng M-TP: Sky Tour 2026", eventDate: "2026-06-15T19:00:00", venue: "Sân vận động Mỹ Đình", zone: "VIP", row: "A", seatNumber: 5, ticketClass: "VIP", status: "active" },
  { id: "TKT-2026-002", eventId: "1", eventTitle: "Đêm nhạc Sơn Tùng M-TP: Sky Tour 2026", eventDate: "2026-06-15T19:00:00", venue: "Sân vận động Mỹ Đình", zone: "VIP", row: "A", seatNumber: 6, ticketClass: "VIP", status: "active" },
  { id: "TKT-2026-003", eventId: "3", eventTitle: "Stand-up Comedy: Trấn Thành Live", eventDate: "2026-05-30T20:00:00", venue: "Nhà hát Bến Thành", zone: "Standard", row: "C", seatNumber: 10, ticketClass: "Standard", status: "used" },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  active: { label: "Sắp diễn ra", color: "bg-green-100 text-green-700" },
  used: { label: "Đã sử dụng", color: "bg-gray-100 text-gray-600" },
  refunded: { label: "Đã hoàn tiền", color: "bg-red-100 text-red-600" },
  frozen: { label: "Đang bán lại", color: "bg-yellow-100 text-yellow-700" },
};

export default function TicketsPage() {
  const upcoming = mockTickets.filter((t) => t.status === "active");
  const past = mockTickets.filter((t) => t.status !== "active");

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2"><Ticket className="h-5 w-5 text-blue-600" /> Ví vé của tôi</h1>

      {/* Upcoming */}
      <section>
        <h3 className="mb-2 text-sm font-semibold text-gray-500">Sắp diễn ra ({upcoming.length})</h3>
        <div className="space-y-3">
          {upcoming.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </section>

      {/* Past */}
      {past.length > 0 && (
        <section>
          <h3 className="mb-2 text-sm font-semibold text-gray-500">Đã qua ({past.length})</h3>
          <div className="space-y-3">
            {past.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function TicketCard({ ticket }: { ticket: TicketType }) {
  const config = statusConfig[ticket.status]!;
  return (
    <Link href={`/tickets/${ticket.id}`} className="block rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="font-semibold text-sm">{ticket.eventTitle}</p>
          <div className="mt-1.5 space-y-1 text-xs text-gray-500">
            <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{new Date(ticket.eventDate).toLocaleDateString("vi-VN")}</div>
            <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{ticket.venue}</div>
            <div className="flex items-center gap-1.5"><Ticket className="h-3.5 w-3.5" />{ticket.ticketClass} - {ticket.row}{ticket.seatNumber}</div>
          </div>
        </div>
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${config.color}`}>{config.label}</span>
      </div>
    </Link>
  );
}
