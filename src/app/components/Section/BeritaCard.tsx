import Link from "next/link";
import { Berita } from "@/app/types";

interface BeritaCardProps {
  berita: Berita;
  index: number;
}

export const BeritaCard = ({ berita, index }: BeritaCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow group">
      <Link href={`/berita/${berita.slug}`}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={berita.image} 
            alt={berita.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 bg-emerald-600 text-white px-2 py-1 text-xs font-medium">
            {berita.category}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
            {berita.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3">
            {berita.content}
          </p>
          <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
            <span>{berita.date}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};