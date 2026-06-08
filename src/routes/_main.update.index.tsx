import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/common/shadcn-ui/button";
import { Badge } from "@/common/shadcn-ui/badge";
import { Eye, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse, UpdateComic } from "@/common/interface";
import { API_URL } from "@/common/utils/env";


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

      // Open Graph
      { property: "og:title", content: "KOMIK READER – Update KOMIK Terbaru" },
      {
        property: "og:description",
        content:
          "Dapatkan update KOMIK terbaru setiap hari! Jangan ketinggalan chapter favoritmu di KOMIK READER.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `https://komik-reader.my.id${match.pathname}` },
      { property: "og:image", content: "/komik_reader.png" },

      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "KOMIK READER – Update KOMIK Terbaru" },
      {
        name: "twitter:description",
        content:
          "Dapatkan update manga, manhwa, manhua terbaru setiap hari! Jangan ketinggalan chapter favoritmu di KOMIK READER.",
      },
      { name: "twitter:image", content: "/komik_reader.png" },
    ],
    links: [
      { rel: "canonical", href: `https://komik-reader.my.id${match.pathname}` },
      { rel: "icon", href: "/komik_reader.png", type: "image/x-icon" },
    ],
    title: "KOMIK READER – Update Manga, Manhwa & Manhua Terbaru",
  }),
});

function ComicCard({ comic }: { comic: UpdateComic }) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600"
    >
      {/* Cover */}
      <img
        src={comic.cover_image_url}
        alt={comic.title}
        className="aspect-3/4 w-full object-cover group-hover:scale-110 transition-transform duration-500"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Actions */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          onClick={() =>
            navigate({
              to: "/series/$comicId",
              search: { page: 1 },
              params: { comicId: comic.manga_id },
            })
          }
          size="sm"
          className="w-32"
        >
          <Eye className="mr-2 h-4 w-4" />
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
          className="w-32"
        >
          <BookOpen className="mr-2 h-4 w-4" />
          Read
        </Button>
      </div>

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black via-black/80 to-transparent">
        <h3 className="text-sm font-semibold line-clamp-2 text-white">
          {comic.title}
        </h3>

        <p className="text-xs text-zinc-300 mt-1">
          Ch {comic.latest_chapter_number} •{" "}
          {formatDistanceToNow(new Date(comic.latest_chapter_time), {
            addSuffix: true,
          })}
        </p>

        <div className="flex gap-1.5 mt-2 flex-wrap">
          {comic.taxonomy?.Genre?.slice(0, 2).map((g) => (
            <Badge key={g.name} variant="secondary" className="text-xs">
              {g.name}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function RouteComponent() {
  const [type, setType] = useState<"mirror" | "project">("mirror");
  const [page, setPage] = useState(1);

  const { data: comics, isLoading } = useQuery({
    queryKey: ["comic-update", type, page],
    queryFn: async () => {
      const url =
        `${API_URL}/manga/list` +
        `?type=${type}` +
        `&page=${page}` +
        `&page_size=16` +
        `&is_update=true` +
        `&sort=latest` +
        `&sort_order=desc`;

      const res = await fetch(url);
      const json = await res.json();

      // IMPORTANT: return LIST-NYA
      return json as ApiResponse<UpdateComic>;
    },
  });
  return (
    <div className="min-h-screen px-4 py-6 md:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* ========== SIDEBAR ========== */}
        <aside className="md:w-64 shrink-0">
          <h2 className="text-lg font-semibold mb-3 hidden md:block">
            Update Type
          </h2>

          <div className="flex md:flex-col gap-2 bg-zinc-900/50 p-3 rounded-xl md:bg-transparent">
            <Button
              variant={type === "mirror" ? "default" : "ghost"}
              onClick={() => {
                setPage(1);
                setType("mirror");
              }}
            >
              Mirror Comic
            </Button>

            <Button
              variant={type === "project" ? "default" : "ghost"}
              onClick={() => {
                setPage(1);
                setType("project");
              }}
            >
              Project Comic
            </Button>
          </div>
        </aside>

        {/* ========== CONTENT ========== */}
        <div className="flex-1 space-y-8">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-3/4 rounded-xl bg-zinc-800 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${type}-${page}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4"
              >
                {comics?.data.map((comic: UpdateComic) => (
                  <ComicCard key={comic.manga_id} comic={comic} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          <div className="flex justify-center items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft />
            </Button>

            <p className="text-sm text-zinc-500">Page {page}</p>

            <Button
              size="icon"
              variant="outline"
              disabled={page === comics?.meta.total_page}
              onClick={() => setPage((p) => p + 1)}
            >
              <ChevronRight />
            </Button>
          </div>
          {/* 
          {isFetching && (
            <p className="text-center text-xs text-zinc-500">
              Updating...
            </p>
          )} */}
        </div>
      </div>
    </div>
  );
}
