import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Clock, Tag, Users, Heart, Share2, Ticket } from "lucide-react";
import { mockEvents, mockMerchandise } from "../../lib/mock-data";

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = mockEvents.find((e) => e.id === id) ?? mockEvents[0]!;
  const merch = mockMerchandise.filter((m) => m.eventId === event!.id);
  const minPrice = Math.min(...event.ticketClasses.map((tc) => tc.price));
  const sold = event.ticketClasses.reduce((s, tc) => s + tc.sold, 0);
  const total = event.ticketClasses.reduce((s, tc) => s + tc.quota, 0);
  const soldPercent = Math.round((sold / total) * 100);

  return (
    <div className="pb-28">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-zinc-900/80 px-4 py-3 backdrop-blur-md border-b border-zinc-700/50">
        <Link href="/" className="rounded-full p-2 text-zinc-300 hover:bg-zinc-700 hover:text-white transition">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <span className="text-sm font-semibold text-zinc-100 truncate max-w-[200px]">{event.title}</span>
        <div className="flex gap-1">
          <button className="rounded-full p-2 text-zinc-300 hover:bg-zinc-700 hover:text-red-400 transition">
            <Heart className="h-5 w-5" />
          </button>
          <button className="rounded-full p-2 text-zinc-300 hover:bg-zinc-700 hover:text-green-400 transition">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Banner */}
      <div className="relative">
        <img src={event.bannerUrl} alt={event.title} className="h-60 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-4">
          <span className="inline-block rounded-full bg-green-500/90 px-3 py-1 text-xs font-semibold text-white shadow">
            {event.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-5 p-4">
        {/* Title & price */}
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-xl font-bold text-zinc-100 leading-snug flex-1">{event.title}</h1>
          <div className="shrink-0 text-right">
            <p className="text-xs text-zinc-500">Từ</p>
            <p className="text-lg font-bold text-green-400">{minPrice.toLocaleString("vi-VN")}đ</p>
          </div>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 gap-2.5">
          <div className="flex items-center gap-3 rounded-xl bg-zinc-800 px-4 py-3 ring-1 ring-zinc-700">
            <Calendar className="h-4 w-4 shrink-0 text-green-400" />
            <div>
              <p className="text-xs text-zinc-500 leading-none mb-0.5">Ngày diễn ra</p>
              <p className="text-sm text-zinc-100">
                {new Date(event.startDate).toLocaleDateString("vi-VN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-zinc-800 px-4 py-3 ring-1 ring-zinc-700">
            <Clock className="h-4 w-4 shrink-0 text-orange-400" />
            <div>
              <p className="text-xs text-zinc-500 leading-none mb-0.5">Thời gian</p>
              <p className="text-sm text-zinc-100">
                {new Date(event.startDate).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
                {" "}&ndash;{" "}
                {new Date(event.endDate).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-zinc-800 px-4 py-3 ring-1 ring-zinc-700">
            <MapPin className="h-4 w-4 shrink-0 text-red-400" />
            <div>
              <p className="text-xs text-zinc-500 leading-none mb-0.5">Địa điểm</p>
              <p className="text-sm text-zinc-100">{event.venue}, {event.city}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-zinc-800 px-4 py-3 ring-1 ring-zinc-700">
            <Users className="h-4 w-4 shrink-0 text-purple-400" />
            <div>
              <p className="text-xs text-zinc-500 leading-none mb-0.5">Ban tổ chức</p>
              <p className="text-sm text-zinc-100">{event.organizer}</p>
            </div>
          </div>
        </div>

        {/* Sold progress */}
        <div className="rounded-xl bg-zinc-800 px-4 py-3 ring-1 ring-zinc-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-400 flex items-center gap-1.5">
              <Ticket className="h-3.5 w-3.5 text-green-400" /> Đã bán
            </span>
            <span className="text-xs font-semibold text-green-400">{soldPercent}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-zinc-700">
            <div
              className="h-1.5 rounded-full bg-green-500 transition-all"
              style={{ width: `${soldPercent}%` }}
            />
          </div>
          <p className="mt-1.5 text-xs text-zinc-500">{sold.toLocaleString()} / {total.toLocaleString()} vé</p>
        </div>

        {/* Description */}
        <div className="rounded-xl bg-zinc-800 px-4 py-3 ring-1 ring-zinc-700">
          <h3 className="mb-2 text-sm font-semibold text-zinc-100">Mô tả sự kiện</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">{event.description}</p>
        </div>

        {/* Ticket Classes */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-zinc-100">Hạng vé</h3>
          <div className="space-y-2">
            {event.ticketClasses.map((tc) => {
              const remaining = tc.quota - tc.sold;
              const isLow = remaining / tc.quota < 0.2;
              return (
                <div
                  key={tc.id}
                  className="flex items-center justify-between rounded-xl bg-zinc-800 px-4 py-3 ring-1 ring-zinc-700"
                >
                  <div>
                    <p className="text-sm font-semibold text-zinc-100">{tc.name}</p>
                    <p className={`text-xs mt-0.5 ${isLow ? "text-red-400" : "text-zinc-500"}`}>
                      {isLow ? "⚡ " : ""}Còn {remaining.toLocaleString()} / {tc.quota.toLocaleString()} vé
                    </p>
                  </div>
                  <p className="text-base font-bold text-green-400">{tc.price.toLocaleString("vi-VN")}đ</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Merchandise */}
        {merch.length > 0 && (
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-100">Merchandise</h3>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {merch.map((m) => (
                <div key={m.id} className="w-32 shrink-0 rounded-xl bg-zinc-800 ring-1 ring-zinc-700 overflow-hidden">
                  <img src={m.imageUrl} alt={m.name} className="h-24 w-full object-cover" />
                  <div className="p-2">
                    <p className="text-xs font-medium text-zinc-200 line-clamp-2 leading-snug">{m.name}</p>
                    <p className="mt-1 text-xs font-bold text-green-400">{m.price.toLocaleString("vi-VN")}đ</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-16 left-0 right-0 border-t border-zinc-700 bg-zinc-900/95 p-4 backdrop-blur-md md:bottom-0">
        <Link
          href={`/events/${event.id}/seats`}
          className="block w-full rounded-xl bg-green-500 py-3 text-center text-sm font-bold text-white shadow-lg shadow-green-500/20 hover:bg-green-600 transition"
        >
          Mua vé ngay
        </Link>
      </div>
    </div>
  );
}
