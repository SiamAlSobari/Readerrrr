import { Star, Eye,  Play, ArrowLeft } from "lucide-react"
import { Button } from "@/common/shadcn-ui/button"
import { Badge } from "@/common/shadcn-ui/badge"
import { useState } from "react"
import { ComicDetail as ComicDetailType } from "@/common/interface"
import {  useNavigate } from "@tanstack/react-router"

export function ComicDetail({ comic }: { comic: ComicDetailType }) {
    const navigation = useNavigate()
    const [imageError, setImageError] = useState({
        cover: false,
        portrait: false,
    })

    const coverUrl = comic.cover_image_url?.trim()
    const portraitUrl = comic.cover_portrait_url?.trim()

    return (
        <section className="relative w-full min-h-125 md:min-h-150 overflow-hidden">
            {/* Background */}
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

            {/* KONTEN */}
            <div className="relative z-20 flex flex-col gap-6 p-4 sm:p-6 md:p-10">
                {/* 🔙 BUTTON KEMBALI */}
                <div>
                        <Button
                            variant="secondary"
                            className="gap-2 bg-white/10 hover:bg-white/20 text-white"
                            onClick={() => navigation({ to: "/" })}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Kembali
                        </Button>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Poster */}
                    <div className="shrink-0 mx-auto md:mx-0">
                        {portraitUrl && !imageError.portrait ? (
                            <img
                                src={portraitUrl}
                                alt={comic.title}
                                className="rounded-2xl shadow-2xl w-40 sm:w-52 md:w-64"
                                onError={() =>
                                    setImageError(prev => ({ ...prev, portrait: true }))
                                }
                                loading="lazy"
                            />
                        ) : (
                            <div className="w-40 sm:w-52 md:w-64 h-80 rounded-2xl bg-gray-800 flex items-center justify-center">
                                <span className="text-gray-400">No Image</span>
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 space-y-4">
                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            {comic.title}
                        </h1>

                        <p className="text-gray-400 italic">
                            {comic.alternative_title || ""}
                        </p>

                        <div className="flex gap-4 text-sm text-gray-300">
                            <span className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                {comic.user_rate || "N/A"}
                            </span>
                            <span className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                {comic.view_count?.toLocaleString() || "0"}
                            </span>
                            <span>Rank #{comic.rank || "N/A"}</span>
                        </div>

                        {/* Genre */}
                        <div className="flex flex-wrap gap-2">
                            {comic.taxonomy?.Genre?.length ? (
                                comic.taxonomy.Genre.map((g) => (
                                    <Badge
                                        key={g.slug}
                                        className="bg-white/10 text-gray-200"
                                    >
                                        {g.name}
                                    </Badge>
                                ))
                            ) : (
                                <span className="text-gray-400">No genres</span>
                            )}
                        </div>

                        {/* Synopsis */}
                        <p className="text-gray-300 max-h-36 overflow-y-auto">
                            {comic.description || "No description available."}
                        </p>

                        {/* CTA */}
                        <div className="flex gap-4 pt-4">
                            <Button onClick={() => navigation({
                                to:'/read/$comicId/$chapterId',
                                params: {chapterId: comic.latest_chapter_id, comicId: comic.manga_id}
                            })} className="bg-red-500 hover:bg-red-600 gap-2">
                                <Play className="w-5 h-5" />
                                {comic.latest_chapter_number
                                    ? `Read Chapter ${comic.latest_chapter_number}`
                                    : "Start Reading"}
                            </Button>

                            {/* <Button
                                variant="secondary"
                                className="bg-white/10 hover:bg-white/20 text-white gap-2"
                            >
                                <Bookmark className="w-5 h-5" />
                                Bookmark
                            </Button> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
