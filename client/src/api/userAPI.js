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












// // client/src/api/userAPI.js
// import api from './apiConfig'

// const userAPI = {
//   // ============================================
//   // PROFILE MANAGEMENT
//   // ============================================
  
//   getProfile: () => api.get('/users/profile').then(res => res.data),
  
//   updateProfile: (data) => api.put('/users/profile', data).then(res => res.data),
  
//   updatePassword: (data) => api.put('/users/password', data).then(res => res.data),
  
//   // Avatar upload with multiple fallback methods
//   uploadAvatar: async (formData) => {
//     console.log('Uploading avatar...');
//     for (let pair of formData.entries()) {
//       console.log('FormData entry:', pair[0], pair[1]);
//     }
    
//     try {
//       const response = await api.post('/users/avatar', formData, {
//         headers: { 
//           'Content-Type': 'multipart/form-data'
//         },
//         timeout: 30000,
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
  
//   // Remove avatar
//   removeAvatar: () => api.delete('/users/avatar').then(res => res.data),
  
//   // ============================================
//   // FAVORITES MANAGEMENT
//   // ============================================
  
//   getFavorites: (type) => api.get(`/users/favorites${type ? `?type=${type}` : ''}`).then(res => res.data),
  
//   addToFavorites: (data) => api.post('/users/favorites', data).then(res => res.data),
  
//   removeFromFavorites: (type, id) => api.delete(`/users/favorites/${type}/${id}`).then(res => res.data),
  
//   // Check if content is favorited
//   isFavorited: (type, id) => api.get(`/users/favorites/${type}/${id}/check`).then(res => res.data),
  
//   // Get all favorites count
//   getFavoritesCount: () => api.get('/users/favorites/count').then(res => res.data),
  
//   // ============================================
//   // HISTORY MANAGEMENT
//   // ============================================
  
//   getHistory: (type) => api.get(`/users/history${type ? `?type=${type}` : ''}`).then(res => res.data),
  
//   clearHistory: () => api.delete('/users/history').then(res => res.data),
  
//   removeHistoryItem: (id) => api.delete(`/users/history/${id}`).then(res => res.data),
  
//   // ============================================
//   // DOWNLOADS MANAGEMENT (FULL CRUD)
//   // ============================================
  
//   // Get all downloads (optionally filtered by type)
//   getDownloads: (type) => api.get(`/users/downloads${type ? `?type=${type}` : ''}`).then(res => res.data),
  
//   // Get download by ID
//   getDownloadById: (id) => api.get(`/users/downloads/${id}`).then(res => res.data),
  
//   // Add a download record
//   addDownload: (data) => api.post('/users/downloads', data).then(res => res.data),
  
//   // Remove a single download
//   removeDownload: (id) => api.delete(`/users/downloads/${id}`).then(res => res.data),
  
//   // Bulk remove downloads
//   bulkRemoveDownloads: (ids) => api.post('/users/downloads/bulk-delete', { ids }).then(res => res.data),
  
//   // Clear all downloads
//   clearDownloads: () => api.delete('/users/downloads/all').then(res => res.data),
  
//   // Download file (get actual file)
//   downloadFile: (contentType, contentId) => api.get(`/users/downloads/${contentType}/${contentId}`, {
//     responseType: 'blob'
//   }).then(res => res.data),
  
//   // Check if content is already downloaded
//   isDownloaded: (contentType, contentId) => api.get(`/users/downloads/${contentType}/${contentId}/check`).then(res => res.data),
  
//   // Get download stats
//   getDownloadStats: () => api.get('/users/downloads/stats').then(res => res.data),
  
//   // ============================================
//   // AUTHOR FOLLOWING
//   // ============================================
  
//   followAuthor: (authorId) => api.post(`/users/follow/${authorId}`).then(res => res.data),
  
//   unfollowAuthor: (authorId) => api.delete(`/users/follow/${authorId}`).then(res => res.data),
  
//   getFollowingAuthors: () => api.get('/users/following').then(res => res.data),
  
//   isFollowingAuthor: (authorId) => api.get(`/users/follow/${authorId}/check`).then(res => res.data),
  
//   // ============================================
//   // NOTIFICATIONS MANAGEMENT
//   // ============================================
  
//   getNotifications: (params) => api.get('/users/notifications', { params }).then(res => res.data),
  
//   markNotificationRead: (id) => api.put(`/users/notifications/${id}/read`).then(res => res.data),
  
//   markAllNotificationsRead: () => api.put('/users/notifications/read-all').then(res => res.data),
  
//   deleteNotification: (id) => api.delete(`/users/notifications/${id}`).then(res => res.data),
  
//   deleteAllNotifications: () => api.delete('/users/notifications/all').then(res => res.data),
  
//   getNotificationPreferences: () => api.get('/users/notifications/preferences').then(res => res.data),
  
//   updateNotificationPreferences: (data) => api.put('/users/notifications/preferences', data).then(res => res.data),
  
//   // ============================================
//   // READING PROGRESS
//   // ============================================
  
//   getReadingProgress: (contentType, contentId) => api.get(`/users/progress/${contentType}/${contentId}`).then(res => res.data),
  
//   updateReadingProgress: (data) => api.post('/users/progress', data).then(res => res.data),
  
//   getReadingStats: () => api.get('/users/progress/stats').then(res => res.data),
  
//   // ============================================
//   // HELPER METHODS
//   // ============================================
  
//   // Validate image before upload
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
  
//   // Create FormData for avatar upload
//   createAvatarFormData: (file) => {
//     const formData = new FormData();
//     formData.append('avatar', file);
//     // Also append as 'image' for backward compatibility
//     formData.append('image', file);
//     return formData;
//   },
  
//   // Create FormData for file upload
//   createFileFormData: (file, fieldName = 'file') => {
//     const formData = new FormData();
//     formData.append(fieldName, file);
//     return formData;
//   },
  
//   // Format file size for display
//   formatFileSize: (bytes) => {
//     if (!bytes) return '0 Bytes';
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   }
// }

// export default userAPI









// // client/src/api/userAPI.js
// import api from './apiConfig'

// const userAPI = {
//   // ============================================
//   // PROFILE MANAGEMENT
//   // ============================================
  
//   getProfile: () => api.get('/users/profile').then(res => res.data),
  
//   updateProfile: (data) => api.put('/users/profile', data).then(res => res.data),
  
//   updatePassword: (data) => api.put('/users/password', data).then(res => res.data),
  
//   // Avatar upload with multiple fallback methods
//   uploadAvatar: async (formData) => {
//     console.log('Uploading avatar...');
//     for (let pair of formData.entries()) {
//       console.log('FormData entry:', pair[0], pair[1]);
//     }
    
//     try {
//       const response = await api.post('/users/avatar', formData, {
//         headers: { 
//           'Content-Type': 'multipart/form-data'
//         },
//         timeout: 30000,
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
  
//   // Remove avatar
//   removeAvatar: () => api.delete('/users/avatar').then(res => res.data),
  
//   // ============================================
//   // FAVORITES MANAGEMENT
//   // ============================================
  
//   getFavorites: (type) => api.get(`/users/favorites${type ? `?type=${type}` : ''}`).then(res => res.data),
  
//   addToFavorites: (data) => api.post('/users/favorites', data).then(res => res.data),
  
//   removeFromFavorites: (type, id) => api.delete(`/users/favorites/${type}/${id}`).then(res => res.data),
  
//   // Check if content is favorited
//   isFavorited: (type, id) => api.get(`/users/favorites/${type}/${id}/check`).then(res => res.data),
  
//   // Get all favorites count
//   getFavoritesCount: () => api.get('/users/favorites/count').then(res => res.data),
  
//   // ============================================
//   // HISTORY MANAGEMENT
//   // ============================================
  
//   getHistory: (type) => api.get(`/users/history${type ? `?type=${type}` : ''}`).then(res => res.data),
  
//   clearHistory: () => api.delete('/users/history').then(res => res.data),
  
//   removeHistoryItem: (id) => api.delete(`/users/history/${id}`).then(res => res.data),
  
//   // ============================================
//   // DOWNLOADS MANAGEMENT (FULL CRUD)
//   // ============================================
  
//   // Get all downloads (optionally filtered by type)
//   getDownloads: (type) => api.get(`/users/downloads${type ? `?type=${type}` : ''}`).then(res => res.data),
  
//   // Get download by ID
//   getDownloadById: (id) => api.get(`/users/downloads/${id}`).then(res => res.data),
  
//   // ============================================
//   // FIX 1: REMOVED addDownload method (not needed - downloads auto-added when downloading files)
//   // ============================================
  
//   // Remove a single download
//   removeDownload: (id) => api.delete(`/users/downloads/${id}`).then(res => res.data),
  
//   // Bulk remove downloads
//   bulkRemoveDownloads: (ids) => api.post('/users/downloads/bulk-delete', { ids }).then(res => res.data),
  
//   // Clear all downloads
//   clearDownloads: () => api.delete('/users/downloads/all').then(res => res.data),
  
//   // ============================================
//   // FIX 2: FIXED downloadFile - removed responseType: 'blob'
//   // Backend returns JSON with downloadUrl, not the actual file
//   // ============================================
//   downloadFile: async (contentType, contentId) => {
//     const response = await api.get(`/users/downloads/${contentType}/${contentId}`);
//     return response.data;
//   },
  
//   // Check if content is already downloaded
//   isDownloaded: (contentType, contentId) => api.get(`/users/downloads/${contentType}/${contentId}/check`).then(res => res.data),
  
//   // Get download stats
//   getDownloadStats: () => api.get('/users/downloads/stats').then(res => res.data),
  
//   // ============================================
//   // FIX 3: ADDED HELPER METHODS FOR ACTUAL FILE DOWNLOAD
//   // ============================================
  
//   // Helper to trigger actual file download after getting URL
//   triggerDownload: (downloadUrl, fileName) => {
//     // Create a temporary anchor element
//     const link = document.createElement('a');
//     link.href = downloadUrl;
//     link.download = fileName || 'download';
//     link.target = '_blank';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   },
  
//   // Combined method: get download info and trigger download
//   downloadAndSave: async (contentType, contentId, fileName) => {
//     try {
//       const result = await userAPI.downloadFile(contentType, contentId);
//       if (result.success && result.data?.downloadUrl) {
//         userAPI.triggerDownload(result.data.downloadUrl, fileName || result.data.title);
//         return result;
//       }
//       throw new Error('No download URL received');
//     } catch (error) {
//       console.error('Download failed:', error);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // AUTHOR FOLLOWING
//   // ============================================
  
//   followAuthor: (authorId) => api.post(`/users/follow/${authorId}`).then(res => res.data),
  
//   unfollowAuthor: (authorId) => api.delete(`/users/follow/${authorId}`).then(res => res.data),
  
//   getFollowingAuthors: () => api.get('/users/following').then(res => res.data),
  
//   isFollowingAuthor: (authorId) => api.get(`/users/follow/${authorId}/check`).then(res => res.data),
  
//   // ============================================
//   // NOTIFICATIONS MANAGEMENT
//   // ============================================
  
//   getNotifications: (params) => api.get('/users/notifications', { params }).then(res => res.data),
  
//   markNotificationRead: (id) => api.put(`/users/notifications/${id}/read`).then(res => res.data),
  
//   markAllNotificationsRead: () => api.put('/users/notifications/read-all').then(res => res.data),
  
//   deleteNotification: (id) => api.delete(`/users/notifications/${id}`).then(res => res.data),
  
//   deleteAllNotifications: () => api.delete('/users/notifications/all').then(res => res.data),
  
//   getNotificationPreferences: () => api.get('/users/notifications/preferences').then(res => res.data),
  
//   updateNotificationPreferences: (data) => api.put('/users/notifications/preferences', data).then(res => res.data),
  
//   // ============================================
//   // READING PROGRESS
//   // ============================================
  
//   getReadingProgress: (contentType, contentId) => api.get(`/users/progress/${contentType}/${contentId}`).then(res => res.data),
  
//   updateReadingProgress: (data) => api.post('/users/progress', data).then(res => res.data),
  
//   getReadingStats: () => api.get('/users/progress/stats').then(res => res.data),
  
//   // ============================================
//   // HELPER METHODS
//   // ============================================
  
//   // Validate image before upload
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
  
//   // Create FormData for avatar upload
//   createAvatarFormData: (file) => {
//     const formData = new FormData();
//     formData.append('avatar', file);
//     // Also append as 'image' for backward compatibility
//     formData.append('image', file);
//     return formData;
//   },
  
//   // Create FormData for file upload
//   createFileFormData: (file, fieldName = 'file') => {
//     const formData = new FormData();
//     formData.append(fieldName, file);
//     return formData;
//   },
  
//   // Format file size for display
//   formatFileSize: (bytes) => {
//     if (!bytes) return '0 Bytes';
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   }
// }

// export default userAPI









// // client/src/api/userAPI.js
// import api from './apiConfig'

// const userAPI = {
//   // ============================================
//   // PROFILE MANAGEMENT
//   // ============================================
  
//   getProfile: () => api.get('/users/profile').then(res => res.data),
  
//   updateProfile: (data) => api.put('/users/profile', data).then(res => res.data),
  
//   updatePassword: (data) => api.put('/users/password', data).then(res => res.data),
  
//   // Avatar upload with multiple fallback methods
//   uploadAvatar: async (formData) => {
//     console.log('Uploading avatar...');
//     for (let pair of formData.entries()) {
//       console.log('FormData entry:', pair[0], pair[1]);
//     }
    
//     try {
//       const response = await api.post('/users/avatar', formData, {
//         headers: { 
//           'Content-Type': 'multipart/form-data'
//         },
//         timeout: 30000,
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
  
//   // Remove avatar
//   removeAvatar: () => api.delete('/users/avatar').then(res => res.data),
  
//   // ============================================
//   // FAVORITES MANAGEMENT - ENHANCED
//   // ============================================
  
//   // Get all favorites (optionally filtered by type)
//   // type can be: 'poems', 'books', 'audio', 'videos', or undefined for all
//   getFavorites: async (type) => {
//     const url = type ? `/users/favorites?type=${type}` : '/users/favorites';
//     const response = await api.get(url);
//     return response.data;
//   },
  
//   // Get favorites with counts
//   getFavoritesWithCounts: async () => {
//     const response = await api.get('/users/favorites');
//     return response.data;
//   },
  
//   // Add item to favorites
//   // data should be: { type: 'books', id: 'bookId' }
//   addToFavorites: async (data) => {
//     const response = await api.post('/users/favorites', data);
//     return response.data;
//   },
  
//   // Remove item from favorites
//   removeFromFavorites: async (type, id) => {
//     const response = await api.delete(`/users/favorites/${type}/${id}`);
//     return response.data;
//   },
  
//   // Toggle favorite (add if not favorited, remove if favorited)
//   toggleFavorite: async (type, id) => {
//     try {
//       // First check if it's already favorited
//       const checkResult = await userAPI.isFavorited(type, id);
      
//       if (checkResult.success && checkResult.data.isFavorited) {
//         // Remove from favorites
//         return await userAPI.removeFromFavorites(type, id);
//       } else {
//         // Add to favorites
//         return await userAPI.addToFavorites({ type, id });
//       }
//     } catch (error) {
//       console.error('Error toggling favorite:', error);
//       throw error;
//     }
//   },
  
//   // Check if content is favorited
//   isFavorited: async (type, id) => {
//     const response = await api.get(`/users/favorites/${type}/${id}/check`);
//     return response.data;
//   },
  
//   // Get all favorites counts by type
//   getFavoritesCount: async () => {
//     const response = await api.get('/users/favorites/count');
//     return response.data;
//   },
  
//   // Get favorites by specific type with pagination
//   getFavoritesByType: async (type, page = 1, limit = 20) => {
//     const response = await api.get(`/users/favorites?type=${type}&page=${page}&limit=${limit}`);
//     return response.data;
//   },
  
//   // Bulk check favorites (for multiple items at once)
//   bulkCheckFavorites: async (items) => {
//     // items should be array of { type, id }
//     const response = await api.post('/users/favorites/bulk-check', { items });
//     return response.data;
//   },
  
//   // ============================================
//   // HISTORY MANAGEMENT
//   // ============================================
  
//   getHistory: (type) => api.get(`/users/history${type ? `?type=${type}` : ''}`).then(res => res.data),
  
//   clearHistory: () => api.delete('/users/history').then(res => res.data),
  
//   removeHistoryItem: (id) => api.delete(`/users/history/${id}`).then(res => res.data),
  
//   // ============================================
//   // DOWNLOADS MANAGEMENT (FULL CRUD)
//   // ============================================
  
//   // Get all downloads (optionally filtered by type)
//   getDownloads: (type) => api.get(`/users/downloads${type ? `?type=${type}` : ''}`).then(res => res.data),
  
//   // Get download by ID
//   getDownloadById: (id) => api.get(`/users/downloads/${id}`).then(res => res.data),
  
//   // Remove a single download
//   removeDownload: (id) => api.delete(`/users/downloads/${id}`).then(res => res.data),
  
//   // Bulk remove downloads
//   bulkRemoveDownloads: (ids) => api.post('/users/downloads/bulk-delete', { ids }).then(res => res.data),
  
//   // Clear all downloads
//   clearDownloads: () => api.delete('/users/downloads/all').then(res => res.data),
  
//   // Download file - gets download URL info
//   downloadFile: async (contentType, contentId) => {
//     const response = await api.get(`/users/downloads/${contentType}/${contentId}`);
//     return response.data;
//   },
  
//   // Check if content is already downloaded
//   isDownloaded: (contentType, contentId) => api.get(`/users/downloads/${contentType}/${contentId}/check`).then(res => res.data),
  
//   // Get download stats
//   getDownloadStats: () => api.get('/users/downloads/stats').then(res => res.data),
  
//   // Helper to trigger actual file download after getting URL
//   triggerDownload: (downloadUrl, fileName) => {
//     // Create a temporary anchor element
//     const link = document.createElement('a');
//     link.href = downloadUrl;
//     link.download = fileName || 'download';
//     link.target = '_blank';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   },
  
//   // Combined method: get download info and trigger download
//   downloadAndSave: async (contentType, contentId, fileName) => {
//     try {
//       const result = await userAPI.downloadFile(contentType, contentId);
//       if (result.success && result.data?.downloadUrl) {
//         userAPI.triggerDownload(result.data.downloadUrl, fileName || result.data.title);
//         return result;
//       }
//       throw new Error('No download URL received');
//     } catch (error) {
//       console.error('Download failed:', error);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // AUTHOR FOLLOWING
//   // ============================================
  
//   followAuthor: (authorId) => api.post(`/users/follow/${authorId}`).then(res => res.data),
  
//   unfollowAuthor: (authorId) => api.delete(`/users/follow/${authorId}`).then(res => res.data),
  
//   getFollowingAuthors: () => api.get('/users/following').then(res => res.data),
  
//   isFollowingAuthor: (authorId) => api.get(`/users/follow/${authorId}/check`).then(res => res.data),
  
//   // ============================================
//   // NOTIFICATIONS MANAGEMENT
//   // ============================================
  
//   getNotifications: (params) => api.get('/users/notifications', { params }).then(res => res.data),
  
//   markNotificationRead: (id) => api.put(`/users/notifications/${id}/read`).then(res => res.data),
  
//   markAllNotificationsRead: () => api.put('/users/notifications/read-all').then(res => res.data),
  
//   deleteNotification: (id) => api.delete(`/users/notifications/${id}`).then(res => res.data),
  
//   deleteAllNotifications: () => api.delete('/users/notifications/all').then(res => res.data),
  
//   getNotificationPreferences: () => api.get('/users/notifications/preferences').then(res => res.data),
  
//   updateNotificationPreferences: (data) => api.put('/users/notifications/preferences', data).then(res => res.data),
  
//   // ============================================
//   // READING PROGRESS
//   // ============================================
  
//   getReadingProgress: (contentType, contentId) => api.get(`/users/progress/${contentType}/${contentId}`).then(res => res.data),
  
//   updateReadingProgress: (data) => api.post('/users/progress', data).then(res => res.data),
  
//   getReadingStats: () => api.get('/users/progress/stats').then(res => res.data),
  
//   // ============================================
//   // HELPER METHODS
//   // ============================================
  
//   // Validate image before upload
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
  
//   // Create FormData for avatar upload
//   createAvatarFormData: (file) => {
//     const formData = new FormData();
//     formData.append('avatar', file);
//     // Also append as 'image' for backward compatibility
//     formData.append('image', file);
//     return formData;
//   },
  
//   // Create FormData for file upload
//   createFileFormData: (file, fieldName = 'file') => {
//     const formData = new FormData();
//     formData.append(fieldName, file);
//     return formData;
//   },
  
//   // Format file size for display
//   formatFileSize: (bytes) => {
//     if (!bytes) return '0 Bytes';
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   },
  
//   // ============================================
//   // ADDITIONAL HELPER METHODS FOR FAVORITES
//   // ============================================
  
//   // Get favorite icon color based on type
//   getFavoriteIconColor: (isFavorited) => {
//     return isFavorited ? '#ef4444' : '#9ca3af';
//   },
  
//   // Format favorite response for UI
//   formatFavoriteResponse: (response, type, id) => {
//     if (response.success) {
//       return {
//         isFavorited: response.data?.isFavorited || response.data?.added || false,
//         type,
//         id,
//         message: response.message
//       };
//     }
//     return {
//       isFavorited: false,
//       type,
//       id,
//       message: response.message || 'Operation failed'
//     };
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
  // FAVORITES MANAGEMENT - ENHANCED
  // ============================================
  
  // Get all favorites (optionally filtered by type)
  // type can be: 'poems', 'books', 'audio', 'videos', or undefined for all
  getFavorites: async (type) => {
    try {
      const url = type ? `/users/favorites?type=${type}` : '/users/favorites';
      console.log('getFavorites URL:', url);
      const response = await api.get(url);
      console.log('getFavorites raw response:', response);
      console.log('getFavorites response.data:', response.data);
      
      // Ensure we return a consistent structure
      if (response.data) {
        // If the response has success property, return as is
        if (response.data.success !== undefined) {
          return response.data;
        }
        // Otherwise wrap it in a success response
        return {
          success: true,
          data: response.data,
          message: 'Favorites retrieved successfully'
        };
      }
      
      return {
        success: false,
        data: null,
        message: 'No data received'
      };
    } catch (error) {
      console.error('getFavorites error:', error);
      throw error;
    }
  },
  
  // Get favorites with counts
  getFavoritesWithCounts: async () => {
    const response = await userAPI.getFavorites();
    return response;
  },
  
  // Add item to favorites
  // data should be: { type: 'books', id: 'bookId' }
  addToFavorites: async (data) => {
    try {
      const response = await api.post('/users/favorites', data);
      console.log('addToFavorites response:', response.data);
      return response.data;
    } catch (error) {
      console.error('addToFavorites error:', error);
      throw error;
    }
  },
  
  // Remove item from favorites
  removeFromFavorites: async (type, id) => {
    try {
      const response = await api.delete(`/users/favorites/${type}/${id}`);
      console.log('removeFromFavorites response:', response.data);
      return response.data;
    } catch (error) {
      console.error('removeFromFavorites error:', error);
      throw error;
    }
  },
  
  // Toggle favorite (add if not favorited, remove if favorited)
  toggleFavorite: async (type, id) => {
    try {
      // First check if it's already favorited
      const checkResult = await userAPI.isFavorited(type, id);
      
      if (checkResult.success && checkResult.data?.isFavorited) {
        // Remove from favorites
        return await userAPI.removeFromFavorites(type, id);
      } else {
        // Add to favorites
        return await userAPI.addToFavorites({ type, id });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  },
  
  // Check if content is favorited
  isFavorited: async (type, id) => {
    try {
      const response = await api.get(`/users/favorites/${type}/${id}/check`);
      console.log('isFavorited response:', response.data);
      return response.data;
    } catch (error) {
      console.error('isFavorited error:', error);
      throw error;
    }
  },
  
  // Get all favorites counts by type
  getFavoritesCount: async () => {
    try {
      const response = await api.get('/users/favorites/count');
      console.log('getFavoritesCount response:', response.data);
      return response.data;
    } catch (error) {
      console.error('getFavoritesCount error:', error);
      throw error;
    }
  },
  
  // Get favorites by specific type with pagination
  getFavoritesByType: async (type, page = 1, limit = 20) => {
    const response = await userAPI.getFavorites(type);
    return response;
  },
  
  // Bulk check favorites (for multiple items at once)
  bulkCheckFavorites: async (items) => {
    // items should be array of { type, id }
    try {
      const response = await api.post('/users/favorites/bulk-check', { items });
      console.log('bulkCheckFavorites response:', response.data);
      return response.data;
    } catch (error) {
      console.error('bulkCheckFavorites error:', error);
      throw error;
    }
  },
  
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
  
  // Remove a single download
  removeDownload: (id) => api.delete(`/users/downloads/${id}`).then(res => res.data),
  
  // Bulk remove downloads
  bulkRemoveDownloads: (ids) => api.post('/users/downloads/bulk-delete', { ids }).then(res => res.data),
  
  // Clear all downloads
  clearDownloads: () => api.delete('/users/downloads/all').then(res => res.data),
  
  // Download file - gets download URL info
  downloadFile: async (contentType, contentId) => {
    const response = await api.get(`/users/downloads/${contentType}/${contentId}`);
    return response.data;
  },
  
  // Check if content is already downloaded
  isDownloaded: (contentType, contentId) => api.get(`/users/downloads/${contentType}/${contentId}/check`).then(res => res.data),
  
  // Get download stats
  getDownloadStats: () => api.get('/users/downloads/stats').then(res => res.data),
  
  // Helper to trigger actual file download after getting URL
  triggerDownload: (downloadUrl, fileName) => {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName || 'download';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
  
  // Combined method: get download info and trigger download
  downloadAndSave: async (contentType, contentId, fileName) => {
    try {
      const result = await userAPI.downloadFile(contentType, contentId);
      if (result.success && result.data?.downloadUrl) {
        userAPI.triggerDownload(result.data.downloadUrl, fileName || result.data.title);
        return result;
      }
      throw new Error('No download URL received');
    } catch (error) {
      console.error('Download failed:', error);
      throw error;
    }
  },
  
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
  },
  
  // ============================================
  // ADDITIONAL HELPER METHODS FOR FAVORITES
  // ============================================
  
  // Get favorite icon color based on type
  getFavoriteIconColor: (isFavorited) => {
    return isFavorited ? '#ef4444' : '#9ca3af';
  },
  
  // Format favorite response for UI
  formatFavoriteResponse: (response, type, id) => {
    if (response && response.success) {
      return {
        isFavorited: response.data?.isFavorited || response.data?.added || false,
        type,
        id,
        message: response.message || (response.data?.isFavorited ? 'Added to favorites' : 'Removed from favorites')
      };
    }
    return {
      isFavorited: false,
      type,
      id,
      message: response?.message || 'Operation failed'
    };
  },
  
  // Parse favorites data from API response (handles different response structures)
  parseFavoritesData: (response) => {
    if (!response) return { favorites: [], counts: { poems: 0, books: 0, audio: 0, videos: 0, total: 0 } };
    
    let favorites = [];
    let counts = { poems: 0, books: 0, audio: 0, videos: 0, total: 0 };
    
    if (response.success && response.data) {
      const data = response.data;
      
      if (Array.isArray(data)) {
        favorites = data;
      } else if (data.poems || data.books || data.audio || data.videos) {
        // Object with type keys
        favorites = data;
        if (data.counts) {
          counts = data.counts;
        }
      } else if (data.data && Array.isArray(data.data)) {
        favorites = data.data;
      }
    } else if (Array.isArray(response)) {
      favorites = response;
    } else if (response.data && Array.isArray(response.data)) {
      favorites = response.data;
    }
    
    return { favorites, counts };
  }
}

export default userAPI








