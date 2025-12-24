import Search from "./search";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pencarian - Masjid Khoirul Ba'i STM ADB",
  description: "Cari informasi, berita, agenda, dan lainnya di Masjid Khoirul Ba'i STM ADB.",
  keywords: "pencarian, cari, informasi, masjid, STM ADB",
};

const SearchPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return <Search searchParams={searchParams} />;
};

export default SearchPage;

