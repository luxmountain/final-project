import Link from "next/link";
import { Plus, Search, Calendar, MapPin, MoreVertical } from "lucide-react";

const mockEvents = [
  { id: "1", title: "Đêm nhạc Sơn Tùng M-TP: Sky Tour 2026", date: "15/06/2026", venue: "Sân vận động Mỹ Đình", status: "approved", soldPercent: 80 },
  { id: "2", title: "Festival Âm nhạc Quốc tế Hội An 2026", date: "20/07/2026", venue: "Phố cổ Hội An", status: "pending", soldPercent: 45 },
  { id: "3", title: "Stand-up Comedy: Trấn Thành Live", date: "30/06/2026", venue: "Nhà hát Bến Thành", status: "approved", soldPercent: 62 },
  { id: "4", title: "EDM Party: Alan Walker Vietnam Tour", date: "10/08/2026", venue: "Trung tâm Hội nghị Quốc gia", status: "draft", soldPercent: 0 },
];

const statusMap: Record<string, { label: string; color: string }> = {
  approved: { label: "Đã duyệt", color: "bg-green-500/20 text-green-400" },
  pending: { label: "Chờ duyệt", color: "bg-yellow-500/20 text-yellow-400" },
  draft: { label: "Nháp", color: "bg-zinc-500/20 text-zinc-400" },
  rejected: { label: "Từ chối", color: "bg-red-500/20 text-red-400" },
};

export default function OrganizerEventsPage() {
  return (
    <div className="min-h-screen p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Quản lý sự kiện</h1>
        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
          <Plus className="h-4 w-4" /> Tạo sự kiện
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <input placeholder="Tìm sự kiện..." className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
      </div>

      <div className="space-y-3">
        {mockEvents.map((event) => {
          const st = statusMap[event.status]!;
          return (
            <div key={event.id} className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-zinc-100">{event.title}</p>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${st.color}`}>{st.label}</span>
                </div>
                <div className="flex gap-4 text-xs text-zinc-400">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{event.date}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{event.venue}</span>
                </div>
                {event.soldPercent > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-32 overflow-hidden rounded-full bg-zinc-700">
                      <div className="h-full rounded-full bg-blue-500" style={{ width: `${event.soldPercent}%` }} />
                    </div>
                    <span className="text-xs text-zinc-500">{event.soldPercent}% vé đã bán</span>
                  </div>
                )}
              </div>
              <button className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
