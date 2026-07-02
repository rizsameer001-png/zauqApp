// import api from './apiConfig'

// const creatorAPI = {
//   getDashboard: () => api.get('/creator/dashboard').then(res => res.data),
//   getContent: (type) => api.get(`/creator/content${type ? `?type=${type}` : ''}`).then(res => res.data),
//   getStats: () => api.get('/creator/stats').then(res => res.data),
//   getRevenue: () => api.get('/creator/revenue').then(res => res.data),
//   getFollowers: () => api.get('/creator/followers').then(res => res.data),
//   getAnalytics: () => api.get('/creator/analytics').then(res => res.data),
//   getUploadStatus: () => api.get('/creator/upload-status').then(res => res.data),
//   updateProfile: (data) => api.put('/creator/profile', data).then(res => res.data),
// }

// export default creatorAPI
















// import api from './apiConfig'

// const creatorAPI = {
//   // Dashboard & Overview
//   getDashboard: () => api.get('/creator/dashboard').then(res => res.data),
  
//   // Content Management
//   getContent: (type) => api.get(`/creator/content${type ? `?type=${type}` : ''}`).then(res => res.data),
  
//   // Statistics
//   getStats: () => api.get('/creator/stats').then(res => res.data),
  
//   // Revenue & Earnings
//   getRevenue: () => api.get('/creator/revenue').then(res => res.data),
  
//   // Followers
//   getFollowers: () => api.get('/creator/followers').then(res => res.data),
  
//   // Analytics
//   getAnalytics: () => api.get('/creator/analytics').then(res => res.data),
  
//   // Upload Status (for queue system)
//   getUploadStatus: () => api.get('/creator/upload-status').then(res => res.data),
  
//   // Profile Management
//   updateProfile: (data) => api.put('/creator/profile', data).then(res => res.data),
  
//   // ============================================
//   // VIDEO SPECIFIC METHODS
//   // ============================================
  
//   /**
//    * Upload a new video
//    * @param {FormData} formData - Video file and metadata
//    * @param {Function} onProgress - Progress callback
//    */
//   uploadVideo: (formData, onProgress) => {
//     return api.post('/videos', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//       onUploadProgress: (progressEvent) => {
//         if (onProgress) {
//           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
//           onProgress(percentCompleted)
//         }
//       }
//     }).then(res => res.data)
//   },
  
//   /**
//    * Update existing video
//    * @param {string} id - Video ID
//    * @param {FormData} formData - Updated video data
//    */
//   updateVideo: (id, formData) => {
//     return api.put(`/videos/${id}`, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     }).then(res => res.data)
//   },
  
//   /**
//    * Delete a video
//    * @param {string} id - Video ID
//    */
//   deleteVideo: (id) => api.delete(`/videos/${id}`).then(res => res.data),
  
//   /**
//    * Get single video details
//    * @param {string} id - Video ID
//    */
//   getVideo: (id) => api.get(`/videos/${id}`).then(res => res.data),
  
//   /**
//    * Get creator's videos with filters
//    * @param {Object} params - Query parameters
//    */
//   getMyVideos: (params) => api.get('/creator/videos', { params }).then(res => res.data),
  
//   /**
//    * Update video status (publish/unpublish)
//    * @param {string} id - Video ID
//    * @param {string} status - 'published' or 'draft'
//    */
//   updateVideoStatus: (id, status) => api.patch(`/videos/${id}/status`, { status }).then(res => res.data),
  
//   /**
//    * Bulk upload videos
//    * @param {FormData} formData - Multiple video files
//    */
//   bulkUploadVideos: (formData, onProgress) => {
//     return api.post('/videos/bulk-upload', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//       onUploadProgress: (progressEvent) => {
//         if (onProgress) {
//           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
//           onProgress(percentCompleted)
//         }
//       }
//     }).then(res => res.data)
//   },
  
//   // ============================================
//   // POETRY SPECIFIC METHODS
//   // ============================================
  
//   /**
//    * Upload new poetry
//    * @param {FormData} formData - Poetry data with optional cover image
//    */
//   uploadPoetry: (formData, onProgress) => {
//     return api.post('/poems', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//       onUploadProgress: (progressEvent) => {
//         if (onProgress) {
//           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
//           onProgress(percentCompleted)
//         }
//       }
//     }).then(res => res.data)
//   },
  
//   /**
//    * Update poetry
//    * @param {string} id - Poetry ID
//    * @param {FormData} formData - Updated poetry data
//    */
//   updatePoetry: (id, formData) => {
//     return api.put(`/poems/${id}`, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     }).then(res => res.data)
//   },
  
//   /**
//    * Delete poetry
//    * @param {string} id - Poetry ID
//    */
//   deletePoetry: (id) => api.delete(`/poems/${id}`).then(res => res.data),
  
//   // ============================================
//   // BOOK SPECIFIC METHODS
//   // ============================================
  
//   /**
//    * Upload new book/ebook
//    * @param {FormData} formData - Book data with PDF and cover image
//    */
//   uploadBook: (formData, onProgress) => {
//     return api.post('/books', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//       onUploadProgress: (progressEvent) => {
//         if (onProgress) {
//           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
//           onProgress(percentCompleted)
//         }
//       }
//     }).then(res => res.data)
//   },
  
//   /**
//    * Update book
//    * @param {string} id - Book ID
//    * @param {FormData} formData - Updated book data
//    */
//   updateBook: (id, formData) => {
//     return api.put(`/books/${id}`, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     }).then(res => res.data)
//   },
  
//   /**
//    * Delete book
//    * @param {string} id - Book ID
//    */
//   deleteBook: (id) => api.delete(`/books/${id}`).then(res => res.data),
  
//   // ============================================
//   // AUDIO SPECIFIC METHODS
//   // ============================================
  
//   /**
//    * Upload new audio
//    * @param {FormData} formData - Audio file and metadata
//    */
//   uploadAudio: (formData, onProgress) => {
//     return api.post('/audio', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//       onUploadProgress: (progressEvent) => {
//         if (onProgress) {
//           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
//           onProgress(percentCompleted)
//         }
//       }
//     }).then(res => res.data)
//   },
  
//   /**
//    * Update audio
//    * @param {string} id - Audio ID
//    * @param {FormData} formData - Updated audio data
//    */
//   updateAudio: (id, formData) => {
//     return api.put(`/audio/${id}`, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     }).then(res => res.data)
//   },
  
//   /**
//    * Delete audio
//    * @param {string} id - Audio ID
//    */
//   deleteAudio: (id) => api.delete(`/audio/${id}`).then(res => res.data),
  
//   // ============================================
//   // BULK OPERATIONS
//   // ============================================
  
//   /**
//    * Bulk delete content
//    * @param {Object} data - { ids: [], type: string }
//    */
//   bulkDelete: (data) => api.post('/creator/bulk-delete', data).then(res => res.data),
  
//   /**
//    * Bulk update status
//    * @param {Object} data - { ids: [], type: string, status: string }
//    */
//   bulkUpdateStatus: (data) => api.post('/creator/bulk-update-status', data).then(res => res.data),
  
//   // ============================================
//   // ANALYTICS & REPORTS
//   // ============================================
  
//   /**
//    * Get detailed content analytics
//    * @param {Object} params - { startDate, endDate, type }
//    */
//   getContentAnalytics: (params) => api.get('/creator/content-analytics', { params }).then(res => res.data),
  
//   /**
//    * Get earning reports
//    * @param {Object} params - { year, month }
//    */
//   getEarningReports: (params) => api.get('/creator/earning-reports', { params }).then(res => res.data),
  
//   /**
//    * Get top performing content
//    * @param {Object} params - { limit, type }
//    */
//   getTopContent: (params) => api.get('/creator/top-content', { params }).then(res => res.data),
  
//   // ============================================
//   // UPLOAD PRESETS & CONFIGURATION
//   // ============================================
  
//   /**
//    * Get upload presets (categories, types, etc.)
//    */
//   getUploadPresets: () => api.get('/creator/upload-presets').then(res => res.data),
  
//   /**
//    * Validate file before upload
//    * @param {Object} data - { fileType, fileSize, mimeType }
//    */
//   validateFile: (data) => api.post('/creator/validate-file', data).then(res => res.data),
// }








import api from './apiConfig'

const creatorAPI = {
  // Dashboard & Overview
  getDashboard: () => api.get('/creator/dashboard').then(res => res.data),
  
  // Content Management
  getContent: (type) => api.get(`/creator/content${type ? `?type=${type}` : ''}`).then(res => res.data),
  
  // Statistics
  getStats: () => api.get('/creator/stats').then(res => res.data),
  
  // Revenue & Earnings
  getRevenue: () => api.get('/creator/revenue').then(res => res.data),
  
  // Followers
  getFollowers: () => api.get('/creator/followers').then(res => res.data),
  
  // Analytics
  getAnalytics: () => api.get('/creator/analytics').then(res => res.data),
  
  // Upload Status (for queue system)
  getUploadStatus: () => api.get('/creator/upload-status').then(res => res.data),
  
  // Profile Management
  updateProfile: (data) => api.put('/creator/profile', data).then(res => res.data),
  
  // ============================================
  // VIDEO SPECIFIC METHODS
  // ============================================
  
  /**
   * Upload a new video
   * @param {FormData} formData - Video file and metadata
   * @param {Function} onProgress - Progress callback
   */
  uploadVideo: (formData, onProgress) => {
    return api.post('/videos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(percentCompleted)
        }
      }
    }).then(res => res.data)
  },
  
  /**
   * Update existing video
   * @param {string} id - Video ID
   * @param {FormData} formData - Updated video data
   */
  updateVideo: (id, formData) => {
    return api.put(`/videos/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data)
  },
  
  /**
   * Delete a video
   * @param {string} id - Video ID
   */
  deleteVideo: (id) => api.delete(`/videos/${id}`).then(res => res.data),
  
  /**
   * Get single video details
   * @param {string} id - Video ID
   */
  getVideo: (id) => api.get(`/videos/${id}`).then(res => res.data),
  
  /**
   * Get creator's videos with filters
   * @param {Object} params - Query parameters
   */
  getMyVideos: (params) => api.get('/creator/videos', { params }).then(res => res.data),
  
  /**
   * Update video status (publish/unpublish)
   * @param {string} id - Video ID
   * @param {string} status - 'published' or 'draft'
   */
  updateVideoStatus: (id, status) => api.patch(`/videos/${id}/status`, { status }).then(res => res.data),
  
  /**
   * Bulk upload videos
   * @param {FormData} formData - Multiple video files
   */
  bulkUploadVideos: (formData, onProgress) => {
    return api.post('/videos/bulk-upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(percentCompleted)
        }
      }
    }).then(res => res.data)
  },
  
  // ============================================
  // POETRY SPECIFIC METHODS
  // ============================================
  
  /**
   * Upload new poetry
   * @param {FormData} formData - Poetry data with optional cover image
   * @param {Function} onProgress - Progress callback
   */
  uploadPoetry: (formData, onProgress) => {
    return api.post('/poems', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(percentCompleted)
        }
      }
    }).then(res => res.data)
  },
  
  /**
   * Update poetry by slug
   * @param {string} slug - Poetry slug
   * @param {FormData} formData - Updated poetry data
   */
  updatePoetry: (slug, formData) => {
    return api.put(`/poems/${slug}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data)
  },
  
  /**
   * Delete poetry by slug
   * @param {string} slug - Poetry slug
   */
  deletePoetry: (slug) => api.delete(`/poems/${slug}`).then(res => res.data),
  
  /**
   * Get single poetry by slug
   * @param {string} slug - Poetry slug
   */
  getPoetry: (slug) => api.get(`/poems/${slug}`).then(res => res.data),
  
  /**
   * Get creator's poetry
   * @param {Object} params - Query parameters
   */
  getMyPoetry: (params) => api.get('/creator/poems', { params }).then(res => res.data),
  
  // ============================================
  // BOOK/EBOOK SPECIFIC METHODS
  // ============================================
  
  /**
   * Upload new book/ebook
   * @param {FormData} formData - Book data with PDF, EPUB, and cover image
   * @param {Function} onProgress - Progress callback
   */
  uploadBook: (formData, onProgress) => {
    return api.post('/books', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(percentCompleted)
        }
      }
    }).then(res => res.data)
  },
  
  /**
   * Update book by ID
   * @param {string} id - Book ID
   * @param {FormData} formData - Updated book data
   */
  updateBook: (id, formData) => {
    return api.put(`/books/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data)
  },
  
  /**
   * Delete book by ID
   * @param {string} id - Book ID
   */
  deleteBook: (id) => api.delete(`/books/${id}`).then(res => res.data),
  
  /**
   * Get single book by ID or slug
   * @param {string} identifier - Book ID or slug
   */
  getBook: (identifier) => api.get(`/books/${identifier}`).then(res => res.data),
  
  /**
   * Get book by slug (public facing)
   * @param {string} slug - Book slug
   */
  getBookBySlug: (slug) => api.get(`/books/${slug}`).then(res => res.data),
  
  /**
   * Get creator's books
   * @param {Object} params - Query parameters
   */
  getMyBooks: (params) => api.get('/creator/books', { params }).then(res => res.data),
  
  /**
   * Get book reader (PDF/EPUB viewer)
   * @param {string} slug - Book slug
   */
  getBookReader: (slug) => api.get(`/books/${slug}/reader`).then(res => res.data),
  
  /**
   * Download book
   * @param {string} slug - Book slug
   * @param {string} format - 'pdf' or 'epub'
   */
  downloadBook: (slug, format = 'pdf') => api.get(`/books/${slug}/download`, { 
    params: { format },
    responseType: 'blob'
  }).then(res => res.data),
  
  /**
   * Get book pages for page-by-page reading
   * @param {string} slug - Book slug
   */
  getBookPages: (slug) => api.get(`/books/${slug}/pages`).then(res => res.data),
  
  /**
   * Get single book page
   * @param {string} slug - Book slug
   * @param {number} pageNumber - Page number
   */
  getBookPage: (slug, pageNumber) => api.get(`/books/${slug}/page/${pageNumber}`).then(res => res.data),
  
  /**
   * Rate a book
   * @param {string} id - Book ID
   * @param {Object} data - { rating, review }
   */
  rateBook: (id, data) => api.post(`/books/${id}/rate`, data).then(res => res.data),
  
  /**
   * Like a book
   * @param {string} id - Book ID
   */
  likeBook: (id) => api.post(`/books/${id}/like`).then(res => res.data),
  
  /**
   * Unlike a book
   * @param {string} id - Book ID
   */
  unlikeBook: (id) => api.delete(`/books/${id}/like`).then(res => res.data),
  
  /**
   * Bookmark a book
   * @param {string} id - Book ID
   */
  bookmarkBook: (id) => api.post(`/books/${id}/bookmark`).then(res => res.data),
  
  /**
   * Remove book bookmark
   * @param {string} id - Book ID
   */
  unbookmarkBook: (id) => api.delete(`/books/${id}/bookmark`).then(res => res.data),
  
  /**
   * Get book like status
   * @param {string} id - Book ID
   */
  getBookLikeStatus: (id) => api.get(`/books/${id}/like-status`).then(res => res.data),
  
  /**
   * Get book bookmark status
   * @param {string} id - Book ID
   */
  getBookBookmarkStatus: (id) => api.get(`/books/${id}/bookmark-status`).then(res => res.data),
  
  /**
   * Get related books
   * @param {string} slug - Book slug
   */
  getRelatedBooks: (slug) => api.get(`/books/${slug}/related`).then(res => res.data),
  
  /**
   * Get book preview (lightweight version)
   * @param {string} slug - Book slug
   */
  getBookPreview: (slug) => api.get(`/books/${slug}/preview`).then(res => res.data),
  
  // ============================================
  // AUDIO SPECIFIC METHODS
  // ============================================
  
  /**
   * Upload new audio
   * @param {FormData} formData - Audio file and metadata
   * @param {Function} onProgress - Progress callback
   */
  uploadAudio: (formData, onProgress) => {
    return api.post('/audio', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(percentCompleted)
        }
      }
    }).then(res => res.data)
  },
  
  /**
   * Update audio
   * @param {string} id - Audio ID
   * @param {FormData} formData - Updated audio data
   */
  updateAudio: (id, formData) => {
    return api.put(`/audio/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data)
  },
  
  /**
   * Delete audio
   * @param {string} id - Audio ID
   */
  deleteAudio: (id) => api.delete(`/audio/${id}`).then(res => res.data),
  
  /**
   * Get single audio
   * @param {string} id - Audio ID
   */
  getAudio: (id) => api.get(`/audio/${id}`).then(res => res.data),
  
  /**
   * Get creator's audio
   * @param {Object} params - Query parameters
   */
  getMyAudio: (params) => api.get('/creator/audio', { params }).then(res => res.data),
  
  // ============================================
  // BULK OPERATIONS
  // ============================================
  
  /**
   * Bulk delete content
   * @param {Object} data - { ids: [], type: string }
   */
  bulkDelete: (data) => api.post('/creator/bulk-delete', data).then(res => res.data),
  
  /**
   * Bulk update status
   * @param {Object} data - { ids: [], type: string, status: string }
   */
  bulkUpdateStatus: (data) => api.post('/creator/bulk-update-status', data).then(res => res.data),
  
  /**
   * Bulk upload books (admin only)
   * @param {Array} books - Array of book data objects
   */
  bulkUploadBooks: (books) => api.post('/books/bulk', { books }).then(res => res.data),
  
  // ============================================
  // ANALYTICS & REPORTS
  // ============================================
  
  /**
   * Get detailed content analytics
   * @param {Object} params - { startDate, endDate, type }
   */
  getContentAnalytics: (params) => api.get('/creator/content-analytics', { params }).then(res => res.data),
  
  /**
   * Get earning reports
   * @param {Object} params - { year, month }
   */
  getEarningReports: (params) => api.get('/creator/earning-reports', { params }).then(res => res.data),
  
  /**
   * Get top performing content
   * @param {Object} params - { limit, type }
   */
  getTopContent: (params) => api.get('/creator/top-content', { params }).then(res => res.data),
  
  /**
   * Get book analytics (downloads, views, ratings)
   * @param {string} id - Book ID
   */
  getBookAnalytics: (id) => api.get(`/books/${id}/analytics`).then(res => res.data),
  
  // ============================================
  // UPLOAD PRESETS & CONFIGURATION
  // ============================================
  
  /**
   * Get upload presets (categories, types, etc.)
   */
  getUploadPresets: () => api.get('/creator/upload-presets').then(res => res.data),
  
  /**
   * Get book genres list
   */
  getBookGenres: () => api.get('/books/genres').then(res => res.data),
  
  /**
   * Get categories for books
   */
  getBookCategories: () => api.get('/categories?type=book').then(res => res.data),
  
  /**
   * Validate file before upload
   * @param {Object} data - { fileType, fileSize, mimeType }
   */
  validateFile: (data) => api.post('/creator/validate-file', data).then(res => res.data),
  
  /**
   * Get upload limits and allowed file types
   */
  getUploadLimits: () => api.get('/creator/upload-limits').then(res => res.data),
}

export default creatorAPI
// export default creatorAPI
