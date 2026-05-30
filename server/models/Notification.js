// //server/models/Notification.js

import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['follow', 'like', 'comment', 'new_content', 'subscription', 'system', 'mention'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: String,
  data: {
    contentType: String,
    contentId: mongoose.Schema.Types.ObjectId,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    url: String
  },
  isRead: {
    type: Boolean,
    default: false
  },
  isSent: {
    type: Boolean,
    default: false
  },
  sentAt: Date,
  readAt: Date
}, {
  timestamps: true
});

notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
