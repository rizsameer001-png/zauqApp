// import express from 'express';
// import { protect, adminOnly } from '../middleware/auth.js';
// import { cacheMiddleware } from '../middleware/cache.js';
// import {
//   getCategories,
//   getCategoryById,
//   createCategory,
//   updateCategory,
//   deleteCategory,
//   getCategoriesByType
// } from '../controllers/category.controller.js';

// const router = express.Router();

// router.get('/', cacheMiddleware(600), getCategories);
// router.get('/type/:type', cacheMiddleware(600), getCategoriesByType);
// router.get('/:id', getCategoryById);

// router.post('/', protect, adminOnly, createCategory);
// router.put('/:id', protect, adminOnly, updateCategory);
// router.delete('/:id', protect, adminOnly, deleteCategory);

// export default router;




// server/routes/category.routes.js
import express from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import {
  getCategories,
  getCategoriesByType,
  getCategoryById,
  getCategoryBySlug,
  getCategoryTree,
  getCategoryStats,
  createCategory,
  bulkCreateCategories,
  updateCategory,
  updateCategoryOrder,
  deleteCategory,
  toggleCategoryStatus
} from '../controllers/category.controller.js';

const router = express.Router();

// Public routes
router.get('/', getCategories);
router.get('/stats', getCategoryStats);
router.get('/tree', getCategoryTree);
router.get('/type/:type', getCategoriesByType);
router.get('/slug/:slug', getCategoryBySlug);
router.get('/:id', getCategoryById);

// Admin only routes
router.post('/', protect, adminOnly, createCategory);
router.post('/bulk', protect, adminOnly, bulkCreateCategories);
router.put('/order', protect, adminOnly, updateCategoryOrder);
router.put('/:id', protect, adminOnly, updateCategory);
router.patch('/:id/toggle', protect, adminOnly, toggleCategoryStatus);
router.delete('/:id', protect, adminOnly, deleteCategory);

export default router;