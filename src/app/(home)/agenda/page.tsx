'use client';

import { motion } from 'framer-motion';
import { CalendarDays, Clock, MapPin, ChevronRight, Users, BookOpen, House, MoonStar } from 'lucide-react';
import Link from 'next/link';

const events = [
  {
    id: 1,
    title: "Sholat Jumat Berjamaah",
    date: "Jumat, 14 Juni 2024",
    time: "11:30 - 13:00 WIB",
    location: "Masjid Khoirul Ba'i STM ADB",
    description: "Sholat Jumat dengan khutbah oleh Ust. Ahmad Fauzi",
    category: "sholat",
    color: "bg-blue-100 dark:bg-blue-900",
    icon: <House className="w-6 h-6 text-blue-600 dark:text-blue-300" />
  },
  {
    id: 2,
    title: "Pengajian Rutin Mingguan",
    date: "Sabtu, 15 Juni 2024",
    time: "19:00 - 21:00 WIB",
    location: "Aula Masjid",
    description: "Kajian kitab Riyadhus Shalihin bersama Ust. Muhammad Ali",
    category: "pengajian",
    color: "bg-green-100 dark:bg-green-900",
    icon: <BookOpen className="w-6 h-6 text-green-600 dark:text-green-300" />
  },
  {
    id: 3,
    title: "Peringatan Isra' Mi'raj",
    date: "Minggu, 16 Juni 2024",
    time: "08:00 - 12:00 WIB",
    location: "Halaman Masjid",
    description: "Acara peringatan Isra' Mi'raj dengan berbagai kegiatan",
    category: "event",
    color: "bg-purple-100 dark:bg-purple-900",
    icon: <MoonStar className="w-6 h-6 text-purple-600 dark:text-purple-300" />
  },
  {
    id: 4,
    title: "Kelas Tahsin Al-Qur'an",
    date: "Senin, 17 Juni 2024",
    time: "16:00 - 18:00 WIB",
    location: "Ruang Belajar Masjid",
    description: "Pembelajaran tahsin untuk semua usia",
    category: "belajar",
    color: "bg-amber-100 dark:bg-amber-900",
    icon: <BookOpen className="w-6 h-6 text-amber-600 dark:text-amber-300" />
  },
  {
    id: 5,
    title: "Buka Puasa Bersama",
    date: "Selasa, 18 Juni 2024",
    time: "17:00 - 19:00 WIB",
    location: "Serambi Masjid",
    description: "Buka puasa bersama warga sekitar",
    category: "ramadhan",
    color: "bg-emerald-100 dark:bg-emerald-900",
    icon: <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
  },
  {
    id: 6,
    title: "Sholat Tarawih",
    date: "Rabu, 19 Juni 2024",
    time: "19:30 - 21:00 WIB",
    location: "Masjid Utama",
    description: "Sholat tarawih berjamaah 20 rakaat",
    category: "ramadhan",
    color: "bg-indigo-100 dark:bg-indigo-900",
    icon: <House className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
  }
];

const categoryColors = {
  sholat: "bg-blue-600 dark:bg-blue-300",
  pengajian: "bg-green-600 dark:bg-green-300",
  event: "bg-purple-600 dark:bg-purple-300",
  belajar: "bg-amber-600 dark:bg-amber-300",
  ramadhan: "bg-emerald-600 dark:bg-emerald-300"
};

export default function Agenda() {
  return (
    <section className="container mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Agenda Kegiatan</h1>
          <p className="text-gray-600 dark:text-gray-400">Jadwal kegiatan Masjid Khoirul Ba'i STM ADB</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Link 
            href="/agenda/lengkap" 
            className="flex items-center justify-center px-4 py-2 text-emerald-600 dark:text-emerald-400 hover:underline border border-emerald-600 dark:border-emerald-400 rounded-lg"
          >
            Lihat semua <ChevronRight className="ml-1" />
          </Link>
          <Link 
            href="/agenda/tambah" 
            className="flex items-center justify-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Ajukan Kegiatan
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.3, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            className={`relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 group ${event.color}`}
          >
            <div className="absolute top-4 right-4 flex items-center gap-1">
              <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[event.category as keyof typeof categoryColors]} text-white`}>
                {event.category}
              </span>
            </div>
            
            <div className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                  {event.icon}
                </div>
                <div>
                  <h2 className="text-xl font-bold dark:text-white">{event.title}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{event.description}</p>
                </div>
              </div>
              
              <div className="space-y-3 mt-4">
                <div className="flex items-center">
                  <CalendarDays className="h-5 w-5 text-gray-600 dark:text-gray-300 mr-2" />
                  <span className="dark:text-white text-sm">{event.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-600 dark:text-gray-300 mr-2" />
                  <span className="dark:text-white text-sm">{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-600 dark:text-gray-300 mr-2" />
                  <span className="dark:text-white text-sm">{event.location}</span>
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <Link 
                  href={`/agenda/${event.id}`}
                  className="text-sm flex items-center text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Detail kegiatan <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
                <button className="text-sm px-3 py-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Reminder
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-12 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="text-xl font-bold dark:text-white mb-2">Tidak menemukan kegiatan yang sesuai?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Anda bisa mengajukan kegiatan baru atau melihat semua agenda di arsip kami.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href="/agenda/arsip"
              className="flex items-center justify-center px-4 py-2 border border-emerald-600 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors"
            >
              Lihat Arsip
            </Link>
            <Link
              href="/agenda/tambah"
              className="flex items-center justify-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Ajukan Kegiatan
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}