import Link from "next/link";
import { Search, TrendingUp, Flame, ChevronRight } from "lucide-react";
import { mockEvents, categories } from "./lib/mock-data";
import { EventCard } from "./components/event-card";
import { HeroBanner } from "./components/hero-banner";

export default function HomePage() {
  const trending = mockEvents.filter((e) => {
    const sold = e.ticketClasses.reduce((s, tc) => s + tc.sold, 0);
    const total = e.ticketClasses.reduce((s, tc) => s + tc.quota, 0);
    return sold / total > 0.6;
  });
  const upcoming = mockEvents.slice(0, 8);

  return (
    <div className="space-y-6 py-4">
      {/* Search - mobile only */}
      <div className="px-4 pt-4 md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm sự kiện, nghệ sĩ..."
            className="w-full rounded-full border-0 bg-zinc-800 py-2.5 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-500 shadow-sm ring-1 ring-zinc-700 focus:outline-none focus:ring-green-500"
          />
        </div>
      </div>

      {/* Hero Banner */}
      <div className="px-4 md:px-0">
        <HeroBanner />
      </div>

      {/* Categories */}
      <section className="px-4">
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/events?category=${cat.id}`}
              className="flex flex-col items-center gap-1.5 rounded-xl p-2 transition hover:bg-zinc-800"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 text-xl ring-1 ring-zinc-700">
                {cat.icon}
              </span>
              <span className="text-xs font-medium text-zinc-300">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending / Hot */}
      {trending.length > 0 && (
        <section className="px-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <h3 className="text-base font-bold text-zinc-100">Xu hướng</h3>
            </div>
            <Link href="/events?sort=trending" className="flex items-center text-sm text-green-400 hover:underline">
              Xem tất cả <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {trending.map((event) => (
              <div key={event.id} className="min-w-[260px] sm:min-w-[300px]">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      <section className="px-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-400" />
            <h3 className="text-base font-bold text-zinc-100">Sự kiện sắp diễn ra</h3>
          </div>
          <Link href="/events" className="flex items-center text-sm text-green-400 hover:underline">
            Xem tất cả <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {upcoming.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}
