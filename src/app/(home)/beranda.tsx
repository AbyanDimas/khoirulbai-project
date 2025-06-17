"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  BookOpenText,
  Users,
  HeartHandshake,
  BookCheck,
  ScrollText,
  Sunrise,
  Sunset,
  Moon,
  Sun,
  CloudSun,
  Book,
  House,
  Newspaper,
} from "lucide-react";
import { useState, useEffect } from "react";
import { AnnouncementBar } from "@/app/components/Section/AnnouncementBar";
import { HeroSection } from "@/app/components/Section/HeroSection";
import { InfoBar } from "@/app/components/Section/InfoBar";
import { PrayerScheduleSection } from "@/app/components/Section/PrayerSchedule";
import { UpcomingEvents } from "@/app/components/Section/UpcomingEvents";
import { ImportantAnnouncements } from "@/app/components/Section/ImportantAnnouncements";
import { MosqueStats } from "@/app/components/Section/MosqueStats";
import { MosqueServices } from "@/app/components/Section/MosqueServices";
import { Latesttausiyah } from "@/app/components/Section/LatestTausyiah";
import { Gallery } from "@/app/components/Section/Gallery";
import { LiveStreaming } from "@/app/components/Section/LiveStreaming";
import { LocationMap } from "@/app/components/Section/LocationMap";
import { CtaSection } from "@/app/components/Section/CtaSection";
import { Footer } from "@/app/components/Section/Footer";
import { PrayerTimeCard } from "@/app/components/Section/PrayerTimeCard";

import type {
  PrayerTime,
  PrayerSchedule,
  Event,
  Service,
  tausiyah,
  GalleryItem,
  Announcement,
  StatItem,
} from "@/app/types";
import { WelcomeSection } from "../components/Section/Welcome";
import { HomeWorkProgram } from "../components/Section/WorkProgram";


const Beranda = () => {
  // State for current time and date
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPlaying, setIsPlaying] = useState(false);
  const [jadwalSholat, setJadwalSholat] = useState<PrayerSchedule>({
    today: [
      {
        name: "Subuh",
        time: "04:30",
        passed: false,
        icon: <Sunrise className="h-5 w-5" />,
      },
      {
        name: "Syuruq",
        time: "05:45",
        passed: false,
        icon: <Sun className="h-5 w-5" />,
      },
      {
        name: "Dzuhur",
        time: "12:15",
        passed: false,
        icon: <Sun className="h-5 w-5" />,
      },
      {
        name: "Ashar",
        time: "15:30",
        passed: false,
        icon: <CloudSun className="h-5 w-5" />,
      },
      {
        name: "Maghrib",
        time: "18:00",
        passed: false,
        icon: <Sunset className="h-5 w-5" />,
      },
      {
        name: "Isya",
        time: "19:30",
        passed: false,
        icon: <Moon className="h-5 w-5" />,
      },
    ],
    tomorrow: [
      {
        name: "Subuh",
        time: "04:29",
        passed: false,
        icon: <Sunrise className="h-5 w-5" />,
      },
      {
        name: "Syuruq",
        time: "05:44",
        passed: false,
        icon: <Sun className="h-5 w-5" />,
      },
      {
        name: "Dzuhur",
        time: "12:14",
        passed: false,
        icon: <Sun className="h-5 w-5" />,
      },
      {
        name: "Ashar",
        time: "15:29",
        passed: false,
        icon: <CloudSun className="h-5 w-5" />,
      },
      {
        name: "Maghrib",
        time: "17:59",
        passed: false,
        icon: <Sunset className="h-5 w-5" />,
      },
      {
        name: "Isya",
        time: "19:29",
        passed: false,
        icon: <Moon className="h-5 w-5" />,
      },
    ],
  });

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format date
  const formattedDate = currentTime.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Hijri date (mock data - in real app you would fetch this)
  const hijriDate = {
    day: "15",
    month: "Dhul-Qadah",
    year: "1445",
    hijri: "15 Dhul-Qadah 1445 H",
  };

  // Weather data (mock data)
  const weather = {
    temp: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    wind: 12,
    icon: <CloudSun className="h-8 w-8 text-yellow-500" />,
  };


  // Update prayer times status based on current time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Update prayer times and next prayer
  useEffect(() => {
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();

    const updateTimes = (times: PrayerTime[]) => {
      return times.map((time) => {
        const [hours, minutes] = time.time.split(":").map(Number);
        const prayerTime = hours * 60 + minutes;
        return { ...time, passed: now > prayerTime };
      });
    };

    setJadwalSholat(prev => ({
      today: updateTimes(prev.today),
      tomorrow: updateTimes(prev.tomorrow)
    }));
  }, [currentTime]);

  // Find next prayer
  const getNextPrayer = () => {
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    
    // Cari di jadwal hari ini
    const nextToday = jadwalSholat.today.find(prayer => {
      const [hours, minutes] = prayer.time.split(":").map(Number);
      const prayerTime = hours * 60 + minutes;
      return now < prayerTime;
    });

    // Jika tidak ada di hari ini, ambil yang pertama di hari berikutnya
    return nextToday || jadwalSholat.tomorrow[0];
  };

  const nextPrayer = getNextPrayer();


  // Agenda Terdekat
  const upcomingEvents: Event[] = [
    {
      id: 1,
      title: "Pengajian Rutin Bulanan",
      date: "15 Juni 2024",
      time: "09:00 - 11:30 WIB",
      speaker: "Ust. Ahmad Farid",
      location: "Aula Utama Masjid",
      category: "pengajian",
      image: "/events/pengajian.jpg",
    },
    {
      id: 2,
      title: "Sholat Jumat Bersama",
      date: "14 Juni 2024",
      time: "12:00 - 13:00 WIB",
      speaker: "Ust. Muhammad Ali",
      location: "Ruang Sholat Utama",
      category: "sholat",
      image: "/events/jumat.jpg",
    },
    {
      id: 3,
      title: "Kegiatan TPA Mingguan",
      date: "16 Juni 2024",
      time: "08:00 - 10:00 WIB",
      speaker: "Ust. Abdullah",
      location: "Ruang TPA Masjid",
      category: "pendidikan",
      image: "/events/tpa.jpg",
    },
    {
      id: 4,
      title: "Bazar Ramadhan",
      date: "1-30 Ramadhan 1445",
      time: "16:00 - 19:00 WIB",
      speaker: "Panitia Masjid",
      location: "Halaman Masjid",
      category: "bazar",
      image: "/events/bazar.jpg",
    },
  ];

  // Layanan Masjid
  const services: Service[] = [
    {
      icon: (
        <BookOpenText className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
      ),
      title: "Kajian Rutin",
      description: "Pengajian mingguan dan bulanan dengan berbagai tema",
      link: "/agenda",
    },
    {
      icon: (
        <Users className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
      ),
      title: "Tausiyah",
      description: "Kumpulan tausiyah dari para ustadz",
      link: "/tausiyah",
    },
    {
      icon: (
        <HeartHandshake className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
      ),
      title: "Donasi",
      description: "Bantuan donasi untuk pembangunan dan kegiatan masjid",
      link: "/donasi",
    },
    {
      icon: (
        <BookCheck className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
      ),
      title: "Alquran Online",
      description: "Layanan membaca dan menghafal Alquran secara online",
      link: "/alquran",
    },
    {
      icon: (
        <ScrollText className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
      ),
      title: "Zakat Online",
      description: "Pengelolaan zakat secara online",
      link: "/zakat-infaq",
    },
    {
      icon: (
        <Newspaper className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
      ),
      title: "Artikel & Berita",
      description: "Berita terbaru dan artikel seputar masjid",
      link: "/berita",
    },
    {
      icon: <Book className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />,
      title: "Tahfiz Book",
      description: "Program menghafal Al-Book",
      link: "/tahfiz",
    },
    {
      icon: (
        <House className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
      ),
      title: "Galeri Masjid",
      description: "Foto-foto kegiatan dan suasana masjid",
      link: "/galeri",
    },
  ];


  // Statistik Masjid
  const stats: StatItem[] = [
    {
      name: "Jamaah Harian",
      value: "350+",
      icon: <Users className="h-8 w-8" />,
    },
    {
      name: "Kegiatan Bulanan",
      value: "12+",
      icon: <CalendarDays className="h-8 w-8" />,
    },
    {
      name: "Santri TPA",
      value: "120",
      icon: <BookOpenText className="h-8 w-8" />,
    },
    {
      name: "Donatur Aktif",
      value: "85",
      icon: <HeartHandshake className="h-8 w-8" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AnnouncementBar />
      <HeroSection />
      <InfoBar
        currentTime={currentTime}
        formattedDate={formattedDate}
        hijriDate={hijriDate}
        weather={weather}
      />

      {/* Jadwal Sholat & Agenda Section */}
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

<WelcomeSection />
<div className="container mx-auto px-4 py-12">
      <ImportantAnnouncements />
</div>
      <div className="container mx-auto px-4 py-12">
      <MosqueStats stats={stats} />
      </div>
      <MosqueServices services={services} />
      <HomeWorkProgram />

      <Latesttausiyah />
      <Gallery />
      {/* <LiveStreaming /> */}
      <LocationMap />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Beranda;
