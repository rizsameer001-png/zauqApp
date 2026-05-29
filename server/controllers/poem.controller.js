// import Poem from '../models/Poem.js';
// import Author from '../models/Author.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination, getSort, getFilters } from '../utils/pagination.js';
// import { generatePoemExplanation } from '../utils/aiService.js';
// import { cacheDelete } from '../config/redis.js';

// export const getPoems = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);
//     const sort = getSort(req);
//     const filters = getFilters(req, ['genre', 'language', 'mood', 'era', 'author']);
//     filters.isPublished = true;

//     const poems = await Poem.find(filters)
//       .populate('author', 'name slug avatar')
//       .populate('category', 'name slug')
//       .sort(sort)
//       .skip(skip)
//       .limit(limit);

//     const total = await Poem.countDocuments(filters);
//     paginatedResponse(res, poems, { page, limit, total });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getPoemBySlug = async (req, res, next) => {
//   try {
//     const poem = await Poem.findOne({ slug: req.params.slug, isPublished: true })
//       .populate('author', 'name slug avatar bio')
//       .populate('category', 'name slug');

//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     // Increment views
//     poem.stats.views += 1;
//     await poem.save();

//     // Check if user has liked/bookmarked
//     let userInteraction = {};
//     if (req.user) {
//       userInteraction = {
//         isLiked: poem.likedBy.includes(req.user.id),
//         isBookmarked: poem.bookmarkedBy.includes(req.user.id)
//       };
//     }

//     successResponse(res, { ...poem.toObject(), userInteraction });
//   } catch (error) {
//     next(error);
//   }
// };

// export const createPoem = async (req, res, next) => {
//   try {
//     const poem = await Poem.create({
//       ...req.body,
//       createdBy: req.user.id
//     });

//     await cacheDelete('cache:/api/poems:*');
//     successResponse(res, poem, 'Poem created successfully', 201);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updatePoem = async (req, res, next) => {
//   try {
//     const poem = await Poem.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     await cacheDelete('cache:/api/poems:*');
//     successResponse(res, poem, 'Poem updated successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const deletePoem = async (req, res, next) => {
//   try {
//     await Poem.findByIdAndDelete(req.params.id);
//     await cacheDelete('cache:/api/poems:*');
//     successResponse(res, null, 'Poem deleted successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const likePoem = async (req, res, next) => {
//   try {
//     const poem = await Poem.findById(req.params.id);
//     const userId = req.user.id;

//     if (poem.likedBy.includes(userId)) {
//       poem.likedBy.pull(userId);
//       poem.stats.likes -= 1;
//     } else {
//       poem.likedBy.push(userId);
//       poem.stats.likes += 1;
//     }

//     await poem.save();
//     successResponse(res, { liked: !poem.likedBy.includes(userId), likes: poem.stats.likes });
//   } catch (error) {
//     next(error);
//   }
// };

// export const bookmarkPoem = async (req, res, next) => {
//   try {
//     const poem = await Poem.findById(req.params.id);
//     const userId = req.user.id;

//     if (poem.bookmarkedBy.includes(userId)) {
//       poem.bookmarkedBy.pull(userId);
//       poem.stats.bookmarks -= 1;
//     } else {
//       poem.bookmarkedBy.push(userId);
//       poem.stats.bookmarks += 1;
//     }

//     await poem.save();
//     successResponse(res, { bookmarked: poem.bookmarkedBy.includes(userId), bookmarks: poem.stats.bookmarks });
//   } catch (error) {
//     next(error);
//   }
// };

// export const addComment = async (req, res, next) => {
//   try {
//     const poem = await Poem.findById(req.params.id);
//     poem.comments.push({
//       user: req.user.id,
//       text: req.body.text
//     });
//     poem.stats.comments += 1;
//     await poem.save();

//     successResponse(res, poem.comments, 'Comment added');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getFeaturedPoems = async (req, res, next) => {
//   try {
//     const poems = await Poem.find({ isFeatured: true, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ featuredAt: -1 })
//       .limit(10);

//     successResponse(res, poems);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getTrendingPoems = async (req, res, next) => {
//   try {
//     const poems = await Poem.find({ isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ 'stats.views': -1, 'stats.likes': -1 })
//       .limit(20);

//     successResponse(res, poems);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getPoemsByAuthor = async (req, res, next) => {
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

// export const getAIExplanation = async (req, res, next) => {
//   try {
//     const poem = await Poem.findOne({ slug: req.params.slug });

//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     // Check if explanation already exists and is fresh
//     if (poem.aiExplanation && poem.aiExplanation.generatedAt) {
//       const hoursSince = (Date.now() - poem.aiExplanation.generatedAt) / (1000 * 60 * 60);
//       if (hoursSince < 24) {
//         return successResponse(res, poem.aiExplanation);
//       }
//     }

//     // Generate new explanation
//     const explanation = await generatePoemExplanation(poem);
//     poem.aiExplanation = explanation;
//     await poem.save();

//     successResponse(res, explanation);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getRelatedPoems = async (req, res, next) => {
//   try {
//     const poem = await Poem.findOne({ slug: req.params.slug });

//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     const related = await Poem.find({
//       _id: { $ne: poem._id },
//       $or: [
//         { author: poem.author },
//         { genre: poem.genre },
//         { tags: { $in: poem.tags } }
//       ],
//       isPublished: true
//     })
//       .populate('author', 'name slug avatar')
//       .limit(6);

//     successResponse(res, related);
//   } catch (error) {
//     next(error);
//   }
// };






// // server/controllers/poem.controller.js
// import Poem from '../models/Poem.js';
// import Author from '../models/Author.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination, getSort, getFilters } from '../utils/pagination.js';
// import { generatePoemExplanation } from '../utils/aiService.js';
// import { cacheDelete } from '../config/redis.js';

// export const getPoems = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);
//     const sort = getSort(req);
//     const filters = getFilters(req, ['genre', 'language', 'mood', 'era', 'author']);
//     filters.isPublished = true;

//     const poems = await Poem.find(filters)
//       .populate('author', 'name slug avatar')
//       .populate('category', 'name slug')
//       .sort(sort)
//       .skip(skip)
//       .limit(limit);

//     const total = await Poem.countDocuments(filters);
//     paginatedResponse(res, poems, { page, limit, total });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getPoemBySlug = async (req, res, next) => {
//   try {
//     const poem = await Poem.findOne({ slug: req.params.slug, isPublished: true })
//       .populate('author', 'name slug avatar bio')
//       .populate('category', 'name slug');

//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     poem.stats.views += 1;
//     await poem.save();

//     let userInteraction = {};
//     if (req.user) {
//       userInteraction = {
//         isLiked: poem.likedBy.includes(req.user.id),
//         isBookmarked: poem.bookmarkedBy.includes(req.user.id)
//       };
//     }

//     successResponse(res, { ...poem.toObject(), userInteraction });
//   } catch (error) {
//     next(error);
//   }
// };

// export const createPoem = async (req, res, next) => {
//   try {
//     console.log('Creating poem with data:', JSON.stringify(req.body, null, 2));
    
//     // Validate required fields
//     const { title, content, author, genre } = req.body;
//     if (!title || !content || !author || !genre) {
//       return errorResponse(res, 'Missing required fields: title, content, author, genre', 400);
//     }

//     // Ensure language is lowercase
//     const poemData = {
//       ...req.body,
//       language: (req.body.language || 'urdu').toLowerCase(),
//       createdBy: req.user.id
//     };

//     const poem = await Poem.create(poemData);
    
//     await cacheDelete('cache:/api/poems:*');
//     successResponse(res, poem, 'Poem created successfully', 201);
//   } catch (error) {
//     console.error('Error creating poem:', error);
    
//     // Handle validation errors
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
//     }
    
//     // Handle duplicate key errors
//     if (error.code === 11000) {
//       return errorResponse(res, 'A poem with this slug already exists', 400);
//     }
    
//     next(error);
//   }
// };

// export const updatePoem = async (req, res, next) => {
//   try {
//     console.log('Updating poem with data:', JSON.stringify(req.body, null, 2));
    
//     // Ensure language is lowercase if provided
//     if (req.body.language) {
//       req.body.language = req.body.language.toLowerCase();
//     }

//     const poem = await Poem.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     await cacheDelete('cache:/api/poems:*');
//     successResponse(res, poem, 'Poem updated successfully');
//   } catch (error) {
//     console.error('Error updating poem:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
//     }
    
//     next(error);
//   }
// };

// export const deletePoem = async (req, res, next) => {
//   try {
//     const poem = await Poem.findByIdAndDelete(req.params.id);
    
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     await cacheDelete('cache:/api/poems:*');
//     successResponse(res, null, 'Poem deleted successfully');
//   } catch (error) {
//     console.error('Error deleting poem:', error);
//     next(error);
//   }
// };

// export const likePoem = async (req, res, next) => {
//   try {
//     const poem = await Poem.findById(req.params.id);
//     const userId = req.user.id;

//     if (poem.likedBy.includes(userId)) {
//       poem.likedBy.pull(userId);
//       poem.stats.likes -= 1;
//     } else {
//       poem.likedBy.push(userId);
//       poem.stats.likes += 1;
//     }

//     await poem.save();
//     successResponse(res, { liked: !poem.likedBy.includes(userId), likes: poem.stats.likes });
//   } catch (error) {
//     next(error);
//   }
// };

// export const bookmarkPoem = async (req, res, next) => {
//   try {
//     const poem = await Poem.findById(req.params.id);
//     const userId = req.user.id;

//     if (poem.bookmarkedBy.includes(userId)) {
//       poem.bookmarkedBy.pull(userId);
//       poem.stats.bookmarks -= 1;
//     } else {
//       poem.bookmarkedBy.push(userId);
//       poem.stats.bookmarks += 1;
//     }

//     await poem.save();
//     successResponse(res, { bookmarked: poem.bookmarkedBy.includes(userId), bookmarks: poem.stats.bookmarks });
//   } catch (error) {
//     next(error);
//   }
// };

// export const addComment = async (req, res, next) => {
//   try {
//     const poem = await Poem.findById(req.params.id);
//     poem.comments.push({
//       user: req.user.id,
//       text: req.body.text
//     });
//     poem.stats.comments += 1;
//     await poem.save();

//     successResponse(res, poem.comments, 'Comment added');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getFeaturedPoems = async (req, res, next) => {
//   try {
//     const poems = await Poem.find({ isFeatured: true, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ featuredAt: -1 })
//       .limit(10);

//     successResponse(res, poems);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getTrendingPoems = async (req, res, next) => {
//   try {
//     const poems = await Poem.find({ isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ 'stats.views': -1, 'stats.likes': -1 })
//       .limit(20);

//     successResponse(res, poems);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getPoemsByAuthor = async (req, res, next) => {
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

// export const getAIExplanation = async (req, res, next) => {
//   try {
//     const poem = await Poem.findOne({ slug: req.params.slug });

//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     if (poem.aiExplanation && poem.aiExplanation.generatedAt) {
//       const hoursSince = (Date.now() - poem.aiExplanation.generatedAt) / (1000 * 60 * 60);
//       if (hoursSince < 24) {
//         return successResponse(res, poem.aiExplanation);
//       }
//     }

//     const explanation = await generatePoemExplanation(poem);
//     poem.aiExplanation = explanation;
//     await poem.save();

//     successResponse(res, explanation);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getRelatedPoems = async (req, res, next) => {
//   try {
//     const poem = await Poem.findOne({ slug: req.params.slug });

//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     const related = await Poem.find({
//       _id: { $ne: poem._id },
//       $or: [
//         { author: poem.author },
//         { genre: poem.genre },
//         { tags: { $in: poem.tags } }
//       ],
//       isPublished: true
//     })
//       .populate('author', 'name slug avatar')
//       .limit(6);

//     successResponse(res, related);
//   } catch (error) {
//     next(error);
//   }
// };






// // server/controllers/poem.controller.js
// import Poem from '../models/Poem.js';
// import Author from '../models/Author.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination, getSort, getFilters } from '../utils/pagination.js';
// import { generatePoemExplanation } from '../utils/aiService.js';
// import { cacheDelete } from '../config/redis.js';

// export const getPoems = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);
//     const sort = getSort(req);
//     const filters = getFilters(req, ['genre', 'language', 'mood', 'era', 'author']);
    
//     // Only show published poems for public, admin can see all
//     if (!req.user || req.user.role !== 'admin') {
//       filters.isPublished = true;
//     }

//     const poems = await Poem.find(filters)
//       .populate('author', 'name slug avatar')
//       .populate('category', 'name slug')
//       .sort(sort)
//       .skip(skip)
//       .limit(limit);

//     const total = await Poem.countDocuments(filters);
//     paginatedResponse(res, poems, { page, limit, total });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getPoemBySlug = async (req, res, next) => {
//   try {
//     const poem = await Poem.findOne({ slug: req.params.slug })
//       .populate('author', 'name slug avatar bio')
//       .populate('category', 'name slug');

//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     // Check if published or admin
//     if (!poem.isPublished && (!req.user || req.user.role !== 'admin')) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     // Increment views
//     poem.stats.views += 1;
//     await poem.save();

//     // Check if user has liked/bookmarked
//     let userInteraction = {};
//     if (req.user) {
//       userInteraction = {
//         isLiked: poem.likedBy.includes(req.user.id),
//         isBookmarked: poem.bookmarkedBy.includes(req.user.id)
//       };
//     }

//     successResponse(res, { ...poem.toObject(), userInteraction });
//   } catch (error) {
//     next(error);
//   }
// };

// export const createPoem = async (req, res, next) => {
//   try {
//     console.log('Creating poem with data:', JSON.stringify(req.body, null, 2));
    
//     // Validate required fields
//     const { title, content, author, genre } = req.body;
//     if (!title || !title.trim()) {
//       return errorResponse(res, 'Title is required', 400);
//     }
//     if (!content || !content.trim()) {
//       return errorResponse(res, 'Content is required', 400);
//     }
//     if (!author) {
//       return errorResponse(res, 'Author is required', 400);
//     }
//     if (!genre) {
//       return errorResponse(res, 'Genre is required', 400);
//     }

//     // Validate author exists
//     const authorExists = await Author.findById(author);
//     if (!authorExists) {
//       return errorResponse(res, 'Author not found', 404);
//     }

//     // Prepare poem data
//     const poemData = {
//       title: title.trim(),
//       content: content.trim(),
//       contentUrdu: req.body.contentUrdu || content.trim(),
//       transliteration: req.body.transliteration || '',
//       translation: {
//         english: req.body.translation?.english || '',
//         hindi: req.body.translation?.hindi || ''
//       },
//       author: author,
//       genre: genre,
//       language: (req.body.language || 'urdu').toLowerCase(),
//       era: req.body.era || 'modern',
//       tags: req.body.tags || [],
//       mood: req.body.mood,
//       isPublished: req.body.isPublished || false,
//       publishedAt: req.body.isPublished ? new Date() : null,
//       isFeatured: req.body.isFeatured || false,
//       createdBy: req.user.id
//     };

//     const poem = await Poem.create(poemData);
    
//     // Update author stats
//     await Author.findByIdAndUpdate(author, {
//       $inc: { 'stats.poemsCount': 1 }
//     });

//     await cacheDelete('cache:/api/poems:*');
//     successResponse(res, poem, 'Poem created successfully', 201);
//   } catch (error) {
//     console.error('Error creating poem:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
//     }
    
//     if (error.code === 11000) {
//       return errorResponse(res, 'A poem with this title already exists', 400);
//     }
    
//     next(error);
//   }
// };

// export const updatePoem = async (req, res, next) => {
//   try {
//     console.log('Updating poem with data:', JSON.stringify(req.body, null, 2));
    
//     const poem = await Poem.findById(req.params.id);
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     // Prepare update data
//     const updateData = {
//       title: req.body.title || poem.title,
//       content: req.body.content || poem.content,
//       contentUrdu: req.body.contentUrdu || poem.contentUrdu,
//       transliteration: req.body.transliteration || poem.transliteration,
//       translation: {
//         english: req.body.translation?.english || poem.translation?.english,
//         hindi: req.body.translation?.hindi || poem.translation?.hindi
//       },
//       author: req.body.author || poem.author,
//       genre: req.body.genre || poem.genre,
//       language: req.body.language ? req.body.language.toLowerCase() : poem.language,
//       era: req.body.era || poem.era,
//       tags: req.body.tags || poem.tags,
//       mood: req.body.mood || poem.mood,
//       isPublished: req.body.isPublished !== undefined ? req.body.isPublished : poem.isPublished,
//       isFeatured: req.body.isFeatured !== undefined ? req.body.isFeatured : poem.isFeatured
//     };

//     // If publishing for first time, set publishedAt
//     if (updateData.isPublished && !poem.isPublished) {
//       updateData.publishedAt = new Date();
//     }

//     const updatedPoem = await Poem.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true, runValidators: true }
//     );

//     await cacheDelete('cache:/api/poems:*');
//     successResponse(res, updatedPoem, 'Poem updated successfully');
//   } catch (error) {
//     console.error('Error updating poem:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
//     }
    
//     next(error);
//   }
// };

// export const deletePoem = async (req, res, next) => {
//   try {
//     const poem = await Poem.findById(req.params.id);
    
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     // Update author stats (decrement poem count)
//     await Author.findByIdAndUpdate(poem.author, {
//       $inc: { 'stats.poemsCount': -1 }
//     });
    
//     await Poem.findByIdAndDelete(req.params.id);
//     await cacheDelete('cache:/api/poems:*');
//     successResponse(res, null, 'Poem deleted successfully');
//   } catch (error) {
//     console.error('Error deleting poem:', error);
//     next(error);
//   }
// };

// export const likePoem = async (req, res, next) => {
//   try {
//     const poem = await Poem.findById(req.params.id);
//     const userId = req.user.id;

//     if (poem.likedBy.includes(userId)) {
//       poem.likedBy.pull(userId);
//       poem.stats.likes -= 1;
//     } else {
//       poem.likedBy.push(userId);
//       poem.stats.likes += 1;
//     }

//     await poem.save();
//     successResponse(res, { liked: poem.likedBy.includes(userId), likes: poem.stats.likes });
//   } catch (error) {
//     next(error);
//   }
// };

// export const bookmarkPoem = async (req, res, next) => {
//   try {
//     const poem = await Poem.findById(req.params.id);
//     const userId = req.user.id;

//     if (poem.bookmarkedBy.includes(userId)) {
//       poem.bookmarkedBy.pull(userId);
//       poem.stats.bookmarks -= 1;
//     } else {
//       poem.bookmarkedBy.push(userId);
//       poem.stats.bookmarks += 1;
//     }

//     await poem.save();
//     successResponse(res, { bookmarked: poem.bookmarkedBy.includes(userId), bookmarks: poem.stats.bookmarks });
//   } catch (error) {
//     next(error);
//   }
// };

// export const addComment = async (req, res, next) => {
//   try {
//     const poem = await Poem.findById(req.params.id);
//     poem.comments.push({
//       user: req.user.id,
//       text: req.body.text
//     });
//     poem.stats.comments += 1;
//     await poem.save();

//     // Populate user info for the new comment
//     await poem.populate('comments.user', 'name avatar');
    
//     successResponse(res, poem.comments, 'Comment added');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getFeaturedPoems = async (req, res, next) => {
//   try {
//     const poems = await Poem.find({ isFeatured: true, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ featuredAt: -1 })
//       .limit(10);

//     successResponse(res, poems);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getTrendingPoems = async (req, res, next) => {
//   try {
//     const poems = await Poem.find({ isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ 'stats.views': -1, 'stats.likes': -1 })
//       .limit(20);

//     successResponse(res, poems);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getPoemsByAuthor = async (req, res, next) => {
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

// export const getAIExplanation = async (req, res, next) => {
//   try {
//     const poem = await Poem.findOne({ slug: req.params.slug });

//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     if (poem.aiExplanation && poem.aiExplanation.generatedAt) {
//       const hoursSince = (Date.now() - poem.aiExplanation.generatedAt) / (1000 * 60 * 60);
//       if (hoursSince < 24) {
//         return successResponse(res, poem.aiExplanation);
//       }
//     }

//     const explanation = await generatePoemExplanation(poem);
//     poem.aiExplanation = explanation;
//     await poem.save();

//     successResponse(res, explanation);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getRelatedPoems = async (req, res, next) => {
//   try {
//     const poem = await Poem.findOne({ slug: req.params.slug });

//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     const related = await Poem.find({
//       _id: { $ne: poem._id },
//       $or: [
//         { author: poem.author },
//         { genre: poem.genre },
//         { tags: { $in: poem.tags } }
//       ],
//       isPublished: true
//     })
//       .populate('author', 'name slug avatar')
//       .limit(6);

//     successResponse(res, related);
//   } catch (error) {
//     next(error);
//   }
// };





// // server/controllers/poem.controller.js
// import Poem from '../models/Poem.js';
// import Author from '../models/Author.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination, getSort, getFilters } from '../utils/pagination.js';
// import { generatePoemExplanation } from '../utils/aiService.js';
// import { cacheDelete } from '../config/redis.js';

// export const getPoems = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);
//     const sort = getSort(req);
//     const filters = getFilters(req, ['genre', 'language', 'mood', 'era', 'author']);
    
//     // Only show published poems for public, admin can see all
//     if (!req.user || req.user.role !== 'admin') {
//       filters.isPublished = true;
//     }

//     const poems = await Poem.find(filters)
//       .populate('author', 'name slug avatar')
//       .populate('category', 'name slug')
//       .sort(sort)
//       .skip(skip)
//       .limit(limit);

//     const total = await Poem.countDocuments(filters);
//     paginatedResponse(res, poems, { page, limit, total });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getPoemBySlug = async (req, res, next) => {
//   try {
//     const poem = await Poem.findOne({ slug: req.params.slug })
//       .populate('author', 'name slug avatar bio')
//       .populate('category', 'name slug');

//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     // Check if published or admin
//     if (!poem.isPublished && (!req.user || req.user.role !== 'admin')) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     // Increment views
//     poem.stats.views += 1;
//     await poem.save();

//     // Check if user has liked/bookmarked
//     let userInteraction = {};
//     if (req.user) {
//       userInteraction = {
//         isLiked: poem.likedBy.includes(req.user.id),
//         isBookmarked: poem.bookmarkedBy.includes(req.user.id)
//       };
//     }

//     successResponse(res, { ...poem.toObject(), userInteraction });
//   } catch (error) {
//     next(error);
//   }
// };

// export const createPoem = async (req, res, next) => {
//   try {
//     console.log('Creating poem with data:', JSON.stringify(req.body, null, 2));
    
//     // Validate required fields
//     const { title, content, author, genre } = req.body;
//     if (!title || !title.trim()) {
//       return errorResponse(res, 'Title is required', 400);
//     }
//     if (!content || !content.trim()) {
//       return errorResponse(res, 'Content is required', 400);
//     }
//     if (!author) {
//       return errorResponse(res, 'Author is required', 400);
//     }
//     if (!genre) {
//       return errorResponse(res, 'Genre is required', 400);
//     }

//     // Validate author exists
//     const authorExists = await Author.findById(author);
//     if (!authorExists) {
//       return errorResponse(res, 'Author not found', 404);
//     }

//     // Prepare poem data
//     const poemData = {
//       title: title.trim(),
//       content: content.trim(),
//       contentUrdu: req.body.contentUrdu || content.trim(),
//       transliteration: req.body.transliteration || '',
//       translation: {
//         english: req.body.translation?.english || '',
//         hindi: req.body.translation?.hindi || ''
//       },
//       author: author,
//       genre: genre,
//       language: (req.body.language || 'urdu').toLowerCase(),
//       era: req.body.era || 'modern',
//       tags: req.body.tags || [],
//       mood: req.body.mood,
//       isPublished: req.body.isPublished || false,
//       publishedAt: req.body.isPublished ? new Date() : null,
//       isFeatured: req.body.isFeatured || false,
//       createdBy: req.user.id
//     };

//     const poem = await Poem.create(poemData);
    
//     // Update author stats
//     await Author.findByIdAndUpdate(author, {
//       $inc: { 'stats.poemsCount': 1 }
//     });

//     await cacheDelete('cache:/api/poems:*');
//     successResponse(res, poem, 'Poem created successfully', 201);
//   } catch (error) {
//     console.error('Error creating poem:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
//     }
    
//     if (error.code === 11000) {
//       return errorResponse(res, 'A poem with this title already exists', 400);
//     }
    
//     next(error);
//   }
// };

// export const updatePoem = async (req, res, next) => {
//   try {
//     console.log('Updating poem with data:', JSON.stringify(req.body, null, 2));
    
//     const poem = await Poem.findById(req.params.id);
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     // Prepare update data
//     const updateData = {
//       title: req.body.title || poem.title,
//       content: req.body.content || poem.content,
//       contentUrdu: req.body.contentUrdu || poem.contentUrdu,
//       transliteration: req.body.transliteration || poem.transliteration,
//       translation: {
//         english: req.body.translation?.english || poem.translation?.english,
//         hindi: req.body.translation?.hindi || poem.translation?.hindi
//       },
//       author: req.body.author || poem.author,
//       genre: req.body.genre || poem.genre,
//       language: req.body.language ? req.body.language.toLowerCase() : poem.language,
//       era: req.body.era || poem.era,
//       tags: req.body.tags || poem.tags,
//       mood: req.body.mood || poem.mood,
//       isPublished: req.body.isPublished !== undefined ? req.body.isPublished : poem.isPublished,
//       isFeatured: req.body.isFeatured !== undefined ? req.body.isFeatured : poem.isFeatured
//     };

//     // If publishing for first time, set publishedAt
//     if (updateData.isPublished && !poem.isPublished) {
//       updateData.publishedAt = new Date();
//     }

//     const updatedPoem = await Poem.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true, runValidators: true }
//     );

//     await cacheDelete('cache:/api/poems:*');
//     successResponse(res, updatedPoem, 'Poem updated successfully');
//   } catch (error) {
//     console.error('Error updating poem:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
//     }
    
//     next(error);
//   }
// };

// export const deletePoem = async (req, res, next) => {
//   try {
//     const poem = await Poem.findById(req.params.id);
    
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     // Update author stats (decrement poem count)
//     await Author.findByIdAndUpdate(poem.author, {
//       $inc: { 'stats.poemsCount': -1 }
//     });
    
//     await Poem.findByIdAndDelete(req.params.id);
//     await cacheDelete('cache:/api/poems:*');
//     successResponse(res, null, 'Poem deleted successfully');
//   } catch (error) {
//     console.error('Error deleting poem:', error);
//     next(error);
//   }
// };

// export const likePoem = async (req, res, next) => {
//   try {
//     const poem = await Poem.findById(req.params.id);
//     const userId = req.user.id;

//     if (poem.likedBy.includes(userId)) {
//       poem.likedBy.pull(userId);
//       poem.stats.likes -= 1;
//     } else {
//       poem.likedBy.push(userId);
//       poem.stats.likes += 1;
//     }

//     await poem.save();
//     successResponse(res, { liked: poem.likedBy.includes(userId), likes: poem.stats.likes });
//   } catch (error) {
//     next(error);
//   }
// };

// export const bookmarkPoem = async (req, res, next) => {
//   try {
//     const poem = await Poem.findById(req.params.id);
//     const userId = req.user.id;

//     if (poem.bookmarkedBy.includes(userId)) {
//       poem.bookmarkedBy.pull(userId);
//       poem.stats.bookmarks -= 1;
//     } else {
//       poem.bookmarkedBy.push(userId);
//       poem.stats.bookmarks += 1;
//     }

//     await poem.save();
//     successResponse(res, { bookmarked: poem.bookmarkedBy.includes(userId), bookmarks: poem.stats.bookmarks });
//   } catch (error) {
//     next(error);
//   }
// };

// export const addComment = async (req, res, next) => {
//   try {
//     const poem = await Poem.findById(req.params.id);
//     poem.comments.push({
//       user: req.user.id,
//       text: req.body.text
//     });
//     poem.stats.comments += 1;
//     await poem.save();

//     // Populate user info for the new comment
//     await poem.populate('comments.user', 'name avatar');
    
//     successResponse(res, poem.comments, 'Comment added');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getFeaturedPoems = async (req, res, next) => {
//   try {
//     const poems = await Poem.find({ isFeatured: true, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ featuredAt: -1 })
//       .limit(10);

//     successResponse(res, poems);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getTrendingPoems = async (req, res, next) => {
//   try {
//     const poems = await Poem.find({ isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ 'stats.views': -1, 'stats.likes': -1 })
//       .limit(20);

//     successResponse(res, poems);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getPoemsByAuthor = async (req, res, next) => {
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

// export const getAIExplanation = async (req, res, next) => {
//   try {
//     const poem = await Poem.findOne({ slug: req.params.slug });

//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     if (poem.aiExplanation && poem.aiExplanation.generatedAt) {
//       const hoursSince = (Date.now() - poem.aiExplanation.generatedAt) / (1000 * 60 * 60);
//       if (hoursSince < 24) {
//         return successResponse(res, poem.aiExplanation);
//       }
//     }

//     const explanation = await generatePoemExplanation(poem);
//     poem.aiExplanation = explanation;
//     await poem.save();

//     successResponse(res, explanation);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getRelatedPoems = async (req, res, next) => {
//   try {
//     const poem = await Poem.findOne({ slug: req.params.slug });

//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     const related = await Poem.find({
//       _id: { $ne: poem._id },
//       $or: [
//         { author: poem.author },
//         { genre: poem.genre },
//         { tags: { $in: poem.tags } }
//       ],
//       isPublished: true
//     })
//       .populate('author', 'name slug avatar')
//       .limit(6);

//     successResponse(res, related);
//   } catch (error) {
//     next(error);
//   }
// };







// // server/controllers/poem.controller.js
// import Poem from '../models/Poem.js';
// import Author from '../models/Author.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination, getSort, getFilters } from '../utils/pagination.js';
// import { generatePoemExplanation } from '../utils/aiService.js';
// import { cacheDelete } from '../config/redis.js';

// export const getPoems = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);
//     const sort = getSort(req);
//     const filters = getFilters(req, ['genre', 'language', 'mood', 'era', 'author']);
    
//     // Only show published poems for public, admin can see all
//     if (!req.user || req.user.role !== 'admin') {
//       filters.isPublished = true;
//     }

//     const poems = await Poem.find(filters)
//       .populate('author', 'name slug avatar bio nameUrdu')  // Added more author fields
//       .populate('category', 'name slug')
//       .sort(sort)
//       .skip(skip)
//       .limit(limit);

//     const total = await Poem.countDocuments(filters);
//     paginatedResponse(res, poems, { page, limit, total });
//   } catch (error) {
//     console.error('Error in getPoems:', error);
//     next(error);
//   }
// };

// export const getPoemBySlug = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     // Validate slug
//     if (!slug) {
//       return errorResponse(res, 'Slug is required', 400);
//     }

//     // Find poem and populate author with all necessary fields
//     const poem = await Poem.findOne({ slug })
//       .populate('author', 'name slug avatar bio nameUrdu nameHindi birthDate deathDate era')
//       .populate('category', 'name slug')
//       .lean(); // Use lean() for better performance

//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     // Check if published or admin
//     if (!poem.isPublished && (!req.user || req.user.role !== 'admin')) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     // Increment views (using update to avoid race conditions)
//     await Poem.updateOne({ _id: poem._id }, { $inc: { 'stats.views': 1 } });
//     poem.stats.views += 1; // Update the local object

//     // Check if user has liked/bookmarked
//     let userInteraction = {};
//     if (req.user) {
//       userInteraction = {
//         isLiked: poem.likedBy?.includes(req.user.id) || false,
//         isBookmarked: poem.bookmarkedBy?.includes(req.user.id) || false
//       };
//     }

//     // Format response with proper author data
//     const responseData = {
//       ...poem,
//       userInteraction,
//       // Ensure author is properly formatted
//       author: poem.author ? {
//         _id: poem.author._id,
//         name: poem.author.name || 'Unknown Author',
//         slug: poem.author.slug || '#',
//         avatar: poem.author.avatar || null,
//         bio: poem.author.bio || null,
//         nameUrdu: poem.author.nameUrdu || null,
//         era: poem.author.era || null
//       } : null,
//       // Format date safely
//       formattedDate: poem.createdAt ? new Date(poem.createdAt).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//       }) : null
//     };

//     // Log for debugging
//     console.log('Poem found:', {
//       id: poem._id,
//       title: poem.title,
//       slug: poem.slug,
//       authorName: poem.author?.name,
//       authorId: poem.author?._id,
//       createdAt: poem.createdAt
//     });

//     successResponse(res, responseData);
//   } catch (error) {
//     console.error('Error in getPoemBySlug:', error);
//     next(error);
//   }
// };

// export const createPoem = async (req, res, next) => {
//   try {
//     console.log('Creating poem with data:', JSON.stringify(req.body, null, 2));
    
//     // Validate required fields
//     const { title, content, author, genre } = req.body;
//     if (!title || !title.trim()) {
//       return errorResponse(res, 'Title is required', 400);
//     }
//     if (!content || !content.trim()) {
//       return errorResponse(res, 'Content is required', 400);
//     }
//     if (!author) {
//       return errorResponse(res, 'Author is required', 400);
//     }
//     if (!genre) {
//       return errorResponse(res, 'Genre is required', 400);
//     }

//     // Validate author exists
//     const authorExists = await Author.findById(author);
//     if (!authorExists) {
//       return errorResponse(res, 'Author not found. Please select a valid author.', 404);
//     }

//     // Prepare poem data
//     const poemData = {
//       title: title.trim(),
//       content: content.trim(),
//       contentUrdu: req.body.contentUrdu || content.trim(),
//       transliteration: req.body.transliteration || '',
//       translation: {
//         english: req.body.translation?.english || '',
//         hindi: req.body.translation?.hindi || ''
//       },
//       author: author,
//       genre: genre,
//       language: (req.body.language || 'urdu').toLowerCase(),
//       era: req.body.era || 'modern',
//       tags: req.body.tags || [],
//       mood: req.body.mood,
//       isPublished: req.body.isPublished || false,
//       publishedAt: req.body.isPublished ? new Date() : null,
//       isFeatured: req.body.isFeatured || false,
//       createdBy: req.user.id
//     };

//     const poem = await Poem.create(poemData);
    
//     // Update author stats
//     await Author.findByIdAndUpdate(author, {
//       $inc: { 'stats.poemsCount': 1 }
//     });

//     // Clear cache
//     await cacheDelete('cache:/api/poems:*');
    
//     // Return the created poem with populated author
//     const populatedPoem = await Poem.findById(poem._id)
//       .populate('author', 'name slug avatar')
//       .lean();
    
//     successResponse(res, populatedPoem, 'Poem created successfully', 201);
//   } catch (error) {
//     console.error('Error creating poem:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
//     }
    
//     if (error.code === 11000) {
//       return errorResponse(res, 'A poem with this title already exists', 400);
//     }
    
//     next(error);
//   }
// };

// export const updatePoem = async (req, res, next) => {
//   try {
//     console.log('Updating poem with data:', JSON.stringify(req.body, null, 2));
    
//     const poem = await Poem.findById(req.params.id);
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     // If author is being changed, validate new author
//     if (req.body.author && req.body.author !== poem.author.toString()) {
//       const authorExists = await Author.findById(req.body.author);
//       if (!authorExists) {
//         return errorResponse(res, 'New author not found', 404);
//       }
      
//       // Update author counts
//       await Author.findByIdAndUpdate(poem.author, { $inc: { 'stats.poemsCount': -1 } });
//       await Author.findByIdAndUpdate(req.body.author, { $inc: { 'stats.poemsCount': 1 } });
//     }

//     // Prepare update data
//     const updateData = {
//       title: req.body.title || poem.title,
//       content: req.body.content || poem.content,
//       contentUrdu: req.body.contentUrdu || poem.contentUrdu,
//       transliteration: req.body.transliteration || poem.transliteration,
//       translation: {
//         english: req.body.translation?.english || poem.translation?.english,
//         hindi: req.body.translation?.hindi || poem.translation?.hindi
//       },
//       author: req.body.author || poem.author,
//       genre: req.body.genre || poem.genre,
//       language: req.body.language ? req.body.language.toLowerCase() : poem.language,
//       era: req.body.era || poem.era,
//       tags: req.body.tags || poem.tags,
//       mood: req.body.mood || poem.mood,
//       isPublished: req.body.isPublished !== undefined ? req.body.isPublished : poem.isPublished,
//       isFeatured: req.body.isFeatured !== undefined ? req.body.isFeatured : poem.isFeatured
//     };

//     // If publishing for first time, set publishedAt
//     if (updateData.isPublished && !poem.isPublished) {
//       updateData.publishedAt = new Date();
//     }

//     const updatedPoem = await Poem.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true, runValidators: true }
//     ).populate('author', 'name slug avatar');

//     await cacheDelete('cache:/api/poems:*');
//     successResponse(res, updatedPoem, 'Poem updated successfully');
//   } catch (error) {
//     console.error('Error updating poem:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
//     }
    
//     next(error);
//   }
// };

// export const deletePoem = async (req, res, next) => {
//   try {
//     const poem = await Poem.findById(req.params.id);
    
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     // Update author stats (decrement poem count)
//     await Author.findByIdAndUpdate(poem.author, {
//       $inc: { 'stats.poemsCount': -1 }
//     });
    
//     await Poem.findByIdAndDelete(req.params.id);
//     await cacheDelete('cache:/api/poems:*');
//     successResponse(res, null, 'Poem deleted successfully');
//   } catch (error) {
//     console.error('Error deleting poem:', error);
//     next(error);
//   }
// };

// export const likePoem = async (req, res, next) => {
//   try {
//     const poem = await Poem.findById(req.params.id);
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     const userId = req.user.id;

//     if (poem.likedBy.includes(userId)) {
//       poem.likedBy.pull(userId);
//       poem.stats.likes -= 1;
//     } else {
//       poem.likedBy.push(userId);
//       poem.stats.likes += 1;
//     }

//     await poem.save();
//     successResponse(res, { liked: poem.likedBy.includes(userId), likes: poem.stats.likes });
//   } catch (error) {
//     console.error('Error in likePoem:', error);
//     next(error);
//   }
// };

// export const bookmarkPoem = async (req, res, next) => {
//   try {
//     const poem = await Poem.findById(req.params.id);
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     const userId = req.user.id;

//     if (poem.bookmarkedBy.includes(userId)) {
//       poem.bookmarkedBy.pull(userId);
//       poem.stats.bookmarks -= 1;
//     } else {
//       poem.bookmarkedBy.push(userId);
//       poem.stats.bookmarks += 1;
//     }

//     await poem.save();
//     successResponse(res, { bookmarked: poem.bookmarkedBy.includes(userId), bookmarks: poem.stats.bookmarks });
//   } catch (error) {
//     console.error('Error in bookmarkPoem:', error);
//     next(error);
//   }
// };

// export const addComment = async (req, res, next) => {
//   try {
//     const poem = await Poem.findById(req.params.id);
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     poem.comments.push({
//       user: req.user.id,
//       text: req.body.text
//     });
//     poem.stats.comments += 1;
//     await poem.save();

//     // Populate user info for the new comment
//     await poem.populate('comments.user', 'name avatar');
    
//     successResponse(res, poem.comments, 'Comment added');
//   } catch (error) {
//     console.error('Error in addComment:', error);
//     next(error);
//   }
// };

// export const getFeaturedPoems = async (req, res, next) => {
//   try {
//     const poems = await Poem.find({ isFeatured: true, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ featuredAt: -1 })
//       .limit(10);

//     successResponse(res, poems);
//   } catch (error) {
//     console.error('Error in getFeaturedPoems:', error);
//     next(error);
//   }
// };

// export const getTrendingPoems = async (req, res, next) => {
//   try {
//     const poems = await Poem.find({ isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ 'stats.views': -1, 'stats.likes': -1 })
//       .limit(20);

//     successResponse(res, poems);
//   } catch (error) {
//     console.error('Error in getTrendingPoems:', error);
//     next(error);
//   }
// };

// export const getPoemsByAuthor = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);
//     const { authorId } = req.params;

//     // Validate author exists
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
//     console.error('Error in getPoemsByAuthor:', error);
//     next(error);
//   }
// };

// export const getAIExplanation = async (req, res, next) => {
//   try {
//     const poem = await Poem.findOne({ slug: req.params.slug });

//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     if (poem.aiExplanation && poem.aiExplanation.generatedAt) {
//       const hoursSince = (Date.now() - poem.aiExplanation.generatedAt) / (1000 * 60 * 60);
//       if (hoursSince < 24) {
//         return successResponse(res, poem.aiExplanation);
//       }
//     }

//     const explanation = await generatePoemExplanation(poem);
//     poem.aiExplanation = explanation;
//     await poem.save();

//     successResponse(res, explanation);
//   } catch (error) {
//     console.error('Error in getAIExplanation:', error);
//     next(error);
//   }
// };

// export const getRelatedPoems = async (req, res, next) => {
//   try {
//     const poem = await Poem.findOne({ slug: req.params.slug });

//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     const related = await Poem.find({
//       _id: { $ne: poem._id },
//       $or: [
//         { author: poem.author },
//         { genre: poem.genre },
//         { tags: { $in: poem.tags } }
//       ],
//       isPublished: true
//     })
//       .populate('author', 'name slug avatar')
//       .limit(6);

//     successResponse(res, related);
//   } catch (error) {
//     console.error('Error in getRelatedPoems:', error);
//     next(error);
//   }
// };










// server/controllers/poem.controller.js
import Poem from '../models/Poem.js';
import Author from '../models/Author.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
import { getPagination, getSort, getFilters } from '../utils/pagination.js';
import { generatePoemExplanation } from '../utils/aiService.js';
import { cacheDelete } from '../config/redis.js';
import slugify from 'slugify';

export const getPoems = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const sort = getSort(req);
    const filters = getFilters(req, ['genre', 'language', 'mood', 'era', 'author']);
    
    // Only show published poems for public, admin can see all
    if (!req.user || req.user.role !== 'admin') {
      filters.isPublished = true;
    }

    const poems = await Poem.find(filters)
      .populate('author', 'name slug avatar bio nameUrdu')
      .populate('category', 'name slug')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Poem.countDocuments(filters);
    paginatedResponse(res, poems, { page, limit, total });
  } catch (error) {
    console.error('Error in getPoems:', error);
    next(error);
  }
};

export const getPoemBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    if (!slug) {
      return errorResponse(res, 'Slug is required', 400);
    }

    const poem = await Poem.findOne({ slug })
      .populate('author', 'name slug avatar bio nameUrdu nameHindi birthDate deathDate era')
      .populate('category', 'name slug')
      .lean();

    if (!poem) {
      return errorResponse(res, 'Poem not found', 404);
    }

    if (!poem.isPublished && (!req.user || req.user.role !== 'admin')) {
      return errorResponse(res, 'Poem not found', 404);
    }

    // Increment views
    await Poem.updateOne({ _id: poem._id }, { $inc: { 'stats.views': 1 } });
    poem.stats.views += 1;

    let userInteraction = {};
    if (req.user) {
      userInteraction = {
        isLiked: poem.likedBy?.includes(req.user.id) || false,
        isBookmarked: poem.bookmarkedBy?.includes(req.user.id) || false
      };
    }

    const responseData = {
      ...poem,
      userInteraction,
      author: poem.author ? {
        _id: poem.author._id,
        name: poem.author.name || 'Unknown Author',
        slug: poem.author.slug || '#',
        avatar: poem.author.avatar || null,
        bio: poem.author.bio || null,
        nameUrdu: poem.author.nameUrdu || null,
        era: poem.author.era || null
      } : null,
      formattedDate: poem.createdAt ? new Date(poem.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) : null
    };

    console.log('Poem found:', {
      id: poem._id,
      title: poem.title,
      slug: poem.slug,
      authorName: poem.author?.name
    });

    successResponse(res, responseData);
  } catch (error) {
    console.error('Error in getPoemBySlug:', error);
    next(error);
  }
};

export const createPoem = async (req, res, next) => {
  try {
    console.log('Creating poem with data:', JSON.stringify(req.body, null, 2));
    
    const { title, content, author, genre, slug } = req.body;
    if (!title || !title.trim()) {
      return errorResponse(res, 'Title is required', 400);
    }
    if (!content || !content.trim()) {
      return errorResponse(res, 'Content is required', 400);
    }
    if (!author) {
      return errorResponse(res, 'Author is required', 400);
    }
    if (!genre) {
      return errorResponse(res, 'Genre is required', 400);
    }

    const authorExists = await Author.findById(author);
    if (!authorExists) {
      return errorResponse(res, 'Author not found. Please select a valid author.', 404);
    }

    const poemData = {
      title: title.trim(),
      content: content.trim(),
      contentUrdu: req.body.contentUrdu || content.trim(),
      transliteration: req.body.transliteration || '',
      translation: {
        english: req.body.translation?.english || '',
        hindi: req.body.translation?.hindi || ''
      },
      author: author,
      genre: genre,
      language: (req.body.language || 'urdu').toLowerCase(),
      era: req.body.era || 'modern',
      tags: req.body.tags || [],
      mood: req.body.mood,
      isPublished: req.body.isPublished || false,
      publishedAt: req.body.isPublished ? new Date() : null,
      isFeatured: req.body.isFeatured || false,
      createdBy: req.user.id
    };
    
    // If slug is provided, use it; otherwise will be auto-generated
    if (slug && slug.trim()) {
      poemData.slug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
    }

    const poem = await Poem.create(poemData);
    
    await Author.findByIdAndUpdate(author, {
      $inc: { 'stats.poemsCount': 1 }
    });

    await cacheDelete('cache:/api/poems:*');
    
    const populatedPoem = await Poem.findById(poem._id)
      .populate('author', 'name slug avatar')
      .lean();
    
    successResponse(res, populatedPoem, 'Poem created successfully', 201);
  } catch (error) {
    console.error('Error creating poem:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
    }
    
    if (error.code === 11000) {
      return errorResponse(res, 'A poem with this slug already exists. Please use a different slug.', 400);
    }
    
    next(error);
  }
};

// ============================================
// FIXED: Update poem by SLUG (not ID)
// ============================================
export const updatePoem = async (req, res, next) => {
  try {
    const { slug } = req.params;
    console.log('Updating poem with slug:', slug);
    console.log('Update data:', JSON.stringify(req.body, null, 2));
    
    // Find poem by slug
    const poem = await Poem.findOne({ slug });
    if (!poem) {
      return errorResponse(res, 'Poem not found', 404);
    }

    // If author is being changed, validate new author and update counts
    if (req.body.author && req.body.author !== poem.author.toString()) {
      const authorExists = await Author.findById(req.body.author);
      if (!authorExists) {
        return errorResponse(res, 'New author not found', 404);
      }
      
      await Author.findByIdAndUpdate(poem.author, { $inc: { 'stats.poemsCount': -1 } });
      await Author.findByIdAndUpdate(req.body.author, { $inc: { 'stats.poemsCount': 1 } });
    }

    // Prepare update data
    const updateData = {
      title: req.body.title || poem.title,
      content: req.body.content || poem.content,
      contentUrdu: req.body.contentUrdu || poem.contentUrdu,
      transliteration: req.body.transliteration || poem.transliteration,
      translation: {
        english: req.body.translation?.english || poem.translation?.english,
        hindi: req.body.translation?.hindi || poem.translation?.hindi
      },
      author: req.body.author || poem.author,
      genre: req.body.genre || poem.genre,
      language: req.body.language ? req.body.language.toLowerCase() : poem.language,
      era: req.body.era || poem.era,
      tags: req.body.tags || poem.tags,
      mood: req.body.mood || poem.mood,
      isPublished: req.body.isPublished !== undefined ? req.body.isPublished : poem.isPublished,
      isFeatured: req.body.isFeatured !== undefined ? req.body.isFeatured : poem.isFeatured
    };

    // If publishing for first time, set publishedAt
    if (updateData.isPublished && !poem.isPublished) {
      updateData.publishedAt = new Date();
    }

    // Handle slug update if title changed
    if (req.body.title && req.body.title !== poem.title) {
      let newSlug = slugify(req.body.title, { lower: true, strict: true });
      
      // Check if new slug already exists (excluding current poem)
      const existingPoem = await Poem.findOne({ 
        slug: newSlug, 
        _id: { $ne: poem._id } 
      });
      
      if (existingPoem) {
        let counter = 1;
        let finalSlug = `${newSlug}-${counter}`;
        while (await Poem.findOne({ slug: finalSlug, _id: { $ne: poem._id } })) {
          counter++;
          finalSlug = `${newSlug}-${counter}`;
        }
        updateData.slug = finalSlug;
      } else {
        updateData.slug = newSlug;
      }
    }

    // If slug is provided directly, use it
    if (req.body.slug && req.body.slug !== poem.slug) {
      const cleanSlug = req.body.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
      const existingPoem = await Poem.findOne({ 
        slug: cleanSlug, 
        _id: { $ne: poem._id } 
      });
      
      if (existingPoem) {
        return errorResponse(res, 'Slug already exists. Please choose a different slug.', 400);
      }
      updateData.slug = cleanSlug;
    }

    const updatedPoem = await Poem.findByIdAndUpdate(
      poem._id,
      updateData,
      { new: true, runValidators: true }
    ).populate('author', 'name slug avatar');

    await cacheDelete('cache:/api/poems:*');
    successResponse(res, updatedPoem, 'Poem updated successfully');
  } catch (error) {
    console.error('Error updating poem:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
    }
    
    next(error);
  }
};

// ============================================
// FIXED: Delete poem by SLUG (not ID)
// ============================================
export const deletePoem = async (req, res, next) => {
  try {
    const { slug } = req.params;
    console.log('Deleting poem with slug:', slug);
    
    const poem = await Poem.findOne({ slug });
    if (!poem) {
      return errorResponse(res, 'Poem not found', 404);
    }
    
    await Author.findByIdAndUpdate(poem.author, {
      $inc: { 'stats.poemsCount': -1 }
    });
    
    await Poem.findByIdAndDelete(poem._id);
    await cacheDelete('cache:/api/poems:*');
    successResponse(res, null, 'Poem deleted successfully');
  } catch (error) {
    console.error('Error deleting poem:', error);
    next(error);
  }
};

// ============================================
// FIXED: Like poem by SLUG (not ID)
// ============================================
export const likePoem = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const userId = req.user.id;
    
    const poem = await Poem.findOne({ slug });
    if (!poem) {
      return errorResponse(res, 'Poem not found', 404);
    }

    if (poem.likedBy.includes(userId)) {
      poem.likedBy.pull(userId);
      poem.stats.likes -= 1;
    } else {
      poem.likedBy.push(userId);
      poem.stats.likes += 1;
    }

    await poem.save();
    successResponse(res, { 
      liked: poem.likedBy.includes(userId), 
      likes: poem.stats.likes 
    });
  } catch (error) {
    console.error('Error in likePoem:', error);
    next(error);
  }
};

// ============================================
// FIXED: Bookmark poem by SLUG (not ID)
// ============================================
export const bookmarkPoem = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const userId = req.user.id;
    
    const poem = await Poem.findOne({ slug });
    if (!poem) {
      return errorResponse(res, 'Poem not found', 404);
    }

    if (poem.bookmarkedBy.includes(userId)) {
      poem.bookmarkedBy.pull(userId);
      poem.stats.bookmarks -= 1;
    } else {
      poem.bookmarkedBy.push(userId);
      poem.stats.bookmarks += 1;
    }

    await poem.save();
    successResponse(res, { 
      bookmarked: poem.bookmarkedBy.includes(userId), 
      bookmarks: poem.stats.bookmarks 
    });
  } catch (error) {
    console.error('Error in bookmarkPoem:', error);
    next(error);
  }
};

// ============================================
// FIXED: Add comment by SLUG (not ID)
// ============================================
export const addComment = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { text } = req.body;
    
    const poem = await Poem.findOne({ slug });
    if (!poem) {
      return errorResponse(res, 'Poem not found', 404);
    }
    
    poem.comments.push({
      user: req.user.id,
      text: text
    });
    poem.stats.comments += 1;
    await poem.save();

    await poem.populate('comments.user', 'name avatar');
    
    successResponse(res, poem.comments, 'Comment added');
  } catch (error) {
    console.error('Error in addComment:', error);
    next(error);
  }
};

export const getFeaturedPoems = async (req, res, next) => {
  try {
    const poems = await Poem.find({ isFeatured: true, isPublished: true })
      .populate('author', 'name slug avatar')
      .sort({ featuredAt: -1 })
      .limit(10);

    successResponse(res, poems);
  } catch (error) {
    console.error('Error in getFeaturedPoems:', error);
    next(error);
  }
};

export const getTrendingPoems = async (req, res, next) => {
  try {
    const poems = await Poem.find({ isPublished: true })
      .populate('author', 'name slug avatar')
      .sort({ 'stats.views': -1, 'stats.likes': -1 })
      .limit(20);

    successResponse(res, poems);
  } catch (error) {
    console.error('Error in getTrendingPoems:', error);
    next(error);
  }
};

export const getPoemsByAuthor = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const { authorId } = req.params;

    const author = await Author.findById(authorId);
    if (!author) {
      return errorResponse(res, 'Author not found', 404);
    }

    const poems = await Poem.find({ author: authorId, isPublished: true })
      .populate('author', 'name slug avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Poem.countDocuments({ author: authorId, isPublished: true });
    paginatedResponse(res, poems, { page, limit, total });
  } catch (error) {
    console.error('Error in getPoemsByAuthor:', error);
    next(error);
  }
};

export const getAIExplanation = async (req, res, next) => {
  try {
    const poem = await Poem.findOne({ slug: req.params.slug });

    if (!poem) {
      return errorResponse(res, 'Poem not found', 404);
    }

    if (poem.aiExplanation && poem.aiExplanation.generatedAt) {
      const hoursSince = (Date.now() - poem.aiExplanation.generatedAt) / (1000 * 60 * 60);
      if (hoursSince < 24) {
        return successResponse(res, poem.aiExplanation);
      }
    }

    const explanation = await generatePoemExplanation(poem);
    poem.aiExplanation = explanation;
    await poem.save();

    successResponse(res, explanation);
  } catch (error) {
    console.error('Error in getAIExplanation:', error);
    next(error);
  }
};

export const getRelatedPoems = async (req, res, next) => {
  try {
    const poem = await Poem.findOne({ slug: req.params.slug });

    if (!poem) {
      return errorResponse(res, 'Poem not found', 404);
    }

    const related = await Poem.find({
      _id: { $ne: poem._id },
      $or: [
        { author: poem.author },
        { genre: poem.genre },
        { tags: { $in: poem.tags } }
      ],
      isPublished: true
    })
      .populate('author', 'name slug avatar')
      .limit(6);

    successResponse(res, related);
  } catch (error) {
    console.error('Error in getRelatedPoems:', error);
    next(error);
  }
};