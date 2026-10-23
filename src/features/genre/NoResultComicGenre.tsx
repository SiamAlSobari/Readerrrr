import { SearchX } from "lucide-react";

export default function NoResultComicGenre() {
  return (
    <div className="flex flex-col items-center justify-center border border-[#27272e] bg-[#0c0c10] py-16 px-4 text-center">
      <SearchX className="mb-4 h-12 w-12 text-[#c8c2b6]" />
      <h3 className="font-display text-2xl font-black uppercase tracking-tight text-[#f4f1ea]">
        Arsip Genre Kosong
      </h3>
      <p className="mt-1.5 max-w-sm text-sm text-[#c8c2b6]">
        Komik dengan klasifikasi genre ini belum tersedia di dalam indeks sirkulasi saat ini.
      </p>
    </div>
  );
}
