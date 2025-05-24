import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { LogIn, UserPlus } from 'lucide-react'

interface UserSectionProps {
  isSignedIn: boolean
  user: any
}

const UserSection = ({ isSignedIn, user }: UserSectionProps) => {
  return isSignedIn ? (
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
  )
}

export default UserSection