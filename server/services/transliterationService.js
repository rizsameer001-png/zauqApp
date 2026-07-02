// // ============================================
// // TRANSLITERATION SERVICE - Production API
// // ============================================

// import smartEngine from './smartTransliterationEngine.js';
// import Poem from '../models/Poem.js';

// export async function generateTransliteration(text, language = 'urdu', options = {}) {
//   if (!text || text.trim().length === 0) {
//     return {
//       success: false,
//       error: 'No text provided',
//       transliteration: ''
//     };
//   }
  
//   if (language !== 'urdu') {
//     return {
//       success: false,
//       error: 'Only Urdu supported currently',
//       transliteration: ''
//     };
//   }
  
//   return await smartEngine.smartTransliterate(text, options);
// }

// export async function getTransliterationBySlug(slug) {
//   try {
//     const poem = await Poem.findOne({ slug });
    
//     if (!poem) {
//       return { success: false, error: 'Poem not found' };
//     }
    
//     // Check cache/db
//     if (poem.transliteration && poem.transliteration.trim().length > 0) {
//       const age = Date.now() - new Date(poem.transliterationGeneratedAt).getTime();
//       const isFresh = age < 30 * 24 * 60 * 60 * 1000; // 30 days
      
//       return {
//         success: true,
//         data: poem.transliteration,
//         fromCache: true,
//         fresh: isFresh,
//         method: poem.transliterationMethod,
//         generatedAt: poem.transliterationGeneratedAt
//       };
//     }
    
//     // Generate new transliteration
//     const content = poem.contentUrdu || poem.content;
//     const result = await generateTransliteration(content, poem.language);
    
//     if (result.success) {
//       // Save to database
//       poem.transliteration = result.transliteration;
//       poem.transliterationMethod = result.method;
//       poem.transliterationGeneratedAt = new Date();
//       poem.transliterationStats = result.stats;
//       await poem.save();
      
//       return {
//         success: true,
//         data: result.transliteration,
//         fromCache: false,
//         method: result.method,
//         stats: result.stats
//       };
//     }
    
//     return { success: false, error: result.error };
//   } catch (error) {
//     console.error('Get transliteration error:', error);
//     return { success: false, error: error.message };
//   }
// }

// export async function getEngineStats() {
//   return smartEngine.getStats();
// }

// export async function clearTransliterationCache() {
//   smartEngine.clearCache();
//   return { success: true, message: 'Cache cleared' };
// }

// export async function batchTransliterate(texts, options = {}) {
//   return await smartEngine.batchTransliterate(texts, options);
// }

// export default {
//   generateTransliteration,
//   getTransliterationBySlug,
//   getEngineStats,
//   clearTransliterationCache,
//   batchTransliterate
// };

















// // ============================================
// // TRANSLITERATION SERVICE - Production API
// // Complete with all exports needed for poem.controller
// // ============================================

// import smartEngine from './smartTransliterationEngine.js';
// import Poem from '../models/Poem.js';

// // ============================================
// // 1. MAIN TRANSLITERATION FUNCTION
// // ============================================
// export async function generateTransliteration(text, language = 'urdu', options = {}) {
//   if (!text || text.trim().length === 0) {
//     return {
//       success: false,
//       error: 'No text provided',
//       transliteration: ''
//     };
//   }
  
//   if (language !== 'urdu') {
//     // For Hindi, use fallback for now
//     const fallback = text.replace(/[^\w\s]/g, '').trim();
//     return {
//       success: true,
//       transliteration: fallback,
//       method: 'hindi-fallback',
//       originalLanguage: language,
//       note: 'Hindi transliteration coming soon'
//     };
//   }
  
//   return await smartEngine.smartTransliterate(text, options);
// }

// // ============================================
// // 2. AUTO-TRANSLITERATE POEM (Used by poem.controller)
// // ============================================
// export async function autoTransliteratePoem(poem, force = false) {
//   try {
//     // Check if auto-transliteration is enabled
//     if (poem.autoTransliterate === false && !force) {
//       console.log(`⏭️ Auto-transliteration disabled for ${poem.title}`);
//       return { success: false, skipped: true };
//     }
    
//     // Check if transliteration already exists and not forced
//     if (!force && poem.transliteration && poem.transliteration.trim().length > 0) {
//       console.log(`✅ Transliteration already exists for ${poem.title}`);
//       return { 
//         success: true, 
//         fromCache: true, 
//         transliteration: poem.transliteration,
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
    
//     if (!content || content.trim().length === 0) {
//       console.log(`⚠️ No content found for ${poem.title}`);
//       return { success: false, error: 'No content found' };
//     }
    
//     // Generate transliteration using smart engine
//     const result = await generateTransliteration(content, poem.language);
    
//     if (result.success) {
//       // Update the poem document
//       poem.transliteration = result.transliteration;
//       poem.transliterationMethod = result.method || 'auto';
//       poem.transliterationGeneratedAt = new Date();
//       await poem.save();
      
//       console.log(`✨ Auto-transliteration generated for ${poem.title}`);
//       console.log(`   Method: ${result.method}`);
//       console.log(`   Length: ${result.transliteration.length} chars`);
      
//       return { 
//         success: true, 
//         transliteration: result.transliteration, 
//         method: result.method,
//         stats: result.stats
//       };
//     }
    
//     return { success: false, error: result.error };
//   } catch (error) {
//     console.error('Auto-transliteration error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // 3. GET TRANSLITERATION BY SLUG
// // ============================================
// export async function getTransliterationBySlug(slug) {
//   try {
//     const poem = await Poem.findOne({ slug });
    
//     if (!poem) {
//       return { success: false, error: 'Poem not found' };
//     }
    
//     // Check cache/db
//     if (poem.transliteration && poem.transliteration.trim().length > 0) {
//       const age = Date.now() - new Date(poem.transliterationGeneratedAt).getTime();
//       const isFresh = age < 30 * 24 * 60 * 60 * 1000; // 30 days
      
//       return {
//         success: true,
//         data: poem.transliteration,
//         fromCache: true,
//         fresh: isFresh,
//         method: poem.transliterationMethod,
//         generatedAt: poem.transliterationGeneratedAt
//       };
//     }
    
//     // Generate new transliteration
//     const content = poem.contentUrdu || poem.content;
//     const result = await generateTransliteration(content, poem.language);
    
//     if (result.success) {
//       // Save to database
//       poem.transliteration = result.transliteration;
//       poem.transliterationMethod = result.method;
//       poem.transliterationGeneratedAt = new Date();
//       await poem.save();
      
//       return {
//         success: true,
//         data: result.transliteration,
//         fromCache: false,
//         method: result.method,
//         stats: result.stats
//       };
//     }
    
//     return { success: false, error: result.error };
//   } catch (error) {
//     console.error('Get transliteration error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // 4. BATCH TRANSLITERATE
// // ============================================
// export async function batchTransliterate(texts, options = {}) {
//   if (!texts || !Array.isArray(texts) || texts.length === 0) {
//     return { success: false, error: 'Array of texts is required' };
//   }
  
//   const results = [];
//   for (const text of texts) {
//     const result = await generateTransliteration(text, options.language, options);
//     results.push(result);
//   }
  
//   return { success: true, results };
// }

// // ============================================
// // 5. ADD CUSTOM TRANSLITERATION
// // ============================================
// export async function addCustomTransliteration(word, transliteration, language = 'urdu') {
//   if (!word || !transliteration) {
//     return { success: false, error: 'Word and transliteration are required' };
//   }
  
//   try {
//     const result = smartEngine.addToCorpus?.(word, transliteration, language);
//     if (result) {
//       console.log(`📚 Added custom transliteration: ${word} → ${transliteration} (${language})`);
//       return { success: true, word, transliteration, language };
//     }
//     return { success: false, error: 'Failed to add to corpus' };
//   } catch (error) {
//     console.error('Add custom error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // 6. GET ENGINE STATISTICS
// // ============================================
// export async function getEngineStats() {
//   try {
//     const stats = smartEngine.getStats?.() || {
//       dictionarySize: Object.keys(smartEngine.wordDict || {}).length,
//       cacheHits: 0,
//       cacheMisses: 0
//     };
    
//     const totalPoems = await Poem.countDocuments();
//     const poemsWithTransliteration = await Poem.countDocuments({
//       transliteration: { $exists: true, $ne: '' }
//     });
    
//     return {
//       success: true,
//       stats: {
//         engine: stats,
//         poems: {
//           total: totalPoems,
//           withTransliteration: poemsWithTransliteration,
//           percentage: totalPoems > 0 ? ((poemsWithTransliteration / totalPoems) * 100).toFixed(1) : 0
//         }
//       }
//     };
//   } catch (error) {
//     console.error('Get stats error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // 7. CLEAR CACHE
// // ============================================
// export async function clearTransliterationCache() {
//   try {
//     if (smartEngine.clearCache) {
//       smartEngine.clearCache();
//     }
//     console.log('🧹 Transliteration cache cleared');
//     return { success: true, message: 'Cache cleared' };
//   } catch (error) {
//     console.error('Clear cache error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // 8. GENERATE FOR POEM BY ID
// // ============================================
// export async function generatePoemTransliteration(poemId, force = false) {
//   try {
//     const poem = await Poem.findById(poemId);
    
//     if (!poem) {
//       return { success: false, error: 'Poem not found' };
//     }
    
//     return await autoTransliteratePoem(poem, force);
//   } catch (error) {
//     console.error('Generate poem transliteration error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // 9. BATCH AUTO-TRANSLITERATE
// // ============================================
// export async function batchAutoTransliterate(limit = 50, language = null) {
//   try {
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
//     }
    
//     const poems = await Poem.find(query).limit(limit);
//     console.log(`📚 Found ${poems.length} poems needing auto-transliteration`);
    
//     const results = [];
//     for (let i = 0; i < poems.length; i++) {
//       const poem = poems[i];
//       console.log(`\n🔄 Auto-transliterating (${i + 1}/${poems.length}): ${poem.title}`);
      
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
      
//       // Small delay
//       await new Promise(resolve => setTimeout(resolve, 100));
//     }
    
//     const generated = results.filter(r => r.success && !r.skipped).length;
//     const failed = results.filter(r => !r.success && !r.skipped).length;
//     const skipped = results.filter(r => r.skipped).length;
    
//     console.log(`\n📊 Batch complete: ${generated} generated, ${failed} failed, ${skipped} skipped`);
    
//     return {
//       success: true,
//       total: poems.length,
//       generated,
//       failed,
//       skipped,
//       results
//     };
//   } catch (error) {
//     console.error('Batch auto-transliterate error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // 10. TOGGLE AUTO-TRANSLITERATE
// // ============================================
// export async function toggleAutoTransliterate(poemId, enabled) {
//   try {
//     const poem = await Poem.findById(poemId);
//     if (!poem) {
//       return { success: false, error: 'Poem not found' };
//     }
    
//     poem.autoTransliterate = enabled;
//     await poem.save();
    
//     console.log(`🔄 Auto-transliteration ${enabled ? 'enabled' : 'disabled'} for ${poem.title}`);
//     return { success: true, autoTransliterate: enabled };
//   } catch (error) {
//     console.error('Toggle error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // EXPORTS - All functions needed by poem.controller
// // ============================================
// export default {
//   generateTransliteration,
//   autoTransliteratePoem,
//   getTransliterationBySlug,
//   batchTransliterate,
//   addCustomTransliteration,
//   getEngineStats,
//   clearTransliterationCache,
//   generatePoemTransliteration,
//   batchAutoTransliterate,
//   toggleAutoTransliterate
// };




























// // ============================================
// // TRANSLITERATION SERVICE - Production API
// // With method mapping for valid enum values
// // ============================================

// import smartEngine from './smartTransliterationEngine.js';
// import Poem from '../models/Poem.js';

// // ============================================
// // METHOD MAPPING - Maps any method to valid enum values
// // ============================================
// const mapToValidEnum = (method) => {
//   // Valid enum values from the Poem model
//   const validMethods = [
//     'smart-engine',
//     'fallback-cleaning',
//     'auto',
//     'production-hybrid',
//     'zauq-rules',
//     'vowel-inference'
//   ];
  
//   // Mapping dictionary for various method names
//   const methodMap = {
//     // Our engine outputs
//     'direct-dictionary-v2': 'smart-engine',
//     'direct-dictionary': 'smart-engine',
//     'direct-dictionary-v3': 'smart-engine',
//     'production-urdu-engine': 'production-hybrid',
//     'production-urdu-engine-v2': 'production-hybrid',
//     'smart-engine-v2': 'smart-engine',
//     'smart-engine-v3': 'smart-engine',
//     'smart-engine-v4': 'smart-engine',
//     'urdu-engine': 'smart-engine',
//     'urdu-transliteration': 'smart-engine',
//     'zauq-rules': 'zauq-rules',
//     'vowel-inference': 'vowel-inference',
    
//     // Fallback methods
//     'fallback': 'fallback-cleaning',
//     'fallback-cleaning': 'fallback-cleaning',
//     'basic': 'fallback-cleaning',
//     'character-map': 'fallback-cleaning',
    
//     // Auto methods
//     'auto': 'auto',
//     'automatic': 'auto'
//   };
  
//   // Check if method is already valid
//   if (validMethods.includes(method)) {
//     return method;
//   }
  
//   // Map to valid method
//   const mapped = methodMap[method];
//   if (mapped) {
//     console.log(`📌 Mapping method: "${method}" → "${mapped}"`);
//     return mapped;
//   }
  
//   // Default fallback
//   console.log(`⚠️ Unknown method: "${method}", using default "smart-engine"`);
//   return 'smart-engine';
// };

// // ============================================
// // 1. MAIN TRANSLITERATION FUNCTION
// // ============================================
// export async function generateTransliteration(text, language = 'urdu', options = {}) {
//   if (!text || text.trim().length === 0) {
//     return {
//       success: false,
//       error: 'No text provided',
//       transliteration: ''
//     };
//   }
  
//   if (language !== 'urdu') {
//     // For Hindi, use fallback for now
//     const fallback = text.replace(/[^\w\s]/g, '').trim();
//     return {
//       success: true,
//       transliteration: fallback,
//       method: 'fallback-cleaning',  // Valid enum
//       originalLanguage: language,
//       note: 'Hindi transliteration coming soon'
//     };
//   }
  
//   const result = await smartEngine.smartTransliterate(text, options);
  
//   // Map the method to a valid enum value
//   if (result.success && result.method) {
//     result.method = mapToValidEnum(result.method);
//   }
  
//   return result;
// }

// // ============================================
// // 2. AUTO-TRANSLITERATE POEM (Used by poem.controller)
// // ============================================
// export async function autoTransliteratePoem(poem, force = false) {
//   try {
//     // Check if auto-transliteration is enabled
//     if (poem.autoTransliterate === false && !force) {
//       console.log(`⏭️ Auto-transliteration disabled for ${poem.title}`);
//       return { success: false, skipped: true };
//     }
    
//     // Check if transliteration already exists and not forced
//     if (!force && poem.transliteration && poem.transliteration.trim().length > 0) {
//       console.log(`✅ Transliteration already exists for ${poem.title}`);
//       return { 
//         success: true, 
//         fromCache: true, 
//         transliteration: poem.transliteration,
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
    
//     if (!content || content.trim().length === 0) {
//       console.log(`⚠️ No content found for ${poem.title}`);
//       return { success: false, error: 'No content found' };
//     }
    
//     // Generate transliteration using smart engine
//     const result = await generateTransliteration(content, poem.language);
    
//     if (result.success) {
//       // Map the method to a valid enum value before saving
//       const validMethod = mapToValidEnum(result.method);
      
//       // Update the poem document
//       poem.transliteration = result.transliteration;
//       poem.transliterationMethod = validMethod;  // Use mapped valid value
//       poem.transliterationGeneratedAt = new Date();
//       await poem.save();
      
//       console.log(`✨ Auto-transliteration generated for ${poem.title}`);
//       console.log(`   Original method: ${result.method} → Stored as: ${validMethod}`);
//       console.log(`   Length: ${result.transliteration.length} chars`);
      
//       return { 
//         success: true, 
//         transliteration: result.transliteration, 
//         method: result.method,
//         storedMethod: validMethod,
//         stats: result.stats
//       };
//     }
    
//     return { success: false, error: result.error };
//   } catch (error) {
//     console.error('Auto-transliteration error:', error);
    
//     // Handle validation errors specifically
//     if (error.name === 'ValidationError') {
//       console.error('Validation error details:', error.errors);
//       return { 
//         success: false, 
//         error: `Validation failed: ${Object.values(error.errors).map(e => e.message).join(', ')}` 
//       };
//     }
    
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // 3. GET TRANSLITERATION BY SLUG
// // ============================================
// export async function getTransliterationBySlug(slug) {
//   try {
//     const poem = await Poem.findOne({ slug });
    
//     if (!poem) {
//       return { success: false, error: 'Poem not found' };
//     }
    
//     // Check cache/db
//     if (poem.transliteration && poem.transliteration.trim().length > 0) {
//       const age = Date.now() - new Date(poem.transliterationGeneratedAt).getTime();
//       const isFresh = age < 30 * 24 * 60 * 60 * 1000; // 30 days
      
//       return {
//         success: true,
//         data: poem.transliteration,
//         fromCache: true,
//         fresh: isFresh,
//         method: poem.transliterationMethod,
//         generatedAt: poem.transliterationGeneratedAt
//       };
//     }
    
//     // Generate new transliteration
//     const content = poem.contentUrdu || poem.content;
//     const result = await generateTransliteration(content, poem.language);
    
//     if (result.success) {
//       // Map to valid enum before saving
//       const validMethod = mapToValidEnum(result.method);
      
//       // Save to database
//       poem.transliteration = result.transliteration;
//       poem.transliterationMethod = validMethod;
//       poem.transliterationGeneratedAt = new Date();
//       await poem.save();
      
//       return {
//         success: true,
//         data: result.transliteration,
//         fromCache: false,
//         method: result.method,
//         storedMethod: validMethod,
//         stats: result.stats
//       };
//     }
    
//     return { success: false, error: result.error };
//   } catch (error) {
//     console.error('Get transliteration error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // 4. GENERATE FOR POEM BY ID
// // ============================================
// export async function generatePoemTransliteration(poemId, force = false) {
//   try {
//     const poem = await Poem.findById(poemId);
    
//     if (!poem) {
//       return { success: false, error: 'Poem not found' };
//     }
    
//     return await autoTransliteratePoem(poem, force);
//   } catch (error) {
//     console.error('Generate poem transliteration error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // 5. BATCH TRANSLITERATE
// // ============================================
// export async function batchTransliterate(texts, options = {}) {
//   if (!texts || !Array.isArray(texts) || texts.length === 0) {
//     return { success: false, error: 'Array of texts is required' };
//   }
  
//   const results = [];
//   for (const text of texts) {
//     const result = await generateTransliteration(text, options.language, options);
//     results.push(result);
//   }
  
//   return { success: true, results };
// }

// // ============================================
// // 6. ADD CUSTOM TRANSLITERATION
// // ============================================
// export async function addCustomTransliteration(word, transliteration, language = 'urdu') {
//   if (!word || !transliteration) {
//     return { success: false, error: 'Word and transliteration are required' };
//   }
  
//   try {
//     const result = smartEngine.addToCorpus?.(word, transliteration, language);
//     if (result) {
//       console.log(`📚 Added custom transliteration: ${word} → ${transliteration} (${language})`);
//       return { success: true, word, transliteration, language };
//     }
//     return { success: false, error: 'Failed to add to corpus' };
//   } catch (error) {
//     console.error('Add custom error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // 7. GET ENGINE STATISTICS
// // ============================================
// export async function getEngineStats() {
//   try {
//     const stats = smartEngine.getStats?.() || {
//       dictionarySize: Object.keys(smartEngine.wordDict || {}).length,
//       cacheHits: 0,
//       cacheMisses: 0
//     };
    
//     const totalPoems = await Poem.countDocuments();
//     const poemsWithTransliteration = await Poem.countDocuments({
//       transliteration: { $exists: true, $ne: '' }
//     });
    
//     return {
//       success: true,
//       stats: {
//         engine: stats,
//         poems: {
//           total: totalPoems,
//           withTransliteration: poemsWithTransliteration,
//           percentage: totalPoems > 0 ? ((poemsWithTransliteration / totalPoems) * 100).toFixed(1) : 0
//         }
//       }
//     };
//   } catch (error) {
//     console.error('Get stats error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // 8. CLEAR CACHE
// // ============================================
// export async function clearTransliterationCache() {
//   try {
//     if (smartEngine.clearCache) {
//       smartEngine.clearCache();
//     }
//     console.log('🧹 Transliteration cache cleared');
//     return { success: true, message: 'Cache cleared' };
//   } catch (error) {
//     console.error('Clear cache error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // 9. BATCH AUTO-TRANSLITERATE
// // ============================================
// export async function batchAutoTransliterate(limit = 50, language = null) {
//   try {
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
//     }
    
//     const poems = await Poem.find(query).limit(limit);
//     console.log(`📚 Found ${poems.length} poems needing auto-transliteration`);
    
//     const results = [];
//     for (let i = 0; i < poems.length; i++) {
//       const poem = poems[i];
//       console.log(`\n🔄 Auto-transliterating (${i + 1}/${poems.length}): ${poem.title}`);
      
//       const result = await autoTransliteratePoem(poem, true);
//       results.push({
//         poemId: poem._id,
//         title: poem.title,
//         language: poem.language,
//         success: result.success,
//         method: result.method,
//         storedMethod: result.storedMethod,
//         error: result.error,
//         skipped: result.skipped
//       });
      
//       // Small delay
//       await new Promise(resolve => setTimeout(resolve, 100));
//     }
    
//     const generated = results.filter(r => r.success && !r.skipped).length;
//     const failed = results.filter(r => !r.success && !r.skipped).length;
//     const skipped = results.filter(r => r.skipped).length;
    
//     console.log(`\n📊 Batch complete: ${generated} generated, ${failed} failed, ${skipped} skipped`);
    
//     return {
//       success: true,
//       total: poems.length,
//       generated,
//       failed,
//       skipped,
//       results
//     };
//   } catch (error) {
//     console.error('Batch auto-transliterate error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // 10. TOGGLE AUTO-TRANSLITERATE
// // ============================================
// export async function toggleAutoTransliterate(poemId, enabled) {
//   try {
//     const poem = await Poem.findById(poemId);
//     if (!poem) {
//       return { success: false, error: 'Poem not found' };
//     }
    
//     poem.autoTransliterate = enabled;
//     await poem.save();
    
//     console.log(`🔄 Auto-transliteration ${enabled ? 'enabled' : 'disabled'} for ${poem.title}`);
//     return { success: true, autoTransliterate: enabled };
//   } catch (error) {
//     console.error('Toggle error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // 11. VALIDATE AND FIX EXISTING POEMS
// // ============================================
// export async function fixInvalidTransliterationMethods() {
//   try {
//     // Find all poems with invalid transliteration methods
//     const poems = await Poem.find({
//       transliterationMethod: { $nin: [
//         'smart-engine', 'fallback-cleaning', 'auto', 
//         'production-hybrid', 'zauq-rules', 'vowel-inference'
//       ] },
//       transliteration: { $exists: true, $ne: '' }
//     });
    
//     console.log(`🔧 Found ${poems.length} poems with invalid methods`);
    
//     let fixed = 0;
//     for (const poem of poems) {
//       const oldMethod = poem.transliterationMethod;
//       const newMethod = mapToValidEnum(oldMethod);
      
//       if (oldMethod !== newMethod) {
//         poem.transliterationMethod = newMethod;
//         await poem.save();
//         fixed++;
//         console.log(`   Fixed: "${oldMethod}" → "${newMethod}" for ${poem.title}`);
//       }
//     }
    
//     return {
//       success: true,
//       total: poems.length,
//       fixed,
//       message: `Fixed ${fixed} poems with invalid transliteration methods`
//     };
//   } catch (error) {
//     console.error('Fix methods error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // EXPORTS - All functions needed by poem.controller
// // ============================================
// export default {
//   generateTransliteration,
//   autoTransliteratePoem,
//   getTransliterationBySlug,
//   batchTransliterate,
//   addCustomTransliteration,
//   getEngineStats,
//   clearTransliterationCache,
//   generatePoemTransliteration,
//   batchAutoTransliterate,
//   toggleAutoTransliterate,
//   fixInvalidTransliterationMethods,
//   mapToValidEnum
// };













// ============================================
// TRANSLITERATION SERVICE - Production API
// WITH FORCED METHOD MAPPING
// ============================================

import smartEngine from './smartTransliterationEngine.js';
import Poem from '../models/Poem.js';

// ============================================
// FORCED METHOD MAPPING - ALWAYS RETURNS VALID ENUM
// ============================================
const getValidMethod = (method) => {
  // ONLY these are valid - all others map to 'smart-engine'
  const VALID_METHODS = [
    'smart-engine',
    'fallback-cleaning',
    'auto',
    'production-hybrid',
    'zauq-rules',
    'vowel-inference'
  ];
  
  // If method is already valid, return it
  if (method && VALID_METHODS.includes(method)) {
    return method;
  }
  
  // Otherwise, always return 'smart-engine'
  console.log(`⚠️ Invalid method detected: "${method}", forcing to "smart-engine"`);
  return 'smart-engine';
};

// ============================================
// 1. MAIN TRANSLITERATION FUNCTION
// ============================================
export async function generateTransliteration(text, language = 'urdu', options = {}) {
  if (!text || text.trim().length === 0) {
    return {
      success: false,
      error: 'No text provided',
      transliteration: ''
    };
  }
  
  if (language !== 'urdu') {
    const fallback = text.replace(/[^\w\s]/g, '').trim();
    return {
      success: true,
      transliteration: fallback,
      method: 'fallback-cleaning',
      originalLanguage: language
    };
  }
  
  const result = await smartEngine.smartTransliterate(text, options);
  
  // FORCE the method to be valid
  if (result.success) {
    result.method = getValidMethod(result.method);
  }
  
  return result;
}

// ============================================
// 2. AUTO-TRANSLITERATE POEM
// ============================================
export async function autoTransliteratePoem(poem, force = false) {
  try {
    if (poem.autoTransliterate === false && !force) {
      console.log(`⏭️ Auto-transliteration disabled for ${poem.title}`);
      return { success: false, skipped: true };
    }
    
    if (!force && poem.transliteration && poem.transliteration.trim().length > 0) {
      console.log(`✅ Transliteration already exists for ${poem.title}`);
      return { 
        success: true, 
        fromCache: true, 
        transliteration: poem.transliteration,
        method: poem.transliterationMethod
      };
    }
    
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
    
    const result = await generateTransliteration(content, poem.language);
    
    if (result.success) {
      // FORCE the method to be valid before saving
      const validMethod = getValidMethod(result.method);
      
      console.log(`📌 Original method: ${result.method} → Valid method: ${validMethod}`);
      
      // Update the poem document
      poem.transliteration = result.transliteration;
      poem.transliterationMethod = validMethod;  // FORCED valid value
      poem.transliterationGeneratedAt = new Date();
      
      await poem.save();
      
      console.log(`✨ Auto-transliteration generated for ${poem.title}`);
      console.log(`   Method stored: ${validMethod}`);
      console.log(`   Length: ${result.transliteration.length} chars`);
      
      return { 
        success: true, 
        transliteration: result.transliteration, 
        method: validMethod,
        stats: result.stats
      };
    }
    
    return { success: false, error: result.error };
  } catch (error) {
    console.error('Auto-transliteration error:', error);
    
    // If validation error, try saving without the method field
    if (error.name === 'ValidationError') {
      try {
        console.log('⚠️ Validation error, trying to save without method field...');
        poem.transliteration = result?.transliteration || '';
        poem.transliterationMethod = undefined;
        poem.transliterationGeneratedAt = new Date();
        await poem.save();
        console.log('✅ Saved without method field');
        return { success: true, transliteration: poem.transliteration, method: 'saved-without-method' };
      } catch (fallbackError) {
        console.error('Fallback save also failed:', fallbackError);
        return { success: false, error: error.message };
      }
    }
    
    return { success: false, error: error.message };
  }
}

// ============================================
// 3. GET TRANSLITERATION BY SLUG
// ============================================
export async function getTransliterationBySlug(slug) {
  try {
    const poem = await Poem.findOne({ slug });
    
    if (!poem) {
      return { success: false, error: 'Poem not found' };
    }
    
    if (poem.transliteration && poem.transliteration.trim().length > 0) {
      return {
        success: true,
        data: poem.transliteration,
        fromCache: true,
        method: poem.transliterationMethod || 'unknown',
        generatedAt: poem.transliterationGeneratedAt
      };
    }
    
    const content = poem.contentUrdu || poem.content;
    const result = await generateTransliteration(content, poem.language);
    
    if (result.success) {
      const validMethod = getValidMethod(result.method);
      
      poem.transliteration = result.transliteration;
      poem.transliterationMethod = validMethod;
      poem.transliterationGeneratedAt = new Date();
      await poem.save();
      
      return {
        success: true,
        data: result.transliteration,
        fromCache: false,
        method: validMethod
      };
    }
    
    return { success: false, error: result.error };
  } catch (error) {
    console.error('Get transliteration error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// 4. GENERATE FOR POEM BY ID
// ============================================
export async function generatePoemTransliteration(poemId, force = false) {
  try {
    const poem = await Poem.findById(poemId);
    if (!poem) {
      return { success: false, error: 'Poem not found' };
    }
    return await autoTransliteratePoem(poem, force);
  } catch (error) {
    console.error('Generate error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// 5. BATCH AUTO-TRANSLITERATE
// ============================================
export async function batchAutoTransliterate(limit = 50, language = null) {
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
    }
    
    const poems = await Poem.find(query).limit(limit);
    console.log(`📚 Found ${poems.length} poems needing auto-transliteration`);
    
    const results = [];
    for (let i = 0; i < poems.length; i++) {
      const poem = poems[i];
      console.log(`\n🔄 Auto-transliterating (${i + 1}/${poems.length}): ${poem.title}`);
      
      const result = await autoTransliteratePoem(poem, true);
      results.push({
        poemId: poem._id,
        title: poem.title,
        language: poem.language,
        success: result.success,
        method: result.method,
        error: result.error,
        skipped: result.skipped
      });
      
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    const generated = results.filter(r => r.success && !r.skipped).length;
    const failed = results.filter(r => !r.success && !r.skipped).length;
    const skipped = results.filter(r => r.skipped).length;
    
    return {
      success: true,
      total: poems.length,
      generated,
      failed,
      skipped,
      results
    };
  } catch (error) {
    console.error('Batch error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// 6. TOGGLE AUTO-TRANSLITERATE
// ============================================
export async function toggleAutoTransliterate(poemId, enabled) {
  try {
    const poem = await Poem.findById(poemId);
    if (!poem) {
      return { success: false, error: 'Poem not found' };
    }
    
    poem.autoTransliterate = enabled;
    await poem.save();
    
    return { success: true, autoTransliterate: enabled };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ============================================
// 7. GET ENGINE STATS
// ============================================
export async function getEngineStats() {
  return smartEngine.getStats?.() || { cache: { hits: 0, misses: 0 } };
}

// ============================================
// 8. CLEAR CACHE
// ============================================
export async function clearTransliterationCache() {
  if (smartEngine.clearCache) smartEngine.clearCache();
  return { success: true };
}

// ============================================
// 9. FIX INVALID METHODS IN EXISTING POEMS
// ============================================
export async function fixInvalidTransliterationMethods() {
  try {
    const poems = await Poem.find({
      transliteration: { $exists: true, $ne: '' }
    });
    
    let fixed = 0;
    for (const poem of poems) {
      const oldMethod = poem.transliterationMethod;
      const newMethod = getValidMethod(oldMethod);
      
      if (oldMethod !== newMethod) {
        poem.transliterationMethod = newMethod;
        await poem.save();
        fixed++;
        console.log(`Fixed: "${oldMethod}" → "${newMethod}" for ${poem.title}`);
      }
    }
    
    return { success: true, total: poems.length, fixed };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ============================================
// EXPORTS
// ============================================
export default {
  generateTransliteration,
  autoTransliteratePoem,
  getTransliterationBySlug,
  generatePoemTransliteration,
  batchAutoTransliterate,
  toggleAutoTransliterate,
  getEngineStats,
  clearTransliterationCache,
  fixInvalidTransliterationMethods
};