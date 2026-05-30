// //server/routes/user.routes.js

// import express from 'express';
// import { body } from 'express-validator';
// import { protect } from '../middleware/auth.js';
// import {
//   getProfile,
//   updateProfile,
//   updatePassword,
//   uploadAvatar,
//   getFavorites,
//   addToFavorites,
//   removeFromFavorites,
//   getHistory,
//   getDownloads,
//   followAuthor,
//   unfollowAuthor,
//   getNotifications,
//   markNotificationRead,
//   getReadingProgress,
//   updateReadingProgress
// } from '../controllers/user.controller.js';

// const router = express.Router();

// router.get('/profile', protect, getProfile);
// router.put('/profile', protect, [
//   body('name').optional().trim().notEmpty(),
//   body('bio').optional().trim().isLength({ max: 500 })
// ], updateProfile);

// router.put('/password', protect, [
//   body('currentPassword').notEmpty(),
//   body('newPassword').isLength({ min: 6 })
// ], updatePassword);

// router.post('/avatar', protect, uploadAvatar);

// // Favorites
// router.get('/favorites', protect, getFavorites);
// router.post('/favorites', protect, addToFavorites);
// router.delete('/favorites/:type/:id', protect, removeFromFavorites);

// // History
// router.get('/history', protect, getHistory);

// // Downloads
// router.get('/downloads', protect, getDownloads);

// // Follow
// router.post('/follow/:authorId', protect, followAuthor);
// router.delete('/follow/:authorId', protect, unfollowAuthor);

// // Notifications
// router.get('/notifications', protect, getNotifications);
// router.put('/notifications/:id/read', protect, markNotificationRead);
// router.put('/notifications/read-all', protect, markNotificationRead);

// // Reading Progress
// router.get('/progress/:contentType/:contentId', protect, getReadingProgress);
// router.post('/progress', protect, updateReadingProgress);

// export default router;










// server/routes/user.routes.js
import express from 'express';
import multer from 'multer';
import { body } from 'express-validator';
import { protect } from '../middleware/auth.js';
import {
  getProfile,
  updateProfile,
  updatePassword,
  uploadAvatar,
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  getHistory,
  getDownloads,
  followAuthor,
  unfollowAuthor,
  getNotifications,
  markNotificationRead,
  getReadingProgress,
  updateReadingProgress
} from '../controllers/user.controller.js';

const router = express.Router();

// ============================================
// MULTER CONFIGURATION FOR FILE UPLOADS
// ============================================

// Configure multer for memory storage (works with Cloudinary)
const storage = multer.memoryStorage();

// File filter to validate image types
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, WEBP, and GIF images are allowed'), false);
  }
};

// Create multer upload instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB limit
  },
  fileFilter: fileFilter
});

// ============================================
// USER PROFILE ROUTES
// ============================================

// Get user profile
router.get('/profile', protect, getProfile);

// Update user profile
router.put('/profile', protect, [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('bio').optional().trim().isLength({ max: 500 }).withMessage('Bio cannot exceed 500 characters'),
  body('preferences').optional().isObject()
], updateProfile);

// Update password
router.put('/password', protect, [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
], updatePassword);

// Upload avatar - with multer middleware
router.post('/avatar', protect, upload.single('avatar'), uploadAvatar);

// Alternative: Support 'image' field name as well
router.post('/avatar/upload', protect, upload.single('image'), uploadAvatar);

// ============================================
// FAVORITES ROUTES
// ============================================

// Get user favorites (optionally filtered by type)
router.get('/favorites', protect, getFavorites);

// Add item to favorites
router.post('/favorites', protect, addToFavorites);

// Remove item from favorites
router.delete('/favorites/:type/:id', protect, removeFromFavorites);

// ============================================
// READING HISTORY ROUTES
// ============================================

// Get user reading history
router.get('/history', protect, getHistory);

// ============================================
// DOWNLOADS ROUTES
// ============================================

// Get user downloads
router.get('/downloads', protect, getDownloads);

// ============================================
// AUTHOR FOLLOWING ROUTES
// ============================================

// Follow an author
router.post('/follow/:authorId', protect, followAuthor);

// Unfollow an author
router.delete('/follow/:authorId', protect, unfollowAuthor);

// ============================================
// NOTIFICATIONS ROUTES
// ============================================

// Get user notifications
router.get('/notifications', protect, getNotifications);

// Mark a single notification as read
router.put('/notifications/:id/read', protect, markNotificationRead);

// Mark all notifications as read
router.put('/notifications/read-all', protect, markNotificationRead);

// ============================================
// READING PROGRESS ROUTES
// ============================================

// Get reading progress for specific content
router.get('/progress/:contentType/:contentId', protect, getReadingProgress);

// Update reading progress
router.post('/progress', protect, updateReadingProgress);

export default router;