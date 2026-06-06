// import express from 'express';
// import { body } from 'express-validator';
// import {
//   register,
//   login,
//   logout,
//   getMe,
//   googleAuth,
//   googleCallback,
//   forgotPassword,
//   resetPassword,
//   verifyEmail,
//   refreshToken,
//   updateProfile,
//   changePassword
// } from '../controllers/auth.controller.js';
// import { protect } from '../middleware/auth.js';

// const router = express.Router();

// // ============================================
// // PUBLIC ROUTES
// // ============================================

// // Register
// router.post('/register', [
//   body('name')
//     .trim()
//     .notEmpty().withMessage('Name is required')
//     .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
//   body('email')
//     .isEmail().withMessage('Valid email is required')
//     .normalizeEmail(),
//   body('password')
//     .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
//     .matches(/^(?=.*[a-zA-Z])(?=.*\d)/).withMessage('Password must contain letters and numbers')
// ], register);

// // Login
// router.post('/login', [
//   body('email')
//     .isEmail().withMessage('Valid email is required')
//     .normalizeEmail(),
//   body('password')
//     .notEmpty().withMessage('Password is required')
// ], login);

// // Forgot Password
// router.post('/forgot-password', [
//   body('email').isEmail().withMessage('Valid email is required')
// ], forgotPassword);

// // Reset Password
// router.post('/reset-password/:token', [
//   body('password')
//     .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
// ], resetPassword);

// // Verify Email
// router.get('/verify-email/:token', verifyEmail);

// // Refresh Token
// router.post('/refresh-token', refreshToken);

// // Google OAuth
// router.get('/google', googleAuth);
// router.get('/google/callback', googleCallback);

// // ============================================
// // PROTECTED ROUTES
// // ============================================

// // Get Current User
// router.get('/me', protect, getMe);

// // Logout
// router.post('/logout', protect, logout);

// // Update Profile
// router.put('/profile', protect, [
//   body('name').optional().trim().isLength({ min: 2, max: 100 }),
//   body('bio').optional().trim().isLength({ max: 500 })
// ], updateProfile);

// // Change Password
// router.put('/change-password', protect, [
//   body('currentPassword').notEmpty(),
//   body('newPassword').isLength({ min: 6 })
// ], changePassword);

// export default router;












// server/routes/auth.routes.js
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
  verifyToken,        // ✅ NEW: Import verifyToken controller
  updateProfile,
  changePassword
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// ============================================
// PUBLIC ROUTES (No authentication required)
// ============================================

// ------------------- AUTHENTICATION -------------------
/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
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

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', [
  body('email')
    .isEmail().withMessage('Valid email is required')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
], login);

// ------------------- PASSWORD MANAGEMENT -------------------
/**
 * @route   POST /api/auth/forgot-password
 * @desc    Send password reset email
 * @access  Public
 */
router.post('/forgot-password', [
  body('email').isEmail().withMessage('Valid email is required')
], forgotPassword);

/**
 * @route   POST /api/auth/reset-password/:token
 * @desc    Reset password using token
 * @access  Public
 */
router.post('/reset-password/:token', [
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], resetPassword);

// ------------------- EMAIL VERIFICATION -------------------
/**
 * @route   GET /api/auth/verify-email/:token
 * @desc    Verify user email address
 * @access  Public
 */
router.get('/verify-email/:token', verifyEmail);

// ------------------- TOKEN MANAGEMENT -------------------
/**
 * @route   POST /api/auth/refresh-token
 * @desc    Refresh access token using refresh token (from cookie or body)
 * @access  Public (requires valid refresh token)
 */
router.post('/refresh-token', refreshToken);

/**
 * @route   POST /api/auth/verify-token
 * @desc    Verify if current access token is valid and get user info
 * @access  Public (but requires token in header)
 * @body    { token } - Optional, will use Authorization header if not provided
 * @returns { valid: boolean, user: object }
 * 
 * @example Used on page refresh to restore session without re-login
 */
router.post('/verify-token', verifyToken);

// ------------------- SOCIAL AUTH -------------------
/**
 * @route   GET /api/auth/google
 * @desc    Initiate Google OAuth flow
 * @access  Public
 */
router.get('/google', googleAuth);

/**
 * @route   GET /api/auth/google/callback
 * @desc    Google OAuth callback handler
 * @access  Public
 */
router.get('/google/callback', googleCallback);

// ============================================
// PROTECTED ROUTES (Authentication required)
// ============================================

/**
 * @route   GET /api/auth/me
 * @desc    Get current logged-in user's profile
 * @access  Private
 */
router.get('/me', protect, getMe);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user and clear cookies
 * @access  Private
 */
router.post('/logout', protect, logout);

/**
 * @route   PUT /api/auth/profile
 * @desc    Update user profile (name, bio, preferences)
 * @access  Private
 */
router.put('/profile', protect, [
  body('name').optional().trim().isLength({ min: 2, max: 100 }),
  body('bio').optional().trim().isLength({ max: 500 })
], updateProfile);

/**
 * @route   PUT /api/auth/change-password
 * @desc    Change user password
 * @access  Private
 */
router.put('/change-password', protect, [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
], changePassword);

export default router;
