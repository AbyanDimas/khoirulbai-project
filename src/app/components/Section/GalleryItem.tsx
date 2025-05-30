import { CalendarDays, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { GalleryItem } from '@/app/types';

interface GalleryItemProps {
  item: GalleryItem;
  index: number;
}

export const GalleryItemComponent = ({ item, index }: GalleryItemProps) => {
  return (
    <motion.div
      key={item.id}
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.05 * index }}
      viewport={{ once: true }}
      className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer relative group"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
        style={{ backgroundImage: `url(${item.image})` }}
      >
        {item.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
              <Play className="text-white h-5 w-5 ml-1" />
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
          <div>
            <h3 className="text-white font-medium text-sm line-clamp-2">{item.title}</h3>
            <div className="flex items-center text-white/80 text-xs">
              <CalendarDays className="h-3 w-3 mr-1" />
              {item.date}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};