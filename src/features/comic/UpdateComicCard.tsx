import { UpdateComic } from "@/common/interface";
import { Link } from "@tanstack/react-router";
import { Star, Eye, Clock } from "lucide-react";
import { useState, memo } from "react";

interface Props {
  comic: UpdateComic;
  variant?: "default" | "compact" | "featured";
}

const COUNTRY_CODE: Record<string, string> = {
  KR: "KR · MANHWA",
  JP: "JP · MANGA",
  CN: "CN · MANHUA",
  ID: "ID · KOMIK",
};

const STATUS_MAP: Record<number, { text: string; tone: string }> = {
  0: { text: "ONGOING", tone: "text-[#34d399]" },
  1: { text: "TAMAT", tone: "text-[#fbbf24]" },
  2: { text: "HIATUS", tone: "text-[#c8c2b6]" },
  3: { text: "DROPPED", tone: "text-[#f43f5e]" },
};

function formatTimeAgo(dateString?: string) {
  if (!dateString) return "BARU SAJA";
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${Math.max(1, diffMins)}M LALU`;
  if (diffHours < 24) return `${diffHours}J LALU`;
  if (diffDays < 7) return `${diffDays}H LALU`;
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" }).toUpperCase();
}

function UpdateComicCardComponent({ comic, variant = "default" }: Props) {
  const [imageError, setImageError] = useState(false);

  const originCode = COUNTRY_CODE[comic.country_id] || "INT · KOMIK";
  const status = STATUS_MAP[comic.status as number] || STATUS_MAP[0];
  const timeStamp = formatTimeAgo(
    comic.latest_chapter_time || comic.chapters?.[0]?.created_at || comic.updated_at
  );

  if (variant === "compact") {
    return (
      <Link
        search={{ page: 1 }}
        params={{ comicId: comic.manga_id }}
        to="/series/$comicId"
        className="group flex gap-3 border border-[#27272e] bg-[#101014] p-2.5 transition-colors hover:border-[#f4f1ea] hover:bg-[#141418]"
      >
        <div className="relative h-20 w-15 shrink-0 overflow-hidden border border-[#27272e] bg-[#141418]">
          {!imageError && comic.cover_image_url ? (
            <img
              src={comic.cover_image_url}
              alt={comic.title}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center p-1 text-center font-mono text-xs font-bold uppercase text-[#c8c2b6]">
              {comic.title}
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
          <div>
            <div className="flex items-center justify-between gap-2 font-mono text-xs font-bold uppercase tabular-nums">
              <span className="text-[#f43f5e]">CH. {comic.latest_chapter_number}</span>
              <span className="text-[#c8c2b6]">{timeStamp}</span>
            </div>
            <h4 className="mt-1 line-clamp-1 font-sans text-xs font-bold text-[#f4f1ea] group-hover:text-[#f43f5e] transition-colors">
              {comic.title}
            </h4>
          </div>

          <div className="flex items-center justify-between font-mono text-xs text-[#c8c2b6] tabular-nums">
            <span>{originCode}</span>
            <span className="flex items-center gap-1 text-[#fbbf24]">
              <Star className="h-3 w-3 fill-[#fbbf24] text-[#fbbf24]" />
              {comic.user_rate ? comic.user_rate.toFixed(1) : "N/A"}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      search={{ page: 1 }}
      params={{ comicId: comic.manga_id }}
      to="/series/$comicId"
      className="group flex gap-3.5 border border-[#27272e] bg-[#101014] p-3 transition-colors duration-150 hover:border-[#f4f1ea] hover:bg-[#141418] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f43f5e]"
    >
      {/* Cover image */}
      <div className="relative h-28 w-20 shrink-0 overflow-hidden border border-[#27272e] bg-[#141418]">
        {!imageError && comic.cover_image_url ? (
          <img
            src={comic.cover_image_url}
            alt={comic.title}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-2 text-center font-mono text-xs font-bold uppercase text-[#c8c2b6]">
            {comic.title}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 font-mono text-xs font-bold uppercase tabular-nums">
            <span className="bg-[#be123c] px-1.5 py-0.5 text-[#f4f1ea]">
              CH. {comic.latest_chapter_number}
            </span>
            <span className={`text-xs ${status.tone}`}>{status.text}</span>
          </div>

          <h3 className="mt-1.5 line-clamp-1 font-sans text-sm font-bold text-[#f4f1ea] group-hover:text-[#f43f5e] transition-colors">
            {comic.title}
          </h3>

          <p className="mt-0.5 line-clamp-1 font-mono text-xs text-[#c8c2b6]">
            {originCode}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-[#27272e] pt-2 font-mono text-xs text-[#c8c2b6] tabular-nums">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1 text-[#fbbf24]">
              <Star className="h-3 w-3 fill-[#fbbf24] text-[#fbbf24]" />
              {comic.user_rate ? comic.user_rate.toFixed(1) : "N/A"}
            </span>
            {comic.view_count > 0 && (
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {(comic.view_count / 1000).toFixed(1)}K
              </span>
            )}
          </div>

          <span className="flex items-center gap-1 text-[#34d399]">
            <Clock className="h-3 w-3" />
            {timeStamp}
          </span>
        </div>
      </div>
    </Link>
  );
}

const UpdateComicCard = memo(UpdateComicCardComponent);
export default UpdateComicCard;
