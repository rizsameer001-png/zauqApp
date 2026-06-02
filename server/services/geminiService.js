// server/services/geminiService.js
import { AI_PROVIDERS } from '../config/aiProviders.js';

const GEMINI = AI_PROVIDERS.GEMINI;

export const callGemini = async (prompt, systemPrompt = '') => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), GEMINI.timeout);
  
  try {
    const fullPrompt = systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt;
    
    const response = await fetch(`${GEMINI.apiUrl}?key=${GEMINI.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: fullPrompt }]
        }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 2000,
          topP: 0.9
        }
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }
    
    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    return {
      success: true,
      provider: GEMINI.name,
      content: content,
      raw: data
    };
  } catch (error) {
    clearTimeout(timeoutId);
    console.error('Gemini error:', error.message);
    return {
      success: false,
      provider: GEMINI.name,
      error: error.message
    };
  }
};

// Generate poem using Gemini
export const generatePoemGemini = async (params) => {
  const { title, theme, genre, language, style = 'classical' } = params;
  
  const systemPrompt = `You are a master poet. Write a beautiful ${genre} poem in ${language} language.
  Title: ${title}
  Theme: ${theme}
  Style: ${style}
  Length: 8-12 lines with proper rhyme scheme.
  Return ONLY the poem text, no explanations.`;
  
  const result = await callGemini(systemPrompt);
  return result;
};

// Analyze poem using Gemini
export const analyzePoemGemini = async (poemText, language = 'urdu') => {
  const prompt = `Analyze this ${language} poem and return JSON format only:
  
  Poem: "${poemText}"
  
  Return:
  {
    "themes": ["main themes"],
    "tone": "emotional tone (sad/romantic/hopeful/etc)",
    "sentiment": "positive/negative/neutral",
    "emotions": ["love", "joy", "sadness"],
    "meaning": "Simple explanation in ${language === 'urdu' ? 'Urdu' : language === 'hindi' ? 'Hindi' : 'English'}",
    "literaryDevices": ["metaphor", "simile"],
    "rhymeScheme": "pattern description",
    "difficulty": "beginner/intermediate/advanced"
  }`;
  
  return await callGemini(prompt);
};