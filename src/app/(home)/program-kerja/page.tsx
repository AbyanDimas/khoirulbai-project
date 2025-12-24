import ProgramKerja from "./program-kerja";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Program Kerja - Masjid Khoirul Ba'i STM ADB",
  description: "Program kerja Masjid Khoirul Ba'i STM ADB periode 2025-2028.",
  keywords: "program kerja, masjid, STM ADB, idarah, imarah, ri'ayah, ijtimaiyah",
};

const ProgramKerjaPage = () => {
  return <ProgramKerja />;
};

export default ProgramKerjaPage;

