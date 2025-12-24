import Tausiyah from "./tausiyah";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tausiyah - Masjid Khoirul Ba'i STM ADB",
  description: "Kumpulan video, audio, dan artikel kajian Islami dari berbagai ustadz.",
  keywords: "tausiyah, kajian, ceramah, video, audio, artikel, STM ADB",
};

const TausiyahPage = () => {
  return <Tausiyah />;
};

export default TausiyahPage;