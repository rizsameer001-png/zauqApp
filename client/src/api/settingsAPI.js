// client/src/api/settingsAPI.js
import api from './apiConfig';

const settingsAPI = {
  // Get all settings
  getSettings: () => api.get('/admin/settings').then(res => res.data),
  
  // Update settings
  updateSettings: (data) => api.put('/admin/settings', data).then(res => res.data),
  
  // Reset settings to defaults
  resetSettings: () => api.post('/admin/settings/reset').then(res => res.data),
  
  // Get maintenance status
  getMaintenanceStatus: () => api.get('/admin/settings/maintenance').then(res => res.data),
  
  // Update maintenance mode
  updateMaintenanceMode: (enabled) => api.put('/admin/settings/maintenance', { enabled }).then(res => res.data),
  
  // Upload logo
  uploadLogo: (file, type) => {
    const formData = new FormData();
    formData.append('logo', file);
    return api.post(`/admin/settings/logo/${type}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data);
  },
  
  // Upload banner
  uploadBanner: (file) => {
    const formData = new FormData();
    formData.append('banner', file);
    return api.post('/admin/settings/banner', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data);
  }
};

export default settingsAPI;