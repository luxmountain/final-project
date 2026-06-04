import { UserCheck, Building2, Phone, Mail, CheckCircle, XCircle, Clock } from "lucide-react";

const mockOrganizers = [
  { id: "1", name: "Công ty TNHH Giải trí StarLight", rep: "Nguyễn Minh Tuấn", email: "contact@starlight.vn", phone: "0901234567", taxId: "0123456789", date: "01/06/2026", status: "pending" },
  { id: "2", name: "EventPro Vietnam JSC", rep: "Trần Thị Hoa", email: "info@eventpro.vn", phone: "0987654321", taxId: "9876543210", date: "29/05/2026", status: "pending" },
  { id: "3", name: "Công ty CP Âm nhạc Việt", rep: "Lê Hoàng Nam", email: "admin@amnhacviet.com", phone: "0912345678", taxId: "1122334455", date: "25/05/2026", status: "approved" },
];

const statusMap: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: "Chờ duyệt", color: "bg-yellow-500/20 text-yellow-400", icon: Clock },
  approved: { label: "Đã duyệt", color: "bg-green-500/20 text-green-400", icon: CheckCircle },
  rejected: { label: "Từ chối", color: "bg-red-500/20 text-red-400", icon: XCircle },
};

export default function AdminOrganizersPage() {
  return (
    <div className="min-h-screen p-6 space-y-6">
      <div className="flex items-center gap-3">
        <UserCheck className="h-6 w-6 text-blue-400" />
        <h1 className="text-xl font-bold">Phê duyệt Organizer</h1>
      </div>

      <div className="space-y-3">
        {mockOrganizers.map((org) => {
          const st = statusMap[org.status]!;
          const Icon = st.icon;
          return (
            <div key={org.id} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-zinc-100">{org.name}</h3>
                  <p className="text-xs text-zinc-500">MST: {org.taxId} • Nộp: {org.date}</p>
                </div>
                <span className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${st.color}`}>
                  <Icon className="h-3 w-3" /> {st.label}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2 text-sm text-zinc-400 sm:grid-cols-3">
                <span className="flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5" />{org.rep}</span>
                <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" />{org.email}</span>
                <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" />{org.phone}</span>
              </div>
              {org.status === "pending" && (
                <div className="flex gap-2 pt-1">
                  <button className="rounded-lg bg-green-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-green-500">Phê duyệt</button>
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
