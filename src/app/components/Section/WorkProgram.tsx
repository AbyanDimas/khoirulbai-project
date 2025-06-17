import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface ProgramItem {
  id: number;
  program: string;
  target: string;
  time: string;
  responsible?: string;
}

export const HomeWorkProgram = () => {
  // Hanya ambil 2 kategori dan 3 item pertama dari setiap kategori untuk preview di beranda
  const previewCategories = [
    {
      id: 1,
      title: "IDARAH (Manajemen Masjid)",
      items: [
        { id: 1, program: "Jadwal khutbah", target: "Guru", time: "Per semester" },
        { id: 2, program: "Pelaporan keuangan rutin", target: "Jamaah", time: "Juli 2025" },
        { id: 3, program: "Jadwal piket siswa sholat Jumat", target: "Semua siswa", time: "-" }
      ]
    },
    {
      id: 2,
      title: "IMARAH (Memakmurkan Masjid)",
      items: [
        { id: 1, program: "Sholat Dhuhur & Ashar berjamaah", target: "Guru & siswa", time: "Setiap hari" },
        { id: 2, program: "Sholat Jumat", target: "Guru & siswa", time: "Setiap Jumat" },
        { id: 3, program: "Bimbingan Tilawah Qur'an", target: "Siswa", time: "Setiap Jumat" }
      ]
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold dark:text-white mb-2">
            Program Kerja Masjid
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Rencana kegiatan Masjid Khoirul Ba'i periode 2025-2028 untuk kemakmuran masjid dan pendidikan islami
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {previewCategories.map((category) => (
            <div 
              key={category.id} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 dark:text-white flex items-center">
                  <span className="bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                    {category.id}
                  </span>
                  {category.title}
                </h3>
                
                <div className="space-y-4">
                  {category.items.map((item) => (
                    <div key={`${category.id}-${item.id}`} className="border-l-4 border-emerald-500 pl-4 py-1">
                      <h4 className="font-medium dark:text-white">{item.program}</h4>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <span>Sasaran: {item.target}</span>
                        <span>Waktu: {item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link 
            href="/program-kerja" 
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          >
            Lihat Semua Program Kerja <ChevronRight className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};