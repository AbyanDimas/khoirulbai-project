'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, Suspense } from 'react';

const availablePages = [
  { path: '/', name: 'Beranda', description: 'Halaman utama' },
  { path: '/agenda', name: 'Agenda', description: 'Jadwal kegiatan masjid' },
  { path: '/alquran', name: 'Al-Quran', description: 'Baca Al-Quran digital' },
  { path: '/alquran/surah/[nomor]', name: 'Surah Al-Quran', description: 'Baca surah Al-Quran' },
  { path: '/alquran/surah/[nomor]/tafsir', name: 'Tafsir Surah', description: 'Tafsir ayat Al-Quran' },
  { path: '/berita', name: 'Berita', description: 'Berita dan pengumuman masjid' },
  { path: '/berita/[id]', name: 'Detail Berita', description: 'Detail berita masjid' },
  { path: '/berita/galeri', name: 'Galeri Berita', description: 'Galeri foto kegiatan' },
  { path: '/donasi', name: 'Donasi', description: 'Donasi dan infaq masjid' },
  { path: '/galeri', name: 'Galeri', description: 'Galeri foto kegiatan masjid' },
  { path: '/jadwal-sholat', name: 'Jadwal Sholat', description: 'Jadwal sholat harian' },
  { path: '/jadwal/jumat', name: 'Jadwal Sholat Jumat', description: 'Jadwal khutbah dan imam' },
  { path: '/jadwal/kultum-pengajian', name: 'Jadwal Kultum & Pengajian', description: 'Jadwal kajian rutin' },
  { path: '/keuangan', name: 'Keuangan', description: 'Informasi keuangan masjid' },
  { path: '/kontak', name: 'Kontak', description: 'Hubungi pengurus masjid' },
  { path: '/laporan/keuangan', name: 'Laporan Keuangan', description: 'Transparansi keuangan masjid' },
  { path: '/laporan/waqaf', name: 'Laporan Waqaf', description: 'Laporan donasi waqaf' },
  { path: '/pengumuman', name: 'Pengumuman', description: 'Pengumuman penting masjid' },
  { path: '/profil', name: 'Profil', description: 'Profil masjid' },
  { path: '/program-kerja', name: 'Program Kerja', description: 'Program kerja masjid' },
  { path: '/tausiyah', name: 'Tausiyah', description: 'Artikel islami' },
  { path: '/tentang-kami', name: 'Tentang Kami', description: 'Tentang masjid kami' },
  { path: '/zakat-infaq', name: 'Zakat & Infaq', description: 'Informasi zakat dan infaq' },
  { path: '/sign-in', name: 'Sign In', description: 'Masuk ke akun anda' },
  { path: '/sign-up', name: 'Sign Up', description: 'Daftar akun baru' }
];

function SearchPageContent({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = searchParams.q as string;
  const [mounted, setMounted] = useState(false);

  const searchResults = query
    ? availablePages.filter((page) =>
        page.name.toLowerCase().includes(query.toLowerCase()) ||
        page.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

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
              
              {searchResults.length > 0 ? (
                <motion.ul 
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="space-y-4"
                >
                  {searchResults.map((page) => (
                    <motion.li 
                      key={page.path}
                      variants={item}
                      whileHover={{ scale: 1.02 }}
                    >
                      <a
                        href={page.path}
                        className="block p-5 bg-white dark:bg-gray-800 hover:bg-emerald-50 dark:hover:bg-gray-700 rounded-xl transition-all border border-gray-200 dark:border-gray-700 shadow-sm"
                      >
                        <h3 className="font-medium text-lg text-emerald-700 dark:text-emerald-400">{page.name}</h3>
                        <p className="text-emerald-500 dark:text-emerald-300 text-sm mb-2">{page.path}</p>
                        <p className="text-gray-600 dark:text-gray-300">{page.description}</p>
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-300 dark:text-gray-600 mb-4">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <h2 className="text-xl font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Tidak ditemukan
                  </h2>
                  <p className="text-gray-500 dark:text-gray-500">
                    Tidak ada halaman yang cocok dengan pencarian Anda.
                  </p>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 dark:text-emerald-400">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </motion.div>
              <h2 className="text-2xl font-medium text-gray-800 dark:text-white mb-3">
                Silahkan gunakan kolom pencarian
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Ketik kata kunci di kolom pencarian navbar untuk menemukan halaman yang relevan.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent searchParams={searchParams} />
    </Suspense>
  );
}