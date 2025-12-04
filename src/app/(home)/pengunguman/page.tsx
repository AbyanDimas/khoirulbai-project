"use client";

import {
  AlertCircle,
  ChevronRight,
  Calendar,
  Megaphone,
  Clock,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Announcement } from "@/app/types";

// Color variations for cards
const cardColors = [
  "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/20 border-l-4 border-blue-400",
  "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-900/20 border-l-4 border-green-400",
  "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-900/20 border-l-4 border-purple-400",
  "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-900/20 border-l-4 border-amber-400",
  "bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/30 dark:to-pink-900/20 border-l-4 border-pink-400",
];

const importantCardColor =
  "bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/40 dark:to-amber-900/30 border-l-4 border-amber-500";

export default function PengumumanPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const convertStrapiBlocks = (blocks: any): string => {
    if (!blocks) return "Tidak ada deskripsi";

    // Jika sudah string
    if (typeof blocks === "string") return blocks;

    // Jika formatnya array block (Strapi Rich Text)
    if (Array.isArray(blocks)) {
      return blocks
        .map((block) => {
          if (Array.isArray(block.children)) {
            return block.children
              .map((child: any) => child.text || "")
              .join(" ");
          }
          return "";
        })
        .join("\n\n");
    }

    return "";
  };

  const fetchAllAnnouncements = async () => {
    try {
      setLoading(true);
      setRefreshing(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/pengumuman-pentings?populate=*&sort[0]=tanggal:desc`,
      );

      if (!response.ok) {
        throw new Error("Gagal memuat pengumuman");
      }

      const data = await response.json();

      const formattedAnnouncements = data.data.map((item: any) => ({
        id: item.id.toString(),
        title: item.nama,
        // content: item.deskripsi || "Tidak ada deskripsi",
        content: convertStrapiBlocks(item.deskripsi),
        important: item.penting || false,
      }));

      setAnnouncements(formattedAnnouncements);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      console.error("Error fetching announcements:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAllAnnouncements();
  }, []);

  const handleRefresh = () => {
    fetchAllAnnouncements();
  };

  if (loading && !refreshing) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-[70vh]">
        <div className="flex flex-col items-center justify-center h-full">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full mb-4"
          />
          <motion.p
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-gray-600 dark:text-gray-400"
          >
            Memuat pengumuman...
          </motion.p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-[70vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl shadow-lg border border-red-100 dark:border-red-900/30 max-w-2xl mx-auto"
        >
          <div className="flex items-center text-red-600 dark:text-red-400 mb-4">
            <AlertCircle className="mr-3 flex-shrink-0" size={24} />
            <h2 className="text-xl font-bold">Gagal memuat pengumuman</h2>
          </div>
          <p className="mb-6 text-gray-700 dark:text-gray-300">{error}</p>
          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
            >
              {refreshing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" />
              )}
              Coba Lagi
            </button>
            <Link
              href="/"
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Kembali
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold dark:text-white flex items-center">
            <motion.span
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="inline-block mr-3"
            >
              <Megaphone className="text-emerald-600" size={32} />
            </motion.span>
            Pengumuman
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Informasi terbaru dari Masjid Khoirul Ba'i STM ADB
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded-lg transition-colors self-start sm:self-auto"
        >
          {refreshing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          Perbarui
        </motion.button>
      </motion.div>

      <AnimatePresence mode="wait">
        {announcements.length === 0 ? (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="text-center py-12 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900/50 border border-gray-200 dark:border-gray-700"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-gray-400 dark:text-gray-500 mb-6 inline-block"
            >
              <Megaphone size={56} className="mx-auto" />
            </motion.div>
            <h3 className="text-2xl font-medium text-gray-600 dark:text-gray-300">
              Memuat Pengumuman...
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-md mx-auto">
              Sedang menunggu pengumuman terbaru dari Masjid Khoirul Ba'i STM
              ADB. Silakan tunggu sebentar.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mt-6 inline-block"
            >
              <Link
                href="/"
                className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors flex items-center mx-auto w-fit"
              >
                <ChevronRight className="mr-1 h-5 w-5 rotate-180" />
                Kembali ke Beranda
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="announcements"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid gap-5"
          >
            {announcements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -3 }}
                className={`p-6 rounded-xl shadow-sm hover:shadow-md transition-all ${announcement.important ? importantCardColor : cardColors[index % cardColors.length]}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {announcement.important && (
                        <motion.span
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200"
                        >
                          <AlertCircle className="mr-1.5 h-3.5 w-3.5" />
                          Penting
                        </motion.span>
                      )}
                      <h3
                        className={`text-xl font-bold ${announcement.important ? "text-amber-900 dark:text-amber-100" : "dark:text-white"}`}
                      >
                        {announcement.title}
                      </h3>
                    </div>
                    <p
                      className={`text-gray-700 dark:text-gray-300 ${announcement.important ? "dark:text-amber-100/90" : ""}`}
                    >
                      {announcement.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {announcements.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center text-white dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 group transition-colors px-4 py-2 rounded-lg bg-orange-400 dark:bg-amber-900/20 dark:hover:bg-amber-900/30"
          >
            <motion.span whileHover={{ x: -3 }} className="mr-2 inline-block">
              <ChevronRight className="rotate-180 transition-transform group-hover:-translate-x-1" />
            </motion.span>
            <span className="hover:underline">Kembali ke Beranda</span>
          </Link>
        </motion.div>
      )}
    </div>
  );
}

