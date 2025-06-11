import AyatItem from "@/app/(home)/alquran/AyatItem";
import { getSurahDetail } from "@/app/services/quran.service";
import { ChevronLeft, ChevronRight, Play, BookOpen } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: {
    nomor: string;
  };
}

export default async function SurahDetail({ params }: PageProps) {
  const surah = await getSurahDetail(parseInt(params.nomor));

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/alquran"
            className="flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Kembali</span>
          </Link>
          <Link
            href={`/alquran/surah/${params.nomor}/tafsir`}
            className="flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
          >
            <BookOpen className="w-5 h-5 mr-1" />
            <span>Tafsir</span>
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {surah.data.namaLatin}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {surah.data.tempatTurun} • {surah.data.jumlahAyat} ayat
              </p>
            </div>
            <p className="font-arabic text-3xl text-emerald-600 dark:text-emerald-400">
              {surah.data.nama}
            </p>
          </div>

          <div className="flex justify-center my-4">
            <button className="flex items-center justify-center p-3 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-colors">
              <Play className="w-6 h-6" />
            </button>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4">{surah.data.arti}</p>
          <div
            className="prose prose-sm text-gray-600 dark:text-gray-400 dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: surah.data.deskripsi }}
          />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
          {surah.data.ayat.map((ayat) => (
            <AyatItem key={ayat.nomorAyat} ayat={ayat} />
          ))}
        </div>

        <div className="flex justify-between mt-6">
          {surah.data.suratSebelumnya && (
            <Link
              href={`/alquran/surah/${surah.data.suratSebelumnya.nomor}`}
              className="flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <div className="ml-2">
                <p className="text-sm">Sebelumnya</p>
                <p className="font-medium">
                  {surah.data.suratSebelumnya.namaLatin}
                </p>
              </div>
            </Link>
          )}
          {surah.data.suratSelanjutnya && (
            <Link
              href={`/alquran/surah/${surah.data.suratSelanjutnya.nomor}`}
              className="flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors ml-auto"
            >
              <div className="mr-2 text-right">
                <p className="text-sm">Selanjutnya</p>
                <p className="font-medium">
                  {surah.data.suratSelanjutnya.namaLatin}
                </p>
              </div>
              <ChevronRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}