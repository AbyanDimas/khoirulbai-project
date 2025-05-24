'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  PlayCircle,
  Headphones,
  BookOpen,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Heart,
  Share2,
  Download,
  Clock,
  CalendarDays,
  User,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

type Tausiyah = {
  id: string
  title: string
  speaker: string
  date: string
  duration: string
  type: 'video' | 'audio' | 'article'
  category: string
  views: string
  liked: boolean
  excerpt: string
}

const TausiyahPage = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState('newest')

  // Mock data - replace with API call
  const tausiyahData: Tausiyah[] = [
    {
      id: '1',
      title: 'Keutamaan Sholat Berjamaah di Masjid',
      speaker: 'Ust. Ahmad Farid',
      date: '14 Juni 2024',
      duration: '15:30',
      type: 'video',
      category: 'Fiqih',
      views: '1.2K',
      liked: true,
      excerpt: 'Penjelasan tentang fadhilah dan keutamaan sholat berjamaah di masjid bagi laki-laki muslim.'
    },
    {
      id: '2',
      title: 'Tafsir Surat Al-Kahfi Ayat 1-10',
      speaker: 'Ust. Abdullah Haidar',
      date: '12 Juni 2024',
      duration: '45:12',
      type: 'audio',
      category: 'Tafsir',
      views: '845',
      liked: false,
      excerpt: 'Kajian tafsir surat Al-Kahfi ayat 1-10 yang membahas tentang pemuda Ashabul Kahfi.'
    },
    {
      id: '3',
      title: 'Memakmurkan Masjid di Era Digital',
      speaker: 'Ust. Muhammad Ali',
      date: '10 Juni 2024',
      duration: '8 min read',
      type: 'article',
      category: 'Dakwah',
      views: '1.5K',
      liked: false,
      excerpt: 'Bagaimana peran pemuda dalam memakmurkan masjid di era digital saat ini.'
    },
    {
      id: '4',
      title: 'Hikmah Dibalik Musibah',
      speaker: 'Ust. Abdul Somad',
      date: '8 Juni 2024',
      duration: '22:45',
      type: 'video',
      category: 'Akidah',
      views: '2.3K',
      liked: true,
      excerpt: 'Penjelasan tentang hikmah-hikmah dibalik musibah yang menimpa seorang muslim.'
    },
    {
      id: '5',
      title: 'Panduan Praktis Zakat Fitrah',
      speaker: 'Ust. Adi Hidayat',
      date: '5 Juni 2024',
      duration: '12 min read',
      type: 'article',
      category: 'Fiqih',
      views: '3.1K',
      liked: false,
      excerpt: 'Panduan lengkap tentang tata cara menghitung dan menyalurkan zakat fitrah.'
    },
    {
      id: '6',
      title: 'Kiat-Kiat Menghafal Al-Quran',
      speaker: 'Ust. Hanan Attaki',
      date: '3 Juni 2024',
      duration: '38:20',
      type: 'audio',
      category: 'Tahfiz',
      views: '1.7K',
      liked: true,
      excerpt: 'Metode dan kiat-kiat praktis untuk memudahkan menghafal Al-Quran.'
    }
  ]

  // Filter and sort tausiyah
  const filteredTausiyah = tausiyahData
    .filter(tausiyah => {
      const matchesFilter = activeFilter === 'all' || tausiyah.type === activeFilter || tausiyah.category.toLowerCase() === activeFilter.toLowerCase()
      const matchesSearch = tausiyah.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           tausiyah.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tausiyah.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesFilter && matchesSearch
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (sortBy === 'popular') {
        return parseInt(b.views.replace('K', '000')) - parseInt(a.views.replace('K', '000'))
      }
      return 0
    })

  const categories = [...new Set(tausiyahData.map(item => item.category))]
  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="min-h-screen pt-10 bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-emerald-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Kumpulan Tausiyah</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Koleksi video, audio, dan artikel kajian Islami dari berbagai ustadz
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="container pt-20 mx-auto px-4 py-8 -mt-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="relative flex-grow max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari tausiyah..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <button className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
                  <Filter className="h-4 w-4 mr-2" />
                  {sortBy === 'newest' ? 'Terbaru' : 'Terpopuler'}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </button>
                <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 border border-gray-200 dark:border-gray-700">
                  <button 
                    onClick={() => setSortBy('newest')}
                    className={`w-full text-left px-4 py-2 text-sm ${sortBy === 'newest' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  >
                    Terbaru
                  </button>
                  <button 
                    onClick={() => setSortBy('popular')}
                    className={`w-full text-left px-4 py-2 text-sm ${sortBy === 'popular' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  >
                    Terpopuler
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full text-sm ${activeFilter === 'all' ? 'bg-emerald-600 text-white' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
            >
              Semua
            </button>
            <button
              onClick={() => setActiveFilter('video')}
              className={`px-4 py-2 rounded-full text-sm flex items-center ${activeFilter === 'video' ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
            >
              <PlayCircle className="h-4 w-4 mr-1" />
              Video
            </button>
            <button
              onClick={() => setActiveFilter('audio')}
              className={`px-4 py-2 rounded-full text-sm flex items-center ${activeFilter === 'audio' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
            >
              <Headphones className="h-4 w-4 mr-1" />
              Audio
            </button>
            <button
              onClick={() => setActiveFilter('article')}
              className={`px-4 py-2 rounded-full text-sm flex items-center ${activeFilter === 'article' ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
            >
              <BookOpen className="h-4 w-4 mr-1" />
              Artikel
            </button>
            
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full text-sm ${activeFilter === category ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {filteredTausiyah.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <Search className="text-gray-400" size={40} />
            </div>
            <h3 className="text-lg font-medium dark:text-white">Tidak ada tausiyah yang ditemukan</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Coba gunakan kata kunci lain atau filter berbeda</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTausiyah.map(tausiyah => (
              <motion.div
                key={tausiyah.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gray-300 dark:bg-gray-700">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {tausiyah.type === 'video' ? (
                      <>
                        <PlayCircle className="h-12 w-12 text-white/80 hover:text-white transition-colors" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                            VIDEO
                          </span>
                          <span className="text-white text-xs ml-2">
                            {tausiyah.duration}
                          </span>
                        </div>
                      </>
                    ) : tausiyah.type === 'audio' ? (
                      <>
                        <Headphones className="h-12 w-12 text-white/80 hover:text-white transition-colors" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                            AUDIO
                          </span>
                          <span className="text-white text-xs ml-2">
                            {tausiyah.duration}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <BookOpen className="h-12 w-12 text-white/80 hover:text-white transition-colors" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                          <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded">
                            ARTIKEL
                          </span>
                          <span className="text-white text-xs ml-2">
                            {tausiyah.duration}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      tausiyah.type === 'video' ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400' :
                      tausiyah.type === 'audio' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' :
                      'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                    }`}>
                      {tausiyah.category}
                    </span>
                    <button 
                      className={`p-1 ${tausiyah.liked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                    >
                      <Heart 
                        size={18} 
                        fill={tausiyah.liked ? 'currentColor' : 'none'} 
                      />
                    </button>
                  </div>

                  <h3 className="font-bold text-lg mb-2 dark:text-white">{tausiyah.title}</h3>
                  
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <User className="h-4 w-4 mr-1" />
                    {tausiyah.speaker}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      {tausiyah.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {tausiyah.views} views
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedId === tausiyah.id ? (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-gray-600 dark:text-gray-300 text-sm mb-4"
                      >
                        {tausiyah.excerpt}
                      </motion.p>
                    ) : (
                      <motion.p
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2"
                      >
                        {tausiyah.excerpt}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
                    <button 
                      onClick={() => toggleExpand(tausiyah.id)}
                      className="text-emerald-600 dark:text-emerald-400 text-sm hover:underline flex items-center"
                    >
                      {expandedId === tausiyah.id ? (
                        <>
                          Lebih Sedikit <ChevronUp className="h-4 w-4 ml-1" />
                        </>
                      ) : (
                        <>
                          Selengkapnya <ChevronDown className="h-4 w-4 ml-1" />
                        </>
                      )}
                    </button>

                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 p-1">
                        <Share2 size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 p-1">
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-100 dark:border-gray-600">
                  <Link 
                    href={`/tausyiah/${tausiyah.id}`}
                    className="w-full flex items-center justify-center py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Buka {tausiyah.type === 'video' ? 'Video' : tausiyah.type === 'audio' ? 'Audio' : 'Artikel'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredTausiyah.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Previous
              </button>
              <button className="px-3 py-1 rounded-lg bg-emerald-600 text-white">1</button>
              <button className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                2
              </button>
              <button className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                3
              </button>
              <button className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TausiyahPage