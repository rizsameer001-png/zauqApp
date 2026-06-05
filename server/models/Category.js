// // //server/models/Category.js
// import mongoose from 'mongoose';

// const categorySchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true
//   },
//   nameUrdu: String,
//   nameHindi: String,
//   description: String,
//   type: {
//     type: String,
//     enum: ['poetry', 'book', 'audio', 'video', 'author', 'general'],
//     required: true
//   },
//   slug: {
//     type: String,
//     unique: true,
//     index: true
//   },
//   parent: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Category',
//     default: null
//   },
//   icon: String,
//   image: String,
//   color: String,
//   order: {
//     type: Number,
//     default: 0
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   },
//   metaTitle: String,
//   metaDescription: String
// }, {
//   timestamps: true
// });

// categorySchema.index({ type: 1, isActive: 1 });
// categorySchema.index({ parent: 1 });

// const Category = mongoose.model('Category', categorySchema);
// export default Category;













// import mongoose from 'mongoose';
// import slugify from 'slugify';

// const categorySchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Category name is required'],
//     trim: true,
//     unique: true
//   },
//   slug: {
//     type: String,
//     unique: true,
//     sparse: true
//   },
//   description: {
//     type: String,
//     default: ''
//   },
//   icon: {
//     type: String,
//     default: '📁'
//   },
//   color: {
//     type: String,
//     default: '#6366f1'
//   },
//   parentCategory: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Category',
//     default: null
//   },
//   order: {
//     type: Number,
//     default: 0
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   },
//   isFeatured: {
//     type: Boolean,
//     default: false
//   },
//   seoTitle: String,
//   seoDescription: String,
//   metaKeywords: String
// }, {
//   timestamps: true
// });

// // Generate slug before save
// categorySchema.pre('save', function(next) {
//   if (this.isModified('name') && !this.slug) {
//     this.slug = slugify(this.name, { lower: true, strict: true });
//   }
//   next();
// });

// // Virtual for children categories
// categorySchema.virtual('children', {
//   ref: 'Category',
//   localField: '_id',
//   foreignField: 'parentCategory'
// });

// // Ensure virtuals are included in JSON output
// categorySchema.set('toJSON', { virtuals: true });
// categorySchema.set('toObject', { virtuals: true });

// const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
// export default Category;
















import mongoose from 'mongoose';
import slugify from 'slugify';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    unique: true
  },
  slug: {
    type: String,
    unique: true,
    sparse: true
  },
  description: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: '📁'
  },
  color: {
    type: String,
    default: '#6366f1'
  },
  parentCategory: {  // Make sure this matches the populate path
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  order: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    enum: ['audio', 'video', 'book', 'poem'],
    default: 'audio'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  seoTitle: String,
  seoDescription: String,
  metaKeywords: String
}, {
  timestamps: true
});

// Generate slug before save
categorySchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

// Virtual for children categories using parentCategory
categorySchema.virtual('children', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parentCategory'
});

// Virtual for parent (alias)
categorySchema.virtual('parent', {
  ref: 'Category',
  localField: 'parentCategory',
  foreignField: '_id',
  justOne: true
});

// Ensure virtuals are included in JSON output
categorySchema.set('toJSON', { virtuals: true });
categorySchema.set('toObject', { virtuals: true });

// Add indexes for better performance
categorySchema.index({ slug: 1 });
categorySchema.index({ parentCategory: 1 });
categorySchema.index({ type: 1, isActive: 1 });
categorySchema.index({ order: 1, name: 1 });

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
export default Category;