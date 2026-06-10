// // client/src/components/home/SubscriptionPlans.jsx
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Check, Crown, Star, Sparkles, Zap, Shield, Music, BookOpen, Headphones } from 'lucide-react';
// import toast from 'react-hot-toast';
// import subscriptionAPI from '../../api/subscriptionAPI';

// const SubscriptionPlans = ({ onPlanSelect, showCurrentPlan = false }) => {
//   const [plans, setPlans] = useState([]);
//   const [currentPlan, setCurrentPlan] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [billingCycle, setBillingCycle] = useState('monthly');

//   useEffect(() => {
//     fetchPlans();
//     if (showCurrentPlan) {
//       fetchCurrentSubscription();
//     }
//   }, []);

//   const fetchPlans = async () => {
//     try {
//       const response = await subscriptionAPI.getPlans();
//       const plansData = response.data || response;
      
//       // Convert object to array if needed
//       const plansArray = Array.isArray(plansData) 
//         ? plansData 
//         : Object.entries(plansData).map(([key, value]) => ({
//             id: key,
//             name: value.name,
//             price: value.price,
//             currency: value.currency || 'INR',
//             features: value.features || [],
//             limits: value.limits,
//             badgeText: value.badgeText,
//             recommended: value.recommended,
//             description: value.description
//           }));
      
//       setPlans(plansArray);
//     } catch (error) {
//       console.error('Error fetching plans:', error);
//       toast.error('Failed to load subscription plans');
//       // Fallback plans
//       setPlans(getFallbackPlans());
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCurrentSubscription = async () => {
//     try {
//       const response = await subscriptionAPI.getCurrent();
//       const data = response.data || response;
//       setCurrentPlan(data.plan);
//     } catch (error) {
//       console.error('Error fetching current plan:', error);
//     }
//   };

//   const handlePlanSelect = (plan) => {
//     setSelectedPlan(plan);
//     if (onPlanSelect) {
//       onPlanSelect(plan, billingCycle);
//     }
//   };

//   const handleSubscribe = async (plan) => {
//     if (plan.id === 'free') {
//       try {
//         const response = await subscriptionAPI.subscribe(plan.id, billingCycle, 'free');
//         toast.success('Free subscription activated!');
//         if (onPlanSelect) {
//           onPlanSelect(plan, billingCycle, response);
//         }
//       } catch (error) {
//         toast.error(error.response?.data?.message || 'Failed to activate free plan');
//       }
//     } else {
//       // Trigger payment flow
//       handlePlanSelect(plan);
//     }
//   };

//   const getPlanIcon = (planName) => {
//     const icons = {
//       free: <BookOpen className="h-8 w-8" />,
//       basic: <Music className="h-8 w-8" />,
//       premium: <Sparkles className="h-8 w-8" />,
//       pro: <Crown className="h-8 w-8" />
//     };
//     return icons[planName?.toLowerCase()] || <Star className="h-8 w-8" />;
//   };

//   const getPlanColor = (planName) => {
//     const colors = {
//       free: 'from-gray-500 to-gray-600',
//       basic: 'from-blue-500 to-blue-600',
//       premium: 'from-purple-500 to-purple-600',
//       pro: 'from-amber-500 to-amber-600'
//     };
//     return colors[planName?.toLowerCase()] || 'from-primary-500 to-primary-600';
//   };

//   const formatPrice = (amount, currency = 'INR') => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: currency,
//       minimumFractionDigits: 0
//     }).format(amount);
//   };

//   const getPriceForCycle = (plan) => {
//     if (billingCycle === 'yearly') {
//       return plan.price * 10; // 2 months free
//     } else if (billingCycle === 'quarterly') {
//       return plan.price * 3;
//     }
//     return plan.price;
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center py-12">
//         <div className="animate-pulse space-y-4">
//           <div className="h-4 w-32 bg-gray-200 rounded"></div>
//           <div className="h-64 w-full bg-gray-100 rounded-xl"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="py-12 px-4">
//       {/* Billing Cycle Toggle */}
//       <div className="flex justify-center mb-8">
//         <div className="bg-gray-100 rounded-full p-1 inline-flex">
//           <button
//             onClick={() => setBillingCycle('monthly')}
//             className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
//               billingCycle === 'monthly'
//                 ? 'bg-white text-primary-600 shadow-sm'
//                 : 'text-gray-600 hover:text-gray-800'
//             }`}
//           >
//             Monthly
//           </button>
//           <button
//             onClick={() => setBillingCycle('quarterly')}
//             className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
//               billingCycle === 'quarterly'
//                 ? 'bg-white text-primary-600 shadow-sm'
//                 : 'text-gray-600 hover:text-gray-800'
//             }`}
//           >
//             Quarterly
//           </button>
//           <button
//             onClick={() => setBillingCycle('yearly')}
//             className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
//               billingCycle === 'yearly'
//                 ? 'bg-white text-primary-600 shadow-sm'
//                 : 'text-gray-600 hover:text-gray-800'
//             }`}
//           >
//             Yearly <span className="text-green-600 text-xs ml-1">Save 17%</span>
//           </button>
//         </div>
//       </div>

//       {/* Plans Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
//         {plans.map((plan, index) => {
//           const isCurrentPlan = currentPlan?.plan === plan.id;
//           const isRecommended = plan.recommended;
//           const monthlyPrice = plan.price;
//           const displayPrice = getPriceForCycle(plan);
          
//           return (
//             <motion.div
//               key={plan.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
//                 isRecommended ? 'ring-2 ring-primary-500 scale-105 md:scale-105' : ''
//               } ${isCurrentPlan ? 'ring-2 ring-green-500' : ''}`}
//             >
//               {/* Recommended Badge */}
//               {isRecommended && (
//                 <div className="absolute top-0 right-0">
//                   <div className="bg-primary-500 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
//                     Recommended
//                   </div>
//                 </div>
//               )}

//               {/* Current Plan Badge */}
//               {isCurrentPlan && (
//                 <div className="absolute top-0 left-0">
//                   <div className="bg-green-500 text-white px-4 py-1 rounded-br-lg text-sm font-medium">
//                     Current Plan
//                   </div>
//                 </div>
//               )}

//               {/* Plan Header */}
//               <div className={`bg-gradient-to-r ${getPlanColor(plan.id)} p-6 text-white`}>
//                 <div className="mb-4">
//                   {getPlanIcon(plan.id)}
//                 </div>
//                 <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
//                 <p className="text-white/80 text-sm">{plan.description}</p>
//               </div>

//               {/* Price */}
//               <div className="p-6 border-b border-gray-100">
//                 <div className="flex items-baseline justify-center mb-2">
//                   <span className="text-4xl font-bold text-gray-900">
//                     {formatPrice(displayPrice, plan.currency)}
//                   </span>
//                   <span className="text-gray-500 ml-2">
//                     /{billingCycle === 'yearly' ? 'year' : billingCycle === 'quarterly' ? 'quarter' : 'month'}
//                   </span>
//                 </div>
//                 {billingCycle !== 'monthly' && (
//                   <p className="text-center text-sm text-green-600">
//                     Save {calculateSavings(plan.price, billingCycle)}% compared to monthly
//                   </p>
//                 )}
//                 {plan.id !== 'free' && (
//                   <p className="text-center text-xs text-gray-500 mt-2">
//                     {formatPrice(monthlyPrice)}/month billed {billingCycle === 'yearly' ? 'annually' : billingCycle === 'quarterly' ? 'quarterly' : 'monthly'}
//                   </p>
//                 )}
//               </div>

//               {/* Features */}
//               <div className="p-6 space-y-3">
//                 <p className="text-sm font-semibold text-gray-900 mb-3">What's included:</p>
//                 {plan.features?.slice(0, 6).map((feature, idx) => (
//                   <div key={idx} className="flex items-start gap-2">
//                     <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
//                     <span className="text-sm text-gray-600">{feature}</span>
//                   </div>
//                 ))}
//                 {plan.features?.length > 6 && (
//                   <button className="text-primary-600 text-sm mt-2 hover:underline">
//                     +{plan.features.length - 6} more features
//                   </button>
//                 )}
//               </div>

//               {/* Action Button */}
//               <div className="p-6 pt-0">
//                 {isCurrentPlan ? (
//                   <button
//                     disabled
//                     className="w-full py-3 rounded-lg bg-green-100 text-green-600 font-medium cursor-default"
//                   >
//                     Current Plan
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => handleSubscribe(plan)}
//                     className={`w-full py-3 rounded-lg font-medium transition-all ${
//                       plan.id === 'free'
//                         ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                         : 'bg-primary-600 text-white hover:bg-primary-700'
//                     }`}
//                   >
//                     {plan.id === 'free' ? 'Get Started' : `Subscribe to ${plan.name}`}
//                   </button>
//                 )}
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// const calculateSavings = (monthlyPrice, billingCycle) => {
//   if (billingCycle === 'yearly') {
//     const yearlyPrice = monthlyPrice * 12;
//     const discountedPrice = monthlyPrice * 10;
//     const savings = ((yearlyPrice - discountedPrice) / yearlyPrice) * 100;
//     return Math.round(savings);
//   }
//   if (billingCycle === 'quarterly') {
//     const quarterlyPrice = monthlyPrice * 3;
//     const discountedPrice = monthlyPrice * 2.8;
//     const savings = ((quarterlyPrice - discountedPrice) / quarterlyPrice) * 100;
//     return Math.round(savings);
//   }
//   return 0;
// };

// const getFallbackPlans = () => [
//   {
//     id: 'free',
//     name: 'Free',
//     price: 0,
//     currency: 'INR',
//     description: 'Perfect for getting started',
//     features: ['Browse all content', 'Read public poems', 'Basic search', '50 poems/day'],
//     recommended: false
//   },
//   {
//     id: 'basic',
//     name: 'Basic',
//     price: 99,
//     currency: 'INR',
//     description: 'Great for regular readers',
//     features: ['All free features', 'Unlimited poem reading', 'Download 5 ebooks/month', 'Basic audio streaming'],
//     recommended: true
//   },
//   {
//     id: 'premium',
//     name: 'Premium',
//     price: 199,
//     currency: 'INR',
//     description: 'For serious literature enthusiasts',
//     features: ['All Basic features', 'Unlimited downloads', 'HD audio streaming', 'Ad-free experience', 'AI explanations'],
//     recommended: false
//   },
//   {
//     id: 'pro',
//     name: 'Pro',
//     price: 499,
//     currency: 'INR',
//     description: 'For creators and power users',
//     features: ['All Premium features', 'Creator tools', 'Priority support', 'Analytics dashboard', 'Early access'],
//     recommended: false
//   }
// ];

// export default SubscriptionPlans;


















// client/src/components/home/SubscriptionPlans.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Star, Sparkles, Zap, Shield, Music, BookOpen, Headphones, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import subscriptionAPI from '../../api/subscriptionAPI';

const SubscriptionPlans = ({ onPlanSelect, showCurrentPlan = false }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  const [plans, setPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscribingPlan, setSubscribingPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly');

  useEffect(() => {
    fetchPlans();
    if (showCurrentPlan) {
      fetchCurrentSubscription();
    }
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await subscriptionAPI.getPlans();
      const plansData = response.data || response;
      
      // Convert object to array if needed
      const plansArray = Array.isArray(plansData) 
        ? plansData 
        : Object.entries(plansData).map(([key, value]) => ({
            id: key,
            name: value.name,
            price: value.price,
            currency: value.currency || 'INR',
            features: value.features || [],
            limits: value.limits,
            badgeText: value.badgeText,
            recommended: value.recommended,
            description: value.description
          }));
      
      setPlans(plansArray);
    } catch (error) {
      console.error('Error fetching plans:', error);
      toast.error(t('subscription.fetchError'));
      setPlans(getFallbackPlans());
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentSubscription = async () => {
    try {
      if (!isAuthenticated) return;
      const response = await subscriptionAPI.getCurrent();
      const data = response.data || response;
      setCurrentPlan(data);
    } catch (error) {
      console.error('Error fetching current plan:', error);
    }
  };

  const handleSubscribe = async (plan) => {
    // Check if user is logged in
    if (!isAuthenticated) {
      toast.error(t('subscription.loginRequired'));
      navigate('/login', { state: { returnTo: '/subscription' } });
      return;
    }

    // Handle free plan
    if (plan.id === 'free') {
      setSubscribingPlan(plan.id);
      try {
        const response = await subscriptionAPI.subscribe(plan.id, billingCycle, 'free');
        if (response.success) {
          toast.success(t('subscription.freeActivated'));
          await fetchCurrentSubscription();
          if (onPlanSelect) {
            onPlanSelect(plan, billingCycle, response);
          }
          // Refresh user data
          window.location.reload();
        } else {
          toast.error(response.message || t('subscription.activationFailed'));
        }
      } catch (error) {
        console.error('Error activating free plan:', error);
        toast.error(error.response?.data?.message || t('subscription.activationFailed'));
      } finally {
        setSubscribingPlan(null);
      }
      return;
    }

    // For paid plans, show payment options
    setSubscribingPlan(plan.id);
    
    try {
      // Create subscription
      const response = await subscriptionAPI.subscribe(plan.id, billingCycle, 'pending');
      
      if (response.success && response.data) {
        const { subscription, requiresPayment } = response.data;
        
        if (requiresPayment) {
          // Show payment modal or redirect to payment page
          toast.info(t('subscription.paymentRequired'));
          
          // You can integrate Razorpay or Stripe here
          // For now, show a prompt
          if (window.confirm(`${t('subscription.proceedToPayment')} ${formatPrice(plan.price)}?`)) {
            // Simulate payment success
            await handlePaymentVerification(subscription._id);
          }
        } else {
          toast.success(t('subscription.activated'));
          await fetchCurrentSubscription();
          if (onPlanSelect) onPlanSelect(plan, billingCycle, response);
          window.location.reload();
        }
      } else {
        toast.error(response.message || t('subscription.subscriptionFailed'));
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      toast.error(error.response?.data?.message || t('subscription.subscriptionFailed'));
    } finally {
      setSubscribingPlan(null);
    }
  };

  const handlePaymentVerification = async (subscriptionId) => {
    try {
      // Simulate payment verification
      const paymentData = {
        subscriptionId,
        paymentId: `PAY_${Date.now()}`,
        orderId: `ORD_${Date.now()}`
      };
      
      const response = await subscriptionAPI.verifyPayment(paymentData);
      
      if (response.success) {
        toast.success(t('subscription.paymentSuccess'));
        await fetchCurrentSubscription();
        window.location.reload();
      } else {
        toast.error(response.message || t('subscription.paymentFailed'));
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      toast.error(t('subscription.paymentFailed'));
    }
  };

  const getPlanIcon = (planName) => {
    const icons = {
      free: <BookOpen className="h-8 w-8" />,
      basic: <Music className="h-8 w-8" />,
      premium: <Sparkles className="h-8 w-8" />,
      pro: <Crown className="h-8 w-8" />
    };
    return icons[planName?.toLowerCase()] || <Star className="h-8 w-8" />;
  };

  const getPlanColor = (planName) => {
    const colors = {
      free: 'from-gray-500 to-gray-600',
      basic: 'from-blue-500 to-blue-600',
      premium: 'from-purple-500 to-purple-600',
      pro: 'from-amber-500 to-amber-600'
    };
    return colors[planName?.toLowerCase()] || 'from-primary-500 to-primary-600';
  };

  const formatPrice = (amount, currency = 'INR') => {
    return new Intl.NumberFormat(i18n.language === 'hi' ? 'hi-IN' : 'en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getPriceForCycle = (plan) => {
    if (billingCycle === 'yearly') {
      return plan.price * 10; // 2 months free
    } else if (billingCycle === 'quarterly') {
      return plan.price * 3;
    }
    return plan.price;
  };

  const isCurrentPlanActive = (planId) => {
    if (!currentPlan) return false;
    const currentPlanId = currentPlan.plan || currentPlan.id || currentPlan;
    return currentPlanId === planId;
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-32 bg-gray-200 rounded mx-auto"></div>
          <div className="h-64 w-full bg-gray-100 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4">
      {/* Billing Cycle Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-full p-1 inline-flex">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              billingCycle === 'monthly'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {t('subscription.monthly')}
          </button>
          <button
            onClick={() => setBillingCycle('quarterly')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              billingCycle === 'quarterly'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {t('subscription.quarterly')}
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              billingCycle === 'yearly'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {t('subscription.yearly')} <span className="text-green-600 text-xs ml-1">{t('subscription.save17')}</span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {plans.map((plan, index) => {
          const isCurrentPlan = isCurrentPlanActive(plan.id);
          const isRecommended = plan.recommended;
          const monthlyPrice = plan.price;
          const displayPrice = getPriceForCycle(plan);
          const isSubscribing = subscribingPlan === plan.id;
          
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
                isRecommended ? 'ring-2 ring-primary-500 scale-105 md:scale-105' : ''
              } ${isCurrentPlan ? 'ring-2 ring-green-500' : ''}`}
            >
              {/* Recommended Badge */}
              {isRecommended && (
                <div className="absolute top-0 right-0">
                  <div className="bg-primary-500 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                    {t('subscription.recommended')}
                  </div>
                </div>
              )}

              {/* Current Plan Badge */}
              {isCurrentPlan && (
                <div className="absolute top-0 left-0">
                  <div className="bg-green-500 text-white px-4 py-1 rounded-br-lg text-sm font-medium">
                    {t('subscription.currentPlan')}
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className={`bg-gradient-to-r ${getPlanColor(plan.id)} p-6 text-white`}>
                <div className="mb-4">
                  {getPlanIcon(plan.id)}
                </div>
                <h3 className="text-2xl font-bold mb-2">{t(`subscription.plans.${plan.id}.name`, plan.name)}</h3>
                <p className="text-white/80 text-sm">{t(`subscription.plans.${plan.id}.description`, plan.description)}</p>
              </div>

              {/* Price */}
              <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {formatPrice(displayPrice, plan.currency)}
                  </span>
                  <span className="text-gray-500 ml-2">
                    /{billingCycle === 'yearly' ? t('subscription.year') : billingCycle === 'quarterly' ? t('subscription.quarter') : t('subscription.month')}
                  </span>
                </div>
                {billingCycle !== 'monthly' && plan.price > 0 && (
                  <p className="text-center text-sm text-green-600">
                    {t('subscription.savePercent', { percent: calculateSavings(plan.price, billingCycle) })}
                  </p>
                )}
                {plan.id !== 'free' && (
                  <p className="text-center text-xs text-gray-500 mt-2">
                    {formatPrice(monthlyPrice)}/{t('subscription.month')} {t('subscription.billedAs', { cycle: billingCycle === 'yearly' ? t('subscription.annually') : billingCycle === 'quarterly' ? t('subscription.quarterly') : t('subscription.monthly') })}
                  </p>
                )}
              </div>

              {/* Features */}
              <div className="p-6 space-y-3">
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">{t('subscription.whatsIncluded')}:</p>
                {plan.features?.slice(0, 6).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {t(`subscription.features.${plan.id}.${idx}`, feature)}
                    </span>
                  </div>
                ))}
                {plan.features?.length > 6 && (
                  <button className="text-primary-600 text-sm mt-2 hover:underline">
                    +{plan.features.length - 6} {t('subscription.moreFeatures')}
                  </button>
                )}
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                {isCurrentPlan ? (
                  <button
                    disabled
                    className="w-full py-3 rounded-lg bg-green-100 text-green-600 font-medium cursor-default"
                  >
                    {t('subscription.currentPlan')}
                  </button>
                ) : (
                  <button
                    onClick={() => handleSubscribe(plan)}
                    disabled={isSubscribing}
                    className={`w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                      plan.id === 'free'
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isSubscribing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t('subscription.processing')}
                      </>
                    ) : (
                      plan.id === 'free' ? t('subscription.getStarted') : `${t('subscription.subscribeTo')} ${t(`subscription.plans.${plan.id}.name`, plan.name)}`
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const calculateSavings = (monthlyPrice, billingCycle) => {
  if (billingCycle === 'yearly') {
    const yearlyPrice = monthlyPrice * 12;
    const discountedPrice = monthlyPrice * 10;
    const savings = ((yearlyPrice - discountedPrice) / yearlyPrice) * 100;
    return Math.round(savings);
  }
  if (billingCycle === 'quarterly') {
    const quarterlyPrice = monthlyPrice * 3;
    const discountedPrice = monthlyPrice * 2.8;
    const savings = ((quarterlyPrice - discountedPrice) / quarterlyPrice) * 100;
    return Math.round(savings);
  }
  return 0;
};

const getFallbackPlans = () => [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    currency: 'INR',
    description: 'Perfect for getting started',
    features: ['Browse all content', 'Read public poems', 'Basic search', '50 poems/day'],
    recommended: false
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 99,
    currency: 'INR',
    description: 'Great for regular readers',
    features: ['All free features', 'Unlimited poem reading', 'Download 5 ebooks/month', 'Basic audio streaming'],
    recommended: true
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 199,
    currency: 'INR',
    description: 'For serious literature enthusiasts',
    features: ['All Basic features', 'Unlimited downloads', 'HD audio streaming', 'Ad-free experience', 'AI explanations'],
    recommended: false
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 499,
    currency: 'INR',
    description: 'For creators and power users',
    features: ['All Premium features', 'Creator tools', 'Priority support', 'Analytics dashboard', 'Early access'],
    recommended: false
  }
];

export default SubscriptionPlans;