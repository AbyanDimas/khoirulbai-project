import JadwalSholat from "./jadwal-sholat";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jadwal Sholat - Masjid Khoirul Ba'i STM ADB",
  description: "Jadwal sholat harian untuk Masjid Khoirul Ba'i STM ADB.",
  keywords: "jadwal sholat, waktu sholat, sholat, masjid, STM ADB",
};

const JadwalSholatPage = () => {
  return <JadwalSholat />;
};

export default JadwalSholatPage;