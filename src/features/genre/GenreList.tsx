import { TaxonomyItem } from "@/common/interface";
import { useNavigate } from "@tanstack/react-router";

interface Props {
  activeGenre: string;
  genres: TaxonomyItem[];
}

export default function GenreList({ activeGenre, genres }: Props) {
  const navigate = useNavigate();

  return (
    <aside
      aria-label="Daftar Genre"
      className="border border-[#27272e] bg-[#0c0c10]"
    >
      <div className="flex items-center justify-between border-b border-[#27272e] bg-[#101014] px-4 py-3">
        <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#f4f1ea]">
          Direktori Genre
        </h2>
        <span className="font-mono text-xs text-[#c8c2b6] tabular-nums">
          [{genres.length}]
        </span>
      </div>

      <div className="max-h-96 lg:max-h-[560px] overflow-y-auto p-2">
        <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-1">
          {genres.map((genre, index) => {
            const active = activeGenre === genre.slug;

            return (
              <button
                key={genre.slug}
                type="button"
                onClick={() =>
                  navigate({ to: `/genre`, search: { g: genre.slug } })
                }
                aria-current={active ? "true" : undefined}
                className={`flex min-h-10 items-center justify-between px-3 py-2 text-left font-mono text-xs uppercase transition-colors ${
                  active
                    ? "bg-[#be123c] font-bold text-[#f4f1ea]"
                    : "bg-[#101014] text-[#c8c2b6] hover:bg-[#181820] hover:text-[#f4f1ea]"
                }`}
              >
                <span className="truncate">{genre.name}</span>
                <span className="ml-2 text-xs opacity-75 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
