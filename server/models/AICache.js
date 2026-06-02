// server/models/AICache.js
import mongoose from 'mongoose';

const aiCacheSchema = new mongoose.Schema({
  cacheKey: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  type: {
    type: String,
    enum: ['poem', 'analysis', 'translation'],
    required: true
  },
  requestParams: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  content: {
    type: String,
    default: ''
  },
  analysis: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  provider: {
    type: String,
    enum: ['deepseek', 'gemini', 'huggingface', 'cache'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // Auto-delete after 24 hours
  }
});

// Create index for faster lookups
aiCacheSchema.index({ cacheKey: 1 });
aiCacheSchema.index({ createdAt: 1 });

const AICache = mongoose.model('AICache', aiCacheSchema);
export default AICache;