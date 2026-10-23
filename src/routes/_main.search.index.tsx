import { searchComicServer } from "@/api/servers/shinigami.server";
import BaseComicCard from "@/features/comic/BaseComicCard";
import BaseComicCardSkeleton from "@/features/comic/BaseComicCardSkeleton";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, useEffect } from "react";
import { Search as SearchIcon, ChevronLeft, ChevronRight, SearchX } from "lucide-react";
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
  head: ({ match }) => {
    const search = match.search as Search | undefined;
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
        {
          name: "keywords",
          content:
            "cari komik, search komik, komik online, baca komik, manga, manhwa, manhua",
        },
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
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [inputQuery, setInputQuery] = useState(q);
  const fetchSearch = useServerFn(searchComicServer);

  useEffect(() => {
    setInputQuery(q);
    setPage(1);
  }, [q]);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["search", q, page],
    queryFn: async () => {
      if (!q.trim())
        return { data: [], meta: { page: 1, total_page: 1, total_data: 0, total_record: 0 } };
      const res = await fetchSearch({
        data: { q: q.trim(), page, pageSize: PAGE_SIZE },
      });
      return res.data;
    },
    enabled: !!q.trim(),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });

  const comics = data?.data ?? [];
  const totalPage = data?.meta?.total_page ?? 1;
  const totalData = data?.meta?.total_record ?? data?.meta?.total_data ?? comics.length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputQuery.trim();
    if (!trimmed) return;
    navigate({ to: "/search", search: { q: trimmed } });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SearchResultsPage",
          name: `Pencarian: ${q}`,
          url: `${SITE_URL}/search?q=${encodeURIComponent(q)}`,
        }}
      />

      {/* Masthead & Inline Search Bar */}
      <header className="flex flex-col justify-between gap-6 border-b border-[#27272e] pb-6 lg:flex-row lg:items-end">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#f4f1ea]">
            {q ? (
              <>
                Hasil Pencarian: <span className="text-[#f43f5e]">"{q}"</span>
              </>
            ) : (
              "Cari Komik"
            )}
          </h1>
          <p className="mt-1.5 font-mono text-xs uppercase text-[#c8c2b6] tabular-nums">
            {q
              ? `DITEMUKAN ${totalData} JUDUL KOMIK TERKAIT`
              : "KETIK JUDUL KOMIK YANG INGIN KAMU BACA"}
          </p>
        </div>

        <form
          onSubmit={handleSearchSubmit}
          className="flex w-full max-w-md border border-[#27272e] bg-[#141418]"
        >
          <div className="relative flex-1">
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#c8c2b6]" />
            <input
              type="search"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ketik judul Manga, Manhwa, Manhua..."
              aria-label="Cari judul komik"
              className="min-h-11 w-full bg-transparent pl-10 pr-3 font-mono text-xs text-[#f4f1ea] placeholder-[#c8c2b6]/60 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="min-h-11 bg-[#be123c] px-5 font-mono text-xs font-bold uppercase tracking-wider text-[#f4f1ea] transition-colors hover:bg-[#9f1239]"
          >
            Cari
          </button>
        </form>
      </header>

      {/* Content */}
      {isLoading ? (
        <GridSkeleton />
      ) : comics.length === 0 ? (
        <NotFound query={q} />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {comics.map((comic) => (
            <BaseComicCard key={comic.manga_id} comic={comic} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {comics.length > 0 && (
        <div className="flex items-center justify-between border border-[#27272e] bg-[#0c0c10] p-3">
          <button
            type="button"
            disabled={page <= 1 || isFetching}
            onClick={() => {
              setPage((p) => p - 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex min-h-11 items-center gap-2 border border-[#27272e] bg-[#141418] px-4 py-2 font-mono text-xs font-bold uppercase text-[#f4f1ea] transition-colors hover:border-[#f4f1ea] disabled:opacity-40 disabled:pointer-events-none"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Sebelumnya</span>
          </button>

          <span className="font-mono text-xs font-bold uppercase text-[#c8c2b6] tabular-nums">
            HALAMAN {page} DARI {totalPage}
          </span>

          <button
            type="button"
            disabled={page >= totalPage || isFetching}
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
      )}
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {Array.from({ length: PAGE_SIZE }).map((_, i) => (
        <BaseComicCardSkeleton key={i} />
      ))}
    </div>
  );
}

function NotFound({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center border border-[#27272e] bg-[#0c0c10] py-20 px-6 text-center">
      <SearchX className="mb-3 h-12 w-12 text-[#c8c2b6]" />
      <h2 className="font-display text-2xl font-black uppercase tracking-tight text-[#f4f1ea]">
        {query ? `Tidak Ada Hasil untuk "${query}"` : "Mulai Pencarian Katalog"}
      </h2>
      <p className="mt-1.5 max-w-md text-sm text-[#c8c2b6]">
        {query
          ? "Coba gunakan kata kunci judul lain atau periksa kembali ejaan pencarian Anda."
          : "Ketik judul komik pada kolom pencarian di atas untuk menampilkan hasil."}
      </p>
    </div>
  );
}
