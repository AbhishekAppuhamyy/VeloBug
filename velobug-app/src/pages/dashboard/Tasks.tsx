import { useState, useEffect } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { taskApi } from '../../api/tasks'
import { workspaceApi, projectApi } from '../../api/workspace'
import type { Task, Project, Workspace } from '../../types'
import {
  Plus, CheckSquare, AlertCircle,
  Clock, ChevronDown, ChevronRight, Calendar
} from 'lucide-react'
import { cn } from '../../lib/utils'
import toast from 'react-hot-toast'

const priorityColors = {
  low: 'text-gray-400 bg-gray-400/10 border-gray-400/20',
  medium: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  high: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  critical: 'text-red-400 bg-red-400/10 border-red-400/20',
}

const statusColors = {
  todo: 'text-gray-400 bg-gray-400/10',
  in_progress: 'text-blue-400 bg-blue-400/10',
  in_review: 'text-yellow-400 bg-yellow-400/10',
  done: 'text-green-400 bg-green-400/10',
}

const priorityIcons = {
  low: '↓',
  medium: '→',
  high: '↑',
  critical: '‼',
}

export default function Tasks() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace | null>(null)
  const [showCreateTask, setShowCreateTask] = useState(false)
  const [expandedTasks, setExpandedTasks] = useState<number[]>([])
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    due_date: '',
  })

  useEffect(() => { fetchWorkspaces() }, [])
  useEffect(() => {
    if (activeWorkspace) fetchProjects(activeWorkspace.id)
  }, [activeWorkspace])
  useEffect(() => {
    if (activeProject) fetchTasks(activeProject.id)
  }, [activeProject])

  const fetchWorkspaces = async () => {
    try {
      const res = await workspaceApi.getAll()
      setWorkspaces(res.data)
      if (res.data.length > 0) setActiveWorkspace(res.data[0])
    } catch {
      toast.error('Failed to load workspaces')
    }
  }

  const fetchProjects = async (workspaceId: number) => {
    try {
      const res = await projectApi.getAll(workspaceId)
      setProjects(res.data)
      if (res.data.length > 0) setActiveProject(res.data[0])
    } catch {
      toast.error('Failed to load projects')
    }
  }

  const fetchTasks = async (projectId: number) => {
    try {
      const res = await taskApi.getAll(projectId)
      setTasks(res.data)
    } catch {
      toast.error('Failed to load tasks')
    }
  }

  const handleCreateTask = async () => {
    if (!newTask.title.trim() || !activeProject) return
    try {
      const res = await taskApi.create(activeProject.id, {
        ...newTask,
        due_date: newTask.due_date || undefined,
      })
      setTasks([...tasks, res.data])
      setNewTask({ title: '', description: '', priority: 'medium', status: 'todo', due_date: '' })
      setShowCreateTask(false)
      toast.success('Task created!')
    } catch {
      toast.error('Failed to create task')
    }
  }

  const handleStatusChange = async (task: Task, status: string) => {
    try {
      const res = await taskApi.update(task.project_id, task.id, { status })
      setTasks(tasks.map(t => t.id === task.id ? { ...t, ...res.data } : t))
    } catch {
      toast.error('Failed to update task')
    }
  }

  const toggleExpand = (taskId: number) => {
    setExpandedTasks(prev =>
      prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
    )
  }

  const todoTasks = tasks.filter(t => t.status === 'todo')
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress')
  const inReviewTasks = tasks.filter(t => t.status === 'in_review')
  const doneTasks = tasks.filter(t => t.status === 'done')

  return (
    <DashboardLayout>
      <div className="flex gap-6">

        {/* Left Panel — Project Selector */}
        <div className="w-56 shrink-0">
          <h2 className="text-white font-semibold mb-3">Projects</h2>
          <div className="space-y-1">
            {projects.map(project => (
              <button
                key={project.id}
                onClick={() => setActiveProject(project)}
                className={cn(
                  'w-full text-left px-3 py-2 rounded-lg text-sm transition',
                  activeProject?.id === project.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                )}
              >
                {project.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Tasks Area */}
        <div className="flex-1">
          {activeProject ? (
            <>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-white text-xl font-bold">{activeProject.name}</h2>
                  <p className="text-gray-400 text-sm mt-0.5">{tasks.length} tasks total</p>
                </div>
                <button
                  onClick={() => setShowCreateTask(true)}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  <Plus size={16} />
                  New Task
                </button>
              </div>

              {/* Create Task Form */}
              {showCreateTask && (
                <div className="bg-[#111827] border border-gray-700 rounded-xl p-4 mb-6">
                  <h3 className="text-white font-medium mb-3">New Task</h3>
                  <input
                    type="text"
                    placeholder="Task title"
                    value={newTask.title}
                    onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                    autoFocus
                  />
                  <textarea
                    placeholder="Description (optional)"
                    value={newTask.description}
                    onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2 resize-none"
                    rows={2}
                  />
                  <div className="flex gap-2 mb-3">
                    <select
                      value={newTask.priority}
                      onChange={e => setNewTask({ ...newTask, priority: e.target.value })}
                      className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                    <select
                      value={newTask.status}
                      onChange={e => setNewTask({ ...newTask, status: e.target.value })}
                      className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="todo">To Do</option>
                      <option value="in_progress">In Progress</option>
                      <option value="in_review">In Review</option>
                      <option value="done">Done</option>
                    </select>
                    <input
                      type="date"
                      value={newTask.due_date}
                      onChange={e => setNewTask({ ...newTask, due_date: e.target.value })}
                      className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCreateTask}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition"
                    >
                      Create Task
                    </button>
                    <button
                      onClick={() => setShowCreateTask(false)}
                      className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded-lg transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Task Stats */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                {[
                  { label: 'To Do', count: todoTasks.length, color: 'text-gray-400', icon: CheckSquare },
                  { label: 'In Progress', count: inProgressTasks.length, color: 'text-blue-400', icon: Clock },
                  { label: 'In Review', count: inReviewTasks.length, color: 'text-yellow-400', icon: AlertCircle },
                  { label: 'Done', count: doneTasks.length, color: 'text-green-400', icon: CheckSquare },
                ].map(stat => (
                  <div key={stat.label} className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <stat.icon size={16} className={stat.color} />
                      <span className="text-gray-400 text-xs">{stat.label}</span>
                    </div>
                    <p className={cn('text-2xl font-bold', stat.color)}>{stat.count}</p>
                  </div>
                ))}
              </div>

              {/* Task List */}
              {tasks.length === 0 ? (
                <div className="text-center py-20">
                  <CheckSquare size={48} className="text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 font-medium">No tasks yet</p>
                  <p className="text-gray-600 text-sm mt-1">Create your first task to get started</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {tasks.map(task => (
                    <div key={task.id}>
                      <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition">
                        <div className="flex items-start gap-3">

                          {/* Expand button for subtasks */}
                          {task.subtasks && task.subtasks.length > 0 && (
                            <button
                              onClick={() => toggleExpand(task.id)}
                              className="text-gray-500 hover:text-white mt-0.5 transition"
                            >
                              {expandedTasks.includes(task.id)
                                ? <ChevronDown size={16} />
                                : <ChevronRight size={16} />
                              }
                            </button>
                          )}

                          {/* Status dropdown */}
                          <select
                            value={task.status}
                            onChange={e => handleStatusChange(task, e.target.value)}
                            className="bg-gray-900 border border-gray-700 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 shrink-0"
                          >
                            <option value="todo">To Do</option>
                            <option value="in_progress">In Progress</option>
                            <option value="in_review">In Review</option>
                            <option value="done">Done</option>
                          </select>

                          {/* Task content */}
                          <div className="flex-1 min-w-0">
                            <p className={cn(
                              'text-white font-medium',
                              task.status === 'done' && 'line-through text-gray-500'
                            )}>
                              {task.title}
                            </p>
                            {task.description && (
                              <p className="text-gray-500 text-sm mt-0.5 truncate">{task.description}</p>
                            )}
                          </div>

                          {/* Meta */}
                          <div className="flex items-center gap-2 shrink-0">
                            {task.due_date && (
                              <span className="text-gray-500 text-xs flex items-center gap-1">
                                <Calendar size={12} />
                                {new Date(task.due_date).toLocaleDateString()}
                              </span>
                            )}
                            <span className={cn(
                              'text-xs px-2 py-0.5 rounded-full border',
                              priorityColors[task.priority]
                            )}>
                              {priorityIcons[task.priority]} {task.priority}
                            </span>
                            <span className={cn(
                              'text-xs px-2 py-0.5 rounded-full',
                              statusColors[task.status]
                            )}>
                              {task.status.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Subtasks */}
                      {expandedTasks.includes(task.id) && task.subtasks && (
                        <div className="ml-8 mt-1 space-y-1">
                          {task.subtasks.map(subtask => (
                            <div key={subtask.id} className="bg-[#0d1420] border border-gray-800 rounded-lg p-3 flex items-center gap-3">
                              <select
                                value={subtask.status}
                                onChange={e => handleStatusChange(subtask, e.target.value)}
                                className="bg-gray-900 border border-gray-700 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 shrink-0"
                              >
                                <option value="todo">To Do</option>
                                <option value="in_progress">In Progress</option>
                                <option value="in_review">In Review</option>
                                <option value="done">Done</option>
                              </select>
                              <span className={cn(
                                'text-sm text-white',
                                subtask.status === 'done' && 'line-through text-gray-500'
                              )}>
                                {subtask.title}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400">Select a project to view tasks</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}