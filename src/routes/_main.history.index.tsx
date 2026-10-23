import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import {
  Trash2,
  BookOpen,
  Clock,
  ArrowRight,
  ChevronRight,
  Search,
  Library,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import {
  getChapterHistory,
  deleteHistoryItem,
  clearAllHistory,
  ChapterHistory,
} from "@/common/utils/chapter-history";
import { filterAndRankChapters } from "@/common/utils/chapter-filter";
import { JsonLd } from "@/common/components/JsonLd";
import { useServerFn } from "@tanstack/react-start";
import { getComicDetail } from "@/api/servers/shinigami.server";

const SITE_URL = "https://komik-reader.my.id";

export const Route = createFileRoute("/_main/history/")({
  component: HistoryPage,
  head: () => ({
    meta: [
      {
        name: "description",
        content:
          "Pantau riwayat membaca komik Anda di KOMIK READER. Lanjutkan membaca manga, manhwa, dan manhua favorit Anda dengan mudah.",
      },
      {
        name: "keywords",
        content:
          "riwayat baca, history komik, baca komik, manga history, manhwa history, komik reader",
      },
      { property: "og:title", content: "Riwayat Membaca - KOMIK READER" },
      {
        property: "og:description",
        content:
          "Pantau dan lanjutkan membaca manga, manhwa, dan manhua favorit Anda di KOMIK READER.",
      },
      { property: "og:url", content: `${SITE_URL}/history` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Riwayat Membaca - KOMIK READER" },
      {
        name: "twitter:description",
        content: "Lanjutkan membaca komik favorit Anda di KOMIK READER.",
      },
    ],
    title: "Riwayat Membaca - KOMIK READER",
  }),
});

function HistoryPage() {
  const [historyList, setHistoryList] = useState<ChapterHistory[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [healingIds, setHealingIds] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const comicDetail = useServerFn(getComicDetail);

  useEffect(() => {
    const rawHistory = getChapterHistory();
    setHistoryList(rawHistory);
    setMounted(true);

    const healHistory = async () => {
      const itemsToHeal = rawHistory.filter(
        (h) => !h.comic_title || !h.comic_cover_url
      );
      if (itemsToHeal.length === 0) return;

      const healingMap: Record<string, boolean> = {};
      itemsToHeal.forEach((item) => {
        healingMap[item.comic_id] = true;
      });
      setHealingIds(healingMap);

      const healPromises = itemsToHeal.map(async (item) => {
        try {
          const res = await comicDetail({ data: { comicId: item.comic_id } });
          if (res?.data?.data) {
            return {
              comic_id: item.comic_id,
              comic_title: res.data.data.title,
              comic_cover_url:
                res.data.data.cover_portrait_url ||
                res.data.data.cover_image_url,
            };
          }
        } catch (e) {
          console.error("Failed to heal item:", item.comic_id, e);
        }
        return null;
      });

      const results = await Promise.allSettled(healPromises);
      let updated = false;
      const updatedHistory = [...rawHistory];

      results.forEach((result) => {
        if (result.status === "fulfilled" && result.value) {
          const healed = result.value;
          const idx = updatedHistory.findIndex(
            (h) => h.comic_id === healed.comic_id
          );
          if (idx !== -1) {
            updatedHistory[idx] = {
              ...updatedHistory[idx],
              comic_title: healed.comic_title,
              comic_cover_url: healed.comic_cover_url,
            };
            updated = true;
          }
        }
      });

      setHealingIds({});

      if (updated) {
        setHistoryList(updatedHistory);
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "chapter-history",
            JSON.stringify(updatedHistory)
          );
        }
      }
    };

    healHistory();
  }, [comicDetail]);

  const handleDelete = (comicId: string) => {
    deleteHistoryItem(comicId);
    setHistoryList(getChapterHistory());
  };

  const handleClearAll = () => {
    clearAllHistory();
    setHistoryList([]);
    setShowConfirmClear(false);
  };

  const filteredHistory = useMemo(() => {
    if (!searchQuery.trim()) return historyList;
    return filterAndRankChapters(historyList, searchQuery, false);
  }, [historyList, searchQuery]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Riwayat Membaca - KOMIK READER",
          description: "Pantau riwayat membaca komik Anda di KOMIK READER.",
          url: `${SITE_URL}/history`,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: { "@id": SITE_URL, name: "Beranda" },
            },
            {
              "@type": "ListItem",
              position: 2,
              item: { "@id": `${SITE_URL}/history`, name: "Riwayat Membaca" },
            },
          ],
        }}
      />

      {/* MASTHEAD */}
      <header className="mb-8 flex flex-col justify-between gap-4 border-b border-[#27272e] pb-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#f4f1ea]">
            Riwayat Baca
          </h1>
          <p className="mt-1.5 max-w-[65ch] text-sm text-[#c8c2b6]">
            Daftar komik dan chapter terakhir yang kamu baca tersimpan otomatis di browser ini.
          </p>
        </div>

        {mounted && historyList.length > 0 && (
          <button
            type="button"
            onClick={() => setShowConfirmClear(true)}
            className="inline-flex min-h-11 items-center gap-2 border border-[#f43f5e]/40 bg-[#141418] px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#f43f5e] transition-colors hover:border-[#be123c] hover:bg-[#be123c] hover:text-[#f4f1ea] self-start sm:self-auto"
          >
            <Trash2 className="h-4 w-4" />
            <span>Hapus Semua</span>
          </button>
        )}
      </header>

      {/* STATS & SEARCH BAR */}
      {mounted && historyList.length > 0 && (
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-12">
          <div className="flex items-center gap-3 border border-[#27272e] bg-[#0c0c10] px-4 py-3 sm:col-span-4">
            <div className="flex h-10 w-10 items-center justify-center border border-[#27272e] bg-[#141418] text-[#f43f5e]">
              <Library className="h-5 w-5" />
            </div>
            <div className="font-mono tabular-nums">
              <div className="text-xs uppercase text-[#c8c2b6]">
                TOTAL DIBACA
              </div>
              <div className="text-base font-bold text-[#f4f1ea]">
                {historyList.length} JUDUL KOMIK
              </div>
            </div>
          </div>

          <div className="relative flex items-center sm:col-span-8">
            <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-[#c8c2b6]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul komik atau nomor chapter dari riwayat..."
              aria-label="Cari riwayat komik"
              className="min-h-12 w-full border border-[#27272e] bg-[#141418] pl-10 pr-4 font-mono text-xs text-[#f4f1ea] placeholder-[#c8c2b6]/60 focus:border-[#f43f5e] focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* LIST / CONTENT */}
      {!mounted ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-32 animate-pulse border border-[#27272e] bg-[#101014]"
            />
          ))}
        </div>
      ) : historyList.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-[#27272e] bg-[#0c0c10] py-16 px-4 text-center">
          <BookOpen className="mb-4 h-14 w-14 text-[#c8c2b6]" />
          <h2 className="font-display text-2xl font-black uppercase tracking-tight text-[#f4f1ea]">
            Belum Ada Catatan Baca
          </h2>
          <p className="mt-1.5 mb-6 max-w-md text-sm text-[#c8c2b6]">
            Setiap chapter yang Anda buka akan tercatat otomatis di halaman ini agar mudah dilanjutkan kapan saja.
          </p>
          <button
            type="button"
            onClick={() => navigate({ to: "/home" })}
            className="inline-flex min-h-11 items-center gap-2 bg-[#be123c] px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#f4f1ea] transition-colors hover:bg-[#9f1239]"
          >
            <span>Jelajahi Katalog Utama</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="border border-[#27272e] bg-[#0c0c10] py-12 text-center font-mono text-xs text-[#c8c2b6]">
          Tidak ditemukan catatan riwayat yang cocok dengan "{searchQuery}".
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-px border border-[#27272e] bg-[#27272e]">
          {filteredHistory.map((item, idx) => {
            const formattedTime = formatDistanceToNow(item.last_read_time, {
              addSuffix: true,
              locale: id,
            });

            const isHealing = healingIds[item.comic_id] || !item.comic_title;

            return (
              <article
                key={item.comic_id}
                className="group flex flex-row items-center gap-4 bg-[#101014] p-3.5 transition-colors hover:bg-[#141418]"
              >
                {/* Index Stamp */}
                <div className="hidden sm:flex h-full items-center px-2 font-mono text-xs font-bold text-[#c8c2b6] tabular-nums">
                  {String(idx + 1).padStart(2, "0")}
                </div>

                {/* Cover image */}
                <div className="h-28 w-20 shrink-0 overflow-hidden border border-[#27272e] bg-[#141418]">
                  {isHealing ? (
                    <div className="h-full w-full animate-pulse bg-[#181820]" />
                  ) : item.comic_cover_url ? (
                    <img
                      src={item.comic_cover_url}
                      alt={item.comic_title || "Sampul komik"}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center p-2 text-center font-mono text-xs font-bold uppercase text-[#c8c2b6]">
                      TANPA SAMPUL
                    </div>
                  )}
                </div>

                {/* Metadata & Actions */}
                <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 py-0.5">
                  <div>
                    {isHealing ? (
                      <div className="mb-2 h-5 w-48 animate-pulse bg-[#181820]" />
                    ) : (
                      <Link
                        to="/series/$comicId"
                        params={{ comicId: item.comic_id }}
                        search={{ page: 1 }}
                        className="line-clamp-1 font-display text-xl font-black uppercase tracking-tight text-[#f4f1ea] hover:text-[#f43f5e] transition-colors"
                      >
                        {item.comic_title}
                      </Link>
                    )}

                    <div className="mt-1 flex items-center gap-1.5 font-mono text-xs text-[#c8c2b6] tabular-nums">
                      <Clock className="h-3.5 w-3.5 text-[#34d399]" />
                      <span>Dibaca {formattedTime}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <Link
                      to="/read/$comicId/$chapterId"
                      params={{
                        comicId: item.comic_id,
                        chapterId: item.chapter_id,
                      }}
                      className="inline-flex min-h-10 items-center gap-1.5 bg-[#be123c] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#f4f1ea] transition-colors hover:bg-[#9f1239] tabular-nums"
                    >
                      <span>Lanjutkan Ch. {item.chapter_number}</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>

                    <Link
                      to="/series/$comicId"
                      params={{ comicId: item.comic_id }}
                      search={{ page: 1 }}
                      className="inline-flex min-h-10 items-center border border-[#27272e] bg-[#141418] px-3.5 py-2 font-mono text-xs font-bold uppercase text-[#c8c2b6] transition-colors hover:border-[#f4f1ea] hover:text-[#f4f1ea]"
                    >
                      Detail Komik
                    </Link>
                  </div>
                </div>

                {/* Delete single button */}
                <button
                  type="button"
                  onClick={() => handleDelete(item.comic_id)}
                  className="flex min-h-10 min-w-10 shrink-0 items-center justify-center border border-[#27272e] bg-[#141418] text-[#c8c2b6] transition-colors hover:border-[#be123c] hover:bg-[#be123c] hover:text-[#f4f1ea]"
                  title="Hapus dari riwayat"
                  aria-label={`Hapus ${item.comic_title || "komik"} dari riwayat`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </article>
            );
          })}
        </div>
      )}

      {/* CONFIRM CLEAR MODAL */}
      {showConfirmClear && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="clear-history-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#09090b]/85 p-4"
        >
          <div className="w-full max-w-md border border-[#27272e] bg-[#0c0c10] p-6">
            <h2
              id="clear-history-title"
              className="font-display text-2xl font-black uppercase tracking-tight text-[#f4f1ea]"
            >
              Kosongkan Seluruh Arsip Baca?
            </h2>
            <p className="mt-2 text-sm text-[#c8c2b6]">
              Tindakan ini akan menghapus seluruh daftar riwayat membaca komik dari peramban ini secara permanen.
            </p>
            <div className="mt-6 flex justify-end gap-3 border-t border-[#27272e] pt-4">
              <button
                type="button"
                onClick={() => setShowConfirmClear(false)}
                className="min-h-11 border border-[#27272e] bg-[#141418] px-4 py-2 font-mono text-xs font-bold uppercase text-[#f4f1ea] transition-colors hover:border-[#f4f1ea]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                className="min-h-11 bg-[#be123c] px-5 py-2 font-mono text-xs font-bold uppercase text-[#f4f1ea] transition-colors hover:bg-[#9f1239]"
              >
                Ya, Hapus Semua
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
