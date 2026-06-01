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
//   getSubscriptionStatsCMS,
//   // Subscribers routes
//   getAllSubscribers,
//   getSubscriberById,
//   // Transactions routes
//   getAllTransactions,
//   getTransactionById,
//   getTransactionStats
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

// // ============== Subscribers Management Routes ==============
// router.get('/cms/subscribers', protect, adminOnly, getAllSubscribers);
// router.get('/cms/subscribers/:id', protect, adminOnly, getSubscriberById);

// // ============== Transactions Management Routes ==============
// router.get('/cms/transactions', protect, adminOnly, getAllTransactions);
// router.get('/cms/transactions/:id', protect, adminOnly, getTransactionById);
// router.get('/cms/transactions/stats', protect, adminOnly, getTransactionStats);

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
//   // Payment Gateway Routes
//   createRazorpayOrder,
//   createStripePaymentIntent,
//   verifyRazorpayPayment,
//   verifyStripePayment,
//   razorpayWebhook,
//   stripeWebhook,
//   // CMS routes (Admin only)
//   getAllPlansCMS,
//   getPlanByIdCMS,
//   createPlanCMS,
//   updatePlanCMS,
//   deletePlanCMS,
//   togglePlanStatusCMS,
//   reorderPlansCMS,
//   getSubscriptionStatsCMS,
//   // Subscribers routes
//   getAllSubscribers,
//   getSubscriberById,
//   // Transactions routes
//   getAllTransactions,
//   getTransactionById,
//   getTransactionStats
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

// // ============== Payment Gateway Routes ==============

// // Razorpay Routes
// router.post('/create-razorpay-order', protect, createRazorpayOrder);
// router.post('/verify-razorpay', protect, verifyRazorpayPayment);

// // Stripe Routes
// router.post('/create-stripe-payment', protect, createStripePaymentIntent);
// router.post('/verify-stripe', protect, verifyStripePayment);

// // ============== Webhook Routes (No authentication required) ==============
// // These need raw body for signature verification
// router.post('/webhook/razorpay', express.raw({type: 'application/json'}), razorpayWebhook);
// router.post('/webhook/stripe', express.raw({type: 'application/json'}), stripeWebhook);

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

// // ============== Subscribers Management Routes ==============
// router.get('/cms/subscribers', protect, adminOnly, getAllSubscribers);
// router.get('/cms/subscribers/:id', protect, adminOnly, getSubscriberById);

// // ============== Transactions Management Routes ==============
// router.get('/cms/transactions', protect, adminOnly, getAllTransactions);
// router.get('/cms/transactions/:id', protect, adminOnly, getTransactionById);
// router.get('/cms/transactions/stats', protect, adminOnly, getTransactionStats);

// // Debug route to list all registered endpoints (remove in production)
// if (process.env.NODE_ENV !== 'production') {
//   router.get('/debug/routes', (req, res) => {
//     const routes = [];
//     router.stack.forEach(layer => {
//       if (layer.route) {
//         const methods = Object.keys(layer.route.methods).join(', ').toUpperCase();
//         routes.push(`${methods} /api/subscriptions${layer.route.path}`);
//       }
//     });
//     res.json({ routes });
//   });
// }

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
//   // Payment Gateway Routes
//   createRazorpayOrder,
//   createStripePaymentIntent,
//   verifyRazorpayPayment,
//   verifyStripePayment,
//   razorpayWebhook,
//   stripeWebhook,
//   // CMS routes (Admin only)
//   getAllPlansCMS,
//   getPlanByIdCMS,
//   createPlanCMS,
//   updatePlanCMS,
//   deletePlanCMS,
//   togglePlanStatusCMS,
//   reorderPlansCMS,
//   getSubscriptionStatsCMS,
//   // Subscribers routes
//   getAllSubscribers,
//   getSubscriberById,
//   // Transactions routes
//   getAllTransactions,
//   getTransactionById,
//   getTransactionStats
// } from '../controllers/subscription.controller.js';

// const router = express.Router();

// // ============== Public Routes ==============
// router.get('/plans', getPlans);
// router.get('/features', getSubscriptionFeatures);

// // ============== Payment Gateway Configuration Routes (Public) ==============
// // Get Razorpay public key
// router.get('/config/razorpay-key', (req, res) => {
//   res.json({ 
//     success: true,
//     key: process.env.RAZORPAY_KEY_ID || 'rzp_test_YourKeyHere',
//     message: 'Razorpay key retrieved successfully'
//   });
// });

// // Get Stripe publishable key
// router.get('/config/stripe-key', (req, res) => {
//   res.json({ 
//     success: true,
//     key: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_YourKeyHere',
//     message: 'Stripe key retrieved successfully'
//   });
// });

// // Get payment gateway status
// router.get('/config/payment-status', (req, res) => {
//   res.json({
//     success: true,
//     razorpay: {
//       configured: !!process.env.RAZORPAY_KEY_ID && !!process.env.RAZORPAY_KEY_SECRET,
//       keyId: process.env.RAZORPAY_KEY_ID ? 'configured' : 'not configured'
//     },
//     stripe: {
//       configured: !!process.env.STRIPE_SECRET_KEY && !!process.env.STRIPE_PUBLISHABLE_KEY,
//       publishableKey: process.env.STRIPE_PUBLISHABLE_KEY ? 'configured' : 'not configured'
//     }
//   });
// });

// // ============== User Protected Routes ==============
// router.get('/current', protect, getCurrentSubscription);
// router.get('/billing-history', protect, getBillingHistory);
// router.post('/subscribe', protect, subscribe);
// router.post('/verify-payment', protect, verifyPayment);
// router.post('/cancel', protect, cancelSubscription);

// // ============== Payment Gateway Routes ==============

// // Razorpay Routes
// router.post('/create-razorpay-order', protect, createRazorpayOrder);
// router.post('/verify-razorpay', protect, verifyRazorpayPayment);

// // Stripe Routes
// router.post('/create-stripe-payment', protect, createStripePaymentIntent);
// router.post('/verify-stripe', protect, verifyStripePayment);

// // ============== Webhook Routes (No authentication required) ==============
// // These need raw body for signature verification
// router.post('/webhook/razorpay', express.raw({type: 'application/json'}), razorpayWebhook);
// router.post('/webhook/stripe', express.raw({type: 'application/json'}), stripeWebhook);

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

// // ============== Subscribers Management Routes ==============
// router.get('/cms/subscribers', protect, adminOnly, getAllSubscribers);
// router.get('/cms/subscribers/:id', protect, adminOnly, getSubscriberById);

// // ============== Transactions Management Routes ==============
// router.get('/cms/transactions', protect, adminOnly, getAllTransactions);
// router.get('/cms/transactions/:id', protect, adminOnly, getTransactionById);
// router.get('/cms/transactions/stats', protect, adminOnly, getTransactionStats);

// // ============== Subscription Analytics Routes ==============
// // router.get('/analytics/daily', protect, adminOnly, getDailySubscriptionAnalytics);
// // router.get('/analytics/monthly', protect, adminOnly, getMonthlySubscriptionAnalytics);
// // router.get('/analytics/yearly', protect, adminOnly, getYearlySubscriptionAnalytics);

// // ============== Invoice Routes ==============
// router.get('/invoices/:id', protect, getInvoiceById);
// router.get('/invoices/download/:id', protect, downloadInvoice);
// router.post('/invoices/send/:id', protect, sendInvoiceEmail);

// // ============== Coupon/Discount Routes ==============
// router.get('/coupons/validate/:code', protect, validateCoupon);
// router.post('/coupons/apply', protect, applyCoupon);

// // Debug route to list all registered endpoints (remove in production)
// if (process.env.NODE_ENV !== 'production') {
//   router.get('/debug/routes', (req, res) => {
//     const routes = [];
//     router.stack.forEach(layer => {
//       if (layer.route) {
//         const methods = Object.keys(layer.route.methods).join(', ').toUpperCase();
//         routes.push(`${methods} /api/subscriptions${layer.route.path}`);
//       }
//     });
//     res.json({ 
//       success: true,
//       totalRoutes: routes.length,
//       routes 
//     });
//   });
// }

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
  // Payment Gateway Routes
  createRazorpayOrder,
  createStripePaymentIntent,
  verifyRazorpayPayment,
  verifyStripePayment,
  razorpayWebhook,
  stripeWebhook,
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
  getTransactionStats,
  // ============================================
  // MISSING: Payment Methods Routes
  // ============================================
  getPaymentMethods,
  addPaymentMethod,
  removePaymentMethod,
  setDefaultPaymentMethod,
  // ============================================
  // MISSING: Invoice Routes
  // ============================================
  getInvoiceById,
  downloadInvoice,
  sendInvoiceEmail,
  // ============================================
  // MISSING: Coupon/Discount Routes
  // ============================================
  validateCoupon,
  applyCoupon
} from '../controllers/subscription.controller.js';

const router = express.Router();

// ============== Public Routes ==============
router.get('/plans', getPlans);
router.get('/features', getSubscriptionFeatures);

// ============== Payment Gateway Configuration Routes (Public) ==============
// Get Razorpay public key
router.get('/config/razorpay-key', (req, res) => {
  res.json({ 
    success: true,
    key: process.env.RAZORPAY_KEY_ID || 'rzp_test_YourKeyHere',
    message: 'Razorpay key retrieved successfully'
  });
});

// Get Stripe publishable key
router.get('/config/stripe-key', (req, res) => {
  res.json({ 
    success: true,
    key: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_YourKeyHere',
    message: 'Stripe key retrieved successfully'
  });
});

// Get payment gateway status
router.get('/config/payment-status', (req, res) => {
  res.json({
    success: true,
    razorpay: {
      configured: !!process.env.RAZORPAY_KEY_ID && !!process.env.RAZORPAY_KEY_SECRET,
      keyId: process.env.RAZORPAY_KEY_ID ? 'configured' : 'not configured'
    },
    stripe: {
      configured: !!process.env.STRIPE_SECRET_KEY && !!process.env.STRIPE_PUBLISHABLE_KEY,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY ? 'configured' : 'not configured'
    }
  });
});

// ============== User Protected Routes ==============
router.get('/current', protect, getCurrentSubscription);
router.get('/billing-history', protect, getBillingHistory);
router.post('/subscribe', protect, subscribe);
router.post('/verify-payment', protect, verifyPayment);
router.post('/cancel', protect, cancelSubscription);

// ============== Payment Gateway Routes ==============

// Razorpay Routes
router.post('/create-razorpay-order', protect, createRazorpayOrder);
router.post('/verify-razorpay', protect, verifyRazorpayPayment);

// Stripe Routes
router.post('/create-stripe-payment', protect, createStripePaymentIntent);
router.post('/verify-stripe', protect, verifyStripePayment);

// ============== Webhook Routes (No authentication required) ==============
// These need raw body for signature verification
router.post('/webhook/razorpay', express.raw({type: 'application/json'}), razorpayWebhook);
router.post('/webhook/stripe', express.raw({type: 'application/json'}), stripeWebhook);

// ============== Payment Methods Routes ==============
router.get('/payment-methods', protect, getPaymentMethods);
router.post('/payment-methods', protect, addPaymentMethod);
router.delete('/payment-methods/:methodId', protect, removePaymentMethod);
router.patch('/payment-methods/:methodId/default', protect, setDefaultPaymentMethod);

// ============== Invoice Routes ==============
router.get('/invoices/:id', protect, getInvoiceById);
router.get('/invoices/download/:id', protect, downloadInvoice);
router.post('/invoices/send/:id', protect, sendInvoiceEmail);

// ============== Coupon/Discount Routes ==============
router.get('/coupons/validate/:code', protect, validateCoupon);
router.post('/coupons/apply', protect, applyCoupon);

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

// ============== Subscription Analytics Routes ==============
// router.get('/analytics/daily', protect, adminOnly, getDailySubscriptionAnalytics);
// router.get('/analytics/monthly', protect, adminOnly, getMonthlySubscriptionAnalytics);
// router.get('/analytics/yearly', protect, adminOnly, getYearlySubscriptionAnalytics);

// Debug route to list all registered endpoints (remove in production)
if (process.env.NODE_ENV !== 'production') {
  router.get('/debug/routes', (req, res) => {
    const routes = [];
    router.stack.forEach(layer => {
      if (layer.route) {
        const methods = Object.keys(layer.route.methods).join(', ').toUpperCase();
        routes.push(`${methods} /api/subscriptions${layer.route.path}`);
      }
    });
    res.json({ 
      success: true,
      totalRoutes: routes.length,
      routes 
    });
  });
}

export default router;