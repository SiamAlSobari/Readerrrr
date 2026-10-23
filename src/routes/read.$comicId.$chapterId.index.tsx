import { getChapterDetail, getComicDetail } from "@/api/servers/shinigami.server";
import { setChapterHistory } from "@/common/utils/chapter-history";
import { ChapterImage } from "@/features/chapter/ChapterImage";
import ChapterNavigation from "@/features/chapter/ChapterNavigation";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Image as ImageIcon,
} from "lucide-react";
import { useEffect, useState, useRef, useCallback, memo } from "react";
import { JsonLd } from "@/common/components/JsonLd";

const SITE_URL = "https://komik-reader.my.id";

const queryChapter = (chapterId: string) =>
  queryOptions({
    queryKey: ["chapter", chapterId],
    queryFn: () => getChapterDetail({ data: { chapterId } }),
    staleTime: 1000 * 60 * 60,
  });

const queryComic = (comicId: string) =>
  queryOptions({
    queryKey: ["comic", comicId],
    queryFn: () => getComicDetail({ data: { comicId } }),
    staleTime: 1000 * 60 * 30,
  });

export const Route = createFileRoute("/read/$comicId/$chapterId/")({
  loader: async ({ context, params }) => {
    const [chapter, comic] = await Promise.all([
      context.queryClient.ensureQueryData(queryChapter(params.chapterId)),
      context.queryClient.ensureQueryData(queryComic(params.comicId)),
    ]);
    return { chapter, comic };
  },
  head: ({ loaderData, params, match }) => {
    const comic = loaderData?.comic?.data?.data;
    const chapter = loaderData?.chapter?.data?.data;

    const comicTitle = comic?.title || params.comicId.replace(/-/g, " ");
    const chapterNum = chapter?.chapter_number
      ? `Chapter ${chapter.chapter_number}`
      : `Chapter ${params.chapterId}`;
    const coverImage =
      comic?.cover_portrait_url ||
      comic?.cover_image_url ||
      `${SITE_URL}/komik_reader.png`;
    const title = `Baca ${comicTitle} ${chapterNum} Bahasa Indonesia | KOMIK READER`;
    const description = `Baca komik ${comicTitle} ${chapterNum} online gratis bahasa Indonesia di KOMIK READER. Gambar jernih kualitas HD, load cepat, tanpa iklan mengganggu.`;
    const canonicalUrl = `${SITE_URL}${match.pathname}`;

    return {
      meta: [
        { name: "description", content: description },
        {
          name: "keywords",
          content: `baca ${comicTitle} ${chapterNum}, ${comicTitle} ${chapterNum}, komik ${comicTitle}, baca ${comicTitle} bahasa indonesia, baca manhwa online, komik reader`,
        },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: canonicalUrl },
        { property: "og:image", content: coverImage },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: coverImage },
        { name: "robots", content: "index, follow, max-image-preview:large" },
      ],
      links: [{ rel: "canonical", href: canonicalUrl }],
      title,
    };
  },
  component: ReadChapterPage,
});

const ReadingProgressBar = memo(function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const p = Math.min(
              100,
              Math.max(0, Math.round((window.scrollY / totalHeight) * 100))
            );
            setProgress(p);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-[#141418] pointer-events-none">
      <div
        className="h-full bg-[#be123c] transition-all duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
});

interface FloatingActionBarProps {
  comicId: string;
  prevChapterId?: string | null;
  nextChapterId?: string | null;
  onPreloadNext?: () => void;
  scrollToTop: () => void;
}

const FloatingActionBar = memo(function FloatingActionBar({
  comicId,
  prevChapterId,
  nextChapterId,
  onPreloadNext,
  scrollToTop,
}: FloatingActionBarProps) {
  const navigate = useNavigate();
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const p = Math.min(
              100,
              Math.max(0, Math.round((window.scrollY / totalHeight) * 100))
            );
            setReadingProgress(p);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center border border-[#27272e] bg-[#09090b]/95 font-mono text-xs tabular-nums">
      <span className="border-r border-[#27272e] px-3 py-2.5 font-bold text-[#f4f1ea] min-w-12 text-center">
        {readingProgress}%
      </span>

      {prevChapterId && (
        <button
          type="button"
          onClick={() =>
            navigate({
              to: "/read/$comicId/$chapterId",
              params: { comicId, chapterId: prevChapterId },
            })
          }
          className="flex min-h-10 min-w-10 items-center justify-center border-r border-[#27272e] text-[#c8c2b6] transition-colors hover:bg-[#141418] hover:text-[#f4f1ea]"
          title="Chapter Sebelumnya"
          aria-label="Chapter Sebelumnya"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}

      {nextChapterId && (
        <button
          type="button"
          onMouseEnter={onPreloadNext}
          onClick={() =>
            navigate({
              to: "/read/$comicId/$chapterId",
              params: { comicId, chapterId: nextChapterId },
            })
          }
          className="flex min-h-10 min-w-10 items-center justify-center border-r border-[#27272e] bg-[#be123c] text-[#f4f1ea] transition-colors hover:bg-[#9f1239]"
          title="Chapter Selanjutnya"
          aria-label="Chapter Selanjutnya"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}

      <button
        type="button"
        onClick={scrollToTop}
        className="flex min-h-10 min-w-10 items-center justify-center text-[#c8c2b6] transition-colors hover:bg-[#141418] hover:text-[#f4f1ea]"
        title="Kembali ke atas"
        aria-label="Kembali ke atas"
      >
        <ArrowUp className="h-4 w-4" />
      </button>
    </div>
  );
});

function ReadChapterPage() {
  const { comicId, chapterId } = Route.useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [useHighQuality, setUseHighQuality] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [autoScrollSpeed] = useState(2);
  const autoScrollRef = useRef<number | null>(null);

  const { data: chapter, isLoading: isChapterLoading } = useQuery(
    queryChapter(chapterId)
  );
  const { data: comic } = useQuery(queryComic(comicId));

  const chapterData = chapter?.data?.data;
  const comicData = comic?.data?.data;

  useEffect(() => {
    if (!chapterData) return;
    setChapterHistory({
      comic_id: comicId,
      chapter_id: chapterData.chapter_id,
      chapter_number: chapterData.chapter_number,
      last_read_time: Date.now(),
      comic_title: comicData?.title,
      comic_cover_url:
        comicData?.cover_portrait_url || comicData?.cover_image_url,
    });
  }, [chapterData, comicData, comicId]);

  useEffect(() => {
    if (chapterData?.next_chapter_id) {
      queryClient.prefetchQuery(queryChapter(chapterData.next_chapter_id));
    }
  }, [chapterData?.next_chapter_id, queryClient]);

  useEffect(() => {
    if (!chapterData?.chapter?.data) return;
    const images = chapterData.chapter.data;
    const baseUrl = useHighQuality
      ? chapterData.base_url
      : chapterData.base_url_low;
    const path = chapterData.chapter.path;

    images.slice(0, 5).forEach((img) => {
      const imgObj = new Image();
      imgObj.src = `${baseUrl}${path}${img}`;
    });
  }, [chapterData, useHighQuality]);

  const handlePreloadNextChapter = useCallback(() => {
    if (!chapterData?.next_chapter_id) return;
    queryClient
      .prefetchQuery(queryChapter(chapterData.next_chapter_id))
      .then((data: any) => {
        const nextImages = data?.data?.data?.chapter?.data;
        const nextBase = useHighQuality
          ? data?.data?.data?.base_url
          : data?.data?.data?.base_url_low;
        const nextPath = data?.data?.data?.chapter?.path;
        if (nextImages && nextBase && nextPath) {
          nextImages.slice(0, 3).forEach((img: string) => {
            const preloadImg = new Image();
            preloadImg.src = `${nextBase}${nextPath}${img}`;
          });
        }
      });
  }, [chapterData?.next_chapter_id, queryClient, useHighQuality]);

  const startAutoScroll = useCallback(() => {
    if (autoScrollRef.current) cancelAnimationFrame(autoScrollRef.current);
    const scrollStep = () => {
      window.scrollBy({ top: autoScrollSpeed, behavior: "instant" });
      if (
        window.innerHeight + window.scrollY <
        document.documentElement.scrollHeight - 10
      ) {
        autoScrollRef.current = requestAnimationFrame(scrollStep);
      } else {
        setIsAutoScrolling(false);
      }
    };
    autoScrollRef.current = requestAnimationFrame(scrollStep);
  }, [autoScrollSpeed]);

  useEffect(() => {
    if (isAutoScrolling) {
      startAutoScroll();
    } else {
      if (autoScrollRef.current) cancelAnimationFrame(autoScrollRef.current);
    }
    return () => {
      if (autoScrollRef.current) cancelAnimationFrame(autoScrollRef.current);
    };
  }, [isAutoScrolling, startAutoScroll]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && chapterData?.prev_chapter_id) {
        navigate({
          to: "/read/$comicId/$chapterId",
          params: { comicId, chapterId: chapterData.prev_chapter_id },
        });
      } else if (e.key === "ArrowRight" && chapterData?.next_chapter_id) {
        navigate({
          to: "/read/$comicId/$chapterId",
          params: { comicId, chapterId: chapterData.next_chapter_id },
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [chapterData, comicId, navigate]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const imagesList = chapterData?.chapter?.data ?? [];
  const primaryBaseUrl = useHighQuality
    ? chapterData?.base_url
    : chapterData?.base_url_low;
  const fallbackBaseUrl = useHighQuality
    ? chapterData?.base_url_low
    : chapterData?.base_url;
  const path = chapterData?.chapter?.path ?? "";

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f1ea] relative selection:bg-[#be123c] selection:text-[#f4f1ea]">
      <ReadingProgressBar />

      {chapterData && (
        <>
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "ComicIssue",
              name: `${comicData?.title || "Komik"} Chapter ${chapterData.chapter_number}`,
              issueNumber: chapterData.chapter_number,
              inLanguage: "id-ID",
              isPartOf: {
                "@type": "ComicSeries",
                name: comicData?.title || "Komik",
                url: `${SITE_URL}/series/${comicId}`,
              },
              image:
                comicData?.cover_portrait_url || comicData?.cover_image_url,
              url: `${SITE_URL}/read/${comicId}/${chapterId}`,
              publisher: {
                "@type": "Organization",
                name: "KOMIK READER",
                url: SITE_URL,
              },
            }}
          />
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  item: { "@id": SITE_URL, name: "Beranda" },
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  item: {
                    "@id": `${SITE_URL}/series/${comicId}`,
                    name: comicData?.title || "Detail Komik",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  item: {
                    "@id": `${SITE_URL}/read/${comicId}/${chapterId}`,
                    name: `Chapter ${chapterData.chapter_number}`,
                  },
                },
              ],
            }}
          />
        </>
      )}

      {/* TOP CHAPTER NAVIGATION */}
      {chapterData && (
        <ChapterNavigation comicId={comicId} chapter={chapterData} />
      )}

      {/* TOOLBAR & CONTROL BAR */}
      <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-3 border-b border-[#27272e] bg-[#0c0c10] px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            className="inline-flex min-h-10 shrink-0 items-center gap-2 border border-[#27272e] bg-[#141418] px-3 py-1.5 font-mono text-xs font-bold uppercase text-[#f4f1ea] transition-colors hover:border-[#f4f1ea]"
            onClick={() => {
              navigate({
                to: "/series/$comicId",
                params: { comicId },
                search: { page: 1 },
              });
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Detail Komik</span>
          </button>

          <h1 className="truncate font-mono text-xs sm:text-sm font-bold uppercase text-[#f4f1ea] max-w-xs sm:max-w-md tabular-nums">
            {comicData?.title || comicId} · CH.{" "}
            {chapterData?.chapter_number || chapterId}
          </h1>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-2 font-mono text-xs uppercase">
          <button
            type="button"
            onClick={() => setUseHighQuality((prev) => !prev)}
            className={`inline-flex min-h-10 items-center gap-1.5 border px-3 py-1.5 font-bold transition-colors ${
              useHighQuality
                ? "border-[#be123c] bg-[#be123c] text-[#f4f1ea]"
                : "border-[#27272e] bg-[#141418] text-[#c8c2b6] hover:border-[#f4f1ea] hover:text-[#f4f1ea]"
            }`}
            title="Ubah Kualitas Gambar"
          >
            <ImageIcon className="h-3.5 w-3.5" />
            <span>{useHighQuality ? "Cetak HD" : "Hemat Data"}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAutoScrolling((prev) => !prev)}
            className={`inline-flex min-h-10 items-center gap-1.5 border px-3 py-1.5 font-bold transition-colors ${
              isAutoScrolling
                ? "border-[#34d399] bg-[#34d399] text-[#09090b]"
                : "border-[#27272e] bg-[#141418] text-[#c8c2b6] hover:border-[#f4f1ea] hover:text-[#f4f1ea]"
            }`}
            title="Auto Scroll Reader"
          >
            {isAutoScrolling ? (
              <Pause className="h-3.5 w-3.5" />
            ) : (
              <Play className="h-3.5 w-3.5" />
            )}
            <span>Auto Scroll</span>
          </button>
        </div>
      </div>

      {/* READER CANVAS */}
      <main className="mx-auto w-full max-w-3xl bg-[#09090b] min-h-[60vh] border-x border-[#27272e]">
        {isChapterLoading ? (
          <div className="py-24 text-center space-y-4">
            <div className="h-9 w-9 border-2 border-[#be123c] border-t-transparent animate-spin mx-auto" />
            <p className="font-mono text-xs uppercase text-[#c8c2b6]">
              Memuat lembaran chapter...
            </p>
          </div>
        ) : imagesList.length === 0 ? (
          <div className="py-24 text-center font-mono text-xs uppercase text-[#c8c2b6]">
            Chapter tidak memiliki gambar atau belum tersedia.
          </div>
        ) : (
          imagesList.map((img, index) => {
            const primaryUrl = `${primaryBaseUrl}${path}${img}`;
            const fallbackUrl = `${fallbackBaseUrl}${path}${img}`;

            return (
              <ChapterImage
                key={`${chapterId}-${index}`}
                src={primaryUrl}
                fallbackSrc={fallbackUrl}
                alt={`Halaman ${index + 1} Komik ${comicData?.title || ""} Chapter ${chapterData?.chapter_number || ""}`}
                pageNumber={index + 1}
                priority={index < 3}
              />
            );
          })
        )}
      </main>

      {/* BOTTOM NAVIGATION */}
      {chapterData && (
        <div className="mt-8 pb-16">
          <ChapterNavigation comicId={comicId} chapter={chapterData} />
        </div>
      )}

      {/* FLOATING ACTION BAR */}
      <FloatingActionBar
        comicId={comicId}
        prevChapterId={chapterData?.prev_chapter_id}
        nextChapterId={chapterData?.next_chapter_id}
        onPreloadNext={handlePreloadNextChapter}
        scrollToTop={scrollToTop}
      />
    </div>
  );
}
