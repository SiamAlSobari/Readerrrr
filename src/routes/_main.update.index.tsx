import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/common/shadcn-ui/button'
import { Badge } from '@/common/shadcn-ui/badge'
import { Eye, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { UpdateComic } from '@/common/interface'
import { UPDATE_COMICS_DUMMY } from '@/common/data/dummy'

export const Route = createFileRoute('/_main/update/')({
  component: RouteComponent,
})

function ComicCard({ comic }: { comic: UpdateComic }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative overflow-hidden rounded-xl bg-zinc-900/90 shadow-lg border border-zinc-800 hover:border-zinc-600 transition-all duration-300"
    >
      <img
        src={comic.cover_image_url}
        alt={comic.title}
        className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Actions */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button size="sm" className="w-32 shadow-md">
          <Eye className="mr-2 h-4 w-4" />
          Detail
        </Button>
        <Button size="sm" variant="secondary" className="w-32 shadow-md">
          <BookOpen className="mr-2 h-4 w-4" />
          Read
        </Button>
      </div>

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
        <h3 className="line-clamp-2 text-base font-semibold text-white mb-1">
          {comic.title}
        </h3>
        <p className="text-xs text-zinc-300">
          Ch {comic.latest_chapter_number} • {formatDistanceToNow(new Date(comic.latest_chapter_time))} ago
        </p>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {comic.taxonomy.Genre?.slice(0, 2).map((g) => (
            <Badge key={g.name} variant="secondary" className="text-xs px-2 py-0.5">
              {g.name}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function RouteComponent() {
  const [type, setType] = useState<'mirror' | 'project'>('mirror')
  const [page, setPage] = useState(1)

  return (
    <div className="min-h-screen px-4 py-6 md:px-6 lg:px-8">
      <div className="flex flex-col gap-6 md:flex-row md:gap-8">
        {/* SIDEBAR - jadi lebih mobile-friendly */}
        <aside className="md:w-64 shrink-0">
          <h2 className="text-xl font-semibold mb-4 hidden md:block">Update Type</h2>
          <div className="flex gap-3 md:flex-col md:gap-2 bg-zinc-900/50 p-3 md:p-0 rounded-xl md:bg-transparent border border-zinc-800 md:border-none">
            <Button
              className="flex-1 justify-center md:justify-start text-sm md:text-base"
              variant={type === 'mirror' ? 'default' : 'ghost'}
              onClick={() => setType('mirror')}
            >
              Mirror Comic
            </Button>
            <Button
              className="flex-1 justify-center md:justify-start text-sm md:text-base"
              variant={type === 'project' ? 'default' : 'ghost'}
              onClick={() => setType('project')}
            >
              Project Comic
            </Button>
          </div>
        </aside>

        {/* CONTENT */}
        <div className="flex-1 space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
            >
              {UPDATE_COMICS_DUMMY.map((comic) => (
                <ComicCard key={comic.manga_id} comic={comic} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* PAGINATION - lebih rapi & mobile friendly */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button
              size="icon"
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="h-10 w-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {[1, 2, 3, 4, 5].map((p) => (
              <Button
                key={p}
                size="sm"
                variant={page === p ? 'default' : 'outline'}
                onClick={() => setPage(p)}
                className="h-10 w-10 text-sm font-medium"
              >
                {p}
              </Button>
            ))}

            <Button
              size="icon"
              variant="outline"
              onClick={() => setPage((p) => p + 1)}
              className="h-10 w-10"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}