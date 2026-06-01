import Link from "next/link";
import { Search, TrendingUp, Flame, ChevronRight, Music, Tent, Laugh, Headphones, Trophy, Palette, Briefcase, Drama, type LucideIcon } from "lucide-react";
import { mockEvents, categories } from "./lib/mock-data";

const categoryIcons: Record<string, { icon: LucideIcon; color: string }> = {
  music: { icon: Music, color: "text-pink-400" },
  festival: { icon: Tent, color: "text-purple-400" },
  comedy: { icon: Laugh, color: "text-yellow-400" },
  edm: { icon: Headphones, color: "text-blue-400" },
  sports: { icon: Trophy, color: "text-green-400" },
  art: { icon: Palette, color: "text-orange-400" },
  conference: { icon: Briefcase, color: "text-slate-400" },
  theater: { icon: Drama, color: "text-red-400" },
};
import { EventCard } from "./components/event-card";
import { HeroBanner } from "./components/hero-banner";
import { TrendingCarousel } from "./components/trending-carousel";

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
          {categories.map((cat) => {
            const { icon: Icon, color } = categoryIcons[cat.id] || {};
            return (
            <Link
              key={cat.id}
              href={`/events?category=${cat.id}`}
              className="flex flex-col items-center gap-1.5 rounded-xl p-2 transition hover:bg-zinc-800"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 ring-1 ring-zinc-700">
                {Icon && <Icon className={`h-5 w-5 ${color}`} />}
              </span>
              <span className="text-xs font-medium text-zinc-300">{cat.name}</span>
            </Link>
            );
          })}
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
          <TrendingCarousel events={trending} />
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
