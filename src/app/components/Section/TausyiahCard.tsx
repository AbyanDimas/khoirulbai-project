import Link from 'next/link';
import { Clock, Users, Play } from 'lucide-react';
import { Tausyiah } from '@/app/types';

interface TausyiahCardProps {
  tausyiah: Tausyiah;
  index: number;
}

export const TausyiahCard = ({ tausyiah, index }: TausyiahCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow group">
      <Link href={`/tausyiah/${tausyiah.id}`}>
        <div className="h-48 bg-gray-300 dark:bg-gray-700 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
            style={{ backgroundImage: `url(${tausyiah.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
              <span className={`text-xs px-2 py-1 rounded ${tausyiah.type === 'video' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}`}>
                {tausyiah.type === 'video' ? 'Video' : 'Audio'}
              </span>
              <span className="ml-auto text-white text-sm bg-black/30 px-2 py-1 rounded">
                {tausyiah.duration}
              </span>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
              <Play className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {tausyiah.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
            {tausyiah.description}
          </p>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
              <Clock className="h-3 w-3 mr-1" />
              {tausyiah.date} • {tausyiah.time}
            </div>
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
              <Users className="h-3 w-3 mr-1" />
              {tausyiah.views}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};