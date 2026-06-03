// server/services/transliterationService.js
import axios from 'axios';

// ============================================
// COMPLETE URDU TO ROMAN MAPPING
// ============================================
const urduToRomanMap = {
  // Basic letters
  'ا': 'a', 'آ': 'aa', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ٹ': 't',
  'ث': 's', 'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh', 'د': 'd',
  'ڈ': 'd', 'ذ': 'z', 'ر': 'r', 'ڑ': 'r', 'ز': 'z', 'ژ': 'zh',
  'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z',
  'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ک': 'k', 'گ': 'g',
  'ل': 'l', 'م': 'm', 'ن': 'n', 'و': 'o', 'ہ': 'h', 'ھ': 'h',
  'ء': '', 'ی': 'y', 'ے': 'e', 'ٔ': '', 'ؤ': 'o', 'ئ': 'y',
  'ۃ': 'h', 'ً': 'an', 'ٌ': 'un', 'ٍ': 'in', 'َ': 'a', 'ُ': 'u',
  'ِ': 'i', 'ّ': 'dd', 'ْ': '',
  
  // Special combinations
  'ال': 'al', 'الل': 'allah', 'الله': 'allah',
  'مہ': 'meh', 'نہ': 'neh', 'تھ': 'th', 'دھ': 'dh',
  'بھ': 'bh', 'پھ': 'ph', 'کھ': 'kh', 'گھ': 'gh',
  'چھ': 'chh', 'جھ': 'jh', 'ٹھ': 'th', 'ڈھ': 'dh',
  'ڑھ': 'rh', 'لھ': 'lh', 'مھ': 'mh', 'نھ': 'nh',
  'وہ': 'woh', 'یہ': 'yeh', 'کہ': 'keh', 'سے': 'sey',
  'میں': 'mein', 'تھا': 'tha', 'تھی': 'thi', 'تھے': 'they'
};

// ============================================
// COMPLETE HINDI/DEVANAGARI TO ROMAN MAPPING
// ============================================
const hindiToRomanMap = {
  // Vowels
  'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo',
  'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au', 'ऋ': 'ri', 'ॠ': 'ree',
  'ऌ': 'li', 'ॡ': 'lee', 'अं': 'am', 'अः': 'ah',
  
  // Consonants -velars
  'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'ङ': 'nga',
  
  // Palatals
  'च': 'cha', 'छ': 'chha', 'ज': 'ja', 'झ': 'jha', 'ञ': 'nya',
  
  // Retroflex
  'ट': 'ta', 'ठ': 'tha', 'ड': 'da', 'ढ': 'dha', 'ण': 'na',
  
  // Dentals
  'त': 'ta', 'थ': 'tha', 'द': 'da', 'ध': 'dha', 'न': 'na',
  
  // Labials
  'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma',
  
  // Semivowels
  'य': 'ya', 'र': 'ra', 'ल': 'la', 'व': 'va',
  
  // Sibilants
  'श': 'sha', 'ष': 'sha', 'स': 'sa', 'ह': 'ha',
  
  // Matras (vowel signs)
  'ा': 'aa', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo',
  'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ं': 'n', 'ः': 'h',
  'ँ': 'n', '़': '', '्': '',
  
  // Special combinations
  'क्ष': 'ksh', 'त्र': 'tra', 'ज्ञ': 'gya', 'श्र': 'shra',
  'द्य': 'dya', 'ह्य': 'hya', 'द्ध': 'ddha', 'त्त': 'tta',
  'क्क': 'kka', 'च्च': 'chcha', 'ट्ट': 'tta', 'प्प': 'ppa'
};

// ============================================
// IMPROVED URDU TO ROMAN CONVERSION
// ============================================
function urduToRoman(text) {
  if (!text) return '';
  
  let result = '';
  let i = 0;
  const len = text.length;
  
  while (i < len) {
    // Check for 3-character combinations first
    if (i + 2 <= len) {
      const threeChar = text.substring(i, i + 3);
      if (urduToRomanMap[threeChar]) {
        result += urduToRomanMap[threeChar];
        i += 3;
        continue;
      }
    }
    
    // Check for 2-character combinations
    if (i + 1 <= len) {
      const twoChar = text.substring(i, i + 2);
      if (urduToRomanMap[twoChar]) {
        result += urduToRomanMap[twoChar];
        i += 2;
        continue;
      }
    }
    
    // Single character
    const char = text[i];
    result += urduToRomanMap[char] || char;
    i++;
  }
  
  // Clean up the result
  result = result
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,.!?])(\S)/g, '$1 $2')
    .trim();
  
  // Capitalize first letter of each line
  result = result.split('\n').map(line => 
    line.charAt(0).toUpperCase() + line.slice(1)
  ).join('\n');
  
  return result;
}

// ============================================
// IMPROVED HINDI/DEVANAGARI TO ROMAN CONVERSION
// ============================================
function hindiToRoman(text) {
  if (!text) return '';
  
  let result = '';
  let i = 0;
  const len = text.length;
  
  while (i < len) {
    // Check for 3-character combinations first
    if (i + 2 <= len) {
      const threeChar = text.substring(i, i + 3);
      if (hindiToRomanMap[threeChar]) {
        result += hindiToRomanMap[threeChar];
        i += 3;
        continue;
      }
    }
    
    // Check for 2-character combinations
    if (i + 1 <= len) {
      const twoChar = text.substring(i, i + 2);
      if (hindiToRomanMap[twoChar]) {
        result += hindiToRomanMap[twoChar];
        i += 2;
        continue;
      }
    }
    
    // Single character
    const char = text[i];
    result += hindiToRomanMap[char] || char;
    i++;
  }
  
  // Clean up the result
  result = result
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,.!?])(\S)/g, '$1 $2')
    .trim();
  
  // Capitalize first letter of each line
  result = result.split('\n').map(line => 
    line.charAt(0).toUpperCase() + line.slice(1)
  ).join('\n');
  
  return result;
}

// ============================================
// GOOGLE TRANSLITERATE API (Free)
// ============================================
async function googleTransliterate(text, language) {
  try {
    let itc = '';
    if (language === 'urdu') {
      itc = 'ur-t-i0-und';
    } else if (language === 'hindi') {
      itc = 'hi-t-i0-und';
    } else {
      return null;
    }
    
    const url = `https://inputtools.google.com/request?text=${encodeURIComponent(text)}&itc=${itc}&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8&app=test`;
    
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

// ============================================
// MAIN TRANSLITERATION FUNCTION
// ============================================
export async function generateTransliteration(text, language = 'urdu') {
  if (!text || text.trim().length === 0) {
    return { success: false, error: 'No text provided' };
  }
  
  console.log(`🔄 Generating transliteration for ${language} text...`);
  console.log(`Original: ${text.substring(0, 100)}...`);
  
  // For English, return as-is
  if (language === 'english') {
    const cleaned = text.replace(/[^\w\s.,!?-]/g, '').trim();
    return { success: true, transliteration: cleaned, method: 'direct' };
  }
  
  let transliteration = null;
  let method = 'none';
  
  // Method 1: Try Google Transliterate API (best quality)
  try {
    const googleResult = await googleTransliterate(text, language);
    if (googleResult && googleResult.length > 0) {
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
      transliteration = urduToRoman(text);
      method = 'rule-based-urdu';
      console.log('📝 Used Urdu rule-based transliteration');
    } else if (language === 'hindi') {
      transliteration = hindiToRoman(text);
      method = 'rule-based-hindi';
      console.log('📝 Used Hindi rule-based transliteration');
    }
  }
  
  if (transliteration && transliteration.length > 0) {
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
    transliteration: text.replace(/[^\w\s]/g, '').trim()
  };
}

// ============================================
// GET POEM CONTENT BY LANGUAGE
// ============================================
function getPoemContentByLanguage(poem, language) {
  if (language === 'urdu') {
    return poem.contentUrdu || poem.content || '';
  } else if (language === 'hindi') {
    return poem.contentHindi || poem.content || '';
  } else {
    return poem.content || '';
  }
}

// ============================================
// GENERATE FOR A POEM BY ID
// ============================================
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
    const content = getPoemContentByLanguage(poem, poem.language);
    
    if (!content || content.trim().length === 0) {
      return { success: false, error: `No content found for ${poem.language} poem` };
    }
    
    // Generate transliteration
    const result = await generateTransliteration(content, poem.language);
    
    if (result.success) {
      // Save to database
      poem.transliteration = result.transliteration;
      await poem.save();
      
      console.log(`✅ Transliteration saved for ${poem.title} (${poem.language})`);
      
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

// ============================================
// BATCH GENERATE FOR MULTIPLE POEMS
// ============================================
export async function batchGenerateTransliterations(limit = 50) {
  try {
    const Poem = (await import('../models/Poem.js')).default;
    
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
      const content = getPoemContentByLanguage(poem, poem.language);
      if (content && content.trim().length > 0) {
        const result = await generateTransliteration(content, poem.language);
        if (result.success) {
          poem.transliteration = result.transliteration;
          await poem.save();
          results.push({
            poemId: poem._id,
            title: poem.title,
            language: poem.language,
            success: true,
            method: result.method
          });
          console.log(`✅ Generated for: ${poem.title} (${poem.language})`);
        } else {
          results.push({
            poemId: poem._id,
            title: poem.title,
            language: poem.language,
            success: false,
            error: result.error
          });
        }
      }
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

// ============================================
// GET TRANSLITERATION BY SLUG
// ============================================
export async function getTransliterationBySlug(slug) {
  try {
    const Poem = (await import('../models/Poem.js')).default;
    const poem = await Poem.findOne({ slug });
    
    if (!poem) {
      return { success: false, error: 'Poem not found' };
    }
    
    if (poem.transliteration && poem.transliteration.trim().length > 0) {
      return {
        success: true,
        data: poem.transliteration,
        fromCache: true
      };
    }
    
    const content = getPoemContentByLanguage(poem, poem.language);
    const result = await generateTransliteration(content, poem.language);
    
    if (result.success) {
      poem.transliteration = result.transliteration;
      await poem.save();
      return {
        success: true,
        data: result.transliteration,
        method: result.method
      };
    }
    
    return { success: false, error: result.error };
  } catch (error) {
    console.error('Get transliteration error:', error);
    return { success: false, error: error.message };
  }
}

export default {
  generateTransliteration,
  generatePoemTransliteration,
  batchGenerateTransliterations,
  getTransliterationBySlug
};