// //server/routes/author.routes.js
// import express from 'express';
// import { body } from 'express-validator';
// import { protect, optionalAuth } from '../middleware/auth.js';
// import { cacheMiddleware } from '../middleware/cache.js';
// import {
//   getAuthors,
//   getAuthorBySlug,
//   createAuthor,
//   updateAuthor,
//   deleteAuthor,
//   getAuthorPoems,
//   getAuthorBooks,
//   getAuthorAudio,
//   getAuthorVideos,
//   getTrendingAuthors,
//   getFeaturedAuthors,
//   getAuthorTimeline,
//   getAuthorGallery
// } from '../controllers/author.controller.js';

// const router = express.Router();

// router.get('/', cacheMiddleware(300), getAuthors);
// router.get('/trending', cacheMiddleware(600), getTrendingAuthors);
// router.get('/featured', cacheMiddleware(600), getFeaturedAuthors);
// router.get('/:slug', optionalAuth, getAuthorBySlug);
// router.get('/:slug/poems', getAuthorPoems);
// router.get('/:slug/books', getAuthorBooks);
// router.get('/:slug/audio', getAuthorAudio);
// router.get('/:slug/videos', getAuthorVideos);
// router.get('/:slug/timeline', getAuthorTimeline);
// router.get('/:slug/gallery', getAuthorGallery);

// router.post('/', protect, [
//   body('name').trim().notEmpty(),
//   body('bio').trim().notEmpty()
// ], createAuthor);

// router.put('/:id', protect, updateAuthor);
// router.delete('/:id', protect, deleteAuthor);

// export default router;











// // server/routes/author.routes.js
// import express from 'express';
// import { body } from 'express-validator';
// import { protect, optionalAuth, adminOnly } from '../middleware/auth.js';
// import { cacheMiddleware } from '../middleware/cache.js';
// import {
//   // Basic CRUD
//   getAuthors,
//   getAuthorBySlug,
//   createAuthor,
//   updateAuthor,
//   deleteAuthor,
  
//   // Content by author
//   getAuthorPoems,
//   getAuthorBooks,
//   getAuthorAudio,
//   getAuthorVideos,
  
//   // Stats & Lists
//   getTrendingAuthors,
//   getFeaturedAuthors,
//   getAuthorStats,
  
//   // Timeline management
//   getAuthorTimeline,
//   addToTimeline,
//   updateTimelineEntry,
//   removeFromTimeline,
  
//   // Gallery management
//   getAuthorGallery,
//   addToGallery,
//   updateGalleryImage,
//   removeFromGallery,
  
//   // Follow/Unfollow
//   followAuthor,
//   unfollowAuthor,
  
//   // Related authors
//   getRelatedAuthors,
//   addRelatedAuthor,
//   removeRelatedAuthor,
  
//   // Quotes management
//   getAuthorQuotes,
//   addQuote,
//   updateQuote,
//   removeQuote,
  
//   // Social links
//   updateSocialLinks,
  
//   // Search
//   searchAuthors
// } from '../controllers/author.controller.js';

// const router = express.Router();

// // ============================================
// // PUBLIC ROUTES (No authentication required)
// // ============================================

// // Basic listing
// router.get('/', cacheMiddleware(300), getAuthors);
// router.get('/trending', cacheMiddleware(600), getTrendingAuthors);
// router.get('/featured', cacheMiddleware(600), getFeaturedAuthors);
// router.get('/search', searchAuthors);

// // Single author by slug
// router.get('/:slug', optionalAuth, getAuthorBySlug);
// router.get('/:slug/stats', getAuthorStats);

// // Author's content
// router.get('/:slug/poems', getAuthorPoems);
// router.get('/:slug/books', getAuthorBooks);
// router.get('/:slug/audio', getAuthorAudio);
// router.get('/:slug/videos', getAuthorVideos);

// // Author's timeline and gallery
// router.get('/:slug/timeline', getAuthorTimeline);
// router.get('/:slug/gallery', getAuthorGallery);
// router.get('/:slug/quotes', getAuthorQuotes);
// router.get('/:slug/related', getRelatedAuthors);

// // ============================================
// // AUTHENTICATED ROUTES (Login required)
// // ============================================

// // Follow/Unfollow author
// router.post('/:authorId/follow', protect, followAuthor);
// router.delete('/:authorId/follow', protect, unfollowAuthor);

// // ============================================
// // ADMIN ROUTES (Admin only)
// // ============================================

// // Create, update, delete author
// router.post('/', protect, adminOnly, [
//   body('name').trim().notEmpty().withMessage('Name is required'),
//   body('bio').trim().notEmpty().withMessage('Bio is required')
// ], createAuthor);

// router.put('/:id', protect, adminOnly, updateAuthor);
// router.delete('/:id', protect, adminOnly, deleteAuthor);

// // Timeline management
// router.post('/:authorId/timeline', protect, adminOnly, [
//   body('year').isInt({ min: 0, max: new Date().getFullYear() }).withMessage('Valid year is required'),
//   body('event').trim().notEmpty().withMessage('Event is required'),
//   body('description').optional().trim()
// ], addToTimeline);

// router.put('/:authorId/timeline/:timelineId', protect, adminOnly, [
//   body('year').optional().isInt(),
//   body('event').optional().trim(),
//   body('description').optional().trim()
// ], updateTimelineEntry);

// router.delete('/:authorId/timeline/:timelineId', protect, adminOnly, removeFromTimeline);

// // Gallery management
// router.post('/:authorId/gallery', protect, adminOnly, [
//   body('url').isURL().withMessage('Valid image URL is required'),
//   body('caption').optional().trim()
// ], addToGallery);

// router.put('/:authorId/gallery/:imageId', protect, adminOnly, [
//   body('url').optional().isURL(),
//   body('caption').optional().trim()
// ], updateGalleryImage);

// router.delete('/:authorId/gallery/:imageId', protect, adminOnly, removeFromGallery);

// // Quotes management
// router.post('/:authorId/quotes', protect, adminOnly, [
//   body('text').trim().notEmpty().withMessage('Quote text is required'),
//   body('source').optional().trim()
// ], addQuote);

// router.put('/:authorId/quotes/:quoteId', protect, adminOnly, [
//   body('text').optional().trim(),
//   body('source').optional().trim()
// ], updateQuote);

// router.delete('/:authorId/quotes/:quoteId', protect, adminOnly, removeQuote);

// // Related authors management
// router.post('/:authorId/related', protect, adminOnly, [
//   body('relatedAuthorId').isMongoId().withMessage('Valid author ID is required')
// ], addRelatedAuthor);

// router.delete('/:authorId/related/:relatedAuthorId', protect, adminOnly, removeRelatedAuthor);

// // Social links update
// router.put('/:authorId/social-links', protect, adminOnly, [
//   body('website').optional().isURL(),
//   body('twitter').optional().isURL(),
//   body('facebook').optional().isURL(),
//   body('instagram').optional().isURL(),
//   body('youtube').optional().isURL(),
//   body('wikipedia').optional().isURL()
// ], updateSocialLinks);

// export default router;















// server/routes/author.routes.js
import express from 'express';
import { body } from 'express-validator';
import { protect, optionalAuth, adminOnly } from '../middleware/auth.js';
import { cacheMiddleware } from '../middleware/cache.js';
import {
  // Basic CRUD
  getAuthors,
  getAuthorBySlug,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  
  // Content by author
  getAuthorPoems,
  getAuthorBooks,
  getAuthorAudio,
  getAuthorVideos,
  
  // Stats & Lists
  getTrendingAuthors,
  getFeaturedAuthors,
  getAuthorStats,
  
  // Timeline management
  getAuthorTimeline,
  addToTimeline,
  updateTimelineEntry,
  removeFromTimeline,
  
  // Gallery management
  getAuthorGallery,
  addToGallery,
  updateGalleryImage,
  removeFromGallery,
  
  // Follow/Unfollow
  followAuthor,
  unfollowAuthor,
  
  // Related authors
  getRelatedAuthors,
  addRelatedAuthor,
  removeRelatedAuthor,
  
  // Quotes management
  getAuthorQuotes,
  addQuote,
  updateQuote,
  removeQuote,
  
  // Social links
  updateSocialLinks,
  
  // Search
  searchAuthors
} from '../controllers/author.controller.js';

const router = express.Router();

// ============================================
// PUBLIC ROUTES (No authentication required)
// ============================================

// Basic listing
router.get('/', cacheMiddleware(300), getAuthors);
router.get('/trending', cacheMiddleware(600), getTrendingAuthors);
router.get('/featured', cacheMiddleware(600), getFeaturedAuthors);
router.get('/search', searchAuthors);

// ============================================
// SINGLE AUTHOR ROUTES (Using slug for all public routes)
// ============================================

// Get author by slug
router.get('/:slug', optionalAuth, getAuthorBySlug);

// Author stats
router.get('/:slug/stats', getAuthorStats);

// Author's content (all using slug)
router.get('/:slug/poems', getAuthorPoems);
router.get('/:slug/books', getAuthorBooks);
router.get('/:slug/audio', getAuthorAudio);
router.get('/:slug/videos', getAuthorVideos);

// Author's timeline and gallery (using slug)
router.get('/:slug/timeline', getAuthorTimeline);
router.get('/:slug/gallery', getAuthorGallery);
router.get('/:slug/quotes', getAuthorQuotes);
router.get('/:slug/related', getRelatedAuthors);

// ============================================
// AUTHENTICATED ROUTES (Login required)
// ============================================

// Follow/Unfollow author (using id for the target author)
router.post('/:id/follow', protect, followAuthor);
router.delete('/:id/follow', protect, unfollowAuthor);

// ============================================
// ADMIN ROUTES (Admin only)
// ============================================

// Create new author
router.post('/', protect, adminOnly, [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('bio').trim().notEmpty().withMessage('Bio is required')
], createAuthor);

// Update and delete by ID
router.put('/:id', protect, adminOnly, updateAuthor);
router.delete('/:id', protect, adminOnly, deleteAuthor);

// ============================================
// TIMELINE MANAGEMENT (Admin only, using ID)
// ============================================

router.post('/:id/timeline', protect, adminOnly, [
  body('year').isInt({ min: 0, max: new Date().getFullYear() }).withMessage('Valid year is required'),
  body('event').trim().notEmpty().withMessage('Event is required'),
  body('description').optional().trim()
], addToTimeline);

router.put('/:id/timeline/:timelineId', protect, adminOnly, [
  body('year').optional().isInt(),
  body('event').optional().trim(),
  body('description').optional().trim()
], updateTimelineEntry);

router.delete('/:id/timeline/:timelineId', protect, adminOnly, removeFromTimeline);

// ============================================
// GALLERY MANAGEMENT (Admin only, using ID)
// ============================================

router.post('/:id/gallery', protect, adminOnly, [
  body('url').isURL().withMessage('Valid image URL is required'),
  body('caption').optional().trim()
], addToGallery);

router.put('/:id/gallery/:imageId', protect, adminOnly, [
  body('url').optional().isURL(),
  body('caption').optional().trim()
], updateGalleryImage);

router.delete('/:id/gallery/:imageId', protect, adminOnly, removeFromGallery);

// ============================================
// QUOTES MANAGEMENT (Admin only, using ID)
// ============================================

router.post('/:id/quotes', protect, adminOnly, [
  body('text').trim().notEmpty().withMessage('Quote text is required'),
  body('source').optional().trim()
], addQuote);

router.put('/:id/quotes/:quoteId', protect, adminOnly, [
  body('text').optional().trim(),
  body('source').optional().trim()
], updateQuote);

router.delete('/:id/quotes/:quoteId', protect, adminOnly, removeQuote);

// ============================================
// RELATED AUTHORS MANAGEMENT (Admin only, using ID)
// ============================================

router.post('/:id/related', protect, adminOnly, [
  body('relatedAuthorId').isMongoId().withMessage('Valid author ID is required')
], addRelatedAuthor);

router.delete('/:id/related/:relatedAuthorId', protect, adminOnly, removeRelatedAuthor);

// ============================================
// SOCIAL LINKS MANAGEMENT (Admin only, using ID)
// ============================================

router.put('/:id/social-links', protect, adminOnly, [
  body('website').optional().isURL(),
  body('twitter').optional().isURL(),
  body('facebook').optional().isURL(),
  body('instagram').optional().isURL(),
  body('youtube').optional().isURL(),
  body('wikipedia').optional().isURL()
], updateSocialLinks);

export default router;