import { motion } from 'framer-motion'
import { Search, X, Apple, CalendarDays, Clock4, Newspaper } from 'lucide-react'
import Link from 'next/link'

interface MobileSearchProps {
  searchOpen: boolean
  searchQuery: string
  setSearchQuery: (query: string) => void
  handleSearch: (e: React.FormEvent) => void
  setSearchOpen: (open: boolean) => void
}

const MobileSearch = ({ 
  searchOpen, 
  searchQuery, 
  setSearchQuery, 
  handleSearch,
  setSearchOpen
}: MobileSearchProps) => {
  const suggestedLinks = [
    { name: 'Apple', icon: Apple, href: '/search?q=apple' },
    { name: 'Agenda', icon: CalendarDays, href: '/agenda' },
    { name: 'Jadwal Sholat', icon: Clock4, href: '/jadwal-sholat' },
    { name: 'Berita Terbaru', icon: Newspaper, href: '/berita' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: searchOpen ? 1 : 0, height: searchOpen ? 'auto' : 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="md:hidden pb-3"
    >
      <form onSubmit={handleSearch} className="relative px-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari sesuatu..."
            className="w-full pl-10 pr-4 py-2 rounded-full text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-gray-700 border border-gray-200 dark:border-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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

      <div className="mt-2 px-3">
        <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">SUGGESTIONS</h3>
        <div className="grid grid-cols-2 gap-2">
          {suggestedLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              onClick={() => setSearchOpen(false)}
            >
              <link.icon className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default MobileSearch