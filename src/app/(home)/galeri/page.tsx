"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Grid2X2,
  List,
  Image as ImageIcon,
  Video,
  Album,
  ChevronLeft,
  ChevronRight,
  X,
  Download,
  Share2,
  Heart,
  ArrowLeft,
  Images,
} from "lucide-react";

type GalleryItem = {
  id: string;
  type: "image" | "video";
  title: string;
  date: string;
  url: string;
  category: string;
  liked?: boolean;
  description?: string;
};

const categories = [
  { name: "Semua", icon: <Grid2X2 size={16} /> },
  { name: "Image", icon: <ImageIcon size={16} /> },
  { name: "Video", icon: <Video size={16} /> },
  { name: "Album", icon: <Album size={16} /> },
];

// ==========================
// FIX IMAGE URL FUNGSI SAMA DENGAN HALAMAN BERITA
// ==========================
function getImageUrl(img: any): string | null {
  if (!img) return null;

  const url = img.data?.attributes?.url || img.url;

  if (url) {
    return `http://202.65.116.9:1337${url}`;
  }

  return null;
}

// ==========================
// FUNGSI UNTUK PARSING DESKRIPSI RICH TEXT
// ==========================
function parseDescription(desc: any): string {
  if (!desc) return "";

  // Jika deskripsi berupa string langsung
  if (typeof desc === "string") {
    return desc;
  }

  // Jika deskripsi berupa array (Strapi Rich Text)
  if (Array.isArray(desc)) {
    let text = "";
    for (const block of desc) {
      if (block.type === "paragraph" && Array.isArray(block.children)) {
        const paragraphText = block.children
          .filter((child: any) => child.text)
          .map((child: any) => child.text)
          .join("");
        if (paragraphText.trim()) {
          text += paragraphText + " ";
        }
      }
    }
    return text.trim();
  }

  // Fallback ke JSON string
  return JSON.stringify(desc || "");
}

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showThumbnails, setShowThumbnails] = useState(false);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/proxy/galeris?populate=*`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const formattedItems = data.data.map((item: any) => {
          const attrs = item.attributes || item;

          // Gunakan fungsi getImageUrl yang sama dengan halaman berita
          const imageUrl = getImageUrl(attrs.gambar);

          // Parse deskripsi jika ada
          const description = parseDescription(attrs.deskripsi);

          return {
            id: item.id.toString(),
            type: (attrs.type || "image").toLowerCase() as "image" | "video",
            title: attrs.judul || "Tanpa Judul",
            description: description,
            date: new Date(
              attrs.tanggal || attrs.publishedAt || new Date(),
            ).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
            url: imageUrl || "/placeholder.jpg",
            category: attrs.type || "Image",
            liked: false,
          };
        });

        setGalleryItems(formattedItems);
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMsg);
        console.error("Error fetching gallery items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        navigateLightbox("prev");
      } else if (e.key === "ArrowRight") {
        navigateLightbox("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, selectedItem]);

  const filteredItems = galleryItems.filter((item) => {
    const matchesCategory =
      activeCategory === "Semua" || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openLightbox = (item: GalleryItem) => {
    setSelectedItem(item);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    const currentIndex = filteredItems.findIndex(
      (item) => item.id === selectedItem?.id,
    );
    let newIndex;

    if (direction === "prev") {
      newIndex =
        currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1;
    } else {
      newIndex =
        currentIndex === filteredItems.length - 1 ? 0 : currentIndex + 1;
    }

    setSelectedItem(filteredItems[newIndex]);
  };

  const handleDownload = async (url: string, title: string) => {
    try {
      if (!url || url === "/placeholder.jpg") {
        alert("Gambar tidak tersedia untuk diunduh");
        return;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Download failed with status ${response.status}`);
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download =
        `${title.replace(/[^a-z0-9]/gi, "_")}.jpg` || "gallery_image.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Error downloading file:", err);
      alert("Gagal mengunduh file");
    }
  };

  const toggleLike = (id: string) => {
    setGalleryItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, liked: !item.liked } : item,
      ),
    );

    if (selectedItem?.id === id) {
      setSelectedItem((prev) =>
        prev ? { ...prev, liked: !prev.liked } : null,
      );
    }
  };

  // ==========================
  // IMAGE COMPONENT
  // ==========================
  const GalleryImage = ({
    src,
    alt,
    className = "",
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => {
    const handleImageError = (
      e: React.SyntheticEvent<HTMLImageElement, Event>,
    ) => {
      const target = e.target as HTMLImageElement;
      target.onerror = null;
      target.src = "/placeholder.jpg";
    };

    return (
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
        onError={handleImageError}
        crossOrigin="anonymous"
        loading="lazy"
      />
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <ImageIcon className="text-gray-400" size={40} />
          </div>
          <h3 className="text-lg font-medium dark:text-white">
            Error loading gallery
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <section className="relative bg-emerald-700 text-white py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/masjid-pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <Link
            href="/"
            className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" /> Kembali ke Beranda
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center">
              <Images className="mr-3 h-8 w-8" />
              Galeri Dokumentasi
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Kumpulan foto dan video kegiatan Masjid Khoirul Ba'i STM ADB
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex space-x-1 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                    activeCategory === category.name
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>

            <div className="hidden md:flex space-x-1 ml-4">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-full ${
                  viewMode === "grid"
                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                    : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <Grid2X2 size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-full ${
                  viewMode === "list"
                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                    : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Cari foto atau video..."
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <ImageIcon className="text-gray-400" size={40} />
            </div>
            <h3 className="text-lg font-medium dark:text-white">
              Tidak ada item yang ditemukan
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Coba gunakan kata kunci lain atau pilih kategori berbeda
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div
                  className="relative aspect-video bg-gray-200 dark:bg-gray-700 cursor-pointer"
                  onClick={() => openLightbox(item)}
                >
                  <GalleryImage src={item.url} alt={item.title} />
                  <div className="absolute inset-0 bg-black/10 hover:bg-black/20 transition-colors duration-300" />
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white ml-1"
                        >
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium dark:text-white line-clamp-2">
                      {item.title}
                    </h3>
                    <button
                      className={`p-1 ${item.liked ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(item.id);
                      }}
                    >
                      <Heart
                        size={18}
                        fill={item.liked ? "currentColor" : "none"}
                      />
                    </button>
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mt-2">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${item.type === "video" ? "bg-red-500" : "bg-emerald-500"} mr-2`}
                    ></span>
                    {item.category} • {item.date}
                  </div>
                  {item.description && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-300 flex"
              >
                <div
                  className="w-32 h-32 flex-shrink-0 bg-gray-200 dark:bg-gray-700 cursor-pointer relative"
                  onClick={() => openLightbox(item)}
                >
                  <GalleryImage
                    src={item.url}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10 hover:bg-black/20 transition-colors duration-300" />
                </div>
                <div className="p-4 flex-grow">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium dark:text-white">
                        {item.title}
                      </h3>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mt-1">
                        <span
                          className={`inline-block w-2 h-2 rounded-full ${item.type === "video" ? "bg-red-500" : "bg-emerald-500"} mr-2`}
                        ></span>
                        {item.category} • {item.date}
                      </div>
                      {item.description && (
                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="p-1 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(item.url, item.title);
                        }}
                      >
                        <Download size={18} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400">
                        <Share2 size={18} />
                      </button>
                      <button
                        className={`p-1 ${item.liked ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(item.id);
                        }}
                      >
                        <Heart
                          size={18}
                          fill={item.liked ? "currentColor" : "none"}
                        />
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <button
                      className="text-sm px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        openLightbox(item);
                      }}
                    >
                      Lihat Detail
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-emerald-400 z-10"
              onClick={closeLightbox}
            >
              <X size={32} />
            </button>

            <button
              className="absolute left-4 text-white hover:text-emerald-400 z-10 p-2"
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("prev");
              }}
            >
              <ChevronLeft size={32} />
            </button>

            <button
              className="absolute right-4 text-white hover:text-emerald-400 z-10 p-2"
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("next");
              }}
            >
              <ChevronRight size={32} />
            </button>

            <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col">
              <motion.div
                key={selectedItem.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-black rounded-lg overflow-hidden flex-grow flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="aspect-video bg-gray-800 flex items-center justify-center relative flex-grow">
                  {selectedItem.type === "image" ? (
                    <GalleryImage
                      src={selectedItem.url}
                      alt={selectedItem.title}
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  ) : (
                    <video
                      src={selectedItem.url}
                      controls
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  )}
                </div>

                <div
                  className="p-4 bg-gray-900 text-white relative"
                  onMouseEnter={() => setShowThumbnails(true)}
                  onMouseLeave={() => setShowThumbnails(false)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium">
                        {selectedItem.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {selectedItem.date}
                      </p>
                      {selectedItem.description && (
                        <p className="text-gray-300 mt-2 text-sm">
                          {selectedItem.description}
                        </p>
                      )}
                    </div>
                    <div className="flex space-x-3">
                      <button
                        className="hover:text-emerald-400"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(selectedItem.url, selectedItem.title);
                        }}
                      >
                        <Download size={20} />
                      </button>
                      <button className="hover:text-emerald-400">
                        <Share2 size={20} />
                      </button>
                      <button
                        className={`${selectedItem.liked ? "text-red-500" : "hover:text-red-500"}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(selectedItem.id);
                        }}
                      >
                        <Heart
                          size={20}
                          fill={selectedItem.liked ? "currentColor" : "none"}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Thumbnail previews - only shown when hovering bottom area */}
                  <AnimatePresence>
                    {showThumbnails && filteredItems.length > 1 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 right-0 bottom-full pb-2 bg-gradient-to-t from-black/90 to-transparent"
                      >
                        <div className="flex overflow-x-auto space-x-3 py-2 px-4">
                          {filteredItems.map((item) => (
                            <motion.div
                              key={item.id}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden cursor-pointer relative transition-all duration-200 ${selectedItem.id === item.id ? "ring-2 ring-emerald-500 transform scale-105" : "opacity-70 hover:opacity-100"}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedItem(item);
                              }}
                            >
                              <GalleryImage
                                src={item.url}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                              {item.type === "video" && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-white"
                                  >
                                    <polygon points="5 3 19 12 5 21 5 3" />
                                  </svg>
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;

