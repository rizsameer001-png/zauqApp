// // server/routes/transliterationRoutes.js
// import express from 'express';
// import { protect, adminOnly } from '../middleware/auth.js';
// import { 
//   generateTransliteration, 
//   generatePoemTransliteration, 
//   batchGenerateTransliterations 
// } from '../services/transliterationService.js';
// import Poem from '../models/Poem.js';

// const router = express.Router();

// // Generate transliteration for a specific poem (Admin only)
// router.post('/poem/:poemId', protect, adminOnly, async (req, res) => {
//   try {
//     const { poemId } = req.params;
//     const result = await generatePoemTransliteration(poemId);
    
//     if (result.success) {
//       res.json({
//         success: true,
//         data: result.transliteration,
//         method: result.method,
//         saved: result.saved || false
//       });
//     } else {
//       res.status(400).json({
//         success: false,
//         error: result.error
//       });
//     }
//   } catch (error) {
//     console.error('API error:', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // Generate transliteration for a poem by slug (Public - for display)
// router.get('/poem/:slug', async (req, res) => {
//   try {
//     const { slug } = req.params;
//     const poem = await Poem.findOne({ slug });
    
//     if (!poem) {
//       return res.status(404).json({ success: false, error: 'Poem not found' });
//     }
    
//     // If transliteration exists, return it
//     if (poem.transliteration && poem.transliteration.trim().length > 0) {
//       return res.json({
//         success: true,
//         data: poem.transliteration,
//         fromCache: true
//       });
//     }
    
//     // Generate on the fly
//     const content = poem.contentUrdu || poem.content;
//     const result = await generateTransliteration(content, poem.language);
    
//     if (result.success) {
//       // Save for future (don't await to not block response)
//       poem.transliteration = result.transliteration;
//       poem.save().catch(console.error);
      
//       res.json({
//         success: true,
//         data: result.transliteration,
//         method: result.method
//       });
//     } else {
//       res.status(400).json({ success: false, error: result.error });
//     }
//   } catch (error) {
//     console.error('API error:', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // Batch generate transliterations for all poems missing it (Admin only)
// router.post('/batch', protect, adminOnly, async (req, res) => {
//   try {
//     const { limit = 50 } = req.body;
//     const result = await batchGenerateTransliterations(limit);
//     res.json(result);
//   } catch (error) {
//     console.error('Batch API error:', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // Test transliteration (without saving)
// router.post('/test', protect, adminOnly, async (req, res) => {
//   try {
//     const { text, language = 'urdu' } = req.body;
    
//     if (!text) {
//       return res.status(400).json({ success: false, error: 'Text is required' });
//     }
    
//     const result = await generateTransliteration(text, language);
//     res.json(result);
//   } catch (error) {
//     console.error('Test API error:', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// export default router;










// // server/routes/transliterationRoutes.js
// import express from 'express';
// import { protect, adminOnly } from '../middleware/auth.js';
// import { 
//   generateTransliteration, 
//   generatePoemTransliteration, 
//   batchGenerateTransliterations,
//   getTransliterationBySlug
// } from '../services/transliterationService.js';
// import Poem from '../models/Poem.js';

// const router = express.Router();

// // ============================================
// // GET TRANSLITERATION BY SLUG (Public)
// // ============================================
// router.get('/poem/:slug', async (req, res) => {
//   try {
//     const { slug } = req.params;
    
//     if (!slug) {
//       return res.status(400).json({ success: false, error: 'Slug is required' });
//     }
    
//     console.log(`🔍 Fetching transliteration for slug: ${slug}`);
    
//     const poem = await Poem.findOne({ slug });
    
//     if (!poem) {
//       return res.status(404).json({ success: false, error: 'Poem not found' });
//     }
    
//     // If transliteration already exists in database, return it
//     if (poem.transliteration && poem.transliteration.trim().length > 0) {
//       console.log(`✅ Using cached transliteration for ${poem.title}`);
//       return res.json({
//         success: true,
//         data: poem.transliteration,
//         fromCache: true,
//         language: poem.language
//       });
//     }
    
//     // Get content based on poem language
//     let content = '';
//     console.log(`📝 Poem language: ${poem.language}`);
    
//     if (poem.language === 'urdu') {
//       content = poem.contentUrdu || poem.content || '';
//       console.log(`📖 Using Urdu content (${content.length} chars)`);
//     } else if (poem.language === 'hindi') {
//       content = poem.contentHindi || poem.content || '';
//       console.log(`📖 Using Hindi content (${content.length} chars)`);
//     } else {
//       content = poem.content || '';
//       console.log(`📖 Using ${poem.language} content (${content.length} chars)`);
//     }
    
//     if (!content || content.trim().length === 0) {
//       return res.status(400).json({ 
//         success: false, 
//         error: `No content found for ${poem.language} poem` 
//       });
//     }
    
//     // Generate transliteration on the fly
//     console.log(`🔄 Generating transliteration for ${poem.language} poem...`);
//     const result = await generateTransliteration(content, poem.language);
    
//     if (result.success) {
//       // Save to database for future requests (don't await to not block response)
//       poem.transliteration = result.transliteration;
//       poem.save().catch(err => console.error('Error saving transliteration:', err));
      
//       console.log(`✅ Transliteration generated using ${result.method}`);
      
//       res.json({
//         success: true,
//         data: result.transliteration,
//         method: result.method,
//         language: poem.language,
//         fromCache: false
//       });
//     } else {
//       console.error(`❌ Transliteration failed: ${result.error}`);
//       res.status(400).json({ 
//         success: false, 
//         error: result.error || 'Failed to generate transliteration' 
//       });
//     }
//   } catch (error) {
//     console.error('API error in GET /poem/:slug:', error);
//     res.status(500).json({ 
//       success: false, 
//       error: error.message || 'Internal server error' 
//     });
//   }
// });

// // ============================================
// // GENERATE TRANSLITERATION FOR A POEM (Admin only)
// // ============================================
// router.post('/poem/:poemId', protect, adminOnly, async (req, res) => {
//   try {
//     const { poemId } = req.params;
    
//     if (!poemId) {
//       return res.status(400).json({ success: false, error: 'Poem ID is required' });
//     }
    
//     console.log(`🔍 Generating transliteration for poem ID: ${poemId}`);
    
//     const result = await generatePoemTransliteration(poemId);
    
//     if (result.success) {
//       console.log(`✅ Transliteration generated: ${result.method}`);
//       res.json({
//         success: true,
//         data: result.transliteration,
//         method: result.method,
//         saved: result.saved || false,
//         fromCache: result.fromCache || false
//       });
//     } else {
//       console.error(`❌ Generation failed: ${result.error}`);
//       res.status(400).json({
//         success: false,
//         error: result.error || 'Failed to generate transliteration'
//       });
//     }
//   } catch (error) {
//     console.error('API error in POST /poem/:poemId:', error);
//     res.status(500).json({ 
//       success: false, 
//       error: error.message || 'Internal server error' 
//     });
//   }
// });

// // ============================================
// // BATCH GENERATE TRANSLITERATIONS (Admin only)
// // ============================================
// router.post('/batch', protect, adminOnly, async (req, res) => {
//   try {
//     const { limit = 50, language = null } = req.body;
    
//     console.log(`🔍 Batch generating transliterations (limit: ${limit}, language: ${language || 'all'})`);
    
//     const result = await batchGenerateTransliterations(limit, language);
    
//     console.log(`✅ Batch complete: ${result.generated} generated, ${result.failed} failed`);
    
//     res.json({
//       success: true,
//       total: result.total,
//       generated: result.generated,
//       failed: result.failed,
//       results: result.results,
//       message: `Generated ${result.generated} transliterations out of ${result.total} poems`
//     });
//   } catch (error) {
//     console.error('Batch API error:', error);
//     res.status(500).json({ 
//       success: false, 
//       error: error.message || 'Failed to batch generate transliterations' 
//     });
//   }
// });

// // ============================================
// // TEST TRANSLITERATION (Admin only - without saving)
// // ============================================
// router.post('/test', protect, adminOnly, async (req, res) => {
//   try {
//     const { text, language = 'urdu' } = req.body;
    
//     if (!text || text.trim().length === 0) {
//       return res.status(400).json({ 
//         success: false, 
//         error: 'Text is required for testing' 
//       });
//     }
    
//     console.log(`🔍 Testing transliteration for ${language} text (${text.length} chars)`);
    
//     const result = await generateTransliteration(text, language);
    
//     if (result.success) {
//       console.log(`✅ Test successful: ${result.method}`);
//       res.json({
//         success: true,
//         original: text,
//         transliteration: result.transliteration,
//         method: result.method,
//         language: language
//       });
//     } else {
//       console.error(`❌ Test failed: ${result.error}`);
//       res.status(400).json({ 
//         success: false, 
//         error: result.error || 'Failed to generate test transliteration' 
//       });
//     }
//   } catch (error) {
//     console.error('Test API error:', error);
//     res.status(500).json({ 
//       success: false, 
//       error: error.message || 'Internal server error' 
//     });
//   }
// });

// // ============================================
// // GET TRANSLITERATION STATUS (Admin only)
// // ============================================
// router.get('/status', protect, adminOnly, async (req, res) => {
//   try {
//     const totalPoems = await Poem.countDocuments();
//     const poemsWithTransliteration = await Poem.countDocuments({
//       transliteration: { $exists: true, $ne: '' }
//     });
//     const poemsWithoutTransliteration = totalPoems - poemsWithTransliteration;
    
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
//           }
//         }
//       }
//     ]);
    
//     res.json({
//       success: true,
//       stats: {
//         totalPoems,
//         poemsWithTransliteration,
//         poemsWithoutTransliteration,
//         completionRate: totalPoems > 0 ? ((poemsWithTransliteration / totalPoems) * 100).toFixed(1) : 0,
//         byLanguage
//       }
//     });
//   } catch (error) {
//     console.error('Status API error:', error);
//     res.status(500).json({ 
//       success: false, 
//       error: error.message || 'Failed to get status' 
//     });
//   }
// });

// // ============================================
// // DELETE TRANSLITERATION FOR A POEM (Admin only)
// // ============================================
// router.delete('/poem/:poemId', protect, adminOnly, async (req, res) => {
//   try {
//     const { poemId } = req.params;
    
//     const poem = await Poem.findById(poemId);
//     if (!poem) {
//       return res.status(404).json({ success: false, error: 'Poem not found' });
//     }
    
//     poem.transliteration = '';
//     await poem.save();
    
//     console.log(`🗑️ Deleted transliteration for ${poem.title}`);
    
//     res.json({
//       success: true,
//       message: 'Transliteration deleted successfully'
//     });
//   } catch (error) {
//     console.error('Delete API error:', error);
//     res.status(500).json({ 
//       success: false, 
//       error: error.message || 'Failed to delete transliteration' 
//     });
//   }
// });

// export default router;



















// server/routes/transliterationRoutes.js
import express from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import { 
  generateTransliteration, 
  generatePoemTransliteration, 
  batchGenerateTransliterations,
  getTransliterationBySlug,
  autoTransliteratePoem,
  batchAutoTransliterate,
  toggleAutoTransliterate
} from '../services/transliterationService.js';
import Poem from '../models/Poem.js';

const router = express.Router();

// ============================================
// GET TRANSLITERATION BY SLUG (Public)
// ============================================
router.get('/poem/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    if (!slug) {
      return res.status(400).json({ success: false, error: 'Slug is required' });
    }
    
    console.log(`🔍 Fetching transliteration for slug: ${slug}`);
    
    const poem = await Poem.findOne({ slug });
    
    if (!poem) {
      return res.status(404).json({ success: false, error: 'Poem not found' });
    }
    
    // If transliteration already exists in database, return it
    if (poem.transliteration && poem.transliteration.trim().length > 0) {
      console.log(`✅ Using cached transliteration for ${poem.title}`);
      return res.json({
        success: true,
        data: poem.transliteration,
        fromCache: true,
        language: poem.language,
        method: poem.transliterationMethod
      });
    }
    
    // Get content based on poem language
    let content = '';
    console.log(`📝 Poem language: ${poem.language}`);
    
    if (poem.language === 'urdu') {
      content = poem.contentUrdu || poem.content || '';
      console.log(`📖 Using Urdu content (${content.length} chars)`);
    } else if (poem.language === 'hindi') {
      content = poem.contentHindi || poem.content || '';
      console.log(`📖 Using Hindi content (${content.length} chars)`);
    } else {
      content = poem.content || '';
      console.log(`📖 Using ${poem.language} content (${content.length} chars)`);
    }
    
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: `No content found for ${poem.language} poem` 
      });
    }
    
    // Generate transliteration on the fly
    console.log(`🔄 Generating transliteration for ${poem.language} poem...`);
    const result = await generateTransliteration(content, poem.language);
    
    if (result.success) {
      // Save to database for future requests
      poem.transliteration = result.transliteration;
      poem.transliterationMethod = result.method;
      poem.transliterationGeneratedAt = new Date();
      poem.save().catch(err => console.error('Error saving transliteration:', err));
      
      console.log(`✅ Transliteration generated using ${result.method}`);
      
      res.json({
        success: true,
        data: result.transliteration,
        method: result.method,
        language: poem.language,
        fromCache: false
      });
    } else {
      console.error(`❌ Transliteration failed: ${result.error}`);
      res.status(400).json({ 
        success: false, 
        error: result.error || 'Failed to generate transliteration' 
      });
    }
  } catch (error) {
    console.error('API error in GET /poem/:slug:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Internal server error' 
    });
  }
});

// ============================================
// GENERATE TRANSLITERATION FOR A POEM (Admin only)
// ============================================
router.post('/poem/:poemId', protect, adminOnly, async (req, res) => {
  try {
    const { poemId } = req.params;
    const { force = false } = req.body;
    
    if (!poemId) {
      return res.status(400).json({ success: false, error: 'Poem ID is required' });
    }
    
    console.log(`🔍 Generating transliteration for poem ID: ${poemId}, force: ${force}`);
    
    const result = await generatePoemTransliteration(poemId, force);
    
    if (result.success) {
      console.log(`✅ Transliteration generated: ${result.method}`);
      res.json({
        success: true,
        data: result.transliteration,
        method: result.method,
        saved: result.saved || false,
        fromCache: result.fromCache || false
      });
    } else {
      console.error(`❌ Generation failed: ${result.error}`);
      res.status(400).json({
        success: false,
        error: result.error || 'Failed to generate transliteration'
      });
    }
  } catch (error) {
    console.error('API error in POST /poem/:poemId:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Internal server error' 
    });
  }
});

// ============================================
// AUTO-TRANSLITERATE A POEM (Admin only)
// ============================================
router.post('/poem/:poemId/auto', protect, adminOnly, async (req, res) => {
  try {
    const { poemId } = req.params;
    const { force = false } = req.body;
    
    if (!poemId) {
      return res.status(400).json({ success: false, error: 'Poem ID is required' });
    }
    
    console.log(`🔄 Auto-transliterating poem ID: ${poemId}, force: ${force}`);
    
    const poem = await Poem.findById(poemId);
    if (!poem) {
      return res.status(404).json({ success: false, error: 'Poem not found' });
    }
    
    const result = await autoTransliteratePoem(poem, force);
    
    if (result.success) {
      console.log(`✅ Auto-transliteration successful: ${result.method}`);
      res.json({
        success: true,
        data: result.transliteration,
        method: result.method,
        fromCache: result.fromCache || false
      });
    } else if (result.skipped) {
      res.json({
        success: true,
        skipped: true,
        message: 'Auto-transliteration is disabled for this poem'
      });
    } else {
      console.error(`❌ Auto-transliteration failed: ${result.error}`);
      res.status(400).json({
        success: false,
        error: result.error || 'Failed to auto-transliterate poem'
      });
    }
  } catch (error) {
    console.error('API error in POST /poem/:poemId/auto:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Internal server error' 
    });
  }
});

// ============================================
// TOGGLE AUTO-TRANSLITERATION FOR A POEM (Admin only)
// ============================================
router.patch('/poem/:poemId/toggle-auto', protect, adminOnly, async (req, res) => {
  try {
    const { poemId } = req.params;
    const { enabled } = req.body;
    
    if (!poemId) {
      return res.status(400).json({ success: false, error: 'Poem ID is required' });
    }
    
    if (enabled === undefined) {
      return res.status(400).json({ success: false, error: 'Enabled flag is required' });
    }
    
    console.log(`🔄 Toggling auto-transliteration for poem ${poemId} to ${enabled}`);
    
    const result = await toggleAutoTransliterate(poemId, enabled);
    
    if (result.success) {
      res.json({
        success: true,
        autoTransliterate: result.autoTransliterate
      });
    } else {
      res.status(400).json({ success: false, error: result.error });
    }
  } catch (error) {
    console.error('API error in PATCH /poem/:poemId/toggle-auto:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Internal server error' 
    });
  }
});

// ============================================
// BATCH GENERATE TRANSLITERATIONS (Admin only)
// ============================================
router.post('/batch', protect, adminOnly, async (req, res) => {
  try {
    const { limit = 50, language = null } = req.body;
    
    console.log(`🔍 Batch generating transliterations (limit: ${limit}, language: ${language || 'all'})`);
    
    const result = await batchGenerateTransliterations(limit, language);
    
    console.log(`✅ Batch complete: ${result.generated} generated, ${result.failed} failed`);
    
    res.json({
      success: true,
      total: result.total,
      generated: result.generated,
      failed: result.failed,
      results: result.results,
      message: `Generated ${result.generated} transliterations out of ${result.total} poems`
    });
  } catch (error) {
    console.error('Batch API error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to batch generate transliterations' 
    });
  }
});

// ============================================
// BATCH AUTO-TRANSLITERATE (Admin only)
// ============================================
router.post('/batch/auto', protect, adminOnly, async (req, res) => {
  try {
    const { limit = 100, language = null } = req.body;
    
    console.log(`🔄 Batch auto-transliterating (limit: ${limit}, language: ${language || 'all'})`);
    
    const result = await batchAutoTransliterate(limit, language);
    
    console.log(`✅ Batch auto-transliteration complete: ${result.generated} generated, ${result.failed} failed`);
    
    res.json({
      success: true,
      total: result.total,
      generated: result.generated,
      failed: result.failed,
      results: result.results,
      message: `Auto-transliterated ${result.generated} poems out of ${result.total}`
    });
  } catch (error) {
    console.error('Batch auto API error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to batch auto-transliterate' 
    });
  }
});

// ============================================
// TEST TRANSLITERATION (Admin only - without saving)
// ============================================
router.post('/test', protect, adminOnly, async (req, res) => {
  try {
    const { text, language = 'urdu' } = req.body;
    
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Text is required for testing' 
      });
    }
    
    console.log(`🔍 Testing transliteration for ${language} text (${text.length} chars)`);
    
    const result = await generateTransliteration(text, language);
    
    if (result.success) {
      console.log(`✅ Test successful: ${result.method}`);
      res.json({
        success: true,
        original: text,
        transliteration: result.transliteration,
        method: result.method,
        language: language
      });
    } else {
      console.error(`❌ Test failed: ${result.error}`);
      res.status(400).json({ 
        success: false, 
        error: result.error || 'Failed to generate test transliteration' 
      });
    }
  } catch (error) {
    console.error('Test API error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Internal server error' 
    });
  }
});

// ============================================
// GET TRANSLITERATION STATUS (Admin only)
// ============================================
router.get('/status', protect, adminOnly, async (req, res) => {
  try {
    const totalPoems = await Poem.countDocuments();
    const poemsWithTransliteration = await Poem.countDocuments({
      transliteration: { $exists: true, $ne: '' }
    });
    const poemsWithoutTransliteration = totalPoems - poemsWithTransliteration;
    
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
    
    res.json({
      success: true,
      stats: {
        totalPoems,
        poemsWithTransliteration,
        poemsWithoutTransliteration,
        autoTransliterateEnabled,
        completionRate: totalPoems > 0 ? ((poemsWithTransliteration / totalPoems) * 100).toFixed(1) : 0,
        byLanguage
      }
    });
  } catch (error) {
    console.error('Status API error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to get status' 
    });
  }
});

// ============================================
// DELETE TRANSLITERATION FOR A POEM (Admin only)
// ============================================
router.delete('/poem/:poemId', protect, adminOnly, async (req, res) => {
  try {
    const { poemId } = req.params;
    
    const poem = await Poem.findById(poemId);
    if (!poem) {
      return res.status(404).json({ success: false, error: 'Poem not found' });
    }
    
    poem.transliteration = '';
    poem.transliterationMethod = '';
    poem.transliterationGeneratedAt = null;
    await poem.save();
    
    console.log(`🗑️ Deleted transliteration for ${poem.title}`);
    
    res.json({
      success: true,
      message: 'Transliteration deleted successfully'
    });
  } catch (error) {
    console.error('Delete API error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to delete transliteration' 
    });
  }
});

// ============================================
// GET POEMS MISSING TRANSLITERATION (Admin only)
// ============================================
router.get('/missing', protect, adminOnly, async (req, res) => {
  try {
    const { limit = 50, language = null } = req.query;
    
    const query = {
      $or: [
        { transliteration: { $exists: false } },
        { transliteration: '' },
        { transliteration: null }
      ],
      language: { $in: ['urdu', 'hindi'] }
    };
    
    if (language && (language === 'urdu' || language === 'hindi')) {
      query.language = language;
    }
    
    const poems = await Poem.find(query)
      .limit(parseInt(limit))
      .select('title slug language contentUrdu contentHindi createdAt')
      .populate('author', 'name');
    
    res.json({
      success: true,
      total: poems.length,
      poems: poems
    });
  } catch (error) {
    console.error('Missing poems API error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to fetch missing poems' 
    });
  }
});

export default router;