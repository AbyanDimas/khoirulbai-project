import { CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Event } from '@/app/types';

interface EventCardProps {
  event: Event;
  index: number;
}

export const EventCard = ({ event, index }: EventCardProps) => {
  return (
    <motion.div
      key={event.id}
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.1 * index }}
      className="group cursor-pointer"
    >
      <div className="flex">
        <div className="bg-emerald-100 dark:bg-emerald-900/20 w-12 h-12 rounded-lg flex items-center justify-center mr-3">
          <CalendarDays className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {event.title}
          </h3>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {event.date} • {event.time}
          </div>
          <div className="text-xs mt-1 text-emerald-600 dark:text-emerald-400">
            {event.location}
          </div>
        </div>
      </div>
    </motion.div>
  );
};