import User from '../models/User.js';
import Poem from '../models/Poem.js';
import Book from '../models/Book.js';
import Audio from '../models/Audio.js';
import Video from '../models/Video.js';
import { successResponse } from '../utils/response.js';

export const getCreatorDashboard = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const [poems, books, audio, videos] = await Promise.all([
      Poem.find({ createdBy: userId }),
      Book.find({ createdBy: userId }),
      Audio.find({ createdBy: userId }),
      Video.find({ createdBy: userId })
    ]);

    const totalUploads = poems.length + books.length + audio.length + videos.length;
    const totalViews = [...poems, ...books, ...audio, ...videos].reduce((sum, item) => sum + (item.stats?.views || 0), 0);
    const totalLikes = [...poems, ...books, ...audio, ...videos].reduce((sum, item) => sum + (item.stats?.likes || 0), 0);

    successResponse(res, {
      stats: {
        totalUploads,
        totalViews,
        totalLikes,
        poems: poems.length,
        books: books.length,
        audio: audio.length,
        videos: videos.length
      },
      recentUploads: [...poems, ...books, ...audio, ...videos]
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 10)
    });
  } catch (error) {
    next(error);
  }
};

export const getCreatorContent = async (req, res, next) => {
  try {
    const { type } = req.query;
    const userId = req.user.id;

    let content = [];
    switch (type) {
      case 'poems':
        content = await Poem.find({ createdBy: userId }).populate('author', 'name slug');
        break;
      case 'books':
        content = await Book.find({ createdBy: userId }).populate('author', 'name slug');
        break;
      case 'audio':
        content = await Audio.find({ createdBy: userId }).populate('author', 'name slug');
        break;
      case 'videos':
        content = await Video.find({ createdBy: userId }).populate('author', 'name slug');
        break;
      default:
        const [poems, books, audio, videos] = await Promise.all([
          Poem.find({ createdBy: userId }).populate('author', 'name slug'),
          Book.find({ createdBy: userId }).populate('author', 'name slug'),
          Audio.find({ createdBy: userId }).populate('author', 'name slug'),
          Video.find({ createdBy: userId }).populate('author', 'name slug')
        ]);
        content = { poems, books, audio, videos };
    }

    successResponse(res, content);
  } catch (error) {
    next(error);
  }
};

export const getCreatorStats = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const [poems, books, audio, videos] = await Promise.all([
      Poem.find({ createdBy: userId }),
      Book.find({ createdBy: userId }),
      Audio.find({ createdBy: userId }),
      Video.find({ createdBy: userId })
    ]);

    const allContent = [...poems, ...books, ...audio, ...videos];

    const stats = {
      totalContent: allContent.length,
      totalViews: allContent.reduce((sum, item) => sum + (item.stats?.views || 0), 0),
      totalLikes: allContent.reduce((sum, item) => sum + (item.stats?.likes || 0), 0),
      totalBookmarks: allContent.reduce((sum, item) => sum + (item.stats?.bookmarks || 0), 0),
      totalComments: allContent.reduce((sum, item) => sum + (item.stats?.comments || 0), 0),
      totalDownloads: allContent.reduce((sum, item) => sum + (item.stats?.downloads || 0), 0),
      contentBreakdown: {
        poems: { count: poems.length, views: poems.reduce((s, p) => s + (p.stats?.views || 0), 0) },
        books: { count: books.length, views: books.reduce((s, b) => s + (b.stats?.views || 0), 0) },
        audio: { count: audio.length, views: audio.reduce((s, a) => s + (a.stats?.views || 0), 0) },
        videos: { count: videos.length, views: videos.reduce((s, v) => s + (v.stats?.views || 0), 0) }
      }
    };

    successResponse(res, stats);
  } catch (error) {
    next(error);
  }
};

export const getCreatorRevenue = async (req, res, next) => {
  try {
    // Mock revenue data - integrate with actual payment system
    const revenue = {
      totalRevenue: 0,
      pendingPayout: 0,
      lastPayout: null,
      monthlyBreakdown: [],
      revenueSources: {
        subscriptions: 0,
        downloads: 0,
        ads: 0
      }
    };
    successResponse(res, revenue);
  } catch (error) {
    next(error);
  }
};

export const getCreatorFollowers = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('followers', 'name avatar');
    successResponse(res, user?.followers || []);
  } catch (error) {
    next(error);
  }
};

export const getCreatorAnalytics = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const [poems, books, audio, videos] = await Promise.all([
      Poem.find({ createdBy: userId }).sort({ createdAt: -1 }).limit(50),
      Book.find({ createdBy: userId }).sort({ createdAt: -1 }).limit(50),
      Audio.find({ createdBy: userId }).sort({ createdAt: -1 }).limit(50),
      Video.find({ createdBy: userId }).sort({ createdAt: -1 }).limit(50)
    ]);

    const allContent = [...poems, ...books, ...audio, ...videos];

    // Group by date for chart data
    const viewsByDate = {};
    allContent.forEach(item => {
      const date = item.createdAt.toISOString().split('T')[0];
      viewsByDate[date] = (viewsByDate[date] || 0) + (item.stats?.views || 0);
    });

    successResponse(res, {
      viewsByDate,
      topContent: allContent
        .sort((a, b) => (b.stats?.views || 0) - (a.stats?.views || 0))
        .slice(0, 10)
        .map(item => ({
          id: item._id,
          title: item.title,
          type: item.constructor.modelName.toLowerCase(),
          views: item.stats?.views || 0,
          likes: item.stats?.likes || 0
        }))
    });
  } catch (error) {
    next(error);
  }
};

export const getUploadStatus = async (req, res, next) => {
  try {
    // Mock upload status - integrate with queue system
    successResponse(res, {
      pending: [],
      processing: [],
      completed: [],
      failed: []
    });
  } catch (error) {
    next(error);
  }
};

export const updateCreatorProfile = async (req, res, next) => {
  try {
    const { bio, socialLinks } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { bio, socialLinks },
      { new: true }
    );
    successResponse(res, user, 'Creator profile updated');
  } catch (error) {
    next(error);
  }
};
