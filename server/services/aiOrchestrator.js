// // server/services/aiOrchestrator.js
// import { generatePoemDeepSeek, analyzePoemDeepSeek } from './deepseekService.js';
// import { generatePoemGemini, analyzePoemGemini } from './geminiService.js';
// import { generatePoemHuggingFace, analyzePoemHuggingFace } from './huggingFaceService.js';
// import AICache from '../models/AICache.js';
// import UsageLog from '../models/UsageLog.js';

// // Cache TTL (24 hours)
// const CACHE_TTL = 24 * 60 * 60 * 1000;

// // Get cache key for request
// const getCacheKey = (type, params) => {
//   return `${type}:${JSON.stringify(params)}`;
// };

// // Log usage
// const logUsage = async (userId, requestType, provider, success, responseTime, tokensUsed = 0) => {
//   try {
//     await UsageLog.create({
//       userId,
//       requestType,
//       provider,
//       success,
//       responseTime,
//       tokensUsed,
//       timestamp: new Date()
//     });
//   } catch (error) {
//     console.error('Failed to log usage:', error);
//   }
// };

// // Generate poem with fallback
// export const generatePoem = async (params, userId = null) => {
//   const { title, theme, genre, language, forceRefresh = false } = params;
//   const startTime = Date.now();
  
//   // Check cache first
//   if (!forceRefresh) {
//     const cacheKey = getCacheKey('poem', { title, theme, genre, language });
//     const cached = await AICache.findOne({ cacheKey });
    
//     if (cached && (Date.now() - cached.createdAt) < CACHE_TTL) {
//       console.log(`✅ Cache hit for poem: ${cacheKey}`);
//       await logUsage(userId, 'poem_generation', 'cache', true, Date.now() - startTime);
//       return {
//         success: true,
//         fromCache: true,
//         provider: cached.provider,
//         content: cached.content,
//         analysis: cached.analysis
//       };
//     }
//   }
  
//   // Providers in priority order
//   const providers = [
//     { name: 'deepseek', function: generatePoemDeepSeek },
//     { name: 'gemini', function: generatePoemGemini },
//     { name: 'huggingface', function: generatePoemHuggingFace }
//   ];
  
//   let lastError = null;
  
//   for (const provider of providers) {
//     try {
//       console.log(`🔄 Trying ${provider.name} for poem generation...`);
//       const result = await provider.function(params);
      
//       if (result.success && result.content) {
//         const responseTime = Date.now() - startTime;
//         console.log(`✅ ${provider.name} succeeded in ${responseTime}ms`);
        
//         // Log success
//         await logUsage(userId, 'poem_generation', provider.name, true, responseTime);
        
//         // Cache the result
//         const cacheKey = getCacheKey('poem', { title, theme, genre, language });
//         await AICache.findOneAndUpdate(
//           { cacheKey },
//           {
//             cacheKey,
//             type: 'poem',
//             requestParams: params,
//             content: result.content,
//             analysis: result.analysis || null,
//             provider: provider.name,
//             createdAt: new Date()
//           },
//           { upsert: true, new: true }
//         );
        
//         return {
//           success: true,
//           provider: provider.name,
//           content: result.content,
//           analysis: result.analysis,
//           responseTime
//         };
//       } else {
//         console.log(`⚠️ ${provider.name} failed:`, result.error);
//         lastError = result.error;
//         await logUsage(userId, 'poem_generation', provider.name, false, Date.now() - startTime);
//       }
//     } catch (error) {
//       console.error(`❌ ${provider.name} error:`, error.message);
//       lastError = error.message;
//       await logUsage(userId, 'poem_generation', provider.name, false, Date.now() - startTime);
//     }
//   }
  
//   // All providers failed
//   return {
//     success: false,
//     error: `All AI providers failed. Last error: ${lastError}`,
//     providers: providers.map(p => p.name)
//   };
// };

// // Analyze poem with fallback
// export const analyzePoem = async (poemText, language = 'urdu', userId = null) => {
//   const startTime = Date.now();
  
//   // Check cache
//   const cacheKey = getCacheKey('analysis', { textHash: poemText.substring(0, 200), language });
//   const cached = await AICache.findOne({ cacheKey });
  
//   if (cached && (Date.now() - cached.createdAt) < CACHE_TTL) {
//     console.log(`✅ Cache hit for analysis`);
//     await logUsage(userId, 'poem_analysis', 'cache', true, Date.now() - startTime);
//     return {
//       success: true,
//       fromCache: true,
//       provider: cached.provider,
//       analysis: cached.analysis
//     };
//   }
  
//   // Providers in priority order for analysis
//   const providers = [
//     { name: 'deepseek', function: analyzePoemDeepSeek },
//     { name: 'gemini', function: analyzePoemGemini },
//     { name: 'huggingface', function: analyzePoemHuggingFace }
//   ];
  
//   let lastError = null;
  
//   for (const provider of providers) {
//     try {
//       console.log(`🔄 Trying ${provider.name} for analysis...`);
//       const result = await provider.function(poemText, language);
      
//       if (result.success && (result.analysis || result.content)) {
//         const responseTime = Date.now() - startTime;
//         console.log(`✅ ${provider.name} analysis succeeded in ${responseTime}ms`);
        
//         await logUsage(userId, 'poem_analysis', provider.name, true, responseTime);
        
//         const analysis = result.analysis || {
//           themes: ['Theme detection failed'],
//           tone: 'Unknown',
//           sentiment: 'neutral',
//           emotions: [],
//           meaning: result.content?.substring(0, 300) || 'Analysis available',
//           literaryDevices: [],
//           rhymeScheme: 'Not detected',
//           difficulty: 'intermediate'
//         };
        
//         // Cache the result
//         await AICache.findOneAndUpdate(
//           { cacheKey },
//           {
//             cacheKey,
//             type: 'analysis',
//             requestParams: { language },
//             content: poemText,
//             analysis: analysis,
//             provider: provider.name,
//             createdAt: new Date()
//           },
//           { upsert: true, new: true }
//         );
        
//         return {
//           success: true,
//           provider: provider.name,
//           analysis: analysis,
//           responseTime
//         };
//       } else {
//         console.log(`⚠️ ${provider.name} analysis failed:`, result.error);
//         lastError = result.error;
//         await logUsage(userId, 'poem_analysis', provider.name, false, Date.now() - startTime);
//       }
//     } catch (error) {
//       console.error(`❌ ${provider.name} analysis error:`, error.message);
//       lastError = error.message;
//       await logUsage(userId, 'poem_analysis', provider.name, false, Date.now() - startTime);
//     }
//   }
  
//   // Return fallback analysis
//   return {
//     success: true, // Still return true with fallback analysis
//     provider: 'fallback',
//     analysis: {
//       themes: ['Unable to detect themes'],
//       tone: 'Unknown',
//       sentiment: 'neutral',
//       emotions: ['unknown'],
//       meaning: 'The poem expresses deep emotions. For detailed analysis, please try again later.',
//       literaryDevices: ['Not analyzed'],
//       rhymeScheme: 'Not detected',
//       difficulty: 'intermediate',
//       isFallback: true
//     },
//     warning: `Analysis failed: ${lastError}. Using fallback response.`
//   };
// };












// // server/services/aiOrchestrator.js
// import AICache from '../models/AICache.js';

// // Cache TTL (24 hours)
// const CACHE_TTL = 24 * 60 * 60 * 1000;

// // Get cache key for request
// const getCacheKey = (type, params) => {
//   return `${type}:${JSON.stringify(params)}`;
// };

// // Simpler fallback response when no AI is available
// const getFallbackResponse = (type, params) => {
//   if (type === 'poem') {
//     const { title, theme, genre, language } = params;
//     const languageNames = { urdu: 'اردو', hindi: 'हिन्दी', english: 'English' };
    
//     return {
//       success: true,
//       provider: 'fallback',
//       content: `This is a sample ${genre} poem about ${theme}.

// Title: ${title}
// Language: ${languageNames[language] || language}

// [Your AI service is not configured. Please add API keys for DeepSeek, Gemini, or Hugging Face to enable AI generation.]

// ---
// 💡 Tip: Add your API keys in the .env file:
// - DEEPSEEK_API_KEY=your_key
// - GEMINI_API_KEY=your_key
// - HUGGING_FACE_API_KEY=your_key`,
//       analysis: {
//         themes: [theme, 'poetry', 'expression'],
//         tone: 'contemplative',
//         sentiment: 'neutral',
//         emotions: ['thoughtful', 'creative'],
//         meaning: `This poem explores themes of ${theme} through poetic expression.`,
//         literaryDevices: ['imagery', 'metaphor'],
//         rhymeScheme: 'Free verse',
//         difficulty: 'beginner'
//       }
//     };
//   }
  
//   if (type === 'analysis') {
//     return {
//       success: true,
//       provider: 'fallback',
//       analysis: {
//         themes: ['Theme detection unavailable'],
//         tone: 'Unknown',
//         sentiment: 'neutral',
//         emotions: [],
//         meaning: 'AI analysis temporarily unavailable. Please configure API keys.',
//         literaryDevices: [],
//         rhymeScheme: 'Not detected',
//         difficulty: 'intermediate',
//         isFallback: true
//       }
//     };
//   }
  
//   return { success: false, error: 'AI services not configured' };
// };

// // Generate poem with fallback
// export const generatePoem = async (params, userId = null) => {
//   const { title, theme, genre, language, forceRefresh = false } = params;
//   const startTime = Date.now();
  
//   // Check cache first
//   if (!forceRefresh) {
//     const cacheKey = getCacheKey('poem', { title, theme, genre, language });
//     try {
//       const cached = await AICache.findOne({ cacheKey });
//       if (cached && (Date.now() - cached.createdAt) < CACHE_TTL) {
//         console.log(`✅ Cache hit for poem: ${cacheKey}`);
//         return {
//           success: true,
//           fromCache: true,
//           provider: cached.provider,
//           content: cached.content,
//           analysis: cached.analysis
//         };
//       }
//     } catch (error) {
//       console.error('Cache check error:', error);
//     }
//   }
  
//   // Try real AI providers (if configured)
//   const apiKeys = {
//     deepseek: process.env.DEEPSEEK_API_KEY,
//     gemini: process.env.GEMINI_API_KEY,
//     huggingface: process.env.HUGGING_FACE_API_KEY
//   };
  
//   const hasAnyKey = Object.values(apiKeys).some(key => key && key !== 'your_key_here');
  
//   if (!hasAnyKey) {
//     console.log('⚠️ No AI API keys configured. Using fallback response.');
//     return getFallbackResponse('poem', params);
//   }
  
//   // Try DeepSeek if configured
//   if (apiKeys.deepseek && apiKeys.deepseek !== 'your_key_here') {
//     try {
//       const result = await callDeepSeek(params);
//       if (result.success) {
//         return result;
//       }
//     } catch (error) {
//       console.error('DeepSeek error:', error.message);
//     }
//   }
  
//   // Try Gemini if configured
//   if (apiKeys.gemini && apiKeys.gemini !== 'your_key_here') {
//     try {
//       const result = await callGemini(params);
//       if (result.success) {
//         return result;
//       }
//     } catch (error) {
//       console.error('Gemini error:', error.message);
//     }
//   }
  
//   // Try Hugging Face if configured
//   if (apiKeys.huggingface && apiKeys.huggingface !== 'your_key_here') {
//     try {
//       const result = await callHuggingFace(params);
//       if (result.success) {
//         return result;
//       }
//     } catch (error) {
//       console.error('Hugging Face error:', error.message);
//     }
//   }
  
//   // Fallback response
//   console.log('⚠️ All AI providers failed or not configured. Using fallback.');
//   return getFallbackResponse('poem', params);
// };

// // Analyze poem with fallback
// export const analyzePoem = async (poemText, language = 'urdu', userId = null) => {
//   // Check if any AI is configured
//   const apiKeys = {
//     deepseek: process.env.DEEPSEEK_API_KEY,
//     gemini: process.env.GEMINI_API_KEY,
//     huggingface: process.env.HUGGING_FACE_API_KEY
//   };
  
//   const hasAnyKey = Object.values(apiKeys).some(key => key && key !== 'your_key_here');
  
//   if (!hasAnyKey) {
//     return getFallbackResponse('analysis', {});
//   }
  
//   // Try real AI providers
//   if (apiKeys.deepseek && apiKeys.deepseek !== 'your_key_here') {
//     try {
//       const result = await analyzeWithDeepSeek(poemText, language);
//       if (result.success) return result;
//     } catch (error) {
//       console.error('DeepSeek analysis error:', error.message);
//     }
//   }
  
//   if (apiKeys.gemini && apiKeys.gemini !== 'your_key_here') {
//     try {
//       const result = await analyzeWithGemini(poemText, language);
//       if (result.success) return result;
//     } catch (error) {
//       console.error('Gemini analysis error:', error.message);
//     }
//   }
  
//   return getFallbackResponse('analysis', {});
// };

// // ============================================
// // Mock AI Functions (replace with real API calls)
// // ============================================

// async function callDeepSeek(params) {
//   // This is a mock - replace with actual DeepSeek API call
//   console.log('Calling DeepSeek API...');
  
//   // Simulate API call
//   await new Promise(resolve => setTimeout(resolve, 500));
  
//   // Return mock response
//   return {
//     success: true,
//     provider: 'deepseek',
//     content: generateMockPoem(params),
//     analysis: generateMockAnalysis(params)
//   };
// }

// async function callGemini(params) {
//   console.log('Calling Gemini API...');
//   await new Promise(resolve => setTimeout(resolve, 500));
  
//   return {
//     success: true,
//     provider: 'gemini',
//     content: generateMockPoem(params),
//     analysis: generateMockAnalysis(params)
//   };
// }

// async function callHuggingFace(params) {
//   console.log('Calling Hugging Face API...');
//   await new Promise(resolve => setTimeout(resolve, 800));
  
//   return {
//     success: true,
//     provider: 'huggingface',
//     content: generateMockPoem(params),
//     analysis: generateMockAnalysis(params)
//   };
// }

// async function analyzeWithDeepSeek(poemText, language) {
//   console.log('Analyzing with DeepSeek...');
//   await new Promise(resolve => setTimeout(resolve, 500));
  
//   return {
//     success: true,
//     provider: 'deepseek',
//     analysis: generateMockAnalysisFromText(poemText, language)
//   };
// }

// async function analyzeWithGemini(poemText, language) {
//   console.log('Analyzing with Gemini...');
//   await new Promise(resolve => setTimeout(resolve, 500));
  
//   return {
//     success: true,
//     provider: 'gemini',
//     analysis: generateMockAnalysisFromText(poemText, language)
//   };
// }

// // Helper functions to generate mock responses
// function generateMockPoem(params) {
//   const { title, theme, genre, language } = params;
//   const languageNames = { urdu: 'اردو', hindi: 'हिन्दी', english: 'English' };
  
//   const urduPoem = `دلِ ناداں تجھے ہوا کیا ہے
// آخر اس درد کی دوا کیا ہے

// ہم تو سمجھے تھے کہ تو ہے غمِ دل
// یہ بھی ہے تجھ پہ کیا بلا کیا ہے

// (About ${theme})`;

//   const hindiPoem = `दिल की बातें कहीं अनकही रह गईं
// तेरे ख्यालों में खोई हुई सी रह गईं

// ${theme} की ये कहानी, ${title} का फसाना
// हर लफ्ज़ में तुझे ही पाने का है बहाना`;

//   const englishPoem = `In the quiet moments of dawn's first light,
// Where ${theme} blooms, pure and bright.
// ${title} echoes through the silent air,
// A whispered promise, a poet's prayer.`;

//   if (language === 'urdu') return urduPoem;
//   if (language === 'hindi') return hindiPoem;
//   return englishPoem;
// }

// function generateMockAnalysis(params) {
//   const { theme, genre } = params;
  
//   return {
//     themes: [theme, 'nature', 'emotion'],
//     tone: 'melancholic',
//     sentiment: 'positive',
//     emotions: ['love', 'longing', 'hope'],
//     meaning: `This beautiful ${genre} poem explores the theme of ${theme} through vivid imagery and emotional depth.`,
//     literaryDevices: ['metaphor', 'imagery', 'alliteration'],
//     rhymeScheme: 'AABB pattern',
//     difficulty: 'intermediate',
//     summary: `A heartfelt ${genre} that captures the essence of ${theme} with poetic elegance.`
//   };
// }

// function generateMockAnalysisFromText(poemText, language) {
//   return {
//     themes: ['love', 'nature', 'spirituality'],
//     tone: 'contemplative',
//     sentiment: 'positive',
//     emotions: ['joy', 'peace', 'hope'],
//     meaning: `This poem expresses deep emotions through beautiful imagery and rhythmic flow.`,
//     literaryDevices: ['metaphor', 'simile', 'personification'],
//     rhymeScheme: 'Rhythmic pattern detected',
//     difficulty: 'intermediate',
//     summary: `A poetic masterpiece that resonates with the soul.`
//   };
// }















// // server/services/aiOrchestrator.js
// import AICache from '../models/AICache.js';

// // Cache TTL (24 hours)
// const CACHE_TTL = 24 * 60 * 60 * 1000;

// // Get cache key for request
// const getCacheKey = (type, params) => {
//   return `${type}:${JSON.stringify(params)}`;
// };

// // ============================================
// // DEEPSEEK API CALL
// // ============================================
// async function callDeepSeek(params) {
//   const { title, theme, genre, language } = params;
//   const apiKey = process.env.DEEPSEEK_API_KEY;
  
//   if (!apiKey || apiKey === 'your_deepseek_api_key_here') {
//     console.log('⚠️ DeepSeek API key not configured');
//     return { success: false, error: 'DeepSeek API key missing' };
//   }
  
//   const systemPrompt = `You are an expert poet. Write a ${genre} poem in ${language} language.
//   Title: "${title}"
//   Theme: ${theme}
//   Length: 8-12 lines with proper rhyme scheme.
//   Return ONLY the poem text, no explanations.`;
  
//   try {
//     const controller = new AbortController();
//     const timeoutId = setTimeout(() => controller.abort(), 15000);
    
//     const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${apiKey}`
//       },
//       body: JSON.stringify({
//         model: 'deepseek-chat',
//         messages: [
//           { role: 'system', content: systemPrompt },
//           { role: 'user', content: `Write a ${genre} poem about ${theme} titled "${title}" in ${language}.` }
//         ],
//         temperature: 0.8,
//         max_tokens: 500,
//         stream: false
//       }),
//       signal: controller.signal
//     });
    
//     clearTimeout(timeoutId);
    
//     if (!response.ok) {
//       throw new Error(`DeepSeek API error: ${response.status}`);
//     }
    
//     const data = await response.json();
//     const content = data.choices[0]?.message?.content || '';
    
//     // Generate analysis
//     const analysis = await analyzeWithDeepSeek(content, language);
    
//     return {
//       success: true,
//       provider: 'deepseek',
//       content: content,
//       analysis: analysis.analysis || analysis
//     };
//   } catch (error) {
//     console.error('DeepSeek error:', error.message);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // GEMINI API CALL
// // ============================================
// async function callGemini(params) {
//   const { title, theme, genre, language } = params;
//   const apiKey = process.env.GEMINI_API_KEY;
  
//   if (!apiKey || apiKey === 'your_gemini_api_key_here') {
//     console.log('⚠️ Gemini API key not configured');
//     return { success: false, error: 'Gemini API key missing' };
//   }
  
//   const prompt = `Write a ${genre} poem in ${language} language.
// Title: "${title}"
// Theme: ${theme}
// Length: 8-12 lines with proper rhyme scheme.
// Return ONLY the poem text, no explanations.`;
  
//   try {
//     const controller = new AbortController();
//     const timeoutId = setTimeout(() => controller.abort(), 15000);
    
//     const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         contents: [{
//           parts: [{ text: prompt }]
//         }],
//         generationConfig: {
//           temperature: 0.8,
//           maxOutputTokens: 500,
//           topP: 0.9
//         }
//       }),
//       signal: controller.signal
//     });
    
//     clearTimeout(timeoutId);
    
//     if (!response.ok) {
//       throw new Error(`Gemini API error: ${response.status}`);
//     }
    
//     const data = await response.json();
//     const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
//     const analysis = await analyzeWithGemini(content, language);
    
//     return {
//       success: true,
//       provider: 'gemini',
//       content: content,
//       analysis: analysis.analysis || analysis
//     };
//   } catch (error) {
//     console.error('Gemini error:', error.message);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // HUGGING FACE API CALL
// // ============================================
// async function callHuggingFace(params) {
//   const { title, theme, genre, language } = params;
//   const apiKey = process.env.HUGGING_FACE_API_KEY;
  
//   if (!apiKey || apiKey === 'your_huggingface_api_key_here') {
//     console.log('⚠️ Hugging Face API key not configured');
//     return { success: false, error: 'Hugging Face API key missing' };
//   }
  
//   const prompt = `Write a short ${genre} poem in ${language} about ${theme} titled "${title}". Make it 6-8 lines with rhyme. Return only the poem.`;
  
//   try {
//     const controller = new AbortController();
//     const timeoutId = setTimeout(() => controller.abort(), 20000);
    
//     const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${apiKey}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         inputs: prompt,
//         parameters: {
//           max_length: 300,
//           temperature: 0.8,
//           do_sample: true
//         }
//       }),
//       signal: controller.signal
//     });
    
//     clearTimeout(timeoutId);
    
//     if (!response.ok) {
//       throw new Error(`Hugging Face API error: ${response.status}`);
//     }
    
//     const data = await response.json();
//     const content = Array.isArray(data) ? data[0]?.generated_text || '' : data.generated_text || '';
    
//     const analysis = await analyzeWithHuggingFace(content, language);
    
//     return {
//       success: true,
//       provider: 'huggingface',
//       content: content,
//       analysis: analysis.analysis || analysis
//     };
//   } catch (error) {
//     console.error('Hugging Face error:', error.message);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // ANALYSIS FUNCTIONS
// // ============================================

// async function analyzeWithDeepSeek(poemText, language) {
//   const apiKey = process.env.DEEPSEEK_API_KEY;
  
//   if (!apiKey) {
//     return { success: false, error: 'API key missing' };
//   }
  
//   const prompt = `Analyze this ${language} poem and return JSON:
// Poem: "${poemText.substring(0, 1000)}"

// Return JSON:
// {
//   "themes": ["theme1", "theme2"],
//   "tone": "emotional tone",
//   "sentiment": "positive/negative/neutral",
//   "emotions": ["love", "joy", "sadness"],
//   "meaning": "Brief explanation",
//   "literaryDevices": ["metaphor", "simile"],
//   "rhymeScheme": "pattern description",
//   "difficulty": "beginner/intermediate/advanced"
// }`;
  
//   try {
//     const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${apiKey}`
//       },
//       body: JSON.stringify({
//         model: 'deepseek-chat',
//         messages: [{ role: 'user', content: prompt }],
//         temperature: 0.5,
//         max_tokens: 500
//       })
//     });
    
//     if (!response.ok) {
//       throw new Error(`DeepSeek analysis error: ${response.status}`);
//     }
    
//     const data = await response.json();
//     const content = data.choices[0]?.message?.content || '';
    
//     // Extract JSON from response
//     const jsonMatch = content.match(/\{[\s\S]*\}/);
//     if (jsonMatch) {
//       return {
//         success: true,
//         provider: 'deepseek',
//         analysis: JSON.parse(jsonMatch[0])
//       };
//     }
    
//     return { success: false, error: 'Failed to parse analysis' };
//   } catch (error) {
//     console.error('DeepSeek analysis error:', error.message);
//     return { success: false, error: error.message };
//   }
// }

// async function analyzeWithGemini(poemText, language) {
//   const apiKey = process.env.GEMINI_API_KEY;
  
//   if (!apiKey) {
//     return { success: false, error: 'API key missing' };
//   }
  
//   const prompt = `Analyze this ${language} poem and return ONLY JSON:
// Poem: "${poemText.substring(0, 1000)}"

// Return JSON format:
// {
//   "themes": ["theme1", "theme2"],
//   "tone": "emotional tone",
//   "sentiment": "positive/negative/neutral",
//   "emotions": ["love", "joy", "sadness"],
//   "meaning": "Brief explanation",
//   "literaryDevices": ["metaphor", "simile"],
//   "rhymeScheme": "pattern description",
//   "difficulty": "beginner/intermediate/advanced"
// }`;
  
//   try {
//     const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         contents: [{ parts: [{ text: prompt }] }],
//         generationConfig: { temperature: 0.5, maxOutputTokens: 500 }
//       })
//     });
    
//     if (!response.ok) {
//       throw new Error(`Gemini analysis error: ${response.status}`);
//     }
    
//     const data = await response.json();
//     const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
//     const jsonMatch = content.match(/\{[\s\S]*\}/);
//     if (jsonMatch) {
//       return {
//         success: true,
//         provider: 'gemini',
//         analysis: JSON.parse(jsonMatch[0])
//       };
//     }
    
//     return { success: false, error: 'Failed to parse analysis' };
//   } catch (error) {
//     console.error('Gemini analysis error:', error.message);
//     return { success: false, error: error.message };
//   }
// }

// async function analyzeWithHuggingFace(poemText, language) {
//   const apiKey = process.env.HUGGING_FACE_API_KEY;
  
//   if (!apiKey) {
//     return { success: false, error: 'API key missing' };
//   }
  
//   const prompt = `Analyze this poem in one sentence: "${poemText.substring(0, 500)}"`;
  
//   try {
//     const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${apiKey}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         inputs: prompt,
//         parameters: { max_length: 200 }
//       })
//     });
    
//     if (!response.ok) {
//       throw new Error(`Hugging Face analysis error: ${response.status}`);
//     }
    
//     const data = await response.json();
//     const content = Array.isArray(data) ? data[0]?.generated_text || '' : data.generated_text || '';
    
//     // Parse simple text response
//     return {
//       success: true,
//       provider: 'huggingface',
//       analysis: {
//         themes: ['Theme detection limited'],
//         tone: 'Expressive',
//         sentiment: 'neutral',
//         emotions: ['contemplative'],
//         meaning: content.substring(0, 300),
//         literaryDevices: ['Imagery'],
//         rhymeScheme: 'Rhythmic',
//         difficulty: 'intermediate'
//       }
//     };
//   } catch (error) {
//     console.error('Hugging Face analysis error:', error.message);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // MAIN ORCHESTRATOR FUNCTIONS
// // ============================================

// export const generatePoem = async (params, userId = null) => {
//   const { title, theme, genre, language, forceRefresh = false } = params;
  
//   // Check cache first
//   if (!forceRefresh) {
//     const cacheKey = getCacheKey('poem', { title, theme, genre, language });
//     try {
//       const cached = await AICache.findOne({ cacheKey });
//       if (cached && (Date.now() - cached.createdAt) < CACHE_TTL) {
//         console.log(`✅ Cache hit for poem: ${cacheKey}`);
//         return {
//           success: true,
//           fromCache: true,
//           provider: cached.provider,
//           content: cached.content,
//           analysis: cached.analysis
//         };
//       }
//     } catch (error) {
//       console.error('Cache check error:', error);
//     }
//   }
  
//   // Try providers in priority order
//   const providers = [
//     { name: 'deepseek', fn: callDeepSeek },
//     { name: 'gemini', fn: callGemini },
//     { name: 'huggingface', fn: callHuggingFace }
//   ];
  
//   for (const provider of providers) {
//     console.log(`🔄 Trying ${provider.name}...`);
//     const result = await provider.fn(params);
    
//     if (result.success && result.content) {
//       console.log(`✅ ${provider.name} succeeded!`);
      
//       // Cache the result
//       try {
//         const cacheKey = getCacheKey('poem', { title, theme, genre, language });
//         await AICache.findOneAndUpdate(
//           { cacheKey },
//           {
//             cacheKey,
//             type: 'poem',
//             requestParams: params,
//             content: result.content,
//             analysis: result.analysis,
//             provider: provider.name,
//             createdAt: new Date()
//           },
//           { upsert: true, new: true }
//         );
//       } catch (error) {
//         console.error('Cache save error:', error);
//       }
      
//       return result;
//     } else {
//       console.log(`❌ ${provider.name} failed:`, result.error);
//     }
//   }
  
//   // All providers failed
//   return {
//     success: false,
//     error: 'All AI providers failed. Please check your API keys and try again.'
//   };
// };

// export const analyzePoem = async (poemText, language = 'urdu', userId = null) => {
//   // Try providers in priority order
//   const providers = [
//     { name: 'deepseek', fn: () => analyzeWithDeepSeek(poemText, language) },
//     { name: 'gemini', fn: () => analyzeWithGemini(poemText, language) },
//     { name: 'huggingface', fn: () => analyzeWithHuggingFace(poemText, language) }
//   ];
  
//   for (const provider of providers) {
//     console.log(`🔄 Trying ${provider.name} for analysis...`);
//     const result = await provider.fn();
    
//     if (result.success && result.analysis) {
//       console.log(`✅ ${provider.name} analysis succeeded!`);
//       return result;
//     }
//   }
  
//   return {
//     success: false,
//     error: 'All AI providers failed for analysis'
//   };
// };














// // server/services/aiOrchestrator.js
// import AICache from '../models/AICache.js';

// const CACHE_TTL = 24 * 60 * 60 * 1000;

// const getCacheKey = (type, params) => {
//   return `${type}:${JSON.stringify(params)}`;
// };

// // ============================================
// // DEEPSEEK API CALL (Fixed)
// // ============================================
// async function callDeepSeek(params) {
//   const { title, theme, genre, language } = params;
//   const apiKey = process.env.DEEPSEEK_API_KEY;
  
//   console.log('🔵 DeepSeek API Key present:', !!apiKey);
//   console.log('🔵 DeepSeek Key length:', apiKey?.length);
  
//   if (!apiKey || apiKey === 'your_deepseek_api_key_here' || apiKey === '') {
//     console.log('⚠️ DeepSeek API key not configured or invalid');
//     return { success: false, error: 'DeepSeek API key missing or invalid' };
//   }
  
//   const prompt = `Write a ${genre} poem in ${language} language.
// Title: "${title}"
// Theme: ${theme}
// Length: 6-8 lines with proper rhyme scheme.
// Return ONLY the poem text, no explanations.`;
  
//   try {
//     console.log('🔄 Calling DeepSeek API...');
    
//     const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${apiKey}`
//       },
//       body: JSON.stringify({
//         model: 'deepseek-chat',
//         messages: [{ role: 'user', content: prompt }],
//         temperature: 0.8,
//         max_tokens: 500
//       })
//     });
    
//     console.log('🔵 DeepSeek Response Status:', response.status);
    
//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error('❌ DeepSeek Error:', errorText);
//       return { success: false, error: `DeepSeek API error: ${response.status} - ${errorText}` };
//     }
    
//     const data = await response.json();
//     const content = data.choices?.[0]?.message?.content || '';
    
//     if (!content) {
//       return { success: false, error: 'DeepSeek returned empty response' };
//     }
    
//     console.log('✅ DeepSeek generated poem length:', content.length);
    
//     // Simple analysis without API call
//     const analysis = {
//       themes: [theme, 'poetry', 'emotion'],
//       tone: 'expressive',
//       sentiment: 'positive',
//       emotions: ['love', 'passion'],
//       meaning: `A beautiful ${genre} poem exploring the theme of ${theme}.`,
//       literaryDevices: ['imagery', 'metaphor'],
//       rhymeScheme: 'Traditional pattern',
//       difficulty: 'intermediate'
//     };
    
//     return {
//       success: true,
//       provider: 'deepseek',
//       content: content,
//       analysis: analysis
//     };
//   } catch (error) {
//     console.error('❌ DeepSeek error:', error.message);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // GEMINI API CALL (Fixed)
// // ============================================
// async function callGemini(params) {
//   const { title, theme, genre, language } = params;
//   const apiKey = process.env.GEMINI_API_KEY;
  
//   console.log('🟢 Gemini API Key present:', !!apiKey);
  
//   if (!apiKey || apiKey === 'your_gemini_api_key_here' || apiKey === '') {
//     console.log('⚠️ Gemini API key not configured or invalid');
//     return { success: false, error: 'Gemini API key missing or invalid' };
//   }
  
//   const prompt = `Write a ${genre} poem in ${language} language.
// Title: "${title}"
// Theme: ${theme}
// Length: 6-8 lines with rhyme scheme.
// Return ONLY the poem text.`;
  
//   try {
//     console.log('🔄 Calling Gemini API...');
    
//     const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         contents: [{ parts: [{ text: prompt }] }],
//         generationConfig: {
//           temperature: 0.8,
//           maxOutputTokens: 500
//         }
//       })
//     });
    
//     console.log('🟢 Gemini Response Status:', response.status);
    
//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error('❌ Gemini Error:', errorText);
//       return { success: false, error: `Gemini API error: ${response.status} - ${errorText}` };
//     }
    
//     const data = await response.json();
//     const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
//     if (!content) {
//       return { success: false, error: 'Gemini returned empty response' };
//     }
    
//     console.log('✅ Gemini generated poem length:', content.length);
    
//     const analysis = {
//       themes: [theme, 'poetry', 'expression'],
//       tone: 'emotional',
//       sentiment: 'positive',
//       emotions: ['hope', 'beauty'],
//       meaning: `This ${genre} beautifully captures the essence of ${theme}.`,
//       literaryDevices: ['rhyme', 'rhythm'],
//       rhymeScheme: 'AABB pattern',
//       difficulty: 'beginner'
//     };
    
//     return {
//       success: true,
//       provider: 'gemini',
//       content: content,
//       analysis: analysis
//     };
//   } catch (error) {
//     console.error('❌ Gemini error:', error.message);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // HUGGING FACE API CALL (Fixed)
// // ============================================
// async function callHuggingFace(params) {
//   const { title, theme, genre, language } = params;
//   const apiKey = process.env.HUGGING_FACE_API_KEY;
  
//   console.log('🟣 Hugging Face API Key present:', !!apiKey);
  
//   if (!apiKey || apiKey === 'your_huggingface_api_key_here' || apiKey === '') {
//     console.log('⚠️ Hugging Face API key not configured or invalid');
//     return { success: false, error: 'Hugging Face API key missing or invalid' };
//   }
  
//   const prompt = `Write a short ${genre} poem about ${theme} titled "${title}". Make it 6 lines with rhyme.`;
  
//   try {
//     console.log('🔄 Calling Hugging Face API...');
    
//     const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${apiKey}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         inputs: prompt,
//         parameters: {
//           max_length: 300,
//           temperature: 0.8,
//           do_sample: true
//         }
//       })
//     });
    
//     console.log('🟣 Hugging Face Response Status:', response.status);
    
//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error('❌ Hugging Face Error:', errorText);
//       return { success: false, error: `Hugging Face API error: ${response.status} - ${errorText}` };
//     }
    
//     const data = await response.json();
//     const content = Array.isArray(data) ? data[0]?.generated_text || '' : data.generated_text || '';
    
//     if (!content) {
//       return { success: false, error: 'Hugging Face returned empty response' };
//     }
    
//     // Clean the response (remove the prompt from the generated text)
//     let cleanContent = content;
//     if (cleanContent.includes(prompt)) {
//       cleanContent = cleanContent.replace(prompt, '').trim();
//     }
    
//     console.log('✅ Hugging Face generated poem length:', cleanContent.length);
    
//     const analysis = {
//       themes: [theme, 'creative'],
//       tone: 'artistic',
//       sentiment: 'neutral',
//       emotions: ['thoughtful'],
//       meaning: `A creative exploration of ${theme} in poetic form.`,
//       literaryDevices: ['rhyme', 'meter'],
//       rhymeScheme: 'Simple rhyme',
//       difficulty: 'beginner'
//     };
    
//     return {
//       success: true,
//       provider: 'huggingface',
//       content: cleanContent || content,
//       analysis: analysis
//     };
//   } catch (error) {
//     console.error('❌ Hugging Face error:', error.message);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // FALLBACK RESPONSE (Always works)
// // ============================================
// function getFallbackPoem(params) {
//   const { title, theme, genre, language } = params;
  
//   const poems = {
//     urdu: `دل کی باتیں کہاں کہی جائیں
// تیرے خوابوں میں کھو گئی ہیں

// ${title} کا یہ پیغام
// محبت کا ہے بے انتہا نام

// ${theme} کی یہ کہانی
// دل کو چھو لے نرگسی`,
//     hindi: `दिल की बातें कहीं अनकही रह गईं
// तेरे ख्यालों में खोई हुई सी रह गईं

// ${title} की ये कहानी
// ${theme} का है ये फसाना
// हर लफ्ज़ में तुझे ही पाने का
// दिल करता है एक नया जमाना`,
//     english: `In the quiet moments of dawn's first light,
// Where ${theme} blooms, ever so bright.
// ${title} echoes through the silent air,
// A whispered promise, a poet's prayer.
// Let these words find their way to you,
// A gift of verse, forever true.`
//   };
  
//   const content = poems[language] || poems.urdu;
  
//   return {
//     success: true,
//     provider: 'fallback',
//     content: content,
//     analysis: {
//       themes: [theme, 'poetry', 'emotion'],
//       tone: 'melancholic',
//       sentiment: 'positive',
//       emotions: ['love', 'longing'],
//       meaning: `This ${genre} poem explores themes of ${theme} with emotional depth.`,
//       literaryDevices: ['metaphor', 'imagery'],
//       rhymeScheme: 'AABB pattern',
//       difficulty: 'intermediate'
//     }
//   };
// }

// // ============================================
// // MAIN ORCHESTRATOR
// // ============================================
// export const generatePoem = async (params, userId = null) => {
//   const { title, theme, genre, language, forceRefresh = false } = params;
  
//   console.log('🎯 Generating poem with params:', { title, theme, genre, language });
  
//   // Check cache
//   if (!forceRefresh) {
//     const cacheKey = getCacheKey('poem', { title, theme, genre, language });
//     try {
//       const cached = await AICache.findOne({ cacheKey });
//       if (cached && (Date.now() - cached.createdAt) < CACHE_TTL) {
//         console.log('✅ Using cached poem');
//         return {
//           success: true,
//           fromCache: true,
//           provider: cached.provider,
//           content: cached.content,
//           analysis: cached.analysis
//         };
//       }
//     } catch (error) {
//       console.error('Cache error:', error);
//     }
//   }
  
//   // Try real providers
//   const providers = [
//     { name: 'deepseek', fn: () => callDeepSeek(params) },
//     { name: 'gemini', fn: () => callGemini(params) },
//     { name: 'huggingface', fn: () => callHuggingFace(params) }
//   ];
  
//   for (const provider of providers) {
//     console.log(`🔄 Trying ${provider.name}...`);
//     const result = await provider.fn();
    
//     if (result.success) {
//       console.log(`✅ ${provider.name} succeeded!`);
      
//       // Cache result
//       try {
//         const cacheKey = getCacheKey('poem', { title, theme, genre, language });
//         await AICache.findOneAndUpdate(
//           { cacheKey },
//           {
//             cacheKey,
//             type: 'poem',
//             requestParams: params,
//             content: result.content,
//             analysis: result.analysis,
//             provider: provider.name,
//             createdAt: new Date()
//           },
//           { upsert: true }
//         );
//       } catch (error) {
//         console.error('Cache save error:', error);
//       }
      
//       return result;
//     } else {
//       console.log(`❌ ${provider.name} failed:`, result.error);
//     }
//   }
  
//   // All providers failed - use fallback
//   console.log('⚠️ All providers failed, using fallback');
//   return getFallbackPoem(params);
// };

// export const analyzePoem = async (poemText, language = 'urdu', userId = null) => {
//   // Simple fallback analysis
//   return {
//     success: true,
//     provider: 'fallback',
//     analysis: {
//       themes: ['love', 'nature', 'spirituality'],
//       tone: 'contemplative',
//       sentiment: 'positive',
//       emotions: ['joy', 'peace', 'hope'],
//       meaning: 'This poem expresses deep emotions through beautiful imagery.',
//       literaryDevices: ['metaphor', 'imagery', 'rhyme'],
//       rhymeScheme: 'Rhythmic pattern',
//       difficulty: 'intermediate'
//     }
//   };
// };















// // server/services/aiOrchestrator.js
// import AICache from '../models/AICache.js';
// import { analyzePoemLocally } from './localAnalysisService.js';

// const CACHE_TTL = 24 * 60 * 60 * 1000;

// // ============================================
// // GEMINI MODELS (Priority order)
// // ============================================
// const GEMINI_GENERATION_MODELS = [
//   'gemini-2.5-flash-lite',  // ✅ Confirmed working
//   'gemini-2.0-flash',       // Fallback (may hit quota)
//   'gemini-flash-latest'     // Last resort
// ];

// const GEMINI_ANALYSIS_MODELS = [
//   'gemini-2.5-flash-lite',  // ✅ Confirmed working
//   'gemini-2.0-flash',       // Fallback (may hit quota)
//   'gemini-flash-latest'     // Last resort
// ];

// // ============================================
// // GEMINI API CALL (with model fallback)
// // ============================================
// async function callGemini(params) {
//   const { title, theme, genre, language } = params;
//   const apiKey = process.env.GEMINI_API_KEY;
  
//   console.log('🟢 Using Gemini API for generation...');
  
//   if (!apiKey) {
//     console.log('❌ Gemini API key missing');
//     return { success: false, error: 'API key missing' };
//   }
  
//   // Map language for Gemini
//   const languageMap = {
//     urdu: 'Urdu', hindi: 'Hindi', english: 'English'
//   };
//   const geminiLanguage = languageMap[language] || 'Urdu';
  
//   const prompt = `Write a ${genre} poem in ${geminiLanguage} language.
// Title: "${title}"
// Theme: ${theme}
// Length: 8-12 lines with proper rhyme scheme.
// Return ONLY the poem text, no explanations.`;
  
//   // Try each model for generation
//   for (const modelName of GEMINI_GENERATION_MODELS) {
//     try {
//       console.log(`🔄 Trying generation with model: ${modelName}`);
      
//       const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           contents: [{ parts: [{ text: prompt }] }],
//           generationConfig: {
//             temperature: 0.8,
//             maxOutputTokens: 500,
//             topP: 0.9
//           }
//         })
//       });
      
//       if (response.status === 503 || response.status === 429) {
//         console.log(`⚠️ Model ${modelName} unavailable (${response.status}), trying next...`);
//         continue;
//       }
      
//       if (!response.ok) {
//         const error = await response.text();
//         console.error(`Gemini API error for ${modelName}:`, error.substring(0, 100));
//         continue;
//       }
      
//       const data = await response.json();
//       const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
//       if (!content) {
//         console.log(`❌ Model ${modelName} returned empty response`);
//         continue;
//       }
      
//       console.log(`✅ Generation succeeded with model: ${modelName}`);
      
//       // Generate analysis using Gemini with its own fallback chain
//       const analysis = await analyzeWithGemini(content, language);
      
//       return {
//         success: true,
//         provider: 'gemini',
//         model: modelName,
//         content: content,
//         analysis: analysis.success ? analysis.analysis : getDefaultAnalysis(theme, genre)
//       };
//     } catch (error) {
//       console.error(`Error with model ${modelName}:`, error.message);
//       continue;
//     }
//   }
  
//   return { success: false, error: 'All Gemini models failed for generation' };
// }

// // ============================================
// // GEMINI ANALYSIS (with model fallback)
// // ============================================
// async function analyzeWithGemini(poemText, language) {
//   const apiKey = process.env.GEMINI_API_KEY;
  
//   console.log('🟢 analyzeWithGemini called');
//   console.log('API Key present:', !!apiKey);
//   console.log('Poem length:', poemText.length);
  
//   if (!apiKey) {
//     console.log('❌ Gemini API key missing');
//     return { success: false, error: 'API key missing' };
//   }
  
//   const languageMap = {
//     urdu: 'Urdu', hindi: 'Hindi', english: 'English'
//   };
//   const geminiLanguage = languageMap[language] || 'Urdu';
  
//   const prompt = `Analyze this ${geminiLanguage} poem and return ONLY valid JSON. Do not include any text outside the JSON object.

// Poem: "${poemText.substring(0, 1500)}"

// Required JSON format:
// {
//   "themes": ["theme1", "theme2", "theme3"],
//   "tone": "emotional tone description",
//   "sentiment": "positive/negative/neutral",
//   "emotions": ["emotion1", "emotion2"],
//   "meaning": "Brief explanation of what the poem means (2-3 sentences)",
//   "literaryDevices": ["device1", "device2", "device3"],
//   "rhymeScheme": "description of rhyme pattern",
//   "difficulty": "beginner/intermediate/advanced"
// }

// Example for a marsiya poem about Karbala:
// {
//   "themes": ["Karbala", "Martyrdom", "Sacrifice", "Devotion"],
//   "tone": "Tragic and Heroic",
//   "sentiment": "negative",
//   "emotions": ["Sorrow", "Reverence", "Grief", "Devotion"],
//   "meaning": "This marsiya mourns the martyrdom of Imam Hussain at Karbala, expressing deep sorrow while celebrating his sacrifice.",
//   "literaryDevices": ["Repetition", "Imagery", "Metaphor", "Apostrophe"],
//   "rhymeScheme": "AABB couplets with internal rhymes",
//   "difficulty": "intermediate"
// }`;

//   // Try each model for analysis
//   for (const modelName of GEMINI_ANALYSIS_MODELS) {
//     try {
//       console.log(`🔄 Trying analysis with model: ${modelName}`);
      
//       const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           contents: [{ parts: [{ text: prompt }] }],
//           generationConfig: {
//             temperature: 0.5,
//             maxOutputTokens: 600,
//             topP: 0.9
//           }
//         })
//       });
      
//       console.log(`📡 Response status for ${modelName}:`, response.status);
      
//       // Skip unavailable models
//       if (response.status === 503 || response.status === 429) {
//         console.log(`⚠️ Model ${modelName} unavailable (${response.status}), trying next...`);
//         continue;
//       }
      
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error(`❌ Gemini API error for ${modelName}:`, response.status, errorText.substring(0, 100));
//         continue;
//       }
      
//       const data = await response.json();
//       let content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
//       console.log(`📝 Response length from ${modelName}:`, content.length);
      
//       // Improved JSON extraction (handles markdown code blocks)
//       let jsonString = content;
      
//       // Remove markdown JSON code blocks
//       jsonString = jsonString.replace(/```json\s*/g, '');
//       jsonString = jsonString.replace(/```\s*/g, '');
      
//       // Try to find JSON object
//       const jsonMatch = jsonString.match(/\{[\s\S]*\}/);
//       if (jsonMatch) {
//         try {
//           const analysis = JSON.parse(jsonMatch[0]);
//           console.log(`✅ Successfully parsed Gemini analysis from ${modelName}`);
//           return {
//             success: true,
//             provider: 'gemini',
//             model: modelName,
//             analysis: analysis
//           };
//         } catch (parseError) {
//           console.error('❌ JSON parse error:', parseError.message);
//           console.error('Attempted to parse:', jsonMatch[0].substring(0, 200));
//           continue;
//         }
//       } else {
//         console.log('❌ No JSON found in response, trying next model...');
//         continue;
//       }
      
//     } catch (error) {
//       console.error(`❌ Gemini request error with ${modelName}:`, error.message);
//       continue;
//     }
//   }
  
//   console.log('❌ All Gemini models failed for analysis');
//   return { success: false, error: 'All Gemini models failed for analysis' };
// }

// // ============================================
// // DEFAULT ANALYSIS (Fallback)
// // ============================================
// function getDefaultAnalysis(theme, genre) {
//   return {
//     themes: [theme, 'poetry', 'emotion', 'expression'],
//     tone: 'expressive',
//     sentiment: 'neutral',
//     emotions: ['thoughtful', 'reflective', 'creative'],
//     meaning: `A beautiful ${genre} poem exploring the theme of ${theme} through vivid imagery and emotional depth.`,
//     literaryDevices: ['imagery', 'metaphor', 'rhyme', 'symbolism'],
//     rhymeScheme: 'Traditional rhythmic pattern',
//     difficulty: 'intermediate'
//   };
// }

// // ============================================
// // FALLBACK POEM GENERATOR
// // ============================================
// function getFallbackPoem(params) {
//   const { title, theme, genre, language } = params;
  
//   const poems = {
//     urdu: `دل کی باتیں کہاں کہی جائیں
// تیرے خوابوں میں کھو گئی ہیں

// ${title} کا یہ پیغام
// محبت کا ہے بے انتہا نام

// ${theme} کی یہ کہانی
// دل کو چھو لے نرگسی سی
    
// یہ اشعار ہیں میرے احساس
// تم تک پہنچے بنا پیاس`,
    
//     hindi: `ये कहानी है ${theme} की
// जो दिल से दिल तक जाती है

// ${title} का ये पैगाम
// मोहब्बत की है बेइंतहा शाम

// भावनाओं की ये रवानी
// दिल को छू लेती है सुबहानी`,
    
//     english: `In the quiet moments of dawn's first light,
// Where ${theme} blooms, ever so bright.
// ${title} echoes through the silent air,
// A whispered promise, a poet's prayer.
    
// Through verses woven with care and grace,
// Emotions find their sacred space.
// This ${genre} speaks what hearts convey,
// In rhythmic words that never stray.`
//   };
  
//   return {
//     success: true,
//     provider: 'fallback',
//     content: poems[language] || poems.urdu,
//     analysis: getDefaultAnalysis(theme, genre)
//   };
// }

// // ============================================
// // MAIN ORCHESTRATOR - Generate Poem
// // ============================================
// export const generatePoem = async (params, userId = null) => {
//   const { title, theme, genre, language, forceRefresh = false } = params;
  
//   console.log('🎯 Generating poem with params:', { title, theme, genre, language });
  
//   // Check cache
//   if (!forceRefresh) {
//     const cacheKey = `poem:${title}:${theme}:${genre}:${language}`;
//     try {
//       const cached = await AICache.findOne({ cacheKey });
//       if (cached && (Date.now() - cached.createdAt) < CACHE_TTL) {
//         console.log('✅ Using cached poem');
//         return {
//           success: true,
//           fromCache: true,
//           provider: cached.provider,
//           content: cached.content,
//           analysis: cached.analysis
//         };
//       }
//     } catch (error) {
//       console.error('Cache error:', error);
//     }
//   }
  
//   // Try Gemini first (with fallback chain)
//   console.log('🔄 Trying Gemini (primary)...');
//   const geminiResult = await callGemini(params);
  
//   if (geminiResult.success) {
//     console.log('✅ Gemini succeeded!');
    
//     // Cache result
//     try {
//       const cacheKey = `poem:${title}:${theme}:${genre}:${language}`;
//       await AICache.findOneAndUpdate(
//         { cacheKey },
//         {
//           cacheKey,
//           type: 'poem',
//           requestParams: params,
//           content: geminiResult.content,
//           analysis: geminiResult.analysis,
//           provider: geminiResult.provider,
//           createdAt: new Date()
//         },
//         { upsert: true, new: true }
//       );
//       console.log('💾 Cached successfully');
//     } catch (error) {
//       console.error('Cache save error:', error);
//     }
    
//     return geminiResult;
//   }
  
//   // Fallback to local generation
//   console.log('⚠️ Gemini failed, using fallback generation');
//   return getFallbackPoem(params);
// };

// // ============================================
// // MAIN ORCHESTRATOR - Analyze Poem
// // ============================================
// export const analyzePoem = async (poemText, language = 'urdu', userId = null) => {
//   console.log('🔍 Analyzing poem with Gemini...');
//   console.log('Poem preview:', poemText.substring(0, 100) + '...');
  
//   // Try Gemini analysis first (with fallback chain internally)
//   const geminiAnalysis = await analyzeWithGemini(poemText, language);
  
//   if (geminiAnalysis.success) {
//     console.log('✅ Gemini analysis succeeded!');
//     return geminiAnalysis;
//   }
  
//   // Fallback to local analysis
//   console.log('⚠️ Gemini analysis failed, using local analysis fallback');
//   const localAnalysis = analyzePoemLocally(poemText);
  
//   return {
//     success: true,
//     provider: 'local-nlp',
//     analysis: localAnalysis
//   };
// };

// // ============================================
// // HELPER: Clear cache for a specific poem
// // ============================================
// export const clearPoemCache = async (params) => {
//   const { title, theme, genre, language } = params;
//   const cacheKey = `poem:${title}:${theme}:${genre}:${language}`;
  
//   try {
//     await AICache.deleteOne({ cacheKey });
//     console.log('🗑️ Cache cleared for:', cacheKey);
//     return { success: true };
//   } catch (error) {
//     console.error('Cache clear error:', error);
//     return { success: false, error: error.message };
//   }
// };

// // ============================================
// // HELPER: Get API status
// // ============================================
// export const getApiStatus = async () => {
//   const apiKey = process.env.GEMINI_API_KEY;
  
//   if (!apiKey) {
//     return {
//       gemini: { available: false, error: 'API key missing' },
//       fallback: { available: true }
//     };
//   }
  
//   // Test Gemini availability
//   try {
//     const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         contents: [{ parts: [{ text: "Test" }] }],
//         generationConfig: { maxOutputTokens: 10 }
//       })
//     });
    
//     return {
//       gemini: { 
//         available: response.ok, 
//         status: response.status,
//         model: 'gemini-2.5-flash-lite'
//       },
//       fallback: { available: true }
//     };
//   } catch (error) {
//     return {
//       gemini: { available: false, error: error.message },
//       fallback: { available: true }
//     };
//   }
// };


























// server/services/aiOrchestrator.js
import AICache from '../models/AICache.js';
import { analyzePoemLocally } from './localAnalysisService.js';
import { analyzePoemOpenRouter, generatePoemOpenRouter, checkOpenRouterHealth } from './openRouterService.js';
import { analyzePoemHuggingFace, generatePoemHuggingFace } from './huggingFaceService.js';

const CACHE_TTL = 24 * 60 * 60 * 1000;

// ============================================
// GEMINI MODELS (Priority order)
// ============================================
const GEMINI_GENERATION_MODELS = [
  'gemini-2.5-flash-lite',  // ✅ Confirmed working
  'gemini-2.0-flash',       // Fallback (may hit quota)
  'gemini-flash-latest'     // Last resort
];

const GEMINI_ANALYSIS_MODELS = [
  'gemini-2.5-flash-lite',  // ✅ Confirmed working
  'gemini-2.0-flash',       // Fallback (may hit quota)
  'gemini-flash-latest'     // Last resort
];

// ============================================
// CIRCUIT BREAKER FOR PROVIDERS
// ============================================
const providerFailures = {};
const providerLastFailure = {};

function isCircuitOpen(provider) {
  const failures = providerFailures[provider] || 0;
  const lastFailure = providerLastFailure[provider];
  if (failures >= 2 && lastFailure && (Date.now() - lastFailure) < 60000) {
    return true;
  }
  return false;
}

function recordFailure(provider) {
  providerFailures[provider] = (providerFailures[provider] || 0) + 1;
  providerLastFailure[provider] = Date.now();
  console.log(`⚠️ Circuit breaker: ${provider} failed (${providerFailures[provider]}/2)`);
}

function recordSuccess(provider) {
  providerFailures[provider] = 0;
  console.log(`✅ Circuit breaker: ${provider} reset`);
}

// ============================================
// GEMINI API CALL (with model fallback)
// ============================================
async function callGemini(params) {
  const { title, theme, genre, language } = params;
  const apiKey = process.env.GEMINI_API_KEY;
  
  console.log('🟢 Using Gemini API for generation...');
  
  if (!apiKey) {
    console.log('❌ Gemini API key missing');
    return { success: false, error: 'API key missing' };
  }
  
  // Check circuit breaker
  if (isCircuitOpen('gemini')) {
    console.log('⏭️ Gemini circuit breaker open, skipping');
    return { success: false, error: 'Circuit breaker open' };
  }
  
  // Map language for Gemini
  const languageMap = {
    urdu: 'Urdu', hindi: 'Hindi', english: 'English'
  };
  const geminiLanguage = languageMap[language] || 'Urdu';
  
  const prompt = `Write a ${genre} poem in ${geminiLanguage} language.
Title: "${title}"
Theme: ${theme}
Length: 8-12 lines with proper rhyme scheme.
Return ONLY the poem text, no explanations.`;
  
  // Try each model for generation
  for (const modelName of GEMINI_GENERATION_MODELS) {
    try {
      console.log(`🔄 Trying generation with model: ${modelName}`);
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 500,
            topP: 0.9
          }
        })
      });
      
      if (response.status === 503 || response.status === 429) {
        console.log(`⚠️ Model ${modelName} unavailable (${response.status}), trying next...`);
        continue;
      }
      
      if (!response.ok) {
        const error = await response.text();
        console.error(`Gemini API error for ${modelName}:`, error.substring(0, 100));
        continue;
      }
      
      const data = await response.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      if (!content) {
        console.log(`❌ Model ${modelName} returned empty response`);
        continue;
      }
      
      console.log(`✅ Generation succeeded with model: ${modelName}`);
      recordSuccess('gemini');
      
      // Generate analysis using Gemini with its own fallback chain
      const analysis = await analyzeWithGemini(content, language);
      
      return {
        success: true,
        provider: 'gemini',
        model: modelName,
        content: content,
        analysis: analysis.success ? analysis.analysis : getDefaultAnalysis(theme, genre)
      };
    } catch (error) {
      console.error(`Error with model ${modelName}:`, error.message);
      continue;
    }
  }
  
  recordFailure('gemini');
  return { success: false, error: 'All Gemini models failed for generation' };
}

// ============================================
// GEMINI ANALYSIS (with model fallback)
// ============================================
async function analyzeWithGemini(poemText, language) {
  const apiKey = process.env.GEMINI_API_KEY;
  
  console.log('🟢 analyzeWithGemini called');
  console.log('API Key present:', !!apiKey);
  console.log('Poem length:', poemText.length);
  
  if (!apiKey) {
    console.log('❌ Gemini API key missing');
    return { success: false, error: 'API key missing' };
  }
  
  // Check circuit breaker
  if (isCircuitOpen('gemini')) {
    console.log('⏭️ Gemini circuit breaker open for analysis');
    return { success: false, error: 'Circuit breaker open' };
  }
  
  const languageMap = {
    urdu: 'Urdu', hindi: 'Hindi', english: 'English'
  };
  const geminiLanguage = languageMap[language] || 'Urdu';
  
  const prompt = `Analyze this ${geminiLanguage} poem and return ONLY valid JSON. Do not include any text outside the JSON object.

Poem: "${poemText.substring(0, 1500)}"

Required JSON format:
{
  "themes": ["theme1", "theme2", "theme3"],
  "tone": "emotional tone description",
  "sentiment": "positive/negative/neutral",
  "emotions": ["emotion1", "emotion2"],
  "meaning": "Brief explanation of what the poem means (2-3 sentences)",
  "literaryDevices": ["device1", "device2", "device3"],
  "rhymeScheme": "description of rhyme pattern",
  "difficulty": "beginner/intermediate/advanced"
}

Example for a marsiya poem about Karbala:
{
  "themes": ["Karbala", "Martyrdom", "Sacrifice", "Devotion"],
  "tone": "Tragic and Heroic",
  "sentiment": "negative",
  "emotions": ["Sorrow", "Reverence", "Grief", "Devotion"],
  "meaning": "This marsiya mourns the martyrdom of Imam Hussain at Karbala, expressing deep sorrow while celebrating his sacrifice.",
  "literaryDevices": ["Repetition", "Imagery", "Metaphor", "Apostrophe"],
  "rhymeScheme": "AABB couplets with internal rhymes",
  "difficulty": "intermediate"
}`;

  // Try each model for analysis
  for (const modelName of GEMINI_ANALYSIS_MODELS) {
    try {
      console.log(`🔄 Trying analysis with model: ${modelName}`);
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.5,
            maxOutputTokens: 600,
            topP: 0.9
          }
        })
      });
      
      console.log(`📡 Response status for ${modelName}:`, response.status);
      
      // Skip unavailable models
      if (response.status === 503 || response.status === 429) {
        console.log(`⚠️ Model ${modelName} unavailable (${response.status}), trying next...`);
        continue;
      }
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ Gemini API error for ${modelName}:`, response.status, errorText.substring(0, 100));
        continue;
      }
      
      const data = await response.json();
      let content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      console.log(`📝 Response length from ${modelName}:`, content.length);
      
      // Improved JSON extraction (handles markdown code blocks)
      let jsonString = content;
      
      // Remove markdown JSON code blocks
      jsonString = jsonString.replace(/```json\s*/g, '');
      jsonString = jsonString.replace(/```\s*/g, '');
      
      // Try to find JSON object
      const jsonMatch = jsonString.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const analysis = JSON.parse(jsonMatch[0]);
          console.log(`✅ Successfully parsed Gemini analysis from ${modelName}`);
          recordSuccess('gemini');
          return {
            success: true,
            provider: 'gemini',
            model: modelName,
            analysis: analysis
          };
        } catch (parseError) {
          console.error('❌ JSON parse error:', parseError.message);
          console.error('Attempted to parse:', jsonMatch[0].substring(0, 200));
          continue;
        }
      } else {
        console.log('❌ No JSON found in response, trying next model...');
        continue;
      }
      
    } catch (error) {
      console.error(`❌ Gemini request error with ${modelName}:`, error.message);
      continue;
    }
  }
  
  recordFailure('gemini');
  console.log('❌ All Gemini models failed for analysis');
  return { success: false, error: 'All Gemini models failed for analysis' };
}

// ============================================
// OPENROUTER ANALYSIS (Free DeepSeek replacement)
// ============================================
async function analyzeWithOpenRouter(poemText, poemTitle) {
  console.log('🟣 Using OpenRouter for analysis (free DeepSeek)...');
  
  if (isCircuitOpen('openrouter')) {
    console.log('⏭️ OpenRouter circuit breaker open');
    return { success: false, error: 'Circuit breaker open' };
  }
  
  const result = await analyzePoemOpenRouter(poemText, poemTitle);
  
  if (result.success && result.analysis) {
    recordSuccess('openrouter');
    return {
      success: true,
      provider: 'openrouter',
      model: result.modelUsed,
      analysis: result.analysis
    };
  }
  
  recordFailure('openrouter');
  return { success: false, error: result.error };
}

// ============================================
// OPENROUTER POEM GENERATION (Free DeepSeek replacement)
// ============================================
async function generateWithOpenRouter(params) {
  console.log('🟣 Using OpenRouter for generation (free DeepSeek)...');
  
  if (isCircuitOpen('openrouter')) {
    console.log('⏭️ OpenRouter circuit breaker open');
    return { success: false, error: 'Circuit breaker open' };
  }
  
  const result = await generatePoemOpenRouter(params);
  
  if (result.success && result.content) {
    recordSuccess('openrouter');
    
    // Generate analysis for the poem
    let analysis = null;
    try {
      const analysisResult = await analyzeWithOpenRouter(result.content, params.title);
      if (analysisResult.success) {
        analysis = analysisResult.analysis;
      }
    } catch (error) {
      console.log('Could not generate analysis for OpenRouter poem');
    }
    
    return {
      success: true,
      provider: 'openrouter',
      model: result.modelUsed,
      content: result.content,
      analysis: analysis || getDefaultAnalysis(params.theme, params.genre)
    };
  }
  
  recordFailure('openrouter');
  return { success: false, error: result.error };
}

// ============================================
// HUGGING FACE ANALYSIS
// ============================================
async function analyzeWithHuggingFace(poemText, poemTitle) {
  console.log('🟤 Using Hugging Face for analysis...');
  
  if (isCircuitOpen('huggingface')) {
    console.log('⏭️ Hugging Face circuit breaker open');
    return { success: false, error: 'Circuit breaker open' };
  }
  
  const result = await analyzePoemHuggingFace(poemText, poemTitle);
  
  if (result.success && result.analysis) {
    recordSuccess('huggingface');
    return {
      success: true,
      provider: 'huggingface',
      model: result.modelUsed || 'huggingface-model',
      analysis: result.analysis
    };
  }
  
  recordFailure('huggingface');
  return { success: false, error: result.error };
}

// ============================================
// HUGGING FACE POEM GENERATION
// ============================================
async function generateWithHuggingFace(params) {
  console.log('🟤 Using Hugging Face for generation...');
  
  if (isCircuitOpen('huggingface')) {
    console.log('⏭️ Hugging Face circuit breaker open');
    return { success: false, error: 'Circuit breaker open' };
  }
  
  const result = await generatePoemHuggingFace(params);
  
  if (result.success && result.content) {
    recordSuccess('huggingface');
    
    // Generate analysis for the poem
    let analysis = null;
    try {
      const analysisResult = await analyzeWithHuggingFace(result.content, params.title);
      if (analysisResult.success) {
        analysis = analysisResult.analysis;
      }
    } catch (error) {
      console.log('Could not generate analysis for Hugging Face poem');
    }
    
    return {
      success: true,
      provider: 'huggingface',
      model: result.modelUsed || 'huggingface-model',
      content: result.content,
      analysis: analysis || getDefaultAnalysis(params.theme, params.genre)
    };
  }
  
  recordFailure('huggingface');
  return { success: false, error: result.error };
}

// ============================================
// DEFAULT ANALYSIS (Fallback)
// ============================================
function getDefaultAnalysis(theme, genre) {
  return {
    themes: [theme, 'poetry', 'emotion', 'expression'],
    tone: 'expressive',
    sentiment: 'neutral',
    emotions: ['thoughtful', 'reflective', 'creative'],
    meaning: `A beautiful ${genre} poem exploring the theme of ${theme} through vivid imagery and emotional depth.`,
    literaryDevices: ['imagery', 'metaphor', 'rhyme', 'symbolism'],
    rhymeScheme: 'Traditional rhythmic pattern',
    difficulty: 'intermediate'
  };
}

// ============================================
// FALLBACK POEM GENERATOR (Last resort)
// ============================================
function getFallbackPoem(params) {
  const { title, theme, genre, language } = params;
  
  const poems = {
    urdu: `دل کی باتیں کہاں کہی جائیں
تیرے خوابوں میں کھو گئی ہیں

${title} کا یہ پیغام
محبت کا ہے بے انتہا نام

${theme} کی یہ کہانی
دل کو چھو لے نرگسی سی
    
یہ اشعار ہیں میرے احساس
تم تک پہنچے بنا پیاس`,
    
    hindi: `ये कहानी है ${theme} की
जो दिल से दिल तक जाती है

${title} का ये पैगाम
मोहब्बत की है बेइंतहा शाम

भावनाओं की ये रवानी
दिल को छू लेती है सुबहानी`,
    
    english: `In the quiet moments of dawn's first light,
Where ${theme} blooms, ever so bright.
${title} echoes through the silent air,
A whispered promise, a poet's prayer.
    
Through verses woven with care and grace,
Emotions find their sacred space.
This ${genre} speaks what hearts convey,
In rhythmic words that never stray.`
  };
  
  return {
    success: true,
    provider: 'fallback',
    model: 'local-template',
    content: poems[language] || poems.urdu,
    analysis: getDefaultAnalysis(theme, genre)
  };
}

// ============================================
// MAIN ORCHESTRATOR - Generate Poem
// Priority: Gemini → OpenRouter → Hugging Face → Fallback
// ============================================
export const generatePoem = async (params, userId = null) => {
  const { title, theme, genre, language, forceRefresh = false } = params;
  
  console.log('\n🎯 Generating poem with params:', { title, theme, genre, language });
  console.log('=' .repeat(60));
  
  // Check cache
  if (!forceRefresh) {
    const cacheKey = `poem:${title}:${theme}:${genre}:${language}`;
    try {
      const cached = await AICache.findOne({ cacheKey });
      if (cached && (Date.now() - cached.createdAt) < CACHE_TTL) {
        console.log('✅ Using cached poem from:', cached.provider);
        return {
          success: true,
          fromCache: true,
          provider: cached.provider,
          model: cached.model,
          content: cached.content,
          analysis: cached.analysis
        };
      }
    } catch (error) {
      console.error('Cache error:', error);
    }
  }
  
  // Priority 1: Try Gemini
  console.log('\n📡 Priority 1: Trying Gemini...');
  const geminiResult = await callGemini(params);
  
  if (geminiResult.success) {
    console.log('✅ Gemini generation succeeded!');
    await cachePoemResult(params, geminiResult);
    return geminiResult;
  }
  
  // Priority 2: Try OpenRouter (Free DeepSeek replacement)
  console.log('\n📡 Priority 2: Trying OpenRouter (free DeepSeek)...');
  const openRouterResult = await generateWithOpenRouter(params);
  
  if (openRouterResult.success) {
    console.log(`✅ OpenRouter generation succeeded with ${openRouterResult.model}!`);
    await cachePoemResult(params, openRouterResult);
    return openRouterResult;
  }
  
  // Priority 3: Try Hugging Face
  console.log('\n📡 Priority 3: Trying Hugging Face...');
  const hfResult = await generateWithHuggingFace(params);
  
  if (hfResult.success) {
    console.log(`✅ Hugging Face generation succeeded with ${hfResult.model}!`);
    await cachePoemResult(params, hfResult);
    return hfResult;
  }
  
  // Priority 4: Fallback to local generation
  console.log('\n📡 Priority 4: Using fallback generation...');
  const fallbackResult = getFallbackPoem(params);
  await cachePoemResult(params, fallbackResult);
  
  return fallbackResult;
};

// ============================================
// MAIN ORCHESTRATOR - Analyze Poem
// Priority: Gemini → OpenRouter → Hugging Face → Local
// ============================================
export const analyzePoem = async (poemText, language = 'urdu', poemTitle = 'Poem', userId = null) => {
  console.log('\n🔍 Analyzing poem...');
  console.log('Poem preview:', poemText.substring(0, 100) + '...');
  console.log('=' .repeat(60));
  
  // Priority 1: Try Gemini analysis
  console.log('\n📡 Priority 1: Trying Gemini...');
  const geminiAnalysis = await analyzeWithGemini(poemText, language);
  
  if (geminiAnalysis.success) {
    console.log('✅ Gemini analysis succeeded!');
    return geminiAnalysis;
  }
  
  // Priority 2: Try OpenRouter (Free DeepSeek replacement)
  console.log('\n📡 Priority 2: Trying OpenRouter (free DeepSeek)...');
  const openRouterAnalysis = await analyzeWithOpenRouter(poemText, poemTitle);
  
  if (openRouterAnalysis.success) {
    console.log(`✅ OpenRouter analysis succeeded with ${openRouterAnalysis.model}!`);
    return openRouterAnalysis;
  }
  
  // Priority 3: Try Hugging Face
  console.log('\n📡 Priority 3: Trying Hugging Face...');
  const hfAnalysis = await analyzeWithHuggingFace(poemText, poemTitle);
  
  if (hfAnalysis.success) {
    console.log(`✅ Hugging Face analysis succeeded with ${hfAnalysis.model}!`);
    return hfAnalysis;
  }
  
  // Priority 4: Fallback to local analysis
  console.log('\n📡 Priority 4: Using local analysis fallback...');
  const localAnalysis = analyzePoemLocally(poemText);
  
  return {
    success: true,
    provider: 'local-nlp',
    model: 'rule-based',
    analysis: localAnalysis,
    isFallback: true
  };
};

// ============================================
// HELPER: Cache poem result
// ============================================
async function cachePoemResult(params, result) {
  const { title, theme, genre, language } = params;
  const cacheKey = `poem:${title}:${theme}:${genre}:${language}`;
  
  try {
    await AICache.findOneAndUpdate(
      { cacheKey },
      {
        cacheKey,
        type: 'poem',
        requestParams: params,
        content: result.content,
        analysis: result.analysis,
        provider: result.provider,
        model: result.model,
        createdAt: new Date()
      },
      { upsert: true, new: true }
    );
    console.log('💾 Cached successfully');
  } catch (error) {
    console.error('Cache save error:', error);
  }
}

// ============================================
// HELPER: Clear cache for a specific poem
// ============================================
export const clearPoemCache = async (params) => {
  const { title, theme, genre, language } = params;
  const cacheKey = `poem:${title}:${theme}:${genre}:${language}`;
  
  try {
    await AICache.deleteOne({ cacheKey });
    console.log('🗑️ Cache cleared for:', cacheKey);
    return { success: true };
  } catch (error) {
    console.error('Cache clear error:', error);
    return { success: false, error: error.message };
  }
};

// ============================================
// HELPER: Get API status
// ============================================
export const getApiStatus = async () => {
  const apiKey = process.env.GEMINI_API_KEY;
  const openRouterHealth = await checkOpenRouterHealth();
  
  const hfToken = process.env.HUGGING_FACE_API_KEY;
  
  const status = {
    priority: ['gemini', 'openrouter', 'huggingface', 'fallback'],
    gemini: { 
      available: false, 
      models: GEMINI_GENERATION_MODELS,
      circuitOpen: isCircuitOpen('gemini')
    },
    openrouter: {
      ...openRouterHealth,
      circuitOpen: isCircuitOpen('openrouter')
    },
    huggingface: {
      configured: typeof hfToken === 'string' && hfToken.startsWith('hf_'),
      available: false,
      circuitOpen: isCircuitOpen('huggingface')
    },
    fallback: { available: true }
  };
  
  if (!apiKey) {
    status.gemini.error = 'API key missing';
    return status;
  }
  
  // Test Gemini availability
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "Test" }] }],
        generationConfig: { maxOutputTokens: 10 }
      })
    });
    
    status.gemini = { 
      available: response.ok, 
      status: response.status,
      model: 'gemini-2.5-flash-lite',
      circuitOpen: isCircuitOpen('gemini')
    };
  } catch (error) {
    status.gemini = { available: false, error: error.message, circuitOpen: isCircuitOpen('gemini') };
  }
  
  return status;
};

// ============================================
// EXPORTS
// ============================================
export default {
  generatePoem,
  analyzePoem,
  clearPoemCache,
  getApiStatus
};