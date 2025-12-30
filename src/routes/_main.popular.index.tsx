import { createFileRoute, Link } from '@tanstack/react-router'
import { PopularComicCardBase } from '@/features/comic/PopularComicCardBase'
import { getPopularComic } from '@/api/servers/shinigami.server'

type ComicSearch = {
  page : number
}

export const Route = createFileRoute('/_main/popular/')({
    validateSearch: (search: Record<string, string>): ComicSearch =>({
    page: Number(search.page || 1)
  }),
    loaderDeps: ({ search: { page } }) => ({
    page
  }),
  loader: async ({ deps: { page } }) => {
    const popularComic = await getPopularComic({data: {page, pageSize: 24}})
    return { popularComic }
  },
  component: RouteComponent,
})


function RouteComponent() {
    const { popularComic } = Route.useLoaderData()
    const {page} = Route.useSearch()

  const totalPages = popularComic.data.meta.total_page


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Popular Comics</h1>

      <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {popularComic.data.data.map(comic => (
          <PopularComicCardBase key={comic.manga_id} comic={comic} />
        ))}
      </div>

      {/* Pagination */}
  <div className="flex justify-center items-center gap-4 mt-6">
  {/* Prev Button */}
  <Link
    to="."
    search={(prev) => ({ page: prev.page ? prev.page - 1 : 1 })}
    disabled={page <= 1}
    className="px-3 py-1 rounded border disabled:opacity-50 hover:bg-gray-100 transition"
  >
    Prev
  </Link>

  {/* Page Info */}
  <span>
    Page {page} of {totalPages}
  </span>

  {/* Next Button */}
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
