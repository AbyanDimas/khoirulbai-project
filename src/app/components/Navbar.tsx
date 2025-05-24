'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  Calendar, 
  Clock, 
  Mic2, 
  FileText, 
  Newspaper, 
  Image, 
  ChevronDown, 
  ChevronUp,
  Sun,
  Moon,
  User,
  LogIn,
  UserPlus,
  Search,
  X,
  BookOpenText,
  CalendarDays,
  Clock4,
  Megaphone,
  FileSearch,
  Newspaper as NewsIcon,
  Image as GalleryIcon,
  MoreHorizontal,
  Apple
} from 'lucide-react'
import { UserButton, useUser } from '@clerk/nextjs'

const Navbar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState({
    jadwal: false,
    lainnya: false
  })
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { theme, setTheme } = useTheme()
  const { user, isSignedIn } = useUser()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleDropdown = (name: 'jadwal' | 'lainnya') => {
    setDropdownOpen(prev => ({
      ...prev,
      [name]: !prev[name]
    }))
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
    setSearchQuery('')
    setSearchOpen(false)
  }

  if (!mounted) return null

  // Check if current route is active
  const isActive = (href: string) => pathname === href

  // Suggested search links
  const suggestedLinks = [
    { name: 'Apple', icon: Apple, href: '/search?q=apple' },
    { name: 'Agenda', icon: CalendarDays, href: '/agenda' },
    { name: 'Jadwal Sholat', icon: Clock4, href: '/jadwal-sholat' },
    { name: 'Berita Terbaru', icon: NewsIcon, href: '/berita' }
  ]

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and title */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-emerald-600 text-white mr-3 group-hover:bg-emerald-700 transition-colors duration-200">
                <Home className="h-5 w-5" />
              </div>
              <div className="hidden md:block">
                <h1 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">Masjid Khoirul Ba'i</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">SMKN 1 Adiwerna</p>
              </div>
            </Link>
          </div>

          {/* Desktop menu */}
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

            <div className="relative">
              <button
                onClick={() => toggleDropdown('jadwal')}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  pathname.startsWith('/jadwal') 
                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-gray-800' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Clock4 className={`h-4 w-4 mr-2 ${pathname.startsWith('/jadwal') ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'}`} />
                Jadwal
                {dropdownOpen.jadwal ? (
                  <ChevronUp className="h-4 w-4 ml-1 text-gray-500 dark:text-gray-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 ml-1 text-gray-500 dark:text-gray-400" />
                )}
              </button>

              <AnimatePresence>
                {dropdownOpen.jadwal && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-56 origin-top-left bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden"
                  >
                    <div className="py-1">
                      <Link
                        href="/jadwal-jumat"
                        className={`flex items-center px-4 py-2 text-sm transition-colors duration-150 ${
                          isActive('/jadwal-jumat') 
                            ? 'bg-emerald-50 dark:bg-gray-700 text-emerald-600 dark:text-emerald-400' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <BookOpenText className="h-4 w-4 mr-2" />
                        Jadwal Jumat
                      </Link>
                      <Link
                        href="/jadwal-tarawih"
                        className={`flex items-center px-4 py-2 text-sm transition-colors duration-150 ${
                          isActive('/jadwal-tarawih') 
                            ? 'bg-emerald-50 dark:bg-gray-700 text-emerald-600 dark:text-emerald-400' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Jadwal Tarawih
                      </Link>
                      <Link
                        href="/jadwal-pengajian"
                        className={`flex items-center px-4 py-2 text-sm transition-colors duration-150 ${
                          isActive('/jadwal-pengajian') 
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

            <Link 
              href="/tausyiah" 
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActive('/tausyiah') 
                  ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-gray-800' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Megaphone className={`h-4 w-4 mr-2 ${isActive('/tausyiah') ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'}`} />
              Tausyiah
            </Link>

            {/* Lainnya dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('lainnya')}
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
                {dropdownOpen.lainnya ? (
                  <ChevronUp className="h-4 w-4 ml-1 text-gray-500 dark:text-gray-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 ml-1 text-gray-500 dark:text-gray-400" />
                )}
              </button>

              <AnimatePresence>
                {dropdownOpen.lainnya && (
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
                          isActive('/wakaf') 
                            ? 'bg-emerald-50 dark:bg-gray-700 text-emerald-600 dark:text-emerald-400' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <div className={`flex items-center justify-center h-10 w-10 rounded-lg mb-2 ${
                          isActive('/wakaf') 
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
                          isActive('/keuangan') 
                            ? 'bg-emerald-50 dark:bg-gray-700 text-emerald-600 dark:text-emerald-400' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <div className={`flex items-center justify-center h-10 w-10 rounded-lg mb-2 ${
                          isActive('/keuangan') 
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
                          isActive('/berita') 
                            ? 'bg-emerald-50 dark:bg-gray-700 text-emerald-600 dark:text-emerald-400' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <div className={`flex items-center justify-center h-10 w-10 rounded-lg mb-2 ${
                          isActive('/berita') 
                            ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                        }`}>
                          <NewsIcon className="h-5 w-5" />
                        </div>
                        Berita
                      </Link>
                      <Link
                        href="/galeri"
                        className={`flex flex-col items-center p-3 rounded-lg text-sm transition-colors duration-150 ${
                          isActive('/galeri') 
                            ? 'bg-emerald-50 dark:bg-gray-700 text-emerald-600 dark:text-emerald-400' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <div className={`flex items-center justify-center h-10 w-10 rounded-lg mb-2 ${
                          isActive('/galeri') 
                            ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                        }`}>
                          <GalleryIcon className="h-5 w-5" />
                        </div>
                        Galeri
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right side buttons - desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search button */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="flex items-center px-3 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                aria-label="Search"
              >
                <Search className="h-4 w-4 mr-2" />
                <span className="text-sm">Pencarian</span>
              </button>

              {/* Search dropdown */}
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
                  >
                    <form onSubmit={handleSearch} className="p-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Cari sesuatu..."
                          className="w-full pl-10 pr-4 py-2 rounded-lg text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-gray-600 border border-gray-200 dark:border-gray-600"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          autoFocus
                        />
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </form>

                    {/* Suggested links */}
                    <div className="p-2">
                      <h3 className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400">SUGGESTIONS</h3>
                      <ul>
                        {suggestedLinks.map((link, index) => (
                          <li key={index}>
                            <Link
                              href={link.href}
                              className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                              onClick={() => setSearchOpen(false)}
                            >
                              <link.icon className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
                              {link.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme toggle with text and rounded border */}
            <button
              onClick={toggleTheme}
              className="flex items-center px-3 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="h-4 w-4 mr-2" />
                  <span className="text-sm">Light</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 mr-2" />
                  <span className="text-sm">Dark</span>
                </>
              )}
            </button>

            {/* User button */}
            {isSignedIn ? (
              <div className="flex items-center space-x-2 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                <UserButton 
                  afterSignOutUrl="/" 
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "h-8 w-8",
                      userButtonPopoverCard: "dark:bg-gray-800 dark:border-gray-700"
                    }
                  }} 
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {user?.firstName || 'Profile'}
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/sign-in"
                  className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  className="flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors duration-200"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Daftar
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu buttons */}
          <div className="flex items-center md:hidden space-x-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Search"
            >
              {searchOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors duration-200"
              aria-label="Menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden pb-3"
            >
              <form onSubmit={handleSearch} className="relative px-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari sesuatu..."
                    className="w-full pl-10 pr-4 py-2 rounded-full text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-gray-700 border border-gray-200 dark:border-gray-700"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </form>

              {/* Suggested links for mobile */}
              <div className="mt-2 px-3">
                <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">SUGGESTIONS</h3>
                <div className="grid grid-cols-2 gap-2">
                  {suggestedLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                      onClick={() => setSearchOpen(false)}
                    >
                      <link.icon className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile menu */}
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
                href="/tausyiah"
                className={`flex items-center px-3 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                  isActive('/tausyiah') 
                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-gray-800' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Megaphone className={`h-5 w-5 mr-3 ${isActive('/tausyiah') ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'}`} />
                Tausyiah
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
                      <NewsIcon className="h-4 w-4 mr-3" />
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
                      <GalleryIcon className="h-4 w-4 mr-3" />
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
    </nav>
  )
}

export default Navbar