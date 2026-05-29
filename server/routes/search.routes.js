import express from 'express';
import { cacheMiddleware } from '../middleware/cache.js';
import {
  unifiedSearch,
  searchPoems,
  searchAuthors,
  searchBooks,
  searchAudio,
  searchVideos,
  getSearchSuggestions,
  getTrendingSearches
} from '../controllers/search.controller.js';

const router = express.Router();

router.get('/', cacheMiddleware(300), unifiedSearch);
router.get('/suggestions', getSearchSuggestions);
router.get('/trending', cacheMiddleware(600), getTrendingSearches);
router.get('/poems', searchPoems);
router.get('/authors', searchAuthors);
router.get('/books', searchBooks);
router.get('/audio', searchAudio);
router.get('/videos', searchVideos);

export default router;
