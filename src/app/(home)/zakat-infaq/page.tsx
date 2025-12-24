import ZakatInfaqComponent from "./ZakatInfaqComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zakat & Infaq - Masjid Khoirul Ba'i STM ADB",
  description: "Informasi, kalkulator, dan program zakat, infaq, dan sedekah di Masjid Khoirul Ba'i STM ADB.",
  keywords: "zakat, infaq, sedekah, donasi, masjid, STM ADB",
};

const ZakatInfaqPage = () => {
  return <ZakatInfaqComponent />;
};

export default ZakatInfaqPage;
