// // server/routes/blog.routes.js
// import express from 'express';
// import { protect, adminOnly } from '../middleware/auth.js';
// import {
//   getBlogs,
//   getBlogBySlug,
//   createBlog,
//   updateBlog,
//   deleteBlog,
//   getFeaturedBlogs,
//   getBlogsByCategory,
//   likeBlog,
//   addComment,
//   getRelatedBlogs
// } from '../controllers/blog.controller.js';

// const router = express.Router();

// // Public routes
// router.get('/', getBlogs);
// router.get('/featured', getFeaturedBlogs);
// router.get('/category/:category', getBlogsByCategory);
// router.get('/:slug', getBlogBySlug);
// router.get('/:id/related', getRelatedBlogs);

// // Protected routes
// router.post('/:id/like', protect, likeBlog);
// router.post('/:id/comment', protect, addComment);

// // Admin routes
// router.post('/', protect, adminOnly, createBlog);
// router.put('/:id', protect, adminOnly, updateBlog);
// router.delete('/:id', protect, adminOnly, deleteBlog);

// export default router;













// // server/routes/blog.routes.js
// import express from 'express';
// import { protect, adminOnly } from '../middleware/auth.js';
// import {
//   getBlogs,
//   getBlogBySlug,
//   getBlogById,
//   createBlog,
//   updateBlog,
//   deleteBlog,
//   getFeaturedBlogs,
//   getBlogsByCategory,
//   getBlogsByTag,
//   likeBlog,
//   unlikeBlog,
//   addComment,
//   deleteComment,
//   approveComment,
//   getRelatedBlogs,
//   getBlogStats,
//   bulkDeleteBlogs,
//   toggleFeatured,
//   togglePublish
// } from '../controllers/blog.controller.js';

// const router = express.Router();

// // ============================================
// // PUBLIC ROUTES (No authentication required)
// // ============================================

// // Get all blogs with filtering
// router.get('/', getBlogs);

// // Get featured blogs
// router.get('/featured', getFeaturedBlogs);

// // Get blogs by category
// router.get('/category/:category', getBlogsByCategory);

// // Get blogs by tag
// router.get('/tag/:tag', getBlogsByTag);

// // Get related blogs
// router.get('/:id/related', getRelatedBlogs);

// // Get single blog by slug
// router.get('/:slug', getBlogBySlug);

// // Get blog stats
// router.get('/stats/overview', getBlogStats);

// // ============================================
// // PROTECTED ROUTES (Authentication required)
// // ============================================

// // Like/Unlike blog
// router.post('/:id/like', protect, likeBlog);
// router.delete('/:id/like', protect, unlikeBlog);

// // Add comment to blog
// router.post('/:id/comments', protect, addComment);

// // ============================================
// // ADMIN ROUTES (Admin only)
// // ============================================

// // Create new blog
// router.post('/', protect, adminOnly, createBlog);

// // Get blog by ID (admin)
// router.get('/admin/:id', protect, adminOnly, getBlogById);

// // Update blog
// router.put('/:id', protect, adminOnly, updateBlog);

// // Delete blog
// router.delete('/:id', protect, adminOnly, deleteBlog);

// // Bulk delete blogs
// router.post('/bulk-delete', protect, adminOnly, bulkDeleteBlogs);

// // Toggle featured status
// router.patch('/:id/featured', protect, adminOnly, toggleFeatured);

// // Toggle publish status
// router.patch('/:id/publish', protect, adminOnly, togglePublish);

// // Manage comments (admin)
// router.delete('/:blogId/comments/:commentId', protect, adminOnly, deleteComment);
// router.patch('/:blogId/comments/:commentId/approve', protect, adminOnly, approveComment);

// export default router;




















// server/routes/blog.routes.js - Add new routes
import express from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import {
  getBlogs,
  getBlogBySlug,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getFeaturedBlogs,
  getBlogsByCategory,
  getBlogsByTag,
  getRelatedBlogs,
  getLatestBlogs,
  getBlogStats,
  likeBlog,
  addComment,
  getComments,
  deleteComment,
  approveComment,
  bulkApproveComments,
  bulkDeleteBlogs,
  toggleFeatured,
  togglePublish
} from '../controllers/blog.controller.js';

const router = express.Router();

// ============================================
// PUBLIC ROUTES
// ============================================
router.get('/', getBlogs);
router.get('/featured', getFeaturedBlogs);
router.get('/latest', getLatestBlogs);
router.get('/category/:category', getBlogsByCategory);
router.get('/tag/:tag', getBlogsByTag);
router.get('/related/:id', getRelatedBlogs);
router.get('/stats/overview', getBlogStats);
router.get('/:slug', getBlogBySlug);

// ============================================
// PROTECTED ROUTES
// ============================================
router.post('/:id/like', protect, likeBlog);
router.post('/:id/comments', protect, addComment);

// ============================================
// ADMIN ROUTES
// ============================================
router.post('/', protect, adminOnly, createBlog);
router.get('/admin/:id', protect, adminOnly, getBlogById);
router.put('/:id', protect, adminOnly, updateBlog);
router.delete('/:id', protect, adminOnly, deleteBlog);
router.post('/bulk-delete', protect, adminOnly, bulkDeleteBlogs);
router.patch('/:id/featured', protect, adminOnly, toggleFeatured);
router.patch('/:id/publish', protect, adminOnly, togglePublish);
router.get('/:id/comments', protect, adminOnly, getComments);
router.delete('/:blogId/comments/:commentId', protect, adminOnly, deleteComment);
router.patch('/:blogId/comments/:commentId/approve', protect, adminOnly, approveComment);
router.post('/comments/bulk-approve', protect, adminOnly, bulkApproveComments);

export default router;











// // server/routes/blog.routes.js
// import express from 'express';
// import { body, validationResult } from 'express-validator';
// import { protect, adminOnly, optionalAuth } from '../middleware/auth.js';
// import { cacheMiddleware } from '../middleware/cache.js';
// import {
//   getBlogs,
//   getBlogBySlug,
//   getBlogById,
//   createBlog,
//   updateBlog,
//   deleteBlog,
//   getFeaturedBlogs,
//   getBlogsByCategory,
//   getBlogsByTag,
//   getRelatedBlogs,
//   getLatestBlogs,
//   getBlogStats,
//   likeBlog,
//   addComment,
//   getComments,
//   deleteComment,
//   approveComment,
//   bulkApproveComments,
//   bulkDeleteBlogs,
//   toggleFeatured,
//   togglePublish,
//   searchBlogs,
//   getBlogsByAuthor,
//   getColumnists,
//   bookmarkBlog,
//   bulkUploadBlogs,
//   bulkPublishBlogs,
//   getMostViewedBlogs,
//   getMostLikedBlogs
// } from '../controllers/blog.controller.js';

// const router = express.Router();

// // Validation helper
// const validateRequest = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ success: false, errors: errors.array() });
//   }
//   next();
// };

// // ============================================
// // PUBLIC ROUTES (No Authentication Required)
// // ============================================

// // Get all blogs with pagination and filters
// router.get('/', cacheMiddleware(300), getBlogs);

// // Search blogs
// router.get('/search', searchBlogs);

// // Get featured blogs
// router.get('/featured', cacheMiddleware(600), getFeaturedBlogs);

// // Get latest blogs
// router.get('/latest', getLatestBlogs);

// // Get blogs by category
// router.get('/category/:category', getBlogsByCategory);

// // Get blogs by tag
// router.get('/tag/:tag', getBlogsByTag);

// // Get blogs by author
// router.get('/author/:authorId', getBlogsByAuthor);

// // Get columnists (featured authors)
// router.get('/columnists', getColumnists);

// // Get related blogs
// router.get('/related/:id', getRelatedBlogs);

// // Get blog stats (public)
// router.get('/stats/overview', getBlogStats);

// // Get most viewed blogs
// router.get('/stats/most-viewed', getMostViewedBlogs);

// // Get most liked blogs
// router.get('/stats/most-liked', getMostLikedBlogs);

// // Get single blog by slug
// router.get('/:slug', optionalAuth, getBlogBySlug);

// // ============================================
// // USER INTERACTION ROUTES (Authentication Required)
// // ============================================

// // Like a blog
// router.post('/:id/like', protect, likeBlog);

// // Bookmark a blog
// router.post('/:id/bookmark', protect, bookmarkBlog);

// // Add comment to blog
// router.post('/:id/comments', protect, [
//   body('content').trim().notEmpty().withMessage('Comment content is required').isLength({ max: 1000 })
// ], validateRequest, addComment);

// // ============================================
// // ADMIN ROUTES (Admin Only)
// // ============================================

// // Get blog by ID (admin)
// router.get('/admin/:id', protect, adminOnly, getBlogById);

// // Create new blog
// router.post('/', protect, adminOnly, [
//   body('title').trim().notEmpty().withMessage('Title is required'),
//   body('content').trim().notEmpty().withMessage('Content is required'),
//   body('category').optional().isString()
// ], validateRequest, createBlog);

// // Update blog
// router.put('/:id', protect, adminOnly, updateBlog);

// // Delete blog
// router.delete('/:id', protect, adminOnly, deleteBlog);

// // Toggle featured status
// router.patch('/:id/featured', protect, adminOnly, toggleFeatured);

// // Toggle publish status
// router.patch('/:id/publish', protect, adminOnly, togglePublish);

// // Bulk operations
// router.post('/bulk/upload', protect, adminOnly, bulkUploadBlogs);
// router.post('/bulk-delete', protect, adminOnly, bulkDeleteBlogs);
// router.post('/bulk-publish', protect, adminOnly, bulkPublishBlogs);

// // Comment management (admin)
// router.get('/:id/comments', protect, adminOnly, getComments);
// router.delete('/:blogId/comments/:commentId', protect, adminOnly, deleteComment);
// router.patch('/:blogId/comments/:commentId/approve', protect, adminOnly, approveComment);
// router.post('/comments/bulk-approve', protect, adminOnly, bulkApproveComments);

// export default router;