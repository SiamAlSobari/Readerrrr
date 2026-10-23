import { PopularComic } from "@/common/interface";
import { Link } from "@tanstack/react-router";
import { Clock, Star } from "lucide-react";
import { useState, memo } from "react";

interface Props {
  comic: PopularComic;
}

const COUNTRY_MAP: Record<string, { label: string; flag: string; color: string }> = {
  KR: { label: "Manhwa", flag: "🇰🇷", color: "text-emerald-400" },
  JP: { label: "Manga", flag: "🇯🇵", color: "text-sky-400" },
  CN: { label: "Manhua", flag: "🇨🇳", color: "text-rose-400" },
};

function PopularComicCardBaseComponent({ comic }: Props) {
  const [imgError, setImgError] = useState(false);

  const country =
    COUNTRY_MAP[comic.country_id] ?? {
      label: "Komik",
      flag: "🌍",
      color: "text-zinc-400",
    };

  return (
    <Link
      to="/series/$comicId"
      params={{ comicId: comic.manga_id }}
      search={{ page: 1 }}
      className="block w-full"
    >
      <div className="group relative rounded-2xl overflow-hidden bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-200 hover:-translate-y-1 shadow-md hover:shadow-xl">
        {/* Cover */}
        <div className="aspect-3/4 overflow-hidden bg-zinc-850 relative">
          {!imgError && (comic.cover_portrait_url || comic.cover_image_url) ? (
            <img
              src={comic.cover_portrait_url || comic.cover_image_url}
              alt={comic.title}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-500 text-xs font-bold p-3 text-center">
              {comic.title}
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {comic.rank && (
            <div className="bg-red-500/90 backdrop-blur-md px-2 py-0.5 rounded-lg text-[10px] font-extrabold text-white shadow-md">
              #{comic.rank}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="font-extrabold text-xs sm:text-sm line-clamp-2 text-white group-hover:text-red-400 transition-colors min-h-[36px]">
            {comic.title}
          </h3>

          <div className="flex justify-between items-center mt-2.5 text-xs text-zinc-400">
            <span className="font-medium">Ch. {comic.latest_chapter_number}</span>
            <span className={`font-bold text-[11px] ${country.color}`}>
              {country.flag} {country.label}
            </span>
          </div>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
          <div className="absolute bottom-0 p-4 text-white w-full">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-base font-extrabold text-amber-400">
                {comic.user_rate ? comic.user_rate.toFixed(1) : "N/A"}
              </span>
            </div>

            <p className="text-xs font-medium text-zinc-300">
              Chapter {comic.latest_chapter_number}
            </p>
            <p className="flex items-center gap-1 text-[10px] text-zinc-400 mt-1">
              <Clock className="h-3 w-3" />
              {new Date(comic.latest_chapter_time).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
              })}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export const PopularComicCardBase = memo(PopularComicCardBaseComponent);
