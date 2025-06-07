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
  ChevronDown,
  Newspaper,
  TrendingUp,
  Star,
  MapPin,
  Film,
  Music,
  BookOpen,
  Image as ImageIcon
} from 'lucide-react'
import Image from 'next/image'

type BeritaItem = {
  id: string
  title: string
  content: string
  category: string
  createdAt: string
  image?: string
  isTrending?: boolean
  isFeatured?: boolean
  slug: string
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
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchBerita = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs?populate=*`)
        const data = await response.json()
        
        const formattedBerita = data.data.map((item: any) => {
          let imageUrl = null;
          if (item.attributes.image?.data?.attributes?.url) {
            if (item.attributes.image.data.attributes.url.startsWith('http')) {
              imageUrl = item.attributes.image.data.attributes.url;
            } else {
              imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${item.attributes.image.data.attributes.url}`;
            }
          }

          return {
            id: item.id.toString(),
            title: item.attributes.name,
            content: item.attributes.content,
            category: item.attributes.category,
            createdAt: new Date(item.attributes.createdAt).toLocaleDateString('id-ID'),
            slug: item.attributes.slug,
            image: imageUrl,
            isTrending: Math.random() > 0.7,
            isFeatured: Math.random() > 0.8
          }
        })
        
        setBerita(formattedBerita)
      } catch (error) {
        console.error('Error fetching news:', error)
      } finally {
        setLoading(false)
      }
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

  const searchedBerita = searchQuery 
    ? filteredBerita.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase()))
    : filteredBerita

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-10 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari di Berita..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

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

      <main className="container mx-auto px-4 py-6">
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
                  <Link href={`/berita/${item.slug}`}>
                    <div className="relative h-48">
                      {item.image ? (
                        <>
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = '/placeholder-image.jpg';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10" />
                        </>
                      ) : (
                        <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                          <ImageIcon size={32} className="text-gray-400" />
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4 z-20">
                        <span className="bg-emerald-600 text-white text-xs px-2 py-1 rounded">
                          {item.category}
                        </span>
                        <h3 className="text-white text-xl font-bold mt-2">{item.title}</h3>
                        <div className="flex items-center text-white/80 text-sm mt-1">
                          <Clock size={14} className="mr-1" />
                          {item.createdAt}
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="p-4">
                    <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                      {item.content.substring(0, 150)}...
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <Link 
                        href={`/berita/${item.slug}`}
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
                  <Link href={`/berita/${item.slug}`}>
                    <div className="relative h-40">
                      {item.image ? (
                        <>
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = '/placeholder-image.jpg';
                            }}
                          />
                          <div className="absolute top-2 right-2 z-10">
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                              <TrendingUp size={12} className="mr-1" />
                              Trending
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                          <ImageIcon size={32} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-4">
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      {item.category}
                    </span>
                    <Link href={`/berita/${item.slug}`}>
                      <h3 className="font-bold mt-1 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400">
                        {item.title}
                      </h3>
                    </Link>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs mt-2">
                      <Clock size={12} className="mr-1" />
                      {item.createdAt}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

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
                {searchedBerita.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-300"
                  >
                    <Link href={`/berita/${item.slug}`}>
                      <div className="relative h-40">
                        {item.image ? (
                          <>
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = '/placeholder-image.jpg';
                              }}
                            />
                            <div className="absolute top-2 left-2 z-10">
                              <span className="bg-emerald-600 text-white text-xs px-2 py-1 rounded">
                                {item.category}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                            <ImageIcon size={32} className="text-gray-400" />
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className="p-4">
                      <Link href={`/berita/${item.slug}`}>
                        <h3 className="font-bold dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-2">
                        {item.content.substring(0, 100)}...
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                          <Clock size={12} className="mr-1" />
                          {item.createdAt}
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