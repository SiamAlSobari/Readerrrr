import { getChapterDetail } from "@/api/servers/shinigami.server";
import { Button } from "@/common/shadcn-ui/button";
import { setChapterHistory } from "@/common/utils/chapter-history";
import { ChapterImage } from "@/features/chapter/ChapterImage";
import ChapterNavigation from "@/features/chapter/ChapterNavigation";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

export const Route = createFileRoute("/read/$comicId/$chapterId/")({
  component: ReadChapterPage,
});

function ReadChapterPage() {
  const { comicId, chapterId } = Route.useParams();
  const chapterDetail = useServerFn(getChapterDetail);
  const navigate = useNavigate();

  const { data: chapter } = useQuery({
    queryKey: ["chapter", chapterId],
    queryFn: () => chapterDetail({ data: { chapterId } }),
  });

  useEffect(() => {
    if (!chapter?.data.data) return;
    setChapterHistory({
      comic_id: comicId,
      chapter_id: chapter?.data.data.chapter_id,
      chapter_number: chapter?.data.data.chapter_number,
      last_read_time: Date.now(),
    });
    console.log('data history tersimpan');
  }, [chapter?.data.data, comicId, chapterId]);

  return (
    <div className="bg-black text-white min-h-screen">
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
            />
          );
        })}
      </div>

      {/* BOTTOM NAV */}
      <div className="mt-6">
        {/* <ChapterNavigation
        key={chapter?.data.data.chapter_id}
        comicId={comicId}
        chapter={chapter?.data.data!}
/> */}
      </div>
    </div>
  );
}
