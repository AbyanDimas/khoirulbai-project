'use client'
// components/Section/WorkProgramDetail.tsx
import { motion } from 'framer-motion';

interface ProgramItem {
  id: number;
  program: string;
  target: string;
  time: string;
  responsible?: string;
}

interface ProgramCategory {
  id: number;
  title: string;
  items: ProgramItem[];
}

export const WorkProgramDetail = () => {
  const programCategories: ProgramCategory[] = [
    {
      id: 1,
      title: "IDARAH (Manajemen Masjid)",
      items: [
        { id: 1, program: "Jadwal khutbah", target: "Guru", time: "Per semester", responsible: "Koordinator Bidang" },
        { id: 2, program: "Pelaporan keuangan rutin", target: "Jamaah", time: "Juli 2025" },
        { id: 3, program: "Jadwal piket siswa sholat Jumat", target: "Semua siswa/kelas Green School", time: "-" },
        { id: 4, program: "Membuat website masjid", target: "-", time: "Juli 2025" },
        { id: 5, program: "Pengelolaan perpustakaan masjid", target: "Warga sekolah", time: "Juli 2025" },
        { id: 6, program: "Poster", target: "Warga sekolah", time: "Juli 2025" },
        { id: 7, program: "Kartu kontrol kebersihan", target: "Takmir Masjid", time: "Juli 2025" },
        { id: 8, program: "Mewajibkan pakai sandal ke masjid", target: "Warga sekolah", time: "Juli 2025" },
        { id: 9, program: "Pertemuan rutin pengurus untuk evaluasi", target: "Takmir Masjid", time: "Setiap Bulan" },
      ]
    },
    {
      id: 2,
      title: "IMARAH (Memakmurkan Masjid)",
      items: [
        { id: 1, program: "Sholat Dhuhur & Ashar berjamaah", target: "Guru, karyawan, siswa", time: "Setiap hari", responsible: "Koordinator Bidang" },
        { id: 2, program: "Sholat Jumat", target: "Guru, karyawan, siswa", time: "Setiap Jumat" },
        { id: 3, program: "Seni rebana / hadroh", target: "Siswa (ekstrakurikuler)", time: "-" },
        { id: 4, program: "Bimbingan Tilawah Qur'an (BTQ)", target: "Siswa belum lancar", time: "Setiap Jumat" },
        { id: 5, program: "Pengajian rutin (ta'lim)", target: "Peserta Rohis", time: "Setiap Kamis" },
        { id: 6, program: "Kajian Islam Remaja / Keputrian", target: "Seluruh siswi", time: "Pekan ketiga" },
        { id: 7, program: "Pengajian Guru Karyawan", target: "Guru & Karyawan", time: "Pekan pertama" },
        { id: 8, program: "Khotmil Qur'an", target: "Guru & karyawan", time: "Bulan Ramadhan" },
        { id: 9, program: "Kuliah Ahad & Riyadhoh", target: "Warga sekolah", time: "Akhir pekan" },
        { id: 10, program: "PHBI", target: "Siswa", time: "Menyesuaikan" },
      ]
    },
    {
      id: 3,
      title: "RI'AYAH (Sarana & Prasarana Masjid)",
      items: [
        { id: 1, program: "Beli karpet / terpal", target: "Pelaksanaan sholat Jumat", time: "Juli 2025", responsible: "Koordinator Bidang" },
        { id: 2, program: "Penambahan satir", target: "Ruang dalam masjid", time: "-" },
        { id: 3, program: "Pengadaan CCTV", target: "Area masjid & sekitar", time: "Januari 2026" },
        { id: 4, program: "Perbaikan speaker", target: "Menara speaker atas", time: "Juli 2025" },
        { id: 5, program: "Jembatan & toilet putra", target: "Tempat wudhu", time: "Januari 2026" },
        { id: 6, program: "Layos (perluasan tempat sholat)", target: "-", time: "Januari 2026" },
        { id: 7, program: "Kaca temper / penutup lantai", target: "Lantai PVC teras masjid", time: "Januari 2026" },
        { id: 8, program: "Pemasangan paving", target: "Area sebelah utara", time: "Juli 2025" },
        { id: 9, program: "Tirai penghalang air hujan", target: "Teras kanan-kiri", time: "Januari 2026" },
        { id: 10, program: "Rak & almari al-Qur'an", target: "Masjid", time: "Januari 2026" },
        { id: 11, program: "Rak sandal sisi utara", target: "Jamaah masjid", time: "Juli 2025" },
        { id: 12, program: "Kipas angin sisi selatan", target: "Jamaah perempuan", time: "Desember 2025" },
        { id: 13, program: "Running text & papan nama", target: "Depan masjid", time: "Desember 2025" },
      ]
    },
    {
      id: 4,
      title: "IJTIMAIYAH (Fungsi Sosial)",
      items: [
        { id: 1, program: "Database mustahik", target: "Siswa & warga sekolah", time: "Syawal" },
        { id: 2, program: "Program donasi (koperasi, CSR, alumni)", target: "Para donatur / aghniya", time: "Bulanan" },
        { id: 3, program: "Jumat Berkah", target: "Siswa", time: "Setiap Jumat" },
        { id: 4, program: "Zakat maal", target: "Guru & karyawan", time: "Per bulan" },
        { id: 5, program: "Bakti sosial / Bina lingkungan", target: "Warga sekitar", time: "Per semester" },
        { id: 6, program: "GOTA", target: "Guru & karyawan", time: "Per tahun" },
      ]
    }
  ];

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold dark:text-white text-center mb-2">
            PROGRAM KERJA MASJID KHOIRUL BA'I
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 text-center">
            Periode 2025 – 2028
          </p>
        </motion.div>

        <div className="space-y-12">
          {programCategories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 dark:text-white">
                  {category.id}. {category.title}
                </h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">No</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">Program</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">Sasaran</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">Waktu</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">PJ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {category.items.map((item) => (
                        <tr key={`${category.id}-${item.id}`} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.id}</td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{item.program}</td>
                          <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{item.target}</td>
                          <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{item.time}</td>
                          <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{item.responsible || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkProgramDetail;
