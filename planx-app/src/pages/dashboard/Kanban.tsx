import { useState, useEffect } from 'react'
import DashboardLayout from '../../layouts/Dashboardlayout'
import { taskApi } from '../../api/tasks'
import { workspaceApi, projectApi } from '../../api/workspace'
import type { Task, Project, Workspace } from '../../types'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Plus, GripVertical, Calendar } from 'lucide-react'
import { cn } from '../../lib/utils'
import toast from 'react-hot-toast'

const columns = [
  { id: 'todo', label: 'To Do', color: 'border-gray-500' },
  { id: 'in_progress', label: 'In Progress', color: 'border-blue-500' },
  { id: 'in_review', label: 'In Review', color: 'border-yellow-500' },
  { id: 'done', label: 'Done', color: 'border-green-500' },
]

const priorityColors = {
  low: 'text-gray-400 bg-gray-400/10',
  medium: 'text-blue-400 bg-blue-400/10',
  high: 'text-orange-400 bg-orange-400/10',
  critical: 'text-red-400 bg-red-400/10',
}

// Draggable Task Card
function TaskCard({ task, overlay = false }: { task: Task; overlay?: boolean }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'bg-[#0B0F19] border border-gray-800 rounded-xl p-3 cursor-grab active:cursor-grabbing',
        isDragging && 'opacity-40',
        overlay && 'shadow-2xl rotate-2 border-indigo-500'
      )}
    >
      <div className="flex items-start gap-2">
        <button
          {...attributes}
          {...listeners}
          className="text-gray-600 hover:text-gray-400 mt-0.5 shrink-0"
        >
          <GripVertical size={14} />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-medium leading-snug">{task.title}</p>
          {task.description && (
            <p className="text-gray-500 text-xs mt-1 line-clamp-2">{task.description}</p>
          )}
          <div className="flex items-center justify-between mt-2">
            <span className={cn(
              'text-xs px-1.5 py-0.5 rounded-full',
              priorityColors[task.priority]
            )}>
              {task.priority}
            </span>
            {task.due_date && (
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <Calendar size={10} />
                {new Date(task.due_date).toLocaleDateString()}
              </span>
            )}
          </div>
          {task.subtasks && task.subtasks.length > 0 && (
            <p className="text-gray-600 text-xs mt-1">
              {task.subtasks.filter(s => s.status === 'done').length}/{task.subtasks.length} subtasks
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// Kanban Column
function KanbanColumn({
  column,
  tasks,
  onAddTask,
}: {
  column: typeof columns[0]
  tasks: Task[]
  onAddTask: (status: string) => void
}) {
  return (
    <div className="flex flex-col w-72 shrink-0">
      {/* Column Header */}
      <div className={cn('flex items-center justify-between mb-3 pb-3 border-b-2', column.color)}>
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold text-sm">{column.label}</span>
          <span className="bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask(column.id)}
          className="text-gray-500 hover:text-white transition"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Task Cards */}
      <SortableContext
        items={tasks.map(t => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-2 min-h-20">
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  )
}

export default function Kanban() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace | null>(null)
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [showAddTask, setShowAddTask] = useState<string | null>(null)
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  )

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

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find(t => t.id === event.active.id)
    if (task) setActiveTask(task)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveTask(null)
    if (!over || !activeProject) return

    const draggedTask = tasks.find(t => t.id === active.id)
    if (!draggedTask) return

    // Check if dropped over a column
    const targetColumn = columns.find(c => c.id === over.id)
    if (targetColumn && draggedTask.status !== targetColumn.id) {
      // Update status
      const updatedTasks = tasks.map(t =>
        t.id === draggedTask.id ? { ...t, status: targetColumn.id as Task['status'] } : t
      )
      setTasks(updatedTasks)
      try {
        await taskApi.update(activeProject.id, draggedTask.id, { status: targetColumn.id })
        toast.success('Task moved!')
      } catch {
        setTasks(tasks) // revert
        toast.error('Failed to move task')
      }
    }

    // Check if dropped over another task
    const targetTask = tasks.find(t => t.id === over.id)
    if (targetTask && targetTask.status !== draggedTask.status) {
      const updatedTasks = tasks.map(t =>
        t.id === draggedTask.id ? { ...t, status: targetTask.status } : t
      )
      setTasks(updatedTasks)
      try {
        await taskApi.update(activeProject.id, draggedTask.id, { status: targetTask.status })
        toast.success('Task moved!')
      } catch {
        setTasks(tasks)
        toast.error('Failed to move task')
      }
    }
  }

  const handleAddTask = async (status: string) => {
    if (!newTaskTitle.trim() || !activeProject) return
    try {
      const res = await taskApi.create(activeProject.id, {
        title: newTaskTitle,
        status,
        priority: 'medium',
      })
      setTasks([...tasks, res.data])
      setNewTaskTitle('')
      setShowAddTask(null)
      toast.success('Task created!')
    } catch {
      toast.error('Failed to create task')
    }
  }

  const getColumnTasks = (status: string) =>
    tasks.filter(t => t.status === status)

  return (
    <DashboardLayout>
      {/* Project Selector */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-gray-400 text-sm">Project:</span>
        <div className="flex gap-2">
          {projects.map(project => (
            <button
              key={project.id}
              onClick={() => setActiveProject(project)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm transition',
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

      {/* Kanban Board */}
      <div className="overflow-x-auto pb-4">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4 min-w-max">
            {columns.map(column => (
              <div key={column.id}>
                <KanbanColumn
                  column={column}
                  tasks={getColumnTasks(column.id)}
                  onAddTask={(status) => setShowAddTask(status)}
                />
                {/* Quick Add Task Form */}
                {showAddTask === column.id && (
                  <div className="mt-2 bg-[#111827] border border-gray-700 rounded-xl p-3">
                    <input
                      type="text"
                      placeholder="Task title..."
                      value={newTaskTitle}
                      onChange={e => setNewTaskTitle(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                      autoFocus
                      onKeyDown={e => e.key === 'Enter' && handleAddTask(column.id)}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddTask(column.id)}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs py-1.5 rounded-lg transition"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => { setShowAddTask(null); setNewTaskTitle('') }}
                        className="flex-1 bg-gray-700 hover:bg-gray-600 text-white text-xs py-1.5 rounded-lg transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Drag Overlay */}
          <DragOverlay>
            {activeTask && <TaskCard task={activeTask} overlay />}
          </DragOverlay>
        </DndContext>
      </div>
    </DashboardLayout>
  )
}