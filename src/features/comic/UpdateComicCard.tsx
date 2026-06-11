import { UpdateComic } from "@/common/interface"
import { Link } from "@tanstack/react-router"
import { Star, Eye, Bookmark, Clock, Calendar, Globe } from "lucide-react"
import { useState } from "react"

interface Props {
  comic: UpdateComic
  variant?: "default" | "compact" | "featured"
}

export default function UpdateComicCard({ comic, variant = "default" }: Props) {
  const [imageError, setImageError] = useState(false)

  // Format waktu relatif
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" })
  }

  // Map negara
  const countryMap = {
    KR: { name: "Korea", flag: "🇰🇷", color: "border-emerald-500 bg-emerald-500/10 text-emerald-300" },
    JP: { name: "Japan", flag: "🇯🇵", color: "border-red-500 bg-red-500/10 text-red-300" },
    CN: { name: "China", flag: "🇨🇳", color: "border-orange-500 bg-orange-500/10 text-orange-300" },
    ID: { name: "Indonesia", flag: "🇮🇩", color: "border-blue-500 bg-blue-500/10 text-blue-300" },
  }

  const country = countryMap[comic.country_id as keyof typeof countryMap] ||
    { name: comic.country_id, flag: "🌐", color: "border-gray-500 bg-gray-500/10 text-gray-300" }

  // Format status
  const statusMap = {
    0: { text: "Ongoing", color: "bg-green-500" },
    1: { text: "Completed", color: "bg-blue-500" },
    2: { text: "Hiatus", color: "bg-yellow-500" },
    3: { text: "Dropped", color: "bg-red-500" },
  }

  const status = statusMap[comic.status as keyof typeof statusMap] || { text: "Unknown", color: "bg-gray-500" }

  if (variant === "compact") {
    return (
      <div className="group relative flex gap-3 p-3 bg-linear-to-br from-gray-900/50 to-black/50 rounded-xl hover:bg-gray-800/40 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-purple-500/10">
        {/* Background effect */}
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-purple-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

        <div className="relative w-20 h-28 shrink-0 overflow-hidden rounded-lg">
          <img
            src={imageError ? "/placeholder-comic.jpg" : comic.cover_image_url}
            alt={comic.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />

          {/* Chapter badge */}
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/90 backdrop-blur-sm px-2 py-1 rounded-md">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white text-xs font-bold">Ch{comic.latest_chapter_number}</span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-white font-semibold line-clamp-1 mb-1 text-sm group-hover:text-purple-300 transition-colors">
            {comic.title}
          </h4>

          <p className="text-gray-400 text-xs line-clamp-2 mb-2">
            {comic.alternative_title || comic.description.split('\n')[0]}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-yellow-400 text-xs font-semibold">{comic.user_rate.toFixed(1)}</span>
              </div>

              <div className={`px-2 py-0.5 rounded-full border text-xs ${country.color}`}>
                {country.flag}
              </div>
            </div>

            <span className="text-green-400 text-xs font-medium">
              {formatTimeAgo(comic.chapters[0]?.created_at || comic.updated_at)}
            </span>
          </div>
        </div>
      </div>
    )
  }

  // Default variant
  return (
    <Link search={{page: 1}} params={{ comicId: comic.manga_id }} to="/series/$comicId">


      <div className="group relative overflow-hidden rounded-xl bg-linear-to-br from-gray-900/50 via-gray-900/30 to-black/50 p-4 transition-all duration-300 hover:scale-[1.02] hover:bg-gray-800/40 hover:shadow-xl hover:shadow-purple-500/10">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-linear-to-r from-purple-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative flex gap-4">
          {/* Image section */}
          <div className="relative w-28 h-40 shrink-0 overflow-hidden rounded-lg">
            <img
              src={imageError ? "/placeholder-comic.jpg" : comic.cover_image_url}
              alt={comic.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={() => setImageError(true)}
            />

            {/* Chapter badge */}
            <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-lg">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white text-sm font-bold">Ch{comic.latest_chapter_number}</span>
            </div>

            {/* Status badge */}
            <div className={`absolute top-2 right-2 ${status.color} px-2 py-1 rounded-md text-xs font-semibold text-white`}>
              {status.text}
            </div>

            {/* Year badge */}
            <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-white">
              <Calendar className="inline w-3 h-3 mr-1" />
              {comic.release_year || "N/A"}
            </div>
          </div>

          {/* Content section */}
          <div className="flex-1 min-w-0 space-y-3">
            {/* Title row */}
            <div>
              <h4 className="text-white font-bold text-lg line-clamp-1 mb-1 group-hover:text-purple-300 transition-colors">
                {comic.title}
              </h4>
              {comic.alternative_title && (
                <p className="text-gray-400 text-sm line-clamp-1 italic">
                  {comic.alternative_title}
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm line-clamp-2">
              {comic.description.split('\n')[0]}
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-yellow-400">{comic.user_rate.toFixed(1)}</span>
                </div>
                <span className="text-gray-400">Rating</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-blue-400" />
                <span className="font-semibold text-white">
                  {(comic.view_count / 1000).toFixed(1)}k
                </span>
                <span className="text-gray-400">Views</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Bookmark className="w-4 h-4 text-pink-400" />
                <span className="font-semibold text-white">
                  {(comic.bookmark_count / 1000).toFixed(1)}k
                </span>
                <span className="text-gray-400">Saves</span>
              </div>
            </div>

            {/* Genre tags */}
            {comic.taxonomy.Genre && comic.taxonomy.Genre.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {comic.taxonomy.Genre.slice(0, 3).map((genre, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-800/50 text-gray-300 rounded-md text-xs"
                  >
                    {genre.name}
                  </span>
                ))}
                {comic.taxonomy.Genre.length > 3 && (
                  <span className="px-2 py-1 bg-gray-800/50 text-gray-400 rounded-md text-xs">
                    +{comic.taxonomy.Genre.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Bottom info row */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-800/50">
              <div className="flex items-center gap-3">
                {/* Country */}
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${country.color}`}>
                  <Globe className="w-3 h-3" />
                  <span className="text-xs font-medium">{country.name}</span>
                </div>

                {/* Latest update */}
                <div className="flex items-center gap-1.5 text-green-400">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs font-medium">
                    {formatTimeAgo(comic.chapters[0]?.created_at || comic.updated_at)}
                  </span>
                </div>
              </div>

              {/* Rank badge */}
              {comic.rank && comic.rank <= 100 && (
                <div className="flex items-center gap-1 bg-linear-to-r from-purple-500/20 to-pink-500/20 px-3 py-1 rounded-full">
                  <span className="text-xs font-bold bg-linear-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                    Rank #{comic.rank}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recommended badge */}
        {comic.is_recommended && (
          <div className="absolute -top-2 -right-2">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-yellow-500 to-orange-500 rounded-lg blur-sm" />
              <div className="relative bg-linear-to-r from-yellow-400 to-orange-400 px-3 py-1 rounded-lg text-xs font-bold text-black">
                🔥 Recommended
              </div>
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}