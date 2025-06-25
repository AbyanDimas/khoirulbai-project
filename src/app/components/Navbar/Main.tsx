'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { UserButton, useUser } from '@clerk/nextjs'
import NavLogo from './NavLogo'
import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'
import MobileSearch from './MobileSearch'
import SearchButton from './SearchButton'
import ThemeToggle from './ThemeToggle'
import UserSection from './UserSection'
import { X, Search } from 'lucide-react'

const Navbar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState({
    jadwal: false,
    lainnya: false
  })
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { theme } = useTheme()
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
    setSearchQuery('')
    setSearchOpen(false)
  }

  if (!mounted) return null

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <NavLogo />
          
          <DesktopMenu 
            pathname={pathname}
            dropdownOpen={dropdownOpen}
            toggleDropdown={toggleDropdown}
          />

          <div className="hidden md:flex items-center space-x-4">
            <SearchButton 
              searchOpen={searchOpen}
              setSearchOpen={setSearchOpen}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
            />
            
            <ThemeToggle />
            
            <UserSection isSignedIn={isSignedIn ?? false} user={user} />
          </div>

          <div className="flex items-center md:hidden ">
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

            <ThemeToggle mobile />
            
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

        <MobileSearch 
          searchOpen={searchOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          setSearchOpen={setSearchOpen}
        />
      </div>

      <MobileMenu 
        isOpen={isOpen}
        pathname={pathname}
        dropdownOpen={dropdownOpen}
        toggleDropdown={toggleDropdown}
        setIsOpen={setIsOpen}
        isSignedIn={isSignedIn ?? false}
        user={user}
      />
    </nav>
  )
}

export default Navbar