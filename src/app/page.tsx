"use client";

import { motion } from "framer-motion";
import {
  Clock,
  CalendarDays,
  Megaphone,
  BookOpenText,
  ChevronRight,
  ArrowRight,
  Users,
  HeartHandshake,
  BookCheck,
  ScrollText,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Sunrise,
  Sunset,
  Moon,
  Sun,
  CloudRain,
  CloudSun,
  Cloud,
  Droplets,
  Wind,
  Book,
  House,
  Microscope,
  Globe,
  Landmark,
  WalletCards,
  AlertCircle,
  Bell,
  Bookmark,
  Download,
  Share2,
  Play,
  Pause,
  Volume2,
  Clock3,
  Plus,
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
import { LatestTausyiah } from "@/app/components/Section/LatestTausyiah";
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
  Tausyiah,
  GalleryItem,
  Announcement,
  StatItem,
} from "@/app/types";


const Home = () => {
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
      link: "/kajian",
    },
    {
      icon: (
        <Users className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
      ),
      title: "TPA/TPQ",
      description: "Pendidikan Al-Book untuk anak-anak",
      link: "/tpa",
    },
    {
      icon: (
        <HeartHandshake className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
      ),
      title: "Zakat & Infaq",
      description: "Penyaluran zakat, infaq, dan sedekah",
      link: "/zakat",
    },
    {
      icon: (
        <BookCheck className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
      ),
      title: "Pernikahan",
      description: "Layanan nikah dan konsultasi keluarga",
      link: "/pernikahan",
    },
    {
      icon: (
        <ScrollText className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
      ),
      title: "Kegiatan Sosial",
      description: "Bantuan untuk masyarakat sekitar",
      link: "/sosial",
    },
    {
      icon: (
        <House className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
      ),
      title: "Wisata Religi",
      description: "Kunjungan dan studi banding",
      link: "/wisata",
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
      title: "Manasik Haji",
      description: "Latihan ibadah haji untuk calon jamaah",
      link: "/haji",
    },
  ];

  // Tausyiah Terbaru
  const tausyiah: Tausyiah[] = [
    {
      id: 1,
      title: "Keutamaan Sholat Berjamaah di Masjid",
      description:
        "Penjelasan tentang fadhilah dan keutamaan sholat berjamaah di masjid bagi laki-laki muslim.",
      date: "14 Juni 2024",
      time: "15:30 WIB",
      duration: "25:14",
      speaker: "Ust. Abdul Somad",
      type: "video",
      views: "1.2K",
      image: "/tausyiah/sholat.jpg",
    },
    {
      id: 2,
      title: "Tafsir Surat Al-Fatihah",
      description:
        "Kajian mendalam tentang makna dan tafsir dari surat pembuka Al-Book.",
      date: "12 Juni 2024",
      time: "13:00 WIB",
      duration: "42:05",
      speaker: "Ust. Adi Hidayat",
      type: "audio",
      views: "856",
      image: "/tausyiah/tafsir.jpg",
    },
    {
      id: 3,
      title: "Menyambut Bulan Ramadhan",
      description:
        "Persiapan menyambut bulan suci Ramadhan dengan penuh keberkahan.",
      date: "10 Juni 2024",
      time: "20:00 WIB",
      duration: "18:32",
      speaker: "Ust. Khalid Basalamah",
      type: "video",
      views: "2.3K",
      image: "/tausyiah/ramadhan.jpg",
    },
  ];

  // Galeri Kegiatan
  const gallery: GalleryItem[] = [
    {
      id: 1,
      title: "Kegiatan TPA",
      date: "10 Juni 2024",
      category: "pendidikan",
      image: "/gallery/tpa.jpg",
    },
    {
      id: 2,
      title: "Sholat Jumat",
      date: "7 Juni 2024",
      category: "sholat",
      image: "/gallery/jumat.jpg",
    },
    {
      id: 3,
      title: "Pengajian Rutin",
      date: "5 Juni 2024",
      category: "pengajian",
      image: "/gallery/pengajian.jpg",
    },
    {
      id: 4,
      title: "Buka Puasa Bersama",
      date: "3 Juni 2024",
      category: "ramadhan",
      image: "/gallery/buka.jpg",
    },
    {
      id: 5,
      title: "Sholat Tarawih",
      date: "2 Juni 2024",
      category: "ramadhan",
      image: "/gallery/tarawih.jpg",
    },
    {
      id: 6,
      title: "Santunan Anak Yatim",
      date: "1 Juni 2024",
      category: "sosial",
      image: "/gallery/santunan.jpg",
    },
    {
      id: 7,
      title: "Kegiatan Remaja Masjid",
      date: "28 Mei 2024",
      category: "remaja",
      image: "/gallery/remaja.jpg",
    },
    {
      id: 8,
      title: "Peresmian Masjid",
      date: "25 Mei 2024",
      category: "acara",
      image: "/gallery/peresmian.jpg",
    },
  ];

  // Pengumuman
  const announcements: Announcement[] = [
    {
      id: 1,
      title: "Pendaftaran TPA Tahun Ajaran Baru",
      date: "15 Juni 2024",
      content:
        "Pendaftaran TPA/TPQ Khoirul Ba'i tahun ajaran 2024/2025 dibuka mulai 15 Juni - 30 Juni 2024.",
      important: true,
    },
    {
      id: 2,
      title: "Jadwal Kajian Bulan Juni",
      date: "10 Juni 2024",
      content:
        "Telah tersedia jadwal kajian rutin bulan Juni 2024. Silakan cek di bagian agenda.",
      important: false,
    },
    {
      id: 3,
      title: "Donasi Pembangunan Masjid",
      date: "5 Juni 2024",
      content:
        "Masih membuka donasi untuk perluasan area parkir dan perbaikan fasilitas masjid.",
      important: true,
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
          <UpcomingEvents events={upcomingEvents} />
        </motion.div>
      </section>

      <ImportantAnnouncements announcements={announcements} />
      <MosqueStats stats={stats} />
      <MosqueServices services={services} />
      <LatestTausyiah tausyiah={tausyiah} />
      <Gallery gallery={gallery} />
      <LiveStreaming />
      <LocationMap />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Home;
