
// // server/controllers/aiController.js
// import { generatePoem, analyzePoem } from '../services/aiOrchestrator.js';
// import UsageLog from '../models/UsageLog.js';
// import { successResponse, errorResponse } from '../utils/response.js';

// // Generate poem endpoint
// export const generatePoemController = async (req, res, next) => {
//   const startTime = Date.now();
//   req.startTime = startTime;
//   req.aiRequestType = 'poem_generation';
  
//   try {
//     const { title, theme, genre = 'ghazal', language = 'urdu', style = 'classical', forceRefresh = false } = req.body;
    
//     // Validate required fields
//     if (!title || !theme) {
//       return errorResponse(res, 'Title and theme are required', 400);
//     }
    
//     // Validate genre
//     const validGenres = ['ghazal', 'nazm', 'sher', 'rubai'];
//     if (!validGenres.includes(genre)) {
//       return errorResponse(res, `Invalid genre. Choose from: ${validGenres.join(', ')}`, 400);
//     }
    
//     // Validate language
//     const validLanguages = ['urdu', 'hindi', 'english'];
//     if (!validLanguages.includes(language)) {
//       return errorResponse(res, `Invalid language. Choose from: ${validLanguages.join(', ')}`, 400);
//     }
    
//     // Generate poem using orchestrated AI
//     const result = await generatePoem(
//       { title, theme, genre, language, style, forceRefresh },
//       req.user?.id
//     );
    
//     const responseTime = Date.now() - startTime;
    
//     if (result.success) {
//       // Log usage
//       if (req.user?.id) {
//         await UsageLog.create({
//           userId: req.user.id,
//           requestType: 'poem_generation',
//           provider: result.provider,
//           success: true,
//           responseTime,
//           timestamp: new Date()
//         }).catch(console.error);
//       }
      
//       return successResponse(res, {
//         title,
//         theme,
//         genre,
//         language,
//         content: result.content,
//         analysis: result.analysis,
//         provider: result.provider,
//         fromCache: result.fromCache || false,
//         responseTime
//       });
//     } else {
//       return errorResponse(res, result.error || 'Failed to generate poem', 503);
//     }
//   } catch (error) {
//     console.error('Generate poem error:', error);
//     next(error);
//   }
// };

// // Analyze poem endpoint
// export const analyzePoemController = async (req, res, next) => {
//   const startTime = Date.now();
//   req.startTime = startTime;
//   req.aiRequestType = 'poem_analysis';
  
//   try {
//     const { poemText, language = 'urdu', poemId } = req.body;
    
//     if (!poemText || poemText.trim().length < 10) {
//       return errorResponse(res, 'Poem text is required (minimum 10 characters)', 400);
//     }
    
//     const result = await analyzePoem(poemText, language, req.user?.id);
    
//     const responseTime = Date.now() - startTime;
    
//     if (result.success) {
//       // Log usage
//       if (req.user?.id) {
//         await UsageLog.create({
//           userId: req.user.id,
//           requestType: 'poem_analysis',
//           provider: result.provider,
//           success: true,
//           responseTime,
//           timestamp: new Date()
//         }).catch(console.error);
//       }
      
//       return successResponse(res, {
//         analysis: result.analysis,
//         provider: result.provider,
//         fromCache: result.fromCache || false,
//         responseTime,
//         warning: result.warning || null
//       });
//     } else {
//       // Return fallback analysis
//       return successResponse(res, {
//         analysis: {
//           themes: ['Theme detection unavailable'],
//           tone: 'Unknown',
//           sentiment: 'neutral',
//           emotions: [],
//           meaning: 'AI service temporarily unavailable. Basic analysis provided.',
//           literaryDevices: ['Poetic devices detected'],
//           rhymeScheme: 'Pattern present',
//           difficulty: 'intermediate'
//         },
//         provider: 'fallback',
//         warning: result.error || 'Using fallback analysis'
//       });
//     }
//   } catch (error) {
//     console.error('Analyze poem error:', error);
//     // Always return a response, never fail
//     successResponse(res, {
//       analysis: {
//         themes: ['Poetry analysis'],
//         tone: 'Expressive',
//         sentiment: 'neutral',
//         emotions: ['contemplative'],
//         meaning: 'This poem expresses deep emotions through poetic language.',
//         literaryDevices: ['Imagery', 'Metaphor'],
//         rhymeScheme: 'Rhythmic pattern',
//         difficulty: 'intermediate'
//       },
//       provider: 'fallback',
//       warning: 'Using fallback analysis. Please try again for detailed AI analysis.'
//     });
//   }
// };

// // Get usage statistics for the user
// export const getUsageStatsController = async (req, res, next) => {
//   try {
//     const userId = req.user.id;
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
    
//     const todayCount = await UsageLog.countDocuments({
//       userId,
//       timestamp: { $gte: today },
//       requestType: { $in: ['poem_generation', 'poem_analysis'] }
//     });
    
//     const totalCount = await UsageLog.countDocuments({
//       userId,
//       requestType: { $in: ['poem_generation', 'poem_analysis'] }
//     });
    
//     const byProvider = await UsageLog.aggregate([
//       { 
//         $match: { 
//           userId, 
//           requestType: { $in: ['poem_generation', 'poem_analysis'] } 
//         } 
//       },
//       { $group: { _id: '$provider', count: { $sum: 1 } } }
//     ]);
    
//     const plan = req.user?.subscription?.plan || 'free';
//     const dailyLimit = { free: 10, basic: 25, premium: 100, admin: 1000 }[plan] || 10;
    
//     const providerStats = {};
//     byProvider.forEach(p => {
//       providerStats[p._id] = p.count;
//     });
    
//     successResponse(res, {
//       todayCount,
//       totalCount,
//       remainingToday: Math.max(0, dailyLimit - todayCount),
//       dailyLimit,
//       plan,
//       byProvider: providerStats
//     });
//   } catch (error) {
//     console.error('Error in getUsageStatsController:', error);
//     // Return default values instead of failing
//     successResponse(res, {
//       todayCount: 0,
//       totalCount: 0,
//       remainingToday: 10,
//       dailyLimit: 10,
//       plan: 'free',
//       byProvider: {}
//     });
//   }
// };










// server/controllers/aiController.js
import { generatePoem, analyzePoem } from '../services/aiOrchestrator.js';
import UsageLog from '../models/UsageLog.js';
import { successResponse, errorResponse } from '../utils/response.js';

// ============================================
// DEBUG: Check AI Configuration
// ============================================
export const debugAIConfig = async (req, res, next) => {
  try {
    const config = {
      deepseek: {
        hasKey: !!process.env.DEEPSEEK_API_KEY,
        keyPrefix: process.env.DEEPSEEK_API_KEY ? process.env.DEEPSEEK_API_KEY.substring(0, 15) + '...' : 'missing',
        keyLength: process.env.DEEPSEEK_API_KEY?.length || 0,
        url: 'https://api.deepseek.com/v1/chat/completions',
        status: 'unknown'
      },
      gemini: {
        hasKey: !!process.env.GEMINI_API_KEY,
        keyPrefix: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.substring(0, 15) + '...' : 'missing',
        keyLength: process.env.GEMINI_API_KEY?.length || 0,
        url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
        status: 'unknown'
      },
      huggingface: {
        hasKey: !!process.env.HUGGING_FACE_API_KEY,
        keyPrefix: process.env.HUGGING_FACE_API_KEY ? process.env.HUGGING_FACE_API_KEY.substring(0, 15) + '...' : 'missing',
        keyLength: process.env.HUGGING_FACE_API_KEY?.length || 0,
        url: 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
        status: 'unknown'
      },
      envCheck: {
        nodeEnv: process.env.NODE_ENV,
        hasMongoUri: !!process.env.MONGODB_URI,
        port: process.env.PORT || 5000
      }
    };
    
    // Test DeepSeek connectivity quickly
    if (config.deepseek.hasKey) {
      try {
        const testResponse = await fetch('https://api.deepseek.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [{ role: 'user', content: 'Hi' }],
            max_tokens: 5
          })
        });
        config.deepseek.status = testResponse.ok ? '✅ Working' : `❌ Error ${testResponse.status}`;
        if (!testResponse.ok) {
          const errorText = await testResponse.text();
          config.deepseek.error = errorText.substring(0, 200);
        }
      } catch (e) {
        config.deepseek.status = `❌ Connection failed: ${e.message}`;
      }
    } else {
      config.deepseek.status = '⚠️ No API key configured';
    }
    
    // Test Gemini connectivity quickly
    if (config.gemini.hasKey) {
      try {
        const testResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
        config.gemini.status = testResponse.ok ? '✅ Working' : `❌ Error ${testResponse.status}`;
      } catch (e) {
        config.gemini.status = `❌ Connection failed: ${e.message}`;
      }
    } else {
      config.gemini.status = '⚠️ No API key configured';
    }
    
    // Test Hugging Face connectivity quickly
    if (config.huggingface.hasKey) {
      try {
        const testResponse = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2', {
          method: 'HEAD',
          headers: {
            'Authorization': `Bearer ${process.env.HUGGING_FACE_API_KEY}`
          }
        });
        config.huggingface.status = testResponse.ok ? '✅ Working' : `❌ Error ${testResponse.status}`;
      } catch (e) {
        config.huggingface.status = `❌ Connection failed: ${e.message}`;
      }
    } else {
      config.huggingface.status = '⚠️ No API key configured';
    }
    
    successResponse(res, config);
  } catch (error) {
    console.error('Debug error:', error);
    errorResponse(res, error.message, 500);
  }
};

// Generate poem endpoint
export const generatePoemController = async (req, res, next) => {
  const startTime = Date.now();
  req.startTime = startTime;
  req.aiRequestType = 'poem_generation';
  
  try {
    const { title, theme, genre = 'ghazal', language = 'urdu', style = 'classical', forceRefresh = false } = req.body;
    
    console.log('🎯 Generate Poem Request:', { title, theme, genre, language });
    
    // Validate required fields
    if (!title || !theme) {
      return errorResponse(res, 'Title and theme are required', 400);
    }
    
    // Validate genre
    const validGenres = ['ghazal', 'nazm', 'sher', 'rubai'];
    if (!validGenres.includes(genre)) {
      return errorResponse(res, `Invalid genre. Choose from: ${validGenres.join(', ')}`, 400);
    }
    
    // Validate language
    const validLanguages = ['urdu', 'hindi', 'english'];
    if (!validLanguages.includes(language)) {
      return errorResponse(res, `Invalid language. Choose from: ${validLanguages.join(', ')}`, 400);
    }
    
    // Generate poem using orchestrated AI
    const result = await generatePoem(
      { title, theme, genre, language, style, forceRefresh },
      req.user?.id
    );
    
    const responseTime = Date.now() - startTime;
    
    if (result.success) {
      // Log usage
      if (req.user?.id) {
        await UsageLog.create({
          userId: req.user.id,
          requestType: 'poem_generation',
          provider: result.provider,
          success: true,
          responseTime,
          timestamp: new Date()
        }).catch(console.error);
      }
      
      return successResponse(res, {
        title,
        theme,
        genre,
        language,
        content: result.content,
        analysis: result.analysis,
        provider: result.provider,
        fromCache: result.fromCache || false,
        responseTime
      });
    } else {
      return errorResponse(res, result.error || 'Failed to generate poem', 503);
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
      return errorResponse(res, 'Poem text is required (minimum 10 characters)', 400);
    }
    
    const result = await analyzePoem(poemText, language, req.user?.id);
    
    const responseTime = Date.now() - startTime;
    
    if (result.success) {
      // Log usage
      if (req.user?.id) {
        await UsageLog.create({
          userId: req.user.id,
          requestType: 'poem_analysis',
          provider: result.provider,
          success: true,
          responseTime,
          timestamp: new Date()
        }).catch(console.error);
      }
      
      return successResponse(res, {
        analysis: result.analysis,
        provider: result.provider,
        fromCache: result.fromCache || false,
        responseTime,
        warning: result.warning || null
      });
    } else {
      // Return fallback analysis
      return successResponse(res, {
        analysis: {
          themes: ['Theme detection unavailable'],
          tone: 'Unknown',
          sentiment: 'neutral',
          emotions: [],
          meaning: 'AI service temporarily unavailable. Basic analysis provided.',
          literaryDevices: ['Poetic devices detected'],
          rhymeScheme: 'Pattern present',
          difficulty: 'intermediate'
        },
        provider: 'fallback',
        warning: result.error || 'Using fallback analysis'
      });
    }
  } catch (error) {
    console.error('Analyze poem error:', error);
    // Always return a response, never fail
    successResponse(res, {
      analysis: {
        themes: ['Poetry analysis'],
        tone: 'Expressive',
        sentiment: 'neutral',
        emotions: ['contemplative'],
        meaning: 'This poem expresses deep emotions through poetic language.',
        literaryDevices: ['Imagery', 'Metaphor'],
        rhymeScheme: 'Rhythmic pattern',
        difficulty: 'intermediate'
      },
      provider: 'fallback',
      warning: 'Using fallback analysis. Please try again for detailed AI analysis.'
    });
  }
};

// Get usage statistics for the user
export const getUsageStatsController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayCount = await UsageLog.countDocuments({
      userId,
      timestamp: { $gte: today },
      requestType: { $in: ['poem_generation', 'poem_analysis'] }
    });
    
    const totalCount = await UsageLog.countDocuments({
      userId,
      requestType: { $in: ['poem_generation', 'poem_analysis'] }
    });
    
    const byProvider = await UsageLog.aggregate([
      { 
        $match: { 
          userId, 
          requestType: { $in: ['poem_generation', 'poem_analysis'] } 
        } 
      },
      { $group: { _id: '$provider', count: { $sum: 1 } } }
    ]);
    
    const plan = req.user?.subscription?.plan || 'free';
    const dailyLimit = { free: 10, basic: 25, premium: 100, admin: 1000 }[plan] || 10;
    
    const providerStats = {};
    byProvider.forEach(p => {
      providerStats[p._id] = p.count;
    });
    
    successResponse(res, {
      todayCount,
      totalCount,
      remainingToday: Math.max(0, dailyLimit - todayCount),
      dailyLimit,
      plan,
      byProvider: providerStats
    });
  } catch (error) {
    console.error('Error in getUsageStatsController:', error);
    // Return default values instead of failing
    successResponse(res, {
      todayCount: 0,
      totalCount: 0,
      remainingToday: 10,
      dailyLimit: 10,
      plan: 'free',
      byProvider: {}
    });
  }
};