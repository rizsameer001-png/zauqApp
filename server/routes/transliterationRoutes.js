// // ============================================
// // TRANSLITERATION API ROUTES
// // RESTful endpoints for production
// // ============================================

// import express from 'express';
// import rateLimit from 'express-rate-limit';
// import {
//   generateTransliteration,
//   getTransliterationBySlug,
//   getEngineStats,
//   clearTransliterationCache,
//   batchTransliterate
// } from '../services/transliterationService.js';

// const router = express.Router();

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   message: 'Too many requests, please try again later.'
// });

// // POST /api/transliteration - Generate transliteration
// router.post('/', limiter, async (req, res) => {
//   try {
//     const { text, language, options = {} } = req.body;
    
//     if (!text) {
//       return res.status(400).json({ error: 'Text is required' });
//     }
    
//     const result = await generateTransliteration(text, language, options);
    
//     if (!result.success) {
//       return res.status(400).json(result);
//     }
    
//     res.json(result);
//   } catch (error) {
//     console.error('API error:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // POST /api/transliteration/batch - Batch transliteration
// router.post('/batch', limiter, async (req, res) => {
//   try {
//     const { texts, options = {} } = req.body;
    
//     if (!texts || !Array.isArray(texts) || texts.length === 0) {
//       return res.status(400).json({ error: 'Array of texts is required' });
//     }
    
//     if (texts.length > 50) {
//       return res.status(400).json({ error: 'Maximum 50 texts per batch request' });
//     }
    
//     const results = await batchTransliterate(texts, options);
//     res.json({ success: true, results });
//   } catch (error) {
//     console.error('Batch API error:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // GET /api/transliteration/poem/:slug - Get poem transliteration
// router.get('/poem/:slug', async (req, res) => {
//   try {
//     const result = await getTransliterationBySlug(req.params.slug);
    
//     if (!result.success) {
//       return res.status(404).json({ error: result.error });
//     }
    
//     res.json(result);
//   } catch (error) {
//     console.error('Poem API error:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // GET /api/transliteration/stats - Engine statistics
// router.get('/stats', async (req, res) => {
//   try {
//     const stats = await getEngineStats();
//     res.json({ success: true, stats });
//   } catch (error) {
//     console.error('Stats API error:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // DELETE /api/transliteration/cache - Clear cache (admin only)
// router.delete('/cache', async (req, res) => {
//   try {
//     // Add admin authentication here
//     const result = await clearTransliterationCache();
//     res.json(result);
//   } catch (error) {
//     console.error('Cache clear error:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// export default router;









// // server/routes/transliterationRoutes.js
// import express from 'express';
// import { protect, adminOnly } from '../middleware/auth.js';
// import Poem from '../models/Poem.js';
// import { generateTransliteration, generatePoemTransliteration } from '../services/transliterationService.js';

// const router = express.Router();

// // ============================================
// // SIMPLE WORKING ROUTES
// // ============================================

// // POST /api/transliteration/poem/:id
// // Generate transliteration for a poem by ID (Admin only)
// router.post('/poem/:id', protect, adminOnly, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { force = false } = req.body;
    
//     console.log(`🔄 Generating transliteration for poem ID: ${id}`);
    
//     if (!id) {
//       return res.status(400).json({ 
//         success: false, 
//         error: 'Poem ID is required' 
//       });
//     }
    
//     // Find the poem
//     const poem = await Poem.findById(id);
    
//     if (!poem) {
//       return res.status(404).json({ 
//         success: false, 
//         error: 'Poem not found' 
//       });
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
//       return res.status(400).json({ 
//         success: false, 
//         error: 'No content found for this poem' 
//       });
//     }
    
//     // Generate transliteration
//     const result = await generateTransliteration(content, poem.language);
    
//     if (result.success) {
//       // Save to database
//       poem.transliteration = result.transliteration;
//       poem.transliterationMethod = result.method;
//       poem.transliterationGeneratedAt = new Date();
//       await poem.save();
      
//       console.log(`✅ Transliteration generated for ${poem.title}`);
      
//       return res.json({
//         success: true,
//         data: result.transliteration,
//         method: result.method,
//         fromCache: false
//       });
//     } else {
//       return res.status(500).json({
//         success: false,
//         error: result.error || 'Failed to generate transliteration'
//       });
//     }
//   } catch (error) {
//     console.error('Transliteration route error:', error);
//     return res.status(500).json({
//       success: false,
//       error: error.message
//     });
//   }
// });

// // GET /api/transliteration/poem/:identifier
// // Get transliteration by slug OR ID (Public)
// router.get('/poem/:identifier', async (req, res) => {
//   try {
//     const { identifier } = req.params;
    
//     console.log(`🔍 Fetching transliteration for: ${identifier}`);
    
//     // Try to find by ID first, then by slug
//     let poem = await Poem.findById(identifier).catch(() => null);
    
//     if (!poem) {
//       poem = await Poem.findOne({ slug: identifier });
//     }
    
//     if (!poem) {
//       return res.status(404).json({ 
//         success: false, 
//         error: 'Poem not found' 
//       });
//     }
    
//     // If transliteration exists, return it
//     if (poem.transliteration && poem.transliteration.trim().length > 0) {
//       console.log(`✅ Using cached transliteration for ${poem.title}`);
//       return res.json({
//         success: true,
//         data: poem.transliteration,
//         fromCache: true,
//         language: poem.language,
//         method: poem.transliterationMethod
//       });
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
//       return res.status(400).json({ 
//         success: false, 
//         error: `No content found for ${poem.language} poem` 
//       });
//     }
    
//     // Generate transliteration
//     console.log(`🔄 Generating transliteration for ${poem.language} poem...`);
//     const result = await generateTransliteration(content, poem.language);
    
//     if (result.success) {
//       // Save for future
//       poem.transliteration = result.transliteration;
//       poem.transliterationMethod = result.method;
//       poem.transliterationGeneratedAt = new Date();
//       await poem.save();
      
//       return res.json({
//         success: true,
//         data: result.transliteration,
//         method: result.method,
//         language: poem.language,
//         fromCache: false
//       });
//     } else {
//       return res.status(500).json({
//         success: false,
//         error: result.error || 'Failed to generate transliteration'
//       });
//     }
//   } catch (error) {
//     console.error('GET transliteration error:', error);
//     return res.status(500).json({
//       success: false,
//       error: error.message
//     });
//   }
// });

// // POST /api/transliteration/test - Test endpoint
// router.post('/test', protect, adminOnly, async (req, res) => {
//   try {
//     const { text, language = 'urdu' } = req.body;
    
//     if (!text) {
//       return res.status(400).json({ 
//         success: false, 
//         error: 'Text is required' 
//       });
//     }
    
//     const result = await generateTransliteration(text, language);
    
//     res.json({
//       success: result.success,
//       original: text,
//       transliteration: result.transliteration,
//       method: result.method
//     });
//   } catch (error) {
//     console.error('Test error:', error);
//     res.status(500).json({ 
//       success: false, 
//       error: error.message 
//     });
//   }
// });

// // GET /api/transliteration/health - Health check
// router.get('/health', (req, res) => {
//   res.json({ 
//     success: true, 
//     status: 'Transliteration API is running',
//     routes: ['POST /poem/:id', 'GET /poem/:identifier', 'POST /test', 'GET /health']
//   });
// });

// export default router;



















// server/routes/transliterationRoutes.js
import express from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import Poem from '../models/Poem.js';
import { generateTransliteration, generatePoemTransliteration } from '../services/transliterationService.js';

const router = express.Router();

// ============================================
// FORCED VALID METHOD - Always use this to prevent validation errors
// ============================================
const FORCED_VALID_METHOD = 'smart-engine';

// Helper to ensure method is always valid
const getValidMethod = (method) => {
  const VALID_METHODS = [
    'smart-engine',
    'fallback-cleaning', 
    'auto',
    'production-hybrid',
    'zauq-rules',
    'vowel-inference'
  ];
  
  if (method && VALID_METHODS.includes(method)) {
    return method;
  }
  console.log(`⚠️ Invalid method "${method}" forced to "${FORCED_VALID_METHOD}"`);
  return FORCED_VALID_METHOD;
};

// ============================================
// SIMPLE WORKING ROUTES
// ============================================

// POST /api/transliteration/poem/:id
// Generate transliteration for a poem by ID (Admin only)
router.post('/poem/:id', protect, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { force = false } = req.body;
    
    console.log(`🔄 Generating transliteration for poem ID: ${id}`);
    
    if (!id) {
      return res.status(400).json({ 
        success: false, 
        error: 'Poem ID is required' 
      });
    }
    
    // Find the poem
    const poem = await Poem.findById(id);
    
    if (!poem) {
      return res.status(404).json({ 
        success: false, 
        error: 'Poem not found' 
      });
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
      return res.status(400).json({ 
        success: false, 
        error: 'No content found for this poem' 
      });
    }
    
    // Generate transliteration
    const result = await generateTransliteration(content, poem.language);
    
    if (result.success) {
      // FORCE the method to a valid enum value
      const validMethod = getValidMethod(result.method);
      
      console.log(`📌 Original method: ${result.method} → Stored as: ${validMethod}`);
      
      // Save to database with forced valid method
      poem.transliteration = result.transliteration;
      poem.transliterationMethod = validMethod;  // FORCED valid value
      poem.transliterationGeneratedAt = new Date();
      
      try {
        await poem.save();
        console.log(`✅ Transliteration saved for ${poem.title} with method: ${validMethod}`);
      } catch (saveError) {
        console.error('❌ Save error, trying without method field:', saveError.message);
        // If validation fails, save without the method field
        poem.transliterationMethod = undefined;
        await poem.save();
        console.log(`✅ Saved without method field for ${poem.title}`);
      }
      
      return res.json({
        success: true,
        data: result.transliteration,
        method: validMethod,
        originalMethod: result.method,
        fromCache: false
      });
    } else {
      return res.status(500).json({
        success: false,
        error: result.error || 'Failed to generate transliteration'
      });
    }
  } catch (error) {
    console.error('Transliteration route error:', error);
    
    // Handle validation errors specifically
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validation error: ' + Object.values(error.errors).map(e => e.message).join(', ')
      });
    }
    
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/transliteration/poem/:identifier
// Get transliteration by slug OR ID (Public)
router.get('/poem/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;
    
    console.log(`🔍 Fetching transliteration for: ${identifier}`);
    
    // Try to find by ID first, then by slug
    let poem = await Poem.findById(identifier).catch(() => null);
    
    if (!poem) {
      poem = await Poem.findOne({ slug: identifier });
    }
    
    if (!poem) {
      return res.status(404).json({ 
        success: false, 
        error: 'Poem not found' 
      });
    }
    
    // If transliteration exists, return it
    if (poem.transliteration && poem.transliteration.trim().length > 0) {
      console.log(`✅ Using cached transliteration for ${poem.title}`);
      return res.json({
        success: true,
        data: poem.transliteration,
        fromCache: true,
        language: poem.language,
        method: poem.transliterationMethod || 'unknown'
      });
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
      return res.status(400).json({ 
        success: false, 
        error: `No content found for ${poem.language} poem` 
      });
    }
    
    // Generate transliteration
    console.log(`🔄 Generating transliteration for ${poem.language} poem...`);
    const result = await generateTransliteration(content, poem.language);
    
    if (result.success) {
      // FORCE the method to a valid enum value
      const validMethod = getValidMethod(result.method);
      
      // Save for future
      poem.transliteration = result.transliteration;
      poem.transliterationMethod = validMethod;
      poem.transliterationGeneratedAt = new Date();
      
      try {
        await poem.save();
      } catch (saveError) {
        console.error('Save error, continuing without saving:', saveError.message);
        // Don't fail the request if save fails
      }
      
      return res.json({
        success: true,
        data: result.transliteration,
        method: validMethod,
        language: poem.language,
        fromCache: false
      });
    } else {
      return res.status(500).json({
        success: false,
        error: result.error || 'Failed to generate transliteration'
      });
    }
  } catch (error) {
    console.error('GET transliteration error:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST /api/transliteration/poem/:identifier/auto
// Auto-transliterate a poem (Admin only)
router.post('/poem/:identifier/auto', protect, adminOnly, async (req, res) => {
  try {
    const { identifier } = req.params;
    const { force = false } = req.body;
    
    console.log(`🔄 Auto-transliterating: ${identifier}, force: ${force}`);
    
    // Find the poem
    let poem = await Poem.findById(identifier).catch(() => null);
    if (!poem) {
      poem = await Poem.findOne({ slug: identifier });
    }
    
    if (!poem) {
      return res.status(404).json({ success: false, error: 'Poem not found' });
    }
    
    if (poem.autoTransliterate === false && !force) {
      return res.json({
        success: true,
        skipped: true,
        message: 'Auto-transliteration is disabled for this poem'
      });
    }
    
    let content = '';
    if (poem.language === 'urdu') {
      content = poem.contentUrdu || poem.content || '';
    } else {
      content = poem.content || '';
    }
    
    const result = await generateTransliteration(content, poem.language);
    
    if (result.success) {
      const validMethod = getValidMethod(result.method);
      
      poem.transliteration = result.transliteration;
      poem.transliterationMethod = validMethod;
      poem.transliterationGeneratedAt = new Date();
      await poem.save();
      
      return res.json({
        success: true,
        data: result.transliteration,
        method: validMethod,
        fromCache: false
      });
    }
    
    return res.status(500).json({ success: false, error: result.error });
  } catch (error) {
    console.error('Auto-transliterate error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/transliteration/test - Test endpoint
router.post('/test', protect, adminOnly, async (req, res) => {
  try {
    const { text, language = 'urdu' } = req.body;
    
    if (!text) {
      return res.status(400).json({ 
        success: false, 
        error: 'Text is required' 
      });
    }
    
    const result = await generateTransliteration(text, language);
    
    res.json({
      success: result.success,
      original: text,
      transliteration: result.transliteration,
      method: result.method
    });
  } catch (error) {
    console.error('Test error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// GET /api/transliteration/status - Status endpoint (Admin only)
router.get('/status', protect, adminOnly, async (req, res) => {
  try {
    const totalPoems = await Poem.countDocuments();
    const poemsWithTransliteration = await Poem.countDocuments({
      transliteration: { $exists: true, $ne: '' }
    });
    
    res.json({
      success: true,
      stats: {
        totalPoems,
        poemsWithTransliteration,
        poemsWithoutTransliteration: totalPoems - poemsWithTransliteration,
        completionRate: totalPoems > 0 ? ((poemsWithTransliteration / totalPoems) * 100).toFixed(1) : 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/transliteration/poem/:identifier - Delete transliteration (Admin only)
router.delete('/poem/:identifier', protect, adminOnly, async (req, res) => {
  try {
    const { identifier } = req.params;
    
    let poem = await Poem.findById(identifier).catch(() => null);
    if (!poem) {
      poem = await Poem.findOne({ slug: identifier });
    }
    
    if (!poem) {
      return res.status(404).json({ success: false, error: 'Poem not found' });
    }
    
    poem.transliteration = '';
    poem.transliterationMethod = undefined;
    poem.transliterationGeneratedAt = null;
    await poem.save();
    
    res.json({
      success: true,
      message: 'Transliteration deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/transliteration/fix-methods - Fix invalid methods (Admin only)
router.post('/fix-methods', protect, adminOnly, async (req, res) => {
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
    
    res.json({
      success: true,
      total: poems.length,
      fixed,
      message: `Fixed ${fixed} poems with invalid transliteration methods`
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/transliteration/health - Health check
router.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    status: 'Transliteration API is running',
    routes: [
      'POST /poem/:id',
      'GET /poem/:identifier', 
      'POST /poem/:identifier/auto',
      'POST /test', 
      'GET /status',
      'DELETE /poem/:identifier',
      'POST /fix-methods',
      'GET /health'
    ]
  });
});

export default router;