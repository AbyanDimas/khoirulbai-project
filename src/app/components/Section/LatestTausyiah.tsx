'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { tausiyah } from '@/app/types';
import { tausiyahCard } from '@/app/components/Section/tausiyahCard';

export const Latesttausiyah = () => {
  const [tausiyah, settausiyah] = useState<tausiyah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatesttausiyah = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/tausiyahs?populate=*&sort[0]=tanggal:desc&pagination[limit]=3`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch tausiyah');
        }

        const data = await response.json();

        const formattedtausiyah = data.data.map((item: any) => {
          let imageUrl = '/placeholder.jpg';
          if (item.attributes.gambar?.data?.attributes?.url) {
            if (item.attributes.gambar.data.attributes.url.startsWith('http')) {
              imageUrl = item.attributes.gambar.data.attributes.url;
            } else {
              imageUrl = `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${item.attributes.gambar.data.attributes.url}`;
            }
          }

          return {
            id: item.id.toString(),
            title: item.attributes.judul,
            speaker: item.attributes.penulis,
            date: new Date(item.attributes.tanggal).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            }),
            time: new Date(item.attributes.tanggal).toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit'
            }),
            duration: '15:30', // Default duration or you can add this field in Strapi
            type: 'video', // Default type or you can add this field in Strapi
            description: item.attributes.deskripsi || 'Tidak ada deskripsi',
            views: '1.2K', // Default views or you can add this field in Strapi
            image: imageUrl
          };
        });

        settausiyah(formattedtausiyah);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching tausiyah:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatesttausiyah();
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold dark:text-white">tausiyah Terbaru</h2>
            <p className="text-gray-600 dark:text-gray-400">Kumpulan nasihat dan ceramah terbaru</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow animate-pulse">
              <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded mb-4 w-full"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold dark:text-white">tausiyah Terbaru</h2>
            <p className="text-gray-600 dark:text-gray-400">Kumpulan nasihat dan ceramah terbaru</p>
          </div>
        </div>
        <div className="text-center py-8 text-red-500 dark:text-red-400">
          {error}
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="mx-auto block px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Coba Lagi
        </button>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex justify-between items-center mb-8"
      >
        <div>
          <h2 className="text-2xl font-bold dark:text-white">tausiyah Terbaru</h2>
          <p className="text-gray-600 dark:text-gray-400">Kumpulan nasihat dan ceramah terbaru</p>
        </div>
        <Link 
          href="/tausiyah" 
          className="flex items-center text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          Lihat semua <ChevronRight className="ml-1" />
        </Link>
      </motion.div>

      {tausiyah.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Tidak ada tausiyah terbaru saat ini
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tausiyah.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              <tausiyahCard tausiyah={item} index={index} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};