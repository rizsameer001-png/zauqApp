//server/controllers/admin.controller.js

import User from '../models/User.js';
import Poem from '../models/Poem.js';
import Book from '../models/Book.js';
import Audio from '../models/Audio.js';
import Video from '../models/Video.js';
import Author from '../models/Author.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
import { getPagination } from '../utils/pagination.js';

export const getDashboard = async (req, res, next) => {
  try {
    const stats = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ lastLogin: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }),
      Poem.countDocuments({ isPublished: true }),
      Poem.countDocuments({ isPublished: false }),
      Book.countDocuments({ isPublished: true }),
      Audio.countDocuments({ isPublished: true }),
      Video.countDocuments({ isPublished: true }),
      Author.countDocuments()
    ]);

    successResponse(res, {
      totalUsers: stats[0],
      activeUsers7d: stats[1],
      publishedPoems: stats[2],
      pendingPoems: stats[3],
      publishedBooks: stats[4],
      publishedAudio: stats[5],
      publishedVideos: stats[6],
      totalAuthors: stats[7]
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const { role, search, isActive } = req.query;

    const query = {};
    if (role) query.role = role;
    if (isActive !== undefined) query.isActive = isActive === 'true';
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(query);
    paginatedResponse(res, users, { page, limit, total });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }
    successResponse(res, user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { role, isActive, isBanned, subscription } = req.body;
    const updateData = {};
    if (role) updateData.role = role;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (isBanned !== undefined) updateData.isBanned = isBanned;
    if (subscription) updateData.subscription = subscription;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select('-password');

    successResponse(res, user, 'User updated');
  } catch (error) {
    next(error);
  }
};

export const banUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBanned: true, isActive: false },
      { new: true }
    );
    successResponse(res, user, 'User banned');
  } catch (error) {
    next(error);
  }
};

export const unbanUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBanned: false, isActive: true },
      { new: true }
    );
    successResponse(res, user, 'User unbanned');
  } catch (error) {
    next(error);
  }
};

export const getContentOverview = async (req, res, next) => {
  try {
    const [poems, books, audio, videos] = await Promise.all([
      Poem.find().sort({ createdAt: -1 }).limit(10).populate('author', 'name'),
      Book.find().sort({ createdAt: -1 }).limit(10).populate('author', 'name'),
      Audio.find().sort({ createdAt: -1 }).limit(10).populate('author', 'name'),
      Video.find().sort({ createdAt: -1 }).limit(10).populate('author', 'name')
    ]);

    successResponse(res, { poems, books, audio, videos });
  } catch (error) {
    next(error);
  }
};

export const getPendingContent = async (req, res, next) => {
  try {
    const [poems, books, audio, videos] = await Promise.all([
      Poem.find({ isPublished: false }).populate('author', 'name').populate('createdBy', 'name'),
      Book.find({ isPublished: false }).populate('author', 'name'),
      Audio.find({ isPublished: false }).populate('author', 'name'),
      Video.find({ isPublished: false }).populate('author', 'name')
    ]);

    successResponse(res, { poems, books, audio, videos });
  } catch (error) {
    next(error);
  }
};

export const approveContent = async (req, res, next) => {
  try {
    const { type } = req.body;
    const Model = { poem: Poem, book: Book, audio: Audio, video: Video }[type];

    if (!Model) {
      return errorResponse(res, 'Invalid content type', 400);
    }

    const content = await Model.findByIdAndUpdate(
      req.params.id,
      { isPublished: true, publishedAt: new Date() },
      { new: true }
    );

    successResponse(res, content, 'Content approved');
  } catch (error) {
    next(error);
  }
};

export const rejectContent = async (req, res, next) => {
  try {
    const { type, reason } = req.body;
    const Model = { poem: Poem, book: Book, audio: Audio, video: Video }[type];

    if (!Model) {
      return errorResponse(res, 'Invalid content type', 400);
    }

    // Instead of deleting, mark as rejected or delete
    await Model.findByIdAndDelete(req.params.id);

    successResponse(res, null, 'Content rejected and removed');
  } catch (error) {
    next(error);
  }
};

export const getReports = async (req, res, next) => {
  try {
    // Mock reports - implement actual reporting system
    successResponse(res, []);
  } catch (error) {
    next(error);
  }
};

export const getSettings = async (req, res, next) => {
  try {
    // Mock settings - implement settings model
    successResponse(res, {
      siteName: 'ZauqApp',
      maintenanceMode: false,
      defaultLanguage: 'en',
      allowedLanguages: ['en', 'hi', 'ur'],
      maxUploadSize: 100 * 1024 * 1024
    });
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    // Mock settings update
    successResponse(res, req.body, 'Settings updated');
  } catch (error) {
    next(error);
  }
};

export const getSystemHealth = async (req, res, next) => {
  try {
    const health = {
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      memory: process.memoryUsage(),
      env: process.env.NODE_ENV
    };
    successResponse(res, health);
  } catch (error) {
    next(error);
  }
};
