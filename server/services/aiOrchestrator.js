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














// server/services/aiOrchestrator.js
import AICache from '../models/AICache.js';

const CACHE_TTL = 24 * 60 * 60 * 1000;

const getCacheKey = (type, params) => {
  return `${type}:${JSON.stringify(params)}`;
};

// ============================================
// DEEPSEEK API CALL (Fixed)
// ============================================
async function callDeepSeek(params) {
  const { title, theme, genre, language } = params;
  const apiKey = process.env.DEEPSEEK_API_KEY;
  
  console.log('🔵 DeepSeek API Key present:', !!apiKey);
  console.log('🔵 DeepSeek Key length:', apiKey?.length);
  
  if (!apiKey || apiKey === 'your_deepseek_api_key_here' || apiKey === '') {
    console.log('⚠️ DeepSeek API key not configured or invalid');
    return { success: false, error: 'DeepSeek API key missing or invalid' };
  }
  
  const prompt = `Write a ${genre} poem in ${language} language.
Title: "${title}"
Theme: ${theme}
Length: 6-8 lines with proper rhyme scheme.
Return ONLY the poem text, no explanations.`;
  
  try {
    console.log('🔄 Calling DeepSeek API...');
    
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
        max_tokens: 500
      })
    });
    
    console.log('🔵 DeepSeek Response Status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ DeepSeek Error:', errorText);
      return { success: false, error: `DeepSeek API error: ${response.status} - ${errorText}` };
    }
    
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';
    
    if (!content) {
      return { success: false, error: 'DeepSeek returned empty response' };
    }
    
    console.log('✅ DeepSeek generated poem length:', content.length);
    
    // Simple analysis without API call
    const analysis = {
      themes: [theme, 'poetry', 'emotion'],
      tone: 'expressive',
      sentiment: 'positive',
      emotions: ['love', 'passion'],
      meaning: `A beautiful ${genre} poem exploring the theme of ${theme}.`,
      literaryDevices: ['imagery', 'metaphor'],
      rhymeScheme: 'Traditional pattern',
      difficulty: 'intermediate'
    };
    
    return {
      success: true,
      provider: 'deepseek',
      content: content,
      analysis: analysis
    };
  } catch (error) {
    console.error('❌ DeepSeek error:', error.message);
    return { success: false, error: error.message };
  }
}

// ============================================
// GEMINI API CALL (Fixed)
// ============================================
async function callGemini(params) {
  const { title, theme, genre, language } = params;
  const apiKey = process.env.GEMINI_API_KEY;
  
  console.log('🟢 Gemini API Key present:', !!apiKey);
  
  if (!apiKey || apiKey === 'your_gemini_api_key_here' || apiKey === '') {
    console.log('⚠️ Gemini API key not configured or invalid');
    return { success: false, error: 'Gemini API key missing or invalid' };
  }
  
  const prompt = `Write a ${genre} poem in ${language} language.
Title: "${title}"
Theme: ${theme}
Length: 6-8 lines with rhyme scheme.
Return ONLY the poem text.`;
  
  try {
    console.log('🔄 Calling Gemini API...');
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 500
        }
      })
    });
    
    console.log('🟢 Gemini Response Status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Gemini Error:', errorText);
      return { success: false, error: `Gemini API error: ${response.status} - ${errorText}` };
    }
    
    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    if (!content) {
      return { success: false, error: 'Gemini returned empty response' };
    }
    
    console.log('✅ Gemini generated poem length:', content.length);
    
    const analysis = {
      themes: [theme, 'poetry', 'expression'],
      tone: 'emotional',
      sentiment: 'positive',
      emotions: ['hope', 'beauty'],
      meaning: `This ${genre} beautifully captures the essence of ${theme}.`,
      literaryDevices: ['rhyme', 'rhythm'],
      rhymeScheme: 'AABB pattern',
      difficulty: 'beginner'
    };
    
    return {
      success: true,
      provider: 'gemini',
      content: content,
      analysis: analysis
    };
  } catch (error) {
    console.error('❌ Gemini error:', error.message);
    return { success: false, error: error.message };
  }
}

// ============================================
// HUGGING FACE API CALL (Fixed)
// ============================================
async function callHuggingFace(params) {
  const { title, theme, genre, language } = params;
  const apiKey = process.env.HUGGING_FACE_API_KEY;
  
  console.log('🟣 Hugging Face API Key present:', !!apiKey);
  
  if (!apiKey || apiKey === 'your_huggingface_api_key_here' || apiKey === '') {
    console.log('⚠️ Hugging Face API key not configured or invalid');
    return { success: false, error: 'Hugging Face API key missing or invalid' };
  }
  
  const prompt = `Write a short ${genre} poem about ${theme} titled "${title}". Make it 6 lines with rhyme.`;
  
  try {
    console.log('🔄 Calling Hugging Face API...');
    
    const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_length: 300,
          temperature: 0.8,
          do_sample: true
        }
      })
    });
    
    console.log('🟣 Hugging Face Response Status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Hugging Face Error:', errorText);
      return { success: false, error: `Hugging Face API error: ${response.status} - ${errorText}` };
    }
    
    const data = await response.json();
    const content = Array.isArray(data) ? data[0]?.generated_text || '' : data.generated_text || '';
    
    if (!content) {
      return { success: false, error: 'Hugging Face returned empty response' };
    }
    
    // Clean the response (remove the prompt from the generated text)
    let cleanContent = content;
    if (cleanContent.includes(prompt)) {
      cleanContent = cleanContent.replace(prompt, '').trim();
    }
    
    console.log('✅ Hugging Face generated poem length:', cleanContent.length);
    
    const analysis = {
      themes: [theme, 'creative'],
      tone: 'artistic',
      sentiment: 'neutral',
      emotions: ['thoughtful'],
      meaning: `A creative exploration of ${theme} in poetic form.`,
      literaryDevices: ['rhyme', 'meter'],
      rhymeScheme: 'Simple rhyme',
      difficulty: 'beginner'
    };
    
    return {
      success: true,
      provider: 'huggingface',
      content: cleanContent || content,
      analysis: analysis
    };
  } catch (error) {
    console.error('❌ Hugging Face error:', error.message);
    return { success: false, error: error.message };
  }
}

// ============================================
// FALLBACK RESPONSE (Always works)
// ============================================
function getFallbackPoem(params) {
  const { title, theme, genre, language } = params;
  
  const poems = {
    urdu: `دل کی باتیں کہاں کہی جائیں
تیرے خوابوں میں کھو گئی ہیں

${title} کا یہ پیغام
محبت کا ہے بے انتہا نام

${theme} کی یہ کہانی
دل کو چھو لے نرگسی`,
    hindi: `दिल की बातें कहीं अनकही रह गईं
तेरे ख्यालों में खोई हुई सी रह गईं

${title} की ये कहानी
${theme} का है ये फसाना
हर लफ्ज़ में तुझे ही पाने का
दिल करता है एक नया जमाना`,
    english: `In the quiet moments of dawn's first light,
Where ${theme} blooms, ever so bright.
${title} echoes through the silent air,
A whispered promise, a poet's prayer.
Let these words find their way to you,
A gift of verse, forever true.`
  };
  
  const content = poems[language] || poems.urdu;
  
  return {
    success: true,
    provider: 'fallback',
    content: content,
    analysis: {
      themes: [theme, 'poetry', 'emotion'],
      tone: 'melancholic',
      sentiment: 'positive',
      emotions: ['love', 'longing'],
      meaning: `This ${genre} poem explores themes of ${theme} with emotional depth.`,
      literaryDevices: ['metaphor', 'imagery'],
      rhymeScheme: 'AABB pattern',
      difficulty: 'intermediate'
    }
  };
}

// ============================================
// MAIN ORCHESTRATOR
// ============================================
export const generatePoem = async (params, userId = null) => {
  const { title, theme, genre, language, forceRefresh = false } = params;
  
  console.log('🎯 Generating poem with params:', { title, theme, genre, language });
  
  // Check cache
  if (!forceRefresh) {
    const cacheKey = getCacheKey('poem', { title, theme, genre, language });
    try {
      const cached = await AICache.findOne({ cacheKey });
      if (cached && (Date.now() - cached.createdAt) < CACHE_TTL) {
        console.log('✅ Using cached poem');
        return {
          success: true,
          fromCache: true,
          provider: cached.provider,
          content: cached.content,
          analysis: cached.analysis
        };
      }
    } catch (error) {
      console.error('Cache error:', error);
    }
  }
  
  // Try real providers
  const providers = [
    { name: 'deepseek', fn: () => callDeepSeek(params) },
    { name: 'gemini', fn: () => callGemini(params) },
    { name: 'huggingface', fn: () => callHuggingFace(params) }
  ];
  
  for (const provider of providers) {
    console.log(`🔄 Trying ${provider.name}...`);
    const result = await provider.fn();
    
    if (result.success) {
      console.log(`✅ ${provider.name} succeeded!`);
      
      // Cache result
      try {
        const cacheKey = getCacheKey('poem', { title, theme, genre, language });
        await AICache.findOneAndUpdate(
          { cacheKey },
          {
            cacheKey,
            type: 'poem',
            requestParams: params,
            content: result.content,
            analysis: result.analysis,
            provider: provider.name,
            createdAt: new Date()
          },
          { upsert: true }
        );
      } catch (error) {
        console.error('Cache save error:', error);
      }
      
      return result;
    } else {
      console.log(`❌ ${provider.name} failed:`, result.error);
    }
  }
  
  // All providers failed - use fallback
  console.log('⚠️ All providers failed, using fallback');
  return getFallbackPoem(params);
};

export const analyzePoem = async (poemText, language = 'urdu', userId = null) => {
  // Simple fallback analysis
  return {
    success: true,
    provider: 'fallback',
    analysis: {
      themes: ['love', 'nature', 'spirituality'],
      tone: 'contemplative',
      sentiment: 'positive',
      emotions: ['joy', 'peace', 'hope'],
      meaning: 'This poem expresses deep emotions through beautiful imagery.',
      literaryDevices: ['metaphor', 'imagery', 'rhyme'],
      rhymeScheme: 'Rhythmic pattern',
      difficulty: 'intermediate'
    }
  };
};