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














// // client/src/api/settingsAPI.js
// import api from './apiConfig';

// const settingsAPI = {
//   // ============================================
//   // ADMIN SETTINGS (Requires authentication)
//   // ============================================
  
//   // Get all settings
//   getSettings: () => api.get('/admin/settings').then(res => res.data),
  
//   // ============================================
//   // 🔴 FIX 1: Update settings with proper async/await and error handling
//   // ============================================
//   updateSettings: async (data) => {
//     try {
//       console.log('🔵 Sending update request to /admin/settings:', data);
//       const response = await api.put('/admin/settings', data);
//       console.log('🟢 Update response:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('🔴 Update settings error:', error);
//       console.error('🔴 Error response:', error.response?.data);
//       throw error;
//     }
//   },
  
//   // Reset settings to defaults
//   resetSettings: () => api.post('/admin/settings/reset').then(res => res.data),
  
//   // ============================================
//   // MAINTENANCE MODE
//   // ============================================
  
//   // Get maintenance status (admin)
//   getMaintenanceStatus: () => api.get('/admin/settings/maintenance').then(res => res.data),
  
//   // 🔴 FIX 2: Update maintenance mode with async/await
//   updateMaintenanceMode: async (enabled, message) => {
//     const response = await api.put('/admin/settings/maintenance', { enabled, message });
//     return response.data;
//   },
  
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
  
//   // 🔴 FIX 3: Generate API key with async/await
//   generateApiKey: async (name) => {
//     const response = await api.post('/admin/settings/api-keys', { name });
//     return response.data;
//   },
  
//   // 🔴 FIX 4: Delete API key with async/await
//   deleteApiKey: async (keyId) => {
//     const response = await api.delete(`/admin/settings/api-keys/${keyId}`);
//     return response.data;
//   },
  
//   // ============================================
//   // PUBLIC SETTINGS (No authentication required)
//   // ============================================
  
//   // 🔴 FIX 5: Get public settings with async/await
//   getPublicSettings: async () => {
//     const response = await api.get('/settings/public');
//     return response.data;
//   },
  
//   // 🔴 FIX 6: Get theme settings with async/await
//   getThemeSettings: async () => {
//     const response = await api.get('/settings/theme');
//     return response.data;
//   },
  
//   // 🔴 FIX 7: Get SEO settings with async/await
//   getSeoSettings: async () => {
//     const response = await api.get('/settings/seo');
//     return response.data;
//   },
  
//   // 🔴 FIX 8: Get social settings with async/await
//   getSocialSettings: async () => {
//     const response = await api.get('/settings/social');
//     return response.data;
//   },
  
//   // 🔴 FIX 9: Get footer settings with async/await
//   getFooterSettings: async () => {
//     const response = await api.get('/settings/footer');
//     return response.data;
//   },
  
//   // 🔴 FIX 10: Get announcement settings with async/await
//   getAnnouncementSettings: async () => {
//     const response = await api.get('/settings/announcement');
//     return response.data;
//   },
  
//   // ============================================
//   // HELPER METHODS
//   // ============================================
  
//   // Test email configuration
//   testEmailConfig: async (data) => {
//     const response = await api.post('/admin/settings/test-email', data);
//     return response.data;
//   },
  
//   // Test payment gateway configuration
//   testPaymentGateway: async (gateway) => {
//     const response = await api.post('/admin/settings/test-payment', { gateway });
//     return response.data;
//   },
  
//   // Clear cache
//   clearCache: async () => {
//     const response = await api.post('/admin/settings/clear-cache');
//     return response.data;
//   },
  
//   // Get system health status
//   getSystemHealth: async () => {
//     const response = await api.get('/admin/settings/health');
//     return response.data;
//   },
  
//   // Backup settings
//   backupSettings: async () => {
//     const response = await api.post('/admin/settings/backup');
//     return response.data;
//   },
  
//   // Restore settings from backup
//   restoreSettings: async (backupId) => {
//     const response = await api.post('/admin/settings/restore', { backupId });
//     return response.data;
//   },
// };

// export default settingsAPI;



















// // client/src/api/settingsAPI.js
// import api from './apiConfig';

// const settingsAPI = {
//   // ============================================
//   // ADMIN SETTINGS (Requires authentication)
//   // ============================================
  
//   // Get all settings
//   getSettings: async () => {
//     try {
//       console.log('🔵 [API] Fetching settings from /admin/settings');
//       const response = await api.get('/admin/settings');
//       console.log('🟢 [API] Settings fetched:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('🔴 [API] Get settings error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Update settings
//   updateSettings: async (data) => {
//     try {
//       console.log('🔵 [API] Sending update request to /admin/settings');
//       console.log('🔵 [API] Request data:', JSON.stringify(data, null, 2));
//       const response = await api.put('/admin/settings', data);
//       console.log('🟢 [API] Update response:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('🔴 [API] Update settings error:', error.response?.data || error.message);
//       console.error('🔴 [API] Error status:', error.response?.status);
//       console.error('🔴 [API] Error data:', error.response?.data);
//       throw error;
//     }
//   },
  
//   // Reset settings to defaults
//   resetSettings: async () => {
//     try {
//       console.log('🔵 [API] Resetting settings');
//       const response = await api.post('/admin/settings/reset');
//       console.log('🟢 [API] Reset response:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('🔴 [API] Reset settings error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // MAINTENANCE MODE
//   // ============================================
  
//   getMaintenanceStatus: async () => {
//     const response = await api.get('/admin/settings/maintenance');
//     return response.data;
//   },
  
//   updateMaintenanceMode: async (enabled, message) => {
//     const response = await api.put('/admin/settings/maintenance', { enabled, message });
//     return response.data;
//   },
  
//   getPublicMaintenanceStatus: async () => {
//     const response = await api.get('/settings/maintenance/public');
//     return response.data;
//   },
  
//   // ============================================
//   // FILE UPLOADS
//   // ============================================
  
//   uploadLogo: async (file, type) => {
//     const formData = new FormData();
//     formData.append('logo', file);
//     const response = await api.post(`/admin/settings/logo/${type}`, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });
//     return response.data;
//   },
  
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
  
//   generateApiKey: async (name) => {
//     const response = await api.post('/admin/settings/api-keys', { name });
//     return response.data;
//   },
  
//   deleteApiKey: async (keyId) => {
//     const response = await api.delete(`/admin/settings/api-keys/${keyId}`);
//     return response.data;
//   },
  
//   // ============================================
//   // PUBLIC SETTINGS (No authentication required)
//   // ============================================
  
//   getPublicSettings: async () => {
//     const response = await api.get('/settings/public');
//     return response.data;
//   },
  
//   getThemeSettings: async () => {
//     const response = await api.get('/settings/theme');
//     return response.data;
//   },
  
//   getSeoSettings: async () => {
//     const response = await api.get('/settings/seo');
//     return response.data;
//   },
  
//   getSocialSettings: async () => {
//     const response = await api.get('/settings/social');
//     return response.data;
//   },
  
//   getFooterSettings: async () => {
//     const response = await api.get('/settings/footer');
//     return response.data;
//   },
  
//   getAnnouncementSettings: async () => {
//     const response = await api.get('/settings/announcement');
//     return response.data;
//   },
  
//   // ============================================
//   // HELPER METHODS
//   // ============================================
  
//   testEmailConfig: async (data) => {
//     const response = await api.post('/admin/settings/test-email', data);
//     return response.data;
//   },
  
//   testPaymentGateway: async (gateway) => {
//     const response = await api.post('/admin/settings/test-payment', { gateway });
//     return response.data;
//   },
  
//   clearCache: async () => {
//     const response = await api.post('/admin/settings/clear-cache');
//     return response.data;
//   },
  
//   getSystemHealth: async () => {
//     const response = await api.get('/admin/settings/health');
//     return response.data;
//   },
  
//   backupSettings: async () => {
//     const response = await api.post('/admin/settings/backup');
//     return response.data;
//   },
  
//   restoreSettings: async (backupId) => {
//     const response = await api.post('/admin/settings/restore', { backupId });
//     return response.data;
//   },
// };

// export default settingsAPI;















// // client/src/api/settingsAPI.js

// import api from './apiConfig';

// const extract = (res) => res.data?.data ?? res.data;

// const settingsAPI = {

//   // ============================================
//   // ADMIN SETTINGS
//   // ============================================

//   getSettings: async () => {
//     try {
//       console.log('🔵 Fetching settings...');
//       const res = await api.get('/admin/settings');
//       return extract(res); // ✅ FIX
//     } catch (error) {
//       console.error('❌ Get settings error:', error.response?.data || error.message);
//       throw error;
//     }
//   },

//   updateSettings: async (data) => {
//     try {
//       const res = await api.put('/admin/settings', data);
//       return extract(res); // ✅ FIX
//     } catch (error) {
//       console.error('❌ Update error:', error.response?.data || error.message);
//       throw error;
//     }
//   },

//   resetSettings: async () => {
//     try {
//       const res = await api.post('/admin/settings/reset');
//       return extract(res); // ✅ FIX
//     } catch (error) {
//       console.error('❌ Reset error:', error.response?.data || error.message);
//       throw error;
//     }
//   },

//   // ============================================
//   // MAINTENANCE
//   // ============================================

//   getMaintenanceStatus: async () => {
//     const res = await api.get('/admin/settings/maintenance');
//     return extract(res);
//   },

//   updateMaintenanceMode: async (enabled, message) => {
//     const res = await api.put('/admin/settings/maintenance', { enabled, message });
//     return extract(res);
//   },

//   getPublicMaintenanceStatus: async () => {
//     const res = await api.get('/settings/maintenance/public');
//     return extract(res);
//   },

//   // ============================================
//   // FILE UPLOADS
//   // ============================================

//   uploadLogo: async (file, type) => {
//     const formData = new FormData();
//     formData.append('logo', file);

//     const res = await api.post(`/admin/settings/logo/${type}`, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });

//     return extract(res);
//   },

//   uploadBanner: async (file) => {
//     const formData = new FormData();
//     formData.append('banner', file);

//     const res = await api.post('/admin/settings/banner', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });

//     return extract(res);
//   },

//   // ============================================
//   // API KEYS
//   // ============================================

//   generateApiKey: async (name) => {
//     const res = await api.post('/admin/settings/api-keys', { name });
//     return extract(res);
//   },

//   deleteApiKey: async (keyId) => {
//     const res = await api.delete(`/admin/settings/api-keys/${keyId}`);
//     return extract(res);
//   },

//   // ============================================
//   // PUBLIC SETTINGS
//   // ============================================

//   getPublicSettings: async () => {
//     const res = await api.get('/settings/public');
//     return extract(res);
//   },

//   getThemeSettings: async () => {
//     const res = await api.get('/settings/theme');
//     return extract(res);
//   },

//   getSeoSettings: async () => {
//     const res = await api.get('/settings/seo');
//     return extract(res);
//   },

//   getSocialSettings: async () => {
//     const res = await api.get('/settings/social');
//     return extract(res);
//   },

//   getFooterSettings: async () => {
//     const res = await api.get('/settings/footer');
//     return extract(res);
//   },

//   getAnnouncementSettings: async () => {
//     const res = await api.get('/settings/announcement');
//     return extract(res);
//   },

//   // ============================================
//   // HELPERS
//   // ============================================

//   testEmailConfig: async (data) => {
//     const res = await api.post('/admin/settings/test-email', data);
//     return extract(res);
//   },

//   testPaymentGateway: async (gateway) => {
//     const res = await api.post('/admin/settings/test-payment', { gateway });
//     return extract(res);
//   },

//   clearCache: async () => {
//     const res = await api.post('/admin/settings/clear-cache');
//     return extract(res);
//   },

//   getSystemHealth: async () => {
//     const res = await api.get('/admin/settings/health');
//     return extract(res);
//   },

//   backupSettings: async () => {
//     const res = await api.post('/admin/settings/backup');
//     return extract(res);
//   },

//   restoreSettings: async (backupId) => {
//     const res = await api.post('/admin/settings/restore', { backupId });
//     return extract(res);
//   },

// };

// export default settingsAPI;














// client/src/api/settingsAPI.js
import api from './apiConfig';

const extract = (res) => res.data?.data ?? res.data;

const settingsAPI = {

  // ============================================
  // ADMIN SETTINGS (NEW - Using /app-settings endpoint)
  // ============================================

  getSettings: async () => {
    try {
      console.log('🔵 Fetching settings from /app-settings...');
      const res = await api.get('/app-settings');
      console.log('🟢 Settings fetched:', res.data);
      return extract(res);
    } catch (error) {
      console.error('❌ Get settings error:', error.response?.data || error.message);
      throw error;
    }
  },

  updateSettings: async (data) => {
    try {
      console.log('🔵 Updating settings via /app-settings...');
      console.log('🔵 Data being sent:', data);
      const res = await api.put('/app-settings', data);
      console.log('🟢 Update response:', res.data);
      return extract(res);
    } catch (error) {
      console.error('❌ Update error:', error.response?.data || error.message);
      throw error;
    }
  },

  resetSettings: async () => {
    try {
      const res = await api.post('/app-settings/reset');
      return extract(res);
    } catch (error) {
      console.error('❌ Reset error:', error.response?.data || error.message);
      throw error;
    }
  },

  // Get single setting by key
  getSettingByKey: async (key) => {
    try {
      const res = await api.get(`/app-settings/${key}`);
      return extract(res);
    } catch (error) {
      console.error(`❌ Get setting ${key} error:`, error.response?.data || error.message);
      throw error;
    }
  },

  // Update single setting by key
  updateSettingByKey: async (key, value) => {
    try {
      const res = await api.put(`/app-settings/${key}`, { value });
      return extract(res);
    } catch (error) {
      console.error(`❌ Update setting ${key} error:`, error.response?.data || error.message);
      throw error;
    }
  },

  // ============================================
  // MAINTENANCE
  // ============================================

  getMaintenanceStatus: async () => {
    try {
      const settings = await settingsAPI.getSettings();
      return {
        maintenanceMode: settings.maintenanceMode || false,
        maintenanceMessage: settings.maintenanceMessage || 'Site is under maintenance. Please check back later.'
      };
    } catch (error) {
      console.error('❌ Get maintenance status error:', error);
      throw error;
    }
  },

  updateMaintenanceMode: async (enabled, message) => {
    try {
      const res = await settingsAPI.updateSettings({
        maintenanceMode: enabled,
        maintenanceMessage: message
      });
      return res;
    } catch (error) {
      console.error('❌ Update maintenance mode error:', error);
      throw error;
    }
  },

  getPublicMaintenanceStatus: async () => {
    try {
      const res = await api.get('/settings/maintenance/public');
      return extract(res);
    } catch (error) {
      console.error('❌ Get public maintenance status error:', error);
      throw error;
    }
  },

  // ============================================
  // FILE UPLOADS (Using new endpoint)
  // ============================================

  uploadLogo: async (file, type) => {
    const formData = new FormData();
    formData.append('logo', file);

    const res = await api.post(`/app-settings/upload/${type}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    return extract(res);
  },

  uploadBanner: async (file) => {
    const formData = new FormData();
    formData.append('banner', file);

    const res = await api.post('/admin/settings/banner', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    return extract(res);
  },

  // ============================================
  // API KEYS (Using new endpoint)
  // ============================================

  generateApiKey: async (name) => {
    const res = await api.post('/app-settings/api-keys', { name });
    return extract(res);
  },

  deleteApiKey: async (keyId) => {
    const res = await api.delete(`/app-settings/api-keys/${keyId}`);
    return extract(res);
  },

  // ============================================
  // PUBLIC SETTINGS (No change - these work)
  // ============================================

  getPublicSettings: async () => {
    const res = await api.get('/settings/public');
    return extract(res);
  },

  getThemeSettings: async () => {
    const res = await api.get('/settings/theme');
    return extract(res);
  },

  getSeoSettings: async () => {
    const res = await api.get('/settings/seo');
    return extract(res);
  },

  getSocialSettings: async () => {
    const res = await api.get('/settings/social');
    return extract(res);
  },

  getFooterSettings: async () => {
    const res = await api.get('/settings/footer');
    return extract(res);
  },

  getAnnouncementSettings: async () => {
    const res = await api.get('/settings/announcement');
    return extract(res);
  },

  // ============================================
  // HELPERS (Keep as is)
  // ============================================

  testEmailConfig: async (data) => {
    const res = await api.post('/admin/settings/test-email', data);
    return extract(res);
  },

  testPaymentGateway: async (gateway) => {
    const res = await api.post('/admin/settings/test-payment', { gateway });
    return extract(res);
  },

  clearCache: async () => {
    const res = await api.post('/admin/settings/clear-cache');
    return extract(res);
  },

  getSystemHealth: async () => {
    const res = await api.get('/admin/settings/health');
    return extract(res);
  },

  backupSettings: async () => {
    const res = await api.post('/admin/settings/backup');
    return extract(res);
  },

  restoreSettings: async (backupId) => {
    const res = await api.post('/admin/settings/restore', { backupId });
    return extract(res);
  },

};

export default settingsAPI;