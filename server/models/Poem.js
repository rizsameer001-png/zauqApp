// server/models/Poem.js
// import mongoose from 'mongoose';
// import slugify from 'slugify';

// const poemSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: [true, 'Title is required'],
//     trim: true,
//     maxlength: [200, 'Title cannot exceed 200 characters']
//   },
//   slug: {
//     type: String,
//     unique: true,
//     index: true
//   },
//   content: {
//     type: String,
//     required: [true, 'Content is required']
//   },
//   contentUrdu: {
//     type: String,
//     default: ''
//   },
//   contentHindi: {
//     type: String,
//     default: ''
//   },
//   transliteration: {
//     type: String,
//     default: ''
//   },
//   translation: {
//     english: String,
//     hindi: String
//   },
//   author: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Author',
//     required: true
//   },
//   genre: {
//     type: String,
//     enum: ['ghazal', 'nazm', 'sher', 'rubai', 'rekhti', 'qasida', 'marsiya', 'other'],
//     required: true
//   },
//   category: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Category'
//   },
//   tags: [{
//     type: String,
//     trim: true,
//     lowercase: true
//   }],
//   mood: {
//     type: String,
//     enum: ['romantic', 'sad', 'philosophical', 'patriotic', 'humorous', 'spiritual', 'mystic', 'other']
//   },
//   language: {
//     type: String,
//     enum: ['urdu', 'hindi', 'english', 'persian', 'arabic'],
//     default: 'urdu'
//   },
//   era: {
//     type: String,
//     enum: ['classical', 'modern', 'contemporary']
//   },
//   audioUrl: String,
//   videoUrl: String,
//   images: [String],
//   aiExplanation: {
//     summary: String,
//     themes: [String],
//     literaryDevices: [String],
//     generatedAt: Date
//   },
//   stats: {
//     views: { type: Number, default: 0 },
//     likes: { type: Number, default: 0 },
//     bookmarks: { type: Number, default: 0 },
//     shares: { type: Number, default: 0 },
//     comments: { type: Number, default: 0 }
//   },
//   likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   bookmarkedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   comments: [{
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     text: String,
//     createdAt: { type: Date, default: Date.now }
//   }],
//   isPublished: {
//     type: Boolean,
//     default: false
//   },
//   publishedAt: Date,
//   isFeatured: {
//     type: Boolean,
//     default: false
//   },
//   featuredAt: Date,
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   },
//   metaTitle: String,
//   metaDescription: String,
//   metaKeywords: [String]
// }, {
//   timestamps: true
// });

// // Text search index
// poemSchema.index({ 
//   title: 'text', 
//   content: 'text', 
//   contentUrdu: 'text',
//   tags: 'text',
//   'translation.english': 'text'
// });
// poemSchema.index({ genre: 1, language: 1, isPublished: 1 });
// poemSchema.index({ author: 1, isPublished: 1 });
// poemSchema.index({ isFeatured: 1, featuredAt: -1 });
// poemSchema.index({ createdAt: -1 });

// // Generate slug before saving
// poemSchema.pre('save', function(next) {
//   if (this.isModified('title')) {
//     this.slug = slugify(this.title, { lower: true, strict: true }) + '-' + Date.now().toString(36);
//   }
//   next();
// });

// const Poem = mongoose.model('Poem', poemSchema);
// export default Poem;









// // server/models/Poem.js
// import mongoose from 'mongoose';
// import slugify from 'slugify';

// const poemSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: [true, 'Title is required'],
//     trim: true,
//     maxlength: [200, 'Title cannot exceed 200 characters']
//   },
//   slug: {
//     type: String,
//     unique: true,
//     index: true
//   },
//   content: {
//     type: String,
//     required: [true, 'Content is required']
//   },
//   contentUrdu: {
//     type: String,
//     default: ''
//   },
//   contentHindi: {
//     type: String,
//     default: ''
//   },
//   transliteration: {
//     type: String,
//     default: ''
//   },
//   translation: {
//     english: String,
//     hindi: String
//   },
//   author: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Author',
//     required: true
//   },
//   genre: {
//     type: String,
//     enum: ['ghazal', 'nazm', 'sher', 'rubai', 'rekhti', 'qasida', 'marsiya', 'other'],
//     required: true
//   },
//   category: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Category'
//   },
//   tags: [{
//     type: String,
//     trim: true,
//     lowercase: true
//   }],
//   mood: {
//     type: String,
//     enum: ['romantic', 'sad', 'philosophical', 'patriotic', 'humorous', 'spiritual', 'mystic', 'other']
//   },
//   language: {
//     type: String,
//     enum: ['urdu', 'hindi', 'english', 'persian', 'arabic'],
//     default: 'urdu'
//   },
//   era: {
//     type: String,
//     enum: ['classical', 'modern', 'contemporary']
//   },
//   audioUrl: String,
//   videoUrl: String,
//   images: [String],
//   aiExplanation: {
//     summary: String,
//     themes: [String],
//     literaryDevices: [String],
//     generatedAt: Date
//   },
//   stats: {
//     views: { type: Number, default: 0 },
//     likes: { type: Number, default: 0 },
//     bookmarks: { type: Number, default: 0 },
//     shares: { type: Number, default: 0 },
//     comments: { type: Number, default: 0 }
//   },
//   likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   bookmarkedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   comments: [{
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     text: String,
//     createdAt: { type: Date, default: Date.now }
//   }],
//   isPublished: {
//     type: Boolean,
//     default: false
//   },
//   publishedAt: Date,
//   isFeatured: {
//     type: Boolean,
//     default: false
//   },
//   featuredAt: Date,
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   },
//   metaTitle: String,
//   metaDescription: String,
//   metaKeywords: [String]
// }, {
//   timestamps: true
// });

// // FIXED: Regular indexes only - NO text index on language
// poemSchema.index({ title: 'text', content: 'text', contentUrdu: 'text', tags: 'text', 'translation.english': 'text' });
// poemSchema.index({ genre: 1, language: 1, isPublished: 1 });
// poemSchema.index({ author: 1, isPublished: 1 });
// poemSchema.index({ isFeatured: 1, featuredAt: -1 });
// poemSchema.index({ createdAt: -1 });

// // ============================================
// // FIXED: Generate clean slug WITHOUT random characters
// // Before: "areeb-mpo6go76" (with random chars)
// // After:  "areeb" (clean)
// // If duplicate: "areeb-1", "areeb-2", etc.
// // ============================================
// poemSchema.pre('save', async function(next) {
//   if (this.isModified('title')) {
//     // Create base slug from title (e.g., "Areeb" -> "areeb")
//     let baseSlug = slugify(this.title, { lower: true, strict: true });
    
//     // If slug is provided in the request, use that instead
//     let finalSlug = this.slug && this.slug.trim() ? 
//       this.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-') : 
//       baseSlug;
    
//     // Check if slug already exists in database
//     const existingPoem = await this.constructor.findOne({ slug: finalSlug });
    
//     // If slug exists and it's not the same document being updated
//     if (existingPoem && existingPoem._id.toString() !== this._id?.toString()) {
//       // Add number suffix to make it unique
//       let counter = 1;
//       let newSlug = `${finalSlug}-${counter}`;
      
//       // Keep checking until we find a unique slug
//       while (await this.constructor.findOne({ slug: newSlug })) {
//         counter++;
//         newSlug = `${finalSlug}-${counter}`;
//       }
//       this.slug = newSlug;
//       console.log(`⚠️ Slug "${finalSlug}" already exists. Using "${newSlug}" instead.`);
//     } else {
//       // Use clean slug without random characters
//       this.slug = finalSlug;
//     }
//   }
//   next();
// });

// // Check if model already exists to prevent overwrite error
// const Poem = mongoose.models.Poem || mongoose.model('Poem', poemSchema);
// export default Poem;


















// //===========================================
// //complete updated Poem.js model with AI analysis fields:
// // server/models/Poem.js
// import mongoose from 'mongoose';
// import slugify from 'slugify';

// const poemSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: [true, 'Title is required'],
//     trim: true,
//     maxlength: [200, 'Title cannot exceed 200 characters']
//   },
//   slug: {
//     type: String,
//     unique: true,
//     index: true
//   },
//   content: {
//     type: String,
//     required: [true, 'Content is required']
//   },
//   contentUrdu: {
//     type: String,
//     default: ''
//   },
//   contentHindi: {
//     type: String,
//     default: ''
//   },
//   transliteration: {
//     type: String,
//     default: ''
//   },
//   translation: {
//     english: String,
//     hindi: String
//   },
//   author: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Author',
//     required: true
//   },
//   genre: {
//     type: String,
//     enum: ['ghazal', 'nazm', 'sher', 'rubai', 'rekhti', 'qasida', 'marsiya', 'other'],
//     required: true
//   },
//   category: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Category'
//   },
//   tags: [{
//     type: String,
//     trim: true,
//     lowercase: true
//   }],
//   mood: {
//     type: String,
//     enum: ['romantic', 'sad', 'philosophical', 'patriotic', 'humorous', 'spiritual', 'mystic', 'other']
//   },
//   language: {
//     type: String,
//     enum: ['urdu', 'hindi', 'english', 'persian', 'arabic'],
//     default: 'urdu'
//   },
//   era: {
//     type: String,
//     enum: ['classical', 'modern', 'contemporary']
//   },
//   audioUrl: String,
//   videoUrl: String,
//   images: [String],
  
//   // Legacy AI explanation (keep for backward compatibility)
//   aiExplanation: {
//     summary: String,
//     themes: [String],
//     literaryDevices: [String],
//     generatedAt: Date
//   },
  
//   // ============================================
//   // NEW: Enhanced AI Analysis Fields
//   // ============================================
//   aiAnalysis: {
//     themes: { type: [String], default: null },
//     tone: { type: String, default: null },
//     sentiment: { type: String, default: null },
//     emotions: { type: [String], default: null },
//     meaning: { type: String, default: null },
//     literaryDevices: { type: [String], default: null },
//     rhymeScheme: { type: String, default: null },
//     difficulty: { type: String, default: null },
//     provider: { type: String, default: null },
//     rawResponse: { type: String, default: null } // For debugging
//   },
//   aiProvider: {
//     type: String,
//     enum: ['gemini', 'openai', 'groq', 'local', null],
//     default: null
//   },
//   aiAnalyzedAt: {
//     type: Date,
//     default: null
//   },
//   aiAnalysisVersion: {
//     type: String,
//     default: '1.0'
//   },
  
//   stats: {
//     views: { type: Number, default: 0 },
//     likes: { type: Number, default: 0 },
//     bookmarks: { type: Number, default: 0 },
//     shares: { type: Number, default: 0 },
//     comments: { type: Number, default: 0 }
//   },
//   likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   bookmarkedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   comments: [{
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     text: String,
//     createdAt: { type: Date, default: Date.now }
//   }],
//   isPublished: {
//     type: Boolean,
//     default: false
//   },
//   publishedAt: Date,
//   isFeatured: {
//     type: Boolean,
//     default: false
//   },
//   featuredAt: Date,
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   },
//   metaTitle: String,
//   metaDescription: String,
//   metaKeywords: [String]
// }, {
//   timestamps: true
// });

// // ============================================
// // Indexes for performance
// // ============================================
// poemSchema.index({ title: 'text', content: 'text', contentUrdu: 'text', tags: 'text', 'translation.english': 'text' });
// poemSchema.index({ genre: 1, language: 1, isPublished: 1 });
// poemSchema.index({ author: 1, isPublished: 1 });
// poemSchema.index({ isFeatured: 1, featuredAt: -1 });
// poemSchema.index({ createdAt: -1 });
// poemSchema.index({ aiProvider: 1, aiAnalyzedAt: -1 }); // For finding recently analyzed poems
// poemSchema.index({ 'aiAnalysis.themes': 1 }); // For theme-based queries

// // ============================================
// // Generate clean slug WITHOUT random characters
// // Example: "Areeb" -> "areeb"
// // If duplicate: "areeb-1", "areeb-2", etc.
// // ============================================
// poemSchema.pre('save', async function(next) {
//   if (this.isModified('title')) {
//     // Create base slug from title
//     let baseSlug = slugify(this.title, { lower: true, strict: true });
    
//     // If slug is provided in the request, use that instead
//     let finalSlug = this.slug && this.slug.trim() ? 
//       this.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-') : 
//       baseSlug;
    
//     // Check if slug already exists in database
//     const existingPoem = await this.constructor.findOne({ slug: finalSlug });
    
//     // If slug exists and it's not the same document being updated
//     if (existingPoem && existingPoem._id.toString() !== this._id?.toString()) {
//       // Add number suffix to make it unique
//       let counter = 1;
//       let newSlug = `${finalSlug}-${counter}`;
      
//       // Keep checking until we find a unique slug
//       while (await this.constructor.findOne({ slug: newSlug })) {
//         counter++;
//         newSlug = `${finalSlug}-${counter}`;
//       }
//       this.slug = newSlug;
//       console.log(`⚠️ Slug "${finalSlug}" already exists. Using "${newSlug}" instead.`);
//     } else {
//       // Use clean slug without random characters
//       this.slug = finalSlug;
//     }
//   }
//   next();
// });

// // ============================================
// // Virtual: Get full poem content based on language
// // ============================================
// poemSchema.virtual('contentByLanguage').get(function() {
//   switch(this.language) {
//     case 'urdu':
//       return this.contentUrdu || this.content;
//     case 'hindi':
//       return this.contentHindi || this.content;
//     default:
//       return this.content;
//   }
// });

// // ============================================
// // Method: Check if AI analysis is stale (older than 30 days)
// // ============================================
// poemSchema.methods.isAIAnalysisStale = function() {
//   if (!this.aiAnalyzedAt) return true;
//   const thirtyDaysAgo = new Date();
//   thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
//   return this.aiAnalyzedAt < thirtyDaysAgo;
// };

// // ============================================
// // Method: Get AI analysis or null if not exists
// // ============================================
// poemSchema.methods.getAIAnalysis = function() {
//   if (this.aiAnalysis && this.aiAnalysis.themes) {
//     return this.aiAnalysis;
//   }
//   return null;
// };

// // ============================================
// // Method: Update AI analysis
// // ============================================
// poemSchema.methods.updateAIAnalysis = async function(analysisData, provider = 'gemini') {
//   this.aiAnalysis = {
//     themes: analysisData.themes || null,
//     tone: analysisData.tone || null,
//     sentiment: analysisData.sentiment || null,
//     emotions: analysisData.emotions || null,
//     meaning: analysisData.meaning || null,
//     literaryDevices: analysisData.literaryDevices || null,
//     rhymeScheme: analysisData.rhymeScheme || null,
//     difficulty: analysisData.difficulty || null,
//     provider: provider,
//     rawResponse: analysisData.rawResponse || null
//   };
//   this.aiProvider = provider;
//   this.aiAnalyzedAt = new Date();
//   this.aiAnalysisVersion = '1.0';
//   await this.save();
//   return this.aiAnalysis;
// };

// // ============================================
// // Static: Find poems by theme (using AI analysis)
// // ============================================
// poemSchema.statics.findByTheme = async function(theme, limit = 10) {
//   return this.find({
//     'aiAnalysis.themes': { $regex: theme, $options: 'i' },
//     isPublished: true
//   })
//   .limit(limit)
//   .populate('author', 'name slug');
// };

// // ============================================
// // Static: Get poems needing AI analysis
// // ============================================
// poemSchema.statics.getPoemsNeedingAnalysis = async function(limit = 50) {
//   const thirtyDaysAgo = new Date();
//   thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
//   return this.find({
//     isPublished: true,
//     $or: [
//       { aiAnalysis: null },
//       { aiAnalyzedAt: { $lt: thirtyDaysAgo } },
//       { 'aiAnalysis.themes': { $size: 0 } }
//     ]
//   })
//   .limit(limit)
//   .populate('author', 'name');
// };

// // ============================================
// // Check if model already exists to prevent overwrite error
// // ============================================
// const Poem = mongoose.models.Poem || mongoose.model('Poem', poemSchema);
// export default Poem;
















//=======================================
//===========================================
//complete updated Poem.js model with AI analysis fields and auto-transliteration
// server/models/Poem.js
import mongoose from 'mongoose';
import slugify from 'slugify';

const poemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    unique: true,
    index: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  contentUrdu: {
    type: String,
    default: ''
  },
  contentHindi: {
    type: String,
    default: ''
  },
  transliteration: {
    type: String,
    default: ''
  },
  translation: {
    english: String,
    hindi: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  },
  genre: {
    type: String,
    enum: ['ghazal', 'nazm', 'sher', 'rubai', 'rekhti', 'qasida', 'marsiya', 'other'],
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  mood: {
    type: String,
    enum: ['romantic', 'sad', 'philosophical', 'patriotic', 'humorous', 'spiritual', 'mystic', 'other']
  },
  language: {
    type: String,
    enum: ['urdu', 'hindi', 'english', 'persian', 'arabic'],
    default: 'urdu'
  },
  era: {
    type: String,
    enum: ['classical', 'modern', 'contemporary']
  },
  audioUrl: String,
  videoUrl: String,
  images: [String],
  
  // Legacy AI explanation (keep for backward compatibility)
  aiExplanation: {
    summary: String,
    themes: [String],
    literaryDevices: [String],
    generatedAt: Date
  },
  
  // ============================================
  // NEW: Enhanced AI Analysis Fields
  // ============================================
  aiAnalysis: {
    themes: { type: [String], default: null },
    tone: { type: String, default: null },
    sentiment: { type: String, default: null },
    emotions: { type: [String], default: null },
    meaning: { type: String, default: null },
    literaryDevices: { type: [String], default: null },
    rhymeScheme: { type: String, default: null },
    difficulty: { type: String, default: null },
    provider: { type: String, default: null },
    rawResponse: { type: String, default: null } // For debugging
  },
  aiProvider: {
    type: String,
    enum: ['gemini', 'openai', 'groq', 'local', null],
    default: null
  },
  aiAnalyzedAt: {
    type: Date,
    default: null
  },
  aiAnalysisVersion: {
    type: String,
    default: '1.0'
  },
  
  // ============================================
  // NEW: Auto-Transliteration Fields
  // ============================================
  autoTransliterate: {
    type: Boolean,
    default: true  // Auto-generate transliteration by default
  },
  transliterationMethod: {
    type: String,
    enum: ['auto', 'manual', 'ai', 'rule-based', 'google-api'],
    default: 'auto'
  },
  transliterationGeneratedAt: {
    type: Date,
    default: null
  },
  
  stats: {
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    bookmarks: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    comments: { type: Number, default: 0 }
  },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  bookmarkedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    createdAt: { type: Date, default: Date.now }
  }],
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: Date,
  isFeatured: {
    type: Boolean,
    default: false
  },
  featuredAt: Date,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  metaTitle: String,
  metaDescription: String,
  metaKeywords: [String]
}, {
  timestamps: true
});

// ============================================
// Indexes for performance
// ============================================
poemSchema.index({ title: 'text', content: 'text', contentUrdu: 'text', tags: 'text', 'translation.english': 'text' });
poemSchema.index({ genre: 1, language: 1, isPublished: 1 });
poemSchema.index({ author: 1, isPublished: 1 });
poemSchema.index({ isFeatured: 1, featuredAt: -1 });
poemSchema.index({ createdAt: -1 });
poemSchema.index({ aiProvider: 1, aiAnalyzedAt: -1 }); // For finding recently analyzed poems
poemSchema.index({ 'aiAnalysis.themes': 1 }); // For theme-based queries
poemSchema.index({ autoTransliterate: 1 }); // For finding poems needing transliteration
poemSchema.index({ transliterationMethod: 1 }); // For filtering by method

// ============================================
// Generate clean slug WITHOUT random characters
// Example: "Areeb" -> "areeb"
// If duplicate: "areeb-1", "areeb-2", etc.
// ============================================
poemSchema.pre('save', async function(next) {
  if (this.isModified('title')) {
    // Create base slug from title
    let baseSlug = slugify(this.title, { lower: true, strict: true });
    
    // If slug is provided in the request, use that instead
    let finalSlug = this.slug && this.slug.trim() ? 
      this.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-') : 
      baseSlug;
    
    // Check if slug already exists in database
    const existingPoem = await this.constructor.findOne({ slug: finalSlug });
    
    // If slug exists and it's not the same document being updated
    if (existingPoem && existingPoem._id.toString() !== this._id?.toString()) {
      // Add number suffix to make it unique
      let counter = 1;
      let newSlug = `${finalSlug}-${counter}`;
      
      // Keep checking until we find a unique slug
      while (await this.constructor.findOne({ slug: newSlug })) {
        counter++;
        newSlug = `${finalSlug}-${counter}`;
      }
      this.slug = newSlug;
      console.log(`⚠️ Slug "${finalSlug}" already exists. Using "${newSlug}" instead.`);
    } else {
      // Use clean slug without random characters
      this.slug = finalSlug;
    }
  }
  next();
});

// ============================================
// Virtual: Get full poem content based on language
// ============================================
poemSchema.virtual('contentByLanguage').get(function() {
  switch(this.language) {
    case 'urdu':
      return this.contentUrdu || this.content;
    case 'hindi':
      return this.contentHindi || this.content;
    default:
      return this.content;
  }
});

// ============================================
// Method: Check if transliteration is stale (older than 30 days)
// ============================================
poemSchema.methods.isTransliterationStale = function() {
  if (!this.transliterationGeneratedAt) return true;
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return this.transliterationGeneratedAt < thirtyDaysAgo;
};

// ============================================
// Method: Check if auto-transliteration is enabled and needed
// ============================================
poemSchema.methods.needsTransliteration = function() {
  if (!this.autoTransliterate) return false;
  if (this.language === 'english') return false;
  if (this.transliteration && this.transliteration.trim().length > 0 && !this.isTransliterationStale()) return false;
  return true;
};

// ============================================
// Method: Get content for transliteration based on language
// ============================================
poemSchema.methods.getContentForTransliteration = function() {
  switch(this.language) {
    case 'urdu':
      return this.contentUrdu || this.content || '';
    case 'hindi':
      return this.contentHindi || this.content || '';
    default:
      return this.content || '';
  }
};

// ============================================
// Method: Update transliteration
// ============================================
poemSchema.methods.updateTransliteration = async function(transliterationText, method = 'auto') {
  this.transliteration = transliterationText;
  this.transliterationMethod = method;
  this.transliterationGeneratedAt = new Date();
  await this.save();
  return this.transliteration;
};

// ============================================
// Method: Check if AI analysis is stale (older than 30 days)
// ============================================
poemSchema.methods.isAIAnalysisStale = function() {
  if (!this.aiAnalyzedAt) return true;
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return this.aiAnalyzedAt < thirtyDaysAgo;
};

// ============================================
// Method: Get AI analysis or null if not exists
// ============================================
poemSchema.methods.getAIAnalysis = function() {
  if (this.aiAnalysis && this.aiAnalysis.themes) {
    return this.aiAnalysis;
  }
  return null;
};

// ============================================
// Method: Update AI analysis
// ============================================
poemSchema.methods.updateAIAnalysis = async function(analysisData, provider = 'gemini') {
  this.aiAnalysis = {
    themes: analysisData.themes || null,
    tone: analysisData.tone || null,
    sentiment: analysisData.sentiment || null,
    emotions: analysisData.emotions || null,
    meaning: analysisData.meaning || null,
    literaryDevices: analysisData.literaryDevices || null,
    rhymeScheme: analysisData.rhymeScheme || null,
    difficulty: analysisData.difficulty || null,
    provider: provider,
    rawResponse: analysisData.rawResponse || null
  };
  this.aiProvider = provider;
  this.aiAnalyzedAt = new Date();
  this.aiAnalysisVersion = '1.0';
  await this.save();
  return this.aiAnalysis;
};

// ============================================
// Static: Find poems by theme (using AI analysis)
// ============================================
poemSchema.statics.findByTheme = async function(theme, limit = 10) {
  return this.find({
    'aiAnalysis.themes': { $regex: theme, $options: 'i' },
    isPublished: true
  })
  .limit(limit)
  .populate('author', 'name slug');
};

// ============================================
// Static: Get poems needing AI analysis
// ============================================
poemSchema.statics.getPoemsNeedingAnalysis = async function(limit = 50) {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  return this.find({
    isPublished: true,
    $or: [
      { aiAnalysis: null },
      { aiAnalyzedAt: { $lt: thirtyDaysAgo } },
      { 'aiAnalysis.themes': { $size: 0 } }
    ]
  })
  .limit(limit)
  .populate('author', 'name');
};

// ============================================
// Static: Get poems needing transliteration
// ============================================
poemSchema.statics.getPoemsNeedingTransliteration = async function(limit = 50) {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  return this.find({
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
};

// ============================================
// Static: Toggle auto-transliterate for multiple poems
// ============================================
poemSchema.statics.batchToggleAutoTransliterate = async function(poemIds, enabled) {
  return this.updateMany(
    { _id: { $in: poemIds } },
    { $set: { autoTransliterate: enabled } }
  );
};

// ============================================
// Check if model already exists to prevent overwrite error
// ============================================
const Poem = mongoose.models.Poem || mongoose.model('Poem', poemSchema);
export default Poem;