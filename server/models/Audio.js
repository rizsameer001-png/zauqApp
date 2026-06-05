// // server/models/Audio.js
// import mongoose from 'mongoose';
// import slugify from 'slugify';

// const audioSchema = new mongoose.Schema({
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
//     enum: ['audiobook', 'mushaira', 'podcast', 'poem_recitation', 'ghazal', 'other'],
//     required: true
//   },
//   audioUrl: {
//     type: String,
//     required: true
//   },
//   duration: Number, // in seconds
//   thumbnail: String,
//   coverImage: String,
//   author: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Author'
//   },
//   narrator: {
//     name: String,
//     avatar: String,
//     bio: String
//   },
//   relatedBook: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Book'
//   },
//   relatedPoem: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Poem'
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
//   transcript: String,
//   chapters: [{
//     title: String,
//     startTime: Number,
//     endTime: Number
//   }],
//   playlist: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Playlist'
//   },
//   isPremium: {
//     type: Boolean,
//     default: false
//   },
//   stats: {
//     views: { type: Number, default: 0 },
//     plays: { type: Number, default: 0 },
//     likes: { type: Number, default: 0 },
//     bookmarks: { type: Number, default: 0 },
//     totalListeningTime: { type: Number, default: 0 } // in seconds
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

// audioSchema.index({ title: 'text', description: 'text' });
// audioSchema.index({ type: 1, language: 1, isPublished: 1 });

// audioSchema.pre('save', function(next) {
//   if (this.isModified('title')) {
//     this.slug = slugify(this.title, { lower: true, strict: true }) + '-' + Date.now().toString(36);
//   }
//   next();
// });

// const Audio = mongoose.model('Audio', audioSchema);
// export default Audio;


















// // server/models/Audio.js
// import mongoose from 'mongoose';
// import slugify from 'slugify';

// const audioSchema = new mongoose.Schema({
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
//     enum: [
//       'nauha',
//       'marsiya', 
//       'soz', 
//       'salam', 
//       'majlis',
//       'mushaira',
//       'podcast', 
//       'poem_recitation', 
//       'ghazal',
//       'nazm',
//       'naat',
//       'hamd',
//       'manqabat',
//       'munajat',
//       'audiobook',
//       'lecture',
//       'interview',
//       'other'
//     ],
//     required: true
//   },
//   audioUrl: {
//     type: String,
//     required: true
//   },
//   duration: Number, // in seconds
//   thumbnail: String,
//   coverImage: String,
//   author: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Author'
//   },
//   narrator: {
//     name: String,
//     avatar: String,
//     bio: String
//   },
//   relatedBook: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Book'
//   },
//   relatedPoem: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Poem'
//   },
//   category: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Category'
//   },
//   language: {
//     type: String,
//     enum: ['urdu', 'hindi', 'english', 'arabic', 'persian'],
//     default: 'urdu'
//   },
//   tags: [String],
//   transcript: String,
//   chapters: [{
//     title: String,
//     startTime: Number,
//     endTime: Number
//   }],
//   playlist: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Playlist'
//   },
//   isPremium: {
//     type: Boolean,
//     default: false
//   },
//   stats: {
//     views: { type: Number, default: 0 },
//     plays: { type: Number, default: 0 },
//     likes: { type: Number, default: 0 },
//     bookmarks: { type: Number, default: 0 },
//     totalListeningTime: { type: Number, default: 0 }
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
//   metaDescription: String,
//   // Additional fields for religious content
//   occasion: {
//     type: String,
//     enum: ['muharram', 'ramadan', 'eid', 'milad', 'general'],
//     default: 'general'
//   },
//   reciter: {
//     name: String,
//     style: String
//   },
//   eventDate: Date,
//   location: String
// }, {
//   timestamps: true
// });

// // Indexes
// audioSchema.index({ title: 'text', description: 'text' });
// audioSchema.index({ type: 1, language: 1, isPublished: 1 });
// //audioSchema.index({ slug: 1 });   // ❌ DUPLICATE
// audioSchema.index({ createdAt: -1 });
// audioSchema.index({ occasion: 1 });
// audioSchema.index({ 'reciter.name': 1 });

// // ============================================
// // FIXED: Generate clean slug WITHOUT random characters
// // ============================================
// audioSchema.pre('save', async function(next) {
//   if (this.isModified('title')) {
//     let baseSlug = slugify(this.title, { lower: true, strict: true });
//     let finalSlug = this.slug && this.slug.trim() ? 
//       this.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-') : 
//       baseSlug;
    
//     finalSlug = finalSlug.replace(/^-|-$/g, '');
    
//     const existingAudio = await this.constructor.findOne({ slug: finalSlug });
    
//     if (existingAudio && existingAudio._id.toString() !== this._id?.toString()) {
//       let counter = 1;
//       let newSlug = `${finalSlug}-${counter}`;
//       while (await this.constructor.findOne({ slug: newSlug })) {
//         counter++;
//         newSlug = `${finalSlug}-${counter}`;
//       }
//       this.slug = newSlug;
//       console.log(`⚠️ Slug "${finalSlug}" already exists. Using "${newSlug}" instead.`);
//     } else {
//       this.slug = finalSlug;
//     }
//   }
//   next();
// });

// // Virtual for formatted duration
// audioSchema.virtual('formattedDuration').get(function() {
//   if (!this.duration) return 'N/A';
//   const hours = Math.floor(this.duration / 3600);
//   const minutes = Math.floor((this.duration % 3600) / 60);
//   const seconds = this.duration % 60;
  
//   if (hours > 0) {
//     return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   }
//   return `${minutes}:${seconds.toString().padStart(2, '0')}`;
// });

// // Virtual for type display name
// audioSchema.virtual('typeDisplay').get(function() {
//   const typeMap = {
//     'nauha': 'Nauha',
//     'marsiya': 'Marsiya',
//     'soz': 'Soz',
//     'salam': 'Salam',
//     'majlis': 'Majlis',
//     'mushaira': 'Mushaira',
//     'podcast': 'Podcast',
//     'poem_recitation': 'Poem Recitation',
//     'ghazal': 'Ghazal',
//     'nazm': 'Nazm',
//     'naat': 'Naat',
//     'hamd': 'Hamd',
//     'manqabat': 'Manqabat',
//     'munajat': 'Munajat',
//     'audiobook': 'Audiobook',
//     'lecture': 'Lecture',
//     'interview': 'Interview',
//     'other': 'Other'
//   };
//   return typeMap[this.type] || this.type;
// });

// const Audio = mongoose.models.Audio || mongoose.model('Audio', audioSchema);
// export default Audio;


















// server/models/Audio.js
import mongoose from 'mongoose';
import slugify from 'slugify';

const audioSchema = new mongoose.Schema({
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
    enum: [
      'nauha',
      'marsiya', 
      'soz', 
      'salam', 
      'majlis',
      'mushaira',
      'podcast', 
      'poem_recitation', 
      'ghazal',
      'nazm',
      'naat',
      'hamd',
      'manqabat',
      'munajat',
      'audiobook',
      'lecture',
      'interview',
      'other'
    ],
    required: [true, 'Audio type is required']  // Make sure required is set
  },
  audioUrl: {
    type: String,
    required: true
  },
  duration: Number, // in seconds
  thumbnail: String,
  coverImage: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  narrator: {
    name: String,
    avatar: String,
    bio: String
  },
  relatedBook: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  },
  relatedPoem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poem'
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  language: {
    type: String,
    enum: ['urdu', 'hindi', 'english', 'arabic', 'persian'],
    default: 'urdu'
  },
  tags: [String],
  transcript: String,
  chapters: [{
    title: String,
    startTime: Number,
    endTime: Number
  }],
  playlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Playlist'
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  stats: {
    views: { type: Number, default: 0 },
    plays: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    bookmarks: { type: Number, default: 0 },
    totalListeningTime: { type: Number, default: 0 }
  },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  bookmarkedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // ✅ ADD THIS - for bookmark functionality
  isPublished: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  publishedAt: { // ✅ ADD THIS - for tracking when audio was published
    type: Date,
    default: null
  },
  metaTitle: String,
  metaDescription: String,
  // Additional fields for religious content
  occasion: {
    type: String,
    enum: ['muharram', 'ramadan', 'eid', 'milad', 'general'],
    default: 'general'
  },
  reciter: {
    name: String,
    style: String
  },
  eventDate: Date,
  location: String,
  order: { // ✅ ADD THIS - for playlist ordering
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes
audioSchema.index({ title: 'text', description: 'text' });
audioSchema.index({ type: 1, language: 1, isPublished: 1 });
audioSchema.index({ createdAt: -1 });
audioSchema.index({ occasion: 1 });
audioSchema.index({ 'reciter.name': 1 });
audioSchema.index({ isPublished: 1, createdAt: -1 });
audioSchema.index({ type: 1, isPublished: 1, 'stats.plays': -1 }); // ✅ For trending queries
audioSchema.index({ tags: 1 }); // ✅ For tag-based searches

// ============================================
// Generate clean slug WITHOUT random characters
// ============================================
audioSchema.pre('save', async function(next) {
  if (this.isModified('title')) {
    let baseSlug = slugify(this.title, { lower: true, strict: true });
    let finalSlug = this.slug && this.slug.trim() ? 
      this.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-') : 
      baseSlug;
    
    finalSlug = finalSlug.replace(/^-|-$/g, '');
    
    // If slug is empty after cleaning, use a default
    if (!finalSlug) {
      finalSlug = 'audio-' + Date.now();
    }
    
    const existingAudio = await this.constructor.findOne({ slug: finalSlug });
    
    if (existingAudio && existingAudio._id.toString() !== this._id?.toString()) {
      let counter = 1;
      let newSlug = `${finalSlug}-${counter}`;
      while (await this.constructor.findOne({ slug: newSlug })) {
        counter++;
        newSlug = `${finalSlug}-${counter}`;
      }
      this.slug = newSlug;
      console.log(`⚠️ Slug "${finalSlug}" already exists. Using "${newSlug}" instead.`);
    } else {
      this.slug = finalSlug;
    }
  }
  
  // Auto-set publishedAt when publishing for first time
  if (this.isModified('isPublished') && this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  next();
});

// ============================================
// Virtuals
// ============================================

// Virtual for formatted duration
audioSchema.virtual('formattedDuration').get(function() {
  if (!this.duration) return 'N/A';
  const hours = Math.floor(this.duration / 3600);
  const minutes = Math.floor((this.duration % 3600) / 60);
  const seconds = this.duration % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

// Virtual for type display name
audioSchema.virtual('typeDisplay').get(function() {
  const typeMap = {
    'nauha': 'Nauha',
    'marsiya': 'Marsiya',
    'soz': 'Soz',
    'salam': 'Salam',
    'majlis': 'Majlis',
    'mushaira': 'Mushaira',
    'podcast': 'Podcast',
    'poem_recitation': 'Poem Recitation',
    'ghazal': 'Ghazal',
    'nazm': 'Nazm',
    'naat': 'Naat',
    'hamd': 'Hamd',
    'manqabat': 'Manqabat',
    'munajat': 'Munajat',
    'audiobook': 'Audiobook',
    'lecture': 'Lecture',
    'interview': 'Interview',
    'other': 'Other'
  };
  return typeMap[this.type] || this.type;
});

// Virtual for occasion display name
audioSchema.virtual('occasionDisplay').get(function() {
  const occasionMap = {
    'muharram': 'Muharram',
    'ramadan': 'Ramadan',
    'eid': 'Eid',
    'milad': 'Milad un-Nabi',
    'general': 'General'
  };
  return occasionMap[this.occasion] || this.occasion;
});

// Virtual for short description (first 150 characters)
audioSchema.virtual('shortDescription').get(function() {
  if (!this.description) return '';
  if (this.description.length <= 150) return this.description;
  return this.description.substring(0, 150) + '...';
});

// ============================================
// Instance Methods
// ============================================

// Increment view count
audioSchema.methods.incrementViews = async function() {
  this.stats.views += 1;
  return this.save();
};

// Increment play count
audioSchema.methods.incrementPlays = async function() {
  this.stats.plays += 1;
  return this.save();
};

// Toggle like
audioSchema.methods.toggleLike = async function(userId) {
  const index = this.likedBy.indexOf(userId);
  if (index === -1) {
    this.likedBy.push(userId);
    this.stats.likes += 1;
  } else {
    this.likedBy.splice(index, 1);
    this.stats.likes -= 1;
  }
  return this.save();
};

// Toggle bookmark
audioSchema.methods.toggleBookmark = async function(userId) {
  if (!this.bookmarkedBy) this.bookmarkedBy = [];
  const index = this.bookmarkedBy.indexOf(userId);
  if (index === -1) {
    this.bookmarkedBy.push(userId);
    this.stats.bookmarks += 1;
  } else {
    this.bookmarkedBy.splice(index, 1);
    this.stats.bookmarks -= 1;
  }
  return this.save();
};

// Check if user liked
audioSchema.methods.isLikedBy = function(userId) {
  return this.likedBy.includes(userId);
};

// Check if user bookmarked
audioSchema.methods.isBookmarkedBy = function(userId) {
  return this.bookmarkedBy?.includes(userId) || false;
};

// ============================================
// Static Methods
// ============================================

// Get trending audio
audioSchema.statics.getTrending = async function(limit = 10, days = 7) {
  const dateLimit = new Date();
  dateLimit.setDate(dateLimit.getDate() - days);
  
  return this.find({
    isPublished: true,
    createdAt: { $gte: dateLimit }
  })
  .sort({ 'stats.plays': -1, 'stats.views': -1 })
  .limit(limit)
  .populate('author', 'name slug avatar');
};

// Get popular by type
audioSchema.statics.getPopularByType = async function(type, limit = 10) {
  return this.find({ type, isPublished: true })
    .sort({ 'stats.plays': -1, 'stats.likes': -1 })
    .limit(limit)
    .populate('author', 'name slug avatar');
};

// Get audio by occasion
audioSchema.statics.getByOccasion = async function(occasion, limit = 20, skip = 0) {
  return this.find({ occasion, isPublished: true })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('author', 'name slug avatar');
};

// Search audio
audioSchema.statics.searchAudio = async function(query, limit = 20, skip = 0) {
  const searchRegex = new RegExp(query, 'i');
  return this.find({
    isPublished: true,
    $or: [
      { title: searchRegex },
      { description: searchRegex },
      { tags: { $in: [searchRegex] } }
    ]
  })
  .sort({ 'stats.plays': -1 })
  .skip(skip)
  .limit(limit)
  .populate('author', 'name slug avatar');
};

// Get stats by type
audioSchema.statics.getStatsByType = async function() {
  return this.aggregate([
    { $match: { isPublished: true } },
    { $group: {
      _id: '$type',
      count: { $sum: 1 },
      totalPlays: { $sum: '$stats.plays' },
      totalViews: { $sum: '$stats.views' },
      totalLikes: { $sum: '$stats.likes' }
    }},
    { $sort: { count: -1 } }
  ]);
};

const Audio = mongoose.models.Audio || mongoose.model('Audio', audioSchema);
export default Audio;