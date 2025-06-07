"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Bookmark,
  Share2,
  MoreHorizontal,
  User,
  MessageSquare,
  ThumbsUp,
  CircleHelp,
  MessageCircle,
  Link as LinkIcon,
  CalendarDays,
  Image as ImageIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

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

const BeritaDetails = ({ params }: { params: { id: string } }) => {
  const [berita, setBerita] = useState<BeritaItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedNews, setRelatedNews] = useState<any[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch main news
        const newsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/blogs?filters[slug][$eq]=${params.id}&populate=*`
        );
        const newsData = await newsResponse.json();

        if (newsData.data.length > 0) {
          const newsItem = newsData.data[0].attributes;
          let imageUrl = null;
          
          if (newsItem.image?.data?.attributes?.url) {
            // Handle both absolute and relative URLs
            if (newsItem.image.data.attributes.url.startsWith('http')) {
              imageUrl = newsItem.image.data.attributes.url;
            } else {
              imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${newsItem.image.data.attributes.url}`;
            }
          }

          // Process content to handle newlines
const processedContent = newsItem.content
  .split('\n\n')
.map((paragraph: string) => `<p style="margin-bottom: 1em">${paragraph}</p>`)
  .join('');


          const formattedNews = {
            id: params.id,
            title: newsItem.name,
            content: processedContent,
            category: newsItem.category,
            date: new Date(newsItem.createdAt).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            time: new Date(newsItem.waktu).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            author: "Tim Media Masjid",
            location: "Masjid Khoerul Ba'i",
            images: imageUrl
              ? [
                  {
                    url: imageUrl,
                    alt:
                      newsItem.image.data.attributes.alternativeText ||
                      newsItem.name,
                  },
                ]
              : [],
                relatedNews: [], // Tambahkan ini!

          };

          setBerita(formattedNews);

          // Fetch related news with images
          const relatedResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/blogs?filters[slug][$ne]=${params.id}&pagination[limit]=3&populate=*`
          );
          const relatedData = await relatedResponse.json();

          const formattedRelated = relatedData.data.map((item: any) => ({
            id: item.id.toString(),
            title: item.attributes.name,
            date: new Date(item.attributes.createdAt).toLocaleDateString(
              "id-ID"
            ),
            category: item.attributes.category,
            slug: item.attributes.slug,
            image: item.attributes.image?.data?.attributes?.url
              ? item.attributes.image.data.attributes.url.startsWith("http")
                ? item.attributes.image.data.attributes.url
                : `${process.env.NEXT_PUBLIC_API_URL}${item.attributes.image.data.attributes.url}`
              : null,
          }));

          setRelatedNews(formattedRelated);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const handleNextImage = () => {
    if (berita?.images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === berita.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (berita?.images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? berita.images.length - 1 : prevIndex - 1
      );
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link berhasil disalin!");
  };

  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="flex space-x-4">
                <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="space-y-8">
            <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-8 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="flex space-x-4">
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
            <div className="space-y-4">
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!berita) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold dark:text-white">
            Berita tidak ditemukan
          </h1>
          <Link
            href="/berita"
            className="mt-4 inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            <ArrowLeft size={16} className="mr-2" />
            Kembali ke halaman berita
          </Link>
        </div>
      </div>
    );
  }

  return (
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
              <button className="p-1 text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400">
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
            <Image
              src={berita.images[currentImageIndex].url}
              alt={berita.images[currentImageIndex].alt || berita.title}
              fill
              className="object-cover"
              priority
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-sm">Lokasi: {berita.location}</p>
            </div>

            {/* Image navigation */}
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
                    currentImageIndex === index ? "ring-2 ring-emerald-500" : ""
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt || berita.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/placeholder-image.jpg';
                    }}
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
            <motion.button
              whileHover={{ y: -2 }}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-full text-sm"
            >
              <CircleHelp size={16} className="mr-2" />
              Facebook
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              className="flex items-center px-4 py-2 bg-sky-500 text-white rounded-full text-sm"
            >
              <CircleHelp size={16} className="mr-2" />
              Twitter
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded-full text-sm"
            >
              <MessageCircle size={16} className="mr-2" />
              WhatsApp
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              className="flex items-center px-4 py-2 bg-blue-700 text-white rounded-full text-sm"
            >
              <CircleHelp size={16} className="mr-2" />
              LinkedIn
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              onClick={copyToClipboard}
              className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full text-sm"
            >
              <LinkIcon size={16} className="mr-2" />
              Salin Link
            </motion.button>
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
            Komentar (12)
          </h3>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow mb-4">
            <textarea
              placeholder="Tulis komentar Anda..."
              className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              rows={3}
            />
            <div className="flex justify-end mt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-sm"
              >
                Kirim Komentar
              </motion.button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow mb-3">
            <div className="flex items-start">
              <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700 mr-3"></div>
              <div>
                <div className="flex items-center">
                  <h4 className="font-bold dark:text-white mr-2">
                    Ahmad Surya
                  </h4>
                  <span className="text-xs text-gray-500">2 hari lalu</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  Pengajian yang sangat bermanfaat, semoga diadakan rutin setiap
                  bulan dengan tema-tema aktual seperti ini.
                </p>
                <div className="flex items-center mt-2">
                  <button className="flex items-center text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm mr-4">
                    <ThumbsUp size={14} className="mr-1" />8
                  </button>
                  <button className="text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm">
                    Balas
                  </button>
                </div>
              </div>
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
                  {news.image ? (
                    <div className="relative h-40">
                      <Image
                        src={news.image}
                        alt={news.title}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = '/placeholder-image.jpg';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="h-40 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                      <ImageIcon size={32} className="text-gray-400" />
                    </div>
                  )}
                  <div className="p-4">
                    <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-full mb-2">
                      {news.category}
                    </span>
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
        </motion.div>
      </main>
    </motion.div>
  );
};

export default BeritaDetails;