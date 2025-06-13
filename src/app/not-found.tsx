'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowRight, Search, CalendarDays, Clock4, Megaphone } from 'lucide-react'

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4"
    >
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="flex justify-center mb-6"
        >
          <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-red-500 dark:text-red-400 h-16 w-16"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-3"
        >
          Halaman Tidak Ditemukan
        </motion.h1>

        <motion.p
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-400 mb-8"
        >
          Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <Link
            href="/"
            className="flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            <Home className="h-5 w-5 mr-2" />
            Kembali ke Beranda
          </Link>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            <Link
              href="/agenda"
              className="flex items-center px-4 py-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors duration-200"
            >
              <CalendarDays className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-400" />
              <span>Agenda Masjid</span>
              <ArrowRight className="h-4 w-4 ml-auto text-gray-400" />
            </Link>

            <Link
              href="/jadwal-jumat"
              className="flex items-center px-4 py-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors duration-200"
            >
              <Clock4 className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-400" />
              <span>Jadwal Jumat</span>
              <ArrowRight className="h-4 w-4 ml-auto text-gray-400" />
            </Link>

            <Link
              href="/tausiyah"
              className="flex items-center px-4 py-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors duration-200"
            >
              <Megaphone className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-400" />
              <span>tausiyah</span>
              <ArrowRight className="h-4 w-4 ml-auto text-gray-400" />
            </Link>

            <Link
              href="/search"
              className="flex items-center px-4 py-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors duration-200"
            >
              <Search className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-400" />
              <span>Cari Konten</span>
              <ArrowRight className="h-4 w-4 ml-auto text-gray-400" />
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default NotFound