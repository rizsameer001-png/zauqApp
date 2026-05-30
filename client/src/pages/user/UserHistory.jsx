//// client/src/pages/user/UserHistory.jsx
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Clock, BookOpen, Headphones, Video, Trash2 } from 'lucide-react'

import LoadingSpinner from '../../components/common/LoadingSpinner'
import EmptyState from '../../components/common/EmptyState'
import userAPI from '../../api/userAPI'

const tabs = [
  { id: 'all', label: 'All', icon: Clock },
  { id: 'poem', label: 'Poems', icon: BookOpen },
  { id: 'audio', label: 'Audio', icon: Headphones },
  { id: 'video', label: 'Videos', icon: Video },
]

const UserHistory = () => {
  const [activeTab, setActiveTab] = useState('all')

  const { data, isLoading } = useQuery({
    queryKey: ['user-history', activeTab],
    queryFn: () => userAPI.getHistory(activeTab !== 'all' ? activeTab : undefined)
  })

  const history = data?.data || []

  const getIcon = (type) => {
    switch (type) {
      case 'poem': return BookOpen
      case 'book': return BookOpen
      case 'audio': return Headphones
      case 'video': return Video
      default: return Clock
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2 flex items-center gap-3">
            <Clock className="w-8 h-8 text-primary-600" /> Reading History
          </h1>
          <p className="text-secondary-500 dark:text-secondary-400">
            Track your literary journey.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-dark-900 text-secondary-600 dark:text-secondary-400 border border-gray-200 dark:border-dark-800'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : history.length === 0 ? (
          <EmptyState
            icon="content"
            title="No history yet"
            description="Start reading, listening, or watching to build your history."
          />
        ) : (
          <div className="space-y-4">
            {history.map((item, index) => {
              const Icon = getIcon(item.contentType)
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-dark-900 rounded-xl border border-gray-100 dark:border-dark-800"
                >
                  <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-dark-900 dark:text-white capitalize">{item.contentType}</p>
                    <p className="text-sm text-secondary-500">Progress: {item.progress}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-secondary-500">
                      {new Date(item.lastRead).toLocaleDateString()}
                    </p>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-secondary-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserHistory
