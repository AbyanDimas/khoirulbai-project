import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Tausyiah } from '@/app/types';
import { TausyiahCard } from '@/app/components/Section/TausyiahCard';

interface LatestTausyiahProps {
  tausyiah: Tausyiah[];
}

export const LatestTausyiah = ({ tausyiah }: LatestTausyiahProps) => {
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
          <h2 className="text-2xl font-bold dark:text-white">Tausyiah Terbaru</h2>
          <p className="text-gray-600 dark:text-gray-400">Kumpulan nasihat dan ceramah terbaru</p>
        </div>
        <Link 
          href="/tausyiah" 
          className="flex items-center text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          Lihat semua <ChevronRight className="ml-1" />
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tausyiah.map((item, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index }}
            viewport={{ once: true }}
          >
            <TausyiahCard tausyiah={item} index={index} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};