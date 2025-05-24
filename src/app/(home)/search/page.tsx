'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Search,
  X,
  Clock,
  Bookmark,
  Share2,
  FileText,
  CalendarDays,
  Image as ImageIcon,
  Mic2,
  Newspaper,
  ChevronDown,
  Flame,
  History,
  Star
} from 'lucide-react'

type SearchResult = {
  id: string
  type: 'article' | 'agenda' | 'image' | 'audio' | 'news'
  title: string
  excerpt: string
  date: string
  category?: string
  url: string
}

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  // Mock search function - replace with actual API call
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setResults([])
      return
    }

    setIsSearching(true)
    
    // Simulate API delay
    setTimeout(() => {
      const mockResults: SearchResult[] = [
        // ... (previous mock data remains the same)
      ].filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.excerpt.toLowerCase().includes(query.toLowerCase())
      )

      setResults(mockResults)
      setIsSearching(false)
    }, 800)
  }

  // Popular searches and content suggestions
  const popularSearches = [
    { query: 'Jadwal Sholat Jumat', icon: <CalendarDays size={16} /> },
    { query: 'Pengajian Bulanan', icon: <Mic2 size={16} /> },
    { query: 'Galeri Ramadhan', icon: <ImageIcon size={16} /> },
    { query: 'Laporan Keuangan', icon: <FileText size={16} /> }
  ]

  const contentSuggestions = [
    {
      title: 'Panduan Sholat Jamaah',
      description: 'Tata cara dan adab sholat berjamaah di masjid',
      category: 'Artikel',
      icon: <FileText className="text-blue-500" />
    },
    {
      title: 'Kalender Kegiatan 2024',
      description: 'Jadwal lengkap kegiatan masjid sepanjang tahun',
      category: 'Agenda',
      icon: <CalendarDays className="text-green-500" />
    },
    {
      title: 'Dokumentasi TPA',
      description: 'Foto-foto kegiatan TPA Masjid Baitul Makmur',
      category: 'Galeri',
      icon: <ImageIcon className="text-purple-500" />
    },
    {
      title: 'Rekaman Khutbah Terbaru',
      description: 'Audio khutbah Jumat minggu ini',
      category: 'Audio',
      icon: <Mic2 className="text-red-500" />
    }
  ]

  // ... (previous useEffect and helper functions remain the same)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Search Header */}
      {/* ... (previous header code remains the same) */}

      {/* Search Results */}
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {isSearching ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
              >
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3 animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse"></div>
              </motion.div>
            ))}
          </div>
        ) : searchQuery && filteredResults.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="mx-auto w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <Search className="text-gray-400" size={40} />
            </div>
            <h3 className="text-lg font-medium dark:text-white">Tidak ada hasil ditemukan</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Tidak ada hasil untuk "{searchQuery}". Coba kata kunci lain.
            </p>
          </motion.div>
        ) : filteredResults.length > 0 ? (
          <div className="space-y-4">
            {/* ... (previous results display code remains the same) */}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Popular Searches Section */}
            <div>
              <h3 className="flex items-center text-lg font-medium dark:text-white mb-4">
                <Flame className="text-orange-500 mr-2" />
                Pencarian Populer
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {popularSearches.map((search, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSearchQuery(search.query)}
                    className="flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
                  >
                    <span className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full mr-3">
                      {search.icon}
                    </span>
                    <span className="text-left">
                      <p className="font-medium dark:text-white">{search.query}</p>
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Recent Activities Section */}
            <div>
              <h3 className="flex items-center text-lg font-medium dark:text-white mb-4">
                <History className="text-blue-500 mr-2" />
                Aktivitas Terkini
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <div className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-full mr-3">
                    <CalendarDays className="text-green-600 dark:text-green-400" size={18} />
                  </div>
                  <div>
                    <p className="font-medium dark:text-white">Pengajian Remaja</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">15 Juni 2024 • 19:30 WIB</p>
                  </div>
                </div>
                <div className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full mr-3">
                    <Newspaper className="text-blue-600 dark:text-blue-400" size={18} />
                  </div>
                  <div>
                    <p className="font-medium dark:text-white">Berita Pembangunan Parkir</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Progress 80% selesai</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Suggestions */}
            <div>
              <h3 className="flex items-center text-lg font-medium dark:text-white mb-4">
                <Star className="text-yellow-500 mr-2" />
                Rekomendasi Untuk Anda
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contentSuggestions.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg overflow-hidden transition-shadow"
                  >
                    <div className="p-4">
                      <div className="flex items-start">
                        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mr-4">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-bold dark:text-white">{item.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{item.description}</p>
                          <span className="inline-block mt-2 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-full">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
              <h3 className="text-lg font-medium dark:text-white mb-4">
                Masjid Baitul Makmur dalam Angka
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3">
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">24</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Kegiatan Bulan Ini</div>
                </div>
                <div className="p-3">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">1.2K</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Jamaah/Minggu</div>
                </div>
                <div className="p-3">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">56</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Galeri Foto</div>
                </div>
                <div className="p-3">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">18</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Rekaman Tausiyah</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default SearchPage