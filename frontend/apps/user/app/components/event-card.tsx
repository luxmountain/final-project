import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import type { Event } from "@repo/types";

export function EventCard({ event }: { event: Event }) {
  const minPrice = Math.min(...event.ticketClasses.map((tc) => tc.price));
  const sold = event.ticketClasses.reduce((s, tc) => s + tc.sold, 0);
  const total = event.ticketClasses.reduce((s, tc) => s + tc.quota, 0);
  const isHot = sold / total > 0.7;

  return (
    <Link
      href={`/events/${event.id}`}
      className="group block overflow-hidden rounded-xl bg-zinc-800 ring-1 ring-zinc-700 transition hover:shadow-lg hover:ring-green-500/50"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={event.bannerUrl}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {isHot && (
          <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold text-white shadow">
            🔥 Hot
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 pt-8">
          <span className="inline-block rounded bg-green-500/90 px-2 py-0.5 text-xs font-medium text-white">
            {event.category}
          </span>
        </div>
      </div>
      <div className="p-3">
        <h4 className="line-clamp-2 text-sm font-semibold leading-snug text-zinc-100 group-hover:text-green-400">
          {event.title}
        </h4>
        <div className="mt-2 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <Calendar className="h-3.5 w-3.5 shrink-0 text-green-400" />
            <span>{new Date(event.startDate).toLocaleDateString("vi-VN", { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric" })}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-orange-400" />
            <span className="truncate">{event.venue}, {event.city}</span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-zinc-700 pt-2">
          <p className="text-sm font-bold text-green-400">
            {minPrice.toLocaleString("vi-VN")}đ
          </p>
          <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">
            Mua vé
          </span>
        </div>
      </div>
    </Link>
  );
}
