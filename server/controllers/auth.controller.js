// import jwt from 'jsonwebtoken';
// import crypto from 'crypto';
// import User from '../models/User.js';
// import { successResponse, errorResponse } from '../utils/response.js';
// import { sendWelcomeEmail } from '../utils/email.js';
// import { logger } from '../utils/logger.js';

// // ============================================
// // TOKEN GENERATION
// // ============================================
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE || '30d'
//   });
// };

// const sendTokenResponse = (user, statusCode, res) => {
//   const token = generateToken(user._id);
//   const options = {
//     expires: new Date(Date.now() + (process.env.JWT_COOKIE_EXPIRE || 30) * 24 * 60 * 60 * 1000),
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'strict'
//   };

//   res.status(statusCode)
//     .cookie('token', token, options)
//     .json({
//       success: true,
//       token,
//       user: user.toPublicProfile ? user.toPublicProfile() : {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         avatar: user.avatar,
//         role: user.role,
//         subscription: user.subscription?.plan
//       }
//     });
// };

// // ============================================
// // REGISTER
// // ============================================
// export const register = async (req, res, next) => {
//   try {
//     const { name, email, password, bio } = req.body;

//     // Validation
//     if (!name || !email || !password) {
//       return errorResponse(res, 'Please provide name, email and password', 400);
//     }

//     if (password.length < 6) {
//       return errorResponse(res, 'Password must be at least 6 characters', 400);
//     }

//     // Check if user exists
//     const existingUser = await User.findOne({ email: email.toLowerCase() });
//     if (existingUser) {
//       return errorResponse(res, 'Email already registered. Please login instead.', 400);
//     }

//     // Create user
//     const user = await User.create({
//       name: name.trim(),
//       email: email.toLowerCase().trim(),
//       password,
//       bio: bio || '',
//       avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
//       isVerified: true, // Auto-verify for now, set to false if email verification needed
//       lastLogin: new Date()
//     });

//     // Send welcome email (non-blocking)
//     sendWelcomeEmail(user).catch(err => logger.error('Welcome email failed', err));

//     logger.info(`New user registered: ${email}`);
//     sendTokenResponse(user, 201, res);

//   } catch (error) {
//     logger.error('Registration error:', error);
//     next(error);
//   }
// };

// // ============================================
// // LOGIN
// // ============================================
// export const login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     // Validation
//     if (!email || !password) {
//       return errorResponse(res, 'Please provide email and password', 400);
//     }

//     // Find user with password
//     const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');

//     if (!user) {
//       return errorResponse(res, 'Invalid email or password', 401);
//     }

//     // Check if banned
//     if (user.isBanned) {
//       return errorResponse(res, 'Your account has been banned. Contact support.', 403);
//     }

//     // Check if active
//     if (!user.isActive) {
//       return errorResponse(res, 'Account is deactivated. Contact support.', 403);
//     }

//     // Verify password
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return errorResponse(res, 'Invalid email or password', 401);
//     }

//     // Update last login
//     user.lastLogin = new Date();
//     await user.save();

//     logger.info(`User logged in: ${email}`);
//     sendTokenResponse(user, 200, res);

//   } catch (error) {
//     logger.error('Login error:', error);
//     next(error);
//   }
// };

// // ============================================
// // LOGOUT
// // ============================================
// export const logout = async (req, res) => {
//   res.cookie('token', 'none', {
//     expires: new Date(Date.now() + 10 * 1000),
//     httpOnly: true
//   });
//   successResponse(res, null, 'Logged out successfully');
// };

// // ============================================
// // GET CURRENT USER (ME)
// // ============================================
// export const getMe = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id)
//       .populate('favorites.poems', 'title slug author')
//       .populate('favorites.books', 'title slug author')
//       .populate('following', 'name slug avatar');

//     if (!user) {
//       return errorResponse(res, 'User not found', 404);
//     }

//     successResponse(res, user);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // GOOGLE AUTH
// // ============================================
// export const googleAuth = (req, res) => {
//   res.redirect('/api/auth/google');
// };

// export const googleCallback = async (req, res, next) => {
//   try {
//     sendTokenResponse(req.user, 200, res);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // FORGOT PASSWORD
// // ============================================
// export const forgotPassword = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) {
//       return errorResponse(res, 'User not found', 404);
//     }

//     const resetToken = crypto.randomBytes(20).toString('hex');
//     user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
//     user.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes
//     await user.save();

//     // TODO: Send actual email with reset link
//     // For development, return token directly
//     if (process.env.NODE_ENV === 'development') {
//       successResponse(res, { resetToken }, 'Password reset token generated (dev mode)');
//     } else {
//       successResponse(res, null, 'Password reset email sent');
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // RESET PASSWORD
// // ============================================
// export const resetPassword = async (req, res, next) => {
//   try {
//     const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
//     const user = await User.findOne({
//       resetPasswordToken,
//       resetPasswordExpire: { $gt: Date.now() }
//     });

//     if (!user) {
//       return errorResponse(res, 'Invalid or expired token', 400);
//     }

//     user.password = req.body.password;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;
//     await user.save();

//     sendTokenResponse(user, 200, res);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // VERIFY EMAIL
// // ============================================
// export const verifyEmail = async (req, res, next) => {
//   try {
//     // TODO: Implement email verification with token
//     successResponse(res, null, 'Email verified successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // REFRESH TOKEN
// // ============================================
// export const refreshToken = async (req, res, next) => {
//   try {
//     const { token } = req.body;
//     if (!token) {
//       return errorResponse(res, 'No token provided', 401);
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id);

//     if (!user) {
//       return errorResponse(res, 'User not found', 404);
//     }

//     sendTokenResponse(user, 200, res);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // UPDATE PROFILE
// // ============================================
// export const updateProfile = async (req, res, next) => {
//   try {
//     const { name, bio, preferences } = req.body;

//     const updateData = {};
//     if (name) updateData.name = name.trim();
//     if (bio !== undefined) updateData.bio = bio;
//     if (preferences) updateData.preferences = preferences;

//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       updateData,
//       { new: true, runValidators: true }
//     );

//     successResponse(res, user, 'Profile updated successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // CHANGE PASSWORD
// // ============================================
// export const changePassword = async (req, res, next) => {
//   try {
//     const { currentPassword, newPassword } = req.body;

//     const user = await User.findById(req.user.id).select('+password');
//     const isMatch = await user.comparePassword(currentPassword);

//     if (!isMatch) {
//       return errorResponse(res, 'Current password is incorrect', 400);
//     }

//     user.password = newPassword;
//     await user.save();

//     successResponse(res, null, 'Password changed successfully');
//   } catch (error) {
//     next(error);
//   }
// };











// server/controllers/auth.controller.js
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/response.js';
import { sendWelcomeEmail } from '../utils/email.js';
import { logger } from '../utils/logger.js';

// ============================================
// TOKEN GENERATION - IMPROVED VERSION
// ============================================
const generateToken = (id, expiresIn = null) => {
  const expiry = expiresIn || process.env.JWT_EXPIRE || '30d';
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: expiry
  });
};

// Generate refresh token (longer expiry)
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET, {
    expiresIn: '7d' // 7 days refresh token
  });
};

const sendTokenResponse = (user, statusCode, res, includeRefreshToken = true) => {
  // Generate short-lived access token
  const token = generateToken(user._id);
  
  // Generate refresh token (stored in HTTP-only cookie)
  let refreshToken = null;
  if (includeRefreshToken) {
    refreshToken = generateRefreshToken(user._id);
    
    // Store refresh token in user document for validation
    user.refreshToken = refreshToken;
    user.save().catch(err => logger.error('Failed to save refresh token', err));
  }
  
  // Set refresh token as HTTP-only cookie (more secure)
  const refreshOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/api/auth/refresh' // Only sent to refresh endpoint
  };
  
  // Set access token cookie (optional - for additional security)
  const accessOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: false, // Allow JS to read for Authorization header
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  };
  
  res.status(statusCode)
    .cookie('refreshToken', refreshToken, refreshOptions)
    .json({
      success: true,
      token, // Access token for Authorization header
      refreshToken: includeRefreshToken ? refreshToken : undefined, // Optional: send to client for storage
      user: user.toPublicProfile ? user.toPublicProfile() : {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        subscription: user.subscription?.plan,
        isVerified: user.isVerified,
        bio: user.bio
      }
    });
};

// ============================================
// REGISTER (Updated to include refresh token)
// ============================================
export const register = async (req, res, next) => {
  try {
    const { name, email, password, bio } = req.body;

    // Validation
    if (!name || !email || !password) {
      return errorResponse(res, 'Please provide name, email and password', 400);
    }

    if (password.length < 6) {
      return errorResponse(res, 'Password must be at least 6 characters', 400);
    }

    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return errorResponse(res, 'Email already registered. Please login instead.', 400);
    }

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      bio: bio || '',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
      isVerified: true,
      lastLogin: new Date()
    });

    // Send welcome email (non-blocking)
    sendWelcomeEmail(user).catch(err => logger.error('Welcome email failed', err));

    logger.info(`New user registered: ${email}`);
    sendTokenResponse(user, 201, res);

  } catch (error) {
    logger.error('Registration error:', error);
    next(error);
  }
};

// ============================================
// LOGIN (Updated with refresh token)
// ============================================
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return errorResponse(res, 'Please provide email and password', 400);
    }

    // Find user with password
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');

    if (!user) {
      return errorResponse(res, 'Invalid email or password', 401);
    }

    // Check if banned
    if (user.isBanned) {
      return errorResponse(res, 'Your account has been banned. Contact support.', 403);
    }

    // Check if active
    if (!user.isActive) {
      return errorResponse(res, 'Account is deactivated. Contact support.', 403);
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return errorResponse(res, 'Invalid email or password', 401);
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    logger.info(`User logged in: ${email}`);
    sendTokenResponse(user, 200, res);

  } catch (error) {
    logger.error('Login error:', error);
    next(error);
  }
};

// ============================================
// LOGOUT (Clear refresh token)
// ============================================
export const logout = async (req, res) => {
  try {
    // Clear refresh token from database if user is logged in
    if (req.user && req.user.id) {
      await User.findByIdAndUpdate(req.user.id, { refreshToken: null });
    }
  } catch (error) {
    logger.error('Logout cleanup error:', error);
  }
  
  // Clear cookies
  res.cookie('refreshToken', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    path: '/api/auth/refresh'
  });
  
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  
  successResponse(res, null, 'Logged out successfully');
};

// ============================================
// REFRESH TOKEN - IMPROVED VERSION
// ============================================
export const refreshToken = async (req, res, next) => {
  try {
    // Get refresh token from cookie or request body
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    
    if (!refreshToken) {
      return errorResponse(res, 'No refresh token provided', 401);
    }

    // Verify refresh token
    let decoded;
    try {
      const refreshSecret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
      decoded = jwt.verify(refreshToken, refreshSecret);
    } catch (jwtError) {
      logger.error('Refresh token verification failed:', jwtError.message);
      return errorResponse(res, 'Invalid or expired refresh token', 401);
    }

    // Find user with this refresh token
    const user = await User.findOne({ 
      _id: decoded.id,
      refreshToken: refreshToken // Verify the token matches stored one
    });

    if (!user) {
      return errorResponse(res, 'Invalid refresh token - user not found or token revoked', 401);
    }

    // Generate new access token
    const newAccessToken = generateToken(user._id, '1d'); // 1 day expiry for access token
    
    // Optional: Rotate refresh token (issue new one for better security)
    const newRefreshToken = generateRefreshToken(user._id);
    user.refreshToken = newRefreshToken;
    await user.save();
    
    // Set new refresh token in cookie
    res.cookie('refreshToken', newRefreshToken, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/api/auth/refresh'
    });

    // Return new access token
    successResponse(res, { 
      token: newAccessToken,
      refreshToken: newRefreshToken // Optional: send for client storage
    }, 'Token refreshed successfully');

  } catch (error) {
    logger.error('Refresh token error:', error);
    next(error);
  }
};

// ============================================
// VERIFY TOKEN (New endpoint)
// ============================================
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return errorResponse(res, 'No token provided', 401);
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }
    
    successResponse(res, {
      valid: true,
      user: user.toPublicProfile ? user.toPublicProfile() : {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        subscription: user.subscription?.plan
      }
    });
    
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return errorResponse(res, 'Invalid token', 401);
    }
    if (error.name === 'TokenExpiredError') {
      return errorResponse(res, 'Token expired', 401);
    }
    next(error);
  }
};

// ============================================
// GET CURRENT USER (ME) - IMPROVED
// ============================================
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('favorites.poems', 'title slug author')
      .populate('favorites.books', 'title slug author')
      .populate('following', 'name slug avatar');

    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    successResponse(res, {
      user: user.toPublicProfile ? user.toPublicProfile() : {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        role: user.role,
        subscription: user.subscription?.plan,
        isVerified: user.isVerified,
        preferences: user.preferences
      }
    });
  } catch (error) {
    next(error);
  }
};

// ============================================
// GOOGLE AUTH
// ============================================
export const googleAuth = (req, res) => {
  res.redirect('/api/auth/google');
};

export const googleCallback = async (req, res, next) => {
  try {
    sendTokenResponse(req.user, 200, res);
  } catch (error) {
    next(error);
  }
};

// ============================================
// FORGOT PASSWORD
// ============================================
export const forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes
    await user.save();

    // TODO: Send actual email with reset link
    // For development, return token directly
    if (process.env.NODE_ENV === 'development') {
      successResponse(res, { resetToken }, 'Password reset token generated (dev mode)');
    } else {
      successResponse(res, null, 'Password reset email sent');
    }
  } catch (error) {
    next(error);
  }
};

// ============================================
// RESET PASSWORD
// ============================================
export const resetPassword = async (req, res, next) => {
  try {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return errorResponse(res, 'Invalid or expired token', 400);
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// ============================================
// VERIFY EMAIL
// ============================================
export const verifyEmail = async (req, res, next) => {
  try {
    // TODO: Implement email verification with token
    successResponse(res, null, 'Email verified successfully');
  } catch (error) {
    next(error);
  }
};

// ============================================
// UPDATE PROFILE
// ============================================
export const updateProfile = async (req, res, next) => {
  try {
    const { name, bio, preferences } = req.body;

    const updateData = {};
    if (name) updateData.name = name.trim();
    if (bio !== undefined) updateData.bio = bio;
    if (preferences) updateData.preferences = preferences;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, runValidators: true }
    );

    successResponse(res, user, 'Profile updated successfully');
  } catch (error) {
    next(error);
  }
};

// ============================================
// CHANGE PASSWORD
// ============================================
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id).select('+password');
    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
      return errorResponse(res, 'Current password is incorrect', 400);
    }

    user.password = newPassword;
    await user.save();

    successResponse(res, null, 'Password changed successfully');
  } catch (error) {
    next(error);
  }
};