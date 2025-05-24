import { motion } from 'framer-motion';
import { Service } from '@/app/types';
import { ServiceCard } from '@/app/components/Section/ServiceCard';

interface MosqueServicesProps {
  services: Service[];
}

export const MosqueServices = ({ services }: MosqueServicesProps) => {
  return (
    <section className="container mx-auto px-4 py-12 bg-gray-50 dark:bg-gray-900">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl md:text-3xl font-bold dark:text-white">Layanan Masjid</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
          Berbagai layanan yang disediakan Masjid Baitul Makmur untuk masyarakat
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index }}
            viewport={{ once: true }}
          >
            <ServiceCard service={service} index={index} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};