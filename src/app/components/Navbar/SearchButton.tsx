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
    </div>
  )
}

export default SearchButton