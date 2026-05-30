// //server/models/Book.js

// working-revert if  server/models/Book.js
// // //server/models/Book.js
// import mongoose from 'mongoose';
// import slugify from 'slugify';

// const bookSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   slug: {
//     type: String,
//     unique: true,
//     index: true
//   },
//   subtitle: String,
//   description: String,
//   author: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Author',
//     required: true
//   },
//   coAuthors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }],
//   category: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Category'
//   },
//   genres: [String],
//   language: {
//     type: String,
//     enum: ['urdu', 'hindi', 'english', 'persian', 'arabic'],
//     default: 'urdu'
//   },
//   type: {
//     type: String,
//     enum: ['ebook', 'journal', 'magazine', 'rare', 'manuscript'],
//     default: 'ebook'
//   },
//   coverImage: String,
//   gallery: [String],
//   pdfUrl: String,
//   epubUrl: String,
//   previewPages: Number,
//   totalPages: Number,
//   publisher: String,
//   publishYear: Number,
//   isbn: String,
//   price: {
//     amount: { type: Number, default: 0 },
//     currency: { type: String, default: 'INR' }
//   },
//   isFree: {
//     type: Boolean,
//     default: false
//   },
//   isPremium: {
//     type: Boolean,
//     default: false
//   },
//   watermarkText: String,
//   stats: {
//     views: { type: Number, default: 0 },
//     downloads: { type: Number, default: 0 },
//     bookmarks: { type: Number, default: 0 },
//     ratings: { type: Number, default: 0 },
//     averageRating: { type: Number, default: 0 }
//   },
//   ratings: [{
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     rating: { type: Number, min: 1, max: 5 },
//     review: String,
//     createdAt: { type: Date, default: Date.now }
//   }],
//   isPublished: {
//     type: Boolean,
//     default: false
//   },
//   isFeatured: {
//     type: Boolean,
//     default: false
//   },
//   metaTitle: String,
//   metaDescription: String,
//   metaKeywords: [String]
// }, {
//   timestamps: true
// });

// // Indexes
// bookSchema.index({ title: 'text', description: 'text' });
// bookSchema.index({ author: 1, isPublished: 1 });
// bookSchema.index({ category: 1, language: 1 });
// bookSchema.index({ slug: 1 });
// bookSchema.index({ createdAt: -1 });

// // ============================================
// // FIXED: Generate clean slug WITHOUT random characters
// // Before: "book-title-mpo6go76" (with random chars)
// // After:  "book-title" (clean)
// // If duplicate: "book-title-1", "book-title-2", etc.
// // ============================================
// bookSchema.pre('save', async function(next) {
//   if (this.isModified('title')) {
//     // Create base slug from title (e.g., "My Book Title" -> "my-book-title")
//     let baseSlug = slugify(this.title, { lower: true, strict: true });
    
//     // If slug is provided in the request, use that instead
//     let finalSlug = this.slug && this.slug.trim() ? 
//       this.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-') : 
//       baseSlug;
    
//     // Remove trailing/leading hyphens
//     finalSlug = finalSlug.replace(/^-|-$/g, '');
    
//     // Check if slug already exists in database
//     const existingBook = await this.constructor.findOne({ slug: finalSlug });
    
//     // If slug exists and it's not the same document being updated
//     if (existingBook && existingBook._id.toString() !== this._id?.toString()) {
//       // Add number suffix to make it unique
//       let counter = 1;
//       let newSlug = `${finalSlug}-${counter}`;
      
//       // Keep checking until we find a unique slug
//       while (await this.constructor.findOne({ slug: newSlug })) {
//         counter++;
//         newSlug = `${finalSlug}-${counter}`;
//       }
//       this.slug = newSlug;
//       console.log(`⚠️ Slug "${finalSlug}" already exists. Using "${newSlug}" instead.`);
//     } else {
//       // Use clean slug without random characters
//       this.slug = finalSlug;
//     }
//   }
//   next();
// });

// // Check if model already exists to prevent overwrite error
// const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);
// export default Book;











// server/models/Book.js
import mongoose from 'mongoose';
import slugify from 'slugify';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    index: true
  },
  subtitle: String,
  description: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  },
  coAuthors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  genres: [String],
  language: {
    type: String,
    enum: ['urdu', 'hindi', 'english', 'persian', 'arabic'],
    default: 'urdu'
  },
  type: {
    type: String,
    enum: ['ebook', 'journal', 'magazine', 'rare', 'manuscript'],
    default: 'ebook'
  },
  coverImage: String,
  // NEW: Array of image URLs for page-by-page reading experience
  pageImages: [{
    type: String,
    trim: true
  }],
  gallery: [String],
  pdfUrl: String,
  epubUrl: String,
  previewPages: Number,
  totalPages: Number,
  publisher: String,
  publishYear: Number,
  isbn: String,
  price: {
    amount: { type: Number, default: 0 },
    currency: { type: String, default: 'INR' }
  },
  isFree: {
    type: Boolean,
    default: false
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  watermarkText: String,
  stats: {
    views: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
    bookmarks: { type: Number, default: 0 },
    ratings: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 }
  },
  ratings: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, min: 1, max: 5 },
    review: String,
    createdAt: { type: Date, default: Date.now }
  }],
  isPublished: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  metaTitle: String,
  metaDescription: String,
  metaKeywords: [String]
}, {
  timestamps: true
});

// Indexes
bookSchema.index({ title: 'text', description: 'text' });
bookSchema.index({ author: 1, isPublished: 1 });
bookSchema.index({ category: 1, language: 1 });
//bookSchema.index({ slug: 1 });
bookSchema.index({ createdAt: -1 });

// ============================================
// FIXED: Generate clean slug WITHOUT random characters
// Before: "book-title-mpo6go76" (with random chars)
// After:  "book-title" (clean)
// If duplicate: "book-title-1", "book-title-2", etc.
// ============================================
bookSchema.pre('save', async function(next) {
  if (this.isModified('title')) {
    // Create base slug from title (e.g., "My Book Title" -> "my-book-title")
    let baseSlug = slugify(this.title, { lower: true, strict: true });
    
    // If slug is provided in the request, use that instead
    let finalSlug = this.slug && this.slug.trim() ? 
      this.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-') : 
      baseSlug;
    
    // Remove trailing/leading hyphens
    finalSlug = finalSlug.replace(/^-|-$/g, '');
    
    // Check if slug already exists in database
    const existingBook = await this.constructor.findOne({ slug: finalSlug });
    
    // If slug exists and it's not the same document being updated
    if (existingBook && existingBook._id.toString() !== this._id?.toString()) {
      // Add number suffix to make it unique
      let counter = 1;
      let newSlug = `${finalSlug}-${counter}`;
      
      // Keep checking until we find a unique slug
      while (await this.constructor.findOne({ slug: newSlug })) {
        counter++;
        newSlug = `${finalSlug}-${counter}`;
      }
      this.slug = newSlug;
      console.log(`⚠️ Slug "${finalSlug}" already exists. Using "${newSlug}" instead.`);
    } else {
      // Use clean slug without random characters
      this.slug = finalSlug;
    }
  }
  next();
});

// Auto-update totalPages based on pageImages length before saving
bookSchema.pre('save', function(next) {
  if (this.pageImages && this.pageImages.length > 0) {
    this.totalPages = this.pageImages.length;
  }
  next();
});

// Check if model already exists to prevent overwrite error
const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);
export default Book;