// server/controllers/aiController.js
import { generatePoem, analyzePoem } from '../services/aiOrchestrator.js';

// Generate poem endpoint
export const generatePoemController = async (req, res, next) => {
  const startTime = Date.now();
  req.startTime = startTime;
  req.aiRequestType = 'poem_generation';
  
  try {
    const { title, theme, genre = 'ghazal', language = 'urdu', style = 'classical', forceRefresh = false } = req.body;
    
    // Validate required fields
    if (!title || !theme) {
      return res.status(400).json({
        success: false,
        message: 'Title and theme are required'
      });
    }
    
    // Validate genre
    const validGenres = ['ghazal', 'nazm', 'sher', 'rubai'];
    if (!validGenres.includes(genre)) {
      return res.status(400).json({
        success: false,
        message: `Invalid genre. Choose from: ${validGenres.join(', ')}`
      });
    }
    
    // Validate language
    const validLanguages = ['urdu', 'hindi', 'english'];
    if (!validLanguages.includes(language)) {
      return res.status(400).json({
        success: false,
        message: `Invalid language. Choose from: ${validLanguages.join(', ')}`
      });
    }
    
    // Generate poem using orchestrated AI
    const result = await generatePoem(
      { title, theme, genre, language, style, forceRefresh },
      req.user?.id
    );
    
    const responseTime = Date.now() - startTime;
    
    if (result.success) {
      return res.json({
        success: true,
        data: {
          title,
          theme,
          genre,
          language,
          content: result.content,
          analysis: result.analysis,
          provider: result.provider,
          fromCache: result.fromCache || false,
          responseTime
        },
        remainingLimit: req.remainingLimit
      });
    } else {
      return res.status(503).json({
        success: false,
        message: result.error,
        providers: result.providers
      });
    }
  } catch (error) {
    console.error('Generate poem error:', error);
    next(error);
  }
};

// Analyze poem endpoint
export const analyzePoemController = async (req, res, next) => {
  const startTime = Date.now();
  req.startTime = startTime;
  req.aiRequestType = 'poem_analysis';
  
  try {
    const { poemText, language = 'urdu', poemId } = req.body;
    
    if (!poemText || poemText.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Poem text is required (minimum 10 characters)'
      });
    }
    
    const result = await analyzePoem(poemText, language, req.user?.id);
    
    const responseTime = Date.now() - startTime;
    
    if (result.success) {
      return res.json({
        success: true,
        data: {
          analysis: result.analysis,
          provider: result.provider,
          fromCache: result.fromCache || false,
          responseTime,
          warning: result.warning || null
        },
        remainingLimit: req.remainingLimit
      });
    } else {
      return res.status(503).json({
        success: false,
        message: result.error
      });
    }
  } catch (error) {
    console.error('Analyze poem error:', error);
    next(error);
  }
};

// Get usage stats (for user dashboard)
export const getUsageStatsController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const [todayCount, totalCount, byProvider] = await Promise.all([
      UsageLog.countDocuments({
        userId,
        timestamp: { $gte: today },
        requestType: { $in: ['poem_generation', 'poem_analysis'] }
      }),
      UsageLog.countDocuments({
        userId,
        requestType: { $in: ['poem_generation', 'poem_analysis'] }
      }),
      UsageLog.aggregate([
        { $match: { userId, requestType: { $in: ['poem_generation', 'poem_analysis'] } } },
        { $group: { _id: '$provider', count: { $sum: 1 } } }
      ])
    ]);
    
    const plan = req.user?.subscription?.plan || 'free';
    const dailyLimit = { free: 10, basic: 25, premium: 100, admin: 1000 }[plan] || 10;
    
    res.json({
      success: true,
      data: {
        todayCount,
        totalCount,
        remainingToday: Math.max(0, dailyLimit - todayCount),
        dailyLimit,
        plan,
        byProvider: byProvider.reduce((acc, p) => {
          acc[p._id] = p.count;
          return acc;
        }, {})
      }
    });
  } catch (error) {
    next(error);
  }
};