import { Eye, Search, ArrowUpDown, Clock } from "lucide-react";
import { Button } from "@/common/shadcn-ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/shadcn-ui/dialog";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { Meta } from "@/common/interface";
import { Link, useNavigate } from "@tanstack/react-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getChapterList } from "@/api/servers/shinigami.server";
import { getLastReadChapter } from "@/common/utils/chapter-history";
import { filterAndRankChapters } from "@/common/utils/chapter-filter";
import { useState, useMemo, useEffect } from "react";

interface Chapter {
  chapter_id: string;
  chapter_number: number;
  thumbnail_image_url: string;
  release_date: string;
  view_count: number;
}

interface ChapterListProps {
  chapters: Chapter[]; // SSR data
  page?: number;
  meta: Meta;
  comicId: string;
}

export function ChapterList({
  chapters,
  page = 1,
  meta,
  comicId,
}: ChapterListProps) {
  const navigate = useNavigate();
  const chapterList = useServerFn(getChapterList);
  const [filterQuery, setFilterQuery] = useState("");
  const [dialogFilterQuery, setDialogFilterQuery] = useState("");
  const [sortAsc, setSortAsc] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const totalPages = meta.total_page;

  function handlePageNext() {
    navigate({
      to: ".",
      search: (prev) => ({ page: (prev.page ?? 1) + 1 }),
    });
  }

  function handlePagePrev() {
    navigate({
      to: ".",
      search: (prev) => ({ page: Math.max((prev.page ?? 1) - 1, 1) }),
    });
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["dialog-chapters", comicId],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      chapterList({
        data: {
          comicId,
          page: pageParam,
          pageSize: 100, // Load more per batch for faster search
        },
      }),
    getNextPageParam: (lastPage) => {
      const metaData = lastPage.data.meta;
      return metaData.page < metaData.total_page ? metaData.page + 1 : undefined;
    },
    enabled: isDialogOpen,
  });

  const rawDialogChapters = useMemo(
    () => data?.pages.flatMap((p) => p.data.data) ?? [],
    [data]
  );

  // Auto-fetch remaining chapters in modal if searching for a chapter not yet loaded
  useEffect(() => {
    if (!isDialogOpen) return;
    const clean = dialogFilterQuery.trim().toLowerCase().replace(/^(ch(apter)?\.?\s*|#)/i, "").trim();
    if (!clean) return;

    const targetNum = Number(clean);
    const isNum = !isNaN(targetNum);

    const hasMatch = isNum
      ? rawDialogChapters.some((ch) => ch.chapter_number === targetNum)
      : rawDialogChapters.some((ch) => String(ch.chapter_number).startsWith(clean));

    // If exact or prefix match is not in currently loaded chapters and more pages exist, fetch next
    if (!hasMatch && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [dialogFilterQuery, isDialogOpen, rawDialogChapters, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Intelligent relevance filtering & ranking
  const filteredChapters = useMemo(() => {
    return filterAndRankChapters(chapters, filterQuery, sortAsc);
  }, [chapters, filterQuery, sortAsc]);

  const filteredDialogChapters = useMemo(() => {
    return filterAndRankChapters(rawDialogChapters, dialogFilterQuery, sortAsc);
  }, [rawDialogChapters, dialogFilterQuery, sortAsc]);

  const lastRead = getLastReadChapter(comicId);

  return (
    <section className="mx-auto mt-12 max-w-7xl px-4">
      {/* HEADER & CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-wide">
            Daftar Chapter
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Total {meta.total_data || chapters.length} Chapter tersedia
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Chapter Filter Input */}
          <div className="relative flex-1 sm:w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Cari Ch (misal: 1)..."
              className="w-full pl-9 pr-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500/50"
            />
          </div>

          {/* Sort Order Toggle */}
          <button
            onClick={() => setSortAsc((prev) => !prev)}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors flex items-center gap-1.5 text-xs font-medium"
            title="Urutkan Chapter"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-red-400" />
            <span>{sortAsc ? "Terlama" : "Terbaru"}</span>
          </button>
        </div>
      </div>

      {/* LAST READ BANNER */}
      {lastRead && (
        <div className="mb-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 flex items-center justify-between backdrop-blur-xs">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mb-0.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Terakhir Dibaca</span>
            </div>
            <p className="text-white font-bold text-base">
              Chapter {lastRead.chapter_number}
            </p>
            <p className="text-xs text-emerald-300/80 mt-0.5">
              {formatDistanceToNow(lastRead.last_read_time, {
                addSuffix: true,
                locale: id,
              })}
            </p>
          </div>

          <Button
            size="sm"
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl shadow-lg shadow-emerald-500/20"
            onClick={() =>
              navigate({
                to: "/read/$comicId/$chapterId",
                params: {
                  comicId,
                  chapterId: lastRead.chapter_id,
                },
              })
            }
          >
            Lanjutkan
          </Button>
        </div>
      )}

      {/* MAIN LIST */}
      <div className="space-y-2.5">
        {filteredChapters.length === 0 ? (
          <div className="text-center py-10 text-zinc-500 text-sm space-y-3 bg-zinc-900/30 rounded-2xl border border-zinc-800/60 p-6">
            <p>Tidak ada chapter yang cocok dengan "{filterQuery}" di halaman ini.</p>
            <Button
              variant="secondary"
              size="sm"
              className="rounded-xl bg-red-500/10 hover:bg-red-500 hover:text-white border border-red-500/20 text-red-400 font-semibold text-xs"
              onClick={() => {
                setDialogFilterQuery(filterQuery);
                setIsDialogOpen(true);
              }}
            >
              Cari "{filterQuery}" di Semua Chapter ({meta.total_data})
            </Button>
          </div>
        ) : (
          filteredChapters.map((ch) => {
            const isRead = lastRead?.chapter_id === ch.chapter_id;

            return (
              <Link
                to="/read/$comicId/$chapterId"
                params={{ comicId, chapterId: ch.chapter_id }}
                key={ch.chapter_id}
                className={`
                  group flex flex-col sm:flex-row gap-3 rounded-2xl border p-3 sm:p-3.5 transition-all duration-200
                  ${
                    isRead
                      ? "bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500/50"
                      : "bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700/80 hover:bg-zinc-900/80"
                  }
                `}
              >
                {/* THUMBNAIL */}
                <div className="h-32 sm:h-20 w-full sm:w-32 rounded-xl overflow-hidden bg-zinc-850 shrink-0 relative">
                  <img
                    src={ch.thumbnail_image_url}
                    alt={`Thumbnail Chapter ${ch.chapter_number}`}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {isRead && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-emerald-500 text-[10px] font-bold text-black shadow-md">
                      Dibaca
                    </span>
                  )}
                </div>

                {/* CONTENT */}
                <div className="flex flex-1 flex-col justify-between gap-1 pr-2">
                  <div>
                    <p className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                      Chapter {ch.chapter_number}
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">
                      {new Date(ch.release_date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      •{" "}
                      {formatDistanceToNow(new Date(ch.release_date), {
                        locale: id,
                        addSuffix: true,
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-2">
                    <Eye className="h-3.5 w-3.5 text-zinc-500" />
                    <span>{ch.view_count.toLocaleString("id-ID")} dibaca</span>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>

      {/* PAGINATION + DIALOG */}
      <div className="mt-8 mb-12 flex flex-wrap items-center justify-center gap-3">
        <Button
          onClick={handlePagePrev}
          disabled={page === 1}
          variant="outline"
          className="rounded-xl border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-xs"
        >
          Sebelumnya
        </Button>

        {/* ALL CHAPTERS DIALOG */}
        <Dialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        >
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              className="rounded-xl bg-red-500/10 hover:bg-red-500 hover:text-white border border-red-500/20 text-red-400 font-semibold text-xs transition-colors"
            >
              Lihat Semua ({meta.total_data || "Chapter"})
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-lg rounded-3xl bg-zinc-900 border border-zinc-800 p-6 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white flex items-center justify-between">
                <span>Semua Chapter</span>
                <span className="text-xs font-normal text-zinc-400">
                  {rawDialogChapters.length} dimuat
                </span>
              </DialogTitle>
            </DialogHeader>

            {/* Quick Filter in Dialog */}
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={dialogFilterQuery}
                onChange={(e) => setDialogFilterQuery(e.target.value)}
                placeholder="Ketik nomor chapter (misal: 1 atau 15)..."
                className="w-full pl-9 pr-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500/50"
              />
            </div>

            <div
              className="mt-4 max-h-80 space-y-1.5 overflow-y-auto pr-1"
              onScroll={(e) => {
                const el = e.currentTarget;
                const isBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 30;
                if (isBottom && hasNextPage && !isFetchingNextPage) {
                  fetchNextPage();
                }
              }}
            >
              {filteredDialogChapters.length === 0 && !isLoading && !isFetchingNextPage ? (
                <div className="py-8 text-center text-xs text-zinc-500">
                  Tidak ada chapter yang cocok dengan "{dialogFilterQuery}".
                </div>
              ) : (
                filteredDialogChapters.map((ch) => (
                  <Link
                    to="/read/$comicId/$chapterId"
                    key={ch.chapter_id}
                    params={{ comicId, chapterId: ch.chapter_id }}
                    className="flex items-center justify-between rounded-xl p-3 bg-zinc-950/50 hover:bg-zinc-800/80 border border-zinc-850 hover:border-zinc-700 transition-colors"
                  >
                    <span className="text-sm font-semibold text-white">
                      Chapter {ch.chapter_number}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {new Date(ch.release_date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </Link>
                ))
              )}

              {(isLoading || isFetchingNextPage) && (
                <div className="py-4 text-center text-xs text-zinc-400 flex items-center justify-center gap-2">
                  <div className="w-3.5 h-3.5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                  <span>Mencari & memuat chapter...</span>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        <Button
          onClick={handlePageNext}
          disabled={page === totalPages}
          variant="outline"
          className="rounded-xl border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-xs"
        >
          Selanjutnya
        </Button>
      </div>
    </section>
  );
}
