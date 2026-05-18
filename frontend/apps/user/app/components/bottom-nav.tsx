"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Ticket, ShoppingCart, User } from "lucide-react";

const navItems = [
  { href: "/", icon: Home, label: "Trang chủ" },
  { href: "/tickets", icon: Ticket, label: "Vé" },
  { href: "/cart", icon: ShoppingCart, label: "Giỏ hàng" },
  { href: "/profile", icon: User, label: "Tôi" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-1 text-xs ${isActive ? "text-blue-600" : "text-gray-500"}`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
