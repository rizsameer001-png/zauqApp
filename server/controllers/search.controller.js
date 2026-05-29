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









// server/controllers/search.controller.js
import Poem from '../models/Poem.js';
import Author from '../models/Author.js';
import Book from '../models/Book.js';
import Audio from '../models/Audio.js';
import Video from '../models/Video.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
import { getPagination } from '../utils/pagination.js';

export const unifiedSearch = async (req, res, next) => {
  try {
    const { q, type } = req.query;
    
    // Return empty results if query is too short
    if (!q || q.length < 2) {
      return successResponse(res, { 
        poems: [], 
        authors: [], 
        books: [], 
        audio: [], 
        videos: [] 
      });
    }

    // Create regex search for better compatibility (works without text indexes)
    const regexQuery = { 
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } },
        { bio: { $regex: q, $options: 'i' } }
      ]
    };
    
    const limit = 20;

    const [poems, authors, books, audio, videos] = await Promise.all([
      type && type !== 'poems' ? [] : Poem.find(regexQuery)
        .populate('author', 'name slug')
        .limit(limit),
      type && type !== 'authors' ? [] : Author.find(regexQuery)
        .limit(limit),
      type && type !== 'books' ? [] : Book.find(regexQuery)
        .populate('author', 'name slug')
        .limit(limit),
      type && type !== 'audio' ? [] : Audio.find(regexQuery)
        .populate('author', 'name slug')
        .limit(limit),
      type && type !== 'videos' ? [] : Video.find(regexQuery)
        .populate('author', 'name slug')
        .limit(limit)
    ]);

    successResponse(res, { 
      poems: poems || [], 
      authors: authors || [], 
      books: books || [], 
      audio: audio || [], 
      videos: videos || [] 
    });
  } catch (error) {
    console.error('Search error:', error);
    errorResponse(res, error.message, 500);
  }
};

export const searchPoems = async (req, res, next) => {
  try {
    const { q } = req.query;
    const { page, limit, skip } = getPagination(req);

    if (!q || q.length < 2) {
      return paginatedResponse(res, [], { page, limit, total: 0 });
    }

    const regexQuery = {
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } },
        { contentUrdu: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } }
      ]
    };

    const poems = await Poem.find(regexQuery)
      .populate('author', 'name slug avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Poem.countDocuments(regexQuery);
    paginatedResponse(res, poems, { page, limit, total });
  } catch (error) {
    console.error('Search poems error:', error);
    next(error);
  }
};

export const searchAuthors = async (req, res, next) => {
  try {
    const { q } = req.query;
    const { page, limit, skip } = getPagination(req);

    if (!q || q.length < 2) {
      return paginatedResponse(res, [], { page, limit, total: 0 });
    }

    const regexQuery = {
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { nameUrdu: { $regex: q, $options: 'i' } },
        { bio: { $regex: q, $options: 'i' } }
      ]
    };

    const authors = await Author.find(regexQuery)
      .skip(skip)
      .limit(limit);

    const total = await Author.countDocuments(regexQuery);
    paginatedResponse(res, authors, { page, limit, total });
  } catch (error) {
    console.error('Search authors error:', error);
    next(error);
  }
};

export const searchBooks = async (req, res, next) => {
  try {
    const { q } = req.query;
    const { page, limit, skip } = getPagination(req);

    if (!q || q.length < 2) {
      return paginatedResponse(res, [], { page, limit, total: 0 });
    }

    const regexQuery = {
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { author: { $regex: q, $options: 'i' } }
      ]
    };

    const books = await Book.find(regexQuery)
      .populate('author', 'name slug avatar')
      .skip(skip)
      .limit(limit);

    const total = await Book.countDocuments(regexQuery);
    paginatedResponse(res, books, { page, limit, total });
  } catch (error) {
    console.error('Search books error:', error);
    next(error);
  }
};

export const searchAudio = async (req, res, next) => {
  try {
    const { q } = req.query;
    const { page, limit, skip } = getPagination(req);

    if (!q || q.length < 2) {
      return paginatedResponse(res, [], { page, limit, total: 0 });
    }

    const regexQuery = {
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } }
      ]
    };

    const audio = await Audio.find(regexQuery)
      .populate('author', 'name slug avatar')
      .skip(skip)
      .limit(limit);

    const total = await Audio.countDocuments(regexQuery);
    paginatedResponse(res, audio, { page, limit, total });
  } catch (error) {
    console.error('Search audio error:', error);
    next(error);
  }
};

export const searchVideos = async (req, res, next) => {
  try {
    const { q } = req.query;
    const { page, limit, skip } = getPagination(req);

    if (!q || q.length < 2) {
      return paginatedResponse(res, [], { page, limit, total: 0 });
    }

    const regexQuery = {
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } }
      ]
    };

    const videos = await Video.find(regexQuery)
      .populate('author', 'name slug avatar')
      .skip(skip)
      .limit(limit);

    const total = await Video.countDocuments(regexQuery);
    paginatedResponse(res, videos, { page, limit, total });
  } catch (error) {
    console.error('Search videos error:', error);
    next(error);
  }
};

export const getSearchSuggestions = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q || q.length < 2) {
      return successResponse(res, []);
    }

    const regex = new RegExp(q, 'i');
    const [poems, authors] = await Promise.all([
      Poem.find({ title: regex }).select('title slug').limit(5),
      Author.find({ name: regex }).select('name slug').limit(5)
    ]);

    const suggestions = [
      ...poems.map(p => ({ type: 'poem', title: p.title, slug: p.slug })),
      ...authors.map(a => ({ type: 'author', title: a.name, slug: a.slug }))
    ];

    successResponse(res, suggestions);
  } catch (error) {
    console.error('Search suggestions error:', error);
    successResponse(res, []);
  }
};

export const getTrendingSearches = async (req, res, next) => {
  try {
    const trending = [
      'Mirza Ghalib', 'Faiz Ahmed Faiz', 'Allama Iqbal',
      'Urdu Ghazal', 'Nauha', 'Marsiya', 'Mushaira',
      'Hindi Kavita', 'Shayari', 'Karbala'
    ];
    successResponse(res, trending);
  } catch (error) {
    console.error('Trending searches error:', error);
    successResponse(res, []);
  }
};