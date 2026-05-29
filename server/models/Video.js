// //server/models/Video.js
// import mongoose from 'mongoose';
// import slugify from 'slugify';

// const videoSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   slug: {
//     type: String,
//     unique: true,
//     index: true
//   },
//   description: String,
//   type: {
//     type: String,
//     enum: ['mushaira', 'interview', 'documentary', 'lecture', 'performance', 'other'],
//     required: true
//   },
//   videoUrl: {
//     type: String,
//     required: true
//   },
//   thumbnail: String,
//   duration: Number,
//   author: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Author'
//   },
//   category: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Category'
//   },
//   language: {
//     type: String,
//     enum: ['urdu', 'hindi', 'english'],
//     default: 'urdu'
//   },
//   tags: [String],
//   subtitles: [{
//     language: String,
//     url: String
//   }],
//   isPremium: {
//     type: Boolean,
//     default: false
//   },
//   stats: {
//     views: { type: Number, default: 0 },
//     likes: { type: Number, default: 0 },
//     bookmarks: { type: Number, default: 0 },
//     totalWatchTime: { type: Number, default: 0 }
//   },
//   likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   isPublished: {
//     type: Boolean,
//     default: false
//   },
//   isFeatured: {
//     type: Boolean,
//     default: false
//   },
//   metaTitle: String,
//   metaDescription: String
// }, {
//   timestamps: true
// });

// videoSchema.index({ title: 'text', description: 'text' });
// videoSchema.index({ type: 1, language: 1, isPublished: 1 });

// videoSchema.pre('save', function(next) {
//   if (this.isModified('title')) {
//     this.slug = slugify(this.title, { lower: true, strict: true }) + '-' + Date.now().toString(36);
//   }
//   next();
// });

// const Video = mongoose.model('Video', videoSchema);
// export default Video;









// server/models/Video.js
import mongoose from 'mongoose';
import slugify from 'slugify';

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    index: true
  },
  description: String,
  type: {
    type: String,
    enum: ['mushaira', 'interview', 'documentary', 'lecture', 'performance', 'other'],
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  thumbnail: String,
  duration: Number,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  language: {
    type: String,
    enum: ['urdu', 'hindi', 'english'],
    default: 'urdu'
  },
  tags: [String],
  subtitles: [{
    language: String,
    url: String
  }],
  isPremium: {
    type: Boolean,
    default: false
  },
  stats: {
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    bookmarks: { type: Number, default: 0 },
    totalWatchTime: { type: Number, default: 0 }
  },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isPublished: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  metaTitle: String,
  metaDescription: String
}, {
  timestamps: true
});

// Indexes
videoSchema.index({ title: 'text', description: 'text' });
videoSchema.index({ type: 1, language: 1, isPublished: 1 });
videoSchema.index({ slug: 1 });
videoSchema.index({ createdAt: -1 });
videoSchema.index({ isFeatured: 1, createdAt: -1 });

// ============================================
// FIXED: Generate clean slug WITHOUT random characters
// Before: "video-title-mpo6go76" (with random chars)
// After:  "video-title" (clean)
// If duplicate: "video-title-1", "video-title-2", etc.
// ============================================
videoSchema.pre('save', async function(next) {
  if (this.isModified('title')) {
    // Create base slug from title (e.g., "My Video Title" -> "my-video-title")
    let baseSlug = slugify(this.title, { lower: true, strict: true });
    
    // If slug is provided in the request, use that instead
    let finalSlug = this.slug && this.slug.trim() ? 
      this.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-') : 
      baseSlug;
    
    // Remove trailing/leading hyphens
    finalSlug = finalSlug.replace(/^-|-$/g, '');
    
    // Check if slug already exists in database
    const existingVideo = await this.constructor.findOne({ slug: finalSlug });
    
    // If slug exists and it's not the same document being updated
    if (existingVideo && existingVideo._id.toString() !== this._id?.toString()) {
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
const Video = mongoose.models.Video || mongoose.model('Video', videoSchema);
export default Video;