import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  contentType: {
    type: String,
    enum: ['poem', 'book', 'audio', 'video'],
    required: true
  },
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'contentType',
    required: true
  },
  action: {
    type: String,
    enum: ['publish', 'unpublish', 'feature', 'delete'],
    default: 'publish'
  },
  scheduledFor: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'executed', 'failed', 'cancelled'],
    default: 'pending'
  },
  executedAt: Date,
  error: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

scheduleSchema.index({ scheduledFor: 1, status: 1 });
scheduleSchema.index({ contentId: 1, contentType: 1 });

const Schedule = mongoose.model('Schedule', scheduleSchema);
export default Schedule;