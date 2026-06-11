import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Trash2, BookOpen, Clock, ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { getChapterHistory, deleteHistoryItem, clearAllHistory, ChapterHistory } from "@/common/utils/chapter-history";
import { Button } from "@/common/shadcn-ui/button";
import { JsonLd } from "@/common/components/JsonLd";

const SITE_URL = "https://komik-reader.my.id";

export const Route = createFileRoute("/_main/history/")({
  component: HistoryPage,
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Pantau riwayat membaca komik Anda di KOMIK READER. Lanjutkan membaca manga, manhwa, dan manhua favorit Anda dengan mudah.",
      },
      {
        name: "keywords",
        content: "riwayat baca, history komik, baca komik, manga history, manhwa history, komik reader",
      },
      { property: "og:title", content: "Riwayat Membaca - KOMIK READER" },
      {
        property: "og:description",
        content: "Pantau dan lanjutkan membaca manga, manhwa, dan manhua favorit Anda di KOMIK READER.",
      },
      { property: "og:url", content: `${SITE_URL}/history` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Riwayat Membaca - KOMIK READER" },
      {
        name: "twitter:description",
        content: "Lanjutkan membaca komik favorit Anda di KOMIK READER.",
      },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/history` },
    ],
    title: "Riwayat Membaca - KOMIK READER",
  }),
});

function HistoryPage() {
  const [historyList, setHistoryList] = useState<ChapterHistory[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setHistoryList(getChapterHistory());
    setMounted(true);
  }, []);

  const handleDelete = (comicId: string) => {
    deleteHistoryItem(comicId);
    setHistoryList(getChapterHistory());
  };

  const handleClearAll = () => {
    clearAllHistory();
    setHistoryList([]);
    setShowConfirmClear(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-black to-zinc-950 text-white py-8 px-4 sm:px-6">
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
            { "@type": "ListItem", position: 1, item: { "@id": SITE_URL, name: "Beranda" } },
            { "@type": "ListItem", position: 2, item: { "@id": `${SITE_URL}/history`, name: "Riwayat Membaca" } },
          ],
        }}
      />

      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Personal Tracker
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-linear-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              Riwayat Membaca
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base mt-1">
              Komik yang baru-baru ini Anda baca disimpan di browser ini.
            </p>
          </div>

          {mounted && historyList.length > 0 && (
            <Button
              onClick={() => setShowConfirmClear(true)}
              variant="destructive"
              className="bg-red-500/10 hover:bg-red-500 hover:text-white border border-red-500/20 text-red-400 gap-2 shrink-0 transition-all duration-300"
            >
              <Trash2 className="w-4 h-4" />
              Hapus Semua
            </Button>
          )}
        </div>

        {/* LIST / CONTENT */}
        {!mounted ? (
          // Skeleton Loader
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-32 bg-zinc-900/50 border border-zinc-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : historyList.length === 0 ? (
          // Empty State
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center text-center py-16 px-4 bg-zinc-900/30 border border-zinc-800/80 rounded-3xl backdrop-blur-md"
          >
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl w-20 h-20 mx-auto" />
              <BookOpen className="w-16 h-16 text-zinc-600 relative z-10 mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-zinc-300 mb-2">Belum ada riwayat</h3>
            <p className="text-zinc-500 max-w-sm mb-8 text-sm sm:text-base">
              Anda belum membaca komik apapun. Mulai petualangan membaca Anda sekarang!
            </p>
            <Button
              onClick={() => navigate({ to: "/home" })}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl px-6 py-5 shadow-lg shadow-red-500/20 transition-all"
            >
              Jelajahi Komik
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        ) : (
          // History List
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {historyList.map((item) => {
                const formattedTime = formatDistanceToNow(item.last_read_time, {
                  addSuffix: true,
                  locale: id,
                });

                return (
                  <motion.div
                    key={item.comic_id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="group flex flex-row gap-4 p-3.5 bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700/80 hover:bg-zinc-900/80 rounded-2xl backdrop-blur-md transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Cover image */}
                    <div className="w-20 h-28 sm:w-24 sm:h-32 bg-zinc-850 rounded-xl overflow-hidden shrink-0 relative shadow-inner">
                      {item.comic_cover_url ? (
                        <img
                          src={item.comic_cover_url}
                          alt={item.comic_title || "Cover komik"}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-600 text-xs">
                          No Cover
                        </div>
                      )}
                    </div>

                    {/* Metadata & Actions */}
                    <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                      <div>
                        <Link
                          to="/series/$comicId"
                          params={{ comicId: item.comic_id }}
                          search={{ page: 1 }}
                          className="font-bold text-base sm:text-lg text-white hover:text-red-400 transition-colors line-clamp-1 truncate block mb-1 pr-8"
                        >
                          {item.comic_title || item.comic_id}
                        </Link>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-zinc-500" />
                            {formattedTime}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <Link
                          to="/read/$comicId/$chapterId"
                          params={{ comicId: item.comic_id, chapterId: item.chapter_id }}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-800 hover:bg-red-500 hover:text-white rounded-xl text-xs font-semibold text-zinc-200 transition-all duration-300"
                        >
                          <span>Lanjutkan Ch. {item.chapter_number}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* Delete single button */}
                    <button
                      onClick={() => handleDelete(item.comic_id)}
                      className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-red-400 rounded-xl hover:bg-white/5 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                      title="Hapus dari riwayat"
                      aria-label="Hapus dari riwayat"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* CONFIRM CLEAR MODAL */}
      {showConfirmClear && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-zinc-900 border border-zinc-850 p-6 rounded-3xl"
          >
            <h3 className="text-xl font-bold text-white mb-2">Hapus Semua Riwayat?</h3>
            <p className="text-zinc-400 text-sm mb-6">
              Tindakan ini akan menghapus seluruh daftar riwayat membaca komik Anda dari browser ini secara permanen.
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                onClick={() => setShowConfirmClear(false)}
                variant="ghost"
                className="text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl"
              >
                Batal
              </Button>
              <Button
                onClick={handleClearAll}
                className="bg-red-500 hover:bg-red-600 text-white rounded-xl"
              >
                Ya, Hapus Semua
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
