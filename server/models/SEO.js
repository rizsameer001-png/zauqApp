import mongoose from 'mongoose';

const seoSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
    unique: true
  },
  route: String,
  metaTitle: {
    type: String,
    required: true
  },
  metaDescription: String,
  metaKeywords: [String],
  ogTitle: String,
  ogDescription: String,
  ogImage: String,
  ogType: {
    type: String,
    default: 'website'
  },
  twitterCard: {
    type: String,
    default: 'summary_large_image'
  },
  twitterImage: String,
  canonicalUrl: String,
  structuredData: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const SEO = mongoose.model('SEO', seoSchema);
export default SEO;
