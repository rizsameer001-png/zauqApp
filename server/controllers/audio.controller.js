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















// // server/controllers/audio.controller.js
// import Audio from '../models/Audio.js';
// import Author from '../models/Author.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination, getSort, getFilters } from '../utils/pagination.js';
// import slugify from 'slugify';

// // Valid audio types for validation
// const VALID_AUDIO_TYPES = [
//   'nauha', 'marsiya', 'soz', 'salam', 'majlis', 'mushaira',
//   'podcast', 'poem_recitation', 'ghazal', 'nazm', 'naat',
//   'hamd', 'manqabat', 'munajat', 'audiobook', 'lecture',
//   'interview', 'other'
// ];

// // Valid occasions
// const VALID_OCCASIONS = ['muharram', 'ramadan', 'eid', 'milad', 'general'];

// export const getAudioItems = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);
//     const sort = getSort(req);
//     const filters = getFilters(req, ['type', 'language', 'author', 'isPremium', 'occasion']);
    
//     // Only show published audio for public users
//     if (!req.user || req.user.role !== 'admin') {
//       filters.isPublished = true;
//     }

//     // Handle occasion filter
//     if (req.query.occasion && VALID_OCCASIONS.includes(req.query.occasion)) {
//       filters.occasion = req.query.occasion;
//     }

//     // Handle type filter with multiple values
//     if (req.query.types) {
//       const types = req.query.types.split(',');
//       filters.type = { $in: types };
//     }

//     const audio = await Audio.find(filters)
//       .populate('author', 'name slug avatar bio')
//       .populate('category', 'name slug')
//       .sort(sort)
//       .skip(skip)
//       .limit(limit);

//     const total = await Audio.countDocuments(filters);
    
//     // Add pagination info
//     const pagination = {
//       page,
//       limit,
//       total,
//       totalPages: Math.ceil(total / limit)
//     };
    
//     paginatedResponse(res, audio, pagination);
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
//       .populate('relatedBook', 'title slug coverImage author')
//       .populate('relatedPoem', 'title slug author')
//       .populate('category', 'name slug');

//     if (!audio) {
//       return errorResponse(res, 'Audio not found', 404);
//     }

//     // Check if published or admin
//     if (!audio.isPublished && (!req.user || req.user.role !== 'admin')) {
//       return errorResponse(res, 'Audio not found', 404);
//     }

//     // Increment views
//     audio.stats.views += 1;
//     await audio.save();

//     let userInteraction = {};
//     if (req.user) {
//       userInteraction = {
//         isLiked: audio.likedBy.includes(req.user.id),
//         isBookmarked: audio.bookmarkedBy?.includes(req.user.id) || false
//       };
//     }

//     // Add formatted duration
//     const audioObject = audio.toObject();
//     audioObject.formattedDuration = audio.formattedDuration;
//     audioObject.typeDisplay = audio.typeDisplay;

//     successResponse(res, { ...audioObject, userInteraction });
//   } catch (error) {
//     console.error('Error in getAudioBySlug:', error);
//     next(error);
//   }
// };

// export const createAudio = async (req, res, next) => {
//   try {
//     console.log('Creating audio with data:', JSON.stringify(req.body, null, 2));
    
//     const { title, audioUrl, slug, type } = req.body;
    
//     // Validate required fields
//     if (!title || !title.trim()) {
//       return errorResponse(res, 'Title is required', 400);
//     }
//     if (!audioUrl) {
//       return errorResponse(res, 'Audio URL is required', 400);
//     }
//     if (!type || !VALID_AUDIO_TYPES.includes(type)) {
//       return errorResponse(res, `Invalid audio type. Must be one of: ${VALID_AUDIO_TYPES.join(', ')}`, 400);
//     }
    
//     // Validate occasion if provided
//     if (req.body.occasion && !VALID_OCCASIONS.includes(req.body.occasion)) {
//       return errorResponse(res, `Invalid occasion. Must be one of: ${VALID_OCCASIONS.join(', ')}`, 400);
//     }
    
//     const audioData = { ...req.body };
    
//     // Clean and set slug
//     if (slug && slug.trim()) {
//       audioData.slug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     }
    
//     // Set default values for optional fields
//     if (!audioData.stats) {
//       audioData.stats = {
//         views: 0,
//         plays: 0,
//         likes: 0,
//         bookmarks: 0,
//         totalListeningTime: 0
//       };
//     }
    
//     const audio = await Audio.create(audioData);
    
//     const populatedAudio = await Audio.findById(audio._id)
//       .populate('author', 'name slug avatar bio')
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
    
//     // Validate type if being updated
//     if (req.body.type && !VALID_AUDIO_TYPES.includes(req.body.type)) {
//       return errorResponse(res, `Invalid audio type. Must be one of: ${VALID_AUDIO_TYPES.join(', ')}`, 400);
//     }
    
//     // Validate occasion if being updated
//     if (req.body.occasion && !VALID_OCCASIONS.includes(req.body.occasion)) {
//       return errorResponse(res, `Invalid occasion. Must be one of: ${VALID_OCCASIONS.join(', ')}`, 400);
//     }
    
//     let updateData = { ...req.body };
    
//     // Handle slug update if provided
//     if (req.body.slug && req.body.slug !== audio.slug) {
//       const cleanSlug = req.body.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
//       const existingAudio = await Audio.findOne({ slug: cleanSlug, _id: { $ne: id } });
//       if (existingAudio) {
//         return errorResponse(res, 'Slug already exists. Please use a different slug.', 400);
//       }
//       updateData.slug = cleanSlug;
//     }
    
//     // Set publishedAt when publishing for first time
//     if (updateData.isPublished && !audio.isPublished) {
//       updateData.publishedAt = new Date();
//     }
    
//     const updatedAudio = await Audio.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true, runValidators: true }
//     ).populate('author', 'name slug avatar bio')
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

// export const getAudioByType = async (req, res, next) => {
//   try {
//     const { type } = req.params;
//     const { page, limit, skip } = getPagination(req);
    
//     if (!VALID_AUDIO_TYPES.includes(type)) {
//       return errorResponse(res, `Invalid audio type. Must be one of: ${VALID_AUDIO_TYPES.join(', ')}`, 400);
//     }
    
//     const filters = { type, isPublished: true };
    
//     // Add occasion filter for religious content
//     if (req.query.occasion && VALID_OCCASIONS.includes(req.query.occasion)) {
//       filters.occasion = req.query.occasion;
//     }
    
//     const audio = await Audio.find(filters)
//       .populate('author', 'name slug avatar')
//       .populate('category', 'name slug')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);
    
//     const total = await Audio.countDocuments(filters);
//     const pagination = {
//       page,
//       limit,
//       total,
//       totalPages: Math.ceil(total / limit)
//     };
    
//     paginatedResponse(res, audio, pagination);
//   } catch (error) {
//     console.error('Error in getAudioByType:', error);
//     next(error);
//   }
// };

// export const getAudioByOccasion = async (req, res, next) => {
//   try {
//     const { occasion } = req.params;
//     const { page, limit, skip } = getPagination(req);
    
//     if (!VALID_OCCASIONS.includes(occasion)) {
//       return errorResponse(res, `Invalid occasion. Must be one of: ${VALID_OCCASIONS.join(', ')}`, 400);
//     }
    
//     const audio = await Audio.find({ occasion, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .populate('category', 'name slug')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);
    
//     const total = await Audio.countDocuments({ occasion, isPublished: true });
//     const pagination = {
//       page,
//       limit,
//       total,
//       totalPages: Math.ceil(total / limit)
//     };
    
//     paginatedResponse(res, audio, pagination);
//   } catch (error) {
//     console.error('Error in getAudioByOccasion:', error);
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

//     // Check premium access
//     if (audio.isPremium && req.user?.subscription?.plan === 'free') {
//       return errorResponse(res, 'Premium subscription required to stream this audio', 403);
//     }

//     // Increment play count
//     audio.stats.plays += 1;
//     await audio.save();

//     successResponse(res, { 
//       streamUrl: audio.audioUrl, 
//       duration: audio.duration,
//       title: audio.title,
//       thumbnail: audio.thumbnail || audio.coverImage,
//       type: audio.type,
//       typeDisplay: audio.typeDisplay,
//       occasion: audio.occasion,
//       isPremium: audio.isPremium
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
//       .select('title transcript type');

//     if (!audio) {
//       return errorResponse(res, 'Audio not found', 404);
//     }

//     successResponse(res, { 
//       transcript: audio.transcript || '', 
//       title: audio.title,
//       type: audio.type
//     });
//   } catch (error) {
//     console.error('Error in getAudioTranscript:', error);
//     next(error);
//   }
// };

// export const getPlaylistAudio = async (req, res, next) => {
//   try {
//     const { playlistId } = req.params;
    
//     const audio = await Audio.find({ 
//       playlist: playlistId, 
//       isPublished: true 
//     })
//       .populate('author', 'name slug avatar')
//       .populate('category', 'name slug')
//       .sort({ order: 1, createdAt: -1 });

//     successResponse(res, audio);
//   } catch (error) {
//     console.error('Error in getPlaylistAudio:', error);
//     next(error);
//   }
// };

// // Get audio statistics by type
// export const getAudioStats = async (req, res, next) => {
//   try {
//     const stats = {};
    
//     for (const type of VALID_AUDIO_TYPES) {
//       const count = await Audio.countDocuments({ type, isPublished: true });
//       const totalPlays = await Audio.aggregate([
//         { $match: { type, isPublished: true } },
//         { $group: { _id: null, total: { $sum: '$stats.plays' } } }
//       ]);
      
//       stats[type] = {
//         count,
//         totalPlays: totalPlays[0]?.total || 0
//       };
//     }
    
//     successResponse(res, stats);
//   } catch (error) {
//     console.error('Error in getAudioStats:', error);
//     next(error);
//   }
// };

// // Like audio
// export const likeAudio = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
    
//     const audio = await Audio.findById(id);
//     if (!audio) {
//       return errorResponse(res, 'Audio not found', 404);
//     }
    
//     if (audio.likedBy.includes(userId)) {
//       audio.likedBy.pull(userId);
//       audio.stats.likes -= 1;
//     } else {
//       audio.likedBy.push(userId);
//       audio.stats.likes += 1;
//     }
    
//     await audio.save();
//     successResponse(res, { 
//       liked: audio.likedBy.includes(userId), 
//       likes: audio.stats.likes 
//     });
//   } catch (error) {
//     console.error('Error in likeAudio:', error);
//     next(error);
//   }
// };

// // Bookmark audio
// export const bookmarkAudio = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
    
//     const audio = await Audio.findById(id);
//     if (!audio) {
//       return errorResponse(res, 'Audio not found', 404);
//     }
    
//     if (!audio.bookmarkedBy) audio.bookmarkedBy = [];
    
//     if (audio.bookmarkedBy.includes(userId)) {
//       audio.bookmarkedBy.pull(userId);
//       audio.stats.bookmarks -= 1;
//     } else {
//       audio.bookmarkedBy.push(userId);
//       audio.stats.bookmarks += 1;
//     }
    
//     await audio.save();
//     successResponse(res, { 
//       bookmarked: audio.bookmarkedBy.includes(userId), 
//       bookmarks: audio.stats.bookmarks 
//     });
//   } catch (error) {
//     console.error('Error in bookmarkAudio:', error);
//     next(error);
//   }
// };


















// // server/controllers/audio.controller.js
// import Audio from '../models/Audio.js';
// import Author from '../models/Author.js';
// import User from '../models/User.js';
// import Playlist from '../models/Playlist.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination, getSort, getFilters } from '../utils/pagination.js';
// import slugify from 'slugify';

// // Valid audio types for validation
// const VALID_AUDIO_TYPES = [
//   'nauha', 'marsiya', 'soz', 'salam', 'majlis', 'mushaira',
//   'podcast', 'poem_recitation', 'ghazal', 'nazm', 'naat',
//   'hamd', 'manqabat', 'munajat', 'audiobook', 'lecture',
//   'interview', 'other'
// ];

// // Valid occasions
// const VALID_OCCASIONS = ['muharram', 'ramadan', 'eid', 'milad', 'general'];

// export const getAudioItems = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);
//     const sort = getSort(req);
//     const filters = getFilters(req, ['type', 'language', 'author', 'isPremium', 'occasion']);
    
//     // Only show published audio for public users
//     if (!req.user || req.user.role !== 'admin') {
//       filters.isPublished = true;
//     }

//     // Handle occasion filter
//     if (req.query.occasion && VALID_OCCASIONS.includes(req.query.occasion)) {
//       filters.occasion = req.query.occasion;
//     }

//     // Handle type filter with multiple values
//     if (req.query.types) {
//       const types = req.query.types.split(',');
//       filters.type = { $in: types };
//     }

//     const audio = await Audio.find(filters)
//       .populate('author', 'name slug avatar bio')
//       .populate('category', 'name slug')
//       .sort(sort)
//       .skip(skip)
//       .limit(limit);

//     const total = await Audio.countDocuments(filters);
    
//     // Add pagination info
//     const pagination = {
//       page,
//       limit,
//       total,
//       totalPages: Math.ceil(total / limit)
//     };
    
//     paginatedResponse(res, audio, pagination);
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
//       .populate('relatedBook', 'title slug coverImage author')
//       .populate('relatedPoem', 'title slug author')
//       .populate('category', 'name slug');

//     if (!audio) {
//       return errorResponse(res, 'Audio not found', 404);
//     }

//     // Check if published or admin
//     if (!audio.isPublished && (!req.user || req.user.role !== 'admin')) {
//       return errorResponse(res, 'Audio not found', 404);
//     }

//     // Increment views
//     audio.stats.views += 1;
//     await audio.save();

//     let userInteraction = {};
//     if (req.user) {
//       userInteraction = {
//         isLiked: audio.likedBy.includes(req.user.id),
//         isBookmarked: audio.bookmarkedBy?.includes(req.user.id) || false
//       };
//     }

//     // Add formatted duration
//     const audioObject = audio.toObject();
//     audioObject.formattedDuration = audio.formattedDuration;
//     audioObject.typeDisplay = audio.typeDisplay;

//     successResponse(res, { ...audioObject, userInteraction });
//   } catch (error) {
//     console.error('Error in getAudioBySlug:', error);
//     next(error);
//   }
// };

// export const createAudio = async (req, res, next) => {
//   try {
//     console.log('Creating audio with data:', JSON.stringify(req.body, null, 2));
    
//     const { title, audioUrl, slug, type } = req.body;
    
//     // Validate required fields
//     if (!title || !title.trim()) {
//       return errorResponse(res, 'Title is required', 400);
//     }
//     if (!audioUrl) {
//       return errorResponse(res, 'Audio URL is required', 400);
//     }
//     if (!type || !VALID_AUDIO_TYPES.includes(type)) {
//       return errorResponse(res, `Invalid audio type. Must be one of: ${VALID_AUDIO_TYPES.join(', ')}`, 400);
//     }
    
//     // Validate occasion if provided
//     if (req.body.occasion && !VALID_OCCASIONS.includes(req.body.occasion)) {
//       return errorResponse(res, `Invalid occasion. Must be one of: ${VALID_OCCASIONS.join(', ')}`, 400);
//     }
    
//     const audioData = { ...req.body };
    
//     // Clean and set slug
//     if (slug && slug.trim()) {
//       audioData.slug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     }
    
//     // Set default values for optional fields
//     if (!audioData.stats) {
//       audioData.stats = {
//         views: 0,
//         plays: 0,
//         likes: 0,
//         bookmarks: 0,
//         totalListeningTime: 0
//       };
//     }
    
//     const audio = await Audio.create(audioData);
    
//     const populatedAudio = await Audio.findById(audio._id)
//       .populate('author', 'name slug avatar bio')
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
    
//     // Validate type if being updated
//     if (req.body.type && !VALID_AUDIO_TYPES.includes(req.body.type)) {
//       return errorResponse(res, `Invalid audio type. Must be one of: ${VALID_AUDIO_TYPES.join(', ')}`, 400);
//     }
    
//     // Validate occasion if being updated
//     if (req.body.occasion && !VALID_OCCASIONS.includes(req.body.occasion)) {
//       return errorResponse(res, `Invalid occasion. Must be one of: ${VALID_OCCASIONS.join(', ')}`, 400);
//     }
    
//     let updateData = { ...req.body };
    
//     // Handle slug update if provided
//     if (req.body.slug && req.body.slug !== audio.slug) {
//       const cleanSlug = req.body.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
//       const existingAudio = await Audio.findOne({ slug: cleanSlug, _id: { $ne: id } });
//       if (existingAudio) {
//         return errorResponse(res, 'Slug already exists. Please use a different slug.', 400);
//       }
//       updateData.slug = cleanSlug;
//     }
    
//     // Set publishedAt when publishing for first time
//     if (updateData.isPublished && !audio.isPublished) {
//       updateData.publishedAt = new Date();
//     }
    
//     const updatedAudio = await Audio.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true, runValidators: true }
//     ).populate('author', 'name slug avatar bio')
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

// export const getAudioByType = async (req, res, next) => {
//   try {
//     const { type } = req.params;
//     const { page, limit, skip } = getPagination(req);
    
//     if (!VALID_AUDIO_TYPES.includes(type)) {
//       return errorResponse(res, `Invalid audio type. Must be one of: ${VALID_AUDIO_TYPES.join(', ')}`, 400);
//     }
    
//     const filters = { type, isPublished: true };
    
//     // Add occasion filter for religious content
//     if (req.query.occasion && VALID_OCCASIONS.includes(req.query.occasion)) {
//       filters.occasion = req.query.occasion;
//     }
    
//     const audio = await Audio.find(filters)
//       .populate('author', 'name slug avatar')
//       .populate('category', 'name slug')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);
    
//     const total = await Audio.countDocuments(filters);
//     const pagination = {
//       page,
//       limit,
//       total,
//       totalPages: Math.ceil(total / limit)
//     };
    
//     paginatedResponse(res, audio, pagination);
//   } catch (error) {
//     console.error('Error in getAudioByType:', error);
//     next(error);
//   }
// };

// export const getAudioByOccasion = async (req, res, next) => {
//   try {
//     const { occasion } = req.params;
//     const { page, limit, skip } = getPagination(req);
    
//     if (!VALID_OCCASIONS.includes(occasion)) {
//       return errorResponse(res, `Invalid occasion. Must be one of: ${VALID_OCCASIONS.join(', ')}`, 400);
//     }
    
//     const audio = await Audio.find({ occasion, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .populate('category', 'name slug')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);
    
//     const total = await Audio.countDocuments({ occasion, isPublished: true });
//     const pagination = {
//       page,
//       limit,
//       total,
//       totalPages: Math.ceil(total / limit)
//     };
    
//     paginatedResponse(res, audio, pagination);
//   } catch (error) {
//     console.error('Error in getAudioByOccasion:', error);
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

//     // Check premium access
//     if (audio.isPremium && req.user?.subscription?.plan === 'free') {
//       return errorResponse(res, 'Premium subscription required to stream this audio', 403);
//     }

//     // Increment play count
//     audio.stats.plays += 1;
//     await audio.save();

//     successResponse(res, { 
//       streamUrl: audio.audioUrl, 
//       duration: audio.duration,
//       title: audio.title,
//       thumbnail: audio.thumbnail || audio.coverImage,
//       type: audio.type,
//       typeDisplay: audio.typeDisplay,
//       occasion: audio.occasion,
//       isPremium: audio.isPremium
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
//       .select('title transcript type');

//     if (!audio) {
//       return errorResponse(res, 'Audio not found', 404);
//     }

//     successResponse(res, { 
//       transcript: audio.transcript || '', 
//       title: audio.title,
//       type: audio.type
//     });
//   } catch (error) {
//     console.error('Error in getAudioTranscript:', error);
//     next(error);
//   }
// };

// export const getPlaylistAudio = async (req, res, next) => {
//   try {
//     const { playlistId } = req.params;
    
//     const audio = await Audio.find({ 
//       playlist: playlistId, 
//       isPublished: true 
//     })
//       .populate('author', 'name slug avatar')
//       .populate('category', 'name slug')
//       .sort({ order: 1, createdAt: -1 });

//     successResponse(res, audio);
//   } catch (error) {
//     console.error('Error in getPlaylistAudio:', error);
//     next(error);
//   }
// };

// // Get audio statistics by type
// export const getAudioStats = async (req, res, next) => {
//   try {
//     const stats = {};
    
//     for (const type of VALID_AUDIO_TYPES) {
//       const count = await Audio.countDocuments({ type, isPublished: true });
//       const totalPlays = await Audio.aggregate([
//         { $match: { type, isPublished: true } },
//         { $group: { _id: null, total: { $sum: '$stats.plays' } } }
//       ]);
      
//       stats[type] = {
//         count,
//         totalPlays: totalPlays[0]?.total || 0
//       };
//     }
    
//     successResponse(res, stats);
//   } catch (error) {
//     console.error('Error in getAudioStats:', error);
//     next(error);
//   }
// };

// // Like audio
// export const likeAudio = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
    
//     const audio = await Audio.findById(id);
//     if (!audio) {
//       return errorResponse(res, 'Audio not found', 404);
//     }
    
//     if (audio.likedBy.includes(userId)) {
//       audio.likedBy.pull(userId);
//       audio.stats.likes -= 1;
//     } else {
//       audio.likedBy.push(userId);
//       audio.stats.likes += 1;
//     }
    
//     await audio.save();
//     successResponse(res, { 
//       liked: audio.likedBy.includes(userId), 
//       likes: audio.stats.likes 
//     });
//   } catch (error) {
//     console.error('Error in likeAudio:', error);
//     next(error);
//   }
// };

// // Unlike audio
// export const unlikeAudio = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
    
//     const audio = await Audio.findById(id);
//     if (!audio) {
//       return errorResponse(res, 'Audio not found', 404);
//     }
    
//     if (!audio.likedBy.includes(userId)) {
//       return errorResponse(res, 'Audio not liked yet', 400);
//     }
    
//     audio.likedBy.pull(userId);
//     audio.stats.likes -= 1;
//     await audio.save();
    
//     successResponse(res, { 
//       liked: false, 
//       likes: audio.stats.likes 
//     }, 'Like removed successfully');
//   } catch (error) {
//     console.error('Error in unlikeAudio:', error);
//     next(error);
//   }
// };

// // Bookmark audio
// export const bookmarkAudio = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
    
//     const audio = await Audio.findById(id);
//     if (!audio) {
//       return errorResponse(res, 'Audio not found', 404);
//     }
    
//     if (!audio.bookmarkedBy) audio.bookmarkedBy = [];
    
//     if (audio.bookmarkedBy.includes(userId)) {
//       audio.bookmarkedBy.pull(userId);
//       audio.stats.bookmarks -= 1;
//     } else {
//       audio.bookmarkedBy.push(userId);
//       audio.stats.bookmarks += 1;
//     }
    
//     await audio.save();
//     successResponse(res, { 
//       bookmarked: audio.bookmarkedBy.includes(userId), 
//       bookmarks: audio.stats.bookmarks 
//     });
//   } catch (error) {
//     console.error('Error in bookmarkAudio:', error);
//     next(error);
//   }
// };

// // Remove bookmark
// export const removeBookmarkAudio = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
    
//     const audio = await Audio.findById(id);
//     if (!audio) {
//       return errorResponse(res, 'Audio not found', 404);
//     }
    
//     if (!audio.bookmarkedBy || !audio.bookmarkedBy.includes(userId)) {
//       return errorResponse(res, 'Audio not bookmarked', 400);
//     }
    
//     audio.bookmarkedBy.pull(userId);
//     audio.stats.bookmarks -= 1;
//     await audio.save();
    
//     successResponse(res, { 
//       bookmarked: false, 
//       bookmarks: audio.stats.bookmarks 
//     }, 'Bookmark removed successfully');
//   } catch (error) {
//     console.error('Error in removeBookmarkAudio:', error);
//     next(error);
//   }
// };

// // Add to playlist
// export const addToPlaylist = async (req, res, next) => {
//   try {
//     const { audioId, playlistId } = req.params;
//     const userId = req.user.id;
    
//     const playlist = await Playlist.findOne({ _id: playlistId, user: userId });
//     if (!playlist) {
//       return errorResponse(res, 'Playlist not found', 404);
//     }
    
//     if (!playlist.audios.includes(audioId)) {
//       playlist.audios.push(audioId);
//       await playlist.save();
//     }
    
//     successResponse(res, playlist, 'Added to playlist successfully');
//   } catch (error) {
//     console.error('Error in addToPlaylist:', error);
//     next(error);
//   }
// };

// // Remove from playlist
// export const removeFromPlaylist = async (req, res, next) => {
//   try {
//     const { audioId, playlistId } = req.params;
//     const userId = req.user.id;
    
//     const playlist = await Playlist.findOne({ _id: playlistId, user: userId });
//     if (!playlist) {
//       return errorResponse(res, 'Playlist not found', 404);
//     }
    
//     playlist.audios = playlist.audios.filter(id => id.toString() !== audioId);
//     await playlist.save();
    
//     successResponse(res, playlist, 'Removed from playlist successfully');
//   } catch (error) {
//     console.error('Error in removeFromPlaylist:', error);
//     next(error);
//   }
// };

// // Get user playlists
// export const getUserPlaylists = async (req, res, next) => {
//   try {
//     const playlists = await Playlist.find({ user: req.user.id })
//       .populate('audios', 'title slug thumbnail duration stats')
//       .sort({ createdAt: -1 });
    
//     successResponse(res, playlists);
//   } catch (error) {
//     console.error('Error in getUserPlaylists:', error);
//     next(error);
//   }
// };

// // Create playlist
// export const createPlaylist = async (req, res, next) => {
//   try {
//     const { name, description, coverImage, isPublic } = req.body;
    
//     const playlist = await Playlist.create({
//       name,
//       description,
//       coverImage,
//       isPublic: isPublic !== false,
//       user: req.user.id,
//       audios: []
//     });
    
//     successResponse(res, playlist, 'Playlist created successfully', 201);
//   } catch (error) {
//     console.error('Error in createPlaylist:', error);
//     next(error);
//   }
// };

// // Get recently played
// export const getRecentlyPlayed = async (req, res, next) => {
//   try {
//     const { limit = 20 } = req.query;
    
//     const user = await User.findById(req.user.id)
//       .populate({
//         path: 'recentlyPlayed.audio',
//         populate: { path: 'author', select: 'name slug avatar' }
//       });
    
//     const recentAudio = user?.recentlyPlayed
//       ?.sort((a, b) => b.playedAt - a.playedAt)
//       ?.slice(0, parseInt(limit))
//       ?.map(item => item.audio) || [];
    
//     successResponse(res, recentAudio);
//   } catch (error) {
//     console.error('Error in getRecentlyPlayed:', error);
//     next(error);
//   }
// };

// // Get trending audio
// export const getTrendingAudio = async (req, res, next) => {
//   try {
//     const { limit = 10, days = 7 } = req.query;
    
//     const dateLimit = new Date();
//     dateLimit.setDate(dateLimit.getDate() - parseInt(days));
    
//     const trending = await Audio.aggregate([
//       { $match: { isPublished: true, createdAt: { $gte: dateLimit } } },
//       { $addFields: { 
//         trendingScore: { 
//           $add: [
//             { $multiply: ['$stats.plays', 2] },
//             { $multiply: ['$stats.views', 1] },
//             { $multiply: ['$stats.likes', 3] }
//           ]
//         }
//       }},
//       { $sort: { trendingScore: -1 } },
//       { $limit: parseInt(limit) }
//     ]);
    
//     const populatedTrending = await Audio.populate(trending, [
//       { path: 'author', select: 'name slug avatar' }
//     ]);
    
//     successResponse(res, populatedTrending);
//   } catch (error) {
//     console.error('Error in getTrendingAudio:', error);
//     next(error);
//   }
// };

// // Get popular by type
// export const getPopularByType = async (req, res, next) => {
//   try {
//     const { type } = req.params;
//     const { limit = 10 } = req.query;
    
//     const popular = await Audio.find({ type, isPublished: true })
//       .sort({ 'stats.plays': -1, 'stats.likes': -1 })
//       .limit(parseInt(limit))
//       .populate('author', 'name slug avatar');
    
//     successResponse(res, popular);
//   } catch (error) {
//     console.error('Error in getPopularByType:', error);
//     next(error);
//   }
// };

// // Search audio
// export const searchAudio = async (req, res, next) => {
//   try {
//     const { q, page = 1, limit = 20 } = req.query;
    
//     if (!q || q.trim().length < 2) {
//       return errorResponse(res, 'Search query must be at least 2 characters', 400);
//     }
    
//     const searchRegex = new RegExp(q, 'i');
//     const skip = (parseInt(page) - 1) * parseInt(limit);
    
//     const audio = await Audio.find({
//       isPublished: true,
//       $or: [
//         { title: searchRegex },
//         { description: searchRegex },
//         { tags: { $in: [searchRegex] } },
//         { 'narrator.name': searchRegex }
//       ]
//     })
//       .populate('author', 'name slug avatar')
//       .sort({ 'stats.plays': -1 })
//       .skip(skip)
//       .limit(parseInt(limit));
    
//     const total = await Audio.countDocuments({
//       isPublished: true,
//       $or: [
//         { title: searchRegex },
//         { description: searchRegex },
//         { tags: { $in: [searchRegex] } }
//       ]
//     });
    
//     paginatedResponse(res, audio, {
//       page: parseInt(page),
//       limit: parseInt(limit),
//       total,
//       query: q
//     });
//   } catch (error) {
//     console.error('Error in searchAudio:', error);
//     next(error);
//   }
// };

// // Get audio by author
// export const getAudioByAuthor = async (req, res, next) => {
//   try {
//     const { authorId } = req.params;
//     const { page = 1, limit = 20 } = req.query;
//     const skip = (parseInt(page) - 1) * parseInt(limit);
    
//     const audio = await Audio.find({ author: authorId, isPublished: true })
//       .populate('author', 'name slug avatar bio')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(parseInt(limit));
    
//     const total = await Audio.countDocuments({ author: authorId, isPublished: true });
    
//     paginatedResponse(res, audio, {
//       page: parseInt(page),
//       limit: parseInt(limit),
//       total
//     });
//   } catch (error) {
//     console.error('Error in getAudioByAuthor:', error);
//     next(error);
//   }
// };

// // Get audio by tag
// export const getAudioByTag = async (req, res, next) => {
//   try {
//     const { tag } = req.params;
//     const { page = 1, limit = 20 } = req.query;
//     const skip = (parseInt(page) - 1) * parseInt(limit);
    
//     const audio = await Audio.find({ tags: tag, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(parseInt(limit));
    
//     const total = await Audio.countDocuments({ tags: tag, isPublished: true });
    
//     paginatedResponse(res, audio, {
//       page: parseInt(page),
//       limit: parseInt(limit),
//       total,
//       tag
//     });
//   } catch (error) {
//     console.error('Error in getAudioByTag:', error);
//     next(error);
//   }
// };

// // Get recommended audio
// export const getRecommendedAudio = async (req, res, next) => {
//   try {
//     const { limit = 10 } = req.query;
    
//     // Get user's listening history and preferences
//     const user = await User.findById(req.user.id)
//       .populate('recentlyPlayed.audio')
//       .populate('likedAudio');
    
//     if (!user || user.recentlyPlayed?.length === 0) {
//       // Return trending audio as fallback
//       const trending = await Audio.find({ isPublished: true })
//         .sort({ 'stats.plays': -1 })
//         .limit(parseInt(limit))
//         .populate('author', 'name slug avatar');
      
//       return successResponse(res, trending);
//     }
    
//     // Get user's preferred types from their listening history
//     const recentTypes = user.recentlyPlayed
//       .map(item => item.audio?.type)
//       .filter(type => type);
    
//     const preferredTypes = [...new Set(recentTypes)];
    
//     // Recommend similar type audio
//     const recommended = await Audio.find({
//       isPublished: true,
//       type: { $in: preferredTypes },
//       _id: { $nin: user.recentlyPlayed.map(item => item.audio?._id) }
//     })
//       .sort({ 'stats.plays': -1, 'stats.likes': -1 })
//       .limit(parseInt(limit))
//       .populate('author', 'name slug avatar');
    
//     successResponse(res, recommended);
//   } catch (error) {
//     console.error('Error in getRecommendedAudio:', error);
//     next(error);
//   }
// };

// // Get similar audio
// export const getSimilarAudio = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     const { limit = 5 } = req.query;
    
//     const currentAudio = await Audio.findOne({ slug, isPublished: true });
//     if (!currentAudio) {
//       return errorResponse(res, 'Audio not found', 404);
//     }
    
//     const similar = await Audio.find({
//       _id: { $ne: currentAudio._id },
//       isPublished: true,
//       $or: [
//         { type: currentAudio.type },
//         { occasion: currentAudio.occasion },
//         { tags: { $in: currentAudio.tags || [] } },
//         { author: currentAudio.author }
//       ]
//     })
//       .sort({ 'stats.plays': -1 })
//       .limit(parseInt(limit))
//       .populate('author', 'name slug avatar');
    
//     successResponse(res, similar);
//   } catch (error) {
//     console.error('Error in getSimilarAudio:', error);
//     next(error);
//   }
// };

// // Get audio analytics (admin only)
// export const getAudioAnalytics = async (req, res, next) => {
//   try {
//     const { period = 'week' } = req.query;
    
//     let dateFilter = {};
//     if (period === 'week') {
//       const weekAgo = new Date();
//       weekAgo.setDate(weekAgo.getDate() - 7);
//       dateFilter = { createdAt: { $gte: weekAgo } };
//     } else if (period === 'month') {
//       const monthAgo = new Date();
//       monthAgo.setMonth(monthAgo.getMonth() - 1);
//       dateFilter = { createdAt: { $gte: monthAgo } };
//     }
    
//     const analytics = {
//       totalAudio: await Audio.countDocuments(),
//       publishedAudio: await Audio.countDocuments({ isPublished: true }),
//       totalPlays: await Audio.aggregate([
//         { $match: dateFilter },
//         { $group: { _id: null, total: { $sum: '$stats.plays' } } }
//       ]),
//       totalViews: await Audio.aggregate([
//         { $match: dateFilter },
//         { $group: { _id: null, total: { $sum: '$stats.views' } } }
//       ]),
//       totalLikes: await Audio.aggregate([
//         { $match: dateFilter },
//         { $group: { _id: null, total: { $sum: '$stats.likes' } } }
//       ]),
//       topPerforming: await Audio.find({ isPublished: true })
//         .sort({ 'stats.plays': -1 })
//         .limit(10)
//         .select('title slug stats type'),
//       audioByType: await Audio.aggregate([
//         { $match: { isPublished: true } },
//         { $group: { _id: '$type', count: { $sum: 1 }, totalPlays: { $sum: '$stats.plays' } } }
//       ])
//     };
    
//     successResponse(res, analytics);
//   } catch (error) {
//     console.error('Error in getAudioAnalytics:', error);
//     next(error);
//   }
// };

// // Bulk upload audio (admin only)
// export const bulkUploadAudio = async (req, res, next) => {
//   try {
//     const { audios } = req.body;
    
//     if (!audios || !Array.isArray(audios) || audios.length === 0) {
//       return errorResponse(res, 'Please provide an array of audio objects', 400);
//     }
    
//     const results = {
//       successful: [],
//       failed: []
//     };
    
//     for (const audioData of audios) {
//       try {
//         // Validate required fields
//         if (!audioData.title || !audioData.audioUrl || !audioData.type) {
//           throw new Error('Missing required fields: title, audioUrl, or type');
//         }
        
//         const audio = await Audio.create(audioData);
//         results.successful.push({ id: audio._id, title: audio.title });
//       } catch (error) {
//         results.failed.push({ data: audioData, error: error.message });
//       }
//     }
    
//     successResponse(res, results, `Successfully uploaded ${results.successful.length} of ${audios.length} audio files`);
//   } catch (error) {
//     console.error('Error in bulkUploadAudio:', error);
//     next(error);
//   }
// };

// // Update audio metadata (admin only)
// export const updateAudioMetadata = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const updates = req.body;
    
//     const audio = await Audio.findByIdAndUpdate(
//       id,
//       { $set: updates },
//       { new: true, runValidators: true }
//     ).populate('author', 'name slug avatar');
    
//     if (!audio) {
//       return errorResponse(res, 'Audio not found', 404);
//     }
    
//     successResponse(res, audio, 'Audio metadata updated successfully');
//   } catch (error) {
//     console.error('Error in updateAudioMetadata:', error);
//     next(error);
//   }
// };



























// server/controllers/audio.controller.js
import Audio from '../models/Audio.js';
import Author from '../models/Author.js';
import User from '../models/User.js';
import Playlist from '../models/Playlist.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
import { getPagination, getSort, getFilters } from '../utils/pagination.js';
import slugify from 'slugify';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

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

    if (!audio.isPublished && (!req.user || req.user.role !== 'admin')) {
      return errorResponse(res, 'Audio not found', 404);
    }

    audio.stats.views += 1;
    await audio.save();

    let userInteraction = {};
    if (req.user) {
      userInteraction = {
        isLiked: audio.likedBy.includes(req.user.id),
        isBookmarked: audio.bookmarkedBy?.includes(req.user.id) || false
      };
    }

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
    
    if (!title || !title.trim()) {
      return errorResponse(res, 'Title is required', 400);
    }
    if (!audioUrl) {
      return errorResponse(res, 'Audio URL is required', 400);
    }
    if (!type || !VALID_AUDIO_TYPES.includes(type)) {
      return errorResponse(res, `Invalid audio type. Must be one of: ${VALID_AUDIO_TYPES.join(', ')}`, 400);
    }
    
    if (req.body.occasion && !VALID_OCCASIONS.includes(req.body.occasion)) {
      return errorResponse(res, `Invalid occasion. Must be one of: ${VALID_OCCASIONS.join(', ')}`, 400);
    }
    
    const audioData = { ...req.body };
    
    if (slug && slug.trim()) {
      audioData.slug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
    }
    
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
    
    if (req.body.type && !VALID_AUDIO_TYPES.includes(req.body.type)) {
      return errorResponse(res, `Invalid audio type. Must be one of: ${VALID_AUDIO_TYPES.join(', ')}`, 400);
    }
    
    if (req.body.occasion && !VALID_OCCASIONS.includes(req.body.occasion)) {
      return errorResponse(res, `Invalid occasion. Must be one of: ${VALID_OCCASIONS.join(', ')}`, 400);
    }
    
    let updateData = { ...req.body };
    
    if (req.body.slug && req.body.slug !== audio.slug) {
      const cleanSlug = req.body.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
      const existingAudio = await Audio.findOne({ slug: cleanSlug, _id: { $ne: id } });
      if (existingAudio) {
        return errorResponse(res, 'Slug already exists. Please use a different slug.', 400);
      }
      updateData.slug = cleanSlug;
    }
    
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
    
    // Optional: Delete from Cloudinary if stored there
    if (audio.audioUrl && audio.audioUrl.includes('cloudinary')) {
      try {
        const publicId = audio.audioUrl.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`zauqapp/audio/${publicId}`, { resource_type: 'video' });
        console.log('Deleted audio from Cloudinary:', publicId);
      } catch (cloudinaryError) {
        console.error('Error deleting from Cloudinary:', cloudinaryError);
      }
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

    if (audio.isPremium && req.user?.subscription?.plan === 'free') {
      return errorResponse(res, 'Premium subscription required to stream this audio', 403);
    }

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

export const unlikeAudio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const audio = await Audio.findById(id);
    if (!audio) {
      return errorResponse(res, 'Audio not found', 404);
    }
    
    if (!audio.likedBy.includes(userId)) {
      return errorResponse(res, 'Audio not liked yet', 400);
    }
    
    audio.likedBy.pull(userId);
    audio.stats.likes -= 1;
    await audio.save();
    
    successResponse(res, { 
      liked: false, 
      likes: audio.stats.likes 
    }, 'Like removed successfully');
  } catch (error) {
    console.error('Error in unlikeAudio:', error);
    next(error);
  }
};

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

export const removeBookmarkAudio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const audio = await Audio.findById(id);
    if (!audio) {
      return errorResponse(res, 'Audio not found', 404);
    }
    
    if (!audio.bookmarkedBy || !audio.bookmarkedBy.includes(userId)) {
      return errorResponse(res, 'Audio not bookmarked', 400);
    }
    
    audio.bookmarkedBy.pull(userId);
    audio.stats.bookmarks -= 1;
    await audio.save();
    
    successResponse(res, { 
      bookmarked: false, 
      bookmarks: audio.stats.bookmarks 
    }, 'Bookmark removed successfully');
  } catch (error) {
    console.error('Error in removeBookmarkAudio:', error);
    next(error);
  }
};

export const addToPlaylist = async (req, res, next) => {
  try {
    const { audioId, playlistId } = req.params;
    const userId = req.user.id;
    
    const playlist = await Playlist.findOne({ _id: playlistId, user: userId });
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

export const removeFromPlaylist = async (req, res, next) => {
  try {
    const { audioId, playlistId } = req.params;
    const userId = req.user.id;
    
    const playlist = await Playlist.findOne({ _id: playlistId, user: userId });
    if (!playlist) {
      return errorResponse(res, 'Playlist not found', 404);
    }
    
    playlist.audios = playlist.audios.filter(id => id.toString() !== audioId);
    await playlist.save();
    
    successResponse(res, playlist, 'Removed from playlist successfully');
  } catch (error) {
    console.error('Error in removeFromPlaylist:', error);
    next(error);
  }
};

export const getUserPlaylists = async (req, res, next) => {
  try {
    const playlists = await Playlist.find({ user: req.user.id })
      .populate('audios', 'title slug thumbnail duration stats')
      .sort({ createdAt: -1 });
    
    successResponse(res, playlists);
  } catch (error) {
    console.error('Error in getUserPlaylists:', error);
    next(error);
  }
};

export const createPlaylist = async (req, res, next) => {
  try {
    const { name, description, coverImage, isPublic } = req.body;
    
    const playlist = await Playlist.create({
      name,
      description,
      coverImage,
      isPublic: isPublic !== false,
      user: req.user.id,
      audios: []
    });
    
    successResponse(res, playlist, 'Playlist created successfully', 201);
  } catch (error) {
    console.error('Error in createPlaylist:', error);
    next(error);
  }
};

export const getRecentlyPlayed = async (req, res, next) => {
  try {
    const { limit = 20 } = req.query;
    
    const user = await User.findById(req.user.id)
      .populate({
        path: 'recentlyPlayed.audio',
        populate: { path: 'author', select: 'name slug avatar' }
      });
    
    const recentAudio = user?.recentlyPlayed
      ?.sort((a, b) => b.playedAt - a.playedAt)
      ?.slice(0, parseInt(limit))
      ?.map(item => item.audio) || [];
    
    successResponse(res, recentAudio);
  } catch (error) {
    console.error('Error in getRecentlyPlayed:', error);
    next(error);
  }
};

export const getTrendingAudio = async (req, res, next) => {
  try {
    const { limit = 10, days = 7 } = req.query;
    
    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - parseInt(days));
    
    const trending = await Audio.aggregate([
      { $match: { isPublished: true, createdAt: { $gte: dateLimit } } },
      { $addFields: { 
        trendingScore: { 
          $add: [
            { $multiply: ['$stats.plays', 2] },
            { $multiply: ['$stats.views', 1] },
            { $multiply: ['$stats.likes', 3] }
          ]
        }
      }},
      { $sort: { trendingScore: -1 } },
      { $limit: parseInt(limit) }
    ]);
    
    const populatedTrending = await Audio.populate(trending, [
      { path: 'author', select: 'name slug avatar' }
    ]);
    
    successResponse(res, populatedTrending);
  } catch (error) {
    console.error('Error in getTrendingAudio:', error);
    next(error);
  }
};

export const getPopularByType = async (req, res, next) => {
  try {
    const { type } = req.params;
    const { limit = 10 } = req.query;
    
    const popular = await Audio.find({ type, isPublished: true })
      .sort({ 'stats.plays': -1, 'stats.likes': -1 })
      .limit(parseInt(limit))
      .populate('author', 'name slug avatar');
    
    successResponse(res, popular);
  } catch (error) {
    console.error('Error in getPopularByType:', error);
    next(error);
  }
};

export const searchAudio = async (req, res, next) => {
  try {
    const { q, page = 1, limit = 20 } = req.query;
    
    if (!q || q.trim().length < 2) {
      return errorResponse(res, 'Search query must be at least 2 characters', 400);
    }
    
    const searchRegex = new RegExp(q, 'i');
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const audio = await Audio.find({
      isPublished: true,
      $or: [
        { title: searchRegex },
        { description: searchRegex },
        { tags: { $in: [searchRegex] } },
        { 'narrator.name': searchRegex }
      ]
    })
      .populate('author', 'name slug avatar')
      .sort({ 'stats.plays': -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Audio.countDocuments({
      isPublished: true,
      $or: [
        { title: searchRegex },
        { description: searchRegex },
        { tags: { $in: [searchRegex] } }
      ]
    });
    
    paginatedResponse(res, audio, {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      query: q
    });
  } catch (error) {
    console.error('Error in searchAudio:', error);
    next(error);
  }
};

export const getAudioByAuthor = async (req, res, next) => {
  try {
    const { authorId } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const audio = await Audio.find({ author: authorId, isPublished: true })
      .populate('author', 'name slug avatar bio')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Audio.countDocuments({ author: authorId, isPublished: true });
    
    paginatedResponse(res, audio, {
      page: parseInt(page),
      limit: parseInt(limit),
      total
    });
  } catch (error) {
    console.error('Error in getAudioByAuthor:', error);
    next(error);
  }
};

export const getAudioByTag = async (req, res, next) => {
  try {
    const { tag } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const audio = await Audio.find({ tags: tag, isPublished: true })
      .populate('author', 'name slug avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Audio.countDocuments({ tags: tag, isPublished: true });
    
    paginatedResponse(res, audio, {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      tag
    });
  } catch (error) {
    console.error('Error in getAudioByTag:', error);
    next(error);
  }
};

export const getRecommendedAudio = async (req, res, next) => {
  try {
    const { limit = 10 } = req.query;
    
    const user = await User.findById(req.user.id)
      .populate('recentlyPlayed.audio')
      .populate('likedAudio');
    
    if (!user || user.recentlyPlayed?.length === 0) {
      const trending = await Audio.find({ isPublished: true })
        .sort({ 'stats.plays': -1 })
        .limit(parseInt(limit))
        .populate('author', 'name slug avatar');
      
      return successResponse(res, trending);
    }
    
    const recentTypes = user.recentlyPlayed
      .map(item => item.audio?.type)
      .filter(type => type);
    
    const preferredTypes = [...new Set(recentTypes)];
    
    const recommended = await Audio.find({
      isPublished: true,
      type: { $in: preferredTypes },
      _id: { $nin: user.recentlyPlayed.map(item => item.audio?._id) }
    })
      .sort({ 'stats.plays': -1, 'stats.likes': -1 })
      .limit(parseInt(limit))
      .populate('author', 'name slug avatar');
    
    successResponse(res, recommended);
  } catch (error) {
    console.error('Error in getRecommendedAudio:', error);
    next(error);
  }
};

export const getSimilarAudio = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { limit = 5 } = req.query;
    
    const currentAudio = await Audio.findOne({ slug, isPublished: true });
    if (!currentAudio) {
      return errorResponse(res, 'Audio not found', 404);
    }
    
    const similar = await Audio.find({
      _id: { $ne: currentAudio._id },
      isPublished: true,
      $or: [
        { type: currentAudio.type },
        { occasion: currentAudio.occasion },
        { tags: { $in: currentAudio.tags || [] } },
        { author: currentAudio.author }
      ]
    })
      .sort({ 'stats.plays': -1 })
      .limit(parseInt(limit))
      .populate('author', 'name slug avatar');
    
    successResponse(res, similar);
  } catch (error) {
    console.error('Error in getSimilarAudio:', error);
    next(error);
  }
};

// ============================================
// IMPROVED: Get audio analytics with better error handling
// ============================================
export const getAudioAnalytics = async (req, res, next) => {
  try {
    const { period = 'week' } = req.query;
    
    let dateFilter = {};
    const now = new Date();
    
    switch (period) {
      case 'week':
        dateFilter = { createdAt: { $gte: new Date(now.setDate(now.getDate() - 7)) } };
        break;
      case 'month':
        dateFilter = { createdAt: { $gte: new Date(now.setMonth(now.getMonth() - 1)) } };
        break;
      case 'year':
        dateFilter = { createdAt: { $gte: new Date(now.setFullYear(now.getFullYear() - 1)) } };
        break;
      default:
        dateFilter = { createdAt: { $gte: new Date(now.setDate(now.getDate() - 7)) } };
    }
    
    // Run all queries in parallel for better performance
    const [
      totalAudio,
      publishedAudio,
      totalPlaysResult,
      totalViewsResult,
      totalLikesResult,
      topPerforming,
      audioByType
    ] = await Promise.allSettled([
      Audio.countDocuments(),
      Audio.countDocuments({ isPublished: true }),
      Audio.aggregate([
        { $match: dateFilter },
        { $group: { _id: null, total: { $sum: '$stats.plays' } } }
      ]),
      Audio.aggregate([
        { $match: dateFilter },
        { $group: { _id: null, total: { $sum: '$stats.views' } } }
      ]),
      Audio.aggregate([
        { $match: dateFilter },
        { $group: { _id: null, total: { $sum: '$stats.likes' } } }
      ]),
      Audio.find({ isPublished: true })
        .sort({ 'stats.plays': -1 })
        .limit(10)
        .select('title slug stats type thumbnail author')
        .populate('author', 'name slug'),
      Audio.aggregate([
        { $match: { isPublished: true } },
        { $group: { _id: '$type', count: { $sum: 1 }, totalPlays: { $sum: '$stats.plays' } } },
        { $sort: { count: -1 } }
      ])
    ]);
    
    // Safely extract values from Promise results
    const analytics = {
      totalAudio: totalAudio || 0,
      publishedAudio: publishedAudio || 0,
      totalPlays: totalPlaysResult.status === 'fulfilled' ? (totalPlaysResult.value[0]?.total || 0) : 0,
      totalViews: totalViewsResult.status === 'fulfilled' ? (totalViewsResult.value[0]?.total || 0) : 0,
      totalLikes: totalLikesResult.status === 'fulfilled' ? (totalLikesResult.value[0]?.total || 0) : 0,
      topPerforming: topPerforming.status === 'fulfilled' ? topPerforming.value : [],
      audioByType: audioByType.status === 'fulfilled' ? audioByType.value : [],
      period,
      lastUpdated: new Date().toISOString()
    };
    
    // Calculate additional metrics
    analytics.engagementRate = analytics.totalPlays > 0 
      ? ((analytics.totalLikes / analytics.totalPlays) * 100).toFixed(2) 
      : 0;
    
    analytics.avgPlaysPerAudio = analytics.publishedAudio > 0 
      ? Math.round(analytics.totalPlays / analytics.publishedAudio) 
      : 0;
    
    analytics.conversionRate = analytics.totalViews > 0 
      ? ((analytics.totalPlays / analytics.totalViews) * 100).toFixed(2) 
      : 0;
    
    successResponse(res, analytics);
  } catch (error) {
    console.error('Error in getAudioAnalytics:', error);
    // Return safe fallback data instead of failing
    successResponse(res, {
      totalAudio: 0,
      publishedAudio: 0,
      totalPlays: 0,
      totalViews: 0,
      totalLikes: 0,
      topPerforming: [],
      audioByType: [],
      engagementRate: 0,
      avgPlaysPerAudio: 0,
      conversionRate: 0,
      period: req.query.period || 'week',
      lastUpdated: new Date().toISOString(),
      error: error.message
    });
  }
};

// ============================================
// IMPROVED: Bulk upload with Cloudinary support
// ============================================
export const bulkUploadAudio = async (req, res, next) => {
  try {
    const { audios, uploadToCloudinary = false } = req.body;
    
    if (!audios || !Array.isArray(audios) || audios.length === 0) {
      return errorResponse(res, 'Please provide an array of audio objects', 400);
    }
    
    const results = {
      successful: [],
      failed: [],
      totalProcessed: 0,
      totalSuccessful: 0,
      totalFailed: 0
    };
    
    // Process each audio item
    for (let i = 0; i < audios.length; i++) {
      const audioData = audios[i];
      results.totalProcessed++;
      
      try {
        // Validate required fields
        if (!audioData.title || !audioData.title.trim()) {
          throw new Error('Title is required');
        }
        if (!audioData.type || !VALID_AUDIO_TYPES.includes(audioData.type)) {
          throw new Error(`Invalid audio type. Must be one of: ${VALID_AUDIO_TYPES.join(', ')}`);
        }
        
        // Handle Cloudinary upload if file data is provided
        let finalAudioUrl = audioData.audioUrl;
        let finalThumbnail = audioData.thumbnail;
        let finalCoverImage = audioData.coverImage;
        
        // If audio file data is provided (base64 or file path), upload to Cloudinary
        if (uploadToCloudinary && audioData.audioFileData) {
          try {
            const uploadResult = await cloudinary.uploader.upload(audioData.audioFileData, {
              resource_type: 'video',
              folder: 'zauqapp/audio',
              public_id: `${Date.now()}_${slugify(audioData.title, { lower: true, strict: true })}`
            });
            finalAudioUrl = uploadResult.secure_url;
          } catch (cloudinaryError) {
            console.error(`Cloudinary upload failed for ${audioData.title}:`, cloudinaryError);
            throw new Error(`Cloudinary upload failed: ${cloudinaryError.message}`);
          }
        }
        
        // Generate slug if not provided
        let slug = audioData.slug;
        if (!slug) {
          slug = slugify(audioData.title, { lower: true, strict: true });
          
          // Check for duplicate slug and add suffix if needed
          let existingAudio = await Audio.findOne({ slug });
          let counter = 1;
          while (existingAudio) {
            slug = `${slugify(audioData.title, { lower: true, strict: true })}-${counter}`;
            existingAudio = await Audio.findOne({ slug });
            counter++;
          }
        }
        
        // Prepare audio data for creation
        const newAudioData = {
          title: audioData.title.trim(),
          slug,
          description: audioData.description || '',
          type: audioData.type,
          language: audioData.language || 'urdu',
          author: audioData.author || null,
          category: audioData.category || null,
          audioUrl: finalAudioUrl,
          thumbnail: finalThumbnail || audioData.thumbnail || '',
          coverImage: finalCoverImage || audioData.coverImage || '',
          duration: audioData.duration ? parseInt(audioData.duration) : null,
          tags: audioData.tags || [],
          transcript: audioData.transcript || '',
          occasion: audioData.occasion || 'general',
          isPremium: audioData.isPremium || false,
          isPublished: audioData.isPublished !== false,
          isFeatured: audioData.isFeatured || false,
          stats: {
            views: 0,
            plays: 0,
            likes: 0,
            bookmarks: 0,
            totalListeningTime: 0
          }
        };
        
        // Validate occasion
        if (newAudioData.occasion && !VALID_OCCASIONS.includes(newAudioData.occasion)) {
          newAudioData.occasion = 'general';
        }
        
        const audio = await Audio.create(newAudioData);
        
        const populatedAudio = await Audio.findById(audio._id)
          .populate('author', 'name slug')
          .populate('category', 'name');
        
        results.successful.push({
          id: audio._id,
          title: audio.title,
          slug: audio.slug,
          type: audio.type
        });
        results.totalSuccessful++;
        
      } catch (error) {
        results.failed.push({
          index: i,
          data: { title: audioData.title, type: audioData.type },
          error: error.message
        });
        results.totalFailed++;
      }
    }
    
    const message = `Bulk upload completed: ${results.totalSuccessful} successful, ${results.totalFailed} failed`;
    
    successResponse(res, results, message);
  } catch (error) {
    console.error('Error in bulkUploadAudio:', error);
    next(error);
  }
};

// Bulk upload with local file processing
export const bulkUploadWithFiles = async (req, res, next) => {
  try {
    const files = req.files;
    const metadata = JSON.parse(req.body.metadata || '[]');
    
    if (!files || files.length === 0) {
      return errorResponse(res, 'No files uploaded', 400);
    }
    
    const results = {
      successful: [],
      failed: [],
      totalProcessed: 0,
      totalSuccessful: 0,
      totalFailed: 0
    };
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const meta = metadata[i] || {};
      results.totalProcessed++;
      
      try {
        // Upload to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(file.path, {
          resource_type: 'video',
          folder: 'zauqapp/audio',
          public_id: `${Date.now()}_${slugify(meta.title || file.originalname, { lower: true, strict: true })}`
        });
        
        // Generate slug
        let slug = slugify(meta.title || file.originalname, { lower: true, strict: true });
        let existingAudio = await Audio.findOne({ slug });
        let counter = 1;
        while (existingAudio) {
          slug = `${slugify(meta.title || file.originalname, { lower: true, strict: true })}-${counter}`;
          existingAudio = await Audio.findOne({ slug });
          counter++;
        }
        
        // Create audio record
        const audioData = {
          title: meta.title || file.originalname.replace(/\.[^/.]+$/, ''),
          slug,
          description: meta.description || '',
          type: meta.type || 'other',
          language: meta.language || 'urdu',
          author: meta.author || null,
          category: meta.category || null,
          audioUrl: uploadResult.secure_url,
          thumbnail: meta.thumbnail || '',
          coverImage: meta.coverImage || '',
          duration: meta.duration || null,
          tags: meta.tags || [],
          occasion: meta.occasion || 'general',
          isPremium: meta.isPremium || false,
          isPublished: meta.isPublished !== false,
          isFeatured: meta.isFeatured || false
        };
        
        const audio = await Audio.create(audioData);
        
        results.successful.push({
          id: audio._id,
          title: audio.title,
          filename: file.originalname
        });
        results.totalSuccessful++;
        
        // Delete local file after upload
        fs.unlinkSync(file.path);
        
      } catch (error) {
        console.error(`Error processing file ${file.originalname}:`, error);
        results.failed.push({
          filename: file.originalname,
          error: error.message
        });
        results.totalFailed++;
        
        // Clean up local file on error
        try {
          if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
        } catch (unlinkError) {
          console.error('Error deleting file:', unlinkError);
        }
      }
    }
    
    successResponse(res, results, `Bulk upload completed: ${results.totalSuccessful} successful`);
  } catch (error) {
    console.error('Error in bulkUploadWithFiles:', error);
    next(error);
  }
};

export const updateAudioMetadata = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const audio = await Audio.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).populate('author', 'name slug avatar');
    
    if (!audio) {
      return errorResponse(res, 'Audio not found', 404);
    }
    
    successResponse(res, audio, 'Audio metadata updated successfully');
  } catch (error) {
    console.error('Error in updateAudioMetadata:', error);
    next(error);
  }
};