import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, memo } from "react";
import { BookOpen, ChevronLeft, ChevronRight, ArrowUpRight, Star } from "lucide-react";
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

const COUNTRY_CODE: Record<string, string> = {
  KR: "KR · MANHWA",
  JP: "JP · MANGA",
  CN: "CN · MANHUA",
  ID: "ID · KOMIK",
};

const UpdateDispatchCard = memo(function UpdateDispatchCard({
  comic,
}: {
  comic: UpdateComic;
}) {
  const [imgError, setImgError] = useState(false);
  const originCode = COUNTRY_CODE[comic.country_id] || "INT · KOMIK";
  const genres = comic.taxonomy?.Genre?.slice(0, 2) ?? [];

  return (
    <article className="group flex flex-col border border-[#27272e] bg-[#101014] transition-colors hover:border-[#f4f1ea] hover:bg-[#141418]">
      {/* Top Stamp Header */}
      <div className="flex items-center justify-between border-b border-[#27272e] bg-[#0c0c10] px-2.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider tabular-nums">
        <span className="text-[#c8c2b6] truncate">{originCode}</span>
        {comic.user_rate > 0 ? (
          <span className="flex items-center gap-1 text-[#fbbf24] shrink-0">
            <Star className="h-3 w-3 fill-[#fbbf24] text-[#fbbf24]" />
            {Number(comic.user_rate).toFixed(1)}
          </span>
        ) : (
          <span className="text-[#34d399] shrink-0">BARU</span>
        )}
      </div>

      {/* Cover Image Link */}
      <Link
        to="/series/$comicId"
        params={{ comicId: comic.manga_id }}
        search={{ page: 1 }}
        className="relative aspect-3/4 w-full overflow-hidden bg-[#141418] block"
      >
        {!imgError && comic.cover_image_url ? (
          <img
            src={comic.cover_image_url}
            alt={comic.title}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-3 text-center font-mono text-xs font-bold uppercase text-[#c8c2b6]">
            {comic.title}
          </div>
        )}

        {/* Obi Strip */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-[#27272e] bg-[#09090b]/95 px-2.5 py-1.5 font-mono text-xs font-bold tabular-nums">
          <span className="text-[#f43f5e]">CH. {comic.latest_chapter_number}</span>
          <span className="text-[#34d399] truncate max-w-[110px]">
            {comic.latest_chapter_time
              ? formatDistanceToNow(new Date(comic.latest_chapter_time), {
                  addSuffix: true,
                  locale: id,
                })
              : "Baru saja"}
          </span>
        </div>
      </Link>

      {/* Body Info */}
      <div className="flex flex-1 flex-col justify-between p-3">
        <div>
          <Link
            to="/series/$comicId"
            params={{ comicId: comic.manga_id }}
            search={{ page: 1 }}
            className="line-clamp-2 font-sans text-sm font-bold leading-snug text-[#f4f1ea] group-hover:text-[#f43f5e] transition-colors"
          >
            {comic.title}
          </Link>

          {genres.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {genres.map((g) => (
                <span
                  key={g.name}
                  className="border border-[#27272e] bg-[#0c0c10] px-1.5 py-0.5 font-mono text-xs uppercase text-[#c8c2b6]"
                >
                  {g.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Direct Action Split Bar (Accessible on both Mobile & Desktop) */}
        <div className="mt-3 grid grid-cols-2 gap-1.5 border-t border-[#27272e] pt-2.5 font-mono text-xs font-bold uppercase">
          <Link
            to="/read/$comicId/$chapterId"
            params={{
              chapterId: comic.latest_chapter_id,
              comicId: comic.manga_id,
            }}
            className="flex min-h-9 items-center justify-center gap-1 bg-[#be123c] px-2 py-1.5 text-[#f4f1ea] transition-colors hover:bg-[#9f1239]"
          >
            <BookOpen className="h-3 w-3 shrink-0" />
            <span className="truncate">Baca</span>
          </Link>

          <Link
            to="/series/$comicId"
            params={{ comicId: comic.manga_id }}
            search={{ page: 1 }}
            className="flex min-h-9 items-center justify-center gap-1 border border-[#27272e] bg-[#141418] px-2 py-1.5 text-[#f4f1ea] transition-colors hover:border-[#f4f1ea]"
          >
            <span className="truncate">Detail</span>
            <ArrowUpRight className="h-3 w-3 shrink-0 text-[#c8c2b6]" />
          </Link>
        </div>
      </div>
    </article>
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
  const totalPages = comics?.meta?.total_page || 1;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Update Komik Terbaru",
          description:
            "Update manga, manhwa, dan manhua terbaru setiap hari di KOMIK READER.",
          url: `${SITE_URL}/update`,
        }}
      />

      {/* Masthead */}
      <header className="mb-8 flex flex-col justify-between gap-4 border-b border-[#27272e] pb-6 md:flex-row md:items-end">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#f4f1ea]">
            Update Komik Terbaru
          </h1>
          <p className="mt-1.5 max-w-[65ch] text-sm text-[#c8c2b6]">
            Daftar komik yang baru merilis chapter hari ini. Pilih Mirror untuk rilis cepat atau Project untuk garapan tim translasi khusus.
          </p>
        </div>

        {/* Feed Source Switcher */}
        <div
          role="tablist"
          aria-label="Sumber pembaruan komik"
          className="flex border border-[#27272e] bg-[#0c0c10] self-start md:self-auto"
        >
          <button
            type="button"
            role="tab"
            aria-selected={type === "mirror"}
            onClick={() => {
              setType("mirror");
              setPage(1);
            }}
            className={`min-h-11 border-r border-[#27272e] px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors ${
              type === "mirror"
                ? "bg-[#be123c] text-[#f4f1ea]"
                : "bg-[#141418] text-[#c8c2b6] hover:bg-[#181820] hover:text-[#f4f1ea]"
            }`}
          >
            Mirror [Rilis Cepat]
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={type === "project"}
            onClick={() => {
              setType("project");
              setPage(1);
            }}
            className={`min-h-11 px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors ${
              type === "project"
                ? "bg-[#be123c] text-[#f4f1ea]"
                : "bg-[#141418] text-[#c8c2b6] hover:bg-[#181820] hover:text-[#f4f1ea]"
            }`}
          >
            Project [Tim TL]
          </button>
        </div>
      </header>

      {/* Status Bar */}
      <div className="mb-6 flex items-center justify-between border border-[#27272e] bg-[#0c0c10] px-4 py-2.5 font-mono text-xs uppercase text-[#c8c2b6] tabular-nums">
        <span>
          SUMBER:{" "}
          <strong className="text-[#f4f1ea]">
            {type === "mirror" ? "MIRROR" : "PROJECT"}
          </strong>
        </span>
        <span>
          HALAMAN {page} / {totalPages}
        </span>
      </div>

      {/* Cards Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse flex flex-col border border-[#27272e] bg-[#101014]"
            >
              <div className="h-7 border-b border-[#27272e] bg-[#0c0c10]" />
              <div className="aspect-3/4 w-full bg-[#141418]" />
              <div className="p-3 space-y-2">
                <div className="h-4 w-4/5 bg-[#181820]" />
                <div className="h-8 w-full bg-[#181820] mt-3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {comics?.data.map((comic: UpdateComic) => (
            <UpdateDispatchCard key={comic.manga_id} comic={comic} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-10 flex items-center justify-between border border-[#27272e] bg-[#0c0c10] p-3">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => {
            setPage((p) => Math.max(1, p - 1));
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="inline-flex min-h-11 items-center gap-2 border border-[#27272e] bg-[#141418] px-4 py-2 font-mono text-xs font-bold uppercase text-[#f4f1ea] transition-colors hover:border-[#f4f1ea] disabled:opacity-40 disabled:pointer-events-none"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Sebelumnya</span>
        </button>

        <span className="font-mono text-xs font-bold uppercase text-[#c8c2b6] tabular-nums">
          HALAMAN {page} DARI {totalPages}
        </span>

        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => {
            setPage((p) => p + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="inline-flex min-h-11 items-center gap-2 border border-[#27272e] bg-[#141418] px-4 py-2 font-mono text-xs font-bold uppercase text-[#f4f1ea] transition-colors hover:border-[#f4f1ea] disabled:opacity-40 disabled:pointer-events-none"
        >
          <span>Selanjutnya</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
