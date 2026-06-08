// // server/routes/captcha.routes.js
// import express from 'express';
// import { requireCaptcha } from '../middleware/captchaMiddleware.js';
// import { successResponse, errorResponse } from '../utils/response.js';

// const router = express.Router();

// // Test endpoint to verify CAPTCHA is working
// router.post('/verify', requireCaptcha, async (req, res) => {
//   successResponse(res, { verified: true }, 'CAPTCHA verification successful');
// });

// // Get CAPTCHA public settings (site key for frontend)
// router.get('/config', async (req, res) => {
//   try {
//     const Settings = await import('../models/Settings.js').then(m => m.default);
//     const settings = await Settings.findOne();
    
//     successResponse(res, {
//       enabled: settings?.enableCaptcha || false,
//       siteKey: settings?.captchaSiteKey || '',
//       type: settings?.captchaType || 'v2'
//     });
//   } catch (error) {
//     errorResponse(res, 'Failed to get CAPTCHA configuration', 500);
//   }
// });

// export default router;





















// server/routes/captcha.routes.js
import express from 'express';
import Settings from '../models/Settings.js';
import { successResponse } from '../utils/response.js';

const router = express.Router();

/**
 * @route   GET /api/captcha/config
 * @desc    Get CAPTCHA configuration for frontend
 * @access  Public
 * @returns { enabled, siteKey, type }
 * 
 * Priority: Database Settings > Environment Variables > Defaults
 */
router.get('/config', async (req, res) => {
  try {
    // Get settings from database
    const settings = await Settings.getSettings();
    
    // Determine CAPTCHA status with priority: DB > ENV
    let enabled = false;
    let siteKey = '';
    let captchaType = 'v2';
    
    // Check database settings first
    if (settings) {
      enabled = settings.enableCaptcha || false;
      siteKey = settings.captchaSiteKey || '';
      captchaType = settings.captchaType || 'v2';
    }
    
    // If database has no value, fallback to environment variables
    if (!enabled && !siteKey) {
      enabled = process.env.RECAPTCHA_ENABLED === 'true' || false;
      siteKey = process.env.RECAPTCHA_SITE_KEY || '';
      captchaType = process.env.RECAPTCHA_TYPE || 'v2';
    }
    
    console.log('🔐 CAPTCHA Config:', { 
      enabled, 
      hasSiteKey: !!siteKey, 
      type: captchaType,
      source: settings?.enableCaptcha !== undefined ? 'database' : 'environment'
    });
    
    // Never expose secret key to frontend
    successResponse(res, {
      enabled: enabled && !!siteKey, // Only enabled if both true and siteKey exists
      siteKey: siteKey,
      type: captchaType
    });
  } catch (error) {
    console.error('❌ Failed to get CAPTCHA config:', error);
    
    // Fallback to environment variables on error
    const fallbackEnabled = process.env.RECAPTCHA_ENABLED === 'true' || false;
    const fallbackSiteKey = process.env.RECAPTCHA_SITE_KEY || '';
    
    successResponse(res, { 
      enabled: fallbackEnabled && !!fallbackSiteKey,
      siteKey: fallbackSiteKey,
      type: process.env.RECAPTCHA_TYPE || 'v2'
    });
  }
});

/**
 * @route   GET /api/captcha/status
 * @desc    Get detailed CAPTCHA status (admin only)
 * @access  Admin
 */
router.get('/status', async (req, res) => {
  try {
    const settings = await Settings.getSettings();
    
    const dbEnabled = settings?.enableCaptcha || false;
    const dbSiteKey = settings?.captchaSiteKey || '';
    const dbSecretKey = settings?.captchaSecretKey || '';
    
    const envEnabled = process.env.RECAPTCHA_ENABLED === 'true' || false;
    const envSiteKey = process.env.RECAPTCHA_SITE_KEY || '';
    const envSecretKey = process.env.RECAPTCHA_SECRET_KEY || '';
    
    // Determine which source is active
    const hasDbConfig = dbEnabled && dbSiteKey && dbSecretKey;
    const hasEnvConfig = envEnabled && envSiteKey && envSecretKey;
    
    let activeSource = 'none';
    let activeEnabled = false;
    
    if (hasDbConfig) {
      activeSource = 'database';
      activeEnabled = dbEnabled;
    } else if (hasEnvConfig) {
      activeSource = 'environment';
      activeEnabled = envEnabled;
    }
    
    successResponse(res, {
      active: {
        source: activeSource,
        enabled: activeEnabled,
        siteKey: activeSource === 'database' ? dbSiteKey : envSiteKey,
        type: activeSource === 'database' ? (settings?.captchaType || 'v2') : (process.env.RECAPTCHA_TYPE || 'v2')
      },
      database: {
        enabled: dbEnabled,
        hasSiteKey: !!dbSiteKey,
        hasSecretKey: !!dbSecretKey,
        type: settings?.captchaType || 'v2'
      },
      environment: {
        enabled: envEnabled,
        hasSiteKey: !!envSiteKey,
        hasSecretKey: !!envSecretKey,
        type: process.env.RECAPTCHA_TYPE || 'v2'
      }
    });
  } catch (error) {
    console.error('❌ Failed to get CAPTCHA status:', error);
    errorResponse(res, 'Failed to get CAPTCHA status', 500);
  }
});

/**
 * @route   POST /api/captcha/sync
 * @desc    Sync environment variables to database (admin only)
 * @access  Admin
 */
router.post('/sync', async (req, res) => {
  try {
    const settings = await Settings.getSettings();
    
    // Sync from environment to database
    settings.enableCaptcha = process.env.RECAPTCHA_ENABLED === 'true' || false;
    settings.captchaSiteKey = process.env.RECAPTCHA_SITE_KEY || '';
    settings.captchaSecretKey = process.env.RECAPTCHA_SECRET_KEY || '';
    settings.captchaType = process.env.RECAPTCHA_TYPE || 'v2';
    
    await settings.save();
    
    console.log('✅ CAPTCHA settings synced from environment to database');
    
    successResponse(res, {
      synced: true,
      settings: {
        enabled: settings.enableCaptcha,
        hasSiteKey: !!settings.captchaSiteKey,
        hasSecretKey: !!settings.captchaSecretKey,
        type: settings.captchaType
      }
    }, 'CAPTCHA settings synced successfully');
  } catch (error) {
    console.error('❌ Failed to sync CAPTCHA settings:', error);
    errorResponse(res, 'Failed to sync CAPTCHA settings', 500);
  }
});

export default router;