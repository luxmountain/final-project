import { Download, DollarSign, Ticket, Users, TrendingUp } from "lucide-react";

const summaryData = [
  { label: "Tổng doanh thu", value: "450.000.000đ", icon: DollarSign, color: "text-green-400" },
  { label: "Tổng vé bán", value: "3,250", icon: Ticket, color: "text-blue-400" },
  { label: "Tổng check-in", value: "2,890 (89%)", icon: Users, color: "text-purple-400" },
  { label: "Tăng trưởng", value: "+15%", icon: TrendingUp, color: "text-amber-400" },
];

const monthlyRevenue = [
  { month: "01", value: 35 }, { month: "02", value: 42 }, { month: "03", value: 55 },
  { month: "04", value: 48 }, { month: "05", value: 72 }, { month: "06", value: 90 },
];

const eventBreakdown = [
  { name: "Sky Tour 2026", revenue: "250.000.000đ", tickets: 1250, checkin: "71%" },
  { name: "Festival Hội An", revenue: "120.000.000đ", tickets: 1200, checkin: "95%" },
  { name: "Comedy Night", revenue: "80.000.000đ", revenue2: "80M", tickets: 800, checkin: "88%" },
];

export default function OrganizerReportsPage() {
  const maxRev = Math.max(...monthlyRevenue.map((d) => d.value));

  return (
    <div className="min-h-screen p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Báo cáo & Thống kê</h1>
        <button className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-700">
          <Download className="h-4 w-4" /> Xuất báo cáo
        </button>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {summaryData.map((item) => (
          <div key={item.label} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-500">{item.label}</span>
              <item.icon className={`h-4 w-4 ${item.color}`} />
            </div>
            <p className="mt-2 text-xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <h3 className="mb-4 text-sm font-semibold text-zinc-300">Doanh thu theo tháng (triệu VNĐ)</h3>
        <div className="flex items-end gap-4 h-40">
          {monthlyRevenue.map((d) => (
            <div key={d.month} className="flex flex-1 flex-col items-center gap-1">
              <span className="text-xs text-zinc-400">{d.value}M</span>
              <div className="w-full rounded-t bg-blue-500/80" style={{ height: `${(d.value / maxRev) * 100}%` }} />
              <span className="text-xs text-zinc-500">T{d.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Breakdown */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <h3 className="mb-4 text-sm font-semibold text-zinc-300">Chi tiết theo sự kiện</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 text-xs text-zinc-500">
              <th className="pb-2 text-left">Sự kiện</th>
              <th className="pb-2 text-right">Doanh thu</th>
              <th className="pb-2 text-right">Vé bán</th>
              <th className="pb-2 text-right">Check-in</th>
            </tr>
          </thead>
          <tbody>
            {eventBreakdown.map((e) => (
              <tr key={e.name} className="border-b border-zinc-800/50">
                <td className="py-3 text-zinc-200">{e.name}</td>
                <td className="py-3 text-right text-zinc-300">{e.revenue}</td>
                <td className="py-3 text-right text-zinc-400">{e.tickets}</td>
                <td className="py-3 text-right text-zinc-400">{e.checkin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
