import { Search, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/common/shadcn-ui/sheet";
import { Button } from "@/common/shadcn-ui/button";
import { Input } from "@/common/shadcn-ui/input";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [desktopQuery, setDesktopQuery] = useState("");
  const [mobileQuery, setMobileQuery] = useState("");
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const NAV_ITEMS = [
    { name: "Katalog", href: "/home" },
    { name: "Populer", href: "/popular" },
    { name: "Genre", href: "/genre" },
    { name: "Update", href: "/update" },
    { name: "Riwayat", href: "/history" },
  ];

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    navigate({ to: "/search", search: { q: query.trim() } });
    setDesktopQuery("");
    setMobileQuery("");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#27272e] bg-[#09090b]/95">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* LEFT */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2 font-display text-2xl font-black tracking-tight uppercase text-[#f4f1ea]"
            >
              <span className="px-2 py-0.5 bg-[#be123c] text-[#f4f1ea]">
                KOMIK
              </span>
              <span>READER</span>
            </Link>

            <nav
              aria-label="Navigasi utama"
              className="hidden md:flex items-center gap-6"
            >
              {NAV_ITEMS.map((item) => (
                <Link key={item.name} to={item.href}>
                  {({ isActive }) => (
                    <span
                      className={`relative min-h-11 inline-flex items-center font-mono-tabular text-xs font-bold uppercase tracking-wider transition-colors
                      ${
                        isActive
                          ? "text-[#f43f5e]"
                          : "text-[#c8c2b6] hover:text-[#f4f1ea]"
                      }`}
                    >
                      {item.name}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            {/* SEARCH DESKTOP */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(desktopQuery);
              }}
              className="relative hidden md:flex items-center"
            >
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#c8c2b6]" />

              <Input
                ref={searchInputRef}
                value={desktopQuery}
                onChange={(e) => setDesktopQuery(e.target.value)}
                placeholder="Cari komik..."
                aria-label="Cari komik"
                className="
                  h-10 w-72 rounded-none pl-10 pr-24 text-sm
                  bg-[#141418] text-[#f4f1ea] placeholder:text-[#c8c2b6]/70
                  border border-[#27272e]
                  focus:border-[#e11d48] focus:ring-0
                  transition
                "
              />

              {desktopQuery && (
                <button
                  type="button"
                  onClick={() => setDesktopQuery("")}
                  aria-label="Bersihkan pencarian"
                  className="absolute right-14 top-1/2 -translate-y-1/2 text-[#c8c2b6] hover:text-[#f4f1ea] p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              )}

              <span className="absolute right-11 top-1/2 -translate-y-1/2 font-mono-tabular text-xs text-[#c8c2b6] pointer-events-none">
                ⌘K
              </span>

              <Button
                type="submit"
                size="icon"
                aria-label="Jalankan pencarian"
                className="
                  absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8
                  rounded-none bg-[#be123c] hover:bg-[#9f1239] text-[#f4f1ea]
                "
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>

            {/* MOBILE MENU */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  aria-label="Buka menu navigasi"
                  className="md:hidden min-h-11 px-3 rounded-none border border-[#27272e] bg-[#141418] text-[#f4f1ea] font-mono-tabular text-xs font-bold uppercase gap-2"
                >
                  <Menu className="h-4 w-4" />
                  <span>Menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent
                side="left"
                className="bg-[#09090b] border-r border-[#27272e] pt-12 w-80 text-[#f4f1ea]"
              >
                <div className="space-y-6">
                  {/* SEARCH MOBILE */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSearch(mobileQuery);
                    }}
                    className="relative px-4"
                  >
                    <Search className="absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 text-[#c8c2b6]" />

                    <Input
                      value={mobileQuery}
                      onChange={(e) => setMobileQuery(e.target.value)}
                      placeholder="Cari judul komik..."
                      aria-label="Cari komik di mobile"
                      className="
                        h-11 rounded-none pl-10 pr-12
                        bg-[#141418] text-[#f4f1ea] border-[#27272e]
                        focus:border-[#e11d48]
                      "
                    />

                    {mobileQuery && (
                      <button
                        type="button"
                        onClick={() => setMobileQuery("")}
                        aria-label="Bersihkan pencarian mobile"
                        className="absolute right-14 top-1/2 -translate-y-1/2 text-[#c8c2b6]"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}

                    <Button
                      type="submit"
                      size="icon"
                      aria-label="Cari komik mobile"
                      className="absolute right-5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-none bg-[#be123c] text-[#f4f1ea]"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </form>

                  {/* NAV MOBILE */}
                  <nav
                    aria-label="Navigasi mobile"
                    className="flex flex-col px-4 divide-y divide-[#27272e] border-t border-b border-[#27272e]"
                  >
                    {NAV_ITEMS.map((item) => (
                      <Link key={item.name} to={item.href}>
                        {({ isActive }) => (
                          <span
                            className={`flex items-center justify-between min-h-12 px-2 font-mono-tabular text-sm font-bold uppercase transition-colors
                            ${
                              isActive
                                ? "text-[#f43f5e] bg-[#141418]"
                                : "text-[#c8c2b6] hover:text-[#f4f1ea]"
                            }`}
                          >
                            <span>{item.name}</span>
                            <span className="text-xs opacity-60">BUKA</span>
                          </span>
                        )}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
