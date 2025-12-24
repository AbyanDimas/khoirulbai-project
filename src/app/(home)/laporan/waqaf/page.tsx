import Waqaf from "./waqaf";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Laporan Waqaf - Masjid Khoirul Ba'i STM ADB",
  description: "Laporan waqaf Masjid Khoirul Ba'i STM ADB.",
  keywords: "laporan waqaf, waqaf masjid, donasi, infaq, STM ADB",
};

const WaqafPage = () => {
  return <Waqaf />;
};

export default WaqafPage;