import Pengumuman from "./pengunguman";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pengumuman - Masjid Khoirul Ba'i STM ADB",
  description: "Pengumuman terbaru dari Masjid Khoirul Ba'i STM ADB.",
  keywords: "pengumuman, informasi, masjid, STM ADB",
};

const PengumumanPage = () => {
  return <Pengumuman />;
};

export default PengumumanPage;

