import { motion } from 'framer-motion';
import { ChevronRight, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export const LocationMap = () => {
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
          <h2 className="text-2xl font-bold dark:text-white">Lokasi Masjid</h2>
          <p className="text-gray-600 dark:text-gray-400">Kunjungi Masjid Baitul Makmur</p>
        </div>
        <Link 
          href="/kontak" 
          className="flex items-center text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          Info lengkap <ChevronRight className="ml-1" />
        </Link>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
      >
        <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <MapPin className="h-8 w-8 text-red-600" />
            <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
              <h3 className="font-bold dark:text-white">Masjid Baitul Makmur</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Jl. Kebon Jeruk No. 45, Jakarta Barat
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2" />
            <span className="dark:text-white">Jl. Kebon Jeruk No. 45, Jakarta Barat</span>
          </div>
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2" />
            <span className="dark:text-white">(021) 12345678</span>
          </div>
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2" />
            <span className="dark:text-white">info@baitulmakmur.id</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};