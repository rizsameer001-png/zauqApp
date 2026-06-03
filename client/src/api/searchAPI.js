// import api from './apiConfig'

// const searchAPI = {
//   search: (q, type) => api.get('/search', { params: { q, type } }).then(res => res.data),
//   searchPoems: (q, params) => api.get('/search/poems', { params: { q, ...params } }).then(res => res.data),
//   searchAuthors: (q, params) => api.get('/search/authors', { params: { q, ...params } }).then(res => res.data),
//   searchBooks: (q, params) => api.get('/search/books', { params: { q, ...params } }).then(res => res.data),
//   searchAudio: (q, params) => api.get('/search/audio', { params: { q, ...params } }).then(res => res.data),
//   searchVideos: (q, params) => api.get('/search/videos', { params: { q, ...params } }).then(res => res.data),
//   getSuggestions: (q) => api.get('/search/suggestions', { params: { q } }).then(res => res.data),
//   getTrendingSearches: () => api.get('/search/trending').then(res => res.data),
// }

// export default searchAPI








// // client/src/api/searchAPI.js
// import api from './apiConfig'

// const searchAPI = {
//   // Unified search across all content types
//   search: (q, type, params = {}) => {
//     return api.get('/search', { params: { q, type, ...params } }).then(res => res.data)
//   },
  
//   // Search poems only
//   searchPoems: (q, params = {}) => {
//     return api.get('/search/poems', { params: { q, ...params } }).then(res => res.data)
//   },
  
//   // Search authors only
//   searchAuthors: (q, params = {}) => {
//     return api.get('/search/authors', { params: { q, ...params } }).then(res => res.data)
//   },
  
//   // Search books only
//   searchBooks: (q, params = {}) => {
//     return api.get('/search/books', { params: { q, ...params } }).then(res => res.data)
//   },
  
//   // Search audio only
//   searchAudio: (q, params = {}) => {
//     return api.get('/search/audio', { params: { q, ...params } }).then(res => res.data)
//   },
  
//   // Search videos only
//   searchVideos: (q, params = {}) => {
//     return api.get('/search/videos', { params: { q, ...params } }).then(res => res.data)
//   },
  
//   // Get search suggestions as you type
//   getSuggestions: (q) => {
//     if (!q || q.length < 2) return Promise.resolve({ data: [] })
//     return api.get('/search/suggestions', { params: { q } }).then(res => res.data)
//   },
  
//   // Get trending search terms
//   getTrendingSearches: () => {
//     return api.get('/search/trending').then(res => res.data)
//   },
  
//   // Advanced search with filters
//   advancedSearch: (filters) => {
//     return api.post('/search/advanced', filters).then(res => res.data)
//   },
  
//   // Get search history (for authenticated users)
//   getSearchHistory: () => {
//     return api.get('/search/history').then(res => res.data)
//   },
  
//   // Clear search history
//   clearSearchHistory: () => {
//     return api.delete('/search/history').then(res => res.data)
//   },
  
//   // Save search term (for analytics)
//   saveSearchTerm: (term, resultCount = 0) => {
//     return api.post('/search/track', { term, resultCount }).then(res => res.data)
//   }
// }

// export default searchAPI

















import api from './apiConfig'

const searchAPI = {
  // Unified search across all content types
  search: (q, type, params = {}) => {
    if (!q || q.length < 2) return Promise.resolve({ data: { poems: [], authors: [], books: [], audio: [], videos: [] } });
    return api.get('/search', { params: { q, type, ...params } }).then(res => res.data)
  },
  
  // Search poems only
  searchPoems: (q, params = {}) => {
    if (!q || q.length < 2) return Promise.resolve({ data: { data: [] } });
    return api.get('/search/poems', { params: { q, ...params } }).then(res => res.data)
  },
  
  // Search authors only
  searchAuthors: (q, params = {}) => {
    if (!q || q.length < 2) return Promise.resolve({ data: { data: [] } });
    return api.get('/search/authors', { params: { q, ...params } }).then(res => res.data)
  },
  
  // Search books only
  searchBooks: (q, params = {}) => {
    if (!q || q.length < 2) return Promise.resolve({ data: { data: [] } });
    return api.get('/search/books', { params: { q, ...params } }).then(res => res.data)
  },
  
  // Search audio only
  searchAudio: (q, params = {}) => {
    if (!q || q.length < 2) return Promise.resolve({ data: { data: [] } });
    return api.get('/search/audio', { params: { q, ...params } }).then(res => res.data)
  },
  
  // Search videos only
  searchVideos: (q, params = {}) => {
    if (!q || q.length < 2) return Promise.resolve({ data: { data: [] } });
    return api.get('/search/videos', { params: { q, ...params } }).then(res => res.data)
  },
  
  // AI-Powered Semantic Search
  semanticSearch: (q, type = 'all') => {
    if (!q || q.length < 2) return Promise.resolve({ data: { results: [] } });
    return api.get('/search/semantic', { params: { q, type } }).then(res => res.data)
  },
  
  // Voice Search
  voiceSearch: async (audioBlob, language = 'en') => {
    // First, convert speech to text using browser Web Speech API
    return new Promise((resolve, reject) => {
      // Check if browser supports speech recognition
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        reject(new Error('Speech recognition not supported in this browser'));
        return;
      }
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = language === 'ur' ? 'ur-PK' : language === 'hi' ? 'hi-IN' : 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        // Send transcript to backend for search
        api.post('/search/voice', { transcript, language })
          .then(res => resolve(res.data))
          .catch(reject);
      };
      
      recognition.onerror = (event) => {
        reject(new Error(`Speech recognition error: ${event.error}`));
      };
      
      recognition.start();
    });
  },
  
  // Get search suggestions as you type
  getSuggestions: (q) => {
    if (!q || q.length < 2) return Promise.resolve({ data: [] })
    return api.get('/search/suggestions', { params: { q } }).then(res => res.data)
  },
  
  // Get trending search terms
  getTrendingSearches: () => {
    return api.get('/search/trending').then(res => res.data)
  },
  
  // Advanced search with filters
  advancedSearch: (filters) => {
    return api.post('/search/advanced', filters).then(res => res.data)
  },
  
  // Get search history (for authenticated users)
  getSearchHistory: () => {
    return api.get('/search/history').then(res => res.data)
  },
  
  // Clear search history
  clearSearchHistory: () => {
    return api.delete('/search/history').then(res => res.data)
  },
  
  // Save search term (for analytics)
  saveSearchTerm: (term, resultCount = 0) => {
    return api.post('/search/track', { term, resultCount }).then(res => res.data)
  }
}

export default searchAPI