export interface User {
  id: number
  name: string
  email: string
}

export interface Workspace {
  id: number
  name: string
  slug: string
  description?: string
  owner_id: number
  created_at: string
}

export interface Project {
  id: number
  workspace_id: number
  owner_id: number
  name: string
  description?: string
  status: 'active' | 'on_hold' | 'completed' | 'archived'
  deadline?: string
  created_at: string
}

export interface Task {
  id: number
  project_id: number
  workspace_id: number
  parent_id?: number
  assignee_id?: number
  created_by: number
  title: string
  description?: string
  status: 'todo' | 'in_progress' | 'in_review' | 'done'
  priority: 'low' | 'medium' | 'high' | 'critical'
  due_date?: string
  story_points?: number
  order: number
  assignee?: User
  subtasks?: Task[]
  created_at: string
}