'use client'

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GalleryItem } from '@/app/types';
import { GalleryItemComponent } from '@/app/components/Section/GalleryItem';
import { ImageIcon } from 'lucide-react';

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
          throw new Error('Failed to fetch gallery items');
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
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching gallery items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12 bg-white dark:bg-gray-800">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto px-4 py-12 bg-white dark:bg-gray-800">
        <div className="text-center">
          <div className="mx-auto w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <ImageIcon className="text-gray-400" size={40} />
          </div>
          <h3 className="text-lg font-medium dark:text-white">Error loading gallery</h3>
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
    <section className="container mx-auto px-4 py-12 bg-white dark:bg-gray-800">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex justify-between items-center mb-8"
      >
        <div>
          <h2 className="text-2xl font-bold dark:text-white">Galeri Kegiatan</h2>
          <p className="text-gray-600 dark:text-gray-400">Dokumentasi kegiatan Masjid Khoirul Ba'i</p>
        </div>
        <Link 
          href="/galeri" 
          className="flex items-center text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          Lihat semua <ChevronRight className="ml-1" />
        </Link>
      </motion.div>

      {galleryItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <ImageIcon className="text-gray-400" size={40} />
          </div>
          <h3 className="text-lg font-medium dark:text-white">Belum ada galeri tersedia</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Galeri kegiatan akan ditampilkan di sini</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item, index) => (
            <GalleryItemComponent key={item.id} item={item} index={index} />
          ))}
        </div>
      )}
    </section>
  );
};