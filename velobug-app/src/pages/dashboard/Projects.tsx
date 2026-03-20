import { useState, useEffect } from 'react'
import DashboardLayout from '../../layouts/Dashboardlayout'
import { workspaceApi, projectApi } from '../../api/workspace'
import type { Workspace, Project } from '../../types'
import { Plus, FolderKanban, Calendar, MoreHorizontal } from 'lucide-react'
import toast from 'react-hot-toast'
import { cn } from '../../lib/utils'

const statusColors = {
  active: 'bg-green-500/10 text-green-400 border-green-500/20',
  on_hold: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  completed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  archived: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
}

export default function Projects() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace | null>(null)
  const [showCreateWorkspace, setShowCreateWorkspace] = useState(false)
  const [showCreateProject, setShowCreateProject] = useState(false)
  const [workspaceName, setWorkspaceName] = useState('')
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWorkspaces()
  }, [])

  useEffect(() => {
    if (activeWorkspace) fetchProjects(activeWorkspace.id)
  }, [activeWorkspace])

  const fetchWorkspaces = async () => {
    try {
      const res = await workspaceApi.getAll()
      setWorkspaces(res.data)
      if (res.data.length > 0) setActiveWorkspace(res.data[0])
    } catch {
      toast.error('Failed to load workspaces')
    } finally {
      setLoading(false)
    }
  }

  const fetchProjects = async (workspaceId: number) => {
    try {
      const res = await projectApi.getAll(workspaceId)
      setProjects(res.data)
    } catch {
      toast.error('Failed to load projects')
    }
  }

  const handleCreateWorkspace = async () => {
    if (!workspaceName.trim()) return
    try {
      const res = await workspaceApi.create({ name: workspaceName })
      setWorkspaces([...workspaces, res.data])
      setActiveWorkspace(res.data)
      setWorkspaceName('')
      setShowCreateWorkspace(false)
      toast.success('Workspace created!')
    } catch {
      toast.error('Failed to create workspace')
    }
  }

  const handleCreateProject = async () => {
    if (!projectName.trim() || !activeWorkspace) return
    try {
      const res = await projectApi.create(activeWorkspace.id, {
        name: projectName,
        description: projectDescription,
      })
      setProjects([...projects, res.data])
      setProjectName('')
      setProjectDescription('')
      setShowCreateProject(false)
      toast.success('Project created!')
    } catch {
      toast.error('Failed to create project')
    }
  }

  return (
    <DashboardLayout>
      <div className="flex gap-6 h-full">

        {/* Workspaces Sidebar */}
        <div className="w-64 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold">Workspaces</h2>
            <button
              onClick={() => setShowCreateWorkspace(true)}
              className="text-gray-400 hover:text-white transition"
            >
              <Plus size={18} />
            </button>
          </div>

          {/* Create Workspace Form */}
          {showCreateWorkspace && (
            <div className="bg-[#111827] border border-gray-700 rounded-lg p-3 mb-3">
              <input
                type="text"
                placeholder="Workspace name"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                onKeyDown={(e) => e.key === 'Enter' && handleCreateWorkspace()}
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={handleCreateWorkspace}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs py-1.5 rounded-lg transition"
                >
                  Create
                </button>
                <button
                  onClick={() => setShowCreateWorkspace(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white text-xs py-1.5 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Workspace List */}
          <div className="space-y-1">
            {loading ? (
              <p className="text-gray-500 text-sm">Loading...</p>
            ) : workspaces.length === 0 ? (
              <p className="text-gray-500 text-sm">No workspaces yet</p>
            ) : (
              workspaces.map((ws) => (
                <button
                  key={ws.id}
                  onClick={() => setActiveWorkspace(ws)}
                  className={cn(
                    'w-full text-left px-3 py-2.5 rounded-lg text-sm transition',
                    activeWorkspace?.id === ws.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  )}
                >
                  {ws.name}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Projects Area */}
        <div className="flex-1">
          {activeWorkspace ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-white text-xl font-bold">{activeWorkspace.name}</h2>
                  <p className="text-gray-400 text-sm mt-0.5">
                    {projects.length} project{projects.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <button
                  onClick={() => setShowCreateProject(true)}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  <Plus size={16} />
                  New Project
                </button>
              </div>

              {/* Create Project Form */}
              {showCreateProject && (
                <div className="bg-[#111827] border border-gray-700 rounded-xl p-4 mb-6">
                  <h3 className="text-white font-medium mb-3">New Project</h3>
                  <input
                    type="text"
                    placeholder="Project name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                    autoFocus
                  />
                  <textarea
                    placeholder="Description (optional)"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3 resize-none"
                    rows={2}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleCreateProject}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition"
                    >
                      Create Project
                    </button>
                    <button
                      onClick={() => setShowCreateProject(false)}
                      className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded-lg transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Projects Grid */}
              {projects.length === 0 ? (
                <div className="text-center py-20">
                  <FolderKanban size={48} className="text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 font-medium">No projects yet</p>
                  <p className="text-gray-600 text-sm mt-1">Create your first project to get started</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-[#111827] border border-gray-800 rounded-xl p-5 hover:border-indigo-500/50 transition cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                          <FolderKanban size={18} className="text-white" />
                        </div>
                        <button className="text-gray-600 hover:text-gray-400 opacity-0 group-hover:opacity-100 transition">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                      <h3 className="text-white font-semibold mb-1">{project.name}</h3>
                      {project.description && (
                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>
                      )}
                      <div className="flex items-center justify-between mt-3">
                        <span className={cn(
                          'text-xs px-2 py-1 rounded-full border',
                          statusColors[project.status]
                        )}>
                          {project.status.replace('_', ' ')}
                        </span>
                        {project.deadline && (
                          <span className="text-gray-500 text-xs flex items-center gap-1">
                            <Calendar size={12} />
                            {new Date(project.deadline).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400">Create a workspace to get started</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}