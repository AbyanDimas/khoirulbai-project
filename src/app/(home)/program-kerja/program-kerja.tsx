"use client";

// components/Section/WorkProgramDetail.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* =======================
   TYPE DEFINITIONS
======================= */
interface ProgramItem {
  id: number;
  nomor: number;
  nama_program: string;
  sasaran: string;
  waktu: string;
  penanggung_jawab?: string;
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
const WorkProgramDetail = () => {
  const [data, setData] = useState<ProgramKerja | null>(null);
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
          setData(json.data[0]);
        }
      } catch (error) {
        console.error("Gagal mengambil program kerja", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgramKerja();
  }, []);

  if (loading) {
    return (
      <section className="py-20 text-center text-gray-500">
        Memuat program kerja…
      </section>
    );
  }

  if (!data) {
    return (
      <section className="py-20 text-center text-gray-500">
        Data program kerja belum tersedia.
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold dark:text-white mb-2">
            {data.judul}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Periode {new Date(data.periode_mulai).getFullYear()} –{" "}
            {new Date(data.periode_selesai).getFullYear()}
          </p>
        </motion.div>

        {/* BIDANG */}
        <div className="space-y-12">
          {data.bidang.map((bidang, index) => (
            <motion.div
              key={bidang.id}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 dark:text-white">
                  {index + 1}. {bidang.nama_bidang}
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium  dark:text-white text-gray-500 uppercase">
                          No
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium  dark:text-white text-gray-500 uppercase">
                          Program
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium  dark:text-white text-gray-500 uppercase">
                          Sasaran
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium  dark:text-white text-gray-500 uppercase">
                          Waktu
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium  dark:text-white text-gray-500 uppercase">
                          PJ
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {bidang.program.map((item) => (
                        <tr
                          key={item.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        >
                          <td className="px-4 py-3 text-sm text-gray-500  dark:text-white">
                            {item.nomor}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                            {item.nama_program}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500 dark:text-white">
                            {item.sasaran}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500 dark:text-white">
                            {item.waktu}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500 dark:text-white">
                            {item.penanggung_jawab || "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkProgramDetail;
