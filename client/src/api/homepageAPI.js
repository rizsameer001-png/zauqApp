// import api from './apiConfig'

// const homepageAPI = {
//   getHomepageData: () => api.get('/homepage').then(res => res.data),
//   getDailyQuote: () => api.get('/homepage/daily-quote').then(res => res.data),
//   getFeatured: (type) => api.get('/homepage/featured', { params: { type } }).then(res => res.data),
//   getConfig: () => api.get('/homepage/config').then(res => res.data),
//   updateSection: (section, data) => api.put(`/homepage/sections/${section}`, data).then(res => res.data),
//   addBanner: (data) => api.post('/homepage/banners', data).then(res => res.data),
//   removeBanner: (id) => api.delete(`/homepage/banners/${id}`).then(res => res.data),
//   reorderSections: (sections) => api.put('/homepage/reorder', { sections }).then(res => res.data),
// }

// export default homepageAPI









// client/src/api/homepageAPI.js
import api from './apiConfig';

const homepageAPI = {
  // Public routes (no auth required)
  getHomepageData: () => api.get('/homepage').then(res => res.data),
  getDailyQuote: () => api.get('/homepage/daily-quote').then(res => res.data),
  getFeatured: (type) => api.get('/homepage/featured', { params: { type } }).then(res => res.data),
  
  // Admin routes (require authentication)
  getConfig: () => api.get('/homepage/config').then(res => res.data),
  updateConfig: (data) => api.put('/homepage/config', data).then(res => res.data),
  
  // Section management
  updateSection: (section, data) => api.put(`/homepage/sections/${section}`, data).then(res => res.data),
  reorderSections: (sections) => api.put('/homepage/sections/reorder', { sections }).then(res => res.data),
  toggleSection: (section, isActive) => api.patch(`/homepage/sections/${section}/toggle`, { isActive }).then(res => res.data),
  
  // Banner management (Full CRUD)
  getBanners: () => api.get('/homepage/banners').then(res => res.data),
  addBanner: (data) => api.post('/homepage/banners', data).then(res => res.data),
  updateBanner: (id, data) => api.put(`/homepage/banners/${id}`, data).then(res => res.data),
  removeBanner: (id) => api.delete(`/homepage/banners/${id}`).then(res => res.data),
  updateBanners: (banners) => api.put('/homepage/banners', { banners }).then(res => res.data),
  reorderBanners: (orders) => api.post('/homepage/banners/reorder', { orders }).then(res => res.data),
  toggleBannerStatus: (id, isActive) => api.patch(`/homepage/banners/${id}/toggle`, { isActive }).then(res => res.data),
  
  // Bulk upload
  bulkUploadBanners: (banners) => api.post('/homepage/banners/bulk', { banners }).then(res => res.data),
  
  // Featured content management
  updateFeaturedContent: (data) => api.put('/homepage/featured', data).then(res => res.data),
  getFeaturedContent: () => api.get('/homepage/featured/content').then(res => res.data),
  
  // Quote settings
  updateQuoteSettings: (data) => api.put('/homepage/quote-settings', data).then(res => res.data),
  getQuoteSettings: () => api.get('/homepage/quote-settings').then(res => res.data),
  
  // Stats and analytics
  getHomepageStats: () => api.get('/homepage/stats').then(res => res.data),
};

export default homepageAPI;
