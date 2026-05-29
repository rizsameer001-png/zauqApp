import express from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import {
  getDashboardStats,
  getUserAnalytics,
  getContentAnalytics,
  getRevenueAnalytics,
  getReadingAnalytics,
  getAIUsageAnalytics,
  trackEvent
} from '../controllers/analytics.controller.js';

const router = express.Router();

router.get('/dashboard', protect, adminOnly, getDashboardStats);
router.get('/users', protect, adminOnly, getUserAnalytics);
router.get('/content', protect, adminOnly, getContentAnalytics);
router.get('/revenue', protect, adminOnly, getRevenueAnalytics);
router.get('/reading', protect, adminOnly, getReadingAnalytics);
router.get('/ai-usage', protect, adminOnly, getAIUsageAnalytics);
router.post('/track', trackEvent);

export default router;
