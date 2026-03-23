import api from './axios'

export const authApi = {
  // Get CSRF cookie from Laravel (required before login/register)
  csrf: () => api.get('/sanctum/csrf-cookie'),

  // Register
  register: (data: {
    name: string
    email: string
    password: string
    password_confirmation: string
  }) => api.post('/register', data),

  // Login
  login: (data: {
    email: string
    password: string
  }) => api.post('/login', data),

  // Logout
  logout: () => api.post('/logout'),

  // Get logged in user
  getUser: () => api.get('/api/user'),
}