// client/src/pages/public/SubscriptionPlansPage.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Crown, Sparkles, BookOpen, Zap, Check, Loader2, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import subscriptionAPI from '../../api/subscriptionAPI';
import { initRazorpayPayment } from '../../utils/paymentHelper';

const FALLBACK_PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    currency: 'INR',
    features: ['Browse all content', 'Read public poems', 'Basic search', '50 poems/day'],
    badgeText: '',
    recommended: false,
    icon: Sparkles,
    gradient: 'from-gray-400 to-gray-600'
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 99,
    currency: 'INR',
    features: ['All free features', 'Unlimited poem reading', 'Download 5 ebooks/month', 'Basic audio streaming'],
    badgeText: 'Popular',
    recommended: true,
    icon: BookOpen,
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 199,
    currency: 'INR',
    features: ['All Basic features', 'Unlimited downloads', 'HD audio streaming', 'Ad-free experience', 'AI explanations'],
    badgeText: 'Best Value',
    recommended: true,
    icon: Crown,
    gradient: 'from-amber-400 to-orange-500'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 499,
    currency: 'INR',
    features: ['All Premium features', 'Creator tools', 'Priority support', 'Analytics dashboard', 'Early access'],
    badgeText: 'Creator',
    recommended: false,
    icon: Zap,
    gradient: 'from-purple-500 to-pink-600'
  }
];

const SubscriptionPlansPage = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingPlan, setProcessingPlan] = useState(null);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    fetchPlansAndSubscription();
  }, []);

  const fetchPlansAndSubscription = async () => {
    setLoading(true);
    setApiError(false);
    try {
      // Fetch plans
      let plansData;
      try {
        const response = await subscriptionAPI.getPlans();
        plansData = response.data || response;
        const plansArray = Array.isArray(plansData) 
          ? plansData 
          : Object.entries(plansData).map(([key, value]) => ({
              id: key,
              name: value.name,
              price: value.price,
              currency: value.currency || 'INR',
              features: Array.isArray(value.features) ? value.features.map(f => typeof f === 'object' ? f.name : f) : [],
              badgeText: value.badgeText,
              recommended: value.recommended,
              icon: getPlanIcon(key),
              gradient: getPlanGradient(key)
            }));
        setPlans(plansArray);
      } catch (err) {
        console.warn('Using fallback plans:', err);
        setPlans(FALLBACK_PLANS);
        setApiError(true);
      }

      // Fetch current subscription
      try {
        const subResponse = await subscriptionAPI.getCurrent();
        const subData = subResponse.data || subResponse;
        setCurrentSubscription(subData);
      } catch (err) {
        console.warn('No subscription found:', err);
        setCurrentSubscription({ plan: 'free', status: 'active' });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setPlans(FALLBACK_PLANS);
      setApiError(true);
    } finally {
      setLoading(false);
    }
  };

  const getPlanIcon = (planId) => {
    const icons = { free: Sparkles, basic: BookOpen, premium: Crown, pro: Zap };
    return icons[planId] || Sparkles;
  };

  const getPlanGradient = (planId) => {
    const gradients = {
      free: 'from-gray-400 to-gray-600',
      basic: 'from-blue-500 to-indigo-600',
      premium: 'from-amber-400 to-orange-500',
      pro: 'from-purple-500 to-pink-600'
    };
    return gradients[planId] || 'from-primary-500 to-primary-600';
  };

  const isCurrentPlan = (planId) => {
    if (!currentSubscription) return planId === 'free';
    return currentSubscription.plan === planId;
  };

  const handleSubscribe = async (plan) => {
    if (!user) {
      toast.error('Please login to subscribe');
      navigate('/login', { state: { from: '/subscription-plans' } });
      return;
    }

    if (isCurrentPlan(plan.id)) {
      toast.success(`You are already on the ${plan.name} plan`);
      return;
    }

    if (plan.id === 'free') {
      try {
        setProcessingPlan(plan.id);
        await subscriptionAPI.subscribe({ plan: 'free', billingCycle: 'monthly' });
        toast.success('Free plan activated!');
        navigate('/dashboard');
      } catch (error) {
        console.error('Error activating free plan:', error);
        toast.error(error.response?.data?.message || 'Failed to activate free plan');
      } finally {
        setProcessingPlan(null);
      }
      return;
    }

    // Handle paid plan subscription
    setProcessingPlan(plan.id);
    try {
      const result = await initRazorpayPayment({
        planId: plan.id,
        planName: plan.name,
        amount: plan.price,
        currency: plan.currency || 'INR',
        userEmail: user.email,
        userName: user.name
      });

      if (result.success) {
        toast.success(`Successfully subscribed to ${plan.name} plan!`);
        // Refresh subscription data
        await fetchPlansAndSubscription();
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error(error.message || 'Failed to process subscription');
    } finally {
      setProcessingPlan(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan for your literary journey. Upgrade anytime to unlock more features.
          </p>
        </div>

        {/* API Error Banner */}
        {apiError && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <p className="text-yellow-800">Using demo plans. Some features may be limited.</p>
          </div>
        )}

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const current = isCurrentPlan(plan.id);
            const isProcessing = processingPlan === plan.id;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl overflow-hidden ${
                  plan.recommended ? 'ring-2 ring-primary-500 shadow-xl scale-105' : 'shadow-lg'
                }`}
              >
                <div className={`bg-gradient-to-br ${plan.gradient} p-6 text-white`}>
                  <Icon className="h-10 w-10 mb-4" />
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      {plan.currency === 'INR' ? '₹' : '$'}{plan.price}
                    </span>
                    <span className="text-sm opacity-80">/month</span>
                  </div>
                  {plan.badgeText && (
                    <span className="inline-block mt-3 px-3 py-1 bg-white/20 rounded-full text-sm">
                      {plan.badgeText}
                    </span>
                  )}
                </div>

                <div className="bg-white p-6">
                  <ul className="space-y-3 mb-6">
                    {plan.features.slice(0, 5).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSubscribe(plan)}
                    disabled={current || isProcessing}
                    className={`w-full py-3 rounded-lg font-semibold transition-all ${
                      current
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        : `bg-gradient-to-r ${plan.gradient} text-white hover:shadow-lg hover:scale-105`
                    }`}
                  >
                    {isProcessing ? (
                      <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                    ) : current ? (
                      'Current Plan'
                    ) : plan.id === 'free' ? (
                      'Get Started'
                    ) : (
                      `Upgrade to ${plan.name}`
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlansPage;