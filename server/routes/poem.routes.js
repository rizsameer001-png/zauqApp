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

// // ============================================
// // PUBLIC ROUTES (Using slugs)
// // ============================================

// // Get all poems with pagination and filters
// router.get('/', cacheMiddleware(300), optionalAuth, getPoems);

// // Get featured poems
// router.get('/featured', cacheMiddleware(600), getFeaturedPoems);

// // Get trending poems
// router.get('/trending', cacheMiddleware(300), getTrendingPoems);

// // Get poems by author ID (still uses authorId from database)
// router.get('/author/:authorId', getPoemsByAuthor);

// // ============================================
// // SLUG-BASED ROUTES (Public)
// // ============================================

// // Get single poem by slug (NOT by ID)
// router.get('/:slug', optionalAuth, getPoemBySlug);

// // Get related poems by slug
// router.get('/:slug/related', getRelatedPoems);

// // Get AI explanation by slug
// router.get('/:slug/ai-explanation', getAIExplanation);

// // ============================================
// // PROTECTED ROUTES (Using slugs for actions)
// // ============================================

// // Create new poem
// router.post('/', protect, [
//   body('title').trim().notEmpty().withMessage('Title is required'),
//   body('content').trim().notEmpty().withMessage('Content is required'),
//   body('author').notEmpty().withMessage('Author is required'),
//   body('genre').isIn(['ghazal', 'nazm', 'sher', 'rubai', 'rekhti', 'qasida', 'marsiya', 'other'])
// ], createPoem);

// // FIXED: Update poem by slug (was using :id, now using :slug)
// router.put('/:slug', protect, updatePoem);

// // FIXED: Delete poem by slug (was using :id, now using :slug)
// router.delete('/:slug', protect, deletePoem);

// // FIXED: Like poem by slug (was using :id, now using :slug)
// router.post('/:slug/like', protect, likePoem);

// // FIXED: Bookmark poem by slug (was using :id, now using :slug)
// router.post('/:slug/bookmark', protect, bookmarkPoem);

// // FIXED: Add comment by slug (was using :id, now using :slug)
// router.post('/:slug/comment', protect, [
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
//   getRelatedPoems,
//   // ============================================
//   // NEW AI FEATURE CONTROLLERS
//   // ============================================
//   getPoemSentiment,
//   getPoemThemes,
//   getAIAnalysis,
//   analyzePoemContent
// } from '../controllers/poem.controller.js';

// const router = express.Router();

// // ============================================
// // PUBLIC ROUTES (Using slugs)
// // ============================================

// // Get all poems with pagination and filters
// router.get('/', cacheMiddleware(300), optionalAuth, getPoems);

// // Get featured poems
// router.get('/featured', cacheMiddleware(600), getFeaturedPoems);

// // Get trending poems
// router.get('/trending', cacheMiddleware(300), getTrendingPoems);

// // Get poems by author ID (still uses authorId from database)
// router.get('/author/:authorId', getPoemsByAuthor);

// // ============================================
// // SLUG-BASED ROUTES (Public)
// // ============================================

// // Get single poem by slug (NOT by ID)
// router.get('/:slug', optionalAuth, getPoemBySlug);

// // Get related poems by slug
// router.get('/:slug/related', getRelatedPoems);

// // Get AI explanation by slug (legacy)
// router.get('/:slug/ai-explanation', getAIExplanation);

// // ============================================
// // AI FEATURE ROUTES (New)
// // ============================================

// // Get sentiment analysis for a poem by slug
// // Example: GET /api/poems/my-poem-slug/sentiment
// router.get('/:slug/sentiment', optionalAuth, getPoemSentiment);

// // Get theme extraction for a poem by slug
// // Example: GET /api/poems/my-poem-slug/themes
// router.get('/:slug/themes', optionalAuth, getPoemThemes);

// // Get full AI literary analysis for a poem by slug
// // Example: GET /api/poems/my-poem-slug/ai-analysis
// router.get('/:slug/ai-analysis', optionalAuth, getAIAnalysis);

// // Analyze poem content directly (for AJAX / real-time analysis)
// // Example: POST /api/poems/analyze-content
// // Body: { poemText: "...", language: "urdu" }
// router.post('/analyze-content', optionalAuth, analyzePoemContent);

// // ============================================
// // PROTECTED ROUTES (Using slugs for actions)
// // ============================================

// // Create new poem
// router.post('/', protect, [
//   body('title').trim().notEmpty().withMessage('Title is required'),
//   body('content').trim().notEmpty().withMessage('Content is required'),
//   body('author').notEmpty().withMessage('Author is required'),
//   body('genre').isIn(['ghazal', 'nazm', 'sher', 'rubai', 'rekhti', 'qasida', 'marsiya', 'other'])
// ], createPoem);

// // Update poem by slug
// router.put('/:slug', protect, updatePoem);

// // Delete poem by slug
// router.delete('/:slug', protect, deletePoem);

// // Like poem by slug
// router.post('/:slug/like', protect, likePoem);

// // Bookmark poem by slug
// router.post('/:slug/bookmark', protect, bookmarkPoem);

// // Add comment by slug
// router.post('/:slug/comment', protect, [
//   body('text').trim().notEmpty().isLength({ max: 1000 })
// ], addComment);

// export default router;















//===============================================

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
//   getRelatedPoems,
//   // ============================================
//   // NEW AI FEATURE CONTROLLERS
//   // ============================================
//   getPoemSentiment,
//   getPoemThemes,
//   getAIAnalysis,
//   analyzePoemContent
// } from '../controllers/poem.controller.js';

// const router = express.Router();

// // ============================================
// // PUBLIC ROUTES (Using slugs)
// // ============================================

// // Get all poems with pagination and filters
// // GET /api/poems?page=1&limit=12&genre=ghazal&language=urdu
// router.get('/', cacheMiddleware(300), optionalAuth, getPoems);

// // Get featured poems
// // GET /api/poems/featured
// router.get('/featured', cacheMiddleware(600), getFeaturedPoems);

// // Get trending poems
// // GET /api/poems/trending?limit=20
// router.get('/trending', cacheMiddleware(300), getTrendingPoems);

// // Get poems by author ID
// // GET /api/poems/author/:authorId
// router.get('/author/:authorId', getPoemsByAuthor);

// // ============================================
// // SLUG-BASED PUBLIC ROUTES
// // ============================================

// // Get single poem by slug
// // GET /api/poems/my-poem-slug
// router.get('/:slug', optionalAuth, getPoemBySlug);

// // Get related poems by slug
// // GET /api/poems/my-poem-slug/related
// router.get('/:slug/related', getRelatedPoems);

// // Get AI explanation by slug (legacy)
// // GET /api/poems/my-poem-slug/ai-explanation
// router.get('/:slug/ai-explanation', getAIExplanation);

// // ============================================
// // NEW AI FEATURE ROUTES
// // ============================================

// // Get sentiment analysis for a poem by slug
// // Example: GET /api/poems/my-poem-slug/sentiment
// // Returns: { sentiment, score, emotions, dominantEmotion, summary }
// router.get('/:slug/sentiment', optionalAuth, getPoemSentiment);

// // Get theme extraction for a poem by slug
// // Example: GET /api/poems/my-poem-slug/themes
// // Returns: { dominant, themes, tags, themeCount }
// router.get('/:slug/themes', optionalAuth, getPoemThemes);

// // Get full AI literary analysis for a poem by slug (MAIN ENDPOINT)
// // Example: GET /api/poems/my-poem-slug/ai-analysis
// // Optional query param: ?refresh=true to force refresh cache
// // Returns: { themes, tone, sentiment, emotions, meaning, literaryDevices, rhymeScheme, difficulty, provider, analyzedAt }
// router.get('/:slug/ai-analysis', optionalAuth, getAIAnalysis);

// // Analyze poem content directly (for AJAX / real-time analysis)
// // Example: POST /api/poems/analyze-content
// // Body: { poemText: "Your poem text here...", language: "urdu" }
// // Returns: { analysis: {...}, provider }
// router.post('/analyze-content', optionalAuth, analyzePoemContent);

// // ============================================
// // PROTECTED ROUTES (Require Authentication)
// // ============================================

// // Create new poem
// // POST /api/poems
// // Body: { title, content, author, genre, language, era, tags, mood, isPublished, isFeatured }
// router.post('/', protect, [
//   body('title').trim().notEmpty().withMessage('Title is required'),
//   body('content').trim().notEmpty().withMessage('Content is required'),
//   body('author').notEmpty().withMessage('Author is required'),
//   body('genre').isIn(['ghazal', 'nazm', 'sher', 'rubai', 'rekhti', 'qasida', 'marsiya', 'other'])
//     .withMessage('Invalid genre'),
//   body('language').optional().isIn(['urdu', 'hindi', 'english', 'persian', 'arabic'])
//     .withMessage('Invalid language'),
//   body('era').optional().isIn(['classical', 'modern', 'contemporary'])
//     .withMessage('Invalid era')
// ], createPoem);

// // Update poem by slug
// // PUT /api/poems/my-poem-slug
// router.put('/:slug', protect, updatePoem);

// // Delete poem by slug
// // DELETE /api/poems/my-poem-slug
// router.delete('/:slug', protect, deletePoem);

// // Like poem by slug
// // POST /api/poems/my-poem-slug/like
// router.post('/:slug/like', protect, likePoem);

// // Bookmark poem by slug
// // POST /api/poems/my-poem-slug/bookmark
// router.post('/:slug/bookmark', protect, bookmarkPoem);

// // Add comment by slug
// // POST /api/poems/my-poem-slug/comment
// // Body: { text: "Your comment here..." }
// router.post('/:slug/comment', protect, [
//   body('text').trim().notEmpty().withMessage('Comment text is required').isLength({ max: 1000 })
// ], addComment);

// // ============================================
// // BULK OPERATIONS (Admin only)
// // ============================================

// // Bulk delete poems (admin only)
// // DELETE /api/poems/bulk
// router.delete('/bulk', protect, async (req, res, next) => {
//   try {
//     if (req.user.role !== 'admin') {
//       return res.status(403).json({ success: false, error: 'Admin access required' });
//     }
    
//     const { ids } = req.body;
//     if (!ids || !Array.isArray(ids) || ids.length === 0) {
//       return res.status(400).json({ success: false, error: 'Please provide an array of poem IDs' });
//     }
    
//     const result = await Poem.deleteMany({ _id: { $in: ids } });
    
//     // Update author stats
//     // This would need additional logic to decrement poem counts
    
//     res.json({
//       success: true,
//       message: `${result.deletedCount} poems deleted successfully`
//     });
//   } catch (error) {
//     console.error('Bulk delete error:', error);
//     next(error);
//   }
// });

// // Bulk publish poems (admin only)
// // PUT /api/poems/bulk/publish
// router.put('/bulk/publish', protect, async (req, res, next) => {
//   try {
//     if (req.user.role !== 'admin') {
//       return res.status(403).json({ success: false, error: 'Admin access required' });
//     }
    
//     const { ids, publish = true } = req.body;
//     if (!ids || !Array.isArray(ids) || ids.length === 0) {
//       return res.status(400).json({ success: false, error: 'Please provide an array of poem IDs' });
//     }
    
//     const updateData = {
//       isPublished: publish,
//       publishedAt: publish ? new Date() : null
//     };
    
//     const result = await Poem.updateMany(
//       { _id: { $in: ids } },
//       { $set: updateData }
//     );
    
//     res.json({
//       success: true,
//       message: `${result.modifiedCount} poems updated successfully`
//     });
//   } catch (error) {
//     console.error('Bulk publish error:', error);
//     next(error);
//   }
// });

// // ============================================
// // STATS ROUTES
// // ============================================

// // Get poem statistics (admin only)
// // GET /api/poems/stats/overview
// router.get('/stats/overview', protect, async (req, res, next) => {
//   try {
//     if (req.user.role !== 'admin') {
//       return res.status(403).json({ success: false, error: 'Admin access required' });
//     }
    
//     const totalPoems = await Poem.countDocuments();
//     const publishedPoems = await Poem.countDocuments({ isPublished: true });
//     const featuredPoems = await Poem.countDocuments({ isFeatured: true });
//     const totalViews = await Poem.aggregate([{ $group: { _id: null, total: { $sum: '$stats.views' } } }]);
//     const totalLikes = await Poem.aggregate([{ $group: { _id: null, total: { $sum: '$stats.likes' } } }]);
    
//     // Poems by genre
//     const poemsByGenre = await Poem.aggregate([
//       { $group: { _id: '$genre', count: { $sum: 1 } } },
//       { $sort: { count: -1 } }
//     ]);
    
//     // Poems by language
//     const poemsByLanguage = await Poem.aggregate([
//       { $group: { _id: '$language', count: { $sum: 1 } } },
//       { $sort: { count: -1 } }
//     ]);
    
//     res.json({
//       success: true,
//       data: {
//         total: totalPoems,
//         published: publishedPoems,
//         featured: featuredPoems,
//         unpublished: totalPoems - publishedPoems,
//         totalViews: totalViews[0]?.total || 0,
//         totalLikes: totalLikes[0]?.total || 0,
//         byGenre: poemsByGenre,
//         byLanguage: poemsByLanguage
//       }
//     });
//   } catch (error) {
//     console.error('Stats error:', error);
//     next(error);
//   }
// });

// // Get most liked poems
// // GET /api/poems/stats/most-liked?limit=10
// router.get('/stats/most-liked', optionalAuth, async (req, res, next) => {
//   try {
//     const limit = parseInt(req.query.limit) || 10;
    
//     const poems = await Poem.find({ isPublished: true })
//       .populate('author', 'name slug')
//       .sort({ 'stats.likes': -1 })
//       .limit(limit)
//       .select('title slug author stats.likes stats.views');
    
//     res.json({
//       success: true,
//       data: poems
//     });
//   } catch (error) {
//     console.error('Most liked error:', error);
//     next(error);
//   }
// });

// // Get most viewed poems
// // GET /api/poems/stats/most-viewed?limit=10
// router.get('/stats/most-viewed', optionalAuth, async (req, res, next) => {
//   try {
//     const limit = parseInt(req.query.limit) || 10;
    
//     const poems = await Poem.find({ isPublished: true })
//       .populate('author', 'name slug')
//       .sort({ 'stats.views': -1 })
//       .limit(limit)
//       .select('title slug author stats.views stats.likes');
    
//     res.json({
//       success: true,
//       data: poems
//     });
//   } catch (error) {
//     console.error('Most viewed error:', error);
//     next(error);
//   }
// });

// // ============================================
// // SEARCH ROUTES
// // ============================================

// // Search poems by title, content, or tags
// // GET /api/poems/search?q=love&page=1&limit=20
// router.get('/search', optionalAuth, async (req, res, next) => {
//   try {
//     const { q, page = 1, limit = 20 } = req.query;
    
//     if (!q || q.trim().length < 2) {
//       return res.status(400).json({ success: false, error: 'Search query must be at least 2 characters' });
//     }
    
//     const skip = (parseInt(page) - 1) * parseInt(limit);
    
//     const poems = await Poem.find({
//       isPublished: true,
//       $text: { $search: q }
//     })
//       .populate('author', 'name slug')
//       .sort({ score: { $meta: 'textScore' }, 'stats.views': -1 })
//       .skip(skip)
//       .limit(parseInt(limit))
//       .select('title slug author stats genre language');
    
//     const total = await Poem.countDocuments({
//       isPublished: true,
//       $text: { $search: q }
//     });
    
//     res.json({
//       success: true,
//       data: poems,
//       pagination: {
//         page: parseInt(page),
//         limit: parseInt(limit),
//         total,
//         pages: Math.ceil(total / parseInt(limit))
//       }
//     });
//   } catch (error) {
//     console.error('Search error:', error);
//     next(error);
//   }
// });

// export default router;






















// server/routes/poem.routes.js
import express from 'express';
import { body, validationResult } from 'express-validator';
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
  getRelatedPoems,
  getPoemSentiment,
  getPoemThemes,
  getAIAnalysis,
  analyzePoemContent
} from '../controllers/poem.controller.js';

const router = express.Router();

// ============================================
// Helper function for validation error handling
// ============================================
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }
  next();
};

// ============================================
// PUBLIC ROUTES (Using slugs)
// ============================================

// Get all poems with pagination and filters
// GET /api/poems?page=1&limit=12&genre=ghazal&language=urdu
router.get('/', cacheMiddleware(300), optionalAuth, getPoems);

// Get featured poems
// GET /api/poems/featured
router.get('/featured', cacheMiddleware(600), getFeaturedPoems);

// Get trending poems
// GET /api/poems/trending?limit=20
router.get('/trending', cacheMiddleware(300), getTrendingPoems);

// Get poems by author ID
// GET /api/poems/author/:authorId
router.get('/author/:authorId', getPoemsByAuthor);

// ============================================
// SLUG-BASED PUBLIC ROUTES
// ============================================

// Get single poem by slug
// GET /api/poems/my-poem-slug
router.get('/:slug', optionalAuth, getPoemBySlug);

// Get related poems by slug
// GET /api/poems/my-poem-slug/related
router.get('/:slug/related', getRelatedPoems);

// Get AI explanation by slug (legacy)
// GET /api/poems/my-poem-slug/ai-explanation
router.get('/:slug/ai-explanation', getAIExplanation);

// ============================================
// NEW AI FEATURE ROUTES
// ============================================

// Get sentiment analysis for a poem by slug
router.get('/:slug/sentiment', optionalAuth, getPoemSentiment);

// Get theme extraction for a poem by slug
router.get('/:slug/themes', optionalAuth, getPoemThemes);

// Get full AI literary analysis for a poem by slug
router.get('/:slug/ai-analysis', optionalAuth, getAIAnalysis);

// Analyze poem content directly (for AJAX / real-time analysis)
router.post('/analyze-content', optionalAuth, analyzePoemContent);

// ============================================
// PROTECTED ROUTES (Require Authentication)
// ============================================

// Create new poem with conditional validation for Hindi/Urdu
// POST /api/poems
router.post('/', protect, [
  // Common validations
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('genre').isIn(['ghazal', 'nazm', 'sher', 'rubai', 'rekhti', 'qasida', 'marsiya', 'other'])
    .withMessage('Invalid genre'),
  body('language').optional().isIn(['urdu', 'hindi', 'english', 'persian', 'arabic'])
    .withMessage('Invalid language'),
  body('era').optional().isIn(['classical', 'modern', 'contemporary'])
    .withMessage('Invalid era'),
  
  // Conditional content validation based on language
  body().custom((value, { req }) => {
    const language = req.body.language || 'urdu';
    
    if (language === 'hindi') {
      // For Hindi poems, check contentHindi
      if (!req.body.contentHindi || !req.body.contentHindi.trim()) {
        throw new Error('Hindi content (Devanagari script) is required for Hindi poems');
      }
      // Clear content field to avoid confusion
      req.body.content = req.body.contentHindi;
    } else if (language === 'urdu') {
      // For Urdu poems, check content or contentUrdu
      if (!req.body.content && !req.body.contentUrdu) {
        throw new Error('Urdu content is required for Urdu poems');
      }
      if (!req.body.contentUrdu && req.body.content) {
        req.body.contentUrdu = req.body.content;
      }
    } else {
      // For English or other languages, check content
      if (!req.body.content || !req.body.content.trim()) {
        throw new Error('Content is required');
      }
    }
    
    return true;
  }),
  
  // Optional fields
  body('transliteration').optional().trim(),
  body('translation.english').optional().trim(),
  body('translation.hindi').optional().trim(),
  body('tags').optional().isArray(),
  body('mood').optional().isString(),
  body('isPublished').optional().isBoolean(),
  body('isFeatured').optional().isBoolean(),
  body('slug').optional().trim().matches(/^[a-z0-9-]+$/).withMessage('Slug can only contain lowercase letters, numbers, and hyphens')
], validateRequest, createPoem);

// Update poem by slug with conditional validation
// PUT /api/poems/my-poem-slug
router.put('/:slug', protect, [
  // Optional validations for update
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('author').optional().notEmpty().withMessage('Author ID cannot be empty'),
  body('genre').optional().isIn(['ghazal', 'nazm', 'sher', 'rubai', 'rekhti', 'qasida', 'marsiya', 'other'])
    .withMessage('Invalid genre'),
  body('language').optional().isIn(['urdu', 'hindi', 'english', 'persian', 'arabic'])
    .withMessage('Invalid language'),
  body('era').optional().isIn(['classical', 'modern', 'contemporary'])
    .withMessage('Invalid era'),
  
  // Conditional content validation for updates
  body().custom((value, { req }) => {
    const language = req.body.language;
    
    // Only validate if language is being changed or content is being updated
    if (language === 'hindi') {
      // If updating Hindi content
      if (req.body.contentHindi && !req.body.contentHindi.trim()) {
        throw new Error('Hindi content cannot be empty');
      }
    } else if (language === 'urdu') {
      // If updating Urdu content
      if (req.body.contentUrdu && !req.body.contentUrdu.trim()) {
        throw new Error('Urdu content cannot be empty');
      }
      if (req.body.content && !req.body.contentUrdu) {
        req.body.contentUrdu = req.body.content;
      }
    } else if (language && language !== 'urdu' && language !== 'hindi') {
      // For English or other languages
      if (req.body.content && !req.body.content.trim()) {
        throw new Error('Content cannot be empty');
      }
    }
    
    return true;
  }),
  
  // Optional fields for update
  body('content').optional().trim(),
  body('contentUrdu').optional().trim(),
  body('contentHindi').optional().trim(),
  body('transliteration').optional().trim(),
  body('translation.english').optional().trim(),
  body('translation.hindi').optional().trim(),
  body('tags').optional().isArray(),
  body('mood').optional().isString(),
  body('isPublished').optional().isBoolean(),
  body('isFeatured').optional().isBoolean(),
  body('slug').optional().trim().matches(/^[a-z0-9-]+$/).withMessage('Slug can only contain lowercase letters, numbers, and hyphens')
], validateRequest, updatePoem);

// Delete poem by slug
// DELETE /api/poems/my-poem-slug
router.delete('/:slug', protect, deletePoem);

// Like poem by slug
// POST /api/poems/my-poem-slug/like
router.post('/:slug/like', protect, likePoem);

// Bookmark poem by slug
// POST /api/poems/my-poem-slug/bookmark
router.post('/:slug/bookmark', protect, bookmarkPoem);

// Add comment by slug
// POST /api/poems/my-poem-slug/comment
router.post('/:slug/comment', protect, [
  body('text').trim().notEmpty().withMessage('Comment text is required').isLength({ max: 1000 })
], validateRequest, addComment);

// ============================================
// BULK OPERATIONS (Admin only)
// ============================================

// Bulk delete poems (admin only)
router.delete('/bulk', protect, async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Admin access required' });
    }
    
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, error: 'Please provide an array of poem IDs' });
    }
    
    const Poem = (await import('../models/Poem.js')).default;
    const result = await Poem.deleteMany({ _id: { $in: ids } });
    
    res.json({
      success: true,
      message: `${result.deletedCount} poems deleted successfully`
    });
  } catch (error) {
    console.error('Bulk delete error:', error);
    next(error);
  }
});

// Bulk publish poems (admin only)
router.put('/bulk/publish', protect, async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Admin access required' });
    }
    
    const { ids, publish = true } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, error: 'Please provide an array of poem IDs' });
    }
    
    const Poem = (await import('../models/Poem.js')).default;
    const updateData = {
      isPublished: publish,
      publishedAt: publish ? new Date() : null
    };
    
    const result = await Poem.updateMany(
      { _id: { $in: ids } },
      { $set: updateData }
    );
    
    res.json({
      success: true,
      message: `${result.modifiedCount} poems updated successfully`
    });
  } catch (error) {
    console.error('Bulk publish error:', error);
    next(error);
  }
});

// ============================================
// STATS ROUTES
// ============================================

// Get poem statistics (admin only)
router.get('/stats/overview', protect, async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Admin access required' });
    }
    
    const Poem = (await import('../models/Poem.js')).default;
    
    const totalPoems = await Poem.countDocuments();
    const publishedPoems = await Poem.countDocuments({ isPublished: true });
    const featuredPoems = await Poem.countDocuments({ isFeatured: true });
    const totalViews = await Poem.aggregate([{ $group: { _id: null, total: { $sum: '$stats.views' } } }]);
    const totalLikes = await Poem.aggregate([{ $group: { _id: null, total: { $sum: '$stats.likes' } } }]);
    
    // Poems by genre
    const poemsByGenre = await Poem.aggregate([
      { $group: { _id: '$genre', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Poems by language
    const poemsByLanguage = await Poem.aggregate([
      { $group: { _id: '$language', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    res.json({
      success: true,
      data: {
        total: totalPoems,
        published: publishedPoems,
        featured: featuredPoems,
        unpublished: totalPoems - publishedPoems,
        totalViews: totalViews[0]?.total || 0,
        totalLikes: totalLikes[0]?.total || 0,
        byGenre: poemsByGenre,
        byLanguage: poemsByLanguage
      }
    });
  } catch (error) {
    console.error('Stats error:', error);
    next(error);
  }
});

// Get most liked poems
router.get('/stats/most-liked', optionalAuth, async (req, res, next) => {
  try {
    const Poem = (await import('../models/Poem.js')).default;
    const limit = parseInt(req.query.limit) || 10;
    
    const poems = await Poem.find({ isPublished: true })
      .populate('author', 'name slug')
      .sort({ 'stats.likes': -1 })
      .limit(limit)
      .select('title slug author stats.likes stats.views');
    
    res.json({
      success: true,
      data: poems
    });
  } catch (error) {
    console.error('Most liked error:', error);
    next(error);
  }
});

// Get most viewed poems
router.get('/stats/most-viewed', optionalAuth, async (req, res, next) => {
  try {
    const Poem = (await import('../models/Poem.js')).default;
    const limit = parseInt(req.query.limit) || 10;
    
    const poems = await Poem.find({ isPublished: true })
      .populate('author', 'name slug')
      .sort({ 'stats.views': -1 })
      .limit(limit)
      .select('title slug author stats.views stats.likes');
    
    res.json({
      success: true,
      data: poems
    });
  } catch (error) {
    console.error('Most viewed error:', error);
    next(error);
  }
});

// ============================================
// SEARCH ROUTES
// ============================================

// Search poems by title, content, or tags
router.get('/search', optionalAuth, async (req, res, next) => {
  try {
    const Poem = (await import('../models/Poem.js')).default;
    const { q, page = 1, limit = 20 } = req.query;
    
    if (!q || q.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Search query must be at least 2 characters' });
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const poems = await Poem.find({
      isPublished: true,
      $text: { $search: q }
    })
      .populate('author', 'name slug')
      .sort({ score: { $meta: 'textScore' }, 'stats.views': -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('title slug author stats genre language');
    
    const total = await Poem.countDocuments({
      isPublished: true,
      $text: { $search: q }
    });
    
    res.json({
      success: true,
      data: poems,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Search error:', error);
    next(error);
  }
});

export default router;