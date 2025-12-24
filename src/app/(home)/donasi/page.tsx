import Donasi from "./donasi";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donasi - Masjid Khoirul Ba'i STM ADB",
  description: "Dukung kegiatan dakwah dan sosial Masjid Khoirul Ba'i STM ADB melalui donasi.",
  keywords: "donasi, infaq, shodaqoh, zakat, masjid, STM ADB",
};

const DonasiPage = () => {
  return <Donasi />;
};

export default DonasiPage;