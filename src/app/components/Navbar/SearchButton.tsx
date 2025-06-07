import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface SearchButtonProps {
  searchOpen: boolean
  setSearchOpen: (open: boolean) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const SearchButton = ({ 
  searchOpen, 
  setSearchOpen, 
  searchQuery, 
  setSearchQuery
}: SearchButtonProps) => {
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setSearchOpen(false)
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="relative">
      <motion.button
        onClick={() => setSearchOpen(!searchOpen)}
        className="flex items-center px-3 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
        aria-label="Search"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          className="flex items-center"
          animate={{
            rotate: searchOpen ? 90 : 0
          }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Search className="h-4 w-4 mr-2" />
        </motion.span>
        <motion.span 
          className="text-sm"
          initial={{ opacity: 1 }}
          animate={{ opacity: searchOpen ? 0 : 1 }}
          transition={{ duration: 0.1 }}
        >
          Pencarian
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ 
              type: 'spring',
              damping: 20,
              stiffness: 300
            }}
            className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
          >
            <form onSubmit={handleSearch} className="p-3 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <motion.div
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  animate={{ 
                    x: searchQuery ? -5 : 0,
                    scale: searchQuery ? 0.9 : 1
                  }}
                  transition={{ type: 'spring' }}
                >
                  <Search className="h-4 w-4 text-gray-400" />
                </motion.div>
                <input
                  type="text"
                  placeholder="Cari sesuatu..."
                  className="w-full pl-10 pr-8 py-2 rounded-lg text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-gray-600 border border-gray-200 dark:border-gray-600"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <AnimatePresence>
                  {searchQuery && (
                    <motion.button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ type: 'spring' }}
                    >
                      <X className="h-4 w-4" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </form>
            <motion.div 
              className="p-3 border-t border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Tekan Enter untuk mencari di halaman pencarian.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchButton