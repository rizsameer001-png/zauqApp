//client/src/pages/subscription/SubscriptionSuccessPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { CheckCircle, Home, BookOpen, Headphones, Award, ArrowRight } from 'lucide-react';
import axios from 'axios';

const SubscriptionSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [subscriptionDetails, setSubscriptionDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get subscription ID from URL params
    const params = new URLSearchParams(location.search);
    const sessionId = params.get('session_id');
    const subscriptionId = params.get('subscription_id');

    if (sessionId || subscriptionId) {
      verifySubscription(sessionId || subscriptionId);
    } else {
      setLoading(false);
    }
  }, [location]);

  const verifySubscription = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/subscriptions/verify-payment',
        { subscriptionId: id, paymentId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setSubscriptionDetails(response.data.data);
      }
    } catch (error) {
      console.error('Verification error:', error);
      setError('Failed to verify subscription. Please contact support.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: BookOpen,
      title: 'Unlimited Access',
      description: 'Access all premium content without any restrictions'
    },
    {
      icon: Headphones,
      title: 'HD Audio Streaming',
      description: 'Enjoy crystal clear audio with high-quality streaming'
    },
    {
      icon: Award,
      title: 'Exclusive Content',
      description: 'Get access to members-only poems, books, and audios'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying your subscription...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Subscription Successful! 🎉
            </h1>
            <p className="text-green-100 text-lg">
              Thank you for subscribing to ZauqApp Premium
            </p>
          </div>

          {/* Success Content */}
          <div className="p-8">
            {/* Welcome Message */}
            <div className="text-center mb-8">
              <p className="text-gray-600 text-lg">
                Your subscription has been successfully activated. You now have access to all premium features.
              </p>
              {subscriptionDetails && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg inline-block">
                  <p className="text-sm text-gray-600">
                    Plan: <span className="font-semibold text-green-600">
                      {subscriptionDetails.plan?.plan || subscriptionDetails.plan?.name || 'Premium'}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Valid until: <span className="font-semibold">
                      {new Date(subscriptionDetails.expiresAt || subscriptionDetails.plan?.expiresAt).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* Features Grid */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                What's Included in Your Plan?
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                        <Icon className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Link
                  to="/"
                  className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <Home className="h-5 w-5 mr-2" />
                  Back to Home
                </Link>
                <Link
                  to="/premium-content"
                  className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-colors"
                >
                  Explore Premium Content
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </div>
              
              <Link
                to="/account/subscription"
                className="block text-center text-sm text-green-600 hover:text-green-700"
              >
                Manage your subscription settings →
              </Link>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@zauqapp.com" className="text-green-600 hover:text-green-700">
              support@zauqapp.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccessPage;