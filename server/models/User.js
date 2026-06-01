// //server/models/User.js
// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Name is required'],
//     trim: true,
//     maxlength: [100, 'Name cannot exceed 100 characters']
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//     lowercase: true,
//     trim: true
//   },
//   password: {
//     type: String,
//     minlength: [6, 'Password must be at least 6 characters'],
//     select: false
//   },
//   avatar: {
//     type: String,
//     default: ''
//   },
//   bio: {
//     type: String,
//     maxlength: [500, 'Bio cannot exceed 500 characters']
//   },
//   role: {
//     type: String,
//     enum: ['user', 'creator', 'admin', 'moderator'],
//     default: 'user'
//   },
//   isVerified: {
//     type: Boolean,
//     default: false
//   },
//   googleId: {
//     type: String,
//     sparse: true
//   },
//   subscription: {
//     plan: {
//       type: String,
//       enum: ['free', 'basic', 'premium', 'pro'],
//       default: 'free'
//     },
//     expiresAt: Date,
//     startedAt: { type: Date, default: Date.now }
//   },
//   preferences: {
//     language: { type: String, default: 'en' },
//     theme: { type: String, default: 'light' },
//     notifications: { type: Boolean, default: true }
//   },
//   favorites: {
//     poems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Poem' }],
//     books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
//     audio: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Audio' }],
//     videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }]
//   },
//   following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }],
//   followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   readingHistory: [{
//     contentType: String,
//     contentId: mongoose.Schema.Types.ObjectId,
//     progress: Number,
//     lastRead: { type: Date, default: Date.now }
//   }],
//   downloads: [{
//     contentType: String,
//     contentId: mongoose.Schema.Types.ObjectId,
//     downloadedAt: { type: Date, default: Date.now }
//   }],
//   deviceTokens: [String],
//   lastLogin: Date,
//   isActive: { type: Boolean, default: true },
//   isBanned: { type: Boolean, default: false }
// }, {
//   timestamps: true
// });

// // Index for search
// userSchema.index({ name: 'text', email: 'text' });

// // Hash password before saving
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// // Compare password
// userSchema.methods.comparePassword = async function(candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// // Get public profile
// userSchema.methods.toPublicProfile = function() {
//   return {
//     id: this._id,
//     name: this.name,
//     avatar: this.avatar,
//     bio: this.bio,
//     role: this.role,
//     subscription: this.subscription.plan,
//     followersCount: this.followers?.length || 0,
//     followingCount: this.following?.length || 0
//   };
// };

// const User = mongoose.model('User', userSchema);
// export default User;









// //working
// //server/models/User.js
// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Name is required'],
//     trim: true,
//     maxlength: [100, 'Name cannot exceed 100 characters']
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//     lowercase: true,
//     trim: true
//   },
//   password: {
//     type: String,
//     minlength: [6, 'Password must be at least 6 characters'],
//     select: false
//   },
//   avatar: {
//     type: String,
//     default: ''
//   },
//   bio: {
//     type: String,
//     maxlength: [500, 'Bio cannot exceed 500 characters']
//   },
//   role: {
//     type: String,
//     enum: ['user', 'creator', 'admin', 'moderator'],
//     default: 'user'
//   },
//   isVerified: {
//     type: Boolean,
//     default: false
//   },
//   googleId: {
//     type: String,
//     sparse: true
//   },
//   subscription: {
//     plan: {
//       type: String,
//       enum: ['free', 'basic', 'premium', 'pro'],
//       default: 'free'
//     },
//     expiresAt: Date,
//     startedAt: { type: Date, default: Date.now }
//   },
//   preferences: {
//     language: { type: String, default: 'en' },
//     theme: { type: String, default: 'light' },
//     notifications: { type: Boolean, default: true }
//   },
//   favorites: {
//     poems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Poem' }],
//     books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
//     audio: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Audio' }],
//     videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }]
//   },
//   following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }],
//   followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   readingHistory: [{
//     contentType: String,
//     contentId: mongoose.Schema.Types.ObjectId,
//     progress: Number,
//     lastRead: { type: Date, default: Date.now }
//   }],
//   // ============================================
//   // UPDATED: Added 'title' field to downloads schema
//   // ============================================
//   downloads: [{
//     contentType: String,           // 'book', 'poem', 'audio', 'video'
//     contentId: mongoose.Schema.Types.ObjectId,  // Reference to the content
//     title: String,                 // NEW: Store title for quick access (avoid population)
//     downloadedAt: { type: Date, default: Date.now }
//   }],
//   deviceTokens: [String],
//   lastLogin: Date,
//   isActive: { type: Boolean, default: true },
//   isBanned: { type: Boolean, default: false }
// }, {
//   timestamps: true
// });

// // Index for search
// userSchema.index({ name: 'text', email: 'text' });

// // Hash password before saving
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// // Compare password
// userSchema.methods.comparePassword = async function(candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// // Get public profile
// userSchema.methods.toPublicProfile = function() {
//   return {
//     id: this._id,
//     name: this.name,
//     avatar: this.avatar,
//     bio: this.bio,
//     role: this.role,
//     subscription: this.subscription.plan,
//     followersCount: this.followers?.length || 0,
//     followingCount: this.following?.length || 0
//   };
// };

// const User = mongoose.model('User', userSchema);
// export default User;











// // server/models/User.js
// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Name is required'],
//     trim: true,
//     maxlength: [100, 'Name cannot exceed 100 characters']
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//     lowercase: true,
//     trim: true
//   },
//   password: {
//     type: String,
//     minlength: [6, 'Password must be at least 6 characters'],
//     select: false
//   },
//   avatar: {
//     type: String,
//     default: ''
//   },
//   bio: {
//     type: String,
//     maxlength: [500, 'Bio cannot exceed 500 characters']
//   },
//   role: {
//     type: String,
//     enum: ['user', 'creator', 'admin', 'moderator'],
//     default: 'user'
//   },
//   isVerified: {
//     type: Boolean,
//     default: false
//   },
//   googleId: {
//     type: String,
//     sparse: true
//   },
//   subscription: {
//     plan: {
//       type: String,
//       enum: ['free', 'basic', 'premium', 'pro'],
//       default: 'free'
//     },
//     expiresAt: Date,
//     startedAt: { type: Date, default: Date.now }
//   },
//   preferences: {
//     language: { type: String, default: 'en' },
//     theme: { type: String, default: 'light' },
//     notifications: { type: Boolean, default: true }
//   },
//   favorites: {
//     poems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Poem' }],
//     books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
//     audio: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Audio' }],
//     videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }]
//   },
//   following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }],
//   followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   readingHistory: [{
//     contentType: String,
//     contentId: mongoose.Schema.Types.ObjectId,
//     progress: Number,
//     lastRead: { type: Date, default: Date.now }
//   }],
//   // ============================================
//   // UPDATED: Added 'slug' field to downloads schema
//   // ============================================
//   downloads: [{
//     contentType: String,           // 'book', 'poem', 'audio', 'video'
//     contentId: mongoose.Schema.Types.ObjectId,  // Reference to the content
//     title: String,                 // Store title for quick access
//     slug: String,                  // NEW: Store slug for books/poems (important for URL routing)
//     downloadedAt: { type: Date, default: Date.now }
//   }],
//   deviceTokens: [String],
//   lastLogin: Date,
//   isActive: { type: Boolean, default: true },
//   isBanned: { type: Boolean, default: false }
// }, {
//   timestamps: true
// });

// // Index for search
// userSchema.index({ name: 'text', email: 'text' });

// // Index for downloads queries
// userSchema.index({ 'downloads.contentType': 1 });
// userSchema.index({ 'downloads.downloadedAt': -1 });

// // Hash password before saving
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// // Compare password
// userSchema.methods.comparePassword = async function(candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// // Get public profile
// userSchema.methods.toPublicProfile = function() {
//   return {
//     id: this._id,
//     name: this.name,
//     avatar: this.avatar,
//     bio: this.bio,
//     role: this.role,
//     subscription: this.subscription.plan,
//     followersCount: this.followers?.length || 0,
//     followingCount: this.following?.length || 0
//   };
// };

// // Get downloads with populated content (optional helper method)
// userSchema.methods.getPopulatedDownloads = async function() {
//   const populatedDownloads = [];
  
//   for (const download of this.downloads) {
//     let ContentModel;
//     switch (download.contentType) {
//       case 'book':
//         ContentModel = mongoose.model('Book');
//         break;
//       case 'poem':
//         ContentModel = mongoose.model('Poem');
//         break;
//       case 'audio':
//         ContentModel = mongoose.model('Audio');
//         break;
//       case 'video':
//         ContentModel = mongoose.model('Video');
//         break;
//       default:
//         continue;
//     }
    
//     const content = await ContentModel.findById(download.contentId).select('title slug coverImage');
//     populatedDownloads.push({
//       ...download.toObject(),
//       content
//     });
//   }
  
//   return populatedDownloads;
// };

// const User = mongoose.model('User', userSchema);
// export default User;














// server/models/User.js
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
    title: String,
    slug: String,
    downloadedAt: { type: Date, default: Date.now }
  }],
  
  // ============================================
  // ADDED: Payment Methods and Invoices
  // ============================================
  paymentMethods: [{
    _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    cardNumber: { type: String, required: true },
    cardHolder: { type: String, required: true },
    expiryMonth: { type: String, required: true },
    expiryYear: { type: String, required: true },
    lastFourDigits: { type: String },
    cardBrand: { type: String, enum: ['visa', 'mastercard', 'amex', 'rupay', 'other'], default: 'other' },
    isDefault: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    lastUsed: { type: Date }
  }],
  
  invoices: [{
    _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    invoiceNumber: { type: String, unique: true },
    plan: { type: String, required: true },
    amount: { type: Number, required: true },
    originalAmount: { type: Number },
    discountAmount: { type: Number, default: 0 },
    currency: { type: String, default: 'INR' },
    billingCycle: { type: String, enum: ['monthly', 'quarterly', 'yearly'], default: 'monthly' },
    status: { type: String, enum: ['paid', 'pending', 'failed', 'refunded'], default: 'paid' },
    paymentMethod: { type: String },
    transactionId: { type: String },
    paymentId: { type: String },
    orderId: { type: String },
    description: { type: String },
    pdfUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
    paidAt: { type: Date }
  }],
  
  deviceTokens: [String],
  lastLogin: Date,
  isActive: { type: Boolean, default: true },
  isBanned: { type: Boolean, default: false }
}, {
  timestamps: true
});

// Indexes
userSchema.index({ name: 'text', email: 'text' });
userSchema.index({ 'downloads.contentType': 1 });
userSchema.index({ 'downloads.downloadedAt': -1 });
userSchema.index({ 'paymentMethods.isDefault': 1 });
userSchema.index({ 'invoices.createdAt': -1 });

// Generate invoice number before saving
userSchema.pre('save', function(next) {
  if (this.invoices && this.invoices.length > 0) {
    this.invoices.forEach(invoice => {
      if (!invoice.invoiceNumber) {
        invoice.invoiceNumber = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      }
    });
  }
  next();
});

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

// Get downloads with populated content
userSchema.methods.getPopulatedDownloads = async function() {
  const populatedDownloads = [];
  
  for (const download of this.downloads) {
    let ContentModel;
    switch (download.contentType) {
      case 'book':
        ContentModel = mongoose.model('Book');
        break;
      case 'poem':
        ContentModel = mongoose.model('Poem');
        break;
      case 'audio':
        ContentModel = mongoose.model('Audio');
        break;
      case 'video':
        ContentModel = mongoose.model('Video');
        break;
      default:
        continue;
    }
    
    const content = await ContentModel.findById(download.contentId).select('title slug coverImage');
    populatedDownloads.push({
      ...download.toObject(),
      content
    });
  }
  
  return populatedDownloads;
};

const User = mongoose.model('User', userSchema);
export default User;