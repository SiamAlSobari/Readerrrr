import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Library,
  ScrollText,
} from "lucide-react";
import HeroSection from "@/common/components/HeroSection";
import {
  getComicRecomendation,
  getComicUpdate,
  getPopularComic,
} from "@/api/servers/shinigami.server";
import { queryOptions, useQuery } from "@tanstack/react-query";

import PopularComicCard from "@/features/comic/PopularComicCard";
import BaseComicCard from "@/features/comic/BaseComicCard";
import UpdateComicCard from "@/features/comic/UpdateComicCard";
import BaseComicCardSkeleton from "@/features/comic/BaseComicCardSkeleton";
import PopularComicCardSkeleton from "@/features/comic/PopularComicCardSkeleton";
import UpdateComicCardSkeleton from "@/features/comic/UpdateComicCardSkeleton";

const queryRecommendation = (activeTab: string) =>
  queryOptions({
    queryKey: ["recomendation", activeTab],
    queryFn: () => getComicRecomendation({ data: { format: activeTab } }),
  });
const queryPopularComic = queryOptions({
  queryKey: ["popular"],
  queryFn: () => getPopularComic({ data: { page: 1, pageSize: 10 } }),
});
const queryUpdateComic = queryOptions({
  queryKey: ["update"],
  queryFn: () => getComicUpdate({ data: { type: "mirror", page: 1, pageSize: 6 } }),
});

export const Route = createFileRoute("/_main/home")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "description",
        content:
          "Baca ribuan KOMIK online terbaru, populer, dan lengkap di KOMIK READER. Gratis dan mudah diakses.",
      },
      {
        name: "keywords",
        content:
          "KOMIK, baca KOMIK, KOMIK online, KOMIK terbaru, KOMIK populer, KOMIK READER, manga, manhwa, manhua",
      },
      { name: "author", content: "KOMIK READER" },

      { property: "og:title", content: "Katalog Komik & Rekomendasi Terpopuler – KOMIK READER" },
      {
        property: "og:description",
        content:
          "Baca ribuan KOMIK online terbaru dan populer di KOMIK READER. Gratis dan mudah diakses.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://komik-reader.my.id/home" },
      { property: "og:image", content: "/komik_reader.png" },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Katalog Komik & Rekomendasi Terpopuler – KOMIK READER" },
      {
        name: "twitter:description",
        content:
          "Baca ribuan KOMIK online terbaru dan populer di KOMIK READER. Gratis dan mudah diakses.",
      },
      { name: "twitter:image", content: "/komik_reader.png" },
    ],
    title: "Katalog Komik & Rekomendasi Terpopuler – KOMIK READER",
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(queryPopularComic),
      context.queryClient.ensureQueryData(queryUpdateComic),
      context.queryClient.ensureQueryData(queryRecommendation("manhwa")),
    ]);
  },
});

const TABS = [
  {
    key: "manhwa",
    label: "Manhwa",
    origin: "KR",
    icon: ScrollText,
  },
  {
    key: "manga",
    label: "Manga",
    origin: "JP",
    icon: BookOpen,
  },
  {
    key: "manhua",
    label: "Manhua",
    origin: "CN",
    icon: Library,
  },
] as const;

function RouteComponent() {
  const [activeTab, setActiveTab] = useState("manhwa");
  const { data: comicRecomendation, isLoading: comicRecomendationLoading } =
    useQuery(queryRecommendation(activeTab));
  const { data: popularComic, isLoading: popularComicLoading } =
    useQuery(queryPopularComic);
  const { data: updateComic, isLoading: updateCommicLoading } =
    useQuery(queryUpdateComic);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Page Masthead */}
      <header className="mb-8 flex flex-col justify-between gap-4 border-b border-[#27272e] pb-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#f4f1ea]">
            Katalog Komik Pilihan
          </h1>
          <p className="mt-1.5 max-w-[65ch] text-sm text-[#c8c2b6]">
            Temukan Manhwa Korea, Manga Jepang, dan Manhua Tiongkok pilihan serta update chapter terbaru setiap hari.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#c8c2b6] tabular-nums">
          <Link
            to="/genre"
            search={{ g: "action" }}
            className="inline-flex min-h-10 items-center border border-[#27272e] bg-[#141418] px-3.5 py-2 font-bold text-[#f4f1ea] transition-colors hover:border-[#f4f1ea]"
          >
            Pilih Genre
          </Link>
          <Link
            to="/popular"
            search={{ page: 1 }}
            className="inline-flex min-h-10 items-center border border-[#27272e] bg-[#141418] px-3.5 py-2 font-bold text-[#f4f1ea] transition-colors hover:border-[#f4f1ea]"
          >
            Komik Terpopuler
          </Link>
        </div>
      </header>

      {/* Featured Spotlight */}
      <HeroSection comics={popularComic?.data.data ?? []} />

      {/* Main 12-Column Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left 8 Columns: Curated Recommendations + All-Time Popular */}
        <div className="space-y-12 lg:col-span-8">
          {/* Section 1: Recommendations */}
          <section aria-labelledby="heading-kurasi">
            <div className="mb-5 flex flex-col justify-between gap-4 border-b border-[#27272e] pb-4 sm:flex-row sm:items-center">
              <div>
                <h2
                  id="heading-kurasi"
                  className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#f4f1ea]"
                >
                  Rekomendasi Pilihan
                </h2>
                <p className="mt-1 font-mono text-xs text-[#c8c2b6]">
                  Pilih jenis komik sesuai negara asalnya
                </p>
              </div>

              {/* Tradition Switcher */}
              <div
                role="tablist"
                aria-label="Filter tradisi komik"
                className="flex border border-[#27272e] bg-[#0c0c10]"
              >
                {TABS.map(({ key, label, origin, icon: Icon }) => {
                  const isActive = activeTab === key;
                  return (
                    <button
                      key={key}
                      role="tab"
                      type="button"
                      aria-selected={isActive}
                      onClick={() => setActiveTab(key)}
                      className={`flex min-h-11 items-center gap-2 border-r border-[#27272e] px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors last:border-r-0 ${
                        isActive
                          ? "bg-[#be123c] text-[#f4f1ea]"
                          : "bg-[#141418] text-[#c8c2b6] hover:bg-[#181820] hover:text-[#f4f1ea]"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{label}</span>
                      <span className="opacity-75">[{origin}]</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {comicRecomendationLoading
                ? Array.from({ length: 8 }).map((_, idx) => (
                    <BaseComicCardSkeleton key={idx} />
                  ))
                : comicRecomendation?.data.data.slice(0, 8).map((comic) => (
                    <BaseComicCard key={comic.manga_id} comic={comic} />
                  ))}
            </div>
          </section>

          {/* Section 2: Popular All Time */}
          <section aria-labelledby="heading-populer">
            <div className="mb-5 flex items-end justify-between border-b border-[#27272e] pb-4">
              <div>
                <h2
                  id="heading-populer"
                  className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#f4f1ea]"
                >
                  Komik Terpopuler Sepanjang Masa
                </h2>
                <p className="mt-1 font-mono text-xs text-[#c8c2b6]">
                  Judul dengan pembaca terbanyak dan rating tertinggi
                </p>
              </div>

              <Link
                to="/popular"
                search={{ page: 1 }}
                className="inline-flex min-h-10 items-center gap-1.5 border border-[#27272e] bg-[#141418] px-3.5 py-2 font-mono text-xs font-bold uppercase text-[#f4f1ea] transition-colors hover:border-[#f4f1ea]"
              >
                <span>Lihat Semua</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {popularComicLoading
                ? Array.from({ length: 6 }).map((_, idx) => (
                    <PopularComicCardSkeleton key={idx} />
                  ))
                : popularComic?.data.data.slice(0, 6).map((comic) => (
                    <PopularComicCard key={comic.manga_id} comic={comic} />
                  ))}
            </div>
          </section>
        </div>

        {/* Right 4 Columns: Latest Updates */}
        <aside aria-labelledby="heading-rilis" className="lg:col-span-4">
          <div className="border border-[#27272e] bg-[#0c0c10]">
            <div className="flex items-center justify-between border-b border-[#27272e] bg-[#101014] px-4 py-3.5">
              <div>
                <h2
                  id="heading-rilis"
                  className="font-display text-xl font-black uppercase tracking-tight text-[#f4f1ea]"
                >
                  Update Terbaru
                </h2>
                <p className="font-mono text-xs text-[#c8c2b6]">
                  CHAPTER BARU HARI INI
                </p>
              </div>
              <span className="h-2.5 w-2.5 bg-[#34d399]" title="Update Aktif" />
            </div>

            <div className="divide-y divide-[#27272e] p-4 space-y-3">
              {updateCommicLoading
                ? Array.from({ length: 6 }).map((_, idx) => (
                    <UpdateComicCardSkeleton key={idx} />
                  ))
                : updateComic?.data.data.map((comic) => (
                    <UpdateComicCard key={comic.manga_id} comic={comic} />
                  ))}
            </div>

            <div className="border-t border-[#27272e] bg-[#101014] p-4">
              <Link
                to="/update"
                className="flex min-h-11 w-full items-center justify-center gap-2 bg-[#be123c] px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#f4f1ea] transition-colors hover:bg-[#9f1239]"
              >
                <span>Lihat Semua Update</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
