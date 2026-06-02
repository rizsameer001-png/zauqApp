//client/src/pages/subscription/SubscriptionCancelPage.jsx:
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { XCircle, Home, RefreshCw, HelpCircle, Mail, ArrowRight, Sparkles } from 'lucide-react';

const SubscriptionCancelPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  useEffect(() => {
    // Auto redirect countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    try {
      // Send feedback to backend
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/feedback/subscription-cancel',
        { reason: feedbackText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFeedbackSubmitted(true);
    } catch (error) {
      console.error('Feedback error:', error);
      setFeedbackSubmitted(true);
    }
  };

  const reasons = [
    'Too expensive for me',
    'Not using it enough',
    'Missing features I need',
    'Technical issues',
    'Found a better alternative',
    "I'll subscribe later",
    'Other'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Cancel Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Cancel Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-600 px-6 py-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6">
              <XCircle className="h-12 w-12 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Subscription Cancelled 😔
            </h1>
            <p className="text-orange-100 text-lg">
              Your subscription has been cancelled successfully
            </p>
          </div>

          {/* Cancel Content */}
          <div className="p-8">
            {/* Message */}
            <div className="text-center mb-8">
              <p className="text-gray-600 text-lg">
                We're sad to see you go! Your subscription will remain active until the end of your billing period.
              </p>
              <div className="mt-4 p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  You will continue to have access to premium features until:{' '}
                  <span className="font-semibold text-orange-600">
                    {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </span>
                </p>
              </div>
            </div>

            {/* Reasons Section */}
            <div className="mb-8">
              <button
                onClick={() => setShowFeedback(!showFeedback)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center">
                  <HelpCircle className="h-5 w-5 text-gray-500 mr-3" />
                  <span className="text-gray-700">Help us improve by telling us why you cancelled</span>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </button>

              {showFeedback && !feedbackSubmitted && (
                <div className="mt-4 p-6 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Why did you decide to cancel?
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    {reasons.map((reason, index) => (
                      <button
                        key={index}
                        onClick={() => setFeedbackText(reason)}
                        className={`text-left px-4 py-2 rounded-lg transition-colors ${
                          feedbackText === reason
                            ? 'bg-orange-100 text-orange-700 border-orange-300'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        } border`}
                      >
                        {reason}
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Or tell us more details..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    rows="3"
                  />
                  <button
                    onClick={handleFeedbackSubmit}
                    className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Submit Feedback
                  </button>
                </div>
              )}

              {feedbackSubmitted && (
                <div className="mt-4 p-6 bg-green-50 rounded-xl text-center">
                  <p className="text-green-600">
                    Thank you for your feedback! We'll work on improving your experience.
                  </p>
                </div>
              )}
            </div>

            {/* Alternative Plans */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
                Maybe a different plan would suit you better?
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="text-center p-4 border border-gray-200 rounded-xl">
                  <Sparkles className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800">Free Plan</h3>
                  <p className="text-sm text-gray-600 mt-1">₹0/month</p>
                  <Link
                    to="/subscribe?plan=free"
                    className="mt-3 inline-block text-sm text-blue-600 hover:text-blue-700"
                  >
                    Switch to Free →
                  </Link>
                </div>
                <div className="text-center p-4 border-2 border-orange-500 rounded-xl bg-orange-50">
                  <Sparkles className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800">Basic Plan</h3>
                  <p className="text-sm text-gray-600 mt-1">₹99/month</p>
                  <Link
                    to="/subscribe?plan=basic"
                    className="mt-3 inline-block text-sm text-orange-600 hover:text-orange-700"
                  >
                    Downgrade to Basic →
                  </Link>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-xl">
                  <Sparkles className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800">Premium Plan</h3>
                  <p className="text-sm text-gray-600 mt-1">₹199/month</p>
                  <Link
                    to="/subscribe?plan=premium"
                    className="mt-3 inline-block text-sm text-purple-600 hover:text-purple-700"
                  >
                    Downgrade to Premium →
                  </Link>
                </div>
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
                  to="/subscribe"
                  className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-colors"
                >
                  <RefreshCw className="h-5 w-5 mr-2" />
                  Resubscribe
                </Link>
              </div>
              
              <Link
                to="/contact-support"
                className="flex items-center justify-center text-sm text-gray-600 hover:text-gray-700"
              >
                <Mail className="h-4 w-4 mr-2" />
                Need help? Contact Support
              </Link>
            </div>

            {/* Auto redirect info */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                You will be redirected to homepage in {countdown} seconds...
              </p>
            </div>
          </div>
        </div>

        {/* Special Offer Section */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            🎁 Come Back Special Offer
          </h3>
          <p className="text-gray-600 mb-3">
            If you resubscribe within 30 days, get 20% off on your first month!
          </p>
          <Link
            to="/subscribe?offer=comeback20"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
          >
            Claim Offer Now
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCancelPage;