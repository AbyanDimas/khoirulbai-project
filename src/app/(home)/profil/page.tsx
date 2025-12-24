import Profile from "./profil";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil Masjid - Masjid Khoirul Ba'i STM ADB",
  description: "Profil Masjid Khoirul Ba'i STM ADB.",
  keywords: "profil masjid, tentang kami, sejarah, visi, misi, STM ADB",
};

const ProfilPage = () => {
  return <Profile />;
};

export default ProfilPage;