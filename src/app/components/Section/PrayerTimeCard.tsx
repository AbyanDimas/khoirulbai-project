import React, { useEffect, useState } from "react";
import { Bell, Volume2, MapPin, Info } from "lucide-react";

interface PrayerTimeCardProps {
  nextPrayer: {
    name: string;
    time: string; // format: "05:12"
    icon: React.ReactNode;
  };
  currentTime: Date;
}

export const PrayerTimeCard = ({
  nextPrayer,
  currentTime,
}: PrayerTimeCardProps) => {
  const [countdown, setCountdown] = useState({
    h: "00",
    m: "00",
    s: "00",
  });

  // COUNTDOWN LOGIC
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const [th, tm] = nextPrayer.time.split(":").map(Number);

      const target = new Date();
      target.setHours(th, tm, 0, 0);

      if (target.getTime() <= now.getTime()) {
        target.setDate(target.getDate() + 1);
      }

      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown({ h: "00", m: "00", s: "00" });
        return;
      }

      const hours = Math.floor(diff / 1000 / 60 / 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown({
        h: String(hours).padStart(2, "0"),
        m: String(minutes).padStart(2, "0"),
        s: String(seconds).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [nextPrayer.time]);

  return (
    <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white rounded-xl shadow-lg p-6 space-y-6">
      {/* TITLE */}
      <h2 className="text-xl font-bold flex items-center">
        <Bell className="mr-2" />
        Waktu Sholat Berikutnya
      </h2>

      {/* NEXT PRAYER */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-4xl font-bold">{nextPrayer.name}</div>
          <div className="text-2xl font-medium">{nextPrayer.time}</div>
        </div>
        <div className="bg-white/20 p-3 rounded-full">{nextPrayer.icon}</div>
      </div>

      {/* CURRENT TIME */}
      <div className="flex items-center justify-between text-sm">
        <span>
          Waktu saat ini:{" "}
          {new Date().toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>

        <button className="flex items-center text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors">
          <Volume2 className="h-4 w-4 mr-1" />
          Adzan
        </button>
      </div>

      {/* LOCATION */}
      <div className="flex items-center bg-white/10 p-3 rounded-lg text-sm">
        <MapPin className="h-4 w-4 mr-2 opacity-80" />
        <span>Lokasi: Indonesia — Metode Kemenag</span>
      </div>

      {/* HADIS */}
      <div className="bg-white/10 p-4 rounded-lg text-sm flex items-start">
        <Info className="h-4 w-4 mr-2 mt-0.5 opacity-80" />
        <p className="italic leading-relaxed">
          “Sholat adalah tiang agama. Barang siapa menegakkannya, maka ia telah
          menegakkan agama.” — HR. Baihaqi
        </p>
      </div>

      {/* COUNTDOWN CARD */}
      <div className="bg-white/10 p-4 rounded-lg shadow-inner space-y-3">
        <p className="text-center text-sm opacity-90">
          Hitung mundur menuju adzan
        </p>

        <div className="flex items-center justify-center gap-4">
          {/* JAM */}
          <div className="text-center">
            <div className="bg-white/20 text-2xl font-bold px-3 py-2 rounded-lg min-w-[55px] shadow-md">
              {countdown.h}
            </div>
            <span className="text-xs opacity-75 block mt-1">Jam</span>
          </div>

          <span className="text-2xl font-bold">:</span>

          {/* MENIT */}
          <div className="text-center">
            <div className="bg-white/20 text-2xl font-bold px-3 py-2 rounded-lg min-w-[55px] shadow-md">
              {countdown.m}
            </div>
            <span className="text-xs opacity-75 block mt-1">Menit</span>
          </div>

          <span className="text-2xl font-bold">:</span>

          {/* DETIK */}
          <div className="text-center">
            <div className="bg-white/20 text-2xl font-bold px-3 py-2 rounded-lg min-w-[55px] shadow-md">
              {countdown.s}
            </div>
            <span className="text-xs opacity-75 block mt-1">Detik</span>
          </div>
        </div>
      </div>
    </div>
  );
};

