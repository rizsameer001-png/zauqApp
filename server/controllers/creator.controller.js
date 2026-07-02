// // server/controllers/creator.controller.js
// import User from '../models/User.js';
// import Poem from '../models/Poem.js';
// import Book from '../models/Book.js';
// import Audio from '../models/Audio.js';
// import Video from '../models/Video.js';
// import { successResponse } from '../utils/response.js';

// export const getCreatorDashboard = async (req, res, next) => {
//   try {
//     const userId = req.user.id;

//     const [poems, books, audio, videos] = await Promise.all([
//       Poem.find({ createdBy: userId }),
//       Book.find({ createdBy: userId }),
//       Audio.find({ createdBy: userId }),
//       Video.find({ createdBy: userId })
//     ]);

//     const totalUploads = poems.length + books.length + audio.length + videos.length;
//     const totalViews = [...poems, ...books, ...audio, ...videos].reduce((sum, item) => sum + (item.stats?.views || 0), 0);
//     const totalLikes = [...poems, ...books, ...audio, ...videos].reduce((sum, item) => sum + (item.stats?.likes || 0), 0);

//     successResponse(res, {
//       stats: {
//         totalUploads,
//         totalViews,
//         totalLikes,
//         poems: poems.length,
//         books: books.length,
//         audio: audio.length,
//         videos: videos.length
//       },
//       recentUploads: [...poems, ...books, ...audio, ...videos]
//         .sort((a, b) => b.createdAt - a.createdAt)
//         .slice(0, 10)
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getCreatorContent = async (req, res, next) => {
//   try {
//     const { type } = req.query;
//     const userId = req.user.id;

//     let content = [];
//     switch (type) {
//       case 'poems':
//         content = await Poem.find({ createdBy: userId }).populate('author', 'name slug');
//         break;
//       case 'books':
//         content = await Book.find({ createdBy: userId }).populate('author', 'name slug');
//         break;
//       case 'audio':
//         content = await Audio.find({ createdBy: userId }).populate('author', 'name slug');
//         break;
//       case 'videos':
//         content = await Video.find({ createdBy: userId }).populate('author', 'name slug');
//         break;
//       default:
//         const [poems, books, audio, videos] = await Promise.all([
//           Poem.find({ createdBy: userId }).populate('author', 'name slug'),
//           Book.find({ createdBy: userId }).populate('author', 'name slug'),
//           Audio.find({ createdBy: userId }).populate('author', 'name slug'),
//           Video.find({ createdBy: userId }).populate('author', 'name slug')
//         ]);
//         content = { poems, books, audio, videos };
//     }

//     successResponse(res, content);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getCreatorStats = async (req, res, next) => {
//   try {
//     const userId = req.user.id;

//     const [poems, books, audio, videos] = await Promise.all([
//       Poem.find({ createdBy: userId }),
//       Book.find({ createdBy: userId }),
//       Audio.find({ createdBy: userId }),
//       Video.find({ createdBy: userId })
//     ]);

//     const allContent = [...poems, ...books, ...audio, ...videos];

//     const stats = {
//       totalContent: allContent.length,
//       totalViews: allContent.reduce((sum, item) => sum + (item.stats?.views || 0), 0),
//       totalLikes: allContent.reduce((sum, item) => sum + (item.stats?.likes || 0), 0),
//       totalBookmarks: allContent.reduce((sum, item) => sum + (item.stats?.bookmarks || 0), 0),
//       totalComments: allContent.reduce((sum, item) => sum + (item.stats?.comments || 0), 0),
//       totalDownloads: allContent.reduce((sum, item) => sum + (item.stats?.downloads || 0), 0),
//       contentBreakdown: {
//         poems: { count: poems.length, views: poems.reduce((s, p) => s + (p.stats?.views || 0), 0) },
//         books: { count: books.length, views: books.reduce((s, b) => s + (b.stats?.views || 0), 0) },
//         audio: { count: audio.length, views: audio.reduce((s, a) => s + (a.stats?.views || 0), 0) },
//         videos: { count: videos.length, views: videos.reduce((s, v) => s + (v.stats?.views || 0), 0) }
//       }
//     };

//     successResponse(res, stats);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getCreatorRevenue = async (req, res, next) => {
//   try {
//     // Mock revenue data - integrate with actual payment system
//     const revenue = {
//       totalRevenue: 0,
//       pendingPayout: 0,
//       lastPayout: null,
//       monthlyBreakdown: [],
//       revenueSources: {
//         subscriptions: 0,
//         downloads: 0,
//         ads: 0
//       }
//     };
//     successResponse(res, revenue);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getCreatorFollowers = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id).populate('followers', 'name avatar');
//     successResponse(res, user?.followers || []);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getCreatorAnalytics = async (req, res, next) => {
//   try {
//     const userId = req.user.id;

//     const [poems, books, audio, videos] = await Promise.all([
//       Poem.find({ createdBy: userId }).sort({ createdAt: -1 }).limit(50),
//       Book.find({ createdBy: userId }).sort({ createdAt: -1 }).limit(50),
//       Audio.find({ createdBy: userId }).sort({ createdAt: -1 }).limit(50),
//       Video.find({ createdBy: userId }).sort({ createdAt: -1 }).limit(50)
//     ]);

//     const allContent = [...poems, ...books, ...audio, ...videos];

//     // Group by date for chart data
//     const viewsByDate = {};
//     allContent.forEach(item => {
//       const date = item.createdAt.toISOString().split('T')[0];
//       viewsByDate[date] = (viewsByDate[date] || 0) + (item.stats?.views || 0);
//     });

//     successResponse(res, {
//       viewsByDate,
//       topContent: allContent
//         .sort((a, b) => (b.stats?.views || 0) - (a.stats?.views || 0))
//         .slice(0, 10)
//         .map(item => ({
//           id: item._id,
//           title: item.title,
//           type: item.constructor.modelName.toLowerCase(),
//           views: item.stats?.views || 0,
//           likes: item.stats?.likes || 0
//         }))
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getUploadStatus = async (req, res, next) => {
//   try {
//     // Mock upload status - integrate with queue system
//     successResponse(res, {
//       pending: [],
//       processing: [],
//       completed: [],
//       failed: []
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateCreatorProfile = async (req, res, next) => {
//   try {
//     const { bio, socialLinks } = req.body;
//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       { bio, socialLinks },
//       { new: true }
//     );
//     successResponse(res, user, 'Creator profile updated');
//   } catch (error) {
//     next(error);
//   }
// };










// // server/controllers/creator.controller.js
// import User from '../models/User.js';
// import Poem from '../models/Poem.js';
// import Book from '../models/Book.js';
// import Audio from '../models/Audio.js';
// import Video from '../models/Video.js';
// import { successResponse } from '../utils/response.js';

// export const getCreatorDashboard = async (req, res, next) => {
//   try {
//     const userId = req.user.id;

//     const [poems, books, audio, videos] = await Promise.all([
//       Poem.find({ createdBy: userId }),
//       Book.find({ createdBy: userId }),
//       Audio.find({ createdBy: userId }),
//       Video.find({ createdBy: userId })
//     ]);

//     const totalUploads = poems.length + books.length + audio.length + videos.length;
//     const totalViews = [...poems, ...books, ...audio, ...videos].reduce((sum, item) => sum + (item.stats?.views || 0), 0);
//     const totalLikes = [...poems, ...books, ...audio, ...videos].reduce((sum, item) => sum + (item.stats?.likes || 0), 0);

//     successResponse(res, {
//       stats: {
//         totalUploads,
//         totalViews,
//         totalLikes,
//         poems: poems.length,
//         books: books.length,
//         audio: audio.length,
//         videos: videos.length
//       },
//       recentUploads: [...poems, ...books, ...audio, ...videos]
//         .sort((a, b) => b.createdAt - a.createdAt)
//         .slice(0, 10)
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getCreatorContent = async (req, res, next) => {
//   try {
//     const { type } = req.query;
//     const userId = req.user.id;

//     let content = [];
//     switch (type) {
//       case 'poems':
//         content = await Poem.find({ createdBy: userId }).populate('author', 'name slug');
//         break;
//       case 'books':
//         content = await Book.find({ createdBy: userId }).populate('author', 'name slug');
//         break;
//       case 'audio':
//         content = await Audio.find({ createdBy: userId }).populate('author', 'name slug');
//         break;
//       case 'videos':
//         content = await Video.find({ createdBy: userId }).populate('author', 'name slug');
//         break;
//       default:
//         const [poems, books, audio, videos] = await Promise.all([
//           Poem.find({ createdBy: userId }).populate('author', 'name slug'),
//           Book.find({ createdBy: userId }).populate('author', 'name slug'),
//           Audio.find({ createdBy: userId }).populate('author', 'name slug'),
//           Video.find({ createdBy: userId }).populate('author', 'name slug')
//         ]);
//         content = { poems, books, audio, videos };
//     }

//     successResponse(res, content);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getCreatorStats = async (req, res, next) => {
//   try {
//     const userId = req.user.id;

//     const [poems, books, audio, videos] = await Promise.all([
//       Poem.find({ createdBy: userId }),
//       Book.find({ createdBy: userId }),
//       Audio.find({ createdBy: userId }),
//       Video.find({ createdBy: userId })
//     ]);

//     const allContent = [...poems, ...books, ...audio, ...videos];

//     const stats = {
//       totalContent: allContent.length,
//       totalViews: allContent.reduce((sum, item) => sum + (item.stats?.views || 0), 0),
//       totalLikes: allContent.reduce((sum, item) => sum + (item.stats?.likes || 0), 0),
//       totalBookmarks: allContent.reduce((sum, item) => sum + (item.stats?.bookmarks || 0), 0),
//       totalComments: allContent.reduce((sum, item) => sum + (item.stats?.comments || 0), 0),
//       totalDownloads: allContent.reduce((sum, item) => sum + (item.stats?.downloads || 0), 0),
//       contentBreakdown: {
//         poems: { count: poems.length, views: poems.reduce((s, p) => s + (p.stats?.views || 0), 0) },
//         books: { count: books.length, views: books.reduce((s, b) => s + (b.stats?.views || 0), 0) },
//         audio: { count: audio.length, views: audio.reduce((s, a) => s + (a.stats?.views || 0), 0) },
//         videos: { count: videos.length, views: videos.reduce((s, v) => s + (v.stats?.views || 0), 0) }
//       }
//     };

//     successResponse(res, stats);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getCreatorRevenue = async (req, res, next) => {
//   try {
//     // Mock revenue data - integrate with actual payment system
//     const revenue = {
//       totalRevenue: 0,
//       pendingPayout: 0,
//       lastPayout: null,
//       monthlyBreakdown: [],
//       revenueSources: {
//         subscriptions: 0,
//         downloads: 0,
//         ads: 0
//       }
//     };
//     successResponse(res, revenue);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getCreatorFollowers = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id).populate('followers', 'name avatar');
//     successResponse(res, user?.followers || []);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getCreatorAnalytics = async (req, res, next) => {
//   try {
//     const userId = req.user.id;

//     const [poems, books, audio, videos] = await Promise.all([
//       Poem.find({ createdBy: userId }).sort({ createdAt: -1 }).limit(50),
//       Book.find({ createdBy: userId }).sort({ createdAt: -1 }).limit(50),
//       Audio.find({ createdBy: userId }).sort({ createdAt: -1 }).limit(50),
//       Video.find({ createdBy: userId }).sort({ createdAt: -1 }).limit(50)
//     ]);

//     const allContent = [...poems, ...books, ...audio, ...videos];

//     // Group by date for chart data
//     const viewsByDate = {};
//     allContent.forEach(item => {
//       const date = item.createdAt.toISOString().split('T')[0];
//       viewsByDate[date] = (viewsByDate[date] || 0) + (item.stats?.views || 0);
//     });

//     successResponse(res, {
//       viewsByDate,
//       topContent: allContent
//         .sort((a, b) => (b.stats?.views || 0) - (a.stats?.views || 0))
//         .slice(0, 10)
//         .map(item => ({
//           id: item._id,
//           title: item.title,
//           type: item.constructor.modelName.toLowerCase(),
//           views: item.stats?.views || 0,
//           likes: item.stats?.likes || 0
//         }))
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getUploadStatus = async (req, res, next) => {
//   try {
//     // Mock upload status - integrate with queue system
//     successResponse(res, {
//       pending: [],
//       processing: [],
//       completed: [],
//       failed: []
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateCreatorProfile = async (req, res, next) => {
//   try {
//     const { bio, socialLinks } = req.body;
//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       { bio, socialLinks },
//       { new: true }
//     );
//     successResponse(res, user, 'Creator profile updated');
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // ADD THESE MISSING METHODS
// // ============================================

// /**
//  * Get creator's poems only
//  */
// export const getCreatorPoems = async (req, res, next) => {
//   try {
//     const poems = await Poem.find({ createdBy: req.user.id })
//       .populate('author', 'name slug')
//       .sort({ createdAt: -1 });
//     successResponse(res, poems);
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * Get creator's books only
//  */
// export const getCreatorBooks = async (req, res, next) => {
//   try {
//     const books = await Book.find({ createdBy: req.user.id })
//       .populate('author', 'name slug')
//       .sort({ createdAt: -1 });
//     successResponse(res, books);
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * Get creator's audio only
//  */
// export const getCreatorAudio = async (req, res, next) => {
//   try {
//     const audio = await Audio.find({ createdBy: req.user.id })
//       .populate('author', 'name slug')
//       .sort({ createdAt: -1 });
//     successResponse(res, audio);
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * Get creator's videos only
//  */
// export const getCreatorVideos = async (req, res, next) => {
//   try {
//     const videos = await Video.find({ createdBy: req.user.id })
//       .populate('author', 'name slug')
//       .sort({ createdAt: -1 });
//     successResponse(res, videos);
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * Bulk delete content
//  */
// export const bulkDeleteContent = async (req, res, next) => {
//   try {
//     const { ids, type } = req.body;
//     const userId = req.user.id;
    
//     if (!ids || !ids.length) {
//       return res.status(400).json({ success: false, message: 'No IDs provided' });
//     }
    
//     if (!type) {
//       return res.status(400).json({ success: false, message: 'Content type is required' });
//     }
    
//     let result;
//     switch (type) {
//       case 'poems':
//         result = await Poem.deleteMany({ _id: { $in: ids }, createdBy: userId });
//         break;
//       case 'books':
//         result = await Book.deleteMany({ _id: { $in: ids }, createdBy: userId });
//         break;
//       case 'audio':
//         result = await Audio.deleteMany({ _id: { $in: ids }, createdBy: userId });
//         break;
//       case 'videos':
//         result = await Video.deleteMany({ _id: { $in: ids }, createdBy: userId });
//         break;
//       default:
//         return res.status(400).json({ success: false, message: 'Invalid content type' });
//     }
    
//     successResponse(res, { deletedCount: result.deletedCount }, `${result.deletedCount} item(s) deleted successfully`);
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * Bulk update content status
//  */
// export const bulkUpdateStatus = async (req, res, next) => {
//   try {
//     const { ids, type, status } = req.body;
//     const userId = req.user.id;
    
//     if (!ids || !ids.length) {
//       return res.status(400).json({ success: false, message: 'No IDs provided' });
//     }
    
//     if (!type) {
//       return res.status(400).json({ success: false, message: 'Content type is required' });
//     }
    
//     if (!status || !['published', 'draft', 'archived'].includes(status)) {
//       return res.status(400).json({ success: false, message: 'Valid status is required' });
//     }
    
//     const updateData = { status, updatedAt: Date.now() };
//     let result;
    
//     switch (type) {
//       case 'poems':
//         result = await Poem.updateMany({ _id: { $in: ids }, createdBy: userId }, updateData);
//         break;
//       case 'books':
//         result = await Book.updateMany({ _id: { $in: ids }, createdBy: userId }, updateData);
//         break;
//       case 'audio':
//         result = await Audio.updateMany({ _id: { $in: ids }, createdBy: userId }, updateData);
//         break;
//       case 'videos':
//         result = await Video.updateMany({ _id: { $in: ids }, createdBy: userId }, updateData);
//         break;
//       default:
//         return res.status(400).json({ success: false, message: 'Invalid content type' });
//     }
    
//     successResponse(res, { modifiedCount: result.modifiedCount }, `Status updated for ${result.modifiedCount} item(s)`);
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * Get detailed content analytics with date range
//  */
// export const getContentAnalytics = async (req, res, next) => {
//   try {
//     const { startDate, endDate, type } = req.query;
//     const userId = req.user.id;
    
//     let query = { createdBy: userId };
//     if (startDate && endDate) {
//       query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
//     }
    
//     let content = [];
//     switch (type) {
//       case 'poems':
//         content = await Poem.find(query);
//         break;
//       case 'books':
//         content = await Book.find(query);
//         break;
//       case 'audio':
//         content = await Audio.find(query);
//         break;
//       case 'videos':
//         content = await Video.find(query);
//         break;
//       default:
//         const [poems, books, audio, videos] = await Promise.all([
//           Poem.find(query),
//           Book.find(query),
//           Audio.find(query),
//           Video.find(query)
//         ]);
//         content = [...poems, ...books, ...audio, ...videos];
//     }
    
//     const totalViews = content.reduce((sum, item) => sum + (item.stats?.views || 0), 0);
//     const totalLikes = content.reduce((sum, item) => sum + (item.stats?.likes || 0), 0);
//     const totalComments = content.reduce((sum, item) => sum + (item.stats?.comments || 0), 0);
//     const totalBookmarks = content.reduce((sum, item) => sum + (item.stats?.bookmarks || 0), 0);
//     const totalDownloads = content.reduce((sum, item) => sum + (item.stats?.downloads || 0), 0);
    
//     const analytics = {
//       totalContent: content.length,
//       totalViews,
//       totalLikes,
//       totalComments,
//       totalBookmarks,
//       totalDownloads,
//       averageEngagement: content.length > 0 
//         ? ((totalLikes + totalComments + totalBookmarks) / content.length).toFixed(2)
//         : 0,
//       viewsPerContent: content.length > 0 ? (totalViews / content.length).toFixed(2) : 0,
//       likesPerContent: content.length > 0 ? (totalLikes / content.length).toFixed(2) : 0
//     };
    
//     successResponse(res, analytics);
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * Get top performing content
//  */
// export const getTopContent = async (req, res, next) => {
//   try {
//     const { limit = 10, type, sortBy = 'views' } = req.query;
//     const userId = req.user.id;
    
//     const sortField = sortBy === 'likes' ? 'stats.likes' : 'stats.views';
    
//     let content = [];
//     switch (type) {
//       case 'poems':
//         content = await Poem.find({ createdBy: userId })
//           .populate('author', 'name slug')
//           .sort({ [sortField]: -1 })
//           .limit(parseInt(limit));
//         break;
//       case 'books':
//         content = await Book.find({ createdBy: userId })
//           .populate('author', 'name slug')
//           .sort({ [sortField]: -1 })
//           .limit(parseInt(limit));
//         break;
//       case 'audio':
//         content = await Audio.find({ createdBy: userId })
//           .populate('author', 'name slug')
//           .sort({ [sortField]: -1 })
//           .limit(parseInt(limit));
//         break;
//       case 'videos':
//         content = await Video.find({ createdBy: userId })
//           .populate('author', 'name slug')
//           .sort({ [sortField]: -1 })
//           .limit(parseInt(limit));
//         break;
//       default:
//         const [poems, books, audio, videos] = await Promise.all([
//           Poem.find({ createdBy: userId }).populate('author', 'name slug'),
//           Book.find({ createdBy: userId }).populate('author', 'name slug'),
//           Audio.find({ createdBy: userId }).populate('author', 'name slug'),
//           Video.find({ createdBy: userId }).populate('author', 'name slug')
//         ]);
//         content = [...poems, ...books, ...audio, ...videos]
//           .sort((a, b) => (b.stats?.[sortBy] || 0) - (a.stats?.[sortBy] || 0))
//           .slice(0, parseInt(limit));
//     }
    
//     successResponse(res, content.map(item => ({
//       id: item._id,
//       title: item.title,
//       slug: item.slug,
//       type: item.constructor.modelName.toLowerCase(),
//       views: item.stats?.views || 0,
//       likes: item.stats?.likes || 0,
//       comments: item.stats?.comments || 0,
//       bookmarks: item.stats?.bookmarks || 0,
//       downloads: item.stats?.downloads || 0,
//       createdAt: item.createdAt,
//       author: item.author ? { name: item.author.name, slug: item.author.slug } : null
//     })));
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * Get earning reports
//  */
// export const getEarningReports = async (req, res, next) => {
//   try {
//     const { year, month } = req.query;
//     const userId = req.user.id;
    
//     // This is a mock implementation - integrate with actual payment system
//     // Get all content created by user
//     const [poems, books, audio, videos] = await Promise.all([
//       Poem.find({ createdBy: userId }),
//       Book.find({ createdBy: userId }),
//       Audio.find({ createdBy: userId }),
//       Video.find({ createdBy: userId })
//     ]);
    
//     const allContent = [...poems, ...books, ...audio, ...videos];
    
//     // Calculate estimated earnings based on views and downloads
//     const totalViews = allContent.reduce((sum, item) => sum + (item.stats?.views || 0), 0);
//     const totalDownloads = allContent.reduce((sum, item) => sum + (item.stats?.downloads || 0), 0);
    
//     // Mock earnings calculation (replace with actual logic)
//     const adRevenue = totalViews * 0.001; // $0.001 per view
//     const downloadRevenue = totalDownloads * 0.5; // $0.50 per download
    
//     const reports = {
//       summary: {
//         totalEarnings: adRevenue + downloadRevenue,
//         adRevenue,
//         downloadRevenue,
//         totalViews,
//         totalDownloads,
//         totalContent: allContent.length
//       },
//       monthlyBreakdown: [],
//       topEarningContent: allContent
//         .sort((a, b) => ((b.stats?.views || 0) * 0.001 + (b.stats?.downloads || 0) * 0.5) - 
//                          ((a.stats?.views || 0) * 0.001 + (a.stats?.downloads || 0) * 0.5))
//         .slice(0, 5)
//         .map(item => ({
//           id: item._id,
//           title: item.title,
//           type: item.constructor.modelName.toLowerCase(),
//           views: item.stats?.views || 0,
//           downloads: item.stats?.downloads || 0,
//           earnings: ((item.stats?.views || 0) * 0.001) + ((item.stats?.downloads || 0) * 0.5)
//         }))
//     };
    
//     successResponse(res, reports);
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * Get upload presets (categories, types, etc.)
//  */
// export const getUploadPresets = async (req, res, next) => {
//   try {
//     const presets = {
//       poetry: {
//         genres: ['Ghazal', 'Nazm', 'Sher', 'Rubai', 'Qita', 'Marsiya', 'Qawwali', 'Hamd', 'Naat', 'Manqabat', 'Doha', 'Geet', 'Song', 'Other'],
//         statuses: ['published', 'draft']
//       },
//       audio: {
//         types: ['Recitation', 'Naat', 'Hamd', 'Qawwali', 'Podcast', 'Interview', 'Lecture', 'Other'],
//         occasions: ['Ramadan', 'Eid', 'Muharram', 'Milad', 'Wedding', 'Funeral', 'Other']
//       },
//       video: {
//         categories: ['Mushaira', 'Podcast', 'Documentary', 'Interview', 'Lecture', 'Performance', 'Other']
//       },
//       book: {
//         formats: ['PDF', 'EPUB', 'MOBI'],
//         genres: ['Poetry Collection', 'Novel', 'Short Stories', 'Essay', 'Biography', 'Other']
//       }
//     };
    
//     successResponse(res, presets);
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * Validate file before upload
//  */
// export const validateFile = async (req, res, next) => {
//   try {
//     const { fileType, fileSize, mimeType } = req.body;
    
//     const maxSizes = {
//       image: 5 * 1024 * 1024, // 5MB
//       audio: 50 * 1024 * 1024, // 50MB
//       video: 500 * 1024 * 1024, // 500MB
//       pdf: 20 * 1024 * 1024 // 20MB
//     };
    
//     const allowedMimeTypes = {
//       image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
//       audio: ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/m4a'],
//       video: ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'],
//       pdf: ['application/pdf']
//     };
    
//     let isValid = true;
//     let message = 'File is valid';
    
//     // Check file size
//     if (maxSizes[fileType] && fileSize > maxSizes[fileType]) {
//       isValid = false;
//       message = `File size exceeds maximum allowed (${maxSizes[fileType] / (1024 * 1024)}MB)`;
//     }
    
//     // Check mime type
//     if (allowedMimeTypes[fileType] && !allowedMimeTypes[fileType].includes(mimeType)) {
//       isValid = false;
//       message = `Invalid file type. Allowed: ${allowedMimeTypes[fileType].join(', ')}`;
//     }
    
//     successResponse(res, { isValid, message, maxSize: maxSizes[fileType] });
//   } catch (error) {
//     next(error);
//   }
// };












// // server/controllers/creator.controller.js
// import User from '../models/User.js';
// import Poem from '../models/Poem.js';
// import Book from '../models/Book.js';
// import Audio from '../models/Audio.js';
// import Video from '../models/Video.js';
// import { successResponse, errorResponse } from '../utils/response.js';

// // ============================================
// // DASHBOARD & OVERVIEW
// // ============================================

// export const getCreatorDashboard = async (req, res, next) => {
//   try {
//     const userId = req.user.id;

//     const [poems, books, audio, videos] = await Promise.all([
//       Poem.find({ createdBy: userId }),
//       Book.find({ createdBy: userId }),
//       Audio.find({ createdBy: userId }),
//       Video.find({ createdBy: userId })
//     ]);

//     const allContent = [...poems, ...books, ...audio, ...videos];
//     const totalUploads = allContent.length;
//     const totalViews = allContent.reduce((sum, item) => sum + (item.stats?.views || 0), 0);
//     const totalLikes = allContent.reduce((sum, item) => sum + (item.stats?.likes || 0), 0);

//     // Calculate engagement rate
//     const engagementRate = totalUploads > 0 ? ((totalLikes / totalViews) * 100).toFixed(2) : 0;

//     successResponse(res, {
//       stats: {
//         totalUploads,
//         totalViews,
//         totalLikes,
//         engagementRate,
//         poems: poems.length,
//         books: books.length,
//         audio: audio.length,
//         videos: videos.length
//       },
//       recentUploads: allContent
//         .sort((a, b) => b.createdAt - a.createdAt)
//         .slice(0, 10)
//         .map(item => ({
//           id: item._id,
//           title: item.title,
//           type: item.constructor.modelName.toLowerCase(),
//           views: item.stats?.views || 0,
//           likes: item.stats?.likes || 0,
//           createdAt: item.createdAt,
//           isPublished: item.isPublished !== undefined ? item.isPublished : true
//         }))
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // CONTENT MANAGEMENT
// // ============================================

// export const getCreatorContent = async (req, res, next) => {
//   try {
//     const { type, page = 1, limit = 20, sort = 'createdAt', order = 'desc' } = req.query;
//     const userId = req.user.id;
//     const skip = (parseInt(page) - 1) * parseInt(limit);
//     const sortOrder = order === 'asc' ? 1 : -1;
//     const sortField = sort === 'views' ? 'stats.views' : 
//                      sort === 'likes' ? 'stats.likes' : 'createdAt';

//     let content = [];
//     let total = 0;

//     const populateOptions = { path: 'author', select: 'name slug' };

//     switch (type) {
//       case 'poems':
//         [content, total] = await Promise.all([
//           Poem.find({ createdBy: userId })
//             .populate(populateOptions)
//             .sort({ [sortField]: sortOrder })
//             .skip(skip)
//             .limit(parseInt(limit)),
//           Poem.countDocuments({ createdBy: userId })
//         ]);
//         break;
//       case 'books':
//         [content, total] = await Promise.all([
//           Book.find({ createdBy: userId })
//             .populate(populateOptions)
//             .sort({ [sortField]: sortOrder })
//             .skip(skip)
//             .limit(parseInt(limit)),
//           Book.countDocuments({ createdBy: userId })
//         ]);
//         break;
//       case 'audio':
//         [content, total] = await Promise.all([
//           Audio.find({ createdBy: userId })
//             .populate(populateOptions)
//             .sort({ [sortField]: sortOrder })
//             .skip(skip)
//             .limit(parseInt(limit)),
//           Audio.countDocuments({ createdBy: userId })
//         ]);
//         break;
//       case 'videos':
//         [content, total] = await Promise.all([
//           Video.find({ createdBy: userId })
//             .populate(populateOptions)
//             .sort({ [sortField]: sortOrder })
//             .skip(skip)
//             .limit(parseInt(limit)),
//           Video.countDocuments({ createdBy: userId })
//         ]);
//         break;
//       default:
//         const [poems, books, audio, videos] = await Promise.all([
//           Poem.find({ createdBy: userId }).populate(populateOptions),
//           Book.find({ createdBy: userId }).populate(populateOptions),
//           Audio.find({ createdBy: userId }).populate(populateOptions),
//           Video.find({ createdBy: userId }).populate(populateOptions)
//         ]);
//         content = { poems, books, audio, videos };
//         total = poems.length + books.length + audio.length + videos.length;
//     }

//     const response = Array.isArray(content) ? {
//       content,
//       pagination: {
//         total,
//         page: parseInt(page),
//         limit: parseInt(limit),
//         totalPages: Math.ceil(total / parseInt(limit))
//       }
//     } : content;

//     successResponse(res, response);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // STATISTICS
// // ============================================

// export const getCreatorStats = async (req, res, next) => {
//   try {
//     const userId = req.user.id;

//     const [poems, books, audio, videos] = await Promise.all([
//       Poem.find({ createdBy: userId }),
//       Book.find({ createdBy: userId }),
//       Audio.find({ createdBy: userId }),
//       Video.find({ createdBy: userId })
//     ]);

//     const allContent = [...poems, ...books, ...audio, ...videos];

//     // Calculate time-based stats (last 30 days)
//     const thirtyDaysAgo = new Date();
//     thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

//     const recentContent = allContent.filter(item => 
//       new Date(item.createdAt) >= thirtyDaysAgo
//     );

//     const stats = {
//       totalContent: allContent.length,
//       totalViews: allContent.reduce((sum, item) => sum + (item.stats?.views || 0), 0),
//       totalLikes: allContent.reduce((sum, item) => sum + (item.stats?.likes || 0), 0),
//       totalBookmarks: allContent.reduce((sum, item) => sum + (item.stats?.bookmarks || 0), 0),
//       totalComments: allContent.reduce((sum, item) => sum + (item.stats?.comments || 0), 0),
//       totalDownloads: allContent.reduce((sum, item) => sum + (item.stats?.downloads || 0), 0),
//       recentActivity: {
//         contentAdded: recentContent.length,
//         views: recentContent.reduce((sum, item) => sum + (item.stats?.views || 0), 0),
//         likes: recentContent.reduce((sum, item) => sum + (item.stats?.likes || 0), 0)
//       },
//       contentBreakdown: {
//         poems: { 
//           count: poems.length, 
//           views: poems.reduce((s, p) => s + (p.stats?.views || 0), 0),
//           likes: poems.reduce((s, p) => s + (p.stats?.likes || 0), 0)
//         },
//         books: { 
//           count: books.length, 
//           views: books.reduce((s, b) => s + (b.stats?.views || 0), 0),
//           likes: books.reduce((s, b) => s + (b.stats?.likes || 0), 0)
//         },
//         audio: { 
//           count: audio.length, 
//           views: audio.reduce((s, a) => s + (a.stats?.views || 0), 0),
//           likes: audio.reduce((s, a) => s + (a.stats?.likes || 0), 0)
//         },
//         videos: { 
//           count: videos.length, 
//           views: videos.reduce((s, v) => s + (v.stats?.views || 0), 0),
//           likes: videos.reduce((s, v) => s + (v.stats?.likes || 0), 0)
//         }
//       }
//     };

//     successResponse(res, stats);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // REVENUE & EARNINGS
// // ============================================

// export const getCreatorRevenue = async (req, res, next) => {
//   try {
//     const userId = req.user.id;
    
//     // Get content stats for revenue calculation
//     const [poems, books, audio, videos] = await Promise.all([
//       Poem.find({ createdBy: userId }),
//       Book.find({ createdBy: userId }),
//       Audio.find({ createdBy: userId }),
//       Video.find({ createdBy: userId })
//     ]);

//     const allContent = [...poems, ...books, ...audio, ...videos];
//     const totalViews = allContent.reduce((sum, item) => sum + (item.stats?.views || 0), 0);
//     const totalDownloads = allContent.reduce((sum, item) => sum + (item.stats?.downloads || 0), 0);

//     // Calculate earnings (mock - replace with actual payment system)
//     const adRevenue = totalViews * 0.001;
//     const downloadRevenue = totalDownloads * 0.5;
//     const subscriptionRevenue = allContent.filter(item => item.isPremium).length * 2.99;

//     const revenue = {
//       totalRevenue: adRevenue + downloadRevenue + subscriptionRevenue,
//       pendingPayout: (adRevenue + downloadRevenue) * 0.7, // 70% pending
//       lastPayout: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
//       nextPayout: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
//       monthlyBreakdown: generateMonthlyBreakdown(allContent),
//       revenueSources: {
//         subscriptions: subscriptionRevenue,
//         downloads: downloadRevenue,
//         ads: adRevenue
//       },
//       contentPerformance: allContent.slice(0, 5).map(item => ({
//         title: item.title,
//         type: item.constructor.modelName.toLowerCase(),
//         earnings: ((item.stats?.views || 0) * 0.001) + ((item.stats?.downloads || 0) * 0.5)
//       }))
//     };

//     successResponse(res, revenue);
//   } catch (error) {
//     next(error);
//   }
// };

// // Helper function for monthly breakdown
// const generateMonthlyBreakdown = (content) => {
//   const monthlyData = {};
//   const now = new Date();
  
//   for (let i = 11; i >= 0; i--) {
//     const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
//     const monthKey = month.toISOString().slice(0, 7);
//     monthlyData[monthKey] = {
//       month: monthKey,
//       views: 0,
//       earnings: 0
//     };
//   }

//   content.forEach(item => {
//     const monthKey = new Date(item.createdAt).toISOString().slice(0, 7);
//     if (monthlyData[monthKey]) {
//       monthlyData[monthKey].views += item.stats?.views || 0;
//       monthlyData[monthKey].earnings += ((item.stats?.views || 0) * 0.001) + 
//                                         ((item.stats?.downloads || 0) * 0.5);
//     }
//   });

//   return Object.values(monthlyData);
// };

// // ============================================
// // FOLLOWERS
// // ============================================

// export const getCreatorFollowers = async (req, res, next) => {
//   try {
//     const { page = 1, limit = 20 } = req.query;
//     const user = await User.findById(req.user.id)
//       .populate({
//         path: 'followers',
//         select: 'name avatar username bio',
//         options: {
//           skip: (parseInt(page) - 1) * parseInt(limit),
//           limit: parseInt(limit)
//         }
//       });

//     const totalFollowers = user?.followers?.length || 0;

//     successResponse(res, {
//       followers: user?.followers || [],
//       pagination: {
//         total: totalFollowers,
//         page: parseInt(page),
//         limit: parseInt(limit),
//         totalPages: Math.ceil(totalFollowers / parseInt(limit))
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // ANALYTICS
// // ============================================

// export const getCreatorAnalytics = async (req, res, next) => {
//   try {
//     const userId = req.user.id;
//     const { period = '30d' } = req.query;

//     const days = parseInt(period) || 30;
//     const startDate = new Date();
//     startDate.setDate(startDate.getDate() - days);

//     const [poems, books, audio, videos] = await Promise.all([
//       Poem.find({ createdBy: userId, createdAt: { $gte: startDate } })
//         .sort({ createdAt: -1 }),
//       Book.find({ createdBy: userId, createdAt: { $gte: startDate } })
//         .sort({ createdAt: -1 }),
//       Audio.find({ createdBy: userId, createdAt: { $gte: startDate } })
//         .sort({ createdAt: -1 }),
//       Video.find({ createdBy: userId, createdAt: { $gte: startDate } })
//         .sort({ createdAt: -1 })
//     ]);

//     const allContent = [...poems, ...books, ...audio, ...videos];

//     // Group by date for chart data
//     const viewsByDate = {};
//     const likesByDate = {};
//     const contentByDate = {};

//     allContent.forEach(item => {
//       const date = item.createdAt.toISOString().split('T')[0];
//       viewsByDate[date] = (viewsByDate[date] || 0) + (item.stats?.views || 0);
//       likesByDate[date] = (likesByDate[date] || 0) + (item.stats?.likes || 0);
//       contentByDate[date] = (contentByDate[date] || 0) + 1;
//     });

//     // Calculate growth rates
//     const dates = Object.keys(viewsByDate).sort();
//     const growthRate = dates.length > 1 ? 
//       ((viewsByDate[dates[dates.length - 1]] - viewsByDate[dates[0]]) / viewsByDate[dates[0]] * 100).toFixed(2) : 0;

//     successResponse(res, {
//       viewsByDate,
//       likesByDate,
//       contentByDate,
//       period: days,
//       summary: {
//         totalContent: allContent.length,
//         totalViews: Object.values(viewsByDate).reduce((a, b) => a + b, 0),
//         totalLikes: Object.values(likesByDate).reduce((a, b) => a + b, 0),
//         growthRate: growthRate || 0,
//         averageViewsPerContent: allContent.length > 0 ? 
//           (Object.values(viewsByDate).reduce((a, b) => a + b, 0) / allContent.length).toFixed(2) : 0
//       },
//       topContent: allContent
//         .sort((a, b) => (b.stats?.views || 0) - (a.stats?.views || 0))
//         .slice(0, 10)
//         .map(item => ({
//           id: item._id,
//           title: item.title,
//           type: item.constructor.modelName.toLowerCase(),
//           views: item.stats?.views || 0,
//           likes: item.stats?.likes || 0,
//           engagement: item.stats?.views > 0 ? 
//             ((item.stats?.likes || 0) / item.stats?.views * 100).toFixed(2) : 0
//         }))
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // UPLOAD STATUS
// // ============================================

// export const getUploadStatus = async (req, res, next) => {
//   try {
//     // This would integrate with a queue system like Bull or RabbitMQ
//     // For now, we'll return a mock response
    
//     // You can implement actual queue checking here
//     const uploads = await getUploadQueueStatus(req.user.id); // Placeholder function
    
//     successResponse(res, {
//       pending: uploads?.pending || [],
//       processing: uploads?.processing || [],
//       completed: uploads?.completed || [],
//       failed: uploads?.failed || [],
//       summary: {
//         total: (uploads?.pending?.length || 0) + (uploads?.processing?.length || 0) + 
//                (uploads?.completed?.length || 0) + (uploads?.failed?.length || 0),
//         pending: uploads?.pending?.length || 0,
//         processing: uploads?.processing?.length || 0,
//         completed: uploads?.completed?.length || 0,
//         failed: uploads?.failed?.length || 0
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Placeholder function - replace with actual queue implementation
// const getUploadQueueStatus = async (userId) => {
//   // Implement actual queue status checking here
//   return {
//     pending: [],
//     processing: [],
//     completed: [],
//     failed: []
//   };
// };

// // ============================================
// // PROFILE UPDATE
// // ============================================

// export const updateCreatorProfile = async (req, res, next) => {
//   try {
//     const { bio, socialLinks, displayName, avatar } = req.body;
    
//     const updateData = {};
//     if (bio !== undefined) updateData.bio = bio;
//     if (displayName !== undefined) updateData.displayName = displayName;
//     if (avatar !== undefined) updateData.avatar = avatar;
//     if (socialLinks !== undefined) updateData.socialLinks = socialLinks;

//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       updateData,
//       { new: true, runValidators: true }
//     ).select('-password -__v');

//     if (!user) {
//       return errorResponse(res, 'User not found', 404);
//     }

//     successResponse(res, user, 'Creator profile updated successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // CONTENT TYPE SPECIFIC METHODS
// // ============================================

// export const getCreatorPoems = async (req, res, next) => {
//   try {
//     const { page = 1, limit = 20 } = req.query;
//     const skip = (parseInt(page) - 1) * parseInt(limit);
    
//     const [poems, total] = await Promise.all([
//       Poem.find({ createdBy: req.user.id })
//         .populate('author', 'name slug')
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(parseInt(limit)),
//       Poem.countDocuments({ createdBy: req.user.id })
//     ]);

//     successResponse(res, {
//       poems,
//       pagination: {
//         total,
//         page: parseInt(page),
//         limit: parseInt(limit),
//         totalPages: Math.ceil(total / parseInt(limit))
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getCreatorBooks = async (req, res, next) => {
//   try {
//     const { page = 1, limit = 20 } = req.query;
//     const skip = (parseInt(page) - 1) * parseInt(limit);
    
//     const [books, total] = await Promise.all([
//       Book.find({ createdBy: req.user.id })
//         .populate('author', 'name slug')
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(parseInt(limit)),
//       Book.countDocuments({ createdBy: req.user.id })
//     ]);

//     successResponse(res, {
//       books,
//       pagination: {
//         total,
//         page: parseInt(page),
//         limit: parseInt(limit),
//         totalPages: Math.ceil(total / parseInt(limit))
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getCreatorAudio = async (req, res, next) => {
//   try {
//     const { page = 1, limit = 20 } = req.query;
//     const skip = (parseInt(page) - 1) * parseInt(limit);
    
//     const [audio, total] = await Promise.all([
//       Audio.find({ createdBy: req.user.id })
//         .populate('author', 'name slug')
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(parseInt(limit)),
//       Audio.countDocuments({ createdBy: req.user.id })
//     ]);

//     successResponse(res, {
//       audio,
//       pagination: {
//         total,
//         page: parseInt(page),
//         limit: parseInt(limit),
//         totalPages: Math.ceil(total / parseInt(limit))
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getCreatorVideos = async (req, res, next) => {
//   try {
//     const { page = 1, limit = 20, status } = req.query;
//     const query = { createdBy: req.user.id };
    
//     if (status) {
//       query.isPublished = status === 'published';
//     }
    
//     const skip = (parseInt(page) - 1) * parseInt(limit);
    
//     const [videos, total] = await Promise.all([
//       Video.find(query)
//         .populate('author', 'name slug')
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(parseInt(limit)),
//       Video.countDocuments(query)
//     ]);

//     successResponse(res, {
//       videos,
//       pagination: {
//         total,
//         page: parseInt(page),
//         limit: parseInt(limit),
//         totalPages: Math.ceil(total / parseInt(limit))
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // BULK OPERATIONS
// // ============================================

// export const bulkDeleteContent = async (req, res, next) => {
//   try {
//     const { ids, type } = req.body;
//     const userId = req.user.id;
    
//     if (!ids || !ids.length) {
//       return errorResponse(res, 'No IDs provided', 400);
//     }
    
//     if (!type || !['poems', 'books', 'audio', 'videos'].includes(type)) {
//       return errorResponse(res, 'Valid content type is required', 400);
//     }
    
//     let result;
//     const Model = { poems: Poem, books: Book, audio: Audio, videos: Video }[type];
    
//     result = await Model.deleteMany({ _id: { $in: ids }, createdBy: userId });
    
//     successResponse(res, { 
//       deletedCount: result.deletedCount,
//       ids 
//     }, `${result.deletedCount} item(s) deleted successfully`);
//   } catch (error) {
//     next(error);
//   }
// };

// export const bulkUpdateStatus = async (req, res, next) => {
//   try {
//     const { ids, type, status } = req.body;
//     const userId = req.user.id;
    
//     if (!ids || !ids.length) {
//       return errorResponse(res, 'No IDs provided', 400);
//     }
    
//     if (!type || !['poems', 'books', 'audio', 'videos'].includes(type)) {
//       return errorResponse(res, 'Valid content type is required', 400);
//     }
    
//     if (!status || !['published', 'draft', 'archived'].includes(status)) {
//       return errorResponse(res, 'Valid status is required (published, draft, archived)', 400);
//     }
    
//     const updateData = { 
//       status, 
//       updatedAt: Date.now(),
//       ...(status === 'published' ? { publishedAt: Date.now() } : {})
//     };
    
//     const Model = { poems: Poem, books: Book, audio: Audio, videos: Video }[type];
//     const result = await Model.updateMany(
//       { _id: { $in: ids }, createdBy: userId }, 
//       updateData
//     );
    
//     successResponse(res, { 
//       modifiedCount: result.modifiedCount,
//       ids,
//       status
//     }, `Status updated for ${result.modifiedCount} item(s)`);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // ADVANCED ANALYTICS
// // ============================================

// export const getContentAnalytics = async (req, res, next) => {
//   try {
//     const { startDate, endDate, type } = req.query;
//     const userId = req.user.id;
    
//     let query = { createdBy: userId };
//     if (startDate && endDate) {
//       query.createdAt = { 
//         $gte: new Date(startDate), 
//         $lte: new Date(endDate) 
//       };
//     }
    
//     let content = [];
//     switch (type) {
//       case 'poems':
//         content = await Poem.find(query);
//         break;
//       case 'books':
//         content = await Book.find(query);
//         break;
//       case 'audio':
//         content = await Audio.find(query);
//         break;
//       case 'videos':
//         content = await Video.find(query);
//         break;
//       default:
//         const [poems, books, audio, videos] = await Promise.all([
//           Poem.find(query),
//           Book.find(query),
//           Audio.find(query),
//           Video.find(query)
//         ]);
//         content = [...poems, ...books, ...audio, ...videos];
//     }
    
//     const totalViews = content.reduce((sum, item) => sum + (item.stats?.views || 0), 0);
//     const totalLikes = content.reduce((sum, item) => sum + (item.stats?.likes || 0), 0);
//     const totalComments = content.reduce((sum, item) => sum + (item.stats?.comments || 0), 0);
//     const totalBookmarks = content.reduce((sum, item) => sum + (item.stats?.bookmarks || 0), 0);
//     const totalDownloads = content.reduce((sum, item) => sum + (item.stats?.downloads || 0), 0);
    
//     const analytics = {
//       period: {
//         startDate: startDate || null,
//         endDate: endDate || null
//       },
//       totalContent: content.length,
//       totalViews,
//       totalLikes,
//       totalComments,
//       totalBookmarks,
//       totalDownloads,
//       engagement: {
//         likeRate: totalViews > 0 ? ((totalLikes / totalViews) * 100).toFixed(2) : 0,
//         commentRate: totalViews > 0 ? ((totalComments / totalViews) * 100).toFixed(2) : 0,
//         bookmarkRate: totalViews > 0 ? ((totalBookmarks / totalViews) * 100).toFixed(2) : 0
//       },
//       averages: {
//         viewsPerContent: content.length > 0 ? (totalViews / content.length).toFixed(2) : 0,
//         likesPerContent: content.length > 0 ? (totalLikes / content.length).toFixed(2) : 0,
//         commentsPerContent: content.length > 0 ? (totalComments / content.length).toFixed(2) : 0
//       }
//     };
    
//     successResponse(res, analytics);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getTopContent = async (req, res, next) => {
//   try {
//     const { limit = 10, type, sortBy = 'views', timeRange = 'all' } = req.query;
//     const userId = req.user.id;
    
//     const sortField = sortBy === 'likes' ? 'stats.likes' : 
//                      sortBy === 'comments' ? 'stats.comments' : 'stats.views';
    
//     let dateFilter = {};
//     if (timeRange !== 'all') {
//       const days = parseInt(timeRange) || 30;
//       const startDate = new Date();
//       startDate.setDate(startDate.getDate() - days);
//       dateFilter.createdAt = { $gte: startDate };
//     }
    
//     let content = [];
//     let total = 0;
    
//     const populateOptions = { path: 'author', select: 'name slug' };
    
//     switch (type) {
//       case 'poems':
//         [content, total] = await Promise.all([
//           Poem.find({ createdBy: userId, ...dateFilter })
//             .populate(populateOptions)
//             .sort({ [sortField]: -1 })
//             .limit(parseInt(limit)),
//           Poem.countDocuments({ createdBy: userId, ...dateFilter })
//         ]);
//         break;
//       case 'books':
//         [content, total] = await Promise.all([
//           Book.find({ createdBy: userId, ...dateFilter })
//             .populate(populateOptions)
//             .sort({ [sortField]: -1 })
//             .limit(parseInt(limit)),
//           Book.countDocuments({ createdBy: userId, ...dateFilter })
//         ]);
//         break;
//       case 'audio':
//         [content, total] = await Promise.all([
//           Audio.find({ createdBy: userId, ...dateFilter })
//             .populate(populateOptions)
//             .sort({ [sortField]: -1 })
//             .limit(parseInt(limit)),
//           Audio.countDocuments({ createdBy: userId, ...dateFilter })
//         ]);
//         break;
//       case 'videos':
//         [content, total] = await Promise.all([
//           Video.find({ createdBy: userId, ...dateFilter })
//             .populate(populateOptions)
//             .sort({ [sortField]: -1 })
//             .limit(parseInt(limit)),
//           Video.countDocuments({ createdBy: userId, ...dateFilter })
//         ]);
//         break;
//       default:
//         const [poems, books, audio, videos] = await Promise.all([
//           Poem.find({ createdBy: userId, ...dateFilter }).populate(populateOptions),
//           Book.find({ createdBy: userId, ...dateFilter }).populate(populateOptions),
//           Audio.find({ createdBy: userId, ...dateFilter }).populate(populateOptions),
//           Video.find({ createdBy: userId, ...dateFilter }).populate(populateOptions)
//         ]);
//         content = [...poems, ...books, ...audio, ...videos]
//           .sort((a, b) => (b.stats?.[sortBy] || 0) - (a.stats?.[sortBy] || 0))
//           .slice(0, parseInt(limit));
//         total = content.length;
//     }
    
//     successResponse(res, {
//       content: content.map(item => ({
//         id: item._id,
//         title: item.title,
//         slug: item.slug,
//         type: item.constructor.modelName.toLowerCase(),
//         views: item.stats?.views || 0,
//         likes: item.stats?.likes || 0,
//         comments: item.stats?.comments || 0,
//         bookmarks: item.stats?.bookmarks || 0,
//         downloads: item.stats?.downloads || 0,
//         engagement: item.stats?.views > 0 ? 
//           (((item.stats?.likes || 0) + (item.stats?.comments || 0)) / item.stats?.views * 100).toFixed(2) : 0,
//         createdAt: item.createdAt,
//         author: item.author ? { 
//           name: item.author.name, 
//           slug: item.author.slug 
//         } : null
//       })),
//       pagination: {
//         total,
//         limit: parseInt(limit)
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // EARNING REPORTS
// // ============================================

// export const getEarningReports = async (req, res, next) => {
//   try {
//     const { year, month, period = 'monthly' } = req.query;
//     const userId = req.user.id;
    
//     // Get all content created by user
//     const [poems, books, audio, videos] = await Promise.all([
//       Poem.find({ createdBy: userId }),
//       Book.find({ createdBy: userId }),
//       Audio.find({ createdBy: userId }),
//       Video.find({ createdBy: userId })
//     ]);
    
//     const allContent = [...poems, ...books, ...audio, ...videos];
    
//     // Calculate estimated earnings based on views and downloads
//     const totalViews = allContent.reduce((sum, item) => sum + (item.stats?.views || 0), 0);
//     const totalDownloads = allContent.reduce((sum, item) => sum + (item.stats?.downloads || 0), 0);
//     const premiumContent = allContent.filter(item => item.isPremium).length;
    
//     // Mock earnings calculation (replace with actual logic)
//     const adRevenue = totalViews * 0.001;
//     const downloadRevenue = totalDownloads * 0.5;
//     const subscriptionRevenue = premiumContent * 2.99;
    
//     // Generate detailed breakdown by content type
//     const breakdownByType = {
//       poems: {
//         count: poems.length,
//         views: poems.reduce((s, p) => s + (p.stats?.views || 0), 0),
//         downloads: poems.reduce((s, p) => s + (p.stats?.downloads || 0), 0),
//         earnings: poems.reduce((s, p) => s + ((p.stats?.views || 0) * 0.001 + (p.stats?.downloads || 0) * 0.5), 0)
//       },
//       books: {
//         count: books.length,
//         views: books.reduce((s, b) => s + (b.stats?.views || 0), 0),
//         downloads: books.reduce((s, b) => s + (b.stats?.downloads || 0), 0),
//         earnings: books.reduce((s, b) => s + ((b.stats?.views || 0) * 0.001 + (b.stats?.downloads || 0) * 0.5), 0)
//       },
//       audio: {
//         count: audio.length,
//         views: audio.reduce((s, a) => s + (a.stats?.views || 0), 0),
//         downloads: audio.reduce((s, a) => s + (a.stats?.downloads || 0), 0),
//         earnings: audio.reduce((s, a) => s + ((a.stats?.views || 0) * 0.001 + (a.stats?.downloads || 0) * 0.5), 0)
//       },
//       videos: {
//         count: videos.length,
//         views: videos.reduce((s, v) => s + (v.stats?.views || 0), 0),
//         downloads: videos.reduce((s, v) => s + (v.stats?.downloads || 0), 0),
//         earnings: videos.reduce((s, v) => s + ((v.stats?.views || 0) * 0.001 + (v.stats?.downloads || 0) * 0.5), 0)
//       }
//     };
    
//     const reports = {
//       summary: {
//         totalEarnings: adRevenue + downloadRevenue + subscriptionRevenue,
//         adRevenue,
//         downloadRevenue,
//         subscriptionRevenue,
//         totalViews,
//         totalDownloads,
//         totalContent: allContent.length,
//         premiumContent,
//         averageEarningPerContent: allContent.length > 0 ? 
//           ((adRevenue + downloadRevenue + subscriptionRevenue) / allContent.length).toFixed(2) : 0
//       },
//       breakdownByType,
//       topEarningContent: allContent
//         .sort((a, b) => ((b.stats?.views || 0) * 0.001 + (b.stats?.downloads || 0) * 0.5) - 
//                          ((a.stats?.views || 0) * 0.001 + (a.stats?.downloads || 0) * 0.5))
//         .slice(0, 10)
//         .map(item => ({
//           id: item._id,
//           title: item.title,
//           type: item.constructor.modelName.toLowerCase(),
//           views: item.stats?.views || 0,
//           downloads: item.stats?.downloads || 0,
//           earnings: ((item.stats?.views || 0) * 0.001) + ((item.stats?.downloads || 0) * 0.5),
//           isPremium: item.isPremium || false
//         })),
//       monthlyBreakdown: generateMonthlyBreakdown(allContent)
//     };
    
//     successResponse(res, reports);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // UPLOAD PRESETS
// // ============================================

// export const getUploadPresets = async (req, res, next) => {
//   try {
//     // Fetch categories from database if available
//     // const categories = await Category.find({ isActive: true });
    
//     const presets = {
//       poetry: {
//         genres: ['Ghazal', 'Nazm', 'Sher', 'Rubai', 'Qita', 'Marsiya', 'Qawwali', 'Hamd', 'Naat', 'Manqabat', 'Doha', 'Geet', 'Song', 'Other'],
//         statuses: ['published', 'draft'],
//         languages: ['urdu', 'hindi', 'english']
//       },
//       audio: {
//         types: ['Recitation', 'Naat', 'Hamd', 'Qawwali', 'Podcast', 'Interview', 'Lecture', 'Other'],
//         occasions: ['Ramadan', 'Eid', 'Muharram', 'Milad', 'Wedding', 'Funeral', 'Other'],
//         languages: ['urdu', 'hindi', 'english']
//       },
//       video: {
//         categories: ['Mushaira', 'Podcast', 'Documentary', 'Interview', 'Lecture', 'Performance', 'Other'],
//         languages: ['urdu', 'hindi', 'english'],
//         visibility: ['public', 'private', 'unlisted']
//       },
//       book: {
//         formats: ['PDF', 'EPUB', 'MOBI'],
//         genres: ['Poetry Collection', 'Novel', 'Short Stories', 'Essay', 'Biography', 'Other'],
//         languages: ['urdu', 'hindi', 'english']
//       },
//       general: {
//         visibility: ['public', 'private', 'unlisted'],
//         statuses: ['published', 'draft', 'archived'],
//         languages: ['urdu', 'hindi', 'english', 'other']
//       }
//     };
    
//     successResponse(res, presets);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // FILE VALIDATION
// // ============================================

// export const validateFile = async (req, res, next) => {
//   try {
//     const { fileType, fileSize, mimeType, fileName } = req.body;
    
//     const maxSizes = {
//       image: 5 * 1024 * 1024, // 5MB
//       audio: 50 * 1024 * 1024, // 50MB
//       video: 500 * 1024 * 1024, // 500MB
//       pdf: 20 * 1024 * 1024, // 20MB
//       document: 10 * 1024 * 1024 // 10MB
//     };
    
//     const allowedMimeTypes = {
//       image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
//       audio: ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/m4a', 'audio/aac'],
//       video: ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm', 'video/mkv'],
//       pdf: ['application/pdf'],
//       document: ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
//     };
    
//     // Check for dangerous file extensions
//     const dangerousExtensions = ['.exe', '.bat', '.sh', '.js', '.jar', '.apk', '.msi'];
//     const hasDangerousExt = dangerousExtensions.some(ext => 
//       fileName?.toLowerCase().endsWith(ext)
//     );
    
//     let isValid = true;
//     let message = 'File is valid';
    
//     // Check file type validity
//     if (!fileType || !maxSizes[fileType]) {
//       isValid = false;
//       message = `Invalid file type. Allowed types: ${Object.keys(maxSizes).join(', ')}`;
//     }
    
//     // Check file size
//     if (isValid && maxSizes[fileType] && fileSize > maxSizes[fileType]) {
//       isValid = false;
//       message = `File size exceeds maximum allowed (${(maxSizes[fileType] / (1024 * 1024)).toFixed(1)}MB)`;
//     }
    
//     // Check mime type
//     if (isValid && allowedMimeTypes[fileType] && !allowedMimeTypes[fileType].includes(mimeType)) {
//       isValid = false;
//       message = `Invalid file format. Allowed: ${allowedMimeTypes[fileType].join(', ')}`;
//     }
    
//     // Check for dangerous extensions
//     if (isValid && hasDangerousExt) {
//       isValid = false;
//       message = 'File type not allowed for security reasons';
//     }
    
//     successResponse(res, { 
//       isValid, 
//       message, 
//       maxSize: maxSizes[fileType] || 0,
//       allowedTypes: allowedMimeTypes[fileType] || [],
//       fileType: isValid ? fileType : null
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // EXPORT ALL FUNCTIONS
// // ============================================

// export default {
//   getCreatorDashboard,
//   getCreatorContent,
//   getCreatorStats,
//   getCreatorRevenue,
//   getCreatorFollowers,
//   getCreatorAnalytics,
//   getUploadStatus,
//   updateCreatorProfile,
//   getCreatorPoems,
//   getCreatorBooks,
//   getCreatorAudio,
//   getCreatorVideos,
//   bulkDeleteContent,
//   bulkUpdateStatus,
//   getContentAnalytics,
//   getTopContent,
//   getEarningReports,
//   getUploadPresets,
//   validateFile
// };

















// server/controllers/creator.controller.js
import User from '../models/User.js';
import Poem from '../models/Poem.js';
import Book from '../models/Book.js';
import Audio from '../models/Audio.js';
import Video from '../models/Video.js';
import Playlist from '../models/Playlist.js';
import Notification from '../models/Notification.js';
import { successResponse, errorResponse } from '../utils/response.js';

// ============================================
// DASHBOARD & OVERVIEW
// ============================================

export const getCreatorDashboard = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const [poems, books, audio, videos, notifications, playlists] = await Promise.all([
      Poem.find({ createdBy: userId }),
      Book.find({ createdBy: userId }),
      Audio.find({ createdBy: userId }),
      Video.find({ createdBy: userId }),
      Notification.find({ userId, isRead: false }).limit(5),
      Playlist.find({ createdBy: userId }).limit(5)
    ]);

    const allContent = [...poems, ...books, ...audio, ...videos];
    const totalUploads = allContent.length;
    const totalViews = allContent.reduce((sum, item) => sum + (item.stats?.views || 0), 0);
    const totalLikes = allContent.reduce((sum, item) => sum + (item.stats?.likes || 0), 0);

    // Calculate engagement rate
    const engagementRate = totalViews > 0 ? ((totalLikes / totalViews) * 100).toFixed(2) : 0;

    // Content by status
    const publishedCount = allContent.filter(item => item.isPublished !== false).length;
    const draftCount = allContent.filter(item => item.isPublished === false).length;

    successResponse(res, {
      stats: {
        totalUploads,
        totalViews,
        totalLikes,
        engagementRate,
        published: publishedCount,
        drafts: draftCount,
        poems: poems.length,
        books: books.length,
        audio: audio.length,
        videos: videos.length
      },
      recentUploads: allContent
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 10)
        .map(item => ({
          id: item._id,
          title: item.title,
          type: item.constructor.modelName.toLowerCase(),
          views: item.stats?.views || 0,
          likes: item.stats?.likes || 0,
          createdAt: item.createdAt,
          isPublished: item.isPublished !== undefined ? item.isPublished : true
        })),
      recentNotifications: notifications,
      recentPlaylists: playlists
    });
  } catch (error) {
    next(error);
  }
};

// ============================================
// CONTENT MANAGEMENT
// ============================================

export const getCreatorContent = async (req, res, next) => {
  try {
    const { type, page = 1, limit = 20, sort = 'createdAt', order = 'desc', status, search } = req.query;
    const userId = req.user.id;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOrder = order === 'asc' ? 1 : -1;
    const sortField = sort === 'views' ? 'stats.views' : 
                     sort === 'likes' ? 'stats.likes' : 
                     sort === 'title' ? 'title' : 'createdAt';

    let content = [];
    let total = 0;

    const populateOptions = { path: 'author', select: 'name slug' };
    let query = { createdBy: userId };

    // Add status filter
    if (status === 'published') {
      query.isPublished = true;
    } else if (status === 'draft') {
      query.isPublished = false;
    } else if (status === 'premium') {
      query.isPremium = true;
    }

    // Add search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    switch (type) {
      case 'poems':
        [content, total] = await Promise.all([
          Poem.find(query)
            .populate(populateOptions)
            .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(parseInt(limit)),
          Poem.countDocuments(query)
        ]);
        break;
      case 'books':
        [content, total] = await Promise.all([
          Book.find(query)
            .populate(populateOptions)
            .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(parseInt(limit)),
          Book.countDocuments(query)
        ]);
        break;
      case 'audio':
        [content, total] = await Promise.all([
          Audio.find(query)
            .populate(populateOptions)
            .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(parseInt(limit)),
          Audio.countDocuments(query)
        ]);
        break;
      case 'videos':
        [content, total] = await Promise.all([
          Video.find(query)
            .populate(populateOptions)
            .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(parseInt(limit)),
          Video.countDocuments(query)
        ]);
        break;
      default:
        const [poems, books, audio, videos] = await Promise.all([
          Poem.find(query).populate(populateOptions),
          Book.find(query).populate(populateOptions),
          Audio.find(query).populate(populateOptions),
          Video.find(query).populate(populateOptions)
        ]);
        content = { poems, books, audio, videos };
        total = poems.length + books.length + audio.length + videos.length;
    }

    const response = Array.isArray(content) ? {
      content,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    } : content;

    successResponse(res, response);
  } catch (error) {
    next(error);
  }
};

// ============================================
// SINGLE CONTENT CRUD OPERATIONS
// ============================================

export const getContentById = async (req, res, next) => {
  try {
    const { type, id } = req.params;
    const userId = req.user.id;
    
    const Model = { poems: Poem, books: Book, audio: Audio, videos: Video }[type];
    if (!Model) {
      return errorResponse(res, 'Invalid content type', 400);
    }
    
    const content = await Model.findOne({ _id: id, createdBy: userId })
      .populate('author', 'name slug bio');
    
    if (!content) {
      return errorResponse(res, 'Content not found', 404);
    }
    
    successResponse(res, content);
  } catch (error) {
    next(error);
  }
};

export const updateContent = async (req, res, next) => {
  try {
    const { type, id } = req.params;
    const userId = req.user.id;
    const updateData = req.body;
    
    const Model = { poems: Poem, books: Book, audio: Audio, videos: Video }[type];
    if (!Model) {
      return errorResponse(res, 'Invalid content type', 400);
    }
    
    // Remove fields that shouldn't be updated
    delete updateData._id;
    delete updateData.createdBy;
    delete updateData.stats;
    delete updateData.__v;
    delete updateData.slug;
    
    updateData.updatedAt = Date.now();
    
    const content = await Model.findOneAndUpdate(
      { _id: id, createdBy: userId },
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!content) {
      return errorResponse(res, 'Content not found or unauthorized', 404);
    }
    
    successResponse(res, content, 'Content updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteContent = async (req, res, next) => {
  try {
    const { type, id } = req.params;
    const userId = req.user.id;
    
    const Model = { poems: Poem, books: Book, audio: Audio, videos: Video }[type];
    if (!Model) {
      return errorResponse(res, 'Invalid content type', 400);
    }
    
    const content = await Model.findOneAndDelete({ _id: id, createdBy: userId });
    
    if (!content) {
      return errorResponse(res, 'Content not found or unauthorized', 404);
    }
    
    successResponse(res, null, 'Content deleted successfully');
  } catch (error) {
    next(error);
  }
};

// ============================================
// STATISTICS
// ============================================

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

    // Calculate time-based stats (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentContent = allContent.filter(item => 
      new Date(item.createdAt) >= thirtyDaysAgo
    );

    // Calculate content by status
    const published = allContent.filter(item => item.isPublished !== false).length;
    const drafts = allContent.filter(item => item.isPublished === false).length;
    const premium = allContent.filter(item => item.isPremium).length;

    const stats = {
      totalContent: allContent.length,
      published,
      drafts,
      premium,
      totalViews: allContent.reduce((sum, item) => sum + (item.stats?.views || 0), 0),
      totalLikes: allContent.reduce((sum, item) => sum + (item.stats?.likes || 0), 0),
      totalBookmarks: allContent.reduce((sum, item) => sum + (item.stats?.bookmarks || 0), 0),
      totalComments: allContent.reduce((sum, item) => sum + (item.stats?.comments || 0), 0),
      totalDownloads: allContent.reduce((sum, item) => sum + (item.stats?.downloads || 0), 0),
      recentActivity: {
        contentAdded: recentContent.length,
        views: recentContent.reduce((sum, item) => sum + (item.stats?.views || 0), 0),
        likes: recentContent.reduce((sum, item) => sum + (item.stats?.likes || 0), 0)
      },
      contentBreakdown: {
        poems: { 
          count: poems.length, 
          views: poems.reduce((s, p) => s + (p.stats?.views || 0), 0),
          likes: poems.reduce((s, p) => s + (p.stats?.likes || 0), 0)
        },
        books: { 
          count: books.length, 
          views: books.reduce((s, b) => s + (b.stats?.views || 0), 0),
          likes: books.reduce((s, b) => s + (b.stats?.likes || 0), 0)
        },
        audio: { 
          count: audio.length, 
          views: audio.reduce((s, a) => s + (a.stats?.views || 0), 0),
          likes: audio.reduce((s, a) => s + (a.stats?.likes || 0), 0)
        },
        videos: { 
          count: videos.length, 
          views: videos.reduce((s, v) => s + (v.stats?.views || 0), 0),
          likes: videos.reduce((s, v) => s + (v.stats?.likes || 0), 0)
        }
      }
    };

    successResponse(res, stats);
  } catch (error) {
    next(error);
  }
};

// ============================================
// REVENUE & EARNINGS
// ============================================

export const getCreatorRevenue = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    // Get content stats for revenue calculation
    const [poems, books, audio, videos] = await Promise.all([
      Poem.find({ createdBy: userId }),
      Book.find({ createdBy: userId }),
      Audio.find({ createdBy: userId }),
      Video.find({ createdBy: userId })
    ]);

    const allContent = [...poems, ...books, ...audio, ...videos];
    const totalViews = allContent.reduce((sum, item) => sum + (item.stats?.views || 0), 0);
    const totalDownloads = allContent.reduce((sum, item) => sum + (item.stats?.downloads || 0), 0);

    // Calculate earnings (mock - replace with actual payment system)
    const adRevenue = totalViews * 0.001;
    const downloadRevenue = totalDownloads * 0.5;
    const subscriptionRevenue = allContent.filter(item => item.isPremium).length * 2.99;

    const revenue = {
      totalRevenue: adRevenue + downloadRevenue + subscriptionRevenue,
      pendingPayout: (adRevenue + downloadRevenue) * 0.7,
      lastPayout: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      nextPayout: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      monthlyBreakdown: generateMonthlyBreakdown(allContent),
      revenueSources: {
        subscriptions: subscriptionRevenue,
        downloads: downloadRevenue,
        ads: adRevenue
      },
      contentPerformance: allContent.slice(0, 5).map(item => ({
        title: item.title,
        type: item.constructor.modelName.toLowerCase(),
        earnings: ((item.stats?.views || 0) * 0.001) + ((item.stats?.downloads || 0) * 0.5)
      }))
    };

    successResponse(res, revenue);
  } catch (error) {
    next(error);
  }
};

// Helper function for monthly breakdown
const generateMonthlyBreakdown = (content) => {
  const monthlyData = {};
  const now = new Date();
  
  for (let i = 11; i >= 0; i--) {
    const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = month.toISOString().slice(0, 7);
    monthlyData[monthKey] = {
      month: monthKey,
      views: 0,
      earnings: 0
    };
  }

  content.forEach(item => {
    const monthKey = new Date(item.createdAt).toISOString().slice(0, 7);
    if (monthlyData[monthKey]) {
      monthlyData[monthKey].views += item.stats?.views || 0;
      monthlyData[monthKey].earnings += ((item.stats?.views || 0) * 0.001) + 
                                        ((item.stats?.downloads || 0) * 0.5);
    }
  });

  return Object.values(monthlyData);
};

// ============================================
// FOLLOWERS
// ============================================

export const getCreatorFollowers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const user = await User.findById(req.user.id)
      .populate({
        path: 'followers',
        select: 'name avatar username bio',
        options: {
          skip: (parseInt(page) - 1) * parseInt(limit),
          limit: parseInt(limit)
        }
      });

    const totalFollowers = user?.followers?.length || 0;

    successResponse(res, {
      followers: user?.followers || [],
      pagination: {
        total: totalFollowers,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(totalFollowers / parseInt(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

// ============================================
// ANALYTICS
// ============================================

export const getCreatorAnalytics = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { period = '30d' } = req.query;

    const days = parseInt(period) || 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const [poems, books, audio, videos] = await Promise.all([
      Poem.find({ createdBy: userId, createdAt: { $gte: startDate } })
        .sort({ createdAt: -1 }),
      Book.find({ createdBy: userId, createdAt: { $gte: startDate } })
        .sort({ createdAt: -1 }),
      Audio.find({ createdBy: userId, createdAt: { $gte: startDate } })
        .sort({ createdAt: -1 }),
      Video.find({ createdBy: userId, createdAt: { $gte: startDate } })
        .sort({ createdAt: -1 })
    ]);

    const allContent = [...poems, ...books, ...audio, ...videos];

    // Group by date for chart data
    const viewsByDate = {};
    const likesByDate = {};
    const contentByDate = {};

    allContent.forEach(item => {
      const date = item.createdAt.toISOString().split('T')[0];
      viewsByDate[date] = (viewsByDate[date] || 0) + (item.stats?.views || 0);
      likesByDate[date] = (likesByDate[date] || 0) + (item.stats?.likes || 0);
      contentByDate[date] = (contentByDate[date] || 0) + 1;
    });

    // Calculate growth rates
    const dates = Object.keys(viewsByDate).sort();
    const growthRate = dates.length > 1 ? 
      ((viewsByDate[dates[dates.length - 1]] - viewsByDate[dates[0]]) / (viewsByDate[dates[0]] || 1) * 100).toFixed(2) : 0;

    successResponse(res, {
      viewsByDate,
      likesByDate,
      contentByDate,
      period: days,
      summary: {
        totalContent: allContent.length,
        totalViews: Object.values(viewsByDate).reduce((a, b) => a + b, 0),
        totalLikes: Object.values(likesByDate).reduce((a, b) => a + b, 0),
        growthRate: growthRate || 0,
        averageViewsPerContent: allContent.length > 0 ? 
          (Object.values(viewsByDate).reduce((a, b) => a + b, 0) / allContent.length).toFixed(2) : 0
      },
      topContent: allContent
        .sort((a, b) => (b.stats?.views || 0) - (a.stats?.views || 0))
        .slice(0, 10)
        .map(item => ({
          id: item._id,
          title: item.title,
          type: item.constructor.modelName.toLowerCase(),
          views: item.stats?.views || 0,
          likes: item.stats?.likes || 0,
          engagement: item.stats?.views > 0 ? 
            ((item.stats?.likes || 0) / item.stats?.views * 100).toFixed(2) : 0
        }))
    });
  } catch (error) {
    next(error);
  }
};

// ============================================
// UPLOAD STATUS
// ============================================

export const getUploadStatus = async (req, res, next) => {
  try {
    const uploads = await getUploadQueueStatus(req.user.id);
    
    successResponse(res, {
      pending: uploads?.pending || [],
      processing: uploads?.processing || [],
      completed: uploads?.completed || [],
      failed: uploads?.failed || [],
      summary: {
        total: (uploads?.pending?.length || 0) + (uploads?.processing?.length || 0) + 
               (uploads?.completed?.length || 0) + (uploads?.failed?.length || 0),
        pending: uploads?.pending?.length || 0,
        processing: uploads?.processing?.length || 0,
        completed: uploads?.completed?.length || 0,
        failed: uploads?.failed?.length || 0
      }
    });
  } catch (error) {
    next(error);
  }
};

// Placeholder function - replace with actual queue implementation
const getUploadQueueStatus = async (userId) => {
  return {
    pending: [],
    processing: [],
    completed: [],
    failed: []
  };
};

// ============================================
// PROFILE UPDATE
// ============================================

export const updateCreatorProfile = async (req, res, next) => {
  try {
    const { bio, socialLinks, displayName, avatar, email, username } = req.body;
    
    const updateData = {};
    if (bio !== undefined) updateData.bio = bio;
    if (displayName !== undefined) updateData.displayName = displayName;
    if (avatar !== undefined) updateData.avatar = avatar;
    if (socialLinks !== undefined) updateData.socialLinks = socialLinks;
    if (email !== undefined) updateData.email = email;
    if (username !== undefined) updateData.username = username;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password -__v');

    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    successResponse(res, user, 'Creator profile updated successfully');
  } catch (error) {
    next(error);
  }
};

export const getCreatorProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password -__v')
      .populate('followers', 'name avatar username');

    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    successResponse(res, user);
  } catch (error) {
    next(error);
  }
};

// ============================================
// CONTENT TYPE SPECIFIC METHODS
// ============================================

export const getCreatorPoems = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const query = { createdBy: req.user.id };
    if (status === 'published') query.isPublished = true;
    else if (status === 'draft') query.isPublished = false;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    
    const [poems, total] = await Promise.all([
      Poem.find(query)
        .populate('author', 'name slug')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Poem.countDocuments(query)
    ]);

    successResponse(res, {
      poems,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getCreatorBooks = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const query = { createdBy: req.user.id };
    if (status === 'published') query.isPublished = true;
    else if (status === 'draft') query.isPublished = false;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const [books, total] = await Promise.all([
      Book.find(query)
        .populate('author', 'name slug')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Book.countDocuments(query)
    ]);

    successResponse(res, {
      books,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getCreatorAudio = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, search, type } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const query = { createdBy: req.user.id };
    if (status === 'published') query.isPublished = true;
    else if (status === 'draft') query.isPublished = false;
    if (type) query.type = type;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const [audio, total] = await Promise.all([
      Audio.find(query)
        .populate('author', 'name slug')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Audio.countDocuments(query)
    ]);

    successResponse(res, {
      audio,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getCreatorVideos = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, search, category } = req.query;
    const query = { createdBy: req.user.id };
    
    if (status === 'published') query.isPublished = true;
    else if (status === 'draft') query.isPublished = false;
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [videos, total] = await Promise.all([
      Video.find(query)
        .populate('author', 'name slug')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Video.countDocuments(query)
    ]);

    successResponse(res, {
      videos,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

// ============================================
// BULK OPERATIONS
// ============================================

export const bulkDeleteContent = async (req, res, next) => {
  try {
    const { ids, type } = req.body;
    const userId = req.user.id;
    
    if (!ids || !ids.length) {
      return errorResponse(res, 'No IDs provided', 400);
    }
    
    if (!type || !['poems', 'books', 'audio', 'videos'].includes(type)) {
      return errorResponse(res, 'Valid content type is required', 400);
    }
    
    let result;
    const Model = { poems: Poem, books: Book, audio: Audio, videos: Video }[type];
    
    result = await Model.deleteMany({ _id: { $in: ids }, createdBy: userId });
    
    successResponse(res, { 
      deletedCount: result.deletedCount,
      ids 
    }, `${result.deletedCount} item(s) deleted successfully`);
  } catch (error) {
    next(error);
  }
};

export const bulkUpdateStatus = async (req, res, next) => {
  try {
    const { ids, type, status } = req.body;
    const userId = req.user.id;
    
    if (!ids || !ids.length) {
      return errorResponse(res, 'No IDs provided', 400);
    }
    
    if (!type || !['poems', 'books', 'audio', 'videos'].includes(type)) {
      return errorResponse(res, 'Valid content type is required', 400);
    }
    
    if (!status || !['published', 'draft', 'archived'].includes(status)) {
      return errorResponse(res, 'Valid status is required (published, draft, archived)', 400);
    }
    
    const updateData = { 
      status, 
      updatedAt: Date.now(),
      ...(status === 'published' ? { publishedAt: Date.now(), isPublished: true } : {}),
      ...(status === 'draft' ? { isPublished: false } : {})
    };
    
    const Model = { poems: Poem, books: Book, audio: Audio, videos: Video }[type];
    const result = await Model.updateMany(
      { _id: { $in: ids }, createdBy: userId }, 
      updateData
    );
    
    successResponse(res, { 
      modifiedCount: result.modifiedCount,
      ids,
      status
    }, `Status updated for ${result.modifiedCount} item(s)`);
  } catch (error) {
    next(error);
  }
};

// ============================================
// ADVANCED ANALYTICS
// ============================================

export const getContentAnalytics = async (req, res, next) => {
  try {
    const { startDate, endDate, type } = req.query;
    const userId = req.user.id;
    
    let query = { createdBy: userId };
    if (startDate && endDate) {
      query.createdAt = { 
        $gte: new Date(startDate), 
        $lte: new Date(endDate) 
      };
    }
    
    let content = [];
    switch (type) {
      case 'poems':
        content = await Poem.find(query);
        break;
      case 'books':
        content = await Book.find(query);
        break;
      case 'audio':
        content = await Audio.find(query);
        break;
      case 'videos':
        content = await Video.find(query);
        break;
      default:
        const [poems, books, audio, videos] = await Promise.all([
          Poem.find(query),
          Book.find(query),
          Audio.find(query),
          Video.find(query)
        ]);
        content = [...poems, ...books, ...audio, ...videos];
    }
    
    const totalViews = content.reduce((sum, item) => sum + (item.stats?.views || 0), 0);
    const totalLikes = content.reduce((sum, item) => sum + (item.stats?.likes || 0), 0);
    const totalComments = content.reduce((sum, item) => sum + (item.stats?.comments || 0), 0);
    const totalBookmarks = content.reduce((sum, item) => sum + (item.stats?.bookmarks || 0), 0);
    const totalDownloads = content.reduce((sum, item) => sum + (item.stats?.downloads || 0), 0);
    
    const analytics = {
      period: {
        startDate: startDate || null,
        endDate: endDate || null
      },
      totalContent: content.length,
      totalViews,
      totalLikes,
      totalComments,
      totalBookmarks,
      totalDownloads,
      engagement: {
        likeRate: totalViews > 0 ? ((totalLikes / totalViews) * 100).toFixed(2) : 0,
        commentRate: totalViews > 0 ? ((totalComments / totalViews) * 100).toFixed(2) : 0,
        bookmarkRate: totalViews > 0 ? ((totalBookmarks / totalViews) * 100).toFixed(2) : 0
      },
      averages: {
        viewsPerContent: content.length > 0 ? (totalViews / content.length).toFixed(2) : 0,
        likesPerContent: content.length > 0 ? (totalLikes / content.length).toFixed(2) : 0,
        commentsPerContent: content.length > 0 ? (totalComments / content.length).toFixed(2) : 0
      }
    };
    
    successResponse(res, analytics);
  } catch (error) {
    next(error);
  }
};

export const getTopContent = async (req, res, next) => {
  try {
    const { limit = 10, type, sortBy = 'views', timeRange = 'all' } = req.query;
    const userId = req.user.id;
    
    const sortField = sortBy === 'likes' ? 'stats.likes' : 
                     sortBy === 'comments' ? 'stats.comments' : 'stats.views';
    
    let dateFilter = {};
    if (timeRange !== 'all') {
      const days = parseInt(timeRange) || 30;
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      dateFilter.createdAt = { $gte: startDate };
    }
    
    let content = [];
    let total = 0;
    
    const populateOptions = { path: 'author', select: 'name slug' };
    
    switch (type) {
      case 'poems':
        [content, total] = await Promise.all([
          Poem.find({ createdBy: userId, ...dateFilter })
            .populate(populateOptions)
            .sort({ [sortField]: -1 })
            .limit(parseInt(limit)),
          Poem.countDocuments({ createdBy: userId, ...dateFilter })
        ]);
        break;
      case 'books':
        [content, total] = await Promise.all([
          Book.find({ createdBy: userId, ...dateFilter })
            .populate(populateOptions)
            .sort({ [sortField]: -1 })
            .limit(parseInt(limit)),
          Book.countDocuments({ createdBy: userId, ...dateFilter })
        ]);
        break;
      case 'audio':
        [content, total] = await Promise.all([
          Audio.find({ createdBy: userId, ...dateFilter })
            .populate(populateOptions)
            .sort({ [sortField]: -1 })
            .limit(parseInt(limit)),
          Audio.countDocuments({ createdBy: userId, ...dateFilter })
        ]);
        break;
      case 'videos':
        [content, total] = await Promise.all([
          Video.find({ createdBy: userId, ...dateFilter })
            .populate(populateOptions)
            .sort({ [sortField]: -1 })
            .limit(parseInt(limit)),
          Video.countDocuments({ createdBy: userId, ...dateFilter })
        ]);
        break;
      default:
        const [poems, books, audio, videos] = await Promise.all([
          Poem.find({ createdBy: userId, ...dateFilter }).populate(populateOptions),
          Book.find({ createdBy: userId, ...dateFilter }).populate(populateOptions),
          Audio.find({ createdBy: userId, ...dateFilter }).populate(populateOptions),
          Video.find({ createdBy: userId, ...dateFilter }).populate(populateOptions)
        ]);
        content = [...poems, ...books, ...audio, ...videos]
          .sort((a, b) => (b.stats?.[sortBy] || 0) - (a.stats?.[sortBy] || 0))
          .slice(0, parseInt(limit));
        total = content.length;
    }
    
    successResponse(res, {
      content: content.map(item => ({
        id: item._id,
        title: item.title,
        slug: item.slug,
        type: item.constructor.modelName.toLowerCase(),
        views: item.stats?.views || 0,
        likes: item.stats?.likes || 0,
        comments: item.stats?.comments || 0,
        bookmarks: item.stats?.bookmarks || 0,
        downloads: item.stats?.downloads || 0,
        engagement: item.stats?.views > 0 ? 
          (((item.stats?.likes || 0) + (item.stats?.comments || 0)) / item.stats?.views * 100).toFixed(2) : 0,
        createdAt: item.createdAt,
        author: item.author ? { 
          name: item.author.name, 
          slug: item.author.slug 
        } : null
      })),
      pagination: {
        total,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// ============================================
// EARNING REPORTS
// ============================================

export const getEarningReports = async (req, res, next) => {
  try {
    const { year, month, period = 'monthly' } = req.query;
    const userId = req.user.id;
    
    const [poems, books, audio, videos] = await Promise.all([
      Poem.find({ createdBy: userId }),
      Book.find({ createdBy: userId }),
      Audio.find({ createdBy: userId }),
      Video.find({ createdBy: userId })
    ]);
    
    const allContent = [...poems, ...books, ...audio, ...videos];
    const totalViews = allContent.reduce((sum, item) => sum + (item.stats?.views || 0), 0);
    const totalDownloads = allContent.reduce((sum, item) => sum + (item.stats?.downloads || 0), 0);
    const premiumContent = allContent.filter(item => item.isPremium).length;
    
    const adRevenue = totalViews * 0.001;
    const downloadRevenue = totalDownloads * 0.5;
    const subscriptionRevenue = premiumContent * 2.99;
    
    const breakdownByType = {
      poems: {
        count: poems.length,
        views: poems.reduce((s, p) => s + (p.stats?.views || 0), 0),
        downloads: poems.reduce((s, p) => s + (p.stats?.downloads || 0), 0),
        earnings: poems.reduce((s, p) => s + ((p.stats?.views || 0) * 0.001 + (p.stats?.downloads || 0) * 0.5), 0)
      },
      books: {
        count: books.length,
        views: books.reduce((s, b) => s + (b.stats?.views || 0), 0),
        downloads: books.reduce((s, b) => s + (b.stats?.downloads || 0), 0),
        earnings: books.reduce((s, b) => s + ((b.stats?.views || 0) * 0.001 + (b.stats?.downloads || 0) * 0.5), 0)
      },
      audio: {
        count: audio.length,
        views: audio.reduce((s, a) => s + (a.stats?.views || 0), 0),
        downloads: audio.reduce((s, a) => s + (a.stats?.downloads || 0), 0),
        earnings: audio.reduce((s, a) => s + ((a.stats?.views || 0) * 0.001 + (a.stats?.downloads || 0) * 0.5), 0)
      },
      videos: {
        count: videos.length,
        views: videos.reduce((s, v) => s + (v.stats?.views || 0), 0),
        downloads: videos.reduce((s, v) => s + (v.stats?.downloads || 0), 0),
        earnings: videos.reduce((s, v) => s + ((v.stats?.views || 0) * 0.001 + (v.stats?.downloads || 0) * 0.5), 0)
      }
    };
    
    const reports = {
      summary: {
        totalEarnings: adRevenue + downloadRevenue + subscriptionRevenue,
        adRevenue,
        downloadRevenue,
        subscriptionRevenue,
        totalViews,
        totalDownloads,
        totalContent: allContent.length,
        premiumContent,
        averageEarningPerContent: allContent.length > 0 ? 
          ((adRevenue + downloadRevenue + subscriptionRevenue) / allContent.length).toFixed(2) : 0
      },
      breakdownByType,
      topEarningContent: allContent
        .sort((a, b) => ((b.stats?.views || 0) * 0.001 + (b.stats?.downloads || 0) * 0.5) - 
                         ((a.stats?.views || 0) * 0.001 + (a.stats?.downloads || 0) * 0.5))
        .slice(0, 10)
        .map(item => ({
          id: item._id,
          title: item.title,
          type: item.constructor.modelName.toLowerCase(),
          views: item.stats?.views || 0,
          downloads: item.stats?.downloads || 0,
          earnings: ((item.stats?.views || 0) * 0.001) + ((item.stats?.downloads || 0) * 0.5),
          isPremium: item.isPremium || false
        })),
      monthlyBreakdown: generateMonthlyBreakdown(allContent)
    };
    
    successResponse(res, reports);
  } catch (error) {
    next(error);
  }
};

// ============================================
// UPLOAD PRESETS
// ============================================

export const getUploadPresets = async (req, res, next) => {
  try {
    const presets = {
      poetry: {
        genres: ['Ghazal', 'Nazm', 'Sher', 'Rubai', 'Qita', 'Marsiya', 'Qawwali', 'Hamd', 'Naat', 'Manqabat', 'Doha', 'Geet', 'Song', 'Other'],
        statuses: ['published', 'draft'],
        languages: ['urdu', 'hindi', 'english']
      },
      audio: {
        types: ['Recitation', 'Naat', 'Hamd', 'Qawwali', 'Podcast', 'Interview', 'Lecture', 'Other'],
        occasions: ['Ramadan', 'Eid', 'Muharram', 'Milad', 'Wedding', 'Funeral', 'Other'],
        languages: ['urdu', 'hindi', 'english']
      },
      video: {
        categories: ['Mushaira', 'Podcast', 'Documentary', 'Interview', 'Lecture', 'Performance', 'Other'],
        languages: ['urdu', 'hindi', 'english'],
        visibility: ['public', 'private', 'unlisted']
      },
      book: {
        formats: ['PDF', 'EPUB', 'MOBI'],
        genres: ['Poetry Collection', 'Novel', 'Short Stories', 'Essay', 'Biography', 'Other'],
        languages: ['urdu', 'hindi', 'english']
      },
      general: {
        visibility: ['public', 'private', 'unlisted'],
        statuses: ['published', 'draft', 'archived'],
        languages: ['urdu', 'hindi', 'english', 'other']
      }
    };
    
    successResponse(res, presets);
  } catch (error) {
    next(error);
  }
};

// ============================================
// FILE VALIDATION
// ============================================

export const validateFile = async (req, res, next) => {
  try {
    const { fileType, fileSize, mimeType, fileName } = req.body;
    
    const maxSizes = {
      image: 5 * 1024 * 1024,
      audio: 50 * 1024 * 1024,
      video: 500 * 1024 * 1024,
      pdf: 20 * 1024 * 1024,
      document: 10 * 1024 * 1024
    };
    
    const allowedMimeTypes = {
      image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
      audio: ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/m4a', 'audio/aac'],
      video: ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm', 'video/mkv'],
      pdf: ['application/pdf'],
      document: ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    };
    
    const dangerousExtensions = ['.exe', '.bat', '.sh', '.js', '.jar', '.apk', '.msi'];
    const hasDangerousExt = dangerousExtensions.some(ext => 
      fileName?.toLowerCase().endsWith(ext)
    );
    
    let isValid = true;
    let message = 'File is valid';
    
    if (!fileType || !maxSizes[fileType]) {
      isValid = false;
      message = `Invalid file type. Allowed types: ${Object.keys(maxSizes).join(', ')}`;
    }
    
    if (isValid && maxSizes[fileType] && fileSize > maxSizes[fileType]) {
      isValid = false;
      message = `File size exceeds maximum allowed (${(maxSizes[fileType] / (1024 * 1024)).toFixed(1)}MB)`;
    }
    
    if (isValid && allowedMimeTypes[fileType] && !allowedMimeTypes[fileType].includes(mimeType)) {
      isValid = false;
      message = `Invalid file format. Allowed: ${allowedMimeTypes[fileType].join(', ')}`;
    }
    
    if (isValid && hasDangerousExt) {
      isValid = false;
      message = 'File type not allowed for security reasons';
    }
    
    successResponse(res, { 
      isValid, 
      message, 
      maxSize: maxSizes[fileType] || 0,
      allowedTypes: allowedMimeTypes[fileType] || [],
      fileType: isValid ? fileType : null
    });
  } catch (error) {
    next(error);
  }
};

// ============================================
// AUDIO ANALYTICS
// ============================================

export const getAudioAnalytics = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { period = '30d' } = req.query;
    
    const days = parseInt(period) || 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const audioFiles = await Audio.find({ 
      createdBy: userId,
      createdAt: { $gte: startDate }
    });
    
    const totalAudio = audioFiles.length;
    const totalPlays = audioFiles.reduce((sum, a) => sum + (a.stats?.plays || 0), 0);
    const totalLikes = audioFiles.reduce((sum, a) => sum + (a.stats?.likes || 0), 0);
    const totalDownloads = audioFiles.reduce((sum, a) => sum + (a.stats?.downloads || 0), 0);
    const totalListenTime = audioFiles.reduce((sum, a) => sum + (a.stats?.listenTime || 0), 0);
    
    const topAudio = audioFiles
      .sort((a, b) => (b.stats?.plays || 0) - (a.stats?.plays || 0))
      .slice(0, 10)
      .map(a => ({
        id: a._id,
        title: a.title,
        type: a.type,
        plays: a.stats?.plays || 0,
        likes: a.stats?.likes || 0,
        duration: a.duration
      }));
    
    const dailyPlays = {};
    audioFiles.forEach(a => {
      const date = a.createdAt.toISOString().split('T')[0];
      dailyPlays[date] = (dailyPlays[date] || 0) + (a.stats?.plays || 0);
    });
    
    successResponse(res, {
      summary: {
        totalAudio,
        totalPlays,
        totalLikes,
        totalDownloads,
        totalListenTime: formatDuration(totalListenTime),
        averagePlaysPerAudio: totalAudio > 0 ? (totalPlays / totalAudio).toFixed(2) : 0
      },
      topAudio,
      dailyPlays,
      engagement: {
        likeRate: totalPlays > 0 ? ((totalLikes / totalPlays) * 100).toFixed(2) : 0,
        downloadRate: totalPlays > 0 ? ((totalDownloads / totalPlays) * 100).toFixed(2) : 0
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getAudioAnalyticsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const audio = await Audio.findOne({ _id: id, createdBy: userId });
    
    if (!audio) {
      return errorResponse(res, 'Audio not found', 404);
    }
    
    // Get daily plays for this audio
    const dailyPlays = [];
    const now = new Date();
    for (let i = 30; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      dailyPlays.push({
        date: date.toISOString().split('T')[0],
        plays: Math.floor(Math.random() * 50) // Replace with actual data
      });
    }
    
    successResponse(res, {
      audio: {
        id: audio._id,
        title: audio.title,
        type: audio.type,
        duration: audio.duration,
        stats: audio.stats || {}
      },
      dailyPlays,
      engagement: {
        likeRate: audio.stats?.plays > 0 ? 
          ((audio.stats?.likes || 0) / audio.stats?.plays * 100).toFixed(2) : 0,
        downloadRate: audio.stats?.plays > 0 ? 
          ((audio.stats?.downloads || 0) / audio.stats?.plays * 100).toFixed(2) : 0
      }
    });
  } catch (error) {
    next(error);
  }
};

// Helper function for formatting duration
const formatDuration = (seconds) => {
  if (!seconds) return '0s';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  if (hours > 0) return `${hours}h ${minutes}m ${secs}s`;
  if (minutes > 0) return `${minutes}m ${secs}s`;
  return `${secs}s`;
};

// ============================================
// EXPORT ALL FUNCTIONS
// ============================================

export default {
  // Dashboard
  getCreatorDashboard,
  getCreatorStats,
  getCreatorRevenue,
  getCreatorFollowers,
  getCreatorAnalytics,
  getUploadStatus,
  
  // Profile
  updateCreatorProfile,
  getCreatorProfile,
  
  // Content Management
  getCreatorContent,
  getContentById,
  updateContent,
  deleteContent,
  getCreatorPoems,
  getCreatorBooks,
  getCreatorAudio,
  getCreatorVideos,
  bulkDeleteContent,
  bulkUpdateStatus,
  
  // Analytics
  getContentAnalytics,
  getTopContent,
  getEarningReports,
  
  // Audio Analytics
  getAudioAnalytics,
  getAudioAnalyticsById,
  
  // Upload
  getUploadPresets,
  validateFile
};