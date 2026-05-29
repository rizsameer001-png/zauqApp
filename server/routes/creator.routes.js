import express from 'express';
import { protect, creatorOnly } from '../middleware/auth.js';
import {
  getCreatorDashboard,
  getCreatorContent,
  getCreatorStats,
  getCreatorRevenue,
  getCreatorFollowers,
  updateCreatorProfile,
  getUploadStatus,
  getCreatorAnalytics
} from '../controllers/creator.controller.js';

const router = express.Router();

router.get('/dashboard', protect, creatorOnly, getCreatorDashboard);
router.get('/content', protect, creatorOnly, getCreatorContent);
router.get('/stats', protect, creatorOnly, getCreatorStats);
router.get('/revenue', protect, creatorOnly, getCreatorRevenue);
router.get('/followers', protect, creatorOnly, getCreatorFollowers);
router.get('/analytics', protect, creatorOnly, getCreatorAnalytics);
router.get('/upload-status', protect, creatorOnly, getUploadStatus);
router.put('/profile', protect, creatorOnly, updateCreatorProfile);

export default router;
