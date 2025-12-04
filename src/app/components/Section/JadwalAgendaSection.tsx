"use client";

import { motion } from "framer-motion";
import { PrayerTimeCard } from "./PrayerTimeCard";
import { PrayerScheduleSection } from "./PrayerSchedule";
import { UpcomingEvents } from "./UpcomingEvents";
import type { PrayerSchedule } from "@/app/types";

interface JadwalAgendaSectionProps {
  jadwalSholat: PrayerSchedule;
  currentTime: Date;
}

export const JadwalAgendaSection = ({
  jadwalSholat,
  currentTime,
}: JadwalAgendaSectionProps) => {
  // Find next prayer
  const getNextPrayer = () => {
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();

    // Cari di jadwal hari ini
    const nextToday = jadwalSholat.today.find((prayer) => {
      const [hours, minutes] = prayer.time.split(":").map(Number);
      const prayerTime = hours * 60 + minutes;
      return now < prayerTime;
    });

    // Jika tidak ada di hari ini, ambil yang pertama di hari berikutnya
    return nextToday || jadwalSholat.tomorrow[0];
  };

  const nextPrayer = getNextPrayer();

  return (
    <section className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-6"
      >
        <PrayerTimeCard nextPrayer={nextPrayer} currentTime={currentTime} />
        <PrayerScheduleSection
          schedule={jadwalSholat}
          nextPrayer={nextPrayer}
          currentTime={currentTime}
        />
        <UpcomingEvents />
      </motion.div>
    </section>
  );
};
