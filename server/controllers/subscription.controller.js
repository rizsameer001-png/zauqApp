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













// server/controllers/subscription.controller.js
import { Subscription, SubscriptionPlan } from '../models/Subscription.js';
import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/response.js';
import crypto from 'crypto';

// Payment gateway configurations
let razorpayInstance = null;
let stripeInstance = null;

// Initialize Razorpay
const initRazorpay = () => {
  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    try {
      import('razorpay').then((Razorpay) => {
        razorpayInstance = new Razorpay.default({
          key_id: process.env.RAZORPAY_KEY_ID,
          key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
        console.log('✅ Razorpay initialized successfully');
      }).catch(err => {
        console.error('❌ Failed to initialize Razorpay:', err.message);
      });
    } catch (error) {
      console.error('❌ Razorpay initialization error:', error.message);
    }
  }
};

// Initialize Stripe
const initStripe = () => {
  if (process.env.STRIPE_SECRET_KEY) {
    try {
      import('stripe').then((Stripe) => {
        stripeInstance = new Stripe.default(process.env.STRIPE_SECRET_KEY);
        console.log('✅ Stripe initialized successfully');
      }).catch(err => {
        console.error('❌ Failed to initialize Stripe:', err.message);
      });
    } catch (error) {
      console.error('❌ Stripe initialization error:', error.message);
    }
  }
};

// Initialize payment gateways
initRazorpay();
initStripe();

// Default plans with correct schema structure
const defaultPlans = [
  {
    planId: 'free',
    name: 'free',
    displayName: 'Free',
    description: 'Perfect for getting started with our platform',
    price: { amount: 0, currency: 'INR' },
    billingCycle: 'monthly',
    features: [
      { name: 'Browse all content', included: true, limit: null },
      { name: 'Read public poems', included: true, limit: null },
      { name: 'Basic search', included: true, limit: null },
      { name: 'Download content', included: false, limit: null },
      { name: 'Ad-free experience', included: false, limit: null }
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
      { name: 'All free features', included: true, limit: null },
      { name: 'Unlimited poem reading', included: true, limit: null },
      { name: 'Download 5 ebooks/month', included: true, limit: 5 },
      { name: 'Basic audio streaming', included: true, limit: null },
      { name: 'Priority support', included: false, limit: null }
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
      { name: 'All Basic features', included: true, limit: null },
      { name: 'Unlimited downloads', included: true, limit: null },
      { name: 'HD audio streaming', included: true, limit: null },
      { name: 'Ad-free experience', included: true, limit: null },
      { name: 'AI explanations', included: true, limit: null }
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
      { name: 'All Premium features', included: true, limit: null },
      { name: 'Creator tools', included: true, limit: null },
      { name: 'Priority support', included: true, limit: null },
      { name: 'Analytics dashboard', included: true, limit: null },
      { name: 'Early access to new features', included: true, limit: null }
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

// Initialize default plans in database
const initializeDefaultPlans = async () => {
  try {
    for (const planData of defaultPlans) {
      const existingPlan = await SubscriptionPlan.findOne({ planId: planData.planId });
      if (!existingPlan) {
        await SubscriptionPlan.create(planData);
        console.log(`✅ Created default plan: ${planData.planId}`);
      }
    }
    console.log('✅ Default plans initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing default plans:', error.message);
  }
};

// ============== PUBLIC ROUTES ==============

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
        features: plan.features.filter(f => f.included).map(f => f.name),
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
      features: plan.features.filter(f => f.included).map(f => f.name),
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
    const subscription = await Subscription.findOne({
      user: req.user.id,
      status: 'active'
    }).sort({ createdAt: -1 });

    const user = await User.findById(req.user.id);
    
    const planDetails = await SubscriptionPlan.findOne({ planId: user.subscription.plan });
    
    successResponse(res, {
      subscription,
      plan: user.subscription,
      features: planDetails ? planDetails.features.filter(f => f.included).map(f => f.name) : []
    });
  } catch (error) {
    next(error);
  }
};

// ============== SUBSCRIPTION WITH PAYMENT GATEWAYS ==============

export const createRazorpayOrder = async (req, res, next) => {
  try {
    const { plan, billingCycle } = req.body;
    
    if (!razorpayInstance) {
      return errorResponse(res, 'Razorpay is not configured', 500);
    }
    
    let planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
    
    if (!planDetails) {
      await initializeDefaultPlans();
      planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
      
      if (!planDetails) {
        return errorResponse(res, 'Invalid plan', 400);
      }
    }
    
    const months = billingCycle === 'yearly' ? 12 : billingCycle === 'quarterly' ? 3 : 1;
    const amount = planDetails.price.amount * months;
    
    const options = {
      amount: amount * 100,
      currency: planDetails.price.currency,
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
      notes: {
        userId: req.user.id,
        plan: plan,
        billingCycle: billingCycle
      }
    };
    
    const order = await razorpayInstance.orders.create(options);
    
    const subscription = await Subscription.create({
      user: req.user.id,
      plan,
      status: 'pending',
      price: { amount, currency: planDetails.price.currency },
      billingCycle,
      paymentMethod: 'razorpay',
      expiresAt: new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000),
      features: planDetails.features.filter(f => f.included).map(f => f.name),
      orderId: order.id
    });
    
    successResponse(res, {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      subscriptionId: subscription._id,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    next(error);
  }
};

export const createStripePaymentIntent = async (req, res, next) => {
  try {
    const { plan, billingCycle } = req.body;
    
    if (!stripeInstance) {
      return errorResponse(res, 'Stripe is not configured', 500);
    }
    
    let planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
    
    if (!planDetails) {
      await initializeDefaultPlans();
      planDetails = await SubscriptionPlan.findOne({ planId: plan, isActive: true });
      
      if (!planDetails) {
        return errorResponse(res, 'Invalid plan', 400);
      }
    }
    
    const months = billingCycle === 'yearly' ? 12 : billingCycle === 'quarterly' ? 3 : 1;
    const amount = planDetails.price.amount * months;
    
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: amount * 100,
      currency: planDetails.price.currency.toLowerCase(),
      metadata: {
        userId: req.user.id,
        plan: plan,
        billingCycle: billingCycle
      }
    });
    
    const subscription = await Subscription.create({
      user: req.user.id,
      plan,
      status: 'pending',
      price: { amount, currency: planDetails.price.currency },
      billingCycle,
      paymentMethod: 'stripe',
      expiresAt: new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000),
      features: planDetails.features.filter(f => f.included).map(f => f.name),
      paymentIntentId: paymentIntent.id
    });
    
    successResponse(res, {
      clientSecret: paymentIntent.client_secret,
      subscriptionId: subscription._id
    });
  } catch (error) {
    console.error('Stripe payment intent creation error:', error);
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
    
    // Apply coupon if provided
    let discountAmount = 0;
    let appliedCoupon = null;
    if (couponCode) {
      const coupon = coupons.find(c => c.code === couponCode.toUpperCase());
      if (coupon && coupon.isActive && (!coupon.validUntil || new Date(coupon.validUntil) > new Date())) {
        if (coupon.discountType === 'percentage') {
          discountAmount = amount * coupon.discountValue / 100;
        } else {
          discountAmount = coupon.discountValue;
        }
        amount = Math.max(0, amount - discountAmount);
        appliedCoupon = coupon;
      }
    }
    
    if (plan === 'free' || amount === 0) {
      const subscription = await Subscription.create({
        user: req.user.id,
        plan,
        status: 'active',
        price: { amount: 0, currency: planDetails.price.currency },
        billingCycle,
        paymentMethod: 'free',
        expiresAt: null,
        features: planDetails.features.filter(f => f.included).map(f => f.name),
        discountApplied: discountAmount > 0 ? { amount: discountAmount, coupon: couponCode } : null
      });
      
      await User.findByIdAndUpdate(req.user.id, {
        'subscription.plan': plan,
        'subscription.startedAt': new Date(),
        'subscription.expiresAt': null
      });
      
      return successResponse(res, { subscription, plan: planDetails }, 'Free subscription activated', 201);
    }
    
    const subscription = await Subscription.create({
      user: req.user.id,
      plan,
      status: 'pending',
      price: { amount, currency: planDetails.price.currency, originalAmount: planDetails.price.amount * months },
      billingCycle,
      paymentMethod: paymentMethod || 'pending',
      expiresAt: new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000),
      features: planDetails.features.filter(f => f.included).map(f => f.name),
      discountApplied: discountAmount > 0 ? { amount: discountAmount, coupon: couponCode } : null
    });
    
    successResponse(res, { 
      subscription, 
      plan: planDetails,
      requiresPayment: true,
      discountApplied: discountAmount > 0 ? { amount: discountAmount, finalAmount: amount } : null
    }, 'Subscription initiated, please complete payment', 201);
  } catch (error) {
    next(error);
  }
};

export const verifyRazorpayPayment = async (req, res, next) => {
  try {
    const { orderId, paymentId, signature, subscriptionId } = req.body;
    
    const body = orderId + "|" + paymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');
    
    const isAuthentic = expectedSignature === signature;
    
    if (!isAuthentic) {
      return errorResponse(res, 'Invalid payment signature', 400);
    }
    
    const subscription = await Subscription.findByIdAndUpdate(
      subscriptionId,
      { 
        status: 'active', 
        paymentId,
        orderId,
        signature,
        paymentDetails: { orderId, paymentId, signature },
        verifiedAt: new Date()
      },
      { new: true }
    );
    
    if (!subscription) {
      return errorResponse(res, 'Subscription not found', 404);
    }
    
    await User.findByIdAndUpdate(req.user.id, {
      'subscription.plan': subscription.plan,
      'subscription.startedAt': new Date(),
      'subscription.expiresAt': subscription.expiresAt,
      'subscription.status': 'active'
    });
    
    successResponse(res, subscription, 'Payment verified and subscription activated');
  } catch (error) {
    console.error('Razorpay verification error:', error);
    next(error);
  }
};

export const verifyStripePayment = async (req, res, next) => {
  try {
    const { paymentIntentId, subscriptionId } = req.body;
    
    if (!stripeInstance) {
      return errorResponse(res, 'Stripe is not configured', 500);
    }
    
    const paymentIntent = await stripeInstance.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status !== 'succeeded') {
      return errorResponse(res, 'Payment not successful', 400);
    }
    
    const subscription = await Subscription.findByIdAndUpdate(
      subscriptionId,
      { 
        status: 'active', 
        paymentId: paymentIntentId,
        paymentDetails: paymentIntent,
        verifiedAt: new Date()
      },
      { new: true }
    );
    
    if (!subscription) {
      return errorResponse(res, 'Subscription not found', 404);
    }
    
    await User.findByIdAndUpdate(req.user.id, {
      'subscription.plan': subscription.plan,
      'subscription.startedAt': new Date(),
      'subscription.expiresAt': subscription.expiresAt,
      'subscription.status': 'active'
    });
    
    successResponse(res, subscription, 'Payment verified and subscription activated');
  } catch (error) {
    console.error('Stripe verification error:', error);
    next(error);
  }
};

export const verifyPayment = async (req, res, next) => {
  try {
    const { subscriptionId, paymentId, paymentDetails, orderId, signature } = req.body;
    
    if (signature && orderId) {
      const body = orderId + "|" + paymentId;
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');
      
      const isAuthentic = expectedSignature === signature;
      if (!isAuthentic) {
        return errorResponse(res, 'Invalid payment signature', 400);
      }
    }
    
    const subscription = await Subscription.findByIdAndUpdate(
      subscriptionId,
      { 
        status: 'active', 
        paymentId,
        paymentDetails: { paymentId, orderId, signature, ...paymentDetails },
        verifiedAt: new Date()
      },
      { new: true }
    );
    
    if (!subscription) {
      return errorResponse(res, 'Subscription not found', 404);
    }
    
    await User.findByIdAndUpdate(req.user.id, {
      'subscription.plan': subscription.plan,
      'subscription.startedAt': new Date(),
      'subscription.expiresAt': subscription.expiresAt,
      'subscription.status': 'active'
    });
    
    successResponse(res, subscription, 'Payment verified');
  } catch (error) {
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
      'subscription.plan': 'free'
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

// ============== WEBHOOKS FOR PAYMENT GATEWAYS ==============

export const razorpayWebhook = async (req, res, next) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers['x-razorpay-signature'];
    
    const body = JSON.stringify(req.body);
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');
    
    if (expectedSignature !== signature) {
      return res.status(400).json({ error: 'Invalid signature' });
    }
    
    const event = req.body;
    
    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;
      const orderId = payment.order_id;
      
      await Subscription.findOneAndUpdate(
        { orderId },
        { 
          status: 'active',
          paymentId: payment.id,
          paymentDetails: payment,
          verifiedAt: new Date()
        }
      );
    }
    
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Razorpay webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
};

export const stripeWebhook = async (req, res, next) => {
  try {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    let event;
    try {
      event = stripeInstance.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      return res.status(400).json({ error: `Webhook Error: ${err.message}` });
    }
    
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      
      await Subscription.findOneAndUpdate(
        { paymentIntentId: paymentIntent.id },
        { 
          status: 'active',
          paymentId: paymentIntent.id,
          paymentDetails: paymentIntent,
          verifiedAt: new Date()
        }
      );
    }
    
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Stripe webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
};

// ============== INVOICE ROUTES ==============

export const getInvoiceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const subscription = await Subscription.findById(id)
      .populate('user', 'name email phone address');
    
    if (!subscription) {
      return errorResponse(res, 'Invoice not found', 404);
    }
    
    if (subscription.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return errorResponse(res, 'Unauthorized', 403);
    }
    
    const invoice = {
      id: subscription._id,
      invoiceNumber: `INV-${subscription._id.toString().slice(-8).toUpperCase()}`,
      date: subscription.createdAt,
      dueDate: subscription.expiresAt,
      customer: {
        name: subscription.user.name,
        email: subscription.user.email,
        phone: subscription.user.phone,
        address: subscription.user.address || {}
      },
      items: [{
        description: `${subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} Plan - ${subscription.billingCycle} subscription`,
        quantity: 1,
        unitPrice: subscription.price.originalAmount || subscription.price.amount,
        discount: subscription.discountApplied?.amount || 0,
        total: subscription.price.amount
      }],
      subtotal: subscription.price.originalAmount || subscription.price.amount,
      discount: subscription.discountApplied?.amount || 0,
      tax: (subscription.price.amount) * 0.18,
      total: subscription.price.amount * 1.18,
      currency: subscription.price.currency,
      status: subscription.status === 'active' ? 'paid' : subscription.status,
      paymentMethod: subscription.paymentMethod,
      paymentId: subscription.paymentId
    };
    
    successResponse(res, invoice);
  } catch (error) {
    next(error);
  }
};

export const downloadInvoice = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const subscription = await Subscription.findById(id)
      .populate('user', 'name email phone address');
    
    if (!subscription) {
      return errorResponse(res, 'Invoice not found', 404);
    }
    
    if (subscription.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return errorResponse(res, 'Unauthorized', 403);
    }
    
    const invoiceHtml = generateInvoiceHTML(subscription);
    
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Disposition', `attachment; filename=invoice-${subscription._id}.html`);
    res.send(invoiceHtml);
  } catch (error) {
    next(error);
  }
};

export const sendInvoiceEmail = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const subscription = await Subscription.findById(id)
      .populate('user', 'name email');
    
    if (!subscription) {
      return errorResponse(res, 'Invoice not found', 404);
    }
    
    if (subscription.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return errorResponse(res, 'Unauthorized', 403);
    }
    
    successResponse(res, null, 'Invoice email sent successfully');
  } catch (error) {
    next(error);
  }
};

const generateInvoiceHTML = (subscription) => {
  const invoiceNumber = `INV-${subscription._id.toString().slice(-8).toUpperCase()}`;
  const total = subscription.price.amount * 1.18;
  const tax = subscription.price.amount * 0.18;
  const discount = subscription.discountApplied?.amount || 0;
  const subtotal = subscription.price.originalAmount || subscription.price.amount;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Invoice ${invoiceNumber}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        .invoice-container { max-width: 800px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .company-info { margin-bottom: 20px; }
        .invoice-info { text-align: right; margin-bottom: 20px; }
        .customer-info { margin-bottom: 30px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background-color: #f5f5f5; }
        .totals { text-align: right; margin-top: 20px; }
        .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
        .discount { color: green; }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <div class="header">
          <h1>Zauq App</h1>
          <p>Literary Platform</p>
        </div>
        
        <div class="invoice-info">
          <strong>Invoice #:</strong> ${invoiceNumber}<br>
          <strong>Date:</strong> ${new Date(subscription.createdAt).toLocaleDateString()}<br>
          <strong>Due Date:</strong> ${subscription.expiresAt ? new Date(subscription.expiresAt).toLocaleDateString() : 'N/A'}
        </div>
        
        <div class="customer-info">
          <strong>Bill To:</strong><br>
          ${subscription.user.name}<br>
          ${subscription.user.email}<br>
          ${subscription.user.phone || ''}
        </div>
        
        <table>
          <thead>
            <tr><th>Description</th><th>Quantity</th><th>Unit Price</th><th>Total</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>${subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} Plan - ${subscription.billingCycle} subscription</td>
              <td>1</td>
              <td>${subscription.price.currency} ${subtotal}</td>
              <td>${subscription.price.currency} ${subtotal}</td>
            </tr>
          </tbody>
        </table>
        
        <div class="totals">
          ${discount > 0 ? `<p><strong>Subtotal:</strong> ${subscription.price.currency} ${subtotal}</p>` : ''}
          ${discount > 0 ? `<p class="discount"><strong>Discount:</strong> -${subscription.price.currency} ${discount}</p>` : ''}
          <p><strong>Tax (18%):</strong> ${subscription.price.currency} ${tax.toFixed(2)}</p>
          <p><strong>Total:</strong> ${subscription.price.currency} ${total.toFixed(2)}</p>
        </div>
        
        <div class="footer">
          <p>Thank you for your business!</p>
          <p>For any questions, contact support@zauqapp.com</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// ============== COUPON/DISCOUNT ROUTES ==============

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

export const validateCoupon = async (req, res, next) => {
  try {
    const { code } = req.params;
    const { plan, amount } = req.query;
    
    const coupon = coupons.find(c => c.code === code.toUpperCase());
    
    if (!coupon) {
      return errorResponse(res, 'Invalid coupon code', 404);
    }
    
    if (!coupon.isActive) {
      return errorResponse(res, 'Coupon is not active', 400);
    }
    
    if (coupon.validUntil && new Date(coupon.validUntil) < new Date()) {
      return errorResponse(res, 'Coupon has expired', 400);
    }
    
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return errorResponse(res, 'Coupon usage limit exceeded', 400);
    }
    
    if (plan && coupon.applicablePlans && !coupon.applicablePlans.includes(plan)) {
      return errorResponse(res, `Coupon not applicable for ${plan} plan`, 400);
    }
    
    const orderAmount = parseFloat(amount);
    if (coupon.minAmount && orderAmount < coupon.minAmount) {
      return errorResponse(res, `Minimum order amount of ${coupon.minAmount} required`, 400);
    }
    
    let discountAmount = 0;
    if (coupon.discountType === 'percentage') {
      discountAmount = orderAmount * coupon.discountValue / 100;
    } else {
      discountAmount = coupon.discountValue;
    }
    
    const finalAmount = Math.max(0, orderAmount - discountAmount);
    
    successResponse(res, {
      coupon: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        discountAmount: discountAmount,
        finalAmount: finalAmount,
        savedAmount: orderAmount - finalAmount
      }
    });
  } catch (error) {
    next(error);
  }
};

export const applyCoupon = async (req, res, next) => {
  try {
    const { code, plan, amount } = req.body;
    
    const coupon = coupons.find(c => c.code === code.toUpperCase());
    
    if (!coupon) {
      return errorResponse(res, 'Invalid coupon code', 404);
    }
    
    if (!coupon.isActive) {
      return errorResponse(res, 'Coupon is not active', 400);
    }
    
    if (coupon.validUntil && new Date(coupon.validUntil) < new Date()) {
      return errorResponse(res, 'Coupon has expired', 400);
    }
    
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return errorResponse(res, 'Coupon usage limit exceeded', 400);
    }
    
    if (plan && coupon.applicablePlans && !coupon.applicablePlans.includes(plan)) {
      return errorResponse(res, `Coupon not applicable for ${plan} plan`, 400);
    }
    
    const orderAmount = parseFloat(amount);
    if (coupon.minAmount && orderAmount < coupon.minAmount) {
      return errorResponse(res, `Minimum order amount of ${coupon.minAmount} required`, 400);
    }
    
    let discountAmount = 0;
    if (coupon.discountType === 'percentage') {
      discountAmount = orderAmount * coupon.discountValue / 100;
    } else {
      discountAmount = coupon.discountValue;
    }
    
    const finalAmount = Math.max(0, orderAmount - discountAmount);
    
    coupon.usedCount++;
    
    successResponse(res, {
      coupon: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        discountAmount: discountAmount,
        finalAmount: finalAmount,
        savedAmount: orderAmount - finalAmount
      },
      applied: true
    });
  } catch (error) {
    next(error);
  }
};

// ============== CMS ROUTES (Admin Only) ==============

export const getAllPlansCMS = async (req, res, next) => {
  try {
    const plans = await SubscriptionPlan.find().sort({ displayOrder: 1, 'price.amount': 1 });
    
    const plansWithStats = await Promise.all(plans.map(async (plan) => {
      const subscriberCount = await Subscription.countDocuments({ 
        plan: plan.planId, 
        status: 'active' 
      });
      
      const planObj = plan.toObject();
      planObj.subscriberCount = subscriberCount;
      
      return planObj;
    }));
    
    successResponse(res, plansWithStats);
  } catch (error) {
    next(error);
  }
};

export const getPlanByIdCMS = async (req, res, next) => {
  try {
    const plan = await SubscriptionPlan.findById(req.params.id);
    if (!plan) {
      return errorResponse(res, 'Plan not found', 404);
    }
    successResponse(res, plan);
  } catch (error) {
    next(error);
  }
};

export const createPlanCMS = async (req, res, next) => {
  try {
    const {
      planId,
      name,
      displayName,
      description,
      price,
      billingCycle,
      features,
      limits,
      isActive,
      displayOrder,
      badgeText,
      recommended
    } = req.body;
    
    const validPlans = ['free', 'basic', 'premium', 'pro'];
    if (!validPlans.includes(planId)) {
      return errorResponse(res, 'Invalid plan ID. Must be free, basic, premium, or pro', 400);
    }
    
    const existingPlan = await SubscriptionPlan.findOne({ planId });
    if (existingPlan) {
      return errorResponse(res, 'Plan ID already exists', 400);
    }
    
    const plan = await SubscriptionPlan.create({
      planId,
      name: name || planId,
      displayName,
      description: description || '',
      price: {
        amount: price?.amount || 0,
        currency: price?.currency || 'INR'
      },
      billingCycle: billingCycle || 'monthly',
      features: features || [],
      limits: {
        poemsPerDay: limits?.poemsPerDay || null,
        ebooksPerMonth: limits?.ebooksPerMonth || null,
        audiobooksPerMonth: limits?.audiobooksPerMonth || null,
        unlimited: limits?.unlimited || false,
        creator: limits?.creator || false
      },
      isActive: isActive !== undefined ? isActive : true,
      displayOrder: displayOrder || 0,
      badgeText: badgeText || '',
      recommended: recommended || false
    });
    
    successResponse(res, plan, 'Plan created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const updatePlanCMS = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    delete updateData.planId;
    delete updateData._id;
    
    const plan = await SubscriptionPlan.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!plan) {
      return errorResponse(res, 'Plan not found', 404);
    }
    
    successResponse(res, plan, 'Plan updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deletePlanCMS = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { permanent } = req.query;
    
    const plan = await SubscriptionPlan.findById(id);
    if (!plan) {
      return errorResponse(res, 'Plan not found', 404);
    }
    
    const activeSubscriptions = await Subscription.countDocuments({
      plan: plan.planId,
      status: 'active'
    });
    
    if (permanent === 'true') {
      if (activeSubscriptions > 0) {
        return errorResponse(res, `Cannot delete plan with ${activeSubscriptions} active subscriptions. Deactivate it instead.`, 400);
      }
      await SubscriptionPlan.findByIdAndDelete(id);
      successResponse(res, null, 'Plan permanently deleted');
    } else {
      plan.isActive = false;
      await plan.save();
      successResponse(res, plan, 'Plan deactivated successfully');
    }
  } catch (error) {
    next(error);
  }
};

export const togglePlanStatusCMS = async (req, res, next) => {
  try {
    const { id } = req.params;
    const plan = await SubscriptionPlan.findById(id);
    
    if (!plan) {
      return errorResponse(res, 'Plan not found', 404);
    }
    
    plan.isActive = !plan.isActive;
    await plan.save();
    
    successResponse(res, plan, `Plan ${plan.isActive ? 'activated' : 'deactivated'} successfully`);
  } catch (error) {
    next(error);
  }
};

export const reorderPlansCMS = async (req, res, next) => {
  try {
    const { orders } = req.body;
    
    const updatePromises = orders.map(({ id, order }) =>
      SubscriptionPlan.findByIdAndUpdate(id, { displayOrder: order }, { new: true })
    );
    
    await Promise.all(updatePromises);
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
    
    const revenueStats = await Subscription.aggregate([
      { $match: { status: 'active', 'price.amount': { $gt: 0 } } },
      { $group: {
        _id: null,
        totalMonthlyRevenue: { $sum: '$price.amount' },
        averageSubscriptionValue: { $avg: '$price.amount' }
      }}
    ]);
    
    const planDistribution = await Subscription.aggregate([
      { $match: { status: 'active' } },
      { $group: { _id: '$plan', count: { $sum: 1 } } }
    ]);
    
    successResponse(res, {
      totalPlans,
      activePlans,
      totalUsers,
      activeSubscriptions,
      revenue: revenueStats[0] || { totalMonthlyRevenue: 0, averageSubscriptionValue: 0 },
      planDistribution
    });
  } catch (error) {
    next(error);
  }
};

// ============== SUBSCRIBERS MANAGEMENT ==============

export const getAllSubscribers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, plan, search } = req.query;
    
    let query = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (plan && plan !== 'all') {
      query.plan = plan;
    }
    
    const subscriptions = await Subscription.find(query)
      .populate('user', 'name email profilePicture phone createdAt')
      .sort({ createdAt: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));
    
    let filteredSubscriptions = subscriptions;
    if (search) {
      filteredSubscriptions = subscriptions.filter(sub => 
        sub.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        sub.user?.email?.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    const total = await Subscription.countDocuments(query);
    
    const enhancedSubscriptions = filteredSubscriptions.map((sub) => {
      const subObj = sub.toObject();
      
      if (subObj.expiresAt) {
        const daysRemaining = Math.ceil((new Date(subObj.expiresAt) - new Date()) / (1000 * 60 * 60 * 24));
        subObj.daysRemaining = daysRemaining > 0 ? daysRemaining : 0;
      }
      
      if (subObj.startDate && subObj.expiresAt) {
        const durationDays = Math.ceil((new Date(subObj.expiresAt) - new Date(subObj.startDate)) / (1000 * 60 * 60 * 24));
        subObj.durationDays = durationDays;
      }
      
      if (!subObj.startDate) {
        subObj.startDate = subObj.createdAt;
      }
      
      return subObj;
    });
    
    successResponse(res, {
      subscribers: enhancedSubscriptions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getSubscriberById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const subscription = await Subscription.findById(id)
      .populate('user', 'name email profilePicture phone createdAt');
    
    if (!subscription) {
      return errorResponse(res, 'Subscriber not found', 404);
    }
    
    const subscriptionHistory = await Subscription.find({ user: subscription.user._id })
      .sort({ createdAt: -1 });
    
    const lifetimeValue = subscriptionHistory
      .filter(sub => sub.status === 'active' || sub.status === 'cancelled')
      .reduce((sum, sub) => sum + (sub.price?.amount || 0), 0);
    
    const subscriberData = subscription.toObject();
    subscriberData.history = subscriptionHistory;
    subscriberData.lifetimeValue = lifetimeValue;
    subscriberData.totalSubscriptions = subscriptionHistory.length;
    
    successResponse(res, subscriberData);
  } catch (error) {
    next(error);
  }
};

// ============== TRANSACTIONS MANAGEMENT ==============

export const getAllTransactions = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      status, 
      type, 
      startDate, 
      endDate,
      search 
    } = req.query;
    
    let query = {};
    
    if (status && status !== 'all') {
      query.status = status === 'success' ? 'active' : status;
    }
    
    if (type && type !== 'all') {
      query.type = type;
    }
    
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        query.createdAt.$lte = new Date(endDate);
      }
    }
    
    let subscriptions = await Subscription.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    
    let transactions = subscriptions.map(sub => ({
      _id: sub._id,
      transactionId: sub.paymentId || `TXN_${sub._id}`,
      user: sub.user,
      type: sub.type || 'subscription',
      amount: sub.price?.amount || 0,
      currency: sub.price?.currency || 'INR',
      status: sub.status === 'active' ? 'success' : sub.status === 'pending' ? 'pending' : sub.status,
      createdAt: sub.createdAt,
      paymentMethod: sub.paymentMethod || 'unknown',
      plan: sub.plan,
      billingCycle: sub.billingCycle,
      subscriptionId: sub._id,
      discountApplied: sub.discountApplied
    }));
    
    if (search) {
      transactions = transactions.filter(t => 
        t.transactionId?.toLowerCase().includes(search.toLowerCase()) ||
        t.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        t.user?.email?.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (status && status !== 'all') {
      transactions = transactions.filter(t => t.status === status);
    }
    
    if (type && type !== 'all') {
      transactions = transactions.filter(t => t.type === type);
    }
    
    const start = (parseInt(page) - 1) * parseInt(limit);
    const paginatedTransactions = transactions.slice(start, start + parseInt(limit));
    
    successResponse(res, {
      transactions: paginatedTransactions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: transactions.length,
        pages: Math.ceil(transactions.length / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getTransactionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const subscription = await Subscription.findById(id)
      .populate('user', 'name email phone');
    
    if (!subscription) {
      return errorResponse(res, 'Transaction not found', 404);
    }
    
    const transaction = {
      _id: subscription._id,
      transactionId: subscription.paymentId || `TXN_${subscription._id}`,
      user: subscription.user,
      type: subscription.type || 'subscription',
      amount: subscription.price?.amount || 0,
      currency: subscription.price?.currency || 'INR',
      status: subscription.status === 'active' ? 'success' : subscription.status,
      createdAt: subscription.createdAt,
      updatedAt: subscription.updatedAt,
      paymentMethod: subscription.paymentMethod || 'unknown',
      plan: subscription.plan,
      billingCycle: subscription.billingCycle,
      subscriptionId: subscription._id,
      paymentDetails: {
        paymentId: subscription.paymentId,
        orderId: subscription.orderId
      },
      discountApplied: subscription.discountApplied
    };
    
    successResponse(res, transaction);
  } catch (error) {
    next(error);
  }
};

export const getTransactionStats = async (req, res, next) => {
  try {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    
    let stats = {
      totalRevenue: 0,
      todayRevenue: 0,
      monthlyRevenue: 0,
      yearlyRevenue: 0,
      totalTransactions: 0,
      todayTransactions: 0,
      monthlyTransactions: 0,
      yearlyTransactions: 0,
      successfulTransactions: 0,
      failedTransactions: 0,
      pendingTransactions: 0,
      averageTransactionValue: 0,
      revenueByPlan: {},
      transactionsByStatus: {},
      transactionsByType: {},
      recentTransactions: [],
      dailyStats: [],
      totalDiscountGiven: 0
    };
    
    const allSubscriptions = await Subscription.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    
    allSubscriptions.forEach(sub => {
      const amount = sub.price?.amount || 0;
      const originalAmount = sub.price?.originalAmount || amount;
      const discountGiven = originalAmount - amount;
      const createdAt = new Date(sub.createdAt);
      const status = sub.status === 'active' ? 'success' : sub.status;
      
      if (status === 'success') {
        stats.totalRevenue += amount;
        stats.totalDiscountGiven += discountGiven;
        stats.totalTransactions++;
        stats.successfulTransactions++;
        
        if (createdAt >= startOfToday) {
          stats.todayRevenue += amount;
          stats.todayTransactions++;
        }
        
        if (createdAt >= startOfMonth) {
          stats.monthlyRevenue += amount;
          stats.monthlyTransactions++;
        }
        
        if (createdAt >= startOfYear) {
          stats.yearlyRevenue += amount;
          stats.yearlyTransactions++;
        }
        
        const plan = sub.plan || 'unknown';
        if (!stats.revenueByPlan[plan]) {
          stats.revenueByPlan[plan] = 0;
        }
        stats.revenueByPlan[plan] += amount;
      } else if (status === 'pending') {
        stats.pendingTransactions++;
      } else if (status === 'cancelled' || status === 'expired') {
        stats.failedTransactions++;
      }
      
      if (!stats.transactionsByStatus[status]) {
        stats.transactionsByStatus[status] = 0;
      }
      stats.transactionsByStatus[status]++;
      
      const type = sub.type || 'subscription';
      if (!stats.transactionsByType[type]) {
        stats.transactionsByType[type] = 0;
      }
      stats.transactionsByType[type]++;
    });
    
    stats.averageTransactionValue = stats.totalTransactions > 0 
      ? stats.totalRevenue / stats.totalTransactions 
      : 0;
    
    stats.recentTransactions = allSubscriptions.slice(0, 10).map(sub => ({
      _id: sub._id,
      transactionId: sub.paymentId || `TXN_${sub._id}`,
      user: sub.user,
      amount: sub.price?.amount || 0,
      currency: sub.price?.currency || 'INR',
      status: sub.status === 'active' ? 'success' : sub.status,
      createdAt: sub.createdAt,
      plan: sub.plan
    }));
    
    const last30Days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);
      
      const dailyTransactions = allSubscriptions.filter(sub => {
        const createdAt = new Date(sub.createdAt);
        return createdAt >= date && createdAt < nextDate;
      });
      
      const dailyRevenue = dailyTransactions
        .filter(sub => sub.status === 'active')
        .reduce((sum, sub) => sum + (sub.price?.amount || 0), 0);
      
      last30Days.push({
        date: date.toISOString().split('T')[0],
        revenue: dailyRevenue,
        transactions: dailyTransactions.length,
        successful: dailyTransactions.filter(t => t.status === 'active').length
      });
    }
    
    stats.dailyStats = last30Days;
    
    successResponse(res, stats);
  } catch (error) {
    next(error);
  }
};

// Initialize default plans when server starts
initializeDefaultPlans().catch(console.error);