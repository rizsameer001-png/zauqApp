// ////server/controllers/notification.controller.js

// import Notification from '../models/Notification.js';
// import User from '../models/User.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination } from '../utils/pagination.js';

// export const getNotifications = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);

//     const notifications = await Notification.find({ recipient: req.user.id })
//       .populate('data.sender', 'name avatar')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     const total = await Notification.countDocuments({ recipient: req.user.id });
//     paginatedResponse(res, notifications, { page, limit, total });
//   } catch (error) {
//     next(error);
//   }
// };

// export const markAsRead = async (req, res, next) => {
//   try {
//     await Notification.findByIdAndUpdate(req.params.id, {
//       isRead: true,
//       readAt: new Date()
//     });
//     successResponse(res, null, 'Marked as read');
//   } catch (error) {
//     next(error);
//   }
// };

// export const markAllAsRead = async (req, res, next) => {
//   try {
//     await Notification.updateMany(
//       { recipient: req.user.id, isRead: false },
//       { isRead: true, readAt: new Date() }
//     );
//     successResponse(res, null, 'All marked as read');
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteNotification = async (req, res, next) => {
//   try {
//     await Notification.findByIdAndDelete(req.params.id);
//     successResponse(res, null, 'Notification deleted');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getUnreadCount = async (req, res, next) => {
//   try {
//     const count = await Notification.countDocuments({
//       recipient: req.user.id,
//       isRead: false
//     });
//     successResponse(res, { count });
//   } catch (error) {
//     next(error);
//   }
// };

// export const updatePreferences = async (req, res, next) => {
//   try {
//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       { 'preferences.notifications': req.body.enabled },
//       { new: true }
//     );
//     successResponse(res, user.preferences, 'Preferences updated');
//   } catch (error) {
//     next(error);
//   }
// };

// export const createNotification = async (recipientId, type, title, message, data = {}) => {
//   try {
//     await Notification.create({
//       recipient: recipientId,
//       type,
//       title,
//       message,
//       data
//     });
//     return true;
//   } catch (error) {
//     console.error('Notification creation failed:', error);
//     return false;
//   }
// };









// // server/controllers/notification.controller.js
// import Notification from '../models/Notification.js';
// import User from '../models/User.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination } from '../utils/pagination.js';

// export const getNotifications = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);

//     const notifications = await Notification.find({ recipient: req.user.id })
//       .populate('data.sender', 'name avatar')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     const total = await Notification.countDocuments({ recipient: req.user.id });
//     paginatedResponse(res, notifications, { page, limit, total });
//   } catch (error) {
//     next(error);
//   }
// };

// export const markAsRead = async (req, res, next) => {
//   try {
//     await Notification.findByIdAndUpdate(req.params.id, {
//       isRead: true,
//       readAt: new Date()
//     });
//     successResponse(res, null, 'Marked as read');
//   } catch (error) {
//     next(error);
//   }
// };

// export const markAllAsRead = async (req, res, next) => {
//   try {
//     await Notification.updateMany(
//       { recipient: req.user.id, isRead: false },
//       { isRead: true, readAt: new Date() }
//     );
//     successResponse(res, null, 'All marked as read');
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteNotification = async (req, res, next) => {
//   try {
//     await Notification.findByIdAndDelete(req.params.id);
//     successResponse(res, null, 'Notification deleted');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getUnreadCount = async (req, res, next) => {
//   try {
//     const count = await Notification.countDocuments({
//       recipient: req.user.id,
//       isRead: false
//     });
//     successResponse(res, { count });
//   } catch (error) {
//     next(error);
//   }
// };

// export const updatePreferences = async (req, res, next) => {
//   try {
//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       { 'preferences.notifications': req.body.enabled },
//       { new: true }
//     );
//     successResponse(res, user.preferences, 'Preferences updated');
//   } catch (error) {
//     next(error);
//   }
// };

// export const createNotification = async (recipientId, type, title, message, data = {}) => {
//   try {
//     await Notification.create({
//       recipient: recipientId,
//       type,
//       title,
//       message,
//       data
//     });
//     return true;
//   } catch (error) {
//     console.error('Notification creation failed:', error);
//     return false;
//   }
// };

// // ============================================
// // ADMIN: Send notification to all users
// // ============================================
// export const sendToAllUsers = async (req, res, next) => {
//   try {
//     const { title, message, type, sendTo, scheduleDate, priority, imageUrl, actionUrl } = req.body;
    
//     // Check if admin
//     if (req.user.role !== 'admin') {
//       return errorResponse(res, 'Unauthorized. Admin access required.', 403);
//     }
    
//     // Build user filter based on sendTo parameter
//     let userFilter = { isActive: true };
    
//     switch (sendTo) {
//       case 'premium':
//         userFilter = { ...userFilter, 'subscription.plan': { $nin: ['free', null] } };
//         break;
//       case 'free':
//         userFilter = { ...userFilter, 'subscription.plan': 'free' };
//         break;
//       case 'active':
//         userFilter = { ...userFilter, lastLogin: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } };
//         break;
//       case 'all':
//       default:
//         userFilter = { isActive: true };
//         break;
//     }
    
//     // Get all users matching the filter
//     const users = await User.find(userFilter).select('_id');
    
//     if (users.length === 0) {
//       return errorResponse(res, 'No users found matching the criteria', 404);
//     }
    
//     // Prepare notification data
//     const notificationData = {
//       type: type || 'announcement',
//       title,
//       message,
//       data: {
//         contentType: 'announcement',
//         priority: priority || 'normal',
//         imageUrl: imageUrl || null,
//         actionUrl: actionUrl || null,
//         sender: req.user.id
//       }
//     };
    
//     // Create notifications for all users
//     const notifications = users.map(user => ({
//       recipient: user._id,
//       ...notificationData,
//       createdAt: scheduleDate ? new Date(scheduleDate) : new Date(),
//       isRead: false
//     }));
    
//     // Insert in batches to avoid memory issues
//     const batchSize = 500;
//     let insertedCount = 0;
    
//     for (let i = 0; i < notifications.length; i += batchSize) {
//       const batch = notifications.slice(i, i + batchSize);
//       await Notification.insertMany(batch);
//       insertedCount += batch.length;
//     }
    
//     // Store global notice for homepage
//     const globalNotice = {
//       title,
//       message,
//       type: type || 'announcement',
//       priority: priority || 'normal',
//       createdAt: new Date().toISOString(),
//       imageUrl,
//       actionUrl
//     };
    
//     // You can store in Redis or a separate collection
//     // For now, we'll store in a cache or a separate model
//     try {
//       await GlobalNotice.findOneAndUpdate(
//         { active: true },
//         { ...globalNotice, active: true, updatedAt: new Date() },
//         { upsert: true, new: true }
//       );
//     } catch (err) {
//       console.error('Failed to save global notice:', err);
//     }
    
//     successResponse(res, { 
//       sentCount: insertedCount,
//       totalUsers: users.length,
//       message: `Notification sent to ${insertedCount} users`
//     }, 'Notification sent successfully');
    
//   } catch (error) {
//     console.error('Error sending to all users:', error);
//     next(error);
//   }
// };

// // ============================================
// // ADMIN: Get notification analytics
// // ============================================
// export const getNotificationAnalytics = async (req, res, next) => {
//   try {
//     if (req.user.role !== 'admin') {
//       return errorResponse(res, 'Unauthorized. Admin access required.', 403);
//     }
    
//     const totalSent = await Notification.countDocuments();
//     const totalRead = await Notification.countDocuments({ isRead: true });
//     const unread = await Notification.countDocuments({ isRead: false });
    
//     // Notifications by type
//     const byType = await Notification.aggregate([
//       { $group: { _id: '$type', count: { $sum: 1 } } }
//     ]);
    
//     // Notifications by date (last 30 days)
//     const thirtyDaysAgo = new Date();
//     thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
//     const byDate = await Notification.aggregate([
//       { $match: { createdAt: { $gte: thirtyDaysAgo } } },
//       { $group: {
//         _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
//         count: { $sum: 1 },
//         read: { $sum: { $cond: ['$isRead', 1, 0] } }
//       }},
//       { $sort: { _id: 1 } }
//     ]);
    
//     successResponse(res, {
//       totalSent,
//       totalRead,
//       unread,
//       readRate: totalSent > 0 ? ((totalRead / totalSent) * 100).toFixed(2) : 0,
//       byType,
//       byDate
//     });
//   } catch (error) {
//     console.error('Error getting notification analytics:', error);
//     next(error);
//   }
// };

// // ============================================
// // ADMIN: Get global active notice
// // ============================================
// export const getGlobalNotice = async (req, res, next) => {
//   try {
//     // Try to get from GlobalNotice model if exists
//     // For now, return last announcement notification
//     const lastAnnouncement = await Notification.findOne({ type: 'announcement' })
//       .sort({ createdAt: -1 })
//       .limit(1);
    
//     if (lastAnnouncement && lastAnnouncement.createdAt > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
//       successResponse(res, {
//         title: lastAnnouncement.title,
//         message: lastAnnouncement.message,
//         type: lastAnnouncement.type,
//         createdAt: lastAnnouncement.createdAt
//       });
//     } else {
//       successResponse(res, null, 'No active notice');
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // ADMIN: Dismiss global notice for user
// // ============================================
// export const dismissGlobalNotice = async (req, res, next) => {
//   try {
//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       { 'preferences.lastNoticeDismissed': new Date() },
//       { new: true }
//     );
//     successResponse(res, null, 'Notice dismissed');
//   } catch (error) {
//     next(error);
//   }
// };















// server/controllers/notification.controller.js
import Notification from '../models/Notification.js';
import User from '../models/User.js';
import GlobalNotice from '../models/GlobalNotice.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
import { getPagination } from '../utils/pagination.js';

// ============================================
// EXISTING USER FUNCTIONS (keep as is)
// ============================================

export const getNotifications = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req);

    const notifications = await Notification.find({ recipient: req.user.id })
      .populate('data.sender', 'name avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Notification.countDocuments({ recipient: req.user.id });
    paginatedResponse(res, notifications, { page, limit, total });
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, {
      isRead: true,
      readAt: new Date()
    });
    successResponse(res, null, 'Marked as read');
  } catch (error) {
    next(error);
  }
};

export const markAllAsRead = async (req, res, next) => {
  try {
    await Notification.updateMany(
      { recipient: req.user.id, isRead: false },
      { isRead: true, readAt: new Date() }
    );
    successResponse(res, null, 'All marked as read');
  } catch (error) {
    next(error);
  }
};

export const deleteNotification = async (req, res, next) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    successResponse(res, null, 'Notification deleted');
  } catch (error) {
    next(error);
  }
};

export const getUnreadCount = async (req, res, next) => {
  try {
    const count = await Notification.countDocuments({
      recipient: req.user.id,
      isRead: false
    });
    successResponse(res, { count });
  } catch (error) {
    next(error);
  }
};

export const updatePreferences = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { 'preferences.notifications': req.body.enabled },
      { new: true }
    );
    successResponse(res, user.preferences, 'Preferences updated');
  } catch (error) {
    next(error);
  }
};

export const createNotification = async (recipientId, type, title, message, data = {}) => {
  try {
    await Notification.create({
      recipient: recipientId,
      type,
      title,
      message,
      data
    });
    return true;
  } catch (error) {
    console.error('Notification creation failed:', error);
    return false;
  }
};

// ============================================
// ADMIN: CRUD OPERATIONS FOR NOTIFICATIONS
// ============================================

// GET all notifications (admin view - see all system notifications)
export const adminGetAllNotifications = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const { type, status, search, startDate, endDate } = req.query;

    let query = {};
    
    if (type && type !== 'all') {
      query.type = type;
    }
    
    if (status === 'read') {
      query.isRead = true;
    } else if (status === 'unread') {
      query.isRead = false;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const notifications = await Notification.find(query)
      .populate('recipient', 'name email avatar')
      .populate('data.sender', 'name avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Notification.countDocuments(query);
    
    // Get statistics
    const stats = {
      total: await Notification.countDocuments(),
      read: await Notification.countDocuments({ isRead: true }),
      unread: await Notification.countDocuments({ isRead: false }),
      byType: await Notification.aggregate([
        { $group: { _id: '$type', count: { $sum: 1 } } }
      ])
    };
    
    paginatedResponse(res, notifications, { page, limit, total, stats });
  } catch (error) {
    console.error('Error in adminGetAllNotifications:', error);
    next(error);
  }
};

// GET single notification by ID (admin)
export const adminGetNotificationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const notification = await Notification.findById(id)
      .populate('recipient', 'name email avatar')
      .populate('data.sender', 'name avatar');
    
    if (!notification) {
      return errorResponse(res, 'Notification not found', 404);
    }
    
    successResponse(res, notification);
  } catch (error) {
    console.error('Error in adminGetNotificationById:', error);
    next(error);
  }
};

// CREATE notification (admin)
export const adminCreateNotification = async (req, res, next) => {
  try {
    const { 
      title, 
      message, 
      type, 
      sendTo, 
      scheduleDate, 
      priority, 
      imageUrl, 
      actionUrl,
      expiresAt
    } = req.body;
    
    if (!title || !message) {
      return errorResponse(res, 'Title and message are required', 400);
    }
    
    let recipients = [];
    
    // Determine recipients based on sendTo parameter
    if (sendTo === 'specific_user' && req.body.userId) {
      const user = await User.findById(req.body.userId);
      if (user) recipients = [user];
    } else if (sendTo === 'specific_role' && req.body.role) {
      recipients = await User.find({ role: req.body.role, isActive: true });
    } else if (sendTo === 'premium') {
      recipients = await User.find({ 'subscription.plan': { $ne: 'free' }, isActive: true });
    } else if (sendTo === 'free') {
      recipients = await User.find({ 'subscription.plan': 'free', isActive: true });
    } else {
      // Send to all active users
      recipients = await User.find({ isActive: true });
    }
    
    if (recipients.length === 0) {
      return errorResponse(res, 'No recipients found', 404);
    }
    
    // Create notification for each recipient
    const notifications = recipients.map(recipient => ({
      recipient: recipient._id,
      type: type || 'announcement',
      title,
      message,
      data: {
        contentType: 'announcement',
        priority: priority || 'normal',
        imageUrl: imageUrl || null,
        actionUrl: actionUrl || null,
        sender: req.user.id
      },
      createdAt: scheduleDate ? new Date(scheduleDate) : new Date(),
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      isRead: false
    }));
    
    // Insert in batches
    const batchSize = 500;
    let insertedCount = 0;
    
    for (let i = 0; i < notifications.length; i += batchSize) {
      const batch = notifications.slice(i, i + batchSize);
      await Notification.insertMany(batch);
      insertedCount += batch.length;
    }
    
    // If this is a global announcement, update global notice
    if (type === 'announcement' && sendTo !== 'specific_user') {
      await GlobalNotice.findOneAndUpdate(
        { active: true },
        {
          title,
          message,
          type,
          priority,
          imageUrl,
          actionUrl,
          active: true,
          expiresAt: expiresAt ? new Date(expiresAt) : null,
          createdBy: req.user.id
        },
        { upsert: true, new: true }
      );
    }
    
    successResponse(res, {
      sentCount: insertedCount,
      totalRecipients: recipients.length
    }, `Notification sent to ${insertedCount} users`);
    
  } catch (error) {
    console.error('Error in adminCreateNotification:', error);
    next(error);
  }
};

// UPDATE notification (admin)
export const adminUpdateNotification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, message, type, priority, imageUrl, actionUrl, expiresAt } = req.body;
    
    const notification = await Notification.findById(id);
    
    if (!notification) {
      return errorResponse(res, 'Notification not found', 404);
    }
    
    // Update fields
    if (title) notification.title = title;
    if (message) notification.message = message;
    if (type) notification.type = type;
    if (priority) notification.data.priority = priority;
    if (imageUrl) notification.data.imageUrl = imageUrl;
    if (actionUrl) notification.data.actionUrl = actionUrl;
    if (expiresAt) notification.expiresAt = new Date(expiresAt);
    
    await notification.save();
    
    successResponse(res, notification, 'Notification updated successfully');
  } catch (error) {
    console.error('Error in adminUpdateNotification:', error);
    next(error);
  }
};

// DELETE notification (admin - can delete any notification)
export const adminDeleteNotification = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const notification = await Notification.findByIdAndDelete(id);
    
    if (!notification) {
      return errorResponse(res, 'Notification not found', 404);
    }
    
    successResponse(res, null, 'Notification deleted successfully');
  } catch (error) {
    console.error('Error in adminDeleteNotification:', error);
    next(error);
  }
};

// DELETE multiple notifications (bulk delete)
export const adminBulkDeleteNotifications = async (req, res, next) => {
  try {
    const { ids } = req.body;
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return errorResponse(res, 'No notification IDs provided', 400);
    }
    
    const result = await Notification.deleteMany({ _id: { $in: ids } });
    
    successResponse(res, { deletedCount: result.deletedCount }, `${result.deletedCount} notifications deleted`);
  } catch (error) {
    console.error('Error in adminBulkDeleteNotifications:', error);
    next(error);
  }
};

// ============================================
// ADMIN: GLOBAL NOTICE MANAGEMENT
// ============================================

// Get active global notice
export const getGlobalNotice = async (req, res, next) => {
  try {
    const globalNotice = await GlobalNotice.findOne({ active: true })
      .populate('createdBy', 'name avatar');
    
    if (!globalNotice || (globalNotice.expiresAt && globalNotice.expiresAt < new Date())) {
      return successResponse(res, null, 'No active notice');
    }
    
    successResponse(res, globalNotice);
  } catch (error) {
    console.error('Error in getGlobalNotice:', error);
    next(error);
  }
};

// Create/Update global notice (admin)
export const updateGlobalNotice = async (req, res, next) => {
  try {
    const { title, message, type, priority, imageUrl, actionUrl, expiresAt, active } = req.body;
    
    const globalNotice = await GlobalNotice.findOneAndUpdate(
      {},
      {
        title,
        message,
        type: type || 'announcement',
        priority: priority || 'normal',
        imageUrl,
        actionUrl,
        active: active !== undefined ? active : true,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        createdBy: req.user.id
      },
      { upsert: true, new: true }
    );
    
    successResponse(res, globalNotice, 'Global notice updated');
  } catch (error) {
    console.error('Error in updateGlobalNotice:', error);
    next(error);
  }
};

// Dismiss global notice for user
export const dismissGlobalNotice = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      'preferences.lastNoticeDismissed': new Date()
    });
    successResponse(res, null, 'Notice dismissed');
  } catch (error) {
    console.error('Error in dismissGlobalNotice:', error);
    next(error);
  }
};

// ============================================
// ADMIN: NOTIFICATION STATISTICS
// ============================================

export const getNotificationStats = async (req, res, next) => {
  try {
    const totalNotifications = await Notification.countDocuments();
    const totalRead = await Notification.countDocuments({ isRead: true });
    const totalUnread = await Notification.countDocuments({ isRead: false });
    
    // Notifications by type
    const byType = await Notification.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);
    
    // Daily notifications (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const daily = await Notification.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
          read: { $sum: { $cond: ['$isRead', 1, 0] } }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    // Top recipients
    const topRecipients = await Notification.aggregate([
      { $group: { _id: '$recipient', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' },
      { $project: { name: '$user.name', email: '$user.email', count: 1 } }
    ]);
    
    successResponse(res, {
      total: totalNotifications,
      read: totalRead,
      unread: totalUnread,
      readRate: totalNotifications > 0 ? ((totalRead / totalNotifications) * 100).toFixed(2) : 0,
      byType,
      daily,
      topRecipients
    });
  } catch (error) {
    console.error('Error in getNotificationStats:', error);
    next(error);
  }
};