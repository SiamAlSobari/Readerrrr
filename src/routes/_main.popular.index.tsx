import { createFileRoute, Link } from '@tanstack/react-router'
import { PopularComicCardBase } from '@/features/comic/PopularComicCardBase'
import { getPopularComic } from '@/api/servers/shinigami.server'
import { motion } from 'framer-motion'

type ComicSearch = {
  page: number
}

export const Route = createFileRoute('/_main/popular/')({
  validateSearch: (search): ComicSearch => ({
    page: Number(search.page || 1),
  }),
  loaderDeps: ({ search: { page } }) => ({ page }),
  loader: async ({ deps: { page } }) => {
    const popularComic = await getPopularComic({ data: { page, pageSize: 24 } })
    return { popularComic }
  },
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'description',
        content:
          'Temukan komik & comic reader terpopuler yang paling banyak dibaca! Update terbaru dan favorit pembaca di komik READER.',
      },
      {
        name: 'keywords',
        content: 'komik populer, comic populer, popular komik, popular comic, komik reader, comic reader',
      },
      { name: 'author', content: 'MANGA READER' },

      // Open Graph
      { property: 'og:title', content: 'MANGA READER – Popular Manga & Comic Reader' },
      {
        property: 'og:description',
        content:
          'Jelajahi daftar manga & comic reader terpopuler, favorit pembaca, dan update terbaru di MANGA READER!',
      },
      { property: 'og:type', content: 'website' },
     // { property: 'og:url', content: 'https://mangareader.com/popular' },
      { property: 'og:image', content: '/komik_reader.png' },

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Komik READER – Popular Manga & Comic Reader' },
      {
        name: 'twitter:description',
        content:
          'Jelajahi daftar komik & comic reader terpopuler, favorit pembaca, dan update terbaru di komik READER!',
      },
      { name: 'twitter:image', content: '/komik_reader.png' },
    ],
    links: [
      { rel: 'icon', href: '/komik_reader.png', type: 'image/x-icon' },
    ],
    title: 'Komik READER – Popular Komik & Comic Reader',
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { popularComic } = Route.useLoaderData()
  const { page } = Route.useSearch()
  const totalPages = popularComic.data.meta.total_page

  return (
    <div className="p-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-6"
      >
        Popular Comics
      </motion.h1>

      {/* Grid */}
      <motion.div
        key={page}
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.05 },
          },
        }}
        className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
      >
        {popularComic.data.data.map((comic) => (
          <PopularComicCardBase key={comic.manga_id} comic={comic} />
        ))}
      </motion.div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <Link
          to="."
          search={(prev) => ({ page: Math.max((prev.page ?? 1) - 1, 1) })}
          disabled={page <= 1}
          className="px-3 py-1 rounded border disabled:opacity-50 hover:bg-gray-100 transition"
        >
          Prev
        </Link>

        <span>
          Page {page} of {totalPages}
        </span>

        <Link
          to="."
          search={(prev) => ({ page: (prev.page ?? 1) + 1 })}
          disabled={page >= totalPages}
          className="px-3 py-1 rounded border disabled:opacity-50 hover:bg-gray-100 transition"
        >
          Next
        </Link>
      </div>
    </div>
  )
}
