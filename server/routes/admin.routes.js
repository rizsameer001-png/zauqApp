
//server/routes/admin.routes.js
import express from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import {
  getDashboard,
  getUsers,
  getUserById,
  updateUser,
  banUser,
  unbanUser,
  getContentOverview,
  getPendingContent,
  approveContent,
  rejectContent,
  getReports,
  getSettings,
  updateSettings,
  getSystemHealth
} from '../controllers/admin.controller.js';

const router = express.Router();

router.get('/dashboard', protect, adminOnly, getDashboard);
router.get('/users', protect, adminOnly, getUsers);
router.get('/users/:id', protect, adminOnly, getUserById);
router.put('/users/:id', protect, adminOnly, updateUser);
router.post('/users/:id/ban', protect, adminOnly, banUser);
router.post('/users/:id/unban', protect, adminOnly, unbanUser);

router.get('/content', protect, adminOnly, getContentOverview);
router.get('/content/pending', protect, adminOnly, getPendingContent);
router.post('/content/:id/approve', protect, adminOnly, approveContent);
router.post('/content/:id/reject', protect, adminOnly, rejectContent);

router.get('/reports', protect, adminOnly, getReports);
router.get('/settings', protect, adminOnly, getSettings);
router.put('/settings', protect, adminOnly, updateSettings);
router.get('/health', protect, adminOnly, getSystemHealth);

export default router;
