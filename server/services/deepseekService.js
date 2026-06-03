// // server/services/deepseekService.js
// import { AI_PROVIDERS } from '../config/aiProviders.js';

// const DEEPSEEK = AI_PROVIDERS.DEEPSEEK;

// export const callDeepSeek = async (prompt, systemPrompt = '') => {
//   const controller = new AbortController();
//   const timeoutId = setTimeout(() => controller.abort(), DEEPSEEK.timeout);
  
//   try {
//     const messages = [];
//     if (systemPrompt) {
//       messages.push({ role: 'system', content: systemPrompt });
//     }
//     messages.push({ role: 'user', content: prompt });
    
//     const response = await fetch(DEEPSEEK.apiUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${DEEPSEEK.apiKey}`
//       },
//       body: JSON.stringify({
//         model: DEEPSEEK.model,
//         messages: messages,
//         temperature: 0.8,
//         max_tokens: 2000,
//         stream: false
//       }),
//       signal: controller.signal
//     });
    
//     clearTimeout(timeoutId);
    
//     if (!response.ok) {
//       throw new Error(`DeepSeek API error: ${response.status}`);
//     }
    
//     const data = await response.json();
//     return {
//       success: true,
//       provider: DEEPSEEK.name,
//       content: data.choices[0]?.message?.content || '',
//       raw: data
//     };
//   } catch (error) {
//     clearTimeout(timeoutId);
//     console.error('DeepSeek error:', error.message);
//     return {
//       success: false,
//       provider: DEEPSEEK.name,
//       error: error.message
//     };
//   }
// };

// // Generate poem using DeepSeek
// export const generatePoemDeepSeek = async (params) => {
//   const { title, theme, genre, language, style = 'classical' } = params;
  
//   const systemPrompt = `You are an expert poet specializing in ${language} poetry, particularly ${genre}. 
//   Write authentic, emotionally resonant poetry with proper rhyme scheme and meter.
//   Respond ONLY with the poem text, no explanations.`;
  
//   const userPrompt = `Write a ${genre} poem in ${language} language.
//   Title: ${title}
//   Theme: ${theme}
//   Style: ${style}
//   Length: 8-12 lines
//   Include proper rhyme scheme and poetic devices.
  
//   Return only the poem text.`;
  
//   return await callDeepSeek(userPrompt, systemPrompt);
// };

// // Analyze poem using DeepSeek
// export const analyzePoemDeepSeek = async (poemText, language = 'urdu') => {
//   const systemPrompt = `You are a literary critic specializing in ${language} poetry.
//   Analyze the poem and return ONLY valid JSON. No explanations outside JSON.`;
  
//   const userPrompt = `Analyze this ${language} poem and return JSON:
//   Poem: "${poemText}"
  
//   Required JSON format:
//   {
//     "themes": ["theme1", "theme2"],
//     "tone": "sad/romantic/hopeful/patriotic/etc",
//     "sentiment": "positive/negative/neutral",
//     "emotions": ["joy", "sadness", "love", "anger", "fear"],
//     "meaning": "Simple explanation of what the poem means (in ${language === 'urdu' ? 'Urdu' : language === 'hindi' ? 'Hindi' : 'English'})",
//     "literaryDevices": ["metaphor", "simile", "personification", "alliteration"],
//     "rhymeScheme": "AABB or ABAB pattern description",
//     "difficulty": "beginner/intermediate/advanced"
//   }`;
  
//   const result = await callDeepSeek(userPrompt, systemPrompt);
  
//   if (result.success && result.content) {
//     try {
//       // Extract JSON from response
//       const jsonMatch = result.content.match(/\{[\s\S]*\}/);
//       if (jsonMatch) {
//         result.analysis = JSON.parse(jsonMatch[0]);
//       } else {
//         result.analysis = JSON.parse(result.content);
//       }
//     } catch (e) {
//       console.error('Failed to parse JSON from DeepSeek:', e);
//       result.analysis = null;
//     }
//   }
  
//   return result;
// };













// server/services/deepseekService.js
import { AI_PROVIDERS } from '../config/aiProviders.js';

const DEEPSEEK = AI_PROVIDERS.DEEPSEEK;

// Circuit breaker for DeepSeek
let deepseekFailures = 0;
let deepseekLastFailure = null;

function isCircuitOpen() {
  if (deepseekFailures >= 2 && deepseekLastFailure && (Date.now() - deepseekLastFailure) < 60000) {
    return true;
  }
  return false;
}

function recordFailure() {
  deepseekFailures++;
  deepseekLastFailure = Date.now();
  console.log(`⚠️ DeepSeek circuit breaker: ${deepseekFailures}/2 failures`);
}

function recordSuccess() {
  deepseekFailures = 0;
  console.log('✅ DeepSeek circuit breaker reset');
}

export const callDeepSeek = async (prompt, systemPrompt = '') => {
  // Check circuit breaker
  if (isCircuitOpen()) {
    console.log('⏭️ DeepSeek circuit breaker open, skipping');
    return {
      success: false,
      provider: DEEPSEEK.name,
      error: 'Circuit breaker open - too many failures'
    };
  }
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEEPSEEK.timeout);
  
  try {
    const messages = [];
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    messages.push({ role: 'user', content: prompt });
    
    console.log('🔍 Calling DeepSeek API...');
    const startTime = Date.now();
    
    const response = await fetch(DEEPSEEK.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK.apiKey}`
      },
      body: JSON.stringify({
        model: DEEPSEEK.model,
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
      const errorText = await response.text();
      throw new Error(`DeepSeek API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      const content = data.choices[0].message.content;
      recordSuccess();
      
      console.log(`✅ DeepSeek response received in ${responseTime}ms`);
      
      return {
        success: true,
        provider: DEEPSEEK.name,
        modelUsed: DEEPSEEK.model,
        content: content,
        raw: data,
        responseTime
      };
    } else {
      throw new Error('Invalid response structure from DeepSeek');
    }
  } catch (error) {
    clearTimeout(timeoutId);
    recordFailure();
    console.error('DeepSeek error:', error.message);
    
    return {
      success: false,
      provider: DEEPSEEK.name,
      error: error.message
    };
  }
};

// Generate poem using DeepSeek
export const generatePoemDeepSeek = async (params) => {
  const { title, theme, genre, language, style = 'classical' } = params;
  
  const systemPrompt = `You are an expert poet specializing in ${language} poetry, particularly ${genre}. 
  Write authentic, emotionally resonant poetry with proper rhyme scheme and meter.
  Respond ONLY with the poem text, no explanations, no JSON.`;
  
  const userPrompt = `Write a ${genre} poem in ${language} language.
  Title: ${title}
  Theme: ${theme}
  Style: ${style}
  Length: 8-12 lines
  Include proper rhyme scheme and poetic devices.
  
  Return only the poem text, nothing else.`;
  
  const result = await callDeepSeek(userPrompt, systemPrompt);
  
  if (result.success && result.content) {
    // Clean up the response (remove any JSON markers if present)
    let content = result.content;
    // Remove markdown code blocks if present
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    // Remove any JSON that might have been accidentally included
    content = content.replace(/\{[\s\S]*\}/, '').trim();
    
    result.content = content;
  }
  
  return result;
};

// Parse JSON from DeepSeek response helper
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

// Analyze poem using DeepSeek with improved JSON parsing
export const analyzePoemDeepSeek = async (poemText, poemTitle = 'Poem') => {
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
  
  const result = await callDeepSeek(userPrompt, systemPrompt);
  
  if (result.success && result.content) {
    const parsed = parseJSONResponse(result.content);
    
    if (parsed && parsed.themes && Array.isArray(parsed.themes) && parsed.tone) {
      result.analysis = parsed;
      console.log('✅ DeepSeek analysis parsed successfully');
      return result;
    } else {
      console.log('⚠️ DeepSeek returned invalid JSON structure');
      
      // Try to create a basic analysis from whatever we got
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

// Quick analysis for short poems
export const quickAnalyzeDeepSeek = async (poemText) => {
  const systemPrompt = 'You are a poetry expert. Respond with JSON only.';
  const userPrompt = `Analyze this short poem in one word each:
Poem: "${poemText.substring(0, 200)}"
Return JSON: {"theme": "single word", "tone": "single word", "sentiment": "positive/negative/neutral"}`;
  
  return await callDeepSeek(userPrompt, systemPrompt);
};

// Health check for DeepSeek
export const checkDeepSeekHealth = async () => {
  const testPrompt = 'Respond with {"status": "ok"}';
  const result = await callDeepSeek(testPrompt, '');
  
  return {
    configured: !!DEEPSEEK.apiKey,
    working: result.success,
    circuitOpen: isCircuitOpen(),
    message: result.success ? 'DeepSeek is operational' : result.error || 'DeepSeek unavailable'
  };
};

export default {
  callDeepSeek,
  generatePoemDeepSeek,
  analyzePoemDeepSeek,
  quickAnalyzeDeepSeek,
  checkDeepSeekHealth
};