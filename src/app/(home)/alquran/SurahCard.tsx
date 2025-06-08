import { Surah } from "@/app/types/quran";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function SurahCard({ surah }: { surah: Surah }) {
  return (
    <Link
      href={`/alquran/surah/${surah.nomor}`}
      className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:bg-emerald-50 dark:hover:bg-gray-800 transition-colors border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 font-medium">
          {surah.nomor}
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-gray-100">{surah.namaLatin}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {surah.tempatTurun} • {surah.jumlahAyat} ayat
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-arabic text-2xl text-emerald-600 dark:text-emerald-400">{surah.nama}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{surah.arti}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
    </Link>
  );
}