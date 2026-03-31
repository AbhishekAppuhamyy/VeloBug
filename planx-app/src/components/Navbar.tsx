import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-900 bg-[#0A0A0A]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-white">
          Velo<span className="text-red-500">Bug</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-400 hover:text-red-300 text-sm transition">Features</a>
          <a href="#how-it-works" className="text-gray-400 hover:text-red-300 text-sm transition">How it works</a>
          <a href="#stack" className="text-gray-400 hover:text-red-300 text-sm transition">Stack</a>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-gray-400 hover:text-red-300 text-sm transition">
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