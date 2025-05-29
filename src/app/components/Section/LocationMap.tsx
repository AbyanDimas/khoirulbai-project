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
          <p className="text-gray-600 dark:text-gray-400">Kunjungi Masjid Khoirul Ba'i STM ADB</p>
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
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.207085477687!2d109.1250987!3d-6.9218531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6fb9973a0ed1d1%3A0x968ef733739b012c!2sMasjid%20Khoirul%20Ba%27i%20STM%20ADB!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
            <h3 className="font-bold dark:text-white">Masjid Khoirul Ba'i STM ADB</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Jl. Raya Adiwerna No.Km. 5, Kaliwadas, Kec. Adiwerna, Kabupaten Tegal, Jawa Tengah 52194
            </p>
          </div>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2" />
            <span className="dark:text-white">Jl. Raya Adiwerna No.Km. 5, Kaliwadas, Kec. Adiwerna, Kabupaten Tegal, Jawa Tengah 52194</span>
          </div>
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2" />
            <span className="dark:text-white">-</span>
          </div>
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2" />
            <span className="dark:text-white">info@smkn1adw.sch.id</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};