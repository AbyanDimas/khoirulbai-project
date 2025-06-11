import { Tafsir } from "@/app/types/quran";

export default function TafsirItem({ tafsir }: { tafsir: Tafsir }) {
  return (
    <div className="p-4 border-b">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 font-medium mb-3">
        {tafsir.ayat}
      </div>
      <p className="text-gray-700 dark:text-gray-100">{tafsir.teks}</p>
    </div>
  );
}