import WeatherPage from "./cuaca";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prakiraan Cuaca - Masjid Khoirul Ba'i STM ADB",
  description: "Informasi prakiraan cuaca terkini di sekitar Masjid Khoirul Ba'i STM ADB",
  keywords: "cuaca, prakiraan cuaca, cuaca masjid, STM ADB",
};

const CuacaPage = () => {
  return <WeatherPage />;
};

export default CuacaPage;
