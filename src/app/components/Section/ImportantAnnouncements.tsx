import { AlertCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Announcement } from '@/app/types';

interface ImportantAnnouncementsProps {
  announcements: Announcement[];
}

export const ImportantAnnouncements = ({ announcements }: ImportantAnnouncementsProps) => {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-amber-50 dark:bg-amber-900/20 rounded-xl shadow-sm p-6"
    >
      <h2 className="text-xl font-bold mb-4 flex items-center dark:text-white">
        <AlertCircle className="mr-2 text-amber-600 dark:text-amber-400" />
        Pengumuman Penting
      </h2>
      <div className="space-y-4">
        {announcements.filter(a => a.important).map((announcement, index) => (
          <motion.div
            key={announcement.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index }}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xs"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold dark:text-white">{announcement.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{announcement.content}</p>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                {announcement.date}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      <Link 
        href="/pengumuman" 
        className="inline-flex items-center mt-4 text-amber-600 dark:text-amber-400 hover:underline text-sm"
      >
        Lihat semua pengumuman <ChevronRight className="ml-1 h-4 w-4" />
      </Link>
    </motion.div>
  );
};