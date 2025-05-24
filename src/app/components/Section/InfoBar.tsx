import { Clock, CalendarDays, Landmark, CloudSun } from 'lucide-react';

interface InfoBarProps {
  currentTime: Date;
  formattedDate: string;
  hijriDate: {
    hijri: string;
  };
  weather: {
    temp: number;
    condition: string;
    icon: JSX.Element;
  };
}

export const InfoBar = ({ currentTime, formattedDate, hijriDate, weather }: InfoBarProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-emerald-600 mr-2" />
              <span className="font-medium dark:text-white">
                {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>
            <span className="mx-2 text-gray-400">|</span>
            <div className="flex items-center">
              <CalendarDays className="h-5 w-5 text-emerald-600 mr-2" />
              <span className="dark:text-white">{formattedDate}</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <Landmark className="h-5 w-5 text-emerald-600 mr-2" />
              <span className="dark:text-white">{hijriDate.hijri}</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              {weather.icon}
              <span className="ml-2 dark:text-white">
                {weather.temp}°C • {weather.condition}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};