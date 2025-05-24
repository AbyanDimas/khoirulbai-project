'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowUp,
  Filter,
  Download,
  Printer,
  Plus,
  CreditCard,
  Banknote,
  Wallet,
  QrCode,
  ChevronDown
} from 'lucide-react'

type Transaction = {
  id: string
  type: 'income' | 'expense'
  date: string
  amount: number
  category: string
  description: string
}

const KeuanganPage = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'income' | 'expense'>('all')
  const [showDonationInfo, setShowDonationInfo] = useState(true)

  // Mock data - replace with actual API call
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'income',
      date: '15 Jun 2024',
      amount: 12500000,
      category: 'Infaq Jumat',
      description: 'Infaq jamaah sholat Jumat'
    },
    {
      id: '2',
      type: 'expense',
      date: '14 Jun 2024',
      amount: 3500000,
      category: 'Listrik',
      description: 'Pembayaran listrik bulan Juni'
    },
    {
      id: '3',
      type: 'income',
      date: '10 Jun 2024',
      amount: 8500000,
      category: 'Donasi',
      description: 'Donasi dari Bapak Ahmad'
    },
    {
      id: '4',
      type: 'expense',
      date: '5 Jun 2024',
      amount: 2750000,
      category: 'Air',
      description: 'Pembayaran PDAM bulan Juni'
    },
    {
      id: '5',
      type: 'income',
      date: '1 Jun 2024',
      amount: 3200000,
      category: 'Zakat',
      description: 'Zakat fitrah keluarga Surya'
    },
    {
      id: '6',
      type: 'expense',
      date: '28 Mei 2024',
      amount: 15000000,
      category: 'Renovasi',
      description: 'Pembelian material parkir'
    }
  ]

  const filteredTransactions = transactions.filter(transaction => {
    if (activeTab === 'all') return true
    return transaction.type === activeTab
  })

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpense

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
            Laporan Keuangan Masjid
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Catatan masuk dan keluar keuangan Masjid Baitul Makmur
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Transactions */}
          <div className="lg:flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              {/* Transaction Header */}
              <div className="border-b border-gray-200 dark:border-gray-700 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex space-x-1">
                    <button
                      onClick={() => setActiveTab('all')}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        activeTab === 'all'
                          ? 'bg-emerald-600 text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      Semua
                    </button>
                    <button
                      onClick={() => setActiveTab('income')}
                      className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${
                        activeTab === 'income'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <ArrowDown className="h-4 w-4 mr-1" />
                      Pemasukan
                    </button>
                    <button
                      onClick={() => setActiveTab('expense')}
                      className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${
                        activeTab === 'expense'
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <ArrowUp className="h-4 w-4 mr-1" />
                      Pengeluaran
                    </button>
                  </div>

                  <div className="flex space-x-2">
                    <button className="p-2 rounded-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Filter className="h-4 w-4" />
                    </button>
                    <button className="p-2 rounded-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="p-2 rounded-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Printer className="h-4 w-4" />
                    </button>
                    <button className="p-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 flex items-center">
                      <Plus className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Tambah</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Transaction Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        JENIS
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        TANGGAL
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        JUMLAH
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        KATEGORI
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        KETERANGAN
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredTransactions.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                          Tidak ada data transaksi
                        </td>
                      </tr>
                    ) : (
                      filteredTransactions.map((transaction) => (
                        <motion.tr
                          key={transaction.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            {transaction.type === 'income' ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                                <ArrowDown className="h-3 w-3 mr-1" />
                                Masuk
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400">
                                <ArrowUp className="h-3 w-3 mr-1" />
                                Keluar
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            {transaction.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {transaction.type === 'income' ? (
                              <span className="text-green-600 dark:text-green-400">
                                +{formatCurrency(transaction.amount)}
                              </span>
                            ) : (
                              <span className="text-red-600 dark:text-red-400">
                                -{formatCurrency(transaction.amount)}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            {transaction.category}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                            {transaction.description}
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - Balance and Donation */}
          <div className="lg:w-80">
            <div className="sticky top-6 space-y-6">
              {/* Balance Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
              >
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Saldo Keuangan
                  </h3>
                </div>
                <div className="p-6">
                  <div className="text-3xl font-bold text-center mb-4">
                    {formatCurrency(balance)}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                      <div className="text-green-600 dark:text-green-400 text-sm font-medium">
                        Pemasukan
                      </div>
                      <div className="text-green-700 dark:text-green-300 font-bold">
                        {formatCurrency(totalIncome)}
                      </div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                      <div className="text-red-600 dark:text-red-400 text-sm font-medium">
                        Pengeluaran
                      </div>
                      <div className="text-red-700 dark:text-red-300 font-bold">
                        {formatCurrency(totalExpense)}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Donation Info */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
              >
                <div 
                  className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center cursor-pointer"
                  onClick={() => setShowDonationInfo(!showDonationInfo)}
                >
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Salurkan Infaq
                  </h3>
                  <ChevronDown 
                    className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                      showDonationInfo ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                  {showDonationInfo && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-4 space-y-4">
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Salurkan infaq Anda melalui rekening berikut:
                        </p>
                        
                        <div className="space-y-3">
                          <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-full mr-3">
                              <Banknote className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                              <div className="font-medium dark:text-white">Bank Syariah Indonesia</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                7141-8901-3040 a.n. Masjid Baitul Makmur
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                              <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <div className="font-medium dark:text-white">Bank Mandiri</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                1400-0123-4567 a.n. Masjid Baitul Makmur
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full mr-3">
                              <Wallet className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <div className="font-medium dark:text-white">Dompet Digital</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                Dana: 0812-3456-7890 (Masjid Baitul Makmur)
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-full mr-3">
                              <QrCode className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <div>
                              <div className="font-medium dark:text-white">QRIS</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                Scan kode QR di masjid untuk donasi
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Konfirmasi transfer bisa melalui WhatsApp: 0812-3456-7890
                        </p>
                      </div>
                    </motion.div>
                  )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KeuanganPage