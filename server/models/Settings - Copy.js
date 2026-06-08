


















// // server/models/Settings.js
// import mongoose from 'mongoose';

// const settingsSchema = new mongoose.Schema({
//   // General Settings
//   siteName: { type: String, default: 'ZauqApp' },
//   siteDescription: { type: String, default: 'AI Powered Urdu Literary Ecosystem' },
//   siteLogo: { type: String, default: '' },
//   siteFavicon: { type: String, default: '' },
//   contactEmail: { type: String, default: 'admin@zauqapp.com' },
//   contactPhone: { type: String, default: '' },
//   address: { type: String, default: '' },
  
//   // SEO & Social Settings
//   metaTitle: { type: String, default: '' },
//   metaDescription: { type: String, default: '' },
//   metaKeywords: { type: [String], default: [] },
//   ogImage: { type: String, default: '' },
//   twitterHandle: { type: String, default: '' },
  
//   // Social Links
//   facebook: { type: String, default: '' },
//   twitter: { type: String, default: '' },
//   instagram: { type: String, default: '' },
//   youtube: { type: String, default: '' },
//   linkedin: { type: String, default: '' },
//   github: { type: String, default: '' },
  
//   // Footer Settings
//   footerText: { type: String, default: 'Discover the beauty of Urdu literature' },
//   footerColumns: { type: Array, default: [] },
//   showNewsletter: { type: Boolean, default: true },
//   copyrightText: { type: String, default: '' },
  
//   // Announcement Settings
//   showAnnouncement: { type: Boolean, default: false },
//   announcementText: { type: String, default: '' },
//   announcementLink: { type: String, default: '' },
//   announcementExpiry: { type: Date, default: null },
  
//   // Content Settings
//   itemsPerPage: { type: Number, default: 12 },
//   enableComments: { type: Boolean, default: true },
//   enableRatings: { type: Boolean, default: true },
//   autoApproveContent: { type: Boolean, default: false },
//   enableUserUploads: { type: Boolean, default: true },
  
//   // Media Settings
//   maxImageSize: { type: Number, default: 5 },
//   maxVideoSize: { type: Number, default: 500 },
//   maxAudioSize: { type: Number, default: 100 },
//   allowedImageFormats: { type: [String], default: ['jpg', 'jpeg', 'png', 'webp'] },
//   allowedVideoFormats: { type: [String], default: ['mp4', 'webm', 'mov'] },
//   allowedAudioFormats: { type: [String], default: ['mp3', 'wav', 'ogg'] },
  
//   // Security Settings
//   enableTwoFactor: { type: Boolean, default: false },
//   sessionTimeout: { type: Number, default: 60 },
//   maxLoginAttempts: { type: Number, default: 5 },
//   passwordExpiryDays: { type: Number, default: 90 },
//   enableCaptcha: { type: Boolean, default: true },
  
//   // Email Settings
//   smtpHost: { type: String, default: '' },
//   smtpPort: { type: Number, default: 587 },
//   smtpUser: { type: String, default: '' },
//   smtpPassword: { type: String, default: '' },
//   senderEmail: { type: String, default: '' },
//   senderName: { type: String, default: '' },
  
//   // API Settings
//   apiKeys: [{
//     _id: { type: String },
//     name: String,
//     key: String,
//     createdAt: { type: Date, default: Date.now }
//   }],
//   webhookUrl: { type: String, default: '' },
  
//   // Payment Settings
//   currency: { type: String, default: 'INR' },
//   razorpayKey: { type: String, default: '' },
//   razorpaySecret: { type: String, default: '' },
//   stripeKey: { type: String, default: '' },
//   stripeSecret: { type: String, default: '' },
  
//   // Cache Settings
//   enableCache: { type: Boolean, default: true },
//   cacheDuration: { type: Number, default: 3600 },
//   enableCDN: { type: Boolean, default: false },
//   cdnUrl: { type: String, default: '' },
  
//   // Maintenance Mode
//   maintenanceMode: { type: Boolean, default: false },
//   maintenanceMessage: { type: String, default: 'Site is under maintenance. Please check back later.' },
  
//   // Appearance Settings
//   theme: { type: String, enum: ['light', 'dark', 'system'], default: 'light' },
//   primaryColor: { type: String, default: '#8B4513' },
//   secondaryColor: { type: String, default: '#DAA520' },
//   fontFamily: { type: String, default: 'Inter' }
// }, {
//   timestamps: true
// });

// // Ensure settings document exists
// settingsSchema.statics.getSettings = async function() {
//   let settings = await this.findOne();
//   if (!settings) {
//     settings = await this.create({});
//   }
//   return settings;
// };

// const Settings = mongoose.model('Settings', settingsSchema);
// export default Settings;












import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  // General Settings
  siteName: { type: String, default: 'ZauqApp' },
  siteDescription: { type: String, default: 'AI Powered Urdu Literary Ecosystem' },
  siteLogo: { type: String, default: '' },
  siteFavicon: { type: String, default: '' },
  contactEmail: { 
    type: String, 
    default: 'admin@zauqapp.com',
    match: /.+\@.+\..+/ 
  },
  contactPhone: { type: String, default: '' },
  address: { type: String, default: '' },

  // SEO
  metaTitle: { type: String, default: '' },
  metaDescription: { type: String, default: '' },
  metaKeywords: { type: [String], default: [] },
  ogImage: { type: String, default: '' },
  twitterHandle: { type: String, default: '' },

  // Social
  facebook: { type: String, default: '' },
  twitter: { type: String, default: '' },
  instagram: { type: String, default: '' },
  youtube: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  github: { type: String, default: '' },

  // Footer (FIXED STRUCTURE)
  footerText: { type: String, default: 'Discover the beauty of Urdu literature' },
  footerColumns: [{
    title: String,
    links: [{
      label: String,
      url: String
    }]
  }],
  showNewsletter: { type: Boolean, default: true },
  copyrightText: { type: String, default: '' },

  // Announcement
  showAnnouncement: { type: Boolean, default: false },
  announcementText: { type: String, default: '' },
  announcementLink: { type: String, default: '' },
  announcementExpiry: { type: Date, default: null },

  // Content
  itemsPerPage: { type: Number, default: 12 },
  enableComments: { type: Boolean, default: true },
  enableRatings: { type: Boolean, default: true },
  autoApproveContent: { type: Boolean, default: false },
  enableUserUploads: { type: Boolean, default: true },

  // Media
  maxImageSize: { type: Number, default: 5 },
  maxVideoSize: { type: Number, default: 500 },
  maxAudioSize: { type: Number, default: 100 },
  allowedImageFormats: { type: [String], default: ['jpg', 'jpeg', 'png', 'webp'] },
  allowedVideoFormats: { type: [String], default: ['mp4', 'webm', 'mov'] },
  allowedAudioFormats: { type: [String], default: ['mp3', 'wav', 'ogg'] },

  // Security
  enableTwoFactor: { type: Boolean, default: false },
  sessionTimeout: { type: Number, default: 60 },
  maxLoginAttempts: { type: Number, default: 5 },
  passwordExpiryDays: { type: Number, default: 90 },
  enableCaptcha: { type: Boolean, default: true },

  // Email
  smtpHost: { type: String, default: '' },
  smtpPort: { type: Number, default: 587 },
  smtpUser: { type: String, default: '' },
  smtpPassword: { type: String, default: '' },
  senderEmail: { type: String, default: '' },
  senderName: { type: String, default: '' },

  // API (FIXED)
  apiKeys: [{
    name: String,
    key: String,
    createdAt: { type: Date, default: Date.now }
  }],
  webhookUrl: { type: String, default: '' },

  // Payment
  currency: { type: String, default: 'INR' },
  razorpayKey: { type: String, default: '' },
  razorpaySecret: { type: String, default: '' },
  stripeKey: { type: String, default: '' },
  stripeSecret: { type: String, default: '' },

  // Cache
  enableCache: { type: Boolean, default: true },
  cacheDuration: { type: Number, default: 3600 },
  enableCDN: { type: Boolean, default: false },
  cdnUrl: { type: String, default: '' },

  // Maintenance
  maintenanceMode: { type: Boolean, default: false },
  maintenanceMessage: { 
    type: String, 
    default: 'Site is under maintenance. Please check back later.' 
  },

  // Appearance
  theme: { type: String, enum: ['light', 'dark', 'system'], default: 'light' },
  primaryColor: { type: String, default: '#8B4513' },
  secondaryColor: { type: String, default: '#DAA520' },
  fontFamily: { type: String, default: 'Inter' }

}, { timestamps: true });


// ✅ SINGLETON SETTINGS (CRITICAL FIX)
settingsSchema.statics.getSettings = async function () {
  let settings = await this.findById("global_settings");

  if (!settings) {
    settings = await this.create({ _id: "global_settings" });
  }

  return settings;
};

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;