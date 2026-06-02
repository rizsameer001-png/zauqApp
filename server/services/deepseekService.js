// server/services/deepseekService.js
import { AI_PROVIDERS } from '../config/aiProviders.js';

const DEEPSEEK = AI_PROVIDERS.DEEPSEEK;

export const callDeepSeek = async (prompt, systemPrompt = '') => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEEPSEEK.timeout);
  
  try {
    const messages = [];
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    messages.push({ role: 'user', content: prompt });
    
    const response = await fetch(DEEPSEEK.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK.apiKey}`
      },
      body: JSON.stringify({
        model: DEEPSEEK.model,
        messages: messages,
        temperature: 0.8,
        max_tokens: 2000,
        stream: false
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      success: true,
      provider: DEEPSEEK.name,
      content: data.choices[0]?.message?.content || '',
      raw: data
    };
  } catch (error) {
    clearTimeout(timeoutId);
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
  Respond ONLY with the poem text, no explanations.`;
  
  const userPrompt = `Write a ${genre} poem in ${language} language.
  Title: ${title}
  Theme: ${theme}
  Style: ${style}
  Length: 8-12 lines
  Include proper rhyme scheme and poetic devices.
  
  Return only the poem text.`;
  
  return await callDeepSeek(userPrompt, systemPrompt);
};

// Analyze poem using DeepSeek
export const analyzePoemDeepSeek = async (poemText, language = 'urdu') => {
  const systemPrompt = `You are a literary critic specializing in ${language} poetry.
  Analyze the poem and return ONLY valid JSON. No explanations outside JSON.`;
  
  const userPrompt = `Analyze this ${language} poem and return JSON:
  Poem: "${poemText}"
  
  Required JSON format:
  {
    "themes": ["theme1", "theme2"],
    "tone": "sad/romantic/hopeful/patriotic/etc",
    "sentiment": "positive/negative/neutral",
    "emotions": ["joy", "sadness", "love", "anger", "fear"],
    "meaning": "Simple explanation of what the poem means (in ${language === 'urdu' ? 'Urdu' : language === 'hindi' ? 'Hindi' : 'English'})",
    "literaryDevices": ["metaphor", "simile", "personification", "alliteration"],
    "rhymeScheme": "AABB or ABAB pattern description",
    "difficulty": "beginner/intermediate/advanced"
  }`;
  
  const result = await callDeepSeek(userPrompt, systemPrompt);
  
  if (result.success && result.content) {
    try {
      // Extract JSON from response
      const jsonMatch = result.content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result.analysis = JSON.parse(jsonMatch[0]);
      } else {
        result.analysis = JSON.parse(result.content);
      }
    } catch (e) {
      console.error('Failed to parse JSON from DeepSeek:', e);
      result.analysis = null;
    }
  }
  
  return result;
};