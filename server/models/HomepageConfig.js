import mongoose from 'mongoose';

const homepageConfigSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
    unique: true
  },
  title: String,
  titleUrdu: String,
  titleHindi: String,
  subtitle: String,
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  config: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  items: [{
    contentType: String,
    contentId: mongoose.Schema.Types.ObjectId,
    title: String,
    image: String,
    order: Number,
    isActive: { type: Boolean, default: true }
  }],
  banners: [{
    image: String,
    title: String,
    subtitle: String,
    ctaText: String,
    ctaUrl: String,
    order: Number,
    isActive: { type: Boolean, default: true }
  }]
}, {
  timestamps: true
});

const HomepageConfig = mongoose.model('HomepageConfig', homepageConfigSchema);
export default HomepageConfig;
