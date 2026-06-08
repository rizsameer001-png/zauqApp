
// // server/models/Settings.js

// import mongoose from 'mongoose';

// const settingsSchema = new mongoose.Schema({
//   // General Settings
//   siteName: { type: String, default: 'ZauqApp' },
//   siteDescription: { type: String, default: 'AI Powered Urdu Literary Ecosystem' },
//   siteLogo: { type: String, default: '' },
//   siteFavicon: { type: String, default: '' },
//   contactEmail: { 
//     type: String, 
//     default: 'admin@zauqapp.com',
//     match: /.+\@.+\..+/ 
//   },
//   contactPhone: { type: String, default: '' },
//   address: { type: String, default: '' },

//   // SEO
//   metaTitle: { type: String, default: '' },
//   metaDescription: { type: String, default: '' },
//   metaKeywords: { type: [String], default: [] },
//   ogImage: { type: String, default: '' },
//   twitterHandle: { type: String, default: '' },

//   // Social
//   facebook: { type: String, default: '' },
//   twitter: { type: String, default: '' },
//   instagram: { type: String, default: '' },
//   youtube: { type: String, default: '' },
//   linkedin: { type: String, default: '' },
//   github: { type: String, default: '' },

//   // Footer (FIXED STRUCTURE)
//   footerText: { type: String, default: 'Discover the beauty of Urdu literature' },
//   footerColumns: [{
//     title: String,
//     links: [{
//       label: String,
//       url: String
//     }]
//   }],
//   showNewsletter: { type: Boolean, default: true },
//   copyrightText: { type: String, default: '' },

//   // Announcement
//   showAnnouncement: { type: Boolean, default: false },
//   announcementText: { type: String, default: '' },
//   announcementLink: { type: String, default: '' },
//   announcementExpiry: { type: Date, default: null },

//   // Content
//   itemsPerPage: { type: Number, default: 12 },
//   enableComments: { type: Boolean, default: true },
//   enableRatings: { type: Boolean, default: true },
//   autoApproveContent: { type: Boolean, default: false },
//   enableUserUploads: { type: Boolean, default: true },

//   // Media
//   maxImageSize: { type: Number, default: 5 },
//   maxVideoSize: { type: Number, default: 500 },
//   maxAudioSize: { type: Number, default: 100 },
//   allowedImageFormats: { type: [String], default: ['jpg', 'jpeg', 'png', 'webp'] },
//   allowedVideoFormats: { type: [String], default: ['mp4', 'webm', 'mov'] },
//   allowedAudioFormats: { type: [String], default: ['mp3', 'wav', 'ogg'] },

//   // Security
//   enableTwoFactor: { type: Boolean, default: false },
//   sessionTimeout: { type: Number, default: 60 },
//   maxLoginAttempts: { type: Number, default: 5 },
//   passwordExpiryDays: { type: Number, default: 90 },
//   enableCaptcha: { type: Boolean, default: true },

//   // Email
//   smtpHost: { type: String, default: '' },
//   smtpPort: { type: Number, default: 587 },
//   smtpUser: { type: String, default: '' },
//   smtpPassword: { type: String, default: '' },
//   senderEmail: { type: String, default: '' },
//   senderName: { type: String, default: '' },

//   // API (FIXED)
//   apiKeys: [{
//     name: String,
//     key: String,
//     createdAt: { type: Date, default: Date.now }
//   }],
//   webhookUrl: { type: String, default: '' },

//   // Payment
//   currency: { type: String, default: 'INR' },
//   razorpayKey: { type: String, default: '' },
//   razorpaySecret: { type: String, default: '' },
//   stripeKey: { type: String, default: '' },
//   stripeSecret: { type: String, default: '' },

//   // Cache
//   enableCache: { type: Boolean, default: true },
//   cacheDuration: { type: Number, default: 3600 },
//   enableCDN: { type: Boolean, default: false },
//   cdnUrl: { type: String, default: '' },

//   // Maintenance
//   maintenanceMode: { type: Boolean, default: false },
//   maintenanceMessage: { 
//     type: String, 
//     default: 'Site is under maintenance. Please check back later.' 
//   },

//   // Appearance
//   theme: { type: String, enum: ['light', 'dark', 'system'], default: 'light' },
//   primaryColor: { type: String, default: '#8B4513' },
//   secondaryColor: { type: String, default: '#DAA520' },
//   fontFamily: { type: String, default: 'Inter' }

// }, { timestamps: true });


// // ✅ SINGLETON SETTINGS (CRITICAL FIX)
// settingsSchema.statics.getSettings = async function () {
//   let settings = await this.findById("global_settings");

//   if (!settings) {
//     settings = await this.create({ _id: "global_settings" });
//   }

//   return settings;
// };

// const Settings = mongoose.model('Settings', settingsSchema);
// export default Settings;

















// // server/models/Settings.js
// import mongoose from 'mongoose';

// const settingsSchema = new mongoose.Schema({
//   // General Settings
//   siteName: { type: String, default: 'ZauqApp' },
//   siteDescription: { type: String, default: 'AI Powered Urdu Literary Ecosystem' },
//   siteLogo: { type: String, default: '' },
//   siteFavicon: { type: String, default: '' },
//   contactEmail: { 
//     type: String, 
//     default: 'admin@zauqapp.com',
//     match: /.+\@.+\..+/ 
//   },
//   contactPhone: { type: String, default: '' },
//   address: { type: String, default: '' },

//   // SEO
//   metaTitle: { type: String, default: '' },
//   metaDescription: { type: String, default: '' },
//   metaKeywords: { type: [String], default: [] },
//   ogImage: { type: String, default: '' },
//   twitterHandle: { type: String, default: '' },

//   // Social
//   facebook: { type: String, default: '' },
//   twitter: { type: String, default: '' },
//   instagram: { type: String, default: '' },
//   youtube: { type: String, default: '' },
//   linkedin: { type: String, default: '' },
//   github: { type: String, default: '' },

//   // Footer (FIXED STRUCTURE)
//   footerText: { type: String, default: 'Discover the beauty of Urdu literature' },
//   footerColumns: [{
//     title: String,
//     links: [{
//       label: String,
//       url: String
//     }]
//   }],
//   showNewsletter: { type: Boolean, default: true },
//   copyrightText: { type: String, default: '' },

//   // Announcement
//   showAnnouncement: { type: Boolean, default: false },
//   announcementText: { type: String, default: '' },
//   announcementLink: { type: String, default: '' },
//   announcementExpiry: { type: Date, default: null },

//   // Content
//   itemsPerPage: { type: Number, default: 12 },
//   enableComments: { type: Boolean, default: true },
//   enableRatings: { type: Boolean, default: true },
//   autoApproveContent: { type: Boolean, default: false },
//   enableUserUploads: { type: Boolean, default: true },

//   // Media
//   maxImageSize: { type: Number, default: 5 },
//   maxVideoSize: { type: Number, default: 500 },
//   maxAudioSize: { type: Number, default: 100 },
//   allowedImageFormats: { type: [String], default: ['jpg', 'jpeg', 'png', 'webp'] },
//   allowedVideoFormats: { type: [String], default: ['mp4', 'webm', 'mov'] },
//   allowedAudioFormats: { type: [String], default: ['mp3', 'wav', 'ogg'] },

//   // Security
//   enableTwoFactor: { type: Boolean, default: false },
//   sessionTimeout: { type: Number, default: 60 },
//   maxLoginAttempts: { type: Number, default: 5 },
//   passwordExpiryDays: { type: Number, default: 90 },
  
//   // ============================================
//   // 🔴 NEW: CAPTCHA Settings
//   // ============================================
//   enableCaptcha: { type: Boolean, default: false },
//   captchaSiteKey: { type: String, default: '' },
//   captchaSecretKey: { type: String, default: '' },
//   captchaType: { type: String, enum: ['v2', 'v3'], default: 'v2' },

//   // Email
//   smtpHost: { type: String, default: '' },
//   smtpPort: { type: Number, default: 587 },
//   smtpUser: { type: String, default: '' },
//   smtpPassword: { type: String, default: '' },
//   senderEmail: { type: String, default: '' },
//   senderName: { type: String, default: '' },

//   // API (FIXED)
//   apiKeys: [{
//     name: String,
//     key: String,
//     createdAt: { type: Date, default: Date.now }
//   }],
//   webhookUrl: { type: String, default: '' },

//   // Payment
//   currency: { type: String, default: 'INR' },
//   razorpayKey: { type: String, default: '' },
//   razorpaySecret: { type: String, default: '' },
//   stripeKey: { type: String, default: '' },
//   stripeSecret: { type: String, default: '' },

//   // Cache
//   enableCache: { type: Boolean, default: true },
//   cacheDuration: { type: Number, default: 3600 },
//   enableCDN: { type: Boolean, default: false },
//   cdnUrl: { type: String, default: '' },

//   // Maintenance
//   maintenanceMode: { type: Boolean, default: false },
//   maintenanceMessage: { 
//     type: String, 
//     default: 'Site is under maintenance. Please check back later.' 
//   },

//   // Appearance
//   theme: { type: String, enum: ['light', 'dark', 'system'], default: 'light' },
//   primaryColor: { type: String, default: '#8B4513' },
//   secondaryColor: { type: String, default: '#DAA520' },
//   fontFamily: { type: String, default: 'Inter' }

// }, { timestamps: true });

// // ✅ SINGLETON SETTINGS (CRITICAL FIX)
// settingsSchema.statics.getSettings = async function () {
//   let settings = await this.findById("global_settings");

//   if (!settings) {
//     settings = await this.create({ _id: "global_settings" });
//   }

//   return settings;
// };

// const Settings = mongoose.model('Settings', settingsSchema);
// export default Settings;




















// // server/models/Settings.js
// import mongoose from 'mongoose';

// const settingsSchema = new mongoose.Schema({
//   // General Settings
//   siteName: { type: String, default: 'ZauqApp' },
//   siteDescription: { type: String, default: 'AI Powered Urdu Literary Ecosystem' },
//   siteLogo: { type: String, default: '' },
//   siteFavicon: { type: String, default: '' },
//   contactEmail: { 
//     type: String, 
//     default: 'admin@zauqapp.com',
//     match: /.+\@.+\..+/ 
//   },
//   contactPhone: { type: String, default: '' },
//   address: { type: String, default: '' },

//   // SEO
//   metaTitle: { type: String, default: '' },
//   metaDescription: { type: String, default: '' },
//   metaKeywords: { type: [String], default: [] },
//   ogImage: { type: String, default: '' },
//   twitterHandle: { type: String, default: '' },

//   // Social
//   facebook: { type: String, default: '' },
//   twitter: { type: String, default: '' },
//   instagram: { type: String, default: '' },
//   youtube: { type: String, default: '' },
//   linkedin: { type: String, default: '' },
//   github: { type: String, default: '' },

//   // Footer (FIXED STRUCTURE)
//   footerText: { type: String, default: 'Discover the beauty of Urdu literature' },
//   footerColumns: [{
//     title: String,
//     links: [{
//       label: String,
//       url: String
//     }]
//   }],
//   showNewsletter: { type: Boolean, default: true },
//   copyrightText: { type: String, default: '' },

//   // Announcement
//   showAnnouncement: { type: Boolean, default: false },
//   announcementText: { type: String, default: '' },
//   announcementLink: { type: String, default: '' },
//   announcementExpiry: { type: Date, default: null },

//   // Content
//   itemsPerPage: { type: Number, default: 12 },
//   enableComments: { type: Boolean, default: true },
//   enableRatings: { type: Boolean, default: true },
//   autoApproveContent: { type: Boolean, default: false },
//   enableUserUploads: { type: Boolean, default: true },

//   // Media
//   maxImageSize: { type: Number, default: 5 },
//   maxVideoSize: { type: Number, default: 500 },
//   maxAudioSize: { type: Number, default: 100 },
//   allowedImageFormats: { type: [String], default: ['jpg', 'jpeg', 'png', 'webp'] },
//   allowedVideoFormats: { type: [String], default: ['mp4', 'webm', 'mov'] },
//   allowedAudioFormats: { type: [String], default: ['mp3', 'wav', 'ogg'] },

//   // Security
//   enableTwoFactor: { type: Boolean, default: false },
//   sessionTimeout: { type: Number, default: 60 },
//   maxLoginAttempts: { type: Number, default: 5 },
//   passwordExpiryDays: { type: Number, default: 90 },
  
//   // ============================================
//   // CAPTCHA Settings
//   // ============================================
//   enableCaptcha: { type: Boolean, default: false },
//   captchaSiteKey: { type: String, default: '' },
//   captchaSecretKey: { type: String, default: '' },
//   captchaType: { type: String, enum: ['v2', 'v3'], default: 'v2' },

//   // Email
//   smtpHost: { type: String, default: '' },
//   smtpPort: { type: Number, default: 587 },
//   smtpUser: { type: String, default: '' },
//   smtpPassword: { type: String, default: '' },
//   senderEmail: { type: String, default: '' },
//   senderName: { type: String, default: '' },

//   // API (FIXED)
//   apiKeys: [{
//     name: String,
//     key: String,
//     createdAt: { type: Date, default: Date.now }
//   }],
//   webhookUrl: { type: String, default: '' },

//   // Payment
//   currency: { type: String, default: 'INR' },
//   razorpayKey: { type: String, default: '' },
//   razorpaySecret: { type: String, default: '' },
//   stripeKey: { type: String, default: '' },
//   stripeSecret: { type: String, default: '' },

//   // Cache
//   enableCache: { type: Boolean, default: true },
//   cacheDuration: { type: Number, default: 3600 },
//   enableCDN: { type: Boolean, default: false },
//   cdnUrl: { type: String, default: '' },

//   // Maintenance
//   maintenanceMode: { type: Boolean, default: false },
//   maintenanceMessage: { 
//     type: String, 
//     default: 'Site is under maintenance. Please check back later.' 
//   },

//   // Appearance
//   theme: { type: String, enum: ['light', 'dark', 'system'], default: 'light' },
//   primaryColor: { type: String, default: '#8B4513' },
//   secondaryColor: { type: String, default: '#DAA520' },
//   fontFamily: { type: String, default: 'Inter' }

// }, { timestamps: true });

// // ✅ SINGLETON SETTINGS (CRITICAL FIX)
// settingsSchema.statics.getSettings = async function () {
//   let settings = await this.findById("global_settings");

//   if (!settings) {
//     settings = await this.create({ _id: "global_settings" });
//   }

//   return settings;
// };

// // ============================================
// // 🔴 NEW: CAPTCHA Priority Method
// // ============================================
// /**
//  * Get CAPTCHA configuration with priority:
//  * 1. Database Settings (if enabled and keys exist)
//  * 2. Environment Variables (fallback)
//  * 3. Disabled (default)
//  * 
//  * @returns {Object} CAPTCHA configuration
//  */
// settingsSchema.statics.getCaptchaConfig = async function () {
//   try {
//     // Get database settings
//     let settings = await this.findById("global_settings");
    
//     // Priority 1: Check Database Settings
//     if (settings && settings.enableCaptcha === true && 
//         settings.captchaSiteKey && settings.captchaSiteKey.trim() !== '' &&
//         settings.captchaSecretKey && settings.captchaSecretKey.trim() !== '') {
      
//       console.log('🔐 CAPTCHA: Using DATABASE configuration');
//       return {
//         enabled: true,
//         siteKey: settings.captchaSiteKey,
//         secretKey: settings.captchaSecretKey,
//         type: settings.captchaType || 'v2',
//         source: 'database'
//       };
//     }
    
//     // Priority 2: Fallback to Environment Variables
//     const envEnabled = process.env.RECAPTCHA_ENABLED === 'true';
//     const envSiteKey = process.env.RECAPTCHA_SITE_KEY;
//     const envSecretKey = process.env.RECAPTCHA_SECRET_KEY;
    
//     if (envEnabled && envSiteKey && envSiteKey.trim() !== '' && 
//         envSecretKey && envSecretKey.trim() !== '') {
      
//       console.log('🔐 CAPTCHA: Using ENVIRONMENT configuration (fallback)');
//       return {
//         enabled: true,
//         siteKey: envSiteKey,
//         secretKey: envSecretKey,
//         type: process.env.RECAPTCHA_TYPE || 'v2',
//         source: 'environment'
//       };
//     }
    
//     // Priority 3: Disabled
//     console.log('🔓 CAPTCHA: DISABLED (no valid configuration found)');
//     return {
//       enabled: false,
//       siteKey: '',
//       secretKey: '',
//       type: 'v2',
//       source: 'none'
//     };
    
//   } catch (error) {
//     console.error('❌ Error in getCaptchaConfig:', error);
    
//     // Error fallback - check environment
//     const envEnabled = process.env.RECAPTCHA_ENABLED === 'true';
//     const envSiteKey = process.env.RECAPTCHA_SITE_KEY;
//     const envSecretKey = process.env.RECAPTCHA_SECRET_KEY;
    
//     return {
//       enabled: envEnabled && !!envSiteKey && !!envSecretKey,
//       siteKey: envSiteKey || '',
//       secretKey: envSecretKey || '',
//       type: process.env.RECAPTCHA_TYPE || 'v2',
//       source: 'environment (error fallback)'
//     };
//   }
// };

// /**
//  * Check if CAPTCHA is enabled (convenience method)
//  * @returns {Promise<boolean>}
//  */
// settingsSchema.statics.isCaptchaEnabled = async function () {
//   const config = await this.getCaptchaConfig();
//   return config.enabled;
// };

// /**
//  * Get public CAPTCHA config for frontend (excludes secret key)
//  * @returns {Promise<Object>}
//  */
// settingsSchema.statics.getPublicCaptchaConfig = async function () {
//   const config = await this.getCaptchaConfig();
//   return {
//     enabled: config.enabled,
//     siteKey: config.siteKey,
//     type: config.type
//   };
// };

// const Settings = mongoose.model('Settings', settingsSchema);
// export default Settings;








// server/models/Settings.js
import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  // 🔴 FIX: Use a string ID instead of ObjectId
  settingsId: { 
    type: String, 
    unique: true,
    default: 'global_settings_const'
  },
  
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

  // Footer
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
  
  // CAPTCHA Settings
  enableCaptcha: { type: Boolean, default: false },
  captchaSiteKey: { type: String, default: '' },
  captchaSecretKey: { type: String, default: '' },
  captchaType: { type: String, enum: ['v2', 'v3'], default: 'v2' },

  // Email
  smtpHost: { type: String, default: '' },
  smtpPort: { type: Number, default: 587 },
  smtpUser: { type: String, default: '' },
  smtpPassword: { type: String, default: '' },
  senderEmail: { type: String, default: '' },
  senderName: { type: String, default: '' },

  // API
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

// ============================================
// ✅ FIXED: Singleton Settings using findOneAndUpdate (Atomic Operation)
// 🔴 This prevents race conditions and duplicate creation
// ============================================
const SETTINGS_ID = "global_settings_const";

settingsSchema.statics.getSettings = async function () {
  // 🔴 CRITICAL: Use findOneAndUpdate with upsert for atomic operation
  // This prevents race conditions where multiple requests try to create settings simultaneously
  const settings = await this.findOneAndUpdate(
    { settingsId: SETTINGS_ID },
    {
      $setOnInsert: {
        settingsId: SETTINGS_ID,
        siteName: 'ZauqApp',
        siteDescription: 'AI Powered Urdu Literary Ecosystem',
        enableCaptcha: false,
        captchaSiteKey: '',
        captchaSecretKey: '',
        captchaType: 'v2',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    },
    {
      upsert: true,      // 🔴 Create if doesn't exist
      new: true,         // 🔴 Return the updated document
      setDefaultsOnInsert: true  // 🔴 Apply schema defaults on insert
    }
  );
  
  return settings;
};

// ============================================
// 🔴 NEW: Atomic update method to prevent duplicates
// ============================================
settingsSchema.statics.updateSettings = async function (updateData) {
  // Use findOneAndUpdate with atomic operation
  const settings = await this.findOneAndUpdate(
    { settingsId: SETTINGS_ID },
    { $set: updateData },
    { 
      upsert: true,      // 🔴 Create if doesn't exist
      new: true,         // 🔴 Return updated document
      runValidators: true // 🔴 Run schema validators
    }
  );
  
  return settings;
};

// ============================================
// CAPTCHA Helper Methods
// ============================================
settingsSchema.statics.getCaptchaConfig = async function () {
  try {
    const settings = await this.getSettings();
    
    // Check database first
    if (settings && settings.enableCaptcha && settings.captchaSiteKey && settings.captchaSecretKey) {
      console.log('🔐 CAPTCHA: Using DATABASE configuration');
      return {
        enabled: true,
        siteKey: settings.captchaSiteKey,
        secretKey: settings.captchaSecretKey,
        type: settings.captchaType || 'v2',
        source: 'database'
      };
    }
    
    // Fallback to environment
    const envEnabled = process.env.RECAPTCHA_ENABLED === 'true';
    const envSiteKey = process.env.RECAPTCHA_SITE_KEY;
    const envSecretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    if (envEnabled && envSiteKey && envSecretKey) {
      console.log('🔐 CAPTCHA: Using ENVIRONMENT configuration');
      return {
        enabled: true,
        siteKey: envSiteKey,
        secretKey: envSecretKey,
        type: process.env.RECAPTCHA_TYPE || 'v2',
        source: 'environment'
      };
    }
    
    console.log('🔓 CAPTCHA: DISABLED');
    return {
      enabled: false,
      siteKey: '',
      secretKey: '',
      type: 'v2',
      source: 'none'
    };
    
  } catch (error) {
    console.error('❌ CAPTCHA config error:', error);
    return {
      enabled: false,
      siteKey: '',
      secretKey: '',
      type: 'v2',
      source: 'error'
    };
  }
};

// ============================================
// 🔴 NEW: Create unique index on settingsId (if not exists)
// ============================================
settingsSchema.statics.ensureIndexes = async function () {
  try {
    await this.collection.createIndex(
      { settingsId: 1 }, 
      { unique: true, sparse: true, background: true }
    );
    console.log('✅ Settings unique index ensured');
  } catch (error) {
    console.error('❌ Failed to create index:', error.message);
  }
};

const Settings = mongoose.model('Settings', settingsSchema);

// 🔴 Automatically ensure indexes when model is loaded
Settings.ensureIndexes();

export default Settings;