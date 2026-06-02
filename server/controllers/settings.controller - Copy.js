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

















// server/controllers/settings.controller.js
//with proper separation between public and admin routes!

import Settings from '../models/Settings.js';
import { successResponse, errorResponse } from '../utils/response.js';
import cloudinary from '../config/cloudinary.js';
import crypto from 'crypto';

// ============================================
// PUBLIC ROUTES (No authentication required)
// ============================================

// Get public settings for frontend (site name, logo, favicon, theme colors)
export const getPublicSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    
    if (!settings) {
      // Return default settings if none exist
      return successResponse(res, {
        siteName: 'ZauqApp',
        siteDescription: 'AI Powered Urdu Literary Ecosystem',
        siteLogo: '',
        siteFavicon: '',
        contactEmail: '',
        contactPhone: '',
        address: '',
        theme: 'light',
        primaryColor: '#8B4513',
        secondaryColor: '#DAA520',
        fontFamily: 'Inter',
        maintenanceMode: false,
        maintenanceMessage: 'Site is under maintenance. Please check back later.'
      });
    }
    
    // Return only public-facing settings
    successResponse(res, {
      siteName: settings.siteName || 'ZauqApp',
      siteDescription: settings.siteDescription || 'AI Powered Urdu Literary Ecosystem',
      siteLogo: settings.siteLogo || '',
      siteFavicon: settings.siteFavicon || '',
      contactEmail: settings.contactEmail || '',
      contactPhone: settings.contactPhone || '',
      address: settings.address || '',
      theme: settings.theme || 'light',
      primaryColor: settings.primaryColor || '#8B4513',
      secondaryColor: settings.secondaryColor || '#DAA520',
      fontFamily: settings.fontFamily || 'Inter',
      maintenanceMode: settings.maintenanceMode || false,
      maintenanceMessage: settings.maintenanceMessage || 'Site is under maintenance. Please check back later.'
    });
  } catch (error) {
    console.error('Error in getPublicSettings:', error);
    next(error);
  }
};

// Get theme settings only
export const getThemeSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    
    if (!settings) {
      return successResponse(res, {
        theme: 'light',
        primaryColor: '#8B4513',
        secondaryColor: '#DAA520',
        fontFamily: 'Inter'
      });
    }
    
    successResponse(res, {
      theme: settings.theme || 'light',
      primaryColor: settings.primaryColor || '#8B4513',
      secondaryColor: settings.secondaryColor || '#DAA520',
      fontFamily: settings.fontFamily || 'Inter'
    });
  } catch (error) {
    console.error('Error in getThemeSettings:', error);
    next(error);
  }
};

// Get SEO settings
export const getSeoSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    
    if (!settings) {
      return successResponse(res, {
        metaTitle: 'ZauqApp - Urdu Literary Ecosystem',
        metaDescription: 'Discover the beauty of Urdu literature with AI-powered recommendations',
        metaKeywords: ['urdu', 'poetry', 'literature', 'books', 'ghazal', 'nazm'],
        ogImage: '',
        twitterHandle: '@zauqapp'
      });
    }
    
    successResponse(res, {
      metaTitle: settings.metaTitle || settings.siteName || 'ZauqApp',
      metaDescription: settings.metaDescription || settings.siteDescription || 'Discover the beauty of Urdu literature',
      metaKeywords: settings.metaKeywords || [],
      ogImage: settings.ogImage || settings.siteLogo || '',
      twitterHandle: settings.twitterHandle || '@zauqapp'
    });
  } catch (error) {
    console.error('Error in getSeoSettings:', error);
    next(error);
  }
};

// Get social media settings
export const getSocialSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    
    if (!settings) {
      return successResponse(res, {
        facebook: '',
        twitter: '',
        instagram: '',
        youtube: '',
        linkedin: '',
        github: ''
      });
    }
    
    successResponse(res, {
      facebook: settings.facebook || '',
      twitter: settings.twitter || '',
      instagram: settings.instagram || '',
      youtube: settings.youtube || '',
      linkedin: settings.linkedin || '',
      github: settings.github || ''
    });
  } catch (error) {
    console.error('Error in getSocialSettings:', error);
    next(error);
  }
};

// Get footer settings
export const getFooterSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    
    if (!settings) {
      return successResponse(res, {
        footerText: 'Discover the beauty of Urdu literature',
        footerColumns: [
          { title: 'Quick Links', links: ['Home', 'About', 'Contact'] },
          { title: 'Resources', links: ['Poetry', 'Books', 'Authors'] },
          { title: 'Support', links: ['Help', 'Privacy Policy', 'Terms'] }
        ],
        showNewsletter: true,
        copyrightText: `© ${new Date().getFullYear()} ZauqApp. All rights reserved.`
      });
    }
    
    successResponse(res, {
      footerText: settings.footerText || 'Discover the beauty of Urdu literature',
      footerColumns: settings.footerColumns || [],
      showNewsletter: settings.showNewsletter !== false,
      copyrightText: settings.copyrightText || `© ${new Date().getFullYear()} ZauqApp. All rights reserved.`
    });
  } catch (error) {
    console.error('Error in getFooterSettings:', error);
    next(error);
  }
};

// Get announcement settings
export const getAnnouncementSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    
    if (!settings) {
      return successResponse(res, {
        showAnnouncement: false,
        announcementText: '',
        announcementLink: '',
        announcementExpiry: null
      });
    }
    
    // Check if announcement is expired
    const isExpired = settings.announcementExpiry && new Date(settings.announcementExpiry) < new Date();
    
    successResponse(res, {
      showAnnouncement: settings.showAnnouncement || false,
      announcementText: settings.announcementText || '',
      announcementLink: settings.announcementLink || '',
      announcementExpiry: settings.announcementExpiry || null,
      isExpired: isExpired || false
    });
  } catch (error) {
    console.error('Error in getAnnouncementSettings:', error);
    next(error);
  }
};

// Get public maintenance status (for maintenance page)
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

// Get all settings (admin only - full access)
export const getSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    
    if (!settings) {
      // Create default settings
      settings = await Settings.create({});
    }
    
    // Mask sensitive data for response
    const maskedSettings = {
      ...settings.toObject(),
      razorpaySecret: settings.razorpaySecret ? '••••••••' : '',
      stripeSecret: settings.stripeSecret ? '••••••••' : '',
      smtpPassword: settings.smtpPassword ? '••••••••' : '',
      apiKeys: settings.apiKeys ? settings.apiKeys.map(key => ({
        ...key.toObject(),
        key: '••••••••' + key.key.slice(-4)
      })) : []
    };
    
    successResponse(res, maskedSettings);
  } catch (error) {
    console.error('Error in getSettings:', error);
    next(error);
  }
};

// Update settings (admin only)
export const updateSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = new Settings();
    }
    
    const updateData = { ...req.body };
    
    // Only update sensitive fields if they are provided and not masked
    if (updateData.razorpaySecret === '••••••••') delete updateData.razorpaySecret;
    if (updateData.stripeSecret === '••••••••') delete updateData.stripeSecret;
    if (updateData.smtpPassword === '••••••••') delete updateData.smtpPassword;
    
    Object.assign(settings, updateData);
    await settings.save();
    
    successResponse(res, settings, 'Settings updated successfully');
  } catch (error) {
    console.error('Error in updateSettings:', error);
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
    const { type } = req.params; // 'logo' or 'favicon'
    
    if (!req.file) {
      return errorResponse(res, 'No file uploaded', 400);
    }
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: `zauqapp/settings/${type}`,
      width: type === 'logo' ? 200 : 64,
      height: type === 'logo' ? 200 : 64,
      crop: 'limit',
      quality: 'auto:good'
    });
    
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