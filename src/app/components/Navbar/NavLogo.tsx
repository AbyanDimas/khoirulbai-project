import Link from 'next/link'
import { Home } from 'lucide-react'

const NavLogo = () => (
  <div className="flex items-center">
    <Link href="/" className="flex items-center group">
      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-emerald-600 text-white mr-3 group-hover:bg-emerald-700 transition-colors duration-200">
        <Home className="h-5 w-5" />
      </div>
      <div>
        <h1 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">Masjid Khoirul Ba'i</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">SMKN 1 Adiwerna</p>
      </div>
    </Link>
  </div>
)

export default NavLogo