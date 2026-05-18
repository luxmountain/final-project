"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { useParams } from "next/navigation";

type SeatStatus = "available" | "locked" | "sold" | "selected";

const generateSeats = () => {
  const zones = [
    { name: "VIP", rows: ["A", "B"], seatsPerRow: 10, price: 3000000 },
    { name: "Standard", rows: ["C", "D", "E", "F"], seatsPerRow: 12, price: 1500000 },
  ];
  const seats: { id: string; zone: string; row: string; number: number; status: SeatStatus; price: number }[] = [];
  zones.forEach((zone) => {
    zone.rows.forEach((row) => {
      for (let i = 1; i <= zone.seatsPerRow; i++) {
        const rand = Math.random();
        const status: SeatStatus = rand < 0.2 ? "sold" : rand < 0.25 ? "locked" : "available";
        seats.push({ id: `${zone.name}-${row}${i}`, zone: zone.name, row, number: i, status, price: zone.price });
      }
    });
  });
  return seats;
};

const seatColors: Record<SeatStatus, string> = {
  available: "bg-green-500 hover:bg-green-600 cursor-pointer",
  locked: "bg-yellow-400 cursor-not-allowed",
  sold: "bg-red-500 cursor-not-allowed",
  selected: "bg-blue-600 cursor-pointer",
};

export default function SeatsPage() {
  const params = useParams();
  const [seats] = useState(generateSeats);
  const [selected, setSelected] = useState<string[]>([]);
  const [countdown] = useState(899); // 14:59

  const toggleSeat = (id: string) => {
    const seat = seats.find((s) => s.id === id);
    if (!seat || seat.status === "sold" || seat.status === "locked") return;
    setSelected((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  };

  const selectedSeats = seats.filter((s) => selected.includes(s.id));
  const total = selectedSeats.reduce((sum, s) => sum + s.price, 0);
  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <div className="pb-40">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-4 py-3 border-b">
        <Link href={`/events/${params.id}`} className="p-2"><ArrowLeft className="h-5 w-5" /></Link>
        <span className="font-medium">Chọn ghế</span>
        <div className="flex items-center gap-1 text-sm text-orange-600">
          <Clock className="h-4 w-4" />
          <span>{minutes}:{seconds.toString().padStart(2, "0")}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 py-3 text-xs">
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-sm bg-green-500" /> Trống</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-sm bg-yellow-400" /> Đang giữ</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-sm bg-red-500" /> Đã bán</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-sm bg-blue-600" /> Ghế bạn</span>
      </div>

      {/* Stage */}
      <div className="mx-auto mb-4 w-48 rounded-b-full bg-gray-800 py-2 text-center text-xs text-white">SÂN KHẤU</div>

      {/* Seat Map */}
      <div className="space-y-4 px-4">
        {["VIP", "Standard"].map((zone) => (
          <div key={zone}>
            <p className="mb-1 text-center text-xs font-medium text-gray-500">{zone} Zone</p>
            <div className="space-y-1">
              {[...new Set(seats.filter((s) => s.zone === zone).map((s) => s.row))].map((row) => (
                <div key={row} className="flex items-center justify-center gap-1">
                  <span className="w-4 text-xs text-gray-400">{row}</span>
                  {seats.filter((s) => s.zone === zone && s.row === row).map((seat) => (
                    <button
                      key={seat.id}
                      onClick={() => toggleSeat(seat.id)}
                      className={`h-6 w-6 rounded-sm text-[10px] text-white ${selected.includes(seat.id) ? seatColors.selected : seatColors[seat.status]}`}
                    >
                      {seat.number}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Selected seats + CTA */}
      {selected.length > 0 && (
        <div className="fixed bottom-16 left-0 right-0 border-t bg-white p-4 md:bottom-0">
          <div className="mb-2 text-sm">
            <span className="text-gray-600">{selected.length} ghế đã chọn</span>
            <span className="float-right font-semibold text-blue-600">{total.toLocaleString("vi-VN")} VNĐ</span>
          </div>
          <Link href="/cart" className="block w-full rounded-lg bg-blue-600 py-3 text-center font-semibold text-white">
            Tiếp tục
          </Link>
        </div>
      )}
    </div>
  );
}
