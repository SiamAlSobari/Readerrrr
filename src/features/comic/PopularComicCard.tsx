import { PopularComic } from "@/common/interface";
import { Link } from "@tanstack/react-router";
import { Clock, Star, TrendingUp, Eye, Bookmark } from "lucide-react";
import { useState, memo } from "react";

interface Props {
  comic: PopularComic;
}

const COUNTRY_MAP = {
  KR: { label: "Manhwa", flag: "🇰🇷", color: "text-emerald-400" },
  JP: { label: "Manga", flag: "🇯🇵", color: "text-sky-400" },
  CN: { label: "Manhua", flag: "🇨🇳", color: "text-rose-400" },
} as const;

function PopularComicCardComponent({ comic }: Props) {
  const [imgError, setImgError] = useState(false);
  const country = COUNTRY_MAP[comic.country_id as keyof typeof COUNTRY_MAP];

  return (
    <Link
      search={{ page: 1 }}
      params={{ comicId: comic.manga_id }}
      to="/series/$comicId"
    >
      <div className="group relative overflow-hidden rounded-2xl bg-zinc-900/60 border border-zinc-800/80 transition-all duration-200 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-2xl hover:shadow-black/50">
        {/* Cover */}
        <div className="relative h-52 overflow-hidden bg-zinc-850">
          {!imgError && comic.cover_image_url ? (
            <img
              src={comic.cover_image_url}
              alt={comic.title}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-zinc-800 text-zinc-500 text-xs font-semibold p-4 text-center">
              {comic.title}
            </div>
          )}

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          {/* Rank */}
          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-lg bg-black/80 px-2.5 py-1 text-xs font-extrabold text-amber-400 backdrop-blur-md border border-amber-500/20 shadow-md">
            <TrendingUp className="h-3.5 w-3.5" />#{comic.rank}
          </div>

          {/* Rating */}
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-black/80 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-md border border-white/10 shadow-md">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {comic.user_rate ? comic.user_rate.toFixed(1) : "N/A"}
          </div>

          {/* Bottom */}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="line-clamp-2 text-base font-extrabold text-white group-hover:text-red-400 transition-colors">
              {comic.title}
            </h3>

            <div className="mt-1 flex items-center justify-between text-xs text-zinc-300 font-medium">
              <span>Ch. {comic.latest_chapter_number}</span>
              <span className={country?.color}>{country?.flag ?? "🌍"}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2.5 p-3.5">
          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <div className="flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5 text-zinc-500" />
              <span>{comic.view_count.toLocaleString("id-ID")}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Bookmark className="h-3.5 w-3.5 text-zinc-500" />
              <span>{comic.bookmark_count.toLocaleString("id-ID")}</span>
            </div>
          </div>

          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-zinc-500" />
              <span>{comic.release_year}</span>
            </div>

            <span className="text-emerald-400 font-semibold text-[11px]">
              {new Date(comic.latest_chapter_time).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
              })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

const PopularComicCard = memo(PopularComicCardComponent);
export default PopularComicCard;
