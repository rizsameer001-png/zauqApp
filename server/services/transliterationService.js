// // server/services/transliterationService.js
// import axios from 'axios';

// // ============================================
// // COMPLETE URDU TO ROMAN MAPPING
// // ============================================
// const urduToRomanMap = {
//   // Basic letters
//   'ا': 'a', 'آ': 'aa', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ٹ': 't',
//   'ث': 's', 'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh', 'د': 'd',
//   'ڈ': 'd', 'ذ': 'z', 'ر': 'r', 'ڑ': 'r', 'ز': 'z', 'ژ': 'zh',
//   'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z',
//   'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ک': 'k', 'گ': 'g',
//   'ل': 'l', 'م': 'm', 'ن': 'n', 'و': 'o', 'ہ': 'h', 'ھ': 'h',
//   'ء': '', 'ی': 'y', 'ے': 'e', 'ٔ': '', 'ؤ': 'o', 'ئ': 'y',
//   'ۃ': 'h', 'ً': 'an', 'ٌ': 'un', 'ٍ': 'in', 'َ': 'a', 'ُ': 'u',
//   'ِ': 'i', 'ّ': 'dd', 'ْ': '',
  
//   // Common words
//   'ال': 'al', 'الل': 'allah', 'الله': 'allah',
//   'محمد': 'muhammad', 'رسول': 'rasool', 'الله': 'allah',
//   'رحمن': 'rehman', 'رحیم': 'raheem', 'کریم': 'kareem'
// };

// // ============================================
// // COMPLETE HINDI/DEVANAGARI TO ROMAN MAPPING
// // ============================================
// const hindiToRomanMap = {
//   // Vowels
//   'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo',
//   'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au', 'ऋ': 'ri', 'ॠ': 'ree',
//   'ऌ': 'li', 'ॡ': 'lee', 'अं': 'am', 'अः': 'ah',
  
//   // Consonants
//   'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'ङ': 'nga',
//   'च': 'cha', 'छ': 'chha', 'ज': 'ja', 'झ': 'jha', 'ञ': 'nya',
//   'ट': 'ta', 'ठ': 'tha', 'ड': 'da', 'ढ': 'dha', 'ण': 'na',
//   'त': 'ta', 'थ': 'tha', 'द': 'da', 'ध': 'dha', 'न': 'na',
//   'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma',
//   'य': 'ya', 'र': 'ra', 'ल': 'la', 'व': 'va', 'श': 'sha',
//   'ष': 'sha', 'स': 'sa', 'ह': 'ha', 'क्ष': 'ksh', 'त्र': 'tra',
//   'ज्ञ': 'gya', 'श्र': 'shra',
  
//   // Matras (vowel signs)
//   'ा': 'aa', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo',
//   'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ं': 'n',
//   'ः': 'h', 'ँ': 'n', '़': '', '्': '',
  
//   // Common words
//   'राम': 'ram', 'कृष्ण': 'krishna', 'शिव': 'shiv',
//   'प्रेम': 'prem', 'सत्य': 'satya', 'सुंदर': 'sundar'
// };

// // ============================================
// // RULE-BASED TRANSLITERATION FUNCTIONS
// // ============================================
// function urduToRoman(text) {
//   if (!text) return '';
  
//   let result = '';
//   let i = 0;
//   const len = text.length;
  
//   while (i < len) {
//     // Check for 4-character combinations
//     if (i + 3 <= len) {
//       const fourChar = text.substring(i, i + 4);
//       if (urduToRomanMap[fourChar]) {
//         result += urduToRomanMap[fourChar];
//         i += 4;
//         continue;
//       }
//     }
    
//     // Check for 3-character combinations
//     if (i + 2 <= len) {
//       const threeChar = text.substring(i, i + 3);
//       if (urduToRomanMap[threeChar]) {
//         result += urduToRomanMap[threeChar];
//         i += 3;
//         continue;
//       }
//     }
    
//     // Check for 2-character combinations
//     if (i + 1 <= len) {
//       const twoChar = text.substring(i, i + 2);
//       if (urduToRomanMap[twoChar]) {
//         result += urduToRomanMap[twoChar];
//         i += 2;
//         continue;
//       }
//     }
    
//     // Single character
//     const char = text[i];
//     result += urduToRomanMap[char] || char;
//     i++;
//   }
  
//   // Clean up the result
//   result = result
//     .replace(/\s+/g, ' ')
//     .replace(/\s+([,.;:!?])/g, '$1')
//     .replace(/([,.!?])(\S)/g, '$1 $2')
//     .trim();
  
//   // Capitalize first letter of each line
//   result = result.split('\n').map(line => 
//     line.charAt(0).toUpperCase() + line.slice(1)
//   ).join('\n');
  
//   return result;
// }

// function hindiToRoman(text) {
//   if (!text) return '';
  
//   let result = '';
//   let i = 0;
//   const len = text.length;
  
//   while (i < len) {
//     // Check for 4-character combinations
//     if (i + 3 <= len) {
//       const fourChar = text.substring(i, i + 4);
//       if (hindiToRomanMap[fourChar]) {
//         result += hindiToRomanMap[fourChar];
//         i += 4;
//         continue;
//       }
//     }
    
//     // Check for 3-character combinations
//     if (i + 2 <= len) {
//       const threeChar = text.substring(i, i + 3);
//       if (hindiToRomanMap[threeChar]) {
//         result += hindiToRomanMap[threeChar];
//         i += 3;
//         continue;
//       }
//     }
    
//     // Check for 2-character combinations
//     if (i + 1 <= len) {
//       const twoChar = text.substring(i, i + 2);
//       if (hindiToRomanMap[twoChar]) {
//         result += hindiToRomanMap[twoChar];
//         i += 2;
//         continue;
//       }
//     }
    
//     // Single character
//     const char = text[i];
//     result += hindiToRomanMap[char] || char;
//     i++;
//   }
  
//   // Clean up
//   result = result
//     .replace(/\s+/g, ' ')
//     .replace(/\s+([,.;:!?])/g, '$1')
//     .replace(/([,.!?])(\S)/g, '$1 $2')
//     .trim();
  
//   // Capitalize first letter of each line
//   result = result.split('\n').map(line => 
//     line.charAt(0).toUpperCase() + line.slice(1)
//   ).join('\n');
  
//   return result;
// }

// // ============================================
// // GOOGLE TRANSLITERATE API (Enhanced)
// // ============================================
// async function googleTransliterate(text, language) {
//   try {
//     let itc = '';
//     if (language === 'urdu') {
//       itc = 'ur-t-i0-und';
//     } else if (language === 'hindi') {
//       itc = 'hi-t-i0-und';
//     } else {
//       return null;
//     }
    
//     // Split into smaller chunks for better results
//     const chunks = text.match(/.{1,500}/g) || [text];
//     let results = [];
    
//     for (const chunk of chunks) {
//       const url = `https://inputtools.google.com/request?text=${encodeURIComponent(chunk)}&itc=${itc}&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8&app=test`;
//       const response = await axios.get(url, { timeout: 5000 });
      
//       if (response.data && response.data[0] === 'SUCCESS' && response.data[1] && response.data[1][0]) {
//         const transliterated = response.data[1][0][1];
//         if (transliterated && transliterated[0]) {
//           results.push(transliterated[0]);
//         }
//       }
//     }
    
//     return results.join('');
//   } catch (error) {
//     console.log('Google transliterate failed:', error.message);
//     return null;
//   }
// }

// // ============================================
// // MAIN TRANSLITERATION FUNCTION
// // ============================================
// export async function generateTransliteration(text, language = 'urdu', method = 'auto') {
//   if (!text || text.trim().length === 0) {
//     return { success: false, error: 'No text provided' };
//   }
  
//   console.log(`🔄 Generating transliteration for ${language} text...`);
//   console.log(`Original: ${text.substring(0, 100)}...`);
  
//   // For English, return as-is
//   if (language === 'english') {
//     const cleaned = text.replace(/[^\w\s.,!?-]/g, '').trim();
//     return { success: true, transliteration: cleaned, method: 'direct' };
//   }
  
//   let transliteration = null;
//   let usedMethod = 'none';
  
//   // Method 1: Try Google Transliterate API (best quality)
//   if (method === 'auto' || method === 'google') {
//     try {
//       const googleResult = await googleTransliterate(text, language);
//       if (googleResult && googleResult.length > 0) {
//         transliteration = googleResult;
//         usedMethod = 'google-api';
//         console.log('✅ Google transliteration successful');
//       }
//     } catch (error) {
//       console.log('Google transliteration failed, trying fallback...');
//     }
//   }
  
//   // Method 2: Rule-based transliteration (fallback)
//   if (!transliteration) {
//     if (language === 'urdu') {
//       transliteration = urduToRoman(text);
//       usedMethod = 'rule-based-urdu';
//       console.log('📝 Used Urdu rule-based transliteration');
//     } else if (language === 'hindi') {
//       transliteration = hindiToRoman(text);
//       usedMethod = 'rule-based-hindi';
//       console.log('📝 Used Hindi rule-based transliteration');
//     }
//   }
  
//   if (transliteration && transliteration.length > 0) {
//     return {
//       success: true,
//       transliteration: transliteration,
//       method: usedMethod,
//       originalLanguage: language
//     };
//   }
  
//   return {
//     success: false,
//     error: 'Could not generate transliteration',
//     transliteration: text.replace(/[^\w\s]/g, '').trim()
//   };
// }

// // ============================================
// // AUTO-TRANSLITERATE ON POEM SAVE
// // ============================================
// export async function autoTransliteratePoem(poem, force = false) {
//   // Check if auto-transliteration is enabled
//   if (poem.autoTransliterate === false && !force) {
//     console.log(`⏭️ Auto-transliteration disabled for ${poem.title}`);
//     return { success: false, skipped: true };
//   }
  
//   // Check if transliteration already exists and not forced
//   if (!force && poem.transliteration && poem.transliteration.trim().length > 0) {
//     console.log(`✅ Transliteration already exists for ${poem.title}`);
//     return { success: true, fromCache: true, transliteration: poem.transliteration };
//   }
  
//   // Get content based on language
//   let content = '';
//   if (poem.language === 'urdu') {
//     content = poem.contentUrdu || poem.content || '';
//   } else if (poem.language === 'hindi') {
//     content = poem.contentHindi || poem.content || '';
//   } else {
//     content = poem.content || '';
//   }
  
//   if (!content || content.trim().length === 0) {
//     console.log(`⚠️ No content found for ${poem.title}`);
//     return { success: false, error: 'No content found' };
//   }
  
//   // Generate transliteration
//   const result = await generateTransliteration(content, poem.language);
  
//   if (result.success) {
//     poem.transliteration = result.transliteration;
//     poem.transliterationMethod = 'auto';
//     await poem.save();
//     console.log(`✨ Auto-transliteration generated for ${poem.title} using ${result.method}`);
//     return { success: true, transliteration: result.transliteration, method: result.method };
//   }
  
//   return { success: false, error: result.error };
// }

// // ============================================
// // BATCH AUTO-TRANSLITERATE
// // ============================================
// export async function batchAutoTransliterate(limit = 100, language = null) {
//   try {
//     const Poem = (await import('../models/Poem.js')).default;
    
//     const query = {
//       $or: [
//         { transliteration: { $exists: false } },
//         { transliteration: '' },
//         { transliteration: null }
//       ]
//     };
    
//     if (language) {
//       query.language = language;
//     }
    
//     const poems = await Poem.find(query).limit(limit);
//     console.log(`Found ${poems.length} poems needing transliteration`);
    
//     const results = [];
//     for (const poem of poems) {
//       const result = await autoTransliteratePoem(poem, true);
//       results.push({
//         poemId: poem._id,
//         title: poem.title,
//         language: poem.language,
//         success: result.success,
//         method: result.method,
//         error: result.error
//       });
//       // Small delay to avoid rate limiting
//       await new Promise(resolve => setTimeout(resolve, 200));
//     }
    
//     return {
//       success: true,
//       total: poems.length,
//       generated: results.filter(r => r.success).length,
//       failed: results.filter(r => !r.success).length,
//       results
//     };
//   } catch (error) {
//     console.error('Batch auto-transliterate error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // TOGGLE AUTO-TRANSLITERATION FOR POEM
// // ============================================
// export async function toggleAutoTransliterate(poemId, enabled) {
//   try {
//     const Poem = (await import('../models/Poem.js')).default;
//     const poem = await Poem.findById(poemId);
    
//     if (!poem) {
//       return { success: false, error: 'Poem not found' };
//     }
    
//     poem.autoTransliterate = enabled;
//     await poem.save();
    
//     console.log(`🔄 Auto-transliteration ${enabled ? 'enabled' : 'disabled'} for ${poem.title}`);
    
//     return { success: true, autoTransliterate: enabled };
//   } catch (error) {
//     console.error('Toggle auto-transliterate error:', error);
//     return { success: false, error: error.message };
//   }
// }

// export default {
//   generateTransliteration,
//   autoTransliteratePoem,
//   batchAutoTransliterate,
//   toggleAutoTransliterate,
//   urduToRoman,
//   hindiToRoman
// };












// // server/services/transliterationService.js
// import axios from 'axios';

// // ============================================
// // COMPLETE URDU TO ROMAN MAPPING
// // ============================================
// const urduToRomanMap = {
//   // Basic letters
//   'ا': 'a', 'آ': 'aa', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ٹ': 't',
//   'ث': 's', 'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh', 'د': 'd',
//   'ڈ': 'd', 'ذ': 'z', 'ر': 'r', 'ڑ': 'r', 'ز': 'z', 'ژ': 'zh',
//   'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z',
//   'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ک': 'k', 'گ': 'g',
//   'ل': 'l', 'م': 'm', 'ن': 'n', 'و': 'o', 'ہ': 'h', 'ھ': 'h',
//   'ء': '', 'ی': 'y', 'ے': 'e', 'ٔ': '', 'ؤ': 'o', 'ئ': 'y',
//   'ۃ': 'h', 'ً': 'an', 'ٌ': 'un', 'ٍ': 'in', 'َ': 'a', 'ُ': 'u',
//   'ِ': 'i', 'ّ': 'dd', 'ْ': '',
  
//   // Common words
//   'ال': 'al', 'الل': 'allah', 'الله': 'allah',
//   'محمد': 'muhammad', 'رسول': 'rasool', 'الرحمن': 'alrehman',
//   'رحیم': 'raheem', 'کریم': 'kareem'
// };

// // ============================================
// // COMPLETE HINDI/DEVANAGARI TO ROMAN MAPPING
// // ============================================
// const hindiToRomanMap = {
//   // Vowels
//   'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo',
//   'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au', 'ऋ': 'ri', 'ॠ': 'ree',
//   'ऌ': 'li', 'ॡ': 'lee', 'अं': 'am', 'अः': 'ah',
  
//   // Consonants
//   'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'ङ': 'nga',
//   'च': 'cha', 'छ': 'chha', 'ज': 'ja', 'झ': 'jha', 'ञ': 'nya',
//   'ट': 'ta', 'ठ': 'tha', 'ड': 'da', 'ढ': 'dha', 'ण': 'na',
//   'त': 'ta', 'थ': 'tha', 'द': 'da', 'ध': 'dha', 'न': 'na',
//   'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma',
//   'य': 'ya', 'र': 'ra', 'ल': 'la', 'व': 'va', 'श': 'sha',
//   'ष': 'sha', 'स': 'sa', 'ह': 'ha', 'क्ष': 'ksh', 'त्र': 'tra',
//   'ज्ञ': 'gya', 'श्र': 'shra',
  
//   // Matras (vowel signs)
//   'ा': 'aa', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo',
//   'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ं': 'n',
//   'ः': 'h', 'ँ': 'n', '़': '', '्': '',
  
//   // Common words
//   'राम': 'ram', 'कृष्ण': 'krishna', 'शिव': 'shiv',
//   'प्रेम': 'prem', 'सत्य': 'satya', 'सुंदर': 'sundar'
// };

// // ============================================
// // RULE-BASED TRANSLITERATION FUNCTIONS
// // ============================================
// export function urduToRoman(text) {
//   if (!text) return '';
  
//   let result = '';
//   let i = 0;
//   const len = text.length;
  
//   while (i < len) {
//     // Check for 4-character combinations
//     if (i + 3 <= len) {
//       const fourChar = text.substring(i, i + 4);
//       if (urduToRomanMap[fourChar]) {
//         result += urduToRomanMap[fourChar];
//         i += 4;
//         continue;
//       }
//     }
    
//     // Check for 3-character combinations
//     if (i + 2 <= len) {
//       const threeChar = text.substring(i, i + 3);
//       if (urduToRomanMap[threeChar]) {
//         result += urduToRomanMap[threeChar];
//         i += 3;
//         continue;
//       }
//     }
    
//     // Check for 2-character combinations
//     if (i + 1 <= len) {
//       const twoChar = text.substring(i, i + 2);
//       if (urduToRomanMap[twoChar]) {
//         result += urduToRomanMap[twoChar];
//         i += 2;
//         continue;
//       }
//     }
    
//     // Single character
//     const char = text[i];
//     result += urduToRomanMap[char] || char;
//     i++;
//   }
  
//   // Clean up the result
//   result = result
//     .replace(/\s+/g, ' ')
//     .replace(/\s+([,.;:!?])/g, '$1')
//     .replace(/([,.!?])(\S)/g, '$1 $2')
//     .trim();
  
//   // Capitalize first letter of each line
//   result = result.split('\n').map(line => 
//     line.charAt(0).toUpperCase() + line.slice(1)
//   ).join('\n');
  
//   return result;
// }

// export function hindiToRoman(text) {
//   if (!text) return '';
  
//   let result = '';
//   let i = 0;
//   const len = text.length;
  
//   while (i < len) {
//     // Check for 4-character combinations
//     if (i + 3 <= len) {
//       const fourChar = text.substring(i, i + 4);
//       if (hindiToRomanMap[fourChar]) {
//         result += hindiToRomanMap[fourChar];
//         i += 4;
//         continue;
//       }
//     }
    
//     // Check for 3-character combinations
//     if (i + 2 <= len) {
//       const threeChar = text.substring(i, i + 3);
//       if (hindiToRomanMap[threeChar]) {
//         result += hindiToRomanMap[threeChar];
//         i += 3;
//         continue;
//       }
//     }
    
//     // Check for 2-character combinations
//     if (i + 1 <= len) {
//       const twoChar = text.substring(i, i + 2);
//       if (hindiToRomanMap[twoChar]) {
//         result += hindiToRomanMap[twoChar];
//         i += 2;
//         continue;
//       }
//     }
    
//     // Single character
//     const char = text[i];
//     result += hindiToRomanMap[char] || char;
//     i++;
//   }
  
//   // Clean up
//   result = result
//     .replace(/\s+/g, ' ')
//     .replace(/\s+([,.;:!?])/g, '$1')
//     .replace(/([,.!?])(\S)/g, '$1 $2')
//     .trim();
  
//   // Capitalize first letter of each line
//   result = result.split('\n').map(line => 
//     line.charAt(0).toUpperCase() + line.slice(1)
//   ).join('\n');
  
//   return result;
// }

// // ============================================
// // GOOGLE TRANSLITERATE API (Enhanced)
// // ============================================
// async function googleTransliterate(text, language) {
//   try {
//     let itc = '';
//     if (language === 'urdu') {
//       itc = 'ur-t-i0-und';
//     } else if (language === 'hindi') {
//       itc = 'hi-t-i0-und';
//     } else {
//       return null;
//     }
    
//     // Split into smaller chunks for better results
//     const chunks = text.match(/.{1,500}/g) || [text];
//     let results = [];
    
//     for (const chunk of chunks) {
//       const url = `https://inputtools.google.com/request?text=${encodeURIComponent(chunk)}&itc=${itc}&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8&app=test`;
//       const response = await axios.get(url, { timeout: 5000 });
      
//       if (response.data && response.data[0] === 'SUCCESS' && response.data[1] && response.data[1][0]) {
//         const transliterated = response.data[1][0][1];
//         if (transliterated && transliterated[0]) {
//           results.push(transliterated[0]);
//         }
//       }
//     }
    
//     return results.join('');
//   } catch (error) {
//     console.log('Google transliterate failed:', error.message);
//     return null;
//   }
// }

// // ============================================
// // MAIN TRANSLITERATION FUNCTION
// // ============================================
// export async function generateTransliteration(text, language = 'urdu', method = 'auto') {
//   if (!text || text.trim().length === 0) {
//     return { success: false, error: 'No text provided' };
//   }
  
//   console.log(`🔄 Generating transliteration for ${language} text...`);
//   console.log(`Original: ${text.substring(0, 100)}...`);
  
//   // For English, return as-is
//   if (language === 'english') {
//     const cleaned = text.replace(/[^\w\s.,!?-]/g, '').trim();
//     return { success: true, transliteration: cleaned, method: 'direct' };
//   }
  
//   let transliteration = null;
//   let usedMethod = 'none';
  
//   // Method 1: Try Google Transliterate API (best quality)
//   if (method === 'auto' || method === 'google') {
//     try {
//       const googleResult = await googleTransliterate(text, language);
//       if (googleResult && googleResult.length > 0) {
//         transliteration = googleResult;
//         usedMethod = 'google-api';
//         console.log('✅ Google transliteration successful');
//       }
//     } catch (error) {
//       console.log('Google transliteration failed, trying fallback...');
//     }
//   }
  
//   // Method 2: Rule-based transliteration (fallback)
//   if (!transliteration) {
//     if (language === 'urdu') {
//       transliteration = urduToRoman(text);
//       usedMethod = 'rule-based-urdu';
//       console.log('📝 Used Urdu rule-based transliteration');
//     } else if (language === 'hindi') {
//       transliteration = hindiToRoman(text);
//       usedMethod = 'rule-based-hindi';
//       console.log('📝 Used Hindi rule-based transliteration');
//     }
//   }
  
//   if (transliteration && transliteration.length > 0) {
//     return {
//       success: true,
//       transliteration: transliteration,
//       method: usedMethod,
//       originalLanguage: language
//     };
//   }
  
//   return {
//     success: false,
//     error: 'Could not generate transliteration',
//     transliteration: text.replace(/[^\w\s]/g, '').trim()
//   };
// }

// // ============================================
// // GET TRANSLITERATION BY SLUG
// // ============================================
// export async function getTransliterationBySlug(slug) {
//   try {
//     const Poem = (await import('../models/Poem.js')).default;
//     const poem = await Poem.findOne({ slug });
    
//     if (!poem) {
//       return { success: false, error: 'Poem not found' };
//     }
    
//     if (poem.transliteration && poem.transliteration.trim().length > 0) {
//       return {
//         success: true,
//         data: poem.transliteration,
//         fromCache: true,
//         language: poem.language,
//         method: poem.transliterationMethod
//       };
//     }
    
//     // Get content based on language
//     let content = '';
//     if (poem.language === 'urdu') {
//       content = poem.contentUrdu || poem.content || '';
//     } else if (poem.language === 'hindi') {
//       content = poem.contentHindi || poem.content || '';
//     } else {
//       content = poem.content || '';
//     }
    
//     const result = await generateTransliteration(content, poem.language);
    
//     if (result.success) {
//       poem.transliteration = result.transliteration;
//       poem.transliterationMethod = result.method;
//       poem.transliterationGeneratedAt = new Date();
//       await poem.save();
//       return {
//         success: true,
//         data: result.transliteration,
//         method: result.method,
//         language: poem.language
//       };
//     }
    
//     return { success: false, error: result.error };
//   } catch (error) {
//     console.error('Get transliteration error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // GENERATE TRANSLITERATION FOR A POEM BY ID
// // ============================================
// export async function generatePoemTransliteration(poemId, force = false) {
//   try {
//     const Poem = (await import('../models/Poem.js')).default;
//     const poem = await Poem.findById(poemId);
    
//     if (!poem) {
//       return { success: false, error: 'Poem not found' };
//     }
    
//     // Check if transliteration already exists and not forced
//     if (!force && poem.transliteration && poem.transliteration.trim().length > 0) {
//       return { 
//         success: true, 
//         transliteration: poem.transliteration,
//         message: 'Transliteration already exists',
//         fromCache: true
//       };
//     }
    
//     // Get content based on language
//     let content = '';
//     if (poem.language === 'urdu') {
//       content = poem.contentUrdu || poem.content || '';
//     } else if (poem.language === 'hindi') {
//       content = poem.contentHindi || poem.content || '';
//     } else {
//       content = poem.content || '';
//     }
    
//     if (!content || content.trim().length === 0) {
//       return { success: false, error: `No content found for ${poem.language} poem` };
//     }
    
//     // Generate transliteration
//     const result = await generateTransliteration(content, poem.language);
    
//     if (result.success) {
//       poem.transliteration = result.transliteration;
//       poem.transliterationMethod = result.method;
//       poem.transliterationGeneratedAt = new Date();
//       await poem.save();
      
//       console.log(`✅ Transliteration saved for ${poem.title} (${poem.language})`);
      
//       return {
//         success: true,
//         transliteration: result.transliteration,
//         method: result.method,
//         saved: true
//       };
//     }
    
//     return result;
//   } catch (error) {
//     console.error('Transliteration generation error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // AUTO-TRANSLITERATE ON POEM SAVE
// // ============================================
// export async function autoTransliteratePoem(poem, force = false) {
//   // Check if auto-transliteration is enabled
//   if (poem.autoTransliterate === false && !force) {
//     console.log(`⏭️ Auto-transliteration disabled for ${poem.title}`);
//     return { success: false, skipped: true };
//   }
  
//   // Check if transliteration already exists and not forced
//   if (!force && poem.transliteration && poem.transliteration.trim().length > 0) {
//     console.log(`✅ Transliteration already exists for ${poem.title}`);
//     return { success: true, fromCache: true, transliteration: poem.transliteration };
//   }
  
//   // Get content based on language
//   let content = '';
//   if (poem.language === 'urdu') {
//     content = poem.contentUrdu || poem.content || '';
//   } else if (poem.language === 'hindi') {
//     content = poem.contentHindi || poem.content || '';
//   } else {
//     content = poem.content || '';
//   }
  
//   if (!content || content.trim().length === 0) {
//     console.log(`⚠️ No content found for ${poem.title}`);
//     return { success: false, error: 'No content found' };
//   }
  
//   // Generate transliteration
//   const result = await generateTransliteration(content, poem.language);
  
//   if (result.success) {
//     poem.transliteration = result.transliteration;
//     poem.transliterationMethod = 'auto';
//     poem.transliterationGeneratedAt = new Date();
//     await poem.save();
//     console.log(`✨ Auto-transliteration generated for ${poem.title} using ${result.method}`);
//     return { success: true, transliteration: result.transliteration, method: result.method };
//   }
  
//   return { success: false, error: result.error };
// }

// // ============================================
// // BATCH GENERATE TRANSLITERATIONS
// // ============================================
// export async function batchGenerateTransliterations(limit = 50, language = null) {
//   try {
//     const Poem = (await import('../models/Poem.js')).default;
    
//     const query = {
//       $or: [
//         { transliteration: { $exists: false } },
//         { transliteration: '' },
//         { transliteration: null }
//       ]
//     };
    
//     if (language && (language === 'urdu' || language === 'hindi')) {
//       query.language = language;
//     } else {
//       query.language = { $in: ['urdu', 'hindi'] };
//     }
    
//     const poems = await Poem.find(query).limit(limit);
//     console.log(`Found ${poems.length} poems needing transliteration`);
    
//     const results = [];
//     for (const poem of poems) {
//       const result = await generatePoemTransliteration(poem._id, true);
//       results.push({
//         poemId: poem._id,
//         title: poem.title,
//         language: poem.language,
//         success: result.success,
//         method: result.method,
//         error: result.error
//       });
//       // Small delay to avoid rate limiting
//       await new Promise(resolve => setTimeout(resolve, 200));
//     }
    
//     return {
//       success: true,
//       total: poems.length,
//       generated: results.filter(r => r.success).length,
//       failed: results.filter(r => !r.success).length,
//       results
//     };
//   } catch (error) {
//     console.error('Batch generate error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // BATCH AUTO-TRANSLITERATE
// // ============================================
// export async function batchAutoTransliterate(limit = 100, language = null) {
//   try {
//     const Poem = (await import('../models/Poem.js')).default;
    
//     const query = {
//       autoTransliterate: true,
//       $or: [
//         { transliteration: { $exists: false } },
//         { transliteration: '' },
//         { transliteration: null }
//       ]
//     };
    
//     if (language && (language === 'urdu' || language === 'hindi')) {
//       query.language = language;
//     } else {
//       query.language = { $in: ['urdu', 'hindi'] };
//     }
    
//     const poems = await Poem.find(query).limit(limit);
//     console.log(`Found ${poems.length} poems needing auto-transliteration`);
    
//     const results = [];
//     for (const poem of poems) {
//       const result = await autoTransliteratePoem(poem, true);
//       results.push({
//         poemId: poem._id,
//         title: poem.title,
//         language: poem.language,
//         success: result.success,
//         method: result.method,
//         error: result.error,
//         skipped: result.skipped
//       });
//       await new Promise(resolve => setTimeout(resolve, 200));
//     }
    
//     return {
//       success: true,
//       total: poems.length,
//       generated: results.filter(r => r.success && !r.skipped).length,
//       failed: results.filter(r => !r.success && !r.skipped).length,
//       skipped: results.filter(r => r.skipped).length,
//       results
//     };
//   } catch (error) {
//     console.error('Batch auto-transliterate error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // TOGGLE AUTO-TRANSLITERATION FOR POEM
// // ============================================
// export async function toggleAutoTransliterate(poemId, enabled) {
//   try {
//     const Poem = (await import('../models/Poem.js')).default;
//     const poem = await Poem.findById(poemId);
    
//     if (!poem) {
//       return { success: false, error: 'Poem not found' };
//     }
    
//     poem.autoTransliterate = enabled;
//     await poem.save();
    
//     console.log(`🔄 Auto-transliteration ${enabled ? 'enabled' : 'disabled'} for ${poem.title}`);
    
//     return { success: true, autoTransliterate: enabled };
//   } catch (error) {
//     console.error('Toggle auto-transliterate error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // GET POEMS NEEDING TRANSLITERATION
// // ============================================
// export async function getPoemsNeedingTransliteration(limit = 50) {
//   try {
//     const Poem = (await import('../models/Poem.js')).default;
//     const thirtyDaysAgo = new Date();
//     thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
//     const poems = await Poem.find({
//       isPublished: true,
//       autoTransliterate: true,
//       language: { $in: ['urdu', 'hindi'] },
//       $or: [
//         { transliteration: { $exists: false } },
//         { transliteration: '' },
//         { transliteration: null },
//         { transliterationGeneratedAt: { $lt: thirtyDaysAgo } }
//       ]
//     })
//     .limit(limit)
//     .populate('author', 'name');
    
//     return poems;
//   } catch (error) {
//     console.error('Get poems needing transliteration error:', error);
//     return [];
//   }
// }

// // ============================================
// // EXPORTS
// // ============================================
// export default {
//   generateTransliteration,
//   getTransliterationBySlug,
//   generatePoemTransliteration,
//   autoTransliteratePoem,
//   batchGenerateTransliterations,
//   batchAutoTransliterate,
//   toggleAutoTransliterate,
//   getPoemsNeedingTransliteration,
//   urduToRoman,
//   hindiToRoman
// };






















// // server/services/transliterationService.js
// import axios from 'axios';

// // ============================================
// // IMPROVED URDU TO ROMAN MAPPING
// // ============================================
// const urduToRomanMap = {
//   // Basic letters
//   'ا': 'a', 'آ': 'aa', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ٹ': 't',
//   'ث': 's', 'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh', 'د': 'd',
//   'ڈ': 'd', 'ذ': 'z', 'ر': 'r', 'ڑ': 'r', 'ز': 'z', 'ژ': 'zh',
//   'س': 's', 'श': 'sh', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't',
//   'ظ': 'z', 'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ک': 'k',
//   'گ': 'g', 'ل': 'l', 'م': 'm', 'न': 'n', 'ن': 'n', 'و': 'o',
//   'ہ': 'h', 'ھ': 'h', 'ء': '', 'ی': 'y', 'ے': 'e', 'ٔ': '',
//   'ؤ': 'o', 'ئ': 'y', 'ۃ': 'h', 'ً': 'an', 'ٌ': 'un', 'ٍ': 'in',
//   'َ': 'a', 'ُ': 'u', 'ِ': 'i', 'ّ': 'dd', 'ْ': '',
  
//   // Common Urdu words
//   'ال': 'al', 'الل': 'allah', 'الله': 'allah',
//   'محمد': 'muhammad', 'رسول': 'rasool', 'الرحمن': 'alrehman',
//   'رحیم': 'raheem', 'کریم': 'kareem', 'علی': 'ali',
//   'حسین': 'hussain', 'حسين': 'hussain', 'کربلا': 'karbala',
//   'امام': 'imam', 'شہید': 'shaheed', 'شهيد': 'shaheed'
// };

// // ============================================
// // IMPROVED HINDI/DEVANAGARI TO ROMAN MAPPING
// // ============================================
// const hindiToRomanMap = {
//   // Vowels
//   'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo',
//   'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au', 'ऋ': 'ri', 'ॠ': 'ree',
//   'ऌ': 'li', 'ॡ': 'lee', 'अं': 'am', 'अः': 'ah',
  
//   // Consonants
//   'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'ङ': 'nga',
//   'च': 'cha', 'छ': 'chha', 'ज': 'ja', 'झ': 'jha', 'ञ': 'nya',
//   'ट': 'ta', 'ठ': 'tha', 'ड': 'da', 'ढ': 'dha', 'ण': 'na',
//   'त': 'ta', 'थ': 'tha', 'द': 'da', 'ध': 'dha', 'न': 'na',
//   'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma',
//   'य': 'ya', 'र': 'ra', 'ल': 'la', 'व': 'va', 'श': 'sha',
//   'ष': 'sha', 'स': 'sa', 'ह': 'ha', 'क्ष': 'ksh', 'त्र': 'tra',
//   'ज्ञ': 'gya', 'श्र': 'shra', 'क्र': 'kra', 'प्र': 'pra',
  
//   // Matras (vowel signs)
//   'ा': 'aa', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo',
//   'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ं': 'n',
//   'ः': 'h', 'ँ': 'n', '़': '', '्': '',
  
//   // Common Hindi words
//   'राम': 'ram', 'कृष्ण': 'krishna', 'शिव': 'shiv',
//   'प्रेम': 'prem', 'सत्य': 'satya', 'सुंदर': 'sundar',
//   'कर्बला': 'karbala', 'हुसैन': 'hussain', 'हुसेन': 'hussain',
//   'इमाम': 'imam', 'शहीद': 'shaheed', 'ज़ैनब': 'zainab',
//   'हक़': 'haq', 'इश्क़': 'ishq', 'वफ़ा': 'wafa',
//   'तक़दीर': 'taqdeer', 'तस्वीर': 'tasveer', 'रौशनी': 'roshni',
//   'अंधेरा': 'andhera', 'अंधेरों': 'andheron', 'रौशनी': 'roshni'
// };

// // ============================================
// // IMPROVED URDU TO ROMAN CONVERSION
// // ============================================
// export function urduToRoman(text) {
//   if (!text) return '';
  
//   let result = '';
//   let i = 0;
//   const len = text.length;
  
//   while (i < len) {
//     // Check for 5-character combinations
//     if (i + 4 <= len) {
//       const fiveChar = text.substring(i, i + 5);
//       if (urduToRomanMap[fiveChar]) {
//         result += urduToRomanMap[fiveChar];
//         i += 5;
//         continue;
//       }
//     }
    
//     // Check for 4-character combinations
//     if (i + 3 <= len) {
//       const fourChar = text.substring(i, i + 4);
//       if (urduToRomanMap[fourChar]) {
//         result += urduToRomanMap[fourChar];
//         i += 4;
//         continue;
//       }
//     }
    
//     // Check for 3-character combinations
//     if (i + 2 <= len) {
//       const threeChar = text.substring(i, i + 3);
//       if (urduToRomanMap[threeChar]) {
//         result += urduToRomanMap[threeChar];
//         i += 3;
//         continue;
//       }
//     }
    
//     // Check for 2-character combinations
//     if (i + 1 <= len) {
//       const twoChar = text.substring(i, i + 2);
//       if (urduToRomanMap[twoChar]) {
//         result += urduToRomanMap[twoChar];
//         i += 2;
//         continue;
//       }
//     }
    
//     // Single character
//     const char = text[i];
//     result += urduToRomanMap[char] || char;
//     i++;
//   }
  
//   // Clean up the result
//   result = result
//     .replace(/\s+/g, ' ')
//     .replace(/\s+([,.;:!?])/g, '$1')
//     .replace(/([,.!?])(\S)/g, '$1 $2')
//     .replace(/aa+/g, 'a')
//     .replace(/ee+/g, 'e')
//     .replace(/oo+/g, 'o')
//     .replace(/ii+/g, 'i')
//     .replace(/uu+/g, 'u')
//     .trim();
  
//   // Capitalize first letter of each line
//   result = result.split('\n').map(line => 
//     line.charAt(0).toUpperCase() + line.slice(1)
//   ).join('\n');
  
//   return result;
// }

// // ============================================
// // IMPROVED HINDI TO ROMAN CONVERSION
// // ============================================
// export function hindiToRoman(text) {
//   if (!text) return '';
  
//   let result = '';
//   let i = 0;
//   const len = text.length;
  
//   while (i < len) {
//     // Check for 5-character combinations
//     if (i + 4 <= len) {
//       const fiveChar = text.substring(i, i + 5);
//       if (hindiToRomanMap[fiveChar]) {
//         result += hindiToRomanMap[fiveChar];
//         i += 5;
//         continue;
//       }
//     }
    
//     // Check for 4-character combinations
//     if (i + 3 <= len) {
//       const fourChar = text.substring(i, i + 4);
//       if (hindiToRomanMap[fourChar]) {
//         result += hindiToRomanMap[fourChar];
//         i += 4;
//         continue;
//       }
//     }
    
//     // Check for 3-character combinations
//     if (i + 2 <= len) {
//       const threeChar = text.substring(i, i + 3);
//       if (hindiToRomanMap[threeChar]) {
//         result += hindiToRomanMap[threeChar];
//         i += 3;
//         continue;
//       }
//     }
    
//     // Check for 2-character combinations
//     if (i + 1 <= len) {
//       const twoChar = text.substring(i, i + 2);
//       if (hindiToRomanMap[twoChar]) {
//         result += hindiToRomanMap[twoChar];
//         i += 2;
//         continue;
//       }
//     }
    
//     // Single character
//     const char = text[i];
//     result += hindiToRomanMap[char] || char;
//     i++;
//   }
  
//   // Post-processing fixes
//   result = result
//     .replace(/khh/g, 'kh')
//     .replace(/ghh/g, 'gh')
//     .replace(/chh/g, 'ch')
//     .replace(/jhh/g, 'jh')
//     .replace(/thh/g, 'th')
//     .replace(/dhh/g, 'dh')
//     .replace(/phh/g, 'ph')
//     .replace(/bhh/g, 'bh')
//     .replace(/kk/g, 'k')
//     .replace(/gg/g, 'g')
//     .replace(/cc/g, 'ch')
//     .replace(/jj/g, 'j')
//     .replace(/tt/g, 't')
//     .replace(/dd/g, 'd')
//     .replace(/pp/g, 'p')
//     .replace(/bb/g, 'b')
//     .replace(/aai/g, 'ai')
//     .replace(/aa/g, 'a')
//     .replace(/ee/g, 'e')
//     .replace(/oo/g, 'o');
  
//   // Clean up spaces and punctuation
//   result = result
//     .replace(/\s+/g, ' ')
//     .replace(/\s+([,.;:!?])/g, '$1')
//     .replace(/([,.!?])(\S)/g, '$1 $2')
//     .trim();
  
//   // Capitalize first letter of each line
//   result = result.split('\n').map(line => {
//     if (line.trim().length === 0) return line;
//     return line.charAt(0).toUpperCase() + line.slice(1);
//   }).join('\n');
  
//   return result;
// }

// // ============================================
// // GOOGLE TRANSLITERATE API (Enhanced)
// // ============================================
// async function googleTransliterate(text, language) {
//   try {
//     let itc = '';
//     if (language === 'urdu') {
//       itc = 'ur-t-i0-und';
//     } else if (language === 'hindi') {
//       itc = 'hi-t-i0-und';
//     } else {
//       return null;
//     }
    
//     // Split into smaller chunks for better results
//     const chunks = text.match(/.{1,500}/g) || [text];
//     let results = [];
    
//     for (const chunk of chunks) {
//       const url = `https://inputtools.google.com/request?text=${encodeURIComponent(chunk)}&itc=${itc}&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8&app=test`;
//       const response = await axios.get(url, { timeout: 5000 });
      
//       if (response.data && response.data[0] === 'SUCCESS' && response.data[1] && response.data[1][0]) {
//         const transliterated = response.data[1][0][1];
//         if (transliterated && transliterated[0]) {
//           results.push(transliterated[0]);
//         }
//       }
//     }
    
//     return results.join('');
//   } catch (error) {
//     console.log('Google transliterate failed:', error.message);
//     return null;
//   }
// }

// // ============================================
// // MAIN TRANSLITERATION FUNCTION
// // ============================================
// export async function generateTransliteration(text, language = 'urdu', method = 'auto') {
//   if (!text || text.trim().length === 0) {
//     return { success: false, error: 'No text provided' };
//   }
  
//   console.log(`🔄 Generating transliteration for ${language} text...`);
//   console.log(`Original length: ${text.length} chars`);
//   console.log(`Original preview: ${text.substring(0, 100)}...`);
  
//   // For English, return as-is
//   if (language === 'english') {
//     const cleaned = text.replace(/[^\w\s.,!?-]/g, '').trim();
//     return { success: true, transliteration: cleaned, method: 'direct' };
//   }
  
//   let transliteration = null;
//   let usedMethod = 'none';
  
//   // Method 1: Try Google Transliterate API (best quality)
//   if (method === 'auto' || method === 'google') {
//     try {
//       console.log('📡 Trying Google transliterate API...');
//       const googleResult = await googleTransliterate(text, language);
//       if (googleResult && googleResult.length > 0) {
//         transliteration = googleResult;
//         usedMethod = 'google-api';
//         console.log('✅ Google transliteration successful');
//       } else {
//         console.log('⚠️ Google returned empty result');
//       }
//     } catch (error) {
//       console.log('❌ Google transliteration failed:', error.message);
//     }
//   }
  
//   // Method 2: Rule-based transliteration (fallback)
//   if (!transliteration || transliteration.length === 0) {
//     console.log('📝 Using rule-based transliteration...');
//     if (language === 'urdu') {
//       transliteration = urduToRoman(text);
//       usedMethod = 'rule-based-urdu';
//       console.log('✅ Urdu rule-based transliteration applied');
//     } else if (language === 'hindi') {
//       transliteration = hindiToRoman(text);
//       usedMethod = 'rule-based-hindi';
//       console.log('✅ Hindi rule-based transliteration applied');
//     }
//   }
  
//   // If still no transliteration, fallback to basic cleaning
//   if (!transliteration || transliteration.length === 0) {
//     console.log('⚠️ Using fallback cleaning...');
//     transliteration = text.replace(/[^\w\s]/g, '').trim();
//     usedMethod = 'cleaning';
//   }
  
//   console.log(`✅ Transliteration generated (${transliteration.length} chars) using ${usedMethod}`);
//   console.log(`Result preview: ${transliteration.substring(0, 100)}...`);
  
//   return {
//     success: true,
//     transliteration: transliteration,
//     method: usedMethod,
//     originalLanguage: language
//   };
// }

// // ============================================
// // GET TRANSLITERATION BY SLUG
// // ============================================
// export async function getTransliterationBySlug(slug) {
//   try {
//     const Poem = (await import('../models/Poem.js')).default;
//     const poem = await Poem.findOne({ slug });
    
//     if (!poem) {
//       return { success: false, error: 'Poem not found' };
//     }
    
//     if (poem.transliteration && poem.transliteration.trim().length > 0) {
//       return {
//         success: true,
//         data: poem.transliteration,
//         fromCache: true,
//         language: poem.language,
//         method: poem.transliterationMethod
//       };
//     }
    
//     // Get content based on language
//     let content = '';
//     if (poem.language === 'urdu') {
//       content = poem.contentUrdu || poem.content || '';
//     } else if (poem.language === 'hindi') {
//       content = poem.contentHindi || poem.content || '';
//     } else {
//       content = poem.content || '';
//     }
    
//     const result = await generateTransliteration(content, poem.language);
    
//     if (result.success) {
//       poem.transliteration = result.transliteration;
//       poem.transliterationMethod = result.method;
//       poem.transliterationGeneratedAt = new Date();
//       await poem.save();
//       return {
//         success: true,
//         data: result.transliteration,
//         method: result.method,
//         language: poem.language
//       };
//     }
    
//     return { success: false, error: result.error };
//   } catch (error) {
//     console.error('Get transliteration error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // GENERATE TRANSLITERATION FOR A POEM BY ID
// // ============================================
// export async function generatePoemTransliteration(poemId, force = false) {
//   try {
//     const Poem = (await import('../models/Poem.js')).default;
//     const poem = await Poem.findById(poemId);
    
//     if (!poem) {
//       return { success: false, error: 'Poem not found' };
//     }
    
//     // Check if transliteration already exists and not forced
//     if (!force && poem.transliteration && poem.transliteration.trim().length > 0) {
//       return { 
//         success: true, 
//         transliteration: poem.transliteration,
//         message: 'Transliteration already exists',
//         fromCache: true
//       };
//     }
    
//     // Get content based on language
//     let content = '';
//     if (poem.language === 'urdu') {
//       content = poem.contentUrdu || poem.content || '';
//     } else if (poem.language === 'hindi') {
//       content = poem.contentHindi || poem.content || '';
//     } else {
//       content = poem.content || '';
//     }
    
//     if (!content || content.trim().length === 0) {
//       return { success: false, error: `No content found for ${poem.language} poem` };
//     }
    
//     // Generate transliteration
//     const result = await generateTransliteration(content, poem.language);
    
//     if (result.success) {
//       poem.transliteration = result.transliteration;
//       poem.transliterationMethod = result.method;
//       poem.transliterationGeneratedAt = new Date();
//       await poem.save();
      
//       console.log(`✅ Transliteration saved for ${poem.title} (${poem.language})`);
//       console.log(`   Method: ${result.method}`);
//       console.log(`   Length: ${result.transliteration.length} chars`);
      
//       return {
//         success: true,
//         transliteration: result.transliteration,
//         method: result.method,
//         saved: true
//       };
//     }
    
//     return result;
//   } catch (error) {
//     console.error('Transliteration generation error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // AUTO-TRANSLITERATE ON POEM SAVE
// // ============================================
// export async function autoTransliteratePoem(poem, force = false) {
//   // Check if auto-transliteration is enabled
//   if (poem.autoTransliterate === false && !force) {
//     console.log(`⏭️ Auto-transliteration disabled for ${poem.title}`);
//     return { success: false, skipped: true };
//   }
  
//   // Check if transliteration already exists and not forced
//   if (!force && poem.transliteration && poem.transliteration.trim().length > 0) {
//     console.log(`✅ Transliteration already exists for ${poem.title}`);
//     return { success: true, fromCache: true, transliteration: poem.transliteration };
//   }
  
//   // Get content based on language
//   let content = '';
//   if (poem.language === 'urdu') {
//     content = poem.contentUrdu || poem.content || '';
//   } else if (poem.language === 'hindi') {
//     content = poem.contentHindi || poem.content || '';
//   } else {
//     content = poem.content || '';
//   }
  
//   if (!content || content.trim().length === 0) {
//     console.log(`⚠️ No content found for ${poem.title}`);
//     return { success: false, error: 'No content found' };
//   }
  
//   // Generate transliteration
//   const result = await generateTransliteration(content, poem.language);
  
//   if (result.success) {
//     poem.transliteration = result.transliteration;
//     poem.transliterationMethod = 'auto';
//     poem.transliterationGeneratedAt = new Date();
//     await poem.save();
//     console.log(`✨ Auto-transliteration generated for ${poem.title} using ${result.method}`);
//     return { success: true, transliteration: result.transliteration, method: result.method };
//   }
  
//   return { success: false, error: result.error };
// }

// // ============================================
// // BATCH GENERATE TRANSLITERATIONS
// // ============================================
// export async function batchGenerateTransliterations(limit = 50, language = null) {
//   try {
//     const Poem = (await import('../models/Poem.js')).default;
    
//     const query = {
//       $or: [
//         { transliteration: { $exists: false } },
//         { transliteration: '' },
//         { transliteration: null }
//       ]
//     };
    
//     if (language && (language === 'urdu' || language === 'hindi')) {
//       query.language = language;
//     } else {
//       query.language = { $in: ['urdu', 'hindi'] };
//     }
    
//     const poems = await Poem.find(query).limit(limit);
//     console.log(`Found ${poems.length} poems needing transliteration`);
    
//     const results = [];
//     for (const poem of poems) {
//       const result = await generatePoemTransliteration(poem._id, true);
//       results.push({
//         poemId: poem._id,
//         title: poem.title,
//         language: poem.language,
//         success: result.success,
//         method: result.method,
//         error: result.error
//       });
//       // Small delay to avoid rate limiting
//       await new Promise(resolve => setTimeout(resolve, 200));
//     }
    
//     return {
//       success: true,
//       total: poems.length,
//       generated: results.filter(r => r.success).length,
//       failed: results.filter(r => !r.success).length,
//       results
//     };
//   } catch (error) {
//     console.error('Batch generate error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // BATCH AUTO-TRANSLITERATE
// // ============================================
// export async function batchAutoTransliterate(limit = 100, language = null) {
//   try {
//     const Poem = (await import('../models/Poem.js')).default;
    
//     const query = {
//       autoTransliterate: true,
//       $or: [
//         { transliteration: { $exists: false } },
//         { transliteration: '' },
//         { transliteration: null }
//       ]
//     };
    
//     if (language && (language === 'urdu' || language === 'hindi')) {
//       query.language = language;
//     } else {
//       query.language = { $in: ['urdu', 'hindi'] };
//     }
    
//     const poems = await Poem.find(query).limit(limit);
//     console.log(`Found ${poems.length} poems needing auto-transliteration`);
    
//     const results = [];
//     for (const poem of poems) {
//       const result = await autoTransliteratePoem(poem, true);
//       results.push({
//         poemId: poem._id,
//         title: poem.title,
//         language: poem.language,
//         success: result.success,
//         method: result.method,
//         error: result.error,
//         skipped: result.skipped
//       });
//       await new Promise(resolve => setTimeout(resolve, 200));
//     }
    
//     return {
//       success: true,
//       total: poems.length,
//       generated: results.filter(r => r.success && !r.skipped).length,
//       failed: results.filter(r => !r.success && !r.skipped).length,
//       skipped: results.filter(r => r.skipped).length,
//       results
//     };
//   } catch (error) {
//     console.error('Batch auto-transliterate error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // TOGGLE AUTO-TRANSLITERATION FOR POEM
// // ============================================
// export async function toggleAutoTransliterate(poemId, enabled) {
//   try {
//     const Poem = (await import('../models/Poem.js')).default;
//     const poem = await Poem.findById(poemId);
    
//     if (!poem) {
//       return { success: false, error: 'Poem not found' };
//     }
    
//     poem.autoTransliterate = enabled;
//     await poem.save();
    
//     console.log(`🔄 Auto-transliteration ${enabled ? 'enabled' : 'disabled'} for ${poem.title}`);
    
//     return { success: true, autoTransliterate: enabled };
//   } catch (error) {
//     console.error('Toggle auto-transliterate error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // GET POEMS NEEDING TRANSLITERATION
// // ============================================
// export async function getPoemsNeedingTransliteration(limit = 50) {
//   try {
//     const Poem = (await import('../models/Poem.js')).default;
//     const thirtyDaysAgo = new Date();
//     thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
//     const poems = await Poem.find({
//       isPublished: true,
//       autoTransliterate: true,
//       language: { $in: ['urdu', 'hindi'] },
//       $or: [
//         { transliteration: { $exists: false } },
//         { transliteration: '' },
//         { transliteration: null },
//         { transliterationGeneratedAt: { $lt: thirtyDaysAgo } }
//       ]
//     })
//     .limit(limit)
//     .populate('author', 'name');
    
//     return poems;
//   } catch (error) {
//     console.error('Get poems needing transliteration error:', error);
//     return [];
//   }
// }

// // ============================================
// // TEST FUNCTION FOR HINDI TRANSLITERATION
// // ============================================
// export function testHindiTransliteration() {
//   const testText = `कर्बला की रेत पे खून की लकीर है,
// हर कदम पे सब्र की एक नई तस्वीर है।
// प्यास की तपिश में भी लब पे दुआ रही,
// हुसैन का ये ही अंदाज़-ए-तक़दीर है।`;
  
//   console.log('\n🧪 Testing Hindi Transliteration:');
//   console.log('Original:', testText);
//   const result = hindiToRoman(testText);
//   console.log('Transliterated:', result);
//   return result;
// }

// // ============================================
// // EXPORTS
// // ============================================
// export default {
//   generateTransliteration,
//   getTransliterationBySlug,
//   generatePoemTransliteration,
//   autoTransliteratePoem,
//   batchGenerateTransliterations,
//   batchAutoTransliterate,
//   toggleAutoTransliterate,
//   getPoemsNeedingTransliteration,
//   urduToRoman,
//   hindiToRoman,
//   testHindiTransliteration
// };

















// // server/services/transliterationService.js
// import axios from 'axios';

// // ============================================
// // COMPLETE HINDI/DEVANAGARI TO ROMAN MAPPING
// // ============================================
// const hindiToRomanMap = {
//   // Vowels
//   'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo',
//   'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au', 'ऋ': 'ri', 'ॠ': 'ree',
//   'ऌ': 'li', 'ॡ': 'lee', 'अं': 'am', 'अः': 'ah',
  
//   // Consonants - Velar
//   'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'ङ': 'nga',
//   'क्': 'k', 'ख्': 'kh', 'ग्': 'g', 'घ्': 'gh',
  
//   // Palatal
//   'च': 'cha', 'छ': 'chha', 'ज': 'ja', 'झ': 'jha', 'ञ': 'nya',
//   'च्': 'ch', 'छ्': 'chh', 'ज्': 'j', 'झ्': 'jh',
  
//   // Retroflex
//   'ट': 'ta', 'ठ': 'tha', 'ड': 'da', 'ढ': 'dha', 'ण': 'na',
//   'ट्': 't', 'ठ्': 'th', 'ड्': 'd', 'ढ्': 'dh',
  
//   // Dental
//   'त': 'ta', 'थ': 'tha', 'द': 'da', 'ध': 'dha', 'न': 'na',
//   'त्': 't', 'थ्': 'th', 'द्': 'd', 'ध्': 'dh', 'न्': 'n',
  
//   // Labial
//   'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma',
//   'प्': 'p', 'फ्': 'ph', 'ब्': 'b', 'भ्': 'bh', 'म्': 'm',
  
//   // Semivowels
//   'य': 'ya', 'र': 'ra', 'ल': 'la', 'व': 'va',
//   'य्': 'y', 'र्': 'r', 'ल्': 'l', 'व्': 'v',
  
//   // Sibilants and Fricatives
//   'श': 'sha', 'ष': 'sha', 'स': 'sa', 'ह': 'ha',
//   'श्': 'sh', 'ष्': 'sh', 'स्': 's', 'ह्': 'h',
  
//   // Conjuncts
//   'क्ष': 'ksh', 'त्र': 'tra', 'ज्ञ': 'gya', 'श्र': 'shra',
//   'क्र': 'kra', 'प्र': 'pra', 'ग्र': 'gra', 'द्र': 'dra',
//   'द्व': 'dva', 'ह्र': 'hra', 'म्न': 'mna', 'त्न': 'tna',
//   'क्क': 'kka', 'च्च': 'chcha', 'ट्ट': 'tta', 'प्प': 'ppa',
  
//   // Matras (vowel signs)
//   'ा': 'aa', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo',
//   'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ं': 'n',
//   'ः': 'h', 'ँ': 'n', '़': '', '्': '',
  
//   // Numbers
//   '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
//   '५': '5', '६': '6', '७': '7', '८': '8', '९': '9',
  
//   // Common words for better conversion
//   'कर्बला': 'karbala', 'हुसैन': 'hussain', 'हुसेन': 'hussain',
//   'इमाम': 'imam', 'शहीद': 'shaheed', 'ज़ैनब': 'zainab',
//   'हक़': 'haq', 'इश्क़': 'ishq', 'वफ़ा': 'wafa',
//   'तक़दीर': 'taqdeer', 'तस्वीर': 'tasveer', 'रौशनी': 'roshni',
//   'अंधेरा': 'andhera', 'अंधेरों': 'andheron', 'सब्र': 'sabr',
//   'प्यास': 'pyaas', 'तपिश': 'tapish', 'दुआ': 'dua',
//   'लकीर': 'lakeer', 'कदम': 'kadam', 'रेत': 'ret',
//   'खून': 'khoon', 'अंदाज़': 'andaaz', 'पैग़ाम': 'paigam'
// };

// // ============================================
// // COMPLETE URDU TO ROMAN MAPPING
// // ============================================
// const urduToRomanMap = {
//   // Basic letters
//   'ا': 'a', 'آ': 'aa', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ٹ': 't',
//   'ث': 's', 'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh', 'د': 'd',
//   'ڈ': 'd', 'ذ': 'z', 'ر': 'r', 'ڑ': 'r', 'ز': 'z', 'ژ': 'zh',
//   'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z',
//   'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ک': 'k', 'گ': 'g',
//   'ل': 'l', 'م': 'm', 'ن': 'n', 'و': 'o', 'ہ': 'h', 'ھ': 'h',
//   'ء': '', 'ی': 'y', 'ے': 'e', 'ٔ': '', 'ؤ': 'o', 'ئ': 'y',
//   'ۃ': 'h', 'ً': 'an', 'ٌ': 'un', 'ٍ': 'in', 'َ': 'a', 'ُ': 'u',
//   'ِ': 'i', 'ّ': 'dd', 'ْ': '',
  
//   // Common Urdu words
//   'ال': 'al', 'الل': 'allah', 'الله': 'allah',
//   'محمد': 'muhammad', 'رسول': 'rasool', 'الرحمن': 'alrehman',
//   'رحیم': 'raheem', 'کریم': 'kareem', 'علی': 'ali',
//   'حسین': 'hussain', 'حسين': 'hussain', 'کربلا': 'karbala',
//   'امام': 'imam', 'شہید': 'shaheed', 'شهيد': 'shaheed'
// };

// // ============================================
// // IMPROVED HINDI TO ROMAN CONVERSION (Rule-based)
// // ============================================
// export function hindiToRoman(text) {
//   if (!text) return '';
  
//   console.log('📝 Converting Hindi Devanagari to Roman script...');
  
//   let result = '';
//   let i = 0;
//   const len = text.length;
  
//   while (i < len) {
//     let matched = false;
    
//     // Check for 6-character combinations
//     if (i + 5 <= len) {
//       const sixChar = text.substring(i, i + 6);
//       if (hindiToRomanMap[sixChar]) {
//         result += hindiToRomanMap[sixChar];
//         i += 6;
//         matched = true;
//         continue;
//       }
//     }
    
//     // Check for 5-character combinations
//     if (!matched && i + 4 <= len) {
//       const fiveChar = text.substring(i, i + 5);
//       if (hindiToRomanMap[fiveChar]) {
//         result += hindiToRomanMap[fiveChar];
//         i += 5;
//         matched = true;
//         continue;
//       }
//     }
    
//     // Check for 4-character combinations
//     if (!matched && i + 3 <= len) {
//       const fourChar = text.substring(i, i + 4);
//       if (hindiToRomanMap[fourChar]) {
//         result += hindiToRomanMap[fourChar];
//         i += 4;
//         matched = true;
//         continue;
//       }
//     }
    
//     // Check for 3-character combinations
//     if (!matched && i + 2 <= len) {
//       const threeChar = text.substring(i, i + 3);
//       if (hindiToRomanMap[threeChar]) {
//         result += hindiToRomanMap[threeChar];
//         i += 3;
//         matched = true;
//         continue;
//       }
//     }
    
//     // Check for 2-character combinations
//     if (!matched && i + 1 <= len) {
//       const twoChar = text.substring(i, i + 2);
//       if (hindiToRomanMap[twoChar]) {
//         result += hindiToRomanMap[twoChar];
//         i += 2;
//         matched = true;
//         continue;
//       }
//     }
    
//     // Single character
//     if (!matched) {
//       const char = text[i];
//       result += hindiToRomanMap[char] || char;
//       i++;
//     }
//   }
  
//   // Post-processing fixes for better readability
//   result = result
//     // Fix duplicate/overlapping vowels
//     .replace(/aa+/g, 'a')
//     .replace(/ee+/g, 'e')
//     .replace(/oo+/g, 'o')
//     .replace(/ii+/g, 'i')
//     .replace(/uu+/g, 'u')
//     // Fix consonant clusters
//     .replace(/khh/g, 'kh')
//     .replace(/ghh/g, 'gh')
//     .replace(/chh/g, 'ch')
//     .replace(/jhh/g, 'jh')
//     .replace(/thh/g, 'th')
//     .replace(/dhh/g, 'dh')
//     .replace(/phh/g, 'ph')
//     .replace(/bhh/g, 'bh')
//     // Remove duplicate consonants
//     .replace(/kk/g, 'k')
//     .replace(/gg/g, 'g')
//     .replace(/cc/g, 'ch')
//     .replace(/jj/g, 'j')
//     .replace(/tt/g, 't')
//     .replace(/dd/g, 'd')
//     .replace(/pp/g, 'p')
//     .replace(/bb/g, 'b')
//     // Special fixes
//     .replace(/aai/g, 'ai')
//     .replace(/auu/g, 'au')
//     // Fix spaces and punctuation
//     .replace(/\s+/g, ' ')
//     .replace(/\s+([,.;:!?।॥])/g, '$1')
//     .replace(/([,.;:!?।॥])(\S)/g, '$1 $2')
//     .trim();
  
//   // Capitalize first letter of each line/sentence
//   result = result.split(/[।\n]/).map(line => {
//     line = line.trim();
//     if (line.length === 0) return line;
//     return line.charAt(0).toUpperCase() + line.slice(1);
//   }).join('.\n');
  
//   // Clean up multiple dots
//   result = result.replace(/\.\.+/g, '.');
  
//   console.log(`✅ Roman conversion complete (${result.length} chars)`);
  
//   return result;
// }

// // ============================================
// // URDU TO ROMAN CONVERSION
// // ============================================
// export function urduToRoman(text) {
//   if (!text) return '';
  
//   console.log('📝 Converting Urdu Nastaliq to Roman script...');
  
//   let result = '';
//   let i = 0;
//   const len = text.length;
  
//   while (i < len) {
//     let matched = false;
    
//     // Check for 4-character combinations
//     if (i + 3 <= len) {
//       const fourChar = text.substring(i, i + 4);
//       if (urduToRomanMap[fourChar]) {
//         result += urduToRomanMap[fourChar];
//         i += 4;
//         matched = true;
//         continue;
//       }
//     }
    
//     // Check for 3-character combinations
//     if (!matched && i + 2 <= len) {
//       const threeChar = text.substring(i, i + 3);
//       if (urduToRomanMap[threeChar]) {
//         result += urduToRomanMap[threeChar];
//         i += 3;
//         matched = true;
//         continue;
//       }
//     }
    
//     // Check for 2-character combinations
//     if (!matched && i + 1 <= len) {
//       const twoChar = text.substring(i, i + 2);
//       if (urduToRomanMap[twoChar]) {
//         result += urduToRomanMap[twoChar];
//         i += 2;
//         matched = true;
//         continue;
//       }
//     }
    
//     // Single character
//     if (!matched) {
//       const char = text[i];
//       result += urduToRomanMap[char] || char;
//       i++;
//     }
//   }
  
//   // Clean up the result
//   result = result
//     .replace(/\s+/g, ' ')
//     .replace(/\s+([,.;:!?])/g, '$1')
//     .replace(/([,.!?])(\S)/g, '$1 $2')
//     .replace(/aa+/g, 'a')
//     .replace(/ee+/g, 'e')
//     .replace(/oo+/g, 'o')
//     .trim();
  
//   // Capitalize first letter of each line
//   result = result.split('\n').map(line => 
//     line.charAt(0).toUpperCase() + line.slice(1)
//   ).join('\n');
  
//   console.log(`✅ Urdu to Roman conversion complete (${result.length} chars)`);
  
//   return result;
// }

// // ============================================
// // MAIN TRANSLITERATION FUNCTION
// // ============================================
// export async function generateTransliteration(text, language = 'urdu') {
//   if (!text || text.trim().length === 0) {
//     return { success: false, error: 'No text provided' };
//   }
  
//   console.log(`🔄 Generating transliteration for ${language} text...`);
//   console.log(`Original length: ${text.length} chars`);
//   console.log(`Original preview: ${text.substring(0, 100)}...`);
  
//   let transliteration = '';
//   let usedMethod = '';
  
//   // For English, return as-is
//   if (language === 'english') {
//     transliteration = text.replace(/[^\w\s.,!?-]/g, '').trim();
//     usedMethod = 'direct';
//   } 
//   // For Hindi, use rule-based conversion
//   else if (language === 'hindi') {
//     transliteration = hindiToRoman(text);
//     usedMethod = 'rule-based-hindi';
//   } 
//   // For Urdu, use rule-based conversion
//   else if (language === 'urdu') {
//     transliteration = urduToRoman(text);
//     usedMethod = 'rule-based-urdu';
//   }
  
//   if (transliteration && transliteration.length > 0) {
//     console.log(`✅ Transliteration generated (${transliteration.length} chars) using ${usedMethod}`);
//     console.log(`Result preview: ${transliteration.substring(0, 100)}...`);
    
//     return {
//       success: true,
//       transliteration: transliteration,
//       method: usedMethod,
//       originalLanguage: language
//     };
//   }
  
//   return {
//     success: false,
//     error: 'Could not generate transliteration',
//     transliteration: text.replace(/[^\w\s]/g, '').trim()
//   };
// }

// // ============================================
// // GET TRANSLITERATION BY SLUG
// // ============================================
// export async function getTransliterationBySlug(slug) {
//   try {
//     const Poem = (await import('../models/Poem.js')).default;
//     const poem = await Poem.findOne({ slug });
    
//     if (!poem) {
//       return { success: false, error: 'Poem not found' };
//     }
    
//     if (poem.transliteration && poem.transliteration.trim().length > 0) {
//       return {
//         success: true,
//         data: poem.transliteration,
//         fromCache: true,
//         language: poem.language,
//         method: poem.transliterationMethod
//       };
//     }
    
//     // Get content based on language
//     let content = '';
//     if (poem.language === 'urdu') {
//       content = poem.contentUrdu || poem.content || '';
//     } else if (poem.language === 'hindi') {
//       content = poem.contentHindi || poem.content || '';
//     } else {
//       content = poem.content || '';
//     }
    
//     const result = await generateTransliteration(content, poem.language);
    
//     if (result.success) {
//       poem.transliteration = result.transliteration;
//       poem.transliterationMethod = result.method;
//       poem.transliterationGeneratedAt = new Date();
//       await poem.save();
//       return {
//         success: true,
//         data: result.transliteration,
//         method: result.method,
//         language: poem.language
//       };
//     }
    
//     return { success: false, error: result.error };
//   } catch (error) {
//     console.error('Get transliteration error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // GENERATE TRANSLITERATION FOR A POEM BY ID
// // ============================================
// export async function generatePoemTransliteration(poemId, force = false) {
//   try {
//     const Poem = (await import('../models/Poem.js')).default;
//     const poem = await Poem.findById(poemId);
    
//     if (!poem) {
//       return { success: false, error: 'Poem not found' };
//     }
    
//     // Check if transliteration already exists and not forced
//     if (!force && poem.transliteration && poem.transliteration.trim().length > 0) {
//       return { 
//         success: true, 
//         transliteration: poem.transliteration,
//         message: 'Transliteration already exists',
//         fromCache: true
//       };
//     }
    
//     // Get content based on language
//     let content = '';
//     if (poem.language === 'urdu') {
//       content = poem.contentUrdu || poem.content || '';
//     } else if (poem.language === 'hindi') {
//       content = poem.contentHindi || poem.content || '';
//     } else {
//       content = poem.content || '';
//     }
    
//     if (!content || content.trim().length === 0) {
//       return { success: false, error: `No content found for ${poem.language} poem` };
//     }
    
//     // Generate transliteration
//     const result = await generateTransliteration(content, poem.language);
    
//     if (result.success) {
//       poem.transliteration = result.transliteration;
//       poem.transliterationMethod = result.method;
//       poem.transliterationGeneratedAt = new Date();
//       await poem.save();
      
//       console.log(`✅ Transliteration saved for ${poem.title} (${poem.language})`);
//       console.log(`   Method: ${result.method}`);
      
//       return {
//         success: true,
//         transliteration: result.transliteration,
//         method: result.method,
//         saved: true
//       };
//     }
    
//     return result;
//   } catch (error) {
//     console.error('Transliteration generation error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // AUTO-TRANSLITERATE ON POEM SAVE
// // ============================================
// export async function autoTransliteratePoem(poem, force = false) {
//   // Check if auto-transliteration is enabled
//   if (poem.autoTransliterate === false && !force) {
//     console.log(`⏭️ Auto-transliteration disabled for ${poem.title}`);
//     return { success: false, skipped: true };
//   }
  
//   // Check if transliteration already exists and not forced
//   if (!force && poem.transliteration && poem.transliteration.trim().length > 0) {
//     console.log(`✅ Transliteration already exists for ${poem.title}`);
//     return { success: true, fromCache: true, transliteration: poem.transliteration };
//   }
  
//   // Get content based on language
//   let content = '';
//   if (poem.language === 'urdu') {
//     content = poem.contentUrdu || poem.content || '';
//   } else if (poem.language === 'hindi') {
//     content = poem.contentHindi || poem.content || '';
//   } else {
//     content = poem.content || '';
//   }
  
//   if (!content || content.trim().length === 0) {
//     console.log(`⚠️ No content found for ${poem.title}`);
//     return { success: false, error: 'No content found' };
//   }
  
//   // Generate transliteration
//   const result = await generateTransliteration(content, poem.language);
  
//   if (result.success) {
//     poem.transliteration = result.transliteration;
//     poem.transliterationMethod = 'auto';
//     poem.transliterationGeneratedAt = new Date();
//     await poem.save();
//     console.log(`✨ Auto-transliteration generated for ${poem.title} using ${result.method}`);
//     return { success: true, transliteration: result.transliteration, method: result.method };
//   }
  
//   return { success: false, error: result.error };
// }

// // ============================================
// // BATCH GENERATE TRANSLITERATIONS
// // ============================================
// export async function batchGenerateTransliterations(limit = 50, language = null) {
//   try {
//     const Poem = (await import('../models/Poem.js')).default;
    
//     const query = {
//       $or: [
//         { transliteration: { $exists: false } },
//         { transliteration: '' },
//         { transliteration: null }
//       ]
//     };
    
//     if (language && (language === 'urdu' || language === 'hindi')) {
//       query.language = language;
//     } else {
//       query.language = { $in: ['urdu', 'hindi'] };
//     }
    
//     const poems = await Poem.find(query).limit(limit);
//     console.log(`Found ${poems.length} poems needing transliteration`);
    
//     const results = [];
//     for (const poem of poems) {
//       const result = await generatePoemTransliteration(poem._id, true);
//       results.push({
//         poemId: poem._id,
//         title: poem.title,
//         language: poem.language,
//         success: result.success,
//         method: result.method,
//         error: result.error
//       });
//       await new Promise(resolve => setTimeout(resolve, 200));
//     }
    
//     return {
//       success: true,
//       total: poems.length,
//       generated: results.filter(r => r.success).length,
//       failed: results.filter(r => !r.success).length,
//       results
//     };
//   } catch (error) {
//     console.error('Batch generate error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // BATCH AUTO-TRANSLITERATE
// // ============================================
// export async function batchAutoTransliterate(limit = 100, language = null) {
//   try {
//     const Poem = (await import('../models/Poem.js')).default;
    
//     const query = {
//       autoTransliterate: true,
//       $or: [
//         { transliteration: { $exists: false } },
//         { transliteration: '' },
//         { transliteration: null }
//       ]
//     };
    
//     if (language && (language === 'urdu' || language === 'hindi')) {
//       query.language = language;
//     } else {
//       query.language = { $in: ['urdu', 'hindi'] };
//     }
    
//     const poems = await Poem.find(query).limit(limit);
//     console.log(`Found ${poems.length} poems needing auto-transliteration`);
    
//     const results = [];
//     for (const poem of poems) {
//       const result = await autoTransliteratePoem(poem, true);
//       results.push({
//         poemId: poem._id,
//         title: poem.title,
//         language: poem.language,
//         success: result.success,
//         method: result.method,
//         error: result.error,
//         skipped: result.skipped
//       });
//       await new Promise(resolve => setTimeout(resolve, 200));
//     }
    
//     return {
//       success: true,
//       total: poems.length,
//       generated: results.filter(r => r.success && !r.skipped).length,
//       failed: results.filter(r => !r.success && !r.skipped).length,
//       skipped: results.filter(r => r.skipped).length,
//       results
//     };
//   } catch (error) {
//     console.error('Batch auto-transliterate error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // TOGGLE AUTO-TRANSLITERATION FOR POEM
// // ============================================
// export async function toggleAutoTransliterate(poemId, enabled) {
//   try {
//     const Poem = (await import('../models/Poem.js')).default;
//     const poem = await Poem.findById(poemId);
    
//     if (!poem) {
//       return { success: false, error: 'Poem not found' };
//     }
    
//     poem.autoTransliterate = enabled;
//     await poem.save();
    
//     console.log(`🔄 Auto-transliteration ${enabled ? 'enabled' : 'disabled'} for ${poem.title}`);
    
//     return { success: true, autoTransliterate: enabled };
//   } catch (error) {
//     console.error('Toggle auto-transliterate error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // GET POEMS NEEDING TRANSLITERATION
// // ============================================
// export async function getPoemsNeedingTransliteration(limit = 50) {
//   try {
//     const Poem = (await import('../models/Poem.js')).default;
//     const thirtyDaysAgo = new Date();
//     thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
//     const poems = await Poem.find({
//       isPublished: true,
//       autoTransliterate: true,
//       language: { $in: ['urdu', 'hindi'] },
//       $or: [
//         { transliteration: { $exists: false } },
//         { transliteration: '' },
//         { transliteration: null },
//         { transliterationGeneratedAt: { $lt: thirtyDaysAgo } }
//       ]
//     })
//     .limit(limit)
//     .populate('author', 'name');
    
//     return poems;
//   } catch (error) {
//     console.error('Get poems needing transliteration error:', error);
//     return [];
//   }
// }

// // ============================================
// // TEST FUNCTION
// // ============================================
// export function testHindiTransliteration() {
//   const testText = `कर्बला की रेत पे खून की लकीर है,
// हर कदम पे सब्र की एक नई तस्वीर है।
// प्यास की तपिश में भी लब पे दुआ रही,
// हुसैन का ये ही अंदाज़-ए-तक़दीर है।`;
  
//   console.log('\n🧪 Testing Hindi Transliteration:');
//   console.log('Original:', testText);
//   const result = hindiToRoman(testText);
//   console.log('Transliterated:', result);
//   return result;
// }

// // ============================================
// // EXPORTS
// // ============================================
// export default {
//   generateTransliteration,
//   getTransliterationBySlug,
//   generatePoemTransliteration,
//   autoTransliteratePoem,
//   batchGenerateTransliterations,
//   batchAutoTransliterate,
//   toggleAutoTransliterate,
//   getPoemsNeedingTransliteration,
//   urduToRoman,
//   hindiToRoman,
//   testHindiTransliteration
// };



















// server/services/transliterationService.js
import { smartTransliterate, addToCorpus, testSmartEngine as testEngine } from './smartTransliterationEngine.js';
import Poem from '../models/Poem.js';

// ============================================
// MAIN TRANSLITERATION FUNCTION (Using Smart Engine)
// ============================================
export async function generateTransliteration(text, language = 'urdu') {
  if (!text || text.trim().length === 0) {
    return { success: false, error: 'No text provided', transliteration: '' };
  }
  
  console.log(`🔄 Generating transliteration using Smart Engine...`);
  console.log(`📝 Original text length: ${text.length} chars`);
  console.log(`📝 Original preview: ${text.substring(0, 100)}...`);
  
  // Use the smart transliteration engine
  const result = smartTransliterate(text, language);
  
  if (result.success) {
    console.log(`✅ Transliteration successful using ${result.method}`);
    console.log(`📄 Result preview: ${result.transliteration.substring(0, 100)}...`);
    
    return {
      success: true,
      transliteration: result.transliteration,
      method: result.method,
      originalLanguage: result.language,
      stats: result.stats
    };
  }
  
  // Fallback: basic cleaning
  const fallback = text.replace(/[^\w\s]/g, '').trim();
  console.log(`⚠️ Smart engine failed, using fallback cleaning`);
  
  return {
    success: true,
    transliteration: fallback,
    method: 'fallback-cleaning',
    originalLanguage: language,
    error: result.error
  };
}

// ============================================
// GET TRANSLITERATION BY SLUG
// ============================================
export async function getTransliterationBySlug(slug) {
  try {
    const poem = await Poem.findOne({ slug });
    
    if (!poem) {
      return { success: false, error: 'Poem not found' };
    }
    
    // If transliteration already exists in database, return it
    if (poem.transliteration && poem.transliteration.trim().length > 0) {
      console.log(`✅ Using cached transliteration for ${poem.title}`);
      return {
        success: true,
        data: poem.transliteration,
        fromCache: true,
        language: poem.language,
        method: poem.transliterationMethod
      };
    }
    
    // Get content based on poem language
    let content = '';
    if (poem.language === 'urdu') {
      content = poem.contentUrdu || poem.content || '';
    } else if (poem.language === 'hindi') {
      content = poem.contentHindi || poem.content || '';
    } else {
      content = poem.content || '';
    }
    
    if (!content || content.trim().length === 0) {
      return { success: false, error: `No content found for ${poem.language} poem` };
    }
    
    // Generate transliteration using smart engine
    const result = await generateTransliteration(content, poem.language);
    
    if (result.success) {
      // Save to database for future requests
      poem.transliteration = result.transliteration;
      poem.transliterationMethod = result.method;
      poem.transliterationGeneratedAt = new Date();
      await poem.save();
      
      console.log(`💾 Transliteration saved for ${poem.title}`);
      
      return {
        success: true,
        data: result.transliteration,
        method: result.method,
        language: poem.language,
        fromCache: false,
        stats: result.stats
      };
    }
    
    return { success: false, error: result.error };
  } catch (error) {
    console.error('Get transliteration error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// GENERATE TRANSLITERATION FOR A POEM BY ID
// ============================================
export async function generatePoemTransliteration(poemId, force = false) {
  try {
    const poem = await Poem.findById(poemId);
    
    if (!poem) {
      return { success: false, error: 'Poem not found' };
    }
    
    // Check if transliteration already exists and not forced
    if (!force && poem.transliteration && poem.transliteration.trim().length > 0) {
      console.log(`✅ Transliteration already exists for ${poem.title}`);
      return { 
        success: true, 
        transliteration: poem.transliteration,
        message: 'Transliteration already exists',
        fromCache: true,
        method: poem.transliterationMethod
      };
    }
    
    // Get content based on language
    let content = '';
    if (poem.language === 'urdu') {
      content = poem.contentUrdu || poem.content || '';
    } else if (poem.language === 'hindi') {
      content = poem.contentHindi || poem.content || '';
    } else {
      content = poem.content || '';
    }
    
    if (!content || content.trim().length === 0) {
      return { success: false, error: `No content found for ${poem.language} poem` };
    }
    
    // Generate transliteration using smart engine
    const result = await generateTransliteration(content, poem.language);
    
    if (result.success) {
      poem.transliteration = result.transliteration;
      poem.transliterationMethod = result.method;
      poem.transliterationGeneratedAt = new Date();
      await poem.save();
      
      console.log(`✅ Transliteration generated and saved for ${poem.title}`);
      console.log(`   Method: ${result.method}`);
      console.log(`   Length: ${result.transliteration.length} chars`);
      
      return {
        success: true,
        transliteration: result.transliteration,
        method: result.method,
        saved: true,
        stats: result.stats
      };
    }
    
    return result;
  } catch (error) {
    console.error('Transliteration generation error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// AUTO-TRANSLITERATE ON POEM SAVE
// ============================================
export async function autoTransliteratePoem(poem, force = false) {
  // Check if auto-transliteration is enabled
  if (poem.autoTransliterate === false && !force) {
    console.log(`⏭️ Auto-transliteration disabled for ${poem.title}`);
    return { success: false, skipped: true };
  }
  
  // Check if transliteration already exists and not forced
  if (!force && poem.transliteration && poem.transliteration.trim().length > 0) {
    console.log(`✅ Transliteration already exists for ${poem.title}`);
    return { success: true, fromCache: true, transliteration: poem.transliteration };
  }
  
  // Get content based on language
  let content = '';
  if (poem.language === 'urdu') {
    content = poem.contentUrdu || poem.content || '';
  } else if (poem.language === 'hindi') {
    content = poem.contentHindi || poem.content || '';
  } else {
    content = poem.content || '';
  }
  
  if (!content || content.trim().length === 0) {
    console.log(`⚠️ No content found for ${poem.title}`);
    return { success: false, error: 'No content found' };
  }
  
  // Generate transliteration using smart engine
  const result = await generateTransliteration(content, poem.language);
  
  if (result.success) {
    poem.transliteration = result.transliteration;
    poem.transliterationMethod = 'auto';
    poem.transliterationGeneratedAt = new Date();
    await poem.save();
    
    console.log(`✨ Auto-transliteration generated for ${poem.title}`);
    console.log(`   Method: ${result.method}`);
    
    return { 
      success: true, 
      transliteration: result.transliteration, 
      method: result.method,
      stats: result.stats
    };
  }
  
  return { success: false, error: result.error };
}

// ============================================
// BATCH GENERATE TRANSLITERATIONS
// ============================================
export async function batchGenerateTransliterations(limit = 50, language = null) {
  try {
    const query = {
      $or: [
        { transliteration: { $exists: false } },
        { transliteration: '' },
        { transliteration: null }
      ]
    };
    
    if (language && (language === 'urdu' || language === 'hindi')) {
      query.language = language;
    } else {
      query.language = { $in: ['urdu', 'hindi'] };
    }
    
    const poems = await Poem.find(query).limit(limit);
    console.log(`📚 Found ${poems.length} poems needing transliteration`);
    
    const results = [];
    for (const poem of poems) {
      console.log(`\n🔄 Processing: ${poem.title}`);
      const result = await generatePoemTransliteration(poem._id, true);
      results.push({
        poemId: poem._id,
        title: poem.title,
        language: poem.language,
        success: result.success,
        method: result.method,
        error: result.error,
        stats: result.stats
      });
      // Small delay to avoid overwhelming the system
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    const generated = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    
    console.log(`\n📊 Batch complete: ${generated} generated, ${failed} failed`);
    
    return {
      success: true,
      total: poems.length,
      generated: generated,
      failed: failed,
      results
    };
  } catch (error) {
    console.error('Batch generate error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// BATCH AUTO-TRANSLITERATE
// ============================================
export async function batchAutoTransliterate(limit = 100, language = null) {
  try {
    const query = {
      autoTransliterate: true,
      $or: [
        { transliteration: { $exists: false } },
        { transliteration: '' },
        { transliteration: null }
      ]
    };
    
    if (language && (language === 'urdu' || language === 'hindi')) {
      query.language = language;
    } else {
      query.language = { $in: ['urdu', 'hindi'] };
    }
    
    const poems = await Poem.find(query).limit(limit);
    console.log(`📚 Found ${poems.length} poems needing auto-transliteration`);
    
    const results = [];
    for (const poem of poems) {
      console.log(`\n🔄 Auto-transliterating: ${poem.title}`);
      const result = await autoTransliteratePoem(poem, true);
      results.push({
        poemId: poem._id,
        title: poem.title,
        language: poem.language,
        success: result.success,
        method: result.method,
        error: result.error,
        skipped: result.skipped,
        stats: result.stats
      });
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    const generated = results.filter(r => r.success && !r.skipped).length;
    const failed = results.filter(r => !r.success && !r.skipped).length;
    const skipped = results.filter(r => r.skipped).length;
    
    console.log(`\n📊 Batch auto-transliteration complete: ${generated} generated, ${failed} failed, ${skipped} skipped`);
    
    return {
      success: true,
      total: poems.length,
      generated: generated,
      failed: failed,
      skipped: skipped,
      results
    };
  } catch (error) {
    console.error('Batch auto-transliterate error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// TOGGLE AUTO-TRANSLITERATION FOR POEM
// ============================================
export async function toggleAutoTransliterate(poemId, enabled) {
  try {
    const poem = await Poem.findById(poemId);
    
    if (!poem) {
      return { success: false, error: 'Poem not found' };
    }
    
    poem.autoTransliterate = enabled;
    await poem.save();
    
    console.log(`🔄 Auto-transliteration ${enabled ? 'enabled' : 'disabled'} for ${poem.title}`);
    
    return { success: true, autoTransliterate: enabled };
  } catch (error) {
    console.error('Toggle auto-transliterate error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// GET POEMS NEEDING TRANSLITERATION
// ============================================
export async function getPoemsNeedingTransliteration(limit = 50) {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const poems = await Poem.find({
      isPublished: true,
      autoTransliterate: true,
      language: { $in: ['urdu', 'hindi'] },
      $or: [
        { transliteration: { $exists: false } },
        { transliteration: '' },
        { transliteration: null },
        { transliterationGeneratedAt: { $lt: thirtyDaysAgo } }
      ]
    })
    .limit(limit)
    .populate('author', 'name');
    
    return poems;
  } catch (error) {
    console.error('Get poems needing transliteration error:', error);
    return [];
  }
}

// ============================================
// ADD CUSTOM WORD TO CORPUS (Dynamic Learning)
// ============================================
export async function addCustomTransliteration(word, transliteration, language = 'hindi') {
  const result = addToCorpus(word, transliteration, language);
  if (result) {
    console.log(`📚 Added custom transliteration: ${word} → ${transliteration}`);
    return { success: true, word, transliteration };
  }
  return { success: false, error: 'Failed to add to corpus' };
}

// ============================================
// TEST THE SMART ENGINE
// ============================================
export function testSmartEngine() {
  return testEngine();
}

// ============================================
// GET TRANSLITERATION STATISTICS
// ============================================
export async function getTransliterationStats() {
  try {
    const totalPoems = await Poem.countDocuments();
    const poemsWithTransliteration = await Poem.countDocuments({
      transliteration: { $exists: true, $ne: '' }
    });
    const autoTransliterateEnabled = await Poem.countDocuments({
      autoTransliterate: true
    });
    
    const byLanguage = await Poem.aggregate([
      {
        $group: {
          _id: '$language',
          total: { $sum: 1 },
          withTransliteration: {
            $sum: {
              $cond: [
                { $and: [
                  { $ne: ['$transliteration', null] },
                  { $ne: ['$transliteration', ''] }
                ] },
                1,
                0
              ]
            }
          },
          autoEnabled: {
            $sum: {
              $cond: [{ $eq: ['$autoTransliterate', true] }, 1, 0]
            }
          }
        }
      }
    ]);
    
    const byMethod = await Poem.aggregate([
      {
        $match: {
          transliterationMethod: { $exists: true, $ne: '' }
        }
      },
      {
        $group: {
          _id: '$transliterationMethod',
          count: { $sum: 1 }
        }
      }
    ]);
    
    return {
      success: true,
      stats: {
        totalPoems,
        poemsWithTransliteration,
        poemsWithoutTransliteration: totalPoems - poemsWithTransliteration,
        autoTransliterateEnabled,
        completionRate: totalPoems > 0 ? ((poemsWithTransliteration / totalPoems) * 100).toFixed(1) : 0,
        byLanguage,
        byMethod
      }
    };
  } catch (error) {
    console.error('Get transliteration stats error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// DELETE TRANSLITERATION FOR A POEM
// ============================================
export async function deletePoemTransliteration(poemId) {
  try {
    const poem = await Poem.findById(poemId);
    if (!poem) {
      return { success: false, error: 'Poem not found' };
    }
    
    poem.transliteration = '';
    poem.transliterationMethod = '';
    poem.transliterationGeneratedAt = null;
    await poem.save();
    
    console.log(`🗑️ Deleted transliteration for ${poem.title}`);
    
    return { success: true, message: 'Transliteration deleted successfully' };
  } catch (error) {
    console.error('Delete transliteration error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// EXPORTS
// ============================================
export default {
  generateTransliteration,
  getTransliterationBySlug,
  generatePoemTransliteration,
  autoTransliteratePoem,
  batchGenerateTransliterations,
  batchAutoTransliterate,
  toggleAutoTransliterate,
  getPoemsNeedingTransliteration,
  addCustomTransliteration,
  getTransliterationStats,
  deletePoemTransliteration,
  testSmartEngine
};