// client/src/pages/creator/CreatorEarningsPage.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Download,
  Eye,
  Music,
  Book,
  Video,
  FileText,
  Calendar,
  Loader2,
  CreditCard,
  Wallet,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import earningAPI from '../api/earningAPI';

const CreatorEarningsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [earnings, setEarnings] = useState(null);
  const [period, setPeriod] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  const COLORS = ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899'];

  useEffect(() => {
    fetchEarnings();
  }, [period, selectedMonth]);

  const fetchEarnings = async () => {
    try {
      setLoading(true);
      const response = await earningAPI.getEarnings({ period, month: selectedMonth });
      setEarnings(response.data);
    } catch (error) {
      toast.error('Failed to load earnings data');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!earnings) {
    return (
      <div className="text-center py-12">
        <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No earnings data</h3>
        <p className="text-gray-500 mt-1">Start creating content to earn revenue</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Earnings & Revenue</h1>
          <p className="text-gray-500 mt-1">Track your content earnings and revenue streams</p>
        </div>
        <div className="flex gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          {period === 'monthly' && (
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Earnings</p>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(earnings.summary?.totalEarnings || 0)}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-primary" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">+12.5%</span>
            <span className="text-gray-400 ml-1">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Ad Revenue</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(earnings.summary?.adRevenue || 0)}
              </p>
            </div>
            <Eye className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Download Revenue</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(earnings.summary?.downloadRevenue || 0)}
              </p>
            </div>
            <Download className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Subscription Revenue</p>
              <p className="text-2xl font-bold text-purple-600">
                {formatCurrency(earnings.summary?.subscriptionRevenue || 0)}
              </p>
            </div>
            <CreditCard className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Revenue Breakdown by Content Type */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue by Content Type</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={earnings.breakdownByType ? Object.entries(earnings.breakdownByType).map(([key, value]) => ({
                    name: key.charAt(0).toUpperCase() + key.slice(1),
                    value: value.earnings || 0
                  })) : []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {Object.entries(earnings.breakdownByType || {}).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Monthly Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={earnings.monthlyBreakdown || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line type="monotone" dataKey="earnings" stroke="#6366f1" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Earning Content */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Top Earning Content</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">#</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Title</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Type</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Views</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Downloads</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Premium</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Earnings</th>
              </tr>
            </thead>
            <tbody>
              {earnings.topEarningContent?.map((item, index) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-sm font-medium text-gray-400">#{index + 1}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{item.title}</td>
                  <td className="py-3 px-4 text-sm text-gray-500 capitalize">{item.type}</td>
                  <td className="py-3 px-4 text-sm text-gray-500 text-right">{item.views}</td>
                  <td className="py-3 px-4 text-sm text-gray-500 text-right">{item.downloads}</td>
                  <td className="py-3 px-4 text-sm text-center">
                    {item.isPremium ? (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                        Premium
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-medium">
                        Free
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm font-semibold text-primary text-right">
                    {formatCurrency(item.earnings)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payout Info */}
      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h4 className="font-semibold text-gray-900">Payout Information</h4>
            <p className="text-sm text-gray-500 mt-1">
              Payouts are processed on the 15th of each month
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div>
              <p className="text-sm text-gray-500">Pending Payout</p>
              <p className="text-lg font-bold text-primary">
                {formatCurrency(earnings.summary?.pendingPayout || 0)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Payout</p>
              <p className="text-lg font-bold text-gray-900">
                {earnings.lastPayout ? new Date(earnings.lastPayout).toLocaleDateString() : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Next Payout</p>
              <p className="text-lg font-bold text-gray-900">
                {earnings.nextPayout ? new Date(earnings.nextPayout).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorEarningsPage;