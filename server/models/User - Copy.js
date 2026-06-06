// server/models/User.js








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














// //working 6june server/models/User.js
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
//     title: String,
//     slug: String,
//     downloadedAt: { type: Date, default: Date.now }
//   }],
  
//   // ============================================
//   // ADDED: Payment Methods and Invoices
//   // ============================================
//   paymentMethods: [{
//     _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
//     cardNumber: { type: String, required: true },
//     cardHolder: { type: String, required: true },
//     expiryMonth: { type: String, required: true },
//     expiryYear: { type: String, required: true },
//     lastFourDigits: { type: String },
//     cardBrand: { type: String, enum: ['visa', 'mastercard', 'amex', 'rupay', 'other'], default: 'other' },
//     isDefault: { type: Boolean, default: false },
//     createdAt: { type: Date, default: Date.now },
//     lastUsed: { type: Date }
//   }],
  
//   invoices: [{
//     _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
//     invoiceNumber: { type: String, unique: true },
//     plan: { type: String, required: true },
//     amount: { type: Number, required: true },
//     originalAmount: { type: Number },
//     discountAmount: { type: Number, default: 0 },
//     currency: { type: String, default: 'INR' },
//     billingCycle: { type: String, enum: ['monthly', 'quarterly', 'yearly'], default: 'monthly' },
//     status: { type: String, enum: ['paid', 'pending', 'failed', 'refunded'], default: 'paid' },
//     paymentMethod: { type: String },
//     transactionId: { type: String },
//     paymentId: { type: String },
//     orderId: { type: String },
//     description: { type: String },
//     pdfUrl: { type: String },
//     createdAt: { type: Date, default: Date.now },
//     paidAt: { type: Date }
//   }],
  
//   deviceTokens: [String],
//   lastLogin: Date,
//   isActive: { type: Boolean, default: true },
//   isBanned: { type: Boolean, default: false }
// }, {
//   timestamps: true
// });

// // Indexes
// userSchema.index({ name: 'text', email: 'text' });
// userSchema.index({ 'downloads.contentType': 1 });
// userSchema.index({ 'downloads.downloadedAt': -1 });
// userSchema.index({ 'paymentMethods.isDefault': 1 });
// userSchema.index({ 'invoices.createdAt': -1 });

// // Generate invoice number before saving
// userSchema.pre('save', function(next) {
//   if (this.invoices && this.invoices.length > 0) {
//     this.invoices.forEach(invoice => {
//       if (!invoice.invoiceNumber) {
//         invoice.invoiceNumber = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
//       }
//     });
//   }
//   next();
// });

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

// // Get downloads with populated content
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
  // ============================================
  // UPDATED: Enhanced preferences with notification settings
  // ============================================
  preferences: {
    language: { type: String, default: 'en' },
    theme: { type: String, default: 'light' },
    // NEW: Master notification toggle
    notifications: { type: Boolean, default: true },
    // NEW: Last time user dismissed the global notice
    lastNoticeDismissed: { type: Date, default: null },
    // NEW: Email notification preferences
    emailNotifications: {
      type: Boolean,
      default: true
    },
    // NEW: Push notification preferences
    pushNotifications: {
      type: Boolean,
      default: true
    },
    // NEW: Specific notification types
    notificationTypes: {
      follows: { type: Boolean, default: true },
      likes: { type: Boolean, default: true },
      comments: { type: Boolean, default: true },
      newContent: { type: Boolean, default: true },
      subscription: { type: Boolean, default: true },
      system: { type: Boolean, default: true },
      announcements: { type: Boolean, default: true }
    },
    // NEW: Quiet hours settings
    quietHours: {
      enabled: { type: Boolean, default: false },
      start: { type: String, default: '22:00' },
      end: { type: String, default: '08:00' }
    },
    // NEW: Digest settings
    digest: {
      enabled: { type: Boolean, default: true },
      frequency: { type: String, enum: ['daily', 'weekly', 'never'], default: 'daily' }
    }
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
// NEW: Index for notification preferences queries
userSchema.index({ 'preferences.emailNotifications': 1 });
userSchema.index({ 'preferences.pushNotifications': 1 });

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

// ============================================
// NEW: Helper methods for preferences
// ============================================

// Check if user should receive a notification type
userSchema.methods.shouldReceiveNotification = function(notificationType) {
  if (!this.preferences.notifications) return false;
  
  const typeMap = {
    'follow': 'follows',
    'like': 'likes',
    'comment': 'comments',
    'new_content': 'newContent',
    'subscription': 'subscription',
    'system': 'system',
    'announcement': 'announcements'
  };
  
  const prefKey = typeMap[notificationType] || 'system';
  return this.preferences.notificationTypes[prefKey] !== false;
};

// Check if quiet hours are active
userSchema.methods.isQuietHours = function() {
  if (!this.preferences.quietHours.enabled) return false;
  
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  const { start, end } = this.preferences.quietHours;
  
  if (start <= end) {
    return currentTime >= start && currentTime <= end;
  } else {
    // Overnight quiet hours (e.g., 22:00 to 08:00)
    return currentTime >= start || currentTime <= end;
  }
};

// Get user's preferred notification channels
userSchema.methods.getNotificationChannels = function() {
  const channels = [];
  if (this.preferences.notifications && this.preferences.pushNotifications) {
    channels.push('push');
  }
  if (this.preferences.notifications && this.preferences.emailNotifications) {
    channels.push('email');
  }
  return channels;
};

// Update last notice dismissed timestamp
userSchema.methods.dismissGlobalNotice = function() {
  this.preferences.lastNoticeDismissed = new Date();
  return this.save();
};

// Check if global notice should be shown
userSchema.methods.shouldShowGlobalNotice = function(noticeCreatedAt) {
  if (!noticeCreatedAt) return true;
  if (!this.preferences.lastNoticeDismissed) return true;
  return new Date(noticeCreatedAt) > this.preferences.lastNoticeDismissed;
};

// Get public profile (updated to include preferences summary)
userSchema.methods.toPublicProfile = function() {
  return {
    id: this._id,
    name: this.name,
    avatar: this.avatar,
    bio: this.bio,
    role: this.role,
    subscription: this.subscription.plan,
    followersCount: this.followers?.length || 0,
    followingCount: this.following?.length || 0,
    // Include notification preferences summary
    preferences: {
      notifications: this.preferences.notifications,
      language: this.preferences.language,
      theme: this.preferences.theme
    }
  };
};

// Get full preferences (for settings page)
userSchema.methods.getFullPreferences = function() {
  return {
    language: this.preferences.language,
    theme: this.preferences.theme,
    notifications: this.preferences.notifications,
    emailNotifications: this.preferences.emailNotifications,
    pushNotifications: this.preferences.pushNotifications,
    notificationTypes: this.preferences.notificationTypes,
    quietHours: this.preferences.quietHours,
    digest: this.preferences.digest
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