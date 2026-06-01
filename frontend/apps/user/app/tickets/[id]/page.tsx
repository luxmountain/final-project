"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Smartphone, DollarSign, Info, QrCode } from "lucide-react";

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
    <div className="mx-auto max-w-5xl p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/tickets" className="rounded-full p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-semibold text-zinc-100">Chi tiết vé</h1>
      </div>

      {/* 2-column layout on desktop */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left - QR Card */}
        <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950">
          <div className="h-1.5 bg-gradient-to-r from-green-500 via-emerald-400 to-teal-500" />

          <div className="px-6 pt-5 pb-3">
            <p className="text-lg font-bold text-zinc-100">{ticket.eventTitle}</p>
            <div className="mt-2 flex flex-wrap gap-3 text-xs text-zinc-400">
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-green-400" />{new Date(ticket.eventDate).toLocaleDateString("vi-VN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</span>
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-green-400" />{ticket.venue}</span>
            </div>
          </div>

          {/* Dashed separator */}
          <div className="relative flex items-center">
            <div className="h-5 w-5 -translate-x-1/2 rounded-full bg-zinc-950" />
            <div className="flex-1 border-t border-dashed border-zinc-700" />
            <div className="h-5 w-5 translate-x-1/2 rounded-full bg-zinc-950" />
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center px-6 py-6">
            <div className="flex h-52 w-52 items-center justify-center rounded-xl bg-white p-3 lg:h-60 lg:w-60">
              <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-zinc-900 text-white">
                <QrCode className="h-20 w-20" />
                <span className="mt-1 text-xs opacity-60">v{qrVersion}</span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-xs text-zinc-500">Tự động cập nhật sau</p>
              <p className="mt-0.5 text-xl font-bold text-green-400">{countdown}s</p>
              <div className="mx-auto mt-2 h-1.5 w-40 overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-1000" style={{ width: `${(countdown / 30) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right - Info & Actions */}
        <div className="space-y-6">
          {/* Ticket Info Grid */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <h3 className="mb-4 text-sm font-semibold text-zinc-300">Thông tin vé</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Mã vé", value: ticket.id, mono: true },
                { label: "Hạng vé", value: ticket.ticketClass },
                { label: "Khu vực", value: ticket.zone },
                { label: "Ghế", value: `${ticket.row}${ticket.seatNumber}` },
              ].map((item) => (
                <div key={item.label} className="rounded-lg bg-zinc-800/50 p-3">
                  <p className="text-xs text-zinc-500">{item.label}</p>
                  <p className={`mt-1 text-sm font-semibold text-zinc-200 ${item.mono ? "font-mono text-xs" : ""}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            {[
              { icon: Smartphone, label: "Lưu vào Apple/Google Wallet", color: "text-blue-400" },
              { icon: DollarSign, label: "Bán lại trên Resale Market", color: "text-green-400" },
              { icon: Info, label: "Hướng dẫn vào cổng", color: "text-zinc-400" },
            ].map(({ icon: Icon, label, color }) => (
              <button key={label} className="flex w-full items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-800">
                <Icon className={`h-5 w-5 ${color}`} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
