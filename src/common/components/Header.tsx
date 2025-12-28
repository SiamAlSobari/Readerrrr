import { Bookmark, Search } from 'lucide-react'

export default function Header() {
  return (
      <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-xl border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold bg-linear-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                MANGA<span className="text-white">READER</span>
              </h1>
              
              <nav className="hidden md:flex items-center gap-6">
                <a href="#" className="text-white font-semibold hover:text-red-400 transition-colors">Home</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Library</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Genres</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Latest</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Popular</a>
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="search" 
                  placeholder="Search manga..." 
                  className="pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-xl w-64 focus:outline-none focus:border-red-500"
                />
              </div>
              <button className="p-2 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>
  )
}
