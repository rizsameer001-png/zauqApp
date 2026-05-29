// //server/controllers/author.controller.js

// import Author from '../models/Author.js';
// import Poem from '../models/Poem.js';
// import Book from '../models/Book.js';
// import Audio from '../models/Audio.js';
// import Video from '../models/Video.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination, getSort, getFilters } from '../utils/pagination.js';

// export const getAuthors = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);
//     const sort = getSort(req, 'name');
//     const filters = getFilters(req, ['era', 'category', 'language']);

//     const authors = await Author.find(filters)
//       .sort(sort)
//       .skip(skip)
//       .limit(limit);

//     const total = await Author.countDocuments(filters);
//     paginatedResponse(res, authors, { page, limit, total });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getAuthorBySlug = async (req, res, next) => {
//   try {
//     const author = await Author.findOne({ slug: req.params.slug })
//       .populate('relatedAuthors', 'name slug avatar');

//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }

//     author.stats.views += 1;
//     await author.save();

//     let isFollowing = false;
//     if (req.user) {
//       isFollowing = author.followers.includes(req.user.id);
//     }

//     successResponse(res, { ...author.toObject(), isFollowing });
//   } catch (error) {
//     next(error);
//   }
// };

// export const createAuthor = async (req, res, next) => {
//   try {
//     const author = await Author.create(req.body);
//     successResponse(res, author, 'Author created', 201);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateAuthor = async (req, res, next) => {
//   try {
//     const author = await Author.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );
//     successResponse(res, author, 'Author updated');
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteAuthor = async (req, res, next) => {
//   try {
//     await Author.findByIdAndDelete(req.params.id);
//     successResponse(res, null, 'Author deleted');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getAuthorPoems = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);

//     const poems = await Poem.find({ author: req.params.authorId, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     const total = await Poem.countDocuments({ author: req.params.authorId, isPublished: true });
//     paginatedResponse(res, poems, { page, limit, total });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getAuthorBooks = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);

//     const books = await Book.find({ author: req.params.authorId, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     const total = await Book.countDocuments({ author: req.params.authorId, isPublished: true });
//     paginatedResponse(res, books, { page, limit, total });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getAuthorAudio = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);

//     const audio = await Audio.find({ author: req.params.authorId, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     const total = await Audio.countDocuments({ author: req.params.authorId, isPublished: true });
//     paginatedResponse(res, audio, { page, limit, total });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getAuthorVideos = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);

//     const videos = await Video.find({ author: req.params.authorId, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     const total = await Video.countDocuments({ author: req.params.authorId, isPublished: true });
//     paginatedResponse(res, videos, { page, limit, total });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getTrendingAuthors = async (req, res, next) => {
//   try {
//     const authors = await Author.find()
//       .sort({ 'stats.views': -1, 'stats.followers': -1 })
//       .limit(20);

//     successResponse(res, authors);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getFeaturedAuthors = async (req, res, next) => {
//   try {
//     const authors = await Author.find({ isFeatured: true })
//       .sort({ createdAt: -1 })
//       .limit(10);

//     successResponse(res, authors);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getAuthorTimeline = async (req, res, next) => {
//   try {
//     const author = await Author.findById(req.params.authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
//     successResponse(res, author.timeline || []);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getAuthorGallery = async (req, res, next) => {
//   try {
//     const author = await Author.findById(req.params.authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
//     successResponse(res, author.gallery || []);
//   } catch (error) {
//     next(error);
//   }
// };









// // server/controllers/author.controller.js
// import Author from '../models/Author.js';
// import Poem from '../models/Poem.js';
// import Book from '../models/Book.js';
// import Audio from '../models/Audio.js';
// import Video from '../models/Video.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination, getSort, getFilters } from '../utils/pagination.js';
// import slugify from 'slugify';

// export const getAuthors = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);
//     const sort = getSort(req, 'name');
//     const filters = getFilters(req, ['era', 'category', 'language']);

//     const authors = await Author.find(filters)
//       .sort(sort)
//       .skip(skip)
//       .limit(limit);

//     const total = await Author.countDocuments(filters);
//     paginatedResponse(res, authors, { page, limit, total });
//   } catch (error) {
//     console.error('Error in getAuthors:', error);
//     next(error);
//   }
// };

// export const getAuthorBySlug = async (req, res, next) => {
//   try {
//     const author = await Author.findOne({ slug: req.params.slug })
//       .populate('relatedAuthors', 'name slug avatar');

//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }

//     author.stats.views += 1;
//     await author.save();

//     let isFollowing = false;
//     if (req.user) {
//       isFollowing = author.followers.includes(req.user.id);
//     }

//     successResponse(res, { ...author.toObject(), isFollowing });
//   } catch (error) {
//     console.error('Error in getAuthorBySlug:', error);
//     next(error);
//   }
// };

// export const createAuthor = async (req, res, next) => {
//   try {
//     console.log('Creating author with data:', JSON.stringify(req.body, null, 2));
    
//     const { name, slug } = req.body;
    
//     if (!name || !name.trim()) {
//       return errorResponse(res, 'Name is required', 400);
//     }
    
//     const authorData = { ...req.body };
    
//     // Handle slug
//     if (slug && slug.trim()) {
//       authorData.slug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     }
    
//     const author = await Author.create(authorData);
    
//     successResponse(res, author, 'Author created successfully', 201);
//   } catch (error) {
//     console.error('Error creating author:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
//     }
    
//     if (error.code === 11000) {
//       return errorResponse(res, 'An author with this slug already exists. Please use a different slug.', 400);
//     }
    
//     next(error);
//   }
// };

// export const updateAuthor = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     console.log('Updating author with ID:', id);
    
//     const author = await Author.findById(id);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     let updateData = { ...req.body };
    
//     // Handle slug update
//     if (req.body.slug && req.body.slug !== author.slug) {
//       const cleanSlug = req.body.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
//       const existingAuthor = await Author.findOne({ slug: cleanSlug, _id: { $ne: id } });
//       if (existingAuthor) {
//         return errorResponse(res, 'Slug already exists. Please use a different slug.', 400);
//       }
//       updateData.slug = cleanSlug;
//     }
    
//     const updatedAuthor = await Author.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true, runValidators: true }
//     );
    
//     successResponse(res, updatedAuthor, 'Author updated successfully');
//   } catch (error) {
//     console.error('Error updating author:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
//     }
    
//     next(error);
//   }
// };

// export const deleteAuthor = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     console.log('Deleting author with ID:', id);
    
//     const author = await Author.findById(id);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     // Optional: Also delete or reassign associated content
//     await Author.findByIdAndDelete(id);
    
//     successResponse(res, null, 'Author deleted successfully');
//   } catch (error) {
//     console.error('Error deleting author:', error);
//     next(error);
//   }
// };

// // ============================================
// // AUTHOR CONTENT MANAGEMENT
// // ============================================

// export const getAuthorPoems = async (req, res, next) => {
//   try {
//     const { authorId } = req.params;
//     const { page, limit, skip } = getPagination(req);
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }

//     const poems = await Poem.find({ author: authorId, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     const total = await Poem.countDocuments({ author: authorId, isPublished: true });
//     paginatedResponse(res, poems, { page, limit, total });
//   } catch (error) {
//     console.error('Error in getAuthorPoems:', error);
//     next(error);
//   }
// };

// export const getAuthorBooks = async (req, res, next) => {
//   try {
//     const { authorId } = req.params;
//     const { page, limit, skip } = getPagination(req);
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }

//     const books = await Book.find({ author: authorId, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     const total = await Book.countDocuments({ author: authorId, isPublished: true });
//     paginatedResponse(res, books, { page, limit, total });
//   } catch (error) {
//     console.error('Error in getAuthorBooks:', error);
//     next(error);
//   }
// };

// export const getAuthorAudio = async (req, res, next) => {
//   try {
//     const { authorId } = req.params;
//     const { page, limit, skip } = getPagination(req);
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }

//     const audio = await Audio.find({ author: authorId, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     const total = await Audio.countDocuments({ author: authorId, isPublished: true });
//     paginatedResponse(res, audio, { page, limit, total });
//   } catch (error) {
//     console.error('Error in getAuthorAudio:', error);
//     next(error);
//   }
// };

// export const getAuthorVideos = async (req, res, next) => {
//   try {
//     const { authorId } = req.params;
//     const { page, limit, skip } = getPagination(req);
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }

//     const videos = await Video.find({ author: authorId, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     const total = await Video.countDocuments({ author: authorId, isPublished: true });
//     paginatedResponse(res, videos, { page, limit, total });
//   } catch (error) {
//     console.error('Error in getAuthorVideos:', error);
//     next(error);
//   }
// };

// // ============================================
// // AUTHOR STATS & FEATURED
// // ============================================

// export const getTrendingAuthors = async (req, res, next) => {
//   try {
//     const authors = await Author.find()
//       .sort({ 'stats.views': -1, 'stats.followers': -1 })
//       .limit(20);

//     successResponse(res, authors);
//   } catch (error) {
//     console.error('Error in getTrendingAuthors:', error);
//     next(error);
//   }
// };

// export const getFeaturedAuthors = async (req, res, next) => {
//   try {
//     const authors = await Author.find({ isFeatured: true })
//       .sort({ createdAt: -1 })
//       .limit(10);

//     successResponse(res, authors);
//   } catch (error) {
//     console.error('Error in getFeaturedAuthors:', error);
//     next(error);
//   }
// };

// // ============================================
// // TIMELINE MANAGEMENT
// // ============================================

// export const getAuthorTimeline = async (req, res, next) => {
//   try {
//     const { authorId } = req.params;
//     const author = await Author.findById(authorId);
    
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     successResponse(res, author.timeline || []);
//   } catch (error) {
//     console.error('Error in getAuthorTimeline:', error);
//     next(error);
//   }
// };

// export const addToTimeline = async (req, res, next) => {
//   try {
//     const { authorId } = req.params;
//     const { year, event, description } = req.body;
    
//     if (!year || !event) {
//       return errorResponse(res, 'Year and event are required', 400);
//     }
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     author.timeline = author.timeline || [];
//     author.timeline.push({ year, event, description });
//     await author.save();
    
//     successResponse(res, author.timeline, 'Timeline entry added successfully');
//   } catch (error) {
//     console.error('Error in addToTimeline:', error);
//     next(error);
//   }
// };

// export const updateTimelineEntry = async (req, res, next) => {
//   try {
//     const { authorId, timelineId } = req.params;
//     const { year, event, description } = req.body;
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     const timelineEntry = author.timeline.id(timelineId);
//     if (!timelineEntry) {
//       return errorResponse(res, 'Timeline entry not found', 404);
//     }
    
//     if (year) timelineEntry.year = year;
//     if (event) timelineEntry.event = event;
//     if (description !== undefined) timelineEntry.description = description;
    
//     await author.save();
    
//     successResponse(res, author.timeline, 'Timeline entry updated successfully');
//   } catch (error) {
//     console.error('Error in updateTimelineEntry:', error);
//     next(error);
//   }
// };

// export const removeFromTimeline = async (req, res, next) => {
//   try {
//     const { authorId, timelineId } = req.params;
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     author.timeline = author.timeline.filter(item => item._id.toString() !== timelineId);
//     await author.save();
    
//     successResponse(res, author.timeline, 'Timeline entry removed successfully');
//   } catch (error) {
//     console.error('Error in removeFromTimeline:', error);
//     next(error);
//   }
// };

// // ============================================
// // GALLERY MANAGEMENT
// // ============================================

// export const getAuthorGallery = async (req, res, next) => {
//   try {
//     const { authorId } = req.params;
//     const author = await Author.findById(authorId);
    
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     successResponse(res, author.gallery || []);
//   } catch (error) {
//     console.error('Error in getAuthorGallery:', error);
//     next(error);
//   }
// };

// export const addToGallery = async (req, res, next) => {
//   try {
//     const { authorId } = req.params;
//     const { url, caption } = req.body;
    
//     if (!url) {
//       return errorResponse(res, 'Image URL is required', 400);
//     }
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     author.gallery = author.gallery || [];
//     author.gallery.push({ url, caption: caption || '' });
//     await author.save();
    
//     successResponse(res, author.gallery, 'Gallery image added successfully');
//   } catch (error) {
//     console.error('Error in addToGallery:', error);
//     next(error);
//   }
// };

// export const updateGalleryImage = async (req, res, next) => {
//   try {
//     const { authorId, imageId } = req.params;
//     const { url, caption } = req.body;
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     const galleryImage = author.gallery.id(imageId);
//     if (!galleryImage) {
//       return errorResponse(res, 'Gallery image not found', 404);
//     }
    
//     if (url) galleryImage.url = url;
//     if (caption !== undefined) galleryImage.caption = caption;
    
//     await author.save();
    
//     successResponse(res, author.gallery, 'Gallery image updated successfully');
//   } catch (error) {
//     console.error('Error in updateGalleryImage:', error);
//     next(error);
//   }
// };

// export const removeFromGallery = async (req, res, next) => {
//   try {
//     const { authorId, imageId } = req.params;
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     author.gallery = author.gallery.filter(item => item._id.toString() !== imageId);
//     await author.save();
    
//     successResponse(res, author.gallery, 'Gallery image removed successfully');
//   } catch (error) {
//     console.error('Error in removeFromGallery:', error);
//     next(error);
//   }
// };

// // ============================================
// // FOLLOW/UNFOLLOW AUTHOR
// // ============================================

// export const followAuthor = async (req, res, next) => {
//   try {
//     const { authorId } = req.params;
//     const userId = req.user.id;
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     if (!author.followers.includes(userId)) {
//       author.followers.push(userId);
//       author.stats.followers = author.followers.length;
//       await author.save();
//     }
    
//     successResponse(res, { followed: true, followersCount: author.stats.followers }, 'Author followed');
//   } catch (error) {
//     console.error('Error in followAuthor:', error);
//     next(error);
//   }
// };

// export const unfollowAuthor = async (req, res, next) => {
//   try {
//     const { authorId } = req.params;
//     const userId = req.user.id;
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     author.followers = author.followers.filter(id => id.toString() !== userId);
//     author.stats.followers = author.followers.length;
//     await author.save();
    
//     successResponse(res, { followed: false, followersCount: author.stats.followers }, 'Author unfollowed');
//   } catch (error) {
//     console.error('Error in unfollowAuthor:', error);
//     next(error);
//   }
// };

// // ============================================
// // AUTHOR STATISTICS
// // ============================================

// export const getAuthorStats = async (req, res, next) => {
//   try {
//     const { authorId } = req.params;
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     const [poemsCount, booksCount, audioCount, videosCount] = await Promise.all([
//       Poem.countDocuments({ author: authorId, isPublished: true }),
//       Book.countDocuments({ author: authorId, isPublished: true }),
//       Audio.countDocuments({ author: authorId, isPublished: true }),
//       Video.countDocuments({ author: authorId, isPublished: true })
//     ]);
    
//     successResponse(res, {
//       poemsCount,
//       booksCount,
//       audioCount,
//       videosCount,
//       followersCount: author.stats.followers || 0,
//       viewsCount: author.stats.views || 0
//     });
//   } catch (error) {
//     console.error('Error in getAuthorStats:', error);
//     next(error);
//   }
// };























// // server/controllers/author.controller.js
// import Author from '../models/Author.js';
// import Poem from '../models/Poem.js';
// import Book from '../models/Book.js';
// import Audio from '../models/Audio.js';
// import Video from '../models/Video.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination, getSort, getFilters } from '../utils/pagination.js';
// import slugify from 'slugify';

// export const getAuthors = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);
//     const sort = getSort(req, 'name');
//     const filters = getFilters(req, ['era', 'category', 'language']);

//     const authors = await Author.find(filters)
//       .sort(sort)
//       .skip(skip)
//       .limit(limit);

//     const total = await Author.countDocuments(filters);
//     paginatedResponse(res, authors, { page, limit, total });
//   } catch (error) {
//     console.error('Error in getAuthors:', error);
//     next(error);
//   }
// };

// export const getAuthorBySlug = async (req, res, next) => {
//   try {
//     const author = await Author.findOne({ slug: req.params.slug })
//       .populate('relatedAuthors', 'name slug avatar');

//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }

//     author.stats.views += 1;
//     await author.save();

//     let isFollowing = false;
//     if (req.user) {
//       isFollowing = author.followers.includes(req.user.id);
//     }

//     successResponse(res, { ...author.toObject(), isFollowing });
//   } catch (error) {
//     console.error('Error in getAuthorBySlug:', error);
//     next(error);
//   }
// };

// export const createAuthor = async (req, res, next) => {
//   try {
//     console.log('Creating author with data:', JSON.stringify(req.body, null, 2));
    
//     const { name, slug } = req.body;
    
//     if (!name || !name.trim()) {
//       return errorResponse(res, 'Name is required', 400);
//     }
    
//     const authorData = { ...req.body };
    
//     // Handle slug
//     if (slug && slug.trim()) {
//       authorData.slug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     }
    
//     const author = await Author.create(authorData);
    
//     successResponse(res, author, 'Author created successfully', 201);
//   } catch (error) {
//     console.error('Error creating author:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
//     }
    
//     if (error.code === 11000) {
//       return errorResponse(res, 'An author with this slug already exists. Please use a different slug.', 400);
//     }
    
//     next(error);
//   }
// };

// export const updateAuthor = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     console.log('Updating author with ID:', id);
    
//     const author = await Author.findById(id);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     let updateData = { ...req.body };
    
//     // Handle slug update
//     if (req.body.slug && req.body.slug !== author.slug) {
//       const cleanSlug = req.body.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
//       const existingAuthor = await Author.findOne({ slug: cleanSlug, _id: { $ne: id } });
//       if (existingAuthor) {
//         return errorResponse(res, 'Slug already exists. Please use a different slug.', 400);
//       }
//       updateData.slug = cleanSlug;
//     }
    
//     const updatedAuthor = await Author.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true, runValidators: true }
//     );
    
//     successResponse(res, updatedAuthor, 'Author updated successfully');
//   } catch (error) {
//     console.error('Error updating author:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
//     }
    
//     next(error);
//   }
// };

// export const deleteAuthor = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     console.log('Deleting author with ID:', id);
    
//     const author = await Author.findById(id);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     await Author.findByIdAndDelete(id);
    
//     successResponse(res, null, 'Author deleted successfully');
//   } catch (error) {
//     console.error('Error deleting author:', error);
//     next(error);
//   }
// };

// // ============================================
// // AUTHOR CONTENT MANAGEMENT
// // ============================================

// export const getAuthorPoems = async (req, res, next) => {
//   try {
//     const { authorId } = req.params;
//     const { page, limit, skip } = getPagination(req);
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }

//     const poems = await Poem.find({ author: authorId, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     const total = await Poem.countDocuments({ author: authorId, isPublished: true });
//     paginatedResponse(res, poems, { page, limit, total });
//   } catch (error) {
//     console.error('Error in getAuthorPoems:', error);
//     next(error);
//   }
// };

// export const getAuthorBooks = async (req, res, next) => {
//   try {
//     const { authorId } = req.params;
//     const { page, limit, skip } = getPagination(req);
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }

//     const books = await Book.find({ author: authorId, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     const total = await Book.countDocuments({ author: authorId, isPublished: true });
//     paginatedResponse(res, books, { page, limit, total });
//   } catch (error) {
//     console.error('Error in getAuthorBooks:', error);
//     next(error);
//   }
// };

// export const getAuthorAudio = async (req, res, next) => {
//   try {
//     const { authorId } = req.params;
//     const { page, limit, skip } = getPagination(req);
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }

//     const audio = await Audio.find({ author: authorId, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     const total = await Audio.countDocuments({ author: authorId, isPublished: true });
//     paginatedResponse(res, audio, { page, limit, total });
//   } catch (error) {
//     console.error('Error in getAuthorAudio:', error);
//     next(error);
//   }
// };

// export const getAuthorVideos = async (req, res, next) => {
//   try {
//     const { authorId } = req.params;
//     const { page, limit, skip } = getPagination(req);
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }

//     const videos = await Video.find({ author: authorId, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     const total = await Video.countDocuments({ author: authorId, isPublished: true });
//     paginatedResponse(res, videos, { page, limit, total });
//   } catch (error) {
//     console.error('Error in getAuthorVideos:', error);
//     next(error);
//   }
// };

// // ============================================
// // AUTHOR STATS & FEATURED
// // ============================================

// export const getTrendingAuthors = async (req, res, next) => {
//   try {
//     const authors = await Author.find()
//       .sort({ 'stats.views': -1, 'stats.followers': -1 })
//       .limit(20);

//     successResponse(res, authors);
//   } catch (error) {
//     console.error('Error in getTrendingAuthors:', error);
//     next(error);
//   }
// };

// export const getFeaturedAuthors = async (req, res, next) => {
//   try {
//     const authors = await Author.find({ isFeatured: true })
//       .sort({ createdAt: -1 })
//       .limit(10);

//     successResponse(res, authors);
//   } catch (error) {
//     console.error('Error in getFeaturedAuthors:', error);
//     next(error);
//   }
// };

// // ============================================
// // TIMELINE MANAGEMENT
// // ============================================

// export const getAuthorTimeline = async (req, res, next) => {
//   try {
//     const { authorId } = req.params;
//     const author = await Author.findById(authorId);
    
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     successResponse(res, author.timeline || []);
//   } catch (error) {
//     console.error('Error in getAuthorTimeline:', error);
//     next(error);
//   }
// };

// export const addToTimeline = async (req, res, next) => {
//   try {
//     const { authorId } = req.params;
//     const { year, event, description } = req.body;
    
//     if (!year || !event) {
//       return errorResponse(res, 'Year and event are required', 400);
//     }
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     author.timeline = author.timeline || [];
//     author.timeline.push({ year, event, description });
//     await author.save();
    
//     successResponse(res, author.timeline, 'Timeline entry added successfully');
//   } catch (error) {
//     console.error('Error in addToTimeline:', error);
//     next(error);
//   }
// };

// export const updateTimelineEntry = async (req, res, next) => {
//   try {
//     const { authorId, timelineId } = req.params;
//     const { year, event, description } = req.body;
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     const timelineEntry = author.timeline.id(timelineId);
//     if (!timelineEntry) {
//       return errorResponse(res, 'Timeline entry not found', 404);
//     }
    
//     if (year) timelineEntry.year = year;
//     if (event) timelineEntry.event = event;
//     if (description !== undefined) timelineEntry.description = description;
    
//     await author.save();
    
//     successResponse(res, author.timeline, 'Timeline entry updated successfully');
//   } catch (error) {
//     console.error('Error in updateTimelineEntry:', error);
//     next(error);
//   }
// };

// export const removeFromTimeline = async (req, res, next) => {
//   try {
//     const { authorId, timelineId } = req.params;
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     author.timeline = author.timeline.filter(item => item._id.toString() !== timelineId);
//     await author.save();
    
//     successResponse(res, author.timeline, 'Timeline entry removed successfully');
//   } catch (error) {
//     console.error('Error in removeFromTimeline:', error);
//     next(error);
//   }
// };

// // ============================================
// // GALLERY MANAGEMENT
// // ============================================

// export const getAuthorGallery = async (req, res, next) => {
//   try {
//     const { authorId } = req.params;
//     const author = await Author.findById(authorId);
    
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     successResponse(res, author.gallery || []);
//   } catch (error) {
//     console.error('Error in getAuthorGallery:', error);
//     next(error);
//   }
// };

// export const addToGallery = async (req, res, next) => {
//   try {
//     const { authorId } = req.params;
//     const { url, caption } = req.body;
    
//     if (!url) {
//       return errorResponse(res, 'Image URL is required', 400);
//     }
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     author.gallery = author.gallery || [];
//     author.gallery.push({ url, caption: caption || '' });
//     await author.save();
    
//     successResponse(res, author.gallery, 'Gallery image added successfully');
//   } catch (error) {
//     console.error('Error in addToGallery:', error);
//     next(error);
//   }
// };

// export const updateGalleryImage = async (req, res, next) => {
//   try {
//     const { authorId, imageId } = req.params;
//     const { url, caption } = req.body;
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     const galleryImage = author.gallery.id(imageId);
//     if (!galleryImage) {
//       return errorResponse(res, 'Gallery image not found', 404);
//     }
    
//     if (url) galleryImage.url = url;
//     if (caption !== undefined) galleryImage.caption = caption;
    
//     await author.save();
    
//     successResponse(res, author.gallery, 'Gallery image updated successfully');
//   } catch (error) {
//     console.error('Error in updateGalleryImage:', error);
//     next(error);
//   }
// };

// export const removeFromGallery = async (req, res, next) => {
//   try {
//     const { authorId, imageId } = req.params;
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     author.gallery = author.gallery.filter(item => item._id.toString() !== imageId);
//     await author.save();
    
//     successResponse(res, author.gallery, 'Gallery image removed successfully');
//   } catch (error) {
//     console.error('Error in removeFromGallery:', error);
//     next(error);
//   }
// };

// // ============================================
// // FOLLOW/UNFOLLOW AUTHOR
// // ============================================

// export const followAuthor = async (req, res, next) => {
//   try {
//     const { authorId } = req.params;
//     const userId = req.user.id;
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     if (!author.followers.includes(userId)) {
//       author.followers.push(userId);
//       author.stats.followers = author.followers.length;
//       await author.save();
//     }
    
//     successResponse(res, { followed: true, followersCount: author.stats.followers }, 'Author followed');
//   } catch (error) {
//     console.error('Error in followAuthor:', error);
//     next(error);
//   }
// };

// export const unfollowAuthor = async (req, res, next) => {
//   try {
//     const { authorId } = req.params;
//     const userId = req.user.id;
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     author.followers = author.followers.filter(id => id.toString() !== userId);
//     author.stats.followers = author.followers.length;
//     await author.save();
    
//     successResponse(res, { followed: false, followersCount: author.stats.followers }, 'Author unfollowed');
//   } catch (error) {
//     console.error('Error in unfollowAuthor:', error);
//     next(error);
//   }
// };

// // ============================================
// // AUTHOR STATISTICS
// // ============================================

// export const getAuthorStats = async (req, res, next) => {
//   try {
//     const { authorId } = req.params;
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     const [poemsCount, booksCount, audioCount, videosCount] = await Promise.all([
//       Poem.countDocuments({ author: authorId, isPublished: true }),
//       Book.countDocuments({ author: authorId, isPublished: true }),
//       Audio.countDocuments({ author: authorId, isPublished: true }),
//       Video.countDocuments({ author: authorId, isPublished: true })
//     ]);
    
//     successResponse(res, {
//       poemsCount,
//       booksCount,
//       audioCount,
//       videosCount,
//       followersCount: author.stats.followers || 0,
//       viewsCount: author.stats.views || 0
//     });
//   } catch (error) {
//     console.error('Error in getAuthorStats:', error);
//     next(error);
//   }
// };

// // ============================================
// // SEARCH AUTHORS
// // ============================================

// export const searchAuthors = async (req, res, next) => {
//   try {
//     const { q, limit = 20 } = req.query;
    
//     if (!q || q.length < 2) {
//       return successResponse(res, [], 'No search query provided');
//     }
    
//     const authors = await Author.find(
//       { $text: { $search: q } },
//       { score: { $meta: 'textScore' } }
//     )
//       .sort({ score: { $meta: 'textScore' } })
//       .limit(parseInt(limit));
    
//     successResponse(res, authors);
//   } catch (error) {
//     console.error('Error in searchAuthors:', error);
//     next(error);
//   }
// };

// // ============================================
// // QUOTES MANAGEMENT
// // ============================================

// export const getAuthorQuotes = async (req, res, next) => {
//   try {
//     const { authorId } = req.params;
//     const author = await Author.findById(authorId);
    
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     successResponse(res, author.quotes || []);
//   } catch (error) {
//     console.error('Error in getAuthorQuotes:', error);
//     next(error);
//   }
// };

// export const addQuote = async (req, res, next) => {
//   try {
//     const { authorId } = req.params;
//     const { text, source } = req.body;
    
//     if (!text) {
//       return errorResponse(res, 'Quote text is required', 400);
//     }
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     author.quotes = author.quotes || [];
//     author.quotes.push({ text, source: source || '' });
//     await author.save();
    
//     successResponse(res, author.quotes, 'Quote added successfully');
//   } catch (error) {
//     console.error('Error in addQuote:', error);
//     next(error);
//   }
// };

// export const updateQuote = async (req, res, next) => {
//   try {
//     const { authorId, quoteId } = req.params;
//     const { text, source } = req.body;
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     const quote = author.quotes.id(quoteId);
//     if (!quote) {
//       return errorResponse(res, 'Quote not found', 404);
//     }
    
//     if (text) quote.text = text;
//     if (source !== undefined) quote.source = source;
    
//     await author.save();
    
//     successResponse(res, author.quotes, 'Quote updated successfully');
//   } catch (error) {
//     console.error('Error in updateQuote:', error);
//     next(error);
//   }
// };

// export const removeQuote = async (req, res, next) => {
//   try {
//     const { authorId, quoteId } = req.params;
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     author.quotes = author.quotes.filter(q => q._id.toString() !== quoteId);
//     await author.save();
    
//     successResponse(res, author.quotes, 'Quote removed successfully');
//   } catch (error) {
//     console.error('Error in removeQuote:', error);
//     next(error);
//   }
// };

// // ============================================
// // RELATED AUTHORS MANAGEMENT
// // ============================================

// export const getRelatedAuthors = async (req, res, next) => {
//   try {
//     const { authorId } = req.params;
//     const author = await Author.findById(authorId).populate('relatedAuthors', 'name slug avatar bio era');
    
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     successResponse(res, author.relatedAuthors || []);
//   } catch (error) {
//     console.error('Error in getRelatedAuthors:', error);
//     next(error);
//   }
// };

// export const addRelatedAuthor = async (req, res, next) => {
//   try {
//     const { authorId } = req.params;
//     const { relatedAuthorId } = req.body;
    
//     if (!relatedAuthorId) {
//       return errorResponse(res, 'Related author ID is required', 400);
//     }
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     const relatedAuthor = await Author.findById(relatedAuthorId);
//     if (!relatedAuthor) {
//       return errorResponse(res, 'Related author not found', 404);
//     }
    
//     if (authorId === relatedAuthorId) {
//       return errorResponse(res, 'Cannot add self as related author', 400);
//     }
    
//     if (!author.relatedAuthors.includes(relatedAuthorId)) {
//       author.relatedAuthors.push(relatedAuthorId);
//       await author.save();
//     }
    
//     successResponse(res, author.relatedAuthors, 'Related author added successfully');
//   } catch (error) {
//     console.error('Error in addRelatedAuthor:', error);
//     next(error);
//   }
// };

// export const removeRelatedAuthor = async (req, res, next) => {
//   try {
//     const { authorId, relatedAuthorId } = req.params;
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     author.relatedAuthors = author.relatedAuthors.filter(id => id.toString() !== relatedAuthorId);
//     await author.save();
    
//     successResponse(res, author.relatedAuthors, 'Related author removed successfully');
//   } catch (error) {
//     console.error('Error in removeRelatedAuthor:', error);
//     next(error);
//   }
// };

// // ============================================
// // SOCIAL LINKS MANAGEMENT
// // ============================================

// export const updateSocialLinks = async (req, res, next) => {
//   try {
//     const { authorId } = req.params;
//     const { website, twitter, facebook, instagram, youtube, wikipedia } = req.body;
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     author.socialLinks = {
//       website: website || author.socialLinks?.website,
//       twitter: twitter || author.socialLinks?.twitter,
//       facebook: facebook || author.socialLinks?.facebook,
//       instagram: instagram || author.socialLinks?.instagram,
//       youtube: youtube || author.socialLinks?.youtube,
//       wikipedia: wikipedia || author.socialLinks?.wikipedia
//     };
    
//     await author.save();
    
//     successResponse(res, author.socialLinks, 'Social links updated successfully');
//   } catch (error) {
//     console.error('Error in updateSocialLinks:', error);
//     next(error);
//   }
// };











// server/controllers/author.controller.js
import Author from '../models/Author.js';
import Poem from '../models/Poem.js';
import Book from '../models/Book.js';
import Audio from '../models/Audio.js';
import Video from '../models/Video.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
import { getPagination, getSort, getFilters } from '../utils/pagination.js';
import slugify from 'slugify';

export const getAuthors = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const sort = getSort(req, 'name');
    const filters = getFilters(req, ['era', 'category', 'language']);

    const authors = await Author.find(filters)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Author.countDocuments(filters);
    paginatedResponse(res, authors, { page, limit, total });
  } catch (error) {
    console.error('Error in getAuthors:', error);
    next(error);
  }
};

export const getAuthorBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const author = await Author.findOne({ slug })
      .populate('relatedAuthors', 'name slug avatar');

    if (!author) {
      return errorResponse(res, 'Author not found', 404);
    }

    author.stats.views += 1;
    await author.save();

    let isFollowing = false;
    if (req.user) {
      isFollowing = author.followers.includes(req.user.id);
    }

    successResponse(res, { ...author.toObject(), isFollowing });
  } catch (error) {
    console.error('Error in getAuthorBySlug:', error);
    next(error);
  }
};

export const createAuthor = async (req, res, next) => {
  try {
    console.log('Creating author with data:', JSON.stringify(req.body, null, 2));
    
    const { name, slug } = req.body;
    
    if (!name || !name.trim()) {
      return errorResponse(res, 'Name is required', 400);
    }
    
    const authorData = { ...req.body };
    
    if (slug && slug.trim()) {
      authorData.slug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
    }
    
    const author = await Author.create(authorData);
    
    successResponse(res, author, 'Author created successfully', 201);
  } catch (error) {
    console.error('Error creating author:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
    }
    
    if (error.code === 11000) {
      return errorResponse(res, 'An author with this slug already exists. Please use a different slug.', 400);
    }
    
    next(error);
  }
};

export const updateAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('Updating author with ID:', id);
    
    const author = await Author.findById(id);
    if (!author) {
      return errorResponse(res, 'Author not found', 404);
    }
    
    let updateData = { ...req.body };
    
    if (req.body.slug && req.body.slug !== author.slug) {
      const cleanSlug = req.body.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
      const existingAuthor = await Author.findOne({ slug: cleanSlug, _id: { $ne: id } });
      if (existingAuthor) {
        return errorResponse(res, 'Slug already exists. Please use a different slug.', 400);
      }
      updateData.slug = cleanSlug;
    }
    
    const updatedAuthor = await Author.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    successResponse(res, updatedAuthor, 'Author updated successfully');
  } catch (error) {
    console.error('Error updating author:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
    }
    
    next(error);
  }
};

export const deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('Deleting author with ID:', id);
    
    const author = await Author.findById(id);
    if (!author) {
      return errorResponse(res, 'Author not found', 404);
    }
    
    await Author.findByIdAndDelete(id);
    
    successResponse(res, null, 'Author deleted successfully');
  } catch (error) {
    console.error('Error deleting author:', error);
    next(error);
  }
};

// ============================================
// AUTHOR CONTENT MANAGEMENT (Using SLUG for public routes)
// ============================================

export const getAuthorPoems = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { page, limit, skip } = getPagination(req);
    
    const author = await Author.findOne({ slug });
    if (!author) {
      return errorResponse(res, 'Author not found', 404);
    }

    const poems = await Poem.find({ author: author._id, isPublished: true })
      .populate('author', 'name slug avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Poem.countDocuments({ author: author._id, isPublished: true });
    paginatedResponse(res, poems, { page, limit, total });
  } catch (error) {
    console.error('Error in getAuthorPoems:', error);
    next(error);
  }
};

export const getAuthorBooks = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { page, limit, skip } = getPagination(req);
    
    const author = await Author.findOne({ slug });
    if (!author) {
      return errorResponse(res, 'Author not found', 404);
    }

    const books = await Book.find({ author: author._id, isPublished: true })
      .populate('author', 'name slug avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Book.countDocuments({ author: author._id, isPublished: true });
    paginatedResponse(res, books, { page, limit, total });
  } catch (error) {
    console.error('Error in getAuthorBooks:', error);
    next(error);
  }
};

export const getAuthorAudio = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { page, limit, skip } = getPagination(req);
    
    const author = await Author.findOne({ slug });
    if (!author) {
      return errorResponse(res, 'Author not found', 404);
    }

    const audio = await Audio.find({ author: author._id, isPublished: true })
      .populate('author', 'name slug avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Audio.countDocuments({ author: author._id, isPublished: true });
    paginatedResponse(res, audio, { page, limit, total });
  } catch (error) {
    console.error('Error in getAuthorAudio:', error);
    next(error);
  }
};

export const getAuthorVideos = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { page, limit, skip } = getPagination(req);
    
    const author = await Author.findOne({ slug });
    if (!author) {
      return errorResponse(res, 'Author not found', 404);
    }

    const videos = await Video.find({ author: author._id, isPublished: true })
      .populate('author', 'name slug avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Video.countDocuments({ author: author._id, isPublished: true });
    paginatedResponse(res, videos, { page, limit, total });
  } catch (error) {
    console.error('Error in getAuthorVideos:', error);
    next(error);
  }
};

// ============================================
// AUTHOR STATS & FEATURED
// ============================================

export const getTrendingAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find()
      .sort({ 'stats.views': -1, 'stats.followers': -1 })
      .limit(20);

    successResponse(res, authors);
  } catch (error) {
    console.error('Error in getTrendingAuthors:', error);
    next(error);
  }
};

export const getFeaturedAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find({ isFeatured: true })
      .sort({ createdAt: -1 })
      .limit(10);

    successResponse(res, authors);
  } catch (error) {
    console.error('Error in getFeaturedAuthors:', error);
    next(error);
  }
};

// ============================================
// TIMELINE MANAGEMENT (Using ID for admin routes)
// ============================================

export const getAuthorTimeline = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const author = await Author.findOne({ slug });
    
    if (!author) {
      return errorResponse(res, 'Author not found', 404);
    }
    
    successResponse(res, author.timeline || []);
  } catch (error) {
    console.error('Error in getAuthorTimeline:', error);
    next(error);
  }
};

export const addToTimeline = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { year, event, description } = req.body;
    
    if (!year || !event) {
      return errorResponse(res, 'Year and event are required', 400);
    }
    
    const author = await Author.findById(id);
    if (!author) {
      return errorResponse(res, 'Author not found', 404);
    }
    
    author.timeline = author.timeline || [];
    author.timeline.push({ year, event, description });
    await author.save();
    
    successResponse(res, author.timeline, 'Timeline entry added successfully');
  } catch (error) {
    console.error('Error in addToTimeline:', error);
    next(error);
  }
};

export const updateTimelineEntry = async (req, res, next) => {
  try {
    const { id, timelineId } = req.params;
    const { year, event, description } = req.body;
    
    const author = await Author.findById(id);
    if (!author) {
      return errorResponse(res, 'Author not found', 404);
    }
    
    const timelineEntry = author.timeline.id(timelineId);
    if (!timelineEntry) {
      return errorResponse(res, 'Timeline entry not found', 404);
    }
    
    if (year) timelineEntry.year = year;
    if (event) timelineEntry.event = event;
    if (description !== undefined) timelineEntry.description = description;
    
    await author.save();
    
    successResponse(res, author.timeline, 'Timeline entry updated successfully');
  } catch (error) {
    console.error('Error in updateTimelineEntry:', error);
    next(error);
  }
};

export const removeFromTimeline = async (req, res, next) => {
  try {
    const { id, timelineId } = req.params;
    
    const author = await Author.findById(id);
    if (!author) {
      return errorResponse(res, 'Author not found', 404);
    }
    
    author.timeline = author.timeline.filter(item => item._id.toString() !== timelineId);
    await author.save();
    
    successResponse(res, author.timeline, 'Timeline entry removed successfully');
  } catch (error) {
    console.error('Error in removeFromTimeline:', error);
    next(error);
  }
};

// ============================================
// GALLERY MANAGEMENT (Using ID for admin routes)
// ============================================

export const getAuthorGallery = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const author = await Author.findOne({ slug });
    
    if (!author) {
      return errorResponse(res, 'Author not found', 404);
    }
    
    successResponse(res, author.gallery || []);
  } catch (error) {
    console.error('Error in getAuthorGallery:', error);
    next(error);
  }
};

export const addToGallery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { url, caption } = req.body;
    
    if (!url) {
      return errorResponse(res, 'Image URL is required', 400);
    }
    
    const author = await Author.findById(id);
    if (!author) {
      return errorResponse(res, 'Author not found', 404);
    }
    
    author.gallery = author.gallery || [];
    author.gallery.push({ url, caption: caption || '' });
    await author.save();
    
    successResponse(res, author.gallery, 'Gallery image added successfully');
  } catch (error) {
    console.error('Error in addToGallery:', error);
    next(error);
  }
};

export const updateGalleryImage = async (req, res, next) => {
  try {
    const { id, imageId } = req.params;
    const { url, caption } = req.body;
    
    const author = await Author.findById(id);
    if (!author) {
      return errorResponse(res, 'Author not found', 404);
    }
    
    const galleryImage = author.gallery.id(imageId);
    if (!galleryImage) {
      return errorResponse(res, 'Gallery image not found', 404);
    }
    
    if (url) galleryImage.url = url;
    if (caption !== undefined) galleryImage.caption = caption;
    
    await author.save();
    
    successResponse(res, author.gallery, 'Gallery image updated successfully');
  } catch (error) {
    console.error('Error in updateGalleryImage:', error);
    next(error);
  }
};

export const removeFromGallery = async (req, res, next) => {
  try {
    const { id, imageId } = req.params;
    
    const author = await Author.findById(id);
    if (!author) {
      return errorResponse(res, 'Author not found', 404);
    }
    
    author.gallery = author.gallery.filter(item => item._id.toString() !== imageId);
    await author.save();
    
    successResponse(res, author.gallery, 'Gallery image removed successfully');
  } catch (error) {
    console.error('Error in removeFromGallery:', error);
    next(error);
  }
};

// ============================================
// FOLLOW/UNFOLLOW AUTHOR
// ============================================

export const followAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const author = await Author.findById(id);
    if (!author) {
      return errorResponse(res, 'Author not found', 404);
    }
    
    if (!author.followers.includes(userId)) {
      author.followers.push(userId);
      author.stats.followers = author.followers.length;
      await author.save();
    }
    
    successResponse(res, { followed: true, followersCount: author.stats.followers }, 'Author followed');
  } catch (error) {
    console.error('Error in followAuthor:', error);
    next(error);
  }
};

export const unfollowAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const author = await Author.findById(id);
    if (!author) {
      return errorResponse(res, 'Author not found', 404);
    }
    
    author.followers = author.followers.filter(fid => fid.toString() !== userId);
    author.stats.followers = author.followers.length;
    await author.save();
    
    successResponse(res, { followed: false, followersCount: author.stats.followers }, 'Author unfollowed');
  } catch (error) {
    console.error('Error in unfollowAuthor:', error);
    next(error);
  }
};

// ============================================
// AUTHOR STATISTICS (Using SLUG)
// ============================================

export const getAuthorStats = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    const author = await Author.findOne({ slug });
    if (!author) {
      return errorResponse(res, 'Author not found', 404);
    }
    
    const [poemsCount, booksCount, audioCount, videosCount] = await Promise.all([
      Poem.countDocuments({ author: author._id, isPublished: true }),
      Book.countDocuments({ author: author._id, isPublished: true }),
      Audio.countDocuments({ author: author._id, isPublished: true }),
      Video.countDocuments({ author: author._id, isPublished: true })
    ]);
    
    successResponse(res, {
      poemsCount,
      booksCount,
      audioCount,
      videosCount,
      followersCount: author.stats?.followers || 0,
      viewsCount: author.stats?.views || 0,
      timelineCount: author.timeline?.length || 0,
      galleryCount: author.gallery?.length || 0,
      quotesCount: author.quotes?.length || 0
    });
  } catch (error) {
    console.error('Error in getAuthorStats:', error);
    next(error);
  }
};

// ============================================
// SEARCH AUTHORS
// ============================================

export const searchAuthors = async (req, res, next) => {
  try {
    const { q, limit = 20 } = req.query;
    
    if (!q || q.length < 2) {
      return successResponse(res, [], 'No search query provided');
    }
    
    const authors = await Author.find(
      { $text: { $search: q } },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .limit(parseInt(limit));
    
    successResponse(res, authors);
  } catch (error) {
    console.error('Error in searchAuthors:', error);
    next(error);
  }
};

// ============================================
// QUOTES MANAGEMENT (Using ID for admin routes)
// ============================================

export const getAuthorQuotes = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const author = await Author.findOne({ slug });
    
    if (!author) {
      return errorResponse(res, 'Author not found', 404);
    }
    
    successResponse(res, author.quotes || []);
  } catch (error) {
    console.error('Error in getAuthorQuotes:', error);
    next(error);
  }
};

export const addQuote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text, source } = req.body;
    
    if (!text) {
      return errorResponse(res, 'Quote text is required', 400);
    }
    
    const author = await Author.findById(id);
    if (!author) {
      return errorResponse(res, 'Author not found', 404);
    }
    
    author.quotes = author.quotes || [];
    author.quotes.push({ text, source: source || '' });
    await author.save();
    
    successResponse(res, author.quotes, 'Quote added successfully');
  } catch (error) {
    console.error('Error in addQuote:', error);
    next(error);
  }
};

export const updateQuote = async (req, res, next) => {
  try {
    const { id, quoteId } = req.params;
    const { text, source } = req.body;
    
    const author = await Author.findById(id);
    if (!author) {
      return errorResponse(res, 'Author not found', 404);
    }
    
    const quote = author.quotes.id(quoteId);
    if (!quote) {
      return errorResponse(res, 'Quote not found', 404);
    }
    
    if (text) quote.text = text;
    if (source !== undefined) quote.source = source;
    
    await author.save();
    
    successResponse(res, author.quotes, 'Quote updated successfully');
  } catch (error) {
    console.error('Error in updateQuote:', error);
    next(error);
  }
};

export const removeQuote = async (req, res, next) => {
  try {
    const { id, quoteId } = req.params;
    
    const author = await Author.findById(id);
    if (!author) {
      return errorResponse(res, 'Author not found', 404);
    }
    
    author.quotes = author.quotes.filter(q => q._id.toString() !== quoteId);
    await author.save();
    
    successResponse(res, author.quotes, 'Quote removed successfully');
  } catch (error) {
    console.error('Error in removeQuote:', error);
    next(error);
  }
};

// ============================================
// RELATED AUTHORS MANAGEMENT
// ============================================

export const getRelatedAuthors = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const author = await Author.findOne({ slug }).populate('relatedAuthors', 'name slug avatar bio era');
    
    if (!author) {
      return errorResponse(res, 'Author not found', 404);
    }
    
    successResponse(res, author.relatedAuthors || []);
  } catch (error) {
    console.error('Error in getRelatedAuthors:', error);
    next(error);
  }
};

export const addRelatedAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { relatedAuthorId } = req.body;
    
    if (!relatedAuthorId) {
      return errorResponse(res, 'Related author ID is required', 400);
    }
    
    const author = await Author.findById(id);
    if (!author) {
      return errorResponse(res, 'Author not found', 404);
    }
    
    const relatedAuthor = await Author.findById(relatedAuthorId);
    if (!relatedAuthor) {
      return errorResponse(res, 'Related author not found', 404);
    }
    
    if (id === relatedAuthorId) {
      return errorResponse(res, 'Cannot add self as related author', 400);
    }
    
    if (!author.relatedAuthors.includes(relatedAuthorId)) {
      author.relatedAuthors.push(relatedAuthorId);
      await author.save();
    }
    
    successResponse(res, author.relatedAuthors, 'Related author added successfully');
  } catch (error) {
    console.error('Error in addRelatedAuthor:', error);
    next(error);
  }
};

export const removeRelatedAuthor = async (req, res, next) => {
  try {
    const { id, relatedAuthorId } = req.params;
    
    const author = await Author.findById(id);
    if (!author) {
      return errorResponse(res, 'Author not found', 404);
    }
    
    author.relatedAuthors = author.relatedAuthors.filter(rid => rid.toString() !== relatedAuthorId);
    await author.save();
    
    successResponse(res, author.relatedAuthors, 'Related author removed successfully');
  } catch (error) {
    console.error('Error in removeRelatedAuthor:', error);
    next(error);
  }
};

// ============================================
// SOCIAL LINKS MANAGEMENT (Using ID for admin routes)
// ============================================

export const updateSocialLinks = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { website, twitter, facebook, instagram, youtube, wikipedia } = req.body;
    
    const author = await Author.findById(id);
    if (!author) {
      return errorResponse(res, 'Author not found', 404);
    }
    
    author.socialLinks = {
      website: website || author.socialLinks?.website,
      twitter: twitter || author.socialLinks?.twitter,
      facebook: facebook || author.socialLinks?.facebook,
      instagram: instagram || author.socialLinks?.instagram,
      youtube: youtube || author.socialLinks?.youtube,
      wikipedia: wikipedia || author.socialLinks?.wikipedia
    };
    
    await author.save();
    
    successResponse(res, author.socialLinks, 'Social links updated successfully');
  } catch (error) {
    console.error('Error in updateSocialLinks:', error);
    next(error);
  }
};