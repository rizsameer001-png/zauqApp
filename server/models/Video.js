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
  thumbnailCloudinaryId: String,
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
  publishedAt: Date,
  metaTitle: String,
  metaDescription: String,
  sourceType: {
    type: String,
    enum: ['upload', 'youtube', 'vimeo', 'other'],
    default: 'upload'
  },
  
  // ============================================
  // NEW: Creator fields (non-breaking)
  // ============================================
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  visibility: {
    type: String,
    enum: ['public', 'private', 'unlisted'],
    default: 'public'
  },
  allowComments: {
    type: Boolean,
    default: true
  },
  allowDownloads: {
    type: Boolean,
    default: false
  },
  videoSize: {
    type: Number,
    default: 0
  },
  videoFormat: {
    type: String,
    default: 'mp4'
  },
  scheduledPublishDate: {
    type: Date,
    default: null
  },
  metadata: {
    resolution: { type: String, default: '' },
    aspectRatio: { type: String, default: '' },
    codec: { type: String, default: '' },
    bitrate: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// ============================================
// INDEXES
// ============================================
videoSchema.index({ title: 'text', description: 'text' });
videoSchema.index({ type: 1, language: 1, isPublished: 1 });
videoSchema.index({ slug: 1 });
videoSchema.index({ createdAt: -1 });
videoSchema.index({ isFeatured: 1, createdAt: -1 });
videoSchema.index({ title: 1 });
videoSchema.index({ createdBy: 1, createdAt: -1 });
videoSchema.index({ createdBy: 1, isPublished: 1 });
videoSchema.index({ visibility: 1, isPublished: 1 });

// ============================================
// SLUG GENERATION (Clean slugs, no random chars)
// ============================================
videoSchema.pre('save', async function(next) {
  if (this.isModified('title') || this.isModified('slug')) {
    let baseSlug = slugify(this.title, { lower: true, strict: true });
    
    let finalSlug = this.slug && this.slug.trim() ? 
      this.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-') : 
      baseSlug;
    
    finalSlug = finalSlug.replace(/^-|-$/g, '');
    
    // If no slug generated, use a fallback
    if (!finalSlug) {
      finalSlug = `video-${Date.now().toString(36)}`;
    }
    
    const existingVideo = await this.constructor.findOne({ slug: finalSlug });
    
    if (existingVideo && existingVideo._id.toString() !== this._id?.toString()) {
      let counter = 1;
      let newSlug = `${finalSlug}-${counter}`;
      
      while (await this.constructor.findOne({ slug: newSlug })) {
        counter++;
        newSlug = `${finalSlug}-${counter}`;
      }
      this.slug = newSlug;
    } else {
      this.slug = finalSlug;
    }
  }
  next();
});

// ============================================
// VIRTUAL PROPERTIES
// ============================================
videoSchema.virtual('isCreatorVideo').get(function() {
  return !!this.createdBy;
});

videoSchema.virtual('canEdit', function(userId) {
  if (!userId) return false;
  return this.createdBy?.toString() === userId.toString();
});

// ============================================
// INSTANCE METHODS
// ============================================
videoSchema.methods.incrementViews = function() {
  this.stats.views += 1;
  return this.save();
};

videoSchema.methods.toggleLike = async function(userId) {
  const index = this.likedBy.indexOf(userId);
  if (index > -1) {
    this.likedBy.splice(index, 1);
    this.stats.likes = Math.max(0, this.stats.likes - 1);
  } else {
    this.likedBy.push(userId);
    this.stats.likes += 1;
  }
  await this.save();
  return this;
};

videoSchema.methods.isLikedBy = function(userId) {
  return this.likedBy.includes(userId);
};

videoSchema.methods.publish = function() {
  this.isPublished = true;
  this.publishedAt = new Date();
  return this.save();
};

videoSchema.methods.unpublish = function() {
  this.isPublished = false;
  return this.save();
};

// ============================================
// STATIC METHODS
// ============================================
videoSchema.statics.findByCreator = function(userId, options = {}) {
  const { limit = 20, skip = 0, sort = { createdAt: -1 } } = options;
  return this.find({ createdBy: userId })
    .sort(sort)
    .skip(skip)
    .limit(limit);
};

videoSchema.statics.getCreatorStats = async function(userId) {
  const stats = await this.aggregate([
    { $match: { createdBy: userId } },
    { $group: {
      _id: null,
      totalVideos: { $sum: 1 },
      totalViews: { $sum: '$stats.views' },
      totalLikes: { $sum: '$stats.likes' },
      totalBookmarks: { $sum: '$stats.bookmarks' },
      published: { $sum: { $cond: ['$isPublished', 1, 0] } },
      draft: { $sum: { $cond: ['$isPublished', 0, 1] } },
      premium: { $sum: { $cond: ['$isPremium', 1, 0] } }
    }}
  ]);
  return stats[0] || { totalVideos: 0, totalViews: 0, totalLikes: 0, totalBookmarks: 0, published: 0, draft: 0, premium: 0 };
};

const Video = mongoose.models.Video || mongoose.model('Video', videoSchema);
export default Video;