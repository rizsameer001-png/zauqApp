import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  nameUrdu: String,
  nameHindi: String,
  description: String,
  type: {
    type: String,
    enum: ['poetry', 'book', 'audio', 'video', 'author', 'general'],
    required: true
  },
  slug: {
    type: String,
    unique: true,
    index: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  icon: String,
  image: String,
  color: String,
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  metaTitle: String,
  metaDescription: String
}, {
  timestamps: true
});

categorySchema.index({ type: 1, isActive: 1 });
categorySchema.index({ parent: 1 });

const Category = mongoose.model('Category', categorySchema);
export default Category;
