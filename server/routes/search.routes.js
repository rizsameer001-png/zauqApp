// import express from 'express';
// import { cacheMiddleware } from '../middleware/cache.js';
// import {
//   unifiedSearch,
//   searchPoems,
//   searchAuthors,
//   searchBooks,
//   searchAudio,
//   searchVideos,
//   getSearchSuggestions,
//   getTrendingSearches
// } from '../controllers/search.controller.js';

// const router = express.Router();

// router.get('/', cacheMiddleware(300), unifiedSearch);
// router.get('/suggestions', getSearchSuggestions);
// router.get('/trending', cacheMiddleware(600), getTrendingSearches);
// router.get('/poems', searchPoems);
// router.get('/authors', searchAuthors);
// router.get('/books', searchBooks);
// router.get('/audio', searchAudio);
// router.get('/videos', searchVideos);

// export default router;






// import express from 'express';
// import { cacheMiddleware } from '../middleware/cache.js';
// import {
//   unifiedSearch,
//   searchPoems,
//   searchAuthors,
//   searchBooks,
//   searchAudio,
//   searchVideos,
//   getSearchSuggestions,
//   getTrendingSearches,
//   semanticSearch,
//   voiceSearch
// } from '../controllers/search.controller.js';

// const router = express.Router();

// // Basic search routes
// router.get('/', cacheMiddleware(300), unifiedSearch);
// router.get('/suggestions', getSearchSuggestions);
// router.get('/trending', cacheMiddleware(600), getTrendingSearches);

// // Type-specific search routes
// router.get('/poems', searchPoems);
// router.get('/authors', searchAuthors);
// router.get('/books', searchBooks);
// router.get('/audio', searchAudio);
// router.get('/videos', searchVideos);

// // AI and Voice search routes
// router.get('/semantic', semanticSearch);
// router.post('/voice', voiceSearch);

// export default router;















// import express from 'express';
// import { cacheMiddleware } from '../middleware/cache.js';
// import {
//   unifiedSearch,
//   searchPoems,
//   searchAuthors,
//   searchBooks,
//   searchAudio,
//   searchVideos,
//   getSearchSuggestions,
//   getTrendingSearches,
//   semanticSearch,
//   voiceSearch
// } from '../controllers/search.controller.js';

// const router = express.Router();

// // Basic search routes
// router.get('/', unifiedSearch);
// router.get('/suggestions', getSearchSuggestions);
// router.get('/trending', getTrendingSearches);

// // Type-specific search routes
// router.get('/poems', searchPoems);
// router.get('/authors', searchAuthors);
// router.get('/books', searchBooks);
// router.get('/audio', searchAudio);
// router.get('/videos', searchVideos);

// // AI and Voice search routes
// router.get('/semantic', semanticSearch);
// router.post('/voice', voiceSearch);

// // Test endpoint to verify search is working
// router.get('/test', (req, res) => {
//   res.json({ message: 'Search routes are working', timestamp: new Date() });
// });

// export default router;









// server/routes/search.routes.js
import express from 'express';
import {
  unifiedSearch,
  searchPoems,
  searchAuthors,
  searchBooks,
  searchAudio,
  searchVideos,
  getSearchSuggestions,
  getTrendingSearches,
  semanticSearch,
  voiceSearch,
  debugSearch
} from '../controllers/search.controller.js';

const router = express.Router();

// ==================== MAIN SEARCH ROUTES ====================
router.get('/', unifiedSearch);                    // Unified search across all types
router.get('/suggestions', getSearchSuggestions);  // Auto-complete suggestions
router.get('/trending', getTrendingSearches);      // Trending search terms

// ==================== TYPE-SPECIFIC SEARCH ROUTES ====================
router.get('/poems', searchPoems);      // Search poems only
router.get('/authors', searchAuthors);  // Search authors only
router.get('/books', searchBooks);      // Search books only
router.get('/audio', searchAudio);      // Search audio only
router.get('/videos', searchVideos);    // Search videos only

// ==================== AI & VOICE SEARCH ROUTES ====================
router.get('/semantic', semanticSearch);  // AI-powered semantic search
router.post('/voice', voiceSearch);       // Voice search endpoint

// ==================== DEBUG ROUTE (remove in production) ====================
router.get('/debug', debugSearch);

// ==================== HEALTH CHECK ====================
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Search routes are working',
    timestamp: new Date().toISOString(),
    endpoints: [
      'GET /',
      'GET /suggestions',
      'GET /trending',
      'GET /poems',
      'GET /authors',
      'GET /books',
      'GET /audio',
      'GET /videos',
      'GET /semantic',
      'POST /voice',
      'GET /debug'
    ]
  });
});

export default router;