// import api from './api.js'

// export const authAPI = {
//   register: (data) => api.post('/auth/register', data),
//   login: (data) => api.post('/auth/login', data),
//   googleAuth: (token) => api.post('/auth/google', { token }),
//   logout: () => api.post('/auth/logout'),
//   getProfile: () => api.get('/auth/profile'),
//   updateProfile: (data) => api.put('/auth/profile', data),
//   changePassword: (data) => api.put('/auth/change-password', data),
//   forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
//   resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }),
// }

// export default authAPI


// // client/src/services/authService.js
// import api from './api.js'

// const authAPI = {
//   register: (data) => api.post('/auth/register', data).then(res => res.data),
//   login: (data) => api.post('/auth/login', data).then(res => res.data),
//   googleAuth: (token) => api.post('/auth/google', { token }).then(res => res.data),
//   logout: () => api.post('/auth/logout').then(res => res.data),
//   getProfile: () => api.get('/auth/profile').then(res => res.data),
//   updateProfile: (data) => api.put('/auth/profile', data).then(res => res.data),
//   changePassword: (data) => api.put('/auth/change-password', data).then(res => res.data),
//   forgotPassword: (email) => api.post('/auth/forgot-password', { email }).then(res => res.data),
//   resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }).then(res => res.data),
// }

// export default authAPI












// client/src/services/authService.js
// LAST UPDATED: 2026-06-06
// PURPOSE: Authentication API service with token management

import api from './api.js'

const authAPI = {
  // ============================================
  // AUTHENTICATION ENDPOINTS
  // ============================================
  
  /**
   * @desc Register new user
   * @param {Object} data - { name, email, password }
   */
  register: (data) => api.post('/auth/register', data).then(res => res.data),
  
  /**
   * @desc Login user
   * @param {Object} data - { email, password }
   * @returns {Object} { token, refreshToken, user }
   */
  login: (data) => api.post('/auth/login', data).then(res => res.data),
  
  /**
   * @desc Google OAuth login
   * @param {string} token - Google token
   */
  googleAuth: (token) => api.post('/auth/google', { token }).then(res => res.data),
  
  /**
   * @desc Logout user
   */
  logout: () => api.post('/auth/logout').then(res => res.data),
  
  // ============================================
  // TOKEN MANAGEMENT (CRITICAL FOR PAGE REFRESH)
  // ============================================
  
  /**
   * ✅ NEW: Verify current token (used on page refresh)
   * @returns {Object} { valid: boolean, user: object }
   */
  verifyToken: () => api.post('/auth/verify-token').then(res => res.data),
  
  /**
   * ✅ NEW: Refresh access token
   * @param {string} refreshToken - Optional refresh token
   * @returns {Object} { token: string }
   */
  refreshToken: (refreshToken) => api.post('/auth/refresh-token', { refreshToken }).then(res => res.data),
  
  // ============================================
  // USER PROFILE ENDPOINTS
  // ============================================
  
  /**
   * @desc Get current user profile
   */
  getProfile: () => api.get('/auth/me').then(res => res.data),
  
  /**
   * @desc Update user profile
   * @param {Object} data - { name, bio, preferences }
   */
  updateProfile: (data) => api.put('/auth/profile', data).then(res => res.data),
  
  /**
   * @desc Change password
   * @param {Object} data - { currentPassword, newPassword }
   */
  changePassword: (data) => api.put('/auth/change-password', data).then(res => res.data),
  
  // ============================================
  // PASSWORD RESET ENDPOINTS
  // ============================================
  
  /**
   * @desc Request password reset email
   * @param {string} email
   */
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }).then(res => res.data),
  
  /**
   * @desc Reset password with token
   * @param {string} token - Reset token
   * @param {string} password - New password
   */
  resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password }).then(res => res.data),
}

export default authAPI