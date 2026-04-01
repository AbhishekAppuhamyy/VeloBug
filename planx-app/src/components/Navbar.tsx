import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'

export default function Navbar() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  })

  useEffect(() => {
    const isDark = theme === 'dark'
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.style.colorScheme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-red-950/20 bg-white/80 backdrop-blur-md dark:border-gray-900 dark:bg-[#0A0A0A]/80">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
          Plan<span className="text-red-500">X</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-600 hover:text-red-500 text-sm transition dark:text-gray-400 dark:hover:text-red-300">Features</a>
          <a href="#how-it-works" className="text-gray-600 hover:text-red-500 text-sm transition dark:text-gray-400 dark:hover:text-red-300">How it works</a>
          <a href="#stack" className="text-gray-600 hover:text-red-500 text-sm transition dark:text-gray-400 dark:hover:text-red-300">Stack</a>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-red-500/20 text-red-600 hover:bg-red-500/10 transition dark:text-red-300"
            aria-label="Toggle theme"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Link to="/login" className="text-gray-600 hover:text-red-500 text-sm transition dark:text-gray-400 dark:hover:text-red-300">
            Sign in
          </Link>
          <Link
            to="/register"
            className="bg-linear-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  )
}