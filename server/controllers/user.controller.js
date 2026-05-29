//server/controllers/user.controller.js

import User from '../models/User.js';
import Poem from '../models/Poem.js';
import Book from '../models/Book.js';
import Audio from '../models/Audio.js';
import Video from '../models/Video.js';
import Notification from '../models/Notification.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
import { getPagination } from '../utils/pagination.js';
import cloudinary from '../config/cloudinary.js';

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('favorites.poems', 'title slug author genre')
      .populate('favorites.books', 'title slug author coverImage')
      .populate('favorites.audio', 'title slug author thumbnail')
      .populate('favorites.videos', 'title slug author thumbnail')
      .populate('following', 'name slug avatar');

    successResponse(res, user);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, bio, preferences } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, bio, preferences },
      { new: true, runValidators: true }
    );
    successResponse(res, user, 'Profile updated successfully');
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('+password');
    const isMatch = await user.comparePassword(req.body.currentPassword);

    if (!isMatch) {
      return errorResponse(res, 'Current password is incorrect', 400);
    }

    user.password = req.body.newPassword;
    await user.save();
    successResponse(res, null, 'Password updated successfully');
  } catch (error) {
    next(error);
  }
};

export const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return errorResponse(res, 'Please upload an image', 400);
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'zauqapp/avatars',
      width: 400,
      height: 400,
      crop: 'fill'
    });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: result.secure_url },
      { new: true }
    );

    successResponse(res, { avatar: user.avatar }, 'Avatar updated');
  } catch (error) {
    next(error);
  }
};

export const getFavorites = async (req, res, next) => {
  try {
    const { type } = req.query;
    const user = await User.findById(req.user.id);

    let favorites = [];
    switch (type) {
      case 'poems':
        favorites = await Poem.find({ _id: { $in: user.favorites.poems } })
          .populate('author', 'name slug');
        break;
      case 'books':
        favorites = await Book.find({ _id: { $in: user.favorites.books } })
          .populate('author', 'name slug');
        break;
      case 'audio':
        favorites = await Audio.find({ _id: { $in: user.favorites.audio } })
          .populate('author', 'name slug');
        break;
      case 'videos':
        favorites = await Video.find({ _id: { $in: user.favorites.videos } })
          .populate('author', 'name slug');
        break;
      default:
        favorites = {
          poems: await Poem.find({ _id: { $in: user.favorites.poems } }).populate('author', 'name slug'),
          books: await Book.find({ _id: { $in: user.favorites.books } }).populate('author', 'name slug'),
          audio: await Audio.find({ _id: { $in: user.favorites.audio } }).populate('author', 'name slug'),
          videos: await Video.find({ _id: { $in: user.favorites.videos } }).populate('author', 'name slug')
        };
    }

    successResponse(res, favorites);
  } catch (error) {
    next(error);
  }
};

export const addToFavorites = async (req, res, next) => {
  try {
    const { type, id } = req.body;
    const user = await User.findById(req.user.id);

    const validTypes = ['poems', 'books', 'audio', 'videos'];
    if (!validTypes.includes(type)) {
      return errorResponse(res, 'Invalid content type', 400);
    }

    if (!user.favorites[type].includes(id)) {
      user.favorites[type].push(id);
      await user.save();
    }

    successResponse(res, null, 'Added to favorites');
  } catch (error) {
    next(error);
  }
};

export const removeFromFavorites = async (req, res, next) => {
  try {
    const { type, id } = req.params;
    const user = await User.findById(req.user.id);

    user.favorites[type] = user.favorites[type].filter(item => item.toString() !== id);
    await user.save();

    successResponse(res, null, 'Removed from favorites');
  } catch (error) {
    next(error);
  }
};

export const getHistory = async (req, res, next) => {
  try {
    const { type } = req.query;
    const user = await User.findById(req.user.id);

    let history = user.readingHistory;
    if (type) {
      history = history.filter(h => h.contentType === type);
    }

    // Sort by lastRead descending
    history.sort((a, b) => b.lastRead - a.lastRead);

    successResponse(res, history);
  } catch (error) {
    next(error);
  }
};

export const getDownloads = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    successResponse(res, user.downloads);
  } catch (error) {
    next(error);
  }
};

export const followAuthor = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const authorId = req.params.authorId;

    if (!user.following.includes(authorId)) {
      user.following.push(authorId);
      await user.save();
    }

    successResponse(res, null, 'Author followed');
  } catch (error) {
    next(error);
  }
};

export const unfollowAuthor = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    user.following = user.following.filter(id => id.toString() !== req.params.authorId);
    await user.save();
    successResponse(res, null, 'Author unfollowed');
  } catch (error) {
    next(error);
  }
};

export const getNotifications = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req);

    const notifications = await Notification.find({ recipient: req.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Notification.countDocuments({ recipient: req.user.id });

    paginatedResponse(res, notifications, { page, limit, total });
  } catch (error) {
    next(error);
  }
};

export const markNotificationRead = async (req, res, next) => {
  try {
    if (req.params.id === 'read-all') {
      await Notification.updateMany(
        { recipient: req.user.id, isRead: false },
        { isRead: true, readAt: new Date() }
      );
      successResponse(res, null, 'All notifications marked as read');
    } else {
      await Notification.findByIdAndUpdate(req.params.id, {
        isRead: true,
        readAt: new Date()
      });
      successResponse(res, null, 'Notification marked as read');
    }
  } catch (error) {
    next(error);
  }
};

export const getReadingProgress = async (req, res, next) => {
  try {
    const { contentType, contentId } = req.params;
    const user = await User.findById(req.user.id);

    const progress = user.readingHistory.find(
      h => h.contentType === contentType && h.contentId.toString() === contentId
    );

    successResponse(res, progress || { progress: 0 });
  } catch (error) {
    next(error);
  }
};

export const updateReadingProgress = async (req, res, next) => {
  try {
    const { contentType, contentId, progress } = req.body;

    await User.findByIdAndUpdate(req.user.id, {
      $pull: { readingHistory: { contentType, contentId } }
    });

    await User.findByIdAndUpdate(req.user.id, {
      $push: {
        readingHistory: {
          contentType,
          contentId,
          progress,
          lastRead: new Date()
        }
      }
    });

    successResponse(res, null, 'Progress updated');
  } catch (error) {
    next(error);
  }
};
