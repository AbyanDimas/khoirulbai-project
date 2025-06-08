'use client'
import { Ayat } from "@/app/types/quran";
import { Play, Pause } from "lucide-react";
import { useState } from "react";

export default function AyatItem({ ayat }: { ayat: Ayat }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const playAudio = (audioUrl: string) => {
    if (audio) {
      audio.pause();
    }

    const newAudio = new Audio(audioUrl);
    setAudio(newAudio);
    setIsPlaying(true);

    newAudio.play().catch((error) => {
      console.error("Audio playback failed:", error);
    });

    newAudio.onended = () => {
      setIsPlaying(false);
    };
  };

  const stopAudio = () => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-emerald-50 dark:hover:bg-gray-800 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 font-medium">
          {ayat.nomorAyat}
        </div>
        <button
          onClick={() =>
            isPlaying ? stopAudio() : playAudio(ayat.audio["01"])
          }
          className="p-2 rounded-full hover:bg-emerald-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={isPlaying ? "Stop audio" : "Play audio"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <Play className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          )}
        </button>
      </div>
      <p className="font-arabic text-2xl text-right mb-3 leading-loose text-gray-800 dark:text-gray-200">
        {ayat.teksArab}
      </p>
      <p className="text-gray-600 dark:text-gray-300 mb-2">{ayat.teksLatin}</p>
      <p className="text-gray-800 dark:text-gray-100">{ayat.teksIndonesia}</p>
    </div>
  );
}