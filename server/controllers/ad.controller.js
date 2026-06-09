// server/controllers/ad.controller.js
import Ad from '../models/Ad.js';
import { successResponse, errorResponse } from '../utils/response.js';

// Get all ads (Admin)
export const getAllAds = async (req, res, next) => {
  try {
    const ads = await Ad.find().sort({ priority: -1, createdAt: -1 });
    successResponse(res, ads);
  } catch (error) {
    next(error);
  }
};

// Get active ads for public
export const getActiveAds = async (req, res, next) => {
  try {
    const { position, page } = req.query;
    const query = { isActive: true };
    
    // Check date range
    query.startDate = { $lte: new Date() };
    if (query.endDate) query.endDate = { $gte: new Date() };
    
    if (position) query.position = position;
    if (page) query.pages = { $in: [page, 'all'] };
    
    // Device detection
    const userAgent = req.headers['user-agent'] || '';
    const isMobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent);
    if (isMobile) {
      query.deviceType = { $in: ['all', 'mobile'] };
    } else {
      query.deviceType = { $in: ['all', 'desktop'] };
    }
    
    const ads = await Ad.find(query).sort({ priority: -1 }).limit(10);
    successResponse(res, ads);
  } catch (error) {
    next(error);
  }
};

// Get ads by position
export const getAdsByPosition = async (req, res, next) => {
  try {
    const { position } = req.params;
    const { page } = req.query;
    const query = { isActive: true, position };
    
    if (page) query.pages = { $in: [page, 'all'] };
    
    const ads = await Ad.find(query).sort({ priority: -1 });
    successResponse(res, ads);
  } catch (error) {
    next(error);
  }
};

// Create ad (Admin)
export const createAd = async (req, res, next) => {
  try {
    const adData = { ...req.body, createdBy: req.user.id };
    const ad = await Ad.create(adData);
    successResponse(res, ad, 'Ad created successfully', 201);
  } catch (error) {
    next(error);
  }
};

// Update ad (Admin)
export const updateAd = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ad = await Ad.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!ad) return errorResponse(res, 'Ad not found', 404);
    successResponse(res, ad, 'Ad updated successfully');
  } catch (error) {
    next(error);
  }
};

// Delete ad (Admin)
export const deleteAd = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ad = await Ad.findByIdAndDelete(id);
    if (!ad) return errorResponse(res, 'Ad not found', 404);
    successResponse(res, null, 'Ad deleted successfully');
  } catch (error) {
    next(error);
  }
};

// Track ad click
export const trackAdClick = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Ad.findByIdAndUpdate(id, { $inc: { clicks: 1 } });
    successResponse(res, null, 'Click tracked');
  } catch (error) {
    next(error);
  }
};

// Track ad impression
export const trackAdImpression = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Ad.findByIdAndUpdate(id, { $inc: { impressions: 1 } });
    successResponse(res, null, 'Impression tracked');
  } catch (error) {
    next(error);
  }
};