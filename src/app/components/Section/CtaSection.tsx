import { motion } from 'framer-motion';
import { HeartHandshake, CalendarDays, Users } from 'lucide-react';
import Link from 'next/link';

export const CtaSection = () => {
  return (
    <section className="bg-emerald-700 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <motion.h2 
          initial={{ y: -10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold mb-4"
        >
          Mari Berpartisipasi dalam Kegiatan Masjid
        </motion.h2>
        <motion.p 
          initial={{ y: -5, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-lg mb-8 max-w-2xl mx-auto"
        >
          Dukung kegiatan dan program masjid melalui partisipasi maupun donasi Anda
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link 
            href="/donasi" 
            className="px-6 py-3 bg-white text-emerald-700 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center"
          >
            Donasi Sekarang <HeartHandshake className="ml-2" />
          </Link>
          <Link 
            href="/agenda" 
            className="px-6 py-3 bg-emerald-800 text-white rounded-lg font-medium hover:bg-emerald-900 transition-colors flex items-center"
          >
            Lihat Kegiatan <CalendarDays className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};