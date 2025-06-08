'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Clock, Calendar, Compass, House, Sun, Moon, Sunrise, Sunset } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const MonthlyPrayerTimes = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get parameters from URL
  const month = searchParams.get('month');
  const year = searchParams.get('year');
  const latitude = searchParams.get('lat') || '-6.2088';
  const longitude = searchParams.get('long') || '106.8456';
  const method = searchParams.get('method') || '3';
  
  // State for API data
  const [prayerTimes, setPrayerTimes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hijriMonth, setHijriMonth] = useState<any>(null);

  // Fetch prayer times for the month
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const url = new URL(`https://api.aladhan.com/v1/calendar/${year}/${month}`);
        url.searchParams.append('latitude', latitude);
        url.searchParams.append('longitude', longitude);
        url.searchParams.append('method', method);
        
        const response = await fetch(url.toString());
        const data = await response.json();
        
        if (data.code === 200 && data.status === "OK") {
          setPrayerTimes(data.data);
          if (data.data.length > 0) {
            setHijriMonth(data.data[0].date.hijri.month);
          }
        } else {
          setError(data.status || "Failed to fetch prayer times");
        }
      } catch (err) {
        setError("Failed to connect to the server");
        console.error("Error fetching prayer times:", err);
      } finally {
        setLoading(false);
      }
    };
    
    if (month && year) {
      fetchPrayerTimes();
    }
  }, [month, year, latitude, longitude, method]);

  // Format time by removing timezone info
  const formatTime = (timeString: string) => {
    return timeString.split(' ')[0];
  };

  // Format date to Indonesian locale
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  if (!month || !year) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <p>Parameter bulan atau tahun tidak valid</p>
          <Link href="/prayer-times" className="text-blue-600 hover:underline mt-2 inline-block">
            Kembali ke Kalender Tahunan
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-4">
          <Link 
            href="/prayer-times" 
            className="flex items-center text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            <ChevronRight className="rotate-180 mr-1" size={20} />
            Kembali
          </Link>
          
          <h1 className="text-2xl font-bold text-center text-emerald-600 dark:text-emerald-400">
            {hijriMonth?.en || 'Loading...'} {year}
          </h1>
          
          <div className="w-24"></div> {/* Spacer untuk balance layout */}
        </div>
        
        <p className="text-center text-gray-600 dark:text-gray-400">
          Jadwal Sholat Bulanan untuk Lokasi: {latitude}, {longitude}
        </p>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center items-center py-12"
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">Memuat jadwal sholat...</span>
        </motion.div>
      )}

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center mb-8"
        >
          <div className="text-red-600 dark:text-red-400 font-medium">{error}</div>
          <p className="text-sm text-red-500 dark:text-red-300 mt-1">
            Silakan cek koneksi internet atau parameter yang dimasukkan
          </p>
        </motion.div>
      )}

      {/* Prayer Times Table */}
      {!loading && !error && prayerTimes.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-emerald-50 dark:bg-emerald-900/30">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Subuh
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Syuruq
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Dzuhur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Ashar
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Maghrib
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Isya
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {prayerTimes.map((day: any, index: number) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/30'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatDate(day.date.gregorian.date)}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {day.date.hijri.day} {day.date.hijri.month.en} {day.date.hijri.year}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">
                      {formatTime(day.timings.Fajr)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">
                      {formatTime(day.timings.Sunrise)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">
                      {formatTime(day.timings.Dhuhr)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">
                      {formatTime(day.timings.Asr)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">
                      {formatTime(day.timings.Maghrib)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">
                      {formatTime(day.timings.Isha)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MonthlyPrayerTimes;