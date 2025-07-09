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
  X,
  User,
  LogOut
} from 'lucide-react'

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
  onLogout: () => void
}

const MobileMenu = ({ 
  isOpen, 
  pathname, 
  dropdownOpen, 
  toggleDropdown, 
  setIsOpen,
  isSignedIn,
  user,
  onLogout
}: MobileMenuProps) => {
  const isActive = (href: string) => pathname === href

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Content */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-20 z-50 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden"
          >
            <div className="px-2 pt-4 pb-4 space-y-1">
              <Link
                href="/"
                className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                  isActive('/') 
                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-gray-700' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700'
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
              
              <div className="pt-2 border-t border-gray-200/50 dark:border-gray-700/50">
                {isSignedIn ? (
                  <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300">
                        <User className="h-4 w-4" />
                      </div>
                      <span className="ml-3 text-base font-medium text-gray-700 dark:text-gray-300">
                        {user?.username || 'Profile'}
                      </span>
                    </div>
                    <button
                      onClick={onLogout}
                      className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 px-3">
                    <Link
                      href="/login"
                      className="flex items-center justify-center px-4 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700 transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <LogIn className="h-5 w-5 mr-2" />
                      Login
                    </Link>
                    <Link
                      href="/signup"
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
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu