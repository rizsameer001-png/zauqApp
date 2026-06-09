
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
















// // client/src/api/poemAPI.js
// import api from './apiConfig';

// // Helper function for fallback analysis data
// const getFallbackAnalysisData = () => {
//   return {
//     themes: ['Poetry', 'Expression', 'Emotion', 'Reflection'],
//     tone: 'Expressive',
//     sentiment: 'neutral',
//     emotions: ['Thoughtful', 'Reflective', 'Imaginative'],
//     meaning: 'This poem expresses deep emotions through beautiful imagery and heartfelt words. It invites readers to reflect on its themes and find personal meaning.',
//     literaryDevices: ['Imagery', 'Metaphor', 'Rhythm', 'Symbolism'],
//     rhymeScheme: 'Free verse / Rhythmic pattern',
//     difficulty: 'intermediate',
//     provider: 'ZauqApp (Local Fallback)'
//   };
// };

// const poemAPI = {
//   // ============================================
//   // BASIC CRUD OPERATIONS
//   // ============================================

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

//   // ============================================
//   // TRANSLITERATION FEATURES
//   // ============================================

//   // Get transliteration by slug (Public)
//   getTransliteration: async (slug) => {
//     if (!slug) {
//       return Promise.reject(new Error('Slug is required'));
//     }
    
//     try {
//       console.log('🔤 Fetching transliteration for slug:', slug);
//       const response = await api.get(`/transliteration/poem/${slug}`);
//       console.log('📦 Transliteration response:', response.data);
      
//       return {
//         success: response.data.success || false,
//         data: response.data.data || '',
//         fromCache: response.data.fromCache || false,
//         method: response.data.method || null,
//         language: response.data.language || null
//       };
//     } catch (error) {
//       console.error('❌ getTransliteration error:', error.response?.data || error.message);
//       return {
//         success: false,
//         data: '',
//         error: error.response?.data?.error || error.message || 'Failed to fetch transliteration'
//       };
//     }
//   },

//   // Generate transliteration for a poem (Admin only)
//   generateTransliteration: async (poemId) => {
//     if (!poemId) {
//       return Promise.reject(new Error('Poem ID is required'));
//     }
    
//     try {
//       console.log('🔤 Generating transliteration for poem ID:', poemId);
//       const response = await api.post(`/transliteration/poem/${poemId}`);
//       console.log('📦 Generate response:', response.data);
      
//       return {
//         success: response.data.success || false,
//         data: response.data.data || '',
//         method: response.data.method || null,
//         saved: response.data.saved || false
//       };
//     } catch (error) {
//       console.error('❌ generateTransliteration error:', error.response?.data || error.message);
//       return {
//         success: false,
//         data: '',
//         error: error.response?.data?.error || error.message || 'Failed to generate transliteration'
//       };
//     }
//   },

//   // Toggle auto-transliteration for a poem (Admin only)
//   toggleAutoTransliterate: async (poemId, enabled) => {
//     if (!poemId) {
//       return Promise.reject(new Error('Poem ID is required'));
//     }
    
//     if (enabled === undefined) {
//       return Promise.reject(new Error('Enabled flag is required'));
//     }
    
//     try {
//       console.log('⚙️ Toggling auto-transliteration for poem:', poemId, 'to', enabled);
//       const response = await api.patch(`/transliteration/poem/${poemId}/toggle-auto`, { enabled });
//       console.log('📦 Toggle response:', response.data);
      
//       return {
//         success: response.data.success || false,
//         autoTransliterate: response.data.autoTransliterate || false
//       };
//     } catch (error) {
//       console.error('❌ toggleAutoTransliterate error:', error.response?.data || error.message);
//       return {
//         success: false,
//         autoTransliterate: false,
//         error: error.response?.data?.error || error.message || 'Failed to toggle auto-transliteration'
//       };
//     }
//   },

//   // Auto-transliterate a poem (Admin only)
//   autoTransliteratePoem: async (poemId, force = false) => {
//     if (!poemId) {
//       return Promise.reject(new Error('Poem ID is required'));
//     }
    
//     try {
//       console.log('🔄 Auto-transliterating poem:', poemId, 'force:', force);
//       const response = await api.post(`/transliteration/poem/${poemId}/auto`, { force });
//       console.log('📦 Auto response:', response.data);
      
//       return {
//         success: response.data.success || false,
//         data: response.data.data || '',
//         method: response.data.method || null,
//         fromCache: response.data.fromCache || false,
//         skipped: response.data.skipped || false
//       };
//     } catch (error) {
//       console.error('❌ autoTransliteratePoem error:', error.response?.data || error.message);
//       return {
//         success: false,
//         data: '',
//         error: error.response?.data?.error || error.message || 'Failed to auto-transliterate poem'
//       };
//     }
//   },

//   // Batch generate transliterations (Admin only)
//   batchGenerateTransliterations: async (limit = 50, language = null) => {
//     try {
//       console.log('🔤 Batch generating transliterations (limit:', limit, 'language:', language || 'all)');
//       const response = await api.post('/transliteration/batch', { limit, language });
//       console.log('📦 Batch response:', response.data);
      
//       return {
//         success: response.data.success || false,
//         total: response.data.total || 0,
//         generated: response.data.generated || 0,
//         failed: response.data.failed || 0,
//         results: response.data.results || [],
//         message: response.data.message || ''
//       };
//     } catch (error) {
//       console.error('❌ batchGenerateTransliterations error:', error.response?.data || error.message);
//       return {
//         success: false,
//         total: 0,
//         generated: 0,
//         failed: 0,
//         results: [],
//         error: error.response?.data?.error || error.message || 'Failed to batch generate'
//       };
//     }
//   },

//   // Batch auto-transliterate poems (Admin only)
//   batchAutoTransliterate: async (limit = 100, language = null) => {
//     try {
//       console.log('🔄 Batch auto-transliterating (limit:', limit, 'language:', language || 'all)');
//       const response = await api.post('/transliteration/batch/auto', { limit, language });
//       console.log('📦 Batch auto response:', response.data);
      
//       return {
//         success: response.data.success || false,
//         total: response.data.total || 0,
//         generated: response.data.generated || 0,
//         failed: response.data.failed || 0,
//         skipped: response.data.skipped || 0,
//         results: response.data.results || [],
//         message: response.data.message || ''
//       };
//     } catch (error) {
//       console.error('❌ batchAutoTransliterate error:', error.response?.data || error.message);
//       return {
//         success: false,
//         total: 0,
//         generated: 0,
//         failed: 0,
//         skipped: 0,
//         results: [],
//         error: error.response?.data?.error || error.message || 'Failed to batch auto-transliterate'
//       };
//     }
//   },

//   // Get poems missing transliteration (Admin only)
//   getMissingTransliterations: async (limit = 50, language = null) => {
//     try {
//       console.log('🔍 Fetching poems missing transliteration (limit:', limit, 'language:', language || 'all)');
//       const params = { limit };
//       if (language) params.language = language;
      
//       const response = await api.get('/transliteration/missing', { params });
//       console.log('📦 Missing poems response:', response.data);
      
//       return {
//         success: response.data.success || false,
//         total: response.data.total || 0,
//         poems: response.data.poems || []
//       };
//     } catch (error) {
//       console.error('❌ getMissingTransliterations error:', error.response?.data || error.message);
//       return {
//         success: false,
//         total: 0,
//         poems: [],
//         error: error.response?.data?.error || error.message || 'Failed to fetch missing poems'
//       };
//     }
//   },

//   // Test transliteration (Admin only)
//   testTransliteration: async (text, language = 'urdu') => {
//     if (!text || !text.trim()) {
//       return Promise.reject(new Error('Text is required'));
//     }
    
//     try {
//       console.log('🔤 Testing transliteration for', language);
//       const response = await api.post('/transliteration/test', { text, language });
//       console.log('📦 Test response:', response.data);
      
//       return {
//         success: response.data.success || false,
//         original: response.data.original || text,
//         transliteration: response.data.transliteration || '',
//         method: response.data.method || null,
//         language: response.data.language || language
//       };
//     } catch (error) {
//       console.error('❌ testTransliteration error:', error.response?.data || error.message);
//       return {
//         success: false,
//         original: text,
//         transliteration: '',
//         error: error.response?.data?.error || error.message || 'Failed to test transliteration'
//       };
//     }
//   },

//   // Get transliteration status/stats (Admin only)
//   getTransliterationStatus: async () => {
//     try {
//       console.log('🔤 Fetching transliteration status');
//       const response = await api.get('/transliteration/status');
//       console.log('📦 Status response:', response.data);
      
//       return {
//         success: response.data.success || false,
//         stats: response.data.stats || null
//       };
//     } catch (error) {
//       console.error('❌ getTransliterationStatus error:', error.response?.data || error.message);
//       return {
//         success: false,
//         stats: null,
//         error: error.response?.data?.error || error.message || 'Failed to fetch status'
//       };
//     }
//   },

//   // Delete transliteration for a poem (Admin only)
//   deleteTransliteration: async (poemId) => {
//     if (!poemId) {
//       return Promise.reject(new Error('Poem ID is required'));
//     }
    
//     try {
//       console.log('🔤 Deleting transliteration for poem ID:', poemId);
//       const response = await api.delete(`/transliteration/poem/${poemId}`);
//       console.log('📦 Delete response:', response.data);
      
//       return {
//         success: response.data.success || false,
//         message: response.data.message || 'Transliteration deleted'
//       };
//     } catch (error) {
//       console.error('❌ deleteTransliteration error:', error.response?.data || error.message);
//       return {
//         success: false,
//         error: error.response?.data?.error || error.message || 'Failed to delete transliteration'
//       };
//     }
//   },

//   // ============================================
//   // AI & ANALYSIS FEATURES
//   // ============================================

//   // Get AI explanation by SLUG (existing)
//   getAIExplanation: (slug) => {
//     if (!slug) {
//       return Promise.reject(new Error('Slug is required'));
//     }
//     return api.get(`/poems/${slug}/ai-explanation`);
//   },

//   // Get sentiment analysis for a poem
//   getPoemSentiment: (slug) => {
//     if (!slug) {
//       return Promise.reject(new Error('Slug is required'));
//     }
//     return api.get(`/poems/${slug}/sentiment`);
//   },

//   // Get theme analysis for a poem
//   getPoemThemes: (slug) => {
//     if (!slug) {
//       return Promise.reject(new Error('Slug is required'));
//     }
//     return api.get(`/poems/${slug}/themes`);
//   },

//   // Get full AI analysis for a poem (literary analysis)
//   getAIAnalysis: async (slug) => {
//     if (!slug) {
//       return Promise.reject(new Error('Slug is required'));
//     }
    
//     try {
//       console.log('📡 Fetching AI analysis for slug:', slug);
//       const response = await api.get(`/poems/${slug}/ai-analysis`);
//       console.log('📡 AI Analysis response status:', response.status);
//       console.log('📡 AI Analysis response data:', response.data);
      
//       if (response.data && response.data.success === false) {
//         console.error('❌ API returned error:', response.data.error);
//         return {
//           success: false,
//           error: response.data.error || 'Failed to analyze poem'
//         };
//       }
      
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAIAnalysis error:', error.response?.data || error.message);
//       return {
//         success: false,
//         error: error.response?.data?.error || error.message || 'Failed to fetch AI analysis'
//       };
//     }
//   },

//   // ============================================
//   // Hugging Face Analysis with Fallback
//   // ============================================

//   getHuggingFaceAnalysis: async (poemId, forceRefresh = false) => {
//     if (!poemId) {
//       return Promise.reject(new Error('Poem ID is required'));
//     }
    
//     try {
//       console.log('🤗 Requesting Hugging Face analysis for poem:', poemId, 'forceRefresh:', forceRefresh);
//       const response = await api.post(`/analysis/analyze/${poemId}`, { forceRefresh });
//       console.log('📦 Hugging Face analysis response:', response.data);
      
//       if (response.data && response.data.success) {
//         return {
//           success: true,
//           data: response.data.data,
//           provider: response.data.provider,
//           modelUsed: response.data.modelUsed,
//           fallbackUsed: response.data.fallbackUsed || false,
//           cached: response.data.cached || false,
//           analyzedAt: response.data.analyzedAt
//         };
//       } else {
//         return {
//           success: false,
//           data: getFallbackAnalysisData(),
//           provider: 'fallback',
//           fallbackUsed: true,
//           error: response.data?.error || 'Analysis failed'
//         };
//       }
//     } catch (error) {
//       console.error('❌ Hugging Face analysis error:', error.response?.data || error.message);
//       return {
//         success: false,
//         data: getFallbackAnalysisData(),
//         provider: 'fallback',
//         fallbackUsed: true,
//         error: error.response?.data?.error || error.message || 'Failed to fetch analysis'
//       };
//     }
//   },

//   // Convenience method to get analysis by slug
//   getAnalysisBySlug: async (slug, forceRefresh = false) => {
//     if (!slug) {
//       return Promise.reject(new Error('Slug is required'));
//     }
    
//     try {
//       const poemResponse = await api.get(`/poems/${slug}`);
//       const poem = poemResponse.data?.data || poemResponse.data;
      
//       if (!poem || !poem._id) {
//         throw new Error('Poem not found or missing ID');
//       }
      
//       return await poemAPI.getHuggingFaceAnalysis(poem._id, forceRefresh);
//     } catch (error) {
//       console.error('❌ getAnalysisBySlug error:', error);
//       return {
//         success: false,
//         data: getFallbackAnalysisData(),
//         provider: 'fallback',
//         fallbackUsed: true,
//         error: error.message || 'Failed to fetch analysis'
//       };
//     }
//   },

//   // Health check for Hugging Face service
//   checkHuggingFaceHealth: async () => {
//     try {
//       const response = await api.get('/analysis/health');
//       return response.data;
//     } catch (error) {
//       console.error('Health check failed:', error);
//       return { status: 'error', huggingface: { configured: false } };
//     }
//   },

//   // Analyze poem content directly
//   analyzePoemContent: (data) => {
//     if (!data.poemText || !data.poemText.trim()) {
//       return Promise.reject(new Error('Poem text is required'));
//     }
//     return api.post('/poems/analyze-content', data);
//   },

//   // Get batch sentiment for multiple poems
//   batchGetSentiment: (ids) => {
//     if (!ids || !Array.isArray(ids) || ids.length === 0) {
//       return Promise.reject(new Error('Poem IDs array is required'));
//     }
//     return api.post('/poems/sentiment/batch', { ids });
//   },

//   // Get batch themes for multiple poems
//   batchGetThemes: (ids) => {
//     if (!ids || !Array.isArray(ids) || ids.length === 0) {
//       return Promise.reject(new Error('Poem IDs array is required'));
//     }
//     return api.post('/poems/themes/batch', { ids });
//   },

//   // ============================================
//   // ADMIN CRUD OPERATIONS (UPDATED FOR HINDI)
//   // ============================================

//   // Create new poem with support for Hindi content
//   createPoem: (data) => {
//     // Validate title
//     if (!data.title || !data.title.trim()) {
//       return Promise.reject(new Error('Title is required'));
//     }
    
//     // Validate content based on language
//     const language = data.language || 'urdu';
    
//     if (language === 'hindi') {
//       if (!data.contentHindi || !data.contentHindi.trim()) {
//         return Promise.reject(new Error('Hindi content is required for Hindi poems'));
//       }
//       // Ensure content is set for API compatibility
//       data.content = data.contentHindi;
//     } else if (language === 'urdu') {
//       if (!data.contentUrdu && !data.content) {
//         return Promise.reject(new Error('Urdu content is required for Urdu poems'));
//       }
//       if (data.contentUrdu) {
//         data.content = data.contentUrdu;
//       }
//     } else {
//       if (!data.content || !data.content.trim()) {
//         return Promise.reject(new Error('Content is required'));
//       }
//     }
    
//     // Validate author
//     if (!data.author) {
//       return Promise.reject(new Error('Author is required'));
//     }
    
//     // Validate genre
//     if (!data.genre) {
//       return Promise.reject(new Error('Genre is required'));
//     }
    
//     // Clean up data before sending
//     const cleanData = {
//       title: data.title.trim(),
//       content: data.content?.trim() || '',
//       contentUrdu: data.contentUrdu?.trim() || (language === 'urdu' ? data.content?.trim() : ''),
//       contentHindi: data.contentHindi?.trim() || (language === 'hindi' ? data.content?.trim() : ''),
//       transliteration: data.transliteration?.trim() || '',
//       translation: {
//         english: data.translation?.english?.trim() || '',
//         hindi: data.translation?.hindi?.trim() || ''
//       },
//       author: data.author,
//       genre: data.genre,
//       language: language,
//       era: data.era || 'modern',
//       tags: data.tags || [],
//       mood: data.mood,
//       isPublished: data.isPublished || false,
//       isFeatured: data.isFeatured || false,
//       autoTransliterate: data.autoTransliterate !== false,
//       slug: data.slug || undefined
//     };
    
//     return api.post('/poems', cleanData);
//   },

//   // Update poem by SLUG with support for Hindi content
//   updatePoem: (slug, data) => {
//     if (!slug) {
//       return Promise.reject(new Error('Poem slug is required'));
//     }
    
//     // Validate content if being updated
//     const language = data.language;
    
//     if (language === 'hindi' && data.contentHindi !== undefined) {
//       if (data.contentHindi && !data.contentHindi.trim()) {
//         return Promise.reject(new Error('Hindi content cannot be empty'));
//       }
//     } else if (language === 'urdu' && data.contentUrdu !== undefined) {
//       if (data.contentUrdu && !data.contentUrdu.trim()) {
//         return Promise.reject(new Error('Urdu content cannot be empty'));
//       }
//     } else if (data.content !== undefined && !language) {
//       if (data.content && !data.content.trim()) {
//         return Promise.reject(new Error('Content cannot be empty'));
//       }
//     }
    
//     // Clean up data before sending
//     const cleanData = {};
    
//     // Only include fields that are being updated
//     if (data.title !== undefined) cleanData.title = data.title.trim();
//     if (data.content !== undefined) cleanData.content = data.content.trim();
//     if (data.contentUrdu !== undefined) cleanData.contentUrdu = data.contentUrdu.trim();
//     if (data.contentHindi !== undefined) cleanData.contentHindi = data.contentHindi.trim();
//     if (data.transliteration !== undefined) cleanData.transliteration = data.transliteration.trim();
//     if (data.translation !== undefined) {
//       cleanData.translation = {
//         english: data.translation.english?.trim() || '',
//         hindi: data.translation.hindi?.trim() || ''
//       };
//     }
//     if (data.author !== undefined) cleanData.author = data.author;
//     if (data.genre !== undefined) cleanData.genre = data.genre;
//     if (data.language !== undefined) cleanData.language = data.language;
//     if (data.era !== undefined) cleanData.era = data.era;
//     if (data.tags !== undefined) cleanData.tags = data.tags;
//     if (data.mood !== undefined) cleanData.mood = data.mood;
//     if (data.isPublished !== undefined) cleanData.isPublished = data.isPublished;
//     if (data.isFeatured !== undefined) cleanData.isFeatured = data.isFeatured;
//     if (data.autoTransliterate !== undefined) cleanData.autoTransliterate = data.autoTransliterate;
//     if (data.slug !== undefined) cleanData.slug = data.slug;
    
//     return api.put(`/poems/${slug}`, cleanData);
//   },

//   // Delete poem by SLUG
//   deletePoem: (slug) => {
//     if (!slug) {
//       return Promise.reject(new Error('Poem slug is required'));
//     }
//     return api.delete(`/poems/${slug}`);
//   },

//   // ============================================
//   // USER INTERACTION
//   // ============================================

//   // Like/unlike poem by SLUG
//   likePoem: (slug) => {
//     if (!slug) {
//       return Promise.reject(new Error('Poem slug is required'));
//     }
//     return api.post(`/poems/${slug}/like`);
//   },

//   // Bookmark/unbookmark poem by SLUG
//   bookmarkPoem: (slug) => {
//     if (!slug) {
//       return Promise.reject(new Error('Poem slug is required'));
//     }
//     return api.post(`/poems/${slug}/bookmark`);
//   },

//   // Add comment to poem by SLUG
//   addComment: (slug, text) => {
//     if (!slug) {
//       return Promise.reject(new Error('Poem slug is required'));
//     }
//     if (!text || !text.trim()) {
//       return Promise.reject(new Error('Comment text is required'));
//     }
//     return api.post(`/poems/${slug}/comment`, { text: text.trim() });
//   },

//   // ============================================
//   // UTILITY METHODS
//   // ============================================

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
//   reportPoem: (slug, reason) => {
//     if (!slug) {
//       return Promise.reject(new Error('Poem slug is required'));
//     }
//     if (!reason || !reason.trim()) {
//       return Promise.reject(new Error('Reason is required'));
//     }
//     return api.post(`/poems/${slug}/report`, { reason });
//   },

//   // ============================================
//   // BULK OPERATIONS
//   // ============================================

//   // Bulk publish poems
//   bulkPublish: (ids) => {
//     if (!ids || !Array.isArray(ids) || ids.length === 0) {
//       return Promise.reject(new Error('Poem IDs array is required'));
//     }
//     return api.post('/poems/bulk/publish', { ids });
//   },

//   // Bulk delete poems
//   bulkDelete: (ids) => {
//     if (!ids || !Array.isArray(ids) || ids.length === 0) {
//       return Promise.reject(new Error('Poem IDs array is required'));
//     }
//     return api.post('/poems/bulk/delete', { ids });
//   },

//   // ============================================
//   // EXPORT/IMPORT
//   // ============================================

//   // Export poems to JSON
//   exportPoems: (params = {}) => {
//     return api.get('/poems/export', { params, responseType: 'blob' });
//   },

//   // Import poems from JSON
//   importPoems: (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     return api.post('/poems/import', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });
//   }
// };

// export default poemAPI;



















// // client/src/api/poemAPI.js
// import api from './apiConfig';

// // Helper function for fallback analysis data
// const getFallbackAnalysisData = () => {
//   return {
//     themes: ['Poetry', 'Expression', 'Emotion', 'Reflection'],
//     tone: 'Expressive',
//     sentiment: 'neutral',
//     emotions: ['Thoughtful', 'Reflective', 'Imaginative'],
//     meaning: 'This poem expresses deep emotions through beautiful imagery and heartfelt words. It invites readers to reflect on its themes and find personal meaning.',
//     literaryDevices: ['Imagery', 'Metaphor', 'Rhythm', 'Symbolism'],
//     rhymeScheme: 'Free verse / Rhythmic pattern',
//     difficulty: 'intermediate',
//     provider: 'ZauqApp (Local Fallback)'
//   };
// };

// const poemAPI = {
//   // ============================================
//   // BASIC CRUD OPERATIONS
//   // ============================================

//   // Get poems with pagination and filters - FIXED search parameter
//   getPoems: async (params = {}) => {
//     try {
//       // Build query parameters properly
//       const queryParams = new URLSearchParams();
      
//       // Add pagination
//       if (params.page) queryParams.append('page', params.page);
//       if (params.limit) queryParams.append('limit', params.limit);
      
//       // Add filters
//       if (params.genre && params.genre !== 'all') queryParams.append('genre', params.genre);
//       if (params.language) queryParams.append('language', params.language);
//       if (params.era) queryParams.append('era', params.era);
//       if (params.author) queryParams.append('author', params.author);
//       if (params.mood) queryParams.append('mood', params.mood);
      
//       // IMPORTANT: Fix search parameter - ensure it's properly encoded
//       if (params.search && params.search.trim()) {
//         const searchTerm = params.search.trim();
//         console.log('🔍 API: Sending search query:', searchTerm);
//         queryParams.append('search', searchTerm);
//       }
      
//       // Add sorting
//       if (params.sort && params.sort !== 'popular') {
//         queryParams.append('sort', params.sort);
//       } else if (params.sort === 'popular') {
//         queryParams.append('sort', 'popular');
//       }
      
//       // Add order if specified
//       if (params.order) queryParams.append('order', params.order);
      
//       const url = `/poems?${queryParams.toString()}`;
//       console.log('📡 API Request URL:', url);
      
//       const response = await api.get(url);
//       console.log('📡 API Response:', response.data);
      
//       return response.data;
//     } catch (error) {
//       console.error('❌ Get poems error:', error.response?.data || error.message);
//       throw error;
//     }
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

//   // ============================================
//   // TRANSLITERATION FEATURES
//   // ============================================

//   // Get transliteration by slug (Public)
//   getTransliteration: async (slug) => {
//     if (!slug) {
//       return Promise.reject(new Error('Slug is required'));
//     }
    
//     try {
//       console.log('🔤 Fetching transliteration for slug:', slug);
//       const response = await api.get(`/transliteration/poem/${slug}`);
//       console.log('📦 Transliteration response:', response.data);
      
//       return {
//         success: response.data.success || false,
//         data: response.data.data || '',
//         fromCache: response.data.fromCache || false,
//         method: response.data.method || null,
//         language: response.data.language || null
//       };
//     } catch (error) {
//       console.error('❌ getTransliteration error:', error.response?.data || error.message);
//       return {
//         success: false,
//         data: '',
//         error: error.response?.data?.error || error.message || 'Failed to fetch transliteration'
//       };
//     }
//   },

//   // Generate transliteration for a poem (Admin only)
//   generateTransliteration: async (poemId) => {
//     if (!poemId) {
//       return Promise.reject(new Error('Poem ID is required'));
//     }
    
//     try {
//       console.log('🔤 Generating transliteration for poem ID:', poemId);
//       const response = await api.post(`/transliteration/poem/${poemId}`);
//       console.log('📦 Generate response:', response.data);
      
//       return {
//         success: response.data.success || false,
//         data: response.data.data || '',
//         method: response.data.method || null,
//         saved: response.data.saved || false
//       };
//     } catch (error) {
//       console.error('❌ generateTransliteration error:', error.response?.data || error.message);
//       return {
//         success: false,
//         data: '',
//         error: error.response?.data?.error || error.message || 'Failed to generate transliteration'
//       };
//     }
//   },

//   // Toggle auto-transliteration for a poem (Admin only)
//   toggleAutoTransliterate: async (poemId, enabled) => {
//     if (!poemId) {
//       return Promise.reject(new Error('Poem ID is required'));
//     }
    
//     if (enabled === undefined) {
//       return Promise.reject(new Error('Enabled flag is required'));
//     }
    
//     try {
//       console.log('⚙️ Toggling auto-transliteration for poem:', poemId, 'to', enabled);
//       const response = await api.patch(`/transliteration/poem/${poemId}/toggle-auto`, { enabled });
//       console.log('📦 Toggle response:', response.data);
      
//       return {
//         success: response.data.success || false,
//         autoTransliterate: response.data.autoTransliterate || false
//       };
//     } catch (error) {
//       console.error('❌ toggleAutoTransliterate error:', error.response?.data || error.message);
//       return {
//         success: false,
//         autoTransliterate: false,
//         error: error.response?.data?.error || error.message || 'Failed to toggle auto-transliteration'
//       };
//     }
//   },

//   // Auto-transliterate a poem (Admin only)
//   autoTransliteratePoem: async (poemId, force = false) => {
//     if (!poemId) {
//       return Promise.reject(new Error('Poem ID is required'));
//     }
    
//     try {
//       console.log('🔄 Auto-transliterating poem:', poemId, 'force:', force);
//       const response = await api.post(`/transliteration/poem/${poemId}/auto`, { force });
//       console.log('📦 Auto response:', response.data);
      
//       return {
//         success: response.data.success || false,
//         data: response.data.data || '',
//         method: response.data.method || null,
//         fromCache: response.data.fromCache || false,
//         skipped: response.data.skipped || false
//       };
//     } catch (error) {
//       console.error('❌ autoTransliteratePoem error:', error.response?.data || error.message);
//       return {
//         success: false,
//         data: '',
//         error: error.response?.data?.error || error.message || 'Failed to auto-transliterate poem'
//       };
//     }
//   },

//   // Batch generate transliterations (Admin only)
//   batchGenerateTransliterations: async (limit = 50, language = null) => {
//     try {
//       console.log('🔤 Batch generating transliterations (limit:', limit, 'language:', language || 'all)');
//       const response = await api.post('/transliteration/batch', { limit, language });
//       console.log('📦 Batch response:', response.data);
      
//       return {
//         success: response.data.success || false,
//         total: response.data.total || 0,
//         generated: response.data.generated || 0,
//         failed: response.data.failed || 0,
//         results: response.data.results || [],
//         message: response.data.message || ''
//       };
//     } catch (error) {
//       console.error('❌ batchGenerateTransliterations error:', error.response?.data || error.message);
//       return {
//         success: false,
//         total: 0,
//         generated: 0,
//         failed: 0,
//         results: [],
//         error: error.response?.data?.error || error.message || 'Failed to batch generate'
//       };
//     }
//   },

//   // Batch auto-transliterate poems (Admin only)
//   batchAutoTransliterate: async (limit = 100, language = null) => {
//     try {
//       console.log('🔄 Batch auto-transliterating (limit:', limit, 'language:', language || 'all)');
//       const response = await api.post('/transliteration/batch/auto', { limit, language });
//       console.log('📦 Batch auto response:', response.data);
      
//       return {
//         success: response.data.success || false,
//         total: response.data.total || 0,
//         generated: response.data.generated || 0,
//         failed: response.data.failed || 0,
//         skipped: response.data.skipped || 0,
//         results: response.data.results || [],
//         message: response.data.message || ''
//       };
//     } catch (error) {
//       console.error('❌ batchAutoTransliterate error:', error.response?.data || error.message);
//       return {
//         success: false,
//         total: 0,
//         generated: 0,
//         failed: 0,
//         skipped: 0,
//         results: [],
//         error: error.response?.data?.error || error.message || 'Failed to batch auto-transliterate'
//       };
//     }
//   },

//   // Get poems missing transliteration (Admin only)
//   getMissingTransliterations: async (limit = 50, language = null) => {
//     try {
//       console.log('🔍 Fetching poems missing transliteration (limit:', limit, 'language:', language || 'all)');
//       const params = { limit };
//       if (language) params.language = language;
      
//       const response = await api.get('/transliteration/missing', { params });
//       console.log('📦 Missing poems response:', response.data);
      
//       return {
//         success: response.data.success || false,
//         total: response.data.total || 0,
//         poems: response.data.poems || []
//       };
//     } catch (error) {
//       console.error('❌ getMissingTransliterations error:', error.response?.data || error.message);
//       return {
//         success: false,
//         total: 0,
//         poems: [],
//         error: error.response?.data?.error || error.message || 'Failed to fetch missing poems'
//       };
//     }
//   },

//   // Test transliteration (Admin only)
//   testTransliteration: async (text, language = 'urdu') => {
//     if (!text || !text.trim()) {
//       return Promise.reject(new Error('Text is required'));
//     }
    
//     try {
//       console.log('🔤 Testing transliteration for', language);
//       const response = await api.post('/transliteration/test', { text, language });
//       console.log('📦 Test response:', response.data);
      
//       return {
//         success: response.data.success || false,
//         original: response.data.original || text,
//         transliteration: response.data.transliteration || '',
//         method: response.data.method || null,
//         language: response.data.language || language
//       };
//     } catch (error) {
//       console.error('❌ testTransliteration error:', error.response?.data || error.message);
//       return {
//         success: false,
//         original: text,
//         transliteration: '',
//         error: error.response?.data?.error || error.message || 'Failed to test transliteration'
//       };
//     }
//   },

//   // Get transliteration status/stats (Admin only)
//   getTransliterationStatus: async () => {
//     try {
//       console.log('🔤 Fetching transliteration status');
//       const response = await api.get('/transliteration/status');
//       console.log('📦 Status response:', response.data);
      
//       return {
//         success: response.data.success || false,
//         stats: response.data.stats || null
//       };
//     } catch (error) {
//       console.error('❌ getTransliterationStatus error:', error.response?.data || error.message);
//       return {
//         success: false,
//         stats: null,
//         error: error.response?.data?.error || error.message || 'Failed to fetch status'
//       };
//     }
//   },

//   // Delete transliteration for a poem (Admin only)
//   deleteTransliteration: async (poemId) => {
//     if (!poemId) {
//       return Promise.reject(new Error('Poem ID is required'));
//     }
    
//     try {
//       console.log('🔤 Deleting transliteration for poem ID:', poemId);
//       const response = await api.delete(`/transliteration/poem/${poemId}`);
//       console.log('📦 Delete response:', response.data);
      
//       return {
//         success: response.data.success || false,
//         message: response.data.message || 'Transliteration deleted'
//       };
//     } catch (error) {
//       console.error('❌ deleteTransliteration error:', error.response?.data || error.message);
//       return {
//         success: false,
//         error: error.response?.data?.error || error.message || 'Failed to delete transliteration'
//       };
//     }
//   },

//   // ============================================
//   // AI & ANALYSIS FEATURES
//   // ============================================

//   // Get AI explanation by SLUG (existing)
//   getAIExplanation: (slug) => {
//     if (!slug) {
//       return Promise.reject(new Error('Slug is required'));
//     }
//     return api.get(`/poems/${slug}/ai-explanation`);
//   },

//   // Get sentiment analysis for a poem
//   getPoemSentiment: (slug) => {
//     if (!slug) {
//       return Promise.reject(new Error('Slug is required'));
//     }
//     return api.get(`/poems/${slug}/sentiment`);
//   },

//   // Get theme analysis for a poem
//   getPoemThemes: (slug) => {
//     if (!slug) {
//       return Promise.reject(new Error('Slug is required'));
//     }
//     return api.get(`/poems/${slug}/themes`);
//   },

//   // Get full AI analysis for a poem (literary analysis)
//   getAIAnalysis: async (slug) => {
//     if (!slug) {
//       return Promise.reject(new Error('Slug is required'));
//     }
    
//     try {
//       console.log('📡 Fetching AI analysis for slug:', slug);
//       const response = await api.get(`/poems/${slug}/ai-analysis`);
//       console.log('📡 AI Analysis response status:', response.status);
//       console.log('📡 AI Analysis response data:', response.data);
      
//       if (response.data && response.data.success === false) {
//         console.error('❌ API returned error:', response.data.error);
//         return {
//           success: false,
//           error: response.data.error || 'Failed to analyze poem'
//         };
//       }
      
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAIAnalysis error:', error.response?.data || error.message);
//       return {
//         success: false,
//         error: error.response?.data?.error || error.message || 'Failed to fetch AI analysis'
//       };
//     }
//   },

//   // ============================================
//   // Hugging Face Analysis with Fallback
//   // ============================================

//   getHuggingFaceAnalysis: async (poemId, forceRefresh = false) => {
//     if (!poemId) {
//       return Promise.reject(new Error('Poem ID is required'));
//     }
    
//     try {
//       console.log('🤗 Requesting Hugging Face analysis for poem:', poemId, 'forceRefresh:', forceRefresh);
//       const response = await api.post(`/analysis/analyze/${poemId}`, { forceRefresh });
//       console.log('📦 Hugging Face analysis response:', response.data);
      
//       if (response.data && response.data.success) {
//         return {
//           success: true,
//           data: response.data.data,
//           provider: response.data.provider,
//           modelUsed: response.data.modelUsed,
//           fallbackUsed: response.data.fallbackUsed || false,
//           cached: response.data.cached || false,
//           analyzedAt: response.data.analyzedAt
//         };
//       } else {
//         return {
//           success: false,
//           data: getFallbackAnalysisData(),
//           provider: 'fallback',
//           fallbackUsed: true,
//           error: response.data?.error || 'Analysis failed'
//         };
//       }
//     } catch (error) {
//       console.error('❌ Hugging Face analysis error:', error.response?.data || error.message);
//       return {
//         success: false,
//         data: getFallbackAnalysisData(),
//         provider: 'fallback',
//         fallbackUsed: true,
//         error: error.response?.data?.error || error.message || 'Failed to fetch analysis'
//       };
//     }
//   },

//   // Convenience method to get analysis by slug
//   getAnalysisBySlug: async (slug, forceRefresh = false) => {
//     if (!slug) {
//       return Promise.reject(new Error('Slug is required'));
//     }
    
//     try {
//       const poemResponse = await api.get(`/poems/${slug}`);
//       const poem = poemResponse.data?.data || poemResponse.data;
      
//       if (!poem || !poem._id) {
//         throw new Error('Poem not found or missing ID');
//       }
      
//       return await poemAPI.getHuggingFaceAnalysis(poem._id, forceRefresh);
//     } catch (error) {
//       console.error('❌ getAnalysisBySlug error:', error);
//       return {
//         success: false,
//         data: getFallbackAnalysisData(),
//         provider: 'fallback',
//         fallbackUsed: true,
//         error: error.message || 'Failed to fetch analysis'
//       };
//     }
//   },

//   // Health check for Hugging Face service
//   checkHuggingFaceHealth: async () => {
//     try {
//       const response = await api.get('/analysis/health');
//       return response.data;
//     } catch (error) {
//       console.error('Health check failed:', error);
//       return { status: 'error', huggingface: { configured: false } };
//     }
//   },

//   // Analyze poem content directly
//   analyzePoemContent: (data) => {
//     if (!data.poemText || !data.poemText.trim()) {
//       return Promise.reject(new Error('Poem text is required'));
//     }
//     return api.post('/poems/analyze-content', data);
//   },

//   // Get batch sentiment for multiple poems
//   batchGetSentiment: (ids) => {
//     if (!ids || !Array.isArray(ids) || ids.length === 0) {
//       return Promise.reject(new Error('Poem IDs array is required'));
//     }
//     return api.post('/poems/sentiment/batch', { ids });
//   },

//   // Get batch themes for multiple poems
//   batchGetThemes: (ids) => {
//     if (!ids || !Array.isArray(ids) || ids.length === 0) {
//       return Promise.reject(new Error('Poem IDs array is required'));
//     }
//     return api.post('/poems/themes/batch', { ids });
//   },

//   // ============================================
//   // ADMIN CRUD OPERATIONS (UPDATED FOR HINDI)
//   // ============================================

//   // Create new poem with support for Hindi content
//   createPoem: (data) => {
//     // Validate title
//     if (!data.title || !data.title.trim()) {
//       return Promise.reject(new Error('Title is required'));
//     }
    
//     // Validate content based on language
//     const language = data.language || 'urdu';
    
//     if (language === 'hindi') {
//       if (!data.contentHindi || !data.contentHindi.trim()) {
//         return Promise.reject(new Error('Hindi content is required for Hindi poems'));
//       }
//       // Ensure content is set for API compatibility
//       data.content = data.contentHindi;
//     } else if (language === 'urdu') {
//       if (!data.contentUrdu && !data.content) {
//         return Promise.reject(new Error('Urdu content is required for Urdu poems'));
//       }
//       if (data.contentUrdu) {
//         data.content = data.contentUrdu;
//       }
//     } else {
//       if (!data.content || !data.content.trim()) {
//         return Promise.reject(new Error('Content is required'));
//       }
//     }
    
//     // Validate author
//     if (!data.author) {
//       return Promise.reject(new Error('Author is required'));
//     }
    
//     // Validate genre
//     if (!data.genre) {
//       return Promise.reject(new Error('Genre is required'));
//     }
    
//     // Clean up data before sending
//     const cleanData = {
//       title: data.title.trim(),
//       content: data.content?.trim() || '',
//       contentUrdu: data.contentUrdu?.trim() || (language === 'urdu' ? data.content?.trim() : ''),
//       contentHindi: data.contentHindi?.trim() || (language === 'hindi' ? data.content?.trim() : ''),
//       transliteration: data.transliteration?.trim() || '',
//       translation: {
//         english: data.translation?.english?.trim() || '',
//         hindi: data.translation?.hindi?.trim() || ''
//       },
//       author: data.author,
//       genre: data.genre,
//       language: language,
//       era: data.era || 'modern',
//       tags: data.tags || [],
//       mood: data.mood,
//       isPublished: data.isPublished || false,
//       isFeatured: data.isFeatured || false,
//       autoTransliterate: data.autoTransliterate !== false,
//       slug: data.slug || undefined
//     };
    
//     return api.post('/poems', cleanData);
//   },

//   // Update poem by SLUG with support for Hindi content
//   updatePoem: (slug, data) => {
//     if (!slug) {
//       return Promise.reject(new Error('Poem slug is required'));
//     }
    
//     // Validate content if being updated
//     const language = data.language;
    
//     if (language === 'hindi' && data.contentHindi !== undefined) {
//       if (data.contentHindi && !data.contentHindi.trim()) {
//         return Promise.reject(new Error('Hindi content cannot be empty'));
//       }
//     } else if (language === 'urdu' && data.contentUrdu !== undefined) {
//       if (data.contentUrdu && !data.contentUrdu.trim()) {
//         return Promise.reject(new Error('Urdu content cannot be empty'));
//       }
//     } else if (data.content !== undefined && !language) {
//       if (data.content && !data.content.trim()) {
//         return Promise.reject(new Error('Content cannot be empty'));
//       }
//     }
    
//     // Clean up data before sending
//     const cleanData = {};
    
//     // Only include fields that are being updated
//     if (data.title !== undefined) cleanData.title = data.title.trim();
//     if (data.content !== undefined) cleanData.content = data.content.trim();
//     if (data.contentUrdu !== undefined) cleanData.contentUrdu = data.contentUrdu.trim();
//     if (data.contentHindi !== undefined) cleanData.contentHindi = data.contentHindi.trim();
//     if (data.transliteration !== undefined) cleanData.transliteration = data.transliteration.trim();
//     if (data.translation !== undefined) {
//       cleanData.translation = {
//         english: data.translation.english?.trim() || '',
//         hindi: data.translation.hindi?.trim() || ''
//       };
//     }
//     if (data.author !== undefined) cleanData.author = data.author;
//     if (data.genre !== undefined) cleanData.genre = data.genre;
//     if (data.language !== undefined) cleanData.language = data.language;
//     if (data.era !== undefined) cleanData.era = data.era;
//     if (data.tags !== undefined) cleanData.tags = data.tags;
//     if (data.mood !== undefined) cleanData.mood = data.mood;
//     if (data.isPublished !== undefined) cleanData.isPublished = data.isPublished;
//     if (data.isFeatured !== undefined) cleanData.isFeatured = data.isFeatured;
//     if (data.autoTransliterate !== undefined) cleanData.autoTransliterate = data.autoTransliterate;
//     if (data.slug !== undefined) cleanData.slug = data.slug;
    
//     return api.put(`/poems/${slug}`, cleanData);
//   },

//   // Delete poem by SLUG
//   deletePoem: (slug) => {
//     if (!slug) {
//       return Promise.reject(new Error('Poem slug is required'));
//     }
//     return api.delete(`/poems/${slug}`);
//   },

//   // ============================================
//   // USER INTERACTION
//   // ============================================

//   // Like/unlike poem by SLUG
//   likePoem: (slug) => {
//     if (!slug) {
//       return Promise.reject(new Error('Poem slug is required'));
//     }
//     return api.post(`/poems/${slug}/like`);
//   },

//   // Bookmark/unbookmark poem by SLUG
//   bookmarkPoem: (slug) => {
//     if (!slug) {
//       return Promise.reject(new Error('Poem slug is required'));
//     }
//     return api.post(`/poems/${slug}/bookmark`);
//   },

//   // Add comment to poem by SLUG
//   addComment: (slug, text) => {
//     if (!slug) {
//       return Promise.reject(new Error('Poem slug is required'));
//     }
//     if (!text || !text.trim()) {
//       return Promise.reject(new Error('Comment text is required'));
//     }
//     return api.post(`/poems/${slug}/comment`, { text: text.trim() });
//   },

//   // ============================================
//   // UTILITY METHODS
//   // ============================================

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
//   reportPoem: (slug, reason) => {
//     if (!slug) {
//       return Promise.reject(new Error('Poem slug is required'));
//     }
//     if (!reason || !reason.trim()) {
//       return Promise.reject(new Error('Reason is required'));
//     }
//     return api.post(`/poems/${slug}/report`, { reason });
//   },

//   // ============================================
//   // BULK OPERATIONS
//   // ============================================

//   // Bulk publish poems
//   bulkPublish: (ids) => {
//     if (!ids || !Array.isArray(ids) || ids.length === 0) {
//       return Promise.reject(new Error('Poem IDs array is required'));
//     }
//     return api.post('/poems/bulk/publish', { ids });
//   },

//   // Bulk delete poems
//   bulkDelete: (ids) => {
//     if (!ids || !Array.isArray(ids) || ids.length === 0) {
//       return Promise.reject(new Error('Poem IDs array is required'));
//     }
//     return api.post('/poems/bulk/delete', { ids });
//   },

//   // ============================================
//   // EXPORT/IMPORT
//   // ============================================

//   // Export poems to JSON
//   exportPoems: (params = {}) => {
//     return api.get('/poems/export', { params, responseType: 'blob' });
//   },

//   // Import poems from JSON
//   importPoems: (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     return api.post('/poems/import', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });
//   }
// };

// export default poemAPI;











// client/src/api/poemAPI.js
import api from './apiConfig';

// Helper function for fallback analysis data
const getFallbackAnalysisData = () => {
  return {
    themes: ['Poetry', 'Expression', 'Emotion', 'Reflection'],
    tone: 'Expressive',
    sentiment: 'neutral',
    emotions: ['Thoughtful', 'Reflective', 'Imaginative'],
    meaning: 'This poem expresses deep emotions through beautiful imagery and heartfelt words. It invites readers to reflect on its themes and find personal meaning.',
    literaryDevices: ['Imagery', 'Metaphor', 'Rhythm', 'Symbolism'],
    rhymeScheme: 'Free verse / Rhythmic pattern',
    difficulty: 'intermediate',
    provider: 'ZauqApp (Local Fallback)'
  };
};

const poemAPI = {
  // ============================================
  // BASIC CRUD OPERATIONS
  // ============================================

  // Get poems with pagination and filters - FIXED response parsing
  getPoems: async (params = {}) => {
    try {
      // Build query parameters properly
      const queryParams = new URLSearchParams();
      
      // Add pagination
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      
      // Add filters
      if (params.genre && params.genre !== 'all') queryParams.append('genre', params.genre);
      if (params.language && params.language !== 'all') queryParams.append('language', params.language);
      if (params.era) queryParams.append('era', params.era);
      if (params.author) queryParams.append('author', params.author);
      if (params.mood) queryParams.append('mood', params.mood);
      
      // IMPORTANT: Fix search parameter - ensure it's properly encoded
      if (params.search && params.search.trim()) {
        const searchTerm = params.search.trim();
        console.log('🔍 API: Sending search query:', searchTerm);
        queryParams.append('search', searchTerm);
      }
      
      // Add sorting
      if (params.sort && params.sort !== 'popular') {
        queryParams.append('sort', params.sort);
      } else if (params.sort === 'popular') {
        queryParams.append('sort', 'popular');
      }
      
      // Add order if specified
      if (params.order) queryParams.append('order', params.order);
      
      const url = `/poems?${queryParams.toString()}`;
      console.log('📡 API Request URL:', url);
      
      const response = await api.get(url);
      console.log('📡 API Response:', response.data);
      
      // FIXED: Ensure consistent response format
      // Backend returns: { success: true, data: [...], pagination: {...} }
      if (response.data && response.data.success) {
        return {
          success: true,
          data: response.data.data || [],
          pagination: response.data.pagination || {
            page: parseInt(params.page) || 1,
            limit: parseInt(params.limit) || 10,
            total: (response.data.data || []).length,
            totalPages: Math.ceil(((response.data.data || []).length) / (parseInt(params.limit) || 10))
          }
        };
      }
      
      // Fallback: return as is
      return response.data;
    } catch (error) {
      console.error('❌ Get poems error:', error.response?.data || error.message);
      throw error;
    }
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
  // BULK OPERATIONS
  // ============================================

  // Bulk upload poems (Admin only)
  bulkUploadPoems: async (poems) => {
    if (!poems || !Array.isArray(poems) || poems.length === 0) {
      return Promise.reject(new Error('Poems array is required'));
    }
    
    try {
      console.log('📦 Bulk uploading poems:', poems.length);
      const response = await api.post('/poems/bulk/upload', { poems });
      console.log('📦 Bulk upload response:', response.data);
      
      return {
        success: response.data.success || false,
        uploaded: response.data.uploaded || 0,
        failed: response.data.failed || 0,
        errors: response.data.errors || [],
        message: response.data.message || 'Upload completed'
      };
    } catch (error) {
      console.error('❌ Bulk upload error:', error.response?.data || error.message);
      return {
        success: false,
        uploaded: 0,
        failed: poems.length,
        errors: [error.response?.data?.error || error.message || 'Failed to upload poems'],
        message: error.response?.data?.message || 'Upload failed'
      };
    }
  },

  // Bulk delete poems (Admin only)
  bulkDeletePoems: async (poemIds) => {
    if (!poemIds || !Array.isArray(poemIds) || poemIds.length === 0) {
      return Promise.reject(new Error('Poem IDs array is required'));
    }
    
    try {
      console.log('🗑️ Bulk deleting poems:', poemIds.length);
      const response = await api.delete('/poems/bulk', { data: { ids: poemIds } });
      console.log('📦 Bulk delete response:', response.data);
      
      return {
        success: response.data.success || false,
        deleted: response.data.deleted || 0,
        message: response.data.message || 'Deletion completed'
      };
    } catch (error) {
      console.error('❌ Bulk delete error:', error.response?.data || error.message);
      return {
        success: false,
        deleted: 0,
        error: error.response?.data?.error || error.message || 'Failed to delete poems'
      };
    }
  },

  // Bulk publish/unpublish poems (Admin only)
  bulkPublishPoems: async (poemIds, publish = true) => {
    if (!poemIds || !Array.isArray(poemIds) || poemIds.length === 0) {
      return Promise.reject(new Error('Poem IDs array is required'));
    }
    
    try {
      console.log('📢 Bulk publishing poems:', poemIds.length, 'publish:', publish);
      const response = await api.put('/poems/bulk/publish', { ids: poemIds, publish });
      console.log('📦 Bulk publish response:', response.data);
      
      return {
        success: response.data.success || false,
        updated: response.data.updated || 0,
        message: response.data.message || `${poemIds.length} poem(s) ${publish ? 'published' : 'unpublished'}`
      };
    } catch (error) {
      console.error('❌ Bulk publish error:', error.response?.data || error.message);
      return {
        success: false,
        updated: 0,
        error: error.response?.data?.error || error.message || 'Failed to update poems'
      };
    }
  },

  // Bulk generate transliterations (Admin only)
  bulkGenerateTransliterations: async (poemIds, force = false) => {
    if (!poemIds || !Array.isArray(poemIds) || poemIds.length === 0) {
      return Promise.reject(new Error('Poem IDs array is required'));
    }
    
    try {
      console.log('🔤 Bulk generating transliterations:', poemIds.length);
      const response = await api.post('/poems/bulk/transliterate', { ids: poemIds, force });
      console.log('📦 Bulk transliteration response:', response.data);
      
      return {
        success: response.data.success || false,
        generated: response.data.generated || 0,
        failed: response.data.failed || 0,
        results: response.data.results || []
      };
    } catch (error) {
      console.error('❌ Bulk transliteration error:', error.response?.data || error.message);
      return {
        success: false,
        generated: 0,
        failed: poemIds.length,
        error: error.response?.data?.error || error.message || 'Failed to generate transliterations'
      };
    }
  },

  // ============================================
  // TRANSLITERATION FEATURES
  // ============================================

  // Get transliteration by slug (Public)
  getTransliteration: async (slug) => {
    if (!slug) {
      return Promise.reject(new Error('Slug is required'));
    }
    
    try {
      console.log('🔤 Fetching transliteration for slug:', slug);
      const response = await api.get(`/transliteration/poem/${slug}`);
      console.log('📦 Transliteration response:', response.data);
      
      return {
        success: response.data.success || false,
        data: response.data.data || '',
        fromCache: response.data.fromCache || false,
        method: response.data.method || null,
        language: response.data.language || null
      };
    } catch (error) {
      console.error('❌ getTransliteration error:', error.response?.data || error.message);
      return {
        success: false,
        data: '',
        error: error.response?.data?.error || error.message || 'Failed to fetch transliteration'
      };
    }
  },

  // Generate transliteration for a poem (Admin only)
  generateTransliteration: async (poemId) => {
    if (!poemId) {
      return Promise.reject(new Error('Poem ID is required'));
    }
    
    try {
      console.log('🔤 Generating transliteration for poem ID:', poemId);
      const response = await api.post(`/transliteration/poem/${poemId}`);
      console.log('📦 Generate response:', response.data);
      
      return {
        success: response.data.success || false,
        data: response.data.data || '',
        method: response.data.method || null,
        saved: response.data.saved || false
      };
    } catch (error) {
      console.error('❌ generateTransliteration error:', error.response?.data || error.message);
      return {
        success: false,
        data: '',
        error: error.response?.data?.error || error.message || 'Failed to generate transliteration'
      };
    }
  },

  // Toggle auto-transliteration for a poem (Admin only)
  toggleAutoTransliterate: async (poemId, enabled) => {
    if (!poemId) {
      return Promise.reject(new Error('Poem ID is required'));
    }
    
    if (enabled === undefined) {
      return Promise.reject(new Error('Enabled flag is required'));
    }
    
    try {
      console.log('⚙️ Toggling auto-transliteration for poem:', poemId, 'to', enabled);
      const response = await api.patch(`/transliteration/poem/${poemId}/toggle-auto`, { enabled });
      console.log('📦 Toggle response:', response.data);
      
      return {
        success: response.data.success || false,
        autoTransliterate: response.data.autoTransliterate || false
      };
    } catch (error) {
      console.error('❌ toggleAutoTransliterate error:', error.response?.data || error.message);
      return {
        success: false,
        autoTransliterate: false,
        error: error.response?.data?.error || error.message || 'Failed to toggle auto-transliteration'
      };
    }
  },

  // Auto-transliterate a poem (Admin only)
  autoTransliteratePoem: async (poemId, force = false) => {
    if (!poemId) {
      return Promise.reject(new Error('Poem ID is required'));
    }
    
    try {
      console.log('🔄 Auto-transliterating poem:', poemId, 'force:', force);
      const response = await api.post(`/transliteration/poem/${poemId}/auto`, { force });
      console.log('📦 Auto response:', response.data);
      
      return {
        success: response.data.success || false,
        data: response.data.data || '',
        method: response.data.method || null,
        fromCache: response.data.fromCache || false,
        skipped: response.data.skipped || false
      };
    } catch (error) {
      console.error('❌ autoTransliteratePoem error:', error.response?.data || error.message);
      return {
        success: false,
        data: '',
        error: error.response?.data?.error || error.message || 'Failed to auto-transliterate poem'
      };
    }
  },

  // Batch generate transliterations (Admin only)
  batchGenerateTransliterations: async (limit = 50, language = null) => {
    try {
      console.log('🔤 Batch generating transliterations (limit:', limit, 'language:', language || 'all)');
      const response = await api.post('/transliteration/batch', { limit, language });
      console.log('📦 Batch response:', response.data);
      
      return {
        success: response.data.success || false,
        total: response.data.total || 0,
        generated: response.data.generated || 0,
        failed: response.data.failed || 0,
        results: response.data.results || [],
        message: response.data.message || ''
      };
    } catch (error) {
      console.error('❌ batchGenerateTransliterations error:', error.response?.data || error.message);
      return {
        success: false,
        total: 0,
        generated: 0,
        failed: 0,
        results: [],
        error: error.response?.data?.error || error.message || 'Failed to batch generate'
      };
    }
  },

  // Batch auto-transliterate poems (Admin only)
  batchAutoTransliterate: async (limit = 100, language = null) => {
    try {
      console.log('🔄 Batch auto-transliterating (limit:', limit, 'language:', language || 'all)');
      const response = await api.post('/transliteration/batch/auto', { limit, language });
      console.log('📦 Batch auto response:', response.data);
      
      return {
        success: response.data.success || false,
        total: response.data.total || 0,
        generated: response.data.generated || 0,
        failed: response.data.failed || 0,
        skipped: response.data.skipped || 0,
        results: response.data.results || [],
        message: response.data.message || ''
      };
    } catch (error) {
      console.error('❌ batchAutoTransliterate error:', error.response?.data || error.message);
      return {
        success: false,
        total: 0,
        generated: 0,
        failed: 0,
        skipped: 0,
        results: [],
        error: error.response?.data?.error || error.message || 'Failed to batch auto-transliterate'
      };
    }
  },

  // Get poems missing transliteration (Admin only)
  getMissingTransliterations: async (limit = 50, language = null) => {
    try {
      console.log('🔍 Fetching poems missing transliteration (limit:', limit, 'language:', language || 'all)');
      const params = { limit };
      if (language) params.language = language;
      
      const response = await api.get('/transliteration/missing', { params });
      console.log('📦 Missing poems response:', response.data);
      
      return {
        success: response.data.success || false,
        total: response.data.total || 0,
        poems: response.data.poems || []
      };
    } catch (error) {
      console.error('❌ getMissingTransliterations error:', error.response?.data || error.message);
      return {
        success: false,
        total: 0,
        poems: [],
        error: error.response?.data?.error || error.message || 'Failed to fetch missing poems'
      };
    }
  },

  // Test transliteration (Admin only)
  testTransliteration: async (text, language = 'urdu') => {
    if (!text || !text.trim()) {
      return Promise.reject(new Error('Text is required'));
    }
    
    try {
      console.log('🔤 Testing transliteration for', language);
      const response = await api.post('/transliteration/test', { text, language });
      console.log('📦 Test response:', response.data);
      
      return {
        success: response.data.success || false,
        original: response.data.original || text,
        transliteration: response.data.transliteration || '',
        method: response.data.method || null,
        language: response.data.language || language
      };
    } catch (error) {
      console.error('❌ testTransliteration error:', error.response?.data || error.message);
      return {
        success: false,
        original: text,
        transliteration: '',
        error: error.response?.data?.error || error.message || 'Failed to test transliteration'
      };
    }
  },

  // Get transliteration status/stats (Admin only)
  getTransliterationStatus: async () => {
    try {
      console.log('🔤 Fetching transliteration status');
      const response = await api.get('/transliteration/status');
      console.log('📦 Status response:', response.data);
      
      return {
        success: response.data.success || false,
        stats: response.data.stats || null
      };
    } catch (error) {
      console.error('❌ getTransliterationStatus error:', error.response?.data || error.message);
      return {
        success: false,
        stats: null,
        error: error.response?.data?.error || error.message || 'Failed to fetch status'
      };
    }
  },

  // Delete transliteration for a poem (Admin only)
  deleteTransliteration: async (poemId) => {
    if (!poemId) {
      return Promise.reject(new Error('Poem ID is required'));
    }
    
    try {
      console.log('🔤 Deleting transliteration for poem ID:', poemId);
      const response = await api.delete(`/transliteration/poem/${poemId}`);
      console.log('📦 Delete response:', response.data);
      
      return {
        success: response.data.success || false,
        message: response.data.message || 'Transliteration deleted'
      };
    } catch (error) {
      console.error('❌ deleteTransliteration error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to delete transliteration'
      };
    }
  },

  // ============================================
  // AI & ANALYSIS FEATURES
  // ============================================

  // Get AI explanation by SLUG (existing)
  getAIExplanation: (slug) => {
    if (!slug) {
      return Promise.reject(new Error('Slug is required'));
    }
    return api.get(`/poems/${slug}/ai-explanation`);
  },

  // Get sentiment analysis for a poem
  getPoemSentiment: (slug) => {
    if (!slug) {
      return Promise.reject(new Error('Slug is required'));
    }
    return api.get(`/poems/${slug}/sentiment`);
  },

  // Get theme analysis for a poem
  getPoemThemes: (slug) => {
    if (!slug) {
      return Promise.reject(new Error('Slug is required'));
    }
    return api.get(`/poems/${slug}/themes`);
  },

  // Get full AI analysis for a poem (literary analysis)
  getAIAnalysis: async (slug) => {
    if (!slug) {
      return Promise.reject(new Error('Slug is required'));
    }
    
    try {
      console.log('📡 Fetching AI analysis for slug:', slug);
      const response = await api.get(`/poems/${slug}/ai-analysis`);
      console.log('📡 AI Analysis response status:', response.status);
      console.log('📡 AI Analysis response data:', response.data);
      
      if (response.data && response.data.success === false) {
        console.error('❌ API returned error:', response.data.error);
        return {
          success: false,
          error: response.data.error || 'Failed to analyze poem'
        };
      }
      
      return response.data;
    } catch (error) {
      console.error('❌ getAIAnalysis error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to fetch AI analysis'
      };
    }
  },

  // ============================================
  // Hugging Face Analysis with Fallback
  // ============================================

  getHuggingFaceAnalysis: async (poemId, forceRefresh = false) => {
    if (!poemId) {
      return Promise.reject(new Error('Poem ID is required'));
    }
    
    try {
      console.log('🤗 Requesting Hugging Face analysis for poem:', poemId, 'forceRefresh:', forceRefresh);
      const response = await api.post(`/analysis/analyze/${poemId}`, { forceRefresh });
      console.log('📦 Hugging Face analysis response:', response.data);
      
      if (response.data && response.data.success) {
        return {
          success: true,
          data: response.data.data,
          provider: response.data.provider,
          modelUsed: response.data.modelUsed,
          fallbackUsed: response.data.fallbackUsed || false,
          cached: response.data.cached || false,
          analyzedAt: response.data.analyzedAt
        };
      } else {
        return {
          success: false,
          data: getFallbackAnalysisData(),
          provider: 'fallback',
          fallbackUsed: true,
          error: response.data?.error || 'Analysis failed'
        };
      }
    } catch (error) {
      console.error('❌ Hugging Face analysis error:', error.response?.data || error.message);
      return {
        success: false,
        data: getFallbackAnalysisData(),
        provider: 'fallback',
        fallbackUsed: true,
        error: error.response?.data?.error || error.message || 'Failed to fetch analysis'
      };
    }
  },

  // Convenience method to get analysis by slug
  getAnalysisBySlug: async (slug, forceRefresh = false) => {
    if (!slug) {
      return Promise.reject(new Error('Slug is required'));
    }
    
    try {
      const poemResponse = await api.get(`/poems/${slug}`);
      const poem = poemResponse.data?.data || poemResponse.data;
      
      if (!poem || !poem._id) {
        throw new Error('Poem not found or missing ID');
      }
      
      return await poemAPI.getHuggingFaceAnalysis(poem._id, forceRefresh);
    } catch (error) {
      console.error('❌ getAnalysisBySlug error:', error);
      return {
        success: false,
        data: getFallbackAnalysisData(),
        provider: 'fallback',
        fallbackUsed: true,
        error: error.message || 'Failed to fetch analysis'
      };
    }
  },

  // Health check for Hugging Face service
  checkHuggingFaceHealth: async () => {
    try {
      const response = await api.get('/analysis/health');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      return { status: 'error', huggingface: { configured: false } };
    }
  },

  // Analyze poem content directly
  analyzePoemContent: (data) => {
    if (!data.poemText || !data.poemText.trim()) {
      return Promise.reject(new Error('Poem text is required'));
    }
    return api.post('/poems/analyze-content', data);
  },

  // Get batch sentiment for multiple poems
  batchGetSentiment: (ids) => {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return Promise.reject(new Error('Poem IDs array is required'));
    }
    return api.post('/poems/sentiment/batch', { ids });
  },

  // Get batch themes for multiple poems
  batchGetThemes: (ids) => {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return Promise.reject(new Error('Poem IDs array is required'));
    }
    return api.post('/poems/themes/batch', { ids });
  },

  // ============================================
  // ADMIN CRUD OPERATIONS (UPDATED FOR HINDI)
  // ============================================

  // Create new poem with support for Hindi content
  createPoem: (data) => {
    // Validate title
    if (!data.title || !data.title.trim()) {
      return Promise.reject(new Error('Title is required'));
    }
    
    // Validate content based on language
    const language = data.language || 'urdu';
    
    if (language === 'hindi') {
      if (!data.contentHindi || !data.contentHindi.trim()) {
        return Promise.reject(new Error('Hindi content is required for Hindi poems'));
      }
      // Ensure content is set for API compatibility
      data.content = data.contentHindi;
    } else if (language === 'urdu') {
      if (!data.contentUrdu && !data.content) {
        return Promise.reject(new Error('Urdu content is required for Urdu poems'));
      }
      if (data.contentUrdu) {
        data.content = data.contentUrdu;
      }
    } else {
      if (!data.content || !data.content.trim()) {
        return Promise.reject(new Error('Content is required'));
      }
    }
    
    // Validate author
    if (!data.author) {
      return Promise.reject(new Error('Author is required'));
    }
    
    // Validate genre
    if (!data.genre) {
      return Promise.reject(new Error('Genre is required'));
    }
    
    // Clean up data before sending
    const cleanData = {
      title: data.title.trim(),
      content: data.content?.trim() || '',
      contentUrdu: data.contentUrdu?.trim() || (language === 'urdu' ? data.content?.trim() : ''),
      contentHindi: data.contentHindi?.trim() || (language === 'hindi' ? data.content?.trim() : ''),
      transliteration: data.transliteration?.trim() || '',
      translation: {
        english: data.translation?.english?.trim() || '',
        hindi: data.translation?.hindi?.trim() || ''
      },
      author: data.author,
      genre: data.genre,
      language: language,
      era: data.era || 'modern',
      tags: data.tags || [],
      mood: data.mood,
      isPublished: data.isPublished || false,
      isFeatured: data.isFeatured || false,
      autoTransliterate: data.autoTransliterate !== false,
      slug: data.slug || undefined
    };
    
    return api.post('/poems', cleanData);
  },

  // Update poem by SLUG with support for Hindi content
  updatePoem: (slug, data) => {
    if (!slug) {
      return Promise.reject(new Error('Poem slug is required'));
    }
    
    // Validate content if being updated
    const language = data.language;
    
    if (language === 'hindi' && data.contentHindi !== undefined) {
      if (data.contentHindi && !data.contentHindi.trim()) {
        return Promise.reject(new Error('Hindi content cannot be empty'));
      }
    } else if (language === 'urdu' && data.contentUrdu !== undefined) {
      if (data.contentUrdu && !data.contentUrdu.trim()) {
        return Promise.reject(new Error('Urdu content cannot be empty'));
      }
    } else if (data.content !== undefined && !language) {
      if (data.content && !data.content.trim()) {
        return Promise.reject(new Error('Content cannot be empty'));
      }
    }
    
    // Clean up data before sending
    const cleanData = {};
    
    // Only include fields that are being updated
    if (data.title !== undefined) cleanData.title = data.title.trim();
    if (data.content !== undefined) cleanData.content = data.content.trim();
    if (data.contentUrdu !== undefined) cleanData.contentUrdu = data.contentUrdu.trim();
    if (data.contentHindi !== undefined) cleanData.contentHindi = data.contentHindi.trim();
    if (data.transliteration !== undefined) cleanData.transliteration = data.transliteration.trim();
    if (data.translation !== undefined) {
      cleanData.translation = {
        english: data.translation.english?.trim() || '',
        hindi: data.translation.hindi?.trim() || ''
      };
    }
    if (data.author !== undefined) cleanData.author = data.author;
    if (data.genre !== undefined) cleanData.genre = data.genre;
    if (data.language !== undefined) cleanData.language = data.language;
    if (data.era !== undefined) cleanData.era = data.era;
    if (data.tags !== undefined) cleanData.tags = data.tags;
    if (data.mood !== undefined) cleanData.mood = data.mood;
    if (data.isPublished !== undefined) cleanData.isPublished = data.isPublished;
    if (data.isFeatured !== undefined) cleanData.isFeatured = data.isFeatured;
    if (data.autoTransliterate !== undefined) cleanData.autoTransliterate = data.autoTransliterate;
    if (data.slug !== undefined) cleanData.slug = data.slug;
    
    return api.put(`/poems/${slug}`, cleanData);
  },

  // Delete poem by SLUG
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