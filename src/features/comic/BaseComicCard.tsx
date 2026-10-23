import { Comic } from "@/common/interface";
import { Link } from "@tanstack/react-router";
import { Clock, Star } from "lucide-react";
import { useState, memo } from "react";

interface Props {
  comic: Comic;
}

const COUNTRY_MAP: Record<
  string,
  { label: string; flag: string; color: string }
> = {
  KR: { label: "Manhwa", flag: "🇰🇷", color: "text-green-400" },
  JP: { label: "Manga", flag: "🇯🇵", color: "text-blue-400" },
  CN: { label: "Manhua", flag: "🇨🇳", color: "text-red-400" },
};

function BaseComicCardComponent({ comic }: Props) {
  const [imgError, setImgError] = useState(false);

  const genres = comic.taxonomy.Genre?.slice(0, 3) ?? [];
  const extraGenreCount = (comic.taxonomy.Genre?.length ?? 0) - genres.length;
  const country = COUNTRY_MAP[comic.country_id];

  return (
    <Link
      search={{ page: 1 }}
      params={{ comicId: comic.manga_id }}
      to="/series/$comicId"
    >
      <div
        className="group relative rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-900 via-zinc-900 to-black border border-zinc-800/60 hover:border-zinc-700 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60"
      >
        {/* Cover */}
        <div className="relative h-64 overflow-hidden bg-zinc-850">
          {!imgError && comic.cover_image_url ? (
            <img
              src={comic.cover_image_url}
              alt={comic.title}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-800 text-zinc-500 text-xs font-semibold p-4 text-center">
              {comic.title}
            </div>
          )}

          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* Top Badges */}
          <div className="absolute z-20 top-3 left-3 flex gap-1.5">
            {comic.taxonomy.Format?.[0]?.name && (
              <span className="px-2 py-0.5 rounded-lg bg-black/80 backdrop-blur-md text-[10px] font-bold text-white uppercase border border-white/10">
                {comic.taxonomy.Format[0].name}
              </span>
            )}

            {comic.user_rate > 0 && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-red-500/90 text-[10px] font-extrabold text-white shadow-md">
                <Star className="h-3 w-3 fill-white" />
                {comic.user_rate}
              </span>
            )}
          </div>

          {/* Bottom Info */}
          <div className="absolute z-20 bottom-3 left-3 right-3">
            <h3 className="line-clamp-1 text-base font-extrabold text-white group-hover:text-red-400 transition-colors">
              {comic.title}
            </h3>

            <div className="mt-1 flex items-center justify-between text-xs">
              <span className="text-zinc-300 font-medium">
                Ch. {comic.latest_chapter_number}
              </span>

              <span className={`text-sm ${country?.color ?? "text-zinc-400"}`}>
                {country?.flag ?? "🌍"}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-3.5 space-y-2.5">
          {/* Genre */}
          <div className="flex flex-wrap gap-1">
            {genres.map((genre, index) => (
              <span
                key={index}
                className="rounded-md bg-zinc-800/80 px-2 py-0.5 text-[10px] text-zinc-300 font-medium"
              >
                {genre.name}
              </span>
            ))}

            {extraGenreCount > 0 && (
              <span className="rounded-md bg-zinc-800/50 px-1.5 py-0.5 text-[10px] text-zinc-500">
                +{extraGenreCount}
              </span>
            )}
          </div>

          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-zinc-500" />
              <span>{comic.release_year}</span>
            </div>

            <span className="font-semibold text-emerald-400 text-[11px]">
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

const BaseComicCard = memo(BaseComicCardComponent);
export default BaseComicCard;
