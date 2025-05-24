import { Megaphone } from 'lucide-react';
import Link from 'next/link';

export const AnnouncementBar = () => {
  return (
    <div className="bg-amber-500 text-white px-4 py-2 text-center text-sm font-medium">
      <div className="container mx-auto flex items-center justify-center">
        <Megaphone className="h-4 w-4 mr-2" />
        <span>Pendaftaran TPA Tahun Ajaran 2024/2025 dibuka mulai 15 Juni 2024</span>
        <Link href="/tpa" className="ml-2 underline">Info Selengkapnya</Link>
      </div>
    </div>
  );
};