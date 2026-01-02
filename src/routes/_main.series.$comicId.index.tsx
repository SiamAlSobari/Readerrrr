import { getChapterList, getComicDetail } from '@/api/servers/shinigami.server'
import { ChapterList } from '@/features/comic/ChapterList'
import { ComicDetail } from '@/features/comic/ComicDetail'
import ComicDetailSkeleton from '@/features/comic/ComicDetailSkeleton'
import { createFileRoute } from '@tanstack/react-router'


type ChapterSearch = {
  page: number
}

export const Route = createFileRoute('/_main/series/$comicId/')({
  component: RouteComponent,
  validateSearch: (search: Record<string, string>): ChapterSearch =>({
    page: Number(search.page || 1)
  }),
  loaderDeps: ({ search: { page } }) => ({
    page
  }),
  loader: async ({ params, deps: { page } }) => {
    const comicDetail = await getComicDetail({ data: { comicId: params.comicId } })
    const chapterList = await getChapterList({ data: { comicId: params.comicId, page, pageSize: 24 } })
    return { comicDetail, chapterList }
  },
  pendingComponent: ComicDetailSkeleton
})

function RouteComponent() {
  const { comicDetail, chapterList } = Route.useLoaderData()
  const { comicId } = Route.useParams()
  const {page} = Route.useSearch()
  return (
    <main>
      <ComicDetail comic={comicDetail.data.data} />
      <ChapterList comicId={comicId} meta={chapterList.data.meta} page={page} chapters={chapterList.data.data} />
    </main>
  )
}
