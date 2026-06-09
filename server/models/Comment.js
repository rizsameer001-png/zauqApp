// server/models/Comment.js
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  poem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poem',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: [true, 'Comment text is required'],
    trim: true,
    maxlength: [1000, 'Comment cannot exceed 1000 characters']
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  likesCount: {
    type: Number,
    default: 0
  },
  isEdited: {
    type: Boolean,
    default: false
  },
  editedAt: Date,
  isDeleted: {
    type: Boolean,
    default: false
  },
  reports: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reason: String,
    reportedAt: { type: Date, default: Date.now }
  }],
  status: {
    type: String,
    enum: ['active', 'reported', 'hidden', 'deleted'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Index for faster queries
commentSchema.index({ poem: 1, createdAt: -1 });
commentSchema.index({ user: 1 });
commentSchema.index({ parentComment: 1 });
commentSchema.index({ status: 1 });

// Update poem comment count when comment is added/removed
commentSchema.post('save', async function(doc) {
  const Poem = mongoose.model('Poem');
  const count = await mongoose.model('Comment').countDocuments({ poem: doc.poem, status: 'active' });
  await Poem.findByIdAndUpdate(doc.poem, { 'stats.comments': count });
});

commentSchema.post('remove', async function(doc) {
  const Poem = mongoose.model('Poem');
  const count = await mongoose.model('Comment').countDocuments({ poem: doc.poem, status: 'active' });
  await Poem.findByIdAndUpdate(doc.poem, { 'stats.comments': count });
});

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);
export default Comment;