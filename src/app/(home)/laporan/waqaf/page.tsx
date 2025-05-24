'use client';

import { motion } from 'framer-motion';
import { ChevronRight, HeartHandshake, Landmark, Hammer, ScrollText, BadgeCheck, House, BookOpen, Droplet } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const Waqaf = () => {
  const [activeTab, setActiveTab] = useState('program');
  const [donationAmount, setDonationAmount] = useState(100000);

  const waqfPrograms = [
    {
      id: 1,
      title: "Wakaf Pembangunan Masjid",
      description: "Bantu pembangunan masjid dengan wakaf tanah atau material bangunan",
      icon: <House className="w-6 h-6 text-emerald-600" />,
      progress: 65,
      target: 500000000,
      collected: 325000000,
      category: "infrastruktur"
    },
    {
      id: 2,
      title: "Wakaf Al-Qur'an",
      description: "Wakaf Al-Qur'an untuk kebutuhan jamaah dan TPA",
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
      progress: 90,
      target: 10000000,
      collected: 9000000,
      category: "pendidikan"
    },
    {
      id: 3,
      title: "Wakaf Tanah Kuburan",
      description: "Wakaf tanah untuk perluasan area pemakaman muslim",
      icon: <Landmark className="w-6 h-6 text-amber-600" />,
      progress: 40,
      target: 200000000,
      collected: 80000000,
      category: "sosial"
    },
    {
      id: 4,
      title: "Wakaf Air Bersih",
      description: "Pembangunan sumur dan instalasi air bersih untuk warga",
      icon: <Droplet className="w-6 h-6 text-cyan-600" />,
      progress: 30,
      target: 75000000,
      collected: 22500000,
      category: "sosial"
    }
  ];

  const waqfStories = [
    {
      id: 1,
      title: "Masjid Al-Ikhlas",
      description: "Berhasil membangun masjid dari wakaf masyarakat",
      year: 2022,
      location: "Tegal, Jawa Tengah"
    },
    {
      id: 2,
      title: "TPA Baitul Hikmah",
      description: "Pembangunan TPA dari dana wakaf pendidikan",
      year: 2021,
      location: "Brebes, Jawa Tengah"
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Wakaf Masjid</h1>
          <p className="text-gray-600 dark:text-gray-400">Berpartisipasi dalam program wakaf untuk kemaslahatan umat</p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
          <BadgeCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span className="dark:text-white">Wakaf Terverifikasi</span>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
        <button
          onClick={() => setActiveTab('program')}
          className={`px-4 py-2 font-medium ${activeTab === 'program' ? 'text-emerald-600 border-b-2 border-emerald-600 dark:text-emerald-400 dark:border-emerald-400' : 'text-gray-500 dark:text-gray-400'}`}
        >
          Program Wakaf
        </button>
        <button
          onClick={() => setActiveTab('stories')}
          className={`px-4 py-2 font-medium ${activeTab === 'stories' ? 'text-emerald-600 border-b-2 border-emerald-600 dark:text-emerald-400 dark:border-emerald-400' : 'text-gray-500 dark:text-gray-400'}`}
        >
          Kisah Sukses
        </button>
        <button
          onClick={() => setActiveTab('guide')}
          className={`px-4 py-2 font-medium ${activeTab === 'guide' ? 'text-emerald-600 border-b-2 border-emerald-600 dark:text-emerald-400 dark:border-emerald-400' : 'text-gray-500 dark:text-gray-400'}`}
        >
          Panduan Wakaf
        </button>
      </div>

      {/* Program Wakaf Content */}
      {activeTab === 'program' && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {waqfPrograms.map((program) => (
            <div key={program.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    {program.icon}
                  </div>
                  <h2 className="text-xl font-bold dark:text-white">{program.title}</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{program.description}</p>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Terkumpul</span>
                    <span className="font-medium dark:text-white">{formatCurrency(program.collected)}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-emerald-600 h-2.5 rounded-full" 
                      style={{ width: `${program.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-600 dark:text-gray-400">Target</span>
                    <span className="font-medium dark:text-white">{formatCurrency(program.target)}</span>
                  </div>
                </div>

                <Link 
                  href={`/waqaf/${program.id}`}
                  className="w-full mt-4 inline-flex justify-center items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Wakaf Sekarang <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Kisah Sukses Content */}
      {activeTab === 'stories' && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {waqfStories.map((story) => (
            <div key={story.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <HeartHandshake className="w-6 h-6 text-emerald-600" />
                  <h2 className="text-xl font-bold dark:text-white">{story.title}</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{story.description}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">{story.location}</span>
                  <span className="text-gray-500 dark:text-gray-400">{story.year}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Panduan Wakaf Content */}
      {activeTab === 'guide' && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold dark:text-white mb-4">Panduan Wakaf</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="font-bold dark:text-white mb-2">1. Apa itu Wakaf?</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Wakaf adalah menahan harta yang bisa dimanfaatkan tanpa lenyap bendanya dengan cara tidak melakukan tindakan hukum terhadap benda tersebut, disalurkan pada sesuatu yang mubah (diperbolehkan) yang ada.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="font-bold dark:text-white mb-2">2. Keutamaan Wakaf</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Wakaf termasuk amal jariyah yang pahalanya terus mengalir meskipun pewakaf telah meninggal dunia. Rasulullah SAW bersabda: "Jika manusia meninggal dunia, terputuslah amalnya kecuali tiga perkara: sedekah jariyah, ilmu yang bermanfaat, dan anak shalih yang mendoakannya." (HR. Muslim)
                  </p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="font-bold dark:text-white mb-2">3. Tata Cara Wakaf</h3>
                  <ol className="list-decimal list-inside text-gray-600 dark:text-gray-400 space-y-2">
                    <li>Niat wakaf karena Allah semata</li>
                    <li>Harta yang diwakafkan harus jelas dan milik sendiri</li>
                    <li>Penerima wakaf harus jelas</li>
                    <li>Mengisi formulir wakaf dan disaksikan oleh dua orang saksi</li>
                    <li>Bendahara masjid akan mengelola wakaf sesuai peruntukannya</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Donation Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-6 mb-8"
      >
        <h2 className="text-xl font-bold dark:text-white mb-4">Wakaf Sekarang</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium dark:text-white mb-2">Jumlah Wakaf</h3>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[100000, 250000, 500000, 1000000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setDonationAmount(amount)}
                  className={`py-2 rounded-lg ${donationAmount === amount ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-gray-700 dark:text-white'}`}
                >
                  {formatCurrency(amount)}
                </button>
              ))}
            </div>
            <div className="relative mb-4">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">Rp</span>
              <input
                type="number"
                value={donationAmount}
                onChange={(e) => setDonationAmount(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                placeholder="Masukkan jumlah lain"
              />
            </div>
          </div>
          <div>
            <h3 className="font-medium dark:text-white mb-2">Metode Pembayaran</h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {['Bank Syariah', 'E-Wallet', 'Transfer', 'Tunai'].map((method) => (
                <button
                  key={method}
                  className="py-2 bg-white dark:bg-gray-700 rounded-lg dark:text-white"
                >
                  {method}
                </button>
              ))}
            </div>
            <button className="w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
              Lanjutkan Wakaf
            </button>
          </div>
        </div>
      </motion.div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="text-xl font-bold dark:text-white mb-2">Pertanyaan tentang Wakaf?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Hubungi kami untuk informasi lebih lanjut tentang program wakaf dan pengelolaannya.
            </p>
          </div>
          <Link
            href="/kontak"
            className="flex items-center justify-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Hubungi Takmir
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Waqaf;