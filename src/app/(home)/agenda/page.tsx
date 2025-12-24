import Agenda from "./agenda";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agenda Kegiatan - Masjid Khoirul Ba'i STM ADB",
  description: "Jadwal lengkap kegiatan di Masjid Khoirul Ba'i STM ADB",
  keywords: "agenda masjid, jadwal kegiatan, pengajian, sholat, event, STM ADB",
};

const AgendaPage = () => {
  return <Agenda />;
};

export default AgendaPage;

