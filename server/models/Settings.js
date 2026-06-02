// // server/models/Settings.js
// import mongoose from 'mongoose';

// const settingsSchema = new mongoose.Schema({
//   // General Settings
//   siteName: {
//     type: String,
//     default: 'ZauqApp'
//   },
//   siteDescription: {
//     type: String,
//     default: 'AI Powered Urdu Literary Ecosystem'
//   },
//   siteLogo: {
//     type: String,
//     default: ''
//   },
//   siteFavicon: {
//     type: String,
//     default: ''
//   },
//   contactEmail: {
//     type: String,
//     default: 'admin@zauqapp.com'
//   },
//   contactPhone: {
//     type: String,
//     default: ''
//   },
//   address: {
//     type: String,
//     default: ''
//   },
  
//   // Content Settings
//   itemsPerPage: {
//     type: Number,
//     default: 12
//   },
//   enableComments: {
//     type: Boolean,
//     default: true
//   },
//   enableRatings: {
//     type: Boolean,
//     default: true
//   },
//   autoApproveContent: {
//     type: Boolean,
//     default: false
//   },
//   enableUserUploads: {
//     type: Boolean,
//     default: true
//   },
  
//   // Media Settings
//   maxImageSize: {
//     type: Number,
//     default: 5
//   },
//   maxVideoSize: {
//     type: Number,
//     default: 500
//   },
//   maxAudioSize: {
//     type: Number,
//     default: 100
//   },
//   allowedImageFormats: {
//     type: [String],
//     default: ['jpg', 'jpeg', 'png', 'webp']
//   },
//   allowedVideoFormats: {
//     type: [String],
//     default: ['mp4', 'webm', 'mov']
//   },
//   allowedAudioFormats: {
//     type: [String],
//     default: ['mp3', 'wav', 'ogg']
//   },
  
//   // Security Settings
//   enableTwoFactor: {
//     type: Boolean,
//     default: false
//   },
//   sessionTimeout: {
//     type: Number,
//     default: 60
//   },
//   maxLoginAttempts: {
//     type: Number,
//     default: 5
//   },
//   passwordExpiryDays: {
//     type: Number,
//     default: 90
//   },
//   enableCaptcha: {
//     type: Boolean,
//     default: true
//   },
  
//   // Email Settings
//   smtpHost: {
//     type: String,
//     default: ''
//   },
//   smtpPort: {
//     type: Number,
//     default: 587
//   },
//   smtpUser: {
//     type: String,
//     default: ''
//   },
//   smtpPassword: {
//     type: String,
//     default: ''
//   },
//   senderEmail: {
//     type: String,
//     default: ''
//   },
//   senderName: {
//     type: String,
//     default: ''
//   },
  
//   // API Settings
//   apiKeys: [{
//     name: String,
//     key: String,
//     createdAt: { type: Date, default: Date.now }
//   }],
//   webhookUrl: {
//     type: String,
//     default: ''
//   },
  
//   // Payment Settings
//   currency: {
//     type: String,
//     default: 'INR'
//   },
//   razorpayKey: {
//     type: String,
//     default: ''
//   },
//   razorpaySecret: {
//     type: String,
//     default: ''
//   },
//   stripeKey: {
//     type: String,
//     default: ''
//   },
//   stripeSecret: {
//     type: String,
//     default: ''
//   },
  
//   // Cache Settings
//   enableCache: {
//     type: Boolean,
//     default: true
//   },
//   cacheDuration: {
//     type: Number,
//     default: 3600
//   },
//   enableCDN: {
//     type: Boolean,
//     default: false
//   },
//   cdnUrl: {
//     type: String,
//     default: ''
//   },
  
//   // Maintenance Mode
//   maintenanceMode: {
//     type: Boolean,
//     default: false
//   },
//   maintenanceMessage: {
//     type: String,
//     default: 'Site is under maintenance. Please check back later.'
//   },
  
//   // Appearance Settings
//   theme: {
//     type: String,
//     enum: ['light', 'dark', 'system'],
//     default: 'light'
//   },
//   primaryColor: {
//     type: String,
//     default: '#8B4513'
//   },
//   secondaryColor: {
//     type: String,
//     default: '#DAA520'
//   },
//   fontFamily: {
//     type: String,
//     default: 'Inter'
//   }
// }, {
//   timestamps: true
// });

// const Settings = mongoose.model('Settings', settingsSchema);
// export default Settings;












// server/models/Settings.js
import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  // General Settings
  siteName: {
    type: String,
    default: 'ZauqApp'
  },
  siteDescription: {
    type: String,
    default: 'AI Powered Urdu Literary Ecosystem'
  },
  siteLogo: {
    type: String,
    default: ''
  },
  siteFavicon: {
    type: String,
    default: ''
  },
  contactEmail: {
    type: String,
    default: 'admin@zauqapp.com'
  },
  // ============================================
  // 🔴 FIX: These fields exist but need to be saved properly
  // ============================================
  contactPhone: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  
  // Content Settings
  itemsPerPage: {
    type: Number,
    default: 12
  },
  enableComments: {
    type: Boolean,
    default: true
  },
  enableRatings: {
    type: Boolean,
    default: true
  },
  autoApproveContent: {
    type: Boolean,
    default: false
  },
  enableUserUploads: {
    type: Boolean,
    default: true
  },
  
  // Media Settings
  maxImageSize: {
    type: Number,
    default: 5
  },
  maxVideoSize: {
    type: Number,
    default: 500
  },
  maxAudioSize: {
    type: Number,
    default: 100
  },
  allowedImageFormats: {
    type: [String],
    default: ['jpg', 'jpeg', 'png', 'webp']
  },
  allowedVideoFormats: {
    type: [String],
    default: ['mp4', 'webm', 'mov']
  },
  allowedAudioFormats: {
    type: [String],
    default: ['mp3', 'wav', 'ogg']
  },
  
  // Security Settings
  enableTwoFactor: {
    type: Boolean,
    default: false
  },
  sessionTimeout: {
    type: Number,
    default: 60
  },
  maxLoginAttempts: {
    type: Number,
    default: 5
  },
  passwordExpiryDays: {
    type: Number,
    default: 90
  },
  enableCaptcha: {
    type: Boolean,
    default: true
  },
  
  // Email Settings
  smtpHost: {
    type: String,
    default: ''
  },
  smtpPort: {
    type: Number,
    default: 587
  },
  smtpUser: {
    type: String,
    default: ''
  },
  smtpPassword: {
    type: String,
    default: ''
  },
  senderEmail: {
    type: String,
    default: ''
  },
  senderName: {
    type: String,
    default: ''
  },
  
  // API Settings
  apiKeys: [{
    name: String,
    key: String,
    createdAt: { type: Date, default: Date.now }
  }],
  webhookUrl: {
    type: String,
    default: ''
  },
  
  // Payment Settings
  currency: {
    type: String,
    default: 'INR'
  },
  razorpayKey: {
    type: String,
    default: ''
  },
  razorpaySecret: {
    type: String,
    default: ''
  },
  stripeKey: {
    type: String,
    default: ''
  },
  stripeSecret: {
    type: String,
    default: ''
  },
  
  // Cache Settings
  enableCache: {
    type: Boolean,
    default: true
  },
  cacheDuration: {
    type: Number,
    default: 3600
  },
  enableCDN: {
    type: Boolean,
    default: false
  },
  cdnUrl: {
    type: String,
    default: ''
  },
  
  // Maintenance Mode
  maintenanceMode: {
    type: Boolean,
    default: false
  },
  maintenanceMessage: {
    type: String,
    default: 'Site is under maintenance. Please check back later.'
  },
  
  // Appearance Settings
  theme: {
    type: String,
    enum: ['light', 'dark', 'system'],
    default: 'light'
  },
  primaryColor: {
    type: String,
    default: '#8B4513'
  },
  secondaryColor: {
    type: String,
    default: '#DAA520'
  },
  fontFamily: {
    type: String,
    default: 'Inter'
  }
}, {
  timestamps: true
});

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;