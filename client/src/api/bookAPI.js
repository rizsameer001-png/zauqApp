// // client/src/api/bookAPI.js
// import api from './apiConfig'

// const bookAPI = {
//   // ============================================
//   // BOOK CRUD OPERATIONS
//   // ============================================
  
//   // Get all books with pagination and filters
//   getBooks: (params) => api.get('/books', { params }).then(res => res.data),
  
//   // Get single book by slug
//   getBook: (slug) => api.get(`/books/${slug}`).then(res => res.data),
  
//   // Get featured books
//   getFeaturedBooks: () => api.get('/books/featured').then(res => res.data),
  
//   // Get books by author ID
//   getBooksByAuthor: (authorId, params) => api.get(`/books/author/${authorId}`, { params }).then(res => res.data),
  
//   // Get related books by slug
//   getRelatedBooks: (slug) => api.get(`/books/${slug}/related`).then(res => res.data),
  
//   // Get book reader info (PDF/EPUB URLs)
//   getBookReader: (slug) => api.get(`/books/${slug}/reader`).then(res => res.data),
  
//   // Get book preview (lightweight version)
//   getBookPreview: (slug) => api.get(`/books/${slug}/preview`).then(res => res.data),
  
//   // Get book pages for page-by-page reading
//   getBookPages: (slug) => api.get(`/books/${slug}/pages`).then(res => res.data),
  
//   // Get single page by number
//   getBookPage: (slug, pageNumber) => api.get(`/books/${slug}/page/${pageNumber}`).then(res => res.data),
  
//   // Download book
//   downloadBook: (slug) => api.get(`/books/${slug}/download`).then(res => res.data),
  
//   // Rate a book
//   rateBook: (id, rating, review) => api.post(`/books/${id}/rate`, { rating, review }).then(res => res.data),
  
//   // Create new book (admin only)
//   createBook: (data) => api.post('/books', data).then(res => res.data),
  
//   // Update book (admin only)
//   updateBook: (id, data) => api.put(`/books/${id}`, data).then(res => res.data),
  
//   // Delete book (admin only)
//   deleteBook: (id) => api.delete(`/books/${id}`).then(res => res.data),
  
//   // ============================================
//   // USER INTERACTION METHODS
//   // ============================================
  
//   // Like a book
//   likeBook: (id) => api.post(`/books/${id}/like`).then(res => res.data),
  
//   // Unlike a book
//   unlikeBook: (id) => api.delete(`/books/${id}/like`).then(res => res.data),
  
//   // Bookmark a book
//   bookmarkBook: (id) => api.post(`/books/${id}/bookmark`).then(res => res.data),
  
//   // Remove bookmark
//   removeBookmark: (id) => api.delete(`/books/${id}/bookmark`).then(res => res.data),
  
//   // ============================================
//   // STATISTICS METHODS
//   // ============================================
  
//   // Get popular books
//   getPopularBooks: (params) => api.get('/books/popular', { params }).then(res => res.data),
  
//   // Get new releases
//   getNewReleases: (params) => api.get('/books/new-releases', { params }).then(res => res.data),
  
//   // Get recommended books for user
//   getRecommendedBooks: (params) => api.get('/books/recommended', { params }).then(res => res.data),
// }

// export default bookAPI











// // client/src/api/bookAPI.js
// import api from './apiConfig'

// const bookAPI = {
//   // ============================================
//   // BOOK CRUD OPERATIONS
//   // ============================================
  
//   // Get all books with pagination and filters
//   getBooks: (params) => api.get('/books', { params }).then(res => res.data),
  
//   // Get single book by slug
//   getBook: (slug) => api.get(`/books/${slug}`).then(res => res.data),
  
//   // Get featured books
//   getFeaturedBooks: () => api.get('/books/featured').then(res => res.data),
  
//   // Get books by author ID
//   getBooksByAuthor: (authorId, params) => api.get(`/books/author/${authorId}`, { params }).then(res => res.data),
  
//   // Get related books by slug
//   getRelatedBooks: (slug) => api.get(`/books/${slug}/related`).then(res => res.data),
  
//   // Get book reader info (PDF/EPUB URLs)
//   getBookReader: (slug) => api.get(`/books/${slug}/reader`).then(res => res.data),
  
//   // Get book preview (lightweight version)
//   getBookPreview: (slug) => api.get(`/books/${slug}/preview`).then(res => res.data),
  
//   // Get book pages for page-by-page reading
//   getBookPages: (slug) => api.get(`/books/${slug}/pages`).then(res => res.data),
  
//   // Get single page by number
//   getBookPage: (slug, pageNumber) => api.get(`/books/${slug}/page/${pageNumber}`).then(res => res.data),
  
//   // Download book
//   downloadBook: (slug) => api.get(`/books/${slug}/download`).then(res => res.data),
  
//   // Rate a book
//   rateBook: (id, rating, review) => api.post(`/books/${id}/rate`, { rating, review }).then(res => res.data),
  
//   // Create new book (admin only)
//   createBook: (data) => api.post('/books', data).then(res => res.data),
  
//   // Update book (admin only)
//   updateBook: (id, data) => api.put(`/books/${id}`, data).then(res => res.data),
  
//   // Delete book (admin only)
//   deleteBook: (id) => api.delete(`/books/${id}`).then(res => res.data),
  
//   // ============================================
//   // USER INTERACTION METHODS
//   // ============================================
  
//   // ============================================
//   // FIX: UPDATED LIKE/UNLIKE METHODS
//   // Now returns consistent response with liked status and count
//   // ============================================
  
//   // Like a book (POST request)
//   likeBook: async (id) => {
//     const response = await api.post(`/books/${id}/like`);
//     return response.data;
//   },
  
//   // Unlike a book (DELETE request)
//   unlikeBook: async (id) => {
//     const response = await api.delete(`/books/${id}/like`);
//     return response.data;
//   },
  
//   // Toggle like (automatically determines like/unlike based on current state)
//   toggleLike: async (id, currentLikedState) => {
//     if (currentLikedState) {
//       return await bookAPI.unlikeBook(id);
//     } else {
//       return await bookAPI.likeBook(id);
//     }
//   },
  
//   // Get like status for a book
//   getLikeStatus: async (id) => {
//     const response = await api.get(`/books/${id}/like-status`);
//     return response.data;
//   },
  
//   // ============================================
//   // FIX: UPDATED BOOKMARK METHODS
//   // ============================================
  
//   // Bookmark a book (POST request)
//   bookmarkBook: async (id) => {
//     const response = await api.post(`/books/${id}/bookmark`);
//     return response.data;
//   },
  
//   // Remove bookmark (DELETE request)
//   removeBookmark: async (id) => {
//     const response = await api.delete(`/books/${id}/bookmark`);
//     return response.data;
//   },
  
//   // Toggle bookmark (automatically determines add/remove based on current state)
//   toggleBookmark: async (id, currentBookmarkedState) => {
//     if (currentBookmarkedState) {
//       return await bookAPI.removeBookmark(id);
//     } else {
//       return await bookAPI.bookmarkBook(id);
//     }
//   },
  
//   // Get bookmark status for a book
//   getBookmarkStatus: async (id) => {
//     const response = await api.get(`/books/${id}/bookmark-status`);
//     return response.data;
//   },
  
//   // ============================================
//   // BULK OPERATIONS
//   // ============================================
  
//   // Like multiple books at once
//   bulkLikeBooks: async (ids) => {
//     const response = await api.post('/books/bulk/like', { ids });
//     return response.data;
//   },
  
//   // Bookmark multiple books at once
//   bulkBookmarkBooks: async (ids) => {
//     const response = await api.post('/books/bulk/bookmark', { ids });
//     return response.data;
//   },
  
//   // Get liked books for current user
//   getLikedBooks: async (params) => {
//     const response = await api.get('/books/user/likes', { params });
//     return response.data;
//   },
  
//   // Get bookmarked books for current user
//   getBookmarkedBooks: async (params) => {
//     const response = await api.get('/books/user/bookmarks', { params });
//     return response.data;
//   },
  
//   // ============================================
//   // STATISTICS METHODS
//   // ============================================
  
//   // Get popular books
//   getPopularBooks: (params) => api.get('/books/popular', { params }).then(res => res.data),
  
//   // Get new releases
//   getNewReleases: (params) => api.get('/books/new-releases', { params }).then(res => res.data),
  
//   // Get recommended books for user
//   getRecommendedBooks: (params) => api.get('/books/recommended', { params }).then(res => res.data),
  
//   // Get book statistics (likes, bookmarks, views, downloads)
//   getBookStats: (id) => api.get(`/books/${id}/stats`).then(res => res.data),
  
//   // ============================================
//   // HELPER METHODS
//   // ============================================
  
//   // Extract book ID from slug (if needed)
//   getBookIdFromSlug: async (slug) => {
//     try {
//       const book = await bookAPI.getBook(slug);
//       return book.data?._id || null;
//     } catch (error) {
//       console.error('Error getting book ID from slug:', error);
//       return null;
//     }
//   },
  
//   // Check if a book exists by slug
//   bookExists: async (slug) => {
//     try {
//       await bookAPI.getBook(slug);
//       return true;
//     } catch (error) {
//       return false;
//     }
//   }
// }

// export default bookAPI














// // client/src/api/bookAPI.js
// import api from './apiConfig'

// const bookAPI = {
//   // ============================================
//   // BOOK CRUD OPERATIONS
//   // ============================================
  
//   // Get all books with pagination and filters
//   getBooks: (params) => api.get('/books', { params }).then(res => res.data),
  
//   // Get single book by slug
//   getBook: (slug) => api.get(`/books/${slug}`).then(res => res.data),
  
//   // Get featured books
//   getFeaturedBooks: () => api.get('/books/featured').then(res => res.data),
  
//   // Get books by author ID
//   getBooksByAuthor: (authorId, params) => api.get(`/books/author/${authorId}`, { params }).then(res => res.data),
  
//   // Get related books by slug
//   getRelatedBooks: (slug) => api.get(`/books/${slug}/related`).then(res => res.data),
  
//   // Get book reader info (PDF/EPUB URLs)
//   getBookReader: (slug) => api.get(`/books/${slug}/reader`).then(res => res.data),
  
//   // Get book preview (lightweight version)
//   getBookPreview: (slug) => api.get(`/books/${slug}/preview`).then(res => res.data),
  
//   // Get book pages for page-by-page reading
//   getBookPages: (slug) => api.get(`/books/${slug}/pages`).then(res => res.data),
  
//   // Get single page by number
//   getBookPage: (slug, pageNumber) => api.get(`/books/${slug}/page/${pageNumber}`).then(res => res.data),
  
//   // Download book
//   downloadBook: (slug) => api.get(`/books/${slug}/download`).then(res => res.data),
  
//   // Rate a book
//   rateBook: (id, rating, review) => api.post(`/books/${id}/rate`, { rating, review }).then(res => res.data),
  
//   // Create new book (admin only)
//   createBook: (data) => api.post('/books', data).then(res => res.data),
  
//   // Update book (admin only)
//   updateBook: (id, data) => api.put(`/books/${id}`, data).then(res => res.data),
  
//   // Delete book (admin only)
//   deleteBook: (id) => api.delete(`/books/${id}`).then(res => res.data),
  
//   // ============================================
//   // EXPORT FUNCTION (Admin only - Backup)
//   // ============================================
  
//   // Export books to JSON or CSV file
//   // @param {Object} params - { format: 'json'|'csv', includeUnpublished: boolean, includeStats: boolean }
//   // @returns {Promise<Blob>} - Returns blob for file download
//   exportBooks: async (params = {}) => {
//     const queryString = new URLSearchParams();
//     if (params.format) queryString.append('format', params.format);
//     if (params.includeUnpublished) queryString.append('includeUnpublished', 'true');
//     if (params.includeStats) queryString.append('includeStats', 'true');
    
//     const url = `/books/export/all${queryString.toString() ? `?${queryString.toString()}` : ''}`;
    
//     const response = await api.get(url, {
//       responseType: 'blob',
//       headers: {
//         'Accept': params.format === 'csv' ? 'text/csv' : 'application/json'
//       }
//     });
    
//     return response;
//   },
  
//   // Export single book by ID (admin only)
//   // @param {string} id - Book ID
//   // @param {Object} params - { includeStats: boolean }
//   // @returns {Promise<Blob>} - Returns blob for file download
//   exportSingleBook: async (id, params = {}) => {
//     const queryString = new URLSearchParams();
//     if (params.includeStats) queryString.append('includeStats', 'true');
    
//     const url = `/books/export/${id}${queryString.toString() ? `?${queryString.toString()}` : ''}`;
    
//     const response = await api.get(url, {
//       responseType: 'blob',
//       headers: {
//         'Accept': 'application/json'
//       }
//     });
    
//     return response;
//   },
  
//   // ============================================
//   // BULK IMPORT FUNCTION (Admin only - Restore)
//   // ============================================
  
//   // Bulk upload books from JSON data
//   // @param {Array} booksData - Array of book objects
//   // @returns {Promise<Object>} - Returns success/error counts
//   bulkUploadBooks: async (booksData) => {
//     const response = await api.post('/books/bulk', booksData);
//     return response.data;
//   },
  
//   // ============================================
//   // USER INTERACTION METHODS
//   // ============================================
  
//   // ============================================
//   // FIX: UPDATED LIKE/UNLIKE METHODS
//   // Now returns consistent response with liked status and count
//   // ============================================
  
//   // Like a book (POST request)
//   likeBook: async (id) => {
//     const response = await api.post(`/books/${id}/like`);
//     return response.data;
//   },
  
//   // Unlike a book (DELETE request)
//   unlikeBook: async (id) => {
//     const response = await api.delete(`/books/${id}/like`);
//     return response.data;
//   },
  
//   // Toggle like (automatically determines like/unlike based on current state)
//   toggleLike: async (id, currentLikedState) => {
//     if (currentLikedState) {
//       return await bookAPI.unlikeBook(id);
//     } else {
//       return await bookAPI.likeBook(id);
//     }
//   },
  
//   // Get like status for a book
//   getLikeStatus: async (id) => {
//     const response = await api.get(`/books/${id}/like-status`);
//     return response.data;
//   },
  
//   // ============================================
//   // FIX: UPDATED BOOKMARK METHODS
//   // ============================================
  
//   // Bookmark a book (POST request)
//   bookmarkBook: async (id) => {
//     const response = await api.post(`/books/${id}/bookmark`);
//     return response.data;
//   },
  
//   // Remove bookmark (DELETE request)
//   removeBookmark: async (id) => {
//     const response = await api.delete(`/books/${id}/bookmark`);
//     return response.data;
//   },
  
//   // Toggle bookmark (automatically determines add/remove based on current state)
//   toggleBookmark: async (id, currentBookmarkedState) => {
//     if (currentBookmarkedState) {
//       return await bookAPI.removeBookmark(id);
//     } else {
//       return await bookAPI.bookmarkBook(id);
//     }
//   },
  
//   // Get bookmark status for a book
//   getBookmarkStatus: async (id) => {
//     const response = await api.get(`/books/${id}/bookmark-status`);
//     return response.data;
//   },
  
//   // ============================================
//   // BULK OPERATIONS
//   // ============================================
  
//   // Like multiple books at once
//   bulkLikeBooks: async (ids) => {
//     const response = await api.post('/books/bulk/like', { ids });
//     return response.data;
//   },
  
//   // Bookmark multiple books at once
//   bulkBookmarkBooks: async (ids) => {
//     const response = await api.post('/books/bulk/bookmark', { ids });
//     return response.data;
//   },
  
//   // Get liked books for current user
//   getLikedBooks: async (params) => {
//     const response = await api.get('/books/user/likes', { params });
//     return response.data;
//   },
  
//   // Get bookmarked books for current user
//   getBookmarkedBooks: async (params) => {
//     const response = await api.get('/books/user/bookmarks', { params });
//     return response.data;
//   },
  
//   // ============================================
//   // STATISTICS METHODS
//   // ============================================
  
//   // Get popular books
//   getPopularBooks: (params) => api.get('/books/popular', { params }).then(res => res.data),
  
//   // Get new releases
//   getNewReleases: (params) => api.get('/books/new-releases', { params }).then(res => res.data),
  
//   // Get recommended books for user
//   getRecommendedBooks: (params) => api.get('/books/recommended', { params }).then(res => res.data),
  
//   // Get book statistics (likes, bookmarks, views, downloads)
//   getBookStats: (id) => api.get(`/books/${id}/stats`).then(res => res.data),
  
//   // ============================================
//   // HELPER METHODS
//   // ============================================
  
//   // Extract book ID from slug (if needed)
//   getBookIdFromSlug: async (slug) => {
//     try {
//       const book = await bookAPI.getBook(slug);
//       return book.data?._id || null;
//     } catch (error) {
//       console.error('Error getting book ID from slug:', error);
//       return null;
//     }
//   },
  
//   // Check if a book exists by slug
//   bookExists: async (slug) => {
//     try {
//       await bookAPI.getBook(slug);
//       return true;
//     } catch (error) {
//       return false;
//     }
//   }
// }

// export default bookAPI




















// client/src/api/bookAPI.js
import api from './apiConfig'

const bookAPI = {
  // ============================================
  // BOOK CRUD OPERATIONS
  // ============================================
  
  // Get all books with pagination and filters
  getBooks: async (params = {}) => {
    try {
      const response = await api.get('/books', { params });
      const result = response.data;
      
      // If the response already has proper pagination structure
      if (result?.pagination || result?.data?.pagination) {
        return result;
      }
      
      // If response is an array, wrap it with pagination
      if (Array.isArray(result)) {
        return {
          data: result,
          pagination: {
            page: params.page || 1,
            limit: params.limit || 10,
            total: result.length,
            totalPages: Math.ceil(result.length / (params.limit || 10))
          }
        };
      }
      
      // If response has data array but no pagination
      if (result?.data && Array.isArray(result.data)) {
        return {
          data: result.data,
          pagination: result.pagination || {
            page: params.page || 1,
            limit: params.limit || 10,
            total: result.data.length,
            totalPages: Math.ceil(result.data.length / (params.limit || 10))
          }
        };
      }
      
      // Default return
      return result;
    } catch (error) {
      console.error('Error in getBooks:', error);
      throw error;
    }
  },
  
  // Get single book by slug
  getBook: (slug) => api.get(`/books/${slug}`).then(res => res.data),
  
  // Get featured books
  getFeaturedBooks: () => api.get('/books/featured').then(res => res.data),
  
  // Get books by author ID
  getBooksByAuthor: async (authorId, params = {}) => {
    const response = await api.get(`/books/author/${authorId}`, { params });
    const result = response.data;
    
    // Ensure pagination structure
    if (Array.isArray(result?.data)) {
      return {
        data: result.data,
        pagination: result.pagination || {
          page: params.page || 1,
          limit: params.limit || 10,
          total: result.data.length,
          totalPages: Math.ceil(result.data.length / (params.limit || 10))
        }
      };
    }
    return result;
  },
  
  // Get related books by slug
  getRelatedBooks: (slug) => api.get(`/books/${slug}/related`).then(res => res.data),
  
  // Get book reader info (PDF/EPUB URLs)
  getBookReader: (slug) => api.get(`/books/${slug}/reader`).then(res => res.data),
  
  // Get book preview (lightweight version)
  getBookPreview: (slug) => api.get(`/books/${slug}/preview`).then(res => res.data),
  
  // Get book pages for page-by-page reading
  getBookPages: (slug) => api.get(`/books/${slug}/pages`).then(res => res.data),
  
  // Get single page by number
  getBookPage: (slug, pageNumber) => api.get(`/books/${slug}/page/${pageNumber}`).then(res => res.data),
  
  // Download book
  downloadBook: (slug) => api.get(`/books/${slug}/download`).then(res => res.data),
  
  // Rate a book
  rateBook: (id, rating, review) => api.post(`/books/${id}/rate`, { rating, review }).then(res => res.data),
  
  // Create new book (admin only)
  createBook: (data) => api.post('/books', data).then(res => res.data),
  
  // Update book (admin only)
  updateBook: (id, data) => api.put(`/books/${id}`, data).then(res => res.data),
  
  // Delete book (admin only)
  deleteBook: (id) => api.delete(`/books/${id}`).then(res => res.data),
  
  // ============================================
  // EXPORT FUNCTION (Admin only - Backup)
  // ============================================
  
  // Export books to JSON or CSV file
  // @param {Object} params - { format: 'json'|'csv', includeUnpublished: boolean, includeStats: boolean }
  // @returns {Promise<Blob>} - Returns blob for file download
  exportBooks: async (params = {}) => {
    const queryString = new URLSearchParams();
    if (params.format) queryString.append('format', params.format);
    if (params.includeUnpublished) queryString.append('includeUnpublished', 'true');
    if (params.includeStats) queryString.append('includeStats', 'true');
    
    const url = `/books/export/all${queryString.toString() ? `?${queryString.toString()}` : ''}`;
    
    const response = await api.get(url, {
      responseType: 'blob',
      headers: {
        'Accept': params.format === 'csv' ? 'text/csv' : 'application/json'
      }
    });
    
    return response;
  },
  
  // Export single book by ID (admin only)
  // @param {string} id - Book ID
  // @param {Object} params - { includeStats: boolean }
  // @returns {Promise<Blob>} - Returns blob for file download
  exportSingleBook: async (id, params = {}) => {
    const queryString = new URLSearchParams();
    if (params.includeStats) queryString.append('includeStats', 'true');
    
    const url = `/books/export/${id}${queryString.toString() ? `?${queryString.toString()}` : ''}`;
    
    const response = await api.get(url, {
      responseType: 'blob',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    return response;
  },
  
  // ============================================
  // BULK IMPORT FUNCTION (Admin only - Restore)
  // ============================================
  
  // Bulk upload books from JSON data
  // @param {Array} booksData - Array of book objects
  // @returns {Promise<Object>} - Returns success/error counts
  bulkUploadBooks: async (booksData) => {
    const response = await api.post('/books/bulk', booksData);
    return response.data;
  },
  
  // ============================================
  // USER INTERACTION METHODS
  // ============================================
  
  // ============================================
  // FIX: UPDATED LIKE/UNLIKE METHODS
  // Now returns consistent response with liked status and count
  // ============================================
  
  // Like a book (POST request)
  likeBook: async (id) => {
    const response = await api.post(`/books/${id}/like`);
    return response.data;
  },
  
  // Unlike a book (DELETE request)
  unlikeBook: async (id) => {
    const response = await api.delete(`/books/${id}/like`);
    return response.data;
  },
  
  // Toggle like (automatically determines like/unlike based on current state)
  toggleLike: async (id, currentLikedState) => {
    if (currentLikedState) {
      return await bookAPI.unlikeBook(id);
    } else {
      return await bookAPI.likeBook(id);
    }
  },
  
  // Get like status for a book
  getLikeStatus: async (id) => {
    const response = await api.get(`/books/${id}/like-status`);
    return response.data;
  },
  
  // ============================================
  // FIX: UPDATED BOOKMARK METHODS
  // ============================================
  
  // Bookmark a book (POST request)
  bookmarkBook: async (id) => {
    const response = await api.post(`/books/${id}/bookmark`);
    return response.data;
  },
  
  // Remove bookmark (DELETE request)
  removeBookmark: async (id) => {
    const response = await api.delete(`/books/${id}/bookmark`);
    return response.data;
  },
  
  // Toggle bookmark (automatically determines add/remove based on current state)
  toggleBookmark: async (id, currentBookmarkedState) => {
    if (currentBookmarkedState) {
      return await bookAPI.removeBookmark(id);
    } else {
      return await bookAPI.bookmarkBook(id);
    }
  },
  
  // Get bookmark status for a book
  getBookmarkStatus: async (id) => {
    const response = await api.get(`/books/${id}/bookmark-status`);
    return response.data;
  },
  
  // ============================================
  // BULK OPERATIONS
  // ============================================
  
  // Like multiple books at once
  bulkLikeBooks: async (ids) => {
    const response = await api.post('/books/bulk/like', { ids });
    return response.data;
  },
  
  // Bookmark multiple books at once
  bulkBookmarkBooks: async (ids) => {
    const response = await api.post('/books/bulk/bookmark', { ids });
    return response.data;
  },
  
  // Get liked books for current user
  getLikedBooks: async (params) => {
    const response = await api.get('/books/user/likes', { params });
    return response.data;
  },
  
  // Get bookmarked books for current user
  getBookmarkedBooks: async (params) => {
    const response = await api.get('/books/user/bookmarks', { params });
    return response.data;
  },
  
  // ============================================
  // STATISTICS METHODS
  // ============================================
  
  // Get popular books
  getPopularBooks: (params) => api.get('/books/popular', { params }).then(res => res.data),
  
  // Get new releases
  getNewReleases: (params) => api.get('/books/new-releases', { params }).then(res => res.data),
  
  // Get recommended books for user
  getRecommendedBooks: (params) => api.get('/books/recommended', { params }).then(res => res.data),
  
  // Get book statistics (likes, bookmarks, views, downloads)
  getBookStats: (id) => api.get(`/books/${id}/stats`).then(res => res.data),
  
  // ============================================
  // HELPER METHODS
  // ============================================
  
  // Extract book ID from slug (if needed)
  getBookIdFromSlug: async (slug) => {
    try {
      const book = await bookAPI.getBook(slug);
      return book.data?._id || null;
    } catch (error) {
      console.error('Error getting book ID from slug:', error);
      return null;
    }
  },
  
  // Check if a book exists by slug
  bookExists: async (slug) => {
    try {
      await bookAPI.getBook(slug);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default bookAPI