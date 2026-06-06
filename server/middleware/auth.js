// //working revert if any issues
// //server/middleware/auth.js
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// export const protect = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization?.startsWith('Bearer')) {
//     token = req.headers.authorization.split(' ')[1];
//   } else if (req.cookies?.token) {
//     token = req.cookies.token;
//   }

//   if (!token) {
//     return res.status(401).json({ success: false, message: 'Not authorized, no token' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select('-password');

//     if (!req.user) {
//       return res.status(401).json({ success: false, message: 'User not found' });
//     }

//     if (!req.user.isActive || req.user.isBanned) {
//       return res.status(403).json({ success: false, message: 'Account is disabled' });
//     }

//     next();
//   } catch (error) {
//     return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
//   }
// };

// export const adminOnly = (req, res, next) => {
//   if (req.user && req.user.role === 'admin') {
//     next();
//   } else {
//     res.status(403).json({ success: false, message: 'Admin access required' });
//   }
// };

// export const creatorOnly = (req, res, next) => {
//   if (req.user && ['creator', 'admin', 'moderator'].includes(req.user.role)) {
//     next();
//   } else {
//     res.status(403).json({ success: false, message: 'Creator access required' });
//   }
// };

// export const optionalAuth = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization?.startsWith('Bearer')) {
//     token = req.headers.authorization.split(' ')[1];
//   }

//   if (token) {
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select('-password');
//     } catch (error) {
//       // Continue without user
//     }
//   }

//   next();
// };


















// server/middleware/auth.js
// LAST UPDATED: 2026-06-06
// PURPOSE: Authentication middleware for protecting routes and handling token verification

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// ============================================
// MAIN AUTHENTICATION MIDDLEWARE
// ============================================

/**
 * @desc    Protect routes - requires valid access token
 * @access  Private routes only
 * @usage   Add to any route that requires authentication
 * @example router.get('/profile', protect, getProfile)
 * 
 * How it works:
 * 1. Extracts token from Authorization header (Bearer) OR cookie
 * 2. Verifies token using JWT_SECRET
 * 3. Fetches user from database (excluding password and refreshToken)
 * 4. Attaches user to req.user for use in route handlers
 * 5. Checks if account is active/not banned
 * 
 * Token Sources (in order of priority):
 * - Authorization: Bearer <token> (most common for mobile/SPA)
 * - Cookie: token (for web apps with httpOnly cookies)
 */
export const protect = async (req, res, next) => {
  let token;

  // ✅ METHOD 1: Extract from Authorization header (Bearer token)
  // Used by: Mobile apps, Postman, API clients, AJAX requests
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    console.log('🔐 Token extracted from Authorization header');
  } 
  // ✅ METHOD 2: Extract from cookies (httpOnly cookie)
  // Used by: Web browsers with secure cookie storage
  else if (req.cookies?.token) {
    token = req.cookies.token;
    console.log('🍪 Token extracted from cookie');
  }
  // ✅ METHOD 3: Extract from request body (for refresh token endpoint)
  // Used by: Special cases like refresh token requests
  else if (req.body?.token) {
    token = req.body.token;
    console.log('📦 Token extracted from request body');
  }

  // ❌ No token found - reject request
  if (!token) {
    console.log('❌ No token provided in request');
    return res.status(401).json({ 
      success: false, 
      message: 'Not authorized - No token provided. Please login again.' 
    });
  }

  try {
    // ✅ Verify JWT token using secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(`✅ Token verified for user ID: ${decoded.id}`);
    
    // ✅ Fetch user from database (exclude sensitive fields)
    // Excluding: password, refreshToken for security
    const user = await User.findById(decoded.id)
      .select('-password -refreshToken');  // ← Never return these sensitive fields
    
    // ❌ User no longer exists in database
    if (!user) {
      console.log(`❌ User ${decoded.id} not found in database`);
      return res.status(401).json({ 
        success: false, 
        message: 'User account no longer exists' 
      });
    }

    // ❌ Check if account is disabled or banned
    if (!user.isActive) {
      console.log(`⚠️ Inactive account: ${user.email}`);
      return res.status(403).json({ 
        success: false, 
        message: 'Account is deactivated. Please contact support.' 
      });
    }
    
    if (user.isBanned) {
      console.log(`🚫 Banned account access attempt: ${user.email}`);
      return res.status(403).json({ 
        success: false, 
        message: 'Account has been banned. Please contact support.' 
      });
    }

    // ✅ Attach user to request object for downstream middleware/routes
    req.user = user;
    console.log(`🎉 Authentication successful: ${user.email} (${user.role})`);
    
    next();
    
  } catch (error) {
    // 🔴 Handle specific JWT errors for better client feedback
    if (error.name === 'JsonWebTokenError') {
      console.log(`❌ Invalid token signature: ${error.message}`);
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token. Please login again.',
        code: 'INVALID_TOKEN'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      console.log(`⏰ Token expired at: ${error.expiredAt}`);
      return res.status(401).json({ 
        success: false, 
        message: 'Token expired. Please refresh your session.',
        code: 'TOKEN_EXPIRED',
        expiredAt: error.expiredAt
      });
    }
    
    // Generic error fallback
    console.log(`❌ Authentication error: ${error.message}`);
    return res.status(401).json({ 
      success: false, 
      message: 'Not authorized. Authentication failed.',
      code: 'AUTH_FAILED'
    });
  }
};

// ============================================
// ROLE-BASED AUTHORIZATION MIDDLEWARES
// ============================================

/**
 * @desc    Admin only middleware - restricts access to admin users
 * @access  Requires authentication first (use after protect)
 * @example router.delete('/user/:id', protect, adminOnly, deleteUser)
 */
export const adminOnly = (req, res, next) => {
  // Check if user exists (should be set by protect middleware)
  if (!req.user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication required' 
    });
  }
  
  // Check role - only 'admin' has access
  if (req.user.role === 'admin') {
    console.log(`✅ Admin access granted to: ${req.user.email}`);
    next();
  } else {
    console.log(`🚫 Admin access denied for: ${req.user.email} (role: ${req.user.role})`);
    res.status(403).json({ 
      success: false, 
      message: 'Admin access required. This route is restricted to administrators.' 
    });
  }
};

/**
 * @desc    Creator or higher middleware - allows creators, moderators, and admins
 * @access  Requires authentication first (use after protect)
 * @usage   Content creators can access their own content management
 * @example router.post('/content', protect, creatorOrHigher, createContent)
 */
export const creatorOrHigher = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication required' 
    });
  }
  
  // Allowed roles: creator, moderator, admin (ordered by privilege)
  const allowedRoles = ['creator', 'moderator', 'admin'];
  
  if (allowedRoles.includes(req.user.role)) {
    console.log(`✅ Creator+ access granted to: ${req.user.email} (role: ${req.user.role})`);
    next();
  } else {
    console.log(`🚫 Creator+ access denied for: ${req.user.email} (role: ${req.user.role})`);
    res.status(403).json({ 
      success: false, 
      message: 'Creator, moderator, or admin access required.' 
    });
  }
};

/**
 * @desc    Creator only middleware (strict - only creators, not admins/moderators)
 * @access  Requires authentication first (use after protect)
 * @usage   For routes that should only be accessible by creators
 */
export const creatorOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication required' 
    });
  }
  
  if (req.user.role === 'creator') {
    console.log(`✅ Creator access granted to: ${req.user.email}`);
    next();
  } else {
    console.log(`🚫 Creator access denied for: ${req.user.email} (role: ${req.user.role})`);
    res.status(403).json({ 
      success: false, 
      message: 'Creator access required.' 
    });
  }
};

/**
 * @desc    Moderator or higher middleware
 * @access  Requires authentication first (use after protect)
 */
export const moderatorOrHigher = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication required' 
    });
  }
  
  const allowedRoles = ['moderator', 'admin'];
  
  if (allowedRoles.includes(req.user.role)) {
    console.log(`✅ Moderator+ access granted to: ${req.user.email}`);
    next();
  } else {
    console.log(`🚫 Moderator+ access denied for: ${req.user.email}`);
    res.status(403).json({ 
      success: false, 
      message: 'Moderator or admin access required.' 
    });
  }
};

// ============================================
// OPTIONAL AUTHENTICATION MIDDLEWARE
// ============================================

/**
 * @desc    Optional authentication - doesn't reject if no token
 * @access  Public routes that can show personalized content if logged in
 * @usage   Homepage, content listing, search results
 * @example router.get('/posts', optionalAuth, getPosts) // Shows liked status if logged in
 * 
 * How it works:
 * - If token provided AND valid → attaches user to req.user
 * - If no token OR token invalid → continues without user
 * - Never rejects the request (unlike protect middleware)
 */
export const optionalAuth = async (req, res, next) => {
  let token;

  // Try to extract token from various sources
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  // If token exists, try to verify it
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id)
        .select('-password -refreshToken');
      
      if (user && user.isActive && !user.isBanned) {
        req.user = user;
        console.log(`🔓 Optional auth user attached: ${user.email}`);
      }
    } catch (error) {
      // Token invalid - just continue without user
      console.log(`⚠️ Optional auth - invalid token ignored: ${error.message}`);
    }
  }

  // Always continue - with or without user
  next();
};

// ============================================
// REFRESH TOKEN PROTECTION (Specialized)
// ============================================

/**
 * @desc    Special middleware for refresh token endpoint
 * @access  Validates refresh token from cookie or body
 * @usage   Only for /api/auth/refresh-token route
 * 
 * This is different from protect() because:
 * - It expects a refresh token (long-lived) instead of access token
 * - It attaches the user for further processing
 */
export const protectRefreshToken = async (req, res, next) => {
  let refreshToken;

  // Get refresh token from cookie (preferred) or request body
  if (req.cookies?.refreshToken) {
    refreshToken = req.cookies.refreshToken;
    console.log('🍪 Refresh token from cookie');
  } else if (req.body?.refreshToken) {
    refreshToken = req.body.refreshToken;
    console.log('📦 Refresh token from request body');
  }

  if (!refreshToken) {
    return res.status(401).json({ 
      success: false, 
      message: 'No refresh token provided' 
    });
  }

  try {
    const refreshSecret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
    const decoded = jwt.verify(refreshToken, refreshSecret);
    
    // Find user with matching refresh token
    const user = await User.findOne({ 
      _id: decoded.id,
      refreshToken: refreshToken  // Verify token matches stored one
    }).select('-password');
    
    if (!user) {
      return res.status(403).json({ 
        success: false, 
        message: 'Invalid refresh token' 
      });
    }
    
    if (!user.isActive || user.isBanned) {
      return res.status(403).json({ 
        success: false, 
        message: 'Account is disabled' 
      });
    }
    
    req.user = user;
    req.refreshToken = refreshToken;
    next();
    
  } catch (error) {
    console.log(`❌ Refresh token verification failed: ${error.message}`);
    return res.status(403).json({ 
      success: false, 
      message: 'Invalid or expired refresh token' 
    });
  }
};

// ============================================
// RESOURCE OWNERSHIP MIDDLEWARE
// ============================================

/**
 * @desc    Check if user owns the resource
 * @access  Use after protect
 * @param   getResourceOwnerId - Function that returns the owner ID from request
 * @example router.put('/content/:id', protect, checkOwnership((req) => req.params.id), updateContent)
 */
export const checkOwnership = (getResourceOwnerId) => {
  return async (req, res, next) => {
    try {
      const ownerId = getResourceOwnerId(req);
      
      // Admin can bypass ownership check
      if (req.user.role === 'admin') {
        return next();
      }
      
      // Check if user owns the resource
      if (req.user.id !== ownerId) {
        return res.status(403).json({ 
          success: false, 
          message: 'You do not have permission to modify this resource' 
        });
      }
      
      next();
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Error checking resource ownership' 
      });
    }
  };
};

// ============================================
// RATE LIMITING BY ROLE (Helper)
// ============================================

/**
 * @desc    Get rate limit based on user role
 * @usage   For dynamic rate limiting based on subscription/role
 */
export const getRateLimitByRole = (req) => {
  if (!req.user) return 100; // Unauthenticated: 100 requests/minute
  
  const roleLimits = {
    'admin': 1000,      // Admins: 1000 req/min
    'moderator': 500,   // Moderators: 500 req/min
    'creator': 200,     // Creators: 200 req/min
    'user': 100,        // Regular users: 100 req/min
  };
  
  // Premium users get higher limits
  if (req.user.subscription?.plan === 'premium') {
    return 300;
  }
  if (req.user.subscription?.plan === 'pro') {
    return 500;
  }
  
  return roleLimits[req.user.role] || 100;
};



























// // server/middleware/auth.js
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// // ============================================
// // AUTHENTICATION MIDDLEWARE
// // ============================================

// // Protect routes - requires valid token
// export const protect = async (req, res, next) => {
//   let token;

//   // Check for token in Authorization header or cookie
//   if (req.headers.authorization?.startsWith('Bearer')) {
//     token = req.headers.authorization.split(' ')[1];
//   } else if (req.cookies?.token) {
//     token = req.cookies.token;
//   }

//   if (!token) {
//     return res.status(401).json({ 
//       success: false, 
//       message: 'Not authorized, no token' 
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select('-password');

//     if (!req.user) {
//       return res.status(401).json({ 
//         success: false, 
//         message: 'User not found' 
//       });
//     }

//     // Check if account is active and not banned
//     if (!req.user.isActive || req.user.isBanned) {
//       return res.status(403).json({ 
//         success: false, 
//         message: 'Account is disabled or banned' 
//       });
//     }

//     next();
//   } catch (error) {
//     console.error('Auth error:', error);
//     return res.status(401).json({ 
//       success: false, 
//       message: 'Not authorized, token failed' 
//     });
//   }
// };

// // ============================================
// // ROLE-BASED AUTHORIZATION MIDDLEWARE
// // ============================================

// // Admin only access
// export const adminOnly = (req, res, next) => {
//   if (req.user && req.user.role === 'admin') {
//     next();
//   } else {
//     res.status(403).json({ 
//       success: false, 
//       message: 'Admin access required' 
//     });
//   }
// };

// // Creator or higher access (creator, moderator, admin)
// export const creatorOnly = (req, res, next) => {
//   if (req.user && ['creator', 'moderator', 'admin'].includes(req.user.role)) {
//     next();
//   } else {
//     res.status(403).json({ 
//       success: false, 
//       message: 'Creator access required' 
//     });
//   }
// };

// // Moderator or higher access (moderator, admin)
// export const moderatorOnly = (req, res, next) => {
//   if (req.user && ['moderator', 'admin'].includes(req.user.role)) {
//     next();
//   } else {
//     res.status(403).json({ 
//       success: false, 
//       message: 'Moderator access required' 
//     });
//   }
// };

// // Optional authentication - doesn't fail if no token
// export const optionalAuth = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization?.startsWith('Bearer')) {
//     token = req.headers.authorization.split(' ')[1];
//   } else if (req.cookies?.token) {
//     token = req.cookies.token;
//   }

//   if (token) {
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select('-password');
//     } catch (error) {
//       // Continue without user - don't throw error
//       console.log('Optional auth failed:', error.message);
//     }
//   }

//   next();
// };

// // ============================================
// // COMBINED ROLE CHECK MIDDLEWARE
// // ============================================

// // Check if user has any of the allowed roles
// export const hasRole = (roles) => {
//   return (req, res, next) => {
//     if (req.user && roles.includes(req.user.role)) {
//       next();
//     } else {
//       res.status(403).json({ 
//         success: false, 
//         message: `Access denied. Required roles: ${roles.join(', ')}` 
//       });
//     }
//   };
// };

// // ============================================
// // OWNERSHIP CHECK MIDDLEWARE
// // ============================================

// // Check if user owns the resource (for creators)
// export const checkOwnership = (getResourceOwnerId) => {
//   return async (req, res, next) => {
//     try {
//       const ownerId = await getResourceOwnerId(req);
      
//       if (req.user.role === 'admin' || req.user.id === ownerId) {
//         next();
//       } else {
//         res.status(403).json({ 
//           success: false, 
//           message: 'You do not own this resource' 
//         });
//       }
//     } catch (error) {
//       res.status(500).json({ 
//         success: false, 
//         message: 'Error checking ownership' 
//       });
//     }
//   };
// };

// // ============================================
// // RATE LIMITING FOR AUTH ROUTES
// // ============================================

// export const authRateLimit = {
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 5, // 5 attempts per window
//   message: { 
//     success: false, 
//     message: 'Too many login attempts, please try again later' 
//   }
// };

// // ============================================
// // HELPER FUNCTIONS
// // ============================================

// // Get user role display name
// export const getRoleDisplayName = (role) => {
//   const roles = {
//     admin: 'Administrator',
//     moderator: 'Moderator',
//     creator: 'Content Creator',
//     user: 'User'
//   };
//   return roles[role] || 'User';
// };

// // Check if user can modify content
// export const canModifyContent = (user, contentAuthorId) => {
//   if (!user) return false;
//   if (user.role === 'admin') return true;
//   if (user.role === 'moderator') return true;
//   if (user.role === 'creator' && user.id === contentAuthorId) return true;
//   return false;
// };

// // Check if user can delete content
// export const canDeleteContent = (user, contentAuthorId) => {
//   if (!user) return false;
//   if (user.role === 'admin') return true;
//   if (user.role === 'moderator') return true;
//   return false;
// };