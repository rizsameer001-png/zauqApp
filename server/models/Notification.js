// // //server/models/Notification.js

// import mongoose from 'mongoose';

// const notificationSchema = new mongoose.Schema({
//   recipient: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   type: {
//     type: String,
//     enum: ['follow', 'like', 'comment', 'new_content', 'subscription', 'system', 'mention'],
//     required: true
//   },
//   title: {
//     type: String,
//     required: true
//   },
//   message: String,
//   data: {
//     contentType: String,
//     contentId: mongoose.Schema.Types.ObjectId,
//     sender: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User'
//     },
//     url: String
//   },
//   isRead: {
//     type: Boolean,
//     default: false
//   },
//   isSent: {
//     type: Boolean,
//     default: false
//   },
//   sentAt: Date,
//   readAt: Date
// }, {
//   timestamps: true
// });

// notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });

// const Notification = mongoose.model('Notification', notificationSchema);
// export default Notification;






// server/models/Notification.js
import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['follow', 'like', 'comment', 'new_content', 'subscription', 'system', 'mention', 'announcement'],
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
    url: String,
    priority: {
      type: String,
      enum: ['low', 'normal', 'high', 'urgent'],
      default: 'normal'
    },
    imageUrl: String,
    actionUrl: String
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
  readAt: Date,
  expiresAt: Date
}, {
  timestamps: true
});

// Indexes for better query performance
notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ type: 1 });
notificationSchema.index({ createdAt: -1 });
notificationSchema.index({ expiresAt: 1 });

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;