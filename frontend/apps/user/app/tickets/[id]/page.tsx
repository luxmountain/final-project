"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Ticket, Smartphone, DollarSign, Info } from "lucide-react";

export default function TicketDetailPage() {
  const [countdown, setCountdown] = useState(30);
  const [qrVersion, setQrVersion] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { setQrVersion((v) => v + 1); return 30; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const ticket = {
    id: "TKT-2026-001",
    eventTitle: "Đêm nhạc Sơn Tùng M-TP: Sky Tour 2026",
    eventDate: "2026-06-15T19:00:00",
    venue: "Sân vận động Mỹ Đình",
    zone: "VIP",
    row: "A",
    seatNumber: 5,
    ticketClass: "VIP",
    status: "active" as const,
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/tickets" className="p-2 rounded-full hover:bg-gray-100"><ArrowLeft className="h-5 w-5" /></Link>
        <h1 className="font-semibold">Chi tiết vé</h1>
      </div>

      {/* QR Code */}
      <div className="mx-auto max-w-xs rounded-2xl border-2 border-blue-100 bg-white p-6 text-center shadow-lg">
        <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-xl bg-gray-900 text-white">
          <div className="text-center">
            <div className="text-4xl font-mono">QR</div>
            <div className="mt-1 text-xs opacity-70">v{qrVersion} (TOTP)</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-gray-600">Cập nhật sau</div>
          <div className="mt-1 text-2xl font-bold text-blue-600">{countdown}s</div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div className="h-full rounded-full bg-blue-600 transition-all duration-1000" style={{ width: `${(countdown / 30) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Ticket Info */}
      <div className="rounded-lg border p-4 space-y-3">
        <h3 className="font-semibold">Thông tin vé</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div><span className="text-gray-500">Mã vé</span><p className="font-mono font-medium">{ticket.id}</p></div>
          <div><span className="text-gray-500">Hạng vé</span><p className="font-medium">{ticket.ticketClass}</p></div>
          <div><span className="text-gray-500">Khu vực</span><p className="font-medium">{ticket.zone}</p></div>
          <div><span className="text-gray-500">Ghế</span><p className="font-medium">{ticket.row}{ticket.seatNumber}</p></div>
        </div>
        <hr />
        <div className="space-y-1.5 text-sm">
          <div className="flex items-center gap-2 text-gray-600"><Calendar className="h-4 w-4" />{new Date(ticket.eventDate).toLocaleDateString("vi-VN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</div>
          <div className="flex items-center gap-2 text-gray-600"><MapPin className="h-4 w-4" />{ticket.venue}</div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <button className="flex w-full items-center gap-3 rounded-lg border p-3 text-sm hover:bg-gray-50">
          <Smartphone className="h-5 w-5 text-blue-600" /><span>Lưu vào Apple/Google Wallet</span>
        </button>
        <button className="flex w-full items-center gap-3 rounded-lg border p-3 text-sm hover:bg-gray-50">
          <DollarSign className="h-5 w-5 text-green-600" /><span>Bán lại trên Resale Market</span>
        </button>
        <button className="flex w-full items-center gap-3 rounded-lg border p-3 text-sm hover:bg-gray-50">
          <Info className="h-5 w-5 text-gray-600" /><span>Hướng dẫn vào cổng</span>
        </button>
      </div>
    </div>
  );
}
