// app/(main)/qultumdanpengajian/page.tsx
'use client'

import { motion } from 'framer-motion'
import { BookOpenText, CalendarDays, Clock, MapPin, Users, ChevronRight, Search, Filter } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

type Pengajian = {
  id: number
  title: string
  ustadz: string
  schedule: string
  time: string
  location: string
  category: string
  description: string
  image: string
  isNew?: boolean
}

const QultumDanPengajian = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('semua')

  const categories = [
    { id: 'semua', name: 'Semua' },
    { id: 'rutin', name: 'Rutin' },
    { id: 'khusus', name: 'Khusus' },
    { id: 'remaja', name: 'Remaja' },
    { id: 'wanita', name: 'Wanita' },
    { id: 'tpa', name: 'TPA' }
  ]

  const pengajianList: Pengajian[] = [
    {
      id: 1,
      title: 'Kajian Rutin Ahad Pagi',
      ustadz: 'Ust. Ahmad Farid, Lc.',
      schedule: 'Setiap Ahad',
      time: '08:00 - 10:00 WIB',
      location: 'Aula Utama Masjid',
      category: 'rutin',
      description: 'Kajian kitab Riyadhus Shalihin dengan pemateri Ust. Ahmad Farid',
      image: '/pengajian/ahad-pagi.jpg',
      isNew: true
    },
    {
      id: 2,
      title: 'Tafsir Juz Amma',
      ustadz: 'Ust. Abdullah Said, M.Hum',
      schedule: 'Setiap Senin & Kamis',
      time: 'Ba\'da Maghrib - 19:30 WIB',
      location: 'Ruang Sholat Utama',
      category: 'rutin',
      description: 'Belajar tafsir surat-surat pendek dalam Juz Amma',
      image: '/pengajian/juz-amma.jpg'
    },
    {
      id: 3,
      title: 'Pengajian Remaja',
      ustadz: 'Ust. Muhammad Ali, S.Pd.I',
      schedule: 'Setiap Jumat',
      time: '16:00 - 18:00 WIB',
      location: 'Ruang Belajar Remaja',
      category: 'remaja',
      description: 'Kajian khusus remaja dengan tema-tema kekinian',
      image: '/pengajian/remaja.jpg'
    },
    {
      id: 4,
      title: 'Majelis Ta\'lim Muslimah',
      ustadz: 'Ustzh. Fatimah Az-Zahra, Lc.',
      schedule: 'Setiap Rabu',
      time: '09:00 - 11:00 WIB',
      location: 'Aula Wanita',
      category: 'wanita',
      description: 'Kajian khusus muslimah dengan berbagai tema',
      image: '/pengajian/muslimah.jpg'
    },
    {
      id: 5,
      title: 'Daurah Kitab Kuning',
      ustadz: 'Ust. Abdul Somad, Lc., MA',
      schedule: '25-30 Juni 2024',
      time: '08:00 - 12:00 WIB',
      location: 'Aula Utama Masjid',
      category: 'khusus',
      description: 'Pelatihan membaca kitab kuning untuk tingkat dasar',
      image: '/pengajian/kitab-kuning.jpg',
      isNew: true
    },
    {
      id: 6,
      title: 'Kelas Tahsin Anak',
      ustadz: 'Ustzh. Aisyah Rahmah, S.Pd',
      schedule: 'Setiap Sabtu',
      time: '13:00 - 15:00 WIB',
      location: 'Ruang TPA',
      category: 'tpa',
      description: 'Belajar membaca Al-Quran dengan tajwid yang benar',
      image: '/pengajian/tahsin.jpg'
    }
  ]

  const filteredPengajian = pengajianList.filter(pengajian => {
    const matchesSearch = pengajian.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         pengajian.ustadz.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'semua' || pengajian.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-emerald-700 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Qultum & Pengajian
          </motion.h1>
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg max-w-2xl mx-auto"
          >
            Jadwal dan informasi pengajian rutin serta kegiatan keilmuan di Masjid Khoirul Ba'i
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari pengajian atau ustadz..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <select
                className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 dark:text-white"
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Pengajian List */}
        {filteredPengajian.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPengajian.map((pengajian, index) => (
              <motion.div
                key={pengajian.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
              >
                <Link href={`/qultumdanpengajian/${pengajian.id}`}>
                  <div className="relative">
                    <div className="h-48 bg-gray-300 dark:bg-gray-700 overflow-hidden">
                      <div 
                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                        style={{ backgroundImage: `url(${pengajian.image})` }}
                      />
                    </div>
                    {pengajian.isNew && (
                      <div className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                        Baru
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {pengajian.title}
                    </h3>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-3">
                      <Users className="h-4 w-4 mr-1" />
                      {pengajian.ustadz}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                      {pengajian.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                        <CalendarDays className="h-4 w-4 mr-2 flex-shrink-0" />
                        {pengajian.schedule}
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                        <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                        {pengajian.time}
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                        {pengajian.location}
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-xs px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 rounded-full">
                        {categories.find(c => c.id === pengajian.category)?.name}
                      </span>
                      <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm">
                        Detail <ChevronRight className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpenText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Tidak ada pengajian ditemukan</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Coba gunakan kata kunci lain atau pilih kategori yang berbeda
            </p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-50 dark:bg-emerald-900/20 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Ingin Mengadakan Pengajian di Masjid Kami?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Masjid Khoirul Ba'i terbuka untuk kerja sama penyelenggaraan kajian, daurah, atau kegiatan keilmuan lainnya.
          </p>
          <Link
            href="/kontak"
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          >
            Hubungi Kami <ChevronRight className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default QultumDanPengajian