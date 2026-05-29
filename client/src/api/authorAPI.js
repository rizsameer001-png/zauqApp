// //client/src/api/authorAPI.js
// import api from './apiConfig'

// const authorAPI = {
//   getAuthors: (params) => api.get('/authors', { params }).then(res => res.data),
//   getAuthor: (slug) => api.get(`/authors/${slug}`).then(res => res.data),
//   getTrendingAuthors: () => api.get('/authors/trending').then(res => res.data),
//   getFeaturedAuthors: () => api.get('/authors/featured').then(res => res.data),
//   getAuthorPoems: (authorId, params) => api.get(`/authors/${authorId}/poems`, { params }).then(res => res.data),
//   getAuthorBooks: (authorId, params) => api.get(`/authors/${authorId}/books`, { params }).then(res => res.data),
//   getAuthorAudio: (authorId, params) => api.get(`/authors/${authorId}/audio`, { params }).then(res => res.data),
//   getAuthorVideos: (authorId, params) => api.get(`/authors/${authorId}/videos`, { params }).then(res => res.data),
//   getAuthorTimeline: (authorId) => api.get(`/authors/${authorId}/timeline`).then(res => res.data),
//   getAuthorGallery: (authorId) => api.get(`/authors/${authorId}/gallery`).then(res => res.data),
//   createAuthor: (data) => api.post('/authors', data).then(res => res.data),
//   updateAuthor: (id, data) => api.put(`/authors/${id}`, data).then(res => res.data),
//   deleteAuthor: (id) => api.delete(`/authors/${id}`).then(res => res.data),
// }

// export default authorAPI









// // client/src/api/authorAPI.js
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
//   // AUTHOR CONTENT
//   // ============================================
  
//   // Get author's poems
//   getAuthorPoems: (authorId, params) => api.get(`/authors/${authorId}/poems`, { params }).then(res => res.data),
  
//   // Get author's books
//   getAuthorBooks: (authorId, params) => api.get(`/authors/${authorId}/books`, { params }).then(res => res.data),
  
//   // Get author's audio
//   getAuthorAudio: (authorId, params) => api.get(`/authors/${authorId}/audio`, { params }).then(res => res.data),
  
//   // Get author's videos
//   getAuthorVideos: (authorId, params) => api.get(`/authors/${authorId}/videos`, { params }).then(res => res.data),
  
//   // ============================================
//   // STATS & LISTS
//   // ============================================
  
//   // Get author statistics (poems, books, followers, views count)
//   getAuthorStats: (authorId) => api.get(`/authors/${authorId}/stats`).then(res => res.data),
  
//   // Get trending authors (most viewed/followed)
//   getTrendingAuthors: () => api.get('/authors/trending').then(res => res.data),
  
//   // Get featured authors
//   getFeaturedAuthors: () => api.get('/authors/featured').then(res => res.data),
  
//   // Search authors by name or bio
//   searchAuthors: (query, params) => api.get('/authors/search', { params: { q: query, ...params } }).then(res => res.data),
  
//   // ============================================
//   // TIMELINE MANAGEMENT
//   // ============================================
  
//   // Get author's timeline events
//   getAuthorTimeline: (authorId) => api.get(`/authors/${authorId}/timeline`).then(res => res.data),
  
//   // Add timeline entry (admin only)
//   addToTimeline: (authorId, data) => api.post(`/authors/${authorId}/timeline`, data).then(res => res.data),
  
//   // Update timeline entry (admin only)
//   updateTimelineEntry: (authorId, timelineId, data) => api.put(`/authors/${authorId}/timeline/${timelineId}`, data).then(res => res.data),
  
//   // Remove timeline entry (admin only)
//   removeFromTimeline: (authorId, timelineId) => api.delete(`/authors/${authorId}/timeline/${timelineId}`).then(res => res.data),
  
//   // ============================================
//   // GALLERY MANAGEMENT
//   // ============================================
  
//   // Get author's gallery images
//   getAuthorGallery: (authorId) => api.get(`/authors/${authorId}/gallery`).then(res => res.data),
  
//   // Add gallery image (admin only)
//   addToGallery: (authorId, data) => api.post(`/authors/${authorId}/gallery`, data).then(res => res.data),
  
//   // Update gallery image (admin only)
//   updateGalleryImage: (authorId, imageId, data) => api.put(`/authors/${authorId}/gallery/${imageId}`, data).then(res => res.data),
  
//   // Remove gallery image (admin only)
//   removeFromGallery: (authorId, imageId) => api.delete(`/authors/${authorId}/gallery/${imageId}`).then(res => res.data),
  
//   // ============================================
//   // QUOTES MANAGEMENT
//   // ============================================
  
//   // Get author's quotes
//   getAuthorQuotes: (authorId) => api.get(`/authors/${authorId}/quotes`).then(res => res.data),
  
//   // Add quote (admin only)
//   addQuote: (authorId, data) => api.post(`/authors/${authorId}/quotes`, data).then(res => res.data),
  
//   // Update quote (admin only)
//   updateQuote: (authorId, quoteId, data) => api.put(`/authors/${authorId}/quotes/${quoteId}`, data).then(res => res.data),
  
//   // Remove quote (admin only)
//   removeQuote: (authorId, quoteId) => api.delete(`/authors/${authorId}/quotes/${quoteId}`).then(res => res.data),
  
//   // ============================================
//   // RELATED AUTHORS
//   // ============================================
  
//   // Get related authors
//   getRelatedAuthors: (authorId) => api.get(`/authors/${authorId}/related`).then(res => res.data),
  
//   // Add related author (admin only)
//   addRelatedAuthor: (authorId, relatedAuthorId) => api.post(`/authors/${authorId}/related`, { relatedAuthorId }).then(res => res.data),
  
//   // Remove related author (admin only)
//   removeRelatedAuthor: (authorId, relatedAuthorId) => api.delete(`/authors/${authorId}/related/${relatedAuthorId}`).then(res => res.data),
  
//   // ============================================
//   // SOCIAL LINKS
//   // ============================================
  
//   // Update social links (admin only)
//   updateSocialLinks: (authorId, data) => api.put(`/authors/${authorId}/social-links`, data).then(res => res.data),
  
//   // ============================================
//   // FOLLOW/UNFOLLOW
//   // ============================================
  
//   // Follow author (authenticated users)
//   followAuthor: (authorId) => api.post(`/authors/${authorId}/follow`).then(res => res.data),
  
//   // Unfollow author (authenticated users)
//   unfollowAuthor: (authorId) => api.delete(`/authors/${authorId}/follow`).then(res => res.data),
  
//   // Check if user is following author
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

// // Helper function to get author display name with Urdu/Hindi support
// export const getAuthorDisplayName = (author) => {
//   if (!author) return 'Unknown Author';
//   return author.name || author.nameUrdu || author.nameHindi || 'Unknown Author';
// };

// // Helper function to get author slug
// export const getAuthorSlug = (author) => {
//   if (!author) return '#';
//   return author.slug || '#';
// };

// // Helper function to get author era badge color
// export const getAuthorEraColor = (era) => {
//   switch (era?.toLowerCase()) {
//     case 'classical': return 'bg-purple-100 text-purple-700';
//     case 'modern': return 'bg-blue-100 text-blue-700';
//     case 'contemporary': return 'bg-green-100 text-green-700';
//     default: return 'bg-gray-100 text-gray-700';
//   }
// };

// // Helper function to format author years
// export const formatAuthorYears = (author) => {
//   const birth = author.birthDate ? new Date(author.birthDate).getFullYear() : '';
//   const death = author.deathDate ? new Date(author.deathDate).getFullYear() : '';
//   if (birth && death) return `${birth} - ${death}`;
//   if (birth) return `b. ${birth}`;
//   if (death) return `d. ${death}`;
//   return '';
// };

// // Helper function to get author follower count display
// export const getAuthorFollowerDisplay = (count) => {
//   if (!count) return '0 followers';
//   if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M followers`;
//   if (count >= 1000) return `${(count / 1000).toFixed(1)}K followers`;
//   return `${count} follower${count !== 1 ? 's' : ''}`;
// };

// export default authorAPI;











// client/src/api/authorAPI.js
import api from './apiConfig';

const authorAPI = {
  // ============================================
  // BASIC CRUD OPERATIONS
  // ============================================
  
  // Get all authors with pagination and filters
  getAuthors: (params) => api.get('/authors', { params }).then(res => res.data),
  
  // Get single author by slug
  getAuthor: (slug) => api.get(`/authors/${slug}`).then(res => res.data),
  
  // Create new author (admin only)
  createAuthor: (data) => api.post('/authors', data).then(res => res.data),
  
  // Update author (admin only)
  updateAuthor: (id, data) => api.put(`/authors/${id}`, data).then(res => res.data),
  
  // Delete author (admin only)
  deleteAuthor: (id) => api.delete(`/authors/${id}`).then(res => res.data),
  
  // ============================================
  // AUTHOR CONTENT - USING SLUG (not authorId)
  // ============================================
  
  // Get author's poems by slug
  getAuthorPoems: (slug, params) => api.get(`/authors/${slug}/poems`, { params }).then(res => res.data),
  
  // Get author's books by slug
  getAuthorBooks: (slug, params) => api.get(`/authors/${slug}/books`, { params }).then(res => res.data),
  
  // Get author's audio by slug
  getAuthorAudio: (slug, params) => api.get(`/authors/${slug}/audio`, { params }).then(res => res.data),
  
  // Get author's videos by slug
  getAuthorVideos: (slug, params) => api.get(`/authors/${slug}/videos`, { params }).then(res => res.data),
  
  // ============================================
  // STATS & LISTS - USING SLUG
  // ============================================
  
  // Get author statistics by slug
  getAuthorStats: (slug) => api.get(`/authors/${slug}/stats`).then(res => res.data),
  
  // Get trending authors (most viewed/followed)
  getTrendingAuthors: () => api.get('/authors/trending').then(res => res.data),
  
  // Get featured authors
  getFeaturedAuthors: () => api.get('/authors/featured').then(res => res.data),
  
  // Search authors by name or bio
  searchAuthors: (query, params) => api.get('/authors/search', { params: { q: query, ...params } }).then(res => res.data),
  
  // ============================================
  // TIMELINE MANAGEMENT - USING SLUG FOR GET
  // ============================================
  
  // Get author's timeline events by slug
  getAuthorTimeline: (slug) => api.get(`/authors/${slug}/timeline`).then(res => res.data),
  
  // Add timeline entry (admin only - using ID)
  addToTimeline: (authorId, data) => api.post(`/authors/${authorId}/timeline`, data).then(res => res.data),
  
  // Update timeline entry (admin only - using ID)
  updateTimelineEntry: (authorId, timelineId, data) => api.put(`/authors/${authorId}/timeline/${timelineId}`, data).then(res => res.data),
  
  // Remove timeline entry (admin only - using ID)
  removeFromTimeline: (authorId, timelineId) => api.delete(`/authors/${authorId}/timeline/${timelineId}`).then(res => res.data),
  
  // ============================================
  // GALLERY MANAGEMENT - USING SLUG FOR GET
  // ============================================
  
  // Get author's gallery images by slug
  getAuthorGallery: (slug) => api.get(`/authors/${slug}/gallery`).then(res => res.data),
  
  // Add gallery image (admin only - using ID)
  addToGallery: (authorId, data) => api.post(`/authors/${authorId}/gallery`, data).then(res => res.data),
  
  // Update gallery image (admin only - using ID)
  updateGalleryImage: (authorId, imageId, data) => api.put(`/authors/${authorId}/gallery/${imageId}`, data).then(res => res.data),
  
  // Remove gallery image (admin only - using ID)
  removeFromGallery: (authorId, imageId) => api.delete(`/authors/${authorId}/gallery/${imageId}`).then(res => res.data),
  
  // ============================================
  // QUOTES MANAGEMENT - USING SLUG FOR GET
  // ============================================
  
  // Get author's quotes by slug
  getAuthorQuotes: (slug) => api.get(`/authors/${slug}/quotes`).then(res => res.data),
  
  // Add quote (admin only - using ID)
  addQuote: (authorId, data) => api.post(`/authors/${authorId}/quotes`, data).then(res => res.data),
  
  // Update quote (admin only - using ID)
  updateQuote: (authorId, quoteId, data) => api.put(`/authors/${authorId}/quotes/${quoteId}`, data).then(res => res.data),
  
  // Remove quote (admin only - using ID)
  removeQuote: (authorId, quoteId) => api.delete(`/authors/${authorId}/quotes/${quoteId}`).then(res => res.data),
  
  // ============================================
  // RELATED AUTHORS - USING SLUG FOR GET
  // ============================================
  
  // Get related authors by slug
  getRelatedAuthors: (slug) => api.get(`/authors/${slug}/related`).then(res => res.data),
  
  // Add related author (admin only - using ID)
  addRelatedAuthor: (authorId, relatedAuthorId) => api.post(`/authors/${authorId}/related`, { relatedAuthorId }).then(res => res.data),
  
  // Remove related author (admin only - using ID)
  removeRelatedAuthor: (authorId, relatedAuthorId) => api.delete(`/authors/${authorId}/related/${relatedAuthorId}`).then(res => res.data),
  
  // ============================================
  // SOCIAL LINKS - USING ID FOR UPDATE
  // ============================================
  
  // Update social links (admin only - using ID)
  updateSocialLinks: (authorId, data) => api.put(`/authors/${authorId}/social-links`, data).then(res => res.data),
  
  // ============================================
  // FOLLOW/UNFOLLOW - USING ID
  // ============================================
  
  // Follow author (authenticated users - using ID)
  followAuthor: (authorId) => api.post(`/authors/${authorId}/follow`).then(res => res.data),
  
  // Unfollow author (authenticated users - using ID)
  unfollowAuthor: (authorId) => api.delete(`/authors/${authorId}/follow`).then(res => res.data),
  
  // Check if user is following author (using ID)
  checkFollowing: (authorId) => api.get(`/authors/${authorId}/following`).then(res => res.data),
  
  // ============================================
  // BULK OPERATIONS (Admin only)
  // ============================================
  
  // Bulk import authors
  bulkImportAuthors: (data) => api.post('/authors/bulk-import', data).then(res => res.data),
  
  // Bulk update authors
  bulkUpdateAuthors: (data) => api.put('/authors/bulk-update', data).then(res => res.data),
  
  // Bulk delete authors
  bulkDeleteAuthors: (ids) => api.post('/authors/bulk-delete', { ids }).then(res => res.data),
  
  // ============================================
  // EXPORT OPERATIONS
  // ============================================
  
  // Export authors to CSV/JSON
  exportAuthors: (format, params) => api.get('/authors/export', { params: { format, ...params }, responseType: 'blob' }).then(res => res.data),
  
  // ============================================
  // AUTHOR ANALYTICS (Admin only)
  // ============================================
  
  // Get author analytics
  getAuthorAnalytics: (params) => api.get('/authors/analytics', { params }).then(res => res.data),
  
  // Get author performance metrics
  getAuthorPerformance: (authorId, params) => api.get(`/authors/${authorId}/performance`, { params }).then(res => res.data),
};

// Helper functions remain the same
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

export default authorAPI;