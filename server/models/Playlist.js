// import mongoose from 'mongoose';
// import slugify from 'slugify';

// const playlistSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   slug: {
//     type: String,
//     unique: true
//   },
//   description: String,
//   coverImage: String,
//   isPublic: {
//     type: Boolean,
//     default: true
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   audios: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Audio'
//   }],
//   stats: {
//     views: { type: Number, default: 0 },
//     likes: { type: Number, default: 0 }
//   },
//   likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
// }, {
//   timestamps: true
// });

// playlistSchema.pre('save', function(next) {
//   if (this.isModified('name')) {
//     let baseSlug = slugify(this.name, { lower: true, strict: true });
//     this.slug = baseSlug;
//   }
//   next();
// });

// playlistSchema.virtual('audioCount').get(function() {
//   return this.audios?.length || 0;
// });

// const Playlist = mongoose.models.Playlist || mongoose.model('Playlist', playlistSchema);
// export default Playlist;











// server/models/Playlist.js
import mongoose from 'mongoose';
import slugify from 'slugify';

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    index: true
  },
  description: {
    type: String,
    default: ''
  },
  coverImage: {
    type: String,
    default: ''
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  audios: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Audio'
  }],
  stats: {
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    followers: { type: Number, default: 0 }  // ✅ Added followers count
  },
  likedBy: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  followers: [{  // ✅ Added followers array for tracking who follows
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

// Generate slug from name before saving
playlistSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    let baseSlug = slugify(this.name, { lower: true, strict: true });
    
    // If slug already exists, add a random suffix
    // This will be handled in the controller with uniqueness check
    this.slug = baseSlug;
  }
  next();
});

// Virtual for audio count
playlistSchema.virtual('audioCount').get(function() {
  return this.audios?.length || 0;
});

// Virtual for follower count (alternative to stats.followers)
playlistSchema.virtual('followerCount').get(function() {
  return this.followers?.length || 0;
});

// Indexes for better query performance
playlistSchema.index({ user: 1, createdAt: -1 });
playlistSchema.index({ isPublic: 1, createdAt: -1 });
playlistSchema.index({ 'stats.followers': -1 });
playlistSchema.index({ 'stats.views': -1 });
playlistSchema.index({ slug: 1 });
playlistSchema.index({ name: 'text' });

// Method to check if user follows this playlist
playlistSchema.methods.isFollowedBy = function(userId) {
  return this.followers && this.followers.includes(userId);
};

// Method to follow playlist
playlistSchema.methods.follow = async function(userId) {
  if (!this.followers.includes(userId)) {
    this.followers.push(userId);
    this.stats.followers = (this.stats.followers || 0) + 1;
    await this.save();
  }
  return this;
};

// Method to unfollow playlist
playlistSchema.methods.unfollow = async function(userId) {
  if (this.followers.includes(userId)) {
    this.followers = this.followers.filter(id => id.toString() !== userId.toString());
    this.stats.followers = Math.max(0, (this.stats.followers || 0) - 1);
    await this.save();
  }
  return this;
};

// Method to check if user liked this playlist
playlistSchema.methods.isLikedBy = function(userId) {
  return this.likedBy && this.likedBy.includes(userId);
};

// Method to like playlist
playlistSchema.methods.like = async function(userId) {
  if (!this.likedBy.includes(userId)) {
    this.likedBy.push(userId);
    this.stats.likes = (this.stats.likes || 0) + 1;
    await this.save();
  }
  return this;
};

// Method to unlike playlist
playlistSchema.methods.unlike = async function(userId) {
  if (this.likedBy.includes(userId)) {
    this.likedBy = this.likedBy.filter(id => id.toString() !== userId.toString());
    this.stats.likes = Math.max(0, (this.stats.likes || 0) - 1);
    await this.save();
  }
  return this;
};

// Static method to get popular playlists
playlistSchema.statics.getPopular = async function(limit = 10) {
  return this.find({ isPublic: true })
    .sort({ 'stats.followers': -1, 'stats.views': -1 })
    .limit(limit)
    .populate('user', 'name avatar');
};

// Static method to get trending playlists (based on recent activity)
playlistSchema.statics.getTrending = async function(days = 7, limit = 10) {
  const dateLimit = new Date();
  dateLimit.setDate(dateLimit.getDate() - days);
  
  return this.find({ 
    isPublic: true,
    createdAt: { $gte: dateLimit }
  })
    .sort({ 'stats.views': -1, 'stats.followers': -1 })
    .limit(limit)
    .populate('user', 'name avatar');
};

const Playlist = mongoose.models.Playlist || mongoose.model('Playlist', playlistSchema);
export default Playlist;