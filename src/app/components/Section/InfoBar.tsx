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
    <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-2">
        {/* Mobile View - Google Style */}
        <div className="md:hidden items-center justify-between flex flex-col space-y-2">
          <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-blue-500 mr-2" />
                <span className="text-sm font-medium dark:text-white">
                  {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex items-center">
                <CalendarDays className="h-4 w-4 text-blue-500 mr-2" />
                <span className="text-sm dark:text-white">{formattedDate}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 space-x-3">
            <div className="flex items-center">
              <Landmark className="h-4 w-4 text-blue-500 mr-2" />
              <span className="text-sm dark:text-white">{hijriDate.hijri}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex items-center">
                {weather.icon}
                <span className="text-sm ml-2 dark:text-white">
                  {weather.temp}°C • {weather.condition}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop View - Original Layout (Hidden on Mobile) */}
        <div className="hidden md:grid md:grid-cols-3 gap-4">
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