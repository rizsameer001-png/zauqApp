// // server/models/Ad.js
// import mongoose from 'mongoose';

// const adSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Ad name is required'],
//     trim: true
//   },
//   type: {
//     type: String,
//     enum: ['banner', 'sidebar', 'inline', 'popup'],
//     default: 'sidebar'
//   },
//   position: {
//     type: String,
//     enum: ['top', 'bottom', 'left', 'right', 'sidebar-top', 'sidebar-bottom', 'content-top', 'content-bottom', 'content-inline'],
//     default: 'right'
//   },
//   imageUrl: {
//     type: String,
//     required: [true, 'Image URL is required']
//   },
//   linkUrl: {
//     type: String,
//     default: '#'
//   },
//   altText: {
//     type: String,
//     default: ''
//   },
//   htmlCode: {
//     type: String,
//     default: ''
//   },
//   codeType: {
//     type: String,
//     enum: ['image', 'html', 'google_adsense', 'custom'],
//     default: 'image'
//   },
//   googleAdSlot: {
//     type: String,
//     default: ''
//   },
//   googleAdClient: {
//     type: String,
//     default: ''
//   },
//   dimensions: {
//     width: { type: Number, default: 300 },
//     height: { type: Number, default: 250 }
//   },
//   deviceType: {
//     type: String,
//     enum: ['all', 'desktop', 'mobile', 'tablet'],
//     default: 'all'
//   },
//   pages: [{
//     type: String,
//     enum: ['home', 'poetry', 'poem-detail', 'author', 'about', 'all'],
//     default: ['all']
//   }],
//   startDate: {
//     type: Date,
//     default: Date.now
//   },
//   endDate: {
//     type: Date,
//     default: null
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   },
//   priority: {
//     type: Number,
//     default: 0
//   },
//   clicks: {
//     type: Number,
//     default: 0
//   },
//   impressions: {
//     type: Number,
//     default: 0
//   },
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   }
// }, {
//   timestamps: true
// });

// // Index for faster queries
// adSchema.index({ position: 1, isActive: 1, deviceType: 1 });
// adSchema.index({ pages: 1 });

// const Ad = mongoose.models.Ad || mongoose.model('Ad', adSchema);
// export default Ad;














// server/models/Ad.js
import mongoose from 'mongoose';

const adSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Ad name is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['banner', 'sidebar', 'inline', 'popup'],
    default: 'sidebar'
  },
  position: {
    type: String,
    enum: ['top', 'bottom', 'left', 'right', 'sidebar-top', 'sidebar-bottom', 'content-top', 'content-bottom', 'content-inline'],
    default: 'right'
  },
  imageUrl: {
    type: String,
    default: ''
  },
  linkUrl: {
    type: String,
    default: '#'
  },
  altText: {
    type: String,
    default: ''
  },
  htmlCode: {
    type: String,
    default: ''
  },
  codeType: {
    type: String,
    enum: ['image', 'html', 'google_adsense', 'custom'],
    default: 'image'
  },
  googleAdSlot: {
    type: String,
    default: ''
  },
  googleAdClient: {
    type: String,
    default: ''
  },
  dimensions: {
    width: { type: Number, default: 300 },
    height: { type: Number, default: 250 }
  },
  deviceType: {
    type: String,
    enum: ['all', 'desktop', 'mobile', 'tablet'],
    default: 'all'
  },
  pages: [{
    type: String,
    enum: ['home', 'poetry', 'poem-detail', 'author', 'about', 'all'],
    default: ['all']
  }],
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  priority: {
    type: Number,
    default: 0
  },
  clicks: {
    type: Number,
    default: 0
  },
  impressions: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for faster queries
adSchema.index({ position: 1, isActive: 1, deviceType: 1 });
adSchema.index({ pages: 1 });

const Ad = mongoose.models.Ad || mongoose.model('Ad', adSchema);
export default Ad;