import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, CalendarDays, Clock4, Newspaper, BookOpenText, Mic2, FileText, Images, Clock, Megaphone, Home,   Book,
  Mail,
  AlertCircle,
  Users,
  HeartHandshake,
  ScrollText,
  BookOpen,
  DollarSign,
  Info,
  Image
 } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { distance } from 'fastest-levenshtein'

interface Suggestion {
  name: string
  icon: React.ComponentType<{ className?: string }>
  href: string
}

const allSuggestions: Suggestion[] = [
  { name: 'Beranda', icon: Home, href: '/' },
  { name: 'Agenda Masjid', icon: CalendarDays, href: '/agenda' },
  { name: 'Al-Quran Digital', icon: Book, href: '/alquran' },
  { name: 'Berita Terbaru', icon: Newspaper, href: '/berita' },
  { name: 'Galeri Foto', icon: Images, href: '/galeri' },
  { name: 'Jadwal Sholat Harian', icon: Clock4, href: '/jadwal-sholat' },
  { name: 'Jadwal Sholat Jumat', icon: BookOpenText, href: '/jadwal/jumat' },
  { name: 'Kultum & Pengajian', icon: Mic2, href: '/jadwal/kultum-pengajian' },
  { name: 'Laporan Keuangan', icon: FileText, href: '/laporan/keuangan' },
  { name: 'Laporan Wakaf', icon: DollarSign, href: '/laporan/waqaf' },
  { name: 'Pengumuman', icon: AlertCircle, href: '/pengumuman' },
  { name: 'Profil Masjid', icon: Users, href: '/profil' },
  { name: 'Program Kerja', icon: FileText, href: '/program-kerja' },
  { name: 'Tausiyah Islami', icon: Megaphone, href: '/tausiyah' },
  { name: 'Tentang Kami', icon: Info, href: '/tentang-kami' },
  { name: 'Zakat & Infaq', icon: HeartHandshake, href: '/zakat-infaq' },
  { name: 'Kontak Pengurus', icon: Mail, href: '/kontak' },
  { name: 'Donasi Masjid', icon: HeartHandshake, href: '/donasi' },
  { name: 'Masuk Akun', icon: ScrollText, href: '/sign-in' },
  { name: 'Daftar Akun', icon: ScrollText, href: '/sign-up' }
];

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
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [typoSuggestions, setTypoSuggestions] = useState<Suggestion[]>([])
  const popularSearches = allSuggestions.slice(0, 6)

  useEffect(() => {
    if (searchQuery.length > 0) {
      // Exact matches
      const exactMatches = allSuggestions.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      
      // Typo-tolerant matches
      const typoMatches = allSuggestions
        .filter(item => !exactMatches.includes(item))
        .map(item => ({
          item,
          distance: distance(searchQuery.toLowerCase(), item.name.toLowerCase())
        }))
        .filter(({ distance }) => distance <= 3) // Max 3 character differences
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3) // Show top 3 closest matches
        .map(({ item }) => item)

      setSuggestions(exactMatches)
      setTypoSuggestions(typoMatches)
    } else {
      setSuggestions([])
      setTypoSuggestions([])
    }
  }, [searchQuery])

  return (
    <AnimatePresence>
      {searchOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={() => setSearchOpen(false)}
          />
          
          {/* Search Content */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-20 z-50 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden p-4"
          >
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari sesuatu..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-base text-gray-900 dark:text-white bg-gray-100/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white/70 dark:focus:bg-gray-700 border border-gray-200 dark:border-gray-700"
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
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </form>

            {/* Exact Matches */}
            {searchQuery && suggestions.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">HASIL PENCARIAN</h3>
                <div className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <Link
                      key={`exact-${index}`}
                      href={suggestion.href}
                      className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                      onClick={() => {
                        setSearchOpen(false)
                        setSearchQuery('')
                      }}
                    >
                      <suggestion.icon className="h-4 w-4 mr-2 text-emerald-500 dark:text-emerald-400" />
                      {suggestion.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Typo Suggestions */}
            {searchQuery && typoSuggestions.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">MUNGKIN YANG ANDA MAKSUD</h3>
                <div className="space-y-2">
                  {typoSuggestions.map((suggestion, index) => (
                    <Link
                      key={`typo-${index}`}
                      href={suggestion.href}
                      className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                      onClick={() => {
                        setSearchOpen(false)
                        setSearchQuery('')
                      }}
                    >
                      <suggestion.icon className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-400" />
                      {suggestion.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Searches (shown when no query or no suggestions) */}
            {(!searchQuery || (suggestions.length === 0 && typoSuggestions.length === 0)) && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">PENCARIAN POPULER</h3>
                <div className="grid grid-cols-2 gap-2">
                  {popularSearches.map((search, index) => (
                    <Link
                      key={`popular-${index}`}
                      href={search.href}
                      className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                      onClick={() => setSearchOpen(false)}
                    >
                      <search.icon className="h-4 w-4 mr-2 text-emerald-500 dark:text-emerald-400" />
                      {search.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Search Button (shown when there's a query) */}
            {searchQuery && (
              <div className="mt-4">
                <Link
                  href={`/search?q=${encodeURIComponent(searchQuery)}`}
                  className="flex items-center justify-center px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors duration-200"
                  onClick={() => {
                    setSearchOpen(false)
                    setSearchQuery('')
                  }}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Cari "{searchQuery}"
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileSearch