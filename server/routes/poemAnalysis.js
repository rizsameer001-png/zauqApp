// // server/routes/poemAnalysis.js
// import express from 'express';
// import axios from 'axios';
// import Poem from '../models/Poem.js';
// import AnalysisCache from '../models/AnalysisCache.js';

// const router = express.Router();

// // Hugging Face Model Priority (Free models)
// const HUGGING_FACE_MODELS = [
//   {
//     name: 'microsoft/phi-2',
//     endpoint: 'https://api-inference.huggingface.co/models/microsoft/phi-2',
//     size: '2.7B',
//     maxTokens: 400,
//     timeout: 15000
//   },
//   {
//     name: 'mistralai/Mistral-7B-Instruct-v0.3',
//     endpoint: 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3',
//     size: '7B',
//     maxTokens: 500,
//     timeout: 20000
//   },
//   {
//     name: 'meta-llama/Llama-3.2-1B-Instruct',
//     endpoint: 'https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-1B-Instruct',
//     size: '1B',
//     maxTokens: 300,
//     timeout: 10000
//   },
//   {
//     name: 'google/flan-t5-large',
//     endpoint: 'https://api-inference.huggingface.co/models/google/flan-t5-large',
//     size: '780M',
//     maxTokens: 300,
//     timeout: 10000
//   }
// ];

// // Circuit breaker state
// const circuitBreaker = {
//   failures: {},
//   lastFailureTime: {},
//   isOpen: (modelName) => {
//     const failures = circuitBreaker.failures[modelName] || 0;
//     const lastFailure = circuitBreaker.lastFailureTime[modelName];
//     if (failures >= 2 && lastFailure && (Date.now() - lastFailure) < 60000) {
//       return true;
//     }
//     return false;
//   },
//   recordFailure: (modelName) => {
//     circuitBreaker.failures[modelName] = (circuitBreaker.failures[modelName] || 0) + 1;
//     circuitBreaker.lastFailureTime[modelName] = Date.now();
//     console.log(`⚠️ Circuit breaker recorded failure for ${modelName} (${circuitBreaker.failures[modelName]}/2)`);
//   },
//   recordSuccess: (modelName) => {
//     circuitBreaker.failures[modelName] = 0;
//     console.log(`✅ Circuit breaker reset for ${modelName}`);
//   }
// };

// // Build prompt for poetry analysis
// function buildPoetryPrompt(poemContent, poemTitle) {
//   return `Analyze this Urdu poem and provide a JSON response with the following fields:
// - themes: array of 3-5 main themes
// - tone: single word describing the tone (e.g., Melancholic, Joyful, Reflective, Passionate)
// - sentiment: one of [positive, negative, sorrowful, neutral]
// - emotions: array of 3-5 emotions expressed
// - meaning: 2-3 sentence interpretation
// - literaryDevices: array of 3-5 literary devices used
// - rhymeScheme: description of rhyme pattern
// - difficulty: one of [beginner, intermediate, advanced]

// Poem Title: "${poemTitle}"
// Poem Content:
// ${poemContent}

// Respond with ONLY valid JSON, no other text.`;
// }

// // Parse Hugging Face response
// function parseHFResponse(response, modelName) {
//   try {
//     let text = '';
    
//     if (typeof response === 'string') {
//       text = response;
//     } else if (response.generated_text) {
//       text = response.generated_text;
//     } else if (response[0]?.generated_text) {
//       text = response[0].generated_text;
//     } else {
//       text = JSON.stringify(response);
//     }
    
//     // Try to extract JSON
//     const jsonMatch = text.match(/\{[\s\S]*\}/);
//     if (jsonMatch) {
//       const parsed = JSON.parse(jsonMatch[0]);
//       if (parsed.themes && parsed.tone) {
//         return parsed;
//       }
//     }
    
//     return null;
//   } catch (error) {
//     console.error(`Parse error for ${modelName}:`, error.message);
//     return null;
//   }
// }

// // Call Hugging Face API with retry
// async function callHuggingFace(model, prompt, hfToken) {
//   if (!hfToken) {
//     throw new Error('Hugging Face token not configured');
//   }
  
//   if (circuitBreaker.isOpen(model.name)) {
//     throw new Error(`Circuit breaker open for ${model.name}`);
//   }
  
//   try {
//     const response = await axios({
//       method: 'post',
//       url: model.endpoint,
//       headers: {
//         'Authorization': `Bearer ${hfToken}`,
//         'Content-Type': 'application/json'
//       },
//       data: {
//         inputs: prompt,
//         parameters: {
//           max_new_tokens: model.maxTokens,
//           temperature: 0.7,
//           do_sample: true,
//           return_full_text: false,
//           top_p: 0.9
//         }
//       },
//       timeout: model.timeout
//     });
    
//     if (response.status === 200) {
//       circuitBreaker.recordSuccess(model.name);
//       const parsed = parseHFResponse(response.data, model.name);
//       if (parsed) {
//         return { success: true, analysis: parsed, modelUsed: model.name };
//       }
//     }
    
//     throw new Error(`Invalid response from ${model.name}`);
//   } catch (error) {
//     circuitBreaker.recordFailure(model.name);
    
//     if (error.response?.status === 503) {
//       console.log(`⏳ Model ${model.name} is loading, will retry later...`);
//       throw new Error(`Model loading: ${model.name}`);
//     }
    
//     throw error;
//   }
// }

// // Main analysis function with fallback
// async function analyzePoemWithHuggingFace(poemContent, poemTitle, hfToken) {
//   const prompt = buildPoetryPrompt(poemContent, poemTitle);
  
//   // Try each Hugging Face model in priority order
//   for (const model of HUGGING_FACE_MODELS) {
//     try {
//       console.log(`🔍 Trying Hugging Face model: ${model.name} (${model.size})`);
//       const result = await callHuggingFace(model, prompt, hfToken);
      
//       if (result.success && result.analysis) {
//         console.log(`✅ Success with ${model.name}`);
//         return {
//           success: true,
//           provider: 'huggingface',
//           modelUsed: model.name,
//           analysis: result.analysis
//         };
//       }
//     } catch (error) {
//       console.log(`❌ ${model.name} failed: ${error.message}`);
//       continue;
//     }
//   }
  
//   return { success: false, error: 'All Hugging Face models failed' };
// }

// // Fallback analysis (rule-based)
// function getFallbackAnalysis(poemTitle, poemContent) {
//   const isKarbalaPoem = poemContent?.includes('حسین') || 
//                         poemContent?.includes('Hussain') || 
//                         poemContent?.includes('Karbala') ||
//                         poemTitle?.toLowerCase().includes('karbala');
  
//   return {
//     themes: isKarbalaPoem 
//       ? ['Sacrifice', 'Martyrdom', 'Faith', 'Devotion', 'Eternal Love']
//       : ['Love', 'Nature', 'Spirituality', 'Emotion', 'Reflection'],
//     tone: isKarbalaPoem ? 'Tragic and Heroic' : 'Contemplative and Expressive',
//     sentiment: isKarbalaPoem ? 'sorrowful' : 'positive',
//     emotions: isKarbalaPoem 
//       ? ['Grief', 'Devotion', 'Sorrow', 'Hope', 'Faith']
//       : ['Joy', 'Peace', 'Hope', 'Love', 'Wonder'],
//     meaning: isKarbalaPoem
//       ? 'This marsiya honors the supreme sacrifice of Imam Hussain (AS) and the martyrs of Karbala, reflecting on themes of justice, patience, and unwavering faith.'
//       : 'This poem beautifully expresses deep emotions through powerful imagery and rhythmic verses, inviting readers to reflect on its universal themes.',
//     literaryDevices: ['Imagery', 'Metaphor', 'Symbolism', 'Repetition', 'Rhyme'],
//     rhymeScheme: 'Rhythmic pattern with internal rhymes',
//     difficulty: 'intermediate',
//     provider: 'fallback',
//     isFallback: true
//   };
// }

// // ============================================
// // MAIN API ENDPOINT
// // ============================================
// router.post('/analyze/:poemId', async (req, res) => {
//   try {
//     const { poemId } = req.params;
//     const { forceRefresh = false } = req.body;
    
//     console.log(`🔍 Poem analysis requested for: ${poemId}`);
    
//     // Find poem
//     const poem = await Poem.findById(poemId);
//     if (!poem) {
//       return res.status(404).json({ 
//         success: false, 
//         error: 'Poem not found' 
//       });
//     }
    
//     // Check cache (24 hours)
//     if (!forceRefresh) {
//       const cached = await AnalysisCache.findOne({ 
//         poemId, 
//         type: 'analysis',
//         createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) }
//       });
      
//       if (cached && cached.analysis && cached.analysis.themes) {
//         console.log('📦 Returning cached analysis');
//         return res.json({
//           success: true,
//           cached: true,
//           data: cached.analysis,
//           provider: cached.provider,
//           modelUsed: cached.modelUsed,
//           analyzedAt: cached.createdAt
//         });
//       }
//     }
    
//     const poemContent = poem.contentUrdu || poem.content || '';
//     const poemTitle = poem.title || 'Poem';
//     const hfToken = process.env.HUGGING_FACE_API_KEY;
    
//     let result = { success: false };
    
//     // Try Hugging Face first if token exists
//     if (hfToken && hfToken !== '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') {
//       console.log('🤗 Attempting Hugging Face analysis...');
//       result = await analyzePoemWithHuggingFace(poemContent, poemTitle, hfToken);
//     } else {
//       console.log('⚠️ Hugging Face token not configured or invalid');
//     }
    
//     // If Hugging Face failed, use fallback
//     if (!result.success) {
//       console.log('🔄 Using fallback analysis');
//       const fallbackAnalysis = getFallbackAnalysis(poemTitle, poemContent);
      
//       // Cache fallback result
//       await AnalysisCache.create({
//         poemId,
//         type: 'analysis',
//         analysis: fallbackAnalysis,
//         provider: 'fallback',
//         modelUsed: 'rule-based',
//         createdAt: new Date()
//       });
      
//       return res.json({
//         success: true,
//         data: fallbackAnalysis,
//         provider: 'fallback',
//         modelUsed: 'rule-based',
//         fallbackUsed: true,
//         analyzedAt: new Date().toISOString()
//       });
//     }
    
//     // Cache successful Hugging Face result
//     await AnalysisCache.create({
//       poemId,
//       type: 'analysis',
//       analysis: result.analysis,
//       provider: 'huggingface',
//       modelUsed: result.modelUsed,
//       createdAt: new Date()
//     });
    
//     // Also update the poem's aiAnalysis field
//     poem.aiAnalysis = {
//       themes: result.analysis.themes,
//       tone: result.analysis.tone,
//       sentiment: result.analysis.sentiment,
//       emotions: result.analysis.emotions,
//       meaning: result.analysis.meaning,
//       literaryDevices: result.analysis.literaryDevices,
//       rhymeScheme: result.analysis.rhymeScheme,
//       difficulty: result.analysis.difficulty,
//       provider: 'huggingface',
//       analyzedAt: new Date()
//     };
//     await poem.save();
    
//     res.json({
//       success: true,
//       data: result.analysis,
//       provider: 'huggingface',
//       modelUsed: result.modelUsed,
//       analyzedAt: new Date().toISOString()
//     });
    
//   } catch (error) {
//     console.error('❌ Analysis error:', error);
    
//     // Return fallback on error
//     res.json({
//       success: true,
//       data: getFallbackAnalysis('Poem', ''),
//       provider: 'fallback',
//       fallbackUsed: true,
//       error: error.message,
//       analyzedAt: new Date().toISOString()
//     });
//   }
// });

// // Health check endpoint
// router.get('/health', (req, res) => {
//   const hfToken = process.env.HUGGING_FACE_API_KEY;
//   res.json({
//     status: 'ok',
//     huggingface: {
//       configured: !!hfToken && hfToken !== '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',
//       tokenPrefix: hfToken ? hfToken.substring(0, 15) + '...' : 'missing'
//     }
//   });
// });

// export default router;















// server/routes/poemAnalysis.js
import express from 'express';
import axios from 'axios';
import Poem from '../models/Poem.js';
import AnalysisCache from '../models/AnalysisCache.js';
import { testHuggingFaceModels } from '../scripts/testModels.js';

const router = express.Router();

// ============================================
// MODEL CONFIGURATION
// ============================================

// Hugging Face Models (will be updated after testing)
let WORKING_HF_MODELS = [];

// Load working models from cache or test
async function loadWorkingModels() {
  try {
    const fs = await import('fs');
    if (fs.existsSync('./model-test-results.json')) {
      const data = JSON.parse(fs.readFileSync('./model-test-results.json', 'utf8'));
      if (data.huggingface && data.huggingface.length > 0) {
        WORKING_HF_MODELS = data.huggingface;
        console.log(`📦 Loaded ${WORKING_HF_MODELS.length} working HF models from cache`);
        return;
      }
    }
  } catch (e) {
    console.log('No model cache found, will test on first request');
  }
  
  // Default models to try (will be filtered by testing)
  WORKING_HF_MODELS = [
    { name: 'microsoft/phi-2', endpoint: 'https://api-inference.huggingface.co/models/microsoft/phi-2', size: '2.7B', status: 'untested' },
    { name: 'mistralai/Mistral-7B-Instruct-v0.3', endpoint: 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3', size: '7B', status: 'untested' },
    { name: 'meta-llama/Llama-3.2-1B-Instruct', endpoint: 'https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-1B-Instruct', size: '1B', status: 'untested' }
  ];
}

// ============================================
// CIRCUIT BREAKER
// ============================================
const circuitBreaker = {
  failures: {},
  lastFailureTime: {},
  isOpen: (provider, modelName) => {
    const key = `${provider}:${modelName}`;
    const failures = circuitBreaker.failures[key] || 0;
    const lastFailure = circuitBreaker.lastFailureTime[key];
    if (failures >= 2 && lastFailure && (Date.now() - lastFailure) < 60000) {
      return true;
    }
    return false;
  },
  recordFailure: (provider, modelName) => {
    const key = `${provider}:${modelName}`;
    circuitBreaker.failures[key] = (circuitBreaker.failures[key] || 0) + 1;
    circuitBreaker.lastFailureTime[key] = Date.now();
    console.log(`⚠️ Circuit breaker: ${provider} ${modelName} failed (${circuitBreaker.failures[key]}/2)`);
  },
  recordSuccess: (provider, modelName) => {
    const key = `${provider}:${modelName}`;
    circuitBreaker.failures[key] = 0;
  }
};

// ============================================
// PROMPT BUILDER
// ============================================
function buildPoetryPrompt(poemContent, poemTitle) {
  return `You are a poetry expert. Analyze this poem and respond with ONLY valid JSON, no other text.

Poem Title: "${poemTitle}"
Poem Content:
${poemContent.substring(0, 1500)} // Limit length

Required JSON format:
{
  "themes": ["theme1", "theme2", "theme3", "theme4", "theme5"],
  "tone": "single word describing the tone",
  "sentiment": "positive|negative|sorrowful|neutral",
  "emotions": ["emotion1", "emotion2", "emotion3", "emotion4"],
  "meaning": "2-3 sentence interpretation of the poem's deeper meaning",
  "literaryDevices": ["device1", "device2", "device3", "device4"],
  "rhymeScheme": "description of rhyme pattern",
  "difficulty": "beginner|intermediate|advanced"
}

Analyze now:`;
}

// ============================================
// GEMINI API (PRIMARY)
// ============================================
async function callGemini(prompt, poemContent) {
  const GEMINI_KEY = process.env.GEMINI_API_KEY;
  
  if (!GEMINI_KEY) {
    throw new Error('Gemini API key not configured');
  }
  
  if (circuitBreaker.isOpen('gemini', 'gemini-pro')) {
    throw new Error('Gemini circuit breaker open');
  }
  
  try {
    const response = await axios({
      method: 'post',
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_KEY}`,
      data: {
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
          topP: 0.9
        }
      },
      timeout: 20000
    });
    
    if (response.status === 200 && response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      const text = response.data.candidates[0].content.parts[0].text;
      circuitBreaker.recordSuccess('gemini', 'gemini-pro');
      
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.themes && parsed.tone) {
          return { success: true, analysis: parsed, provider: 'gemini', modelUsed: 'gemini-pro' };
        }
      }
    }
    
    throw new Error('Invalid Gemini response');
  } catch (error) {
    circuitBreaker.recordFailure('gemini', 'gemini-pro');
    throw error;
  }
}

// ============================================
// HUGGING FACE API (SECONDARY)
// ============================================
async function callHuggingFace(prompt, poemContent) {
  const HF_TOKEN = process.env.HUGGING_FACE_API_KEY;
  

  if (!HF_TOKEN || !HF_TOKEN.startsWith('hf_')) {
  throw new Error('Hugging Face token not configured or invalid');
}
  
  // Refresh working models if needed
  if (WORKING_HF_MODELS.length === 0 || WORKING_HF_MODELS[0].status === 'untested') {
    console.log('🔄 Testing Hugging Face models...');
    const results = await testHuggingFaceModels();
    WORKING_HF_MODELS = results.filter(m => m.status === 'working');
    if (WORKING_HF_MODELS.length === 0) {
      throw new Error('No working Hugging Face models found');
    }
    console.log(`✅ Found ${WORKING_HF_MODELS.length} working HF models`);
  }
  
  // Try each working model
  for (const model of WORKING_HF_MODELS) {
    if (circuitBreaker.isOpen('huggingface', model.name)) {
      console.log(`⏭️ Skipping ${model.name} (circuit open)`);
      continue;
    }
    
    try {
      console.log(`🤗 Trying ${model.name} (${model.size})...`);
      
      const response = await axios({
        method: 'post',
        url: model.endpoint,
        headers: {
          'Authorization': `Bearer ${HF_TOKEN}`,
          'Content-Type': 'application/json'
        },
        data: {
          inputs: prompt,
          parameters: {
            max_new_tokens: 500,
            temperature: 0.7,
            do_sample: true,
            return_full_text: false,
            top_p: 0.9
          }
        },
        timeout: 20000
      });
      
      if (response.status === 200) {
        circuitBreaker.recordSuccess('huggingface', model.name);
        
        let text = '';
        if (response.data?.generated_text) {
          text = response.data.generated_text;
        } else if (response.data?.[0]?.generated_text) {
          text = response.data[0].generated_text;
        } else if (typeof response.data === 'string') {
          text = response.data;
        }
        
        // Extract JSON
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (parsed.themes && parsed.tone) {
            return { success: true, analysis: parsed, provider: 'huggingface', modelUsed: model.name };
          }
        }
      }
    } catch (error) {
      circuitBreaker.recordFailure('huggingface', model.name);
      console.log(`❌ ${model.name} failed: ${error.message}`);
      continue;
    }
  }
  
  throw new Error('All Hugging Face models failed');
}

// ============================================
// DEEPSEEK API (TERTIARY)
// ============================================
async function callDeepSeek(prompt, poemContent) {
  const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY;
  
  if (!DEEPSEEK_KEY) {
    throw new Error('DeepSeek API key not configured');
  }
  
  if (circuitBreaker.isOpen('deepseek', 'deepseek-chat')) {
    throw new Error('DeepSeek circuit breaker open');
  }
  
  try {
    const response = await axios({
      method: 'post',
      url: 'https://api.deepseek.com/v1/chat/completions',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_KEY}`
      },
      data: {
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: 'You are a poetry analysis expert. Respond with valid JSON only.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 800,
        temperature: 0.7
      },
      timeout: 20000
    });
    
    if (response.status === 200 && response.data?.choices?.[0]?.message?.content) {
      const text = response.data.choices[0].message.content;
      circuitBreaker.recordSuccess('deepseek', 'deepseek-chat');
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.themes && parsed.tone) {
          return { success: true, analysis: parsed, provider: 'deepseek', modelUsed: 'deepseek-chat' };
        }
      }
    }
    
    throw new Error('Invalid DeepSeek response');
  } catch (error) {
    circuitBreaker.recordFailure('deepseek', 'deepseek-chat');
    throw error;
  }
}

// ============================================
// ZAUQAPP FALLBACK (LAST RESORT)
// ============================================
function getZauqAppFallback(poemTitle, poemContent) {
  const isKarbalaPoem = poemContent?.includes('حسین') || 
                        poemContent?.includes('Hussain') || 
                        poemContent?.includes('Karbala') ||
                        poemTitle?.toLowerCase().includes('karbala') ||
                        poemTitle?.toLowerCase().includes('hussain');
  
  const isLovePoem = poemContent?.includes('love') || 
                     poemContent?.includes('ishq') ||
                     poemContent?.includes('محبت');
  
  if (isKarbalaPoem) {
    return {
      themes: ['Sacrifice', 'Martyrdom', 'Faith', 'Devotion', 'Justice'],
      tone: 'Tragic and Heroic',
      sentiment: 'sorrowful',
      emotions: ['Grief', 'Devotion', 'Sorrow', 'Hope', 'Faith'],
      meaning: 'This marsiya honors the supreme sacrifice of Imam Hussain (AS) and the martyrs of Karbala, reflecting on themes of justice, patience, and unwavering faith in the face of oppression.',
      literaryDevices: ['Imagery', 'Metaphor', 'Repetition', 'Symbolism', 'Pathos'],
      rhymeScheme: 'Traditional marsiya rhyme pattern',
      difficulty: 'intermediate'
    };
  } else if (isLovePoem) {
    return {
      themes: ['Love', 'Longing', 'Devotion', 'Separation', 'Union'],
      tone: 'Passionate and Romantic',
      sentiment: 'positive',
      emotions: ['Love', 'Longing', 'Joy', 'Hope', 'Desire'],
      meaning: 'This ghazal expresses the depth of romantic love, exploring the emotions of longing, separation, and the hope of union with the beloved.',
      literaryDevices: ['Imagery', 'Metaphor', 'Simile', 'Alliteration', 'Refrain'],
      rhymeScheme: 'Traditional ghazal rhyme scheme (qafiya and radif)',
      difficulty: 'intermediate'
    };
  } else {
    return {
      themes: ['Poetry', 'Expression', 'Beauty', 'Reflection', 'Spirituality'],
      tone: 'Contemplative and Expressive',
      sentiment: 'positive',
      emotions: ['Wonder', 'Peace', 'Joy', 'Reflection', 'Hope'],
      meaning: 'This beautiful poem captures the essence of human emotion through vivid imagery and thoughtful expression, inviting readers to reflect on its deeper meaning.',
      literaryDevices: ['Imagery', 'Metaphor', 'Symbolism', 'Rhythm', 'Alliteration'],
      rhymeScheme: 'Free verse with rhythmic patterns',
      difficulty: 'intermediate'
    };
  }
}

// ============================================
// MAIN ANALYSIS FUNCTION WITH PRIORITY ORDER
// ============================================
async function analyzePoemWithPriority(poemContent, poemTitle) {
  const prompt = buildPoetryPrompt(poemContent, poemTitle);
  
  // Priority 1: Gemini (Working)
  console.log('🎯 Priority 1: Trying Gemini...');
  try {
    const result = await callGemini(prompt, poemContent);
    if (result.success) {
      console.log('✅ Gemini analysis successful');
      return result;
    }
  } catch (error) {
    console.log(`❌ Gemini failed: ${error.message}`);
  }
  
  // Priority 2: Hugging Face
  console.log('🎯 Priority 2: Trying Hugging Face...');
  try {
    const result = await callHuggingFace(prompt, poemContent);
    if (result.success) {
      console.log(`✅ Hugging Face analysis successful with ${result.modelUsed}`);
      return result;
    }
  } catch (error) {
    console.log(`❌ Hugging Face failed: ${error.message}`);
  }
  
  // Priority 3: DeepSeek
  console.log('🎯 Priority 3: Trying DeepSeek...');
  try {
    const result = await callDeepSeek(prompt, poemContent);
    if (result.success) {
      console.log(`✅ DeepSeek analysis successful`);
      return result;
    }
  } catch (error) {
    console.log(`❌ DeepSeek failed: ${error.message}`);
  }
  
  // Priority 4: ZauqApp Fallback
  console.log('🎯 Priority 4: Using ZauqApp Fallback...');
  return {
    success: true,
    analysis: getZauqAppFallback(poemTitle, poemContent),
    provider: 'zauqapp',
    modelUsed: 'fallback',
    isFallback: true
  };
}

// ============================================
// API ENDPOINTS
// ============================================

// Health check endpoint
router.get('/health', async (req, res) => {
  const hfToken = process.env.HUGGING_FACE_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;
  const deepseekKey = process.env.DEEPSEEK_API_KEY;
  
  res.json({
    status: 'ok',
    providers: {
      gemini: {
        configured: !!geminiKey,
        status: geminiKey ? 'ready' : 'missing'
      },
      huggingface: {
        configured: !!hfToken && hfToken !== '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',
        modelsFound: WORKING_HF_MODELS.length,
        models: WORKING_HF_MODELS.map(m => ({ name: m.name, size: m.size }))
      },
      deepseek: {
        configured: !!deepseekKey,
        status: deepseekKey ? 'ready' : 'missing'
      },
      zauqapp: {
        configured: true,
        status: 'always available as fallback'
      }
    }
  });
});

// Test endpoint to refresh models
router.post('/test-models', async (req, res) => {
  try {
    console.log('🔄 Running model tests...');
    const results = await testHuggingFaceModels();
    WORKING_HF_MODELS = results.filter(m => m.status === 'working');
    
    res.json({
      success: true,
      message: `Found ${WORKING_HF_MODELS.length} working Hugging Face models`,
      models: WORKING_HF_MODELS
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Main analysis endpoint
router.post('/analyze/:poemId', async (req, res) => {
  try {
    const { poemId } = req.params;
    const { forceRefresh = false } = req.body;
    
    console.log(`🔍 Analysis requested for poem: ${poemId}`);
    
    // Find poem
    const poem = await Poem.findById(poemId);
    if (!poem) {
      return res.status(404).json({ success: false, error: 'Poem not found' });
    }
    
    // Check cache (24 hours)
    if (!forceRefresh) {
      const cached = await AnalysisCache.findOne({ 
        poemId, 
        type: 'analysis',
        createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) }
      });
      
      if (cached && cached.analysis && cached.analysis.themes) {
        console.log('📦 Returning cached analysis');
        return res.json({
          success: true,
          cached: true,
          data: cached.analysis,
          provider: cached.provider,
          modelUsed: cached.modelUsed,
          analyzedAt: cached.createdAt
        });
      }
    }
    
    const poemContent = poem.contentUrdu || poem.content || '';
    const poemTitle = poem.title || 'Poem';
    
    // Run analysis with priority order
    const result = await analyzePoemWithPriority(poemContent, poemTitle);
    
    if (result.success) {
      // Cache the result
      await AnalysisCache.create({
        poemId,
        type: 'analysis',
        analysis: result.analysis,
        provider: result.provider,
        modelUsed: result.modelUsed,
        createdAt: new Date()
      });
      
      // Update poem's aiAnalysis field
      poem.aiAnalysis = {
        themes: result.analysis.themes,
        tone: result.analysis.tone,
        sentiment: result.analysis.sentiment,
        emotions: result.analysis.emotions,
        meaning: result.analysis.meaning,
        literaryDevices: result.analysis.literaryDevices,
        rhymeScheme: result.analysis.rhymeScheme,
        difficulty: result.analysis.difficulty,
        provider: result.provider,
        analyzedAt: new Date()
      };
      await poem.save();
      
      return res.json({
        success: true,
        data: result.analysis,
        provider: result.provider,
        modelUsed: result.modelUsed,
        fallbackUsed: result.isFallback || false,
        analyzedAt: new Date().toISOString()
      });
    }
    
    throw new Error('All analysis methods failed');
    
  } catch (error) {
    console.error('❌ Analysis error:', error);
    
    // Ultimate fallback
    const fallbackAnalysis = getZauqAppFallback('Poem', '');
    res.json({
      success: true,
      data: fallbackAnalysis,
      provider: 'zauqapp',
      modelUsed: 'emergency-fallback',
      fallbackUsed: true,
      error: error.message,
      analyzedAt: new Date().toISOString()
    });
  }
});

// Load models on startup
loadWorkingModels();

export default router;