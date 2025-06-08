'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Clock, Calendar, Compass, House, Sun, Moon, Sunrise, Sunset } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const PrayerTimesCalendar = () => {
  const searchParams = useSearchParams();
  
  // State for API data
  const [prayerTimes, setPrayerTimes] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Current date and navigation
  const currentDate = new Date();
  const [hijriYear, setHijriYear] = useState(1446); // Default Hijri year
  const [month, setMonth] = useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());
  
  // Location state
  const [latitude, setLatitude] = useState(searchParams.get('lat') || '-6.2088');
  const [longitude, setLongitude] = useState(searchParams.get('long') || '106.8456');
  
  // Calculation parameters
  const [method, setMethod] = useState(3); // Muslim World League
  const [school, setSchool] = useState(0); // Shafi
  const [midnightMode, setMidnightMode] = useState(0); // Standard
  const [calendarMethod, setCalendarMethod] = useState('HJCoSA'); // High Judicial Council of Saudi Arabia

  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const calculationMethods = [
    { id: 0, name: 'Jafari / Shia Ithna-Ashari' },
    { id: 1, name: 'University of Islamic Sciences, Karachi' },
    { id: 2, name: 'Islamic Society of North America' },
    { id: 3, name: 'Muslim World League' },
    { id: 4, name: 'Umm Al-Qura University, Makkah' },
    { id: 5, name: 'Egyptian General Authority of Survey' },
    { id: 7, name: 'Institute of Geophysics, University of Tehran' },
    { id: 8, name: 'Gulf Region' },
    { id: 9, name: 'Kuwait' },
    { id: 10, name: 'Qatar' },
    { id: 11, name: 'Majlis Ugama Islam Singapura' },
    { id: 12, name: 'Union Organization islamic de France' },
    { id: 13, name: 'Diyanet İşleri Başkanlığı, Turkey' },
    { id: 14, name: 'Spiritual Administration of Muslims of Russia' },
    { id: 15, name: 'Moonsighting Committee Worldwide' },
    { id: 16, name: 'Dubai (experimental)' },
    { id: 17, name: 'Jabatan Kemajuan Islam Malaysia (JAKIM)' },
    { id: 18, name: 'Tunisia' },
    { id: 19, name: 'Algeria' },
    { id: 20, name: 'KEMENAG Indonesia' },
    { id: 21, name: 'Morocco' },
    { id: 22, name: 'Comunidade Islamica de Lisboa' },
    { id: 23, name: 'Ministry of Awqaf, Jordan' },
    { id: 99, name: 'Custom Method' }
  ];

  const calendarMethods = [
    { id: 'HJCoSA', name: 'High Judicial Council of Saudi Arabia' },
    { id: 'UAQ', name: 'Umm al-Qura' },
    { id: 'DIYANET', name: 'Diyanet İşleri Başkanlığı' },
    { id: 'MATHEMATICAL', name: 'Mathematical Calculation' }
  ];

  // Fetch prayer times from Aladhan API
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const url = new URL(`https://api.aladhan.com/v1/hijriCalendar/${hijriYear}`);
        url.searchParams.append('latitude', latitude);
        url.searchParams.append('longitude', longitude);
        url.searchParams.append('method', method.toString());
        url.searchParams.append('school', school.toString());
        url.searchParams.append('midnightMode', midnightMode.toString());
        url.searchParams.append('calendarMethod', calendarMethod);
        
        const response = await fetch(url.toString());
        const data = await response.json();
        
        if (data.code === 200 && data.status === "OK") {
          setPrayerTimes(data.data);
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
    
    fetchPrayerTimes();
  }, [hijriYear, latitude, longitude, method, school, midnightMode, calendarMethod]);

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

  // Navigation functions
  const nextYear = () => setHijriYear(prev => prev + 1);
  const prevYear = () => setHijriYear(prev => prev - 1);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-center mb-2 text-emerald-600 dark:text-emerald-400">
          Jadwal Sholat Tahun Hijriah
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Berdasarkan lokasi dan metode perhitungan yang dipilih
        </p>
      </motion.div>

      {/* Controls Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Location Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Lokasi
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="Latitude"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              />
              <input
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="Longitude"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Calculation Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Metode Perhitungan
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            >
              {calculationMethods.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.name}
                </option>
              ))}
            </select>
          </div>

          {/* Calendar Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Metode Kalender
            </label>
            <select
              value={calendarMethod}
              onChange={(e) => setCalendarMethod(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            >
              {calendarMethods.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.name}
                </option>
              ))}
            </select>
          </div>

          {/* Year Navigation */}
          <div className="flex items-end gap-2">
            <button 
              onClick={prevYear}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 text-sm"
            >
              Tahun Sebelumnya
            </button>
            <div className="flex-1 text-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">Tahun Hijriah</div>
              <div className="text-xl font-bold dark:text-white">{hijriYear}</div>
            </div>
            <button 
              onClick={nextYear}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 text-sm"
            >
              Tahun Berikutnya
            </button>
          </div>
        </div>
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
          className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center"
        >
          <div className="text-red-600 dark:text-red-400 font-medium">{error}</div>
          <p className="text-sm text-red-500 dark:text-red-300 mt-1">
            Silakan cek koneksi internet atau parameter yang dimasukkan
          </p>
        </motion.div>
      )}

      {/* Prayer Times Grid */}
      {!loading && !error && prayerTimes && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {Object.entries(prayerTimes).map(([monthNum, days]: [string, any]) => {
            // Only show the first day of each month for the yearly view
            const firstDay = days[0];
            return (
              <motion.div
                key={monthNum}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="bg-emerald-600 dark:bg-emerald-700 p-3 text-white">
                  <h3 className="font-bold text-center">
                    {firstDay.date.hijri.month.en} {firstDay.date.hijri.year}
                  </h3>
                  <p className="text-center text-sm opacity-90">
                    {firstDay.date.readable}
                  </p>
                </div>

                <div className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Sunrise className="w-5 h-5 text-amber-500 mr-2" />
                      <span className="font-medium">Subuh:</span>
                      <span className="ml-auto font-mono">
                        {formatTime(firstDay.timings.Fajr)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Sun className="w-5 h-5 text-yellow-500 mr-2" />
                      <span className="font-medium">Syuruq:</span>
                      <span className="ml-auto font-mono">
                        {formatTime(firstDay.timings.Sunrise)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Compass className="w-5 h-5 text-blue-500 mr-2" />
                      <span className="font-medium">Dzuhur:</span>
                      <span className="ml-auto font-mono">
                        {formatTime(firstDay.timings.Dhuhr)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Sunset className="w-5 h-5 text-orange-500 mr-2" />
                      <span className="font-medium">Ashar:</span>
                      <span className="ml-auto font-mono">
                        {formatTime(firstDay.timings.Asr)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Moon className="w-5 h-5 text-indigo-500 mr-2" />
                      <span className="font-medium">Maghrib:</span>
                      <span className="ml-auto font-mono">
                        {formatTime(firstDay.timings.Maghrib)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <House className="w-5 h-5 text-purple-500 mr-2" />
                      <span className="font-medium">Isya:</span>
                      <span className="ml-auto font-mono">
                        {formatTime(firstDay.timings.Isha)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {firstDay.meta.method.name}
                      </span>
                      <a
                        href={`/jadwal/jumat/monthly?month=${monthNum}&year=${hijriYear}&lat=${latitude}&long=${longitude}&method=${method}`}
                        className="text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-md transition-colors"
                      >
                        Lihat Bulan Ini
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default PrayerTimesCalendar;