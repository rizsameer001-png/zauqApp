////server/controllers/subscription.controller.js
// import Subscription from '../models/Subscription.js';
// import User from '../models/User.js';
// import { successResponse, errorResponse } from '../utils/response.js';

// const plans = {
//   free: {
//     name: 'Free',
//     price: 0,
//     features: ['Browse all content', 'Read public poems', 'Basic search'],
//     limits: { poemsPerDay: 50, booksPerMonth: 2, audioPerMonth: 5 }
//   },
//   basic: {
//     name: 'Basic',
//     price: 99,
//     currency: 'INR',
//     features: ['All free features', 'Unlimited poem reading', 'Download 5 ebooks/month', 'Basic audio streaming'],
//     limits: { ebooksPerMonth: 5, audiobooksPerMonth: 3 }
//   },
//   premium: {
//     name: 'Premium',
//     price: 199,
//     currency: 'INR',
//     features: ['All Basic features', 'Unlimited downloads', 'HD audio streaming', 'Ad-free experience', 'AI explanations'],
//     limits: { unlimited: true }
//   },
//   pro: {
//     name: 'Pro',
//     price: 499,
//     currency: 'INR',
//     features: ['All Premium features', 'Creator tools', 'Priority support', 'Analytics dashboard', 'Early access'],
//     limits: { unlimited: true, creator: true }
//   }
// };

// export const getPlans = async (req, res, next) => {
//   try {
//     successResponse(res, plans);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriptionFeatures = async (req, res, next) => {
//   try {
//     successResponse(res, Object.keys(plans).map(key => ({
//       id: key,
//       ...plans[key]
//     })));
//   } catch (error) {
//     next(error);
//   }
// };

// export const getCurrentSubscription = async (req, res, next) => {
//   try {
//     const subscription = await Subscription.findOne({
//       user: req.user.id,
//       status: 'active'
//     }).sort({ createdAt: -1 });

//     const user = await User.findById(req.user.id);

//     successResponse(res, {
//       subscription,
//       plan: user.subscription,
//       features: plans[user.subscription.plan] || plans.free
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const subscribe = async (req, res, next) => {
//   try {
//     const { plan, billingCycle, paymentMethod } = req.body;

//     if (!plans[plan]) {
//       return errorResponse(res, 'Invalid plan', 400);
//     }

//     const planDetails = plans[plan];
//     const months = billingCycle === 'yearly' ? 12 : billingCycle === 'quarterly' ? 3 : 1;
//     const amount = planDetails.price * months;

//     // Create subscription record
//     const subscription = await Subscription.create({
//       user: req.user.id,
//       plan,
//       status: 'pending',
//       price: { amount, currency: planDetails.currency },
//       billingCycle,
//       paymentMethod,
//       expiresAt: new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000)
//     });

//     // Update user subscription info
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': plan,
//       'subscription.startedAt': new Date(),
//       'subscription.expiresAt': subscription.expiresAt
//     });

//     successResponse(res, { subscription, paymentUrl: '/api/subscriptions/verify-payment' }, 'Subscription initiated', 201);
//   } catch (error) {
//     next(error);
//   }
// };

// export const verifyPayment = async (req, res, next) => {
//   try {
//     const { subscriptionId, paymentId } = req.body;

//     // Mock payment verification - integrate with actual payment gateway
//     const subscription = await Subscription.findByIdAndUpdate(
//       subscriptionId,
//       { status: 'active', paymentId },
//       { new: true }
//     );

//     successResponse(res, subscription, 'Payment verified');
//   } catch (error) {
//     next(error);
//   }
// };

// export const cancelSubscription = async (req, res, next) => {
//   try {
//     const subscription = await Subscription.findOneAndUpdate(
//       { user: req.user.id, status: 'active' },
//       { status: 'cancelled', cancelledAt: new Date() },
//       { new: true, sort: { createdAt: -1 } }
//     );

//     if (!subscription) {
//       return errorResponse(res, 'No active subscription found', 404);
//     }

//     successResponse(res, subscription, 'Subscription cancelled');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getBillingHistory = async (req, res, next) => {
//   try {
//     const history = await Subscription.find({ user: req.user.id })
//       .sort({ createdAt: -1 });

//     successResponse(res, history);
//   } catch (error) {
//     next(error);
//   }
// };





////server/controllers/subscription.controller.js

// import mongoose from 'mongoose';

// // New schema for subscription plans (for CMS management)
// const subscriptionPlanSchema = new mongoose.Schema({
//   planId: {
//     type: String,
//     unique: true,
//     required: true,
//     enum: ['free', 'basic', 'premium', 'pro']
//   },
//   name: {
//     type: String,
//     required: true
//   },
//   displayName: {
//     type: String,
//     required: true
//   },
//   description: String,
//   price: {
//     amount: {
//       type: Number,
//       required: true,
//       min: 0
//     },
//     currency: {
//       type: String,
//       default: 'INR'
//     }
//   },
//   billingCycle: {
//     type: String,
//     enum: ['monthly', 'quarterly', 'yearly'],
//     default: 'monthly'
//   },
//   features: [{
//     name: String,
//     included: { type: Boolean, default: true },
//     limit: Number
//   }],
//   limits: {
//     poemsPerDay: { type: Number, default: null },
//     ebooksPerMonth: { type: Number, default: null },
//     audiobooksPerMonth: { type: Number, default: null },
//     unlimited: { type: Boolean, default: false },
//     creator: { type: Boolean, default: false }
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   },
//   displayOrder: {
//     type: Number,
//     default: 0
//   },
//   badgeText: String,
//   recommended: {
//     type: Boolean,
//     default: false
//   },
//   metadata: {
//     type: Map,
//     of: String
//   }
// }, {
//   timestamps: true
// });

// // Original subscription schema (renamed for user subscriptions)
// const userSubscriptionSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   plan: {
//     type: String,
//     enum: ['free', 'basic', 'premium', 'pro'],
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ['active', 'cancelled', 'expired', 'pending'],
//     default: 'active'
//   },
//   price: {
//     amount: Number,
//     currency: { type: String, default: 'INR' }
//   },
//   billingCycle: {
//     type: String,
//     enum: ['monthly', 'quarterly', 'yearly'],
//     default: 'monthly'
//   },
//   startedAt: {
//     type: Date,
//     default: Date.now
//   },
//   expiresAt: {
//     type: Date,
//     required: true
//   },
//   cancelledAt: Date,
//   paymentMethod: {
//     type: String,
//     enum: ['card', 'upi', 'netbanking', 'wallet', 'free']
//   },
//   paymentId: String,
//   features: [String],
//   autoRenew: {
//     type: Boolean,
//     default: true
//   }
// }, {
//   timestamps: true
// });

// userSubscriptionSchema.index({ user: 1, status: 1 });
// userSubscriptionSchema.index({ expiresAt: 1, status: 1 });

// const SubscriptionPlan = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);
// const Subscription = mongoose.model('Subscription', userSubscriptionSchema);

// export { SubscriptionPlan, Subscription };
// export default Subscription;












// import { Subscription, SubscriptionPlan } from '../models/Subscription.js';
// import User from '../models/User.js';
// import { successResponse, errorResponse } from '../utils/response.js';

// // Default plans (fallback if no plans in database)
// const defaultPlans = {
//   free: {
//     name: 'Free',
//     displayName: 'Free',
//     price: 0,
//     currency: 'INR',
//     features: ['Browse all content', 'Read public poems', 'Basic search'],
//     limits: { poemsPerDay: 50, booksPerMonth: 2, audioPerMonth: 5 }
//   },
//   basic: {
//     name: 'Basic',
//     displayName: 'Basic',
//     price: 99,
//     currency: 'INR',
//     features: ['All free features', 'Unlimited poem reading', 'Download 5 ebooks/month', 'Basic audio streaming'],
//     limits: { ebooksPerMonth: 5, audiobooksPerMonth: 3 }
//   },
//   premium: {
//     name: 'Premium',
//     displayName: 'Premium',
//     price: 199,
//     currency: 'INR',
//     features: ['All Basic features', 'Unlimited downloads', 'HD audio streaming', 'Ad-free experience', 'AI explanations'],
//     limits: { unlimited: true }
//   },
//   pro: {
//     name: 'Pro',
//     displayName: 'Pro',
//     price: 499,
//     currency: 'INR',
//     features: ['All Premium features', 'Creator tools', 'Priority support', 'Analytics dashboard', 'Early access'],
//     limits: { unlimited: true, creator: true }
//   }
// };

// // Initialize default plans in database
// const initializeDefaultPlans = async () => {
//   for (const [planId, planData] of Object.entries(defaultPlans)) {
//     const existingPlan = await SubscriptionPlan.findOne({ planId });
//     if (!existingPlan) {
//       await SubscriptionPlan.create({
//         planId,
//         ...planData,
//         displayOrder: Object.keys(defaultPlans).indexOf(planId),
//         isActive: true
//       });
//     }
//   }
// };

// // ============== PUBLIC ROUTES (Existing) ==============

// export const getPlans = async (req, res, next) => {
//   try {
//     // Get plans from database, fallback to default plans
//     let plans = await SubscriptionPlan.find({ isActive: true })
//       .sort({ displayOrder: 1, 'price.amount': 1 });
    
//     if (plans.length === 0) {
//       await initializeDefaultPlans();
//       plans = await SubscriptionPlan.find({ isActive: true })
//         .sort({ displayOrder: 1, 'price.amount': 1 });
//     }
    
//     const formattedPlans = plans.reduce((acc, plan) => {
//       acc[plan.planId] = {
//         name: plan.displayName,
//         price: plan.price.amount,
//         currency: plan.price.currency,
//         features: plan.features.filter(f => f.included).map(f => f.name),
//         limits: plan.limits,
//         badgeText: plan.badgeText,
//         recommended: plan.recommended
//       };
//       return acc;
//     }, {});
    
//     successResponse(res, formattedPlans);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriptionFeatures = async (req, res, next) => {
//   try {
//     let plans = await SubscriptionPlan.find({ isActive: true })
//       .sort({ displayOrder: 1, 'price.amount': 1 });
    
//     if (plans.length === 0) {
//       await initializeDefaultPlans();
//       plans = await SubscriptionPlan.find({ isActive: true })
//         .sort({ displayOrder: 1, 'price.amount': 1 });
//     }
    
//     successResponse(res, plans.map(plan => ({
//       id: plan.planId,
//       name: plan.displayName,
//       price: plan.price.amount,
//       currency: plan.price.currency,
//       features: plan.features.filter(f => f.included).map(f => f.name),
//       limits: plan.limits,
//       badgeText: plan.badgeText,
//       recommended: plan.recommended
//     })));
//   } catch (error) {
//     next(error);
//   }
// };

// export const getCurrentSubscription = async (req, res, next) => {
//   try {
//     const subscription = await Subscription.findOne({
//       user: req.user.id,
//       status: 'active'
//     }).sort({ createdAt: -1 });

//     const user = await User.findById(req.user.id);
    
//     // Get plan details from SubscriptionPlan model
//     const planDetails = await SubscriptionPlan.findOne({ planId: user.subscription.plan });
    
//     successResponse(res, {
//       subscription,
//       plan: user.subscription,
//       features: planDetails ? planDetails.features.filter(f => f.included).map(f => f.name) : defaultPlans[user.subscription.plan]?.features || []
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const subscribe = async (req, res, next) => {
//   try {
//     const { plan, billingCycle, paymentMethod } = req.body;
    
//     // Get plan details from database
//     let planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
    
//     if (!planDetails) {
//       await initializeDefaultPlans();
//       planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
      
//       if (!planDetails && defaultPlans[plan]) {
//         // Use default plan as fallback
//         planDetails = { ...defaultPlans[plan], planId: plan };
//       } else if (!planDetails) {
//         return errorResponse(res, 'Invalid plan', 400);
//       }
//     }

//     const months = billingCycle === 'yearly' ? 12 : billingCycle === 'quarterly' ? 3 : 1;
//     const amount = planDetails.price.amount * months;

//     // Create subscription record
//     const subscription = await Subscription.create({
//       user: req.user.id,
//       plan,
//       status: plan === 'free' ? 'active' : 'pending',
//       price: { amount, currency: planDetails.price.currency },
//       billingCycle,
//       paymentMethod: paymentMethod || (plan === 'free' ? 'free' : undefined),
//       expiresAt: new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000),
//       features: planDetails.features.filter(f => f.included).map(f => f.name)
//     });

//     // Update user subscription info
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': plan,
//       'subscription.startedAt': new Date(),
//       'subscription.expiresAt': subscription.expiresAt
//     });

//     // If free plan, activate immediately
//     if (plan === 'free') {
//       return successResponse(res, { subscription, plan: planDetails }, 'Free subscription activated', 201);
//     }

//     successResponse(res, { subscription, paymentUrl: '/api/subscriptions/verify-payment' }, 'Subscription initiated', 201);
//   } catch (error) {
//     next(error);
//   }
// };

// export const verifyPayment = async (req, res, next) => {
//   try {
//     const { subscriptionId, paymentId } = req.body;

//     const subscription = await Subscription.findByIdAndUpdate(
//       subscriptionId,
//       { status: 'active', paymentId },
//       { new: true }
//     );

//     successResponse(res, subscription, 'Payment verified');
//   } catch (error) {
//     next(error);
//   }
// };

// export const cancelSubscription = async (req, res, next) => {
//   try {
//     const subscription = await Subscription.findOneAndUpdate(
//       { user: req.user.id, status: 'active' },
//       { status: 'cancelled', cancelledAt: new Date() },
//       { new: true, sort: { createdAt: -1 } }
//     );

//     if (!subscription) {
//       return errorResponse(res, 'No active subscription found', 404);
//     }
    
//     // Update user to free plan
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': 'free'
//     });

//     successResponse(res, subscription, 'Subscription cancelled');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getBillingHistory = async (req, res, next) => {
//   try {
//     const history = await Subscription.find({ user: req.user.id })
//       .sort({ createdAt: -1 });

//     successResponse(res, history);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============== CMS ROUTES (Admin Only) ==============

// // Get all plans (including inactive)
// export const getAllPlansCMS = async (req, res, next) => {
//   try {
//     const plans = await SubscriptionPlan.find().sort({ displayOrder: 1, 'price.amount': 1 });
    
//     // Get subscriber counts for each plan
//     const plansWithStats = await Promise.all(plans.map(async (plan) => {
//       const subscriberCount = await Subscription.countDocuments({ 
//         plan: plan.planId, 
//         status: 'active' 
//       });
      
//       const planObj = plan.toObject();
//       planObj.metadata = planObj.metadata || new Map();
//       planObj.metadata.subscriberCount = subscriberCount;
      
//       return planObj;
//     }));
    
//     successResponse(res, plansWithStats);
//   } catch (error) {
//     next(error);
//   }
// };

// // Get single plan by ID
// export const getPlanByIdCMS = async (req, res, next) => {
//   try {
//     const plan = await SubscriptionPlan.findById(req.params.id);
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }
//     successResponse(res, plan);
//   } catch (error) {
//     next(error);
//   }
// };

// // Create new plan
// export const createPlanCMS = async (req, res, next) => {
//   try {
//     const {
//       planId,
//       name,
//       displayName,
//       description,
//       price,
//       billingCycle,
//       features,
//       limits,
//       isActive,
//       displayOrder,
//       badgeText,
//       recommended,
//       metadata
//     } = req.body;

//     // Validate planId
//     const validPlans = ['free', 'basic', 'premium', 'pro'];
//     if (!validPlans.includes(planId)) {
//       return errorResponse(res, 'Invalid plan ID. Must be free, basic, premium, or pro', 400);
//     }

//     // Check if planId already exists
//     const existingPlan = await SubscriptionPlan.findOne({ planId });
//     if (existingPlan) {
//       return errorResponse(res, 'Plan ID already exists', 400);
//     }

//     const plan = await SubscriptionPlan.create({
//       planId,
//       name,
//       displayName,
//       description,
//       price: {
//         amount: price.amount,
//         currency: price.currency || 'INR'
//       },
//       billingCycle: billingCycle || 'monthly',
//       features: features || [],
//       limits: {
//         poemsPerDay: limits?.poemsPerDay || null,
//         ebooksPerMonth: limits?.ebooksPerMonth || null,
//         audiobooksPerMonth: limits?.audiobooksPerMonth || null,
//         unlimited: limits?.unlimited || false,
//         creator: limits?.creator || false
//       },
//       isActive: isActive !== undefined ? isActive : true,
//       displayOrder: displayOrder || 0,
//       badgeText,
//       recommended: recommended || false,
//       metadata: metadata || new Map()
//     });

//     successResponse(res, plan, 'Plan created successfully', 201);
//   } catch (error) {
//     next(error);
//   }
// };

// // Update plan
// export const updatePlanCMS = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;
    
//     // Don't allow planId to be changed
//     delete updateData.planId;

//     const plan = await SubscriptionPlan.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true, runValidators: true }
//     );

//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }

//     successResponse(res, plan, 'Plan updated successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// // Delete plan
// export const deletePlanCMS = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { permanent } = req.query;

//     const plan = await SubscriptionPlan.findById(id);
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }

//     // Check if any users are subscribed to this plan
//     const activeSubscriptions = await Subscription.countDocuments({
//       plan: plan.planId,
//       status: 'active'
//     });

//     if (permanent === 'true') {
//       if (activeSubscriptions > 0) {
//         return errorResponse(res, `Cannot delete plan with ${activeSubscriptions} active subscriptions. Deactivate it instead.`, 400);
//       }
//       await SubscriptionPlan.findByIdAndDelete(id);
//       successResponse(res, null, 'Plan permanently deleted');
//     } else {
//       // Soft delete - just deactivate
//       plan.isActive = false;
//       await plan.save();
//       successResponse(res, plan, 'Plan deactivated successfully');
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// // Toggle plan status
// export const togglePlanStatusCMS = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const plan = await SubscriptionPlan.findById(id);
    
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }

//     plan.isActive = !plan.isActive;
//     await plan.save();

//     successResponse(res, plan, `Plan ${plan.isActive ? 'activated' : 'deactivated'} successfully`);
//   } catch (error) {
//     next(error);
//   }
// };

// // Reorder plans
// export const reorderPlansCMS = async (req, res, next) => {
//   try {
//     const { orders } = req.body; // [{ id: 'planId', order: 1 }]

//     const updatePromises = orders.map(({ id, order }) =>
//       SubscriptionPlan.findByIdAndUpdate(id, { displayOrder: order }, { new: true })
//     );

//     await Promise.all(updatePromises);
//     successResponse(res, null, 'Plans reordered successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// // Get subscription statistics for dashboard
// export const getSubscriptionStatsCMS = async (req, res, next) => {
//   try {
//     const totalPlans = await SubscriptionPlan.countDocuments();
//     const activePlans = await SubscriptionPlan.countDocuments({ isActive: true });
//     const totalUsers = await User.countDocuments();
//     const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });
    
//     const revenueStats = await Subscription.aggregate([
//       { $match: { status: 'active', 'price.amount': { $gt: 0 } } },
//       { $group: {
//         _id: null,
//         totalMonthlyRevenue: { $sum: '$price.amount' },
//         averageSubscriptionValue: { $avg: '$price.amount' }
//       }}
//     ]);

//     const planDistribution = await Subscription.aggregate([
//       { $match: { status: 'active' } },
//       { $group: { _id: '$plan', count: { $sum: 1 } } }
//     ]);

//     successResponse(res, {
//       totalPlans,
//       activePlans,
//       totalUsers,
//       activeSubscriptions,
//       revenue: revenueStats[0] || { totalMonthlyRevenue: 0, averageSubscriptionValue: 0 },
//       planDistribution
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Initialize default plans on server start
// initializeDefaultPlans().catch(console.error);











// import { Subscription, SubscriptionPlan } from '../models/Subscription.js';
// import User from '../models/User.js';
// import { successResponse, errorResponse } from '../utils/response.js';

// // Default plans with correct schema structure
// const defaultPlans = [
//   {
//     planId: 'free',
//     name: 'free',
//     displayName: 'Free',
//     description: 'Perfect for getting started with our platform',
//     price: { amount: 0, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       { name: 'Browse all content', included: true, limit: null },
//       { name: 'Read public poems', included: true, limit: null },
//       { name: 'Basic search', included: true, limit: null },
//       { name: 'Download content', included: false, limit: null },
//       { name: 'Ad-free experience', included: false, limit: null }
//     ],
//     limits: {
//       poemsPerDay: 50,
//       ebooksPerMonth: 2,
//       audiobooksPerMonth: 5,
//       unlimited: false,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 0,
//     badgeText: '',
//     recommended: false
//   },
//   {
//     planId: 'basic',
//     name: 'basic',
//     displayName: 'Basic',
//     description: 'Great for regular readers',
//     price: { amount: 99, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       { name: 'All free features', included: true, limit: null },
//       { name: 'Unlimited poem reading', included: true, limit: null },
//       { name: 'Download 5 ebooks/month', included: true, limit: 5 },
//       { name: 'Basic audio streaming', included: true, limit: null },
//       { name: 'Priority support', included: false, limit: null }
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: 5,
//       audiobooksPerMonth: 3,
//       unlimited: false,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 1,
//     badgeText: 'Popular',
//     recommended: true
//   },
//   {
//     planId: 'premium',
//     name: 'premium',
//     displayName: 'Premium',
//     description: 'For serious literature enthusiasts',
//     price: { amount: 199, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       { name: 'All Basic features', included: true, limit: null },
//       { name: 'Unlimited downloads', included: true, limit: null },
//       { name: 'HD audio streaming', included: true, limit: null },
//       { name: 'Ad-free experience', included: true, limit: null },
//       { name: 'AI explanations', included: true, limit: null }
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: null,
//       audiobooksPerMonth: null,
//       unlimited: true,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 2,
//     badgeText: 'Best Value',
//     recommended: true
//   },
//   {
//     planId: 'pro',
//     name: 'pro',
//     displayName: 'Pro',
//     description: 'For creators and power users',
//     price: { amount: 499, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       { name: 'All Premium features', included: true, limit: null },
//       { name: 'Creator tools', included: true, limit: null },
//       { name: 'Priority support', included: true, limit: null },
//       { name: 'Analytics dashboard', included: true, limit: null },
//       { name: 'Early access to new features', included: true, limit: null }
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: null,
//       audiobooksPerMonth: null,
//       unlimited: true,
//       creator: true
//     },
//     isActive: true,
//     displayOrder: 3,
//     badgeText: 'Creator',
//     recommended: false
//   }
// ];

// // Initialize default plans in database
// const initializeDefaultPlans = async () => {
//   try {
//     for (const planData of defaultPlans) {
//       const existingPlan = await SubscriptionPlan.findOne({ planId: planData.planId });
//       if (!existingPlan) {
//         await SubscriptionPlan.create(planData);
//         console.log(`✅ Created default plan: ${planData.planId}`);
//       }
//     }
//     console.log('✅ Default plans initialized successfully');
//   } catch (error) {
//     console.error('❌ Error initializing default plans:', error.message);
//   }
// };

// // ============== PUBLIC ROUTES ==============

// export const getPlans = async (req, res, next) => {
//   try {
//     let plans = await SubscriptionPlan.find({ isActive: true })
//       .sort({ displayOrder: 1, 'price.amount': 1 });
    
//     if (plans.length === 0) {
//       await initializeDefaultPlans();
//       plans = await SubscriptionPlan.find({ isActive: true })
//         .sort({ displayOrder: 1, 'price.amount': 1 });
//     }
    
//     const formattedPlans = plans.reduce((acc, plan) => {
//       acc[plan.planId] = {
//         name: plan.displayName,
//         price: plan.price.amount,
//         currency: plan.price.currency,
//         features: plan.features.filter(f => f.included).map(f => f.name),
//         limits: plan.limits,
//         badgeText: plan.badgeText,
//         recommended: plan.recommended,
//         description: plan.description
//       };
//       return acc;
//     }, {});
    
//     successResponse(res, formattedPlans);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriptionFeatures = async (req, res, next) => {
//   try {
//     let plans = await SubscriptionPlan.find({ isActive: true })
//       .sort({ displayOrder: 1, 'price.amount': 1 });
    
//     if (plans.length === 0) {
//       await initializeDefaultPlans();
//       plans = await SubscriptionPlan.find({ isActive: true })
//         .sort({ displayOrder: 1, 'price.amount': 1 });
//     }
    
//     successResponse(res, plans.map(plan => ({
//       id: plan.planId,
//       name: plan.displayName,
//       price: plan.price.amount,
//       currency: plan.price.currency,
//       features: plan.features.filter(f => f.included).map(f => f.name),
//       limits: plan.limits,
//       badgeText: plan.badgeText,
//       recommended: plan.recommended,
//       description: plan.description
//     })));
//   } catch (error) {
//     next(error);
//   }
// };

// export const getCurrentSubscription = async (req, res, next) => {
//   try {
//     const subscription = await Subscription.findOne({
//       user: req.user.id,
//       status: 'active'
//     }).sort({ createdAt: -1 });

//     const user = await User.findById(req.user.id);
    
//     const planDetails = await SubscriptionPlan.findOne({ planId: user.subscription.plan });
    
//     successResponse(res, {
//       subscription,
//       plan: user.subscription,
//       features: planDetails ? planDetails.features.filter(f => f.included).map(f => f.name) : []
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const subscribe = async (req, res, next) => {
//   try {
//     const { plan, billingCycle, paymentMethod } = req.body;
    
//     let planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
    
//     if (!planDetails) {
//       await initializeDefaultPlans();
//       planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
      
//       if (!planDetails) {
//         return errorResponse(res, 'Invalid plan', 400);
//       }
//     }

//     const months = billingCycle === 'yearly' ? 12 : billingCycle === 'quarterly' ? 3 : 1;
//     const amount = planDetails.price.amount * months;

//     const subscription = await Subscription.create({
//       user: req.user.id,
//       plan,
//       status: plan === 'free' ? 'active' : 'pending',
//       price: { amount, currency: planDetails.price.currency },
//       billingCycle,
//       paymentMethod: paymentMethod || (plan === 'free' ? 'free' : undefined),
//       expiresAt: new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000),
//       features: planDetails.features.filter(f => f.included).map(f => f.name)
//     });

//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': plan,
//       'subscription.startedAt': new Date(),
//       'subscription.expiresAt': subscription.expiresAt
//     });

//     if (plan === 'free') {
//       return successResponse(res, { subscription, plan: planDetails }, 'Free subscription activated', 201);
//     }

//     successResponse(res, { subscription, paymentUrl: '/api/subscriptions/verify-payment' }, 'Subscription initiated', 201);
//   } catch (error) {
//     next(error);
//   }
// };

// export const verifyPayment = async (req, res, next) => {
//   try {
//     const { subscriptionId, paymentId } = req.body;

//     const subscription = await Subscription.findByIdAndUpdate(
//       subscriptionId,
//       { status: 'active', paymentId },
//       { new: true }
//     );

//     if (!subscription) {
//       return errorResponse(res, 'Subscription not found', 404);
//     }

//     successResponse(res, subscription, 'Payment verified');
//   } catch (error) {
//     next(error);
//   }
// };

// export const cancelSubscription = async (req, res, next) => {
//   try {
//     const subscription = await Subscription.findOneAndUpdate(
//       { user: req.user.id, status: 'active' },
//       { status: 'cancelled', cancelledAt: new Date() },
//       { new: true, sort: { createdAt: -1 } }
//     );

//     if (!subscription) {
//       return errorResponse(res, 'No active subscription found', 404);
//     }
    
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': 'free'
//     });

//     successResponse(res, subscription, 'Subscription cancelled');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getBillingHistory = async (req, res, next) => {
//   try {
//     const history = await Subscription.find({ user: req.user.id })
//       .sort({ createdAt: -1 });

//     successResponse(res, history);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============== CMS ROUTES (Admin Only) ==============

// export const getAllPlansCMS = async (req, res, next) => {
//   try {
//     const plans = await SubscriptionPlan.find().sort({ displayOrder: 1, 'price.amount': 1 });
    
//     const plansWithStats = await Promise.all(plans.map(async (plan) => {
//       const subscriberCount = await Subscription.countDocuments({ 
//         plan: plan.planId, 
//         status: 'active' 
//       });
      
//       const planObj = plan.toObject();
//       planObj.subscriberCount = subscriberCount;
      
//       return planObj;
//     }));
    
//     successResponse(res, plansWithStats);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getPlanByIdCMS = async (req, res, next) => {
//   try {
//     const plan = await SubscriptionPlan.findById(req.params.id);
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }
//     successResponse(res, plan);
//   } catch (error) {
//     next(error);
//   }
// };

// export const createPlanCMS = async (req, res, next) => {
//   try {
//     const {
//       planId,
//       name,
//       displayName,
//       description,
//       price,
//       billingCycle,
//       features,
//       limits,
//       isActive,
//       displayOrder,
//       badgeText,
//       recommended
//     } = req.body;

//     const validPlans = ['free', 'basic', 'premium', 'pro'];
//     if (!validPlans.includes(planId)) {
//       return errorResponse(res, 'Invalid plan ID. Must be free, basic, premium, or pro', 400);
//     }

//     const existingPlan = await SubscriptionPlan.findOne({ planId });
//     if (existingPlan) {
//       return errorResponse(res, 'Plan ID already exists', 400);
//     }

//     const plan = await SubscriptionPlan.create({
//       planId,
//       name: name || planId,
//       displayName,
//       description: description || '',
//       price: {
//         amount: price?.amount || 0,
//         currency: price?.currency || 'INR'
//       },
//       billingCycle: billingCycle || 'monthly',
//       features: features || [],
//       limits: {
//         poemsPerDay: limits?.poemsPerDay || null,
//         ebooksPerMonth: limits?.ebooksPerMonth || null,
//         audiobooksPerMonth: limits?.audiobooksPerMonth || null,
//         unlimited: limits?.unlimited || false,
//         creator: limits?.creator || false
//       },
//       isActive: isActive !== undefined ? isActive : true,
//       displayOrder: displayOrder || 0,
//       badgeText: badgeText || '',
//       recommended: recommended || false
//     });

//     successResponse(res, plan, 'Plan created successfully', 201);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updatePlanCMS = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;
    
//     delete updateData.planId;
//     delete updateData._id;

//     const plan = await SubscriptionPlan.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true, runValidators: true }
//     );

//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }

//     successResponse(res, plan, 'Plan updated successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const deletePlanCMS = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { permanent } = req.query;

//     const plan = await SubscriptionPlan.findById(id);
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }

//     const activeSubscriptions = await Subscription.countDocuments({
//       plan: plan.planId,
//       status: 'active'
//     });

//     if (permanent === 'true') {
//       if (activeSubscriptions > 0) {
//         return errorResponse(res, `Cannot delete plan with ${activeSubscriptions} active subscriptions. Deactivate it instead.`, 400);
//       }
//       await SubscriptionPlan.findByIdAndDelete(id);
//       successResponse(res, null, 'Plan permanently deleted');
//     } else {
//       plan.isActive = false;
//       await plan.save();
//       successResponse(res, plan, 'Plan deactivated successfully');
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// export const togglePlanStatusCMS = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const plan = await SubscriptionPlan.findById(id);
    
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }

//     plan.isActive = !plan.isActive;
//     await plan.save();

//     successResponse(res, plan, `Plan ${plan.isActive ? 'activated' : 'deactivated'} successfully`);
//   } catch (error) {
//     next(error);
//   }
// };

// export const reorderPlansCMS = async (req, res, next) => {
//   try {
//     const { orders } = req.body;

//     const updatePromises = orders.map(({ id, order }) =>
//       SubscriptionPlan.findByIdAndUpdate(id, { displayOrder: order }, { new: true })
//     );

//     await Promise.all(updatePromises);
//     successResponse(res, null, 'Plans reordered successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriptionStatsCMS = async (req, res, next) => {
//   try {
//     const totalPlans = await SubscriptionPlan.countDocuments();
//     const activePlans = await SubscriptionPlan.countDocuments({ isActive: true });
//     const totalUsers = await User.countDocuments();
//     const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });
    
//     const revenueStats = await Subscription.aggregate([
//       { $match: { status: 'active', 'price.amount': { $gt: 0 } } },
//       { $group: {
//         _id: null,
//         totalMonthlyRevenue: { $sum: '$price.amount' },
//         averageSubscriptionValue: { $avg: '$price.amount' }
//       }}
//     ]);

//     const planDistribution = await Subscription.aggregate([
//       { $match: { status: 'active' } },
//       { $group: { _id: '$plan', count: { $sum: 1 } } }
//     ]);

//     successResponse(res, {
//       totalPlans,
//       activePlans,
//       totalUsers,
//       activeSubscriptions,
//       revenue: revenueStats[0] || { totalMonthlyRevenue: 0, averageSubscriptionValue: 0 },
//       planDistribution
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Initialize default plans when server starts
// initializeDefaultPlans().catch(console.error);














// // server/controllers/subscription.controller.js
// import { Subscription, SubscriptionPlan } from '../models/Subscription.js';
// import User from '../models/User.js';
// import { successResponse, errorResponse } from '../utils/response.js';

// // Default plans with correct schema structure
// const defaultPlans = [
//   {
//     planId: 'free',
//     name: 'free',
//     displayName: 'Free',
//     description: 'Perfect for getting started with our platform',
//     price: { amount: 0, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       { name: 'Browse all content', included: true, limit: null },
//       { name: 'Read public poems', included: true, limit: null },
//       { name: 'Basic search', included: true, limit: null },
//       { name: 'Download content', included: false, limit: null },
//       { name: 'Ad-free experience', included: false, limit: null }
//     ],
//     limits: {
//       poemsPerDay: 50,
//       ebooksPerMonth: 2,
//       audiobooksPerMonth: 5,
//       unlimited: false,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 0,
//     badgeText: '',
//     recommended: false
//   },
//   {
//     planId: 'basic',
//     name: 'basic',
//     displayName: 'Basic',
//     description: 'Great for regular readers',
//     price: { amount: 99, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       { name: 'All free features', included: true, limit: null },
//       { name: 'Unlimited poem reading', included: true, limit: null },
//       { name: 'Download 5 ebooks/month', included: true, limit: 5 },
//       { name: 'Basic audio streaming', included: true, limit: null },
//       { name: 'Priority support', included: false, limit: null }
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: 5,
//       audiobooksPerMonth: 3,
//       unlimited: false,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 1,
//     badgeText: 'Popular',
//     recommended: true
//   },
//   {
//     planId: 'premium',
//     name: 'premium',
//     displayName: 'Premium',
//     description: 'For serious literature enthusiasts',
//     price: { amount: 199, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       { name: 'All Basic features', included: true, limit: null },
//       { name: 'Unlimited downloads', included: true, limit: null },
//       { name: 'HD audio streaming', included: true, limit: null },
//       { name: 'Ad-free experience', included: true, limit: null },
//       { name: 'AI explanations', included: true, limit: null }
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: null,
//       audiobooksPerMonth: null,
//       unlimited: true,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 2,
//     badgeText: 'Best Value',
//     recommended: true
//   },
//   {
//     planId: 'pro',
//     name: 'pro',
//     displayName: 'Pro',
//     description: 'For creators and power users',
//     price: { amount: 499, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       { name: 'All Premium features', included: true, limit: null },
//       { name: 'Creator tools', included: true, limit: null },
//       { name: 'Priority support', included: true, limit: null },
//       { name: 'Analytics dashboard', included: true, limit: null },
//       { name: 'Early access to new features', included: true, limit: null }
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: null,
//       audiobooksPerMonth: null,
//       unlimited: true,
//       creator: true
//     },
//     isActive: true,
//     displayOrder: 3,
//     badgeText: 'Creator',
//     recommended: false
//   }
// ];

// // Initialize default plans in database
// const initializeDefaultPlans = async () => {
//   try {
//     for (const planData of defaultPlans) {
//       const existingPlan = await SubscriptionPlan.findOne({ planId: planData.planId });
//       if (!existingPlan) {
//         await SubscriptionPlan.create(planData);
//         console.log(`✅ Created default plan: ${planData.planId}`);
//       }
//     }
//     console.log('✅ Default plans initialized successfully');
//   } catch (error) {
//     console.error('❌ Error initializing default plans:', error.message);
//   }
// };

// // ============== PUBLIC ROUTES ==============

// export const getPlans = async (req, res, next) => {
//   try {
//     let plans = await SubscriptionPlan.find({ isActive: true })
//       .sort({ displayOrder: 1, 'price.amount': 1 });
    
//     if (plans.length === 0) {
//       await initializeDefaultPlans();
//       plans = await SubscriptionPlan.find({ isActive: true })
//         .sort({ displayOrder: 1, 'price.amount': 1 });
//     }
    
//     const formattedPlans = plans.reduce((acc, plan) => {
//       acc[plan.planId] = {
//         name: plan.displayName,
//         price: plan.price.amount,
//         currency: plan.price.currency,
//         features: plan.features.filter(f => f.included).map(f => f.name),
//         limits: plan.limits,
//         badgeText: plan.badgeText,
//         recommended: plan.recommended,
//         description: plan.description
//       };
//       return acc;
//     }, {});
    
//     successResponse(res, formattedPlans);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriptionFeatures = async (req, res, next) => {
//   try {
//     let plans = await SubscriptionPlan.find({ isActive: true })
//       .sort({ displayOrder: 1, 'price.amount': 1 });
    
//     if (plans.length === 0) {
//       await initializeDefaultPlans();
//       plans = await SubscriptionPlan.find({ isActive: true })
//         .sort({ displayOrder: 1, 'price.amount': 1 });
//     }
    
//     successResponse(res, plans.map(plan => ({
//       id: plan.planId,
//       name: plan.displayName,
//       price: plan.price.amount,
//       currency: plan.price.currency,
//       features: plan.features.filter(f => f.included).map(f => f.name),
//       limits: plan.limits,
//       badgeText: plan.badgeText,
//       recommended: plan.recommended,
//       description: plan.description
//     })));
//   } catch (error) {
//     next(error);
//   }
// };

// export const getCurrentSubscription = async (req, res, next) => {
//   try {
//     const subscription = await Subscription.findOne({
//       user: req.user.id,
//       status: 'active'
//     }).sort({ createdAt: -1 });

//     const user = await User.findById(req.user.id);
    
//     const planDetails = await SubscriptionPlan.findOne({ planId: user.subscription.plan });
    
//     successResponse(res, {
//       subscription,
//       plan: user.subscription,
//       features: planDetails ? planDetails.features.filter(f => f.included).map(f => f.name) : []
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const subscribe = async (req, res, next) => {
//   try {
//     const { plan, billingCycle, paymentMethod } = req.body;
    
//     let planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
    
//     if (!planDetails) {
//       await initializeDefaultPlans();
//       planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
      
//       if (!planDetails) {
//         return errorResponse(res, 'Invalid plan', 400);
//       }
//     }

//     const months = billingCycle === 'yearly' ? 12 : billingCycle === 'quarterly' ? 3 : 1;
//     const amount = planDetails.price.amount * months;

//     const subscription = await Subscription.create({
//       user: req.user.id,
//       plan,
//       status: plan === 'free' ? 'active' : 'pending',
//       price: { amount, currency: planDetails.price.currency },
//       billingCycle,
//       paymentMethod: paymentMethod || (plan === 'free' ? 'free' : undefined),
//       expiresAt: new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000),
//       features: planDetails.features.filter(f => f.included).map(f => f.name)
//     });

//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': plan,
//       'subscription.startedAt': new Date(),
//       'subscription.expiresAt': subscription.expiresAt
//     });

//     if (plan === 'free') {
//       return successResponse(res, { subscription, plan: planDetails }, 'Free subscription activated', 201);
//     }

//     successResponse(res, { subscription, paymentUrl: '/api/subscriptions/verify-payment' }, 'Subscription initiated', 201);
//   } catch (error) {
//     next(error);
//   }
// };

// export const verifyPayment = async (req, res, next) => {
//   try {
//     const { subscriptionId, paymentId } = req.body;

//     const subscription = await Subscription.findByIdAndUpdate(
//       subscriptionId,
//       { status: 'active', paymentId },
//       { new: true }
//     );

//     if (!subscription) {
//       return errorResponse(res, 'Subscription not found', 404);
//     }

//     successResponse(res, subscription, 'Payment verified');
//   } catch (error) {
//     next(error);
//   }
// };

// export const cancelSubscription = async (req, res, next) => {
//   try {
//     const subscription = await Subscription.findOneAndUpdate(
//       { user: req.user.id, status: 'active' },
//       { status: 'cancelled', cancelledAt: new Date() },
//       { new: true, sort: { createdAt: -1 } }
//     );

//     if (!subscription) {
//       return errorResponse(res, 'No active subscription found', 404);
//     }
    
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': 'free'
//     });

//     successResponse(res, subscription, 'Subscription cancelled');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getBillingHistory = async (req, res, next) => {
//   try {
//     const history = await Subscription.find({ user: req.user.id })
//       .sort({ createdAt: -1 });

//     successResponse(res, history);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============== CMS ROUTES (Admin Only) ==============

// export const getAllPlansCMS = async (req, res, next) => {
//   try {
//     const plans = await SubscriptionPlan.find().sort({ displayOrder: 1, 'price.amount': 1 });
    
//     const plansWithStats = await Promise.all(plans.map(async (plan) => {
//       const subscriberCount = await Subscription.countDocuments({ 
//         plan: plan.planId, 
//         status: 'active' 
//       });
      
//       const planObj = plan.toObject();
//       planObj.subscriberCount = subscriberCount;
      
//       return planObj;
//     }));
    
//     successResponse(res, plansWithStats);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getPlanByIdCMS = async (req, res, next) => {
//   try {
//     const plan = await SubscriptionPlan.findById(req.params.id);
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }
//     successResponse(res, plan);
//   } catch (error) {
//     next(error);
//   }
// };

// export const createPlanCMS = async (req, res, next) => {
//   try {
//     const {
//       planId,
//       name,
//       displayName,
//       description,
//       price,
//       billingCycle,
//       features,
//       limits,
//       isActive,
//       displayOrder,
//       badgeText,
//       recommended
//     } = req.body;

//     const validPlans = ['free', 'basic', 'premium', 'pro'];
//     if (!validPlans.includes(planId)) {
//       return errorResponse(res, 'Invalid plan ID. Must be free, basic, premium, or pro', 400);
//     }

//     const existingPlan = await SubscriptionPlan.findOne({ planId });
//     if (existingPlan) {
//       return errorResponse(res, 'Plan ID already exists', 400);
//     }

//     const plan = await SubscriptionPlan.create({
//       planId,
//       name: name || planId,
//       displayName,
//       description: description || '',
//       price: {
//         amount: price?.amount || 0,
//         currency: price?.currency || 'INR'
//       },
//       billingCycle: billingCycle || 'monthly',
//       features: features || [],
//       limits: {
//         poemsPerDay: limits?.poemsPerDay || null,
//         ebooksPerMonth: limits?.ebooksPerMonth || null,
//         audiobooksPerMonth: limits?.audiobooksPerMonth || null,
//         unlimited: limits?.unlimited || false,
//         creator: limits?.creator || false
//       },
//       isActive: isActive !== undefined ? isActive : true,
//       displayOrder: displayOrder || 0,
//       badgeText: badgeText || '',
//       recommended: recommended || false
//     });

//     successResponse(res, plan, 'Plan created successfully', 201);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updatePlanCMS = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;
    
//     delete updateData.planId;
//     delete updateData._id;

//     const plan = await SubscriptionPlan.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true, runValidators: true }
//     );

//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }

//     successResponse(res, plan, 'Plan updated successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const deletePlanCMS = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { permanent } = req.query;

//     const plan = await SubscriptionPlan.findById(id);
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }

//     const activeSubscriptions = await Subscription.countDocuments({
//       plan: plan.planId,
//       status: 'active'
//     });

//     if (permanent === 'true') {
//       if (activeSubscriptions > 0) {
//         return errorResponse(res, `Cannot delete plan with ${activeSubscriptions} active subscriptions. Deactivate it instead.`, 400);
//       }
//       await SubscriptionPlan.findByIdAndDelete(id);
//       successResponse(res, null, 'Plan permanently deleted');
//     } else {
//       plan.isActive = false;
//       await plan.save();
//       successResponse(res, plan, 'Plan deactivated successfully');
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// export const togglePlanStatusCMS = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const plan = await SubscriptionPlan.findById(id);
    
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }

//     plan.isActive = !plan.isActive;
//     await plan.save();

//     successResponse(res, plan, `Plan ${plan.isActive ? 'activated' : 'deactivated'} successfully`);
//   } catch (error) {
//     next(error);
//   }
// };

// export const reorderPlansCMS = async (req, res, next) => {
//   try {
//     const { orders } = req.body;

//     const updatePromises = orders.map(({ id, order }) =>
//       SubscriptionPlan.findByIdAndUpdate(id, { displayOrder: order }, { new: true })
//     );

//     await Promise.all(updatePromises);
//     successResponse(res, null, 'Plans reordered successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriptionStatsCMS = async (req, res, next) => {
//   try {
//     const totalPlans = await SubscriptionPlan.countDocuments();
//     const activePlans = await SubscriptionPlan.countDocuments({ isActive: true });
//     const totalUsers = await User.countDocuments();
//     const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });
    
//     const revenueStats = await Subscription.aggregate([
//       { $match: { status: 'active', 'price.amount': { $gt: 0 } } },
//       { $group: {
//         _id: null,
//         totalMonthlyRevenue: { $sum: '$price.amount' },
//         averageSubscriptionValue: { $avg: '$price.amount' }
//       }}
//     ]);

//     const planDistribution = await Subscription.aggregate([
//       { $match: { status: 'active' } },
//       { $group: { _id: '$plan', count: { $sum: 1 } } }
//     ]);

//     successResponse(res, {
//       totalPlans,
//       activePlans,
//       totalUsers,
//       activeSubscriptions,
//       revenue: revenueStats[0] || { totalMonthlyRevenue: 0, averageSubscriptionValue: 0 },
//       planDistribution
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ============== SUBSCRIBERS MANAGEMENT ==============

// export const getAllSubscribers = async (req, res, next) => {
//   try {
//     const { page = 1, limit = 20, status, plan, search } = req.query;
    
//     let query = {};
    
//     // Apply filters
//     if (status && status !== 'all') {
//       query.status = status;
//     }
    
//     if (plan && plan !== 'all') {
//       query.plan = plan;
//     }
    
//     // Get all subscriptions with user details
//     const subscriptions = await Subscription.find(query)
//       .populate('user', 'name email profilePicture phone createdAt')
//       .sort({ createdAt: -1 })
//       .skip((parseInt(page) - 1) * parseInt(limit))
//       .limit(parseInt(limit));
    
//     // Apply search filter if provided
//     let filteredSubscriptions = subscriptions;
//     if (search) {
//       filteredSubscriptions = subscriptions.filter(sub => 
//         sub.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
//         sub.user?.email?.toLowerCase().includes(search.toLowerCase())
//       );
//     }
    
//     const total = await Subscription.countDocuments(query);
    
//     // Enhance subscription data with additional info
//     const enhancedSubscriptions = filteredSubscriptions.map((sub) => {
//       const subObj = sub.toObject();
      
//       // Add days remaining
//       if (subObj.expiresAt) {
//         const daysRemaining = Math.ceil((new Date(subObj.expiresAt) - new Date()) / (1000 * 60 * 60 * 24));
//         subObj.daysRemaining = daysRemaining > 0 ? daysRemaining : 0;
//       }
      
//       // Add subscription duration
//       if (subObj.startDate && subObj.expiresAt) {
//         const durationDays = Math.ceil((new Date(subObj.expiresAt) - new Date(subObj.startDate)) / (1000 * 60 * 60 * 24));
//         subObj.durationDays = durationDays;
//       }
      
//       // Set start date if not present
//       if (!subObj.startDate) {
//         subObj.startDate = subObj.createdAt;
//       }
      
//       return subObj;
//     });
    
//     successResponse(res, {
//       subscribers: enhancedSubscriptions,
//       pagination: {
//         page: parseInt(page),
//         limit: parseInt(limit),
//         total,
//         pages: Math.ceil(total / limit)
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriberById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const subscription = await Subscription.findById(id)
//       .populate('user', 'name email profilePicture phone createdAt');
    
//     if (!subscription) {
//       return errorResponse(res, 'Subscriber not found', 404);
//     }
    
//     // Get user's subscription history
//     const subscriptionHistory = await Subscription.find({ user: subscription.user._id })
//       .sort({ createdAt: -1 });
    
//     // Calculate lifetime value from subscription history
//     const lifetimeValue = subscriptionHistory
//       .filter(sub => sub.status === 'active' || sub.status === 'cancelled')
//       .reduce((sum, sub) => sum + (sub.price?.amount || 0), 0);
    
//     const subscriberData = subscription.toObject();
//     subscriberData.history = subscriptionHistory;
//     subscriberData.lifetimeValue = lifetimeValue;
//     subscriberData.totalSubscriptions = subscriptionHistory.length;
    
//     successResponse(res, subscriberData);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============== TRANSACTIONS MANAGEMENT ==============

// export const getAllTransactions = async (req, res, next) => {
//   try {
//     const { 
//       page = 1, 
//       limit = 20, 
//       status, 
//       type, 
//       startDate, 
//       endDate,
//       search 
//     } = req.query;
    
//     let query = {};
    
//     // Apply filters
//     if (status && status !== 'all') {
//       query.status = status === 'success' ? 'active' : status;
//     }
    
//     if (type && type !== 'all') {
//       query.type = type;
//     }
    
//     // Date range filter
//     if (startDate || endDate) {
//       query.createdAt = {};
//       if (startDate) {
//         query.createdAt.$gte = new Date(startDate);
//       }
//       if (endDate) {
//         query.createdAt.$lte = new Date(endDate);
//       }
//     }
    
//     // Get subscriptions as transactions
//     let subscriptions = await Subscription.find(query)
//       .populate('user', 'name email')
//       .sort({ createdAt: -1 });
    
//     // Transform subscriptions to transaction format
//     let transactions = subscriptions.map(sub => ({
//       _id: sub._id,
//       transactionId: sub.paymentId || `TXN_${sub._id}`,
//       user: sub.user,
//       type: sub.type || 'subscription',
//       amount: sub.price?.amount || 0,
//       currency: sub.price?.currency || 'INR',
//       status: sub.status === 'active' ? 'success' : sub.status === 'pending' ? 'pending' : sub.status,
//       createdAt: sub.createdAt,
//       paymentMethod: sub.paymentMethod || 'unknown',
//       plan: sub.plan,
//       billingCycle: sub.billingCycle,
//       subscriptionId: sub._id
//     }));
    
//     // Apply search filter
//     if (search) {
//       transactions = transactions.filter(t => 
//         t.transactionId?.toLowerCase().includes(search.toLowerCase()) ||
//         t.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
//         t.user?.email?.toLowerCase().includes(search.toLowerCase())
//       );
//     }
    
//     // Apply status filter for 'success', 'failed', etc.
//     if (status && status !== 'all') {
//       transactions = transactions.filter(t => t.status === status);
//     }
    
//     // Apply type filter
//     if (type && type !== 'all') {
//       transactions = transactions.filter(t => t.type === type);
//     }
    
//     // Paginate
//     const start = (parseInt(page) - 1) * parseInt(limit);
//     const paginatedTransactions = transactions.slice(start, start + parseInt(limit));
    
//     successResponse(res, {
//       transactions: paginatedTransactions,
//       pagination: {
//         page: parseInt(page),
//         limit: parseInt(limit),
//         total: transactions.length,
//         pages: Math.ceil(transactions.length / limit)
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getTransactionById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const subscription = await Subscription.findById(id)
//       .populate('user', 'name email phone');
    
//     if (!subscription) {
//       return errorResponse(res, 'Transaction not found', 404);
//     }
    
//     const transaction = {
//       _id: subscription._id,
//       transactionId: subscription.paymentId || `TXN_${subscription._id}`,
//       user: subscription.user,
//       type: subscription.type || 'subscription',
//       amount: subscription.price?.amount || 0,
//       currency: subscription.price?.currency || 'INR',
//       status: subscription.status === 'active' ? 'success' : subscription.status,
//       createdAt: subscription.createdAt,
//       updatedAt: subscription.updatedAt,
//       paymentMethod: subscription.paymentMethod || 'unknown',
//       plan: subscription.plan,
//       billingCycle: subscription.billingCycle,
//       subscriptionId: subscription._id,
//       paymentDetails: {
//         paymentId: subscription.paymentId,
//         orderId: subscription.orderId
//       }
//     };
    
//     successResponse(res, transaction);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getTransactionStats = async (req, res, next) => {
//   try {
//     // Get date ranges
//     const now = new Date();
//     const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//     const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
//     const startOfYear = new Date(now.getFullYear(), 0, 1);
    
//     let stats = {
//       totalRevenue: 0,
//       todayRevenue: 0,
//       monthlyRevenue: 0,
//       yearlyRevenue: 0,
//       totalTransactions: 0,
//       todayTransactions: 0,
//       monthlyTransactions: 0,
//       yearlyTransactions: 0,
//       successfulTransactions: 0,
//       failedTransactions: 0,
//       pendingTransactions: 0,
//       averageTransactionValue: 0,
//       revenueByPlan: {},
//       transactionsByStatus: {},
//       transactionsByType: {},
//       recentTransactions: [],
//       dailyStats: []
//     };
    
//     // Get all subscriptions for revenue calculation
//     const allSubscriptions = await Subscription.find({})
//       .populate('user', 'name email')
//       .sort({ createdAt: -1 });
    
//     // Calculate revenue and transactions
//     allSubscriptions.forEach(sub => {
//       const amount = sub.price?.amount || 0;
//       const createdAt = new Date(sub.createdAt);
//       const status = sub.status === 'active' ? 'success' : sub.status;
      
//       // Total revenue (only successful/active)
//       if (status === 'success') {
//         stats.totalRevenue += amount;
//         stats.totalTransactions++;
//         stats.successfulTransactions++;
        
//         // Today's revenue
//         if (createdAt >= startOfToday) {
//           stats.todayRevenue += amount;
//           stats.todayTransactions++;
//         }
        
//         // Monthly revenue
//         if (createdAt >= startOfMonth) {
//           stats.monthlyRevenue += amount;
//           stats.monthlyTransactions++;
//         }
        
//         // Yearly revenue
//         if (createdAt >= startOfYear) {
//           stats.yearlyRevenue += amount;
//           stats.yearlyTransactions++;
//         }
        
//         // Revenue by plan
//         const plan = sub.plan || 'unknown';
//         if (!stats.revenueByPlan[plan]) {
//           stats.revenueByPlan[plan] = 0;
//         }
//         stats.revenueByPlan[plan] += amount;
//       } else if (status === 'pending') {
//         stats.pendingTransactions++;
//       } else if (status === 'cancelled' || status === 'expired') {
//         stats.failedTransactions++;
//       }
      
//       // Transaction status counts
//       if (!stats.transactionsByStatus[status]) {
//         stats.transactionsByStatus[status] = 0;
//       }
//       stats.transactionsByStatus[status]++;
      
//       // Transaction type counts
//       const type = sub.type || 'subscription';
//       if (!stats.transactionsByType[type]) {
//         stats.transactionsByType[type] = 0;
//       }
//       stats.transactionsByType[type]++;
//     });
    
//     // Calculate average transaction value
//     stats.averageTransactionValue = stats.totalTransactions > 0 
//       ? stats.totalRevenue / stats.totalTransactions 
//       : 0;
    
//     // Get recent transactions
//     stats.recentTransactions = allSubscriptions.slice(0, 10).map(sub => ({
//       _id: sub._id,
//       transactionId: sub.paymentId || `TXN_${sub._id}`,
//       user: sub.user,
//       amount: sub.price?.amount || 0,
//       currency: sub.price?.currency || 'INR',
//       status: sub.status === 'active' ? 'success' : sub.status,
//       createdAt: sub.createdAt,
//       plan: sub.plan
//     }));
    
//     // Get daily revenue for chart (last 30 days)
//     const last30Days = [];
//     for (let i = 29; i >= 0; i--) {
//       const date = new Date();
//       date.setDate(date.getDate() - i);
//       date.setHours(0, 0, 0, 0);
      
//       const nextDate = new Date(date);
//       nextDate.setDate(nextDate.getDate() + 1);
      
//       const dailyTransactions = allSubscriptions.filter(sub => {
//         const createdAt = new Date(sub.createdAt);
//         return createdAt >= date && createdAt < nextDate;
//       });
      
//       const dailyRevenue = dailyTransactions
//         .filter(sub => sub.status === 'active')
//         .reduce((sum, sub) => sum + (sub.price?.amount || 0), 0);
      
//       last30Days.push({
//         date: date.toISOString().split('T')[0],
//         revenue: dailyRevenue,
//         transactions: dailyTransactions.length,
//         successful: dailyTransactions.filter(t => t.status === 'active').length
//       });
//     }
    
//     stats.dailyStats = last30Days;
    
//     successResponse(res, stats);
//   } catch (error) {
//     next(error);
//   }
// };

// // Initialize default plans when server starts
// initializeDefaultPlans().catch(console.error);















// // server/controllers/subscription.controller.js
// import { Subscription, SubscriptionPlan } from '../models/Subscription.js';
// import User from '../models/User.js';
// import { successResponse, errorResponse } from '../utils/response.js';
// import crypto from 'crypto';

// // Payment gateway configurations
// let razorpayInstance = null;
// let stripeInstance = null;

// // Initialize Razorpay
// const initRazorpay = () => {
//   if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
//     try {
//       // Dynamic import for Razorpay
//       import('razorpay').then((Razorpay) => {
//         razorpayInstance = new Razorpay.default({
//           key_id: process.env.RAZORPAY_KEY_ID,
//           key_secret: process.env.RAZORPAY_KEY_SECRET,
//         });
//         console.log('✅ Razorpay initialized successfully');
//       }).catch(err => {
//         console.error('❌ Failed to initialize Razorpay:', err.message);
//       });
//     } catch (error) {
//       console.error('❌ Razorpay initialization error:', error.message);
//     }
//   }
// };

// // Initialize Stripe
// const initStripe = () => {
//   if (process.env.STRIPE_SECRET_KEY) {
//     try {
//       import('stripe').then((Stripe) => {
//         stripeInstance = new Stripe.default(process.env.STRIPE_SECRET_KEY);
//         console.log('✅ Stripe initialized successfully');
//       }).catch(err => {
//         console.error('❌ Failed to initialize Stripe:', err.message);
//       });
//     } catch (error) {
//       console.error('❌ Stripe initialization error:', error.message);
//     }
//   }
// };

// // Initialize payment gateways
// initRazorpay();
// initStripe();

// // Default plans with correct schema structure
// const defaultPlans = [
//   {
//     planId: 'free',
//     name: 'free',
//     displayName: 'Free',
//     description: 'Perfect for getting started with our platform',
//     price: { amount: 0, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       { name: 'Browse all content', included: true, limit: null },
//       { name: 'Read public poems', included: true, limit: null },
//       { name: 'Basic search', included: true, limit: null },
//       { name: 'Download content', included: false, limit: null },
//       { name: 'Ad-free experience', included: false, limit: null }
//     ],
//     limits: {
//       poemsPerDay: 50,
//       ebooksPerMonth: 2,
//       audiobooksPerMonth: 5,
//       unlimited: false,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 0,
//     badgeText: '',
//     recommended: false
//   },
//   {
//     planId: 'basic',
//     name: 'basic',
//     displayName: 'Basic',
//     description: 'Great for regular readers',
//     price: { amount: 99, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       { name: 'All free features', included: true, limit: null },
//       { name: 'Unlimited poem reading', included: true, limit: null },
//       { name: 'Download 5 ebooks/month', included: true, limit: 5 },
//       { name: 'Basic audio streaming', included: true, limit: null },
//       { name: 'Priority support', included: false, limit: null }
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: 5,
//       audiobooksPerMonth: 3,
//       unlimited: false,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 1,
//     badgeText: 'Popular',
//     recommended: true
//   },
//   {
//     planId: 'premium',
//     name: 'premium',
//     displayName: 'Premium',
//     description: 'For serious literature enthusiasts',
//     price: { amount: 199, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       { name: 'All Basic features', included: true, limit: null },
//       { name: 'Unlimited downloads', included: true, limit: null },
//       { name: 'HD audio streaming', included: true, limit: null },
//       { name: 'Ad-free experience', included: true, limit: null },
//       { name: 'AI explanations', included: true, limit: null }
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: null,
//       audiobooksPerMonth: null,
//       unlimited: true,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 2,
//     badgeText: 'Best Value',
//     recommended: true
//   },
//   {
//     planId: 'pro',
//     name: 'pro',
//     displayName: 'Pro',
//     description: 'For creators and power users',
//     price: { amount: 499, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       { name: 'All Premium features', included: true, limit: null },
//       { name: 'Creator tools', included: true, limit: null },
//       { name: 'Priority support', included: true, limit: null },
//       { name: 'Analytics dashboard', included: true, limit: null },
//       { name: 'Early access to new features', included: true, limit: null }
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: null,
//       audiobooksPerMonth: null,
//       unlimited: true,
//       creator: true
//     },
//     isActive: true,
//     displayOrder: 3,
//     badgeText: 'Creator',
//     recommended: false
//   }
// ];

// // Initialize default plans in database
// const initializeDefaultPlans = async () => {
//   try {
//     for (const planData of defaultPlans) {
//       const existingPlan = await SubscriptionPlan.findOne({ planId: planData.planId });
//       if (!existingPlan) {
//         await SubscriptionPlan.create(planData);
//         console.log(`✅ Created default plan: ${planData.planId}`);
//       }
//     }
//     console.log('✅ Default plans initialized successfully');
//   } catch (error) {
//     console.error('❌ Error initializing default plans:', error.message);
//   }
// };

// // ============== PUBLIC ROUTES ==============

// export const getPlans = async (req, res, next) => {
//   try {
//     let plans = await SubscriptionPlan.find({ isActive: true })
//       .sort({ displayOrder: 1, 'price.amount': 1 });
    
//     if (plans.length === 0) {
//       await initializeDefaultPlans();
//       plans = await SubscriptionPlan.find({ isActive: true })
//         .sort({ displayOrder: 1, 'price.amount': 1 });
//     }
    
//     const formattedPlans = plans.reduce((acc, plan) => {
//       acc[plan.planId] = {
//         name: plan.displayName,
//         price: plan.price.amount,
//         currency: plan.price.currency,
//         features: plan.features.filter(f => f.included).map(f => f.name),
//         limits: plan.limits,
//         badgeText: plan.badgeText,
//         recommended: plan.recommended,
//         description: plan.description
//       };
//       return acc;
//     }, {});
    
//     successResponse(res, formattedPlans);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriptionFeatures = async (req, res, next) => {
//   try {
//     let plans = await SubscriptionPlan.find({ isActive: true })
//       .sort({ displayOrder: 1, 'price.amount': 1 });
    
//     if (plans.length === 0) {
//       await initializeDefaultPlans();
//       plans = await SubscriptionPlan.find({ isActive: true })
//         .sort({ displayOrder: 1, 'price.amount': 1 });
//     }
    
//     successResponse(res, plans.map(plan => ({
//       id: plan.planId,
//       name: plan.displayName,
//       price: plan.price.amount,
//       currency: plan.price.currency,
//       features: plan.features.filter(f => f.included).map(f => f.name),
//       limits: plan.limits,
//       badgeText: plan.badgeText,
//       recommended: plan.recommended,
//       description: plan.description
//     })));
//   } catch (error) {
//     next(error);
//   }
// };

// export const getCurrentSubscription = async (req, res, next) => {
//   try {
//     const subscription = await Subscription.findOne({
//       user: req.user.id,
//       status: 'active'
//     }).sort({ createdAt: -1 });

//     const user = await User.findById(req.user.id);
    
//     const planDetails = await SubscriptionPlan.findOne({ planId: user.subscription.plan });
    
//     successResponse(res, {
//       subscription,
//       plan: user.subscription,
//       features: planDetails ? planDetails.features.filter(f => f.included).map(f => f.name) : []
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ============== SUBSCRIPTION WITH PAYMENT GATEWAYS ==============

// // Create Razorpay Order
// export const createRazorpayOrder = async (req, res, next) => {
//   try {
//     const { plan, billingCycle } = req.body;
    
//     if (!razorpayInstance) {
//       return errorResponse(res, 'Razorpay is not configured', 500);
//     }
    
//     let planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
    
//     if (!planDetails) {
//       await initializeDefaultPlans();
//       planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
      
//       if (!planDetails) {
//         return errorResponse(res, 'Invalid plan', 400);
//       }
//     }
    
//     const months = billingCycle === 'yearly' ? 12 : billingCycle === 'quarterly' ? 3 : 1;
//     const amount = planDetails.price.amount * months;
    
//     const options = {
//       amount: amount * 100, // Amount in paise
//       currency: planDetails.price.currency,
//       receipt: `receipt_${Date.now()}`,
//       payment_capture: 1,
//       notes: {
//         userId: req.user.id,
//         plan: plan,
//         billingCycle: billingCycle
//       }
//     };
    
//     const order = await razorpayInstance.orders.create(options);
    
//     // Create pending subscription
//     const subscription = await Subscription.create({
//       user: req.user.id,
//       plan,
//       status: 'pending',
//       price: { amount, currency: planDetails.price.currency },
//       billingCycle,
//       paymentMethod: 'razorpay',
//       expiresAt: new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000),
//       features: planDetails.features.filter(f => f.included).map(f => f.name),
//       orderId: order.id
//     });
    
//     successResponse(res, {
//       orderId: order.id,
//       amount: order.amount,
//       currency: order.currency,
//       subscriptionId: subscription._id,
//       key: process.env.RAZORPAY_KEY_ID
//     });
//   } catch (error) {
//     console.error('Razorpay order creation error:', error);
//     next(error);
//   }
// };

// // Create Stripe Payment Intent
// export const createStripePaymentIntent = async (req, res, next) => {
//   try {
//     const { plan, billingCycle } = req.body;
    
//     if (!stripeInstance) {
//       return errorResponse(res, 'Stripe is not configured', 500);
//     }
    
//     let planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
    
//     if (!planDetails) {
//       await initializeDefaultPlans();
//       planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
      
//       if (!planDetails) {
//         return errorResponse(res, 'Invalid plan', 400);
//       }
//     }
    
//     const months = billingCycle === 'yearly' ? 12 : billingCycle === 'quarterly' ? 3 : 1;
//     const amount = planDetails.price.amount * months;
    
//     const paymentIntent = await stripeInstance.paymentIntents.create({
//       amount: amount * 100, // Amount in cents
//       currency: planDetails.price.currency.toLowerCase(),
//       metadata: {
//         userId: req.user.id,
//         plan: plan,
//         billingCycle: billingCycle
//       }
//     });
    
//     // Create pending subscription
//     const subscription = await Subscription.create({
//       user: req.user.id,
//       plan,
//       status: 'pending',
//       price: { amount, currency: planDetails.price.currency },
//       billingCycle,
//       paymentMethod: 'stripe',
//       expiresAt: new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000),
//       features: planDetails.features.filter(f => f.included).map(f => f.name),
//       paymentIntentId: paymentIntent.id
//     });
    
//     successResponse(res, {
//       clientSecret: paymentIntent.client_secret,
//       subscriptionId: subscription._id
//     });
//   } catch (error) {
//     console.error('Stripe payment intent creation error:', error);
//     next(error);
//   }
// };

// // Subscribe with free plan or existing payment method
// export const subscribe = async (req, res, next) => {
//   try {
//     const { plan, billingCycle, paymentMethod } = req.body;
    
//     let planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
    
//     if (!planDetails) {
//       await initializeDefaultPlans();
//       planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
      
//       if (!planDetails) {
//         return errorResponse(res, 'Invalid plan', 400);
//       }
//     }
    
//     const months = billingCycle === 'yearly' ? 12 : billingCycle === 'quarterly' ? 3 : 1;
//     const amount = planDetails.price.amount * months;
    
//     // For free plan, activate immediately
//     if (plan === 'free' || amount === 0) {
//       const subscription = await Subscription.create({
//         user: req.user.id,
//         plan,
//         status: 'active',
//         price: { amount: 0, currency: planDetails.price.currency },
//         billingCycle,
//         paymentMethod: 'free',
//         expiresAt: null,
//         features: planDetails.features.filter(f => f.included).map(f => f.name)
//       });
      
//       await User.findByIdAndUpdate(req.user.id, {
//         'subscription.plan': plan,
//         'subscription.startedAt': new Date(),
//         'subscription.expiresAt': null
//       });
      
//       return successResponse(res, { subscription, plan: planDetails }, 'Free subscription activated', 201);
//     }
    
//     // For paid plans, return subscription info for payment
//     const subscription = await Subscription.create({
//       user: req.user.id,
//       plan,
//       status: 'pending',
//       price: { amount, currency: planDetails.price.currency },
//       billingCycle,
//       paymentMethod: paymentMethod || 'pending',
//       expiresAt: new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000),
//       features: planDetails.features.filter(f => f.included).map(f => f.name)
//     });
    
//     successResponse(res, { 
//       subscription, 
//       plan: planDetails,
//       requiresPayment: true
//     }, 'Subscription initiated, please complete payment', 201);
//   } catch (error) {
//     next(error);
//   }
// };

// // Verify Razorpay Payment
// export const verifyRazorpayPayment = async (req, res, next) => {
//   try {
//     const { orderId, paymentId, signature, subscriptionId } = req.body;
    
//     // Verify signature
//     const body = orderId + "|" + paymentId;
//     const expectedSignature = crypto
//       .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(body.toString())
//       .digest('hex');
    
//     const isAuthentic = expectedSignature === signature;
    
//     if (!isAuthentic) {
//       return errorResponse(res, 'Invalid payment signature', 400);
//     }
    
//     // Update subscription
//     const subscription = await Subscription.findByIdAndUpdate(
//       subscriptionId,
//       { 
//         status: 'active', 
//         paymentId,
//         orderId,
//         signature,
//         paymentDetails: { orderId, paymentId, signature },
//         verifiedAt: new Date()
//       },
//       { new: true }
//     );
    
//     if (!subscription) {
//       return errorResponse(res, 'Subscription not found', 404);
//     }
    
//     // Update user
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': subscription.plan,
//       'subscription.startedAt': new Date(),
//       'subscription.expiresAt': subscription.expiresAt,
//       'subscription.status': 'active'
//     });
    
//     successResponse(res, subscription, 'Payment verified and subscription activated');
//   } catch (error) {
//     console.error('Razorpay verification error:', error);
//     next(error);
//   }
// };

// // Verify Stripe Payment
// export const verifyStripePayment = async (req, res, next) => {
//   try {
//     const { paymentIntentId, subscriptionId } = req.body;
    
//     if (!stripeInstance) {
//       return errorResponse(res, 'Stripe is not configured', 500);
//     }
    
//     const paymentIntent = await stripeInstance.paymentIntents.retrieve(paymentIntentId);
    
//     if (paymentIntent.status !== 'succeeded') {
//       return errorResponse(res, 'Payment not successful', 400);
//     }
    
//     // Update subscription
//     const subscription = await Subscription.findByIdAndUpdate(
//       subscriptionId,
//       { 
//         status: 'active', 
//         paymentId: paymentIntentId,
//         paymentDetails: paymentIntent,
//         verifiedAt: new Date()
//       },
//       { new: true }
//     );
    
//     if (!subscription) {
//       return errorResponse(res, 'Subscription not found', 404);
//     }
    
//     // Update user
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': subscription.plan,
//       'subscription.startedAt': new Date(),
//       'subscription.expiresAt': subscription.expiresAt,
//       'subscription.status': 'active'
//     });
    
//     successResponse(res, subscription, 'Payment verified and subscription activated');
//   } catch (error) {
//     console.error('Stripe verification error:', error);
//     next(error);
//   }
// };

// // Legacy verify payment (for backward compatibility)
// export const verifyPayment = async (req, res, next) => {
//   try {
//     const { subscriptionId, paymentId, paymentDetails, orderId, signature } = req.body;
    
//     // Determine which gateway to use
//     if (signature && orderId) {
//       // Razorpay verification
//       const body = orderId + "|" + paymentId;
//       const expectedSignature = crypto
//         .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//         .update(body.toString())
//         .digest('hex');
      
//       const isAuthentic = expectedSignature === signature;
//       if (!isAuthentic) {
//         return errorResponse(res, 'Invalid payment signature', 400);
//       }
//     }
    
//     const subscription = await Subscription.findByIdAndUpdate(
//       subscriptionId,
//       { 
//         status: 'active', 
//         paymentId,
//         paymentDetails: { paymentId, orderId, signature, ...paymentDetails },
//         verifiedAt: new Date()
//       },
//       { new: true }
//     );
    
//     if (!subscription) {
//       return errorResponse(res, 'Subscription not found', 404);
//     }
    
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': subscription.plan,
//       'subscription.startedAt': new Date(),
//       'subscription.expiresAt': subscription.expiresAt,
//       'subscription.status': 'active'
//     });
    
//     successResponse(res, subscription, 'Payment verified');
//   } catch (error) {
//     next(error);
//   }
// };

// export const cancelSubscription = async (req, res, next) => {
//   try {
//     const subscription = await Subscription.findOneAndUpdate(
//       { user: req.user.id, status: 'active' },
//       { status: 'cancelled', cancelledAt: new Date() },
//       { new: true, sort: { createdAt: -1 } }
//     );
    
//     if (!subscription) {
//       return errorResponse(res, 'No active subscription found', 404);
//     }
    
//     // Cancel recurring payment if applicable
//     if (subscription.paymentMethod === 'stripe' && subscription.paymentIntentId && stripeInstance) {
//       try {
//         // Cancel subscription in Stripe
//         // await stripeInstance.subscriptions.cancel(subscription.paymentIntentId);
//       } catch (stripeError) {
//         console.error('Stripe cancellation error:', stripeError);
//       }
//     }
    
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': 'free'
//     });
    
//     successResponse(res, subscription, 'Subscription cancelled');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getBillingHistory = async (req, res, next) => {
//   try {
//     const history = await Subscription.find({ user: req.user.id })
//       .sort({ createdAt: -1 });
    
//     successResponse(res, history);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============== WEBHOOKS FOR PAYMENT GATEWAYS ==============

// export const razorpayWebhook = async (req, res, next) => {
//   try {
//     const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
//     const signature = req.headers['x-razorpay-signature'];
    
//     // Verify webhook signature
//     const body = JSON.stringify(req.body);
//     const expectedSignature = crypto
//       .createHmac('sha256', secret)
//       .update(body)
//       .digest('hex');
    
//     if (expectedSignature !== signature) {
//       return res.status(400).json({ error: 'Invalid signature' });
//     }
    
//     const event = req.body;
    
//     if (event.event === 'payment.captured') {
//       const payment = event.payload.payment.entity;
//       const orderId = payment.order_id;
      
//       // Find subscription by orderId and update
//       await Subscription.findOneAndUpdate(
//         { orderId },
//         { 
//           status: 'active',
//           paymentId: payment.id,
//           paymentDetails: payment,
//           verifiedAt: new Date()
//         }
//       );
//     }
    
//     res.status(200).json({ received: true });
//   } catch (error) {
//     console.error('Razorpay webhook error:', error);
//     res.status(500).json({ error: 'Webhook processing failed' });
//   }
// };

// export const stripeWebhook = async (req, res, next) => {
//   try {
//     const sig = req.headers['stripe-signature'];
//     const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
//     let event;
//     try {
//       event = stripeInstance.webhooks.constructEvent(req.body, sig, webhookSecret);
//     } catch (err) {
//       return res.status(400).json({ error: `Webhook Error: ${err.message}` });
//     }
    
//     if (event.type === 'payment_intent.succeeded') {
//       const paymentIntent = event.data.object;
      
//       // Find subscription by paymentIntentId and update
//       await Subscription.findOneAndUpdate(
//         { paymentIntentId: paymentIntent.id },
//         { 
//           status: 'active',
//           paymentId: paymentIntent.id,
//           paymentDetails: paymentIntent,
//           verifiedAt: new Date()
//         }
//       );
//     }
    
//     res.status(200).json({ received: true });
//   } catch (error) {
//     console.error('Stripe webhook error:', error);
//     res.status(500).json({ error: 'Webhook processing failed' });
//   }
// };

// // ============== CMS ROUTES (Admin Only) ==============

// export const getAllPlansCMS = async (req, res, next) => {
//   try {
//     const plans = await SubscriptionPlan.find().sort({ displayOrder: 1, 'price.amount': 1 });
    
//     const plansWithStats = await Promise.all(plans.map(async (plan) => {
//       const subscriberCount = await Subscription.countDocuments({ 
//         plan: plan.planId, 
//         status: 'active' 
//       });
      
//       const planObj = plan.toObject();
//       planObj.subscriberCount = subscriberCount;
      
//       return planObj;
//     }));
    
//     successResponse(res, plansWithStats);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getPlanByIdCMS = async (req, res, next) => {
//   try {
//     const plan = await SubscriptionPlan.findById(req.params.id);
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }
//     successResponse(res, plan);
//   } catch (error) {
//     next(error);
//   }
// };

// export const createPlanCMS = async (req, res, next) => {
//   try {
//     const {
//       planId,
//       name,
//       displayName,
//       description,
//       price,
//       billingCycle,
//       features,
//       limits,
//       isActive,
//       displayOrder,
//       badgeText,
//       recommended
//     } = req.body;
    
//     const validPlans = ['free', 'basic', 'premium', 'pro'];
//     if (!validPlans.includes(planId)) {
//       return errorResponse(res, 'Invalid plan ID. Must be free, basic, premium, or pro', 400);
//     }
    
//     const existingPlan = await SubscriptionPlan.findOne({ planId });
//     if (existingPlan) {
//       return errorResponse(res, 'Plan ID already exists', 400);
//     }
    
//     const plan = await SubscriptionPlan.create({
//       planId,
//       name: name || planId,
//       displayName,
//       description: description || '',
//       price: {
//         amount: price?.amount || 0,
//         currency: price?.currency || 'INR'
//       },
//       billingCycle: billingCycle || 'monthly',
//       features: features || [],
//       limits: {
//         poemsPerDay: limits?.poemsPerDay || null,
//         ebooksPerMonth: limits?.ebooksPerMonth || null,
//         audiobooksPerMonth: limits?.audiobooksPerMonth || null,
//         unlimited: limits?.unlimited || false,
//         creator: limits?.creator || false
//       },
//       isActive: isActive !== undefined ? isActive : true,
//       displayOrder: displayOrder || 0,
//       badgeText: badgeText || '',
//       recommended: recommended || false
//     });
    
//     successResponse(res, plan, 'Plan created successfully', 201);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updatePlanCMS = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;
    
//     delete updateData.planId;
//     delete updateData._id;
    
//     const plan = await SubscriptionPlan.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true, runValidators: true }
//     );
    
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }
    
//     successResponse(res, plan, 'Plan updated successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const deletePlanCMS = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { permanent } = req.query;
    
//     const plan = await SubscriptionPlan.findById(id);
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }
    
//     const activeSubscriptions = await Subscription.countDocuments({
//       plan: plan.planId,
//       status: 'active'
//     });
    
//     if (permanent === 'true') {
//       if (activeSubscriptions > 0) {
//         return errorResponse(res, `Cannot delete plan with ${activeSubscriptions} active subscriptions. Deactivate it instead.`, 400);
//       }
//       await SubscriptionPlan.findByIdAndDelete(id);
//       successResponse(res, null, 'Plan permanently deleted');
//     } else {
//       plan.isActive = false;
//       await plan.save();
//       successResponse(res, plan, 'Plan deactivated successfully');
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// export const togglePlanStatusCMS = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const plan = await SubscriptionPlan.findById(id);
    
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }
    
//     plan.isActive = !plan.isActive;
//     await plan.save();
    
//     successResponse(res, plan, `Plan ${plan.isActive ? 'activated' : 'deactivated'} successfully`);
//   } catch (error) {
//     next(error);
//   }
// };

// export const reorderPlansCMS = async (req, res, next) => {
//   try {
//     const { orders } = req.body;
    
//     const updatePromises = orders.map(({ id, order }) =>
//       SubscriptionPlan.findByIdAndUpdate(id, { displayOrder: order }, { new: true })
//     );
    
//     await Promise.all(updatePromises);
//     successResponse(res, null, 'Plans reordered successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriptionStatsCMS = async (req, res, next) => {
//   try {
//     const totalPlans = await SubscriptionPlan.countDocuments();
//     const activePlans = await SubscriptionPlan.countDocuments({ isActive: true });
//     const totalUsers = await User.countDocuments();
//     const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });
    
//     const revenueStats = await Subscription.aggregate([
//       { $match: { status: 'active', 'price.amount': { $gt: 0 } } },
//       { $group: {
//         _id: null,
//         totalMonthlyRevenue: { $sum: '$price.amount' },
//         averageSubscriptionValue: { $avg: '$price.amount' }
//       }}
//     ]);
    
//     const planDistribution = await Subscription.aggregate([
//       { $match: { status: 'active' } },
//       { $group: { _id: '$plan', count: { $sum: 1 } } }
//     ]);
    
//     successResponse(res, {
//       totalPlans,
//       activePlans,
//       totalUsers,
//       activeSubscriptions,
//       revenue: revenueStats[0] || { totalMonthlyRevenue: 0, averageSubscriptionValue: 0 },
//       planDistribution
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ============== SUBSCRIBERS MANAGEMENT ==============

// export const getAllSubscribers = async (req, res, next) => {
//   try {
//     const { page = 1, limit = 20, status, plan, search } = req.query;
    
//     let query = {};
    
//     if (status && status !== 'all') {
//       query.status = status;
//     }
    
//     if (plan && plan !== 'all') {
//       query.plan = plan;
//     }
    
//     const subscriptions = await Subscription.find(query)
//       .populate('user', 'name email profilePicture phone createdAt')
//       .sort({ createdAt: -1 })
//       .skip((parseInt(page) - 1) * parseInt(limit))
//       .limit(parseInt(limit));
    
//     let filteredSubscriptions = subscriptions;
//     if (search) {
//       filteredSubscriptions = subscriptions.filter(sub => 
//         sub.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
//         sub.user?.email?.toLowerCase().includes(search.toLowerCase())
//       );
//     }
    
//     const total = await Subscription.countDocuments(query);
    
//     const enhancedSubscriptions = filteredSubscriptions.map((sub) => {
//       const subObj = sub.toObject();
      
//       if (subObj.expiresAt) {
//         const daysRemaining = Math.ceil((new Date(subObj.expiresAt) - new Date()) / (1000 * 60 * 60 * 24));
//         subObj.daysRemaining = daysRemaining > 0 ? daysRemaining : 0;
//       }
      
//       if (subObj.startDate && subObj.expiresAt) {
//         const durationDays = Math.ceil((new Date(subObj.expiresAt) - new Date(subObj.startDate)) / (1000 * 60 * 60 * 24));
//         subObj.durationDays = durationDays;
//       }
      
//       if (!subObj.startDate) {
//         subObj.startDate = subObj.createdAt;
//       }
      
//       return subObj;
//     });
    
//     successResponse(res, {
//       subscribers: enhancedSubscriptions,
//       pagination: {
//         page: parseInt(page),
//         limit: parseInt(limit),
//         total,
//         pages: Math.ceil(total / limit)
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriberById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const subscription = await Subscription.findById(id)
//       .populate('user', 'name email profilePicture phone createdAt');
    
//     if (!subscription) {
//       return errorResponse(res, 'Subscriber not found', 404);
//     }
    
//     const subscriptionHistory = await Subscription.find({ user: subscription.user._id })
//       .sort({ createdAt: -1 });
    
//     const lifetimeValue = subscriptionHistory
//       .filter(sub => sub.status === 'active' || sub.status === 'cancelled')
//       .reduce((sum, sub) => sum + (sub.price?.amount || 0), 0);
    
//     const subscriberData = subscription.toObject();
//     subscriberData.history = subscriptionHistory;
//     subscriberData.lifetimeValue = lifetimeValue;
//     subscriberData.totalSubscriptions = subscriptionHistory.length;
    
//     successResponse(res, subscriberData);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============== TRANSACTIONS MANAGEMENT ==============

// export const getAllTransactions = async (req, res, next) => {
//   try {
//     const { 
//       page = 1, 
//       limit = 20, 
//       status, 
//       type, 
//       startDate, 
//       endDate,
//       search 
//     } = req.query;
    
//     let query = {};
    
//     if (status && status !== 'all') {
//       query.status = status === 'success' ? 'active' : status;
//     }
    
//     if (type && type !== 'all') {
//       query.type = type;
//     }
    
//     if (startDate || endDate) {
//       query.createdAt = {};
//       if (startDate) {
//         query.createdAt.$gte = new Date(startDate);
//       }
//       if (endDate) {
//         query.createdAt.$lte = new Date(endDate);
//       }
//     }
    
//     let subscriptions = await Subscription.find(query)
//       .populate('user', 'name email')
//       .sort({ createdAt: -1 });
    
//     let transactions = subscriptions.map(sub => ({
//       _id: sub._id,
//       transactionId: sub.paymentId || `TXN_${sub._id}`,
//       user: sub.user,
//       type: sub.type || 'subscription',
//       amount: sub.price?.amount || 0,
//       currency: sub.price?.currency || 'INR',
//       status: sub.status === 'active' ? 'success' : sub.status === 'pending' ? 'pending' : sub.status,
//       createdAt: sub.createdAt,
//       paymentMethod: sub.paymentMethod || 'unknown',
//       plan: sub.plan,
//       billingCycle: sub.billingCycle,
//       subscriptionId: sub._id
//     }));
    
//     if (search) {
//       transactions = transactions.filter(t => 
//         t.transactionId?.toLowerCase().includes(search.toLowerCase()) ||
//         t.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
//         t.user?.email?.toLowerCase().includes(search.toLowerCase())
//       );
//     }
    
//     if (status && status !== 'all') {
//       transactions = transactions.filter(t => t.status === status);
//     }
    
//     if (type && type !== 'all') {
//       transactions = transactions.filter(t => t.type === type);
//     }
    
//     const start = (parseInt(page) - 1) * parseInt(limit);
//     const paginatedTransactions = transactions.slice(start, start + parseInt(limit));
    
//     successResponse(res, {
//       transactions: paginatedTransactions,
//       pagination: {
//         page: parseInt(page),
//         limit: parseInt(limit),
//         total: transactions.length,
//         pages: Math.ceil(transactions.length / limit)
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getTransactionById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const subscription = await Subscription.findById(id)
//       .populate('user', 'name email phone');
    
//     if (!subscription) {
//       return errorResponse(res, 'Transaction not found', 404);
//     }
    
//     const transaction = {
//       _id: subscription._id,
//       transactionId: subscription.paymentId || `TXN_${subscription._id}`,
//       user: subscription.user,
//       type: subscription.type || 'subscription',
//       amount: subscription.price?.amount || 0,
//       currency: subscription.price?.currency || 'INR',
//       status: subscription.status === 'active' ? 'success' : subscription.status,
//       createdAt: subscription.createdAt,
//       updatedAt: subscription.updatedAt,
//       paymentMethod: subscription.paymentMethod || 'unknown',
//       plan: subscription.plan,
//       billingCycle: subscription.billingCycle,
//       subscriptionId: subscription._id,
//       paymentDetails: {
//         paymentId: subscription.paymentId,
//         orderId: subscription.orderId
//       }
//     };
    
//     successResponse(res, transaction);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getTransactionStats = async (req, res, next) => {
//   try {
//     const now = new Date();
//     const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//     const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
//     const startOfYear = new Date(now.getFullYear(), 0, 1);
    
//     let stats = {
//       totalRevenue: 0,
//       todayRevenue: 0,
//       monthlyRevenue: 0,
//       yearlyRevenue: 0,
//       totalTransactions: 0,
//       todayTransactions: 0,
//       monthlyTransactions: 0,
//       yearlyTransactions: 0,
//       successfulTransactions: 0,
//       failedTransactions: 0,
//       pendingTransactions: 0,
//       averageTransactionValue: 0,
//       revenueByPlan: {},
//       transactionsByStatus: {},
//       transactionsByType: {},
//       recentTransactions: [],
//       dailyStats: []
//     };
    
//     const allSubscriptions = await Subscription.find({})
//       .populate('user', 'name email')
//       .sort({ createdAt: -1 });
    
//     allSubscriptions.forEach(sub => {
//       const amount = sub.price?.amount || 0;
//       const createdAt = new Date(sub.createdAt);
//       const status = sub.status === 'active' ? 'success' : sub.status;
      
//       if (status === 'success') {
//         stats.totalRevenue += amount;
//         stats.totalTransactions++;
//         stats.successfulTransactions++;
        
//         if (createdAt >= startOfToday) {
//           stats.todayRevenue += amount;
//           stats.todayTransactions++;
//         }
        
//         if (createdAt >= startOfMonth) {
//           stats.monthlyRevenue += amount;
//           stats.monthlyTransactions++;
//         }
        
//         if (createdAt >= startOfYear) {
//           stats.yearlyRevenue += amount;
//           stats.yearlyTransactions++;
//         }
        
//         const plan = sub.plan || 'unknown';
//         if (!stats.revenueByPlan[plan]) {
//           stats.revenueByPlan[plan] = 0;
//         }
//         stats.revenueByPlan[plan] += amount;
//       } else if (status === 'pending') {
//         stats.pendingTransactions++;
//       } else if (status === 'cancelled' || status === 'expired') {
//         stats.failedTransactions++;
//       }
      
//       if (!stats.transactionsByStatus[status]) {
//         stats.transactionsByStatus[status] = 0;
//       }
//       stats.transactionsByStatus[status]++;
      
//       const type = sub.type || 'subscription';
//       if (!stats.transactionsByType[type]) {
//         stats.transactionsByType[type] = 0;
//       }
//       stats.transactionsByType[type]++;
//     });
    
//     stats.averageTransactionValue = stats.totalTransactions > 0 
//       ? stats.totalRevenue / stats.totalTransactions 
//       : 0;
    
//     stats.recentTransactions = allSubscriptions.slice(0, 10).map(sub => ({
//       _id: sub._id,
//       transactionId: sub.paymentId || `TXN_${sub._id}`,
//       user: sub.user,
//       amount: sub.price?.amount || 0,
//       currency: sub.price?.currency || 'INR',
//       status: sub.status === 'active' ? 'success' : sub.status,
//       createdAt: sub.createdAt,
//       plan: sub.plan
//     }));
    
//     const last30Days = [];
//     for (let i = 29; i >= 0; i--) {
//       const date = new Date();
//       date.setDate(date.getDate() - i);
//       date.setHours(0, 0, 0, 0);
      
//       const nextDate = new Date(date);
//       nextDate.setDate(nextDate.getDate() + 1);
      
//       const dailyTransactions = allSubscriptions.filter(sub => {
//         const createdAt = new Date(sub.createdAt);
//         return createdAt >= date && createdAt < nextDate;
//       });
      
//       const dailyRevenue = dailyTransactions
//         .filter(sub => sub.status === 'active')
//         .reduce((sum, sub) => sum + (sub.price?.amount || 0), 0);
      
//       last30Days.push({
//         date: date.toISOString().split('T')[0],
//         revenue: dailyRevenue,
//         transactions: dailyTransactions.length,
//         successful: dailyTransactions.filter(t => t.status === 'active').length
//       });
//     }
    
//     stats.dailyStats = last30Days;
    
//     successResponse(res, stats);
//   } catch (error) {
//     next(error);
//   }
// };

// // Initialize default plans when server starts
// initializeDefaultPlans().catch(console.error);













// // server/controllers/subscription.controller.js
// import { Subscription, SubscriptionPlan } from '../models/Subscription.js';
// import User from '../models/User.js';
// import { successResponse, errorResponse } from '../utils/response.js';
// import crypto from 'crypto';

// // Payment gateway configurations
// let razorpayInstance = null;
// let stripeInstance = null;

// // Initialize Razorpay
// const initRazorpay = () => {
//   if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
//     try {
//       import('razorpay').then((Razorpay) => {
//         razorpayInstance = new Razorpay.default({
//           key_id: process.env.RAZORPAY_KEY_ID,
//           key_secret: process.env.RAZORPAY_KEY_SECRET,
//         });
//         console.log('✅ Razorpay initialized successfully');
//       }).catch(err => {
//         console.error('❌ Failed to initialize Razorpay:', err.message);
//       });
//     } catch (error) {
//       console.error('❌ Razorpay initialization error:', error.message);
//     }
//   }
// };

// // Initialize Stripe
// const initStripe = () => {
//   if (process.env.STRIPE_SECRET_KEY) {
//     try {
//       import('stripe').then((Stripe) => {
//         stripeInstance = new Stripe.default(process.env.STRIPE_SECRET_KEY);
//         console.log('✅ Stripe initialized successfully');
//       }).catch(err => {
//         console.error('❌ Failed to initialize Stripe:', err.message);
//       });
//     } catch (error) {
//       console.error('❌ Stripe initialization error:', error.message);
//     }
//   }
// };

// // Initialize payment gateways
// initRazorpay();
// initStripe();

// // Default plans with correct schema structure
// const defaultPlans = [
//   {
//     planId: 'free',
//     name: 'free',
//     displayName: 'Free',
//     description: 'Perfect for getting started with our platform',
//     price: { amount: 0, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       { name: 'Browse all content', included: true, limit: null },
//       { name: 'Read public poems', included: true, limit: null },
//       { name: 'Basic search', included: true, limit: null },
//       { name: 'Download content', included: false, limit: null },
//       { name: 'Ad-free experience', included: false, limit: null }
//     ],
//     limits: {
//       poemsPerDay: 50,
//       ebooksPerMonth: 2,
//       audiobooksPerMonth: 5,
//       unlimited: false,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 0,
//     badgeText: '',
//     recommended: false
//   },
//   {
//     planId: 'basic',
//     name: 'basic',
//     displayName: 'Basic',
//     description: 'Great for regular readers',
//     price: { amount: 99, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       { name: 'All free features', included: true, limit: null },
//       { name: 'Unlimited poem reading', included: true, limit: null },
//       { name: 'Download 5 ebooks/month', included: true, limit: 5 },
//       { name: 'Basic audio streaming', included: true, limit: null },
//       { name: 'Priority support', included: false, limit: null }
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: 5,
//       audiobooksPerMonth: 3,
//       unlimited: false,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 1,
//     badgeText: 'Popular',
//     recommended: true
//   },
//   {
//     planId: 'premium',
//     name: 'premium',
//     displayName: 'Premium',
//     description: 'For serious literature enthusiasts',
//     price: { amount: 199, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       { name: 'All Basic features', included: true, limit: null },
//       { name: 'Unlimited downloads', included: true, limit: null },
//       { name: 'HD audio streaming', included: true, limit: null },
//       { name: 'Ad-free experience', included: true, limit: null },
//       { name: 'AI explanations', included: true, limit: null }
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: null,
//       audiobooksPerMonth: null,
//       unlimited: true,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 2,
//     badgeText: 'Best Value',
//     recommended: true
//   },
//   {
//     planId: 'pro',
//     name: 'pro',
//     displayName: 'Pro',
//     description: 'For creators and power users',
//     price: { amount: 499, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       { name: 'All Premium features', included: true, limit: null },
//       { name: 'Creator tools', included: true, limit: null },
//       { name: 'Priority support', included: true, limit: null },
//       { name: 'Analytics dashboard', included: true, limit: null },
//       { name: 'Early access to new features', included: true, limit: null }
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: null,
//       audiobooksPerMonth: null,
//       unlimited: true,
//       creator: true
//     },
//     isActive: true,
//     displayOrder: 3,
//     badgeText: 'Creator',
//     recommended: false
//   }
// ];

// // Initialize default plans in database
// const initializeDefaultPlans = async () => {
//   try {
//     for (const planData of defaultPlans) {
//       const existingPlan = await SubscriptionPlan.findOne({ planId: planData.planId });
//       if (!existingPlan) {
//         await SubscriptionPlan.create(planData);
//         console.log(`✅ Created default plan: ${planData.planId}`);
//       }
//     }
//     console.log('✅ Default plans initialized successfully');
//   } catch (error) {
//     console.error('❌ Error initializing default plans:', error.message);
//   }
// };

// // ============== PUBLIC ROUTES ==============

// export const getPlans = async (req, res, next) => {
//   try {
//     let plans = await SubscriptionPlan.find({ isActive: true })
//       .sort({ displayOrder: 1, 'price.amount': 1 });
    
//     if (plans.length === 0) {
//       await initializeDefaultPlans();
//       plans = await SubscriptionPlan.find({ isActive: true })
//         .sort({ displayOrder: 1, 'price.amount': 1 });
//     }
    
//     const formattedPlans = plans.reduce((acc, plan) => {
//       acc[plan.planId] = {
//         name: plan.displayName,
//         price: plan.price.amount,
//         currency: plan.price.currency,
//         features: plan.features.filter(f => f.included).map(f => f.name),
//         limits: plan.limits,
//         badgeText: plan.badgeText,
//         recommended: plan.recommended,
//         description: plan.description
//       };
//       return acc;
//     }, {});
    
//     successResponse(res, formattedPlans);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriptionFeatures = async (req, res, next) => {
//   try {
//     let plans = await SubscriptionPlan.find({ isActive: true })
//       .sort({ displayOrder: 1, 'price.amount': 1 });
    
//     if (plans.length === 0) {
//       await initializeDefaultPlans();
//       plans = await SubscriptionPlan.find({ isActive: true })
//         .sort({ displayOrder: 1, 'price.amount': 1 });
//     }
    
//     successResponse(res, plans.map(plan => ({
//       id: plan.planId,
//       name: plan.displayName,
//       price: plan.price.amount,
//       currency: plan.price.currency,
//       features: plan.features.filter(f => f.included).map(f => f.name),
//       limits: plan.limits,
//       badgeText: plan.badgeText,
//       recommended: plan.recommended,
//       description: plan.description
//     })));
//   } catch (error) {
//     next(error);
//   }
// };

// export const getCurrentSubscription = async (req, res, next) => {
//   try {
//     const subscription = await Subscription.findOne({
//       user: req.user.id,
//       status: 'active'
//     }).sort({ createdAt: -1 });

//     const user = await User.findById(req.user.id);
    
//     const planDetails = await SubscriptionPlan.findOne({ planId: user.subscription.plan });
    
//     successResponse(res, {
//       subscription,
//       plan: user.subscription,
//       features: planDetails ? planDetails.features.filter(f => f.included).map(f => f.name) : []
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ============== SUBSCRIPTION WITH PAYMENT GATEWAYS ==============

// export const createRazorpayOrder = async (req, res, next) => {
//   try {
//     const { plan, billingCycle } = req.body;
    
//     if (!razorpayInstance) {
//       return errorResponse(res, 'Razorpay is not configured', 500);
//     }
    
//     let planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
    
//     if (!planDetails) {
//       await initializeDefaultPlans();
//       planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
      
//       if (!planDetails) {
//         return errorResponse(res, 'Invalid plan', 400);
//       }
//     }
    
//     const months = billingCycle === 'yearly' ? 12 : billingCycle === 'quarterly' ? 3 : 1;
//     const amount = planDetails.price.amount * months;
    
//     const options = {
//       amount: amount * 100,
//       currency: planDetails.price.currency,
//       receipt: `receipt_${Date.now()}`,
//       payment_capture: 1,
//       notes: {
//         userId: req.user.id,
//         plan: plan,
//         billingCycle: billingCycle
//       }
//     };
    
//     const order = await razorpayInstance.orders.create(options);
    
//     const subscription = await Subscription.create({
//       user: req.user.id,
//       plan,
//       status: 'pending',
//       price: { amount, currency: planDetails.price.currency },
//       billingCycle,
//       paymentMethod: 'razorpay',
//       expiresAt: new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000),
//       features: planDetails.features.filter(f => f.included).map(f => f.name),
//       orderId: order.id
//     });
    
//     successResponse(res, {
//       orderId: order.id,
//       amount: order.amount,
//       currency: order.currency,
//       subscriptionId: subscription._id,
//       key: process.env.RAZORPAY_KEY_ID
//     });
//   } catch (error) {
//     console.error('Razorpay order creation error:', error);
//     next(error);
//   }
// };

// export const createStripePaymentIntent = async (req, res, next) => {
//   try {
//     const { plan, billingCycle } = req.body;
    
//     if (!stripeInstance) {
//       return errorResponse(res, 'Stripe is not configured', 500);
//     }
    
//     let planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
    
//     if (!planDetails) {
//       await initializeDefaultPlans();
//       planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
      
//       if (!planDetails) {
//         return errorResponse(res, 'Invalid plan', 400);
//       }
//     }
    
//     const months = billingCycle === 'yearly' ? 12 : billingCycle === 'quarterly' ? 3 : 1;
//     const amount = planDetails.price.amount * months;
    
//     const paymentIntent = await stripeInstance.paymentIntents.create({
//       amount: amount * 100,
//       currency: planDetails.price.currency.toLowerCase(),
//       metadata: {
//         userId: req.user.id,
//         plan: plan,
//         billingCycle: billingCycle
//       }
//     });
    
//     const subscription = await Subscription.create({
//       user: req.user.id,
//       plan,
//       status: 'pending',
//       price: { amount, currency: planDetails.price.currency },
//       billingCycle,
//       paymentMethod: 'stripe',
//       expiresAt: new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000),
//       features: planDetails.features.filter(f => f.included).map(f => f.name),
//       paymentIntentId: paymentIntent.id
//     });
    
//     successResponse(res, {
//       clientSecret: paymentIntent.client_secret,
//       subscriptionId: subscription._id
//     });
//   } catch (error) {
//     console.error('Stripe payment intent creation error:', error);
//     next(error);
//   }
// };

// export const subscribe = async (req, res, next) => {
//   try {
//     const { plan, billingCycle, paymentMethod, couponCode } = req.body;
    
//     let planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
    
//     if (!planDetails) {
//       await initializeDefaultPlans();
//       planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
      
//       if (!planDetails) {
//         return errorResponse(res, 'Invalid plan', 400);
//       }
//     }
    
//     const months = billingCycle === 'yearly' ? 12 : billingCycle === 'quarterly' ? 3 : 1;
//     let amount = planDetails.price.amount * months;
    
//     // Apply coupon if provided
//     let discountAmount = 0;
//     let appliedCoupon = null;
//     if (couponCode) {
//       const coupon = coupons.find(c => c.code === couponCode.toUpperCase());
//       if (coupon && coupon.isActive && (!coupon.validUntil || new Date(coupon.validUntil) > new Date())) {
//         if (coupon.discountType === 'percentage') {
//           discountAmount = amount * coupon.discountValue / 100;
//         } else {
//           discountAmount = coupon.discountValue;
//         }
//         amount = Math.max(0, amount - discountAmount);
//         appliedCoupon = coupon;
//       }
//     }
    
//     if (plan === 'free' || amount === 0) {
//       const subscription = await Subscription.create({
//         user: req.user.id,
//         plan,
//         status: 'active',
//         price: { amount: 0, currency: planDetails.price.currency },
//         billingCycle,
//         paymentMethod: 'free',
//         expiresAt: null,
//         features: planDetails.features.filter(f => f.included).map(f => f.name),
//         discountApplied: discountAmount > 0 ? { amount: discountAmount, coupon: couponCode } : null
//       });
      
//       await User.findByIdAndUpdate(req.user.id, {
//         'subscription.plan': plan,
//         'subscription.startedAt': new Date(),
//         'subscription.expiresAt': null
//       });
      
//       return successResponse(res, { subscription, plan: planDetails }, 'Free subscription activated', 201);
//     }
    
//     const subscription = await Subscription.create({
//       user: req.user.id,
//       plan,
//       status: 'pending',
//       price: { amount, currency: planDetails.price.currency, originalAmount: planDetails.price.amount * months },
//       billingCycle,
//       paymentMethod: paymentMethod || 'pending',
//       expiresAt: new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000),
//       features: planDetails.features.filter(f => f.included).map(f => f.name),
//       discountApplied: discountAmount > 0 ? { amount: discountAmount, coupon: couponCode } : null
//     });
    
//     successResponse(res, { 
//       subscription, 
//       plan: planDetails,
//       requiresPayment: true,
//       discountApplied: discountAmount > 0 ? { amount: discountAmount, finalAmount: amount } : null
//     }, 'Subscription initiated, please complete payment', 201);
//   } catch (error) {
//     next(error);
//   }
// };

// export const verifyRazorpayPayment = async (req, res, next) => {
//   try {
//     const { orderId, paymentId, signature, subscriptionId } = req.body;
    
//     const body = orderId + "|" + paymentId;
//     const expectedSignature = crypto
//       .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(body.toString())
//       .digest('hex');
    
//     const isAuthentic = expectedSignature === signature;
    
//     if (!isAuthentic) {
//       return errorResponse(res, 'Invalid payment signature', 400);
//     }
    
//     const subscription = await Subscription.findByIdAndUpdate(
//       subscriptionId,
//       { 
//         status: 'active', 
//         paymentId,
//         orderId,
//         signature,
//         paymentDetails: { orderId, paymentId, signature },
//         verifiedAt: new Date()
//       },
//       { new: true }
//     );
    
//     if (!subscription) {
//       return errorResponse(res, 'Subscription not found', 404);
//     }
    
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': subscription.plan,
//       'subscription.startedAt': new Date(),
//       'subscription.expiresAt': subscription.expiresAt,
//       'subscription.status': 'active'
//     });
    
//     successResponse(res, subscription, 'Payment verified and subscription activated');
//   } catch (error) {
//     console.error('Razorpay verification error:', error);
//     next(error);
//   }
// };

// export const verifyStripePayment = async (req, res, next) => {
//   try {
//     const { paymentIntentId, subscriptionId } = req.body;
    
//     if (!stripeInstance) {
//       return errorResponse(res, 'Stripe is not configured', 500);
//     }
    
//     const paymentIntent = await stripeInstance.paymentIntents.retrieve(paymentIntentId);
    
//     if (paymentIntent.status !== 'succeeded') {
//       return errorResponse(res, 'Payment not successful', 400);
//     }
    
//     const subscription = await Subscription.findByIdAndUpdate(
//       subscriptionId,
//       { 
//         status: 'active', 
//         paymentId: paymentIntentId,
//         paymentDetails: paymentIntent,
//         verifiedAt: new Date()
//       },
//       { new: true }
//     );
    
//     if (!subscription) {
//       return errorResponse(res, 'Subscription not found', 404);
//     }
    
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': subscription.plan,
//       'subscription.startedAt': new Date(),
//       'subscription.expiresAt': subscription.expiresAt,
//       'subscription.status': 'active'
//     });
    
//     successResponse(res, subscription, 'Payment verified and subscription activated');
//   } catch (error) {
//     console.error('Stripe verification error:', error);
//     next(error);
//   }
// };

// export const verifyPayment = async (req, res, next) => {
//   try {
//     const { subscriptionId, paymentId, paymentDetails, orderId, signature } = req.body;
    
//     if (signature && orderId) {
//       const body = orderId + "|" + paymentId;
//       const expectedSignature = crypto
//         .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//         .update(body.toString())
//         .digest('hex');
      
//       const isAuthentic = expectedSignature === signature;
//       if (!isAuthentic) {
//         return errorResponse(res, 'Invalid payment signature', 400);
//       }
//     }
    
//     const subscription = await Subscription.findByIdAndUpdate(
//       subscriptionId,
//       { 
//         status: 'active', 
//         paymentId,
//         paymentDetails: { paymentId, orderId, signature, ...paymentDetails },
//         verifiedAt: new Date()
//       },
//       { new: true }
//     );
    
//     if (!subscription) {
//       return errorResponse(res, 'Subscription not found', 404);
//     }
    
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': subscription.plan,
//       'subscription.startedAt': new Date(),
//       'subscription.expiresAt': subscription.expiresAt,
//       'subscription.status': 'active'
//     });
    
//     successResponse(res, subscription, 'Payment verified');
//   } catch (error) {
//     next(error);
//   }
// };

// export const cancelSubscription = async (req, res, next) => {
//   try {
//     const subscription = await Subscription.findOneAndUpdate(
//       { user: req.user.id, status: 'active' },
//       { status: 'cancelled', cancelledAt: new Date() },
//       { new: true, sort: { createdAt: -1 } }
//     );
    
//     if (!subscription) {
//       return errorResponse(res, 'No active subscription found', 404);
//     }
    
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': 'free'
//     });
    
//     successResponse(res, subscription, 'Subscription cancelled');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getBillingHistory = async (req, res, next) => {
//   try {
//     const history = await Subscription.find({ user: req.user.id })
//       .sort({ createdAt: -1 });
    
//     successResponse(res, history);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============== WEBHOOKS FOR PAYMENT GATEWAYS ==============

// export const razorpayWebhook = async (req, res, next) => {
//   try {
//     const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
//     const signature = req.headers['x-razorpay-signature'];
    
//     const body = JSON.stringify(req.body);
//     const expectedSignature = crypto
//       .createHmac('sha256', secret)
//       .update(body)
//       .digest('hex');
    
//     if (expectedSignature !== signature) {
//       return res.status(400).json({ error: 'Invalid signature' });
//     }
    
//     const event = req.body;
    
//     if (event.event === 'payment.captured') {
//       const payment = event.payload.payment.entity;
//       const orderId = payment.order_id;
      
//       await Subscription.findOneAndUpdate(
//         { orderId },
//         { 
//           status: 'active',
//           paymentId: payment.id,
//           paymentDetails: payment,
//           verifiedAt: new Date()
//         }
//       );
//     }
    
//     res.status(200).json({ received: true });
//   } catch (error) {
//     console.error('Razorpay webhook error:', error);
//     res.status(500).json({ error: 'Webhook processing failed' });
//   }
// };

// export const stripeWebhook = async (req, res, next) => {
//   try {
//     const sig = req.headers['stripe-signature'];
//     const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
//     let event;
//     try {
//       event = stripeInstance.webhooks.constructEvent(req.body, sig, webhookSecret);
//     } catch (err) {
//       return res.status(400).json({ error: `Webhook Error: ${err.message}` });
//     }
    
//     if (event.type === 'payment_intent.succeeded') {
//       const paymentIntent = event.data.object;
      
//       await Subscription.findOneAndUpdate(
//         { paymentIntentId: paymentIntent.id },
//         { 
//           status: 'active',
//           paymentId: paymentIntent.id,
//           paymentDetails: paymentIntent,
//           verifiedAt: new Date()
//         }
//       );
//     }
    
//     res.status(200).json({ received: true });
//   } catch (error) {
//     console.error('Stripe webhook error:', error);
//     res.status(500).json({ error: 'Webhook processing failed' });
//   }
// };

// // ============== INVOICE ROUTES ==============

// export const getInvoiceById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const subscription = await Subscription.findById(id)
//       .populate('user', 'name email phone address');
    
//     if (!subscription) {
//       return errorResponse(res, 'Invoice not found', 404);
//     }
    
//     if (subscription.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
//       return errorResponse(res, 'Unauthorized', 403);
//     }
    
//     const invoice = {
//       id: subscription._id,
//       invoiceNumber: `INV-${subscription._id.toString().slice(-8).toUpperCase()}`,
//       date: subscription.createdAt,
//       dueDate: subscription.expiresAt,
//       customer: {
//         name: subscription.user.name,
//         email: subscription.user.email,
//         phone: subscription.user.phone,
//         address: subscription.user.address || {}
//       },
//       items: [{
//         description: `${subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} Plan - ${subscription.billingCycle} subscription`,
//         quantity: 1,
//         unitPrice: subscription.price.originalAmount || subscription.price.amount,
//         discount: subscription.discountApplied?.amount || 0,
//         total: subscription.price.amount
//       }],
//       subtotal: subscription.price.originalAmount || subscription.price.amount,
//       discount: subscription.discountApplied?.amount || 0,
//       tax: (subscription.price.amount) * 0.18,
//       total: subscription.price.amount * 1.18,
//       currency: subscription.price.currency,
//       status: subscription.status === 'active' ? 'paid' : subscription.status,
//       paymentMethod: subscription.paymentMethod,
//       paymentId: subscription.paymentId
//     };
    
//     successResponse(res, invoice);
//   } catch (error) {
//     next(error);
//   }
// };

// export const downloadInvoice = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const subscription = await Subscription.findById(id)
//       .populate('user', 'name email phone address');
    
//     if (!subscription) {
//       return errorResponse(res, 'Invoice not found', 404);
//     }
    
//     if (subscription.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
//       return errorResponse(res, 'Unauthorized', 403);
//     }
    
//     const invoiceHtml = generateInvoiceHTML(subscription);
    
//     res.setHeader('Content-Type', 'text/html');
//     res.setHeader('Content-Disposition', `attachment; filename=invoice-${subscription._id}.html`);
//     res.send(invoiceHtml);
//   } catch (error) {
//     next(error);
//   }
// };

// export const sendInvoiceEmail = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const subscription = await Subscription.findById(id)
//       .populate('user', 'name email');
    
//     if (!subscription) {
//       return errorResponse(res, 'Invoice not found', 404);
//     }
    
//     if (subscription.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
//       return errorResponse(res, 'Unauthorized', 403);
//     }
    
//     successResponse(res, null, 'Invoice email sent successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// const generateInvoiceHTML = (subscription) => {
//   const invoiceNumber = `INV-${subscription._id.toString().slice(-8).toUpperCase()}`;
//   const total = subscription.price.amount * 1.18;
//   const tax = subscription.price.amount * 0.18;
//   const discount = subscription.discountApplied?.amount || 0;
//   const subtotal = subscription.price.originalAmount || subscription.price.amount;
  
//   return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <title>Invoice ${invoiceNumber}</title>
//       <style>
//         body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
//         .invoice-container { max-width: 800px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; }
//         .header { text-align: center; margin-bottom: 30px; }
//         .company-info { margin-bottom: 20px; }
//         .invoice-info { text-align: right; margin-bottom: 20px; }
//         .customer-info { margin-bottom: 30px; }
//         table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
//         th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
//         th { background-color: #f5f5f5; }
//         .totals { text-align: right; margin-top: 20px; }
//         .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
//         .discount { color: green; }
//       </style>
//     </head>
//     <body>
//       <div class="invoice-container">
//         <div class="header">
//           <h1>Zauq App</h1>
//           <p>Literary Platform</p>
//         </div>
        
//         <div class="invoice-info">
//           <strong>Invoice #:</strong> ${invoiceNumber}<br>
//           <strong>Date:</strong> ${new Date(subscription.createdAt).toLocaleDateString()}<br>
//           <strong>Due Date:</strong> ${subscription.expiresAt ? new Date(subscription.expiresAt).toLocaleDateString() : 'N/A'}
//         </div>
        
//         <div class="customer-info">
//           <strong>Bill To:</strong><br>
//           ${subscription.user.name}<br>
//           ${subscription.user.email}<br>
//           ${subscription.user.phone || ''}
//         </div>
        
//         <table>
//           <thead>
//             <tr><th>Description</th><th>Quantity</th><th>Unit Price</th><th>Total</th></tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>${subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} Plan - ${subscription.billingCycle} subscription</td>
//               <td>1</td>
//               <td>${subscription.price.currency} ${subtotal}</td>
//               <td>${subscription.price.currency} ${subtotal}</td>
//             </tr>
//           </tbody>
//         </table>
        
//         <div class="totals">
//           ${discount > 0 ? `<p><strong>Subtotal:</strong> ${subscription.price.currency} ${subtotal}</p>` : ''}
//           ${discount > 0 ? `<p class="discount"><strong>Discount:</strong> -${subscription.price.currency} ${discount}</p>` : ''}
//           <p><strong>Tax (18%):</strong> ${subscription.price.currency} ${tax.toFixed(2)}</p>
//           <p><strong>Total:</strong> ${subscription.price.currency} ${total.toFixed(2)}</p>
//         </div>
        
//         <div class="footer">
//           <p>Thank you for your business!</p>
//           <p>For any questions, contact support@zauqapp.com</p>
//         </div>
//       </div>
//     </body>
//     </html>
//   `;
// };

// // ============== COUPON/DISCOUNT ROUTES ==============

// let coupons = [
//   {
//     code: 'WELCOME10',
//     discountType: 'percentage',
//     discountValue: 10,
//     validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
//     usageLimit: 100,
//     usedCount: 0,
//     minAmount: 0,
//     applicablePlans: ['basic', 'premium', 'pro'],
//     isActive: true
//   },
//   {
//     code: 'SAVE20',
//     discountType: 'percentage',
//     discountValue: 20,
//     validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
//     usageLimit: 50,
//     usedCount: 0,
//     minAmount: 500,
//     applicablePlans: ['premium', 'pro'],
//     isActive: true
//   },
//   {
//     code: 'FLAT100',
//     discountType: 'fixed',
//     discountValue: 100,
//     validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
//     usageLimit: 30,
//     usedCount: 0,
//     minAmount: 300,
//     applicablePlans: ['basic', 'premium', 'pro'],
//     isActive: true
//   }
// ];

// export const validateCoupon = async (req, res, next) => {
//   try {
//     const { code } = req.params;
//     const { plan, amount } = req.query;
    
//     const coupon = coupons.find(c => c.code === code.toUpperCase());
    
//     if (!coupon) {
//       return errorResponse(res, 'Invalid coupon code', 404);
//     }
    
//     if (!coupon.isActive) {
//       return errorResponse(res, 'Coupon is not active', 400);
//     }
    
//     if (coupon.validUntil && new Date(coupon.validUntil) < new Date()) {
//       return errorResponse(res, 'Coupon has expired', 400);
//     }
    
//     if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
//       return errorResponse(res, 'Coupon usage limit exceeded', 400);
//     }
    
//     if (plan && coupon.applicablePlans && !coupon.applicablePlans.includes(plan)) {
//       return errorResponse(res, `Coupon not applicable for ${plan} plan`, 400);
//     }
    
//     const orderAmount = parseFloat(amount);
//     if (coupon.minAmount && orderAmount < coupon.minAmount) {
//       return errorResponse(res, `Minimum order amount of ${coupon.minAmount} required`, 400);
//     }
    
//     let discountAmount = 0;
//     if (coupon.discountType === 'percentage') {
//       discountAmount = orderAmount * coupon.discountValue / 100;
//     } else {
//       discountAmount = coupon.discountValue;
//     }
    
//     const finalAmount = Math.max(0, orderAmount - discountAmount);
    
//     successResponse(res, {
//       coupon: {
//         code: coupon.code,
//         discountType: coupon.discountType,
//         discountValue: coupon.discountValue,
//         discountAmount: discountAmount,
//         finalAmount: finalAmount,
//         savedAmount: orderAmount - finalAmount
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const applyCoupon = async (req, res, next) => {
//   try {
//     const { code, plan, amount } = req.body;
    
//     const coupon = coupons.find(c => c.code === code.toUpperCase());
    
//     if (!coupon) {
//       return errorResponse(res, 'Invalid coupon code', 404);
//     }
    
//     if (!coupon.isActive) {
//       return errorResponse(res, 'Coupon is not active', 400);
//     }
    
//     if (coupon.validUntil && new Date(coupon.validUntil) < new Date()) {
//       return errorResponse(res, 'Coupon has expired', 400);
//     }
    
//     if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
//       return errorResponse(res, 'Coupon usage limit exceeded', 400);
//     }
    
//     if (plan && coupon.applicablePlans && !coupon.applicablePlans.includes(plan)) {
//       return errorResponse(res, `Coupon not applicable for ${plan} plan`, 400);
//     }
    
//     const orderAmount = parseFloat(amount);
//     if (coupon.minAmount && orderAmount < coupon.minAmount) {
//       return errorResponse(res, `Minimum order amount of ${coupon.minAmount} required`, 400);
//     }
    
//     let discountAmount = 0;
//     if (coupon.discountType === 'percentage') {
//       discountAmount = orderAmount * coupon.discountValue / 100;
//     } else {
//       discountAmount = coupon.discountValue;
//     }
    
//     const finalAmount = Math.max(0, orderAmount - discountAmount);
    
//     coupon.usedCount++;
    
//     successResponse(res, {
//       coupon: {
//         code: coupon.code,
//         discountType: coupon.discountType,
//         discountValue: coupon.discountValue,
//         discountAmount: discountAmount,
//         finalAmount: finalAmount,
//         savedAmount: orderAmount - finalAmount
//       },
//       applied: true
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ============== CMS ROUTES (Admin Only) ==============

// export const getAllPlansCMS = async (req, res, next) => {
//   try {
//     const plans = await SubscriptionPlan.find().sort({ displayOrder: 1, 'price.amount': 1 });
    
//     const plansWithStats = await Promise.all(plans.map(async (plan) => {
//       const subscriberCount = await Subscription.countDocuments({ 
//         plan: plan.planId, 
//         status: 'active' 
//       });
      
//       const planObj = plan.toObject();
//       planObj.subscriberCount = subscriberCount;
      
//       return planObj;
//     }));
    
//     successResponse(res, plansWithStats);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getPlanByIdCMS = async (req, res, next) => {
//   try {
//     const plan = await SubscriptionPlan.findById(req.params.id);
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }
//     successResponse(res, plan);
//   } catch (error) {
//     next(error);
//   }
// };

// export const createPlanCMS = async (req, res, next) => {
//   try {
//     const {
//       planId,
//       name,
//       displayName,
//       description,
//       price,
//       billingCycle,
//       features,
//       limits,
//       isActive,
//       displayOrder,
//       badgeText,
//       recommended
//     } = req.body;
    
//     const validPlans = ['free', 'basic', 'premium', 'pro'];
//     if (!validPlans.includes(planId)) {
//       return errorResponse(res, 'Invalid plan ID. Must be free, basic, premium, or pro', 400);
//     }
    
//     const existingPlan = await SubscriptionPlan.findOne({ planId });
//     if (existingPlan) {
//       return errorResponse(res, 'Plan ID already exists', 400);
//     }
    
//     const plan = await SubscriptionPlan.create({
//       planId,
//       name: name || planId,
//       displayName,
//       description: description || '',
//       price: {
//         amount: price?.amount || 0,
//         currency: price?.currency || 'INR'
//       },
//       billingCycle: billingCycle || 'monthly',
//       features: features || [],
//       limits: {
//         poemsPerDay: limits?.poemsPerDay || null,
//         ebooksPerMonth: limits?.ebooksPerMonth || null,
//         audiobooksPerMonth: limits?.audiobooksPerMonth || null,
//         unlimited: limits?.unlimited || false,
//         creator: limits?.creator || false
//       },
//       isActive: isActive !== undefined ? isActive : true,
//       displayOrder: displayOrder || 0,
//       badgeText: badgeText || '',
//       recommended: recommended || false
//     });
    
//     successResponse(res, plan, 'Plan created successfully', 201);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updatePlanCMS = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;
    
//     delete updateData.planId;
//     delete updateData._id;
    
//     const plan = await SubscriptionPlan.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true, runValidators: true }
//     );
    
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }
    
//     successResponse(res, plan, 'Plan updated successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const deletePlanCMS = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { permanent } = req.query;
    
//     const plan = await SubscriptionPlan.findById(id);
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }
    
//     const activeSubscriptions = await Subscription.countDocuments({
//       plan: plan.planId,
//       status: 'active'
//     });
    
//     if (permanent === 'true') {
//       if (activeSubscriptions > 0) {
//         return errorResponse(res, `Cannot delete plan with ${activeSubscriptions} active subscriptions. Deactivate it instead.`, 400);
//       }
//       await SubscriptionPlan.findByIdAndDelete(id);
//       successResponse(res, null, 'Plan permanently deleted');
//     } else {
//       plan.isActive = false;
//       await plan.save();
//       successResponse(res, plan, 'Plan deactivated successfully');
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// export const togglePlanStatusCMS = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const plan = await SubscriptionPlan.findById(id);
    
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }
    
//     plan.isActive = !plan.isActive;
//     await plan.save();
    
//     successResponse(res, plan, `Plan ${plan.isActive ? 'activated' : 'deactivated'} successfully`);
//   } catch (error) {
//     next(error);
//   }
// };

// export const reorderPlansCMS = async (req, res, next) => {
//   try {
//     const { orders } = req.body;
    
//     const updatePromises = orders.map(({ id, order }) =>
//       SubscriptionPlan.findByIdAndUpdate(id, { displayOrder: order }, { new: true })
//     );
    
//     await Promise.all(updatePromises);
//     successResponse(res, null, 'Plans reordered successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriptionStatsCMS = async (req, res, next) => {
//   try {
//     const totalPlans = await SubscriptionPlan.countDocuments();
//     const activePlans = await SubscriptionPlan.countDocuments({ isActive: true });
//     const totalUsers = await User.countDocuments();
//     const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });
    
//     const revenueStats = await Subscription.aggregate([
//       { $match: { status: 'active', 'price.amount': { $gt: 0 } } },
//       { $group: {
//         _id: null,
//         totalMonthlyRevenue: { $sum: '$price.amount' },
//         averageSubscriptionValue: { $avg: '$price.amount' }
//       }}
//     ]);
    
//     const planDistribution = await Subscription.aggregate([
//       { $match: { status: 'active' } },
//       { $group: { _id: '$plan', count: { $sum: 1 } } }
//     ]);
    
//     successResponse(res, {
//       totalPlans,
//       activePlans,
//       totalUsers,
//       activeSubscriptions,
//       revenue: revenueStats[0] || { totalMonthlyRevenue: 0, averageSubscriptionValue: 0 },
//       planDistribution
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ============== SUBSCRIBERS MANAGEMENT ==============

// export const getAllSubscribers = async (req, res, next) => {
//   try {
//     const { page = 1, limit = 20, status, plan, search } = req.query;
    
//     let query = {};
    
//     if (status && status !== 'all') {
//       query.status = status;
//     }
    
//     if (plan && plan !== 'all') {
//       query.plan = plan;
//     }
    
//     const subscriptions = await Subscription.find(query)
//       .populate('user', 'name email profilePicture phone createdAt')
//       .sort({ createdAt: -1 })
//       .skip((parseInt(page) - 1) * parseInt(limit))
//       .limit(parseInt(limit));
    
//     let filteredSubscriptions = subscriptions;
//     if (search) {
//       filteredSubscriptions = subscriptions.filter(sub => 
//         sub.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
//         sub.user?.email?.toLowerCase().includes(search.toLowerCase())
//       );
//     }
    
//     const total = await Subscription.countDocuments(query);
    
//     const enhancedSubscriptions = filteredSubscriptions.map((sub) => {
//       const subObj = sub.toObject();
      
//       if (subObj.expiresAt) {
//         const daysRemaining = Math.ceil((new Date(subObj.expiresAt) - new Date()) / (1000 * 60 * 60 * 24));
//         subObj.daysRemaining = daysRemaining > 0 ? daysRemaining : 0;
//       }
      
//       if (subObj.startDate && subObj.expiresAt) {
//         const durationDays = Math.ceil((new Date(subObj.expiresAt) - new Date(subObj.startDate)) / (1000 * 60 * 60 * 24));
//         subObj.durationDays = durationDays;
//       }
      
//       if (!subObj.startDate) {
//         subObj.startDate = subObj.createdAt;
//       }
      
//       return subObj;
//     });
    
//     successResponse(res, {
//       subscribers: enhancedSubscriptions,
//       pagination: {
//         page: parseInt(page),
//         limit: parseInt(limit),
//         total,
//         pages: Math.ceil(total / limit)
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriberById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const subscription = await Subscription.findById(id)
//       .populate('user', 'name email profilePicture phone createdAt');
    
//     if (!subscription) {
//       return errorResponse(res, 'Subscriber not found', 404);
//     }
    
//     const subscriptionHistory = await Subscription.find({ user: subscription.user._id })
//       .sort({ createdAt: -1 });
    
//     const lifetimeValue = subscriptionHistory
//       .filter(sub => sub.status === 'active' || sub.status === 'cancelled')
//       .reduce((sum, sub) => sum + (sub.price?.amount || 0), 0);
    
//     const subscriberData = subscription.toObject();
//     subscriberData.history = subscriptionHistory;
//     subscriberData.lifetimeValue = lifetimeValue;
//     subscriberData.totalSubscriptions = subscriptionHistory.length;
    
//     successResponse(res, subscriberData);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============== TRANSACTIONS MANAGEMENT ==============

// export const getAllTransactions = async (req, res, next) => {
//   try {
//     const { 
//       page = 1, 
//       limit = 20, 
//       status, 
//       type, 
//       startDate, 
//       endDate,
//       search 
//     } = req.query;
    
//     let query = {};
    
//     if (status && status !== 'all') {
//       query.status = status === 'success' ? 'active' : status;
//     }
    
//     if (type && type !== 'all') {
//       query.type = type;
//     }
    
//     if (startDate || endDate) {
//       query.createdAt = {};
//       if (startDate) {
//         query.createdAt.$gte = new Date(startDate);
//       }
//       if (endDate) {
//         query.createdAt.$lte = new Date(endDate);
//       }
//     }
    
//     let subscriptions = await Subscription.find(query)
//       .populate('user', 'name email')
//       .sort({ createdAt: -1 });
    
//     let transactions = subscriptions.map(sub => ({
//       _id: sub._id,
//       transactionId: sub.paymentId || `TXN_${sub._id}`,
//       user: sub.user,
//       type: sub.type || 'subscription',
//       amount: sub.price?.amount || 0,
//       currency: sub.price?.currency || 'INR',
//       status: sub.status === 'active' ? 'success' : sub.status === 'pending' ? 'pending' : sub.status,
//       createdAt: sub.createdAt,
//       paymentMethod: sub.paymentMethod || 'unknown',
//       plan: sub.plan,
//       billingCycle: sub.billingCycle,
//       subscriptionId: sub._id,
//       discountApplied: sub.discountApplied
//     }));
    
//     if (search) {
//       transactions = transactions.filter(t => 
//         t.transactionId?.toLowerCase().includes(search.toLowerCase()) ||
//         t.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
//         t.user?.email?.toLowerCase().includes(search.toLowerCase())
//       );
//     }
    
//     if (status && status !== 'all') {
//       transactions = transactions.filter(t => t.status === status);
//     }
    
//     if (type && type !== 'all') {
//       transactions = transactions.filter(t => t.type === type);
//     }
    
//     const start = (parseInt(page) - 1) * parseInt(limit);
//     const paginatedTransactions = transactions.slice(start, start + parseInt(limit));
    
//     successResponse(res, {
//       transactions: paginatedTransactions,
//       pagination: {
//         page: parseInt(page),
//         limit: parseInt(limit),
//         total: transactions.length,
//         pages: Math.ceil(transactions.length / limit)
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getTransactionById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const subscription = await Subscription.findById(id)
//       .populate('user', 'name email phone');
    
//     if (!subscription) {
//       return errorResponse(res, 'Transaction not found', 404);
//     }
    
//     const transaction = {
//       _id: subscription._id,
//       transactionId: subscription.paymentId || `TXN_${subscription._id}`,
//       user: subscription.user,
//       type: subscription.type || 'subscription',
//       amount: subscription.price?.amount || 0,
//       currency: subscription.price?.currency || 'INR',
//       status: subscription.status === 'active' ? 'success' : subscription.status,
//       createdAt: subscription.createdAt,
//       updatedAt: subscription.updatedAt,
//       paymentMethod: subscription.paymentMethod || 'unknown',
//       plan: subscription.plan,
//       billingCycle: subscription.billingCycle,
//       subscriptionId: subscription._id,
//       paymentDetails: {
//         paymentId: subscription.paymentId,
//         orderId: subscription.orderId
//       },
//       discountApplied: subscription.discountApplied
//     };
    
//     successResponse(res, transaction);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getTransactionStats = async (req, res, next) => {
//   try {
//     const now = new Date();
//     const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//     const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
//     const startOfYear = new Date(now.getFullYear(), 0, 1);
    
//     let stats = {
//       totalRevenue: 0,
//       todayRevenue: 0,
//       monthlyRevenue: 0,
//       yearlyRevenue: 0,
//       totalTransactions: 0,
//       todayTransactions: 0,
//       monthlyTransactions: 0,
//       yearlyTransactions: 0,
//       successfulTransactions: 0,
//       failedTransactions: 0,
//       pendingTransactions: 0,
//       averageTransactionValue: 0,
//       revenueByPlan: {},
//       transactionsByStatus: {},
//       transactionsByType: {},
//       recentTransactions: [],
//       dailyStats: [],
//       totalDiscountGiven: 0
//     };
    
//     const allSubscriptions = await Subscription.find({})
//       .populate('user', 'name email')
//       .sort({ createdAt: -1 });
    
//     allSubscriptions.forEach(sub => {
//       const amount = sub.price?.amount || 0;
//       const originalAmount = sub.price?.originalAmount || amount;
//       const discountGiven = originalAmount - amount;
//       const createdAt = new Date(sub.createdAt);
//       const status = sub.status === 'active' ? 'success' : sub.status;
      
//       if (status === 'success') {
//         stats.totalRevenue += amount;
//         stats.totalDiscountGiven += discountGiven;
//         stats.totalTransactions++;
//         stats.successfulTransactions++;
        
//         if (createdAt >= startOfToday) {
//           stats.todayRevenue += amount;
//           stats.todayTransactions++;
//         }
        
//         if (createdAt >= startOfMonth) {
//           stats.monthlyRevenue += amount;
//           stats.monthlyTransactions++;
//         }
        
//         if (createdAt >= startOfYear) {
//           stats.yearlyRevenue += amount;
//           stats.yearlyTransactions++;
//         }
        
//         const plan = sub.plan || 'unknown';
//         if (!stats.revenueByPlan[plan]) {
//           stats.revenueByPlan[plan] = 0;
//         }
//         stats.revenueByPlan[plan] += amount;
//       } else if (status === 'pending') {
//         stats.pendingTransactions++;
//       } else if (status === 'cancelled' || status === 'expired') {
//         stats.failedTransactions++;
//       }
      
//       if (!stats.transactionsByStatus[status]) {
//         stats.transactionsByStatus[status] = 0;
//       }
//       stats.transactionsByStatus[status]++;
      
//       const type = sub.type || 'subscription';
//       if (!stats.transactionsByType[type]) {
//         stats.transactionsByType[type] = 0;
//       }
//       stats.transactionsByType[type]++;
//     });
    
//     stats.averageTransactionValue = stats.totalTransactions > 0 
//       ? stats.totalRevenue / stats.totalTransactions 
//       : 0;
    
//     stats.recentTransactions = allSubscriptions.slice(0, 10).map(sub => ({
//       _id: sub._id,
//       transactionId: sub.paymentId || `TXN_${sub._id}`,
//       user: sub.user,
//       amount: sub.price?.amount || 0,
//       currency: sub.price?.currency || 'INR',
//       status: sub.status === 'active' ? 'success' : sub.status,
//       createdAt: sub.createdAt,
//       plan: sub.plan
//     }));
    
//     const last30Days = [];
//     for (let i = 29; i >= 0; i--) {
//       const date = new Date();
//       date.setDate(date.getDate() - i);
//       date.setHours(0, 0, 0, 0);
      
//       const nextDate = new Date(date);
//       nextDate.setDate(nextDate.getDate() + 1);
      
//       const dailyTransactions = allSubscriptions.filter(sub => {
//         const createdAt = new Date(sub.createdAt);
//         return createdAt >= date && createdAt < nextDate;
//       });
      
//       const dailyRevenue = dailyTransactions
//         .filter(sub => sub.status === 'active')
//         .reduce((sum, sub) => sum + (sub.price?.amount || 0), 0);
      
//       last30Days.push({
//         date: date.toISOString().split('T')[0],
//         revenue: dailyRevenue,
//         transactions: dailyTransactions.length,
//         successful: dailyTransactions.filter(t => t.status === 'active').length
//       });
//     }
    
//     stats.dailyStats = last30Days;
    
//     successResponse(res, stats);
//   } catch (error) {
//     next(error);
//   }
// };

// // Initialize default plans when server starts
// initializeDefaultPlans().catch(console.error);












// // server/controllers/subscription.controller.js
// import { Subscription, SubscriptionPlan } from '../models/Subscription.js';
// import User from '../models/User.js';
// import { successResponse, errorResponse } from '../utils/response.js';
// import crypto from 'crypto';
// import mongoose from 'mongoose';

// // Payment gateway configurations
// let razorpayInstance = null;
// let stripeInstance = null;

// // Initialize Razorpay
// const initRazorpay = () => {
//   if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
//     try {
//       import('razorpay').then((Razorpay) => {
//         razorpayInstance = new Razorpay.default({
//           key_id: process.env.RAZORPAY_KEY_ID,
//           key_secret: process.env.RAZORPAY_KEY_SECRET,
//         });
//         console.log('✅ Razorpay initialized successfully');
//       }).catch(err => {
//         console.error('❌ Failed to initialize Razorpay:', err.message);
//       });
//     } catch (error) {
//       console.error('❌ Razorpay initialization error:', error.message);
//     }
//   }
// };

// // Initialize Stripe
// const initStripe = () => {
//   if (process.env.STRIPE_SECRET_KEY) {
//     try {
//       import('stripe').then((Stripe) => {
//         stripeInstance = new Stripe.default(process.env.STRIPE_SECRET_KEY);
//         console.log('✅ Stripe initialized successfully');
//       }).catch(err => {
//         console.error('❌ Failed to initialize Stripe:', err.message);
//       });
//     } catch (error) {
//       console.error('❌ Stripe initialization error:', error.message);
//     }
//   }
// };

// // Initialize payment gateways
// initRazorpay();
// initStripe();

// // Default plans with correct schema structure
// const defaultPlans = [
//   {
//     planId: 'free',
//     name: 'free',
//     displayName: 'Free',
//     description: 'Perfect for getting started with our platform',
//     price: { amount: 0, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       { name: 'Browse all content', included: true, limit: null },
//       { name: 'Read public poems', included: true, limit: null },
//       { name: 'Basic search', included: true, limit: null },
//       { name: 'Download content', included: false, limit: null },
//       { name: 'Ad-free experience', included: false, limit: null }
//     ],
//     limits: {
//       poemsPerDay: 50,
//       ebooksPerMonth: 2,
//       audiobooksPerMonth: 5,
//       unlimited: false,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 0,
//     badgeText: '',
//     recommended: false
//   },
//   {
//     planId: 'basic',
//     name: 'basic',
//     displayName: 'Basic',
//     description: 'Great for regular readers',
//     price: { amount: 99, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       { name: 'All free features', included: true, limit: null },
//       { name: 'Unlimited poem reading', included: true, limit: null },
//       { name: 'Download 5 ebooks/month', included: true, limit: 5 },
//       { name: 'Basic audio streaming', included: true, limit: null },
//       { name: 'Priority support', included: false, limit: null }
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: 5,
//       audiobooksPerMonth: 3,
//       unlimited: false,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 1,
//     badgeText: 'Popular',
//     recommended: true
//   },
//   {
//     planId: 'premium',
//     name: 'premium',
//     displayName: 'Premium',
//     description: 'For serious literature enthusiasts',
//     price: { amount: 199, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       { name: 'All Basic features', included: true, limit: null },
//       { name: 'Unlimited downloads', included: true, limit: null },
//       { name: 'HD audio streaming', included: true, limit: null },
//       { name: 'Ad-free experience', included: true, limit: null },
//       { name: 'AI explanations', included: true, limit: null }
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: null,
//       audiobooksPerMonth: null,
//       unlimited: true,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 2,
//     badgeText: 'Best Value',
//     recommended: true
//   },
//   {
//     planId: 'pro',
//     name: 'pro',
//     displayName: 'Pro',
//     description: 'For creators and power users',
//     price: { amount: 499, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       { name: 'All Premium features', included: true, limit: null },
//       { name: 'Creator tools', included: true, limit: null },
//       { name: 'Priority support', included: true, limit: null },
//       { name: 'Analytics dashboard', included: true, limit: null },
//       { name: 'Early access to new features', included: true, limit: null }
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: null,
//       audiobooksPerMonth: null,
//       unlimited: true,
//       creator: true
//     },
//     isActive: true,
//     displayOrder: 3,
//     badgeText: 'Creator',
//     recommended: false
//   }
// ];

// // Initialize default plans in database
// const initializeDefaultPlans = async () => {
//   try {
//     for (const planData of defaultPlans) {
//       const existingPlan = await SubscriptionPlan.findOne({ planId: planData.planId });
//       if (!existingPlan) {
//         await SubscriptionPlan.create(planData);
//         console.log(`✅ Created default plan: ${planData.planId}`);
//       }
//     }
//     console.log('✅ Default plans initialized successfully');
//   } catch (error) {
//     console.error('❌ Error initializing default plans:', error.message);
//   }
// };

// // ============== PUBLIC ROUTES ==============

// export const getPlans = async (req, res, next) => {
//   try {
//     let plans = await SubscriptionPlan.find({ isActive: true })
//       .sort({ displayOrder: 1, 'price.amount': 1 });
    
//     if (plans.length === 0) {
//       await initializeDefaultPlans();
//       plans = await SubscriptionPlan.find({ isActive: true })
//         .sort({ displayOrder: 1, 'price.amount': 1 });
//     }
    
//     const formattedPlans = plans.reduce((acc, plan) => {
//       acc[plan.planId] = {
//         name: plan.displayName,
//         price: plan.price.amount,
//         currency: plan.price.currency,
//         features: plan.features.filter(f => f.included).map(f => f.name),
//         limits: plan.limits,
//         badgeText: plan.badgeText,
//         recommended: plan.recommended,
//         description: plan.description
//       };
//       return acc;
//     }, {});
    
//     successResponse(res, formattedPlans);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriptionFeatures = async (req, res, next) => {
//   try {
//     let plans = await SubscriptionPlan.find({ isActive: true })
//       .sort({ displayOrder: 1, 'price.amount': 1 });
    
//     if (plans.length === 0) {
//       await initializeDefaultPlans();
//       plans = await SubscriptionPlan.find({ isActive: true })
//         .sort({ displayOrder: 1, 'price.amount': 1 });
//     }
    
//     successResponse(res, plans.map(plan => ({
//       id: plan.planId,
//       name: plan.displayName,
//       price: plan.price.amount,
//       currency: plan.price.currency,
//       features: plan.features.filter(f => f.included).map(f => f.name),
//       limits: plan.limits,
//       badgeText: plan.badgeText,
//       recommended: plan.recommended,
//       description: plan.description
//     })));
//   } catch (error) {
//     next(error);
//   }
// };

// export const getCurrentSubscription = async (req, res, next) => {
//   try {
//     const subscription = await Subscription.findOne({
//       user: req.user.id,
//       status: 'active'
//     }).sort({ createdAt: -1 });

//     const user = await User.findById(req.user.id);
    
//     const planDetails = await SubscriptionPlan.findOne({ planId: user.subscription.plan });
    
//     successResponse(res, {
//       subscription,
//       plan: user.subscription,
//       features: planDetails ? planDetails.features.filter(f => f.included).map(f => f.name) : []
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ============== SUBSCRIPTION WITH PAYMENT GATEWAYS ==============

// export const createRazorpayOrder = async (req, res, next) => {
//   try {
//     const { plan, billingCycle } = req.body;
    
//     if (!razorpayInstance) {
//       return errorResponse(res, 'Razorpay is not configured', 500);
//     }
    
//     let planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
    
//     if (!planDetails) {
//       await initializeDefaultPlans();
//       planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
      
//       if (!planDetails) {
//         return errorResponse(res, 'Invalid plan', 400);
//       }
//     }
    
//     const months = billingCycle === 'yearly' ? 12 : billingCycle === 'quarterly' ? 3 : 1;
//     const amount = planDetails.price.amount * months;
    
//     const options = {
//       amount: amount * 100,
//       currency: planDetails.price.currency,
//       receipt: `receipt_${Date.now()}`,
//       payment_capture: 1,
//       notes: {
//         userId: req.user.id,
//         plan: plan,
//         billingCycle: billingCycle
//       }
//     };
    
//     const order = await razorpayInstance.orders.create(options);
    
//     const subscription = await Subscription.create({
//       user: req.user.id,
//       plan,
//       status: 'pending',
//       price: { amount, currency: planDetails.price.currency },
//       billingCycle,
//       paymentMethod: 'razorpay',
//       expiresAt: new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000),
//       features: planDetails.features.filter(f => f.included).map(f => f.name),
//       orderId: order.id
//     });
    
//     successResponse(res, {
//       orderId: order.id,
//       amount: order.amount,
//       currency: order.currency,
//       subscriptionId: subscription._id,
//       key: process.env.RAZORPAY_KEY_ID
//     });
//   } catch (error) {
//     console.error('Razorpay order creation error:', error);
//     next(error);
//   }
// };

// export const createStripePaymentIntent = async (req, res, next) => {
//   try {
//     const { plan, billingCycle } = req.body;
    
//     if (!stripeInstance) {
//       return errorResponse(res, 'Stripe is not configured', 500);
//     }
    
//     let planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
    
//     if (!planDetails) {
//       await initializeDefaultPlans();
//       planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
      
//       if (!planDetails) {
//         return errorResponse(res, 'Invalid plan', 400);
//       }
//     }
    
//     const months = billingCycle === 'yearly' ? 12 : billingCycle === 'quarterly' ? 3 : 1;
//     const amount = planDetails.price.amount * months;
    
//     const paymentIntent = await stripeInstance.paymentIntents.create({
//       amount: amount * 100,
//       currency: planDetails.price.currency.toLowerCase(),
//       metadata: {
//         userId: req.user.id,
//         plan: plan,
//         billingCycle: billingCycle
//       }
//     });
    
//     const subscription = await Subscription.create({
//       user: req.user.id,
//       plan,
//       status: 'pending',
//       price: { amount, currency: planDetails.price.currency },
//       billingCycle,
//       paymentMethod: 'stripe',
//       expiresAt: new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000),
//       features: planDetails.features.filter(f => f.included).map(f => f.name),
//       paymentIntentId: paymentIntent.id
//     });
    
//     successResponse(res, {
//       clientSecret: paymentIntent.client_secret,
//       subscriptionId: subscription._id
//     });
//   } catch (error) {
//     console.error('Stripe payment intent creation error:', error);
//     next(error);
//   }
// };

// export const subscribe = async (req, res, next) => {
//   try {
//     const { plan, billingCycle, paymentMethod, couponCode } = req.body;
    
//     let planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
    
//     if (!planDetails) {
//       await initializeDefaultPlans();
//       planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
      
//       if (!planDetails) {
//         return errorResponse(res, 'Invalid plan', 400);
//       }
//     }
    
//     const months = billingCycle === 'yearly' ? 12 : billingCycle === 'quarterly' ? 3 : 1;
//     let amount = planDetails.price.amount * months;
    
//     // Apply coupon if provided
//     let discountAmount = 0;
//     let appliedCoupon = null;
//     if (couponCode) {
//       const coupon = coupons.find(c => c.code === couponCode.toUpperCase());
//       if (coupon && coupon.isActive && (!coupon.validUntil || new Date(coupon.validUntil) > new Date())) {
//         if (coupon.discountType === 'percentage') {
//           discountAmount = amount * coupon.discountValue / 100;
//         } else {
//           discountAmount = coupon.discountValue;
//         }
//         amount = Math.max(0, amount - discountAmount);
//         appliedCoupon = coupon;
//       }
//     }
    
//     if (plan === 'free' || amount === 0) {
//       const subscription = await Subscription.create({
//         user: req.user.id,
//         plan,
//         status: 'active',
//         price: { amount: 0, currency: planDetails.price.currency },
//         billingCycle,
//         paymentMethod: 'free',
//         expiresAt: null,
//         features: planDetails.features.filter(f => f.included).map(f => f.name),
//         discountApplied: discountAmount > 0 ? { amount: discountAmount, coupon: couponCode } : null
//       });
      
//       await User.findByIdAndUpdate(req.user.id, {
//         'subscription.plan': plan,
//         'subscription.startedAt': new Date(),
//         'subscription.expiresAt': null
//       });
      
//       return successResponse(res, { subscription, plan: planDetails }, 'Free subscription activated', 201);
//     }
    
//     const subscription = await Subscription.create({
//       user: req.user.id,
//       plan,
//       status: 'pending',
//       price: { amount, currency: planDetails.price.currency, originalAmount: planDetails.price.amount * months },
//       billingCycle,
//       paymentMethod: paymentMethod || 'pending',
//       expiresAt: new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000),
//       features: planDetails.features.filter(f => f.included).map(f => f.name),
//       discountApplied: discountAmount > 0 ? { amount: discountAmount, coupon: couponCode } : null
//     });
    
//     successResponse(res, { 
//       subscription, 
//       plan: planDetails,
//       requiresPayment: true,
//       discountApplied: discountAmount > 0 ? { amount: discountAmount, finalAmount: amount } : null
//     }, 'Subscription initiated, please complete payment', 201);
//   } catch (error) {
//     next(error);
//   }
// };

// export const verifyRazorpayPayment = async (req, res, next) => {
//   try {
//     const { orderId, paymentId, signature, subscriptionId } = req.body;
    
//     const body = orderId + "|" + paymentId;
//     const expectedSignature = crypto
//       .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(body.toString())
//       .digest('hex');
    
//     const isAuthentic = expectedSignature === signature;
    
//     if (!isAuthentic) {
//       return errorResponse(res, 'Invalid payment signature', 400);
//     }
    
//     const subscription = await Subscription.findByIdAndUpdate(
//       subscriptionId,
//       { 
//         status: 'active', 
//         paymentId,
//         orderId,
//         signature,
//         paymentDetails: { orderId, paymentId, signature },
//         verifiedAt: new Date()
//       },
//       { new: true }
//     );
    
//     if (!subscription) {
//       return errorResponse(res, 'Subscription not found', 404);
//     }
    
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': subscription.plan,
//       'subscription.startedAt': new Date(),
//       'subscription.expiresAt': subscription.expiresAt,
//       'subscription.status': 'active'
//     });
    
//     successResponse(res, subscription, 'Payment verified and subscription activated');
//   } catch (error) {
//     console.error('Razorpay verification error:', error);
//     next(error);
//   }
// };

// export const verifyStripePayment = async (req, res, next) => {
//   try {
//     const { paymentIntentId, subscriptionId } = req.body;
    
//     if (!stripeInstance) {
//       return errorResponse(res, 'Stripe is not configured', 500);
//     }
    
//     const paymentIntent = await stripeInstance.paymentIntents.retrieve(paymentIntentId);
    
//     if (paymentIntent.status !== 'succeeded') {
//       return errorResponse(res, 'Payment not successful', 400);
//     }
    
//     const subscription = await Subscription.findByIdAndUpdate(
//       subscriptionId,
//       { 
//         status: 'active', 
//         paymentId: paymentIntentId,
//         paymentDetails: paymentIntent,
//         verifiedAt: new Date()
//       },
//       { new: true }
//     );
    
//     if (!subscription) {
//       return errorResponse(res, 'Subscription not found', 404);
//     }
    
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': subscription.plan,
//       'subscription.startedAt': new Date(),
//       'subscription.expiresAt': subscription.expiresAt,
//       'subscription.status': 'active'
//     });
    
//     successResponse(res, subscription, 'Payment verified and subscription activated');
//   } catch (error) {
//     console.error('Stripe verification error:', error);
//     next(error);
//   }
// };

// export const verifyPayment = async (req, res, next) => {
//   try {
//     const { subscriptionId, paymentId, paymentDetails, orderId, signature } = req.body;
    
//     if (signature && orderId) {
//       const body = orderId + "|" + paymentId;
//       const expectedSignature = crypto
//         .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//         .update(body.toString())
//         .digest('hex');
      
//       const isAuthentic = expectedSignature === signature;
//       if (!isAuthentic) {
//         return errorResponse(res, 'Invalid payment signature', 400);
//       }
//     }
    
//     const subscription = await Subscription.findByIdAndUpdate(
//       subscriptionId,
//       { 
//         status: 'active', 
//         paymentId,
//         paymentDetails: { paymentId, orderId, signature, ...paymentDetails },
//         verifiedAt: new Date()
//       },
//       { new: true }
//     );
    
//     if (!subscription) {
//       return errorResponse(res, 'Subscription not found', 404);
//     }
    
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': subscription.plan,
//       'subscription.startedAt': new Date(),
//       'subscription.expiresAt': subscription.expiresAt,
//       'subscription.status': 'active'
//     });
    
//     successResponse(res, subscription, 'Payment verified');
//   } catch (error) {
//     next(error);
//   }
// };

// export const cancelSubscription = async (req, res, next) => {
//   try {
//     const subscription = await Subscription.findOneAndUpdate(
//       { user: req.user.id, status: 'active' },
//       { status: 'cancelled', cancelledAt: new Date() },
//       { new: true, sort: { createdAt: -1 } }
//     );
    
//     if (!subscription) {
//       return errorResponse(res, 'No active subscription found', 404);
//     }
    
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': 'free'
//     });
    
//     successResponse(res, subscription, 'Subscription cancelled');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getBillingHistory = async (req, res, next) => {
//   try {
//     const history = await Subscription.find({ user: req.user.id })
//       .sort({ createdAt: -1 });
    
//     successResponse(res, history);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============== WEBHOOKS FOR PAYMENT GATEWAYS ==============

// export const razorpayWebhook = async (req, res, next) => {
//   try {
//     const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
//     const signature = req.headers['x-razorpay-signature'];
    
//     const body = JSON.stringify(req.body);
//     const expectedSignature = crypto
//       .createHmac('sha256', secret)
//       .update(body)
//       .digest('hex');
    
//     if (expectedSignature !== signature) {
//       return res.status(400).json({ error: 'Invalid signature' });
//     }
    
//     const event = req.body;
    
//     if (event.event === 'payment.captured') {
//       const payment = event.payload.payment.entity;
//       const orderId = payment.order_id;
      
//       await Subscription.findOneAndUpdate(
//         { orderId },
//         { 
//           status: 'active',
//           paymentId: payment.id,
//           paymentDetails: payment,
//           verifiedAt: new Date()
//         }
//       );
//     }
    
//     res.status(200).json({ received: true });
//   } catch (error) {
//     console.error('Razorpay webhook error:', error);
//     res.status(500).json({ error: 'Webhook processing failed' });
//   }
// };

// export const stripeWebhook = async (req, res, next) => {
//   try {
//     const sig = req.headers['stripe-signature'];
//     const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
//     let event;
//     try {
//       event = stripeInstance.webhooks.constructEvent(req.body, sig, webhookSecret);
//     } catch (err) {
//       return res.status(400).json({ error: `Webhook Error: ${err.message}` });
//     }
    
//     if (event.type === 'payment_intent.succeeded') {
//       const paymentIntent = event.data.object;
      
//       await Subscription.findOneAndUpdate(
//         { paymentIntentId: paymentIntent.id },
//         { 
//           status: 'active',
//           paymentId: paymentIntent.id,
//           paymentDetails: paymentIntent,
//           verifiedAt: new Date()
//         }
//       );
//     }
    
//     res.status(200).json({ received: true });
//   } catch (error) {
//     console.error('Stripe webhook error:', error);
//     res.status(500).json({ error: 'Webhook processing failed' });
//   }
// };

// // ============== INVOICE ROUTES ==============

// export const getInvoiceById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const subscription = await Subscription.findById(id)
//       .populate('user', 'name email phone address');
    
//     if (!subscription) {
//       return errorResponse(res, 'Invoice not found', 404);
//     }
    
//     if (subscription.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
//       return errorResponse(res, 'Unauthorized', 403);
//     }
    
//     const invoice = {
//       id: subscription._id,
//       invoiceNumber: `INV-${subscription._id.toString().slice(-8).toUpperCase()}`,
//       date: subscription.createdAt,
//       dueDate: subscription.expiresAt,
//       customer: {
//         name: subscription.user.name,
//         email: subscription.user.email,
//         phone: subscription.user.phone,
//         address: subscription.user.address || {}
//       },
//       items: [{
//         description: `${subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} Plan - ${subscription.billingCycle} subscription`,
//         quantity: 1,
//         unitPrice: subscription.price.originalAmount || subscription.price.amount,
//         discount: subscription.discountApplied?.amount || 0,
//         total: subscription.price.amount
//       }],
//       subtotal: subscription.price.originalAmount || subscription.price.amount,
//       discount: subscription.discountApplied?.amount || 0,
//       tax: (subscription.price.amount) * 0.18,
//       total: subscription.price.amount * 1.18,
//       currency: subscription.price.currency,
//       status: subscription.status === 'active' ? 'paid' : subscription.status,
//       paymentMethod: subscription.paymentMethod,
//       paymentId: subscription.paymentId
//     };
    
//     successResponse(res, invoice);
//   } catch (error) {
//     next(error);
//   }
// };

// export const downloadInvoice = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const subscription = await Subscription.findById(id)
//       .populate('user', 'name email phone address');
    
//     if (!subscription) {
//       return errorResponse(res, 'Invoice not found', 404);
//     }
    
//     if (subscription.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
//       return errorResponse(res, 'Unauthorized', 403);
//     }
    
//     const invoiceHtml = generateInvoiceHTML(subscription);
    
//     res.setHeader('Content-Type', 'text/html');
//     res.setHeader('Content-Disposition', `attachment; filename=invoice-${subscription._id}.html`);
//     res.send(invoiceHtml);
//   } catch (error) {
//     next(error);
//   }
// };

// export const sendInvoiceEmail = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const subscription = await Subscription.findById(id)
//       .populate('user', 'name email');
    
//     if (!subscription) {
//       return errorResponse(res, 'Invoice not found', 404);
//     }
    
//     if (subscription.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
//       return errorResponse(res, 'Unauthorized', 403);
//     }
    
//     // Here you would integrate with an email service like Nodemailer, SendGrid, etc.
//     // For now, just return success
//     successResponse(res, null, 'Invoice email sent successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// const generateInvoiceHTML = (subscription) => {
//   const invoiceNumber = `INV-${subscription._id.toString().slice(-8).toUpperCase()}`;
//   const total = subscription.price.amount * 1.18;
//   const tax = subscription.price.amount * 0.18;
//   const discount = subscription.discountApplied?.amount || 0;
//   const subtotal = subscription.price.originalAmount || subscription.price.amount;
  
//   return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <title>Invoice ${invoiceNumber}</title>
//       <style>
//         body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
//         .invoice-container { max-width: 800px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px; }
//         .header { text-align: center; margin-bottom: 30px; }
//         .company-info { margin-bottom: 20px; }
//         .invoice-info { text-align: right; margin-bottom: 20px; }
//         .customer-info { margin-bottom: 30px; }
//         table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
//         th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
//         th { background-color: #f5f5f5; }
//         .totals { text-align: right; margin-top: 20px; }
//         .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
//         .discount { color: green; }
//       </style>
//     </head>
//     <body>
//       <div class="invoice-container">
//         <div class="header">
//           <h1>Zauq App</h1>
//           <p>Literary Platform</p>
//         </div>
        
//         <div class="invoice-info">
//           <strong>Invoice #:</strong> ${invoiceNumber}<br>
//           <strong>Date:</strong> ${new Date(subscription.createdAt).toLocaleDateString()}<br>
//           <strong>Due Date:</strong> ${subscription.expiresAt ? new Date(subscription.expiresAt).toLocaleDateString() : 'N/A'}
//         </div>
        
//         <div class="customer-info">
//           <strong>Bill To:</strong><br>
//           ${subscription.user.name}<br>
//           ${subscription.user.email}<br>
//           ${subscription.user.phone || ''}
//         </div>
        
//         <table>
//           <thead>
//             <tr><th>Description</th><th>Quantity</th><th>Unit Price</th><th>Total</th></tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>${subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} Plan - ${subscription.billingCycle} subscription</td>
//               <td>1</td>
//               <td>${subscription.price.currency} ${subtotal}</td>
//               <td>${subscription.price.currency} ${subtotal}</td>
//             </tr>
//           </tbody>
//         </table>
        
//         <div class="totals">
//           ${discount > 0 ? `<p><strong>Subtotal:</strong> ${subscription.price.currency} ${subtotal}</p>` : ''}
//           ${discount > 0 ? `<p class="discount"><strong>Discount:</strong> -${subscription.price.currency} ${discount}</p>` : ''}
//           <p><strong>Tax (18%):</strong> ${subscription.price.currency} ${tax.toFixed(2)}</p>
//           <p><strong>Total:</strong> ${subscription.price.currency} ${total.toFixed(2)}</p>
//         </div>
        
//         <div class="footer">
//           <p>Thank you for your business!</p>
//           <p>For any questions, contact support@zauqapp.com</p>
//         </div>
//       </div>
//     </body>
//     </html>
//   `;
// };

// // ============== COUPON/DISCOUNT ROUTES ==============

// let coupons = [
//   {
//     code: 'WELCOME10',
//     discountType: 'percentage',
//     discountValue: 10,
//     validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
//     usageLimit: 100,
//     usedCount: 0,
//     minAmount: 0,
//     applicablePlans: ['basic', 'premium', 'pro'],
//     isActive: true
//   },
//   {
//     code: 'SAVE20',
//     discountType: 'percentage',
//     discountValue: 20,
//     validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
//     usageLimit: 50,
//     usedCount: 0,
//     minAmount: 500,
//     applicablePlans: ['premium', 'pro'],
//     isActive: true
//   },
//   {
//     code: 'FLAT100',
//     discountType: 'fixed',
//     discountValue: 100,
//     validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
//     usageLimit: 30,
//     usedCount: 0,
//     minAmount: 300,
//     applicablePlans: ['basic', 'premium', 'pro'],
//     isActive: true
//   }
// ];

// export const validateCoupon = async (req, res, next) => {
//   try {
//     const { code } = req.params;
//     const { plan, amount } = req.query;
    
//     const coupon = coupons.find(c => c.code === code.toUpperCase());
    
//     if (!coupon) {
//       return errorResponse(res, 'Invalid coupon code', 404);
//     }
    
//     if (!coupon.isActive) {
//       return errorResponse(res, 'Coupon is not active', 400);
//     }
    
//     if (coupon.validUntil && new Date(coupon.validUntil) < new Date()) {
//       return errorResponse(res, 'Coupon has expired', 400);
//     }
    
//     if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
//       return errorResponse(res, 'Coupon usage limit exceeded', 400);
//     }
    
//     if (plan && coupon.applicablePlans && !coupon.applicablePlans.includes(plan)) {
//       return errorResponse(res, `Coupon not applicable for ${plan} plan`, 400);
//     }
    
//     const orderAmount = parseFloat(amount);
//     if (coupon.minAmount && orderAmount < coupon.minAmount) {
//       return errorResponse(res, `Minimum order amount of ${coupon.minAmount} required`, 400);
//     }
    
//     let discountAmount = 0;
//     if (coupon.discountType === 'percentage') {
//       discountAmount = orderAmount * coupon.discountValue / 100;
//     } else {
//       discountAmount = coupon.discountValue;
//     }
    
//     const finalAmount = Math.max(0, orderAmount - discountAmount);
    
//     successResponse(res, {
//       coupon: {
//         code: coupon.code,
//         discountType: coupon.discountType,
//         discountValue: coupon.discountValue,
//         discountAmount: discountAmount,
//         finalAmount: finalAmount,
//         savedAmount: orderAmount - finalAmount
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const applyCoupon = async (req, res, next) => {
//   try {
//     const { code, plan, amount } = req.body;
    
//     const coupon = coupons.find(c => c.code === code.toUpperCase());
    
//     if (!coupon) {
//       return errorResponse(res, 'Invalid coupon code', 404);
//     }
    
//     if (!coupon.isActive) {
//       return errorResponse(res, 'Coupon is not active', 400);
//     }
    
//     if (coupon.validUntil && new Date(coupon.validUntil) < new Date()) {
//       return errorResponse(res, 'Coupon has expired', 400);
//     }
    
//     if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
//       return errorResponse(res, 'Coupon usage limit exceeded', 400);
//     }
    
//     if (plan && coupon.applicablePlans && !coupon.applicablePlans.includes(plan)) {
//       return errorResponse(res, `Coupon not applicable for ${plan} plan`, 400);
//     }
    
//     const orderAmount = parseFloat(amount);
//     if (coupon.minAmount && orderAmount < coupon.minAmount) {
//       return errorResponse(res, `Minimum order amount of ${coupon.minAmount} required`, 400);
//     }
    
//     let discountAmount = 0;
//     if (coupon.discountType === 'percentage') {
//       discountAmount = orderAmount * coupon.discountValue / 100;
//     } else {
//       discountAmount = coupon.discountValue;
//     }
    
//     const finalAmount = Math.max(0, orderAmount - discountAmount);
    
//     coupon.usedCount++;
    
//     successResponse(res, {
//       coupon: {
//         code: coupon.code,
//         discountType: coupon.discountType,
//         discountValue: coupon.discountValue,
//         discountAmount: discountAmount,
//         finalAmount: finalAmount,
//         savedAmount: orderAmount - finalAmount
//       },
//       applied: true
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ============== CMS ROUTES (Admin Only) ==============

// export const getAllPlansCMS = async (req, res, next) => {
//   try {
//     const plans = await SubscriptionPlan.find().sort({ displayOrder: 1, 'price.amount': 1 });
    
//     const plansWithStats = await Promise.all(plans.map(async (plan) => {
//       const subscriberCount = await Subscription.countDocuments({ 
//         plan: plan.planId, 
//         status: 'active' 
//       });
      
//       const planObj = plan.toObject();
//       planObj.subscriberCount = subscriberCount;
      
//       return planObj;
//     }));
    
//     successResponse(res, plansWithStats);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getPlanByIdCMS = async (req, res, next) => {
//   try {
//     const plan = await SubscriptionPlan.findById(req.params.id);
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }
//     successResponse(res, plan);
//   } catch (error) {
//     next(error);
//   }
// };

// export const createPlanCMS = async (req, res, next) => {
//   try {
//     const {
//       planId,
//       name,
//       displayName,
//       description,
//       price,
//       billingCycle,
//       features,
//       limits,
//       isActive,
//       displayOrder,
//       badgeText,
//       recommended
//     } = req.body;
    
//     const validPlans = ['free', 'basic', 'premium', 'pro'];
//     if (!validPlans.includes(planId)) {
//       return errorResponse(res, 'Invalid plan ID. Must be free, basic, premium, or pro', 400);
//     }
    
//     const existingPlan = await SubscriptionPlan.findOne({ planId });
//     if (existingPlan) {
//       return errorResponse(res, 'Plan ID already exists', 400);
//     }
    
//     const plan = await SubscriptionPlan.create({
//       planId,
//       name: name || planId,
//       displayName,
//       description: description || '',
//       price: {
//         amount: price?.amount || 0,
//         currency: price?.currency || 'INR'
//       },
//       billingCycle: billingCycle || 'monthly',
//       features: features || [],
//       limits: {
//         poemsPerDay: limits?.poemsPerDay || null,
//         ebooksPerMonth: limits?.ebooksPerMonth || null,
//         audiobooksPerMonth: limits?.audiobooksPerMonth || null,
//         unlimited: limits?.unlimited || false,
//         creator: limits?.creator || false
//       },
//       isActive: isActive !== undefined ? isActive : true,
//       displayOrder: displayOrder || 0,
//       badgeText: badgeText || '',
//       recommended: recommended || false
//     });
    
//     successResponse(res, plan, 'Plan created successfully', 201);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updatePlanCMS = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;
    
//     delete updateData.planId;
//     delete updateData._id;
    
//     const plan = await SubscriptionPlan.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true, runValidators: true }
//     );
    
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }
    
//     successResponse(res, plan, 'Plan updated successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const deletePlanCMS = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { permanent } = req.query;
    
//     const plan = await SubscriptionPlan.findById(id);
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }
    
//     const activeSubscriptions = await Subscription.countDocuments({
//       plan: plan.planId,
//       status: 'active'
//     });
    
//     if (permanent === 'true') {
//       if (activeSubscriptions > 0) {
//         return errorResponse(res, `Cannot delete plan with ${activeSubscriptions} active subscriptions. Deactivate it instead.`, 400);
//       }
//       await SubscriptionPlan.findByIdAndDelete(id);
//       successResponse(res, null, 'Plan permanently deleted');
//     } else {
//       plan.isActive = false;
//       await plan.save();
//       successResponse(res, plan, 'Plan deactivated successfully');
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// export const togglePlanStatusCMS = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const plan = await SubscriptionPlan.findById(id);
    
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }
    
//     plan.isActive = !plan.isActive;
//     await plan.save();
    
//     successResponse(res, plan, `Plan ${plan.isActive ? 'activated' : 'deactivated'} successfully`);
//   } catch (error) {
//     next(error);
//   }
// };

// export const reorderPlansCMS = async (req, res, next) => {
//   try {
//     const { orders } = req.body;
    
//     const updatePromises = orders.map(({ id, order }) =>
//       SubscriptionPlan.findByIdAndUpdate(id, { displayOrder: order }, { new: true })
//     );
    
//     await Promise.all(updatePromises);
//     successResponse(res, null, 'Plans reordered successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriptionStatsCMS = async (req, res, next) => {
//   try {
//     const totalPlans = await SubscriptionPlan.countDocuments();
//     const activePlans = await SubscriptionPlan.countDocuments({ isActive: true });
//     const totalUsers = await User.countDocuments();
//     const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });
    
//     const revenueStats = await Subscription.aggregate([
//       { $match: { status: 'active', 'price.amount': { $gt: 0 } } },
//       { $group: {
//         _id: null,
//         totalMonthlyRevenue: { $sum: '$price.amount' },
//         averageSubscriptionValue: { $avg: '$price.amount' }
//       }}
//     ]);
    
//     const planDistribution = await Subscription.aggregate([
//       { $match: { status: 'active' } },
//       { $group: { _id: '$plan', count: { $sum: 1 } } }
//     ]);
    
//     successResponse(res, {
//       totalPlans,
//       activePlans,
//       totalUsers,
//       activeSubscriptions,
//       revenue: revenueStats[0] || { totalMonthlyRevenue: 0, averageSubscriptionValue: 0 },
//       planDistribution
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ============== SUBSCRIBERS MANAGEMENT ==============

// export const getAllSubscribers = async (req, res, next) => {
//   try {
//     const { page = 1, limit = 20, status, plan, search } = req.query;
    
//     let query = {};
    
//     if (status && status !== 'all') {
//       query.status = status;
//     }
    
//     if (plan && plan !== 'all') {
//       query.plan = plan;
//     }
    
//     const subscriptions = await Subscription.find(query)
//       .populate('user', 'name email profilePicture phone createdAt')
//       .sort({ createdAt: -1 })
//       .skip((parseInt(page) - 1) * parseInt(limit))
//       .limit(parseInt(limit));
    
//     let filteredSubscriptions = subscriptions;
//     if (search) {
//       filteredSubscriptions = subscriptions.filter(sub => 
//         sub.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
//         sub.user?.email?.toLowerCase().includes(search.toLowerCase())
//       );
//     }
    
//     const total = await Subscription.countDocuments(query);
    
//     const enhancedSubscriptions = filteredSubscriptions.map((sub) => {
//       const subObj = sub.toObject();
      
//       if (subObj.expiresAt) {
//         const daysRemaining = Math.ceil((new Date(subObj.expiresAt) - new Date()) / (1000 * 60 * 60 * 24));
//         subObj.daysRemaining = daysRemaining > 0 ? daysRemaining : 0;
//       }
      
//       if (subObj.startDate && subObj.expiresAt) {
//         const durationDays = Math.ceil((new Date(subObj.expiresAt) - new Date(subObj.startDate)) / (1000 * 60 * 60 * 24));
//         subObj.durationDays = durationDays;
//       }
      
//       if (!subObj.startDate) {
//         subObj.startDate = subObj.createdAt;
//       }
      
//       return subObj;
//     });
    
//     successResponse(res, {
//       subscribers: enhancedSubscriptions,
//       pagination: {
//         page: parseInt(page),
//         limit: parseInt(limit),
//         total,
//         pages: Math.ceil(total / limit)
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriberById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const subscription = await Subscription.findById(id)
//       .populate('user', 'name email profilePicture phone createdAt');
    
//     if (!subscription) {
//       return errorResponse(res, 'Subscriber not found', 404);
//     }
    
//     const subscriptionHistory = await Subscription.find({ user: subscription.user._id })
//       .sort({ createdAt: -1 });
    
//     const lifetimeValue = subscriptionHistory
//       .filter(sub => sub.status === 'active' || sub.status === 'cancelled')
//       .reduce((sum, sub) => sum + (sub.price?.amount || 0), 0);
    
//     const subscriberData = subscription.toObject();
//     subscriberData.history = subscriptionHistory;
//     subscriberData.lifetimeValue = lifetimeValue;
//     subscriberData.totalSubscriptions = subscriptionHistory.length;
    
//     successResponse(res, subscriberData);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============== TRANSACTIONS MANAGEMENT ==============

// export const getAllTransactions = async (req, res, next) => {
//   try {
//     const { 
//       page = 1, 
//       limit = 20, 
//       status, 
//       type, 
//       startDate, 
//       endDate,
//       search 
//     } = req.query;
    
//     let query = {};
    
//     if (status && status !== 'all') {
//       query.status = status === 'success' ? 'active' : status;
//     }
    
//     if (type && type !== 'all') {
//       query.type = type;
//     }
    
//     if (startDate || endDate) {
//       query.createdAt = {};
//       if (startDate) {
//         query.createdAt.$gte = new Date(startDate);
//       }
//       if (endDate) {
//         query.createdAt.$lte = new Date(endDate);
//       }
//     }
    
//     let subscriptions = await Subscription.find(query)
//       .populate('user', 'name email')
//       .sort({ createdAt: -1 });
    
//     let transactions = subscriptions.map(sub => ({
//       _id: sub._id,
//       transactionId: sub.paymentId || `TXN_${sub._id}`,
//       user: sub.user,
//       type: sub.type || 'subscription',
//       amount: sub.price?.amount || 0,
//       currency: sub.price?.currency || 'INR',
//       status: sub.status === 'active' ? 'success' : sub.status === 'pending' ? 'pending' : sub.status,
//       createdAt: sub.createdAt,
//       paymentMethod: sub.paymentMethod || 'unknown',
//       plan: sub.plan,
//       billingCycle: sub.billingCycle,
//       subscriptionId: sub._id,
//       discountApplied: sub.discountApplied
//     }));
    
//     if (search) {
//       transactions = transactions.filter(t => 
//         t.transactionId?.toLowerCase().includes(search.toLowerCase()) ||
//         t.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
//         t.user?.email?.toLowerCase().includes(search.toLowerCase())
//       );
//     }
    
//     if (status && status !== 'all') {
//       transactions = transactions.filter(t => t.status === status);
//     }
    
//     if (type && type !== 'all') {
//       transactions = transactions.filter(t => t.type === type);
//     }
    
//     const start = (parseInt(page) - 1) * parseInt(limit);
//     const paginatedTransactions = transactions.slice(start, start + parseInt(limit));
    
//     successResponse(res, {
//       transactions: paginatedTransactions,
//       pagination: {
//         page: parseInt(page),
//         limit: parseInt(limit),
//         total: transactions.length,
//         pages: Math.ceil(transactions.length / limit)
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getTransactionById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const subscription = await Subscription.findById(id)
//       .populate('user', 'name email phone');
    
//     if (!subscription) {
//       return errorResponse(res, 'Transaction not found', 404);
//     }
    
//     const transaction = {
//       _id: subscription._id,
//       transactionId: subscription.paymentId || `TXN_${subscription._id}`,
//       user: subscription.user,
//       type: subscription.type || 'subscription',
//       amount: subscription.price?.amount || 0,
//       currency: subscription.price?.currency || 'INR',
//       status: subscription.status === 'active' ? 'success' : subscription.status,
//       createdAt: subscription.createdAt,
//       updatedAt: subscription.updatedAt,
//       paymentMethod: subscription.paymentMethod || 'unknown',
//       plan: subscription.plan,
//       billingCycle: subscription.billingCycle,
//       subscriptionId: subscription._id,
//       paymentDetails: {
//         paymentId: subscription.paymentId,
//         orderId: subscription.orderId
//       },
//       discountApplied: subscription.discountApplied
//     };
    
//     successResponse(res, transaction);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getTransactionStats = async (req, res, next) => {
//   try {
//     const now = new Date();
//     const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//     const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
//     const startOfYear = new Date(now.getFullYear(), 0, 1);
    
//     let stats = {
//       totalRevenue: 0,
//       todayRevenue: 0,
//       monthlyRevenue: 0,
//       yearlyRevenue: 0,
//       totalTransactions: 0,
//       todayTransactions: 0,
//       monthlyTransactions: 0,
//       yearlyTransactions: 0,
//       successfulTransactions: 0,
//       failedTransactions: 0,
//       pendingTransactions: 0,
//       averageTransactionValue: 0,
//       revenueByPlan: {},
//       transactionsByStatus: {},
//       transactionsByType: {},
//       recentTransactions: [],
//       dailyStats: [],
//       totalDiscountGiven: 0
//     };
    
//     const allSubscriptions = await Subscription.find({})
//       .populate('user', 'name email')
//       .sort({ createdAt: -1 });
    
//     allSubscriptions.forEach(sub => {
//       const amount = sub.price?.amount || 0;
//       const originalAmount = sub.price?.originalAmount || amount;
//       const discountGiven = originalAmount - amount;
//       const createdAt = new Date(sub.createdAt);
//       const status = sub.status === 'active' ? 'success' : sub.status;
      
//       if (status === 'success') {
//         stats.totalRevenue += amount;
//         stats.totalDiscountGiven += discountGiven;
//         stats.totalTransactions++;
//         stats.successfulTransactions++;
        
//         if (createdAt >= startOfToday) {
//           stats.todayRevenue += amount;
//           stats.todayTransactions++;
//         }
        
//         if (createdAt >= startOfMonth) {
//           stats.monthlyRevenue += amount;
//           stats.monthlyTransactions++;
//         }
        
//         if (createdAt >= startOfYear) {
//           stats.yearlyRevenue += amount;
//           stats.yearlyTransactions++;
//         }
        
//         const plan = sub.plan || 'unknown';
//         if (!stats.revenueByPlan[plan]) {
//           stats.revenueByPlan[plan] = 0;
//         }
//         stats.revenueByPlan[plan] += amount;
//       } else if (status === 'pending') {
//         stats.pendingTransactions++;
//       } else if (status === 'cancelled' || status === 'expired') {
//         stats.failedTransactions++;
//       }
      
//       if (!stats.transactionsByStatus[status]) {
//         stats.transactionsByStatus[status] = 0;
//       }
//       stats.transactionsByStatus[status]++;
      
//       const type = sub.type || 'subscription';
//       if (!stats.transactionsByType[type]) {
//         stats.transactionsByType[type] = 0;
//       }
//       stats.transactionsByType[type]++;
//     });
    
//     stats.averageTransactionValue = stats.totalTransactions > 0 
//       ? stats.totalRevenue / stats.totalTransactions 
//       : 0;
    
//     stats.recentTransactions = allSubscriptions.slice(0, 10).map(sub => ({
//       _id: sub._id,
//       transactionId: sub.paymentId || `TXN_${sub._id}`,
//       user: sub.user,
//       amount: sub.price?.amount || 0,
//       currency: sub.price?.currency || 'INR',
//       status: sub.status === 'active' ? 'success' : sub.status,
//       createdAt: sub.createdAt,
//       plan: sub.plan
//     }));
    
//     const last30Days = [];
//     for (let i = 29; i >= 0; i--) {
//       const date = new Date();
//       date.setDate(date.getDate() - i);
//       date.setHours(0, 0, 0, 0);
      
//       const nextDate = new Date(date);
//       nextDate.setDate(nextDate.getDate() + 1);
      
//       const dailyTransactions = allSubscriptions.filter(sub => {
//         const createdAt = new Date(sub.createdAt);
//         return createdAt >= date && createdAt < nextDate;
//       });
      
//       const dailyRevenue = dailyTransactions
//         .filter(sub => sub.status === 'active')
//         .reduce((sum, sub) => sum + (sub.price?.amount || 0), 0);
      
//       last30Days.push({
//         date: date.toISOString().split('T')[0],
//         revenue: dailyRevenue,
//         transactions: dailyTransactions.length,
//         successful: dailyTransactions.filter(t => t.status === 'active').length
//       });
//     }
    
//     stats.dailyStats = last30Days;
    
//     successResponse(res, stats);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // ============== PAYMENT METHODS MANAGEMENT ==============
// // ============================================

// export const getPaymentMethods = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
    
//     if (!user.paymentMethods) {
//       user.paymentMethods = [];
//       await user.save();
//     }
    
//     // Mask card numbers for security
//     const maskedMethods = user.paymentMethods.map(method => ({
//       _id: method._id,
//       cardNumber: `•••• •••• •••• ${method.lastFourDigits || method.cardNumber.slice(-4)}`,
//       cardHolder: method.cardHolder,
//       expiryMonth: method.expiryMonth,
//       expiryYear: method.expiryYear,
//       cardBrand: method.cardBrand,
//       isDefault: method.isDefault,
//       createdAt: method.createdAt
//     }));
    
//     successResponse(res, maskedMethods);
//   } catch (error) {
//     console.error('Error in getPaymentMethods:', error);
//     next(error);
//   }
// };

// export const addPaymentMethod = async (req, res, next) => {
//   try {
//     const { cardNumber, cardHolder, expiryMonth, expiryYear, cvv, cardBrand } = req.body;
    
//     // Validate required fields
//     if (!cardNumber || !cardHolder || !expiryMonth || !expiryYear) {
//       return errorResponse(res, 'Missing required payment information', 400);
//     }
    
//     // Basic validation
//     const cleanCardNumber = cardNumber.replace(/\s/g, '');
//     if (!/^\d{13,19}$/.test(cleanCardNumber)) {
//       return errorResponse(res, 'Invalid card number', 400);
//     }
    
//     // Validate expiry date
//     const currentYear = new Date().getFullYear() % 100;
//     const currentMonth = new Date().getMonth() + 1;
//     const expYear = parseInt(expiryYear);
//     const expMonth = parseInt(expiryMonth);
    
//     if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
//       return errorResponse(res, 'Card has expired', 400);
//     }
    
//     const user = await User.findById(req.user.id);
    
//     if (!user.paymentMethods) {
//       user.paymentMethods = [];
//     }
    
//     // Check if card already exists (by last 4 digits and expiry)
//     const lastFourDigits = cleanCardNumber.slice(-4);
//     const existingCard = user.paymentMethods.find(
//       method => method.lastFourDigits === lastFourDigits && 
//                 method.expiryMonth === expiryMonth && 
//                 method.expiryYear === expiryYear
//     );
    
//     if (existingCard) {
//       return errorResponse(res, 'This card has already been added', 400);
//     }
    
//     // Determine card brand
//     let detectedBrand = 'other';
//     if (cleanCardNumber.startsWith('4')) detectedBrand = 'visa';
//     else if (/^5[1-5]/.test(cleanCardNumber)) detectedBrand = 'mastercard';
//     else if (/^3[47]/.test(cleanCardNumber)) detectedBrand = 'amex';
//     else if (/^6(?:011|5)/.test(cleanCardNumber)) detectedBrand = 'rupay';
    
//     // Create new payment method
//     const newMethod = {
//       _id: new mongoose.Types.ObjectId(),
//       cardNumber: cleanCardNumber,
//       cardHolder: cardHolder.toUpperCase(),
//       expiryMonth,
//       expiryYear,
//       lastFourDigits,
//       cardBrand: cardBrand || detectedBrand,
//       isDefault: user.paymentMethods.length === 0, // First card becomes default
//       createdAt: new Date()
//     };
    
//     user.paymentMethods.push(newMethod);
//     await user.save();
    
//     // Return masked version
//     const maskedMethod = {
//       _id: newMethod._id,
//       cardNumber: `•••• •••• •••• ${lastFourDigits}`,
//       cardHolder: newMethod.cardHolder,
//       expiryMonth: newMethod.expiryMonth,
//       expiryYear: newMethod.expiryYear,
//       cardBrand: newMethod.cardBrand,
//       isDefault: newMethod.isDefault,
//       createdAt: newMethod.createdAt
//     };
    
//     successResponse(res, maskedMethod, 'Payment method added successfully');
//   } catch (error) {
//     console.error('Error in addPaymentMethod:', error);
//     next(error);
//   }
// };

// export const removePaymentMethod = async (req, res, next) => {
//   try {
//     const { methodId } = req.params;
    
//     const user = await User.findById(req.user.id);
    
//     if (!user.paymentMethods || user.paymentMethods.length === 0) {
//       return errorResponse(res, 'No payment methods found', 404);
//     }
    
//     const methodIndex = user.paymentMethods.findIndex(
//       method => method._id.toString() === methodId
//     );
    
//     if (methodIndex === -1) {
//       return errorResponse(res, 'Payment method not found', 404);
//     }
    
//     // Check if trying to remove the only payment method
//     if (user.paymentMethods.length === 1) {
//       return errorResponse(res, 'Cannot remove the only payment method. Please add another first.', 400);
//     }
    
//     // If removing default method, set another as default
//     const wasDefault = user.paymentMethods[methodIndex].isDefault;
//     user.paymentMethods.splice(methodIndex, 1);
    
//     if (wasDefault && user.paymentMethods.length > 0) {
//       user.paymentMethods[0].isDefault = true;
//     }
    
//     await user.save();
    
//     successResponse(res, null, 'Payment method removed successfully');
//   } catch (error) {
//     console.error('Error in removePaymentMethod:', error);
//     next(error);
//   }
// };

// export const setDefaultPaymentMethod = async (req, res, next) => {
//   try {
//     const { methodId } = req.params;
    
//     const user = await User.findById(req.user.id);
    
//     if (!user.paymentMethods || user.paymentMethods.length === 0) {
//       return errorResponse(res, 'No payment methods found', 404);
//     }
    
//     let found = false;
//     user.paymentMethods.forEach(method => {
//       if (method._id.toString() === methodId) {
//         method.isDefault = true;
//         found = true;
//       } else {
//         method.isDefault = false;
//       }
//     });
    
//     if (!found) {
//       return errorResponse(res, 'Payment method not found', 404);
//     }
    
//     await user.save();
    
//     successResponse(res, null, 'Default payment method updated');
//   } catch (error) {
//     console.error('Error in setDefaultPaymentMethod:', error);
//     next(error);
//   }
// };

// // Initialize default plans when server starts
// initializeDefaultPlans().catch(console.error);
























// // server/controllers/subscription.controller.js
// import { Subscription, SubscriptionPlan } from '../models/Subscription.js';
// import User from '../models/User.js';
// import { successResponse, errorResponse } from '../utils/response.js';
// import crypto from 'crypto';
// import mongoose from 'mongoose';

// // Default plans (fallback if database is empty)
// const defaultPlans = [
//   {
//     planId: 'free',
//     name: 'free',
//     displayName: 'Free',
//     description: 'Perfect for getting started',
//     price: { amount: 0, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       'Browse all content',
//       'Read public poems',
//       'Basic search',
//       '50 poems/day'
//     ],
//     limits: {
//       poemsPerDay: 50,
//       ebooksPerMonth: 2,
//       audiobooksPerMonth: 5,
//       unlimited: false,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 0,
//     badgeText: '',
//     recommended: false
//   },
//   {
//     planId: 'basic',
//     name: 'basic',
//     displayName: 'Basic',
//     description: 'Great for regular readers',
//     price: { amount: 99, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       'All free features',
//       'Unlimited poem reading',
//       'Download 5 ebooks/month',
//       'Basic audio streaming'
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: 5,
//       audiobooksPerMonth: 3,
//       unlimited: false,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 1,
//     badgeText: 'Popular',
//     recommended: true
//   },
//   {
//     planId: 'premium',
//     name: 'premium',
//     displayName: 'Premium',
//     description: 'For serious literature enthusiasts',
//     price: { amount: 199, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       'All Basic features',
//       'Unlimited downloads',
//       'HD audio streaming',
//       'Ad-free experience',
//       'AI explanations'
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: null,
//       audiobooksPerMonth: null,
//       unlimited: true,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 2,
//     badgeText: 'Best Value',
//     recommended: true
//   },
//   {
//     planId: 'pro',
//     name: 'pro',
//     displayName: 'Pro',
//     description: 'For creators and power users',
//     price: { amount: 499, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       'All Premium features',
//       'Creator tools',
//       'Priority support',
//       'Analytics dashboard',
//       'Early access'
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: null,
//       audiobooksPerMonth: null,
//       unlimited: true,
//       creator: true
//     },
//     isActive: true,
//     displayOrder: 3,
//     badgeText: 'Creator',
//     recommended: false
//   }
// ];

// // Coupons store
// let coupons = [
//   {
//     code: 'WELCOME10',
//     discountType: 'percentage',
//     discountValue: 10,
//     validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
//     usageLimit: 100,
//     usedCount: 0,
//     minAmount: 0,
//     applicablePlans: ['basic', 'premium', 'pro'],
//     isActive: true
//   },
//   {
//     code: 'SAVE20',
//     discountType: 'percentage',
//     discountValue: 20,
//     validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
//     usageLimit: 50,
//     usedCount: 0,
//     minAmount: 500,
//     applicablePlans: ['premium', 'pro'],
//     isActive: true
//   },
//   {
//     code: 'FLAT100',
//     discountType: 'fixed',
//     discountValue: 100,
//     validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
//     usageLimit: 30,
//     usedCount: 0,
//     minAmount: 300,
//     applicablePlans: ['basic', 'premium', 'pro'],
//     isActive: true
//   }
// ];

// // Initialize default plans
// const initializeDefaultPlans = async () => {
//   try {
//     for (const planData of defaultPlans) {
//       const existingPlan = await SubscriptionPlan.findOne({ planId: planData.planId });
//       if (!existingPlan) {
//         await SubscriptionPlan.create(planData);
//         console.log(`✅ Created default plan: ${planData.planId}`);
//       }
//     }
//     console.log('✅ Default plans initialized');
//   } catch (error) {
//     console.error('❌ Error initializing plans:', error.message);
//   }
// };

// // ============================================
// // PUBLIC ROUTES
// // ============================================

// export const getPlans = async (req, res, next) => {
//   try {
//     let plans = await SubscriptionPlan.find({ isActive: true })
//       .sort({ displayOrder: 1, 'price.amount': 1 });
    
//     if (plans.length === 0) {
//       await initializeDefaultPlans();
//       plans = await SubscriptionPlan.find({ isActive: true })
//         .sort({ displayOrder: 1, 'price.amount': 1 });
//     }
    
//     const formattedPlans = plans.reduce((acc, plan) => {
//       acc[plan.planId] = {
//         name: plan.displayName,
//         price: plan.price.amount,
//         currency: plan.price.currency,
//         features: plan.features,
//         limits: plan.limits,
//         badgeText: plan.badgeText,
//         recommended: plan.recommended,
//         description: plan.description
//       };
//       return acc;
//     }, {});
    
//     successResponse(res, formattedPlans);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriptionFeatures = async (req, res, next) => {
//   try {
//     let plans = await SubscriptionPlan.find({ isActive: true })
//       .sort({ displayOrder: 1, 'price.amount': 1 });
    
//     if (plans.length === 0) {
//       await initializeDefaultPlans();
//       plans = await SubscriptionPlan.find({ isActive: true })
//         .sort({ displayOrder: 1, 'price.amount': 1 });
//     }
    
//     successResponse(res, plans.map(plan => ({
//       id: plan.planId,
//       name: plan.displayName,
//       price: plan.price.amount,
//       currency: plan.price.currency,
//       features: plan.features,
//       limits: plan.limits,
//       badgeText: plan.badgeText,
//       recommended: plan.recommended,
//       description: plan.description
//     })));
//   } catch (error) {
//     next(error);
//   }
// };

// export const getCurrentSubscription = async (req, res, next) => {
//   try {
//     const subscription = await Subscription.findOne({
//       user: req.user.id,
//       status: 'active'
//     }).sort({ createdAt: -1 });

//     const user = await User.findById(req.user.id);
    
//     const planDetails = await SubscriptionPlan.findOne({ planId: user.subscription?.plan || 'free' });
    
//     successResponse(res, {
//       subscription: subscription || null,
//       plan: user.subscription || { plan: 'free' },
//       features: planDetails ? planDetails.features : []
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const subscribe = async (req, res, next) => {
//   try {
//     const { plan, billingCycle, paymentMethod, couponCode } = req.body;
    
//     let planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
    
//     if (!planDetails) {
//       await initializeDefaultPlans();
//       planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
      
//       if (!planDetails) {
//         return errorResponse(res, 'Invalid plan', 400);
//       }
//     }
    
//     const months = billingCycle === 'yearly' ? 12 : billingCycle === 'quarterly' ? 3 : 1;
//     let amount = planDetails.price.amount * months;
//     let discountAmount = 0;
    
//     // Apply coupon if provided
//     if (couponCode) {
//       const coupon = coupons.find(c => c.code === couponCode.toUpperCase());
//       if (coupon && coupon.isActive && (!coupon.validUntil || new Date(coupon.validUntil) > new Date())) {
//         if (coupon.discountType === 'percentage') {
//           discountAmount = amount * coupon.discountValue / 100;
//         } else {
//           discountAmount = coupon.discountValue;
//         }
//         amount = Math.max(0, amount - discountAmount);
//         coupon.usedCount++;
//       }
//     }
    
//     if (plan === 'free' || amount === 0) {
//       const subscription = await Subscription.create({
//         user: req.user.id,
//         plan,
//         status: 'active',
//         price: { amount: 0, currency: planDetails.price.currency },
//         billingCycle,
//         paymentMethod: 'free',
//         expiresAt: null,
//         features: planDetails.features,
//         discountApplied: discountAmount > 0 ? { amount: discountAmount, coupon: couponCode } : null
//       });
      
//       await User.findByIdAndUpdate(req.user.id, {
//         'subscription.plan': plan,
//         'subscription.startedAt': new Date(),
//         'subscription.expiresAt': null
//       });
      
//       return successResponse(res, { subscription, plan: planDetails }, 'Free subscription activated', 201);
//     }
    
//     const subscription = await Subscription.create({
//       user: req.user.id,
//       plan,
//       status: 'pending',
//       price: { amount, currency: planDetails.price.currency, originalAmount: planDetails.price.amount * months },
//       billingCycle,
//       paymentMethod: paymentMethod || 'pending',
//       expiresAt: new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000),
//       features: planDetails.features,
//       discountApplied: discountAmount > 0 ? { amount: discountAmount, coupon: couponCode } : null
//     });
    
//     successResponse(res, { 
//       subscription, 
//       plan: planDetails,
//       requiresPayment: true,
//       discountApplied: discountAmount > 0 ? { amount: discountAmount, finalAmount: amount } : null
//     }, 'Subscription initiated', 201);
//   } catch (error) {
//     next(error);
//   }
// };

// export const verifyPayment = async (req, res, next) => {
//   try {
//     const { subscriptionId, paymentId, orderId, signature } = req.body;
    
//     // Verify signature if provided (for Razorpay)
//     if (signature && orderId) {
//       const body = orderId + "|" + paymentId;
//       const expectedSignature = crypto
//         .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'test_secret')
//         .update(body.toString())
//         .digest('hex');
      
//       if (expectedSignature !== signature) {
//         return errorResponse(res, 'Invalid payment signature', 400);
//       }
//     }
    
//     const subscription = await Subscription.findByIdAndUpdate(
//       subscriptionId,
//       { status: 'active', paymentId, verifiedAt: new Date() },
//       { new: true }
//     );
    
//     if (!subscription) {
//       return errorResponse(res, 'Subscription not found', 404);
//     }
    
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': subscription.plan,
//       'subscription.startedAt': new Date(),
//       'subscription.expiresAt': subscription.expiresAt,
//       'subscription.status': 'active'
//     });
    
//     successResponse(res, subscription, 'Payment verified and subscription activated');
//   } catch (error) {
//     next(error);
//   }
// };

// export const cancelSubscription = async (req, res, next) => {
//   try {
//     const subscription = await Subscription.findOneAndUpdate(
//       { user: req.user.id, status: 'active' },
//       { status: 'cancelled', cancelledAt: new Date() },
//       { new: true, sort: { createdAt: -1 } }
//     );
    
//     if (!subscription) {
//       return errorResponse(res, 'No active subscription found', 404);
//     }
    
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': 'free'
//     });
    
//     successResponse(res, subscription, 'Subscription cancelled');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getBillingHistory = async (req, res, next) => {
//   try {
//     const history = await Subscription.find({ user: req.user.id })
//       .sort({ createdAt: -1 });
    
//     successResponse(res, history);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // INVOICE ROUTES
// // ============================================

// export const getInvoice = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const subscription = await Subscription.findById(id)
//       .populate('user', 'name email phone');
    
//     if (!subscription) {
//       return errorResponse(res, 'Invoice not found', 404);
//     }
    
//     if (subscription.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
//       return errorResponse(res, 'Unauthorized', 403);
//     }
    
//     const invoiceNumber = `INV-${subscription._id.toString().slice(-8).toUpperCase()}`;
//     const date = new Date(subscription.createdAt).toLocaleDateString('en-IN');
//     const dueDate = subscription.expiresAt ? new Date(subscription.expiresAt).toLocaleDateString('en-IN') : 'N/A';
//     const planName = `${subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} Plan`;
//     const billingText = `${subscription.billingCycle || 'Monthly'} Subscription`;
//     const subtotal = subscription.price.originalAmount || subscription.price.amount;
//     const discount = subscription.discountApplied?.amount || 0;
//     const finalAmount = subscription.price.amount;
//     const tax = finalAmount * 0.18;
//     const total = finalAmount + tax;
    
//     const invoiceData = {
//       id: subscription._id,
//       invoiceNumber,
//       date,
//       dueDate,
//       customer: {
//         name: subscription.user.name,
//         email: subscription.user.email,
//         phone: subscription.user.phone
//       },
//       items: [{
//         description: `${planName} - ${billingText}`,
//         quantity: 1,
//         unitPrice: subtotal,
//         discount,
//         total: finalAmount
//       }],
//       subtotal,
//       discount,
//       tax,
//       total,
//       currency: subscription.price.currency,
//       status: subscription.status === 'active' ? 'paid' : subscription.status,
//       paymentMethod: subscription.paymentMethod,
//       paymentId: subscription.paymentId
//     };
    
//     successResponse(res, invoiceData);
//   } catch (error) {
//     next(error);
//   }
// };

// export const downloadInvoice = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const subscription = await Subscription.findById(id)
//       .populate('user', 'name email phone');
    
//     if (!subscription) {
//       return errorResponse(res, 'Invoice not found', 404);
//     }
    
//     if (subscription.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
//       return errorResponse(res, 'Unauthorized', 403);
//     }
    
//     const invoiceNumber = `INV-${subscription._id.toString().slice(-8).toUpperCase()}`;
//     const date = new Date(subscription.createdAt).toLocaleDateString('en-IN');
//     const dueDate = subscription.expiresAt ? new Date(subscription.expiresAt).toLocaleDateString('en-IN') : 'N/A';
//     const planName = `${subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} Plan`;
//     const billingText = `${subscription.billingCycle || 'Monthly'} Subscription`;
//     const subtotal = subscription.price.originalAmount || subscription.price.amount;
//     const discount = subscription.discountApplied?.amount || 0;
//     const finalAmount = subscription.price.amount;
//     const tax = finalAmount * 0.18;
//     const total = finalAmount + tax;
    
//     const html = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <title>Invoice ${invoiceNumber}</title>
//         <style>
//           body { font-family: Arial, sans-serif; padding: 40px; }
//           .invoice { max-width: 800px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px; }
//           .header { text-align: center; margin-bottom: 30px; }
//           .header h1 { color: #8B5CF6; }
//           .info { margin-bottom: 20px; }
//           table { width: 100%; border-collapse: collapse; margin: 20px 0; }
//           th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
//           th { background: #f5f5f5; }
//           .total { text-align: right; margin-top: 20px; }
//           .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
//         </style>
//       </head>
//       <body>
//         <div class="invoice">
//           <div class="header">
//             <h1>Zauq App</h1>
//             <p>Invoice #: ${invoiceNumber}</p>
//           </div>
//           <div class="info">
//             <p><strong>Date:</strong> ${date}</p>
//             <p><strong>Due Date:</strong> ${dueDate}</p>
//             <p><strong>Customer:</strong> ${subscription.user.name}</p>
//             <p><strong>Email:</strong> ${subscription.user.email}</p>
//           </div>
//           <table>
//             <thead><tr><th>Description</th><th>Quantity</th><th>Unit Price</th><th>Total</th></tr></thead>
//             <tbody>
//               <tr>
//                 <td>${planName} - ${billingText}</td>
//                 <td>1</td>
//                 <td>${subscription.price.currency} ${subtotal}</td>
//                 <td>${subscription.price.currency} ${subtotal}</td>
//               </tr>
//               ${discount > 0 ? `<tr style="color: green;"><td>Discount Applied</td><td>-</td><td>-${subscription.price.currency} ${discount}</td><td>-${subscription.price.currency} ${discount}</td></tr>` : ''}
//             </tbody>
//           </table>
//           <div class="total">
//             <p>Subtotal: ${subscription.price.currency} ${subtotal}</p>
//             ${discount > 0 ? `<p>Discount: -${subscription.price.currency} ${discount}</p>` : ''}
//             <p>Tax (18% GST): ${subscription.price.currency} ${tax.toFixed(2)}</p>
//             <h3>Total: ${subscription.price.currency} ${total.toFixed(2)}</h3>
//           </div>
//           <div class="footer">
//             <p>Thank you for your business!</p>
//             <p>For questions, contact support@zauqapp.com</p>
//           </div>
//         </div>
//       </body>
//       </html>
//     `;
    
//     res.setHeader('Content-Type', 'text/html');
//     res.setHeader('Content-Disposition', `attachment; filename=invoice_${subscription._id}.html`);
//     res.send(html);
//   } catch (error) {
//     errorResponse(res, 'Failed to generate invoice', 500);
//   }
// };

// export const sendInvoiceEmail = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     successResponse(res, null, 'Invoice email sent successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // PAYMENT METHODS
// // ============================================

// export const getPaymentMethods = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
//     const methods = user.paymentMethods || [];
    
//     const maskedMethods = methods.map(method => ({
//       _id: method._id,
//       cardNumber: `•••• •••• •••• ${method.lastFourDigits || '****'}`,
//       cardHolder: method.cardHolder,
//       expiryMonth: method.expiryMonth,
//       expiryYear: method.expiryYear,
//       cardBrand: method.cardBrand,
//       isDefault: method.isDefault
//     }));
    
//     successResponse(res, maskedMethods);
//   } catch (error) {
//     next(error);
//   }
// };

// export const addPaymentMethod = async (req, res, next) => {
//   try {
//     const { cardNumber, cardHolder, expiryMonth, expiryYear } = req.body;
    
//     if (!cardNumber || !cardHolder) {
//       return errorResponse(res, 'Card number and holder name required', 400);
//     }
    
//     const user = await User.findById(req.user.id);
//     if (!user.paymentMethods) user.paymentMethods = [];
    
//     const lastFourDigits = cardNumber.replace(/\s/g, '').slice(-4);
//     const newMethod = {
//       _id: new mongoose.Types.ObjectId(),
//       cardNumber: cardNumber.replace(/\s/g, ''),
//       cardHolder: cardHolder.toUpperCase(),
//       expiryMonth,
//       expiryYear,
//       lastFourDigits,
//       cardBrand: cardNumber.startsWith('4') ? 'visa' : 'mastercard',
//       isDefault: user.paymentMethods.length === 0,
//       createdAt: new Date()
//     };
    
//     user.paymentMethods.push(newMethod);
//     await user.save();
    
//     successResponse(res, {
//       _id: newMethod._id,
//       cardNumber: `•••• •••• •••• ${lastFourDigits}`,
//       cardHolder: newMethod.cardHolder,
//       expiryMonth: newMethod.expiryMonth,
//       expiryYear: newMethod.expiryYear,
//       isDefault: newMethod.isDefault
//     }, 'Payment method added');
//   } catch (error) {
//     next(error);
//   }
// };

// export const removePaymentMethod = async (req, res, next) => {
//   try {
//     const { methodId } = req.params;
//     const user = await User.findById(req.user.id);
    
//     if (!user.paymentMethods) {
//       return errorResponse(res, 'No payment methods found', 404);
//     }
    
//     const methodIndex = user.paymentMethods.findIndex(m => m._id.toString() === methodId);
//     if (methodIndex === -1) {
//       return errorResponse(res, 'Payment method not found', 404);
//     }
    
//     if (user.paymentMethods.length === 1) {
//       return errorResponse(res, 'Cannot remove the only payment method', 400);
//     }
    
//     const wasDefault = user.paymentMethods[methodIndex].isDefault;
//     user.paymentMethods.splice(methodIndex, 1);
    
//     if (wasDefault && user.paymentMethods.length > 0) {
//       user.paymentMethods[0].isDefault = true;
//     }
    
//     await user.save();
//     successResponse(res, null, 'Payment method removed');
//   } catch (error) {
//     next(error);
//   }
// };

// export const setDefaultPaymentMethod = async (req, res, next) => {
//   try {
//     const { methodId } = req.params;
//     const user = await User.findById(req.user.id);
    
//     if (!user.paymentMethods) {
//       return errorResponse(res, 'No payment methods found', 404);
//     }
    
//     user.paymentMethods.forEach(method => {
//       method.isDefault = method._id.toString() === methodId;
//     });
    
//     await user.save();
//     successResponse(res, null, 'Default payment method updated');
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // COUPON ROUTES
// // ============================================

// export const validateCoupon = async (req, res, next) => {
//   try {
//     const { code } = req.params;
//     const { plan, amount } = req.query;
    
//     const coupon = coupons.find(c => c.code === code.toUpperCase());
    
//     if (!coupon) {
//       return errorResponse(res, 'Invalid coupon code', 404);
//     }
    
//     if (!coupon.isActive) {
//       return errorResponse(res, 'Coupon is not active', 400);
//     }
    
//     if (coupon.validUntil && new Date(coupon.validUntil) < new Date()) {
//       return errorResponse(res, 'Coupon has expired', 400);
//     }
    
//     if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
//       return errorResponse(res, 'Coupon usage limit exceeded', 400);
//     }
    
//     if (plan && coupon.applicablePlans && !coupon.applicablePlans.includes(plan)) {
//       return errorResponse(res, `Coupon not applicable for ${plan} plan`, 400);
//     }
    
//     const orderAmount = parseFloat(amount);
//     if (coupon.minAmount && orderAmount < coupon.minAmount) {
//       return errorResponse(res, `Minimum order amount of ${coupon.minAmount} required`, 400);
//     }
    
//     let discountAmount = 0;
//     if (coupon.discountType === 'percentage') {
//       discountAmount = orderAmount * coupon.discountValue / 100;
//     } else {
//       discountAmount = coupon.discountValue;
//     }
    
//     const finalAmount = Math.max(0, orderAmount - discountAmount);
    
//     successResponse(res, {
//       code: coupon.code,
//       discountType: coupon.discountType,
//       discountValue: coupon.discountValue,
//       discountAmount,
//       finalAmount,
//       savedAmount: orderAmount - finalAmount
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const applyCoupon = async (req, res, next) => {
//   try {
//     const { code, plan, amount } = req.body;
    
//     const coupon = coupons.find(c => c.code === code.toUpperCase());
    
//     if (!coupon) {
//       return errorResponse(res, 'Invalid coupon code', 404);
//     }
    
//     if (!coupon.isActive) {
//       return errorResponse(res, 'Coupon is not active', 400);
//     }
    
//     if (coupon.validUntil && new Date(coupon.validUntil) < new Date()) {
//       return errorResponse(res, 'Coupon has expired', 400);
//     }
    
//     if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
//       return errorResponse(res, 'Coupon usage limit exceeded', 400);
//     }
    
//     if (plan && coupon.applicablePlans && !coupon.applicablePlans.includes(plan)) {
//       return errorResponse(res, `Coupon not applicable for ${plan} plan`, 400);
//     }
    
//     const orderAmount = parseFloat(amount);
//     if (coupon.minAmount && orderAmount < coupon.minAmount) {
//       return errorResponse(res, `Minimum order amount of ${coupon.minAmount} required`, 400);
//     }
    
//     let discountAmount = 0;
//     if (coupon.discountType === 'percentage') {
//       discountAmount = orderAmount * coupon.discountValue / 100;
//     } else {
//       discountAmount = coupon.discountValue;
//     }
    
//     const finalAmount = Math.max(0, orderAmount - discountAmount);
    
//     // Increment usage count
//     coupon.usedCount++;
    
//     successResponse(res, {
//       coupon: {
//         code: coupon.code,
//         discountType: coupon.discountType,
//         discountValue: coupon.discountValue,
//         discountAmount,
//         finalAmount,
//         savedAmount: orderAmount - finalAmount
//       },
//       applied: true
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // ADMIN CMS ROUTES
// // ============================================

// export const getAllPlansCMS = async (req, res, next) => {
//   try {
//     const plans = await SubscriptionPlan.find().sort({ displayOrder: 1, 'price.amount': 1 });
    
//     const plansWithStats = await Promise.all(plans.map(async (plan) => {
//       const subscriberCount = await Subscription.countDocuments({ 
//         plan: plan.planId, 
//         status: 'active' 
//       });
      
//       const planObj = plan.toObject();
//       planObj.subscriberCount = subscriberCount;
      
//       return planObj;
//     }));
    
//     successResponse(res, plansWithStats);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getPlanByIdCMS = async (req, res, next) => {
//   try {
//     const plan = await SubscriptionPlan.findById(req.params.id);
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }
//     successResponse(res, plan);
//   } catch (error) {
//     next(error);
//   }
// };

// export const createPlanCMS = async (req, res, next) => {
//   try {
//     const {
//       planId,
//       name,
//       displayName,
//       description,
//       price,
//       billingCycle,
//       features,
//       limits,
//       isActive,
//       displayOrder,
//       badgeText,
//       recommended
//     } = req.body;
    
//     const validPlans = ['free', 'basic', 'premium', 'pro'];
//     if (!validPlans.includes(planId)) {
//       return errorResponse(res, 'Invalid plan ID', 400);
//     }
    
//     const existingPlan = await SubscriptionPlan.findOne({ planId });
//     if (existingPlan) {
//       return errorResponse(res, 'Plan ID already exists', 400);
//     }
    
//     const plan = await SubscriptionPlan.create({
//       planId,
//       name: name || planId,
//       displayName,
//       description: description || '',
//       price: { amount: price?.amount || 0, currency: price?.currency || 'INR' },
//       billingCycle: billingCycle || 'monthly',
//       features: features || [],
//       limits: {
//         poemsPerDay: limits?.poemsPerDay || null,
//         ebooksPerMonth: limits?.ebooksPerMonth || null,
//         audiobooksPerMonth: limits?.audiobooksPerMonth || null,
//         unlimited: limits?.unlimited || false,
//         creator: limits?.creator || false
//       },
//       isActive: isActive !== undefined ? isActive : true,
//       displayOrder: displayOrder || 0,
//       badgeText: badgeText || '',
//       recommended: recommended || false
//     });
    
//     successResponse(res, plan, 'Plan created successfully', 201);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updatePlanCMS = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;
    
//     delete updateData.planId;
//     delete updateData._id;
    
//     const plan = await SubscriptionPlan.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true, runValidators: true }
//     );
    
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }
    
//     successResponse(res, plan, 'Plan updated successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const deletePlanCMS = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { permanent } = req.query;
    
//     const plan = await SubscriptionPlan.findById(id);
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }
    
//     const activeSubscriptions = await Subscription.countDocuments({
//       plan: plan.planId,
//       status: 'active'
//     });
    
//     if (permanent === 'true') {
//       if (activeSubscriptions > 0) {
//         return errorResponse(res, `Cannot delete plan with ${activeSubscriptions} active subscriptions`, 400);
//       }
//       await SubscriptionPlan.findByIdAndDelete(id);
//       successResponse(res, null, 'Plan permanently deleted');
//     } else {
//       plan.isActive = false;
//       await plan.save();
//       successResponse(res, plan, 'Plan deactivated');
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// export const togglePlanStatusCMS = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const plan = await SubscriptionPlan.findById(id);
    
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }
    
//     plan.isActive = !plan.isActive;
//     await plan.save();
    
//     successResponse(res, plan, `Plan ${plan.isActive ? 'activated' : 'deactivated'}`);
//   } catch (error) {
//     next(error);
//   }
// };

// export const reorderPlansCMS = async (req, res, next) => {
//   try {
//     const { orders } = req.body;
    
//     const updatePromises = orders.map(({ id, order }) =>
//       SubscriptionPlan.findByIdAndUpdate(id, { displayOrder: order }, { new: true })
//     );
    
//     await Promise.all(updatePromises);
//     successResponse(res, null, 'Plans reordered successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriptionStatsCMS = async (req, res, next) => {
//   try {
//     const totalPlans = await SubscriptionPlan.countDocuments();
//     const activePlans = await SubscriptionPlan.countDocuments({ isActive: true });
//     const totalUsers = await User.countDocuments();
//     const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });
    
//     const revenueStats = await Subscription.aggregate([
//       { $match: { status: 'active', 'price.amount': { $gt: 0 } } },
//       { $group: { _id: null, totalMonthlyRevenue: { $sum: '$price.amount' }, averageSubscriptionValue: { $avg: '$price.amount' } } }
//     ]);
    
//     const planDistribution = await Subscription.aggregate([
//       { $match: { status: 'active' } },
//       { $group: { _id: '$plan', count: { $sum: 1 } } }
//     ]);
    
//     successResponse(res, {
//       totalPlans,
//       activePlans,
//       totalUsers,
//       activeSubscriptions,
//       revenue: revenueStats[0] || { totalMonthlyRevenue: 0, averageSubscriptionValue: 0 },
//       planDistribution
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // SUBSCRIBERS MANAGEMENT
// // ============================================

// export const getAllSubscribers = async (req, res, next) => {
//   try {
//     const { page = 1, limit = 20, status, plan, search } = req.query;
    
//     let query = {};
//     if (status && status !== 'all') query.status = status;
//     if (plan && plan !== 'all') query.plan = plan;
    
//     const subscriptions = await Subscription.find(query)
//       .populate('user', 'name email profilePicture phone createdAt')
//       .sort({ createdAt: -1 })
//       .skip((parseInt(page) - 1) * parseInt(limit))
//       .limit(parseInt(limit));
    
//     let filteredSubscriptions = subscriptions;
//     if (search) {
//       filteredSubscriptions = subscriptions.filter(sub => 
//         sub.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
//         sub.user?.email?.toLowerCase().includes(search.toLowerCase())
//       );
//     }
    
//     const total = await Subscription.countDocuments(query);
    
//     successResponse(res, {
//       subscribers: filteredSubscriptions,
//       pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / limit) }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriberById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const subscription = await Subscription.findById(id)
//       .populate('user', 'name email profilePicture phone createdAt');
    
//     if (!subscription) {
//       return errorResponse(res, 'Subscriber not found', 404);
//     }
    
//     successResponse(res, subscription);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // TRANSACTIONS MANAGEMENT
// // ============================================

// export const getAllTransactions = async (req, res, next) => {
//   try {
//     const { page = 1, limit = 20, status, search } = req.query;
    
//     let query = {};
//     if (status && status !== 'all') query.status = status === 'success' ? 'active' : status;
    
//     let subscriptions = await Subscription.find(query)
//       .populate('user', 'name email')
//       .sort({ createdAt: -1 });
    
//     let transactions = subscriptions.map(sub => ({
//       _id: sub._id,
//       transactionId: sub.paymentId || `TXN_${sub._id}`,
//       user: sub.user,
//       amount: sub.price?.amount || 0,
//       currency: sub.price?.currency || 'INR',
//       status: sub.status === 'active' ? 'success' : sub.status,
//       createdAt: sub.createdAt,
//       plan: sub.plan,
//       billingCycle: sub.billingCycle
//     }));
    
//     if (search) {
//       transactions = transactions.filter(t => 
//         t.transactionId?.toLowerCase().includes(search.toLowerCase()) ||
//         t.user?.name?.toLowerCase().includes(search.toLowerCase())
//       );
//     }
    
//     const start = (parseInt(page) - 1) * parseInt(limit);
//     const paginatedTransactions = transactions.slice(start, start + parseInt(limit));
    
//     successResponse(res, {
//       transactions: paginatedTransactions,
//       pagination: { page: parseInt(page), limit: parseInt(limit), total: transactions.length, pages: Math.ceil(transactions.length / limit) }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getTransactionById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const subscription = await Subscription.findById(id)
//       .populate('user', 'name email phone');
    
//     if (!subscription) {
//       return errorResponse(res, 'Transaction not found', 404);
//     }
    
//     successResponse(res, {
//       _id: subscription._id,
//       transactionId: subscription.paymentId || `TXN_${subscription._id}`,
//       user: subscription.user,
//       amount: subscription.price?.amount || 0,
//       currency: subscription.price?.currency || 'INR',
//       status: subscription.status === 'active' ? 'success' : subscription.status,
//       createdAt: subscription.createdAt,
//       plan: subscription.plan,
//       billingCycle: subscription.billingCycle
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getTransactionStats = async (req, res, next) => {
//   try {
//     const allSubscriptions = await Subscription.find({});
    
//     const totalRevenue = allSubscriptions
//       .filter(sub => sub.status === 'active')
//       .reduce((sum, sub) => sum + (sub.price?.amount || 0), 0);
    
//     const totalTransactions = allSubscriptions.length;
//     const successfulTransactions = allSubscriptions.filter(sub => sub.status === 'active').length;
//     const pendingTransactions = allSubscriptions.filter(sub => sub.status === 'pending').length;
    
//     successResponse(res, {
//       totalRevenue,
//       totalTransactions,
//       successfulTransactions,
//       pendingTransactions,
//       failedTransactions: totalTransactions - successfulTransactions - pendingTransactions
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Initialize default plans when server starts
// initializeDefaultPlans().catch(console.error);































// // server/controllers/subscription.controller.js
// import { Subscription, SubscriptionPlan } from '../models/Subscription.js';
// import User from '../models/User.js';
// import { successResponse, errorResponse } from '../utils/response.js';
// import crypto from 'crypto';
// import mongoose from 'mongoose';
// import PDFDocument from 'pdfkit';

// // Default plans (fallback if database is empty)
// const defaultPlans = [
//   {
//     planId: 'free',
//     name: 'free',
//     displayName: 'Free',
//     description: 'Perfect for getting started',
//     price: { amount: 0, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       'Browse all content',
//       'Read public poems',
//       'Basic search',
//       '50 poems/day'
//     ],
//     limits: {
//       poemsPerDay: 50,
//       ebooksPerMonth: 2,
//       audiobooksPerMonth: 5,
//       unlimited: false,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 0,
//     badgeText: '',
//     recommended: false
//   },
//   {
//     planId: 'basic',
//     name: 'basic',
//     displayName: 'Basic',
//     description: 'Great for regular readers',
//     price: { amount: 99, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       'All free features',
//       'Unlimited poem reading',
//       'Download 5 ebooks/month',
//       'Basic audio streaming'
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: 5,
//       audiobooksPerMonth: 3,
//       unlimited: false,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 1,
//     badgeText: 'Popular',
//     recommended: true
//   },
//   {
//     planId: 'premium',
//     name: 'premium',
//     displayName: 'Premium',
//     description: 'For serious literature enthusiasts',
//     price: { amount: 199, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       'All Basic features',
//       'Unlimited downloads',
//       'HD audio streaming',
//       'Ad-free experience',
//       'AI explanations'
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: null,
//       audiobooksPerMonth: null,
//       unlimited: true,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 2,
//     badgeText: 'Best Value',
//     recommended: true
//   },
//   {
//     planId: 'pro',
//     name: 'pro',
//     displayName: 'Pro',
//     description: 'For creators and power users',
//     price: { amount: 499, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       'All Premium features',
//       'Creator tools',
//       'Priority support',
//       'Analytics dashboard',
//       'Early access'
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: null,
//       audiobooksPerMonth: null,
//       unlimited: true,
//       creator: true
//     },
//     isActive: true,
//     displayOrder: 3,
//     badgeText: 'Creator',
//     recommended: false
//   }
// ];

// // Coupons store
// let coupons = [
//   {
//     code: 'WELCOME10',
//     discountType: 'percentage',
//     discountValue: 10,
//     validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
//     usageLimit: 100,
//     usedCount: 0,
//     minAmount: 0,
//     applicablePlans: ['basic', 'premium', 'pro'],
//     isActive: true
//   },
//   {
//     code: 'SAVE20',
//     discountType: 'percentage',
//     discountValue: 20,
//     validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
//     usageLimit: 50,
//     usedCount: 0,
//     minAmount: 500,
//     applicablePlans: ['premium', 'pro'],
//     isActive: true
//   },
//   {
//     code: 'FLAT100',
//     discountType: 'fixed',
//     discountValue: 100,
//     validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
//     usageLimit: 30,
//     usedCount: 0,
//     minAmount: 300,
//     applicablePlans: ['basic', 'premium', 'pro'],
//     isActive: true
//   }
// ];

// // Initialize default plans
// const initializeDefaultPlans = async () => {
//   try {
//     for (const planData of defaultPlans) {
//       const existingPlan = await SubscriptionPlan.findOne({ planId: planData.planId });
//       if (!existingPlan) {
//         await SubscriptionPlan.create(planData);
//         console.log(`✅ Created default plan: ${planData.planId}`);
//       }
//     }
//     console.log('✅ Default plans initialized');
//   } catch (error) {
//     console.error('❌ Error initializing plans:', error.message);
//   }
// };

// // ============================================
// // PUBLIC ROUTES
// // ============================================

// export const getPlans = async (req, res, next) => {
//   try {
//     let plans = await SubscriptionPlan.find({ isActive: true })
//       .sort({ displayOrder: 1, 'price.amount': 1 });
    
//     if (plans.length === 0) {
//       await initializeDefaultPlans();
//       plans = await SubscriptionPlan.find({ isActive: true })
//         .sort({ displayOrder: 1, 'price.amount': 1 });
//     }
    
//     const formattedPlans = plans.reduce((acc, plan) => {
//       acc[plan.planId] = {
//         name: plan.displayName,
//         price: plan.price.amount,
//         currency: plan.price.currency,
//         features: plan.features,
//         limits: plan.limits,
//         badgeText: plan.badgeText,
//         recommended: plan.recommended,
//         description: plan.description
//       };
//       return acc;
//     }, {});
    
//     successResponse(res, formattedPlans);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriptionFeatures = async (req, res, next) => {
//   try {
//     let plans = await SubscriptionPlan.find({ isActive: true })
//       .sort({ displayOrder: 1, 'price.amount': 1 });
    
//     if (plans.length === 0) {
//       await initializeDefaultPlans();
//       plans = await SubscriptionPlan.find({ isActive: true })
//         .sort({ displayOrder: 1, 'price.amount': 1 });
//     }
    
//     successResponse(res, plans.map(plan => ({
//       id: plan.planId,
//       name: plan.displayName,
//       price: plan.price.amount,
//       currency: plan.price.currency,
//       features: plan.features,
//       limits: plan.limits,
//       badgeText: plan.badgeText,
//       recommended: plan.recommended,
//       description: plan.description
//     })));
//   } catch (error) {
//     next(error);
//   }
// };

// export const getCurrentSubscription = async (req, res, next) => {
//   try {
//     const subscription = await Subscription.findOne({
//       user: req.user.id,
//       status: 'active'
//     }).sort({ createdAt: -1 });

//     const user = await User.findById(req.user.id);
    
//     const planDetails = await SubscriptionPlan.findOne({ planId: user.subscription?.plan || 'free' });
    
//     successResponse(res, {
//       subscription: subscription || null,
//       plan: user.subscription || { plan: 'free' },
//       features: planDetails ? planDetails.features : []
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const subscribe = async (req, res, next) => {
//   try {
//     const { plan, billingCycle, paymentMethod, couponCode } = req.body;
    
//     let planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
    
//     if (!planDetails) {
//       await initializeDefaultPlans();
//       planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
      
//       if (!planDetails) {
//         return errorResponse(res, 'Invalid plan', 400);
//       }
//     }
    
//     const months = billingCycle === 'yearly' ? 12 : billingCycle === 'quarterly' ? 3 : 1;
//     let amount = planDetails.price.amount * months;
//     let discountAmount = 0;
    
//     // Apply coupon if provided
//     if (couponCode) {
//       const coupon = coupons.find(c => c.code === couponCode.toUpperCase());
//       if (coupon && coupon.isActive && (!coupon.validUntil || new Date(coupon.validUntil) > new Date())) {
//         if (coupon.discountType === 'percentage') {
//           discountAmount = amount * coupon.discountValue / 100;
//         } else {
//           discountAmount = coupon.discountValue;
//         }
//         amount = Math.max(0, amount - discountAmount);
//         coupon.usedCount++;
//       }
//     }
    
//     if (plan === 'free' || amount === 0) {
//       const subscription = await Subscription.create({
//         user: req.user.id,
//         plan,
//         status: 'active',
//         price: { amount: 0, currency: planDetails.price.currency },
//         billingCycle,
//         paymentMethod: 'free',
//         expiresAt: null,
//         features: planDetails.features,
//         discountApplied: discountAmount > 0 ? { amount: discountAmount, coupon: couponCode } : null
//       });
      
//       await User.findByIdAndUpdate(req.user.id, {
//         'subscription.plan': plan,
//         'subscription.startedAt': new Date(),
//         'subscription.expiresAt': null
//       });
      
//       return successResponse(res, { subscription, plan: planDetails }, 'Free subscription activated', 201);
//     }
    
//     const subscription = await Subscription.create({
//       user: req.user.id,
//       plan,
//       status: 'pending',
//       price: { amount, currency: planDetails.price.currency, originalAmount: planDetails.price.amount * months },
//       billingCycle,
//       paymentMethod: paymentMethod || 'pending',
//       expiresAt: new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000),
//       features: planDetails.features,
//       discountApplied: discountAmount > 0 ? { amount: discountAmount, coupon: couponCode } : null
//     });
    
//     successResponse(res, { 
//       subscription, 
//       plan: planDetails,
//       requiresPayment: true,
//       discountApplied: discountAmount > 0 ? { amount: discountAmount, finalAmount: amount } : null
//     }, 'Subscription initiated', 201);
//   } catch (error) {
//     next(error);
//   }
// };

// export const verifyPayment = async (req, res, next) => {
//   try {
//     const { subscriptionId, paymentId, orderId, signature } = req.body;
    
//     // Verify signature if provided (for Razorpay)
//     if (signature && orderId) {
//       const body = orderId + "|" + paymentId;
//       const expectedSignature = crypto
//         .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'test_secret')
//         .update(body.toString())
//         .digest('hex');
      
//       if (expectedSignature !== signature) {
//         return errorResponse(res, 'Invalid payment signature', 400);
//       }
//     }
    
//     const subscription = await Subscription.findByIdAndUpdate(
//       subscriptionId,
//       { status: 'active', paymentId, verifiedAt: new Date() },
//       { new: true }
//     );
    
//     if (!subscription) {
//       return errorResponse(res, 'Subscription not found', 404);
//     }
    
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': subscription.plan,
//       'subscription.startedAt': new Date(),
//       'subscription.expiresAt': subscription.expiresAt,
//       'subscription.status': 'active'
//     });
    
//     successResponse(res, subscription, 'Payment verified and subscription activated');
//   } catch (error) {
//     next(error);
//   }
// };

// export const cancelSubscription = async (req, res, next) => {
//   try {
//     const subscription = await Subscription.findOneAndUpdate(
//       { user: req.user.id, status: 'active' },
//       { status: 'cancelled', cancelledAt: new Date() },
//       { new: true, sort: { createdAt: -1 } }
//     );
    
//     if (!subscription) {
//       return errorResponse(res, 'No active subscription found', 404);
//     }
    
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': 'free'
//     });
    
//     successResponse(res, subscription, 'Subscription cancelled');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getBillingHistory = async (req, res, next) => {
//   try {
//     const history = await Subscription.find({ user: req.user.id })
//       .sort({ createdAt: -1 });
    
//     successResponse(res, history);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // INVOICE ROUTES - FIXED PDF GENERATION
// // ============================================

// export const getInvoice = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const subscription = await Subscription.findById(id)
//       .populate('user', 'name email phone');
    
//     if (!subscription) {
//       return errorResponse(res, 'Invoice not found', 404);
//     }
    
//     if (subscription.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
//       return errorResponse(res, 'Unauthorized', 403);
//     }
    
//     const invoiceNumber = `INV-${subscription._id.toString().slice(-8).toUpperCase()}`;
//     const date = new Date(subscription.createdAt).toLocaleDateString('en-IN');
//     const dueDate = subscription.expiresAt ? new Date(subscription.expiresAt).toLocaleDateString('en-IN') : 'N/A';
//     const planName = `${subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} Plan`;
//     const billingText = `${subscription.billingCycle || 'Monthly'} Subscription`;
//     const subtotal = subscription.price.originalAmount || subscription.price.amount;
//     const discount = subscription.discountApplied?.amount || 0;
//     const finalAmount = subscription.price.amount;
//     const tax = finalAmount * 0.18;
//     const total = finalAmount + tax;
    
//     const invoiceData = {
//       id: subscription._id,
//       invoiceNumber,
//       date,
//       dueDate,
//       customer: {
//         name: subscription.user.name,
//         email: subscription.user.email,
//         phone: subscription.user.phone
//       },
//       items: [{
//         description: `${planName} - ${billingText}`,
//         quantity: 1,
//         unitPrice: subtotal,
//         discount,
//         total: finalAmount
//       }],
//       subtotal,
//       discount,
//       tax,
//       total,
//       currency: subscription.price.currency,
//       status: subscription.status === 'active' ? 'paid' : subscription.status,
//       paymentMethod: subscription.paymentMethod,
//       paymentId: subscription.paymentId
//     };
    
//     successResponse(res, invoiceData);
//   } catch (error) {
//     next(error);
//   }
// };

// // Generate proper PDF invoice using pdfkit
// export const downloadInvoice = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const subscription = await Subscription.findById(id)
//       .populate('user', 'name email phone');
    
//     if (!subscription) {
//       return errorResponse(res, 'Invoice not found', 404);
//     }
    
//     if (subscription.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
//       return errorResponse(res, 'Unauthorized', 403);
//     }
    
//     // Create PDF document
//     const doc = new PDFDocument({ margin: 50, size: 'A4' });
    
//     // Set response headers for PDF
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', `attachment; filename=invoice_${subscription._id}.pdf`);
    
//     // Pipe PDF to response
//     doc.pipe(res);
    
//     // Invoice number and dates
//     const invoiceNumber = `INV-${subscription._id.toString().slice(-8).toUpperCase()}`;
//     const date = new Date(subscription.createdAt).toLocaleDateString('en-IN');
//     const dueDate = subscription.expiresAt ? new Date(subscription.expiresAt).toLocaleDateString('en-IN') : 'N/A';
//     const planName = `${subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} Plan`;
//     const billingText = `${subscription.billingCycle || 'Monthly'} Subscription`;
//     const subtotal = subscription.price.originalAmount || subscription.price.amount;
//     const discount = subscription.discountApplied?.amount || 0;
//     const finalAmount = subscription.price.amount;
//     const tax = finalAmount * 0.18;
//     const total = finalAmount + tax;
    
//     // Header
//     doc.fontSize(24)
//       .font('Helvetica-Bold')
//       .fillColor('#8B5CF6')
//       .text('Zauq App', { align: 'center' });
    
//     doc.fontSize(10)
//       .font('Helvetica')
//       .fillColor('#666666')
//       .text('Literary Platform', { align: 'center' })
//       .moveDown(0.5);
    
//     // Horizontal line
//     doc.moveTo(50, doc.y)
//       .lineTo(550, doc.y)
//       .strokeColor('#cccccc')
//       .stroke();
    
//     doc.moveDown(1);
    
//     // Invoice Title
//     doc.fontSize(18)
//       .font('Helvetica-Bold')
//       .fillColor('#333333')
//       .text('INVOICE', { align: 'center' })
//       .moveDown(0.5);
    
//     // Invoice Details
//     doc.fontSize(10)
//       .font('Helvetica')
//       .fillColor('#666666')
//       .text(`Invoice Number: ${invoiceNumber}`, { align: 'right' })
//       .text(`Date: ${date}`, { align: 'right' })
//       .text(`Due Date: ${dueDate}`, { align: 'right' })
//       .moveDown(1);
    
//     // Bill To Section
//     doc.fontSize(12)
//       .font('Helvetica-Bold')
//       .fillColor('#333333')
//       .text('Bill To:', { underline: true })
//       .moveDown(0.3);
    
//     doc.fontSize(10)
//       .font('Helvetica')
//       .fillColor('#666666')
//       .text(subscription.user.name || 'Customer')
//       .text(subscription.user.email || '')
//       .text(subscription.user.phone || '')
//       .moveDown(1);
    
//     // Table Header
//     let y = doc.y;
//     const col1 = 50;
//     const col2 = 250;
//     const col3 = 400;
//     const col4 = 450;
//     const col5 = 500;
    
//     doc.fontSize(10)
//       .font('Helvetica-Bold')
//       .fillColor('#333333')
//       .text('Description', col1, y)
//       .text('Qty', col3, y)
//       .text('Unit Price', col4, y)
//       .text('Total', col5, y);
    
//     doc.moveTo(50, y + 15)
//       .lineTo(550, y + 15)
//       .strokeColor('#cccccc')
//       .stroke();
    
//     y += 25;
    
//     // Table Row
//     doc.fontSize(10)
//       .font('Helvetica')
//       .fillColor('#333333')
//       .text(`${planName} - ${billingText}`, col1, y, { width: 190 })
//       .text('1', col3, y)
//       .text(`${subscription.price.currency} ${subtotal}`, col4, y)
//       .text(`${subscription.price.currency} ${subtotal}`, col5, y);
    
//     y += 25;
    
//     // Discount row if applicable
//     if (discount > 0) {
//       doc.fillColor('#10B981')
//         .text('Discount Applied', col1, y)
//         .text('-', col3, y)
//         .text(`-${subscription.price.currency} ${discount}`, col4, y)
//         .text(`-${subscription.price.currency} ${discount}`, col5, y);
//       y += 25;
//     }
    
//     // Tax row
//     doc.fillColor('#666666')
//       .text('Tax (18% GST)', col1, y)
//       .text('', col3, y)
//       .text(`${subscription.price.currency} ${tax.toFixed(2)}`, col4, y)
//       .text(`${subscription.price.currency} ${tax.toFixed(2)}`, col5, y);
    
//     y += 25;
    
//     // Total row
//     doc.moveTo(50, y - 5)
//       .lineTo(550, y - 5)
//       .strokeColor('#cccccc')
//       .stroke();
    
//     doc.fontSize(12)
//       .font('Helvetica-Bold')
//       .fillColor('#333333')
//       .text('Total', col1, y)
//       .text('', col3, y)
//       .text('', col4, y)
//       .text(`${subscription.price.currency} ${total.toFixed(2)}`, col5, y);
    
//     y += 30;
    
//     // Payment Status
//     const statusColor = subscription.status === 'active' ? '#10B981' : '#EF4444';
//     const statusText = subscription.status === 'active' ? 'PAID' : subscription.status.toUpperCase();
    
//     doc.fontSize(12)
//       .font('Helvetica-Bold')
//       .fillColor(statusColor)
//       .text(`Payment Status: ${statusText}`, 50, y);
    
//     y += 20;
    
//     // Payment Method
//     if (subscription.paymentMethod && subscription.paymentMethod !== 'free') {
//       doc.fontSize(10)
//         .font('Helvetica')
//         .fillColor('#666666')
//         .text(`Payment Method: ${subscription.paymentMethod.toUpperCase()}`, 50, y);
//       y += 15;
//     }
    
//     if (subscription.paymentId) {
//       doc.text(`Transaction ID: ${subscription.paymentId}`, 50, y);
//       y += 15;
//     }
    
//     y += 20;
    
//     // Footer
//     doc.fontSize(9)
//       .fillColor('#999999')
//       .text('Thank you for your business!', 50, 750, { align: 'center' })
//       .text('For any questions, contact support@zauqapp.com', 50, 765, { align: 'center' });
    
//     // Finalize PDF
//     doc.end();
    
//   } catch (error) {
//     console.error('Error generating invoice PDF:', error);
//     errorResponse(res, 'Failed to generate invoice PDF', 500);
//   }
// };

// export const sendInvoiceEmail = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     successResponse(res, null, 'Invoice email sent successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // PAYMENT METHODS
// // ============================================

// export const getPaymentMethods = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
//     const methods = user.paymentMethods || [];
    
//     const maskedMethods = methods.map(method => ({
//       _id: method._id,
//       cardNumber: `•••• •••• •••• ${method.lastFourDigits || '****'}`,
//       cardHolder: method.cardHolder,
//       expiryMonth: method.expiryMonth,
//       expiryYear: method.expiryYear,
//       cardBrand: method.cardBrand,
//       isDefault: method.isDefault
//     }));
    
//     successResponse(res, maskedMethods);
//   } catch (error) {
//     next(error);
//   }
// };

// export const addPaymentMethod = async (req, res, next) => {
//   try {
//     const { cardNumber, cardHolder, expiryMonth, expiryYear } = req.body;
    
//     if (!cardNumber || !cardHolder) {
//       return errorResponse(res, 'Card number and holder name required', 400);
//     }
    
//     const user = await User.findById(req.user.id);
//     if (!user.paymentMethods) user.paymentMethods = [];
    
//     const lastFourDigits = cardNumber.replace(/\s/g, '').slice(-4);
//     const newMethod = {
//       _id: new mongoose.Types.ObjectId(),
//       cardNumber: cardNumber.replace(/\s/g, ''),
//       cardHolder: cardHolder.toUpperCase(),
//       expiryMonth,
//       expiryYear,
//       lastFourDigits,
//       cardBrand: cardNumber.startsWith('4') ? 'visa' : 'mastercard',
//       isDefault: user.paymentMethods.length === 0,
//       createdAt: new Date()
//     };
    
//     user.paymentMethods.push(newMethod);
//     await user.save();
    
//     successResponse(res, {
//       _id: newMethod._id,
//       cardNumber: `•••• •••• •••• ${lastFourDigits}`,
//       cardHolder: newMethod.cardHolder,
//       expiryMonth: newMethod.expiryMonth,
//       expiryYear: newMethod.expiryYear,
//       isDefault: newMethod.isDefault
//     }, 'Payment method added');
//   } catch (error) {
//     next(error);
//   }
// };

// export const removePaymentMethod = async (req, res, next) => {
//   try {
//     const { methodId } = req.params;
//     const user = await User.findById(req.user.id);
    
//     if (!user.paymentMethods) {
//       return errorResponse(res, 'No payment methods found', 404);
//     }
    
//     const methodIndex = user.paymentMethods.findIndex(m => m._id.toString() === methodId);
//     if (methodIndex === -1) {
//       return errorResponse(res, 'Payment method not found', 404);
//     }
    
//     if (user.paymentMethods.length === 1) {
//       return errorResponse(res, 'Cannot remove the only payment method', 400);
//     }
    
//     const wasDefault = user.paymentMethods[methodIndex].isDefault;
//     user.paymentMethods.splice(methodIndex, 1);
    
//     if (wasDefault && user.paymentMethods.length > 0) {
//       user.paymentMethods[0].isDefault = true;
//     }
    
//     await user.save();
//     successResponse(res, null, 'Payment method removed');
//   } catch (error) {
//     next(error);
//   }
// };

// export const setDefaultPaymentMethod = async (req, res, next) => {
//   try {
//     const { methodId } = req.params;
//     const user = await User.findById(req.user.id);
    
//     if (!user.paymentMethods) {
//       return errorResponse(res, 'No payment methods found', 404);
//     }
    
//     user.paymentMethods.forEach(method => {
//       method.isDefault = method._id.toString() === methodId;
//     });
    
//     await user.save();
//     successResponse(res, null, 'Default payment method updated');
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // COUPON ROUTES
// // ============================================

// export const validateCoupon = async (req, res, next) => {
//   try {
//     const { code } = req.params;
//     const { plan, amount } = req.query;
    
//     const coupon = coupons.find(c => c.code === code.toUpperCase());
    
//     if (!coupon) {
//       return errorResponse(res, 'Invalid coupon code', 404);
//     }
    
//     if (!coupon.isActive) {
//       return errorResponse(res, 'Coupon is not active', 400);
//     }
    
//     if (coupon.validUntil && new Date(coupon.validUntil) < new Date()) {
//       return errorResponse(res, 'Coupon has expired', 400);
//     }
    
//     if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
//       return errorResponse(res, 'Coupon usage limit exceeded', 400);
//     }
    
//     if (plan && coupon.applicablePlans && !coupon.applicablePlans.includes(plan)) {
//       return errorResponse(res, `Coupon not applicable for ${plan} plan`, 400);
//     }
    
//     const orderAmount = parseFloat(amount);
//     if (coupon.minAmount && orderAmount < coupon.minAmount) {
//       return errorResponse(res, `Minimum order amount of ${coupon.minAmount} required`, 400);
//     }
    
//     let discountAmount = 0;
//     if (coupon.discountType === 'percentage') {
//       discountAmount = orderAmount * coupon.discountValue / 100;
//     } else {
//       discountAmount = coupon.discountValue;
//     }
    
//     const finalAmount = Math.max(0, orderAmount - discountAmount);
    
//     successResponse(res, {
//       code: coupon.code,
//       discountType: coupon.discountType,
//       discountValue: coupon.discountValue,
//       discountAmount,
//       finalAmount,
//       savedAmount: orderAmount - finalAmount
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const applyCoupon = async (req, res, next) => {
//   try {
//     const { code, plan, amount } = req.body;
    
//     const coupon = coupons.find(c => c.code === code.toUpperCase());
    
//     if (!coupon) {
//       return errorResponse(res, 'Invalid coupon code', 404);
//     }
    
//     if (!coupon.isActive) {
//       return errorResponse(res, 'Coupon is not active', 400);
//     }
    
//     if (coupon.validUntil && new Date(coupon.validUntil) < new Date()) {
//       return errorResponse(res, 'Coupon has expired', 400);
//     }
    
//     if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
//       return errorResponse(res, 'Coupon usage limit exceeded', 400);
//     }
    
//     if (plan && coupon.applicablePlans && !coupon.applicablePlans.includes(plan)) {
//       return errorResponse(res, `Coupon not applicable for ${plan} plan`, 400);
//     }
    
//     const orderAmount = parseFloat(amount);
//     if (coupon.minAmount && orderAmount < coupon.minAmount) {
//       return errorResponse(res, `Minimum order amount of ${coupon.minAmount} required`, 400);
//     }
    
//     let discountAmount = 0;
//     if (coupon.discountType === 'percentage') {
//       discountAmount = orderAmount * coupon.discountValue / 100;
//     } else {
//       discountAmount = coupon.discountValue;
//     }
    
//     const finalAmount = Math.max(0, orderAmount - discountAmount);
    
//     // Increment usage count
//     coupon.usedCount++;
    
//     successResponse(res, {
//       coupon: {
//         code: coupon.code,
//         discountType: coupon.discountType,
//         discountValue: coupon.discountValue,
//         discountAmount,
//         finalAmount,
//         savedAmount: orderAmount - finalAmount
//       },
//       applied: true
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // ADMIN CMS ROUTES
// // ============================================

// export const getAllPlansCMS = async (req, res, next) => {
//   try {
//     const plans = await SubscriptionPlan.find().sort({ displayOrder: 1, 'price.amount': 1 });
    
//     const plansWithStats = await Promise.all(plans.map(async (plan) => {
//       const subscriberCount = await Subscription.countDocuments({ 
//         plan: plan.planId, 
//         status: 'active' 
//       });
      
//       const planObj = plan.toObject();
//       planObj.subscriberCount = subscriberCount;
      
//       return planObj;
//     }));
    
//     successResponse(res, plansWithStats);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getPlanByIdCMS = async (req, res, next) => {
//   try {
//     const plan = await SubscriptionPlan.findById(req.params.id);
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }
//     successResponse(res, plan);
//   } catch (error) {
//     next(error);
//   }
// };

// export const createPlanCMS = async (req, res, next) => {
//   try {
//     const {
//       planId,
//       name,
//       displayName,
//       description,
//       price,
//       billingCycle,
//       features,
//       limits,
//       isActive,
//       displayOrder,
//       badgeText,
//       recommended
//     } = req.body;
    
//     const validPlans = ['free', 'basic', 'premium', 'pro'];
//     if (!validPlans.includes(planId)) {
//       return errorResponse(res, 'Invalid plan ID', 400);
//     }
    
//     const existingPlan = await SubscriptionPlan.findOne({ planId });
//     if (existingPlan) {
//       return errorResponse(res, 'Plan ID already exists', 400);
//     }
    
//     const plan = await SubscriptionPlan.create({
//       planId,
//       name: name || planId,
//       displayName,
//       description: description || '',
//       price: { amount: price?.amount || 0, currency: price?.currency || 'INR' },
//       billingCycle: billingCycle || 'monthly',
//       features: features || [],
//       limits: {
//         poemsPerDay: limits?.poemsPerDay || null,
//         ebooksPerMonth: limits?.ebooksPerMonth || null,
//         audiobooksPerMonth: limits?.audiobooksPerMonth || null,
//         unlimited: limits?.unlimited || false,
//         creator: limits?.creator || false
//       },
//       isActive: isActive !== undefined ? isActive : true,
//       displayOrder: displayOrder || 0,
//       badgeText: badgeText || '',
//       recommended: recommended || false
//     });
    
//     successResponse(res, plan, 'Plan created successfully', 201);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updatePlanCMS = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;
    
//     delete updateData.planId;
//     delete updateData._id;
    
//     const plan = await SubscriptionPlan.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true, runValidators: true }
//     );
    
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }
    
//     successResponse(res, plan, 'Plan updated successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const deletePlanCMS = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { permanent } = req.query;
    
//     const plan = await SubscriptionPlan.findById(id);
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }
    
//     const activeSubscriptions = await Subscription.countDocuments({
//       plan: plan.planId,
//       status: 'active'
//     });
    
//     if (permanent === 'true') {
//       if (activeSubscriptions > 0) {
//         return errorResponse(res, `Cannot delete plan with ${activeSubscriptions} active subscriptions`, 400);
//       }
//       await SubscriptionPlan.findByIdAndDelete(id);
//       successResponse(res, null, 'Plan permanently deleted');
//     } else {
//       plan.isActive = false;
//       await plan.save();
//       successResponse(res, plan, 'Plan deactivated');
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// export const togglePlanStatusCMS = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const plan = await SubscriptionPlan.findById(id);
    
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }
    
//     plan.isActive = !plan.isActive;
//     await plan.save();
    
//     successResponse(res, plan, `Plan ${plan.isActive ? 'activated' : 'deactivated'}`);
//   } catch (error) {
//     next(error);
//   }
// };

// export const reorderPlansCMS = async (req, res, next) => {
//   try {
//     const { orders } = req.body;
    
//     const updatePromises = orders.map(({ id, order }) =>
//       SubscriptionPlan.findByIdAndUpdate(id, { displayOrder: order }, { new: true })
//     );
    
//     await Promise.all(updatePromises);
//     successResponse(res, null, 'Plans reordered successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriptionStatsCMS = async (req, res, next) => {
//   try {
//     const totalPlans = await SubscriptionPlan.countDocuments();
//     const activePlans = await SubscriptionPlan.countDocuments({ isActive: true });
//     const totalUsers = await User.countDocuments();
//     const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });
    
//     const revenueStats = await Subscription.aggregate([
//       { $match: { status: 'active', 'price.amount': { $gt: 0 } } },
//       { $group: { _id: null, totalMonthlyRevenue: { $sum: '$price.amount' }, averageSubscriptionValue: { $avg: '$price.amount' } } }
//     ]);
    
//     const planDistribution = await Subscription.aggregate([
//       { $match: { status: 'active' } },
//       { $group: { _id: '$plan', count: { $sum: 1 } } }
//     ]);
    
//     successResponse(res, {
//       totalPlans,
//       activePlans,
//       totalUsers,
//       activeSubscriptions,
//       revenue: revenueStats[0] || { totalMonthlyRevenue: 0, averageSubscriptionValue: 0 },
//       planDistribution
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // SUBSCRIBERS MANAGEMENT
// // ============================================

// export const getAllSubscribers = async (req, res, next) => {
//   try {
//     const { page = 1, limit = 20, status, plan, search } = req.query;
    
//     let query = {};
//     if (status && status !== 'all') query.status = status;
//     if (plan && plan !== 'all') query.plan = plan;
    
//     const subscriptions = await Subscription.find(query)
//       .populate('user', 'name email profilePicture phone createdAt')
//       .sort({ createdAt: -1 })
//       .skip((parseInt(page) - 1) * parseInt(limit))
//       .limit(parseInt(limit));
    
//     let filteredSubscriptions = subscriptions;
//     if (search) {
//       filteredSubscriptions = subscriptions.filter(sub => 
//         sub.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
//         sub.user?.email?.toLowerCase().includes(search.toLowerCase())
//       );
//     }
    
//     const total = await Subscription.countDocuments(query);
    
//     successResponse(res, {
//       subscribers: filteredSubscriptions,
//       pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / limit) }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriberById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const subscription = await Subscription.findById(id)
//       .populate('user', 'name email profilePicture phone createdAt');
    
//     if (!subscription) {
//       return errorResponse(res, 'Subscriber not found', 404);
//     }
    
//     successResponse(res, subscription);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // TRANSACTIONS MANAGEMENT
// // ============================================

// export const getAllTransactions = async (req, res, next) => {
//   try {
//     const { page = 1, limit = 20, status, search } = req.query;
    
//     let query = {};
//     if (status && status !== 'all') query.status = status === 'success' ? 'active' : status;
    
//     let subscriptions = await Subscription.find(query)
//       .populate('user', 'name email')
//       .sort({ createdAt: -1 });
    
//     let transactions = subscriptions.map(sub => ({
//       _id: sub._id,
//       transactionId: sub.paymentId || `TXN_${sub._id}`,
//       user: sub.user,
//       amount: sub.price?.amount || 0,
//       currency: sub.price?.currency || 'INR',
//       status: sub.status === 'active' ? 'success' : sub.status,
//       createdAt: sub.createdAt,
//       plan: sub.plan,
//       billingCycle: sub.billingCycle
//     }));
    
//     if (search) {
//       transactions = transactions.filter(t => 
//         t.transactionId?.toLowerCase().includes(search.toLowerCase()) ||
//         t.user?.name?.toLowerCase().includes(search.toLowerCase())
//       );
//     }
    
//     const start = (parseInt(page) - 1) * parseInt(limit);
//     const paginatedTransactions = transactions.slice(start, start + parseInt(limit));
    
//     successResponse(res, {
//       transactions: paginatedTransactions,
//       pagination: { page: parseInt(page), limit: parseInt(limit), total: transactions.length, pages: Math.ceil(transactions.length / limit) }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getTransactionById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const subscription = await Subscription.findById(id)
//       .populate('user', 'name email phone');
    
//     if (!subscription) {
//       return errorResponse(res, 'Transaction not found', 404);
//     }
    
//     successResponse(res, {
//       _id: subscription._id,
//       transactionId: subscription.paymentId || `TXN_${subscription._id}`,
//       user: subscription.user,
//       amount: subscription.price?.amount || 0,
//       currency: subscription.price?.currency || 'INR',
//       status: subscription.status === 'active' ? 'success' : subscription.status,
//       createdAt: subscription.createdAt,
//       plan: subscription.plan,
//       billingCycle: subscription.billingCycle
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getTransactionStats = async (req, res, next) => {
//   try {
//     const allSubscriptions = await Subscription.find({});
    
//     const totalRevenue = allSubscriptions
//       .filter(sub => sub.status === 'active')
//       .reduce((sum, sub) => sum + (sub.price?.amount || 0), 0);
    
//     const totalTransactions = allSubscriptions.length;
//     const successfulTransactions = allSubscriptions.filter(sub => sub.status === 'active').length;
//     const pendingTransactions = allSubscriptions.filter(sub => sub.status === 'pending').length;
    
//     successResponse(res, {
//       totalRevenue,
//       totalTransactions,
//       successfulTransactions,
//       pendingTransactions,
//       failedTransactions: totalTransactions - successfulTransactions - pendingTransactions
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Initialize default plans when server starts
// initializeDefaultPlans().catch(console.error);

















// // server/controllers/subscription.controller.js
// import { Subscription, SubscriptionPlan } from '../models/Subscription.js';
// import User from '../models/User.js';
// import { successResponse, errorResponse } from '../utils/response.js';
// import crypto from 'crypto';
// import mongoose from 'mongoose';
// import PDFDocument from 'pdfkit';

// // Default plans (fallback if database is empty)
// const defaultPlans = [
//   {
//     planId: 'free',
//     name: 'free',
//     displayName: 'Free',
//     description: 'Perfect for getting started',
//     price: { amount: 0, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       'Browse all content',
//       'Read public poems',
//       'Basic search',
//       '50 poems/day'
//     ],
//     limits: {
//       poemsPerDay: 50,
//       ebooksPerMonth: 2,
//       audiobooksPerMonth: 5,
//       unlimited: false,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 0,
//     badgeText: '',
//     recommended: false
//   },
//   {
//     planId: 'basic',
//     name: 'basic',
//     displayName: 'Basic',
//     description: 'Great for regular readers',
//     price: { amount: 99, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       'All free features',
//       'Unlimited poem reading',
//       'Download 5 ebooks/month',
//       'Basic audio streaming'
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: 5,
//       audiobooksPerMonth: 3,
//       unlimited: false,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 1,
//     badgeText: 'Popular',
//     recommended: true
//   },
//   {
//     planId: 'premium',
//     name: 'premium',
//     displayName: 'Premium',
//     description: 'For serious literature enthusiasts',
//     price: { amount: 199, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       'All Basic features',
//       'Unlimited downloads',
//       'HD audio streaming',
//       'Ad-free experience',
//       'AI explanations'
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: null,
//       audiobooksPerMonth: null,
//       unlimited: true,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 2,
//     badgeText: 'Best Value',
//     recommended: true
//   },
//   {
//     planId: 'pro',
//     name: 'pro',
//     displayName: 'Pro',
//     description: 'For creators and power users',
//     price: { amount: 499, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       'All Premium features',
//       'Creator tools',
//       'Priority support',
//       'Analytics dashboard',
//       'Early access'
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: null,
//       audiobooksPerMonth: null,
//       unlimited: true,
//       creator: true
//     },
//     isActive: true,
//     displayOrder: 3,
//     badgeText: 'Creator',
//     recommended: false
//   }
// ];

// // Coupons store
// let coupons = [
//   {
//     code: 'WELCOME10',
//     discountType: 'percentage',
//     discountValue: 10,
//     validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
//     usageLimit: 100,
//     usedCount: 0,
//     minAmount: 0,
//     applicablePlans: ['basic', 'premium', 'pro'],
//     isActive: true
//   },
//   {
//     code: 'SAVE20',
//     discountType: 'percentage',
//     discountValue: 20,
//     validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
//     usageLimit: 50,
//     usedCount: 0,
//     minAmount: 500,
//     applicablePlans: ['premium', 'pro'],
//     isActive: true
//   },
//   {
//     code: 'FLAT100',
//     discountType: 'fixed',
//     discountValue: 100,
//     validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
//     usageLimit: 30,
//     usedCount: 0,
//     minAmount: 300,
//     applicablePlans: ['basic', 'premium', 'pro'],
//     isActive: true
//   }
// ];

// // Initialize default plans
// const initializeDefaultPlans = async () => {
//   try {
//     for (const planData of defaultPlans) {
//       const existingPlan = await SubscriptionPlan.findOne({ planId: planData.planId });
//       if (!existingPlan) {
//         await SubscriptionPlan.create(planData);
//         console.log(`✅ Created default plan: ${planData.planId}`);
//       }
//     }
//     console.log('✅ Default plans initialized');
//   } catch (error) {
//     console.error('❌ Error initializing plans:', error.message);
//   }
// };

// // ============================================
// // PUBLIC ROUTES
// // ============================================

// export const getPlans = async (req, res, next) => {
//   try {
//     let plans = await SubscriptionPlan.find({ isActive: true })
//       .sort({ displayOrder: 1, 'price.amount': 1 });
    
//     if (plans.length === 0) {
//       await initializeDefaultPlans();
//       plans = await SubscriptionPlan.find({ isActive: true })
//         .sort({ displayOrder: 1, 'price.amount': 1 });
//     }
    
//     const formattedPlans = plans.reduce((acc, plan) => {
//       acc[plan.planId] = {
//         name: plan.displayName,
//         price: plan.price.amount,
//         currency: plan.price.currency,
//         features: plan.features,
//         limits: plan.limits,
//         badgeText: plan.badgeText,
//         recommended: plan.recommended,
//         description: plan.description
//       };
//       return acc;
//     }, {});
    
//     successResponse(res, formattedPlans);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriptionFeatures = async (req, res, next) => {
//   try {
//     let plans = await SubscriptionPlan.find({ isActive: true })
//       .sort({ displayOrder: 1, 'price.amount': 1 });
    
//     if (plans.length === 0) {
//       await initializeDefaultPlans();
//       plans = await SubscriptionPlan.find({ isActive: true })
//         .sort({ displayOrder: 1, 'price.amount': 1 });
//     }
    
//     successResponse(res, plans.map(plan => ({
//       id: plan.planId,
//       name: plan.displayName,
//       price: plan.price.amount,
//       currency: plan.price.currency,
//       features: plan.features,
//       limits: plan.limits,
//       badgeText: plan.badgeText,
//       recommended: plan.recommended,
//       description: plan.description
//     })));
//   } catch (error) {
//     next(error);
//   }
// };

// export const getCurrentSubscription = async (req, res, next) => {
//   try {
//     // First check user's subscription from User model
//     const user = await User.findById(req.user.id);
    
//     if (!user) {
//       return errorResponse(res, 'User not found', 404);
//     }
    
//     // Get active subscription from Subscription collection
//     const subscription = await Subscription.findOne({
//       user: req.user.id,
//       status: 'active'
//     }).sort({ createdAt: -1 });
    
//     // If subscription exists, return it
//     if (subscription) {
//       const planDetails = await SubscriptionPlan.findOne({ planId: subscription.plan });
      
//       const subscriptionData = {
//         plan: subscription.plan,
//         status: subscription.status,
//         price: subscription.price,
//         billingCycle: subscription.billingCycle,
//         startedAt: subscription.createdAt,
//         expiresAt: subscription.expiresAt,
//         features: subscription.features || (planDetails?.features || [])
//       };
      
//       return successResponse(res, subscriptionData);
//     }
    
//     // If user has subscription in user model but no active subscription record
//     if (user.subscription && user.subscription.plan !== 'free') {
//       const planDetails = await SubscriptionPlan.findOne({ planId: user.subscription.plan });
      
//       const subscriptionData = {
//         plan: user.subscription.plan,
//         status: user.subscription.status || 'active',
//         price: { amount: 0, currency: 'INR' },
//         billingCycle: user.subscription.billingCycle || 'monthly',
//         startedAt: user.subscription.startedAt,
//         expiresAt: user.subscription.expiresAt,
//         features: planDetails?.features || []
//       };
      
//       return successResponse(res, subscriptionData);
//     }
    
//     // Default free plan
//     const freePlan = await SubscriptionPlan.findOne({ planId: 'free' });
    
//     successResponse(res, {
//       plan: 'free',
//       status: 'active',
//       price: { amount: 0, currency: 'INR' },
//       billingCycle: 'monthly',
//       startedAt: new Date(),
//       expiresAt: null,
//       features: freePlan?.features || ['Browse all content', 'Read public poems', 'Basic search']
//     });
//   } catch (error) {
//     console.error('Error in getCurrentSubscription:', error);
//     next(error);
//   }
// };

// export const subscribe = async (req, res, next) => {
//   try {
//     const { plan, billingCycle, paymentMethod, couponCode } = req.body;
    
//     let planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
    
//     if (!planDetails) {
//       await initializeDefaultPlans();
//       planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
      
//       if (!planDetails) {
//         return errorResponse(res, 'Invalid plan', 400);
//       }
//     }
    
//     const months = billingCycle === 'yearly' ? 12 : billingCycle === 'quarterly' ? 3 : 1;
//     let amount = planDetails.price.amount * months;
//     let discountAmount = 0;
    
//     // Apply coupon if provided
//     if (couponCode) {
//       const coupon = coupons.find(c => c.code === couponCode.toUpperCase());
//       if (coupon && coupon.isActive && (!coupon.validUntil || new Date(coupon.validUntil) > new Date())) {
//         if (coupon.discountType === 'percentage') {
//           discountAmount = amount * coupon.discountValue / 100;
//         } else {
//           discountAmount = coupon.discountValue;
//         }
//         amount = Math.max(0, amount - discountAmount);
//         coupon.usedCount++;
//       }
//     }
    
//     const expiresAt = (plan === 'free' || amount === 0) ? null : new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000);
//     const status = (plan === 'free' || amount === 0) ? 'active' : 'pending';
    
//     // Create subscription record
//     const subscription = await Subscription.create({
//       user: req.user.id,
//       plan,
//       status,
//       price: { 
//         amount: amount, 
//         currency: planDetails.price.currency, 
//         originalAmount: planDetails.price.amount * months 
//       },
//       billingCycle: billingCycle || 'monthly',
//       paymentMethod: paymentMethod || (plan === 'free' ? 'free' : 'pending'),
//       expiresAt,
//       features: planDetails.features,
//       discountApplied: discountAmount > 0 ? { amount: discountAmount, coupon: couponCode } : null
//     });
    
//     // Update user subscription
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': plan,
//       'subscription.startedAt': new Date(),
//       'subscription.expiresAt': expiresAt,
//       'subscription.status': status,
//       'subscription.billingCycle': billingCycle || 'monthly'
//     });
    
//     console.log(`✅ User ${req.user.id} subscribed to ${plan} plan. Status: ${status}`);
    
//     if (plan === 'free' || amount === 0) {
//       return successResponse(res, { subscription, plan: planDetails }, 'Free subscription activated', 201);
//     }
    
//     successResponse(res, { 
//       subscription, 
//       plan: planDetails,
//       requiresPayment: true,
//       discountApplied: discountAmount > 0 ? { amount: discountAmount, finalAmount: amount } : null
//     }, 'Subscription initiated', 201);
//   } catch (error) {
//     console.error('Subscribe error:', error);
//     next(error);
//   }
// };

// export const verifyPayment = async (req, res, next) => {
//   try {
//     const { subscriptionId, paymentId, orderId, signature } = req.body;
    
//     // Verify signature if provided (for Razorpay)
//     if (signature && orderId) {
//       const body = orderId + "|" + paymentId;
//       const expectedSignature = crypto
//         .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'test_secret')
//         .update(body.toString())
//         .digest('hex');
      
//       if (expectedSignature !== signature) {
//         return errorResponse(res, 'Invalid payment signature', 400);
//       }
//     }
    
//     const subscription = await Subscription.findByIdAndUpdate(
//       subscriptionId,
//       { status: 'active', paymentId, verifiedAt: new Date() },
//       { new: true }
//     );
    
//     if (!subscription) {
//       return errorResponse(res, 'Subscription not found', 404);
//     }
    
//     // Update user subscription
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': subscription.plan,
//       'subscription.status': 'active',
//       'subscription.expiresAt': subscription.expiresAt,
//       'subscription.billingCycle': subscription.billingCycle,
//       'subscription.lastPaymentId': paymentId
//     });
    
//     console.log(`✅ Payment verified for user ${req.user.id}. Plan: ${subscription.plan} is now ACTIVE`);
    
//     successResponse(res, subscription, 'Payment verified and subscription activated');
//   } catch (error) {
//     console.error('Verify payment error:', error);
//     next(error);
//   }
// };

// export const cancelSubscription = async (req, res, next) => {
//   try {
//     const subscription = await Subscription.findOneAndUpdate(
//       { user: req.user.id, status: 'active' },
//       { status: 'cancelled', cancelledAt: new Date() },
//       { new: true, sort: { createdAt: -1 } }
//     );
    
//     if (!subscription) {
//       return errorResponse(res, 'No active subscription found', 404);
//     }
    
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': 'free',
//       'subscription.status': 'cancelled'
//     });
    
//     successResponse(res, subscription, 'Subscription cancelled');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getBillingHistory = async (req, res, next) => {
//   try {
//     const history = await Subscription.find({ user: req.user.id })
//       .sort({ createdAt: -1 });
    
//     successResponse(res, history);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // INVOICE ROUTES
// // ============================================

// export const getInvoice = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const subscription = await Subscription.findById(id)
//       .populate('user', 'name email phone');
    
//     if (!subscription) {
//       return errorResponse(res, 'Invoice not found', 404);
//     }
    
//     if (subscription.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
//       return errorResponse(res, 'Unauthorized', 403);
//     }
    
//     const invoiceNumber = `INV-${subscription._id.toString().slice(-8).toUpperCase()}`;
//     const date = new Date(subscription.createdAt).toLocaleDateString('en-IN');
//     const dueDate = subscription.expiresAt ? new Date(subscription.expiresAt).toLocaleDateString('en-IN') : 'N/A';
//     const planName = `${subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} Plan`;
//     const billingText = `${subscription.billingCycle || 'Monthly'} Subscription`;
//     const subtotal = subscription.price.originalAmount || subscription.price.amount;
//     const discount = subscription.discountApplied?.amount || 0;
//     const finalAmount = subscription.price.amount;
//     const tax = finalAmount * 0.18;
//     const total = finalAmount + tax;
    
//     const invoiceData = {
//       id: subscription._id,
//       invoiceNumber,
//       date,
//       dueDate,
//       customer: {
//         name: subscription.user.name,
//         email: subscription.user.email,
//         phone: subscription.user.phone
//       },
//       items: [{
//         description: `${planName} - ${billingText}`,
//         quantity: 1,
//         unitPrice: subtotal,
//         discount,
//         total: finalAmount
//       }],
//       subtotal,
//       discount,
//       tax,
//       total,
//       currency: subscription.price.currency,
//       status: subscription.status === 'active' ? 'paid' : subscription.status,
//       paymentMethod: subscription.paymentMethod,
//       paymentId: subscription.paymentId
//     };
    
//     successResponse(res, invoiceData);
//   } catch (error) {
//     next(error);
//   }
// };

// export const downloadInvoice = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const subscription = await Subscription.findById(id)
//       .populate('user', 'name email phone');
    
//     if (!subscription) {
//       return errorResponse(res, 'Invoice not found', 404);
//     }
    
//     if (subscription.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
//       return errorResponse(res, 'Unauthorized', 403);
//     }
    
//     const doc = new PDFDocument({ margin: 50, size: 'A4' });
    
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', `attachment; filename=invoice_${subscription._id}.pdf`);
    
//     doc.pipe(res);
    
//     const invoiceNumber = `INV-${subscription._id.toString().slice(-8).toUpperCase()}`;
//     const date = new Date(subscription.createdAt).toLocaleDateString('en-IN');
//     const dueDate = subscription.expiresAt ? new Date(subscription.expiresAt).toLocaleDateString('en-IN') : 'N/A';
//     const planName = `${subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} Plan`;
//     const billingText = `${subscription.billingCycle || 'Monthly'} Subscription`;
//     const subtotal = subscription.price.originalAmount || subscription.price.amount;
//     const discount = subscription.discountApplied?.amount || 0;
//     const finalAmount = subscription.price.amount;
//     const tax = finalAmount * 0.18;
//     const total = finalAmount + tax;
    
//     doc.fontSize(24)
//       .font('Helvetica-Bold')
//       .fillColor('#8B5CF6')
//       .text('Zauq App', { align: 'center' });
    
//     doc.fontSize(10)
//       .font('Helvetica')
//       .fillColor('#666666')
//       .text('Literary Platform', { align: 'center' })
//       .moveDown(0.5);
    
//     doc.moveTo(50, doc.y)
//       .lineTo(550, doc.y)
//       .strokeColor('#cccccc')
//       .stroke();
    
//     doc.moveDown(1);
    
//     doc.fontSize(18)
//       .font('Helvetica-Bold')
//       .fillColor('#333333')
//       .text('INVOICE', { align: 'center' })
//       .moveDown(0.5);
    
//     doc.fontSize(10)
//       .font('Helvetica')
//       .fillColor('#666666')
//       .text(`Invoice Number: ${invoiceNumber}`, { align: 'right' })
//       .text(`Date: ${date}`, { align: 'right' })
//       .text(`Due Date: ${dueDate}`, { align: 'right' })
//       .moveDown(1);
    
//     doc.fontSize(12)
//       .font('Helvetica-Bold')
//       .fillColor('#333333')
//       .text('Bill To:', { underline: true })
//       .moveDown(0.3);
    
//     doc.fontSize(10)
//       .font('Helvetica')
//       .fillColor('#666666')
//       .text(subscription.user.name || 'Customer')
//       .text(subscription.user.email || '')
//       .text(subscription.user.phone || '')
//       .moveDown(1);
    
//     let y = doc.y;
//     const col1 = 50;
//     const col2 = 250;
//     const col3 = 400;
//     const col4 = 450;
//     const col5 = 500;
    
//     doc.fontSize(10)
//       .font('Helvetica-Bold')
//       .fillColor('#333333')
//       .text('Description', col1, y)
//       .text('Qty', col3, y)
//       .text('Unit Price', col4, y)
//       .text('Total', col5, y);
    
//     doc.moveTo(50, y + 15)
//       .lineTo(550, y + 15)
//       .strokeColor('#cccccc')
//       .stroke();
    
//     y += 25;
    
//     doc.fontSize(10)
//       .font('Helvetica')
//       .fillColor('#333333')
//       .text(`${planName} - ${billingText}`, col1, y, { width: 190 })
//       .text('1', col3, y)
//       .text(`${subscription.price.currency} ${subtotal}`, col4, y)
//       .text(`${subscription.price.currency} ${subtotal}`, col5, y);
    
//     y += 25;
    
//     if (discount > 0) {
//       doc.fillColor('#10B981')
//         .text('Discount Applied', col1, y)
//         .text('-', col3, y)
//         .text(`-${subscription.price.currency} ${discount}`, col4, y)
//         .text(`-${subscription.price.currency} ${discount}`, col5, y);
//       y += 25;
//     }
    
//     doc.fillColor('#666666')
//       .text('Tax (18% GST)', col1, y)
//       .text('', col3, y)
//       .text(`${subscription.price.currency} ${tax.toFixed(2)}`, col4, y)
//       .text(`${subscription.price.currency} ${tax.toFixed(2)}`, col5, y);
    
//     y += 25;
    
//     doc.moveTo(50, y - 5)
//       .lineTo(550, y - 5)
//       .strokeColor('#cccccc')
//       .stroke();
    
//     doc.fontSize(12)
//       .font('Helvetica-Bold')
//       .fillColor('#333333')
//       .text('Total', col1, y)
//       .text('', col3, y)
//       .text('', col4, y)
//       .text(`${subscription.price.currency} ${total.toFixed(2)}`, col5, y);
    
//     y += 30;
    
//     const statusColor = subscription.status === 'active' ? '#10B981' : '#EF4444';
//     const statusText = subscription.status === 'active' ? 'PAID' : subscription.status.toUpperCase();
    
//     doc.fontSize(12)
//       .font('Helvetica-Bold')
//       .fillColor(statusColor)
//       .text(`Payment Status: ${statusText}`, 50, y);
    
//     y += 20;
    
//     if (subscription.paymentMethod && subscription.paymentMethod !== 'free') {
//       doc.fontSize(10)
//         .font('Helvetica')
//         .fillColor('#666666')
//         .text(`Payment Method: ${subscription.paymentMethod.toUpperCase()}`, 50, y);
//       y += 15;
//     }
    
//     if (subscription.paymentId) {
//       doc.text(`Transaction ID: ${subscription.paymentId}`, 50, y);
//       y += 15;
//     }
    
//     y += 20;
    
//     doc.fontSize(9)
//       .fillColor('#999999')
//       .text('Thank you for your business!', 50, 750, { align: 'center' })
//       .text('For any questions, contact support@zauqapp.com', 50, 765, { align: 'center' });
    
//     doc.end();
    
//   } catch (error) {
//     console.error('Error generating invoice PDF:', error);
//     errorResponse(res, 'Failed to generate invoice PDF', 500);
//   }
// };

// export const sendInvoiceEmail = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     successResponse(res, null, 'Invoice email sent successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // PAYMENT METHODS
// // ============================================

// export const getPaymentMethods = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
//     const methods = user.paymentMethods || [];
    
//     const maskedMethods = methods.map(method => ({
//       _id: method._id,
//       cardNumber: `•••• •••• •••• ${method.lastFourDigits || '****'}`,
//       cardHolder: method.cardHolder,
//       expiryMonth: method.expiryMonth,
//       expiryYear: method.expiryYear,
//       cardBrand: method.cardBrand,
//       isDefault: method.isDefault
//     }));
    
//     successResponse(res, maskedMethods);
//   } catch (error) {
//     next(error);
//   }
// };

// export const addPaymentMethod = async (req, res, next) => {
//   try {
//     const { cardNumber, cardHolder, expiryMonth, expiryYear } = req.body;
    
//     if (!cardNumber || !cardHolder) {
//       return errorResponse(res, 'Card number and holder name required', 400);
//     }
    
//     const user = await User.findById(req.user.id);
//     if (!user.paymentMethods) user.paymentMethods = [];
    
//     const lastFourDigits = cardNumber.replace(/\s/g, '').slice(-4);
//     const newMethod = {
//       _id: new mongoose.Types.ObjectId(),
//       cardNumber: cardNumber.replace(/\s/g, ''),
//       cardHolder: cardHolder.toUpperCase(),
//       expiryMonth,
//       expiryYear,
//       lastFourDigits,
//       cardBrand: cardNumber.startsWith('4') ? 'visa' : 'mastercard',
//       isDefault: user.paymentMethods.length === 0,
//       createdAt: new Date()
//     };
    
//     user.paymentMethods.push(newMethod);
//     await user.save();
    
//     successResponse(res, {
//       _id: newMethod._id,
//       cardNumber: `•••• •••• •••• ${lastFourDigits}`,
//       cardHolder: newMethod.cardHolder,
//       expiryMonth: newMethod.expiryMonth,
//       expiryYear: newMethod.expiryYear,
//       isDefault: newMethod.isDefault
//     }, 'Payment method added');
//   } catch (error) {
//     next(error);
//   }
// };

// export const removePaymentMethod = async (req, res, next) => {
//   try {
//     const { methodId } = req.params;
//     const user = await User.findById(req.user.id);
    
//     if (!user.paymentMethods) {
//       return errorResponse(res, 'No payment methods found', 404);
//     }
    
//     const methodIndex = user.paymentMethods.findIndex(m => m._id.toString() === methodId);
//     if (methodIndex === -1) {
//       return errorResponse(res, 'Payment method not found', 404);
//     }
    
//     if (user.paymentMethods.length === 1) {
//       return errorResponse(res, 'Cannot remove the only payment method', 400);
//     }
    
//     const wasDefault = user.paymentMethods[methodIndex].isDefault;
//     user.paymentMethods.splice(methodIndex, 1);
    
//     if (wasDefault && user.paymentMethods.length > 0) {
//       user.paymentMethods[0].isDefault = true;
//     }
    
//     await user.save();
//     successResponse(res, null, 'Payment method removed');
//   } catch (error) {
//     next(error);
//   }
// };

// export const setDefaultPaymentMethod = async (req, res, next) => {
//   try {
//     const { methodId } = req.params;
//     const user = await User.findById(req.user.id);
    
//     if (!user.paymentMethods) {
//       return errorResponse(res, 'No payment methods found', 404);
//     }
    
//     user.paymentMethods.forEach(method => {
//       method.isDefault = method._id.toString() === methodId;
//     });
    
//     await user.save();
//     successResponse(res, null, 'Default payment method updated');
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // COUPON ROUTES
// // ============================================

// export const validateCoupon = async (req, res, next) => {
//   try {
//     const { code } = req.params;
//     const { plan, amount } = req.query;
    
//     const coupon = coupons.find(c => c.code === code.toUpperCase());
    
//     if (!coupon) {
//       return errorResponse(res, 'Invalid coupon code', 404);
//     }
    
//     if (!coupon.isActive) {
//       return errorResponse(res, 'Coupon is not active', 400);
//     }
    
//     if (coupon.validUntil && new Date(coupon.validUntil) < new Date()) {
//       return errorResponse(res, 'Coupon has expired', 400);
//     }
    
//     if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
//       return errorResponse(res, 'Coupon usage limit exceeded', 400);
//     }
    
//     if (plan && coupon.applicablePlans && !coupon.applicablePlans.includes(plan)) {
//       return errorResponse(res, `Coupon not applicable for ${plan} plan`, 400);
//     }
    
//     const orderAmount = parseFloat(amount);
//     if (coupon.minAmount && orderAmount < coupon.minAmount) {
//       return errorResponse(res, `Minimum order amount of ${coupon.minAmount} required`, 400);
//     }
    
//     let discountAmount = 0;
//     if (coupon.discountType === 'percentage') {
//       discountAmount = orderAmount * coupon.discountValue / 100;
//     } else {
//       discountAmount = coupon.discountValue;
//     }
    
//     const finalAmount = Math.max(0, orderAmount - discountAmount);
    
//     successResponse(res, {
//       code: coupon.code,
//       discountType: coupon.discountType,
//       discountValue: coupon.discountValue,
//       discountAmount,
//       finalAmount,
//       savedAmount: orderAmount - finalAmount
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const applyCoupon = async (req, res, next) => {
//   try {
//     const { code, plan, amount } = req.body;
    
//     const coupon = coupons.find(c => c.code === code.toUpperCase());
    
//     if (!coupon) {
//       return errorResponse(res, 'Invalid coupon code', 404);
//     }
    
//     if (!coupon.isActive) {
//       return errorResponse(res, 'Coupon is not active', 400);
//     }
    
//     if (coupon.validUntil && new Date(coupon.validUntil) < new Date()) {
//       return errorResponse(res, 'Coupon has expired', 400);
//     }
    
//     if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
//       return errorResponse(res, 'Coupon usage limit exceeded', 400);
//     }
    
//     if (plan && coupon.applicablePlans && !coupon.applicablePlans.includes(plan)) {
//       return errorResponse(res, `Coupon not applicable for ${plan} plan`, 400);
//     }
    
//     const orderAmount = parseFloat(amount);
//     if (coupon.minAmount && orderAmount < coupon.minAmount) {
//       return errorResponse(res, `Minimum order amount of ${coupon.minAmount} required`, 400);
//     }
    
//     let discountAmount = 0;
//     if (coupon.discountType === 'percentage') {
//       discountAmount = orderAmount * coupon.discountValue / 100;
//     } else {
//       discountAmount = coupon.discountValue;
//     }
    
//     const finalAmount = Math.max(0, orderAmount - discountAmount);
    
//     coupon.usedCount++;
    
//     successResponse(res, {
//       coupon: {
//         code: coupon.code,
//         discountType: coupon.discountType,
//         discountValue: coupon.discountValue,
//         discountAmount,
//         finalAmount,
//         savedAmount: orderAmount - finalAmount
//       },
//       applied: true
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // ADMIN CMS ROUTES
// // ============================================

// export const getAllPlansCMS = async (req, res, next) => {
//   try {
//     const plans = await SubscriptionPlan.find().sort({ displayOrder: 1, 'price.amount': 1 });
    
//     const plansWithStats = await Promise.all(plans.map(async (plan) => {
//       const subscriberCount = await Subscription.countDocuments({ 
//         plan: plan.planId, 
//         status: 'active' 
//       });
      
//       const planObj = plan.toObject();
//       planObj.subscriberCount = subscriberCount;
      
//       return planObj;
//     }));
    
//     successResponse(res, plansWithStats);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getPlanByIdCMS = async (req, res, next) => {
//   try {
//     const plan = await SubscriptionPlan.findById(req.params.id);
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }
//     successResponse(res, plan);
//   } catch (error) {
//     next(error);
//   }
// };

// export const createPlanCMS = async (req, res, next) => {
//   try {
//     const {
//       planId,
//       name,
//       displayName,
//       description,
//       price,
//       billingCycle,
//       features,
//       limits,
//       isActive,
//       displayOrder,
//       badgeText,
//       recommended
//     } = req.body;
    
//     const validPlans = ['free', 'basic', 'premium', 'pro'];
//     if (!validPlans.includes(planId)) {
//       return errorResponse(res, 'Invalid plan ID', 400);
//     }
    
//     const existingPlan = await SubscriptionPlan.findOne({ planId });
//     if (existingPlan) {
//       return errorResponse(res, 'Plan ID already exists', 400);
//     }
    
//     const plan = await SubscriptionPlan.create({
//       planId,
//       name: name || planId,
//       displayName,
//       description: description || '',
//       price: { amount: price?.amount || 0, currency: price?.currency || 'INR' },
//       billingCycle: billingCycle || 'monthly',
//       features: features || [],
//       limits: {
//         poemsPerDay: limits?.poemsPerDay || null,
//         ebooksPerMonth: limits?.ebooksPerMonth || null,
//         audiobooksPerMonth: limits?.audiobooksPerMonth || null,
//         unlimited: limits?.unlimited || false,
//         creator: limits?.creator || false
//       },
//       isActive: isActive !== undefined ? isActive : true,
//       displayOrder: displayOrder || 0,
//       badgeText: badgeText || '',
//       recommended: recommended || false
//     });
    
//     successResponse(res, plan, 'Plan created successfully', 201);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updatePlanCMS = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;
    
//     delete updateData.planId;
//     delete updateData._id;
    
//     const plan = await SubscriptionPlan.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true, runValidators: true }
//     );
    
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }
    
//     successResponse(res, plan, 'Plan updated successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const deletePlanCMS = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { permanent } = req.query;
    
//     const plan = await SubscriptionPlan.findById(id);
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }
    
//     const activeSubscriptions = await Subscription.countDocuments({
//       plan: plan.planId,
//       status: 'active'
//     });
    
//     if (permanent === 'true') {
//       if (activeSubscriptions > 0) {
//         return errorResponse(res, `Cannot delete plan with ${activeSubscriptions} active subscriptions`, 400);
//       }
//       await SubscriptionPlan.findByIdAndDelete(id);
//       successResponse(res, null, 'Plan permanently deleted');
//     } else {
//       plan.isActive = false;
//       await plan.save();
//       successResponse(res, plan, 'Plan deactivated');
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// export const togglePlanStatusCMS = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const plan = await SubscriptionPlan.findById(id);
    
//     if (!plan) {
//       return errorResponse(res, 'Plan not found', 404);
//     }
    
//     plan.isActive = !plan.isActive;
//     await plan.save();
    
//     successResponse(res, plan, `Plan ${plan.isActive ? 'activated' : 'deactivated'}`);
//   } catch (error) {
//     next(error);
//   }
// };

// export const reorderPlansCMS = async (req, res, next) => {
//   try {
//     const { orders } = req.body;
    
//     const updatePromises = orders.map(({ id, order }) =>
//       SubscriptionPlan.findByIdAndUpdate(id, { displayOrder: order }, { new: true })
//     );
    
//     await Promise.all(updatePromises);
//     successResponse(res, null, 'Plans reordered successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriptionStatsCMS = async (req, res, next) => {
//   try {
//     const totalPlans = await SubscriptionPlan.countDocuments();
//     const activePlans = await SubscriptionPlan.countDocuments({ isActive: true });
//     const totalUsers = await User.countDocuments();
//     const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });
    
//     const revenueStats = await Subscription.aggregate([
//       { $match: { status: 'active', 'price.amount': { $gt: 0 } } },
//       { $group: { _id: null, totalMonthlyRevenue: { $sum: '$price.amount' }, averageSubscriptionValue: { $avg: '$price.amount' } } }
//     ]);
    
//     const planDistribution = await Subscription.aggregate([
//       { $match: { status: 'active' } },
//       { $group: { _id: '$plan', count: { $sum: 1 } } }
//     ]);
    
//     successResponse(res, {
//       totalPlans,
//       activePlans,
//       totalUsers,
//       activeSubscriptions,
//       revenue: revenueStats[0] || { totalMonthlyRevenue: 0, averageSubscriptionValue: 0 },
//       planDistribution
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // SUBSCRIBERS MANAGEMENT - FIXED
// // ============================================

// export const getAllSubscribers = async (req, res, next) => {
//   try {
//     const { page = 1, limit = 20, status, plan, search } = req.query;
    
//     let query = {};
//     if (status && status !== 'all') {
//       query.status = status;
//     }
//     if (plan && plan !== 'all') {
//       query.plan = plan;
//     }
    
//     // Get all subscriptions with user details
//     const subscriptions = await Subscription.find(query)
//       .populate('user', 'name email avatar phone createdAt')
//       .sort({ createdAt: -1 });
    
//     // Apply search filter if provided
//     let filteredSubscriptions = subscriptions;
//     if (search) {
//       filteredSubscriptions = subscriptions.filter(sub => 
//         sub.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
//         sub.user?.email?.toLowerCase().includes(search.toLowerCase())
//       );
//     }
    
//     // Format subscribers data
//     const formattedSubscribers = filteredSubscriptions.map(sub => ({
//       _id: sub._id,
//       user: {
//         _id: sub.user?._id,
//         name: sub.user?.name || 'Unknown User',
//         email: sub.user?.email || 'No email',
//         avatar: sub.user?.avatar,
//         phone: sub.user?.phone,
//         createdAt: sub.user?.createdAt
//       },
//       plan: sub.plan,
//       status: sub.status,
//       price: sub.price,
//       billingCycle: sub.billingCycle,
//       paymentMethod: sub.paymentMethod,
//       paymentId: sub.paymentId,
//       createdAt: sub.createdAt,
//       expiresAt: sub.expiresAt,
//       cancelledAt: sub.cancelledAt,
//       features: sub.features || []
//     }));
    
//     // Calculate pagination
//     const start = (parseInt(page) - 1) * parseInt(limit);
//     const paginatedSubscribers = formattedSubscribers.slice(start, start + parseInt(limit));
    
//     successResponse(res, {
//       subscribers: paginatedSubscribers,
//       pagination: {
//         page: parseInt(page),
//         limit: parseInt(limit),
//         total: filteredSubscriptions.length,
//         totalPages: Math.ceil(filteredSubscriptions.length / limit)
//       }
//     });
//   } catch (error) {
//     console.error('Error in getAllSubscribers:', error);
//     next(error);
//   }
// };

// export const getSubscriberById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const subscription = await Subscription.findById(id)
//       .populate('user', 'name email avatar phone createdAt');
    
//     if (!subscription) {
//       return errorResponse(res, 'Subscriber not found', 404);
//     }
    
//     // Get user's subscription history
//     const subscriptionHistory = await Subscription.find({ user: subscription.user._id })
//       .sort({ createdAt: -1 });
    
//     const subscriberData = {
//       ...subscription.toObject(),
//       history: subscriptionHistory,
//       totalSubscriptions: subscriptionHistory.length
//     };
    
//     successResponse(res, subscriberData);
//   } catch (error) {
//     console.error('Error in getSubscriberById:', error);
//     next(error);
//   }
// };

// // ============================================
// // TRANSACTIONS MANAGEMENT - FIXED
// // ============================================

// export const getAllTransactions = async (req, res, next) => {
//   try {
//     const { page = 1, limit = 20, status, type, startDate, endDate, search } = req.query;
    
//     let query = {};
    
//     // Apply status filter
//     if (status && status !== 'all') {
//       if (status === 'success') {
//         query.status = 'active';
//       } else {
//         query.status = status;
//       }
//     }
    
//     // Apply type filter
//     if (type && type !== 'all') {
//       query.type = type;
//     }
    
//     // Date range filter
//     if (startDate || endDate) {
//       query.createdAt = {};
//       if (startDate) {
//         query.createdAt.$gte = new Date(startDate);
//       }
//       if (endDate) {
//         query.createdAt.$lte = new Date(endDate);
//       }
//     }
    
//     // Get all subscriptions as transactions
//     let subscriptions = await Subscription.find(query)
//       .populate('user', 'name email phone')
//       .sort({ createdAt: -1 });
    
//     // Transform subscriptions to transaction format
//     let transactions = subscriptions.map(sub => ({
//       _id: sub._id,
//       transactionId: sub.paymentId || `TXN_${sub._id.toString().slice(-8).toUpperCase()}`,
//       user: sub.user,
//       type: sub.type || 'subscription',
//       amount: sub.price?.amount || 0,
//       originalAmount: sub.price?.originalAmount || sub.price?.amount || 0,
//       discountAmount: sub.discountApplied?.amount || 0,
//       currency: sub.price?.currency || 'INR',
//       status: sub.status === 'active' ? 'success' : sub.status === 'cancelled' ? 'failed' : sub.status,
//       createdAt: sub.createdAt,
//       updatedAt: sub.updatedAt,
//       paymentMethod: sub.paymentMethod || 'unknown',
//       plan: sub.plan,
//       billingCycle: sub.billingCycle,
//       subscriptionId: sub._id,
//       paymentId: sub.paymentId,
//       orderId: sub.orderId,
//       description: `${sub.plan} plan - ${sub.billingCycle} subscription`
//     }));
    
//     // Apply search filter
//     if (search) {
//       transactions = transactions.filter(t => 
//         t.transactionId?.toLowerCase().includes(search.toLowerCase()) ||
//         t.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
//         t.user?.email?.toLowerCase().includes(search.toLowerCase())
//       );
//     }
    
//     // Apply status filter again
//     if (status && status !== 'all') {
//       transactions = transactions.filter(t => t.status === status);
//     }
    
//     // Apply type filter again
//     if (type && type !== 'all') {
//       transactions = transactions.filter(t => t.type === type);
//     }
    
//     // Calculate pagination
//     const start = (parseInt(page) - 1) * parseInt(limit);
//     const paginatedTransactions = transactions.slice(start, start + parseInt(limit));
    
//     successResponse(res, {
//       transactions: paginatedTransactions,
//       pagination: {
//         page: parseInt(page),
//         limit: parseInt(limit),
//         total: transactions.length,
//         totalPages: Math.ceil(transactions.length / limit)
//       }
//     });
//   } catch (error) {
//     console.error('Error in getAllTransactions:', error);
//     next(error);
//   }
// };

// export const getTransactionById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
    
//     const subscription = await Subscription.findById(id)
//       .populate('user', 'name email phone');
    
//     if (!subscription) {
//       return errorResponse(res, 'Transaction not found', 404);
//     }
    
//     const transaction = {
//       _id: subscription._id,
//       transactionId: subscription.paymentId || `TXN_${subscription._id.toString().slice(-8).toUpperCase()}`,
//       user: subscription.user,
//       type: subscription.type || 'subscription',
//       amount: subscription.price?.amount || 0,
//       originalAmount: subscription.price?.originalAmount || subscription.price?.amount || 0,
//       discountAmount: subscription.discountApplied?.amount || 0,
//       currency: subscription.price?.currency || 'INR',
//       status: subscription.status === 'active' ? 'success' : subscription.status,
//       createdAt: subscription.createdAt,
//       updatedAt: subscription.updatedAt,
//       paymentMethod: subscription.paymentMethod || 'unknown',
//       plan: subscription.plan,
//       billingCycle: subscription.billingCycle,
//       subscriptionId: subscription._id,
//       paymentId: subscription.paymentId,
//       orderId: subscription.orderId,
//       description: `${subscription.plan} plan - ${subscription.billingCycle} subscription`
//     };
    
//     successResponse(res, transaction);
//   } catch (error) {
//     console.error('Error in getTransactionById:', error);
//     next(error);
//   }
// };

// export const getTransactionStats = async (req, res, next) => {
//   try {
//     // Get date ranges
//     const now = new Date();
//     const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//     const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
//     const startOfYear = new Date(now.getFullYear(), 0, 1);
    
//     let stats = {
//       totalRevenue: 0,
//       todayRevenue: 0,
//       monthlyRevenue: 0,
//       yearlyRevenue: 0,
//       totalTransactions: 0,
//       todayTransactions: 0,
//       monthlyTransactions: 0,
//       yearlyTransactions: 0,
//       successfulTransactions: 0,
//       failedTransactions: 0,
//       pendingTransactions: 0,
//       averageTransactionValue: 0,
//       revenueByPlan: {},
//       transactionsByStatus: {},
//       transactionsByType: {},
//       recentTransactions: [],
//       dailyStats: []
//     };
    
//     // Get all subscriptions for revenue calculation
//     const allSubscriptions = await Subscription.find({})
//       .populate('user', 'name email');
    
//     allSubscriptions.forEach(sub => {
//       const amount = sub.price?.amount || 0;
//       const createdAt = new Date(sub.createdAt);
//       const status = sub.status === 'active' ? 'success' : sub.status;
      
//       // Total revenue (only successful/active)
//       if (status === 'success') {
//         stats.totalRevenue += amount;
//         stats.totalTransactions++;
//         stats.successfulTransactions++;
        
//         // Today's revenue
//         if (createdAt >= startOfToday) {
//           stats.todayRevenue += amount;
//           stats.todayTransactions++;
//         }
        
//         // Monthly revenue
//         if (createdAt >= startOfMonth) {
//           stats.monthlyRevenue += amount;
//           stats.monthlyTransactions++;
//         }
        
//         // Yearly revenue
//         if (createdAt >= startOfYear) {
//           stats.yearlyRevenue += amount;
//           stats.yearlyTransactions++;
//         }
        
//         // Revenue by plan
//         const plan = sub.plan || 'unknown';
//         if (!stats.revenueByPlan[plan]) {
//           stats.revenueByPlan[plan] = 0;
//         }
//         stats.revenueByPlan[plan] += amount;
//       } else if (status === 'pending') {
//         stats.pendingTransactions++;
//       } else if (status === 'cancelled' || status === 'expired') {
//         stats.failedTransactions++;
//       }
      
//       // Transaction status counts
//       if (!stats.transactionsByStatus[status]) {
//         stats.transactionsByStatus[status] = 0;
//       }
//       stats.transactionsByStatus[status]++;
      
//       // Transaction type counts
//       const type = sub.type || 'subscription';
//       if (!stats.transactionsByType[type]) {
//         stats.transactionsByType[type] = 0;
//       }
//       stats.transactionsByType[type]++;
//     });
    
//     // Calculate average transaction value
//     stats.averageTransactionValue = stats.totalTransactions > 0 
//       ? stats.totalRevenue / stats.totalTransactions 
//       : 0;
    
//     // Get recent transactions
//     stats.recentTransactions = allSubscriptions.slice(0, 10).map(sub => ({
//       _id: sub._id,
//       transactionId: sub.paymentId || `TXN_${sub._id}`,
//       user: sub.user,
//       amount: sub.price?.amount || 0,
//       currency: sub.price?.currency || 'INR',
//       status: sub.status === 'active' ? 'success' : sub.status,
//       createdAt: sub.createdAt,
//       plan: sub.plan
//     }));
    
//     // Get daily revenue for chart (last 30 days)
//     const last30Days = [];
//     for (let i = 29; i >= 0; i--) {
//       const date = new Date();
//       date.setDate(date.getDate() - i);
//       date.setHours(0, 0, 0, 0);
      
//       const nextDate = new Date(date);
//       nextDate.setDate(nextDate.getDate() + 1);
      
//       const dailyTransactions = allSubscriptions.filter(sub => {
//         const createdAt = new Date(sub.createdAt);
//         return createdAt >= date && createdAt < nextDate;
//       });
      
//       const dailyRevenue = dailyTransactions
//         .filter(sub => sub.status === 'active')
//         .reduce((sum, sub) => sum + (sub.price?.amount || 0), 0);
      
//       last30Days.push({
//         date: date.toISOString().split('T')[0],
//         revenue: dailyRevenue,
//         transactions: dailyTransactions.length,
//         successful: dailyTransactions.filter(t => t.status === 'active').length
//       });
//     }
    
//     stats.dailyStats = last30Days;
    
//     successResponse(res, stats);
//   } catch (error) {
//     console.error('Error in getTransactionStats:', error);
//     next(error);
//   }
// };

// // Initialize default plans when server starts
// initializeDefaultPlans().catch(console.error);























// // server/controllers/subscription.controller.js
// import { Subscription, SubscriptionPlan } from '../models/Subscription.js';
// import User from '../models/User.js';
// import { successResponse, errorResponse } from '../utils/response.js';
// import crypto from 'crypto';
// import mongoose from 'mongoose';
// import PDFDocument from 'pdfkit';
// import Razorpay from 'razorpay';
// import Stripe from 'stripe';

// // Initialize Razorpay
// let razorpayInstance = null;

// const getRazorpayInstance = () => {
//   if (!razorpayInstance) {
//     if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//       console.warn('⚠️ Razorpay keys not configured. Payment features will not work.');
//       return null;
//     }
//     razorpayInstance = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_KEY_SECRET
//     });
//   }
//   return razorpayInstance;
// };

// // Initialize Stripe
// let stripeInstance = null;

// const getStripeInstance = () => {
//   if (!stripeInstance) {
//     if (!process.env.STRIPE_SECRET_KEY) {
//       console.warn('⚠️ Stripe keys not configured. Payment features will not work.');
//       return null;
//     }
//     stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
//   }
//   return stripeInstance;
// };

// // Default plans (fallback if database is empty)
// const defaultPlans = [
//   {
//     planId: 'free',
//     name: 'free',
//     displayName: 'Free',
//     description: 'Perfect for getting started',
//     price: { amount: 0, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       'Browse all content',
//       'Read public poems',
//       'Basic search',
//       '50 poems/day'
//     ],
//     limits: {
//       poemsPerDay: 50,
//       ebooksPerMonth: 2,
//       audiobooksPerMonth: 5,
//       unlimited: false,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 0,
//     badgeText: '',
//     recommended: false
//   },
//   {
//     planId: 'basic',
//     name: 'basic',
//     displayName: 'Basic',
//     description: 'Great for regular readers',
//     price: { amount: 99, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       'All free features',
//       'Unlimited poem reading',
//       'Download 5 ebooks/month',
//       'Basic audio streaming'
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: 5,
//       audiobooksPerMonth: 3,
//       unlimited: false,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 1,
//     badgeText: 'Popular',
//     recommended: true
//   },
//   {
//     planId: 'premium',
//     name: 'premium',
//     displayName: 'Premium',
//     description: 'For serious literature enthusiasts',
//     price: { amount: 199, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       'All Basic features',
//       'Unlimited downloads',
//       'HD audio streaming',
//       'Ad-free experience',
//       'AI explanations'
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: null,
//       audiobooksPerMonth: null,
//       unlimited: true,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 2,
//     badgeText: 'Best Value',
//     recommended: true
//   },
//   {
//     planId: 'pro',
//     name: 'pro',
//     displayName: 'Pro',
//     description: 'For creators and power users',
//     price: { amount: 499, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       'All Premium features',
//       'Creator tools',
//       'Priority support',
//       'Analytics dashboard',
//       'Early access'
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: null,
//       audiobooksPerMonth: null,
//       unlimited: true,
//       creator: true
//     },
//     isActive: true,
//     displayOrder: 3,
//     badgeText: 'Creator',
//     recommended: false
//   }
// ];

// // Coupons store
// let coupons = [
//   {
//     code: 'WELCOME10',
//     discountType: 'percentage',
//     discountValue: 10,
//     validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
//     usageLimit: 100,
//     usedCount: 0,
//     minAmount: 0,
//     applicablePlans: ['basic', 'premium', 'pro'],
//     isActive: true
//   },
//   {
//     code: 'SAVE20',
//     discountType: 'percentage',
//     discountValue: 20,
//     validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
//     usageLimit: 50,
//     usedCount: 0,
//     minAmount: 500,
//     applicablePlans: ['premium', 'pro'],
//     isActive: true
//   },
//   {
//     code: 'FLAT100',
//     discountType: 'fixed',
//     discountValue: 100,
//     validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
//     usageLimit: 30,
//     usedCount: 0,
//     minAmount: 300,
//     applicablePlans: ['basic', 'premium', 'pro'],
//     isActive: true
//   }
// ];

// // Initialize default plans
// const initializeDefaultPlans = async () => {
//   try {
//     for (const planData of defaultPlans) {
//       const existingPlan = await SubscriptionPlan.findOne({ planId: planData.planId });
//       if (!existingPlan) {
//         await SubscriptionPlan.create(planData);
//         console.log(`✅ Created default plan: ${planData.planId}`);
//       }
//     }
//     console.log('✅ Default plans initialized');
//   } catch (error) {
//     console.error('❌ Error initializing plans:', error.message);
//   }
// };

// // ============================================
// // RAZORPAY PAYMENT ROUTES
// // ============================================

// export const createRazorpayOrder = async (req, res) => {
//   try {
//     const { planId, planName, amount, currency = 'INR' } = req.body;
    
//     console.log('📦 Creating Razorpay order:', { planId, planName, amount, currency });
    
//     // Validate input
//     if (!planId || !amount || amount <= 0) {
//       return res.status(400).json({
//         success: false,
//         error: 'Invalid plan or amount'
//       });
//     }
    
//     const razorpay = getRazorpayInstance();
    
//     if (!razorpay) {
//       return res.status(500).json({
//         success: false,
//         error: 'Payment gateway not configured. Please contact support.'
//       });
//     }
    
//     // Convert amount to paise (smallest currency unit)
//     const amountInPaise = Math.round(amount * 100);
    
//     const options = {
//       amount: amountInPaise,
//       currency: currency.toUpperCase(),
//       receipt: `receipt_${planId}_${Date.now()}`,
//       payment_capture: 1,
//       notes: {
//         planId: planId,
//         planName: planName,
//         userId: req.user?.id || 'guest'
//       }
//     };
    
//     console.log('📝 Razorpay order options:', options);
    
//     const order = await razorpay.orders.create(options);
    
//     console.log('✅ Razorpay order created:', order.id);
    
//     return res.status(200).json({
//       success: true,
//       orderId: order.id,
//       amount: order.amount,
//       currency: order.currency,
//       keyId: process.env.RAZORPAY_KEY_ID
//     });
    
//   } catch (error) {
//     console.error('❌ Razorpay order creation error:', error);
//     return res.status(500).json({
//       success: false,
//       error: error.message || 'Failed to create payment order',
//       details: process.env.NODE_ENV === 'development' ? error.stack : undefined
//     });
//   }
// };

// export const verifyRazorpayPayment = async (req, res) => {
//   try {
//     const { orderId, paymentId, signature, planId } = req.body;
    
//     console.log('🔐 Verifying Razorpay payment:', { orderId, paymentId, planId });
    
//     // Validate input
//     if (!orderId || !paymentId || !signature) {
//       return res.status(400).json({
//         success: false,
//         error: 'Missing payment verification details'
//       });
//     }
    
//     // Verify signature
//     const body = orderId + "|" + paymentId;
//     const expectedSignature = crypto
//       .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(body.toString())
//       .digest('hex');
    
//     if (expectedSignature !== signature) {
//       console.error('❌ Invalid payment signature');
//       return res.status(400).json({
//         success: false,
//         error: 'Invalid payment signature'
//       });
//     }
    
//     console.log('✅ Payment signature verified');
    
//     // Activate subscription
//     const result = await activateSubscription(req.user.id, planId, paymentId, orderId, 'razorpay');
    
//     return res.status(200).json({
//       success: true,
//       message: 'Payment verified and subscription activated',
//       subscription: result
//     });
    
//   } catch (error) {
//     console.error('❌ Payment verification error:', error);
//     return res.status(500).json({
//       success: false,
//       error: error.message || 'Payment verification failed'
//     });
//   }
// };

// // ============================================
// // STRIPE PAYMENT ROUTES
// // ============================================

// export const createStripeCheckoutSession = async (req, res) => {
//   try {
//     const { planId, planName, amount, currency = 'inr', successUrl, cancelUrl } = req.body;
    
//     console.log('💰 Creating Stripe checkout session:', { planId, planName, amount, currency });
    
//     // Validate input
//     if (!planId || !amount || amount <= 0) {
//       return res.status(400).json({
//         success: false,
//         error: 'Invalid plan or amount'
//       });
//     }
    
//     const stripe = getStripeInstance();
    
//     if (!stripe) {
//       return res.status(500).json({
//         success: false,
//         error: 'Payment gateway not configured. Please contact support.'
//       });
//     }
    
//     // Create checkout session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price_data: {
//             currency: currency.toLowerCase(),
//             product_data: {
//               name: `${planName} Plan`,
//               description: `Monthly subscription to ${planName} plan`,
//               metadata: {
//                 planId: planId,
//                 planName: planName
//               }
//             },
//             unit_amount: Math.round(amount * 100), // Amount in cents/paisa
//             recurring: {
//               interval: 'month'
//             }
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'subscription',
//       success_url: successUrl || `${process.env.FRONTEND_URL}/dashboard/subscriptions?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: cancelUrl || `${process.env.FRONTEND_URL}/dashboard/subscriptions?canceled=true`,
//       client_reference_id: req.user.id,
//       metadata: {
//         planId: planId,
//         planName: planName,
//         userId: req.user.id
//       },
//       customer_email: req.user.email
//     });
    
//     console.log('✅ Stripe checkout session created:', session.id);
    
//     return res.status(200).json({
//       success: true,
//       sessionId: session.id,
//       sessionUrl: session.url
//     });
    
//   } catch (error) {
//     console.error('❌ Stripe checkout session creation error:', error);
//     return res.status(500).json({
//       success: false,
//       error: error.message || 'Failed to create checkout session'
//     });
//   }
// };

// export const handleStripeWebhook = async (req, res) => {
//   try {
//     const stripe = getStripeInstance();
    
//     if (!stripe) {
//       return res.status(500).json({ error: 'Stripe not configured' });
//     }
    
//     const sig = req.headers['stripe-signature'];
//     let event;
    
//     try {
//       event = stripe.webhooks.constructEvent(
//         req.body,
//         sig,
//         process.env.STRIPE_WEBHOOK_SECRET
//       );
//     } catch (err) {
//       console.error('⚠️ Webhook signature verification failed:', err.message);
//       return res.status(400).send(`Webhook Error: ${err.message}`);
//     }
    
//     // Handle the event
//     switch (event.type) {
//       case 'checkout.session.completed':
//         const session = event.data.object;
//         console.log('✅ Checkout session completed:', session.id);
        
//         // Activate subscription
//         await activateSubscription(
//           session.client_reference_id,
//           session.metadata.planId,
//           session.id,
//           session.payment_intent,
//           'stripe'
//         );
//         break;
        
//       case 'invoice.payment_succeeded':
//         const invoice = event.data.object;
//         console.log('✅ Invoice payment succeeded:', invoice.id);
//         // Handle recurring payment success
//         break;
        
//       case 'customer.subscription.deleted':
//         const subscription = event.data.object;
//         console.log('❌ Customer subscription deleted:', subscription.id);
//         // Handle subscription cancellation
//         await handleSubscriptionCancellation(subscription.metadata.userId);
//         break;
        
//       default:
//         console.log(`Unhandled event type ${event.type}`);
//     }
    
//     res.json({ received: true });
    
//   } catch (error) {
//     console.error('❌ Webhook handling error:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

// export const verifyStripePayment = async (req, res) => {
//   try {
//     const { sessionId, planId } = req.body;
    
//     console.log('🔐 Verifying Stripe payment:', { sessionId, planId });
    
//     const stripe = getStripeInstance();
    
//     if (!stripe) {
//       return res.status(500).json({
//         success: false,
//         error: 'Payment gateway not configured'
//       });
//     }
    
//     // Retrieve the session
//     const session = await stripe.checkout.sessions.retrieve(sessionId);
    
//     if (!session || session.payment_status !== 'paid') {
//       return res.status(400).json({
//         success: false,
//         error: 'Payment not completed'
//       });
//     }
    
//     // Activate subscription
//     const result = await activateSubscription(
//       req.user.id,
//       planId,
//       sessionId,
//       session.payment_intent,
//       'stripe'
//     );
    
//     return res.status(200).json({
//       success: true,
//       message: 'Payment verified and subscription activated',
//       subscription: result
//     });
    
//   } catch (error) {
//     console.error('❌ Stripe verification error:', error);
//     return res.status(500).json({
//       success: false,
//       error: error.message || 'Payment verification failed'
//     });
//   }
// };

// // ============================================
// // HELPER FUNCTIONS
// // ============================================

// const activateSubscription = async (userId, planId, paymentId, orderId, paymentMethod) => {
//   // Get plan details
//   const planDetails = await SubscriptionPlan.findOne({ planId });
//   if (!planDetails) {
//     throw new Error('Plan not found');
//   }
  
//   // Calculate expiry date (30 days from now)
//   const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  
//   // Check if user already has an active subscription
//   let subscription = await Subscription.findOne({
//     user: userId,
//     plan: planId,
//     status: { $in: ['active', 'pending'] }
//   });
  
//   if (subscription) {
//     // Update existing subscription
//     subscription.status = 'active';
//     subscription.paymentId = paymentId;
//     subscription.orderId = orderId;
//     subscription.paymentMethod = paymentMethod;
//     subscription.verifiedAt = new Date();
//     subscription.expiresAt = expiresAt;
//     await subscription.save();
//   } else {
//     // Create new subscription
//     subscription = await Subscription.create({
//       user: userId,
//       plan: planId,
//       status: 'active',
//       price: {
//         amount: planDetails.price.amount,
//         currency: planDetails.price.currency
//       },
//       billingCycle: 'monthly',
//       paymentMethod: paymentMethod,
//       paymentId,
//       orderId,
//       expiresAt,
//       features: planDetails.features,
//       verifiedAt: new Date()
//     });
//   }
  
//   // Update user's subscription in User model
//   await User.findByIdAndUpdate(userId, {
//     'subscription.plan': planId,
//     'subscription.status': 'active',
//     'subscription.startedAt': new Date(),
//     'subscription.expiresAt': expiresAt,
//     'subscription.billingCycle': 'monthly',
//     'subscription.lastPaymentId': paymentId
//   });
  
//   console.log(`✅ Payment verified for user ${userId}. Plan: ${planId} is now ACTIVE`);
  
//   return {
//     id: subscription._id,
//     plan: subscription.plan,
//     status: subscription.status,
//     expiresAt: subscription.expiresAt
//   };
// };

// const handleSubscriptionCancellation = async (userId) => {
//   if (!userId) return;
  
//   await Subscription.findOneAndUpdate(
//     { user: userId, status: 'active' },
//     { status: 'cancelled', cancelledAt: new Date() },
//     { sort: { createdAt: -1 } }
//   );
  
//   await User.findByIdAndUpdate(userId, {
//     'subscription.plan': 'free',
//     'subscription.status': 'cancelled'
//   });
  
//   console.log(`❌ Subscription cancelled for user ${userId}`);
// };

// // ============================================
// // PUBLIC ROUTES
// // ============================================

// export const getPlans = async (req, res, next) => {
//   try {
//     let plans = await SubscriptionPlan.find({ isActive: true })
//       .sort({ displayOrder: 1, 'price.amount': 1 });
    
//     if (plans.length === 0) {
//       await initializeDefaultPlans();
//       plans = await SubscriptionPlan.find({ isActive: true })
//         .sort({ displayOrder: 1, 'price.amount': 1 });
//     }
    
//     const formattedPlans = plans.reduce((acc, plan) => {
//       acc[plan.planId] = {
//         name: plan.displayName,
//         price: plan.price.amount,
//         currency: plan.price.currency,
//         features: plan.features,
//         limits: plan.limits,
//         badgeText: plan.badgeText,
//         recommended: plan.recommended,
//         description: plan.description
//       };
//       return acc;
//     }, {});
    
//     successResponse(res, formattedPlans);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriptionFeatures = async (req, res, next) => {
//   try {
//     let plans = await SubscriptionPlan.find({ isActive: true })
//       .sort({ displayOrder: 1, 'price.amount': 1 });
    
//     if (plans.length === 0) {
//       await initializeDefaultPlans();
//       plans = await SubscriptionPlan.find({ isActive: true })
//         .sort({ displayOrder: 1, 'price.amount': 1 });
//     }
    
//     successResponse(res, plans.map(plan => ({
//       id: plan.planId,
//       name: plan.displayName,
//       price: plan.price.amount,
//       currency: plan.price.currency,
//       features: plan.features,
//       limits: plan.limits,
//       badgeText: plan.badgeText,
//       recommended: plan.recommended,
//       description: plan.description
//     })));
//   } catch (error) {
//     next(error);
//   }
// };

// export const getCurrentSubscription = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
    
//     if (!user) {
//       return errorResponse(res, 'User not found', 404);
//     }
    
//     const subscription = await Subscription.findOne({
//       user: req.user.id,
//       status: 'active'
//     }).sort({ createdAt: -1 });
    
//     if (subscription) {
//       const planDetails = await SubscriptionPlan.findOne({ planId: subscription.plan });
      
//       const subscriptionData = {
//         plan: subscription.plan,
//         status: subscription.status,
//         price: subscription.price,
//         billingCycle: subscription.billingCycle,
//         startedAt: subscription.createdAt,
//         expiresAt: subscription.expiresAt,
//         features: subscription.features || (planDetails?.features || [])
//       };
      
//       return successResponse(res, subscriptionData);
//     }
    
//     if (user.subscription && user.subscription.plan !== 'free') {
//       const planDetails = await SubscriptionPlan.findOne({ planId: user.subscription.plan });
      
//       const subscriptionData = {
//         plan: user.subscription.plan,
//         status: user.subscription.status || 'active',
//         price: { amount: 0, currency: 'INR' },
//         billingCycle: user.subscription.billingCycle || 'monthly',
//         startedAt: user.subscription.startedAt,
//         expiresAt: user.subscription.expiresAt,
//         features: planDetails?.features || []
//       };
      
//       return successResponse(res, subscriptionData);
//     }
    
//     const freePlan = await SubscriptionPlan.findOne({ planId: 'free' });
    
//     successResponse(res, {
//       plan: 'free',
//       status: 'active',
//       price: { amount: 0, currency: 'INR' },
//       billingCycle: 'monthly',
//       startedAt: new Date(),
//       expiresAt: null,
//       features: freePlan?.features || ['Browse all content', 'Read public poems', 'Basic search']
//     });
//   } catch (error) {
//     console.error('Error in getCurrentSubscription:', error);
//     next(error);
//   }
// };

// export const subscribe = async (req, res, next) => {
//   try {
//     const { plan, billingCycle, paymentMethod, couponCode } = req.body;
    
//     let planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
    
//     if (!planDetails) {
//       await initializeDefaultPlans();
//       planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
      
//       if (!planDetails) {
//         return errorResponse(res, 'Invalid plan', 400);
//       }
//     }
    
//     const months = billingCycle === 'yearly' ? 12 : billingCycle === 'quarterly' ? 3 : 1;
//     let amount = planDetails.price.amount * months;
//     let discountAmount = 0;
    
//     if (couponCode) {
//       const coupon = coupons.find(c => c.code === couponCode.toUpperCase());
//       if (coupon && coupon.isActive && (!coupon.validUntil || new Date(coupon.validUntil) > new Date())) {
//         if (coupon.discountType === 'percentage') {
//           discountAmount = amount * coupon.discountValue / 100;
//         } else {
//           discountAmount = coupon.discountValue;
//         }
//         amount = Math.max(0, amount - discountAmount);
//         coupon.usedCount++;
//       }
//     }
    
//     const expiresAt = (plan === 'free' || amount === 0) ? null : new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000);
//     const status = (plan === 'free' || amount === 0) ? 'active' : 'pending';
    
//     const subscription = await Subscription.create({
//       user: req.user.id,
//       plan,
//       status,
//       price: { 
//         amount: amount, 
//         currency: planDetails.price.currency, 
//         originalAmount: planDetails.price.amount * months 
//       },
//       billingCycle: billingCycle || 'monthly',
//       paymentMethod: paymentMethod || (plan === 'free' ? 'free' : 'pending'),
//       expiresAt,
//       features: planDetails.features,
//       discountApplied: discountAmount > 0 ? { amount: discountAmount, coupon: couponCode } : null
//     });
    
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': plan,
//       'subscription.startedAt': new Date(),
//       'subscription.expiresAt': expiresAt,
//       'subscription.status': status,
//       'subscription.billingCycle': billingCycle || 'monthly'
//     });
    
//     console.log(`✅ User ${req.user.id} subscribed to ${plan} plan. Status: ${status}`);
    
//     if (plan === 'free' || amount === 0) {
//       return successResponse(res, { subscription, plan: planDetails }, 'Free subscription activated', 201);
//     }
    
//     successResponse(res, { 
//       subscription, 
//       plan: planDetails,
//       requiresPayment: true,
//       discountApplied: discountAmount > 0 ? { amount: discountAmount, finalAmount: amount } : null
//     }, 'Subscription initiated', 201);
//   } catch (error) {
//     console.error('Subscribe error:', error);
//     next(error);
//   }
// };

// export const verifyPayment = async (req, res, next) => {
//   try {
//     const { subscriptionId, paymentId, orderId, signature } = req.body;
    
//     if (signature && orderId) {
//       const body = orderId + "|" + paymentId;
//       const expectedSignature = crypto
//         .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'test_secret')
//         .update(body.toString())
//         .digest('hex');
      
//       if (expectedSignature !== signature) {
//         return errorResponse(res, 'Invalid payment signature', 400);
//       }
//     }
    
//     const subscription = await Subscription.findByIdAndUpdate(
//       subscriptionId,
//       { status: 'active', paymentId, verifiedAt: new Date() },
//       { new: true }
//     );
    
//     if (!subscription) {
//       return errorResponse(res, 'Subscription not found', 404);
//     }
    
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': subscription.plan,
//       'subscription.status': 'active',
//       'subscription.expiresAt': subscription.expiresAt,
//       'subscription.billingCycle': subscription.billingCycle,
//       'subscription.lastPaymentId': paymentId
//     });
    
//     console.log(`✅ Payment verified for user ${req.user.id}. Plan: ${subscription.plan} is now ACTIVE`);
    
//     successResponse(res, subscription, 'Payment verified and subscription activated');
//   } catch (error) {
//     console.error('Verify payment error:', error);
//     next(error);
//   }
// };

// export const cancelSubscription = async (req, res, next) => {
//   try {
//     const subscription = await Subscription.findOneAndUpdate(
//       { user: req.user.id, status: 'active' },
//       { status: 'cancelled', cancelledAt: new Date() },
//       { new: true, sort: { createdAt: -1 } }
//     );
    
//     if (!subscription) {
//       return errorResponse(res, 'No active subscription found', 404);
//     }
    
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': 'free',
//       'subscription.status': 'cancelled'
//     });
    
//     successResponse(res, subscription, 'Subscription cancelled');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getBillingHistory = async (req, res, next) => {
//   try {
//     const history = await Subscription.find({ user: req.user.id })
//       .sort({ createdAt: -1 });
    
//     successResponse(res, history);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // INVOICE ROUTES (Keep existing implementation)
// // ============================================

// export const getInvoice = async (req, res, next) => {
//   // Keep your existing implementation
//   try {
//     const { id } = req.params;
//     const subscription = await Subscription.findById(id).populate('user', 'name email phone');
//     if (!subscription) return errorResponse(res, 'Invoice not found', 404);
//     if (subscription.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
//       return errorResponse(res, 'Unauthorized', 403);
//     }
//     successResponse(res, subscription);
//   } catch (error) {
//     next(error);
//   }
// };

// export const downloadInvoice = async (req, res, next) => {
//   // Keep your existing implementation
//   try {
//     const { id } = req.params;
//     const subscription = await Subscription.findById(id).populate('user', 'name email phone');
//     if (!subscription) return errorResponse(res, 'Invoice not found', 404);
//     res.json({ message: 'Invoice download endpoint - implement PDF generation' });
//   } catch (error) {
//     next(error);
//   }
// };

// export const sendInvoiceEmail = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     successResponse(res, null, 'Invoice email sent successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // PAYMENT METHODS (Keep existing implementation)
// // ============================================

// export const getPaymentMethods = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
//     const methods = user.paymentMethods || [];
//     const maskedMethods = methods.map(method => ({
//       _id: method._id,
//       cardNumber: `•••• •••• •••• ${method.lastFourDigits || '****'}`,
//       cardHolder: method.cardHolder,
//       expiryMonth: method.expiryMonth,
//       expiryYear: method.expiryYear,
//       cardBrand: method.cardBrand,
//       isDefault: method.isDefault
//     }));
//     successResponse(res, maskedMethods);
//   } catch (error) {
//     next(error);
//   }
// };

// export const addPaymentMethod = async (req, res, next) => {
//   try {
//     const { cardNumber, cardHolder, expiryMonth, expiryYear } = req.body;
//     if (!cardNumber || !cardHolder) return errorResponse(res, 'Card number and holder name required', 400);
//     const user = await User.findById(req.user.id);
//     if (!user.paymentMethods) user.paymentMethods = [];
//     const lastFourDigits = cardNumber.replace(/\s/g, '').slice(-4);
//     const newMethod = {
//       _id: new mongoose.Types.ObjectId(),
//       cardNumber: cardNumber.replace(/\s/g, ''),
//       cardHolder: cardHolder.toUpperCase(),
//       expiryMonth,
//       expiryYear,
//       lastFourDigits,
//       cardBrand: cardNumber.startsWith('4') ? 'visa' : 'mastercard',
//       isDefault: user.paymentMethods.length === 0,
//       createdAt: new Date()
//     };
//     user.paymentMethods.push(newMethod);
//     await user.save();
//     successResponse(res, { _id: newMethod._id, cardNumber: `•••• •••• •••• ${lastFourDigits}`, cardHolder: newMethod.cardHolder, isDefault: newMethod.isDefault }, 'Payment method added');
//   } catch (error) {
//     next(error);
//   }
// };

// export const removePaymentMethod = async (req, res, next) => {
//   try {
//     const { methodId } = req.params;
//     const user = await User.findById(req.user.id);
//     if (!user.paymentMethods) return errorResponse(res, 'No payment methods found', 404);
//     const methodIndex = user.paymentMethods.findIndex(m => m._id.toString() === methodId);
//     if (methodIndex === -1) return errorResponse(res, 'Payment method not found', 404);
//     if (user.paymentMethods.length === 1) return errorResponse(res, 'Cannot remove the only payment method', 400);
//     const wasDefault = user.paymentMethods[methodIndex].isDefault;
//     user.paymentMethods.splice(methodIndex, 1);
//     if (wasDefault && user.paymentMethods.length > 0) user.paymentMethods[0].isDefault = true;
//     await user.save();
//     successResponse(res, null, 'Payment method removed');
//   } catch (error) {
//     next(error);
//   }
// };

// export const setDefaultPaymentMethod = async (req, res, next) => {
//   try {
//     const { methodId } = req.params;
//     const user = await User.findById(req.user.id);
//     if (!user.paymentMethods) return errorResponse(res, 'No payment methods found', 404);
//     user.paymentMethods.forEach(method => { method.isDefault = method._id.toString() === methodId; });
//     await user.save();
//     successResponse(res, null, 'Default payment method updated');
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // COUPON ROUTES (Keep existing implementation)
// // ============================================

// export const validateCoupon = async (req, res, next) => {
//   try {
//     const { code } = req.params;
//     const coupon = coupons.find(c => c.code === code.toUpperCase());
//     if (!coupon) return errorResponse(res, 'Invalid coupon code', 404);
//     successResponse(res, coupon);
//   } catch (error) {
//     next(error);
//   }
// };

// export const applyCoupon = async (req, res, next) => {
//   try {
//     const { code, plan, amount } = req.body;
//     const coupon = coupons.find(c => c.code === code.toUpperCase());
//     if (!coupon) return errorResponse(res, 'Invalid coupon code', 404);
//     if (!coupon.isActive) return errorResponse(res, 'Coupon is not active', 400);
//     if (coupon.validUntil && new Date(coupon.validUntil) < new Date()) return errorResponse(res, 'Coupon has expired', 400);
//     if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) return errorResponse(res, 'Coupon usage limit exceeded', 400);
//     if (plan && coupon.applicablePlans && !coupon.applicablePlans.includes(plan)) return errorResponse(res, `Coupon not applicable for ${plan} plan`, 400);
//     let discountAmount = coupon.discountType === 'percentage' ? amount * coupon.discountValue / 100 : coupon.discountValue;
//     const finalAmount = Math.max(0, amount - discountAmount);
//     coupon.usedCount++;
//     successResponse(res, { discountAmount, finalAmount, savedAmount: amount - finalAmount });
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // ADMIN CMS ROUTES (Keep existing implementation)
// // ============================================

// export const getAllPlansCMS = async (req, res, next) => {
//   try {
//     const plans = await SubscriptionPlan.find().sort({ displayOrder: 1 });
//     successResponse(res, plans);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getPlanByIdCMS = async (req, res, next) => {
//   try {
//     const plan = await SubscriptionPlan.findById(req.params.id);
//     if (!plan) return errorResponse(res, 'Plan not found', 404);
//     successResponse(res, plan);
//   } catch (error) {
//     next(error);
//   }
// };

// export const createPlanCMS = async (req, res, next) => {
//   try {
//     const plan = await SubscriptionPlan.create(req.body);
//     successResponse(res, plan, 'Plan created successfully', 201);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updatePlanCMS = async (req, res, next) => {
//   try {
//     const plan = await SubscriptionPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!plan) return errorResponse(res, 'Plan not found', 404);
//     successResponse(res, plan, 'Plan updated successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const deletePlanCMS = async (req, res, next) => {
//   try {
//     const plan = await SubscriptionPlan.findByIdAndDelete(req.params.id);
//     if (!plan) return errorResponse(res, 'Plan not found', 404);
//     successResponse(res, null, 'Plan deleted successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const togglePlanStatusCMS = async (req, res, next) => {
//   try {
//     const plan = await SubscriptionPlan.findById(req.params.id);
//     if (!plan) return errorResponse(res, 'Plan not found', 404);
//     plan.isActive = !plan.isActive;
//     await plan.save();
//     successResponse(res, plan, `Plan ${plan.isActive ? 'activated' : 'deactivated'}`);
//   } catch (error) {
//     next(error);
//   }
// };

// export const reorderPlansCMS = async (req, res, next) => {
//   try {
//     const { orders } = req.body;
//     for (const { id, order } of orders) {
//       await SubscriptionPlan.findByIdAndUpdate(id, { displayOrder: order });
//     }
//     successResponse(res, null, 'Plans reordered successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriptionStatsCMS = async (req, res, next) => {
//   try {
//     const totalPlans = await SubscriptionPlan.countDocuments();
//     const activePlans = await SubscriptionPlan.countDocuments({ isActive: true });
//     const totalUsers = await User.countDocuments();
//     const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });
//     successResponse(res, { totalPlans, activePlans, totalUsers, activeSubscriptions });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getAllSubscribers = async (req, res, next) => {
//   try {
//     const subscribers = await Subscription.find().populate('user', 'name email');
//     successResponse(res, subscribers);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriberById = async (req, res, next) => {
//   try {
//     const subscriber = await Subscription.findById(req.params.id).populate('user', 'name email');
//     if (!subscriber) return errorResponse(res, 'Subscriber not found', 404);
//     successResponse(res, subscriber);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getAllTransactions = async (req, res, next) => {
//   try {
//     const transactions = await Subscription.find().populate('user', 'name email').sort({ createdAt: -1 });
//     successResponse(res, transactions);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getTransactionById = async (req, res, next) => {
//   try {
//     const transaction = await Subscription.findById(req.params.id).populate('user', 'name email');
//     if (!transaction) return errorResponse(res, 'Transaction not found', 404);
//     successResponse(res, transaction);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getTransactionStats = async (req, res, next) => {
//   try {
//     const totalRevenue = await Subscription.aggregate([
//       { $match: { status: 'active', 'price.amount': { $gt: 0 } } },
//       { $group: { _id: null, total: { $sum: '$price.amount' } } }
//     ]);
//     successResponse(res, { totalRevenue: totalRevenue[0]?.total || 0 });
//   } catch (error) {
//     next(error);
//   }
// };

// // Initialize default plans when server starts
// initializeDefaultPlans().catch(console.error);























// // server/controllers/subscription.controller.js
// import { Subscription, SubscriptionPlan } from '../models/Subscription.js';
// import User from '../models/User.js';
// import { successResponse, errorResponse } from '../utils/response.js';
// import crypto from 'crypto';
// import mongoose from 'mongoose';
// import PDFDocument from 'pdfkit';
// import Razorpay from 'razorpay';
// import Stripe from 'stripe';

// // Initialize Razorpay
// let razorpayInstance = null;

// const getRazorpayInstance = () => {
//   if (!razorpayInstance) {
//     if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//       console.warn('⚠️ Razorpay keys not configured. Payment features will not work.');
//       return null;
//     }
//     razorpayInstance = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_KEY_SECRET
//     });
//   }
//   return razorpayInstance;
// };

// // Initialize Stripe
// let stripeInstance = null;

// const getStripeInstance = () => {
//   if (!stripeInstance) {
//     if (!process.env.STRIPE_SECRET_KEY) {
//       console.warn('⚠️ Stripe keys not configured. Payment features will not work.');
//       return null;
//     }
//     stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
//   }
//   return stripeInstance;
// };

// // Default plans (fallback if database is empty)
// const defaultPlans = [
//   {
//     planId: 'free',
//     name: 'free',
//     displayName: 'Free',
//     description: 'Perfect for getting started',
//     price: { amount: 0, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       'Browse all content',
//       'Read public poems',
//       'Basic search',
//       '50 poems/day'
//     ],
//     limits: {
//       poemsPerDay: 50,
//       ebooksPerMonth: 2,
//       audiobooksPerMonth: 5,
//       unlimited: false,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 0,
//     badgeText: '',
//     recommended: false
//   },
//   {
//     planId: 'basic',
//     name: 'basic',
//     displayName: 'Basic',
//     description: 'Great for regular readers',
//     price: { amount: 99, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       'All free features',
//       'Unlimited poem reading',
//       'Download 5 ebooks/month',
//       'Basic audio streaming'
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: 5,
//       audiobooksPerMonth: 3,
//       unlimited: false,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 1,
//     badgeText: 'Popular',
//     recommended: true
//   },
//   {
//     planId: 'premium',
//     name: 'premium',
//     displayName: 'Premium',
//     description: 'For serious literature enthusiasts',
//     price: { amount: 199, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       'All Basic features',
//       'Unlimited downloads',
//       'HD audio streaming',
//       'Ad-free experience',
//       'AI explanations'
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: null,
//       audiobooksPerMonth: null,
//       unlimited: true,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 2,
//     badgeText: 'Best Value',
//     recommended: true
//   },
//   {
//     planId: 'pro',
//     name: 'pro',
//     displayName: 'Pro',
//     description: 'For creators and power users',
//     price: { amount: 499, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       'All Premium features',
//       'Creator tools',
//       'Priority support',
//       'Analytics dashboard',
//       'Early access'
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: null,
//       audiobooksPerMonth: null,
//       unlimited: true,
//       creator: true
//     },
//     isActive: true,
//     displayOrder: 3,
//     badgeText: 'Creator',
//     recommended: false
//   }
// ];

// // Coupons store
// let coupons = [
//   {
//     code: 'WELCOME10',
//     discountType: 'percentage',
//     discountValue: 10,
//     validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
//     usageLimit: 100,
//     usedCount: 0,
//     minAmount: 0,
//     applicablePlans: ['basic', 'premium', 'pro'],
//     isActive: true
//   },
//   {
//     code: 'SAVE20',
//     discountType: 'percentage',
//     discountValue: 20,
//     validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
//     usageLimit: 50,
//     usedCount: 0,
//     minAmount: 500,
//     applicablePlans: ['premium', 'pro'],
//     isActive: true
//   },
//   {
//     code: 'FLAT100',
//     discountType: 'fixed',
//     discountValue: 100,
//     validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
//     usageLimit: 30,
//     usedCount: 0,
//     minAmount: 300,
//     applicablePlans: ['basic', 'premium', 'pro'],
//     isActive: true
//   }
// ];

// // Initialize default plans
// const initializeDefaultPlans = async () => {
//   try {
//     for (const planData of defaultPlans) {
//       const existingPlan = await SubscriptionPlan.findOne({ planId: planData.planId });
//       if (!existingPlan) {
//         await SubscriptionPlan.create(planData);
//         console.log(`✅ Created default plan: ${planData.planId}`);
//       }
//     }
//     console.log('✅ Default plans initialized');
//   } catch (error) {
//     console.error('❌ Error initializing plans:', error.message);
//   }
// };

// // ============================================
// // RAZORPAY PAYMENT ROUTES
// // ============================================

// export const createRazorpayOrder = async (req, res) => {
//   try {
//     const { planId, planName, amount, currency = 'INR' } = req.body;
    
//     console.log('📦 Creating Razorpay order:', { planId, planName, amount, currency });
    
//     if (!planId || !amount || amount <= 0) {
//       return res.status(400).json({
//         success: false,
//         error: 'Invalid plan or amount'
//       });
//     }
    
//     const razorpay = getRazorpayInstance();
    
//     if (!razorpay) {
//       return res.status(500).json({
//         success: false,
//         error: 'Payment gateway not configured. Please contact support.'
//       });
//     }
    
//     const amountInPaise = Math.round(amount * 100);
    
//     const options = {
//       amount: amountInPaise,
//       currency: currency.toUpperCase(),
//       receipt: `receipt_${planId}_${Date.now()}`,
//       payment_capture: 1,
//       notes: {
//         planId: planId,
//         planName: planName,
//         userId: req.user?.id || 'guest'
//       }
//     };
    
//     console.log('📝 Razorpay order options:', options);
    
//     const order = await razorpay.orders.create(options);
    
//     console.log('✅ Razorpay order created:', order.id);
    
//     return res.status(200).json({
//       success: true,
//       orderId: order.id,
//       amount: order.amount,
//       currency: order.currency,
//       keyId: process.env.RAZORPAY_KEY_ID
//     });
    
//   } catch (error) {
//     console.error('❌ Razorpay order creation error:', error);
//     return res.status(500).json({
//       success: false,
//       error: error.message || 'Failed to create payment order',
//       details: process.env.NODE_ENV === 'development' ? error.stack : undefined
//     });
//   }
// };

// // ============================================
// // FIXED: verifyRazorpayPayment with proper validation
// // ============================================
// export const verifyRazorpayPayment = async (req, res) => {
//   try {
//     const { orderId, paymentId, signature, planId, subscriptionId } = req.body;
    
//     console.log('🔐 Verifying Razorpay payment:', { 
//       orderId, 
//       paymentId, 
//       planId, 
//       subscriptionId,
//       hasSignature: !!signature 
//     });
    
//     // ✅ Validate all required fields are present
//     if (!orderId || !paymentId || !signature) {
//       console.error('❌ Missing payment verification details:', { 
//         hasOrderId: !!orderId, 
//         hasPaymentId: !!paymentId, 
//         hasSignature: !!signature 
//       });
//       return res.status(400).json({
//         success: false,
//         error: 'Missing payment verification details. Please provide orderId, paymentId, and signature.'
//       });
//     }
    
//     // Verify signature
//     const body = orderId + "|" + paymentId;
//     const expectedSignature = crypto
//       .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(body.toString())
//       .digest('hex');
    
//     console.log('🔐 Signature verification:', { 
//       received: signature.substring(0, 20) + '...', 
//       expected: expectedSignature.substring(0, 20) + '...',
//       matches: expectedSignature === signature
//     });
    
//     if (expectedSignature !== signature) {
//       console.error('❌ Invalid payment signature');
//       return res.status(400).json({
//         success: false,
//         error: 'Invalid payment signature'
//       });
//     }
    
//     console.log('✅ Payment signature verified successfully');
    
//     // Get plan details
//     const planDetails = await SubscriptionPlan.findOne({ planId });
//     if (!planDetails) {
//       console.error('❌ Plan not found:', planId);
//       return res.status(404).json({
//         success: false,
//         error: 'Plan not found'
//       });
//     }
    
//     // Calculate expiry date (30 days from now)
//     const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    
//     // Check if user already has an active subscription
//     let subscription = await Subscription.findOne({
//       user: req.user.id,
//       plan: planId,
//       status: { $in: ['active', 'pending'] }
//     });
    
//     if (subscription) {
//       // Update existing subscription
//       subscription.status = 'active';
//       subscription.paymentId = paymentId;
//       subscription.orderId = orderId;
//       subscription.paymentMethod = 'razorpay';
//       subscription.verifiedAt = new Date();
//       subscription.expiresAt = expiresAt;
//       await subscription.save();
//       console.log('✅ Updated existing subscription:', subscription._id);
//     } else {
//       // Create new subscription
//       subscription = await Subscription.create({
//         user: req.user.id,
//         plan: planId,
//         status: 'active',
//         price: {
//           amount: planDetails.price.amount,
//           currency: planDetails.price.currency
//         },
//         billingCycle: 'monthly',
//         paymentMethod: 'razorpay',
//         paymentId,
//         orderId,
//         expiresAt,
//         features: planDetails.features,
//         verifiedAt: new Date()
//       });
//       console.log('✅ Created new subscription:', subscription._id);
//     }
    
//     // Update user's subscription in User model
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': planId,
//       'subscription.status': 'active',
//       'subscription.startedAt': new Date(),
//       'subscription.expiresAt': expiresAt,
//       'subscription.billingCycle': 'monthly',
//       'subscription.lastPaymentId': paymentId
//     });
    
//     console.log(`✅ Payment verified for user ${req.user.id}. Plan: ${planId} is now ACTIVE`);
    
//     return res.status(200).json({
//       success: true,
//       message: 'Payment verified and subscription activated',
//       subscription: {
//         id: subscription._id,
//         plan: subscription.plan,
//         status: subscription.status,
//         expiresAt: subscription.expiresAt
//       }
//     });
    
//   } catch (error) {
//     console.error('❌ Payment verification error:', error);
//     return res.status(500).json({
//       success: false,
//       error: error.message || 'Payment verification failed'
//     });
//   }
// };

// // ============================================
// // STRIPE PAYMENT ROUTES
// // ============================================

// export const createStripeCheckoutSession = async (req, res) => {
//   try {
//     const { planId, planName, amount, currency = 'inr', successUrl, cancelUrl } = req.body;
    
//     console.log('💰 Creating Stripe checkout session:', { planId, planName, amount, currency });
    
//     if (!planId || !amount || amount <= 0) {
//       return res.status(400).json({
//         success: false,
//         error: 'Invalid plan or amount'
//       });
//     }
    
//     const stripe = getStripeInstance();
    
//     if (!stripe) {
//       return res.status(500).json({
//         success: false,
//         error: 'Payment gateway not configured. Please contact support.'
//       });
//     }
    
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price_data: {
//             currency: currency.toLowerCase(),
//             product_data: {
//               name: `${planName} Plan`,
//               description: `Monthly subscription to ${planName} plan`,
//               metadata: {
//                 planId: planId,
//                 planName: planName
//               }
//             },
//             unit_amount: Math.round(amount * 100),
//             recurring: {
//               interval: 'month'
//             }
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'subscription',
//       success_url: successUrl || `${process.env.FRONTEND_URL}/dashboard/subscriptions?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: cancelUrl || `${process.env.FRONTEND_URL}/dashboard/subscriptions?canceled=true`,
//       client_reference_id: req.user.id,
//       metadata: {
//         planId: planId,
//         planName: planName,
//         userId: req.user.id
//       },
//       customer_email: req.user.email
//     });
    
//     console.log('✅ Stripe checkout session created:', session.id);
    
//     return res.status(200).json({
//       success: true,
//       sessionId: session.id,
//       sessionUrl: session.url
//     });
    
//   } catch (error) {
//     console.error('❌ Stripe checkout session creation error:', error);
//     return res.status(500).json({
//       success: false,
//       error: error.message || 'Failed to create checkout session'
//     });
//   }
// };

// export const handleStripeWebhook = async (req, res) => {
//   try {
//     const stripe = getStripeInstance();
    
//     if (!stripe) {
//       return res.status(500).json({ error: 'Stripe not configured' });
//     }
    
//     const sig = req.headers['stripe-signature'];
//     let event;
    
//     try {
//       event = stripe.webhooks.constructEvent(
//         req.body,
//         sig,
//         process.env.STRIPE_WEBHOOK_SECRET
//       );
//     } catch (err) {
//       console.error('⚠️ Webhook signature verification failed:', err.message);
//       return res.status(400).send(`Webhook Error: ${err.message}`);
//     }
    
//     switch (event.type) {
//       case 'checkout.session.completed':
//         const session = event.data.object;
//         console.log('✅ Checkout session completed:', session.id);
        
//         await activateSubscription(
//           session.client_reference_id,
//           session.metadata.planId,
//           session.id,
//           session.payment_intent,
//           'stripe'
//         );
//         break;
        
//       case 'invoice.payment_succeeded':
//         const invoice = event.data.object;
//         console.log('✅ Invoice payment succeeded:', invoice.id);
//         break;
        
//       case 'customer.subscription.deleted':
//         const subscription = event.data.object;
//         console.log('❌ Customer subscription deleted:', subscription.id);
//         await handleSubscriptionCancellation(subscription.metadata.userId);
//         break;
        
//       default:
//         console.log(`Unhandled event type ${event.type}`);
//     }
    
//     res.json({ received: true });
    
//   } catch (error) {
//     console.error('❌ Webhook handling error:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

// export const verifyStripePayment = async (req, res) => {
//   try {
//     const { sessionId, planId } = req.body;
    
//     console.log('🔐 Verifying Stripe payment:', { sessionId, planId });
    
//     const stripe = getStripeInstance();
    
//     if (!stripe) {
//       return res.status(500).json({
//         success: false,
//         error: 'Payment gateway not configured'
//       });
//     }
    
//     const session = await stripe.checkout.sessions.retrieve(sessionId);
    
//     if (!session || session.payment_status !== 'paid') {
//       return res.status(400).json({
//         success: false,
//         error: 'Payment not completed'
//       });
//     }
    
//     const result = await activateSubscription(
//       req.user.id,
//       planId,
//       sessionId,
//       session.payment_intent,
//       'stripe'
//     );
    
//     return res.status(200).json({
//       success: true,
//       message: 'Payment verified and subscription activated',
//       subscription: result
//     });
    
//   } catch (error) {
//     console.error('❌ Stripe verification error:', error);
//     return res.status(500).json({
//       success: false,
//       error: error.message || 'Payment verification failed'
//     });
//   }
// };

// // ============================================
// // HELPER FUNCTIONS
// // ============================================

// const activateSubscription = async (userId, planId, paymentId, orderId, paymentMethod) => {
//   const planDetails = await SubscriptionPlan.findOne({ planId });
//   if (!planDetails) {
//     throw new Error('Plan not found');
//   }
  
//   const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  
//   let subscription = await Subscription.findOne({
//     user: userId,
//     plan: planId,
//     status: { $in: ['active', 'pending'] }
//   });
  
//   if (subscription) {
//     subscription.status = 'active';
//     subscription.paymentId = paymentId;
//     subscription.orderId = orderId;
//     subscription.paymentMethod = paymentMethod;
//     subscription.verifiedAt = new Date();
//     subscription.expiresAt = expiresAt;
//     await subscription.save();
//   } else {
//     subscription = await Subscription.create({
//       user: userId,
//       plan: planId,
//       status: 'active',
//       price: {
//         amount: planDetails.price.amount,
//         currency: planDetails.price.currency
//       },
//       billingCycle: 'monthly',
//       paymentMethod: paymentMethod,
//       paymentId,
//       orderId,
//       expiresAt,
//       features: planDetails.features,
//       verifiedAt: new Date()
//     });
//   }
  
//   await User.findByIdAndUpdate(userId, {
//     'subscription.plan': planId,
//     'subscription.status': 'active',
//     'subscription.startedAt': new Date(),
//     'subscription.expiresAt': expiresAt,
//     'subscription.billingCycle': 'monthly',
//     'subscription.lastPaymentId': paymentId
//   });
  
//   console.log(`✅ Payment verified for user ${userId}. Plan: ${planId} is now ACTIVE`);
  
//   return {
//     id: subscription._id,
//     plan: subscription.plan,
//     status: subscription.status,
//     expiresAt: subscription.expiresAt
//   };
// };

// const handleSubscriptionCancellation = async (userId) => {
//   if (!userId) return;
  
//   await Subscription.findOneAndUpdate(
//     { user: userId, status: 'active' },
//     { status: 'cancelled', cancelledAt: new Date() },
//     { sort: { createdAt: -1 } }
//   );
  
//   await User.findByIdAndUpdate(userId, {
//     'subscription.plan': 'free',
//     'subscription.status': 'cancelled'
//   });
  
//   console.log(`❌ Subscription cancelled for user ${userId}`);
// };

// // ============================================
// // PUBLIC ROUTES
// // ============================================

// export const getPlans = async (req, res, next) => {
//   try {
//     let plans = await SubscriptionPlan.find({ isActive: true })
//       .sort({ displayOrder: 1, 'price.amount': 1 });
    
//     if (plans.length === 0) {
//       await initializeDefaultPlans();
//       plans = await SubscriptionPlan.find({ isActive: true })
//         .sort({ displayOrder: 1, 'price.amount': 1 });
//     }
    
//     const formattedPlans = plans.reduce((acc, plan) => {
//       acc[plan.planId] = {
//         name: plan.displayName,
//         price: plan.price.amount,
//         currency: plan.price.currency,
//         features: plan.features,
//         limits: plan.limits,
//         badgeText: plan.badgeText,
//         recommended: plan.recommended,
//         description: plan.description
//       };
//       return acc;
//     }, {});
    
//     successResponse(res, formattedPlans);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriptionFeatures = async (req, res, next) => {
//   try {
//     let plans = await SubscriptionPlan.find({ isActive: true })
//       .sort({ displayOrder: 1, 'price.amount': 1 });
    
//     if (plans.length === 0) {
//       await initializeDefaultPlans();
//       plans = await SubscriptionPlan.find({ isActive: true })
//         .sort({ displayOrder: 1, 'price.amount': 1 });
//     }
    
//     successResponse(res, plans.map(plan => ({
//       id: plan.planId,
//       name: plan.displayName,
//       price: plan.price.amount,
//       currency: plan.price.currency,
//       features: plan.features,
//       limits: plan.limits,
//       badgeText: plan.badgeText,
//       recommended: plan.recommended,
//       description: plan.description
//     })));
//   } catch (error) {
//     next(error);
//   }
// };

// export const getCurrentSubscription = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
    
//     if (!user) {
//       return errorResponse(res, 'User not found', 404);
//     }
    
//     const subscription = await Subscription.findOne({
//       user: req.user.id,
//       status: 'active'
//     }).sort({ createdAt: -1 });
    
//     if (subscription) {
//       const planDetails = await SubscriptionPlan.findOne({ planId: subscription.plan });
      
//       const subscriptionData = {
//         plan: subscription.plan,
//         status: subscription.status,
//         price: subscription.price,
//         billingCycle: subscription.billingCycle,
//         startedAt: subscription.createdAt,
//         expiresAt: subscription.expiresAt,
//         features: subscription.features || (planDetails?.features || [])
//       };
      
//       return successResponse(res, subscriptionData);
//     }
    
//     if (user.subscription && user.subscription.plan !== 'free') {
//       const planDetails = await SubscriptionPlan.findOne({ planId: user.subscription.plan });
      
//       const subscriptionData = {
//         plan: user.subscription.plan,
//         status: user.subscription.status || 'active',
//         price: { amount: 0, currency: 'INR' },
//         billingCycle: user.subscription.billingCycle || 'monthly',
//         startedAt: user.subscription.startedAt,
//         expiresAt: user.subscription.expiresAt,
//         features: planDetails?.features || []
//       };
      
//       return successResponse(res, subscriptionData);
//     }
    
//     const freePlan = await SubscriptionPlan.findOne({ planId: 'free' });
    
//     successResponse(res, {
//       plan: 'free',
//       status: 'active',
//       price: { amount: 0, currency: 'INR' },
//       billingCycle: 'monthly',
//       startedAt: new Date(),
//       expiresAt: null,
//       features: freePlan?.features || ['Browse all content', 'Read public poems', 'Basic search']
//     });
//   } catch (error) {
//     console.error('Error in getCurrentSubscription:', error);
//     next(error);
//   }
// };

// export const subscribe = async (req, res, next) => {
//   try {
//     const { plan, billingCycle, paymentMethod, couponCode } = req.body;
    
//     let planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
    
//     if (!planDetails) {
//       await initializeDefaultPlans();
//       planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
      
//       if (!planDetails) {
//         return errorResponse(res, 'Invalid plan', 400);
//       }
//     }
    
//     const months = billingCycle === 'yearly' ? 12 : billingCycle === 'quarterly' ? 3 : 1;
//     let amount = planDetails.price.amount * months;
//     let discountAmount = 0;
    
//     if (couponCode) {
//       const coupon = coupons.find(c => c.code === couponCode.toUpperCase());
//       if (coupon && coupon.isActive && (!coupon.validUntil || new Date(coupon.validUntil) > new Date())) {
//         if (coupon.discountType === 'percentage') {
//           discountAmount = amount * coupon.discountValue / 100;
//         } else {
//           discountAmount = coupon.discountValue;
//         }
//         amount = Math.max(0, amount - discountAmount);
//         coupon.usedCount++;
//       }
//     }
    
//     const expiresAt = (plan === 'free' || amount === 0) ? null : new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000);
//     const status = (plan === 'free' || amount === 0) ? 'active' : 'pending';
    
//     const subscription = await Subscription.create({
//       user: req.user.id,
//       plan,
//       status,
//       price: { 
//         amount: amount, 
//         currency: planDetails.price.currency, 
//         originalAmount: planDetails.price.amount * months 
//       },
//       billingCycle: billingCycle || 'monthly',
//       paymentMethod: paymentMethod || (plan === 'free' ? 'free' : 'pending'),
//       expiresAt,
//       features: planDetails.features,
//       discountApplied: discountAmount > 0 ? { amount: discountAmount, coupon: couponCode } : null
//     });
    
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': plan,
//       'subscription.startedAt': new Date(),
//       'subscription.expiresAt': expiresAt,
//       'subscription.status': status,
//       'subscription.billingCycle': billingCycle || 'monthly'
//     });
    
//     console.log(`✅ User ${req.user.id} subscribed to ${plan} plan. Status: ${status}`);
    
//     if (plan === 'free' || amount === 0) {
//       return successResponse(res, { subscription, plan: planDetails }, 'Free subscription activated', 201);
//     }
    
//     successResponse(res, { 
//       subscription, 
//       plan: planDetails,
//       requiresPayment: true,
//       discountApplied: discountAmount > 0 ? { amount: discountAmount, finalAmount: amount } : null
//     }, 'Subscription initiated', 201);
//   } catch (error) {
//     console.error('Subscribe error:', error);
//     next(error);
//   }
// };

// export const verifyPayment = async (req, res, next) => {
//   try {
//     const { subscriptionId, paymentId, orderId, signature } = req.body;
    
//     if (signature && orderId) {
//       const body = orderId + "|" + paymentId;
//       const expectedSignature = crypto
//         .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'test_secret')
//         .update(body.toString())
//         .digest('hex');
      
//       if (expectedSignature !== signature) {
//         return errorResponse(res, 'Invalid payment signature', 400);
//       }
//     }
    
//     const subscription = await Subscription.findByIdAndUpdate(
//       subscriptionId,
//       { status: 'active', paymentId, verifiedAt: new Date() },
//       { new: true }
//     );
    
//     if (!subscription) {
//       return errorResponse(res, 'Subscription not found', 404);
//     }
    
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': subscription.plan,
//       'subscription.status': 'active',
//       'subscription.expiresAt': subscription.expiresAt,
//       'subscription.billingCycle': subscription.billingCycle,
//       'subscription.lastPaymentId': paymentId
//     });
    
//     console.log(`✅ Payment verified for user ${req.user.id}. Plan: ${subscription.plan} is now ACTIVE`);
    
//     successResponse(res, subscription, 'Payment verified and subscription activated');
//   } catch (error) {
//     console.error('Verify payment error:', error);
//     next(error);
//   }
// };

// export const cancelSubscription = async (req, res, next) => {
//   try {
//     const subscription = await Subscription.findOneAndUpdate(
//       { user: req.user.id, status: 'active' },
//       { status: 'cancelled', cancelledAt: new Date() },
//       { new: true, sort: { createdAt: -1 } }
//     );
    
//     if (!subscription) {
//       return errorResponse(res, 'No active subscription found', 404);
//     }
    
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': 'free',
//       'subscription.status': 'cancelled'
//     });
    
//     successResponse(res, subscription, 'Subscription cancelled');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getBillingHistory = async (req, res, next) => {
//   try {
//     const history = await Subscription.find({ user: req.user.id })
//       .sort({ createdAt: -1 });
    
//     successResponse(res, history);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // INVOICE ROUTES
// // ============================================

// export const getInvoice = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const subscription = await Subscription.findById(id).populate('user', 'name email phone');
//     if (!subscription) return errorResponse(res, 'Invoice not found', 404);
//     if (subscription.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
//       return errorResponse(res, 'Unauthorized', 403);
//     }
//     successResponse(res, subscription);
//   } catch (error) {
//     next(error);
//   }
// };

// export const downloadInvoice = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const subscription = await Subscription.findById(id).populate('user', 'name email phone');
//     if (!subscription) return errorResponse(res, 'Invoice not found', 404);
//     res.json({ message: 'Invoice download endpoint - implement PDF generation' });
//   } catch (error) {
//     next(error);
//   }
// };

// export const sendInvoiceEmail = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     successResponse(res, null, 'Invoice email sent successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // PAYMENT METHODS
// // ============================================

// export const getPaymentMethods = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
//     const methods = user.paymentMethods || [];
//     const maskedMethods = methods.map(method => ({
//       _id: method._id,
//       cardNumber: `•••• •••• •••• ${method.lastFourDigits || '****'}`,
//       cardHolder: method.cardHolder,
//       expiryMonth: method.expiryMonth,
//       expiryYear: method.expiryYear,
//       cardBrand: method.cardBrand,
//       isDefault: method.isDefault
//     }));
//     successResponse(res, maskedMethods);
//   } catch (error) {
//     next(error);
//   }
// };

// export const addPaymentMethod = async (req, res, next) => {
//   try {
//     const { cardNumber, cardHolder, expiryMonth, expiryYear } = req.body;
//     if (!cardNumber || !cardHolder) return errorResponse(res, 'Card number and holder name required', 400);
//     const user = await User.findById(req.user.id);
//     if (!user.paymentMethods) user.paymentMethods = [];
//     const lastFourDigits = cardNumber.replace(/\s/g, '').slice(-4);
//     const newMethod = {
//       _id: new mongoose.Types.ObjectId(),
//       cardNumber: cardNumber.replace(/\s/g, ''),
//       cardHolder: cardHolder.toUpperCase(),
//       expiryMonth,
//       expiryYear,
//       lastFourDigits,
//       cardBrand: cardNumber.startsWith('4') ? 'visa' : 'mastercard',
//       isDefault: user.paymentMethods.length === 0,
//       createdAt: new Date()
//     };
//     user.paymentMethods.push(newMethod);
//     await user.save();
//     successResponse(res, { _id: newMethod._id, cardNumber: `•••• •••• •••• ${lastFourDigits}`, cardHolder: newMethod.cardHolder, isDefault: newMethod.isDefault }, 'Payment method added');
//   } catch (error) {
//     next(error);
//   }
// };

// export const removePaymentMethod = async (req, res, next) => {
//   try {
//     const { methodId } = req.params;
//     const user = await User.findById(req.user.id);
//     if (!user.paymentMethods) return errorResponse(res, 'No payment methods found', 404);
//     const methodIndex = user.paymentMethods.findIndex(m => m._id.toString() === methodId);
//     if (methodIndex === -1) return errorResponse(res, 'Payment method not found', 404);
//     if (user.paymentMethods.length === 1) return errorResponse(res, 'Cannot remove the only payment method', 400);
//     const wasDefault = user.paymentMethods[methodIndex].isDefault;
//     user.paymentMethods.splice(methodIndex, 1);
//     if (wasDefault && user.paymentMethods.length > 0) user.paymentMethods[0].isDefault = true;
//     await user.save();
//     successResponse(res, null, 'Payment method removed');
//   } catch (error) {
//     next(error);
//   }
// };

// export const setDefaultPaymentMethod = async (req, res, next) => {
//   try {
//     const { methodId } = req.params;
//     const user = await User.findById(req.user.id);
//     if (!user.paymentMethods) return errorResponse(res, 'No payment methods found', 404);
//     user.paymentMethods.forEach(method => { method.isDefault = method._id.toString() === methodId; });
//     await user.save();
//     successResponse(res, null, 'Default payment method updated');
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // COUPON ROUTES
// // ============================================

// export const validateCoupon = async (req, res, next) => {
//   try {
//     const { code } = req.params;
//     const coupon = coupons.find(c => c.code === code.toUpperCase());
//     if (!coupon) return errorResponse(res, 'Invalid coupon code', 404);
//     successResponse(res, coupon);
//   } catch (error) {
//     next(error);
//   }
// };

// export const applyCoupon = async (req, res, next) => {
//   try {
//     const { code, plan, amount } = req.body;
//     const coupon = coupons.find(c => c.code === code.toUpperCase());
//     if (!coupon) return errorResponse(res, 'Invalid coupon code', 404);
//     if (!coupon.isActive) return errorResponse(res, 'Coupon is not active', 400);
//     if (coupon.validUntil && new Date(coupon.validUntil) < new Date()) return errorResponse(res, 'Coupon has expired', 400);
//     if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) return errorResponse(res, 'Coupon usage limit exceeded', 400);
//     if (plan && coupon.applicablePlans && !coupon.applicablePlans.includes(plan)) return errorResponse(res, `Coupon not applicable for ${plan} plan`, 400);
//     let discountAmount = coupon.discountType === 'percentage' ? amount * coupon.discountValue / 100 : coupon.discountValue;
//     const finalAmount = Math.max(0, amount - discountAmount);
//     coupon.usedCount++;
//     successResponse(res, { discountAmount, finalAmount, savedAmount: amount - finalAmount });
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // ADMIN CMS ROUTES
// // ============================================

// export const getAllPlansCMS = async (req, res, next) => {
//   try {
//     const plans = await SubscriptionPlan.find().sort({ displayOrder: 1 });
//     successResponse(res, plans);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getPlanByIdCMS = async (req, res, next) => {
//   try {
//     const plan = await SubscriptionPlan.findById(req.params.id);
//     if (!plan) return errorResponse(res, 'Plan not found', 404);
//     successResponse(res, plan);
//   } catch (error) {
//     next(error);
//   }
// };

// export const createPlanCMS = async (req, res, next) => {
//   try {
//     const plan = await SubscriptionPlan.create(req.body);
//     successResponse(res, plan, 'Plan created successfully', 201);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updatePlanCMS = async (req, res, next) => {
//   try {
//     const plan = await SubscriptionPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!plan) return errorResponse(res, 'Plan not found', 404);
//     successResponse(res, plan, 'Plan updated successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const deletePlanCMS = async (req, res, next) => {
//   try {
//     const plan = await SubscriptionPlan.findByIdAndDelete(req.params.id);
//     if (!plan) return errorResponse(res, 'Plan not found', 404);
//     successResponse(res, null, 'Plan deleted successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const togglePlanStatusCMS = async (req, res, next) => {
//   try {
//     const plan = await SubscriptionPlan.findById(req.params.id);
//     if (!plan) return errorResponse(res, 'Plan not found', 404);
//     plan.isActive = !plan.isActive;
//     await plan.save();
//     successResponse(res, plan, `Plan ${plan.isActive ? 'activated' : 'deactivated'}`);
//   } catch (error) {
//     next(error);
//   }
// };

// export const reorderPlansCMS = async (req, res, next) => {
//   try {
//     const { orders } = req.body;
//     for (const { id, order } of orders) {
//       await SubscriptionPlan.findByIdAndUpdate(id, { displayOrder: order });
//     }
//     successResponse(res, null, 'Plans reordered successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriptionStatsCMS = async (req, res, next) => {
//   try {
//     const totalPlans = await SubscriptionPlan.countDocuments();
//     const activePlans = await SubscriptionPlan.countDocuments({ isActive: true });
//     const totalUsers = await User.countDocuments();
//     const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });
//     successResponse(res, { totalPlans, activePlans, totalUsers, activeSubscriptions });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getAllSubscribers = async (req, res, next) => {
//   try {
//     const subscribers = await Subscription.find().populate('user', 'name email');
//     successResponse(res, subscribers);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriberById = async (req, res, next) => {
//   try {
//     const subscriber = await Subscription.findById(req.params.id).populate('user', 'name email');
//     if (!subscriber) return errorResponse(res, 'Subscriber not found', 404);
//     successResponse(res, subscriber);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getAllTransactions = async (req, res, next) => {
//   try {
//     const transactions = await Subscription.find().populate('user', 'name email').sort({ createdAt: -1 });
//     successResponse(res, transactions);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getTransactionById = async (req, res, next) => {
//   try {
//     const transaction = await Subscription.findById(req.params.id).populate('user', 'name email');
//     if (!transaction) return errorResponse(res, 'Transaction not found', 404);
//     successResponse(res, transaction);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getTransactionStats = async (req, res, next) => {
//   try {
//     const totalRevenue = await Subscription.aggregate([
//       { $match: { status: 'active', 'price.amount': { $gt: 0 } } },
//       { $group: { _id: null, total: { $sum: '$price.amount' } } }
//     ]);
//     successResponse(res, { totalRevenue: totalRevenue[0]?.total || 0 });
//   } catch (error) {
//     next(error);
//   }
// };

// // Initialize default plans when server starts
// initializeDefaultPlans().catch(console.error);






















// // server/controllers/subscription.controller.js
// import { Subscription, SubscriptionPlan } from '../models/Subscription.js';
// import User from '../models/User.js';
// import { successResponse, errorResponse } from '../utils/response.js';
// import crypto from 'crypto';
// import mongoose from 'mongoose';
// import PDFDocument from 'pdfkit';
// import Razorpay from 'razorpay';
// import Stripe from 'stripe';

// // Initialize Razorpay
// let razorpayInstance = null;

// const getRazorpayInstance = () => {
//   if (!razorpayInstance) {
//     if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//       console.warn('⚠️ Razorpay keys not configured. Payment features will not work.');
//       return null;
//     }
//     razorpayInstance = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_KEY_SECRET
//     });
//   }
//   return razorpayInstance;
// };

// // Initialize Stripe
// let stripeInstance = null;

// const getStripeInstance = () => {
//   if (!stripeInstance) {
//     if (!process.env.STRIPE_SECRET_KEY) {
//       console.warn('⚠️ Stripe keys not configured. Payment features will not work.');
//       return null;
//     }
//     stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
//   }
//   return stripeInstance;
// };

// // Default plans (fallback if database is empty)
// const defaultPlans = [
//   {
//     planId: 'free',
//     name: 'free',
//     displayName: 'Free',
//     description: 'Perfect for getting started',
//     price: { amount: 0, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       'Browse all content',
//       'Read public poems',
//       'Basic search',
//       '50 poems/day'
//     ],
//     limits: {
//       poemsPerDay: 50,
//       ebooksPerMonth: 2,
//       audiobooksPerMonth: 5,
//       unlimited: false,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 0,
//     badgeText: '',
//     recommended: false
//   },
//   {
//     planId: 'basic',
//     name: 'basic',
//     displayName: 'Basic',
//     description: 'Great for regular readers',
//     price: { amount: 99, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       'All free features',
//       'Unlimited poem reading',
//       'Download 5 ebooks/month',
//       'Basic audio streaming'
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: 5,
//       audiobooksPerMonth: 3,
//       unlimited: false,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 1,
//     badgeText: 'Popular',
//     recommended: true
//   },
//   {
//     planId: 'premium',
//     name: 'premium',
//     displayName: 'Premium',
//     description: 'For serious literature enthusiasts',
//     price: { amount: 199, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       'All Basic features',
//       'Unlimited downloads',
//       'HD audio streaming',
//       'Ad-free experience',
//       'AI explanations'
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: null,
//       audiobooksPerMonth: null,
//       unlimited: true,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 2,
//     badgeText: 'Best Value',
//     recommended: true
//   },
//   {
//     planId: 'pro',
//     name: 'pro',
//     displayName: 'Pro',
//     description: 'For creators and power users',
//     price: { amount: 499, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [
//       'All Premium features',
//       'Creator tools',
//       'Priority support',
//       'Analytics dashboard',
//       'Early access'
//     ],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: null,
//       audiobooksPerMonth: null,
//       unlimited: true,
//       creator: true
//     },
//     isActive: true,
//     displayOrder: 3,
//     badgeText: 'Creator',
//     recommended: false
//   }
// ];

// // Coupons store
// let coupons = [
//   {
//     code: 'WELCOME10',
//     discountType: 'percentage',
//     discountValue: 10,
//     validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
//     usageLimit: 100,
//     usedCount: 0,
//     minAmount: 0,
//     applicablePlans: ['basic', 'premium', 'pro'],
//     isActive: true
//   },
//   {
//     code: 'SAVE20',
//     discountType: 'percentage',
//     discountValue: 20,
//     validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
//     usageLimit: 50,
//     usedCount: 0,
//     minAmount: 500,
//     applicablePlans: ['premium', 'pro'],
//     isActive: true
//   },
//   {
//     code: 'FLAT100',
//     discountType: 'fixed',
//     discountValue: 100,
//     validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
//     usageLimit: 30,
//     usedCount: 0,
//     minAmount: 300,
//     applicablePlans: ['basic', 'premium', 'pro'],
//     isActive: true
//   }
// ];

// // Initialize default plans
// const initializeDefaultPlans = async () => {
//   try {
//     for (const planData of defaultPlans) {
//       const existingPlan = await SubscriptionPlan.findOne({ planId: planData.planId });
//       if (!existingPlan) {
//         await SubscriptionPlan.create(planData);
//         console.log(`✅ Created default plan: ${planData.planId}`);
//       }
//     }
//     console.log('✅ Default plans initialized');
//   } catch (error) {
//     console.error('❌ Error initializing plans:', error.message);
//   }
// };

// // ============================================
// // RAZORPAY PAYMENT ROUTES
// // ============================================

// export const createRazorpayOrder = async (req, res) => {
//   try {
//     const { planId, planName, amount, currency = 'INR' } = req.body;
    
//     console.log('📦 Creating Razorpay order:', { planId, planName, amount, currency });
    
//     if (!planId || !amount || amount <= 0) {
//       return res.status(400).json({
//         success: false,
//         error: 'Invalid plan or amount'
//       });
//     }
    
//     const razorpay = getRazorpayInstance();
    
//     if (!razorpay) {
//       return res.status(500).json({
//         success: false,
//         error: 'Payment gateway not configured. Please contact support.'
//       });
//     }
    
//     const amountInPaise = Math.round(amount * 100);
    
//     const options = {
//       amount: amountInPaise,
//       currency: currency.toUpperCase(),
//       receipt: `receipt_${planId}_${Date.now()}`,
//       payment_capture: 1,
//       notes: {
//         planId: planId,
//         planName: planName,
//         userId: req.user?.id || 'guest'
//       }
//     };
    
//     console.log('📝 Razorpay order options:', options);
    
//     const order = await razorpay.orders.create(options);
    
//     console.log('✅ Razorpay order created:', order.id);
    
//     return res.status(200).json({
//       success: true,
//       orderId: order.id,
//       amount: order.amount,
//       currency: order.currency,
//       keyId: process.env.RAZORPAY_KEY_ID
//     });
    
//   } catch (error) {
//     console.error('❌ Razorpay order creation error:', error);
//     return res.status(500).json({
//       success: false,
//       error: error.message || 'Failed to create payment order',
//       details: process.env.NODE_ENV === 'development' ? error.stack : undefined
//     });
//   }
// };

// // ============================================
// // FIXED: verifyRazorpayPayment with proper validation and logging
// // ============================================
// export const verifyRazorpayPayment = async (req, res) => {
//   try {
//     // Log the entire request body for debugging
//     console.log('📥 Received verification request body:', JSON.stringify(req.body, null, 2));
//     console.log('📥 Headers:', req.headers.authorization ? 'Bearer token present' : 'No token');
    
//     const { orderId, paymentId, signature, planId, subscriptionId } = req.body;
    
//     console.log('🔐 Verifying Razorpay payment details:', { 
//       orderId, 
//       paymentId, 
//       signature: signature ? signature.substring(0, 20) + '...' : 'missing', 
//       planId, 
//       subscriptionId 
//     });
    
//     // ✅ Validate all required fields are present with specific error messages
//     if (!orderId) {
//       console.error('❌ Missing orderId');
//       return res.status(400).json({
//         success: false,
//         error: 'Missing payment verification details. Please provide orderId.'
//       });
//     }
    
//     if (!paymentId) {
//       console.error('❌ Missing paymentId');
//       return res.status(400).json({
//         success: false,
//         error: 'Missing payment verification details. Please provide paymentId.'
//       });
//     }
    
//     if (!signature) {
//       console.error('❌ Missing signature');
//       return res.status(400).json({
//         success: false,
//         error: 'Missing payment verification details. Please provide signature.'
//       });
//     }
    
//     // Verify signature
//     const body = orderId + "|" + paymentId;
//     const expectedSignature = crypto
//       .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(body.toString())
//       .digest('hex');
    
//     console.log('🔐 Signature verification:', { 
//       received: signature.substring(0, 20) + '...', 
//       expected: expectedSignature.substring(0, 20) + '...',
//       matches: expectedSignature === signature
//     });
    
//     if (expectedSignature !== signature) {
//       console.error('❌ Invalid payment signature');
//       return res.status(400).json({
//         success: false,
//         error: 'Invalid payment signature'
//       });
//     }
    
//     console.log('✅ Payment signature verified successfully');
    
//     // Get plan details
//     const planDetails = await SubscriptionPlan.findOne({ planId: planId || 'basic' });
//     if (!planDetails) {
//       console.error('❌ Plan not found:', planId);
//       return res.status(404).json({
//         success: false,
//         error: 'Plan not found'
//       });
//     }
    
//     // Calculate expiry date (30 days from now)
//     const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    
//     // Check if user already has an active subscription
//     let subscription = await Subscription.findOne({
//       user: req.user.id,
//       plan: planId,
//       status: { $in: ['active', 'pending'] }
//     });
    
//     if (subscription) {
//       // Update existing subscription
//       subscription.status = 'active';
//       subscription.paymentId = paymentId;
//       subscription.orderId = orderId;
//       subscription.paymentMethod = 'razorpay';
//       subscription.verifiedAt = new Date();
//       subscription.expiresAt = expiresAt;
//       await subscription.save();
//       console.log('✅ Updated existing subscription:', subscription._id);
//     } else {
//       // Create new subscription
//       subscription = await Subscription.create({
//         user: req.user.id,
//         plan: planId || 'basic',
//         status: 'active',
//         price: {
//           amount: planDetails.price.amount,
//           currency: planDetails.price.currency
//         },
//         billingCycle: 'monthly',
//         paymentMethod: 'razorpay',
//         paymentId,
//         orderId,
//         expiresAt,
//         features: planDetails.features,
//         verifiedAt: new Date()
//       });
//       console.log('✅ Created new subscription:', subscription._id);
//     }
    
//     // Update user's subscription in User model
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': planId || 'basic',
//       'subscription.status': 'active',
//       'subscription.startedAt': new Date(),
//       'subscription.expiresAt': expiresAt,
//       'subscription.billingCycle': 'monthly',
//       'subscription.lastPaymentId': paymentId
//     });
    
//     console.log(`✅ Payment verified for user ${req.user.id}. Plan: ${planId} is now ACTIVE`);
    
//     return res.status(200).json({
//       success: true,
//       message: 'Payment verified and subscription activated',
//       subscription: {
//         id: subscription._id,
//         plan: subscription.plan,
//         status: subscription.status,
//         expiresAt: subscription.expiresAt
//       }
//     });
    
//   } catch (error) {
//     console.error('❌ Payment verification error:', error);
//     return res.status(500).json({
//       success: false,
//       error: error.message || 'Payment verification failed'
//     });
//   }
// };

// // ============================================
// // STRIPE PAYMENT ROUTES
// // ============================================

// export const createStripeCheckoutSession = async (req, res) => {
//   try {
//     const { planId, planName, amount, currency = 'inr', successUrl, cancelUrl } = req.body;
    
//     console.log('💰 Creating Stripe checkout session:', { planId, planName, amount, currency });
    
//     if (!planId || !amount || amount <= 0) {
//       return res.status(400).json({
//         success: false,
//         error: 'Invalid plan or amount'
//       });
//     }
    
//     const stripe = getStripeInstance();
    
//     if (!stripe) {
//       return res.status(500).json({
//         success: false,
//         error: 'Payment gateway not configured. Please contact support.'
//       });
//     }
    
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price_data: {
//             currency: currency.toLowerCase(),
//             product_data: {
//               name: `${planName} Plan`,
//               description: `Monthly subscription to ${planName} plan`,
//               metadata: {
//                 planId: planId,
//                 planName: planName
//               }
//             },
//             unit_amount: Math.round(amount * 100),
//             recurring: {
//               interval: 'month'
//             }
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'subscription',
//       success_url: successUrl || `${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard/subscriptions?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: cancelUrl || `${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard/subscriptions?canceled=true`,
//       client_reference_id: req.user.id,
//       metadata: {
//         planId: planId,
//         planName: planName,
//         userId: req.user.id
//       },
//       customer_email: req.user.email
//     });
    
//     console.log('✅ Stripe checkout session created:', session.id);
    
//     return res.status(200).json({
//       success: true,
//       sessionId: session.id,
//       sessionUrl: session.url
//     });
    
//   } catch (error) {
//     console.error('❌ Stripe checkout session creation error:', error);
//     return res.status(500).json({
//       success: false,
//       error: error.message || 'Failed to create checkout session'
//     });
//   }
// };

// export const createStripePaymentIntent = async (req, res) => {
//   try {
//     const { planId, planName, amount, currency = 'inr' } = req.body;
    
//     console.log('💰 Creating Stripe payment intent:', { planId, planName, amount, currency });
    
//     const stripe = getStripeInstance();
    
//     if (!stripe) {
//       return res.status(500).json({
//         success: false,
//         error: 'Payment gateway not configured'
//       });
//     }
    
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(amount * 100),
//       currency: currency.toLowerCase(),
//       metadata: {
//         planId,
//         planName,
//         userId: req.user.id
//       }
//     });
    
//     console.log('✅ Stripe payment intent created:', paymentIntent.id);
    
//     return res.status(200).json({
//       success: true,
//       clientSecret: paymentIntent.client_secret,
//       paymentIntentId: paymentIntent.id
//     });
    
//   } catch (error) {
//     console.error('❌ Stripe payment intent error:', error);
//     return res.status(500).json({
//       success: false,
//       error: error.message || 'Failed to create payment intent'
//     });
//   }
// };

// export const handleStripeWebhook = async (req, res) => {
//   try {
//     const stripe = getStripeInstance();
    
//     if (!stripe) {
//       return res.status(500).json({ error: 'Stripe not configured' });
//     }
    
//     const sig = req.headers['stripe-signature'];
//     let event;
    
//     try {
//       event = stripe.webhooks.constructEvent(
//         req.body,
//         sig,
//         process.env.STRIPE_WEBHOOK_SECRET
//       );
//     } catch (err) {
//       console.error('⚠️ Webhook signature verification failed:', err.message);
//       return res.status(400).send(`Webhook Error: ${err.message}`);
//     }
    
//     switch (event.type) {
//       case 'checkout.session.completed':
//         const session = event.data.object;
//         console.log('✅ Checkout session completed:', session.id);
        
//         await activateSubscription(
//           session.client_reference_id,
//           session.metadata.planId,
//           session.id,
//           session.payment_intent,
//           'stripe'
//         );
//         break;
        
//       case 'invoice.payment_succeeded':
//         const invoice = event.data.object;
//         console.log('✅ Invoice payment succeeded:', invoice.id);
//         break;
        
//       case 'customer.subscription.deleted':
//         const subscription = event.data.object;
//         console.log('❌ Customer subscription deleted:', subscription.id);
//         await handleSubscriptionCancellation(subscription.metadata.userId);
//         break;
        
//       default:
//         console.log(`Unhandled event type ${event.type}`);
//     }
    
//     res.json({ received: true });
    
//   } catch (error) {
//     console.error('❌ Webhook handling error:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

// export const verifyStripePayment = async (req, res) => {
//   try {
//     const { sessionId, planId } = req.body;
    
//     console.log('🔐 Verifying Stripe payment:', { sessionId, planId });
    
//     const stripe = getStripeInstance();
    
//     if (!stripe) {
//       return res.status(500).json({
//         success: false,
//         error: 'Payment gateway not configured'
//       });
//     }
    
//     const session = await stripe.checkout.sessions.retrieve(sessionId);
    
//     if (!session || session.payment_status !== 'paid') {
//       return res.status(400).json({
//         success: false,
//         error: 'Payment not completed'
//       });
//     }
    
//     const result = await activateSubscription(
//       req.user.id,
//       planId,
//       sessionId,
//       session.payment_intent,
//       'stripe'
//     );
    
//     return res.status(200).json({
//       success: true,
//       message: 'Payment verified and subscription activated',
//       subscription: result
//     });
    
//   } catch (error) {
//     console.error('❌ Stripe verification error:', error);
//     return res.status(500).json({
//       success: false,
//       error: error.message || 'Payment verification failed'
//     });
//   }
// };

// // ============================================
// // HELPER FUNCTIONS
// // ============================================

// const activateSubscription = async (userId, planId, paymentId, orderId, paymentMethod) => {
//   const planDetails = await SubscriptionPlan.findOne({ planId });
//   if (!planDetails) {
//     throw new Error('Plan not found');
//   }
  
//   const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  
//   let subscription = await Subscription.findOne({
//     user: userId,
//     plan: planId,
//     status: { $in: ['active', 'pending'] }
//   });
  
//   if (subscription) {
//     subscription.status = 'active';
//     subscription.paymentId = paymentId;
//     subscription.orderId = orderId;
//     subscription.paymentMethod = paymentMethod;
//     subscription.verifiedAt = new Date();
//     subscription.expiresAt = expiresAt;
//     await subscription.save();
//   } else {
//     subscription = await Subscription.create({
//       user: userId,
//       plan: planId,
//       status: 'active',
//       price: {
//         amount: planDetails.price.amount,
//         currency: planDetails.price.currency
//       },
//       billingCycle: 'monthly',
//       paymentMethod: paymentMethod,
//       paymentId,
//       orderId,
//       expiresAt,
//       features: planDetails.features,
//       verifiedAt: new Date()
//     });
//   }
  
//   await User.findByIdAndUpdate(userId, {
//     'subscription.plan': planId,
//     'subscription.status': 'active',
//     'subscription.startedAt': new Date(),
//     'subscription.expiresAt': expiresAt,
//     'subscription.billingCycle': 'monthly',
//     'subscription.lastPaymentId': paymentId
//   });
  
//   console.log(`✅ Payment verified for user ${userId}. Plan: ${planId} is now ACTIVE`);
  
//   return {
//     id: subscription._id,
//     plan: subscription.plan,
//     status: subscription.status,
//     expiresAt: subscription.expiresAt
//   };
// };

// const handleSubscriptionCancellation = async (userId) => {
//   if (!userId) return;
  
//   await Subscription.findOneAndUpdate(
//     { user: userId, status: 'active' },
//     { status: 'cancelled', cancelledAt: new Date() },
//     { sort: { createdAt: -1 } }
//   );
  
//   await User.findByIdAndUpdate(userId, {
//     'subscription.plan': 'free',
//     'subscription.status': 'cancelled'
//   });
  
//   console.log(`❌ Subscription cancelled for user ${userId}`);
// };

// // ============================================
// // PUBLIC ROUTES
// // ============================================

// export const getPlans = async (req, res, next) => {
//   try {
//     let plans = await SubscriptionPlan.find({ isActive: true })
//       .sort({ displayOrder: 1, 'price.amount': 1 });
    
//     if (plans.length === 0) {
//       await initializeDefaultPlans();
//       plans = await SubscriptionPlan.find({ isActive: true })
//         .sort({ displayOrder: 1, 'price.amount': 1 });
//     }
    
//     const formattedPlans = plans.reduce((acc, plan) => {
//       acc[plan.planId] = {
//         name: plan.displayName,
//         price: plan.price.amount,
//         currency: plan.price.currency,
//         features: plan.features,
//         limits: plan.limits,
//         badgeText: plan.badgeText,
//         recommended: plan.recommended,
//         description: plan.description
//       };
//       return acc;
//     }, {});
    
//     successResponse(res, formattedPlans);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriptionFeatures = async (req, res, next) => {
//   try {
//     let plans = await SubscriptionPlan.find({ isActive: true })
//       .sort({ displayOrder: 1, 'price.amount': 1 });
    
//     if (plans.length === 0) {
//       await initializeDefaultPlans();
//       plans = await SubscriptionPlan.find({ isActive: true })
//         .sort({ displayOrder: 1, 'price.amount': 1 });
//     }
    
//     successResponse(res, plans.map(plan => ({
//       id: plan.planId,
//       name: plan.displayName,
//       price: plan.price.amount,
//       currency: plan.price.currency,
//       features: plan.features,
//       limits: plan.limits,
//       badgeText: plan.badgeText,
//       recommended: plan.recommended,
//       description: plan.description
//     })));
//   } catch (error) {
//     next(error);
//   }
// };

// export const getCurrentSubscription = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
    
//     if (!user) {
//       return errorResponse(res, 'User not found', 404);
//     }
    
//     const subscription = await Subscription.findOne({
//       user: req.user.id,
//       status: 'active'
//     }).sort({ createdAt: -1 });
    
//     if (subscription) {
//       const planDetails = await SubscriptionPlan.findOne({ planId: subscription.plan });
      
//       const subscriptionData = {
//         plan: subscription.plan,
//         status: subscription.status,
//         price: subscription.price,
//         billingCycle: subscription.billingCycle,
//         startedAt: subscription.createdAt,
//         expiresAt: subscription.expiresAt,
//         features: subscription.features || (planDetails?.features || [])
//       };
      
//       return successResponse(res, subscriptionData);
//     }
    
//     if (user.subscription && user.subscription.plan !== 'free') {
//       const planDetails = await SubscriptionPlan.findOne({ planId: user.subscription.plan });
      
//       const subscriptionData = {
//         plan: user.subscription.plan,
//         status: user.subscription.status || 'active',
//         price: { amount: 0, currency: 'INR' },
//         billingCycle: user.subscription.billingCycle || 'monthly',
//         startedAt: user.subscription.startedAt,
//         expiresAt: user.subscription.expiresAt,
//         features: planDetails?.features || []
//       };
      
//       return successResponse(res, subscriptionData);
//     }
    
//     const freePlan = await SubscriptionPlan.findOne({ planId: 'free' });
    
//     successResponse(res, {
//       plan: 'free',
//       status: 'active',
//       price: { amount: 0, currency: 'INR' },
//       billingCycle: 'monthly',
//       startedAt: new Date(),
//       expiresAt: null,
//       features: freePlan?.features || ['Browse all content', 'Read public poems', 'Basic search']
//     });
//   } catch (error) {
//     console.error('Error in getCurrentSubscription:', error);
//     next(error);
//   }
// };

// export const subscribe = async (req, res, next) => {
//   try {
//     const { plan, billingCycle, paymentMethod, couponCode } = req.body;
    
//     let planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
    
//     if (!planDetails) {
//       await initializeDefaultPlans();
//       planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
      
//       if (!planDetails) {
//         return errorResponse(res, 'Invalid plan', 400);
//       }
//     }
    
//     const months = billingCycle === 'yearly' ? 12 : billingCycle === 'quarterly' ? 3 : 1;
//     let amount = planDetails.price.amount * months;
//     let discountAmount = 0;
    
//     if (couponCode) {
//       const coupon = coupons.find(c => c.code === couponCode.toUpperCase());
//       if (coupon && coupon.isActive && (!coupon.validUntil || new Date(coupon.validUntil) > new Date())) {
//         if (coupon.discountType === 'percentage') {
//           discountAmount = amount * coupon.discountValue / 100;
//         } else {
//           discountAmount = coupon.discountValue;
//         }
//         amount = Math.max(0, amount - discountAmount);
//         coupon.usedCount++;
//       }
//     }
    
//     const expiresAt = (plan === 'free' || amount === 0) ? null : new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000);
//     const status = (plan === 'free' || amount === 0) ? 'active' : 'pending';
    
//     const subscription = await Subscription.create({
//       user: req.user.id,
//       plan,
//       status,
//       price: { 
//         amount: amount, 
//         currency: planDetails.price.currency, 
//         originalAmount: planDetails.price.amount * months 
//       },
//       billingCycle: billingCycle || 'monthly',
//       paymentMethod: paymentMethod || (plan === 'free' ? 'free' : 'pending'),
//       expiresAt,
//       features: planDetails.features,
//       discountApplied: discountAmount > 0 ? { amount: discountAmount, coupon: couponCode } : null
//     });
    
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': plan,
//       'subscription.startedAt': new Date(),
//       'subscription.expiresAt': expiresAt,
//       'subscription.status': status,
//       'subscription.billingCycle': billingCycle || 'monthly'
//     });
    
//     console.log(`✅ User ${req.user.id} subscribed to ${plan} plan. Status: ${status}`);
    
//     if (plan === 'free' || amount === 0) {
//       return successResponse(res, { subscription, plan: planDetails }, 'Free subscription activated', 201);
//     }
    
//     successResponse(res, { 
//       subscription, 
//       plan: planDetails,
//       requiresPayment: true,
//       discountApplied: discountAmount > 0 ? { amount: discountAmount, finalAmount: amount } : null
//     }, 'Subscription initiated', 201);
//   } catch (error) {
//     console.error('Subscribe error:', error);
//     next(error);
//   }
// };

// export const verifyPayment = async (req, res, next) => {
//   try {
//     const { subscriptionId, paymentId, orderId, signature } = req.body;
    
//     if (signature && orderId) {
//       const body = orderId + "|" + paymentId;
//       const expectedSignature = crypto
//         .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'test_secret')
//         .update(body.toString())
//         .digest('hex');
      
//       if (expectedSignature !== signature) {
//         return errorResponse(res, 'Invalid payment signature', 400);
//       }
//     }
    
//     const subscription = await Subscription.findByIdAndUpdate(
//       subscriptionId,
//       { status: 'active', paymentId, verifiedAt: new Date() },
//       { new: true }
//     );
    
//     if (!subscription) {
//       return errorResponse(res, 'Subscription not found', 404);
//     }
    
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': subscription.plan,
//       'subscription.status': 'active',
//       'subscription.expiresAt': subscription.expiresAt,
//       'subscription.billingCycle': subscription.billingCycle,
//       'subscription.lastPaymentId': paymentId
//     });
    
//     console.log(`✅ Payment verified for user ${req.user.id}. Plan: ${subscription.plan} is now ACTIVE`);
    
//     successResponse(res, subscription, 'Payment verified and subscription activated');
//   } catch (error) {
//     console.error('Verify payment error:', error);
//     next(error);
//   }
// };

// export const cancelSubscription = async (req, res, next) => {
//   try {
//     const subscription = await Subscription.findOneAndUpdate(
//       { user: req.user.id, status: 'active' },
//       { status: 'cancelled', cancelledAt: new Date() },
//       { new: true, sort: { createdAt: -1 } }
//     );
    
//     if (!subscription) {
//       return errorResponse(res, 'No active subscription found', 404);
//     }
    
//     await User.findByIdAndUpdate(req.user.id, {
//       'subscription.plan': 'free',
//       'subscription.status': 'cancelled'
//     });
    
//     successResponse(res, subscription, 'Subscription cancelled');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getBillingHistory = async (req, res, next) => {
//   try {
//     const history = await Subscription.find({ user: req.user.id })
//       .sort({ createdAt: -1 });
    
//     successResponse(res, history);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // INVOICE ROUTES (Keep your existing implementation)
// // ============================================

// export const getInvoice = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const subscription = await Subscription.findById(id).populate('user', 'name email phone');
//     if (!subscription) return errorResponse(res, 'Invoice not found', 404);
//     if (subscription.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
//       return errorResponse(res, 'Unauthorized', 403);
//     }
//     successResponse(res, subscription);
//   } catch (error) {
//     next(error);
//   }
// };

// export const downloadInvoice = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const subscription = await Subscription.findById(id).populate('user', 'name email phone');
//     if (!subscription) return errorResponse(res, 'Invoice not found', 404);
//     // Return JSON for now, implement PDF generation later
//     successResponse(res, { message: 'Invoice download endpoint', subscription });
//   } catch (error) {
//     next(error);
//   }
// };

// export const sendInvoiceEmail = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     successResponse(res, null, 'Invoice email sent successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // PAYMENT METHODS (Keep your existing implementation)
// // ============================================

// export const getPaymentMethods = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
//     const methods = user.paymentMethods || [];
//     const maskedMethods = methods.map(method => ({
//       _id: method._id,
//       cardNumber: `•••• •••• •••• ${method.lastFourDigits || '****'}`,
//       cardHolder: method.cardHolder,
//       expiryMonth: method.expiryMonth,
//       expiryYear: method.expiryYear,
//       cardBrand: method.cardBrand,
//       isDefault: method.isDefault
//     }));
//     successResponse(res, maskedMethods);
//   } catch (error) {
//     next(error);
//   }
// };

// export const addPaymentMethod = async (req, res, next) => {
//   try {
//     const { cardNumber, cardHolder, expiryMonth, expiryYear } = req.body;
//     if (!cardNumber || !cardHolder) return errorResponse(res, 'Card number and holder name required', 400);
//     const user = await User.findById(req.user.id);
//     if (!user.paymentMethods) user.paymentMethods = [];
//     const lastFourDigits = cardNumber.replace(/\s/g, '').slice(-4);
//     const newMethod = {
//       _id: new mongoose.Types.ObjectId(),
//       cardNumber: cardNumber.replace(/\s/g, ''),
//       cardHolder: cardHolder.toUpperCase(),
//       expiryMonth,
//       expiryYear,
//       lastFourDigits,
//       cardBrand: cardNumber.startsWith('4') ? 'visa' : 'mastercard',
//       isDefault: user.paymentMethods.length === 0,
//       createdAt: new Date()
//     };
//     user.paymentMethods.push(newMethod);
//     await user.save();
//     successResponse(res, { _id: newMethod._id, cardNumber: `•••• •••• •••• ${lastFourDigits}`, cardHolder: newMethod.cardHolder, isDefault: newMethod.isDefault }, 'Payment method added');
//   } catch (error) {
//     next(error);
//   }
// };

// export const removePaymentMethod = async (req, res, next) => {
//   try {
//     const { methodId } = req.params;
//     const user = await User.findById(req.user.id);
//     if (!user.paymentMethods) return errorResponse(res, 'No payment methods found', 404);
//     const methodIndex = user.paymentMethods.findIndex(m => m._id.toString() === methodId);
//     if (methodIndex === -1) return errorResponse(res, 'Payment method not found', 404);
//     if (user.paymentMethods.length === 1) return errorResponse(res, 'Cannot remove the only payment method', 400);
//     const wasDefault = user.paymentMethods[methodIndex].isDefault;
//     user.paymentMethods.splice(methodIndex, 1);
//     if (wasDefault && user.paymentMethods.length > 0) user.paymentMethods[0].isDefault = true;
//     await user.save();
//     successResponse(res, null, 'Payment method removed');
//   } catch (error) {
//     next(error);
//   }
// };

// export const setDefaultPaymentMethod = async (req, res, next) => {
//   try {
//     const { methodId } = req.params;
//     const user = await User.findById(req.user.id);
//     if (!user.paymentMethods) return errorResponse(res, 'No payment methods found', 404);
//     user.paymentMethods.forEach(method => { method.isDefault = method._id.toString() === methodId; });
//     await user.save();
//     successResponse(res, null, 'Default payment method updated');
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // COUPON ROUTES
// // ============================================

// export const validateCoupon = async (req, res, next) => {
//   try {
//     const { code } = req.params;
//     const coupon = coupons.find(c => c.code === code.toUpperCase());
//     if (!coupon) return errorResponse(res, 'Invalid coupon code', 404);
//     successResponse(res, coupon);
//   } catch (error) {
//     next(error);
//   }
// };

// export const applyCoupon = async (req, res, next) => {
//   try {
//     const { code, plan, amount } = req.body;
//     const coupon = coupons.find(c => c.code === code.toUpperCase());
//     if (!coupon) return errorResponse(res, 'Invalid coupon code', 404);
//     if (!coupon.isActive) return errorResponse(res, 'Coupon is not active', 400);
//     if (coupon.validUntil && new Date(coupon.validUntil) < new Date()) return errorResponse(res, 'Coupon has expired', 400);
//     if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) return errorResponse(res, 'Coupon usage limit exceeded', 400);
//     if (plan && coupon.applicablePlans && !coupon.applicablePlans.includes(plan)) return errorResponse(res, `Coupon not applicable for ${plan} plan`, 400);
//     let discountAmount = coupon.discountType === 'percentage' ? amount * coupon.discountValue / 100 : coupon.discountValue;
//     const finalAmount = Math.max(0, amount - discountAmount);
//     coupon.usedCount++;
//     successResponse(res, { discountAmount, finalAmount, savedAmount: amount - finalAmount });
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // ADMIN CMS ROUTES
// // ============================================

// export const getAllPlansCMS = async (req, res, next) => {
//   try {
//     const plans = await SubscriptionPlan.find().sort({ displayOrder: 1 });
//     successResponse(res, plans);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getPlanByIdCMS = async (req, res, next) => {
//   try {
//     const plan = await SubscriptionPlan.findById(req.params.id);
//     if (!plan) return errorResponse(res, 'Plan not found', 404);
//     successResponse(res, plan);
//   } catch (error) {
//     next(error);
//   }
// };

// export const createPlanCMS = async (req, res, next) => {
//   try {
//     const plan = await SubscriptionPlan.create(req.body);
//     successResponse(res, plan, 'Plan created successfully', 201);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updatePlanCMS = async (req, res, next) => {
//   try {
//     const plan = await SubscriptionPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!plan) return errorResponse(res, 'Plan not found', 404);
//     successResponse(res, plan, 'Plan updated successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const deletePlanCMS = async (req, res, next) => {
//   try {
//     const plan = await SubscriptionPlan.findByIdAndDelete(req.params.id);
//     if (!plan) return errorResponse(res, 'Plan not found', 404);
//     successResponse(res, null, 'Plan deleted successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const togglePlanStatusCMS = async (req, res, next) => {
//   try {
//     const plan = await SubscriptionPlan.findById(req.params.id);
//     if (!plan) return errorResponse(res, 'Plan not found', 404);
//     plan.isActive = !plan.isActive;
//     await plan.save();
//     successResponse(res, plan, `Plan ${plan.isActive ? 'activated' : 'deactivated'}`);
//   } catch (error) {
//     next(error);
//   }
// };

// export const reorderPlansCMS = async (req, res, next) => {
//   try {
//     const { orders } = req.body;
//     for (const { id, order } of orders) {
//       await SubscriptionPlan.findByIdAndUpdate(id, { displayOrder: order });
//     }
//     successResponse(res, null, 'Plans reordered successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriptionStatsCMS = async (req, res, next) => {
//   try {
//     const totalPlans = await SubscriptionPlan.countDocuments();
//     const activePlans = await SubscriptionPlan.countDocuments({ isActive: true });
//     const totalUsers = await User.countDocuments();
//     const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });
//     successResponse(res, { totalPlans, activePlans, totalUsers, activeSubscriptions });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getAllSubscribers = async (req, res, next) => {
//   try {
//     const subscribers = await Subscription.find().populate('user', 'name email');
//     successResponse(res, subscribers);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubscriberById = async (req, res, next) => {
//   try {
//     const subscriber = await Subscription.findById(req.params.id).populate('user', 'name email');
//     if (!subscriber) return errorResponse(res, 'Subscriber not found', 404);
//     successResponse(res, subscriber);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getAllTransactions = async (req, res, next) => {
//   try {
//     const transactions = await Subscription.find().populate('user', 'name email').sort({ createdAt: -1 });
//     successResponse(res, transactions);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getTransactionById = async (req, res, next) => {
//   try {
//     const transaction = await Subscription.findById(req.params.id).populate('user', 'name email');
//     if (!transaction) return errorResponse(res, 'Transaction not found', 404);
//     successResponse(res, transaction);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getTransactionStats = async (req, res, next) => {
//   try {
//     const totalRevenue = await Subscription.aggregate([
//       { $match: { status: 'active', 'price.amount': { $gt: 0 } } },
//       { $group: { _id: null, total: { $sum: '$price.amount' } } }
//     ]);
//     successResponse(res, { totalRevenue: totalRevenue[0]?.total || 0 });
//   } catch (error) {
//     next(error);
//   }
// };

// // Initialize default plans when server starts
// initializeDefaultPlans().catch(console.error);



















// server/controllers/subscription.controller.js
import { Subscription, SubscriptionPlan } from '../models/Subscription.js';
import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/response.js';
import crypto from 'crypto';
import mongoose from 'mongoose';
import PDFDocument from 'pdfkit';
import Razorpay from 'razorpay';
import Stripe from 'stripe';

// Initialize Razorpay
let razorpayInstance = null;

const getRazorpayInstance = () => {
  if (!razorpayInstance) {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.warn('⚠️ Razorpay keys not configured. Payment features will not work.');
      return null;
    }
    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });
  }
  return razorpayInstance;
};

// Initialize Stripe
let stripeInstance = null;

const getStripeInstance = () => {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      console.warn('⚠️ Stripe keys not configured. Payment features will not work.');
      return null;
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripeInstance;
};

// Default plans (fallback if database is empty)
const defaultPlans = [
  {
    planId: 'free',
    name: 'free',
    displayName: 'Free',
    description: 'Perfect for getting started',
    price: { amount: 0, currency: 'INR' },
    billingCycle: 'monthly',
    features: [
      'Browse all content',
      'Read public poems',
      'Basic search',
      '50 poems/day'
    ],
    limits: {
      poemsPerDay: 50,
      ebooksPerMonth: 2,
      audiobooksPerMonth: 5,
      unlimited: false,
      creator: false
    },
    isActive: true,
    displayOrder: 0,
    badgeText: '',
    recommended: false
  },
  {
    planId: 'basic',
    name: 'basic',
    displayName: 'Basic',
    description: 'Great for regular readers',
    price: { amount: 99, currency: 'INR' },
    billingCycle: 'monthly',
    features: [
      'All free features',
      'Unlimited poem reading',
      'Download 5 ebooks/month',
      'Basic audio streaming'
    ],
    limits: {
      poemsPerDay: null,
      ebooksPerMonth: 5,
      audiobooksPerMonth: 3,
      unlimited: false,
      creator: false
    },
    isActive: true,
    displayOrder: 1,
    badgeText: 'Popular',
    recommended: true
  },
  {
    planId: 'premium',
    name: 'premium',
    displayName: 'Premium',
    description: 'For serious literature enthusiasts',
    price: { amount: 199, currency: 'INR' },
    billingCycle: 'monthly',
    features: [
      'All Basic features',
      'Unlimited downloads',
      'HD audio streaming',
      'Ad-free experience',
      'AI explanations'
    ],
    limits: {
      poemsPerDay: null,
      ebooksPerMonth: null,
      audiobooksPerMonth: null,
      unlimited: true,
      creator: false
    },
    isActive: true,
    displayOrder: 2,
    badgeText: 'Best Value',
    recommended: true
  },
  {
    planId: 'pro',
    name: 'pro',
    displayName: 'Pro',
    description: 'For creators and power users',
    price: { amount: 499, currency: 'INR' },
    billingCycle: 'monthly',
    features: [
      'All Premium features',
      'Creator tools',
      'Priority support',
      'Analytics dashboard',
      'Early access'
    ],
    limits: {
      poemsPerDay: null,
      ebooksPerMonth: null,
      audiobooksPerMonth: null,
      unlimited: true,
      creator: true
    },
    isActive: true,
    displayOrder: 3,
    badgeText: 'Creator',
    recommended: false
  }
];

// Coupons store
let coupons = [
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    discountValue: 10,
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    usageLimit: 100,
    usedCount: 0,
    minAmount: 0,
    applicablePlans: ['basic', 'premium', 'pro'],
    isActive: true
  },
  {
    code: 'SAVE20',
    discountType: 'percentage',
    discountValue: 20,
    validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    usageLimit: 50,
    usedCount: 0,
    minAmount: 500,
    applicablePlans: ['premium', 'pro'],
    isActive: true
  },
  {
    code: 'FLAT100',
    discountType: 'fixed',
    discountValue: 100,
    validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    usageLimit: 30,
    usedCount: 0,
    minAmount: 300,
    applicablePlans: ['basic', 'premium', 'pro'],
    isActive: true
  }
];

// Initialize default plans
const initializeDefaultPlans = async () => {
  try {
    for (const planData of defaultPlans) {
      const existingPlan = await SubscriptionPlan.findOne({ planId: planData.planId });
      if (!existingPlan) {
        await SubscriptionPlan.create(planData);
        console.log(`✅ Created default plan: ${planData.planId}`);
      }
    }
    console.log('✅ Default plans initialized');
  } catch (error) {
    console.error('❌ Error initializing plans:', error.message);
  }
};

// ============================================
// RAZORPAY PAYMENT ROUTES
// ============================================

export const createRazorpayOrder = async (req, res) => {
  try {
    const { planId, planName, amount, currency = 'INR' } = req.body;
    
    console.log('📦 Creating Razorpay order:', { planId, planName, amount, currency });
    
    if (!planId || !amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid plan or amount'
      });
    }
    
    const razorpay = getRazorpayInstance();
    
    if (!razorpay) {
      return res.status(500).json({
        success: false,
        error: 'Payment gateway not configured. Please contact support.'
      });
    }
    
    const amountInPaise = Math.round(amount * 100);
    
    const options = {
      amount: amountInPaise,
      currency: currency.toUpperCase(),
      receipt: `receipt_${planId}_${Date.now()}`,
      payment_capture: 1,
      notes: {
        planId: planId,
        planName: planName,
        userId: req.user?.id || 'guest'
      }
    };
    
    console.log('📝 Razorpay order options:', options);
    
    const order = await razorpay.orders.create(options);
    
    console.log('✅ Razorpay order created:', order.id);
    
    return res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID
    });
    
  } catch (error) {
    console.error('❌ Razorpay order creation error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to create payment order',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// ============================================
// FIXED: verifyRazorpayPayment with proper validation and logging
// ============================================
export const verifyRazorpayPayment = async (req, res) => {
  try {
    // Log the entire request body for debugging
    console.log('📥 Received verification request body:', JSON.stringify(req.body, null, 2));
    console.log('📥 Headers:', req.headers.authorization ? 'Bearer token present' : 'No token');
    
    const { orderId, paymentId, signature, planId, subscriptionId } = req.body;
    
    console.log('🔐 Verifying Razorpay payment details:', { 
      orderId, 
      paymentId, 
      signature: signature ? signature.substring(0, 20) + '...' : 'missing', 
      planId, 
      subscriptionId 
    });
    
    // ✅ Validate all required fields are present with specific error messages
    if (!orderId) {
      console.error('❌ Missing orderId');
      return res.status(400).json({
        success: false,
        error: 'Missing payment verification details. Please provide orderId.'
      });
    }
    
    if (!paymentId) {
      console.error('❌ Missing paymentId');
      return res.status(400).json({
        success: false,
        error: 'Missing payment verification details. Please provide paymentId.'
      });
    }
    
    if (!signature) {
      console.error('❌ Missing signature');
      return res.status(400).json({
        success: false,
        error: 'Missing payment verification details. Please provide signature.'
      });
    }
    
    // Verify signature
    const body = orderId + "|" + paymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');
    
    console.log('🔐 Signature verification:', { 
      received: signature.substring(0, 20) + '...', 
      expected: expectedSignature.substring(0, 20) + '...',
      matches: expectedSignature === signature
    });
    
    if (expectedSignature !== signature) {
      console.error('❌ Invalid payment signature');
      return res.status(400).json({
        success: false,
        error: 'Invalid payment signature'
      });
    }
    
    console.log('✅ Payment signature verified successfully');
    
    // Get plan details
    const planDetails = await SubscriptionPlan.findOne({ planId: planId || 'basic' });
    if (!planDetails) {
      console.error('❌ Plan not found:', planId);
      return res.status(404).json({
        success: false,
        error: 'Plan not found'
      });
    }
    
    // Calculate expiry date (30 days from now)
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    
    // Check if user already has an active subscription
    let subscription = await Subscription.findOne({
      user: req.user.id,
      plan: planId,
      status: { $in: ['active', 'pending'] }
    });
    
    if (subscription) {
      // Update existing subscription
      subscription.status = 'active';
      subscription.paymentId = paymentId;
      subscription.orderId = orderId;
      subscription.paymentMethod = 'razorpay';
      subscription.verifiedAt = new Date();
      subscription.expiresAt = expiresAt;
      await subscription.save();
      console.log('✅ Updated existing subscription:', subscription._id);
    } else {
      // Create new subscription
      subscription = await Subscription.create({
        user: req.user.id,
        plan: planId || 'basic',
        status: 'active',
        price: {
          amount: planDetails.price.amount,
          currency: planDetails.price.currency
        },
        billingCycle: 'monthly',
        paymentMethod: 'razorpay',
        paymentId,
        orderId,
        expiresAt,
        features: planDetails.features,
        verifiedAt: new Date()
      });
      console.log('✅ Created new subscription:', subscription._id);
    }
    
    // Update user's subscription in User model
    await User.findByIdAndUpdate(req.user.id, {
      'subscription.plan': planId || 'basic',
      'subscription.status': 'active',
      'subscription.startedAt': new Date(),
      'subscription.expiresAt': expiresAt,
      'subscription.billingCycle': 'monthly',
      'subscription.lastPaymentId': paymentId
    });
    
    console.log(`✅ Payment verified for user ${req.user.id}. Plan: ${planId} is now ACTIVE`);
    
    return res.status(200).json({
      success: true,
      message: 'Payment verified and subscription activated',
      subscription: {
        id: subscription._id,
        plan: subscription.plan,
        status: subscription.status,
        expiresAt: subscription.expiresAt
      }
    });
    
  } catch (error) {
    console.error('❌ Payment verification error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Payment verification failed'
    });
  }
};

// ============================================
// STRIPE PAYMENT ROUTES
// ============================================

export const createStripeCheckoutSession = async (req, res) => {
  try {
    const { planId, planName, amount, currency = 'inr', successUrl, cancelUrl } = req.body;
    
    console.log('💰 Creating Stripe checkout session:', { planId, planName, amount, currency });
    
    if (!planId || !amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid plan or amount'
      });
    }
    
    const stripe = getStripeInstance();
    
    if (!stripe) {
      return res.status(500).json({
        success: false,
        error: 'Payment gateway not configured. Please contact support.'
      });
    }
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: `${planName} Plan`,
              description: `Monthly subscription to ${planName} plan`,
              metadata: {
                planId: planId,
                planName: planName
              }
            },
            unit_amount: Math.round(amount * 100),
            recurring: {
              interval: 'month'
            }
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl || `${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard/subscriptions?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard/subscriptions?canceled=true`,
      client_reference_id: req.user.id,
      metadata: {
        planId: planId,
        planName: planName,
        userId: req.user.id
      },
      customer_email: req.user.email
    });
    
    console.log('✅ Stripe checkout session created:', session.id);
    
    return res.status(200).json({
      success: true,
      sessionId: session.id,
      sessionUrl: session.url
    });
    
  } catch (error) {
    console.error('❌ Stripe checkout session creation error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to create checkout session'
    });
  }
};

export const createStripePaymentIntent = async (req, res) => {
  try {
    const { planId, planName, amount, currency = 'inr' } = req.body;
    
    console.log('💰 Creating Stripe payment intent:', { planId, planName, amount, currency });
    
    const stripe = getStripeInstance();
    
    if (!stripe) {
      return res.status(500).json({
        success: false,
        error: 'Payment gateway not configured'
      });
    }
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: currency.toLowerCase(),
      metadata: {
        planId,
        planName,
        userId: req.user.id
      }
    });
    
    console.log('✅ Stripe payment intent created:', paymentIntent.id);
    
    return res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
    
  } catch (error) {
    console.error('❌ Stripe payment intent error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to create payment intent'
    });
  }
};

export const handleStripeWebhook = async (req, res) => {
  try {
    const stripe = getStripeInstance();
    
    if (!stripe) {
      return res.status(500).json({ error: 'Stripe not configured' });
    }
    
    const sig = req.headers['stripe-signature'];
    let event;
    
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error('⚠️ Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log('✅ Checkout session completed:', session.id);
        
        await activateSubscription(
          session.client_reference_id,
          session.metadata.planId,
          session.id,
          session.payment_intent,
          'stripe'
        );
        break;
        
      case 'invoice.payment_succeeded':
        const invoice = event.data.object;
        console.log('✅ Invoice payment succeeded:', invoice.id);
        break;
        
      case 'customer.subscription.deleted':
        const subscription = event.data.object;
        console.log('❌ Customer subscription deleted:', subscription.id);
        await handleSubscriptionCancellation(subscription.metadata.userId);
        break;
        
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    
    res.json({ received: true });
    
  } catch (error) {
    console.error('❌ Webhook handling error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const verifyStripePayment = async (req, res) => {
  try {
    const { sessionId, planId } = req.body;
    
    console.log('🔐 Verifying Stripe payment:', { sessionId, planId });
    
    const stripe = getStripeInstance();
    
    if (!stripe) {
      return res.status(500).json({
        success: false,
        error: 'Payment gateway not configured'
      });
    }
    
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (!session || session.payment_status !== 'paid') {
      return res.status(400).json({
        success: false,
        error: 'Payment not completed'
      });
    }
    
    const result = await activateSubscription(
      req.user.id,
      planId,
      sessionId,
      session.payment_intent,
      'stripe'
    );
    
    return res.status(200).json({
      success: true,
      message: 'Payment verified and subscription activated',
      subscription: result
    });
    
  } catch (error) {
    console.error('❌ Stripe verification error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Payment verification failed'
    });
  }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

const activateSubscription = async (userId, planId, paymentId, orderId, paymentMethod) => {
  const planDetails = await SubscriptionPlan.findOne({ planId });
  if (!planDetails) {
    throw new Error('Plan not found');
  }
  
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  
  let subscription = await Subscription.findOne({
    user: userId,
    plan: planId,
    status: { $in: ['active', 'pending'] }
  });
  
  if (subscription) {
    subscription.status = 'active';
    subscription.paymentId = paymentId;
    subscription.orderId = orderId;
    subscription.paymentMethod = paymentMethod;
    subscription.verifiedAt = new Date();
    subscription.expiresAt = expiresAt;
    await subscription.save();
  } else {
    subscription = await Subscription.create({
      user: userId,
      plan: planId,
      status: 'active',
      price: {
        amount: planDetails.price.amount,
        currency: planDetails.price.currency
      },
      billingCycle: 'monthly',
      paymentMethod: paymentMethod,
      paymentId,
      orderId,
      expiresAt,
      features: planDetails.features,
      verifiedAt: new Date()
    });
  }
  
  await User.findByIdAndUpdate(userId, {
    'subscription.plan': planId,
    'subscription.status': 'active',
    'subscription.startedAt': new Date(),
    'subscription.expiresAt': expiresAt,
    'subscription.billingCycle': 'monthly',
    'subscription.lastPaymentId': paymentId
  });
  
  console.log(`✅ Payment verified for user ${userId}. Plan: ${planId} is now ACTIVE`);
  
  return {
    id: subscription._id,
    plan: subscription.plan,
    status: subscription.status,
    expiresAt: subscription.expiresAt
  };
};

const handleSubscriptionCancellation = async (userId) => {
  if (!userId) return;
  
  await Subscription.findOneAndUpdate(
    { user: userId, status: 'active' },
    { status: 'cancelled', cancelledAt: new Date() },
    { sort: { createdAt: -1 } }
  );
  
  await User.findByIdAndUpdate(userId, {
    'subscription.plan': 'free',
    'subscription.status': 'cancelled'
  });
  
  console.log(`❌ Subscription cancelled for user ${userId}`);
};

// ============================================
// PUBLIC ROUTES
// ============================================

export const getPlans = async (req, res, next) => {
  try {
    let plans = await SubscriptionPlan.find({ isActive: true })
      .sort({ displayOrder: 1, 'price.amount': 1 });
    
    if (plans.length === 0) {
      await initializeDefaultPlans();
      plans = await SubscriptionPlan.find({ isActive: true })
        .sort({ displayOrder: 1, 'price.amount': 1 });
    }
    
    const formattedPlans = plans.reduce((acc, plan) => {
      acc[plan.planId] = {
        name: plan.displayName,
        price: plan.price.amount,
        currency: plan.price.currency,
        features: plan.features,
        limits: plan.limits,
        badgeText: plan.badgeText,
        recommended: plan.recommended,
        description: plan.description
      };
      return acc;
    }, {});
    
    successResponse(res, formattedPlans);
  } catch (error) {
    next(error);
  }
};

export const getSubscriptionFeatures = async (req, res, next) => {
  try {
    let plans = await SubscriptionPlan.find({ isActive: true })
      .sort({ displayOrder: 1, 'price.amount': 1 });
    
    if (plans.length === 0) {
      await initializeDefaultPlans();
      plans = await SubscriptionPlan.find({ isActive: true })
        .sort({ displayOrder: 1, 'price.amount': 1 });
    }
    
    successResponse(res, plans.map(plan => ({
      id: plan.planId,
      name: plan.displayName,
      price: plan.price.amount,
      currency: plan.price.currency,
      features: plan.features,
      limits: plan.limits,
      badgeText: plan.badgeText,
      recommended: plan.recommended,
      description: plan.description
    })));
  } catch (error) {
    next(error);
  }
};

export const getCurrentSubscription = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }
    
    const subscription = await Subscription.findOne({
      user: req.user.id,
      status: 'active'
    }).sort({ createdAt: -1 });
    
    if (subscription) {
      const planDetails = await SubscriptionPlan.findOne({ planId: subscription.plan });
      
      const subscriptionData = {
        plan: subscription.plan,
        status: subscription.status,
        price: subscription.price,
        billingCycle: subscription.billingCycle,
        startedAt: subscription.createdAt,
        expiresAt: subscription.expiresAt,
        features: subscription.features || (planDetails?.features || [])
      };
      
      return successResponse(res, subscriptionData);
    }
    
    if (user.subscription && user.subscription.plan !== 'free') {
      const planDetails = await SubscriptionPlan.findOne({ planId: user.subscription.plan });
      
      const subscriptionData = {
        plan: user.subscription.plan,
        status: user.subscription.status || 'active',
        price: { amount: 0, currency: 'INR' },
        billingCycle: user.subscription.billingCycle || 'monthly',
        startedAt: user.subscription.startedAt,
        expiresAt: user.subscription.expiresAt,
        features: planDetails?.features || []
      };
      
      return successResponse(res, subscriptionData);
    }
    
    const freePlan = await SubscriptionPlan.findOne({ planId: 'free' });
    
    successResponse(res, {
      plan: 'free',
      status: 'active',
      price: { amount: 0, currency: 'INR' },
      billingCycle: 'monthly',
      startedAt: new Date(),
      expiresAt: null,
      features: freePlan?.features || ['Browse all content', 'Read public poems', 'Basic search']
    });
  } catch (error) {
    console.error('Error in getCurrentSubscription:', error);
    next(error);
  }
};

export const subscribe = async (req, res, next) => {
  try {
    const { plan, billingCycle, paymentMethod, couponCode } = req.body;
    
    let planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
    
    if (!planDetails) {
      await initializeDefaultPlans();
      planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
      
      if (!planDetails) {
        return errorResponse(res, 'Invalid plan', 400);
      }
    }
    
    const months = billingCycle === 'yearly' ? 12 : billingCycle === 'quarterly' ? 3 : 1;
    let amount = planDetails.price.amount * months;
    let discountAmount = 0;
    
    if (couponCode) {
      const coupon = coupons.find(c => c.code === couponCode.toUpperCase());
      if (coupon && coupon.isActive && (!coupon.validUntil || new Date(coupon.validUntil) > new Date())) {
        if (coupon.discountType === 'percentage') {
          discountAmount = amount * coupon.discountValue / 100;
        } else {
          discountAmount = coupon.discountValue;
        }
        amount = Math.max(0, amount - discountAmount);
        coupon.usedCount++;
      }
    }
    
    const expiresAt = (plan === 'free' || amount === 0) ? null : new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000);
    const status = (plan === 'free' || amount === 0) ? 'active' : 'pending';
    
    const subscription = await Subscription.create({
      user: req.user.id,
      plan,
      status,
      price: { 
        amount: amount, 
        currency: planDetails.price.currency, 
        originalAmount: planDetails.price.amount * months 
      },
      billingCycle: billingCycle || 'monthly',
      paymentMethod: paymentMethod || (plan === 'free' ? 'free' : 'pending'),
      expiresAt,
      features: planDetails.features,
      discountApplied: discountAmount > 0 ? { amount: discountAmount, coupon: couponCode } : null
    });
    
    await User.findByIdAndUpdate(req.user.id, {
      'subscription.plan': plan,
      'subscription.startedAt': new Date(),
      'subscription.expiresAt': expiresAt,
      'subscription.status': status,
      'subscription.billingCycle': billingCycle || 'monthly'
    });
    
    console.log(`✅ User ${req.user.id} subscribed to ${plan} plan. Status: ${status}`);
    
    if (plan === 'free' || amount === 0) {
      return successResponse(res, { subscription, plan: planDetails }, 'Free subscription activated', 201);
    }
    
    successResponse(res, { 
      subscription, 
      plan: planDetails,
      requiresPayment: true,
      discountApplied: discountAmount > 0 ? { amount: discountAmount, finalAmount: amount } : null
    }, 'Subscription initiated', 201);
  } catch (error) {
    console.error('Subscribe error:', error);
    next(error);
  }
};

export const verifyPayment = async (req, res, next) => {
  try {
    const { subscriptionId, paymentId, orderId, signature } = req.body;
    
    if (signature && orderId) {
      const body = orderId + "|" + paymentId;
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'test_secret')
        .update(body.toString())
        .digest('hex');
      
      if (expectedSignature !== signature) {
        return errorResponse(res, 'Invalid payment signature', 400);
      }
    }
    
    const subscription = await Subscription.findByIdAndUpdate(
      subscriptionId,
      { status: 'active', paymentId, verifiedAt: new Date() },
      { new: true }
    );
    
    if (!subscription) {
      return errorResponse(res, 'Subscription not found', 404);
    }
    
    await User.findByIdAndUpdate(req.user.id, {
      'subscription.plan': subscription.plan,
      'subscription.status': 'active',
      'subscription.expiresAt': subscription.expiresAt,
      'subscription.billingCycle': subscription.billingCycle,
      'subscription.lastPaymentId': paymentId
    });
    
    console.log(`✅ Payment verified for user ${req.user.id}. Plan: ${subscription.plan} is now ACTIVE`);
    
    successResponse(res, subscription, 'Payment verified and subscription activated');
  } catch (error) {
    console.error('Verify payment error:', error);
    next(error);
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findOneAndUpdate(
      { user: req.user.id, status: 'active' },
      { status: 'cancelled', cancelledAt: new Date() },
      { new: true, sort: { createdAt: -1 } }
    );
    
    if (!subscription) {
      return errorResponse(res, 'No active subscription found', 404);
    }
    
    await User.findByIdAndUpdate(req.user.id, {
      'subscription.plan': 'free',
      'subscription.status': 'cancelled'
    });
    
    successResponse(res, subscription, 'Subscription cancelled');
  } catch (error) {
    next(error);
  }
};

export const getBillingHistory = async (req, res, next) => {
  try {
    const history = await Subscription.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    
    successResponse(res, history);
  } catch (error) {
    next(error);
  }
};

// ============================================
// INVOICE ROUTES (Keep your existing implementation)
// ============================================

// export const getInvoice = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const subscription = await Subscription.findById(id).populate('user', 'name email phone');
//     if (!subscription) return errorResponse(res, 'Invoice not found', 404);
//     if (subscription.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
//       return errorResponse(res, 'Unauthorized', 403);
//     }
//     successResponse(res, subscription);
//   } catch (error) {
//     next(error);
//   }
// };

// export const downloadInvoice = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const subscription = await Subscription.findById(id).populate('user', 'name email phone');
//     if (!subscription) return errorResponse(res, 'Invoice not found', 404);
//     // Return JSON for now, implement PDF generation later
//     successResponse(res, { message: 'Invoice download endpoint', subscription });
//   } catch (error) {
//     next(error);
//   }
// };

// server/controllers/subscription.controller.js
// Replace your existing downloadInvoice and getInvoice functions with these:

// ============================================
// INVOICE ROUTES - FIXED PDF GENERATION
// ============================================

export const getInvoice = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const subscription = await Subscription.findById(id)
      .populate('user', 'name email phone');
    
    if (!subscription) {
      return errorResponse(res, 'Invoice not found', 404);
    }
    
    if (subscription.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return errorResponse(res, 'Unauthorized', 403);
    }
    
    const invoiceNumber = `INV-${subscription._id.toString().slice(-8).toUpperCase()}`;
    const date = new Date(subscription.createdAt).toLocaleDateString('en-IN');
    const dueDate = subscription.expiresAt ? new Date(subscription.expiresAt).toLocaleDateString('en-IN') : 'N/A';
    const planName = `${subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} Plan`;
    const billingText = `${subscription.billingCycle || 'Monthly'} Subscription`;
    const subtotal = subscription.price.originalAmount || subscription.price.amount;
    const discount = subscription.discountApplied?.amount || 0;
    const finalAmount = subscription.price.amount;
    const tax = finalAmount * 0.18;
    const total = finalAmount + tax;
    
    const invoiceData = {
      id: subscription._id,
      invoiceNumber,
      date,
      dueDate,
      customer: {
        name: subscription.user.name,
        email: subscription.user.email,
        phone: subscription.user.phone
      },
      items: [{
        description: `${planName} - ${billingText}`,
        quantity: 1,
        unitPrice: subtotal,
        discount,
        total: finalAmount
      }],
      subtotal,
      discount,
      tax,
      total,
      currency: subscription.price.currency,
      status: subscription.status === 'active' ? 'paid' : subscription.status,
      paymentMethod: subscription.paymentMethod,
      paymentId: subscription.paymentId
    };
    
    successResponse(res, invoiceData);
  } catch (error) {
    console.error('Get invoice error:', error);
    next(error);
  }
};

// FIXED: Download invoice as PDF with proper PDF generation
export const downloadInvoice = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const subscription = await Subscription.findById(id)
      .populate('user', 'name email phone');
    
    if (!subscription) {
      return errorResponse(res, 'Invoice not found', 404);
    }
    
    if (subscription.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return errorResponse(res, 'Unauthorized', 403);
    }
    
    // Create PDF document
    const doc = new PDFDocument({ 
      margin: 50, 
      size: 'A4',
      bufferPages: true
    });
    
    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="invoice_${subscription._id}.pdf"`);
    res.setHeader('Cache-Control', 'no-cache');
    
    // Pipe PDF to response
    doc.pipe(res);
    
    // Invoice data
    const invoiceNumber = `INV-${subscription._id.toString().slice(-8).toUpperCase()}`;
    const date = new Date(subscription.createdAt).toLocaleDateString('en-IN');
    const dueDate = subscription.expiresAt ? new Date(subscription.expiresAt).toLocaleDateString('en-IN') : 'N/A';
    const planName = `${subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} Plan`;
    const billingText = `${subscription.billingCycle || 'Monthly'} Subscription`;
    const subtotal = subscription.price.originalAmount || subscription.price.amount;
    const discount = subscription.discountApplied?.amount || 0;
    const finalAmount = subscription.price.amount;
    const tax = finalAmount * 0.18;
    const total = finalAmount + tax;
    
    // ============================================
    // PDF HEADER SECTION
    // ============================================
    
    // Company Logo/Header
    doc.fontSize(24)
      .font('Helvetica-Bold')
      .fillColor('#8B5CF6')
      .text('Zauq App', { align: 'center' });
    
    doc.fontSize(10)
      .font('Helvetica')
      .fillColor('#666666')
      .text('Literary Platform', { align: 'center' })
      .moveDown(0.5);
    
    // Separator line
    doc.moveTo(50, doc.y)
      .lineTo(550, doc.y)
      .strokeColor('#cccccc')
      .stroke();
    
    doc.moveDown(1);
    
    // Invoice Title
    doc.fontSize(18)
      .font('Helvetica-Bold')
      .fillColor('#333333')
      .text('INVOICE', { align: 'center' })
      .moveDown(0.5);
    
    // Invoice Details (Right aligned)
    doc.fontSize(10)
      .font('Helvetica')
      .fillColor('#666666')
      .text(`Invoice Number: ${invoiceNumber}`, { align: 'right' })
      .text(`Date: ${date}`, { align: 'right' })
      .text(`Due Date: ${dueDate}`, { align: 'right' })
      .moveDown(1);
    
    // ============================================
    // BILL TO SECTION
    // ============================================
    
    doc.fontSize(12)
      .font('Helvetica-Bold')
      .fillColor('#333333')
      .text('Bill To:', { underline: true })
      .moveDown(0.3);
    
    doc.fontSize(10)
      .font('Helvetica')
      .fillColor('#666666')
      .text(subscription.user.name || 'Customer')
      .text(subscription.user.email || '')
      .text(subscription.user.phone || '')
      .moveDown(1);
    
    // ============================================
    // INVOICE TABLE
    // ============================================
    
    let y = doc.y;
    const col1 = 50;
    const col2 = 250;
    const col3 = 400;
    const col4 = 450;
    const col5 = 500;
    
    // Table Header
    doc.fontSize(10)
      .font('Helvetica-Bold')
      .fillColor('#333333')
      .text('Description', col1, y)
      .text('Qty', col3, y)
      .text('Unit Price', col4, y)
      .text('Total', col5, y);
    
    // Header separator
    doc.moveTo(50, y + 15)
      .lineTo(550, y + 15)
      .strokeColor('#cccccc')
      .stroke();
    
    y += 25;
    
    // Table Row - Plan
    doc.fontSize(10)
      .font('Helvetica')
      .fillColor('#333333')
      .text(`${planName} - ${billingText}`, col1, y, { width: 190 })
      .text('1', col3, y)
      .text(`${subscription.price.currency} ${subtotal.toFixed(2)}`, col4, y)
      .text(`${subscription.price.currency} ${subtotal.toFixed(2)}`, col5, y);
    
    y += 25;
    
    // Discount Row (if applicable)
    if (discount > 0) {
      doc.fillColor('#10B981')
        .text('Discount Applied', col1, y)
        .text('-', col3, y)
        .text(`-${subscription.price.currency} ${discount.toFixed(2)}`, col4, y)
        .text(`-${subscription.price.currency} ${discount.toFixed(2)}`, col5, y);
      y += 25;
    }
    
    // Tax Row
    doc.fillColor('#666666')
      .text('Tax (18% GST)', col1, y)
      .text('', col3, y)
      .text(`${subscription.price.currency} ${tax.toFixed(2)}`, col4, y)
      .text(`${subscription.price.currency} ${tax.toFixed(2)}`, col5, y);
    
    y += 25;
    
    // Total separator
    doc.moveTo(50, y - 5)
      .lineTo(550, y - 5)
      .strokeColor('#cccccc')
      .stroke();
    
    // Total Row
    doc.fontSize(12)
      .font('Helvetica-Bold')
      .fillColor('#333333')
      .text('Total', col1, y)
      .text('', col3, y)
      .text('', col4, y)
      .text(`${subscription.price.currency} ${total.toFixed(2)}`, col5, y);
    
    y += 30;
    
    // ============================================
    // PAYMENT STATUS SECTION
    // ============================================
    
    const statusColor = subscription.status === 'active' ? '#10B981' : '#EF4444';
    const statusText = subscription.status === 'active' ? 'PAID' : subscription.status.toUpperCase();
    
    doc.fontSize(12)
      .font('Helvetica-Bold')
      .fillColor(statusColor)
      .text(`Payment Status: ${statusText}`, 50, y);
    
    y += 20;
    
    // Payment Method
    if (subscription.paymentMethod && subscription.paymentMethod !== 'free') {
      doc.fontSize(10)
        .font('Helvetica')
        .fillColor('#666666')
        .text(`Payment Method: ${subscription.paymentMethod.toUpperCase()}`, 50, y);
      y += 15;
    }
    
    // Transaction ID
    if (subscription.paymentId) {
      doc.fontSize(10)
        .font('Helvetica')
        .fillColor('#666666')
        .text(`Transaction ID: ${subscription.paymentId}`, 50, y);
      y += 15;
    }
    
    // ============================================
    // FOOTER SECTION
    // ============================================
    
    // Thank you message
    doc.fontSize(9)
      .fillColor('#999999')
      .text('Thank you for your business!', 50, 750, { align: 'center' })
      .text('For any questions, contact support@zauqapp.com', 50, 765, { align: 'center' });
    
    // Finalize PDF
    doc.end();
    
  } catch (error) {
    console.error('Error generating invoice PDF:', error);
    return errorResponse(res, 'Failed to generate invoice PDF', 500);
  }
};

export const sendInvoiceEmail = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Implement email sending logic here
    // For now, return success
    successResponse(res, null, 'Invoice email sent successfully');
  } catch (error) {
    console.error('Send invoice email error:', error);
    next(error);
  }
};

// export const sendInvoiceEmail = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     successResponse(res, null, 'Invoice email sent successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// ============================================
// PAYMENT METHODS (Keep your existing implementation)
// ============================================

export const getPaymentMethods = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const methods = user.paymentMethods || [];
    const maskedMethods = methods.map(method => ({
      _id: method._id,
      cardNumber: `•••• •••• •••• ${method.lastFourDigits || '****'}`,
      cardHolder: method.cardHolder,
      expiryMonth: method.expiryMonth,
      expiryYear: method.expiryYear,
      cardBrand: method.cardBrand,
      isDefault: method.isDefault
    }));
    successResponse(res, maskedMethods);
  } catch (error) {
    next(error);
  }
};

export const addPaymentMethod = async (req, res, next) => {
  try {
    const { cardNumber, cardHolder, expiryMonth, expiryYear } = req.body;
    if (!cardNumber || !cardHolder) return errorResponse(res, 'Card number and holder name required', 400);
    const user = await User.findById(req.user.id);
    if (!user.paymentMethods) user.paymentMethods = [];
    const lastFourDigits = cardNumber.replace(/\s/g, '').slice(-4);
    const newMethod = {
      _id: new mongoose.Types.ObjectId(),
      cardNumber: cardNumber.replace(/\s/g, ''),
      cardHolder: cardHolder.toUpperCase(),
      expiryMonth,
      expiryYear,
      lastFourDigits,
      cardBrand: cardNumber.startsWith('4') ? 'visa' : 'mastercard',
      isDefault: user.paymentMethods.length === 0,
      createdAt: new Date()
    };
    user.paymentMethods.push(newMethod);
    await user.save();
    successResponse(res, { _id: newMethod._id, cardNumber: `•••• •••• •••• ${lastFourDigits}`, cardHolder: newMethod.cardHolder, isDefault: newMethod.isDefault }, 'Payment method added');
  } catch (error) {
    next(error);
  }
};

export const removePaymentMethod = async (req, res, next) => {
  try {
    const { methodId } = req.params;
    const user = await User.findById(req.user.id);
    if (!user.paymentMethods) return errorResponse(res, 'No payment methods found', 404);
    const methodIndex = user.paymentMethods.findIndex(m => m._id.toString() === methodId);
    if (methodIndex === -1) return errorResponse(res, 'Payment method not found', 404);
    if (user.paymentMethods.length === 1) return errorResponse(res, 'Cannot remove the only payment method', 400);
    const wasDefault = user.paymentMethods[methodIndex].isDefault;
    user.paymentMethods.splice(methodIndex, 1);
    if (wasDefault && user.paymentMethods.length > 0) user.paymentMethods[0].isDefault = true;
    await user.save();
    successResponse(res, null, 'Payment method removed');
  } catch (error) {
    next(error);
  }
};

export const setDefaultPaymentMethod = async (req, res, next) => {
  try {
    const { methodId } = req.params;
    const user = await User.findById(req.user.id);
    if (!user.paymentMethods) return errorResponse(res, 'No payment methods found', 404);
    user.paymentMethods.forEach(method => { method.isDefault = method._id.toString() === methodId; });
    await user.save();
    successResponse(res, null, 'Default payment method updated');
  } catch (error) {
    next(error);
  }
};

// ============================================
// COUPON ROUTES
// ============================================

export const validateCoupon = async (req, res, next) => {
  try {
    const { code } = req.params;
    const coupon = coupons.find(c => c.code === code.toUpperCase());
    if (!coupon) return errorResponse(res, 'Invalid coupon code', 404);
    successResponse(res, coupon);
  } catch (error) {
    next(error);
  }
};

export const applyCoupon = async (req, res, next) => {
  try {
    const { code, plan, amount } = req.body;
    const coupon = coupons.find(c => c.code === code.toUpperCase());
    if (!coupon) return errorResponse(res, 'Invalid coupon code', 404);
    if (!coupon.isActive) return errorResponse(res, 'Coupon is not active', 400);
    if (coupon.validUntil && new Date(coupon.validUntil) < new Date()) return errorResponse(res, 'Coupon has expired', 400);
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) return errorResponse(res, 'Coupon usage limit exceeded', 400);
    if (plan && coupon.applicablePlans && !coupon.applicablePlans.includes(plan)) return errorResponse(res, `Coupon not applicable for ${plan} plan`, 400);
    let discountAmount = coupon.discountType === 'percentage' ? amount * coupon.discountValue / 100 : coupon.discountValue;
    const finalAmount = Math.max(0, amount - discountAmount);
    coupon.usedCount++;
    successResponse(res, { discountAmount, finalAmount, savedAmount: amount - finalAmount });
  } catch (error) {
    next(error);
  }
};

// ============================================
// ADMIN CMS ROUTES
// ============================================

export const getAllPlansCMS = async (req, res, next) => {
  try {
    const plans = await SubscriptionPlan.find().sort({ displayOrder: 1 });
    successResponse(res, plans);
  } catch (error) {
    next(error);
  }
};

export const getPlanByIdCMS = async (req, res, next) => {
  try {
    const plan = await SubscriptionPlan.findById(req.params.id);
    if (!plan) return errorResponse(res, 'Plan not found', 404);
    successResponse(res, plan);
  } catch (error) {
    next(error);
  }
};

export const createPlanCMS = async (req, res, next) => {
  try {
    const plan = await SubscriptionPlan.create(req.body);
    successResponse(res, plan, 'Plan created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const updatePlanCMS = async (req, res, next) => {
  try {
    const plan = await SubscriptionPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!plan) return errorResponse(res, 'Plan not found', 404);
    successResponse(res, plan, 'Plan updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deletePlanCMS = async (req, res, next) => {
  try {
    const plan = await SubscriptionPlan.findByIdAndDelete(req.params.id);
    if (!plan) return errorResponse(res, 'Plan not found', 404);
    successResponse(res, null, 'Plan deleted successfully');
  } catch (error) {
    next(error);
  }
};

export const togglePlanStatusCMS = async (req, res, next) => {
  try {
    const plan = await SubscriptionPlan.findById(req.params.id);
    if (!plan) return errorResponse(res, 'Plan not found', 404);
    plan.isActive = !plan.isActive;
    await plan.save();
    successResponse(res, plan, `Plan ${plan.isActive ? 'activated' : 'deactivated'}`);
  } catch (error) {
    next(error);
  }
};

export const reorderPlansCMS = async (req, res, next) => {
  try {
    const { orders } = req.body;
    for (const { id, order } of orders) {
      await SubscriptionPlan.findByIdAndUpdate(id, { displayOrder: order });
    }
    successResponse(res, null, 'Plans reordered successfully');
  } catch (error) {
    next(error);
  }
};

export const getSubscriptionStatsCMS = async (req, res, next) => {
  try {
    const totalPlans = await SubscriptionPlan.countDocuments();
    const activePlans = await SubscriptionPlan.countDocuments({ isActive: true });
    const totalUsers = await User.countDocuments();
    const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });
    successResponse(res, { totalPlans, activePlans, totalUsers, activeSubscriptions });
  } catch (error) {
    next(error);
  }
};

export const getAllSubscribers = async (req, res, next) => {
  try {
    const subscribers = await Subscription.find().populate('user', 'name email');
    successResponse(res, subscribers);
  } catch (error) {
    next(error);
  }
};

export const getSubscriberById = async (req, res, next) => {
  try {
    const subscriber = await Subscription.findById(req.params.id).populate('user', 'name email');
    if (!subscriber) return errorResponse(res, 'Subscriber not found', 404);
    successResponse(res, subscriber);
  } catch (error) {
    next(error);
  }
};

export const getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await Subscription.find().populate('user', 'name email').sort({ createdAt: -1 });
    successResponse(res, transactions);
  } catch (error) {
    next(error);
  }
};

export const getTransactionById = async (req, res, next) => {
  try {
    const transaction = await Subscription.findById(req.params.id).populate('user', 'name email');
    if (!transaction) return errorResponse(res, 'Transaction not found', 404);
    successResponse(res, transaction);
  } catch (error) {
    next(error);
  }
};

export const getTransactionStats = async (req, res, next) => {
  try {
    const totalRevenue = await Subscription.aggregate([
      { $match: { status: 'active', 'price.amount': { $gt: 0 } } },
      { $group: { _id: null, total: { $sum: '$price.amount' } } }
    ]);
    successResponse(res, { totalRevenue: totalRevenue[0]?.total || 0 });
  } catch (error) {
    next(error);
  }
};

// Initialize default plans when server starts
initializeDefaultPlans().catch(console.error);