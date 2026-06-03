// //server/controllers/search.controller.js
// import Poem from '../models/Poem.js';
// import Author from '../models/Author.js';
// import Book from '../models/Book.js';
// import Audio from '../models/Audio.js';
// import Video from '../models/Video.js';
// import { successResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination } from '../utils/pagination.js';

// export const unifiedSearch = async (req, res, next) => {
//   try {
//     const { q, type } = req.query;
//     if (!q || q.length < 2) {
//       return successResponse(res, { poems: [], authors: [], books: [], audio: [], videos: [] });
//     }

//     const searchQuery = { $text: { $search: q } };
//     const limit = 10;

//     const [poems, authors, books, audio, videos] = await Promise.all([
//       type && type !== 'poems' ? [] : Poem.find(searchQuery).populate('author', 'name slug').limit(limit),
//       type && type !== 'authors' ? [] : Author.find(searchQuery).limit(limit),
//       type && type !== 'books' ? [] : Book.find(searchQuery).populate('author', 'name slug').limit(limit),
//       type && type !== 'audio' ? [] : Audio.find(searchQuery).populate('author', 'name slug').limit(limit),
//       type && type !== 'videos' ? [] : Video.find(searchQuery).populate('author', 'name slug').limit(limit)
//     ]);

//     successResponse(res, { poems, authors, books, audio, videos });
//   } catch (error) {
//     next(error);
//   }
// };

// export const searchPoems = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     const poems = await Poem.find({ $text: { $search: q } })
//       .populate('author', 'name slug avatar')
//       .skip(skip)
//       .limit(limit);

//     const total = await Poem.countDocuments({ $text: { $search: q } });
//     paginatedResponse(res, poems, { page, limit, total });
//   } catch (error) {
//     next(error);
//   }
// };

// export const searchAuthors = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     const authors = await Author.find({ $text: { $search: q } })
//       .skip(skip)
//       .limit(limit);

//     const total = await Author.countDocuments({ $text: { $search: q } });
//     paginatedResponse(res, authors, { page, limit, total });
//   } catch (error) {
//     next(error);
//   }
// };

// export const searchBooks = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     const books = await Book.find({ $text: { $search: q } })
//       .populate('author', 'name slug avatar')
//       .skip(skip)
//       .limit(limit);

//     const total = await Book.countDocuments({ $text: { $search: q } });
//     paginatedResponse(res, books, { page, limit, total });
//   } catch (error) {
//     next(error);
//   }
// };

// export const searchAudio = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     const audio = await Audio.find({ $text: { $search: q } })
//       .populate('author', 'name slug avatar')
//       .skip(skip)
//       .limit(limit);

//     const total = await Audio.countDocuments({ $text: { $search: q } });
//     paginatedResponse(res, audio, { page, limit, total });
//   } catch (error) {
//     next(error);
//   }
// };

// export const searchVideos = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     const videos = await Video.find({ $text: { $search: q } })
//       .populate('author', 'name slug avatar')
//       .skip(skip)
//       .limit(limit);

//     const total = await Video.countDocuments({ $text: { $search: q } });
//     paginatedResponse(res, videos, { page, limit, total });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSearchSuggestions = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     if (!q || q.length < 2) {
//       return successResponse(res, []);
//     }

//     const regex = new RegExp(q, 'i');
//     const [poems, authors] = await Promise.all([
//       Poem.find({ title: regex }).select('title slug').limit(5),
//       Author.find({ name: regex }).select('name slug').limit(5)
//     ]);

//     const suggestions = [
//       ...poems.map(p => ({ type: 'poem', title: p.title, slug: p.slug })),
//       ...authors.map(a => ({ type: 'author', title: a.name, slug: a.slug }))
//     ];

//     successResponse(res, suggestions);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getTrendingSearches = async (req, res, next) => {
//   try {
//     // Mock trending searches - replace with actual analytics
//     const trending = [
//       'Mirza Ghalib', 'Faiz Ahmed Faiz', 'Urdu Ghazal', 
//       'Hindi Kavita', 'Mushaira', 'Shayari'
//     ];
//     successResponse(res, trending);
//   } catch (error) {
//     next(error);
//   }
// };









// // server/controllers/search.controller.js
// import Poem from '../models/Poem.js';
// import Author from '../models/Author.js';
// import Book from '../models/Book.js';
// import Audio from '../models/Audio.js';
// import Video from '../models/Video.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination } from '../utils/pagination.js';

// export const unifiedSearch = async (req, res, next) => {
//   try {
//     const { q, type } = req.query;
    
//     // Return empty results if query is too short
//     if (!q || q.length < 2) {
//       return successResponse(res, { 
//         poems: [], 
//         authors: [], 
//         books: [], 
//         audio: [], 
//         videos: [] 
//       });
//     }

//     // Create regex search for better compatibility (works without text indexes)
//     const regexQuery = { 
//       $or: [
//         { title: { $regex: q, $options: 'i' } },
//         { name: { $regex: q, $options: 'i' } },
//         { description: { $regex: q, $options: 'i' } },
//         { content: { $regex: q, $options: 'i' } },
//         { bio: { $regex: q, $options: 'i' } }
//       ]
//     };
    
//     const limit = 20;

//     const [poems, authors, books, audio, videos] = await Promise.all([
//       type && type !== 'poems' ? [] : Poem.find(regexQuery)
//         .populate('author', 'name slug')
//         .limit(limit),
//       type && type !== 'authors' ? [] : Author.find(regexQuery)
//         .limit(limit),
//       type && type !== 'books' ? [] : Book.find(regexQuery)
//         .populate('author', 'name slug')
//         .limit(limit),
//       type && type !== 'audio' ? [] : Audio.find(regexQuery)
//         .populate('author', 'name slug')
//         .limit(limit),
//       type && type !== 'videos' ? [] : Video.find(regexQuery)
//         .populate('author', 'name slug')
//         .limit(limit)
//     ]);

//     successResponse(res, { 
//       poems: poems || [], 
//       authors: authors || [], 
//       books: books || [], 
//       audio: audio || [], 
//       videos: videos || [] 
//     });
//   } catch (error) {
//     console.error('Search error:', error);
//     errorResponse(res, error.message, 500);
//   }
// };

// export const searchPoems = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const regexQuery = {
//       $or: [
//         { title: { $regex: q, $options: 'i' } },
//         { content: { $regex: q, $options: 'i' } },
//         { contentUrdu: { $regex: q, $options: 'i' } },
//         { tags: { $in: [new RegExp(q, 'i')] } }
//       ]
//     };

//     const poems = await Poem.find(regexQuery)
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     const total = await Poem.countDocuments(regexQuery);
//     paginatedResponse(res, poems, { page, limit, total });
//   } catch (error) {
//     console.error('Search poems error:', error);
//     next(error);
//   }
// };

// export const searchAuthors = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const regexQuery = {
//       $or: [
//         { name: { $regex: q, $options: 'i' } },
//         { nameUrdu: { $regex: q, $options: 'i' } },
//         { bio: { $regex: q, $options: 'i' } }
//       ]
//     };

//     const authors = await Author.find(regexQuery)
//       .skip(skip)
//       .limit(limit);

//     const total = await Author.countDocuments(regexQuery);
//     paginatedResponse(res, authors, { page, limit, total });
//   } catch (error) {
//     console.error('Search authors error:', error);
//     next(error);
//   }
// };

// export const searchBooks = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const regexQuery = {
//       $or: [
//         { title: { $regex: q, $options: 'i' } },
//         { description: { $regex: q, $options: 'i' } },
//         { author: { $regex: q, $options: 'i' } }
//       ]
//     };

//     const books = await Book.find(regexQuery)
//       .populate('author', 'name slug avatar')
//       .skip(skip)
//       .limit(limit);

//     const total = await Book.countDocuments(regexQuery);
//     paginatedResponse(res, books, { page, limit, total });
//   } catch (error) {
//     console.error('Search books error:', error);
//     next(error);
//   }
// };

// export const searchAudio = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const regexQuery = {
//       $or: [
//         { title: { $regex: q, $options: 'i' } },
//         { description: { $regex: q, $options: 'i' } },
//         { tags: { $in: [new RegExp(q, 'i')] } }
//       ]
//     };

//     const audio = await Audio.find(regexQuery)
//       .populate('author', 'name slug avatar')
//       .skip(skip)
//       .limit(limit);

//     const total = await Audio.countDocuments(regexQuery);
//     paginatedResponse(res, audio, { page, limit, total });
//   } catch (error) {
//     console.error('Search audio error:', error);
//     next(error);
//   }
// };

// export const searchVideos = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const regexQuery = {
//       $or: [
//         { title: { $regex: q, $options: 'i' } },
//         { description: { $regex: q, $options: 'i' } },
//         { tags: { $in: [new RegExp(q, 'i')] } }
//       ]
//     };

//     const videos = await Video.find(regexQuery)
//       .populate('author', 'name slug avatar')
//       .skip(skip)
//       .limit(limit);

//     const total = await Video.countDocuments(regexQuery);
//     paginatedResponse(res, videos, { page, limit, total });
//   } catch (error) {
//     console.error('Search videos error:', error);
//     next(error);
//   }
// };

// export const getSearchSuggestions = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     if (!q || q.length < 2) {
//       return successResponse(res, []);
//     }

//     const regex = new RegExp(q, 'i');
//     const [poems, authors] = await Promise.all([
//       Poem.find({ title: regex }).select('title slug').limit(5),
//       Author.find({ name: regex }).select('name slug').limit(5)
//     ]);

//     const suggestions = [
//       ...poems.map(p => ({ type: 'poem', title: p.title, slug: p.slug })),
//       ...authors.map(a => ({ type: 'author', title: a.name, slug: a.slug }))
//     ];

//     successResponse(res, suggestions);
//   } catch (error) {
//     console.error('Search suggestions error:', error);
//     successResponse(res, []);
//   }
// };

// export const getTrendingSearches = async (req, res, next) => {
//   try {
//     const trending = [
//       'Mirza Ghalib', 'Faiz Ahmed Faiz', 'Allama Iqbal',
//       'Urdu Ghazal', 'Nauha', 'Marsiya', 'Mushaira',
//       'Hindi Kavita', 'Shayari', 'Karbala'
//     ];
//     successResponse(res, trending);
//   } catch (error) {
//     console.error('Trending searches error:', error);
//     successResponse(res, []);
//   }
// };


























// // server/controllers/search.controller.js
// import Poem from '../models/Poem.js';
// import Author from '../models/Author.js';
// import Book from '../models/Book.js';
// import Audio from '../models/Audio.js';
// import Video from '../models/Video.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination } from '../utils/pagination.js';

// // Helper function for creating search queries
// const createSearchQuery = (q, fields = []) => {
//   if (!q || q.length < 2) return null;
  
//   // For AI/semantic search, we can use regex with word boundaries
//   // This provides better matching than simple regex
//   const words = q.trim().split(/\s+/).filter(w => w.length > 1);
  
//   if (fields.length === 0) {
//     // Default search across common fields
//     return {
//       $or: [
//         { title: { $regex: q, $options: 'i' } },
//         { name: { $regex: q, $options: 'i' } },
//         { description: { $regex: q, $options: 'i' } },
//         { content: { $regex: q, $options: 'i' } },
//         { contentUrdu: { $regex: q, $options: 'i' } },
//         { bio: { $regex: q, $options: 'i' } }
//       ]
//     };
//   }
  
//   // Build OR condition for specified fields
//   const conditions = fields.map(field => ({
//     [field]: { $regex: q, $options: 'i' }
//   }));
  
//   // Add word-by-word search for better results
//   if (words.length > 1) {
//     words.forEach(word => {
//       if (word.length > 2) {
//         conditions.push(
//           { title: { $regex: word, $options: 'i' } },
//           { content: { $regex: word, $options: 'i' } },
//           { tags: { $in: [new RegExp(word, 'i')] } }
//         );
//       }
//     });
//   }
  
//   return { $or: conditions };
// };

// export const unifiedSearch = async (req, res, next) => {
//   try {
//     const { q, type, limit: limitParam } = req.query;
    
//     if (!q || q.length < 2) {
//       return successResponse(res, { 
//         poems: [], 
//         authors: [], 
//         books: [], 
//         audio: [], 
//         videos: [] 
//       });
//     }

//     const searchQuery = createSearchQuery(q);
//     const limit = parseInt(limitParam) || 20;

//     const [poems, authors, books, audio, videos] = await Promise.all([
//       type && type !== 'poems' ? [] : Poem.find(searchQuery)
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(limit),
//       type && type !== 'authors' ? [] : Author.find(searchQuery)
//         .sort({ name: 1 })
//         .limit(limit),
//       type && type !== 'books' ? [] : Book.find(searchQuery)
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(limit),
//       type && type !== 'audio' ? [] : Audio.find(searchQuery)
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(limit),
//       type && type !== 'videos' ? [] : Video.find(searchQuery)
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(limit)
//     ]);

//     successResponse(res, { 
//       poems: poems || [], 
//       authors: authors || [], 
//       books: books || [], 
//       audio: audio || [], 
//       videos: videos || [] 
//     });
//   } catch (error) {
//     console.error('Search error:', error);
//     errorResponse(res, error.message, 500);
//   }
// };

// export const searchPoems = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const searchQuery = createSearchQuery(q, ['title', 'content', 'contentUrdu', 'tags']);
//     searchQuery.isPublished = true; // Only show published content

//     const poems = await Poem.find(searchQuery)
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     const total = await Poem.countDocuments(searchQuery);
//     paginatedResponse(res, poems, { page, limit, total });
//   } catch (error) {
//     console.error('Search poems error:', error);
//     next(error);
//   }
// };

// export const searchAuthors = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const searchQuery = createSearchQuery(q, ['name', 'nameUrdu', 'bio']);
//     searchQuery.isPublished = true;

//     const authors = await Author.find(searchQuery)
//       .skip(skip)
//       .limit(limit);

//     const total = await Author.countDocuments(searchQuery);
//     paginatedResponse(res, authors, { page, limit, total });
//   } catch (error) {
//     console.error('Search authors error:', error);
//     next(error);
//   }
// };

// export const searchBooks = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const searchQuery = createSearchQuery(q, ['title', 'description']);
//     searchQuery.isPublished = true;

//     const books = await Book.find(searchQuery)
//       .populate('author', 'name slug avatar')
//       .skip(skip)
//       .limit(limit);

//     const total = await Book.countDocuments(searchQuery);
//     paginatedResponse(res, books, { page, limit, total });
//   } catch (error) {
//     console.error('Search books error:', error);
//     next(error);
//   }
// };

// export const searchAudio = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const searchQuery = createSearchQuery(q, ['title', 'description', 'tags']);
//     searchQuery.isPublished = true;

//     const audio = await Audio.find(searchQuery)
//       .populate('author', 'name slug avatar')
//       .skip(skip)
//       .limit(limit);

//     const total = await Audio.countDocuments(searchQuery);
//     paginatedResponse(res, audio, { page, limit, total });
//   } catch (error) {
//     console.error('Search audio error:', error);
//     next(error);
//   }
// };

// export const searchVideos = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const searchQuery = createSearchQuery(q, ['title', 'description', 'tags']);
//     searchQuery.isPublished = true;

//     const videos = await Video.find(searchQuery)
//       .populate('author', 'name slug avatar')
//       .skip(skip)
//       .limit(limit);

//     const total = await Video.countDocuments(searchQuery);
//     paginatedResponse(res, videos, { page, limit, total });
//   } catch (error) {
//     console.error('Search videos error:', error);
//     next(error);
//   }
// };

// // AI-Powered Semantic Search
// export const semanticSearch = async (req, res, next) => {
//   try {
//     const { q, type } = req.query;
    
//     if (!q || q.length < 2) {
//       return successResponse(res, { results: [] });
//     }

//     // For semantic search, we'll use a combination of:
//     // 1. Exact matches (higher priority)
//     // 2. Partial matches
//     // 3. Tag matches
//     // 4. Related content by keywords
    
//     const words = q.toLowerCase().split(/\s+/);
//     const searchPromises = [];
    
//     // Search in different content types based on type parameter
//     if (!type || type === 'all') {
//       searchPromises.push(
//         Poem.find({ $text: { $search: q } }, { score: { $meta: "textScore" } })
//           .populate('author', 'name slug')
//           .sort({ score: { $meta: "textScore" } })
//           .limit(10)
//           .then(results => results.map(r => ({ ...r.toObject(), contentType: 'poem' }))),
//         Author.find({ $text: { $search: q } }, { score: { $meta: "textScore" } })
//           .sort({ score: { $meta: "textScore" } })
//           .limit(10)
//           .then(results => results.map(r => ({ ...r.toObject(), contentType: 'author' }))),
//         Audio.find({ $text: { $search: q } }, { score: { $meta: "textScore" } })
//           .populate('author', 'name slug')
//           .sort({ score: { $meta: "textScore" } })
//           .limit(10)
//           .then(results => results.map(r => ({ ...r.toObject(), contentType: 'audio' })))
//       );
//     } else {
//       // Search specific type
//       const model = { poem: Poem, author: Author, audio: Audio, video: Video, book: Book }[type];
//       if (model) {
//         searchPromises.push(
//           model.find({ $text: { $search: q } }, { score: { $meta: "textScore" } })
//             .populate('author', 'name slug')
//             .sort({ score: { $meta: "textScore" } })
//             .limit(20)
//             .then(results => results.map(r => ({ ...r.toObject(), contentType: type })))
//         );
//       }
//     }
    
//     const results = await Promise.all(searchPromises);
//     const allResults = results.flat().sort((a, b) => (b.score || 0) - (a.score || 0));
    
//     successResponse(res, { 
//       results: allResults,
//       query: q,
//       semantic: true
//     });
//   } catch (error) {
//     console.error('Semantic search error:', error);
//     errorResponse(res, error.message, 500);
//   }
// };

// // Voice search endpoint
// export const voiceSearch = async (req, res, next) => {
//   try {
//     const { transcript, language = 'en' } = req.body;
    
//     if (!transcript || transcript.length < 2) {
//       return successResponse(res, { results: [] });
//     }
    
//     // Process voice transcript - clean and search
//     const cleanedQuery = transcript.trim().toLowerCase();
//     const searchQuery = createSearchQuery(cleanedQuery);
    
//     const [poems, authors, audio, videos] = await Promise.all([
//       Poem.find(searchQuery).populate('author', 'name slug').limit(15),
//       Author.find(searchQuery).limit(10),
//       Audio.find(searchQuery).populate('author', 'name slug').limit(10),
//       Video.find(searchQuery).populate('author', 'name slug').limit(10)
//     ]);
    
//     successResponse(res, {
//       query: cleanedQuery,
//       originalTranscript: transcript,
//       language,
//       results: {
//         poems,
//         authors,
//         audio,
//         videos
//       }
//     });
//   } catch (error) {
//     console.error('Voice search error:', error);
//     errorResponse(res, error.message, 500);
//   }
// };

// export const getSearchSuggestions = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     if (!q || q.length < 2) {
//       return successResponse(res, []);
//     }

//     const regex = new RegExp(q, 'i');
//     const [poems, authors, audio] = await Promise.all([
//       Poem.find({ title: regex, isPublished: true }).select('title slug').limit(5),
//       Author.find({ name: regex, isPublished: true }).select('name slug').limit(5),
//       Audio.find({ title: regex, isPublished: true }).select('title slug type').limit(3)
//     ]);

//     const suggestions = [
//       ...poems.map(p => ({ type: 'poem', title: p.title, slug: p.slug, category: 'Poetry' })),
//       ...authors.map(a => ({ type: 'author', title: a.name, slug: a.slug, category: 'Author' })),
//       ...audio.map(a => ({ type: 'audio', title: a.title, slug: a.slug, category: a.type || 'Audio' }))
//     ];

//     successResponse(res, suggestions);
//   } catch (error) {
//     console.error('Search suggestions error:', error);
//     successResponse(res, []);
//   }
// };

// export const getTrendingSearches = async (req, res, next) => {
//   try {
//     const trending = [
//       { term: 'Mirza Ghalib', count: 1250, category: 'author' },
//       { term: 'Allama Iqbal', count: 980, category: 'author' },
//       { term: 'Faiz Ahmed Faiz', count: 850, category: 'author' },
//       { term: 'Nauha', count: 720, category: 'audio' },
//       { term: 'Marsiya', count: 650, category: 'audio' },
//       { term: 'Urdu Ghazal', count: 580, category: 'poem' },
//       { term: 'Mushaira', count: 450, category: 'video' },
//       { term: 'Karbala', count: 420, category: 'audio' },
//       { term: 'Hindi Kavita', count: 380, category: 'poem' },
//       { term: 'Manqabat', count: 350, category: 'audio' }
//     ];
//     successResponse(res, trending);
//   } catch (error) {
//     console.error('Trending searches error:', error);
//     successResponse(res, []);
//   }
// };














// // server/controllers/search.controller.js
// import Poem from '../models/Poem.js';
// import Author from '../models/Author.js';
// import Book from '../models/Book.js';
// import Audio from '../models/Audio.js';
// import Video from '../models/Video.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination } from '../utils/pagination.js';

// // Helper function for creating regex search queries (works without text indexes)
// const createRegexSearchQuery = (q, fields = []) => {
//   if (!q || q.length < 2) return null;
  
//   // Escape special regex characters
//   const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
//   if (fields.length === 0) {
//     // Default search across common fields
//     return {
//       $or: [
//         { title: { $regex: escapedQuery, $options: 'i' } },
//         { name: { $regex: escapedQuery, $options: 'i' } },
//         { nameUrdu: { $regex: escapedQuery, $options: 'i' } },
//         { description: { $regex: escapedQuery, $options: 'i' } },
//         { content: { $regex: escapedQuery, $options: 'i' } },
//         { contentUrdu: { $regex: escapedQuery, $options: 'i' } },
//         { bio: { $regex: escapedQuery, $options: 'i' } },
//         { 'author.name': { $regex: escapedQuery, $options: 'i' } },
//         { tags: { $in: [new RegExp(escapedQuery, 'i')] } }
//       ]
//     };
//   }
  
//   // Build OR condition for specified fields
//   const conditions = fields.map(field => ({
//     [field]: { $regex: escapedQuery, $options: 'i' }
//   }));
  
//   return { $or: conditions };
// };

// export const unifiedSearch = async (req, res, next) => {
//   try {
//     const { q, type, limit: limitParam } = req.query;
    
//     console.log('Unified search called with:', { q, type });
    
//     if (!q || q.length < 2) {
//       return successResponse(res, { 
//         poems: [], 
//         authors: [], 
//         books: [], 
//         audio: [], 
//         videos: [] 
//       });
//     }

//     const searchQuery = createRegexSearchQuery(q);
//     const limit = parseInt(limitParam) || 20;

//     const results = {
//       poems: [],
//       authors: [],
//       books: [],
//       audio: [],
//       videos: []
//     };

//     // Only search in requested types or all
//     if (!type || type === 'all' || type === 'poems') {
//       results.poems = await Poem.find(searchQuery)
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(limit)
//         .catch(err => { console.error('Poem search error:', err); return []; });
//     }
    
//     if (!type || type === 'all' || type === 'authors') {
//       results.authors = await Author.find(searchQuery)
//         .sort({ name: 1 })
//         .limit(limit)
//         .catch(err => { console.error('Author search error:', err); return []; });
//     }
    
//     if (!type || type === 'all' || type === 'books') {
//       results.books = await Book.find(searchQuery)
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(limit)
//         .catch(err => { console.error('Book search error:', err); return []; });
//     }
    
//     if (!type || type === 'all' || type === 'audio') {
//       results.audio = await Audio.find(searchQuery)
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(limit)
//         .catch(err => { console.error('Audio search error:', err); return []; });
//     }
    
//     if (!type || type === 'all' || type === 'videos') {
//       results.videos = await Video.find(searchQuery)
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(limit)
//         .catch(err => { console.error('Video search error:', err); return []; });
//     }

//     console.log('Search results count:', {
//       poems: results.poems.length,
//       authors: results.authors.length,
//       books: results.books.length,
//       audio: results.audio.length,
//       videos: results.videos.length
//     });

//     successResponse(res, results);
//   } catch (error) {
//     console.error('Search error:', error);
//     errorResponse(res, error.message || 'Search failed', 500);
//   }
// };

// export const searchPoems = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     console.log('Search poems called with:', { q, page, limit });

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const searchQuery = createRegexSearchQuery(q, ['title', 'content', 'contentUrdu']);
//     if (searchQuery) {
//       searchQuery.isPublished = true;
//     }

//     const poems = await Poem.find(searchQuery || { isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .catch(err => { console.error('Poem find error:', err); return []; });

//     const total = await Poem.countDocuments(searchQuery || { isPublished: true })
//       .catch(err => { console.error('Poem count error:', err); return 0; });

//     console.log(`Found ${poems.length} poems, total: ${total}`);
//     paginatedResponse(res, poems, { page, limit, total });
//   } catch (error) {
//     console.error('Search poems error:', error);
//     next(error);
//   }
// };

// export const searchAuthors = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     console.log('Search authors called with:', { q, page, limit });

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const searchQuery = createRegexSearchQuery(q, ['name', 'nameUrdu', 'bio']);
//     if (searchQuery) {
//       searchQuery.isPublished = true;
//     }

//     const authors = await Author.find(searchQuery || { isPublished: true })
//       .skip(skip)
//       .limit(limit)
//       .catch(err => { console.error('Author find error:', err); return []; });

//     const total = await Author.countDocuments(searchQuery || { isPublished: true })
//       .catch(err => { console.error('Author count error:', err); return 0; });

//     console.log(`Found ${authors.length} authors, total: ${total}`);
//     paginatedResponse(res, authors, { page, limit, total });
//   } catch (error) {
//     console.error('Search authors error:', error);
//     next(error);
//   }
// };

// export const searchBooks = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     console.log('Search books called with:', { q, page, limit });

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const searchQuery = createRegexSearchQuery(q, ['title', 'description']);
//     if (searchQuery) {
//       searchQuery.isPublished = true;
//     }

//     const books = await Book.find(searchQuery || { isPublished: true })
//       .populate('author', 'name slug avatar')
//       .skip(skip)
//       .limit(limit)
//       .catch(err => { console.error('Book find error:', err); return []; });

//     const total = await Book.countDocuments(searchQuery || { isPublished: true })
//       .catch(err => { console.error('Book count error:', err); return 0; });

//     console.log(`Found ${books.length} books, total: ${total}`);
//     paginatedResponse(res, books, { page, limit, total });
//   } catch (error) {
//     console.error('Search books error:', error);
//     next(error);
//   }
// };

// export const searchAudio = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     console.log('Search audio called with:', { q, page, limit });

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const searchQuery = createRegexSearchQuery(q, ['title', 'description']);
//     if (searchQuery) {
//       searchQuery.isPublished = true;
//     }

//     const audio = await Audio.find(searchQuery || { isPublished: true })
//       .populate('author', 'name slug avatar')
//       .skip(skip)
//       .limit(limit)
//       .catch(err => { console.error('Audio find error:', err); return []; });

//     const total = await Audio.countDocuments(searchQuery || { isPublished: true })
//       .catch(err => { console.error('Audio count error:', err); return 0; });

//     console.log(`Found ${audio.length} audio files, total: ${total}`);
//     paginatedResponse(res, audio, { page, limit, total });
//   } catch (error) {
//     console.error('Search audio error:', error);
//     next(error);
//   }
// };

// export const searchVideos = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     console.log('Search videos called with:', { q, page, limit });

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const searchQuery = createRegexSearchQuery(q, ['title', 'description']);
//     if (searchQuery) {
//       searchQuery.isPublished = true;
//     }

//     const videos = await Video.find(searchQuery || { isPublished: true })
//       .populate('author', 'name slug avatar')
//       .skip(skip)
//       .limit(limit)
//       .catch(err => { console.error('Video find error:', err); return []; });

//     const total = await Video.countDocuments(searchQuery || { isPublished: true })
//       .catch(err => { console.error('Video count error:', err); return 0; });

//     console.log(`Found ${videos.length} videos, total: ${total}`);
//     paginatedResponse(res, videos, { page, limit, total });
//   } catch (error) {
//     console.error('Search videos error:', error);
//     next(error);
//   }
// };

// // Fixed semantic search (no text index required)
// export const semanticSearch = async (req, res, next) => {
//   try {
//     const { q, type } = req.query;
    
//     console.log('Semantic search called with:', { q, type });
    
//     if (!q || q.length < 2) {
//       return successResponse(res, { results: [] });
//     }
    
//     // Use regex search instead of text search
//     const searchQuery = createRegexSearchQuery(q);
    
//     let results = [];
    
//     try {
//       if (!type || type === 'all' || type === 'book') {
//         const books = await Book.find(searchQuery)
//           .populate('author', 'name slug')
//           .limit(10)
//           .then(r => r.map(item => ({ ...item.toObject(), contentType: 'book' })));
//         results.push(...books);
//       }
      
//       if (!type || type === 'all' || type === 'poem') {
//         const poems = await Poem.find(searchQuery)
//           .populate('author', 'name slug')
//           .limit(10)
//           .then(r => r.map(item => ({ ...item.toObject(), contentType: 'poem' })));
//         results.push(...poems);
//       }
      
//       if (!type || type === 'all' || type === 'author') {
//         const authors = await Author.find(searchQuery)
//           .limit(10)
//           .then(r => r.map(item => ({ ...item.toObject(), contentType: 'author' })));
//         results.push(...authors);
//       }
      
//       if (!type || type === 'all' || type === 'audio') {
//         const audio = await Audio.find(searchQuery)
//           .populate('author', 'name slug')
//           .limit(10)
//           .then(r => r.map(item => ({ ...item.toObject(), contentType: 'audio' })));
//         results.push(...audio);
//       }
      
//       if (!type || type === 'all' || type === 'video') {
//         const videos = await Video.find(searchQuery)
//           .populate('author', 'name slug')
//           .limit(10)
//           .then(r => r.map(item => ({ ...item.toObject(), contentType: 'video' })));
//         results.push(...videos);
//       }
//     } catch (err) {
//       console.error('Error in semantic search queries:', err);
//     }
    
//     console.log(`Semantic search found ${results.length} results`);
//     successResponse(res, { 
//       results,
//       query: q,
//       semantic: true,
//       total: results.length
//     });
//   } catch (error) {
//     console.error('Semantic search error:', error);
//     errorResponse(res, error.message || 'Semantic search failed', 500);
//   }
// };

// // Voice search endpoint
// export const voiceSearch = async (req, res, next) => {
//   try {
//     const { transcript, language = 'en' } = req.body;
    
//     console.log('Voice search called with transcript:', transcript);
    
//     if (!transcript || transcript.length < 2) {
//       return successResponse(res, { results: [] });
//     }
    
//     const searchQuery = createRegexSearchQuery(transcript);
    
//     const [poems, authors, audio, videos, books] = await Promise.all([
//       Poem.find(searchQuery).populate('author', 'name slug').limit(15).catch(() => []),
//       Author.find(searchQuery).limit(10).catch(() => []),
//       Audio.find(searchQuery).populate('author', 'name slug').limit(10).catch(() => []),
//       Video.find(searchQuery).populate('author', 'name slug').limit(10).catch(() => []),
//       Book.find(searchQuery).populate('author', 'name slug').limit(10).catch(() => [])
//     ]);
    
//     successResponse(res, {
//       query: transcript,
//       originalTranscript: transcript,
//       language,
//       results: {
//         poems,
//         authors,
//         audio,
//         videos,
//         books
//       }
//     });
//   } catch (error) {
//     console.error('Voice search error:', error);
//     errorResponse(res, error.message, 500);
//   }
// };

// export const getSearchSuggestions = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     console.log('Search suggestions called with:', q);
    
//     if (!q || q.length < 2) {
//       return successResponse(res, []);
//     }

//     const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    
//     const [poems, authors, audio] = await Promise.all([
//       Poem.find({ title: regex, isPublished: true }).select('title slug').limit(5).catch(() => []),
//       Author.find({ name: regex, isPublished: true }).select('name slug').limit(5).catch(() => []),
//       Audio.find({ title: regex, isPublished: true }).select('title slug type').limit(3).catch(() => [])
//     ]);

//     const suggestions = [
//       ...poems.map(p => ({ type: 'poem', title: p.title, slug: p.slug, category: 'Poetry' })),
//       ...authors.map(a => ({ type: 'author', title: a.name, slug: a.slug, category: 'Author' })),
//       ...audio.map(a => ({ type: 'audio', title: a.title, slug: a.slug, category: a.type || 'Audio' }))
//     ];

//     console.log(`Found ${suggestions.length} suggestions`);
//     successResponse(res, suggestions.slice(0, 10));
//   } catch (error) {
//     console.error('Search suggestions error:', error);
//     successResponse(res, []);
//   }
// };

// export const getTrendingSearches = async (req, res, next) => {
//   try {
//     const trending = [
//       { term: 'Mirza Ghalib', count: 1250, category: 'author' },
//       { term: 'Allama Iqbal', count: 980, category: 'author' },
//       { term: 'Faiz Ahmed Faiz', count: 850, category: 'author' },
//       { term: 'Nauha', count: 720, category: 'audio' },
//       { term: 'Marsiya', count: 650, category: 'audio' },
//       { term: 'Urdu Ghazal', count: 580, category: 'poem' },
//       { term: 'Mushaira', count: 450, category: 'video' },
//       { term: 'Karbala', count: 420, category: 'audio' },
//       { term: 'Hindi Kavita', count: 380, category: 'poem' },
//       { term: 'Manqabat', count: 350, category: 'audio' }
//     ];
//     successResponse(res, trending);
//   } catch (error) {
//     console.error('Trending searches error:', error);
//     successResponse(res, []);
//   }
// };
















// // server/controllers/search.controller.js
// import Poem from '../models/Poem.js';
// import Author from '../models/Author.js';
// import Book from '../models/Book.js';
// import Audio from '../models/Audio.js';
// import Video from '../models/Video.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination } from '../utils/pagination.js';

// // Helper function for creating regex search queries (works without text indexes)
// const createRegexSearchQuery = (q, fields = []) => {
//   if (!q || q.length < 2) return null;
  
//   // Escape special regex characters
//   const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
//   if (fields.length === 0) {
//     // Default search across common fields for all content types
//     return {
//       $or: [
//         { title: { $regex: escapedQuery, $options: 'i' } },
//         { name: { $regex: escapedQuery, $options: 'i' } },
//         { nameUrdu: { $regex: escapedQuery, $options: 'i' } },
//         { description: { $regex: escapedQuery, $options: 'i' } },
//         { content: { $regex: escapedQuery, $options: 'i' } },
//         { contentUrdu: { $regex: escapedQuery, $options: 'i' } },
//         { bio: { $regex: escapedQuery, $options: 'i' } },
//         { 'author.name': { $regex: escapedQuery, $options: 'i' } },
//         { tags: { $in: [new RegExp(escapedQuery, 'i')] } },
//         { type: { $regex: escapedQuery, $options: 'i' } }
//       ]
//     };
//   }
  
//   // Build OR condition for specified fields
//   const conditions = fields.map(field => ({
//     [field]: { $regex: escapedQuery, $options: 'i' }
//   }));
  
//   return { $or: conditions };
// };

// // Helper to search by author name for any content type
// const searchByAuthorName = async (q, model, populateFields = '', limit = 20) => {
//   const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
//   // Find authors matching the query
//   const matchingAuthors = await Author.find({
//     $or: [
//       { name: { $regex: escapedQuery, $options: 'i' } },
//       { nameUrdu: { $regex: escapedQuery, $options: 'i' } }
//     ],
//     isPublished: true
//   }).select('_id').limit(10);
  
//   if (matchingAuthors.length === 0) return [];
  
//   const authorIds = matchingAuthors.map(a => a._id);
  
//   let query = model.find({ 
//     author: { $in: authorIds },
//     isPublished: true 
//   });
  
//   if (populateFields) {
//     query = query.populate(populateFields);
//   }
  
//   return await query.sort({ createdAt: -1 }).limit(limit);
// };

// // ==================== UNIFIED SEARCH ====================
// export const unifiedSearch = async (req, res, next) => {
//   try {
//     const { q, type, page = 1, limit = 20 } = req.query;
    
//     console.log('Unified search called with:', { q, type, page, limit });
    
//     if (!q || q.length < 2) {
//       return successResponse(res, { 
//         poems: [], 
//         authors: [], 
//         books: [], 
//         audio: [], 
//         videos: [] 
//       });
//     }

//     const searchQuery = createRegexSearchQuery(q);
//     const limitNum = parseInt(limit);
//     const skip = (parseInt(page) - 1) * limitNum;

//     const results = {
//       poems: [],
//       authors: [],
//       books: [],
//       audio: [],
//       videos: []
//     };

//     // Search poems
//     if (!type || type === 'all' || type === 'poems') {
//       let poems = await Poem.find({ ...searchQuery, isPublished: true })
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(limitNum)
//         .lean()
//         .catch(err => { console.error('Poem search error:', err); return []; });
      
//       // If no poems found, try searching by author
//       if (poems.length === 0) {
//         poems = await searchByAuthorName(q, Poem, 'author name slug avatar', limitNum);
//       }
      
//       results.poems = poems;
//     }
    
//     // Search authors
//     if (!type || type === 'all' || type === 'authors') {
//       results.authors = await Author.find({ ...searchQuery, isPublished: true })
//         .sort({ name: 1 })
//         .limit(limitNum)
//         .lean()
//         .catch(err => { console.error('Author search error:', err); return []; });
//     }
    
//     // Search books
//     if (!type || type === 'all' || type === 'books') {
//       let books = await Book.find({ ...searchQuery, isPublished: true })
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(limitNum)
//         .lean()
//         .catch(err => { console.error('Book search error:', err); return []; });
      
//       // If no books found, try searching by author
//       if (books.length === 0) {
//         books = await searchByAuthorName(q, Book, 'author name slug avatar', limitNum);
//       }
      
//       results.books = books;
//     }
    
//     // Search audio
//     if (!type || type === 'all' || type === 'audio') {
//       let audio = await Audio.find({ ...searchQuery, isPublished: true })
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(limitNum)
//         .lean()
//         .catch(err => { console.error('Audio search error:', err); return []; });
      
//       // If no audio found, try searching by author
//       if (audio.length === 0) {
//         audio = await searchByAuthorName(q, Audio, 'author name slug avatar', limitNum);
//       }
      
//       results.audio = audio;
//     }
    
//     // Search videos
//     if (!type || type === 'all' || type === 'videos') {
//       let videos = await Video.find({ ...searchQuery, isPublished: true })
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(limitNum)
//         .lean()
//         .catch(err => { console.error('Video search error:', err); return []; });
      
//       // If no videos found, try searching by author
//       if (videos.length === 0) {
//         videos = await searchByAuthorName(q, Video, 'author name slug avatar', limitNum);
//       }
      
//       results.videos = videos;
//     }

//     const totalResults = 
//       results.poems.length + 
//       results.authors.length + 
//       results.books.length + 
//       results.audio.length + 
//       results.videos.length;

//     console.log('Search results count:', {
//       poems: results.poems.length,
//       authors: results.authors.length,
//       books: results.books.length,
//       audio: results.audio.length,
//       videos: results.videos.length,
//       total: totalResults
//     });

//     successResponse(res, results);
//   } catch (error) {
//     console.error('Search error:', error);
//     errorResponse(res, error.message || 'Search failed', 500);
//   }
// };

// // ==================== SEARCH POEMS ====================
// export const searchPoems = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     console.log('Search poems called with:', { q, page, limit });

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
//     // Create comprehensive search query for poems
//     const searchCondition = {
//       $or: [
//         { title: { $regex: escapedQuery, $options: 'i' } },
//         { content: { $regex: escapedQuery, $options: 'i' } },
//         { contentUrdu: { $regex: escapedQuery, $options: 'i' } },
//         { tags: { $in: [new RegExp(escapedQuery, 'i')] } },
//         { 'author.name': { $regex: escapedQuery, $options: 'i' } }
//       ],
//       isPublished: true
//     };

//     let poems = await Poem.find(searchCondition)
//       .populate('author', 'name slug avatar bio')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     // If no poems found, try searching by author
//     if (poems.length === 0) {
//       const authorMatch = await Author.find({
//         name: { $regex: escapedQuery, $options: 'i' },
//         isPublished: true
//       }).select('_id').limit(5);
      
//       if (authorMatch.length > 0) {
//         poems = await Poem.find({
//           author: { $in: authorMatch.map(a => a._id) },
//           isPublished: true
//         })
//           .populate('author', 'name slug avatar bio')
//           .sort({ createdAt: -1 })
//           .skip(skip)
//           .limit(limit)
//           .lean();
//       }
//     }

//     const total = await Poem.countDocuments(searchCondition);
//     const finalTotal = total > 0 ? total : poems.length;

//     console.log(`Found ${poems.length} poems, total: ${finalTotal}`);
//     paginatedResponse(res, poems, { page, limit, total: finalTotal });
//   } catch (error) {
//     console.error('Search poems error:', error);
//     next(error);
//   }
// };

// // ==================== SEARCH AUTHORS ====================
// export const searchAuthors = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     console.log('Search authors called with:', { q, page, limit });

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
//     const searchCondition = {
//       $or: [
//         { name: { $regex: escapedQuery, $options: 'i' } },
//         { nameUrdu: { $regex: escapedQuery, $options: 'i' } },
//         { bio: { $regex: escapedQuery, $options: 'i' } },
//         { penName: { $regex: escapedQuery, $options: 'i' } }
//       ],
//       isPublished: true
//     };

//     const authors = await Author.find(searchCondition)
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     const total = await Author.countDocuments(searchCondition);

//     console.log(`Found ${authors.length} authors, total: ${total}`);
//     paginatedResponse(res, authors, { page, limit, total });
//   } catch (error) {
//     console.error('Search authors error:', error);
//     next(error);
//   }
// };

// // ==================== SEARCH BOOKS ====================
// export const searchBooks = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     console.log('Search books called with:', { q, page, limit });

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
//     const searchCondition = {
//       $or: [
//         { title: { $regex: escapedQuery, $options: 'i' } },
//         { titleUrdu: { $regex: escapedQuery, $options: 'i' } },
//         { description: { $regex: escapedQuery, $options: 'i' } },
//         { publisher: { $regex: escapedQuery, $options: 'i' } },
//         { isbn: { $regex: escapedQuery, $options: 'i' } },
//         { tags: { $in: [new RegExp(escapedQuery, 'i')] } }
//       ],
//       isPublished: true
//     };

//     let books = await Book.find(searchCondition)
//       .populate('author', 'name slug avatar bio')
//       .populate('category', 'name slug')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     // If no books found, search by author
//     if (books.length === 0) {
//       const matchingAuthors = await Author.find({
//         name: { $regex: escapedQuery, $options: 'i' },
//         isPublished: true
//       }).select('_id').limit(10);
      
//       if (matchingAuthors.length > 0) {
//         books = await Book.find({
//           author: { $in: matchingAuthors.map(a => a._id) },
//           isPublished: true
//         })
//           .populate('author', 'name slug avatar bio')
//           .populate('category', 'name slug')
//           .sort({ createdAt: -1 })
//           .skip(skip)
//           .limit(limit)
//           .lean();
//       }
//     }

//     const total = await Book.countDocuments(searchCondition);
//     const finalTotal = total > 0 ? total : books.length;

//     console.log(`Found ${books.length} books, total: ${finalTotal}`);
//     paginatedResponse(res, books, { page, limit, total: finalTotal });
//   } catch (error) {
//     console.error('Search books error:', error);
//     next(error);
//   }
// };

// // ==================== SEARCH AUDIO ====================
// export const searchAudio = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     console.log('Search audio called with:', { q, page, limit });

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
//     const searchCondition = {
//       $or: [
//         { title: { $regex: escapedQuery, $options: 'i' } },
//         { description: { $regex: escapedQuery, $options: 'i' } },
//         { type: { $regex: escapedQuery, $options: 'i' } },
//         { tags: { $in: [new RegExp(escapedQuery, 'i')] } },
//         { occasion: { $regex: escapedQuery, $options: 'i' } },
//         { 'reciter.name': { $regex: escapedQuery, $options: 'i' } }
//       ],
//       isPublished: true
//     };

//     let audio = await Audio.find(searchCondition)
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     // If no audio found, search by author
//     if (audio.length === 0) {
//       const matchingAuthors = await Author.find({
//         name: { $regex: escapedQuery, $options: 'i' },
//         isPublished: true
//       }).select('_id').limit(10);
      
//       if (matchingAuthors.length > 0) {
//         audio = await Audio.find({
//           author: { $in: matchingAuthors.map(a => a._id) },
//           isPublished: true
//         })
//           .populate('author', 'name slug avatar')
//           .sort({ createdAt: -1 })
//           .skip(skip)
//           .limit(limit)
//           .lean();
//       }
//     }

//     const total = await Audio.countDocuments(searchCondition);
//     const finalTotal = total > 0 ? total : audio.length;

//     console.log(`Found ${audio.length} audio files, total: ${finalTotal}`);
//     paginatedResponse(res, audio, { page, limit, total: finalTotal });
//   } catch (error) {
//     console.error('Search audio error:', error);
//     next(error);
//   }
// };

// // ==================== SEARCH VIDEOS ====================
// export const searchVideos = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     console.log('Search videos called with:', { q, page, limit });

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
//     const searchCondition = {
//       $or: [
//         { title: { $regex: escapedQuery, $options: 'i' } },
//         { description: { $regex: escapedQuery, $options: 'i' } },
//         { type: { $regex: escapedQuery, $options: 'i' } },
//         { tags: { $in: [new RegExp(escapedQuery, 'i')] } }
//       ],
//       isPublished: true
//     };

//     let videos = await Video.find(searchCondition)
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     // If no videos found, search by author
//     if (videos.length === 0) {
//       const matchingAuthors = await Author.find({
//         name: { $regex: escapedQuery, $options: 'i' },
//         isPublished: true
//       }).select('_id').limit(10);
      
//       if (matchingAuthors.length > 0) {
//         videos = await Video.find({
//           author: { $in: matchingAuthors.map(a => a._id) },
//           isPublished: true
//         })
//           .populate('author', 'name slug avatar')
//           .sort({ createdAt: -1 })
//           .skip(skip)
//           .limit(limit)
//           .lean();
//       }
//     }

//     const total = await Video.countDocuments(searchCondition);
//     const finalTotal = total > 0 ? total : videos.length;

//     console.log(`Found ${videos.length} videos, total: ${finalTotal}`);
//     paginatedResponse(res, videos, { page, limit, total: finalTotal });
//   } catch (error) {
//     console.error('Search videos error:', error);
//     next(error);
//   }
// };

// // ==================== SEMANTIC / AI SEARCH ====================
// export const semanticSearch = async (req, res, next) => {
//   try {
//     const { q, type, page = 1, limit = 20 } = req.query;
    
//     console.log('Semantic search called with:', { q, type, page, limit });
    
//     if (!q || q.length < 2) {
//       return successResponse(res, { results: [], total: 0, page: 1, totalPages: 0 });
//     }

//     const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
//     const limitNum = parseInt(limit);
//     const skip = (parseInt(page) - 1) * limitNum;
    
//     const searchCondition = {
//       $or: [
//         { title: { $regex: escapedQuery, $options: 'i' } },
//         { name: { $regex: escapedQuery, $options: 'i' } },
//         { description: { $regex: escapedQuery, $options: 'i' } },
//         { content: { $regex: escapedQuery, $options: 'i' } },
//         { tags: { $in: [new RegExp(escapedQuery, 'i')] } }
//       ],
//       isPublished: true
//     };
    
//     let results = [];
//     let total = 0;
    
//     try {
//       // Search based on type parameter
//       const searchTypes = !type || type === 'all' 
//         ? ['poem', 'author', 'book', 'audio', 'video']
//         : [type];
      
//       for (const searchType of searchTypes) {
//         let items = [];
//         let count = 0;
        
//         switch (searchType) {
//           case 'poem':
//             items = await Poem.find(searchCondition)
//               .populate('author', 'name slug')
//               .limit(limitNum)
//               .lean()
//               .then(r => r.map(item => ({ ...item, contentType: 'poem' })));
//             count = await Poem.countDocuments(searchCondition);
//             break;
            
//           case 'author':
//             items = await Author.find(searchCondition)
//               .limit(limitNum)
//               .lean()
//               .then(r => r.map(item => ({ ...item, contentType: 'author' })));
//             count = await Author.countDocuments(searchCondition);
//             break;
            
//           case 'book':
//             items = await Book.find(searchCondition)
//               .populate('author', 'name slug')
//               .limit(limitNum)
//               .lean()
//               .then(r => r.map(item => ({ ...item, contentType: 'book' })));
//             count = await Book.countDocuments(searchCondition);
//             break;
            
//           case 'audio':
//             items = await Audio.find(searchCondition)
//               .populate('author', 'name slug')
//               .limit(limitNum)
//               .lean()
//               .then(r => r.map(item => ({ ...item, contentType: 'audio' })));
//             count = await Audio.countDocuments(searchCondition);
//             break;
            
//           case 'video':
//             items = await Video.find(searchCondition)
//               .populate('author', 'name slug')
//               .limit(limitNum)
//               .lean()
//               .then(r => r.map(item => ({ ...item, contentType: 'video' })));
//             count = await Video.countDocuments(searchCondition);
//             break;
//         }
        
//         results.push(...items);
//         total += count;
//       }
      
//       // Apply pagination to combined results
//       results = results.slice(skip, skip + limitNum);
      
//     } catch (err) {
//       console.error('Error in semantic search queries:', err);
//     }
    
//     const totalPages = Math.ceil(total / limitNum);
    
//     console.log(`Semantic search found ${results.length} results out of ${total} total`);
    
//     successResponse(res, { 
//       results,
//       query: q,
//       semantic: true,
//       total,
//       page: parseInt(page),
//       limit: limitNum,
//       totalPages
//     });
//   } catch (error) {
//     console.error('Semantic search error:', error);
//     errorResponse(res, error.message || 'Semantic search failed', 500);
//   }
// };

// // ==================== VOICE SEARCH ====================
// export const voiceSearch = async (req, res, next) => {
//   try {
//     const { transcript, language = 'en' } = req.body;
    
//     console.log('Voice search called with transcript:', transcript);
    
//     if (!transcript || transcript.length < 2) {
//       return successResponse(res, { results: [], query: '' });
//     }
    
//     const escapedQuery = transcript.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
//     const searchCondition = {
//       $or: [
//         { title: { $regex: escapedQuery, $options: 'i' } },
//         { name: { $regex: escapedQuery, $options: 'i' } },
//         { description: { $regex: escapedQuery, $options: 'i' } },
//         { content: { $regex: escapedQuery, $options: 'i' } }
//       ],
//       isPublished: true
//     };
    
//     const [poems, authors, audio, videos, books] = await Promise.all([
//       Poem.find(searchCondition).populate('author', 'name slug').limit(15).lean().catch(() => []),
//       Author.find(searchCondition).limit(10).lean().catch(() => []),
//       Audio.find(searchCondition).populate('author', 'name slug').limit(10).lean().catch(() => []),
//       Video.find(searchCondition).populate('author', 'name slug').limit(10).lean().catch(() => []),
//       Book.find(searchCondition).populate('author', 'name slug').limit(10).lean().catch(() => [])
//     ]);
    
//     const totalResults = poems.length + authors.length + audio.length + videos.length + books.length;
    
//     console.log(`Voice search found ${totalResults} results for "${transcript}"`);
    
//     successResponse(res, {
//       query: transcript,
//       originalTranscript: transcript,
//       language,
//       total: totalResults,
//       results: {
//         poems: poems.map(p => ({ ...p, contentType: 'poem' })),
//         authors: authors.map(a => ({ ...a, contentType: 'author' })),
//         audio: audio.map(a => ({ ...a, contentType: 'audio' })),
//         videos: videos.map(v => ({ ...v, contentType: 'video' })),
//         books: books.map(b => ({ ...b, contentType: 'book' }))
//       }
//     });
//   } catch (error) {
//     console.error('Voice search error:', error);
//     errorResponse(res, error.message, 500);
//   }
// };

// // ==================== SEARCH SUGGESTIONS ====================
// export const getSearchSuggestions = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     console.log('Search suggestions called with:', q);
    
//     if (!q || q.length < 2) {
//       return successResponse(res, []);
//     }

//     const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
//     const regex = new RegExp(escapedQuery, 'i');
    
//     const [poems, authors, audio, books] = await Promise.all([
//       Poem.find({ title: regex, isPublished: true }).select('title slug').limit(5).lean().catch(() => []),
//       Author.find({ name: regex, isPublished: true }).select('name slug').limit(5).lean().catch(() => []),
//       Audio.find({ title: regex, isPublished: true }).select('title slug type').limit(3).lean().catch(() => []),
//       Book.find({ title: regex, isPublished: true }).select('title slug').limit(3).lean().catch(() => [])
//     ]);

//     const suggestions = [
//       ...poems.map(p => ({ type: 'poem', title: p.title, slug: p.slug, category: 'Poetry' })),
//       ...authors.map(a => ({ type: 'author', title: a.name, slug: a.slug, category: 'Author' })),
//       ...audio.map(a => ({ type: 'audio', title: a.title, slug: a.slug, category: a.type || 'Audio' })),
//       ...books.map(b => ({ type: 'book', title: b.title, slug: b.slug, category: 'Book' }))
//     ];

//     console.log(`Found ${suggestions.length} suggestions`);
//     successResponse(res, suggestions.slice(0, 15));
//   } catch (error) {
//     console.error('Search suggestions error:', error);
//     successResponse(res, []);
//   }
// };

// // ==================== TRENDING SEARCHES ====================
// export const getTrendingSearches = async (req, res, next) => {
//   try {
//     const trending = [
//       { term: 'Mirza Ghalib', count: 1250, category: 'author' },
//       { term: 'Allama Iqbal', count: 980, category: 'author' },
//       { term: 'Faiz Ahmed Faiz', count: 850, category: 'author' },
//       { term: 'Nauha', count: 720, category: 'audio' },
//       { term: 'Marsiya', count: 650, category: 'audio' },
//       { term: 'Urdu Ghazal', count: 580, category: 'poem' },
//       { term: 'Mushaira', count: 450, category: 'video' },
//       { term: 'Karbala', count: 420, category: 'audio' },
//       { term: 'Hindi Kavita', count: 380, category: 'poem' },
//       { term: 'Manqabat', count: 350, category: 'audio' },
//       { term: 'Soz', count: 320, category: 'audio' },
//       { term: 'Salam', count: 290, category: 'audio' },
//       { term: 'Rekhti', count: 250, category: 'poem' },
//       { term: 'Qawwali', count: 230, category: 'audio' }
//     ];
//     successResponse(res, trending);
//   } catch (error) {
//     console.error('Trending searches error:', error);
//     successResponse(res, []);
//   }
// };

// // ==================== DEBUG ENDPOINT ====================
// export const debugSearch = async (req, res, next) => {
//   try {
//     const { q } = req.query;
    
//     const escapedQuery = q ? q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : '';
//     const regex = escapedQuery ? new RegExp(escapedQuery, 'i') : null;
    
//     const results = {
//       poems: await Poem.find(regex ? { title: regex, isPublished: true } : { isPublished: true })
//         .limit(5).select('title').lean().catch(() => []),
//       authors: await Author.find(regex ? { name: regex, isPublished: true } : { isPublished: true })
//         .limit(5).select('name').lean().catch(() => []),
//       books: await Book.find(regex ? { title: regex, isPublished: true } : { isPublished: true })
//         .limit(5).select('title author').lean().catch(() => []),
//       audio: await Audio.find(regex ? { title: regex, isPublished: true } : { isPublished: true })
//         .limit(5).select('title type').lean().catch(() => []),
//       videos: await Video.find(regex ? { title: regex, isPublished: true } : { isPublished: true })
//         .limit(5).select('title').lean().catch(() => [])
//     };
    
//     const counts = {
//       poems: await Poem.countDocuments({ isPublished: true }).catch(() => 0),
//       authors: await Author.countDocuments({ isPublished: true }).catch(() => 0),
//       books: await Book.countDocuments({ isPublished: true }).catch(() => 0),
//       audio: await Audio.countDocuments({ isPublished: true }).catch(() => 0),
//       videos: await Video.countDocuments({ isPublished: true }).catch(() => 0)
//     };
    
//     successResponse(res, {
//       message: q ? `Search debug for "${q}"` : 'Database stats',
//       searchQuery: q || 'none',
//       sampleData: results,
//       totalCounts: counts,
//       timestamp: new Date().toISOString()
//     });
//   } catch (error) {
//     console.error('Debug search error:', error);
//     errorResponse(res, error.message, 500);
//   }
// };



















// // server/controllers/search.controller.js
// import Poem from '../models/Poem.js';
// import Author from '../models/Author.js';
// import Book from '../models/Book.js';
// import Audio from '../models/Audio.js';
// import Video from '../models/Video.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination } from '../utils/pagination.js';

// // Helper function for creating comprehensive search queries
// const createComprehensiveSearchQuery = (q, searchInFields = []) => {
//   if (!q || q.length < 2) return null;
  
//   // Escape special regex characters
//   const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
//   // Split query into words for better matching
//   const words = escapedQuery.split(/\s+/).filter(w => w.length > 1);
  
//   const conditions = [];
  
//   // Add condition for exact phrase match
//   conditions.push(
//     { title: { $regex: escapedQuery, $options: 'i' } },
//     { name: { $regex: escapedQuery, $options: 'i' } },
//     { description: { $regex: escapedQuery, $options: 'i' } },
//     { content: { $regex: escapedQuery, $options: 'i' } }
//   );
  
//   // Add conditions for individual words (for better matching)
//   words.forEach(word => {
//     if (word.length > 2) {
//       conditions.push(
//         { title: { $regex: word, $options: 'i' } },
//         { name: { $regex: word, $options: 'i' } },
//         { description: { $regex: word, $options: 'i' } },
//         { content: { $regex: word, $options: 'i' } },
//         { tags: { $in: [new RegExp(word, 'i')] } }
//       );
//     }
//   });
  
//   // If specific fields are provided, add those conditions
//   if (searchInFields.length > 0) {
//     searchInFields.forEach(field => {
//       conditions.push({ [field]: { $regex: escapedQuery, $options: 'i' } });
//       words.forEach(word => {
//         if (word.length > 2) {
//           conditions.push({ [field]: { $regex: word, $options: 'i' } });
//         }
//       });
//     });
//   }
  
//   return { $or: conditions };
// };

// // Helper to search by author name for any content type
// const searchByAuthorName = async (q, model, populateFields = '', limit = 20, skip = 0) => {
//   const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
//   // Find authors matching the query
//   const matchingAuthors = await Author.find({
//     $or: [
//       { name: { $regex: escapedQuery, $options: 'i' } },
//       { nameUrdu: { $regex: escapedQuery, $options: 'i' } },
//       { bio: { $regex: escapedQuery, $options: 'i' } }
//     ],
//     isPublished: true
//   }).select('_id').limit(20);
  
//   if (matchingAuthors.length === 0) return [];
  
//   const authorIds = matchingAuthors.map(a => a._id);
  
//   let query = model.find({ 
//     author: { $in: authorIds },
//     isPublished: true 
//   });
  
//   if (populateFields) {
//     query = query.populate(populateFields);
//   }
  
//   return await query.sort({ createdAt: -1 }).skip(skip).limit(limit);
// };

// // ==================== UNIFIED SEARCH ====================
// export const unifiedSearch = async (req, res, next) => {
//   try {
//     const { q, type, page = 1, limit = 20 } = req.query;
    
//     console.log('Unified search called with:', { q, type, page, limit });
    
//     if (!q || q.length < 2) {
//       return successResponse(res, { 
//         poems: [], 
//         authors: [], 
//         books: [], 
//         audio: [], 
//         videos: [] 
//       });
//     }

//     const limitNum = parseInt(limit);
//     const searchQuery = createComprehensiveSearchQuery(q);
    
//     const results = {
//       poems: [],
//       authors: [],
//       books: [],
//       audio: [],
//       videos: []
//     };

//     // Search poems
//     if (!type || type === 'all' || type === 'poems') {
//       let poems = await Poem.find({ ...searchQuery, isPublished: true })
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(limitNum)
//         .lean()
//         .catch(err => { console.error('Poem search error:', err); return []; });
      
//       if (poems.length === 0) {
//         poems = await searchByAuthorName(q, Poem, 'author name slug avatar', limitNum);
//       }
      
//       results.poems = poems;
//     }
    
//     // Search authors
//     if (!type || type === 'all' || type === 'authors') {
//       results.authors = await Author.find({ ...searchQuery, isPublished: true })
//         .sort({ name: 1 })
//         .limit(limitNum)
//         .lean()
//         .catch(err => { console.error('Author search error:', err); return []; });
//     }
    
//     // Search books
//     if (!type || type === 'all' || type === 'books') {
//       let books = await Book.find({ ...searchQuery, isPublished: true })
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(limitNum)
//         .lean()
//         .catch(err => { console.error('Book search error:', err); return []; });
      
//       if (books.length === 0) {
//         books = await searchByAuthorName(q, Book, 'author name slug avatar', limitNum);
//       }
      
//       results.books = books;
//     }
    
//     // Search audio
//     if (!type || type === 'all' || type === 'audio') {
//       let audio = await Audio.find({ ...searchQuery, isPublished: true })
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(limitNum)
//         .lean()
//         .catch(err => { console.error('Audio search error:', err); return []; });
      
//       if (audio.length === 0) {
//         audio = await searchByAuthorName(q, Audio, 'author name slug avatar', limitNum);
//       }
      
//       results.audio = audio;
//     }
    
//     // Search videos
//     if (!type || type === 'all' || type === 'videos') {
//       let videos = await Video.find({ ...searchQuery, isPublished: true })
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(limitNum)
//         .lean()
//         .catch(err => { console.error('Video search error:', err); return []; });
      
//       if (videos.length === 0) {
//         videos = await searchByAuthorName(q, Video, 'author name slug avatar', limitNum);
//       }
      
//       results.videos = videos;
//     }

//     const totalResults = 
//       results.poems.length + 
//       results.authors.length + 
//       results.books.length + 
//       results.audio.length + 
//       results.videos.length;

//     console.log('Search results count:', {
//       poems: results.poems.length,
//       authors: results.authors.length,
//       books: results.books.length,
//       audio: results.audio.length,
//       videos: results.videos.length,
//       total: totalResults
//     });

//     successResponse(res, results);
//   } catch (error) {
//     console.error('Search error:', error);
//     errorResponse(res, error.message || 'Search failed', 500);
//   }
// };

// // ==================== SEARCH POEMS ====================
// export const searchPoems = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     console.log('Search poems called with:', { q, page, limit });

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const searchQuery = createComprehensiveSearchQuery(q, ['title', 'content', 'contentUrdu', 'tags']);
    
//     let poems = await Poem.find({ ...searchQuery, isPublished: true })
//       .populate('author', 'name slug avatar bio')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     if (poems.length === 0) {
//       poems = await searchByAuthorName(q, Poem, 'author name slug avatar bio', limit, skip);
//     }

//     const total = await Poem.countDocuments({ ...searchQuery, isPublished: true });
//     const finalTotal = total > 0 ? total : poems.length;

//     console.log(`Found ${poems.length} poems, total: ${finalTotal}`);
//     paginatedResponse(res, poems, { page, limit, total: finalTotal });
//   } catch (error) {
//     console.error('Search poems error:', error);
//     next(error);
//   }
// };

// // ==================== SEARCH AUTHORS ====================
// export const searchAuthors = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     console.log('Search authors called with:', { q, page, limit });

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const searchQuery = createComprehensiveSearchQuery(q, ['name', 'nameUrdu', 'bio', 'penName']);
    
//     const authors = await Author.find({ ...searchQuery, isPublished: true })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     const total = await Author.countDocuments({ ...searchQuery, isPublished: true });

//     console.log(`Found ${authors.length} authors, total: ${total}`);
//     paginatedResponse(res, authors, { page, limit, total });
//   } catch (error) {
//     console.error('Search authors error:', error);
//     next(error);
//   }
// };

// // ==================== SEARCH BOOKS ====================
// export const searchBooks = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     console.log('Search books called with:', { q, page, limit });

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const searchQuery = createComprehensiveSearchQuery(q, ['title', 'titleUrdu', 'description', 'publisher', 'isbn', 'tags']);
    
//     let books = await Book.find({ ...searchQuery, isPublished: true })
//       .populate('author', 'name slug avatar bio')
//       .populate('category', 'name slug')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     if (books.length === 0) {
//       books = await searchByAuthorName(q, Book, 'author name slug avatar bio', limit, skip);
//     }

//     const total = await Book.countDocuments({ ...searchQuery, isPublished: true });
//     const finalTotal = total > 0 ? total : books.length;

//     console.log(`Found ${books.length} books, total: ${finalTotal}`);
//     paginatedResponse(res, books, { page, limit, total: finalTotal });
//   } catch (error) {
//     console.error('Search books error:', error);
//     next(error);
//   }
// };

// // ==================== SEARCH AUDIO ====================
// export const searchAudio = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     console.log('Search audio called with:', { q, page, limit });

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const searchQuery = createComprehensiveSearchQuery(q, ['title', 'description', 'type', 'tags', 'occasion', 'reciter.name']);
    
//     let audio = await Audio.find({ ...searchQuery, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     if (audio.length === 0) {
//       audio = await searchByAuthorName(q, Audio, 'author name slug avatar', limit, skip);
//     }

//     const total = await Audio.countDocuments({ ...searchQuery, isPublished: true });
//     const finalTotal = total > 0 ? total : audio.length;

//     console.log(`Found ${audio.length} audio files, total: ${finalTotal}`);
//     paginatedResponse(res, audio, { page, limit, total: finalTotal });
//   } catch (error) {
//     console.error('Search audio error:', error);
//     next(error);
//   }
// };

// // ==================== SEARCH VIDEOS ====================
// export const searchVideos = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     console.log('Search videos called with:', { q, page, limit });

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const searchQuery = createComprehensiveSearchQuery(q, ['title', 'description', 'type', 'tags']);
    
//     let videos = await Video.find({ ...searchQuery, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     if (videos.length === 0) {
//       videos = await searchByAuthorName(q, Video, 'author name slug avatar', limit, skip);
//     }

//     const total = await Video.countDocuments({ ...searchQuery, isPublished: true });
//     const finalTotal = total > 0 ? total : videos.length;

//     console.log(`Found ${videos.length} videos, total: ${finalTotal}`);
//     paginatedResponse(res, videos, { page, limit, total: finalTotal });
//   } catch (error) {
//     console.error('Search videos error:', error);
//     next(error);
//   }
// };

// // ==================== SEMANTIC / AI SEARCH ====================
// export const semanticSearch = async (req, res, next) => {
//   try {
//     const { q, type, page = 1, limit = 20 } = req.query;
    
//     console.log('Semantic search called with:', { q, type, page, limit });
    
//     if (!q || q.length < 2) {
//       return successResponse(res, { results: [], total: 0, page: 1, limit: 20, totalPages: 0 });
//     }

//     const limitNum = parseInt(limit);
//     const skip = (parseInt(page) - 1) * limitNum;
    
//     // Create semantic search query with word variations
//     const words = q.toLowerCase().split(/\s+/).filter(w => w.length > 2);
//     const semanticConditions = [];
    
//     // Add conditions for each word with common variations
//     words.forEach(word => {
//       semanticConditions.push(
//         { title: { $regex: word, $options: 'i' } },
//         { name: { $regex: word, $options: 'i' } },
//         { description: { $regex: word, $options: 'i' } },
//         { content: { $regex: word, $options: 'i' } },
//         { tags: { $in: [new RegExp(word, 'i')] } }
//       );
      
//       // Add common Urdu word mappings for better semantic search
//       const wordMappings = {
//         'love': ['ishq', 'mohabbat', 'pyar', 'prem'],
//         'poetry': ['shayari', 'kavita', 'nazm', 'ghazal'],
//         'sad': ['gham', 'udaasi', 'dard', 'ranj'],
//         'happy': ['khushi', 'anand', 'masarrat'],
//         'god': ['allah', 'khuda', 'rab', 'parwardigar']
//       };
      
//       // Check if word has synonyms and add them
//       for (const [key, synonyms] of Object.entries(wordMappings)) {
//         if (word.includes(key) || key.includes(word)) {
//           synonyms.forEach(synonym => {
//             semanticConditions.push(
//               { title: { $regex: synonym, $options: 'i' } },
//               { content: { $regex: synonym, $options: 'i' } },
//               { tags: { $in: [new RegExp(synonym, 'i')] } }
//             );
//           });
//         }
//       }
//     });
    
//     const searchCondition = { 
//       $or: semanticConditions,
//       isPublished: true 
//     };
    
//     let results = [];
//     let total = 0;
    
//     try {
//       // Search based on type parameter
//       const searchTypes = !type || type === 'all' 
//         ? ['poem', 'author', 'book', 'audio', 'video']
//         : [type];
      
//       for (const searchType of searchTypes) {
//         let items = [];
//         let count = 0;
        
//         switch (searchType) {
//           case 'poem':
//             items = await Poem.find(searchCondition)
//               .populate('author', 'name slug')
//               .limit(limitNum)
//               .lean()
//               .then(r => r.map(item => ({ ...item, contentType: 'poem' })));
//             count = await Poem.countDocuments(searchCondition);
//             break;
            
//           case 'author':
//             items = await Author.find(searchCondition)
//               .limit(limitNum)
//               .lean()
//               .then(r => r.map(item => ({ ...item, contentType: 'author' })));
//             count = await Author.countDocuments(searchCondition);
//             break;
            
//           case 'book':
//             items = await Book.find(searchCondition)
//               .populate('author', 'name slug')
//               .limit(limitNum)
//               .lean()
//               .then(r => r.map(item => ({ ...item, contentType: 'book' })));
//             count = await Book.countDocuments(searchCondition);
//             break;
            
//           case 'audio':
//             items = await Audio.find(searchCondition)
//               .populate('author', 'name slug')
//               .limit(limitNum)
//               .lean()
//               .then(r => r.map(item => ({ ...item, contentType: 'audio' })));
//             count = await Audio.countDocuments(searchCondition);
//             break;
            
//           case 'video':
//             items = await Video.find(searchCondition)
//               .populate('author', 'name slug')
//               .limit(limitNum)
//               .lean()
//               .then(r => r.map(item => ({ ...item, contentType: 'video' })));
//             count = await Video.countDocuments(searchCondition);
//             break;
//         }
        
//         results.push(...items);
//         total += count;
//       }
      
//       // Apply pagination to combined results
//       results = results.slice(skip, skip + limitNum);
      
//     } catch (err) {
//       console.error('Error in semantic search queries:', err);
//     }
    
//     const totalPages = Math.ceil(total / limitNum);
    
//     console.log(`Semantic search found ${results.length} results out of ${total} total for "${q}"`);
    
//     successResponse(res, { 
//       results,
//       query: q,
//       semantic: true,
//       total,
//       page: parseInt(page),
//       limit: limitNum,
//       totalPages
//     });
//   } catch (error) {
//     console.error('Semantic search error:', error);
//     errorResponse(res, error.message || 'Semantic search failed', 500);
//   }
// };

// // ==================== VOICE SEARCH ====================
// export const voiceSearch = async (req, res, next) => {
//   try {
//     const { transcript, language = 'en' } = req.body;
    
//     console.log('Voice search called with transcript:', transcript);
    
//     if (!transcript || transcript.length < 2) {
//       return successResponse(res, { results: [], query: '' });
//     }
    
//     const searchQuery = createComprehensiveSearchQuery(transcript);
    
//     const [poems, authors, audio, videos, books] = await Promise.all([
//       Poem.find({ ...searchQuery, isPublished: true })
//         .populate('author', 'name slug')
//         .limit(15)
//         .lean()
//         .then(r => r.map(item => ({ ...item, contentType: 'poem' })))
//         .catch(() => []),
//       Author.find({ ...searchQuery, isPublished: true })
//         .limit(10)
//         .lean()
//         .then(r => r.map(item => ({ ...item, contentType: 'author' })))
//         .catch(() => []),
//       Audio.find({ ...searchQuery, isPublished: true })
//         .populate('author', 'name slug')
//         .limit(10)
//         .lean()
//         .then(r => r.map(item => ({ ...item, contentType: 'audio' })))
//         .catch(() => []),
//       Video.find({ ...searchQuery, isPublished: true })
//         .populate('author', 'name slug')
//         .limit(10)
//         .lean()
//         .then(r => r.map(item => ({ ...item, contentType: 'video' })))
//         .catch(() => []),
//       Book.find({ ...searchQuery, isPublished: true })
//         .populate('author', 'name slug')
//         .limit(10)
//         .lean()
//         .then(r => r.map(item => ({ ...item, contentType: 'book' })))
//         .catch(() => [])
//     ]);
    
//     const totalResults = poems.length + authors.length + audio.length + videos.length + books.length;
    
//     console.log(`Voice search found ${totalResults} results for "${transcript}"`);
    
//     successResponse(res, {
//       query: transcript,
//       originalTranscript: transcript,
//       language,
//       total: totalResults,
//       results: {
//         poems,
//         authors,
//         audio,
//         videos,
//         books
//       }
//     });
//   } catch (error) {
//     console.error('Voice search error:', error);
//     errorResponse(res, error.message, 500);
//   }
// };

// // ==================== SEARCH SUGGESTIONS ====================
// export const getSearchSuggestions = async (req, res, next) => {
//   try {
//     const { q } = req.query;
//     console.log('Search suggestions called with:', q);
    
//     if (!q || q.length < 2) {
//       return successResponse(res, []);
//     }

//     const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
//     const regex = new RegExp(escapedQuery, 'i');
    
//     const [poems, authors, audio, books] = await Promise.all([
//       Poem.find({ $or: [{ title: regex }, { tags: { $in: [regex] } }], isPublished: true })
//         .select('title slug')
//         .limit(5)
//         .lean()
//         .catch(() => []),
//       Author.find({ $or: [{ name: regex }, { nameUrdu: regex }], isPublished: true })
//         .select('name slug')
//         .limit(5)
//         .lean()
//         .catch(() => []),
//       Audio.find({ $or: [{ title: regex }, { type: regex }, { tags: { $in: [regex] } }], isPublished: true })
//         .select('title slug type')
//         .limit(3)
//         .lean()
//         .catch(() => []),
//       Book.find({ $or: [{ title: regex }, { description: regex }], isPublished: true })
//         .select('title slug')
//         .limit(3)
//         .lean()
//         .catch(() => [])
//     ]);

//     const suggestions = [
//       ...poems.map(p => ({ type: 'poem', title: p.title, slug: p.slug, category: 'Poetry' })),
//       ...authors.map(a => ({ type: 'author', title: a.name, slug: a.slug, category: 'Author' })),
//       ...audio.map(a => ({ type: 'audio', title: a.title, slug: a.slug, category: a.type || 'Audio' })),
//       ...books.map(b => ({ type: 'book', title: b.title, slug: b.slug, category: 'Book' }))
//     ];

//     console.log(`Found ${suggestions.length} suggestions for "${q}"`);
//     successResponse(res, suggestions.slice(0, 15));
//   } catch (error) {
//     console.error('Search suggestions error:', error);
//     successResponse(res, []);
//   }
// };

// // ==================== TRENDING SEARCHES ====================
// export const getTrendingSearches = async (req, res, next) => {
//   try {
//     // In production, this would come from analytics database
//     // For now, return static trending searches based on actual content
//     const trending = [
//       { term: 'Nadeem Sarwar', count: 1250, category: 'audio' },
//       { term: 'Nauha', count: 980, category: 'audio' },
//       { term: 'Allama Iqbal', count: 850, category: 'author' },
//       { term: 'Mirza Ghalib', count: 720, category: 'author' },
//       { term: 'Marsiya', count: 650, category: 'audio' },
//       { term: 'Faiz Ahmed Faiz', count: 580, category: 'author' },
//       { term: 'Karbala', count: 450, category: 'audio' },
//       { term: 'Manqabat', count: 420, category: 'audio' },
//       { term: 'Urdu Poetry', count: 380, category: 'poem' },
//       { term: 'Mushaira', count: 350, category: 'video' }
//     ];
//     successResponse(res, trending);
//   } catch (error) {
//     console.error('Trending searches error:', error);
//     successResponse(res, []);
//   }
// };

// // ==================== DEBUG ENDPOINT ====================
// export const debugSearch = async (req, res, next) => {
//   try {
//     const { q } = req.query;
    
//     const results = {
//       audio: await Audio.find({ isPublished: true })
//         .limit(10)
//         .select('title type tags')
//         .lean()
//         .catch(() => []),
//       books: await Book.find({ isPublished: true })
//         .limit(10)
//         .select('title')
//         .lean()
//         .catch(() => []),
//       poems: await Poem.find({ isPublished: true })
//         .limit(10)
//         .select('title')
//         .lean()
//         .catch(() => []),
//       authors: await Author.find({ isPublished: true })
//         .limit(10)
//         .select('name')
//         .lean()
//         .catch(() => [])
//     };
    
//     const counts = {
//       poems: await Poem.countDocuments({ isPublished: true }).catch(() => 0),
//       authors: await Author.countDocuments({ isPublished: true }).catch(() => 0),
//       books: await Book.countDocuments({ isPublished: true }).catch(() => 0),
//       audio: await Audio.countDocuments({ isPublished: true }).catch(() => 0),
//       videos: await Video.countDocuments({ isPublished: true }).catch(() => 0)
//     };
    
//     // Test search for common terms
//     const testSearches = ['nauha', 'urdu', 'iqbal', 'ghalib'];
//     const searchTests = {};
    
//     for (const testTerm of testSearches) {
//       const regex = new RegExp(testTerm, 'i');
//       searchTests[testTerm] = {
//         audio: await Audio.countDocuments({ $or: [{ title: regex }, { tags: { $in: [regex] } }], isPublished: true }).catch(() => 0),
//         books: await Book.countDocuments({ $or: [{ title: regex }, { description: regex }], isPublished: true }).catch(() => 0)
//       };
//     }
    
//     successResponse(res, {
//       message: q ? `Search debug for "${q}"` : 'Database statistics',
//       searchQuery: q || 'none',
//       sampleData: results,
//       totalCounts: counts,
//       searchTests,
//       suggestions: [
//         'Try searching for: "nauha", "urdu", "iqbal", "ghalib", "nadeem"',
//         'Audio search is working well - found items with tags containing "nauha"',
//         'Book search returns empty - add some books or search in audio/video tabs'
//       ],
//       timestamp: new Date().toISOString()
//     });
//   } catch (error) {
//     console.error('Debug search error:', error);
//     errorResponse(res, error.message, 500);
//   }
// };





















// // server/controllers/search.controller.js
// import Poem from '../models/Poem.js';
// import Author from '../models/Author.js';
// import Book from '../models/Book.js';
// import Audio from '../models/Audio.js';
// import Video from '../models/Video.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination } from '../utils/pagination.js';

// // Helper function for creating comprehensive search queries
// const createComprehensiveSearchQuery = (q, searchInFields = [], includeLanguage = false, language = null) => {
//   if (!q || q.length < 2) return null;
  
//   // Escape special regex characters
//   const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
//   // Split query into words for better matching
//   const words = escapedQuery.split(/\s+/).filter(w => w.length > 1);
  
//   const conditions = [];
  
//   // Add condition for exact phrase match
//   conditions.push(
//     { title: { $regex: escapedQuery, $options: 'i' } },
//     { name: { $regex: escapedQuery, $options: 'i' } },
//     { description: { $regex: escapedQuery, $options: 'i' } },
//     { content: { $regex: escapedQuery, $options: 'i' } },
//     { type: { $regex: escapedQuery, $options: 'i' } }
//   );
  
//   // Add conditions for individual words (for better matching)
//   words.forEach(word => {
//     if (word.length > 2) {
//       conditions.push(
//         { title: { $regex: word, $options: 'i' } },
//         { name: { $regex: word, $options: 'i' } },
//         { description: { $regex: word, $options: 'i' } },
//         { content: { $regex: word, $options: 'i' } },
//         { tags: { $in: [new RegExp(word, 'i')] } },
//         { type: { $regex: word, $options: 'i' } }
//       );
//     }
//   });
  
//   // If specific fields are provided, add those conditions
//   if (searchInFields.length > 0) {
//     searchInFields.forEach(field => {
//       conditions.push({ [field]: { $regex: escapedQuery, $options: 'i' } });
//       words.forEach(word => {
//         if (word.length > 2) {
//           conditions.push({ [field]: { $regex: word, $options: 'i' } });
//         }
//       });
//     });
//   }
  
//   const finalQuery = { $or: conditions };
  
//   // Add language filter if specified
//   if (includeLanguage && language) {
//     finalQuery.language = language;
//   }
  
//   return finalQuery;
// };

// // Helper to search by author name
// const searchByAuthorName = async (q, model, populateFields = '', limit = 20, skip = 0) => {
//   const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
//   const matchingAuthors = await Author.find({
//     $or: [
//       { name: { $regex: escapedQuery, $options: 'i' } },
//       { nameUrdu: { $regex: escapedQuery, $options: 'i' } },
//       { bio: { $regex: escapedQuery, $options: 'i' } }
//     ],
//     isPublished: true
//   }).select('_id').limit(20);
  
//   if (matchingAuthors.length === 0) return [];
  
//   const authorIds = matchingAuthors.map(a => a._id);
  
//   let query = model.find({ 
//     author: { $in: authorIds },
//     isPublished: true 
//   });
  
//   if (populateFields) {
//     query = query.populate(populateFields);
//   }
  
//   return await query.sort({ createdAt: -1 }).skip(skip).limit(limit);
// };

// // ==================== UNIFIED SEARCH ====================
// export const unifiedSearch = async (req, res, next) => {
//   try {
//     const { q, type, language, page = 1, limit = 20 } = req.query;
    
//     console.log('Unified search called with:', { q, type, language, page, limit });
    
//     if (!q || q.length < 2) {
//       return successResponse(res, { 
//         poems: [], 
//         authors: [], 
//         books: [], 
//         audio: [], 
//         videos: [] 
//       });
//     }

//     const limitNum = parseInt(limit);
//     const searchQuery = createComprehensiveSearchQuery(q, [], !!language, language);
    
//     const results = {
//       poems: [],
//       authors: [],
//       books: [],
//       audio: [],
//       videos: []
//     };

//     // Search poems
//     if (!type || type === 'all' || type === 'poems') {
//       let poems = await Poem.find({ ...searchQuery, isPublished: true })
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(limitNum)
//         .lean()
//         .catch(err => { console.error('Poem search error:', err); return []; });
      
//       if (poems.length === 0) {
//         poems = await searchByAuthorName(q, Poem, 'author name slug avatar', limitNum);
//       }
      
//       results.poems = poems;
//     }
    
//     // Search authors
//     if (!type || type === 'all' || type === 'authors') {
//       results.authors = await Author.find({ ...searchQuery, isPublished: true })
//         .sort({ name: 1 })
//         .limit(limitNum)
//         .lean()
//         .catch(err => { console.error('Author search error:', err); return []; });
//     }
    
//     // Search books
//     if (!type || type === 'all' || type === 'books') {
//       let books = await Book.find({ ...searchQuery, isPublished: true })
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(limitNum)
//         .lean()
//         .catch(err => { console.error('Book search error:', err); return []; });
      
//       if (books.length === 0) {
//         books = await searchByAuthorName(q, Book, 'author name slug avatar', limitNum);
//       }
      
//       results.books = books;
//     }
    
//     // Search audio
//     if (!type || type === 'all' || type === 'audio') {
//       let audio = await Audio.find({ ...searchQuery, isPublished: true })
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(limitNum)
//         .lean()
//         .catch(err => { console.error('Audio search error:', err); return []; });
      
//       if (audio.length === 0) {
//         audio = await searchByAuthorName(q, Audio, 'author name slug avatar', limitNum);
//       }
      
//       results.audio = audio;
//     }
    
//     // Search videos
//     if (!type || type === 'all' || type === 'videos') {
//       let videos = await Video.find({ ...searchQuery, isPublished: true })
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(limitNum)
//         .lean()
//         .catch(err => { console.error('Video search error:', err); return []; });
      
//       if (videos.length === 0) {
//         videos = await searchByAuthorName(q, Video, 'author name slug avatar', limitNum);
//       }
      
//       results.videos = videos;
//     }

//     const totalResults = 
//       results.poems.length + 
//       results.authors.length + 
//       results.books.length + 
//       results.audio.length + 
//       results.videos.length;

//     console.log('Search results count:', {
//       poems: results.poems.length,
//       authors: results.authors.length,
//       books: results.books.length,
//       audio: results.audio.length,
//       videos: results.videos.length,
//       total: totalResults
//     });

//     successResponse(res, results);
//   } catch (error) {
//     console.error('Search error:', error);
//     errorResponse(res, error.message || 'Search failed', 500);
//   }
// };

// // ==================== SEARCH POEMS ====================
// export const searchPoems = async (req, res, next) => {
//   try {
//     const { q, language, genre, mood, era } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     console.log('Search poems called with:', { q, language, genre, mood, era, page, limit });

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const searchQuery = createComprehensiveSearchQuery(q, ['title', 'content', 'contentUrdu', 'tags', 'genre', 'mood'], !!language, language);
    
//     // Add additional filters
//     if (genre) searchQuery.genre = genre;
//     if (mood) searchQuery.mood = mood;
//     if (era) searchQuery.era = era;
    
//     let poems = await Poem.find({ ...searchQuery, isPublished: true })
//       .populate('author', 'name slug avatar bio')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     if (poems.length === 0) {
//       poems = await searchByAuthorName(q, Poem, 'author name slug avatar bio', limit, skip);
//     }

//     const total = await Poem.countDocuments({ ...searchQuery, isPublished: true });
//     const finalTotal = total > 0 ? total : poems.length;

//     console.log(`Found ${poems.length} poems, total: ${finalTotal}`);
//     paginatedResponse(res, poems, { page, limit, total: finalTotal });
//   } catch (error) {
//     console.error('Search poems error:', error);
//     next(error);
//   }
// };

// // ==================== SEARCH AUTHORS ====================
// export const searchAuthors = async (req, res, next) => {
//   try {
//     const { q, language, era, genre } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     console.log('Search authors called with:', { q, language, era, genre, page, limit });

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const searchQuery = createComprehensiveSearchQuery(q, ['name', 'nameUrdu', 'bio', 'penName', 'era', 'genre'], !!language, language);
    
//     if (era) searchQuery.era = era;
//     if (genre) searchQuery.genre = genre;
    
//     const authors = await Author.find({ ...searchQuery, isPublished: true })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     const total = await Author.countDocuments({ ...searchQuery, isPublished: true });

//     console.log(`Found ${authors.length} authors, total: ${total}`);
//     paginatedResponse(res, authors, { page, limit, total });
//   } catch (error) {
//     console.error('Search authors error:', error);
//     next(error);
//   }
// };

// // ==================== SEARCH BOOKS ====================
// export const searchBooks = async (req, res, next) => {
//   try {
//     const { q, language, type } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     console.log('Search books called with:', { q, language, type, page, limit });

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const searchQuery = createComprehensiveSearchQuery(q, ['title', 'titleUrdu', 'description', 'publisher', 'isbn', 'tags', 'type'], !!language, language);
    
//     if (type) searchQuery.type = type;
    
//     let books = await Book.find({ ...searchQuery, isPublished: true })
//       .populate('author', 'name slug avatar bio')
//       .populate('category', 'name slug')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     if (books.length === 0) {
//       books = await searchByAuthorName(q, Book, 'author name slug avatar bio', limit, skip);
//     }

//     const total = await Book.countDocuments({ ...searchQuery, isPublished: true });
//     const finalTotal = total > 0 ? total : books.length;

//     console.log(`Found ${books.length} books, total: ${finalTotal}`);
//     paginatedResponse(res, books, { page, limit, total: finalTotal });
//   } catch (error) {
//     console.error('Search books error:', error);
//     next(error);
//   }
// };

// // ==================== SEARCH AUDIO ====================
// export const searchAudio = async (req, res, next) => {
//   try {
//     const { q, language, type, occasion } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     console.log('Search audio called with:', { q, language, type, occasion, page, limit });

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const searchQuery = createComprehensiveSearchQuery(q, ['title', 'description', 'type', 'tags', 'occasion', 'reciter.name', 'language'], !!language, language);
    
//     // Add specific filters
//     if (type) searchQuery.type = type;
//     if (occasion) searchQuery.occasion = occasion;
    
//     let audio = await Audio.find({ ...searchQuery, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     if (audio.length === 0) {
//       audio = await searchByAuthorName(q, Audio, 'author name slug avatar', limit, skip);
//     }

//     const total = await Audio.countDocuments({ ...searchQuery, isPublished: true });
//     const finalTotal = total > 0 ? total : audio.length;

//     console.log(`Found ${audio.length} audio files, total: ${finalTotal}`);
//     paginatedResponse(res, audio, { page, limit, total: finalTotal });
//   } catch (error) {
//     console.error('Search audio error:', error);
//     next(error);
//   }
// };

// // ==================== SEARCH VIDEOS ====================
// export const searchVideos = async (req, res, next) => {
//   try {
//     const { q, language, type } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     console.log('Search videos called with:', { q, language, type, page, limit });

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const searchQuery = createComprehensiveSearchQuery(q, ['title', 'description', 'type', 'tags', 'language'], !!language, language);
    
//     if (type) searchQuery.type = type;
    
//     let videos = await Video.find({ ...searchQuery, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     if (videos.length === 0) {
//       videos = await searchByAuthorName(q, Video, 'author name slug avatar', limit, skip);
//     }

//     const total = await Video.countDocuments({ ...searchQuery, isPublished: true });
//     const finalTotal = total > 0 ? total : videos.length;

//     console.log(`Found ${videos.length} videos, total: ${finalTotal}`);
//     paginatedResponse(res, videos, { page, limit, total: finalTotal });
//   } catch (error) {
//     console.error('Search videos error:', error);
//     next(error);
//   }
// };

// // ==================== SEMANTIC / AI SEARCH ====================
// export const semanticSearch = async (req, res, next) => {
//   try {
//     const { q, type, language, page = 1, limit = 20 } = req.query;
    
//     console.log('Semantic search called with:', { q, type, language, page, limit });
    
//     if (!q || q.length < 2) {
//       return successResponse(res, { results: [], total: 0, page: 1, limit: 20, totalPages: 0 });
//     }

//     const limitNum = parseInt(limit);
//     const skip = (parseInt(page) - 1) * limitNum;
    
//     // Create semantic search query with word variations and synonyms
//     const words = q.toLowerCase().split(/\s+/).filter(w => w.length > 2);
//     const semanticConditions = [];
    
//     // Word mappings for semantic search
//     const wordMappings = {
//       'love': ['ishq', 'mohabbat', 'pyar', 'prem', 'chahat', 'ulfat'],
//       'poetry': ['shayari', 'kavita', 'nazm', 'ghazal', 'sher', 'ashaar'],
//       'sad': ['gham', 'udaasi', 'dard', 'ranj', 'soch', 'afsoos'],
//       'happy': ['khushi', 'anand', 'masarrat', 'khush', 'muskan'],
//       'god': ['allah', 'khuda', 'rab', 'parwardigar', 'raman', 'ishwar'],
//       'pain': ['dard', 'takleef', 'karb', 'aziyat', 'dukh'],
//       'heart': ['dil', 'qalb', 'man', 'hriday'],
//       'life': ['zindagi', 'hayat', 'jivan', 'hayaat'],
//       'death': ['maut', 'wafaat', 'mrityu', 'intqal'],
//       'beauty': ['khoobsurati', 'hussn', 'jamal', 'sunderata'],
//       'nature': ['fiza', 'mausam', 'bahar', 'khizan', 'rut'],
//       'urdu': ['urdu', 'rekhta', 'hindvi'],
//       'nauha': ['nauha', 'marsiya', 'soz', 'salam', 'azadari', 'karbala'],
//       'islamic': ['islamic', 'deeni', 'mazhabi', 'naat', 'hamd', 'manqabat']
//     };
    
//     // Add conditions for each word with synonyms
//     words.forEach(word => {
//       // Direct word match
//       semanticConditions.push(
//         { title: { $regex: word, $options: 'i' } },
//         { name: { $regex: word, $options: 'i' } },
//         { description: { $regex: word, $options: 'i' } },
//         { content: { $regex: word, $options: 'i' } },
//         { tags: { $in: [new RegExp(word, 'i')] } },
//         { type: { $regex: word, $options: 'i' } }
//       );
      
//       // Find synonyms for this word
//       for (const [key, synonyms] of Object.entries(wordMappings)) {
//         if (word === key || word.includes(key) || key.includes(word)) {
//           synonyms.forEach(synonym => {
//             semanticConditions.push(
//               { title: { $regex: synonym, $options: 'i' } },
//               { content: { $regex: synonym, $options: 'i' } },
//               { tags: { $in: [new RegExp(synonym, 'i')] } }
//             );
//           });
//         }
        
//         // Also check if word is in synonyms list
//         if (synonyms.includes(word)) {
//           semanticConditions.push(
//             { title: { $regex: key, $options: 'i' } },
//             { content: { $regex: key, $options: 'i' } },
//             { tags: { $in: [new RegExp(key, 'i')] } }
//           );
//         }
//       }
//     });
    
//     const searchCondition = { 
//       $or: semanticConditions,
//       isPublished: true 
//     };
    
//     // Add language filter
//     if (language) {
//       searchCondition.language = language;
//     }
    
//     let results = [];
//     let total = 0;
    
//     try {
//       // Search based on type parameter
//       const searchTypes = !type || type === 'all' 
//         ? ['poem', 'author', 'book', 'audio', 'video']
//         : [type];
      
//       for (const searchType of searchTypes) {
//         let items = [];
//         let count = 0;
        
//         switch (searchType) {
//           case 'poem':
//             items = await Poem.find(searchCondition)
//               .populate('author', 'name slug')
//               .limit(limitNum)
//               .lean()
//               .then(r => r.map(item => ({ ...item, contentType: 'poem' })));
//             count = await Poem.countDocuments(searchCondition);
//             break;
            
//           case 'author':
//             items = await Author.find(searchCondition)
//               .limit(limitNum)
//               .lean()
//               .then(r => r.map(item => ({ ...item, contentType: 'author' })));
//             count = await Author.countDocuments(searchCondition);
//             break;
            
//           case 'book':
//             items = await Book.find(searchCondition)
//               .populate('author', 'name slug')
//               .limit(limitNum)
//               .lean()
//               .then(r => r.map(item => ({ ...item, contentType: 'book' })));
//             count = await Book.countDocuments(searchCondition);
//             break;
            
//           case 'audio':
//             items = await Audio.find(searchCondition)
//               .populate('author', 'name slug')
//               .limit(limitNum)
//               .lean()
//               .then(r => r.map(item => ({ ...item, contentType: 'audio' })));
//             count = await Audio.countDocuments(searchCondition);
//             break;
            
//           case 'video':
//             items = await Video.find(searchCondition)
//               .populate('author', 'name slug')
//               .limit(limitNum)
//               .lean()
//               .then(r => r.map(item => ({ ...item, contentType: 'video' })));
//             count = await Video.countDocuments(searchCondition);
//             break;
//         }
        
//         results.push(...items);
//         total += count;
//       }
      
//       // Remove duplicates based on _id
//       const uniqueResults = [];
//       const seenIds = new Set();
//       for (const result of results) {
//         if (!seenIds.has(result._id.toString())) {
//           seenIds.add(result._id.toString());
//           uniqueResults.push(result);
//         }
//       }
//       results = uniqueResults;
      
//       // Apply pagination to combined results
//       results = results.slice(skip, skip + limitNum);
      
//     } catch (err) {
//       console.error('Error in semantic search queries:', err);
//     }
    
//     const totalPages = Math.ceil(total / limitNum);
    
//     console.log(`Semantic search found ${results.length} results out of ${total} total for "${q}"`);
    
//     successResponse(res, { 
//       results,
//       query: q,
//       semantic: true,
//       total,
//       page: parseInt(page),
//       limit: limitNum,
//       totalPages
//     });
//   } catch (error) {
//     console.error('Semantic search error:', error);
//     errorResponse(res, error.message || 'Semantic search failed', 500);
//   }
// };

// // ==================== VOICE SEARCH ====================
// export const voiceSearch = async (req, res, next) => {
//   try {
//     const { transcript, language = 'en' } = req.body;
    
//     console.log('Voice search called with transcript:', transcript);
    
//     if (!transcript || transcript.length < 2) {
//       return successResponse(res, { results: [], query: '' });
//     }
    
//     const searchQuery = createComprehensiveSearchQuery(transcript, [], true, language === 'ur' ? 'urdu' : language === 'hi' ? 'hindi' : null);
    
//     const [poems, authors, audio, videos, books] = await Promise.all([
//       Poem.find({ ...searchQuery, isPublished: true })
//         .populate('author', 'name slug')
//         .limit(15)
//         .lean()
//         .then(r => r.map(item => ({ ...item, contentType: 'poem' })))
//         .catch(() => []),
//       Author.find({ ...searchQuery, isPublished: true })
//         .limit(10)
//         .lean()
//         .then(r => r.map(item => ({ ...item, contentType: 'author' })))
//         .catch(() => []),
//       Audio.find({ ...searchQuery, isPublished: true })
//         .populate('author', 'name slug')
//         .limit(10)
//         .lean()
//         .then(r => r.map(item => ({ ...item, contentType: 'audio' })))
//         .catch(() => []),
//       Video.find({ ...searchQuery, isPublished: true })
//         .populate('author', 'name slug')
//         .limit(10)
//         .lean()
//         .then(r => r.map(item => ({ ...item, contentType: 'video' })))
//         .catch(() => []),
//       Book.find({ ...searchQuery, isPublished: true })
//         .populate('author', 'name slug')
//         .limit(10)
//         .lean()
//         .then(r => r.map(item => ({ ...item, contentType: 'book' })))
//         .catch(() => [])
//     ]);
    
//     const totalResults = poems.length + authors.length + audio.length + videos.length + books.length;
    
//     console.log(`Voice search found ${totalResults} results for "${transcript}"`);
    
//     successResponse(res, {
//       query: transcript,
//       originalTranscript: transcript,
//       language,
//       total: totalResults,
//       results: {
//         poems,
//         authors,
//         audio,
//         videos,
//         books
//       }
//     });
//   } catch (error) {
//     console.error('Voice search error:', error);
//     errorResponse(res, error.message, 500);
//   }
// };

// // ==================== SEARCH SUGGESTIONS ====================
// export const getSearchSuggestions = async (req, res, next) => {
//   try {
//     const { q, language } = req.query;
//     console.log('Search suggestions called with:', q, language);
    
//     if (!q || q.length < 2) {
//       return successResponse(res, []);
//     }

//     const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
//     const regex = new RegExp(escapedQuery, 'i');
    
//     const searchFilter = { isPublished: true };
//     if (language) searchFilter.language = language;
    
//     const [poems, authors, audio, books] = await Promise.all([
//       Poem.find({ $or: [{ title: regex }, { tags: { $in: [regex] } }], ...searchFilter })
//         .select('title slug language')
//         .limit(5)
//         .lean()
//         .catch(() => []),
//       Author.find({ $or: [{ name: regex }, { nameUrdu: regex }], ...searchFilter })
//         .select('name slug')
//         .limit(5)
//         .lean()
//         .catch(() => []),
//       Audio.find({ $or: [{ title: regex }, { type: regex }, { tags: { $in: [regex] } }], ...searchFilter })
//         .select('title slug type language')
//         .limit(5)
//         .lean()
//         .catch(() => []),
//       Book.find({ $or: [{ title: regex }, { description: regex }], ...searchFilter })
//         .select('title slug language')
//         .limit(3)
//         .lean()
//         .catch(() => [])
//     ]);

//     const suggestions = [
//       ...poems.map(p => ({ type: 'poem', title: p.title, slug: p.slug, category: 'Poetry', language: p.language })),
//       ...authors.map(a => ({ type: 'author', title: a.name, slug: a.slug, category: 'Author' })),
//       ...audio.map(a => ({ type: 'audio', title: a.title, slug: a.slug, category: a.type || 'Audio', language: a.language })),
//       ...books.map(b => ({ type: 'book', title: b.title, slug: b.slug, category: 'Book', language: b.language }))
//     ];

//     // Remove duplicates
//     const uniqueSuggestions = [];
//     const seenTitles = new Set();
//     for (const suggestion of suggestions) {
//       const key = `${suggestion.type}-${suggestion.title}`;
//       if (!seenTitles.has(key)) {
//         seenTitles.add(key);
//         uniqueSuggestions.push(suggestion);
//       }
//     }

//     console.log(`Found ${uniqueSuggestions.length} suggestions for "${q}"`);
//     successResponse(res, uniqueSuggestions.slice(0, 15));
//   } catch (error) {
//     console.error('Search suggestions error:', error);
//     successResponse(res, []);
//   }
// };

// // ==================== TRENDING SEARCHES ====================
// export const getTrendingSearches = async (req, res, next) => {
//   try {
//     const trending = [
//       { term: 'Nadeem Sarwar', count: 1250, category: 'audio', type: 'nauha' },
//       { term: 'Nauha', count: 980, category: 'audio', type: 'nauha' },
//       { term: 'Allama Iqbal', count: 850, category: 'author', language: 'urdu' },
//       { term: 'Mirza Ghalib', count: 720, category: 'author', language: 'urdu' },
//       { term: 'Marsiya', count: 650, category: 'audio', type: 'marsiya' },
//       { term: 'Faiz Ahmed Faiz', count: 580, category: 'author', language: 'urdu' },
//       { term: 'Karbala', count: 450, category: 'audio', type: 'nauha' },
//       { term: 'Love Poetry', count: 420, category: 'poem', genre: 'love' },
//       { term: 'Urdu Poetry', count: 380, category: 'poem', language: 'urdu' },
//       { term: 'Mushaira', count: 350, category: 'video', type: 'mushaira' }
//     ];
//     successResponse(res, trending);
//   } catch (error) {
//     console.error('Trending searches error:', error);
//     successResponse(res, []);
//   }
// };

// // ==================== DEBUG ENDPOINT ====================
// export const debugSearch = async (req, res, next) => {
//   try {
//     const { q } = req.query;
    
//     const results = {
//       audio: await Audio.find({ isPublished: true })
//         .limit(10)
//         .select('title type tags language occasion')
//         .lean()
//         .catch(() => []),
//       books: await Book.find({ isPublished: true })
//         .limit(10)
//         .select('title language type')
//         .lean()
//         .catch(() => []),
//       poems: await Poem.find({ isPublished: true })
//         .limit(10)
//         .select('title language genre mood tags')
//         .lean()
//         .catch(() => []),
//       authors: await Author.find({ isPublished: true })
//         .limit(10)
//         .select('name language era')
//         .lean()
//         .catch(() => [])
//     };
    
//     const counts = {
//       poems: await Poem.countDocuments({ isPublished: true }).catch(() => 0),
//       authors: await Author.countDocuments({ isPublished: true }).catch(() => 0),
//       books: await Book.countDocuments({ isPublished: true }).catch(() => 0),
//       audio: await Audio.countDocuments({ isPublished: true }).catch(() => 0),
//       videos: await Video.countDocuments({ isPublished: true }).catch(() => 0)
//     };
    
//     // Test searches for common terms
//     const testTerms = ['nauha', 'urdu', 'iqbal', 'ghalib', 'love', 'ishq'];
//     const searchTests = {};
    
//     for (const testTerm of testTerms) {
//       const regex = new RegExp(testTerm, 'i');
//       searchTests[testTerm] = {
//         audio: await Audio.countDocuments({ 
//           $or: [{ title: regex }, { tags: { $in: [regex] } }, { type: regex }], 
//           isPublished: true 
//         }).catch(() => 0),
//         poems: await Poem.countDocuments({ 
//           $or: [{ title: regex }, { tags: { $in: [regex] } }, { genre: regex }], 
//           isPublished: true 
//         }).catch(() => 0),
//         books: await Book.countDocuments({ 
//           $or: [{ title: regex }, { description: regex }], 
//           isPublished: true 
//         }).catch(() => 0)
//       };
//     }
    
//     successResponse(res, {
//       message: q ? `Search debug for "${q}"` : 'Database statistics',
//       searchQuery: q || 'none',
//       sampleData: results,
//       totalCounts: counts,
//       searchTests,
//       availableLanguages: {
//         poems: await Poem.distinct('language', { isPublished: true }).catch(() => []),
//         audio: await Audio.distinct('language', { isPublished: true }).catch(() => []),
//         books: await Book.distinct('language', { isPublished: true }).catch(() => [])
//       },
//       availableTypes: {
//         audio: await Audio.distinct('type', { isPublished: true }).catch(() => []),
//         video: await Video.distinct('type', { isPublished: true }).catch(() => [])
//       },
//       suggestions: [
//         'Try searching with language filter: ?q=nauha&language=urdu',
//         'Try searching by type: ?q=ghalib&type=author',
//         'Semantic search works with English words and maps to Urdu synonyms',
//         'Example: /api/search/semantic?q=love%20poetry&type=poem',
//         'Example with language: /api/search/audio?q=nauha&language=urdu'
//       ],
//       timestamp: new Date().toISOString()
//     });
//   } catch (error) {
//     console.error('Debug search error:', error);
//     errorResponse(res, error.message, 500);
//   }
// };


















// // server/controllers/search.controller.js
// import Poem from '../models/Poem.js';
// import Author from '../models/Author.js';
// import Book from '../models/Book.js';
// import Audio from '../models/Audio.js';
// import Video from '../models/Video.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination } from '../utils/pagination.js';

// // Enhanced helper for comprehensive search with fuzzy matching
// const createEnhancedSearchQuery = (q, searchInFields = [], filters = {}) => {
//   if (!q || q.length < 2) return null;
  
//   // Escape special regex characters
//   const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
//   // Split query into words
//   const words = escapedQuery.split(/\s+/).filter(w => w.length > 1);
  
//   // Common Urdu term mappings for better search
//   const termMappings = {
//     'marsiya': ['marsiya', 'marsia', 'marasi', 'مرثیہ'],
//     'nauha': ['nauha', 'noha', 'nohay', 'نوحہ'],
//     'soz': ['soz', 'soaz', 'سوز'],
//     'salam': ['salam', 'salaam', 'سلام'],
//     'manqabat': ['manqabat', 'manqabt', 'منقبت'],
//     'naat': ['naat', 'naath', 'نعت'],
//     'hamd': ['hamd', 'حمد'],
//     'ghazal': ['ghazal', 'ghazals', 'غزل'],
//     'nazm': ['nazm', 'nazams', 'نظم'],
//     'qawwali': ['qawwali', 'qawali', 'قوالی']
//   };
  
//   const conditions = [];
  
//   // Add exact phrase match
//   conditions.push(
//     { title: { $regex: escapedQuery, $options: 'i' } },
//     { name: { $regex: escapedQuery, $options: 'i' } },
//     { description: { $regex: escapedQuery, $options: 'i' } },
//     { content: { $regex: escapedQuery, $options: 'i' } },
//     { type: { $regex: escapedQuery, $options: 'i' } }
//   );
  
//   // Add term mappings for better search (e.g., "marsiya" should find content with "marsiya" tag)
//   const lowerQuery = q.toLowerCase();
//   for (const [key, variations] of Object.entries(termMappings)) {
//     if (lowerQuery === key || variations.includes(lowerQuery) || lowerQuery.includes(key)) {
//       variations.forEach(variation => {
//         conditions.push(
//           { type: { $regex: variation, $options: 'i' } },
//           { tags: { $in: [new RegExp(variation, 'i')] } },
//           { title: { $regex: variation, $options: 'i' } }
//         );
//       });
//     }
//   }
  
//   // Add word-by-word search
//   words.forEach(word => {
//     if (word.length > 2) {
//       conditions.push(
//         { title: { $regex: word, $options: 'i' } },
//         { name: { $regex: word, $options: 'i' } },
//         { description: { $regex: word, $options: 'i' } },
//         { content: { $regex: word, $options: 'i' } },
//         { tags: { $in: [new RegExp(word, 'i')] } },
//         { type: { $regex: word, $options: 'i' } }
//       );
//     }
//   });
  
//   // Add specific field searches
//   if (searchInFields.length > 0) {
//     searchInFields.forEach(field => {
//       conditions.push({ [field]: { $regex: escapedQuery, $options: 'i' } });
//       words.forEach(word => {
//         if (word.length > 2) {
//           conditions.push({ [field]: { $regex: word, $options: 'i' } });
//         }
//       });
//     });
//   }
  
//   const queryConditions = { $or: conditions, isPublished: true };
  
//   // Add language filter
//   if (filters.language) {
//     queryConditions.language = filters.language;
//   }
  
//   // Add type filter
//   if (filters.type) {
//     queryConditions.type = filters.type;
//   }
  
//   // Add genre filter
//   if (filters.genre) {
//     queryConditions.genre = filters.genre;
//   }
  
//   return queryConditions;
// };

// // Helper to search across all content for a term
// const searchAllContent = async (q, limit = 20) => {
//   const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
//   const searchCondition = {
//     $or: [
//       { title: { $regex: escapedQuery, $options: 'i' } },
//       { name: { $regex: escapedQuery, $options: 'i' } },
//       { tags: { $in: [new RegExp(escapedQuery, 'i')] } },
//       { type: { $regex: escapedQuery, $options: 'i' } }
//     ],
//     isPublished: true
//   };
  
//   const [poems, authors, audio, videos, books] = await Promise.all([
//     Poem.find(searchCondition).populate('author', 'name slug').limit(limit).lean(),
//     Author.find(searchCondition).limit(limit).lean(),
//     Audio.find(searchCondition).populate('author', 'name slug').limit(limit).lean(),
//     Video.find(searchCondition).populate('author', 'name slug').limit(limit).lean(),
//     Book.find(searchCondition).populate('author', 'name slug').limit(limit).lean()
//   ]);
  
//   return { poems, authors, audio, videos, books };
// };

// // ==================== UNIFIED SEARCH ====================
// export const unifiedSearch = async (req, res, next) => {
//   try {
//     const { q, type, language, page = 1, limit = 20 } = req.query;
    
//     console.log('Unified search called with:', { q, type, language, page, limit });
    
//     if (!q || q.length < 2) {
//       return successResponse(res, { 
//         poems: [], 
//         authors: [], 
//         books: [], 
//         audio: [], 
//         videos: [] 
//       });
//     }

//     const limitNum = parseInt(limit);
//     const filters = { language };
//     const searchQuery = createEnhancedSearchQuery(q, [], filters);
    
//     const results = {
//       poems: [],
//       authors: [],
//       books: [],
//       audio: [],
//       videos: []
//     };

//     // Search based on type
//     const types = !type || type === 'all' 
//       ? ['poems', 'authors', 'books', 'audio', 'videos']
//       : [type];

//     for (const contentType of types) {
//       switch (contentType) {
//         case 'poems':
//           results.poems = await Poem.find(searchQuery)
//             .populate('author', 'name slug avatar')
//             .sort({ createdAt: -1 })
//             .limit(limitNum)
//             .lean()
//             .catch(err => { console.error('Poem search error:', err); return []; });
//           break;
          
//         case 'authors':
//           results.authors = await Author.find(searchQuery)
//             .sort({ name: 1 })
//             .limit(limitNum)
//             .lean()
//             .catch(err => { console.error('Author search error:', err); return []; });
//           break;
          
//         case 'books':
//           results.books = await Book.find(searchQuery)
//             .populate('author', 'name slug avatar')
//             .sort({ createdAt: -1 })
//             .limit(limitNum)
//             .lean()
//             .catch(err => { console.error('Book search error:', err); return []; });
//           break;
          
//         case 'audio':
//           results.audio = await Audio.find(searchQuery)
//             .populate('author', 'name slug avatar')
//             .sort({ createdAt: -1 })
//             .limit(limitNum)
//             .lean()
//             .catch(err => { console.error('Audio search error:', err); return []; });
//           break;
          
//         case 'videos':
//           results.videos = await Video.find(searchQuery)
//             .populate('author', 'name slug avatar')
//             .sort({ createdAt: -1 })
//             .limit(limitNum)
//             .lean()
//             .catch(err => { console.error('Video search error:', err); return []; });
//           break;
//       }
//     }

//     const totalResults = 
//       results.poems.length + 
//       results.authors.length + 
//       results.books.length + 
//       results.audio.length + 
//       results.videos.length;

//     console.log('Search results:', {
//       query: q,
//       poems: results.poems.length,
//       authors: results.authors.length,
//       books: results.books.length,
//       audio: results.audio.length,
//       videos: results.videos.length,
//       total: totalResults
//     });

//     successResponse(res, results);
//   } catch (error) {
//     console.error('Search error:', error);
//     errorResponse(res, error.message || 'Search failed', 500);
//   }
// };

// // ==================== SEARCH POEMS ====================
// export const searchPoems = async (req, res, next) => {
//   try {
//     const { q, language, genre, mood, era } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     console.log('Search poems called with:', { q, language, genre, mood, era, page, limit });

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const filters = { language, genre, mood, era };
//     const searchQuery = createEnhancedSearchQuery(q, ['title', 'content', 'contentUrdu', 'tags', 'genre', 'mood'], filters);
    
//     const poems = await Poem.find(searchQuery)
//       .populate('author', 'name slug avatar bio')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     const total = await Poem.countDocuments(searchQuery);

//     console.log(`Found ${poems.length} poems, total: ${total}`);
//     paginatedResponse(res, poems, { page, limit, total });
//   } catch (error) {
//     console.error('Search poems error:', error);
//     next(error);
//   }
// };

// // ==================== SEARCH AUTHORS ====================
// export const searchAuthors = async (req, res, next) => {
//   try {
//     const { q, language, era } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     console.log('Search authors called with:', { q, language, era, page, limit });

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const filters = { language, era };
//     const searchQuery = createEnhancedSearchQuery(q, ['name', 'nameUrdu', 'bio', 'penName'], filters);
    
//     const authors = await Author.find(searchQuery)
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     const total = await Author.countDocuments(searchQuery);

//     console.log(`Found ${authors.length} authors, total: ${total}`);
//     paginatedResponse(res, authors, { page, limit, total });
//   } catch (error) {
//     console.error('Search authors error:', error);
//     next(error);
//   }
// };

// // ==================== SEARCH BOOKS ====================
// export const searchBooks = async (req, res, next) => {
//   try {
//     const { q, language, type } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     console.log('Search books called with:', { q, language, type, page, limit });

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const filters = { language, type };
//     const searchQuery = createEnhancedSearchQuery(q, ['title', 'titleUrdu', 'description', 'publisher', 'isbn', 'tags'], filters);
    
//     const books = await Book.find(searchQuery)
//       .populate('author', 'name slug avatar bio')
//       .populate('category', 'name slug')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     const total = await Book.countDocuments(searchQuery);

//     console.log(`Found ${books.length} books, total: ${total}`);
//     paginatedResponse(res, books, { page, limit, total });
//   } catch (error) {
//     console.error('Search books error:', error);
//     next(error);
//   }
// };

// // ==================== SEARCH AUDIO ====================
// export const searchAudio = async (req, res, next) => {
//   try {
//     const { q, language, type, occasion } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     console.log('Search audio called with:', { q, language, type, occasion, page, limit });

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const filters = { language, type, occasion };
//     const searchQuery = createEnhancedSearchQuery(q, ['title', 'description', 'type', 'tags', 'occasion', 'reciter.name'], filters);
    
//     const audio = await Audio.find(searchQuery)
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     const total = await Audio.countDocuments(searchQuery);

//     console.log(`Found ${audio.length} audio files, total: ${total}`);
//     paginatedResponse(res, audio, { page, limit, total });
//   } catch (error) {
//     console.error('Search audio error:', error);
//     next(error);
//   }
// };

// // ==================== SEARCH VIDEOS ====================
// export const searchVideos = async (req, res, next) => {
//   try {
//     const { q, language, type } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     console.log('Search videos called with:', { q, language, type, page, limit });

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const filters = { language, type };
//     const searchQuery = createEnhancedSearchQuery(q, ['title', 'description', 'type', 'tags'], filters);
    
//     const videos = await Video.find(searchQuery)
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     const total = await Video.countDocuments(searchQuery);

//     console.log(`Found ${videos.length} videos, total: ${total}`);
//     paginatedResponse(res, videos, { page, limit, total });
//   } catch (error) {
//     console.error('Search videos error:', error);
//     next(error);
//   }
// };

// // ==================== SEMANTIC / AI SEARCH ====================
// export const semanticSearch = async (req, res, next) => {
//   try {
//     const { q, type, language, page = 1, limit = 20 } = req.query;
    
//     console.log('Semantic search called with:', { q, type, language, page, limit });
    
//     if (!q || q.length < 2) {
//       return successResponse(res, { results: [], total: 0, page: 1, limit: 20, totalPages: 0 });
//     }

//     const limitNum = parseInt(limit);
//     const skip = (parseInt(page) - 1) * limitNum;
    
//     // Comprehensive word mappings for semantic search
//     const semanticMappings = {
//       'love': ['ishq', 'mohabbat', 'pyar', 'prem', 'chahat', 'ulfat', 'محبت', 'عشق'],
//       'poetry': ['shayari', 'kavita', 'nazm', 'ghazal', 'sher', 'ashaar', 'شاعری'],
//       'sad': ['gham', 'udaasi', 'dard', 'ranj', 'soch', 'afsoos', 'غم', 'درد'],
//       'happy': ['khushi', 'anand', 'masarrat', 'khush', 'muskan', 'خوشی'],
//       'pain': ['dard', 'takleef', 'karb', 'aziyat', 'dukh', 'درد', 'تکلیف'],
//       'heart': ['dil', 'qalb', 'man', 'hriday', 'دل'],
//       'life': ['zindagi', 'hayat', 'jivan', 'hayaat', 'زندگی'],
//       'death': ['maut', 'wafaat', 'mrityu', 'intqal', 'موت'],
//       'god': ['allah', 'khuda', 'rab', 'parwardigar', 'raman', 'ishwar', 'اللہ', 'خدا'],
//       'islamic': ['islam', 'deeni', 'mazhabi', 'naat', 'hamd', 'اسلامی'],
//       'nauha': ['nauha', 'noha', 'nohay', 'نوحہ', 'noha', 'azadari'],
//       'marsiya': ['marsiya', 'marsia', 'marasi', 'مرثیہ', 'marsiya'],
//       'manqabat': ['manqabat', 'manqabt', 'منقبت'],
//       'naat': ['naat', 'naath', 'نعت'],
//       'karbala': ['karbala', 'kerbala', 'کربلا', 'karbala']
//     };
    
//     const words = q.toLowerCase().split(/\s+/).filter(w => w.length > 2);
//     const semanticConditions = [];
    
//     // Add conditions for each word and its synonyms
//     words.forEach(word => {
//       // Direct word match
//       semanticConditions.push(
//         { title: { $regex: word, $options: 'i' } },
//         { name: { $regex: word, $options: 'i' } },
//         { description: { $regex: word, $options: 'i' } },
//         { content: { $regex: word, $options: 'i' } },
//         { tags: { $in: [new RegExp(word, 'i')] } },
//         { type: { $regex: word, $options: 'i' } }
//       );
      
//       // Find and add synonyms
//       for (const [key, synonyms] of Object.entries(semanticMappings)) {
//         if (word === key || word.includes(key) || key.includes(word) || synonyms.some(s => s.includes(word) || word.includes(s))) {
//           synonyms.forEach(synonym => {
//             semanticConditions.push(
//               { title: { $regex: synonym, $options: 'i' } },
//               { content: { $regex: synonym, $options: 'i' } },
//               { tags: { $in: [new RegExp(synonym, 'i')] } },
//               { type: { $regex: synonym, $options: 'i' } }
//             );
//           });
//         }
//       }
//     });
    
//     const searchCondition = { 
//       $or: semanticConditions,
//       isPublished: true 
//     };
    
//     if (language) searchCondition.language = language;
    
//     const searchTypes = !type || type === 'all' 
//       ? ['poem', 'author', 'book', 'audio', 'video']
//       : [type];
    
//     let allResults = [];
    
//     for (const searchType of searchTypes) {
//       let items = [];
//       switch (searchType) {
//         case 'poem':
//           items = await Poem.find(searchCondition)
//             .populate('author', 'name slug')
//             .lean()
//             .then(r => r.map(item => ({ ...item, contentType: 'poem' })));
//           break;
//         case 'author':
//           items = await Author.find(searchCondition)
//             .lean()
//             .then(r => r.map(item => ({ ...item, contentType: 'author' })));
//           break;
//         case 'book':
//           items = await Book.find(searchCondition)
//             .populate('author', 'name slug')
//             .lean()
//             .then(r => r.map(item => ({ ...item, contentType: 'book' })));
//           break;
//         case 'audio':
//           items = await Audio.find(searchCondition)
//             .populate('author', 'name slug')
//             .lean()
//             .then(r => r.map(item => ({ ...item, contentType: 'audio' })));
//           break;
//         case 'video':
//           items = await Video.find(searchCondition)
//             .populate('author', 'name slug')
//             .lean()
//             .then(r => r.map(item => ({ ...item, contentType: 'video' })));
//           break;
//       }
//       allResults.push(...items);
//     }
    
//     // Remove duplicates
//     const uniqueResults = [];
//     const seenIds = new Set();
//     for (const result of allResults) {
//       if (!seenIds.has(result._id.toString())) {
//         seenIds.add(result._id.toString());
//         uniqueResults.push(result);
//       }
//     }
    
//     const total = uniqueResults.length;
//     const paginatedResults = uniqueResults.slice(skip, skip + limitNum);
//     const totalPages = Math.ceil(total / limitNum);
    
//     console.log(`Semantic search found ${paginatedResults.length} results out of ${total} total for "${q}"`);
    
//     successResponse(res, { 
//       results: paginatedResults,
//       query: q,
//       semantic: true,
//       total,
//       page: parseInt(page),
//       limit: limitNum,
//       totalPages
//     });
//   } catch (error) {
//     console.error('Semantic search error:', error);
//     errorResponse(res, error.message || 'Semantic search failed', 500);
//   }
// };

// // ==================== VOICE SEARCH ====================
// export const voiceSearch = async (req, res, next) => {
//   try {
//     const { transcript, language = 'en' } = req.body;
    
//     console.log('Voice search called with transcript:', transcript);
    
//     if (!transcript || transcript.length < 2) {
//       return successResponse(res, { results: [], query: '' });
//     }
    
//     const results = await searchAllContent(transcript, 20);
    
//     const totalResults = 
//       results.poems.length + 
//       results.authors.length + 
//       results.audio.length + 
//       results.videos.length + 
//       results.books.length;
    
//     console.log(`Voice search found ${totalResults} results for "${transcript}"`);
    
//     successResponse(res, {
//       query: transcript,
//       originalTranscript: transcript,
//       language,
//       total: totalResults,
//       results
//     });
//   } catch (error) {
//     console.error('Voice search error:', error);
//     errorResponse(res, error.message, 500);
//   }
// };

// // ==================== SEARCH SUGGESTIONS ====================
// export const getSearchSuggestions = async (req, res, next) => {
//   try {
//     const { q, language } = req.query;
//     console.log('Search suggestions called with:', q, language);
    
//     if (!q || q.length < 2) {
//       return successResponse(res, []);
//     }

//     const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
//     const regex = new RegExp(escapedQuery, 'i');
    
//     const baseFilter = { isPublished: true };
//     if (language) baseFilter.language = language;
    
//     const [poems, authors, audio, books] = await Promise.all([
//       Poem.find({ $or: [{ title: regex }, { tags: { $in: [regex] } }], ...baseFilter })
//         .select('title slug language genre')
//         .limit(5)
//         .lean(),
//       Author.find({ $or: [{ name: regex }, { nameUrdu: regex }], ...baseFilter })
//         .select('name slug')
//         .limit(5)
//         .lean(),
//       Audio.find({ $or: [{ title: regex }, { type: regex }, { tags: { $in: [regex] } }], ...baseFilter })
//         .select('title slug type language')
//         .limit(5)
//         .lean(),
//       Book.find({ $or: [{ title: regex }, { description: regex }], ...baseFilter })
//         .select('title slug language')
//         .limit(3)
//         .lean()
//     ]);

//     const suggestions = [
//       ...poems.map(p => ({ type: 'poem', title: p.title, slug: p.slug, category: 'Poetry', language: p.language, genre: p.genre })),
//       ...authors.map(a => ({ type: 'author', title: a.name, slug: a.slug, category: 'Author' })),
//       ...audio.map(a => ({ type: 'audio', title: a.title, slug: a.slug, category: a.type || 'Audio', language: a.language })),
//       ...books.map(b => ({ type: 'book', title: b.title, slug: b.slug, category: 'Book', language: b.language }))
//     ];

//     // Remove duplicates
//     const uniqueSuggestions = [];
//     const seenTitles = new Set();
//     for (const suggestion of suggestions) {
//       const key = `${suggestion.type}-${suggestion.title}`;
//       if (!seenTitles.has(key)) {
//         seenTitles.add(key);
//         uniqueSuggestions.push(suggestion);
//       }
//     }

//     console.log(`Found ${uniqueSuggestions.length} suggestions for "${q}"`);
//     successResponse(res, uniqueSuggestions.slice(0, 15));
//   } catch (error) {
//     console.error('Search suggestions error:', error);
//     successResponse(res, []);
//   }
// };

// // ==================== TRENDING SEARCHES ====================
// export const getTrendingSearches = async (req, res, next) => {
//   try {
//     const trending = [
//       { term: 'Nadeem Sarwar', count: 1250, category: 'audio', type: 'nauha' },
//       { term: 'Nauha', count: 980, category: 'audio', type: 'nauha' },
//       { term: 'Marsiya', count: 850, category: 'audio', type: 'marsiya' },
//       { term: 'Allama Iqbal', count: 720, category: 'author', language: 'urdu' },
//       { term: 'Mirza Ghalib', count: 650, category: 'author', language: 'urdu' },
//       { term: 'Manqabat', count: 580, category: 'audio', type: 'manqabat' },
//       { term: 'Karbala', count: 450, category: 'audio', type: 'nauha' },
//       { term: 'Love Poetry', count: 420, category: 'poem', genre: 'love' },
//       { term: 'Urdu Poetry', count: 380, category: 'poem', language: 'urdu' },
//       { term: 'Soz', count: 350, category: 'audio', type: 'soz' }
//     ];
//     successResponse(res, trending);
//   } catch (error) {
//     console.error('Trending searches error:', error);
//     successResponse(res, []);
//   }
// };

// // ==================== DEBUG ENDPOINT ====================
// export const debugSearch = async (req, res, next) => {
//   try {
//     const { q } = req.query;
    
//     // Get sample data
//     const sampleData = {
//       audio: await Audio.find({ isPublished: true })
//         .limit(10)
//         .select('title type tags language')
//         .lean(),
//       poems: await Poem.find({ isPublished: true })
//         .limit(10)
//         .select('title language genre tags')
//         .lean(),
//       authors: await Author.find({ isPublished: true })
//         .limit(10)
//         .select('name language')
//         .lean()
//     };
    
//     // Get counts
//     const counts = {
//       poems: await Poem.countDocuments({ isPublished: true }),
//       authors: await Author.countDocuments({ isPublished: true }),
//       books: await Book.countDocuments({ isPublished: true }),
//       audio: await Audio.countDocuments({ isPublished: true }),
//       videos: await Video.countDocuments({ isPublished: true })
//     };
    
//     // Get distinct types
//     const audioTypes = await Audio.distinct('type', { isPublished: true });
//     const poemGenres = await Poem.distinct('genre', { isPublished: true });
    
//     successResponse(res, {
//       message: q ? `Search debug for "${q}"` : 'Database statistics',
//       query: q || 'none',
//       totalCounts: counts,
//       availableData: {
//         audioTypes,
//         poemGenres,
//         languages: {
//           audio: await Audio.distinct('language', { isPublished: true }),
//           poems: await Poem.distinct('language', { isPublished: true })
//         }
//       },
//       sampleData,
//       suggestions: [
//         'Try searching for: "Nadeem Sarwar", "Nauha", "Marsiya", "Manqabat"',
//         'Use language filter: ?q=nauha&language=urdu',
//         'Search by type: ?q=marsiya&type=audio',
//         'Semantic search maps English to Urdu: "love poetry" finds "ishq", "mohabbat"'
//       ],
//       timestamp: new Date().toISOString()
//     });
//   } catch (error) {
//     console.error('Debug search error:', error);
//     errorResponse(res, error.message, 500);
//   }
// };




















// // server/controllers/search.controller.js
// import Poem from '../models/Poem.js';
// import Author from '../models/Author.js';
// import Book from '../models/Book.js';
// import Audio from '../models/Audio.js';
// import Video from '../models/Video.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination } from '../utils/pagination.js';

// // Comprehensive search query builder that checks ALL fields
// const buildSearchQuery = (q, model, filters = {}) => {
//   if (!q || q.length < 2) return { isPublished: true };
  
//   const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
//   const regex = new RegExp(escapedQuery, 'i');
  
//   const conditions = [
//     { title: regex },
//     { description: regex },
//     { tags: { $in: [regex] } }
//   ];
  
//   // Model-specific fields
//   switch (model) {
//     case 'poem':
//       conditions.push(
//         { content: regex },
//         { contentUrdu: regex },
//         { genre: regex },        // CRITICAL: For marsiya, ghazal, etc.
//         { mood: regex },
//         { era: regex },
//         { 'author.name': regex }
//       );
//       break;
//     case 'author':
//       conditions.push(
//         { name: regex },
//         { nameUrdu: regex },
//         { bio: regex },
//         { penName: regex },
//         { era: regex }
//       );
//       break;
//     case 'book':
//       conditions.push(
//         { titleUrdu: regex },
//         { publisher: regex },
//         { isbn: regex },
//         { 'author.name': regex },
//         { language: regex }      // For searching by language
//       );
//       break;
//     case 'audio':
//       conditions.push(
//         { type: regex },
//         { occasion: regex },
//         { 'reciter.name': regex },
//         { 'author.name': regex },
//         { language: regex }
//       );
//       break;
//     case 'video':
//       conditions.push(
//         { type: regex },
//         { 'author.name': regex },
//         { language: regex }
//       );
//       break;
//   }
  
//   const query = { $or: conditions, isPublished: true };
  
//   // Add filters
//   if (filters.language) query.language = filters.language;
//   if (filters.genre) query.genre = filters.genre;
//   if (filters.type) query.type = filters.type;
//   if (filters.mood) query.mood = filters.mood;
//   if (filters.era) query.era = filters.era;
  
//   return query;
// };

// // ==================== UNIFIED SEARCH ====================
// export const unifiedSearch = async (req, res, next) => {
//   try {
//     const { q, type, language, page = 1, limit = 20 } = req.query;
    
//     console.log('Unified search called with:', { q, type, language });
    
//     if (!q || q.length < 2) {
//       return successResponse(res, { 
//         poems: [], authors: [], books: [], audio: [], videos: [] 
//       });
//     }

//     const limitNum = parseInt(limit);
//     const results = { poems: [], authors: [], books: [], audio: [], videos: [] };
//     const filters = { language };

//     if (!type || type === 'all' || type === 'poems') {
//       results.poems = await Poem.find(buildSearchQuery(q, 'poem', filters))
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(limitNum)
//         .lean();
//     }
    
//     if (!type || type === 'all' || type === 'authors') {
//       results.authors = await Author.find(buildSearchQuery(q, 'author', filters))
//         .sort({ name: 1 })
//         .limit(limitNum)
//         .lean();
//     }
    
//     if (!type || type === 'all' || type === 'books') {
//       results.books = await Book.find(buildSearchQuery(q, 'book', filters))
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(limitNum)
//         .lean();
//     }
    
//     if (!type || type === 'all' || type === 'audio') {
//       results.audio = await Audio.find(buildSearchQuery(q, 'audio', filters))
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(limitNum)
//         .lean();
//     }
    
//     if (!type || type === 'all' || type === 'videos') {
//       results.videos = await Video.find(buildSearchQuery(q, 'video', filters))
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(limitNum)
//         .lean();
//     }

//     console.log('Results:', {
//       poems: results.poems.length,
//       authors: results.authors.length,
//       books: results.books.length,
//       audio: results.audio.length,
//       videos: results.videos.length
//     });

//     successResponse(res, results);
//   } catch (error) {
//     console.error('Search error:', error);
//     errorResponse(res, error.message, 500);
//   }
// };

// // ==================== SEARCH POEMS ====================
// export const searchPoems = async (req, res, next) => {
//   try {
//     const { q, language, genre, mood, era } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     console.log('Search poems with filters:', { q, genre, language });

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const filters = { language, genre, mood, era };
//     const query = buildSearchQuery(q, 'poem', filters);
    
//     const poems = await Poem.find(query)
//       .populate('author', 'name slug avatar bio')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     const total = await Poem.countDocuments(query);

//     console.log(`Found ${poems.length} poems (total: ${total}) for query: "${q}"`);
//     if (poems.length > 0) {
//       console.log('Sample genres:', poems.slice(0, 3).map(p => p.genre));
//     }

//     paginatedResponse(res, poems, { page, limit, total });
//   } catch (error) {
//     console.error('Search poems error:', error);
//     next(error);
//   }
// };

// // ==================== SEARCH AUTHORS ====================
// export const searchAuthors = async (req, res, next) => {
//   try {
//     const { q, language, era } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     console.log('Search authors with filters:', { q, language, era });

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const filters = { language, era };
//     const query = buildSearchQuery(q, 'author', filters);
    
//     const authors = await Author.find(query)
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     const total = await Author.countDocuments(query);

//     console.log(`Found ${authors.length} authors (total: ${total})`);
//     paginatedResponse(res, authors, { page, limit, total });
//   } catch (error) {
//     console.error('Search authors error:', error);
//     next(error);
//   }
// };

// // ==================== SEARCH BOOKS ====================
// export const searchBooks = async (req, res, next) => {
//   try {
//     const { q, language, type } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     console.log('Search books with filters:', { q, language, type });

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const filters = { language, type };
//     const query = buildSearchQuery(q, 'book', filters);
    
//     const books = await Book.find(query)
//       .populate('author', 'name slug avatar bio')
//       .populate('category', 'name slug')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     const total = await Book.countDocuments(query);

//     console.log(`Found ${books.length} books (total: ${total}) for query: "${q}"`);
//     paginatedResponse(res, books, { page, limit, total });
//   } catch (error) {
//     console.error('Search books error:', error);
//     next(error);
//   }
// };

// // ==================== SEARCH AUDIO ====================
// export const searchAudio = async (req, res, next) => {
//   try {
//     const { q, language, type, occasion } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     console.log('Search audio with filters:', { q, language, type, occasion });

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const filters = { language, type, occasion };
//     const query = buildSearchQuery(q, 'audio', filters);
    
//     const audio = await Audio.find(query)
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     const total = await Audio.countDocuments(query);

//     console.log(`Found ${audio.length} audio files (total: ${total})`);
//     paginatedResponse(res, audio, { page, limit, total });
//   } catch (error) {
//     console.error('Search audio error:', error);
//     next(error);
//   }
// };

// // ==================== SEARCH VIDEOS ====================
// export const searchVideos = async (req, res, next) => {
//   try {
//     const { q, language, type } = req.query;
//     const { page, limit, skip } = getPagination(req);

//     console.log('Search videos with filters:', { q, language, type });

//     if (!q || q.length < 2) {
//       return paginatedResponse(res, [], { page, limit, total: 0 });
//     }

//     const filters = { language, type };
//     const query = buildSearchQuery(q, 'video', filters);
    
//     const videos = await Video.find(query)
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     const total = await Video.countDocuments(query);

//     console.log(`Found ${videos.length} videos (total: ${total})`);
//     paginatedResponse(res, videos, { page, limit, total });
//   } catch (error) {
//     console.error('Search videos error:', error);
//     next(error);
//   }
// };

// // ==================== SEMANTIC SEARCH ====================
// export const semanticSearch = async (req, res, next) => {
//   try {
//     const { q, type, language, page = 1, limit = 20 } = req.query;
    
//     console.log('Semantic search:', { q, type, language });
    
//     if (!q || q.length < 2) {
//       return successResponse(res, { results: [], total: 0 });
//     }

//     const limitNum = parseInt(limit);
//     const skip = (parseInt(page) - 1) * limitNum;
    
//     const searchTerms = [q.toLowerCase()];
    
//     // Add term variations
//     const variations = {
//       'marsiya': ['marsiya', 'marsia', 'marasi'],
//       'nauha': ['nauha', 'noha', 'nohay'],
//       'ghazal': ['ghazal', 'ghazals'],
//       'manqabat': ['manqabat', 'manqabt']
//     };
    
//     for (const [key, values] of Object.entries(variations)) {
//       if (searchTerms[0] === key || values.includes(searchTerms[0])) {
//         searchTerms.push(...values);
//       }
//     }
    
//     const searchConditions = [];
//     searchTerms.forEach(term => {
//       const regex = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
//       searchConditions.push(
//         { genre: regex },
//         { tags: { $in: [regex] } },
//         { type: regex },
//         { title: regex }
//       );
//     });
    
//     const searchQuery = { $or: searchConditions, isPublished: true };
//     if (language) searchQuery.language = language;
    
//     const searchTypes = !type || type === 'all' 
//       ? ['poem', 'author', 'book', 'audio', 'video']
//       : [type];
    
//     let allResults = [];
    
//     for (const searchType of searchTypes) {
//       let items = [];
//       switch (searchType) {
//         case 'poem':
//           items = await Poem.find(searchQuery)
//             .populate('author', 'name slug')
//             .lean()
//             .then(r => r.map(item => ({ ...item, contentType: 'poem' })));
//           break;
//         case 'author':
//           items = await Author.find(searchQuery)
//             .lean()
//             .then(r => r.map(item => ({ ...item, contentType: 'author' })));
//           break;
//         case 'book':
//           items = await Book.find(searchQuery)
//             .populate('author', 'name slug')
//             .lean()
//             .then(r => r.map(item => ({ ...item, contentType: 'book' })));
//           break;
//         case 'audio':
//           items = await Audio.find(searchQuery)
//             .populate('author', 'name slug')
//             .lean()
//             .then(r => r.map(item => ({ ...item, contentType: 'audio' })));
//           break;
//         case 'video':
//           items = await Video.find(searchQuery)
//             .populate('author', 'name slug')
//             .lean()
//             .then(r => r.map(item => ({ ...item, contentType: 'video' })));
//           break;
//       }
//       allResults.push(...items);
//     }
    
//     const total = allResults.length;
//     const paginatedResults = allResults.slice(skip, skip + limitNum);
    
//     successResponse(res, { 
//       results: paginatedResults,
//       query: q,
//       total,
//       page: parseInt(page),
//       limit: limitNum,
//       totalPages: Math.ceil(total / limitNum)
//     });
//   } catch (error) {
//     console.error('Semantic search error:', error);
//     errorResponse(res, error.message, 500);
//   }
// };

// // ==================== VOICE SEARCH ====================
// export const voiceSearch = async (req, res, next) => {
//   try {
//     const { transcript, language = 'en' } = req.body;
    
//     console.log('Voice search:', transcript);
    
//     if (!transcript || transcript.length < 2) {
//       return successResponse(res, { results: [], query: '' });
//     }
    
//     const regex = new RegExp(transcript.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    
//     const [poems, authors, audio, videos, books] = await Promise.all([
//       Poem.find({ $or: [{ title: regex }, { genre: regex }, { tags: { $in: [regex] } }], isPublished: true })
//         .populate('author', 'name slug').limit(15).lean(),
//       Author.find({ $or: [{ name: regex }, { nameUrdu: regex }], isPublished: true })
//         .limit(10).lean(),
//       Audio.find({ $or: [{ title: regex }, { type: regex }, { tags: { $in: [regex] } }], isPublished: true })
//         .populate('author', 'name slug').limit(10).lean(),
//       Video.find({ $or: [{ title: regex }, { type: regex }, { tags: { $in: [regex] } }], isPublished: true })
//         .populate('author', 'name slug').limit(10).lean(),
//       Book.find({ $or: [{ title: regex }, { description: regex }, { language: regex }], isPublished: true })
//         .populate('author', 'name slug').limit(10).lean()
//     ]);
    
//     successResponse(res, {
//       query: transcript,
//       originalTranscript: transcript,
//       language,
//       results: { poems, authors, audio, videos, books }
//     });
//   } catch (error) {
//     console.error('Voice search error:', error);
//     errorResponse(res, error.message, 500);
//   }
// };

// // ==================== SEARCH SUGGESTIONS ====================
// export const getSearchSuggestions = async (req, res, next) => {
//   try {
//     const { q } = req.query;
    
//     if (!q || q.length < 2) {
//       return successResponse(res, []);
//     }

//     const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    
//     const [poems, authors, audio] = await Promise.all([
//       Poem.find({ $or: [{ title: regex }, { genre: regex }, { tags: { $in: [regex] } }], isPublished: true })
//         .select('title slug genre')
//         .limit(5)
//         .lean(),
//       Author.find({ $or: [{ name: regex }, { nameUrdu: regex }], isPublished: true })
//         .select('name slug')
//         .limit(5)
//         .lean(),
//       Audio.find({ $or: [{ title: regex }, { type: regex }, { tags: { $in: [regex] } }], isPublished: true })
//         .select('title slug type')
//         .limit(5)
//         .lean()
//     ]);

//     const suggestions = [
//       ...poems.map(p => ({ type: 'poem', title: p.title, slug: p.slug, category: p.genre || 'Poetry' })),
//       ...authors.map(a => ({ type: 'author', title: a.name, slug: a.slug, category: 'Author' })),
//       ...audio.map(a => ({ type: 'audio', title: a.title, slug: a.slug, category: a.type || 'Audio' }))
//     ];

//     successResponse(res, suggestions.slice(0, 10));
//   } catch (error) {
//     console.error('Search suggestions error:', error);
//     successResponse(res, []);
//   }
// };

// // ==================== TRENDING SEARCHES ====================
// export const getTrendingSearches = async (req, res, next) => {
//   try {
//     const trending = [
//       { term: 'Marsiya', count: 850, category: 'poem', type: 'genre' },
//       { term: 'Nauha', count: 720, category: 'audio', type: 'audio' },
//       { term: 'Mirza Ghalib', count: 650, category: 'author' },
//       { term: 'Allama Iqbal', count: 580, category: 'author' },
//       { term: 'Urdu', count: 500, category: 'language' },
//       { term: 'Manqabat', count: 450, category: 'audio' },
//       { term: 'Karbala', count: 350, category: 'poem' }
//     ];
//     successResponse(res, trending);
//   } catch (error) {
//     console.error('Trending searches error:', error);
//     successResponse(res, []);
//   }
// };

// // ==================== DEBUG ENDPOINT ====================
// export const debugSearch = async (req, res, next) => {
//   try {
//     const { q } = req.query;
    
//     const testResults = {
//       'poems by genre marsiya': await Poem.countDocuments({ genre: 'marsiya', isPublished: true }),
//       'poems by genre ghazal': await Poem.countDocuments({ genre: 'ghazal', isPublished: true }),
//       'total poems': await Poem.countDocuments({ isPublished: true }),
//       'total books': await Book.countDocuments({ isPublished: true }),
//       'total authors': await Author.countDocuments({ isPublished: true }),
//       'total audio': await Audio.countDocuments({ isPublished: true }),
//       'total videos': await Video.countDocuments({ isPublished: true })
//     };
    
//     // Get sample marsiya poems
//     const marsiyaPoems = await Poem.find({ genre: 'marsiya', isPublished: true })
//       .select('title genre author')
//       .limit(5)
//       .lean();
    
//     successResponse(res, {
//       message: 'Search Debug Information',
//       testResults,
//       marsiyaPoems,
//       note: 'Search now checks: title, description, tags, genre, type, content, language, author.name',
//       endpoints: {
//         'Search Marsiya': '/api/search/poems?q=marsiya',
//         'Search Urdu': '/api/search?q=urdu',
//         'Search Books': '/api/search/books?q=urdu'
//       },
//       timestamp: new Date().toISOString()
//     });
//   } catch (error) {
//     console.error('Debug error:', error);
//     errorResponse(res, error.message, 500);
//   }
// };














// server/controllers/search.controller.js
import Poem from '../models/Poem.js';
import Author from '../models/Author.js';
import Book from '../models/Book.js';
import Audio from '../models/Audio.js';
import Video from '../models/Video.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
import { getPagination } from '../utils/pagination.js';

// Comprehensive search query builder that checks ALL fields
const buildSearchQuery = (q, model, filters = {}) => {
  if (!q || q.length < 2) return { isPublished: true };
  
  const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escapedQuery, 'i');
  
  const conditions = [
    { title: regex },
    { description: regex },
    { tags: { $in: [regex] } }
  ];
  
  // Model-specific fields
  switch (model) {
    case 'poem':
      conditions.push(
        { content: regex },
        { contentUrdu: regex },
        { genre: regex },
        { mood: regex },
        { era: regex },
        { 'author.name': regex }
      );
      break;
    case 'author':
      conditions.push(
        { name: regex },
        { nameUrdu: regex },
        { bio: regex },
        { penName: regex },
        { era: regex }
      );
      break;
    case 'book':
      conditions.push(
        { titleUrdu: regex },
        { publisher: regex },
        { isbn: regex },
        { 'author.name': regex },
        { language: regex }
      );
      break;
    case 'audio':
      conditions.push(
        { type: regex },
        { occasion: regex },
        { 'reciter.name': regex },
        { 'author.name': regex },
        { language: regex }
      );
      break;
    case 'video':
      conditions.push(
        { type: regex },
        { 'author.name': regex },
        { language: regex }
      );
      break;
  }
  
  const query = { $or: conditions, isPublished: true };
  
  // Add filters
  if (filters.language) query.language = filters.language;
  if (filters.genre) query.genre = filters.genre;
  if (filters.type) query.type = filters.type;
  if (filters.mood) query.mood = filters.mood;
  if (filters.era) query.era = filters.era;
  
  return query;
};

// ==================== UNIFIED SEARCH ====================
export const unifiedSearch = async (req, res, next) => {
  try {
    const { q, type, language, page = 1, limit = 20 } = req.query;
    
    console.log('🔍 Unified search:', { q, type, language });
    
    if (!q || q.length < 2) {
      return successResponse(res, { 
        poems: [], authors: [], books: [], audio: [], videos: [] 
      });
    }

    const limitNum = parseInt(limit);
    const results = { poems: [], authors: [], books: [], audio: [], videos: [] };
    const filters = { language };

    // Search in parallel for better performance
    const searchPromises = [];

    if (!type || type === 'all' || type === 'poems') {
      searchPromises.push(
        Poem.find(buildSearchQuery(q, 'poem', filters))
          .populate('author', 'name slug avatar')
          .sort({ createdAt: -1 })
          .limit(limitNum)
          .lean()
          .then(r => { results.poems = r; })
      );
    }
    
    if (!type || type === 'all' || type === 'authors') {
      searchPromises.push(
        Author.find(buildSearchQuery(q, 'author', filters))
          .sort({ name: 1 })
          .limit(limitNum)
          .lean()
          .then(r => { results.authors = r; })
      );
    }
    
    if (!type || type === 'all' || type === 'books') {
      searchPromises.push(
        Book.find(buildSearchQuery(q, 'book', filters))
          .populate('author', 'name slug avatar')
          .sort({ createdAt: -1 })
          .limit(limitNum)
          .lean()
          .then(r => { results.books = r; })
      );
    }
    
    if (!type || type === 'all' || type === 'audio') {
      searchPromises.push(
        Audio.find(buildSearchQuery(q, 'audio', filters))
          .populate('author', 'name slug avatar')
          .sort({ createdAt: -1 })
          .limit(limitNum)
          .lean()
          .then(r => { results.audio = r; })
      );
    }
    
    if (!type || type === 'all' || type === 'videos') {
      searchPromises.push(
        Video.find(buildSearchQuery(q, 'video', filters))
          .populate('author', 'name slug avatar')
          .sort({ createdAt: -1 })
          .limit(limitNum)
          .lean()
          .then(r => { results.videos = r; })
      );
    }

    await Promise.all(searchPromises);

    const total = results.poems.length + results.authors.length + results.books.length + 
                  results.audio.length + results.videos.length;

    console.log(`✅ Found ${total} results for "${q}"`);
    successResponse(res, results);
  } catch (error) {
    console.error('Search error:', error);
    errorResponse(res, error.message || 'Search failed', 500);
  }
};

// ==================== SEARCH POEMS ====================
export const searchPoems = async (req, res, next) => {
  try {
    const { q, language, genre, mood, era } = req.query;
    const { page, limit, skip } = getPagination(req);

    console.log('📖 Search poems:', { q, genre, language });

    if (!q || q.length < 2) {
      return paginatedResponse(res, [], { page, limit, total: 0 });
    }

    const filters = { language, genre, mood, era };
    const query = buildSearchQuery(q, 'poem', filters);
    
    const poems = await Poem.find(query)
      .populate('author', 'name slug avatar bio')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Poem.countDocuments(query);

    console.log(`✅ Found ${poems.length} poems (total: ${total})`);
    paginatedResponse(res, poems, { page, limit, total });
  } catch (error) {
    console.error('Search poems error:', error);
    next(error);
  }
};

// ==================== SEARCH AUTHORS ====================
export const searchAuthors = async (req, res, next) => {
  try {
    const { q, language, era } = req.query;
    const { page, limit, skip } = getPagination(req);

    console.log('👤 Search authors:', { q, language, era });

    if (!q || q.length < 2) {
      return paginatedResponse(res, [], { page, limit, total: 0 });
    }

    const filters = { language, era };
    const query = buildSearchQuery(q, 'author', filters);
    
    const authors = await Author.find(query)
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Author.countDocuments(query);

    console.log(`✅ Found ${authors.length} authors`);
    paginatedResponse(res, authors, { page, limit, total });
  } catch (error) {
    console.error('Search authors error:', error);
    next(error);
  }
};

// ==================== SEARCH BOOKS ====================
export const searchBooks = async (req, res, next) => {
  try {
    const { q, language, type } = req.query;
    const { page, limit, skip } = getPagination(req);

    console.log('📚 Search books:', { q, language, type });

    if (!q || q.length < 2) {
      return paginatedResponse(res, [], { page, limit, total: 0 });
    }

    const filters = { language, type };
    const query = buildSearchQuery(q, 'book', filters);
    
    const books = await Book.find(query)
      .populate('author', 'name slug avatar bio')
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Book.countDocuments(query);

    console.log(`✅ Found ${books.length} books`);
    paginatedResponse(res, books, { page, limit, total });
  } catch (error) {
    console.error('Search books error:', error);
    next(error);
  }
};

// ==================== SEARCH AUDIO ====================
export const searchAudio = async (req, res, next) => {
  try {
    const { q, language, type, occasion } = req.query;
    const { page, limit, skip } = getPagination(req);

    console.log('🎵 Search audio:', { q, language, type, occasion });

    if (!q || q.length < 2) {
      return paginatedResponse(res, [], { page, limit, total: 0 });
    }

    const filters = { language, type, occasion };
    const query = buildSearchQuery(q, 'audio', filters);
    
    const audio = await Audio.find(query)
      .populate('author', 'name slug avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Audio.countDocuments(query);

    console.log(`✅ Found ${audio.length} audio files`);
    paginatedResponse(res, audio, { page, limit, total });
  } catch (error) {
    console.error('Search audio error:', error);
    next(error);
  }
};

// ==================== SEARCH VIDEOS ====================
export const searchVideos = async (req, res, next) => {
  try {
    const { q, language, type } = req.query;
    const { page, limit, skip } = getPagination(req);

    console.log('🎬 Search videos:', { q, language, type });

    if (!q || q.length < 2) {
      return paginatedResponse(res, [], { page, limit, total: 0 });
    }

    const filters = { language, type };
    const query = buildSearchQuery(q, 'video', filters);
    
    const videos = await Video.find(query)
      .populate('author', 'name slug avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Video.countDocuments(query);

    console.log(`✅ Found ${videos.length} videos`);
    paginatedResponse(res, videos, { page, limit, total });
  } catch (error) {
    console.error('Search videos error:', error);
    next(error);
  }
};

// ==================== SEMANTIC SEARCH ====================
export const semanticSearch = async (req, res, next) => {
  try {
    const { q, type, language, page = 1, limit = 20 } = req.query;
    
    console.log('🧠 Semantic search:', { q, type, language });
    
    if (!q || q.length < 2) {
      return successResponse(res, { results: [], total: 0, page: 1, limit: 20, totalPages: 0 });
    }

    const limitNum = parseInt(limit);
    const skip = (parseInt(page) - 1) * limitNum;
    
    // Expand search terms with common variations
    const searchTerms = [q.toLowerCase()];
    
    // Add Urdu variations for common terms
    const variations = {
      'marsiya': ['marsiya', 'marsia', 'marasi', 'مرثیہ'],
      'nauha': ['nauha', 'noha', 'nohay', 'نوحہ'],
      'ghazal': ['ghazal', 'ghazals', 'غزل'],
      'manqabat': ['manqabat', 'manqabt', 'منقبت'],
      'naat': ['naat', 'naath', 'نعت'],
      'hamd': ['hamd', 'حمد'],
      'soz': ['soz', 'soaz', 'سوز'],
      'salam': ['salam', 'salaam', 'سلام'],
      'karbala': ['karbala', 'kerbala', 'کربلا'],
      'hussain': ['hussain', 'husain', 'hassan', 'حسین'],
      'love': ['love', 'ishq', 'mohabbat', 'pyar', 'عشق', 'محبت'],
      'sad': ['sad', 'gham', 'dard', 'udaasi', 'غم', 'درد']
    };
    
    const currentTerm = searchTerms[0];
    for (const [key, values] of Object.entries(variations)) {
      if (currentTerm === key || values.includes(currentTerm) || key.includes(currentTerm) || currentTerm.includes(key)) {
        searchTerms.push(...values);
      }
    }
    
    // Remove duplicates
    const uniqueTerms = [...new Set(searchTerms)];
    
    const searchConditions = [];
    uniqueTerms.forEach(term => {
      const regex = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      searchConditions.push(
        { genre: regex },
        { tags: { $in: [regex] } },
        { type: regex },
        { title: regex },
        { content: regex }
      );
    });
    
    const searchQuery = { $or: searchConditions, isPublished: true };
    if (language) searchQuery.language = language;
    
    const searchTypes = !type || type === 'all' 
      ? ['poem', 'author', 'book', 'audio', 'video']
      : [type];
    
    let allResults = [];
    
    for (const searchType of searchTypes) {
      let items = [];
      switch (searchType) {
        case 'poem':
          items = await Poem.find(searchQuery)
            .populate('author', 'name slug')
            .lean()
            .then(r => r.map(item => ({ ...item, contentType: 'poem' })));
          break;
        case 'author':
          items = await Author.find(searchQuery)
            .lean()
            .then(r => r.map(item => ({ ...item, contentType: 'author' })));
          break;
        case 'book':
          items = await Book.find(searchQuery)
            .populate('author', 'name slug')
            .lean()
            .then(r => r.map(item => ({ ...item, contentType: 'book' })));
          break;
        case 'audio':
          items = await Audio.find(searchQuery)
            .populate('author', 'name slug')
            .lean()
            .then(r => r.map(item => ({ ...item, contentType: 'audio' })));
          break;
        case 'video':
          items = await Video.find(searchQuery)
            .populate('author', 'name slug')
            .lean()
            .then(r => r.map(item => ({ ...item, contentType: 'video' })));
          break;
      }
      allResults.push(...items);
    }
    
    // Remove duplicates by _id
    const uniqueResults = [];
    const seenIds = new Set();
    for (const result of allResults) {
      if (!seenIds.has(result._id.toString())) {
        seenIds.add(result._id.toString());
        uniqueResults.push(result);
      }
    }
    
    const total = uniqueResults.length;
    const paginatedResults = uniqueResults.slice(skip, skip + limitNum);
    const totalPages = Math.ceil(total / limitNum);
    
    console.log(`✅ Semantic search found ${paginatedResults.length} results (total: ${total}) for "${q}"`);
    
    successResponse(res, { 
      results: paginatedResults,
      query: q,
      semantic: true,
      total,
      page: parseInt(page),
      limit: limitNum,
      totalPages
    });
  } catch (error) {
    console.error('Semantic search error:', error);
    errorResponse(res, error.message || 'Semantic search failed', 500);
  }
};

// ==================== VOICE SEARCH ====================
export const voiceSearch = async (req, res, next) => {
  try {
    const { transcript, language = 'en' } = req.body;
    
    console.log('🎤 Voice search:', transcript);
    
    if (!transcript || transcript.length < 2) {
      return successResponse(res, { results: [], query: '' });
    }
    
    const regex = new RegExp(transcript.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    
    const [poems, authors, audio, videos, books] = await Promise.all([
      Poem.find({ $or: [{ title: regex }, { genre: regex }, { tags: { $in: [regex] } }, { content: regex }], isPublished: true })
        .populate('author', 'name slug')
        .limit(15)
        .lean()
        .then(r => r.map(item => ({ ...item, contentType: 'poem' }))),
      Author.find({ $or: [{ name: regex }, { nameUrdu: regex }, { bio: regex }], isPublished: true })
        .limit(10)
        .lean()
        .then(r => r.map(item => ({ ...item, contentType: 'author' }))),
      Audio.find({ $or: [{ title: regex }, { type: regex }, { tags: { $in: [regex] } }], isPublished: true })
        .populate('author', 'name slug')
        .limit(10)
        .lean()
        .then(r => r.map(item => ({ ...item, contentType: 'audio' }))),
      Video.find({ $or: [{ title: regex }, { type: regex }, { tags: { $in: [regex] } }], isPublished: true })
        .populate('author', 'name slug')
        .limit(10)
        .lean()
        .then(r => r.map(item => ({ ...item, contentType: 'video' }))),
      Book.find({ $or: [{ title: regex }, { description: regex }, { language: regex }], isPublished: true })
        .populate('author', 'name slug')
        .limit(10)
        .lean()
        .then(r => r.map(item => ({ ...item, contentType: 'book' })))
    ]);
    
    const total = poems.length + authors.length + audio.length + videos.length + books.length;
    
    console.log(`✅ Voice search found ${total} results`);
    
    successResponse(res, {
      query: transcript,
      originalTranscript: transcript,
      language,
      total,
      results: { poems, authors, audio, videos, books }
    });
  } catch (error) {
    console.error('Voice search error:', error);
    errorResponse(res, error.message, 500);
  }
};

// ==================== SEARCH SUGGESTIONS ====================
export const getSearchSuggestions = async (req, res, next) => {
  try {
    const { q } = req.query;
    
    if (!q || q.length < 2) {
      return successResponse(res, []);
    }

    const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    
    const [poems, authors, audio] = await Promise.all([
      Poem.find({ $or: [{ title: regex }, { genre: regex }, { tags: { $in: [regex] } }], isPublished: true })
        .select('title slug genre')
        .limit(5)
        .lean(),
      Author.find({ $or: [{ name: regex }, { nameUrdu: regex }], isPublished: true })
        .select('name slug')
        .limit(5)
        .lean(),
      Audio.find({ $or: [{ title: regex }, { type: regex }, { tags: { $in: [regex] } }], isPublished: true })
        .select('title slug type')
        .limit(5)
        .lean()
    ]);

    const suggestions = [
      ...poems.map(p => ({ type: 'poem', title: p.title, slug: p.slug, category: p.genre || 'Poetry' })),
      ...authors.map(a => ({ type: 'author', title: a.name, slug: a.slug, category: 'Author' })),
      ...audio.map(a => ({ type: 'audio', title: a.title, slug: a.slug, category: a.type || 'Audio' }))
    ];

    // Remove duplicates
    const unique = [];
    const seen = new Set();
    for (const s of suggestions) {
      const key = `${s.type}-${s.title}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(s);
      }
    }

    console.log(`✅ Found ${unique.length} suggestions for "${q}"`);
    successResponse(res, unique.slice(0, 10));
  } catch (error) {
    console.error('Search suggestions error:', error);
    successResponse(res, []);
  }
};

// ==================== TRENDING SEARCHES ====================
export const getTrendingSearches = async (req, res, next) => {
  try {
    const trending = [
      { term: 'Marsiya', count: 850, category: 'poem', type: 'genre' },
      { term: 'Karbala', count: 720, category: 'poem', type: 'genre' },
      { term: 'Nauha', count: 650, category: 'audio', type: 'audio' },
      { term: 'Mirza Ghalib', count: 580, category: 'author' },
      { term: 'Allama Iqbal', count: 520, category: 'author' },
      { term: 'Urdu', count: 450, category: 'language' },
      { term: 'Manqabat', count: 380, category: 'audio' },
      { term: 'Ghazal', count: 350, category: 'poem', type: 'genre' }
    ];
    successResponse(res, trending);
  } catch (error) {
    console.error('Trending searches error:', error);
    successResponse(res, []);
  }
};

// ==================== DEBUG ENDPOINT ====================
export const debugSearch = async (req, res, next) => {
  try {
    const stats = {
      totalPoems: await Poem.countDocuments({ isPublished: true }),
      totalAuthors: await Author.countDocuments({ isPublished: true }),
      totalBooks: await Book.countDocuments({ isPublished: true }),
      totalAudio: await Audio.countDocuments({ isPublished: true }),
      totalVideos: await Video.countDocuments({ isPublished: true }),
      poemGenres: await Poem.distinct('genre', { isPublished: true }),
      audioTypes: await Audio.distinct('type', { isPublished: true }),
      languages: {
        poems: await Poem.distinct('language', { isPublished: true }),
        audio: await Audio.distinct('language', { isPublished: true })
      }
    };
    
    const marsiyaCount = await Poem.countDocuments({ genre: 'marsiya', isPublished: true });
    const marsiyaPoems = await Poem.find({ genre: 'marsiya', isPublished: true })
      .select('title genre')
      .limit(5)
      .lean();
    
    successResponse(res, {
      message: 'Search API Debug Information',
      stats,
      marsiya: {
        count: marsiyaCount,
        samples: marsiyaPoems
      },
      endpoints: {
        searchMarsiya: '/api/search/poems?q=marsiya',
        searchUrdu: '/api/search?q=urdu',
        semanticMarsiya: '/api/search/semantic?q=marsiya&type=poem',
        voiceSearch: 'POST /api/search/voice with { transcript: "marsiya" }'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Debug error:', error);
    errorResponse(res, error.message, 500);
  }
};