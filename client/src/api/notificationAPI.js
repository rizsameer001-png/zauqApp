import api from './apiConfig'

const notificationAPI = {
  getNotifications: () => api.get('/notifications').then(res => res.data),
  getUnreadCount: () => api.get('/notifications/unread-count').then(res => res.data),
  markAsRead: (id) => api.put(`/notifications/${id}/read`).then(res => res.data),
  markAllAsRead: () => api.put('/notifications/read-all').then(res => res.data),
  deleteNotification: (id) => api.delete(`/notifications/${id}`).then(res => res.data),
  updatePreferences: (enabled) => api.put('/notifications/preferences', { enabled }).then(res => res.data),
}

export default notificationAPI
