import Link from "next/link";
import { tausiyah } from "@/app/types";

interface tausiyahCardProps {
  tausiyah: tausiyah;
  index: number;
}

export const tausiyahCard = ({ tausiyah, index }: tausiyahCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow group">
      <Link href={"/tausiyah"}>
        <div className="p-4">
          <h3 className="font-bold dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {tausiyah.title}
          </h3>
        </div>
      </Link>
    </div>
  );
};
