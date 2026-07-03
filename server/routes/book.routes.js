// import express from 'express';
// import { body } from 'express-validator';
// import { protect, optionalAuth } from '../middleware/auth.js';
// import { cacheMiddleware } from '../middleware/cache.js';
// import {
//   getBooks,
//   getBookBySlug,
//   createBook,
//   updateBook,
//   deleteBook,
//   getFeaturedBooks,
//   getBookReader,
//   downloadBook,
//   rateBook,
//   getBookPreview
// } from '../controllers/book.controller.js';

// const router = express.Router();

// router.get('/', cacheMiddleware(300), getBooks);
// router.get('/featured', cacheMiddleware(600), getFeaturedBooks);
// router.get('/:slug', optionalAuth, getBookBySlug);
// router.get('/:slug/reader', protect, getBookReader);
// router.get('/:slug/preview', getBookPreview);
// router.get('/:slug/download', protect, downloadBook);

// router.post('/', protect, [
//   body('title').trim().notEmpty(),
//   body('author').notEmpty(),
//   body('description').trim().notEmpty()
// ], createBook);

// router.put('/:id', protect, updateBook);
// router.delete('/:id', protect, deleteBook);
// router.post('/:id/rate', protect, [
//   body('rating').isInt({ min: 1, max: 5 }),
//   body('review').optional().trim().isLength({ max: 2000 })
// ], rateBook);

// export default router;



// // server/routes/book.routes.js
// import express from 'express';
// import { body } from 'express-validator';
// import { protect, optionalAuth } from '../middleware/auth.js';
// import { cacheMiddleware } from '../middleware/cache.js';
// import {
//   getBooks,
//   getBookBySlug,
//   createBook,
//   updateBook,
//   deleteBook,
//   getFeaturedBooks,
//   getBookReader,
//   downloadBook,
//   rateBook,
//   getBookPreview,
//   getBooksByAuthor,
//   getRelatedBooks
// } from '../controllers/book.controller.js';

// const router = express.Router();

// // Public routes
// router.get('/', cacheMiddleware(300), optionalAuth, getBooks);
// router.get('/featured', cacheMiddleware(600), getFeaturedBooks);
// router.get('/author/:authorId', getBooksByAuthor);
// router.get('/:slug', optionalAuth, getBookBySlug);
// router.get('/:slug/reader', protect, getBookReader);
// router.get('/:slug/preview', getBookPreview);
// router.get('/:slug/download', protect, downloadBook);
// router.get('/:slug/related', getRelatedBooks);

// // Protected routes
// router.post('/', protect, [
//   body('title').trim().notEmpty().withMessage('Title is required'),
//   body('author').notEmpty().withMessage('Author is required'),
//   body('description').optional().trim()
// ], createBook);

// router.put('/:id', protect, updateBook);
// router.delete('/:id', protect, deleteBook);
// router.post('/:id/rate', protect, [
//   body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
//   body('review').optional().trim().isLength({ max: 2000 })
// ], rateBook);

// export default router;











// // server/routes/book.routes.js
// import express from 'express';
// import { body } from 'express-validator';
// import { protect, optionalAuth } from '../middleware/auth.js';
// import { cacheMiddleware } from '../middleware/cache.js';
// import {
//   getBooks,
//   getBookBySlug,
//   createBook,
//   updateBook,
//   deleteBook,
//   getFeaturedBooks,
//   getBookReader,
//   downloadBook,
//   rateBook,
//   getBookPreview,
//   getBooksByAuthor,
//   getRelatedBooks,
//   // ============================================
//   // NEW: Import page-related controller functions
//   // ============================================
//   getBookPages,
//   getBookPage
// } from '../controllers/book.controller.js';

// const router = express.Router();

// // ============================================
// // PUBLIC ROUTES
// // ============================================

// // Get all books with pagination and filters
// router.get('/', cacheMiddleware(300), optionalAuth, getBooks);

// // Get featured books
// router.get('/featured', cacheMiddleware(600), getFeaturedBooks);

// // Get books by author ID
// router.get('/author/:authorId', getBooksByAuthor);

// // ============================================
// // SLUG-BASED PUBLIC ROUTES
// // ============================================

// // Get single book by slug
// router.get('/:slug', optionalAuth, getBookBySlug);

// // Get book preview (lightweight version)
// router.get('/:slug/preview', getBookPreview);

// // Get related books
// router.get('/:slug/related', getRelatedBooks);

// // ============================================
// // NEW: Book Reader Routes (Page-by-Page Navigation)
// // ============================================

// // Get all pages for a book (for the reader - returns array of image URLs)
// // Example: GET /api/books/my-book-slug/pages
// router.get('/:slug/pages', optionalAuth, getBookPages);

// // Get a single page by number (for progressive loading)
// // Example: GET /api/books/my-book-slug/page/1
// router.get('/:slug/page/:pageNumber', optionalAuth, getBookPage);

// // Get book reader (PDF/EPUB fallback)
// router.get('/:slug/reader', protect, getBookReader);

// // Download book (PDF/EPUB)
// router.get('/:slug/download', protect, downloadBook);

// // ============================================
// // PROTECTED ROUTES (Admin/Creator only)
// // ============================================

// // Create new book
// router.post('/', protect, [
//   body('title').trim().notEmpty().withMessage('Title is required'),
//   body('author').notEmpty().withMessage('Author is required'),
//   body('description').optional().trim()
// ], createBook);

// // Update book by ID
// router.put('/:id', protect, updateBook);

// // Delete book by ID
// router.delete('/:id', protect, deleteBook);

// // Rate a book
// router.post('/:id/rate', protect, [
//   body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
//   body('review').optional().trim().isLength({ max: 2000 })
// ], rateBook);

// export default router;











// // working server/routes/book.routes.js
// import express from 'express';
// import { body } from 'express-validator';
// import { protect, optionalAuth } from '../middleware/auth.js';
// import { cacheMiddleware } from '../middleware/cache.js';
// import {
//   getBooks,
//   getBookBySlug,
//   createBook,
//   updateBook,
//   deleteBook,
//   getFeaturedBooks,
//   getBookReader,
//   downloadBook,
//   rateBook,
//   getBookPreview,
//   getBooksByAuthor,
//   getRelatedBooks,
//   getBookPages,
//   getBookPage,
//   likeBook,
//   bookmarkBook,
//   getBookLikeStatus,
//   getBookBookmarkStatus
// } from '../controllers/book.controller.js';

// const router = express.Router();

// // ============================================
// // PUBLIC ROUTES
// // ============================================

// // Get all books with pagination and filters
// router.get('/', cacheMiddleware(300), optionalAuth, getBooks);

// // Get featured books
// router.get('/featured', cacheMiddleware(600), getFeaturedBooks);

// // Get books by author ID
// router.get('/author/:authorId', getBooksByAuthor);

// // ============================================
// // SLUG-BASED PUBLIC ROUTES
// // ============================================

// // Get single book by slug
// router.get('/:slug', optionalAuth, getBookBySlug);

// // Get book preview (lightweight version)
// router.get('/:slug/preview', getBookPreview);

// // Get related books
// router.get('/:slug/related', getRelatedBooks);

// // ============================================
// // BOOK READER ROUTES (Page-by-Page Navigation)
// // ============================================

// // Get all pages for a book (for the reader - returns array of image URLs)
// // Example: GET /api/books/my-book-slug/pages
// router.get('/:slug/pages', optionalAuth, getBookPages);

// // Get a single page by number (for progressive loading)
// // Example: GET /api/books/my-book-slug/page/1
// router.get('/:slug/page/:pageNumber', optionalAuth, getBookPage);

// // Get book reader (PDF/EPUB fallback)
// router.get('/:slug/reader', protect, getBookReader);

// // Download book (PDF/EPUB)
// router.get('/:slug/download', protect, downloadBook);

// // ============================================
// // LIKE & BOOKMARK ROUTES (Using ID)
// // ============================================

// // Like/Unlike a book (works with both POST and DELETE)
// router.post('/:id/like', protect, likeBook);
// router.delete('/:id/like', protect, likeBook);

// // Bookmark/Remove bookmark
// router.post('/:id/bookmark', protect, bookmarkBook);
// router.delete('/:id/bookmark', protect, bookmarkBook);

// // Get like/bookmark status (optional helper routes)
// router.get('/:id/like-status', protect, getBookLikeStatus);
// router.get('/:id/bookmark-status', protect, getBookBookmarkStatus);

// // ============================================
// // PROTECTED ROUTES (Admin/Creator only)
// // ============================================

// // Create new book
// router.post('/', protect, [
//   body('title').trim().notEmpty().withMessage('Title is required'),
//   body('author').notEmpty().withMessage('Author is required'),
//   body('description').optional().trim()
// ], createBook);

// // Update book by ID
// router.put('/:id', protect, updateBook);

// // Delete book by ID
// router.delete('/:id', protect, deleteBook);

// // Rate a book
// router.post('/:id/rate', protect, [
//   body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
//   body('review').optional().trim().isLength({ max: 2000 })
// ], rateBook);

// export default router;





















// // server/routes/book.routes.js
// import express from 'express';
// import { body } from 'express-validator';
// import { protect, optionalAuth } from '../middleware/auth.js';
// import { cacheMiddleware } from '../middleware/cache.js';
// import {
//   getBooks,
//   getBookBySlug,
//   createBook,
//   updateBook,
//   deleteBook,
//   getFeaturedBooks,
//   getBookReader,
//   downloadBook,
//   rateBook,
//   getBookPreview,
//   getBooksByAuthor,
//   getRelatedBooks,
//   getBookPages,
//   getBookPage,
//   likeBook,
//   bookmarkBook,
//   getBookLikeStatus,
//   getBookBookmarkStatus,
//   exportBooks,
//   exportSingleBook,
//   bulkCreateBooks
// } from '../controllers/book.controller.js';

// const router = express.Router();

// // ============================================
// // PUBLIC ROUTES
// // ============================================

// // Get all books with pagination and filters
// router.get('/', cacheMiddleware(300), optionalAuth, getBooks);

// // Get featured books
// router.get('/featured', cacheMiddleware(600), getFeaturedBooks);

// // Get books by author ID or slug
// router.get('/author/:authorId', getBooksByAuthor);

// // ============================================
// // SLUG-BASED PUBLIC ROUTES
// // ============================================

// // Get single book by slug
// router.get('/:slug', optionalAuth, getBookBySlug);

// // Get book preview (lightweight version)
// router.get('/:slug/preview', getBookPreview);

// // Get related books
// router.get('/:slug/related', getRelatedBooks);

// // ============================================
// // BOOK READER ROUTES (Page-by-Page Navigation)
// // ============================================

// // Get all pages for a book
// router.get('/:slug/pages', optionalAuth, getBookPages);

// // Get a single page by number
// router.get('/:slug/page/:pageNumber', optionalAuth, getBookPage);

// // Get book reader (PDF/EPUB fallback)
// router.get('/:slug/reader', protect, getBookReader);

// // Download book (PDF/EPUB)
// router.get('/:slug/download', protect, downloadBook);

// // ============================================
// // EXPORT ROUTES (Admin only - Backup)
// // ============================================

// // Export all books (JSON or CSV)
// router.get('/export/all', protect, exportBooks);

// // Export single book by ID
// router.get('/export/:id', protect, exportSingleBook);

// // ============================================
// // BULK IMPORT ROUTE (Admin only - Restore)
// // ============================================

// // Bulk upload books (JSON array)
// router.post('/bulk', protect, bulkCreateBooks);

// // ============================================
// // LIKE & BOOKMARK ROUTES
// // ============================================

// // Like/Unlike a book
// router.post('/:id/like', protect, likeBook);
// router.delete('/:id/like', protect, likeBook);

// // Bookmark/Remove bookmark
// router.post('/:id/bookmark', protect, bookmarkBook);
// router.delete('/:id/bookmark', protect, bookmarkBook);

// // Get like/bookmark status
// router.get('/:id/like-status', protect, getBookLikeStatus);
// router.get('/:id/bookmark-status', protect, getBookBookmarkStatus);

// // ============================================
// // PROTECTED ROUTES (Admin/Creator only)
// // ============================================

// // Create new book
// router.post('/', protect, [
//   body('title').trim().notEmpty().withMessage('Title is required'),
//   body('author').notEmpty().withMessage('Author is required'),
//   body('description').optional().trim()
// ], createBook);

// // Update book by ID
// router.put('/:id', protect, updateBook);

// // Delete book by ID
// router.delete('/:id', protect, deleteBook);

// // Rate a book
// router.post('/:id/rate', protect, [
//   body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
//   body('review').optional().trim().isLength({ max: 2000 })
// ], rateBook);

// export default router;












// server/routes/book.routes.js
import express from 'express';
import { body } from 'express-validator';
import { protect, optionalAuth } from '../middleware/auth.js';
import { cacheMiddleware } from '../middleware/cache.js';
import {
  getBooks,
  getBookBySlug,
  createBook,
  updateBook,
  deleteBook,
  getFeaturedBooks,
  getBookReader,
  downloadBook,
  rateBook,
  getBookPreview,
  getBooksByAuthor,
  getRelatedBooks,
  getBookPages,
  getBookPage,
  likeBook,
  bookmarkBook,
  getBookLikeStatus,
  getBookBookmarkStatus,
  exportBooks,
  exportSingleBook,
  bulkCreateBooks
} from '../controllers/book.controller.js';

const router = express.Router();

// ============================================
// PUBLIC ROUTES
// ============================================

// Get all books with pagination and filters
router.get('/', cacheMiddleware(300), optionalAuth, getBooks);

// Get featured books
router.get('/featured', cacheMiddleware(600), getFeaturedBooks);

// Get books by author ID or slug
router.get('/author/:authorId', getBooksByAuthor);

// ============================================
// EXPORT ROUTES (Admin only - Backup)
// ⚠️ MUST COME BEFORE DYNAMIC ROUTES
// ============================================

// Export all books (JSON or CSV)
router.get('/export/all', protect, exportBooks);

// Export single book by ID
router.get('/export/:id', protect, exportSingleBook);

// ============================================
// BULK IMPORT ROUTE (Admin only - Restore)
// ============================================

// Bulk upload books (JSON array)
router.post('/bulk', protect, bulkCreateBooks);

// ============================================
// ⚠️ DYNAMIC ROUTES - MUST COME LAST
// ============================================

// Get single book by slug (this will catch /export/all if placed before export routes)
router.get('/:slug', optionalAuth, getBookBySlug);

// Get book preview (lightweight version)
router.get('/:slug/preview', getBookPreview);

// Get related books
router.get('/:slug/related', getRelatedBooks);

// ============================================
// BOOK READER ROUTES (Page-by-Page Navigation)
// ============================================

// Get all pages for a book
router.get('/:slug/pages', optionalAuth, getBookPages);

// Get a single page by number
router.get('/:slug/page/:pageNumber', optionalAuth, getBookPage);

// Get book reader (PDF/EPUB fallback)
router.get('/:slug/reader', protect, getBookReader);

// Download book (PDF/EPUB)
router.get('/:slug/download', protect, downloadBook);

// ============================================
// LIKE & BOOKMARK ROUTES (Using ID, not slug)
// ============================================

// Like/Unlike a book
router.post('/:id/like', protect, likeBook);
router.delete('/:id/like', protect, likeBook);

// Bookmark/Remove bookmark
router.post('/:id/bookmark', protect, bookmarkBook);
router.delete('/:id/bookmark', protect, bookmarkBook);

// Get like/bookmark status
router.get('/:id/like-status', protect, getBookLikeStatus);
router.get('/:id/bookmark-status', protect, getBookBookmarkStatus);

// ============================================
// PROTECTED ROUTES (Admin/Creator only)
// ============================================

// Create new book
router.post('/', protect, [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('description').optional().trim()
], createBook);

// Update book by ID
router.put('/:id', protect, updateBook);

// Delete book by ID
router.delete('/:id', protect, deleteBook);

// Rate a book
router.post('/:id/rate', protect, [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('review').optional().trim().isLength({ max: 2000 })
], rateBook);

export default router;