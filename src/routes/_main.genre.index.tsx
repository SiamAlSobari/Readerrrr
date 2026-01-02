import { Badge } from '@/common/shadcn-ui/badge'
import { Button } from '@/common/shadcn-ui/button'
import { ScrollArea } from '@/common/shadcn-ui/scroll-area'
import { Separator } from '@/common/shadcn-ui/separator'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getComicGenre, getGenreList } from '@/api/servers/shinigami.server'
import { useServerFn } from '@tanstack/react-start'
import { useQuery } from '@tanstack/react-query'
import { BookOpen, SearchX } from 'lucide-react'
import LoadingGrid from '@/features/comic/LoadingGrid'
import GenreList from '@/features/genre/GenreList'

export const Route = createFileRoute('/_main/genre/')({
  component: RouteComponent,
  loader: async () => {
    const genres = await getGenreList()
    return { genres }
  },
})

/* ================= ANIMATION ================= */
const gridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
}

/* ================= LOADING SKELETON ================= */


/* ================= NO RESULT ================= */
function NoResult() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
        className="mb-4"
      >
        <SearchX className="w-14 h-14 text-muted-foreground" />
      </motion.div>

      <h3 className="font-semibold text-lg">Tidak ada komik</h3>
      <p className="text-sm text-muted-foreground max-w-sm">
        Komik dengan genre ini belum tersedia atau sedang kosong
      </p>
    </motion.div>
  )
}

/* ================= PAGE ================= */
function RouteComponent() {
  const { genres } = Route.useLoaderData()
  const comicGenre = useServerFn(getComicGenre)
  const [activeGenre, setActiveGenre] = useState('action')

  const {
    data: comics,
    isLoading,
  } = useQuery({
    queryKey: ['genre', activeGenre],
    queryFn: () => comicGenre({ data: { genre: activeGenre } }),
  })

  const list = comics?.data.data ?? []

  return (
    <div className="mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-[230px_1fr] gap-6">
        <GenreList activeGenre={activeGenre} setActiveGenre={setActiveGenre} genres={genres.data.data} />
{/* 
        <aside className="rounded-xl border bg-background p-3">
          <h2 className="text-sm font-semibold mb-2">Genres</h2>
          <Separator className="mb-3" />

          <ScrollArea className="h-120">
            <div className="grid grid-cols-2 gap-1 pr-2">
              {genres.data.data.map((genre) => {
                const active = activeGenre === genre.slug

                return (
                  <Button
                    key={genre.slug}
                    variant="ghost"
                    onClick={() => setActiveGenre(genre.slug)}
                    className={`justify-start rounded-lg text-sm transition
                      ${active
                        ? 'bg-primary/10 text-primary font-semibold border-l-4 border-primary'
                        : 'text-muted-foreground hover:bg-muted'
                      }`}
                  >
                    {genre.name}
                  </Button>
                )
              })}
            </div>
          </ScrollArea>
        </aside> */}

        {/* ================= CONTENT ================= */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold capitalize">
              {activeGenre} Comics
            </h2>

            <Badge variant="secondary">
              {isLoading ? 'Loading...' : `${list.length} Result`}
            </Badge>
          </div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <LoadingGrid key="loading" />
            ) : list.length === 0 ? (
              <NoResult key="empty" />
            ) : (
              <motion.div
                key={activeGenre}
                variants={gridVariants}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
              >
                {list.map((comic) => (
                  <Link
                    key={comic.manga_id}
                    to="/series/$comicId"
                    params={{ comicId: comic.manga_id }}
                    search={{ page: 1 }}
                  >
                    <motion.div
                      variants={cardVariants}
                      whileHover={{ y: -6 }}
                      className="group cursor-pointer"
                    >
                      <div className="relative overflow-hidden rounded-xl bg-muted shadow-sm">
                        <div className="aspect-[3/4] overflow-hidden">
                          <img
                            src={comic.cover_image_url}
                            alt={comic.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition" />

                        <div className="absolute top-2 right-2 z-10">
                          <Badge className="text-xs">
                            Ch {comic.latest_chapter_number}
                          </Badge>
                        </div>

                        <div className="absolute bottom-0 z-10 p-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition">
                          <h3 className="text-sm font-semibold text-white line-clamp-2">
                            {comic.title}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  )
}
