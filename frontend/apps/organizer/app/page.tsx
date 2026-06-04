import Link from "next/link";
import { LayoutDashboard, Calendar, ShoppingBag, BarChart3, TrendingUp, Ticket, Users, DollarSign } from "lucide-react";

const kpis = [
  { label: "Doanh thu", value: "150.5M", change: "+12%", icon: DollarSign, color: "text-green-400" },
  { label: "Vé đã bán", value: "1,250", change: "+8%", icon: Ticket, color: "text-blue-400" },
  { label: "Check-in", value: "890 (71%)", change: "", icon: Users, color: "text-purple-400" },
  { label: "Merch bán", value: "45", change: "+5%", icon: ShoppingBag, color: "text-amber-400" },
];

const revenueData = [
  { day: "T2", value: 18 },
  { day: "T3", value: 25 },
  { day: "T4", value: 22 },
  { day: "T5", value: 30 },
  { day: "T6", value: 28 },
  { day: "T7", value: 45 },
  { day: "CN", value: 38 },
];

const events = [
  { id: "1", name: "Sky Tour 2026", date: "15/06/2026", sold: "80%", status: "Đã duyệt" },
  { id: "2", name: "Festival Hội An", date: "20/07/2026", sold: "45%", status: "Chờ duyệt" },
  { id: "3", name: "Comedy Night", date: "30/06/2026", sold: "62%", status: "Đã duyệt" },
];

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/", active: true },
  { icon: Calendar, label: "Sự kiện", href: "/events", active: false },
  { icon: ShoppingBag, label: "Merchandise", href: "/merchandise", active: false },
  { icon: BarChart3, label: "Báo cáo", href: "/reports", active: false },
];

export default function OrganizerDashboard() {
  const maxRevenue = Math.max(...revenueData.map((d) => d.value));

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-56 border-r border-zinc-800 bg-zinc-900 p-4 lg:block">
        <h2 className="mb-6 text-lg font-bold text-blue-400">VENTIX</h2>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${item.active ? "bg-blue-600/20 text-blue-400" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"}`}>
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 space-y-6">
        <h1 className="text-xl font-bold">Dashboard Organizer</h1>

        {/* KPIs */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">{kpi.label}</span>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </div>
              <p className="mt-2 text-2xl font-bold">{kpi.value}</p>
              {kpi.change && <span className="text-xs text-green-400">{kpi.change}</span>}
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h3 className="mb-4 text-sm font-semibold text-zinc-300">Doanh thu 7 ngày (triệu VNĐ)</h3>
          <div className="flex items-end gap-3 h-40">
            {revenueData.map((d) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
                <div className="w-full rounded-t bg-blue-500/80" style={{ height: `${(d.value / maxRevenue) * 100}%` }} />
                <span className="text-xs text-zinc-500">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Events table */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h3 className="mb-4 text-sm font-semibold text-zinc-300">Sự kiện sắp diễn ra</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-xs text-zinc-500">
                <th className="pb-2 text-left">Tên sự kiện</th>
                <th className="pb-2 text-left">Ngày</th>
                <th className="pb-2 text-left">Vé bán</th>
                <th className="pb-2 text-left">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.id} className="border-b border-zinc-800/50">
                  <td className="py-3 text-zinc-200">{e.name}</td>
                  <td className="py-3 text-zinc-400">{e.date}</td>
                  <td className="py-3 text-zinc-400">{e.sold}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${e.status === "Đã duyệt" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                      {e.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
