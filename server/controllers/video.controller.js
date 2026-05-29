// server/controllers/video.controller.js 

// import Video from '../models/Video.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination, getSort, getFilters } from '../utils/pagination.js';

// export const getVideos = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);
//     const sort = getSort(req);
//     const filters = getFilters(req, ['type', 'language', 'author', 'isPremium']);
//     filters.isPublished = true;

//     const videos = await Video.find(filters)
//       .populate('author', 'name slug avatar')
//       .populate('category', 'name slug')
//       .sort(sort)
//       .skip(skip)
//       .limit(limit);

//     const total = await Video.countDocuments(filters);
//     paginatedResponse(res, videos, { page, limit, total });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getVideoBySlug = async (req, res, next) => {
//   try {
//     const video = await Video.findOne({ slug: req.params.slug, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .populate('category', 'name slug');

//     if (!video) {
//       return errorResponse(res, 'Video not found', 404);
//     }

//     video.stats.views += 1;
//     await video.save();

//     let userInteraction = {};
//     if (req.user) {
//       userInteraction = {
//         isLiked: video.likedBy.includes(req.user.id)
//       };
//     }

//     successResponse(res, { ...video.toObject(), userInteraction });
//   } catch (error) {
//     next(error);
//   }
// };

// export const createVideo = async (req, res, next) => {
//   try {
//     const video = await Video.create(req.body);
//     successResponse(res, video, 'Video created', 201);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateVideo = async (req, res, next) => {
//   try {
//     const video = await Video.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );
//     successResponse(res, video, 'Video updated');
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteVideo = async (req, res, next) => {
//   try {
//     await Video.findByIdAndDelete(req.params.id);
//     successResponse(res, null, 'Video deleted');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getFeaturedVideos = async (req, res, next) => {
//   try {
//     const videos = await Video.find({ isFeatured: true, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .limit(10);

//     successResponse(res, videos);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getVideoStream = async (req, res, next) => {
//   try {
//     const video = await Video.findOne({ slug: req.params.slug, isPublished: true });

//     if (!video) {
//       return errorResponse(res, 'Video not found', 404);
//     }

//     if (video.isPremium && req.user?.subscription?.plan === 'free') {
//       return errorResponse(res, 'Premium subscription required', 403);
//     }

//     video.stats.views += 1;
//     await video.save();

//     successResponse(res, { streamUrl: video.videoUrl, duration: video.duration });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getVideoSubtitles = async (req, res, next) => {
//   try {
//     const video = await Video.findOne({ slug: req.params.slug, isPublished: true })
//       .select('subtitles');

//     if (!video) {
//       return errorResponse(res, 'Video not found', 404);
//     }

//     successResponse(res, video.subtitles || []);
//   } catch (error) {
//     next(error);
//   }
// };







// server/controllers/video.controller.js - Update with slug support
import Video from '../models/Video.js';
import Author from '../models/Author.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
import { getPagination, getSort, getFilters } from '../utils/pagination.js';
import slugify from 'slugify';

export const getVideos = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const sort = getSort(req);
    const filters = getFilters(req, ['type', 'language', 'author', 'isPremium']);
    
    // Only show published videos for public, admin can see all
    if (!req.user || req.user.role !== 'admin') {
      filters.isPublished = true;
    }

    const videos = await Video.find(filters)
      .populate('author', 'name slug avatar')
      .populate('category', 'name slug')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Video.countDocuments(filters);
    paginatedResponse(res, videos, { page, limit, total });
  } catch (error) {
    console.error('Error in getVideos:', error);
    next(error);
  }
};

export const getVideoBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    if (!slug) {
      return errorResponse(res, 'Slug is required', 400);
    }

    const video = await Video.findOne({ slug })
      .populate('author', 'name slug avatar bio')
      .populate('category', 'name slug');

    if (!video) {
      return errorResponse(res, 'Video not found', 404);
    }

    // Check if published or admin
    if (!video.isPublished && (!req.user || req.user.role !== 'admin')) {
      return errorResponse(res, 'Video not found', 404);
    }

    // Increment views
    video.stats.views += 1;
    await video.save();

    let userInteraction = {};
    if (req.user) {
      userInteraction = {
        isLiked: video.likedBy.includes(req.user.id)
      };
    }

    successResponse(res, { ...video.toObject(), userInteraction });
  } catch (error) {
    console.error('Error in getVideoBySlug:', error);
    next(error);
  }
};

export const createVideo = async (req, res, next) => {
  try {
    console.log('Creating video with data:', JSON.stringify(req.body, null, 2));
    
    const { title, videoUrl, slug } = req.body;
    
    if (!title || !title.trim()) {
      return errorResponse(res, 'Title is required', 400);
    }
    if (!videoUrl) {
      return errorResponse(res, 'Video URL is required', 400);
    }
    
    const videoData = { ...req.body };
    
    // If slug is provided, clean it; otherwise will be auto-generated
    if (slug && slug.trim()) {
      videoData.slug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
    }
    
    const video = await Video.create(videoData);
    
    // Populate author and category for response
    const populatedVideo = await Video.findById(video._id)
      .populate('author', 'name slug avatar')
      .populate('category', 'name slug');
    
    successResponse(res, populatedVideo, 'Video created successfully', 201);
  } catch (error) {
    console.error('Error creating video:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
    }
    
    if (error.code === 11000) {
      return errorResponse(res, 'A video with this slug already exists. Please use a different slug.', 400);
    }
    
    next(error);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('Updating video with ID:', id);
    
    const video = await Video.findById(id);
    if (!video) {
      return errorResponse(res, 'Video not found', 404);
    }
    
    let updateData = { ...req.body };
    
    // Handle slug update if provided
    if (req.body.slug && req.body.slug !== video.slug) {
      const cleanSlug = req.body.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
      const existingVideo = await Video.findOne({ slug: cleanSlug, _id: { $ne: id } });
      if (existingVideo) {
        return errorResponse(res, 'Slug already exists. Please use a different slug.', 400);
      }
      updateData.slug = cleanSlug;
    }
    
    // If publishing for first time
    if (updateData.isPublished && !video.isPublished) {
      updateData.publishedAt = new Date();
    }
    
    const updatedVideo = await Video.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('author', 'name slug avatar')
      .populate('category', 'name slug');
    
    successResponse(res, updatedVideo, 'Video updated successfully');
  } catch (error) {
    console.error('Error updating video:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
    }
    
    next(error);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('Deleting video with ID:', id);
    
    const video = await Video.findById(id);
    if (!video) {
      return errorResponse(res, 'Video not found', 404);
    }
    
    await Video.findByIdAndDelete(id);
    successResponse(res, null, 'Video deleted successfully');
  } catch (error) {
    console.error('Error deleting video:', error);
    next(error);
  }
};

export const getFeaturedVideos = async (req, res, next) => {
  try {
    const videos = await Video.find({ isFeatured: true, isPublished: true })
      .populate('author', 'name slug avatar')
      .sort({ createdAt: -1 })
      .limit(10);

    successResponse(res, videos);
  } catch (error) {
    console.error('Error in getFeaturedVideos:', error);
    next(error);
  }
};

export const getVideoStream = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    const video = await Video.findOne({ slug, isPublished: true });
    if (!video) {
      return errorResponse(res, 'Video not found', 404);
    }

    if (video.isPremium && req.user?.subscription?.plan === 'free') {
      return errorResponse(res, 'Premium subscription required', 403);
    }

    video.stats.views += 1;
    await video.save();

    successResponse(res, { 
      streamUrl: video.videoUrl, 
      duration: video.duration,
      title: video.title,
      thumbnail: video.thumbnail
    });
  } catch (error) {
    console.error('Error in getVideoStream:', error);
    next(error);
  }
};

export const getVideoSubtitles = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    const video = await Video.findOne({ slug, isPublished: true })
      .select('subtitles');

    if (!video) {
      return errorResponse(res, 'Video not found', 404);
    }

    successResponse(res, video.subtitles || []);
  } catch (error) {
    console.error('Error in getVideoSubtitles:', error);
    next(error);
  }
};