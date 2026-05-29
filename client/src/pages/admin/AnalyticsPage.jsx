import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users, Eye, BookOpen, Download, TrendingUp, Activity,
  BarChart3, PieChart, Calendar, ArrowUp, ArrowDown
} from 'lucide-react'

const stats = [
  { label: 'Total Users', value: '45,234', change: '+12%', trend: 'up', icon: Users },
  { label: 'Page Views', value: '1.2M', change: '+23%', trend: 'up', icon: Eye },
  { label: 'Content Reads', value: '856K', change: '+18%', trend: 'up', icon: BookOpen },
  { label: 'Downloads', value: '45.2K', change: '+8%', trend: 'up', icon: Download },
]

const topContent = [
  { title: 'Hazaaron Khwahishein Aisi', type: 'Poem', views: '45K', engagement: '92%' },
  { title: 'Diwan-e-Ghalib', type: 'Ebook', views: '12K', engagement: '88%' },
  { title: 'Jashn-e-Rekhta 2024', type: 'Video', views: '125K', engagement: '95%' },
  { title: 'Bang-e-Dara', type: 'Ebook', views: '9.8K', engagement: '85%' },
  { title: 'Gulon Mein Rang Bhare', type: 'Poem', views: '32K', engagement: '90%' },
]

const userActivity = [
  { day: 'Mon', users: 4200, sessions: 3800 },
  { day: 'Tue', users: 5100, sessions: 4500 },
  { day: 'Wed', users: 4800, sessions: 4200 },
  { day: 'Thu', users: 5600, sessions: 4900 },
  { day: 'Fri', users: 6200, sessions: 5400 },
  { day: 'Sat', users: 7800, sessions: 6800 },
  { day: 'Sun', users: 7100, sessions: 6200 },
]

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('7d')

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-500">Platform performance and user insights</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="input-field w-40"
        >
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <stat.icon className="h-8 w-8 text-primary-600" />
              <span className={`inline-flex items-center space-x-1 text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                <span>{stat.change}</span>
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900">User Activity</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-end justify-around px-4 pb-4 pt-8">
            {userActivity.map((day, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 flex-1 mx-2">
                <div className="w-full flex space-x-1">
                  <div
                    className="flex-1 bg-primary-500 rounded-t"
                    style={{ height: `${(day.users / 8000) * 200}px` }}
                  />
                  <div
                    className="flex-1 bg-primary-300 rounded-t"
                    style={{ height: `${(day.sessions / 8000) * 200}px` }}
                  />
                </div>
                <span className="text-xs text-gray-500">{day.day}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary-500 rounded" />
              <span className="text-sm text-gray-600">Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary-300 rounded" />
              <span className="text-sm text-gray-600">Sessions</span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900">Content Performance</h3>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Activity className="h-12 w-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-400">Content type distribution chart</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Content */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-gray-900">Top Performing Content</h3>
          <TrendingUp className="h-5 w-5 text-gray-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topContent.map((content, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{content.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-primary-50 text-primary-700">
                      {content.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{content.views}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-500 rounded-full"
                          style={{ width: content.engagement }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{content.engagement}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center text-green-600 text-sm">
                      <ArrowUp className="h-4 w-4 mr-1" />
                      +{Math.floor(Math.random() * 20 + 5)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage