// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { useQuery } from '@tanstack/react-query'
// import { motion } from 'framer-motion'
// import { useSelector } from 'react-redux'
// import {
//   BookOpen, Heart, Clock, Download, Bell, Settings,
//   ChevronRight, TrendingUp, Sparkles
// } from 'lucide-react'

// import LoadingSpinner from '../../components/common/LoadingSpinner'
// import ContentCard from '../../components/common/ContentCard'
// import userAPI from '../../api/userAPI'
// import poemAPI from '../../api/poemAPI'

// const quickLinks = [
//   { to: '/dashboard/favorites', icon: Heart, label: 'Favorites', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
//   { to: '/dashboard/history', icon: Clock, label: 'History', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
//   { to: '/dashboard/downloads', icon: Download, label: 'Downloads', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
//   { to: '/dashboard/notifications', icon: Bell, label: 'Notifications', color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
//   { to: '/dashboard/profile', icon: Settings, label: 'Settings', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
// ]

// const UserDashboard = () => {
//   const { user } = useSelector(state => state.auth)

//   const { data: favoritesData, isLoading: favoritesLoading } = useQuery({
//     queryKey: ['user-favorites'],
//     queryFn: () => userAPI.getFavorites('poems')
//   })

//   const { data: historyData } = useQuery({
//     queryKey: ['user-history'],
//     queryFn: () => userAPI.getHistory()
//   })

//   // const { data: trendingData } = useQuery({
//   //   queryKey: ['trending-poems'],
//   //   queryFn: () => poemAPI.getTrendingPoems()
//   // })

//   const { data: trendingData, isLoading: trendingLoading } = useQuery({
//   queryKey: ['trending-poems'],
//   queryFn: () => poemAPI.getTrendingPoems()
//   })

//   const favorites = favoritesData?.data || []
//   const history = historyData?.data || []
//   const trending = trendingData?.data || []

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Welcome Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8"
//         >
//           <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2">
//             Welcome back, {user?.name?.split(' ')[0] || 'Reader'}!
//           </h1>
//           <p className="text-secondary-500 dark:text-secondary-400">
//             Here's what's happening in your literary world.
//           </p>
//         </motion.div>

//         {/* Quick Links */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
//           {quickLinks.map((link, index) => (
//             <motion.div
//               key={link.to}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.05 }}
//             >
//               <Link
//                 to={link.to}
//                 className="flex items-center gap-3 p-4 bg-white dark:bg-dark-900 rounded-xl border border-gray-100 dark:border-dark-800 hover:shadow-md transition-shadow"
//               >
//                 <div className={`w-10 h-10 rounded-lg ${link.bg} flex items-center justify-center`}>
//                   <link.icon className={`w-5 h-5 ${link.color}`} />
//                 </div>
//                 <span className="font-medium text-dark-900 dark:text-white">{link.label}</span>
//               </Link>
//             </motion.div>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Continue Reading */}
//             {history.length > 0 && (
//               <div>
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="text-xl font-bold text-dark-900 dark:text-white flex items-center gap-2">
//                     <Clock className="w-5 h-5 text-primary-600" /> Continue Reading
//                   </h2>
//                   <Link to="/dashboard/history" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
//                     View All <ChevronRight className="w-4 h-4" />
//                   </Link>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {history.slice(0, 4).map((item, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                     >
//                       {/* History item card - simplified */}
//                       <div className="bg-white dark:bg-dark-900 rounded-xl p-4 border border-gray-100 dark:border-dark-800">
//                         <p className="text-sm text-secondary-500">{item.contentType}</p>
//                         <p className="font-medium text-dark-900 dark:text-white">Progress: {item.progress}%</p>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Recommendations */}
//             <div>
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-xl font-bold text-dark-900 dark:text-white flex items-center gap-2">
//                   <Sparkles className="w-5 h-5 text-accent-500" /> Recommended for You
//                 </h2>
//               </div>
//               {trendingLoading ? (
//                 <LoadingSpinner />
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {trending.slice(0, 4).map((poem, index) => (
//                     <motion.div
//                       key={poem._id}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                     >
//                       <ContentCard item={poem} type="poem" />
//                     </motion.div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Profile Card */}
//             <div className="bg-white dark:bg-dark-900 rounded-xl p-6 border border-gray-100 dark:border-dark-800">
//               <div className="flex items-center gap-4 mb-4">
//                 <img
//                   src={user?.avatar || '/default-avatar.jpg'}
//                   alt={user?.name}
//                   className="w-16 h-16 rounded-full object-cover"
//                 />
//                 <div>
//                   <h3 className="font-semibold text-dark-900 dark:text-white">{user?.name}</h3>
//                   <p className="text-sm text-secondary-500">{user?.email}</p>
//                 </div>
//               </div>
//               <Link to="/dashboard/profile" className="btn-outline w-full text-sm py-2">
//                 Edit Profile
//               </Link>
//             </div>

//             {/* Stats */}
//             <div className="bg-white dark:bg-dark-900 rounded-xl p-6 border border-gray-100 dark:border-dark-800">
//               <h3 className="font-semibold text-dark-900 dark:text-white mb-4">Your Stats</h3>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <span className="text-secondary-500">Poems Read</span>
//                   <span className="font-medium text-dark-900 dark:text-white">{history.filter(h => h.contentType === 'poem').length}</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-secondary-500">Favorites</span>
//                   <span className="font-medium text-dark-900 dark:text-white">{favorites.length}</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-secondary-500">Following</span>
//                   <span className="font-medium text-dark-900 dark:text-white">{user?.following?.length || 0}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Subscription */}
//             <div className="bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl p-6 text-white">
//               <h3 className="font-semibold mb-2">Current Plan</h3>
//               <p className="text-2xl font-bold capitalize mb-1">{user?.subscription?.plan || 'Free'}</p>
//               <p className="text-white/80 text-sm mb-4">
//                 {user?.subscription?.plan === 'free' ? 'Upgrade to unlock more features' : 'Enjoy your premium benefits!'}
//               </p>
//               <Link to="/subscription" className="inline-flex items-center gap-2 px-4 py-2 bg-white text-primary-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
//                 {user?.subscription?.plan === 'free' ? 'Upgrade Now' : 'Manage Plan'}
//                 <ChevronRight className="w-4 h-4" />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default UserDashboard








import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import {
  BookOpen, Heart, Clock, Download, Bell, Settings,
  ChevronRight, TrendingUp, Sparkles
} from 'lucide-react'

import LoadingSpinner from '../../components/common/LoadingSpinner'
import ContentCard from '../../components/common/ContentCard'
import userAPI from '../../api/userAPI'
import poemAPI from '../../api/poemAPI'

const quickLinks = [
  { to: '/dashboard/favorites', icon: Heart, label: 'Favorites', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
  { to: '/dashboard/history', icon: Clock, label: 'History', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { to: '/dashboard/downloads', icon: Download, label: 'Downloads', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
  { to: '/dashboard/notifications', icon: Bell, label: 'Notifications', color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
  { to: '/dashboard/profile', icon: Settings, label: 'Settings', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
]

const UserDashboard = () => {
  const { user } = useSelector(state => state.auth)

  const { data: favoritesData, isLoading: favoritesLoading } = useQuery({
    queryKey: ['user-favorites'],
    queryFn: () => userAPI.getFavorites('poems')
  })

  const { data: historyData, isLoading: historyLoading } = useQuery({
    queryKey: ['user-history'],
    queryFn: () => userAPI.getHistory()
  })

  const { data: trendingData, isLoading: trendingLoading } = useQuery({
    queryKey: ['trending-poems'],
    queryFn: () => poemAPI.getTrendingPoems()
  })

  // SAFE DATA EXTRACTION - Handle different response structures
  const getSafeArray = (data, fallback = []) => {
    if (!data) return fallback;
    
    // If data is already an array
    if (Array.isArray(data)) return data;
    
    // If data has a data property that's an array
    if (data.data && Array.isArray(data.data)) return data.data;
    
    // If data has a poems property that's an array
    if (data.poems && Array.isArray(data.poems)) return data.poems;
    
    // If data is an object with numeric keys (array-like)
    if (typeof data === 'object' && !Array.isArray(data)) {
      const values = Object.values(data);
      if (values.length > 0 && Array.isArray(values[0])) return values[0];
      if (values.every(v => typeof v === 'object')) return values;
    }
    
    return fallback;
  };

  const favorites = getSafeArray(favoritesData, []);
  const history = getSafeArray(historyData, []);
  const trending = getSafeArray(trendingData, []);

  // Loading state
  if (trendingLoading || favoritesLoading || historyLoading) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2">
            Welcome back, {user?.name?.split(' ')[0] || 'Reader'}!
          </h1>
          <p className="text-secondary-500 dark:text-secondary-400">
            Here's what's happening in your literary world.
          </p>
        </motion.div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {quickLinks.map((link, index) => (
            <motion.div
              key={link.to}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={link.to}
                className="flex items-center gap-3 p-4 bg-white dark:bg-dark-900 rounded-xl border border-gray-100 dark:border-dark-800 hover:shadow-md transition-shadow"
              >
                <div className={`w-10 h-10 rounded-lg ${link.bg} flex items-center justify-center`}>
                  <link.icon className={`w-5 h-5 ${link.color}`} />
                </div>
                <span className="font-medium text-dark-900 dark:text-white">{link.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Reading */}
            {history.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-dark-900 dark:text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary-600" /> Continue Reading
                  </h2>
                  <Link to="/dashboard/history" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
                    View All <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {history.slice(0, 4).map((item, index) => (
                    <motion.div
                      key={item._id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="bg-white dark:bg-dark-900 rounded-xl p-4 border border-gray-100 dark:border-dark-800">
                        <p className="text-sm text-secondary-500 capitalize">{item.contentType || 'poem'}</p>
                        <p className="font-medium text-dark-900 dark:text-white">{item.title || 'Untitled'}</p>
                        {item.progress && (
                          <div className="mt-2">
                            <div className="w-full bg-gray-200 dark:bg-dark-800 rounded-full h-1.5">
                              <div 
                                className="bg-primary-600 h-1.5 rounded-full" 
                                style={{ width: `${item.progress}%` }}
                              />
                            </div>
                            <p className="text-xs text-secondary-500 mt-1">Progress: {item.progress}%</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations / Trending */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-dark-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent-500" /> Recommended for You
                </h2>
              </div>
              {trendingLoading ? (
                <LoadingSpinner />
              ) : trending.length === 0 ? (
                <div className="bg-white dark:bg-dark-900 rounded-xl p-8 text-center border border-gray-100 dark:border-dark-800">
                  <p className="text-secondary-500">No recommendations available yet.</p>
                  <p className="text-sm text-secondary-400 mt-2">Start exploring more content to get personalized recommendations.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {trending.slice(0, 4).map((poem, index) => (
                    <motion.div
                      key={poem._id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ContentCard item={poem} type="poem" />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white dark:bg-dark-900 rounded-xl p-6 border border-gray-100 dark:border-dark-800">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={user?.avatar || '/default-avatar.jpg'}
                  alt={user?.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-dark-900 dark:text-white">{user?.name}</h3>
                  <p className="text-sm text-secondary-500">{user?.email}</p>
                </div>
              </div>
              <Link to="/dashboard/profile" className="btn-outline w-full text-sm py-2">
                Edit Profile
              </Link>
            </div>

            {/* Stats */}
            <div className="bg-white dark:bg-dark-900 rounded-xl p-6 border border-gray-100 dark:border-dark-800">
              <h3 className="font-semibold text-dark-900 dark:text-white mb-4">Your Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-secondary-500">Poems Read</span>
                  <span className="font-medium text-dark-900 dark:text-white">
                    {Array.isArray(history) ? history.filter(h => h?.contentType === 'poem').length : 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary-500">Favorites</span>
                  <span className="font-medium text-dark-900 dark:text-white">
                    {Array.isArray(favorites) ? favorites.length : 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary-500">Following</span>
                  <span className="font-medium text-dark-900 dark:text-white">
                    {user?.following?.length || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Subscription */}
            <div className="bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl p-6 text-white">
              <h3 className="font-semibold mb-2">Current Plan</h3>
              <p className="text-2xl font-bold capitalize mb-1">{user?.subscription?.plan || 'Free'}</p>
              <p className="text-white/80 text-sm mb-4">
                {user?.subscription?.plan === 'free' ? 'Upgrade to unlock more features' : 'Enjoy your premium benefits!'}
              </p>
              <Link to="/subscription" className="inline-flex items-center gap-2 px-4 py-2 bg-white text-primary-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                {user?.subscription?.plan === 'free' ? 'Upgrade Now' : 'Manage Plan'}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard