import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

interface ThemeToggleProps {
  mobile?: boolean
}

const ThemeToggle = ({ mobile = false }: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme()

  return mobile ? (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  ) : (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
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
  )
}

export default ThemeToggle