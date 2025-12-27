import { PopularComic } from "@/common/interface";
import { Clock, Star, TrendingUp, Eye, Bookmark } from "lucide-react";

interface Props {
  comic: PopularComic;
}

export default function PopularComicCard({ comic }: Props) {
  const COUNTRY_MAP = {
    KR: { label: "Manhwa", flag: "🇰🇷", color: "text-emerald-400" },
    JP: { label: "Manga", flag: "🇯🇵", color: "text-sky-400" },
    CN: { label: "Manhua", flag: "🇨🇳", color: "text-rose-400" },
  } as const;

  const country = COUNTRY_MAP[comic.country_id];

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-zinc-900 transition hover:scale-[1.02] hover:shadow-xl hover:shadow-black/40">

      {/* Cover */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={comic.cover_image_url}
          alt={comic.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />

        {/* Rank */}
        <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-yellow-400 backdrop-blur">
          <TrendingUp className="h-3.5 w-3.5" />
          #{comic.rank}
        </div>

        {/* Rating */}
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-xs text-white backdrop-blur">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          {comic.user_rate.toFixed(1)}
        </div>

        {/* Bottom */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="line-clamp-2 text-base font-semibold text-white">
            {comic.title}
          </h3>

          <div className="mt-1 flex items-center justify-between text-xs text-gray-300">
            <span>Chapter {comic.latest_chapter_number}</span>
            <span className={country.color}>{country.flag}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 p-4">

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            {comic.view_count.toLocaleString("id-ID")}
          </div>

          <div className="flex items-center gap-2">
            <Bookmark className="h-4 w-4" />
            {comic.bookmark_count.toLocaleString("id-ID")}
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{comic.release_year}</span>
          </div>

          <span className="text-emerald-400">
            {new Date(comic.latest_chapter_time).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
