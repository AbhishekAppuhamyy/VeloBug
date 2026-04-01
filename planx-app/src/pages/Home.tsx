import { Link } from 'react-router-dom'
import {
  Zap, Brain, Kanban, CheckSquare,
  ArrowRight, LayoutDashboard, Users, Shield
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 dark:bg-[#0A0A0A] dark:text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-150 h-150 rounded-full bg-red-700/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 rounded-full bg-red-900/10 blur-[100px]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/25 text-red-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 tracking-wider uppercase">
            <Zap size={11} />
            AI-Powered Project Management
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.05] tracking-tight">
            Plan smarter with{' '}
            <span
              className="relative"
              style={{
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 40%, #ff6b6b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              AI-powered
            </span>{' '}
            task generation
          </h1>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light dark:text-gray-400">
            VeloBug combines the power of Kanban boards, sprint planning, and AI task generation
            to help your team ship faster. Say goodbye to planning overhead.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/register"
              className="group flex items-center gap-2 text-white font-bold px-8 py-3.5 rounded-xl transition-all text-lg relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                boxShadow: '0 0 30px rgba(220,38,38,0.35), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Start for free
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-2 text-gray-700 hover:text-red-500 font-semibold px-8 py-3.5 rounded-xl transition-all text-lg border border-gray-300 hover:border-red-500/50 bg-white/70 hover:bg-red-500/5 dark:text-gray-300 dark:hover:text-white dark:border-gray-700 dark:bg-white/2"
            >
              Sign in
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-12 mt-16 flex-wrap">
            {[
              { value: '10x', label: 'Faster planning' },
              { value: '100%', label: 'Free to use' },
              { value: 'AI', label: 'Task generation' },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center relative">
                {i > 0 && (
                  <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-px h-8 bg-gray-300 hidden md:block dark:bg-gray-800" />
                )}
                <p
                  className="text-3xl font-black"
                  style={{
                    background: 'linear-gradient(135deg, #f87171 0%, #dc2626 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {stat.value}
                </p>
                <p className="text-gray-500 text-sm mt-1 tracking-wide dark:text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Preview */}
      <section className="relative px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div
            className="rounded-2xl p-4 shadow-2xl bg-white border border-red-500/20 dark:bg-[#111111]"
            style={{
              boxShadow: '0 0 60px rgba(220,38,38,0.08), 0 40px 80px rgba(0,0,0,0.6)',
            }}
          >
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200 dark:border-gray-900">
              <div className="w-3 h-3 rounded-full bg-red-600/80"></div>
              <div className="w-3 h-3 rounded-full bg-gray-600/80"></div>
              <div className="w-3 h-3 rounded-full bg-gray-700/80"></div>
              <div className="flex-1 bg-white rounded-lg px-4 py-1.5 text-gray-500 text-xs ml-4 border border-gray-300 dark:bg-black/60 dark:text-gray-600 dark:border-gray-800">
                app.velobug.io/kanban
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3 p-2">
              {[
                { title: 'To Do', borderColor: 'border-gray-600', tasks: ['Set up auth module', 'Design database schema', 'Create API endpoints'] },
                { title: 'In Progress', borderColor: 'border-red-600', tasks: ['Build Kanban board', 'Integrate AI engine'] },
                { title: 'In Review', borderColor: 'border-orange-700', tasks: ['User registration flow'] },
                { title: 'Done', borderColor: 'border-green-700', tasks: ['Project setup', 'Docker configuration', 'Laravel Sanctum'] },
              ].map(col => (
                <div key={col.title} className={`border-t-2 ${col.borderColor} pt-3`}>
                  <p className="text-gray-900 text-xs font-bold mb-2 tracking-wide dark:text-white">
                    {col.title} <span className="text-gray-500 dark:text-gray-600">{col.tasks.length}</span>
                  </p>
                  <div className="space-y-2">
                    {col.tasks.map(task => (
                      <div
                        key={task}
                        className="rounded-lg p-2.5 bg-gray-50 border border-gray-200 dark:bg-[#0D0D0D] dark:border-white/5"
                      >
                        <p className="text-gray-600 text-xs dark:text-gray-400">{task}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <div className="w-4 h-4 rounded-full" style={{ background: 'linear-gradient(135deg, #dc2626, #7f1d1d)' }}></div>
                          <div className="flex-1 h-1 bg-gray-300 rounded-full dark:bg-gray-800">
                            <div className="h-1 rounded-full w-2/3" style={{ background: 'linear-gradient(90deg, #dc2626, #ef4444)' }}></div>
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
      <section id="features" className="relative px-6 py-20 border-t border-gray-200 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 tracking-tight">Everything your team needs</h2>
            <p className="text-gray-600 text-lg dark:text-gray-500">Built for developers, by developers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: Brain, title: 'AI Task Generation', description: 'Describe your feature in plain English and let AI generate a full task breakdown with priorities and estimates.', accent: 'text-red-400 bg-red-500/10 border-red-500/20' },
              { icon: Kanban, title: 'Kanban Boards', description: 'Visualize your workflow with drag-and-drop Kanban boards. Move tasks across columns with ease.', accent: 'text-orange-400 bg-orange-500/10 border-orange-500/20' },
              { icon: CheckSquare, title: 'Task Management', description: 'Create tasks, subtasks, set priorities, assign team members, and track progress all in one place.', accent: 'text-red-300 bg-red-400/10 border-red-400/20' },
              { icon: LayoutDashboard, title: 'Sprint Planning', description: 'Plan sprints, track velocity, and manage your backlog with powerful agile tools.', accent: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
              { icon: Users, title: 'Team Collaboration', description: 'Invite team members, assign roles, comment on tasks, and stay in sync with real-time updates.', accent: 'text-red-400 bg-red-500/10 border-red-500/20' },
              { icon: Shield, title: 'Role-Based Access', description: 'Control who can see and do what with granular role-based permissions across workspaces.', accent: 'text-orange-300 bg-orange-500/10 border-orange-500/20' },
            ].map(feature => (
              <div
                key={feature.title}
                className="group rounded-2xl p-6 transition-all duration-300 cursor-default bg-white border border-gray-200 hover:border-red-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.06)] dark:bg-[#111111] dark:border-white/5 dark:hover:border-red-500/25"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 border ${feature.accent}`}>
                  <feature.icon size={20} />
                </div>
                <h3 className="text-gray-900 font-bold text-lg mb-2 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed dark:text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="relative px-6 py-20 border-t border-gray-200 dark:border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 tracking-tight">How VeloBug works</h2>
            <p className="text-gray-600 text-lg dark:text-gray-500">From idea to shipped in minutes</p>
          </div>
          <div className="space-y-5">
            {[
              { step: '01', title: 'Describe your feature', description: 'Type a plain-English description of what you want to build into the AI prompt box.', gradient: 'linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)' },
              { step: '02', title: 'AI generates your tasks', description: "VeloBug's AI engine breaks it down into tasks, subtasks, priorities, and effort estimates automatically.", gradient: 'linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)' },
              { step: '03', title: 'Review and import', description: 'Preview the generated tasks, edit if needed, then import them directly into your Kanban board.', gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' },
              { step: '04', title: 'Ship faster', description: 'Your team picks up tasks, tracks progress, and ships features — all in one place.', gradient: 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)' },
            ].map(step => (
              <div key={step.step} className="flex gap-5 items-start group">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0"
                  style={{ background: step.gradient, boxShadow: '0 4px 20px rgba(220,38,38,0.25)' }}
                >
                  {step.step}
                </div>
                <div
                  className="flex-1 rounded-xl p-5 transition-all duration-300 bg-white border border-gray-200 hover:border-red-300 dark:bg-[#111111] dark:border-white/5 dark:hover:border-red-500/20"
                >
                  <h3 className="text-gray-900 font-bold text-lg mb-1 dark:text-white">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed dark:text-gray-500">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack Section */}
      <section id="stack" className="relative px-6 py-20 border-t border-gray-200 dark:border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-4 tracking-tight">Built with modern tech</h2>
          <p className="text-gray-600 text-lg mb-12 dark:text-gray-500">A powerful, free, and open stack</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
              <div
                key={tech.name}
                className="rounded-xl p-4 transition-all duration-300 cursor-default bg-white border border-gray-200 hover:border-red-300 hover:bg-red-50/40 dark:bg-[#111111] dark:border-white/5 dark:hover:border-red-500/25 dark:hover:bg-red-500/4"
              >
                <p className="text-gray-900 font-bold text-sm dark:text-white">{tech.name}</p>
                <p className="text-gray-500 text-xs mt-1 dark:text-gray-600">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-20 border-t border-gray-200 dark:border-white/5">
        {/* Glow behind CTA */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-150 h-50 rounded-full bg-red-700/10 blur-[80px]" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative">
          <h2 className="text-4xl font-black mb-4 tracking-tight">Ready to ship faster?</h2>
          <p className="text-gray-600 text-lg mb-8 dark:text-gray-500">
            Join developers who use VeloBug to plan and ship projects with AI.
          </p>
          <Link
            to="/register"
            className="group inline-flex items-center gap-2 text-white font-bold px-10 py-4 rounded-xl transition-all text-lg relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
              boxShadow: '0 0 40px rgba(220,38,38,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Get started for free
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}