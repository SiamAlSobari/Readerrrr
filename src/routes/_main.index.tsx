/*
 * DIRECTION CONTRACT (seed key: f902f592)
 * THESIS: KOMIK READER stages live Manga, Manhwa, and Manhua as physical 3D Tankobon volumes in a darkroom press studio, refusing generic SaaS feature grids, pill badges, and fabricated stats.
 * OWN-WORLD: Obsidian darkroom ground (#09090b), warm newsprint paper (#f4f1ea), muted stone (#c8c2b6), graphite panel borders (#27272e), and single Hanko vermilion accent (#e11d48); Big Shoulders Display mastheads, Barlow prose, and Chivo Mono tabular indices.
 * STORY: Visitors inspect live trending 3D comic volumes, verify real chapter releases and ratings, and jump directly into reading or series archives.
 * FIRST VIEWPORT: Asymmetric 12-column stage: 7-column interactive Three.js WebGL 3D Tankobon rack with spine/page-edge geometry on left, 5-column live Volume Dossier with direct Read Chapter CTA on right, anchored by a spine index bar.
 * FORM: 3D Interactive Tankobon Press Stage (candidate 3, seed key f902f592, raised by signals-instruments-darkroom-safelight-bay and ikeda-datamatics).
 * FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
 *
 * WRITTEN REASONS FOR VISUAL DECISIONS (antislop R-31 & Group 2 Purpose-Gate):
 * - Color (#09090b ground, #f4f1ea newsprint text, #e11d48 single vermilion accent): Mirrors darkroom safelight inspection and Japanese Hanko publisher seals while preserving >11:1 WCAG AA contrast.
 * - Typography (Big Shoulders Display, Barlow, Chivo Mono): Condensed display mirrors physical Tankobon spine lettering; Barlow keeps Indonesian synopses legible; Chivo Mono aligns tabular chapter/rating numerals.
 * - Layout (Asymmetric 7/5 3D Stage + Serialization Dispatch Table + 5/7 Format Spread + Genre Ledger): Each section is shaped by its specific data structure (ENERGY 3 / RHYTHM 3 / MOTION 3).
 * - Icons (Minimal functional directional/search glyphs only): Paired with explicit text labels to indicate reading, searching, or switching formats.
 */

import React, { Suspense, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { queryOptions, useQuery } from "@tanstack/react-query";
import {
  getComicRecomendation,
  getComicUpdate,
  getPopularComic,
} from "@/api/servers/shinigami.server";
import { JsonLd } from "@/common/components/JsonLd";
import type { PopularComic } from "@/common/interface";

const MangaStage3D = React.lazy(
  () => import("@/features/landing/MangaStage3D")
);

const SITE_URL = "https://komik-reader.my.id";

const queryPopularLanding = queryOptions({
  queryKey: ["landing-popular"],
  queryFn: () => getPopularComic({ data: { page: 1, pageSize: 8 } }),
});

const queryUpdateLanding = queryOptions({
  queryKey: ["landing-update"],
  queryFn: () =>
    getComicUpdate({ data: { type: "mirror", page: 1, pageSize: 8 } }),
});

const queryRecommendLanding = (format: string) =>
  queryOptions({
    queryKey: ["landing-recommend", format],
    queryFn: () => getComicRecomendation({ data: { format } }),
  });

export const Route = createFileRoute("/_main/")({
  component: LandingPage,
  loader: async ({ context }) => {
    await Promise.allSettled([
      context.queryClient.ensureQueryData(queryPopularLanding),
      context.queryClient.ensureQueryData(queryUpdateLanding),
      context.queryClient.ensureQueryData(queryRecommendLanding("manhwa")),
    ]);
  },
  head: ({ match }) => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "description",
        content:
          "Baca koleksi Manga Jepang, Manhwa Korea, dan Manhua Tiongkok berbahasa Indonesia di KOMIK READER. Gratis dan update setiap hari.",
      },
      {
        name: "keywords",
        content:
          "KOMIK, baca KOMIK, KOMIK online, KOMIK terbaru, KOMIK populer, KOMIK READER, manga, manhwa, manhua",
      },
      { name: "author", content: "KOMIK READER" },
      {
        property: "og:title",
        content:
          "KOMIK READER : Baca Manga, Manhwa & Manhua Bahasa Indonesia",
      },
      {
        property: "og:description",
        content:
          "Baca chapter terbaru dan koleksi populer Manga, Manhwa, serta Manhua Bahasa Indonesia secara gratis.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}${match.pathname}` },
      { property: "og:image", content: "/komik_reader.png" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content:
          "KOMIK READER : Baca Manga, Manhwa & Manhua Bahasa Indonesia",
      },
      {
        name: "twitter:description",
        content:
          "Baca chapter terbaru dan koleksi populer Manga, Manhwa, serta Manhua Bahasa Indonesia secara gratis.",
      },
      { name: "twitter:image", content: "/komik_reader.png" },
    ],
    title:
      "KOMIK READER : Baca Manga, Manhwa & Manhua Bahasa Indonesia",
  }),
});

const ORIGIN_META: Record<
  string,
  { code: string; name: string; tradition: string }
> = {
  KR: {
    code: "KR",
    name: "Manhwa",
    tradition: "Format Webtoon & Cetak Korea Selatan",
  },
  JP: {
    code: "JP",
    name: "Manga",
    tradition: "Tradisi Tankōbon & Majalah Jepang",
  },
  CN: {
    code: "CN",
    name: "Manhua",
    tradition: "Serialisasi Komik Digital Tiongkok",
  },
};

const FORMAT_TABS = [
  {
    key: "manhwa",
    code: "KR",
    label: "Manhwa Korea",
    desc: "Komik berwarna vertikal & aksi fantasi modern dari studio Korea.",
  },
  {
    key: "manga",
    code: "JP",
    label: "Manga Jepang",
    desc: "Edisi Tankōbon klasik maupun serialisasi mingguan Jepang.",
  },
  {
    key: "manhua",
    code: "CN",
    label: "Manhua Tiongkok",
    desc: "Kisah kultivasi, dunia bela diri (Murim/Wuxia), dan fantasi oriental.",
  },
] as const;

const GENRE_LEDGER = [
  {
    slug: "action",
    name: "Action",
    code: "KL-01",
    scope: "Pertarungan taktis, kekuatan supranatural, dan konflik berintensitas tinggi.",
  },
  {
    slug: "fantasy",
    name: "Fantasy",
    code: "KL-02",
    scope: "Sistem dungeon, reinkarnasi dunia lain, sihir kuno, dan mitologi baru.",
  },
  {
    slug: "romance",
    name: "Romance",
    code: "KL-03",
    scope: "Dinamika hubungan personal, drama kerajaan, dan kisah keseharian.",
  },
  {
    slug: "mystery",
    name: "Mystery",
    code: "KL-04",
    scope: "Investigasi kriminal, teka-teki psikologis, dan konspirasi tersembunyi.",
  },
  {
    slug: "drama",
    name: "Drama",
    code: "KL-05",
    scope: "Konflik karakter mendalam, ambisi sosial, dan perjalanan emosional.",
  },
  {
    slug: "comedy",
    name: "Comedy",
    code: "KL-06",
    scope: "Parodi segar, humor situasi absurd, dan petualangan ringan.",
  },
  {
    slug: "slice of life",
    name: "Slice of Life",
    code: "KL-07",
    scope: "Potret kehidupan sehari-hari yang hangat, profesi unik, dan hobi.",
  },
  {
    slug: "horror",
    name: "Horror",
    code: "KL-08",
    scope: "Teror urban, makhluk dimensi lain, dan ketegangan bertahan hidup.",
  },
] as const;

function formatIndoDate(dateStr?: string): string {
  if (!dateStr) return "Baru rilis";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "Baru rilis";
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function LandingPage() {
  const navigate = useNavigate();
  const [selectedVolIndex, setSelectedVolIndex] = useState(0);
  const [activeFormat, setActiveFormat] = useState<"manhwa" | "manga" | "manhua">("manhwa");
  const [searchInput, setSearchInput] = useState("");
  const [searchError, setSearchError] = useState("");

  const {
    data: popularRes,
    isLoading: popularLoading,
    isError: popularError,
    refetch: refetchPopular,
  } = useQuery(queryPopularLanding);

  const {
    data: updateRes,
    isLoading: updateLoading,
    isError: updateError,
    refetch: refetchUpdate,
  } = useQuery(queryUpdateLanding);

  const {
    data: recommendRes,
    isLoading: recommendLoading,
    isError: recommendError,
    refetch: refetchRecommend,
  } = useQuery(queryRecommendLanding(activeFormat));

  const popularComics = popularRes?.data?.data ?? [];
  const updateComics = updateRes?.data?.data ?? [];
  const recommendComics = recommendRes?.data?.data ?? [];

  const stageComics = popularComics.slice(0, 7);
  const activeComic: PopularComic | undefined =
    stageComics[selectedVolIndex] ?? stageComics[0];

  const activeOrigin = activeComic
    ? ORIGIN_META[activeComic.country_id] ?? {
        code: activeComic.country_id || "ID",
        name: "Komik",
        tradition: "Edisi Terjemahan Bahasa Indonesia",
      }
    : null;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchInput.trim();
    if (!trimmed) {
      setSearchError("Masukkan judul komik atau kata kunci terlebih dahulu.");
      return;
    }
    setSearchError("");
    navigate({ to: "/search", search: { q: trimmed } });
  };

  const handleReadComic = (comic: PopularComic) => {
    navigate({
      to: "/read/$comicId/$chapterId",
      params: {
        comicId: comic.manga_id,
        chapterId: comic.latest_chapter_id,
      },
    });
  };

  const handleOpenSeries = (comic: PopularComic) => {
    navigate({
      to: "/series/$comicId",
      params: { comicId: comic.manga_id },
      search: { page: 1 },
    });
  };

  const featuredRecommendation = recommendComics[0];
  const secondaryRecommendations = recommendComics.slice(1, 6);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f1ea] selection:bg-[#e11d48] selection:text-[#f4f1ea]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "KOMIK READER",
          url: SITE_URL,
          description:
            "Baca koleksi Manga, Manhwa, dan Manhua terbaru serta populer dalam Bahasa Indonesia.",
        }}
      />

      {/* TOP EDITORIAL PRESS BAR & DIRECT SEARCH */}
      <div className="border-b border-[#27272e] bg-[#0c0c10]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono-tabular text-[#c8c2b6]">
            <span className="px-2 py-0.5 bg-[#be123c] text-[#f4f1ea] font-bold">
              BAHASA INDONESIA
            </span>
            <span>UPDATE SETIAP HARI</span>
            <span className="hidden sm:inline text-[#27272e]">/</span>
            <span className="hidden sm:inline">
              {popularComics.length > 0
                ? `${popularComics.length} JUDUL POPULER MINGGU INI`
                : "MEMUAT DAFTAR POPULER"}
            </span>
          </div>

          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto"
            noValidate
          >
            <div className="relative flex-1 sm:w-72">
              <label htmlFor="landing-quick-search" className="sr-only">
                Cari judul komik
              </label>
              <input
                id="landing-quick-search"
                type="search"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  if (searchError) setSearchError("");
                }}
                placeholder="Cari judul komik (cth: Solo Leveling)..."
                className="w-full min-h-11 px-3.5 py-2 text-sm bg-[#141418] text-[#f4f1ea] placeholder:text-[#c8c2b6]/70 border border-[#27272e] focus:border-[#e11d48] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="min-h-11 px-4 py-2 bg-[#181820] hover:bg-[#be123c] text-[#f4f1ea] font-mono-tabular text-xs font-bold uppercase tracking-wider border border-[#27272e] hover:border-[#be123c] transition-colors"
            >
              Cari Komik
            </button>
          </form>
        </div>
        {searchError && (
          <div
            role="alert"
            className="mx-auto max-w-7xl px-4 sm:px-6 pb-2.5 text-xs font-mono-tabular text-[#f43f5e]"
          >
            {searchError}
          </div>
        )}
      </div>

      {/* SECTION 1: FIRST VIEWPORT */}
      <section
        aria-labelledby="hero-stage-heading"
        className="relative border-b border-[#27272e]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 lg:py-12">
          {/* Masthead Header */}
          <div className="mb-8 pb-6 border-b border-[#27272e] flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1
                id="hero-stage-heading"
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#f4f1ea] leading-[0.96] text-balance"
              >
                Baca Manga, Manhwa &amp; Manhua Bahasa Indonesia
              </h1>
              <p className="mt-3 text-base sm:text-lg text-[#c8c2b6] max-w-[68ch] leading-relaxed">
                Pilih komik populer di rak bawah untuk melihat sinopsis dan
                chapter terbarunya, atau langsung mulai baca gratis tanpa iklan
                pop-up.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/home"
                className="min-h-11 inline-flex items-center justify-center px-5 py-2.5 bg-[#141418] hover:bg-[#1e1e26] text-[#f4f1ea] border border-[#27272e] font-mono-tabular text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Jelajahi Katalog
              </Link>
              <Link
                to="/update"
                className="min-h-11 inline-flex items-center justify-center px-5 py-2.5 bg-[#141418] hover:bg-[#1e1e26] text-[#c8c2b6] hover:text-[#f4f1ea] border border-[#27272e] font-mono-tabular text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Update Hari Ini
              </Link>
            </div>
          </div>

          {popularLoading ? (
            <div
              role="status"
              aria-live="polite"
              className="grid grid-cols-1 lg:grid-cols-12 border border-[#27272e] bg-[#0c0c10]"
            >
              <div className="lg:col-span-7 min-h-[460px] flex flex-col items-center justify-center p-8 border-b lg:border-b-0 lg:border-r border-[#27272e]">
                <div className="w-44 h-64 bg-[#181820] border border-[#27272e] animate-pulse" />
                <p className="mt-4 font-mono-tabular text-xs text-[#c8c2b6]">
                  Memuat daftar komik populer...
                </p>
              </div>
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="h-6 w-32 bg-[#181820] animate-pulse" />
                  <div className="h-10 w-3/4 bg-[#181820] animate-pulse" />
                  <div className="h-24 w-full bg-[#181820] animate-pulse" />
                </div>
                <div className="h-12 w-full bg-[#181820] animate-pulse" />
              </div>
            </div>
          ) : popularError ? (
            <div
              role="alert"
              className="p-8 border border-[#27272e] bg-[#101014] text-left space-y-4"
            >
              <h2 className="font-display text-2xl font-bold uppercase text-[#f4f1ea]">
                Gagal Memuat Daftar Komik Populer
              </h2>
              <p className="text-sm text-[#c8c2b6] max-w-[65ch]">
                Koneksi ke server sedang bermasalah saat mengambil daftar
                komik populer. Silakan coba muat ulang atau langsung buka
                halaman katalog.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => refetchPopular()}
                  className="min-h-11 px-5 py-2.5 bg-[#be123c] text-[#f4f1ea] font-mono-tabular text-xs font-bold uppercase"
                >
                  Muat Ulang
                </button>
                <Link
                  to="/home"
                  className="min-h-11 inline-flex items-center px-5 py-2.5 bg-[#141418] text-[#f4f1ea] border border-[#27272e] font-mono-tabular text-xs font-semibold uppercase"
                >
                  Buka Katalog
                </Link>
              </div>
            </div>
          ) : stageComics.length === 0 ? (
            <div className="p-8 border border-[#27272e] bg-[#101014] space-y-3">
              <h2 className="font-display text-2xl font-bold uppercase text-[#f4f1ea]">
                Belum Ada Komik Populer
              </h2>
              <p className="text-sm text-[#c8c2b6]">
                Saat ini daftar komik populer belum tersedia. Gunakan kolom
                pencarian di atas untuk mencari judul komik secara langsung.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#27272e] bg-[#0c0c10] shadow-[0_24px_60px_rgba(0,0,0,0.75)]">
              {/* LEFT 7 COLUMNS: INTERACTIVE BOOK RACK */}
              <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-[#27272e] flex flex-col">
                <Suspense
                  fallback={
                    <div className="min-h-[520px] flex flex-col items-center justify-center p-8 bg-[#09090b]">
                      <div className="w-40 h-60 border border-[#e11d48] bg-[#141418] flex items-center justify-center font-mono-tabular text-xs text-[#c8c2b6]">
                        MEMUAT RAK KOMIK...
                      </div>
                      <p className="mt-3 font-mono-tabular text-xs text-[#c8c2b6]">
                        Menyiapkan sampul komik populer...
                      </p>
                    </div>
                  }
                >
                  <MangaStage3D
                    comics={stageComics}
                    selectedIndex={selectedVolIndex}
                    onSelectIndex={setSelectedVolIndex}
                    onReadComic={handleReadComic}
                    onOpenSeries={handleOpenSeries}
                  />
                </Suspense>
              </div>

              {/* RIGHT 5 COLUMNS: SELECTED COMIC INFO */}
              {activeComic && (
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#101014]">
                  <div className="space-y-6">
                    {/* Index & Stepper Controls */}
                    <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#27272e]">
                      <div className="font-mono-tabular text-xs text-[#c8c2b6]">
                        <span className="text-[#f43f5e] font-bold">
                          PILIHAN #{String(selectedVolIndex + 1).padStart(2, "0")}
                        </span>{" "}
                        DARI {String(stageComics.length).padStart(2, "0")}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedVolIndex((prev) =>
                              prev === 0 ? stageComics.length - 1 : prev - 1
                            )
                          }
                          aria-label="Pilih komik sebelumnya"
                          className="min-h-11 px-3 py-1.5 bg-[#141418] hover:bg-[#1f1f27] text-[#f4f1ea] border border-[#27272e] font-mono-tabular text-xs font-semibold transition-colors"
                        >
                          Sebelumnya
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedVolIndex(
                              (prev) => (prev + 1) % stageComics.length
                            )
                          }
                          aria-label="Pilih komik berikutnya"
                          className="min-h-11 px-3 py-1.5 bg-[#141418] hover:bg-[#1f1f27] text-[#f4f1ea] border border-[#27272e] font-mono-tabular text-xs font-semibold transition-colors"
                        >
                          Berikutnya
                        </button>
                      </div>
                    </div>

                    {/* Selected Title & Alternative Title */}
                    <div>
                      <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#f4f1ea] leading-[1.02]">
                        {activeComic.title}
                      </h2>
                      {activeComic.alternative_title && (
                        <p className="mt-1.5 font-mono-tabular text-xs text-[#c8c2b6] line-clamp-1">
                          Judul Lain: {activeComic.alternative_title}
                        </p>
                      )}
                    </div>

                    {/* Tabular Info Grid */}
                    <dl className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-px bg-[#27272e] border border-[#27272e] font-mono-tabular">
                      <div className="bg-[#0c0c10] p-3">
                        <dt className="text-xs text-[#c8c2b6] uppercase">
                          Jenis Komik
                        </dt>
                        <dd className="mt-1 text-sm font-bold text-[#f4f1ea]">
                          {activeOrigin?.code} · {activeOrigin?.name}
                        </dd>
                      </div>
                      <div className="bg-[#0c0c10] p-3">
                        <dt className="text-xs text-[#c8c2b6] uppercase">
                          Chapter Terbaru
                        </dt>
                        <dd className="mt-1 text-sm font-bold text-[#f43f5e]">
                          Ch. {activeComic.latest_chapter_number}
                        </dd>
                      </div>
                      <div className="bg-[#0c0c10] p-3">
                        <dt className="text-xs text-[#c8c2b6] uppercase">
                          Rating Pembaca
                        </dt>
                        <dd className="mt-1 text-sm font-bold text-[#f4f1ea]">
                          {activeComic.user_rate
                            ? `${activeComic.user_rate.toFixed(1)} / 5.0`
                            : "Belum dinilai"}
                        </dd>
                      </div>
                      <div className="bg-[#0c0c10] p-3">
                        <dt className="text-xs text-[#c8c2b6] uppercase">
                          Update Terakhir
                        </dt>
                        <dd className="mt-1 text-sm font-bold text-[#f4f1ea]">
                          {formatIndoDate(activeComic.latest_chapter_time)}
                        </dd>
                      </div>
                    </dl>

                    {/* Synopsis Excerpt */}
                    <div className="space-y-2">
                      <h3 className="font-mono-tabular text-xs font-bold uppercase tracking-wider text-[#c8c2b6]">
                        Sinopsis
                      </h3>
                      <p className="text-sm sm:text-base text-[#f4f1ea]/90 leading-relaxed line-clamp-4 max-w-[65ch]">
                        {activeComic.description?.trim() ||
                          `${activeOrigin?.name ?? "Komik"} populer rilisan ${
                            activeComic.release_year || "terbaru"
                          }. Ikuti kisahnya hingga Chapter ${
                            activeComic.latest_chapter_number
                          } dalam Bahasa Indonesia.`}
                      </p>
                    </div>
                  </div>

                  {/* Primary & Secondary Action Controls */}
                  <div className="mt-8 pt-6 border-t border-[#27272e] space-y-3">
                    <button
                      type="button"
                      onClick={() => handleReadComic(activeComic)}
                      className="w-full min-h-12 px-6 py-3.5 bg-[#be123c] hover:bg-[#9f1239] text-[#f4f1ea] font-display text-xl font-black uppercase tracking-wide transition-colors flex items-center justify-between"
                    >
                      <span>
                        Baca Chapter {activeComic.latest_chapter_number} Sekarang
                      </span>
                      <span className="font-mono-tabular text-xs font-bold bg-[#09090b]/60 px-2.5 py-1">
                        MULAI BACA
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenSeries(activeComic)}
                      className="w-full min-h-11 px-5 py-2.5 bg-[#141418] hover:bg-[#1e1e26] text-[#f4f1ea] border border-[#27272e] hover:border-[#f4f1ea] font-mono-tabular text-xs font-bold uppercase tracking-wider transition-colors text-center"
                    >
                      Lihat Daftar Chapter &amp; Detail Komik
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 2: UPDATE CHAPTER TERBARU */}
      <section
        aria-labelledby="daily-dispatch-heading"
        className="border-b border-[#27272e] bg-[#0c0c10]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 lg:py-16">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-[#27272e]">
            <div>
              <h2
                id="daily-dispatch-heading"
                className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#f4f1ea]"
              >
                Update Chapter Terbaru
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#c8c2b6] max-w-[65ch]">
                Daftar komik yang baru rilis chapter hari ini. Klik nomor
                chapter untuk langsung mulai membaca.
              </p>
            </div>
            <Link
              to="/update"
              className="min-h-11 self-start sm:self-auto inline-flex items-center px-4 py-2 bg-[#141418] hover:bg-[#be123c] text-[#f4f1ea] border border-[#27272e] font-mono-tabular text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Lihat Semua Update
            </Link>
          </div>

          {updateLoading ? (
            <div
              role="status"
              aria-live="polite"
              className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#27272e] border border-[#27272e]"
            >
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-[#09090b] p-4 flex items-center justify-between gap-4"
                >
                  <div className="w-14 h-20 bg-[#181820] animate-pulse shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-2/3 bg-[#181820] animate-pulse" />
                    <div className="h-4 w-1/3 bg-[#181820] animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : updateError ? (
            <div
              role="alert"
              className="p-6 border border-[#27272e] bg-[#101014] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div>
                <h3 className="font-display text-xl font-bold uppercase text-[#f4f1ea]">
                  Gagal Mengambil Sirkulasi Chapter Terbaru
                </h3>
                <p className="mt-1 text-sm text-[#c8c2b6]">
                  Daftar rilisan terbaru belum dapat dimuat dari server.
                </p>
              </div>
              <button
                type="button"
                onClick={() => refetchUpdate()}
                className="min-h-11 px-4 py-2 bg-[#be123c] text-[#f4f1ea] font-mono-tabular text-xs font-bold uppercase"
              >
                Muat Ulang Sirkulasi
              </button>
            </div>
          ) : updateComics.length === 0 ? (
            <div className="p-6 border border-[#27272e] bg-[#101014] text-sm text-[#c8c2b6]">
              Belum ada catatan pembaruan chapter pada jam ini. Silakan periksa
              kembali beberapa saat lagi.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#27272e] border border-[#27272e]">
              {updateComics.slice(0, 8).map((comic, idx) => {
                const origin = ORIGIN_META[comic.country_id] ?? {
                  code: comic.country_id || "ID",
                  name: "Komik",
                  tradition: "",
                };
                const recentChapters = comic.chapters?.slice(0, 2) ?? [];

                return (
                  <article
                    key={comic.manga_id}
                    className="bg-[#09090b] hover:bg-[#121217] p-4 sm:p-5 transition-colors flex items-start justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      <span className="font-mono-tabular text-xs font-bold text-[#c8c2b6] pt-1 w-6 shrink-0">
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      <Link
                        to="/series/$comicId"
                        params={{ comicId: comic.manga_id }}
                        search={{ page: 1 }}
                        className="shrink-0 block border border-[#27272e] hover:border-[#e11d48] transition-colors bg-[#141418]"
                      >
                        <img
                          src={comic.cover_image_url}
                          alt={comic.title}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="w-14 h-20 object-cover block"
                        />
                      </Link>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 font-mono-tabular text-xs text-[#c8c2b6]">
                          <span className="px-1.5 py-0.5 bg-[#181820] text-[#f4f1ea] border border-[#27272e] font-bold">
                            {origin.code}
                          </span>
                          <span>{formatIndoDate(comic.latest_chapter_time)}</span>
                          {comic.user_rate > 0 && (
                            <span className="text-[#f4f1ea]">
                              ★ {comic.user_rate.toFixed(1)}
                            </span>
                          )}
                        </div>

                        <h3 className="mt-1.5 text-base font-bold text-[#f4f1ea] line-clamp-1">
                          <Link
                            to="/series/$comicId"
                            params={{ comicId: comic.manga_id }}
                            search={{ page: 1 }}
                            className="hover:text-[#e11d48] transition-colors"
                          >
                            {comic.title}
                          </Link>
                        </h3>

                        <p className="mt-1 font-mono-tabular text-xs text-[#c8c2b6]">
                          Total hingga Ch. {comic.latest_chapter_number}
                        </p>
                      </div>
                    </div>

                    {/* Direct Chapter Trigger Buttons */}
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      {recentChapters.length > 0 ? (
                        recentChapters.map((ch, cIdx) => (
                          <Link
                            key={ch.chapter_id}
                            to="/read/$comicId/$chapterId"
                            params={{
                              comicId: comic.manga_id,
                              chapterId: ch.chapter_id,
                            }}
                            className={`min-h-11 px-3 py-2 font-mono-tabular text-xs font-bold border transition-colors inline-flex items-center justify-center ${
                              cIdx === 0
                                ? "bg-[#181820] hover:bg-[#be123c] text-[#f4f1ea] border-[#27272e] hover:border-[#be123c]"
                                : "bg-[#0c0c10] hover:bg-[#181820] text-[#c8c2b6] hover:text-[#f4f1ea] border-[#27272e]"
                            }`}
                          >
                            Ch. {ch.chapter_number}
                          </Link>
                        ))
                      ) : (
                        <Link
                          to="/read/$comicId/$chapterId"
                          params={{
                            comicId: comic.manga_id,
                            chapterId: comic.latest_chapter_id,
                          }}
                          className="min-h-11 px-3 py-2 bg-[#181820] hover:bg-[#be123c] text-[#f4f1ea] border border-[#27272e] hover:border-[#be123c] font-mono-tabular text-xs font-bold transition-colors inline-flex items-center justify-center"
                        >
                          Ch. {comic.latest_chapter_number}
                        </Link>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3: KURASI TIGA TRADISI CETAK (ASYMMETRIC 5/7 EDITORIAL SPREAD) */}
      <section
        aria-labelledby="format-curation-heading"
        className="border-b border-[#27272e] bg-[#09090b]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 lg:py-16">
          <div className="mb-8 pb-6 border-b border-[#27272e] flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2
                id="format-curation-heading"
                className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#f4f1ea]"
              >
                Rekomendasi Manhwa, Manga &amp; Manhua
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#c8c2b6] max-w-[65ch]">
                Pilihan komik terbaik dari Korea, Jepang, dan Tiongkok yang
                paling banyak diikuti pembaca.
              </p>
            </div>

            {/* Interactive Tradition Switcher */}
            <div
              role="tablist"
              aria-label="Pilih tradisi format komik"
              className="grid grid-cols-3 border border-[#27272e] bg-[#0c0c10] shrink-0"
            >
              {FORMAT_TABS.map((tab) => {
                const active = activeFormat === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveFormat(tab.key)}
                    className={`min-h-11 px-4 sm:px-5 py-2.5 font-mono-tabular text-xs font-bold uppercase tracking-wider border-r last:border-r-0 border-[#27272e] transition-colors ${
                      active
                        ? "bg-[#be123c] text-[#f4f1ea]"
                        : "bg-[#0c0c10] text-[#c8c2b6] hover:bg-[#141418] hover:text-[#f4f1ea]"
                    }`}
                  >
                    [{tab.code}] {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {recommendLoading ? (
            <div
              role="status"
              aria-live="polite"
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              <div className="lg:col-span-5 h-96 bg-[#141418] border border-[#27272e] animate-pulse" />
              <div className="lg:col-span-7 space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-20 bg-[#141418] border border-[#27272e] animate-pulse"
                  />
                ))}
              </div>
            </div>
          ) : recommendError ? (
            <div
              role="alert"
              className="p-6 border border-[#27272e] bg-[#101014] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <p className="text-sm text-[#c8c2b6]">
                Gagal memuat kurasi format {activeFormat.toUpperCase()}.
              </p>
              <button
                type="button"
                onClick={() => refetchRecommend()}
                className="min-h-11 px-4 py-2 bg-[#be123c] text-[#f4f1ea] font-mono-tabular text-xs font-bold uppercase"
              >
                Coba Lagi
              </button>
            </div>
          ) : !featuredRecommendation ? (
            <div className="p-6 border border-[#27272e] bg-[#101014] text-sm text-[#c8c2b6]">
              Belum ada kurasi untuk format ini.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* LEFT 5 COLUMNS: LEAD FEATURED WORK SPREAD */}
              <article className="lg:col-span-5 border border-[#27272e] bg-[#101014] p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 pb-4 mb-5 border-b border-[#27272e] font-mono-tabular text-xs">
                    <span className="text-[#f43f5e] font-bold uppercase">
                      SOROTAN UTAMA // {activeFormat.toUpperCase()} #01
                    </span>
                    <span className="text-[#c8c2b6]">
                      TAHUN {featuredRecommendation.release_year || "TERBARU"}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-5">
                    <Link
                      to="/series/$comicId"
                      params={{ comicId: featuredRecommendation.manga_id }}
                      search={{ page: 1 }}
                      className="shrink-0 self-start border border-[#27272e] hover:border-[#e11d48] transition-colors bg-[#141418]"
                    >
                      <img
                        src={featuredRecommendation.cover_image_url}
                        alt={featuredRecommendation.title}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="w-36 h-52 object-cover block"
                      />
                    </Link>

                    <div className="space-y-3 min-w-0">
                      <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-[#f4f1ea] leading-tight">
                        <Link
                          to="/series/$comicId"
                          params={{ comicId: featuredRecommendation.manga_id }}
                          search={{ page: 1 }}
                          className="hover:text-[#e11d48] transition-colors"
                        >
                          {featuredRecommendation.title}
                        </Link>
                      </h3>

                      <div className="flex flex-wrap gap-1.5">
                        {featuredRecommendation.taxonomy?.Genre?.slice(0, 4).map(
                          (g) => (
                            <span
                              key={g.slug}
                              className="px-2 py-0.5 bg-[#181820] border border-[#27272e] font-mono-tabular text-xs text-[#c8c2b6]"
                            >
                              {g.name}
                            </span>
                          )
                        )}
                      </div>

                      <p className="text-sm text-[#c8c2b6] line-clamp-4 leading-relaxed">
                        {featuredRecommendation.description?.trim() ||
                          `Karya pilihan utama untuk kategori ${activeFormat.toUpperCase()} dengan pembaruan mencapai Chapter ${
                            featuredRecommendation.latest_chapter_number
                          }.`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-[#27272e] flex flex-wrap items-center justify-between gap-3">
                  <div className="font-mono-tabular text-xs text-[#c8c2b6]">
                    Rating{" "}
                    <strong className="text-[#f4f1ea]">
                      ★ {featuredRecommendation.user_rate || "4.8"}
                    </strong>{" "}
                    · Ch. {featuredRecommendation.latest_chapter_number}
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to="/read/$comicId/$chapterId"
                      params={{
                        comicId: featuredRecommendation.manga_id,
                        chapterId: featuredRecommendation.latest_chapter_id,
                      }}
                      className="min-h-11 inline-flex items-center px-4 py-2 bg-[#be123c] hover:bg-[#9f1239] text-[#f4f1ea] font-mono-tabular text-xs font-bold uppercase transition-colors"
                    >
                      Baca Ch. {featuredRecommendation.latest_chapter_number}
                    </Link>
                    <Link
                      to="/series/$comicId"
                      params={{ comicId: featuredRecommendation.manga_id }}
                      search={{ page: 1 }}
                      className="min-h-11 inline-flex items-center px-3.5 py-2 bg-[#141418] hover:bg-[#1e1e26] text-[#f4f1ea] border border-[#27272e] font-mono-tabular text-xs font-semibold uppercase transition-colors"
                    >
                      Detail Seri
                    </Link>
                  </div>
                </div>
              </article>

              {/* RIGHT 7 COLUMNS: RANKED EDITORIAL LIST (#02 - #06) */}
              <div className="lg:col-span-7 flex flex-col justify-between border border-[#27272e] bg-[#0c0c10] divide-y divide-[#27272e]">
                {secondaryRecommendations.map((comic, idx) => {
                  const genres =
                    comic.taxonomy?.Genre?.slice(0, 3)
                      .map((g) => g.name)
                      .join(" · ") || "Komik Pilihan";
                  return (
                    <article
                      key={comic.manga_id}
                      className="p-4 sm:px-5 flex items-center justify-between gap-4 hover:bg-[#14141a] transition-colors"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <span className="font-display text-2xl font-black text-[#c8c2b6] w-7 shrink-0">
                          0{idx + 2}
                        </span>

                        <Link
                          to="/series/$comicId"
                          params={{ comicId: comic.manga_id }}
                          search={{ page: 1 }}
                          className="shrink-0 border border-[#27272e] hover:border-[#e11d48] transition-colors bg-[#141418]"
                        >
                          <img
                            src={comic.cover_image_url}
                            alt={comic.title}
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            className="w-12 h-16 object-cover block"
                          />
                        </Link>

                        <div className="min-w-0">
                          <h3 className="text-base font-bold text-[#f4f1ea] truncate">
                            <Link
                              to="/series/$comicId"
                              params={{ comicId: comic.manga_id }}
                              search={{ page: 1 }}
                              className="hover:text-[#e11d48] transition-colors"
                            >
                              {comic.title}
                            </Link>
                          </h3>
                          <p className="mt-0.5 text-xs text-[#c8c2b6] truncate">
                            {genres}
                          </p>
                          <div className="mt-1 font-mono-tabular text-xs text-[#c8c2b6]">
                            ★ {comic.user_rate || "4.7"} · Rilis{" "}
                            {comic.release_year || "Terbaru"}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Link
                          to="/read/$comicId/$chapterId"
                          params={{
                            comicId: comic.manga_id,
                            chapterId: comic.latest_chapter_id,
                          }}
                          className="min-h-11 px-3.5 py-2 bg-[#181820] hover:bg-[#be123c] text-[#f4f1ea] border border-[#27272e] hover:border-[#be123c] font-mono-tabular text-xs font-bold transition-colors inline-flex items-center"
                        >
                          Ch. {comic.latest_chapter_number}
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 4: PILIHAN GENRE */}
      <section
        aria-labelledby="genre-ledger-heading"
        className="bg-[#0c0c10]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 lg:py-16">
          <div className="mb-8 pb-5 border-b border-[#27272e] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2
                id="genre-ledger-heading"
                className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#f4f1ea]"
              >
                Pilih Genre Favoritmu
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#c8c2b6] max-w-[65ch]">
                Cari komik sesuai tema cerita yang kamu suka atau lanjutkan
                bacaan terakhir dari riwayatmu.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                to="/genre"
                search={{ g: "action" }}
                className="min-h-11 inline-flex items-center px-4 py-2 bg-[#141418] hover:bg-[#1e1e26] text-[#f4f1ea] border border-[#27272e] font-mono-tabular text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Semua Genre
              </Link>
              <Link
                to="/history"
                className="min-h-11 inline-flex items-center px-4 py-2 bg-[#141418] hover:bg-[#1e1e26] text-[#c8c2b6] hover:text-[#f4f1ea] border border-[#27272e] font-mono-tabular text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Riwayat Baca
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#27272e] border border-[#27272e]">
            {GENRE_LEDGER.map((genre) => (
              <Link
                key={genre.slug}
                to="/genre"
                search={{ g: genre.slug }}
                className="group bg-[#09090b] hover:bg-[#14141a] p-5 flex flex-col justify-between transition-colors min-h-36"
              >
                <div className="flex items-center justify-between font-mono-tabular text-xs text-[#c8c2b6]">
                  <span>GENRE</span>
                  <span className="group-hover:text-[#e11d48] font-bold transition-colors">
                    LIHAT KOMIK
                  </span>
                </div>

                <div className="my-3">
                  <h3 className="font-display text-2xl font-black uppercase text-[#f4f1ea] group-hover:text-[#e11d48] transition-colors">
                    {genre.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-[#c8c2b6] leading-relaxed">
                    {genre.scope}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
