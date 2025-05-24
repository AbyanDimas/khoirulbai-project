'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Clock, 
  Bookmark, 
  Share2, 
  MoreHorizontal,
  Search,
  Menu,
  ChevronDown,
  Newspaper,
  TrendingUp,
  Star,
  MapPin,
  Film,
  Music,
  BookOpen
} from 'lucide-react'

type BeritaItem = {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  image: string
  isTrending?: boolean
  isFeatured?: boolean
}

const categories = [
  { name: 'Semua', icon: <Newspaper size={16} /> },
  { name: 'Trending', icon: <TrendingUp size={16} /> },
  { name: 'Favorit', icon: <Star size={16} /> },
  { name: 'Lokal', icon: <MapPin size={16} /> },
  { name: 'Video', icon: <Film size={16} /> },
  { name: 'Audio', icon: <Music size={16} /> },
  { name: 'Artikel', icon: <BookOpen size={16} /> }
]

const Berita = () => {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [berita, setBerita] = useState<BeritaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Simulate API fetch
    const fetchBerita = async () => {
      setLoading(true)
      // Mock data - in a real app, you would fetch from an API
      const mockBerita: BeritaItem[] = [
        {
          id: '1',
          title: 'Masjid Baitul Makmur Gelar Pengajian Bulanan dengan Tema Keikhlasan',
          excerpt: 'Pengajian bulanan kali ini menghadirkan Ustadz Ahmad sebagai pembicara utama dengan pembahasan tentang keikhlasan dalam beribadah.',
          category: 'Artikel',
          date: '2 jam yang lalu',
          image: '/masjid-event.jpg',
          isTrending: true
        },
        {
          id: '2',
          title: 'Jadwal Sholat Jumat Pekan Ini di Masjid Baitul Makmur',
          excerpt: 'Berikut jadwal lengkap sholat Jumat beserta nama khatib dan pembicara untuk pekan ini di Masjid Baitul Makmur.',
          category: 'Lokal',
          date: '1 hari yang lalu',
          image: '/jumat-prayer.jpg',
          isFeatured: true
        },
        {
          id: '3',
          title: 'Video: Dokumentasi Kegiatan Ramadhan 1445H Masjid Baitul Makmur',
          excerpt: 'Simak rangkuman kegiatan Ramadhan tahun ini di Masjid Baitul Makmur dalam video dokumentasi khusus.',
          category: 'Video',
          date: '3 hari yang lalu',
          image: '/ramadhan-activities.jpg'
        },
        {
          id: '4',
          title: 'Rekaman Audio Tausiyah: "Menjaga Ukhuwah di Era Digital"',
          excerpt: 'Dengarkan kembali tausiyah Ustadz Muhammad tentang menjaga persaudaraan di era digital yang disampaikan pekan lalu.',
          category: 'Audio',
          date: '5 hari yang lalu',
          image: '/tausiyah.jpg'
        },
        {
          id: '5',
          title: 'Pengumuman Pembangunan Area Parkir Baru Masjid Baitul Makmur',
          excerpt: 'Pengurus masjid mengumumkan rencana pembangunan area parkir baru untuk menampung kendaraan jamaah yang semakin banyak.',
          category: 'Lokal',
          date: '1 minggu yang lalu',
          image: '/parking-area.jpg',
          isTrending: true
        },
        {
          id: '6',
          title: 'Artikel Khusus: Sejarah Berdirinya Masjid Baitul Makmur',
          excerpt: 'Bagaimana awal mula berdirinya Masjid Baitul Makmur? Simak sejarah lengkapnya dalam artikel khusus ini.',
          category: 'Artikel',
          date: '2 minggu yang lalu',
          image: '/masjid-history.jpg'
        }
      ]
      
      setTimeout(() => {
        setBerita(mockBerita)
        setLoading(false)
      }, 800)
    }

    fetchBerita()
  }, [])

  const filteredBerita = activeCategory === 'Semua' 
    ? berita 
    : activeCategory === 'Trending'
      ? berita.filter(item => item.isTrending)
      : activeCategory === 'Favorit'
        ? berita.filter(item => item.isFeatured)
        : berita.filter(item => item.category === activeCategory)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Menu size={20} />
              </button>
              <h1 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 flex items-center">
                <Newspaper size={24} className="mr-2" />
                Berita Masjid
              </h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Category Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="px-4 py-2 grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => {
                    setActiveCategory(category.name)
                    setMobileMenuOpen(false)
                  }}
                  className={`flex items-center justify-center px-3 py-2 rounded-lg text-sm ${
                    activeCategory === category.name
                      ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Desktop Category Tabs */}
        <div className="hidden md:flex items-center space-x-2 overflow-x-auto pb-4 mb-6">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`flex items-center px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                activeCategory === category.name
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Featured News (Desktop) */}
        {activeCategory === 'Semua' && (
          <div className="hidden md:block mb-8">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Sorotan Utama</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {berita.filter(item => item.isFeatured).map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative h-48">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10" />
                    <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse" />
                    <div className="absolute bottom-4 left-4 z-20">
                      <span className="bg-emerald-600 text-white text-xs px-2 py-1 rounded">
                        {item.category}
                      </span>
                      <h3 className="text-white text-xl font-bold mt-2">{item.title}</h3>
                      <div className="flex items-center text-white/80 text-sm mt-1">
                        <Clock size={14} className="mr-1" />
                        {item.date}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-700 dark:text-gray-300">{item.excerpt}</p>
                    <div className="flex justify-between items-center mt-4">
                      <Link 
                        href={`/berita/${item.id}`}
                        className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm font-medium"
                      >
                        Baca selengkapnya
                      </Link>
                      <div className="flex space-x-2">
                        <button className="p-1 text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400">
                          <Bookmark size={18} />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400">
                          <Share2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Trending Section */}
        {(activeCategory === 'Semua' || activeCategory === 'Trending') && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 dark:text-white flex items-center">
              <TrendingUp size={20} className="mr-2 text-emerald-600 dark:text-emerald-400" />
              {activeCategory === 'Semua' ? 'Trending Sekarang' : 'Berita Trending'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {berita.filter(item => item.isTrending).map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-300"
                >
                  <div className="relative h-40">
                    <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse" />
                    <div className="absolute top-2 right-2 z-10">
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                        <TrendingUp size={12} className="mr-1" />
                        Trending
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      {item.category}
                    </span>
                    <h3 className="font-bold mt-1 dark:text-white">{item.title}</h3>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs mt-2">
                      <Clock size={12} className="mr-1" />
                      {item.date}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* News Grid */}
        <div>
          <h2 className="text-xl font-bold mb-4 dark:text-white">
            {activeCategory === 'Semua' ? 'Berita Terbaru' : `Berita ${activeCategory}`}
          </h2>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-300"
                >
                  <div className="h-40 bg-gray-200 dark:bg-gray-700 animate-pulse" />
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2 w-1/3" />
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2 w-full" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2 w-full" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2 w-2/3" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/4 mt-4" />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredBerita.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="relative h-40">
                      <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700" />
                      <div className="absolute top-2 left-2 z-10">
                        <span className="bg-emerald-600 text-white text-xs px-2 py-1 rounded">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold dark:text-white">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-2">
                        {item.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                          <Clock size={12} className="mr-1" />
                          {item.date}
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-1 text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400">
                            <Bookmark size={16} />
                          </button>
                          <button className="p-1 text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400">
                            <Share2 size={16} />
                          </button>
                          <button className="p-1 text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400">
                            <MoreHorizontal size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {!loading && (
          <div className="mt-8 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-emerald-600 dark:text-emerald-400 font-medium flex items-center"
            >
              Muat Lebih Banyak
              <ChevronDown size={16} className="ml-2" />
            </motion.button>
          </div>
        )}
      </main>
    </div>
  )
}

export default Berita