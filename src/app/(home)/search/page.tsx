'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, ArrowRight, ChevronDown, ChevronUp, Info, Calendar, BookOpen, Clock, DollarSign, Image } from 'lucide-react';
import Link from 'next/link';

const availablePages = [
  { path: '/agenda', name: 'Agenda', description: 'Jadwal kegiatan masjid', icon: <Calendar className="w-4 h-4" /> },
  { path: '/berita', name: 'Berita', description: 'Berita terbaru seputar masjid', icon: <BookOpen className="w-4 h-4" /> },
  { path: '/jadwal-jumat', name: 'Jadwal Sholat Jumat', description: 'Jadwal khutbah dan imam', icon: <Clock className="w-4 h-4" /> },
  { path: '/jadwal-pengajian', name: 'Jadwal Kultum & Pengajian', description: 'Jadwal kajian rutin', icon: <BookOpen className="w-4 h-4" /> },
  { path: '/jadwal-sholat', name: 'Jadwal Sholat', description: 'Jadwal sholat harian', icon: <Clock className="w-4 h-4" /> },
  { path: '/keuangan', name: 'Laporan Keuangan', description: 'Transparansi keuangan masjid', icon: <DollarSign className="w-4 h-4" /> },
  { path: '/wakaf', name: 'Laporan Waqaf', description: 'Laporan donasi waqaf', icon: <DollarSign className="w-4 h-4" /> },
  { path: '/tausiyah', name: 'Tausiyah', description: 'Artikel islami dan nasihat', icon: <Info className="w-4 h-4" /> },
  { path: '/galeri', name: 'Galeri', description: 'Foto-foto kegiatan masjid', icon: <Image className="w-4 h-4" /> },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [mounted, setMounted] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [showAiResponse, setShowAiResponse] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const searches = localStorage.getItem('recentSearches');
    if (searches) {
      setRecentSearches(JSON.parse(searches));
    }
  }, []);

  useEffect(() => {
    if (query && mounted) {
      const updatedSearches = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      
      // Call Gemini AI when there's a query
      if (query.trim().length > 0) {
        fetchGeminiResponse(query);
      }
    }
  }, [query, mounted]);

  const fetchGeminiResponse = async (searchQuery: string) => {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      console.error('Gemini API key is not set');
      return;
    }

    setIsLoadingAi(true);
    setAiResponse(null);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Anda adalah asisten masjid yang membantu menjawab pertanyaan seputar kegiatan islami. 
                Berikan jawaban singkat (maksimal 2 paragraf) dalam Bahasa Indonesia yang ramah dan informatif untuk pertanyaan: 
                "${searchQuery}". 
                Jika pertanyaan tidak terkait dengan islam atau masjid, jawab dengan sopan bahwa Anda hanya bisa membantu pertanyaan seputar islam dan masjid.`
              }]
            }]
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch Gemini response');
      }

      const data = await response.json();
      const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (textResponse) {
        setAiResponse(textResponse);
        setShowAiResponse(true);
      }
    } catch (error) {
      console.error('Error fetching Gemini response:', error);
    } finally {
      setIsLoadingAi(false);
    }
  };

  const searchResults = query
    ? availablePages.filter((page) =>
        page.name.toLowerCase().includes(query.toLowerCase()) ||
        page.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const popularSearches = [
    'Agenda',
    'Jadwal Sholat',
    'Berita Terbaru',
    'Pengajian',
    'Keuangan Masjid'
  ];

  // Group pages by category for quick access
  const categories = [
    {
      name: 'Jadwal',
      pages: availablePages.filter(page => 
        page.name.includes('Jadwal') || page.path === '/agenda'
      ),
      icon: <Clock className="w-4 h-4" />
    },
    {
      name: 'Informasi',
      pages: availablePages.filter(page => 
        page.path === '/berita' || page.path === '/tausiyah'
      ),
      icon: <Info className="w-4 h-4" />
    },
    {
      name: 'Keuangan',
      pages: availablePages.filter(page => 
        page.path === '/keuangan' || page.path === '/wakaf'
      ),
      icon: <DollarSign className="w-4 h-4" />
    },
    {
      name: 'Lainnya',
      pages: availablePages.filter(page => 
        !['/agenda', '/berita', '/tausiyah', '/keuangan', '/wakaf'].includes(page.path) &&
        !page.name.includes('Jadwal')
      ),
      icon: <BookOpen className="w-4 h-4" />
    }
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          {query ? (
            <>
              <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                Hasil pencarian untuk "<span className="text-emerald-600 dark:text-emerald-400">{query}</span>"
              </h1>
              
              {/* AI Response Dropdown */}
              {(aiResponse || isLoadingAi) && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6"
                >
                  <button
                    onClick={() => setShowAiResponse(!showAiResponse)}
                    className="w-full flex items-center justify-between p-4 bg-emerald-50 dark:bg-gray-800 rounded-lg border border-emerald-100 dark:border-gray-700 hover:bg-emerald-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                      </svg>
                      <span className="font-medium text-emerald-700 dark:text-emerald-400">Jawaban AI</span>
                    </div>
                    {showAiResponse ? (
                      <ChevronUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    )}
                  </button>
                  
                  {showAiResponse && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-white dark:bg-gray-800 border border-t-0 border-gray-200 dark:border-gray-700 rounded-b-lg">
                        {isLoadingAi ? (
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/6"></div>
                          </div>
                        ) : (
                          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{aiResponse}</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Quick Access Categories */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-8"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  Akses Cepat
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <div key={category.name} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <button
                        onClick={() => setActiveCategory(activeCategory === category.name ? null : category.name)}
                        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center">
                          <span className="text-emerald-600 dark:text-emerald-400 mr-2">
                            {category.icon}
                          </span>
                          <span className="font-medium text-gray-800 dark:text-white">{category.name}</span>
                        </div>
                        {activeCategory === category.name ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      {activeCategory === category.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 pb-3">
                            {category.pages.map((page) => (
                              <Link
                                key={page.path}
                                href={page.path}
                                className="flex items-center p-2 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              >
                                <span className="text-emerald-600 dark:text-emerald-400 mr-2">
                                  {page.icon}
                                </span>
                                <span className="text-gray-700 dark:text-gray-300">{page.name}</span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Search Results */}
              {searchResults.length > 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Hasil Pencarian</h3>
                  {searchResults.map((page) => (
                    <motion.div
                      key={page.path}
                      whileHover={{ scale: 1.02 }}
                      className="block"
                    >
                      <Link
                        href={page.path}
                        className="block p-5 bg-white dark:bg-gray-800 hover:bg-emerald-50 dark:hover:bg-gray-700 rounded-xl transition-all border border-gray-200 dark:border-gray-700 shadow-sm"
                      >
                        <div className="flex items-center">
                          <span className="text-emerald-600 dark:text-emerald-400 mr-3">
                            {page.icon}
                          </span>
                          <div>
                            <h3 className="font-medium text-lg text-emerald-700 dark:text-emerald-400">{page.name}</h3>
                            <p className="text-emerald-500 dark:text-emerald-300 text-sm mb-2">{page.path}</p>
                            <p className="text-gray-600 dark:text-gray-300">{page.description}</p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="mx-auto w-16 h-16 bg-emerald-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-emerald-500 dark:text-emerald-400" />
                  </div>
                  <h2 className="text-xl font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Tidak ditemukan
                  </h2>
                  <p className="text-gray-500 dark:text-gray-500 mb-6">
                    Tidak ada halaman yang cocok dengan pencarian Anda.
                  </p>
                  <div className="max-w-md mx-auto">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Coba cari dengan:</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {popularSearches.map((search, index) => (
                        <Link
                          key={index}
                          href={`/search?q=${encodeURIComponent(search)}`}
                          className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-emerald-100 dark:hover:bg-emerald-900 rounded-full transition-colors"
                        >
                          {search}
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center py-16"
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3,
                  ease: "easeInOut"
                }}
                className="mx-auto w-24 h-24 bg-emerald-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-6"
              >
                <Search className="h-10 w-10 text-emerald-500 dark:text-emerald-400" />
              </motion.div>
              <h2 className="text-2xl font-medium text-gray-800 dark:text-white mb-3">
                Silahkan gunakan kolom pencarian
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
                Ketik kata kunci di kolom pencarian navbar untuk menemukan halaman yang relevan.
              </p>

              {/* Quick Links Section */}
              <div className="max-w-3xl mx-auto mb-10">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Menu Cepat</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {availablePages.slice(0, 8).map((page) => (
                    <Link
                      key={page.path}
                      href={page.path}
                      className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <span className="text-emerald-600 dark:text-emerald-400 mb-2">
                        {page.icon}
                      </span>
                      <span className="text-sm font-medium text-center text-gray-700 dark:text-gray-300">{page.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {recentSearches.length > 0 && (
                <div className="max-w-md mx-auto text-left">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Pencarian terakhir</h3>
                  <div className="space-y-2">
                    {recentSearches.map((search, index) => (
                      <Link
                        key={index}
                        href={`/search?q=${encodeURIComponent(search)}`}
                        className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <span className="text-gray-700 dark:text-gray-300">{search}</span>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="max-w-md mx-auto text-left mt-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Pencarian populer</h3>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search, index) => (
                    <Link
                      key={index}
                      href={`/search?q=${encodeURIComponent(search)}`}
                      className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-emerald-100 dark:hover:bg-emerald-900 rounded-full transition-colors"
                    >
                      {search}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}