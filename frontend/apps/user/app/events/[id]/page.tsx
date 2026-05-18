import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Clock, Tag, Users, Heart, Share2 } from "lucide-react";
import { mockEvents, mockMerchandise } from "../../lib/mock-data";

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = mockEvents.find((e) => e.id === id) ?? mockEvents[0]!;
  const merch = mockMerchandise.filter((m) => m.eventId === event!.id);

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-white/80 px-4 py-3 backdrop-blur">
        <Link href="/" className="rounded-full p-2 hover:bg-gray-100"><ArrowLeft className="h-5 w-5" /></Link>
        <div className="flex gap-2">
          <button className="rounded-full p-2 hover:bg-gray-100"><Heart className="h-5 w-5" /></button>
          <button className="rounded-full p-2 hover:bg-gray-100"><Share2 className="h-5 w-5" /></button>
        </div>
      </div>

      {/* Banner */}
      <img src={event.bannerUrl} alt={event.title} className="h-52 w-full object-cover" />

      {/* Info */}
      <div className="space-y-4 p-4">
        <h1 className="text-xl font-bold">{event.title}</h1>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-blue-600" />{new Date(event.startDate).toLocaleDateString("vi-VN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</div>
          <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-blue-600" />{new Date(event.startDate).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })} - {new Date(event.endDate).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}</div>
          <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-blue-600" />{event.venue}, {event.city}</div>
          <div className="flex items-center gap-2"><Tag className="h-4 w-4 text-blue-600" />{event.category}</div>
          <div className="flex items-center gap-2"><Users className="h-4 w-4 text-blue-600" />{event.organizer}</div>
        </div>

        {/* Description */}
        <div>
          <h3 className="mb-1 font-semibold">Mô tả</h3>
          <p className="text-sm text-gray-600">{event.description}</p>
        </div>

        {/* Ticket Classes */}
        <div>
          <h3 className="mb-2 font-semibold">Hạng vé</h3>
          <div className="space-y-2">
            {event.ticketClasses.map((tc) => (
              <div key={tc.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">{tc.name}</p>
                  <p className="text-xs text-gray-500">Còn {tc.quota - tc.sold}/{tc.quota}</p>
                </div>
                <p className="font-semibold text-blue-600">{tc.price.toLocaleString("vi-VN")} VNĐ</p>
              </div>
            ))}
          </div>
        </div>

        {/* Merchandise */}
        {merch.length > 0 && (
          <div>
            <h3 className="mb-2 font-semibold">Merchandise</h3>
            <div className="flex gap-3 overflow-x-auto">
              {merch.map((m) => (
                <div key={m.id} className="w-32 shrink-0 rounded-lg border p-2">
                  <img src={m.imageUrl} alt={m.name} className="h-24 w-full rounded object-cover" />
                  <p className="mt-1 text-xs font-medium">{m.name}</p>
                  <p className="text-xs text-blue-600">{m.price.toLocaleString("vi-VN")} VNĐ</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-16 left-0 right-0 border-t bg-white p-4 md:bottom-0">
        <Link
          href={`/events/${event.id}/seats`}
          className="block w-full rounded-lg bg-blue-600 py-3 text-center font-semibold text-white hover:bg-blue-700"
        >
          Mua vé ngay
        </Link>
      </div>
    </div>
  );
}
