// server/services/openRouterService.js
import { AI_PROVIDERS } from '../config/aiProviders.js';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// Free models available on OpenRouter (all with :free suffix)
const FREE_MODELS = [
    { 
    name: 'deepseek/deepseek-chat:free',
    displayName: 'DeepSeek Chat',
    size: '67B',
    priority: 1
  },
  { 
    name: 'deepseek/deepseek-coder:free',
    displayName: 'DeepSeek Coder',
    size: '33B',
    priority: 2
  },

  { 
    name: 'mistralai/mistral-7b-instruct:free',
    displayName: 'Mistral 7B',
    size: '7B',
    priority: 3
  },
  
  { 
    name: 'google/gemini-2.5-flash-lite:free',
    displayName: 'Gemini 2.5 Flash Lite',
    size: '1B',
    priority: 4
  },
  { 
    name: 'qwen/qwen-2.5-7b-instruct:free',
    displayName: 'Qwen 2.5 7B',
    size: '7B',
    priority: 5
  }
];

// Circuit breaker for OpenRouter
let openRouterFailures = 0;
let openRouterLastFailure = null;
let currentModelIndex = 0;

function isCircuitOpen() {
  if (openRouterFailures >= 3 && openRouterLastFailure && (Date.now() - openRouterLastFailure) < 60000) {
    return true;
  }
  return false;
}

function recordFailure() {
  openRouterFailures++;
  openRouterLastFailure = Date.now();
  console.log(`⚠️ OpenRouter circuit breaker: ${openRouterFailures}/3 failures`);
}

function recordSuccess() {
  openRouterFailures = 0;
  console.log('✅ OpenRouter circuit breaker reset');
}

// Rotate to next model on failure
function getNextModel() {
  currentModelIndex = (currentModelIndex + 1) % FREE_MODELS.length;
  return FREE_MODELS[currentModelIndex];
}

export const callOpenRouter = async (prompt, systemPrompt = '', retryCount = 0) => {
  // Check circuit breaker
  if (isCircuitOpen()) {
    console.log('⏭️ OpenRouter circuit breaker open, skipping');
    return {
      success: false,
      provider: 'openrouter',
      error: 'Circuit breaker open - too many failures'
    };
  }
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
  
  try {
    const model = FREE_MODELS[currentModelIndex];
    console.log(`🔍 Calling OpenRouter with model: ${model.displayName} (${model.name})`);
    
    const messages = [];
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    messages.push({ role: 'user', content: prompt });
    
    const startTime = Date.now();
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://zauqapp.com', // Your app's domain
        'X-Title': 'ZauqApp Poetry'
      },
      body: JSON.stringify({
        model: model.name,
        messages: messages,
        temperature: 0.7,
        max_tokens: 800,
        stream: false
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    const responseTime = Date.now() - startTime;
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.log(`❌ OpenRouter error ${response.status}:`, errorData.error?.message || response.statusText);
      
      // If model failed, try next model
      if (retryCount < FREE_MODELS.length) {
        getNextModel(); // Rotate to next model
        console.log(`🔄 Retrying with next model (attempt ${retryCount + 1}/${FREE_MODELS.length})...`);
        return await callOpenRouter(prompt, systemPrompt, retryCount + 1);
      }
      
      throw new Error(`OpenRouter API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      const content = data.choices[0].message.content;
      recordSuccess();
      
      console.log(`✅ OpenRouter response received in ${responseTime}ms using ${model.displayName}`);
      
      return {
        success: true,
        provider: 'openrouter',
        modelUsed: model.displayName,
        modelName: model.name,
        content: content,
        raw: data,
        responseTime
      };
    } else {
      throw new Error('Invalid response structure from OpenRouter');
    }
  } catch (error) {
    clearTimeout(timeoutId);
    
    // Try next model if available
    if (retryCount < FREE_MODELS.length - 1) {
      getNextModel();
      console.log(`🔄 Retrying with next model (attempt ${retryCount + 1}/${FREE_MODELS.length})...`);
      return await callOpenRouter(prompt, systemPrompt, retryCount + 1);
    }
    
    recordFailure();
    console.error('OpenRouter error:', error.message);
    
    return {
      success: false,
      provider: 'openrouter',
      error: error.message
    };
  }
};

// Parse JSON from response helper
function parseJSONResponse(content) {
  if (!content) return null;
  
  try {
    // Try direct parse first
    return JSON.parse(content);
  } catch (e) {
    // Try to extract JSON from markdown code block
    const jsonBlockMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonBlockMatch) {
      try {
        return JSON.parse(jsonBlockMatch[1]);
      } catch (e2) {}
    }
    
    // Try to find JSON object in text
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (e3) {}
    }
    
    return null;
  }
}

// Generate poem using OpenRouter (DeepSeek replacement)
export const generatePoemOpenRouter = async (params) => {
  const { title, theme, genre, language, style = 'classical' } = params;
  
  const systemPrompt = `You are an expert poet specializing in ${language} poetry, particularly ${genre}. 
  Write authentic, emotionally resonant poetry with proper rhyme scheme and meter.
  Respond ONLY with the poem text, no explanations, no JSON, no markdown.`;
  
  const userPrompt = `Write a ${genre} poem in ${language} language.
  Title: ${title}
  Theme: ${theme}
  Style: ${style}
  Length: 8-12 lines
  Include proper rhyme scheme and poetic devices.
  
  Return only the poem text, nothing else.`;
  
  const result = await callOpenRouter(userPrompt, systemPrompt);
  
  if (result.success && result.content) {
    // Clean up the response
    let content = result.content;
    // Remove markdown code blocks
    content = content.replace(/```[\s\S]*?```/g, '');
    // Remove any JSON that might have been accidentally included
    content = content.replace(/\{[\s\S]*\}/, '').trim();
    // Remove "Here's a poem" type prefixes
    content = content.replace(/^(Here'?s|Here is|I\'?ve written|This is) (a|an) .*?:?\s*/i, '');
    
    result.content = content.trim();
  }
  
  return result;
};

// Analyze poem using OpenRouter (DeepSeek replacement)
export const analyzePoemOpenRouter = async (poemText, poemTitle = 'Poem') => {
  const systemPrompt = `You are a literary critic specializing in poetry analysis.
  Analyze the poem and return ONLY valid JSON. No explanations outside the JSON object.
  Use the exact JSON schema provided.`;
  
  const userPrompt = `Analyze this poem and return ONLY valid JSON:

Poem Title: "${poemTitle}"
Poem Content:
${poemText.substring(0, 1500)}

Required JSON format (use exact keys, no extra text):
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

Respond with ONLY the JSON object, nothing else.`;
  
  const result = await callOpenRouter(userPrompt, systemPrompt);
  
  if (result.success && result.content) {
    const parsed = parseJSONResponse(result.content);
    
    if (parsed && parsed.themes && Array.isArray(parsed.themes) && parsed.tone) {
      result.analysis = parsed;
      console.log('✅ OpenRouter analysis parsed successfully');
      return result;
    } else {
      console.log('⚠️ OpenRouter returned invalid JSON structure');
      
      // Create fallback analysis from whatever we got
      result.analysis = {
        themes: parsed?.themes || ['Poetry', 'Emotion', 'Expression'],
        tone: parsed?.tone || 'Expressive',
        sentiment: parsed?.sentiment || 'neutral',
        emotions: parsed?.emotions || ['Thoughtful', 'Reflective'],
        meaning: parsed?.meaning || result.content.substring(0, 300),
        literaryDevices: parsed?.literaryDevices || ['Imagery', 'Metaphor'],
        rhymeScheme: parsed?.rhymeScheme || 'Rhythmic pattern',
        difficulty: parsed?.difficulty || 'intermediate'
      };
      result.analysisWarning = 'Partial analysis - JSON parsing incomplete';
      return result;
    }
  }
  
  return result;
};

// Reset circuit breaker manually
export const resetOpenRouterCircuit = () => {
  openRouterFailures = 0;
  openRouterLastFailure = null;
  currentModelIndex = 0;
  console.log('🔄 OpenRouter circuit breaker manually reset');
  return { success: true, message: 'Circuit breaker reset' };
};

// Get available free models
export const getAvailableModels = () => {
  return FREE_MODELS.map(m => ({
    id: m.name,
    name: m.displayName,
    size: m.size,
    free: true
  }));
};

// Health check
export const checkOpenRouterHealth = async () => {
  const testResult = await callOpenRouter('Say "OK" in one word.', '');
  
  return {
    configured: !!OPENROUTER_API_KEY,
    working: testResult.success,
    circuitOpen: isCircuitOpen(),
    currentModel: FREE_MODELS[currentModelIndex]?.displayName,
    availableModels: FREE_MODELS.length,
    message: testResult.success ? 'OpenRouter is operational' : testResult.error || 'OpenRouter unavailable'
  };
};

export default {
  callOpenRouter,
  generatePoemOpenRouter,
  analyzePoemOpenRouter,
  resetOpenRouterCircuit,
  getAvailableModels,
  checkOpenRouterHealth
};