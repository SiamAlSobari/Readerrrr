import { Star, Eye, Bookmark, Play } from "lucide-react"
import { Button } from "@/common/shadcn-ui/button"
import { Badge } from "@/common/shadcn-ui/badge"

export function ComicDetail({ comic }: { comic: any }) {
  return (
    <section className="relative">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 h-105 bg-cover bg-center blur-2xl opacity-30"
        style={{ backgroundImage: `url(${comic.cover_image_url})` }}
      />
      <div className="relative mx-auto max-w-7xl px-4 pt-24">

        {/* HEADER */}
        <div className="flex flex-col gap-8 md:flex-row">
          {/* COVER */}
          <img
            src={comic.cover_portrait_url}
            className="w-48 shrink-0 rounded-xl shadow-2xl"
          />

          {/* INFO */}
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold text-white">
              {comic.title}
            </h1>

            <p className="text-gray-400 italic">
              {comic.alternative_title}
            </p>

            {/* STATS */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-300">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                {comic.user_rate}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {comic.view_count.toLocaleString()}
              </span>
              <span>Rank #{comic.rank}</span>
            </div>

            {/* GENRES */}
            <div className="flex flex-wrap gap-2">
              {comic.taxonomy.Genre.map((g: any) => (
                <Badge key={g.slug} variant="secondary">
                  {g.name}
                </Badge>
              ))}
            </div>

            {/* CTA */}
            <div className="flex gap-3 pt-4">
              <Button className="gap-2 bg-red-500 hover:bg-red-600">
                <Play className="h-4 w-4" />
                Read Latest
              </Button>
              <Button variant="secondary" className="gap-2">
                <Bookmark className="h-4 w-4" />
                Bookmark
              </Button>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-10 max-w-4xl space-y-3">
          <h2 className="text-xl font-semibold text-white">Synopsis</h2>
          <p className="whitespace-pre-line text-gray-300 leading-relaxed">
            {comic.description}
          </p>
        </div>
      </div>
    </section>
  )
}
