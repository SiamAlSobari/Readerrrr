import { Star, Eye, BookOpen, ArrowLeft, Bookmark } from "lucide-react";
import { useState } from "react";
import { ComicDetail as ComicDetailType } from "@/common/interface";
import { Link, useNavigate } from "@tanstack/react-router";

const COUNTRY_LABEL: Record<string, string> = {
  KR: "KR · MANHWA KOREA",
  JP: "JP · MANGA JEPANG",
  CN: "CN · MANHUA TIONGKOK",
  ID: "ID · KOMIK INDONESIA",
};

const STATUS_LABEL: Record<number, { text: string; tone: string }> = {
  0: { text: "ONGOING · BERJALAN", tone: "text-[#34d399]" },
  1: { text: "COMPLETED · TAMAT", tone: "text-[#fbbf24]" },
  2: { text: "HIATUS · JEDA", tone: "text-[#c8c2b6]" },
  3: { text: "DROPPED · BERHENTI", tone: "text-[#f43f5e]" },
};

export function ComicDetail({ comic }: { comic: ComicDetailType }) {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState({
    cover: false,
    portrait: false,
  });

  const coverUrl = comic.cover_image_url?.trim();
  const portraitUrl = (comic.cover_portrait_url || comic.cover_image_url)?.trim();

  const originLabel = COUNTRY_LABEL[comic.country_id] || `${comic.country_id || "INT"} · KOMIK`;
  const statusInfo = STATUS_LABEL[comic.status] || STATUS_LABEL[0];
  const authors = comic.taxonomy?.Author?.map((a) => a.name).join(", ") || "-";
  const artists = comic.taxonomy?.Artist?.map((a) => a.name).join(", ") || "-";
  const formats = comic.taxonomy?.Format?.map((f) => f.name).join(", ");

  return (
    <section className="relative border-b border-[#27272e] bg-[#09090b]">
      {/* Subtle Darkroom Ambient Backdrop */}
      {coverUrl && !imageError.cover && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-15">
          <img
            src={coverUrl}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center blur-2xl"
            onError={() => setImageError((prev) => ({ ...prev, cover: true }))}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#09090b]/80 via-[#09090b]/90 to-[#09090b]" />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
        {/* Top Masthead & Back Navigation */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[#27272e] pb-4">
          <button
            type="button"
            onClick={() => navigate({ to: "/home" })}
            className="inline-flex min-h-10 items-center gap-2 border border-[#27272e] bg-[#141418] px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#f4f1ea] transition-colors hover:border-[#f4f1ea] hover:bg-[#181820]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Katalog Utama</span>
          </button>

          <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wider tabular-nums">
            <span className="border border-[#27272e] bg-[#101014] px-2.5 py-1 text-[#c8c2b6]">
              {originLabel}
            </span>
            <span className={`border border-[#27272e] bg-[#101014] px-2.5 py-1 font-bold ${statusInfo.tone}`}>
              {statusInfo.text}
            </span>
          </div>
        </div>

        {/* 12-Column Volume Dossier */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left 4 Columns: Tankobon Volume Cover Frame */}
          <div className="lg:col-span-4">
            <div className="mx-auto max-w-xs border border-[#27272e] bg-[#0c0c10] p-4 sm:p-5">
              <div className="relative aspect-3/4 w-full overflow-hidden border border-[#27272e] bg-[#141418]">
                {portraitUrl && !imageError.portrait ? (
                  <img
                    src={portraitUrl}
                    alt={comic.title}
                    className="h-full w-full object-cover"
                    onError={() =>
                      setImageError((prev) => ({ ...prev, portrait: true }))
                    }
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center p-4 text-center font-mono text-xs font-bold uppercase text-[#c8c2b6]">
                    {comic.title}
                  </div>
                )}
              </div>

              {/* Tankobon Obi Colophon Strip */}
              <div className="mt-3 flex items-center justify-between border border-[#27272e] bg-[#101014] px-3 py-2 font-mono text-xs font-bold uppercase tabular-nums">
                <span className="text-[#f43f5e]">
                  {comic.rank ? `RANK #${String(comic.rank).padStart(2, "0")}` : formats || "EDISI CETAK"}
                </span>
                <span className="text-[#f4f1ea]">
                  CH. {comic.latest_chapter_number || "-"}
                </span>
              </div>

              {/* Primary CTA inside Left Plinth on Mobile & Desktop */}
              {comic.latest_chapter_id && (
                <button
                  type="button"
                  onClick={() =>
                    navigate({
                      to: "/read/$comicId/$chapterId",
                      params: {
                        chapterId: comic.latest_chapter_id,
                        comicId: comic.manga_id,
                      },
                    })
                  }
                  className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 bg-[#be123c] px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#f4f1ea] transition-colors hover:bg-[#9f1239]"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>
                    {comic.latest_chapter_number
                      ? `Baca Chapter ${comic.latest_chapter_number}`
                      : "Mulai Baca Sekarang"}
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Right 8 Columns: Editorial Dossier & Specifications */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-8">
            <div className="space-y-5">
              {/* Title & Alternative Title */}
              <div className="border-b border-[#27272e] pb-4">
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#f4f1ea]">
                  {comic.title}
                </h1>
                {comic.alternative_title && (
                  <p className="mt-2 font-mono text-xs text-[#c8c2b6]">
                    JUDUL ALTERNATIF: {comic.alternative_title}
                  </p>
                )}
              </div>

              {/* 6-Cell Specification Matrix */}
              <dl className="grid grid-cols-2 gap-px border border-[#27272e] bg-[#27272e] font-mono text-xs tabular-nums sm:grid-cols-3">
                <div className="bg-[#101014] p-3.5">
                  <dt className="text-xs uppercase text-[#c8c2b6]">PENILAIAN PEMBACA</dt>
                  <dd className="mt-1 flex items-center gap-1.5 text-sm font-bold text-[#fbbf24]">
                    <Star className="h-4 w-4 fill-[#fbbf24] text-[#fbbf24]" />
                    <span>{comic.user_rate ? Number(comic.user_rate).toFixed(1) : "N/A"} / 5.0</span>
                  </dd>
                </div>

                <div className="bg-[#101014] p-3.5">
                  <dt className="text-xs uppercase text-[#c8c2b6]">TOTAL PEMBACA</dt>
                  <dd className="mt-1 flex items-center gap-1.5 text-sm font-bold text-[#f4f1ea]">
                    <Eye className="h-4 w-4 text-[#c8c2b6]" />
                    <span>{comic.view_count?.toLocaleString("id-ID") || "0"}</span>
                  </dd>
                </div>

                <div className="bg-[#101014] p-3.5">
                  <dt className="text-xs uppercase text-[#c8c2b6]">PENANDA / BOOKMARK</dt>
                  <dd className="mt-1 flex items-center gap-1.5 text-sm font-bold text-[#f4f1ea]">
                    <Bookmark className="h-4 w-4 text-[#c8c2b6]" />
                    <span>{comic.bookmark_count?.toLocaleString("id-ID") || "0"}</span>
                  </dd>
                </div>

                <div className="bg-[#101014] p-3.5">
                  <dt className="text-xs uppercase text-[#c8c2b6]">TAHUN RILIS</dt>
                  <dd className="mt-1 text-sm font-bold text-[#f4f1ea]">
                    {comic.release_year || "-"}
                  </dd>
                </div>

                <div className="bg-[#101014] p-3.5">
                  <dt className="text-xs uppercase text-[#c8c2b6]">PENULIS (AUTHOR)</dt>
                  <dd className="mt-1 truncate text-sm font-bold text-[#f4f1ea]" title={authors}>
                    {authors}
                  </dd>
                </div>

                <div className="bg-[#101014] p-3.5">
                  <dt className="text-xs uppercase text-[#c8c2b6]">ILUSTRATOR (ARTIST)</dt>
                  <dd className="mt-1 truncate text-sm font-bold text-[#f4f1ea]" title={artists}>
                    {artists}
                  </dd>
                </div>
              </dl>

              {/* Genre Classification Links */}
              <div>
                <h2 className="mb-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#c8c2b6]">
                  Genre
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {comic.taxonomy?.Genre?.length ? (
                    comic.taxonomy.Genre.map((g) => (
                      <Link
                        key={g.slug}
                        to="/genre"
                        search={{ g: g.slug }}
                        className="border border-[#27272e] bg-[#141418] px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#f4f1ea] transition-colors hover:border-[#be123c] hover:bg-[#be123c]"
                      >
                        {g.name}
                      </Link>
                    ))
                  ) : (
                    <span className="font-mono text-xs text-[#c8c2b6]">
                      Belum ada genre
                    </span>
                  )}
                </div>
              </div>

              {/* Synopsis */}
              <div className="border border-[#27272e] bg-[#0c0c10] p-4 sm:p-5">
                <h2 className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-[#c8c2b6]">
                  Sinopsis Cerita
                </h2>
                <p className="max-w-[68ch] whitespace-pre-line text-sm sm:text-base leading-relaxed text-[#f4f1ea]">
                  {comic.description || "Sinopsis belum tersedia untuk komik ini."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
