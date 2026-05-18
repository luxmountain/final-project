"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Trash2, Tag } from "lucide-react";

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
    if (voucher === "GIAM10") { setDiscount(subtotal * 0.1); }
    else { alert("Mã voucher không hợp lệ"); }
  };

  return (
    <div className="pb-32">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-4 py-3">
        <Link href="/" className="p-2"><ArrowLeft className="h-5 w-5" /></Link>
        <span className="font-medium">Giỏ hàng</span>
        <div className="flex items-center gap-1 text-sm text-orange-600">
          <Clock className="h-4 w-4" /><span>12:30</span>
        </div>
      </div>

      <div className="space-y-4 p-4">
        {/* Items */}
        <section>
          <h3 className="mb-2 text-sm font-semibold text-gray-500">Vé ({items.length})</h3>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.description}</p>
                  <p className="mt-1 text-sm font-semibold text-blue-600">{item.price.toLocaleString("vi-VN")} VNĐ</p>
                </div>
                <button onClick={() => removeItem(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Voucher */}
        <section>
          <h3 className="mb-2 text-sm font-semibold text-gray-500">Mã giảm giá</h3>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                value={voucher}
                onChange={(e) => setVoucher(e.target.value)}
                placeholder="Nhập mã voucher"
                className="w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm"
              />
            </div>
            <button onClick={applyVoucher} className="rounded-lg bg-gray-100 px-4 text-sm font-medium hover:bg-gray-200">
              Áp dụng
            </button>
          </div>
        </section>

        {/* Summary */}
        <section className="rounded-lg border p-4">
          <div className="flex justify-between text-sm"><span className="text-gray-600">Tạm tính</span><span>{subtotal.toLocaleString("vi-VN")} VNĐ</span></div>
          {discount > 0 && <div className="flex justify-between text-sm mt-1"><span className="text-green-600">Giảm giá</span><span className="text-green-600">-{discount.toLocaleString("vi-VN")} VNĐ</span></div>}
          <hr className="my-2" />
          <div className="flex justify-between font-semibold"><span>Tổng cộng</span><span className="text-blue-600">{total.toLocaleString("vi-VN")} VNĐ</span></div>
        </section>
      </div>

      {/* CTA */}
      <div className="fixed bottom-16 left-0 right-0 border-t bg-white p-4 md:bottom-0">
        <button className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700">
          Thanh toán
        </button>
      </div>
    </div>
  );
}
