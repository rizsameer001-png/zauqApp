export const getPagination = (req) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

export const getSort = (req, defaultSort = '-createdAt') => {
  const allowedSorts = ['createdAt', '-createdAt', 'title', '-title', 'views', '-views', 'likes', '-likes'];
  const sort = allowedSorts.includes(req.query.sort) ? req.query.sort : defaultSort;
  return sort;
};

export const getFilters = (req, allowedFilters = []) => {
  const filters = {};
  allowedFilters.forEach(filter => {
    if (req.query[filter] !== undefined) {
      filters[filter] = req.query[filter];
    }
  });
  return filters;
};
