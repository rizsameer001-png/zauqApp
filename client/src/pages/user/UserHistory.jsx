// //// client/src/pages/user/UserHistory.jsx
// import { useState } from 'react'
// import { useQuery } from '@tanstack/react-query'
// import { motion } from 'framer-motion'
// import { Clock, BookOpen, Headphones, Video, Trash2 } from 'lucide-react'

// import LoadingSpinner from '../../components/common/LoadingSpinner'
// import EmptyState from '../../components/common/EmptyState'
// import userAPI from '../../api/userAPI'

// const tabs = [
//   { id: 'all', label: 'All', icon: Clock },
//   { id: 'poem', label: 'Poems', icon: BookOpen },
//   { id: 'audio', label: 'Audio', icon: Headphones },
//   { id: 'video', label: 'Videos', icon: Video },
// ]

// const UserHistory = () => {
//   const [activeTab, setActiveTab] = useState('all')

//   const { data, isLoading } = useQuery({
//     queryKey: ['user-history', activeTab],
//     queryFn: () => userAPI.getHistory(activeTab !== 'all' ? activeTab : undefined)
//   })

//   const history = data?.data || []

//   const getIcon = (type) => {
//     switch (type) {
//       case 'poem': return BookOpen
//       case 'book': return BookOpen
//       case 'audio': return Headphones
//       case 'video': return Video
//       default: return Clock
//     }
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8"
//         >
//           <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2 flex items-center gap-3">
//             <Clock className="w-8 h-8 text-primary-600" /> Reading History
//           </h1>
//           <p className="text-secondary-500 dark:text-secondary-400">
//             Track your literary journey.
//           </p>
//         </motion.div>

//         {/* Tabs */}
//         <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
//           {tabs.map(tab => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
//                 activeTab === tab.id
//                   ? 'bg-primary-600 text-white'
//                   : 'bg-white dark:bg-dark-900 text-secondary-600 dark:text-secondary-400 border border-gray-200 dark:border-dark-800'
//               }`}
//             >
//               <tab.icon className="w-4 h-4" />
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {/* Content */}
//         {isLoading ? (
//           <div className="flex items-center justify-center py-20">
//             <LoadingSpinner size="lg" />
//           </div>
//         ) : history.length === 0 ? (
//           <EmptyState
//             icon="content"
//             title="No history yet"
//             description="Start reading, listening, or watching to build your history."
//           />
//         ) : (
//           <div className="space-y-4">
//             {history.map((item, index) => {
//               const Icon = getIcon(item.contentType)
//               return (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                   className="flex items-center gap-4 p-4 bg-white dark:bg-dark-900 rounded-xl border border-gray-100 dark:border-dark-800"
//                 >
//                   <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
//                     <Icon className="w-6 h-6 text-primary-600" />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="font-medium text-dark-900 dark:text-white capitalize">{item.contentType}</p>
//                     <p className="text-sm text-secondary-500">Progress: {item.progress}%</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm text-secondary-500">
//                       {new Date(item.lastRead).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <button className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-secondary-400 hover:text-red-500 transition-colors">
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </motion.div>
//               )
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default UserHistory











// client/src/pages/user/UserHistory.jsx
import React, { useState, useCallback, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, BookOpen, Headphones, Video, Trash2, Eye, Loader2, AlertCircle, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

import LoadingSpinner from '../../components/common/LoadingSpinner'
import EmptyState from '../../components/common/EmptyState'
import userAPI from '../../api/userAPI'
import bookAPI from '../../api/bookAPI'

const tabs = [
  { id: 'all', label: 'All', icon: Clock, apiType: undefined },
  { id: 'poem', label: 'Poems', icon: BookOpen, apiType: 'poem' },
  { id: 'book', label: 'Books', icon: BookOpen, apiType: 'book' },
  { id: 'audio', label: 'Audio', icon: Headphones, apiType: 'audio' },
  { id: 'video', label: 'Videos', icon: Video, apiType: 'video' },
]

const UserHistory = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [enrichedHistory, setEnrichedHistory] = useState([])
  const [isEnriching, setIsEnriching] = useState(false)
  const queryClient = useQueryClient()

  // Fetch history
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['user-history', activeTab],
    queryFn: () => {
      const currentTab = tabs.find(tab => tab.id === activeTab)
      const typeParam = currentTab?.apiType
      return userAPI.getHistory(typeParam)
    },
    retry: 1
  })

  // Enrich history with content details (especially for books to get slugs)
  const enrichHistory = useCallback(async () => {
    const historyData = data?.data || []
    if (historyData.length === 0) {
      setEnrichedHistory([])
      return
    }

    setIsEnriching(true)
    try {
      const enriched = await Promise.all(
        historyData.map(async (item) => {
          // For books, try to fetch slug if not available
          if (item.contentType === 'book') {
            try {
              // Check if contentId is a MongoDB ObjectId (24 hex chars)
              const isObjectId = /^[0-9a-fA-F]{24}$/.test(item.contentId)
              
              if (!isObjectId && typeof item.contentId === 'string' && item.contentId.includes('-')) {
                // It's likely a slug already
                return {
                  ...item,
                  slug: item.contentId,
                  title: item.title || 'Book',
                }
              } else {
                // Try to fetch book by ID or slug
                const bookData = await bookAPI.getBook(item.contentId)
                const book = bookData?.data || bookData
                return {
                  ...item,
                  slug: book?.slug || item.contentId,
                  title: book?.title || item.title || 'Book',
                  coverImage: book?.coverImage,
                  isFree: book?.isFree,
                  isPremium: book?.isPremium
                }
              }
            } catch (error) {
              console.error(`Failed to fetch book ${item.contentId}:`, error)
              return { ...item, slug: item.contentId, title: item.title || 'Book' }
            }
          }
          return item
        })
      )
      setEnrichedHistory(enriched)
    } catch (error) {
      console.error('Error enriching history:', error)
    } finally {
      setIsEnriching(false)
    }
  }, [data])

  useEffect(() => {
    enrichHistory()
  }, [enrichHistory])

  // Delete history item mutation
  const deleteHistoryMutation = useMutation({
    mutationFn: (historyId) => userAPI.removeHistoryItem(historyId),
    onSuccess: () => {
      queryClient.invalidateQueries(['user-history'])
      toast.success('Removed from history')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to remove from history')
    }
  })

  // Clear all history mutation
  const clearAllMutation = useMutation({
    mutationFn: () => userAPI.clearHistory(),
    onSuccess: () => {
      queryClient.invalidateQueries(['user-history'])
      toast.success('History cleared successfully')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to clear history')
    }
  })

  // Handle delete single item
  const handleDelete = (historyId, contentType) => {
    if (window.confirm(`Remove this ${contentType} from your history?`)) {
      deleteHistoryMutation.mutate(historyId)
    }
  }

  // Handle clear all history
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all reading history? This action cannot be undone.')) {
      clearAllMutation.mutate()
    }
  }

  const history = enrichedHistory.length > 0 ? enrichedHistory : (data?.data || [])
  
  // Filter by content type (additional filter since API might return all)
  const filteredHistory = activeTab === 'all' 
    ? history 
    : history.filter(item => item.contentType === activeTab)

  // Get icon for content type
  const getIcon = (type) => {
    switch (type) {
      case 'poem': return BookOpen
      case 'book': return BookOpen
      case 'audio': return Headphones
      case 'video': return Video
      default: return Clock
    }
  }

  // Get view URL for content
  const getViewUrl = (item) => {
    switch (item.contentType) {
      case 'book':
        return `/book/${item.slug || item.contentId}`
      case 'poem':
        return `/poem/${item.slug || item.contentId}`
      case 'audio':
        return `/audio/${item.contentId}`
      case 'video':
        return `/video/${item.contentId}`
      default:
        return '#'
    }
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown'
    const date = new Date(dateString)
    const now = new Date()
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  // Format time
  const formatTime = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  // Calculate stats
  const totalItems = filteredHistory.length
  const uniqueItems = new Set(filteredHistory.map(item => item.contentId)).size
  const mostReadType = filteredHistory.reduce((acc, item) => {
    acc[item.contentType] = (acc[item.contentType] || 0) + 1
    return acc
  }, {})
  const topType = Object.entries(mostReadType).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None'

  if (isLoading || isEnriching) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
              Failed to load history
            </h3>
            <p className="text-red-600 dark:text-red-300">
              {error.response?.data?.message || 'Please try again later'}
            </p>
            <button 
              onClick={() => refetch()}
              className="mt-4 btn-primary"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2 flex items-center gap-3">
                <Clock className="w-8 h-8 text-primary-600" /> Reading History
              </h1>
              <p className="text-secondary-500 dark:text-secondary-400">
                Track your literary journey.
              </p>
            </div>
            
            {/* Stats Card */}
            {totalItems > 0 && (
              <div className="bg-white dark:bg-dark-900 rounded-xl px-4 py-2 border border-gray-200 dark:border-dark-800">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-600">{totalItems}</p>
                    <p className="text-xs text-secondary-500">Total Views</p>
                  </div>
                  <div className="w-px h-8 bg-gray-200 dark:bg-dark-700" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-600">{uniqueItems}</p>
                    <p className="text-xs text-secondary-500">Unique Items</p>
                  </div>
                  <div className="w-px h-8 bg-gray-200 dark:bg-dark-700" />
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary-600 capitalize">{topType}</p>
                    <p className="text-xs text-secondary-500">Most Read</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {tabs.map(tab => {
              const Icon = tab.icon
              const count = tab.id === 'all' 
                ? history.length 
                : history.filter(item => item.contentType === tab.id).length
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-dark-900 text-secondary-600 dark:text-secondary-400 border border-gray-200 dark:border-dark-800 hover:border-primary-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {count > 0 && (
                    <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${
                      activeTab === tab.id
                        ? 'bg-white/20'
                        : 'bg-gray-100 dark:bg-dark-800'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
          
          {/* Clear All Button */}
          {filteredHistory.length > 0 && (
            <button
              onClick={handleClearAll}
              disabled={clearAllMutation.isPending}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
            >
              {clearAllMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              Clear All
            </button>
          )}
        </div>

        {/* Content */}
        {filteredHistory.length === 0 ? (
          <EmptyState
            icon="content"
            title="No history yet"
            description="Start reading, listening, or watching to build your history."
            action={
              <Link to="/explore" className="btn-primary">
                Explore Content
              </Link>
            }
          />
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filteredHistory.map((item, index) => {
                const Icon = getIcon(item.contentType)
                const viewUrl = getViewUrl(item)
                const date = formatDate(item.lastRead)
                const time = formatTime(item.lastRead)
                
                return (
                  <motion.div
                    key={item._id || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="group flex items-center gap-4 p-4 bg-white dark:bg-dark-900 rounded-xl border border-gray-100 dark:border-dark-800 hover:shadow-md transition-all"
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    
                    {/* Content Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-medium text-dark-900 dark:text-white truncate">
                          {item.title || `${item.contentType} Content`}
                        </h3>
                        <span className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-dark-800 text-secondary-600 rounded-full capitalize">
                          {item.contentType}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-secondary-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {date} at {time}
                        </span>
                        {item.progress > 0 && (
                          <span>
                            Progress: {Math.round(item.progress)}%
                          </span>
                        )}
                      </div>
                      {/* Progress Bar */}
                      {item.progress > 0 && item.progress < 100 && (
                        <div className="mt-2 w-full bg-gray-200 dark:bg-dark-800 rounded-full h-1">
                          <div 
                            className="bg-primary-600 h-1 rounded-full transition-all"
                            style={{ width: `${Math.min(item.progress, 100)}%` }}
                          />
                        </div>
                      )}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Link
                        to={viewUrl}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 text-secondary-500 hover:text-primary-600 transition-colors"
                        title="Continue Reading"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(item._id, item.contentType)}
                        disabled={deleteHistoryMutation.isPending}
                        className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-secondary-400 hover:text-red-500 transition-colors disabled:opacity-50"
                        title="Remove from History"
                      >
                        {deleteHistoryMutation.isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                      <ChevronRight className="w-4 h-4 text-secondary-400 group-hover:text-primary-500 transition-colors" />
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserHistory