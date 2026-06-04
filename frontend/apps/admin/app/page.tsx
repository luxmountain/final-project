import Link from "next/link";
import { LayoutDashboard, UserCheck, CalendarCheck, Users, DollarSign, AlertTriangle, Activity, TrendingUp, Ticket, ShieldCheck } from "lucide-react";

const kpis = [
  { label: "Tổng doanh thu", value: "2.5 tỷ", change: "+15%", icon: DollarSign, color: "text-green-400" },
  { label: "Giao dịch", value: "15,230", change: "+22%", icon: TrendingUp, color: "text-blue-400" },
  { label: "Sự kiện active", value: "45", change: "+5", icon: Ticket, color: "text-purple-400" },
  { label: "Tổng user", value: "8,500", change: "+12%", icon: Users, color: "text-amber-400" },
];

const alerts = [
  { type: "warning", text: "3 Organizer chờ duyệt", href: "/organizers" },
  { type: "warning", text: "5 Sự kiện chờ duyệt", href: "/events" },
  { type: "warning", text: "2 Yêu cầu refund", href: "/refunds" },
];

const services = [
  { name: "API Gateway", status: "online", latency: "45ms" },
  { name: "Booking Service", status: "online", latency: "120ms" },
  { name: "Payment Service", status: "online", latency: "89ms" },
  { name: "Kafka", status: "online", latency: "lag: 0" },
];

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/", active: true },
  { icon: UserCheck, label: "Duyệt Organizer", href: "/organizers", active: false },
  { icon: CalendarCheck, label: "Duyệt Sự kiện", href: "/events", active: false },
  { icon: Users, label: "Quản lý User", href: "/users", active: false },
  { icon: DollarSign, label: "Quản lý Refund", href: "/refunds", active: false },
];

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-56 border-r border-zinc-800 bg-zinc-900 p-4 lg:block">
        <h2 className="mb-6 text-lg font-bold text-red-400">VENTIX Admin</h2>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${item.active ? "bg-red-600/20 text-red-400" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"}`}>
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 space-y-6">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>

        {/* KPIs */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">{kpi.label}</span>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </div>
              <p className="mt-2 text-2xl font-bold">{kpi.value}</p>
              <span className="text-xs text-green-400">{kpi.change}</span>
            </div>
          ))}
        </div>

        {/* Alerts */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-300">
            <AlertTriangle className="h-4 w-4 text-amber-400" /> Cần xử lý
          </h3>
          <div className="space-y-2">
            {alerts.map((a) => (
              <Link key={a.text} href={a.href} className="flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-2 text-sm text-amber-300 hover:bg-amber-500/20">
                <AlertTriangle className="h-3.5 w-3.5" /> {a.text}
              </Link>
            ))}
          </div>
        </div>

        {/* Health */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-300">
            <Activity className="h-4 w-4 text-green-400" /> System Health
          </h3>
          <div className="space-y-2">
            {services.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-sm">
                <span className="text-zinc-300">{s.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-500">{s.latency}</span>
                  <span className="flex items-center gap-1 text-xs text-green-400">
                    <span className="h-2 w-2 rounded-full bg-green-400" /> Online
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
