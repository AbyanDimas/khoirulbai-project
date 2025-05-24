import { CalendarDays, ChevronRight, Plus } from 'lucide-react';
import Link from 'next/link';
import { Event } from '@/app/types';
import { EventCard } from '@/app/components/Section/EventCard';

interface UpcomingEventsProps {
  events: Event[];
}

export const UpcomingEvents = ({ events }: UpcomingEventsProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center dark:text-white">
            <CalendarDays className="mr-2 text-emerald-600 dark:text-emerald-400" />
            Agenda Terdekat
          </h2>
          <Link href="/agenda" className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline">
            Lihat Semua
          </Link>
        </div>
        <div className="space-y-4">
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
        <div className="mt-4">
          <button className="w-full py-2 border border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors flex items-center justify-center">
            <Plus className="h-4 w-4 mr-1" /> Tambah ke Kalender
          </button>
        </div>
      </div>
    </div>
  );
};