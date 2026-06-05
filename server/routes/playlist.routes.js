// server/routes/playlist.routes.js
import express from 'express';
import { protect, optionalAuth, adminOnly } from '../middleware/auth.js';
import {
  getAllPlaylists,
  getPlaylist,
  getUserPlaylists,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  addToPlaylist,
  removeFromPlaylist,
  reorderPlaylist,
  getPlaylistStats,
  followPlaylist,
  unfollowPlaylist,
  getFollowedPlaylists,
  searchPlaylists,
  getRecommendedPlaylists
} from '../controllers/playlist.controller.js';

const router = express.Router();

// Public routes
router.get('/', getAllPlaylists);
router.get('/search', searchPlaylists);
router.get('/recommended', getRecommendedPlaylists);
router.get('/:id', getPlaylist);
router.get('/:id/stats', getPlaylistStats);

// Protected routes
router.get('/user/me', protect, getUserPlaylists);
router.get('/followed/me', protect, getFollowedPlaylists);
router.post('/', protect, createPlaylist);
router.put('/:id', protect, updatePlaylist);
router.delete('/:id', protect, deletePlaylist);
router.post('/:id/follow', protect, followPlaylist);
router.delete('/:id/follow', protect, unfollowPlaylist);
router.post('/:id/audios', protect, addToPlaylist);
router.delete('/:id/audios/:audioId', protect, removeFromPlaylist);
router.put('/:id/reorder', protect, reorderPlaylist);

export default router;