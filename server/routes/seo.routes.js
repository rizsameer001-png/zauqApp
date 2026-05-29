import express from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import { cacheMiddleware } from '../middleware/cache.js';
import {
  getSEOMeta,
  updateSEOMeta,
  generateSitemap,
  getRobotsTxt,
  getStructuredData,
  updateStructuredData,
  getSEODashboard
} from '../controllers/seo.controller.js';

const router = express.Router();

router.get('/meta/:page', cacheMiddleware(3600), getSEOMeta);
router.get('/sitemap.xml', generateSitemap);
router.get('/robots.txt', getRobotsTxt);
router.get('/structured-data/:page', getStructuredData);

router.get('/dashboard', protect, adminOnly, getSEODashboard);
router.put('/meta/:page', protect, adminOnly, updateSEOMeta);
router.put('/structured-data/:page', protect, adminOnly, updateStructuredData);

export default router;
