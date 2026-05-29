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


// client/src/services/authService.js
import api from './api.js'

const authAPI = {
  register: (data) => api.post('/auth/register', data).then(res => res.data),
  login: (data) => api.post('/auth/login', data).then(res => res.data),
  googleAuth: (token) => api.post('/auth/google', { token }).then(res => res.data),
  logout: () => api.post('/auth/logout').then(res => res.data),
  getProfile: () => api.get('/auth/profile').then(res => res.data),
  updateProfile: (data) => api.put('/auth/profile', data).then(res => res.data),
  changePassword: (data) => api.put('/auth/change-password', data).then(res => res.data),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }).then(res => res.data),
  resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }).then(res => res.data),
}

export default authAPI