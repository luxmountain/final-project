import Link from "next/link";
import { Search, Calendar, MapPin } from "lucide-react";
import { mockEvents } from "./lib/mock-data";
import { EventCard } from "./components/event-card";

export default function HomePage() {
  const featured = mockEvents[0]!;

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-600">GreenPlate</h1>
        <Link href="/profile" className="h-8 w-8 rounded-full bg-gray-200" />
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Tìm kiếm sự kiện..."
          className="w-full rounded-lg border bg-white py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Banner */}
      <div className="overflow-hidden rounded-xl">
        <div className="relative h-48 bg-gradient-to-r from-blue-600 to-violet-600 p-6 text-white">
          <h2 className="text-lg font-bold">{featured.title}</h2>
          <div className="mt-2 flex items-center gap-2 text-sm opacity-90">
            <Calendar className="h-4 w-4" />
            <span>{new Date(featured.startDate).toLocaleDateString("vi-VN")}</span>
          </div>
          <div className="mt-1 flex items-center gap-2 text-sm opacity-90">
            <MapPin className="h-4 w-4" />
            <span>{featured.venue}</span>
          </div>
          <Link
            href={`/events/${featured.id}`}
            className="mt-4 inline-block rounded-lg bg-white px-4 py-2 text-sm font-medium text-blue-600"
          >
            Mua vé ngay
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto">
        {["Tất cả", "Ca nhạc", "Festival", "Hài kịch", "EDM", "Thể thao"].map((cat) => (
          <button
            key={cat}
            className="whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Event List */}
      <section>
        <h3 className="mb-3 text-base font-semibold">Sự kiện sắp diễn ra</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {mockEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}
