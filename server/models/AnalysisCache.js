// server/models/AnalysisCache.js
import mongoose from 'mongoose';

const analysisCacheSchema = new mongoose.Schema({
  poemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poem',
    required: true,
    index: true
  },
  type: {
    type: String,
    enum: ['analysis', 'sentiment', 'themes'],
    default: 'analysis'
  },
  analysis: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  provider: {
    type: String,
    enum: ['huggingface', 'gemini', 'deepseek', 'fallback', 'cache'],
    default: 'huggingface'
  },
  modelUsed: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 604800 // Auto-delete after 7 days
  }
});

// Compound index for faster lookups
analysisCacheSchema.index({ poemId: 1, type: 1, createdAt: -1 });
analysisCacheSchema.index({ createdAt: 1 }, { expireAfterSeconds: 604800 });

const AnalysisCache = mongoose.model('AnalysisCache', analysisCacheSchema);
export default AnalysisCache;