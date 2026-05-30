// // //server/models/HomepageConfig.js
// import mongoose from 'mongoose';

// const homepageConfigSchema = new mongoose.Schema({
//   section: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   title: String,
//   titleUrdu: String,
//   titleHindi: String,
//   subtitle: String,
//   order: {
//     type: Number,
//     default: 0
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   },
//   config: {
//     type: mongoose.Schema.Types.Mixed,
//     default: {}
//   },
//   items: [{
//     contentType: String,
//     contentId: mongoose.Schema.Types.ObjectId,
//     title: String,
//     image: String,
//     order: Number,
//     isActive: { type: Boolean, default: true }
//   }],
//   banners: [{
//     image: String,
//     title: String,
//     subtitle: String,
//     ctaText: String,
//     ctaUrl: String,
//     order: Number,
//     isActive: { type: Boolean, default: true }
//   }]
// }, {
//   timestamps: true
// });

// const HomepageConfig = mongoose.model('HomepageConfig', homepageConfigSchema);
// export default HomepageConfig;









// server/models/HomepageConfig.js
import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
  id: {
    type: Number,
    default: () => Date.now()
  },
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  ctaText: {
    type: String,
    default: 'Explore Now'
  },
  ctaUrl: {
    type: String,
    default: '/explore'
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { _id: false });

const homepageConfigSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
    unique: true,
    enum: ['hero', 'trending', 'featured-authors', 'featured-books', 'featured-audio', 'featured-videos', 'daily-quote', 'premium-cta']
  },
  title: {
    type: String,
    required: true
  },
  titleUrdu: String,
  titleHindi: String,
  subtitle: String,
  type: {
    type: String,
    enum: ['banner', 'content', 'widget', 'cta'],
    default: 'content'
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  banners: [bannerSchema],
  config: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

// Index for better query performance
homepageConfigSchema.index({ section: 1 });
homepageConfigSchema.index({ isActive: 1, order: 1 });

const HomepageConfig = mongoose.model('HomepageConfig', homepageConfigSchema);
export default HomepageConfig;