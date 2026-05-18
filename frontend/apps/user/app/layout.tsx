import type { Metadata } from "next";
import "./globals.css";
import { BottomNav } from "./components/bottom-nav";

export const metadata: Metadata = {
  title: "GreenPlate - Vé sự kiện",
  description: "Nền tảng phân phối vé và vật phẩm sự kiện",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-background pb-16 md:pb-0">
        <main className="mx-auto max-w-7xl">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
