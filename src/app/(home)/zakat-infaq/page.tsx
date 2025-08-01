// app/(main)/zakatdaninfaq/page.tsx
'use client'

import { motion } from 'framer-motion'
import { HeartHandshake, Calculator, Wallet, Banknote, ChevronRight, Search, Filter } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

type ProgramZakat = {
  id: number
  title: string
  type: 'zakat' | 'infaq' | 'sedekah' | 'wakaf'
  description: string
  image: string
  calculation?: string
  benefits?: string[]
  isFeatured?: boolean
}

const ZakatDanInfaq = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'kalkulator' | 'program'>('info')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<'semua' | 'zakat' | 'infaq' | 'sedekah' | 'wakaf'>('semua')

  const programs: ProgramZakat[] = [
    {
      id: 1,
      title: 'Zakat Fitrah',
      type: 'zakat',
      description: 'Zakat wajib yang dibayarkan setiap muslim sebelum shalat Idul Fitri',
      image: '/zakat/fitrah.jpg',
      calculation: '2.5 kg beras atau setara uang per jiwa',
      benefits: [
        'Membersihkan harta',
        'Menyempurnakan puasa Ramadhan',
        'Membantu fakir miskin merayakan Idul Fitri'
      ],
      isFeatured: true
    },
    {
      id: 2,
      title: 'Zakat Maal',
      type: 'zakat',
      description: 'Zakat harta yang mencapai nisab dan haul',
      image: '/zakat/maal.jpg',
      calculation: '2.5% dari total harta yang telah mencapai nisab',
      benefits: [
        'Pembersih harta',
        'Pengembangan ekonomi umat',
        'Perlindungan dari kebangkrutan'
      ]
    },
    {
      id: 3,
      title: 'Infaq Jariah',
      type: 'infaq',
      description: 'Infaq untuk program-program berkelanjutan masjid',
      image: '/zakat/jariah.jpg',
      benefits: [
        'Pahala mengalir terus',
        'Mendukung kegiatan dakwah',
        'Memakmurkan masjid'
      ]
    },
    {
      id: 4,
      title: 'Sedekah Pendidikan',
      type: 'sedekah',
      description: 'Bantuan pendidikan untuk anak yatim dan dhuafa',
      image: '/zakat/pendidikan.jpg',
      benefits: [
        'Mencerdaskan umat',
        'Membuka pintu rezeki',
        'Pahala berlipat'
      ],
      isFeatured: true
    },
    {
      id: 5,
      title: 'Wakaf Al-Quran',
      type: 'wakaf',
      description: 'Wakaf mushaf Al-Quran untuk TPA dan majelis taklim',
      image: '/zakat/quran.jpg',
      benefits: [
        'Pahala abadi',
        'Menyebarkan ilmu',
        'Dibaca hingga akhir zaman'
      ]
    },
    {
      id: 6,
      title: 'Infaq Renovasi Masjid',
      type: 'infaq',
      description: 'Dana untuk perbaikan dan perluasan masjid',
      image: '/zakat/renovasi.jpg',
      benefits: [
        'Rumah Allah menjadi indah',
        'Tempat ibadah yang nyaman',
        'Investasi akhirat'
      ]
    }
  ]

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         program.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = activeFilter === 'semua' || program.type === activeFilter
    return matchesSearch && matchesFilter
  })

  const nisabEmas = 85 // gram
  const hargaEmasPerGram = 1000000 // contoh harga (sesuaikan dengan harga terkini)

  const [harta, setHarta] = useState('')
  const [hutang, setHutang] = useState('')
  const [zakatResult, setZakatResult] = useState<{
    totalHarta: number
    hartaWajibZakat: number
    zakatYangHarusDibayar: number
    cukupNisab: boolean
  } | null>(null)

  const calculateZakat = () => {
    const totalHarta = parseFloat(harta) || 0
    const totalHutang = parseFloat(hutang) || 0
    const hartaBersih = totalHarta - totalHutang
    const nisab = nisabEmas * hargaEmasPerGram
    
    const cukupNisab = hartaBersih >= nisab
    const hartaWajibZakat = cukupNisab ? hartaBersih : 0
    const zakatYangHarusDibayar = hartaWajibZakat * 0.025

    setZakatResult({
      totalHarta,
      hartaWajibZakat,
      zakatYangHarusDibayar,
      cukupNisab
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-600 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Zakat, Infaq, dan Sedekah
          </motion.h1>
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg max-w-2xl mx-auto"
          >
            "Ambil zakat dari sebagian harta mereka, dengan zakat itu kamu membersihkan dan mensucikan mereka" (QS. At-Taubah: 103)
          </motion.p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('info')}
              className={`px-6 py-4 font-medium text-sm flex items-center border-b-2 transition-colors ${
                activeTab === 'info'
                  ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400'
                  : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <HeartHandshake className="h-5 w-5 mr-2" />
              Informasi Zakat
            </button>
            <button
              onClick={() => setActiveTab('kalkulator')}
              className={`px-6 py-4 font-medium text-sm flex items-center border-b-2 transition-colors ${
                activeTab === 'kalkulator'
                  ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400'
                  : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <Calculator className="h-5 w-5 mr-2" />
              Kalkulator Zakat
            </button>
            <button
              onClick={() => setActiveTab('program')}
              className={`px-6 py-4 font-medium text-sm flex items-center border-b-2 transition-colors ${
                activeTab === 'program'
                  ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400'
                  : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <Wallet className="h-5 w-5 mr-2" />
              Program Kami
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {activeTab === 'info' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold mb-4 flex items-center dark:text-white">
                  <HeartHandshake className="h-6 w-6 mr-2 text-emerald-600 dark:text-emerald-400" />
                  Apa Itu Zakat?
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Zakat adalah harta yang wajib dikeluarkan apabila telah memenuhi syarat-syarat yang telah ditentukan oleh agama, sebagai salah satu rukun Islam yang ketiga.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Zakat bertujuan untuk membersihkan harta, menyucikan jiwa, dan membantu mereka yang membutuhkan.
                </p>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                  <h3 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2">Jenis-Jenis Zakat:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                    <li>Zakat Fitrah (wajib bagi setiap muslim)</li>
                    <li>Zakat Maal (harta)</li>
                    <li>Zakat Pertanian</li>
                    <li>Zakat Perdagangan</li>
                    <li>Zakat Hewan Ternak</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold mb-4 flex items-center dark:text-white">
                  <Banknote className="h-6 w-6 mr-2 text-emerald-600 dark:text-emerald-400" />
                  Infaq & Sedekah
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Infaq adalah pengeluaran sukarela yang dilakukan seseorang setiap kali ia memperoleh rezeki. Sedekah memiliki makna yang lebih luas, mencakup semua bentuk kebaikan.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Berbeda dengan zakat, infaq dan sedekah tidak memiliki batasan jumlah maupun waktu.
                </p>
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                  <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2">Keutamaan Sedekah:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                    <li>Menghapus dosa</li>
                    <li>Menyembuhkan penyakit</li>
                    <li>Melipatgandakan rezeki</li>
                    <li>Memberi naungan di hari akhir</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">Cara Menyalurkan Zakat</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                  <div className="bg-emerald-100 dark:bg-emerald-900/20 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">1</span>
                  </div>
                  <h3 className="font-bold mb-2 dark:text-white">Datang Langsung</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Ke sekretariat Masjid Khoirul Ba'i setiap hari Senin-Jumat pukul 08.00-15.00 WIB
                  </p>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                  <div className="bg-emerald-100 dark:bg-emerald-900/20 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">2</span>
                  </div>
                  <h3 className="font-bold mb-2 dark:text-white">Transfer Bank</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Rekening BSI 7998006664 a.n. PANITIA REHAB MASJID KHOIRUL BAI
                  </p>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                  <div className="bg-emerald-100 dark:bg-emerald-900/20 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">3</span>
                  </div>
                  <h3 className="font-bold mb-2 dark:text-white">Online Payment</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Via website kami atau aplikasi pembayaran digital (QRIS, Dana, OVO, dll)
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'kalkulator' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center dark:text-white">
                <Calculator className="h-6 w-6 mr-2 text-emerald-600 dark:text-emerald-400" />
                Kalkulator Zakat Maal
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">Total Harta (Rp)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Masukkan jumlah harta"
                    value={harta}
                    onChange={(e) => setHarta(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">Hutang/Cicilan (Rp)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Masukkan jumlah hutang"
                    value={hutang}
                    onChange={(e) => setHutang(e.target.value)}
                  />
                </div>
                <div className="pt-2">
                  <button
                    onClick={calculateZakat}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                  >
                    Hitung Zakat
                  </button>
                </div>
              </div>

              {zakatResult && (
                <div className={`mt-6 p-4 rounded-lg ${
                  zakatResult.cukupNisab ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-amber-50 dark:bg-amber-900/20'
                }`}>
                  <h3 className="font-bold mb-3 flex items-center">
                    <Calculator className="h-5 w-5 mr-2" />
                    Hasil Perhitungan
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700 dark:text-gray-300">Total Harta:</span>
                      <span className="font-medium">Rp {zakatResult.totalHarta.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700 dark:text-gray-300">Harta Setelah Hutang:</span>
                      <span className="font-medium">Rp {(zakatResult.totalHarta - parseFloat(hutang || '0')).toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700 dark:text-gray-300">Nisab (85gr emas):</span>
                      <span className="font-medium">Rp {(nisabEmas * hargaEmasPerGram).toLocaleString('id-ID')}</span>
                    </div>
                    <div className="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>
                    {zakatResult.cukupNisab ? (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-700 dark:text-gray-300">Harta Wajib Zakat:</span>
                          <span className="font-medium">Rp {zakatResult.hartaWajibZakat.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="flex justify-between font-bold text-emerald-600 dark:text-emerald-400">
                          <span>Zakat Yang Harus Dibayar (2.5%):</span>
                          <span>Rp {zakatResult.zakatYangHarusDibayar.toLocaleString('id-ID')}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                          Selamat! Harta Anda telah mencapai nisab. Segera tunaikan zakat untuk membersihkan harta.
                        </p>
                      </>
                    ) : (
                      <div className="text-center py-3">
                        <p className="font-medium text-amber-600 dark:text-amber-400">
                          Harta Anda belum mencapai nisab (Rp {(nisabEmas * hargaEmasPerGram).toLocaleString('id-ID')})
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Anda tetap bisa berinfaq atau bersedekah untuk mendapatkan keberkahan harta.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-2">Catatan:</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>Perhitungan ini untuk zakat maal (harta) dengan nisab 85 gram emas</li>
                  <li>Harga emas saat ini: Rp {hargaEmasPerGram.toLocaleString('id-ID')}/gram</li>
                  <li>Zakat fitrah dihitung terpisah (2.5kg beras atau setara per jiwa)</li>
                  <li>Untuk perhitungan zakat lainnya (pertanian, perdagangan, dll), silakan konsultasi dengan amil zakat</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'program' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Search and Filter */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari program zakat atau infaq..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 dark:text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <select
                    className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 dark:text-white"
                    value={activeFilter}
                    onChange={(e) => setActiveFilter(e.target.value as any)}
                  >
                    <option value="semua">Semua Jenis</option>
                    <option value="zakat">Zakat</option>
                    <option value="infaq">Infaq</option>
                    <option value="sedekah">Sedekah</option>
                    <option value="wakaf">Wakaf</option>
                  </select>
                </div>
              </div>

              {/* Category Chips */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveFilter('semua')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === 'semua'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setActiveFilter('zakat')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === 'zakat'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  Zakat
                </button>
                <button
                  onClick={() => setActiveFilter('infaq')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === 'infaq'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  Infaq
                </button>
                <button
                  onClick={() => setActiveFilter('sedekah')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === 'sedekah'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  Sedekah
                </button>
                <button
                  onClick={() => setActiveFilter('wakaf')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === 'wakaf'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  Wakaf
                </button>
              </div>
            </div>

            {/* Programs List */}
            {filteredPrograms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrograms.map((program, index) => (
                  <motion.div
                    key={program.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                  >
                    <Link href={`/zakatdaninfaq/${program.id}`}>
                      <div className="relative">
                        <div className="h-48 bg-gray-300 dark:bg-gray-700 overflow-hidden">
                          <div 
                            className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                            style={{ backgroundImage: `url(${program.image})` }}
                          />
                        </div>
                        {program.isFeatured && (
                          <div className="absolute top-3 right-3 bg-emerald-600 text-white text-xs px-2 py-1 rounded-full">
                            Unggulan
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {program.title}
                          </h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            program.type === 'zakat' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' :
                            program.type === 'infaq' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                            program.type === 'sedekah' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                            'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                          }`}>
                            {program.type.charAt(0).toUpperCase() + program.type.slice(1)}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                          {program.description}
                        </p>
                        {program.calculation && (
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                            <Calculator className="h-4 w-4 mr-2 flex-shrink-0" />
                            {program.calculation}
                          </div>
                        )}
                        {program.benefits && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Manfaat:</h4>
                            <ul className="space-y-1">
                              {program.benefits.slice(0, 2).map((benefit, i) => (
                                <li key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                                  <span className="text-emerald-500 mr-1">•</span> {benefit}
                                </li>
                              ))}
                              {program.benefits.length > 2 && (
                                <li className="text-sm text-gray-500 dark:text-gray-500">
                                  +{program.benefits.length - 2} manfaat lainnya
                                </li>
                              )}
                            </ul>
                          </div>
                        )}
                        <div className="mt-4 flex justify-end">
                          <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm">
                            Selengkapnya <ChevronRight className="h-4 w-4 ml-1" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <HeartHandshake className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Tidak ada program ditemukan</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Coba gunakan kata kunci lain atau pilih jenis yang berbeda
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-emerald-50 dark:bg-emerald-900/20 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Siap Menunaikan Zakat?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Salurkan zakat, infaq, atau sedekah Anda melalui Masjid Khoirul Ba'i untuk distribusi yang amanah dan tepat sasaran.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/zakatdaninfaq/bayar"
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              Bayar Zakat Online <ChevronRight className="ml-2" />
            </Link>
            <Link
              href="/kontak"
              className="inline-flex items-center px-6 py-3 border border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400 rounded-lg font-medium hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors"
            >
              Konsultasi Zakat <ChevronRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ZakatDanInfaq
