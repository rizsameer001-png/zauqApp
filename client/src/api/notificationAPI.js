// import api from './apiConfig'

// const notificationAPI = {
//   getNotifications: () => api.get('/notifications').then(res => res.data),
//   getUnreadCount: () => api.get('/notifications/unread-count').then(res => res.data),
//   markAsRead: (id) => api.put(`/notifications/${id}/read`).then(res => res.data),
//   markAllAsRead: () => api.put('/notifications/read-all').then(res => res.data),
//   deleteNotification: (id) => api.delete(`/notifications/${id}`).then(res => res.data),
//   updatePreferences: (enabled) => api.put('/notifications/preferences', { enabled }).then(res => res.data),
// }

// export default notificationAPI






// // client/src/api/notificationAPI.js
// import api from './apiConfig'

// const notificationAPI = {
//   getNotifications: () => api.get('/notifications').then(res => res.data),
//   getUnreadCount: () => api.get('/notifications/unread-count').then(res => res.data),
//   markAsRead: (id) => api.put(`/notifications/${id}/read`).then(res => res.data),
//   markAllAsRead: () => api.put('/notifications/read-all').then(res => res.data),
//   deleteNotification: (id) => api.delete(`/notifications/${id}`).then(res => res.data),
//   updatePreferences: (enabled) => api.put('/notifications/preferences', { enabled }).then(res => res.data),
  
//   // Add this new method for admin
//   sendToAll: (data) => api.post('/notifications/send-to-all', data).then(res => res.data),
// }

// export default notificationAPI;



// client/src/api/notificationAPI.js
import api from './apiConfig';

const notificationAPI = {
  // ============================================
  // USER NOTIFICATION ENDPOINTS
  // ============================================
  
  // Get user's notifications
  getNotifications: (params) => api.get('/notifications', { params }).then(res => res.data),
  
  // Get unread count
  getUnreadCount: () => api.get('/notifications/unread-count').then(res => res.data),
  
  // Mark single notification as read
  markAsRead: (id) => api.put(`/notifications/${id}/read`).then(res => res.data),
  
  // Mark all notifications as read
  markAllAsRead: () => api.put('/notifications/read-all').then(res => res.data),
  
  // Delete a notification
  deleteNotification: (id) => api.delete(`/notifications/${id}`).then(res => res.data),
  
  // Update notification preferences
  updatePreferences: (enabled) => api.put('/notifications/preferences', { enabled }).then(res => res.data),
  
  // Dismiss global notice
  dismissGlobalNotice: () => api.post('/notifications/dismiss-notice').then(res => res.data),
  
  // Get global notice (public)
  getGlobalNotice: () => api.get('/notifications/global-notice').then(res => res.data),
  
  // ============================================
  // ADMIN NOTIFICATION ENDPOINTS
  // ============================================
  
  // Get all notifications (admin view)
  adminGetAllNotifications: (params) => api.get('/notifications/admin/all', { params }).then(res => res.data),
  
  // Get notification statistics
  adminGetStats: () => api.get('/notifications/admin/stats').then(res => res.data),
  
  // Get single notification by ID
  adminGetNotificationById: (id) => api.get(`/notifications/admin/${id}`).then(res => res.data),
  
  // Create notification (send to users)
  adminCreateNotification: (data) => api.post('/notifications/admin/create', data).then(res => res.data),
  
  // Update notification
  adminUpdateNotification: (id, data) => api.put(`/notifications/admin/${id}`, data).then(res => res.data),
  
  // Delete notification
  adminDeleteNotification: (id) => api.delete(`/notifications/admin/${id}`).then(res => res.data),
  
  // Bulk delete notifications
  adminBulkDeleteNotifications: (ids) => api.post('/notifications/admin/bulk-delete', { ids }).then(res => res.data),
  
  // Update global notice (homepage banner)
  adminUpdateGlobalNotice: (data) => api.put('/notifications/admin/global-notice', data).then(res => res.data),
};

export default notificationAPI;