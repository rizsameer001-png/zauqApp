// // client/src/api/settingsAPI.js
// import api from './apiConfig';

// const settingsAPI = {
//   // Get all settings
//   getSettings: () => api.get('/admin/settings').then(res => res.data),
  
//   // Update settings
//   updateSettings: (data) => api.put('/admin/settings', data).then(res => res.data),
  
//   // Reset settings to defaults
//   resetSettings: () => api.post('/admin/settings/reset').then(res => res.data),
  
//   // Get maintenance status
//   getMaintenanceStatus: () => api.get('/admin/settings/maintenance').then(res => res.data),
  
//   // Update maintenance mode
//   updateMaintenanceMode: (enabled) => api.put('/admin/settings/maintenance', { enabled }).then(res => res.data),
  
//   // Upload logo
//   uploadLogo: (file, type) => {
//     const formData = new FormData();
//     formData.append('logo', file);
//     return api.post(`/admin/settings/logo/${type}`, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     }).then(res => res.data);
//   },
  
//   // Upload banner
//   uploadBanner: (file) => {
//     const formData = new FormData();
//     formData.append('banner', file);
//     return api.post('/admin/settings/banner', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     }).then(res => res.data);
//   }
// };

// export default settingsAPI;










// // client/src/api/settingsAPI.js
// import api from './apiConfig';

// const settingsAPI = {
//   // ============================================
//   // GENERAL SETTINGS
//   // ============================================
  
//   // Get all settings
//   getSettings: () => api.get('/admin/settings').then(res => res.data),
  
//   // Update settings
//   updateSettings: (data) => api.put('/admin/settings', data).then(res => res.data),
  
//   // Reset settings to defaults
//   resetSettings: () => api.post('/admin/settings/reset').then(res => res.data),
  
//   // ============================================
//   // MAINTENANCE MODE
//   // ============================================
  
//   // Get maintenance status
//   getMaintenanceStatus: () => api.get('/admin/settings/maintenance').then(res => res.data),
  
//   // Update maintenance mode
//   updateMaintenanceMode: (enabled, message) => api.put('/admin/settings/maintenance', { enabled, message }).then(res => res.data),
  
//   // ============================================
//   // FILE UPLOADS
//   // ============================================
  
//   // Upload logo or favicon
//   uploadLogo: async (file, type) => {
//     const formData = new FormData();
//     formData.append('logo', file);
//     const response = await api.post(`/admin/settings/logo/${type}`, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });
//     return response.data;
//   },
  
//   // Upload banner
//   uploadBanner: async (file) => {
//     const formData = new FormData();
//     formData.append('banner', file);
//     const response = await api.post('/admin/settings/banner', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });
//     return response.data;
//   },
  
//   // ============================================
//   // API KEY MANAGEMENT
//   // ============================================
  
//   // Generate new API key
//   generateApiKey: (name) => api.post('/admin/settings/api-keys', { name }).then(res => res.data),
  
//   // Delete API key
//   deleteApiKey: (keyId) => api.delete(`/admin/settings/api-keys/${keyId}`).then(res => res.data),
  
//   // ============================================
//   // HELPER METHODS
//   // ============================================
  
//   // Test email configuration
//   testEmailConfig: (data) => api.post('/admin/settings/test-email', data).then(res => res.data),
  
//   // Test payment gateway configuration
//   testPaymentGateway: (gateway) => api.post('/admin/settings/test-payment', { gateway }).then(res => res.data),
  
//   // Clear cache
//   clearCache: () => api.post('/admin/settings/clear-cache').then(res => res.data),
  
//   // Get system health status
//   getSystemHealth: () => api.get('/admin/settings/health').then(res => res.data),
  
//   // Backup settings
//   backupSettings: () => api.post('/admin/settings/backup').then(res => res.data),
  
//   // Restore settings from backup
//   restoreSettings: (backupId) => api.post('/admin/settings/restore', { backupId }).then(res => res.data),
  
//   // ============================================
//   // PUBLIC SETTINGS (No auth required)
//   // ============================================
  
//   // Get public settings (for frontend)
//   getPublicSettings: () => api.get('/settings/public').then(res => res.data),
  
//   // Get theme settings
//   getThemeSettings: () => api.get('/settings/theme').then(res => res.data)
// };

// export default settingsAPI;










// // client/src/api/settingsAPI.js
// import api from './apiConfig';

// const settingsAPI = {
//   // ============================================
//   // GENERAL SETTINGS
//   // ============================================
  
//   // Get all settings
//   getSettings: () => api.get('/admin/settings').then(res => res.data),
  
//   // Update settings
//   updateSettings: (data) => api.put('/admin/settings', data).then(res => res.data),
  
//   // Reset settings to defaults
//   resetSettings: () => api.post('/admin/settings/reset').then(res => res.data),
  
//   // ============================================
//   // MAINTENANCE MODE
//   // ============================================
  
//   // Get maintenance status
//   getMaintenanceStatus: () => api.get('/admin/settings/maintenance').then(res => res.data),
  
//   // Update maintenance mode
//   updateMaintenanceMode: (enabled, message) => api.put('/admin/settings/maintenance', { enabled, message }).then(res => res.data),
  
//   // ============================================
//   // FILE UPLOADS
//   // ============================================
  
//   // Upload logo or favicon
//   uploadLogo: async (file, type) => {
//     const formData = new FormData();
//     formData.append('logo', file);
//     const response = await api.post(`/admin/settings/logo/${type}`, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });
//     return response.data;
//   },
  
//   // Upload banner
//   uploadBanner: async (file) => {
//     const formData = new FormData();
//     formData.append('banner', file);
//     const response = await api.post('/admin/settings/banner', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });
//     return response.data;
//   },
  
//   // ============================================
//   // API KEY MANAGEMENT
//   // ============================================
  
//   // Generate new API key
//   generateApiKey: (name) => api.post('/admin/settings/api-keys', { name }).then(res => res.data),
  
//   // Delete API key
//   deleteApiKey: (keyId) => api.delete(`/admin/settings/api-keys/${keyId}`).then(res => res.data),
  
//   // ============================================
//   // HELPER METHODS
//   // ============================================
  
//   // Test email configuration
//   testEmailConfig: (data) => api.post('/admin/settings/test-email', data).then(res => res.data),
  
//   // Test payment gateway configuration
//   testPaymentGateway: (gateway) => api.post('/admin/settings/test-payment', { gateway }).then(res => res.data),
  
//   // Clear cache
//   clearCache: () => api.post('/admin/settings/clear-cache').then(res => res.data),
  
//   // Get system health status
//   getSystemHealth: () => api.get('/admin/settings/health').then(res => res.data),
  
//   // Backup settings
//   backupSettings: () => api.post('/admin/settings/backup').then(res => res.data),
  
//   // Restore settings from backup
//   restoreSettings: (backupId) => api.post('/admin/settings/restore', { backupId }).then(res => res.data),
  
//   // ============================================
//   // PUBLIC SETTINGS (No auth required)
//   // ============================================
  
//   // Get public settings (for frontend - navbar, footer, etc.)
//   getPublicSettings: () => api.get('/settings/public').then(res => res.data),
  
//   // Get theme settings (colors, fonts for frontend)
//   getThemeSettings: () => api.get('/settings/theme').then(res => res.data),
  
//   // Get SEO settings (meta tags for pages)
//   getSeoSettings: () => api.get('/settings/seo').then(res => res.data),
  
//   // Get social media settings
//   getSocialSettings: () => api.get('/settings/social').then(res => res.data),
  
//   // Get footer settings
//   getFooterSettings: () => api.get('/settings/footer').then(res => res.data),
  
//   // Get announcement/notice settings
//   getAnnouncementSettings: () => api.get('/settings/announcement').then(res => res.data)
// };

// export default settingsAPI;














// // client/src/api/settingsAPI.js
// import api from './apiConfig';

// const settingsAPI = {
//   // ============================================
//   // ADMIN SETTINGS (Requires authentication)
//   // ============================================
  
//   // Get all settings
//   getSettings: () => api.get('/admin/settings').then(res => res.data),
  
//   // Update settings
//   updateSettings: (data) => api.put('/admin/settings', data).then(res => res.data),
  
//   // Reset settings to defaults
//   resetSettings: () => api.post('/admin/settings/reset').then(res => res.data),
  
//   // ============================================
//   // MAINTENANCE MODE
//   // ============================================
  
//   // Get maintenance status (admin)
//   getMaintenanceStatus: () => api.get('/admin/settings/maintenance').then(res => res.data),
  
//   // Update maintenance mode
//   updateMaintenanceMode: (enabled, message) => api.put('/admin/settings/maintenance', { enabled, message }).then(res => res.data),
  
//   // Get maintenance status (public - no auth)
//   getPublicMaintenanceStatus: () => api.get('/settings/maintenance/public').then(res => res.data),
  
//   // ============================================
//   // FILE UPLOADS
//   // ============================================
  
//   // Upload logo or favicon
//   uploadLogo: async (file, type) => {
//     const formData = new FormData();
//     formData.append('logo', file);
//     const response = await api.post(`/admin/settings/logo/${type}`, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });
//     return response.data;
//   },
  
//   // Upload banner
//   uploadBanner: async (file) => {
//     const formData = new FormData();
//     formData.append('banner', file);
//     const response = await api.post('/admin/settings/banner', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });
//     return response.data;
//   },
  
//   // ============================================
//   // API KEY MANAGEMENT
//   // ============================================
  
//   // Generate new API key
//   generateApiKey: (name) => api.post('/admin/settings/api-keys', { name }).then(res => res.data),
  
//   // Delete API key
//   deleteApiKey: (keyId) => api.delete(`/admin/settings/api-keys/${keyId}`).then(res => res.data),
  
//   // ============================================
//   // PUBLIC SETTINGS (No authentication required)
//   // ============================================
  
//   // Get public settings (for frontend - navbar, footer, etc.)
//   getPublicSettings: () => api.get('/settings/public').then(res => res.data),
  
//   // Get theme settings (colors, fonts for frontend)
//   getThemeSettings: () => api.get('/settings/theme').then(res => res.data),
  
//   // Get SEO settings (meta tags for pages)
//   getSeoSettings: () => api.get('/settings/seo').then(res => res.data),
  
//   // Get social media settings
//   getSocialSettings: () => api.get('/settings/social').then(res => res.data),
  
//   // Get footer settings
//   getFooterSettings: () => api.get('/settings/footer').then(res => res.data),
  
//   // Get announcement/notice settings
//   getAnnouncementSettings: () => api.get('/settings/announcement').then(res => res.data),
  
//   // ============================================
//   // HELPER METHODS
//   // ============================================
  
//   // Test email configuration
//   testEmailConfig: (data) => api.post('/admin/settings/test-email', data).then(res => res.data),
  
//   // Test payment gateway configuration
//   testPaymentGateway: (gateway) => api.post('/admin/settings/test-payment', { gateway }).then(res => res.data),
  
//   // Clear cache
//   clearCache: () => api.post('/admin/settings/clear-cache').then(res => res.data),
  
//   // Get system health status
//   getSystemHealth: () => api.get('/admin/settings/health').then(res => res.data),
  
//   // Backup settings
//   backupSettings: () => api.post('/admin/settings/backup').then(res => res.data),
  
//   // Restore settings from backup
//   restoreSettings: (backupId) => api.post('/admin/settings/restore', { backupId }).then(res => res.data),
// };

// export default settingsAPI;














// client/src/api/settingsAPI.js
import api from './apiConfig';

const settingsAPI = {
  // ============================================
  // ADMIN SETTINGS (Requires authentication)
  // ============================================
  
  // Get all settings
  getSettings: () => api.get('/admin/settings').then(res => res.data),
  
  // ============================================
  // 🔴 FIX 1: Update settings with proper async/await and error handling
  // ============================================
  updateSettings: async (data) => {
    try {
      console.log('🔵 Sending update request to /admin/settings:', data);
      const response = await api.put('/admin/settings', data);
      console.log('🟢 Update response:', response.data);
      return response.data;
    } catch (error) {
      console.error('🔴 Update settings error:', error);
      console.error('🔴 Error response:', error.response?.data);
      throw error;
    }
  },
  
  // Reset settings to defaults
  resetSettings: () => api.post('/admin/settings/reset').then(res => res.data),
  
  // ============================================
  // MAINTENANCE MODE
  // ============================================
  
  // Get maintenance status (admin)
  getMaintenanceStatus: () => api.get('/admin/settings/maintenance').then(res => res.data),
  
  // 🔴 FIX 2: Update maintenance mode with async/await
  updateMaintenanceMode: async (enabled, message) => {
    const response = await api.put('/admin/settings/maintenance', { enabled, message });
    return response.data;
  },
  
  // Get maintenance status (public - no auth)
  getPublicMaintenanceStatus: () => api.get('/settings/maintenance/public').then(res => res.data),
  
  // ============================================
  // FILE UPLOADS
  // ============================================
  
  // Upload logo or favicon
  uploadLogo: async (file, type) => {
    const formData = new FormData();
    formData.append('logo', file);
    const response = await api.post(`/admin/settings/logo/${type}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },
  
  // Upload banner
  uploadBanner: async (file) => {
    const formData = new FormData();
    formData.append('banner', file);
    const response = await api.post('/admin/settings/banner', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },
  
  // ============================================
  // API KEY MANAGEMENT
  // ============================================
  
  // 🔴 FIX 3: Generate API key with async/await
  generateApiKey: async (name) => {
    const response = await api.post('/admin/settings/api-keys', { name });
    return response.data;
  },
  
  // 🔴 FIX 4: Delete API key with async/await
  deleteApiKey: async (keyId) => {
    const response = await api.delete(`/admin/settings/api-keys/${keyId}`);
    return response.data;
  },
  
  // ============================================
  // PUBLIC SETTINGS (No authentication required)
  // ============================================
  
  // 🔴 FIX 5: Get public settings with async/await
  getPublicSettings: async () => {
    const response = await api.get('/settings/public');
    return response.data;
  },
  
  // 🔴 FIX 6: Get theme settings with async/await
  getThemeSettings: async () => {
    const response = await api.get('/settings/theme');
    return response.data;
  },
  
  // 🔴 FIX 7: Get SEO settings with async/await
  getSeoSettings: async () => {
    const response = await api.get('/settings/seo');
    return response.data;
  },
  
  // 🔴 FIX 8: Get social settings with async/await
  getSocialSettings: async () => {
    const response = await api.get('/settings/social');
    return response.data;
  },
  
  // 🔴 FIX 9: Get footer settings with async/await
  getFooterSettings: async () => {
    const response = await api.get('/settings/footer');
    return response.data;
  },
  
  // 🔴 FIX 10: Get announcement settings with async/await
  getAnnouncementSettings: async () => {
    const response = await api.get('/settings/announcement');
    return response.data;
  },
  
  // ============================================
  // HELPER METHODS
  // ============================================
  
  // Test email configuration
  testEmailConfig: async (data) => {
    const response = await api.post('/admin/settings/test-email', data);
    return response.data;
  },
  
  // Test payment gateway configuration
  testPaymentGateway: async (gateway) => {
    const response = await api.post('/admin/settings/test-payment', { gateway });
    return response.data;
  },
  
  // Clear cache
  clearCache: async () => {
    const response = await api.post('/admin/settings/clear-cache');
    return response.data;
  },
  
  // Get system health status
  getSystemHealth: async () => {
    const response = await api.get('/admin/settings/health');
    return response.data;
  },
  
  // Backup settings
  backupSettings: async () => {
    const response = await api.post('/admin/settings/backup');
    return response.data;
  },
  
  // Restore settings from backup
  restoreSettings: async (backupId) => {
    const response = await api.post('/admin/settings/restore', { backupId });
    return response.data;
  },
};

export default settingsAPI;