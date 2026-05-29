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
  refreshToken,
  updateProfile,
  changePassword
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// ============================================
// PUBLIC ROUTES
// ============================================

// Register
router.post('/register', [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  body('email')
    .isEmail().withMessage('Valid email is required')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)/).withMessage('Password must contain letters and numbers')
], register);

// Login
router.post('/login', [
  body('email')
    .isEmail().withMessage('Valid email is required')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
], login);

// Forgot Password
router.post('/forgot-password', [
  body('email').isEmail().withMessage('Valid email is required')
], forgotPassword);

// Reset Password
router.post('/reset-password/:token', [
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], resetPassword);

// Verify Email
router.get('/verify-email/:token', verifyEmail);

// Refresh Token
router.post('/refresh-token', refreshToken);

// Google OAuth
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);

// ============================================
// PROTECTED ROUTES
// ============================================

// Get Current User
router.get('/me', protect, getMe);

// Logout
router.post('/logout', protect, logout);

// Update Profile
router.put('/profile', protect, [
  body('name').optional().trim().isLength({ min: 2, max: 100 }),
  body('bio').optional().trim().isLength({ max: 500 })
], updateProfile);

// Change Password
router.put('/change-password', protect, [
  body('currentPassword').notEmpty(),
  body('newPassword').isLength({ min: 6 })
], changePassword);

export default router;
