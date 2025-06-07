'use client';

import { motion } from 'framer-motion';
import { CalendarDays, Clock, MapPin, ChevronRight, Users, BookOpen, House, MoonStar } from 'lucide-react';
import Link from 'next/link';
import { JSX, useEffect, useState } from 'react';

type AgendaItem = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  location: string;
  category: string;
  color: string;
  icon: JSX.Element;
};

const categoryColors = {
  sholat: "bg-blue-600 dark:bg-blue-300",
  pengajian: "bg-green-600 dark:bg-green-300",
  event: "bg-purple-600 dark:bg-purple-300",
  belajar: "bg-amber-600 dark:bg-amber-300",
  ramadhan: "bg-emerald-600 dark:bg-emerald-300"
};

const categoryIcons = {
  sholat: <House className="w-6 h-6 text-blue-600 dark:text-blue-300" />,
  pengajian: <BookOpen className="w-6 h-6 text-green-600 dark:text-green-300" />,
  event: <MoonStar className="w-6 h-6 text-purple-600 dark:text-purple-300" />,
  belajar: <BookOpen className="w-6 h-6 text-amber-600 dark:text-amber-300" />,
  ramadhan: <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
};

const categoryBackgrounds = {
  sholat: "bg-blue-100 dark:bg-blue-900",
  pengajian: "bg-green-100 dark:bg-green-900",
  event: "bg-purple-100 dark:bg-purple-900",
  belajar: "bg-amber-100 dark:bg-amber-900",
  ramadhan: "bg-emerald-100 dark:bg-emerald-900"
};

export default function Agenda() {
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgendaItems = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agenda?populate=*`);
        if (!response.ok) {
          throw new Error('Failed to fetch agenda items');
        }
        const data = await response.json();

        const formattedItems = data.data.map((item: any) => {
          // Determine category based on tag_kegiatan or default to 'event'
          const category = item.attributes.tag_kegiatan?.toLowerCase() || 'event';
          const normalizedCategory = Object.keys(categoryColors).includes(category) 
            ? category 
            : 'event';

          const startDate = new Date(item.attributes.tanggal_mulai);
          const endDate = new Date(item.attributes.tanggal_selesai);

          return {
            id: item.id.toString(),
            title: item.attributes.judul,
            startDate: startDate.toLocaleDateString('id-ID', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }),
            endDate: endDate.toLocaleDateString('id-ID', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }),
            description: item.attributes.deskripsi || 'Tidak ada deskripsi',
            location: item.attributes.lokasi || 'Lokasi tidak ditentukan',
            category: normalizedCategory,
            color: categoryBackgrounds[normalizedCategory as keyof typeof categoryBackgrounds],
            icon: categoryIcons[normalizedCategory as keyof typeof categoryIcons]
          };
        });

        setAgendaItems(formattedItems);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching agenda items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgendaItems();
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="mx-auto w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <CalendarDays className="text-gray-400" size={40} />
          </div>
          <h3 className="text-lg font-medium dark:text-white">Error loading agenda</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

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

      {agendaItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <CalendarDays className="text-gray-400" size={40} />
          </div>
          <h3 className="text-lg font-medium dark:text-white">Belum ada agenda tersedia</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Agenda kegiatan akan ditampilkan di sini</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agendaItems.map((event, index) => (
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
                    <span className="dark:text-white text-sm">{event.startDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-600 dark:text-gray-300 mr-2" />
                    <span className="dark:text-white text-sm">
                      {new Date(event.startDate).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} - {' '}
                      {new Date(event.endDate).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </span>
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
      )}

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