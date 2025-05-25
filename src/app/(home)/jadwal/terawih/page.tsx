'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  CalendarDays,
  Clock,
  ChevronDown,
  ChevronUp,
  Moon,
  Star,
  House,
  User,
  BookOpen,
  Share2,
  Download,
  ArrowLeft,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

type PrayerSchedule = {
  date: string
  day: string
  imam: string
  bilal: string
  speaker: string
  theme: string
  notes?: string
}

const JadwalTarawihPage = () => {
  const [expandedDate, setExpandedDate] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth() + 1)
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear())

  // Mock data - replace with API call
  const generateSchedule = (month: number, year: number): PrayerSchedule[] => {
    const daysInMonth = new Date(year, month, 0).getDate()
    const schedules: PrayerSchedule[] = []
    const imams = ['Ust. Ahmad Farid', 'Ust. Muhammad Ali', 'Ust. Abdullah Haidar', 'Ust. Adi Hidayat']
    const bilals = ['Br. Faisal', 'Br. Rahman', 'Br. Ismail', 'Br. Yusuf']
    const speakers = ['Ust. Abdul Somad', 'Ust. Hanan Attaki', 'Ust. Khalid Basalamah', 'Ust. Syafiq Riza']
    const themes = [
      'Keutamaan Ramadhan',
      'Tadabbur Al-Quran',
      'Peningkatan Iman',
      'Pemurnian Tauhid',
      'Akhlak Mulia',
      'Persiapan Hidup setelah Ramadhan'
    ]

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month - 1, i)
      const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
      
      schedules.push({
        date: `${i}/${month}/${year}`,
        day: dayNames[date.getDay()],
        imam: imams[i % imams.length],
        bilal: bilals[i % bilals.length],
        speaker: speakers[i % speakers.length],
        theme: themes[i % themes.length],
        notes: i % 5 === 0 ? 'Sholat witir 3 rakaat' : undefined
      })
    }

    return schedules
  }

  const schedules = generateSchedule(currentMonth, currentYear)

  const toggleExpand = (date: string) => {
    setExpandedDate(expandedDate === date ? null : date)
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 1) {
        setCurrentMonth(12)
        setCurrentYear(currentYear - 1)
      } else {
        setCurrentMonth(currentMonth - 1)
      }
    } else {
      if (currentMonth === 12) {
        setCurrentMonth(1)
        setCurrentYear(currentYear + 1)
      } else {
        setCurrentMonth(currentMonth + 1)
      }
    }
  }

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-emerald-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center"
          >
            <Moon className="mr-2" size={30} />
            Jadwal Sholat Tarawih
          </motion.h1>
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg"
          >
            Ramadhan {currentYear} H / {currentYear} M - Masjid Khoirul Ba'i
          </motion.p>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="container mx-auto px-4 -mt-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <button 
              onClick={() => navigateMonth('prev')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            
            <h2 className="text-xl font-bold dark:text-white">
              {monthNames[currentMonth - 1]} {currentYear}
            </h2>
            
            <button 
              onClick={() => navigateMonth('next')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Schedule Table */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
        >
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-gray-100 dark:bg-gray-700 p-4 font-medium text-sm">
            <div className="col-span-2 md:col-span-1 dark:text-white">Tanggal</div>
            <div className="col-span-2 md:col-span-1 dark:text-white">Hari</div>
            <div className="col-span-4 md:col-span-2 dark:text-white">Imam</div>
            <div className="hidden md:block md:col-span-2 dark:text-white">Bilal</div>
            <div className="hidden md:block md:col-span-3 dark:text-white">Khatib</div>
            <div className="col-span-4 md:col-span-2 dark:text-white">Tema</div>
            <div className="col-span-2 md:col-span-1"></div>
          </div>

          {/* Table Body */}
          {schedules.map((schedule, index) => (
            <motion.div
              key={schedule.date}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              className="border-b border-gray-200 dark:border-gray-700 last:border-0"
            >
              <div 
                className="grid grid-cols-12 items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => toggleExpand(schedule.date)}
              >
                <div className="col-span-2 md:col-span-1">
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1 text-emerald-600 dark:text-emerald-400" />
                    <span className="dark:text-white">{schedule.date.split('/')[0]}</span>
                  </div>
                </div>
                <div className="col-span-2 md:col-span-1 dark:text-white">{schedule.day}</div>
                <div className="col-span-4 md:col-span-2">
                  <div className="flex items-center">
                    <House className="h-4 w-4 mr-1 text-emerald-600 dark:text-emerald-400" />
                    <span className="dark:text-white">{schedule.imam}</span>
                  </div>
                </div>
                <div className="hidden md:block md:col-span-2 dark:text-white">{schedule.bilal}</div>
                <div className="hidden md:block md:col-span-3">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1 text-emerald-600 dark:text-emerald-400" />
                    <span className="dark:text-white">{schedule.speaker}</span>
                  </div>
                </div>
                <div className="col-span-4 md:col-span-2">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1 text-emerald-600 dark:text-emerald-400" />
                    <span className="dark:text-white line-clamp-1">{schedule.theme}</span>
                  </div>
                </div>
                <div className="col-span-2 md:col-span-1 flex justify-end">
                  {expandedDate === schedule.date ? (
                    <ChevronUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  )}
                </div>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {expandedDate === schedule.date && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-emerald-50 dark:bg-emerald-900/20 overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                      <div>
                        <h4 className="font-medium dark:text-white mb-2 flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-emerald-600 dark:text-emerald-400" />
                          Waktu Pelaksanaan
                        </h4>
                        <p className="dark:text-gray-300">Ba'da Isya - Selesai (± 1.5 jam)</p>
                      </div>
                      <div>
                        <h4 className="font-medium dark:text-white mb-2 flex items-center">
                          <Star className="h-4 w-4 mr-2 text-emerald-600 dark:text-emerald-400" />
                          Catatan Khusus
                        </h4>
                        <p className="dark:text-gray-300">
                          {schedule.notes || 'Tidak ada catatan khusus'}
                        </p>
                      </div>
                      <div className="md:col-span-2">
                        <div className="flex space-x-3 pt-2">
                          <button className="flex items-center px-3 py-2 bg-white dark:bg-gray-700 rounded-lg text-sm font-medium">
                            <Share2 className="h-4 w-4 mr-2" />
                            Bagikan
                          </button>
                          <button className="flex items-center px-3 py-2 bg-white dark:bg-gray-700 rounded-lg text-sm font-medium">
                            <Download className="h-4 w-4 mr-2" />
                            Unduh
                          </button>
                          <Link 
                            href={`/jadwal-tarawih/${schedule.date}`} 
                            className="flex items-center px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium"
                          >
                            Detail
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Additional Info */}
      <div className="container mx-auto px-4 pb-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold mb-4 dark:text-white flex items-center">
            <Moon className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-400" />
            Informasi Tambahan
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium dark:text-white mb-2">Tata Cara Sholat Tarawih</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Dilaksanakan setelah sholat Isya</li>
                <li>Biasanya 11 atau 23 rakaat dengan witir</li>
                <li>Dianjurkan berjamaah di masjid</li>
                <li>Disunnahkan untuk khusyu' dan tuma'ninah</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium dark:text-white mb-2">Keutamaan Sholat Tarawih</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Diampuni dosa-dosa yang telah lalu</li>
                <li>Pahala seperti sholat semalam penuh</li>
                <li>Termasuk qiyamul lail yang utama</li>
                <li>Mendapatkan keberkahan Ramadhan</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default JadwalTarawihPage