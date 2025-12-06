import { Megaphone, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Announcement {
  id: number;
  attributes: {
    nama: string;
    deskripsi: string;
    tanggal: string;
  };
}

export const AnnouncementBar = () => {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(
          `/api/proxy/pengumuman-pentings?populate=*&sort[0]=tanggal:desc&pagination[limit]=3`
        );
        
        if (!response.ok) throw new Error('Gagal Memuat');
        
        const data = await response.json();
        
        if (data.data?.length > 0) {
          const dismissedIds = JSON.parse(localStorage.getItem('dismissedAnnouncements') || '[]');
          const validAnnouncements = data.data.filter((item: Announcement) => 
            !dismissedIds.includes(item.id)
          );

          if (validAnnouncements.length > 0) {
            const randomIndex = Math.floor(Math.random() * validAnnouncements.length);
            setAnnouncement(validAnnouncements[randomIndex]);
          } else {
            setIsVisible(false);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setIsVisible(false);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleClose = () => {
    if (announcement) {
      const dismissedIds = JSON.parse(localStorage.getItem('dismissedAnnouncements') || '[]');
      dismissedIds.push(announcement.id);
      localStorage.setItem('dismissedAnnouncements', JSON.stringify(dismissedIds));
    }
    setIsVisible(false);
  };

  if (!isVisible || loading || error || !announcement) return null;

  return (
    <div className="bg-amber-500 text-white px-4 py-2 text-sm font-medium">
      <div className="container mx-auto flex items-center justify-center">
        {/* Left icon */}
        <div className="flex-shrink-0 mr-2 items-center">
          <Megaphone className="h-4 w-4" />
        </div>

        {/* Centered text with truncation */}
        <div className="flex-1 min-w-0 flex justify-center">
          <div className="flex items-center overflow-hidden">
            <span className="truncate text-center px-2">
              {announcement?.attributes?.nama}
            </span>
          </div>
        </div>

        {/* Right side - link and close button */}
        <div className="flex-shrink-0 flex items-center ml-2">
          <Link 
            href="/tpa" 
            className="underline whitespace-nowrap hidden sm:inline-block mr-3"
          >
            Info Selengkapnya
          </Link>
          
          <button 
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-amber-600 transition-colors"
            aria-label="Tutup pengumuman"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};