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
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Copy,
  Check,
  ArrowLeft,
  BookText
} from 'lucide-react'
import Image from 'next/image'
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
  EmailIcon
} from 'react-share'

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

const ITEMS_PER_PAGE = 21;

const GoogleLikeLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-sm max-w-md mx-auto">
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute inset-0 rounded-full bg-emerald-100 dark:bg-emerald-900/30 animate-ping"></div>
        <div className="absolute inset-2 rounded-full bg-emerald-200 dark:bg-emerald-800/50 animate-pulse"></div>
        <Newspaper className="absolute inset-4 w-12 h-12 text-emerald-600 dark:text-emerald-400 animate-bounce" />
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
        <div className="bg-emerald-600 h-2.5 rounded-full animate-progress" style={{ width: '70%' }}></div>
      </div>
      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Memuat Berita</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm">Sedang mengambil informasi terbaru...</p>
    </div>
  );
};

const GoogleLikeError = ({ error, onRetry }: { error: string, onRetry: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-sm max-w-md mx-auto">
      <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-6">
        <div className="relative">
          <X className="w-12 h-12 text-red-600 dark:text-red-400" />
          <div className="absolute inset-0 rounded-full bg-red-200 dark:bg-red-800/30 animate-ping opacity-75"></div>
        </div>
      </div>
      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Gagal Memuat Berita</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 text-center">{error}</p>
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors flex items-center shadow-sm"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Coba Lagi
      </button>
    </div>
  );
};

const Berita = () => {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [berita, setBerita] = useState<BeritaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showShareMenu, setShowShareMenu] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchBerita = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs?populate=*`)
        if (!response.ok) {
          throw new Error('Gagal memuat berita. Silakan coba lagi nanti.')
        }
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
            category: item.attributes.category || 'Berita',
            createdAt: new Date(item.attributes.createdAt).toLocaleDateString('id-ID'),
            slug: item.attributes.slug,
            image: imageUrl,
            isTrending: Math.random() > 0.7,
            isFeatured: Math.random() > 0.8
          }
        })
        
        setBerita(formattedBerita)
        setTotalPages(Math.ceil(formattedBerita.length / ITEMS_PER_PAGE))
      } catch (error) {
        console.error('Error fetching news:', error)
        setError(error instanceof Error ? error.message : 'Terjadi kesalahan tidak diketahui')
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

  const paginatedBerita = searchedBerita.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleShareMenu = (id: string) => {
    setShowShareMenu(showShareMenu === id ? null : id)
    setCopied(false)
  }

  const getShareUrl = (slug: string) => {
    return `${window.location.origin}/berita/${slug}`
  }

  const copyToClipboard = (slug: string) => {
    navigator.clipboard.writeText(getShareUrl(slug))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const renderPagination = () => {
    if (searchedBerita.length <= ITEMS_PER_PAGE) return null

    const pages = []
    const maxVisiblePages = 5
    let startPage = 1
    let endPage = totalPages

    if (totalPages > maxVisiblePages) {
      const half = Math.floor(maxVisiblePages / 2)
      if (currentPage <= half + 1) {
        endPage = maxVisiblePages
      } else if (currentPage >= totalPages - half) {
        startPage = totalPages - maxVisiblePages + 1
      } else {
        startPage = currentPage - half
        endPage = currentPage + half
      }
    }

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`px-3 py-1 rounded ${1 === currentPage ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
        >
          1
        </button>
      )
      if (startPage > 2) {
        pages.push(<span key="start-ellipsis" className="px-2">...</span>)
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded ${i === currentPage ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
        >
          {i}
        </button>
      )
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="end-ellipsis" className="px-2">...</span>)
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`px-3 py-1 rounded ${totalPages === currentPage ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
        >
          {totalPages}
        </button>
      )
    }

    return (
      <div className="flex items-center justify-center mt-8 space-x-2">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="p-1 rounded disabled:opacity-50 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ChevronsLeft size={16} />
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1 rounded disabled:opacity-50 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ChevronLeft size={16} />
        </button>
        
        {pages}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1 rounded disabled:opacity-50 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ChevronRight size={16} />
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-1 rounded disabled:opacity-50 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ChevronsRight size={16} />
        </button>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <section className="relative bg-emerald-700 text-white py-12 md:py-16 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/masjid-pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 relative">
            <Link 
              href="/" 
              className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="mr-2 h-5 w-5" /> Kembali ke Beranda
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center">
                <BookText className="mr-3 h-8 w-8" />
                Berita & Artikel
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Informasi terbaru seputar kegiatan Masjid Khoirul Ba'i STM ADB
              </p>
            </motion.div>
          </div>
        </section>
        <section className="container mx-auto px-4 py-12">
          <GoogleLikeError error={error} onRetry={() => window.location.reload()} />
        </section>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <section className="relative bg-emerald-700 text-white py-12 md:py-16 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/masjid-pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 relative">
            <Link 
              href="/" 
              className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="mr-2 h-5 w-5" /> Kembali ke Beranda
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center">
                <BookText className="mr-3 h-8 w-8" />
                Berita & Artikel
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Informasi terbaru seputar kegiatan Masjid Khoirul Ba'i STM ADB
              </p>
            </motion.div>
          </div>
        </section>
        <section className="container mx-auto px-4 py-12">
          <GoogleLikeLoading />
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <section className="relative bg-emerald-700 text-white py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/masjid-pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <Link 
            href="/" 
            className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" /> Kembali ke Beranda
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center">
              <BookText className="mr-3 h-8 w-8" />
              Berita & Artikel
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Informasi terbaru seputar kegiatan Masjid Khoirul Ba'i STM ADB
            </p>
          </motion.div>
        </div>
      </section>

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
                    setCurrentPage(1)
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
              onClick={() => {
                setActiveCategory(category.name)
                setCurrentPage(1)
              }}
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
                      <div className="flex justify-end mt-2">
                        <div className="relative">
                          <button
                            className="px-3 py-1.5 bg-emerald-500 rounded-full shadow-sm flex items-center space-x-1.5 text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transition-all duration-200"
                            onClick={() => toggleShareMenu(item.id)}
                          >
                            <Share2 size={15} />
                            <span className="text-sm font-medium">Bagikan</span>
                          </button>
                        </div>
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
                    <div className="flex justify-end mt-2">
                      <div className="relative">
                        <button
                          className="px-3 py-1.5 bg-emerald-500 rounded-full shadow-sm flex items-center space-x-1.5 text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transition-all duration-200"
                          onClick={() => toggleShareMenu(item.id)}
                        >
                          <Share2 size={15} />
                          <span className="text-sm font-medium">Bagikan</span>
                        </button>
                      </div>
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
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {paginatedBerita.map((item, index) => (
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
                          <div className="flex justify-end mt-2">
                            <div className="relative">
                              <button
                                className="px-3 py-1.5 bg-emerald-500 rounded-full shadow-sm flex items-center space-x-1.5 text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transition-all duration-200"
                                onClick={() => toggleShareMenu(item.id)}
                              >
                                <Share2 size={15} />
                                <span className="text-sm font-medium">Bagikan</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {renderPagination()}
            </>
          )}
        </div>
      </main>

      {/* Share Overlay */}
      <AnimatePresence>
        {showShareMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowShareMenu(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold dark:text-white">Bagikan</h3>
                <button 
                  onClick={() => setShowShareMenu(null)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {berita.filter(item => item.id === showShareMenu).map(item => (
                <div key={item.id}>
                  <div className="flex items-center space-x-4 mb-6">
                    {item.image ? (
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <ImageIcon size={24} className="text-gray-400" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-medium dark:text-white line-clamp-2">{item.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                      <div className="flex-1 truncate text-sm dark:text-gray-200">
                        {getShareUrl(item.slug)}
                      </div>
                      <button 
                        onClick={() => copyToClipboard(item.slug)}
                        className="ml-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                        title="Salin link"
                      >
                        {copied ? (
                          <Check size={18} className="text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <Copy size={18} className="text-gray-500 dark:text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-4">
                    <FacebookShareButton 
                      url={getShareUrl(item.slug)} 
                      quote={item.title}
                      className="flex flex-col items-center"
                    >
                      <FacebookIcon size={48} round />
                      <span className="text-xs mt-2 dark:text-gray-300">Facebook</span>
                    </FacebookShareButton>
                    
                    <TwitterShareButton 
                      url={getShareUrl(item.slug)} 
                      title={item.title}
                      className="flex flex-col items-center"
                    >
                      <TwitterIcon size={48} round />
                      <span className="text-xs mt-2 dark:text-gray-300">Twitter</span>
                    </TwitterShareButton>
                    
                    <WhatsappShareButton 
                      url={getShareUrl(item.slug)} 
                      title={item.title}
                      className="flex flex-col items-center"
                    >
                      <WhatsappIcon size={48} round />
                      <span className="text-xs mt-2 dark:text-gray-300">WhatsApp</span>
                    </WhatsappShareButton>
                    
                    <TelegramShareButton 
                      url={getShareUrl(item.slug)} 
                      title={item.title}
                      className="flex flex-col items-center"
                    >
                      <TelegramIcon size={48} round />
                      <span className="text-xs mt-2 dark:text-gray-300">Telegram</span>
                    </TelegramShareButton>
                    
                    <EmailShareButton 
                      url={getShareUrl(item.slug)} 
                      subject={item.title}
                      body={`Lihat berita ini: ${item.title}`}
                      className="flex flex-col items-center"
                    >
                      <EmailIcon size={48} round />
                      <span className="text-xs mt-2 dark:text-gray-300">Email</span>
                    </EmailShareButton>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Berita