// import express from 'express';
// import { body } from 'express-validator';
// import { protect, optionalAuth } from '../middleware/auth.js';
// import { cacheMiddleware } from '../middleware/cache.js';
// import {
//   getAudioItems,
//   getAudioBySlug,
//   createAudio,
//   updateAudio,
//   deleteAudio,
//   getFeaturedAudio,
//   getAudioStream,
//   getAudioTranscript,
//   getPlaylistAudio
// } from '../controllers/audio.controller.js';

// const router = express.Router();

// router.get('/', cacheMiddleware(300), getAudioItems);
// router.get('/featured', cacheMiddleware(600), getFeaturedAudio);
// router.get('/playlist/:playlistId', getPlaylistAudio);
// router.get('/:slug', optionalAuth, getAudioBySlug);
// router.get('/:slug/stream', getAudioStream);
// router.get('/:slug/transcript', getAudioTranscript);

// router.post('/', protect, [
//   body('title').trim().notEmpty(),
//   body('type').isIn(['audiobook', 'mushaira', 'podcast', 'poem_recitation', 'ghazal', 'other']),
//   body('audioUrl').notEmpty()
// ], createAudio);

// router.put('/:id', protect, updateAudio);
// router.delete('/:id', protect, deleteAudio);

// export default router;








// server/routes/audio.routes.js
// import express from 'express';
// import { body } from 'express-validator';
// import { protect, optionalAuth, adminOnly } from '../middleware/auth.js';
// import { cacheMiddleware } from '../middleware/cache.js';
// import {
//   getAudioItems,
//   getAudioBySlug,
//   createAudio,
//   updateAudio,
//   deleteAudio,
//   getFeaturedAudio,
//   getAudioStream,
//   getAudioTranscript,
//   getPlaylistAudio
// } from '../controllers/audio.controller.js';

// const router = express.Router();

// // Public routes
// router.get('/', cacheMiddleware(300), optionalAuth, getAudioItems);
// router.get('/featured', cacheMiddleware(600), getFeaturedAudio);
// router.get('/playlist/:playlistId', getPlaylistAudio);
// router.get('/:slug', optionalAuth, getAudioBySlug);
// router.get('/:slug/stream', optionalAuth, getAudioStream);
// router.get('/:slug/transcript', getAudioTranscript);

// // Admin routes
// router.post('/', protect, adminOnly, [
//   body('title').trim().notEmpty().withMessage('Title is required'),
//   body('type').isIn(['audiobook', 'mushaira', 'podcast', 'poem_recitation', 'ghazal', 'other']),
//   body('audioUrl').notEmpty().withMessage('Audio URL is required')
// ], createAudio);

// router.put('/:id', protect, adminOnly, updateAudio);
// router.delete('/:id', protect, adminOnly, deleteAudio);

// export default router;













// // server/routes/audio.routes.js
// import express from 'express';
// import { body } from 'express-validator';
// import { protect, optionalAuth, adminOnly } from '../middleware/auth.js';
// import { cacheMiddleware } from '../middleware/cache.js';
// import {
//   getAudioItems,
//   getAudioBySlug,
//   getAudioByType,
//   getAudioByOccasion,
//   createAudio,
//   updateAudio,
//   deleteAudio,
//   getFeaturedAudio,
//   getAudioStream,
//   getAudioTranscript,
//   getPlaylistAudio,
//   getAudioStats,
//   likeAudio,
//   bookmarkAudio
// } from '../controllers/audio.controller.js';

// const router = express.Router();

// // Public routes
// router.get('/', cacheMiddleware(300), optionalAuth, getAudioItems);
// router.get('/featured', cacheMiddleware(600), getFeaturedAudio);
// router.get('/stats', getAudioStats);
// router.get('/type/:type', getAudioByType);
// router.get('/occasion/:occasion', getAudioByOccasion);
// router.get('/playlist/:playlistId', getPlaylistAudio);
// router.get('/:slug', optionalAuth, getAudioBySlug);
// router.get('/:slug/stream', optionalAuth, getAudioStream);
// router.get('/:slug/transcript', getAudioTranscript);

// // Protected routes
// router.post('/:id/like', protect, likeAudio);
// router.post('/:id/bookmark', protect, bookmarkAudio);

// // Admin routes
// router.post('/', protect, adminOnly, [
//   body('title').trim().notEmpty().withMessage('Title is required'),
//   body('type').isIn(['nauha', 'marsiya', 'soz', 'salam', 'majlis', 'mushaira', 'podcast', 'poem_recitation', 'ghazal', 'nazm', 'naat', 'hamd', 'manqabat', 'munajat', 'audiobook', 'lecture', 'interview', 'other']),
//   body('audioUrl').notEmpty().withMessage('Audio URL is required')
// ], createAudio);

// router.put('/:id', protect, adminOnly, updateAudio);
// router.delete('/:id', protect, adminOnly, deleteAudio);

// export default router;












// server/routes/audio.routes.js
import express from 'express';
import { body } from 'express-validator';
import { protect, optionalAuth, adminOnly } from '../middleware/auth.js';
import { cacheMiddleware } from '../middleware/cache.js';
import {
  getAudioItems,
  getAudioBySlug,
  getAudioByType,
  getAudioByOccasion,
  createAudio,
  updateAudio,
  deleteAudio,
  getFeaturedAudio,
  getAudioStream,
  getAudioTranscript,
  getPlaylistAudio,
  getAudioStats,
  likeAudio,
  bookmarkAudio,
  unlikeAudio,
  removeBookmarkAudio,
  addToPlaylist,
  removeFromPlaylist,
  getUserPlaylists,
  createPlaylist,
  getRecentlyPlayed,
  getTrendingAudio,
  getPopularByType,
  searchAudio,
  getAudioByAuthor,
  getAudioByTag,
  getRecommendedAudio,
  getSimilarAudio,
  getAudioAnalytics,
  bulkUploadAudio,
  updateAudioMetadata
} from '../controllers/audio.controller.js';

const router = express.Router();

// ============================================
// PUBLIC ROUTES (No authentication required)
// ============================================

// Basic listing and filtering
router.get('/', cacheMiddleware(300), optionalAuth, getAudioItems);
router.get('/featured', cacheMiddleware(600), getFeaturedAudio);
router.get('/stats', getAudioStats);
router.get('/type/:type', getAudioByType);
router.get('/occasion/:occasion', getAudioByOccasion);
router.get('/playlist/:playlistId', getPlaylistAudio);
router.get('/search', searchAudio);
router.get('/trending', getTrendingAudio);
router.get('/popular/:type', getPopularByType);
router.get('/author/:authorId', getAudioByAuthor);
router.get('/tag/:tag', getAudioByTag);

// Single audio routes
router.get('/:slug', optionalAuth, getAudioBySlug);
router.get('/:slug/stream', optionalAuth, getAudioStream);
router.get('/:slug/transcript', getAudioTranscript);
router.get('/:slug/similar', getSimilarAudio);

// ============================================
// PROTECTED ROUTES (Authentication required)
// ============================================

// User interaction (Like/Bookmark)
router.post('/:id/like', protect, likeAudio);
router.delete('/:id/like', protect, unlikeAudio);
router.post('/:id/bookmark', protect, bookmarkAudio);
router.delete('/:id/bookmark', protect, removeBookmarkAudio);

// User playlist management
router.get('/playlists/user', protect, getUserPlaylists);
router.post('/playlists', protect, createPlaylist);
router.post('/:audioId/playlist/:playlistId', protect, addToPlaylist);
router.delete('/:audioId/playlist/:playlistId', protect, removeFromPlaylist);

// User activity and recommendations
router.get('/recent/played', protect, getRecentlyPlayed);
router.get('/recommended', protect, getRecommendedAudio);

// ============================================
// ADMIN ROUTES (Admin only)
// ============================================

// CRUD operations
router.post('/', protect, adminOnly, [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('type').isIn(['nauha', 'marsiya', 'soz', 'salam', 'majlis', 'mushaira', 'podcast', 'poem_recitation', 'ghazal', 'nazm', 'naat', 'hamd', 'manqabat', 'munajat', 'audiobook', 'lecture', 'interview', 'other']),
  body('audioUrl').notEmpty().withMessage('Audio URL is required')
], createAudio);

router.put('/:id', protect, adminOnly, updateAudio);
router.delete('/:id', protect, adminOnly, deleteAudio);

// Admin specific endpoints
router.get('/admin/analytics', protect, adminOnly, getAudioAnalytics);
router.post('/admin/bulk', protect, adminOnly, bulkUploadAudio);
router.patch('/admin/:id/metadata', protect, adminOnly, updateAudioMetadata);

export default router;