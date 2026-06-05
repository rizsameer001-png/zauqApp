

// // server/controllers/video.controller.js - Update with slug support
// import Video from '../models/Video.js';
// import Author from '../models/Author.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination, getSort, getFilters } from '../utils/pagination.js';
// import slugify from 'slugify';

// export const getVideos = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);
//     const sort = getSort(req);
//     const filters = getFilters(req, ['type', 'language', 'author', 'isPremium']);
    
//     // Only show published videos for public, admin can see all
//     if (!req.user || req.user.role !== 'admin') {
//       filters.isPublished = true;
//     }

//     const videos = await Video.find(filters)
//       .populate('author', 'name slug avatar')
//       .populate('category', 'name slug')
//       .sort(sort)
//       .skip(skip)
//       .limit(limit);

//     const total = await Video.countDocuments(filters);
//     paginatedResponse(res, videos, { page, limit, total });
//   } catch (error) {
//     console.error('Error in getVideos:', error);
//     next(error);
//   }
// };

// export const getVideoBySlug = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     if (!slug) {
//       return errorResponse(res, 'Slug is required', 400);
//     }

//     const video = await Video.findOne({ slug })
//       .populate('author', 'name slug avatar bio')
//       .populate('category', 'name slug');

//     if (!video) {
//       return errorResponse(res, 'Video not found', 404);
//     }

//     // Check if published or admin
//     if (!video.isPublished && (!req.user || req.user.role !== 'admin')) {
//       return errorResponse(res, 'Video not found', 404);
//     }

//     // Increment views
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
//     console.error('Error in getVideoBySlug:', error);
//     next(error);
//   }
// };

// export const createVideo = async (req, res, next) => {
//   try {
//     console.log('Creating video with data:', JSON.stringify(req.body, null, 2));
    
//     const { title, videoUrl, slug } = req.body;
    
//     if (!title || !title.trim()) {
//       return errorResponse(res, 'Title is required', 400);
//     }
//     if (!videoUrl) {
//       return errorResponse(res, 'Video URL is required', 400);
//     }
    
//     const videoData = { ...req.body };
    
//     // If slug is provided, clean it; otherwise will be auto-generated
//     if (slug && slug.trim()) {
//       videoData.slug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     }
    
//     const video = await Video.create(videoData);
    
//     // Populate author and category for response
//     const populatedVideo = await Video.findById(video._id)
//       .populate('author', 'name slug avatar')
//       .populate('category', 'name slug');
    
//     successResponse(res, populatedVideo, 'Video created successfully', 201);
//   } catch (error) {
//     console.error('Error creating video:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
//     }
    
//     if (error.code === 11000) {
//       return errorResponse(res, 'A video with this slug already exists. Please use a different slug.', 400);
//     }
    
//     next(error);
//   }
// };

// export const updateVideo = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     console.log('Updating video with ID:', id);
    
//     const video = await Video.findById(id);
//     if (!video) {
//       return errorResponse(res, 'Video not found', 404);
//     }
    
//     let updateData = { ...req.body };
    
//     // Handle slug update if provided
//     if (req.body.slug && req.body.slug !== video.slug) {
//       const cleanSlug = req.body.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
//       const existingVideo = await Video.findOne({ slug: cleanSlug, _id: { $ne: id } });
//       if (existingVideo) {
//         return errorResponse(res, 'Slug already exists. Please use a different slug.', 400);
//       }
//       updateData.slug = cleanSlug;
//     }
    
//     // If publishing for first time
//     if (updateData.isPublished && !video.isPublished) {
//       updateData.publishedAt = new Date();
//     }
    
//     const updatedVideo = await Video.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true, runValidators: true }
//     ).populate('author', 'name slug avatar')
//       .populate('category', 'name slug');
    
//     successResponse(res, updatedVideo, 'Video updated successfully');
//   } catch (error) {
//     console.error('Error updating video:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
//     }
    
//     next(error);
//   }
// };

// export const deleteVideo = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     console.log('Deleting video with ID:', id);
    
//     const video = await Video.findById(id);
//     if (!video) {
//       return errorResponse(res, 'Video not found', 404);
//     }
    
//     await Video.findByIdAndDelete(id);
//     successResponse(res, null, 'Video deleted successfully');
//   } catch (error) {
//     console.error('Error deleting video:', error);
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
//     console.error('Error in getFeaturedVideos:', error);
//     next(error);
//   }
// };

// export const getVideoStream = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const video = await Video.findOne({ slug, isPublished: true });
//     if (!video) {
//       return errorResponse(res, 'Video not found', 404);
//     }

//     if (video.isPremium && req.user?.subscription?.plan === 'free') {
//       return errorResponse(res, 'Premium subscription required', 403);
//     }

//     video.stats.views += 1;
//     await video.save();

//     successResponse(res, { 
//       streamUrl: video.videoUrl, 
//       duration: video.duration,
//       title: video.title,
//       thumbnail: video.thumbnail
//     });
//   } catch (error) {
//     console.error('Error in getVideoStream:', error);
//     next(error);
//   }
// };

// export const getVideoSubtitles = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const video = await Video.findOne({ slug, isPublished: true })
//       .select('subtitles');

//     if (!video) {
//       return errorResponse(res, 'Video not found', 404);
//     }

//     successResponse(res, video.subtitles || []);
//   } catch (error) {
//     console.error('Error in getVideoSubtitles:', error);
//     next(error);
//   }
// };




















// // server/controllers/video.controller.js
// import Video from '../models/Video.js';
// import Author from '../models/Author.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination, getSort, getFilters } from '../utils/pagination.js';
// import slugify from 'slugify';

// export const getVideos = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);
//     const sort = getSort(req);
//     const filters = getFilters(req, ['type', 'language', 'author', 'isPremium', 'category']);
    
//     // Handle search query
//     const { search } = req.query;
//     if (search && search.trim()) {
//       filters.$or = [
//         { title: { $regex: search, $options: 'i' } },
//         { description: { $regex: search, $options: 'i' } },
//         { tags: { $in: [new RegExp(search, 'i')] } }
//       ];
//     }
    
//     // Only show published videos for public, admin can see all
//     if (!req.user || req.user.role !== 'admin') {
//       filters.isPublished = true;
//     }

//     const videos = await Video.find(filters)
//       .populate('author', 'name slug avatar')
//       .populate('category', 'name slug')
//       .sort(sort)
//       .skip(skip)
//       .limit(limit);

//     const total = await Video.countDocuments(filters);
    
//     paginatedResponse(res, videos, { page, limit, total });
//   } catch (error) {
//     console.error('Error in getVideos:', error);
//     next(error);
//   }
// };

// export const getVideoBySlug = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     if (!slug) {
//       return errorResponse(res, 'Slug is required', 400);
//     }

//     const video = await Video.findOne({ slug })
//       .populate('author', 'name slug avatar bio')
//       .populate('category', 'name slug');

//     if (!video) {
//       return errorResponse(res, 'Video not found', 404);
//     }

//     if (!video.isPublished && (!req.user || req.user.role !== 'admin')) {
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
//     console.error('Error in getVideoBySlug:', error);
//     next(error);
//   }
// };

// export const createVideo = async (req, res, next) => {
//   try {
//     console.log('Creating video with data:', JSON.stringify(req.body, null, 2));
    
//     const { title, videoUrl, slug, sourceType } = req.body;
    
//     if (!title || !title.trim()) {
//       return errorResponse(res, 'Title is required', 400);
//     }
//     if (!videoUrl) {
//       return errorResponse(res, 'Video URL is required', 400);
//     }
    
//     const videoData = { ...req.body };
    
//     // Set source type
//     if (sourceType) {
//       videoData.sourceType = sourceType;
//     } else if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
//       videoData.sourceType = 'youtube';
//     } else {
//       videoData.sourceType = 'upload';
//     }
    
//     // If slug is provided, clean it; otherwise will be auto-generated
//     if (slug && slug.trim()) {
//       videoData.slug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     }
    
//     const video = await Video.create(videoData);
    
//     const populatedVideo = await Video.findById(video._id)
//       .populate('author', 'name slug avatar')
//       .populate('category', 'name slug');
    
//     successResponse(res, populatedVideo, 'Video created successfully', 201);
//   } catch (error) {
//     console.error('Error creating video:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
//     }
    
//     if (error.code === 11000) {
//       return errorResponse(res, 'A video with this slug already exists. Please use a different slug.', 400);
//     }
    
//     next(error);
//   }
// };

// export const updateVideo = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     console.log('Updating video with ID:', id);
    
//     const video = await Video.findById(id);
//     if (!video) {
//       return errorResponse(res, 'Video not found', 404);
//     }
    
//     let updateData = { ...req.body };
    
//     // Handle slug update if provided
//     if (req.body.slug && req.body.slug !== video.slug) {
//       const cleanSlug = req.body.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
//       const existingVideo = await Video.findOne({ slug: cleanSlug, _id: { $ne: id } });
//       if (existingVideo) {
//         return errorResponse(res, 'Slug already exists. Please use a different slug.', 400);
//       }
//       updateData.slug = cleanSlug;
//     }
    
//     // Update source type based on videoUrl
//     if (req.body.videoUrl && req.body.videoUrl !== video.videoUrl) {
//       if (req.body.videoUrl.includes('youtube.com') || req.body.videoUrl.includes('youtu.be')) {
//         updateData.sourceType = 'youtube';
//       } else {
//         updateData.sourceType = 'upload';
//       }
//     }
    
//     // If publishing for first time
//     if (updateData.isPublished && !video.isPublished) {
//       updateData.publishedAt = new Date();
//     }
    
//     const updatedVideo = await Video.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true, runValidators: true }
//     ).populate('author', 'name slug avatar')
//       .populate('category', 'name slug');
    
//     successResponse(res, updatedVideo, 'Video updated successfully');
//   } catch (error) {
//     console.error('Error updating video:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
//     }
    
//     next(error);
//   }
// };

// export const deleteVideo = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     console.log('Deleting video with ID:', id);
    
//     const video = await Video.findById(id);
//     if (!video) {
//       return errorResponse(res, 'Video not found', 404);
//     }
    
//     // TODO: Delete from Cloudinary if needed
    
//     await Video.findByIdAndDelete(id);
//     successResponse(res, null, 'Video deleted successfully');
//   } catch (error) {
//     console.error('Error deleting video:', error);
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
//     console.error('Error in getFeaturedVideos:', error);
//     next(error);
//   }
// };

// export const getVideoStream = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const video = await Video.findOne({ slug, isPublished: true });
//     if (!video) {
//       return errorResponse(res, 'Video not found', 404);
//     }

//     if (video.isPremium && req.user?.subscription?.plan === 'free') {
//       return errorResponse(res, 'Premium subscription required', 403);
//     }

//     video.stats.views += 1;
//     await video.save();

//     successResponse(res, { 
//       streamUrl: video.videoUrl, 
//       duration: video.duration,
//       title: video.title,
//       thumbnail: video.thumbnail,
//       sourceType: video.sourceType
//     });
//   } catch (error) {
//     console.error('Error in getVideoStream:', error);
//     next(error);
//   }
// };

// export const getVideoSubtitles = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const video = await Video.findOne({ slug, isPublished: true })
//       .select('subtitles');

//     if (!video) {
//       return errorResponse(res, 'Video not found', 404);
//     }

//     successResponse(res, video.subtitles || []);
//   } catch (error) {
//     console.error('Error in getVideoSubtitles:', error);
//     next(error);
//   }
// };

// // Bulk upload videos
// export const bulkCreateVideos = async (req, res, next) => {
//   try {
//     const { videos } = req.body;
    
//     if (!videos || !Array.isArray(videos) || videos.length === 0) {
//       return errorResponse(res, 'Please provide an array of videos', 400);
//     }
    
//     const createdVideos = [];
//     const errors = [];
    
//     for (let i = 0; i < videos.length; i++) {
//       const videoData = videos[i];
//       try {
//         if (!videoData.title || !videoData.videoUrl) {
//           errors.push({ index: i, error: 'Title and videoUrl are required' });
//           continue;
//         }
        
//         // Set source type
//         if (videoData.videoUrl.includes('youtube.com') || videoData.videoUrl.includes('youtu.be')) {
//           videoData.sourceType = 'youtube';
//         } else {
//           videoData.sourceType = 'upload';
//         }
        
//         const video = await Video.create(videoData);
//         createdVideos.push(video);
//       } catch (error) {
//         errors.push({ index: i, error: error.message });
//       }
//     }
    
//     successResponse(res, { createdVideos, errors, totalCreated: createdVideos.length }, 'Bulk upload completed');
//   } catch (error) {
//     console.error('Error in bulkCreateVideos:', error);
//     next(error);
//   }
// };





















// server/controllers/video.controller.js
import Video from '../models/Video.js';
import Author from '../models/Author.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
import { getPagination, getSort, getFilters } from '../utils/pagination.js';
import slugify from 'slugify';

// Helper function for fuzzy search with misspelling support
const createFuzzySearchQuery = (searchTerm) => {
  if (!searchTerm || !searchTerm.trim()) return null;
  
  const term = searchTerm.trim().toLowerCase();
  
  // Common word mappings for misspellings (Urdu/English poetry terms)
  const commonMappings = {
    'mushaira': ['mushyr', 'mushayara', 'moshaira', 'mushaera', 'mushayra', 'mushairah', 'mushaira'],
    'ghazal': ['gazal', 'ghazal', 'gazhal', 'ghazhal'],
    'nazm': ['nazam', 'nazm', 'nzm', 'nazam'],
    'qawwali': ['qawali', 'qawwali', 'kawwali', 'qawali'],
    'interview': ['intervive', 'interviw', 'interveiw', 'intrview', 'interv', 'intrview'],
    'documentary': ['documentry', 'documantry', 'dokumentary', 'docmentry'],
    'lecture': ['lectur', 'lekchur', 'lecture', 'lecure'],
    'poetry': ['poetry', 'poetrie', 'poentry', 'poerty'],
    'urdu': ['urdu', 'urdoo', 'urduu'],
    'hindi': ['hindi', 'hindee', 'hindhi'],
    'english': ['english', 'inglish', 'englis'],
    'performance': ['performence', 'perfomance', 'perfrmance'],
    'sad': ['sad', 'sed', 'saad'],
    'happy': ['happy', 'hapi', 'hapy'],
    'romantic': ['romantic', 'romantik', 'romntic'],
    'motivational': ['motivational', 'motivtionl', 'motivashonal']
  };
  
  // Build variations array
  const variations = [term];
  
  // Check if search term matches any known mappings
  for (const [correct, misspellings] of Object.entries(commonMappings)) {
    // If term is similar to correct word or any misspelling
    if (term.includes(correct) || misspellings.some(m => term.includes(m))) {
      variations.push(correct);
      variations.push(...misspellings);
    }
    // Also check if term is close to correct word (Levenshtein-like simple check)
    if (isStringSimilar(term, correct, 3)) {
      variations.push(correct);
    }
  }
  
  // Remove duplicates
  const uniqueVariations = [...new Set(variations)];
  
  // Create regex patterns for each variation
  const regexPatterns = uniqueVariations.map(v => 
    new RegExp(v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
  );
  
  // Create fuzzy search with word boundaries for better matching
  const wordPattern = new RegExp(term.split('').join('.*'), 'i');
  
  return {
    $or: [
      // Exact match (case insensitive)
      { title: { $regex: term, $options: 'i' } },
      { description: { $regex: term, $options: 'i' } },
      { tags: { $in: [new RegExp(term, 'i')] } },
      
      // Common misspellings matching
      { title: { $in: uniqueVariations.map(v => new RegExp(v, 'i')) } },
      { description: { $in: uniqueVariations.map(v => new RegExp(v, 'i')) } },
      
      // Fuzzy pattern matching (characters in sequence with possible insertions)
      { title: wordPattern },
      { description: wordPattern },
      
      // Partial word matching for each variation
      ...uniqueVariations.map(variation => ({
        $or: [
          { title: { $regex: variation, $options: 'i' } },
          { description: { $regex: variation, $options: 'i' } }
        ]
      }))
    ]
  };
};

// Helper function to check if two strings are similar (simple edit distance)
const isStringSimilar = (str1, str2, maxDistance = 3) => {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();
  
  if (Math.abs(s1.length - s2.length) > maxDistance) return false;
  if (s1 === s2) return true;
  if (s1.includes(s2) || s2.includes(s1)) return true;
  
  // Simple character match count
  let matches = 0;
  for (let char of s1) {
    if (s2.includes(char)) matches++;
  }
  
  const similarity = matches / Math.max(s1.length, s2.length);
  return similarity > 0.6; // 60% similarity threshold
};

export const getVideos = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const sort = getSort(req);
    const filters = getFilters(req, ['type', 'language', 'author', 'isPremium', 'category']);
    
    // Handle search query with fuzzy matching
    const { search } = req.query;
    if (search && search.trim()) {
      const fuzzyQuery = createFuzzySearchQuery(search);
      if (fuzzyQuery) {
        // Merge fuzzy query with existing filters
        if (filters.$or) {
          filters.$and = [{ $or: filters.$or }, { $or: fuzzyQuery.$or }];
          delete filters.$or;
        } else {
          filters.$or = fuzzyQuery.$or;
        }
      }
    }
    
    // Only show published videos for public, admin can see all
    if (!req.user || req.user.role !== 'admin') {
      filters.isPublished = true;
    }

    // Execute query with proper sorting
    let query = Video.find(filters);
    
    // Apply population
    query = query
      .populate('author', 'name slug avatar bio')
      .populate('category', 'name slug description');
    
    // Apply sorting
    if (sort) {
      query = query.sort(sort);
    } else {
      query = query.sort({ createdAt: -1 });
    }
    
    // Apply pagination
    query = query.skip(skip).limit(limit);
    
    const videos = await query.exec();
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

    if (!video.isPublished && (!req.user || req.user.role !== 'admin')) {
      return errorResponse(res, 'Video not found', 404);
    }

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
    
    const { title, videoUrl, slug, sourceType } = req.body;
    
    if (!title || !title.trim()) {
      return errorResponse(res, 'Title is required', 400);
    }
    if (!videoUrl) {
      return errorResponse(res, 'Video URL is required', 400);
    }
    
    const videoData = { ...req.body };
    
    // Set source type
    if (sourceType) {
      videoData.sourceType = sourceType;
    } else if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      videoData.sourceType = 'youtube';
    } else {
      videoData.sourceType = 'upload';
    }
    
    // If slug is provided, clean it; otherwise will be auto-generated
    if (slug && slug.trim()) {
      videoData.slug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
    }
    
    const video = await Video.create(videoData);
    
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
    
    // Update source type based on videoUrl
    if (req.body.videoUrl && req.body.videoUrl !== video.videoUrl) {
      if (req.body.videoUrl.includes('youtube.com') || req.body.videoUrl.includes('youtu.be')) {
        updateData.sourceType = 'youtube';
      } else {
        updateData.sourceType = 'upload';
      }
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
    
    // TODO: Delete from Cloudinary if needed
    
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
      thumbnail: video.thumbnail,
      sourceType: video.sourceType
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

// Bulk upload videos
export const bulkCreateVideos = async (req, res, next) => {
  try {
    const { videos } = req.body;
    
    if (!videos || !Array.isArray(videos) || videos.length === 0) {
      return errorResponse(res, 'Please provide an array of videos', 400);
    }
    
    const createdVideos = [];
    const errors = [];
    
    for (let i = 0; i < videos.length; i++) {
      const videoData = videos[i];
      try {
        if (!videoData.title || !videoData.videoUrl) {
          errors.push({ index: i, error: 'Title and videoUrl are required' });
          continue;
        }
        
        // Set source type
        if (videoData.videoUrl.includes('youtube.com') || videoData.videoUrl.includes('youtu.be')) {
          videoData.sourceType = 'youtube';
        } else {
          videoData.sourceType = 'upload';
        }
        
        const video = await Video.create(videoData);
        createdVideos.push(video);
      } catch (error) {
        errors.push({ index: i, error: error.message });
      }
    }
    
    successResponse(res, { createdVideos, errors, totalCreated: createdVideos.length }, 'Bulk upload completed');
  } catch (error) {
    console.error('Error in bulkCreateVideos:', error);
    next(error);
  }
};

// Search suggestions API - returns suggested searches based on partial input
export const getSearchSuggestions = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q || q.length < 2) {
      return successResponse(res, []);
    }
    
    const suggestions = await Video.aggregate([
      {
        $match: {
          isPublished: true,
          $or: [
            { title: { $regex: q, $options: 'i' } },
            { description: { $regex: q, $options: 'i' } },
            { tags: { $in: [new RegExp(q, 'i')] } }
          ]
        }
      },
      {
        $group: {
          _id: null,
          titles: { $addToSet: '$title' },
          tags: { $addToSet: { $arrayElemAt: ['$tags', 0] } }
        }
      },
      {
        $project: {
          suggestions: {
            $concatArrays: ['$titles', '$tags']
          }
        }
      }
    ]);
    
    const suggestionsList = suggestions[0]?.suggestions?.slice(0, 10) || [];
    successResponse(res, suggestionsList);
  } catch (error) {
    console.error('Error in getSearchSuggestions:', error);
    next(error);
  }
};