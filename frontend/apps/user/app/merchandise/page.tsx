import Image from "next/image";
import { Store, ShoppingCart } from "lucide-react";
import { mockMerchandise } from "../lib/mock-data";

export default function MerchandisePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-600">
          <Store className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-zinc-100">Merchandise</h1>
          <p className="text-xs text-zinc-500">Vật phẩm chính hãng từ sự kiện</p>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
        {mockMerchandise.map((item) => (
          <div key={item.id} className="group overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition hover:border-zinc-700">
            <div className="relative aspect-square overflow-hidden bg-zinc-800">
              <Image src={item.imageUrl} alt={item.name} fill className="object-cover transition group-hover:scale-105" />
            </div>
            <div className="p-3 space-y-2">
              <p className="text-sm font-semibold text-zinc-200 line-clamp-1">{item.name}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-green-400">{item.price.toLocaleString("vi-VN")}đ</span>
                <span className="text-xs text-zinc-500">Còn {item.stock}</span>
              </div>
              <button className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-green-600 py-2 text-xs font-medium text-white transition hover:bg-green-500">
                <ShoppingCart className="h-3.5 w-3.5" /> Thêm vào giỏ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
