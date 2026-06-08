// // server/middleware/captchaMiddleware.js
// import axios from 'axios';
// import Settings from '../models/Settings.js';
// import { errorResponse } from '../utils/response.js';

// /**
//  * Verify Google reCAPTCHA token
//  * @param {string} token - The reCAPTCHA response token from client
//  * @param {string} secretKey - The reCAPTCHA secret key from settings
//  * @returns {Promise<boolean>} - Returns true if verification passes
//  */
// export const verifyCaptchaToken = async (token, secretKey) => {
//   if (!token || !secretKey) {
//     console.log('❌ CAPTCHA verification failed: Missing token or secret key');
//     return false;
//   }

//   try {
//     const response = await axios.post(
//       'https://www.google.com/recaptcha/api/siteverify',
//       null,
//       {
//         params: {
//           secret: secretKey,
//           response: token
//         },
//         timeout: 5000
//       }
//     );

//     const { success, score, error_codes } = response.data;

//     console.log('🔍 CAPTCHA verification result:', { success, score });

//     if (!success) {
//       console.log('❌ CAPTCHA verification failed:', error_codes);
//       return false;
//     }

//     // For v3, check score threshold (recommended: 0.5)
//     if (score !== undefined && score < 0.5) {
//       console.log(`⚠️ CAPTCHA score too low: ${score}`);
//       return false;
//     }

//     return true;
//   } catch (error) {
//     console.error('❌ CAPTCHA verification error:', error.message);
//     return false;
//   }
// };

// /**
//  * Middleware to validate CAPTCHA on protected routes
//  * This can be applied to any route without modifying the controller
//  */
// export const requireCaptcha = async (req, res, next) => {
//   try {
//     // Get settings to check if CAPTCHA is enabled
//     const settings = await Settings.findOne();
    
//     // If CAPTCHA is not enabled, skip validation
//     if (!settings?.enableCaptcha) {
//       return next();
//     }

//     // Get CAPTCHA token from request body or headers
//     const captchaToken = req.body.captchaToken || req.headers['x-captcha-token'];
    
//     if (!captchaToken) {
//       return errorResponse(res, 'CAPTCHA verification required. Please complete the verification.', 400);
//     }

//     const isValid = await verifyCaptchaToken(captchaToken, settings.captchaSecretKey);
    
//     if (!isValid) {
//       return errorResponse(res, 'CAPTCHA verification failed. Please try again.', 400);
//     }

//     // Remove captchaToken from body to avoid passing to controller
//     delete req.body.captchaToken;
    
//     next();
//   } catch (error) {
//     console.error('❌ CAPTCHA middleware error:', error);
//     // On error, still allow the request to proceed (fail open)
//     next();
//   }
// };

// /**
//  * Optional CAPTCHA middleware (doesn't block if CAPTCHA is enabled but token missing)
//  */
// export const optionalCaptcha = async (req, res, next) => {
//   try {
//     const settings = await Settings.findOne();
    
//     if (!settings?.enableCaptcha) {
//       return next();
//     }

//     const captchaToken = req.body.captchaToken || req.headers['x-captcha-token'];
    
//     if (captchaToken) {
//       const isValid = await verifyCaptchaToken(captchaToken, settings.captchaSecretKey);
//       if (!isValid) {
//         return errorResponse(res, 'CAPTCHA verification failed. Please try again.', 400);
//       }
//       delete req.body.captchaToken;
//     }
    
//     next();
//   } catch (error) {
//     console.error('❌ Optional CAPTCHA error:', error);
//     next();
//   }
// };
























// // server/middleware/captchaMiddleware.js
// import axios from 'axios';
// import Settings from '../models/Settings.js';
// import { errorResponse } from '../utils/response.js';

// /**
//  * Verify Google reCAPTCHA token
//  */
// export const verifyCaptchaToken = async (token, secretKey) => {
//   if (!token || !secretKey) {
//     console.log('❌ CAPTCHA verification failed: Missing token or secret key');
//     return false;
//   }

//   try {
//     const response = await axios.post(
//       'https://www.google.com/recaptcha/api/siteverify',
//       null,
//       {
//         params: {
//           secret: secretKey,
//           response: token
//         },
//         timeout: 5000
//       }
//     );

//     const { success, score, error_codes } = response.data;

//     console.log('🔍 CAPTCHA verification result:', { success, score });

//     if (!success) {
//       console.log('❌ CAPTCHA verification failed:', error_codes);
//       return false;
//     }

//     // For v3, check score threshold (recommended: 0.5)
//     if (score !== undefined && score < 0.5) {
//       console.log(`⚠️ CAPTCHA score too low: ${score}`);
//       return false;
//     }

//     return true;
//   } catch (error) {
//     console.error('❌ CAPTCHA verification error:', error.message);
//     return false;
//   }
// };

// /**
//  * Middleware to validate CAPTCHA on routes
//  * Apply this to login and register routes
//  */
// export const requireCaptcha = async (req, res, next) => {
//   try {
//     const settings = await Settings.getSettings();
    
//     // If CAPTCHA is not enabled, skip validation
//     if (!settings?.enableCaptcha) {
//       return next();
//     }

//     const captchaToken = req.body.captchaToken || req.headers['x-captcha-token'];
    
//     if (!captchaToken) {
//       return errorResponse(res, 'CAPTCHA verification required. Please complete the verification.', 400);
//     }

//     const isValid = await verifyCaptchaToken(captchaToken, settings.captchaSecretKey);
    
//     if (!isValid) {
//       return errorResponse(res, 'CAPTCHA verification failed. Please try again.', 400);
//     }

//     // Remove captchaToken from body to avoid passing to controller
//     delete req.body.captchaToken;
    
//     next();
//   } catch (error) {
//     console.error('❌ CAPTCHA middleware error:', error);
//     // On error, still allow the request to proceed (fail open for availability)
//     next();
//   }
// };
















// server/middleware/captchaMiddleware.js
import axios from 'axios';
import Settings from '../models/Settings.js';
import { errorResponse } from '../utils/response.js';

/**
 * Get active CAPTCHA configuration
 * Priority: Database > Environment > Disabled
 */
const getActiveCaptchaConfig = async () => {
  try {
    const settings = await Settings.getSettings();
    
    // Check database configuration first
    const dbEnabled = settings?.enableCaptcha || false;
    const dbSecretKey = settings?.captchaSecretKey || '';
    
    if (dbEnabled && dbSecretKey) {
      console.log('🔐 Using CAPTCHA from DATABASE');
      return {
        enabled: true,
        secretKey: dbSecretKey,
        source: 'database'
      };
    }
    
    // Fallback to environment variables
    const envEnabled = process.env.RECAPTCHA_ENABLED === 'true' || false;
    const envSecretKey = process.env.RECAPTCHA_SECRET_KEY || '';
    
    if (envEnabled && envSecretKey) {
      console.log('🔐 Using CAPTCHA from ENVIRONMENT');
      return {
        enabled: true,
        secretKey: envSecretKey,
        source: 'environment'
      };
    }
    
    console.log('🔓 CAPTCHA is DISABLED (no valid configuration found)');
    return {
      enabled: false,
      secretKey: null,
      source: 'none'
    };
  } catch (error) {
    console.error('❌ Error getting CAPTCHA config:', error);
    
    // Fallback to environment on error
    const envEnabled = process.env.RECAPTCHA_ENABLED === 'true' || false;
    const envSecretKey = process.env.RECAPTCHA_SECRET_KEY || '';
    
    return {
      enabled: envEnabled && !!envSecretKey,
      secretKey: envSecretKey,
      source: 'environment (fallback)'
    };
  }
};

/**
 * Verify Google reCAPTCHA token
 */
export const verifyCaptchaToken = async (token, secretKey) => {
  if (!token || !secretKey) {
    console.log('❌ CAPTCHA verification failed: Missing token or secret key');
    return false;
  }

  try {
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: secretKey,
          response: token
        },
        timeout: 5000
      }
    );

    const { success, score, error_codes } = response.data;

    console.log('🔍 CAPTCHA verification result:', { success, score });

    if (!success) {
      console.log('❌ CAPTCHA verification failed:', error_codes);
      return false;
    }

    // For v3, check score threshold (recommended: 0.5)
    if (score !== undefined && score < 0.5) {
      console.log(`⚠️ CAPTCHA score too low: ${score}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error('❌ CAPTCHA verification error:', error.message);
    return false;
  }
};

/**
 * Middleware to validate CAPTCHA on routes
 * Uses active configuration (Database > Environment)
 */
export const requireCaptcha = async (req, res, next) => {
  try {
    // Get active CAPTCHA configuration
    const config = await getActiveCaptchaConfig();
    
    // If CAPTCHA is not enabled, skip validation
    if (!config.enabled) {
      console.log('🔓 CAPTCHA is disabled, skipping validation');
      return next();
    }

    console.log(`🔐 CAPTCHA validation active (source: ${config.source})`);
    
    const captchaToken = req.body.captchaToken || req.headers['x-captcha-token'];
    
    if (!captchaToken) {
      console.log('❌ CAPTCHA token missing but CAPTCHA is enabled');
      return errorResponse(res, 'CAPTCHA verification required. Please complete the verification.', 400);
    }

    const isValid = await verifyCaptchaToken(captchaToken, config.secretKey);
    
    if (!isValid) {
      console.log('❌ CAPTCHA verification failed');
      return errorResponse(res, 'CAPTCHA verification failed. Please try again.', 400);
    }

    console.log('✅ CAPTCHA verification passed');
    
    // Remove captchaToken from body to avoid passing to controller
    delete req.body.captchaToken;
    
    next();
  } catch (error) {
    console.error('❌ CAPTCHA middleware error:', error);
    // On error, still allow the request to proceed (fail open for availability)
    next();
  }
};

/**
 * Optional CAPTCHA middleware (doesn't block if CAPTCHA is enabled but token missing)
 */
export const optionalCaptcha = async (req, res, next) => {
  try {
    const config = await getActiveCaptchaConfig();
    
    if (!config.enabled) {
      return next();
    }

    const captchaToken = req.body.captchaToken || req.headers['x-captcha-token'];
    
    if (captchaToken) {
      const isValid = await verifyCaptchaToken(captchaToken, config.secretKey);
      if (!isValid) {
        return errorResponse(res, 'CAPTCHA verification failed. Please try again.', 400);
      }
      delete req.body.captchaToken;
    }
    
    next();
  } catch (error) {
    console.error('❌ Optional CAPTCHA error:', error);
    next();
  }
};