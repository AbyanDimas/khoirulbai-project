import { motion } from 'framer-motion';
import { ChevronRight, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export const LocationMap = () => {
  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4"
      >
        <div>
          <h2 className="text-xl md:text-2xl font-bold dark:text-white">Lokasi Masjid</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
            Kunjungi Masjid Khoirul Ba'i STM ADB
          </p>
        </div>
        <Link 
          href="/kontak" 
          className="flex items-center text-emerald-600 dark:text-emerald-400 hover:underline text-sm md:text-base"
        >
          Info lengkap <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </motion.div>

      {/* Map Container */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
      >
        {/* Map Iframe */}
        <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.207085477687!2d109.1250987!3d-6.9218531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6fb9973a0ed1d1%3A0x968ef733739b012c!2sMasjid%20Khoirul%20Ba%27i%20STM%20ADB!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          ></iframe>
          
          {/* Map Overlay Card */}
          <div className="absolute bottom-4 left-4 right-4 md:right-auto bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm max-w-xs">
            <h3 className="font-bold dark:text-white text-sm md:text-base">Masjid Khoirul Ba'i STM ADB</h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">
              Jl. Raya Adiwerna No.Km. 5, Kaliwadas, Kec. Adiwerna, Kabupaten Tegal, Jawa Tengah 52194
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {/* Address */}
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
            <span className="dark:text-white text-sm md:text-base">
              Jl. Raya Adiwerna No.Km. 5, Kaliwadas, Kec. Adiwerna, Kabupaten Tegal, Jawa Tengah 52194
            </span>
          </div>
          
          {/* Phone */}
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2 flex-shrink-0" />
            <span className="dark:text-white text-sm md:text-base">-</span>
          </div>
          
          {/* Email */}
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2 flex-shrink-0" />
            <span className="dark:text-white text-sm md:text-base">info@smkn1adw.sch.id</span>
          </div>
        </div>
      </motion.div>

      {/* Additional Mobile Call-to-Action */}
      <div className="mt-6 md:hidden text-center">
        <Link
          href="/kontak"
          className="inline-flex items-center justify-center px-5 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors w-full"
        >
          <Phone className="h-4 w-4 mr-2" />
          Hubungi Kami
        </Link>
      </div>
    </section>
  );
};