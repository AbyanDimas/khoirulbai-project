'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Clock, Compass, Calendar, Sunrise, Sunset, House, Link, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

const JadwalSholat = () => {
  const [location, setLocation] = useState('Masjid Khoirul Ba\'i STM ADB');
  const [date, setDate] = useState(new Date());
  const [jadwal, setJadwal] = useState([
    { name: 'Subuh', time: '04:30', icon: <Sunrise className="w-5 h-5" />, active: false },
    { name: 'Syuruq', time: '05:45', icon: <Sunrise className="w-5 h-5" />, active: false },
    { name: 'Dzuhur', time: '12:00', icon: <Compass className="w-5 h-5" />, active: true },
    { name: 'Ashar', time: '15:15', icon: <Sunset className="w-5 h-5" />, active: false },
    { name: 'Maghrib', time: '18:00', icon: <Sunset className="w-5 h-5" />, active: false },
    { name: 'Isya', time: '19:15', icon: <House className="w-5 h-5" />, active: false },
  ]);

  // Update waktu sholat yang aktif
  useEffect(() => {
    const checkActivePrayer = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentTime = hours * 60 + minutes;

      const updatedJadwal = jadwal.map(prayer => {
        const [prayerHours, prayerMinutes] = prayer.time.split(':').map(Number);
        const prayerTime = prayerHours * 60 + prayerMinutes;
        
        // Cek jika waktu saat ini berada dalam 15 menit sebelum waktu sholat
        return {
          ...prayer,
          active: currentTime >= prayerTime - 15 && currentTime < prayerTime + 15
        };
      });

      setJadwal(updatedJadwal);
    };

    const interval = setInterval(checkActivePrayer, 60000); // Update setiap menit
    checkActivePrayer(); // Panggil sekali saat mount

    return () => clearInterval(interval);
  }, []);

  // Format tanggal
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('id-ID', options);
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
          <h1 className="text-3xl font-bold dark:text-white">Jadwal Sholat</h1>
          <p className="text-gray-600 dark:text-gray-400">Waktu sholat harian untuk Masjid Khoirul Ba\'i STM ADB</p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
          <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span className="dark:text-white">{formatDate(date)}</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-6 mb-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <div>
              <h3 className="font-bold dark:text-white">Lokasi Saat Ini</h3>
              <p className="text-gray-600 dark:text-gray-400">{location}</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
            <Compass className="w-4 h-4" />
            <span>Ubah Lokasi</span>
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jadwal.map((sholat, index) => (
          <motion.div
            key={sholat.name}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.3, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            className={`relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${sholat.active 
              ? 'ring-2 ring-emerald-500 bg-emerald-50 dark:bg-emerald-900/30' 
              : 'bg-white dark:bg-gray-800'
            }`}
          >
            {sholat.active && (
              <div className="absolute top-0 right-0 bg-emerald-600 text-white text-xs px-2 py-1 rounded-bl-lg">
                WAKTU SHOLAT
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${sholat.active 
                    ? 'bg-emerald-100 dark:bg-emerald-800' 
                    : 'bg-gray-100 dark:bg-gray-700'
                  }`}>
                    {sholat.icon}
                  </div>
                  <h2 className={`text-xl font-bold ${sholat.active 
                    ? 'text-emerald-700 dark:text-emerald-300' 
                    : 'dark:text-white'
                  }`}>
                    {sholat.name}
                  </h2>
                </div>
                <div className={`text-2xl font-mono ${sholat.active 
                  ? 'text-emerald-600 dark:text-emerald-400' 
                  : 'dark:text-white'
                }`}>
                  {sholat.time}
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <button className="text-sm px-3 py-1 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Pengingat</span>
                </button>
                <Link 
                  href={`/jadwal-sholat/${sholat.name.toLowerCase()}`}
                  className="text-sm flex items-center text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Detail <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="text-xl font-bold dark:text-white mb-2">Informasi Tambahan</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Jadwal sholat ini dihitung berdasarkan lokasi masjid. Waktu Imsak dan Syuruq juga tersedia.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href="/jadwal-sholat/bulanan"
              className="flex items-center justify-center px-4 py-2 border border-emerald-600 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors"
            >
              Lihat Bulanan
            </Link>
            <Link
              href="/pengaturan/jadwal-sholat"
              className="flex items-center justify-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Pengaturan
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default JadwalSholat;
