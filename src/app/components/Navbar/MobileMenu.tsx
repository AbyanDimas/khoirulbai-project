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
  LogIn,
  UserPlus,
  X
} from 'lucide-react'
import { UserButton } from '@clerk/nextjs'

interface MobileMenuProps {
  isOpen: boolean
  pathname: string
  dropdownOpen: {
    jadwal: boolean
    lainnya: boolean
  }
  toggleDropdown: (name: 'jadwal' | 'lainnya') => void
  setIsOpen: (open: boolean) => void
  isSignedIn: boolean
  user: any
}

const MobileMenu = ({ 
  isOpen, 
  pathname, 
  dropdownOpen, 
  toggleDropdown, 
  setIsOpen,
  isSignedIn,
  user
}: MobileMenuProps) => {
  const isActive = (href: string) => pathname === href

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden overflow-hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className={`flex items-center px-3 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                isActive('/') 
                  ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-gray-800' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <Home className={`h-5 w-5 mr-3 ${isActive('/') ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'}`} />
              Beranda
            </Link>

            <Link
              href="/agenda"
              className={`flex items-center px-3 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                isActive('/agenda') 
                  ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-gray-800' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <CalendarDays className={`h-5 w-5 mr-3 ${isActive('/agenda') ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'}`} />
              Agenda
            </Link>

            <button
              onClick={() => toggleDropdown('jadwal')}
              className={`flex items-center w-full px-3 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                pathname.startsWith('/jadwal') 
                  ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-gray-800' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Clock4 className={`h-5 w-5 mr-3 ${pathname.startsWith('/jadwal') ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'}`} />
              Jadwal
              {dropdownOpen.jadwal ? (
                <ChevronUp className="h-5 w-5 ml-auto text-gray-500 dark:text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 ml-auto text-gray-500 dark:text-gray-400" />
              )}
            </button>

            <AnimatePresence>
              {dropdownOpen.jadwal && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="pl-14 space-y-1"
                >
                  <Link
                    href="/jadwal-jumat"
                    className={`flex items-center px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                      isActive('/jadwal-jumat') 
                        ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-gray-800' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <BookOpenText className="h-4 w-4 mr-3" />
                    Jadwal Jumat
                  </Link>
                  <Link
                    href="/jadwal-tarawih"
                    className={`flex items-center px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                      isActive('/jadwal-tarawih') 
                        ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-gray-800' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Calendar className="h-4 w-4 mr-3" />
                    Jadwal Tarawih
                  </Link>
                  <Link
                    href="/jadwal-pengajian"
                    className={`flex items-center px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                      isActive('/jadwal-pengajian') 
                        ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-gray-800' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Mic2 className="h-4 w-4 mr-3" />
                    Kultum & Pengajian
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            <Link
              href="/tausiyah"
              className={`flex items-center px-3 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                isActive('/tausiyah') 
                  ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-gray-800' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <Megaphone className={`h-5 w-5 mr-3 ${isActive('/tausiyah') ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'}`} />
              tausiyah
            </Link>

            <button
              onClick={() => toggleDropdown('lainnya')}
              className={`flex items-center w-full px-3 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                pathname.startsWith('/wakaf') || 
                pathname.startsWith('/keuangan') || 
                pathname.startsWith('/berita') || 
                pathname.startsWith('/galeri')
                  ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-gray-800' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <MoreHorizontal className={`h-5 w-5 mr-3 ${
                pathname.startsWith('/wakaf') || 
                pathname.startsWith('/keuangan') || 
                pathname.startsWith('/berita') || 
                pathname.startsWith('/galeri') 
                  ? 'text-emerald-600 dark:text-emerald-400' 
                  : 'text-gray-500 dark:text-gray-400'
              }`} />
              Lainnya
              {dropdownOpen.lainnya ? (
                <ChevronUp className="h-5 w-5 ml-auto text-gray-500 dark:text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 ml-auto text-gray-500 dark:text-gray-400" />
              )}
            </button>

            <AnimatePresence>
              {dropdownOpen.lainnya && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="pl-14 space-y-1"
                >
                  <Link
                    href="/wakaf"
                    className={`flex items-center px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                      isActive('/wakaf') 
                        ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-gray-800' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <FileText className="h-4 w-4 mr-3" />
                    Wakaf
                  </Link>
                  <Link
                    href="/keuangan"
                    className={`flex items-center px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                      isActive('/keuangan') 
                        ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-gray-800' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <FileText className="h-4 w-4 mr-3" />
                    Keuangan
                  </Link>
                  <Link
                    href="/berita"
                    className={`flex items-center px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                      isActive('/berita') 
                        ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-gray-800' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Newspaper className="h-4 w-4 mr-3" />
                    Berita
                  </Link>
                  <Link
                    href="/galeri"
                    className={`flex items-center px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                      isActive('/galeri') 
                        ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-gray-800' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Images className="h-4 w-4 mr-3" />
                    Galeri
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
              {isSignedIn ? (
                <div className="flex items-center px-3 py-3">
                  <UserButton 
                    afterSignOutUrl="/" 
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "h-8 w-8",
                        userButtonPopoverCard: "dark:bg-gray-800 dark:border-gray-700"
                      }
                    }} 
                  />
                  <span className="ml-3 text-base font-medium text-gray-700 dark:text-gray-300">
                    {user?.firstName || 'Profile'}
                  </span>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 px-3">
                  <Link
                    href="/sign-in"
                    className="flex items-center justify-center px-4 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <LogIn className="h-5 w-5 mr-2" />
                    Login
                  </Link>
                  <Link
                    href="/sign-up"
                    className="flex items-center justify-center px-4 py-2 rounded-lg text-base font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <UserPlus className="h-5 w-5 mr-2" />
                    Daftar
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu