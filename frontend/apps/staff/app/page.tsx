"use client";
import { useState } from "react";
import Link from "next/link";
import { Wifi, Calendar, MapPin, DoorOpen } from "lucide-react";

const mockEvents = [
  { id: "1", name: "Đêm nhạc Sơn Tùng M-TP: Sky Tour 2026", date: "15/06/2026 19:00", venue: "Sân vận động Mỹ Đình", gates: ["Cổng A1", "Cổng A2", "Cổng B1", "Cổng B2"] },
  { id: "2", name: "Festival Âm nhạc Quốc tế Hội An 2026", date: "20/07/2026 17:00", venue: "Phố cổ Hội An", gates: ["Cổng Chính", "Cổng Phụ"] },
];

export default function StaffHomePage() {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedGate, setSelectedGate] = useState("");
  const event = mockEvents.find((e) => e.id === selectedEvent);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-emerald-400">VENTIX Staff</h1>
          <div className="flex items-center justify-center gap-1.5 text-xs text-green-400">
            <Wifi className="h-3 w-3" /> Online
          </div>
        </div>

        {/* Select Event */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Chọn sự kiện</label>
          <select
            value={selectedEvent}
            onChange={(e) => { setSelectedEvent(e.target.value); setSelectedGate(""); }}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="">-- Chọn sự kiện --</option>
            {mockEvents.map((ev) => (
              <option key={ev.id} value={ev.id}>{ev.name}</option>
            ))}
          </select>
        </div>

        {/* Event info */}
        {event && (
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-3 space-y-1 text-xs text-zinc-400">
            <p className="flex items-center gap-1.5"><Calendar className="h-3 w-3" />{event.date}</p>
            <p className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{event.venue}</p>
          </div>
        )}

        {/* Select Gate */}
        {event && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Chọn cổng check-in</label>
            <div className="grid grid-cols-2 gap-2">
              {event.gates.map((gate) => (
                <button
                  key={gate}
                  onClick={() => setSelectedGate(gate)}
                  className={`flex items-center justify-center gap-2 rounded-lg border p-3 text-sm font-medium transition ${selectedGate === gate ? "border-emerald-500 bg-emerald-500/20 text-emerald-400" : "border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-600"}`}
                >
                  <DoorOpen className="h-4 w-4" />{gate}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        {selectedEvent && selectedGate && (
          <Link
            href={`/scan?event=${selectedEvent}&gate=${selectedGate}`}
            className="block w-full rounded-xl bg-emerald-600 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-emerald-900/30 hover:bg-emerald-500"
          >
            Bắt đầu Check-in
          </Link>
        )}
      </div>
    </div>
  );
}
