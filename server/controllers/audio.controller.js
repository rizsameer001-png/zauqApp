// import Audio from '../models/Audio.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination, getSort, getFilters } from '../utils/pagination.js';

// export const getAudioItems = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);
//     const sort = getSort(req);
//     const filters = getFilters(req, ['type', 'language', 'author', 'isPremium']);
//     filters.isPublished = true;

//     const audio = await Audio.find(filters)
//       .populate('author', 'name slug avatar')
//       .populate('category', 'name slug')
//       .sort(sort)
//       .skip(skip)
//       .limit(limit);

//     const total = await Audio.countDocuments(filters);
//     paginatedResponse(res, audio, { page, limit, total });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getAudioBySlug = async (req, res, next) => {
//   try {
//     const audio = await Audio.findOne({ slug: req.params.slug, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .populate('relatedBook', 'title slug coverImage')
//       .populate('relatedPoem', 'title slug author')
//       .populate('category', 'name slug');

//     if (!audio) {
//       return errorResponse(res, 'Audio not found', 404);
//     }

//     audio.stats.views += 1;
//     await audio.save();

//     let userInteraction = {};
//     if (req.user) {
//       userInteraction = {
//         isLiked: audio.likedBy.includes(req.user.id)
//       };
//     }

//     successResponse(res, { ...audio.toObject(), userInteraction });
//   } catch (error) {
//     next(error);
//   }
// };

// export const createAudio = async (req, res, next) => {
//   try {
//     const audio = await Audio.create(req.body);
//     successResponse(res, audio, 'Audio created', 201);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateAudio = async (req, res, next) => {
//   try {
//     const audio = await Audio.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );
//     successResponse(res, audio, 'Audio updated');
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteAudio = async (req, res, next) => {
//   try {
//     await Audio.findByIdAndDelete(req.params.id);
//     successResponse(res, null, 'Audio deleted');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getFeaturedAudio = async (req, res, next) => {
//   try {
//     const audio = await Audio.find({ isFeatured: true, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .limit(10);

//     successResponse(res, audio);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getAudioStream = async (req, res, next) => {
//   try {
//     const audio = await Audio.findOne({ slug: req.params.slug, isPublished: true });

//     if (!audio) {
//       return errorResponse(res, 'Audio not found', 404);
//     }

//     if (audio.isPremium && req.user?.subscription?.plan === 'free') {
//       return errorResponse(res, 'Premium subscription required', 403);
//     }

//     audio.stats.plays += 1;
//     await audio.save();

//     successResponse(res, { streamUrl: audio.audioUrl, duration: audio.duration });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getAudioTranscript = async (req, res, next) => {
//   try {
//     const audio = await Audio.findOne({ slug: req.params.slug, isPublished: true })
//       .select('title transcript');

//     if (!audio) {
//       return errorResponse(res, 'Audio not found', 404);
//     }

//     successResponse(res, { transcript: audio.transcript || '' });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getPlaylistAudio = async (req, res, next) => {
//   try {
//     const audio = await Audio.find({ 
//       playlist: req.params.playlistId, 
//       isPublished: true 
//     })
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 });

//     successResponse(res, audio);
//   } catch (error) {
//     next(error);
//   }
// };








// // server/controllers/audio.controller.js
// import Audio from '../models/Audio.js';
// import Author from '../models/Author.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination, getSort, getFilters } from '../utils/pagination.js';
// import slugify from 'slugify';

// export const getAudioItems = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);
//     const sort = getSort(req);
//     const filters = getFilters(req, ['type', 'language', 'author', 'isPremium']);
    
//     if (!req.user || req.user.role !== 'admin') {
//       filters.isPublished = true;
//     }

//     const audio = await Audio.find(filters)
//       .populate('author', 'name slug avatar')
//       .populate('category', 'name slug')
//       .sort(sort)
//       .skip(skip)
//       .limit(limit);

//     const total = await Audio.countDocuments(filters);
//     paginatedResponse(res, audio, { page, limit, total });
//   } catch (error) {
//     console.error('Error in getAudioItems:', error);
//     next(error);
//   }
// };

// export const getAudioBySlug = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     if (!slug) {
//       return errorResponse(res, 'Slug is required', 400);
//     }

//     const audio = await Audio.findOne({ slug })
//       .populate('author', 'name slug avatar bio')
//       .populate('relatedBook', 'title slug coverImage')
//       .populate('relatedPoem', 'title slug author')
//       .populate('category', 'name slug');

//     if (!audio) {
//       return errorResponse(res, 'Audio not found', 404);
//     }

//     if (!audio.isPublished && (!req.user || req.user.role !== 'admin')) {
//       return errorResponse(res, 'Audio not found', 404);
//     }

//     audio.stats.views += 1;
//     await audio.save();

//     let userInteraction = {};
//     if (req.user) {
//       userInteraction = {
//         isLiked: audio.likedBy.includes(req.user.id)
//       };
//     }

//     successResponse(res, { ...audio.toObject(), userInteraction });
//   } catch (error) {
//     console.error('Error in getAudioBySlug:', error);
//     next(error);
//   }
// };

// export const createAudio = async (req, res, next) => {
//   try {
//     console.log('Creating audio with data:', JSON.stringify(req.body, null, 2));
    
//     const { title, audioUrl, slug } = req.body;
    
//     if (!title || !title.trim()) {
//       return errorResponse(res, 'Title is required', 400);
//     }
//     if (!audioUrl) {
//       return errorResponse(res, 'Audio URL is required', 400);
//     }
    
//     const audioData = { ...req.body };
    
//     if (slug && slug.trim()) {
//       audioData.slug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     }
    
//     const audio = await Audio.create(audioData);
    
//     const populatedAudio = await Audio.findById(audio._id)
//       .populate('author', 'name slug avatar')
//       .populate('category', 'name slug');
    
//     successResponse(res, populatedAudio, 'Audio created successfully', 201);
//   } catch (error) {
//     console.error('Error creating audio:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
//     }
    
//     if (error.code === 11000) {
//       return errorResponse(res, 'An audio with this slug already exists. Please use a different slug.', 400);
//     }
    
//     next(error);
//   }
// };

// export const updateAudio = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     console.log('Updating audio with ID:', id);
    
//     const audio = await Audio.findById(id);
//     if (!audio) {
//       return errorResponse(res, 'Audio not found', 404);
//     }
    
//     let updateData = { ...req.body };
    
//     if (req.body.slug && req.body.slug !== audio.slug) {
//       const cleanSlug = req.body.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
//       const existingAudio = await Audio.findOne({ slug: cleanSlug, _id: { $ne: id } });
//       if (existingAudio) {
//         return errorResponse(res, 'Slug already exists. Please use a different slug.', 400);
//       }
//       updateData.slug = cleanSlug;
//     }
    
//     if (updateData.isPublished && !audio.isPublished) {
//       updateData.publishedAt = new Date();
//     }
    
//     const updatedAudio = await Audio.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true, runValidators: true }
//     ).populate('author', 'name slug avatar')
//       .populate('category', 'name slug');
    
//     successResponse(res, updatedAudio, 'Audio updated successfully');
//   } catch (error) {
//     console.error('Error updating audio:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
//     }
    
//     next(error);
//   }
// };

// export const deleteAudio = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     console.log('Deleting audio with ID:', id);
    
//     const audio = await Audio.findById(id);
//     if (!audio) {
//       return errorResponse(res, 'Audio not found', 404);
//     }
    
//     await Audio.findByIdAndDelete(id);
//     successResponse(res, null, 'Audio deleted successfully');
//   } catch (error) {
//     console.error('Error deleting audio:', error);
//     next(error);
//   }
// };

// export const getFeaturedAudio = async (req, res, next) => {
//   try {
//     const audio = await Audio.find({ isFeatured: true, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .limit(10);

//     successResponse(res, audio);
//   } catch (error) {
//     console.error('Error in getFeaturedAudio:', error);
//     next(error);
//   }
// };

// export const getAudioStream = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const audio = await Audio.findOne({ slug, isPublished: true });
//     if (!audio) {
//       return errorResponse(res, 'Audio not found', 404);
//     }

//     if (audio.isPremium && req.user?.subscription?.plan === 'free') {
//       return errorResponse(res, 'Premium subscription required', 403);
//     }

//     audio.stats.plays += 1;
//     await audio.save();

//     successResponse(res, { 
//       streamUrl: audio.audioUrl, 
//       duration: audio.duration,
//       title: audio.title,
//       thumbnail: audio.thumbnail || audio.coverImage
//     });
//   } catch (error) {
//     console.error('Error in getAudioStream:', error);
//     next(error);
//   }
// };

// export const getAudioTranscript = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const audio = await Audio.findOne({ slug, isPublished: true })
//       .select('title transcript');

//     if (!audio) {
//       return errorResponse(res, 'Audio not found', 404);
//     }

//     successResponse(res, { transcript: audio.transcript || '' });
//   } catch (error) {
//     console.error('Error in getAudioTranscript:', error);
//     next(error);
//   }
// };

// export const getPlaylistAudio = async (req, res, next) => {
//   try {
//     const audio = await Audio.find({ 
//       playlist: req.params.playlistId, 
//       isPublished: true 
//     })
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 });

//     successResponse(res, audio);
//   } catch (error) {
//     console.error('Error in getPlaylistAudio:', error);
//     next(error);
//   }
// };















// server/controllers/audio.controller.js
import Audio from '../models/Audio.js';
import Author from '../models/Author.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
import { getPagination, getSort, getFilters } from '../utils/pagination.js';
import slugify from 'slugify';

// Valid audio types for validation
const VALID_AUDIO_TYPES = [
  'nauha', 'marsiya', 'soz', 'salam', 'majlis', 'mushaira',
  'podcast', 'poem_recitation', 'ghazal', 'nazm', 'naat',
  'hamd', 'manqabat', 'munajat', 'audiobook', 'lecture',
  'interview', 'other'
];

// Valid occasions
const VALID_OCCASIONS = ['muharram', 'ramadan', 'eid', 'milad', 'general'];

export const getAudioItems = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const sort = getSort(req);
    const filters = getFilters(req, ['type', 'language', 'author', 'isPremium', 'occasion']);
    
    // Only show published audio for public users
    if (!req.user || req.user.role !== 'admin') {
      filters.isPublished = true;
    }

    // Handle occasion filter
    if (req.query.occasion && VALID_OCCASIONS.includes(req.query.occasion)) {
      filters.occasion = req.query.occasion;
    }

    // Handle type filter with multiple values
    if (req.query.types) {
      const types = req.query.types.split(',');
      filters.type = { $in: types };
    }

    const audio = await Audio.find(filters)
      .populate('author', 'name slug avatar bio')
      .populate('category', 'name slug')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Audio.countDocuments(filters);
    
    // Add pagination info
    const pagination = {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    };
    
    paginatedResponse(res, audio, pagination);
  } catch (error) {
    console.error('Error in getAudioItems:', error);
    next(error);
  }
};

export const getAudioBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    if (!slug) {
      return errorResponse(res, 'Slug is required', 400);
    }

    const audio = await Audio.findOne({ slug })
      .populate('author', 'name slug avatar bio')
      .populate('relatedBook', 'title slug coverImage author')
      .populate('relatedPoem', 'title slug author')
      .populate('category', 'name slug');

    if (!audio) {
      return errorResponse(res, 'Audio not found', 404);
    }

    // Check if published or admin
    if (!audio.isPublished && (!req.user || req.user.role !== 'admin')) {
      return errorResponse(res, 'Audio not found', 404);
    }

    // Increment views
    audio.stats.views += 1;
    await audio.save();

    let userInteraction = {};
    if (req.user) {
      userInteraction = {
        isLiked: audio.likedBy.includes(req.user.id),
        isBookmarked: audio.bookmarkedBy?.includes(req.user.id) || false
      };
    }

    // Add formatted duration
    const audioObject = audio.toObject();
    audioObject.formattedDuration = audio.formattedDuration;
    audioObject.typeDisplay = audio.typeDisplay;

    successResponse(res, { ...audioObject, userInteraction });
  } catch (error) {
    console.error('Error in getAudioBySlug:', error);
    next(error);
  }
};

export const createAudio = async (req, res, next) => {
  try {
    console.log('Creating audio with data:', JSON.stringify(req.body, null, 2));
    
    const { title, audioUrl, slug, type } = req.body;
    
    // Validate required fields
    if (!title || !title.trim()) {
      return errorResponse(res, 'Title is required', 400);
    }
    if (!audioUrl) {
      return errorResponse(res, 'Audio URL is required', 400);
    }
    if (!type || !VALID_AUDIO_TYPES.includes(type)) {
      return errorResponse(res, `Invalid audio type. Must be one of: ${VALID_AUDIO_TYPES.join(', ')}`, 400);
    }
    
    // Validate occasion if provided
    if (req.body.occasion && !VALID_OCCASIONS.includes(req.body.occasion)) {
      return errorResponse(res, `Invalid occasion. Must be one of: ${VALID_OCCASIONS.join(', ')}`, 400);
    }
    
    const audioData = { ...req.body };
    
    // Clean and set slug
    if (slug && slug.trim()) {
      audioData.slug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
    }
    
    // Set default values for optional fields
    if (!audioData.stats) {
      audioData.stats = {
        views: 0,
        plays: 0,
        likes: 0,
        bookmarks: 0,
        totalListeningTime: 0
      };
    }
    
    const audio = await Audio.create(audioData);
    
    const populatedAudio = await Audio.findById(audio._id)
      .populate('author', 'name slug avatar bio')
      .populate('category', 'name slug');
    
    successResponse(res, populatedAudio, 'Audio created successfully', 201);
  } catch (error) {
    console.error('Error creating audio:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
    }
    
    if (error.code === 11000) {
      return errorResponse(res, 'An audio with this slug already exists. Please use a different slug.', 400);
    }
    
    next(error);
  }
};

export const updateAudio = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('Updating audio with ID:', id);
    
    const audio = await Audio.findById(id);
    if (!audio) {
      return errorResponse(res, 'Audio not found', 404);
    }
    
    // Validate type if being updated
    if (req.body.type && !VALID_AUDIO_TYPES.includes(req.body.type)) {
      return errorResponse(res, `Invalid audio type. Must be one of: ${VALID_AUDIO_TYPES.join(', ')}`, 400);
    }
    
    // Validate occasion if being updated
    if (req.body.occasion && !VALID_OCCASIONS.includes(req.body.occasion)) {
      return errorResponse(res, `Invalid occasion. Must be one of: ${VALID_OCCASIONS.join(', ')}`, 400);
    }
    
    let updateData = { ...req.body };
    
    // Handle slug update if provided
    if (req.body.slug && req.body.slug !== audio.slug) {
      const cleanSlug = req.body.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
      const existingAudio = await Audio.findOne({ slug: cleanSlug, _id: { $ne: id } });
      if (existingAudio) {
        return errorResponse(res, 'Slug already exists. Please use a different slug.', 400);
      }
      updateData.slug = cleanSlug;
    }
    
    // Set publishedAt when publishing for first time
    if (updateData.isPublished && !audio.isPublished) {
      updateData.publishedAt = new Date();
    }
    
    const updatedAudio = await Audio.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('author', 'name slug avatar bio')
      .populate('category', 'name slug');
    
    successResponse(res, updatedAudio, 'Audio updated successfully');
  } catch (error) {
    console.error('Error updating audio:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
    }
    
    next(error);
  }
};

export const deleteAudio = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('Deleting audio with ID:', id);
    
    const audio = await Audio.findById(id);
    if (!audio) {
      return errorResponse(res, 'Audio not found', 404);
    }
    
    await Audio.findByIdAndDelete(id);
    successResponse(res, null, 'Audio deleted successfully');
  } catch (error) {
    console.error('Error deleting audio:', error);
    next(error);
  }
};

export const getFeaturedAudio = async (req, res, next) => {
  try {
    const audio = await Audio.find({ isFeatured: true, isPublished: true })
      .populate('author', 'name slug avatar')
      .sort({ createdAt: -1 })
      .limit(10);

    successResponse(res, audio);
  } catch (error) {
    console.error('Error in getFeaturedAudio:', error);
    next(error);
  }
};

export const getAudioByType = async (req, res, next) => {
  try {
    const { type } = req.params;
    const { page, limit, skip } = getPagination(req);
    
    if (!VALID_AUDIO_TYPES.includes(type)) {
      return errorResponse(res, `Invalid audio type. Must be one of: ${VALID_AUDIO_TYPES.join(', ')}`, 400);
    }
    
    const filters = { type, isPublished: true };
    
    // Add occasion filter for religious content
    if (req.query.occasion && VALID_OCCASIONS.includes(req.query.occasion)) {
      filters.occasion = req.query.occasion;
    }
    
    const audio = await Audio.find(filters)
      .populate('author', 'name slug avatar')
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Audio.countDocuments(filters);
    const pagination = {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    };
    
    paginatedResponse(res, audio, pagination);
  } catch (error) {
    console.error('Error in getAudioByType:', error);
    next(error);
  }
};

export const getAudioByOccasion = async (req, res, next) => {
  try {
    const { occasion } = req.params;
    const { page, limit, skip } = getPagination(req);
    
    if (!VALID_OCCASIONS.includes(occasion)) {
      return errorResponse(res, `Invalid occasion. Must be one of: ${VALID_OCCASIONS.join(', ')}`, 400);
    }
    
    const audio = await Audio.find({ occasion, isPublished: true })
      .populate('author', 'name slug avatar')
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Audio.countDocuments({ occasion, isPublished: true });
    const pagination = {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    };
    
    paginatedResponse(res, audio, pagination);
  } catch (error) {
    console.error('Error in getAudioByOccasion:', error);
    next(error);
  }
};

export const getAudioStream = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    const audio = await Audio.findOne({ slug, isPublished: true });
    if (!audio) {
      return errorResponse(res, 'Audio not found', 404);
    }

    // Check premium access
    if (audio.isPremium && req.user?.subscription?.plan === 'free') {
      return errorResponse(res, 'Premium subscription required to stream this audio', 403);
    }

    // Increment play count
    audio.stats.plays += 1;
    await audio.save();

    successResponse(res, { 
      streamUrl: audio.audioUrl, 
      duration: audio.duration,
      title: audio.title,
      thumbnail: audio.thumbnail || audio.coverImage,
      type: audio.type,
      typeDisplay: audio.typeDisplay,
      occasion: audio.occasion,
      isPremium: audio.isPremium
    });
  } catch (error) {
    console.error('Error in getAudioStream:', error);
    next(error);
  }
};

export const getAudioTranscript = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    const audio = await Audio.findOne({ slug, isPublished: true })
      .select('title transcript type');

    if (!audio) {
      return errorResponse(res, 'Audio not found', 404);
    }

    successResponse(res, { 
      transcript: audio.transcript || '', 
      title: audio.title,
      type: audio.type
    });
  } catch (error) {
    console.error('Error in getAudioTranscript:', error);
    next(error);
  }
};

export const getPlaylistAudio = async (req, res, next) => {
  try {
    const { playlistId } = req.params;
    
    const audio = await Audio.find({ 
      playlist: playlistId, 
      isPublished: true 
    })
      .populate('author', 'name slug avatar')
      .populate('category', 'name slug')
      .sort({ order: 1, createdAt: -1 });

    successResponse(res, audio);
  } catch (error) {
    console.error('Error in getPlaylistAudio:', error);
    next(error);
  }
};

// Get audio statistics by type
export const getAudioStats = async (req, res, next) => {
  try {
    const stats = {};
    
    for (const type of VALID_AUDIO_TYPES) {
      const count = await Audio.countDocuments({ type, isPublished: true });
      const totalPlays = await Audio.aggregate([
        { $match: { type, isPublished: true } },
        { $group: { _id: null, total: { $sum: '$stats.plays' } } }
      ]);
      
      stats[type] = {
        count,
        totalPlays: totalPlays[0]?.total || 0
      };
    }
    
    successResponse(res, stats);
  } catch (error) {
    console.error('Error in getAudioStats:', error);
    next(error);
  }
};

// Like audio
export const likeAudio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const audio = await Audio.findById(id);
    if (!audio) {
      return errorResponse(res, 'Audio not found', 404);
    }
    
    if (audio.likedBy.includes(userId)) {
      audio.likedBy.pull(userId);
      audio.stats.likes -= 1;
    } else {
      audio.likedBy.push(userId);
      audio.stats.likes += 1;
    }
    
    await audio.save();
    successResponse(res, { 
      liked: audio.likedBy.includes(userId), 
      likes: audio.stats.likes 
    });
  } catch (error) {
    console.error('Error in likeAudio:', error);
    next(error);
  }
};

// Bookmark audio
export const bookmarkAudio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const audio = await Audio.findById(id);
    if (!audio) {
      return errorResponse(res, 'Audio not found', 404);
    }
    
    if (!audio.bookmarkedBy) audio.bookmarkedBy = [];
    
    if (audio.bookmarkedBy.includes(userId)) {
      audio.bookmarkedBy.pull(userId);
      audio.stats.bookmarks -= 1;
    } else {
      audio.bookmarkedBy.push(userId);
      audio.stats.bookmarks += 1;
    }
    
    await audio.save();
    successResponse(res, { 
      bookmarked: audio.bookmarkedBy.includes(userId), 
      bookmarks: audio.stats.bookmarks 
    });
  } catch (error) {
    console.error('Error in bookmarkAudio:', error);
    next(error);
  }
};