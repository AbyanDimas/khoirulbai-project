import { Bell, Volume2 } from 'lucide-react';

interface PrayerTimeCardProps {
  nextPrayer: {
    name: string;
    time: string;
    icon: JSX.Element;
  };
  currentTime: Date;
}

export const PrayerTimeCard = ({ nextPrayer, currentTime }: PrayerTimeCardProps) => {
  return (
    <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Bell className="mr-2" />
        Waktu Sholat Berikutnya
      </h2>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-4xl font-bold">{nextPrayer.name}</div>
          <div className="text-2xl font-medium">{nextPrayer.time}</div>
        </div>
        <div className="bg-white/20 p-3 rounded-full">
          {nextPrayer.icon}
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span>Waktu saat ini: {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
        <button className="flex items-center text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors">
          <Volume2 className="h-4 w-4 mr-1" /> Adzan
        </button>
      </div>
    </div>
  );
};