import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VENTIX - Organizer",
  description: "Organizer Portal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="antialiased">{children}</body>
    </html>
  );
}
