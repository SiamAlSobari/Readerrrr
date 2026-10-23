import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, memo } from "react";
import { Button } from "@/common/shadcn-ui/button";
import { Badge } from "@/common/shadcn-ui/badge";
import { Eye, BookOpen, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import type { UpdateComic } from "@/common/interface";
import { JsonLd } from "@/common/components/JsonLd";
import { getComicUpdate } from "@/api/servers/shinigami.server";
import { useServerFn } from "@tanstack/react-start";

const SITE_URL = "https://komik-reader.my.id";

export const Route = createFileRoute("/_main/update/")({
  component: RouteComponent,
  head: ({ match }) => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "description",
        content:
          "Update KOMIK terbaru setiap hari! Jangan ketinggalan chapter terbaru favoritmu di KOMIK READER.",
      },
      {
        name: "keywords",
        content:
          "komik terbaru, update komik, komik update hari ini, manga terbaru, manhwa terbaru, manhua terbaru, komik reader",
      },
      { name: "author", content: "KOMIK READER" },

      { property: "og:title", content: "KOMIK READER – Update KOMIK Terbaru" },
      {
        property: "og:description",
        content:
          "Dapatkan update KOMIK terbaru setiap hari! Jangan ketinggalan chapter favoritmu di KOMIK READER.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}${match.pathname}` },
      { property: "og:image", content: "/komik_reader.png" },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "KOMIK READER – Update KOMIK Terbaru" },
      {
        name: "twitter:description",
        content:
          "Dapatkan update manga, manhwa, manhua terbaru setiap hari! Jangan ketinggalan chapter favoritmu di KOMIK READER.",
      },
      { name: "twitter:image", content: "/komik_reader.png" },
    ],
    title: "KOMIK READER – Update Manga, Manhwa & Manhua Terbaru",
  }),
});

const ComicCard = memo(function ComicCard({ comic }: { comic: UpdateComic }) {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1.5"
    >
      {/* Cover */}
      <div className="aspect-3/4 w-full overflow-hidden bg-zinc-850 relative">
        {!imgError && comic.cover_image_url ? (
          <img
            src={comic.cover_image_url}
            alt={comic.title}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-500 text-xs font-bold p-3 text-center">
            {comic.title}
          </div>
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Actions */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <Button
          onClick={() =>
            navigate({
              to: "/series/$comicId",
              search: { page: 1 },
              params: { comicId: comic.manga_id },
            })
          }
          size="sm"
          className="w-28 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl text-xs"
        >
          <Eye className="mr-1.5 h-3.5 w-3.5" />
          Detail
        </Button>
        <Button
          onClick={() =>
            navigate({
              to: "/read/$comicId/$chapterId",
              params: {
                chapterId: comic.latest_chapter_id,
                comicId: comic.manga_id,
              },
            })
          }
          size="sm"
          variant="secondary"
          className="w-28 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-xs"
        >
          <BookOpen className="mr-1.5 h-3.5 w-3.5" />
          Baca
        </Button>
      </div>

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent z-10">
        <h3 className="text-xs sm:text-sm font-extrabold line-clamp-2 text-white group-hover:text-red-400 transition-colors">
          {comic.title}
        </h3>

        <p className="text-[11px] text-zinc-400 mt-1 font-medium">
          Ch. {comic.latest_chapter_number} •{" "}
          {comic.latest_chapter_time ? formatDistanceToNow(new Date(comic.latest_chapter_time), {
            addSuffix: true,
            locale: id,
          }) : "Baru saja"}
        </p>

        <div className="flex gap-1 mt-1.5 flex-wrap">
          {comic.taxonomy?.Genre?.slice(0, 2).map((g) => (
            <Badge key={g.name} variant="secondary" className="text-[9px] px-1.5 py-0 rounded bg-zinc-800 text-zinc-300 border-none">
              {g.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
});

function RouteComponent() {
  const [type, setType] = useState<"mirror" | "project">("mirror");
  const [page, setPage] = useState(1);
  const fetchComicUpdate = useServerFn(getComicUpdate);

  const { data: updateResponse, isLoading } = useQuery({
    queryKey: ["comic-update", type, page],
    queryFn: () =>
      fetchComicUpdate({
        data: {
          type,
          page,
          pageSize: 16,
        },
      }),
  });

  const comics = updateResponse?.data;

  return (
    <div className="min-h-screen container mx-auto px-4 py-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Update Komik Terbaru",
          description: "Update manga, manhwa, dan manhua terbaru setiap hari di KOMIK READER.",
          url: `${SITE_URL}/update`,
        }}
      />

      <div className="flex flex-col md:flex-row gap-6">
        {/* ========== SIDEBAR ========== */}
        <aside className="md:w-56 shrink-0">
          <div className="flex items-center gap-2 mb-3">
            <RefreshCw className="w-5 h-5 text-red-500" />
            <h2 className="text-base font-extrabold text-white">
              Tipe Update
            </h2>
          </div>

          <div className="flex md:flex-col gap-2 bg-zinc-900/60 p-2 rounded-2xl border border-zinc-800/80">
            <Button
              variant={type === "mirror" ? "default" : "ghost"}
              className={`rounded-xl text-xs font-bold justify-start ${
                type === "mirror" ? "bg-red-500 hover:bg-red-600 text-white" : "text-zinc-400 hover:text-white"
              }`}
              onClick={() => {
                setType("mirror");
                setPage(1);
              }}
            >
              Mirror (Rilis Cepat)
            </Button>

            <Button
              variant={type === "project" ? "default" : "ghost"}
              className={`rounded-xl text-xs font-bold justify-start ${
                type === "project" ? "bg-red-500 hover:bg-red-600 text-white" : "text-zinc-400 hover:text-white"
              }`}
              onClick={() => {
                setType("project");
                setPage(1);
              }}
            >
              Project (Official TL)
            </Button>
          </div>
        </aside>

        {/* ========== MAIN CONTENT ========== */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
            <h1 className="text-xl font-extrabold text-white">
              Daftar Update Komik
            </h1>
            <span className="text-xs text-zinc-400">
              {type === "mirror" ? "Sumber: Mirror" : "Sumber: Project"}
            </span>
          </div>

          {/* Cards Grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-3/4 rounded-2xl bg-zinc-850 animate-pulse border border-zinc-800/80"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
              {comics?.data.map((comic: UpdateComic) => (
                <ComicCard key={comic.manga_id} comic={comic} />
              ))}
            </div>
          )}

          <div className="flex justify-center items-center gap-3 pt-4">
            <Button
              size="icon"
              variant="outline"
              disabled={page === 1}
              className="rounded-xl border-zinc-800 bg-zinc-900"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <p className="text-xs text-zinc-400 font-medium">Halaman {page}</p>

            <Button
              size="icon"
              variant="outline"
              disabled={page === comics?.meta.total_page}
              className="rounded-xl border-zinc-800 bg-zinc-900"
              onClick={() => setPage((p) => p + 1)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
