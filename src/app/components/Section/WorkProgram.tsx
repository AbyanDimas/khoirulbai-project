"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

/* =======================
   TYPE DEFINITIONS
======================= */
interface ProgramItem {
  id: number;
  nomor: number;
  nama_program: string;
  sasaran: string;
  waktu: string;
}

interface ProgramBidang {
  id: number;
  nama_bidang: string;
  program: ProgramItem[];
}

interface ProgramKerja {
  id: number;
  judul: string;
  periode_mulai: string;
  periode_selesai: string;
  bidang: ProgramBidang[];
}

/* =======================
   COMPONENT
======================= */
export const HomeWorkProgram = () => {
  const [bidangPreview, setBidangPreview] = useState<ProgramBidang[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgramKerja = async () => {
      try {
        const res = await fetch(
          "/api/proxy/program-kerja-masjids?populate[bidang][populate][program]=*",
          { cache: "no-store" },
        );
        const json = await res.json();

        if (json?.data?.length > 0) {
          const bidang = json.data[0].bidang || [];

          // Ambil 2 bidang pertama
          const preview = bidang.slice(0, 2).map((b: ProgramBidang) => ({
            ...b,
            // Ambil 3 program pertama
            program: (b.program || []).slice(0, 3),
          }));

          setBidangPreview(preview);
        }
      } catch (error) {
        console.error("Gagal mengambil preview program kerja", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgramKerja();
  }, []);

  if (loading) {
    return (
      <section className="py-16 text-center text-gray-500">
        Memuat program kerja…
      </section>
    );
  }

  if (bidangPreview.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold dark:text-white mb-2">
            Program Kerja Masjid
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Rencana kegiatan Masjid Khoirul Ba&apos;i periode 2025–2028
          </p>
        </motion.div>

        {/* PREVIEW GRID */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {bidangPreview.map((bidang, index) => (
            <div
              key={bidang.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 dark:text-white flex items-center">
                  <span className="bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                    {index + 1}
                  </span>
                  {bidang.nama_bidang}
                </h3>

                <div className="space-y-4">
                  {bidang.program.map((item) => (
                    <div
                      key={item.id}
                      className="border-l-4 border-emerald-500 pl-4 py-1"
                    >
                      <h4 className="font-medium dark:text-white">
                        {item.nama_program}
                      </h4>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <span>Sasaran: {item.sasaran}</span>
                        <span>Waktu: {item.waktu}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/program-kerja"
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          >
            Lihat Semua Program Kerja <ChevronRight className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

