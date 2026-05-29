import api from './apiConfig'

const authAPI = {
  register: (userData) => api.post('/auth/register', userData).then(res => res.data),
  login: (credentials) => api.post('/auth/login', credentials).then(res => res.data),
  logout: () => api.post('/auth/logout').then(res => res.data),
  getMe: () => api.get('/auth/me').then(res => res.data),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }).then(res => res.data),
  resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password }).then(res => res.data),
  refreshToken: () => api.post('/auth/refresh-token').then(res => res.data),
  googleAuth: () => window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`,
}

export default authAPI
