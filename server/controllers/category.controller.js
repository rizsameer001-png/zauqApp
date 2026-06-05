// import Category from '../models/Category.js';
// import { successResponse, errorResponse } from '../utils/response.js';

// export const getCategories = async (req, res, next) => {
//   try {
//     const categories = await Category.find({ isActive: true })
//       .populate('parent', 'name slug')
//       .sort({ order: 1, name: 1 });

//     successResponse(res, categories);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getCategoriesByType = async (req, res, next) => {
//   try {
//     const categories = await Category.find({ 
//       type: req.params.type, 
//       isActive: true 
//     })
//       .populate('parent', 'name slug')
//       .sort({ order: 1 });

//     successResponse(res, categories);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getCategoryById = async (req, res, next) => {
//   try {
//     const category = await Category.findById(req.params.id)
//       .populate('parent', 'name slug');

//     if (!category) {
//       return errorResponse(res, 'Category not found', 404);
//     }

//     successResponse(res, category);
//   } catch (error) {
//     next(error);
//   }
// };

// export const createCategory = async (req, res, next) => {
//   try {
//     const category = await Category.create(req.body);
//     successResponse(res, category, 'Category created', 201);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateCategory = async (req, res, next) => {
//   try {
//     const category = await Category.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );
//     successResponse(res, category, 'Category updated');
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteCategory = async (req, res, next) => {
//   try {
//     await Category.findByIdAndDelete(req.params.id);
//     successResponse(res, null, 'Category deleted');
//   } catch (error) {
//     next(error);
//   }
// };












// // server/controllers/category.controller.js
// import Category from '../models/Category.js';
// import { successResponse, errorResponse } from '../utils/response.js';
// import slugify from 'slugify';

// // Get all categories
// export const getCategories = async (req, res, next) => {
//   try {
//     const { isActive, parent, type } = req.query;
//     const filter = {};
    
//     if (isActive !== undefined) filter.isActive = isActive === 'true';
//     if (parent !== undefined) {
//       if (parent === 'null' || parent === '') filter.parent = null;
//       else filter.parent = parent;
//     }
//     if (type !== undefined) filter.type = type;
    
//     const categories = await Category.find(filter)
//       .populate('parent', 'name slug')
//       .sort({ order: 1, name: 1 });

//     successResponse(res, categories);
//   } catch (error) {
//     console.error('Error in getCategories:', error);
//     next(error);
//   }
// };

// // Get categories by type
// export const getCategoriesByType = async (req, res, next) => {
//   try {
//     const { type } = req.params;
//     const { isActive = 'true' } = req.query;
    
//     const filter = { 
//       type: type,
//       isActive: isActive === 'true'
//     };
    
//     const categories = await Category.find(filter)
//       .populate('parent', 'name slug')
//       .sort({ order: 1, name: 1 });

//     successResponse(res, categories);
//   } catch (error) {
//     console.error('Error in getCategoriesByType:', error);
//     next(error);
//   }
// };

// // Get category by ID
// export const getCategoryById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const category = await Category.findById(id)
//       .populate('parent', 'name slug')
//       .populate('children', 'name slug');

//     if (!category) {
//       return errorResponse(res, 'Category not found', 404);
//     }

//     successResponse(res, category);
//   } catch (error) {
//     console.error('Error in getCategoryById:', error);
//     next(error);
//   }
// };

// // Get category by slug
// export const getCategoryBySlug = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const category = await Category.findOne({ slug, isActive: true })
//       .populate('parent', 'name slug')
//       .populate('children', 'name slug');

//     if (!category) {
//       return errorResponse(res, 'Category not found', 404);
//     }

//     successResponse(res, category);
//   } catch (error) {
//     console.error('Error in getCategoryBySlug:', error);
//     next(error);
//   }
// };

// // Create category
// export const createCategory = async (req, res, next) => {
//   try {
//     const { name, description, icon, color, parent, order, type, isActive, isFeatured, seoTitle, seoDescription, metaKeywords } = req.body;
    
//     // Validate required fields
//     if (!name || !name.trim()) {
//       return errorResponse(res, 'Category name is required', 400);
//     }
    
//     // Generate slug from name
//     let slug = slugify(name, { lower: true, strict: true });
    
//     // Check if slug already exists and make it unique
//     let existingCategory = await Category.findOne({ slug });
//     let counter = 1;
//     while (existingCategory) {
//       slug = `${slugify(name, { lower: true, strict: true })}-${counter}`;
//       existingCategory = await Category.findOne({ slug });
//       counter++;
//     }
    
//     // Check if name already exists (case insensitive)
//     const existingName = await Category.findOne({ 
//       name: { $regex: new RegExp(`^${name.trim()}$`, 'i') } 
//     });
//     if (existingName) {
//       return errorResponse(res, 'Category with this name already exists', 400);
//     }
    
//     const categoryData = {
//       name: name.trim(),
//       slug,
//       description: description || '',
//       icon: icon || '📁',
//       color: color || '#6366f1',
//       parent: parent || null,
//       order: order || 0,
//       type: type || 'audio',
//       isActive: isActive !== false,
//       isFeatured: isFeatured || false,
//       seoTitle: seoTitle || name,
//       seoDescription: seoDescription || description,
//       metaKeywords: metaKeywords || name.toLowerCase()
//     };
    
//     const category = await Category.create(categoryData);
    
//     const populatedCategory = await Category.findById(category._id)
//       .populate('parent', 'name slug');
    
//     successResponse(res, populatedCategory, 'Category created successfully', 201);
//   } catch (error) {
//     console.error('Error in createCategory:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
//     }
    
//     if (error.code === 11000) {
//       return errorResponse(res, 'Category with this name or slug already exists', 400);
//     }
    
//     next(error);
//   }
// };

// // Update category
// export const updateCategory = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { name, description, icon, color, parent, order, type, isActive, isFeatured, seoTitle, seoDescription, metaKeywords } = req.body;
    
//     const category = await Category.findById(id);
//     if (!category) {
//       return errorResponse(res, 'Category not found', 404);
//     }
    
//     // Update fields
//     if (name && name.trim() !== category.name) {
//       // Check if new name already exists
//       const existingName = await Category.findOne({ 
//         name: { $regex: new RegExp(`^${name.trim()}$`, 'i') },
//         _id: { $ne: id }
//       });
//       if (existingName) {
//         return errorResponse(res, 'Category with this name already exists', 400);
//       }
//       category.name = name.trim();
//       category.slug = slugify(name, { lower: true, strict: true });
//     }
    
//     if (description !== undefined) category.description = description;
//     if (icon) category.icon = icon;
//     if (color) category.color = color;
//     if (parent !== undefined) category.parent = parent === 'null' || parent === '' ? null : parent;
//     if (order !== undefined) category.order = order;
//     if (type) category.type = type;
//     if (isActive !== undefined) category.isActive = isActive;
//     if (isFeatured !== undefined) category.isFeatured = isFeatured;
//     if (seoTitle) category.seoTitle = seoTitle;
//     if (seoDescription) category.seoDescription = seoDescription;
//     if (metaKeywords) category.metaKeywords = metaKeywords;
    
//     await category.save();
    
//     const updatedCategory = await Category.findById(id)
//       .populate('parent', 'name slug');
    
//     successResponse(res, updatedCategory, 'Category updated successfully');
//   } catch (error) {
//     console.error('Error in updateCategory:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
//     }
    
//     if (error.code === 11000) {
//       return errorResponse(res, 'Category with this name or slug already exists', 400);
//     }
    
//     next(error);
//   }
// };

// // Delete category
// export const deleteCategory = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const category = await Category.findById(id);
//     if (!category) {
//       return errorResponse(res, 'Category not found', 404);
//     }
    
//     // Check if category has children/subcategories
//     const hasChildren = await Category.findOne({ parent: id });
//     if (hasChildren) {
//       return errorResponse(res, 'Cannot delete category with subcategories. Please reassign or delete subcategories first.', 400);
//     }
    
//     // Check if category is being used by any audio
//     const Audio = mongoose.model('Audio');
//     const audioCount = await Audio.countDocuments({ category: id });
//     if (audioCount > 0) {
//       return errorResponse(res, `Cannot delete category that is used by ${audioCount} audio items. Please reassign or delete those items first.`, 400);
//     }
    
//     await Category.findByIdAndDelete(id);
    
//     successResponse(res, null, 'Category deleted successfully');
//   } catch (error) {
//     console.error('Error in deleteCategory:', error);
//     next(error);
//   }
// };

// // Bulk create categories
// export const bulkCreateCategories = async (req, res, next) => {
//   try {
//     const { categories } = req.body;
    
//     if (!categories || !Array.isArray(categories) || categories.length === 0) {
//       return errorResponse(res, 'Please provide an array of categories', 400);
//     }
    
//     const results = {
//       successful: [],
//       failed: []
//     };
    
//     for (const categoryData of categories) {
//       try {
//         if (!categoryData.name) {
//           throw new Error('Category name is required');
//         }
        
//         // Generate slug
//         let slug = slugify(categoryData.name, { lower: true, strict: true });
//         let existingCategory = await Category.findOne({ slug });
//         let counter = 1;
//         while (existingCategory) {
//           slug = `${slugify(categoryData.name, { lower: true, strict: true })}-${counter}`;
//           existingCategory = await Category.findOne({ slug });
//           counter++;
//         }
        
//         const category = await Category.create({
//           name: categoryData.name.trim(),
//           slug,
//           description: categoryData.description || '',
//           icon: categoryData.icon || '📁',
//           color: categoryData.color || '#6366f1',
//           parent: categoryData.parent || null,
//           order: categoryData.order || 0,
//           type: categoryData.type || 'audio',
//           isActive: categoryData.isActive !== false,
//           isFeatured: categoryData.isFeatured || false
//         });
        
//         results.successful.push({ id: category._id, name: category.name });
//       } catch (error) {
//         results.failed.push({ data: categoryData, error: error.message });
//       }
//     }
    
//     successResponse(res, results, `Successfully created ${results.successful.length} of ${categories.length} categories`);
//   } catch (error) {
//     console.error('Error in bulkCreateCategories:', error);
//     next(error);
//   }
// };

// // Get category tree (hierarchical)
// export const getCategoryTree = async (req, res, next) => {
//   try {
//     const { type = 'audio' } = req.query;
    
//     // Get all categories
//     const categories = await Category.find({ 
//       type, 
//       isActive: true 
//     }).sort({ order: 1, name: 1 });
    
//     // Build tree structure
//     const categoryMap = {};
//     const roots = [];
    
//     categories.forEach(category => {
//       categoryMap[category._id] = { ...category.toObject(), children: [] };
//     });
    
//     categories.forEach(category => {
//       if (category.parent && categoryMap[category.parent]) {
//         categoryMap[category.parent].children.push(categoryMap[category._id]);
//       } else {
//         roots.push(categoryMap[category._id]);
//       }
//     });
    
//     successResponse(res, roots);
//   } catch (error) {
//     console.error('Error in getCategoryTree:', error);
//     next(error);
//   }
// };

// // Update category order
// export const updateCategoryOrder = async (req, res, next) => {
//   try {
//     const { categories } = req.body;
    
//     if (!categories || !Array.isArray(categories)) {
//       return errorResponse(res, 'Please provide an array of categories with order', 400);
//     }
    
//     const updates = [];
//     for (const item of categories) {
//       if (item.id && typeof item.order === 'number') {
//         const category = await Category.findByIdAndUpdate(
//           item.id,
//           { order: item.order },
//           { new: true }
//         );
//         if (category) updates.push(category);
//       }
//     }
    
//     successResponse(res, updates, 'Category order updated successfully');
//   } catch (error) {
//     console.error('Error in updateCategoryOrder:', error);
//     next(error);
//   }
// };

// // Toggle category status (active/inactive)
// export const toggleCategoryStatus = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const category = await Category.findById(id);
//     if (!category) {
//       return errorResponse(res, 'Category not found', 404);
//     }
    
//     category.isActive = !category.isActive;
//     await category.save();
    
//     successResponse(res, category, `Category ${category.isActive ? 'activated' : 'deactivated'} successfully`);
//   } catch (error) {
//     console.error('Error in toggleCategoryStatus:', error);
//     next(error);
//   }
// };

// // Get category stats
// export const getCategoryStats = async (req, res, next) => {
//   try {
//     const totalCategories = await Category.countDocuments();
//     const activeCategories = await Category.countDocuments({ isActive: true });
//     const featuredCategories = await Category.countDocuments({ isFeatured: true });
    
//     // Get category type distribution
//     const typeDistribution = await Category.aggregate([
//       { $group: { _id: '$type', count: { $sum: 1 } } }
//     ]);
    
//     successResponse(res, {
//       total: totalCategories,
//       active: activeCategories,
//       inactive: totalCategories - activeCategories,
//       featured: featuredCategories,
//       typeDistribution
//     });
//   } catch (error) {
//     console.error('Error in getCategoryStats:', error);
//     next(error);
//   }
// };















import mongoose from 'mongoose';
import Category from '../models/Category.js';
import { successResponse, errorResponse } from '../utils/response.js';
import slugify from 'slugify';

// Get all categories
export const getCategories = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, isActive, parentCategory, type } = req.query;
    const filter = {};
    
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (parentCategory !== undefined) {
      if (parentCategory === 'null' || parentCategory === '') filter.parentCategory = null;
      else filter.parentCategory = parentCategory;
    }
    if (type !== undefined) filter.type = type;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const categories = await Category.find(filter)
      .populate('parentCategory', 'name slug')
      .sort({ order: 1, name: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Category.countDocuments(filter);
    
    successResponse(res, {
      data: categories,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error in getCategories:', error);
    next(error);
  }
};

// Get categories by type
export const getCategoriesByType = async (req, res, next) => {
  try {
    const { type } = req.params;
    const { isActive = 'true' } = req.query;
    
    const filter = { 
      type: type,
      isActive: isActive === 'true'
    };
    
    const categories = await Category.find(filter)
      .populate('parentCategory', 'name slug')
      .sort({ order: 1, name: 1 });

    successResponse(res, categories);
  } catch (error) {
    console.error('Error in getCategoriesByType:', error);
    next(error);
  }
};

// Get category by ID
export const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const category = await Category.findById(id)
      .populate('parentCategory', 'name slug');

    if (!category) {
      return errorResponse(res, 'Category not found', 404);
    }

    // Get children count
    const childrenCount = await Category.countDocuments({ parentCategory: id });
    
    successResponse(res, {
      ...category.toObject(),
      childrenCount
    });
  } catch (error) {
    console.error('Error in getCategoryById:', error);
    next(error);
  }
};

// Get category by slug
export const getCategoryBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    const category = await Category.findOne({ slug, isActive: true })
      .populate('parentCategory', 'name slug');

    if (!category) {
      return errorResponse(res, 'Category not found', 404);
    }

    successResponse(res, category);
  } catch (error) {
    console.error('Error in getCategoryBySlug:', error);
    next(error);
  }
};

// Create category
export const createCategory = async (req, res, next) => {
  try {
    const { name, description, icon, color, parentCategory, order, type, isActive, isFeatured, seoTitle, seoDescription, metaKeywords } = req.body;
    
    // Validate required fields
    if (!name || !name.trim()) {
      return errorResponse(res, 'Category name is required', 400);
    }
    
    // Generate slug from name
    let slug = slugify(name, { lower: true, strict: true });
    
    // Check if slug already exists and make it unique
    let existingCategory = await Category.findOne({ slug });
    let counter = 1;
    while (existingCategory) {
      slug = `${slugify(name, { lower: true, strict: true })}-${counter}`;
      existingCategory = await Category.findOne({ slug });
      counter++;
    }
    
    // Check if name already exists (case insensitive)
    const existingName = await Category.findOne({ 
      name: { $regex: new RegExp(`^${name.trim()}$`, 'i') } 
    });
    if (existingName) {
      return errorResponse(res, 'Category with this name already exists', 400);
    }
    
    const categoryData = {
      name: name.trim(),
      slug,
      description: description || '',
      icon: icon || '📁',
      color: color || '#6366f1',
      parentCategory: parentCategory || null,
      order: order || 0,
      type: type || 'audio',
      isActive: isActive !== false,
      isFeatured: isFeatured || false,
      seoTitle: seoTitle || name,
      seoDescription: seoDescription || description,
      metaKeywords: metaKeywords || name.toLowerCase()
    };
    
    const category = await Category.create(categoryData);
    
    const populatedCategory = await Category.findById(category._id)
      .populate('parentCategory', 'name slug');
    
    successResponse(res, populatedCategory, 'Category created successfully', 201);
  } catch (error) {
    console.error('Error in createCategory:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
    }
    
    if (error.code === 11000) {
      return errorResponse(res, 'Category with this name or slug already exists', 400);
    }
    
    next(error);
  }
};

// Update category
export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, icon, color, parentCategory, order, type, isActive, isFeatured, seoTitle, seoDescription, metaKeywords } = req.body;
    
    const category = await Category.findById(id);
    if (!category) {
      return errorResponse(res, 'Category not found', 404);
    }
    
    // Prevent self-parenting
    if (parentCategory && parentCategory === id) {
      return errorResponse(res, 'Category cannot be its own parent', 400);
    }
    
    // Update fields
    if (name && name.trim() !== category.name) {
      // Check if new name already exists
      const existingName = await Category.findOne({ 
        name: { $regex: new RegExp(`^${name.trim()}$`, 'i') },
        _id: { $ne: id }
      });
      if (existingName) {
        return errorResponse(res, 'Category with this name already exists', 400);
      }
      category.name = name.trim();
      category.slug = slugify(name, { lower: true, strict: true });
    }
    
    if (description !== undefined) category.description = description;
    if (icon) category.icon = icon;
    if (color) category.color = color;
    if (parentCategory !== undefined) category.parentCategory = parentCategory === 'null' || parentCategory === '' ? null : parentCategory;
    if (order !== undefined) category.order = order;
    if (type) category.type = type;
    if (isActive !== undefined) category.isActive = isActive;
    if (isFeatured !== undefined) category.isFeatured = isFeatured;
    if (seoTitle) category.seoTitle = seoTitle;
    if (seoDescription) category.seoDescription = seoDescription;
    if (metaKeywords) category.metaKeywords = metaKeywords;
    
    await category.save();
    
    const updatedCategory = await Category.findById(id)
      .populate('parentCategory', 'name slug');
    
    successResponse(res, updatedCategory, 'Category updated successfully');
  } catch (error) {
    console.error('Error in updateCategory:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
    }
    
    if (error.code === 11000) {
      return errorResponse(res, 'Category with this name or slug already exists', 400);
    }
    
    next(error);
  }
};

// Delete category
export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const category = await Category.findById(id);
    if (!category) {
      return errorResponse(res, 'Category not found', 404);
    }
    
    // Check if category has children/subcategories
    const hasChildren = await Category.findOne({ parentCategory: id });
    if (hasChildren) {
      return errorResponse(res, 'Cannot delete category with subcategories. Please reassign or delete subcategories first.', 400);
    }
    
    // Dynamically import Audio model to avoid circular dependency
    const Audio = mongoose.model('Audio');
    const audioCount = await Audio.countDocuments({ category: id });
    if (audioCount > 0) {
      return errorResponse(res, `Cannot delete category that is used by ${audioCount} audio items. Please reassign or delete those items first.`, 400);
    }
    
    await Category.findByIdAndDelete(id);
    
    successResponse(res, null, 'Category deleted successfully');
  } catch (error) {
    console.error('Error in deleteCategory:', error);
    next(error);
  }
};

// Get category tree
export const getCategoryTree = async (req, res, next) => {
  try {
    const { type = 'audio' } = req.query;
    
    // Get all categories
    const categories = await Category.find({ 
      type, 
      isActive: true 
    }).sort({ order: 1, name: 1 });
    
    // Build tree structure
    const categoryMap = {};
    const roots = [];
    
    categories.forEach(category => {
      categoryMap[category._id.toString()] = { ...category.toObject(), children: [] };
    });
    
    categories.forEach(category => {
      if (category.parentCategory && categoryMap[category.parentCategory.toString()]) {
        categoryMap[category.parentCategory.toString()].children.push(categoryMap[category._id.toString()]);
      } else {
        roots.push(categoryMap[category._id.toString()]);
      }
    });
    
    successResponse(res, roots);
  } catch (error) {
    console.error('Error in getCategoryTree:', error);
    next(error);
  }
};

// Get category stats
export const getCategoryStats = async (req, res, next) => {
  try {
    const totalCategories = await Category.countDocuments();
    const activeCategories = await Category.countDocuments({ isActive: true });
    const featuredCategories = await Category.countDocuments({ isFeatured: true });
    
    // Get category type distribution
    const typeDistribution = await Category.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);
    
    successResponse(res, {
      total: totalCategories,
      active: activeCategories,
      inactive: totalCategories - activeCategories,
      featured: featuredCategories,
      typeDistribution
    });
  } catch (error) {
    console.error('Error in getCategoryStats:', error);
    next(error);
  }
};

// Update category order
export const updateCategoryOrder = async (req, res, next) => {
  try {
    const { categories } = req.body;
    
    if (!categories || !Array.isArray(categories)) {
      return errorResponse(res, 'Please provide an array of categories with order', 400);
    }
    
    const updates = [];
    for (const item of categories) {
      if (item.id && typeof item.order === 'number') {
        const category = await Category.findByIdAndUpdate(
          item.id,
          { order: item.order },
          { new: true }
        );
        if (category) updates.push(category);
      }
    }
    
    successResponse(res, updates, 'Category order updated successfully');
  } catch (error) {
    console.error('Error in updateCategoryOrder:', error);
    next(error);
  }
};

// Toggle category status
export const toggleCategoryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const category = await Category.findById(id);
    if (!category) {
      return errorResponse(res, 'Category not found', 404);
    }
    
    category.isActive = !category.isActive;
    await category.save();
    
    successResponse(res, category, `Category ${category.isActive ? 'activated' : 'deactivated'} successfully`);
  } catch (error) {
    console.error('Error in toggleCategoryStatus:', error);
    next(error);
  }
};

// Bulk create categories
export const bulkCreateCategories = async (req, res, next) => {
  try {
    const { categories } = req.body;
    
    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      return errorResponse(res, 'Please provide an array of categories', 400);
    }
    
    const results = {
      successful: [],
      failed: []
    };
    
    for (const categoryData of categories) {
      try {
        if (!categoryData.name) {
          throw new Error('Category name is required');
        }
        
        // Generate slug
        let slug = slugify(categoryData.name, { lower: true, strict: true });
        let existingCategory = await Category.findOne({ slug });
        let counter = 1;
        while (existingCategory) {
          slug = `${slugify(categoryData.name, { lower: true, strict: true })}-${counter}`;
          existingCategory = await Category.findOne({ slug });
          counter++;
        }
        
        const category = await Category.create({
          name: categoryData.name.trim(),
          slug,
          description: categoryData.description || '',
          icon: categoryData.icon || '📁',
          color: categoryData.color || '#6366f1',
          parentCategory: categoryData.parentCategory || null,
          order: categoryData.order || 0,
          type: categoryData.type || 'audio',
          isActive: categoryData.isActive !== false,
          isFeatured: categoryData.isFeatured || false
        });
        
        results.successful.push({ id: category._id, name: category.name });
      } catch (error) {
        results.failed.push({ data: categoryData, error: error.message });
      }
    }
    
    successResponse(res, results, `Successfully created ${results.successful.length} of ${categories.length} categories`);
  } catch (error) {
    console.error('Error in bulkCreateCategories:', error);
    next(error);
  }
};