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
          throw new Error('Gagal memuat berita terbaru');
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
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan tidak diketahui');
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
        {/* AWS-style loading skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              <div className="p-4 space-y-3">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
                </div>
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
        {/* AWS-style error component */}
        <div className="border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
          <div className="flex flex-col items-center text-center">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-800/50 sm:mx-0 sm:h-10 sm:w-10">
              <svg className="h-6 w-6 text-red-500 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="mt-3">
              <h3 className="text-lg leading-6 font-medium text-red-800 dark:text-red-200">
                Gagal Memuat Berita
              </h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                <p>Periksa Jaringan Anda Atau Coba Lagi Nanti</p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:bg-red-700 dark:hover:bg-red-800"
                >
                  Coba Lagi
                </button>
              </div>
            </div>
          </div>
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