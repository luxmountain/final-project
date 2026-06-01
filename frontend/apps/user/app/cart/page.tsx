"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Clock, Trash2, Tag, Ticket, CreditCard } from "lucide-react";

const mockCartItems = [
  { id: "1", type: "ticket" as const, name: "VIP - Hàng A - Ghế 5", description: "Sky Tour 2026 | 15/06/2026", price: 3000000, quantity: 1 },
  { id: "2", type: "ticket" as const, name: "VIP - Hàng A - Ghế 6", description: "Sky Tour 2026 | 15/06/2026", price: 3000000, quantity: 1 },
];

export default function CartPage() {
  const [items, setItems] = useState(mockCartItems);
  const [voucher, setVoucher] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal - discount;

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const applyVoucher = () => {
    if (voucher === "GIAM10") setDiscount(subtotal * 0.1);
    else alert("Mã voucher không hợp lệ");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4 pb-32">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-600">
            <ShoppingCart className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-zinc-100">Giỏ hàng</h1>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-orange-500/20 px-3 py-1 text-sm font-medium text-orange-400 ring-1 ring-orange-500/30">
          <Clock className="h-3.5 w-3.5" />
          <span>12:30</span>
        </div>
      </div>

      {items.length > 0 ? (
        <>
          {/* Items */}
          <section>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-400">
              <Ticket className="h-4 w-4" /> Vé ({items.length})
            </h3>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition hover:border-zinc-700">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-zinc-100">{item.name}</p>
                    <p className="text-xs text-zinc-500">{item.description}</p>
                    <p className="text-sm font-bold text-green-400">{item.price.toLocaleString("vi-VN")}đ</p>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="rounded-lg p-2 text-zinc-500 transition hover:bg-red-500/10 hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Voucher */}
          <section>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-400">
              <Tag className="h-4 w-4" /> Mã giảm giá
            </h3>
            <div className="flex gap-2">
              <input
                value={voucher}
                onChange={(e) => setVoucher(e.target.value)}
                placeholder="Nhập mã voucher"
                className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <button onClick={applyVoucher} className="rounded-lg bg-zinc-700 px-4 text-sm font-medium text-zinc-200 transition hover:bg-zinc-600">
                Áp dụng
              </button>
            </div>
          </section>

          {/* Summary */}
          <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Tạm tính</span>
              <span className="text-zinc-200">{subtotal.toLocaleString("vi-VN")}đ</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-green-400">Giảm giá</span>
                <span className="text-green-400">-{discount.toLocaleString("vi-VN")}đ</span>
              </div>
            )}
            <hr className="border-zinc-800" />
            <div className="flex justify-between text-base font-bold">
              <span className="text-zinc-100">Tổng cộng</span>
              <span className="text-green-400">{total.toLocaleString("vi-VN")}đ</span>
            </div>
          </section>
        </>
      ) : (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <ShoppingCart className="h-12 w-12 text-zinc-600" />
          <p className="text-zinc-400">Giỏ hàng trống</p>
          <Link href="/events" className="rounded-full bg-green-600 px-5 py-2 text-sm font-medium text-white hover:bg-green-500">
            Khám phá sự kiện
          </Link>
        </div>
      )}

      {/* CTA */}
      {items.length > 0 && (
        <div className="fixed bottom-16 left-0 right-0 border-t border-zinc-800 bg-zinc-950/90 p-4 backdrop-blur md:bottom-0">
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 py-3.5 font-semibold text-white shadow-lg shadow-green-900/30 transition hover:from-green-500 hover:to-emerald-400">
            <CreditCard className="h-5 w-5" />
            Thanh toán • {total.toLocaleString("vi-VN")}đ
          </button>
        </div>
      )}
    </div>
  );
}
