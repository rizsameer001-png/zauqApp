// server/services/aiOrchestrator.js
import { generatePoemDeepSeek, analyzePoemDeepSeek } from './deepseekService.js';
import { generatePoemGemini, analyzePoemGemini } from './geminiService.js';
import { generatePoemHuggingFace, analyzePoemHuggingFace } from './huggingFaceService.js';
import AICache from '../models/AICache.js';
import UsageLog from '../models/UsageLog.js';

// Cache TTL (24 hours)
const CACHE_TTL = 24 * 60 * 60 * 1000;

// Get cache key for request
const getCacheKey = (type, params) => {
  return `${type}:${JSON.stringify(params)}`;
};

// Log usage
const logUsage = async (userId, requestType, provider, success, responseTime, tokensUsed = 0) => {
  try {
    await UsageLog.create({
      userId,
      requestType,
      provider,
      success,
      responseTime,
      tokensUsed,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Failed to log usage:', error);
  }
};

// Generate poem with fallback
export const generatePoem = async (params, userId = null) => {
  const { title, theme, genre, language, forceRefresh = false } = params;
  const startTime = Date.now();
  
  // Check cache first
  if (!forceRefresh) {
    const cacheKey = getCacheKey('poem', { title, theme, genre, language });
    const cached = await AICache.findOne({ cacheKey });
    
    if (cached && (Date.now() - cached.createdAt) < CACHE_TTL) {
      console.log(`✅ Cache hit for poem: ${cacheKey}`);
      await logUsage(userId, 'poem_generation', 'cache', true, Date.now() - startTime);
      return {
        success: true,
        fromCache: true,
        provider: cached.provider,
        content: cached.content,
        analysis: cached.analysis
      };
    }
  }
  
  // Providers in priority order
  const providers = [
    { name: 'deepseek', function: generatePoemDeepSeek },
    { name: 'gemini', function: generatePoemGemini },
    { name: 'huggingface', function: generatePoemHuggingFace }
  ];
  
  let lastError = null;
  
  for (const provider of providers) {
    try {
      console.log(`🔄 Trying ${provider.name} for poem generation...`);
      const result = await provider.function(params);
      
      if (result.success && result.content) {
        const responseTime = Date.now() - startTime;
        console.log(`✅ ${provider.name} succeeded in ${responseTime}ms`);
        
        // Log success
        await logUsage(userId, 'poem_generation', provider.name, true, responseTime);
        
        // Cache the result
        const cacheKey = getCacheKey('poem', { title, theme, genre, language });
        await AICache.findOneAndUpdate(
          { cacheKey },
          {
            cacheKey,
            type: 'poem',
            requestParams: params,
            content: result.content,
            analysis: result.analysis || null,
            provider: provider.name,
            createdAt: new Date()
          },
          { upsert: true, new: true }
        );
        
        return {
          success: true,
          provider: provider.name,
          content: result.content,
          analysis: result.analysis,
          responseTime
        };
      } else {
        console.log(`⚠️ ${provider.name} failed:`, result.error);
        lastError = result.error;
        await logUsage(userId, 'poem_generation', provider.name, false, Date.now() - startTime);
      }
    } catch (error) {
      console.error(`❌ ${provider.name} error:`, error.message);
      lastError = error.message;
      await logUsage(userId, 'poem_generation', provider.name, false, Date.now() - startTime);
    }
  }
  
  // All providers failed
  return {
    success: false,
    error: `All AI providers failed. Last error: ${lastError}`,
    providers: providers.map(p => p.name)
  };
};

// Analyze poem with fallback
export const analyzePoem = async (poemText, language = 'urdu', userId = null) => {
  const startTime = Date.now();
  
  // Check cache
  const cacheKey = getCacheKey('analysis', { textHash: poemText.substring(0, 200), language });
  const cached = await AICache.findOne({ cacheKey });
  
  if (cached && (Date.now() - cached.createdAt) < CACHE_TTL) {
    console.log(`✅ Cache hit for analysis`);
    await logUsage(userId, 'poem_analysis', 'cache', true, Date.now() - startTime);
    return {
      success: true,
      fromCache: true,
      provider: cached.provider,
      analysis: cached.analysis
    };
  }
  
  // Providers in priority order for analysis
  const providers = [
    { name: 'deepseek', function: analyzePoemDeepSeek },
    { name: 'gemini', function: analyzePoemGemini },
    { name: 'huggingface', function: analyzePoemHuggingFace }
  ];
  
  let lastError = null;
  
  for (const provider of providers) {
    try {
      console.log(`🔄 Trying ${provider.name} for analysis...`);
      const result = await provider.function(poemText, language);
      
      if (result.success && (result.analysis || result.content)) {
        const responseTime = Date.now() - startTime;
        console.log(`✅ ${provider.name} analysis succeeded in ${responseTime}ms`);
        
        await logUsage(userId, 'poem_analysis', provider.name, true, responseTime);
        
        const analysis = result.analysis || {
          themes: ['Theme detection failed'],
          tone: 'Unknown',
          sentiment: 'neutral',
          emotions: [],
          meaning: result.content?.substring(0, 300) || 'Analysis available',
          literaryDevices: [],
          rhymeScheme: 'Not detected',
          difficulty: 'intermediate'
        };
        
        // Cache the result
        await AICache.findOneAndUpdate(
          { cacheKey },
          {
            cacheKey,
            type: 'analysis',
            requestParams: { language },
            content: poemText,
            analysis: analysis,
            provider: provider.name,
            createdAt: new Date()
          },
          { upsert: true, new: true }
        );
        
        return {
          success: true,
          provider: provider.name,
          analysis: analysis,
          responseTime
        };
      } else {
        console.log(`⚠️ ${provider.name} analysis failed:`, result.error);
        lastError = result.error;
        await logUsage(userId, 'poem_analysis', provider.name, false, Date.now() - startTime);
      }
    } catch (error) {
      console.error(`❌ ${provider.name} analysis error:`, error.message);
      lastError = error.message;
      await logUsage(userId, 'poem_analysis', provider.name, false, Date.now() - startTime);
    }
  }
  
  // Return fallback analysis
  return {
    success: true, // Still return true with fallback analysis
    provider: 'fallback',
    analysis: {
      themes: ['Unable to detect themes'],
      tone: 'Unknown',
      sentiment: 'neutral',
      emotions: ['unknown'],
      meaning: 'The poem expresses deep emotions. For detailed analysis, please try again later.',
      literaryDevices: ['Not analyzed'],
      rhymeScheme: 'Not detected',
      difficulty: 'intermediate',
      isFallback: true
    },
    warning: `Analysis failed: ${lastError}. Using fallback response.`
  };
};