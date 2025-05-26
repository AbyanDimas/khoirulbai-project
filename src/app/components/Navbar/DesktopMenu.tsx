import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home,
  CalendarDays,
  Clock4,
  Megaphone,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  BookOpenText,
  Calendar,
  Mic2,
  FileText,
  Newspaper,
  Images,
  Clock10,
  HandHeart
} from 'lucide-react'

interface DesktopMenuProps {
  pathname: string
  dropdownOpen: {
    jadwal: boolean
    lainnya: boolean
  }
  toggleDropdown: (name: 'jadwal' | 'lainnya') => void
}

const DesktopMenu = ({ pathname, dropdownOpen, toggleDropdown }: DesktopMenuProps) => {
  const isActive = (href: string) => pathname === href

  return (
    <div className="hidden md:flex items-center space-x-1 flex-1 justify-center">
      <Link 
        href="/" 
        className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
          isActive('/') 
            ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-gray-800' 
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        <Home className={`h-4 w-4 mr-2 ${isActive('/') ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'}`} />
        Beranda
      </Link>

      <Link 
        href="/agenda" 
        className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
          isActive('/agenda') 
            ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-gray-800' 
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        <CalendarDays className={`h-4 w-4 mr-2 ${isActive('/agenda') ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'}`} />
        Agenda
      </Link>

      <JadwalDropdown 
        pathname={pathname}
        dropdownOpen={dropdownOpen.jadwal}
        toggleDropdown={() => toggleDropdown('jadwal')}
      />

      <Link 
        href="/tausiyah" 
        className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
          isActive('/tausyiah') 
            ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-gray-800' 
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        <Megaphone className={`h-4 w-4 mr-2 ${isActive('/tausyiah') ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'}`} />
        Tausyiah
      </Link>

      <LainnyaDropdown 
        pathname={pathname}
        dropdownOpen={dropdownOpen.lainnya}
        toggleDropdown={() => toggleDropdown('lainnya')}
      />
    </div>
  )
}

const JadwalDropdown = ({ pathname, dropdownOpen, toggleDropdown }: { pathname: string, dropdownOpen: boolean, toggleDropdown: () => void }) => (
  <div className="relative">
    <button
      onClick={toggleDropdown}
      className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
        pathname.startsWith('/jadwal-sholat') 
          ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-gray-800' 
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      <Clock4 className={`h-4 w-4 mr-2 ${pathname.startsWith('/jadwal') ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'}`} />
      Jadwal
      {dropdownOpen ? (
        <ChevronUp className="h-4 w-4 ml-1 text-gray-500 dark:text-gray-400" />
      ) : (
        <ChevronDown className="h-4 w-4 ml-1 text-gray-500 dark:text-gray-400" />
      )}
    </button>

    <AnimatePresence>
      {dropdownOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 mt-2 w-56 origin-top-left bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden"
        >
          <div className="py-1">
            <Link
              href="/jadwal/jumat"
              className={`flex items-center px-4 py-2 text-sm transition-colors duration-150 ${
                pathname === '/jadwal-jumat' 
                  ? 'bg-emerald-50 dark:bg-gray-700 text-emerald-600 dark:text-emerald-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <BookOpenText className="h-4 w-4 mr-2" />
              Jadwal Jumat
            </Link>
            <Link
              href="/jadwal/tarawih"
              className={`flex items-center px-4 py-2 text-sm transition-colors duration-150 ${
                pathname === '/jadwal-tarawih' 
                  ? 'bg-emerald-50 dark:bg-gray-700 text-emerald-600 dark:text-emerald-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Jadwal Tarawih
            </Link>
            <Link
              href="/jadwal/kultum-pengajian"
              className={`flex items-center px-4 py-2 text-sm transition-colors duration-150 ${
                pathname === '/jadwal/kultum-pengajian' 
                  ? 'bg-emerald-50 dark:bg-gray-700 text-emerald-600 dark:text-emerald-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Mic2 className="h-4 w-4 mr-2" />
              Kultum & Pengajian
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)

const LainnyaDropdown = ({ pathname, dropdownOpen, toggleDropdown }: { pathname: string, dropdownOpen: boolean, toggleDropdown: () => void }) => (
  <div className="relative">
    <button
      onClick={toggleDropdown}
      className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
        pathname.startsWith('/wakaf') || 
        pathname.startsWith('/keuangan') || 
        pathname.startsWith('/berita') || 
        pathname.startsWith('/galeri')
          ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-gray-800' 
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      <MoreHorizontal className={`h-4 w-4 mr-2 ${
        pathname.startsWith('/wakaf') || 
        pathname.startsWith('/keuangan') || 
        pathname.startsWith('/berita') || 
        pathname.startsWith('/galeri') 
          ? 'text-emerald-600 dark:text-emerald-400' 
          : 'text-gray-500 dark:text-gray-400'
      }`} />
      Lainnya
      {dropdownOpen ? (
        <ChevronUp className="h-4 w-4 ml-1 text-gray-500 dark:text-gray-400" />
      ) : (
        <ChevronDown className="h-4 w-4 ml-1 text-gray-500 dark:text-gray-400" />
      )}
    </button>

    <AnimatePresence>
      {dropdownOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 mt-2 w-64 origin-top-left bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden"
        >
          <div className="grid grid-cols-2 gap-2 p-3">
            <Link
              href="/wakaf"
              className={`flex flex-col items-center p-3 rounded-lg text-sm transition-colors duration-150 ${
                pathname === '/wakaf' 
                  ? 'bg-emerald-50 dark:bg-gray-700 text-emerald-600 dark:text-emerald-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className={`flex items-center justify-center h-10 w-10 rounded-lg mb-2 ${
                pathname === '/wakaf' 
                  ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}>
                <FileText className="h-5 w-5" />
              </div>
              Wakaf
            </Link>
            <Link
              href="/keuangan"
              className={`flex flex-col items-center p-3 rounded-lg text-sm transition-colors duration-150 ${
                pathname === '/keuangan' 
                  ? 'bg-emerald-50 dark:bg-gray-700 text-emerald-600 dark:text-emerald-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className={`flex items-center justify-center h-10 w-10 rounded-lg mb-2 ${
                pathname === '/keuangan' 
                  ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}>
                <FileText className="h-5 w-5" />
              </div>
              Keuangan
            </Link>
            <Link
              href="/berita"
              className={`flex flex-col items-center p-3 rounded-lg text-sm transition-colors duration-150 ${
                pathname === '/berita' 
                  ? 'bg-emerald-50 dark:bg-gray-700 text-emerald-600 dark:text-emerald-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className={`flex items-center justify-center h-10 w-10 rounded-lg mb-2 ${
                pathname === '/berita' 
                  ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}>
                <Newspaper className="h-5 w-5" />
              </div>
              Berita
            </Link>
            <Link
              href="/galeri"
              className={`flex flex-col items-center p-3 rounded-lg text-sm transition-colors duration-150 ${
                pathname === '/galeri' 
                  ? 'bg-emerald-50 dark:bg-gray-700 text-emerald-600 dark:text-emerald-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className={`flex items-center justify-center h-10 w-10 rounded-lg mb-2 ${
                pathname === '/galeri' 
                  ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}>
                <Images className="h-5 w-5" />
              </div>
              Galeri
            </Link>
                 <Link
              href="/jadwal-sholat"
              className={`flex flex-col items-center p-3 rounded-lg text-sm transition-colors duration-150 ${
                pathname === '/jadwal-sholat' 
                  ? 'bg-emerald-50 dark:bg-gray-700 text-emerald-600 dark:text-emerald-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className={`flex items-center justify-center h-10 w-10 rounded-lg mb-2 ${
                pathname === '/jadwal-sholat' 
                  ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}>
                <Clock10 className="h-5 w-5" />
              </div>
              Jadwal Sholat
            </Link>
                      <Link
              href="/zakat-infaq"
              className={`flex flex-col items-center p-3 rounded-lg text-sm transition-colors duration-150 ${
                pathname === '/zakat-infaq' 
                  ? 'bg-emerald-50 dark:bg-gray-700 text-emerald-600 dark:text-emerald-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className={`flex items-center justify-center h-10 w-10 rounded-lg mb-2 ${
                pathname === '/zakat-infaq' 
                  ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}>
                <HandHeart className="h-5 w-5" />
              </div>
              Zakat & Infaq
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)

export default DesktopMenu