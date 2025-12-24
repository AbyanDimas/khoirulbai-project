import Keuangan from "./keuangan";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Laporan Keuangan - Masjid Khoirul Ba'i STM ADB",
  description: "Laporan keuangan Masjid Khoirul Ba'i STM ADB.",
  keywords: "laporan keuangan, keuangan masjid, donasi, infaq, STM ADB",
};

const LaporanKeuanganPage = () => {
  return <Keuangan />;
};

export default LaporanKeuanganPage;