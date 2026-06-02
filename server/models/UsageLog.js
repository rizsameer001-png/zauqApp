// server/models/UsageLog.js
import mongoose from 'mongoose';

const usageLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  requestType: {
    type: String,
    enum: ['poem_generation', 'poem_analysis', 'translation', 'voice_search'],
    required: true
  },
  provider: {
    type: String,
    enum: ['deepseek', 'gemini', 'huggingface', 'cache', 'fallback'],
    required: true
  },
  success: {
    type: Boolean,
    default: true
  },
  responseTime: {
    type: Number,
    default: 0
  },
  tokensUsed: {
    type: Number,
    default: 0
  },
  ipAddress: String,
  userAgent: String,
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
});

// Create indexes for analytics
usageLogSchema.index({ userId: 1, timestamp: -1 });
usageLogSchema.index({ requestType: 1, timestamp: -1 });
usageLogSchema.index({ provider: 1, timestamp: -1 });

const UsageLog = mongoose.model('UsageLog', usageLogSchema);
export default UsageLog;