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














// server/controllers/subscription.controller.js
import { Subscription, SubscriptionPlan } from '../models/Subscription.js';
import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/response.js';

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

export const subscribe = async (req, res, next) => {
  try {
    const { plan, billingCycle, paymentMethod } = req.body;
    
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

    const subscription = await Subscription.create({
      user: req.user.id,
      plan,
      status: plan === 'free' ? 'active' : 'pending',
      price: { amount, currency: planDetails.price.currency },
      billingCycle,
      paymentMethod: paymentMethod || (plan === 'free' ? 'free' : undefined),
      expiresAt: new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000),
      features: planDetails.features.filter(f => f.included).map(f => f.name)
    });

    await User.findByIdAndUpdate(req.user.id, {
      'subscription.plan': plan,
      'subscription.startedAt': new Date(),
      'subscription.expiresAt': subscription.expiresAt
    });

    if (plan === 'free') {
      return successResponse(res, { subscription, plan: planDetails }, 'Free subscription activated', 201);
    }

    successResponse(res, { subscription, paymentUrl: '/api/subscriptions/verify-payment' }, 'Subscription initiated', 201);
  } catch (error) {
    next(error);
  }
};

export const verifyPayment = async (req, res, next) => {
  try {
    const { subscriptionId, paymentId } = req.body;

    const subscription = await Subscription.findByIdAndUpdate(
      subscriptionId,
      { status: 'active', paymentId },
      { new: true }
    );

    if (!subscription) {
      return errorResponse(res, 'Subscription not found', 404);
    }

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
    
    // Apply filters
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (plan && plan !== 'all') {
      query.plan = plan;
    }
    
    // Get all subscriptions with user details
    const subscriptions = await Subscription.find(query)
      .populate('user', 'name email profilePicture phone createdAt')
      .sort({ createdAt: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));
    
    // Apply search filter if provided
    let filteredSubscriptions = subscriptions;
    if (search) {
      filteredSubscriptions = subscriptions.filter(sub => 
        sub.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        sub.user?.email?.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    const total = await Subscription.countDocuments(query);
    
    // Enhance subscription data with additional info
    const enhancedSubscriptions = filteredSubscriptions.map((sub) => {
      const subObj = sub.toObject();
      
      // Add days remaining
      if (subObj.expiresAt) {
        const daysRemaining = Math.ceil((new Date(subObj.expiresAt) - new Date()) / (1000 * 60 * 60 * 24));
        subObj.daysRemaining = daysRemaining > 0 ? daysRemaining : 0;
      }
      
      // Add subscription duration
      if (subObj.startDate && subObj.expiresAt) {
        const durationDays = Math.ceil((new Date(subObj.expiresAt) - new Date(subObj.startDate)) / (1000 * 60 * 60 * 24));
        subObj.durationDays = durationDays;
      }
      
      // Set start date if not present
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
    
    // Get user's subscription history
    const subscriptionHistory = await Subscription.find({ user: subscription.user._id })
      .sort({ createdAt: -1 });
    
    // Calculate lifetime value from subscription history
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
    
    // Apply filters
    if (status && status !== 'all') {
      query.status = status === 'success' ? 'active' : status;
    }
    
    if (type && type !== 'all') {
      query.type = type;
    }
    
    // Date range filter
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        query.createdAt.$lte = new Date(endDate);
      }
    }
    
    // Get subscriptions as transactions
    let subscriptions = await Subscription.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    
    // Transform subscriptions to transaction format
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
      subscriptionId: sub._id
    }));
    
    // Apply search filter
    if (search) {
      transactions = transactions.filter(t => 
        t.transactionId?.toLowerCase().includes(search.toLowerCase()) ||
        t.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        t.user?.email?.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Apply status filter for 'success', 'failed', etc.
    if (status && status !== 'all') {
      transactions = transactions.filter(t => t.status === status);
    }
    
    // Apply type filter
    if (type && type !== 'all') {
      transactions = transactions.filter(t => t.type === type);
    }
    
    // Paginate
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
      }
    };
    
    successResponse(res, transaction);
  } catch (error) {
    next(error);
  }
};

export const getTransactionStats = async (req, res, next) => {
  try {
    // Get date ranges
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
      dailyStats: []
    };
    
    // Get all subscriptions for revenue calculation
    const allSubscriptions = await Subscription.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    
    // Calculate revenue and transactions
    allSubscriptions.forEach(sub => {
      const amount = sub.price?.amount || 0;
      const createdAt = new Date(sub.createdAt);
      const status = sub.status === 'active' ? 'success' : sub.status;
      
      // Total revenue (only successful/active)
      if (status === 'success') {
        stats.totalRevenue += amount;
        stats.totalTransactions++;
        stats.successfulTransactions++;
        
        // Today's revenue
        if (createdAt >= startOfToday) {
          stats.todayRevenue += amount;
          stats.todayTransactions++;
        }
        
        // Monthly revenue
        if (createdAt >= startOfMonth) {
          stats.monthlyRevenue += amount;
          stats.monthlyTransactions++;
        }
        
        // Yearly revenue
        if (createdAt >= startOfYear) {
          stats.yearlyRevenue += amount;
          stats.yearlyTransactions++;
        }
        
        // Revenue by plan
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
      
      // Transaction status counts
      if (!stats.transactionsByStatus[status]) {
        stats.transactionsByStatus[status] = 0;
      }
      stats.transactionsByStatus[status]++;
      
      // Transaction type counts
      const type = sub.type || 'subscription';
      if (!stats.transactionsByType[type]) {
        stats.transactionsByType[type] = 0;
      }
      stats.transactionsByType[type]++;
    });
    
    // Calculate average transaction value
    stats.averageTransactionValue = stats.totalTransactions > 0 
      ? stats.totalRevenue / stats.totalTransactions 
      : 0;
    
    // Get recent transactions
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
    
    // Get daily revenue for chart (last 30 days)
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