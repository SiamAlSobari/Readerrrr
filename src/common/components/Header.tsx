import {  Search, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/common/shadcn-ui/sheet"
import { Button } from "@/common/shadcn-ui/button"
import { Input } from "@/common/shadcn-ui/input"
import { Link } from "@tanstack/react-router"

export default function Header() {
  const NAV_ITEMS = [
    { name: "Home", href: "/" },
    { name: "Popular", href: "/popular" },
    { name: "Genre", href: "/genre" },
    {name: "Update", href: "/update"},
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <div className=" px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">

          {/* LEFT: Logo + Desktop Nav */}
          <div className="flex items-center gap-8">
            {/* LOGO */}
            <Link to="/" className="text-xl font-extrabold tracking-wide">
              <span className="bg-linear-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                MANGA
              </span>
              <span className="text-white">READER</span>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map(item => (
                <Link key={item.name} to={item.href}>
                  {({ isActive }) => (
                    <span
                      className={`relative text-sm font-medium transition-colors
                      ${isActive ? "text-white" : "text-gray-400 hover:text-white"}
                      after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full
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

          {/* RIGHT: Search + Bookmark + Mobile Menu */}
          <div className="flex items-center gap-3">

            {/* SEARCH DESKTOP */}
            <div className="relative hidden md:block">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search manga..."
                className="h-10 w-64 rounded-full bg-white/5 pl-11 pr-5 text-sm
                border-white/10 focus-visible:ring-red-500 focus-visible:ring-2"
              />
            </div>


            {/* MOBILE MENU */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="md:hidden rounded-full text-gray-300 hover:bg-white/10"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="bg-black/90 backdrop-blur-xl border-white/10 pt-12">
                <div className="space-y-8">

                  {/* SEARCH MOBILE */}
                  <div className="relative px-4">
                    <Search className="absolute left-8 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search manga..."
                      className="h-11 rounded-full bg-white/5 pl-12 pr-5
                      border-white/10 focus-visible:ring-red-500 focus-visible:ring-2"
                    />
                  </div>

                  {/* NAV MOBILE */}
                  <nav className="flex flex-col gap-2 px-4">
                    {NAV_ITEMS.map(item => (
                      <Link key={item.name} to={item.href}>
                        {({ isActive }) => (
                          <span
                            className={`block py-3 text-lg font-medium transition-colors
                            ${isActive ? "text-white" : "text-gray-300 hover:text-white"}
                            ${isActive ? "border-l-4 border-red-500 pl-4" : "pl-5"}`}
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
  )
}