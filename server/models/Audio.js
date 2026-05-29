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
//     enum: ['audiobook', 'mushaira', 'podcast', 'poem_recitation', 'ghazal', 'other'],
//     required: true
//   },
//   audioUrl: {
//     type: String,
//     required: true
//   },
//   duration: Number,
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
//   metaDescription: String
// }, {
//   timestamps: true
// });

// // Indexes
// audioSchema.index({ title: 'text', description: 'text' });
// audioSchema.index({ type: 1, language: 1, isPublished: 1 });
// audioSchema.index({ slug: 1 });
// audioSchema.index({ createdAt: -1 });

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
//     } else {
//       this.slug = finalSlug;
//     }
//   }
//   next();
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
    required: true
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
  isPublished: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
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
  location: String
}, {
  timestamps: true
});

// Indexes
audioSchema.index({ title: 'text', description: 'text' });
audioSchema.index({ type: 1, language: 1, isPublished: 1 });
audioSchema.index({ slug: 1 });
audioSchema.index({ createdAt: -1 });
audioSchema.index({ occasion: 1 });
audioSchema.index({ 'reciter.name': 1 });

// ============================================
// FIXED: Generate clean slug WITHOUT random characters
// ============================================
audioSchema.pre('save', async function(next) {
  if (this.isModified('title')) {
    let baseSlug = slugify(this.title, { lower: true, strict: true });
    let finalSlug = this.slug && this.slug.trim() ? 
      this.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-') : 
      baseSlug;
    
    finalSlug = finalSlug.replace(/^-|-$/g, '');
    
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
  next();
});

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

const Audio = mongoose.models.Audio || mongoose.model('Audio', audioSchema);
export default Audio;