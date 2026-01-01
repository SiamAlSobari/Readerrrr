import { Badge } from '@/common/shadcn-ui/badge'
import { Button } from '@/common/shadcn-ui/button'
import { ScrollArea } from '@/common/shadcn-ui/scroll-area'
import { Separator } from '@/common/shadcn-ui/separator'
import { createFileRoute } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DUMMY_COMICS } from '@/common/data/dummy'

export const Route = createFileRoute('/_main/genre/')({
  component: RouteComponent,
})



const GENRES = [
  { slug: 'action', name: 'Action' },
  { slug: 'adult', name: 'Adult' },
  { slug: 'drama', name: 'Drama' },
  { slug: 'fantasy', name: 'Fantasy' },
  { slug: 'horror', name: 'Horror' },
  { slug: 'isekai', name: 'Isekai' },
  { slug: 'romance', name: 'Romance' },
]



const gridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 18 },
}



function RouteComponent() {
  const [activeGenre, setActiveGenre] = useState('action')

  const filteredComics = useMemo(() => {
    return DUMMY_COMICS.filter((comic) =>
      comic.taxonomy.Genre!.some(
        (g) => g.slug === activeGenre,
      ),
    )
  }, [activeGenre])

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-[230px_1fr] gap-6">

        {/* ================= SIDEBAR ================= */}
        <aside className="rounded-xl border bg-background p-3">
          <h2 className="text-sm font-semibold mb-2">Genres</h2>
          <Separator className="mb-3" />

          <ScrollArea className="h-[420px]">
            <div className="space-y-1 pr-2">
              {GENRES.map((genre) => {
                const active = activeGenre === genre.slug

                return (
                  <Button
                    key={genre.slug}
                    variant="ghost"
                    onClick={() => setActiveGenre(genre.slug)}
                    className={`w-full justify-start rounded-lg text-sm transition
                      ${
                        active
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
        </aside>

        {/* ================= CONTENT ================= */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold capitalize">
              {activeGenre} Comics
            </h2>

            <Badge variant="secondary">
              {filteredComics.length} Result
            </Badge>
          </div>

          {filteredComics.length === 0 ? (
            <div className="text-sm text-muted-foreground">
              Tidak ada komik untuk genre ini
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGenre}
                variants={gridVariants}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
              >
                {filteredComics.map((comic) => (
                  <motion.div
                    key={comic.manga_id}
                    variants={cardVariants}
                    whileHover={{ y: -6 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-xl bg-muted shadow-sm">

                      {/* Cover */}
                      <div className="aspect-[3/4] overflow-hidden">
                        <img
                          src={comic.cover_image_url}
                          alt={comic.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition" />

                      {/* Chapter */}
                      <div className="absolute top-2 right-2 z-10">
                        <Badge className="text-xs">
                          Ch {comic.latest_chapter_number}
                        </Badge>
                      </div>

                      {/* Title */}
                      <div className="absolute bottom-0 z-10 p-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition">
                        <h3 className="text-sm font-semibold text-white line-clamp-2">
                          {comic.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </section>
      </div>
    </div>
  )
}
