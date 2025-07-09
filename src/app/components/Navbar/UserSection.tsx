'use client'

import Link from 'next/link'
import { User, LogIn, UserPlus, LogOut } from 'lucide-react'

interface UserSectionProps {
  isSignedIn: boolean
  user: any
  onLogout: () => void
}

const UserSection = ({ isSignedIn, user, onLogout }: UserSectionProps) => {
  return isSignedIn ? (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-2 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300">
          <User className="h-4 w-4" />
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {user?.username || 'Profile'}
        </span>
      </div>
      <button
        onClick={onLogout}
        className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </button>
    </div>
  ) : (
    <div className="flex items-center space-x-2">
      <Link
        href="/login"
        className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
      >
        <LogIn className="h-4 w-4 mr-2" />
        Login
      </Link>
      <Link
        href="/signup"
        className="flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors duration-200"
      >
        <UserPlus className="h-4 w-4 mr-2" />
        Daftar
      </Link>
    </div>
  )
}

export default UserSection