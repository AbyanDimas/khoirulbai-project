'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Handshake, ChevronLeft, House, Users, BookOpen } from 'lucide-react';
import Link from 'next/link';

export const ProfilePage = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Header Profil */}
      <section className="relative bg-emerald-700 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/masjid-pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ChevronLeft className="mr-1" /> Kembali ke Beranda
          </Link>
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-2"
          >
            Sambutan Ketua Takmir
          </motion.h1>
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg"
          >
            Masjid Khoirul Ba'i
          </motion.p>
        </div>
      </section>

      {/* Konten Profil */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Bagian Gambar Profil */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/3"
            >
              <div className="sticky top-24">
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg mb-6">
                  <Image
                    src="/images/ketua.JPG"
                    alt="Ketua Masjid Khoirul Ba'i"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="bg-emerald-50 dark:bg-gray-800 p-6 rounded-lg">
                  <h3 className="font-bold text-xl dark:text-white mb-2">Nama Ketua</h3>
                  <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-4">Ketua Takmir Masjid Khoirul Ba'i</p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <House className="h-5 w-5 text-emerald-600 mr-3" />
                      <span className="dark:text-gray-300">Masjid Khoirul Ba'i</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-emerald-600 mr-3" />
                      <span className="dark:text-gray-300">Pengurus sejak 2020</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bagian Sambutan */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-full lg:w-2/3 bg-white dark:bg-gray-800/50 p-6 md:p-8 rounded-lg shadow-sm"
            >
              <div className="flex items-center mb-6">
                <div className="bg-emerald-100 dark:bg-emerald-900/20 p-2 rounded-full mr-3">
                  <Handshake className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-emerald-600 dark:text-emerald-400 font-medium text-lg">Sambutan Ketua Takmir</h2>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-6 dark:text-white">
                Assalamu'alaikum Warahmatullahi Wabarakatuh
              </h3>
              
              <div className="prose dark:prose-invert max-w-none space-y-4">
                <p>Assalamu'alaikum wr wb</p>
                
                <p>
                  Segala Puja dan puji hanya milik Allah SWT Tuhan pencipta Alam Raya yang telah memberikan 
                  limpahan Rahmat Karunia dan Nikmat yang tak terhingga. Shalawat dan salam semoga senantiasa 
                  Allah SWT curahkan kepada Rasulullah SAW beserta keluarga para sahabat dan orang orang yang 
                  istiqamah menghidupkan Sunnah Sunah nya.
                </p>
                
                <p>
                  Masjid adalah pusat peradaban, fungsi masjid dibangun tidak hanya sebagai tempat ibadah mahdhoh. 
                  Rasulullah SAW prioritas utama membangun peradaban umat manusia adalah membangun Masjid Nabawi 
                  kemudian menjadikan Masjid sebagai pusat kegiatan ibadah, pendidikan, dakwah, sosial dan riyadhoh. 
                  Berawal dari Masjid Rasulullah merubah peradaban manusia "minna dhumati ila Nur" dari peradaban 
                  jahiliyah kepada peradaban Islam yang penuh cahaya.
                </p>
                
                <p>
                  Sesungguhnya orang orang yang pantas memakmurkan masjid adalah orang orang yang beriman kepada 
                  Allah SWT dan hari akhir serta tetap mendirikan sholat menunaikan zakat dan tidak takut kepada 
                  siapa saja kecuali kepada Allah SWT. (Qs. At Taubah 18). Berangkat dari sini marilah dengan Hati 
                  yang bersih dan keihlasan kita bersama sama bangun karakter siswa siswa kita dari Masjid. Membentuk 
                  pribadi yang religius, cerdas, tangkas dan inovatif.
                </p>
                
                <p>
                  Teriring ucapan terima kasih yang mendalam atas kesediaan dan keihlasan Bapak/Ibu menjadi pengurus 
                  Masjid Khoirul Ba'i, hanya kepada Allah SWT kita berharap dan hanya kepada Allah kembali semua urusan. 
                  Kritik saran dan perbaikan kami harapkan. Mohon maaf atas segala kekurangan.
                </p>
                
                <p>Wassalamualaikum wr. wb.</p>
              </div>

              {/* Info Tambahan */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-emerald-50 dark:bg-gray-800 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <BookOpen className="h-6 w-6 text-emerald-600 mr-3" />
                    <h4 className="font-bold text-lg dark:text-white">Visi Masjid</h4>
                  </div>
                  <p className="dark:text-gray-300">
                    Menjadikan Masjid Khoirul Ba'i sebagai pusat peradaban muslim yang unggul dalam ibadah, 
                    pendidikan, dan sosial masyarakat.
                  </p>
                </div>
                <div className="bg-emerald-50 dark:bg-gray-800 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <BookOpen className="h-6 w-6 text-emerald-600 mr-3" />
                    <h4 className="font-bold text-lg dark:text-white">Misi Masjid</h4>
                  </div>
                  <ul className="list-disc pl-5 space-y-2 dark:text-gray-300">
                    <li>Meningkatkan kualitas ibadah jamaah</li>
                    <li>Menyelenggarakan pendidikan Islam berkualitas</li>
                    <li>Memperkuat ukhuwah islamiyah</li>
                    <li>Memberdayakan masyarakat melalui program sosial</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;