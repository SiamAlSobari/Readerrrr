import { ApiResponse, Comic } from '@/common/interface'
import { API_URL } from '@/common/utils/env'
import BaseComicCard from '@/features/comic/BaseComicCard'
import BaseComicCardSkeleton from '@/features/comic/BaseComicCardSkeleton'
import { Button } from '@/common/shadcn-ui/button'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

type Search = {
  q: string
}

export const Route = createFileRoute('/_main/search/')({
  validateSearch: (search: Record<string, string>): Search => ({
    q: search.q,
  }),
  component: RouteComponent,
})

const PAGE_SIZE = 12

function RouteComponent() {
  const { q } = Route.useSearch()
  const [page, setPage] = useState(1)

  const {
    data,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['search', q, page],
    queryFn: async () => {
      const url = `${API_URL}/manga/list?page=${page}&page_size=${PAGE_SIZE}&q=${q}`
      const res = await fetch(url)
      const json = await res.json()
      return json as ApiResponse<Comic>
    },
    enabled: !!q,
    placeholderData: keepPreviousData

  })

  const comics = data?.data ?? []
  const totalPage = data?.meta?.total_page ?? 1

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">
          Hasil pencarian: <span className="text-primary">{q}</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Menampilkan {comics.length} komik
        </p>
      </div>

      {/* Content */}
      {isLoading ? (
        <GridSkeleton />
      ) : comics.length === 0 ? (
        <NotFound />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {comics.map((comic) => (
            <BaseComicCard key={comic.manga_id} comic={comic} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {comics.length > 0 && (
        <div className="flex justify-center items-center gap-3 pt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1 || isFetching}
            onClick={() => {setPage((p) => p - 1)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            Prev
          </Button>

          <span className="text-sm text-muted-foreground">
            Page {page} / {totalPage}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPage || isFetching}
            onClick={() => {
              setPage((p) => p + 1)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

/* =============================
   Skeleton Grid
============================= */
function GridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {Array.from({ length: PAGE_SIZE }).map((_, i) => (
        <BaseComicCardSkeleton key={i} />
      ))}
    </div>
  )
}

/* =============================
   Not Found State
============================= */
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h2 className="text-lg font-semibold">
        Komik tidak ditemukan 😢
      </h2>
      <p className="text-sm text-muted-foreground mt-2 max-w-md">
        Coba gunakan kata kunci lain atau periksa ejaan pencarian kamu.
      </p>
    </div>
  )
}
