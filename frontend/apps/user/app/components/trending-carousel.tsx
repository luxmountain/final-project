"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { Event } from "@repo/types";
import { EventCard } from "./event-card";

export function TrendingCarousel({ events }: { events: Event[] }) {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-4">
        {events.map((event) => (
          <div key={event.id} className="min-w-0 flex-[0_0_260px] sm:flex-[0_0_300px]">
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </div>
  );
}
