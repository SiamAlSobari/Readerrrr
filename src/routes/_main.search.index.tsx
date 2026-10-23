import { searchComicServer } from "@/api/servers/shinigami.server";
import BaseComicCard from "@/features/comic/BaseComicCard";
import BaseComicCardSkeleton from "@/features/comic/BaseComicCardSkeleton";
import { Button } from "@/common/shadcn-ui/button";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Search as SearchIcon, Frown } from "lucide-react";
import { JsonLd } from "@/common/components/JsonLd";

type Search = {
  q: string;
};

const SITE_URL = "https://komik-reader.my.id";

export const Route = createFileRoute("/_main/search/")({
  validateSearch: (search: Record<string, string>): Search => ({
    q: search.q || "",
  }),
  component: RouteComponent,
  head: ({ match, search }) => {
    const queryTerm = search?.q ? `"${search.q}"` : "";
    const title = queryTerm
      ? `Hasil Pencarian ${queryTerm} - KOMIK READER`
      : "Cari KOMIK Online Gratis - KOMIK READER";
    const description = search?.q
      ? `Temukan hasil pencarian komik untuk ${queryTerm} di KOMIK READER. Manga, Manhwa, dan Manhua Bahasa Indonesia.`
      : "Cari dan temukan ribuan judul KOMIK favoritmu di KOMIK READER. Manga, Manhwa, Manhua terlengkap.";

    return {
      meta: [
        { name: "description", content: description },
        { name: "keywords", content: "cari komik, search komik, komik online, baca komik, manga, manhwa, manhua" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `${SITE_URL}${match.pathname}` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      title,
    };
  },
});

const PAGE_SIZE = 12;

function RouteComponent() {
  const { q } = Route.useSearch();
  const [page, setPage] = useState(1);
  const fetchSearch = useServerFn(searchComicServer);

  const {
    data,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["search", q, page],
    queryFn: async () => {
      if (!q.trim()) return { data: [], meta: { page: 1, total_page: 1, total_data: 0 } };
      const res = await fetchSearch({ data: { q: q.trim(), page, pageSize: PAGE_SIZE } });
      return res.data;
    },
    enabled: !!q.trim(),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });

  const comics = data?.data ?? [];
  const totalPage = data?.meta?.total_page ?? 1;
  const totalData = data?.meta?.total_data ?? comics.length;

  return (
    <div className="space-y-6 container mx-auto px-4 py-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SearchResultsPage",
          name: `Pencarian: ${q}`,
          url: `${SITE_URL}/search?q=${encodeURIComponent(q)}`,
        }}
      />

      {/* Header */}
      <div className="border-b border-zinc-800/80 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <SearchIcon className="w-5 h-5 text-red-500" />
          <h1 className="text-2xl font-extrabold text-white">
            Hasil Pencarian: <span className="text-red-400">"{q}"</span>
          </h1>
        </div>
        <p className="text-sm text-zinc-400">
          Ditemukan {totalData} komik terkait
        </p>
      </div>

      {/* Content */}
      {isLoading ? (
        <GridSkeleton />
      ) : comics.length === 0 ? (
        <NotFound query={q} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {comics.map((comic) => (
            <BaseComicCard key={comic.manga_id} comic={comic} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {comics.length > 0 && (
        <div className="flex justify-center items-center gap-3 pt-6">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1 || isFetching}
            className="rounded-xl border-zinc-800 bg-zinc-900 text-xs"
            onClick={() => {
              setPage((p) => p - 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Sebelumnya
          </Button>

          <span className="text-xs text-zinc-400 font-medium">
            Halaman {page} dari {totalPage}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPage || isFetching}
            className="rounded-xl border-zinc-800 bg-zinc-900 text-xs"
            onClick={() => {
              setPage((p) => p + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Selanjutnya
          </Button>
        </div>
      )}
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
      {Array.from({ length: PAGE_SIZE }).map((_, i) => (
        <BaseComicCardSkeleton key={i} />
      ))}
    </div>
  );
}

function NotFound({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center bg-zinc-900/30 border border-zinc-800/80 rounded-3xl p-6">
      <Frown className="w-12 h-12 text-zinc-600 mb-3" />
      <h2 className="text-lg font-bold text-zinc-300">
        Komik "{query}" tidak ditemukan
      </h2>
      <p className="text-sm text-zinc-500 mt-1 max-w-md">
        Coba gunakan kata kunci lain atau periksa kembali ejaan pencarian Anda.
      </p>
    </div>
  );
}
