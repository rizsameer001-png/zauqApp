// server/controllers/playlist.controller.js
import Playlist from '../models/Playlist.js';
import Audio from '../models/Audio.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
import { getPagination } from '../utils/pagination.js';

// Get all public playlists
export const getAllPlaylists = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const { category, sort = 'newest' } = req.query;
    
    const filter = { isPublic: true };
    if (category) filter.category = category;
    
    let sortOption = {};
    if (sort === 'newest') sortOption = { createdAt: -1 };
    if (sort === 'popular') sortOption = { 'stats.followers': -1 };
    if (sort === 'trending') sortOption = { 'stats.views': -1 };
    
    const playlists = await Playlist.find(filter)
      .populate('user', 'name avatar')
      .populate('audios', 'title slug duration thumbnail')
      .sort(sortOption)
      .skip(skip)
      .limit(limit);
    
    const total = await Playlist.countDocuments(filter);
    
    paginatedResponse(res, playlists, { page, limit, total });
  } catch (error) {
    console.error('Error in getAllPlaylists:', error);
    next(error);
  }
};

// Get single playlist
export const getPlaylist = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const playlist = await Playlist.findById(id)
      .populate('user', 'name avatar bio')
      .populate('audios', 'title slug duration thumbnail stats author')
      .populate({
        path: 'audios',
        populate: { path: 'author', select: 'name slug avatar' }
      });
    
    if (!playlist) {
      return errorResponse(res, 'Playlist not found', 404);
    }
    
    if (!playlist.isPublic && (!req.user || playlist.user._id.toString() !== req.user.id)) {
      return errorResponse(res, 'Playlist not found', 404);
    }
    
    // Increment views
    playlist.stats.views += 1;
    await playlist.save();
    
    successResponse(res, playlist);
  } catch (error) {
    console.error('Error in getPlaylist:', error);
    next(error);
  }
};

// Get user's playlists
export const getUserPlaylists = async (req, res, next) => {
  try {
    const playlists = await Playlist.find({ user: req.user.id })
      .populate('audios', 'title slug duration thumbnail')
      .sort({ createdAt: -1 });
    
    successResponse(res, playlists);
  } catch (error) {
    console.error('Error in getUserPlaylists:', error);
    next(error);
  }
};

// Create playlist
export const createPlaylist = async (req, res, next) => {
  try {
    const { name, description, coverImage, isPublic } = req.body;
    
    if (!name || !name.trim()) {
      return errorResponse(res, 'Playlist name is required', 400);
    }
    
    const playlist = await Playlist.create({
      name: name.trim(),
      description: description || '',
      coverImage: coverImage || '',
      isPublic: isPublic !== false,
      user: req.user.id,
      audios: [],
      stats: { views: 0, followers: 0 }
    });
    
    successResponse(res, playlist, 'Playlist created successfully', 201);
  } catch (error) {
    console.error('Error in createPlaylist:', error);
    next(error);
  }
};

// Update playlist
export const updatePlaylist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, coverImage, isPublic } = req.body;
    
    const playlist = await Playlist.findOne({ _id: id, user: req.user.id });
    
    if (!playlist) {
      return errorResponse(res, 'Playlist not found', 404);
    }
    
    if (name) playlist.name = name.trim();
    if (description !== undefined) playlist.description = description;
    if (coverImage !== undefined) playlist.coverImage = coverImage;
    if (isPublic !== undefined) playlist.isPublic = isPublic;
    
    await playlist.save();
    
    successResponse(res, playlist, 'Playlist updated successfully');
  } catch (error) {
    console.error('Error in updatePlaylist:', error);
    next(error);
  }
};

// Delete playlist
export const deletePlaylist = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const playlist = await Playlist.findOneAndDelete({ _id: id, user: req.user.id });
    
    if (!playlist) {
      return errorResponse(res, 'Playlist not found', 404);
    }
    
    successResponse(res, null, 'Playlist deleted successfully');
  } catch (error) {
    console.error('Error in deletePlaylist:', error);
    next(error);
  }
};

// Add to playlist
export const addToPlaylist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { audioId } = req.body;
    
    const playlist = await Playlist.findOne({ _id: id, user: req.user.id });
    
    if (!playlist) {
      return errorResponse(res, 'Playlist not found', 404);
    }
    
    if (!playlist.audios.includes(audioId)) {
      playlist.audios.push(audioId);
      await playlist.save();
    }
    
    successResponse(res, playlist, 'Added to playlist successfully');
  } catch (error) {
    console.error('Error in addToPlaylist:', error);
    next(error);
  }
};

// Remove from playlist
export const removeFromPlaylist = async (req, res, next) => {
  try {
    const { id, audioId } = req.params;
    
    const playlist = await Playlist.findOne({ _id: id, user: req.user.id });
    
    if (!playlist) {
      return errorResponse(res, 'Playlist not found', 404);
    }
    
    playlist.audios = playlist.audios.filter(a => a.toString() !== audioId);
    await playlist.save();
    
    successResponse(res, playlist, 'Removed from playlist successfully');
  } catch (error) {
    console.error('Error in removeFromPlaylist:', error);
    next(error);
  }
};

// Reorder playlist
export const reorderPlaylist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { audioIds } = req.body;
    
    const playlist = await Playlist.findOne({ _id: id, user: req.user.id });
    
    if (!playlist) {
      return errorResponse(res, 'Playlist not found', 404);
    }
    
    playlist.audios = audioIds;
    await playlist.save();
    
    successResponse(res, playlist, 'Playlist reordered successfully');
  } catch (error) {
    console.error('Error in reorderPlaylist:', error);
    next(error);
  }
};

// Get playlist stats
export const getPlaylistStats = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const playlist = await Playlist.findById(id)
      .populate('audios', 'stats');
    
    if (!playlist) {
      return errorResponse(res, 'Playlist not found', 404);
    }
    
    const totalPlays = playlist.audios.reduce((sum, audio) => sum + (audio.stats?.plays || 0), 0);
    const totalLikes = playlist.audios.reduce((sum, audio) => sum + (audio.stats?.likes || 0), 0);
    
    successResponse(res, {
      followers: playlist.stats?.followers || 0,
      views: playlist.stats?.views || 0,
      totalPlays,
      totalLikes,
      audioCount: playlist.audios.length
    });
  } catch (error) {
    console.error('Error in getPlaylistStats:', error);
    next(error);
  }
};

// Follow playlist
export const followPlaylist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const playlist = await Playlist.findById(id);
    
    if (!playlist) {
      return errorResponse(res, 'Playlist not found', 404);
    }
    
    if (!playlist.followers) playlist.followers = [];
    
    if (!playlist.followers.includes(userId)) {
      playlist.followers.push(userId);
      playlist.stats.followers = (playlist.stats.followers || 0) + 1;
      await playlist.save();
    }
    
    successResponse(res, { followed: true, followers: playlist.stats.followers });
  } catch (error) {
    console.error('Error in followPlaylist:', error);
    next(error);
  }
};

// Unfollow playlist
export const unfollowPlaylist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const playlist = await Playlist.findById(id);
    
    if (!playlist) {
      return errorResponse(res, 'Playlist not found', 404);
    }
    
    if (playlist.followers && playlist.followers.includes(userId)) {
      playlist.followers = playlist.followers.filter(id => id.toString() !== userId);
      playlist.stats.followers = (playlist.stats.followers || 0) - 1;
      await playlist.save();
    }
    
    successResponse(res, { followed: false, followers: playlist.stats.followers });
  } catch (error) {
    console.error('Error in unfollowPlaylist:', error);
    next(error);
  }
};

// Get followed playlists
export const getFollowedPlaylists = async (req, res, next) => {
  try {
    const playlists = await Playlist.find({ followers: req.user.id, isPublic: true })
      .populate('user', 'name avatar')
      .populate('audios', 'title slug thumbnail')
      .sort({ createdAt: -1 });
    
    successResponse(res, playlists);
  } catch (error) {
    console.error('Error in getFollowedPlaylists:', error);
    next(error);
  }
};

// Search playlists
export const searchPlaylists = async (req, res, next) => {
  try {
    const { q, page = 1, limit = 20 } = req.query;
    
    if (!q || q.length < 2) {
      return errorResponse(res, 'Search query must be at least 2 characters', 400);
    }
    
    const searchRegex = new RegExp(q, 'i');
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const playlists = await Playlist.find({
      isPublic: true,
      $or: [
        { name: searchRegex },
        { description: searchRegex }
      ]
    })
      .populate('user', 'name avatar')
      .populate('audios', 'title slug')
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Playlist.countDocuments({
      isPublic: true,
      $or: [
        { name: searchRegex },
        { description: searchRegex }
      ]
    });
    
    paginatedResponse(res, playlists, { page: parseInt(page), limit: parseInt(limit), total });
  } catch (error) {
    console.error('Error in searchPlaylists:', error);
    next(error);
  }
};

// Get recommended playlists
export const getRecommendedPlaylists = async (req, res, next) => {
  try {
    const { limit = 10 } = req.query;
    
    const playlists = await Playlist.find({ isPublic: true })
      .sort({ 'stats.followers': -1, 'stats.views': -1 })
      .limit(parseInt(limit))
      .populate('user', 'name avatar')
      .populate('audios', 'title slug');
    
    successResponse(res, playlists);
  } catch (error) {
    console.error('Error in getRecommendedPlaylists:', error);
    next(error);
  }
};