import api from './axios'

export const taskApi = {
  getAll: (projectId: number) =>
    api.get(`/api/projects/${projectId}/tasks`),

  create: (projectId: number, data: {
    title: string
    description?: string
    status?: string
    priority?: string
    due_date?: string
    story_points?: number
    assignee_id?: number
    parent_id?: number
  }) => api.post(`/api/projects/${projectId}/tasks`, data),

  update: (projectId: number, taskId: number, data: object) =>
    api.put(`/api/projects/${projectId}/tasks/${taskId}`, data),

  delete: (projectId: number, taskId: number) =>
    api.delete(`/api/projects/${projectId}/tasks/${taskId}`),
}