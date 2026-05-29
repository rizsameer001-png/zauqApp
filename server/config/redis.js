// import Redis from 'ioredis';

// const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
//   retryStrategy: (times) => {
//     return Math.min(times * 50, 2000);
//   }
// });

// redis.on('connect', () => console.log('✅ Redis Connected'));
// redis.on('error', (err) => console.error('❌ Redis Error:', err.message));

// export const cacheGet = async (key) => {
//   try {
//     const data = await redis.get(key);
//     return data ? JSON.parse(data) : null;
//   } catch (error) {
//     return null;
//   }
// };

// export const cacheSet = async (key, value, ttl = 3600) => {
//   try {
//     await redis.setex(key, ttl, JSON.stringify(value));
//     return true;
//   } catch (error) {
//     return false;
//   }
// };

// export const cacheDelete = async (pattern) => {
//   try {
//     const keys = await redis.keys(pattern);
//     if (keys.length > 0) {
//       await redis.del(...keys);
//     }
//     return true;
//   } catch (error) {
//     return false;
//   }
// };

// export default redis;




import Redis from 'ioredis';

let redis = null;
let redisAvailable = false;

const createRedisClient = () => {
  const client = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
    retryStrategy: (times) => {
      if (times > 3) {
        // Stop retrying after 3 attempts
        return null;
      }
      return Math.min(times * 50, 2000);
    },
    maxRetriesPerRequest: 1,
    enableOfflineQueue: false,
    lazyConnect: true
  });

  client.on('connect', () => {
    redisAvailable = true;
    console.log('✅ Redis Connected');
  });

  client.on('error', (err) => {
    redisAvailable = false;
    // Only log once to avoid spam
    if (!client.__errorLogged) {
      console.warn('⚠️  Redis unavailable, running without cache');
      client.__errorLogged = true;
    }
  });

  return client;
};

// Try to connect, but don't block startup
redis = createRedisClient();
redis.connect().catch(() => {
  redisAvailable = false;
});

export const cacheGet = async (key) => {
  if (!redisAvailable || !redis) return null;
  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    return null;
  }
};

export const cacheSet = async (key, value, ttl = 3600) => {
  if (!redisAvailable || !redis) return false;
  try {
    await redis.setex(key, ttl, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
};

export const cacheDelete = async (pattern) => {
  if (!redisAvailable || !redis) return false;
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
    return true;
  } catch (error) {
    return false;
  }
};

export default redis;