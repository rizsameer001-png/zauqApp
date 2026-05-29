import api from './apiConfig'

const creatorAPI = {
  getDashboard: () => api.get('/creator/dashboard').then(res => res.data),
  getContent: (type) => api.get(`/creator/content${type ? `?type=${type}` : ''}`).then(res => res.data),
  getStats: () => api.get('/creator/stats').then(res => res.data),
  getRevenue: () => api.get('/creator/revenue').then(res => res.data),
  getFollowers: () => api.get('/creator/followers').then(res => res.data),
  getAnalytics: () => api.get('/creator/analytics').then(res => res.data),
  getUploadStatus: () => api.get('/creator/upload-status').then(res => res.data),
  updateProfile: (data) => api.put('/creator/profile', data).then(res => res.data),
}

export default creatorAPI
