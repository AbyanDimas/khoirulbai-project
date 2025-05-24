import { motion } from 'framer-motion';
import { ChevronRight, Play, Pause, Volume2, Clock3, Bookmark, Share2, Download, Users } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export const LiveStreaming = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="container mx-auto px-4 py-12 bg-gray-50 dark:bg-gray-900">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex justify-between items-center mb-8"
      >
        <div>
          <h2 className="text-2xl font-bold dark:text-white">Live Streaming</h2>
          <p className="text-gray-600 dark:text-gray-400">Siaran langsung dari Masjid Baitul Makmur</p>
        </div>
        <div className="flex items-center">
          <span className="flex items-center text-red-600 text-sm mr-4">
            <span className="w-2 h-2 bg-red-600 rounded-full mr-1 animate-pulse"></span>
            LIVE NOW
          </span>
          <Link 
            href="/live" 
            className="flex items-center text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Lihat semua <ChevronRight className="ml-1" />
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
      >
        <div className="aspect-video bg-black relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-white text-lg mb-2">Sholat Jumat</div>
              <div className="text-gray-400 text-sm">14 Juni 2024 • 12:00 WIB</div>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <button 
                className="text-white bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>
              <button className="text-white bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors">
                <Volume2 className="h-5 w-5" />
              </button>
              <div className="text-white text-sm bg-black/30 px-2 py-1 rounded">
                12:45 / 45:20
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-white bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors">
                <Bookmark className="h-5 w-5" />
              </button>
              <button className="text-white bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="text-white bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors">
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold dark:text-white mb-1">Sholat Jumat Bersama - Ust. Muhammad Ali</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Siaran langsung sholat Jumat dari Masjid Baitul Makmur
          </p>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
              <Users className="h-3 w-3 mr-1" />
              245 Sedang Menonton
            </div>
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
              <Clock3 className="h-3 w-3 mr-1" />
              Mulai 12:00 WIB
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};