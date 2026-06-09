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
};

export default blogAPI;