// server/services/transliterationService.js
import axios from 'axios';

// Transliteration API endpoints (free)
const TRANSLITERATION_APIS = [
  {
    name: 'Google Transliterate (Free)',
    url: 'https://inputtools.google.com/request',
    method: 'GET',
    parse: (data) => {
      try {
        if (data && data[0] === 'SUCCESS' && data[1] && data[1][0] && data[1][0][1]) {
          return data[1][0][1][0];
        }
        return null;
      } catch (e) {
        return null;
      }
    }
  },
  {
    name: 'LibreTranslate (Free)',
    url: 'https://libretranslate.com/translate',
    method: 'POST',
    body: (text, fromLang, toLang) => ({
      q: text,
      source: fromLang,
      target: toLang,
      format: 'text'
    }),
    parse: (data) => data?.translatedText || null
  }
];

// Language codes for transliteration
const LANGUAGE_CONFIG = {
  urdu: {
    sourceLang: 'ur',
    targetLang: 'en',
    script: 'arabic',
    targetScript: 'latin',
    apiPath: 'ur',
    name: 'Urdu'
  },
  hindi: {
    sourceLang: 'hi',
    targetLang: 'en',
    script: 'devanagari',
    targetScript: 'latin',
    apiPath: 'hi',
    name: 'Hindi'
  },
  english: {
    sourceLang: 'en',
    targetLang: 'en',
    script: 'latin',
    targetScript: 'latin',
    apiPath: 'en',
    name: 'English'
  }
};

// Simple rule-based Urdu to Latin transliteration
const urduToLatinMap = {
  'ا': 'a', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ٹ': 't', 'ث': 's',
  'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh', 'د': 'd', 'ڈ': 'd',
  'ذ': 'z', 'ر': 'r', 'ڑ': 'r', 'ز': 'z', 'ژ': 'zh', 'س': 's',
  'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z', 'ع': 'a',
  'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ک': 'k', 'گ': 'g', 'ل': 'l',
  'م': 'm', 'ن': 'n', 'و': 'o', 'ہ': 'h', 'ھ': 'h', 'ء': '',
  'ی': 'y', 'ے': 'e', 'ٔ': '', ' آ': 'aa', 'إ': 'e', 'أ': 'a',
  'ؤ': 'o', 'ئ': 'y', 'ۃ': 'h', 'ً': 'an', 'ٌ': 'un', 'ٍ': 'in',
  'َ': 'a', 'ُ': 'u', 'ِ': 'i', 'ّ': 'dd', 'ْ': ''
};

// Simple rule-based Hindi to Latin transliteration
const hindiToLatinMap = {
  'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo',
  'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au', 'क': 'k', 'ख': 'kh',
  'ग': 'g', 'घ': 'gh', 'च': 'ch', 'छ': 'chh', 'ज': 'j', 'झ': 'jh',
  'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh', 'ण': 'n', 'त': 't',
  'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n', 'प': 'p', 'फ': 'ph',
  'ब': 'b', 'भ': 'bh', 'म': 'm', 'य': 'y', 'र': 'r', 'ल': 'l',
  'व': 'v', 'श': 'sh', 'ष': 'sh', 'स': 's', 'ह': 'h', 'क्ष': 'ksh',
  'त्र': 'tr', 'ज्ञ': 'gya', 'ं': 'n', 'ः': 'h', 'ा': 'aa', 'ि': 'i',
  'ी': 'ee', 'ु': 'u', 'ू': 'oo', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au'
};

// Rule-based transliteration for Urdu
function ruleBasedUrduTransliteration(text) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];
    
    // Handle special cases
    if (char === 'و' && nextChar === 'ا') {
      result += 'wa';
      i++;
      continue;
    }
    if (char === 'ی' && nextChar === 'ا') {
      result += 'ya';
      i++;
      continue;
    }
    
    // Map the character
    result += urduToLatinMap[char] || char;
  }
  
  // Clean up the result
  result = result.replace(/\s+/g, ' ').trim();
  result = result.replace(/[^\w\s-]/g, '');
  
  return result;
}

// Rule-based transliteration for Hindi
function ruleBasedHindiTransliteration(text) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];
    const twoChar = char + (nextChar || '');
    
    // Check for two-character combinations first
    if (hindiToLatinMap[twoChar]) {
      result += hindiToLatinMap[twoChar];
      i++;
      continue;
    }
    
    // Single character mapping
    result += hindiToLatinMap[char] || char;
  }
  
  result = result.replace(/\s+/g, ' ').trim();
  result = result.replace(/[^\w\s-]/g, '');
  
  return result;
}

// Google Transliterate API (free, no key needed)
async function googleTransliterate(text, language) {
  try {
    const langCode = language === 'urdu' ? 'ur' : language === 'hindi' ? 'hi' : 'en';
    const url = `https://inputtools.google.com/request?text=${encodeURIComponent(text)}&itc=${langCode}-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8&app=test`;
    
    const response = await axios.get(url, { timeout: 5000 });
    
    if (response.data && response.data[0] === 'SUCCESS' && response.data[1] && response.data[1][0]) {
      const transliterated = response.data[1][0][1];
      if (transliterated && transliterated[0]) {
        return transliterated[0];
      }
    }
    return null;
  } catch (error) {
    console.log('Google transliterate failed:', error.message);
    return null;
  }
}

// Main transliteration function
export async function generateTransliteration(text, language = 'urdu') {
  if (!text || text.trim().length === 0) {
    return { success: false, error: 'No text provided' };
  }
  
  console.log(`🔄 Generating transliteration for ${language} text...`);
  console.log(`Original: ${text.substring(0, 100)}...`);
  
  // For English, just return as-is with basic cleaning
  if (language === 'english') {
    const cleaned = text.replace(/[^\w\s.,!?-]/g, '').trim();
    return { success: true, transliteration: cleaned, method: 'direct' };
  }
  
  let transliteration = null;
  let method = 'none';
  
  // Method 1: Try Google Transliterate API (best quality)
  try {
    const googleResult = await googleTransliterate(text, language);
    if (googleResult) {
      transliteration = googleResult;
      method = 'google-api';
      console.log('✅ Google transliteration successful');
    }
  } catch (error) {
    console.log('Google transliteration failed, trying fallback...');
  }
  
  // Method 2: Rule-based transliteration (fallback)
  if (!transliteration) {
    if (language === 'urdu') {
      transliteration = ruleBasedUrduTransliteration(text);
      method = 'rule-based-urdu';
    } else if (language === 'hindi') {
      transliteration = ruleBasedHindiTransliteration(text);
      method = 'rule-based-hindi';
    }
    console.log(`📝 Used ${method} transliteration`);
  }
  
  // Clean up the result
  if (transliteration) {
    // Remove extra spaces
    transliteration = transliteration.replace(/\s+/g, ' ').trim();
    // Capitalize first letter of each line
    transliteration = transliteration.split('\n').map(line => 
      line.charAt(0).toUpperCase() + line.slice(1)
    ).join('\n');
    
    return {
      success: true,
      transliteration: transliteration,
      method: method,
      originalLanguage: language
    };
  }
  
  return {
    success: false,
    error: 'Could not generate transliteration',
    transliteration: text.replace(/[^\w\s]/g, '').trim() // Fallback: remove special chars
  };
}

// Generate transliteration for a poem by ID
export async function generatePoemTransliteration(poemId) {
  try {
    const Poem = (await import('../models/Poem.js')).default;
    const poem = await Poem.findById(poemId);
    
    if (!poem) {
      return { success: false, error: 'Poem not found' };
    }
    
    // Check if transliteration already exists
    if (poem.transliteration && poem.transliteration.trim().length > 0) {
      return { 
        success: true, 
        transliteration: poem.transliteration,
        message: 'Transliteration already exists',
        fromCache: true
      };
    }
    
    // Get content based on language
    let content = '';
    if (poem.language === 'urdu') {
      content = poem.contentUrdu || poem.content;
    } else if (poem.language === 'hindi') {
      content = poem.contentHindi || poem.content;
    } else {
      content = poem.content;
    }
    
    if (!content) {
      return { success: false, error: 'No content found for transliteration' };
    }
    
    // Generate transliteration
    const result = await generateTransliteration(content, poem.language);
    
    if (result.success) {
      // Save to database
      poem.transliteration = result.transliteration;
      await poem.save();
      
      return {
        success: true,
        transliteration: result.transliteration,
        method: result.method,
        saved: true
      };
    }
    
    return result;
  } catch (error) {
    console.error('Transliteration generation error:', error);
    return { success: false, error: error.message };
  }
}

// Batch generate transliterations for poems missing it
export async function batchGenerateTransliterations(limit = 50) {
  try {
    const Poem = (await import('../models/Poem.js')).default;
    
    // Find poems without transliteration
    const poems = await Poem.find({
      $or: [
        { transliteration: { $exists: false } },
        { transliteration: '' },
        { transliteration: null }
      ],
      isPublished: true
    }).limit(limit);
    
    console.log(`Found ${poems.length} poems missing transliteration`);
    
    const results = [];
    for (const poem of poems) {
      const content = poem.contentUrdu || poem.content;
      if (content && content.trim().length > 0) {
        const result = await generateTransliteration(content, poem.language);
        if (result.success) {
          poem.transliteration = result.transliteration;
          await poem.save();
          results.push({
            poemId: poem._id,
            title: poem.title,
            success: true,
            method: result.method
          });
          console.log(`✅ Generated for: ${poem.title}`);
        } else {
          results.push({
            poemId: poem._id,
            title: poem.title,
            success: false,
            error: result.error
          });
        }
      }
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    return {
      success: true,
      total: poems.length,
      generated: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      results
    };
  } catch (error) {
    console.error('Batch generation error:', error);
    return { success: false, error: error.message };
  }
}

export default {
  generateTransliteration,
  generatePoemTransliteration,
  batchGenerateTransliterations
};