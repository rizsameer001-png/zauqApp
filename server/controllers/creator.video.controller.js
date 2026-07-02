// server/controllers/creator.video.controller.js
import Video from '../models/Video.js';
import { successResponse, errorResponse } from '../utils/response.js';

/**
 * Upload video as creator
 */
export const uploadCreatorVideo = async (req, res, next) => {
  try {
    const { 
      title, 
      description, 
      type, 
      category, 
      language, 
      tags, 
      isPremium, 
      visibility, 
      allowComments, 
      allowDownloads,
      scheduledPublishDate
    } = req.body;
    
    const userId = req.user.id;
    
    // Validate required fields
    if (!title) {
      return errorResponse(res, 'Title is required', 400);
    }
    
    // File upload handling would go here (using multer, cloudinary, etc.)
    // This is a placeholder - you'll need to integrate with your file upload service
    
    const videoData = {
      title,
      description: description || '',
      type: type || 'other',
      category,
      language: language || 'urdu',
      tags: tags ? (typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : tags) : [],
      isPremium: isPremium === 'true' || isPremium === true,
      visibility: visibility || 'public',
      allowComments: allowComments === 'true' || allowComments === true,
      allowDownloads: allowDownloads === 'true' || allowDownloads === true,
      createdBy: userId,
      isPublished: false,
      videoUrl: req.file ? req.file.path || req.file.secure_url : '',
      videoSize: req.file ? req.file.size : 0,
      videoFormat: req.file ? req.file.mimetype.split('/')[1] : 'mp4',
      scheduledPublishDate: scheduledPublishDate ? new Date(scheduledPublishDate) : null,
    };
    
    // If thumbnail is uploaded
    if (req.files && req.files.thumbnail) {
      videoData.thumbnail = req.files.thumbnail[0].path || req.files.thumbnail[0].secure_url;
      videoData.thumbnailCloudinaryId = req.files.thumbnail[0].public_id;
    }
    
    const video = await Video.create(videoData);
    
    successResponse(res, video, 'Video uploaded successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Get creator's videos with pagination and filtering
 */
export const getCreatorVideos = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      status, 
      sortBy = 'createdAt', 
      order = 'desc',
      search 
    } = req.query;
    
    const userId = req.user.id;
    
    const query = { createdBy: userId };
    
    // Filter by status
    if (status === 'published') {
      query.isPublished = true;
    } else if (status === 'draft') {
      query.isPublished = false;
    } else if (status === 'premium') {
      query.isPremium = true;
    }
    
    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOrder = order === 'asc' ? 1 : -1;
    
    // Determine sort field
    let sortField = {};
    if (sortBy === 'views') {
      sortField = { 'stats.views': sortOrder };
    } else if (sortBy === 'likes') {
      sortField = { 'stats.likes': sortOrder };
    } else if (sortBy === 'title') {
      sortField = { title: sortOrder };
    } else {
      sortField = { createdAt: sortOrder };
    }
    
    const [videos, total] = await Promise.all([
      Video.find(query)
        .populate('author', 'name slug')
        .sort(sortField)
        .skip(skip)
        .limit(parseInt(limit)),
      Video.countDocuments(query)
    ]);
    
    successResponse(res, {
      videos,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get video presets (types, categories, etc.)
 */
export const getCreatorPresets = async (req, res, next) => {
  try {
    const presets = {
      types: ['mushaira', 'interview', 'documentary', 'lecture', 'performance', 'other'],
      languages: ['urdu', 'hindi', 'english'],
      visibility: ['public', 'private', 'unlisted'],
      statuses: ['published', 'draft', 'premium'],
      // You might want to fetch categories from a Category model
      categories: [], // Add your categories here
    };
    
    successResponse(res, presets);
  } catch (error) {
    next(error);
  }
};

/**
 * Get creator video statistics
 */
export const getCreatorStatistics = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const stats = await Video.getCreatorStats(userId);
    
    // Get additional stats
    const [totalVideos, recentVideos, topPerforming] = await Promise.all([
      Video.countDocuments({ createdBy: userId }),
      Video.find({ createdBy: userId })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('title stats views likes createdAt'),
      Video.find({ createdBy: userId })
        .sort({ 'stats.views': -1 })
        .limit(5)
        .select('title stats views likes')
    ]);
    
    successResponse(res, {
      ...stats,
      totalVideos,
      recentVideos,
      topPerforming,
      engagementRate: stats.totalViews > 0 ? 
        ((stats.totalLikes / stats.totalViews) * 100).toFixed(2) : 0
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single creator video by ID
 */
export const getCreatorVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const video = await Video.findOne({ _id: id, createdBy: userId })
      .populate('author', 'name slug bio');
    
    if (!video) {
      return errorResponse(res, 'Video not found', 404);
    }
    
    successResponse(res, video);
  } catch (error) {
    next(error);
  }
};

/**
 * Update creator video
 */
export const updateCreatorVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updateData = req.body;
    
    // Remove fields that shouldn't be updated directly
    delete updateData._id;
    delete updateData.createdBy;
    delete updateData.stats;
    delete updateData.likedBy;
    delete updateData.__v;
    
    // Handle tags if string
    if (updateData.tags && typeof updateData.tags === 'string') {
      updateData.tags = updateData.tags.split(',').map(t => t.trim());
    }
    
    // Handle boolean fields
    if (updateData.isPremium !== undefined) {
      updateData.isPremium = updateData.isPremium === 'true' || updateData.isPremium === true;
    }
    if (updateData.allowComments !== undefined) {
      updateData.allowComments = updateData.allowComments === 'true' || updateData.allowComments === true;
    }
    if (updateData.allowDownloads !== undefined) {
      updateData.allowDownloads = updateData.allowDownloads === 'true' || updateData.allowDownloads === true;
    }
    
    updateData.updatedAt = Date.now();
    
    const video = await Video.findOneAndUpdate(
      { _id: id, createdBy: userId },
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!video) {
      return errorResponse(res, 'Video not found or unauthorized', 404);
    }
    
    successResponse(res, video, 'Video updated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Delete creator video
 */
export const deleteCreatorVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const video = await Video.findOne({ _id: id, createdBy: userId });
    
    if (!video) {
      return errorResponse(res, 'Video not found or unauthorized', 404);
    }
    
    // Delete associated files from storage (cloudinary, etc.)
    // This is a placeholder - implement your file deletion logic
    // await deleteFromCloudinary(video.thumbnailCloudinaryId);
    // await deleteFromCloudinary(video.videoCloudinaryId);
    
    await video.deleteOne();
    
    successResponse(res, null, 'Video deleted successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Publish creator video
 */
export const publishCreatorVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const video = await Video.findOne({ _id: id, createdBy: userId });
    
    if (!video) {
      return errorResponse(res, 'Video not found or unauthorized', 404);
    }
    
    // Check if video has required fields for publishing
    if (!video.videoUrl) {
      return errorResponse(res, 'Video file is required for publishing', 400);
    }
    
    await video.publish();
    
    successResponse(res, video, 'Video published successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Unpublish creator video
 */
export const unpublishCreatorVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const video = await Video.findOne({ _id: id, createdBy: userId });
    
    if (!video) {
      return errorResponse(res, 'Video not found or unauthorized', 404);
    }
    
    await video.unpublish();
    
    successResponse(res, video, 'Video unpublished successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Bulk delete creator videos
 */
export const bulkDeleteCreatorVideos = async (req, res, next) => {
  try {
    const { ids } = req.body;
    const userId = req.user.id;
    
    if (!ids || !ids.length) {
      return errorResponse(res, 'No video IDs provided', 400);
    }
    
    // Delete files from storage before deleting from DB
    // This is a placeholder - implement your file deletion logic
    // const videos = await Video.find({ _id: { $in: ids }, createdBy: userId });
    // for (const video of videos) {
    //   await deleteFromCloudinary(video.thumbnailCloudinaryId);
    //   await deleteFromCloudinary(video.videoCloudinaryId);
    // }
    
    const result = await Video.deleteMany({ _id: { $in: ids }, createdBy: userId });
    
    if (result.deletedCount === 0) {
      return errorResponse(res, 'No videos found to delete', 404);
    }
    
    successResponse(res, { 
      deletedCount: result.deletedCount,
      ids 
    }, `${result.deletedCount} video(s) deleted successfully`);
  } catch (error) {
    next(error);
  }
};

/**
 * Get video analytics
 */
export const getVideoAnalytics = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const video = await Video.findOne({ _id: id, createdBy: userId });
    
    if (!video) {
      return errorResponse(res, 'Video not found or unauthorized', 404);
    }
    
    // Get daily views (mock data - replace with actual analytics)
    const dailyViews = [];
    const now = new Date();
    for (let i = 30; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      dailyViews.push({
        date: date.toISOString().split('T')[0],
        views: Math.floor(Math.random() * 100) // Replace with actual data
      });
    }
    
    successResponse(res, {
      video: {
        id: video._id,
        title: video.title,
        views: video.stats.views,
        likes: video.stats.likes,
        bookmarks: video.stats.bookmarks,
        totalWatchTime: video.stats.totalWatchTime || 0
      },
      dailyViews,
      engagement: {
        likeRate: video.stats.views > 0 ? 
          ((video.stats.likes / video.stats.views) * 100).toFixed(2) : 0,
        bookmarkRate: video.stats.views > 0 ? 
          ((video.stats.bookmarks / video.stats.views) * 100).toFixed(2) : 0
      }
    });
  } catch (error) {
    next(error);
  }
};

// ============================================
// EXPORT ALL FUNCTIONS
// ============================================

export default {
  uploadCreatorVideo,
  getCreatorVideos,
  getCreatorPresets,
  getCreatorStatistics,
  getCreatorVideo,
  updateCreatorVideo,
  deleteCreatorVideo,
  publishCreatorVideo,
  unpublishCreatorVideo,
  bulkDeleteCreatorVideos,
  getVideoAnalytics
};