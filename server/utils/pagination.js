// export const getPagination = (req) => {
//   const page = Math.max(1, parseInt(req.query.page) || 1);
//   const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
//   const skip = (page - 1) * limit;

//   return { page, limit, skip };
// };

// export const getSort = (req, defaultSort = '-createdAt') => {
//   const allowedSorts = ['createdAt', '-createdAt', 'title', '-title', 'views', '-views', 'likes', '-likes'];
//   const sort = allowedSorts.includes(req.query.sort) ? req.query.sort : defaultSort;
//   return sort;
// };

// export const getFilters = (req, allowedFilters = []) => {
//   const filters = {};
//   allowedFilters.forEach(filter => {
//     if (req.query[filter] !== undefined) {
//       filters[filter] = req.query[filter];
//     }
//   });
//   return filters;
// };




// server/utils/pagination.js

/**
 * Get pagination parameters from request query
 * @param {Object} req - Express request object
 * @returns {Object} { page, limit, skip }
 */
export const getPagination = (req) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

/**
 * Get sort parameters from request query with support for multiple sort fields
 * @param {Object} req - Express request object
 * @param {Object} defaultSort - Default sort object (e.g., { createdAt: -1 })
 * @returns {Object} Sort object for MongoDB
 */
export const getSort = (req, defaultSort = { createdAt: -1 }) => {
  const sortField = req.query.sort;
  const sortOrder = req.query.order === 'asc' ? 1 : -1;
  
  // Define sort mapping for common sort options
  const sortMap = {
    'popular': { 'stats.views': -1, 'stats.likes': -1 },
    'recent': { createdAt: -1 },
    'oldest': { createdAt: 1 },
    'views': { 'stats.views': -1 },
    'likes': { 'stats.likes': -1 },
    'title_asc': { title: 1 },
    'title_desc': { title: -1 },
    'title': { title: 1 },
    '-title': { title: -1 },
    'createdAt': { createdAt: 1 },
    '-createdAt': { createdAt: -1 },
    'views_desc': { 'stats.views': -1 },
    'views_asc': { 'stats.views': 1 },
    'likes_desc': { 'stats.likes': -1 },
    'likes_asc': { 'stats.likes': 1 }
  };
  
  // If sort is provided as a string
  if (sortField && typeof sortField === 'string') {
    // Check if it's a predefined sort option
    if (sortMap[sortField]) {
      return sortMap[sortField];
    }
    
    // Handle field:order format (e.g., 'title:asc', 'createdAt:desc')
    if (sortField.includes(':')) {
      const [field, order] = sortField.split(':');
      const sortOrderValue = order === 'asc' || order === '1' ? 1 : -1;
      return { [field]: sortOrderValue };
    }
    
    // Handle MongoDB-style sort strings (e.g., '-createdAt', 'title')
    if (sortField.startsWith('-')) {
      const field = sortField.substring(1);
      return { [field]: -1 };
    } else {
      return { [sortField]: 1 };
    }
  }
  
  // If sort is provided as an object (for backward compatibility)
  if (sortField && typeof sortField === 'object') {
    return sortField;
  }
  
  // Return default sort
  return defaultSort;
};

/**
 * Get filters from request query with support for multiple value filters
 * @param {Object} req - Express request object
 * @param {Array} allowedFilters - Array of allowed filter fields
 * @returns {Object} Filters object for MongoDB
 */
export const getFilters = (req, allowedFilters = []) => {
  const filters = {};
  
  allowedFilters.forEach(filter => {
    const filterValue = req.query[filter];
    
    if (filterValue !== undefined && filterValue !== null && filterValue !== '') {
      // Handle array filters (e.g., genre=ghazal&genre=nazm)
      if (Array.isArray(filterValue)) {
        filters[filter] = { $in: filterValue };
      }
      // Handle single value filters
      else if (typeof filterValue === 'string') {
        // Skip 'all' value for genre
        if (filter === 'genre' && filterValue === 'all') {
          return;
        }
        filters[filter] = filterValue;
      }
      // Handle numeric or other types
      else {
        filters[filter] = filterValue;
      }
    }
  });
  
  return filters;
};

/**
 * Get search filter with support for multiple fields
 * @param {Object} req - Express request object
 * @param {Array} searchFields - Fields to search in (default: ['title', 'content', 'contentUrdu', 'contentHindi'])
 * @returns {Object|null} Search filter object or null if no search query
 */
export const getSearchFilter = (req, searchFields = ['title', 'content', 'contentUrdu', 'contentHindi']) => {
  const searchQuery = req.query.search;
  
  if (!searchQuery || !searchQuery.trim()) {
    return null;
  }
  
  const searchTerm = searchQuery.trim();
  const searchRegex = new RegExp(searchTerm, 'i');
  
  // Create OR conditions for each search field
  const orConditions = searchFields.map(field => ({
    [field]: searchRegex
  }));
  
  // Add tags search
  orConditions.push({ tags: { $in: [searchRegex] } });
  
  return {
    $or: orConditions
  };
};

/**
 * Build complete query object from request
 * @param {Object} req - Express request object
 * @param {Object} options - Additional options
 * @returns {Object} Complete query object
 */
export const buildQuery = (req, options = {}) => {
  const {
    allowedFilters = [],
    searchFields = ['title', 'content', 'contentUrdu', 'contentHindi'],
    isAdmin = false
  } = options;
  
  let query = {};
  
  // Add filters
  const filters = getFilters(req, allowedFilters);
  Object.assign(query, filters);
  
  // Add search filter
  const searchFilter = getSearchFilter(req, searchFields);
  if (searchFilter) {
    Object.assign(query, searchFilter);
  }
  
  // Add author search (special handling)
  const authorSearch = req.query.author;
  if (authorSearch && authorSearch.trim()) {
    query.author = authorSearch;
  }
  
  // Only show published poems for non-admin
  if (!isAdmin) {
    query.isPublished = true;
  }
  
  return query;
};

/**
 * Build complete options object for find query
 * @param {Object} req - Express request object
 * @param {Object} options - Additional options
 * @returns {Object} Options object with sort, skip, limit
 */
export const getQueryOptions = (req, options = {}) => {
  const { page, limit, skip } = getPagination(req);
  const sort = getSort(req, options.defaultSort || { createdAt: -1 });
  
  return {
    sort,
    skip,
    limit,
    page,
    limitValue: limit
  };
};

/**
 * Get pagination metadata for response
 * @param {number} total - Total number of documents
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @returns {Object} Pagination metadata
 */
export const getPaginationMetadata = (total, page, limit) => {
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;
  
  return {
    total,
    page,
    limit,
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage: hasNextPage ? page + 1 : null,
    prevPage: hasPrevPage ? page - 1 : null
  };
};

/**
 * Apply pagination to a query
 * @param {Object} query - Mongoose query
 * @param {Object} req - Express request object
 * @returns {Promise<Array>} Paginated results
 */
export const applyPagination = async (query, req) => {
  const { sort, skip, limit } = getQueryOptions(req);
  return await query.sort(sort).skip(skip).limit(limit);
};

// Legacy exports for backward compatibility
export const getPaginationLegacy = getPagination;
export const getSortLegacy = getSort;
export const getFiltersLegacy = getFilters;