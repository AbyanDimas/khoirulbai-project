import TentangKami from "./tentang-kami";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami - Masjid Khoirul Ba'i STM ADB",
  description: "Tim pengembang di balik website Masjid Khoirul Ba'i STM ADB.",
  keywords: "tentang kami, tim pengembang, developer, masjid, STM ADB",
};

const TentangKamiPage = () => {
  return <TentangKami />;
};

export default TentangKamiPage;