// // server/services/smartTransliterationEngine.js
// // ============================================
// // SMART TRANSLITERATION ENGINE (NO AI)
// // Rule-Based + Corpus-Based + Context-Aware
// // ============================================

// // ============================================
// // 1. LANGUAGE DETECTION
// // ============================================
// function detectLanguage(text) {
//   if (!text) return 'unknown';
  
//   // Check for Devanagari (Hindi) characters
//   const devanagariRegex = /[\u0900-\u097F]/;
//   // Check for Arabic/Urdu characters
//   const urduRegex = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;
//   // Check for English characters
//   const englishRegex = /^[a-zA-Z\s.,!?-]+$/;
  
//   if (devanagariRegex.test(text)) return 'hindi';
//   if (urduRegex.test(text)) return 'urdu';
//   if (englishRegex.test(text)) return 'english';
  
//   return 'unknown';
// }












// // server/services/smartTransliterationEngine.js
// // ============================================
// // SMART TRANSLITERATION ENGINE (NO AI)
// // Rule-Based + Corpus-Based + Context-Aware
// // ============================================

// // ============================================
// // 1. LANGUAGE DETECTION
// // ============================================
// function detectLanguage(text) {
//   if (!text) return 'unknown';
  
//   const devanagariRegex = /[\u0900-\u097F]/;
//   const urduRegex = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;
//   const englishRegex = /^[a-zA-Z\s.,!?-]+$/;
  
//   if (devanagariRegex.test(text)) return 'hindi';
//   if (urduRegex.test(text)) return 'urdu';
//   if (englishRegex.test(text)) return 'english';
  
//   return 'unknown';
// }

// // ============================================
// // 2. URDU CORPUS (Expanded)
// // ============================================
// const urduCorpus = {
//   // Common words
//   'دل': 'dil', 'کی': 'ki', 'باتیں': 'baatein', 'کہاں': 'kahan',
//   'کہی': 'kahi', 'جائیں': 'jayein', 'تیرے': 'tere', 'خوابوں': 'khwabon',
//   'میں': 'mein', 'کھو': 'kho', 'گئی': 'gayi', 'ہیں': 'hain',
//   'محبت': 'mohabbat', 'کا': 'ka', 'یہ': 'yeh', 'پیغام': 'paigam',
//   'سے': 'se', 'تک': 'tak', 'جاتا': 'jata', 'ہے': 'hai',
//   'اور': 'aur', 'تو': 'to', 'بھی': 'bhi', 'ہی': 'hi', 'وہ': 'woh',
//   'اس': 'is', 'ان': 'in', 'تم': 'tum', 'آپ': 'aap', 'ہم': 'hum',
//   'میرا': 'mera', 'تیرا': 'tera', 'یہاں': 'yahan', 'وہاں': 'wahan',
//   'اب': 'ab', 'تب': 'tab', 'کیا': 'kya', 'کیوں': 'kyon',
//   'پر': 'par', 'پہ': 'pe', 'کو': 'ko', 'لیے': 'liye',
  
//   // Poetry words
//   'درد': 'dard', 'غم': 'gham', 'خوشی': 'khushi', 'عشق': 'ishq',
//   'وفا': 'wafa', 'سچ': 'sach', 'زندگی': 'zindagi', 'دنیا': 'duniya',
  
//   // Karbala
//   'کربلا': 'karbala', 'حسین': 'hussain', 'عباس': 'abbas',
//   'زینب': 'zainab', 'امام': 'imam', 'شہید': 'shaheed',
//   'پیاس': 'pyas', 'خون': 'khoon', 'صبر': 'sabr',
  
//   // Verbs
//   'کرنا': 'karna', 'کرتا': 'karta', 'ہونا': 'hona',
//   'جانا': 'jana', 'آنا': 'aana'
// };

// // ============================================
// // 3. HINDI CORPUS
// // ============================================
// const hindiCorpus = {
//   'की': 'ki', 'के': 'ke', 'को': 'ko', 'से': 'se', 'में': 'mein',
//   'पर': 'par', 'ने': 'ne', 'का': 'ka', 'कि': 'ki', 'है': 'hai',
//   'हैं': 'hain', 'था': 'tha', 'थी': 'thi', 'थे': 'the', 'हूँ': 'hoon',
//   'हो': 'ho', 'हम': 'hum', 'तुम': 'tum', 'आप': 'aap', 'मैं': 'main',
//   'यह': 'yah', 'वह': 'vah', 'ये': 'ye', 'वे': 've', 'और': 'aur',
//   'भी': 'bhi', 'तो': 'to', 'कर': 'kar', 'गया': 'gaya', 'लिए': 'liye',
//   'पे': 'pe', 'ना': 'na', 'नहीं': 'nahin', 'एक': 'ek', 'नई': 'nai',
//   'हर': 'har', 'कर्बला': 'karbala', 'हुसैन': 'hussain', 'सब्र': 'sabr',
//   'प्यास': 'pyaas', 'तपिश': 'tapish', 'दुआ': 'dua', 'लकीर': 'lakeer',
//   'कदम': 'kadam', 'रेत': 'ret', 'खून': 'khoon', 'तक़दीर': 'taqdeer',
//   'तस्वीर': 'tasveer', 'अंदाज़': 'andaaz'
// };

// // ============================================
// // 4. URDU PHONETIC RULES
// // ============================================
// const urduPhoneticRules = {
//   'ا': 'a', 'آ': 'aa', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ٹ': 't',
//   'ث': 's', 'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh', 'د': 'd',
//   'ڈ': 'd', 'ذ': 'z', 'ر': 'r', 'ڑ': 'r', 'ز': 'z', 'ژ': 'zh',
//   'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z',
//   'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ک': 'k', 'گ': 'g',
//   'ل': 'l', 'م': 'm', 'ن': 'n', 'و': 'o', 'ہ': 'h', 'ھ': 'h',
//   'ء': '', 'ی': 'y', 'ے': 'e', 'ؤ': 'o', 'ئ': 'y', 'ۃ': 'h',
//   'َ': 'a', 'ُ': 'u', 'ِ': 'i', 'ّ': 'd', 'ْ': '',
//   'ال': 'al', 'الل': 'allah', 'رہ': 'reh'
// };

// // ============================================
// // 5. HINDI PHONETIC RULES
// // ============================================
// const hindiPhoneticRules = {
//   'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo',
//   'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au', 'ऋ': 'ri',
//   'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'च': 'cha',
//   'छ': 'chha', 'ज': 'ja', 'झ': 'jha', 'ट': 'ta', 'ठ': 'tha',
//   'ड': 'da', 'ढ': 'dha', 'त': 'ta', 'थ': 'tha', 'द': 'da',
//   'ध': 'dha', 'न': 'na', 'प': 'pa', 'फ': 'pha', 'ब': 'ba',
//   'भ': 'bha', 'म': 'ma', 'य': 'ya', 'र': 'ra', 'ल': 'la',
//   'व': 'va', 'श': 'sha', 'ष': 'sha', 'स': 'sa', 'ह': 'ha',
//   'ा': 'aa', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo',
//   'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ं': 'n', 'ः': 'h'
// };

// // ============================================
// // 6. TOKENIZATION
// // ============================================
// function tokenize(text) {
//   const tokens = [];
//   let currentWord = '';
  
//   for (let i = 0; i < text.length; i++) {
//     const char = text[i];
//     const isSpace = /\s/.test(char);
//     const isPunctuation = /[,.;:!?।॥]/.test(char);
    
//     if (isSpace || isPunctuation) {
//       if (currentWord) {
//         tokens.push({ type: 'word', value: currentWord });
//         currentWord = '';
//       }
//       tokens.push({ type: 'separator', value: char });
//     } else {
//       currentWord += char;
//     }
//   }
  
//   if (currentWord) {
//     tokens.push({ type: 'word', value: currentWord });
//   }
  
//   return tokens;
// }

// // ============================================
// // 7. DICTIONARY LOOKUP
// // ============================================
// function dictionaryLookup(word, language) {
//   const corpus = language === 'hindi' ? hindiCorpus : urduCorpus;
//   return corpus[word] || null;
// }

// // ============================================
// // 8. RULE-BASED TRANSLITERATION
// // ============================================
// function ruleBasedTransliterate(word, language) {
//   const rules = language === 'hindi' ? hindiPhoneticRules : urduPhoneticRules;
//   if (!rules) return word;
  
//   let result = '';
//   let i = 0;
//   const len = word.length;
  
//   while (i < len) {
//     let matched = false;
    
//     for (let length = 4; length >= 1; length--) {
//       if (i + length <= len) {
//         const substr = word.substring(i, i + length);
//         if (rules[substr]) {
//           result += rules[substr];
//           i += length;
//           matched = true;
//           break;
//         }
//       }
//     }
    
//     if (!matched) {
//       result += word[i];
//       i++;
//     }
//   }
  
//   return result;
// }

// // ============================================
// // 9. CONTEXT CORRECTION
// // ============================================
// function contextCorrection(word) {
//   const patterns = {
//     'ae': 'e', 'aa': 'a', 'ee': 'e', 'oo': 'o',
//     'khh': 'kh', 'ghh': 'gh', 'chh': 'ch', 'jhh': 'jh',
//     'kk': 'k', 'gg': 'g', 'cc': 'ch', 'jj': 'j',
//     'tt': 't', 'dd': 'd', 'pp': 'p', 'bb': 'b'
//   };
  
//   let corrected = word;
//   for (const [pattern, replacement] of Object.entries(patterns)) {
//     corrected = corrected.replace(new RegExp(pattern, 'g'), replacement);
//   }
//   return corrected;
// }

// // ============================================
// // 10. SMART WORD TRANSLITERATION
// // ============================================
// function smartTransliterateWord(word, language) {
//   if (!word) return '';
  
//   // Dictionary lookup (highest priority)
//   let result = dictionaryLookup(word, language);
//   if (result) return result;
  
//   // Rule-based transliteration
//   result = ruleBasedTransliterate(word, language);
  
//   // Context correction
//   result = contextCorrection(result);
  
//   // Clean up
//   result = result.replace(/yں/g, 'yein').replace(/y/g, 'i');
  
//   return result;
// }

// // ============================================
// // 11. MAIN TRANSLITERATION FUNCTION
// // ============================================
// export function smartTransliterate(text, language = null) {
//   if (!text || text.trim().length === 0) {
//     return { success: false, error: 'No text provided', transliteration: '' };
//   }
  
//   console.log('🚀 Starting Smart Transliteration Engine...');
  
//   const detectedLang = language || detectLanguage(text);
//   console.log(`📌 Language: ${detectedLang}`);
  
//   if (detectedLang === 'english') {
//     return { success: true, transliteration: text, method: 'direct', language: 'english' };
//   }
  
//   const tokens = tokenize(text);
//   console.log(`🔤 Tokens: ${tokens.length}`);
  
//   const resultParts = [];
//   for (const token of tokens) {
//     if (token.type === 'word') {
//       const transliterated = smartTransliterateWord(token.value, detectedLang);
//       resultParts.push(transliterated);
//     } else {
//       resultParts.push(token.value);
//     }
//   }
  
//   let result = resultParts.join('');
  
//   // Clean up
//   result = result.replace(/\s+/g, ' ');
//   result = result.replace(/\s+([,.;:!?])/g, '$1');
//   result = result.charAt(0).toUpperCase() + result.slice(1);
  
//   console.log(`✅ Complete (${result.length} chars)`);
  
//   return {
//     success: true,
//     transliteration: result,
//     method: 'smart-engine',
//     language: detectedLang,
//     stats: { originalLength: text.length, resultLength: result.length, tokenCount: tokens.length }
//   };
// }

// // ============================================
// // 12. ADD TO CORPUS
// // ============================================
// export function addToCorpus(word, transliteration, language = 'urdu') {
//   const corpus = language === 'hindi' ? hindiCorpus : urduCorpus;
//   if (!corpus[word]) {
//     corpus[word] = transliteration;
//     console.log(`📚 Added: ${word} → ${transliteration}`);
//     return true;
//   }
//   return false;
// }

// // ============================================
// // 13. TEST FUNCTION
// // ============================================
// export function testSmartEngine() {
//   const testPoem = `دل کی باتیں کہاں کہی جائیں
// تیرے خوابوں میں کھو گئی ہیں
// محبت کا یہ پیغام
// دل سے دل تک جاتا ہے`;
  
//   console.log('\n🧪 TESTING SMART ENGINE\n');
//   const result = smartTransliterate(testPoem, 'urdu');
//   console.log('\nResult:', result.transliteration);
//   return result;
// }

// export default {
//   smartTransliterate,
//   batchSmartTransliterate: (texts, language) => texts.map(t => smartTransliterate(t, language)),
//   addToCorpus,
//   testSmartEngine,
//   detectLanguage
// };


























// ============================================
// SMART TRANSLITERATION ENGINE (NO AI)
// Supports BOTH Urdu AND Hindi
// Rule-Based + Corpus-Based + Context-Aware
// ============================================

import { urduCorpus, multiWordPhrases, nasalForms } from './urduCorpus.js';

class SmartTransliterationEngine {
  constructor() {
    // ============================================
    // LOAD MASSIVE CORPUS
    // ============================================
    this.urduCorpus = urduCorpus;
    this.multiWordPhrases = multiWordPhrases;
    this.urduNasalPatterns = nasalForms;
    
    // ============================================
    // HINDI CORPUS (Can be expanded similarly)
    // ============================================
    this.hindiCorpus = {
      'मैं': 'main', 'तू': 'tu', 'तुम': 'tum', 'आप': 'aap', 
      'वह': 'vah', 'यह': 'yah', 'हम': 'hum', 'वे': 've', 
      'ये': 'ye', 'इस': 'is', 'उस': 'us', 'इन': 'in', 'उन': 'un',
      'है': 'hai', 'हैं': 'hain', 'था': 'tha', 'थी': 'thi',
      'थे': 'the', 'थीं': 'thin', 'हूँ': 'hoon', 'हो': 'ho',
      'करता': 'karta', 'करती': 'karti', 'करते': 'karte',
      'जाता': 'jata', 'जाती': 'jati', 'जाते': 'jate',
      'देखना': 'dekhna', 'देखता': 'dekhta', 'देखती': 'dekhti',
      'प्यार': 'pyar', 'दर्द': 'dard', 'दिल': 'dil', 'जान': 'jaan',
      'कर्बला': 'karbala', 'हुसैन': 'hussain', 'अब्बास': 'abbas',
    };

    // ============================================
    // URDU CHARACTER MAP (FIXED)
    // ============================================
    this.urduCharMap = {
      'ا': 'a', 'آ': 'aa', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ٹ': 't',
      'ث': 's', 'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh', 'د': 'd',
      'ڈ': 'd', 'ذ': 'z', 'ر': 'r', 'ڑ': 'r', 'ز': 'z', 'ژ': 'zh',
      'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z',
      'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ک': 'k', 'گ': 'g',
      'ل': 'l', 'م': 'm', 'ن': 'n', 'ں': 'n', 'و': 'w',
      'ہ': 'h', 'ھ': 'h', 'ء': '', 'ی': 'y', 'ے': 'e',
      'ۂ': 'e', 'ؤ': 'o', 'ئ': 'y', 'ۃ': 't', 'ٔ': '',
      'َ': 'a', 'ُ': 'u', 'ِ': 'i', 'ّ': '', 'ْ': '', 'ٰ': 'aa'
    };

    // ============================================
    // HINDI CHARACTER MAP
    // ============================================
    this.hindiCharMap = {
      'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo',
      'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au', 'ऋ': 'ri',
      'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'ङ': 'nga',
      'च': 'cha', 'छ': 'chha', 'ज': 'ja', 'झ': 'jha', 'ञ': 'nya',
      'ट': 'ta', 'ठ': 'tha', 'ड': 'da', 'ढ': 'dha', 'ण': 'na',
      'त': 'ta', 'थ': 'tha', 'द': 'da', 'ध': 'dha', 'न': 'na',
      'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma',
      'य': 'ya', 'र': 'ra', 'ल': 'la', 'व': 'va', 'श': 'sha',
      'ष': 'sha', 'स': 'sa', 'ह': 'ha', 'क्ष': 'ksha', 'त्र': 'tra',
      'ज्ञ': 'gya', 'ड़': 'da', 'ढ़': 'dha', '़': '',
      'ा': 'aa', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo',
      'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ं': 'n',
      'ः': 'h', 'ँ': 'n', '्': ''
    };

    // ============================================
    // URDU VOWEL COMBINATIONS
    // ============================================
    this.urduVowelMap = {
      'آ': 'aa', 'او': 'au', 'اؤ': 'au', 'ؤ': 'o',
      'ای': 'ai', 'ئی': 'ai', 'ے': 'e', 'اے': 'ae',
      'اوے': 'awe', 'وئ': 'we', 'یے': 'ye', 'ۓ': 'e'
    };

    // ============================================
    // CONTEXT CORRECTIONS
    // ============================================
    this.contextCorrections = {
      'hon': 'hoon', 'men': 'mein', 'hen': 'hain', 'then': 'thin',
      'dekhen': 'dekhein', 'karen': 'karein', 'ham': 'hum',
      'lazam': 'laazim', 'wada': 'waada', 'pyas': 'pyaas',
      'be': 'bhi', 'he': 'hai', 'hae': 'hai', 'keh': 'ke',
      'ae': 'e', 'aa': 'a', 'ee': 'e', 'oo': 'o', 'ou': 'o',
      'ie': 'ye', 'ieh': 'yeh', 'yie': 'ye', 'iy': 'i',
      'hh': 'h', 'kk': 'k', 'pp': 'p', 'tt': 't', 'cc': 'ch'
    };

    // ============================================
    // FINAL CORRECTIONS DICTIONARY
    // ============================================
    this.finalCorrections = {
      'ham': 'hum', 'lazam': 'laazim', 'men': 'mein', 'hon': 'hoon',
      'hen': 'hain', 'dekhenge': 'dekheinge', 'dekhege': 'dekheinge',
      'karege': 'kareinge', 'honge': 'hongay', 'pyas': 'pyaas',
      'vada': 'waada', 'main': 'main', 'hu': 'hoon', 'hai': 'hai',
      'keh': 'ke', 'hain': 'hain', 'hoon': 'hoon', 'laazim': 'laazim'
    };
  }

  // ============================================
  // LANGUAGE DETECTION
  // ============================================
  detectLanguage(text) {
    if (!text) return 'unknown';
    
    const devanagariRegex = /[\u0900-\u097F]/;
    const urduRegex = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;
    const englishRegex = /^[a-zA-Z\s.,!?-]+$/;
    
    if (devanagariRegex.test(text)) return 'hindi';
    if (urduRegex.test(text)) return 'urdu';
    if (englishRegex.test(text)) return 'english';
    
    return 'unknown';
  }

  // ============================================
  // PREPROCESS: Handle multi-word phrases
  // ============================================
  preprocess(text) {
    let processed = text;
    
    // Sort phrases by length (longest first)
    const sortedPhrases = Object.keys(this.multiWordPhrases).sort((a, b) => b.length - a.length);
    
    for (const phrase of sortedPhrases) {
      const roman = this.multiWordPhrases[phrase];
      const regex = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      processed = processed.replace(regex, `__PHRASE_${roman.replace(/\s/g, '_')}__`);
    }
    
    return processed;
  }

  // ============================================
  // POSTPROCESS: Restore phrases and apply corrections
  // ============================================
  postprocess(text, language) {
    let result = text;
    
    // Restore multi-word phrases
    for (const [phrase, roman] of Object.entries(this.multiWordPhrases)) {
      const marker = `__PHRASE_${roman.replace(/\s/g, '_')}__`;
      result = result.replace(new RegExp(marker, 'g'), roman);
    }
    
    // Apply language-specific vowel logic
    if (language === 'urdu') {
      result = this.applyUrduVowelLogic(result);
    } else if (language === 'hindi') {
      result = this.applyHindiVowelLogic(result);
    }
    
    // Apply common context corrections
    result = this.applyContextCorrections(result);
    
    // Apply final corrections
    result = this.applyFinalCorrections(result);
    
    // Clean up spacing
    result = result.replace(/\s+/g, ' ').trim();
    result = result.replace(/\s+([,.;:!?])/g, '$1');
    
    return result;
  }

  // ============================================
  // URDU VOWEL LOGIC
  // ============================================
  applyUrduVowelLogic(text) {
    let result = text;
    
    // Nasal sound handling from corpus
    for (const [pattern, replacement] of Object.entries(this.urduNasalPatterns)) {
      const regex = new RegExp(`\\b${pattern}\\b`, 'gi');
      result = result.replace(regex, replacement);
    }
    
    // Fix common patterns
    result = result.replace(/\bhon\b/gi, 'hoon');
    result = result.replace(/\bmen\b/gi, 'mein');
    result = result.replace(/\bhen\b/gi, 'hain');
    result = result.replace(/\bthen\b/gi, 'thin');
    result = result.replace(/\bdekhenge?\b/gi, 'dekheinge');
    result = result.replace(/\bkarenge?\b/gi, 'kareinge');
    result = result.replace(/\bjayenge?\b/gi, 'jayeinge');
    
    // Long vowel sounds
    result = result.replace(/aa(?=[aeiou])/gi, 'a');
    
    // Fix 'hai' variations
    result = result.replace(/\bhe\b/gi, 'hai');
    result = result.replace(/\bhae\b/gi, 'hai');
    result = result.replace(/\bbe\b/gi, 'bhi');
    result = result.replace(/\bkeh\b/gi, 'ke');
    
    // Fix 'yeh' (CRITICAL)
    result = result.replace(/\bie\b/gi, 'ye');
    result = result.replace(/\bieh\b/gi, 'yeh');
    result = result.replace(/\byie\b/gi, 'ye');
    
    // Fix 'paaon' (پاؤں)
    result = result.replace(/\bpaon\b/gi, 'paaon');
    result = result.replace(/\bpao\b/gi, 'pao');
    
    return result;
  }

  // ============================================
  // HINDI VOWEL LOGIC
  // ============================================
  applyHindiVowelLogic(text) {
    let result = text;
    
    result = result.replace(/\bhu\b/gi, 'hoon');
    result = result.replace(/\bmain\b/gi, 'main');
    result = result.replace(/\bvah\b/gi, 'vah');
    result = result.replace(/\byah\b/gi, 'yah');
    result = result.replace(/aa(?=[aeiou])/gi, 'a');
    result = result.replace(/ee/g, 'e');
    result = result.replace(/oo/g, 'o');
    
    return result;
  }

  // ============================================
  // CONTEXT CORRECTIONS
  // ============================================
  applyContextCorrections(text) {
    let result = text;
    const words = result.split(/(\s+)/);
    
    for (let i = 0; i < words.length; i++) {
      const word = words[i].toLowerCase();
      
      if (this.contextCorrections[word]) {
        words[i] = this.contextCorrections[word];
      }
    }
    
    return words.join('');
  }

  // ============================================
  // FINAL CORRECTIONS
  // ============================================
  applyFinalCorrections(text) {
    let result = text;
    const words = result.split(/(\s+)/);
    
    for (let i = 0; i < words.length; i++) {
      const word = words[i].toLowerCase();
      
      if (this.finalCorrections[word]) {
        words[i] = this.finalCorrections[word];
      }
    }
    
    return words.join('');
  }

  // ============================================
  // TRANSLITERATE URDU WORD
  // ============================================
  transliterateUrduWord(urduWord) {
    // Check corpus first (massive 3000+ words)
    if (this.urduCorpus[urduWord]) {
      return this.urduCorpus[urduWord];
    }
    
    let result = '';
    let i = 0;
    const len = urduWord.length;
    
    while (i < len) {
      let matched = false;
      
      // Try longest matches first (2-3 char combos)
      for (let length = Math.min(3, len - i); length >= 1; length--) {
        const substring = urduWord.substr(i, length);
        
        if (this.urduVowelMap[substring]) {
          result += this.urduVowelMap[substring];
          i += length;
          matched = true;
          break;
        }
        
        if (this.urduCharMap[substring]) {
          result += this.urduCharMap[substring];
          i += length;
          matched = true;
          break;
        }
      }
      
      if (!matched) {
        result += urduWord[i];
        i++;
      }
    }
    
    // Post-process word
    result = this.postProcessWord(result);
    
    return result;
  }

  // ============================================
  // TRANSLITERATE HINDI WORD
  // ============================================
  transliterateHindiWord(hindiWord) {
    // Check corpus first
    if (this.hindiCorpus[hindiWord]) {
      return this.hindiCorpus[hindiWord];
    }
    
    let result = '';
    let i = 0;
    const len = hindiWord.length;
    
    while (i < len) {
      let matched = false;
      
      for (let length = Math.min(3, len - i); length >= 1; length--) {
        const substring = hindiWord.substr(i, length);
        
        if (this.hindiCharMap[substring]) {
          result += this.hindiCharMap[substring];
          i += length;
          matched = true;
          break;
        }
      }
      
      if (!matched) {
        result += hindiWord[i];
        i++;
      }
    }
    
    result = this.postProcessWord(result);
    return result;
  }

  // ============================================
  // Word-level post-processing (common)
  // ============================================
  postProcessWord(word) {
    let result = word;
    
    // Fix common patterns
    result = result.replace(/yw/g, 'o');
    result = result.replace(/y(?!e)/g, 'i');
    result = result.replace(/w(?=[aeiou])/g, 'v');
    result = result.replace(/hh/g, 'h');
    result = result.replace(/kk/g, 'k');
    
    // Fix vowel sequences
    result = result.replace(/aa+/g, 'a');
    result = result.replace(/ee+/g, 'e');
    result = result.replace(/oo+/g, 'o');
    
    // Remove duplicate consonants (but keep ch, sh, kh, gh)
    result = result.replace(/([^csgk])\1+/g, '$1');
    
    return result;
  }

  // ============================================
  // TOKENIZE text properly
  // ============================================
  tokenize(text) {
    const tokens = [];
    let currentWord = '';
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const isSpace = /\s/.test(char);
      const isPunctuation = /[,.;:!?۔॥،؟]/.test(char);
      
      if (isSpace || isPunctuation) {
        if (currentWord) {
          tokens.push({ type: 'word', value: currentWord });
          currentWord = '';
        }
        if (isPunctuation) {
          tokens.push({ type: 'punctuation', value: char });
        } else if (isSpace) {
          tokens.push({ type: 'space', value: char });
        }
      } else {
        currentWord += char;
      }
    }
    
    if (currentWord) {
      tokens.push({ type: 'word', value: currentWord });
    }
    
    return tokens;
  }

  // ============================================
  // MAIN: SMART TRANSLITERATE
  // ============================================
  smartTransliterate(text, language = null) {
    const startTime = Date.now();
    
    if (!text || text.trim().length === 0) {
      return { 
        success: false, 
        error: 'No text provided', 
        transliteration: '' 
      };
    }
    
    // Detect language if not specified
    const detectedLang = language || this.detectLanguage(text);
    
    console.log(`🔄 Smart Transliteration Engine (${detectedLang})...`);
    console.log(`📝 Original text length: ${text.length} chars`);
    
    // Handle English directly
    if (detectedLang === 'english') {
      return {
        success: true,
        transliteration: text,
        method: 'direct',
        language: 'english',
        stats: { durationMs: Date.now() - startTime }
      };
    }
    
    // Step 1: Preprocess
    const preprocessed = this.preprocess(text);
    
    // Step 2: Tokenize
    const tokens = this.tokenize(preprocessed);
    
    // Step 3: Transliterate each token
    const transliteratedTokens = [];
    
    for (const token of tokens) {
      if (token.type === 'word') {
        if (token.value.startsWith('__PHRASE_')) {
          transliteratedTokens.push(token.value);
        } else if (detectedLang === 'urdu') {
          transliteratedTokens.push(this.transliterateUrduWord(token.value));
        } else if (detectedLang === 'hindi') {
          transliteratedTokens.push(this.transliterateHindiWord(token.value));
        } else {
          transliteratedTokens.push(token.value);
        }
      } else {
        transliteratedTokens.push(token.value);
      }
    }
    
    // Step 4: Join
    let result = transliteratedTokens.join('');
    
    // Step 5: Postprocess
    result = this.postprocess(result, detectedLang);
    
    // Step 6: Final cleanup
    result = result
      .replace(/__PHRASE_/g, '')
      .replace(/_{2,}/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    // Capitalize first letter of each line
    result = result.replace(/^[a-z]/gm, match => match.toUpperCase());
    
    const duration = Date.now() - startTime;
    
    console.log(`✅ Transliteration complete in ${duration}ms`);
    console.log(`📄 Result preview: ${result.substring(0, 100)}...`);
    
    return {
      success: true,
      transliteration: result,
      method: 'smart-engine-v3',
      language: detectedLang,
      stats: {
        originalLength: text.length,
        resultLength: result.length,
        wordCount: text.split(/\s+/).length,
        durationMs: duration,
        tokenCount: tokens.length,
        corpusSize: Object.keys(this.urduCorpus).length
      }
    };
  }

  // ============================================
  // ADD TO CORPUS (Dynamic Learning)
  // ============================================
  addToCorpus(word, transliteration, language = 'urdu') {
    if (language === 'urdu') {
      if (!this.urduCorpus[word]) {
        this.urduCorpus[word] = transliteration;
        console.log(`📚 Added to Urdu corpus: ${word} → ${transliteration}`);
        return true;
      }
    } else if (language === 'hindi') {
      if (!this.hindiCorpus[word]) {
        this.hindiCorpus[word] = transliteration;
        console.log(`📚 Added to Hindi corpus: ${word} → ${transliteration}`);
        return true;
      }
    }
    return false;
  }

  // ============================================
  // BATCH TRANSLITERATE
  // ============================================
  batchSmartTransliterate(texts, language = null, onProgress = null) {
    const results = [];
    const total = texts.length;
    
    for (let i = 0; i < total; i++) {
      const result = this.smartTransliterate(texts[i], language);
      results.push(result);
      
      if (onProgress) {
        onProgress(i + 1, total);
      }
    }
    
    return results;
  }

  // ============================================
  // GET STATS
  // ============================================
  getStats() {
    return {
      urdu: {
        corpusSize: Object.keys(this.urduCorpus).length,
        multiWordPhrases: Object.keys(this.multiWordPhrases).length,
        nasalPatterns: Object.keys(this.urduNasalPatterns).length
      },
      hindi: {
        corpusSize: Object.keys(this.hindiCorpus).length
      },
      contextCorrections: Object.keys(this.contextCorrections).length,
      finalCorrections: Object.keys(this.finalCorrections).length
    };
  }
}

// ============================================
// TEST FUNCTION (Both languages)
// ============================================
function testSmartEngine() {
  const engine = new SmartTransliterationEngine();
  
  const testCases = [
    // Urdu tests
    { input: "ہم دیکھیں گے", expected: "Hum dekheinge", lang: 'urdu' },
    { input: "میں تمہارے پاس ہوں", expected: "Mein tumhare paas hoon", lang: 'urdu' },
    { input: "یہ دل ہے", expected: "Yeh dil hai", lang: 'urdu' },
    { input: "پیاس بجھی نہیں", expected: "Pyaas bujhi nahin", lang: 'urdu' },
    { input: "لازم ہے کہ ہم بھی دیکھیں گے", expected: "Laazim hai ke hum bhi dekheinge", lang: 'urdu' },
    { input: "وہ دن جس کا وعدہ ہے", expected: "Woh din jis ka waada hai", lang: 'urdu' },
    { input: "کربلا میں حسین کی پیاس", expected: "Karbala mein hussain ki pyaas", lang: 'urdu' },
    
    // Hindi tests
    { input: "मैं तुम्हारे पास हूँ", expected: "Main tumhare paas hoon", lang: 'hindi' },
    { input: "यह दिल है", expected: "Yeh dil hai", lang: 'hindi' },
    { input: "प्यास बुझी नहीं", expected: "Pyaas bujhi nahin", lang: 'hindi' }
  ];
  
  console.log('\n' + '='.repeat(70));
  console.log('🧪 TESTING SMART TRANSLITERATION ENGINE (URDU + HINDI)');
  console.log('='.repeat(70));
  
  let passed = 0;
  
  for (const test of testCases) {
    const result = engine.smartTransliterate(test.input, test.lang);
    const isPass = result.transliteration.toLowerCase() === test.expected.toLowerCase();
    
    console.log(`\n📝 Language: ${test.lang.toUpperCase()}`);
    console.log(`📝 Input:    ${test.input}`);
    console.log(`✅ Output:   ${result.transliteration}`);
    console.log(`🎯 Expected: ${test.expected}`);
    console.log(`${isPass ? '✓ PASS' : '✗ FAIL'}`);
    console.log(`⏱️  Time: ${result.stats.durationMs}ms`);
    console.log('-'.repeat(70));
    
    if (isPass) passed++;
  }
  
  console.log(`\n📊 RESULTS: ${passed}/${testCases.length} passed`);
  console.log(`📚 CORPUS STATS:`, engine.getStats());
  console.log('='.repeat(70));
  
  return engine;
}

// ============================================
// EXPORTS
// ============================================
export { SmartTransliterationEngine, testSmartEngine };
export default new SmartTransliterationEngine();