// client/src/pages/admin/SubscriptionAnalyticsPage.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Users, CreditCard, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import subscriptionAPI from '../../api/subscriptionAPI';

const SubscriptionAnalyticsPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await subscriptionAPI.getSubscriptionStatsCMS();
      setStats(response.data || response);
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Subscription Analytics</h1>
        <p className="text-gray-500">Track subscription performance and revenue metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {formatCurrency(stats?.revenue?.totalMonthlyRevenue || 0)}
            </span>
          </div>
          <p className="text-sm text-gray-600">Monthly Recurring Revenue</p>
          <p className="text-xs text-gray-400 mt-1">+12% from last month</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats?.activeSubscriptions || 0}</span>
          </div>
          <p className="text-sm text-gray-600">Active Subscribers</p>
          <p className="text-xs text-gray-400 mt-1">Total Users: {stats?.totalUsers || 0}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CreditCard className="h-5 w-5 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats?.totalPlans || 0}</span>
          </div>
          <p className="text-sm text-gray-600">Total Plans</p>
          <p className="text-xs text-gray-400 mt-1">{stats?.activePlans || 0} Active Plans</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {formatCurrency(stats?.revenue?.averageSubscriptionValue || 0)}
            </span>
          </div>
          <p className="text-sm text-gray-600">Average Transaction Value</p>
        </motion.div>
      </div>

      {/* Plan Distribution */}
      {stats?.planDistribution && stats.planDistribution.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Plan Distribution</h2>
          <div className="space-y-4">
            {stats.planDistribution.map((plan) => (
              <div key={plan._id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700 capitalize">{plan._id}</span>
                  <span className="text-gray-600">{plan.count} subscribers</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 rounded-full h-2 transition-all duration-500"
                    style={{
                      width: `${(plan.count / stats.activeSubscriptions) * 100}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SubscriptionAnalyticsPage;