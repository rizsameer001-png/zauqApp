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
















// server/routes/homepage.routes.js
import express from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import { cacheMiddleware } from '../middleware/cache.js';
import {
  getHomepageConfig,
  getHomepageData,
  updateSection,
  toggleSection,
  addBanner,
  updateBanner,
  removeBanner,
  updateBanners,
  reorderBanners,
  toggleBannerStatus,
  bulkUploadBanners,
  reorderSections,
  getDailyQuote,
  getFeaturedContent,
  updateFeaturedContent,
  getQuoteSettings,
  updateQuoteSettings,
  getHomepageStats,
  getBanners
} from '../controllers/homepage.controller.js';

const router = express.Router();

// ============== PUBLIC ROUTES (Cached for performance) ==============
router.get('/', cacheMiddleware(300), getHomepageData);
router.get('/daily-quote', cacheMiddleware(3600), getDailyQuote);
router.get('/featured', cacheMiddleware(300), getFeaturedContent);

// ============== ADMIN ROUTES (Protected + Admin Only) ==============

// Config & Stats
router.get('/config', protect, adminOnly, getHomepageConfig);
router.get('/stats', protect, adminOnly, getHomepageStats);

// Section Management
router.put('/sections/:section', protect, adminOnly, updateSection);
router.patch('/sections/:section/toggle', protect, adminOnly, toggleSection);
router.put('/sections/reorder', protect, adminOnly, reorderSections);

// Banner Management (Full CRUD)
router.get('/banners', protect, adminOnly, getBanners);
router.post('/banners', protect, adminOnly, addBanner);
router.post('/banners/bulk', protect, adminOnly, bulkUploadBanners);
router.put('/banners', protect, adminOnly, updateBanners);
router.put('/banners/:id', protect, adminOnly, updateBanner);
router.delete('/banners/:id', protect, adminOnly, removeBanner);
router.post('/banners/reorder', protect, adminOnly, reorderBanners);
router.patch('/banners/:id/toggle', protect, adminOnly, toggleBannerStatus);

// Featured Content Management
router.put('/featured', protect, adminOnly, updateFeaturedContent);

// Quote Settings Management
router.get('/quote-settings', protect, adminOnly, getQuoteSettings);
router.put('/quote-settings', protect, adminOnly, updateQuoteSettings);

// Legacy route (keeping for backward compatibility)
router.put('/reorder', protect, adminOnly, reorderSections);

export default router;