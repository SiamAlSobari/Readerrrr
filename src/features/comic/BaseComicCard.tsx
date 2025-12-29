import { Comic } from "@/common/interface";
import { Link } from "@tanstack/react-router";
import { Clock, Star } from "lucide-react";

interface Props {
  comic: Comic;
}

export default function BaseComicCard({ comic }: Props) {
  const genres = comic.taxonomy.Genre?.slice(0, 3) ?? [];
  const extraGenreCount =
    (comic.taxonomy.Genre?.length ?? 0) - genres.length;
  const COUNTRY_MAP: Record<
    string,
    { label: string; flag: string; color: string }
  > = {
    KR: { label: "Manhwa", flag: "🇰🇷", color: "text-green-400" },
    JP: { label: "Manga", flag: "🇯🇵", color: "text-blue-400" },
    CN: { label: "Manhua", flag: "🇨🇳", color: "text-red-400" },
  };
  const country = COUNTRY_MAP[comic.country_id];
  return (

    <Link search={{page: 1}} params={{comicId: comic.manga_id}} to="/series/$comicId">

      <div className="group relative rounded-2xl overflow-hidden bg-linear-to-b from-zinc-900 to-black transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/50">

        {/* Cover */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={comic.cover_image_url}
            alt={comic.title}
            className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 z-10 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

          {/* Top Badges */}
          <div className="absolute z-20 top-4 left-4 flex gap-2">
            <span className="px-2 py-1 rounded-md bg-black/70 text-xs font-semibold text-white">
              {comic.taxonomy.Format?.[0]?.name}
            </span>

            <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-red-500/90 text-xs font-bold text-white">
              <Star className="h-3 w-3 fill-white" />
              {comic.user_rate}
            </span>
          </div>

          {/* Bottom Info */}
          <div className="absolute z-20 bottom-4 left-4 right-4">
            <h3 className="line-clamp-1 text-lg font-bold text-white">
              {comic.title}
            </h3>

            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-gray-300">
                Chapter {comic.latest_chapter_number}
              </span>

              <span className={`text-base ${country?.color ?? "text-gray-400"}`}>
                {country?.flag ?? "🌍"}
              </span>
            </div>
          </div>
        </div>


        {/* Content */}
        <div className="p-4 space-y-3">

          {/* Genre */}
          <div className="flex flex-wrap gap-1.5">
            {genres.map((genre, index) => (
              <span
                key={index}
                className="rounded-md bg-zinc-800 px-2 py-1 text-xs text-gray-300"
              >
                {genre.name}
              </span>
            ))}

            {extraGenreCount > 0 && (
              <span className="rounded-md bg-zinc-700 px-2 py-1 text-xs text-gray-400">
                +{extraGenreCount}
              </span>
            )}
          </div>

          {/* Meta */}
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{comic.release_year}</span>
            </div>

            <span className="font-medium text-green-400">
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
