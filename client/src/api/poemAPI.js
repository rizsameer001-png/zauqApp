
// //client/src/api/poemAPI.js

// import api from './apiConfig'

// const poemAPI = {
//   getPoems: (params) => api.get('/poems', { params }).then(res => res.data),
//   getPoem: (slug) => api.get(`/poems/${slug}`).then(res => res.data),
//   getFeaturedPoems: () => api.get('/poems/featured').then(res => res.data),
//   getTrendingPoems: () => api.get('/poems/trending').then(res => res.data),
//   getPoemsByAuthor: (authorId, params) => api.get(`/poems/author/${authorId}`, { params }).then(res => res.data),
//   getRelatedPoems: (slug) => api.get(`/poems/${slug}/related`).then(res => res.data),
//   getAIExplanation: (slug) => api.get(`/poems/${slug}/ai-explanation`).then(res => res.data),
//   createPoem: (data) => api.post('/poems', data).then(res => res.data),
//   updatePoem: (id, data) => api.put(`/poems/${id}`, data).then(res => res.data),
//   deletePoem: (id) => api.delete(`/poems/${id}`).then(res => res.data),
//   likePoem: (id) => api.post(`/poems/${id}/like`).then(res => res.data),
//   bookmarkPoem: (id) => api.post(`/poems/${id}/bookmark`).then(res => res.data),
//   addComment: (id, text) => api.post(`/poems/${id}/comment`, { text }).then(res => res.data),
// }

// export default poemAPI




// client/src/api/poemAPI.js
// import api from './apiConfig';

// const poemAPI = {
//   // Get poems with pagination and filters
//   getPoems: (params = {}) => {
//     return api.get('/poems', { params });
//   },

//   // Get single poem by slug
//   getPoem: (slug) => {
//     return api.get(`/poems/${slug}`);
//   },

//   // Get featured poems
//   getFeaturedPoems: () => {
//     return api.get('/poems/featured');
//   },

//   // Get trending poems
//   getTrendingPoems: () => {
//     return api.get('/poems/trending');
//   },

//   // Get poems by author
//   getPoemsByAuthor: (authorId, params = {}) => {
//     return api.get(`/poems/author/${authorId}`, { params });
//   },

//   // Get related poems
//   getRelatedPoems: (slug) => {
//     return api.get(`/poems/${slug}/related`);
//   },

//   // Get AI explanation
//   getAIExplanation: (slug) => {
//     return api.get(`/poems/${slug}/ai-explanation`);
//   },

//   // Create new poem
//   createPoem: (data) => {
//     return api.post('/poems', data);
//   },

//   // Update poem
//   updatePoem: (id, data) => {
//     return api.put(`/poems/${id}`, data);
//   },

//   // Delete poem
//   deletePoem: (id) => {
//     return api.delete(`/poems/${id}`);
//   },

//   // Like/unlike poem
//   likePoem: (id) => {
//     return api.post(`/poems/${id}/like`);
//   },

//   // Bookmark/unbookmark poem
//   bookmarkPoem: (id) => {
//     return api.post(`/poems/${id}/bookmark`);
//   },

//   // Add comment
//   addComment: (id, text) => {
//     return api.post(`/poems/${id}/comment`, { text });
//   }
// };

// export default poemAPI;








// // client/src/api/poemAPI.js
// import api from './apiConfig';

// const poemAPI = {
//   // Get poems with pagination and filters
//   getPoems: (params = {}) => {
//     return api.get('/poems', { params });
//   },

//   // Get single poem by slug
//   getPoem: (slug) => {
//     return api.get(`/poems/${slug}`);
//   },

//   // Get featured poems
//   getFeaturedPoems: () => {
//     return api.get('/poems/featured');
//   },

//   // Get trending poems
//   getTrendingPoems: () => {
//     return api.get('/poems/trending');
//   },

//   // Get poems by author
//   getPoemsByAuthor: (authorId, params = {}) => {
//     return api.get(`/poems/author/${authorId}`, { params });
//   },

//   // Get related poems
//   getRelatedPoems: (slug) => {
//     return api.get(`/poems/${slug}/related`);
//   },

//   // Get AI explanation
//   getAIExplanation: (slug) => {
//     return api.get(`/poems/${slug}/ai-explanation`);
//   },

//   // Create new poem
//   createPoem: (data) => {
//     return api.post('/poems', data);
//   },

//   // Update poem
//   updatePoem: (id, data) => {
//     return api.put(`/poems/${id}`, data);
//   },

//   // Delete poem
//   deletePoem: (id) => {
//     return api.delete(`/poems/${id}`);
//   },

//   // Like/unlike poem
//   likePoem: (id) => {
//     return api.post(`/poems/${id}/like`);
//   },

//   // Bookmark/unbookmark poem
//   bookmarkPoem: (id) => {
//     return api.post(`/poems/${id}/bookmark`);
//   },

//   // Add comment
//   addComment: (id, text) => {
//     return api.post(`/poems/${id}/comment`, { text });
//   }
// };

// export default poemAPI;






// // client/src/api/poemAPI.js
// import api from './apiConfig';

// const poemAPI = {
//   // Get poems with pagination and filters
//   getPoems: (params = {}) => {
//     return api.get('/poems', { params });
//   },

//   // Get single poem by SLUG (not ID)
//   getPoem: (slug) => {
//     if (!slug) {
//       return Promise.reject(new Error('Slug is required'));
//     }
//     return api.get(`/poems/${slug}`);
//   },

//   // Get featured poems
//   getFeaturedPoems: () => {
//     return api.get('/poems/featured');
//   },

//   // Get trending poems
//   getTrendingPoems: () => {
//     return api.get('/poems/trending');
//   },

//   // Get poems by author ID (for author page)
//   getPoemsByAuthor: (authorId, params = {}) => {
//     if (!authorId) {
//       return Promise.reject(new Error('Author ID is required'));
//     }
//     return api.get(`/poems/author/${authorId}`, { params });
//   },

//   // Get related poems by SLUG
//   getRelatedPoems: (slug) => {
//     if (!slug) {
//       return Promise.reject(new Error('Slug is required'));
//     }
//     return api.get(`/poems/${slug}/related`);
//   },

//   // Get AI explanation by SLUG
//   getAIExplanation: (slug) => {
//     if (!slug) {
//       return Promise.reject(new Error('Slug is required'));
//     }
//     return api.get(`/poems/${slug}/ai-explanation`);
//   },

//   // Create new poem (returns poem with generated slug)
//   createPoem: (data) => {
//     // Validate required fields
//     if (!data.title || !data.title.trim()) {
//       return Promise.reject(new Error('Title is required'));
//     }
//     if (!data.content || !data.content.trim()) {
//       return Promise.reject(new Error('Content is required'));
//     }
//     if (!data.author) {
//       return Promise.reject(new Error('Author is required'));
//     }
//     if (!data.genre) {
//       return Promise.reject(new Error('Genre is required'));
//     }
    
//     return api.post('/poems', data);
//   },

//   // Update poem by ID (admin use)
//   updatePoem: (id, data) => {
//     if (!id) {
//       return Promise.reject(new Error('Poem ID is required'));
//     }
//     return api.put(`/poems/${id}`, data);
//   },

//   // Delete poem by ID (admin use)
//   deletePoem: (id) => {
//     if (!id) {
//       return Promise.reject(new Error('Poem ID is required'));
//     }
//     return api.delete(`/poems/${id}`);
//   },

//   // Like/unlike poem by ID
//   likePoem: (id) => {
//     if (!id) {
//       return Promise.reject(new Error('Poem ID is required'));
//     }
//     return api.post(`/poems/${id}/like`);
//   },

//   // Bookmark/unbookmark poem by ID
//   bookmarkPoem: (id) => {
//     if (!id) {
//       return Promise.reject(new Error('Poem ID is required'));
//     }
//     return api.post(`/poems/${id}/bookmark`);
//   },

//   // Add comment to poem by ID
//   addComment: (id, text) => {
//     if (!id) {
//       return Promise.reject(new Error('Poem ID is required'));
//     }
//     if (!text || !text.trim()) {
//       return Promise.reject(new Error('Comment text is required'));
//     }
//     return api.post(`/poems/${id}/comment`, { text: text.trim() });
//   },

//   // Get poem by slug with better error handling
//   getPoemBySlug: async (slug) => {
//     try {
//       const response = await api.get(`/poems/${slug}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching poem with slug "${slug}":`, error);
//       throw error;
//     }
//   },

//   // Get poem preview by slug (for social sharing)
//   getPoemPreview: (slug) => {
//     if (!slug) {
//       return Promise.reject(new Error('Slug is required'));
//     }
//     return api.get(`/poems/${slug}/preview`);
//   },

//   // Search poems by keyword
//   searchPoems: (query, params = {}) => {
//     if (!query || !query.trim()) {
//       return Promise.reject(new Error('Search query is required'));
//     }
//     return api.get('/poems/search', { params: { q: query, ...params } });
//   },

//   // Get poems by genre
//   getPoemsByGenre: (genre, params = {}) => {
//     if (!genre) {
//       return Promise.reject(new Error('Genre is required'));
//     }
//     return api.get('/poems', { params: { genre, ...params } });
//   },

//   // Get poems by era
//   getPoemsByEra: (era, params = {}) => {
//     if (!era) {
//       return Promise.reject(new Error('Era is required'));
//     }
//     return api.get('/poems', { params: { era, ...params } });
//   },

//   // Get random poem
//   getRandomPoem: () => {
//     return api.get('/poems/random');
//   },

//   // Get poem stats by slug
//   getPoemStats: (slug) => {
//     if (!slug) {
//       return Promise.reject(new Error('Slug is required'));
//     }
//     return api.get(`/poems/${slug}/stats`);
//   },

//   // Report poem (for moderation)
//   reportPoem: (id, reason) => {
//     if (!id) {
//       return Promise.reject(new Error('Poem ID is required'));
//     }
//     if (!reason || !reason.trim()) {
//       return Promise.reject(new Error('Reason is required'));
//     }
//     return api.post(`/poems/${id}/report`, { reason });
//   }
// };

// export default poemAPI;















// client/src/api/poemAPI.js
import api from './apiConfig';

const poemAPI = {
  // ============================================
  // BASIC CRUD OPERATIONS
  // ============================================

  // Get poems with pagination and filters
  getPoems: (params = {}) => {
    return api.get('/poems', { params });
  },

  // Get single poem by SLUG (not ID)
  getPoem: (slug) => {
    if (!slug) {
      return Promise.reject(new Error('Slug is required'));
    }
    return api.get(`/poems/${slug}`);
  },

  // Get featured poems
  getFeaturedPoems: () => {
    return api.get('/poems/featured');
  },

  // Get trending poems
  getTrendingPoems: () => {
    return api.get('/poems/trending');
  },

  // Get poems by author ID (for author page)
  getPoemsByAuthor: (authorId, params = {}) => {
    if (!authorId) {
      return Promise.reject(new Error('Author ID is required'));
    }
    return api.get(`/poems/author/${authorId}`, { params });
  },

  // Get related poems by SLUG
  getRelatedPoems: (slug) => {
    if (!slug) {
      return Promise.reject(new Error('Slug is required'));
    }
    return api.get(`/poems/${slug}/related`);
  },

  // ============================================
  // AI & ANALYSIS FEATURES (NEW)
  // ============================================

  // Get AI explanation by SLUG (existing)
  getAIExplanation: (slug) => {
    if (!slug) {
      return Promise.reject(new Error('Slug is required'));
    }
    return api.get(`/poems/${slug}/ai-explanation`);
  },

  // 🔴 NEW: Get sentiment analysis for a poem
  getPoemSentiment: (slug) => {
    if (!slug) {
      return Promise.reject(new Error('Slug is required'));
    }
    return api.get(`/poems/${slug}/sentiment`);
  },

  // 🔴 NEW: Get theme analysis for a poem
  getPoemThemes: (slug) => {
    if (!slug) {
      return Promise.reject(new Error('Slug is required'));
    }
    return api.get(`/poems/${slug}/themes`);
  },

  // 🔴 NEW: Get full AI analysis for a poem (literary analysis)
  getAIAnalysis: (slug) => {
    if (!slug) {
      return Promise.reject(new Error('Slug is required'));
    }
    return api.get(`/poems/${slug}/ai-analysis`);
  },

  // 🔴 NEW: Analyze poem content directly (for CMS / real-time analysis)
  analyzePoemContent: (data) => {
    if (!data.poemText || !data.poemText.trim()) {
      return Promise.reject(new Error('Poem text is required'));
    }
    return api.post('/poems/analyze-content', data);
  },

  // 🔴 NEW: Get batch sentiment for multiple poems
  batchGetSentiment: (ids) => {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return Promise.reject(new Error('Poem IDs array is required'));
    }
    return api.post('/poems/sentiment/batch', { ids });
  },

  // 🔴 NEW: Get batch themes for multiple poems
  batchGetThemes: (ids) => {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return Promise.reject(new Error('Poem IDs array is required'));
    }
    return api.post('/poems/themes/batch', { ids });
  },

  // ============================================
  // ADMIN CRUD OPERATIONS
  // ============================================

  // Create new poem (returns poem with generated slug)
  createPoem: (data) => {
    // Validate required fields
    if (!data.title || !data.title.trim()) {
      return Promise.reject(new Error('Title is required'));
    }
    if (!data.content || !data.content.trim()) {
      return Promise.reject(new Error('Content is required'));
    }
    if (!data.author) {
      return Promise.reject(new Error('Author is required'));
    }
    if (!data.genre) {
      return Promise.reject(new Error('Genre is required'));
    }
    
    return api.post('/poems', data);
  },

  // Update poem by SLUG (not ID)
  updatePoem: (slug, data) => {
    if (!slug) {
      return Promise.reject(new Error('Poem slug is required'));
    }
    return api.put(`/poems/${slug}`, data);
  },

  // Delete poem by SLUG (not ID)
  deletePoem: (slug) => {
    if (!slug) {
      return Promise.reject(new Error('Poem slug is required'));
    }
    return api.delete(`/poems/${slug}`);
  },

  // ============================================
  // USER INTERACTION
  // ============================================

  // Like/unlike poem by SLUG
  likePoem: (slug) => {
    if (!slug) {
      return Promise.reject(new Error('Poem slug is required'));
    }
    return api.post(`/poems/${slug}/like`);
  },

  // Bookmark/unbookmark poem by SLUG
  bookmarkPoem: (slug) => {
    if (!slug) {
      return Promise.reject(new Error('Poem slug is required'));
    }
    return api.post(`/poems/${slug}/bookmark`);
  },

  // Add comment to poem by SLUG
  addComment: (slug, text) => {
    if (!slug) {
      return Promise.reject(new Error('Poem slug is required'));
    }
    if (!text || !text.trim()) {
      return Promise.reject(new Error('Comment text is required'));
    }
    return api.post(`/poems/${slug}/comment`, { text: text.trim() });
  },

  // ============================================
  // UTILITY METHODS
  // ============================================

  // Get poem by slug with better error handling
  getPoemBySlug: async (slug) => {
    try {
      const response = await api.get(`/poems/${slug}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching poem with slug "${slug}":`, error);
      throw error;
    }
  },

  // Get poem preview by slug (for social sharing)
  getPoemPreview: (slug) => {
    if (!slug) {
      return Promise.reject(new Error('Slug is required'));
    }
    return api.get(`/poems/${slug}/preview`);
  },

  // Search poems by keyword
  searchPoems: (query, params = {}) => {
    if (!query || !query.trim()) {
      return Promise.reject(new Error('Search query is required'));
    }
    return api.get('/poems/search', { params: { q: query, ...params } });
  },

  // Get poems by genre
  getPoemsByGenre: (genre, params = {}) => {
    if (!genre) {
      return Promise.reject(new Error('Genre is required'));
    }
    return api.get('/poems', { params: { genre, ...params } });
  },

  // Get poems by era
  getPoemsByEra: (era, params = {}) => {
    if (!era) {
      return Promise.reject(new Error('Era is required'));
    }
    return api.get('/poems', { params: { era, ...params } });
  },

  // Get random poem
  getRandomPoem: () => {
    return api.get('/poems/random');
  },

  // Get poem stats by slug
  getPoemStats: (slug) => {
    if (!slug) {
      return Promise.reject(new Error('Slug is required'));
    }
    return api.get(`/poems/${slug}/stats`);
  },

  // Report poem (for moderation)
  reportPoem: (slug, reason) => {
    if (!slug) {
      return Promise.reject(new Error('Poem slug is required'));
    }
    if (!reason || !reason.trim()) {
      return Promise.reject(new Error('Reason is required'));
    }
    return api.post(`/poems/${slug}/report`, { reason });
  },

  // ============================================
  // BULK OPERATIONS
  // ============================================

  // Bulk publish poems
  bulkPublish: (ids) => {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return Promise.reject(new Error('Poem IDs array is required'));
    }
    return api.post('/poems/bulk/publish', { ids });
  },

  // Bulk delete poems
  bulkDelete: (ids) => {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return Promise.reject(new Error('Poem IDs array is required'));
    }
    return api.post('/poems/bulk/delete', { ids });
  },

  // ============================================
  // EXPORT/IMPORT
  // ============================================

  // Export poems to JSON
  exportPoems: (params = {}) => {
    return api.get('/poems/export', { params, responseType: 'blob' });
  },

  // Import poems from JSON
  importPoems: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/poems/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }
};

export default poemAPI;
