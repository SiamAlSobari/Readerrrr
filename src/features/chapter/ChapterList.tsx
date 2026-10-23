import {
  Eye,
  Search,
  ArrowUpDown,
  Clock,
  ChevronLeft,
  ChevronRight,
  ListFilter,
  Info,
} from "lucide-react";
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
  chapters: Chapter[] | null | undefined;
  page?: number;
  meta?: Meta;
  comicId: string;
  latestChapterNumber?: number;
}

export function ChapterList({
  chapters,
  page = 1,
  meta,
  comicId,
  latestChapterNumber,
}: ChapterListProps) {
  const navigate = useNavigate();
  const chapterList = useServerFn(getChapterList);
  const [filterQuery, setFilterQuery] = useState("");
  const [dialogFilterQuery, setDialogFilterQuery] = useState("");
  const [sortAsc, setSortAsc] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const safeChapters = useMemo(
    () => (Array.isArray(chapters) ? chapters.filter(Boolean) : []),
    [chapters]
  );

  const totalPages = Math.max(1, meta?.total_page || 1);
  const totalChaptersCount =
    meta?.total_record || meta?.total_data || safeChapters.length;

  const maxChapterNum =
    latestChapterNumber ||
    (safeChapters.length > 0
      ? Math.max(...safeChapters.map((c) => c.chapter_number))
      : 0);

  // Detect if early chapters (e.g. Ch. 1–132) are not hosted on the upstream server
  const hasMissingEarlyChapters =
    maxChapterNum > 0 &&
    totalChaptersCount > 0 &&
    maxChapterNum - totalChaptersCount >= 10;

  const estimatedStartChapter = hasMissingEarlyChapters
    ? Math.max(1, Math.round(maxChapterNum - totalChaptersCount + 1))
    : 1;

  function goToPage(targetPage: number) {
    const clamped = Math.max(1, Math.min(targetPage, totalPages));
    navigate({
      to: ".",
      search: () => ({ page: clamped }),
    });
  }

  function handlePageNext() {
    goToPage(page + 1);
  }

  function handlePagePrev() {
    goToPage(page - 1);
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
          pageSize: 100,
        },
      }),
    getNextPageParam: (lastPage) => {
      const metaData = lastPage?.data?.meta;
      if (!metaData) return undefined;
      return metaData.page < metaData.total_page
        ? metaData.page + 1
        : undefined;
    },
    enabled: isDialogOpen,
  });

  const rawDialogChapters = useMemo(
    () =>
      data?.pages.flatMap((p) =>
        Array.isArray(p?.data?.data) ? p.data.data.filter(Boolean) : []
      ) ?? [],
    [data]
  );

  useEffect(() => {
    if (!isDialogOpen) return;
    const clean = dialogFilterQuery
      .trim()
      .toLowerCase()
      .replace(/^(ch(apter)?\.?\s*|#)/i, "")
      .trim();
    if (!clean) return;

    const targetNum = Number(clean);
    const isNum = !isNaN(targetNum);

    const hasMatch = isNum
      ? rawDialogChapters.some((ch) => ch.chapter_number === targetNum)
      : rawDialogChapters.some((ch) =>
          String(ch.chapter_number).startsWith(clean)
        );

    if (!hasMatch && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [
    dialogFilterQuery,
    isDialogOpen,
    rawDialogChapters,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  const filteredChapters = useMemo(() => {
    return filterAndRankChapters(safeChapters, filterQuery, sortAsc);
  }, [safeChapters, filterQuery, sortAsc]);

  const filteredDialogChapters = useMemo(() => {
    return filterAndRankChapters(rawDialogChapters, dialogFilterQuery, sortAsc);
  }, [rawDialogChapters, dialogFilterQuery, sortAsc]);

  // Visible page numbers for direct jump without spam-clicking Next
  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }, [page, totalPages]);

  const lastRead = getLastReadChapter(comicId);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* HEADER & CONTROLS */}
      <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[#27272e] pb-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#f4f1ea]">
            Daftar Chapter
          </h2>
          <p className="mt-1 font-mono text-xs text-[#c8c2b6] tabular-nums">
            TERSEDIA {totalChaptersCount} CHAPTER · HALAMAN {page} DARI{" "}
            {totalPages}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Chapter Filter Input */}
          <div className="relative flex-1 sm:w-56">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#c8c2b6]" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Cari nomor chapter (mis. 1)..."
              aria-label="Cari nomor chapter"
              className="min-h-11 w-full border border-[#27272e] bg-[#141418] pl-9 pr-3 font-mono text-xs text-[#f4f1ea] placeholder-[#c8c2b6]/60 focus:border-[#f43f5e] focus:outline-none"
            />
          </div>

          {/* Sort Order Toggle */}
          <button
            type="button"
            onClick={() => setSortAsc((prev) => !prev)}
            className="inline-flex min-h-11 items-center gap-2 border border-[#27272e] bg-[#141418] px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#f4f1ea] transition-colors hover:border-[#f4f1ea] hover:bg-[#181820]"
            title="Urutkan Chapter"
          >
            <ArrowUpDown className="h-3.5 w-3.5 text-[#f43f5e]" />
            <span>{sortAsc ? "Urutan: Terlama" : "Urutan: Terbaru"}</span>
          </button>
        </div>
      </div>

      {/* MISSING EARLY CHAPTERS NOTICE (When source server only hosts partial chapters, e.g. Ch 133-209) */}
      {hasMissingEarlyChapters && (
        <div className="mb-6 flex flex-col justify-between gap-3 border border-[#fbbf24]/40 bg-[#14120c] p-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#fbbf24]" />
            <div className="space-y-1 text-xs text-[#f4f1ea]">
              <p className="font-mono font-bold uppercase text-[#fbbf24]">
                Info Ketersediaan Chapter (Mulai ~Ch. {estimatedStartChapter} – Ch.{" "}
                {maxChapterNum})
              </p>
              <p className="text-[#c8c2b6]">
                Di server sumber, komik ini baru tersedia sebanyak{" "}
                <strong className="text-[#f4f1ea]">
                  {totalChaptersCount} chapter
                </strong>{" "}
                (chapter awal sebelum Ch. {estimatedStartChapter} memang tidak
                diunggah oleh server sumber).
              </p>
            </div>
          </div>
          {page !== totalPages && (
            <button
              type="button"
              onClick={() => goToPage(totalPages)}
              className="inline-flex min-h-10 shrink-0 items-center justify-center border border-[#fbbf24]/50 bg-[#1c1810] px-3.5 py-2 font-mono text-xs font-bold uppercase text-[#fbbf24] transition-colors hover:bg-[#fbbf24] hover:text-[#09090b]"
            >
              Ke Chapter Paling Awal (Hal. {totalPages})
            </button>
          )}
        </div>
      )}

      {/* LAST READ BANNER */}
      {lastRead && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border border-[#34d399]/50 bg-[#0c0c10] p-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-[#34d399]">
              <Clock className="h-3.5 w-3.5" />
              <span>TERAKHIR DIBACA</span>
            </div>
            <p className="font-display text-xl font-black uppercase text-[#f4f1ea] tabular-nums">
              Chapter {lastRead.chapter_number}
            </p>
            <p className="font-mono text-xs text-[#c8c2b6]">
              Dibaca{" "}
              {formatDistanceToNow(lastRead.last_read_time, {
                addSuffix: true,
                locale: id,
              })}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate({
                to: "/read/$comicId/$chapterId",
                params: {
                  comicId,
                  chapterId: lastRead.chapter_id,
                },
              })
            }
            className="inline-flex min-h-11 items-center gap-2 bg-[#be123c] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#f4f1ea] transition-colors hover:bg-[#9f1239]"
          >
            <span>Lanjutkan Ch. {lastRead.chapter_number}</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* MAIN CHAPTER LEDGER */}
      {filteredChapters.length === 0 ? (
        <div className="border border-[#27272e] bg-[#0c0c10] p-8 text-center space-y-4">
          <p className="font-mono text-xs text-[#c8c2b6]">
            {filterQuery
              ? `Tidak ditemukan chapter dengan nomor "${filterQuery}" pada halaman ${page}.`
              : `Tidak ada chapter pada halaman ${page}.`}
          </p>
          {filterQuery ? (
            <button
              type="button"
              onClick={() => {
                setDialogFilterQuery(filterQuery);
                setIsDialogOpen(true);
              }}
              className="inline-flex min-h-11 items-center gap-2 bg-[#be123c] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#f4f1ea] transition-colors hover:bg-[#9f1239]"
            >
              <Search className="h-4 w-4" />
              <span>
                Cari "{filterQuery}" di Semua Chapter ({totalChaptersCount}{" "}
                Chapter)
              </span>
            </button>
          ) : (
            page > 1 && (
              <button
                type="button"
                onClick={() => goToPage(1)}
                className="inline-flex min-h-11 items-center gap-2 bg-[#be123c] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#f4f1ea] transition-colors hover:bg-[#9f1239]"
              >
                <span>Kembali ke Halaman 1</span>
              </button>
            )
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-px border border-[#27272e] bg-[#27272e] md:grid-cols-2">
          {filteredChapters.map((ch) => {
            const isRead = lastRead?.chapter_id === ch.chapter_id;

            return (
              <Link
                to="/read/$comicId/$chapterId"
                params={{ comicId, chapterId: ch.chapter_id }}
                key={ch.chapter_id}
                className={`group flex items-center gap-4 p-3.5 transition-colors ${
                  isRead
                    ? "bg-[#101816] hover:bg-[#14201c]"
                    : "bg-[#101014] hover:bg-[#16161c]"
                }`}
              >
                {/* THUMBNAIL */}
                <div className="relative h-18 w-28 shrink-0 overflow-hidden border border-[#27272e] bg-[#141418]">
                  {ch.thumbnail_image_url ? (
                    <img
                      src={ch.thumbnail_image_url}
                      alt={`Chapter ${ch.chapter_number}`}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-mono text-xs font-bold text-[#c8c2b6]">
                      CH. {ch.chapter_number}
                    </div>
                  )}
                  {isRead && (
                    <span className="absolute left-0 top-0 bg-[#34d399] px-1.5 py-0.5 font-mono text-xs font-bold uppercase text-[#09090b]">
                      DIBACA
                    </span>
                  )}
                </div>

                {/* CONTENT */}
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-sm font-bold text-[#f4f1ea] group-hover:text-[#f43f5e] transition-colors tabular-nums">
                      CHAPTER {ch.chapter_number}
                    </span>
                    <span className="font-mono text-xs text-[#c8c2b6] tabular-nums">
                      {new Date(ch.release_date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between border-t border-[#27272e] pt-2 font-mono text-xs text-[#c8c2b6] tabular-nums">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      {(ch.view_count ?? 0).toLocaleString("id-ID")} pembaca
                    </span>
                    <span className="inline-flex items-center gap-1 text-[#f43f5e] group-hover:translate-x-0.5 transition-transform">
                      <span>BACA</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* PAGINATION + ALL CHAPTERS DIALOG */}
      <div className="mt-8 flex flex-col gap-3 border border-[#27272e] bg-[#0c0c10] p-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Page Numbers & Prev/Next */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={handlePagePrev}
            disabled={page <= 1}
            className="inline-flex min-h-11 items-center gap-1.5 border border-[#27272e] bg-[#141418] px-3.5 py-2 font-mono text-xs font-bold uppercase text-[#f4f1ea] transition-colors hover:border-[#f4f1ea] disabled:opacity-40 disabled:pointer-events-none"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Sebelumnya</span>
          </button>

          {pageNumbers[0] > 1 && (
            <>
              <button
                type="button"
                onClick={() => goToPage(1)}
                className="inline-flex min-h-11 min-w-11 items-center justify-center border border-[#27272e] bg-[#141418] px-3 font-mono text-xs font-bold text-[#c8c2b6] transition-colors hover:border-[#f4f1ea] hover:text-[#f4f1ea] tabular-nums"
              >
                1
              </button>
              {pageNumbers[0] > 2 && (
                <span className="px-1 font-mono text-xs text-[#c8c2b6]">
                  ...
                </span>
              )}
            </>
          )}

          {pageNumbers.map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => goToPage(num)}
              className={`inline-flex min-h-11 min-w-11 items-center justify-center border px-3 font-mono text-xs font-bold transition-colors tabular-nums ${
                num === page
                  ? "border-[#be123c] bg-[#be123c] text-[#f4f1ea]"
                  : "border-[#27272e] bg-[#141418] text-[#c8c2b6] hover:border-[#f4f1ea] hover:text-[#f4f1ea]"
              }`}
            >
              {num}
            </button>
          ))}

          {pageNumbers[pageNumbers.length - 1] < totalPages && (
            <>
              {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                <span className="px-1 font-mono text-xs text-[#c8c2b6]">
                  ...
                </span>
              )}
              <button
                type="button"
                onClick={() => goToPage(totalPages)}
                className="inline-flex min-h-11 min-w-11 items-center justify-center border border-[#27272e] bg-[#141418] px-3 font-mono text-xs font-bold text-[#c8c2b6] transition-colors hover:border-[#f4f1ea] hover:text-[#f4f1ea] tabular-nums"
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            type="button"
            onClick={handlePageNext}
            disabled={page >= totalPages}
            className="inline-flex min-h-11 items-center gap-1.5 border border-[#27272e] bg-[#141418] px-3.5 py-2 font-mono text-xs font-bold uppercase text-[#f4f1ea] transition-colors hover:border-[#f4f1ea] disabled:opacity-40 disabled:pointer-events-none"
          >
            <span>Selanjutnya</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* ALL CHAPTERS DIALOG */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center gap-2 border border-[#be123c] bg-[#be123c]/15 px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#f4f1ea] transition-colors hover:bg-[#be123c]"
            >
              <ListFilter className="h-4 w-4" />
              <span>Semua Chapter ({totalChaptersCount} Chapter)</span>
            </button>
          </DialogTrigger>

          <DialogContent className="max-w-lg rounded-none border border-[#27272e] bg-[#0c0c10] p-6 text-[#f4f1ea]">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between font-display text-2xl font-black uppercase tracking-tight text-[#f4f1ea]">
                <span>Daftar Semua Chapter</span>
                <span className="font-mono text-xs font-normal text-[#c8c2b6] tabular-nums">
                  {rawDialogChapters.length} / {totalChaptersCount} CHAPTER
                </span>
              </DialogTitle>
            </DialogHeader>

            {/* Quick Filter in Dialog */}
            <div className="relative mt-2">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#c8c2b6]" />
              <input
                type="text"
                value={dialogFilterQuery}
                onChange={(e) => setDialogFilterQuery(e.target.value)}
                placeholder="Ketik nomor chapter (misal: 133 atau 200)..."
                aria-label="Filter nomor chapter"
                className="min-h-11 w-full border border-[#27272e] bg-[#141418] pl-9 pr-3 font-mono text-xs text-[#f4f1ea] placeholder-[#c8c2b6]/60 focus:border-[#f43f5e] focus:outline-none"
              />
            </div>

            {hasMissingEarlyChapters && (
              <p className="mt-2 border border-[#fbbf24]/30 bg-[#14120c] px-3 py-2 font-mono text-xs text-[#fbbf24]">
                Catatan: Chapter yang tersedia di server mulai dari sekitar Ch.{" "}
                {estimatedStartChapter} hingga Ch. {maxChapterNum}.
              </p>
            )}

            <div
              className="mt-3 max-h-80 divide-y divide-[#27272e] overflow-y-auto border border-[#27272e] bg-[#101014]"
              onScroll={(e) => {
                const el = e.currentTarget;
                const isBottom =
                  el.scrollTop + el.clientHeight >= el.scrollHeight - 30;
                if (isBottom && hasNextPage && !isFetchingNextPage) {
                  fetchNextPage();
                }
              }}
            >
              {filteredDialogChapters.length === 0 &&
              !isLoading &&
              !isFetchingNextPage ? (
                <div className="py-8 px-4 text-center font-mono text-xs text-[#c8c2b6]">
                  Tidak ada chapter dengan nomor "{dialogFilterQuery}".
                </div>
              ) : (
                filteredDialogChapters.map((ch) => (
                  <Link
                    to="/read/$comicId/$chapterId"
                    key={ch.chapter_id}
                    params={{ comicId, chapterId: ch.chapter_id }}
                    className="flex items-center justify-between px-4 py-3 font-mono text-xs transition-colors hover:bg-[#181820]"
                  >
                    <span className="font-bold text-[#f4f1ea] tabular-nums">
                      CHAPTER {ch.chapter_number}
                    </span>
                    <span className="text-[#c8c2b6] tabular-nums">
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
                <div className="flex items-center justify-center gap-2 py-4 font-mono text-xs text-[#c8c2b6]">
                  <div className="h-3.5 w-3.5 animate-spin border-2 border-[#be123c] border-t-transparent" />
                  <span>Memuat daftar chapter...</span>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
