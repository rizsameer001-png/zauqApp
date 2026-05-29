//client\src\pages\creator\RevenueAnalyticsPage.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  DollarSign, TrendingUp, TrendingDown, Download, CreditCard,
  BarChart3, Calendar, ArrowUp, ArrowDown
} from 'lucide-react'

const revenueData = [
  { month: 'Jan', revenue: 120, subscriptions: 8, downloads: 45 },
  { month: 'Feb', revenue: 180, subscriptions: 12, downloads: 62 },
  { month: 'Mar', revenue: 240, subscriptions: 15, downloads: 78 },
  { month: 'Apr', revenue: 320, subscriptions: 18, downloads: 95 },
  { month: 'May', revenue: 280, subscriptions: 16, downloads: 82 },
  { month: 'Jun', revenue: 450, subscriptions: 22, downloads: 120 },
]

const RevenueAnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('6m')

  const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0)
  const totalSubscriptions = revenueData.reduce((sum, d) => sum + d.subscriptions, 0)
  const totalDownloads = revenueData.reduce((sum, d) => sum + d.downloads, 0)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Revenue Analytics</h1>
          <p className="text-gray-500">Track your earnings and content performance</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="input-field w-40"
        >
          <option value="1m">Last Month</option>
          <option value="3m">Last 3 Months</option>
          <option value="6m">Last 6 Months</option>
          <option value="1y">Last Year</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: 'Total Revenue', value: `$${totalRevenue}`, change: '+23%', icon: DollarSign, color: 'green' },
          { label: 'Subscriptions', value: totalSubscriptions, change: '+15%', icon: CreditCard, color: 'blue' },
          { label: 'Content Downloads', value: totalDownloads, change: '+32%', icon: Download, color: 'purple' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <stat.icon className={`h-8 w-8 text-${stat.color}-600`} />
              <span className="inline-flex items-center space-x-1 text-sm font-medium text-green-600">
                <ArrowUp className="h-4 w-4" />
                <span>{stat.change}</span>
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
          <BarChart3 className="h-5 w-5 text-gray-400" />
        </div>
        <div className="h-64 bg-gray-50 rounded-lg flex items-end justify-around px-4 pb-4 pt-8">
          {revenueData.map((data, index) => (
            <div key={index} className="flex flex-col items-center space-y-2 flex-1 mx-2">
              <div className="w-full flex space-x-1">
                <div
                  className="flex-1 bg-primary-500 rounded-t"
                  style={{ height: `${(data.revenue / 500) * 200}px` }}
                />
              </div>
              <span className="text-xs text-gray-500">{data.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Sources</h2>
          <div className="space-y-4">
            {[
              { source: 'Subscription Revenue', amount: '$850', percentage: 65, color: 'bg-primary-500' },
              { source: 'Content Downloads', amount: '$320', percentage: 24, color: 'bg-blue-500' },
              { source: 'Ad Revenue', amount: '$145', percentage: 11, color: 'bg-green-500' },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{item.source}</span>
                  <span className="text-sm text-gray-900">{item.amount}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Earning Content</h2>
          <div className="space-y-4">
            {[
              { title: 'Ghazal Collection Vol. 1', revenue: '$245', views: '2.5K' },
              { title: 'Literary Analysis Series', revenue: '$180', views: '1.8K' },
              { title: 'Mushaira Recordings', revenue: '$156', views: '3.2K' },
              { title: 'Rare Book Scans', revenue: '$98', views: '850' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.views} views</p>
                </div>
                <span className="text-sm font-semibold text-gray-900">{item.revenue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RevenueAnalyticsPage