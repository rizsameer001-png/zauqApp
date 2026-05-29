
//client/src/api/adminAPI.js
import api from './apiConfig'

const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard').then(res => res.data),
  getUsers: (params) => api.get('/admin/users', { params }).then(res => res.data),
  getUser: (id) => api.get(`/admin/users/${id}`).then(res => res.data),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data).then(res => res.data),
  banUser: (id) => api.post(`/admin/users/${id}/ban`).then(res => res.data),
  unbanUser: (id) => api.post(`/admin/users/${id}/unban`).then(res => res.data),
  getContentOverview: () => api.get('/admin/content').then(res => res.data),
  getPendingContent: () => api.get('/admin/content/pending').then(res => res.data),
  approveContent: (id, type) => api.post(`/admin/content/${id}/approve`, { type }).then(res => res.data),
  rejectContent: (id, type, reason) => api.post(`/admin/content/${id}/reject`, { type, reason }).then(res => res.data),
  getReports: () => api.get('/admin/reports').then(res => res.data),
  getSettings: () => api.get('/admin/settings').then(res => res.data),
  updateSettings: (data) => api.put('/admin/settings', data).then(res => res.data),
  getSystemHealth: () => api.get('/admin/health').then(res => res.data),
}

export default adminAPI
