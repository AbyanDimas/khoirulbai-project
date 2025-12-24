"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clipboard, ArrowLeft, Download } from "lucide-react";
import Link from "next/link";

type Transaksi = {
  id: number;
  tanggal: string;
  uraian: string;
  pemasukan: number;
  pengeluaran: number;
  saldo: number;
};

type RekapKeuangan = {
  id: number;
  judul: string;
  periode_mulai: string;
  periode_selesai: string;
  total_pemasukan: number;
  total_pengeluaran: number;
  saldo_akhir: number;
  transaksi: Transaksi[];
};

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);

export const FinancialReportPage = () => {
  const [rekap, setRekap] = useState<RekapKeuangan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKeuangan = async () => {
      try {
        const res = await fetch("/api/proxy/rekap-keuangans?populate=*", {
          cache: "no-store",
        });
        const json = await res.json();

        if (json?.data?.length > 0) {
          setRekap(json.data[0]);
        }
      } catch (error) {
        console.error("Gagal mengambil data keuangan", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKeuangan();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Memuat laporan keuangan…</p>
      </div>
    );
  }

  if (!rekap) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Data keuangan belum tersedia.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* HEADER */}
      <section className="relative bg-emerald-700 text-white py-16">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center text-white/80 hover:text-white mb-6"
          >
            <ArrowLeft className="mr-2 h-5 w-5" /> Kembali
          </Link>

          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl font-bold flex items-center"
          >
            <Clipboard className="mr-3 h-8 w-8" />
            {rekap.judul}
          </motion.h1>

          <p className="mt-2 text-lg">
            Periode {formatDate(rekap.periode_mulai)} –{" "}
            {formatDate(rekap.periode_selesai)}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            {/* SUMMARY */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <SummaryCard
                title="Total Pemasukan"
                value={rekap.total_pemasukan}
                color="emerald"
              />
              <SummaryCard
                title="Total Pengeluaran"
                value={rekap.total_pengeluaran}
                color="red"
              />
              <SummaryCard
                title="Saldo Akhir"
                value={rekap.saldo_akhir}
                color="blue"
              />
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <Th>Tanggal</Th>
                    <Th>Uraian</Th>
                    <Th align="right">Pemasukan</Th>
                    <Th align="right">Pengeluaran</Th>
                    <Th align="right">Saldo</Th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-gray-700">
                  {rekap.transaksi.map((trx) => (
                    <tr key={trx.id}>
                      <Td>{formatDate(trx.tanggal)}</Td>
                      <Td>{trx.uraian}</Td>
                      <Td align="right" className="text-emerald-600">
                        {trx.pemasukan ? formatCurrency(trx.pemasukan) : "-"}
                      </Td>
                      <Td align="right" className="text-red-600">
                        {trx.pengeluaran
                          ? formatCurrency(trx.pengeluaran)
                          : "-"}
                      </Td>
                      <Td align="right" className="font-bold">
                        {formatCurrency(trx.saldo)}
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* FOOTER */}
            <div className="mt-6 text-sm text-gray-500">
              Total {rekap.transaksi.length} transaksi
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

function SummaryCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: "emerald" | "red" | "blue";
}) {
  return (
    <div className={`bg-${color}-50 dark:bg-${color}-900/20 p-4 rounded-lg`}>
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className={`text-2xl font-bold text-${color}-600`}>
        {formatCurrency(value)}
      </p>
    </div>
  );
}

function Th({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th className={`px-6 py-3 text-xs uppercase text-gray-500 text-${align}`}>
      {children}
    </th>
  );
}

function Td({
  children,
  align = "left",
  className = "",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
  className?: string;
}) {
  return (
    <td
      className={`px-6 py-4 text-sm text-${align} text-gray-700 dark:text-gray-200 ${className}`}
    >
      {children}
    </td>
  );
}

export default FinancialReportPage;
