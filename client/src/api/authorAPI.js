// //client/src/api/authorAPI.js

// import api from './apiConfig';

// const authorAPI = {
//   // ============================================
//   // BASIC CRUD OPERATIONS
//   // ============================================
  
//   // Get all authors with pagination and filters
//   getAuthors: (params) => api.get('/authors', { params }).then(res => res.data),
  
//   // Get single author by slug
//   getAuthor: (slug) => api.get(`/authors/${slug}`).then(res => res.data),
  
//   // Create new author (admin only)
//   createAuthor: (data) => api.post('/authors', data).then(res => res.data),
  
//   // Update author (admin only)
//   updateAuthor: (id, data) => api.put(`/authors/${id}`, data).then(res => res.data),
  
//   // Delete author (admin only)
//   deleteAuthor: (id) => api.delete(`/authors/${id}`).then(res => res.data),
  
//   // ============================================
//   // AUTHOR CONTENT - USING SLUG (not authorId)
//   // ============================================
  
//   // Get author's poems by slug
//   getAuthorPoems: (slug, params) => api.get(`/authors/${slug}/poems`, { params }).then(res => res.data),
  
//   // Get author's books by slug
//   getAuthorBooks: (slug, params) => api.get(`/authors/${slug}/books`, { params }).then(res => res.data),
  
//   // Get author's audio by slug
//   getAuthorAudio: (slug, params) => api.get(`/authors/${slug}/audio`, { params }).then(res => res.data),
  
//   // Get author's videos by slug
//   getAuthorVideos: (slug, params) => api.get(`/authors/${slug}/videos`, { params }).then(res => res.data),
  
//   // ============================================
//   // STATS & LISTS - USING SLUG
//   // ============================================
  
//   // Get author statistics by slug
//   getAuthorStats: (slug) => api.get(`/authors/${slug}/stats`).then(res => res.data),
  
//   // Get trending authors (most viewed/followed)
//   getTrendingAuthors: () => api.get('/authors/trending').then(res => res.data),
  
//   // Get featured authors
//   getFeaturedAuthors: () => api.get('/authors/featured').then(res => res.data),
  
//   // Search authors by name or bio
//   searchAuthors: (query, params) => api.get('/authors/search', { params: { q: query, ...params } }).then(res => res.data),
  
//   // ============================================
//   // TIMELINE MANAGEMENT - USING SLUG FOR GET
//   // ============================================
  
//   // Get author's timeline events by slug
//   getAuthorTimeline: (slug) => api.get(`/authors/${slug}/timeline`).then(res => res.data),
  
//   // Add timeline entry (admin only - using ID)
//   addToTimeline: (authorId, data) => api.post(`/authors/${authorId}/timeline`, data).then(res => res.data),
  
//   // Update timeline entry (admin only - using ID)
//   updateTimelineEntry: (authorId, timelineId, data) => api.put(`/authors/${authorId}/timeline/${timelineId}`, data).then(res => res.data),
  
//   // Remove timeline entry (admin only - using ID)
//   removeFromTimeline: (authorId, timelineId) => api.delete(`/authors/${authorId}/timeline/${timelineId}`).then(res => res.data),
  
//   // ============================================
//   // GALLERY MANAGEMENT - USING SLUG FOR GET
//   // ============================================
  
//   // Get author's gallery images by slug
//   getAuthorGallery: (slug) => api.get(`/authors/${slug}/gallery`).then(res => res.data),
  
//   // Add gallery image (admin only - using ID)
//   addToGallery: (authorId, data) => api.post(`/authors/${authorId}/gallery`, data).then(res => res.data),
  
//   // Update gallery image (admin only - using ID)
//   updateGalleryImage: (authorId, imageId, data) => api.put(`/authors/${authorId}/gallery/${imageId}`, data).then(res => res.data),
  
//   // Remove gallery image (admin only - using ID)
//   removeFromGallery: (authorId, imageId) => api.delete(`/authors/${authorId}/gallery/${imageId}`).then(res => res.data),
  
//   // ============================================
//   // QUOTES MANAGEMENT - USING SLUG FOR GET
//   // ============================================
  
//   // Get author's quotes by slug
//   getAuthorQuotes: (slug) => api.get(`/authors/${slug}/quotes`).then(res => res.data),
  
//   // Add quote (admin only - using ID)
//   addQuote: (authorId, data) => api.post(`/authors/${authorId}/quotes`, data).then(res => res.data),
  
//   // Update quote (admin only - using ID)
//   updateQuote: (authorId, quoteId, data) => api.put(`/authors/${authorId}/quotes/${quoteId}`, data).then(res => res.data),
  
//   // Remove quote (admin only - using ID)
//   removeQuote: (authorId, quoteId) => api.delete(`/authors/${authorId}/quotes/${quoteId}`).then(res => res.data),
  
//   // ============================================
//   // RELATED AUTHORS - USING SLUG FOR GET
//   // ============================================
  
//   // Get related authors by slug
//   getRelatedAuthors: (slug) => api.get(`/authors/${slug}/related`).then(res => res.data),
  
//   // Add related author (admin only - using ID)
//   addRelatedAuthor: (authorId, relatedAuthorId) => api.post(`/authors/${authorId}/related`, { relatedAuthorId }).then(res => res.data),
  
//   // Remove related author (admin only - using ID)
//   removeRelatedAuthor: (authorId, relatedAuthorId) => api.delete(`/authors/${authorId}/related/${relatedAuthorId}`).then(res => res.data),
  
//   // ============================================
//   // SOCIAL LINKS - USING ID FOR UPDATE
//   // ============================================
  
//   // Update social links (admin only - using ID)
//   updateSocialLinks: (authorId, data) => api.put(`/authors/${authorId}/social-links`, data).then(res => res.data),
  
//   // ============================================
//   // FOLLOW/UNFOLLOW - USING ID
//   // ============================================
  
//   // Follow author (authenticated users - using ID)
//   followAuthor: (authorId) => api.post(`/authors/${authorId}/follow`).then(res => res.data),
  
//   // Unfollow author (authenticated users - using ID)
//   unfollowAuthor: (authorId) => api.delete(`/authors/${authorId}/follow`).then(res => res.data),
  
//   // Check if user is following author (using ID)
//   checkFollowing: (authorId) => api.get(`/authors/${authorId}/following`).then(res => res.data),
  
//   // ============================================
//   // BULK OPERATIONS (Admin only)
//   // ============================================
  
//   // Bulk import authors
//   bulkImportAuthors: (data) => api.post('/authors/bulk-import', data).then(res => res.data),
  
//   // Bulk update authors
//   bulkUpdateAuthors: (data) => api.put('/authors/bulk-update', data).then(res => res.data),
  
//   // Bulk delete authors
//   bulkDeleteAuthors: (ids) => api.post('/authors/bulk-delete', { ids }).then(res => res.data),
  
//   // ============================================
//   // EXPORT OPERATIONS
//   // ============================================
  
//   // Export authors to CSV/JSON
//   exportAuthors: (format, params) => api.get('/authors/export', { params: { format, ...params }, responseType: 'blob' }).then(res => res.data),
  
//   // ============================================
//   // AUTHOR ANALYTICS (Admin only)
//   // ============================================
  
//   // Get author analytics
//   getAuthorAnalytics: (params) => api.get('/authors/analytics', { params }).then(res => res.data),
  
//   // Get author performance metrics
//   getAuthorPerformance: (authorId, params) => api.get(`/authors/${authorId}/performance`, { params }).then(res => res.data),
// };

// // Helper functions remain the same
// export const getAuthorDisplayName = (author) => {
//   if (!author) return 'Unknown Author';
//   return author.name || author.nameUrdu || author.nameHindi || 'Unknown Author';
// };

// export const getAuthorSlug = (author) => {
//   if (!author) return '#';
//   return author.slug || '#';
// };

// export const getAuthorEraColor = (era) => {
//   switch (era?.toLowerCase()) {
//     case 'classical': return 'bg-purple-100 text-purple-700';
//     case 'modern': return 'bg-blue-100 text-blue-700';
//     case 'contemporary': return 'bg-green-100 text-green-700';
//     default: return 'bg-gray-100 text-gray-700';
//   }
// };

// export const formatAuthorYears = (author) => {
//   const birth = author.birthDate ? new Date(author.birthDate).getFullYear() : '';
//   const death = author.deathDate ? new Date(author.deathDate).getFullYear() : '';
//   if (birth && death) return `${birth} - ${death}`;
//   if (birth) return `b. ${birth}`;
//   if (death) return `d. ${death}`;
//   return '';
// };

// export const getAuthorFollowerDisplay = (count) => {
//   if (!count) return '0 followers';
//   if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M followers`;
//   if (count >= 1000) return `${(count / 1000).toFixed(1)}K followers`;
//   return `${count} follower${count !== 1 ? 's' : ''}`;
// };

// export default authorAPI;











// // client/src/api/authorAPI.js
// import api from './apiConfig';

// const authorAPI = {
//   // ============================================
//   // BASIC CRUD OPERATIONS
//   // ============================================
  
//   // Get all authors with pagination and filters - FIXED
//   getAuthors: async (params) => {
//     try {
//       console.log('📡 Fetching authors with params:', params);
//       const response = await api.get('/authors', { params });
//       console.log('📡 Authors API response:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get single author by slug
//   getAuthor: async (slug) => {
//     try {
//       const response = await api.get(`/authors/${slug}`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Create new author (admin only)
//   createAuthor: async (data) => {
//     try {
//       const response = await api.post('/authors', data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ createAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Update author (admin only)
//   updateAuthor: async (id, data) => {
//     try {
//       const response = await api.put(`/authors/${id}`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ updateAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Delete author (admin only)
//   deleteAuthor: async (id) => {
//     try {
//       const response = await api.delete(`/authors/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ deleteAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // AUTHOR CONTENT - USING SLUG (not authorId)
//   // ============================================
  
//   // Get author's poems by slug
//   getAuthorPoems: async (slug, params) => {
//     try {
//       const response = await api.get(`/authors/${slug}/poems`, { params });
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorPoems error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get author's books by slug
//   getAuthorBooks: async (slug, params) => {
//     try {
//       const response = await api.get(`/authors/${slug}/books`, { params });
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorBooks error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get author's audio by slug
//   getAuthorAudio: async (slug, params) => {
//     try {
//       const response = await api.get(`/authors/${slug}/audio`, { params });
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorAudio error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get author's videos by slug
//   getAuthorVideos: async (slug, params) => {
//     try {
//       const response = await api.get(`/authors/${slug}/videos`, { params });
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorVideos error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // STATS & LISTS - USING SLUG
//   // ============================================
  
//   // Get author statistics by slug
//   getAuthorStats: async (slug) => {
//     try {
//       const response = await api.get(`/authors/${slug}/stats`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorStats error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get trending authors (most viewed/followed)
//   getTrendingAuthors: async () => {
//     try {
//       const response = await api.get('/authors/trending');
//       return response.data;
//     } catch (error) {
//       console.error('❌ getTrendingAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get featured authors
//   getFeaturedAuthors: async () => {
//     try {
//       const response = await api.get('/authors/featured');
//       return response.data;
//     } catch (error) {
//       console.error('❌ getFeaturedAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Search authors by name or bio
//   searchAuthors: async (query, params) => {
//     try {
//       const response = await api.get('/authors/search', { params: { q: query, ...params } });
//       return response.data;
//     } catch (error) {
//       console.error('❌ searchAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // TIMELINE MANAGEMENT - USING SLUG FOR GET
//   // ============================================
  
//   // Get author's timeline events by slug
//   getAuthorTimeline: async (slug) => {
//     try {
//       const response = await api.get(`/authors/${slug}/timeline`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorTimeline error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Add timeline entry (admin only - using ID)
//   addToTimeline: async (authorId, data) => {
//     try {
//       const response = await api.post(`/authors/${authorId}/timeline`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ addToTimeline error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Update timeline entry (admin only - using ID)
//   updateTimelineEntry: async (authorId, timelineId, data) => {
//     try {
//       const response = await api.put(`/authors/${authorId}/timeline/${timelineId}`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ updateTimelineEntry error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Remove timeline entry (admin only - using ID)
//   removeFromTimeline: async (authorId, timelineId) => {
//     try {
//       const response = await api.delete(`/authors/${authorId}/timeline/${timelineId}`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ removeFromTimeline error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // GALLERY MANAGEMENT - USING SLUG FOR GET
//   // ============================================
  
//   // Get author's gallery images by slug
//   getAuthorGallery: async (slug) => {
//     try {
//       const response = await api.get(`/authors/${slug}/gallery`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorGallery error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Add gallery image (admin only - using ID)
//   addToGallery: async (authorId, data) => {
//     try {
//       const response = await api.post(`/authors/${authorId}/gallery`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ addToGallery error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Update gallery image (admin only - using ID)
//   updateGalleryImage: async (authorId, imageId, data) => {
//     try {
//       const response = await api.put(`/authors/${authorId}/gallery/${imageId}`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ updateGalleryImage error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Remove gallery image (admin only - using ID)
//   removeFromGallery: async (authorId, imageId) => {
//     try {
//       const response = await api.delete(`/authors/${authorId}/gallery/${imageId}`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ removeFromGallery error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // QUOTES MANAGEMENT - USING SLUG FOR GET
//   // ============================================
  
//   // Get author's quotes by slug
//   getAuthorQuotes: async (slug) => {
//     try {
//       const response = await api.get(`/authors/${slug}/quotes`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorQuotes error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Add quote (admin only - using ID)
//   addQuote: async (authorId, data) => {
//     try {
//       const response = await api.post(`/authors/${authorId}/quotes`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ addQuote error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Update quote (admin only - using ID)
//   updateQuote: async (authorId, quoteId, data) => {
//     try {
//       const response = await api.put(`/authors/${authorId}/quotes/${quoteId}`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ updateQuote error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Remove quote (admin only - using ID)
//   removeQuote: async (authorId, quoteId) => {
//     try {
//       const response = await api.delete(`/authors/${authorId}/quotes/${quoteId}`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ removeQuote error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // RELATED AUTHORS - USING SLUG FOR GET
//   // ============================================
  
//   // Get related authors by slug
//   getRelatedAuthors: async (slug) => {
//     try {
//       const response = await api.get(`/authors/${slug}/related`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getRelatedAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Add related author (admin only - using ID)
//   addRelatedAuthor: async (authorId, relatedAuthorId) => {
//     try {
//       const response = await api.post(`/authors/${authorId}/related`, { relatedAuthorId });
//       return response.data;
//     } catch (error) {
//       console.error('❌ addRelatedAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Remove related author (admin only - using ID)
//   removeRelatedAuthor: async (authorId, relatedAuthorId) => {
//     try {
//       const response = await api.delete(`/authors/${authorId}/related/${relatedAuthorId}`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ removeRelatedAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // SOCIAL LINKS - USING ID FOR UPDATE
//   // ============================================
  
//   // Update social links (admin only - using ID)
//   updateSocialLinks: async (authorId, data) => {
//     try {
//       const response = await api.put(`/authors/${authorId}/social-links`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ updateSocialLinks error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // FOLLOW/UNFOLLOW - USING ID
//   // ============================================
  
//   // Follow author (authenticated users - using ID)
//   followAuthor: async (authorId) => {
//     try {
//       const response = await api.post(`/authors/${authorId}/follow`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ followAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Unfollow author (authenticated users - using ID)
//   unfollowAuthor: async (authorId) => {
//     try {
//       const response = await api.delete(`/authors/${authorId}/follow`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ unfollowAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Check if user is following author (using ID)
//   checkFollowing: async (authorId) => {
//     try {
//       const response = await api.get(`/authors/${authorId}/following`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ checkFollowing error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // BULK OPERATIONS (Admin only)
//   // ============================================
  
//   // Bulk import authors
//   bulkImportAuthors: async (data) => {
//     try {
//       const response = await api.post('/authors/bulk-import', data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ bulkImportAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Bulk update authors
//   bulkUpdateAuthors: async (data) => {
//     try {
//       const response = await api.put('/authors/bulk-update', data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ bulkUpdateAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Bulk delete authors
//   bulkDeleteAuthors: async (ids) => {
//     try {
//       const response = await api.post('/authors/bulk-delete', { ids });
//       return response.data;
//     } catch (error) {
//       console.error('❌ bulkDeleteAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // EXPORT OPERATIONS
//   // ============================================
  
//   // Export authors to CSV/JSON
//   exportAuthors: async (format, params) => {
//     try {
//       const response = await api.get('/authors/export', { params: { format, ...params }, responseType: 'blob' });
//       return response.data;
//     } catch (error) {
//       console.error('❌ exportAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // AUTHOR ANALYTICS (Admin only)
//   // ============================================
  
//   // Get author analytics
//   getAuthorAnalytics: async (params) => {
//     try {
//       const response = await api.get('/authors/analytics', { params });
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorAnalytics error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get author performance metrics
//   getAuthorPerformance: async (authorId, params) => {
//     try {
//       const response = await api.get(`/authors/${authorId}/performance`, { params });
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorPerformance error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
// };

// // Helper functions remain the same
// export const getAuthorDisplayName = (author) => {
//   if (!author) return 'Unknown Author';
//   return author.name || author.nameUrdu || author.nameHindi || 'Unknown Author';
// };

// export const getAuthorSlug = (author) => {
//   if (!author) return '#';
//   return author.slug || '#';
// };

// export const getAuthorEraColor = (era) => {
//   switch (era?.toLowerCase()) {
//     case 'classical': return 'bg-purple-100 text-purple-700';
//     case 'modern': return 'bg-blue-100 text-blue-700';
//     case 'contemporary': return 'bg-green-100 text-green-700';
//     default: return 'bg-gray-100 text-gray-700';
//   }
// };

// export const formatAuthorYears = (author) => {
//   const birth = author.birthDate ? new Date(author.birthDate).getFullYear() : '';
//   const death = author.deathDate ? new Date(author.deathDate).getFullYear() : '';
//   if (birth && death) return `${birth} - ${death}`;
//   if (birth) return `b. ${birth}`;
//   if (death) return `d. ${death}`;
//   return '';
// };

// export const getAuthorFollowerDisplay = (count) => {
//   if (!count) return '0 followers';
//   if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M followers`;
//   if (count >= 1000) return `${(count / 1000).toFixed(1)}K followers`;
//   return `${count} follower${count !== 1 ? 's' : ''}`;
// };

// export default authorAPI;



























// // client/src/api/authorAPI.js
// import api from './apiConfig';

// const authorAPI = {
//   // ============================================
//   // BASIC CRUD OPERATIONS
//   // ============================================
  
//   // Get all authors with pagination and filters - Supports letter filtering
//   getAuthors: async (params) => {
//     try {
//       // Build query parameters
//       const queryParams = {};
      
//       // Pagination
//       if (params.page) queryParams.page = params.page;
//       if (params.limit) queryParams.limit = params.limit;
      
//       // Sorting
//       if (params.sort) queryParams.sort = params.sort;
      
//       // Filters
//       if (params.category && params.category !== 'all') queryParams.category = params.category;
//       if (params.era) queryParams.era = params.era;
//       if (params.language) queryParams.language = params.language;
      
//       // Search query
//       if (params.search && params.search.trim()) {
//         queryParams.search = params.search.trim();
//       }
      
//       // Letter filter (alphabetical index)
//       if (params.letter && !params.search) {
//         queryParams.letter = params.letter;
//         console.log(`🔤 Applying letter filter: ${params.letter}`);
//       }
      
//       console.log('📡 Fetching authors with params:', queryParams);
//       const response = await api.get('/authors', { params: queryParams });
//       console.log('📡 Authors API response:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get single author by slug
//   getAuthor: async (slug) => {
//     try {
//       const response = await api.get(`/authors/${slug}`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Create new author (admin only)
//   createAuthor: async (data) => {
//     try {
//       const response = await api.post('/authors', data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ createAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Update author (admin only)
//   updateAuthor: async (id, data) => {
//     try {
//       const response = await api.put(`/authors/${id}`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ updateAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Delete author (admin only)
//   deleteAuthor: async (id) => {
//     try {
//       const response = await api.delete(`/authors/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ deleteAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // AUTHOR CONTENT - USING SLUG (not authorId)
//   // ============================================
  
//   // Get author's poems by slug
//   getAuthorPoems: async (slug, params) => {
//     try {
//       const response = await api.get(`/authors/${slug}/poems`, { params });
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorPoems error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get author's books by slug
//   getAuthorBooks: async (slug, params) => {
//     try {
//       const response = await api.get(`/authors/${slug}/books`, { params });
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorBooks error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get author's audio by slug
//   getAuthorAudio: async (slug, params) => {
//     try {
//       const response = await api.get(`/authors/${slug}/audio`, { params });
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorAudio error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get author's videos by slug
//   getAuthorVideos: async (slug, params) => {
//     try {
//       const response = await api.get(`/authors/${slug}/videos`, { params });
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorVideos error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // STATS & LISTS - USING SLUG
//   // ============================================
  
//   // Get author statistics by slug
//   getAuthorStats: async (slug) => {
//     try {
//       const response = await api.get(`/authors/${slug}/stats`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorStats error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get trending authors (most viewed/followed)
//   getTrendingAuthors: async () => {
//     try {
//       const response = await api.get('/authors/trending');
//       return response.data;
//     } catch (error) {
//       console.error('❌ getTrendingAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get featured authors
//   getFeaturedAuthors: async () => {
//     try {
//       const response = await api.get('/authors/featured');
//       return response.data;
//     } catch (error) {
//       console.error('❌ getFeaturedAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Search authors by name or bio
//   searchAuthors: async (query, params) => {
//     try {
//       const response = await api.get('/authors/search', { params: { q: query, ...params } });
//       return response.data;
//     } catch (error) {
//       console.error('❌ searchAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // TIMELINE MANAGEMENT - USING SLUG FOR GET
//   // ============================================
  
//   // Get author's timeline events by slug
//   getAuthorTimeline: async (slug) => {
//     try {
//       const response = await api.get(`/authors/${slug}/timeline`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorTimeline error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Add timeline entry (admin only - using ID)
//   addToTimeline: async (authorId, data) => {
//     try {
//       const response = await api.post(`/authors/${authorId}/timeline`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ addToTimeline error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Update timeline entry (admin only - using ID)
//   updateTimelineEntry: async (authorId, timelineId, data) => {
//     try {
//       const response = await api.put(`/authors/${authorId}/timeline/${timelineId}`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ updateTimelineEntry error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Remove timeline entry (admin only - using ID)
//   removeFromTimeline: async (authorId, timelineId) => {
//     try {
//       const response = await api.delete(`/authors/${authorId}/timeline/${timelineId}`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ removeFromTimeline error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // GALLERY MANAGEMENT - USING SLUG FOR GET
//   // ============================================
  
//   // Get author's gallery images by slug
//   getAuthorGallery: async (slug) => {
//     try {
//       const response = await api.get(`/authors/${slug}/gallery`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorGallery error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Add gallery image (admin only - using ID)
//   addToGallery: async (authorId, data) => {
//     try {
//       const response = await api.post(`/authors/${authorId}/gallery`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ addToGallery error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Update gallery image (admin only - using ID)
//   updateGalleryImage: async (authorId, imageId, data) => {
//     try {
//       const response = await api.put(`/authors/${authorId}/gallery/${imageId}`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ updateGalleryImage error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Remove gallery image (admin only - using ID)
//   removeFromGallery: async (authorId, imageId) => {
//     try {
//       const response = await api.delete(`/authors/${authorId}/gallery/${imageId}`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ removeFromGallery error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // QUOTES MANAGEMENT - USING SLUG FOR GET
//   // ============================================
  
//   // Get author's quotes by slug
//   getAuthorQuotes: async (slug) => {
//     try {
//       const response = await api.get(`/authors/${slug}/quotes`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorQuotes error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Add quote (admin only - using ID)
//   addQuote: async (authorId, data) => {
//     try {
//       const response = await api.post(`/authors/${authorId}/quotes`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ addQuote error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Update quote (admin only - using ID)
//   updateQuote: async (authorId, quoteId, data) => {
//     try {
//       const response = await api.put(`/authors/${authorId}/quotes/${quoteId}`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ updateQuote error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Remove quote (admin only - using ID)
//   removeQuote: async (authorId, quoteId) => {
//     try {
//       const response = await api.delete(`/authors/${authorId}/quotes/${quoteId}`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ removeQuote error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // RELATED AUTHORS - USING SLUG FOR GET
//   // ============================================
  
//   // Get related authors by slug
//   getRelatedAuthors: async (slug) => {
//     try {
//       const response = await api.get(`/authors/${slug}/related`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getRelatedAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Add related author (admin only - using ID)
//   addRelatedAuthor: async (authorId, relatedAuthorId) => {
//     try {
//       const response = await api.post(`/authors/${authorId}/related`, { relatedAuthorId });
//       return response.data;
//     } catch (error) {
//       console.error('❌ addRelatedAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Remove related author (admin only - using ID)
//   removeRelatedAuthor: async (authorId, relatedAuthorId) => {
//     try {
//       const response = await api.delete(`/authors/${authorId}/related/${relatedAuthorId}`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ removeRelatedAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // SOCIAL LINKS - USING ID FOR UPDATE
//   // ============================================
  
//   // Update social links (admin only - using ID)
//   updateSocialLinks: async (authorId, data) => {
//     try {
//       const response = await api.put(`/authors/${authorId}/social-links`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ updateSocialLinks error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // FOLLOW/UNFOLLOW - USING ID
//   // ============================================
  
//   // Follow author (authenticated users - using ID)
//   followAuthor: async (authorId) => {
//     try {
//       const response = await api.post(`/authors/${authorId}/follow`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ followAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Unfollow author (authenticated users - using ID)
//   unfollowAuthor: async (authorId) => {
//     try {
//       const response = await api.delete(`/authors/${authorId}/follow`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ unfollowAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Check if user is following author (using ID)
//   checkFollowing: async (authorId) => {
//     try {
//       const response = await api.get(`/authors/${authorId}/following`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ checkFollowing error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // BULK OPERATIONS (Admin only)
//   // ============================================
  
//   // Bulk import authors
//   bulkImportAuthors: async (data) => {
//     try {
//       const response = await api.post('/authors/bulk-import', data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ bulkImportAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Bulk update authors
//   bulkUpdateAuthors: async (data) => {
//     try {
//       const response = await api.put('/authors/bulk-update', data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ bulkUpdateAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Bulk delete authors
//   bulkDeleteAuthors: async (ids) => {
//     try {
//       const response = await api.post('/authors/bulk-delete', { ids });
//       return response.data;
//     } catch (error) {
//       console.error('❌ bulkDeleteAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // EXPORT OPERATIONS
//   // ============================================
  
//   // Export authors to CSV/JSON
//   exportAuthors: async (format, params) => {
//     try {
//       const response = await api.get('/authors/export', { params: { format, ...params }, responseType: 'blob' });
//       return response.data;
//     } catch (error) {
//       console.error('❌ exportAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // AUTHOR ANALYTICS (Admin only)
//   // ============================================
  
//   // Get author analytics
//   getAuthorAnalytics: async (params) => {
//     try {
//       const response = await api.get('/authors/analytics', { params });
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorAnalytics error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get author performance metrics
//   getAuthorPerformance: async (authorId, params) => {
//     try {
//       const response = await api.get(`/authors/${authorId}/performance`, { params });
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorPerformance error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
// };

// // ============================================
// // HELPER FUNCTIONS
// // ============================================

// // Get author display name (prioritizes English, then Urdu, then Hindi)
// export const getAuthorDisplayName = (author) => {
//   if (!author) return 'Unknown Author';
//   return author.name || author.nameUrdu || author.nameHindi || 'Unknown Author';
// };

// // Get author slug with fallback
// export const getAuthorSlug = (author) => {
//   if (!author) return '#';
//   return author.slug || '#';
// };

// // Get era badge color class
// export const getAuthorEraColor = (era) => {
//   switch (era?.toLowerCase()) {
//     case 'classical': return 'bg-purple-100 text-purple-700';
//     case 'modern': return 'bg-blue-100 text-blue-700';
//     case 'contemporary': return 'bg-green-100 text-green-700';
//     default: return 'bg-gray-100 text-gray-700';
//   }
// };

// // Format author birth/death years
// export const formatAuthorYears = (author) => {
//   const birth = author.birthDate ? new Date(author.birthDate).getFullYear() : '';
//   const death = author.deathDate ? new Date(author.deathDate).getFullYear() : '';
//   if (birth && death) return `${birth} - ${death}`;
//   if (birth) return `b. ${birth}`;
//   if (death) return `d. ${death}`;
//   return '';
// };

// // Format follower count with K/M suffixes
// export const getAuthorFollowerDisplay = (count) => {
//   if (!count) return '0 followers';
//   if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M followers`;
//   if (count >= 1000) return `${(count / 1000).toFixed(1)}K followers`;
//   return `${count} follower${count !== 1 ? 's' : ''}`;
// };

// // Get the first letter of author name for alphabetical grouping
// export const getAuthorFirstLetter = (author) => {
//   const name = author.name || author.nameUrdu || '';
//   if (!name) return '#';
//   const firstChar = name.charAt(0).toUpperCase();
//   if (/[A-Z]/.test(firstChar)) return firstChar;
//   return '#';
// };

// // Group authors by first letter for alphabetical index
// export const groupAuthorsByLetter = (authors) => {
//   const groups = {};
//   authors.forEach(author => {
//     const letter = getAuthorFirstLetter(author);
//     if (!groups[letter]) {
//       groups[letter] = [];
//     }
//     groups[letter].push(author);
//   });
//   // Sort letters alphabetically
//   return Object.keys(groups).sort().reduce((result, key) => {
//     result[key] = groups[key];
//     return result;
//   }, {});
// };

// export default authorAPI;

















// // client/src/api/authorAPI.js
// import api from './apiConfig';

// const authorAPI = {
//   // ============================================
//   // BASIC CRUD OPERATIONS
//   // ============================================
  
//   // Get all authors with pagination and filters - Supports letter filtering
//   getAuthors: async (params) => {
//     try {
//       // Build query parameters
//       const queryParams = {};
      
//       // Pagination
//       if (params.page) queryParams.page = params.page;
//       if (params.limit) queryParams.limit = params.limit;
      
//       // Sorting
//       if (params.sort) queryParams.sort = params.sort;
      
//       // Filters
//       if (params.category && params.category !== 'all') queryParams.category = params.category;
//       if (params.era) queryParams.era = params.era;
//       if (params.language) queryParams.language = params.language;
      
//       // Search query
//       if (params.search && params.search.trim()) {
//         queryParams.search = params.search.trim();
//       }
      
//       // Letter filter (alphabetical index)
//       if (params.letter && !params.search) {
//         queryParams.letter = params.letter;
//         console.log(`🔤 Applying letter filter: ${params.letter}`);
//       }
      
//       console.log('📡 Fetching authors with params:', queryParams);
//       const response = await api.get('/authors', { params: queryParams });
//       console.log('📡 Authors API response:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get single author by slug
//   getAuthor: async (slug) => {
//     try {
//       const response = await api.get(`/authors/${slug}`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get author's books by slug (UPDATED - returns proper data structure)
//   getAuthorBooks: async (slug, params = {}) => {
//     try {
//       console.log(`📚 Fetching books for author slug: ${slug}`);
//       const response = await api.get(`/authors/${slug}/books`, { params });
//       console.log(`📚 Books response:`, response.data);
//       // Handle different response structures
//       const booksData = response?.data?.data || response?.data || response || [];
//       return { success: true, data: Array.isArray(booksData) ? booksData : [] };
//     } catch (error) {
//       console.error('❌ getAuthorBooks error:', error.response?.data || error.message);
//       return { success: false, data: [], error: error.message };
//     }
//   },
  
//   // Create new author (admin only)
//   createAuthor: async (data) => {
//     try {
//       const response = await api.post('/authors', data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ createAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Update author (admin only)
//   updateAuthor: async (id, data) => {
//     try {
//       const response = await api.put(`/authors/${id}`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ updateAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Delete author (admin only)
//   deleteAuthor: async (id) => {
//     try {
//       const response = await api.delete(`/authors/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ deleteAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // AUTHOR CONTENT - USING SLUG (not authorId)
//   // ============================================
  
//   // Get author's poems by slug
//   getAuthorPoems: async (slug, params) => {
//     try {
//       const response = await api.get(`/authors/${slug}/poems`, { params });
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorPoems error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get author's audio by slug
//   getAuthorAudio: async (slug, params) => {
//     try {
//       const response = await api.get(`/authors/${slug}/audio`, { params });
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorAudio error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get author's videos by slug
//   getAuthorVideos: async (slug, params) => {
//     try {
//       const response = await api.get(`/authors/${slug}/videos`, { params });
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorVideos error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // STATS & LISTS - USING SLUG
//   // ============================================
  
//   // Get author statistics by slug
//   getAuthorStats: async (slug) => {
//     try {
//       const response = await api.get(`/authors/${slug}/stats`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorStats error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get trending authors (most viewed/followed)
//   getTrendingAuthors: async () => {
//     try {
//       const response = await api.get('/authors/trending');
//       return response.data;
//     } catch (error) {
//       console.error('❌ getTrendingAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get featured authors
//   getFeaturedAuthors: async () => {
//     try {
//       const response = await api.get('/authors/featured');
//       return response.data;
//     } catch (error) {
//       console.error('❌ getFeaturedAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Search authors by name or bio
//   searchAuthors: async (query, params) => {
//     try {
//       const response = await api.get('/authors/search', { params: { q: query, ...params } });
//       return response.data;
//     } catch (error) {
//       console.error('❌ searchAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // TIMELINE MANAGEMENT - USING SLUG FOR GET
//   // ============================================
  
//   // Get author's timeline events by slug
//   getAuthorTimeline: async (slug) => {
//     try {
//       const response = await api.get(`/authors/${slug}/timeline`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorTimeline error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Add timeline entry (admin only - using ID)
//   addToTimeline: async (authorId, data) => {
//     try {
//       const response = await api.post(`/authors/${authorId}/timeline`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ addToTimeline error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Update timeline entry (admin only - using ID)
//   updateTimelineEntry: async (authorId, timelineId, data) => {
//     try {
//       const response = await api.put(`/authors/${authorId}/timeline/${timelineId}`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ updateTimelineEntry error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Remove timeline entry (admin only - using ID)
//   removeFromTimeline: async (authorId, timelineId) => {
//     try {
//       const response = await api.delete(`/authors/${authorId}/timeline/${timelineId}`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ removeFromTimeline error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // GALLERY MANAGEMENT - USING SLUG FOR GET
//   // ============================================
  
//   // Get author's gallery images by slug
//   getAuthorGallery: async (slug) => {
//     try {
//       const response = await api.get(`/authors/${slug}/gallery`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorGallery error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Add gallery image (admin only - using ID)
//   addToGallery: async (authorId, data) => {
//     try {
//       const response = await api.post(`/authors/${authorId}/gallery`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ addToGallery error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Update gallery image (admin only - using ID)
//   updateGalleryImage: async (authorId, imageId, data) => {
//     try {
//       const response = await api.put(`/authors/${authorId}/gallery/${imageId}`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ updateGalleryImage error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Remove gallery image (admin only - using ID)
//   removeFromGallery: async (authorId, imageId) => {
//     try {
//       const response = await api.delete(`/authors/${authorId}/gallery/${imageId}`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ removeFromGallery error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // QUOTES MANAGEMENT - USING SLUG FOR GET
//   // ============================================
  
//   // Get author's quotes by slug
//   getAuthorQuotes: async (slug) => {
//     try {
//       const response = await api.get(`/authors/${slug}/quotes`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorQuotes error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Add quote (admin only - using ID)
//   addQuote: async (authorId, data) => {
//     try {
//       const response = await api.post(`/authors/${authorId}/quotes`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ addQuote error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Update quote (admin only - using ID)
//   updateQuote: async (authorId, quoteId, data) => {
//     try {
//       const response = await api.put(`/authors/${authorId}/quotes/${quoteId}`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ updateQuote error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Remove quote (admin only - using ID)
//   removeQuote: async (authorId, quoteId) => {
//     try {
//       const response = await api.delete(`/authors/${authorId}/quotes/${quoteId}`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ removeQuote error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // RELATED AUTHORS - USING SLUG FOR GET
//   // ============================================
  
//   // Get related authors by slug
//   getRelatedAuthors: async (slug) => {
//     try {
//       const response = await api.get(`/authors/${slug}/related`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getRelatedAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Add related author (admin only - using ID)
//   addRelatedAuthor: async (authorId, relatedAuthorId) => {
//     try {
//       const response = await api.post(`/authors/${authorId}/related`, { relatedAuthorId });
//       return response.data;
//     } catch (error) {
//       console.error('❌ addRelatedAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Remove related author (admin only - using ID)
//   removeRelatedAuthor: async (authorId, relatedAuthorId) => {
//     try {
//       const response = await api.delete(`/authors/${authorId}/related/${relatedAuthorId}`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ removeRelatedAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // SOCIAL LINKS - USING ID FOR UPDATE
//   // ============================================
  
//   // Update social links (admin only - using ID)
//   updateSocialLinks: async (authorId, data) => {
//     try {
//       const response = await api.put(`/authors/${authorId}/social-links`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ updateSocialLinks error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // FOLLOW/UNFOLLOW - USING ID
//   // ============================================
  
//   // Follow author (authenticated users - using ID)
//   followAuthor: async (authorId) => {
//     try {
//       const response = await api.post(`/authors/${authorId}/follow`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ followAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Unfollow author (authenticated users - using ID)
//   unfollowAuthor: async (authorId) => {
//     try {
//       const response = await api.delete(`/authors/${authorId}/follow`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ unfollowAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Check if user is following author (using ID)
//   checkFollowing: async (authorId) => {
//     try {
//       const response = await api.get(`/authors/${authorId}/following`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ checkFollowing error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // BULK OPERATIONS (Admin only)
//   // ============================================
  
//   // Bulk import authors
//   bulkImportAuthors: async (data) => {
//     try {
//       const response = await api.post('/authors/bulk-import', data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ bulkImportAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Bulk update authors
//   bulkUpdateAuthors: async (data) => {
//     try {
//       const response = await api.put('/authors/bulk-update', data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ bulkUpdateAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Bulk delete authors
//   bulkDeleteAuthors: async (ids) => {
//     try {
//       const response = await api.post('/authors/bulk-delete', { ids });
//       return response.data;
//     } catch (error) {
//       console.error('❌ bulkDeleteAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // EXPORT OPERATIONS
//   // ============================================
  
//   // Export authors to CSV/JSON
//   exportAuthors: async (format, params) => {
//     try {
//       const response = await api.get('/authors/export', { params: { format, ...params }, responseType: 'blob' });
//       return response.data;
//     } catch (error) {
//       console.error('❌ exportAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // AUTHOR ANALYTICS (Admin only)
//   // ============================================
  
//   // Get author analytics
//   getAuthorAnalytics: async (params) => {
//     try {
//       const response = await api.get('/authors/analytics', { params });
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorAnalytics error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get author performance metrics
//   getAuthorPerformance: async (authorId, params) => {
//     try {
//       const response = await api.get(`/authors/${authorId}/performance`, { params });
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorPerformance error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
// };

// // ============================================
// // HELPER FUNCTIONS
// // ============================================

// export const getAuthorDisplayName = (author) => {
//   if (!author) return 'Unknown Author';
//   return author.name || author.nameUrdu || author.nameHindi || 'Unknown Author';
// };

// export const getAuthorSlug = (author) => {
//   if (!author) return '#';
//   return author.slug || '#';
// };

// export const getAuthorEraColor = (era) => {
//   switch (era?.toLowerCase()) {
//     case 'classical': return 'bg-purple-100 text-purple-700';
//     case 'modern': return 'bg-blue-100 text-blue-700';
//     case 'contemporary': return 'bg-green-100 text-green-700';
//     default: return 'bg-gray-100 text-gray-700';
//   }
// };

// export const formatAuthorYears = (author) => {
//   const birth = author.birthDate ? new Date(author.birthDate).getFullYear() : '';
//   const death = author.deathDate ? new Date(author.deathDate).getFullYear() : '';
//   if (birth && death) return `${birth} - ${death}`;
//   if (birth) return `b. ${birth}`;
//   if (death) return `d. ${death}`;
//   return '';
// };

// export const getAuthorFollowerDisplay = (count) => {
//   if (!count) return '0 followers';
//   if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M followers`;
//   if (count >= 1000) return `${(count / 1000).toFixed(1)}K followers`;
//   return `${count} follower${count !== 1 ? 's' : ''}`;
// };

// export const getAuthorFirstLetter = (author) => {
//   const name = author.name || author.nameUrdu || '';
//   if (!name) return '#';
//   const firstChar = name.charAt(0).toUpperCase();
//   if (/[A-Z]/.test(firstChar)) return firstChar;
//   return '#';
// };

// export const groupAuthorsByLetter = (authors) => {
//   const groups = {};
//   authors.forEach(author => {
//     const letter = getAuthorFirstLetter(author);
//     if (!groups[letter]) {
//       groups[letter] = [];
//     }
//     groups[letter].push(author);
//   });
//   return Object.keys(groups).sort().reduce((result, key) => {
//     result[key] = groups[key];
//     return result;
//   }, {});
// };

// export default authorAPI;


















// // client/src/api/authorAPI.js
// import api from './apiConfig';

// const authorAPI = {
//   // ============================================
//   // BASIC CRUD OPERATIONS
//   // ============================================
  
//   // Get all authors with pagination and filters - Supports letter filtering
//   getAuthors: async (params) => {
//     try {
//       // Build query parameters
//       const queryParams = {};
      
//       // Pagination
//       if (params.page) queryParams.page = params.page;
//       if (params.limit) queryParams.limit = params.limit;
      
//       // Sorting
//       if (params.sort) queryParams.sort = params.sort;
      
//       // Filters
//       if (params.category && params.category !== 'all') queryParams.category = params.category;
//       if (params.era) queryParams.era = params.era;
//       if (params.language) queryParams.language = params.language;
      
//       // Search query
//       if (params.search && params.search.trim()) {
//         queryParams.search = params.search.trim();
//       }
      
//       // Letter filter (alphabetical index)
//       if (params.letter && !params.search) {
//         queryParams.letter = params.letter;
//         console.log(`🔤 Applying letter filter: ${params.letter}`);
//       }
      
//       console.log('📡 Fetching authors with params:', queryParams);
//       const response = await api.get('/authors', { params: queryParams });
//       console.log('📡 Authors API response:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get single author by slug
//   getAuthor: async (slug) => {
//     try {
//       const response = await api.get(`/authors/${slug}`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Create new author with file upload (admin only)
//   createAuthor: async (data) => {
//     try {
//       // If data is FormData, send as multipart/form-data
//       const config = data instanceof FormData 
//         ? { headers: { 'Content-Type': 'multipart/form-data' } }
//         : {};
//       const response = await api.post('/authors', data, config);
//       return response.data;
//     } catch (error) {
//       console.error('❌ createAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Update author with file upload (admin only)
//   updateAuthor: async (id, data) => {
//     try {
//       // If data is FormData, send as multipart/form-data
//       const config = data instanceof FormData 
//         ? { headers: { 'Content-Type': 'multipart/form-data' } }
//         : {};
//       const response = await api.put(`/authors/${id}`, data, config);
//       return response.data;
//     } catch (error) {
//       console.error('❌ updateAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Delete author (admin only)
//   deleteAuthor: async (id) => {
//     try {
//       const response = await api.delete(`/authors/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ deleteAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // AUTHOR CONTENT - USING SLUG (not authorId)
//   // ============================================
  
//   // Get author's poems by slug
//   getAuthorPoems: async (slug, params) => {
//     try {
//       const response = await api.get(`/authors/${slug}/poems`, { params });
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorPoems error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get author's books by slug
//   getAuthorBooks: async (slug, params = {}) => {
//     try {
//       console.log(`📚 Fetching books for author slug: ${slug}`);
//       const response = await api.get(`/authors/${slug}/books`, { params });
//       console.log(`📚 Books response:`, response.data);
//       // Handle different response structures
//       const booksData = response?.data?.data || response?.data || response || [];
//       return { success: true, data: Array.isArray(booksData) ? booksData : [] };
//     } catch (error) {
//       console.error('❌ getAuthorBooks error:', error.response?.data || error.message);
//       return { success: false, data: [], error: error.message };
//     }
//   },
  
//   // Get author's audio by slug
//   getAuthorAudio: async (slug, params) => {
//     try {
//       const response = await api.get(`/authors/${slug}/audio`, { params });
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorAudio error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get author's videos by slug
//   getAuthorVideos: async (slug, params) => {
//     try {
//       const response = await api.get(`/authors/${slug}/videos`, { params });
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorVideos error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // STATS & LISTS - USING SLUG
//   // ============================================
  
//   // Get author statistics by slug
//   getAuthorStats: async (slug) => {
//     try {
//       const response = await api.get(`/authors/${slug}/stats`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorStats error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get trending authors (most viewed/followed)
//   getTrendingAuthors: async () => {
//     try {
//       const response = await api.get('/authors/trending');
//       return response.data;
//     } catch (error) {
//       console.error('❌ getTrendingAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get featured authors
//   getFeaturedAuthors: async () => {
//     try {
//       const response = await api.get('/authors/featured');
//       return response.data;
//     } catch (error) {
//       console.error('❌ getFeaturedAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Search authors by name or bio
//   searchAuthors: async (query, params) => {
//     try {
//       const response = await api.get('/authors/search', { params: { q: query, ...params } });
//       return response.data;
//     } catch (error) {
//       console.error('❌ searchAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // TIMELINE MANAGEMENT - USING SLUG FOR GET
//   // ============================================
  
//   // Get author's timeline events by slug
//   getAuthorTimeline: async (slug) => {
//     try {
//       const response = await api.get(`/authors/${slug}/timeline`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorTimeline error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Add timeline entry (admin only - using ID)
//   addToTimeline: async (authorId, data) => {
//     try {
//       const response = await api.post(`/authors/${authorId}/timeline`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ addToTimeline error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Update timeline entry (admin only - using ID)
//   updateTimelineEntry: async (authorId, timelineId, data) => {
//     try {
//       const response = await api.put(`/authors/${authorId}/timeline/${timelineId}`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ updateTimelineEntry error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Remove timeline entry (admin only - using ID)
//   removeFromTimeline: async (authorId, timelineId) => {
//     try {
//       const response = await api.delete(`/authors/${authorId}/timeline/${timelineId}`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ removeFromTimeline error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // GALLERY MANAGEMENT - USING SLUG FOR GET
//   // ============================================
  
//   // Get author's gallery images by slug
//   getAuthorGallery: async (slug) => {
//     try {
//       const response = await api.get(`/authors/${slug}/gallery`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorGallery error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Add gallery image (admin only - using ID)
//   addToGallery: async (authorId, data) => {
//     try {
//       const response = await api.post(`/authors/${authorId}/gallery`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ addToGallery error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Update gallery image (admin only - using ID)
//   updateGalleryImage: async (authorId, imageId, data) => {
//     try {
//       const response = await api.put(`/authors/${authorId}/gallery/${imageId}`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ updateGalleryImage error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Remove gallery image (admin only - using ID)
//   removeFromGallery: async (authorId, imageId) => {
//     try {
//       const response = await api.delete(`/authors/${authorId}/gallery/${imageId}`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ removeFromGallery error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // QUOTES MANAGEMENT - USING SLUG FOR GET
//   // ============================================
  
//   // Get author's quotes by slug
//   getAuthorQuotes: async (slug) => {
//     try {
//       const response = await api.get(`/authors/${slug}/quotes`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorQuotes error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Add quote (admin only - using ID)
//   addQuote: async (authorId, data) => {
//     try {
//       const response = await api.post(`/authors/${authorId}/quotes`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ addQuote error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Update quote (admin only - using ID)
//   updateQuote: async (authorId, quoteId, data) => {
//     try {
//       const response = await api.put(`/authors/${authorId}/quotes/${quoteId}`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ updateQuote error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Remove quote (admin only - using ID)
//   removeQuote: async (authorId, quoteId) => {
//     try {
//       const response = await api.delete(`/authors/${authorId}/quotes/${quoteId}`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ removeQuote error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // RELATED AUTHORS - USING SLUG FOR GET
//   // ============================================
  
//   // Get related authors by slug
//   getRelatedAuthors: async (slug) => {
//     try {
//       const response = await api.get(`/authors/${slug}/related`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getRelatedAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Add related author (admin only - using ID)
//   addRelatedAuthor: async (authorId, relatedAuthorId) => {
//     try {
//       const response = await api.post(`/authors/${authorId}/related`, { relatedAuthorId });
//       return response.data;
//     } catch (error) {
//       console.error('❌ addRelatedAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Remove related author (admin only - using ID)
//   removeRelatedAuthor: async (authorId, relatedAuthorId) => {
//     try {
//       const response = await api.delete(`/authors/${authorId}/related/${relatedAuthorId}`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ removeRelatedAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // SOCIAL LINKS - USING ID FOR UPDATE
//   // ============================================
  
//   // Update social links (admin only - using ID)
//   updateSocialLinks: async (authorId, data) => {
//     try {
//       const response = await api.put(`/authors/${authorId}/social-links`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ updateSocialLinks error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // FOLLOW/UNFOLLOW - USING ID
//   // ============================================
  
//   // Follow author (authenticated users - using ID)
//   followAuthor: async (authorId) => {
//     try {
//       const response = await api.post(`/authors/${authorId}/follow`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ followAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Unfollow author (authenticated users - using ID)
//   unfollowAuthor: async (authorId) => {
//     try {
//       const response = await api.delete(`/authors/${authorId}/follow`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ unfollowAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Check if user is following author (using ID)
//   checkFollowing: async (authorId) => {
//     try {
//       const response = await api.get(`/authors/${authorId}/following`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ checkFollowing error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // BULK OPERATIONS (Admin only)
//   // ============================================
  
//   // Bulk upload authors via file (JSON/CSV)
//   bulkUpload: async (formData) => {
//     try {
//       const response = await api.post('/authors/bulk-upload', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       return response.data;
//     } catch (error) {
//       console.error('❌ bulkUpload error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Bulk import authors (JSON data)
//   bulkImportAuthors: async (data) => {
//     try {
//       const response = await api.post('/authors/bulk-import', data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ bulkImportAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Bulk update authors
//   bulkUpdateAuthors: async (data) => {
//     try {
//       const response = await api.put('/authors/bulk-update', data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ bulkUpdateAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Bulk delete authors
//   bulkDeleteAuthors: async (ids) => {
//     try {
//       const response = await api.post('/authors/bulk-delete', { ids });
//       return response.data;
//     } catch (error) {
//       console.error('❌ bulkDeleteAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // EXPORT OPERATIONS
//   // ============================================
  
//   // Export authors to CSV
//   exportAuthors: async (format = 'csv', params = {}) => {
//     try {
//       const response = await api.get('/authors/export', { 
//         params: { format, ...params }, 
//         responseType: 'blob' 
//       });
//       return response;
//     } catch (error) {
//       console.error('❌ exportAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Export single author data
//   exportAuthorData: async (slug, format = 'json') => {
//     try {
//       const response = await api.get(`/authors/${slug}/export`, { 
//         params: { format },
//         ...(format === 'csv' && { responseType: 'blob' })
//       });
//       return response.data;
//     } catch (error) {
//       console.error('❌ exportAuthorData error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // AUTHOR ANALYTICS (Admin only)
//   // ============================================
  
//   // Get author analytics
//   getAuthorAnalytics: async (params) => {
//     try {
//       const response = await api.get('/authors/analytics', { params });
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorAnalytics error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get author performance metrics
//   getAuthorPerformance: async (authorId, params) => {
//     try {
//       const response = await api.get(`/authors/${authorId}/performance`, { params });
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorPerformance error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get author engagement metrics
//   getAuthorEngagement: async (slug) => {
//     try {
//       const response = await api.get(`/authors/${slug}/engagement`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorEngagement error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
// };

// // ============================================
// // HELPER FUNCTIONS
// // ============================================

// export const getAuthorDisplayName = (author) => {
//   if (!author) return 'Unknown Author';
//   return author.name || author.nameUrdu || author.nameHindi || 'Unknown Author';
// };

// export const getAuthorSlug = (author) => {
//   if (!author) return '#';
//   return author.slug || '#';
// };

// export const getAuthorEraColor = (era) => {
//   switch (era?.toLowerCase()) {
//     case 'classical': return 'bg-purple-100 text-purple-700';
//     case 'modern': return 'bg-blue-100 text-blue-700';
//     case 'contemporary': return 'bg-green-100 text-green-700';
//     default: return 'bg-gray-100 text-gray-700';
//   }
// };

// export const formatAuthorYears = (author) => {
//   const birth = author.birthDate ? new Date(author.birthDate).getFullYear() : '';
//   const death = author.deathDate ? new Date(author.deathDate).getFullYear() : '';
//   if (birth && death) return `${birth} - ${death}`;
//   if (birth) return `b. ${birth}`;
//   if (death) return `d. ${death}`;
//   return '';
// };

// export const getAuthorFollowerDisplay = (count) => {
//   if (!count) return '0 followers';
//   if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M followers`;
//   if (count >= 1000) return `${(count / 1000).toFixed(1)}K followers`;
//   return `${count} follower${count !== 1 ? 's' : ''}`;
// };

// export const getAuthorFirstLetter = (author) => {
//   const name = author.name || author.nameUrdu || '';
//   if (!name) return '#';
//   const firstChar = name.charAt(0).toUpperCase();
//   if (/[A-Z]/.test(firstChar)) return firstChar;
//   return '#';
// };

// export const groupAuthorsByLetter = (authors) => {
//   const groups = {};
//   authors.forEach(author => {
//     const letter = getAuthorFirstLetter(author);
//     if (!groups[letter]) {
//       groups[letter] = [];
//     }
//     groups[letter].push(author);
//   });
//   return Object.keys(groups).sort().reduce((result, key) => {
//     result[key] = groups[key];
//     return result;
//   }, {});
// };

// // Format file size for display
// export const formatFileSize = (bytes) => {
//   if (bytes === 0) return '0 Bytes';
//   const k = 1024;
//   const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//   const i = Math.floor(Math.log(bytes) / Math.log(k));
//   return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
// };

// // Validate author data before submission
// export const validateAuthorData = (data) => {
//   const errors = [];
  
//   if (!data.name || !data.name.trim()) {
//     errors.push('Author name is required');
//   }
  
//   if (!data.bio || !data.bio.trim()) {
//     errors.push('Author biography is required');
//   }
  
//   if (data.slug && !/^[a-z0-9-]+$/.test(data.slug)) {
//     errors.push('Slug can only contain lowercase letters, numbers, and hyphens');
//   }
  
//   return {
//     isValid: errors.length === 0,
//     errors
//   };
// };

// // Prepare author data for API submission
// export const prepareAuthorData = (data, files = null) => {
//   const formData = new FormData();
  
//   // Add all text fields
//   const textFields = ['name', 'slug', 'nameUrdu', 'bio', 'bioUrdu', 'birthPlace', 'era', 'category'];
//   textFields.forEach(field => {
//     if (data[field]) {
//       formData.append(field, data[field]);
//     }
//   });
  
//   // Add dates
//   if (data.birthDate) formData.append('birthDate', data.birthDate);
//   if (data.deathDate) formData.append('deathDate', data.deathDate);
  
//   // Add arrays as JSON strings
//   if (data.genres && data.genres.length) {
//     formData.append('genres', JSON.stringify(data.genres));
//   }
//   if (data.languages && data.languages.length) {
//     formData.append('languages', JSON.stringify(data.languages));
//   }
  
//   // Add boolean flags
//   formData.append('isVerified', data.isVerified || false);
//   formData.append('isFeatured', data.isFeatured || false);
  
//   // Add files if present
//   if (files?.avatar) {
//     formData.append('avatar', files.avatar);
//   } else if (data.avatar && typeof data.avatar === 'string') {
//     formData.append('avatar', data.avatar);
//   }
  
//   if (files?.coverImage) {
//     formData.append('coverImage', files.coverImage);
//   } else if (data.coverImage && typeof data.coverImage === 'string') {
//     formData.append('coverImage', data.coverImage);
//   }
  
//   return formData;
// };

// export default authorAPI;



















// // client/src/api/authorAPI.js
// import api from './apiConfig';

// const authorAPI = {
//   // ============================================
//   // BASIC CRUD OPERATIONS
//   // ============================================
  
//   // Get all authors with pagination and filters - Supports letter filtering
//   getAuthors: async (params = {}) => {
//     try {
//       // Build query parameters
//       const queryParams = {};
      
//       // Pagination - Ensure proper defaults
//       queryParams.page = params.page || 1;
//       queryParams.limit = params.limit || 10;
      
//       // Sorting
//       if (params.sort) queryParams.sort = params.sort;
      
//       // Filters
//       if (params.category && params.category !== 'all') queryParams.category = params.category;
//       if (params.era) queryParams.era = params.era;
//       if (params.language) queryParams.language = params.language;
      
//       // Search query
//       if (params.search && params.search.trim()) {
//         queryParams.search = params.search.trim();
//       }
      
//       // Letter filter (alphabetical index)
//       if (params.letter && !params.search) {
//         queryParams.letter = params.letter;
//         console.log(`🔤 Applying letter filter: ${params.letter}`);
//       }
      
//       console.log('📡 Fetching authors with params:', queryParams);
//       const response = await api.get('/authors', { params: queryParams });
      
//       // Ensure consistent response structure with pagination
//       const responseData = response.data;
      
//       // If response already has proper structure with data and pagination
//       if (responseData?.data && responseData?.pagination) {
//         console.log('📡 Authors API response with pagination:', {
//           total: responseData.pagination.total,
//           page: responseData.pagination.page,
//           totalPages: responseData.pagination.totalPages,
//           authorsCount: responseData.data?.length || 0
//         });
//         return responseData;
//       }
      
//       // If response has data array but no pagination object
//       if (responseData?.data && Array.isArray(responseData.data)) {
//         const authors = responseData.data;
//         const total = responseData.total || authors.length;
//         const page = queryParams.page;
//         const limit = queryParams.limit;
//         const totalPages = Math.ceil(total / limit);
        
//         const enhancedResponse = {
//           success: true,
//           data: authors,
//           pagination: {
//             page: page,
//             limit: limit,
//             total: total,
//             totalPages: totalPages,
//             hasNextPage: page < totalPages,
//             hasPrevPage: page > 1
//           }
//         };
//         console.log('📡 Enhanced authors response:', enhancedResponse.pagination);
//         return enhancedResponse;
//       }
      
//       // If response is direct array
//       if (Array.isArray(responseData)) {
//         const authors = responseData;
//         const total = authors.length;
//         const page = queryParams.page;
//         const limit = queryParams.limit;
//         const totalPages = Math.ceil(total / limit);
        
//         return {
//           success: true,
//           data: authors,
//           pagination: {
//             page: page,
//             limit: limit,
//             total: total,
//             totalPages: totalPages,
//             hasNextPage: page < totalPages,
//             hasPrevPage: page > 1
//           }
//         };
//       }
      
//       // Default return
//       return {
//         success: true,
//         data: [],
//         pagination: {
//           page: queryParams.page,
//           limit: queryParams.limit,
//           total: 0,
//           totalPages: 0,
//           hasNextPage: false,
//           hasPrevPage: false
//         }
//       };
      
//     } catch (error) {
//       console.error('❌ getAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get single author by slug
//   getAuthor: async (slug) => {
//     try {
//       const response = await api.get(`/authors/${slug}`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Create new author with file upload (admin only)
//   createAuthor: async (data) => {
//     try {
//       // If data is FormData, send as multipart/form-data
//       const config = data instanceof FormData 
//         ? { headers: { 'Content-Type': 'multipart/form-data' } }
//         : {};
//       const response = await api.post('/authors', data, config);
//       return response.data;
//     } catch (error) {
//       console.error('❌ createAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Update author with file upload (admin only)
//   updateAuthor: async (id, data) => {
//     try {
//       // If data is FormData, send as multipart/form-data
//       const config = data instanceof FormData 
//         ? { headers: { 'Content-Type': 'multipart/form-data' } }
//         : {};
//       const response = await api.put(`/authors/${id}`, data, config);
//       return response.data;
//     } catch (error) {
//       console.error('❌ updateAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Delete author (admin only)
//   deleteAuthor: async (id) => {
//     try {
//       const response = await api.delete(`/authors/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ deleteAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // AUTHOR CONTENT - USING SLUG (not authorId)
//   // ============================================
  
//   // Get author's poems by slug
//   getAuthorPoems: async (slug, params) => {
//     try {
//       const response = await api.get(`/authors/${slug}/poems`, { params });
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorPoems error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get author's books by slug
//   getAuthorBooks: async (slug, params = {}) => {
//     try {
//       console.log(`📚 Fetching books for author slug: ${slug}`);
//       const response = await api.get(`/authors/${slug}/books`, { params });
//       console.log(`📚 Books response:`, response.data);
//       // Handle different response structures
//       const booksData = response?.data?.data || response?.data || response || [];
//       return { success: true, data: Array.isArray(booksData) ? booksData : [] };
//     } catch (error) {
//       console.error('❌ getAuthorBooks error:', error.response?.data || error.message);
//       return { success: false, data: [], error: error.message };
//     }
//   },
  
//   // Get author's audio by slug
//   getAuthorAudio: async (slug, params) => {
//     try {
//       const response = await api.get(`/authors/${slug}/audio`, { params });
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorAudio error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get author's videos by slug
//   getAuthorVideos: async (slug, params) => {
//     try {
//       const response = await api.get(`/authors/${slug}/videos`, { params });
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorVideos error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // STATS & LISTS - USING SLUG
//   // ============================================
  
//   // Get author statistics by slug
//   getAuthorStats: async (slug) => {
//     try {
//       const response = await api.get(`/authors/${slug}/stats`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorStats error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get trending authors (most viewed/followed)
//   getTrendingAuthors: async () => {
//     try {
//       const response = await api.get('/authors/trending');
//       return response.data;
//     } catch (error) {
//       console.error('❌ getTrendingAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get featured authors
//   getFeaturedAuthors: async () => {
//     try {
//       const response = await api.get('/authors/featured');
//       return response.data;
//     } catch (error) {
//       console.error('❌ getFeaturedAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Search authors by name or bio
//   searchAuthors: async (query, params) => {
//     try {
//       const response = await api.get('/authors/search', { params: { q: query, ...params } });
//       return response.data;
//     } catch (error) {
//       console.error('❌ searchAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // TIMELINE MANAGEMENT - USING SLUG FOR GET
//   // ============================================
  
//   // Get author's timeline events by slug
//   getAuthorTimeline: async (slug) => {
//     try {
//       const response = await api.get(`/authors/${slug}/timeline`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorTimeline error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Add timeline entry (admin only - using ID)
//   addToTimeline: async (authorId, data) => {
//     try {
//       const response = await api.post(`/authors/${authorId}/timeline`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ addToTimeline error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Update timeline entry (admin only - using ID)
//   updateTimelineEntry: async (authorId, timelineId, data) => {
//     try {
//       const response = await api.put(`/authors/${authorId}/timeline/${timelineId}`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ updateTimelineEntry error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Remove timeline entry (admin only - using ID)
//   removeFromTimeline: async (authorId, timelineId) => {
//     try {
//       const response = await api.delete(`/authors/${authorId}/timeline/${timelineId}`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ removeFromTimeline error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // GALLERY MANAGEMENT - USING SLUG FOR GET
//   // ============================================
  
//   // Get author's gallery images by slug
//   getAuthorGallery: async (slug) => {
//     try {
//       const response = await api.get(`/authors/${slug}/gallery`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorGallery error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Add gallery image (admin only - using ID)
//   addToGallery: async (authorId, data) => {
//     try {
//       const response = await api.post(`/authors/${authorId}/gallery`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ addToGallery error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Update gallery image (admin only - using ID)
//   updateGalleryImage: async (authorId, imageId, data) => {
//     try {
//       const response = await api.put(`/authors/${authorId}/gallery/${imageId}`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ updateGalleryImage error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Remove gallery image (admin only - using ID)
//   removeFromGallery: async (authorId, imageId) => {
//     try {
//       const response = await api.delete(`/authors/${authorId}/gallery/${imageId}`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ removeFromGallery error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // QUOTES MANAGEMENT - USING SLUG FOR GET
//   // ============================================
  
//   // Get author's quotes by slug
//   getAuthorQuotes: async (slug) => {
//     try {
//       const response = await api.get(`/authors/${slug}/quotes`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorQuotes error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Add quote (admin only - using ID)
//   addQuote: async (authorId, data) => {
//     try {
//       const response = await api.post(`/authors/${authorId}/quotes`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ addQuote error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Update quote (admin only - using ID)
//   updateQuote: async (authorId, quoteId, data) => {
//     try {
//       const response = await api.put(`/authors/${authorId}/quotes/${quoteId}`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ updateQuote error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Remove quote (admin only - using ID)
//   removeQuote: async (authorId, quoteId) => {
//     try {
//       const response = await api.delete(`/authors/${authorId}/quotes/${quoteId}`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ removeQuote error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // RELATED AUTHORS - USING SLUG FOR GET
//   // ============================================
  
//   // Get related authors by slug
//   getRelatedAuthors: async (slug) => {
//     try {
//       const response = await api.get(`/authors/${slug}/related`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getRelatedAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Add related author (admin only - using ID)
//   addRelatedAuthor: async (authorId, relatedAuthorId) => {
//     try {
//       const response = await api.post(`/authors/${authorId}/related`, { relatedAuthorId });
//       return response.data;
//     } catch (error) {
//       console.error('❌ addRelatedAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Remove related author (admin only - using ID)
//   removeRelatedAuthor: async (authorId, relatedAuthorId) => {
//     try {
//       const response = await api.delete(`/authors/${authorId}/related/${relatedAuthorId}`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ removeRelatedAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // SOCIAL LINKS - USING ID FOR UPDATE
//   // ============================================
  
//   // Update social links (admin only - using ID)
//   updateSocialLinks: async (authorId, data) => {
//     try {
//       const response = await api.put(`/authors/${authorId}/social-links`, data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ updateSocialLinks error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // FOLLOW/UNFOLLOW - USING ID
//   // ============================================
  
//   // Follow author (authenticated users - using ID)
//   followAuthor: async (authorId) => {
//     try {
//       const response = await api.post(`/authors/${authorId}/follow`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ followAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Unfollow author (authenticated users - using ID)
//   unfollowAuthor: async (authorId) => {
//     try {
//       const response = await api.delete(`/authors/${authorId}/follow`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ unfollowAuthor error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Check if user is following author (using ID)
//   checkFollowing: async (authorId) => {
//     try {
//       const response = await api.get(`/authors/${authorId}/following`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ checkFollowing error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // BULK OPERATIONS (Admin only)
//   // ============================================
  
//   // Bulk upload authors via file (JSON/CSV)
//   bulkUpload: async (formData) => {
//     try {
//       const response = await api.post('/authors/bulk-upload', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       return response.data;
//     } catch (error) {
//       console.error('❌ bulkUpload error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Bulk import authors (JSON data)
//   bulkImportAuthors: async (data) => {
//     try {
//       const response = await api.post('/authors/bulk-import', data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ bulkImportAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Bulk update authors
//   bulkUpdateAuthors: async (data) => {
//     try {
//       const response = await api.put('/authors/bulk-update', data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ bulkUpdateAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Bulk delete authors
//   bulkDeleteAuthors: async (ids) => {
//     try {
//       const response = await api.post('/authors/bulk-delete', { ids });
//       return response.data;
//     } catch (error) {
//       console.error('❌ bulkDeleteAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // EXPORT OPERATIONS WITH UTF-8 BOM FOR URDU
//   // ============================================
  
//   // Export authors to CSV with UTF-8 BOM for Urdu support
//   exportAuthors: async (format = 'csv', params = {}) => {
//     try {
//       const response = await api.get('/authors/export', { 
//         params: { format, ...params }, 
//         responseType: 'blob' 
//       });
      
//       // Add UTF-8 BOM for Urdu/Arabic script support when returning CSV
//       if (format === 'csv' && response.data) {
//         const csvText = await response.data.text();
//         const blobWithBOM = new Blob(["\uFEFF" + csvText], { type: 'text/csv;charset=utf-8;' });
//         return { data: blobWithBOM };
//       }
      
//       return response;
//     } catch (error) {
//       console.error('❌ exportAuthors error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Export single author data
//   exportAuthorData: async (slug, format = 'json') => {
//     try {
//       const response = await api.get(`/authors/${slug}/export`, { 
//         params: { format },
//         ...(format === 'csv' && { responseType: 'blob' })
//       });
      
//       // Add UTF-8 BOM for CSV exports
//       if (format === 'csv' && response.data) {
//         const csvText = await response.data.text();
//         const blobWithBOM = new Blob(["\uFEFF" + csvText], { type: 'text/csv;charset=utf-8;' });
//         return { data: blobWithBOM };
//       }
      
//       return response.data;
//     } catch (error) {
//       console.error('❌ exportAuthorData error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // AUTHOR ANALYTICS (Admin only)
//   // ============================================
  
//   // Get author analytics
//   getAuthorAnalytics: async (params) => {
//     try {
//       const response = await api.get('/authors/analytics', { params });
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorAnalytics error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get author performance metrics
//   getAuthorPerformance: async (authorId, params) => {
//     try {
//       const response = await api.get(`/authors/${authorId}/performance`, { params });
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorPerformance error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // Get author engagement metrics
//   getAuthorEngagement: async (slug) => {
//     try {
//       const response = await api.get(`/authors/${slug}/engagement`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ getAuthorEngagement error:', error.response?.data || error.message);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // GET ALL AUTHORS COUNT (without pagination)
//   // ============================================
  
//   // Get total authors count (for stats display)
//   getTotalAuthorsCount: async () => {
//     try {
//       const response = await api.get('/authors/count');
//       return response.data;
//     } catch (error) {
//       console.error('❌ getTotalAuthorsCount error:', error.response?.data || error.message);
//       // Fallback: try to get with large limit
//       try {
//         const fallbackResponse = await authorAPI.getAuthors({ limit: 1 });
//         const total = fallbackResponse?.pagination?.total || 0;
//         return { success: true, count: total };
//       } catch (fallbackError) {
//         return { success: false, count: 0, error: fallbackError.message };
//       }
//     }
//   }
// };

// // ============================================
// // HELPER FUNCTIONS
// // ============================================

// export const getAuthorDisplayName = (author) => {
//   if (!author) return 'Unknown Author';
//   return author.name || author.nameUrdu || author.nameHindi || 'Unknown Author';
// };

// export const getAuthorSlug = (author) => {
//   if (!author) return '#';
//   return author.slug || '#';
// };

// export const getAuthorEraColor = (era) => {
//   switch (era?.toLowerCase()) {
//     case 'classical': return 'bg-purple-100 text-purple-700';
//     case 'modern': return 'bg-blue-100 text-blue-700';
//     case 'contemporary': return 'bg-green-100 text-green-700';
//     default: return 'bg-gray-100 text-gray-700';
//   }
// };

// export const formatAuthorYears = (author) => {
//   const birth = author.birthDate ? new Date(author.birthDate).getFullYear() : '';
//   const death = author.deathDate ? new Date(author.deathDate).getFullYear() : '';
//   if (birth && death) return `${birth} - ${death}`;
//   if (birth) return `b. ${birth}`;
//   if (death) return `d. ${death}`;
//   return '';
// };

// export const getAuthorFollowerDisplay = (count) => {
//   if (!count) return '0 followers';
//   if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M followers`;
//   if (count >= 1000) return `${(count / 1000).toFixed(1)}K followers`;
//   return `${count} follower${count !== 1 ? 's' : ''}`;
// };

// export const getAuthorFirstLetter = (author) => {
//   const name = author.name || author.nameUrdu || '';
//   if (!name) return '#';
//   const firstChar = name.charAt(0).toUpperCase();
//   if (/[A-Z]/.test(firstChar)) return firstChar;
//   return '#';
// };

// export const groupAuthorsByLetter = (authors) => {
//   const groups = {};
//   authors.forEach(author => {
//     const letter = getAuthorFirstLetter(author);
//     if (!groups[letter]) {
//       groups[letter] = [];
//     }
//     groups[letter].push(author);
//   });
//   return Object.keys(groups).sort().reduce((result, key) => {
//     result[key] = groups[key];
//     return result;
//   }, {});
// };

// // Format file size for display
// export const formatFileSize = (bytes) => {
//   if (bytes === 0) return '0 Bytes';
//   const k = 1024;
//   const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//   const i = Math.floor(Math.log(bytes) / Math.log(k));
//   return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
// };

// // Validate author data before submission
// export const validateAuthorData = (data) => {
//   const errors = [];
  
//   if (!data.name || !data.name.trim()) {
//     errors.push('Author name is required');
//   }
  
//   if (!data.bio || !data.bio.trim()) {
//     errors.push('Author biography is required');
//   }
  
//   if (data.slug && !/^[a-z0-9-]+$/.test(data.slug)) {
//     errors.push('Slug can only contain lowercase letters, numbers, and hyphens');
//   }
  
//   return {
//     isValid: errors.length === 0,
//     errors
//   };
// };

// // Prepare author data for API submission
// export const prepareAuthorData = (data, files = null) => {
//   const formData = new FormData();
  
//   // Add all text fields
//   const textFields = ['name', 'slug', 'nameUrdu', 'bio', 'bioUrdu', 'birthPlace', 'era', 'category'];
//   textFields.forEach(field => {
//     if (data[field]) {
//       formData.append(field, data[field]);
//     }
//   });
  
//   // Add dates
//   if (data.birthDate) formData.append('birthDate', data.birthDate);
//   if (data.deathDate) formData.append('deathDate', data.deathDate);
  
//   // Add arrays as JSON strings
//   if (data.genres && data.genres.length) {
//     formData.append('genres', JSON.stringify(data.genres));
//   }
//   if (data.languages && data.languages.length) {
//     formData.append('languages', JSON.stringify(data.languages));
//   }
  
//   // Add boolean flags
//   formData.append('isVerified', data.isVerified || false);
//   formData.append('isFeatured', data.isFeatured || false);
  
//   // Add files if present
//   if (files?.avatar) {
//     formData.append('avatar', files.avatar);
//   } else if (data.avatar && typeof data.avatar === 'string') {
//     formData.append('avatar', data.avatar);
//   }
  
//   if (files?.coverImage) {
//     formData.append('coverImage', files.coverImage);
//   } else if (data.coverImage && typeof data.coverImage === 'string') {
//     formData.append('coverImage', data.coverImage);
//   }
  
//   return formData;
// };

// export default authorAPI;






















// client/src/api/authorAPI.js
import api from './apiConfig';

const authorAPI = {
  // ============================================
  // BASIC CRUD OPERATIONS
  // ============================================
  
  // Get all authors with pagination and filters - Supports letter filtering
  getAuthors: async (params = {}) => {
    try {
      // Build query parameters
      const queryParams = {};
      
      // Pagination - Ensure proper defaults
      queryParams.page = params.page || 1;
      queryParams.limit = params.limit || 10;
      
      // Sorting
      if (params.sort) queryParams.sort = params.sort;
      
      // Filters
      if (params.category && params.category !== 'all') queryParams.category = params.category;
      if (params.era) queryParams.era = params.era;
      if (params.language) queryParams.language = params.language;
      
      // Search query
      if (params.search && params.search.trim()) {
        queryParams.search = params.search.trim();
      }
      
      // Letter filter (alphabetical index)
      if (params.letter && !params.search) {
        queryParams.letter = params.letter;
        console.log(`🔤 Applying letter filter: ${params.letter}`);
      }
      
      console.log('📡 Fetching authors with params:', queryParams);
      const response = await api.get('/authors', { params: queryParams });
      
      // Ensure consistent response structure with pagination
      const responseData = response.data;
      
      // If response already has proper structure with data and pagination
      if (responseData?.data && responseData?.pagination) {
        console.log('📡 Authors API response with pagination:', {
          total: responseData.pagination.total,
          page: responseData.pagination.page,
          totalPages: responseData.pagination.totalPages,
          authorsCount: responseData.data?.length || 0
        });
        return responseData;
      }
      
      // If response has data array but no pagination object
      if (responseData?.data && Array.isArray(responseData.data)) {
        const authors = responseData.data;
        const total = responseData.total || authors.length;
        const page = queryParams.page;
        const limit = queryParams.limit;
        const totalPages = Math.ceil(total / limit);
        
        const enhancedResponse = {
          success: true,
          data: authors,
          pagination: {
            page: page,
            limit: limit,
            total: total,
            totalPages: totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
          }
        };
        console.log('📡 Enhanced authors response:', enhancedResponse.pagination);
        return enhancedResponse;
      }
      
      // If response is direct array
      if (Array.isArray(responseData)) {
        const authors = responseData;
        const total = authors.length;
        const page = queryParams.page;
        const limit = queryParams.limit;
        const totalPages = Math.ceil(total / limit);
        
        return {
          success: true,
          data: authors,
          pagination: {
            page: page,
            limit: limit,
            total: total,
            totalPages: totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
          }
        };
      }
      
      // Default return
      return {
        success: true,
        data: [],
        pagination: {
          page: queryParams.page,
          limit: queryParams.limit,
          total: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPrevPage: false
        }
      };
      
    } catch (error) {
      console.error('❌ getAuthors error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Get single author by slug
  getAuthor: async (slug) => {
    try {
      const response = await api.get(`/authors/${slug}`);
      return response.data;
    } catch (error) {
      console.error('❌ getAuthor error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Create new author with file upload (admin only)
  createAuthor: async (data) => {
    try {
      // If data is FormData, send as multipart/form-data
      const config = data instanceof FormData 
        ? { headers: { 'Content-Type': 'multipart/form-data' } }
        : {};
      const response = await api.post('/authors', data, config);
      return response.data;
    } catch (error) {
      console.error('❌ createAuthor error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Update author with file upload (admin only)
  updateAuthor: async (id, data) => {
    try {
      // If data is FormData, send as multipart/form-data
      const config = data instanceof FormData 
        ? { headers: { 'Content-Type': 'multipart/form-data' } }
        : {};
      const response = await api.put(`/authors/${id}`, data, config);
      return response.data;
    } catch (error) {
      console.error('❌ updateAuthor error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Delete author (admin only)
  deleteAuthor: async (id) => {
    try {
      const response = await api.delete(`/authors/${id}`);
      return response.data;
    } catch (error) {
      console.error('❌ deleteAuthor error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // ============================================
  // AUTHOR CONTENT - USING SLUG (not authorId)
  // ============================================
  
  // Get author's poems by slug
  getAuthorPoems: async (slug, params) => {
    try {
      const response = await api.get(`/authors/${slug}/poems`, { params });
      return response.data;
    } catch (error) {
      console.error('❌ getAuthorPoems error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Get author's books by slug
  getAuthorBooks: async (slug, params = {}) => {
    try {
      console.log(`📚 Fetching books for author slug: ${slug}`);
      const response = await api.get(`/authors/${slug}/books`, { params });
      console.log(`📚 Books response:`, response.data);
      // Handle different response structures
      const booksData = response?.data?.data || response?.data || response || [];
      return { success: true, data: Array.isArray(booksData) ? booksData : [] };
    } catch (error) {
      console.error('❌ getAuthorBooks error:', error.response?.data || error.message);
      return { success: false, data: [], error: error.message };
    }
  },
  
  // Get author's audio by slug
  getAuthorAudio: async (slug, params) => {
    try {
      const response = await api.get(`/authors/${slug}/audio`, { params });
      return response.data;
    } catch (error) {
      console.error('❌ getAuthorAudio error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Get author's videos by slug
  getAuthorVideos: async (slug, params) => {
    try {
      const response = await api.get(`/authors/${slug}/videos`, { params });
      return response.data;
    } catch (error) {
      console.error('❌ getAuthorVideos error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // ============================================
  // STATS & LISTS - USING SLUG
  // ============================================
  
  // Get author statistics by slug
  getAuthorStats: async (slug) => {
    try {
      const response = await api.get(`/authors/${slug}/stats`);
      return response.data;
    } catch (error) {
      console.error('❌ getAuthorStats error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Get trending authors (most viewed/followed)
  getTrendingAuthors: async () => {
    try {
      const response = await api.get('/authors/trending');
      return response.data;
    } catch (error) {
      console.error('❌ getTrendingAuthors error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Get featured authors
  getFeaturedAuthors: async () => {
    try {
      const response = await api.get('/authors/featured');
      return response.data;
    } catch (error) {
      console.error('❌ getFeaturedAuthors error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Search authors by name or bio
  searchAuthors: async (query, params) => {
    try {
      const response = await api.get('/authors/search', { params: { q: query, ...params } });
      return response.data;
    } catch (error) {
      console.error('❌ searchAuthors error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // ============================================
  // TIMELINE MANAGEMENT - USING SLUG FOR GET
  // ============================================
  
  // Get author's timeline events by slug
  getAuthorTimeline: async (slug) => {
    try {
      const response = await api.get(`/authors/${slug}/timeline`);
      return response.data;
    } catch (error) {
      console.error('❌ getAuthorTimeline error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Add timeline entry (admin only - using ID)
  addToTimeline: async (authorId, data) => {
    try {
      const response = await api.post(`/authors/${authorId}/timeline`, data);
      return response.data;
    } catch (error) {
      console.error('❌ addToTimeline error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Update timeline entry (admin only - using ID)
  updateTimelineEntry: async (authorId, timelineId, data) => {
    try {
      const response = await api.put(`/authors/${authorId}/timeline/${timelineId}`, data);
      return response.data;
    } catch (error) {
      console.error('❌ updateTimelineEntry error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Remove timeline entry (admin only - using ID)
  removeFromTimeline: async (authorId, timelineId) => {
    try {
      const response = await api.delete(`/authors/${authorId}/timeline/${timelineId}`);
      return response.data;
    } catch (error) {
      console.error('❌ removeFromTimeline error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // ============================================
  // GALLERY MANAGEMENT - USING SLUG FOR GET
  // ============================================
  
  // Get author's gallery images by slug
  getAuthorGallery: async (slug) => {
    try {
      const response = await api.get(`/authors/${slug}/gallery`);
      return response.data;
    } catch (error) {
      console.error('❌ getAuthorGallery error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Add gallery image (admin only - using ID)
  addToGallery: async (authorId, data) => {
    try {
      const response = await api.post(`/authors/${authorId}/gallery`, data);
      return response.data;
    } catch (error) {
      console.error('❌ addToGallery error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Update gallery image (admin only - using ID)
  updateGalleryImage: async (authorId, imageId, data) => {
    try {
      const response = await api.put(`/authors/${authorId}/gallery/${imageId}`, data);
      return response.data;
    } catch (error) {
      console.error('❌ updateGalleryImage error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Remove gallery image (admin only - using ID)
  removeFromGallery: async (authorId, imageId) => {
    try {
      const response = await api.delete(`/authors/${authorId}/gallery/${imageId}`);
      return response.data;
    } catch (error) {
      console.error('❌ removeFromGallery error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // ============================================
  // QUOTES MANAGEMENT - USING SLUG FOR GET
  // ============================================
  
  // Get author's quotes by slug
  getAuthorQuotes: async (slug) => {
    try {
      const response = await api.get(`/authors/${slug}/quotes`);
      return response.data;
    } catch (error) {
      console.error('❌ getAuthorQuotes error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Add quote (admin only - using ID)
  addQuote: async (authorId, data) => {
    try {
      const response = await api.post(`/authors/${authorId}/quotes`, data);
      return response.data;
    } catch (error) {
      console.error('❌ addQuote error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Update quote (admin only - using ID)
  updateQuote: async (authorId, quoteId, data) => {
    try {
      const response = await api.put(`/authors/${authorId}/quotes/${quoteId}`, data);
      return response.data;
    } catch (error) {
      console.error('❌ updateQuote error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Remove quote (admin only - using ID)
  removeQuote: async (authorId, quoteId) => {
    try {
      const response = await api.delete(`/authors/${authorId}/quotes/${quoteId}`);
      return response.data;
    } catch (error) {
      console.error('❌ removeQuote error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // ============================================
  // RELATED AUTHORS - USING SLUG FOR GET
  // ============================================
  
  // Get related authors by slug
  getRelatedAuthors: async (slug) => {
    try {
      const response = await api.get(`/authors/${slug}/related`);
      return response.data;
    } catch (error) {
      console.error('❌ getRelatedAuthors error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Add related author (admin only - using ID)
  addRelatedAuthor: async (authorId, relatedAuthorId) => {
    try {
      const response = await api.post(`/authors/${authorId}/related`, { relatedAuthorId });
      return response.data;
    } catch (error) {
      console.error('❌ addRelatedAuthor error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Remove related author (admin only - using ID)
  removeRelatedAuthor: async (authorId, relatedAuthorId) => {
    try {
      const response = await api.delete(`/authors/${authorId}/related/${relatedAuthorId}`);
      return response.data;
    } catch (error) {
      console.error('❌ removeRelatedAuthor error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // ============================================
  // SOCIAL LINKS - USING ID FOR UPDATE
  // ============================================
  
  // Update social links (admin only - using ID)
  updateSocialLinks: async (authorId, data) => {
    try {
      const response = await api.put(`/authors/${authorId}/social-links`, data);
      return response.data;
    } catch (error) {
      console.error('❌ updateSocialLinks error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // ============================================
  // FOLLOW/UNFOLLOW - USING ID
  // ============================================
  
  // Follow author (authenticated users - using ID)
  followAuthor: async (authorId) => {
    try {
      const response = await api.post(`/authors/${authorId}/follow`);
      return response.data;
    } catch (error) {
      console.error('❌ followAuthor error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Unfollow author (authenticated users - using ID)
  unfollowAuthor: async (authorId) => {
    try {
      const response = await api.delete(`/authors/${authorId}/follow`);
      return response.data;
    } catch (error) {
      console.error('❌ unfollowAuthor error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Check if user is following author (using ID)
  checkFollowing: async (authorId) => {
    try {
      const response = await api.get(`/authors/${authorId}/following`);
      return response.data;
    } catch (error) {
      console.error('❌ checkFollowing error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // ============================================
  // BULK OPERATIONS (Admin only)
  // ============================================
  
  // Bulk upload authors via file (JSON/CSV)
  bulkUpload: async (formData) => {
    try {
      const response = await api.post('/authors/bulk-upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      console.error('❌ bulkUpload error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Bulk import authors (JSON data)
  bulkImportAuthors: async (data) => {
    try {
      const response = await api.post('/authors/bulk-import', data);
      return response.data;
    } catch (error) {
      console.error('❌ bulkImportAuthors error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Bulk update authors
  bulkUpdateAuthors: async (data) => {
    try {
      const response = await api.put('/authors/bulk-update', data);
      return response.data;
    } catch (error) {
      console.error('❌ bulkUpdateAuthors error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Bulk delete authors
  bulkDeleteAuthors: async (ids) => {
    try {
      const response = await api.post('/authors/bulk-delete', { ids });
      return response.data;
    } catch (error) {
      console.error('❌ bulkDeleteAuthors error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // ============================================
  // EXPORT OPERATIONS WITH UTF-8 BOM FOR URDU
  // ============================================
  
  // Export authors to JSON or CSV with UTF-8 BOM for Urdu support
  exportAuthors: async (format = 'csv', params = {}) => {
    try {
      const response = await api.get('/authors/export', { 
        params: { format, ...params }, 
        responseType: 'blob' 
      });
      
      // For CSV: Add UTF-8 BOM for Urdu/Arabic script support
      if (format === 'csv') {
        const csvText = await response.data.text();
        const blobWithBOM = new Blob(["\uFEFF" + csvText], { type: 'text/csv;charset=utf-8;' });
        return { data: blobWithBOM };
      }
      
      // For JSON: Return as is (parse the blob)
      if (format === 'json') {
        const jsonText = await response.data.text();
        const jsonData = JSON.parse(jsonText);
        return { data: jsonData };
      }
      
      return response;
    } catch (error) {
      console.error('❌ exportAuthors error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Export single author data
  exportAuthorData: async (slug, format = 'json') => {
    try {
      const response = await api.get(`/authors/${slug}/export`, { 
        params: { format },
        responseType: 'blob'
      });
      
      // For CSV: Add UTF-8 BOM for Urdu support
      if (format === 'csv') {
        const csvText = await response.data.text();
        const blobWithBOM = new Blob(["\uFEFF" + csvText], { type: 'text/csv;charset=utf-8;' });
        return { data: blobWithBOM };
      }
      
      // For JSON: Parse the blob
      if (format === 'json') {
        const jsonText = await response.data.text();
        const jsonData = JSON.parse(jsonText);
        return { data: jsonData };
      }
      
      return response.data;
    } catch (error) {
      console.error('❌ exportAuthorData error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // ============================================
  // AUTHOR ANALYTICS (Admin only)
  // ============================================
  
  // Get author analytics
  getAuthorAnalytics: async (params) => {
    try {
      const response = await api.get('/authors/analytics', { params });
      return response.data;
    } catch (error) {
      console.error('❌ getAuthorAnalytics error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Get author performance metrics
  getAuthorPerformance: async (authorId, params) => {
    try {
      const response = await api.get(`/authors/${authorId}/performance`, { params });
      return response.data;
    } catch (error) {
      console.error('❌ getAuthorPerformance error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Get author engagement metrics
  getAuthorEngagement: async (slug) => {
    try {
      const response = await api.get(`/authors/${slug}/engagement`);
      return response.data;
    } catch (error) {
      console.error('❌ getAuthorEngagement error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // ============================================
  // GET ALL AUTHORS COUNT (without pagination)
  // ============================================
  
  // Get total authors count (for stats display)
  getTotalAuthorsCount: async () => {
    try {
      const response = await api.get('/authors/count');
      return response.data;
    } catch (error) {
      console.error('❌ getTotalAuthorsCount error:', error.response?.data || error.message);
      // Fallback: try to get with large limit
      try {
        const fallbackResponse = await authorAPI.getAuthors({ limit: 1 });
        const total = fallbackResponse?.pagination?.total || 0;
        return { success: true, count: total };
      } catch (fallbackError) {
        return { success: false, count: 0, error: fallbackError.message };
      }
    }
  }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getAuthorDisplayName = (author) => {
  if (!author) return 'Unknown Author';
  return author.name || author.nameUrdu || author.nameHindi || 'Unknown Author';
};

export const getAuthorSlug = (author) => {
  if (!author) return '#';
  return author.slug || '#';
};

export const getAuthorEraColor = (era) => {
  switch (era?.toLowerCase()) {
    case 'classical': return 'bg-purple-100 text-purple-700';
    case 'modern': return 'bg-blue-100 text-blue-700';
    case 'contemporary': return 'bg-green-100 text-green-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export const formatAuthorYears = (author) => {
  const birth = author.birthDate ? new Date(author.birthDate).getFullYear() : '';
  const death = author.deathDate ? new Date(author.deathDate).getFullYear() : '';
  if (birth && death) return `${birth} - ${death}`;
  if (birth) return `b. ${birth}`;
  if (death) return `d. ${death}`;
  return '';
};

export const getAuthorFollowerDisplay = (count) => {
  if (!count) return '0 followers';
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M followers`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K followers`;
  return `${count} follower${count !== 1 ? 's' : ''}`;
};

export const getAuthorFirstLetter = (author) => {
  const name = author.name || author.nameUrdu || '';
  if (!name) return '#';
  const firstChar = name.charAt(0).toUpperCase();
  if (/[A-Z]/.test(firstChar)) return firstChar;
  return '#';
};

export const groupAuthorsByLetter = (authors) => {
  const groups = {};
  authors.forEach(author => {
    const letter = getAuthorFirstLetter(author);
    if (!groups[letter]) {
      groups[letter] = [];
    }
    groups[letter].push(author);
  });
  return Object.keys(groups).sort().reduce((result, key) => {
    result[key] = groups[key];
    return result;
  }, {});
};

// Format file size for display
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Validate author data before submission
export const validateAuthorData = (data) => {
  const errors = [];
  
  if (!data.name || !data.name.trim()) {
    errors.push('Author name is required');
  }
  
  if (!data.bio || !data.bio.trim()) {
    errors.push('Author biography is required');
  }
  
  if (data.slug && !/^[a-z0-9-]+$/.test(data.slug)) {
    errors.push('Slug can only contain lowercase letters, numbers, and hyphens');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Prepare author data for API submission
export const prepareAuthorData = (data, files = null) => {
  const formData = new FormData();
  
  // Add all text fields
  const textFields = ['name', 'slug', 'nameUrdu', 'bio', 'bioUrdu', 'birthPlace', 'era', 'category'];
  textFields.forEach(field => {
    if (data[field]) {
      formData.append(field, data[field]);
    }
  });
  
  // Add dates
  if (data.birthDate) formData.append('birthDate', data.birthDate);
  if (data.deathDate) formData.append('deathDate', data.deathDate);
  
  // Add arrays as JSON strings
  if (data.genres && data.genres.length) {
    formData.append('genres', JSON.stringify(data.genres));
  }
  if (data.languages && data.languages.length) {
    formData.append('languages', JSON.stringify(data.languages));
  }
  
  // Add boolean flags
  formData.append('isVerified', data.isVerified || false);
  formData.append('isFeatured', data.isFeatured || false);
  
  // Add files if present
  if (files?.avatar) {
    formData.append('avatar', files.avatar);
  } else if (data.avatar && typeof data.avatar === 'string') {
    formData.append('avatar', data.avatar);
  }
  
  if (files?.coverImage) {
    formData.append('coverImage', files.coverImage);
  } else if (data.coverImage && typeof data.coverImage === 'string') {
    formData.append('coverImage', data.coverImage);
  }
  
  return formData;
};

export default authorAPI;