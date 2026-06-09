// server/routes/comment.routes.js
import express from 'express';
import { body } from 'express-validator';
import { protect, optionalAuth } from '../middleware/auth.js';
import {
  getComments,
  addComment,
  updateComment,
  deleteComment,
  likeComment,
  reportComment,
  getReplies
} from '../controllers/comment.controller.js';

const router = express.Router();

// Public routes (with optional auth for like status)
router.get('/poem/:poemId', optionalAuth, getComments);
router.get('/:commentId/replies', optionalAuth, getReplies);

// Protected routes (require authentication)
router.post('/poem/:poemId', protect, [
  body('text').trim().notEmpty().withMessage('Comment text is required').isLength({ max: 1000 })
], addComment);

router.put('/:commentId', protect, [
  body('text').trim().notEmpty().withMessage('Comment text is required')
], updateComment);

router.delete('/:commentId', protect, deleteComment);

router.post('/:commentId/like', protect, likeComment);

router.post('/:commentId/report', protect, [
  body('reason').trim().notEmpty().withMessage('Report reason is required')
], reportComment);

export default router;