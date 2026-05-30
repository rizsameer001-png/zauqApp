// import express from 'express';
// import { protect, adminOnly } from '../middleware/auth.js';
// import { cacheMiddleware } from '../middleware/cache.js';
// import {
//   getHomepageConfig,
//   getHomepageData,
//   updateSection,
//   addBanner,
//   removeBanner,
//   reorderSections,
//   getDailyQuote,
//   getFeaturedContent
// } from '../controllers/homepage.controller.js';

// const router = express.Router();

// router.get('/', cacheMiddleware(300), getHomepageData);
// router.get('/config', protect, adminOnly, getHomepageConfig);
// router.get('/daily-quote', cacheMiddleware(3600), getDailyQuote);
// router.get('/featured', cacheMiddleware(300), getFeaturedContent);

// router.put('/sections/:section', protect, adminOnly, updateSection);
// router.post('/banners', protect, adminOnly, addBanner);
// router.delete('/banners/:id', protect, adminOnly, removeBanner);
// router.put('/reorder', protect, adminOnly, reorderSections);

// export default router;
















// // server/routes/homepage.routes.js
// import express from 'express';
// import { protect, adminOnly } from '../middleware/auth.js';
// import { cacheMiddleware } from '../middleware/cache.js';
// import {
//   getHomepageConfig,
//   getHomepageData,
//   updateSection,
//   toggleSection,
//   addBanner,
//   updateBanner,
//   removeBanner,
//   updateBanners,
//   reorderBanners,
//   toggleBannerStatus,
//   bulkUploadBanners,
//   reorderSections,
//   getDailyQuote,
//   getFeaturedContent,
//   updateFeaturedContent,
//   getQuoteSettings,
//   updateQuoteSettings,
//   getHomepageStats,
//   getBanners
// } from '../controllers/homepage.controller.js';

// const router = express.Router();

// // ============== PUBLIC ROUTES (Cached for performance) ==============
// router.get('/', cacheMiddleware(300), getHomepageData);
// router.get('/daily-quote', cacheMiddleware(3600), getDailyQuote);
// router.get('/featured', cacheMiddleware(300), getFeaturedContent);

// // ============== ADMIN ROUTES (Protected + Admin Only) ==============

// // Config & Stats
// router.get('/config', protect, adminOnly, getHomepageConfig);
// router.get('/stats', protect, adminOnly, getHomepageStats);

// // Section Management
// router.put('/sections/:section', protect, adminOnly, updateSection);
// router.patch('/sections/:section/toggle', protect, adminOnly, toggleSection);
// router.put('/sections/reorder', protect, adminOnly, reorderSections);

// // Banner Management (Full CRUD)
// router.get('/banners', protect, adminOnly, getBanners);
// router.post('/banners', protect, adminOnly, addBanner);
// router.post('/banners/bulk', protect, adminOnly, bulkUploadBanners);
// router.put('/banners', protect, adminOnly, updateBanners);
// router.put('/banners/:id', protect, adminOnly, updateBanner);
// router.delete('/banners/:id', protect, adminOnly, removeBanner);
// router.post('/banners/reorder', protect, adminOnly, reorderBanners);
// router.patch('/banners/:id/toggle', protect, adminOnly, toggleBannerStatus);

// // Featured Content Management
// router.put('/featured', protect, adminOnly, updateFeaturedContent);

// // Quote Settings Management
// router.get('/quote-settings', protect, adminOnly, getQuoteSettings);
// router.put('/quote-settings', protect, adminOnly, updateQuoteSettings);

// // Legacy route (keeping for backward compatibility)
// router.put('/reorder', protect, adminOnly, reorderSections);

// export default router;















// // server/routes/homepage.routes.js
// import express from 'express';
// import { protect, adminOnly } from '../middleware/auth.js';
// import {
//   // Public routes (no authentication)
//   getHomepageData,
//   getDailyQuote,
//   getFeaturedContent,
//   getPublicBanners,
//   getPublicConfig,
//   getHomepageConfig,
//   // Admin routes (require authentication)
//   getAllBannersCMS,
//   getHomepageConfigCMS,
//   updateSection,
//   toggleSection,
//   reorderSections,
//   addBanner,
//   updateBanner,
//   removeBanner,
//   updateBanners,
//   reorderBanners,
//   toggleBannerStatus,
//   bulkUploadBanners,
//   updateFeaturedContent,
//   updateQuoteSettings,
//   getQuoteSettings,
//   getHomepageStats
// } from '../controllers/homepage.controller.js';

// const router = express.Router();

// // ============================================
// // PUBLIC ROUTES - No authentication required
// // ============================================
// router.get('/', getHomepageData);
// router.get('/daily-quote', getDailyQuote);
// router.get('/featured', getFeaturedContent);
// router.get('/banners', getPublicBanners);
// router.get('/config', getPublicConfig);

// // ============================================
// // ADMIN ROUTES - Authentication + Admin role required
// // ============================================
// router.get('/admin/banners', protect, adminOnly, getAllBannersCMS);
// router.get('/admin/config', protect, adminOnly, getHomepageConfigCMS);
// router.get('/admin/quote-settings', protect, adminOnly, getQuoteSettings);
// router.get('/admin/stats', protect, adminOnly, getHomepageStats);

// // Section management
// router.put('/admin/sections/:section', protect, adminOnly, updateSection);
// router.patch('/admin/sections/:section/toggle', protect, adminOnly, toggleSection);
// router.put('/admin/sections/reorder', protect, adminOnly, reorderSections);

// // Banner management
// router.post('/admin/banners', protect, adminOnly, addBanner);
// router.post('/admin/banners/bulk', protect, adminOnly, bulkUploadBanners);
// router.put('/admin/banners', protect, adminOnly, updateBanners);
// router.put('/admin/banners/:id', protect, adminOnly, updateBanner);
// router.delete('/admin/banners/:id', protect, adminOnly, removeBanner);
// router.post('/admin/banners/reorder', protect, adminOnly, reorderBanners);
// router.patch('/admin/banners/:id/toggle', protect, adminOnly, toggleBannerStatus);

// // Featured content
// router.put('/admin/featured', protect, adminOnly, updateFeaturedContent);

// // Quote settings
// router.put('/admin/quote-settings', protect, adminOnly, updateQuoteSettings);

// export default router;















// server/routes/homepage.routes.js
import express from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import {
  // Public routes (no authentication)
  getHomepageData,
  getDailyQuote,
  getFeaturedContent,
  getPublicBanners,
  getPublicConfig,
  // Admin routes (require authentication)
  getHomepageConfig,
  getHomepageConfigCMS,
  getHomepageStats,
  // Section management
  updateSection,
  toggleSection,
  reorderSections,
  // Banner management
  getAllBannersCMS,
  getBannerById,
  addBanner,
  updateBanner,
  removeBanner,
  updateBanners,
  reorderBanners,
  toggleBannerStatus,
  bulkUploadBanners,
  // Featured content
  updateFeaturedContent,
  getFeaturedContentCMS,
  // Quote settings
  getQuoteSettings,
  updateQuoteSettings
} from '../controllers/homepage.controller.js';

const router = express.Router();

// ============================================
// PUBLIC ROUTES - No authentication required
// ============================================

// Main homepage data
router.get('/', getHomepageData);

// Daily quote
router.get('/daily-quote', getDailyQuote);

// Featured content (public)
router.get('/featured', getFeaturedContent);

// Public banners (only active banners)
router.get('/banners', getPublicBanners);

// Public config (only active sections)
router.get('/config', getPublicConfig);

// ============================================
// ADMIN ROUTES - Authentication + Admin role required
// ============================================

// ===== Config & Stats =====
router.get('/admin/config', protect, adminOnly, getHomepageConfig);
router.get('/admin/config/full', protect, adminOnly, getHomepageConfigCMS);
router.get('/admin/stats', protect, adminOnly, getHomepageStats);

// ===== Section Management =====
router.put('/admin/sections/:section', protect, adminOnly, updateSection);
router.patch('/admin/sections/:section/toggle', protect, adminOnly, toggleSection);
router.put('/admin/sections/reorder', protect, adminOnly, reorderSections);

// ===== Banner Management (Full CRUD) =====

// Get all banners (admin view - includes inactive)
router.get('/admin/banners', protect, adminOnly, getAllBannersCMS);

// Get single banner by ID
router.get('/admin/banners/:id', protect, adminOnly, getBannerById);

// Add new banner
router.post('/admin/banners', protect, adminOnly, addBanner);

// Bulk upload banners
router.post('/admin/banners/bulk', protect, adminOnly, bulkUploadBanners);

// Update all banners (batch update)
router.put('/admin/banners', protect, adminOnly, updateBanners);

// Update single banner by ID
router.put('/admin/banners/:id', protect, adminOnly, updateBanner);

// Delete single banner by ID
router.delete('/admin/banners/:id', protect, adminOnly, removeBanner);

// Reorder banners
router.post('/admin/banners/reorder', protect, adminOnly, reorderBanners);

// Toggle banner active status
router.patch('/admin/banners/:id/toggle', protect, adminOnly, toggleBannerStatus);

// ===== Featured Content Management =====
router.get('/admin/featured', protect, adminOnly, getFeaturedContentCMS);
router.put('/admin/featured', protect, adminOnly, updateFeaturedContent);

// ===== Quote Settings Management =====
router.get('/admin/quote-settings', protect, adminOnly, getQuoteSettings);
router.put('/admin/quote-settings', protect, adminOnly, updateQuoteSettings);

// ============================================
// LEGACY ROUTES (for backward compatibility)
// Keep these for existing frontend code
// ============================================

// Legacy config endpoint (without /admin prefix)
router.get('/config/admin', protect, adminOnly, getHomepageConfig);

// Legacy banner endpoints (without /admin prefix - will be deprecated)
router.get('/banners/admin', protect, adminOnly, getAllBannersCMS);
router.post('/banners', protect, adminOnly, addBanner);
router.put('/banners', protect, adminOnly, updateBanners);
router.put('/banners/:id', protect, adminOnly, updateBanner);
router.delete('/banners/:id', protect, adminOnly, removeBanner);
router.patch('/banners/:id/toggle', protect, adminOnly, toggleBannerStatus);
router.post('/banners/reorder', protect, adminOnly, reorderBanners);
router.post('/banners/bulk', protect, adminOnly, bulkUploadBanners);

// Legacy section endpoints
router.put('/sections/:section', protect, adminOnly, updateSection);
router.patch('/sections/:section/toggle', protect, adminOnly, toggleSection);
router.put('/sections/reorder', protect, adminOnly, reorderSections);

// Legacy featured content endpoint
router.put('/featured', protect, adminOnly, updateFeaturedContent);

// Legacy quote settings endpoint
router.put('/quote-settings', protect, adminOnly, updateQuoteSettings);
router.get('/quote-settings', protect, adminOnly, getQuoteSettings);

export default router;