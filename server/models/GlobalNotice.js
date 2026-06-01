// // server/models/GlobalNotice.js
// import mongoose from 'mongoose';

// const globalNoticeSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   message: {
//     type: String,
//     required: true
//   },
//   type: {
//     type: String,
//     enum: ['announcement', 'system', 'urgent', 'info'],
//     default: 'announcement'
//   },
//   priority: {
//     type: String,
//     enum: ['low', 'normal', 'high', 'urgent'],
//     default: 'normal'
//   },
//   imageUrl: String,
//   actionUrl: String,
//   active: {
//     type: Boolean,
//     default: true
//   },
//   expiresAt: Date,
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   }
// }, {
//   timestamps: true
// });

// const GlobalNotice = mongoose.model('GlobalNotice', globalNoticeSchema);
// export default GlobalNotice;












// server/models/GlobalNotice.js
import mongoose from 'mongoose';

const globalNoticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['announcement', 'system', 'urgent', 'info', 'promotion'],
    default: 'announcement'
  },
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
  },
  imageUrl: {
    type: String,
    default: null
  },
  actionUrl: {
    type: String,
    default: null
  },
  active: {
    type: Boolean,
    default: true
  },
  expiresAt: {
    type: Date,
    default: null
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const GlobalNotice = mongoose.model('GlobalNotice', globalNoticeSchema);
export default GlobalNotice;