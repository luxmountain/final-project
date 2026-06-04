import { CalendarCheck, Calendar, MapPin, Building2, Clock, CheckCircle, XCircle } from "lucide-react";

const mockEvents = [
  { id: "1", title: "Liveshow Mỹ Tâm: Tri Âm", organizer: "Công ty CP Âm nhạc Việt", date: "10/07/2026", venue: "Nhà hát Hòa Bình, HCM", category: "Ca nhạc", totalSeats: 2000, status: "pending" },
  { id: "2", title: "Tech Conference Vietnam 2026", organizer: "EventPro Vietnam JSC", date: "15/08/2026", venue: "GEM Center, HCM", category: "Hội nghị", totalSeats: 500, status: "pending" },
  { id: "3", title: "Festival Bia Craft Hà Nội", organizer: "Công ty TNHH Giải trí StarLight", date: "01/09/2026", venue: "Công viên Thống Nhất", category: "Festival", totalSeats: 5000, status: "pending" },
  { id: "4", title: "Stand-up Comedy Night", organizer: "Công ty CP Âm nhạc Việt", date: "20/06/2026", venue: "Nhà hát Tuổi Trẻ", category: "Hài kịch", totalSeats: 300, status: "approved" },
];

const statusMap: Record<string, { label: string; color: string }> = {
  pending: { label: "Chờ duyệt", color: "bg-yellow-500/20 text-yellow-400" },
  approved: { label: "Đã duyệt", color: "bg-green-500/20 text-green-400" },
  rejected: { label: "Từ chối", color: "bg-red-500/20 text-red-400" },
};

export default function AdminEventsPage() {
  return (
    <div className="min-h-screen p-6 space-y-6">
      <div className="flex items-center gap-3">
        <CalendarCheck className="h-6 w-6 text-purple-400" />
        <h1 className="text-xl font-bold">Phê duyệt Sự kiện</h1>
      </div>

      <div className="space-y-3">
        {mockEvents.map((event) => {
          const st = statusMap[event.status]!;
          return (
            <div key={event.id} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-zinc-100">{event.title}</h3>
                  <p className="mt-0.5 text-xs text-zinc-500">{event.category} • {event.totalSeats} ghế</p>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${st.color}`}>{st.label}</span>
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-zinc-400">
                <span className="flex items-center gap-1"><Building2 className="h-3 w-3" />{event.organizer}</span>
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{event.date}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{event.venue}</span>
              </div>
              {event.status === "pending" && (
                <div className="flex gap-2 pt-1">
                  <button className="rounded-lg bg-green-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-green-500">Phê duyệt</button>
                  <button className="rounded-lg border border-yellow-600 px-4 py-1.5 text-xs font-medium text-yellow-400 hover:bg-yellow-600/10">Yêu cầu bổ sung</button>
                  <button className="rounded-lg bg-red-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-red-500">Từ chối</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
