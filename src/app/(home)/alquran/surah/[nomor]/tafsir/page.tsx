import TafsirItem from "@/app/(home)/alquran/TafsirItem";
import { getTafsir } from "@/app/services/quran.service";
import { ChevronLeft, BookOpen } from "lucide-react";
import Link from "next/link";

export default async function TafsirPage({
  params,
}: {
  params: { nomor: string };
}) {
  const tafsir = await getTafsir(parseInt(params.nomor));

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link
            href={`/alquran/surah/${params.nomor}`}
            className="flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Kembali ke Surah</span>
          </Link>
          <div className="flex items-center text-emerald-600 dark:text-emerald-400">
            <BookOpen className="w-5 h-5 mr-1" />
            <span>Tafsir</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {tafsir.data.namaLatin}
              </h1>
              <p className="text-gray-600 dark:text-gray-100">
                {tafsir.data.tempatTurun} • {tafsir.data.jumlahAyat} ayat
              </p>
            </div>
            <p className="font-arabic text-3xl text-emerald-600 dark:text-emerald-400">
              {tafsir.data.nama}
            </p>
          </div>

          <p className="text-gray-700 dark:text-gray-100 mb-4">{tafsir.data.arti}</p>
          <div
            className="prose prose-sm text-gray-600 dark:text-gray-400 dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: tafsir.data.deskripsi }}
          />
        </div>

        <div className="bg-white dark:text-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
          {tafsir.data.tafsir.map((tafsirItem) => (
            <TafsirItem key={tafsirItem.ayat} tafsir={tafsirItem} />
          ))}
        </div>
      </div>
    </div>
  );
}