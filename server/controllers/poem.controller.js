
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










// // server/controllers/poem.controller.js
// import Poem from '../models/Poem.js';
// import Author from '../models/Author.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination, getSort, getFilters } from '../utils/pagination.js';
// import { generatePoemExplanation } from '../utils/aiService.js';
// import { cacheDelete } from '../config/redis.js';
// import slugify from 'slugify';

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
//       .populate('author', 'name slug avatar bio nameUrdu')
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
    
//     if (!slug) {
//       return errorResponse(res, 'Slug is required', 400);
//     }

//     const poem = await Poem.findOne({ slug })
//       .populate('author', 'name slug avatar bio nameUrdu nameHindi birthDate deathDate era')
//       .populate('category', 'name slug')
//       .lean();

//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     if (!poem.isPublished && (!req.user || req.user.role !== 'admin')) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     // Increment views
//     await Poem.updateOne({ _id: poem._id }, { $inc: { 'stats.views': 1 } });
//     poem.stats.views += 1;

//     let userInteraction = {};
//     if (req.user) {
//       userInteraction = {
//         isLiked: poem.likedBy?.includes(req.user.id) || false,
//         isBookmarked: poem.bookmarkedBy?.includes(req.user.id) || false
//       };
//     }

//     const responseData = {
//       ...poem,
//       userInteraction,
//       author: poem.author ? {
//         _id: poem.author._id,
//         name: poem.author.name || 'Unknown Author',
//         slug: poem.author.slug || '#',
//         avatar: poem.author.avatar || null,
//         bio: poem.author.bio || null,
//         nameUrdu: poem.author.nameUrdu || null,
//         era: poem.author.era || null
//       } : null,
//       formattedDate: poem.createdAt ? new Date(poem.createdAt).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//       }) : null
//     };

//     console.log('Poem found:', {
//       id: poem._id,
//       title: poem.title,
//       slug: poem.slug,
//       authorName: poem.author?.name
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
    
//     const { title, content, author, genre, slug } = req.body;
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

//     const authorExists = await Author.findById(author);
//     if (!authorExists) {
//       return errorResponse(res, 'Author not found. Please select a valid author.', 404);
//     }

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
    
//     // If slug is provided, use it; otherwise will be auto-generated
//     if (slug && slug.trim()) {
//       poemData.slug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     }

//     const poem = await Poem.create(poemData);
    
//     await Author.findByIdAndUpdate(author, {
//       $inc: { 'stats.poemsCount': 1 }
//     });

//     await cacheDelete('cache:/api/poems:*');
    
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
//       return errorResponse(res, 'A poem with this slug already exists. Please use a different slug.', 400);
//     }
    
//     next(error);
//   }
// };

// // ============================================
// // FIXED: Update poem by SLUG (not ID)
// // ============================================
// export const updatePoem = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     console.log('Updating poem with slug:', slug);
//     console.log('Update data:', JSON.stringify(req.body, null, 2));
    
//     // Find poem by slug
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     // If author is being changed, validate new author and update counts
//     if (req.body.author && req.body.author !== poem.author.toString()) {
//       const authorExists = await Author.findById(req.body.author);
//       if (!authorExists) {
//         return errorResponse(res, 'New author not found', 404);
//       }
      
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

//     // Handle slug update if title changed
//     if (req.body.title && req.body.title !== poem.title) {
//       let newSlug = slugify(req.body.title, { lower: true, strict: true });
      
//       // Check if new slug already exists (excluding current poem)
//       const existingPoem = await Poem.findOne({ 
//         slug: newSlug, 
//         _id: { $ne: poem._id } 
//       });
      
//       if (existingPoem) {
//         let counter = 1;
//         let finalSlug = `${newSlug}-${counter}`;
//         while (await Poem.findOne({ slug: finalSlug, _id: { $ne: poem._id } })) {
//           counter++;
//           finalSlug = `${newSlug}-${counter}`;
//         }
//         updateData.slug = finalSlug;
//       } else {
//         updateData.slug = newSlug;
//       }
//     }

//     // If slug is provided directly, use it
//     if (req.body.slug && req.body.slug !== poem.slug) {
//       const cleanSlug = req.body.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
//       const existingPoem = await Poem.findOne({ 
//         slug: cleanSlug, 
//         _id: { $ne: poem._id } 
//       });
      
//       if (existingPoem) {
//         return errorResponse(res, 'Slug already exists. Please choose a different slug.', 400);
//       }
//       updateData.slug = cleanSlug;
//     }

//     const updatedPoem = await Poem.findByIdAndUpdate(
//       poem._id,
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

// // ============================================
// // FIXED: Delete poem by SLUG (not ID)
// // ============================================
// export const deletePoem = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     console.log('Deleting poem with slug:', slug);
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     await Author.findByIdAndUpdate(poem.author, {
//       $inc: { 'stats.poemsCount': -1 }
//     });
    
//     await Poem.findByIdAndDelete(poem._id);
//     await cacheDelete('cache:/api/poems:*');
//     successResponse(res, null, 'Poem deleted successfully');
//   } catch (error) {
//     console.error('Error deleting poem:', error);
//     next(error);
//   }
// };

// // ============================================
// // FIXED: Like poem by SLUG (not ID)
// // ============================================
// export const likePoem = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     const userId = req.user.id;
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     if (poem.likedBy.includes(userId)) {
//       poem.likedBy.pull(userId);
//       poem.stats.likes -= 1;
//     } else {
//       poem.likedBy.push(userId);
//       poem.stats.likes += 1;
//     }

//     await poem.save();
//     successResponse(res, { 
//       liked: poem.likedBy.includes(userId), 
//       likes: poem.stats.likes 
//     });
//   } catch (error) {
//     console.error('Error in likePoem:', error);
//     next(error);
//   }
// };

// // ============================================
// // FIXED: Bookmark poem by SLUG (not ID)
// // ============================================
// export const bookmarkPoem = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     const userId = req.user.id;
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     if (poem.bookmarkedBy.includes(userId)) {
//       poem.bookmarkedBy.pull(userId);
//       poem.stats.bookmarks -= 1;
//     } else {
//       poem.bookmarkedBy.push(userId);
//       poem.stats.bookmarks += 1;
//     }

//     await poem.save();
//     successResponse(res, { 
//       bookmarked: poem.bookmarkedBy.includes(userId), 
//       bookmarks: poem.stats.bookmarks 
//     });
//   } catch (error) {
//     console.error('Error in bookmarkPoem:', error);
//     next(error);
//   }
// };

// // ============================================
// // FIXED: Add comment by SLUG (not ID)
// // ============================================
// export const addComment = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     const { text } = req.body;
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     poem.comments.push({
//       user: req.user.id,
//       text: text
//     });
//     poem.stats.comments += 1;
//     await poem.save();

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











// // server/controllers/poem.controller.js
// // working revert if
// import Poem from '../models/Poem.js';
// import Author from '../models/Author.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination, getSort, getFilters } from '../utils/pagination.js';
// import { generatePoemExplanation } from '../utils/aiService.js';
// import { cacheDelete } from '../config/redis.js';
// import slugify from 'slugify';

// // ============================================
// // 🔴 NEW: Import AI Services
// // ============================================
// import { analyzeSentiment } from '../services/sentimentService.js';
// import { extractThemes } from '../services/themeExtractor.js';
// import { analyzePoem as aiAnalyzePoem } from '../services/aiOrchestrator.js';

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
//       .populate('author', 'name slug avatar bio nameUrdu')
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
    
//     if (!slug) {
//       return errorResponse(res, 'Slug is required', 400);
//     }

//     const poem = await Poem.findOne({ slug })
//       .populate('author', 'name slug avatar bio nameUrdu nameHindi birthDate deathDate era')
//       .populate('category', 'name slug')
//       .lean();

//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     if (!poem.isPublished && (!req.user || req.user.role !== 'admin')) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     // Increment views
//     await Poem.updateOne({ _id: poem._id }, { $inc: { 'stats.views': 1 } });
//     poem.stats.views += 1;

//     let userInteraction = {};
//     if (req.user) {
//       userInteraction = {
//         isLiked: poem.likedBy?.includes(req.user.id) || false,
//         isBookmarked: poem.bookmarkedBy?.includes(req.user.id) || false
//       };
//     }

//     const responseData = {
//       ...poem,
//       userInteraction,
//       author: poem.author ? {
//         _id: poem.author._id,
//         name: poem.author.name || 'Unknown Author',
//         slug: poem.author.slug || '#',
//         avatar: poem.author.avatar || null,
//         bio: poem.author.bio || null,
//         nameUrdu: poem.author.nameUrdu || null,
//         era: poem.author.era || null
//       } : null,
//       formattedDate: poem.createdAt ? new Date(poem.createdAt).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//       }) : null
//     };

//     console.log('Poem found:', {
//       id: poem._id,
//       title: poem.title,
//       slug: poem.slug,
//       authorName: poem.author?.name
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
    
//     const { title, content, author, genre, slug } = req.body;
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

//     const authorExists = await Author.findById(author);
//     if (!authorExists) {
//       return errorResponse(res, 'Author not found. Please select a valid author.', 404);
//     }

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
    
//     // If slug is provided, use it; otherwise will be auto-generated
//     if (slug && slug.trim()) {
//       poemData.slug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     }

//     const poem = await Poem.create(poemData);
    
//     await Author.findByIdAndUpdate(author, {
//       $inc: { 'stats.poemsCount': 1 }
//     });

//     await cacheDelete('cache:/api/poems:*');
    
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
//       return errorResponse(res, 'A poem with this slug already exists. Please use a different slug.', 400);
//     }
    
//     next(error);
//   }
// };

// export const updatePoem = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     console.log('Updating poem with slug:', slug);
//     console.log('Update data:', JSON.stringify(req.body, null, 2));
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     if (req.body.author && req.body.author !== poem.author.toString()) {
//       const authorExists = await Author.findById(req.body.author);
//       if (!authorExists) {
//         return errorResponse(res, 'New author not found', 404);
//       }
      
//       await Author.findByIdAndUpdate(poem.author, { $inc: { 'stats.poemsCount': -1 } });
//       await Author.findByIdAndUpdate(req.body.author, { $inc: { 'stats.poemsCount': 1 } });
//     }

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

//     if (updateData.isPublished && !poem.isPublished) {
//       updateData.publishedAt = new Date();
//     }

//     if (req.body.title && req.body.title !== poem.title) {
//       let newSlug = slugify(req.body.title, { lower: true, strict: true });
      
//       const existingPoem = await Poem.findOne({ 
//         slug: newSlug, 
//         _id: { $ne: poem._id } 
//       });
      
//       if (existingPoem) {
//         let counter = 1;
//         let finalSlug = `${newSlug}-${counter}`;
//         while (await Poem.findOne({ slug: finalSlug, _id: { $ne: poem._id } })) {
//           counter++;
//           finalSlug = `${newSlug}-${counter}`;
//         }
//         updateData.slug = finalSlug;
//       } else {
//         updateData.slug = newSlug;
//       }
//     }

//     if (req.body.slug && req.body.slug !== poem.slug) {
//       const cleanSlug = req.body.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
//       const existingPoem = await Poem.findOne({ 
//         slug: cleanSlug, 
//         _id: { $ne: poem._id } 
//       });
      
//       if (existingPoem) {
//         return errorResponse(res, 'Slug already exists. Please choose a different slug.', 400);
//       }
//       updateData.slug = cleanSlug;
//     }

//     const updatedPoem = await Poem.findByIdAndUpdate(
//       poem._id,
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
//     const { slug } = req.params;
//     console.log('Deleting poem with slug:', slug);
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     await Author.findByIdAndUpdate(poem.author, {
//       $inc: { 'stats.poemsCount': -1 }
//     });
    
//     await Poem.findByIdAndDelete(poem._id);
//     await cacheDelete('cache:/api/poems:*');
//     successResponse(res, null, 'Poem deleted successfully');
//   } catch (error) {
//     console.error('Error deleting poem:', error);
//     next(error);
//   }
// };

// export const likePoem = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     const userId = req.user.id;
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     if (poem.likedBy.includes(userId)) {
//       poem.likedBy.pull(userId);
//       poem.stats.likes -= 1;
//     } else {
//       poem.likedBy.push(userId);
//       poem.stats.likes += 1;
//     }

//     await poem.save();
//     successResponse(res, { 
//       liked: poem.likedBy.includes(userId), 
//       likes: poem.stats.likes 
//     });
//   } catch (error) {
//     console.error('Error in likePoem:', error);
//     next(error);
//   }
// };

// export const bookmarkPoem = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     const userId = req.user.id;
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     if (poem.bookmarkedBy.includes(userId)) {
//       poem.bookmarkedBy.pull(userId);
//       poem.stats.bookmarks -= 1;
//     } else {
//       poem.bookmarkedBy.push(userId);
//       poem.stats.bookmarks += 1;
//     }

//     await poem.save();
//     successResponse(res, { 
//       bookmarked: poem.bookmarkedBy.includes(userId), 
//       bookmarks: poem.stats.bookmarks 
//     });
//   } catch (error) {
//     console.error('Error in bookmarkPoem:', error);
//     next(error);
//   }
// };

// export const addComment = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     const { text } = req.body;
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     poem.comments.push({
//       user: req.user.id,
//       text: text
//     });
//     poem.stats.comments += 1;
//     await poem.save();

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

// // ============================================
// // 🔴 NEW AI FEATURE FUNCTIONS
// // ============================================

// // ============================================
// // SENTIMENT ANALYSIS
// // ============================================
// export const getPoemSentiment = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     // Find poem by slug
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     // Check cache first (24 hours)
//     if (poem.sentimentAnalysis && poem.sentimentAnalysis.analyzedAt) {
//       const hoursSince = (Date.now() - new Date(poem.sentimentAnalysis.analyzedAt)) / (1000 * 60 * 60);
//       if (hoursSince < 24) {
//         return successResponse(res, poem.sentimentAnalysis);
//       }
//     }
    
//     // Perform sentiment analysis
//     const content = poem.contentUrdu || poem.content;
//     const analysis = analyzeSentiment(content);
    
//     // Cache the result
//     poem.sentimentAnalysis = {
//       ...analysis,
//       analyzedAt: new Date()
//     };
//     await poem.save();
    
//     successResponse(res, poem.sentimentAnalysis);
//   } catch (error) {
//     console.error('Error in getPoemSentiment:', error);
//     // Return fallback sentiment
//     successResponse(res, {
//       sentiment: 'neutral',
//       score: 0,
//       confidence: 0,
//       emotions: { joy: 0, sadness: 0, anger: 0, fear: 0, love: 0, neutral: 100 },
//       dominantEmotion: 'neutral',
//       summary: 'Sentiment analysis temporarily unavailable',
//       isFallback: true
//     });
//   }
// };

// // ============================================
// // THEME EXTRACTION
// // ============================================
// export const getPoemThemes = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     // Find poem by slug
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     // Check cache first (24 hours)
//     if (poem.themeAnalysis && poem.themeAnalysis.analyzedAt) {
//       const hoursSince = (Date.now() - new Date(poem.themeAnalysis.analyzedAt)) / (1000 * 60 * 60);
//       if (hoursSince < 24) {
//         return successResponse(res, poem.themeAnalysis);
//       }
//     }
    
//     // Extract themes
//     const content = poem.contentUrdu || poem.content;
//     const themes = extractThemes(content);
    
//     // Cache the result
//     poem.themeAnalysis = {
//       ...themes,
//       analyzedAt: new Date()
//     };
//     await poem.save();
    
//     successResponse(res, poem.themeAnalysis);
//   } catch (error) {
//     console.error('Error in getPoemThemes:', error);
//     // Return fallback themes
//     successResponse(res, {
//       dominant: 'neutral',
//       themes: [],
//       tags: [],
//       themeCount: 0,
//       isFallback: true
//     });
//   }
// };

// // ============================================
// // FULL AI LITERARY ANALYSIS
// // ============================================
// export const getAIAnalysis = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     // Find poem by slug
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     // Check cache first (24 hours)
//     if (poem.aiAnalysis && poem.aiAnalysis.analyzedAt) {
//       const hoursSince = (Date.now() - new Date(poem.aiAnalysis.analyzedAt)) / (1000 * 60 * 60);
//       if (hoursSince < 24) {
//         return successResponse(res, poem.aiAnalysis);
//       }
//     }
    
//     // Get AI analysis
//     const content = poem.contentUrdu || poem.content;
//     const result = await aiAnalyzePoem(content, poem.language || 'urdu');
    
//     if (result.success) {
//       const analysis = {
//         ...result.analysis,
//         provider: result.provider,
//         analyzedAt: new Date(),
//         modelUsed: result.provider
//       };
      
//       // Cache the result
//       poem.aiAnalysis = analysis;
//       await poem.save();
      
//       return successResponse(res, analysis);
//     } else {
//       // Return fallback analysis
//       return successResponse(res, {
//         themes: ['Theme detection unavailable'],
//         tone: 'Unknown',
//         sentiment: 'neutral',
//         emotions: [],
//         meaning: 'AI analysis temporarily unavailable. Please try again later.',
//         literaryDevices: ['Poetic devices detected'],
//         rhymeScheme: 'Not detected',
//         difficulty: 'intermediate',
//         isFallback: true,
//         provider: 'fallback'
//       });
//     }
//   } catch (error) {
//     console.error('Error in getAIAnalysis:', error);
    
//     // Return fallback on error
//     successResponse(res, {
//       themes: ['Analysis temporarily unavailable'],
//       tone: 'Unknown',
//       sentiment: 'neutral',
//       emotions: [],
//       meaning: 'We are experiencing high demand. Please try again later.',
//       literaryDevices: [],
//       rhymeScheme: 'Not detected',
//       difficulty: 'intermediate',
//       isFallback: true,
//       provider: 'fallback'
//     });
//   }
// };

// // ============================================
// // ANALYZE POEM CONTENT DIRECTLY (for AJAX)
// // ============================================
// export const analyzePoemContent = async (req, res, next) => {
//   try {
//     const { poemText, language = 'urdu' } = req.body;
    
//     if (!poemText || poemText.trim().length < 10) {
//       return errorResponse(res, 'Poem text is required (minimum 10 characters)', 400);
//     }
    
//     const result = await aiAnalyzePoem(poemText, language);
    
//     if (result.success) {
//       successResponse(res, {
//         analysis: result.analysis,
//         provider: result.provider
//       });
//     } else {
//       // Return fallback analysis
//       successResponse(res, {
//         analysis: {
//           themes: ['Theme detection unavailable'],
//           tone: 'Unknown',
//           sentiment: 'neutral',
//           emotions: [],
//           meaning: 'AI service temporarily unavailable. Basic analysis provided.',
//           literaryDevices: ['Poetic devices detected'],
//           rhymeScheme: 'Pattern present',
//           difficulty: 'intermediate'
//         },
//         provider: 'fallback',
//         warning: result.error
//       });
//     }
//   } catch (error) {
//     console.error('Error in analyzePoemContent:', error);
    
//     // Always return a response, never fail
//     successResponse(res, {
//       analysis: {
//         themes: ['Poetry analysis'],
//         tone: 'Expressive',
//         sentiment: 'neutral',
//         emotions: ['contemplative'],
//         meaning: 'This poem expresses deep emotions through poetic language.',
//         literaryDevices: ['Imagery', 'Metaphor'],
//         rhymeScheme: 'Rhythmic pattern',
//         difficulty: 'intermediate'
//       },
//       provider: 'fallback',
//       warning: 'Using fallback analysis. Please try again for detailed AI analysis.'
//     });
//   }
// };


















//====================================
// // server/controllers/poem.controller.js

// import Poem from '../models/Poem.js';
// import Author from '../models/Author.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination, getSort, getFilters } from '../utils/pagination.js';
// import { generatePoemExplanation } from '../utils/aiService.js';
// import { cacheDelete } from '../config/redis.js';
// import slugify from 'slugify';

// // ============================================
// // 🔴 NEW: Import AI Services
// // ============================================
// import { analyzeSentiment } from '../services/sentimentService.js';
// import { extractThemes } from '../services/themeExtractor.js';
// import { analyzePoem as aiAnalyzePoem } from '../services/aiOrchestrator.js';

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
//       .populate('author', 'name slug avatar bio nameUrdu')
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
    
//     if (!slug) {
//       return errorResponse(res, 'Slug is required', 400);
//     }

//     const poem = await Poem.findOne({ slug })
//       .populate('author', 'name slug avatar bio nameUrdu nameHindi birthDate deathDate era')
//       .populate('category', 'name slug')
//       .lean();

//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     if (!poem.isPublished && (!req.user || req.user.role !== 'admin')) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     // Increment views
//     await Poem.updateOne({ _id: poem._id }, { $inc: { 'stats.views': 1 } });
//     poem.stats.views += 1;

//     let userInteraction = {};
//     if (req.user) {
//       userInteraction = {
//         isLiked: poem.likedBy?.includes(req.user.id) || false,
//         isBookmarked: poem.bookmarkedBy?.includes(req.user.id) || false
//       };
//     }

//     const responseData = {
//       ...poem,
//       userInteraction,
//       author: poem.author ? {
//         _id: poem.author._id,
//         name: poem.author.name || 'Unknown Author',
//         slug: poem.author.slug || '#',
//         avatar: poem.author.avatar || null,
//         bio: poem.author.bio || null,
//         nameUrdu: poem.author.nameUrdu || null,
//         era: poem.author.era || null
//       } : null,
//       formattedDate: poem.createdAt ? new Date(poem.createdAt).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//       }) : null
//     };

//     console.log('Poem found:', {
//       id: poem._id,
//       title: poem.title,
//       slug: poem.slug,
//       authorName: poem.author?.name
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
    
//     const { title, content, author, genre, slug } = req.body;
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

//     const authorExists = await Author.findById(author);
//     if (!authorExists) {
//       return errorResponse(res, 'Author not found. Please select a valid author.', 404);
//     }

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
    
//     // If slug is provided, use it; otherwise will be auto-generated
//     if (slug && slug.trim()) {
//       poemData.slug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     }

//     const poem = await Poem.create(poemData);
    
//     await Author.findByIdAndUpdate(author, {
//       $inc: { 'stats.poemsCount': 1 }
//     });

//     await cacheDelete('cache:/api/poems:*');
    
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
//       return errorResponse(res, 'A poem with this slug already exists. Please use a different slug.', 400);
//     }
    
//     next(error);
//   }
// };

// export const updatePoem = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     console.log('Updating poem with slug:', slug);
//     console.log('Update data:', JSON.stringify(req.body, null, 2));
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     if (req.body.author && req.body.author !== poem.author.toString()) {
//       const authorExists = await Author.findById(req.body.author);
//       if (!authorExists) {
//         return errorResponse(res, 'New author not found', 404);
//       }
      
//       await Author.findByIdAndUpdate(poem.author, { $inc: { 'stats.poemsCount': -1 } });
//       await Author.findByIdAndUpdate(req.body.author, { $inc: { 'stats.poemsCount': 1 } });
//     }

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

//     if (updateData.isPublished && !poem.isPublished) {
//       updateData.publishedAt = new Date();
//     }

//     if (req.body.title && req.body.title !== poem.title) {
//       let newSlug = slugify(req.body.title, { lower: true, strict: true });
      
//       const existingPoem = await Poem.findOne({ 
//         slug: newSlug, 
//         _id: { $ne: poem._id } 
//       });
      
//       if (existingPoem) {
//         let counter = 1;
//         let finalSlug = `${newSlug}-${counter}`;
//         while (await Poem.findOne({ slug: finalSlug, _id: { $ne: poem._id } })) {
//           counter++;
//           finalSlug = `${newSlug}-${counter}`;
//         }
//         updateData.slug = finalSlug;
//       } else {
//         updateData.slug = newSlug;
//       }
//     }

//     if (req.body.slug && req.body.slug !== poem.slug) {
//       const cleanSlug = req.body.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
//       const existingPoem = await Poem.findOne({ 
//         slug: cleanSlug, 
//         _id: { $ne: poem._id } 
//       });
      
//       if (existingPoem) {
//         return errorResponse(res, 'Slug already exists. Please choose a different slug.', 400);
//       }
//       updateData.slug = cleanSlug;
//     }

//     const updatedPoem = await Poem.findByIdAndUpdate(
//       poem._id,
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
//     const { slug } = req.params;
//     console.log('Deleting poem with slug:', slug);
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     await Author.findByIdAndUpdate(poem.author, {
//       $inc: { 'stats.poemsCount': -1 }
//     });
    
//     await Poem.findByIdAndDelete(poem._id);
//     await cacheDelete('cache:/api/poems:*');
//     successResponse(res, null, 'Poem deleted successfully');
//   } catch (error) {
//     console.error('Error deleting poem:', error);
//     next(error);
//   }
// };

// export const likePoem = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     const userId = req.user.id;
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     if (poem.likedBy.includes(userId)) {
//       poem.likedBy.pull(userId);
//       poem.stats.likes -= 1;
//     } else {
//       poem.likedBy.push(userId);
//       poem.stats.likes += 1;
//     }

//     await poem.save();
//     successResponse(res, { 
//       liked: poem.likedBy.includes(userId), 
//       likes: poem.stats.likes 
//     });
//   } catch (error) {
//     console.error('Error in likePoem:', error);
//     next(error);
//   }
// };

// export const bookmarkPoem = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     const userId = req.user.id;
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     if (poem.bookmarkedBy.includes(userId)) {
//       poem.bookmarkedBy.pull(userId);
//       poem.stats.bookmarks -= 1;
//     } else {
//       poem.bookmarkedBy.push(userId);
//       poem.stats.bookmarks += 1;
//     }

//     await poem.save();
//     successResponse(res, { 
//       bookmarked: poem.bookmarkedBy.includes(userId), 
//       bookmarks: poem.stats.bookmarks 
//     });
//   } catch (error) {
//     console.error('Error in bookmarkPoem:', error);
//     next(error);
//   }
// };

// export const addComment = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     const { text } = req.body;
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     poem.comments.push({
//       user: req.user.id,
//       text: text
//     });
//     poem.stats.comments += 1;
//     await poem.save();

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

// // ============================================
// // 🔴 NEW AI FEATURE FUNCTIONS
// // ============================================

// // ============================================
// // SENTIMENT ANALYSIS
// // ============================================
// export const getPoemSentiment = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     // Find poem by slug
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     // Check cache first (24 hours)
//     if (poem.sentimentAnalysis && poem.sentimentAnalysis.analyzedAt) {
//       const hoursSince = (Date.now() - new Date(poem.sentimentAnalysis.analyzedAt)) / (1000 * 60 * 60);
//       if (hoursSince < 24) {
//         return successResponse(res, poem.sentimentAnalysis);
//       }
//     }
    
//     // Perform sentiment analysis
//     const content = poem.contentUrdu || poem.content;
//     const analysis = analyzeSentiment(content);
    
//     // Cache the result
//     poem.sentimentAnalysis = {
//       ...analysis,
//       analyzedAt: new Date()
//     };
//     await poem.save();
    
//     successResponse(res, poem.sentimentAnalysis);
//   } catch (error) {
//     console.error('Error in getPoemSentiment:', error);
//     // Return fallback sentiment
//     successResponse(res, {
//       sentiment: 'neutral',
//       score: 0,
//       confidence: 0,
//       emotions: { joy: 0, sadness: 0, anger: 0, fear: 0, love: 0, neutral: 100 },
//       dominantEmotion: 'neutral',
//       summary: 'Sentiment analysis temporarily unavailable',
//       isFallback: true
//     });
//   }
// };

// // ============================================
// // THEME EXTRACTION
// // ============================================
// export const getPoemThemes = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     // Find poem by slug
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     // Check cache first (24 hours)
//     if (poem.themeAnalysis && poem.themeAnalysis.analyzedAt) {
//       const hoursSince = (Date.now() - new Date(poem.themeAnalysis.analyzedAt)) / (1000 * 60 * 60);
//       if (hoursSince < 24) {
//         return successResponse(res, poem.themeAnalysis);
//       }
//     }
    
//     // Extract themes
//     const content = poem.contentUrdu || poem.content;
//     const themes = extractThemes(content);
    
//     // Cache the result
//     poem.themeAnalysis = {
//       ...themes,
//       analyzedAt: new Date()
//     };
//     await poem.save();
    
//     successResponse(res, poem.themeAnalysis);
//   } catch (error) {
//     console.error('Error in getPoemThemes:', error);
//     // Return fallback themes
//     successResponse(res, {
//       dominant: 'neutral',
//       themes: [],
//       tags: [],
//       themeCount: 0,
//       isFallback: true
//     });
//   }
// };

// // ============================================
// // FULL AI LITERARY ANALYSIS (Main Endpoint)
// // ============================================
// export const getAIAnalysis = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     const forceRefresh = req.query.refresh === 'true';
    
//     console.log('🔍 AI Analysis requested for slug:', slug, 'refresh:', forceRefresh);
    
//     // Find poem by slug
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     // Check cache first (24 hours) unless force refresh
//     const hasValidCache = !forceRefresh && 
//                           poem.aiAnalysis && 
//                           poem.aiAnalysis.analyzedAt &&
//                           poem.aiAnalysis.themes &&
//                           poem.aiAnalysis.themes.length > 0;
    
//     if (hasValidCache) {
//       const hoursSince = (Date.now() - new Date(poem.aiAnalysis.analyzedAt)) / (1000 * 60 * 60);
//       if (hoursSince < 24) {
//         console.log('✅ Returning cached AI analysis');
//         return successResponse(res, poem.aiAnalysis);
//       }
//     }
    
//     console.log('🔄 Generating fresh AI analysis...');
    
//     // Get AI analysis
//     const content = poem.contentUrdu || poem.content;
//     const result = await aiAnalyzePoem(content, poem.language || 'urdu');
    
//     if (result.success && result.analysis) {
//       const analysis = {
//         themes: result.analysis.themes || ['Poetry', 'Emotion', 'Expression'],
//         tone: result.analysis.tone || 'Expressive',
//         sentiment: result.analysis.sentiment || 'neutral',
//         emotions: result.analysis.emotions || ['Thoughtful', 'Reflective'],
//         meaning: result.analysis.meaning || 'This poem expresses deep emotions through beautiful imagery.',
//         literaryDevices: result.analysis.literaryDevices || ['Imagery', 'Metaphor', 'Rhyme'],
//         rhymeScheme: result.analysis.rhymeScheme || 'Rhythmic pattern',
//         difficulty: result.analysis.difficulty || 'intermediate',
//         provider: result.provider === 'gemini' ? 'Gemini AI' : 'ZauqApp AI',
//         analyzedAt: new Date(),
//         modelUsed: result.provider
//       };
      
//       // Cache the result in aiAnalysis field
//       poem.aiAnalysis = analysis;
//       await poem.save();
      
//       console.log('💾 AI analysis cached successfully');
//       return successResponse(res, analysis);
//     } else {
//       console.error('❌ AI analysis failed:', result.error);
      
//       // Return fallback analysis based on poem content
//       const content = poem.contentUrdu || poem.content || '';
//       const isKarbalaPoem = content.includes('حسین') || content.includes('Hussain') || content.includes('Karbala');
      
//       const fallbackAnalysis = {
//         themes: isKarbalaPoem 
//           ? ['Karbala', 'Sacrifice', 'Martyrdom', 'Devotion', 'Spirituality']
//           : ['Love', 'Nature', 'Spirituality', 'Emotion', 'Reflection'],
//         tone: isKarbalaPoem ? 'Tragic and Heroic' : 'Contemplative and Expressive',
//         sentiment: isKarbalaPoem ? 'sorrowful' : 'positive',
//         emotions: isKarbalaPoem 
//           ? ['Grief', 'Devotion', 'Sorrow', 'Hope', 'Faith']
//           : ['Joy', 'Peace', 'Hope', 'Love', 'Wonder'],
//         meaning: isKarbalaPoem
//           ? 'یہ مرثیہ حضرت امام حسین علیہ السلام اور شہدائے کربلا کی عظمت، صبر اور استقامت کو خراج تحسین پیش کرتا ہے۔'
//           : 'This poem beautifully expresses deep emotions and human experiences through powerful imagery.',
//         literaryDevices: ['Imagery', 'Metaphor', 'Repetition', 'Symbolism', 'Rhyme'],
//         rhymeScheme: 'AABB and ABAB patterns',
//         difficulty: 'intermediate',
//         provider: 'ZauqApp AI',
//         isFallback: true,
//         analyzedAt: new Date()
//       };
      
//       return successResponse(res, fallbackAnalysis);
//     }
//   } catch (error) {
//     console.error('Error in getAIAnalysis:', error);
    
//     // Return fallback on error
//     successResponse(res, {
//       themes: ['Analysis temporarily unavailable'],
//       tone: 'Unknown',
//       sentiment: 'neutral',
//       emotions: [],
//       meaning: 'We are experiencing high demand. Please try again later.',
//       literaryDevices: [],
//       rhymeScheme: 'Not detected',
//       difficulty: 'intermediate',
//       isFallback: true,
//       provider: 'fallback',
//       analyzedAt: new Date()
//     });
//   }
// };

// // ============================================
// // ANALYZE POEM CONTENT DIRECTLY (for AJAX)
// // ============================================
// export const analyzePoemContent = async (req, res, next) => {
//   try {
//     const { poemText, language = 'urdu' } = req.body;
    
//     if (!poemText || poemText.trim().length < 10) {
//       return errorResponse(res, 'Poem text is required (minimum 10 characters)', 400);
//     }
    
//     console.log('🔍 Analyzing poem content directly...');
//     const result = await aiAnalyzePoem(poemText, language);
    
//     if (result.success && result.analysis) {
//       successResponse(res, {
//         analysis: {
//           themes: result.analysis.themes || ['Poetry', 'Emotion', 'Expression'],
//           tone: result.analysis.tone || 'Expressive',
//           sentiment: result.analysis.sentiment || 'neutral',
//           emotions: result.analysis.emotions || ['Thoughtful', 'Reflective'],
//           meaning: result.analysis.meaning || 'This poem expresses deep emotions through beautiful imagery.',
//           literaryDevices: result.analysis.literaryDevices || ['Imagery', 'Metaphor', 'Rhyme'],
//           rhymeScheme: result.analysis.rhymeScheme || 'Rhythmic pattern',
//           difficulty: result.analysis.difficulty || 'intermediate'
//         },
//         provider: result.provider
//       });
//     } else {
//       // Return fallback analysis based on content
//       const isKarbalaPoem = poemText.includes('حسین') || poemText.includes('Hussain') || poemText.includes('Karbala');
      
//       successResponse(res, {
//         analysis: {
//           themes: isKarbalaPoem 
//             ? ['Karbala', 'Sacrifice', 'Martyrdom', 'Devotion']
//             : ['Poetry', 'Emotion', 'Expression'],
//           tone: isKarbalaPoem ? 'Tragic' : 'Expressive',
//           sentiment: isKarbalaPoem ? 'sorrowful' : 'positive',
//           emotions: isKarbalaPoem ? ['Grief', 'Devotion'] : ['Joy', 'Peace'],
//           meaning: isKarbalaPoem
//             ? 'This poem honors the sacrifice and devotion of Karbala.'
//             : 'This poem expresses deep emotions through beautiful imagery.',
//           literaryDevices: ['Imagery', 'Metaphor', 'Rhyme'],
//           rhymeScheme: 'Rhythmic pattern',
//           difficulty: 'intermediate'
//         },
//         provider: 'fallback',
//         warning: result.error || 'Using fallback analysis'
//       });
//     }
//   } catch (error) {
//     console.error('Error in analyzePoemContent:', error);
    
//     // Always return a response, never fail
//     successResponse(res, {
//       analysis: {
//         themes: ['Poetry analysis'],
//         tone: 'Expressive',
//         sentiment: 'neutral',
//         emotions: ['contemplative'],
//         meaning: 'This poem expresses deep emotions through poetic language.',
//         literaryDevices: ['Imagery', 'Metaphor'],
//         rhymeScheme: 'Rhythmic pattern',
//         difficulty: 'intermediate'
//       },
//       provider: 'fallback',
//       warning: 'Using fallback analysis. Please try again for detailed AI analysis.'
//     });
//   }
// };


















// // server/controllers/poem.controller.js

// import Poem from '../models/Poem.js';
// import Author from '../models/Author.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination, getSort, getFilters } from '../utils/pagination.js';
// import { generatePoemExplanation } from '../utils/aiService.js';
// import { cacheDelete } from '../config/redis.js';
// import slugify from 'slugify';

// // ============================================
// // 🔴 NEW: Import AI Services
// // ============================================
// import { analyzeSentiment } from '../services/sentimentService.js';
// import { extractThemes } from '../services/themeExtractor.js';
// import { analyzePoem as aiAnalyzePoem } from '../services/aiOrchestrator.js';

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
//       .populate('author', 'name slug avatar bio nameUrdu')
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
    
//     if (!slug) {
//       return errorResponse(res, 'Slug is required', 400);
//     }

//     const poem = await Poem.findOne({ slug })
//       .populate('author', 'name slug avatar bio nameUrdu nameHindi birthDate deathDate era')
//       .populate('category', 'name slug')
//       .lean();

//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     if (!poem.isPublished && (!req.user || req.user.role !== 'admin')) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     // Increment views
//     await Poem.updateOne({ _id: poem._id }, { $inc: { 'stats.views': 1 } });
//     poem.stats.views += 1;

//     let userInteraction = {};
//     if (req.user) {
//       userInteraction = {
//         isLiked: poem.likedBy?.includes(req.user.id) || false,
//         isBookmarked: poem.bookmarkedBy?.includes(req.user.id) || false
//       };
//     }

//     const responseData = {
//       ...poem,
//       userInteraction,
//       author: poem.author ? {
//         _id: poem.author._id,
//         name: poem.author.name || 'Unknown Author',
//         slug: poem.author.slug || '#',
//         avatar: poem.author.avatar || null,
//         bio: poem.author.bio || null,
//         nameUrdu: poem.author.nameUrdu || null,
//         era: poem.author.era || null
//       } : null,
//       formattedDate: poem.createdAt ? new Date(poem.createdAt).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//       }) : null
//     };

//     console.log('Poem found:', {
//       id: poem._id,
//       title: poem.title,
//       slug: poem.slug,
//       language: poem.language,
//       authorName: poem.author?.name
//     });

//     successResponse(res, responseData);
//   } catch (error) {
//     console.error('Error in getPoemBySlug:', error);
//     next(error);
//   }
// };

// // ============================================
// // UPDATED: CREATE POEM with Hindi support
// // ============================================
// export const createPoem = async (req, res, next) => {
//   try {
//     console.log('Creating poem with data:', JSON.stringify(req.body, null, 2));
    
//     const { 
//       title, 
//       content, 
//       contentHindi, 
//       author, 
//       genre, 
//       slug, 
//       language 
//     } = req.body;
    
//     // Validate title
//     if (!title || !title.trim()) {
//       return errorResponse(res, 'Title is required', 400);
//     }
    
//     // Validate content based on language
//     const poemLanguage = language || 'urdu';
    
//     if (poemLanguage === 'hindi') {
//       if (!contentHindi || !contentHindi.trim()) {
//         return errorResponse(res, 'Hindi content is required', 400);
//       }
//     } else if (poemLanguage === 'urdu') {
//       if (!content || !content.trim()) {
//         return errorResponse(res, 'Urdu content is required', 400);
//       }
//     } else {
//       if (!content || !content.trim()) {
//         return errorResponse(res, 'Content is required', 400);
//       }
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

//     // Prepare poem data based on language
//     const poemData = {
//       title: title.trim(),
//       genre: genre,
//       language: poemLanguage,
//       author: author,
//       era: req.body.era || 'modern',
//       tags: req.body.tags || [],
//       mood: req.body.mood,
//       isPublished: req.body.isPublished || false,
//       publishedAt: req.body.isPublished ? new Date() : null,
//       isFeatured: req.body.isFeatured || false,
//       createdBy: req.user.id,
//       transliteration: req.body.transliteration || '',
//       translation: {
//         english: req.body.translation?.english || '',
//         hindi: req.body.translation?.hindi || ''
//       }
//     };
    
//     // Set content based on language
//     if (poemLanguage === 'hindi') {
//       poemData.content = contentHindi?.trim() || '';
//       poemData.contentHindi = contentHindi?.trim() || '';
//       poemData.contentUrdu = '';
//     } else if (poemLanguage === 'urdu') {
//       poemData.content = content?.trim() || '';
//       poemData.contentUrdu = content?.trim() || '';
//       poemData.contentHindi = '';
//     } else {
//       // English or other languages
//       poemData.content = content?.trim() || '';
//       poemData.contentUrdu = '';
//       poemData.contentHindi = '';
//     }
    
//     // Handle slug
//     if (slug && slug.trim()) {
//       poemData.slug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     }

//     const poem = await Poem.create(poemData);
    
//     // Update author stats
//     await Author.findByIdAndUpdate(author, {
//       $inc: { 'stats.poemsCount': 1 }
//     });

//     await cacheDelete('cache:/api/poems:*');
    
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
//       return errorResponse(res, 'A poem with this slug already exists. Please use a different slug.', 400);
//     }
    
//     next(error);
//   }
// };

// // ============================================
// // UPDATED: UPDATE POEM with Hindi support
// // ============================================
// export const updatePoem = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     console.log('Updating poem with slug:', slug);
//     console.log('Update data:', JSON.stringify(req.body, null, 2));
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     // Handle author change
//     if (req.body.author && req.body.author !== poem.author.toString()) {
//       const authorExists = await Author.findById(req.body.author);
//       if (!authorExists) {
//         return errorResponse(res, 'New author not found', 404);
//       }
      
//       await Author.findByIdAndUpdate(poem.author, { $inc: { 'stats.poemsCount': -1 } });
//       await Author.findByIdAndUpdate(req.body.author, { $inc: { 'stats.poemsCount': 1 } });
//     }

//     // Get the language from request or keep existing
//     const updateLanguage = req.body.language || poem.language;
    
//     const updateData = {
//       title: req.body.title || poem.title,
//       genre: req.body.genre || poem.genre,
//       language: updateLanguage,
//       author: req.body.author || poem.author,
//       era: req.body.era || poem.era,
//       tags: req.body.tags || poem.tags,
//       mood: req.body.mood || poem.mood,
//       isPublished: req.body.isPublished !== undefined ? req.body.isPublished : poem.isPublished,
//       isFeatured: req.body.isFeatured !== undefined ? req.body.isFeatured : poem.isFeatured,
//       transliteration: req.body.transliteration || poem.transliteration,
//       translation: {
//         english: req.body.translation?.english || poem.translation?.english,
//         hindi: req.body.translation?.hindi || poem.translation?.hindi
//       }
//     };

//     // Update content based on language
//     if (updateLanguage === 'hindi') {
//       updateData.contentHindi = req.body.contentHindi || req.body.content || poem.contentHindi;
//       updateData.content = updateData.contentHindi;
//       updateData.contentUrdu = '';
//     } else if (updateLanguage === 'urdu') {
//       updateData.contentUrdu = req.body.contentUrdu || req.body.content || poem.contentUrdu;
//       updateData.content = updateData.contentUrdu;
//       updateData.contentHindi = '';
//     } else {
//       updateData.content = req.body.content || poem.content;
//       updateData.contentUrdu = '';
//       updateData.contentHindi = '';
//     }

//     if (updateData.isPublished && !poem.isPublished) {
//       updateData.publishedAt = new Date();
//     }

//     // Handle slug update if title changed
//     if (req.body.title && req.body.title !== poem.title) {
//       let newSlug = slugify(req.body.title, { lower: true, strict: true });
      
//       const existingPoem = await Poem.findOne({ 
//         slug: newSlug, 
//         _id: { $ne: poem._id } 
//       });
      
//       if (existingPoem) {
//         let counter = 1;
//         let finalSlug = `${newSlug}-${counter}`;
//         while (await Poem.findOne({ slug: finalSlug, _id: { $ne: poem._id } })) {
//           counter++;
//           finalSlug = `${newSlug}-${counter}`;
//         }
//         updateData.slug = finalSlug;
//       } else {
//         updateData.slug = newSlug;
//       }
//     }

//     // Handle direct slug update
//     if (req.body.slug && req.body.slug !== poem.slug) {
//       const cleanSlug = req.body.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
//       const existingPoem = await Poem.findOne({ 
//         slug: cleanSlug, 
//         _id: { $ne: poem._id } 
//       });
      
//       if (existingPoem) {
//         return errorResponse(res, 'Slug already exists. Please choose a different slug.', 400);
//       }
//       updateData.slug = cleanSlug;
//     }

//     const updatedPoem = await Poem.findByIdAndUpdate(
//       poem._id,
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

// // ============================================
// // DELETE POEM (unchanged)
// // ============================================
// export const deletePoem = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     console.log('Deleting poem with slug:', slug);
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     await Author.findByIdAndUpdate(poem.author, {
//       $inc: { 'stats.poemsCount': -1 }
//     });
    
//     await Poem.findByIdAndDelete(poem._id);
//     await cacheDelete('cache:/api/poems:*');
//     successResponse(res, null, 'Poem deleted successfully');
//   } catch (error) {
//     console.error('Error deleting poem:', error);
//     next(error);
//   }
// };

// // ============================================
// // LIKE POEM (unchanged)
// // ============================================
// export const likePoem = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     const userId = req.user.id;
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     if (poem.likedBy.includes(userId)) {
//       poem.likedBy.pull(userId);
//       poem.stats.likes -= 1;
//     } else {
//       poem.likedBy.push(userId);
//       poem.stats.likes += 1;
//     }

//     await poem.save();
//     successResponse(res, { 
//       liked: poem.likedBy.includes(userId), 
//       likes: poem.stats.likes 
//     });
//   } catch (error) {
//     console.error('Error in likePoem:', error);
//     next(error);
//   }
// };

// // ============================================
// // BOOKMARK POEM (unchanged)
// // ============================================
// export const bookmarkPoem = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     const userId = req.user.id;
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     if (poem.bookmarkedBy.includes(userId)) {
//       poem.bookmarkedBy.pull(userId);
//       poem.stats.bookmarks -= 1;
//     } else {
//       poem.bookmarkedBy.push(userId);
//       poem.stats.bookmarks += 1;
//     }

//     await poem.save();
//     successResponse(res, { 
//       bookmarked: poem.bookmarkedBy.includes(userId), 
//       bookmarks: poem.stats.bookmarks 
//     });
//   } catch (error) {
//     console.error('Error in bookmarkPoem:', error);
//     next(error);
//   }
// };

// // ============================================
// // ADD COMMENT (unchanged)
// // ============================================
// export const addComment = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     const { text } = req.body;
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     poem.comments.push({
//       user: req.user.id,
//       text: text
//     });
//     poem.stats.comments += 1;
//     await poem.save();

//     await poem.populate('comments.user', 'name avatar');
    
//     successResponse(res, poem.comments, 'Comment added');
//   } catch (error) {
//     console.error('Error in addComment:', error);
//     next(error);
//   }
// };

// // ============================================
// // GET FEATURED POEMS (unchanged)
// // ============================================
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

// // ============================================
// // GET TRENDING POEMS (unchanged)
// // ============================================
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

// // ============================================
// // GET POEMS BY AUTHOR (unchanged)
// // ============================================
// export const getPoemsByAuthor = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);
//     const { authorId } = req.params;

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

// // ============================================
// // GET AI EXPLANATION (unchanged)
// // ============================================
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

// // ============================================
// // GET RELATED POEMS (unchanged)
// // ============================================
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

// // ============================================
// // AI FEATURE FUNCTIONS (unchanged)
// // ============================================

// // SENTIMENT ANALYSIS
// export const getPoemSentiment = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     // Check cache first (24 hours)
//     if (poem.sentimentAnalysis && poem.sentimentAnalysis.analyzedAt) {
//       const hoursSince = (Date.now() - new Date(poem.sentimentAnalysis.analyzedAt)) / (1000 * 60 * 60);
//       if (hoursSince < 24) {
//         return successResponse(res, poem.sentimentAnalysis);
//       }
//     }
    
//     // Get content based on language
//     let content = '';
//     if (poem.language === 'hindi') {
//       content = poem.contentHindi || poem.content || '';
//     } else {
//       content = poem.contentUrdu || poem.content || '';
//     }
    
//     const analysis = analyzeSentiment(content);
    
//     poem.sentimentAnalysis = {
//       ...analysis,
//       analyzedAt: new Date()
//     };
//     await poem.save();
    
//     successResponse(res, poem.sentimentAnalysis);
//   } catch (error) {
//     console.error('Error in getPoemSentiment:', error);
//     successResponse(res, {
//       sentiment: 'neutral',
//       score: 0,
//       confidence: 0,
//       emotions: { joy: 0, sadness: 0, anger: 0, fear: 0, love: 0, neutral: 100 },
//       dominantEmotion: 'neutral',
//       summary: 'Sentiment analysis temporarily unavailable',
//       isFallback: true
//     });
//   }
// };

// // THEME EXTRACTION
// export const getPoemThemes = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     if (poem.themeAnalysis && poem.themeAnalysis.analyzedAt) {
//       const hoursSince = (Date.now() - new Date(poem.themeAnalysis.analyzedAt)) / (1000 * 60 * 60);
//       if (hoursSince < 24) {
//         return successResponse(res, poem.themeAnalysis);
//       }
//     }
    
//     // Get content based on language
//     let content = '';
//     if (poem.language === 'hindi') {
//       content = poem.contentHindi || poem.content || '';
//     } else {
//       content = poem.contentUrdu || poem.content || '';
//     }
    
//     const themes = extractThemes(content);
    
//     poem.themeAnalysis = {
//       ...themes,
//       analyzedAt: new Date()
//     };
//     await poem.save();
    
//     successResponse(res, poem.themeAnalysis);
//   } catch (error) {
//     console.error('Error in getPoemThemes:', error);
//     successResponse(res, {
//       dominant: 'neutral',
//       themes: [],
//       tags: [],
//       themeCount: 0,
//       isFallback: true
//     });
//   }
// };

// // FULL AI LITERARY ANALYSIS
// export const getAIAnalysis = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     const forceRefresh = req.query.refresh === 'true';
    
//     console.log('🔍 AI Analysis requested for slug:', slug, 'refresh:', forceRefresh);
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     const hasValidCache = !forceRefresh && 
//                           poem.aiAnalysis && 
//                           poem.aiAnalysis.analyzedAt &&
//                           poem.aiAnalysis.themes &&
//                           poem.aiAnalysis.themes.length > 0;
    
//     if (hasValidCache) {
//       const hoursSince = (Date.now() - new Date(poem.aiAnalysis.analyzedAt)) / (1000 * 60 * 60);
//       if (hoursSince < 24) {
//         console.log('✅ Returning cached AI analysis');
//         return successResponse(res, poem.aiAnalysis);
//       }
//     }
    
//     console.log('🔄 Generating fresh AI analysis...');
    
//     // Get content based on language
//     let content = '';
//     if (poem.language === 'hindi') {
//       content = poem.contentHindi || poem.content || '';
//     } else {
//       content = poem.contentUrdu || poem.content || '';
//     }
    
//     const result = await aiAnalyzePoem(content, poem.language || 'urdu');
    
//     if (result.success && result.analysis) {
//       const analysis = {
//         themes: result.analysis.themes || ['Poetry', 'Emotion', 'Expression'],
//         tone: result.analysis.tone || 'Expressive',
//         sentiment: result.analysis.sentiment || 'neutral',
//         emotions: result.analysis.emotions || ['Thoughtful', 'Reflective'],
//         meaning: result.analysis.meaning || 'This poem expresses deep emotions through beautiful imagery.',
//         literaryDevices: result.analysis.literaryDevices || ['Imagery', 'Metaphor', 'Rhyme'],
//         rhymeScheme: result.analysis.rhymeScheme || 'Rhythmic pattern',
//         difficulty: result.analysis.difficulty || 'intermediate',
//         provider: result.provider === 'gemini' ? 'Gemini AI' : 'ZauqApp AI',
//         analyzedAt: new Date(),
//         modelUsed: result.provider
//       };
      
//       poem.aiAnalysis = analysis;
//       await poem.save();
      
//       console.log('💾 AI analysis cached successfully');
//       return successResponse(res, analysis);
//     } else {
//       console.error('❌ AI analysis failed:', result.error);
      
//       const content = (poem.contentHindi || poem.contentUrdu || poem.content) || '';
//       const isKarbalaPoem = content.includes('حسین') || content.includes('Hussain') || content.includes('Karbala');
      
//       const fallbackAnalysis = {
//         themes: isKarbalaPoem 
//           ? ['Karbala', 'Sacrifice', 'Martyrdom', 'Devotion', 'Spirituality']
//           : ['Love', 'Nature', 'Spirituality', 'Emotion', 'Reflection'],
//         tone: isKarbalaPoem ? 'Tragic and Heroic' : 'Contemplative and Expressive',
//         sentiment: isKarbalaPoem ? 'sorrowful' : 'positive',
//         emotions: isKarbalaPoem 
//           ? ['Grief', 'Devotion', 'Sorrow', 'Hope', 'Faith']
//           : ['Joy', 'Peace', 'Hope', 'Love', 'Wonder'],
//         meaning: isKarbalaPoem
//           ? 'یہ مرثیہ حضرت امام حسین علیہ السلام اور شہدائے کربلا کی عظمت، صبر اور استقامت کو خراج تحسین پیش کرتا ہے۔'
//           : 'This poem beautifully expresses deep emotions and human experiences through powerful imagery.',
//         literaryDevices: ['Imagery', 'Metaphor', 'Repetition', 'Symbolism', 'Rhyme'],
//         rhymeScheme: 'AABB and ABAB patterns',
//         difficulty: 'intermediate',
//         provider: 'ZauqApp AI',
//         isFallback: true,
//         analyzedAt: new Date()
//       };
      
//       return successResponse(res, fallbackAnalysis);
//     }
//   } catch (error) {
//     console.error('Error in getAIAnalysis:', error);
    
//     successResponse(res, {
//       themes: ['Analysis temporarily unavailable'],
//       tone: 'Unknown',
//       sentiment: 'neutral',
//       emotions: [],
//       meaning: 'We are experiencing high demand. Please try again later.',
//       literaryDevices: [],
//       rhymeScheme: 'Not detected',
//       difficulty: 'intermediate',
//       isFallback: true,
//       provider: 'fallback',
//       analyzedAt: new Date()
//     });
//   }
// };

// // ANALYZE POEM CONTENT DIRECTLY
// export const analyzePoemContent = async (req, res, next) => {
//   try {
//     const { poemText, language = 'urdu' } = req.body;
    
//     if (!poemText || poemText.trim().length < 10) {
//       return errorResponse(res, 'Poem text is required (minimum 10 characters)', 400);
//     }
    
//     console.log('🔍 Analyzing poem content directly...');
//     const result = await aiAnalyzePoem(poemText, language);
    
//     if (result.success && result.analysis) {
//       successResponse(res, {
//         analysis: {
//           themes: result.analysis.themes || ['Poetry', 'Emotion', 'Expression'],
//           tone: result.analysis.tone || 'Expressive',
//           sentiment: result.analysis.sentiment || 'neutral',
//           emotions: result.analysis.emotions || ['Thoughtful', 'Reflective'],
//           meaning: result.analysis.meaning || 'This poem expresses deep emotions through beautiful imagery.',
//           literaryDevices: result.analysis.literaryDevices || ['Imagery', 'Metaphor', 'Rhyme'],
//           rhymeScheme: result.analysis.rhymeScheme || 'Rhythmic pattern',
//           difficulty: result.analysis.difficulty || 'intermediate'
//         },
//         provider: result.provider
//       });
//     } else {
//       const isKarbalaPoem = poemText.includes('حسین') || poemText.includes('Hussain') || poemText.includes('Karbala');
      
//       successResponse(res, {
//         analysis: {
//           themes: isKarbalaPoem 
//             ? ['Karbala', 'Sacrifice', 'Martyrdom', 'Devotion']
//             : ['Poetry', 'Emotion', 'Expression'],
//           tone: isKarbalaPoem ? 'Tragic' : 'Expressive',
//           sentiment: isKarbalaPoem ? 'sorrowful' : 'positive',
//           emotions: isKarbalaPoem ? ['Grief', 'Devotion'] : ['Joy', 'Peace'],
//           meaning: isKarbalaPoem
//             ? 'This poem honors the sacrifice and devotion of Karbala.'
//             : 'This poem expresses deep emotions through beautiful imagery.',
//           literaryDevices: ['Imagery', 'Metaphor', 'Rhyme'],
//           rhymeScheme: 'Rhythmic pattern',
//           difficulty: 'intermediate'
//         },
//         provider: 'fallback',
//         warning: result.error || 'Using fallback analysis'
//       });
//     }
//   } catch (error) {
//     console.error('Error in analyzePoemContent:', error);
    
//     successResponse(res, {
//       analysis: {
//         themes: ['Poetry analysis'],
//         tone: 'Expressive',
//         sentiment: 'neutral',
//         emotions: ['contemplative'],
//         meaning: 'This poem expresses deep emotions through poetic language.',
//         literaryDevices: ['Imagery', 'Metaphor'],
//         rhymeScheme: 'Rhythmic pattern',
//         difficulty: 'intermediate'
//       },
//       provider: 'fallback',
//       warning: 'Using fallback analysis. Please try again for detailed AI analysis.'
//     });
//   }
// };

















// // server/controllers/poem.controller.js

// import Poem from '../models/Poem.js';
// import Author from '../models/Author.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination, getSort, getFilters } from '../utils/pagination.js';
// import { generatePoemExplanation } from '../utils/aiService.js';
// import { cacheDelete } from '../config/redis.js';
// import slugify from 'slugify';

// // ============================================
// // 🔴 NEW: Import AI Services and Transliteration
// // ============================================
// import { analyzeSentiment } from '../services/sentimentService.js';
// import { extractThemes } from '../services/themeExtractor.js';
// import { analyzePoem as aiAnalyzePoem } from '../services/aiOrchestrator.js';
// import { autoTransliteratePoem } from '../services/transliterationService.js';

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
//       .populate('author', 'name slug avatar bio nameUrdu')
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
    
//     if (!slug) {
//       return errorResponse(res, 'Slug is required', 400);
//     }

//     const poem = await Poem.findOne({ slug })
//       .populate('author', 'name slug avatar bio nameUrdu nameHindi birthDate deathDate era')
//       .populate('category', 'name slug')
//       .lean();

//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     if (!poem.isPublished && (!req.user || req.user.role !== 'admin')) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     // Increment views
//     await Poem.updateOne({ _id: poem._id }, { $inc: { 'stats.views': 1 } });
//     poem.stats.views += 1;

//     let userInteraction = {};
//     if (req.user) {
//       userInteraction = {
//         isLiked: poem.likedBy?.includes(req.user.id) || false,
//         isBookmarked: poem.bookmarkedBy?.includes(req.user.id) || false
//       };
//     }

//     const responseData = {
//       ...poem,
//       userInteraction,
//       author: poem.author ? {
//         _id: poem.author._id,
//         name: poem.author.name || 'Unknown Author',
//         slug: poem.author.slug || '#',
//         avatar: poem.author.avatar || null,
//         bio: poem.author.bio || null,
//         nameUrdu: poem.author.nameUrdu || null,
//         era: poem.author.era || null
//       } : null,
//       formattedDate: poem.createdAt ? new Date(poem.createdAt).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//       }) : null
//     };

//     console.log('Poem found:', {
//       id: poem._id,
//       title: poem.title,
//       slug: poem.slug,
//       language: poem.language,
//       authorName: poem.author?.name
//     });

//     successResponse(res, responseData);
//   } catch (error) {
//     console.error('Error in getPoemBySlug:', error);
//     next(error);
//   }
// };

// // ============================================
// // UPDATED: CREATE POEM with Hindi support & Auto-Transliteration
// // ============================================
// export const createPoem = async (req, res, next) => {
//   try {
//     console.log('Creating poem with data:', JSON.stringify(req.body, null, 2));
    
//     const { 
//       title, 
//       content, 
//       contentHindi, 
//       author, 
//       genre, 
//       slug, 
//       language,
//       autoTransliterate = true  // Default to true
//     } = req.body;
    
//     // Validate title
//     if (!title || !title.trim()) {
//       return errorResponse(res, 'Title is required', 400);
//     }
    
//     // Validate content based on language
//     const poemLanguage = language || 'urdu';
    
//     if (poemLanguage === 'hindi') {
//       if (!contentHindi || !contentHindi.trim()) {
//         return errorResponse(res, 'Hindi content is required', 400);
//       }
//     } else if (poemLanguage === 'urdu') {
//       if (!content || !content.trim()) {
//         return errorResponse(res, 'Urdu content is required', 400);
//       }
//     } else {
//       if (!content || !content.trim()) {
//         return errorResponse(res, 'Content is required', 400);
//       }
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

//     // Prepare poem data based on language
//     const poemData = {
//       title: title.trim(),
//       genre: genre,
//       language: poemLanguage,
//       author: author,
//       era: req.body.era || 'modern',
//       tags: req.body.tags || [],
//       mood: req.body.mood,
//       isPublished: req.body.isPublished || false,
//       publishedAt: req.body.isPublished ? new Date() : null,
//       isFeatured: req.body.isFeatured || false,
//       createdBy: req.user.id,
//       transliteration: req.body.transliteration || '',
//       translation: {
//         english: req.body.translation?.english || '',
//         hindi: req.body.translation?.hindi || ''
//       },
//       autoTransliterate: autoTransliterate  // Set auto-transliteration flag
//     };
    
//     // Set content based on language
//     if (poemLanguage === 'hindi') {
//       poemData.content = contentHindi?.trim() || '';
//       poemData.contentHindi = contentHindi?.trim() || '';
//       poemData.contentUrdu = '';
//     } else if (poemLanguage === 'urdu') {
//       poemData.content = content?.trim() || '';
//       poemData.contentUrdu = content?.trim() || '';
//       poemData.contentHindi = '';
//     } else {
//       // English or other languages
//       poemData.content = content?.trim() || '';
//       poemData.contentUrdu = '';
//       poemData.contentHindi = '';
//     }
    
//     // Handle slug
//     if (slug && slug.trim()) {
//       poemData.slug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     }

//     const poem = await Poem.create(poemData);
    
//     // ============================================
//     // NEW: Auto-generate transliteration
//     // ============================================
//     if (autoTransliterate && (poemLanguage === 'urdu' || poemLanguage === 'hindi')) {
//       console.log(`🔄 Auto-generating transliteration for ${poem.title}...`);
//       const translitResult = await autoTransliteratePoem(poem);
//       if (translitResult.success) {
//         console.log(`✅ Auto-transliteration generated using ${translitResult.method}`);
//       } else {
//         console.log(`⚠️ Auto-transliteration failed: ${translitResult.error}`);
//       }
//     }
    
//     // Update author stats
//     await Author.findByIdAndUpdate(author, {
//       $inc: { 'stats.poemsCount': 1 }
//     });

//     await cacheDelete('cache:/api/poems:*');
    
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
//       return errorResponse(res, 'A poem with this slug already exists. Please use a different slug.', 400);
//     }
    
//     next(error);
//   }
// };

// // ============================================
// // UPDATED: UPDATE POEM with Hindi support & Auto-Transliteration
// // ============================================
// export const updatePoem = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     console.log('Updating poem with slug:', slug);
//     console.log('Update data:', JSON.stringify(req.body, null, 2));
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     // Track if content changed (for transliteration regeneration)
//     let contentChanged = false;

//     // Handle author change
//     if (req.body.author && req.body.author !== poem.author.toString()) {
//       const authorExists = await Author.findById(req.body.author);
//       if (!authorExists) {
//         return errorResponse(res, 'New author not found', 404);
//       }
      
//       await Author.findByIdAndUpdate(poem.author, { $inc: { 'stats.poemsCount': -1 } });
//       await Author.findByIdAndUpdate(req.body.author, { $inc: { 'stats.poemsCount': 1 } });
//     }

//     // Get the language from request or keep existing
//     const updateLanguage = req.body.language || poem.language;
    
//     const updateData = {
//       title: req.body.title || poem.title,
//       genre: req.body.genre || poem.genre,
//       language: updateLanguage,
//       author: req.body.author || poem.author,
//       era: req.body.era || poem.era,
//       tags: req.body.tags || poem.tags,
//       mood: req.body.mood || poem.mood,
//       isPublished: req.body.isPublished !== undefined ? req.body.isPublished : poem.isPublished,
//       isFeatured: req.body.isFeatured !== undefined ? req.body.isFeatured : poem.isFeatured,
//       transliteration: req.body.transliteration || poem.transliteration,
//       translation: {
//         english: req.body.translation?.english || poem.translation?.english,
//         hindi: req.body.translation?.hindi || poem.translation?.hindi
//       },
//       autoTransliterate: req.body.autoTransliterate !== undefined ? req.body.autoTransliterate : poem.autoTransliterate
//     };

//     // Update content based on language and track changes
//     if (updateLanguage === 'hindi') {
//       const newContentHindi = req.body.contentHindi || req.body.content || poem.contentHindi;
//       if (newContentHindi !== poem.contentHindi) {
//         contentChanged = true;
//       }
//       updateData.contentHindi = newContentHindi;
//       updateData.content = updateData.contentHindi;
//       updateData.contentUrdu = '';
//     } else if (updateLanguage === 'urdu') {
//       const newContentUrdu = req.body.contentUrdu || req.body.content || poem.contentUrdu;
//       if (newContentUrdu !== poem.contentUrdu) {
//         contentChanged = true;
//       }
//       updateData.contentUrdu = newContentUrdu;
//       updateData.content = updateData.contentUrdu;
//       updateData.contentHindi = '';
//     } else {
//       const newContent = req.body.content || poem.content;
//       if (newContent !== poem.content) {
//         contentChanged = true;
//       }
//       updateData.content = newContent;
//       updateData.contentUrdu = '';
//       updateData.contentHindi = '';
//     }

//     if (updateData.isPublished && !poem.isPublished) {
//       updateData.publishedAt = new Date();
//     }

//     // Handle slug update if title changed
//     if (req.body.title && req.body.title !== poem.title) {
//       let newSlug = slugify(req.body.title, { lower: true, strict: true });
      
//       const existingPoem = await Poem.findOne({ 
//         slug: newSlug, 
//         _id: { $ne: poem._id } 
//       });
      
//       if (existingPoem) {
//         let counter = 1;
//         let finalSlug = `${newSlug}-${counter}`;
//         while (await Poem.findOne({ slug: finalSlug, _id: { $ne: poem._id } })) {
//           counter++;
//           finalSlug = `${newSlug}-${counter}`;
//         }
//         updateData.slug = finalSlug;
//       } else {
//         updateData.slug = newSlug;
//       }
//     }

//     // Handle direct slug update
//     if (req.body.slug && req.body.slug !== poem.slug) {
//       const cleanSlug = req.body.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
//       const existingPoem = await Poem.findOne({ 
//         slug: cleanSlug, 
//         _id: { $ne: poem._id } 
//       });
      
//       if (existingPoem) {
//         return errorResponse(res, 'Slug already exists. Please choose a different slug.', 400);
//       }
//       updateData.slug = cleanSlug;
//     }

//     const updatedPoem = await Poem.findByIdAndUpdate(
//       poem._id,
//       updateData,
//       { new: true, runValidators: true }
//     ).populate('author', 'name slug avatar');

//     // ============================================
//     // NEW: Auto-generate transliteration if content changed
//     // ============================================
//     if (contentChanged && updatedPoem.autoTransliterate && 
//         (updatedPoem.language === 'urdu' || updatedPoem.language === 'hindi')) {
//       console.log(`🔄 Content changed, auto-generating transliteration for ${updatedPoem.title}...`);
//       const translitResult = await autoTransliteratePoem(updatedPoem, true);
//       if (translitResult.success) {
//         console.log(`✅ Auto-transliteration updated using ${translitResult.method}`);
//         // Refresh the poem data to include the new transliteration
//         await updatedPoem.reload();
//       } else {
//         console.log(`⚠️ Auto-transliteration failed: ${translitResult.error}`);
//       }
//     }

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

// // ============================================
// // DELETE POEM (unchanged)
// // ============================================
// export const deletePoem = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     console.log('Deleting poem with slug:', slug);
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     await Author.findByIdAndUpdate(poem.author, {
//       $inc: { 'stats.poemsCount': -1 }
//     });
    
//     await Poem.findByIdAndDelete(poem._id);
//     await cacheDelete('cache:/api/poems:*');
//     successResponse(res, null, 'Poem deleted successfully');
//   } catch (error) {
//     console.error('Error deleting poem:', error);
//     next(error);
//   }
// };

// // ============================================
// // LIKE POEM (unchanged)
// // ============================================
// export const likePoem = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     const userId = req.user.id;
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     if (poem.likedBy.includes(userId)) {
//       poem.likedBy.pull(userId);
//       poem.stats.likes -= 1;
//     } else {
//       poem.likedBy.push(userId);
//       poem.stats.likes += 1;
//     }

//     await poem.save();
//     successResponse(res, { 
//       liked: poem.likedBy.includes(userId), 
//       likes: poem.stats.likes 
//     });
//   } catch (error) {
//     console.error('Error in likePoem:', error);
//     next(error);
//   }
// };

// // ============================================
// // BOOKMARK POEM (unchanged)
// // ============================================
// export const bookmarkPoem = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     const userId = req.user.id;
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     if (poem.bookmarkedBy.includes(userId)) {
//       poem.bookmarkedBy.pull(userId);
//       poem.stats.bookmarks -= 1;
//     } else {
//       poem.bookmarkedBy.push(userId);
//       poem.stats.bookmarks += 1;
//     }

//     await poem.save();
//     successResponse(res, { 
//       bookmarked: poem.bookmarkedBy.includes(userId), 
//       bookmarks: poem.stats.bookmarks 
//     });
//   } catch (error) {
//     console.error('Error in bookmarkPoem:', error);
//     next(error);
//   }
// };

// // ============================================
// // ADD COMMENT (unchanged)
// // ============================================
// export const addComment = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     const { text } = req.body;
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     poem.comments.push({
//       user: req.user.id,
//       text: text
//     });
//     poem.stats.comments += 1;
//     await poem.save();

//     await poem.populate('comments.user', 'name avatar');
    
//     successResponse(res, poem.comments, 'Comment added');
//   } catch (error) {
//     console.error('Error in addComment:', error);
//     next(error);
//   }
// };

// // ============================================
// // GET FEATURED POEMS (unchanged)
// // ============================================
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

// // ============================================
// // GET TRENDING POEMS (unchanged)
// // ============================================
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

// // ============================================
// // GET POEMS BY AUTHOR (unchanged)
// // ============================================
// export const getPoemsByAuthor = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);
//     const { authorId } = req.params;

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

// // ============================================
// // GET AI EXPLANATION (unchanged)
// // ============================================
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

// // ============================================
// // GET RELATED POEMS (unchanged)
// // ============================================
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

// // ============================================
// // AI FEATURE FUNCTIONS (unchanged below)
// // ============================================

// // SENTIMENT ANALYSIS
// export const getPoemSentiment = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     if (poem.sentimentAnalysis && poem.sentimentAnalysis.analyzedAt) {
//       const hoursSince = (Date.now() - new Date(poem.sentimentAnalysis.analyzedAt)) / (1000 * 60 * 60);
//       if (hoursSince < 24) {
//         return successResponse(res, poem.sentimentAnalysis);
//       }
//     }
    
//     let content = '';
//     if (poem.language === 'hindi') {
//       content = poem.contentHindi || poem.content || '';
//     } else {
//       content = poem.contentUrdu || poem.content || '';
//     }
    
//     const analysis = analyzeSentiment(content);
    
//     poem.sentimentAnalysis = {
//       ...analysis,
//       analyzedAt: new Date()
//     };
//     await poem.save();
    
//     successResponse(res, poem.sentimentAnalysis);
//   } catch (error) {
//     console.error('Error in getPoemSentiment:', error);
//     successResponse(res, {
//       sentiment: 'neutral',
//       score: 0,
//       confidence: 0,
//       emotions: { joy: 0, sadness: 0, anger: 0, fear: 0, love: 0, neutral: 100 },
//       dominantEmotion: 'neutral',
//       summary: 'Sentiment analysis temporarily unavailable',
//       isFallback: true
//     });
//   }
// };

// // THEME EXTRACTION
// export const getPoemThemes = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     if (poem.themeAnalysis && poem.themeAnalysis.analyzedAt) {
//       const hoursSince = (Date.now() - new Date(poem.themeAnalysis.analyzedAt)) / (1000 * 60 * 60);
//       if (hoursSince < 24) {
//         return successResponse(res, poem.themeAnalysis);
//       }
//     }
    
//     let content = '';
//     if (poem.language === 'hindi') {
//       content = poem.contentHindi || poem.content || '';
//     } else {
//       content = poem.contentUrdu || poem.content || '';
//     }
    
//     const themes = extractThemes(content);
    
//     poem.themeAnalysis = {
//       ...themes,
//       analyzedAt: new Date()
//     };
//     await poem.save();
    
//     successResponse(res, poem.themeAnalysis);
//   } catch (error) {
//     console.error('Error in getPoemThemes:', error);
//     successResponse(res, {
//       dominant: 'neutral',
//       themes: [],
//       tags: [],
//       themeCount: 0,
//       isFallback: true
//     });
//   }
// };

// // FULL AI LITERARY ANALYSIS
// export const getAIAnalysis = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     const forceRefresh = req.query.refresh === 'true';
    
//     console.log('🔍 AI Analysis requested for slug:', slug, 'refresh:', forceRefresh);
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     const hasValidCache = !forceRefresh && 
//                           poem.aiAnalysis && 
//                           poem.aiAnalysis.analyzedAt &&
//                           poem.aiAnalysis.themes &&
//                           poem.aiAnalysis.themes.length > 0;
    
//     if (hasValidCache) {
//       const hoursSince = (Date.now() - new Date(poem.aiAnalysis.analyzedAt)) / (1000 * 60 * 60);
//       if (hoursSince < 24) {
//         console.log('✅ Returning cached AI analysis');
//         return successResponse(res, poem.aiAnalysis);
//       }
//     }
    
//     console.log('🔄 Generating fresh AI analysis...');
    
//     let content = '';
//     if (poem.language === 'hindi') {
//       content = poem.contentHindi || poem.content || '';
//     } else {
//       content = poem.contentUrdu || poem.content || '';
//     }
    
//     const result = await aiAnalyzePoem(content, poem.language || 'urdu');
    
//     if (result.success && result.analysis) {
//       const analysis = {
//         themes: result.analysis.themes || ['Poetry', 'Emotion', 'Expression'],
//         tone: result.analysis.tone || 'Expressive',
//         sentiment: result.analysis.sentiment || 'neutral',
//         emotions: result.analysis.emotions || ['Thoughtful', 'Reflective'],
//         meaning: result.analysis.meaning || 'This poem expresses deep emotions through beautiful imagery.',
//         literaryDevices: result.analysis.literaryDevices || ['Imagery', 'Metaphor', 'Rhyme'],
//         rhymeScheme: result.analysis.rhymeScheme || 'Rhythmic pattern',
//         difficulty: result.analysis.difficulty || 'intermediate',
//         provider: result.provider === 'gemini' ? 'Gemini AI' : 'ZauqApp AI',
//         analyzedAt: new Date(),
//         modelUsed: result.provider
//       };
      
//       poem.aiAnalysis = analysis;
//       await poem.save();
      
//       console.log('💾 AI analysis cached successfully');
//       return successResponse(res, analysis);
//     } else {
//       console.error('❌ AI analysis failed:', result.error);
      
//       const content = (poem.contentHindi || poem.contentUrdu || poem.content) || '';
//       const isKarbalaPoem = content.includes('حسین') || content.includes('Hussain') || content.includes('Karbala');
      
//       const fallbackAnalysis = {
//         themes: isKarbalaPoem 
//           ? ['Karbala', 'Sacrifice', 'Martyrdom', 'Devotion', 'Spirituality']
//           : ['Love', 'Nature', 'Spirituality', 'Emotion', 'Reflection'],
//         tone: isKarbalaPoem ? 'Tragic and Heroic' : 'Contemplative and Expressive',
//         sentiment: isKarbalaPoem ? 'sorrowful' : 'positive',
//         emotions: isKarbalaPoem 
//           ? ['Grief', 'Devotion', 'Sorrow', 'Hope', 'Faith']
//           : ['Joy', 'Peace', 'Hope', 'Love', 'Wonder'],
//         meaning: isKarbalaPoem
//           ? 'یہ مرثیہ حضرت امام حسین علیہ السلام اور شہدائے کربلا کی عظمت، صبر اور استقامت کو خراج تحسین پیش کرتا ہے۔'
//           : 'This poem beautifully expresses deep emotions and human experiences through powerful imagery.',
//         literaryDevices: ['Imagery', 'Metaphor', 'Repetition', 'Symbolism', 'Rhyme'],
//         rhymeScheme: 'AABB and ABAB patterns',
//         difficulty: 'intermediate',
//         provider: 'ZauqApp AI',
//         isFallback: true,
//         analyzedAt: new Date()
//       };
      
//       return successResponse(res, fallbackAnalysis);
//     }
//   } catch (error) {
//     console.error('Error in getAIAnalysis:', error);
    
//     successResponse(res, {
//       themes: ['Analysis temporarily unavailable'],
//       tone: 'Unknown',
//       sentiment: 'neutral',
//       emotions: [],
//       meaning: 'We are experiencing high demand. Please try again later.',
//       literaryDevices: [],
//       rhymeScheme: 'Not detected',
//       difficulty: 'intermediate',
//       isFallback: true,
//       provider: 'fallback',
//       analyzedAt: new Date()
//     });
//   }
// };

// // ANALYZE POEM CONTENT DIRECTLY
// export const analyzePoemContent = async (req, res, next) => {
//   try {
//     const { poemText, language = 'urdu' } = req.body;
    
//     if (!poemText || poemText.trim().length < 10) {
//       return errorResponse(res, 'Poem text is required (minimum 10 characters)', 400);
//     }
    
//     console.log('🔍 Analyzing poem content directly...');
//     const result = await aiAnalyzePoem(poemText, language);
    
//     if (result.success && result.analysis) {
//       successResponse(res, {
//         analysis: {
//           themes: result.analysis.themes || ['Poetry', 'Emotion', 'Expression'],
//           tone: result.analysis.tone || 'Expressive',
//           sentiment: result.analysis.sentiment || 'neutral',
//           emotions: result.analysis.emotions || ['Thoughtful', 'Reflective'],
//           meaning: result.analysis.meaning || 'This poem expresses deep emotions through beautiful imagery.',
//           literaryDevices: result.analysis.literaryDevices || ['Imagery', 'Metaphor', 'Rhyme'],
//           rhymeScheme: result.analysis.rhymeScheme || 'Rhythmic pattern',
//           difficulty: result.analysis.difficulty || 'intermediate'
//         },
//         provider: result.provider
//       });
//     } else {
//       const isKarbalaPoem = poemText.includes('حسین') || poemText.includes('Hussain') || poemText.includes('Karbala');
      
//       successResponse(res, {
//         analysis: {
//           themes: isKarbalaPoem 
//             ? ['Karbala', 'Sacrifice', 'Martyrdom', 'Devotion']
//             : ['Poetry', 'Emotion', 'Expression'],
//           tone: isKarbalaPoem ? 'Tragic' : 'Expressive',
//           sentiment: isKarbalaPoem ? 'sorrowful' : 'positive',
//           emotions: isKarbalaPoem ? ['Grief', 'Devotion'] : ['Joy', 'Peace'],
//           meaning: isKarbalaPoem
//             ? 'This poem honors the sacrifice and devotion of Karbala.'
//             : 'This poem expresses deep emotions through beautiful imagery.',
//           literaryDevices: ['Imagery', 'Metaphor', 'Rhyme'],
//           rhymeScheme: 'Rhythmic pattern',
//           difficulty: 'intermediate'
//         },
//         provider: 'fallback',
//         warning: result.error || 'Using fallback analysis'
//       });
//     }
//   } catch (error) {
//     console.error('Error in analyzePoemContent:', error);
    
//     successResponse(res, {
//       analysis: {
//         themes: ['Poetry analysis'],
//         tone: 'Expressive',
//         sentiment: 'neutral',
//         emotions: ['contemplative'],
//         meaning: 'This poem expresses deep emotions through poetic language.',
//         literaryDevices: ['Imagery', 'Metaphor'],
//         rhymeScheme: 'Rhythmic pattern',
//         difficulty: 'intermediate'
//       },
//       provider: 'fallback',
//       warning: 'Using fallback analysis. Please try again for detailed AI analysis.'
//     });
//   }
// };

























// // working search
// // server/controllers/poem.controller.js

// import Poem from '../models/Poem.js';
// import Author from '../models/Author.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination, getSort, getFilters } from '../utils/pagination.js';
// import { generatePoemExplanation } from '../utils/aiService.js';
// import { cacheDelete } from '../config/redis.js';
// import slugify from 'slugify';

// // ============================================
// // 🔴 NEW: Import AI Services and Transliteration
// // ============================================
// import { analyzeSentiment } from '../services/sentimentService.js';
// import { extractThemes } from '../services/themeExtractor.js';
// import { analyzePoem as aiAnalyzePoem } from '../services/aiOrchestrator.js';
// import { autoTransliteratePoem } from '../services/transliterationService.js';

// // ============================================
// // FIXED: GET POEMS with enhanced search including author name
// // ============================================
// export const getPoems = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);
//     const sort = getSort(req);
//     const filters = getFilters(req, ['genre', 'language', 'mood', 'era', 'author']);
    
//     // Get search query from request
//     const searchQuery = req.query.search;
    
//     console.log('📡 getPoems called with:', { 
//       page, 
//       limit, 
//       search: searchQuery, 
//       filters, 
//       sort 
//     });
    
//     // Only show published poems for public, admin can see all
//     if (!req.user || req.user.role !== 'admin') {
//       filters.isPublished = true;
//     }
    
//     // ============================================
//     // ENHANCED SEARCH: Search by title, content, and author name
//     // ============================================
//     if (searchQuery && searchQuery.trim()) {
//       const searchTerm = searchQuery.trim();
//       console.log('🔍 Searching for:', searchTerm);
      
//       // Create case-insensitive regex for search
//       const searchRegex = new RegExp(searchTerm, 'i');
      
//       // First, find authors matching the search term
//       const matchingAuthors = await Author.find({
//         $or: [
//           { name: searchRegex },
//           { nameUrdu: searchRegex },
//           { nameHindi: searchRegex }
//         ]
//       }).select('_id');
      
//       const authorIds = matchingAuthors.map(a => a._id);
//       console.log(`📚 Found ${authorIds.length} authors matching "${searchTerm}"`);
      
//       // Build search filter with OR conditions
//       const searchFilter = {
//         $or: [
//           { title: searchRegex },
//           { content: searchRegex },
//           { contentUrdu: searchRegex },
//           { contentHindi: searchRegex },
//           { tags: { $in: [searchRegex] } }
//         ]
//       };
      
//       // Add author filter if any authors match
//       if (authorIds.length > 0) {
//         searchFilter.$or.push({ author: { $in: authorIds } });
//       }
      
//       // Merge with existing filters
//       Object.assign(filters, searchFilter);
//     }
    
//     console.log('🔍 Final filters:', JSON.stringify(filters, null, 2));
    
//     // Execute query with population
//     const poems = await Poem.find(filters)
//       .populate('author', 'name slug avatar bio nameUrdu nameHindi')
//       .populate('category', 'name slug')
//       .sort(sort)
//       .skip(skip)
//       .limit(limit);

//     const total = await Poem.countDocuments(filters);
    
//     console.log(`✅ Found ${poems.length} poems out of ${total} total`);
    
//     // Return paginated response
//     paginatedResponse(res, poems, { page, limit, total });
//   } catch (error) {
//     console.error('Error in getPoems:', error);
//     next(error);
//   }
// };

// // ============================================
// // GET SINGLE POEM BY SLUG (unchanged but kept for completeness)
// // ============================================
// export const getPoemBySlug = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     if (!slug) {
//       return errorResponse(res, 'Slug is required', 400);
//     }

//     const poem = await Poem.findOne({ slug })
//       .populate('author', 'name slug avatar bio nameUrdu nameHindi birthDate deathDate era')
//       .populate('category', 'name slug')
//       .lean();

//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     if (!poem.isPublished && (!req.user || req.user.role !== 'admin')) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     // Increment views
//     await Poem.updateOne({ _id: poem._id }, { $inc: { 'stats.views': 1 } });
//     poem.stats.views += 1;

//     let userInteraction = {};
//     if (req.user) {
//       userInteraction = {
//         isLiked: poem.likedBy?.includes(req.user.id) || false,
//         isBookmarked: poem.bookmarkedBy?.includes(req.user.id) || false
//       };
//     }

//     const responseData = {
//       ...poem,
//       userInteraction,
//       author: poem.author ? {
//         _id: poem.author._id,
//         name: poem.author.name || 'Unknown Author',
//         slug: poem.author.slug || '#',
//         avatar: poem.author.avatar || null,
//         bio: poem.author.bio || null,
//         nameUrdu: poem.author.nameUrdu || null,
//         era: poem.author.era || null
//       } : null,
//       formattedDate: poem.createdAt ? new Date(poem.createdAt).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//       }) : null
//     };

//     console.log('Poem found:', {
//       id: poem._id,
//       title: poem.title,
//       slug: poem.slug,
//       language: poem.language,
//       authorName: poem.author?.name
//     });

//     successResponse(res, responseData);
//   } catch (error) {
//     console.error('Error in getPoemBySlug:', error);
//     next(error);
//   }
// };

// // ============================================
// // CREATE POEM with Hindi support & Auto-Transliteration
// // ============================================
// export const createPoem = async (req, res, next) => {
//   try {
//     console.log('Creating poem with data:', JSON.stringify(req.body, null, 2));
    
//     const { 
//       title, 
//       content, 
//       contentHindi, 
//       author, 
//       genre, 
//       slug, 
//       language,
//       autoTransliterate = true  // Default to true
//     } = req.body;
    
//     // Validate title
//     if (!title || !title.trim()) {
//       return errorResponse(res, 'Title is required', 400);
//     }
    
//     // Validate content based on language
//     const poemLanguage = language || 'urdu';
    
//     if (poemLanguage === 'hindi') {
//       if (!contentHindi || !contentHindi.trim()) {
//         return errorResponse(res, 'Hindi content is required', 400);
//       }
//     } else if (poemLanguage === 'urdu') {
//       if (!content || !content.trim()) {
//         return errorResponse(res, 'Urdu content is required', 400);
//       }
//     } else {
//       if (!content || !content.trim()) {
//         return errorResponse(res, 'Content is required', 400);
//       }
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

//     // Prepare poem data based on language
//     const poemData = {
//       title: title.trim(),
//       genre: genre,
//       language: poemLanguage,
//       author: author,
//       era: req.body.era || 'modern',
//       tags: req.body.tags || [],
//       mood: req.body.mood,
//       isPublished: req.body.isPublished || false,
//       publishedAt: req.body.isPublished ? new Date() : null,
//       isFeatured: req.body.isFeatured || false,
//       createdBy: req.user.id,
//       transliteration: req.body.transliteration || '',
//       translation: {
//         english: req.body.translation?.english || '',
//         hindi: req.body.translation?.hindi || ''
//       },
//       autoTransliterate: autoTransliterate  // Set auto-transliteration flag
//     };
    
//     // Set content based on language
//     if (poemLanguage === 'hindi') {
//       poemData.content = contentHindi?.trim() || '';
//       poemData.contentHindi = contentHindi?.trim() || '';
//       poemData.contentUrdu = '';
//     } else if (poemLanguage === 'urdu') {
//       poemData.content = content?.trim() || '';
//       poemData.contentUrdu = content?.trim() || '';
//       poemData.contentHindi = '';
//     } else {
//       // English or other languages
//       poemData.content = content?.trim() || '';
//       poemData.contentUrdu = '';
//       poemData.contentHindi = '';
//     }
    
//     // Handle slug
//     if (slug && slug.trim()) {
//       poemData.slug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     }

//     const poem = await Poem.create(poemData);
    
//     // ============================================
//     // Auto-generate transliteration
//     // ============================================
//     if (autoTransliterate && (poemLanguage === 'urdu' || poemLanguage === 'hindi')) {
//       console.log(`🔄 Auto-generating transliteration for ${poem.title}...`);
//       const translitResult = await autoTransliteratePoem(poem);
//       if (translitResult.success) {
//         console.log(`✅ Auto-transliteration generated using ${translitResult.method}`);
//       } else {
//         console.log(`⚠️ Auto-transliteration failed: ${translitResult.error}`);
//       }
//     }
    
//     // Update author stats
//     await Author.findByIdAndUpdate(author, {
//       $inc: { 'stats.poemsCount': 1 }
//     });

//     await cacheDelete('cache:/api/poems:*');
    
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
//       return errorResponse(res, 'A poem with this slug already exists. Please use a different slug.', 400);
//     }
    
//     next(error);
//   }
// };

// // ============================================
// // UPDATE POEM with Hindi support & Auto-Transliteration
// // ============================================
// export const updatePoem = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     console.log('Updating poem with slug:', slug);
//     console.log('Update data:', JSON.stringify(req.body, null, 2));
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     // Track if content changed (for transliteration regeneration)
//     let contentChanged = false;

//     // Handle author change
//     if (req.body.author && req.body.author !== poem.author.toString()) {
//       const authorExists = await Author.findById(req.body.author);
//       if (!authorExists) {
//         return errorResponse(res, 'New author not found', 404);
//       }
      
//       await Author.findByIdAndUpdate(poem.author, { $inc: { 'stats.poemsCount': -1 } });
//       await Author.findByIdAndUpdate(req.body.author, { $inc: { 'stats.poemsCount': 1 } });
//     }

//     // Get the language from request or keep existing
//     const updateLanguage = req.body.language || poem.language;
    
//     const updateData = {
//       title: req.body.title || poem.title,
//       genre: req.body.genre || poem.genre,
//       language: updateLanguage,
//       author: req.body.author || poem.author,
//       era: req.body.era || poem.era,
//       tags: req.body.tags || poem.tags,
//       mood: req.body.mood || poem.mood,
//       isPublished: req.body.isPublished !== undefined ? req.body.isPublished : poem.isPublished,
//       isFeatured: req.body.isFeatured !== undefined ? req.body.isFeatured : poem.isFeatured,
//       transliteration: req.body.transliteration || poem.transliteration,
//       translation: {
//         english: req.body.translation?.english || poem.translation?.english,
//         hindi: req.body.translation?.hindi || poem.translation?.hindi
//       },
//       autoTransliterate: req.body.autoTransliterate !== undefined ? req.body.autoTransliterate : poem.autoTransliterate
//     };

//     // Update content based on language and track changes
//     if (updateLanguage === 'hindi') {
//       const newContentHindi = req.body.contentHindi || req.body.content || poem.contentHindi;
//       if (newContentHindi !== poem.contentHindi) {
//         contentChanged = true;
//       }
//       updateData.contentHindi = newContentHindi;
//       updateData.content = updateData.contentHindi;
//       updateData.contentUrdu = '';
//     } else if (updateLanguage === 'urdu') {
//       const newContentUrdu = req.body.contentUrdu || req.body.content || poem.contentUrdu;
//       if (newContentUrdu !== poem.contentUrdu) {
//         contentChanged = true;
//       }
//       updateData.contentUrdu = newContentUrdu;
//       updateData.content = updateData.contentUrdu;
//       updateData.contentHindi = '';
//     } else {
//       const newContent = req.body.content || poem.content;
//       if (newContent !== poem.content) {
//         contentChanged = true;
//       }
//       updateData.content = newContent;
//       updateData.contentUrdu = '';
//       updateData.contentHindi = '';
//     }

//     if (updateData.isPublished && !poem.isPublished) {
//       updateData.publishedAt = new Date();
//     }

//     // Handle slug update if title changed
//     if (req.body.title && req.body.title !== poem.title) {
//       let newSlug = slugify(req.body.title, { lower: true, strict: true });
      
//       const existingPoem = await Poem.findOne({ 
//         slug: newSlug, 
//         _id: { $ne: poem._id } 
//       });
      
//       if (existingPoem) {
//         let counter = 1;
//         let finalSlug = `${newSlug}-${counter}`;
//         while (await Poem.findOne({ slug: finalSlug, _id: { $ne: poem._id } })) {
//           counter++;
//           finalSlug = `${newSlug}-${counter}`;
//         }
//         updateData.slug = finalSlug;
//       } else {
//         updateData.slug = newSlug;
//       }
//     }

//     // Handle direct slug update
//     if (req.body.slug && req.body.slug !== poem.slug) {
//       const cleanSlug = req.body.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
//       const existingPoem = await Poem.findOne({ 
//         slug: cleanSlug, 
//         _id: { $ne: poem._id } 
//       });
      
//       if (existingPoem) {
//         return errorResponse(res, 'Slug already exists. Please choose a different slug.', 400);
//       }
//       updateData.slug = cleanSlug;
//     }

//     const updatedPoem = await Poem.findByIdAndUpdate(
//       poem._id,
//       updateData,
//       { new: true, runValidators: true }
//     ).populate('author', 'name slug avatar');

//     // ============================================
//     // Auto-generate transliteration if content changed
//     // ============================================
//     if (contentChanged && updatedPoem.autoTransliterate && 
//         (updatedPoem.language === 'urdu' || updatedPoem.language === 'hindi')) {
//       console.log(`🔄 Content changed, auto-generating transliteration for ${updatedPoem.title}...`);
//       const translitResult = await autoTransliteratePoem(updatedPoem, true);
//       if (translitResult.success) {
//         console.log(`✅ Auto-transliteration updated using ${translitResult.method}`);
//         // Refresh the poem data to include the new transliteration
//         await updatedPoem.reload();
//       } else {
//         console.log(`⚠️ Auto-transliteration failed: ${translitResult.error}`);
//       }
//     }

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

// // ============================================
// // DELETE POEM (unchanged)
// // ============================================
// export const deletePoem = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     console.log('Deleting poem with slug:', slug);
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     await Author.findByIdAndUpdate(poem.author, {
//       $inc: { 'stats.poemsCount': -1 }
//     });
    
//     await Poem.findByIdAndDelete(poem._id);
//     await cacheDelete('cache:/api/poems:*');
//     successResponse(res, null, 'Poem deleted successfully');
//   } catch (error) {
//     console.error('Error deleting poem:', error);
//     next(error);
//   }
// };

// // ============================================
// // LIKE POEM (unchanged)
// // ============================================
// export const likePoem = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     const userId = req.user.id;
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     if (poem.likedBy.includes(userId)) {
//       poem.likedBy.pull(userId);
//       poem.stats.likes -= 1;
//     } else {
//       poem.likedBy.push(userId);
//       poem.stats.likes += 1;
//     }

//     await poem.save();
//     successResponse(res, { 
//       liked: poem.likedBy.includes(userId), 
//       likes: poem.stats.likes 
//     });
//   } catch (error) {
//     console.error('Error in likePoem:', error);
//     next(error);
//   }
// };

// // ============================================
// // BOOKMARK POEM (unchanged)
// // ============================================
// export const bookmarkPoem = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     const userId = req.user.id;
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }

//     if (poem.bookmarkedBy.includes(userId)) {
//       poem.bookmarkedBy.pull(userId);
//       poem.stats.bookmarks -= 1;
//     } else {
//       poem.bookmarkedBy.push(userId);
//       poem.stats.bookmarks += 1;
//     }

//     await poem.save();
//     successResponse(res, { 
//       bookmarked: poem.bookmarkedBy.includes(userId), 
//       bookmarks: poem.stats.bookmarks 
//     });
//   } catch (error) {
//     console.error('Error in bookmarkPoem:', error);
//     next(error);
//   }
// };

// // ============================================
// // ADD COMMENT (unchanged)
// // ============================================
// export const addComment = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     const { text } = req.body;
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     poem.comments.push({
//       user: req.user.id,
//       text: text
//     });
//     poem.stats.comments += 1;
//     await poem.save();

//     await poem.populate('comments.user', 'name avatar');
    
//     successResponse(res, poem.comments, 'Comment added');
//   } catch (error) {
//     console.error('Error in addComment:', error);
//     next(error);
//   }
// };

// // ============================================
// // GET FEATURED POEMS (unchanged)
// // ============================================
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

// // ============================================
// // GET TRENDING POEMS (unchanged)
// // ============================================
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

// // ============================================
// // GET POEMS BY AUTHOR (unchanged)
// // ============================================
// export const getPoemsByAuthor = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);
//     const { authorId } = req.params;

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

// // ============================================
// // GET AI EXPLANATION (unchanged)
// // ============================================
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

// // ============================================
// // GET RELATED POEMS (unchanged)
// // ============================================
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

// // ============================================
// // AI FEATURE FUNCTIONS (unchanged below)
// // ============================================

// // SENTIMENT ANALYSIS
// export const getPoemSentiment = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     if (poem.sentimentAnalysis && poem.sentimentAnalysis.analyzedAt) {
//       const hoursSince = (Date.now() - new Date(poem.sentimentAnalysis.analyzedAt)) / (1000 * 60 * 60);
//       if (hoursSince < 24) {
//         return successResponse(res, poem.sentimentAnalysis);
//       }
//     }
    
//     let content = '';
//     if (poem.language === 'hindi') {
//       content = poem.contentHindi || poem.content || '';
//     } else {
//       content = poem.contentUrdu || poem.content || '';
//     }
    
//     const analysis = analyzeSentiment(content);
    
//     poem.sentimentAnalysis = {
//       ...analysis,
//       analyzedAt: new Date()
//     };
//     await poem.save();
    
//     successResponse(res, poem.sentimentAnalysis);
//   } catch (error) {
//     console.error('Error in getPoemSentiment:', error);
//     successResponse(res, {
//       sentiment: 'neutral',
//       score: 0,
//       confidence: 0,
//       emotions: { joy: 0, sadness: 0, anger: 0, fear: 0, love: 0, neutral: 100 },
//       dominantEmotion: 'neutral',
//       summary: 'Sentiment analysis temporarily unavailable',
//       isFallback: true
//     });
//   }
// };

// // THEME EXTRACTION
// export const getPoemThemes = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     if (poem.themeAnalysis && poem.themeAnalysis.analyzedAt) {
//       const hoursSince = (Date.now() - new Date(poem.themeAnalysis.analyzedAt)) / (1000 * 60 * 60);
//       if (hoursSince < 24) {
//         return successResponse(res, poem.themeAnalysis);
//       }
//     }
    
//     let content = '';
//     if (poem.language === 'hindi') {
//       content = poem.contentHindi || poem.content || '';
//     } else {
//       content = poem.contentUrdu || poem.content || '';
//     }
    
//     const themes = extractThemes(content);
    
//     poem.themeAnalysis = {
//       ...themes,
//       analyzedAt: new Date()
//     };
//     await poem.save();
    
//     successResponse(res, poem.themeAnalysis);
//   } catch (error) {
//     console.error('Error in getPoemThemes:', error);
//     successResponse(res, {
//       dominant: 'neutral',
//       themes: [],
//       tags: [],
//       themeCount: 0,
//       isFallback: true
//     });
//   }
// };

// // FULL AI LITERARY ANALYSIS
// export const getAIAnalysis = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     const forceRefresh = req.query.refresh === 'true';
    
//     console.log('🔍 AI Analysis requested for slug:', slug, 'refresh:', forceRefresh);
    
//     const poem = await Poem.findOne({ slug });
//     if (!poem) {
//       return errorResponse(res, 'Poem not found', 404);
//     }
    
//     const hasValidCache = !forceRefresh && 
//                           poem.aiAnalysis && 
//                           poem.aiAnalysis.analyzedAt &&
//                           poem.aiAnalysis.themes &&
//                           poem.aiAnalysis.themes.length > 0;
    
//     if (hasValidCache) {
//       const hoursSince = (Date.now() - new Date(poem.aiAnalysis.analyzedAt)) / (1000 * 60 * 60);
//       if (hoursSince < 24) {
//         console.log('✅ Returning cached AI analysis');
//         return successResponse(res, poem.aiAnalysis);
//       }
//     }
    
//     console.log('🔄 Generating fresh AI analysis...');
    
//     let content = '';
//     if (poem.language === 'hindi') {
//       content = poem.contentHindi || poem.content || '';
//     } else {
//       content = poem.contentUrdu || poem.content || '';
//     }
    
//     const result = await aiAnalyzePoem(content, poem.language || 'urdu');
    
//     if (result.success && result.analysis) {
//       const analysis = {
//         themes: result.analysis.themes || ['Poetry', 'Emotion', 'Expression'],
//         tone: result.analysis.tone || 'Expressive',
//         sentiment: result.analysis.sentiment || 'neutral',
//         emotions: result.analysis.emotions || ['Thoughtful', 'Reflective'],
//         meaning: result.analysis.meaning || 'This poem expresses deep emotions through beautiful imagery.',
//         literaryDevices: result.analysis.literaryDevices || ['Imagery', 'Metaphor', 'Rhyme'],
//         rhymeScheme: result.analysis.rhymeScheme || 'Rhythmic pattern',
//         difficulty: result.analysis.difficulty || 'intermediate',
//         provider: result.provider === 'gemini' ? 'Gemini AI' : 'ZauqApp AI',
//         analyzedAt: new Date(),
//         modelUsed: result.provider
//       };
      
//       poem.aiAnalysis = analysis;
//       await poem.save();
      
//       console.log('💾 AI analysis cached successfully');
//       return successResponse(res, analysis);
//     } else {
//       console.error('❌ AI analysis failed:', result.error);
      
//       const content = (poem.contentHindi || poem.contentUrdu || poem.content) || '';
//       const isKarbalaPoem = content.includes('حسین') || content.includes('Hussain') || content.includes('Karbala');
      
//       const fallbackAnalysis = {
//         themes: isKarbalaPoem 
//           ? ['Karbala', 'Sacrifice', 'Martyrdom', 'Devotion', 'Spirituality']
//           : ['Love', 'Nature', 'Spirituality', 'Emotion', 'Reflection'],
//         tone: isKarbalaPoem ? 'Tragic and Heroic' : 'Contemplative and Expressive',
//         sentiment: isKarbalaPoem ? 'sorrowful' : 'positive',
//         emotions: isKarbalaPoem 
//           ? ['Grief', 'Devotion', 'Sorrow', 'Hope', 'Faith']
//           : ['Joy', 'Peace', 'Hope', 'Love', 'Wonder'],
//         meaning: isKarbalaPoem
//           ? 'یہ مرثیہ حضرت امام حسین علیہ السلام اور شہدائے کربلا کی عظمت، صبر اور استقامت کو خراج تحسین پیش کرتا ہے۔'
//           : 'This poem beautifully expresses deep emotions and human experiences through powerful imagery.',
//         literaryDevices: ['Imagery', 'Metaphor', 'Repetition', 'Symbolism', 'Rhyme'],
//         rhymeScheme: 'AABB and ABAB patterns',
//         difficulty: 'intermediate',
//         provider: 'ZauqApp AI',
//         isFallback: true,
//         analyzedAt: new Date()
//       };
      
//       return successResponse(res, fallbackAnalysis);
//     }
//   } catch (error) {
//     console.error('Error in getAIAnalysis:', error);
    
//     successResponse(res, {
//       themes: ['Analysis temporarily unavailable'],
//       tone: 'Unknown',
//       sentiment: 'neutral',
//       emotions: [],
//       meaning: 'We are experiencing high demand. Please try again later.',
//       literaryDevices: [],
//       rhymeScheme: 'Not detected',
//       difficulty: 'intermediate',
//       isFallback: true,
//       provider: 'fallback',
//       analyzedAt: new Date()
//     });
//   }
// };

// // ANALYZE POEM CONTENT DIRECTLY
// export const analyzePoemContent = async (req, res, next) => {
//   try {
//     const { poemText, language = 'urdu' } = req.body;
    
//     if (!poemText || poemText.trim().length < 10) {
//       return errorResponse(res, 'Poem text is required (minimum 10 characters)', 400);
//     }
    
//     console.log('🔍 Analyzing poem content directly...');
//     const result = await aiAnalyzePoem(poemText, language);
    
//     if (result.success && result.analysis) {
//       successResponse(res, {
//         analysis: {
//           themes: result.analysis.themes || ['Poetry', 'Emotion', 'Expression'],
//           tone: result.analysis.tone || 'Expressive',
//           sentiment: result.analysis.sentiment || 'neutral',
//           emotions: result.analysis.emotions || ['Thoughtful', 'Reflective'],
//           meaning: result.analysis.meaning || 'This poem expresses deep emotions through beautiful imagery.',
//           literaryDevices: result.analysis.literaryDevices || ['Imagery', 'Metaphor', 'Rhyme'],
//           rhymeScheme: result.analysis.rhymeScheme || 'Rhythmic pattern',
//           difficulty: result.analysis.difficulty || 'intermediate'
//         },
//         provider: result.provider
//       });
//     } else {
//       const isKarbalaPoem = poemText.includes('حسین') || poemText.includes('Hussain') || poemText.includes('Karbala');
      
//       successResponse(res, {
//         analysis: {
//           themes: isKarbalaPoem 
//             ? ['Karbala', 'Sacrifice', 'Martyrdom', 'Devotion']
//             : ['Poetry', 'Emotion', 'Expression'],
//           tone: isKarbalaPoem ? 'Tragic' : 'Expressive',
//           sentiment: isKarbalaPoem ? 'sorrowful' : 'positive',
//           emotions: isKarbalaPoem ? ['Grief', 'Devotion'] : ['Joy', 'Peace'],
//           meaning: isKarbalaPoem
//             ? 'This poem honors the sacrifice and devotion of Karbala.'
//             : 'This poem expresses deep emotions through beautiful imagery.',
//           literaryDevices: ['Imagery', 'Metaphor', 'Rhyme'],
//           rhymeScheme: 'Rhythmic pattern',
//           difficulty: 'intermediate'
//         },
//         provider: 'fallback',
//         warning: result.error || 'Using fallback analysis'
//       });
//     }
//   } catch (error) {
//     console.error('Error in analyzePoemContent:', error);
    
//     successResponse(res, {
//       analysis: {
//         themes: ['Poetry analysis'],
//         tone: 'Expressive',
//         sentiment: 'neutral',
//         emotions: ['contemplative'],
//         meaning: 'This poem expresses deep emotions through poetic language.',
//         literaryDevices: ['Imagery', 'Metaphor'],
//         rhymeScheme: 'Rhythmic pattern',
//         difficulty: 'intermediate'
//       },
//       provider: 'fallback',
//       warning: 'Using fallback analysis. Please try again for detailed AI analysis.'
//     });
//   }
// };




















// server/controllers/poem.controller.js

import Poem from '../models/Poem.js';
import Author from '../models/Author.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
import { getPagination, getSort, getFilters, getPaginationMetadata } from '../utils/pagination.js';
import { generatePoemExplanation } from '../utils/aiService.js';
import { cacheDelete } from '../config/redis.js';
import slugify from 'slugify';

// ============================================
// 🔴 NEW: Import AI Services and Transliteration
// ============================================
import { analyzeSentiment } from '../services/sentimentService.js';
import { extractThemes } from '../services/themeExtractor.js';
import { analyzePoem as aiAnalyzePoem } from '../services/aiOrchestrator.js';
import { autoTransliteratePoem } from '../services/transliterationService.js';

// ============================================
// GET POEMS with enhanced search including author name
// ============================================
export const getPoems = async (req, res, next) => {
  try {
    // Get pagination parameters
    const { page, limit, skip } = getPagination(req);
    const sort = getSort(req, { createdAt: -1 });
    const filters = getFilters(req, ['genre', 'language', 'mood', 'era', 'author']);
    
    // Get search query
    const searchQuery = req.query.search;
    
    console.log('📡 getPoems called with:', { 
      page, 
      limit, 
      search: searchQuery, 
      filters, 
      sort 
    });
    
    // Base query - only published poems for public
    const query = {};
    if (!req.user || req.user.role !== 'admin') {
      query.isPublished = true;
    }
    
    // Add filters
    Object.assign(query, filters);
    
    // ============================================
    // ENHANCED SEARCH: Search by title, content, and author name
    // ============================================
    if (searchQuery && searchQuery.trim()) {
      const searchTerm = searchQuery.trim();
      console.log('🔍 Searching for:', searchTerm);
      
      // Create case-insensitive regex
      const searchRegex = new RegExp(searchTerm, 'i');
      
      // Find authors matching the search term
      const matchingAuthors = await Author.find({
        $or: [
          { name: searchRegex },
          { nameUrdu: searchRegex },
          { nameHindi: searchRegex }
        ]
      }).select('_id');
      
      const authorIds = matchingAuthors.map(a => a._id);
      console.log(`📚 Found ${authorIds.length} authors matching "${searchTerm}"`);
      
      // Build search filter with OR conditions
      const searchFilter = {
        $or: [
          { title: searchRegex },
          { content: searchRegex },
          { contentUrdu: searchRegex },
          { contentHindi: searchRegex },
          { tags: { $in: [searchRegex] } }
        ]
      };
      
      // Add author filter if any authors match
      if (authorIds.length > 0) {
        searchFilter.$or.push({ author: { $in: authorIds } });
      }
      
      Object.assign(query, searchFilter);
    }
    
    console.log('🔍 Final query:', JSON.stringify(query, null, 2));
    
    // Execute query with population and pagination
    const poems = await Poem.find(query)
      .populate('author', 'name slug avatar bio nameUrdu nameHindi')
      .populate('category', 'name slug')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Poem.countDocuments(query);
    
    console.log(`✅ Found ${poems.length} poems out of ${total} total`);
    
    // Return paginated response with metadata
    const paginationMetadata = getPaginationMetadata(total, page, limit);
    
    res.json({
      success: true,
      data: poems,
      pagination: paginationMetadata
    });
  } catch (error) {
    console.error('Error in getPoems:', error);
    next(error);
  }
};

// ============================================
// GET SINGLE POEM BY SLUG
// ============================================
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
      language: poem.language,
      authorName: poem.author?.name
    });

    successResponse(res, responseData);
  } catch (error) {
    console.error('Error in getPoemBySlug:', error);
    next(error);
  }
};

// ============================================
// CREATE POEM with Hindi support & Auto-Transliteration
// ============================================
export const createPoem = async (req, res, next) => {
  try {
    console.log('Creating poem with data:', JSON.stringify(req.body, null, 2));
    
    const { 
      title, 
      content, 
      contentHindi, 
      author, 
      genre, 
      slug, 
      language,
      autoTransliterate = true  // Default to true
    } = req.body;
    
    // Validate title
    if (!title || !title.trim()) {
      return errorResponse(res, 'Title is required', 400);
    }
    
    // Validate content based on language
    const poemLanguage = language || 'urdu';
    
    if (poemLanguage === 'hindi') {
      if (!contentHindi || !contentHindi.trim()) {
        return errorResponse(res, 'Hindi content is required', 400);
      }
    } else if (poemLanguage === 'urdu') {
      if (!content || !content.trim()) {
        return errorResponse(res, 'Urdu content is required', 400);
      }
    } else {
      if (!content || !content.trim()) {
        return errorResponse(res, 'Content is required', 400);
      }
    }
    
    if (!author) {
      return errorResponse(res, 'Author is required', 400);
    }
    if (!genre) {
      return errorResponse(res, 'Genre is required', 400);
    }

    // Validate author exists
    const authorExists = await Author.findById(author);
    if (!authorExists) {
      return errorResponse(res, 'Author not found. Please select a valid author.', 404);
    }

    // Prepare poem data based on language
    const poemData = {
      title: title.trim(),
      genre: genre,
      language: poemLanguage,
      author: author,
      era: req.body.era || 'modern',
      tags: req.body.tags || [],
      mood: req.body.mood,
      isPublished: req.body.isPublished || false,
      publishedAt: req.body.isPublished ? new Date() : null,
      isFeatured: req.body.isFeatured || false,
      createdBy: req.user.id,
      transliteration: req.body.transliteration || '',
      translation: {
        english: req.body.translation?.english || '',
        hindi: req.body.translation?.hindi || ''
      },
      autoTransliterate: autoTransliterate  // Set auto-transliteration flag
    };
    
    // Set content based on language
    if (poemLanguage === 'hindi') {
      poemData.content = contentHindi?.trim() || '';
      poemData.contentHindi = contentHindi?.trim() || '';
      poemData.contentUrdu = '';
    } else if (poemLanguage === 'urdu') {
      poemData.content = content?.trim() || '';
      poemData.contentUrdu = content?.trim() || '';
      poemData.contentHindi = '';
    } else {
      // English or other languages
      poemData.content = content?.trim() || '';
      poemData.contentUrdu = '';
      poemData.contentHindi = '';
    }
    
    // Handle slug
    if (slug && slug.trim()) {
      poemData.slug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
    }

    const poem = await Poem.create(poemData);
    
    // ============================================
    // Auto-generate transliteration
    // ============================================
    if (autoTransliterate && (poemLanguage === 'urdu' || poemLanguage === 'hindi')) {
      console.log(`🔄 Auto-generating transliteration for ${poem.title}...`);
      const translitResult = await autoTransliteratePoem(poem);
      if (translitResult.success) {
        console.log(`✅ Auto-transliteration generated using ${translitResult.method}`);
      } else {
        console.log(`⚠️ Auto-transliteration failed: ${translitResult.error}`);
      }
    }
    
    // Update author stats
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
// UPDATE POEM with Hindi support & Auto-Transliteration
// ============================================
export const updatePoem = async (req, res, next) => {
  try {
    const { slug } = req.params;
    console.log('Updating poem with slug:', slug);
    console.log('Update data:', JSON.stringify(req.body, null, 2));
    
    const poem = await Poem.findOne({ slug });
    if (!poem) {
      return errorResponse(res, 'Poem not found', 404);
    }

    // Track if content changed (for transliteration regeneration)
    let contentChanged = false;

    // Handle author change
    if (req.body.author && req.body.author !== poem.author.toString()) {
      const authorExists = await Author.findById(req.body.author);
      if (!authorExists) {
        return errorResponse(res, 'New author not found', 404);
      }
      
      await Author.findByIdAndUpdate(poem.author, { $inc: { 'stats.poemsCount': -1 } });
      await Author.findByIdAndUpdate(req.body.author, { $inc: { 'stats.poemsCount': 1 } });
    }

    // Get the language from request or keep existing
    const updateLanguage = req.body.language || poem.language;
    
    const updateData = {
      title: req.body.title || poem.title,
      genre: req.body.genre || poem.genre,
      language: updateLanguage,
      author: req.body.author || poem.author,
      era: req.body.era || poem.era,
      tags: req.body.tags || poem.tags,
      mood: req.body.mood || poem.mood,
      isPublished: req.body.isPublished !== undefined ? req.body.isPublished : poem.isPublished,
      isFeatured: req.body.isFeatured !== undefined ? req.body.isFeatured : poem.isFeatured,
      transliteration: req.body.transliteration || poem.transliteration,
      translation: {
        english: req.body.translation?.english || poem.translation?.english,
        hindi: req.body.translation?.hindi || poem.translation?.hindi
      },
      autoTransliterate: req.body.autoTransliterate !== undefined ? req.body.autoTransliterate : poem.autoTransliterate
    };

    // Update content based on language and track changes
    if (updateLanguage === 'hindi') {
      const newContentHindi = req.body.contentHindi || req.body.content || poem.contentHindi;
      if (newContentHindi !== poem.contentHindi) {
        contentChanged = true;
      }
      updateData.contentHindi = newContentHindi;
      updateData.content = updateData.contentHindi;
      updateData.contentUrdu = '';
    } else if (updateLanguage === 'urdu') {
      const newContentUrdu = req.body.contentUrdu || req.body.content || poem.contentUrdu;
      if (newContentUrdu !== poem.contentUrdu) {
        contentChanged = true;
      }
      updateData.contentUrdu = newContentUrdu;
      updateData.content = updateData.contentUrdu;
      updateData.contentHindi = '';
    } else {
      const newContent = req.body.content || poem.content;
      if (newContent !== poem.content) {
        contentChanged = true;
      }
      updateData.content = newContent;
      updateData.contentUrdu = '';
      updateData.contentHindi = '';
    }

    if (updateData.isPublished && !poem.isPublished) {
      updateData.publishedAt = new Date();
    }

    // Handle slug update if title changed
    if (req.body.title && req.body.title !== poem.title) {
      let newSlug = slugify(req.body.title, { lower: true, strict: true });
      
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

    // Handle direct slug update
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

    // ============================================
    // Auto-generate transliteration if content changed
    // ============================================
    if (contentChanged && updatedPoem.autoTransliterate && 
        (updatedPoem.language === 'urdu' || updatedPoem.language === 'hindi')) {
      console.log(`🔄 Content changed, auto-generating transliteration for ${updatedPoem.title}...`);
      const translitResult = await autoTransliteratePoem(updatedPoem, true);
      if (translitResult.success) {
        console.log(`✅ Auto-transliteration updated using ${translitResult.method}`);
        // Refresh the poem data to include the new transliteration
        await updatedPoem.reload();
      } else {
        console.log(`⚠️ Auto-transliteration failed: ${translitResult.error}`);
      }
    }

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
// DELETE POEM
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
// LIKE POEM
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
// BOOKMARK POEM
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
// ADD COMMENT
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

// ============================================
// GET FEATURED POEMS
// ============================================
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

// ============================================
// GET TRENDING POEMS
// ============================================
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

// ============================================
// GET POEMS BY AUTHOR
// ============================================
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

// ============================================
// GET AI EXPLANATION
// ============================================
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

// ============================================
// GET RELATED POEMS
// ============================================
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

// ============================================
// SENTIMENT ANALYSIS
// ============================================
export const getPoemSentiment = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    const poem = await Poem.findOne({ slug });
    if (!poem) {
      return errorResponse(res, 'Poem not found', 404);
    }
    
    if (poem.sentimentAnalysis && poem.sentimentAnalysis.analyzedAt) {
      const hoursSince = (Date.now() - new Date(poem.sentimentAnalysis.analyzedAt)) / (1000 * 60 * 60);
      if (hoursSince < 24) {
        return successResponse(res, poem.sentimentAnalysis);
      }
    }
    
    let content = '';
    if (poem.language === 'hindi') {
      content = poem.contentHindi || poem.content || '';
    } else {
      content = poem.contentUrdu || poem.content || '';
    }
    
    const analysis = analyzeSentiment(content);
    
    poem.sentimentAnalysis = {
      ...analysis,
      analyzedAt: new Date()
    };
    await poem.save();
    
    successResponse(res, poem.sentimentAnalysis);
  } catch (error) {
    console.error('Error in getPoemSentiment:', error);
    successResponse(res, {
      sentiment: 'neutral',
      score: 0,
      confidence: 0,
      emotions: { joy: 0, sadness: 0, anger: 0, fear: 0, love: 0, neutral: 100 },
      dominantEmotion: 'neutral',
      summary: 'Sentiment analysis temporarily unavailable',
      isFallback: true
    });
  }
};

// ============================================
// THEME EXTRACTION
// ============================================
export const getPoemThemes = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    const poem = await Poem.findOne({ slug });
    if (!poem) {
      return errorResponse(res, 'Poem not found', 404);
    }
    
    if (poem.themeAnalysis && poem.themeAnalysis.analyzedAt) {
      const hoursSince = (Date.now() - new Date(poem.themeAnalysis.analyzedAt)) / (1000 * 60 * 60);
      if (hoursSince < 24) {
        return successResponse(res, poem.themeAnalysis);
      }
    }
    
    let content = '';
    if (poem.language === 'hindi') {
      content = poem.contentHindi || poem.content || '';
    } else {
      content = poem.contentUrdu || poem.content || '';
    }
    
    const themes = extractThemes(content);
    
    poem.themeAnalysis = {
      ...themes,
      analyzedAt: new Date()
    };
    await poem.save();
    
    successResponse(res, poem.themeAnalysis);
  } catch (error) {
    console.error('Error in getPoemThemes:', error);
    successResponse(res, {
      dominant: 'neutral',
      themes: [],
      tags: [],
      themeCount: 0,
      isFallback: true
    });
  }
};

// ============================================
// FULL AI LITERARY ANALYSIS
// ============================================
export const getAIAnalysis = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const forceRefresh = req.query.refresh === 'true';
    
    console.log('🔍 AI Analysis requested for slug:', slug, 'refresh:', forceRefresh);
    
    const poem = await Poem.findOne({ slug });
    if (!poem) {
      return errorResponse(res, 'Poem not found', 404);
    }
    
    const hasValidCache = !forceRefresh && 
                          poem.aiAnalysis && 
                          poem.aiAnalysis.analyzedAt &&
                          poem.aiAnalysis.themes &&
                          poem.aiAnalysis.themes.length > 0;
    
    if (hasValidCache) {
      const hoursSince = (Date.now() - new Date(poem.aiAnalysis.analyzedAt)) / (1000 * 60 * 60);
      if (hoursSince < 24) {
        console.log('✅ Returning cached AI analysis');
        return successResponse(res, poem.aiAnalysis);
      }
    }
    
    console.log('🔄 Generating fresh AI analysis...');
    
    let content = '';
    if (poem.language === 'hindi') {
      content = poem.contentHindi || poem.content || '';
    } else {
      content = poem.contentUrdu || poem.content || '';
    }
    
    const result = await aiAnalyzePoem(content, poem.language || 'urdu');
    
    if (result.success && result.analysis) {
      const analysis = {
        themes: result.analysis.themes || ['Poetry', 'Emotion', 'Expression'],
        tone: result.analysis.tone || 'Expressive',
        sentiment: result.analysis.sentiment || 'neutral',
        emotions: result.analysis.emotions || ['Thoughtful', 'Reflective'],
        meaning: result.analysis.meaning || 'This poem expresses deep emotions through beautiful imagery.',
        literaryDevices: result.analysis.literaryDevices || ['Imagery', 'Metaphor', 'Rhyme'],
        rhymeScheme: result.analysis.rhymeScheme || 'Rhythmic pattern',
        difficulty: result.analysis.difficulty || 'intermediate',
        provider: result.provider === 'gemini' ? 'Gemini AI' : 'ZauqApp AI',
        analyzedAt: new Date(),
        modelUsed: result.provider
      };
      
      poem.aiAnalysis = analysis;
      await poem.save();
      
      console.log('💾 AI analysis cached successfully');
      return successResponse(res, analysis);
    } else {
      console.error('❌ AI analysis failed:', result.error);
      
      const content = (poem.contentHindi || poem.contentUrdu || poem.content) || '';
      const isKarbalaPoem = content.includes('حسین') || content.includes('Hussain') || content.includes('Karbala');
      
      const fallbackAnalysis = {
        themes: isKarbalaPoem 
          ? ['Karbala', 'Sacrifice', 'Martyrdom', 'Devotion', 'Spirituality']
          : ['Love', 'Nature', 'Spirituality', 'Emotion', 'Reflection'],
        tone: isKarbalaPoem ? 'Tragic and Heroic' : 'Contemplative and Expressive',
        sentiment: isKarbalaPoem ? 'sorrowful' : 'positive',
        emotions: isKarbalaPoem 
          ? ['Grief', 'Devotion', 'Sorrow', 'Hope', 'Faith']
          : ['Joy', 'Peace', 'Hope', 'Love', 'Wonder'],
        meaning: isKarbalaPoem
          ? 'یہ مرثیہ حضرت امام حسین علیہ السلام اور شہدائے کربلا کی عظمت، صبر اور استقامت کو خراج تحسین پیش کرتا ہے۔'
          : 'This poem beautifully expresses deep emotions and human experiences through powerful imagery.',
        literaryDevices: ['Imagery', 'Metaphor', 'Repetition', 'Symbolism', 'Rhyme'],
        rhymeScheme: 'AABB and ABAB patterns',
        difficulty: 'intermediate',
        provider: 'ZauqApp AI',
        isFallback: true,
        analyzedAt: new Date()
      };
      
      return successResponse(res, fallbackAnalysis);
    }
  } catch (error) {
    console.error('Error in getAIAnalysis:', error);
    
    successResponse(res, {
      themes: ['Analysis temporarily unavailable'],
      tone: 'Unknown',
      sentiment: 'neutral',
      emotions: [],
      meaning: 'We are experiencing high demand. Please try again later.',
      literaryDevices: [],
      rhymeScheme: 'Not detected',
      difficulty: 'intermediate',
      isFallback: true,
      provider: 'fallback',
      analyzedAt: new Date()
    });
  }
};

// ============================================
// ANALYZE POEM CONTENT DIRECTLY
// ============================================
export const analyzePoemContent = async (req, res, next) => {
  try {
    const { poemText, language = 'urdu' } = req.body;
    
    if (!poemText || poemText.trim().length < 10) {
      return errorResponse(res, 'Poem text is required (minimum 10 characters)', 400);
    }
    
    console.log('🔍 Analyzing poem content directly...');
    const result = await aiAnalyzePoem(poemText, language);
    
    if (result.success && result.analysis) {
      successResponse(res, {
        analysis: {
          themes: result.analysis.themes || ['Poetry', 'Emotion', 'Expression'],
          tone: result.analysis.tone || 'Expressive',
          sentiment: result.analysis.sentiment || 'neutral',
          emotions: result.analysis.emotions || ['Thoughtful', 'Reflective'],
          meaning: result.analysis.meaning || 'This poem expresses deep emotions through beautiful imagery.',
          literaryDevices: result.analysis.literaryDevices || ['Imagery', 'Metaphor', 'Rhyme'],
          rhymeScheme: result.analysis.rhymeScheme || 'Rhythmic pattern',
          difficulty: result.analysis.difficulty || 'intermediate'
        },
        provider: result.provider
      });
    } else {
      const isKarbalaPoem = poemText.includes('حسین') || poemText.includes('Hussain') || poemText.includes('Karbala');
      
      successResponse(res, {
        analysis: {
          themes: isKarbalaPoem 
            ? ['Karbala', 'Sacrifice', 'Martyrdom', 'Devotion']
            : ['Poetry', 'Emotion', 'Expression'],
          tone: isKarbalaPoem ? 'Tragic' : 'Expressive',
          sentiment: isKarbalaPoem ? 'sorrowful' : 'positive',
          emotions: isKarbalaPoem ? ['Grief', 'Devotion'] : ['Joy', 'Peace'],
          meaning: isKarbalaPoem
            ? 'This poem honors the sacrifice and devotion of Karbala.'
            : 'This poem expresses deep emotions through beautiful imagery.',
          literaryDevices: ['Imagery', 'Metaphor', 'Rhyme'],
          rhymeScheme: 'Rhythmic pattern',
          difficulty: 'intermediate'
        },
        provider: 'fallback',
        warning: result.error || 'Using fallback analysis'
      });
    }
  } catch (error) {
    console.error('Error in analyzePoemContent:', error);
    
    successResponse(res, {
      analysis: {
        themes: ['Poetry analysis'],
        tone: 'Expressive',
        sentiment: 'neutral',
        emotions: ['contemplative'],
        meaning: 'This poem expresses deep emotions through poetic language.',
        literaryDevices: ['Imagery', 'Metaphor'],
        rhymeScheme: 'Rhythmic pattern',
        difficulty: 'intermediate'
      },
      provider: 'fallback',
      warning: 'Using fallback analysis. Please try again for detailed AI analysis.'
    });
  }
};