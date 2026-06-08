// // server/controllers/settings.controller.js
// import Settings from '../models/Settings.js';
// import { successResponse, errorResponse } from '../utils/response.js';
// import cloudinary from '../config/cloudinary.js';
// import crypto from 'crypto';

// // Get settings
// export const getSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       // Create default settings
//       settings = await Settings.create({});
//     }
    
//     // Mask sensitive data for response
//     const maskedSettings = {
//       ...settings.toObject(),
//       razorpaySecret: settings.razorpaySecret ? '••••••••' : '',
//       stripeSecret: settings.stripeSecret ? '••••••••' : '',
//       smtpPassword: settings.smtpPassword ? '••••••••' : '',
//       apiKeys: settings.apiKeys.map(key => ({
//         ...key,
//         key: '••••••••' + key.key.slice(-4)
//       }))
//     };
    
//     successResponse(res, maskedSettings);
//   } catch (error) {
//     console.error('Error in getSettings:', error);
//     next(error);
//   }
// };

// // Update settings
// export const updateSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       settings = new Settings();
//     }
    
//     const updateData = { ...req.body };
    
//     // Only update sensitive fields if they are provided and not masked
//     if (updateData.razorpaySecret === '••••••••') delete updateData.razorpaySecret;
//     if (updateData.stripeSecret === '••••••••') delete updateData.stripeSecret;
//     if (updateData.smtpPassword === '••••••••') delete updateData.smtpPassword;
    
//     Object.assign(settings, updateData);
//     await settings.save();
    
//     successResponse(res, settings, 'Settings updated successfully');
//   } catch (error) {
//     console.error('Error in updateSettings:', error);
//     next(error);
//   }
// };

// // Reset settings to defaults
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

// // Get maintenance status
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

// // Update maintenance mode
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

// // Upload logo or favicon
// export const uploadLogo = async (req, res, next) => {
//   try {
//     const { type } = req.params; // 'logo' or 'favicon'
    
//     if (!req.file) {
//       return errorResponse(res, 'No file uploaded', 400);
//     }
    
//     // Upload to Cloudinary
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: `zauqapp/settings/${type}`,
//       width: type === 'logo' ? 200 : 64,
//       height: type === 'logo' ? 200 : 64,
//       crop: 'limit'
//     });
    
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

// // Upload banner
// export const uploadBanner = async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return errorResponse(res, 'No file uploaded', 400);
//     }
    
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: 'zauqapp/settings/banners',
//       width: 1920,
//       height: 400,
//       crop: 'fill'
//     });
    
//     successResponse(res, { url: result.secure_url }, 'Banner uploaded successfully');
//   } catch (error) {
//     console.error('Error in uploadBanner:', error);
//     next(error);
//   }
// };

// // Generate API Key
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

// // Delete API Key
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




















// // server/controllers/settings.controller.js
// import Settings from '../models/Settings.js';
// import { successResponse, errorResponse } from '../utils/response.js';
// import cloudinary from '../config/cloudinary.js';
// import crypto from 'crypto';

// // ============================================
// // PUBLIC ROUTES (No authentication required)
// // ============================================

// // Get public settings for frontend (site name, logo, favicon, theme colors)
// export const getPublicSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       // Return default settings if none exist
//       return successResponse(res, {
//         siteName: 'ZauqApp',
//         siteDescription: 'AI Powered Urdu Literary Ecosystem',
//         siteLogo: '',
//         siteFavicon: '',
//         theme: 'light',
//         primaryColor: '#8B4513',
//         secondaryColor: '#DAA520',
//         fontFamily: 'Inter',
//         maintenanceMode: false,
//         maintenanceMessage: 'Site is under maintenance. Please check back later.'
//       });
//     }
    
//     // Return only public-facing settings
//     successResponse(res, {
//       siteName: settings.siteName,
//       siteDescription: settings.siteDescription,
//       siteLogo: settings.siteLogo,
//       siteFavicon: settings.siteFavicon,
//       theme: settings.theme,
//       primaryColor: settings.primaryColor,
//       secondaryColor: settings.secondaryColor,
//       fontFamily: settings.fontFamily,
//       maintenanceMode: settings.maintenanceMode || false,
//       maintenanceMessage: settings.maintenanceMessage || ''
//     });
//   } catch (error) {
//     console.error('Error in getPublicSettings:', error);
//     next(error);
//   }
// };

// // Get theme settings only
// export const getThemeSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       return successResponse(res, {
//         theme: 'light',
//         primaryColor: '#8B4513',
//         secondaryColor: '#DAA520',
//         fontFamily: 'Inter'
//       });
//     }
    
//     successResponse(res, {
//       theme: settings.theme,
//       primaryColor: settings.primaryColor,
//       secondaryColor: settings.secondaryColor,
//       fontFamily: settings.fontFamily
//     });
//   } catch (error) {
//     console.error('Error in getThemeSettings:', error);
//     next(error);
//   }
// };

// // Get public maintenance status (for maintenance page)
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

// // Get settings
// export const getSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       // Create default settings
//       settings = await Settings.create({});
//     }
    
//     // Mask sensitive data for response
//     const maskedSettings = {
//       ...settings.toObject(),
//       razorpaySecret: settings.razorpaySecret ? '••••••••' : '',
//       stripeSecret: settings.stripeSecret ? '••••••••' : '',
//       smtpPassword: settings.smtpPassword ? '••••••••' : '',
//       apiKeys: settings.apiKeys.map(key => ({
//         ...key,
//         key: '••••••••' + key.key.slice(-4)
//       }))
//     };
    
//     successResponse(res, maskedSettings);
//   } catch (error) {
//     console.error('Error in getSettings:', error);
//     next(error);
//   }
// };

// // Update settings
// export const updateSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       settings = new Settings();
//     }
    
//     const updateData = { ...req.body };
    
//     // Only update sensitive fields if they are provided and not masked
//     if (updateData.razorpaySecret === '••••••••') delete updateData.razorpaySecret;
//     if (updateData.stripeSecret === '••••••••') delete updateData.stripeSecret;
//     if (updateData.smtpPassword === '••••••••') delete updateData.smtpPassword;
    
//     Object.assign(settings, updateData);
//     await settings.save();
    
//     successResponse(res, settings, 'Settings updated successfully');
//   } catch (error) {
//     console.error('Error in updateSettings:', error);
//     next(error);
//   }
// };

// // Reset settings to defaults
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

// // Get maintenance status (admin)
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

// // Update maintenance mode (admin)
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

// // Upload logo or favicon
// export const uploadLogo = async (req, res, next) => {
//   try {
//     const { type } = req.params; // 'logo' or 'favicon'
    
//     if (!req.file) {
//       return errorResponse(res, 'No file uploaded', 400);
//     }
    
//     // Upload to Cloudinary
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: `zauqapp/settings/${type}`,
//       width: type === 'logo' ? 200 : 64,
//       height: type === 'logo' ? 200 : 64,
//       crop: 'limit'
//     });
    
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

// // Upload banner
// export const uploadBanner = async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return errorResponse(res, 'No file uploaded', 400);
//     }
    
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: 'zauqapp/settings/banners',
//       width: 1920,
//       height: 400,
//       crop: 'fill'
//     });
    
//     successResponse(res, { url: result.secure_url }, 'Banner uploaded successfully');
//   } catch (error) {
//     console.error('Error in uploadBanner:', error);
//     next(error);
//   }
// };

// // Generate API Key
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

// // Delete API Key
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

















// // server/controllers/settings.controller.js
// //with proper separation between public and admin routes!

// import Settings from '../models/Settings.js';
// import { successResponse, errorResponse } from '../utils/response.js';
// import cloudinary from '../config/cloudinary.js';
// import crypto from 'crypto';

// // ============================================
// // PUBLIC ROUTES (No authentication required)
// // ============================================

// // Get public settings for frontend (site name, logo, favicon, theme colors)
// export const getPublicSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       // Return default settings if none exist
//       return successResponse(res, {
//         siteName: 'ZauqApp',
//         siteDescription: 'AI Powered Urdu Literary Ecosystem',
//         siteLogo: '',
//         siteFavicon: '',
//         contactEmail: '',
//         contactPhone: '',
//         address: '',
//         theme: 'light',
//         primaryColor: '#8B4513',
//         secondaryColor: '#DAA520',
//         fontFamily: 'Inter',
//         maintenanceMode: false,
//         maintenanceMessage: 'Site is under maintenance. Please check back later.'
//       });
//     }
    
//     // Return only public-facing settings
//     successResponse(res, {
//       siteName: settings.siteName || 'ZauqApp',
//       siteDescription: settings.siteDescription || 'AI Powered Urdu Literary Ecosystem',
//       siteLogo: settings.siteLogo || '',
//       siteFavicon: settings.siteFavicon || '',
//       contactEmail: settings.contactEmail || '',
//       contactPhone: settings.contactPhone || '',
//       address: settings.address || '',
//       theme: settings.theme || 'light',
//       primaryColor: settings.primaryColor || '#8B4513',
//       secondaryColor: settings.secondaryColor || '#DAA520',
//       fontFamily: settings.fontFamily || 'Inter',
//       maintenanceMode: settings.maintenanceMode || false,
//       maintenanceMessage: settings.maintenanceMessage || 'Site is under maintenance. Please check back later.'
//     });
//   } catch (error) {
//     console.error('Error in getPublicSettings:', error);
//     next(error);
//   }
// };

// // Get theme settings only
// export const getThemeSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       return successResponse(res, {
//         theme: 'light',
//         primaryColor: '#8B4513',
//         secondaryColor: '#DAA520',
//         fontFamily: 'Inter'
//       });
//     }
    
//     successResponse(res, {
//       theme: settings.theme || 'light',
//       primaryColor: settings.primaryColor || '#8B4513',
//       secondaryColor: settings.secondaryColor || '#DAA520',
//       fontFamily: settings.fontFamily || 'Inter'
//     });
//   } catch (error) {
//     console.error('Error in getThemeSettings:', error);
//     next(error);
//   }
// };

// // Get SEO settings
// export const getSeoSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       return successResponse(res, {
//         metaTitle: 'ZauqApp - Urdu Literary Ecosystem',
//         metaDescription: 'Discover the beauty of Urdu literature with AI-powered recommendations',
//         metaKeywords: ['urdu', 'poetry', 'literature', 'books', 'ghazal', 'nazm'],
//         ogImage: '',
//         twitterHandle: '@zauqapp'
//       });
//     }
    
//     successResponse(res, {
//       metaTitle: settings.metaTitle || settings.siteName || 'ZauqApp',
//       metaDescription: settings.metaDescription || settings.siteDescription || 'Discover the beauty of Urdu literature',
//       metaKeywords: settings.metaKeywords || [],
//       ogImage: settings.ogImage || settings.siteLogo || '',
//       twitterHandle: settings.twitterHandle || '@zauqapp'
//     });
//   } catch (error) {
//     console.error('Error in getSeoSettings:', error);
//     next(error);
//   }
// };

// // Get social media settings
// export const getSocialSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       return successResponse(res, {
//         facebook: '',
//         twitter: '',
//         instagram: '',
//         youtube: '',
//         linkedin: '',
//         github: ''
//       });
//     }
    
//     successResponse(res, {
//       facebook: settings.facebook || '',
//       twitter: settings.twitter || '',
//       instagram: settings.instagram || '',
//       youtube: settings.youtube || '',
//       linkedin: settings.linkedin || '',
//       github: settings.github || ''
//     });
//   } catch (error) {
//     console.error('Error in getSocialSettings:', error);
//     next(error);
//   }
// };

// // Get footer settings
// export const getFooterSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       return successResponse(res, {
//         footerText: 'Discover the beauty of Urdu literature',
//         footerColumns: [
//           { title: 'Quick Links', links: ['Home', 'About', 'Contact'] },
//           { title: 'Resources', links: ['Poetry', 'Books', 'Authors'] },
//           { title: 'Support', links: ['Help', 'Privacy Policy', 'Terms'] }
//         ],
//         showNewsletter: true,
//         copyrightText: `© ${new Date().getFullYear()} ZauqApp. All rights reserved.`
//       });
//     }
    
//     successResponse(res, {
//       footerText: settings.footerText || 'Discover the beauty of Urdu literature',
//       footerColumns: settings.footerColumns || [],
//       showNewsletter: settings.showNewsletter !== false,
//       copyrightText: settings.copyrightText || `© ${new Date().getFullYear()} ZauqApp. All rights reserved.`
//     });
//   } catch (error) {
//     console.error('Error in getFooterSettings:', error);
//     next(error);
//   }
// };

// // Get announcement settings
// export const getAnnouncementSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       return successResponse(res, {
//         showAnnouncement: false,
//         announcementText: '',
//         announcementLink: '',
//         announcementExpiry: null
//       });
//     }
    
//     // Check if announcement is expired
//     const isExpired = settings.announcementExpiry && new Date(settings.announcementExpiry) < new Date();
    
//     successResponse(res, {
//       showAnnouncement: settings.showAnnouncement || false,
//       announcementText: settings.announcementText || '',
//       announcementLink: settings.announcementLink || '',
//       announcementExpiry: settings.announcementExpiry || null,
//       isExpired: isExpired || false
//     });
//   } catch (error) {
//     console.error('Error in getAnnouncementSettings:', error);
//     next(error);
//   }
// };

// // Get public maintenance status (for maintenance page)
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

// // Get all settings (admin only - full access)
// export const getSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       // Create default settings
//       settings = await Settings.create({});
//     }
    
//     // Mask sensitive data for response
//     const maskedSettings = {
//       ...settings.toObject(),
//       razorpaySecret: settings.razorpaySecret ? '••••••••' : '',
//       stripeSecret: settings.stripeSecret ? '••••••••' : '',
//       smtpPassword: settings.smtpPassword ? '••••••••' : '',
//       apiKeys: settings.apiKeys ? settings.apiKeys.map(key => ({
//         ...key.toObject(),
//         key: '••••••••' + key.key.slice(-4)
//       })) : []
//     };
    
//     successResponse(res, maskedSettings);
//   } catch (error) {
//     console.error('Error in getSettings:', error);
//     next(error);
//   }
// };

// // Update settings (admin only)
// export const updateSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       settings = new Settings();
//     }
    
//     const updateData = { ...req.body };
    
//     // Only update sensitive fields if they are provided and not masked
//     if (updateData.razorpaySecret === '••••••••') delete updateData.razorpaySecret;
//     if (updateData.stripeSecret === '••••••••') delete updateData.stripeSecret;
//     if (updateData.smtpPassword === '••••••••') delete updateData.smtpPassword;
    
//     Object.assign(settings, updateData);
//     await settings.save();
    
//     successResponse(res, settings, 'Settings updated successfully');
//   } catch (error) {
//     console.error('Error in updateSettings:', error);
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
//     const { type } = req.params; // 'logo' or 'favicon'
    
//     if (!req.file) {
//       return errorResponse(res, 'No file uploaded', 400);
//     }
    
//     // Upload to Cloudinary
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: `zauqapp/settings/${type}`,
//       width: type === 'logo' ? 200 : 64,
//       height: type === 'logo' ? 200 : 64,
//       crop: 'limit',
//       quality: 'auto:good'
//     });
    
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
















// // server/controllers/settings.controller.js
// import Settings from '../models/Settings.js';
// import { successResponse, errorResponse } from '../utils/response.js';
// import cloudinary from '../config/cloudinary.js';
// import crypto from 'crypto';

// // ============================================
// // PUBLIC ROUTES (No authentication required)
// // ============================================

// // Get public settings for frontend (site name, logo, favicon, theme colors)
// export const getPublicSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       // Return default settings if none exist
//       return successResponse(res, {
//         siteName: 'ZauqApp',
//         siteDescription: 'AI Powered Urdu Literary Ecosystem',
//         siteLogo: '',
//         siteFavicon: '',
//         contactEmail: 'admin@zauqapp.com',
//         contactPhone: '',
//         address: '',
//         theme: 'light',
//         primaryColor: '#8B4513',
//         secondaryColor: '#DAA520',
//         fontFamily: 'Inter',
//         maintenanceMode: false,
//         maintenanceMessage: 'Site is under maintenance. Please check back later.'
//       });
//     }
    
//     // Return only public-facing settings
//     successResponse(res, {
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
//     });
//   } catch (error) {
//     console.error('Error in getPublicSettings:', error);
//     next(error);
//   }
// };

// // Get theme settings only
// export const getThemeSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       return successResponse(res, {
//         theme: 'light',
//         primaryColor: '#8B4513',
//         secondaryColor: '#DAA520',
//         fontFamily: 'Inter'
//       });
//     }
    
//     successResponse(res, {
//       theme: settings.theme || 'light',
//       primaryColor: settings.primaryColor || '#8B4513',
//       secondaryColor: settings.secondaryColor || '#DAA520',
//       fontFamily: settings.fontFamily || 'Inter'
//     });
//   } catch (error) {
//     console.error('Error in getThemeSettings:', error);
//     next(error);
//   }
// };

// // Get SEO settings
// export const getSeoSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       return successResponse(res, {
//         metaTitle: 'ZauqApp - Urdu Literary Ecosystem',
//         metaDescription: 'Discover the beauty of Urdu literature with AI-powered recommendations',
//         metaKeywords: ['urdu', 'poetry', 'literature', 'books', 'ghazal', 'nazm'],
//         ogImage: '',
//         twitterHandle: '@zauqapp'
//       });
//     }
    
//     successResponse(res, {
//       metaTitle: settings.metaTitle || settings.siteName || 'ZauqApp',
//       metaDescription: settings.metaDescription || settings.siteDescription || 'Discover the beauty of Urdu literature',
//       metaKeywords: settings.metaKeywords || [],
//       ogImage: settings.ogImage || settings.siteLogo || '',
//       twitterHandle: settings.twitterHandle || '@zauqapp'
//     });
//   } catch (error) {
//     console.error('Error in getSeoSettings:', error);
//     next(error);
//   }
// };

// // Get social media settings
// export const getSocialSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       return successResponse(res, {
//         facebook: '',
//         twitter: '',
//         instagram: '',
//         youtube: '',
//         linkedin: '',
//         github: ''
//       });
//     }
    
//     successResponse(res, {
//       facebook: settings.facebook || '',
//       twitter: settings.twitter || '',
//       instagram: settings.instagram || '',
//       youtube: settings.youtube || '',
//       linkedin: settings.linkedin || '',
//       github: settings.github || ''
//     });
//   } catch (error) {
//     console.error('Error in getSocialSettings:', error);
//     next(error);
//   }
// };

// // Get footer settings
// export const getFooterSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       return successResponse(res, {
//         footerText: 'Discover the beauty of Urdu literature',
//         footerColumns: [
//           { title: 'Quick Links', links: ['Home', 'About', 'Contact'] },
//           { title: 'Resources', links: ['Poetry', 'Books', 'Authors'] },
//           { title: 'Support', links: ['Help', 'Privacy Policy', 'Terms'] }
//         ],
//         showNewsletter: true,
//         copyrightText: `© ${new Date().getFullYear()} ZauqApp. All rights reserved.`
//       });
//     }
    
//     successResponse(res, {
//       footerText: settings.footerText || 'Discover the beauty of Urdu literature',
//       footerColumns: settings.footerColumns || [],
//       showNewsletter: settings.showNewsletter !== false,
//       copyrightText: settings.copyrightText || `© ${new Date().getFullYear()} ZauqApp. All rights reserved.`
//     });
//   } catch (error) {
//     console.error('Error in getFooterSettings:', error);
//     next(error);
//   }
// };

// // Get announcement settings
// export const getAnnouncementSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       return successResponse(res, {
//         showAnnouncement: false,
//         announcementText: '',
//         announcementLink: '',
//         announcementExpiry: null
//       });
//     }
    
//     // Check if announcement is expired
//     const isExpired = settings.announcementExpiry && new Date(settings.announcementExpiry) < new Date();
    
//     successResponse(res, {
//       showAnnouncement: settings.showAnnouncement || false,
//       announcementText: settings.announcementText || '',
//       announcementLink: settings.announcementLink || '',
//       announcementExpiry: settings.announcementExpiry || null,
//       isExpired: isExpired || false
//     });
//   } catch (error) {
//     console.error('Error in getAnnouncementSettings:', error);
//     next(error);
//   }
// };

// // Get public maintenance status (for maintenance page)
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

// // Get all settings (admin only - full access)
// export const getSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       // Create default settings
//       settings = await Settings.create({});
//     }
    
//     // Mask sensitive data for response
//     const maskedSettings = {
//       ...settings.toObject(),
//       razorpaySecret: settings.razorpaySecret ? '••••••••' : '',
//       stripeSecret: settings.stripeSecret ? '••••••••' : '',
//       smtpPassword: settings.smtpPassword ? '••••••••' : '',
//       apiKeys: settings.apiKeys ? settings.apiKeys.map(key => ({
//         ...key.toObject(),
//         key: '••••••••' + key.key.slice(-4)
//       })) : []
//     };
    
//     successResponse(res, maskedSettings);
//   } catch (error) {
//     console.error('Error in getSettings:', error);
//     next(error);
//   }
// };

// // Update settings (admin only)
// export const updateSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       settings = new Settings();
//     }
    
//     const updateData = { ...req.body };
    
//     // Only update sensitive fields if they are provided and not masked
//     if (updateData.razorpaySecret === '••••••••') delete updateData.razorpaySecret;
//     if (updateData.stripeSecret === '••••••••') delete updateData.stripeSecret;
//     if (updateData.smtpPassword === '••••••••') delete updateData.smtpPassword;
    
//     Object.assign(settings, updateData);
//     await settings.save();
    
//     successResponse(res, settings, 'Settings updated successfully');
//   } catch (error) {
//     console.error('Error in updateSettings:', error);
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
//     const { type } = req.params; // 'logo' or 'favicon'
    
//     if (!req.file) {
//       return errorResponse(res, 'No file uploaded', 400);
//     }
    
//     // Upload to Cloudinary
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: `zauqapp/settings/${type}`,
//       width: type === 'logo' ? 200 : 64,
//       height: type === 'logo' ? 200 : 64,
//       crop: 'limit',
//       quality: 'auto:good'
//     });
    
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














// // server/controllers/settings.controller.js
// import Settings from '../models/Settings.js';
// import { successResponse, errorResponse } from '../utils/response.js';
// import cloudinary from '../config/cloudinary.js';
// import crypto from 'crypto';

// // ============================================
// // PUBLIC ROUTES (No authentication required)
// // ============================================

// // Get public settings for frontend (site name, logo, favicon, theme colors)
// export const getPublicSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       return successResponse(res, {
//         siteName: 'ZauqApp',
//         siteDescription: 'AI Powered Urdu Literary Ecosystem',
//         siteLogo: '',
//         siteFavicon: '',
//         contactEmail: 'admin@zauqapp.com',
//         contactPhone: '',
//         address: '',
//         theme: 'light',
//         primaryColor: '#8B4513',
//         secondaryColor: '#DAA520',
//         fontFamily: 'Inter',
//         maintenanceMode: false,
//         maintenanceMessage: 'Site is under maintenance. Please check back later.'
//       });
//     }
    
//     successResponse(res, {
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
//     });
//   } catch (error) {
//     console.error('Error in getPublicSettings:', error);
//     next(error);
//   }
// };

// // Get theme settings only
// export const getThemeSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       return successResponse(res, {
//         theme: 'light',
//         primaryColor: '#8B4513',
//         secondaryColor: '#DAA520',
//         fontFamily: 'Inter'
//       });
//     }
    
//     successResponse(res, {
//       theme: settings.theme || 'light',
//       primaryColor: settings.primaryColor || '#8B4513',
//       secondaryColor: settings.secondaryColor || '#DAA520',
//       fontFamily: settings.fontFamily || 'Inter'
//     });
//   } catch (error) {
//     console.error('Error in getThemeSettings:', error);
//     next(error);
//   }
// };

// // Get SEO settings
// export const getSeoSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       return successResponse(res, {
//         metaTitle: 'ZauqApp - Urdu Literary Ecosystem',
//         metaDescription: 'Discover the beauty of Urdu literature with AI-powered recommendations',
//         metaKeywords: ['urdu', 'poetry', 'literature', 'books', 'ghazal', 'nazm'],
//         ogImage: '',
//         twitterHandle: '@zauqapp'
//       });
//     }
    
//     successResponse(res, {
//       metaTitle: settings.metaTitle || settings.siteName || 'ZauqApp',
//       metaDescription: settings.metaDescription || settings.siteDescription || 'Discover the beauty of Urdu literature',
//       metaKeywords: settings.metaKeywords || [],
//       ogImage: settings.ogImage || settings.siteLogo || '',
//       twitterHandle: settings.twitterHandle || '@zauqapp'
//     });
//   } catch (error) {
//     console.error('Error in getSeoSettings:', error);
//     next(error);
//   }
// };

// // Get social media settings
// export const getSocialSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       return successResponse(res, {
//         facebook: '',
//         twitter: '',
//         instagram: '',
//         youtube: '',
//         linkedin: '',
//         github: ''
//       });
//     }
    
//     successResponse(res, {
//       facebook: settings.facebook || '',
//       twitter: settings.twitter || '',
//       instagram: settings.instagram || '',
//       youtube: settings.youtube || '',
//       linkedin: settings.linkedin || '',
//       github: settings.github || ''
//     });
//   } catch (error) {
//     console.error('Error in getSocialSettings:', error);
//     next(error);
//   }
// };

// // Get footer settings
// export const getFooterSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       return successResponse(res, {
//         footerText: 'Discover the beauty of Urdu literature',
//         footerColumns: [
//           { title: 'Quick Links', links: ['Home', 'About', 'Contact'] },
//           { title: 'Resources', links: ['Poetry', 'Books', 'Authors'] },
//           { title: 'Support', links: ['Help', 'Privacy Policy', 'Terms'] }
//         ],
//         showNewsletter: true,
//         copyrightText: `© ${new Date().getFullYear()} ZauqApp. All rights reserved.`
//       });
//     }
    
//     successResponse(res, {
//       footerText: settings.footerText || 'Discover the beauty of Urdu literature',
//       footerColumns: settings.footerColumns || [],
//       showNewsletter: settings.showNewsletter !== false,
//       copyrightText: settings.copyrightText || `© ${new Date().getFullYear()} ZauqApp. All rights reserved.`
//     });
//   } catch (error) {
//     console.error('Error in getFooterSettings:', error);
//     next(error);
//   }
// };

// // Get announcement settings
// export const getAnnouncementSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       return successResponse(res, {
//         showAnnouncement: false,
//         announcementText: '',
//         announcementLink: '',
//         announcementExpiry: null
//       });
//     }
    
//     const isExpired = settings.announcementExpiry && new Date(settings.announcementExpiry) < new Date();
    
//     successResponse(res, {
//       showAnnouncement: settings.showAnnouncement || false,
//       announcementText: settings.announcementText || '',
//       announcementLink: settings.announcementLink || '',
//       announcementExpiry: settings.announcementExpiry || null,
//       isExpired: isExpired || false
//     });
//   } catch (error) {
//     console.error('Error in getAnnouncementSettings:', error);
//     next(error);
//   }
// };

// // Get public maintenance status (for maintenance page)
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

// // Get all settings (admin only - full access)
// export const getSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       settings = await Settings.create({});
//     }
    
//     const maskedSettings = {
//       ...settings.toObject(),
//       razorpaySecret: settings.razorpaySecret ? '••••••••' : '',
//       stripeSecret: settings.stripeSecret ? '••••••••' : '',
//       smtpPassword: settings.smtpPassword ? '••••••••' : '',
//       apiKeys: settings.apiKeys ? settings.apiKeys.map(key => ({
//         ...key.toObject(),
//         key: '••••••••' + key.key.slice(-4)
//       })) : []
//     };
    
//     successResponse(res, maskedSettings);
//   } catch (error) {
//     console.error('Error in getSettings:', error);
//     next(error);
//   }
// };

// // ============================================
// // 🔴 FIXED: Update settings with better error handling
// // ============================================
// export const updateSettings = async (req, res, next) => {
//   try {
//     console.log('🔵 ========== UPDATE SETTINGS START ==========');
//     console.log('🔵 Request body received:', JSON.stringify(req.body, null, 2));
//     console.log('🔵 User ID:', req.user?.id);
//     console.log('🔵 User Role:', req.user?.role);
    
//     // Find or create settings document
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       console.log('⚠️ No settings found, creating new document...');
//       settings = new Settings();
//     } else {
//       console.log('✅ Existing settings found with ID:', settings._id);
//     }
    
//     // Create a clean update object (only include fields that exist in schema)
//     const allowedFields = [
//       // General Settings
//       'siteName', 'siteDescription', 'siteLogo', 'siteFavicon',
//       'contactEmail', 'contactPhone', 'address',
//       // Content Settings
//       'itemsPerPage', 'enableComments', 'enableRatings', 'autoApproveContent', 'enableUserUploads',
//       // Media Settings
//       'maxImageSize', 'maxVideoSize', 'maxAudioSize',
//       'allowedImageFormats', 'allowedVideoFormats', 'allowedAudioFormats',
//       // Security Settings
//       'enableTwoFactor', 'sessionTimeout', 'maxLoginAttempts', 'passwordExpiryDays', 'enableCaptcha',
//       // Email Settings
//       'smtpHost', 'smtpPort', 'smtpUser', 'smtpPassword', 'senderEmail', 'senderName',
//       // API Settings
//       'webhookUrl',
//       // Payment Settings
//       'currency', 'razorpayKey', 'razorpaySecret', 'stripeKey', 'stripeSecret',
//       // Cache Settings
//       'enableCache', 'cacheDuration', 'enableCDN', 'cdnUrl',
//       // Maintenance Mode
//       'maintenanceMode', 'maintenanceMessage',
//       // Appearance
//       'theme', 'primaryColor', 'secondaryColor', 'fontFamily'
//     ];
    
//     // Only update allowed fields
//     for (const field of allowedFields) {
//       if (req.body[field] !== undefined) {
//         // Skip masked sensitive fields
//         if (field === 'razorpaySecret' && req.body[field] === '••••••••') continue;
//         if (field === 'stripeSecret' && req.body[field] === '••••••••') continue;
//         if (field === 'smtpPassword' && req.body[field] === '••••••••') continue;
        
//         settings[field] = req.body[field];
//         console.log(`✅ Updated field: ${field} = ${typeof req.body[field] === 'object' ? JSON.stringify(req.body[field]) : req.body[field]}`);
//       }
//     }
    
//     console.log('🔵 Saving settings to database...');
//     await settings.save();
//     console.log('✅ Settings saved successfully!');
    
//     // Return masked settings
//     const maskedSettings = {
//       ...settings.toObject(),
//       razorpaySecret: settings.razorpaySecret ? '••••••••' : '',
//       stripeSecret: settings.stripeSecret ? '••••••••' : '',
//       smtpPassword: settings.smtpPassword ? '••••••••' : '',
//       apiKeys: settings.apiKeys ? settings.apiKeys.map(key => ({
//         ...key.toObject(),
//         key: '••••••••' + key.key.slice(-4)
//       })) : []
//     };
    
//     console.log('🔵 ========== UPDATE SETTINGS END ==========');
    
//     successResponse(res, maskedSettings, 'Settings updated successfully');
//   } catch (error) {
//     console.error('❌ Error in updateSettings:', error);
//     console.error('❌ Error name:', error.name);
//     console.error('❌ Error message:', error.message);
//     console.error('❌ Error stack:', error.stack);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       console.error('❌ Validation errors:', errors);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
//     }
    
//     if (error.code === 11000) {
//       console.error('❌ Duplicate key error');
//       return errorResponse(res, 'Duplicate field value error', 400);
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















// // server/controllers/settings.controller.js
// import Settings from '../models/Settings.js';
// import { successResponse, errorResponse } from '../utils/response.js';
// import cloudinary from '../config/cloudinary.js';
// import crypto from 'crypto';

// // ============================================
// // PUBLIC ROUTES (No authentication required)
// // ============================================

// // Get public settings for frontend (site name, logo, favicon, theme colors)
// export const getPublicSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     const publicData = {
//       siteName: settings?.siteName || 'ZauqApp',
//       siteDescription: settings?.siteDescription || 'AI Powered Urdu Literary Ecosystem',
//       siteLogo: settings?.siteLogo || '',
//       siteFavicon: settings?.siteFavicon || '',
//       contactEmail: settings?.contactEmail || 'admin@zauqapp.com',
//       contactPhone: settings?.contactPhone || '',
//       address: settings?.address || '',
//       theme: settings?.theme || 'light',
//       primaryColor: settings?.primaryColor || '#8B4513',
//       secondaryColor: settings?.secondaryColor || '#DAA520',
//       fontFamily: settings?.fontFamily || 'Inter',
//       maintenanceMode: settings?.maintenanceMode || false,
//       maintenanceMessage: settings?.maintenanceMessage || 'Site is under maintenance. Please check back later.'
//     };
    
//     successResponse(res, publicData);
//   } catch (error) {
//     console.error('Error in getPublicSettings:', error);
//     next(error);
//   }
// };

// // Get theme settings only
// export const getThemeSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       return successResponse(res, {
//         theme: 'light',
//         primaryColor: '#8B4513',
//         secondaryColor: '#DAA520',
//         fontFamily: 'Inter'
//       });
//     }
    
//     successResponse(res, {
//       theme: settings.theme || 'light',
//       primaryColor: settings.primaryColor || '#8B4513',
//       secondaryColor: settings.secondaryColor || '#DAA520',
//       fontFamily: settings.fontFamily || 'Inter'
//     });
//   } catch (error) {
//     console.error('Error in getThemeSettings:', error);
//     next(error);
//   }
// };

// // Get SEO settings
// export const getSeoSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       return successResponse(res, {
//         metaTitle: 'ZauqApp - Urdu Literary Ecosystem',
//         metaDescription: 'Discover the beauty of Urdu literature with AI-powered recommendations',
//         metaKeywords: ['urdu', 'poetry', 'literature', 'books', 'ghazal', 'nazm'],
//         ogImage: '',
//         twitterHandle: '@zauqapp'
//       });
//     }
    
//     successResponse(res, {
//       metaTitle: settings.metaTitle || settings.siteName || 'ZauqApp',
//       metaDescription: settings.metaDescription || settings.siteDescription || 'Discover the beauty of Urdu literature',
//       metaKeywords: settings.metaKeywords || [],
//       ogImage: settings.ogImage || settings.siteLogo || '',
//       twitterHandle: settings.twitterHandle || '@zauqapp'
//     });
//   } catch (error) {
//     console.error('Error in getSeoSettings:', error);
//     next(error);
//   }
// };

// // Get social media settings
// export const getSocialSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       return successResponse(res, {
//         facebook: '',
//         twitter: '',
//         instagram: '',
//         youtube: '',
//         linkedin: '',
//         github: ''
//       });
//     }
    
//     successResponse(res, {
//       facebook: settings.facebook || '',
//       twitter: settings.twitter || '',
//       instagram: settings.instagram || '',
//       youtube: settings.youtube || '',
//       linkedin: settings.linkedin || '',
//       github: settings.github || ''
//     });
//   } catch (error) {
//     console.error('Error in getSocialSettings:', error);
//     next(error);
//   }
// };

// // Get footer settings
// export const getFooterSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       return successResponse(res, {
//         footerText: 'Discover the beauty of Urdu literature',
//         footerColumns: [
//           { title: 'Quick Links', links: ['Home', 'About', 'Contact'] },
//           { title: 'Resources', links: ['Poetry', 'Books', 'Authors'] },
//           { title: 'Support', links: ['Help', 'Privacy Policy', 'Terms'] }
//         ],
//         showNewsletter: true,
//         copyrightText: `© ${new Date().getFullYear()} ZauqApp. All rights reserved.`
//       });
//     }
    
//     successResponse(res, {
//       footerText: settings.footerText || 'Discover the beauty of Urdu literature',
//       footerColumns: settings.footerColumns || [],
//       showNewsletter: settings.showNewsletter !== false,
//       copyrightText: settings.copyrightText || `© ${new Date().getFullYear()} ZauqApp. All rights reserved.`
//     });
//   } catch (error) {
//     console.error('Error in getFooterSettings:', error);
//     next(error);
//   }
// };

// // Get announcement settings
// export const getAnnouncementSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       return successResponse(res, {
//         showAnnouncement: false,
//         announcementText: '',
//         announcementLink: '',
//         announcementExpiry: null
//       });
//     }
    
//     const isExpired = settings.announcementExpiry && new Date(settings.announcementExpiry) < new Date();
    
//     successResponse(res, {
//       showAnnouncement: settings.showAnnouncement || false,
//       announcementText: settings.announcementText || '',
//       announcementLink: settings.announcementLink || '',
//       announcementExpiry: settings.announcementExpiry || null,
//       isExpired: isExpired || false
//     });
//   } catch (error) {
//     console.error('Error in getAnnouncementSettings:', error);
//     next(error);
//   }
// };

// // Get public maintenance status (for maintenance page)
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

// // Get all settings (admin only - full access)
// export const getSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       settings = await Settings.create({});
//     }
    
//     // Explicitly include all fields to ensure they are returned
//     const responseData = {
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
//       smtpPassword: settings.smtpPassword ? '••••••••' : '',
//       senderEmail: settings.senderEmail || '',
//       senderName: settings.senderName || '',
      
//       // API Settings
//       apiKeys: settings.apiKeys || [],
//       webhookUrl: settings.webhookUrl || '',
      
//       // Payment Settings
//       currency: settings.currency || 'INR',
//       razorpayKey: settings.razorpayKey || '',
//       razorpaySecret: settings.razorpaySecret ? '••••••••' : '',
//       stripeKey: settings.stripeKey || '',
//       stripeSecret: settings.stripeSecret ? '••••••••' : '',
      
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
    
//     successResponse(res, responseData);
//   } catch (error) {
//     console.error('Error in getSettings:', error);
//     next(error);
//   }
// };

// // Update settings (admin only)
// export const updateSettings = async (req, res, next) => {
//   try {
//     console.log('🔵 ========== UPDATE SETTINGS START ==========');
//     console.log('🔵 Request body received:', JSON.stringify(req.body, null, 2));
//     console.log('🔵 User ID:', req.user?.id);
//     console.log('🔵 User Role:', req.user?.role);
    
//     // Find or create settings document
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       console.log('⚠️ No settings found, creating new document...');
//       settings = new Settings();
//     } else {
//       console.log('✅ Existing settings found with ID:', settings._id);
//     }
    
//     // Create a clean update object (only include fields that exist in schema)
//     const allowedFields = [
//       // General Settings
//       'siteName', 'siteDescription', 'siteLogo', 'siteFavicon',
//       'contactEmail', 'contactPhone', 'address',
//       // Content Settings
//       'itemsPerPage', 'enableComments', 'enableRatings', 'autoApproveContent', 'enableUserUploads',
//       // Media Settings
//       'maxImageSize', 'maxVideoSize', 'maxAudioSize',
//       'allowedImageFormats', 'allowedVideoFormats', 'allowedAudioFormats',
//       // Security Settings
//       'enableTwoFactor', 'sessionTimeout', 'maxLoginAttempts', 'passwordExpiryDays', 'enableCaptcha',
//       // Email Settings
//       'smtpHost', 'smtpPort', 'smtpUser', 'smtpPassword', 'senderEmail', 'senderName',
//       // API Settings
//       'webhookUrl',
//       // Payment Settings
//       'currency', 'razorpayKey', 'razorpaySecret', 'stripeKey', 'stripeSecret',
//       // Cache Settings
//       'enableCache', 'cacheDuration', 'enableCDN', 'cdnUrl',
//       // Maintenance Mode
//       'maintenanceMode', 'maintenanceMessage',
//       // Appearance
//       'theme', 'primaryColor', 'secondaryColor', 'fontFamily'
//     ];
    
//     // Only update allowed fields
//     for (const field of allowedFields) {
//       if (req.body[field] !== undefined) {
//         // Skip masked sensitive fields
//         if (field === 'razorpaySecret' && req.body[field] === '••••••••') continue;
//         if (field === 'stripeSecret' && req.body[field] === '••••••••') continue;
//         if (field === 'smtpPassword' && req.body[field] === '••••••••') continue;
        
//         settings[field] = req.body[field];
//         console.log(`✅ Updated field: ${field} = ${typeof req.body[field] === 'object' ? JSON.stringify(req.body[field]) : req.body[field]}`);
//       }
//     }
    
//     console.log('🔵 Saving settings to database...');
//     await settings.save();
//     console.log('✅ Settings saved successfully!');
    
//     // Return masked settings
//     const responseData = {
//       // General Settings
//       siteName: settings.siteName,
//       siteDescription: settings.siteDescription,
//       siteLogo: settings.siteLogo,
//       siteFavicon: settings.siteFavicon,
//       contactEmail: settings.contactEmail,
//       contactPhone: settings.contactPhone || '',
//       address: settings.address || '',
      
//       // Content Settings
//       itemsPerPage: settings.itemsPerPage,
//       enableComments: settings.enableComments,
//       enableRatings: settings.enableRatings,
//       autoApproveContent: settings.autoApproveContent,
//       enableUserUploads: settings.enableUserUploads,
      
//       // Media Settings
//       maxImageSize: settings.maxImageSize,
//       maxVideoSize: settings.maxVideoSize,
//       maxAudioSize: settings.maxAudioSize,
//       allowedImageFormats: settings.allowedImageFormats,
//       allowedVideoFormats: settings.allowedVideoFormats,
//       allowedAudioFormats: settings.allowedAudioFormats,
      
//       // Security Settings
//       enableTwoFactor: settings.enableTwoFactor,
//       sessionTimeout: settings.sessionTimeout,
//       maxLoginAttempts: settings.maxLoginAttempts,
//       passwordExpiryDays: settings.passwordExpiryDays,
//       enableCaptcha: settings.enableCaptcha,
      
//       // Email Settings
//       smtpHost: settings.smtpHost,
//       smtpPort: settings.smtpPort,
//       smtpUser: settings.smtpUser,
//       smtpPassword: settings.smtpPassword ? '••••••••' : '',
//       senderEmail: settings.senderEmail,
//       senderName: settings.senderName,
      
//       // API Settings
//       apiKeys: settings.apiKeys || [],
//       webhookUrl: settings.webhookUrl,
      
//       // Payment Settings
//       currency: settings.currency,
//       razorpayKey: settings.razorpayKey,
//       razorpaySecret: settings.razorpaySecret ? '••••••••' : '',
//       stripeKey: settings.stripeKey,
//       stripeSecret: settings.stripeSecret ? '••••••••' : '',
      
//       // Cache Settings
//       enableCache: settings.enableCache,
//       cacheDuration: settings.cacheDuration,
//       enableCDN: settings.enableCDN,
//       cdnUrl: settings.cdnUrl,
      
//       // Maintenance Mode
//       maintenanceMode: settings.maintenanceMode,
//       maintenanceMessage: settings.maintenanceMessage,
      
//       // Appearance
//       theme: settings.theme,
//       primaryColor: settings.primaryColor,
//       secondaryColor: settings.secondaryColor,
//       fontFamily: settings.fontFamily
//     };
    
//     console.log('🔵 ========== UPDATE SETTINGS END ==========');
    
//     successResponse(res, responseData, 'Settings updated successfully');
//   } catch (error) {
//     console.error('❌ Error in updateSettings:', error);
//     console.error('❌ Error name:', error.name);
//     console.error('❌ Error message:', error.message);
//     console.error('❌ Error stack:', error.stack);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       console.error('❌ Validation errors:', errors);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
//     }
    
//     if (error.code === 11000) {
//       console.error('❌ Duplicate key error');
//       return errorResponse(res, 'Duplicate field value error', 400);
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
    
//     // Upload to Cloudinary
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: `zauqapp/settings/${type}`,
//       width: type === 'logo' ? 200 : 64,
//       height: type === 'logo' ? 200 : 64,
//       crop: 'limit',
//       quality: 'auto:good'
//     });
    
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


























// // server/controllers/settings.controller.js
// import Settings from '../models/Settings.js';
// import { successResponse, errorResponse } from '../utils/response.js';
// import cloudinary from '../config/cloudinary.js';
// import crypto from 'crypto';

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

// // ============================================
// // ADMIN ROUTES
// // ============================================

// // Get all settings (admin only)
// export const getSettings = async (req, res, next) => {
//   try {
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       settings = await Settings.create({});
//     }
    
//     // Return all settings with proper formatting
//     const responseData = {
//       // General Settings
//       siteName: settings.siteName,
//       siteDescription: settings.siteDescription,
//       siteLogo: settings.siteLogo,
//       siteFavicon: settings.siteFavicon,
//       contactEmail: settings.contactEmail,
//       contactPhone: settings.contactPhone || '',
//       address: settings.address || '',
      
//       // SEO & Social
//       metaTitle: settings.metaTitle || '',
//       metaDescription: settings.metaDescription || '',
//       metaKeywords: settings.metaKeywords || [],
//       ogImage: settings.ogImage || '',
//       twitterHandle: settings.twitterHandle || '',
      
//       // Social Links
//       facebook: settings.facebook || '',
//       twitter: settings.twitter || '',
//       instagram: settings.instagram || '',
//       youtube: settings.youtube || '',
//       linkedin: settings.linkedin || '',
//       github: settings.github || '',
      
//       // Footer
//       footerText: settings.footerText || '',
//       footerColumns: settings.footerColumns || [],
//       showNewsletter: settings.showNewsletter !== false,
//       copyrightText: settings.copyrightText || '',
      
//       // Announcement
//       showAnnouncement: settings.showAnnouncement || false,
//       announcementText: settings.announcementText || '',
//       announcementLink: settings.announcementLink || '',
//       announcementExpiry: settings.announcementExpiry || null,
      
//       // Content Settings
//       itemsPerPage: settings.itemsPerPage,
//       enableComments: settings.enableComments,
//       enableRatings: settings.enableRatings,
//       autoApproveContent: settings.autoApproveContent,
//       enableUserUploads: settings.enableUserUploads,
      
//       // Media Settings
//       maxImageSize: settings.maxImageSize,
//       maxVideoSize: settings.maxVideoSize,
//       maxAudioSize: settings.maxAudioSize,
//       allowedImageFormats: settings.allowedImageFormats,
//       allowedVideoFormats: settings.allowedVideoFormats,
//       allowedAudioFormats: settings.allowedAudioFormats,
      
//       // Security Settings
//       enableTwoFactor: settings.enableTwoFactor,
//       sessionTimeout: settings.sessionTimeout,
//       maxLoginAttempts: settings.maxLoginAttempts,
//       passwordExpiryDays: settings.passwordExpiryDays,
//       enableCaptcha: settings.enableCaptcha,
      
//       // Email Settings
//       smtpHost: settings.smtpHost,
//       smtpPort: settings.smtpPort,
//       smtpUser: settings.smtpUser,
//       smtpPassword: settings.smtpPassword ? '••••••••' : '',
//       senderEmail: settings.senderEmail,
//       senderName: settings.senderName,
      
//       // API Settings
//       apiKeys: settings.apiKeys || [],
//       webhookUrl: settings.webhookUrl,
      
//       // Payment Settings
//       currency: settings.currency,
//       razorpayKey: settings.razorpayKey,
//       razorpaySecret: settings.razorpaySecret ? '••••••••' : '',
//       stripeKey: settings.stripeKey,
//       stripeSecret: settings.stripeSecret ? '••••••••' : '',
      
//       // Cache Settings
//       enableCache: settings.enableCache,
//       cacheDuration: settings.cacheDuration,
//       enableCDN: settings.enableCDN,
//       cdnUrl: settings.cdnUrl,
      
//       // Maintenance Mode
//       maintenanceMode: settings.maintenanceMode,
//       maintenanceMessage: settings.maintenanceMessage,
      
//       // Appearance
//       theme: settings.theme,
//       primaryColor: settings.primaryColor,
//       secondaryColor: settings.secondaryColor,
//       fontFamily: settings.fontFamily
//     };
    
//     successResponse(res, responseData);
//   } catch (error) {
//     console.error('Error in getSettings:', error);
//     next(error);
//   }
// };

// // Update settings (admin only) - FIXED to save all fields
// export const updateSettings = async (req, res, next) => {
//   try {
//     console.log('🔵 ========== UPDATE SETTINGS START ==========');
//     console.log('🔵 Request body keys:', Object.keys(req.body));
    
//     // Find or create settings document
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       console.log('⚠️ No settings found, creating new document...');
//       settings = new Settings();
//     }
    
//     // List of all possible fields - UPDATE THIS LIST
//     const allFields = [
//       // General Settings
//       'siteName', 'siteDescription', 'siteLogo', 'siteFavicon',
//       'contactEmail', 'contactPhone', 'address',
      
//       // SEO & Social
//       'metaTitle', 'metaDescription', 'metaKeywords', 'ogImage', 'twitterHandle',
      
//       // Social Links
//       'facebook', 'twitter', 'instagram', 'youtube', 'linkedin', 'github',
      
//       // Footer
//       'footerText', 'footerColumns', 'showNewsletter', 'copyrightText',
      
//       // Announcement
//       'showAnnouncement', 'announcementText', 'announcementLink', 'announcementExpiry',
      
//       // Content Settings
//       'itemsPerPage', 'enableComments', 'enableRatings', 'autoApproveContent', 'enableUserUploads',
      
//       // Media Settings
//       'maxImageSize', 'maxVideoSize', 'maxAudioSize',
//       'allowedImageFormats', 'allowedVideoFormats', 'allowedAudioFormats',
      
//       // Security Settings
//       'enableTwoFactor', 'sessionTimeout', 'maxLoginAttempts', 'passwordExpiryDays', 'enableCaptcha',
      
//       // Email Settings
//       'smtpHost', 'smtpPort', 'smtpUser', 'smtpPassword', 'senderEmail', 'senderName',
      
//       // API Settings
//       'webhookUrl',
      
//       // Payment Settings
//       'currency', 'razorpayKey', 'razorpaySecret', 'stripeKey', 'stripeSecret',
      
//       // Cache Settings
//       'enableCache', 'cacheDuration', 'enableCDN', 'cdnUrl',
      
//       // Maintenance Mode
//       'maintenanceMode', 'maintenanceMessage',
      
//       // Appearance
//       'theme', 'primaryColor', 'secondaryColor', 'fontFamily'
//     ];
    
//     // Update each field if present in request
//     for (const field of allFields) {
//       if (req.body[field] !== undefined) {
//         // Skip masked sensitive fields (don't update with masked value)
//         if (field === 'razorpaySecret' && req.body[field] === '••••••••') continue;
//         if (field === 'stripeSecret' && req.body[field] === '••••••••') continue;
//         if (field === 'smtpPassword' && req.body[field] === '••••••••') continue;
        
//         // Handle array fields
//         if (field === 'metaKeywords' && typeof req.body[field] === 'string') {
//           settings[field] = req.body[field].split(',').map(k => k.trim());
//         } 
//         else if (field === 'allowedImageFormats' && typeof req.body[field] === 'string') {
//           settings[field] = req.body[field].split(',').map(f => f.trim());
//         }
//         else if (field === 'allowedVideoFormats' && typeof req.body[field] === 'string') {
//           settings[field] = req.body[field].split(',').map(f => f.trim());
//         }
//         else if (field === 'allowedAudioFormats' && typeof req.body[field] === 'string') {
//           settings[field] = req.body[field].split(',').map(f => f.trim());
//         }
//         else if (field === 'footerColumns' && typeof req.body[field] === 'string') {
//           try {
//             settings[field] = JSON.parse(req.body[field]);
//           } catch(e) {
//             settings[field] = req.body[field];
//           }
//         }
//         else {
//           settings[field] = req.body[field];
//         }
        
//         console.log(`✅ Updated field: ${field} = ${typeof req.body[field] === 'object' ? JSON.stringify(req.body[field]) : req.body[field]}`);
//       }
//     }
    
//     console.log('🔵 Saving settings to database...');
//     await settings.save();
//     console.log('✅ Settings saved successfully!');
    
//     // Return the updated settings
//     const updatedSettings = await Settings.findOne();
    
//     successResponse(res, updatedSettings, 'Settings updated successfully');
//   } catch (error) {
//     console.error('❌ Error in updateSettings:', error);
//     console.error('❌ Error stack:', error.stack);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
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
    
//     if (!settings) {
//       settings = await Settings.create({});
//     }
    
//     // Return all settings with proper formatting
//     const responseData = {
//       // General Settings
//       siteName: settings.siteName,
//       siteDescription: settings.siteDescription,
//       siteLogo: settings.siteLogo,
//       siteFavicon: settings.siteFavicon,
//       contactEmail: settings.contactEmail,
//       contactPhone: settings.contactPhone || '',
//       address: settings.address || '',
      
//       // SEO & Social
//       metaTitle: settings.metaTitle || '',
//       metaDescription: settings.metaDescription || '',
//       metaKeywords: settings.metaKeywords || [],
//       ogImage: settings.ogImage || '',
//       twitterHandle: settings.twitterHandle || '',
      
//       // Social Links
//       facebook: settings.facebook || '',
//       twitter: settings.twitter || '',
//       instagram: settings.instagram || '',
//       youtube: settings.youtube || '',
//       linkedin: settings.linkedin || '',
//       github: settings.github || '',
      
//       // Footer
//       footerText: settings.footerText || '',
//       footerColumns: settings.footerColumns || [],
//       showNewsletter: settings.showNewsletter !== false,
//       copyrightText: settings.copyrightText || '',
      
//       // Announcement
//       showAnnouncement: settings.showAnnouncement || false,
//       announcementText: settings.announcementText || '',
//       announcementLink: settings.announcementLink || '',
//       announcementExpiry: settings.announcementExpiry || null,
      
//       // Content Settings
//       itemsPerPage: settings.itemsPerPage,
//       enableComments: settings.enableComments,
//       enableRatings: settings.enableRatings,
//       autoApproveContent: settings.autoApproveContent,
//       enableUserUploads: settings.enableUserUploads,
      
//       // Media Settings
//       maxImageSize: settings.maxImageSize,
//       maxVideoSize: settings.maxVideoSize,
//       maxAudioSize: settings.maxAudioSize,
//       allowedImageFormats: settings.allowedImageFormats,
//       allowedVideoFormats: settings.allowedVideoFormats,
//       allowedAudioFormats: settings.allowedAudioFormats,
      
//       // Security Settings
//       enableTwoFactor: settings.enableTwoFactor,
//       sessionTimeout: settings.sessionTimeout,
//       maxLoginAttempts: settings.maxLoginAttempts,
//       passwordExpiryDays: settings.passwordExpiryDays,
//       enableCaptcha: settings.enableCaptcha,
      
//       // Email Settings
//       smtpHost: settings.smtpHost,
//       smtpPort: settings.smtpPort,
//       smtpUser: settings.smtpUser,
//       smtpPassword: settings.smtpPassword ? '••••••••' : '',
//       senderEmail: settings.senderEmail,
//       senderName: settings.senderName,
      
//       // API Settings
//       apiKeys: settings.apiKeys || [],
//       webhookUrl: settings.webhookUrl,
      
//       // Payment Settings
//       currency: settings.currency,
//       razorpayKey: settings.razorpayKey,
//       razorpaySecret: settings.razorpaySecret ? '••••••••' : '',
//       stripeKey: settings.stripeKey,
//       stripeSecret: settings.stripeSecret ? '••••••••' : '',
      
//       // Cache Settings
//       enableCache: settings.enableCache,
//       cacheDuration: settings.cacheDuration,
//       enableCDN: settings.enableCDN,
//       cdnUrl: settings.cdnUrl,
      
//       // Maintenance Mode
//       maintenanceMode: settings.maintenanceMode,
//       maintenanceMessage: settings.maintenanceMessage,
      
//       // Appearance
//       theme: settings.theme,
//       primaryColor: settings.primaryColor,
//       secondaryColor: settings.secondaryColor,
//       fontFamily: settings.fontFamily
//     };
    
//     successResponse(res, responseData);
//   } catch (error) {
//     console.error('Error in getSettings:', error);
//     next(error);
//   }
// };

// // Update settings (admin only) - FIXED to save all fields
// export const updateSettings = async (req, res, next) => {
//   try {
//     console.log('🔵 ========== UPDATE SETTINGS START ==========');
//     console.log('🔵 Request body keys:', Object.keys(req.body));
    
//     // Find or create settings document
//     let settings = await Settings.findOne();
    
//     if (!settings) {
//       console.log('⚠️ No settings found, creating new document...');
//       settings = new Settings();
//     }
    
//     // List of all possible fields
//     const allFields = [
//       // General Settings
//       'siteName', 'siteDescription', 'siteLogo', 'siteFavicon',
//       'contactEmail', 'contactPhone', 'address',
      
//       // SEO & Social
//       'metaTitle', 'metaDescription', 'metaKeywords', 'ogImage', 'twitterHandle',
      
//       // Social Links
//       'facebook', 'twitter', 'instagram', 'youtube', 'linkedin', 'github',
      
//       // Footer
//       'footerText', 'footerColumns', 'showNewsletter', 'copyrightText',
      
//       // Announcement
//       'showAnnouncement', 'announcementText', 'announcementLink', 'announcementExpiry',
      
//       // Content Settings
//       'itemsPerPage', 'enableComments', 'enableRatings', 'autoApproveContent', 'enableUserUploads',
      
//       // Media Settings
//       'maxImageSize', 'maxVideoSize', 'maxAudioSize',
//       'allowedImageFormats', 'allowedVideoFormats', 'allowedAudioFormats',
      
//       // Security Settings
//       'enableTwoFactor', 'sessionTimeout', 'maxLoginAttempts', 'passwordExpiryDays', 'enableCaptcha',
      
//       // Email Settings
//       'smtpHost', 'smtpPort', 'smtpUser', 'smtpPassword', 'senderEmail', 'senderName',
      
//       // API Settings
//       'webhookUrl',
      
//       // Payment Settings
//       'currency', 'razorpayKey', 'razorpaySecret', 'stripeKey', 'stripeSecret',
      
//       // Cache Settings
//       'enableCache', 'cacheDuration', 'enableCDN', 'cdnUrl',
      
//       // Maintenance Mode
//       'maintenanceMode', 'maintenanceMessage',
      
//       // Appearance
//       'theme', 'primaryColor', 'secondaryColor', 'fontFamily'
//     ];
    
//     // Update each field if present in request
//     for (const field of allFields) {
//       if (req.body[field] !== undefined) {
//         // Skip masked sensitive fields (don't update with masked value)
//         if (field === 'razorpaySecret' && req.body[field] === '••••••••') continue;
//         if (field === 'stripeSecret' && req.body[field] === '••••••••') continue;
//         if (field === 'smtpPassword' && req.body[field] === '••••••••') continue;
        
//         // Handle array fields
//         if (field === 'metaKeywords' && typeof req.body[field] === 'string') {
//           settings[field] = req.body[field].split(',').map(k => k.trim());
//         } 
//         else if ((field === 'allowedImageFormats' || field === 'allowedVideoFormats' || field === 'allowedAudioFormats') && typeof req.body[field] === 'string') {
//           settings[field] = req.body[field].split(',').map(f => f.trim());
//         }
//         else if (field === 'footerColumns' && typeof req.body[field] === 'string') {
//           try {
//             settings[field] = JSON.parse(req.body[field]);
//           } catch(e) {
//             settings[field] = req.body[field];
//           }
//         }
//         else {
//           settings[field] = req.body[field];
//         }
        
//         console.log(`✅ Updated field: ${field}`);
//       }
//     }
    
//     console.log('🔵 Saving settings to database...');
//     await settings.save();
//     console.log('✅ Settings saved successfully!');
    
//     successResponse(res, settings, 'Settings updated successfully');
//   } catch (error) {
//     console.error('❌ Error in updateSettings:', error);
//     console.error('❌ Error stack:', error.stack);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
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
















// server/controllers/settings.controller.js
import Settings from '../models/Settings.js';
import { successResponse, errorResponse } from '../utils/response.js';
import cloudinary from '../config/cloudinary.js';
import crypto from 'crypto';
import fs from 'fs';

// ============================================
// PUBLIC ROUTES (No authentication required)
// ============================================

export const getPublicSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    
    const publicData = {
      siteName: settings.siteName || 'ZauqApp',
      siteDescription: settings.siteDescription || 'AI Powered Urdu Literary Ecosystem',
      siteLogo: settings.siteLogo || '',
      siteFavicon: settings.siteFavicon || '',
      contactEmail: settings.contactEmail || 'admin@zauqapp.com',
      contactPhone: settings.contactPhone || '',
      address: settings.address || '',
      theme: settings.theme || 'light',
      primaryColor: settings.primaryColor || '#8B4513',
      secondaryColor: settings.secondaryColor || '#DAA520',
      fontFamily: settings.fontFamily || 'Inter',
      maintenanceMode: settings.maintenanceMode || false,
      maintenanceMessage: settings.maintenanceMessage || 'Site is under maintenance. Please check back later.'
    };
    
    successResponse(res, publicData);
  } catch (error) {
    console.error('Error in getPublicSettings:', error);
    next(error);
  }
};

export const getThemeSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    
    successResponse(res, {
      theme: settings?.theme || 'light',
      primaryColor: settings?.primaryColor || '#8B4513',
      secondaryColor: settings?.secondaryColor || '#DAA520',
      fontFamily: settings?.fontFamily || 'Inter'
    });
  } catch (error) {
    console.error('Error in getThemeSettings:', error);
    next(error);
  }
};

export const getSeoSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    
    successResponse(res, {
      metaTitle: settings?.metaTitle || settings?.siteName || 'ZauqApp',
      metaDescription: settings?.metaDescription || settings?.siteDescription || 'Discover the beauty of Urdu literature',
      metaKeywords: settings?.metaKeywords || [],
      ogImage: settings?.ogImage || settings?.siteLogo || '',
      twitterHandle: settings?.twitterHandle || '@zauqapp'
    });
  } catch (error) {
    console.error('Error in getSeoSettings:', error);
    next(error);
  }
};

export const getSocialSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    
    successResponse(res, {
      facebook: settings?.facebook || '',
      twitter: settings?.twitter || '',
      instagram: settings?.instagram || '',
      youtube: settings?.youtube || '',
      linkedin: settings?.linkedin || '',
      github: settings?.github || ''
    });
  } catch (error) {
    console.error('Error in getSocialSettings:', error);
    next(error);
  }
};

export const getFooterSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    
    successResponse(res, {
      footerText: settings?.footerText || 'Discover the beauty of Urdu literature',
      footerColumns: settings?.footerColumns || [],
      showNewsletter: settings?.showNewsletter !== false,
      copyrightText: settings?.copyrightText || `© ${new Date().getFullYear()} ZauqApp. All rights reserved.`
    });
  } catch (error) {
    console.error('Error in getFooterSettings:', error);
    next(error);
  }
};

export const getAnnouncementSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    
    const isExpired = settings?.announcementExpiry && new Date(settings.announcementExpiry) < new Date();
    
    successResponse(res, {
      showAnnouncement: settings?.showAnnouncement || false,
      announcementText: settings?.announcementText || '',
      announcementLink: settings?.announcementLink || '',
      announcementExpiry: settings?.announcementExpiry || null,
      isExpired: isExpired || false
    });
  } catch (error) {
    console.error('Error in getAnnouncementSettings:', error);
    next(error);
  }
};

export const getPublicMaintenanceStatus = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    
    successResponse(res, {
      maintenanceMode: settings?.maintenanceMode || false,
      maintenanceMessage: settings?.maintenanceMessage || 'Site is under maintenance. Please check back later.'
    });
  } catch (error) {
    console.error('Error in getPublicMaintenanceStatus:', error);
    next(error);
  }
};

// ============================================
// ADMIN ROUTES (Authentication required)
// ============================================

// Get all settings (admin only)
export const getSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = await Settings.create({});
    }
    
    // Return all settings with proper formatting
    const responseData = {
      // General Settings
      siteName: settings.siteName,
      siteDescription: settings.siteDescription,
      siteLogo: settings.siteLogo,
      siteFavicon: settings.siteFavicon,
      contactEmail: settings.contactEmail,
      contactPhone: settings.contactPhone || '',
      address: settings.address || '',
      
      // SEO & Social
      metaTitle: settings.metaTitle || '',
      metaDescription: settings.metaDescription || '',
      metaKeywords: settings.metaKeywords || [],
      ogImage: settings.ogImage || '',
      twitterHandle: settings.twitterHandle || '',
      
      // Social Links
      facebook: settings.facebook || '',
      twitter: settings.twitter || '',
      instagram: settings.instagram || '',
      youtube: settings.youtube || '',
      linkedin: settings.linkedin || '',
      github: settings.github || '',
      
      // Footer
      footerText: settings.footerText || '',
      footerColumns: settings.footerColumns || [],
      showNewsletter: settings.showNewsletter !== false,
      copyrightText: settings.copyrightText || '',
      
      // Announcement
      showAnnouncement: settings.showAnnouncement || false,
      announcementText: settings.announcementText || '',
      announcementLink: settings.announcementLink || '',
      announcementExpiry: settings.announcementExpiry || null,
      
      // Content Settings
      itemsPerPage: settings.itemsPerPage,
      enableComments: settings.enableComments,
      enableRatings: settings.enableRatings,
      autoApproveContent: settings.autoApproveContent,
      enableUserUploads: settings.enableUserUploads,
      
      // Media Settings
      maxImageSize: settings.maxImageSize,
      maxVideoSize: settings.maxVideoSize,
      maxAudioSize: settings.maxAudioSize,
      allowedImageFormats: settings.allowedImageFormats,
      allowedVideoFormats: settings.allowedVideoFormats,
      allowedAudioFormats: settings.allowedAudioFormats,
      
      // Security Settings
      enableTwoFactor: settings.enableTwoFactor,
      sessionTimeout: settings.sessionTimeout,
      maxLoginAttempts: settings.maxLoginAttempts,
      passwordExpiryDays: settings.passwordExpiryDays,
      enableCaptcha: settings.enableCaptcha,
      
      // Email Settings
      smtpHost: settings.smtpHost,
      smtpPort: settings.smtpPort,
      smtpUser: settings.smtpUser,
      smtpPassword: settings.smtpPassword ? '••••••••' : '',
      senderEmail: settings.senderEmail,
      senderName: settings.senderName,
      
      // API Settings
      apiKeys: settings.apiKeys || [],
      webhookUrl: settings.webhookUrl,
      
      // Payment Settings
      currency: settings.currency,
      razorpayKey: settings.razorpayKey,
      razorpaySecret: settings.razorpaySecret ? '••••••••' : '',
      stripeKey: settings.stripeKey,
      stripeSecret: settings.stripeSecret ? '••••••••' : '',
      
      // Cache Settings
      enableCache: settings.enableCache,
      cacheDuration: settings.cacheDuration,
      enableCDN: settings.enableCDN,
      cdnUrl: settings.cdnUrl,
      
      // Maintenance Mode
      maintenanceMode: settings.maintenanceMode,
      maintenanceMessage: settings.maintenanceMessage,
      
      // Appearance
      theme: settings.theme,
      primaryColor: settings.primaryColor,
      secondaryColor: settings.secondaryColor,
      fontFamily: settings.fontFamily
    };
    
    successResponse(res, responseData);
  } catch (error) {
    console.error('Error in getSettings:', error);
    next(error);
  }
};

// ============================================
// 🔴 FIXED: Update settings (admin only)
// ============================================
export const updateSettings = async (req, res, next) => {
  try {
    console.log('🔵 ========== UPDATE SETTINGS START ==========');
    console.log('🔵 Request body keys:', Object.keys(req.body));
    console.log('🔵 Request body sample:', JSON.stringify(req.body, null, 2));
    
    // Find or create settings document
    let settings = await Settings.findOneAndUpdate();
    
    if (!settings) {
      console.log('⚠️ No settings found, creating new document...');
      settings = new Settings();
    } else {
      console.log('✅ Found existing settings with ID:', settings._id);
    }
    
    // Define all fields that can be updated
    const stringFields = [
      'siteName', 'siteDescription', 'siteLogo', 'siteFavicon',
      'contactEmail', 'contactPhone', 'address',
      'metaTitle', 'metaDescription', 'ogImage', 'twitterHandle',
      'facebook', 'twitter', 'instagram', 'youtube', 'linkedin', 'github',
      'footerText', 'copyrightText',
      'announcementText', 'announcementLink',
      'smtpHost', 'smtpUser', 'smtpPassword', 'senderEmail', 'senderName',
      'webhookUrl', 'currency', 'razorpayKey', 'razorpaySecret', 'stripeKey', 'stripeSecret',
      'cdnUrl', 'maintenanceMessage', 'theme', 'primaryColor', 'secondaryColor', 'fontFamily'
    ];
    
    const numberFields = [
      'itemsPerPage', 'maxImageSize', 'maxVideoSize', 'maxAudioSize',
      'sessionTimeout', 'maxLoginAttempts', 'passwordExpiryDays',
      'smtpPort', 'cacheDuration'
    ];
    
    const booleanFields = [
      'enableComments', 'enableRatings', 'autoApproveContent', 'enableUserUploads',
      'enableTwoFactor', 'enableCaptcha', 'enableCache', 'enableCDN', 'maintenanceMode',
      'showNewsletter', 'showAnnouncement'
    ];
    
    const arrayFields = [
      'metaKeywords', 'allowedImageFormats', 'allowedVideoFormats', 'allowedAudioFormats', 'footerColumns'
    ];
    
    const dateFields = [
      'announcementExpiry'
    ];
    
    // Update string fields
    for (const field of stringFields) {
      if (req.body[field] !== undefined) {
        // Skip masked sensitive fields
        if ((field === 'razorpaySecret' || field === 'stripeSecret' || field === 'smtpPassword') && req.body[field] === '••••••••') {
          continue;
        }
        settings[field] = req.body[field];
        console.log(`✅ Updated string field: ${field} = ${req.body[field]}`);
      }
    }
    
    // Update number fields
    for (const field of numberFields) {
      if (req.body[field] !== undefined) {
        settings[field] = Number(req.body[field]);
        console.log(`✅ Updated number field: ${field} = ${settings[field]}`);
      }
    }
    
    // Update boolean fields
    for (const field of booleanFields) {
      if (req.body[field] !== undefined) {
        settings[field] = req.body[field] === true || req.body[field] === 'true';
        console.log(`✅ Updated boolean field: ${field} = ${settings[field]}`);
      }
    }
    
    // Update array fields
    for (const field of arrayFields) {
      if (req.body[field] !== undefined) {
        if (typeof req.body[field] === 'string') {
          if (field === 'footerColumns') {
            try {
              settings[field] = JSON.parse(req.body[field]);
            } catch (e) {
              settings[field] = [];
            }
          } else {
            settings[field] = req.body[field].split(',').map(item => item.trim());
          }
        } else if (Array.isArray(req.body[field])) {
          settings[field] = req.body[field];
        }
        console.log(`✅ Updated array field: ${field} =`, settings[field]);
      }
    }
    
    // Update date fields
    for (const field of dateFields) {
      if (req.body[field] !== undefined && req.body[field]) {
        settings[field] = new Date(req.body[field]);
        console.log(`✅ Updated date field: ${field} = ${settings[field]}`);
      }
    }
    
    console.log('🔵 Saving settings to database...');
    await settings.save();
    console.log('✅ Settings saved successfully!');
    
    // Return the updated settings
    const savedSettings = await Settings.findOne();
    
    successResponse(res, savedSettings, 'Settings updated successfully');
  } catch (error) {
    console.error('❌ Error in updateSettings:', error);
    console.error('❌ Error stack:', error.stack);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
    }
    
    next(error);
  }
};

// Reset settings to defaults (admin only)
export const resetSettings = async (req, res, next) => {
  try {
    await Settings.deleteMany();
    const defaultSettings = await Settings.create({});
    successResponse(res, defaultSettings, 'Settings reset to defaults');
  } catch (error) {
    console.error('Error in resetSettings:', error);
    next(error);
  }
};

// Get maintenance status (admin only)
export const getMaintenanceStatus = async (req, res, next) => {
  try {
    const settings = await Settings.findOne();
    successResponse(res, {
      maintenanceMode: settings?.maintenanceMode || false,
      maintenanceMessage: settings?.maintenanceMessage || 'Site is under maintenance. Please check back later.'
    });
  } catch (error) {
    console.error('Error in getMaintenanceStatus:', error);
    next(error);
  }
};

// Update maintenance mode (admin only)
export const updateMaintenanceMode = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }
    
    settings.maintenanceMode = req.body.enabled;
    if (req.body.message) {
      settings.maintenanceMessage = req.body.message;
    }
    await settings.save();
    
    successResponse(res, settings, `Maintenance mode ${settings.maintenanceMode ? 'enabled' : 'disabled'}`);
  } catch (error) {
    console.error('Error in updateMaintenanceMode:', error);
    next(error);
  }
};

// Upload logo or favicon (admin only)
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
    
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }
    
    if (type === 'logo') {
      settings.siteLogo = result.secure_url;
    } else if (type === 'favicon') {
      settings.siteFavicon = result.secure_url;
    }
    
    await settings.save();
    
    successResponse(res, { url: result.secure_url }, `${type} uploaded successfully`);
  } catch (error) {
    console.error('Error in uploadLogo:', error);
    next(error);
  }
};

// Upload banner (admin only)
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
    
    // Clean up local file
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    successResponse(res, { url: result.secure_url }, 'Banner uploaded successfully');
  } catch (error) {
    console.error('Error in uploadBanner:', error);
    next(error);
  }
};

// Generate API Key (admin only)
export const generateApiKey = async (req, res, next) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return errorResponse(res, 'API key name is required', 400);
    }
    
    const apiKey = crypto.randomBytes(32).toString('hex');
    
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }
    
    if (!settings.apiKeys) {
      settings.apiKeys = [];
    }
    
    settings.apiKeys.push({
      _id: crypto.randomBytes(12).toString('hex'),
      name,
      key: apiKey,
      createdAt: new Date()
    });
    
    await settings.save();
    
    successResponse(res, { name, key: apiKey }, 'API key generated successfully');
  } catch (error) {
    console.error('Error in generateApiKey:', error);
    next(error);
  }
};

// Delete API Key (admin only)
export const deleteApiKey = async (req, res, next) => {
  try {
    const { keyId } = req.params;
    
    let settings = await Settings.findOne();
    if (!settings || !settings.apiKeys) {
      return errorResponse(res, 'API key not found', 404);
    }
    
    settings.apiKeys = settings.apiKeys.filter(key => key._id.toString() !== keyId);
    await settings.save();
    
    successResponse(res, null, 'API key deleted successfully');
  } catch (error) {
    console.error('Error in deleteApiKey:', error);
    next(error);
  }
};