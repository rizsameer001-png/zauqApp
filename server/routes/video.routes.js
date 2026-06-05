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
//   getVideoSubtitles
// } from '../controllers/video.controller.js';

// const router = express.Router();

// router.get('/', cacheMiddleware(300), getVideos);
// router.get('/featured', cacheMiddleware(600), getFeaturedVideos);
// router.get('/:slug', optionalAuth, getVideoBySlug);
// router.get('/:slug/stream', getVideoStream);
// router.get('/:slug/subtitles', getVideoSubtitles);

// router.post('/', protect, [
//   body('title').trim().notEmpty(),
//   body('type').isIn(['mushaira', 'interview', 'documentary', 'lecture', 'performance', 'other']),
//   body('videoUrl').notEmpty()
// ], createVideo);

// router.put('/:id', protect, updateVideo);
// router.delete('/:id', protect, deleteVideo);

// export default router;







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
//   getVideoSubtitles
// } from '../controllers/video.controller.js';

// const router = express.Router();

// router.get('/', cacheMiddleware(300), getVideos);
// router.get('/featured', cacheMiddleware(600), getFeaturedVideos);
// router.get('/:slug', optionalAuth, getVideoBySlug);
// router.get('/:slug/stream', getVideoStream);
// router.get('/:slug/subtitles', getVideoSubtitles);

// router.post('/', protect, [
//   body('title').trim().notEmpty(),
//   body('type').isIn(['mushaira', 'interview', 'documentary', 'lecture', 'performance', 'other']),
//   body('videoUrl').notEmpty()
// ], createVideo);

// router.put('/:id', protect, updateVideo);
// router.delete('/:id', protect, deleteVideo);

// export default router;














// server/routes/video.routes.js
import express from 'express';
import { body } from 'express-validator';
import { protect, optionalAuth } from '../middleware/auth.js';
import { cacheMiddleware } from '../middleware/cache.js';
import {
  getVideos,
  getVideoBySlug,
  createVideo,
  updateVideo,
  deleteVideo,
  getFeaturedVideos,
  getVideoStream,
  getVideoSubtitles,
  bulkCreateVideos
} from '../controllers/video.controller.js';

const router = express.Router();

// Public routes
router.get('/', cacheMiddleware(300), getVideos);
router.get('/featured', cacheMiddleware(600), getFeaturedVideos);
router.get('/:slug', optionalAuth, getVideoBySlug);
router.get('/:slug/stream', getVideoStream);
router.get('/:slug/subtitles', getVideoSubtitles);

// Admin routes
router.post('/', protect, [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('type').isIn(['mushaira', 'interview', 'documentary', 'lecture', 'performance', 'other']),
  body('videoUrl').notEmpty().withMessage('Video URL is required')
], createVideo);

router.post('/bulk', protect, [
  body('videos').isArray().withMessage('videos must be an array')
], bulkCreateVideos);

router.put('/:id', protect, updateVideo);
router.delete('/:id', protect, deleteVideo);

export default router;
