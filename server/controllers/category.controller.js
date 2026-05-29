import Category from '../models/Category.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true })
      .populate('parent', 'name slug')
      .sort({ order: 1, name: 1 });

    successResponse(res, categories);
  } catch (error) {
    next(error);
  }
};

export const getCategoriesByType = async (req, res, next) => {
  try {
    const categories = await Category.find({ 
      type: req.params.type, 
      isActive: true 
    })
      .populate('parent', 'name slug')
      .sort({ order: 1 });

    successResponse(res, categories);
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate('parent', 'name slug');

    if (!category) {
      return errorResponse(res, 'Category not found', 404);
    }

    successResponse(res, category);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    successResponse(res, category, 'Category created', 201);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    successResponse(res, category, 'Category updated');
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    successResponse(res, null, 'Category deleted');
  } catch (error) {
    next(error);
  }
};
