// client/src/pages/user/UserSubscriptionsPage.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { CreditCard, Calendar, CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import subscriptionAPI from '../../api/subscriptionAPI';
import { Link } from 'react-router-dom';

const UserSubscriptionsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [subscriptions, setSubscriptions] = useState([]);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserSubscriptions();
  }, []);

  const fetchUserSubscriptions = async () => {
    setLoading(true);
    try {
      const [current, history] = await Promise.all([
        subscriptionAPI.getCurrent(),
        subscriptionAPI.getBillingHistory()
      ]);
      
      setCurrentSubscription(current.data || current);
      setSubscriptions(history.data || history);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      toast.error('Failed to load subscription data');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!window.confirm('Are you sure you want to cancel your subscription?')) return;
    
    try {
      await subscriptionAPI.cancel();
      toast.success('Subscription cancelled successfully');
      fetchUserSubscriptions();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel subscription');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: { color: 'bg-green-100 text-green-700', icon: CheckCircle, text: 'Active' },
      cancelled: { color: 'bg-red-100 text-red-700', icon: XCircle, text: 'Cancelled' },
      expired: { color: 'bg-gray-100 text-gray-700', icon: Clock, text: 'Expired' },
      pending: { color: 'bg-yellow-100 text-yellow-700', icon: Clock, text: 'Pending' }
    };
    const badge = badges[status] || badges.pending;
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${badge.color}`}>
        <Icon className="h-3 w-3" />
        {badge.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Subscriptions</h1>
        <p className="text-gray-500">Manage your subscription and billing information</p>
      </div>

      {/* Current Subscription */}
      {currentSubscription?.plan && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Plan</h2>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold text-primary-600 capitalize">
                  {currentSubscription.plan?.plan || currentSubscription.plan}
                </h3>
                {getStatusBadge(currentSubscription.status || 'active')}
              </div>
              <p className="text-gray-600 mb-2">
                {currentSubscription.plan?.description || 'Access to premium content and features'}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Started: {formatDate(currentSubscription.startedAt || currentSubscription.startDate)}</span>
                </div>
                {currentSubscription.expiresAt && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Expires: {formatDate(currentSubscription.expiresAt)}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <Link to="/subscription" className="btn-secondary">
                Upgrade Plan
              </Link>
              {currentSubscription.status === 'active' && (
                <button onClick={handleCancelSubscription} className="btn-danger">
                  Cancel
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Features */}
      {currentSubscription?.features && currentSubscription.features.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 20 }}
          className="card p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Included Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentSubscription.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Billing History */}
      {subscriptions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 40 }}
          className="card overflow-hidden"
        >
          <h2 className="text-lg font-semibold text-gray-900 p-6 pb-0">Billing History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {subscriptions.map((sub) => (
                  <tr key={sub._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-600">{formatDate(sub.createdAt)}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 capitalize">{sub.plan}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {sub.price?.currency} {sub.price?.amount}
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(sub.status)}</td>
                    <td className="px-6 py-4">
                      {sub.paymentId && (
                        <button className="text-primary-600 hover:text-primary-700 text-sm">
                          Download
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {!currentSubscription?.plan && subscriptions.length === 0 && (
        <div className="text-center py-12">
          <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Subscription</h3>
          <p className="text-gray-500 mb-4">Choose a plan to unlock premium content and features.</p>
          <Link to="/subscription" className="btn-primary">
            View Plans
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserSubscriptionsPage;