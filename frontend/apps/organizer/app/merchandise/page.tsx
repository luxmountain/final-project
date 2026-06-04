import { Plus, Package, Search } from "lucide-react";

const mockProducts = [
  { id: "1", name: "Áo thun Sky Tour 2026", event: "Sky Tour 2026", price: 350000, stock: 120, sold: 80 },
  { id: "2", name: "Lightstick Official", event: "Sky Tour 2026", price: 500000, stock: 50, sold: 200 },
  { id: "3", name: "Poster Limited Edition", event: "Sky Tour 2026", price: 150000, stock: 30, sold: 170 },
  { id: "4", name: "Combo Fan Pack", event: "Festival Hội An", price: 250000, stock: 200, sold: 45 },
];

export default function OrganizerMerchandisePage() {
  return (
    <div className="min-h-screen p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Quản lý Merchandise</h1>
        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
          <Plus className="h-4 w-4" /> Thêm sản phẩm
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <input placeholder="Tìm sản phẩm..." className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 text-xs text-zinc-500">
              <th className="px-4 py-3 text-left">Sản phẩm</th>
              <th className="px-4 py-3 text-left">Sự kiện</th>
              <th className="px-4 py-3 text-right">Giá</th>
              <th className="px-4 py-3 text-right">Tồn kho</th>
              <th className="px-4 py-3 text-right">Đã bán</th>
            </tr>
          </thead>
          <tbody>
            {mockProducts.map((p) => (
              <tr key={p.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                <td className="px-4 py-3 font-medium text-zinc-200 flex items-center gap-2">
                  <Package className="h-4 w-4 text-zinc-500" />{p.name}
                </td>
                <td className="px-4 py-3 text-zinc-400">{p.event}</td>
                <td className="px-4 py-3 text-right text-zinc-300">{p.price.toLocaleString("vi-VN")}đ</td>
                <td className="px-4 py-3 text-right">
                  <span className={p.stock < 50 ? "text-amber-400" : "text-zinc-400"}>{p.stock}</span>
                </td>
                <td className="px-4 py-3 text-right text-zinc-400">{p.sold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
