// // server/controllers/blog.controller.js
// import Blog from '../models/Blog.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination } from '../utils/pagination.js';

// export const getBlogs = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);
//     const { category, tag, search, featured } = req.query;
    
//     const filter = { isPublished: true };
//     if (category) filter.category = category;
//     if (featured === 'true') filter.isFeatured = true;
//     if (tag) filter.tags = { $in: [tag] };
//     if (search) {
//       filter.$or = [
//         { title: { $regex: search, $options: 'i' } },
//         { excerpt: { $regex: search, $options: 'i' } },
//         { tags: { $in: [new RegExp(search, 'i')] } }
//       ];
//     }
    
//     const blogs = await Blog.find(filter)
//       .populate('author', 'name avatar')
//       .sort({ publishedAt: -1, createdAt: -1 })
//       .skip(skip)
//       .limit(limit);
    
//     const total = await Blog.countDocuments(filter);
//     paginatedResponse(res, blogs, { page, limit, total });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getBlogBySlug = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     const blog = await Blog.findOne({ slug, isPublished: true })
//       .populate('author', 'name avatar bio');
    
//     if (!blog) {
//       return errorResponse(res, 'Blog not found', 404);
//     }
    
//     blog.views += 1;
//     await blog.save();
    
//     successResponse(res, blog);
//   } catch (error) {
//     next(error);
//   }
// };

// export const createBlog = async (req, res, next) => {
//   try {
//     const blogData = { ...req.body, author: req.user.id };
//     if (blogData.isPublished && !blogData.publishedAt) {
//       blogData.publishedAt = new Date();
//     }
//     const blog = await Blog.create(blogData);
//     successResponse(res, blog, 'Blog created successfully', 201);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateBlog = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const updates = req.body;
//     if (updates.isPublished && !updates.publishedAt) {
//       updates.publishedAt = new Date();
//     }
//     const blog = await Blog.findByIdAndUpdate(id, updates, { new: true });
//     successResponse(res, blog, 'Blog updated successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteBlog = async (req, res, next) => {
//   try {
//     await Blog.findByIdAndDelete(req.params.id);
//     successResponse(res, null, 'Blog deleted successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getFeaturedBlogs = async (req, res, next) => {
//   try {
//     const blogs = await Blog.find({ isFeatured: true, isPublished: true })
//       .populate('author', 'name avatar')
//       .limit(6);
//     successResponse(res, blogs);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getBlogsByCategory = async (req, res, next) => {
//   try {
//     const { category } = req.params;
//     const { page, limit, skip } = getPagination(req);
//     const blogs = await Blog.find({ category, isPublished: true })
//       .populate('author', 'name avatar')
//       .sort({ publishedAt: -1 })
//       .skip(skip)
//       .limit(limit);
//     const total = await Blog.countDocuments({ category, isPublished: true });
//     paginatedResponse(res, blogs, { page, limit, total });
//   } catch (error) {
//     next(error);
//   }
// };

// export const likeBlog = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
//     const blog = await Blog.findById(id);
//     if (!blog) return errorResponse(res, 'Blog not found', 404);
    
//     if (blog.likedBy.includes(userId)) {
//       blog.likedBy.pull(userId);
//       blog.likes -= 1;
//     } else {
//       blog.likedBy.push(userId);
//       blog.likes += 1;
//     }
//     await blog.save();
//     successResponse(res, { liked: blog.likedBy.includes(userId), likes: blog.likes });
//   } catch (error) {
//     next(error);
//   }
// };

// export const addComment = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { content } = req.body;
//     const blog = await Blog.findById(id);
//     if (!blog) return errorResponse(res, 'Blog not found', 404);
    
//     blog.comments.push({
//       user: req.user.id,
//       userName: req.user.name,
//       userEmail: req.user.email,
//       content,
//       isApproved: false
//     });
//     await blog.save();
//     successResponse(res, blog.comments, 'Comment added successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getRelatedBlogs = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const blog = await Blog.findById(id);
//     if (!blog) return errorResponse(res, 'Blog not found', 404);
    
//     const related = await Blog.find({
//       _id: { $ne: id },
//       category: blog.category,
//       isPublished: true
//     }).limit(4);
    
//     successResponse(res, related);
//   } catch (error) {
//     next(error);
//   }
// };

















// // server/controllers/blog.controller.js
// import Blog from '../models/Blog.js';
// import User from '../models/User.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination } from '../utils/pagination.js';
// import slugify from 'slugify';

// // ============================================
// // PUBLIC ROUTES (No authentication required)
// // ============================================

// // Get all blogs with pagination and filtering
// export const getBlogs = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);
//     const { category, tag, search, featured, author } = req.query;
    
//     const filter = { isPublished: true };
    
//     if (category && category !== 'all') filter.category = category;
//     if (featured === 'true') filter.isFeatured = true;
//     if (tag) filter.tags = { $in: [tag] };
//     if (author) filter.author = author;
//     if (search) {
//       filter.$or = [
//         { title: { $regex: search, $options: 'i' } },
//         { excerpt: { $regex: search, $options: 'i' } },
//         { content: { $regex: search, $options: 'i' } },
//         { tags: { $in: [new RegExp(search, 'i')] } }
//       ];
//     }
    
//     const blogs = await Blog.find(filter)
//       .populate('author', 'name avatar email')
//       .sort({ publishedAt: -1, createdAt: -1 })
//       .skip(skip)
//       .limit(limit);
    
//     const total = await Blog.countDocuments(filter);
    
//     paginatedResponse(res, blogs, { page, limit, total });
//   } catch (error) {
//     console.error('Error in getBlogs:', error);
//     next(error);
//   }
// };

// // Get single blog by slug (public)
// export const getBlogBySlug = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const blog = await Blog.findOne({ slug, isPublished: true })
//       .populate('author', 'name avatar bio email');
    
//     if (!blog) {
//       return errorResponse(res, 'Blog not found', 404);
//     }
    
//     // Increment view count
//     blog.views += 1;
//     await blog.save();
    
//     successResponse(res, blog);
//   } catch (error) {
//     console.error('Error in getBlogBySlug:', error);
//     next(error);
//   }
// };

// // Get blog by ID (admin only)
// export const getBlogById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const blog = await Blog.findById(id)
//       .populate('author', 'name avatar email');
    
//     if (!blog) {
//       return errorResponse(res, 'Blog not found', 404);
//     }
    
//     successResponse(res, blog);
//   } catch (error) {
//     console.error('Error in getBlogById:', error);
//     next(error);
//   }
// };

// // Get featured blogs
// export const getFeaturedBlogs = async (req, res, next) => {
//   try {
//     const { limit = 6 } = req.query;
    
//     const blogs = await Blog.find({ isFeatured: true, isPublished: true })
//       .populate('author', 'name avatar')
//       .sort({ publishedAt: -1 })
//       .limit(parseInt(limit));
    
//     successResponse(res, blogs);
//   } catch (error) {
//     console.error('Error in getFeaturedBlogs:', error);
//     next(error);
//   }
// };

// // Get blogs by category
// export const getBlogsByCategory = async (req, res, next) => {
//   try {
//     const { category } = req.params;
//     const { page, limit, skip } = getPagination(req);
    
//     const blogs = await Blog.find({ category, isPublished: true })
//       .populate('author', 'name avatar')
//       .sort({ publishedAt: -1 })
//       .skip(skip)
//       .limit(limit);
    
//     const total = await Blog.countDocuments({ category, isPublished: true });
    
//     paginatedResponse(res, blogs, { page, limit, total });
//   } catch (error) {
//     console.error('Error in getBlogsByCategory:', error);
//     next(error);
//   }
// };

// // Get blogs by tag
// export const getBlogsByTag = async (req, res, next) => {
//   try {
//     const { tag } = req.params;
//     const { page, limit, skip } = getPagination(req);
    
//     const blogs = await Blog.find({ tags: tag, isPublished: true })
//       .populate('author', 'name avatar')
//       .sort({ publishedAt: -1 })
//       .skip(skip)
//       .limit(limit);
    
//     const total = await Blog.countDocuments({ tags: tag, isPublished: true });
    
//     paginatedResponse(res, blogs, { page, limit, total, tag });
//   } catch (error) {
//     console.error('Error in getBlogsByTag:', error);
//     next(error);
//   }
// };

// // Get related blogs
// export const getRelatedBlogs = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { limit = 4 } = req.query;
    
//     const blog = await Blog.findById(id);
//     if (!blog) {
//       return errorResponse(res, 'Blog not found', 404);
//     }
    
//     const related = await Blog.find({
//       _id: { $ne: id },
//       category: blog.category,
//       isPublished: true
//     })
//       .populate('author', 'name avatar')
//       .limit(parseInt(limit))
//       .select('title slug featuredImage excerpt publishedAt views');
    
//     successResponse(res, related);
//   } catch (error) {
//     console.error('Error in getRelatedBlogs:', error);
//     next(error);
//   }
// };

// // Get blog statistics
// export const getBlogStats = async (req, res, next) => {
//   try {
//     const totalBlogs = await Blog.countDocuments();
//     const publishedBlogs = await Blog.countDocuments({ isPublished: true });
//     const draftBlogs = await Blog.countDocuments({ isPublished: false });
//     const featuredBlogs = await Blog.countDocuments({ isFeatured: true });
    
//     const totalViews = await Blog.aggregate([
//       { $match: { isPublished: true } },
//       { $group: { _id: null, total: { $sum: '$views' } } }
//     ]);
    
//     const totalLikes = await Blog.aggregate([
//       { $match: { isPublished: true } },
//       { $group: { _id: null, total: { $sum: '$likes' } } }
//     ]);
    
//     const blogsByCategory = await Blog.aggregate([
//       { $match: { isPublished: true } },
//       { $group: { _id: '$category', count: { $sum: 1 } } }
//     ]);
    
//     successResponse(res, {
//       total: totalBlogs,
//       published: publishedBlogs,
//       draft: draftBlogs,
//       featured: featuredBlogs,
//       totalViews: totalViews[0]?.total || 0,
//       totalLikes: totalLikes[0]?.total || 0,
//       byCategory: blogsByCategory
//     });
//   } catch (error) {
//     console.error('Error in getBlogStats:', error);
//     next(error);
//   }
// };

// // ============================================
// // PROTECTED ROUTES (Authentication required)
// // ============================================

// // Like blog
// export const likeBlog = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
    
//     const blog = await Blog.findById(id);
//     if (!blog) {
//       return errorResponse(res, 'Blog not found', 404);
//     }
    
//     if (blog.likedBy.includes(userId)) {
//       return errorResponse(res, 'Blog already liked', 400);
//     }
    
//     blog.likedBy.push(userId);
//     blog.likes += 1;
//     await blog.save();
    
//     successResponse(res, { liked: true, likes: blog.likes });
//   } catch (error) {
//     console.error('Error in likeBlog:', error);
//     next(error);
//   }
// };

// // Unlike blog
// export const unlikeBlog = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
    
//     const blog = await Blog.findById(id);
//     if (!blog) {
//       return errorResponse(res, 'Blog not found', 404);
//     }
    
//     if (!blog.likedBy.includes(userId)) {
//       return errorResponse(res, 'Blog not liked yet', 400);
//     }
    
//     blog.likedBy = blog.likedBy.filter(id => id.toString() !== userId);
//     blog.likes = Math.max(0, blog.likes - 1);
//     await blog.save();
    
//     successResponse(res, { liked: false, likes: blog.likes });
//   } catch (error) {
//     console.error('Error in unlikeBlog:', error);
//     next(error);
//   }
// };

// // Add comment
// export const addComment = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { content } = req.body;
//     const userId = req.user.id;
//     const user = await User.findById(userId);
    
//     if (!content || content.trim().length < 2) {
//       return errorResponse(res, 'Comment must be at least 2 characters', 400);
//     }
    
//     const blog = await Blog.findById(id);
//     if (!blog) {
//       return errorResponse(res, 'Blog not found', 404);
//     }
    
//     const comment = {
//       user: userId,
//       userName: user.name,
//       userEmail: user.email,
//       content: content.trim(),
//       isApproved: false,
//       createdAt: new Date()
//     };
    
//     blog.comments.push(comment);
//     await blog.save();
    
//     successResponse(res, comment, 'Comment added successfully');
//   } catch (error) {
//     console.error('Error in addComment:', error);
//     next(error);
//   }
// };

// // Delete comment (admin)
// export const deleteComment = async (req, res, next) => {
//   try {
//     const { blogId, commentId } = req.params;
    
//     const blog = await Blog.findById(blogId);
//     if (!blog) {
//       return errorResponse(res, 'Blog not found', 404);
//     }
    
//     blog.comments = blog.comments.filter(c => c._id.toString() !== commentId);
//     await blog.save();
    
//     successResponse(res, null, 'Comment deleted successfully');
//   } catch (error) {
//     console.error('Error in deleteComment:', error);
//     next(error);
//   }
// };

// // Approve comment (admin)
// export const approveComment = async (req, res, next) => {
//   try {
//     const { blogId, commentId } = req.params;
    
//     const blog = await Blog.findById(blogId);
//     if (!blog) {
//       return errorResponse(res, 'Blog not found', 404);
//     }
    
//     const comment = blog.comments.id(commentId);
//     if (!comment) {
//       return errorResponse(res, 'Comment not found', 404);
//     }
    
//     comment.isApproved = true;
//     await blog.save();
    
//     successResponse(res, comment, 'Comment approved successfully');
//   } catch (error) {
//     console.error('Error in approveComment:', error);
//     next(error);
//   }
// };

// // ============================================
// // ADMIN ROUTES (Admin only)
// // ============================================

// // Create blog
// export const createBlog = async (req, res, next) => {
//   try {
//     const { title, excerpt, content, category, tags, featuredImage, gallery, videoUrl, pdfUrl, readTime, isPublished, isFeatured, seoTitle, seoDescription, metaKeywords } = req.body;
    
//     // Validate required fields
//     if (!title || !title.trim()) {
//       return errorResponse(res, 'Title is required', 400);
//     }
//     if (!excerpt || !excerpt.trim()) {
//       return errorResponse(res, 'Excerpt is required', 400);
//     }
//     if (!content || !content.trim()) {
//       return errorResponse(res, 'Content is required', 400);
//     }
    
//     // Generate slug from title if not provided
//     let slug = slugify(title, { lower: true, strict: true });
//     let existingBlog = await Blog.findOne({ slug });
//     let counter = 1;
//     while (existingBlog) {
//       slug = `${slugify(title, { lower: true, strict: true })}-${counter}`;
//       existingBlog = await Blog.findOne({ slug });
//       counter++;
//     }
    
//     const blogData = {
//       title: title.trim(),
//       slug,
//       excerpt: excerpt.trim(),
//       content,
//       category: category || 'poetry',
//       tags: tags || [],
//       featuredImage: featuredImage || '',
//       gallery: gallery || [],
//       videoUrl: videoUrl || '',
//       pdfUrl: pdfUrl || '',
//       readTime: readTime || Math.ceil(content.split(/\s+/).length / 200),
//       isPublished: isPublished || false,
//       isFeatured: isFeatured || false,
//       author: req.user.id,
//       authorName: req.user.name,
//       seoTitle: seoTitle || title,
//       seoDescription: seoDescription || excerpt,
//       metaKeywords: metaKeywords || '',
//       publishedAt: isPublished ? new Date() : null
//     };
    
//     const blog = await Blog.create(blogData);
    
//     const populatedBlog = await Blog.findById(blog._id)
//       .populate('author', 'name avatar');
    
//     successResponse(res, populatedBlog, 'Blog created successfully', 201);
//   } catch (error) {
//     console.error('Error in createBlog:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
//     }
    
//     if (error.code === 11000) {
//       return errorResponse(res, 'Blog with this slug already exists', 400);
//     }
    
//     next(error);
//   }
// };

// // Update blog
// export const updateBlog = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const updates = req.body;
    
//     const blog = await Blog.findById(id);
//     if (!blog) {
//       return errorResponse(res, 'Blog not found', 404);
//     }
    
//     // Update slug if title changed
//     if (updates.title && updates.title !== blog.title) {
//       let slug = slugify(updates.title, { lower: true, strict: true });
//       let existingBlog = await Blog.findOne({ slug, _id: { $ne: id } });
//       let counter = 1;
//       while (existingBlog) {
//         slug = `${slugify(updates.title, { lower: true, strict: true })}-${counter}`;
//         existingBlog = await Blog.findOne({ slug, _id: { $ne: id } });
//         counter++;
//       }
//       updates.slug = slug;
//     }
    
//     // Update publishedAt if being published now
//     if (updates.isPublished && !blog.isPublished && !blog.publishedAt) {
//       updates.publishedAt = new Date();
//     }
    
//     // Update read time based on content
//     if (updates.content && updates.content !== blog.content) {
//       updates.readTime = Math.ceil(updates.content.split(/\s+/).length / 200);
//     }
    
//     const updatedBlog = await Blog.findByIdAndUpdate(
//       id,
//       { $set: updates },
//       { new: true, runValidators: true }
//     ).populate('author', 'name avatar');
    
//     successResponse(res, updatedBlog, 'Blog updated successfully');
//   } catch (error) {
//     console.error('Error in updateBlog:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
//     }
    
//     if (error.code === 11000) {
//       return errorResponse(res, 'Blog with this slug already exists', 400);
//     }
    
//     next(error);
//   }
// };

// // Delete blog
// export const deleteBlog = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const blog = await Blog.findById(id);
//     if (!blog) {
//       return errorResponse(res, 'Blog not found', 404);
//     }
    
//     await Blog.findByIdAndDelete(id);
    
//     successResponse(res, null, 'Blog deleted successfully');
//   } catch (error) {
//     console.error('Error in deleteBlog:', error);
//     next(error);
//   }
// };

// // Bulk delete blogs
// export const bulkDeleteBlogs = async (req, res, next) => {
//   try {
//     const { ids } = req.body;
    
//     if (!ids || !Array.isArray(ids) || ids.length === 0) {
//       return errorResponse(res, 'Please provide an array of blog IDs', 400);
//     }
    
//     const result = await Blog.deleteMany({ _id: { $in: ids } });
    
//     successResponse(res, { deletedCount: result.deletedCount }, `${result.deletedCount} blogs deleted successfully`);
//   } catch (error) {
//     console.error('Error in bulkDeleteBlogs:', error);
//     next(error);
//   }
// };

// // Toggle featured status
// export const toggleFeatured = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const blog = await Blog.findById(id);
//     if (!blog) {
//       return errorResponse(res, 'Blog not found', 404);
//     }
    
//     blog.isFeatured = !blog.isFeatured;
//     await blog.save();
    
//     successResponse(res, { isFeatured: blog.isFeatured }, `Blog ${blog.isFeatured ? 'featured' : 'unfeatured'} successfully`);
//   } catch (error) {
//     console.error('Error in toggleFeatured:', error);
//     next(error);
//   }
// };

// // Toggle publish status
// export const togglePublish = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const blog = await Blog.findById(id);
//     if (!blog) {
//       return errorResponse(res, 'Blog not found', 404);
//     }
    
//     blog.isPublished = !blog.isPublished;
//     if (blog.isPublished && !blog.publishedAt) {
//       blog.publishedAt = new Date();
//     }
//     await blog.save();
    
//     successResponse(res, { isPublished: blog.isPublished }, `Blog ${blog.isPublished ? 'published' : 'unpublished'} successfully`);
//   } catch (error) {
//     console.error('Error in togglePublish:', error);
//     next(error);
//   }
// };




















// server/controllers/blog.controller.js
import Blog from '../models/Blog.js';
import User from '../models/User.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
import { getPagination } from '../utils/pagination.js';
import slugify from 'slugify';

// ============================================
// PUBLIC ROUTES (No authentication required)
// ============================================

// Get all blogs with pagination and filtering
export const getBlogs = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const { category, tag, search, featured, author } = req.query;
    
    const filter = { isPublished: true };
    
    if (category && category !== 'all') filter.category = category;
    if (featured === 'true') filter.isFeatured = true;
    if (tag) filter.tags = { $in: [tag] };
    if (author) filter.author = author;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    const blogs = await Blog.find(filter)
      .populate('author', 'name avatar email')
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Blog.countDocuments(filter);
    
    paginatedResponse(res, blogs, { page, limit, total });
  } catch (error) {
    console.error('Error in getBlogs:', error);
    next(error);
  }
};

// Get single blog by slug (public)
export const getBlogBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    const blog = await Blog.findOne({ slug, isPublished: true })
      .populate('author', 'name avatar bio email');
    
    if (!blog) {
      return errorResponse(res, 'Blog not found', 404);
    }
    
    // Increment view count
    blog.views += 1;
    await blog.save();
    
    successResponse(res, blog);
  } catch (error) {
    console.error('Error in getBlogBySlug:', error);
    next(error);
  }
};

// Get blog by ID (admin only)
export const getBlogById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const blog = await Blog.findById(id)
      .populate('author', 'name avatar email');
    
    if (!blog) {
      return errorResponse(res, 'Blog not found', 404);
    }
    
    successResponse(res, blog);
  } catch (error) {
    console.error('Error in getBlogById:', error);
    next(error);
  }
};

// Get featured blogs
export const getFeaturedBlogs = async (req, res, next) => {
  try {
    const { limit = 6 } = req.query;
    
    const blogs = await Blog.find({ isFeatured: true, isPublished: true })
      .populate('author', 'name avatar')
      .sort({ publishedAt: -1 })
      .limit(parseInt(limit));
    
    successResponse(res, blogs);
  } catch (error) {
    console.error('Error in getFeaturedBlogs:', error);
    next(error);
  }
};

// Get blogs by category
export const getBlogsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const { page, limit, skip } = getPagination(req);
    
    const filter = { category, isPublished: true };
    
    const blogs = await Blog.find(filter)
      .populate('author', 'name avatar')
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Blog.countDocuments(filter);
    
    paginatedResponse(res, blogs, { page, limit, total, category });
  } catch (error) {
    console.error('Error in getBlogsByCategory:', error);
    next(error);
  }
};

// Get blogs by tag
export const getBlogsByTag = async (req, res, next) => {
  try {
    const { tag } = req.params;
    const { page, limit, skip } = getPagination(req);
    
    const filter = { tags: tag, isPublished: true };
    
    const blogs = await Blog.find(filter)
      .populate('author', 'name avatar')
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Blog.countDocuments(filter);
    
    paginatedResponse(res, blogs, { page, limit, total, tag });
  } catch (error) {
    console.error('Error in getBlogsByTag:', error);
    next(error);
  }
};

// Get related blogs (by category)
export const getRelatedBlogs = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { limit = 4 } = req.query;
    
    const blog = await Blog.findById(id);
    if (!blog) {
      return errorResponse(res, 'Blog not found', 404);
    }
    
    const related = await Blog.find({
      _id: { $ne: id },
      category: blog.category,
      isPublished: true
    })
      .populate('author', 'name avatar')
      .sort({ publishedAt: -1 })
      .limit(parseInt(limit))
      .select('title slug featuredImage excerpt publishedAt views');
    
    successResponse(res, related);
  } catch (error) {
    console.error('Error in getRelatedBlogs:', error);
    next(error);
  }
};

// Get latest blogs
export const getLatestBlogs = async (req, res, next) => {
  try {
    const { limit = 5 } = req.query;
    
    const blogs = await Blog.find({ isPublished: true })
      .populate('author', 'name avatar')
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(parseInt(limit))
      .select('title slug featuredImage excerpt publishedAt views');
    
    successResponse(res, blogs);
  } catch (error) {
    console.error('Error in getLatestBlogs:', error);
    next(error);
  }
};

// Get blog statistics
export const getBlogStats = async (req, res, next) => {
  try {
    const totalBlogs = await Blog.countDocuments();
    const publishedBlogs = await Blog.countDocuments({ isPublished: true });
    const draftBlogs = await Blog.countDocuments({ isPublished: false });
    const featuredBlogs = await Blog.countDocuments({ isFeatured: true });
    
    const totalViews = await Blog.aggregate([
      { $match: { isPublished: true } },
      { $group: { _id: null, total: { $sum: '$views' } } }
    ]);
    
    const totalLikes = await Blog.aggregate([
      { $match: { isPublished: true } },
      { $group: { _id: null, total: { $sum: '$likes' } } }
    ]);
    
    const blogsByCategory = await Blog.aggregate([
      { $match: { isPublished: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    const recentComments = await Blog.aggregate([
      { $unwind: '$comments' },
      { $match: { 'comments.isApproved': false } },
      { $sort: { 'comments.createdAt': -1 } },
      { $limit: 5 },
      { 
        $project: {
          blogTitle: '$title',
          blogSlug: '$slug',
          comment: '$comments'
        }
      }
    ]);
    
    successResponse(res, {
      total: totalBlogs,
      published: publishedBlogs,
      draft: draftBlogs,
      featured: featuredBlogs,
      totalViews: totalViews[0]?.total || 0,
      totalLikes: totalLikes[0]?.total || 0,
      byCategory: blogsByCategory,
      pendingComments: recentComments
    });
  } catch (error) {
    console.error('Error in getBlogStats:', error);
    next(error);
  }
};

// ============================================
// PROTECTED ROUTES (Authentication required)
// ============================================

// Like blog
export const likeBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const blog = await Blog.findById(id);
    if (!blog) {
      return errorResponse(res, 'Blog not found', 404);
    }
    
    if (blog.likedBy.includes(userId)) {
      blog.likedBy = blog.likedBy.filter(id => id.toString() !== userId);
      blog.likes = Math.max(0, blog.likes - 1);
      await blog.save();
      return successResponse(res, { liked: false, likes: blog.likes });
    }
    
    blog.likedBy.push(userId);
    blog.likes += 1;
    await blog.save();
    
    successResponse(res, { liked: true, likes: blog.likes });
  } catch (error) {
    console.error('Error in likeBlog:', error);
    next(error);
  }
};

// Add comment
export const addComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);
    
    if (!content || content.trim().length < 2) {
      return errorResponse(res, 'Comment must be at least 2 characters', 400);
    }
    
    const blog = await Blog.findById(id);
    if (!blog) {
      return errorResponse(res, 'Blog not found', 404);
    }
    
    const comment = {
      user: userId,
      userName: user.name,
      userEmail: user.email,
      content: content.trim(),
      isApproved: false,
      createdAt: new Date()
    };
    
    blog.comments.push(comment);
    await blog.save();
    
    successResponse(res, comment, 'Comment added successfully. Awaiting approval.');
  } catch (error) {
    console.error('Error in addComment:', error);
    next(error);
  }
};

// Get comments for a blog (admin)
export const getComments = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status = 'pending' } = req.query;
    
    const blog = await Blog.findById(id).select('comments title slug');
    if (!blog) {
      return errorResponse(res, 'Blog not found', 404);
    }
    
    let comments = blog.comments;
    if (status === 'pending') {
      comments = comments.filter(c => !c.isApproved);
    } else if (status === 'approved') {
      comments = comments.filter(c => c.isApproved);
    }
    
    successResponse(res, {
      blogId: blog._id,
      blogTitle: blog.title,
      blogSlug: blog.slug,
      comments: comments.sort((a, b) => b.createdAt - a.createdAt)
    });
  } catch (error) {
    console.error('Error in getComments:', error);
    next(error);
  }
};

// Delete comment (admin)
export const deleteComment = async (req, res, next) => {
  try {
    const { blogId, commentId } = req.params;
    
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return errorResponse(res, 'Blog not found', 404);
    }
    
    const commentIndex = blog.comments.findIndex(c => c._id.toString() === commentId);
    if (commentIndex === -1) {
      return errorResponse(res, 'Comment not found', 404);
    }
    
    blog.comments.splice(commentIndex, 1);
    await blog.save();
    
    successResponse(res, null, 'Comment deleted successfully');
  } catch (error) {
    console.error('Error in deleteComment:', error);
    next(error);
  }
};

// Approve comment (admin)
export const approveComment = async (req, res, next) => {
  try {
    const { blogId, commentId } = req.params;
    
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return errorResponse(res, 'Blog not found', 404);
    }
    
    const comment = blog.comments.id(commentId);
    if (!comment) {
      return errorResponse(res, 'Comment not found', 404);
    }
    
    comment.isApproved = true;
    await blog.save();
    
    successResponse(res, comment, 'Comment approved successfully');
  } catch (error) {
    console.error('Error in approveComment:', error);
    next(error);
  }
};

// Bulk approve comments
export const bulkApproveComments = async (req, res, next) => {
  try {
    const { blogId, commentIds } = req.body;
    
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return errorResponse(res, 'Blog not found', 404);
    }
    
    let approvedCount = 0;
    blog.comments.forEach(comment => {
      if (commentIds.includes(comment._id.toString()) && !comment.isApproved) {
        comment.isApproved = true;
        approvedCount++;
      }
    });
    
    await blog.save();
    
    successResponse(res, { approvedCount }, `${approvedCount} comments approved successfully`);
  } catch (error) {
    console.error('Error in bulkApproveComments:', error);
    next(error);
  }
};

// ============================================
// ADMIN ROUTES (Admin only)
// ============================================

// Create blog
export const createBlog = async (req, res, next) => {
  try {
    const { 
      title, excerpt, content, category, tags, 
      featuredImage, gallery, videoUrl, pdfUrl, 
      isPublished, isFeatured, seoTitle, seoDescription, metaKeywords 
    } = req.body;
    
    // Validate required fields
    if (!title || !title.trim()) {
      return errorResponse(res, 'Title is required', 400);
    }
    if (!excerpt || !excerpt.trim()) {
      return errorResponse(res, 'Excerpt is required', 400);
    }
    if (!content || !content.trim()) {
      return errorResponse(res, 'Content is required', 400);
    }
    
    // Generate slug from title
    let slug = slugify(title, { lower: true, strict: true });
    let existingBlog = await Blog.findOne({ slug });
    let counter = 1;
    while (existingBlog) {
      slug = `${slugify(title, { lower: true, strict: true })}-${counter}`;
      existingBlog = await Blog.findOne({ slug });
      counter++;
    }
    
    // Calculate read time
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));
    
    const blogData = {
      title: title.trim(),
      slug,
      excerpt: excerpt.trim(),
      content,
      category: category || 'poetry',
      tags: tags || [],
      featuredImage: featuredImage || '',
      gallery: gallery || [],
      videoUrl: videoUrl || '',
      pdfUrl: pdfUrl || '',
      readTime,
      isPublished: isPublished || false,
      isFeatured: isFeatured || false,
      author: req.user.id,
      authorName: req.user.name,
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt,
      metaKeywords: metaKeywords || '',
      publishedAt: isPublished ? new Date() : null
    };
    
    const blog = await Blog.create(blogData);
    
    const populatedBlog = await Blog.findById(blog._id)
      .populate('author', 'name avatar');
    
    successResponse(res, populatedBlog, 'Blog created successfully', 201);
  } catch (error) {
    console.error('Error in createBlog:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
    }
    
    if (error.code === 11000) {
      return errorResponse(res, 'Blog with this slug already exists', 400);
    }
    
    next(error);
  }
};

// Update blog
export const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const blog = await Blog.findById(id);
    if (!blog) {
      return errorResponse(res, 'Blog not found', 404);
    }
    
    // Update slug if title changed
    if (updates.title && updates.title !== blog.title) {
      let slug = slugify(updates.title, { lower: true, strict: true });
      let existingBlog = await Blog.findOne({ slug, _id: { $ne: id } });
      let counter = 1;
      while (existingBlog) {
        slug = `${slugify(updates.title, { lower: true, strict: true })}-${counter}`;
        existingBlog = await Blog.findOne({ slug, _id: { $ne: id } });
        counter++;
      }
      updates.slug = slug;
    }
    
    // Update publishedAt if being published now
    if (updates.isPublished && !blog.isPublished && !blog.publishedAt) {
      updates.publishedAt = new Date();
    }
    
    // Update read time based on content
    if (updates.content && updates.content !== blog.content) {
      const wordCount = updates.content.split(/\s+/).length;
      updates.readTime = Math.max(1, Math.ceil(wordCount / 200));
    }
    
    // Handle gallery updates - preserve existing if not provided
    if (!updates.gallery) {
      delete updates.gallery;
    }
    
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).populate('author', 'name avatar');
    
    successResponse(res, updatedBlog, 'Blog updated successfully');
  } catch (error) {
    console.error('Error in updateBlog:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
    }
    
    if (error.code === 11000) {
      return errorResponse(res, 'Blog with this slug already exists', 400);
    }
    
    next(error);
  }
};

// Delete blog
export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const blog = await Blog.findById(id);
    if (!blog) {
      return errorResponse(res, 'Blog not found', 404);
    }
    
    await Blog.findByIdAndDelete(id);
    
    successResponse(res, null, 'Blog deleted successfully');
  } catch (error) {
    console.error('Error in deleteBlog:', error);
    next(error);
  }
};

// Bulk delete blogs
export const bulkDeleteBlogs = async (req, res, next) => {
  try {
    const { ids } = req.body;
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return errorResponse(res, 'Please provide an array of blog IDs', 400);
    }
    
    const result = await Blog.deleteMany({ _id: { $in: ids } });
    
    successResponse(res, { deletedCount: result.deletedCount }, `${result.deletedCount} blogs deleted successfully`);
  } catch (error) {
    console.error('Error in bulkDeleteBlogs:', error);
    next(error);
  }
};

// Toggle featured status
export const toggleFeatured = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const blog = await Blog.findById(id);
    if (!blog) {
      return errorResponse(res, 'Blog not found', 404);
    }
    
    blog.isFeatured = !blog.isFeatured;
    await blog.save();
    
    successResponse(res, { isFeatured: blog.isFeatured }, `Blog ${blog.isFeatured ? 'featured' : 'unfeatured'} successfully`);
  } catch (error) {
    console.error('Error in toggleFeatured:', error);
    next(error);
  }
};

// Toggle publish status
export const togglePublish = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const blog = await Blog.findById(id);
    if (!blog) {
      return errorResponse(res, 'Blog not found', 404);
    }
    
    blog.isPublished = !blog.isPublished;
    if (blog.isPublished && !blog.publishedAt) {
      blog.publishedAt = new Date();
    }
    await blog.save();
    
    successResponse(res, { isPublished: blog.isPublished }, `Blog ${blog.isPublished ? 'published' : 'unpublished'} successfully`);
  } catch (error) {
    console.error('Error in togglePublish:', error);
    next(error);
  }
};