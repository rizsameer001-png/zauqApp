//working revert if any issues
//server/middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    if (!req.user.isActive || req.user.isBanned) {
      return res.status(403).json({ success: false, message: 'Account is disabled' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Admin access required' });
  }
};

export const creatorOnly = (req, res, next) => {
  if (req.user && ['creator', 'admin', 'moderator'].includes(req.user.role)) {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Creator access required' });
  }
};

export const optionalAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
    } catch (error) {
      // Continue without user
    }
  }

  next();
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