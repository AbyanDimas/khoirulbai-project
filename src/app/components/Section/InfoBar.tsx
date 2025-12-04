import React from "react";
import { Clock, CalendarDays, Landmark } from "lucide-react";

interface InfoBarProps {
  currentTime: Date;
  formattedDate: string;
  hijriDate: {
    hijri: string;
  };
  weather: {
    temp: number;
    condition: string;
    icon: React.ReactNode;
  };
}

export const InfoBar = ({
  currentTime,
  formattedDate,
  hijriDate,
  weather,
}: InfoBarProps) => {
  return (
    <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-3">
        {/* ================= MOBILE ================= */}
        <div className="md:hidden flex flex-col space-y-3">
          {/* Row 1 — Time + Date */}
          <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-xl shadow-sm">
            {/* Time */}
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-xl bg-gray-100 dark:bg-gray-700 shadow">
                <Clock className="h-4 w-4 text-blue-500" />
              </div>
              <span className="text-sm dark:text-white">
                {currentTime.toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            <div className="h-5 w-px bg-gray-300 dark:bg-gray-600"></div>

            {/* Date */}
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-xl bg-gray-100 dark:bg-gray-700 shadow">
                <CalendarDays className="h-4 w-4 text-blue-500" />
              </div>
              <span className="text-sm dark:text-white">{formattedDate}</span>
            </div>
          </div>

          {/* Row 2 — Hijri + Weather */}
          <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-xl shadow-sm">
            {/* Hijri */}
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-xl bg-gray-100 dark:bg-gray-700 shadow">
                <Landmark className="h-4 w-4 text-blue-500" />
              </div>
              <span className="text-sm dark:text-white">{hijriDate.hijri}</span>
            </div>

            <div className="h-5 w-px bg-gray-300 dark:bg-gray-600"></div>

            {/* WEATHER — FIXED HEIGHT + COMPACT */}
            <div
              className="
                relative flex items-center space-x-2
                px-3 py-2 rounded-xl shadow-sm
                bg-gradient-to-br from-blue-50 to-sky-100 
                dark:from-gray-700 dark:to-gray-800
                overflow-hidden h-[40px]   /* FIX HEIGHT */
              "
            >
              {/* Sun Glow */}
              <div
                className="
                  absolute w-10 h-10 bg-yellow-300/40 rounded-full blur-xl
                  top-1 left-1 animate-pulse
                "
              ></div>

              {/* Slight Moving Cloud */}
              <div
                className="
                  absolute top-1 right-1 opacity-40 scale-75
                  animate-[cloudmove_6s_linear_infinite]
                "
              >
                {weather.icon}
              </div>

              {/* Icon bubble */}
              <div
                className="
                  relative z-10 p-1.5 rounded-full 
                  bg-white dark:bg-gray-600 shadow 
                  flex items-center justify-center
                  animate-[float_3s_ease_in_out_infinite]
                "
              >
                {weather.icon}
              </div>

              {/* Weather text */}
              <div className="relative z-10 flex flex-col leading-tight">
                <span className="text-sm font-bold dark:text-white">
                  {weather.temp}°C
                </span>
                <span className="text-[10px] text-gray-600 dark:text-gray-300">
                  {weather.condition}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= DESKTOP ================= */}
        <div className="hidden md:grid grid-cols-3 gap-4 py-1">
          {/* Time + Date */}
          <div className="flex items-center justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 shadow">
                <Clock className="h-5 w-5 text-emerald-600" />
              </div>
              <span className="font-medium dark:text-white">
                {currentTime.toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </span>
            </div>

            <span className="text-gray-400">|</span>

            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 shadow">
                <CalendarDays className="h-5 w-5 text-emerald-600" />
              </div>
              <span className="dark:text-white">{formattedDate}</span>
            </div>
          </div>

          {/* Hijri */}
          <div className="flex items-center justify-center space-x-2">
            <div className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 shadow">
              <Landmark className="h-5 w-5 text-emerald-600" />
            </div>
            <span className="dark:text-white">{hijriDate.hijri}</span>
          </div>

          {/* WEATHER — DESKTOP FIXED HEIGHT + COMPACT */}
          <div className="flex items-center justify-center">
            <div
              className="
                relative flex items-center space-x-3
                px-4 py-2 rounded-xl shadow-sm
                bg-gradient-to-br from-blue-50 to-sky-100 
                dark:from-gray-700 dark:to-gray-800
                overflow-hidden h-[48px] /* SAME HEIGHT AS OTHERS */
              "
            >
              {/* Sun Glow */}
              <div
                className="
                  absolute w-14 h-14 bg-yellow-300/40 rounded-full blur-xl
                  top-2 left-2 animate-pulse
                "
              ></div>

              {/* Cloud */}
              <div
                className="
                  absolute top-1 right-2 opacity-40 scale-75
                  animate-[cloudmove_6s_linear_infinite]
                "
              >
                {weather.icon}
              </div>

              {/* Icon bubble */}
              <div
                className="
                  relative z-10 p-2 rounded-full 
                  bg-white dark:bg-gray-600 shadow 
                  animate-[float_3s_ease_in_out_infinite]
                "
              >
                {weather.icon}
              </div>

              {/* Text */}
              <div className="relative z-10 flex flex-col leading-tight">
                <span className="font-semibold dark:text-white text-sm">
                  {weather.temp}°C
                </span>
                <span className="text-xs text-gray-700 dark:text-gray-300">
                  {weather.condition}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
          100% { transform: translateY(0px); }
        }

        @keyframes cloudmove {
          0% { transform: translateX(0px); }
          100% { transform: translateX(10px); }
        }
      `}</style>
    </div>
  );
};
