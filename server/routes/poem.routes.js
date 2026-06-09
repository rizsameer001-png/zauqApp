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
// import { body, validationResult } from 'express-validator';
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
//   getPoemSentiment,
//   getPoemThemes,
//   getAIAnalysis,
//   analyzePoemContent
// } from '../controllers/poem.controller.js';

// const router = express.Router();

// // ============================================
// // Helper function for validation error handling
// // ============================================
// const validateRequest = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ 
//       success: false, 
//       errors: errors.array() 
//     });
//   }
//   next();
// };

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
// router.get('/:slug/sentiment', optionalAuth, getPoemSentiment);

// // Get theme extraction for a poem by slug
// router.get('/:slug/themes', optionalAuth, getPoemThemes);

// // Get full AI literary analysis for a poem by slug
// router.get('/:slug/ai-analysis', optionalAuth, getAIAnalysis);

// // Analyze poem content directly (for AJAX / real-time analysis)
// router.post('/analyze-content', optionalAuth, analyzePoemContent);

// // ============================================
// // PROTECTED ROUTES (Require Authentication)
// // ============================================

// // Create new poem with conditional validation for Hindi/Urdu
// // POST /api/poems
// router.post('/', protect, [
//   // Common validations
//   body('title').trim().notEmpty().withMessage('Title is required'),
//   body('author').notEmpty().withMessage('Author is required'),
//   body('genre').isIn(['ghazal', 'nazm', 'sher', 'rubai', 'rekhti', 'qasida', 'marsiya', 'other'])
//     .withMessage('Invalid genre'),
//   body('language').optional().isIn(['urdu', 'hindi', 'english', 'persian', 'arabic'])
//     .withMessage('Invalid language'),
//   body('era').optional().isIn(['classical', 'modern', 'contemporary'])
//     .withMessage('Invalid era'),
  
//   // Conditional content validation based on language
//   body().custom((value, { req }) => {
//     const language = req.body.language || 'urdu';
    
//     if (language === 'hindi') {
//       // For Hindi poems, check contentHindi
//       if (!req.body.contentHindi || !req.body.contentHindi.trim()) {
//         throw new Error('Hindi content (Devanagari script) is required for Hindi poems');
//       }
//       // Clear content field to avoid confusion
//       req.body.content = req.body.contentHindi;
//     } else if (language === 'urdu') {
//       // For Urdu poems, check content or contentUrdu
//       if (!req.body.content && !req.body.contentUrdu) {
//         throw new Error('Urdu content is required for Urdu poems');
//       }
//       if (!req.body.contentUrdu && req.body.content) {
//         req.body.contentUrdu = req.body.content;
//       }
//     } else {
//       // For English or other languages, check content
//       if (!req.body.content || !req.body.content.trim()) {
//         throw new Error('Content is required');
//       }
//     }
    
//     return true;
//   }),
  
//   // Optional fields
//   body('transliteration').optional().trim(),
//   body('translation.english').optional().trim(),
//   body('translation.hindi').optional().trim(),
//   body('tags').optional().isArray(),
//   body('mood').optional().isString(),
//   body('isPublished').optional().isBoolean(),
//   body('isFeatured').optional().isBoolean(),
//   body('slug').optional().trim().matches(/^[a-z0-9-]+$/).withMessage('Slug can only contain lowercase letters, numbers, and hyphens')
// ], validateRequest, createPoem);

// // Update poem by slug with conditional validation
// // PUT /api/poems/my-poem-slug
// router.put('/:slug', protect, [
//   // Optional validations for update
//   body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
//   body('author').optional().notEmpty().withMessage('Author ID cannot be empty'),
//   body('genre').optional().isIn(['ghazal', 'nazm', 'sher', 'rubai', 'rekhti', 'qasida', 'marsiya', 'other'])
//     .withMessage('Invalid genre'),
//   body('language').optional().isIn(['urdu', 'hindi', 'english', 'persian', 'arabic'])
//     .withMessage('Invalid language'),
//   body('era').optional().isIn(['classical', 'modern', 'contemporary'])
//     .withMessage('Invalid era'),
  
//   // Conditional content validation for updates
//   body().custom((value, { req }) => {
//     const language = req.body.language;
    
//     // Only validate if language is being changed or content is being updated
//     if (language === 'hindi') {
//       // If updating Hindi content
//       if (req.body.contentHindi && !req.body.contentHindi.trim()) {
//         throw new Error('Hindi content cannot be empty');
//       }
//     } else if (language === 'urdu') {
//       // If updating Urdu content
//       if (req.body.contentUrdu && !req.body.contentUrdu.trim()) {
//         throw new Error('Urdu content cannot be empty');
//       }
//       if (req.body.content && !req.body.contentUrdu) {
//         req.body.contentUrdu = req.body.content;
//       }
//     } else if (language && language !== 'urdu' && language !== 'hindi') {
//       // For English or other languages
//       if (req.body.content && !req.body.content.trim()) {
//         throw new Error('Content cannot be empty');
//       }
//     }
    
//     return true;
//   }),
  
//   // Optional fields for update
//   body('content').optional().trim(),
//   body('contentUrdu').optional().trim(),
//   body('contentHindi').optional().trim(),
//   body('transliteration').optional().trim(),
//   body('translation.english').optional().trim(),
//   body('translation.hindi').optional().trim(),
//   body('tags').optional().isArray(),
//   body('mood').optional().isString(),
//   body('isPublished').optional().isBoolean(),
//   body('isFeatured').optional().isBoolean(),
//   body('slug').optional().trim().matches(/^[a-z0-9-]+$/).withMessage('Slug can only contain lowercase letters, numbers, and hyphens')
// ], validateRequest, updatePoem);

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
// router.post('/:slug/comment', protect, [
//   body('text').trim().notEmpty().withMessage('Comment text is required').isLength({ max: 1000 })
// ], validateRequest, addComment);

// // ============================================
// // BULK OPERATIONS (Admin only)
// // ============================================

// // Bulk delete poems (admin only)
// router.delete('/bulk', protect, async (req, res, next) => {
//   try {
//     if (req.user.role !== 'admin') {
//       return res.status(403).json({ success: false, error: 'Admin access required' });
//     }
    
//     const { ids } = req.body;
//     if (!ids || !Array.isArray(ids) || ids.length === 0) {
//       return res.status(400).json({ success: false, error: 'Please provide an array of poem IDs' });
//     }
    
//     const Poem = (await import('../models/Poem.js')).default;
//     const result = await Poem.deleteMany({ _id: { $in: ids } });
    
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
// router.put('/bulk/publish', protect, async (req, res, next) => {
//   try {
//     if (req.user.role !== 'admin') {
//       return res.status(403).json({ success: false, error: 'Admin access required' });
//     }
    
//     const { ids, publish = true } = req.body;
//     if (!ids || !Array.isArray(ids) || ids.length === 0) {
//       return res.status(400).json({ success: false, error: 'Please provide an array of poem IDs' });
//     }
    
//     const Poem = (await import('../models/Poem.js')).default;
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
// router.get('/stats/overview', protect, async (req, res, next) => {
//   try {
//     if (req.user.role !== 'admin') {
//       return res.status(403).json({ success: false, error: 'Admin access required' });
//     }
    
//     const Poem = (await import('../models/Poem.js')).default;
    
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
// router.get('/stats/most-liked', optionalAuth, async (req, res, next) => {
//   try {
//     const Poem = (await import('../models/Poem.js')).default;
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
// router.get('/stats/most-viewed', optionalAuth, async (req, res, next) => {
//   try {
//     const Poem = (await import('../models/Poem.js')).default;
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
// router.get('/search', optionalAuth, async (req, res, next) => {
//   try {
//     const Poem = (await import('../models/Poem.js')).default;
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



















// // server/routes/poem.routes.js
// import express from 'express';
// import { body, validationResult } from 'express-validator';
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
//   getPoemSentiment,
//   getPoemThemes,
//   getAIAnalysis,
//   analyzePoemContent
// } from '../controllers/poem.controller.js';

// const router = express.Router();

// // ============================================
// // Helper function for validation error handling
// // ============================================
// const validateRequest = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ 
//       success: false, 
//       errors: errors.array() 
//     });
//   }
//   next();
// };

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
// router.get('/:slug/sentiment', optionalAuth, getPoemSentiment);

// // Get theme extraction for a poem by slug
// router.get('/:slug/themes', optionalAuth, getPoemThemes);

// // Get full AI literary analysis for a poem by slug
// router.get('/:slug/ai-analysis', optionalAuth, getAIAnalysis);

// // Analyze poem content directly (for AJAX / real-time analysis)
// router.post('/analyze-content', optionalAuth, analyzePoemContent);

// // ============================================
// // PROTECTED ROUTES (Require Authentication)
// // ============================================

// // Create new poem with conditional validation for Hindi/Urdu
// // POST /api/poems
// router.post('/', protect, [
//   body('title').trim().notEmpty().withMessage('Title is required'),
//   body('author').notEmpty().withMessage('Author is required'),
//   body('genre').isIn(['ghazal', 'nazm', 'sher', 'rubai', 'rekhti', 'qasida', 'marsiya', 'other'])
//     .withMessage('Invalid genre'),
//   body('language').optional().isIn(['urdu', 'hindi', 'english', 'persian', 'arabic'])
//     .withMessage('Invalid language'),
//   body('era').optional().isIn(['classical', 'modern', 'contemporary'])
//     .withMessage('Invalid era'),
  
//   body().custom((value, { req }) => {
//     const language = req.body.language || 'urdu';
    
//     if (language === 'hindi') {
//       if (!req.body.contentHindi || !req.body.contentHindi.trim()) {
//         throw new Error('Hindi content (Devanagari script) is required for Hindi poems');
//       }
//       req.body.content = req.body.contentHindi;
//     } else if (language === 'urdu') {
//       if (!req.body.content && !req.body.contentUrdu) {
//         throw new Error('Urdu content is required for Urdu poems');
//       }
//       if (!req.body.contentUrdu && req.body.content) {
//         req.body.contentUrdu = req.body.content;
//       }
//     } else {
//       if (!req.body.content || !req.body.content.trim()) {
//         throw new Error('Content is required');
//       }
//     }
//     return true;
//   }),
  
//   body('transliteration').optional().trim(),
//   body('translation.english').optional().trim(),
//   body('translation.hindi').optional().trim(),
//   body('tags').optional().isArray(),
//   body('mood').optional().isString(),
//   body('isPublished').optional().isBoolean(),
//   body('isFeatured').optional().isBoolean(),
//   body('slug').optional().trim().matches(/^[a-z0-9-]+$/).withMessage('Slug can only contain lowercase letters, numbers, and hyphens')
// ], validateRequest, createPoem);

// // Update poem by slug
// router.put('/:slug', protect, [
//   body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
//   body('author').optional().notEmpty().withMessage('Author ID cannot be empty'),
//   body('genre').optional().isIn(['ghazal', 'nazm', 'sher', 'rubai', 'rekhti', 'qasida', 'marsiya', 'other'])
//     .withMessage('Invalid genre'),
//   body('language').optional().isIn(['urdu', 'hindi', 'english', 'persian', 'arabic'])
//     .withMessage('Invalid language'),
//   body('era').optional().isIn(['classical', 'modern', 'contemporary'])
//     .withMessage('Invalid era'),
  
//   body().custom((value, { req }) => {
//     const language = req.body.language;
    
//     if (language === 'hindi') {
//       if (req.body.contentHindi && !req.body.contentHindi.trim()) {
//         throw new Error('Hindi content cannot be empty');
//       }
//     } else if (language === 'urdu') {
//       if (req.body.contentUrdu && !req.body.contentUrdu.trim()) {
//         throw new Error('Urdu content cannot be empty');
//       }
//       if (req.body.content && !req.body.contentUrdu) {
//         req.body.contentUrdu = req.body.content;
//       }
//     } else if (language && language !== 'urdu' && language !== 'hindi') {
//       if (req.body.content && !req.body.content.trim()) {
//         throw new Error('Content cannot be empty');
//       }
//     }
//     return true;
//   }),
  
//   body('content').optional().trim(),
//   body('contentUrdu').optional().trim(),
//   body('contentHindi').optional().trim(),
//   body('transliteration').optional().trim(),
//   body('translation.english').optional().trim(),
//   body('translation.hindi').optional().trim(),
//   body('tags').optional().isArray(),
//   body('mood').optional().isString(),
//   body('isPublished').optional().isBoolean(),
//   body('isFeatured').optional().isBoolean(),
//   body('slug').optional().trim().matches(/^[a-z0-9-]+$/).withMessage('Slug can only contain lowercase letters, numbers, and hyphens')
// ], validateRequest, updatePoem);

// // Delete poem by slug
// router.delete('/:slug', protect, deletePoem);

// // Like poem by slug
// router.post('/:slug/like', protect, likePoem);

// // Bookmark poem by slug
// router.post('/:slug/bookmark', protect, bookmarkPoem);

// // Add comment by slug
// router.post('/:slug/comment', protect, [
//   body('text').trim().notEmpty().withMessage('Comment text is required').isLength({ max: 1000 })
// ], validateRequest, addComment);

// // ============================================
// // BULK OPERATIONS (Admin only)
// // ============================================

// // Bulk upload poems (Admin only)
// // POST /api/poems/bulk/upload
// router.post('/bulk/upload', protect, async (req, res, next) => {
//   try {
//     if (req.user.role !== 'admin') {
//       return res.status(403).json({ success: false, error: 'Admin access required' });
//     }
    
//     const { poems } = req.body;
    
//     if (!poems || !Array.isArray(poems) || poems.length === 0) {
//       return res.status(400).json({ success: false, error: 'Please provide an array of poems' });
//     }
    
//     if (poems.length > 100) {
//       return res.status(400).json({ success: false, error: 'Maximum 100 poems per upload' });
//     }
    
//     const Poem = (await import('../models/Poem.js')).default;
//     const Author = (await import('../models/Author.js')).default;
//     const slugify = (await import('slugify')).default;
    
//     let uploaded = 0;
//     let failed = 0;
//     const errors = [];
    
//     for (const poemData of poems) {
//       try {
//         // Validate required fields
//         if (!poemData.title || !poemData.title.trim()) {
//           errors.push({ title: poemData.title || 'Unknown', error: 'Title is required' });
//           failed++;
//           continue;
//         }
        
//         // Find author by slug or name
//         let author = null;
//         if (poemData.authorSlug) {
//           author = await Author.findOne({ slug: poemData.authorSlug });
//         }
//         if (!author && poemData.authorId) {
//           author = await Author.findById(poemData.authorId);
//         }
//         if (!author && poemData.authorName) {
//           author = await Author.findOne({ name: poemData.authorName });
//         }
        
//         if (!author) {
//           errors.push({ title: poemData.title, error: `Author not found: ${poemData.authorSlug || poemData.authorId || poemData.authorName || 'Unknown'}` });
//           failed++;
//           continue;
//         }
        
//         // Validate genre
//         const validGenres = ['ghazal', 'nazm', 'sher', 'rubai', 'rekhti', 'qasida', 'marsiya', 'other'];
//         const genre = poemData.genre?.toLowerCase();
//         if (!genre || !validGenres.includes(genre)) {
//           errors.push({ title: poemData.title, error: `Invalid genre: ${genre}. Must be one of: ${validGenres.join(', ')}` });
//           failed++;
//           continue;
//         }
        
//         // Determine language
//         const language = poemData.language || 'urdu';
        
//         // Generate slug if not provided
//         let slug = poemData.slug;
//         if (!slug) {
//           slug = slugify(poemData.title, { lower: true, strict: true });
          
//           let counter = 1;
//           let originalSlug = slug;
//           while (await Poem.findOne({ slug })) {
//             slug = `${originalSlug}-${counter}`;
//             counter++;
//           }
//         } else {
//           const existingPoem = await Poem.findOne({ slug });
//           if (existingPoem) {
//             errors.push({ title: poemData.title, error: `Slug already exists: ${slug}` });
//             failed++;
//             continue;
//           }
//         }
        
//         // Prepare poem data
//         const newPoem = {
//           title: poemData.title.trim(),
//           slug: slug,
//           content: poemData.content || poemData.contentUrdu || poemData.contentHindi || '',
//           contentUrdu: poemData.contentUrdu || (language === 'urdu' ? poemData.content : ''),
//           contentHindi: poemData.contentHindi || (language === 'hindi' ? poemData.content : ''),
//           transliteration: poemData.transliteration || '',
//           translation: {
//             english: poemData.translation?.english || '',
//             hindi: poemData.translation?.hindi || ''
//           },
//           author: author._id,
//           genre: genre,
//           language: language,
//           era: poemData.era || 'modern',
//           tags: poemData.tags || [],
//           mood: poemData.mood,
//           isPublished: poemData.isPublished || false,
//           publishedAt: poemData.isPublished ? new Date() : null,
//           isFeatured: poemData.isFeatured || false,
//           createdBy: req.user.id,
//           autoTransliterate: poemData.autoTransliterate !== false
//         };
        
//         await Poem.create(newPoem);
        
//         await Author.findByIdAndUpdate(author._id, {
//           $inc: { 'stats.poemsCount': 1 }
//         });
        
//         uploaded++;
        
//       } catch (err) {
//         console.error(`Error uploading poem "${poemData.title}":`, err.message);
//         errors.push({ title: poemData.title || 'Unknown', error: err.message });
//         failed++;
//       }
//     }
    
//     res.json({
//       success: true,
//       uploaded: uploaded,
//       failed: failed,
//       errors: errors,
//       message: `Successfully uploaded ${uploaded} poems. Failed: ${failed}`
//     });
    
//   } catch (error) {
//     console.error('Bulk upload error:', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

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
    
//     const Poem = (await import('../models/Poem.js')).default;
//     const Author = (await import('../models/Author.js')).default;
    
//     // Get poems to update author stats
//     const poemsToDelete = await Poem.find({ _id: { $in: ids } });
    
//     for (const poem of poemsToDelete) {
//       await Author.findByIdAndUpdate(poem.author, {
//         $inc: { 'stats.poemsCount': -1 }
//       });
//     }
    
//     const result = await Poem.deleteMany({ _id: { $in: ids } });
    
//     res.json({
//       success: true,
//       deleted: result.deletedCount,
//       message: `${result.deletedCount} poems deleted successfully`
//     });
//   } catch (error) {
//     console.error('Bulk delete error:', error);
//     next(error);
//   }
// });

// // Bulk publish/unpublish poems (admin only)
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
    
//     const Poem = (await import('../models/Poem.js')).default;
    
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
//       updated: result.modifiedCount,
//       message: `${result.modifiedCount} poems updated successfully`
//     });
//   } catch (error) {
//     console.error('Bulk publish error:', error);
//     next(error);
//   }
// });

// // Bulk generate transliterations (admin only)
// // POST /api/poems/bulk/transliterate
// router.post('/bulk/transliterate', protect, async (req, res, next) => {
//   try {
//     if (req.user.role !== 'admin') {
//       return res.status(403).json({ success: false, error: 'Admin access required' });
//     }
    
//     const { ids, force = false } = req.body;
//     if (!ids || !Array.isArray(ids) || ids.length === 0) {
//       return res.status(400).json({ success: false, error: 'Please provide an array of poem IDs' });
//     }
    
//     const Poem = (await import('../models/Poem.js')).default;
//     const { autoTransliteratePoem } = await import('../services/transliterationService.js');
    
//     let generated = 0;
//     let failed = 0;
//     const results = [];
    
//     for (const poemId of ids) {
//       try {
//         const poem = await Poem.findById(poemId);
//         if (!poem) {
//           results.push({ id: poemId, success: false, error: 'Poem not found' });
//           failed++;
//           continue;
//         }
        
//         if (poem.language !== 'urdu' && poem.language !== 'hindi') {
//           results.push({ id: poemId, success: false, error: 'Transliteration only supported for Urdu/Hindi' });
//           failed++;
//           continue;
//         }
        
//         const translitResult = await autoTransliteratePoem(poem, force);
        
//         if (translitResult.success) {
//           generated++;
//           results.push({ id: poemId, success: true, method: translitResult.method });
//         } else {
//           failed++;
//           results.push({ id: poemId, success: false, error: translitResult.error });
//         }
//       } catch (err) {
//         failed++;
//         results.push({ id: poemId, success: false, error: err.message });
//       }
//     }
    
//     res.json({
//       success: true,
//       generated: generated,
//       failed: failed,
//       results: results,
//       message: `Generated transliterations for ${generated} poems. Failed: ${failed}`
//     });
//   } catch (error) {
//     console.error('Bulk transliteration error:', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // ============================================
// // STATS ROUTES
// // ============================================

// // Get poem statistics (admin only)
// router.get('/stats/overview', protect, async (req, res, next) => {
//   try {
//     if (req.user.role !== 'admin') {
//       return res.status(403).json({ success: false, error: 'Admin access required' });
//     }
    
//     const Poem = (await import('../models/Poem.js')).default;
    
//     const totalPoems = await Poem.countDocuments();
//     const publishedPoems = await Poem.countDocuments({ isPublished: true });
//     const featuredPoems = await Poem.countDocuments({ isFeatured: true });
//     const totalViews = await Poem.aggregate([{ $group: { _id: null, total: { $sum: '$stats.views' } } }]);
//     const totalLikes = await Poem.aggregate([{ $group: { _id: null, total: { $sum: '$stats.likes' } } }]);
    
//     const poemsByGenre = await Poem.aggregate([
//       { $group: { _id: '$genre', count: { $sum: 1 } } },
//       { $sort: { count: -1 } }
//     ]);
    
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
// router.get('/stats/most-liked', optionalAuth, async (req, res, next) => {
//   try {
//     const Poem = (await import('../models/Poem.js')).default;
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
// router.get('/stats/most-viewed', optionalAuth, async (req, res, next) => {
//   try {
//     const Poem = (await import('../models/Poem.js')).default;
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
// router.get('/search', optionalAuth, async (req, res, next) => {
//   try {
//     const Poem = (await import('../models/Poem.js')).default;
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
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('genre').isIn(['ghazal', 'nazm', 'sher', 'rubai', 'rekhti', 'qasida', 'marsiya', 'other'])
    .withMessage('Invalid genre'),
  body('language').optional().isIn(['urdu', 'hindi', 'english', 'persian', 'arabic'])
    .withMessage('Invalid language'),
  body('era').optional().isIn(['classical', 'modern', 'contemporary'])
    .withMessage('Invalid era'),
  
  body().custom((value, { req }) => {
    const language = req.body.language || 'urdu';
    
    if (language === 'hindi') {
      if (!req.body.contentHindi || !req.body.contentHindi.trim()) {
        throw new Error('Hindi content (Devanagari script) is required for Hindi poems');
      }
      req.body.content = req.body.contentHindi;
    } else if (language === 'urdu') {
      if (!req.body.content && !req.body.contentUrdu) {
        throw new Error('Urdu content is required for Urdu poems');
      }
      if (!req.body.contentUrdu && req.body.content) {
        req.body.contentUrdu = req.body.content;
      }
    } else {
      if (!req.body.content || !req.body.content.trim()) {
        throw new Error('Content is required');
      }
    }
    return true;
  }),
  
  body('transliteration').optional().trim(),
  body('translation.english').optional().trim(),
  body('translation.hindi').optional().trim(),
  body('tags').optional().isArray(),
  body('mood').optional().isString(),
  body('isPublished').optional().isBoolean(),
  body('isFeatured').optional().isBoolean(),
  body('slug').optional().trim().matches(/^[a-z0-9-]+$/).withMessage('Slug can only contain lowercase letters, numbers, and hyphens')
], validateRequest, createPoem);

// Update poem by slug
router.put('/:slug', protect, [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('author').optional().notEmpty().withMessage('Author ID cannot be empty'),
  body('genre').optional().isIn(['ghazal', 'nazm', 'sher', 'rubai', 'rekhti', 'qasida', 'marsiya', 'other'])
    .withMessage('Invalid genre'),
  body('language').optional().isIn(['urdu', 'hindi', 'english', 'persian', 'arabic'])
    .withMessage('Invalid language'),
  body('era').optional().isIn(['classical', 'modern', 'contemporary'])
    .withMessage('Invalid era'),
  
  body().custom((value, { req }) => {
    const language = req.body.language;
    
    if (language === 'hindi') {
      if (req.body.contentHindi && !req.body.contentHindi.trim()) {
        throw new Error('Hindi content cannot be empty');
      }
    } else if (language === 'urdu') {
      if (req.body.contentUrdu && !req.body.contentUrdu.trim()) {
        throw new Error('Urdu content cannot be empty');
      }
      if (req.body.content && !req.body.contentUrdu) {
        req.body.contentUrdu = req.body.content;
      }
    } else if (language && language !== 'urdu' && language !== 'hindi') {
      if (req.body.content && !req.body.content.trim()) {
        throw new Error('Content cannot be empty');
      }
    }
    return true;
  }),
  
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
router.delete('/:slug', protect, deletePoem);

// Like poem by slug
router.post('/:slug/like', protect, likePoem);

// Bookmark poem by slug
router.post('/:slug/bookmark', protect, bookmarkPoem);

// Add comment by slug
router.post('/:slug/comment', protect, [
  body('text').trim().notEmpty().withMessage('Comment text is required').isLength({ max: 1000 })
], validateRequest, addComment);

// ============================================
// BULK OPERATIONS (Admin only)
// ============================================

// Bulk upload poems (Admin only) - UPDATED WITH BETTER AUTHOR HANDLING
// POST /api/poems/bulk/upload
router.post('/bulk/upload', protect, async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Admin access required' });
    }
    
    const { poems } = req.body;
    
    if (!poems || !Array.isArray(poems) || poems.length === 0) {
      return res.status(400).json({ success: false, error: 'Please provide an array of poems' });
    }
    
    if (poems.length > 100) {
      return res.status(400).json({ success: false, error: 'Maximum 100 poems per upload' });
    }
    
    const Poem = (await import('../models/Poem.js')).default;
    const Author = (await import('../models/Author.js')).default;
    const slugify = (await import('slugify')).default;
    
    // Get all existing authors for lookup
    const allAuthors = await Author.find({});
    console.log('📚 Available authors in database:', allAuthors.map(a => ({ name: a.name, slug: a.slug, _id: a._id })));
    
    let uploaded = 0;
    let failed = 0;
    const errors = [];
    const successful = [];
    
    for (const poemData of poems) {
      try {
        console.log(`\n📝 Processing poem: "${poemData.title}"`);
        
        // Validate required fields
        if (!poemData.title || !poemData.title.trim()) {
          errors.push({ title: poemData.title || 'Unknown', error: 'Title is required' });
          failed++;
          continue;
        }
        
        // ============================================
        // IMPROVED AUTHOR LOOKUP - Multiple methods
        // ============================================
        let author = null;
        
        // Method 1: Try by slug
        if (poemData.authorSlug) {
          author = await Author.findOne({ slug: poemData.authorSlug });
          if (author) console.log(`  ✓ Found author by slug: ${author.name} (${author.slug})`);
        }
        
        // Method 2: Try by ID
        if (!author && poemData.authorId) {
          author = await Author.findById(poemData.authorId);
          if (author) console.log(`  ✓ Found author by ID: ${author.name}`);
        }
        
        // Method 3: Try by name (exact match, case-insensitive)
        if (!author && poemData.authorName) {
          author = await Author.findOne({ 
            name: { $regex: new RegExp(`^${poemData.authorName}$`, 'i') } 
          });
          if (author) console.log(`  ✓ Found author by exact name: ${author.name}`);
        }
        
        // Method 4: Try by name (partial match)
        if (!author && poemData.authorSlug) {
          const nameParts = poemData.authorSlug.split('-');
          const searchName = nameParts.join(' ');
          author = await Author.findOne({ 
            name: { $regex: searchName, $options: 'i' } 
          });
          if (author) console.log(`  ✓ Found author by partial name: ${author.name}`);
        }
        
        // Method 5: Try by nameUrdu
        if (!author && poemData.authorUrdu) {
          author = await Author.findOne({ nameUrdu: poemData.authorUrdu });
          if (author) console.log(`  ✓ Found author by Urdu name: ${author.name}`);
        }
        
        if (!author) {
          const availableAuthors = allAuthors.map(a => `${a.name} (slug: ${a.slug})`).join(', ');
          errors.push({ 
            title: poemData.title, 
            error: `Author not found: ${poemData.authorSlug || poemData.authorName || poemData.authorId || 'Unknown'}. Available authors: ${availableAuthors}` 
          });
          failed++;
          console.log(`  ✗ Author not found for: ${poemData.authorSlug || poemData.authorName}`);
          continue;
        }
        
        // Validate genre
        const validGenres = ['ghazal', 'nazm', 'sher', 'rubai', 'rekhti', 'qasida', 'marsiya', 'other'];
        const genre = poemData.genre?.toLowerCase();
        if (!genre || !validGenres.includes(genre)) {
          errors.push({ title: poemData.title, error: `Invalid genre: ${genre}. Must be one of: ${validGenres.join(', ')}` });
          failed++;
          continue;
        }
        
        // Determine language
        const language = poemData.language || 'urdu';
        
        // Generate slug if not provided
        let slug = poemData.slug;
        if (!slug) {
          slug = slugify(poemData.title, { lower: true, strict: true });
          
          let counter = 1;
          let originalSlug = slug;
          while (await Poem.findOne({ slug })) {
            slug = `${originalSlug}-${counter}`;
            counter++;
          }
          console.log(`  ✓ Generated slug: ${slug}`);
        } else {
          // Check if slug already exists
          const existingPoem = await Poem.findOne({ slug });
          if (existingPoem) {
            errors.push({ title: poemData.title, error: `Slug already exists: ${slug}` });
            failed++;
            continue;
          }
          console.log(`  ✓ Using provided slug: ${slug}`);
        }
        
        // Prepare content based on language
        let content = '';
        let contentUrdu = '';
        let contentHindi = '';
        
        if (language === 'hindi') {
          contentHindi = poemData.contentHindi || poemData.content || '';
          content = contentHindi;
          contentUrdu = '';
        } else if (language === 'urdu') {
          contentUrdu = poemData.contentUrdu || poemData.content || '';
          content = contentUrdu;
          contentHindi = '';
        } else {
          content = poemData.content || '';
          contentUrdu = '';
          contentHindi = '';
        }
        
        // Prepare poem data
        const newPoem = {
          title: poemData.title.trim(),
          slug: slug,
          content: content,
          contentUrdu: contentUrdu,
          contentHindi: contentHindi,
          transliteration: poemData.transliteration || '',
          translation: {
            english: poemData.translation?.english || '',
            hindi: poemData.translation?.hindi || ''
          },
          author: author._id,
          genre: genre,
          language: language,
          era: poemData.era || 'modern',
          tags: poemData.tags || [],
          mood: poemData.mood,
          isPublished: poemData.isPublished !== undefined ? poemData.isPublished : true,
          publishedAt: poemData.isPublished !== false ? new Date() : null,
          isFeatured: poemData.isFeatured || false,
          createdBy: req.user.id,
          autoTransliterate: poemData.autoTransliterate !== false
        };
        
        // Create the poem
        const createdPoem = await Poem.create(newPoem);
        console.log(`  ✓ Created poem: ${createdPoem.title} (ID: ${createdPoem._id})`);
        
        // Update author stats
        await Author.findByIdAndUpdate(author._id, {
          $inc: { 'stats.poemsCount': 1 }
        });
        
        uploaded++;
        successful.push({
          title: poemData.title,
          slug: slug,
          author: author.name,
          id: createdPoem._id
        });
        
      } catch (err) {
        console.error(`  ✗ Error uploading poem "${poemData.title}":`, err.message);
        errors.push({ title: poemData.title || 'Unknown', error: err.message });
        failed++;
      }
    }
    
    console.log(`\n📊 Bulk upload complete: ${uploaded} successful, ${failed} failed`);
    
    res.json({
      success: true,
      uploaded: uploaded,
      failed: failed,
      errors: errors,
      successful: successful,
      message: `Successfully uploaded ${uploaded} poems. Failed: ${failed}`,
      tip: failed > 0 ? 'Please check the errors array for details. Make sure author slugs match existing authors in your database.' : null
    });
    
  } catch (error) {
    console.error('Bulk upload error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Bulk delete poems (admin only)
// DELETE /api/poems/bulk
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
    const Author = (await import('../models/Author.js')).default;
    
    // Get poems to update author stats
    const poemsToDelete = await Poem.find({ _id: { $in: ids } });
    
    for (const poem of poemsToDelete) {
      await Author.findByIdAndUpdate(poem.author, {
        $inc: { 'stats.poemsCount': -1 }
      });
    }
    
    const result = await Poem.deleteMany({ _id: { $in: ids } });
    
    res.json({
      success: true,
      deleted: result.deletedCount,
      message: `${result.deletedCount} poems deleted successfully`
    });
  } catch (error) {
    console.error('Bulk delete error:', error);
    next(error);
  }
});

// Bulk publish/unpublish poems (admin only)
// PUT /api/poems/bulk/publish
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
      updated: result.modifiedCount,
      message: `${result.modifiedCount} poems updated successfully`
    });
  } catch (error) {
    console.error('Bulk publish error:', error);
    next(error);
  }
});

// Bulk generate transliterations (admin only)
// POST /api/poems/bulk/transliterate
router.post('/bulk/transliterate', protect, async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Admin access required' });
    }
    
    const { ids, force = false } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, error: 'Please provide an array of poem IDs' });
    }
    
    const Poem = (await import('../models/Poem.js')).default;
    const { autoTransliteratePoem } = await import('../services/transliterationService.js');
    
    let generated = 0;
    let failed = 0;
    const results = [];
    
    for (const poemId of ids) {
      try {
        const poem = await Poem.findById(poemId);
        if (!poem) {
          results.push({ id: poemId, success: false, error: 'Poem not found' });
          failed++;
          continue;
        }
        
        if (poem.language !== 'urdu' && poem.language !== 'hindi') {
          results.push({ id: poemId, success: false, error: 'Transliteration only supported for Urdu/Hindi' });
          failed++;
          continue;
        }
        
        const translitResult = await autoTransliteratePoem(poem, force);
        
        if (translitResult.success) {
          generated++;
          results.push({ id: poemId, success: true, method: translitResult.method });
        } else {
          failed++;
          results.push({ id: poemId, success: false, error: translitResult.error });
        }
      } catch (err) {
        failed++;
        results.push({ id: poemId, success: false, error: err.message });
      }
    }
    
    res.json({
      success: true,
      generated: generated,
      failed: failed,
      results: results,
      message: `Generated transliterations for ${generated} poems. Failed: ${failed}`
    });
  } catch (error) {
    console.error('Bulk transliteration error:', error);
    res.status(500).json({ success: false, error: error.message });
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
    
    const poemsByGenre = await Poem.aggregate([
      { $group: { _id: '$genre', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
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