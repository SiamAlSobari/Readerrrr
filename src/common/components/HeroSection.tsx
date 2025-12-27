import { useEffect, useState } from "react";
import { Book, Star, Trophy, TrendingUp } from "lucide-react";
import { PopularComic } from "@/common/interface";

interface Props {
  comics: PopularComic[];
}

export default function HeroSlider({ comics }: Props) {
  const items = comics.slice(0, 3);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!items.length) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [items.length]);

  if (!items.length) return null;

  const COUNTRY_MAP = {
    KR: { label: "Manhwa", color: "bg-emerald-500/20 text-emerald-300" },
    JP: { label: "Manga", color: "bg-sky-500/20 text-sky-300" },
    CN: { label: "Manhua", color: "bg-rose-500/20 text-rose-300" },
  } as const;

  return (
    <div className="relative mb-10 h-130 overflow-hidden rounded-2xl bg-linear-to-br from-black via-zinc-900/75 to-neutral-900
">
      {items.map((comic, index) => {
        const activeSlide = index === active;
        const country = COUNTRY_MAP[comic.country_id];

        return (
          <div
            key={comic.manga_id}
            className={`absolute inset-0 transition-all duration-700
              ${activeSlide
                ? "opacity-100 translate-x-0 z-10"
                : "opacity-0 translate-x-6 z-0 pointer-events-none"}
            `}
          >
            <div className="flex h-full items-center gap-10 px-10">
              
              {/* LEFT: COVER */}
              <div className="w-70 shrink-0">
                <img
                  src={comic.cover_portrait_url || comic.cover_image_url}
                  alt={comic.title}
                  className="h-105 w-full rounded-xl object-cover shadow-2xl"
                />
              </div>

              {/* RIGHT: CONTENT */}
              <div className="flex-1 space-y-6">
                
                {/* Badges */}
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 rounded-full bg-red-500 px-3 py-1 text-sm font-semibold text-white">
                    <TrendingUp className="h-4 w-4" />
                    TRENDING
                  </span>
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold ${country.color}`}>
                    {country.label}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold leading-tight text-white">
                  {comic.title}
                </h1>

                {/* Description */}
                <p className="max-w-2xl line-clamp-4 text-gray-300">
                  {comic.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-6 text-white">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xl font-bold">
                      {comic.user_rate.toFixed(1)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Book className="h-5 w-5 text-orange-400" />
                    <span>{comic.latest_chapter_number} chapter</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-purple-400" />
                    <span>Rank #{comic.rank}</span>
                  </div>
                </div>

                {/* CTA */}
                <button className="rounded-xl bg-red-500 px-8 py-3 font-semibold text-white transition hover:scale-105 hover:bg-red-600">
                  Read Now
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Indicators */}
      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={`h-2.5 rounded-full transition-all
              ${index === active ? "w-6 bg-white" : "w-2.5 bg-white/40"}
            `}
          />
        ))}
      </div>
    </div>
  );
}
