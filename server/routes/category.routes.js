import express from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import { cacheMiddleware } from '../middleware/cache.js';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoriesByType
} from '../controllers/category.controller.js';

const router = express.Router();

router.get('/', cacheMiddleware(600), getCategories);
router.get('/type/:type', cacheMiddleware(600), getCategoriesByType);
router.get('/:id', getCategoryById);

router.post('/', protect, adminOnly, createCategory);
router.put('/:id', protect, adminOnly, updateCategory);
router.delete('/:id', protect, adminOnly, deleteCategory);

export default router;
