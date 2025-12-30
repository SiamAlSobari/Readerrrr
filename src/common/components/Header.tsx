import { Bookmark, Search, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/common/shadcn-ui/sheet"
import { Button } from "@/common/shadcn-ui/button"
import { Input } from "@/common/shadcn-ui/input"
import { Link } from "@tanstack/react-router"


export default function Header() {
  const NAV_ITEMS = [{
    name: "Home",
    href: "/",
  },
  {
    name: "Popular",
    href: "/popular",
  }
  ]
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-8">
            {/* LOGO */}
            <h1 className="text-xl font-extrabold tracking-wide">
              <span className="bg-linear-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                MANGA
              </span>
              <span className="text-white">READER</span>
            </h1>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-6">
              {NAV_ITEMS.map(item => (
                <Link to={item.href} >
                  {({ isActive }) => (
                    <span
                      className={`relative text-sm font-medium text-gray-400 transition hover:text-white
                      after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0
                      after:bg-red-500 after:transition-all hover:after:w-full
                      ${isActive ? "after:w-full" : ""}`}
                    >
                      {item.name}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">

            {/* SEARCH DESKTOP */}
            <div className="relative hidden md:block">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search manga..."
                className="h-10 w-64 rounded-full bg-white/5 pl-11 text-sm
                border-white/10 focus-visible:ring-red-500"
              />
            </div>

            {/* BOOKMARK */}
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <Bookmark className="h-5 w-5" />
            </Button>

            {/* MOBILE MENU */}
            <Sheet >
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="md:hidden rounded-full text-gray-300 hover:bg-white/10"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="left"
                className="bg-black/80 border-white/10 pt-14">
                <div className="mt-6 space-y-6">

                  {/* SEARCH MOBILE */}
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search manga..."
                      className="h-11 rounded-full bg-white/5 pl-11
                      border-white/10 focus-visible:ring-red-500"
                    />
                  </div>

                  {/* NAV MOBILE */}
                  <nav className="flex flex-col gap-3">

                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
