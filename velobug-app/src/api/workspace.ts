import api from './axios'

export const workspaceApi = {
  getAll: () => api.get('/api/workspaces'),
  create: (data: { name: string; description?: string }) =>
    api.post('/api/workspaces', data),
  update: (id: number, data: { name?: string; description?: string }) =>
    api.put(`/api/workspaces/${id}`, data),
  delete: (id: number) => api.delete(`/api/workspaces/${id}`),
}

export const projectApi = {
  getAll: (workspaceId: number) =>
    api.get(`/api/workspaces/${workspaceId}/projects`),
  create: (workspaceId: number, data: {
    name: string
    description?: string
    status?: string
    deadline?: string
  }) => api.post(`/api/workspaces/${workspaceId}/projects`, data),
  update: (workspaceId: number, projectId: number, data: object) =>
    api.put(`/api/workspaces/${workspaceId}/projects/${projectId}`, data),
  delete: (workspaceId: number, projectId: number) =>
    api.delete(`/api/workspaces/${workspaceId}/projects/${projectId}`),
}