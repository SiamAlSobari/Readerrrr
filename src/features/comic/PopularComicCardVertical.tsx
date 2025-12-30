import { PopularComic } from "@/common/interface"
import { Eye, Bookmark, Star } from "lucide-react"

type Props = {
  comic: PopularComic
}

export function PopularComicCardVertical({ comic }: Props) {
  return (
    <div className="group relative flex gap-4 rounded-xl bg-background border p-4 hover:shadow-lg transition">
      
      {/* Cover */}
      <div className="relative w-24 shrink-0 overflow-hidden rounded-lg">
        <img
          src={comic.cover_portrait_url}
          alt={comic.title}
          className="h-36 w-full object-cover transition group-hover:scale-105"
        />

        {/* Rank */}
        <div className="absolute top-1 left-1 rounded bg-black/70 px-2 py-0.5 text-xs font-semibold text-white">
          #{comic.rank}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1">
        
        {/* Top */}
        <div className="space-y-1">
          <h3 className="line-clamp-1 font-semibold text-base">
            {comic.title}
          </h3>

          <p className="line-clamp-2 text-sm text-muted-foreground">
            {comic.description}
          </p>

          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
            <span>{comic.release_year}</span>
            <span>•</span>
            <span>{comic.country_id}</span>
            <span>•</span>
            <span>
              {comic.status === 1 ? "Ongoing" : "Completed"}
            </span>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between pt-2">
          
          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye size={14} />
              {comic.view_count.toLocaleString()}
            </span>

            <span className="flex items-center gap-1">
              <Bookmark size={14} />
              {comic.bookmark_count.toLocaleString()}
            </span>

            <span className="flex items-center gap-1 text-yellow-500">
              <Star size={14} />
              {comic.user_rate.toFixed(1)}
            </span>
          </div>

          {/* Latest Chapter */}
          <span className="text-xs font-medium">
            Ch {comic.latest_chapter_number}
          </span>
        </div>
      </div>
    </div>
  )
}
