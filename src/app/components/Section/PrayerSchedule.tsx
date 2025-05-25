import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { PrayerTime, PrayerSchedule } from '@/app/types';

interface PrayerScheduleProps {
  schedule: PrayerSchedule;
  nextPrayer: PrayerTime;
  currentTime: Date;
}

export const PrayerScheduleSection = ({ 
  schedule, 
  nextPrayer, 
  currentTime 
}: PrayerScheduleProps) => {
  const [activeTab, setActiveTab] = useState<'today' | 'tomorrow'>('today');
  const [currentSchedule, setCurrentSchedule] = useState<PrayerTime[]>([]);

  useEffect(() => {
    const updateSchedule = () => {
      const now = currentTime.getHours() * 60 + currentTime.getMinutes();
      const targetSchedule = activeTab === 'today' ? schedule.today : schedule.tomorrow;

      const updated = targetSchedule.map(prayer => {
        const [hours, minutes] = prayer.time.split(':').map(Number);
        const prayerTime = hours * 60 + minutes;
        return { ...prayer, passed: now > prayerTime };
      });

      setCurrentSchedule(updated);
    };

    updateSchedule();
    const interval = setInterval(updateSchedule, 1000); // Update every second

    return () => clearInterval(interval);
  }, [currentTime, activeTab, schedule]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center dark:text-white">
            <Clock className="mr-2 text-emerald-600 dark:text-emerald-400" />
            Jadwal Sholat
          </h2>
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button 
              onClick={() => setActiveTab('today')}
              className={`px-3 py-1 text-sm rounded-md ${
                activeTab === 'today' 
                  ? 'bg-white dark:bg-gray-600 shadow-sm' 
                  : ''
              }`}
            >
              Hari Ini
            </button>
            <button 
              onClick={() => setActiveTab('tomorrow')}
              className={`px-3 py-1 text-sm rounded-md ${
                activeTab === 'tomorrow' 
                  ? 'bg-white dark:bg-gray-600 shadow-sm' 
                  : ''
              }`}
            >
              Besok
            </button>
          </div>
        </div>
        
        <div className="space-y-3">
          {currentSchedule.map((sholat, index) => (
            <motion.div
              key={`${activeTab}-${sholat.name}-${index}`}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              className={`flex justify-between items-center p-3 rounded-lg ${
                sholat.passed 
                  ? 'bg-gray-50 dark:bg-gray-700/50' 
                  : sholat.name === nextPrayer.name 
                    ? 'bg-emerald-50 dark:bg-emerald-900/30' 
                    : 'bg-white dark:bg-gray-800'
              }`}
            >
              <div className="flex items-center">
                <div className={`p-2 rounded-full mr-3 ${
                  sholat.passed 
                    ? 'text-gray-400' 
                    : 'text-emerald-600 dark:text-emerald-400'
                }`}>
                  {sholat.icon}
                </div>
                <span className={`font-medium ${
                  sholat.passed 
                    ? 'text-gray-500 dark:text-gray-400' 
                    : 'dark:text-white'
                }`}>
                  {sholat.name}
                </span>
              </div>
              <span className={`font-bold ${
                sholat.passed 
                  ? 'text-gray-400' 
                  : 'text-emerald-600 dark:text-emerald-400'
              }`}>
                {sholat.time}
              </span>
            </motion.div>
          ))}
        </div>

        <Link 
          href="/jadwal-sholat" 
          className="inline-flex items-center mt-4 text-emerald-600 dark:text-emerald-400 hover:underline text-sm"
        >
          Lihat jadwal bulanan <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};