import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer className="border-t border-[#27272e] bg-[#09090b] text-[#c8c2b6]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 font-display text-xl font-black uppercase text-[#f4f1ea]">
            <span className="px-1.5 py-0.5 bg-[#be123c] text-[#f4f1ea]">
              KOMIK
            </span>
            <span>READER</span>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-[#c8c2b6] max-w-[56ch]">
            Arsip bacaan Manga Jepang, Manhwa Korea, dan Manhua Tiongkok dalam
            terjemahan Bahasa Indonesia.
          </p>
        </div>

        <nav
          aria-label="Tautan cepat bagian bawah"
          className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono-tabular text-xs font-semibold uppercase"
        >
          <Link
            to="/home"
            className="min-h-11 inline-flex items-center text-[#c8c2b6] hover:text-[#f4f1ea] transition-colors"
          >
            Beranda
          </Link>
          <Link
            to="/popular"
            search={{ page: 1 }}
            className="min-h-11 inline-flex items-center text-[#c8c2b6] hover:text-[#f4f1ea] transition-colors"
          >
            Komik Populer
          </Link>
          <Link
            to="/update"
            className="min-h-11 inline-flex items-center text-[#c8c2b6] hover:text-[#f4f1ea] transition-colors"
          >
            Update Terbaru
          </Link>
          <Link
            to="/genre"
            className="min-h-11 inline-flex items-center text-[#c8c2b6] hover:text-[#f4f1ea] transition-colors"
          >
            Daftar Genre
          </Link>
          <Link
            to="/history"
            className="min-h-11 inline-flex items-center text-[#c8c2b6] hover:text-[#f4f1ea] transition-colors"
          >
            Riwayat Baca
          </Link>
        </nav>

        <div className="font-mono-tabular text-xs text-[#c8c2b6]">
          © 2026 KOMIK READER · EDISI INDONESIA
        </div>
      </div>
    </footer>
  );
}
