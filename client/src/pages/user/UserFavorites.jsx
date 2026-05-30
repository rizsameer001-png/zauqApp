// client/src/pages/user/UserFavorites.jsx
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Heart, BookOpen, Headphones, Video, PenTool } from 'lucide-react'

import LoadingSpinner from '../../components/common/LoadingSpinner'
import EmptyState from '../../components/common/EmptyState'
import ContentCard from '../../components/common/ContentCard'
import userAPI from '../../api/userAPI'

const tabs = [
  { id: 'poems', label: 'Poems', icon: PenTool },
  { id: 'books', label: 'Books', icon: BookOpen },
  { id: 'audio', label: 'Audio', icon: Headphones },
  { id: 'videos', label: 'Videos', icon: Video },
]

const UserFavorites = () => {
  const [activeTab, setActiveTab] = useState('poems')

  const { data, isLoading } = useQuery({
    queryKey: ['user-favorites', activeTab],
    queryFn: () => userAPI.getFavorites(activeTab)
  })

  const favorites = data?.data || []

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2 flex items-center gap-3">
            <Heart className="w-8 h-8 text-red-500" /> Your Favorites
          </h1>
          <p className="text-secondary-500 dark:text-secondary-400">
            All your saved content in one place.
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
        ) : favorites.length === 0 ? (
          <EmptyState
            icon="content"
            title={`No ${activeTab} in favorites`}
            description={`Start exploring and save your favorite ${activeTab}!`}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ContentCard item={item} type={activeTab.slice(0, -1)} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserFavorites
