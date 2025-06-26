'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, Clock, MapPin, ChevronRight, Users, Info, X, Plus, ArrowLeft, Clipboard } from 'lucide-react';
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
  rawStartDate?: string;
  rawEndDate?: string;
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

const GoogleLikeLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-sm max-w-md mx-auto">
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute inset-0 rounded-full bg-emerald-100 dark:bg-emerald-900/30 animate-ping"></div>
        <div className="absolute inset-2 rounded-full bg-emerald-200 dark:bg-emerald-800/50 animate-pulse"></div>
        <CalendarDays className="absolute inset-4 w-12 h-12 text-emerald-600 dark:text-emerald-400 animate-bounce" />
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
        <div className="bg-emerald-600 h-2.5 rounded-full animate-progress" style={{ width: '70%' }}></div>
      </div>
      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Memuat Agenda</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm">Sedang mengambil data kegiatan...</p>
    </div>
  );
};

const GoogleLikeError = ({ error, onRetry }: { error: string, onRetry: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-sm max-w-md mx-auto">
      <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-6">
        <div className="relative">
          <X className="w-12 h-12 text-red-600 dark:text-red-400" />
          <div className="absolute inset-0 rounded-full bg-red-200 dark:bg-red-800/30 animate-ping opacity-75"></div>
        </div>
      </div>
      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Gagal Memuat Agenda</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 text-center">{error}</p>
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors flex items-center shadow-sm"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Coba Lagi
      </button>
    </div>
  );
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
          const endDate = new Date(item.attributes.tanggal_selesai || item.attributes.tanggal_mulai);

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
            endTime: endDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            rawStartDate: item.attributes.tanggal_mulai,
            rawEndDate: item.attributes.tanggal_selesai || item.attributes.tanggal_mulai
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

  const exportToCalendar = (event?: AgendaItem) => {
    const eventsToExport = event ? [event] : agendaItems;
    
    if (eventsToExport.length === 0) return;

    // Format untuk iCalendar (.ics)
    let icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Masjid Khoirul Ba\'i//Agenda Kegiatan//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH'
    ];

    eventsToExport.forEach(item => {
      if (!item.rawStartDate) return;

      try {
        const startDate = new Date(item.rawStartDate);
        const endDate = new Date(item.rawEndDate || item.rawStartDate);
        
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
          console.error(`Invalid date for event ${item.id}`);
          return;
        }

        const formatDate = (date: Date) => {
          return date.toISOString()
            .replace(/[-:]/g, '')
            .replace(/\.\d{3}/, '');
        };

        const formattedStart = formatDate(startDate);
        const formattedEnd = formatDate(endDate);
        const now = formatDate(new Date());
        
        icsContent.push(
          'BEGIN:VEVENT',
          `UID:${item.id}@khoirulbai.sch.id`,
          `DTSTAMP:${now}`,
          `DTSTART:${formattedStart}`,
          `DTEND:${formattedEnd}`,
          `SUMMARY:${item.title}`,
          `DESCRIPTION:${item.description.replace(/\n/g, '\\n')}\\n\\nLokasi: ${item.location}`,
          `LOCATION:${item.location}`,
          `CATEGORIES:${item.category}`,
          'END:VEVENT'
        );
      } catch (err) {
        console.error(`Error processing event ${item.id}:`, err);
      }
    });

    icsContent.push('END:VCALENDAR');

    const blob = new Blob([icsContent.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', event 
      ? `agenda-${event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics` 
      : 'agenda-khoirulbai.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12">
        <GoogleLikeLoading />
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto px-4 py-12">
        <GoogleLikeError error={error} onRetry={() => window.location.reload()} />
      </section>
    );
  }

  return (
    <>
      {/* Header Section */}
      <section className="relative bg-emerald-700 text-white py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/masjid-pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <Link 
            href="/" 
            className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" /> Kembali ke Beranda
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center">
              <CalendarDays className="mr-3 h-8 w-8" />
              Agenda Kegiatan Masjid
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Jadwal lengkap kegiatan di Masjid Khoirul Ba'i STM ADB
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 md:py-12 relative">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <div>
            <h2 className="text-2xl font-bold dark:text-white">Daftar Kegiatan</h2>
            <p className="text-gray-600 dark:text-gray-400">Pilih kegiatan untuk melihat detail lengkap</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link 
              href="/agenda/lengkap" 
              className="flex items-center justify-center px-4 py-2 text-emerald-600 dark:text-emerald-400 hover:underline border border-emerald-600 dark:border-emerald-400 rounded-lg"
            >
              Lihat semua <ChevronRight className="ml-1" />
            </Link>
            <button
              onClick={() => exportToCalendar()}
              disabled={agendaItems.length === 0}
              className={`flex items-center justify-center px-4 py-2 rounded-lg transition-colors ${
                agendaItems.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              <Plus className="w-5 h-5 mr-1" /> Ekspor Semua
            </button>
          </div>
        </motion.div>

        {agendaItems.length === 0 ? (
          <div className="text-center py-12 rounded-2xl bg-white dark:bg-gray-800 shadow-sm max-w-md mx-auto p-8">
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
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        exportToCalendar(event);
                      }}
                      className="text-sm px-3 py-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Kalender
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

                  <div className="flex justify-end gap-3">
                    <button 
                      onClick={() => exportToCalendar(selectedItem)}
                      className="px-4 py-2 border border-emerald-600 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors flex items-center"
                    >
                      <Plus className="h-5 w-5 mr-1" /> Tambah ke Kalender
                    </button>
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
    </>
  );
}