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









// // server/models/HomepageConfig.js
// import mongoose from 'mongoose';

// const bannerSchema = new mongoose.Schema({
//   id: {
//     type: Number,
//     default: () => Date.now()
//   },
//   image: {
//     type: String,
//     required: true
//   },
//   title: {
//     type: String,
//     required: true
//   },
//   subtitle: {
//     type: String,
//     default: ''
//   },
//   ctaText: {
//     type: String,
//     default: 'Explore Now'
//   },
//   ctaUrl: {
//     type: String,
//     default: '/explore'
//   },
//   order: {
//     type: Number,
//     default: 0
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   }
// }, { _id: false });

// const homepageConfigSchema = new mongoose.Schema({
//   section: {
//     type: String,
//     required: true,
//     unique: true,
//     enum: ['hero', 'trending', 'featured-authors', 'featured-books', 'featured-audio', 'featured-videos', 'daily-quote', 'premium-cta']
//   },
//   title: {
//     type: String,
//     required: true
//   },
//   titleUrdu: String,
//   titleHindi: String,
//   subtitle: String,
//   type: {
//     type: String,
//     enum: ['banner', 'content', 'widget', 'cta'],
//     default: 'content'
//   },
//   order: {
//     type: Number,
//     default: 0
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   },
//   banners: [bannerSchema],
//   config: {
//     type: mongoose.Schema.Types.Mixed,
//     default: {}
//   }
// }, {
//   timestamps: true
// });

// // Index for better query performance
// homepageConfigSchema.index({ section: 1 });
// homepageConfigSchema.index({ isActive: 1, order: 1 });

// const HomepageConfig = mongoose.model('HomepageConfig', homepageConfigSchema);
// export default HomepageConfig;











// server/models/HomepageConfig.js
import mongoose from 'mongoose';

// Define banner sub-schema with proper types
const bannerSchema = new mongoose.Schema({
  id: {
    type: String,  // Changed from Number to String to match frontend
    required: true,
    default: () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  },
  title: {
    type: String,
    required: true,
    default: ''
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
  image: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
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
  titleUrdu: {
    type: String,
    default: ''
  },
  titleHindi: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
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
  banners: {
    type: [bannerSchema],
    default: []
  },
  config: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

// Index for better query performance
// homepageConfigSchema.index({ section: 1 });
homepageConfigSchema.index({ isActive: 1, order: 1 });
homepageConfigSchema.index({ 'banners.isActive': 1 });
homepageConfigSchema.index({ 'banners.order': 1 });

// Pre-save middleware to ensure banners have valid IDs and orders
homepageConfigSchema.pre('save', function(next) {
  if (this.banners && this.banners.length > 0) {
    this.banners.forEach((banner, index) => {
      // Ensure each banner has a string ID
      if (!banner.id) {
        banner.id = `${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`;
      }
      // Ensure order is set correctly
      if (banner.order === undefined || banner.order === null) {
        banner.order = index;
      }
      // Update timestamp
      banner.updatedAt = new Date();
    });
  }
  next();
});

// Method to add a single banner
homepageConfigSchema.methods.addBanner = function(bannerData) {
  const newBanner = {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: bannerData.title || 'Untitled Banner',
    subtitle: bannerData.subtitle || '',
    ctaText: bannerData.ctaText || 'Explore Now',
    ctaUrl: bannerData.ctaUrl || '/explore',
    image: bannerData.image,
    order: this.banners.length,
    isActive: bannerData.isActive !== false,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  this.banners.push(newBanner);
  return newBanner;
};

// Method to add multiple banners in bulk
homepageConfigSchema.methods.addBanners = function(bannersData) {
  const startOrder = this.banners.length;
  const newBanners = bannersData.map((banner, index) => ({
    id: `${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
    title: banner.title || `Banner ${startOrder + index + 1}`,
    subtitle: banner.subtitle || '',
    ctaText: banner.ctaText || 'Explore Now',
    ctaUrl: banner.ctaUrl || '/explore',
    image: banner.image || banner.url,
    order: startOrder + index,
    isActive: banner.isActive !== false,
    createdAt: new Date(),
    updatedAt: new Date()
  }));
  
  this.banners.push(...newBanners);
  return newBanners;
};

// Method to update a banner
homepageConfigSchema.methods.updateBanner = function(bannerId, updateData) {
  const bannerIndex = this.banners.findIndex(b => b.id === bannerId);
  if (bannerIndex === -1) return null;
  
  this.banners[bannerIndex] = {
    ...this.banners[bannerIndex],
    ...updateData,
    updatedAt: new Date()
  };
  
  return this.banners[bannerIndex];
};

// Method to remove a banner
homepageConfigSchema.methods.removeBanner = function(bannerId) {
  const initialLength = this.banners.length;
  this.banners = this.banners.filter(b => b.id !== bannerId);
  
  // Reorder remaining banners
  this.banners.forEach((banner, index) => {
    banner.order = index;
  });
  
  return initialLength !== this.banners.length;
};

// Method to reorder banners
homepageConfigSchema.methods.reorderBanners = function(orders) {
  orders.forEach(({ id, order }) => {
    const banner = this.banners.find(b => b.id === id);
    if (banner) {
      banner.order = order;
    }
  });
  
  // Sort banners by order
  this.banners.sort((a, b) => a.order - b.order);
  
  // Reassign sequential orders
  this.banners.forEach((banner, index) => {
    banner.order = index;
  });
  
  return this.banners;
};

// Static method to get or create hero section
homepageConfigSchema.statics.getHeroSection = async function() {
  let heroSection = await this.findOne({ section: 'hero' });
  
  if (!heroSection) {
    heroSection = new this({
      section: 'hero',
      title: 'Hero Banner',
      type: 'banner',
      isActive: true,
      order: 1,
      banners: []
    });
    await heroSection.save();
  }
  
  return heroSection;
};

// Static method to get active banners for public view
homepageConfigSchema.statics.getActiveBanners = async function() {
  const heroSection = await this.findOne({ section: 'hero' });
  if (!heroSection || !heroSection.banners) return [];
  return heroSection.banners.filter(b => b.isActive !== false).sort((a, b) => a.order - b.order);
};

const HomepageConfig = mongoose.model('HomepageConfig', homepageConfigSchema);
export default HomepageConfig;