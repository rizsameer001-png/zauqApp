// // client/src/pages/user/UserFavorites.jsx
// import { useState } from 'react'
// import { useQuery } from '@tanstack/react-query'
// import { motion } from 'framer-motion'
// import { Heart, BookOpen, Headphones, Video, PenTool } from 'lucide-react'

// import LoadingSpinner from '../../components/common/LoadingSpinner'
// import EmptyState from '../../components/common/EmptyState'
// import ContentCard from '../../components/common/ContentCard'
// import userAPI from '../../api/userAPI'

// const tabs = [
//   { id: 'poems', label: 'Poems', icon: PenTool },
//   { id: 'books', label: 'Books', icon: BookOpen },
//   { id: 'audio', label: 'Audio', icon: Headphones },
//   { id: 'videos', label: 'Videos', icon: Video },
// ]

// const UserFavorites = () => {
//   const [activeTab, setActiveTab] = useState('poems')

//   const { data, isLoading } = useQuery({
//     queryKey: ['user-favorites', activeTab],
//     queryFn: () => userAPI.getFavorites(activeTab)
//   })

//   const favorites = data?.data || []

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8"
//         >
//           <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2 flex items-center gap-3">
//             <Heart className="w-8 h-8 text-red-500" /> Your Favorites
//           </h1>
//           <p className="text-secondary-500 dark:text-secondary-400">
//             All your saved content in one place.
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
//         ) : favorites.length === 0 ? (
//           <EmptyState
//             icon="content"
//             title={`No ${activeTab} in favorites`}
//             description={`Start exploring and save your favorite ${activeTab}!`}
//           />
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {favorites.map((item, index) => (
//               <motion.div
//                 key={item._id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.05 }}
//               >
//                 <ContentCard item={item} type={activeTab.slice(0, -1)} />
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default UserFavorites








// // client/src/pages/user/UserFavorites.jsx
// import { useState } from 'react'
// import { useQuery } from '@tanstack/react-query'
// import { motion } from 'framer-motion'
// import { Heart, BookOpen, Headphones, Video, PenTool, AlertCircle } from 'lucide-react'

// import LoadingSpinner from '../../components/common/LoadingSpinner'
// import EmptyState from '../../components/common/EmptyState'
// import ContentCard from '../../components/common/ContentCard'
// import userAPI from '../../api/userAPI'

// const tabs = [
//   { id: 'poems', label: 'Poems', icon: PenTool, type: 'poem', apiType: 'poems' },
//   { id: 'books', label: 'Books', icon: BookOpen, type: 'book', apiType: 'books' },
//   { id: 'audio', label: 'Audio', icon: Headphones, type: 'audio', apiType: 'audio' },
//   { id: 'videos', label: 'Videos', icon: Video, type: 'video', apiType: 'videos' },
// ]

// const UserFavorites = () => {
//   const [activeTab, setActiveTab] = useState('books')

//   const { data, isLoading, error, refetch } = useQuery({
//     queryKey: ['user-favorites', activeTab],
//     queryFn: () => {
//       const currentTab = tabs.find(tab => tab.id === activeTab)
//       // Use apiType for the API call (plural form)
//       const typeParam = currentTab?.apiType || activeTab
//       return userAPI.getFavorites(typeParam)
//     },
//     retry: 1
//   })

//   // Debug log to see what data is coming back
//   console.log('Favorites API Response:', data)
//   console.log('Active Tab:', activeTab)

//   // Extract favorites based on response structure
//   let favorites = []
//   let counts = { poems: 0, books: 0, audio: 0, videos: 0, total: 0 }
  
//   if (data?.success && data.data) {
//     // When type is specified, data.data should be an array of items
//     if (Array.isArray(data.data)) {
//       favorites = data.data
//     } 
//     // When no type specified (all favorites), data.data is an object with all types
//     else if (typeof data.data === 'object' && !Array.isArray(data.data)) {
//       // For specific tab, get the array from the object
//       const currentTab = tabs.find(tab => tab.id === activeTab)
//       if (currentTab && data.data[currentTab.apiType]) {
//         favorites = data.data[currentTab.apiType]
//       }
//       // Get counts if available
//       if (data.data.counts) {
//         counts = data.data.counts
//       }
//     }
//   }

//   // Get the current tab configuration
//   const currentTab = tabs.find(tab => tab.id === activeTab)
//   const contentType = currentTab?.type || activeTab.slice(0, -1)

//   // Handle retry
//   const handleRetry = () => {
//     refetch()
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-center py-20">
//             <LoadingSpinner size="lg" />
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-8 text-center">
//             <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
//             <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
//               Failed to load favorites
//             </h3>
//             <p className="text-red-600 dark:text-red-300 mb-4">
//               {error.response?.data?.message || error.message || 'Please try again later'}
//             </p>
//             <button
//               onClick={handleRetry}
//               className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//             >
//               Retry
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8"
//         >
//           <div className="flex items-center justify-between flex-wrap gap-4">
//             <div>
//               <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2 flex items-center gap-3">
//                 <Heart className="w-8 h-8 text-red-500" /> Your Favorites
//               </h1>
//               <p className="text-secondary-500 dark:text-secondary-400">
//                 All your saved content in one place.
//               </p>
//             </div>
            
//             {/* Stats Summary */}
//             {counts.total > 0 && (
//               <div className="bg-white dark:bg-dark-900 rounded-xl px-4 py-2 border border-gray-200 dark:border-dark-800">
//                 <div className="flex items-center gap-4">
//                   <div className="text-center">
//                     <p className="text-2xl font-bold text-primary-600">{counts.total}</p>
//                     <p className="text-xs text-secondary-500">Total</p>
//                   </div>
//                   <div className="w-px h-8 bg-gray-200 dark:bg-dark-700" />
//                   <div className="flex gap-3">
//                     {counts.poems > 0 && (
//                       <div className="text-center">
//                         <p className="text-sm font-semibold text-dark-900 dark:text-white">{counts.poems}</p>
//                         <p className="text-xs text-secondary-500">Poems</p>
//                       </div>
//                     )}
//                     {counts.books > 0 && (
//                       <div className="text-center">
//                         <p className="text-sm font-semibold text-dark-900 dark:text-white">{counts.books}</p>
//                         <p className="text-xs text-secondary-500">Books</p>
//                       </div>
//                     )}
//                     {counts.audio > 0 && (
//                       <div className="text-center">
//                         <p className="text-sm font-semibold text-dark-900 dark:text-white">{counts.audio}</p>
//                         <p className="text-xs text-secondary-500">Audio</p>
//                       </div>
//                     )}
//                     {counts.videos > 0 && (
//                       <div className="text-center">
//                         <p className="text-sm font-semibold text-dark-900 dark:text-white">{counts.videos}</p>
//                         <p className="text-xs text-secondary-500">Videos</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </motion.div>

//         {/* Tabs with counts */}
//         <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
//           {tabs.map(tab => {
//             const Icon = tab.icon
//             const count = counts[tab.id] || 0
            
//             return (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
//                   activeTab === tab.id
//                     ? 'bg-primary-600 text-white'
//                     : 'bg-white dark:bg-dark-900 text-secondary-600 dark:text-secondary-400 border border-gray-200 dark:border-dark-800 hover:border-primary-300'
//                 }`}
//               >
//                 <Icon className="w-4 h-4" />
//                 {tab.label}
//                 {count > 0 && (
//                   <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${
//                     activeTab === tab.id
//                       ? 'bg-white/20'
//                       : 'bg-gray-100 dark:bg-dark-800'
//                   }`}>
//                     {count}
//                   </span>
//                 )}
//               </button>
//             )
//           })}
//         </div>

//         {/* Content */}
//         {favorites.length === 0 ? (
//           <EmptyState
//             icon="heart"
//             title={`No ${currentTab?.label?.toLowerCase() || activeTab} in favorites`}
//             description={`Start exploring and save your favorite ${contentType}s!`}
//             action={
//               <button
//                 onClick={() => window.location.href = '/explore'}
//                 className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
//               >
//                 Explore Content
//               </button>
//             }
//           />
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {favorites.map((item, index) => (
//               <motion.div
//                 key={item._id || item.id || index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.05 }}
//               >
//                 <ContentCard 
//                   item={item} 
//                   type={contentType}
//                   onFavoriteToggle={() => {
//                     // Refetch after unfavorite to update the list
//                     refetch()
//                   }}
//                 />
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {/* Debug info - remove in production */}
//         {process.env.NODE_ENV === 'development' && favorites.length === 0 && !isLoading && data && (
//           <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
//             <p className="text-sm text-yellow-700 dark:text-yellow-400 font-semibold mb-2">
//               Debug: No favorites found for tab: {activeTab}
//             </p>
//             <p className="text-xs text-yellow-600 dark:text-yellow-500 mb-1">
//               Response structure: 
//             </p>
//             <pre className="text-xs bg-yellow-100 dark:bg-yellow-900/40 p-2 rounded overflow-x-auto">
//               {JSON.stringify(data, null, 2)}
//             </pre>
//             <p className="text-xs text-yellow-600 dark:text-yellow-500 mt-2">
//               Tip: Make sure you have added some {activeTab} to favorites first!
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default UserFavorites








// client/src/pages/user/UserFavorites.jsx
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Heart, BookOpen, Headphones, Video, PenTool, AlertCircle } from 'lucide-react'

import LoadingSpinner from '../../components/common/LoadingSpinner'
import EmptyState from '../../components/common/EmptyState'
import ContentCard from '../../components/common/ContentCard'
import userAPI from '../../api/userAPI'

const tabs = [
  { id: 'poems', label: 'Poems', icon: PenTool, type: 'poem', apiType: 'poems' },
  { id: 'books', label: 'Books', icon: BookOpen, type: 'book', apiType: 'books' },
  { id: 'audio', label: 'Audio', icon: Headphones, type: 'audio', apiType: 'audio' },
  { id: 'videos', label: 'Videos', icon: Video, type: 'video', apiType: 'videos' },
]

const UserFavorites = () => {
  const [activeTab, setActiveTab] = useState('books')

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['user-favorites', activeTab],
    queryFn: async () => {
      const currentTab = tabs.find(tab => tab.id === activeTab)
      const typeParam = currentTab?.apiType || activeTab
      console.log('Fetching favorites for type:', typeParam)
      const result = await userAPI.getFavorites(typeParam)
      console.log('Query result:', result)
      return result
    },
    retry: 1
  })

  // Debug log to see what data is coming back
  console.log('Favorites API Response (full):', data)
  console.log('Active Tab:', activeTab)
  console.log('Data structure:', data ? Object.keys(data) : 'null')
  console.log('Data.data:', data?.data)

  // Extract favorites based on response structure
  let favorites = []
  let counts = { poems: 0, books: 0, audio: 0, videos: 0, total: 0 }
  
  if (data) {
    // Handle different response structures
    if (data.success && data.data) {
      // Structure: { success: true, data: [...] }
      const responseData = data.data
      
      if (Array.isArray(responseData)) {
        // Direct array response
        favorites = responseData
      } else if (typeof responseData === 'object') {
        // Object response with type keys
        const currentTab = tabs.find(tab => tab.id === activeTab)
        if (currentTab && responseData[currentTab.apiType]) {
          favorites = responseData[currentTab.apiType]
        } else if (responseData[activeTab]) {
          favorites = responseData[activeTab]
        } else if (responseData.data && Array.isArray(responseData.data)) {
          favorites = responseData.data
        }
        
        // Get counts if available
        if (responseData.counts) {
          counts = responseData.counts
        }
      }
    } else if (Array.isArray(data)) {
      // Direct array response without wrapper
      favorites = data
    } else if (data.data && Array.isArray(data.data)) {
      // Response with data property but no success flag
      favorites = data.data
    } else if (data.data && data.data.data && Array.isArray(data.data.data)) {
      // Nested response
      favorites = data.data.data
    }
  }

  // Get the current tab configuration
  const currentTab = tabs.find(tab => tab.id === activeTab)
  const contentType = currentTab?.type || activeTab.slice(0, -1)

  // Handle retry
  const handleRetry = () => {
    refetch()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
              Failed to load favorites
            </h3>
            <p className="text-red-600 dark:text-red-300 mb-4">
              {error.response?.data?.message || error.message || 'Please try again later'}
            </p>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2 flex items-center gap-3">
                <Heart className="w-8 h-8 text-red-500" /> Your Favorites
              </h1>
              <p className="text-secondary-500 dark:text-secondary-400">
                All your saved content in one place.
              </p>
            </div>
            
            {/* Stats Summary */}
            {counts.total > 0 && (
              <div className="bg-white dark:bg-dark-900 rounded-xl px-4 py-2 border border-gray-200 dark:border-dark-800">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-600">{counts.total}</p>
                    <p className="text-xs text-secondary-500">Total</p>
                  </div>
                  <div className="w-px h-8 bg-gray-200 dark:bg-dark-700" />
                  <div className="flex gap-3">
                    {counts.poems > 0 && (
                      <div className="text-center">
                        <p className="text-sm font-semibold text-dark-900 dark:text-white">{counts.poems}</p>
                        <p className="text-xs text-secondary-500">Poems</p>
                      </div>
                    )}
                    {counts.books > 0 && (
                      <div className="text-center">
                        <p className="text-sm font-semibold text-dark-900 dark:text-white">{counts.books}</p>
                        <p className="text-xs text-secondary-500">Books</p>
                      </div>
                    )}
                    {counts.audio > 0 && (
                      <div className="text-center">
                        <p className="text-sm font-semibold text-dark-900 dark:text-white">{counts.audio}</p>
                        <p className="text-xs text-secondary-500">Audio</p>
                      </div>
                    )}
                    {counts.videos > 0 && (
                      <div className="text-center">
                        <p className="text-sm font-semibold text-dark-900 dark:text-white">{counts.videos}</p>
                        <p className="text-xs text-secondary-500">Videos</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Tabs with counts */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map(tab => {
            const Icon = tab.icon
            const count = counts[tab.id] || 0
            
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

        {/* Content */}
        {favorites.length === 0 ? (
          <EmptyState
            icon="heart"
            title={`No ${currentTab?.label?.toLowerCase() || activeTab} in favorites`}
            description={`Start exploring and save your favorite ${contentType}s!`}
            action={
              <button
                onClick={() => window.location.href = '/explore'}
                className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Explore Content
              </button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((item, index) => (
              <motion.div
                key={item._id || item.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ContentCard 
                  item={item} 
                  type={contentType}
                  onFavoriteToggle={() => {
                    // Refetch after unfavorite to update the list
                    refetch()
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Debug info - shows when no favorites are found */}
        {favorites.length === 0 && !isLoading && data && (
          <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
            <p className="text-sm text-yellow-700 dark:text-yellow-400 font-semibold mb-2">
              Debug: No favorites found for tab: {activeTab}
            </p>
            <p className="text-xs text-yellow-600 dark:text-yellow-500 mb-1">
              Response structure: 
            </p>
            <pre className="text-xs bg-yellow-100 dark:bg-yellow-900/40 p-2 rounded overflow-x-auto max-h-40">
              {JSON.stringify(data, null, 2)}
            </pre>
            <p className="text-xs text-yellow-600 dark:text-yellow-500 mt-2">
              Tip: Make sure you have added some {activeTab} to favorites first!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserFavorites