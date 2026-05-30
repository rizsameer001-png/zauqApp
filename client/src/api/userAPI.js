// import api from './apiConfig'

// const userAPI = {
//   getProfile: () => api.get('/users/profile').then(res => res.data),
//   updateProfile: (data) => api.put('/users/profile', data).then(res => res.data),
//   updatePassword: (data) => api.put('/users/password', data).then(res => res.data),
//   uploadAvatar: (formData) => api.post('/users/avatar', formData, {
//     headers: { 'Content-Type': 'multipart/form-data' }
//   }).then(res => res.data),
//   getFavorites: (type) => api.get(`/users/favorites${type ? `?type=${type}` : ''}`).then(res => res.data),
//   addToFavorites: (data) => api.post('/users/favorites', data).then(res => res.data),
//   removeFromFavorites: (type, id) => api.delete(`/users/favorites/${type}/${id}`).then(res => res.data),
//   getHistory: (type) => api.get(`/users/history${type ? `?type=${type}` : ''}`).then(res => res.data),
//   getDownloads: () => api.get('/users/downloads').then(res => res.data),
//   followAuthor: (authorId) => api.post(`/users/follow/${authorId}`).then(res => res.data),
//   unfollowAuthor: (authorId) => api.delete(`/users/follow/${authorId}`).then(res => res.data),
//   getNotifications: () => api.get('/users/notifications').then(res => res.data),
//   markNotificationRead: (id) => api.put(`/users/notifications/${id}/read`).then(res => res.data),
//   getReadingProgress: (contentType, contentId) => api.get(`/users/progress/${contentType}/${contentId}`).then(res => res.data),
//   updateReadingProgress: (data) => api.post('/users/progress', data).then(res => res.data),
// }

// export default userAPI




// // client/src/api/userAPI.js
// import api from './apiConfig'

// const userAPI = {
//   getProfile: () => api.get('/users/profile').then(res => res.data),
  
//   updateProfile: (data) => api.put('/users/profile', data).then(res => res.data),
  
//   updatePassword: (data) => api.put('/users/password', data).then(res => res.data),
  
//   uploadAvatar: async (formData) => {
//     // Log for debugging
//     console.log('Uploading avatar...');
//     for (let pair of formData.entries()) {
//       console.log('FormData entry:', pair[0], pair[1]);
//     }
    
//     try {
//       const response = await api.post('/users/avatar', formData, {
//         headers: { 
//           'Content-Type': 'multipart/form-data'
//         },
//         timeout: 30000, // 30 second timeout
//         onUploadProgress: (progressEvent) => {
//           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//           console.log(`Upload progress: ${percentCompleted}%`);
//         }
//       });
      
//       console.log('Upload response:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Avatar upload error:', error);
//       console.error('Error response:', error.response?.data);
//       console.error('Error status:', error.response?.status);
//       throw error;
//     }
//   },
  
//   // Alternative method if 'avatar' field doesn't work
//   uploadAvatarAsImage: async (formData) => {
//     console.log('Uploading avatar as image...');
//     for (let pair of formData.entries()) {
//       console.log('FormData entry:', pair[0], pair[1]);
//     }
    
//     try {
//       const response = await api.post('/users/avatar/upload', formData, {
//         headers: { 
//           'Content-Type': 'multipart/form-data'
//         },
//         timeout: 30000
//       });
      
//       console.log('Upload response:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Avatar upload error:', error);
//       console.error('Error response:', error.response?.data);
//       throw error;
//     }
//   },
  
//   getFavorites: (type) => api.get(`/users/favorites${type ? `?type=${type}` : ''}`).then(res => res.data),
  
//   addToFavorites: (data) => api.post('/users/favorites', data).then(res => res.data),
  
//   removeFromFavorites: (type, id) => api.delete(`/users/favorites/${type}/${id}`).then(res => res.data),
  
//   getHistory: (type) => api.get(`/users/history${type ? `?type=${type}` : ''}`).then(res => res.data),
  
//   getDownloads: () => api.get('/users/downloads').then(res => res.data),
  
//   followAuthor: (authorId) => api.post(`/users/follow/${authorId}`).then(res => res.data),
  
//   unfollowAuthor: (authorId) => api.delete(`/users/follow/${authorId}`).then(res => res.data),
  
//   getNotifications: () => api.get('/users/notifications').then(res => res.data),
  
//   markNotificationRead: (id) => api.put(`/users/notifications/${id}/read`).then(res => res.data),
  
//   markAllNotificationsRead: () => api.put('/users/notifications/read-all').then(res => res.data),
  
//   getReadingProgress: (contentType, contentId) => api.get(`/users/progress/${contentType}/${contentId}`).then(res => res.data),
  
//   updateReadingProgress: (data) => api.post('/users/progress', data).then(res => res.data),
  
//   // Helper method to validate image before upload
//   validateImage: (file) => {
//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
//     const maxSize = 2 * 1024 * 1024; // 2MB
    
//     if (!allowedTypes.includes(file.type)) {
//       throw new Error(`Invalid file type. Allowed: ${allowedTypes.map(t => t.split('/')[1]).join(', ')}`);
//     }
    
//     if (file.size > maxSize) {
//       throw new Error(`File too large. Maximum size is 2MB. Your file: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
//     }
    
//     return true;
//   },
  
//   // Helper to create FormData for avatar upload
//   createAvatarFormData: (file) => {
//     const formData = new FormData();
//     formData.append('avatar', file);
//     // Also append as 'image' for backward compatibility
//     formData.append('image', file);
//     return formData;
//   }
// }

// export default userAPI












// client/src/api/userAPI.js
import api from './apiConfig'

const userAPI = {
  // ============================================
  // PROFILE MANAGEMENT
  // ============================================
  
  getProfile: () => api.get('/users/profile').then(res => res.data),
  
  updateProfile: (data) => api.put('/users/profile', data).then(res => res.data),
  
  updatePassword: (data) => api.put('/users/password', data).then(res => res.data),
  
  // Avatar upload with multiple fallback methods
  uploadAvatar: async (formData) => {
    console.log('Uploading avatar...');
    for (let pair of formData.entries()) {
      console.log('FormData entry:', pair[0], pair[1]);
    }
    
    try {
      const response = await api.post('/users/avatar', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data'
        },
        timeout: 30000,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Upload progress: ${percentCompleted}%`);
        }
      });
      
      console.log('Upload response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Avatar upload error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      throw error;
    }
  },
  
  // Alternative method if 'avatar' field doesn't work
  uploadAvatarAsImage: async (formData) => {
    console.log('Uploading avatar as image...');
    for (let pair of formData.entries()) {
      console.log('FormData entry:', pair[0], pair[1]);
    }
    
    try {
      const response = await api.post('/users/avatar/upload', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data'
        },
        timeout: 30000
      });
      
      console.log('Upload response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Avatar upload error:', error);
      console.error('Error response:', error.response?.data);
      throw error;
    }
  },
  
  // Remove avatar
  removeAvatar: () => api.delete('/users/avatar').then(res => res.data),
  
  // ============================================
  // FAVORITES MANAGEMENT
  // ============================================
  
  getFavorites: (type) => api.get(`/users/favorites${type ? `?type=${type}` : ''}`).then(res => res.data),
  
  addToFavorites: (data) => api.post('/users/favorites', data).then(res => res.data),
  
  removeFromFavorites: (type, id) => api.delete(`/users/favorites/${type}/${id}`).then(res => res.data),
  
  // Check if content is favorited
  isFavorited: (type, id) => api.get(`/users/favorites/${type}/${id}/check`).then(res => res.data),
  
  // Get all favorites count
  getFavoritesCount: () => api.get('/users/favorites/count').then(res => res.data),
  
  // ============================================
  // HISTORY MANAGEMENT
  // ============================================
  
  getHistory: (type) => api.get(`/users/history${type ? `?type=${type}` : ''}`).then(res => res.data),
  
  clearHistory: () => api.delete('/users/history').then(res => res.data),
  
  removeHistoryItem: (id) => api.delete(`/users/history/${id}`).then(res => res.data),
  
  // ============================================
  // DOWNLOADS MANAGEMENT (FULL CRUD)
  // ============================================
  
  // Get all downloads (optionally filtered by type)
  getDownloads: (type) => api.get(`/users/downloads${type ? `?type=${type}` : ''}`).then(res => res.data),
  
  // Get download by ID
  getDownloadById: (id) => api.get(`/users/downloads/${id}`).then(res => res.data),
  
  // Add a download record
  addDownload: (data) => api.post('/users/downloads', data).then(res => res.data),
  
  // Remove a single download
  removeDownload: (id) => api.delete(`/users/downloads/${id}`).then(res => res.data),
  
  // Bulk remove downloads
  bulkRemoveDownloads: (ids) => api.post('/users/downloads/bulk-delete', { ids }).then(res => res.data),
  
  // Clear all downloads
  clearDownloads: () => api.delete('/users/downloads/all').then(res => res.data),
  
  // Download file (get actual file)
  downloadFile: (contentType, contentId) => api.get(`/users/downloads/${contentType}/${contentId}`, {
    responseType: 'blob'
  }).then(res => res.data),
  
  // Check if content is already downloaded
  isDownloaded: (contentType, contentId) => api.get(`/users/downloads/${contentType}/${contentId}/check`).then(res => res.data),
  
  // Get download stats
  getDownloadStats: () => api.get('/users/downloads/stats').then(res => res.data),
  
  // ============================================
  // AUTHOR FOLLOWING
  // ============================================
  
  followAuthor: (authorId) => api.post(`/users/follow/${authorId}`).then(res => res.data),
  
  unfollowAuthor: (authorId) => api.delete(`/users/follow/${authorId}`).then(res => res.data),
  
  getFollowingAuthors: () => api.get('/users/following').then(res => res.data),
  
  isFollowingAuthor: (authorId) => api.get(`/users/follow/${authorId}/check`).then(res => res.data),
  
  // ============================================
  // NOTIFICATIONS MANAGEMENT
  // ============================================
  
  getNotifications: (params) => api.get('/users/notifications', { params }).then(res => res.data),
  
  markNotificationRead: (id) => api.put(`/users/notifications/${id}/read`).then(res => res.data),
  
  markAllNotificationsRead: () => api.put('/users/notifications/read-all').then(res => res.data),
  
  deleteNotification: (id) => api.delete(`/users/notifications/${id}`).then(res => res.data),
  
  deleteAllNotifications: () => api.delete('/users/notifications/all').then(res => res.data),
  
  getNotificationPreferences: () => api.get('/users/notifications/preferences').then(res => res.data),
  
  updateNotificationPreferences: (data) => api.put('/users/notifications/preferences', data).then(res => res.data),
  
  // ============================================
  // READING PROGRESS
  // ============================================
  
  getReadingProgress: (contentType, contentId) => api.get(`/users/progress/${contentType}/${contentId}`).then(res => res.data),
  
  updateReadingProgress: (data) => api.post('/users/progress', data).then(res => res.data),
  
  getReadingStats: () => api.get('/users/progress/stats').then(res => res.data),
  
  // ============================================
  // HELPER METHODS
  // ============================================
  
  // Validate image before upload
  validateImage: (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    const maxSize = 2 * 1024 * 1024; // 2MB
    
    if (!allowedTypes.includes(file.type)) {
      throw new Error(`Invalid file type. Allowed: ${allowedTypes.map(t => t.split('/')[1]).join(', ')}`);
    }
    
    if (file.size > maxSize) {
      throw new Error(`File too large. Maximum size is 2MB. Your file: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
    }
    
    return true;
  },
  
  // Create FormData for avatar upload
  createAvatarFormData: (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    // Also append as 'image' for backward compatibility
    formData.append('image', file);
    return formData;
  },
  
  // Create FormData for file upload
  createFileFormData: (file, fieldName = 'file') => {
    const formData = new FormData();
    formData.append(fieldName, file);
    return formData;
  },
  
  // Format file size for display
  formatFileSize: (bytes) => {
    if (!bytes) return '0 Bytes';
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

export default userAPI