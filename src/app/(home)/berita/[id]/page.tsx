"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Bookmark,
  Share2,
  MoreHorizontal,
  User,
  MessageSquare,
  CalendarDays,
  Image as ImageIcon,
  Copy,
  Check,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import Head from "next/head";

type BeritaItem = {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  time: string;
  author: string;
  location: string;
  images: {
    url: string;
    alt?: string;
  }[];
  relatedNews: {
    id: string;
    title: string;
    date: string;
    category: string;
    slug: string;
    image?: string;
  }[];
};

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
// FUNGSI UNTUK PARSING KONTEN RICH TEXT
// ==========================
function parseRichTextContent(content: any): string {
  if (!content) return "";

  // Jika konten berupa string langsung
  if (typeof content === "string") {
    return content
      .split("\n\n")
      .map(
        (paragraph: string) => `<p style="margin-bottom: 1em">${paragraph}</p>`,
      )
      .join("");
  }

  // Jika konten berupa array (Strapi Rich Text)
  if (Array.isArray(content)) {
    let html = "";
    for (const block of content) {
      if (block.type === "paragraph" && Array.isArray(block.children)) {
        const text = block.children
          .filter((child: any) => child.text)
          .map((child: any) => child.text)
          .join("");
        if (text.trim()) {
          html += `<p style="margin-bottom: 1em">${text}</p>`;
        }
      }
    }
    return html;
  }

  // Fallback ke JSON string
  return JSON.stringify(content || "");
}

// ==========================
// IMAGE COMPONENT
// ==========================
const NewsImage = ({
  src,
  alt,
  className = "",
}: {
  src: string | null;
  alt: string;
  className?: string;
}) => {
  if (!src) {
    return (
      <div
        className={`absolute inset-0 bg-gray-300 dark:bg-gray-700 flex items-center justify-center ${className}`}
      >
        <ImageIcon size={32} className="text-gray-400" />
      </div>
    );
  }

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src =
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800";
  };

  return (
    <img
      src={src}
      alt={alt}
      className={`absolute inset-0 w-full h-full object-cover ${className}`}
      onError={handleImageError}
      crossOrigin="anonymous"
    />
  );
};

const BeritaDetails = () => {
  const params = useParams<{ id: string }>();
  const [berita, setBerita] = useState<BeritaItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedNews, setRelatedNews] = useState<any[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [showShareOverlay, setShowShareOverlay] = useState(false);
  const [copied, setCopied] = useState(false);
  const [slug, setSlug] = useState<string>("");

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    if (params && params.id) {
      setSlug(params.id);
      fetchData(params.id);
    }
  }, [params]);

  const fetchData = async (id: string) => {
    try {
      setLoading(true);

      // Fetch main news - KONSISTEN DENGAN HALAMAN BERITA
      const newsResponse = await fetch(
        `/api/proxy/blogs?filters[slug][$eq]=${id}&populate=*`,
      );

      if (!newsResponse.ok) {
        throw new Error(`HTTP error! status: ${newsResponse.status}`);
      }

      const newsData = await newsResponse.json();
      console.log("API Response for detail:", newsData);

      if (newsData.data.length > 0) {
        const newsItem = newsData.data[0].attributes || newsData.data[0];

        // Gunakan fungsi getImageUrl yang sama dengan halaman berita
        const imageUrl = getImageUrl(newsItem.image);
        console.log("Generated image URL:", imageUrl);

        // Gunakan fungsi parseRichTextContent untuk konsistensi
        const processedContent = parseRichTextContent(newsItem.content);

        const formattedNews: BeritaItem = {
          id: id,
          title: newsItem.name || newsItem.judul_berita || "Tanpa Judul",
          content: processedContent,
          category: newsItem.category || "kegiatan",
          date: new Date(
            newsItem.publishedAt || newsItem.createdAt || new Date(),
          ).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          time: newsItem.waktu
            ? new Date(`2000-01-01T${newsItem.waktu}`).toLocaleTimeString(
                "id-ID",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                },
              )
            : "00:00",
          author: "Tim Media Masjid",
          location: "Masjid Khoerul Ba'i",
          images: imageUrl
            ? [
                {
                  url: imageUrl,
                  alt:
                    newsItem.image?.data?.attributes?.alternativeText ||
                    newsItem.name ||
                    "Gambar berita",
                },
              ]
            : [],
          relatedNews: [],
        };

        setBerita(formattedNews);

        // Fetch related news - KONSISTEN DENGAN HALAMAN BERITA
        const relatedResponse = await fetch(
          `/api/proxy/blogs?filters[slug][$ne]=${id}&pagination[limit]=3&populate=*`,
        );

        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json();

          const formattedRelated = relatedData.data.map((item: any) => {
            const attrs = item.attributes || item;
            const relatedImageUrl = getImageUrl(attrs.image);

            return {
              id: item.id.toString(),
              title: attrs.name || attrs.judul_berita || "Tanpa Judul",
              date: new Date(
                attrs.publishedAt || attrs.createdAt || new Date(),
              ).toLocaleDateString("id-ID"),
              category: attrs.category || "kegiatan",
              slug: attrs.slug || item.id.toString(),
              image: relatedImageUrl,
            };
          });

          setRelatedNews(formattedRelated);
        }
      } else {
        throw new Error("Berita tidak ditemukan");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setBerita(null);
    } finally {
      setLoading(false);
    }
  };

  const handleNextImage = () => {
    if (berita?.images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === berita.images.length - 1 ? 0 : prevIndex + 1,
      );
    }
  };

  const handlePrevImage = () => {
    if (berita?.images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? berita.images.length - 1 : prevIndex - 1,
      );
    }
  };

  const copyToClipboard = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Memuat Berita - Masjid Khoerul Ba'i</title>
          <meta
            name="description"
            content="Sedang memuat berita terbaru dari Masjid Khoerul Ba'i"
          />
        </Head>
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="relative w-12 h-12 mb-4">
              <div
                className="absolute top-0 left-0 w-3 h-3 rounded-full bg-emerald-500 animate-bounce"
                style={{ animationDelay: "0s" }}
              />
              <div
                className="absolute top-0 right-0 w-3 h-3 rounded-full bg-emerald-500 animate-bounce"
                style={{ animationDelay: "0.2s" }}
              />
              <div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-emerald-500 animate-bounce"
                style={{ animationDelay: "0.4s" }}
              />
            </div>
            <p className="text-gray-500 dark:text-gray-400">Memuat berita...</p>
          </div>
        </div>
      </>
    );
  }

  if (!berita) {
    return (
      <>
        <Head>
          <title>Berita Tidak Ditemukan - Masjid Khoerul Ba'i</title>
          <meta
            name="description"
            content="Berita yang Anda cari tidak ditemukan"
          />
        </Head>
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center text-center p-6 max-w-md">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
              <X className="text-red-500 dark:text-red-400" size={24} />
            </div>
            <h1 className="text-xl font-bold dark:text-white mb-2">
              Gagal Memuat Berita
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Terjadi kesalahan saat memuat berita. Silakan coba lagi.
            </p>
            <Link
              href="/berita"
              className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition"
            >
              <ArrowLeft size={16} className="mr-2" />
              Kembali ke Halaman Berita
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{berita.title} - Masjid Khoerul Ba'i</title>
        <meta
          name="description"
          content={berita.content.replace(/<[^>]*>/g, "").substring(0, 160)}
        />
        <meta property="og:title" content={berita.title} />
        <meta
          property="og:description"
          content={berita.content.replace(/<[^>]*>/g, "").substring(0, 160)}
        />
        <meta
          property="og:url"
          content={typeof window !== "undefined" ? window.location.href : ""}
        />
        <meta property="og:type" content="article" />
        {berita.images.length > 0 && (
          <meta property="og:image" content={berita.images[0].url} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={berita.title} />
        <meta
          name="twitter:description"
          content={berita.content.replace(/<[^>]*>/g, "").substring(0, 160)}
        />
        {berita.images.length > 0 && (
          <meta name="twitter:image" content={berita.images[0].url} />
        )}
      </Head>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-50 dark:bg-gray-900 min-h-screen"
      >
        <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <Link
                href="/berita"
                className="flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
              >
                <ArrowLeft size={20} className="mr-2" />
                Kembali ke Berita
              </Link>

              <div className="flex items-center space-x-4">
                <button className="p-1 text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400">
                  <Bookmark size={20} />
                </button>
                <button
                  className="p-1 text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400"
                  onClick={() => setShowShareOverlay(true)}
                >
                  <Share2 size={20} />
                </button>
                <button className="p-1 text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <span className="inline-block bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm px-3 py-1 rounded-full mb-4">
              {berita.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold dark:text-white mb-4">
              {berita.title}
            </h1>

            <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 gap-4">
              <div className="flex items-center">
                <User size={16} className="mr-2" />
                {berita.author}
              </div>
              <div className="flex items-center">
                <CalendarDays size={16} className="mr-2" />
                {berita.date}
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                {berita.time}
              </div>
            </div>
          </motion.div>

          {berita.images.length > 0 && !imageError ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative rounded-xl overflow-hidden mb-8 h-64 md:h-80 bg-gray-300 dark:bg-gray-700"
            >
              <NewsImage
                src={berita.images[currentImageIndex].url}
                alt={berita.images[currentImageIndex].alt || berita.title}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm">Lokasi: {berita.location}</p>
              </div>

              {berita.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
                  >
                    <ArrowLeft size={20} className="rotate-180" />
                  </button>
                  <div className="absolute bottom-4 right-4 flex items-center bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                    <ImageIcon size={14} className="mr-1" />
                    {currentImageIndex + 1}/{berita.images.length}
                  </div>
                </>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative rounded-xl overflow-hidden mb-8 h-64 md:h-80 bg-gray-300 dark:bg-gray-700 flex items-center justify-center"
            >
              <div className="text-gray-500 dark:text-gray-400 flex flex-col items-center">
                <ImageIcon size={48} className="mb-2" />
                <p>Tidak ada gambar</p>
              </div>
            </motion.div>
          )}

          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="prose dark:prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: berita.content }}
          />

          {berita.images.length > 1 && !imageError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mb-8"
            >
              <h3 className="font-bold dark:text-white mb-4">Galeri Foto</h3>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                {berita.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-square overflow-hidden rounded-lg ${
                      currentImageIndex === index
                        ? "ring-2 ring-emerald-500"
                        : ""
                    }`}
                  >
                    <NewsImage
                      src={image.url}
                      alt={image.alt || berita.title}
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="border-t border-b border-gray-200 dark:border-gray-700 py-6 mb-12"
          >
            <h3 className="font-bold dark:text-white mb-4">
              Bagikan Artikel Ini
            </h3>
            <div className="flex flex-wrap gap-3">
              <div className="grid grid-cols-4 gap-4">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    window.location.href,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mb-1">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <span className="text-xs dark:text-gray-300">Facebook</span>
                </a>

                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    window.location.href,
                  )}&text=${encodeURIComponent(berita.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center mb-1">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </div>
                  <span className="text-xs dark:text-gray-300">Twitter</span>
                </a>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `${berita.title} - ${window.location.href}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-1">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.99 6.98l-1.414 1.414-4.576 4.576-1.414-1.414L12 9.172l-4.242 4.243-1.414-1.415L12 6.343l6.99 6.637z" />
                    </svg>
                  </div>
                  <span className="text-xs dark:text-gray-300">WhatsApp</span>
                </a>

                <button
                  onClick={copyToClipboard}
                  className="flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center mb-1">
                    <Copy size={24} className="text-white" />
                  </div>
                  <span className="text-xs dark:text-gray-300">Salin Link</span>
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <h3 className="text-xl font-bold dark:text-white mb-6 flex items-center">
              <MessageSquare
                size={20}
                className="mr-2 text-emerald-600 dark:text-emerald-400"
              />
              Komentar
            </h3>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow mb-4">
              <textarea
                placeholder="Tulis komentar Anda..."
                className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                rows={3}
                disabled={true}
              />
              <div className="flex justify-end mt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-sm"
                  disabled={true}
                >
                  Kirim Komentar
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-xl font-bold dark:text-white mb-6">
              Berita Terkait
            </h3>
            {relatedNews.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-4">
                {relatedNews.map((news, index) => (
                  <motion.div
                    key={news.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow"
                  >
                    <Link href={`/berita/${news.slug}`} className="block">
                      <div className="relative h-40">
                        <NewsImage src={news.image || null} alt={news.title} />
                        <div className="absolute top-2 left-2 z-10">
                          <span className="bg-emerald-600 text-white text-xs px-2 py-1 rounded">
                            {news.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold dark:text-white line-clamp-2">
                          {news.title}
                        </h4>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                          {news.date}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  Belum ada berita terkait
                </p>
              </div>
            )}
          </motion.div>
        </main>

        <AnimatePresence>
          {showShareOverlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowShareOverlay(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold dark:text-white">
                    Bagikan Berita
                  </h3>
                  <button
                    onClick={() => setShowShareOverlay(false)}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="mb-6">
                  <div className="flex items-center space-x-4 mb-4">
                    {berita.images.length > 0 && !imageError ? (
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <NewsImage
                          src={berita.images[0].url}
                          alt={berita.images[0].alt || berita.title}
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <ImageIcon size={24} className="text-gray-400" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-medium dark:text-white line-clamp-2">
                        {berita.title}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {berita.category}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                      <div className="flex-1 truncate text-sm dark:text-gray-200">
                        {typeof window !== "undefined"
                          ? window.location.href
                          : ""}
                      </div>
                      <button
                        onClick={copyToClipboard}
                        className="ml-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                        title="Salin link"
                      >
                        {copied ? (
                          <Check
                            size={18}
                            className="text-emerald-600 dark:text-emerald-400"
                          />
                        ) : (
                          <Copy
                            size={18}
                            className="text-gray-500 dark:text-gray-400"
                          />
                        )}
                      </button>
                    </div>
                    {copied && (
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                        Link berhasil disalin!
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      typeof window !== "undefined" ? window.location.href : "",
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mb-1">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </div>
                    <span className="text-xs dark:text-gray-300">Facebook</span>
                  </a>

                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      typeof window !== "undefined" ? window.location.href : "",
                    )}&text=${encodeURIComponent(berita.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center mb-1">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </div>
                    <span className="text-xs dark:text-gray-300">Twitter</span>
                  </a>

                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `${berita.title} - ${typeof window !== "undefined" ? window.location.href : ""}`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-1">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.99 6.98l-1.414 1.414-4.576 4.576-1.414-1.414L12 9.172l-4.242 4.243-1.414-1.415L12 6.343l6.99 6.637z" />
                      </svg>
                    </div>
                    <span className="text-xs dark:text-gray-300">WhatsApp</span>
                  </a>

                  <button
                    onClick={copyToClipboard}
                    className="flex flex-col items-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center mb-1">
                      <Copy size={24} className="text-white" />
                    </div>
                    <span className="text-xs dark:text-gray-300">
                      Salin Link
                    </span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default BeritaDetails;

