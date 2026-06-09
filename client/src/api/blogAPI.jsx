// // client/src/api/blogAPI.js
// import api from './apiConfig';

// const blogAPI = {
//   getBlogs: (params) => api.get('/blogs', { params }).then(res => res.data),
//   getBlog: (slug) => api.get(`/blogs/${slug}`).then(res => res.data),
//   getFeaturedBlogs: () => api.get('/blogs/featured').then(res => res.data),
//   getBlogsByCategory: (category, params) => api.get(`/blogs/category/${category}`, { params }).then(res => res.data),
//   createBlog: (data) => api.post('/blogs', data).then(res => res.data),
//   updateBlog: (id, data) => api.put(`/blogs/${id}`, data).then(res => res.data),
//   deleteBlog: (id) => api.delete(`/blogs/${id}`).then(res => res.data),
//   likeBlog: (id) => api.post(`/blogs/${id}/like`).then(res => res.data),
//   addComment: (id, data) => api.post(`/blogs/${id}/comment`, data).then(res => res.data),
// };

// export default blogAPI;












// client/src/api/blogAPI.js
import api from './apiConfig';

const blogAPI = {
  // Get all blogs with pagination and filters
  getBlogs: (params) => api.get('/blogs', { params }).then(res => res.data),
  
  // Get single blog by slug (public)
  getBlog: (slug) => api.get(`/blogs/${slug}`).then(res => res.data),
  
  // Get blog by ID (admin)
  getBlogById: (id) => api.get(`/blogs/admin/${id}`).then(res => res.data),
  
  // Get featured blogs
  getFeaturedBlogs: () => api.get('/blogs/featured').then(res => res.data),
  
  // Get blogs by category
  getBlogsByCategory: (category, params) => api.get(`/blogs/category/${category}`, { params }).then(res => res.data),
  
  // Get related blogs
  getRelatedBlogs: (id) => api.get(`/blogs/${id}/related`).then(res => res.data),
  
  // Create blog (admin only)
  createBlog: (data) => api.post('/blogs', data).then(res => res.data),
  
  // Update blog (admin only)
  updateBlog: (id, data) => api.put(`/blogs/${id}`, data).then(res => res.data),
  
  // Delete blog (admin only)
  deleteBlog: (id) => api.delete(`/blogs/${id}`).then(res => res.data),
  
  // Like blog
  likeBlog: (id) => api.post(`/blogs/${id}/like`).then(res => res.data),
  
  // Add comment
  addComment: (id, data) => api.post(`/blogs/${id}/comments`, data).then(res => res.data),

  // Add to client/src/api/blogAPI.js

// Search blogs
searchBlogs: (query, params = {}) => {
  if (!query || !query.trim()) return Promise.reject(new Error('Search query is required'));
  return api.get('/blogs/search', { params: { q: query, ...params } });
},

// Get blogs by author
getBlogsByAuthor: (authorId, params = {}) => {
  if (!authorId) return Promise.reject(new Error('Author ID is required'));
  return api.get(`/blogs/author/${authorId}`, { params });
},

// Get columnists (featured authors)
getColumnists: (params = {}) => {
  return api.get('/blogs/columnists', { params });
},

// Bookmark blog
bookmarkBlog: (blogId) => {
  if (!blogId) return Promise.reject(new Error('Blog ID is required'));
  return api.post(`/blogs/${blogId}/bookmark`);
},
};

export default blogAPI;












// // client/src/api/blogAPI.js
// import api from './apiConfig';

// const blogAPI = {
//   // ============================================
//   // PUBLIC BLOG ROUTES
//   // ============================================
  
//   // Get all blogs with pagination and filters
//   getBlogs: (params) => api.get('/blogs', { params }).then(res => res.data),
  
//   // Get single blog by slug (public)
//   getBlog: (slug) => api.get(`/blogs/${slug}`).then(res => res.data),
  
//   // Get featured blogs
//   getFeaturedBlogs: () => api.get('/blogs/featured').then(res => res.data),
  
//   // Get blogs by category
//   getBlogsByCategory: (category, params) => api.get(`/blogs/category/${category}`, { params }).then(res => res.data),
  
//   // Get related blogs
//   getRelatedBlogs: (id) => api.get(`/blogs/${id}/related`).then(res => res.data),
  
//   // Search blogs
//   searchBlogs: (query, params = {}) => {
//     if (!query || !query.trim()) return Promise.reject(new Error('Search query is required'));
//     return api.get('/blogs/search', { params: { q: query.trim(), ...params } }).then(res => res.data);
//   },
  
//   // Get blogs by author
//   getBlogsByAuthor: (authorId, params = {}) => {
//     if (!authorId) return Promise.reject(new Error('Author ID is required'));
//     return api.get(`/blogs/author/${authorId}`, { params }).then(res => res.data);
//   },
  
//   // Get columnists (featured authors with blogs)
//   getColumnists: (params = {}) => {
//     return api.get('/blogs/columnists', { params }).then(res => res.data);
//   },
  
//   // Get blog by ID (admin)
//   getBlogById: (id) => api.get(`/blogs/admin/${id}`).then(res => res.data),
  
//   // ============================================
//   // USER INTERACTION ROUTES
//   // ============================================
  
//   // Like blog
//   likeBlog: (id) => api.post(`/blogs/${id}/like`).then(res => res.data),
  
//   // Bookmark blog
//   bookmarkBlog: (blogId) => {
//     if (!blogId) return Promise.reject(new Error('Blog ID is required'));
//     return api.post(`/blogs/${blogId}/bookmark`).then(res => res.data);
//   },
  
//   // Add comment
//   addComment: (id, data) => api.post(`/blogs/${id}/comments`, data).then(res => res.data),
  
//   // ============================================
//   // ADMIN ROUTES (Require Authentication)
//   // ============================================
  
//   // Create blog (admin only)
//   createBlog: (data) => api.post('/blogs', data).then(res => res.data),
  
//   // Update blog (admin only)
//   updateBlog: (id, data) => api.put(`/blogs/${id}`, data).then(res => res.data),
  
//   // Delete blog (admin only)
//   deleteBlog: (id) => api.delete(`/blogs/${id}`).then(res => res.data),
  
//   // Bulk upload blogs (admin only)
//   bulkUploadBlogs: (blogs) => api.post('/blogs/bulk/upload', { blogs }).then(res => res.data),
  
//   // Bulk delete blogs (admin only)
//   bulkDeleteBlogs: (ids) => api.delete('/blogs/bulk', { data: { ids } }).then(res => res.data),
  
//   // Bulk publish blogs (admin only)
//   bulkPublishBlogs: (ids, publish = true) => api.put('/blogs/bulk/publish', { ids, publish }).then(res => res.data),
  
//   // ============================================
//   // STATS ROUTES
//   // ============================================
  
//   // Get blog statistics (admin only)
//   getBlogStats: () => api.get('/blogs/stats/overview').then(res => res.data),
  
//   // Get most viewed blogs
//   getMostViewedBlogs: (limit = 10) => api.get('/blogs/stats/most-viewed', { params: { limit } }).then(res => res.data),
  
//   // Get most liked blogs
//   getMostLikedBlogs: (limit = 10) => api.get('/blogs/stats/most-liked', { params: { limit } }).then(res => res.data),
// };

// export default blogAPI;