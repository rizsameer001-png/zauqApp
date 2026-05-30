// //server/models/Author.js
// import mongoose from 'mongoose';
// import slugify from 'slugify';

// const authorSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Name is required'],
//     trim: true
//   },
//   slug: {
//     type: String,
//     unique: true,
//     index: true
//   },
//   nameUrdu: String,
//   nameHindi: String,
//   avatar: String,
//   coverImage: String,
//   bio: {
//     type: String,
//     required: true
//   },
//   bioUrdu: String,
//   bioHindi: String,
//   birthDate: Date,
//   deathDate: Date,
//   birthPlace: String,
//   era: {
//     type: String,
//     enum: ['classical', 'modern', 'contemporary']
//   },
//   category: {
//     type: String,
//     enum: ['classical', 'modern', 'female', 'trending', 'emerging']
//   },
//   genres: [{
//     type: String,
//     enum: ['ghazal', 'nazm', 'sher', 'rubai', 'rekhti', 'qasida', 'marsiya']
//   }],
//   languages: [{
//     type: String,
//     enum: ['urdu', 'hindi', 'english', 'persian', 'arabic', 'punjabi']
//   }],
//   timeline: [{
//     year: Number,
//     event: String,
//     description: String
//   }],
//   gallery: [{
//     url: String,
//     caption: String
//   }],
//   quotes: [{
//     text: String,
//     source: String
//   }],
//   socialLinks: {
//     website: String,
//     twitter: String,
//     facebook: String,
//     instagram: String,
//     youtube: String
//   },
//   stats: {
//     poemsCount: { type: Number, default: 0 },
//     booksCount: { type: Number, default: 0 },
//     followers: { type: Number, default: 0 },
//     views: { type: Number, default: 0 }
//   },
//   followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   relatedAuthors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }],
//   isVerified: {
//     type: Boolean,
//     default: false
//   },
//   isFeatured: {
//     type: Boolean,
//     default: false
//   },
//   metaTitle: String,
//   metaDescription: String,
//   metaKeywords: [String]
// }, {
//   timestamps: true
// });

// authorSchema.index({ name: 'text', bio: 'text', nameUrdu: 'text' });
// authorSchema.index({ era: 1, category: 1 });
// authorSchema.index({ isFeatured: 1 });

// authorSchema.pre('save', function(next) {
//   if (this.isModified('name')) {
//     this.slug = slugify(this.name, { lower: true, strict: true }) + '-' + Date.now().toString(36);
//   }
//   next();
// });

// const Author = mongoose.model('Author', authorSchema);
// export default Author;















// server/models/Author.js
import mongoose from 'mongoose';
import slugify from 'slugify';

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    index: true
  },
  slug: {
    type: String,
    unique: true,
    index: true,
    sparse: true
  },
  nameUrdu: {
    type: String,
    trim: true
  },
  nameHindi: {
    type: String,
    trim: true
  },
  avatar: {
    type: String,
    default: ''
  },
  coverImage: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    required: [true, 'Bio is required']
  },
  bioUrdu: String,
  bioHindi: String,
  birthDate: Date,
  deathDate: Date,
  birthPlace: String,
  era: {
    type: String,
    enum: ['classical', 'modern', 'contemporary'],
    default: 'modern'
  },
  category: {
    type: String,
    enum: ['classical', 'modern', 'female', 'trending', 'emerging'],
    default: 'modern'
  },
  genres: [{
    type: String,
    enum: ['ghazal', 'nazm', 'sher', 'rubai', 'rekhti', 'qasida', 'marsiya', 'nauha', 'soz', 'salam']
  }],
  languages: [{
    type: String,
    enum: ['urdu', 'hindi', 'english', 'persian', 'arabic', 'punjabi', 'sindhi', 'pashto']
  }],
  timeline: [{
    year: {
      type: Number,
      required: true
    },
    event: {
      type: String,
      required: true
    },
    description: String
  }],
  gallery: [{
    url: {
      type: String,
      required: true
    },
    caption: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  quotes: [{
    text: {
      type: String,
      required: true
    },
    source: String
  }],
  socialLinks: {
    website: String,
    twitter: String,
    facebook: String,
    instagram: String,
    youtube: String,
    wikipedia: String
  },
  stats: {
    poemsCount: { type: Number, default: 0 },
    booksCount: { type: Number, default: 0 },
    audioCount: { type: Number, default: 0 },
    videosCount: { type: Number, default: 0 },
    followers: { type: Number, default: 0 },
    views: { type: Number, default: 0 }
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  relatedAuthors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  metaTitle: String,
  metaDescription: String,
  metaKeywords: [String],
  seoScore: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// ============================================
// INDEXES for better query performance
// ============================================
authorSchema.index({ name: 'text', bio: 'text', nameUrdu: 'text' });
authorSchema.index({ era: 1, category: 1 });
authorSchema.index({ isFeatured: 1, 'stats.views': -1 });
authorSchema.index({ 'stats.followers': -1 });
authorSchema.index({ createdAt: -1 });
//authorSchema.index({ slug: 1 });

// ============================================
// VIRTUAL FIELDS
// ============================================

// Virtual for full name with title
authorSchema.virtual('fullName').get(function() {
  return this.name;
});

// Virtual for age at death
authorSchema.virtual('ageAtDeath').get(function() {
  if (this.birthDate && this.deathDate) {
    const deathYear = this.deathDate.getFullYear();
    const birthYear = this.birthDate.getFullYear();
    return deathYear - birthYear;
  }
  return null;
});

// Virtual for formatted birth/death years
authorSchema.virtual('years').get(function() {
  const birth = this.birthDate ? this.birthDate.getFullYear() : '?';
  const death = this.deathDate ? this.deathDate.getFullYear() : 'Present';
  return `${birth} - ${death}`;
});

// Virtual for follower count
authorSchema.virtual('followerCount').get(function() {
  return this.followers?.length || 0;
});

// ============================================
// MIDDLEWARE
// ============================================

// Generate clean slug without random characters
authorSchema.pre('save', async function(next) {
  if (this.isModified('name')) {
    // Create base slug from name (e.g., "Allama Iqbal" -> "allama-iqbal")
    let baseSlug = slugify(this.name, { lower: true, strict: true });
    
    // Remove any trailing/leading hyphens
    baseSlug = baseSlug.replace(/^-|-$/g, '');
    
    // Check if slug already exists in database
    const existingAuthor = await this.constructor.findOne({ slug: baseSlug });
    
    // If slug exists and it's not the same document being updated
    if (existingAuthor && existingAuthor._id.toString() !== this._id?.toString()) {
      // Add number suffix to make it unique
      let counter = 1;
      let newSlug = `${baseSlug}-${counter}`;
      
      // Keep checking until we find a unique slug
      while (await this.constructor.findOne({ slug: newSlug })) {
        counter++;
        newSlug = `${baseSlug}-${counter}`;
      }
      this.slug = newSlug;
      console.log(`⚠️ Slug "${baseSlug}" already exists. Using "${newSlug}" instead.`);
    } else {
      // Use clean slug without random characters
      this.slug = baseSlug;
    }
  }
  
  // Update SEO meta if not provided
  if (!this.metaTitle && this.name) {
    this.metaTitle = `${this.name} - ZauqApp Literary Archive`;
  }
  if (!this.metaDescription && this.bio) {
    this.metaDescription = this.bio.substring(0, 160);
  }
  
  next();
});

// Update stats before saving
authorSchema.pre('save', function(next) {
  // Ensure stats object exists
  if (!this.stats) {
    this.stats = {
      poemsCount: 0,
      booksCount: 0,
      audioCount: 0,
      videosCount: 0,
      followers: 0,
      views: 0
    };
  }
  
  // Update follower count
  if (this.followers) {
    this.stats.followers = this.followers.length;
  }
  
  next();
});

// ============================================
// INSTANCE METHODS
// ============================================

// Increment view count
authorSchema.methods.incrementViews = async function() {
  this.stats.views += 1;
  return this.save();
};

// Add follower
authorSchema.methods.addFollower = async function(userId) {
  if (!this.followers.includes(userId)) {
    this.followers.push(userId);
    this.stats.followers = this.followers.length;
    await this.save();
  }
  return this;
};

// Remove follower
authorSchema.methods.removeFollower = async function(userId) {
  this.followers = this.followers.filter(id => id.toString() !== userId.toString());
  this.stats.followers = this.followers.length;
  await this.save();
  return this;
};

// Check if user is following
authorSchema.methods.isFollowedBy = function(userId) {
  return this.followers.some(id => id.toString() === userId.toString());
};

// Add to gallery
authorSchema.methods.addToGallery = async function(url, caption) {
  if (!this.gallery) this.gallery = [];
  this.gallery.push({ url, caption, uploadedAt: new Date() });
  await this.save();
  return this;
};

// Remove from gallery
authorSchema.methods.removeFromGallery = async function(imageId) {
  this.gallery = this.gallery.filter(img => img._id.toString() !== imageId);
  await this.save();
  return this;
};

// Add to timeline
authorSchema.methods.addToTimeline = async function(year, event, description) {
  if (!this.timeline) this.timeline = [];
  this.timeline.push({ year, event, description });
  // Sort timeline by year
  this.timeline.sort((a, b) => a.year - b.year);
  await this.save();
  return this;
};

// ============================================
// STATIC METHODS
// ============================================

// Search authors
authorSchema.statics.search = function(query, limit = 20) {
  return this.find(
    { $text: { $search: query } },
    { score: { $meta: 'textScore' } }
  )
    .sort({ score: { $meta: 'textScore' } })
    .limit(limit);
};

// Get featured authors
authorSchema.statics.getFeatured = function(limit = 10) {
  return this.find({ isFeatured: true })
    .sort({ 'stats.views': -1 })
    .limit(limit);
};

// Get trending authors
authorSchema.statics.getTrending = function(limit = 20) {
  return this.find()
    .sort({ 'stats.views': -1, 'stats.followers': -1 })
    .limit(limit);
};

// Get authors by era
authorSchema.statics.getByEra = function(era, limit = 50) {
  return this.find({ era })
    .sort({ name: 1 })
    .limit(limit);
};

// ============================================
// COMPOUND INDEXES
// ============================================
//authorSchema.index({ isFeatured: 1, 'stats.views': -1 });
authorSchema.index({ era: 1, 'stats.views': -1 });
authorSchema.index({ category: 1, isFeatured: 1 });

// ============================================
// MODEL CREATION (Prevent overwrite error)
// ============================================
const Author = mongoose.models.Author || mongoose.model('Author', authorSchema);

export default Author;