import api from './apiConfig.js'

const authAPI = {
  // Register new user
  register: (userData) => api.post('/auth/register', userData).then(res => res.data),

  // Login user
  login: (credentials) => api.post('/auth/login', credentials).then(res => res.data),

  // Logout user
  logout: () => api.post('/auth/logout').then(res => res.data),

  // Get current user profile
  getMe: () => api.get('/auth/me').then(res => res.data),

  // Update profile
  updateProfile: (data) => api.put('/auth/profile', data).then(res => res.data),

  // Change password
  changePassword: (data) => api.put('/auth/change-password', data).then(res => res.data),

  // Forgot password
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }).then(res => res.data),

  // Reset password
  resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password }).then(res => res.data),

  // Refresh token
  refreshToken: () => api.post('/auth/refresh-token').then(res => res.data),

  // Verify email
  verifyEmail: (token) => api.get(`/auth/verify-email/${token}`).then(res => res.data),

  // Google OAuth - redirects to Google
  googleAuth: () => {
    window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/google`
  },
}

export default authAPI
