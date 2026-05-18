import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import type { Event } from "@repo/types";

export function EventCard({ event }: { event: Event }) {
  const minPrice = Math.min(...event.ticketClasses.map((tc) => tc.price));

  return (
    <Link href={`/events/${event.id}`} className="block overflow-hidden rounded-lg border bg-white shadow-sm transition hover:shadow-md">
      <img src={event.bannerUrl} alt={event.title} className="h-32 w-full object-cover" />
      <div className="p-3">
        <span className="inline-block rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">
          {event.category}
        </span>
        <h4 className="mt-1.5 line-clamp-2 text-sm font-semibold">{event.title}</h4>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
          <Calendar className="h-3.5 w-3.5" />
          <span>{new Date(event.startDate).toLocaleDateString("vi-VN")}</span>
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
          <MapPin className="h-3.5 w-3.5" />
          <span>{event.venue}, {event.city}</span>
        </div>
        <p className="mt-2 text-sm font-semibold text-blue-600">
          Từ {minPrice.toLocaleString("vi-VN")} VNĐ
        </p>
      </div>
    </Link>
  );
}
