import { DollarSign, Clock, CheckCircle, XCircle, User, Ticket } from "lucide-react";

const mockRefunds = [
  { id: "RF-001", user: "Nguyễn Văn A", email: "nguyenvana@gmail.com", ticket: "VIP - Sky Tour 2026", amount: 3000000, reason: "Không thể tham dự do lý do cá nhân", date: "02/06/2026", status: "pending" },
  { id: "RF-002", user: "Trần Thị B", email: "tranthib@gmail.com", ticket: "Standard - Comedy Night", amount: 800000, reason: "Sự kiện bị dời lịch", date: "01/06/2026", status: "pending" },
  { id: "RF-003", user: "Phạm D", email: "phamd@gmail.com", ticket: "GA - Alan Walker Tour", amount: 1200000, reason: "Mua nhầm vé", date: "28/05/2026", status: "approved" },
  { id: "RF-004", user: "Hoàng E", email: "hoange@gmail.com", ticket: "VIP - Festival Hội An", amount: 2500000, reason: "Sức khỏe không cho phép", date: "25/05/2026", status: "rejected" },
];

const statusMap: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: "Chờ xử lý", color: "bg-yellow-500/20 text-yellow-400", icon: Clock },
  approved: { label: "Đã hoàn", color: "bg-green-500/20 text-green-400", icon: CheckCircle },
  rejected: { label: "Từ chối", color: "bg-red-500/20 text-red-400", icon: XCircle },
};

export default function AdminRefundsPage() {
  return (
    <div className="min-h-screen p-6 space-y-6">
      <div className="flex items-center gap-3">
        <DollarSign className="h-6 w-6 text-green-400" />
        <h1 className="text-xl font-bold">Quản lý Refund</h1>
      </div>

      <div className="space-y-3">
        {mockRefunds.map((rf) => {
          const st = statusMap[rf.status]!;
          const Icon = st.icon;
          return (
            <div key={rf.id} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-zinc-500">{rf.id}</span>
                    <span className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${st.color}`}>
                      <Icon className="h-3 w-3" /> {st.label}
                    </span>
                  </div>
                  <p className="mt-1 text-lg font-bold text-green-400">{rf.amount.toLocaleString("vi-VN")}đ</p>
                </div>
                <span className="text-xs text-zinc-500">{rf.date}</span>
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-zinc-400">
                <span className="flex items-center gap-1"><User className="h-3 w-3" />{rf.user} ({rf.email})</span>
                <span className="flex items-center gap-1"><Ticket className="h-3 w-3" />{rf.ticket}</span>
              </div>
              <p className="text-sm text-zinc-300">Lý do: {rf.reason}</p>
              {rf.status === "pending" && (
                <div className="flex gap-2 pt-1">
                  <button className="rounded-lg bg-green-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-green-500">Chấp nhận hoàn tiền</button>
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
