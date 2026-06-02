// server/routes/aiRoutes.js
import express from 'express';
import { protect, optionalAuth } from '../middleware/auth.js';
import { checkAILimit, trackRequest } from '../middleware/rateLimiter.js';
import {
  generatePoemController,
  analyzePoemController,
  getUsageStatsController
} from '../controllers/aiController.js';

const router = express.Router();

// Protected routes with rate limiting
router.post('/generate', protect, checkAILimit, trackRequest, generatePoemController);
router.post('/analyze', protect, checkAILimit, trackRequest, analyzePoemController);
router.get('/usage', protect, getUsageStatsController);

// Optional auth for non-logged in users (limited to 5 requests)
router.post('/generate/public', optionalAuth, checkAILimit, trackRequest, generatePoemController);
router.post('/analyze/public', optionalAuth, checkAILimit, trackRequest, analyzePoemController);

export default router;