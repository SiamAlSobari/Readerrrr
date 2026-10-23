import { useEffect, useState } from "react";
import { ArrowUpRight, BookOpen, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { PopularComic } from "@/common/interface";
import { Link } from "@tanstack/react-router";

interface Props {
  comics: PopularComic[];
}

const COUNTRY_LABEL: Record<string, string> = {
  KR: "KR · MANHWA",
  JP: "JP · MANGA",
  CN: "CN · MANHUA",
};

export default function HeroSection({ comics }: Props) {
  const items = comics.slice(0, 5);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [items.length]);

  if (!items.length) return null;

  const current = items[active] ?? items[0];
  const originLabel = COUNTRY_LABEL[current.country_id] || "INT · KOMIK";
  const genres = current.taxonomy?.Genre?.slice(0, 4) ?? [];

  return (
    <section
      aria-label="Sorotan Utama Sirkulasi"
      className="mb-10 border border-[#27272e] bg-[#0c0c10]"
    >
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#27272e] bg-[#101014] px-4 py-2.5 sm:px-6">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-[#c8c2b6] tabular-nums">
          <span className="bg-[#be123c] px-2 py-0.5 font-bold text-[#f4f1ea]">
            TRENDING MINGGU INI
          </span>
          <span>PILIHAN #{String(active + 1).padStart(2, "0")}</span>
          <span className="hidden sm:inline text-[#27272e]">/</span>
          <span className="hidden sm:inline text-[#f4f1ea]">{originLabel}</span>
        </div>

        <div className="flex items-center gap-1">
          {items.map((item, idx) => {
            const isSelected = idx === active;
            return (
              <button
                key={item.manga_id}
                type="button"
                onClick={() => setActive(idx)}
                aria-label={`Tampilkan sorotan ${idx + 1}: ${item.title}`}
                aria-current={isSelected ? "true" : undefined}
                className={`min-h-9 min-w-9 border px-2.5 font-mono text-xs font-bold tabular-nums transition-colors ${
                  isSelected
                    ? "border-[#be123c] bg-[#be123c] text-[#f4f1ea]"
                    : "border-[#27272e] bg-[#141418] text-[#c8c2b6] hover:border-[#f4f1ea] hover:text-[#f4f1ea]"
                }`}
              >
                {String(idx + 1).padStart(2, "0")}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setActive((prev) => (prev - 1 + items.length) % items.length)}
            aria-label="Sorotan sebelumnya"
            className="ml-1 flex min-h-9 min-w-9 items-center justify-center border border-[#27272e] bg-[#141418] text-[#c8c2b6] transition-colors hover:border-[#f4f1ea] hover:text-[#f4f1ea]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setActive((prev) => (prev + 1) % items.length)}
            aria-label="Sorotan selanjutnya"
            className="flex min-h-9 min-w-9 items-center justify-center border border-[#27272e] bg-[#141418] text-[#c8c2b6] transition-colors hover:border-[#f4f1ea] hover:text-[#f4f1ea]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Editorial Spread */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Cover Column (4 cols) */}
        <div className="relative flex items-center justify-center border-b border-[#27272e] bg-[#09090b] p-6 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
          <div className="relative w-48 sm:w-56 border border-[#27272e] bg-[#141418]">
            <div className="aspect-3/4 w-full overflow-hidden bg-[#141418]">
              <img
                src={current.cover_portrait_url || current.cover_image_url}
                alt={current.title}
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Tankobon Obi Belly Band */}
            <div className="flex items-center justify-between border-t border-[#27272e] bg-[#101014] px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#f4f1ea] tabular-nums">
              <span className="text-[#f43f5e]">
                {current.rank ? `PERINGKAT #${String(current.rank).padStart(2, "0")}` : originLabel}
              </span>
              <span>CH. {current.latest_chapter_number}</span>
            </div>
          </div>
        </div>

        {/* Right Dossier Column (8 cols) */}
        <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-8">
          <div className="space-y-5">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#f4f1ea] line-clamp-2">
                {current.title}
              </h2>
              {current.alternative_title && (
                <p className="mt-1.5 font-mono text-xs text-[#c8c2b6] line-clamp-1">
                  {current.alternative_title}
                </p>
              )}
            </div>

            {/* Specification Ledger */}
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-px border border-[#27272e] bg-[#27272e] font-mono text-xs tabular-nums">
              <div className="bg-[#101014] p-3">
                <dt className="text-xs uppercase text-[#c8c2b6]">JENIS KOMIK</dt>
                <dd className="mt-1 font-bold text-[#f4f1ea]">{originLabel}</dd>
              </div>
              <div className="bg-[#101014] p-3">
                <dt className="text-xs uppercase text-[#c8c2b6]">CHAPTER BARU</dt>
                <dd className="mt-1 font-bold text-[#f43f5e]">
                  CH. {current.latest_chapter_number}
                </dd>
              </div>
              <div className="bg-[#101014] p-3">
                <dt className="text-xs uppercase text-[#c8c2b6]">RATING</dt>
                <dd className="mt-1 flex items-center gap-1 font-bold text-[#fbbf24]">
                  <Star className="h-3.5 w-3.5 fill-[#fbbf24] text-[#fbbf24]" />
                  {current.user_rate ? current.user_rate.toFixed(1) : "N/A"} / 5.0
                </dd>
              </div>
              <div className="bg-[#101014] p-3">
                <dt className="text-xs uppercase text-[#c8c2b6]">PEMBACA</dt>
                <dd className="mt-1 font-bold text-[#f4f1ea]">
                  {current.view_count ? current.view_count.toLocaleString("id-ID") : "-"}
                </dd>
              </div>
            </dl>

            {/* Synopsis */}
            {current.description && (
              <p className="max-w-[68ch] text-sm sm:text-base leading-relaxed text-[#c8c2b6] line-clamp-3">
                {current.description}
              </p>
            )}

            {/* Genre Tags */}
            {genres.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {genres.map((g) => (
                  <span
                    key={g.slug || g.name}
                    className="border border-[#27272e] bg-[#141418] px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[#c8c2b6]"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action Bar */}
          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[#27272e] pt-5">
            <Link
              to="/read/$comicId/$chapterId"
              params={{
                comicId: current.manga_id,
                chapterId: current.latest_chapter_id,
              }}
              className="inline-flex min-h-11 items-center gap-2 bg-[#be123c] px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#f4f1ea] transition-colors hover:bg-[#9f1239]"
            >
              <BookOpen className="h-4 w-4" />
              <span>Baca Ch. {current.latest_chapter_number}</span>
            </Link>

            <Link
              to="/series/$comicId"
              params={{ comicId: current.manga_id }}
              search={{ page: 1 }}
              className="inline-flex min-h-11 items-center gap-2 border border-[#27272e] bg-[#141418] px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#f4f1ea] transition-colors hover:border-[#f4f1ea] hover:bg-[#181820]"
            >
              <span>Detail Komik</span>
              <ArrowUpRight className="h-4 w-4 text-[#c8c2b6]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
