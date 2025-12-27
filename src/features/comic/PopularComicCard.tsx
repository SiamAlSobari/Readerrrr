import { Comic } from "@/common/interface";
import { Clock, Star, TrendingUp } from "lucide-react";

interface Props {
  comic: Comic;
}

export default function PopularComicCard({ comic }: Props) {
  const genres = comic.taxonomy.Genre?.slice(0, 3) ?? [];
  const extraGenreCount =
    (comic.taxonomy.Genre?.length ?? 0) - genres.length;

  const COUNTRY_MAP: Record<
    string,
    { label: string; flag: string; color: string }
  > = {
    KR: { label: "Manhwa", flag: "🇰🇷", color: "text-emerald-400" },
    JP: { label: "Manga", flag: "🇯🇵", color: "text-sky-400" },
    CN: { label: "Manhua", flag: "🇨🇳", color: "text-rose-400" },
  };

  const country = COUNTRY_MAP[comic.country_id];

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-zinc-900 transition hover:shadow-xl hover:shadow-black/40">

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={comic.cover_image_url}
          alt={comic.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

        {/* Rank */}
        {comic.rank && (
          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-yellow-400 backdrop-blur">
            <TrendingUp className="h-3 w-3" />
            #{comic.rank}
          </div>
        )}

        {/* Rating */}
        {comic.user_rate > 0 && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-xs text-white backdrop-blur">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            {comic.user_rate.toFixed(1)}
          </div>
        )}

        {/* Title */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="line-clamp-2 text-base font-semibold text-white">
            {comic.title}
          </h3>

          <div className="mt-1 flex items-center justify-between text-xs text-gray-300">
            <span>Chapter {comic.latest_chapter_number}</span>
            <span className={country?.color}>{country?.flag}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 p-4">

        {/* Genre */}
        <div className="flex flex-wrap gap-1.5">
          {genres.map((genre, index) => (
            <span
              key={index}
              className="rounded-md bg-zinc-800 px-2 py-0.5 text-[11px] text-gray-300"
            >
              {genre.name}
            </span>
          ))}

          {extraGenreCount > 0 && (
            <span className="rounded-md bg-zinc-700 px-2 py-0.5 text-[11px] text-gray-400">
              +{extraGenreCount}
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
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
