// //client/src/pages/public/SubscriptionPage.jsx
// import React, { useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { motion } from 'framer-motion'
// import { Check, Crown, Sparkles, Zap } from 'lucide-react'
// import { SUBSCRIPTION_PLANS } from '../../utils/constants.js'

// const SubscriptionPage = () => {
//   const { t } = useTranslation()
//   const [billingCycle, setBillingCycle] = useState('monthly')
//   const [selectedPlan, setSelectedPlan] = useState('premium')

//   const plans = [
//     {
//       ...SUBSCRIPTION_PLANS[0],
//       icon: Zap,
//       color: 'gray',
//     },
//     {
//       ...SUBSCRIPTION_PLANS[1],
//       icon: Crown,
//       color: 'primary',
//       popular: true,
//     },
//     {
//       ...SUBSCRIPTION_PLANS[2],
//       icon: Sparkles,
//       color: 'secondary',
//     },
//   ]

//   const getPrice = (plan) => {
//     if (plan.price === 0) return 'Free'
//     const price = billingCycle === 'yearly' ? plan.price * 10 : plan.price
//     return `$${price.toFixed(2)}`
//   }

//   return (
//     <div className="page-container max-w-6xl">
//       <div className="text-center mb-12">
//         <h1 className="section-title">Choose Your Plan</h1>
//         <p className="section-subtitle">Unlock the full potential of ZauqApp</p>

//         {/* Billing Toggle */}
//         <div className="inline-flex items-center space-x-4 mt-6 p-1 bg-gray-100 rounded-lg">
//           <button
//             onClick={() => setBillingCycle('monthly')}
//             className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//               billingCycle === 'monthly'
//                 ? 'bg-white text-gray-900 shadow-sm'
//                 : 'text-gray-500 hover:text-gray-700'
//             }`}
//           >
//             Monthly
//           </button>
//           <button
//             onClick={() => setBillingCycle('yearly')}
//             className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//               billingCycle === 'yearly'
//                 ? 'bg-white text-gray-900 shadow-sm'
//                 : 'text-gray-500 hover:text-gray-700'
//             }`}
//           >
//             Yearly
//             <span className="ml-1 text-xs text-green-600 font-medium">Save 20%</span>
//           </button>
//         </div>
//       </div>

//       {/* Plans */}
//       <div className="grid md:grid-cols-3 gap-8">
//         {plans.map((plan, index) => (
//           <motion.div
//             key={plan.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className={`relative card p-8 ${
//               plan.popular
//                 ? 'border-2 border-primary-500 shadow-lg scale-105'
//                 : 'hover:shadow-md transition-shadow'
//             }`}
//           >
//             {plan.popular && (
//               <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
//                 <span className="px-3 py-1 bg-primary-600 text-white text-xs font-medium rounded-full">
//                   Most Popular
//                 </span>
//               </div>
//             )}

//             <div className="text-center mb-6">
//               <div className={`inline-flex p-3 rounded-xl bg-${plan.color}-100 mb-4`}>
//                 <plan.icon className={`h-8 w-8 text-${plan.color}-600`} />
//               </div>
//               <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
//               <div className="mt-2">
//                 <span className="text-4xl font-bold text-gray-900">{getPrice(plan)}</span>
//                 {plan.price > 0 && (
//                   <span className="text-gray-500">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
//                 )}
//               </div>
//             </div>

//             <ul className="space-y-3 mb-8">
//               {plan.features.map((feature, i) => (
//                 <li key={i} className="flex items-start space-x-3">
//                   <Check className={`h-5 w-5 text-${plan.color}-600 flex-shrink-0 mt-0.5`} />
//                   <span className="text-gray-700 text-sm">{feature}</span>
//                 </li>
//               ))}
//             </ul>

//             <button
//               onClick={() => setSelectedPlan(plan.id)}
//               className={`w-full py-3 rounded-lg font-medium transition-colors ${
//                 plan.popular
//                   ? 'bg-primary-600 text-white hover:bg-primary-700'
//                   : selectedPlan === plan.id
//                   ? 'bg-gray-900 text-white hover:bg-gray-800'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               {plan.price === 0 ? 'Get Started' : 'Subscribe Now'}
//             </button>
//           </motion.div>
//         ))}
//       </div>

//       {/* FAQ */}
//       <div className="mt-16">
//         <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
//         <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
//           {[
//             { q: 'Can I cancel anytime?', a: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.' },
//             { q: 'What payment methods are accepted?', a: 'We accept all major credit cards, PayPal, and UPI for Indian users.' },
//             { q: 'Is there a free trial?', a: 'Yes, Premium and Creator plans come with a 7-day free trial.' },
//             { q: 'Can I switch plans?', a: 'Yes, you can upgrade or downgrade your plan at any time.' },
//           ].map((faq, index) => (
//             <div key={index} className="card p-6">
//               <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
//               <p className="text-gray-600 text-sm">{faq.a}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SubscriptionPage














import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, Star, Crown, Zap, Shield, Headphones, BookOpen, Download, Sparkles, CreditCard } from 'lucide-react';
import axios from 'axios';
import { SUBSCRIPTION_PLANS, getAllPlans, getRecommendedPlans } from '../../utils/constants';

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetchUserAndSubscription();
    fetchPlansFromAPI();
  }, []);

  const fetchUserAndSubscription = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data.data);
        
        // Get current subscription
        const subResponse = await axios.get('/api/subscriptions/current', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCurrentSubscription(subResponse.data.data);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchPlansFromAPI = async () => {
    try {
      const response = await axios.get('/api/subscriptions/plans');
      if (response.data.data) {
        // Transform API response to our format
        const apiPlans = Object.entries(response.data.data).map(([key, value]) => ({
          id: key,
          name: value.name,
          price: value.price,
          currency: value.currency || 'INR',
          features: value.features || [],
          limits: value.limits || {},
          badge: value.badgeText,
          recommended: value.recommended,
          description: value.description
        }));
        setPlans(apiPlans);
      } else {
        // Fallback to constants
        setPlans(getAllPlans());
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
      // Fallback to constants
      setPlans(getAllPlans());
    }
  };

  const calculatePrice = (plan, cycle) => {
    const basePrice = plan.price;
    if (cycle === 'quarterly') {
      return {
        amount: basePrice * 3,
        savings: 10,
        period: 'quarter'
      };
    } else if (cycle === 'yearly') {
      return {
        amount: basePrice * 12,
        savings: 20,
        period: 'year'
      };
    }
    return {
      amount: basePrice,
      savings: 0,
      period: 'month'
    };
  };

  const handleSubscribe = async (plan) => {
    if (!user) {
      // Redirect to login
      navigate('/login', { state: { from: '/subscription', selectedPlan: plan.id } });
      return;
    }

    setSelectedPlan(plan);
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/subscriptions/subscribe',
        {
          plan: plan.id,
          billingCycle,
          paymentMethod: 'card'
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        // Redirect to payment gateway or success page
        if (response.data.data.paymentUrl) {
          window.location.href = response.data.data.paymentUrl;
        } else {
          navigate('/subscription/success', {
            state: { subscription: response.data.data }
          });
        }
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert(error.response?.data?.message || 'Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getPlanIcon = (planName) => {
    switch (planName?.toLowerCase()) {
      case 'free':
        return <Sparkles className="h-8 w-8 text-gray-500" />;
      case 'basic':
        return <BookOpen className="h-8 w-8 text-blue-500" />;
      case 'premium':
        return <Crown className="h-8 w-8 text-amber-500" />;
      case 'pro':
        return <Zap className="h-8 w-8 text-purple-500" />;
      default:
        return <Star className="h-8 w-8 text-primary-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock unlimited access to premium poems, books, and audio content
          </p>
          
          {user && currentSubscription?.plan?.plan !== 'free' && (
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-100 rounded-full">
              <Shield className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm text-green-700">
                Current Plan: {currentSubscription?.plan?.plan || 'Free'}
              </span>
            </div>
          )}
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-1 shadow-md inline-flex">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('quarterly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'quarterly'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Quarterly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors relative ${
                billingCycle === 'yearly'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => {
            const priceInfo = calculatePrice(plan, billingCycle);
            const isCurrentPlan = currentSubscription?.plan?.plan === plan.id;
            
            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105 ${
                  plan.recommended ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                {plan.recommended && (
                  <div className="absolute top-0 right-0 bg-primary-500 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                    Recommended
                  </div>
                )}
                
                {plan.badge && (
                  <div className="absolute top-0 left-0 bg-amber-500 text-white px-4 py-1 text-sm font-semibold rounded-br-lg">
                    {plan.badge}
                  </div>
                )}

                <div className="p-6">
                  {/* Plan Icon */}
                  <div className="flex justify-center mb-4">
                    {getPlanIcon(plan.name)}
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  
                  {/* Price */}
                  <div className="text-center mb-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900">
                        ₹{priceInfo.amount}
                      </span>
                      <span className="text-gray-600 ml-2">
                        /{priceInfo.period}
                      </span>
                    </div>
                    {priceInfo.savings > 0 && (
                      <p className="text-sm text-green-600 mt-1">
                        Save {priceInfo.savings}% compared to monthly
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-center text-sm mb-6">
                    {plan.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3 mb-6">
                    {plan.features.slice(0, 5).map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                    {plan.features.length > 5 && (
                      <li className="text-xs text-gray-500 text-center">
                        +{plan.features.length - 5} more features
                      </li>
                    )}
                  </ul>

                  {/* Subscribe Button */}
                  <button
                    onClick={() => handleSubscribe(plan)}
                    disabled={loading && selectedPlan?.id === plan.id || isCurrentPlan}
                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                      isCurrentPlan
                        ? 'bg-gray-300 cursor-not-allowed text-gray-600'
                        : plan.id === 'free'
                        ? 'bg-gray-600 hover:bg-gray-700 text-white'
                        : 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white'
                    }`}
                  >
                    {loading && selectedPlan?.id === plan.id ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      </div>
                    ) : isCurrentPlan ? (
                      'Current Plan'
                    ) : plan.price === 0 ? (
                      'Get Started'
                    ) : (
                      `Subscribe to ${plan.name}`
                    )}
                  </button>

                  {/* Payment Methods */}
                  {plan.price > 0 && (
                    <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500">
                      <CreditCard className="h-3 w-3" />
                      <span>Secure payment</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Comparison Table (Mobile) */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl overflow-hidden lg:hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Compare All Features
            </h2>
            <div className="space-y-4">
              {plans.map((plan) => (
                <div key={plan.id} className="border-b border-gray-200 pb-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{plan.name}</h3>
                  <ul className="space-y-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600 text-sm">
                Yes, you can cancel your subscription at any time. No questions asked!
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h3>
              <p className="text-gray-600 text-sm">
                We offer a 7-day free trial on all paid plans. Cancel anytime during trial.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600 text-sm">
                We accept all major credit cards, UPI, net banking, and digital wallets.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I change my plan later?</h3>
              <p className="text-gray-600 text-sm">
                Yes, you can upgrade or downgrade your plan at any time from your account settings.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center text-gray-500">
              <Shield className="h-5 w-5 mr-2" />
              <span className="text-sm">Secure Payments</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Headphones className="h-5 w-5 mr-2" />
              <span className="text-sm">24/7 Support</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Download className="h-5 w-5 mr-2" />
              <span className="text-sm">Cancel Anytime</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;