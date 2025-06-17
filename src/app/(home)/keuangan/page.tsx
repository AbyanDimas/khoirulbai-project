'use client'
import { motion } from 'framer-motion';
import { Clipboard, ArrowLeft, Download } from 'lucide-react';
import Link from 'next/link';

// Data dummy untuk laporan keuangan
const financialReports = [
  {
    id: 1,
    date: '2023-05-15',
    description: 'Donasi Jumat berkah',
    income: 2500000,
    expense: 0,
    balance: 12500000
  },
  {
    id: 2,
    date: '2023-05-14',
    description: 'Pembelian sound system',
    income: 0,
    expense: 4500000,
    balance: 10000000
  },
  {
    id: 3,
    date: '2023-05-10',
    description: 'Donasi dari Bapak Ahmad',
    income: 5000000,
    expense: 0,
    balance: 14500000
  },
  {
    id: 4,
    date: '2023-05-05',
    description: 'Biaya perbaikan atap',
    income: 0,
    expense: 3500000,
    balance: 9500000
  },
  {
    id: 5,
    date: '2023-05-01',
    description: 'Donasi bulanan jamaah',
    income: 3000000,
    expense: 0,
    balance: 13000000
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

export const FinancialReportPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Header Section */}
      <section className="relative bg-emerald-700 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/masjid-pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <Link 
            href="/" 
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" /> Kembali ke Beranda
          </Link>
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-2 flex items-center"
          >
            <Clipboard className="mr-3 h-8 w-8" />
            Laporan Keuangan Masjid
          </motion.h1>
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg"
          >
            Transparansi pengelolaan dana Masjid Khoirul Ba'i
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-6">
              {/* Header with download button */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h2 className="text-xl font-bold dark:text-white mb-2 md:mb-0">
                  Rekapitulasi Keuangan
                </h2>
                <button className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm">
                  <Download className="mr-2 h-4 w-4" />
                  Unduh Laporan
                </button>
              </div>

              {/* Financial Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                  <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Total Pemasukan</h3>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(10500000)}
                  </p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Total Pengeluaran</h3>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {formatCurrency(8000000)}
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Saldo Akhir</h3>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(2500000)}
                  </p>
                </div>
              </div>

              {/* Financial Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Tanggal
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Uraian
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Pemasukan
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Pengeluaran
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Saldo
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {financialReports.map((report) => (
                      <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(report.date)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {report.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-emerald-600 dark:text-emerald-400">
                          {report.income > 0 ? formatCurrency(report.income) : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-red-600 dark:text-red-400">
                          {report.expense > 0 ? formatCurrency(report.expense) : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-gray-900 dark:text-white">
                          {formatCurrency(report.balance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {financialReports.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">
                    Belum ada data laporan keuangan.
                  </p>
                </div>
              )}

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Menampilkan 1 sampai {financialReports.length} dari {financialReports.length} entri
                </div>
                <div className="flex space-x-2">
                  <button 
                    disabled
                    className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                  >
                    Sebelumnya
                  </button>
                  <button className="px-3 py-1 rounded-md bg-emerald-600 text-white">
                    1
                  </button>
                  <button 
                    disabled
                    className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FinancialReportPage;