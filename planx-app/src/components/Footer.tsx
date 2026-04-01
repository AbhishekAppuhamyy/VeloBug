import { Link } from 'react-router-dom'
import { Github, Twitter, Globe } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 px-6 py-10 bg-white dark:border-gray-900 dark:bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Velo<span className="text-red-500">Bug</span>
            </span>
            <p className="text-gray-600 text-xs mt-1 dark:text-gray-500">AI-Powered Project Management</p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a href="#features" className="text-gray-600 hover:text-red-500 text-sm transition dark:text-gray-400 dark:hover:text-red-300">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-red-500 text-sm transition dark:text-gray-400 dark:hover:text-red-300">How it works</a>
            <Link to="/login" className="text-gray-600 hover:text-red-500 text-sm transition dark:text-gray-400 dark:hover:text-red-300">Login</Link>
            <Link to="/register" className="text-gray-600 hover:text-red-500 text-sm transition dark:text-gray-400 dark:hover:text-red-300">Register</Link>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a href="#" className="text-gray-500 hover:text-red-500 transition p-2 rounded-lg border border-transparent hover:border-red-500/20 hover:bg-red-500/10 dark:hover:text-red-300">
              <Github size={18} />
            </a>
            <a href="#" className="text-gray-500 hover:text-red-500 transition p-2 rounded-lg border border-transparent hover:border-red-500/20 hover:bg-red-500/10 dark:hover:text-red-300">
              <Twitter size={18} />
            </a>
            <a href="#" className="text-gray-500 hover:text-red-500 transition p-2 rounded-lg border border-transparent hover:border-red-500/20 hover:bg-red-500/10 dark:hover:text-red-300">
              <Globe size={18} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center dark:border-gray-800">
          <p className="text-gray-600 text-sm dark:text-gray-500">
            © {new Date().getFullYear()} VeloBug. All rights reserved. Built by{' '}
            <span className="text-red-400 font-medium">Abhishek Appuhamy</span>
          </p>
        </div>
      </div>
    </footer>
  )
}