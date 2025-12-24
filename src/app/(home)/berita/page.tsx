import Berita from "./berita";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Berita & Artikel - Masjid Khoirul Ba'i STM ADB",
  description: "Informasi terbaru seputar kegiatan Masjid Khoirul Ba'i STM ADB",
  keywords: "berita masjid, artikel islami, kegiatan masjid, STM ADB",
};

const BeritaPage = () => {
  return <Berita />;
};

export default BeritaPage;
