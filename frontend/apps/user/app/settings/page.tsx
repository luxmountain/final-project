"use client";
import { Settings, User, Lock, Bell, Globe, Shield } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-zinc-500 to-zinc-600">
          <Settings className="h-5 w-5 text-white" />
        </div>
        <h1 className="text-xl font-bold text-zinc-100">Cài đặt tài khoản</h1>
      </div>

      {/* Profile section */}
      <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 space-y-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-300"><User className="h-4 w-4" /> Thông tin cá nhân</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-xs text-zinc-500">Họ tên</label>
            <input defaultValue="Nguyễn Văn A" className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-green-500" />
          </div>
          <div>
            <label className="text-xs text-zinc-500">Số điện thoại</label>
            <input defaultValue="0912 345 678" className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-green-500" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs text-zinc-500">Email</label>
            <input defaultValue="nguyenvana@gmail.com" className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-green-500" />
          </div>
        </div>
        <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-500">Lưu thay đổi</button>
      </section>

      {/* Security */}
      <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 space-y-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-300"><Lock className="h-4 w-4" /> Bảo mật</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-200">Đổi mật khẩu</p>
              <p className="text-xs text-zinc-500">Cập nhật lần cuối: 30 ngày trước</p>
            </div>
            <button className="rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 ring-1 ring-zinc-700 hover:bg-zinc-700">Thay đổi</button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-200">Xác thực 2 lớp (2FA)</p>
              <p className="text-xs text-zinc-500">Bảo vệ tài khoản bằng OTP</p>
            </div>
            <span className="rounded-full bg-green-500/20 px-2.5 py-0.5 text-xs font-medium text-green-400 ring-1 ring-green-500/30">Đã bật</span>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 space-y-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-300"><Bell className="h-4 w-4" /> Thông báo</h3>
        <div className="space-y-3">
          {[
            { label: "Email thông báo đơn hàng", checked: true },
            { label: "Push notification sự kiện", checked: true },
            { label: "Khuyến mãi & ưu đãi", checked: false },
          ].map((item) => (
            <label key={item.label} className="flex items-center justify-between">
              <span className="text-sm text-zinc-300">{item.label}</span>
              <input type="checkbox" defaultChecked={item.checked} className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-green-500 focus:ring-green-500" />
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}
