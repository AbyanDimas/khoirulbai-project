import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Handshake, ChevronRight } from 'lucide-react';

export const WelcomeSection = () => {
  return (
    <section className="py-12 md:py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Bagian Gambar Profil */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3 max-w-md mx-auto lg:mx-0"
          >
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/ketua.JPG"
                alt="Ketua Masjid Khoirul Ba'i"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 30vw"
              />
            </div>
            <div className="mt-4 text-center lg:text-left">
              <h4 className="font-bold text-lg dark:text-white">Nama Ketua Masjid</h4>
              <p className="text-gray-600 dark:text-gray-400">Ketua Takmir Masjid Khoirul Ba'i</p>
            </div>
          </motion.div>

          {/* Bagian Sambutan dengan card rounded untuk mobile */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/3"
          >
            <div className="flex items-center mb-3">
              <div className="bg-emerald-100 dark:bg-emerald-900/20 p-2 rounded-full mr-3">
                <Handshake className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-emerald-600 dark:text-emerald-400 font-medium">Sambutan Ketua</h2>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 dark:text-white">
              Assalamu'alaikum Warahmatullahi Wabarakatuh
            </h3>
            
            {/* Container untuk mobile dengan card rounded */}
            <div className="md:hidden space-y-3 mb-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <p className="text-gray-700 dark:text-gray-300">Assalamu'alaikum wr wb</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <p className="text-gray-700 dark:text-gray-300">
                  Segala Puja dan puji hanya milik Allah SWT Tuhan pencipta Alam Raya yang telah memberikan 
                  limpahan Rahmat Karunia dan Nikmat yang tak terhingga. Shalawat dan salam semoga senantiasa 
                  Allah SWT curahkan kepada Rasulullah SAW beserta keluarga para sahabat dan orang orang yang 
                  istiqamah menghidupkan Sunnah Sunah nya.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <p className="text-gray-700 dark:text-gray-300">
                  Masjid adalah pusat peradaban, fungsi masjid dibangun tidak hanya sebagai tempat ibadah mahdhoh. 
                  Rasulullah SAW prioritas utama membangun peradaban umat manusia adalah membangun Masjid Nabawi 
                  kemudian menjadikan Masjid sebagai pusat kegiatan ibadah, pendidikan, dakwah, sosial dan riyadhoh. 
                  Berawal dari Masjid Rasulullah merubah peradaban manusia "minna dhumati ila Nur" dari peradaban 
                  jahiliyah kepada peradaban Islam yang penuh cahaya.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <p className="text-gray-700 dark:text-gray-300">
                  Sesungguhnya orang orang yang pantas memakmurkan masjid adalah orang orang yang beriman kepada 
                  Allah SWT dan hari akhir serta tetap mendirikan sholat menunaikan zakat dan tidak takut kepada 
                  siapa saja kecuali kepada Allah SWT. (Qs. At Taubah 18). Berangkat dari sini marilah dengan Hati 
                  yang bersih dan keihlasan kita bersama sama bangun karakter siswa siswa kita dari Masjid. Membentuk 
                  pribadi yang religius, cerdas, tangkas dan inovatif.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <p className="text-gray-700 dark:text-gray-300">
                  Teriring ucapan terima kasih yang mendalam atas kesediaan dan keihlasan Bapak/Ibu menjadi pengurus 
                  Masjid Khoirul Ba'i, hanya kepada Allah SWT kita berharap dan hanya kepada Allah kembali semua urusan. 
                  Kritik saran dan perbaikan kami harapkan. Mohon maaf atas segala kekurangan.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <p className="text-gray-700 dark:text-gray-300">Wassalamualaikum wr. wb.</p>
              </div>
            </div>

            {/* Container untuk desktop (tampilan normal) */}
            <div className="hidden md:block space-y-4 text-gray-700 dark:text-gray-300 mb-6">
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
            
            <Link 
              href="/profil" 
              className="inline-flex items-center px-5 py-2 md:px-6 md:py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm md:text-base"
            >
              Baca Selengkapnya <ChevronRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};