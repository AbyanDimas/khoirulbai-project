import GaleriComponent from "./GaleriComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeri - Masjid Khoirul Ba'i STM ADB",
  description: "Kumpulan foto dan video kegiatan Masjid Khoirul Ba'i STM ADB",
  keywords: "galeri, foto, video, dokumentasi, kegiatan masjid, STM ADB",
};

const GaleriPage = () => {
  return <GaleriComponent />;
};

export default GaleriPage;

