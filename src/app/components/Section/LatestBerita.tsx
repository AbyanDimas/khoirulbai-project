'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Berita } from '@/app/types';
import { BeritaCard } from '@/app/components/Section/BeritaCard';

export const LatestBerita = () => {
  const [berita, setBerita] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestBerita = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/blogs?populate=*&sort[0]=createdAt:desc&pagination[limit]=6`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch berita');
        }

        const data = await response.json();

        const formattedBerita = data.data.map((item: any) => {
          let imageUrl = '/placeholder.jpg';
          if (item.attributes.image?.data?.attributes?.url) {
            if (item.attributes.image.data.attributes.url.startsWith('http')) {
              imageUrl = item.attributes.image.data.attributes.url;
            } else {
              imageUrl = `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${item.attributes.image.data.attributes.url}`;
            }
          }

          return {
            id: item.id.toString(),
            title: item.attributes.name,
            content: item.attributes.content,
            slug: item.attributes.slug,
            date: new Date(item.attributes.createdAt).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            }),
            category: item.attributes.category || 'Berita',
            image: imageUrl
          };
        });

        setBerita(formattedBerita);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching berita:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBerita();
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold dark:text-white">Berita Terbaru</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
              Kumpulan berita terbaru seputar masjid
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow animate-pulse">
              <div className="aspect-video bg-gray-300 dark:bg-gray-700"></div>
              <div className="p-4">
                <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded mb-3 w-3/4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-full"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded mt-4 w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold dark:text-white">Berita Terbaru</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
              Kumpulan berita terbaru seputar masjid
            </p>
          </div>
        </div>
        <div className="text-center py-8">
          <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 className="text-lg md:text-xl font-medium dark:text-white mb-2">Gagal memuat berita</h3>
          <p className="text-red-500 dark:text-red-400 text-sm md:text-base mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mx-auto px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm md:text-base"
          >
            Coba Lagi
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4"
      >
        <div>
          <h2 className="text-xl md:text-2xl font-bold dark:text-white">Berita Terbaru</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
            Kumpulan berita terbaru seputar masjid
          </p>
        </div>
        <Link 
          href="/berita" 
          className="flex items-center text-emerald-600 dark:text-emerald-400 hover:underline text-sm md:text-base"
        >
          Lihat semua <ChevronRight className="ml-1 w-4 h-4" />
        </Link>
      </motion.div>

      {berita.length === 0 ? (
        <div className="text-center py-8">
          <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
            </svg>
          </div>
          <h3 className="text-lg md:text-xl font-medium dark:text-white mb-2">Belum ada berita</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
            Tidak ada berita terbaru saat ini
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {berita.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            >
              <BeritaCard berita={item} index={index} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};