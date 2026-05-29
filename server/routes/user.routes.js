//server/routes/user.routes.js

import express from 'express';
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

router.get('/profile', protect, getProfile);
router.put('/profile', protect, [
  body('name').optional().trim().notEmpty(),
  body('bio').optional().trim().isLength({ max: 500 })
], updateProfile);

router.put('/password', protect, [
  body('currentPassword').notEmpty(),
  body('newPassword').isLength({ min: 6 })
], updatePassword);

router.post('/avatar', protect, uploadAvatar);

// Favorites
router.get('/favorites', protect, getFavorites);
router.post('/favorites', protect, addToFavorites);
router.delete('/favorites/:type/:id', protect, removeFromFavorites);

// History
router.get('/history', protect, getHistory);

// Downloads
router.get('/downloads', protect, getDownloads);

// Follow
router.post('/follow/:authorId', protect, followAuthor);
router.delete('/follow/:authorId', protect, unfollowAuthor);

// Notifications
router.get('/notifications', protect, getNotifications);
router.put('/notifications/:id/read', protect, markNotificationRead);
router.put('/notifications/read-all', protect, markNotificationRead);

// Reading Progress
router.get('/progress/:contentType/:contentId', protect, getReadingProgress);
router.post('/progress', protect, updateReadingProgress);

export default router;
