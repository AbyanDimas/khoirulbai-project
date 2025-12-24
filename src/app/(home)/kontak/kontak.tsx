'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const ContactPage = () => {
  return (
    <>
      <section className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold dark:text-white mb-2">Hubungi Kami</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Silakan hubungi Masjid Khoirul Ba'i STM ADB melalui informasi kontak berikut atau kirim pesan langsung melalui form.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold dark:text-white mb-6">Informasi Kontak</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-lg mr-4">
                  <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold dark:text-white mb-1">Alamat</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Jl. Raya Adiwerna No.Km. 5, Kaliwadas, Kec. Adiwerna, Kabupaten Tegal, Jawa Tengah 52194
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-lg mr-4">
                  <Phone className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold dark:text-white mb-1">Telepon</h3>
                  <p className="text-gray-600 dark:text-gray-400">(0283) 1234567</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-lg mr-4">
                  <Mail className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold dark:text-white mb-1">Email</h3>
                  <p className="text-gray-600 dark:text-gray-400">info@smkn1adw.sch.id</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-lg mr-4">
                  <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold dark:text-white mb-1">Jam Operasional</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Senin - Minggu: 24 Jam<br />
                    Kantor: 08.00 - 16.00 WIB
                  </p>
                </div>
              </div>
            </div>

            {/* Map Embed */}
            <div className="mt-8 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.207085477687!2d109.1250987!3d-6.9218531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6fb9973a0ed1d1%3A0x968ef733739b012c!2sMasjid%20Khoirul%20Ba%27i%20STM%20ADB!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold dark:text-white mb-6">Kirim Pesan</h2>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Masukkan alamat email"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Subjek
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Masukkan subjek pesan"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Tulis pesan Anda di sini..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
              >
                <Send className="h-5 w-5 mr-2" />
                Kirim Pesan
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
