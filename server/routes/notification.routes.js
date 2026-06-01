// // server/routes/notification.routes.js
// import express from 'express';
// import { protect } from '../middleware/auth.js';
// import {
//   getNotifications,
//   markAsRead,
//   markAllAsRead,
//   deleteNotification,
//   getUnreadCount,
//   updatePreferences
// } from '../controllers/notification.controller.js';

// const router = express.Router();

// router.get('/', protect, getNotifications);
// router.get('/unread-count', protect, getUnreadCount);
// router.put('/:id/read', protect, markAsRead);
// router.put('/read-all', protect, markAllAsRead);
// router.delete('/:id', protect, deleteNotification);
// router.put('/preferences', protect, updatePreferences);

// export default router;







// // server/routes/notification.routes.js
// import express from 'express';
// import { protect, adminOnly } from '../middleware/auth.js';
// import {
//   getNotifications,
//   markAsRead,
//   markAllAsRead,
//   deleteNotification,
//   getUnreadCount,
//   updatePreferences,
//   sendToAllUsers,
//   getNotificationAnalytics,
//   getGlobalNotice,
//   dismissGlobalNotice
// } from '../controllers/notification.controller.js';

// const router = express.Router();

// // ============================================
// // USER ROUTES
// // ============================================

// // Get user's notifications
// router.get('/', protect, getNotifications);

// // Get unread count
// router.get('/unread-count', protect, getUnreadCount);

// // Mark single notification as read
// router.put('/:id/read', protect, markAsRead);

// // Mark all notifications as read
// router.put('/read-all', protect, markAllAsRead);

// // Delete a notification
// router.delete('/:id', protect, deleteNotification);

// // Update notification preferences
// router.put('/preferences', protect, updatePreferences);

// // Dismiss global notice
// router.post('/dismiss-notice', protect, dismissGlobalNotice);

// // Get global active notice (public)
// router.get('/global-notice', getGlobalNotice);

// // ============================================
// // ADMIN ROUTES
// // ============================================

// // Send notification to all users (admin only)
// router.post('/send-to-all', protect, adminOnly, sendToAllUsers);

// // Get notification analytics (admin only)
// router.get('/analytics', protect, adminOnly, getNotificationAnalytics);

// export default router;








// // server/routes/notification.routes.js
// import express from 'express';
// import { protect, adminOnly } from '../middleware/auth.js';
// import {
//   // User routes
//   getNotifications,
//   markAsRead,
//   markAllAsRead,
//   deleteNotification,
//   getUnreadCount,
//   updatePreferences,
//   dismissGlobalNotice,
//   getGlobalNotice,
  
//   // Admin CRUD routes
//   adminGetAllNotifications,
//   adminGetNotificationById,
//   adminCreateNotification,
//   adminUpdateNotification,
//   adminDeleteNotification,
//   adminBulkDeleteNotifications,
//   updateGlobalNotice,
//   getNotificationStats
// } from '../controllers/notification.controller.js';

// const router = express.Router();

// // ============================================
// // PUBLIC ROUTES
// // ============================================
// router.get('/global-notice', getGlobalNotice);

// // ============================================
// // USER ROUTES (Authenticated users)
// // ============================================
// router.get('/', protect, getNotifications);
// router.get('/unread-count', protect, getUnreadCount);
// router.put('/:id/read', protect, markAsRead);
// router.put('/read-all', protect, markAllAsRead);
// router.delete('/:id', protect, deleteNotification);
// router.put('/preferences', protect, updatePreferences);
// router.post('/dismiss-notice', protect, dismissGlobalNotice);

// // ============================================
// // ADMIN CRUD ROUTES
// // ============================================

// // Get all notifications (admin view)
// router.get('/admin/all', protect, adminOnly, adminGetAllNotifications);

// // Get notification statistics
// router.get('/admin/stats', protect, adminOnly, getNotificationStats);

// // Get single notification by ID
// router.get('/admin/:id', protect, adminOnly, adminGetNotificationById);

// // Create new notification (send to users)
// router.post('/admin/create', protect, adminOnly, adminCreateNotification);

// // Update notification
// router.put('/admin/:id', protect, adminOnly, adminUpdateNotification);

// // Delete single notification
// router.delete('/admin/:id', protect, adminOnly, adminDeleteNotification);

// // Bulk delete notifications
// router.post('/admin/bulk-delete', protect, adminOnly, adminBulkDeleteNotifications);

// // Update global notice (homepage banner)
// router.put('/admin/global-notice', protect, adminOnly, updateGlobalNotice);

// export default router;










// server/routes/notification.routes.js
import express from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import {
  // User routes
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount,
  updatePreferences,
  dismissGlobalNotice,
  getGlobalNotice,
  
  // Admin CRUD routes
  adminGetAllNotifications,
  adminGetNotificationById,
  adminCreateNotification,
  adminUpdateNotification,
  adminDeleteNotification,
  adminBulkDeleteNotifications,
  updateGlobalNotice,
  getNotificationStats
} from '../controllers/notification.controller.js';

const router = express.Router();

// ============================================
// PUBLIC ROUTES (No authentication required)
// ============================================
router.get('/global-notice', getGlobalNotice);

// ============================================
// USER ROUTES (Authenticated users)
// ============================================
router.get('/', protect, getNotifications);
router.get('/unread-count', protect, getUnreadCount);
router.put('/:id/read', protect, markAsRead);
router.put('/read-all', protect, markAllAsRead);
router.delete('/:id', protect, deleteNotification);
router.put('/preferences', protect, updatePreferences);
router.post('/dismiss-notice', protect, dismissGlobalNotice);

// ============================================
// ADMIN CRUD ROUTES (Admin only)
// ============================================

// Get all notifications (admin view with filters)
router.get('/admin/all', protect, adminOnly, adminGetAllNotifications);

// Get notification statistics
router.get('/admin/stats', protect, adminOnly, getNotificationStats);

// Get single notification by ID
router.get('/admin/:id', protect, adminOnly, adminGetNotificationById);

// Create new notification (send to users)
router.post('/admin/create', protect, adminOnly, adminCreateNotification);

// Update notification
router.put('/admin/:id', protect, adminOnly, adminUpdateNotification);

// Delete single notification
router.delete('/admin/:id', protect, adminOnly, adminDeleteNotification);

// Bulk delete notifications
router.post('/admin/bulk-delete', protect, adminOnly, adminBulkDeleteNotifications);

// Update global notice (homepage banner)
router.put('/admin/global-notice', protect, adminOnly, updateGlobalNotice);

export default router;