'use client'

import { motion } from 'framer-motion'
import { 
  Clock, 
  CalendarDays, 
  Megaphone, 
  BookOpenText,
  ChevronRight,
  ArrowRight,
  Users,
  HeartHandshake,
  BookCheck,
  ScrollText,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Sunrise,
  Sunset,
  Moon,
  Sun,
  CloudRain,
  CloudSun,
  Cloud,
  Droplets,
  Wind,
  Book,
  House,
  Microscope,
  Globe,
  Landmark,
  WalletCards,
  AlertCircle,
  Bell,
  Bookmark,
  Download,
  Share2,
  Play,
  Pause,
  Volume2,
  Clock3,
  Plus
} from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const Home = () => {
  // State for current time and date
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeTab, setActiveTab] = useState('today')

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Format date
  const formattedDate = currentTime.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // Hijri date (mock data - in real app you would fetch this)
  const hijriDate = {
    day: '15',
    month: 'Dhul-Qadah',
    year: '1445',
    hijri: '15 Dhul-Qadah 1445 H'
  }

  // Weather data (mock data)
  const weather = {
    temp: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    wind: 12,
    icon: <CloudSun className="h-8 w-8 text-yellow-500" />
  }

  // Jadwal Sholat Data
  const jadwalSholat = {
    today: [
      { name: 'Subuh', time: '04:30', passed: false, icon: <Sunrise className="h-5 w-5" /> },
      { name: 'Syuruq', time: '05:45', passed: false, icon: <Sun className="h-5 w-5" /> },
      { name: 'Dzuhur', time: '12:15', passed: false, icon: <Sun className="h-5 w-5" /> },
      { name: 'Ashar', time: '15:30', passed: false, icon: <CloudSun className="h-5 w-5" /> },
      { name: 'Maghrib', time: '18:00', passed: false, icon: <Sunset className="h-5 w-5" /> },
      { name: 'Isya', time: '19:30', passed: false, icon: <Moon className="h-5 w-5" /> }
    ],
    tomorrow: [
      { name: 'Subuh', time: '04:29', passed: false, icon: <Sunrise className="h-5 w-5" /> },
      { name: 'Syuruq', time: '05:44', passed: false, icon: <Sun className="h-5 w-5" /> },
      { name: 'Dzuhur', time: '12:14', passed: false, icon: <Sun className="h-5 w-5" /> },
      { name: 'Ashar', time: '15:29', passed: false, icon: <CloudSun className="h-5 w-5" /> },
      { name: 'Maghrib', time: '17:59', passed: false, icon: <Sunset className="h-5 w-5" /> },
      { name: 'Isya', time: '19:29', passed: false, icon: <Moon className="h-5 w-5" /> }
    ]
  }

  // Update prayer times status based on current time
  useEffect(() => {
    const now = currentTime.getHours() * 60 + currentTime.getMinutes()
    
    const updateTimes = (times) => {
      return times.map(time => {
        const [hours, minutes] = time.time.split(':').map(Number)
        const prayerTime = hours * 60 + minutes
        return { ...time, passed: now > prayerTime }
      })
    }

    jadwalSholat.today = updateTimes(jadwalSholat.today)
    jadwalSholat.tomorrow = updateTimes(jadwalSholat.tomorrow)
  }, [currentTime])

  // Find next prayer
  const nextPrayer = jadwalSholat.today.find(prayer => !prayer.passed) || jadwalSholat.tomorrow[0]

  // Agenda Terdekat
  const upcomingEvents = [
    {
      id: 1,
      title: 'Pengajian Rutin Bulanan',
      date: '15 Juni 2024',
      time: '09:00 - 11:30 WIB',
      speaker: 'Ust. Ahmad Farid',
      location: 'Aula Utama Masjid',
      category: 'pengajian',
      image: '/events/pengajian.jpg'
    },
    {
      id: 2,
      title: 'Sholat Jumat Bersama',
      date: '14 Juni 2024',
      time: '12:00 - 13:00 WIB',
      speaker: 'Ust. Muhammad Ali',
      location: 'Ruang Sholat Utama',
      category: 'sholat',
      image: '/events/jumat.jpg'
    },
    {
      id: 3,
      title: 'Kegiatan TPA Mingguan',
      date: '16 Juni 2024',
      time: '08:00 - 10:00 WIB',
      speaker: 'Ust. Abdullah',
      location: 'Ruang TPA Masjid',
      category: 'pendidikan',
      image: '/events/tpa.jpg'
    },
    {
      id: 4,
      title: 'Bazar Ramadhan',
      date: '1-30 Ramadhan 1445',
      time: '16:00 - 19:00 WIB',
      speaker: 'Panitia Masjid',
      location: 'Halaman Masjid',
      category: 'bazar',
      image: '/events/bazar.jpg'
    }
  ]

  // Layanan Masjid
  const services = [
    {
      icon: <BookOpenText className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />,
      title: 'Kajian Rutin',
      description: 'Pengajian mingguan dan bulanan dengan berbagai tema',
      link: '/kajian'
    },
    {
      icon: <Users className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />,
      title: 'TPA/TPQ',
      description: 'Pendidikan Al-Book untuk anak-anak',
      link: '/tpa'
    },
    {
      icon: <HeartHandshake className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />,
      title: 'Zakat & Infaq',
      description: 'Penyaluran zakat, infaq, dan sedekah',
      link: '/zakat'
    },
    {
      icon: <BookCheck className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />,
      title: 'Pernikahan',
      description: 'Layanan nikah dan konsultasi keluarga',
      link: '/pernikahan'
    },
    {
      icon: <ScrollText className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />,
      title: 'Kegiatan Sosial',
      description: 'Bantuan untuk masyarakat sekitar',
      link: '/sosial'
    },
    {
      icon: <House className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />,
      title: 'Wisata Religi',
      description: 'Kunjungan dan studi banding',
      link: '/wisata'
    },
    {
      icon: <Book className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />,
      title: 'Tahfiz Book',
      description: 'Program menghafal Al-Book',
      link: '/tahfiz'
    },
    {
      icon: <House className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />,
      title: 'Manasik Haji',
      description: 'Latihan ibadah haji untuk calon jamaah',
      link: '/haji'
    }
  ]

  // Tausyiah Terbaru
  const tausyiah = [
    {
      id: 1,
      title: 'Keutamaan Sholat Berjamaah di Masjid',
      description: 'Penjelasan tentang fadhilah dan keutamaan sholat berjamaah di masjid bagi laki-laki muslim.',
      date: '14 Juni 2024',
      time: '15:30 WIB',
      duration: '25:14',
      speaker: 'Ust. Abdul Somad',
      type: 'video',
      views: '1.2K',
      image: '/tausyiah/sholat.jpg'
    },
    {
      id: 2,
      title: 'Tafsir Surat Al-Fatihah',
      description: 'Kajian mendalam tentang makna dan tafsir dari surat pembuka Al-Book.',
      date: '12 Juni 2024',
      time: '13:00 WIB',
      duration: '42:05',
      speaker: 'Ust. Adi Hidayat',
      type: 'audio',
      views: '856',
      image: '/tausyiah/tafsir.jpg'
    },
    {
      id: 3,
      title: 'Menyambut Bulan Ramadhan',
      description: 'Persiapan menyambut bulan suci Ramadhan dengan penuh keberkahan.',
      date: '10 Juni 2024',
      time: '20:00 WIB',
      duration: '18:32',
      speaker: 'Ust. Khalid Basalamah',
      type: 'video',
      views: '2.3K',
      image: '/tausyiah/ramadhan.jpg'
    }
  ]

  // Galeri Kegiatan
  const gallery = [
    {
      id: 1,
      title: 'Kegiatan TPA',
      date: '10 Juni 2024',
      category: 'pendidikan',
      image: '/gallery/tpa.jpg'
    },
    {
      id: 2,
      title: 'Sholat Jumat',
      date: '7 Juni 2024',
      category: 'sholat',
      image: '/gallery/jumat.jpg'
    },
    {
      id: 3,
      title: 'Pengajian Rutin',
      date: '5 Juni 2024',
      category: 'pengajian',
      image: '/gallery/pengajian.jpg'
    },
    {
      id: 4,
      title: 'Buka Puasa Bersama',
      date: '3 Juni 2024',
      category: 'ramadhan',
      image: '/gallery/buka.jpg'
    },
    {
      id: 5,
      title: 'Sholat Tarawih',
      date: '2 Juni 2024',
      category: 'ramadhan',
      image: '/gallery/tarawih.jpg'
    },
    {
      id: 6,
      title: 'Santunan Anak Yatim',
      date: '1 Juni 2024',
      category: 'sosial',
      image: '/gallery/santunan.jpg'
    },
    {
      id: 7,
      title: 'Kegiatan Remaja Masjid',
      date: '28 Mei 2024',
      category: 'remaja',
      image: '/gallery/remaja.jpg'
    },
    {
      id: 8,
      title: 'Peresmian Masjid',
      date: '25 Mei 2024',
      category: 'acara',
      image: '/gallery/peresmian.jpg'
    }
  ]

  // Pengumuman
  const announcements = [
    {
      id: 1,
      title: 'Pendaftaran TPA Tahun Ajaran Baru',
      date: '15 Juni 2024',
      content: 'Pendaftaran TPA/TPQ Baitul Makmur tahun ajaran 2024/2025 dibuka mulai 15 Juni - 30 Juni 2024.',
      important: true
    },
    {
      id: 2,
      title: 'Jadwal Kajian Bulan Juni',
      date: '10 Juni 2024',
      content: 'Telah tersedia jadwal kajian rutin bulan Juni 2024. Silakan cek di bagian agenda.',
      important: false
    },
    {
      id: 3,
      title: 'Donasi Pembangunan Masjid',
      date: '5 Juni 2024',
      content: 'Masih membuka donasi untuk perluasan area parkir dan perbaikan fasilitas masjid.',
      important: true
    }
  ]

  // Statistik Masjid
  const stats = [
    { name: 'Jamaah Harian', value: '350+', icon: <Users className="h-8 w-8" /> },
    { name: 'Kegiatan Bulanan', value: '12+', icon: <CalendarDays className="h-8 w-8" /> },
    { name: 'Santri TPA', value: '120', icon: <BookOpenText className="h-8 w-8" /> },
    { name: 'Donatur Aktif', value: '85', icon: <HeartHandshake className="h-8 w-8" /> }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Announcement Bar */}
      <div className="bg-amber-500 text-white px-4 py-2 text-center text-sm font-medium">
        <div className="container mx-auto flex items-center justify-center">
          <Megaphone className="h-4 w-4 mr-2" />
          <span>Pendaftaran TPA Tahun Ajaran 2024/2025 dibuka mulai 15 Juni 2024</span>
          <Link href="/tpa" className="ml-2 underline">Info Selengkapnya</Link>
        </div>
      </div>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-emerald-700 text-white py-16 md:py-24"
      >
        <div className="absolute inset-0 bg-[url('/images/masjid-pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative">
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            Selamat Datang di Masjid Baitul Makmur
          </motion.h1>
          <motion.p 
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl max-w-3xl mx-auto mb-8"
          >
            Masjid sebagai pusat ibadah, pendidikan, dan kegiatan sosial masyarakat
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link 
              href="/agenda" 
              className="px-6 py-3 bg-white text-emerald-700 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center"
            >
              Lihat Agenda <ArrowRight className="ml-2" />
            </Link>
            <Link 
              href="/tausyiah" 
              className="px-6 py-3 bg-emerald-800 text-white rounded-lg font-medium hover:bg-emerald-900 transition-colors flex items-center"
            >
              Tausyiah <Megaphone className="ml-2" />
            </Link>
            <Link 
              href="/live" 
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center"
            >
              Live Streaming <Play className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Info Bar */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-center">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-emerald-600 mr-2" />
                <span className="font-medium dark:text-white">
                  {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
              <span className="mx-2 text-gray-400">|</span>
              <div className="flex items-center">
                <CalendarDays className="h-5 w-5 text-emerald-600 mr-2" />
                <span className="dark:text-white">{formattedDate}</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-center">
                <Landmark className="h-5 w-5 text-emerald-600 mr-2" />
                <span className="dark:text-white">{hijriDate.hijri}</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-center">
                {weather.icon}
                <span className="ml-2 dark:text-white">
                  {weather.temp}°C • {weather.condition}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Jadwal Sholat & Agenda Section */}
      <section className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {/* Next Prayer Card */}
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Bell className="mr-2" />
              Waktu Sholat Berikutnya
            </h2>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-4xl font-bold">{nextPrayer.name}</div>
                <div className="text-2xl font-medium">{nextPrayer.time}</div>
              </div>
              <div className="bg-white/20 p-3 rounded-full">
                {nextPrayer.icon}
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Waktu saat ini: {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
              <button className="flex items-center text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors">
                <Volume2 className="h-4 w-4 mr-1" /> Adzan
              </button>
            </div>
          </div>

          {/* Jadwal Sholat */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center dark:text-white">
                  <Clock className="mr-2 text-emerald-600 dark:text-emerald-400" />
                  Jadwal Sholat
                </h2>
                <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  <button 
                    onClick={() => setActiveTab('today')}
                    className={`px-3 py-1 text-sm rounded-md ${activeTab === 'today' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
                  >
                    Hari Ini
                  </button>
                  <button 
                    onClick={() => setActiveTab('tomorrow')}
                    className={`px-3 py-1 text-sm rounded-md ${activeTab === 'tomorrow' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
                  >
                    Besok
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {(activeTab === 'today' ? jadwalSholat.today : jadwalSholat.tomorrow).map((sholat, index) => (
                  <motion.div
                    key={`${activeTab}-${sholat.name}`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className={`flex justify-between items-center p-3 rounded-lg ${sholat.passed ? 'bg-gray-50 dark:bg-gray-700/50' : sholat.name === nextPrayer.name ? 'bg-emerald-50 dark:bg-emerald-900/30' : 'bg-white dark:bg-gray-800'}`}
                  >
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full mr-3 ${sholat.passed ? 'text-gray-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                        {sholat.icon}
                      </div>
                      <span className={`font-medium ${sholat.passed ? 'text-gray-500 dark:text-gray-400' : 'dark:text-white'}`}>
                        {sholat.name}
                      </span>
                    </div>
                    <span className={`font-bold ${sholat.passed ? 'text-gray-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                      {sholat.time}
                    </span>
                  </motion.div>
                ))}
              </div>
              <Link 
                href="/jadwal-sholat" 
                className="inline-flex items-center mt-4 text-emerald-600 dark:text-emerald-400 hover:underline text-sm"
              >
                Lihat jadwal bulanan <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Agenda Terdekat */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center dark:text-white">
                  <CalendarDays className="mr-2 text-emerald-600 dark:text-emerald-400" />
                  Agenda Terdekat
                </h2>
                <Link href="/agenda" className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline">
                  Lihat Semua
                </Link>
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="group cursor-pointer"
                  >
                    <div className="flex">
                      <div className="bg-emerald-100 dark:bg-emerald-900/20 w-12 h-12 rounded-lg flex items-center justify-center mr-3">
                        <CalendarDays className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {event.title}
                        </h3>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {event.date} • {event.time}
                        </div>
                        <div className="text-xs mt-1 text-emerald-600 dark:text-emerald-400">
                          {event.location}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4">
                <button className="w-full py-2 border border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors flex items-center justify-center">
                  <Plus className="h-4 w-4 mr-1" /> Tambah ke Kalender
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Pengumuman Penting */}
      <section className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-amber-50 dark:bg-amber-900/20 rounded-xl shadow-sm p-6"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center dark:text-white">
            <AlertCircle className="mr-2 text-amber-600 dark:text-amber-400" />
            Pengumuman Penting
          </h2>
          <div className="space-y-4">
            {announcements.filter(a => a.important).map((announcement, index) => (
              <motion.div
                key={announcement.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xs"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold dark:text-white">{announcement.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{announcement.content}</p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                    {announcement.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          <Link 
            href="/pengumuman" 
            className="inline-flex items-center mt-4 text-amber-600 dark:text-amber-400 hover:underline text-sm"
          >
            Lihat semua pengumuman <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </motion.div>
      </section>

      {/* Statistik Masjid */}
      <section className="container mx-auto px-4 py-12 bg-white dark:bg-gray-800">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold dark:text-white">Masjid Baitul Makmur dalam Angka</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
            Kontribusi dan aktivitas masjid untuk masyarakat
          </p>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl text-center"
            >
              <div className="bg-emerald-100 dark:bg-emerald-900/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {stat.name}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Layanan Masjid Section */}
      <section className="container mx-auto px-4 py-12 bg-gray-50 dark:bg-gray-900">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold dark:text-white">Layanan Masjid</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
            Berbagai layanan yang disediakan Masjid Baitul Makmur untuk masyarakat
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <Link href={service.link} className="block">
                <div className="bg-emerald-100 dark:bg-emerald-900/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/30 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
                <div className="mt-4 text-sm text-emerald-600 dark:text-emerald-400 flex items-center">
                  Selengkapnya <ChevronRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tausyiah Terbaru Section */}
      <section className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h2 className="text-2xl font-bold dark:text-white">Tausyiah Terbaru</h2>
            <p className="text-gray-600 dark:text-gray-400">Kumpulan nasihat dan ceramah terbaru</p>
          </div>
          <Link 
            href="/tausyiah" 
            className="flex items-center text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Lihat semua <ChevronRight className="ml-1" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tausyiah.map((item, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow group"
            >
              <Link href={`/tausyiah/${item.id}`}>
                <div className="h-48 bg-gray-300 dark:bg-gray-700 relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `url(${item.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <span className={`text-xs px-2 py-1 rounded ${item.type === 'video' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}`}>
                        {item.type === 'video' ? 'Video' : 'Audio'}
                      </span>
                      <span className="ml-auto text-white text-sm bg-black/30 px-2 py-1 rounded">
                        {item.duration}
                      </span>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <Play className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {item.date} • {item.time}
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                      <Users className="h-3 w-3 mr-1" />
                      {item.views}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Galeri Section */}
      <section className="container mx-auto px-4 py-12 bg-white dark:bg-gray-800">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h2 className="text-2xl font-bold dark:text-white">Galeri Kegiatan</h2>
            <p className="text-gray-600 dark:text-gray-400">Dokumentasi kegiatan Masjid Baitul Makmur</p>
          </div>
          <Link 
            href="/galeri" 
            className="flex items-center text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Lihat semua <ChevronRight className="ml-1" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map((item, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.05 * index }}
              viewport={{ once: true }}
              className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer relative group"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <div>
                    <h3 className="text-white font-medium">{item.title}</h3>
                    <div className="flex items-center text-white/80 text-xs">
                      <CalendarDays className="h-3 w-3 mr-1" />
                      {item.date}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Live Streaming Section */}
      <section className="container mx-auto px-4 py-12 bg-gray-50 dark:bg-gray-900">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h2 className="text-2xl font-bold dark:text-white">Live Streaming</h2>
            <p className="text-gray-600 dark:text-gray-400">Siaran langsung dari Masjid Baitul Makmur</p>
          </div>
          <div className="flex items-center">
            <span className="flex items-center text-red-600 text-sm mr-4">
              <span className="w-2 h-2 bg-red-600 rounded-full mr-1 animate-pulse"></span>
              LIVE NOW
            </span>
            <Link 
              href="/live" 
              className="flex items-center text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Lihat semua <ChevronRight className="ml-1" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
        >
          <div className="aspect-video bg-black relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-white text-lg mb-2">Sholat Jumat</div>
                <div className="text-gray-400 text-sm">14 Juni 2024 • 12:00 WIB</div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <button className="text-white bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors">
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </button>
                <button className="text-white bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors">
                  <Volume2 className="h-5 w-5" />
                </button>
                <div className="text-white text-sm bg-black/30 px-2 py-1 rounded">
                  12:45 / 45:20
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-white bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors">
                  <Bookmark className="h-5 w-5" />
                </button>
                <button className="text-white bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
                <button className="text-white bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors">
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-bold dark:text-white mb-1">Sholat Jumat Bersama - Ust. Muhammad Ali</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Siaran langsung sholat Jumat dari Masjid Baitul Makmur
            </p>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                <Users className="h-3 w-3 mr-1" />
                245 Sedang Menonton
              </div>
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                <Clock3 className="h-3 w-3 mr-1" />
                Mulai 12:00 WIB
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Peta Lokasi */}
      <section className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h2 className="text-2xl font-bold dark:text-white">Lokasi Masjid</h2>
            <p className="text-gray-600 dark:text-gray-400">Kunjungi Masjid Baitul Makmur</p>
          </div>
          <Link 
            href="/kontak" 
            className="flex items-center text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Info lengkap <ChevronRight className="ml-1" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
        >
          <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <MapPin className="h-8 w-8 text-red-600" />
              <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                <h3 className="font-bold dark:text-white">Masjid Baitul Makmur</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Jl. Kebon Jeruk No. 45, Jakarta Barat
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2" />
              <span className="dark:text-white">Jl. Kebon Jeruk No. 45, Jakarta Barat</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2" />
              <span className="dark:text-white">(021) 12345678</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2" />
              <span className="dark:text-white">info@baitulmakmur.id</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            initial={{ y: -10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold mb-4"
          >
            Mari Berpartisipasi dalam Kegiatan Masjid
          </motion.h2>
          <motion.p 
            initial={{ y: -5, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="text-lg mb-8 max-w-2xl mx-auto"
          >
            Dukung kegiatan dan program masjid melalui partisipasi maupun donasi Anda
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link 
              href="/donasi" 
              className="px-6 py-3 bg-white text-emerald-700 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center"
            >
              Donasi Sekarang <HeartHandshake className="ml-2" />
            </Link>
            <Link 
              href="/agenda" 
              className="px-6 py-3 bg-emerald-800 text-white rounded-lg font-medium hover:bg-emerald-900 transition-colors flex items-center"
            >
              Lihat Kegiatan <CalendarDays className="ml-2" />
            </Link>
            <Link 
              href="/relawan" 
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center"
            >
              Jadi Relawan <Users className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Masjid Baitul Makmur</h3>
              <p className="mb-4">
                Pusat ibadah, pendidikan, dan kegiatan sosial masyarakat di Jakarta Barat.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Tautan Cepat</h3>
              <ul className="space-y-2">
                <li><Link href="/tentang" className="hover:text-white transition-colors">Tentang Kami</Link></li>
                <li><Link href="/jadwal" className="hover:text-white transition-colors">Jadwal Sholat</Link></li>
                <li><Link href="/kajian" className="hover:text-white transition-colors">Kajian Rutin</Link></li>
                <li><Link href="/donasi" className="hover:text-white transition-colors">Donasi</Link></li>
                <li><Link href="/kontak" className="hover:text-white transition-colors">Kontak</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Layanan</h3>
              <ul className="space-y-2">
                <li><Link href="/tpa" className="hover:text-white transition-colors">TPA/TPQ</Link></li>
                <li><Link href="/zakat" className="hover:text-white transition-colors">Zakat & Infaq</Link></li>
                <li><Link href="/pernikahan" className="hover:text-white transition-colors">Pernikahan</Link></li>
                <li><Link href="/sosial" className="hover:text-white transition-colors">Kegiatan Sosial</Link></li>
                <li><Link href="/tahfiz" className="hover:text-white transition-colors">Tahfiz Book</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Kontak</h3>
              <address className="not-italic space-y-2">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Jl. Kebon Jeruk No. 45, Jakarta Barat, Indonesia</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  <span>(021) 12345678</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  <span>info@baitulmakmur.id</span>
                </div>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
            <p>© {new Date().getFullYear()} Masjid Baitul Makmur. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home