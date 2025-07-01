"use client";

import { motion } from "framer-motion";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Info,
  Calendar,
  BookOpen,
  Clock,
  DollarSign,
  Image,
  Home,
  Book,
  Mail,
  AlertCircle,
  Users,
  FileText,
  HeartHandshake,
  ScrollText,
} from "lucide-react";
import Link from "next/link";

const availablePages = [
  {
    path: "/",
    name: "Beranda",
    description: "Halaman utama masjid",
    icon: <Home className="w-4 h-4" />,
  },
  {
    path: "/agenda",
    name: "Agenda",
    description: "Jadwal kegiatan masjid",
    icon: <Calendar className="w-4 h-4" />,
  },
  {
    path: "/alquran",
    name: "Al-Quran",
    description: "Baca Al-Quran digital",
    icon: <Book className="w-4 h-4" />,
  },
  {
    path: "/alquran/surah/[nomor]",
    name: "Surah Al-Quran",
    description: "Baca surah Al-Quran",
    icon: <Book className="w-4 h-4" />,
  },
  {
    path: "/alquran/surah/[nomor]/tafsir",
    name: "Tafsir Surah",
    description: "Tafsir ayat Al-Quran",
    icon: <Book className="w-4 h-4" />,
  },
  {
    path: "/berita",
    name: "Berita",
    description: "Berita terbaru seputar masjid",
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    path: "/berita/[id]",
    name: "Detail Berita",
    description: "Detail berita masjid",
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    path: "/donasi",
    name: "Donasi",
    description: "Donasi dan infaq masjid",
    icon: <HeartHandshake className="w-4 h-4" />,
  },
  {
    path: "/galeri",
    name: "Galeri",
    description: "Foto-foto kegiatan masjid",
    icon: <Image className="w-4 h-4" />,
  },
  {
    path: "/jadwal-sholat",
    name: "Jadwal Sholat",
    description: "Jadwal sholat harian",
    icon: <Clock className="w-4 h-4" />,
  },
  {
    path: "/jadwal/kultum-pengajian",
    name: "Jadwal Kultum & Pengajian",
    description: "Jadwal kajian rutin",
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    path: "/keuangan",
    name: "Keuangan",
    description: "Informasi keuangan masjid",
    icon: <DollarSign className="w-4 h-4" />,
  },
  {
    path: "/kontak",
    name: "Kontak",
    description: "Hubungi pengurus masjid",
    icon: <Mail className="w-4 h-4" />,
  },
  {
    path: "/laporan/keuangan",
    name: "Laporan Keuangan",
    description: "Transparansi keuangan masjid",
    icon: <DollarSign className="w-4 h-4" />,
  },
  {
    path: "/laporan/waqaf",
    name: "Laporan Waqaf",
    description: "Laporan donasi waqaf",
    icon: <DollarSign className="w-4 h-4" />,
  },
  {
    path: "/pengumuman",
    name: "Pengumuman",
    description: "Pengumuman penting masjid",
    icon: <AlertCircle className="w-4 h-4" />,
  },
  {
    path: "/profil",
    name: "Profil",
    description: "Profil masjid",
    icon: <Users className="w-4 h-4" />,
  },
  {
    path: "/program-kerja",
    name: "Program Kerja",
    description: "Program kerja masjid",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    path: "/tausiyah",
    name: "Tausiyah",
    description: "Artikel islami dan nasihat",
    icon: <Info className="w-4 h-4" />,
  },
  {
    path: "/tentang-kami",
    name: "Tentang Kami",
    description: "Tentang masjid kami",
    icon: <Users className="w-4 h-4" />,
  },
  {
    path: "/zakat-infaq",
    name: "Zakat & Infaq",
    description: "Informasi zakat dan infaq",
    icon: <HeartHandshake className="w-4 h-4" />,
  },
  {
    path: "/sign-in",
    name: "Sign In",
    description: "Masuk ke akun anda",
    icon: <ScrollText className="w-4 h-4" />,
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    description: "Daftar akun baru",
    icon: <ScrollText className="w-4 h-4" />,
  },
];

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [mounted, setMounted] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [showAiResponse, setShowAiResponse] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const searches = localStorage.getItem("recentSearches");
    if (searches) {
      setRecentSearches(JSON.parse(searches));
    }
  }, []);

  useEffect(() => {
    if (query && mounted) {
      const updatedSearches = [
        query,
        ...recentSearches.filter((s) => s !== query),
      ].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));

      if (query.trim().length > 0) {
        fetchGeminiResponse(query);
      }
    }
  }, [query, mounted]);

  const fetchGeminiResponse = async (searchQuery: string) => {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      console.error("Gemini API key is not set");
      return;
    }

    setIsLoadingAi(true);
    setAiResponse(null);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Anda adalah asisten masjid yang membantu menjawab pertanyaan seputar kegiatan islami. 
                Berikan jawaban singkat (maksimal 2 paragraf) dalam Bahasa Indonesia yang ramah dan informatif untuk pertanyaan: 
                "${searchQuery}". 
                Jika pertanyaan tidak terkait dengan islam atau masjid, jawab dengan sopan bahwa Anda hanya bisa membantu pertanyaan seputar islam dan masjid.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Gemini response");
      }

      const data = await response.json();
      const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (textResponse) {
        setAiResponse(textResponse);
        setShowAiResponse(true);
      }
    } catch (error) {
      console.error("Error fetching Gemini response:", error);
    } finally {
      setIsLoadingAi(false);
    }
  };

  const searchResults = query
    ? availablePages.filter(
        (page) =>
          page.name.toLowerCase().includes(query.toLowerCase()) ||
          page.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const popularSearches = [
    "Agenda",
    "Jadwal Sholat",
    "Berita Terbaru",
    "Pengajian",
    "Keuangan Masjid",
  ];

  const categories = [
    {
      name: "Jadwal",
      pages: availablePages.filter(
        (page) => page.name.includes("Jadwal") || page.path === "/agenda"
      ),
      icon: <Clock className="w-4 h-4" />,
    },
    {
      name: "Informasi",
      pages: availablePages.filter(
        (page) => page.path === "/berita" || page.path === "/tausiyah"
      ),
      icon: <Info className="w-4 h-4" />,
    },
    {
      name: "Keuangan",
      pages: availablePages.filter(
        (page) => page.path === "/keuangan" || page.path === "/wakaf"
      ),
      icon: <DollarSign className="w-4 h-4" />,
    },
    {
      name: "Lainnya",
      pages: availablePages.filter(
        (page) =>
          !["/agenda", "/berita", "/tausiyah", "/keuangan", "/wakaf"].includes(
            page.path
          ) && !page.name.includes("Jadwal")
      ),
      icon: <BookOpen className="w-4 h-4" />,
    },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          {query ? (
            <>
              <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                Hasil pencarian untuk "
                <span className="text-emerald-600 dark:text-emerald-400">
                  {query}
                </span>
                "
              </h1>

              {(aiResponse || isLoadingAi) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6"
                >
                  <button
                    onClick={() => setShowAiResponse(!showAiResponse)}
                    className="w-full flex items-center justify-between p-4 bg-emerald-50 dark:bg-gray-800 rounded-lg border border-emerald-100 dark:border-gray-700 hover:bg-emerald-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-400"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                      </svg>
                      <span className="font-medium text-emerald-700 dark:text-emerald-400">
                        Jawaban AI
                      </span>
                    </div>
                    {showAiResponse ? (
                      <ChevronUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    )}
                  </button>

                  {showAiResponse && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-white dark:bg-gray-800 border border-t-0 border-gray-200 dark:border-gray-700 rounded-b-lg">
                        {isLoadingAi ? (
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/6"></div>
                          </div>
                        ) : (
                          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                            {aiResponse}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-8"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-emerald-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Akses Cepat
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                    >
                      <button
                        onClick={() =>
                          setActiveCategory(
                            activeCategory === category.name
                              ? null
                              : category.name
                          )
                        }
                        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center">
                          <span className="text-emerald-600 dark:text-emerald-400 mr-2">
                            {category.icon}
                          </span>
                          <span className="font-medium text-gray-800 dark:text-white">
                            {category.name}
                          </span>
                        </div>
                        {activeCategory === category.name ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      {activeCategory === category.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 pb-3">
                            {category.pages.map((page) => (
                              <Link
                                key={page.path}
                                href={page.path}
                                className="flex items-center p-2 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              >
                                <span className="text-emerald-600 dark:text-emerald-400 mr-2">
                                  {page.icon}
                                </span>
                                <span className="text-gray-700 dark:text-gray-300">
                                  {page.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {recentSearches.length > 0 && (
                <div className="max-w-md mx-auto text-left">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Pencarian terakhir
                  </h3>
                  <div className="space-y-2">
                    {recentSearches.map((search, index) => (
                      <Link
                        key={index}
                        href={`/search?q=${encodeURIComponent(search)}`}
                        className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <span className="text-gray-700 dark:text-gray-300">
                          {search}
                        </span>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="max-w-md mx-auto text-left mt-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Pencarian populer
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search, index) => (
                    <Link
                      key={index}
                      href={`/search?q=${encodeURIComponent(search)}`}
                      className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-emerald-100 dark:hover:bg-emerald-900 rounded-full transition-colors"
                    >
                      {search}
                    </Link>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
                Cari informasi masjid
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Temukan agenda, berita, jadwal sholat, dan informasi lainnya
                seputar masjid
              </p>

              <div className="max-w-md mx-auto">
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    Kategori
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {categories.map((category) => (
                      <div
                        key={category.name}
                        className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                      >
                        <button
                          onClick={() =>
                            setActiveCategory(
                              activeCategory === category.name
                                ? null
                                : category.name
                            )
                          }
                          className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <div className="flex items-center">
                            <span className="text-emerald-600 dark:text-emerald-400 mr-2">
                              {category.icon}
                            </span>
                            <span className="font-medium text-gray-800 dark:text-white">
                              {category.name}
                            </span>
                          </div>
                          {activeCategory === category.name ? (
                            <ChevronUp className="h-5 w-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          )}
                        </button>
                        {activeCategory === category.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-3 pb-3">
                              {category.pages.map((page) => (
                                <Link
                                  key={page.path}
                                  href={page.path}
                                  className="flex items-center p-2 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                  <span className="text-emerald-600 dark:text-emerald-400 mr-2">
                                    {page.icon}
                                  </span>
                                  <span className="text-gray-700 dark:text-gray-300">
                                    {page.name}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    Pencarian populer
                  </h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {popularSearches.map((search, index) => (
                      <Link
                        key={index}
                        href={`/search?q=${encodeURIComponent(search)}`}
                        className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-emerald-100 dark:hover:bg-emerald-900 rounded-full transition-colors"
                      >
                        {search}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
