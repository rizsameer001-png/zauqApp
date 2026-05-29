import { cacheGet, cacheSet, cacheDelete } from '../config/redis.js';

export const cacheMiddleware = (ttl = 3600, keyGenerator) => {
  return async (req, res, next) => {
    const cacheKey = keyGenerator 
      ? keyGenerator(req) 
      : `cache:${req.originalUrl}:${JSON.stringify(req.query)}`;

    try {
      const cached = await cacheGet(cacheKey);
      if (cached) {
        return res.json(cached);
      }

      // Override res.json to cache response
      const originalJson = res.json.bind(res);
      res.json = (data) => {
        if (res.statusCode < 400) {
          cacheSet(cacheKey, data, ttl).catch(console.error);
        }
        return originalJson(data);
      };

      next();
    } catch (error) {
      next();
    }
  };
};

export const clearCache = (pattern) => {
  return async (req, res, next) => {
    const originalJson = res.json.bind(res);
    res.json = (data) => {
      if (res.statusCode < 400) {
        cacheDelete(pattern).catch(console.error);
      }
      return originalJson(data);
    };
    next();
  };
};
