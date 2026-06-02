"use client";
import { CreditCard, Plus, Trash2, Wallet } from "lucide-react";

const mockMethods = [
  { id: "1", type: "bank", name: "Vietcombank", detail: "****6789", isDefault: true },
  { id: "2", type: "ewallet", name: "MoMo", detail: "0912***678", isDefault: false },
  { id: "3", type: "bank", name: "Techcombank", detail: "****1234", isDefault: false },
];

const typeIcon: Record<string, string> = { bank: "🏦", ewallet: "📱" };

export default function PaymentMethodsPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-violet-600">
            <CreditCard className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-zinc-100">Phương thức thanh toán</h1>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-500">
          <Plus className="h-4 w-4" /> Thêm
        </button>
      </div>

      <div className="space-y-3">
        {mockMethods.map((method) => (
          <div key={method.id} className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition hover:border-zinc-700">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-lg ring-1 ring-zinc-700">
                {typeIcon[method.type]}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-zinc-200">{method.name}</p>
                  {method.isDefault && (
                    <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400 ring-1 ring-green-500/30">Mặc định</span>
                  )}
                </div>
                <p className="text-xs text-zinc-500">{method.detail}</p>
              </div>
            </div>
            <button className="rounded-lg p-2 text-zinc-500 transition hover:bg-red-500/10 hover:text-red-400">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-800/50 p-4">
        <Wallet className="mt-0.5 h-5 w-5 text-zinc-500" />
        <div className="text-xs text-zinc-400">
          <p className="font-medium text-zinc-300">Thanh toán an toàn</p>
          <p className="mt-1">Thông tin thanh toán được mã hóa và bảo mật theo tiêu chuẩn PCI DSS. Chúng tôi không lưu trữ thông tin thẻ của bạn.</p>
        </div>
      </div>
    </div>
  );
}
