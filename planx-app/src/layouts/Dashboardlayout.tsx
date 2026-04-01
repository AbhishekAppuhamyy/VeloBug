import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Kanban,
  Moon,
  Sun,
} from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { authApi } from '../api/auth'
import { cn } from '../lib/utils'
import toast from 'react-hot-toast'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Projects', icon: FolderKanban, path: '/projects' },
  { label: 'My Tasks', icon: CheckSquare, path: '/tasks' },
  { label: 'Kanban', icon: Kanban, path: '/kanban' },
  { label: 'Team', icon: Users, path: '/team' },
  { label: 'Settings', icon: Settings, path: '/settings' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  })
  const location = useLocation()
  const navigate = useNavigate()
  const { user, clearUser } = useAuthStore()

  useEffect(() => {
    const isDark = theme === 'dark'
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.style.colorScheme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  const handleLogout = async () => {
    try {
      await authApi.logout()
      clearUser()
      toast.success('Logged out successfully')
      navigate('/login')
    } catch {
      clearUser()
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0A0A] flex">

      {/* Sidebar */}
      <aside className={cn(
        'fixed top-0 left-0 h-full bg-white border-r border-gray-200 dark:bg-[#111111] dark:border-gray-900 flex flex-col transition-all duration-300 z-50',
        sidebarOpen ? 'w-64' : 'w-16'
      )}>

        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-900">
          {sidebarOpen && (
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Velo<span className="text-red-500">Bug</span>
            </span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 hover:text-red-500 transition p-1 rounded-lg hover:bg-red-500/10 dark:text-gray-400 dark:hover:text-red-300"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition text-sm font-medium',
                  isActive
                    ? 'bg-red-600 text-white'
                    : 'text-gray-600 hover:text-red-500 hover:bg-red-500/10 dark:text-gray-400 dark:hover:text-red-300 dark:hover:bg-red-500/10'
                )}
              >
                <item.icon size={20} className="shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* User + Logout */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-900">
          {sidebarOpen && (
            <div className="px-3 py-2 mb-2">
              <p className="text-gray-900 text-sm font-medium truncate dark:text-white">{user?.name}</p>
              <p className="text-gray-500 text-xs truncate dark:text-gray-500">{user?.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition text-sm font-medium text-gray-600 hover:text-red-500 hover:bg-red-500/10 w-full dark:text-gray-400 dark:hover:text-red-300"
          >
            <LogOut size={20} className="shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn(
        'flex-1 flex flex-col transition-all duration-300',
        sidebarOpen ? 'ml-64' : 'ml-16'
      )}>

        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 dark:bg-[#111111] dark:border-gray-900 flex items-center justify-between px-6 sticky top-0 z-40">
          <h1 className="text-gray-900 font-semibold text-lg capitalize dark:text-white">
            {location.pathname.replace('/', '')}
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-red-500/20 text-red-600 hover:bg-red-500/10 transition dark:text-red-300"
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button className="text-gray-500 hover:text-red-500 transition p-2 rounded-lg hover:bg-red-500/10 relative dark:text-gray-400 dark:hover:text-red-300">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-sm font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>

      </div>
    </div>
  )
}