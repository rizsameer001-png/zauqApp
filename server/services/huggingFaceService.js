// server/services/huggingFaceService.js
import { AI_PROVIDERS } from '../config/aiProviders.js';

const HUGGING_FACE = AI_PROVIDERS.HUGGING_FACE;

export const callHuggingFace = async (prompt, maxLength = 500) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), HUGGING_FACE.timeout);
  
  try {
    const response = await fetch(HUGGING_FACE.apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUGGING_FACE.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_length: maxLength,
          temperature: 0.8,
          do_sample: true,
          top_p: 0.95
        }
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      success: true,
      provider: HUGGING_FACE.name,
      content: Array.isArray(data) ? data[0]?.generated_text || '' : data.generated_text || '',
      raw: data
    };
  } catch (error) {
    clearTimeout(timeoutId);
    console.error('Hugging Face error:', error.message);
    return {
      success: false,
      provider: HUGGING_FACE.name,
      error: error.message
    };
  }
};

// Generate poem using Hugging Face (simpler prompt, free tier optimized)
export const generatePoemHuggingFace = async (params) => {
  const { title, theme, genre, language } = params;
  
  const prompt = `Write a short ${genre} poem in ${language} about ${theme} titled "${title}".
  Make it 6-8 lines with rhyme.
  Return only the poem.`;
  
  return await callHuggingFace(prompt, 300);
};

// Analyze poem using Hugging Face
export const analyzePoemHuggingFace = async (poemText, language = 'urdu') => {
  const prompt = `Analyze this poem in one sentence: "${poemText.substring(0, 500)}"
  Return format: Theme: X | Tone: Y | Meaning: Z`;
  
  const result = await callHuggingFace(prompt, 150);
  
  if (result.success && result.content) {
    // Parse simple text response into structured format
    const content = result.content;
    const themeMatch = content.match(/Theme:\s*([^|]+)/i);
    const toneMatch = content.match(/Tone:\s*([^|]+)/i);
    const meaningMatch = content.match(/Meaning:\s*(.+)/i);
    
    result.analysis = {
      themes: themeMatch ? [themeMatch[1].trim()] : ['Unknown'],
      tone: toneMatch ? toneMatch[1].trim() : 'Unknown',
      meaning: meaningMatch ? meaningMatch[1].trim() : content.substring(0, 200),
      sentiment: 'neutral',
      emotions: [],
      literaryDevices: [],
      rhymeScheme: 'Not analyzed',
      difficulty: 'intermediate'
    };
  }
  
  return result;
};