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

// // ============================================
// // 2. FREQUENCY-BASED CORPUS (Common Words)
// // ============================================
// const hindiCorpus = {
//   // Common short words
//   'की': 'ki', 'के': 'ke', 'को': 'ko', 'से': 'se', 'में': 'mein',
//   'पर': 'par', 'ने': 'ne', 'का': 'ka', 'कि': 'ki', 'है': 'hai',
//   'हैं': 'hain', 'था': 'tha', 'थी': 'thi', 'थे': 'the', 'हूँ': 'hoon',
//   'हो': 'ho', 'हम': 'hum', 'तुम': 'tum', 'आप': 'aap', 'मैं': 'main',
//   'यह': 'yah', 'वह': 'vah', 'ये': 'ye', 'वे': 've', 'और': 'aur',
//   'भी': 'bhi', 'तो': 'to', 'कर': 'kar', 'गया': 'gaya', 'लिए': 'liye',
//   'बिना': 'bina', 'तक': 'tak', 'साथ': 'saath', 'बहुत': 'bahut',
//   'थोड़ा': 'thoda', 'सब': 'sab', 'कोई': 'koi', 'कुछ': 'kuchh',
//   'पे': 'pe', 'रे': 're', 'ना': 'na', 'नी': 'ni', 'नहीं': 'nahin',
  
//   // Poetry-specific words
//   'कर्बला': 'karbala', 'हुसैन': 'hussain', 'हुसेन': 'hussain',
//   'इमाम': 'imam', 'शहीद': 'shaheed', 'ज़ैनब': 'zainab',
//   'हक़': 'haq', 'इश्क़': 'ishq', 'वफ़ा': 'wafa',
//   'तक़दीर': 'taqdeer', 'तस्वीर': 'tasveer', 'रौशनी': 'roshni',
//   'अंधेरा': 'andhera', 'अंधेरों': 'andheron', 'सब्र': 'sabr',
//   'प्यास': 'pyaas', 'तपिश': 'tapish', 'दुआ': 'dua',
//   'लकीर': 'lakeer', 'कदम': 'kadam', 'रेत': 'ret',
//   'खून': 'khoon', 'अंदाज़': 'andaaz', 'पैग़ाम': 'paigam',
//   'ज़ुल्म': 'zulm', 'रौशन': 'roshan', 'रोशन': 'roshan',
//   'दिल': 'dil', 'दर्द': 'dard', 'आँख': 'aankh', 'आंख': 'aankh',
//   'प्रेम': 'prem', 'सत्य': 'satya', 'सुंदर': 'sundar',
//   'राम': 'ram', 'कृष्ण': 'krishna', 'शिव': 'shiv',
  
//   // Conjunctions and prepositions
//   'या': 'ya', 'लेकिन': 'lekin', 'परंतु': 'parantu',
//   'क्योंकि': 'kyonki', 'इसलिए': 'isliye', 'तब': 'tab', 'जब': 'jab',
//   'वहाँ': 'vahan', 'यहाँ': 'yahan', 'अब': 'ab'
// };

// const urduCorpus = {
//   'کی': 'ki', 'کے': 'ke', 'کو': 'ko', 'سے': 'se', 'میں': 'mein',
//   'پر': 'par', 'نے': 'ne', 'کا': 'ka', 'کہ': 'keh', 'ہے': 'hai',
//   'ہیں': 'hain', 'تھا': 'tha', 'تھی': 'thi', 'تھے': 'the',
//   'ہوں': 'hoon', 'ہو': 'ho', 'ہم': 'hum', 'تم': 'tum', 'آپ': 'aap',
//   'میں': 'main', 'یہ': 'yeh', 'وہ': 'woh', 'اور': 'aur',
//   'بھی': 'bhi', 'تو': 'to', 'کر': 'kar', 'گیا': 'gaya', 'لیے': 'liye',
//   'کربلا': 'karbala', 'حسین': 'hussain', 'امام': 'imam',
//   'شہید': 'shaheed', 'زینب': 'zainab', 'حق': 'haq',
//   'عشق': 'ishq', 'وفا': 'wafa', 'تقدیر': 'taqdeer'
// };

// // ============================================
// // 3. PHONETIC RULE ENGINE
// // ============================================
// const phoneticRules = {
//   hindi: {
//     // Vowel rules
//     'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo',
//     'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au', 'ऋ': 'ri', 'ॠ': 'ree',
//     'अं': 'am', 'अः': 'ah',
    
//     // Consonant rules
//     'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'ङ': 'nga',
//     'च': 'cha', 'छ': 'chha', 'ज': 'ja', 'झ': 'jha', 'ञ': 'nya',
//     'ट': 'ta', 'ठ': 'tha', 'ड': 'da', 'ढ': 'dha', 'ण': 'na',
//     'त': 'ta', 'थ': 'tha', 'द': 'da', 'ध': 'dha', 'न': 'na',
//     'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma',
//     'य': 'ya', 'र': 'ra', 'ल': 'la', 'व': 'va', 'श': 'sha',
//     'ष': 'sha', 'स': 'sa', 'ह': 'ha', 'क्ष': 'ksh', 'त्र': 'tra',
//     'ज्ञ': 'gya', 'श्र': 'shra',
    
//     // Matras (vowel signs)
//     'ा': 'aa', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo',
//     'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ं': 'n',
//     'ः': 'h', 'ँ': 'n', '़': '', '्': '',
    
//     // Special conjuncts
//     'क्र': 'kra', 'प्र': 'pra', 'ग्र': 'gra', 'द्र': 'dra',
//     'द्व': 'dva', 'ह्र': 'hra', 'क्क': 'kka', 'च्च': 'chcha',
//     'ट्ट': 'tta', 'प्प': 'ppa', 'त्त': 'tta', 'द्द': 'dda'
//   },
//   urdu: {
//     'ا': 'a', 'آ': 'aa', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ٹ': 't',
//     'ث': 's', 'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh', 'د': 'd',
//     'ڈ': 'd', 'ذ': 'z', 'ر': 'r', 'ڑ': 'r', 'ز': 'z', 'ژ': 'zh',
//     'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z',
//     'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ک': 'k', 'گ': 'g',
//     'ل': 'l', 'م': 'm', 'ن': 'n', 'و': 'o', 'ہ': 'h', 'ھ': 'h',
//     'ء': '', 'ی': 'y', 'ے': 'e', 'ؤ': 'o', 'ئ': 'y', 'ۃ': 'h'
//   }
// };

// // ============================================
// // 4. TOKENIZATION (Word + Phrase Level)
// // ============================================
// function tokenize(text) {
//   // Split by spaces and punctuation
//   const words = text.split(/([\s,.;:!?।॥]+)/);
//   const tokens = [];
  
//   for (const word of words) {
//     if (word.trim().length > 0) {
//       tokens.push(word);
//     }
//   }
  
//   return tokens;
// }

// // ============================================
// // 5. DICTIONARY LOOKUP (Highest Priority)
// // ============================================
// function dictionaryLookup(word, language) {
//   const corpus = language === 'hindi' ? hindiCorpus : urduCorpus;
//   return corpus[word] || null;
// }

// // ============================================
// // 6. RULE-BASED TRANSLITERATION
// // ============================================
// function ruleBasedTransliterate(word, language) {
//   const rules = phoneticRules[language];
//   if (!rules) return word;
  
//   let result = '';
//   let i = 0;
//   const len = word.length;
  
//   while (i < len) {
//     let matched = false;
    
//     // Check for 4-character combinations
//     if (i + 3 <= len) {
//       const fourChar = word.substring(i, i + 4);
//       if (rules[fourChar]) {
//         result += rules[fourChar];
//         i += 4;
//         matched = true;
//         continue;
//       }
//     }
    
//     // Check for 3-character combinations
//     if (!matched && i + 2 <= len) {
//       const threeChar = word.substring(i, i + 3);
//       if (rules[threeChar]) {
//         result += rules[threeChar];
//         i += 3;
//         matched = true;
//         continue;
//       }
//     }
    
//     // Check for 2-character combinations
//     if (!matched && i + 1 <= len) {
//       const twoChar = word.substring(i, i + 2);
//       if (rules[twoChar]) {
//         result += rules[twoChar];
//         i += 2;
//         matched = true;
//         continue;
//       }
//     }
    
//     // Single character
//     if (!matched) {
//       const char = word[i];
//       result += rules[char] || char;
//       i++;
//     }
//   }
  
//   return result;
// }

// // ============================================
// // 7. CONTEXT CORRECTION ENGINE
// // ============================================
// const contextPatterns = {
//   // Pattern: wrong -> correct
//   'ae': 'e',
//   'aa': 'a',
//   'ee': 'e',
//   'oo': 'o',
//   'khh': 'kh',
//   'ghh': 'gh',
//   'chh': 'ch',
//   'jhh': 'jh',
//   'thh': 'th',
//   'dhh': 'dh',
//   'phh': 'ph',
//   'bhh': 'bh',
//   'kk': 'k',
//   'gg': 'g',
//   'cc': 'ch',
//   'jj': 'j',
//   'tt': 't',
//   'dd': 'd',
//   'pp': 'p',
//   'bb': 'b',
//   'aai': 'ai',
//   'auu': 'au'
// };

// function contextCorrection(word) {
//   let corrected = word;
  
//   for (const [pattern, replacement] of Object.entries(contextPatterns)) {
//     corrected = corrected.replace(new RegExp(pattern, 'g'), replacement);
//   }
  
//   return corrected;
// }

// // ============================================
// // 8. FREQUENCY-BASED WORD FIXER
// // ============================================
// const frequencyFixes = {
//   // Wrong -> Correct
//   'kae': 'ke', 'pae': 'pe', 'maaen': 'mein', 'hae': 'hai',
//   'yae': 'ye', 'vae': 've', 'tumhae': 'tumhe', 'mujhae': 'mujhe',
//   'uskae': 'uske', 'inkae': 'inke', 'unkae': 'unke',
//   'kaa': 'ka', 'kii': 'ki', 'kee': 'ke',
//   'mae': 'mein', 'mai': 'main', 'tumko': 'tumhe',
//   'kara': 'kar', 'gaya': 'gaya', 'liya': 'liya',
//   'diya': 'diya', 'kiya': 'kiya'
// };

// function frequencyBasedFix(word) {
//   return frequencyFixes[word] || word;
// }

// // ============================================
// // 9. ROMAN STYLE NORMALIZER
// // ============================================
// function normalizeRomanStyle(text) {
//   let normalized = text;
  
//   // Fix spacing around punctuation
//   normalized = normalized.replace(/\s+([,.;:!?])/g, '$1');
//   normalized = normalized.replace(/([,.;:!?])(\S)/g, '$1 $2');
  
//   // Fix multiple spaces
//   normalized = normalized.replace(/\s+/g, ' ');
  
//   // Capitalize first letter of each sentence
//   normalized = normalized.replace(/([.!?])\s*([a-z])/g, (match, p1, p2) => p1 + ' ' + p2.toUpperCase());
//   normalized = normalized.charAt(0).toUpperCase() + normalized.slice(1);
  
//   // Remove extra spaces at line endings
//   normalized = normalized.trim();
  
//   return normalized;
// }

// // ============================================
// // 10. SMART WORD TRANSLITERATION PIPELINE
// // ============================================
// function smartTransliterateWord(word, language) {
//   if (!word || word.trim().length === 0) return '';
  
//   // Step 1: Dictionary lookup (highest priority)
//   let result = dictionaryLookup(word, language);
//   if (result) return result;
  
//   // Step 2: Rule-based transliteration
//   result = ruleBasedTransliterate(word, language);
  
//   // Step 3: Context correction
//   result = contextCorrection(result);
  
//   // Step 4: Frequency-based fix
//   result = frequencyBasedFix(result);
  
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
//   console.log(`📝 Input length: ${text.length} chars`);
  
//   // Step 1: Detect language if not provided
//   const detectedLang = language || detectLanguage(text);
//   console.log(`📌 Detected language: ${detectedLang}`);
  
//   if (detectedLang === 'english') {
//     console.log('✅ English text, returning as-is');
//     return { success: true, transliteration: text, method: 'direct', language: 'english' };
//   }
  
//   if (detectedLang === 'unknown') {
//     console.log('⚠️ Unknown language, returning cleaned text');
//     const cleaned = text.replace(/[^\w\s.,!?-]/g, '').trim();
//     return { success: true, transliteration: cleaned, method: 'clean', language: 'unknown' };
//   }
  
//   // Step 2: Tokenize
//   const tokens = tokenize(text);
//   console.log(`🔤 Tokenized into ${tokens.length} segments`);
  
//   // Step 3: Process each token
//   const transliteratedTokens = [];
//   for (const token of tokens) {
//     // Check if token is punctuation or whitespace
//     if (/^[\s,.;:!?।॥]+$/.test(token)) {
//       transliteratedTokens.push(token);
//     } else {
//       const transliterated = smartTransliterateWord(token, detectedLang);
//       transliteratedTokens.push(transliterated);
//     }
//   }
  
//   // Step 4: Join tokens
//   let result = transliteratedTokens.join('');
  
//   // Step 5: Normalize Roman style
//   result = normalizeRomanStyle(result);
  
//   console.log(`✅ Transliteration complete (${result.length} chars)`);
//   console.log(`📄 Preview: ${result.substring(0, 100)}...`);
  
//   return {
//     success: true,
//     transliteration: result,
//     method: 'smart-engine',
//     language: detectedLang,
//     stats: {
//       originalLength: text.length,
//       resultLength: result.length,
//       tokenCount: tokens.length
//     }
//   };
// }

// // ============================================
// // 12. BATCH TRANSLITERATION
// // ============================================
// export function batchSmartTransliterate(texts, language = null) {
//   const results = [];
//   for (const text of texts) {
//     results.push(smartTransliterate(text, language));
//   }
//   return results;
// }

// // ============================================
// // 13. ADD TO CORPUS (Dynamic Learning)
// // ============================================
// export function addToCorpus(word, transliteration, language = 'hindi') {
//   const corpus = language === 'hindi' ? hindiCorpus : urduCorpus;
//   if (!corpus[word]) {
//     corpus[word] = transliteration;
//     console.log(`📚 Added to corpus: ${word} → ${transliteration}`);
//     return true;
//   }
//   return false;
// }

// // ============================================
// // 14. TEST FUNCTION
// // ============================================
// export function testSmartEngine() {
//   const testPoem = `कर्बला की रेत पे खून की लकीर है,
// हर कदम पे सब्र की एक नई तस्वीर है।
// प्यास की तपिश में भी लब पे दुआ रही,
// हुसैन का ये ही अंदाज़-ए-तक़दीर है।`;
  
//   console.log('\n🧪 Testing Smart Transliteration Engine\n');
//   console.log('=' .repeat(60));
//   console.log('Original (Hindi):');
//   console.log(testPoem);
//   console.log('\n' + '=' .repeat(60));
  
//   const result = smartTransliterate(testPoem, 'hindi');
  
//   console.log('\nTransliterated (Roman):');
//   console.log(result.transliteration);
//   console.log('\n' + '=' .repeat(60));
//   console.log(`Method: ${result.method}`);
//   console.log(`Stats:`, result.stats);
  
//   return result;
// }

// // ============================================
// // EXPORTS
// // ============================================
// export default {
//   smartTransliterate,
//   batchSmartTransliterate,
//   addToCorpus,
//   testSmartEngine,
//   detectLanguage
// };












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

// // ============================================
// // 2. FREQUENCY-BASED CORPUS (Common Words)
// // ============================================
// const hindiCorpus = {
//   // Common short words
//   'की': 'ki', 'के': 'ke', 'को': 'ko', 'से': 'se', 'में': 'mein',
//   'पर': 'par', 'ने': 'ne', 'का': 'ka', 'कि': 'ki', 'है': 'hai',
//   'हैं': 'hain', 'था': 'tha', 'थी': 'thi', 'थे': 'the', 'हूँ': 'hoon',
//   'हो': 'ho', 'हम': 'hum', 'तुम': 'tum', 'आप': 'aap', 'मैं': 'main',
//   'यह': 'yah', 'वह': 'vah', 'ये': 'ye', 'वे': 've', 'और': 'aur',
//   'भी': 'bhi', 'तो': 'to', 'कर': 'kar', 'गया': 'gaya', 'लिए': 'liye',
//   'बिना': 'bina', 'तक': 'tak', 'साथ': 'saath', 'बहुत': 'bahut',
//   'थोड़ा': 'thoda', 'सब': 'sab', 'कोई': 'koi', 'कुछ': 'kuchh',
//   'पे': 'pe', 'रे': 're', 'ना': 'na', 'नी': 'ni', 'नहीं': 'nahin',
//   'एक': 'ek', 'नई': 'nai', 'हर': 'har', 'भी': 'bhi',
  
//   // Poetry-specific words
//   'कर्बला': 'karbala', 'हुसैन': 'hussain', 'हुसेन': 'hussain',
//   'इमाम': 'imam', 'शहीद': 'shaheed', 'ज़ैनब': 'zainab',
//   'हक़': 'haq', 'इश्क़': 'ishq', 'वफ़ा': 'wafa',
//   'तक़दीर': 'taqdeer', 'तस्वीर': 'tasveer', 'रौशनी': 'roshni',
//   'अंधेरा': 'andhera', 'अंधेरों': 'andheron', 'सब्र': 'sabr',
//   'प्यास': 'pyaas', 'तपिश': 'tapish', 'दुआ': 'dua',
//   'लकीर': 'lakeer', 'कदम': 'kadam', 'रेत': 'ret',
//   'खून': 'khoon', 'अंदाज़': 'andaaz', 'पैग़ाम': 'paigam',
//   'ज़ुल्म': 'zulm', 'रौशन': 'roshan', 'रोशन': 'roshan',
//   'दिल': 'dil', 'दर्द': 'dard', 'आँख': 'aankh', 'आंख': 'aankh',
//   'प्रेम': 'prem', 'सत्य': 'satya', 'सुंदर': 'sundar',
//   'राम': 'ram', 'कृष्ण': 'krishna', 'शिव': 'shiv'
// };

// const urduCorpus = {
//   'کی': 'ki', 'کے': 'ke', 'کو': 'ko', 'سے': 'se', 'میں': 'mein',
//   'پر': 'par', 'نے': 'ne', 'کا': 'ka', 'کہ': 'keh', 'ہے': 'hai',
//   'ہیں': 'hain', 'تھا': 'tha', 'تھی': 'thi', 'تھے': 'the',
//   'ہوں': 'hoon', 'ہو': 'ho', 'ہم': 'hum', 'تم': 'tum', 'آپ': 'aap',
//   'یہ': 'yeh', 'وہ': 'woh', 'اور': 'aur', 'بھی': 'bhi', 'تو': 'to',
//   'کر': 'kar', 'گیا': 'gaya', 'لیے': 'liye', 'کربلا': 'karbala',
//   'حسین': 'hussain', 'امام': 'imam', 'شہید': 'shaheed', 'زینب': 'zainab',
//   'حق': 'haq', 'عشق': 'ishq', 'وفا': 'wafa', 'تقدیر': 'taqdeer'
// };

// // ============================================
// // 3. PHONETIC RULE ENGINE
// // ============================================
// const phoneticRules = {
//   hindi: {
//     'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo',
//     'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au', 'ऋ': 'ri', 'ॠ': 'ree',
//     'अं': 'am', 'अः': 'ah',
//     'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'ङ': 'nga',
//     'च': 'cha', 'छ': 'chha', 'ज': 'ja', 'झ': 'jha', 'ञ': 'nya',
//     'ट': 'ta', 'ठ': 'tha', 'ड': 'da', 'ढ': 'dha', 'ण': 'na',
//     'त': 'ta', 'थ': 'tha', 'द': 'da', 'ध': 'dha', 'न': 'na',
//     'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma',
//     'य': 'ya', 'र': 'ra', 'ल': 'la', 'व': 'va', 'श': 'sha',
//     'ष': 'sha', 'स': 'sa', 'ह': 'ha', 'क्ष': 'ksh', 'त्र': 'tra',
//     'ज्ञ': 'gya', 'श्र': 'shra',
//     'ा': 'aa', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo',
//     'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ं': 'n',
//     'ः': 'h', 'ँ': 'n', '़': '', '्': '',
//     'क्र': 'kra', 'प्र': 'pra', 'ग्र': 'gra', 'द्र': 'dra',
//     'द्व': 'dva', 'ह्र': 'hra'
//   },
//   urdu: {
//     'ا': 'a', 'آ': 'aa', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ٹ': 't',
//     'ث': 's', 'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh', 'د': 'd',
//     'ڈ': 'd', 'ذ': 'z', 'ر': 'r', 'ڑ': 'r', 'ز': 'z', 'ژ': 'zh',
//     'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z',
//     'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ک': 'k', 'گ': 'g',
//     'ل': 'l', 'م': 'm', 'ن': 'n', 'و': 'o', 'ہ': 'h', 'ھ': 'h',
//     'ء': '', 'ی': 'y', 'ے': 'e', 'ؤ': 'o', 'ئ': 'y', 'ۃ': 'h'
//   }
// };

// // ============================================
// // 4. TOKENIZATION (Preserve spaces)
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
// // 5. DICTIONARY LOOKUP
// // ============================================
// function dictionaryLookup(word, language) {
//   const corpus = language === 'hindi' ? hindiCorpus : urduCorpus;
//   return corpus[word] || null;
// }

// // ============================================
// // 6. RULE-BASED TRANSLITERATION
// // ============================================
// function ruleBasedTransliterate(word, language) {
//   const rules = phoneticRules[language];
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
// // 7. CONTEXT CORRECTION
// // ============================================
// function contextCorrection(word) {
//   const patterns = {
//     'ae': 'e', 'aa': 'a', 'ee': 'e', 'oo': 'o',
//     'khh': 'kh', 'ghh': 'gh', 'chh': 'ch', 'jhh': 'jh',
//     'thh': 'th', 'dhh': 'dh', 'phh': 'ph', 'bhh': 'bh',
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
// // 8. FREQUENCY-BASED WORD FIXER
// // ============================================
// function frequencyBasedFix(word) {
//   const fixes = {
//     'kae': 'ke', 'pae': 'pe', 'maaen': 'mein', 'hae': 'hai',
//     'yae': 'ye', 'vae': 've', 'kaa': 'ka', 'kii': 'ki', 'kee': 'ke',
//     'mae': 'mein', 'mai': 'main', 'kara': 'kar'
//   };
//   return fixes[word] || word;
// }

// // ============================================
// // 9. SMART WORD TRANSLITERATION
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
  
//   // Frequency-based fix
//   result = frequencyBasedFix(result);
  
//   return result;
// }

// // ============================================
// // 10. MAIN TRANSLITERATION FUNCTION
// // ============================================
// export function smartTransliterate(text, language = null) {
//   if (!text || text.trim().length === 0) {
//     return { success: false, error: 'No text provided', transliteration: '' };
//   }
  
//   console.log('🚀 Starting Smart Transliteration Engine...');
  
//   // Detect language
//   const detectedLang = language || detectLanguage(text);
//   console.log(`📌 Language: ${detectedLang}`);
  
//   if (detectedLang === 'english') {
//     return { success: true, transliteration: text, method: 'direct', language: 'english' };
//   }
  
//   // Tokenize preserving spaces
//   const tokens = tokenize(text);
//   console.log(`🔤 Tokens: ${tokens.length}`);
  
//   // Process each token
//   const resultParts = [];
//   for (const token of tokens) {
//     if (token.type === 'word') {
//       const transliterated = smartTransliterateWord(token.value, detectedLang);
//       resultParts.push(transliterated);
//     } else {
//       resultParts.push(token.value);
//     }
//   }
  
//   // Join and normalize
//   let result = resultParts.join('');
  
//   // Fix spacing around punctuation
//   result = result.replace(/\s+([,.;:!?])/g, '$1');
//   result = result.replace(/([,.;:!?])(\S)/g, '$1 $2');
//   result = result.replace(/\s+/g, ' ');
  
//   // Capitalize first letter
//   result = result.charAt(0).toUpperCase() + result.slice(1);
  
//   console.log(`✅ Complete (${result.length} chars)`);
  
//   return {
//     success: true,
//     transliteration: result,
//     method: 'smart-engine',
//     language: detectedLang,
//     stats: {
//       originalLength: text.length,
//       resultLength: result.length,
//       tokenCount: tokens.length
//     }
//   };
// }

// // ============================================
// // 11. BATCH TRANSLITERATION
// // ============================================
// export function batchSmartTransliterate(texts, language = null) {
//   return texts.map(text => smartTransliterate(text, language));
// }

// // ============================================
// // 12. ADD TO CORPUS
// // ============================================
// export function addToCorpus(word, transliteration, language = 'hindi') {
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
//   const testPoem = `कर्बला की रेत पे खून की लकीर है,
// हर कदम पे सब्र की एक नई तस्वीर है।`;
  
//   console.log('\n🧪 TESTING SMART ENGINE\n');
//   console.log('Original:', testPoem);
//   const result = smartTransliterate(testPoem, 'hindi');
//   console.log('\nResult:', result.transliteration);
//   return result;
// }

// export default {
//   smartTransliterate,
//   batchSmartTransliterate,
//   addToCorpus,
//   testSmartEngine,
//   detectLanguage
// };



















// server/services/smartTransliterationEngine.js
// ============================================
// SMART TRANSLITERATION ENGINE (NO AI)
// Rule-Based + Corpus-Based + Context-Aware
// ============================================

// ============================================
// 1. LANGUAGE DETECTION
// ============================================
function detectLanguage(text) {
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
// 2. URDU CORPUS (Expanded)
// ============================================
const urduCorpus = {
  // Common words
  'دل': 'dil', 'کی': 'ki', 'باتیں': 'baatein', 'کہاں': 'kahan',
  'کہی': 'kahi', 'جائیں': 'jayein', 'تیرے': 'tere', 'خوابوں': 'khwabon',
  'میں': 'mein', 'کھو': 'kho', 'گئی': 'gayi', 'ہیں': 'hain',
  'محبت': 'mohabbat', 'کا': 'ka', 'یہ': 'yeh', 'پیغام': 'paigam',
  'سے': 'se', 'تک': 'tak', 'جاتا': 'jata', 'ہے': 'hai',
  'اور': 'aur', 'تو': 'to', 'بھی': 'bhi', 'ہی': 'hi', 'وہ': 'woh',
  'اس': 'is', 'ان': 'in', 'تم': 'tum', 'آپ': 'aap', 'ہم': 'hum',
  'میرا': 'mera', 'تیرا': 'tera', 'یہاں': 'yahan', 'وہاں': 'wahan',
  'اب': 'ab', 'تب': 'tab', 'کیا': 'kya', 'کیوں': 'kyon',
  'پر': 'par', 'پہ': 'pe', 'کو': 'ko', 'لیے': 'liye',
  
  // Poetry words
  'درد': 'dard', 'غم': 'gham', 'خوشی': 'khushi', 'عشق': 'ishq',
  'وفا': 'wafa', 'سچ': 'sach', 'زندگی': 'zindagi', 'دنیا': 'duniya',
  
  // Karbala
  'کربلا': 'karbala', 'حسین': 'hussain', 'عباس': 'abbas',
  'زینب': 'zainab', 'امام': 'imam', 'شہید': 'shaheed',
  'پیاس': 'pyas', 'خون': 'khoon', 'صبر': 'sabr',
  
  // Verbs
  'کرنا': 'karna', 'کرتا': 'karta', 'ہونا': 'hona',
  'جانا': 'jana', 'آنا': 'aana'
};

// ============================================
// 3. HINDI CORPUS
// ============================================
const hindiCorpus = {
  'की': 'ki', 'के': 'ke', 'को': 'ko', 'से': 'se', 'में': 'mein',
  'पर': 'par', 'ने': 'ne', 'का': 'ka', 'कि': 'ki', 'है': 'hai',
  'हैं': 'hain', 'था': 'tha', 'थी': 'thi', 'थे': 'the', 'हूँ': 'hoon',
  'हो': 'ho', 'हम': 'hum', 'तुम': 'tum', 'आप': 'aap', 'मैं': 'main',
  'यह': 'yah', 'वह': 'vah', 'ये': 'ye', 'वे': 've', 'और': 'aur',
  'भी': 'bhi', 'तो': 'to', 'कर': 'kar', 'गया': 'gaya', 'लिए': 'liye',
  'पे': 'pe', 'ना': 'na', 'नहीं': 'nahin', 'एक': 'ek', 'नई': 'nai',
  'हर': 'har', 'कर्बला': 'karbala', 'हुसैन': 'hussain', 'सब्र': 'sabr',
  'प्यास': 'pyaas', 'तपिश': 'tapish', 'दुआ': 'dua', 'लकीर': 'lakeer',
  'कदम': 'kadam', 'रेत': 'ret', 'खून': 'khoon', 'तक़दीर': 'taqdeer',
  'तस्वीर': 'tasveer', 'अंदाज़': 'andaaz'
};

// ============================================
// 4. URDU PHONETIC RULES
// ============================================
const urduPhoneticRules = {
  'ا': 'a', 'آ': 'aa', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ٹ': 't',
  'ث': 's', 'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh', 'د': 'd',
  'ڈ': 'd', 'ذ': 'z', 'ر': 'r', 'ڑ': 'r', 'ز': 'z', 'ژ': 'zh',
  'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z',
  'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ک': 'k', 'گ': 'g',
  'ل': 'l', 'م': 'm', 'ن': 'n', 'و': 'o', 'ہ': 'h', 'ھ': 'h',
  'ء': '', 'ی': 'y', 'ے': 'e', 'ؤ': 'o', 'ئ': 'y', 'ۃ': 'h',
  'َ': 'a', 'ُ': 'u', 'ِ': 'i', 'ّ': 'd', 'ْ': '',
  'ال': 'al', 'الل': 'allah', 'رہ': 'reh'
};

// ============================================
// 5. HINDI PHONETIC RULES
// ============================================
const hindiPhoneticRules = {
  'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo',
  'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au', 'ऋ': 'ri',
  'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'च': 'cha',
  'छ': 'chha', 'ज': 'ja', 'झ': 'jha', 'ट': 'ta', 'ठ': 'tha',
  'ड': 'da', 'ढ': 'dha', 'त': 'ta', 'थ': 'tha', 'द': 'da',
  'ध': 'dha', 'न': 'na', 'प': 'pa', 'फ': 'pha', 'ब': 'ba',
  'भ': 'bha', 'म': 'ma', 'य': 'ya', 'र': 'ra', 'ल': 'la',
  'व': 'va', 'श': 'sha', 'ष': 'sha', 'स': 'sa', 'ह': 'ha',
  'ा': 'aa', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo',
  'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ं': 'n', 'ः': 'h'
};

// ============================================
// 6. TOKENIZATION
// ============================================
function tokenize(text) {
  const tokens = [];
  let currentWord = '';
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const isSpace = /\s/.test(char);
    const isPunctuation = /[,.;:!?।॥]/.test(char);
    
    if (isSpace || isPunctuation) {
      if (currentWord) {
        tokens.push({ type: 'word', value: currentWord });
        currentWord = '';
      }
      tokens.push({ type: 'separator', value: char });
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
// 7. DICTIONARY LOOKUP
// ============================================
function dictionaryLookup(word, language) {
  const corpus = language === 'hindi' ? hindiCorpus : urduCorpus;
  return corpus[word] || null;
}

// ============================================
// 8. RULE-BASED TRANSLITERATION
// ============================================
function ruleBasedTransliterate(word, language) {
  const rules = language === 'hindi' ? hindiPhoneticRules : urduPhoneticRules;
  if (!rules) return word;
  
  let result = '';
  let i = 0;
  const len = word.length;
  
  while (i < len) {
    let matched = false;
    
    for (let length = 4; length >= 1; length--) {
      if (i + length <= len) {
        const substr = word.substring(i, i + length);
        if (rules[substr]) {
          result += rules[substr];
          i += length;
          matched = true;
          break;
        }
      }
    }
    
    if (!matched) {
      result += word[i];
      i++;
    }
  }
  
  return result;
}

// ============================================
// 9. CONTEXT CORRECTION
// ============================================
function contextCorrection(word) {
  const patterns = {
    'ae': 'e', 'aa': 'a', 'ee': 'e', 'oo': 'o',
    'khh': 'kh', 'ghh': 'gh', 'chh': 'ch', 'jhh': 'jh',
    'kk': 'k', 'gg': 'g', 'cc': 'ch', 'jj': 'j',
    'tt': 't', 'dd': 'd', 'pp': 'p', 'bb': 'b'
  };
  
  let corrected = word;
  for (const [pattern, replacement] of Object.entries(patterns)) {
    corrected = corrected.replace(new RegExp(pattern, 'g'), replacement);
  }
  return corrected;
}

// ============================================
// 10. SMART WORD TRANSLITERATION
// ============================================
function smartTransliterateWord(word, language) {
  if (!word) return '';
  
  // Dictionary lookup (highest priority)
  let result = dictionaryLookup(word, language);
  if (result) return result;
  
  // Rule-based transliteration
  result = ruleBasedTransliterate(word, language);
  
  // Context correction
  result = contextCorrection(result);
  
  // Clean up
  result = result.replace(/yں/g, 'yein').replace(/y/g, 'i');
  
  return result;
}

// ============================================
// 11. MAIN TRANSLITERATION FUNCTION
// ============================================
export function smartTransliterate(text, language = null) {
  if (!text || text.trim().length === 0) {
    return { success: false, error: 'No text provided', transliteration: '' };
  }
  
  console.log('🚀 Starting Smart Transliteration Engine...');
  
  const detectedLang = language || detectLanguage(text);
  console.log(`📌 Language: ${detectedLang}`);
  
  if (detectedLang === 'english') {
    return { success: true, transliteration: text, method: 'direct', language: 'english' };
  }
  
  const tokens = tokenize(text);
  console.log(`🔤 Tokens: ${tokens.length}`);
  
  const resultParts = [];
  for (const token of tokens) {
    if (token.type === 'word') {
      const transliterated = smartTransliterateWord(token.value, detectedLang);
      resultParts.push(transliterated);
    } else {
      resultParts.push(token.value);
    }
  }
  
  let result = resultParts.join('');
  
  // Clean up
  result = result.replace(/\s+/g, ' ');
  result = result.replace(/\s+([,.;:!?])/g, '$1');
  result = result.charAt(0).toUpperCase() + result.slice(1);
  
  console.log(`✅ Complete (${result.length} chars)`);
  
  return {
    success: true,
    transliteration: result,
    method: 'smart-engine',
    language: detectedLang,
    stats: { originalLength: text.length, resultLength: result.length, tokenCount: tokens.length }
  };
}

// ============================================
// 12. ADD TO CORPUS
// ============================================
export function addToCorpus(word, transliteration, language = 'urdu') {
  const corpus = language === 'hindi' ? hindiCorpus : urduCorpus;
  if (!corpus[word]) {
    corpus[word] = transliteration;
    console.log(`📚 Added: ${word} → ${transliteration}`);
    return true;
  }
  return false;
}

// ============================================
// 13. TEST FUNCTION
// ============================================
export function testSmartEngine() {
  const testPoem = `دل کی باتیں کہاں کہی جائیں
تیرے خوابوں میں کھو گئی ہیں
محبت کا یہ پیغام
دل سے دل تک جاتا ہے`;
  
  console.log('\n🧪 TESTING SMART ENGINE\n');
  const result = smartTransliterate(testPoem, 'urdu');
  console.log('\nResult:', result.transliteration);
  return result;
}

export default {
  smartTransliterate,
  batchSmartTransliterate: (texts, language) => texts.map(t => smartTransliterate(t, language)),
  addToCorpus,
  testSmartEngine,
  detectLanguage
};