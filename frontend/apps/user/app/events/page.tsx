"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { mockEvents, categories } from "../lib/mock-data";
import { EventCard } from "../components/event-card";

export default function EventsPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");

  const filtered = mockEvents.filter((e) => {
    const matchCategory = activeCategory === "all" || categories.find((c) => c.id === activeCategory)?.name === e.category;
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) || e.venue.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="mx-auto max-w-5xl space-y-5 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-zinc-100">Sự kiện</h1>
        <button className="flex items-center gap-1.5 rounded-lg bg-zinc-800 px-3 py-2 text-sm text-zinc-300 ring-1 ring-zinc-700 hover:bg-zinc-700">
          <SlidersHorizontal className="h-4 w-4" /> Lọc
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm sự kiện, địa điểm..."
          className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-2.5 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-green-500"
        />
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <button
          onClick={() => setActiveCategory("all")}
          className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition ${activeCategory === "all" ? "bg-green-600 text-white" : "bg-zinc-800 text-zinc-400 ring-1 ring-zinc-700 hover:text-zinc-200"}`}
        >
          Tất cả
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition ${activeCategory === cat.id ? "bg-green-600 text-white" : "bg-zinc-800 text-zinc-400 ring-1 ring-zinc-700 hover:text-zinc-200"}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-zinc-500">Không tìm thấy sự kiện nào</p>
        </div>
      )}
    </div>
  );
}
