import { UpdateComic } from "@/common/interface";
import { Link } from "@tanstack/react-router";
import { Star, Eye, Bookmark, Clock, Calendar, Globe } from "lucide-react";
import { useState } from "react";

interface Props {
  comic: UpdateComic;
  variant?: "default" | "compact" | "featured";
}

export default function UpdateComicCard({ comic, variant = "default" }: Props) {
  const [imageError, setImageError] = useState(false);

  const formatTimeAgo = (dateString: string) => {
    if (!dateString) return "Baru saja";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${Math.max(1, diffMins)}m lalu`;
    if (diffHours < 24) return `${diffHours}j lalu`;
    if (diffDays < 7) return `${diffDays}h lalu`;
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  };

  const countryMap = {
    KR: { name: "Korea", flag: "🇰🇷", color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" },
    JP: { name: "Japan", flag: "🇯🇵", color: "border-red-500/30 bg-red-500/10 text-red-300" },
    CN: { name: "China", flag: "🇨🇳", color: "border-amber-500/30 bg-amber-500/10 text-amber-300" },
    ID: { name: "Indonesia", flag: "🇮🇩", color: "border-blue-500/30 bg-blue-500/10 text-blue-300" },
  };

  const country = countryMap[comic.country_id as keyof typeof countryMap] ||
    { name: comic.country_id || "Global", flag: "🌐", color: "border-zinc-700 bg-zinc-800/50 text-zinc-300" };

  const statusMap = {
    0: { text: "Ongoing", color: "bg-emerald-500" },
    1: { text: "Completed", color: "bg-blue-500" },
    2: { text: "Hiatus", color: "bg-amber-500" },
    3: { text: "Dropped", color: "bg-red-500" },
  };

  const status = statusMap[comic.status as keyof typeof statusMap] || { text: "Ongoing", color: "bg-emerald-500" };

  if (variant === "compact") {
    return (
      <Link search={{ page: 1 }} params={{ comicId: comic.manga_id }} to="/series/$comicId">
        <div className="group relative flex gap-3 p-2.5 bg-zinc-900/40 border border-zinc-850 hover:border-zinc-750 rounded-xl hover:bg-zinc-850/60 transition-all duration-200 cursor-pointer">
          <div className="relative w-16 h-22 shrink-0 overflow-hidden rounded-lg bg-zinc-800">
            {!imageError && comic.cover_image_url ? (
              <img
                src={comic.cover_image_url}
                alt={comic.title}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-[10px] text-zinc-500 font-bold p-1 text-center">
                {comic.title}
              </div>
            )}

            <div className="absolute top-1.5 left-1.5 flex items-center gap-1 bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded-md">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white text-[10px] font-bold">Ch. {comic.latest_chapter_number}</span>
            </div>
          </div>

          <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
            <div>
              <h4 className="text-white font-bold line-clamp-1 text-xs group-hover:text-red-400 transition-colors">
                {comic.title}
              </h4>
              <p className="text-zinc-400 text-[11px] line-clamp-1 mt-0.5">
                {comic.alternative_title || (comic.description ? comic.description.split("\n")[0] : "")}
              </p>
            </div>

            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-1.5">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="text-amber-400 text-[11px] font-bold">{comic.user_rate ? comic.user_rate.toFixed(1) : "N/A"}</span>
              </div>

              <span className="text-emerald-400 text-[11px] font-medium">
                {formatTimeAgo(comic.chapters?.[0]?.created_at || comic.updated_at)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link search={{ page: 1 }} params={{ comicId: comic.manga_id }} to="/series/$comicId">
      <div className="group relative overflow-hidden rounded-2xl bg-zinc-900/50 border border-zinc-800/80 p-3.5 transition-all duration-300 hover:scale-[1.01] hover:border-zinc-700 hover:bg-zinc-900/90 hover:shadow-xl">
        <div className="relative flex gap-3.5">
          {/* Image section */}
          <div className="relative w-28 h-40 shrink-0 overflow-hidden rounded-xl bg-zinc-800 shadow-md">
            {!imageError && comic.cover_image_url ? (
              <img
                src={comic.cover_image_url}
                alt={comic.title}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-500 text-xs font-bold p-2 text-center">
                {comic.title}
              </div>
            )}

            {/* Chapter badge */}
            <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/85 backdrop-blur-md px-2 py-0.5 rounded-md shadow-md border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white text-xs font-bold">Ch. {comic.latest_chapter_number}</span>
            </div>

            {/* Status badge */}
            <div className={`absolute top-2 right-2 ${status.color} px-1.5 py-0.5 rounded-md text-[10px] font-bold text-white uppercase shadow-md`}>
              {status.text}
            </div>

            {/* Year badge */}
            {comic.release_year && (
              <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] text-white">
                <Calendar className="inline w-3 h-3 mr-0.5" />
                {comic.release_year}
              </div>
            )}
          </div>

          {/* Content section */}
          <div className="flex-1 min-w-0 space-y-2">
            <div>
              <h4 className="text-white font-extrabold text-base line-clamp-1 group-hover:text-red-400 transition-colors">
                {comic.title}
              </h4>
              {comic.alternative_title && (
                <p className="text-zinc-400 text-xs line-clamp-1 italic mt-0.5">
                  {comic.alternative_title}
                </p>
              )}
            </div>

            {comic.description && (
              <p className="text-zinc-300 text-xs line-clamp-2">
                {comic.description.split("\n")[0]}
              </p>
            )}

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-3 text-xs pt-1">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold text-amber-400">{comic.user_rate ? comic.user_rate.toFixed(1) : "N/A"}</span>
              </div>

              {comic.view_count > 0 && (
                <div className="flex items-center gap-1 text-zinc-300">
                  <Eye className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{(comic.view_count / 1000).toFixed(1)}k</span>
                </div>
              )}

              {comic.bookmark_count > 0 && (
                <div className="flex items-center gap-1 text-zinc-300">
                  <Bookmark className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{(comic.bookmark_count / 1000).toFixed(1)}k</span>
                </div>
              )}
            </div>

            {/* Bottom info row */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80">
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] ${country.color}`}>
                  <Globe className="w-2.5 h-2.5" />
                  <span className="font-medium">{country.name}</span>
                </div>

                <div className="flex items-center gap-1 text-emerald-400">
                  <Clock className="w-3 h-3" />
                  <span className="text-[11px] font-semibold">
                    {formatTimeAgo(comic.chapters?.[0]?.created_at || comic.updated_at)}
                  </span>
                </div>
              </div>

              {comic.rank && comic.rank <= 100 && (
                <span className="text-xs font-bold text-amber-400">
                  #{comic.rank}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}