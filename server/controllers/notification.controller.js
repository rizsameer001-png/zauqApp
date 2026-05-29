////server/controllers/notification.controller.js

import Notification from '../models/Notification.js';
import User from '../models/User.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
import { getPagination } from '../utils/pagination.js';

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
