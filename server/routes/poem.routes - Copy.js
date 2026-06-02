// import express from 'express';
// import { body } from 'express-validator';
// import { protect, optionalAuth } from '../middleware/auth.js';
// import { cacheMiddleware, clearCache } from '../middleware/cache.js';
// import {
//   getPoems,
//   getPoemBySlug,
//   createPoem,
//   updatePoem,
//   deletePoem,
//   likePoem,
//   bookmarkPoem,
//   addComment,
//   getFeaturedPoems,
//   getTrendingPoems,
//   getPoemsByAuthor,
//   getAIExplanation,
//   getRelatedPoems
// } from '../controllers/poem.controller.js';

// const router = express.Router();

// router.get('/', cacheMiddleware(300), getPoems);
// router.get('/featured', cacheMiddleware(600), getFeaturedPoems);
// router.get('/trending', cacheMiddleware(300), getTrendingPoems);
// router.get('/author/:authorId', getPoemsByAuthor);
// router.get('/:slug', optionalAuth, getPoemBySlug);
// router.get('/:slug/related', getRelatedPoems);
// router.get('/:slug/ai-explanation', getAIExplanation);

// router.post('/', protect, [
//   body('title').trim().notEmpty(),
//   body('content').trim().notEmpty(),
//   body('author').notEmpty(),
//   body('genre').isIn(['ghazal', 'nazm', 'sher', 'rubai', 'rekhti', 'qasida', 'marsiya', 'other'])
// ], createPoem);

// router.put('/:id', protect, updatePoem);
// router.delete('/:id', protect, deletePoem);

// router.post('/:id/like', protect, likePoem);
// router.post('/:id/bookmark', protect, bookmarkPoem);
// router.post('/:id/comment', protect, [
//   body('text').trim().notEmpty().isLength({ max: 1000 })
// ], addComment);

// export default router;







// // server/routes/poem.routes.js
// import express from 'express';
// import { body } from 'express-validator';
// import { protect, optionalAuth, adminOnly } from '../middleware/auth.js';
// import { cacheMiddleware } from '../middleware/cache.js';
// import {
//   getPoems,
//   getPoemBySlug,
//   createPoem,
//   updatePoem,
//   deletePoem,
//   likePoem,
//   bookmarkPoem,
//   addComment,
//   getFeaturedPoems,
//   getTrendingPoems,
//   getPoemsByAuthor,
//   getAIExplanation,
//   getRelatedPoems
// } from '../controllers/poem.controller.js';

// const router = express.Router();

// // Public routes
// router.get('/', cacheMiddleware(300), optionalAuth, getPoems);
// router.get('/featured', cacheMiddleware(600), getFeaturedPoems);
// router.get('/trending', cacheMiddleware(300), getTrendingPoems);
// router.get('/author/:authorId', getPoemsByAuthor);
// router.get('/:slug', optionalAuth, getPoemBySlug);
// router.get('/:slug/related', getRelatedPoems);
// router.get('/:slug/ai-explanation', getAIExplanation);

// // Protected routes
// router.post('/', protect, [
//   body('title').trim().notEmpty().withMessage('Title is required'),
//   body('content').trim().notEmpty().withMessage('Content is required'),
//   body('author').notEmpty().withMessage('Author is required'),
//   body('genre').isIn(['ghazal', 'nazm', 'sher', 'rubai', 'rekhti', 'qasida', 'marsiya', 'other'])
// ], createPoem);

// router.put('/:id', protect, updatePoem);
// router.delete('/:id', protect, deletePoem);

// router.post('/:id/like', protect, likePoem);
// router.post('/:id/bookmark', protect, bookmarkPoem);
// router.post('/:id/comment', protect, [
//   body('text').trim().notEmpty().isLength({ max: 1000 })
// ], addComment);

// export default router;



// // server/routes/poem.routes.js
// import express from 'express';
// import { body } from 'express-validator';
// import { protect, optionalAuth } from '../middleware/auth.js';
// import { cacheMiddleware } from '../middleware/cache.js';
// import {
//   getPoems,
//   getPoemBySlug,
//   createPoem,
//   updatePoem,
//   deletePoem,
//   likePoem,
//   bookmarkPoem,
//   addComment,
//   getFeaturedPoems,
//   getTrendingPoems,
//   getPoemsByAuthor,
//   getAIExplanation,
//   getRelatedPoems
// } from '../controllers/poem.controller.js';

// const router = express.Router();

// // Public routes
// router.get('/', cacheMiddleware(300), optionalAuth, getPoems);
// router.get('/featured', cacheMiddleware(600), getFeaturedPoems);
// router.get('/trending', cacheMiddleware(300), getTrendingPoems);
// router.get('/author/:authorId', getPoemsByAuthor);
// router.get('/:slug', optionalAuth, getPoemBySlug);
// router.get('/:slug/related', getRelatedPoems);
// router.get('/:slug/ai-explanation', getAIExplanation);

// // Protected routes (require authentication)
// router.post('/', protect, [
//   body('title').trim().notEmpty().withMessage('Title is required'),
//   body('content').trim().notEmpty().withMessage('Content is required'),
//   body('author').notEmpty().withMessage('Author is required'),
//   body('genre').isIn(['ghazal', 'nazm', 'sher', 'rubai', 'rekhti', 'qasida', 'marsiya', 'other'])
// ], createPoem);

// router.put('/:id', protect, updatePoem);
// router.delete('/:id', protect, deletePoem);

// router.post('/:id/like', protect, likePoem);
// router.post('/:id/bookmark', protect, bookmarkPoem);
// router.post('/:id/comment', protect, [
//   body('text').trim().notEmpty().isLength({ max: 1000 })
// ], addComment);

// export default router;












// server/routes/poem.routes.js
import express from 'express';
import { body } from 'express-validator';
import { protect, optionalAuth } from '../middleware/auth.js';
import { cacheMiddleware } from '../middleware/cache.js';
import {
  getPoems,
  getPoemBySlug,
  createPoem,
  updatePoem,
  deletePoem,
  likePoem,
  bookmarkPoem,
  addComment,
  getFeaturedPoems,
  getTrendingPoems,
  getPoemsByAuthor,
  getAIExplanation,
  getRelatedPoems
} from '../controllers/poem.controller.js';

const router = express.Router();

// ============================================
// PUBLIC ROUTES (Using slugs)
// ============================================

// Get all poems with pagination and filters
router.get('/', cacheMiddleware(300), optionalAuth, getPoems);

// Get featured poems
router.get('/featured', cacheMiddleware(600), getFeaturedPoems);

// Get trending poems
router.get('/trending', cacheMiddleware(300), getTrendingPoems);

// Get poems by author ID (still uses authorId from database)
router.get('/author/:authorId', getPoemsByAuthor);

// ============================================
// SLUG-BASED ROUTES (Public)
// ============================================

// Get single poem by slug (NOT by ID)
router.get('/:slug', optionalAuth, getPoemBySlug);

// Get related poems by slug
router.get('/:slug/related', getRelatedPoems);

// Get AI explanation by slug
router.get('/:slug/ai-explanation', getAIExplanation);

// ============================================
// PROTECTED ROUTES (Using slugs for actions)
// ============================================

// Create new poem
router.post('/', protect, [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('genre').isIn(['ghazal', 'nazm', 'sher', 'rubai', 'rekhti', 'qasida', 'marsiya', 'other'])
], createPoem);

// FIXED: Update poem by slug (was using :id, now using :slug)
router.put('/:slug', protect, updatePoem);

// FIXED: Delete poem by slug (was using :id, now using :slug)
router.delete('/:slug', protect, deletePoem);

// FIXED: Like poem by slug (was using :id, now using :slug)
router.post('/:slug/like', protect, likePoem);

// FIXED: Bookmark poem by slug (was using :id, now using :slug)
router.post('/:slug/bookmark', protect, bookmarkPoem);

// FIXED: Add comment by slug (was using :id, now using :slug)
router.post('/:slug/comment', protect, [
  body('text').trim().notEmpty().isLength({ max: 1000 })
], addComment);

export default router;