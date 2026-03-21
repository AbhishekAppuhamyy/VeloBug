import { Link } from 'react-router-dom'
import {
  Zap, Brain, Kanban, CheckSquare,
  ArrowRight, LayoutDashboard, Users, Shield
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
            <Zap size={12} />
            AI-Powered Project Management
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Plan smarter with{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              AI-powered
            </span>{' '}
            task generation
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            VeloBug combines the power of Kanban boards, sprint planning, and AI task generation
            to help your team ship faster. Say goodbye to planning overhead.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/register"
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-8 py-3.5 rounded-xl transition text-lg"
            >
              Start for free
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold px-8 py-3.5 rounded-xl transition text-lg border border-gray-700"
            >
              Sign in
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-12 mt-16">
            {[
              { value: '10x', label: 'Faster planning' },
              { value: '100%', label: 'Free to use' },
              { value: 'AI', label: 'Task generation' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Preview */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#111827] border border-gray-800 rounded-2xl p-4 shadow-2xl">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-800">
              <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
              <div className="flex-1 bg-gray-900 rounded-lg px-4 py-1.5 text-gray-500 text-xs ml-4">
                app.velobug.io/kanban
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3 p-2">
              {[
                { title: 'To Do', color: 'border-gray-500', tasks: ['Set up auth module', 'Design database schema', 'Create API endpoints'] },
                { title: 'In Progress', color: 'border-blue-500', tasks: ['Build Kanban board', 'Integrate AI engine'] },
                { title: 'In Review', color: 'border-yellow-500', tasks: ['User registration flow'] },
                { title: 'Done', color: 'border-green-500', tasks: ['Project setup', 'Docker configuration', 'Laravel Sanctum'] },
              ].map(col => (
                <div key={col.title} className={`border-t-2 ${col.color} pt-3`}>
                  <p className="text-white text-xs font-semibold mb-2">
                    {col.title} <span className="text-gray-500">{col.tasks.length}</span>
                  </p>
                  <div className="space-y-2">
                    {col.tasks.map(task => (
                      <div key={task} className="bg-[#0B0F19] rounded-lg p-2.5 border border-gray-800">
                        <p className="text-gray-300 text-xs">{task}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600"></div>
                          <div className="flex-1 h-1 bg-gray-700 rounded-full">
                            <div className="h-1 bg-indigo-500 rounded-full w-2/3"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything your team needs</h2>
            <p className="text-gray-400 text-lg">Built for developers, by developers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Brain, title: 'AI Task Generation', description: 'Describe your feature in plain English and let AI generate a full task breakdown with priorities and estimates.', color: 'text-purple-400 bg-purple-400/10' },
              { icon: Kanban, title: 'Kanban Boards', description: 'Visualize your workflow with drag-and-drop Kanban boards. Move tasks across columns with ease.', color: 'text-blue-400 bg-blue-400/10' },
              { icon: CheckSquare, title: 'Task Management', description: 'Create tasks, subtasks, set priorities, assign team members, and track progress all in one place.', color: 'text-green-400 bg-green-400/10' },
              { icon: LayoutDashboard, title: 'Sprint Planning', description: 'Plan sprints, track velocity, and manage your backlog with powerful agile tools.', color: 'text-orange-400 bg-orange-400/10' },
              { icon: Users, title: 'Team Collaboration', description: 'Invite team members, assign roles, comment on tasks, and stay in sync with real-time updates.', color: 'text-indigo-400 bg-indigo-400/10' },
              { icon: Shield, title: 'Role-Based Access', description: 'Control who can see and do what with granular role-based permissions across workspaces.', color: 'text-red-400 bg-red-400/10' },
            ].map(feature => (
              <div key={feature.title} className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-indigo-500/30 transition">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}>
                  <feature.icon size={24} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="px-6 py-20 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How VeloBug works</h2>
            <p className="text-gray-400 text-lg">From idea to shipped in minutes</p>
          </div>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Describe your feature', description: 'Type a plain-English description of what you want to build into the AI prompt box.', color: 'from-indigo-500 to-purple-600' },
              { step: '02', title: 'AI generates your tasks', description: 'VeloBug\'s AI engine breaks it down into tasks, subtasks, priorities, and effort estimates automatically.', color: 'from-purple-500 to-pink-600' },
              { step: '03', title: 'Review and import', description: 'Preview the generated tasks, edit if needed, then import them directly into your Kanban board.', color: 'from-blue-500 to-indigo-600' },
              { step: '04', title: 'Ship faster', description: 'Your team picks up tasks, tracks progress, and ships features — all in one place.', color: 'from-green-500 to-teal-600' },
            ].map(step => (
              <div key={step.step} className="flex gap-6 items-start">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                  {step.step}
                </div>
                <div className="flex-1 bg-[#111827] border border-gray-800 rounded-xl p-5">
                  <h3 className="text-white font-semibold text-lg mb-1">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack Section */}
      <section id="stack" className="px-6 py-20 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Built with modern tech</h2>
          <p className="text-gray-400 text-lg mb-12">A powerful, free, and open stack</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'React + Vite', desc: 'Frontend' },
              { name: 'Laravel 12', desc: 'Backend API' },
              { name: 'PostgreSQL', desc: 'Database' },
              { name: 'Tailwind CSS', desc: 'Styling' },
              { name: 'Ollama', desc: 'AI Engine' },
              { name: 'Docker', desc: 'Infrastructure' },
              { name: 'Sanctum', desc: 'Authentication' },
              { name: 'dnd-kit', desc: 'Drag & Drop' },
            ].map(tech => (
              <div key={tech.name} className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-indigo-500/30 transition">
                <p className="text-white font-semibold text-sm">{tech.name}</p>
                <p className="text-gray-500 text-xs mt-1">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 border-t border-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to ship faster?</h2>
          <p className="text-gray-400 text-lg mb-8">
            Join developers who use VeloBug to plan and ship projects with AI.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-10 py-4 rounded-xl transition text-lg"
          >
            Get started for free
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}