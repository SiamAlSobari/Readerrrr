import { PopularComic } from "@/common/interface"
import { Link } from "@tanstack/react-router"
import { Clock, Star } from "lucide-react"
import { motion } from "framer-motion"

interface Props {
  comic: PopularComic
}

export function PopularComicCardBase({ comic }: Props) {
  const COUNTRY_MAP: Record<string, { label: string; flag: string; color: string }> = {
    KR: { label: "Manhwa", flag: "🇰🇷", color: "text-green-400" },
    JP: { label: "Manga", flag: "🇯🇵", color: "text-blue-400" },
    CN: { label: "Manhua", flag: "🇨🇳", color: "text-red-400" },
  }

  const country =
    COUNTRY_MAP[comic.country_id] ?? {
      label: "Comic",
      flag: "🌍",
      color: "text-gray-400",
    }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <Link
        to="/series/$comicId"
        params={{ comicId: comic.manga_id }}
        search={{ page: 1 }}
        className="block w-full"
      >
        <div className="group relative rounded-xl overflow-hidden bg-gray-900">
          {/* Cover */}
          <div className="aspect-3/4 overflow-hidden">
            <motion.img
              src={comic.cover_portrait_url}
              alt={comic.title}
              loading="lazy"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <div className="bg-red-600 px-3 py-1.5 rounded-lg text-xs font-bold text-white">
              #{comic.rank}
            </div>
            <div className="bg-black/70 px-3 py-1.5 rounded-lg text-xs font-bold text-white">
              {comic.status === 1 ? "Ongoing" : "Completed"}
            </div>
          </div>

          {/* Info */}
          <div className="mt-4 px-3 pb-4">
            <h3 className="font-bold text-sm line-clamp-2 text-white min-h-12">
              {comic.title}
            </h3>

            <div className="flex justify-between mt-3 text-xs">
              <span className="text-gray-400">
                Ch {comic.latest_chapter_number}
              </span>
              <span className={`font-bold ${country.color}`}>
                {country.flag} {country.label}
              </span>
            </div>
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none">
            <div className="absolute bottom-0 p-5 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-xl font-bold">
                  {comic.user_rate.toFixed(1)}
                </span>
              </div>

              <p className="text-sm">
                Chapter {comic.latest_chapter_number}
              </p>
              <p className="flex items-center gap-2 text-xs opacity-80">
                <Clock className="h-4 w-4" />
                {new Date(comic.latest_chapter_time).toLocaleDateString("id-ID")}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
