'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Clock, Calendar, Mic, User, House } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const JadwalJumat = () => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const jadwalKhutbah = [
    {
      id: 1,
      date: new Date(2024, 5, 7),
      khatib: "Ust. Ahmad Fauzi, Lc.",
      tema: "Memakmurkan Masjid di Era Digital",
      waktu: "12:00 - 13:30 WIB",
      lokasi: "Masjid Khoirul Ba'i STM ADB"
    },
    {
      id: 2,
      date: new Date(2024, 5, 14),
      khatib: "Dr. Muhammad Ali, M.Ag.",
      tema: "Menjaga Ukhuwah di Tengah Perbedaan",
      waktu: "12:00 - 13:30 WIB",
      lokasi: "Masjid Khoirul Ba'i STM ADB"
    },
    {
      id: 3,
      date: new Date(2024, 5, 21),
      khatib: "Ust. Abdullah Rahman, S.H.I.",
      tema: "Keseimbangan Dunia dan Akhirat",
      waktu: "12:00 - 13:30 WIB",
      lokasi: "Masjid Khoirul Ba'i STM ADB"
    },
    {
      id: 4,
      date: new Date(2024, 5, 28),
      khatib: "Ust. Bambang Sugianto, M.Pd.",
      tema: "Pendidikan Anak dalam Islam",
      waktu: "12:00 - 13:30 WIB",
      lokasi: "Masjid Khoirul Ba'i STM ADB"
    }
  ];

  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    };
    return date.toLocaleDateString('id-ID', options);
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Jadwal Khutbah Jumat</h1>
          <p className="text-gray-600 dark:text-gray-400">Jadwal lengkap khutbah Jumat di Masjid Khoirul Ba'i STM ADB</p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
          <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span className="dark:text-white">{months[month]} {year}</span>
        </div>
      </motion.div>

      {/* Month Navigation */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-8"
      >
        <button 
          onClick={prevMonth}
          className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          &larr; Bulan Sebelumnya
        </button>
        <button 
          onClick={nextMonth}
          className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Bulan Selanjutnya &rarr;
        </button>
      </motion.div>

      {/* Jadwal List */}
      <div className="grid grid-cols-1 gap-6 mb-12">
        {jadwalKhutbah.filter(j => j.date.getMonth() === month && j.date.getFullYear() === year).map((jadwal, index) => (
          <motion.div
            key={jadwal.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.3, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                      <House className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h2 className="text-xl font-bold dark:text-white">{formatDate(jadwal.date)}</h2>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <User className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-2" />
                      <span className="dark:text-white">{jadwal.khatib}</span>
                    </div>
                    <div className="flex items-center">
                      <Mic className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-2" />
                      <span className="dark:text-white font-medium">{jadwal.tema}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-2" />
                      <span className="dark:text-white">{jadwal.waktu}</span>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/3">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg h-full">
                    <h3 className="font-bold dark:text-white mb-2">Informasi Tambahan</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                      <li>• Sholat Jumat 2 rakaat</li>
                      <li>• Khutbah bahasa Indonesia</li>
                      <li>• Tempat terbatas, datang lebih awal</li>
                      <li>• Parkir di area yang disediakan</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <Link 
                  href={`/jadwal-jumat/${jadwal.id}`}
                  className="text-sm flex items-center text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Detail Jadwal <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
                <button className="text-sm px-3 py-1 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                  Set Pengingat
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {jadwalKhutbah.filter(j => j.date.getMonth() === month && j.date.getFullYear() === year).length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center"
        >
          <div className="mx-auto max-w-md">
            <Calendar className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold dark:text-white mb-2">Belum Ada Jadwal</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Jadwal khutbah Jumat untuk bulan {months[month]} {year} belum tersedia. Silakan cek bulan lainnya atau hubungi takmir masjid.
            </p>
            <div className="flex justify-center gap-3">
              <button 
                onClick={prevMonth}
                className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Cek Bulan Sebelumnya
              </button>
              <Link
                href="/kontak"
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Hubungi Takmir
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="text-xl font-bold dark:text-white mb-2">Ingin Menjadi Khatib?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Jika Anda ingin menjadi khatib Jumat di Masjid Khoirul Ba'i STM ADB, silakan hubungi takmir masjid.
            </p>
          </div>
          <Link
            href="/kontak"
            className="flex items-center justify-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Daftar Sebagai Khatib
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default JadwalJumat;