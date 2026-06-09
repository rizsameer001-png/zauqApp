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













// //working  server/routes/blog.routes.js
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




















// // server/routes/blog.routes.js - Add new routes
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
//   togglePublish
// } from '../controllers/blog.controller.js';

// const router = express.Router();

// // ============================================
// // PUBLIC ROUTES
// // ============================================
// router.get('/', getBlogs);
// router.get('/featured', getFeaturedBlogs);
// router.get('/latest', getLatestBlogs);
// router.get('/category/:category', getBlogsByCategory);
// router.get('/tag/:tag', getBlogsByTag);
// router.get('/related/:id', getRelatedBlogs);
// router.get('/stats/overview', getBlogStats);
// router.get('/:slug', getBlogBySlug);

// // ============================================
// // PROTECTED ROUTES
// // ============================================
// router.post('/:id/like', protect, likeBlog);
// router.post('/:id/comments', protect, addComment);

// // ============================================
// // ADMIN ROUTES
// // ============================================
// router.post('/', protect, adminOnly, createBlog);
// router.get('/admin/:id', protect, adminOnly, getBlogById);
// router.put('/:id', protect, adminOnly, updateBlog);
// router.delete('/:id', protect, adminOnly, deleteBlog);
// router.post('/bulk-delete', protect, adminOnly, bulkDeleteBlogs);
// router.patch('/:id/featured', protect, adminOnly, toggleFeatured);
// router.patch('/:id/publish', protect, adminOnly, togglePublish);
// router.get('/:id/comments', protect, adminOnly, getComments);
// router.delete('/:blogId/comments/:commentId', protect, adminOnly, deleteComment);
// router.patch('/:blogId/comments/:commentId/approve', protect, adminOnly, approveComment);
// router.post('/comments/bulk-approve', protect, adminOnly, bulkApproveComments);

// export default router;












// // server/routes/blog.routes.js
// import express from 'express';
// import { protect, adminOnly, optionalAuth } from '../middleware/auth.js';
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
//   togglePublish
// } from '../controllers/blog.controller.js';

// const router = express.Router();

// // ============================================
// // TEST ROUTE - To verify router is working
// // ============================================
// router.get('/test', (req, res) => {
//   res.json({ success: true, message: 'Blog API is working!' });
// });

// // ============================================
// // PUBLIC ROUTES (No authentication required)
// // ============================================
// router.get('/', getBlogs);
// router.get('/featured', getFeaturedBlogs);
// router.get('/latest', getLatestBlogs);
// router.get('/category/:category', getBlogsByCategory);
// router.get('/tag/:tag', getBlogsByTag);
// router.get('/related/:id', getRelatedBlogs);
// router.get('/stats/overview', getBlogStats);
// router.get('/:slug', optionalAuth, getBlogBySlug);  // This must be LAST

// // ============================================
// // PROTECTED ROUTES (Authentication required)
// // ============================================
// router.post('/:id/like', protect, likeBlog);
// router.post('/:id/comments', protect, addComment);

// // ============================================
// // ADMIN ROUTES (Admin only)
// // ============================================
// router.post('/', protect, adminOnly, createBlog);
// router.get('/admin/:id', protect, adminOnly, getBlogById);
// router.put('/:id', protect, adminOnly, updateBlog);
// router.delete('/:id', protect, adminOnly, deleteBlog);
// router.post('/bulk-delete', protect, adminOnly, bulkDeleteBlogs);
// router.patch('/:id/featured', protect, adminOnly, toggleFeatured);
// router.patch('/:id/publish', protect, adminOnly, togglePublish);

// // Comment management (admin)
// router.get('/:id/comments', protect, adminOnly, getComments);
// router.delete('/:blogId/comments/:commentId', protect, adminOnly, deleteComment);
// router.patch('/:blogId/comments/:commentId/approve', protect, adminOnly, approveComment);
// router.post('/comments/bulk-approve', protect, adminOnly, bulkApproveComments);

// export default router;














// server/routes/blog.routes.js
import express from 'express';
import { protect, adminOnly, optionalAuth } from '../middleware/auth.js';
import {
  getBlogs,
  searchBlogs,
  getBlogsByAuthor,
  getColumnists,
  getMostViewedBlogs,
  getMostLikedBlogs,
  getBlogBySlug,
  getBlogById,
  getFeaturedBlogs,
  getBlogsByCategory,
  getBlogsByTag,
  getRelatedBlogs,
  getLatestBlogs,
  getBlogStats,
  likeBlog,
  bookmarkBlog,
  addComment,
  getComments,
  deleteComment,
  approveComment,
  bulkApproveComments,
  createBlog,
  updateBlog,
  deleteBlog,
  bulkDeleteBlogs,
  bulkUploadBlogs,
  bulkPublishBlogs,
  toggleFeatured,
  togglePublish
} from '../controllers/blog.controller.js';

const router = express.Router();

// ============================================
// PUBLIC ROUTES
// ============================================
router.get('/', getBlogs);
router.get('/search', searchBlogs);
router.get('/featured', getFeaturedBlogs);
router.get('/latest', getLatestBlogs);
router.get('/category/:category', getBlogsByCategory);
router.get('/tag/:tag', getBlogsByTag);
router.get('/author/:authorId', getBlogsByAuthor);
router.get('/columnists', getColumnists);
router.get('/related/:id', getRelatedBlogs);
router.get('/stats/overview', getBlogStats);
router.get('/stats/most-viewed', getMostViewedBlogs);
router.get('/stats/most-liked', getMostLikedBlogs);
router.get('/:slug', optionalAuth, getBlogBySlug);

// ============================================
// PROTECTED ROUTES
// ============================================
router.post('/:id/like', protect, likeBlog);
router.post('/:id/bookmark', protect, bookmarkBlog);
router.post('/:id/comments', protect, addComment);

// ============================================
// ADMIN ROUTES
// ============================================
router.post('/', protect, adminOnly, createBlog);
router.post('/bulk/upload', protect, adminOnly, bulkUploadBlogs);
router.post('/bulk-publish', protect, adminOnly, bulkPublishBlogs);
router.post('/bulk-delete', protect, adminOnly, bulkDeleteBlogs);
router.get('/admin/:id', protect, adminOnly, getBlogById);
router.put('/:id', protect, adminOnly, updateBlog);
router.delete('/:id', protect, adminOnly, deleteBlog);
router.patch('/:id/featured', protect, adminOnly, toggleFeatured);
router.patch('/:id/publish', protect, adminOnly, togglePublish);
router.get('/:id/comments', protect, adminOnly, getComments);
router.delete('/:blogId/comments/:commentId', protect, adminOnly, deleteComment);
router.patch('/:blogId/comments/:commentId/approve', protect, adminOnly, approveComment);
router.post('/comments/bulk-approve', protect, adminOnly, bulkApproveComments);

export default router;