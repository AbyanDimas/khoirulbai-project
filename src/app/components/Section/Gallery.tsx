'use client'

import { motion } from 'framer-motion';
import { ChevronRight, ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GalleryItem } from '@/app/types';
import { GalleryItemComponent } from '@/app/components/Section/GalleryItem';

export const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/galeris?populate=*&pagination[limit]=8`);
        if (!response.ok) {
          throw new Error('Gagal memuat galeri kegiatan');
        }
        const data = await response.json();
        
        const formattedItems = data.data.map((item: any) => {
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
            type: item.attributes.type === 'Video' ? 'video' : 'image',
            title: item.attributes.judul,
            description: item.attributes.deskripsi,
            date: new Date(item.attributes.tanggal).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }),
            image: imageUrl,
            category: item.attributes.type,
            liked: false
          };
        });

        setGalleryItems(formattedItems);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan tidak diketahui');
        console.error('Error fetching gallery items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12 md:py-16 bg-white dark:bg-gray-800 rounded-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold dark:text-white">Galeri Kegiatan</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
              Dokumentasi kegiatan Masjid Khoirul Ba'i
            </p>
          </div>
        </div>
        {/* AWS-style loading skeleton */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="mt-2 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto px-4 py-12 md:py-16 bg-white dark:bg-gray-800 rounded-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold dark:text-white">Galeri Kegiatan</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
              Dokumentasi kegiatan Masjid Khoirul Ba'i
            </p>
          </div>
        </div>
        {/* AWS-style error component */}
        <div className="border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
          <div className="flex flex-col items-center text-center">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-800/50">
              <svg className="h-6 w-6 text-red-500 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="mt-3">
              <h3 className="text-lg leading-6 font-medium text-red-800 dark:text-red-200">
                Gagal Memuat Galeri
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
    <section className="container mx-auto px-4 py-8 md:py-12 bg-white dark:bg-gray-800 rounded-xl">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4"
      >
        <div>
          <h2 className="text-xl md:text-2xl font-bold dark:text-white">Galeri Kegiatan</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
            Dokumentasi kegiatan Masjid Khoirul Ba'i
          </p>
        </div>
        <Link 
          href="/galeri" 
          className="flex items-center text-emerald-600 dark:text-emerald-400 hover:underline text-sm md:text-base"
        >
          Lihat semua <ChevronRight className="ml-1 w-4 h-4" />
        </Link>
      </motion.div>

      {galleryItems.length === 0 ? (
        <div className="text-center py-8 md:py-12">
          <div className="mx-auto w-16 h-16 md:w-24 md:h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <ImageIcon className="text-gray-400 w-8 h-8 md:w-10 md:h-10" />
          </div>
          <h3 className="text-lg md:text-xl font-medium dark:text-white">Belum ada galeri tersedia</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm md:text-base">
            Galeri kegiatan akan ditampilkan di sini
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            >
              <GalleryItemComponent item={item} index={index} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};