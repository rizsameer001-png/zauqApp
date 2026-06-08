
// // server/controllers/settings.controller.js
// import Settings from '../models/Settings.js';
// import { successResponse, errorResponse } from '../utils/response.js';
// import cloudinary from '../config/cloudinary.js';
// import crypto from 'crypto';
// import fs from 'fs';

// // ============================================
// // PUBLIC ROUTES (No authentication required)
// // ============================================

// export const getPublicSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
//     if (!settings) {
//       settings = await Settings.create({});
//     }
    
//     const publicData = {
//       siteName: settings.siteName || 'ZauqApp',
//       siteDescription: settings.siteDescription || 'AI Powered Urdu Literary Ecosystem',
//       siteLogo: settings.siteLogo || '',
//       siteFavicon: settings.siteFavicon || '',
//       contactEmail: settings.contactEmail || 'admin@zauqapp.com',
//       contactPhone: settings.contactPhone || '',
//       address: settings.address || '',
//       theme: settings.theme || 'light',
//       primaryColor: settings.primaryColor || '#8B4513',
//       secondaryColor: settings.secondaryColor || '#DAA520',
//       fontFamily: settings.fontFamily || 'Inter',
//       maintenanceMode: settings.maintenanceMode || false,
//       maintenanceMessage: settings.maintenanceMessage || 'Site is under maintenance. Please check back later.'
//     };
    
//     successResponse(res, publicData);
//   } catch (error) {
//     console.error('Error in getPublicSettings:', error);
//     next(error);
//   }
// };

// export const getThemeSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     successResponse(res, {
//       theme: settings?.theme || 'light',
//       primaryColor: settings?.primaryColor || '#8B4513',
//       secondaryColor: settings?.secondaryColor || '#DAA520',
//       fontFamily: settings?.fontFamily || 'Inter'
//     });
//   } catch (error) {
//     console.error('Error in getThemeSettings:', error);
//     next(error);
//   }
// };

// export const getSeoSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     successResponse(res, {
//       metaTitle: settings?.metaTitle || settings?.siteName || 'ZauqApp',
//       metaDescription: settings?.metaDescription || settings?.siteDescription || 'Discover the beauty of Urdu literature',
//       metaKeywords: settings?.metaKeywords || [],
//       ogImage: settings?.ogImage || settings?.siteLogo || '',
//       twitterHandle: settings?.twitterHandle || '@zauqapp'
//     });
//   } catch (error) {
//     console.error('Error in getSeoSettings:', error);
//     next(error);
//   }
// };

// export const getSocialSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     successResponse(res, {
//       facebook: settings?.facebook || '',
//       twitter: settings?.twitter || '',
//       instagram: settings?.instagram || '',
//       youtube: settings?.youtube || '',
//       linkedin: settings?.linkedin || '',
//       github: settings?.github || ''
//     });
//   } catch (error) {
//     console.error('Error in getSocialSettings:', error);
//     next(error);
//   }
// };

// export const getFooterSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     successResponse(res, {
//       footerText: settings?.footerText || 'Discover the beauty of Urdu literature',
//       footerColumns: settings?.footerColumns || [],
//       showNewsletter: settings?.showNewsletter !== false,
//       copyrightText: settings?.copyrightText || `© ${new Date().getFullYear()} ZauqApp. All rights reserved.`
//     });
//   } catch (error) {
//     console.error('Error in getFooterSettings:', error);
//     next(error);
//   }
// };

// export const getAnnouncementSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     const isExpired = settings?.announcementExpiry && new Date(settings.announcementExpiry) < new Date();
    
//     successResponse(res, {
//       showAnnouncement: settings?.showAnnouncement || false,
//       announcementText: settings?.announcementText || '',
//       announcementLink: settings?.announcementLink || '',
//       announcementExpiry: settings?.announcementExpiry || null,
//       isExpired: isExpired || false
//     });
//   } catch (error) {
//     console.error('Error in getAnnouncementSettings:', error);
//     next(error);
//   }
// };

// export const getPublicMaintenanceStatus = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     successResponse(res, {
//       maintenanceMode: settings?.maintenanceMode || false,
//       maintenanceMessage: settings?.maintenanceMessage || 'Site is under maintenance. Please check back later.'
//     });
//   } catch (error) {
//     console.error('Error in getPublicMaintenanceStatus:', error);
//     next(error);
//   }
// };

// // ============================================
// // ADMIN ROUTES (Authentication required)
// // ============================================

// // Get all settings (admin only)
// export const getSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();

//     // Create default settings if not exist
//     if (!settings) {
//       settings = await Settings.create({});
//     }

//     const responseData = {
//       // General
//       siteName: settings.siteName ?? '',
//       siteDescription: settings.siteDescription ?? '',
//       siteLogo: settings.siteLogo ?? '',
//       siteFavicon: settings.siteFavicon ?? '',
//       contactEmail: settings.contactEmail ?? '',
//       contactPhone: settings.contactPhone ?? '',
//       address: settings.address ?? '',

//       // SEO
//       metaTitle: settings.metaTitle ?? '',
//       metaDescription: settings.metaDescription ?? '',
//       metaKeywords: settings.metaKeywords ?? [],
//       ogImage: settings.ogImage ?? '',
//       twitterHandle: settings.twitterHandle ?? '',

//       // Social
//       facebook: settings.facebook ?? '',
//       twitter: settings.twitter ?? '',
//       instagram: settings.instagram ?? '',
//       youtube: settings.youtube ?? '',
//       linkedin: settings.linkedin ?? '',
//       github: settings.github ?? '',

//       // Footer
//       footerText: settings.footerText ?? '',
//       footerColumns: settings.footerColumns ?? [],
//       showNewsletter: settings.showNewsletter ?? true,
//       copyrightText: settings.copyrightText ?? '',

//       // Announcement
//       showAnnouncement: settings.showAnnouncement ?? false,
//       announcementText: settings.announcementText ?? '',
//       announcementLink: settings.announcementLink ?? '',
//       announcementExpiry: settings.announcementExpiry ?? null,

//       // Content
//       itemsPerPage: settings.itemsPerPage ?? 10,
//       enableComments: settings.enableComments ?? true,
//       enableRatings: settings.enableRatings ?? true,
//       autoApproveContent: settings.autoApproveContent ?? false,
//       enableUserUploads: settings.enableUserUploads ?? true,

//       // Media
//       maxImageSize: settings.maxImageSize ?? 5,
//       maxVideoSize: settings.maxVideoSize ?? 50,
//       maxAudioSize: settings.maxAudioSize ?? 10,
//       allowedImageFormats: settings.allowedImageFormats ?? ['jpg', 'png'],
//       allowedVideoFormats: settings.allowedVideoFormats ?? ['mp4'],
//       allowedAudioFormats: settings.allowedAudioFormats ?? ['mp3'],

//       // Security
//       enableTwoFactor: settings.enableTwoFactor ?? false,
//       sessionTimeout: settings.sessionTimeout ?? 30,
//       maxLoginAttempts: settings.maxLoginAttempts ?? 5,
//       passwordExpiryDays: settings.passwordExpiryDays ?? 90,
//       enableCaptcha: settings.enableCaptcha ?? false,

//       // Email
//       smtpHost: settings.smtpHost ?? '',
//       smtpPort: settings.smtpPort ?? '',
//       smtpUser: settings.smtpUser ?? '',
//       smtpPassword: settings.smtpPassword ? '••••••••' : '',
//       senderEmail: settings.senderEmail ?? '',
//       senderName: settings.senderName ?? '',

//       // API
//       apiKeys: settings.apiKeys ?? [],
//       webhookUrl: settings.webhookUrl ?? '',

//       // Payment
//       currency: settings.currency ?? 'INR',
//       razorpayKey: settings.razorpayKey ?? '',
//       razorpaySecret: settings.razorpaySecret ? '••••••••' : '',
//       stripeKey: settings.stripeKey ?? '',
//       stripeSecret: settings.stripeSecret ? '••••••••' : '',

//       // Cache
//       enableCache: settings.enableCache ?? false,
//       cacheDuration: settings.cacheDuration ?? 60,
//       enableCDN: settings.enableCDN ?? false,
//       cdnUrl: settings.cdnUrl ?? '',

//       // Maintenance
//       maintenanceMode: settings.maintenanceMode ?? false,
//       maintenanceMessage: settings.maintenanceMessage ?? '',

//       // Appearance
//       theme: settings.theme ?? 'light',
//       primaryColor: settings.primaryColor ?? '#db2777',
//       secondaryColor: settings.secondaryColor ?? '#000000',
//       fontFamily: settings.fontFamily ?? 'Inter'
//     };

//     return successResponse(res, responseData);

//   } catch (error) {
//     console.error('Error in getSettings:', error);
//     return next(error);
//   }
// };
// export const updateSettings = async (req, res, next) => {
//   try {
//     console.log('🔵 ========== UPDATE SETTINGS START ==========');
//     console.log('🔵 Request body keys:', Object.keys(req.body));

//     // ✅ ALWAYS get or create ONE settings document
//     let settings = await Settings.findOne();

//     if (!settings) {
//       console.log('⚠️ No settings found, creating new document...');
//       settings = new Settings();
//     } else {
//       console.log('✅ Found existing settings with ID:', settings._id);
//     }

//     // ================= FIELD GROUPS =================
//     const stringFields = [
//       'siteName', 'siteDescription', 'siteLogo', 'siteFavicon',
//       'contactEmail', 'contactPhone', 'address',
//       'metaTitle', 'metaDescription', 'ogImage', 'twitterHandle',
//       'facebook', 'twitter', 'instagram', 'youtube', 'linkedin', 'github',
//       'footerText', 'copyrightText',
//       'announcementText', 'announcementLink',
//       'smtpHost', 'smtpUser', 'smtpPassword', 'senderEmail', 'senderName',
//       'webhookUrl', 'currency', 'razorpayKey', 'razorpaySecret', 'stripeKey', 'stripeSecret',
//       'cdnUrl', 'maintenanceMessage', 'theme', 'primaryColor', 'secondaryColor', 'fontFamily'
//     ];

//     const numberFields = [
//       'itemsPerPage', 'maxImageSize', 'maxVideoSize', 'maxAudioSize',
//       'sessionTimeout', 'maxLoginAttempts', 'passwordExpiryDays',
//       'smtpPort', 'cacheDuration'
//     ];

//     const booleanFields = [
//       'enableComments', 'enableRatings', 'autoApproveContent', 'enableUserUploads',
//       'enableTwoFactor', 'enableCaptcha', 'enableCache', 'enableCDN', 'maintenanceMode',
//       'showNewsletter', 'showAnnouncement'
//     ];

//     const arrayFields = [
//       'metaKeywords', 'allowedImageFormats', 'allowedVideoFormats', 'allowedAudioFormats', 'footerColumns'
//     ];

//     const dateFields = ['announcementExpiry'];

//     // ================= UPDATE LOGIC =================

//     // 🔹 STRING
//     for (const field of stringFields) {
//       if (req.body[field] !== undefined) {

//         if (
//           ['razorpaySecret', 'stripeSecret', 'smtpPassword'].includes(field) &&
//           req.body[field] === '••••••••'
//         ) continue;

//         settings[field] = req.body[field];
//       }
//     }

//     // 🔹 NUMBER
//     for (const field of numberFields) {
//       if (req.body[field] !== undefined) {
//         settings[field] = Number(req.body[field]);
//       }
//     }

//     // 🔹 BOOLEAN
//     for (const field of booleanFields) {
//       if (req.body[field] !== undefined) {
//         settings[field] = req.body[field] === true || req.body[field] === 'true';
//       }
//     }

//     // 🔹 ARRAY
//     for (const field of arrayFields) {
//       if (req.body[field] !== undefined) {

//         if (typeof req.body[field] === 'string') {

//           if (field === 'footerColumns') {
//             try {
//               settings[field] = JSON.parse(req.body[field]);
//             } catch {
//               settings[field] = [];
//             }
//           } else {
//             settings[field] = req.body[field].split(',').map(i => i.trim());
//           }

//         } else if (Array.isArray(req.body[field])) {
//           settings[field] = req.body[field];
//         }
//       }
//     }

//     // 🔹 DATE
//     for (const field of dateFields) {
//       if (req.body[field]) {
//         settings[field] = new Date(req.body[field]);
//       }
//     }

//     // ================= SAVE =================
//     console.log('🔵 Saving settings...');
//     await settings.save();

//     console.log('✅ Settings saved!');

//     // ✅ RETURN UPDATED DATA
//     return res.json({
//       success: true,
//       data: settings
//     });

//   } catch (error) {
//     console.error('❌ Error in updateSettings:', error);

//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return res.status(400).json({
//         success: false,
//         message: `Validation failed: ${errors.join(', ')}`
//       });
//     }

//     next(error);
//   }
// };


// // Reset settings to defaults (admin only)
// export const resetSettings = async (req, res, next) => {
//   try {
//     await Settings.deleteMany();
//     const defaultSettings = await Settings.create({});
//     successResponse(res, defaultSettings, 'Settings reset to defaults');
//   } catch (error) {
//     console.error('Error in resetSettings:', error);
//     next(error);
//   }
// };

// // Get maintenance status (admin only)
// export const getMaintenanceStatus = async (req, res, next) => {
//   try {
//     const settings = await Settings.findOne();
//     successResponse(res, {
//       maintenanceMode: settings?.maintenanceMode || false,
//       maintenanceMessage: settings?.maintenanceMessage || 'Site is under maintenance. Please check back later.'
//     });
//   } catch (error) {
//     console.error('Error in getMaintenanceStatus:', error);
//     next(error);
//   }
// };

// // Update maintenance mode (admin only)
// export const updateMaintenanceMode = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
//     if (!settings) {
//       settings = new Settings();
//     }
    
//     settings.maintenanceMode = req.body.enabled;
//     if (req.body.message) {
//       settings.maintenanceMessage = req.body.message;
//     }
//     await settings.save();
    
//     successResponse(res, settings, `Maintenance mode ${settings.maintenanceMode ? 'enabled' : 'disabled'}`);
//   } catch (error) {
//     console.error('Error in updateMaintenanceMode:', error);
//     next(error);
//   }
// };

// // Upload logo or favicon (admin only)
// export const uploadLogo = async (req, res, next) => {
//   try {
//     const { type } = req.params;
    
//     if (!req.file) {
//       return errorResponse(res, 'No file uploaded', 400);
//     }
    
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: `zauqapp/settings/${type}`,
//       width: type === 'logo' ? 200 : 64,
//       height: type === 'logo' ? 200 : 64,
//       crop: 'limit',
//       quality: 'auto:good'
//     });
    
//     // Clean up local file
//     if (fs.existsSync(req.file.path)) {
//       fs.unlinkSync(req.file.path);
//     }
    
//     let settings = await Settings.findOne();
//     if (!settings) {
//       settings = new Settings();
//     }
    
//     if (type === 'logo') {
//       settings.siteLogo = result.secure_url;
//     } else if (type === 'favicon') {
//       settings.siteFavicon = result.secure_url;
//     }
    
//     await settings.save();
    
//     successResponse(res, { url: result.secure_url }, `${type} uploaded successfully`);
//   } catch (error) {
//     console.error('Error in uploadLogo:', error);
//     next(error);
//   }
// };

// // Upload banner (admin only)
// export const uploadBanner = async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return errorResponse(res, 'No file uploaded', 400);
//     }
    
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: 'zauqapp/settings/banners',
//       width: 1920,
//       height: 400,
//       crop: 'fill',
//       quality: 'auto:good'
//     });
    
//     // Clean up local file
//     if (fs.existsSync(req.file.path)) {
//       fs.unlinkSync(req.file.path);
//     }
    
//     successResponse(res, { url: result.secure_url }, 'Banner uploaded successfully');
//   } catch (error) {
//     console.error('Error in uploadBanner:', error);
//     next(error);
//   }
// };

// // Generate API Key (admin only)
// export const generateApiKey = async (req, res, next) => {
//   try {
//     const { name } = req.body;
    
//     if (!name) {
//       return errorResponse(res, 'API key name is required', 400);
//     }
    
//     const apiKey = crypto.randomBytes(32).toString('hex');
    
//     let settings = await Settings.findOne();
//     if (!settings) {
//       settings = new Settings();
//     }
    
//     if (!settings.apiKeys) {
//       settings.apiKeys = [];
//     }
    
//     settings.apiKeys.push({
//       _id: crypto.randomBytes(12).toString('hex'),
//       name,
//       key: apiKey,
//       createdAt: new Date()
//     });
    
//     await settings.save();
    
//     successResponse(res, { name, key: apiKey }, 'API key generated successfully');
//   } catch (error) {
//     console.error('Error in generateApiKey:', error);
//     next(error);
//   }
// };

// // Delete API Key (admin only)
// export const deleteApiKey = async (req, res, next) => {
//   try {
//     const { keyId } = req.params;
    
//     let settings = await Settings.findOne();
//     if (!settings || !settings.apiKeys) {
//       return errorResponse(res, 'API key not found', 404);
//     }
    
//     settings.apiKeys = settings.apiKeys.filter(key => key._id.toString() !== keyId);
//     await settings.save();
    
//     successResponse(res, null, 'API key deleted successfully');
//   } catch (error) {
//     console.error('Error in deleteApiKey:', error);
//     next(error);
//   }
// };














// // //working server/controllers/settings.controller.js
// import Settings from '../models/Settings.js';
// import { successResponse, errorResponse } from '../utils/response.js';
// import cloudinary from '../config/cloudinary.js';
// import crypto from 'crypto';
// import fs from 'fs';

// // ============================================
// // ✅ HELPER (IMPORTANT FIX)
// // ============================================
// const getOrCreateSettings = async () => {
//   let settings = await Settings.findOne();

//   if (!settings) {
//     settings = await Settings.create({});
//   }

//   return settings;
// };

// // ============================================
// // PUBLIC ROUTES
// // ============================================

// export const getPublicSettings = async (req, res, next) => {
//   try {
//     const settings = await getOrCreateSettings();

//     successResponse(res, {
//       siteName: settings.siteName,
//       siteDescription: settings.siteDescription,
//       siteLogo: settings.siteLogo,
//       siteFavicon: settings.siteFavicon,
//       contactEmail: settings.contactEmail,
//       contactPhone: settings.contactPhone,
//       address: settings.address,
//       theme: settings.theme,
//       primaryColor: settings.primaryColor,
//       secondaryColor: settings.secondaryColor,
//       fontFamily: settings.fontFamily,
//       maintenanceMode: settings.maintenanceMode,
//       maintenanceMessage: settings.maintenanceMessage
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getThemeSettings = async (req, res, next) => {
//   try {
//     const s = await getOrCreateSettings();

//     successResponse(res, {
//       theme: s.theme,
//       primaryColor: s.primaryColor,
//       secondaryColor: s.secondaryColor,
//       fontFamily: s.fontFamily
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSeoSettings = async (req, res, next) => {
//   try {
//     const s = await getOrCreateSettings();

//     successResponse(res, {
//       metaTitle: s.metaTitle || s.siteName,
//       metaDescription: s.metaDescription || s.siteDescription,
//       metaKeywords: s.metaKeywords,
//       ogImage: s.ogImage || s.siteLogo,
//       twitterHandle: s.twitterHandle
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSocialSettings = async (req, res, next) => {
//   try {
//     const s = await getOrCreateSettings();

//     successResponse(res, {
//       facebook: s.facebook,
//       twitter: s.twitter,
//       instagram: s.instagram,
//       youtube: s.youtube,
//       linkedin: s.linkedin,
//       github: s.github
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getFooterSettings = async (req, res, next) => {
//   try {
//     const s = await getOrCreateSettings();

//     successResponse(res, {
//       footerText: s.footerText,
//       footerColumns: s.footerColumns,
//       showNewsletter: s.showNewsletter,
//       copyrightText: s.copyrightText
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getAnnouncementSettings = async (req, res, next) => {
//   try {
//     const s = await getOrCreateSettings();

//     successResponse(res, {
//       showAnnouncement: s.showAnnouncement,
//       announcementText: s.announcementText,
//       announcementLink: s.announcementLink,
//       announcementExpiry: s.announcementExpiry
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getPublicMaintenanceStatus = async (req, res, next) => {
//   try {
//     const s = await getOrCreateSettings();

//     successResponse(res, {
//       maintenanceMode: s.maintenanceMode,
//       maintenanceMessage: s.maintenanceMessage
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // ADMIN ROUTES
// // ============================================

// // ✅ GET FULL SETTINGS
// // export const getSettings = async (req, res, next) => {
// //   try {
// //     let settings = await Settings.findOne();

// //     if (!settings) {
// //       settings = await Settings.create({});
// //     }

// //     return res.status(200).json({
// //       success: true,
// //       data: settings
// //     });

// //   } catch (error) {
// //     console.error('❌ getSettings error:', error);
// //     next(error);
// //   }
// // };

// // server/controllers/settings.controller.js

// export const getSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       settings = await Settings.create({});
//     }

//     // 🔴 CRITICAL: Return ALL settings fields
//     const fullSettings = {
//       // General Settings
//       siteName: settings.siteName || 'ZauqApp',
//       siteDescription: settings.siteDescription || 'AI Powered Urdu Literary Ecosystem',
//       siteLogo: settings.siteLogo || '',
//       siteFavicon: settings.siteFavicon || '',
//       contactEmail: settings.contactEmail || 'admin@zauqapp.com',
//       contactPhone: settings.contactPhone || '',
//       address: settings.address || '',
      
//       // Content Settings
//       itemsPerPage: settings.itemsPerPage || 12,
//       enableComments: settings.enableComments !== undefined ? settings.enableComments : true,
//       enableRatings: settings.enableRatings !== undefined ? settings.enableRatings : true,
//       autoApproveContent: settings.autoApproveContent || false,
//       enableUserUploads: settings.enableUserUploads !== undefined ? settings.enableUserUploads : true,
      
//       // Media Settings
//       maxImageSize: settings.maxImageSize || 5,
//       maxVideoSize: settings.maxVideoSize || 500,
//       maxAudioSize: settings.maxAudioSize || 100,
//       allowedImageFormats: settings.allowedImageFormats || ['jpg', 'jpeg', 'png', 'webp'],
//       allowedVideoFormats: settings.allowedVideoFormats || ['mp4', 'webm', 'mov'],
//       allowedAudioFormats: settings.allowedAudioFormats || ['mp3', 'wav', 'ogg'],
      
//       // Security Settings
//       enableTwoFactor: settings.enableTwoFactor || false,
//       sessionTimeout: settings.sessionTimeout || 60,
//       maxLoginAttempts: settings.maxLoginAttempts || 5,
//       passwordExpiryDays: settings.passwordExpiryDays || 90,
//       enableCaptcha: settings.enableCaptcha !== undefined ? settings.enableCaptcha : true,
      
//       // Email Settings
//       smtpHost: settings.smtpHost || '',
//       smtpPort: settings.smtpPort || 587,
//       smtpUser: settings.smtpUser || '',
//       smtpPassword: settings.smtpPassword || '',
//       senderEmail: settings.senderEmail || '',
//       senderName: settings.senderName || '',
      
//       // API Settings
//       apiKeys: settings.apiKeys || [],
//       webhookUrl: settings.webhookUrl || '',
      
//       // Payment Settings
//       currency: settings.currency || 'INR',
//       razorpayKey: settings.razorpayKey || '',
//       razorpaySecret: settings.razorpaySecret || '',
//       stripeKey: settings.stripeKey || '',
//       stripeSecret: settings.stripeSecret || '',
      
//       // Cache Settings
//       enableCache: settings.enableCache !== undefined ? settings.enableCache : true,
//       cacheDuration: settings.cacheDuration || 3600,
//       enableCDN: settings.enableCDN || false,
//       cdnUrl: settings.cdnUrl || '',
      
//       // Maintenance Mode
//       maintenanceMode: settings.maintenanceMode || false,
//       maintenanceMessage: settings.maintenanceMessage || 'Site is under maintenance. Please check back later.',
      
//       // Appearance
//       theme: settings.theme || 'light',
//       primaryColor: settings.primaryColor || '#8B4513',
//       secondaryColor: settings.secondaryColor || '#DAA520',
//       fontFamily: settings.fontFamily || 'Inter'
//     };

//     console.log('🔵 Sending settings with fields:', Object.keys(fullSettings));
//     console.log('🔵 contactPhone:', fullSettings.contactPhone);
//     console.log('🔵 address:', fullSettings.address);

//     return res.status(200).json({
//       success: true,
//       data: fullSettings
//     });

//   } catch (error) {
//     console.error('❌ getSettings error:', error);
//     next(error);
//   }
// };

// // ✅ UPDATE SETTINGS (FIXED CORE ISSUE)
// export const updateSettings = async (req, res, next) => {
//   try {
//     console.log('🔵 UPDATE SETTINGS START');

//     // ✅ FIX: Correct query
//     let settings = await Settings.findOne();

//     if (!settings) {
//       console.log('⚠️ Creating new settings...');
//       settings = new Settings({});
//     }

//     const updateField = (field, value) => {
//       settings[field] = value;
//       console.log(`✅ ${field}:`, value);
//     };

//     // =============================
//     // HANDLE ALL FIELDS CLEANLY
//     // =============================

//     Object.keys(req.body).forEach((key) => {
//       let value = req.body[key];

//       if (value === undefined) return;

//       // ✅ Skip masked secrets
//       if (
//         ['smtpPassword', 'razorpaySecret', 'stripeSecret'].includes(key) &&
//         value === '••••••••'
//       ) return;

//       // Convert types
//       if (typeof value === 'string') {
//         if (value === 'true') value = true;
//         if (value === 'false') value = false;
//         if (!isNaN(value) && value.trim() !== '') {
//           value = Number(value);
//         }
//       }

//       // Array handling
//       if (typeof value === 'string' && value.includes(',')) {
//         value = value.split(',').map(v => v.trim());
//       }

//       updateField(key, value);
//     });

//     await settings.save();

//     const savedSettings = await Settings.findOne();

//     return res.status(200).json({
//       success: true,
//       data: savedSettings,
//       message: 'Settings updated successfully'
//     });

//   } catch (error) {
//     console.error('❌ updateSettings error:', error);
//     next(error);
//   }
// };

// // ✅ RESET
// export const resetSettings = async (req, res, next) => {
//   try {
//     await Settings.deleteMany();
//     const newSettings = await Settings.create({});
//     successResponse(res, newSettings);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // MAINTENANCE
// // ============================================

// export const getMaintenanceStatus = async (req, res, next) => {
//   try {
//     const s = await getOrCreateSettings();

//     successResponse(res, {
//       maintenanceMode: s.maintenanceMode,
//       maintenanceMessage: s.maintenanceMessage
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateMaintenanceMode = async (req, res, next) => {
//   try {
//     const s = await getOrCreateSettings();

//     s.maintenanceMode = req.body.enabled;
//     s.maintenanceMessage = req.body.message;

//     await s.save();

//     successResponse(res, s);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // FILE UPLOADS
// // ============================================

// export const uploadLogo = async (req, res, next) => {
//   try {
//     const { type } = req.params;

//     if (!req.file) {
//       return errorResponse(res, 'No file uploaded', 400);
//     }

//     const result = await cloudinary.uploader.upload(req.file.path);

//     fs.unlinkSync(req.file.path);

//     const s = await getOrCreateSettings();

//     if (type === 'logo') s.siteLogo = result.secure_url;
//     if (type === 'favicon') s.siteFavicon = result.secure_url;

//     await s.save();

//     successResponse(res, { url: result.secure_url });
//   } catch (error) {
//     next(error);
//   }
// };

// export const uploadBanner = async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return errorResponse(res, 'No file uploaded', 400);
//     }

//     const result = await cloudinary.uploader.upload(req.file.path);

//     fs.unlinkSync(req.file.path);

//     successResponse(res, { url: result.secure_url });
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // API KEYS
// // ============================================

// export const generateApiKey = async (req, res, next) => {
//   try {
//     const { name } = req.body;

//     if (!name) return errorResponse(res, 'Name required');

//     const key = crypto.randomBytes(32).toString('hex');

//     const s = await getOrCreateSettings();

//     s.apiKeys.push({
//       _id: crypto.randomBytes(12).toString('hex'),
//       name,
//       key
//     });

//     await s.save();

//     successResponse(res, { name, key });
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteApiKey = async (req, res, next) => {
//   try {
//     const { keyId } = req.params;

//     const s = await getOrCreateSettings();

//     s.apiKeys = s.apiKeys.filter(k => k._id !== keyId);

//     await s.save();

//     successResponse(res, null, 'Deleted');
//   } catch (error) {
//     next(error);
//   }
// };






















// server/controllers/settings.controller.js
import Settings from '../models/Settings.js';
import { successResponse, errorResponse } from '../utils/response.js';
import cloudinary from '../config/cloudinary.js';
import crypto from 'crypto';
import fs from 'fs';

// ============================================
// ✅ HELPER: Clean URLs (remove line breaks, spaces, newlines)
// ============================================
const cleanUrl = (url) => {
  if (!url) return '';
  // Remove all whitespace characters (spaces, newlines, tabs, carriage returns)
  return url.replace(/\s+/g, '').trim();
};

// ============================================
// ✅ HELPER (IMPORTANT FIX)
// ============================================
const getOrCreateSettings = async () => {
  let settings = await Settings.findOne();

  if (!settings) {
    settings = await Settings.create({});
  }

  return settings;
};

// ============================================
// PUBLIC ROUTES
// ============================================

export const getPublicSettings = async (req, res, next) => {
  try {
    const settings = await getOrCreateSettings();

    successResponse(res, {
      siteName: settings.siteName,
      siteDescription: settings.siteDescription,
      siteLogo: cleanUrl(settings.siteLogo),
      siteFavicon: cleanUrl(settings.siteFavicon),
      contactEmail: settings.contactEmail,
      contactPhone: settings.contactPhone,
      address: settings.address,
      theme: settings.theme,
      primaryColor: settings.primaryColor,
      secondaryColor: settings.secondaryColor,
      fontFamily: settings.fontFamily,
      maintenanceMode: settings.maintenanceMode,
      maintenanceMessage: settings.maintenanceMessage
    });
  } catch (error) {
    next(error);
  }
};

export const getThemeSettings = async (req, res, next) => {
  try {
    const s = await getOrCreateSettings();

    successResponse(res, {
      theme: s.theme,
      primaryColor: s.primaryColor,
      secondaryColor: s.secondaryColor,
      fontFamily: s.fontFamily
    });
  } catch (error) {
    next(error);
  }
};

export const getSeoSettings = async (req, res, next) => {
  try {
    const s = await getOrCreateSettings();

    successResponse(res, {
      metaTitle: s.metaTitle || s.siteName,
      metaDescription: s.metaDescription || s.siteDescription,
      metaKeywords: s.metaKeywords,
      ogImage: cleanUrl(s.ogImage || s.siteLogo),
      twitterHandle: s.twitterHandle
    });
  } catch (error) {
    next(error);
  }
};

export const getSocialSettings = async (req, res, next) => {
  try {
    const s = await getOrCreateSettings();

    successResponse(res, {
      facebook: s.facebook,
      twitter: s.twitter,
      instagram: s.instagram,
      youtube: s.youtube,
      linkedin: s.linkedin,
      github: s.github
    });
  } catch (error) {
    next(error);
  }
};

export const getFooterSettings = async (req, res, next) => {
  try {
    const s = await getOrCreateSettings();

    successResponse(res, {
      footerText: s.footerText,
      footerColumns: s.footerColumns,
      showNewsletter: s.showNewsletter,
      copyrightText: s.copyrightText
    });
  } catch (error) {
    next(error);
  }
};

export const getAnnouncementSettings = async (req, res, next) => {
  try {
    const s = await getOrCreateSettings();

    successResponse(res, {
      showAnnouncement: s.showAnnouncement,
      announcementText: s.announcementText,
      announcementLink: s.announcementLink,
      announcementExpiry: s.announcementExpiry
    });
  } catch (error) {
    next(error);
  }
};

export const getPublicMaintenanceStatus = async (req, res, next) => {
  try {
    const s = await getOrCreateSettings();

    successResponse(res, {
      maintenanceMode: s.maintenanceMode,
      maintenanceMessage: s.maintenanceMessage
    });
  } catch (error) {
    next(error);
  }
};

// ============================================
// ADMIN ROUTES
// ============================================

// ✅ GET FULL SETTINGS
export const getSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = await Settings.create({});
    }

    // 🔴 CRITICAL: Return ALL settings fields with cleaned URLs
    const fullSettings = {
      // General Settings
      siteName: settings.siteName || 'ZauqApp',
      siteDescription: settings.siteDescription || 'AI Powered Urdu Literary Ecosystem',
      siteLogo: cleanUrl(settings.siteLogo),
      siteFavicon: cleanUrl(settings.siteFavicon),
      contactEmail: settings.contactEmail || 'admin@zauqapp.com',
      contactPhone: settings.contactPhone || '',
      address: settings.address || '',
      
      // Content Settings
      itemsPerPage: settings.itemsPerPage || 12,
      enableComments: settings.enableComments !== undefined ? settings.enableComments : true,
      enableRatings: settings.enableRatings !== undefined ? settings.enableRatings : true,
      autoApproveContent: settings.autoApproveContent || false,
      enableUserUploads: settings.enableUserUploads !== undefined ? settings.enableUserUploads : true,
      
      // Media Settings
      maxImageSize: settings.maxImageSize || 5,
      maxVideoSize: settings.maxVideoSize || 500,
      maxAudioSize: settings.maxAudioSize || 100,
      allowedImageFormats: settings.allowedImageFormats || ['jpg', 'jpeg', 'png', 'webp'],
      allowedVideoFormats: settings.allowedVideoFormats || ['mp4', 'webm', 'mov'],
      allowedAudioFormats: settings.allowedAudioFormats || ['mp3', 'wav', 'ogg'],
      
      // Security Settings
      enableTwoFactor: settings.enableTwoFactor || false,
      sessionTimeout: settings.sessionTimeout || 60,
      maxLoginAttempts: settings.maxLoginAttempts || 5,
      passwordExpiryDays: settings.passwordExpiryDays || 90,
      enableCaptcha: settings.enableCaptcha !== undefined ? settings.enableCaptcha : true,
      
      // Email Settings
      smtpHost: settings.smtpHost || '',
      smtpPort: settings.smtpPort || 587,
      smtpUser: settings.smtpUser || '',
      smtpPassword: settings.smtpPassword || '',
      senderEmail: settings.senderEmail || '',
      senderName: settings.senderName || '',
      
      // API Settings
      apiKeys: settings.apiKeys || [],
      webhookUrl: settings.webhookUrl || '',
      
      // Payment Settings
      currency: settings.currency || 'INR',
      razorpayKey: settings.razorpayKey || '',
      razorpaySecret: settings.razorpaySecret || '',
      stripeKey: settings.stripeKey || '',
      stripeSecret: settings.stripeSecret || '',
      
      // Cache Settings
      enableCache: settings.enableCache !== undefined ? settings.enableCache : true,
      cacheDuration: settings.cacheDuration || 3600,
      enableCDN: settings.enableCDN || false,
      cdnUrl: settings.cdnUrl || '',
      
      // Maintenance Mode
      maintenanceMode: settings.maintenanceMode || false,
      maintenanceMessage: settings.maintenanceMessage || 'Site is under maintenance. Please check back later.',
      
      // Appearance
      theme: settings.theme || 'light',
      primaryColor: settings.primaryColor || '#8B4513',
      secondaryColor: settings.secondaryColor || '#DAA520',
      fontFamily: settings.fontFamily || 'Inter'
    };

    console.log('🔵 Sending settings with cleaned URLs');
    console.log('🔵 siteLogo:', fullSettings.siteLogo);
    console.log('🔵 siteFavicon:', fullSettings.siteFavicon);

    return res.status(200).json({
      success: true,
      data: fullSettings
    });

  } catch (error) {
    console.error('❌ getSettings error:', error);
    next(error);
  }
};

// ✅ UPDATE SETTINGS (FIXED CORE ISSUE WITH URL CLEANING)
export const updateSettings = async (req, res, next) => {
  try {
    console.log('🔵 UPDATE SETTINGS START');
    console.log('🔵 Request body keys:', Object.keys(req.body));

    // ✅ FIX: Correct query
    let settings = await Settings.findOne();

    if (!settings) {
      console.log('⚠️ Creating new settings...');
      settings = new Settings({});
    }

    const updateField = (field, value) => {
      settings[field] = value;
      console.log(`✅ ${field}:`, value);
    };

    // =============================
    // HANDLE ALL FIELDS CLEANLY
    // =============================

    Object.keys(req.body).forEach((key) => {
      let value = req.body[key];

      if (value === undefined) return;

      // 🔴 NEW: Clean URL fields
      if (key === 'siteLogo' || key === 'siteFavicon' || key === 'ogImage' || key === 'cdnUrl' || key === 'webhookUrl') {
        value = cleanUrl(value);
        console.log(`🔧 Cleaned URL for ${key}:`, value);
      }

      // ✅ Skip masked secrets
      if (
        ['smtpPassword', 'razorpaySecret', 'stripeSecret'].includes(key) &&
        value === '••••••••'
      ) return;

      // Convert types
      if (typeof value === 'string') {
        if (value === 'true') value = true;
        if (value === 'false') value = false;
        if (!isNaN(value) && value.trim() !== '') {
          value = Number(value);
        }
      }

      // Array handling
      if (typeof value === 'string' && value.includes(',')) {
        value = value.split(',').map(v => v.trim());
      }

      updateField(key, value);
    });

    await settings.save();
    console.log('✅ Settings saved to database with cleaned URLs');

    const savedSettings = await Settings.findOne();

    // Return cleaned settings
    const cleanedResponse = {
      ...savedSettings.toObject(),
      siteLogo: cleanUrl(savedSettings.siteLogo),
      siteFavicon: cleanUrl(savedSettings.siteFavicon)
    };

    return res.status(200).json({
      success: true,
      data: cleanedResponse,
      message: 'Settings updated successfully'
    });

  } catch (error) {
    console.error('❌ updateSettings error:', error);
    next(error);
  }
};

// ✅ RESET
export const resetSettings = async (req, res, next) => {
  try {
    await Settings.deleteMany();
    const newSettings = await Settings.create({});
    successResponse(res, newSettings);
  } catch (error) {
    next(error);
  }
};

// ============================================
// MAINTENANCE
// ============================================

export const getMaintenanceStatus = async (req, res, next) => {
  try {
    const s = await getOrCreateSettings();

    successResponse(res, {
      maintenanceMode: s.maintenanceMode,
      maintenanceMessage: s.maintenanceMessage
    });
  } catch (error) {
    next(error);
  }
};

export const updateMaintenanceMode = async (req, res, next) => {
  try {
    const s = await getOrCreateSettings();

    s.maintenanceMode = req.body.enabled;
    s.maintenanceMessage = req.body.message;

    await s.save();

    successResponse(res, s);
  } catch (error) {
    next(error);
  }
};

// ============================================
// FILE UPLOADS
// ============================================

export const uploadLogo = async (req, res, next) => {
  try {
    const { type } = req.params;

    if (!req.file) {
      return errorResponse(res, 'No file uploaded', 400);
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: `zauqapp/settings/${type}`,
      width: type === 'logo' ? 200 : 64,
      height: type === 'logo' ? 200 : 64,
      crop: 'limit',
      quality: 'auto:good'
    });

    // Clean up local file
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    const s = await getOrCreateSettings();

    const cleanedUrl = cleanUrl(result.secure_url);
    
    if (type === 'logo') {
      s.siteLogo = cleanedUrl;
    }
    if (type === 'favicon') {
      s.siteFavicon = cleanedUrl;
    }

    await s.save();

    successResponse(res, { url: cleanedUrl });
  } catch (error) {
    console.error('Error in uploadLogo:', error);
    next(error);
  }
};

export const uploadBanner = async (req, res, next) => {
  try {
    if (!req.file) {
      return errorResponse(res, 'No file uploaded', 400);
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'zauqapp/settings/banners',
      width: 1920,
      height: 400,
      crop: 'fill',
      quality: 'auto:good'
    });

    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    successResponse(res, { url: cleanUrl(result.secure_url) });
  } catch (error) {
    console.error('Error in uploadBanner:', error);
    next(error);
  }
};

// ============================================
// API KEYS
// ============================================

export const generateApiKey = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) return errorResponse(res, 'Name required');

    const key = crypto.randomBytes(32).toString('hex');

    const s = await getOrCreateSettings();

    if (!s.apiKeys) s.apiKeys = [];

    s.apiKeys.push({
      _id: crypto.randomBytes(12).toString('hex'),
      name,
      key,
      createdAt: new Date()
    });

    await s.save();

    successResponse(res, { name, key });
  } catch (error) {
    console.error('Error in generateApiKey:', error);
    next(error);
  }
};

export const deleteApiKey = async (req, res, next) => {
  try {
    const { keyId } = req.params;

    const s = await getOrCreateSettings();

    s.apiKeys = (s.apiKeys || []).filter(k => k._id !== keyId);

    await s.save();

    successResponse(res, null, 'Deleted');
  } catch (error) {
    console.error('Error in deleteApiKey:', error);
    next(error);
  }
};