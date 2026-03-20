import { useState } from 'react'
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
  const location = useLocation()
  const navigate = useNavigate()
  const { user, clearUser } = useAuthStore()

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
    <div className="min-h-screen bg-[#0B0F19] flex">

      {/* Sidebar */}
      <aside className={cn(
        'fixed top-0 left-0 h-full bg-[#111827] border-r border-gray-800 flex flex-col transition-all duration-300 z-50',
        sidebarOpen ? 'w-64' : 'w-16'
      )}>

        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          {sidebarOpen && (
            <span className="text-xl font-bold text-white">
              Velo<span className="text-indigo-500">Bug</span>
            </span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white transition p-1 rounded-lg hover:bg-gray-700"
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
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                )}
              >
                <item.icon size={20} className="shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* User + Logout */}
        <div className="p-3 border-t border-gray-800">
          {sidebarOpen && (
            <div className="px-3 py-2 mb-2">
              <p className="text-white text-sm font-medium truncate">{user?.name}</p>
              <p className="text-gray-500 text-xs truncate">{user?.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-700 w-full"
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
        <header className="h-16 bg-[#111827] border-b border-gray-800 flex items-center justify-between px-6 sticky top-0 z-40">
          <h1 className="text-white font-semibold text-lg capitalize">
            {location.pathname.replace('/', '')}
          </h1>
          <div className="flex items-center gap-3">
            <button className="text-gray-400 hover:text-white transition p-2 rounded-lg hover:bg-gray-700 relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
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