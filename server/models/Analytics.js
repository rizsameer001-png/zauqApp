import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    index: true
  },
  type: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    default: 'daily'
  },
  metrics: {
    totalUsers: Number,
    activeUsers: Number,
    newUsers: Number,
    totalPoems: Number,
    totalBooks: Number,
    totalAudio: Number,
    totalVideos: Number,
    totalAuthors: Number,
    totalViews: Number,
    totalLikes: Number,
    totalBookmarks: Number,
    totalShares: Number,
    totalDownloads: Number,
    totalListeningTime: Number, // seconds
    totalWatchTime: Number, // seconds
    totalReadingTime: Number, // seconds
    revenue: Number,
    aiRequests: Number,
    searchQueries: Number
  },
  topContent: [{
    contentType: String,
    contentId: mongoose.Schema.Types.ObjectId,
    title: String,
    views: Number
  }],
  topAuthors: [{
    authorId: mongoose.Schema.Types.ObjectId,
    name: String,
    views: Number
  }],
  deviceBreakdown: {
    mobile: Number,
    desktop: Number,
    tablet: Number
  },
  languageBreakdown: {
    urdu: Number,
    hindi: Number,
    english: Number
  }
}, {
  timestamps: true
});

analyticsSchema.index({ date: -1, type: 1 });

const Analytics = mongoose.model('Analytics', analyticsSchema);
export default Analytics;
