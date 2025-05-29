import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Masjid Khoirul Ba'i</h3>
            <p className="mb-4">
              Pusat ibadah, pendidikan, dan kegiatan sosial masyarakat di Jakarta Barat.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li><Link href="/tentang" className="hover:text-white transition-colors">Tentang Kami</Link></li>
              <li><Link href="/jadwal" className="hover:text-white transition-colors">Jadwal Sholat</Link></li>
              <li><Link href="/kajian" className="hover:text-white transition-colors">Kajian Rutin</Link></li>
              <li><Link href="/donasi" className="hover:text-white transition-colors">Donasi</Link></li>
              <li><Link href="/kontak" className="hover:text-white transition-colors">Kontak</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Layanan</h3>
            <ul className="space-y-2">
              <li><Link href="/tpa" className="hover:text-white transition-colors">TPA/TPQ</Link></li>
              <li><Link href="/zakat" className="hover:text-white transition-colors">Zakat & Infaq</Link></li>
              <li><Link href="/pernikahan" className="hover:text-white transition-colors">Pernikahan</Link></li>
              <li><Link href="/sosial" className="hover:text-white transition-colors">Kegiatan Sosial</Link></li>
              <li><Link href="/tahfiz" className="hover:text-white transition-colors">Tahfiz Book</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Kontak</h3>
            <address className="not-italic space-y-2">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>Jl. Raya Adiwerna No.Km. 5, Kaliwadas, Kec. Adiwerna, Kabupaten Tegal, Jawa Tengah 52194</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>-</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>info@smkn1adw.sch.id</span>
              </div>
            </address>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} Masjid Khoirul Ba'i. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};