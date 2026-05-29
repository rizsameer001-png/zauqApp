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

// // Generate slug before saving
// poemSchema.pre('save', function(next) {
//   if (this.isModified('title')) {
//     this.slug = slugify(this.title, { lower: true, strict: true }) + '-' + Date.now().toString(36);
//   }
//   next();
// });

// const Poem = mongoose.model('Poem', poemSchema);
// export default Poem;






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
  aiExplanation: {
    summary: String,
    themes: [String],
    literaryDevices: [String],
    generatedAt: Date
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

// FIXED: Regular indexes only - NO text index on language
poemSchema.index({ title: 'text', content: 'text', contentUrdu: 'text', tags: 'text', 'translation.english': 'text' });
poemSchema.index({ genre: 1, language: 1, isPublished: 1 });
poemSchema.index({ author: 1, isPublished: 1 });
poemSchema.index({ isFeatured: 1, featuredAt: -1 });
poemSchema.index({ createdAt: -1 });

// ============================================
// FIXED: Generate clean slug WITHOUT random characters
// Before: "areeb-mpo6go76" (with random chars)
// After:  "areeb" (clean)
// If duplicate: "areeb-1", "areeb-2", etc.
// ============================================
poemSchema.pre('save', async function(next) {
  if (this.isModified('title')) {
    // Create base slug from title (e.g., "Areeb" -> "areeb")
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

// Check if model already exists to prevent overwrite error
const Poem = mongoose.models.Poem || mongoose.model('Poem', poemSchema);
export default Poem;