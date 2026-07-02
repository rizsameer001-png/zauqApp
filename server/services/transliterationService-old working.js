
// // server/services/transliterationService.js
// import { smartTransliterate, addToCorpus, testSmartEngine as testEngine } from './smartTransliterationEngine.js';
// import Poem from '../models/Poem.js';

// // ============================================
// // MAIN TRANSLITERATION FUNCTION (Using Smart Engine)
// // ============================================
// export async function generateTransliteration(text, language = 'urdu') {
//   if (!text || text.trim().length === 0) {
//     return { success: false, error: 'No text provided', transliteration: '' };
//   }
  
//   console.log(`🔄 Generating transliteration using Smart Engine...`);
//   console.log(`📝 Original text length: ${text.length} chars`);
//   console.log(`📝 Original preview: ${text.substring(0, 100)}...`);
  
//   // Use the smart transliteration engine
//   const result = smartTransliterate(text, language);
  
//   if (result.success) {
//     console.log(`✅ Transliteration successful using ${result.method}`);
//     console.log(`📄 Result preview: ${result.transliteration.substring(0, 100)}...`);
    
//     return {
//       success: true,
//       transliteration: result.transliteration,
//       method: result.method,
//       originalLanguage: result.language,
//       stats: result.stats
//     };
//   }
  
//   // Fallback: basic cleaning
//   const fallback = text.replace(/[^\w\s]/g, '').trim();
//   console.log(`⚠️ Smart engine failed, using fallback cleaning`);
  
//   return {
//     success: true,
//     transliteration: fallback,
//     method: 'fallback-cleaning',
//     originalLanguage: language,
//     error: result.error
//   };
// }

// // ============================================
// // GET TRANSLITERATION BY SLUG
// // ============================================
// export async function getTransliterationBySlug(slug) {
//   try {
//     const poem = await Poem.findOne({ slug });
    
//     if (!poem) {
//       return { success: false, error: 'Poem not found' };
//     }
    
//     // If transliteration already exists in database, return it
//     if (poem.transliteration && poem.transliteration.trim().length > 0) {
//       console.log(`✅ Using cached transliteration for ${poem.title}`);
//       return {
//         success: true,
//         data: poem.transliteration,
//         fromCache: true,
//         language: poem.language,
//         method: poem.transliterationMethod
//       };
//     }
    
//     // Get content based on poem language
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
    
//     // Generate transliteration using smart engine
//     const result = await generateTransliteration(content, poem.language);
    
//     if (result.success) {
//       // Save to database for future requests
//       poem.transliteration = result.transliteration;
//       poem.transliterationMethod = result.method;
//       poem.transliterationGeneratedAt = new Date();
//       await poem.save();
      
//       console.log(`💾 Transliteration saved for ${poem.title}`);
      
//       return {
//         success: true,
//         data: result.transliteration,
//         method: result.method,
//         language: poem.language,
//         fromCache: false,
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
// // GENERATE TRANSLITERATION FOR A POEM BY ID
// // ============================================
// export async function generatePoemTransliteration(poemId, force = false) {
//   try {
//     const poem = await Poem.findById(poemId);
    
//     if (!poem) {
//       return { success: false, error: 'Poem not found' };
//     }
    
//     // Check if transliteration already exists and not forced
//     if (!force && poem.transliteration && poem.transliteration.trim().length > 0) {
//       console.log(`✅ Transliteration already exists for ${poem.title}`);
//       return { 
//         success: true, 
//         transliteration: poem.transliteration,
//         message: 'Transliteration already exists',
//         fromCache: true,
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
//       return { success: false, error: `No content found for ${poem.language} poem` };
//     }
    
//     // Generate transliteration using smart engine
//     const result = await generateTransliteration(content, poem.language);
    
//     if (result.success) {
//       poem.transliteration = result.transliteration;
//       poem.transliterationMethod = result.method;
//       poem.transliterationGeneratedAt = new Date();
//       await poem.save();
      
//       console.log(`✅ Transliteration generated and saved for ${poem.title}`);
//       console.log(`   Method: ${result.method}`);
//       console.log(`   Length: ${result.transliteration.length} chars`);
      
//       return {
//         success: true,
//         transliteration: result.transliteration,
//         method: result.method,
//         saved: true,
//         stats: result.stats
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
  
//   // Generate transliteration using smart engine
//   const result = await generateTransliteration(content, poem.language);
  
//   if (result.success) {
//     poem.transliteration = result.transliteration;
//     poem.transliterationMethod = 'auto';
//     poem.transliterationGeneratedAt = new Date();
//     await poem.save();
    
//     console.log(`✨ Auto-transliteration generated for ${poem.title}`);
//     console.log(`   Method: ${result.method}`);
    
//     return { 
//       success: true, 
//       transliteration: result.transliteration, 
//       method: result.method,
//       stats: result.stats
//     };
//   }
  
//   return { success: false, error: result.error };
// }

// // ============================================
// // BATCH GENERATE TRANSLITERATIONS
// // ============================================
// export async function batchGenerateTransliterations(limit = 50, language = null) {
//   try {
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
//     console.log(`📚 Found ${poems.length} poems needing transliteration`);
    
//     const results = [];
//     for (const poem of poems) {
//       console.log(`\n🔄 Processing: ${poem.title}`);
//       const result = await generatePoemTransliteration(poem._id, true);
//       results.push({
//         poemId: poem._id,
//         title: poem.title,
//         language: poem.language,
//         success: result.success,
//         method: result.method,
//         error: result.error,
//         stats: result.stats
//       });
//       // Small delay to avoid overwhelming the system
//       await new Promise(resolve => setTimeout(resolve, 100));
//     }
    
//     const generated = results.filter(r => r.success).length;
//     const failed = results.filter(r => !r.success).length;
    
//     console.log(`\n📊 Batch complete: ${generated} generated, ${failed} failed`);
    
//     return {
//       success: true,
//       total: poems.length,
//       generated: generated,
//       failed: failed,
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
//     console.log(`📚 Found ${poems.length} poems needing auto-transliteration`);
    
//     const results = [];
//     for (const poem of poems) {
//       console.log(`\n🔄 Auto-transliterating: ${poem.title}`);
//       const result = await autoTransliteratePoem(poem, true);
//       results.push({
//         poemId: poem._id,
//         title: poem.title,
//         language: poem.language,
//         success: result.success,
//         method: result.method,
//         error: result.error,
//         skipped: result.skipped,
//         stats: result.stats
//       });
//       await new Promise(resolve => setTimeout(resolve, 100));
//     }
    
//     const generated = results.filter(r => r.success && !r.skipped).length;
//     const failed = results.filter(r => !r.success && !r.skipped).length;
//     const skipped = results.filter(r => r.skipped).length;
    
//     console.log(`\n📊 Batch auto-transliteration complete: ${generated} generated, ${failed} failed, ${skipped} skipped`);
    
//     return {
//       success: true,
//       total: poems.length,
//       generated: generated,
//       failed: failed,
//       skipped: skipped,
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
// // ADD CUSTOM WORD TO CORPUS (Dynamic Learning)
// // ============================================
// export async function addCustomTransliteration(word, transliteration, language = 'hindi') {
//   const result = addToCorpus(word, transliteration, language);
//   if (result) {
//     console.log(`📚 Added custom transliteration: ${word} → ${transliteration}`);
//     return { success: true, word, transliteration };
//   }
//   return { success: false, error: 'Failed to add to corpus' };
// }

// // ============================================
// // TEST THE SMART ENGINE
// // ============================================
// export function testSmartEngine() {
//   return testEngine();
// }

// // ============================================
// // GET TRANSLITERATION STATISTICS
// // ============================================
// export async function getTransliterationStats() {
//   try {
//     const totalPoems = await Poem.countDocuments();
//     const poemsWithTransliteration = await Poem.countDocuments({
//       transliteration: { $exists: true, $ne: '' }
//     });
//     const autoTransliterateEnabled = await Poem.countDocuments({
//       autoTransliterate: true
//     });
    
//     const byLanguage = await Poem.aggregate([
//       {
//         $group: {
//           _id: '$language',
//           total: { $sum: 1 },
//           withTransliteration: {
//             $sum: {
//               $cond: [
//                 { $and: [
//                   { $ne: ['$transliteration', null] },
//                   { $ne: ['$transliteration', ''] }
//                 ] },
//                 1,
//                 0
//               ]
//             }
//           },
//           autoEnabled: {
//             $sum: {
//               $cond: [{ $eq: ['$autoTransliterate', true] }, 1, 0]
//             }
//           }
//         }
//       }
//     ]);
    
//     const byMethod = await Poem.aggregate([
//       {
//         $match: {
//           transliterationMethod: { $exists: true, $ne: '' }
//         }
//       },
//       {
//         $group: {
//           _id: '$transliterationMethod',
//           count: { $sum: 1 }
//         }
//       }
//     ]);
    
//     return {
//       success: true,
//       stats: {
//         totalPoems,
//         poemsWithTransliteration,
//         poemsWithoutTransliteration: totalPoems - poemsWithTransliteration,
//         autoTransliterateEnabled,
//         completionRate: totalPoems > 0 ? ((poemsWithTransliteration / totalPoems) * 100).toFixed(1) : 0,
//         byLanguage,
//         byMethod
//       }
//     };
//   } catch (error) {
//     console.error('Get transliteration stats error:', error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // DELETE TRANSLITERATION FOR A POEM
// // ============================================
// export async function deletePoemTransliteration(poemId) {
//   try {
//     const poem = await Poem.findById(poemId);
//     if (!poem) {
//       return { success: false, error: 'Poem not found' };
//     }
    
//     poem.transliteration = '';
//     poem.transliterationMethod = '';
//     poem.transliterationGeneratedAt = null;
//     await poem.save();
    
//     console.log(`🗑️ Deleted transliteration for ${poem.title}`);
    
//     return { success: true, message: 'Transliteration deleted successfully' };
//   } catch (error) {
//     console.error('Delete transliteration error:', error);
//     return { success: false, error: error.message };
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
//   addCustomTransliteration,
//   getTransliterationStats,
//   deletePoemTransliteration,
//   testSmartEngine
// };

























// server/services/transliterationService.js
// ============================================
// COMPLETE TRANSLITERATION SERVICE
// Supports Urdu, Hindi, and Auto-Detection
// ============================================

import smartTransliterationEngine from './smartTransliterationEngine.js';
import Poem from '../models/Poem.js';

// ============================================
// 1. MAIN TRANSLITERATION FUNCTION
// ============================================
export async function generateTransliteration(text, language = null) {
  if (!text || text.trim().length === 0) {
    return { 
      success: false, 
      error: 'No text provided', 
      transliteration: '' 
    };
  }
  
  console.log(`🔄 Generating transliteration...`);
  console.log(`📝 Original text length: ${text.length} chars`);
  console.log(`📝 Original preview: ${text.substring(0, 100)}...`);
  
  // Use the smart transliteration engine (auto-detects language if not specified)
  const result = smartTransliterationEngine.smartTransliterate(text, language);
  
  if (result.success) {
    console.log(`✅ Transliteration successful using ${result.method}`);
    console.log(`📄 Detected language: ${result.language}`);
    console.log(`📄 Result preview: ${result.transliteration.substring(0, 100)}...`);
    console.log(`⏱️  Duration: ${result.stats.durationMs}ms`);
    
    return {
      success: true,
      transliteration: result.transliteration,
      method: result.method,
      originalLanguage: result.language,
      stats: result.stats
    };
  }
  
  // Fallback: basic cleaning
  console.log(`⚠️ Smart engine failed, using fallback cleaning`);
  const fallback = text.replace(/[^\w\s]/g, '').trim();
  
  return {
    success: true,
    transliteration: fallback,
    method: 'fallback-cleaning',
    originalLanguage: language || 'unknown',
    error: result.error
  };
}

// ============================================
// 2. GET TRANSLITERATION BY SLUG
// ============================================
export async function getTransliterationBySlug(slug) {
  try {
    const poem = await Poem.findOne({ slug }).populate('author', 'name slug');
    
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
        method: poem.transliterationMethod,
        generatedAt: poem.transliterationGeneratedAt
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
      return { 
        success: false, 
        error: `No content found for ${poem.language} poem` 
      };
    }
    
    // Generate transliteration using engine
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
// 3. GENERATE TRANSLITERATION FOR A POEM BY ID
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
      return { 
        success: false, 
        error: `No content found for ${poem.language} poem` 
      };
    }
    
    // Generate transliteration using engine
    const result = await generateTransliteration(content, poem.language);
    
    if (result.success) {
      poem.transliteration = result.transliteration;
      poem.transliterationMethod = result.method;
      poem.transliterationGeneratedAt = new Date();
      await poem.save();
      
      console.log(`✅ Transliteration generated and saved for ${poem.title}`);
      console.log(`   Method: ${result.method}`);
      console.log(`   Language: ${result.originalLanguage}`);
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
// 4. AUTO-TRANSLITERATE ON POEM SAVE
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
    return { 
      success: true, 
      fromCache: true, 
      transliteration: poem.transliteration 
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
    console.log(`⚠️ No content found for ${poem.title}`);
    return { success: false, error: 'No content found' };
  }
  
  // Generate transliteration using engine
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
// 5. BATCH GENERATE TRANSLITERATIONS
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
    for (let i = 0; i < poems.length; i++) {
      const poem = poems[i];
      console.log(`\n🔄 Processing (${i + 1}/${poems.length}): ${poem.title}`);
      
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
// 6. BATCH AUTO-TRANSLITERATE
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
// 7. TOGGLE AUTO-TRANSLITERATION FOR POEM
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
// 8. GET POEMS NEEDING TRANSLITERATION
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
// 9. ADD CUSTOM WORD TO CORPUS (Dynamic Learning)
// ============================================
export async function addCustomTransliteration(word, transliteration, language = 'urdu') {
  if (!word || !transliteration) {
    return { success: false, error: 'Word and transliteration are required' };
  }
  
  const result = smartTransliterationEngine.addToCorpus(word, transliteration, language);
  
  if (result) {
    console.log(`📚 Added custom transliteration: ${word} → ${transliteration} (${language})`);
    return { success: true, word, transliteration, language };
  }
  
  return { success: false, error: 'Failed to add to corpus' };
}

// ============================================
// 10. BULK ADD TO CORPUS
// ============================================
export async function bulkAddToCorpus(entries, language = 'urdu') {
  const results = [];
  
  for (const entry of entries) {
    const result = smartTransliterationEngine.addToCorpus(entry.word, entry.transliteration, language);
    results.push({
      word: entry.word,
      transliteration: entry.transliteration,
      success: result
    });
  }
  
  const added = results.filter(r => r.success).length;
  console.log(`📚 Bulk add complete: ${added}/${entries.length} added to ${language} corpus`);
  
  return {
    success: true,
    added,
    total: entries.length,
    results
  };
}

// ============================================
// 11. GET TRANSLITERATION STATISTICS
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
    
    // Get engine stats
    const engineStats = smartTransliterationEngine.getStats();
    
    return {
      success: true,
      stats: {
        totalPoems,
        poemsWithTransliteration,
        poemsWithoutTransliteration: totalPoems - poemsWithTransliteration,
        autoTransliterateEnabled,
        completionRate: totalPoems > 0 ? ((poemsWithTransliteration / totalPoems) * 100).toFixed(1) : 0,
        byLanguage,
        byMethod,
        engine: engineStats
      }
    };
  } catch (error) {
    console.error('Get transliteration stats error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// 12. DELETE TRANSLITERATION FOR A POEM
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
// 13. REGENERATE ALL TRANSLITERATIONS
// ============================================
export async function regenerateAllTransliterations(language = null, concurrency = 5) {
  try {
    const query = {};
    if (language && (language === 'urdu' || language === 'hindi')) {
      query.language = language;
    } else {
      query.language = { $in: ['urdu', 'hindi'] };
    }
    
    const poems = await Poem.find(query);
    console.log(`📚 Found ${poems.length} poems to regenerate`);
    
    const results = [];
    let processed = 0;
    
    // Process in batches with concurrency
    for (let i = 0; i < poems.length; i += concurrency) {
      const batch = poems.slice(i, i + concurrency);
      const batchResults = await Promise.all(
        batch.map(poem => generatePoemTransliteration(poem._id, true))
      );
      
      results.push(...batchResults.map((result, idx) => ({
        poemId: batch[idx]._id,
        title: batch[idx].title,
        language: batch[idx].language,
        success: result.success,
        method: result.method,
        error: result.error
      })));
      
      processed += batch.length;
      console.log(`📊 Progress: ${processed}/${poems.length} processed`);
    }
    
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    
    console.log(`\n✅ Regeneration complete: ${successful} successful, ${failed} failed`);
    
    return {
      success: true,
      total: poems.length,
      successful,
      failed,
      results
    };
  } catch (error) {
    console.error('Regenerate all error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// 14. TEST THE SMART ENGINE
// ============================================
export function testSmartEngine() {
  const results = [];
  
  const testCases = [
    // Urdu tests
    { input: "ہم دیکھیں گے", expected: "Hum dekhenge", language: 'urdu' },
    { input: "میں تمہارے پاس ہوں", expected: "Mein tumhare paas hoon", language: 'urdu' },
    { input: "یہ دل ہے", expected: "Yeh dil hai", language: 'urdu' },
    { input: "پیاس بجھی نہیں", expected: "Pyaas bujhi nahin", language: 'urdu' },
    
    // Hindi tests
    { input: "मैं तुम्हारे पास हूँ", expected: "Main tumhare paas hoon", language: 'hindi' },
    { input: "यह दिल है", expected: "Yeh dil hai", language: 'hindi' },
    { input: "प्यास बुझी नहीं", expected: "Pyaas bujhi nahin", language: 'hindi' }
  ];
  
  for (const test of testCases) {
    const result = smartTransliterationEngine.smartTransliterate(test.input, test.language);
    results.push({
      input: test.input,
      output: result.transliteration,
      expected: test.expected,
      language: test.language,
      passed: result.transliteration === test.expected,
      stats: result.stats
    });
  }
  
  const passed = results.filter(r => r.passed).length;
  console.log(`\n🧪 TEST RESULTS: ${passed}/${results.length} passed`);
  
  return results;
}

// ============================================
// 15. EXPORT ALL FUNCTIONS
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
  bulkAddToCorpus,
  getTransliterationStats,
  deletePoemTransliteration,
  regenerateAllTransliterations,
  testSmartEngine
};