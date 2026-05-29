// import express from 'express';
// import { protect } from '../middleware/auth.js';
// import {
//   getPlans,
//   getCurrentSubscription,
//   subscribe,
//   cancelSubscription,
//   getBillingHistory,
//   verifyPayment,
//   getSubscriptionFeatures
// } from '../controllers/subscription.controller.js';

// const router = express.Router();

// router.get('/plans', getPlans);
// router.get('/features', getSubscriptionFeatures);
// router.get('/current', protect, getCurrentSubscription);
// router.get('/billing-history', protect, getBillingHistory);
// router.post('/subscribe', protect, subscribe);
// router.post('/verify-payment', protect, verifyPayment);
// router.post('/cancel', protect, cancelSubscription);

// export default router;







// import express from 'express';
// import { protect } from '../middleware/auth.js';
// import { authorize } from '../middleware/auth.js';
// import {
//   getPlans,
//   getCurrentSubscription,
//   subscribe,
//   cancelSubscription,
//   getBillingHistory,
//   verifyPayment,
//   getSubscriptionFeatures,
//   // CMS functions
//   getAllPlansCMS,
//   getPlanByIdCMS,
//   createPlanCMS,
//   updatePlanCMS,
//   deletePlanCMS,
//   togglePlanStatusCMS,
//   reorderPlansCMS,
//   getSubscriptionStatsCMS
// } from '../controllers/subscription.controller.js';

// const router = express.Router();

// // Public routes
// router.get('/plans', getPlans);
// router.get('/features', getSubscriptionFeatures);

// // User routes (protected)
// router.get('/current', protect, getCurrentSubscription);
// router.get('/billing-history', protect, getBillingHistory);
// router.post('/subscribe', protect, subscribe);
// router.post('/verify-payment', protect, verifyPayment);
// router.post('/cancel', protect, cancelSubscription);

// // ============== CMS Routes (Admin only) ==============
// router.get('/cms/plans', protect, authorize('admin', 'superadmin'), getAllPlansCMS);
// router.get('/cms/plans/:id', protect, authorize('admin', 'superadmin'), getPlanByIdCMS);
// router.post('/cms/plans', protect, authorize('admin', 'superadmin'), createPlanCMS);
// router.put('/cms/plans/:id', protect, authorize('admin', 'superadmin'), updatePlanCMS);
// router.delete('/cms/plans/:id', protect, authorize('admin', 'superadmin'), deletePlanCMS);
// router.patch('/cms/plans/:id/toggle', protect, authorize('admin', 'superadmin'), togglePlanStatusCMS);
// router.post('/cms/plans/reorder', protect, authorize('admin', 'superadmin'), reorderPlansCMS);
// router.get('/cms/stats', protect, authorize('admin', 'superadmin'), getSubscriptionStatsCMS);

// export default router;






// import express from 'express';
// import { protect } from '../middleware/auth.js';
// import {
//   getPlans,
//   getCurrentSubscription,
//   subscribe,
//   cancelSubscription,
//   getBillingHistory,
//   verifyPayment,
//   getSubscriptionFeatures,
//   // CMS functions
//   getAllPlansCMS,
//   getPlanByIdCMS,
//   createPlanCMS,
//   updatePlanCMS,
//   deletePlanCMS,
//   togglePlanStatusCMS,
//   reorderPlansCMS,
//   getSubscriptionStatsCMS
// } from '../controllers/subscription.controller.js';

// const router = express.Router();

// // Public routes
// router.get('/plans', getPlans);
// router.get('/features', getSubscriptionFeatures);

// // User routes (protected)
// router.get('/current', protect, getCurrentSubscription);
// router.get('/billing-history', protect, getBillingHistory);
// router.post('/subscribe', protect, subscribe);
// router.post('/verify-payment', protect, verifyPayment);
// router.post('/cancel', protect, cancelSubscription);

// // ============== CMS Routes (Admin only) ==============
// // Inline authorization check for admin routes
// const adminAuth = (req, res, next) => {
//   if (!req.user || !['admin', 'superadmin'].includes(req.user.role)) {
//     return res.status(403).json({
//       success: false,
//       message: 'Admin access required'
//     });
//   }
//   next();
// };

// router.get('/cms/plans', protect, adminAuth, getAllPlansCMS);
// router.get('/cms/plans/:id', protect, adminAuth, getPlanByIdCMS);
// router.post('/cms/plans', protect, adminAuth, createPlanCMS);
// router.put('/cms/plans/:id', protect, adminAuth, updatePlanCMS);
// router.delete('/cms/plans/:id', protect, adminAuth, deletePlanCMS);
// router.patch('/cms/plans/:id/toggle', protect, adminAuth, togglePlanStatusCMS);
// router.post('/cms/plans/reorder', protect, adminAuth, reorderPlansCMS);
// router.get('/cms/stats', protect, adminAuth, getSubscriptionStatsCMS);

// export default router;




















// // server/routes/subscription.routes.js
// import express from 'express';
// import { protect, adminOnly } from '../middleware/auth.js';
// import {
//   getPlans,
//   getPlanById,
//   createPlan,
//   updatePlan,
//   deletePlan,
//   getStats,
//   reorderPlans,
//   togglePlanStatus,
//   getCurrentSubscription,
//   subscribe,
//   cancelSubscription,
//   getBillingHistory,
//   verifyPayment,
//   getSubscriptionFeatures,
//   // CMS functions
//   getAllPlansCMS,
//   getPlanByIdCMS,
//   createPlanCMS,
//   updatePlanCMS,
//   deletePlanCMS,
//   togglePlanStatusCMS,
//   reorderPlansCMS,
//   getSubscriptionStatsCMS
// } from '../controllers/subscription.controller.js';

// const router = express.Router();

// // ============== Public Routes ==============
// router.get('/plans', getPlans);
// router.get('/features', getSubscriptionFeatures);
// router.get('/stats', getStats);

// // ============== User Protected Routes ==============
// router.get('/current', protect, getCurrentSubscription);
// router.get('/billing-history', protect, getBillingHistory);
// router.post('/subscribe', protect, subscribe);
// router.post('/verify-payment', protect, verifyPayment);
// router.post('/cancel', protect, cancelSubscription);

// // ============== Admin CMS Routes ==============
// // Plan Management
// router.get('/cms/plans', protect, adminOnly, getAllPlansCMS);
// router.get('/cms/plans/:id', protect, adminOnly, getPlanByIdCMS);
// router.post('/cms/plans', protect, adminOnly, createPlanCMS);
// router.put('/cms/plans/:id', protect, adminOnly, updatePlanCMS);
// router.delete('/cms/plans/:id', protect, adminOnly, deletePlanCMS);
// router.patch('/cms/plans/:id/toggle', protect, adminOnly, togglePlanStatusCMS);
// router.post('/cms/plans/reorder', protect, adminOnly, reorderPlansCMS);

// // Statistics
// router.get('/cms/stats', protect, adminOnly, getSubscriptionStatsCMS);

// // Alternative admin routes (without /cms prefix)
// router.post('/plans', protect, adminOnly, createPlan);
// router.put('/plans/:id', protect, adminOnly, updatePlan);
// router.delete('/plans/:id', protect, adminOnly, deletePlan);
// router.patch('/plans/:id/toggle', protect, adminOnly, togglePlanStatus);
// router.post('/plans/reorder', protect, adminOnly, reorderPlans);

// export default router;




















// // server/routes/subscription.routes.js
// import express from 'express';
// import { protect, adminOnly } from '../middleware/auth.js';
// import {
//   // Public routes
//   getPlans,
//   getSubscriptionFeatures,
//   // User routes
//   getCurrentSubscription,
//   subscribe,
//   verifyPayment,
//   cancelSubscription,
//   getBillingHistory,
//   // CMS routes (Admin only)
//   getAllPlansCMS,
//   getPlanByIdCMS,
//   createPlanCMS,
//   updatePlanCMS,
//   deletePlanCMS,
//   togglePlanStatusCMS,
//   reorderPlansCMS,
//   getSubscriptionStatsCMS
// } from '../controllers/subscription.controller.js';

// const router = express.Router();

// // ============== Public Routes ==============
// router.get('/plans', getPlans);
// router.get('/features', getSubscriptionFeatures);

// // ============== User Protected Routes ==============
// router.get('/current', protect, getCurrentSubscription);
// router.get('/billing-history', protect, getBillingHistory);
// router.post('/subscribe', protect, subscribe);
// router.post('/verify-payment', protect, verifyPayment);
// router.post('/cancel', protect, cancelSubscription);

// // ============== Admin CMS Routes ==============
// // Plan Management
// router.get('/cms/plans', protect, adminOnly, getAllPlansCMS);
// router.get('/cms/plans/:id', protect, adminOnly, getPlanByIdCMS);
// router.post('/cms/plans', protect, adminOnly, createPlanCMS);
// router.put('/cms/plans/:id', protect, adminOnly, updatePlanCMS);
// router.delete('/cms/plans/:id', protect, adminOnly, deletePlanCMS);
// router.patch('/cms/plans/:id/toggle', protect, adminOnly, togglePlanStatusCMS);
// router.post('/cms/plans/reorder', protect, adminOnly, reorderPlansCMS);

// // Statistics
// router.get('/cms/stats', protect, adminOnly, getSubscriptionStatsCMS);

// export default router;











// server/routes/subscription.routes.js
import express from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import {
  // Public routes
  getPlans,
  getSubscriptionFeatures,
  // User routes
  getCurrentSubscription,
  subscribe,
  verifyPayment,
  cancelSubscription,
  getBillingHistory,
  // CMS routes (Admin only)
  getAllPlansCMS,
  getPlanByIdCMS,
  createPlanCMS,
  updatePlanCMS,
  deletePlanCMS,
  togglePlanStatusCMS,
  reorderPlansCMS,
  getSubscriptionStatsCMS,
  // Subscribers routes
  getAllSubscribers,
  getSubscriberById,
  // Transactions routes
  getAllTransactions,
  getTransactionById,
  getTransactionStats
} from '../controllers/subscription.controller.js';

const router = express.Router();

// ============== Public Routes ==============
router.get('/plans', getPlans);
router.get('/features', getSubscriptionFeatures);

// ============== User Protected Routes ==============
router.get('/current', protect, getCurrentSubscription);
router.get('/billing-history', protect, getBillingHistory);
router.post('/subscribe', protect, subscribe);
router.post('/verify-payment', protect, verifyPayment);
router.post('/cancel', protect, cancelSubscription);

// ============== Admin CMS Routes ==============
// Plan Management
router.get('/cms/plans', protect, adminOnly, getAllPlansCMS);
router.get('/cms/plans/:id', protect, adminOnly, getPlanByIdCMS);
router.post('/cms/plans', protect, adminOnly, createPlanCMS);
router.put('/cms/plans/:id', protect, adminOnly, updatePlanCMS);
router.delete('/cms/plans/:id', protect, adminOnly, deletePlanCMS);
router.patch('/cms/plans/:id/toggle', protect, adminOnly, togglePlanStatusCMS);
router.post('/cms/plans/reorder', protect, adminOnly, reorderPlansCMS);

// Statistics
router.get('/cms/stats', protect, adminOnly, getSubscriptionStatsCMS);

// ============== Subscribers Management Routes ==============
router.get('/cms/subscribers', protect, adminOnly, getAllSubscribers);
router.get('/cms/subscribers/:id', protect, adminOnly, getSubscriberById);

// ============== Transactions Management Routes ==============
router.get('/cms/transactions', protect, adminOnly, getAllTransactions);
router.get('/cms/transactions/:id', protect, adminOnly, getTransactionById);
router.get('/cms/transactions/stats', protect, adminOnly, getTransactionStats);

export default router;