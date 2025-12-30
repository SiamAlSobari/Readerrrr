import { PopularComic } from "@/common/interface";
import { Link } from "@tanstack/react-router";
import { Clock, Star } from "lucide-react";

interface Props {
  comic: PopularComic;
}

export function PopularComicCardBase({ comic }: Props) {
  const COUNTRY_MAP: Record<
    string,
    { label: string; flag: string; color: string }
  > = {
    KR: { label: "Manhwa", flag: "🇰🇷", color: "text-green-400" },
    JP: { label: "Manga", flag: "🇯🇵", color: "text-blue-400" },
    CN: { label: "Manhua", flag: "🇨🇳", color: "text-red-400" },
  };

  const country = COUNTRY_MAP[comic.country_id] || { label: "Comic", flag: "🌍", color: "text-gray-400" };

  return (
    <Link
      search={{ page: 1 }}
      params={{ comicId: comic.manga_id }}
      to="/series/$comicId"
      className="block w-full"
    >
      <div className="group relative w-full max-w-55 mx-auto rounded-xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
        {/* Cover Image */}
        <div className="aspect-3/4 overflow-hidden bg-gray-900">
          <img
            src={comic.cover_portrait_url}
            alt={comic.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        {/* Badges: Rank & Status - posisi lebih rapi */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <div className="bg-red-600 px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-lg">
            #{comic.rank}
          </div>
          <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-md">
            {comic.status === 1 ? "Ongoing" : "Completed"}
          </div>
        </div>

        {/* Bottom section: Title + Info (selalu terlihat) */}
        <div className="mt-4 px-3 pb-4">
          <h3 className="font-bold text-sm line-clamp-2 text-white leading-tight min-h-12 group-hover:text-gray-200 transition-colors">
            {comic.title}
          </h3>

          <div className="flex items-center justify-between mt-3 text-xs">
            <span className="text-gray-400">Ch {comic.latest_chapter_number}</span>
            <span className={`font-bold ${country.color} flex items-center gap-1.5`}>
              {country.flag} {country.label}
            </span>
          </div>
        </div>

        {/* Hover Overlay - lebih smooth dan readable */}
 {/* Hover Overlay - smooth, readable, dan bener gradientnya */}
<div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
  <div className="absolute inset-x-0 bottom-0 p-5 text-white translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
    <div className="space-y-4">
      {/* Rating */}
      <div className="flex items-center gap-3">
        <Star className="h-6 w-6 fill-yellow-400 text-yellow-400 drop-shadow-md" />
        <span className="text-2xl font-bold drop-shadow-lg">
          {comic.user_rate.toFixed(1)}
        </span>
      </div>
      {/* Details */}
      <div className="space-y-2 text-sm">
        <p className="font-semibold">Chapter {comic.latest_chapter_number}</p>
        <p className="flex items-center gap-2 opacity-90">
          <Clock className="h-4 w-4" />
          {new Date(comic.latest_chapter_time).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p className="opacity-80 text-xs">{comic.release_year}</p>
      </div>
    </div>
  </div>
</div>
      </div>
    </Link>
  );
}