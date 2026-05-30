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









// // client/src/api/homepageAPI.js
// import api from './apiConfig';

// const homepageAPI = {
//   // Public routes (no auth required)
//   getHomepageData: () => api.get('/homepage').then(res => res.data),
//   getDailyQuote: () => api.get('/homepage/daily-quote').then(res => res.data),
//   getFeatured: (type) => api.get('/homepage/featured', { params: { type } }).then(res => res.data),
  
//   // Admin routes (require authentication)
//   getConfig: () => api.get('/homepage/config').then(res => res.data),
//   updateConfig: (data) => api.put('/homepage/config', data).then(res => res.data),
  
//   // Section management
//   updateSection: (section, data) => api.put(`/homepage/sections/${section}`, data).then(res => res.data),
//   reorderSections: (sections) => api.put('/homepage/sections/reorder', { sections }).then(res => res.data),
//   toggleSection: (section, isActive) => api.patch(`/homepage/sections/${section}/toggle`, { isActive }).then(res => res.data),
  
//   // Banner management (Full CRUD)
//   getBanners: () => api.get('/homepage/banners').then(res => res.data),
//   addBanner: (data) => api.post('/homepage/banners', data).then(res => res.data),
//   updateBanner: (id, data) => api.put(`/homepage/banners/${id}`, data).then(res => res.data),
//   removeBanner: (id) => api.delete(`/homepage/banners/${id}`).then(res => res.data),
//   updateBanners: (banners) => api.put('/homepage/banners', { banners }).then(res => res.data),
//   reorderBanners: (orders) => api.post('/homepage/banners/reorder', { orders }).then(res => res.data),
//   toggleBannerStatus: (id, isActive) => api.patch(`/homepage/banners/${id}/toggle`, { isActive }).then(res => res.data),
  
//   // Bulk upload
//   bulkUploadBanners: (banners) => api.post('/homepage/banners/bulk', { banners }).then(res => res.data),
  
//   // Featured content management
//   updateFeaturedContent: (data) => api.put('/homepage/featured', data).then(res => res.data),
//   getFeaturedContent: () => api.get('/homepage/featured/content').then(res => res.data),
  
//   // Quote settings
//   updateQuoteSettings: (data) => api.put('/homepage/quote-settings', data).then(res => res.data),
//   getQuoteSettings: () => api.get('/homepage/quote-settings').then(res => res.data),
  
//   // Stats and analytics
//   getHomepageStats: () => api.get('/homepage/stats').then(res => res.data),
// };

// export default homepageAPI;













// client/src/api/homepageAPI.js
import api from './apiConfig';

const homepageAPI = {
  // ============================================
  // PUBLIC ROUTES (No authentication required)
  // ============================================
  
  // Get complete homepage data
  getHomepageData: () => api.get('/homepage').then(res => res.data),
  
  // Get daily quote
  getDailyQuote: () => api.get('/homepage/daily-quote').then(res => res.data),
  
  // Get featured content by type (poems, authors, books, audio, videos)
  getFeatured: (type) => api.get('/homepage/featured', { params: { type } }).then(res => res.data),
  
  // Get public banners (only active ones)
  getPublicBanners: () => api.get('/homepage/banners').then(res => res.data),
  
  // Get public config (only active sections)
  getPublicConfig: () => api.get('/homepage/config').then(res => res.data),
  
  // ============================================
  // ADMIN ROUTES (Authentication required)
  // ============================================
  
  // Config management
  getConfig: () => api.get('/homepage/config').then(res => res.data),
  getAdminConfig: () => api.get('/homepage/admin/config').then(res => res.data),
  updateConfig: (data) => api.put('/homepage/config', data).then(res => res.data),
  
  // Section management
  updateSection: (section, data) => api.put(`/homepage/admin/sections/${section}`, data).then(res => res.data),
  toggleSection: (section, isActive) => api.patch(`/homepage/admin/sections/${section}/toggle`, { isActive }).then(res => res.data),
  reorderSections: (sections) => api.put('/homepage/admin/sections/reorder', { sections }).then(res => res.data),
  
  // Banner management (Full CRUD)
  getBanners: () => api.get('/homepage/admin/banners').then(res => res.data),
  getBannerById: (id) => api.get(`/homepage/admin/banners/${id}`).then(res => res.data),
  addBanner: (data) => api.post('/homepage/admin/banners', data).then(res => res.data),
  updateBanner: (id, data) => api.put(`/homepage/admin/banners/${id}`, data).then(res => res.data),
  removeBanner: (id) => api.delete(`/homepage/admin/banners/${id}`).then(res => res.data),
  updateBanners: (banners) => api.put('/homepage/admin/banners', { banners }).then(res => res.data),
  reorderBanners: (orders) => api.post('/homepage/admin/banners/reorder', { orders }).then(res => res.data),
  toggleBannerStatus: (id, isActive) => api.patch(`/homepage/admin/banners/${id}/toggle`, { isActive }).then(res => res.data),
  
  // Bulk upload banners
  bulkUploadBanners: (banners) => api.post('/homepage/admin/banners/bulk', { banners }).then(res => res.data),
  
  // Featured content management
  getFeaturedContent: () => api.get('/homepage/admin/featured').then(res => res.data),
  updateFeaturedContent: (data) => api.put('/homepage/admin/featured', data).then(res => res.data),
  
  // Quote settings
  getQuoteSettings: () => api.get('/homepage/admin/quote-settings').then(res => res.data),
  updateQuoteSettings: (data) => api.put('/homepage/admin/quote-settings', data).then(res => res.data),
  
  // Stats and analytics
  getHomepageStats: () => api.get('/homepage/admin/stats').then(res => res.data),
  
  // ============================================
  // LEGACY ROUTES (Backward compatibility)
  // Deprecated - use admin routes instead
  // ============================================
  
  // Legacy config endpoints
  getLegacyConfig: () => api.get('/homepage/config/admin').then(res => res.data),
  
  // Legacy banner endpoints (without /admin prefix - will be deprecated)
  getLegacyBanners: () => api.get('/homepage/banners/admin').then(res => res.data),
  addLegacyBanner: (data) => api.post('/homepage/banners', data).then(res => res.data),
  updateLegacyBanner: (id, data) => api.put(`/homepage/banners/${id}`, data).then(res => res.data),
  removeLegacyBanner: (id) => api.delete(`/homepage/banners/${id}`).then(res => res.data),
  updateLegacyBanners: (banners) => api.put('/homepage/banners', { banners }).then(res => res.data),
  toggleLegacyBannerStatus: (id, isActive) => api.patch(`/homepage/banners/${id}/toggle`, { isActive }).then(res => res.data),
  reorderLegacyBanners: (orders) => api.post('/homepage/banners/reorder', { orders }).then(res => res.data),
  bulkUploadLegacyBanners: (banners) => api.post('/homepage/banners/bulk', { banners }).then(res => res.data),
  
  // Legacy section endpoints
  updateLegacySection: (section, data) => api.put(`/homepage/sections/${section}`, data).then(res => res.data),
  toggleLegacySection: (section, isActive) => api.patch(`/homepage/sections/${section}/toggle`, { isActive }).then(res => res.data),
  reorderLegacySections: (sections) => api.put('/homepage/sections/reorder', { sections }).then(res => res.data),
  
  // Legacy featured content endpoint
  updateLegacyFeaturedContent: (data) => api.put('/homepage/featured', data).then(res => res.data),
  
  // Legacy quote settings endpoints
  getLegacyQuoteSettings: () => api.get('/homepage/quote-settings').then(res => res.data),
  updateLegacyQuoteSettings: (data) => api.put('/homepage/quote-settings', data).then(res => res.data),
};

export default homepageAPI;
