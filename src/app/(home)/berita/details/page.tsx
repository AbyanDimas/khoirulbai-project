'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowLeft,
  Clock,
  Bookmark,
  Share2,
  MoreHorizontal,
  User,
  MessageSquare,
  ThumbsUp,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Link as LinkIcon,
  CalendarDays
} from 'lucide-react'

const BeritaDetails = ({ params }: { params: { id: string } }) => {
  // In a real app, you would fetch this data from an API based on params.id
  const berita = {
    id: params.id,
    title: "Masjid Khoirul Ba'i Gelar Pengajian Bulanan dengan Tema Keikhlasan",
    content: `
      <p class="mb-4">Pengajian bulanan Masjid Khoirul Ba'i kali ini menghadirkan Ustadz Ahmad Farid sebagai pembicara utama dengan tema "Keikhlasan dalam Beribadah". Acara yang digelar pada Sabtu, 15 Juni 2024 ini dihadiri oleh ratusan jamaah dari berbagai kalangan.</p>
      
      <p class="mb-4">Dalam ceramahnya yang berdurasi 90 menit, Ustadz Ahmad menjelaskan bahwa keikhlasan adalah ruh dari setiap ibadah. "Tanpa keikhlasan, ibadah kita hanyalah gerakan fisik tanpa makna," tegas beliau di hadapan jamaah.</p>
      
      <h2 class="text-xl font-bold my-4 dark:text-white">Poin-poin Penting</h2>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Keikhlasan adalah syarat diterimanya amal ibadah</li>
        <li>Tanda-tanda amal yang ikhlas</li>
        <li>Cara melatih diri untuk ikhlas</li>
        <li>Bahaya riya' dalam beribadah</li>
      </ul>
      
      <p class="mb-4">Acara yang berlangsung dari pukul 09.00 hingga 11.30 WIB ini juga diisi dengan sesi tanya jawab interaktif. Banyak jamaah yang antusias mengajukan pertanyaan seputar penerapan keikhlasan dalam kehidupan sehari-hari.</p>
      
      <div class="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg my-6">
        <h3 class="font-bold text-emerald-700 dark:text-emerald-300 mb-2">Jadwal Pengajian Selanjutnya</h3>
        <p>Sabtu, 20 Juli 2024 - Tema: "Menjaga Konsistensi Ibadah di Era Modern"</p>
      </div>
      
      <p>Pengurus masjid berharap kegiatan ini dapat terus berlanjut dan semakin banyak jamaah yang terbantu dengan materi-materi yang disampaikan. "Kami berkomitmen untuk selalu menghadirkan narasumber berkualitas demi peningkatan keimanan jamaah," ujar Ketua Takmir Masjid.</p>
    `,
    category: "Pengajian",
    date: "15 Juni 2024",
    time: "09:00 - 11:30 WIB",
    author: "Tim Media Masjid",
    location: "Aula Utama Masjid Khoirul Ba'i",
    image: "/pengajian-event.jpg",
    relatedNews: [
      {
        id: "2",
        title: "Jadwal Sholat Jumat Pekan Ini dengan Tema Keikhlasan",
        date: "1 hari lalu",
        category: "Jadwal"
      },
      {
        id: "3",
        title: "Rekaman Audio Pengajian Bulan Lalu: \"Ibadah Penuh Makna\"",
        date: "1 bulan lalu",
        category: "Audio"
      },
      {
        id: "4",
        title: "Dokumentasi Video Kegiatan Bulanan Masjid Khoirul Ba'i",
        date: "2 bulan lalu",
        category: "Video"
      }
    ]
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 dark:bg-gray-900 min-h-screen"
    >
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link 
              href="/berita" 
              className="flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
            >
              <ArrowLeft size={20} className="mr-2" />
              Kembali ke Berita
            </Link>
            
            <div className="flex items-center space-x-4">
              <button className="p-1 text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400">
                <Bookmark size={20} />
              </button>
              <button className="p-1 text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400">
                <Share2 size={20} />
              </button>
              <button className="p-1 text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Article Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <span className="inline-block bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm px-3 py-1 rounded-full mb-4">
            {berita.category}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold dark:text-white mb-4">{berita.title}</h1>
          
          <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 gap-4">
            <div className="flex items-center">
              <User size={16} className="mr-2" />
              {berita.author}
            </div>
            <div className="flex items-center">
              <CalendarDays size={16} className="mr-2" />
              {berita.date}
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-2" />
              {berita.time}
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative rounded-xl overflow-hidden mb-8 h-64 md:h-80 bg-gray-300 dark:bg-gray-700"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-sm">Lokasi: {berita.location}</p>
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="prose dark:prose-invert max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: berita.content }}
        />

        {/* Share Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="border-t border-b border-gray-200 dark:border-gray-700 py-6 mb-12"
        >
          <h3 className="font-bold dark:text-white mb-4">Bagikan Artikel Ini</h3>
          <div className="flex flex-wrap gap-3">
            <motion.button
              whileHover={{ y: -2 }}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-full text-sm"
            >
              <Facebook size={16} className="mr-2" />
              Facebook
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              className="flex items-center px-4 py-2 bg-sky-500 text-white rounded-full text-sm"
            >
              <Twitter size={16} className="mr-2" />
              Twitter
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded-full text-sm"
            >
              <MessageCircle size={16} className="mr-2" />
              WhatsApp
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              className="flex items-center px-4 py-2 bg-blue-700 text-white rounded-full text-sm"
            >
              <Linkedin size={16} className="mr-2" />
              LinkedIn
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full text-sm"
            >
              <LinkIcon size={16} className="mr-2" />
              Salin Link
            </motion.button>
          </div>
        </motion.div>

        {/* Comments Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h3 className="text-xl font-bold dark:text-white mb-6 flex items-center">
            <MessageSquare size={20} className="mr-2 text-emerald-600 dark:text-emerald-400" />
            Komentar (12)
          </h3>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow mb-4">
            <textarea
              placeholder="Tulis komentar Anda..."
              className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              rows={3}
            />
            <div className="flex justify-end mt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-sm"
              >
                Kirim Komentar
              </motion.button>
            </div>
          </div>
          
          {/* Sample Comment */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow mb-3">
            <div className="flex items-start">
              <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700 mr-3"></div>
              <div>
                <div className="flex items-center">
                  <h4 className="font-bold dark:text-white mr-2">Ahmad Surya</h4>
                  <span className="text-xs text-gray-500">2 hari lalu</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-1">Pengajian yang sangat bermanfaat, semoga diadakan rutin setiap bulan dengan tema-tema aktual seperti ini.</p>
                <div className="flex items-center mt-2">
                  <button className="flex items-center text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm mr-4">
                    <ThumbsUp size={14} className="mr-1" />
                    8
                  </button>
                  <button className="text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm">
                    Balas
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related News */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl font-bold dark:text-white mb-6">Berita Terkait</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {berita.relatedNews.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow"
              >
                <Link href={`/berita/${news.id}`} className="block">
                  <div className="h-40 bg-gray-300 dark:bg-gray-700"></div>
                  <div className="p-4">
                    <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-full mb-2">
                      {news.category}
                    </span>
                    <h4 className="font-bold dark:text-white line-clamp-2">{news.title}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{news.date}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </motion.div>
  )
}

export default BeritaDetails