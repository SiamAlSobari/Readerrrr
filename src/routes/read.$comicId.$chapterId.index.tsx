import { getChapterDetail, getComicDetail } from "@/api/servers/shinigami.server";
import { Button } from "@/common/shadcn-ui/button";
import { setChapterHistory } from "@/common/utils/chapter-history";
import { ChapterImage } from "@/features/chapter/ChapterImage";
import ChapterNavigation from "@/features/chapter/ChapterNavigation";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { JsonLd } from "@/common/components/JsonLd";

const SITE_URL = "https://komik-reader.my.id";

export const Route = createFileRoute("/read/$comicId/$chapterId/")({
  component: ReadChapterPage,
  head: ({ params, match }) => ({
    meta: [
      {
        name: "description",
        content: `Baca Chapter ${params.chapterId} KOMIK online gratis di KOMIK READER. Nikmati pengalaman membaca komik terbaik.`,
      },
      { property: "og:title", content: `Chapter ${params.chapterId} - KOMIK READER` },
      {
        property: "og:description",
        content: `Baca Chapter ${params.chapterId} komik online gratis. Update terbaru setiap hari di KOMIK READER.`,
      },
      { property: "og:url", content: `${SITE_URL}${location.pathname}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `Chapter ${params.chapterId} - KOMIK READER` },
      {
        name: "twitter:description",
        content: `Baca Chapter ${params.chapterId} komik online gratis di KOMIK READER.`,
      },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}${match.pathname}` },
    ],
    title: `Chapter ${params.chapterId} - Baca KOMIK Online | KOMIK READER`,
  }),
});

function ReadChapterPage() {
  const { comicId, chapterId } = Route.useParams();
  const chapterDetail = useServerFn(getChapterDetail);
  const comicDetail = useServerFn(getComicDetail);
  const navigate = useNavigate();

  const { data: chapter } = useQuery({
    queryKey: ["chapter", chapterId],
    queryFn: () => chapterDetail({ data: { chapterId } }),
  });

  const { data: comic } = useQuery({
    queryKey: ["comic", comicId],
    queryFn: () => comicDetail({ data: { comicId } }),
  });

  useEffect(() => {
    if (!chapter?.data.data) return;
    setChapterHistory({
      comic_id: comicId,
      chapter_id: chapter.data.data.chapter_id,
      chapter_number: chapter.data.data.chapter_number,
      last_read_time: Date.now(),
      comic_title: comic?.data.data?.title,
      comic_cover_url: comic?.data.data?.cover_portrait_url || comic?.data.data?.cover_image_url,
    });
    console.log('data history tersimpan');
  }, [chapter?.data.data, comic?.data.data, comicId, chapterId]);

  return (
    <div className="bg-black text-white min-h-screen">
      {chapter?.data.data && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `Chapter ${chapter.data.data.chapter_number} - ${chapter.data.data.chapter_title || ""}`,
            description: `Baca Chapter ${chapter.data.data.chapter_number} komik online gratis di KOMIK READER.`,
            url: `${SITE_URL}/read/${comicId}/${chapterId}`,
          }}
        />
      )}
      {chapter?.data.data && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, item: { "@id": SITE_URL, name: "Beranda" } },
              { "@type": "ListItem", position: 2, item: { "@id": `${SITE_URL}/series/${comicId}`, name: comic?.data.data?.title || "Detail Komik" } },
              { "@type": "ListItem", position: 3, item: { "@id": `${SITE_URL}/read/${comicId}/${chapterId}`, name: `Chapter ${chapter.data.data.chapter_number}` } },
            ],
          }}
        />
      )}
      {/* TOP NAV */}
      <ChapterNavigation
        key={chapter?.data.data.chapter_id}
        comicId={comicId}
        chapter={chapter?.data.data!}
      />

      {/* ACTION BAR */}
      <div
        className="
          mx-auto
          w-full
          max-w-180
          sm:max-w-160
          md:max-w-170
          lg:max-w-170
          px-4
          py-4
          flex items-center gap-3
        "
      >
        <Button
          variant="secondary"
          className="
              gap-2
              bg-white/10
              hover:bg-white/20
              text-white
              border border-white/10
            "
          onClick={() => {
            navigate({
              to: "/series/$comicId",
              params: { comicId },
              search: {
                page: 1,
              },
            });
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Button>

        <span className="text-sm text-white/50">
          Chapter {chapter?.data.data.chapter_number}
        </span>
      </div>

      {/* READER */}
      <div
        className="
          mx-auto
          w-full
          max-w-180
          sm:max-w-160
          md:max-w-170
          lg:max-w-170
          bg-black
        "
      >
        {chapter?.data.data.chapter.data.map((img, index) => {
          const imageUrl = `${chapter.data.data.base_url_low}${chapter.data.data.chapter.path}${img}`;

          return (
            <ChapterImage
              key={index}
              src={imageUrl}
              alt={`Page ${index + 1}`}
              priority={index === 0}
            />
          );
        })}
      </div>

      {/* BOTTOM NAV */}
      <div className="mt-6">
        <ChapterNavigation
        key={chapter?.data.data.chapter_id}
        comicId={comicId}
        chapter={chapter?.data.data!}
/>
      </div>
    </div>
  );
}
