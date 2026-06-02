// server/middleware/rateLimiter.js
import UsageLog from '../models/UsageLog.js';

// User rate limits (requests per day)
const DAILY_LIMITS = {
  free: 10,
  basic: 25,
  premium: 100,
  admin: 1000
};

export const checkAILimit = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const userPlan = req.user?.subscription?.plan || 'free';
    
    if (!userId) {
      // Non-logged in users get 5 requests
      const ipAddress = req.ip;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const count = await UsageLog.countDocuments({
        ipAddress,
        timestamp: { $gte: today },
        requestType: { $in: ['poem_generation', 'poem_analysis'] }
      });
      
      if (count >= 5) {
        return res.status(429).json({
          success: false,
          message: 'Daily limit reached. Please login for more requests.',
          limit: 5,
          remaining: 0
        });
      }
      
      req.remainingLimit = 5 - count;
      return next();
    }
    
    const dailyLimit = DAILY_LIMITS[userPlan] || DAILY_LIMITS.free;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const count = await UsageLog.countDocuments({
      userId,
      timestamp: { $gte: today },
      requestType: { $in: ['poem_generation', 'poem_analysis'] }
    });
    
    if (count >= dailyLimit) {
      return res.status(429).json({
        success: false,
        message: `Daily AI request limit reached (${dailyLimit}/${dailyLimit}). Upgrade to premium for more.`,
        limit: dailyLimit,
        remaining: 0,
        plan: userPlan
      });
    }
    
    req.remainingLimit = dailyLimit - count;
    next();
  } catch (error) {
    console.error('Rate limit check error:', error);
    next(); // Allow on error
  }
};

// Track request after completion
export const trackRequest = async (req, res, next) => {
  const originalJson = res.json;
  
  res.json = function(data) {
    // Track after response is sent
    if (req.user?.id && req.aiRequestType) {
      UsageLog.create({
        userId: req.user.id,
        requestType: req.aiRequestType,
        provider: data?.provider || 'unknown',
        success: data?.success !== false,
        responseTime: Date.now() - (req.startTime || Date.now()),
        ipAddress: req.ip,
        userAgent: req.headers['user-agent']
      }).catch(console.error);
    }
    originalJson.call(this, data);
  };
  
  next();
};