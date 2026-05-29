import express from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  logout,
  getMe,
  googleAuth,
  googleCallback,
  forgotPassword,
  resetPassword,
  verifyEmail,
  refreshToken
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], register);

router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
], login);

router.post('/logout', protect, logout);
router.get('/me', protect, getMe);
router.post('/refresh-token', refreshToken);

router.post('/forgot-password', [
  body('email').isEmail().withMessage('Valid email is required')
], forgotPassword);

router.post('/reset-password/:token', [
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], resetPassword);

router.get('/verify-email/:token', verifyEmail);

// Google OAuth
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);

export default router;
