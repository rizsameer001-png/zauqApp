import api from './apiConfig'

const userAPI = {
  getProfile: () => api.get('/users/profile').then(res => res.data),
  updateProfile: (data) => api.put('/users/profile', data).then(res => res.data),
  updatePassword: (data) => api.put('/users/password', data).then(res => res.data),
  uploadAvatar: (formData) => api.post('/users/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(res => res.data),
  getFavorites: (type) => api.get(`/users/favorites${type ? `?type=${type}` : ''}`).then(res => res.data),
  addToFavorites: (data) => api.post('/users/favorites', data).then(res => res.data),
  removeFromFavorites: (type, id) => api.delete(`/users/favorites/${type}/${id}`).then(res => res.data),
  getHistory: (type) => api.get(`/users/history${type ? `?type=${type}` : ''}`).then(res => res.data),
  getDownloads: () => api.get('/users/downloads').then(res => res.data),
  followAuthor: (authorId) => api.post(`/users/follow/${authorId}`).then(res => res.data),
  unfollowAuthor: (authorId) => api.delete(`/users/follow/${authorId}`).then(res => res.data),
  getNotifications: () => api.get('/users/notifications').then(res => res.data),
  markNotificationRead: (id) => api.put(`/users/notifications/${id}/read`).then(res => res.data),
  getReadingProgress: (contentType, contentId) => api.get(`/users/progress/${contentType}/${contentId}`).then(res => res.data),
  updateReadingProgress: (data) => api.post('/users/progress', data).then(res => res.data),
}

export default userAPI
