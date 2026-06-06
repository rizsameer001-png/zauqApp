// // server/models/Blog.js
// import mongoose from 'mongoose';
// import slugify from 'slugify';

// const blogSchema = new mongoose.Schema({
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
//   excerpt: {
//     type: String,
//     required: true,
//     maxLength: 200
//   },
//   content: {
//     type: String,
//     required: true
//   },
//   category: {
//     type: String,
//     enum: ['poetry', 'authors', 'books', 'audio', 'events', 'interviews', 'reviews', 'news', 'tutorials', 'other'],
//     default: 'poetry'
//   },
//   tags: [String],
//   featuredImage: {
//     type: String,
//     required: true
//   },
//   gallery: [{
//     type: String,
//     url: String,
//     caption: String
//   }],
//   videoUrl: String,
//   pdfUrl: String,
//   author: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   authorName: String,
//   readTime: {
//     type: Number,
//     default: 5
//   },
//   views: {
//     type: Number,
//     default: 0
//   },
//   likes: {
//     type: Number,
//     default: 0
//   },
//   likedBy: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   }],
//   comments: [{
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     userName: String,
//     userEmail: String,
//     content: String,
//     createdAt: { type: Date, default: Date.now },
//     isApproved: { type: Boolean, default: false }
//   }],
//   isPublished: {
//     type: Boolean,
//     default: false
//   },
//   isFeatured: {
//     type: Boolean,
//     default: false
//   },
//   publishedAt: Date,
//   seoTitle: String,
//   seoDescription: String,
//   metaKeywords: String
// }, {
//   timestamps: true
// });

// blogSchema.pre('save', function(next) {
//   if (this.isModified('title')) {
//     this.slug = slugify(this.title, { lower: true, strict: true });
//     if (!this.seoTitle) this.seoTitle = this.title;
//     if (!this.seoDescription) this.seoDescription = this.excerpt;
//   }
//   next();
// });

// const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
// export default Blog;















// server/models/Blog.js
import mongoose from 'mongoose';
import slugify from 'slugify';

const blogSchema = new mongoose.Schema({
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
  excerpt: {
    type: String,
    required: true,
    maxLength: 200
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['poetry', 'authors', 'books', 'audio', 'events', 'interviews', 'reviews', 'news', 'tutorials', 'other'],
    default: 'poetry'
  },
  tags: [String],
  featuredImage: {
    type: String,
    default: ''  // Make it optional with default empty string
  },
  gallery: [{
    url: String,
    caption: String
  }],
  videoUrl: String,
  pdfUrl: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  authorName: String,
  readTime: {
    type: Number,
    default: 5
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName: String,
    userEmail: String,
    content: String,
    createdAt: { type: Date, default: Date.now },
    isApproved: { type: Boolean, default: false }
  }],
  isPublished: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  publishedAt: Date,
  seoTitle: String,
  seoDescription: String,
  metaKeywords: String
}, {
  timestamps: true
});

blogSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
    if (!this.seoTitle) this.seoTitle = this.title;
    if (!this.seoDescription) this.seoDescription = this.excerpt;
  }
  next();
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
export default Blog;