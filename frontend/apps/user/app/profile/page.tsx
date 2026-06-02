import { User, Mail, Phone, MapPin, Ticket, ShoppingBag, Settings, LogOut, ChevronRight, CreditCard } from "lucide-react";
import Link from "next/link";

const menuItems = [
  { icon: Ticket, label: "Vé của tôi", href: "/tickets", color: "text-green-400" },
  { icon: ShoppingBag, label: "Lịch sử mua hàng", href: "/orders", color: "text-blue-400" },
  { icon: CreditCard, label: "Phương thức thanh toán", href: "/payment-methods", color: "text-purple-400" },
  { icon: Settings, label: "Cài đặt tài khoản", href: "/settings", color: "text-zinc-400" },
];

export default function ProfilePage() {
  const user = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    phone: "0912 345 678",
    city: "Hà Nội",
    avatar: null,
    ticketCount: 3,
    eventCount: 5,
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4">
      {/* Profile Card */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-emerald-600/10" />
        <div className="relative flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-2xl font-bold text-white ring-4 ring-zinc-900">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-lg font-bold text-zinc-100">{user.name}</h1>
            <div className="mt-1 space-y-0.5 text-xs text-zinc-400">
              <p className="flex items-center gap-1.5"><Mail className="h-3 w-3" />{user.email}</p>
              <p className="flex items-center gap-1.5"><Phone className="h-3 w-3" />{user.phone}</p>
              <p className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{user.city}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-zinc-800/60 p-3 text-center ring-1 ring-zinc-700/50">
            <p className="text-xl font-bold text-green-400">{user.ticketCount}</p>
            <p className="text-xs text-zinc-500">Vé hiện có</p>
          </div>
          <div className="rounded-xl bg-zinc-800/60 p-3 text-center ring-1 ring-zinc-700/50">
            <p className="text-xl font-bold text-blue-400">{user.eventCount}</p>
            <p className="text-xs text-zinc-500">Sự kiện đã tham gia</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 divide-y divide-zinc-800">
        {menuItems.map(({ icon: Icon, label, href, color }) => (
          <Link key={href} href={href} className="flex items-center gap-3 px-4 py-3.5 transition hover:bg-zinc-800">
            <Icon className={`h-5 w-5 ${color}`} />
            <span className="flex-1 text-sm text-zinc-200">{label}</span>
            <ChevronRight className="h-4 w-4 text-zinc-600" />
          </Link>
        ))}
      </div>

      {/* Logout */}
      <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/20">
        <LogOut className="h-4 w-4" />
        Đăng xuất
      </button>
    </div>
  );
}
