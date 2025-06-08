"use client"; // Add this at the top to make it a client component

import SurahCard from "@/app/(home)/alquran/SurahCard";
import { getAllSurah } from "@/app/services/quran.service";
import { Surah } from "@/app/types/quran";
import { Search, BookOpen, Layers, Clock, ListOrdered, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function AlquranPage() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await getAllSurah();
        setSurahs(response.data);
        setFilteredSurahs(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching surahs:", error);
        setIsLoading(false);
      }
    };

    fetchSurahs();
  }, []);

  useEffect(() => {
    let results = surahs;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (surah) =>
          surah.namaLatin.toLowerCase().includes(term) ||
          surah.arti.toLowerCase().includes(term) ||
          surah.nomor.toString().includes(term)
      );
    }

    // Apply type filter
    if (filter !== "all") {
      results = results.filter((surah) =>
        filter === "mekah"
          ? surah.tempatTurun === "Mekah"
          : surah.tempatTurun === "Madinah"
      );
    }

    setFilteredSurahs(results);
  }, [searchTerm, filter, surahs]);

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3 text-emerald-600 dark:text-emerald-400">
            Al-Quran Online
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Baca, pelajari, dan pahami Al-Quran dengan terjemahan dan tafsir yang lengkap
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 text-emerald-500 mr-2" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Surah</span>
            </div>
            <div className="text-2xl font-bold mt-2">114</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <Layers className="h-5 w-5 text-emerald-500 mr-2" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Ayat</span>
            </div>
            <div className="text-2xl font-bold mt-2">6,236</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-emerald-500 mr-2" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Turun</span>
            </div>
            <div className="text-2xl font-bold mt-2">23 Tahun</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <ListOrdered className="h-5 w-5 text-emerald-500 mr-2" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Juz</span>
            </div>
            <div className="text-2xl font-bold mt-2">30</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari surah atau ayat..."
              className="block w-full pl-10 pr-10 py-3 border border-gray-200 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-400 dark:focus:border-emerald-400 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 text-sm rounded-full border ${
                filter === "all"
                  ? "bg-emerald-100 dark:bg-emerald-900/80 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                  : "bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-100 dark:border-gray-600"
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setFilter("mekah")}
              className={`px-3 py-1 text-sm rounded-full border ${
                filter === "mekah"
                  ? "bg-emerald-100 dark:bg-emerald-900/80 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                  : "bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-100 dark:border-gray-600"
              }`}
            >
              Makkiyah
            </button>
            <button
              onClick={() => setFilter("madinah")}
              className={`px-3 py-1 text-sm rounded-full border ${
                filter === "madinah"
                  ? "bg-emerald-100 dark:bg-emerald-900/80 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                  : "bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-100 dark:border-gray-600"
              }`}
            >
              Madaniyah
            </button>
          </div>
        </div>

        {/* Surah List */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Daftar Surah
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {filteredSurahs.length} surah ditemukan
            </span>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="h-20 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : filteredSurahs.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400">
                Tidak ada surah yang ditemukan
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSurahs.map((surah) => (
                <SurahCard key={surah.nomor} surah={surah} />
              ))}
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-12">
          <p>Semoga dengan membaca Al-Quran, hati kita menjadi tenang dan mendapat petunjuk</p>
        </div>
      </div>
    </main>
  );
}