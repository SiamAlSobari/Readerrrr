import { getChapterDetail, getComicDetail } from "@/api/servers/shinigami.server";
import { Button } from "@/common/shadcn-ui/button";
import { setChapterHistory } from "@/common/utils/chapter-history";
import { ChapterImage } from "@/features/chapter/ChapterImage";
import ChapterNavigation from "@/features/chapter/ChapterNavigation";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowUp, ChevronLeft, ChevronRight, Play, Pause, Image as ImageIcon } from "lucide-react";
import { useEffect, useState, useRef, useCallback, memo } from "react";
import { JsonLd } from "@/common/components/JsonLd";

const SITE_URL = "https://komik-reader.my.id";

const queryChapter = (chapterId: string) =>
  queryOptions({
    queryKey: ["chapter", chapterId],
    queryFn: () => getChapterDetail({ data: { chapterId } }),
    staleTime: 1000 * 60 * 60, // 1 jam
  });

const queryComic = (comicId: string) =>
  queryOptions({
    queryKey: ["comic", comicId],
    queryFn: () => getComicDetail({ data: { comicId } }),
    staleTime: 1000 * 60 * 30, // 30 menit
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
    const chapterNum = chapter?.chapter_number ? `Chapter ${chapter.chapter_number}` : `Chapter ${params.chapterId}`;
    const coverImage = comic?.cover_portrait_url || comic?.cover_image_url || `${SITE_URL}/komik_reader.png`;
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
      links: [
        { rel: "canonical", href: canonicalUrl },
      ],
      title,
    };
  },
  component: ReadChapterPage,
});

/**
 * Isolated Progress Bar Component: Updates independently without re-rendering chapter images
 */
const ReadingProgressBar = memo(function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const p = Math.min(100, Math.max(0, Math.round((window.scrollY / totalHeight) * 100)));
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
    <div className="fixed top-0 left-0 right-0 h-1 bg-zinc-900 z-50 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-red-600 via-red-500 to-amber-400 transition-all duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
});

/**
 * Isolated Floating Action Bar: Shows reading percentage and controls without re-rendering parent
 */
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
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const p = Math.min(100, Math.max(0, Math.round((window.scrollY / totalHeight) * 100)));
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
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 backdrop-blur-md px-3 py-2 rounded-2xl shadow-2xl">
      <span className="text-xs font-semibold text-zinc-300 px-2 min-w-9 text-center">
        {readingProgress}%
      </span>

      {prevChapterId && (
        <button
          onClick={() => navigate({ to: "/read/$comicId/$chapterId", params: { comicId, chapterId: prevChapterId } })}
          className="p-2 hover:bg-white/10 rounded-xl text-zinc-300 hover:text-white transition-colors"
          title="Chapter Sebelumnya"
          aria-label="Chapter Sebelumnya"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      {nextChapterId && (
        <button
          onMouseEnter={onPreloadNext}
          onClick={() => navigate({ to: "/read/$comicId/$chapterId", params: { comicId, chapterId: nextChapterId } })}
          className="p-2 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors font-bold"
          title="Chapter Selanjutnya"
          aria-label="Chapter Selanjutnya"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      <button
        onClick={scrollToTop}
        className="p-2 hover:bg-white/10 rounded-xl text-zinc-300 hover:text-white transition-colors border-l border-zinc-800 ml-1"
        title="Kembali ke atas"
        aria-label="Kembali ke atas"
      >
        <ArrowUp className="w-4 h-4" />
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
  const [autoScrollSpeed] = useState(2); // pixels per frame
  const autoScrollRef = useRef<number | null>(null);

  const { data: chapter, isLoading: isChapterLoading } = useQuery(queryChapter(chapterId));
  const { data: comic } = useQuery(queryComic(comicId));

  const chapterData = chapter?.data?.data;
  const comicData = comic?.data?.data;

  // Save reading history
  useEffect(() => {
    if (!chapterData) return;
    setChapterHistory({
      comic_id: comicId,
      chapter_id: chapterData.chapter_id,
      chapter_number: chapterData.chapter_number,
      last_read_time: Date.now(),
      comic_title: comicData?.title,
      comic_cover_url: comicData?.cover_portrait_url || comicData?.cover_image_url,
    });
  }, [chapterData, comicData, comicId]);

  // Preload next chapter query data in background
  useEffect(() => {
    if (chapterData?.next_chapter_id) {
      queryClient.prefetchQuery(queryChapter(chapterData.next_chapter_id));
    }
  }, [chapterData?.next_chapter_id, queryClient]);

  // Preload initial 5 images immediately
  useEffect(() => {
    if (!chapterData?.chapter?.data) return;
    const images = chapterData.chapter.data;
    const baseUrl = useHighQuality ? chapterData.base_url : chapterData.base_url_low;
    const path = chapterData.chapter.path;

    images.slice(0, 5).forEach(img => {
      const imgObj = new Image();
      imgObj.src = `${baseUrl}${path}${img}`;
    });
  }, [chapterData, useHighQuality]);

  // Preload next chapter images on demand (e.g. hover next button)
  const handlePreloadNextChapter = useCallback(() => {
    if (!chapterData?.next_chapter_id) return;
    queryClient.prefetchQuery(queryChapter(chapterData.next_chapter_id)).then((data: any) => {
      const nextImages = data?.data?.data?.chapter?.data;
      const nextBase = useHighQuality ? data?.data?.data?.base_url : data?.data?.data?.base_url_low;
      const nextPath = data?.data?.data?.chapter?.path;
      if (nextImages && nextBase && nextPath) {
        nextImages.slice(0, 3).forEach((img: string) => {
          const preloadImg = new Image();
          preloadImg.src = `${nextBase}${nextPath}${img}`;
        });
      }
    });
  }, [chapterData?.next_chapter_id, queryClient, useHighQuality]);

  // Auto Scroll Loop (runs cleanly on requestAnimationFrame)
  const startAutoScroll = useCallback(() => {
    if (autoScrollRef.current) cancelAnimationFrame(autoScrollRef.current);
    const scrollStep = () => {
      window.scrollBy({ top: autoScrollSpeed, behavior: "instant" });
      if (window.innerHeight + window.scrollY < document.documentElement.scrollHeight - 10) {
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

  // Keyboard navigation
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
  const primaryBaseUrl = useHighQuality ? chapterData?.base_url : chapterData?.base_url_low;
  const fallbackBaseUrl = useHighQuality ? chapterData?.base_url_low : chapterData?.base_url;
  const path = chapterData?.chapter?.path ?? "";

  return (
    <div className="bg-black text-white min-h-screen relative selection:bg-red-500 selection:text-white">
      {/* READING PROGRESS BAR (ISOLATED) */}
      <ReadingProgressBar />

      {/* SEO STRUCTURED DATA */}
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
              image: comicData?.cover_portrait_url || comicData?.cover_image_url,
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
                { "@type": "ListItem", position: 1, item: { "@id": SITE_URL, name: "Beranda" } },
                { "@type": "ListItem", position: 2, item: { "@id": `${SITE_URL}/series/${comicId}`, name: comicData?.title || "Detail Komik" } },
                { "@type": "ListItem", position: 3, item: { "@id": `${SITE_URL}/read/${comicId}/${chapterId}`, name: `Chapter ${chapterData.chapter_number}` } },
              ],
            }}
          />
        </>
      )}

      {/* TOP CHAPTER NAVIGATION */}
      {chapterData && (
        <ChapterNavigation
          comicId={comicId}
          chapter={chapterData}
        />
      )}

      {/* TOOLBAR & CONTROL BAR */}
      <div className="mx-auto w-full max-w-3xl px-4 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-900">
        <div className="flex items-center gap-3 min-w-0">
          <Button
            variant="secondary"
            className="gap-2 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 rounded-xl text-xs shrink-0"
            onClick={() => {
              navigate({
                to: "/series/$comicId",
                params: { comicId },
                search: { page: 1 },
              });
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Detail Komik</span>
          </Button>

          {/* PRIMARY H1 FOR SEO */}
          <h1 className="text-xs sm:text-sm font-extrabold text-white truncate max-w-xs sm:max-w-md">
            Baca {comicData?.title || comicId} Ch. {chapterData?.chapter_number || chapterId}
          </h1>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-2">
          {/* HD Quality Toggle */}
          <button
            onClick={() => setUseHighQuality(prev => !prev)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              useHighQuality
                ? "bg-red-500/20 border-red-500/40 text-red-400"
                : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
            }`}
            title="Ubah Kualitas Gambar"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>{useHighQuality ? "Kualitas HD" : "Hemat Data"}</span>
          </button>

          {/* Auto Scroll Toggle */}
          <button
            onClick={() => setIsAutoScrolling(prev => !prev)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              isAutoScrolling
                ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400 animate-pulse"
                : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
            }`}
            title="Auto Scroll Reader"
          >
            {isAutoScrolling ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>Auto Scroll</span>
          </button>
        </div>
      </div>

      {/* MANHWA READER CONTAINER */}
      <main className="mx-auto w-full max-w-3xl bg-black min-h-[60vh] shadow-2xl">
        {isChapterLoading ? (
          <div className="py-24 text-center space-y-4">
            <div className="w-10 h-10 border-3 border-red-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-zinc-400 font-medium">Memuat chapter manhwa...</p>
          </div>
        ) : imagesList.length === 0 ? (
          <div className="py-24 text-center text-zinc-500">
            Chapter tidak memiliki gambar atau tidak tersedia.
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
          <ChapterNavigation
            comicId={comicId}
            chapter={chapterData}
          />
        </div>
      )}

      {/* FLOATING ACTION BAR (ISOLATED) */}
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
