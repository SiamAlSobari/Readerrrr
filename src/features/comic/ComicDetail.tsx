import { Star, Eye, Bookmark, Play } from "lucide-react"
import { Button } from "@/common/shadcn-ui/button"
import { Badge } from "@/common/shadcn-ui/badge"
import { useState } from "react"

export function ComicDetail({ comic }: { comic: any }) {
    const [imageError, setImageError] = useState({
        cover: false,
        portrait: false,
    })

    const coverUrl = comic.cover_image_url?.trim()
    const portraitUrl = comic.cover_portrait_url?.trim()



    return (
        <section className="relative w-full min-h-125 md:min-h-150 overflow-hidden">
            <div className="absolute inset-0 z-0">
                {coverUrl && !imageError.cover ? (
                    <img
                        src={coverUrl}
                        alt="Comic cover background"
                        className="w-full h-full blur-xl object-cover object-center"
                        onError={() => setImageError(prev => ({ ...prev, cover: true }))}
                    />
                ) : (
                    <div className="w-full h-full bg-linear-to-b from-indigo-900 to-black" />
                )}
            </div>

            <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent z-10" />

            {/* Konten utama */}
            <div className="relative z-20 flex flex-col md:flex-row gap-6 p-4 sm:p-6 md:p-10">
                {/* Poster Portrait */}
                <div className="shrink-0 mx-auto md:mx-0">
                    <div className="relative">
                        {portraitUrl && !imageError.portrait ? (
                            <img
                                src={portraitUrl}
                                alt={comic.title}
                                className="rounded-2xl shadow-2xl w-40 sm:w-52 md:w-64 h-auto object-cover"
                                onError={() => setImageError(prev => ({ ...prev, portrait: true }))}
                                loading="lazy"
                            />
                        ) : (
                            <div className="w-40 sm:w-52 md:w-64 h-80 md:h-98 rounded-2xl bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                <span className="text-gray-400 text-center">No Image</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Info Comic */}
                <div className="flex-1 flex flex-col justify-between gap-4 md:gap-6">
                    <div className="space-y-2 md:space-y-3">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                            {comic.title}
                        </h1>
                        <p className="text-gray-400 italic">{comic.alternative_title || ''}</p>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                            <span className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                {comic.user_rate || 'N/A'}
                            </span>
                            <span className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                {comic.view_count?.toLocaleString() || '0'}
                            </span>
                            <span>Rank #{comic.rank || 'N/A'}</span>
                        </div>

                        {/* Genres */}
                        <div className="flex flex-wrap gap-2 mt-2">
                            {comic.taxonomy?.Genre?.length > 0 ? (
                                comic.taxonomy.Genre.map((g: any) => (
                                    <Badge
                                        key={g.slug}
                                        className="bg-white/10 text-gray-200 hover:bg-white/20 rounded-full"
                                    >
                                        {g.name}
                                    </Badge>
                                ))
                            ) : (
                                <span className="text-gray-400">No genres</span>
                            )}
                        </div>

                        {/* Synopsis */}
                        <p className="mt-4 max-h-36 overflow-y-auto text-gray-300 leading-relaxed pr-2 scrollbar-thin">
                            {comic.description || 'No description available.'}
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 mt-4">
                        <Button className="gap-2 bg-red-500 hover:bg-red-600 h-12 px-6 flex items-center">
                            <Play className="w-5 h-5" />
                            {comic.latest_chapter_number
                                ? `Read Chapter ${comic.latest_chapter_number}`
                                : 'Start Reading'
                            }
                        </Button>
                        <Button
                            variant="secondary"
                            className="gap-2 bg-white/10 hover:bg-white/20 h-12 px-6 text-white flex items-center"
                        >
                            <Bookmark className="w-5 h-5" />
                            Bookmark
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}