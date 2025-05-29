import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Apple, CalendarDays, Clock4, Newspaper } from 'lucide-react'
import Link from 'next/link'

interface SearchButtonProps {
  searchOpen: boolean
  setSearchOpen: (open: boolean) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  handleSearch: (e: React.FormEvent) => void
}

const SearchButton = ({ 
  searchOpen, 
  setSearchOpen, 
  searchQuery, 
  setSearchQuery, 
  handleSearch 
}: SearchButtonProps) => {
  const suggestedLinks = [
    { name: 'Apple', icon: Apple, href: '/search?q=apple' },
    { name: 'Agenda', icon: CalendarDays, href: '/agenda' },
    { name: 'Jadwal Sholat', icon: Clock4, href: '/jadwal-sholat' },
    { name: 'Berita Terbaru', icon: Newspaper, href: '/berita' }
  ]

  return (
    <div className="relative">
      <button
        onClick={() => setSearchOpen(!searchOpen)}
        className="flex items-center px-3 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
        aria-label="Search"
      >
        <Search className="h-4 w-4 mr-2" />
        <span className="text-sm">Pencarian</span>
      </button>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
          >
            <form onSubmit={handleSearch} className="p-3 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari sesuatu..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-gray-600 border border-gray-200 dark:border-gray-600"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </form>

            <div className="p-2">
              <h3 className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400">SUGGESTIONS</h3>
              <ul>
                {suggestedLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                      onClick={() => setSearchOpen(false)}
                    >
                      <link.icon className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Tekan Enter untuk mencari atau klik salah satu saran di atas.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchButton