import Contact from "./kontak";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak - Masjid Khoirul Ba'i STM ADB",
  description: "Hubungi Masjid Khoirul Ba'i STM ADB.",
  keywords: "kontak, hubungi kami, alamat, telepon, email, masjid, STM ADB",
};

const KontakPage = () => {
  return <Contact />;
};

export default KontakPage;