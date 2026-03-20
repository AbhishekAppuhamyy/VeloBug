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