import Analytics from '../models/Analytics.js';
import User from '../models/User.js';
import Poem from '../models/Poem.js';
import Book from '../models/Book.js';
import Audio from '../models/Audio.js';
import Video from '../models/Video.js';
import { successResponse } from '../utils/response.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalUsers,
      activeUsers,
      totalPoems,
      totalBooks,
      totalAudio,
      totalVideos,
      totalAuthors
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ lastLogin: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } }),
      Poem.countDocuments({ isPublished: true }),
      Book.countDocuments({ isPublished: true }),
      Audio.countDocuments({ isPublished: true }),
      Video.countDocuments({ isPublished: true }),
      Author.countDocuments()
    ]);

    successResponse(res, {
      totalUsers,
      activeUsers,
      totalPoems,
      totalBooks,
      totalAudio,
      totalVideos,
      totalAuthors,
      newUsersToday: 0, // Would need date filtering
      revenueToday: 0
    });
  } catch (error) {
    next(error);
  }
};

export const getUserAnalytics = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const analytics = await Analytics.find({
      date: { $gte: new Date(startDate), $lte: new Date(endDate) }
    }).sort({ date: 1 });

    successResponse(res, analytics);
  } catch (error) {
    next(error);
  }
};

export const getContentAnalytics = async (req, res, next) => {
  try {
    const topPoems = await Poem.find({ isPublished: true })
      .sort({ 'stats.views': -1 })
      .limit(10)
      .populate('author', 'name slug');

    const topBooks = await Book.find({ isPublished: true })
      .sort({ 'stats.views': -1 })
      .limit(10)
      .populate('author', 'name slug');

    successResponse(res, { topPoems, topBooks });
  } catch (error) {
    next(error);
  }
};

export const getRevenueAnalytics = async (req, res, next) => {
  try {
    const subscriptions = await Analytics.find({ type: 'daily' })
      .sort({ date: -1 })
      .limit(30);

    const totalRevenue = subscriptions.reduce((sum, s) => sum + (s.metrics?.revenue || 0), 0);

    successResponse(res, { subscriptions, totalRevenue });
  } catch (error) {
    next(error);
  }
};

export const getReadingAnalytics = async (req, res, next) => {
  try {
    const analytics = await Analytics.find({ type: 'daily' })
      .sort({ date: -1 })
      .limit(30);

    const totalReadingTime = analytics.reduce((sum, a) => sum + (a.metrics?.totalReadingTime || 0), 0);
    const totalListeningTime = analytics.reduce((sum, a) => sum + (a.metrics?.totalListeningTime || 0), 0);
    const totalWatchTime = analytics.reduce((sum, a) => sum + (a.metrics?.totalWatchTime || 0), 0);

    successResponse(res, { totalReadingTime, totalListeningTime, totalWatchTime, daily: analytics });
  } catch (error) {
    next(error);
  }
};

export const getAIUsageAnalytics = async (req, res, next) => {
  try {
    const analytics = await Analytics.find({ type: 'daily' })
      .sort({ date: -1 })
      .limit(30);

    const totalAIRequests = analytics.reduce((sum, a) => sum + (a.metrics?.aiRequests || 0), 0);

    successResponse(res, { totalAIRequests, daily: analytics });
  } catch (error) {
    next(error);
  }
};

export const trackEvent = async (req, res, next) => {
  try {
    const { event, data } = req.body;
    // Log event for analytics processing
    console.log('Analytics Event:', { event, data, timestamp: new Date() });
    successResponse(res, null, 'Event tracked');
  } catch (error) {
    next(error);
  }
};
