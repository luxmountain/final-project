"use client";
import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Orbitron } from "next/font/google";

const brandFont = Orbitron({ subsets: ["latin"], weight: ["700"] });

export default function LoginPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand */}
        <div className="text-center">
          <h1 className={`text-3xl font-bold text-green-400 ${brandFont.className}`}>VENTIX</h1>
          <p className="mt-1 text-sm text-zinc-500">Nền tảng vé sự kiện hàng đầu</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-5">
          {/* Tabs */}
          <div className="flex rounded-lg bg-zinc-800 p-1">
            <button onClick={() => setTab("login")} className={`flex-1 rounded-md py-2 text-sm font-medium transition ${tab === "login" ? "bg-green-600 text-white" : "text-zinc-400 hover:text-zinc-200"}`}>
              Đăng nhập
            </button>
            <button onClick={() => setTab("register")} className={`flex-1 rounded-md py-2 text-sm font-medium transition ${tab === "register" ? "bg-green-600 text-white" : "text-zinc-400 hover:text-zinc-200"}`}>
              Đăng ký
            </button>
          </div>

          {/* Form */}
          <div className="space-y-3">
            {tab === "register" && (
              <div>
                <label className="text-xs text-zinc-500">Họ tên</label>
                <input placeholder="Nguyễn Văn A" className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-green-500" />
              </div>
            )}
            <div>
              <label className="text-xs text-zinc-500">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input type="email" placeholder="email@example.com" className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2.5 pl-10 pr-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-green-500" />
              </div>
            </div>
            <div>
              <label className="text-xs text-zinc-500">Mật khẩu</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input type={showPw ? "text" : "password"} placeholder="••••••••" className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2.5 pl-10 pr-10 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-green-500" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {tab === "register" && (
              <div>
                <label className="text-xs text-zinc-500">Số điện thoại</label>
                <input placeholder="0912 345 678" className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-green-500" />
              </div>
            )}
          </div>

          {tab === "login" && (
            <div className="text-right">
              <Link href="/auth/forgot-password" className="text-xs text-green-400 hover:underline">Quên mật khẩu?</Link>
            </div>
          )}

          <button className="w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/30 transition hover:from-green-500 hover:to-emerald-400">
            {tab === "login" ? "Đăng nhập" : "Đăng ký"}
          </button>

          {/* Social */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-800" /></div>
            <div className="relative flex justify-center"><span className="bg-zinc-900 px-3 text-xs text-zinc-500">hoặc</span></div>
          </div>
          <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-zinc-700">
            <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Đăng nhập với Google
          </button>
        </div>
      </div>
    </div>
  );
}
