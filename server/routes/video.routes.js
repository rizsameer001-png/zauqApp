

// // server/routes/video.routes.js
// import express from 'express';
// import { body } from 'express-validator';
// import { protect, optionalAuth } from '../middleware/auth.js';
// import { cacheMiddleware } from '../middleware/cache.js';
// import {
//   getVideos,
//   getVideoBySlug,
//   createVideo,
//   updateVideo,
//   deleteVideo,
//   getFeaturedVideos,
//   getVideoStream,
//   getVideoSubtitles,
//   bulkCreateVideos
// } from '../controllers/video.controller.js';

// const router = express.Router();

// // Public routes
// router.get('/', cacheMiddleware(300), getVideos);
// router.get('/featured', cacheMiddleware(600), getFeaturedVideos);
// router.get('/:slug', optionalAuth, getVideoBySlug);
// router.get('/:slug/stream', getVideoStream);
// router.get('/:slug/subtitles', getVideoSubtitles);

// // Admin routes
// router.post('/', protect, [
//   body('title').trim().notEmpty().withMessage('Title is required'),
//   body('type').isIn(['mushaira', 'interview', 'documentary', 'lecture', 'performance', 'other']),
//   body('videoUrl').notEmpty().withMessage('Video URL is required')
// ], createVideo);

// router.post('/bulk', protect, [
//   body('videos').isArray().withMessage('videos must be an array')
// ], bulkCreateVideos);

// router.put('/:id', protect, updateVideo);
// router.delete('/:id', protect, deleteVideo);

// export default router;

















// //Original routes remain unchanged at /api/videos/
// //New creator routes at /api/videos/creator/
// // server/routes/video.routes.js
// import express from 'express';
// import { body } from 'express-validator';
// import { protect, optionalAuth, creatorOrHigher } from '../middleware/auth.js';
// import { cacheMiddleware } from '../middleware/cache.js';
// import {
//   getVideos,
//   getVideoBySlug,
//   createVideo,
//   updateVideo,
//   deleteVideo,
//   getFeaturedVideos,
//   getVideoStream,
//   getVideoSubtitles,
//   bulkCreateVideos
// } from '../controllers/video.controller.js';

// // Import creator video controllers
// import {
//   uploadCreatorVideo,
//   publishVideo,
//   unpublishVideo,
//   getCreatorVideosList,
//   getCreatorVideoById,
//   updateCreatorVideo,
//   deleteCreatorVideo,
//   bulkDeleteCreatorVideos,
//   getVideoPresets,
//   getVideoStatistics
// } from '../controllers/creator.video.controller.js';

// import { uploadVideoWithThumbnail, handleUploadError } from '../middleware/upload.js';

// const router = express.Router();

// // ============================================
// // PUBLIC ROUTES (Unchanged)
// // ============================================
// router.get('/', cacheMiddleware(300), getVideos);
// router.get('/featured', cacheMiddleware(600), getFeaturedVideos);
// router.get('/:slug', optionalAuth, getVideoBySlug);
// router.get('/:slug/stream', getVideoStream);
// router.get('/:slug/subtitles', getVideoSubtitles);

// // ============================================
// // ADMIN ROUTES (Unchanged)
// // ============================================
// router.post('/', protect, [
//   body('title').trim().notEmpty().withMessage('Title is required'),
//   body('type').isIn(['mushaira', 'interview', 'documentary', 'lecture', 'performance', 'other']),
//   body('videoUrl').notEmpty().withMessage('Video URL is required')
// ], createVideo);

// router.post('/bulk', protect, [
//   body('videos').isArray().withMessage('videos must be an array')
// ], bulkCreateVideos);

// router.put('/:id', protect, updateVideo);
// router.delete('/:id', protect, deleteVideo);

// // ============================================
// // CREATOR ROUTES (NEW - Non-breaking)
// // ============================================
// router.use('/creator', protect, creatorOrHigher);

// // Upload & Publish
// router.post(
//   '/creator/upload',
//   uploadVideoWithThumbnail,
//   handleUploadError,
//   uploadCreatorVideo
// );

// router.patch('/creator/:id/publish', publishVideo);
// router.patch('/creator/:id/unpublish', unpublishVideo);

// // List & Statistics
// router.get('/creator', getCreatorVideosList);
// router.get('/creator/presets', getVideoPresets);
// router.get('/creator/statistics', getVideoStatistics);

// // Single Video Operations
// router.get('/creator/:id', getCreatorVideoById);
// router.put('/creator/:id', updateCreatorVideo);
// router.delete('/creator/:id', deleteCreatorVideo);

// // Bulk Operations
// router.post('/creator/bulk-delete', bulkDeleteCreatorVideos);

// export default router;








// server/routes/video.routes.js
import express from 'express';
import { protect, creatorOnly } from '../middleware/auth.js';
import {
  uploadCreatorVideo,
  getCreatorVideos,
  getCreatorPresets,
  getCreatorStatistics,
  getCreatorVideo,
  updateCreatorVideo,
  deleteCreatorVideo,
  publishCreatorVideo,
  unpublishCreatorVideo,
  bulkDeleteCreatorVideos,
  getVideoAnalytics
} from '../controllers/creator.video.controller.js';

const router = express.Router();

// ============================================
// PUBLIC VIDEO ROUTES
// ============================================
// Add your public video routes here

// ============================================
// CREATOR VIDEO ROUTES
// ============================================
router.post('/creator/upload', protect, creatorOnly, uploadCreatorVideo);
router.get('/creator', protect, creatorOnly, getCreatorVideos);
router.get('/creator/presets', protect, creatorOnly, getCreatorPresets);
router.get('/creator/statistics', protect, creatorOnly, getCreatorStatistics);
router.get('/creator/:id', protect, creatorOnly, getCreatorVideo);
router.put('/creator/:id', protect, creatorOnly, updateCreatorVideo);
router.delete('/creator/:id', protect, creatorOnly, deleteCreatorVideo);
router.patch('/creator/:id/publish', protect, creatorOnly, publishCreatorVideo);
router.patch('/creator/:id/unpublish', protect, creatorOnly, unpublishCreatorVideo);
router.post('/creator/bulk-delete', protect, creatorOnly, bulkDeleteCreatorVideos);
router.get('/creator/:id/analytics', protect, creatorOnly, getVideoAnalytics);

export default router;