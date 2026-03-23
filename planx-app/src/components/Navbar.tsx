import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 bg-[#0B0F19]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-white">
          Velo<span className="text-indigo-500">Bug</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-400 hover:text-white text-sm transition">Features</a>
          <a href="#how-it-works" className="text-gray-400 hover:text-white text-sm transition">How it works</a>
          <a href="#stack" className="text-gray-400 hover:text-white text-sm transition">Stack</a>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-gray-400 hover:text-white text-sm transition">
            Sign in
          </Link>
          <Link
            to="/register"
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  )
}