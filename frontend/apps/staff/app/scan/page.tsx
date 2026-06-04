"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Wifi, WifiOff, ScanLine, CheckCircle, XCircle, ClipboardList } from "lucide-react";

export default function StaffScanPage() {
  const [result, setResult] = useState<null | "success" | "fail">(null);
  const [checkedIn, setCheckedIn] = useState(890);
  const total = 1250;

  const simulateScan = (type: "success" | "fail") => {
    setResult(type);
    if (type === "success") setCheckedIn((prev) => prev + 1);
    setTimeout(() => setResult(null), 3000);
  };

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
        <Link href="/" className="text-zinc-400 hover:text-zinc-200"><ArrowLeft className="h-5 w-5" /></Link>
        <div className="text-center">
          <p className="text-sm font-semibold text-zinc-200">Sky Tour 2026</p>
          <p className="text-xs text-zinc-500">Cổng A1</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-green-400">
          <Wifi className="h-3.5 w-3.5" /> Online
        </div>
      </header>

      {/* Camera viewfinder */}
      <div className="flex flex-1 items-center justify-center bg-zinc-950 relative">
        <div className="flex h-64 w-64 items-center justify-center rounded-2xl border-2 border-dashed border-zinc-600">
          <div className="text-center space-y-3">
            <ScanLine className="mx-auto h-16 w-16 text-emerald-400 animate-pulse" />
            <p className="text-sm text-zinc-400">Đưa mã QR vào khung hình</p>
          </div>
        </div>

        {/* Mock scan buttons */}
        <div className="absolute bottom-6 flex gap-3">
          <button onClick={() => simulateScan("success")} className="rounded-lg bg-green-600 px-4 py-2 text-xs font-medium text-white">
            Giả lập: Thành công
          </button>
          <button onClick={() => simulateScan("fail")} className="rounded-lg bg-red-600 px-4 py-2 text-xs font-medium text-white">
            Giả lập: Thất bại
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="border-t border-zinc-800 px-4 py-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-400">Đã check-in</span>
          <span className="font-semibold text-zinc-200">{checkedIn} / {total}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-zinc-700">
          <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${(checkedIn / total) * 100}%` }} />
        </div>
        <div className="flex justify-center">
          <Link href="/log" className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200">
            <ClipboardList className="h-3.5 w-3.5" /> Nhật ký check-in
          </Link>
        </div>
      </div>

      {/* Result overlay */}
      {result && (
        <div className={`absolute inset-0 z-50 flex flex-col items-center justify-center ${result === "success" ? "bg-green-600/95" : "bg-red-600/95"}`}>
          {result === "success" ? (
            <>
              <CheckCircle className="h-24 w-24 text-white" />
              <p className="mt-4 text-2xl font-bold text-white">CHECK-IN THÀNH CÔNG</p>
              <p className="mt-2 text-sm text-white/80">VIP - Hàng A - Ghế 5</p>
              <p className="text-sm text-white/80">Nguyễn Văn A</p>
            </>
          ) : (
            <>
              <XCircle className="h-24 w-24 text-white" />
              <p className="mt-4 text-2xl font-bold text-white">CHECK-IN THẤT BẠI</p>
              <p className="mt-2 text-sm text-white/80">Vé đã được sử dụng</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
