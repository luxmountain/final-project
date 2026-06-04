import { Users, Search, Shield, Ban, MoreVertical } from "lucide-react";

const mockUsers = [
  { id: "1", name: "Nguyễn Văn A", email: "nguyenvana@gmail.com", role: "user", status: "active", joined: "01/01/2026", orders: 5 },
  { id: "2", name: "Trần Thị B", email: "tranthib@gmail.com", role: "user", status: "active", joined: "15/02/2026", orders: 3 },
  { id: "3", name: "Lê Văn C", email: "levanc@gmail.com", role: "user", status: "banned", joined: "20/03/2026", orders: 0 },
  { id: "4", name: "Nguyễn Minh Tuấn", email: "tuan@starlight.vn", role: "organizer", status: "active", joined: "10/01/2026", orders: 0 },
  { id: "5", name: "Admin Sys", email: "admin@ventix.vn", role: "admin", status: "active", joined: "01/01/2025", orders: 0 },
];

const roleMap: Record<string, { label: string; color: string }> = {
  user: { label: "User", color: "bg-blue-500/20 text-blue-400" },
  organizer: { label: "Organizer", color: "bg-purple-500/20 text-purple-400" },
  admin: { label: "Admin", color: "bg-red-500/20 text-red-400" },
  staff: { label: "Staff", color: "bg-amber-500/20 text-amber-400" },
};

export default function AdminUsersPage() {
  return (
    <div className="min-h-screen p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Users className="h-6 w-6 text-blue-400" />
        <h1 className="text-xl font-bold">Quản lý User</h1>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <input placeholder="Tìm theo tên, email..." className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 text-xs text-zinc-500">
              <th className="px-4 py-3 text-left">Người dùng</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Trạng thái</th>
              <th className="px-4 py-3 text-left">Ngày tham gia</th>
              <th className="px-4 py-3 text-right">Đơn hàng</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((u) => {
              const role = roleMap[u.role]!;
              return (
                <tr key={u.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                  <td className="px-4 py-3">
                    <p className="font-medium text-zinc-200">{u.name}</p>
                    <p className="text-xs text-zinc-500">{u.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${role.color}`}>{role.label}</span>
                  </td>
                  <td className="px-4 py-3">
                    {u.status === "active" ? (
                      <span className="flex items-center gap-1 text-xs text-green-400"><Shield className="h-3 w-3" />Active</span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-red-400"><Ban className="h-3 w-3" />Banned</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-zinc-400">{u.joined}</td>
                  <td className="px-4 py-3 text-right text-zinc-400">{u.orders}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="rounded p-1 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"><MoreVertical className="h-4 w-4" /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
