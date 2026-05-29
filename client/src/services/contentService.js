//client/src/services/contentService.js

import api from './api.js'

export const contentAPI = {
  // Poems
  getPoems: (params) => api.get('/poems', { params }),
  getPoem: (slug) => api.get(`/poems/${slug}`),
  createPoem: (data) => api.post('/poems', data),
  updatePoem: (id, data) => api.put(`/poems/${id}`, data),
  deletePoem: (id) => api.delete(`/poems/${id}`),

  // Authors
  getAuthors: (params) => api.get('/authors', { params }),
  getAuthor: (slug) => api.get(`/authors/${slug}`),
  createAuthor: (data) => api.post('/authors', data),
  updateAuthor: (id, data) => api.put(`/authors/${id}`, data),
  deleteAuthor: (id) => api.delete(`/authors/${id}`),

  // Books
  getBooks: (params) => api.get('/books', { params }),
  getBook: (slug) => api.get(`/books/${slug}`),
  createBook: (data) => api.post('/books', data),
  updateBook: (id, data) => api.put(`/books/${id}`, data),
  deleteBook: (id) => api.delete(`/books/${id}`),

  // Videos
  getVideos: (params) => api.get('/videos', { params }),
  getVideo: (id) => api.get(`/videos/${id}`),
  createVideo: (data) => api.post('/videos', data),
  updateVideo: (id, data) => api.put(`/videos/${id}`, data),
  deleteVideo: (id) => api.delete(`/videos/${id}`),

  // Categories
  getCategories: () => api.get('/categories'),

  // Search
  search: (query, filters) => api.get('/search', { params: { q: query, ...filters } }),

  // Trending
  getTrending: (type) => api.get('/trending', { params: { type } }),

  // Featured
  getFeatured: () => api.get('/featured'),
}

export default contentAPI