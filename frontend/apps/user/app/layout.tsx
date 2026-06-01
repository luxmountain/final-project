import type { Metadata } from "next";
import Link from "next/link";
import { Search, Ticket, ShoppingCart, User } from "lucide-react";
import "./globals.css";
import { BottomNav } from "./components/bottom-nav";

export const metadata: Metadata = {
  title: "GreenPlate - Vé sự kiện",
  description: "Nền tảng phân phối vé và vật phẩm sự kiện",
};

function DesktopHeader() {
  return (
    <header className="sticky top-0 z-50 hidden border-b border-green-700 bg-green-600 shadow-md md:block">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-6">
        <Link href="/" className="text-xl font-bold text-white">
          🎫 GreenPlate
        </Link>

        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm sự kiện, nghệ sĩ, địa điểm..."
            className="w-full rounded-full border-0 bg-white/90 py-2 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-500 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>

        <nav className="flex items-center gap-1">
          <Link href="/events" className="rounded-lg px-3 py-2 text-sm font-medium text-white/90 hover:bg-green-700 hover:text-white">
            Sự kiện
          </Link>
          <Link href="/tickets" className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-white/90 hover:bg-green-700 hover:text-white">
            <Ticket className="h-4 w-4" /> Vé của tôi
          </Link>
          <Link href="/cart" className="relative rounded-lg p-2 text-white/90 hover:bg-green-700 hover:text-white">
            <ShoppingCart className="h-5 w-5" />
          </Link>
          <Link href="/profile" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30">
            <User className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-background pb-16 md:pb-0">
        <DesktopHeader />
        <main className="mx-auto max-w-7xl">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
