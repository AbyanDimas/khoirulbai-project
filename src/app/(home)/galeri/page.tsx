'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search,
  Grid2X2,
  List,
  Image as ImageIcon,
  Video,
  Album,
  ChevronLeft,
  ChevronRight,
  X,
  Download,
  Share2,
  Heart
} from 'lucide-react'

type GalleryItem = {
  id: string
  type: 'image' | 'video'
  title: string
  date: string
  url: string
  category: string
  liked?: boolean
  description?: string
}

const categories = [
  { name: 'Semua', icon: <Grid2X2 size={16} /> },
  { name: 'Gambar', icon: <ImageIcon size={16} /> },
  { name: 'Video', icon: <Video size={16} /> },
  { name: 'Album', icon: <Album size={16} /> }
]

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/galeris?populate=*`)
        if (!response.ok) {
          throw new Error('Failed to fetch gallery items')
        }
        const data = await response.json()
        
        const formattedItems = data.data.map((item: any) => {
          let imageUrl = '/placeholder.jpg';
          if (item.attributes.gambar?.data?.attributes?.url) {
            if (item.attributes.gambar.data.attributes.url.startsWith('http')) {
              imageUrl = item.attributes.gambar.data.attributes.url;
            } else {
              imageUrl = `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${item.attributes.gambar.data.attributes.url}`;
            }
          }

          return {
            id: item.id.toString(),
            type: item.attributes.type === 'Video' ? 'video' : 'image',
            title: item.attributes.judul,
            description: item.attributes.deskripsi,
            date: new Date(item.attributes.tanggal).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }),
            url: imageUrl,
            category: item.attributes.type,
            liked: false
          }
        })

        setGalleryItems(formattedItems)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
        console.error('Error fetching gallery items:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchGalleryItems()
  }, [])

  const filteredItems = galleryItems.filter(item => {
    const matchesCategory = activeCategory === 'Semua' || item.category === activeCategory
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const openLightbox = (item: GalleryItem) => {
    setSelectedItem(item)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setTimeout(() => setSelectedItem(null), 300)
  }

  const navigateLightbox = (direction: 'prev' | 'next') => {
    const currentIndex = filteredItems.findIndex(item => item.id === selectedItem?.id)
    let newIndex
    
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1
    } else {
      newIndex = currentIndex === filteredItems.length - 1 ? 0 : currentIndex + 1
    }
    
    setSelectedItem(filteredItems[newIndex])
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <ImageIcon className="text-gray-400" size={40} />
          </div>
          <h3 className="text-lg font-medium dark:text-white">Error loading gallery</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari di galeri..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Category Filters */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex space-x-1 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                    activeCategory === category.name
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
            
            <div className="hidden md:flex space-x-1 ml-4">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-full ${
                  viewMode === 'grid' 
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Grid2X2 size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-full ${
                  viewMode === 'list' 
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <ImageIcon className="text-gray-400" size={40} />
            </div>
            <h3 className="text-lg font-medium dark:text-white">Tidak ada item yang ditemukan</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Coba gunakan kata kunci lain atau pilih kategori berbeda</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div 
                  className="relative aspect-video bg-gray-200 dark:bg-gray-700 cursor-pointer"
                  onClick={() => openLightbox(item)}
                >
                  <img 
                    src={item.url} 
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10 hover:bg-black/20 transition-colors duration-300" />
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white ml-1"
                        >
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium dark:text-white line-clamp-2">{item.title}</h3>
                    <button 
                      className={`p-1 ${item.liked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                    >
                      <Heart 
                        size={18} 
                        fill={item.liked ? 'currentColor' : 'none'} 
                      />
                    </button>
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mt-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                    {item.category} • {item.date}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-300 flex"
              >
                <div 
                  className="w-32 h-32 flex-shrink-0 bg-gray-200 dark:bg-gray-700 cursor-pointer relative"
                  onClick={() => openLightbox(item)}
                >
                  <img 
                    src={item.url} 
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10 hover:bg-black/20 transition-colors duration-300" />
                </div>
                <div className="p-4 flex-grow">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium dark:text-white">{item.title}</h3>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mt-1">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                        {item.category} • {item.date}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-1 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400">
                        <Download size={18} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400">
                        <Share2 size={18} />
                      </button>
                      <button 
                        className={`p-1 ${item.liked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                      >
                        <Heart 
                          size={18} 
                          fill={item.liked ? 'currentColor' : 'none'} 
                        />
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <button className="text-sm px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full">
                      Lihat Detail
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button 
              className="absolute top-4 right-4 text-white hover:text-emerald-400 z-10"
              onClick={closeLightbox}
            >
              <X size={32} />
            </button>
            
            <button 
              className="absolute left-4 text-white hover:text-emerald-400 z-10 p-2"
              onClick={(e) => {
                e.stopPropagation()
                navigateLightbox('prev')
              }}
            >
              <ChevronLeft size={32} />
            </button>
            
            <button 
              className="absolute right-4 text-white hover:text-emerald-400 z-10 p-2"
              onClick={(e) => {
                e.stopPropagation()
                navigateLightbox('next')
              }}
            >
              <ChevronRight size={32} />
            </button>
            
            <div className="relative max-w-4xl w-full max-h-[90vh]">
              <motion.div
                key={selectedItem.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-black rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="aspect-video bg-gray-800 flex items-center justify-center relative">
                  <img
                    src={selectedItem.url}
                    alt={selectedItem.title}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                  {selectedItem.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-black/50 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white ml-1"
                        >
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-4 bg-gray-900 text-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium">{selectedItem.title}</h3>
                      <p className="text-gray-400 text-sm">{selectedItem.date}</p>
                      {selectedItem.description && (
                        <p className="text-gray-300 mt-2 text-sm">{selectedItem.description}</p>
                      )}
                    </div>
                    <div className="flex space-x-3">
                      <button className="hover:text-emerald-400">
                        <Download size={20} />
                      </button>
                      <button className="hover:text-emerald-400">
                        <Share2 size={20} />
                      </button>
                      <button className={`${selectedItem.liked ? 'text-red-500' : 'hover:text-red-500'}`}>
                        <Heart 
                          size={20} 
                          fill={selectedItem.liked ? 'currentColor' : 'none'} 
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default GalleryPage