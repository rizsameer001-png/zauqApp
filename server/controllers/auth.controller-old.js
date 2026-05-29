import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/response.js';
import { sendWelcomeEmail } from '../utils/email.js';
import { logger } from '../utils/logger.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });
};

const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);
  const options = {
    expires: new Date(Date.now() + (process.env.JWT_COOKIE_EXPIRE || 30) * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  };

  res.status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: user.toPublicProfile()
    });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 'Email already registered', 400);
    }

    const user = await User.create({
      name,
      email,
      password
    });

    sendWelcomeEmail(user).catch(err => logger.error('Welcome email failed', err));
    sendTokenResponse(user, 201, res);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, 'Please provide email and password', 400);
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return errorResponse(res, 'Invalid credentials', 401);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return errorResponse(res, 'Invalid credentials', 401);
    }

    user.lastLogin = new Date();
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  successResponse(res, null, 'Logged out successfully');
};

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('favorites.poems', 'title slug author')
      .populate('favorites.books', 'title slug author')
      .populate('following', 'name slug avatar');

    successResponse(res, user);
  } catch (error) {
    next(error);
  }
};

export const googleAuth = (req, res) => {
  // Redirect to Google OAuth
  res.redirect('/api/auth/google');
};

export const googleCallback = async (req, res, next) => {
  try {
    // Passport handles this in route middleware
    sendTokenResponse(req.user, 200, res);
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
    await user.save();

    // TODO: Send email with reset token
    successResponse(res, { resetToken }, 'Password reset email sent');
  } catch (error) {
    next(error);
  }
};

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

export const verifyEmail = async (req, res, next) => {
  try {
    // TODO: Implement email verification
    successResponse(res, null, 'Email verified successfully');
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      return errorResponse(res, 'No token provided', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};
