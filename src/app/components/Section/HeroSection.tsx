import { motion } from 'framer-motion';
import { ArrowRight, ImagePlay, Megaphone, Play } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const HeroSection = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative bg-black  text-white py-16 md:py-24"
    >
        <Image 
          src="/images/hero-bg.jpg" 
          alt="Masjid Khoirul Ba'i" 
          layout="fill" 
          objectFit="cover" 
          className="absolute inset-0 object-cover opacity-50"
        />
      <div className="absolute inset-0 bg-[url('/images/masjid-pattern.svg')] opacity-10"></div>
      <div className="container mx-auto px-4 text-center relative">
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
        >
          Selamat Datang di Masjid Khoirul Ba'i
        </motion.h1>
        <motion.p 
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl max-w-3xl mx-auto mb-8"
        >
          Masjid yang Menjadikan Siswa-Siswi yang taat beribadah
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link 
            href="/agenda" 
            className="px-6 py-3 bg-white text-emerald-700 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center"
          >
            Lihat Agenda <ArrowRight className="ml-2" />
          </Link>
          <Link 
            href="/galeri" 
            className="px-6 py-3 bg-emerald-800 text-white rounded-lg font-medium hover:bg-emerald-900 transition-colors flex items-center"
          >
            Galeri Kegiatan <ImagePlay className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};