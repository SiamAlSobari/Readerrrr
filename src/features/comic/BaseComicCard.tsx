import { Comic } from "@/common/interface";
import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { useState, memo } from "react";

interface Props {
  comic: Comic;
}

const COUNTRY_CODE: Record<string, string> = {
  KR: "KR · MANHWA",
  JP: "JP · MANGA",
  CN: "CN · MANHUA",
};

function BaseComicCardComponent({ comic }: Props) {
  const [imgError, setImgError] = useState(false);

  const genres = comic.taxonomy?.Genre?.slice(0, 2) ?? [];
  const originCode =
    COUNTRY_CODE[comic.country_id] ||
    comic.taxonomy?.Format?.[0]?.name?.toUpperCase() ||
    "KOMIK";

  return (
    <Link
      search={{ page: 1 }}
      params={{ comicId: comic.manga_id }}
      to="/series/$comicId"
      className="group flex h-full flex-col border border-[#27272e] bg-[#101014] transition-colors duration-150 hover:border-[#f4f1ea] hover:bg-[#141418] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f43f5e]"
    >
      {/* Top Stamp Strip */}
      <div className="flex items-center justify-between border-b border-[#27272e] bg-[#0c0c10] px-2.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider tabular-nums">
        <span className="text-[#c8c2b6] truncate">{originCode}</span>
        {comic.user_rate > 0 ? (
          <span className="flex items-center gap-1 text-[#fbbf24] shrink-0">
            <Star className="h-3 w-3 fill-[#fbbf24] text-[#fbbf24]" />
            {Number(comic.user_rate).toFixed(1)}
          </span>
        ) : (
          <span className="text-[#c8c2b6] shrink-0">{comic.release_year || "EDISI"}</span>
        )}
      </div>

      {/* Cover Frame */}
      <div className="relative aspect-3/4 w-full overflow-hidden bg-[#141418]">
        {!imgError && comic.cover_image_url ? (
          <img
            src={comic.cover_image_url}
            alt={comic.title}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#141418] p-4 text-center font-mono text-xs font-bold uppercase text-[#c8c2b6]">
            {comic.title}
          </div>
        )}

        {/* Bottom Obi Strip on Cover */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-[#27272e] bg-[#09090b]/95 px-2.5 py-1.5 font-mono text-xs font-bold tabular-nums">
          <span className="text-[#f43f5e]">CH. {comic.latest_chapter_number}</span>
          {comic.latest_chapter_time && (
            <span className="text-[#c8c2b6]">
              {new Date(comic.latest_chapter_time).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
              })}
            </span>
          )}
        </div>
      </div>

      {/* Editorial Caption */}
      <div className="flex flex-1 flex-col justify-between p-3">
        <h3 className="line-clamp-2 font-sans text-sm font-bold leading-snug text-[#f4f1ea] group-hover:text-[#f43f5e] transition-colors">
          {comic.title}
        </h3>

        {genres.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1 border-t border-[#27272e] pt-2">
            {genres.map((genre) => (
              <span
                key={genre.slug || genre.name}
                className="border border-[#27272e] bg-[#0c0c10] px-1.5 py-0.5 font-mono text-xs uppercase text-[#c8c2b6]"
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

const BaseComicCard = memo(BaseComicCardComponent);
export default BaseComicCard;
