// server/controllers/appSettings.controller.js
import Settings from '../models/Settings.js';
import { successResponse, errorResponse } from '../utils/response.js';
import cloudinary from '../config/cloudinary.js';
import crypto from 'crypto';
import fs from 'fs';

// ============================================
// HELPER FUNCTIONS
// ============================================

const getOrCreateSettings = async () => {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({});
  }
  return settings;
};

const formatSettingsResponse = (settings) => {
  return {
    // General Settings
    siteName: settings.siteName || 'ZauqApp',
    siteDescription: settings.siteDescription || 'AI Powered Urdu Literary Ecosystem',
    siteLogo: settings.siteLogo || '',
    siteFavicon: settings.siteFavicon || '',
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
    fontFamily: settings.fontFamily || 'Inter',
    
    // SEO & Social
    metaTitle: settings.metaTitle || '',
    metaDescription: settings.metaDescription || '',
    metaKeywords: settings.metaKeywords || [],
    ogImage: settings.ogImage || '',
    twitterHandle: settings.twitterHandle || '',
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
    announcementExpiry: settings.announcementExpiry || null
  };
};

// ============================================
// GET ALL SETTINGS
// ============================================
export const getAllSettings = async (req, res, next) => {
  try {
    const settings = await getOrCreateSettings();
    const formattedSettings = formatSettingsResponse(settings);
    
    console.log('✅ getAllSettings - returning', Object.keys(formattedSettings).length, 'fields');
    console.log('   contactPhone:', formattedSettings.contactPhone);
    console.log('   address:', formattedSettings.address);
    
    successResponse(res, formattedSettings);
  } catch (error) {
    console.error('❌ getAllSettings error:', error);
    next(error);
  }
};

// ============================================
// UPDATE SETTINGS
// ============================================
export const updateAllSettings = async (req, res, next) => {
  try {
    console.log('🔵 updateAllSettings called');
    console.log('🔵 Request body keys:', Object.keys(req.body));
    
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }
    
    // Update all fields from request body
    Object.keys(req.body).forEach(key => {
      let value = req.body[key];
      
      if (value === undefined) return;
      
      // Skip masked sensitive fields
      if (['smtpPassword', 'razorpaySecret', 'stripeSecret'].includes(key) && value === '••••••••') {
        return;
      }
      
      // Handle type conversions
      if (typeof value === 'string') {
        if (value === 'true') value = true;
        if (value === 'false') value = false;
        if (!isNaN(value) && value.trim() !== '') {
          const num = Number(value);
          if (!isNaN(num)) value = num;
        }
      }
      
      // Handle comma-separated strings to arrays
      if (typeof value === 'string' && value.includes(',') && !key.includes('Password') && !key.includes('Secret')) {
        value = value.split(',').map(v => v.trim());
      }
      
      settings[key] = value;
      console.log(`✅ Updated ${key}:`, typeof value === 'object' ? JSON.stringify(value) : value);
    });
    
    await settings.save();
    console.log('✅ Settings saved to database');
    
    const formattedSettings = formatSettingsResponse(settings);
    
    successResponse(res, formattedSettings, 'Settings updated successfully');
  } catch (error) {
    console.error('❌ updateAllSettings error:', error);
    next(error);
  }
};

// ============================================
// GET SINGLE SETTING
// ============================================
export const getSettingByKey = async (req, res, next) => {
  try {
    const { key } = req.params;
    const settings = await getOrCreateSettings();
    
    const value = settings[key];
    if (value === undefined) {
      return errorResponse(res, `Setting '${key}' not found`, 404);
    }
    
    successResponse(res, { key, value });
  } catch (error) {
    console.error('❌ getSettingByKey error:', error);
    next(error);
  }
};

// ============================================
// UPDATE SINGLE SETTING
// ============================================
export const updateSettingByKey = async (req, res, next) => {
  try {
    const { key } = req.params;
    const { value } = req.body;
    
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }
    
    settings[key] = value;
    await settings.save();
    
    successResponse(res, { key, value }, `Setting '${key}' updated successfully`);
  } catch (error) {
    console.error('❌ updateSettingByKey error:', error);
    next(error);
  }
};

// ============================================
// RESET SETTINGS
// ============================================
export const resetAllSettings = async (req, res, next) => {
  try {
    await Settings.deleteMany();
    const newSettings = await Settings.create({});
    const formattedSettings = formatSettingsResponse(newSettings);
    
    successResponse(res, formattedSettings, 'Settings reset to defaults');
  } catch (error) {
    console.error('❌ resetAllSettings error:', error);
    next(error);
  }
};

// ============================================
// UPLOAD LOGO
// ============================================
export const uploadSiteLogo = async (req, res, next) => {
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
    
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    const settings = await getOrCreateSettings();
    
    if (type === 'logo') {
      settings.siteLogo = result.secure_url;
    } else if (type === 'favicon') {
      settings.siteFavicon = result.secure_url;
    }
    
    await settings.save();
    
    successResponse(res, { url: result.secure_url }, `${type} uploaded successfully`);
  } catch (error) {
    console.error('❌ uploadSiteLogo error:', error);
    next(error);
  }
};

// ============================================
// GENERATE API KEY
// ============================================
export const generateNewApiKey = async (req, res, next) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return errorResponse(res, 'API key name is required', 400);
    }
    
    const apiKey = crypto.randomBytes(32).toString('hex');
    const settings = await getOrCreateSettings();
    
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
    console.error('❌ generateNewApiKey error:', error);
    next(error);
  }
};

// ============================================
// DELETE API KEY
// ============================================
export const removeApiKey = async (req, res, next) => {
  try {
    const { keyId } = req.params;
    const settings = await getOrCreateSettings();
    
    settings.apiKeys = (settings.apiKeys || []).filter(k => k._id !== keyId);
    await settings.save();
    
    successResponse(res, null, 'API key deleted successfully');
  } catch (error) {
    console.error('❌ removeApiKey error:', error);
    next(error);
  }
};