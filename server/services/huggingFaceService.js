// // server/services/huggingFaceService.js
// import { AI_PROVIDERS } from '../config/aiProviders.js';

// const HUGGING_FACE = AI_PROVIDERS.HUGGING_FACE;

// export const callHuggingFace = async (prompt, maxLength = 500) => {
//   const controller = new AbortController();
//   const timeoutId = setTimeout(() => controller.abort(), HUGGING_FACE.timeout);
  
//   try {
//     const response = await fetch(HUGGING_FACE.apiUrl, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${HUGGING_FACE.apiKey}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         inputs: prompt,
//         parameters: {
//           max_length: maxLength,
//           temperature: 0.8,
//           do_sample: true,
//           top_p: 0.95
//         }
//       }),
//       signal: controller.signal
//     });
    
//     clearTimeout(timeoutId);
    
//     if (!response.ok) {
//       throw new Error(`Hugging Face API error: ${response.status}`);
//     }
    
//     const data = await response.json();
    
//     return {
//       success: true,
//       provider: HUGGING_FACE.name,
//       content: Array.isArray(data) ? data[0]?.generated_text || '' : data.generated_text || '',
//       raw: data
//     };
//   } catch (error) {
//     clearTimeout(timeoutId);
//     console.error('Hugging Face error:', error.message);
//     return {
//       success: false,
//       provider: HUGGING_FACE.name,
//       error: error.message
//     };
//   }
// };

// // Generate poem using Hugging Face (simpler prompt, free tier optimized)
// export const generatePoemHuggingFace = async (params) => {
//   const { title, theme, genre, language } = params;
  
//   const prompt = `Write a short ${genre} poem in ${language} about ${theme} titled "${title}".
//   Make it 6-8 lines with rhyme.
//   Return only the poem.`;
  
//   return await callHuggingFace(prompt, 300);
// };

// // Analyze poem using Hugging Face
// export const analyzePoemHuggingFace = async (poemText, language = 'urdu') => {
//   const prompt = `Analyze this poem in one sentence: "${poemText.substring(0, 500)}"
//   Return format: Theme: X | Tone: Y | Meaning: Z`;
  
//   const result = await callHuggingFace(prompt, 150);
  
//   if (result.success && result.content) {
//     // Parse simple text response into structured format
//     const content = result.content;
//     const themeMatch = content.match(/Theme:\s*([^|]+)/i);
//     const toneMatch = content.match(/Tone:\s*([^|]+)/i);
//     const meaningMatch = content.match(/Meaning:\s*(.+)/i);
    
//     result.analysis = {
//       themes: themeMatch ? [themeMatch[1].trim()] : ['Unknown'],
//       tone: toneMatch ? toneMatch[1].trim() : 'Unknown',
//       meaning: meaningMatch ? meaningMatch[1].trim() : content.substring(0, 200),
//       sentiment: 'neutral',
//       emotions: [],
//       literaryDevices: [],
//       rhymeScheme: 'Not analyzed',
//       difficulty: 'intermediate'
//     };
//   }
  
//   return result;
// };














// server/services/huggingFaceService.js
import { AI_PROVIDERS } from '../config/aiProviders.js';

const HUGGING_FACE = AI_PROVIDERS.HUGGING_FACE;

// Multiple models to try (in order of preference)
const HF_MODELS = [
  { name: 'microsoft/phi-2', endpoint: 'https://api-inference.huggingface.co/models/microsoft/phi-2', size: '2.7B' },
  { name: 'mistralai/Mistral-7B-Instruct-v0.3', endpoint: 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3', size: '7B' },
  { name: 'google/flan-t5-large', endpoint: 'https://api-inference.huggingface.co/models/google/flan-t5-large', size: '780M' }
];

// Circuit breaker for models
const modelFailures = {};
const modelLastFailure = {};

function isCircuitOpen(modelName) {
  const failures = modelFailures[modelName] || 0;
  const lastFailure = modelLastFailure[modelName];
  if (failures >= 2 && lastFailure && (Date.now() - lastFailure) < 60000) {
    return true;
  }
  return false;
}

function recordFailure(modelName) {
  modelFailures[modelName] = (modelFailures[modelName] || 0) + 1;
  modelLastFailure[modelName] = Date.now();
}

function recordSuccess(modelName) {
  modelFailures[modelName] = 0;
}

export const callHuggingFace = async (prompt, maxLength = 500, retryModel = true) => {
  // Try different models
  for (const model of HF_MODELS) {
    if (isCircuitOpen(model.name)) {
      console.log(`⏭️ Skipping ${model.name} (circuit open)`);
      continue;
    }
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), HUGGING_FACE.timeout);
    
    try {
      console.log(`🤗 Trying ${model.name} (${model.size})...`);
      const startTime = Date.now();
      
      const response = await fetch(model.endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUGGING_FACE.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: maxLength,
            temperature: 0.7,
            do_sample: true,
            top_p: 0.9,
            return_full_text: false,
            wait_for_model: true
          }
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      const responseTime = Date.now() - startTime;
      
      if (!response.ok) {
        if (response.status === 503) {
          console.log(`⏳ ${model.name} is loading (503) - Normal for free tier`);
          continue;
        }
        throw new Error(`Hugging Face API error: ${response.status}`);
      }
      
      const data = await response.json();
      recordSuccess(model.name);
      
      let content = '';
      if (Array.isArray(data) && data[0]?.generated_text) {
        content = data[0].generated_text;
      } else if (data.generated_text) {
        content = data.generated_text;
      } else if (typeof data === 'string') {
        content = data;
      }
      
      console.log(`✅ ${model.name} succeeded in ${responseTime}ms`);
      
      return {
        success: true,
        provider: HUGGING_FACE.name,
        modelUsed: model.name,
        content: content,
        raw: data,
        responseTime
      };
    } catch (error) {
      clearTimeout(timeoutId);
      recordFailure(model.name);
      console.error(`${model.name} error:`, error.message);
      continue;
    }
  }
  
  return {
    success: false,
    provider: HUGGING_FACE.name,
    error: 'All Hugging Face models failed'
  };
};

// Generate poem using Hugging Face
export const generatePoemHuggingFace = async (params) => {
  const { title, theme, genre, language } = params;
  
  const prompt = `Write a short ${genre} poem in ${language} about ${theme} titled "${title}".
  Make it 6-8 lines with rhyme.
  Return only the poem, no explanations.`;
  
  return await callHuggingFace(prompt, 400);
};

// Analyze poem using Hugging Face with JSON parsing
export const analyzePoemHuggingFace = async (poemText, poemTitle = 'Poem') => {
  const prompt = `You are a poetry expert. Analyze this poem and respond with ONLY valid JSON, no other text.

Poem Title: "${poemTitle}"
Poem Content:
${poemText.substring(0, 1500)}

Required JSON format (use exact keys):
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
  
  const result = await callHuggingFace(prompt, 600);
  
  if (result.success && result.content) {
    // Try to parse JSON from response
    try {
      const jsonMatch = result.content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.themes && parsed.tone) {
          result.analysis = parsed;
          return result;
        }
      }
    } catch (e) {
      console.error('Hugging Face parse error:', e.message);
    }
    
    // Fallback: extract basic info from text
    const content = result.content;
    result.analysis = {
      themes: content.match(/theme[s]?:?\s*([^.\n]+)/i)?.[1]?.split(',').map(t => t.trim()) || ['Poetry'],
      tone: content.match(/tone:?\s*([^.\n]+)/i)?.[1]?.trim() || 'Expressive',
      sentiment: content.match(/sentiment:?\s*([^.\n]+)/i)?.[1]?.trim()?.toLowerCase() || 'neutral',
      emotions: content.match(/emotion[s]?:?\s*([^.\n]+)/i)?.[1]?.split(',').map(e => e.trim()) || [],
      meaning: content.substring(0, 300),
      literaryDevices: [],
      rhymeScheme: 'Not analyzed',
      difficulty: 'intermediate'
    };
  }
  
  return result;
};