//client/src/pages/admin/AdminDashboardPage.jsx
import React from 'react'
import { motion } from 'framer-motion'
import {
  Users, BookOpen, Eye, DollarSign, TrendingUp, Activity,
  Download, Headphones, Video, Brain, Clock
} from 'lucide-react'

const stats = [
  { label: 'Total Users', value: '45,234', change: '+12%', icon: Users, color: 'blue' },
  { label: 'Active Users', value: '12,845', change: '+8%', icon: Activity, color: 'green' },
  { label: 'Revenue', value: '$28,450', change: '+23%', icon: DollarSign, color: 'emerald' },
  { label: 'Ebook Downloads', value: '15,678', change: '+15%', icon: Download, color: 'purple' },
  { label: 'Trending Content', value: '234', change: '+5%', icon: TrendingUp, color: 'orange' },
  { label: 'AI Usage', value: '89,234', change: '+45%', icon: Brain, color: 'pink' },
]

const recentActivity = [
  { action: 'New user registered', user: 'John Doe', time: '2 min ago', type: 'user' },
  { action: 'Poem published', user: 'Admin', time: '15 min ago', type: 'content' },
  { action: 'Ebook uploaded', user: 'Creator Sarah', time: '1 hour ago', type: 'content' },
  { action: 'User subscription upgraded', user: 'Mike Smith', time: '2 hours ago', type: 'subscription' },
  { action: 'Video processed', user: 'System', time: '3 hours ago', type: 'system' },
]

const topContent = [
  { title: 'Hazaaron Khwahishein Aisi', type: 'Poem', views: '45K', author: 'Mirza Ghalib' },
  { title: 'Diwan-e-Ghalib', type: 'Ebook', views: '12K', author: 'Mirza Ghalib' },
  { title: 'Jashn-e-Rekhta 2024', type: 'Video', views: '125K', author: 'Various' },
  { title: 'Bang-e-Dara', type: 'Ebook', views: '9.8K', author: 'Allama Iqbal' },
]

const AdminDashboardPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-500">Overview of platform performance and activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <span className="inline-flex items-center text-sm text-green-600 mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {stat.change}
                  </span>
                </div>
                <div className={`p-3 bg-${stat.color}-50 rounded-lg`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">User Growth</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Chart: User growth over time</p>
          </div>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Revenue Analytics</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Chart: Revenue breakdown</p>
          </div>
        </div>
      </div>

      {/* Activity & Top Content */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  activity.type === 'user' ? 'bg-blue-500' :
                  activity.type === 'content' ? 'bg-green-500' :
                  activity.type === 'subscription' ? 'bg-purple-500' : 'bg-gray-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.user} · {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Top Content</h3>
          <div className="space-y-4">
            {topContent.map((content, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-500 w-6">{index + 1}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{content.title}</p>
                    <p className="text-xs text-gray-500">{content.author} · {content.type}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-600">{content.views} views</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage