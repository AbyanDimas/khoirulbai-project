'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, Clock, MapPin, ChevronRight, Users, Info, X } from 'lucide-react';
import Link from 'next/link';
import { JSX, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

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
  startTime: string;
  endTime: string;
};

const categoryColors = {
  sholat: "bg-emerald-600 dark:bg-emerald-300",
  pengajian: "bg-emerald-600 dark:bg-emerald-300",
  event: "bg-emerald-600 dark:bg-emerald-300",
  belajar: "bg-emerald-600 dark:bg-emerald-300",
  ramadhan: "bg-emerald-600 dark:bg-emerald-300"
};

const categoryIcons = {
  sholat: <Info className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />,
  pengajian: <Info className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />,
  event: <Info className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />,
  belajar: <Info className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />,
  ramadhan: <Info className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
};

const categoryBackgrounds = {
  sholat: "bg-emerald-100 dark:bg-emerald-900",
  pengajian: "bg-emerald-100 dark:bg-emerald-900",
  event: "bg-emerald-100 dark:bg-emerald-900",
  belajar: "bg-emerald-100 dark:bg-emerald-900",
  ramadhan: "bg-emerald-100 dark:bg-emerald-900"
};

export default function Agenda() {
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<AgendaItem | null>(null);

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
            icon: categoryIcons[normalizedCategory as keyof typeof categoryIcons],
            startTime: startDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            endTime: endDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
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
    <section className="container mx-auto px-4 py-12 relative">
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
                    <div className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                      <ReactMarkdown>{event.description}</ReactMarkdown>
                    </div>
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
                      {event.startTime} - {event.endTime}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-600 dark:text-gray-300 mr-2" />
                    <span className="dark:text-white text-sm">{event.location}</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <button 
                    onClick={() => setSelectedItem(event)}
                    className="text-sm flex items-center text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    Detail kegiatan <ChevronRight className="ml-1 h-4 w-4" />
                  </button>
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

      {/* Overlay for detail view */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-emerald-600 dark:bg-emerald-700 p-6 text-white sticky top-0 z-10">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-white/20">
                      <Info className="w-8 h-8" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">{selectedItem.title}</h1>
                      <p className="text-emerald-100">{selectedItem.category}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedItem(null)}
                    className="p-2 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="prose dark:prose-invert max-w-none mb-8">
                  <ReactMarkdown>{selectedItem.description}</ReactMarkdown>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-lg p-4">
                    <h3 className="font-medium text-lg mb-3 dark:text-white">Detail Waktu</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <CalendarDays className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2" />
                        <span className="dark:text-white">{selectedItem.startDate}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2" />
                        <span className="dark:text-white">
                          {selectedItem.startTime} - {selectedItem.endTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-lg p-4">
                    <h3 className="font-medium text-lg mb-3 dark:text-white">Lokasi</h3>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2" />
                      <span className="dark:text-white">{selectedItem.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                    Set Reminder
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}