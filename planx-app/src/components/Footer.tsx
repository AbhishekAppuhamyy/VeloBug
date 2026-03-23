import { Link } from 'react-router-dom'
import { Github, Twitter, Globe } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div>
            <span className="text-xl font-bold text-white">
              Velo<span className="text-indigo-500">Bug</span>
            </span>
            <p className="text-gray-500 text-xs mt-1">AI-Powered Project Management</p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a href="#features" className="text-gray-400 hover:text-white text-sm transition">Features</a>
            <a href="#how-it-works" className="text-gray-400 hover:text-white text-sm transition">How it works</a>
            <Link to="/login" className="text-gray-400 hover:text-white text-sm transition">Login</Link>
            <Link to="/register" className="text-gray-400 hover:text-white text-sm transition">Register</Link>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a href="#" className="text-gray-500 hover:text-white transition p-2 rounded-lg hover:bg-gray-800">
              <Github size={18} />
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition p-2 rounded-lg hover:bg-gray-800">
              <Twitter size={18} />
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition p-2 rounded-lg hover:bg-gray-800">
              <Globe size={18} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} VeloBug. All rights reserved. Built by{' '}
            <span className="text-indigo-400 font-medium">Abhishek Appuhamy</span>
          </p>
        </div>
      </div>
    </footer>
  )
}