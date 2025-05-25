import { motion } from 'framer-motion';
import { StatItem } from '@/app/types';

interface MosqueStatsProps {
  stats: StatItem[];
}

export const MosqueStats = ({ stats }: MosqueStatsProps) => {
  return (
    <section className="container mx-auto px-4 py-12 bg-white dark:bg-gray-800">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold dark:text-white">Masjid Khoirul Ba'i dalam Angka</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
          Kontribusi dan aktivitas masjid untuk masyarakat
        </p>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl text-center"
          >
            <div className="bg-emerald-100 dark:bg-emerald-900/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              {stat.icon}
            </div>
            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
              {stat.value}
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              {stat.name}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};