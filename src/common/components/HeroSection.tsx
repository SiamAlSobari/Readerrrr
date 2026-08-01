import { useEffect, useState } from "react";
import { Book, Star, Trophy, TrendingUp } from "lucide-react";
import { PopularComic } from "@/common/interface";
import { useNavigate } from "@tanstack/react-router";

interface Props {
  comics: PopularComic[];
}

export default function HeroSlider({ comics }: Props) {
  const items = comics.slice(0, 3);
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!items.length) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [items.length]);

  if (!items.length) return null;

  const COUNTRY_MAP = {
    KR: { label: "Manhwa", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
    JP: { label: "Manga", color: "bg-sky-500/20 text-sky-300 border-sky-500/30" },
    CN: { label: "Manhua", color: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
  } as const;

  return (
    <div className="relative mb-8 min-h-[480px] sm:h-120 overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-zinc-800/80 shadow-2xl">
      {items.map((comic, index) => {
        const activeSlide = index === active;
        const country = COUNTRY_MAP[comic.country_id] || { label: "Global", color: "bg-zinc-800 text-zinc-300 border-zinc-700" };

        return (
          <div
            key={comic.manga_id}
            className={`absolute inset-0 transition-all duration-700 ease-out
              ${
                activeSlide
                  ? "opacity-100 translate-x-0 z-10"
                  : "opacity-0 translate-x-8 z-0 pointer-events-none"
              }
            `}
          >
            <div className="flex h-full flex-col md:flex-row items-center gap-6 md:gap-10 p-6 md:px-10">
              {/* LEFT: COVER */}
              <div className="w-48 sm:w-60 md:w-64 shrink-0 shadow-2xl rounded-2xl overflow-hidden bg-zinc-800 border border-zinc-800">
                <img
                  src={comic.cover_portrait_url || comic.cover_image_url}
                  alt={comic.title}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="h-72 sm:h-96 md:h-100 w-full object-cover"
                />
              </div>

              {/* RIGHT: CONTENT */}
              <div className="flex-1 space-y-4 text-center md:text-left">
                {/* Badges */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <span className="flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-md">
                    <TrendingUp className="h-3.5 w-3.5" />
                    TRENDING
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold border ${country.color}`}
                  >
                    {country.label}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-white line-clamp-2">
                  {comic.title}
                </h1>

                {/* Description */}
                {comic.description && (
                  <p className="max-w-2xl line-clamp-3 text-sm text-zinc-300 leading-relaxed">
                    {comic.description}
                  </p>
                )}

                {/* Stats */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 text-white pt-1 text-sm font-semibold">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-amber-400 font-bold">
                      {comic.user_rate ? comic.user_rate.toFixed(1) : "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-zinc-300">
                    <Book className="h-4 w-4 text-orange-400" />
                    <span>Ch. {comic.latest_chapter_number}</span>
                  </div>

                  {comic.rank && (
                    <div className="flex items-center gap-1.5 text-purple-300">
                      <Trophy className="h-4 w-4 text-purple-400" />
                      <span>Rank #{comic.rank}</span>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div className="pt-2">
                  <button
                    onClick={() =>
                      navigate({
                        to: `/read/$comicId/$chapterId`,
                        params: {
                          chapterId: comic.latest_chapter_id,
                          comicId: comic.manga_id,
                        },
                      })
                    }
                    className="rounded-xl bg-red-500 hover:bg-red-600 active:scale-95 px-6 py-3 font-extrabold text-white text-xs sm:text-sm shadow-lg shadow-red-500/25 transition-all"
                  >
                    Baca Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={`h-2 rounded-full transition-all duration-300
              ${index === active ? "w-6 bg-red-500" : "w-2 bg-white/30 hover:bg-white/60"}
            `}
          />
        ))}
      </div>
    </div>
  );
}
