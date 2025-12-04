"use client";

import { AlertCircle, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Announcement } from "@/app/types";

export const ImportantAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImportantAnnouncements = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/pengumuman-pentings?populate=*&sort[0]=tanggal:desc&pagination[limit]=5`,
        );

        if (!response.ok) {
          throw new Error("Gagal memuat pengumuman penting");
        }

        const data = await response.json();

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

        const formattedAnnouncements = data.data.map((item: any) => ({
          id: item.id.toString(),
          title: item.nama,
          // content: item.deskripsi || "Tidak ada deskripsi",
          content: convertStrapiBlocks(item.deskripsi),
          important: true,
        }));

        setAnnouncements(formattedAnnouncements);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan tidak diketahui",
        );
        console.error("Error fetching important announcements:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImportantAnnouncements();
  }, []);

  if (loading) {
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
        {/* AWS-style loading skeleton */}
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-5 bg-amber-100 dark:bg-amber-800/50 rounded w-3/4 mb-3"></div>
              <div className="h-3 bg-amber-100 dark:bg-amber-800/50 rounded w-full mb-1"></div>
              <div className="h-3 bg-amber-100 dark:bg-amber-800/50 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (error) {
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
        {/* AWS-style error component */}
        <div className="border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500 dark:text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                Gagal Memuat Pengumuman
              </h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                <p>Periksa Jaringan Anda Atau Coba Lagi Nanti</p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:text-red-200 dark:bg-red-800/50 dark:hover:bg-red-800"
                >
                  Coba Lagi
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

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

      {announcements.length === 0 ? (
        <div className="text-center py-4 text-gray-600 dark:text-gray-400">
          Tidak ada pengumuman penting saat ini
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {announcements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xs"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold dark:text-white">
                      {announcement.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      {announcement.content}
                    </p>
                  </div>
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
        </>
      )}
    </motion.div>
  );
};

