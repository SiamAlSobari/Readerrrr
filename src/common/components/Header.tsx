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
    { name: "Home", href: "/home" },
    { name: "Popular", href: "/popular" },
    { name: "Genre", href: "/genre" },
    { name: "Update", href: "/update" },
    { name: "History", href: "/history" },
  ];

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    navigate({ to: "/search", search: { q: query.trim() } });
    setDesktopQuery("");
    setMobileQuery("");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-black tracking-wide">
              <span className="bg-linear-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                COMIC
              </span>
              <span className="text-white">READER</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <Link key={item.name} to={item.href}>
                  {({ isActive }) => (
                    <span
                      className={`relative text-sm font-medium transition
                      ${isActive ? "text-white" : "text-gray-400 hover:text-white"}
                      after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full
                      after:origin-left after:scale-x-0 after:bg-red-500 after:transition-transform
                      ${isActive ? "after:scale-x-100" : "hover:after:scale-x-100"}`}
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
              className="relative hidden md:block group"
            >
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <Input
                ref={searchInputRef}
                value={desktopQuery}
                onChange={(e) => setDesktopQuery(e.target.value)}
                placeholder="Search manga..."
                className="
                  h-10 w-72 rounded-full pl-11 pr-20 text-sm
                  bg-white/5 border border-white/10
                  focus:border-red-500/50 focus:ring-2 focus:ring-red-500/30
                  transition
                "
              />

              {desktopQuery && (
                <button
                  type="button"
                  onClick={() => setDesktopQuery("")}
                  className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}

              <Button
                type="submit"
                size="icon"
                className="
                  absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8
                  rounded-full bg-red-500 hover:bg-red-600
                "
              >
                <Search className="h-4 w-4 text-white" />
              </Button>

              {/* Shortcut hint */}
              <span className="absolute right-20 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
                ⌘K
              </span>
            </form>

            {/* MOBILE */}
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost" className="md:hidden">
                  <Menu />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="left"
                className="bg-black/95 border-white/10 pt-10 w-80"
              >
                <div className="space-y-8">
                  {/* SEARCH MOBILE */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSearch(mobileQuery);
                    }}
                    className="relative px-4"
                  >
                    <Search className="absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <Input
                      value={mobileQuery}
                      onChange={(e) => setMobileQuery(e.target.value)}
                      placeholder="Search manga..."
                      className="
                        h-11 rounded-full pl-12 pr-12
                        bg-white/5 border-white/10
                        focus:ring-2 focus:ring-red-500/40
                      "
                    />

                    {mobileQuery && (
                      <button
                        type="button"
                        onClick={() => setMobileQuery("")}
                        className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}

                    <Button
                      type="submit"
                      size="icon"
                      className="absolute right-5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-red-500"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </form>

                  {/* NAV MOBILE */}
                  <nav className="flex flex-col px-4">
                    {NAV_ITEMS.map((item) => (
                      <Link key={item.name} to={item.href}>
                        {({ isActive }) => (
                          <span
                            className={`block py-3 text-lg font-medium transition
                            ${
                              isActive
                                ? "text-white border-l-4 border-red-500 pl-4"
                                : "text-gray-300 hover:text-white pl-5"
                            }`}
                          >
                            {item.name}
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
