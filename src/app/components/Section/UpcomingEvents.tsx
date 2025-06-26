'use client';

import { CalendarDays, ChevronRight, Plus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Event } from '@/app/types';
import { EventCard } from '@/app/components/Section/EventCard';

interface ExtendedEvent extends Event {
  startDate?: string;
  endDate?: string;
  description?: string;
}

export const UpcomingEvents = () => {
  const [events, setEvents] = useState<ExtendedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/agenda?populate=*&sort[0]=tanggal_mulai:asc&pagination[limit]=5`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch upcoming events');
        }

        const data = await response.json();

        const formattedEvents = data.data.map((item: any) => ({
          id: item.id.toString(),
          title: item.attributes.judul,
          date: item.attributes.tanggal_mulai 
            ? new Date(item.attributes.tanggal_mulai).toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })
            : 'Tanggal belum ditentukan',
          time: item.attributes.tanggal_mulai
            ? new Date(item.attributes.tanggal_mulai).toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit'
              })
            : 'Waktu belum ditentukan',
          startDate: item.attributes.tanggal_mulai,
          endDate: item.attributes.tanggal_selesai || item.attributes.tanggal_mulai,
          location: item.attributes.lokasi || 'Lokasi tidak ditentukan',
          description: item.attributes.deskripsi || 'Tidak ada deskripsi',
          category: item.attributes.tag_kegiatan || 'event'
        }));

        // Filter hanya event yang memiliki tanggal mulai
        const validEvents = formattedEvents.filter((event: ExtendedEvent) => event.startDate);
        setEvents(validEvents);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching upcoming events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  const exportToCalendar = () => {
    if (events.length === 0) return;

    // Format untuk iCalendar (.ics)
    let icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//SMKN 1 Adiwerna//Agenda Kegiatan//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH'
    ];

    events.forEach(event => {
      if (!event.startDate) return;

      try {
        const startDate = new Date(event.startDate);
        const endDate = new Date(event.endDate || event.startDate);
        
        // Validasi tanggal
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
          console.error(`Invalid date for event ${event.id}`);
          return;
        }

        const formatDate = (date: Date) => {
          return date.toISOString()
            .replace(/[-:]/g, '')
            .replace(/\.\d{3}/, '');
        };

        const formattedStart = formatDate(startDate);
        const formattedEnd = formatDate(endDate);
        const now = formatDate(new Date());
        
        icsContent.push(
          'BEGIN:VEVENT',
          `UID:${event.id}@smkn1adiwerna.sch.id`,
          `DTSTAMP:${now}`,
          `DTSTART:${formattedStart}`,
          `DTEND:${formattedEnd}`,
          `SUMMARY:${event.title}`,
          `DESCRIPTION:${event.description?.replace(/\n/g, '\\n') || 'Tidak ada deskripsi'}\\n\\nLokasi: ${event.location}`,
          `LOCATION:${event.location}`,
          `CATEGORIES:${event.category}`,
          'END:VEVENT'
        );
      } catch (err) {
        console.error(`Error processing event ${event.id}:`, err);
      }
    });

    icsContent.push('END:VCALENDAR');

    const blob = new Blob([icsContent.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'agenda-smkn1adiwerna.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center dark:text-white">
              <CalendarDays className="mr-2 text-emerald-600 dark:text-emerald-400" />
              Agenda Terdekat
            </h2>
          </div>
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center dark:text-white">
              <CalendarDays className="mr-2 text-emerald-600 dark:text-emerald-400" />
              Agenda Terdekat
            </h2>
          </div>
          <div className="text-center py-4 text-red-500 dark:text-red-400">
            {error}
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

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
        
        {events.length === 0 ? (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            Tidak ada agenda terdekat
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {events.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
            <div className="mt-4">
              <button 
                onClick={exportToCalendar}
                disabled={events.length === 0}
                className={`w-full py-2 border rounded-lg flex items-center justify-center transition-colors ${
                  events.length === 0
                    ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                    : 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                }`}
              >
                <Plus className="h-4 w-4 mr-1" /> Tambah ke Kalender
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};