//server/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  avatar: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters']
  },
  role: {
    type: String,
    enum: ['user', 'creator', 'admin', 'moderator'],
    default: 'user'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  googleId: {
    type: String,
    sparse: true
  },
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'basic', 'premium', 'pro'],
      default: 'free'
    },
    expiresAt: Date,
    startedAt: { type: Date, default: Date.now }
  },
  preferences: {
    language: { type: String, default: 'en' },
    theme: { type: String, default: 'light' },
    notifications: { type: Boolean, default: true }
  },
  favorites: {
    poems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Poem' }],
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    audio: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Audio' }],
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }]
  },
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  readingHistory: [{
    contentType: String,
    contentId: mongoose.Schema.Types.ObjectId,
    progress: Number,
    lastRead: { type: Date, default: Date.now }
  }],
  downloads: [{
    contentType: String,
    contentId: mongoose.Schema.Types.ObjectId,
    downloadedAt: { type: Date, default: Date.now }
  }],
  deviceTokens: [String],
  lastLogin: Date,
  isActive: { type: Boolean, default: true },
  isBanned: { type: Boolean, default: false }
}, {
  timestamps: true
});

// Index for search
userSchema.index({ name: 'text', email: 'text' });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Get public profile
userSchema.methods.toPublicProfile = function() {
  return {
    id: this._id,
    name: this.name,
    avatar: this.avatar,
    bio: this.bio,
    role: this.role,
    subscription: this.subscription.plan,
    followersCount: this.followers?.length || 0,
    followingCount: this.following?.length || 0
  };
};

const User = mongoose.model('User', userSchema);
export default User;
