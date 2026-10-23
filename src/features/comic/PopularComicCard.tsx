import { PopularComic } from "@/common/interface";
import { Link } from "@tanstack/react-router";
import { Star, Eye, Bookmark } from "lucide-react";
import { useState, memo } from "react";

interface Props {
  comic: PopularComic;
}

const COUNTRY_CODE: Record<string, string> = {
  KR: "KR · MANHWA",
  JP: "JP · MANGA",
  CN: "CN · MANHUA",
};

function PopularComicCardComponent({ comic }: Props) {
  const [imgError, setImgError] = useState(false);
  const originCode = COUNTRY_CODE[comic.country_id] || "INT · KOMIK";

  return (
    <Link
      search={{ page: 1 }}
      params={{ comicId: comic.manga_id }}
      to="/series/$comicId"
      className="group flex h-full flex-col border border-[#27272e] bg-[#101014] transition-colors duration-150 hover:border-[#f4f1ea] hover:bg-[#141418] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f43f5e]"
    >
      {/* Top Rank & Rating Bar */}
      <div className="flex items-center justify-between border-b border-[#27272e] bg-[#0c0c10] px-3 py-2 font-mono text-xs font-bold tabular-nums">
        <span className="bg-[#be123c] px-2 py-0.5 text-[#f4f1ea]">
          #{String(comic.rank || 1).padStart(2, "0")}
        </span>
        <span className="text-[#c8c2b6]">{originCode}</span>
        <span className="flex items-center gap-1 text-[#fbbf24]">
          <Star className="h-3.5 w-3.5 fill-[#fbbf24] text-[#fbbf24]" />
          {comic.user_rate ? comic.user_rate.toFixed(1) : "N/A"}
        </span>
      </div>

      {/* Horizontal or Compact Tankobon Spread */}
      <div className="flex flex-1 gap-3.5 p-3.5">
        <div className="relative h-32 w-24 shrink-0 overflow-hidden border border-[#27272e] bg-[#141418]">
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
            <div className="flex h-full w-full items-center justify-center p-2 text-center font-mono text-xs font-bold uppercase text-[#c8c2b6]">
              {comic.title}
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <h3 className="line-clamp-2 font-sans text-sm font-bold leading-snug text-[#f4f1ea] group-hover:text-[#f43f5e] transition-colors">
              {comic.title}
            </h3>
            <p className="mt-1.5 font-mono text-xs font-bold text-[#f43f5e] tabular-nums">
              CH. {comic.latest_chapter_number}
            </p>
          </div>

          <div className="space-y-1.5 border-t border-[#27272e] pt-2 font-mono text-xs text-[#c8c2b6] tabular-nums">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {comic.view_count ? comic.view_count.toLocaleString("id-ID") : "0"}
              </span>
              <span className="flex items-center gap-1">
                <Bookmark className="h-3 w-3" />
                {comic.bookmark_count ? comic.bookmark_count.toLocaleString("id-ID") : "0"}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span>RILIS {comic.release_year || "-"}</span>
              <span className="text-[#34d399]">
                {comic.latest_chapter_time
                  ? new Date(comic.latest_chapter_time).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                    })
                  : " AKTIF"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

const PopularComicCard = memo(PopularComicCardComponent);
export default PopularComicCard;
