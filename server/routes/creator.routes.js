// import express from 'express';
// import { protect, creatorOnly } from '../middleware/auth.js';
// import {
//   getCreatorDashboard,
//   getCreatorContent,
//   getCreatorStats,
//   getCreatorRevenue,
//   getCreatorFollowers,
//   updateCreatorProfile,
//   getUploadStatus,
//   getCreatorAnalytics
// } from '../controllers/creator.controller.js';

// const router = express.Router();

// router.get('/dashboard', protect, creatorOnly, getCreatorDashboard);
// router.get('/content', protect, creatorOnly, getCreatorContent);
// router.get('/stats', protect, creatorOnly, getCreatorStats);
// router.get('/revenue', protect, creatorOnly, getCreatorRevenue);
// router.get('/followers', protect, creatorOnly, getCreatorFollowers);
// router.get('/analytics', protect, creatorOnly, getCreatorAnalytics);
// router.get('/upload-status', protect, creatorOnly, getUploadStatus);
// router.put('/profile', protect, creatorOnly, updateCreatorProfile);

// export default router;




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
  getCreatorAnalytics,
  getCreatorPoems,
  getCreatorBooks,
  getCreatorAudio,
  getCreatorVideos,
  bulkDeleteContent,
  bulkUpdateStatus,
  getContentAnalytics,
  getTopContent,
  getEarningReports,
  getUploadPresets,
  validateFile
} from '../controllers/creator.controller.js';

const router = express.Router();

// ============================================
// MAIN CREATOR ROUTES
// ============================================
router.get('/dashboard', protect, creatorOnly, getCreatorDashboard);
router.get('/content', protect, creatorOnly, getCreatorContent);
router.get('/stats', protect, creatorOnly, getCreatorStats);
router.get('/revenue', protect, creatorOnly, getCreatorRevenue);
router.get('/followers', protect, creatorOnly, getCreatorFollowers);
router.get('/analytics', protect, creatorOnly, getCreatorAnalytics);
router.get('/upload-status', protect, creatorOnly, getUploadStatus);
router.put('/profile', protect, creatorOnly, updateCreatorProfile);

// ============================================
// CONTENT TYPE SPECIFIC ROUTES
// ============================================
router.get('/poems', protect, creatorOnly, getCreatorPoems);
router.get('/books', protect, creatorOnly, getCreatorBooks);
router.get('/audio', protect, creatorOnly, getCreatorAudio);
router.get('/videos', protect, creatorOnly, getCreatorVideos);

// ============================================
// BULK OPERATIONS
// ============================================
router.post('/bulk-delete', protect, creatorOnly, bulkDeleteContent);
router.post('/bulk-update-status', protect, creatorOnly, bulkUpdateStatus);

// ============================================
// ANALYTICS & REPORTS
// ============================================
router.get('/content-analytics', protect, creatorOnly, getContentAnalytics);
router.get('/top-content', protect, creatorOnly, getTopContent);
router.get('/earning-reports', protect, creatorOnly, getEarningReports);

// ============================================
// UPLOAD UTILITIES
// ============================================
router.get('/upload-presets', protect, creatorOnly, getUploadPresets);
router.post('/validate-file', protect, creatorOnly, validateFile);

export default router;