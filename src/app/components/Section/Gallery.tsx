import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { GalleryItem } from '@/app/types';
import { GalleryItemComponent } from '@/app/components/Section/GalleryItem';

interface GalleryProps {
  gallery: GalleryItem[];
}

export const Gallery = ({ gallery }: GalleryProps) => {
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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((item, index) => (
          <GalleryItemComponent key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};