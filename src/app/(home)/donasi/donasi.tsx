'use client';

import { motion } from 'framer-motion';
import { QrCode, Banknote, HeartHandshake, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function DonasiPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">


      {/* Konten utama */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        {/* Section QRIS */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <QrCode className="text-emerald-600 dark:text-emerald-400" size={24} />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Donasi via QRIS</h2>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-4 p-4 bg-white rounded-lg border-2 border-dashed border-emerald-300">
              {/* Ganti dengan gambar QRIS Anda */}
              <Image
                src="/qris.png" // Pastikan file qris.png ada di folder public
                alt="QRIS Donasi"
                width={250}
                height={250}
                className="rounded-lg"
              />
            </div>

            <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
              Scan QRIS di atas menggunakan aplikasi mobile banking atau e-wallet Anda atau <Link href={'/zakat-infaq'}><strong>Transfer Bank Rekening <strong className='text-emerald-300'>BSI 7998006664</strong></strong></Link> a.n. PANITIA REHAB MASJID KHOIRUL BAI
            </p>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 w-full max-w-md">
              <p className="text-yellow-700 dark:text-yellow-300 text-sm text-center">
                <strong>Perhatian:</strong> Pastikan Anda melakukan transfer ke nomor rekening yang benar.
                Kami tidak bertanggung jawab atas kesalahan transfer.
              </p>
            </div>
          </div>
        </div>


        {/* Section informasi tambahan */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <HeartHandshake className="text-emerald-600 dark:text-emerald-400" size={24} />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Informasi Donasi</h2>
          </div>

          <div className="prose dark:prose-invert">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Donasi Anda akan digunakan untuk:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
              <li>Pengembangan dan pemeliharaan aplikasi</li>
              <li>Biaya server dan infrastruktur</li>
              <li>Kegiatan dakwah dan sosial</li>
              <li>Operasional masjid dan kegiatan keagamaan</li>
            </ul>

            <div className="mt-6 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
              <p className="text-emerald-700 dark:text-emerald-300 text-center">
                <strong>Jazakumullah khairan</strong> atas donasi dan dukungan Anda. Semoga Allah membalas dengan yang lebih baik.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
