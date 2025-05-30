'use client';

import { AlertCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Announcement } from '@/app/types';

export const ImportantAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImportantAnnouncements = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/pengunguman-pentings?populate=*&sort[0]=tanggal:desc&pagination[limit]=3`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch important announcements');
        }

        const data = await response.json();

        const formattedAnnouncements = data.data.map((item: any) => ({
          id: item.id.toString(),
          title: item.attributes.nama,
          content: item.attributes.deskripsi || 'Tidak ada deskripsi',
          date: new Date(item.attributes.tanggal).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          }),
          important: true // Since all from this endpoint are important
        }));

        setAnnouncements(formattedAnnouncements);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching important announcements:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchImportantAnnouncements();
  }, []);

  if (loading) {
    return (
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-amber-50 dark:bg-amber-900/20 rounded-xl shadow-sm p-6"
      >
        <h2 className="text-xl font-bold mb-4 flex items-center dark:text-white">
          <AlertCircle className="mr-2 text-amber-600 dark:text-amber-400" />
          Pengumuman Penting
        </h2>
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-amber-50 dark:bg-amber-900/20 rounded-xl shadow-sm p-6"
      >
        <h2 className="text-xl font-bold mb-4 flex items-center dark:text-white">
          <AlertCircle className="mr-2 text-amber-600 dark:text-amber-400" />
          Pengumuman Penting
        </h2>
        <div className="text-center text-red-500 dark:text-red-400 py-4">
          {error}
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="w-full py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
        >
          Coba Lagi
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-amber-50 dark:bg-amber-900/20 rounded-xl shadow-sm p-6"
    >
      <h2 className="text-xl font-bold mb-4 flex items-center dark:text-white">
        <AlertCircle className="mr-2 text-amber-600 dark:text-amber-400" />
        Pengumuman Penting
      </h2>
      
      {announcements.length === 0 ? (
        <div className="text-center py-4 text-gray-600 dark:text-gray-400">
          Tidak ada pengumuman penting saat ini
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {announcements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xs"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold dark:text-white">{announcement.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{announcement.content}</p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                    {announcement.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          <Link 
            href="/pengumuman" 
            className="inline-flex items-center mt-4 text-amber-600 dark:text-amber-400 hover:underline text-sm"
          >
            Lihat semua pengumuman <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </>
      )}
    </motion.div>
  );
};