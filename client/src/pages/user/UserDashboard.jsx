// client/src/pages/user/UserDashboard.jsx

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







// // client/src/pages/user/UserDashboard.jsx
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

//   const { data: historyData, isLoading: historyLoading } = useQuery({
//     queryKey: ['user-history'],
//     queryFn: () => userAPI.getHistory()
//   })

//   const { data: trendingData, isLoading: trendingLoading } = useQuery({
//     queryKey: ['trending-poems'],
//     queryFn: () => poemAPI.getTrendingPoems()
//   })

//   // SAFE DATA EXTRACTION - Handle different response structures
//   const getSafeArray = (data, fallback = []) => {
//     if (!data) return fallback;
    
//     // If data is already an array
//     if (Array.isArray(data)) return data;
    
//     // If data has a data property that's an array
//     if (data.data && Array.isArray(data.data)) return data.data;
    
//     // If data has a poems property that's an array
//     if (data.poems && Array.isArray(data.poems)) return data.poems;
    
//     // If data is an object with numeric keys (array-like)
//     if (typeof data === 'object' && !Array.isArray(data)) {
//       const values = Object.values(data);
//       if (values.length > 0 && Array.isArray(values[0])) return values[0];
//       if (values.every(v => typeof v === 'object')) return values;
//     }
    
//     return fallback;
//   };

//   const favorites = getSafeArray(favoritesData, []);
//   const history = getSafeArray(historyData, []);
//   const trending = getSafeArray(trendingData, []);

//   // Loading state
//   if (trendingLoading || favoritesLoading || historyLoading) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
//         <div className="flex items-center justify-center min-h-[60vh]">
//           <LoadingSpinner />
//         </div>
//       </div>
//     );
//   }

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
//                       key={item._id || index}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                     >
//                       <div className="bg-white dark:bg-dark-900 rounded-xl p-4 border border-gray-100 dark:border-dark-800">
//                         <p className="text-sm text-secondary-500 capitalize">{item.contentType || 'poem'}</p>
//                         <p className="font-medium text-dark-900 dark:text-white">{item.title || 'Untitled'}</p>
//                         {item.progress && (
//                           <div className="mt-2">
//                             <div className="w-full bg-gray-200 dark:bg-dark-800 rounded-full h-1.5">
//                               <div 
//                                 className="bg-primary-600 h-1.5 rounded-full" 
//                                 style={{ width: `${item.progress}%` }}
//                               />
//                             </div>
//                             <p className="text-xs text-secondary-500 mt-1">Progress: {item.progress}%</p>
//                           </div>
//                         )}
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Recommendations / Trending */}
//             <div>
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-xl font-bold text-dark-900 dark:text-white flex items-center gap-2">
//                   <Sparkles className="w-5 h-5 text-accent-500" /> Recommended for You
//                 </h2>
//               </div>
//               {trendingLoading ? (
//                 <LoadingSpinner />
//               ) : trending.length === 0 ? (
//                 <div className="bg-white dark:bg-dark-900 rounded-xl p-8 text-center border border-gray-100 dark:border-dark-800">
//                   <p className="text-secondary-500">No recommendations available yet.</p>
//                   <p className="text-sm text-secondary-400 mt-2">Start exploring more content to get personalized recommendations.</p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {trending.slice(0, 4).map((poem, index) => (
//                     <motion.div
//                       key={poem._id || index}
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
//                   <span className="font-medium text-dark-900 dark:text-white">
//                     {Array.isArray(history) ? history.filter(h => h?.contentType === 'poem').length : 0}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-secondary-500">Favorites</span>
//                   <span className="font-medium text-dark-900 dark:text-white">
//                     {Array.isArray(favorites) ? favorites.length : 0}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-secondary-500">Following</span>
//                   <span className="font-medium text-dark-900 dark:text-white">
//                     {user?.following?.length || 0}
//                   </span>
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













// // client/src/pages/user/UserDashboard.jsx
// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { useQuery } from '@tanstack/react-query'
// import { motion } from 'framer-motion'
// import { useSelector } from 'react-redux'
// import {
//   BookOpen, Heart, Clock, Download, Bell, Settings,
//   ChevronRight, TrendingUp, Sparkles, User, LogOut,
//   Crown, Calendar, Eye, ThumbsUp, MessageCircle
// } from 'lucide-react'

// import LoadingSpinner from '../../components/common/LoadingSpinner'
// import ContentCard from '../../components/common/ContentCard'
// import userAPI from '../../api/userAPI'
// import poemAPI from '../../api/poemAPI'
// import subscriptionAPI from '../../api/subscriptionAPI'

// const quickLinks = [
//   { to: '/dashboard/favorites', icon: Heart, label: 'Favorites', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
//   { to: '/dashboard/history', icon: Clock, label: 'History', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
//   { to: '/dashboard/downloads', icon: Download, label: 'Downloads', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
//   { to: '/dashboard/notifications', icon: Bell, label: 'Notifications', color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
//   { to: '/dashboard/profile', icon: Settings, label: 'Settings', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
// ]

// const UserDashboard = () => {
//   const { user } = useSelector(state => state.auth)

//   // Fetch favorites
//   const { data: favoritesData, isLoading: favoritesLoading, error: favoritesError } = useQuery({
//     queryKey: ['user-favorites'],
//     queryFn: () => userAPI.getFavorites('poems'),
//     retry: 1
//   })

//   // Fetch reading history
//   const { data: historyData, isLoading: historyLoading, error: historyError } = useQuery({
//     queryKey: ['user-history'],
//     queryFn: () => userAPI.getHistory('poem'),
//     retry: 1
//   })

//   // Fetch trending poems
//   const { data: trendingData, isLoading: trendingLoading, error: trendingError } = useQuery({
//     queryKey: ['trending-poems'],
//     queryFn: () => poemAPI.getTrendingPoems(),
//     retry: 1
//   })

//   // Fetch current subscription
//   const { data: subscriptionData, isLoading: subscriptionLoading } = useQuery({
//     queryKey: ['current-subscription'],
//     queryFn: () => subscriptionAPI.getCurrent().catch(() => ({ data: { plan: 'free' } })),
//     retry: 1
//   })

//   // SAFE DATA EXTRACTION - Handle different response structures
//   const getSafeArray = (data, fallback = []) => {
//     if (!data) return fallback
    
//     // If data is already an array
//     if (Array.isArray(data)) return data
    
//     // If data has a data property that's an array
//     if (data.data && Array.isArray(data.data)) return data.data
    
//     // If data has a poems property that's an array
//     if (data.poems && Array.isArray(data.poems)) return data.poems
    
//     // If data has a results property that's an array
//     if (data.results && Array.isArray(data.results)) return data.results
    
//     // If data is an object with numeric keys (array-like)
//     if (typeof data === 'object' && !Array.isArray(data)) {
//       const values = Object.values(data)
//       if (values.length > 0 && Array.isArray(values[0])) return values[0]
//       if (values.every(v => typeof v === 'object')) return values
//     }
    
//     return fallback
//   }

//   const favorites = getSafeArray(favoritesData, [])
//   const history = getSafeArray(historyData, [])
//   const trending = getSafeArray(trendingData, [])
//   const subscription = subscriptionData?.data || subscriptionData || { plan: 'free' }

//   // Calculate stats
//   const poemsRead = history.filter(h => h?.contentType === 'poem' || h?.type === 'poem').length
//   const favoritesCount = favorites.length

//   // Loading state
//   if (trendingLoading || favoritesLoading || historyLoading) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
//         <div className="flex items-center justify-center min-h-[60vh]">
//           <LoadingSpinner />
//         </div>
//       </div>
//     )
//   }

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
//                 className="flex items-center gap-3 p-4 bg-white dark:bg-dark-900 rounded-xl border border-gray-100 dark:border-dark-800 hover:shadow-md transition-all hover:-translate-y-0.5"
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
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="text-xl font-bold text-dark-900 dark:text-white flex items-center gap-2">
//                     <Clock className="w-5 h-5 text-primary-600" /> Continue Reading
//                   </h2>
//                   <Link to="/dashboard/history" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors">
//                     View All <ChevronRight className="w-4 h-4" />
//                   </Link>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {history.slice(0, 4).map((item, index) => (
//                     <motion.div
//                       key={item._id || item.contentId || index}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                     >
//                       <Link to={`/${item.contentType || 'poem'}/${item.slug || item.contentId}`}>
//                         <div className="bg-white dark:bg-dark-900 rounded-xl p-4 border border-gray-100 dark:border-dark-800 hover:shadow-md transition-all hover:-translate-y-0.5">
//                           <div className="flex items-center justify-between mb-2">
//                             <p className="text-xs text-secondary-500 capitalize px-2 py-0.5 bg-gray-100 dark:bg-dark-800 rounded-full">
//                               {item.contentType || item.type || 'poem'}
//                             </p>
//                             {item.progress && (
//                               <span className="text-xs text-primary-600">{item.progress}%</span>
//                             )}
//                           </div>
//                           <p className="font-medium text-dark-900 dark:text-white line-clamp-1">
//                             {item.title || 'Untitled'}
//                           </p>
//                           {item.author?.name && (
//                             <p className="text-sm text-secondary-500 mt-1">by {item.author.name}</p>
//                           )}
//                           {item.progress && (
//                             <div className="mt-3">
//                               <div className="w-full bg-gray-200 dark:bg-dark-800 rounded-full h-1.5">
//                                 <div 
//                                   className="bg-primary-600 h-1.5 rounded-full transition-all" 
//                                   style={{ width: `${item.progress}%` }}
//                                 />
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </Link>
//                     </motion.div>
//                   ))}
//                 </div>
//               </motion.div>
//             )}

//             {/* Recommendations / Trending */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-xl font-bold text-dark-900 dark:text-white flex items-center gap-2">
//                   <Sparkles className="w-5 h-5 text-accent-500" /> Recommended for You
//                 </h2>
//               </div>
//               {trending.length === 0 ? (
//                 <div className="bg-white dark:bg-dark-900 rounded-xl p-8 text-center border border-gray-100 dark:border-dark-800">
//                   <Sparkles className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
//                   <p className="text-secondary-500">No recommendations available yet.</p>
//                   <p className="text-sm text-secondary-400 mt-2">Start exploring more content to get personalized recommendations.</p>
//                   <Link to="/explore" className="btn-primary mt-4 inline-block">
//                     Explore Content
//                   </Link>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {trending.slice(0, 4).map((poem, index) => (
//                     <motion.div
//                       key={poem._id || index}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                     >
//                       <ContentCard item={poem} type="poem" />
//                     </motion.div>
//                   ))}
//                 </div>
//               )}
//             </motion.div>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Profile Card */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.1 }}
//               className="bg-white dark:bg-dark-900 rounded-xl p-6 border border-gray-100 dark:border-dark-800"
//             >
//               <div className="flex items-center gap-4 mb-4">
//                 <img
//                   src={user?.avatar || '/default-avatar.jpg'}
//                   alt={user?.name}
//                   className="w-16 h-16 rounded-full object-cover border-2 border-primary-100"
//                   onError={(e) => { e.target.src = '/default-avatar.jpg' }}
//                 />
//                 <div>
//                   <h3 className="font-semibold text-dark-900 dark:text-white">{user?.name}</h3>
//                   <p className="text-sm text-secondary-500">{user?.email}</p>
//                   <span className="inline-block px-2 py-0.5 bg-primary-100 text-primary-700 text-xs rounded-full mt-1 capitalize">
//                     {user?.role || 'User'}
//                   </span>
//                 </div>
//               </div>
//               <Link to="/dashboard/profile" className="btn-outline w-full text-sm py-2 transition-colors">
//                 Edit Profile
//               </Link>
//             </motion.div>

//             {/* Stats */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.2 }}
//               className="bg-white dark:bg-dark-900 rounded-xl p-6 border border-gray-100 dark:border-dark-800"
//             >
//               <h3 className="font-semibold text-dark-900 dark:text-white mb-4 flex items-center gap-2">
//                 <TrendingUp className="w-5 h-5 text-primary-600" />
//                 Your Stats
//               </h3>
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-dark-800">
//                   <span className="text-secondary-500 flex items-center gap-2">
//                     <BookOpen className="w-4 h-4" /> Poems Read
//                   </span>
//                   <span className="font-semibold text-dark-900 dark:text-white">{poemsRead}</span>
//                 </div>
//                 <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-dark-800">
//                   <span className="text-secondary-500 flex items-center gap-2">
//                     <Heart className="w-4 h-4" /> Favorites
//                   </span>
//                   <span className="font-semibold text-dark-900 dark:text-white">{favoritesCount}</span>
//                 </div>
//                 <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-dark-800">
//                   <span className="text-secondary-500 flex items-center gap-2">
//                     <User className="w-4 h-4" /> Following
//                   </span>
//                   <span className="font-semibold text-dark-900 dark:text-white">
//                     {user?.following?.length || 0}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between py-2">
//                   <span className="text-secondary-500 flex items-center gap-2">
//                     <Calendar className="w-4 h-4" /> Member Since
//                   </span>
//                   <span className="font-semibold text-dark-900 dark:text-white">
//                     {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
//                   </span>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Subscription Card */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.3 }}
//               className={`rounded-xl p-6 text-white relative overflow-hidden ${
//                 subscription?.plan === 'free' 
//                   ? 'bg-gradient-to-br from-gray-600 to-gray-800' 
//                   : subscription?.plan === 'basic'
//                   ? 'bg-gradient-to-br from-blue-600 to-blue-800'
//                   : subscription?.plan === 'premium'
//                   ? 'bg-gradient-to-br from-primary-600 to-accent-600'
//                   : 'bg-gradient-to-br from-purple-600 to-pink-600'
//               }`}
//             >
//               <div className="absolute top-0 right-0 opacity-10">
//                 <Crown className="w-24 h-24" />
//               </div>
//               <h3 className="font-semibold mb-2 flex items-center gap-2">
//                 <Crown className="w-5 h-5" /> Current Plan
//               </h3>
//               <p className="text-3xl font-bold capitalize mb-1">{subscription?.plan || 'Free'}</p>
//               {subscription?.expiresAt && (
//                 <p className="text-white/80 text-sm mb-4">
//                   Expires: {new Date(subscription.expiresAt).toLocaleDateString()}
//                 </p>
//               )}
//               <Link 
//                 to="/subscription" 
//                 className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-medium transition-all"
//               >
//                 {subscription?.plan === 'free' ? 'Upgrade Now' : 'Manage Plan'}
//                 <ChevronRight className="w-4 h-4" />
//               </Link>
//             </motion.div>

//             {/* Quick Tip */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.4 }}
//               className="bg-gradient-to-br from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 rounded-xl p-6 border border-accent-100 dark:border-accent-800"
//             >
//               <div className="flex items-start gap-3">
//                 <div className="p-2 bg-accent-100 dark:bg-accent-900/30 rounded-lg">
//                   <MessageCircle className="w-5 h-5 text-accent-600" />
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-dark-900 dark:text-white mb-1">Daily Inspiration</h4>
//                   <p className="text-sm text-secondary-600 dark:text-secondary-400">
//                     Discover new poems every day based on your reading preferences.
//                   </p>
//                   <Link to="/explore" className="text-sm text-accent-600 hover:text-accent-700 mt-2 inline-block">
//                     Explore Now →
//                   </Link>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default UserDashboard













// // client/src/pages/user/UserDashboard.jsx - Fixed version
// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { useQuery } from '@tanstack/react-query'
// import { motion } from 'framer-motion'
// import { useSelector } from 'react-redux'
// import {
//   BookOpen, Heart, Clock, Download, Bell, Settings,
//   ChevronRight, TrendingUp, Sparkles, User, LogOut,
//   Crown, Calendar, Eye, ThumbsUp, MessageCircle
// } from 'lucide-react'

// import LoadingSpinner from '../../components/common/LoadingSpinner'
// import ContentCard from '../../components/common/ContentCard'
// import userAPI from '../../api/userAPI'
// import poemAPI from '../../api/poemAPI'
// import subscriptionAPI from '../../api/subscriptionAPI'

// const quickLinks = [
//   { to: '/dashboard/favorites', icon: Heart, label: 'Favorites', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
//   { to: '/dashboard/history', icon: Clock, label: 'History', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
//   { to: '/dashboard/downloads', icon: Download, label: 'Downloads', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
//   { to: '/dashboard/notifications', icon: Bell, label: 'Notifications', color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
//   { to: '/dashboard/profile', icon: Settings, label: 'Settings', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
// ]

// const UserDashboard = () => {
//   const { user } = useSelector(state => state.auth)

//   // Fetch favorites
//   const { data: favoritesData, isLoading: favoritesLoading } = useQuery({
//     queryKey: ['user-favorites'],
//     queryFn: () => userAPI.getFavorites('poems'),
//     retry: 1
//   })

//   // Fetch reading history
//   const { data: historyData, isLoading: historyLoading } = useQuery({
//     queryKey: ['user-history'],
//     queryFn: () => userAPI.getHistory('poem'),
//     retry: 1
//   })

//   // Fetch trending poems
//   const { data: trendingData, isLoading: trendingLoading } = useQuery({
//     queryKey: ['trending-poems'],
//     queryFn: () => poemAPI.getTrendingPoems(),
//     retry: 1
//   })

//   // SAFE DATA EXTRACTION - Handle different response structures
//   const getSafeArray = (data, fallback = []) => {
//     if (!data) return fallback
//     if (Array.isArray(data)) return data
//     if (data.data && Array.isArray(data.data)) return data.data
//     if (data.poems && Array.isArray(data.poems)) return data.poems
//     if (data.results && Array.isArray(data.results)) return data.results
//     if (typeof data === 'object' && !Array.isArray(data)) {
//       const values = Object.values(data)
//       if (values.length > 0 && Array.isArray(values[0])) return values[0]
//       if (values.every(v => typeof v === 'object')) return values
//     }
//     return fallback
//   }

//   // Get subscription plan from user object (most reliable)
//   const getUserSubscriptionPlan = () => {
//     if (!user) return 'free'
//     if (user.subscription) {
//       if (typeof user.subscription === 'string') return user.subscription
//       if (user.subscription.plan) {
//         if (typeof user.subscription.plan === 'string') return user.subscription.plan
//         if (typeof user.subscription.plan === 'object') return user.subscription.plan.name || 'free'
//       }
//     }
//     if (user.plan) {
//       if (typeof user.plan === 'string') return user.plan
//     }
//     return 'free'
//   }

//   const getUserSubscriptionExpiry = () => {
//     if (!user) return null
//     if (user.subscription?.expiresAt) return user.subscription.expiresAt
//     if (user.subscriptionExpiry) return user.subscriptionExpiry
//     return null
//   }

//   const favorites = getSafeArray(favoritesData, [])
//   const history = getSafeArray(historyData, [])
//   const trending = getSafeArray(trendingData, [])
  
//   // Get subscription plan safely from user object
//   const subscriptionPlan = getUserSubscriptionPlan()
//   const subscriptionExpiry = getUserSubscriptionExpiry()

//   // Calculate stats
//   const poemsRead = history.filter(h => h?.contentType === 'poem' || h?.type === 'poem').length
//   const favoritesCount = favorites.length

//   // Get plan color based on plan type
//   const getPlanColor = (plan) => {
//     const planName = String(plan).toLowerCase()
//     if (planName === 'free') return 'from-gray-600 to-gray-800'
//     if (planName === 'basic') return 'from-blue-600 to-blue-800'
//     if (planName === 'premium') return 'from-primary-600 to-accent-600'
//     if (planName === 'pro') return 'from-purple-600 to-pink-600'
//     return 'from-gray-600 to-gray-800'
//   }

//   // Format plan display name
//   const formatPlanName = (plan) => {
//     const planStr = String(plan)
//     return planStr.charAt(0).toUpperCase() + planStr.slice(1)
//   }

//   // Loading state
//   if (trendingLoading || favoritesLoading || historyLoading) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
//         <div className="flex items-center justify-center min-h-[60vh]">
//           <LoadingSpinner />
//         </div>
//       </div>
//     )
//   }

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
//                 className="flex items-center gap-3 p-4 bg-white dark:bg-dark-900 rounded-xl border border-gray-100 dark:border-dark-800 hover:shadow-md transition-all hover:-translate-y-0.5"
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
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="text-xl font-bold text-dark-900 dark:text-white flex items-center gap-2">
//                     <Clock className="w-5 h-5 text-primary-600" /> Continue Reading
//                   </h2>
//                   <Link to="/dashboard/history" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors">
//                     View All <ChevronRight className="w-4 h-4" />
//                   </Link>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {history.slice(0, 4).map((item, index) => (
//                     <motion.div
//                       key={item._id || item.contentId || index}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                     >
//                       <Link to={`/${item.contentType || 'poem'}/${item.slug || item.contentId}`}>
//                         <div className="bg-white dark:bg-dark-900 rounded-xl p-4 border border-gray-100 dark:border-dark-800 hover:shadow-md transition-all hover:-translate-y-0.5">
//                           <div className="flex items-center justify-between mb-2">
//                             <p className="text-xs text-secondary-500 capitalize px-2 py-0.5 bg-gray-100 dark:bg-dark-800 rounded-full">
//                               {item.contentType || item.type || 'poem'}
//                             </p>
//                             {item.progress && (
//                               <span className="text-xs text-primary-600">{item.progress}%</span>
//                             )}
//                           </div>
//                           <p className="font-medium text-dark-900 dark:text-white line-clamp-1">
//                             {item.title || 'Untitled'}
//                           </p>
//                           {item.author?.name && (
//                             <p className="text-sm text-secondary-500 mt-1">by {item.author.name}</p>
//                           )}
//                           {item.progress && (
//                             <div className="mt-3">
//                               <div className="w-full bg-gray-200 dark:bg-dark-800 rounded-full h-1.5">
//                                 <div 
//                                   className="bg-primary-600 h-1.5 rounded-full transition-all" 
//                                   style={{ width: `${item.progress}%` }}
//                                 />
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </Link>
//                     </motion.div>
//                   ))}
//                 </div>
//               </motion.div>
//             )}

//             {/* Recommendations / Trending */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-xl font-bold text-dark-900 dark:text-white flex items-center gap-2">
//                   <Sparkles className="w-5 h-5 text-accent-500" /> Recommended for You
//                 </h2>
//               </div>
//               {trending.length === 0 ? (
//                 <div className="bg-white dark:bg-dark-900 rounded-xl p-8 text-center border border-gray-100 dark:border-dark-800">
//                   <Sparkles className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
//                   <p className="text-secondary-500">No recommendations available yet.</p>
//                   <p className="text-sm text-secondary-400 mt-2">Start exploring more content to get personalized recommendations.</p>
//                   <Link to="/explore" className="btn-primary mt-4 inline-block">
//                     Explore Content
//                   </Link>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {trending.slice(0, 4).map((poem, index) => (
//                     <motion.div
//                       key={poem._id || index}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                     >
//                       <ContentCard item={poem} type="poem" />
//                     </motion.div>
//                   ))}
//                 </div>
//               )}
//             </motion.div>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Profile Card */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.1 }}
//               className="bg-white dark:bg-dark-900 rounded-xl p-6 border border-gray-100 dark:border-dark-800"
//             >
//               <div className="flex items-center gap-4 mb-4">
//                 <img
//                   src={user?.avatar || '/default-avatar.jpg'}
//                   alt={user?.name}
//                   className="w-16 h-16 rounded-full object-cover border-2 border-primary-100"
//                   onError={(e) => { e.target.src = '/default-avatar.jpg' }}
//                 />
//                 <div>
//                   <h3 className="font-semibold text-dark-900 dark:text-white">{user?.name}</h3>
//                   <p className="text-sm text-secondary-500">{user?.email}</p>
//                   <span className="inline-block px-2 py-0.5 bg-primary-100 text-primary-700 text-xs rounded-full mt-1 capitalize">
//                     {user?.role || 'User'}
//                   </span>
//                 </div>
//               </div>
//               <Link to="/dashboard/profile" className="btn-outline w-full text-sm py-2 transition-colors">
//                 Edit Profile
//               </Link>
//             </motion.div>

//             {/* Stats */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.2 }}
//               className="bg-white dark:bg-dark-900 rounded-xl p-6 border border-gray-100 dark:border-dark-800"
//             >
//               <h3 className="font-semibold text-dark-900 dark:text-white mb-4 flex items-center gap-2">
//                 <TrendingUp className="w-5 h-5 text-primary-600" />
//                 Your Stats
//               </h3>
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-dark-800">
//                   <span className="text-secondary-500 flex items-center gap-2">
//                     <BookOpen className="w-4 h-4" /> Poems Read
//                   </span>
//                   <span className="font-semibold text-dark-900 dark:text-white">{poemsRead}</span>
//                 </div>
//                 <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-dark-800">
//                   <span className="text-secondary-500 flex items-center gap-2">
//                     <Heart className="w-4 h-4" /> Favorites
//                   </span>
//                   <span className="font-semibold text-dark-900 dark:text-white">{favoritesCount}</span>
//                 </div>
//                 <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-dark-800">
//                   <span className="text-secondary-500 flex items-center gap-2">
//                     <User className="w-4 h-4" /> Following
//                   </span>
//                   <span className="font-semibold text-dark-900 dark:text-white">
//                     {user?.following?.length || 0}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between py-2">
//                   <span className="text-secondary-500 flex items-center gap-2">
//                     <Calendar className="w-4 h-4" /> Member Since
//                   </span>
//                   <span className="font-semibold text-dark-900 dark:text-white">
//                     {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
//                   </span>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Subscription Card - FIXED */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.3 }}
//               className={`rounded-xl p-6 text-white relative overflow-hidden bg-gradient-to-br ${getPlanColor(subscriptionPlan)}`}
//             >
//               <div className="absolute top-0 right-0 opacity-10">
//                 <Crown className="w-24 h-24" />
//               </div>
//               <h3 className="font-semibold mb-2 flex items-center gap-2">
//                 <Crown className="w-5 h-5" /> Current Plan
//               </h3>
//               <p className="text-3xl font-bold mb-1">
//                 {formatPlanName(subscriptionPlan)}
//               </p>
//               {subscriptionExpiry && (
//                 <p className="text-white/80 text-sm mb-4">
//                   Expires: {new Date(subscriptionExpiry).toLocaleDateString()}
//                 </p>
//               )}
//               <Link 
//                 to="/subscription" 
//                 className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-medium transition-all"
//               >
//                 {subscriptionPlan === 'free' ? 'Upgrade Now' : 'Manage Plan'}
//                 <ChevronRight className="w-4 h-4" />
//               </Link>
//             </motion.div>

//             {/* Quick Tip */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.4 }}
//               className="bg-gradient-to-br from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 rounded-xl p-6 border border-accent-100 dark:border-accent-800"
//             >
//               <div className="flex items-start gap-3">
//                 <div className="p-2 bg-accent-100 dark:bg-accent-900/30 rounded-lg">
//                   <MessageCircle className="w-5 h-5 text-accent-600" />
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-dark-900 dark:text-white mb-1">Daily Inspiration</h4>
//                   <p className="text-sm text-secondary-600 dark:text-secondary-400">
//                     Discover new poems every day based on your reading preferences.
//                   </p>
//                   <Link to="/explore" className="text-sm text-accent-600 hover:text-accent-700 mt-2 inline-block">
//                     Explore Now →
//                   </Link>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default UserDashboard



















// // client/src/pages/user/UserDashboard.jsx
// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { useQuery } from '@tanstack/react-query'
// import { motion } from 'framer-motion'
// import { useSelector } from 'react-redux'
// import {
//   BookOpen, Heart, Clock, Download, Bell, Settings,
//   ChevronRight, TrendingUp, Sparkles, User, LogOut,
//   Crown, Calendar, Eye, ThumbsUp, MessageCircle
// } from 'lucide-react'

// import LoadingSpinner from '../../components/common/LoadingSpinner'
// import ContentCard from '../../components/common/ContentCard'
// import userAPI from '../../api/userAPI'
// import poemAPI from '../../api/poemAPI'
// import subscriptionAPI from '../../api/subscriptionAPI'

// const quickLinks = [
//   { to: '/dashboard/favorites', icon: Heart, label: 'Favorites', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
//   { to: '/dashboard/history', icon: Clock, label: 'History', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
//   { to: '/dashboard/downloads', icon: Download, label: 'Downloads', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
//   { to: '/dashboard/notifications', icon: Bell, label: 'Notifications', color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
//   { to: '/dashboard/profile', icon: Settings, label: 'Settings', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
// ]

// const UserDashboard = () => {
//   const { user } = useSelector(state => state.auth)

//   // ============================================
//   // DATA FETCHING
//   // ============================================

//   // Fetch favorites - get all favorites first
//   const { data: favoritesData, isLoading: favoritesLoading } = useQuery({
//     queryKey: ['user-favorites'],
//     queryFn: async () => {
//       const response = await userAPI.getFavorites()
//       console.log('Dashboard favorites response:', response)
//       return response
//     },
//     retry: 1
//   })

//   // Fetch reading history
//   const { data: historyData, isLoading: historyLoading } = useQuery({
//     queryKey: ['user-history'],
//     queryFn: async () => {
//       const response = await userAPI.getHistory()
//       console.log('Dashboard history response:', response)
//       return response
//     },
//     retry: 1
//   })

//   // Fetch trending poems
//   const { data: trendingData, isLoading: trendingLoading } = useQuery({
//     queryKey: ['trending-poems'],
//     queryFn: async () => {
//       const response = await poemAPI.getTrendingPoems()
//       console.log('Dashboard trending response:', response)
//       return response
//     },
//     retry: 1
//   })

//   // ============================================
//   // SAFE DATA EXTRACTION - Handle different response structures
//   // ============================================
  
//   const getSafeArray = (data, fallback = []) => {
//     if (!data) return fallback
    
//     // Direct array
//     if (Array.isArray(data)) return data
    
//     // Check for data property
//     if (data.data) {
//       if (Array.isArray(data.data)) return data.data
//       // If data.data is an object with multiple types
//       if (typeof data.data === 'object') {
//         // Try to find any array property
//         for (const key in data.data) {
//           if (Array.isArray(data.data[key])) {
//             return data.data[key]
//           }
//         }
//       }
//     }
    
//     // Check for common property names
//     if (data.poems && Array.isArray(data.poems)) return data.poems
//     if (data.books && Array.isArray(data.books)) return data.books
//     if (data.audio && Array.isArray(data.audio)) return data.audio
//     if (data.videos && Array.isArray(data.videos)) return data.videos
//     if (data.results && Array.isArray(data.results)) return data.results
//     if (data.items && Array.isArray(data.items)) return data.items
    
//     // If it's an object with array values, flatten
//     if (typeof data === 'object' && !Array.isArray(data)) {
//       const values = Object.values(data)
//       if (values.length > 0 && Array.isArray(values[0])) return values[0]
//       // Return all object values that are arrays flattened
//       const allArrays = values.filter(v => Array.isArray(v))
//       if (allArrays.length > 0) return allArrays.flat()
//     }
    
//     return fallback
//   }

//   const getHistoryItems = (data, fallback = []) => {
//     if (!data) return fallback
//     if (Array.isArray(data)) return data
//     if (data.data && Array.isArray(data.data)) return data.data
//     if (data.history && Array.isArray(data.history)) return data.history
//     if (data.readingHistory && Array.isArray(data.readingHistory)) return data.readingHistory
//     return fallback
//   }

//   // Process data
//   const favorites = getSafeArray(favoritesData, [])
//   const history = getHistoryItems(historyData, [])
//   const trending = getSafeArray(trendingData, [])

//   // ============================================
//   // SUBSCRIPTION HELPERS
//   // ============================================

//   // Get subscription plan from user object
//   const getUserSubscriptionPlan = () => {
//     if (!user) return 'free'
//     if (user.subscription) {
//       if (typeof user.subscription === 'string') return user.subscription
//       if (user.subscription.plan) {
//         if (typeof user.subscription.plan === 'string') return user.subscription.plan
//         if (typeof user.subscription.plan === 'object') return user.subscription.plan.name || 'free'
//       }
//     }
//     if (user.plan) {
//       if (typeof user.plan === 'string') return user.plan
//     }
//     return 'free'
//   }

//   const getUserSubscriptionExpiry = () => {
//     if (!user) return null
//     if (user.subscription?.expiresAt) return user.subscription.expiresAt
//     if (user.subscriptionExpiry) return user.subscriptionExpiry
//     return null
//   }

//   // Get plan color based on plan type
//   const getPlanColor = (plan) => {
//     const planName = String(plan).toLowerCase()
//     if (planName === 'free') return 'from-gray-600 to-gray-800'
//     if (planName === 'basic') return 'from-blue-600 to-blue-800'
//     if (planName === 'premium') return 'from-primary-600 to-accent-600'
//     if (planName === 'pro') return 'from-purple-600 to-pink-600'
//     return 'from-gray-600 to-gray-800'
//   }

//   // Format plan display name
//   const formatPlanName = (plan) => {
//     const planStr = String(plan)
//     return planStr.charAt(0).toUpperCase() + planStr.slice(1)
//   }

//   // ============================================
//   // CALCULATE STATS
//   // ============================================
  
//   const subscriptionPlan = getUserSubscriptionPlan()
//   const subscriptionExpiry = getUserSubscriptionExpiry()
  
//   // Count poems from history
//   const poemsRead = history.filter(h => 
//     h?.contentType === 'poem' || 
//     h?.type === 'poem' || 
//     h?.contentType === 'poems'
//   ).length
  
//   const favoritesCount = favorites.length

//   // ============================================
//   // DEBUG LOGGING
//   // ============================================
  
//   console.log('=== UserDashboard Debug ===')
//   console.log('User:', user)
//   console.log('Subscription Plan:', subscriptionPlan)
//   console.log('Favorites Data Raw:', favoritesData)
//   console.log('Favorites Processed:', favorites)
//   console.log('Favorites Count:', favoritesCount)
//   console.log('History Data Raw:', historyData)
//   console.log('History Processed:', history)
//   console.log('Poems Read:', poemsRead)
//   console.log('Trending Data Raw:', trendingData)
//   console.log('Trending Processed:', trending)

//   // ============================================
//   // LOADING STATE
//   // ============================================
  
//   if (trendingLoading || favoritesLoading || historyLoading) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
//         <div className="flex items-center justify-center min-h-[60vh]">
//           <LoadingSpinner size="lg" />
//         </div>
//       </div>
//     )
//   }

//   // ============================================
//   // RENDER COMPONENT
//   // ============================================
  
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
//                 className="flex items-center gap-3 p-4 bg-white dark:bg-dark-900 rounded-xl border border-gray-100 dark:border-dark-800 hover:shadow-md transition-all hover:-translate-y-0.5"
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
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="text-xl font-bold text-dark-900 dark:text-white flex items-center gap-2">
//                     <Clock className="w-5 h-5 text-primary-600" /> Continue Reading
//                   </h2>
//                   <Link to="/dashboard/history" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors">
//                     View All <ChevronRight className="w-4 h-4" />
//                   </Link>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {history.slice(0, 4).map((item, index) => (
//                     <motion.div
//                       key={item._id || item.contentId || index}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                     >
//                       <Link to={`/${item.contentType || 'poem'}/${item.slug || item.contentId}`}>
//                         <div className="bg-white dark:bg-dark-900 rounded-xl p-4 border border-gray-100 dark:border-dark-800 hover:shadow-md transition-all hover:-translate-y-0.5">
//                           <div className="flex items-center justify-between mb-2">
//                             <p className="text-xs text-secondary-500 capitalize px-2 py-0.5 bg-gray-100 dark:bg-dark-800 rounded-full">
//                               {item.contentType || item.type || 'poem'}
//                             </p>
//                             {item.progress && (
//                               <span className="text-xs text-primary-600">{item.progress}%</span>
//                             )}
//                           </div>
//                           <p className="font-medium text-dark-900 dark:text-white line-clamp-1">
//                             {item.title || 'Untitled'}
//                           </p>
//                           {item.author?.name && (
//                             <p className="text-sm text-secondary-500 mt-1">by {item.author.name}</p>
//                           )}
//                           {item.progress && (
//                             <div className="mt-3">
//                               <div className="w-full bg-gray-200 dark:bg-dark-800 rounded-full h-1.5">
//                                 <div 
//                                   className="bg-primary-600 h-1.5 rounded-full transition-all" 
//                                   style={{ width: `${item.progress}%` }}
//                                 />
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </Link>
//                     </motion.div>
//                   ))}
//                 </div>
//               </motion.div>
//             )}

//             {/* Recommendations / Trending */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-xl font-bold text-dark-900 dark:text-white flex items-center gap-2">
//                   <Sparkles className="w-5 h-5 text-accent-500" /> Recommended for You
//                 </h2>
//               </div>
//               {trending.length === 0 ? (
//                 <div className="bg-white dark:bg-dark-900 rounded-xl p-8 text-center border border-gray-100 dark:border-dark-800">
//                   <Sparkles className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
//                   <p className="text-secondary-500">No recommendations available yet.</p>
//                   <p className="text-sm text-secondary-400 mt-2">Start exploring more content to get personalized recommendations.</p>
//                   <Link to="/explore" className="btn-primary mt-4 inline-block">
//                     Explore Content
//                   </Link>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {trending.slice(0, 4).map((poem, index) => (
//                     <motion.div
//                       key={poem._id || index}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                     >
//                       <ContentCard item={poem} type="poem" />
//                     </motion.div>
//                   ))}
//                 </div>
//               )}
//             </motion.div>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Profile Card */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.1 }}
//               className="bg-white dark:bg-dark-900 rounded-xl p-6 border border-gray-100 dark:border-dark-800"
//             >
//               <div className="flex items-center gap-4 mb-4">
//                 <img
//                   src={user?.avatar || '/default-avatar.jpg'}
//                   alt={user?.name}
//                   className="w-16 h-16 rounded-full object-cover border-2 border-primary-100"
//                   onError={(e) => { e.target.src = '/default-avatar.jpg' }}
//                 />
//                 <div>
//                   <h3 className="font-semibold text-dark-900 dark:text-white">{user?.name}</h3>
//                   <p className="text-sm text-secondary-500">{user?.email}</p>
//                   <span className="inline-block px-2 py-0.5 bg-primary-100 text-primary-700 text-xs rounded-full mt-1 capitalize">
//                     {user?.role || 'User'}
//                   </span>
//                 </div>
//               </div>
//               <Link to="/dashboard/profile" className="btn-outline w-full text-sm py-2 transition-colors">
//                 Edit Profile
//               </Link>
//             </motion.div>

//             {/* Stats */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.2 }}
//               className="bg-white dark:bg-dark-900 rounded-xl p-6 border border-gray-100 dark:border-dark-800"
//             >
//               <h3 className="font-semibold text-dark-900 dark:text-white mb-4 flex items-center gap-2">
//                 <TrendingUp className="w-5 h-5 text-primary-600" />
//                 Your Stats
//               </h3>
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-dark-800">
//                   <span className="text-secondary-500 flex items-center gap-2">
//                     <BookOpen className="w-4 h-4" /> Poems Read
//                   </span>
//                   <span className="font-semibold text-dark-900 dark:text-white">{poemsRead}</span>
//                 </div>
//                 <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-dark-800">
//                   <span className="text-secondary-500 flex items-center gap-2">
//                     <Heart className="w-4 h-4" /> Favorites
//                   </span>
//                   <span className="font-semibold text-dark-900 dark:text-white">{favoritesCount}</span>
//                 </div>
//                 <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-dark-800">
//                   <span className="text-secondary-500 flex items-center gap-2">
//                     <User className="w-4 h-4" /> Following
//                   </span>
//                   <span className="font-semibold text-dark-900 dark:text-white">
//                     {user?.following?.length || 0}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between py-2">
//                   <span className="text-secondary-500 flex items-center gap-2">
//                     <Calendar className="w-4 h-4" /> Member Since
//                   </span>
//                   <span className="font-semibold text-dark-900 dark:text-white">
//                     {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
//                   </span>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Subscription Card */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.3 }}
//               className={`rounded-xl p-6 text-white relative overflow-hidden bg-gradient-to-br ${getPlanColor(subscriptionPlan)}`}
//             >
//               <div className="absolute top-0 right-0 opacity-10">
//                 <Crown className="w-24 h-24" />
//               </div>
//               <h3 className="font-semibold mb-2 flex items-center gap-2">
//                 <Crown className="w-5 h-5" /> Current Plan
//               </h3>
//               <p className="text-3xl font-bold mb-1">
//                 {formatPlanName(subscriptionPlan)}
//               </p>
//               {subscriptionExpiry && (
//                 <p className="text-white/80 text-sm mb-4">
//                   Expires: {new Date(subscriptionExpiry).toLocaleDateString()}
//                 </p>
//               )}
//               <Link 
//                 to="/subscription" 
//                 className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-medium transition-all"
//               >
//                 {subscriptionPlan === 'free' ? 'Upgrade Now' : 'Manage Plan'}
//                 <ChevronRight className="w-4 h-4" />
//               </Link>
//             </motion.div>

//             {/* Quick Tip */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.4 }}
//               className="bg-gradient-to-br from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 rounded-xl p-6 border border-accent-100 dark:border-accent-800"
//             >
//               <div className="flex items-start gap-3">
//                 <div className="p-2 bg-accent-100 dark:bg-accent-900/30 rounded-lg">
//                   <MessageCircle className="w-5 h-5 text-accent-600" />
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-dark-900 dark:text-white mb-1">Daily Inspiration</h4>
//                   <p className="text-sm text-secondary-600 dark:text-secondary-400">
//                     Discover new poems every day based on your reading preferences.
//                   </p>
//                   <Link to="/explore" className="text-sm text-accent-600 hover:text-accent-700 mt-2 inline-block">
//                     Explore Now →
//                   </Link>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default UserDashboard















// // client/src/pages/user/UserDashboard.jsx
// // LAST UPDATED: 2026-06-06
// // FIXED: Removed undefined trendingLoading variable

// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { useQuery } from '@tanstack/react-query'
// import { motion } from 'framer-motion'
// import { useSelector } from 'react-redux'
// import {
//   BookOpen, Heart, Clock, Download, Bell, Settings,
//   ChevronRight, TrendingUp, Sparkles, User,
//   Crown, Calendar, MessageCircle
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

// // ============================================
// // HELPER FUNCTIONS FOR DATA EXTRACTION
// // ============================================

// const extractRecommendations = (data) => {
//   console.log('🔍 Extracting recommendations from:', data)
  
//   if (!data) return []
  
//   // Case 1: Direct array
//   if (Array.isArray(data)) {
//     console.log('📦 Direct array, length:', data.length)
//     return data
//   }
  
//   // Case 2: Data wrapper { data: [...] }
//   if (data.data) {
//     if (Array.isArray(data.data)) {
//       console.log('📦 data.data array, length:', data.data.length)
//       return data.data
//     }
//     if (data.data.recommendations && Array.isArray(data.data.recommendations)) {
//       console.log('📦 data.data.recommendations, length:', data.data.recommendations.length)
//       return data.data.recommendations
//     }
//     if (data.data.poems && Array.isArray(data.data.poems)) {
//       console.log('📦 data.data.poems, length:', data.data.poems.length)
//       return data.data.poems
//     }
//   }
  
//   // Case 3: Recommendations wrapper
//   if (data.recommendations && Array.isArray(data.recommendations)) {
//     console.log('📦 recommendations array, length:', data.recommendations.length)
//     return data.recommendations
//   }
  
//   // Case 4: Poems wrapper
//   if (data.poems && Array.isArray(data.poems)) {
//     console.log('📦 poems array, length:', data.poems.length)
//     return data.poems
//   }
  
//   // Case 5: Results wrapper
//   if (data.results && Array.isArray(data.results)) {
//     console.log('📦 results array, length:', data.results.length)
//     return data.results
//   }
  
//   // Case 6: Items wrapper
//   if (data.items && Array.isArray(data.items)) {
//     console.log('📦 items array, length:', data.items.length)
//     return data.items
//   }
  
//   console.warn('⚠️ No recommendations found in response')
//   return []
// }

// const getSafeArray = (data, fallback = []) => {
//   if (!data) return fallback
  
//   if (Array.isArray(data)) return data
  
//   if (data.data) {
//     if (Array.isArray(data.data)) return data.data
//     if (typeof data.data === 'object') {
//       for (const key in data.data) {
//         if (Array.isArray(data.data[key])) {
//           return data.data[key]
//         }
//       }
//     }
//   }
  
//   if (data.poems && Array.isArray(data.poems)) return data.poems
//   if (data.books && Array.isArray(data.books)) return data.books
//   if (data.audio && Array.isArray(data.audio)) return data.audio
//   if (data.videos && Array.isArray(data.videos)) return data.videos
//   if (data.results && Array.isArray(data.results)) return data.results
//   if (data.items && Array.isArray(data.items)) return data.items
//   if (data.recommendations && Array.isArray(data.recommendations)) return data.recommendations
  
//   if (typeof data === 'object' && !Array.isArray(data)) {
//     const values = Object.values(data)
//     if (values.length > 0 && Array.isArray(values[0])) return values[0]
//     const allArrays = values.filter(v => Array.isArray(v))
//     if (allArrays.length > 0) return allArrays.flat()
//   }
  
//   return fallback
// }

// const getHistoryItems = (data, fallback = []) => {
//   if (!data) return fallback
//   if (Array.isArray(data)) return data
//   if (data.data && Array.isArray(data.data)) return data.data
//   if (data.history && Array.isArray(data.history)) return data.history
//   if (data.readingHistory && Array.isArray(data.readingHistory)) return data.readingHistory
//   return fallback
// }

// // ============================================
// // MAIN COMPONENT
// // ============================================
// const UserDashboard = () => {
//   const { user } = useSelector(state => state.auth)

//   // ============================================
//   // DATA FETCHING
//   // ============================================

//   // Fetch favorites
//   const { data: favoritesData, isLoading: favoritesLoading } = useQuery({
//     queryKey: ['user-favorites'],
//     queryFn: async () => {
//       try {
//         const response = await userAPI.getFavorites()
//         console.log('📚 Dashboard favorites response:', response)
//         return response
//       } catch (error) {
//         console.error('Error fetching favorites:', error)
//         return { data: [] }
//       }
//     },
//     retry: 1
//   })

//   // Fetch reading history
//   const { data: historyData, isLoading: historyLoading } = useQuery({
//     queryKey: ['user-history'],
//     queryFn: async () => {
//       try {
//         const response = await userAPI.getHistory()
//         console.log('📖 Dashboard history response:', response)
//         return response
//       } catch (error) {
//         console.error('Error fetching history:', error)
//         return { data: [] }
//       }
//     },
//     retry: 1
//   })

//   // Fetch recommendations for "Recommended for You"
//   const { data: recommendationsData, isLoading: recommendationsLoading } = useQuery({
//     queryKey: ['recommendations', user?._id],
//     queryFn: async () => {
//       try {
//         console.log('🎯 Fetching recommendations...')
        
//         // Try to get personalized recommendations if available
//         if (userAPI.getRecommendations) {
//           const response = await userAPI.getRecommendations()
//           console.log('🎯 Personalized recommendations response:', response)
//           if (response && extractRecommendations(response).length > 0) {
//             return response
//           }
//         }
        
//         // Fallback to trending poems
//         console.log('🎯 Falling back to trending poems...')
//         const trendingResponse = await poemAPI.getTrendingPoems()
//         console.log('🔥 Trending poems response:', trendingResponse)
        
//         if (trendingResponse) {
//           const trendingArray = getSafeArray(trendingResponse, [])
//           return { data: trendingArray }
//         }
        
//         return { data: [] }
//       } catch (error) {
//         console.error('Error fetching recommendations:', error)
//         return { data: [] }
//       }
//     },
//     retry: 2,
//     staleTime: 5 * 60 * 1000,
//   })

//   // ============================================
//   // PROCESS DATA
//   // ============================================
  
//   const favorites = getSafeArray(favoritesData, [])
//   const history = getHistoryItems(historyData, [])
//   const recommendations = extractRecommendations(recommendationsData)

//   console.log('🎯 Final recommendations array:', recommendations)
//   console.log('🎯 Recommendations count:', recommendations.length)

//   // ============================================
//   // SUBSCRIPTION HELPERS
//   // ============================================

//   const getUserSubscriptionPlan = () => {
//     if (!user) return 'free'
//     if (user.subscription) {
//       if (typeof user.subscription === 'string') return user.subscription
//       if (user.subscription.plan) {
//         if (typeof user.subscription.plan === 'string') return user.subscription.plan
//         if (typeof user.subscription.plan === 'object') return user.subscription.plan.name || 'free'
//       }
//     }
//     if (user.plan) {
//       if (typeof user.plan === 'string') return user.plan
//     }
//     return 'free'
//   }

//   const getUserSubscriptionExpiry = () => {
//     if (!user) return null
//     if (user.subscription?.expiresAt) return user.subscription.expiresAt
//     if (user.subscriptionExpiry) return user.subscriptionExpiry
//     return null
//   }

//   const getPlanColor = (plan) => {
//     const planName = String(plan).toLowerCase()
//     if (planName === 'free') return 'from-gray-600 to-gray-800'
//     if (planName === 'basic') return 'from-blue-600 to-blue-800'
//     if (planName === 'premium') return 'from-primary-600 to-accent-600'
//     if (planName === 'pro') return 'from-purple-600 to-pink-600'
//     return 'from-gray-600 to-gray-800'
//   }

//   const formatPlanName = (plan) => {
//     const planStr = String(plan)
//     return planStr.charAt(0).toUpperCase() + planStr.slice(1)
//   }

//   // ============================================
//   // CALCULATE STATS
//   // ============================================
  
//   const subscriptionPlan = getUserSubscriptionPlan()
//   const subscriptionExpiry = getUserSubscriptionExpiry()
  
//   const poemsRead = history.filter(h => 
//     h?.contentType === 'poem' || 
//     h?.type === 'poem' || 
//     h?.contentType === 'poems'
//   ).length
  
//   const favoritesCount = favorites.length

//   // ============================================
//   // LOADING STATE - FIXED: Removed trendingLoading
//   // ============================================
  
//   if (favoritesLoading || historyLoading || recommendationsLoading) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
//         <div className="flex items-center justify-center min-h-[60vh]">
//           <LoadingSpinner size="lg" />
//         </div>
//       </div>
//     )
//   }

//   // ============================================
//   // RENDER COMPONENT
//   // ============================================
  
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
//                 className="flex items-center gap-3 p-4 bg-white dark:bg-dark-900 rounded-xl border border-gray-100 dark:border-dark-800 hover:shadow-md transition-all hover:-translate-y-0.5"
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
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="text-xl font-bold text-dark-900 dark:text-white flex items-center gap-2">
//                     <Clock className="w-5 h-5 text-primary-600" /> Continue Reading
//                   </h2>
//                   <Link to="/dashboard/history" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors">
//                     View All <ChevronRight className="w-4 h-4" />
//                   </Link>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {history.slice(0, 4).map((item, index) => (
//                     <motion.div
//                       key={item._id || item.contentId || index}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                     >
//                       <Link to={`/${item.contentType || 'poem'}/${item.slug || item.contentId}`}>
//                         <div className="bg-white dark:bg-dark-900 rounded-xl p-4 border border-gray-100 dark:border-dark-800 hover:shadow-md transition-all hover:-translate-y-0.5">
//                           <div className="flex items-center justify-between mb-2">
//                             <p className="text-xs text-secondary-500 capitalize px-2 py-0.5 bg-gray-100 dark:bg-dark-800 rounded-full">
//                               {item.contentType || item.type || 'poem'}
//                             </p>
//                             {item.progress && (
//                               <span className="text-xs text-primary-600">{item.progress}%</span>
//                             )}
//                           </div>
//                           <p className="font-medium text-dark-900 dark:text-white line-clamp-1">
//                             {item.title || 'Untitled'}
//                           </p>
//                           {item.author?.name && (
//                             <p className="text-sm text-secondary-500 mt-1">by {item.author.name}</p>
//                           )}
//                           {item.progress && (
//                             <div className="mt-3">
//                               <div className="w-full bg-gray-200 dark:bg-dark-800 rounded-full h-1.5">
//                                 <div 
//                                   className="bg-primary-600 h-1.5 rounded-full transition-all" 
//                                   style={{ width: `${item.progress}%` }}
//                                 />
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </Link>
//                     </motion.div>
//                   ))}
//                 </div>
//               </motion.div>
//             )}

//             {/* Recommended for You */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-xl font-bold text-dark-900 dark:text-white flex items-center gap-2">
//                   <Sparkles className="w-5 h-5 text-accent-500" /> Recommended for You
//                 </h2>
//               </div>
              
//               {!recommendations || recommendations.length === 0 ? (
//                 <div className="bg-white dark:bg-dark-900 rounded-xl p-8 text-center border border-gray-100 dark:border-dark-800">
//                   <Sparkles className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
//                   <p className="text-secondary-500">No recommendations available yet.</p>
//                   <p className="text-sm text-secondary-400 mt-2">Start exploring more content to get personalized recommendations.</p>
//                   <Link to="/explore" className="inline-block mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
//                     Explore Content
//                   </Link>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {recommendations.slice(0, 4).map((item, index) => (
//                     <motion.div
//                       key={item._id || item.id || index}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                     >
//                       <ContentCard 
//                         item={item} 
//                         type={item.type || item.contentType || 'poem'} 
//                       />
//                     </motion.div>
//                   ))}
//                 </div>
//               )}
//             </motion.div>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Profile Card */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.1 }}
//               className="bg-white dark:bg-dark-900 rounded-xl p-6 border border-gray-100 dark:border-dark-800"
//             >
//               <div className="flex items-center gap-4 mb-4">
//                 <img
//                   src={user?.avatar || '/default-avatar.jpg'}
//                   alt={user?.name}
//                   className="w-16 h-16 rounded-full object-cover border-2 border-primary-100"
//                   onError={(e) => { e.target.src = '/default-avatar.jpg' }}
//                 />
//                 <div>
//                   <h3 className="font-semibold text-dark-900 dark:text-white">{user?.name}</h3>
//                   <p className="text-sm text-secondary-500">{user?.email}</p>
//                   <span className="inline-block px-2 py-0.5 bg-primary-100 text-primary-700 text-xs rounded-full mt-1 capitalize">
//                     {user?.role || 'User'}
//                   </span>
//                 </div>
//               </div>
//               <Link to="/dashboard/profile" className="block w-full text-center px-4 py-2 border border-gray-200 dark:border-dark-700 rounded-lg text-sm font-medium text-dark-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors">
//                 Edit Profile
//               </Link>
//             </motion.div>

//             {/* Stats */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.2 }}
//               className="bg-white dark:bg-dark-900 rounded-xl p-6 border border-gray-100 dark:border-dark-800"
//             >
//               <h3 className="font-semibold text-dark-900 dark:text-white mb-4 flex items-center gap-2">
//                 <TrendingUp className="w-5 h-5 text-primary-600" />
//                 Your Stats
//               </h3>
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-dark-800">
//                   <span className="text-secondary-500 flex items-center gap-2">
//                     <BookOpen className="w-4 h-4" /> Poems Read
//                   </span>
//                   <span className="font-semibold text-dark-900 dark:text-white">{poemsRead}</span>
//                 </div>
//                 <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-dark-800">
//                   <span className="text-secondary-500 flex items-center gap-2">
//                     <Heart className="w-4 h-4" /> Favorites
//                   </span>
//                   <span className="font-semibold text-dark-900 dark:text-white">{favoritesCount}</span>
//                 </div>
//                 <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-dark-800">
//                   <span className="text-secondary-500 flex items-center gap-2">
//                     <User className="w-4 h-4" /> Following
//                   </span>
//                   <span className="font-semibold text-dark-900 dark:text-white">
//                     {user?.following?.length || 0}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between py-2">
//                   <span className="text-secondary-500 flex items-center gap-2">
//                     <Calendar className="w-4 h-4" /> Member Since
//                   </span>
//                   <span className="font-semibold text-dark-900 dark:text-white">
//                     {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
//                   </span>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Subscription Card */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.3 }}
//               className={`rounded-xl p-6 text-white relative overflow-hidden bg-gradient-to-br ${getPlanColor(subscriptionPlan)}`}
//             >
//               <div className="absolute top-0 right-0 opacity-10">
//                 <Crown className="w-24 h-24" />
//               </div>
//               <h3 className="font-semibold mb-2 flex items-center gap-2">
//                 <Crown className="w-5 h-5" /> Current Plan
//               </h3>
//               <p className="text-3xl font-bold mb-1">
//                 {formatPlanName(subscriptionPlan)}
//               </p>
//               {subscriptionExpiry && (
//                 <p className="text-white/80 text-sm mb-4">
//                   Expires: {new Date(subscriptionExpiry).toLocaleDateString()}
//                 </p>
//               )}
//               <Link 
//                 to="/subscription" 
//                 className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-medium transition-all"
//               >
//                 {subscriptionPlan === 'free' ? 'Upgrade Now' : 'Manage Plan'}
//                 <ChevronRight className="w-4 h-4" />
//               </Link>
//             </motion.div>

//             {/* Quick Tip */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.4 }}
//               className="bg-gradient-to-br from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 rounded-xl p-6 border border-accent-100 dark:border-accent-800"
//             >
//               <div className="flex items-start gap-3">
//                 <div className="p-2 bg-accent-100 dark:bg-accent-900/30 rounded-lg">
//                   <MessageCircle className="w-5 h-5 text-accent-600" />
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-dark-900 dark:text-white mb-1">Daily Inspiration</h4>
//                   <p className="text-sm text-secondary-600 dark:text-secondary-400">
//                     Discover new poems every day based on your reading preferences.
//                   </p>
//                   <Link to="/explore" className="text-sm text-accent-600 hover:text-accent-700 mt-2 inline-block">
//                     Explore Now →
//                   </Link>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default UserDashboard





















// // client/src/pages/user/UserDashboard.jsx
// // LAST UPDATED: 2026-06-06
// // FIXED: Removed trendingLoading import error and added proper error handling

// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { useQuery, useQueryClient } from '@tanstack/react-query'
// import { motion } from 'framer-motion'
// import { useSelector } from 'react-redux'
// import {
//   BookOpen, Heart, Clock, Download, Bell, Settings,
//   ChevronRight, TrendingUp, Sparkles, User,
//   Crown, Calendar, MessageCircle
// } from 'lucide-react'  // ✅ REMOVED: trendingLoading from here

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

// // ============================================
// // HELPER FUNCTIONS FOR DATA EXTRACTION
// // ============================================

// const extractRecommendations = (data) => {
//   console.log('🔍 Extracting recommendations from:', data)
  
//   if (!data) return []
  
//   // Case 1: Direct array
//   if (Array.isArray(data)) {
//     console.log('📦 Direct array, length:', data.length)
//     return data
//   }
  
//   // Case 2: Data wrapper { data: [...] }
//   if (data.data) {
//     if (Array.isArray(data.data)) {
//       console.log('📦 data.data array, length:', data.data.length)
//       return data.data
//     }
//     if (data.data.recommendations && Array.isArray(data.data.recommendations)) {
//       console.log('📦 data.data.recommendations, length:', data.data.recommendations.length)
//       return data.data.recommendations
//     }
//     if (data.data.poems && Array.isArray(data.data.poems)) {
//       console.log('📦 data.data.poems, length:', data.data.poems.length)
//       return data.data.poems
//     }
//   }
  
//   // Case 3: Recommendations wrapper
//   if (data.recommendations && Array.isArray(data.recommendations)) {
//     console.log('📦 recommendations array, length:', data.recommendations.length)
//     return data.recommendations
//   }
  
//   // Case 4: Poems wrapper
//   if (data.poems && Array.isArray(data.poems)) {
//     console.log('📦 poems array, length:', data.poems.length)
//     return data.poems
//   }
  
//   // Case 5: Results wrapper
//   if (data.results && Array.isArray(data.results)) {
//     console.log('📦 results array, length:', data.results.length)
//     return data.results
//   }
  
//   // Case 6: Items wrapper
//   if (data.items && Array.isArray(data.items)) {
//     console.log('📦 items array, length:', data.items.length)
//     return data.items
//   }
  
//   console.warn('⚠️ No recommendations found in response')
//   return []
// }

// const getSafeArray = (data, fallback = []) => {
//   if (!data) return fallback
  
//   if (Array.isArray(data)) return data
  
//   if (data.data) {
//     if (Array.isArray(data.data)) return data.data
//     if (typeof data.data === 'object') {
//       for (const key in data.data) {
//         if (Array.isArray(data.data[key])) {
//           return data.data[key]
//         }
//       }
//     }
//   }
  
//   if (data.poems && Array.isArray(data.poems)) return data.poems
//   if (data.books && Array.isArray(data.books)) return data.books
//   if (data.audio && Array.isArray(data.audio)) return data.audio
//   if (data.videos && Array.isArray(data.videos)) return data.videos
//   if (data.results && Array.isArray(data.results)) return data.results
//   if (data.items && Array.isArray(data.items)) return data.items
//   if (data.recommendations && Array.isArray(data.recommendations)) return data.recommendations
  
//   if (typeof data === 'object' && !Array.isArray(data)) {
//     const values = Object.values(data)
//     if (values.length > 0 && Array.isArray(values[0])) return values[0]
//     const allArrays = values.filter(v => Array.isArray(v))
//     if (allArrays.length > 0) return allArrays.flat()
//   }
  
//   return fallback
// }

// const getHistoryItems = (data, fallback = []) => {
//   if (!data) return fallback
//   if (Array.isArray(data)) return data
//   if (data.data && Array.isArray(data.data)) return data.data
//   if (data.history && Array.isArray(data.history)) return data.history
//   if (data.readingHistory && Array.isArray(data.readingHistory)) return data.readingHistory
//   return fallback
// }

// // ============================================
// // MAIN COMPONENT
// // ============================================
// const UserDashboard = () => {
//   const { user } = useSelector(state => state.auth)
//   const queryClient = useQueryClient()

//   // ============================================
//   // DATA FETCHING
//   // ============================================

//   // Fetch favorites
//   const { data: favoritesData, isLoading: favoritesLoading, error: favoritesError } = useQuery({
//     queryKey: ['user-favorites'],
//     queryFn: async () => {
//       try {
//         const response = await userAPI.getFavorites()
//         console.log('📚 Dashboard favorites response:', response)
//         return response
//       } catch (error) {
//         console.error('Error fetching favorites:', error)
//         return { data: [] }
//       }
//     },
//     retry: 1
//   })

//   // Fetch reading history
//   const { data: historyData, isLoading: historyLoading, error: historyError } = useQuery({
//     queryKey: ['user-history'],
//     queryFn: async () => {
//       try {
//         const response = await userAPI.getHistory()
//         console.log('📖 Dashboard history response:', response)
//         return response
//       } catch (error) {
//         console.error('Error fetching history:', error)
//         return { data: [] }
//       }
//     },
//     retry: 1
//   })

//   // Fetch recommendations for "Recommended for You"
//   const { data: recommendationsData, isLoading: recommendationsLoading, error: recommendationsError } = useQuery({
//     queryKey: ['recommendations', user?._id],
//     queryFn: async () => {
//       try {
//         console.log('🎯 Fetching recommendations...')
        
//         // Try to get personalized recommendations if available
//         if (userAPI.getRecommendations) {
//           const response = await userAPI.getRecommendations()
//           console.log('🎯 Personalized recommendations response:', response)
//           if (response && extractRecommendations(response).length > 0) {
//             return response
//           }
//         }
        
//         // Fallback to trending poems
//         console.log('🎯 Falling back to trending poems...')
//         const trendingResponse = await poemAPI.getTrendingPoems()
//         console.log('🔥 Trending poems response:', trendingResponse)
        
//         if (trendingResponse) {
//           const trendingArray = getSafeArray(trendingResponse, [])
//           return { data: trendingArray }
//         }
        
//         return { data: [] }
//       } catch (error) {
//         console.error('Error fetching recommendations:', error)
//         return { data: [] }
//       }
//     },
//     retry: 2,
//     staleTime: 5 * 60 * 1000,
//   })

//   // ============================================
//   // PROCESS DATA
//   // ============================================
  
//   const favorites = getSafeArray(favoritesData, [])
//   const history = getHistoryItems(historyData, [])
//   const recommendations = extractRecommendations(recommendationsData)

//   console.log('🎯 Final recommendations array:', recommendations)
//   console.log('🎯 Recommendations count:', recommendations.length)

//   // ============================================
//   // SUBSCRIPTION HELPERS
//   // ============================================

//   const getUserSubscriptionPlan = () => {
//     if (!user) return 'free'
//     if (user.subscription) {
//       if (typeof user.subscription === 'string') return user.subscription
//       if (user.subscription.plan) {
//         if (typeof user.subscription.plan === 'string') return user.subscription.plan
//         if (typeof user.subscription.plan === 'object') return user.subscription.plan.name || 'free'
//       }
//     }
//     if (user.plan) {
//       if (typeof user.plan === 'string') return user.plan
//     }
//     return 'free'
//   }

//   const getUserSubscriptionExpiry = () => {
//     if (!user) return null
//     if (user.subscription?.expiresAt) return user.subscription.expiresAt
//     if (user.subscriptionExpiry) return user.subscriptionExpiry
//     return null
//   }

//   const getPlanColor = (plan) => {
//     const planName = String(plan).toLowerCase()
//     if (planName === 'free') return 'from-gray-600 to-gray-800'
//     if (planName === 'basic') return 'from-blue-600 to-blue-800'
//     if (planName === 'premium') return 'from-primary-600 to-accent-600'
//     if (planName === 'pro') return 'from-purple-600 to-pink-600'
//     return 'from-gray-600 to-gray-800'
//   }

//   const formatPlanName = (plan) => {
//     const planStr = String(plan)
//     return planStr.charAt(0).toUpperCase() + planStr.slice(1)
//   }

//   // ============================================
//   // CALCULATE STATS
//   // ============================================
  
//   const subscriptionPlan = getUserSubscriptionPlan()
//   const subscriptionExpiry = getUserSubscriptionExpiry()
  
//   const poemsRead = history.filter(h => 
//     h?.contentType === 'poem' || 
//     h?.type === 'poem' || 
//     h?.contentType === 'poems'
//   ).length
  
//   const favoritesCount = favorites.length

//   // ============================================
//   // LOADING STATE - ✅ FIXED: No trendingLoading
//   // ============================================
  
//   if (favoritesLoading || historyLoading || recommendationsLoading) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
//         <div className="flex items-center justify-center min-h-[60vh]">
//           <LoadingSpinner size="lg" />
//         </div>
//       </div>
//     )
//   }

//   // ============================================
//   // RENDER COMPONENT
//   // ============================================
  
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
//                 className="flex items-center gap-3 p-4 bg-white dark:bg-dark-900 rounded-xl border border-gray-100 dark:border-dark-800 hover:shadow-md transition-all hover:-translate-y-0.5"
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
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="text-xl font-bold text-dark-900 dark:text-white flex items-center gap-2">
//                     <Clock className="w-5 h-5 text-primary-600" /> Continue Reading
//                   </h2>
//                   <Link to="/dashboard/history" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors">
//                     View All <ChevronRight className="w-4 h-4" />
//                   </Link>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {history.slice(0, 4).map((item, index) => (
//                     <motion.div
//                       key={item._id || item.contentId || index}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                     >
//                       <Link to={`/${item.contentType || 'poem'}/${item.slug || item.contentId}`}>
//                         <div className="bg-white dark:bg-dark-900 rounded-xl p-4 border border-gray-100 dark:border-dark-800 hover:shadow-md transition-all hover:-translate-y-0.5">
//                           <div className="flex items-center justify-between mb-2">
//                             <p className="text-xs text-secondary-500 capitalize px-2 py-0.5 bg-gray-100 dark:bg-dark-800 rounded-full">
//                               {item.contentType || item.type || 'poem'}
//                             </p>
//                             {item.progress && (
//                               <span className="text-xs text-primary-600">{item.progress}%</span>
//                             )}
//                           </div>
//                           <p className="font-medium text-dark-900 dark:text-white line-clamp-1">
//                             {item.title || 'Untitled'}
//                           </p>
//                           {item.author?.name && (
//                             <p className="text-sm text-secondary-500 mt-1">by {item.author.name}</p>
//                           )}
//                           {item.progress && (
//                             <div className="mt-3">
//                               <div className="w-full bg-gray-200 dark:bg-dark-800 rounded-full h-1.5">
//                                 <div 
//                                   className="bg-primary-600 h-1.5 rounded-full transition-all" 
//                                   style={{ width: `${item.progress}%` }}
//                                 />
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </Link>
//                     </motion.div>
//                   ))}
//                 </div>
//               </motion.div>
//             )}

//             {/* Recommended for You */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-xl font-bold text-dark-900 dark:text-white flex items-center gap-2">
//                   <Sparkles className="w-5 h-5 text-accent-500" /> Recommended for You
//                 </h2>
//               </div>
              
//               {!recommendations || recommendations.length === 0 ? (
//                 <div className="bg-white dark:bg-dark-900 rounded-xl p-8 text-center border border-gray-100 dark:border-dark-800">
//                   <Sparkles className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
//                   <p className="text-secondary-500">No recommendations available yet.</p>
//                   <p className="text-sm text-secondary-400 mt-2">Start exploring more content to get personalized recommendations.</p>
//                   <Link to="/explore" className="inline-block mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
//                     Explore Content
//                   </Link>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {recommendations.slice(0, 4).map((item, index) => (
//                     <motion.div
//                       key={item._id || item.id || index}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                     >
//                       <ContentCard 
//                         item={item} 
//                         type={item.type || item.contentType || 'poem'} 
//                       />
//                     </motion.div>
//                   ))}
//                 </div>
//               )}
//             </motion.div>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Profile Card */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.1 }}
//               className="bg-white dark:bg-dark-900 rounded-xl p-6 border border-gray-100 dark:border-dark-800"
//             >
//               <div className="flex items-center gap-4 mb-4">
//                 <img
//                   src={user?.avatar || '/default-avatar.jpg'}
//                   alt={user?.name}
//                   className="w-16 h-16 rounded-full object-cover border-2 border-primary-100"
//                   onError={(e) => { e.target.src = '/default-avatar.jpg' }}
//                 />
//                 <div>
//                   <h3 className="font-semibold text-dark-900 dark:text-white">{user?.name}</h3>
//                   <p className="text-sm text-secondary-500">{user?.email}</p>
//                   <span className="inline-block px-2 py-0.5 bg-primary-100 text-primary-700 text-xs rounded-full mt-1 capitalize">
//                     {user?.role || 'User'}
//                   </span>
//                 </div>
//               </div>
//               <Link to="/dashboard/profile" className="block w-full text-center px-4 py-2 border border-gray-200 dark:border-dark-700 rounded-lg text-sm font-medium text-dark-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors">
//                 Edit Profile
//               </Link>
//             </motion.div>

//             {/* Stats */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.2 }}
//               className="bg-white dark:bg-dark-900 rounded-xl p-6 border border-gray-100 dark:border-dark-800"
//             >
//               <h3 className="font-semibold text-dark-900 dark:text-white mb-4 flex items-center gap-2">
//                 <TrendingUp className="w-5 h-5 text-primary-600" />
//                 Your Stats
//               </h3>
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-dark-800">
//                   <span className="text-secondary-500 flex items-center gap-2">
//                     <BookOpen className="w-4 h-4" /> Poems Read
//                   </span>
//                   <span className="font-semibold text-dark-900 dark:text-white">{poemsRead}</span>
//                 </div>
//                 <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-dark-800">
//                   <span className="text-secondary-500 flex items-center gap-2">
//                     <Heart className="w-4 h-4" /> Favorites
//                   </span>
//                   <span className="font-semibold text-dark-900 dark:text-white">{favoritesCount}</span>
//                 </div>
//                 <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-dark-800">
//                   <span className="text-secondary-500 flex items-center gap-2">
//                     <User className="w-4 h-4" /> Following
//                   </span>
//                   <span className="font-semibold text-dark-900 dark:text-white">
//                     {user?.following?.length || 0}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between py-2">
//                   <span className="text-secondary-500 flex items-center gap-2">
//                     <Calendar className="w-4 h-4" /> Member Since
//                   </span>
//                   <span className="font-semibold text-dark-900 dark:text-white">
//                     {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
//                   </span>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Subscription Card */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.3 }}
//               className={`rounded-xl p-6 text-white relative overflow-hidden bg-gradient-to-br ${getPlanColor(subscriptionPlan)}`}
//             >
//               <div className="absolute top-0 right-0 opacity-10">
//                 <Crown className="w-24 h-24" />
//               </div>
//               <h3 className="font-semibold mb-2 flex items-center gap-2">
//                 <Crown className="w-5 h-5" /> Current Plan
//               </h3>
//               <p className="text-3xl font-bold mb-1">
//                 {formatPlanName(subscriptionPlan)}
//               </p>
//               {subscriptionExpiry && (
//                 <p className="text-white/80 text-sm mb-4">
//                   Expires: {new Date(subscriptionExpiry).toLocaleDateString()}
//                 </p>
//               )}
//               <Link 
//                 to="/subscription" 
//                 className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-medium transition-all"
//               >
//                 {subscriptionPlan === 'free' ? 'Upgrade Now' : 'Manage Plan'}
//                 <ChevronRight className="w-4 h-4" />
//               </Link>
//             </motion.div>

//             {/* Quick Tip */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.4 }}
//               className="bg-gradient-to-br from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 rounded-xl p-6 border border-accent-100 dark:border-accent-800"
//             >
//               <div className="flex items-start gap-3">
//                 <div className="p-2 bg-accent-100 dark:bg-accent-900/30 rounded-lg">
//                   <MessageCircle className="w-5 h-5 text-accent-600" />
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-dark-900 dark:text-white mb-1">Daily Inspiration</h4>
//                   <p className="text-sm text-secondary-600 dark:text-secondary-400">
//                     Discover new poems every day based on your reading preferences.
//                   </p>
//                   <Link to="/explore" className="text-sm text-accent-600 hover:text-accent-700 mt-2 inline-block">
//                     Explore Now →
//                   </Link>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default UserDashboard




















// client/src/pages/user/UserDashboard.jsx
// LAST UPDATED: 2026-06-06
// FIXED: Removed trendingLoading import error and added Logout button at top-right

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import {
  BookOpen, Heart, Clock, Download, Bell, Settings,
  ChevronRight, TrendingUp, Sparkles, User,
  Crown, Calendar, MessageCircle, LogOut
} from 'lucide-react'  // ✅ Added LogOut icon

import LoadingSpinner from '../../components/common/LoadingSpinner'
import ContentCard from '../../components/common/ContentCard'
import userAPI from '../../api/userAPI'
import poemAPI from '../../api/poemAPI'
import { logout } from '../../store/slices/authSlice'
import toast from 'react-hot-toast'

const quickLinks = [
  { to: '/dashboard/favorites', icon: Heart, label: 'Favorites', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
  { to: '/dashboard/history', icon: Clock, label: 'History', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { to: '/dashboard/downloads', icon: Download, label: 'Downloads', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
  { to: '/dashboard/notifications', icon: Bell, label: 'Notifications', color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
  { to: '/dashboard/profile', icon: Settings, label: 'Settings', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
]

// ============================================
// HELPER FUNCTIONS FOR DATA EXTRACTION
// ============================================

const extractRecommendations = (data) => {
  console.log('🔍 Extracting recommendations from:', data)
  
  if (!data) return []
  
  // Case 1: Direct array
  if (Array.isArray(data)) {
    console.log('📦 Direct array, length:', data.length)
    return data
  }
  
  // Case 2: Data wrapper { data: [...] }
  if (data.data) {
    if (Array.isArray(data.data)) {
      console.log('📦 data.data array, length:', data.data.length)
      return data.data
    }
    if (data.data.recommendations && Array.isArray(data.data.recommendations)) {
      console.log('📦 data.data.recommendations, length:', data.data.recommendations.length)
      return data.data.recommendations
    }
    if (data.data.poems && Array.isArray(data.data.poems)) {
      console.log('📦 data.data.poems, length:', data.data.poems.length)
      return data.data.poems
    }
  }
  
  // Case 3: Recommendations wrapper
  if (data.recommendations && Array.isArray(data.recommendations)) {
    console.log('📦 recommendations array, length:', data.recommendations.length)
    return data.recommendations
  }
  
  // Case 4: Poems wrapper
  if (data.poems && Array.isArray(data.poems)) {
    console.log('📦 poems array, length:', data.poems.length)
    return data.poems
  }
  
  // Case 5: Results wrapper
  if (data.results && Array.isArray(data.results)) {
    console.log('📦 results array, length:', data.results.length)
    return data.results
  }
  
  // Case 6: Items wrapper
  if (data.items && Array.isArray(data.items)) {
    console.log('📦 items array, length:', data.items.length)
    return data.items
  }
  
  console.warn('⚠️ No recommendations found in response')
  return []
}

const getSafeArray = (data, fallback = []) => {
  if (!data) return fallback
  
  if (Array.isArray(data)) return data
  
  if (data.data) {
    if (Array.isArray(data.data)) return data.data
    if (typeof data.data === 'object') {
      for (const key in data.data) {
        if (Array.isArray(data.data[key])) {
          return data.data[key]
        }
      }
    }
  }
  
  if (data.poems && Array.isArray(data.poems)) return data.poems
  if (data.books && Array.isArray(data.books)) return data.books
  if (data.audio && Array.isArray(data.audio)) return data.audio
  if (data.videos && Array.isArray(data.videos)) return data.videos
  if (data.results && Array.isArray(data.results)) return data.results
  if (data.items && Array.isArray(data.items)) return data.items
  if (data.recommendations && Array.isArray(data.recommendations)) return data.recommendations
  
  if (typeof data === 'object' && !Array.isArray(data)) {
    const values = Object.values(data)
    if (values.length > 0 && Array.isArray(values[0])) return values[0]
    const allArrays = values.filter(v => Array.isArray(v))
    if (allArrays.length > 0) return allArrays.flat()
  }
  
  return fallback
}

const getHistoryItems = (data, fallback = []) => {
  if (!data) return fallback
  if (Array.isArray(data)) return data
  if (data.data && Array.isArray(data.data)) return data.data
  if (data.history && Array.isArray(data.history)) return data.history
  if (data.readingHistory && Array.isArray(data.readingHistory)) return data.readingHistory
  return fallback
}

// ============================================
// MAIN COMPONENT
// ============================================
const UserDashboard = () => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  // ============================================
  // LOGOUT HANDLER
  // ============================================
  
  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      // Call logout API
      await userAPI.logout?.()
      // Clear Redux state and localStorage
      dispatch(logout())
      toast.success('Logged out successfully')
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Error logging out')
      // Still clear local state even if API fails
      dispatch(logout())
      navigate('/login')
    } finally {
      setIsLoggingOut(false)
    }
  }

  // ============================================
  // DATA FETCHING
  // ============================================

  // Fetch favorites
  const { data: favoritesData, isLoading: favoritesLoading } = useQuery({
    queryKey: ['user-favorites'],
    queryFn: async () => {
      try {
        const response = await userAPI.getFavorites()
        console.log('📚 Dashboard favorites response:', response)
        return response
      } catch (error) {
        console.error('Error fetching favorites:', error)
        return { data: [] }
      }
    },
    retry: 1
  })

  // Fetch reading history
  const { data: historyData, isLoading: historyLoading } = useQuery({
    queryKey: ['user-history'],
    queryFn: async () => {
      try {
        const response = await userAPI.getHistory()
        console.log('📖 Dashboard history response:', response)
        return response
      } catch (error) {
        console.error('Error fetching history:', error)
        return { data: [] }
      }
    },
    retry: 1
  })

  // Fetch recommendations for "Recommended for You"
  const { data: recommendationsData, isLoading: recommendationsLoading } = useQuery({
    queryKey: ['recommendations', user?._id],
    queryFn: async () => {
      try {
        console.log('🎯 Fetching recommendations...')
        
        // Try to get personalized recommendations if available
        if (userAPI.getRecommendations) {
          const response = await userAPI.getRecommendations()
          console.log('🎯 Personalized recommendations response:', response)
          if (response && extractRecommendations(response).length > 0) {
            return response
          }
        }
        
        // Fallback to trending poems
        console.log('🎯 Falling back to trending poems...')
        const trendingResponse = await poemAPI.getTrendingPoems()
        console.log('🔥 Trending poems response:', trendingResponse)
        
        if (trendingResponse) {
          const trendingArray = getSafeArray(trendingResponse, [])
          return { data: trendingArray }
        }
        
        return { data: [] }
      } catch (error) {
        console.error('Error fetching recommendations:', error)
        return { data: [] }
      }
    },
    retry: 2,
    staleTime: 5 * 60 * 1000,
  })

  // ============================================
  // PROCESS DATA
  // ============================================
  
  const favorites = getSafeArray(favoritesData, [])
  const history = getHistoryItems(historyData, [])
  const recommendations = extractRecommendations(recommendationsData)

  console.log('🎯 Final recommendations array:', recommendations)
  console.log('🎯 Recommendations count:', recommendations.length)

  // ============================================
  // SUBSCRIPTION HELPERS
  // ============================================

  const getUserSubscriptionPlan = () => {
    if (!user) return 'free'
    if (user.subscription) {
      if (typeof user.subscription === 'string') return user.subscription
      if (user.subscription.plan) {
        if (typeof user.subscription.plan === 'string') return user.subscription.plan
        if (typeof user.subscription.plan === 'object') return user.subscription.plan.name || 'free'
      }
    }
    if (user.plan) {
      if (typeof user.plan === 'string') return user.plan
    }
    return 'free'
  }

  const getUserSubscriptionExpiry = () => {
    if (!user) return null
    if (user.subscription?.expiresAt) return user.subscription.expiresAt
    if (user.subscriptionExpiry) return user.subscriptionExpiry
    return null
  }

  const getPlanColor = (plan) => {
    const planName = String(plan).toLowerCase()
    if (planName === 'free') return 'from-gray-600 to-gray-800'
    if (planName === 'basic') return 'from-blue-600 to-blue-800'
    if (planName === 'premium') return 'from-primary-600 to-accent-600'
    if (planName === 'pro') return 'from-purple-600 to-pink-600'
    return 'from-gray-600 to-gray-800'
  }

  const formatPlanName = (plan) => {
    const planStr = String(plan)
    return planStr.charAt(0).toUpperCase() + planStr.slice(1)
  }

  // ============================================
  // CALCULATE STATS
  // ============================================
  
  const subscriptionPlan = getUserSubscriptionPlan()
  const subscriptionExpiry = getUserSubscriptionExpiry()
  
  const poemsRead = history.filter(h => 
    h?.contentType === 'poem' || 
    h?.type === 'poem' || 
    h?.contentType === 'poems'
  ).length
  
  const favoritesCount = favorites.length

  // ============================================
  // LOADING STATE - ✅ FIXED: No trendingLoading
  // ============================================
  
  if (favoritesLoading || historyLoading || recommendationsLoading) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    )
  }

  // ============================================
  // RENDER COMPONENT
  // ============================================
  
  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header with Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-wrap items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2">
              Welcome back, {user?.name?.split(' ')[0] || 'Reader'}!
            </h1>
            <p className="text-secondary-500 dark:text-secondary-400">
              Here's what's happening in your literary world.
            </p>
          </div>
          
          {/* ✅ Logout Button */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogOut className="w-4 h-4" />
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </button>
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
                className="flex items-center gap-3 p-4 bg-white dark:bg-dark-900 rounded-xl border border-gray-100 dark:border-dark-800 hover:shadow-md transition-all hover:-translate-y-0.5"
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-dark-900 dark:text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary-600" /> Continue Reading
                  </h2>
                  <Link to="/dashboard/history" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors">
                    View All <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {history.slice(0, 4).map((item, index) => (
                    <motion.div
                      key={item._id || item.contentId || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link to={`/${item.contentType || 'poem'}/${item.slug || item.contentId}`}>
                        <div className="bg-white dark:bg-dark-900 rounded-xl p-4 border border-gray-100 dark:border-dark-800 hover:shadow-md transition-all hover:-translate-y-0.5">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs text-secondary-500 capitalize px-2 py-0.5 bg-gray-100 dark:bg-dark-800 rounded-full">
                              {item.contentType || item.type || 'poem'}
                            </p>
                            {item.progress && (
                              <span className="text-xs text-primary-600">{item.progress}%</span>
                            )}
                          </div>
                          <p className="font-medium text-dark-900 dark:text-white line-clamp-1">
                            {item.title || 'Untitled'}
                          </p>
                          {item.author?.name && (
                            <p className="text-sm text-secondary-500 mt-1">by {item.author.name}</p>
                          )}
                          {item.progress && (
                            <div className="mt-3">
                              <div className="w-full bg-gray-200 dark:bg-dark-800 rounded-full h-1.5">
                                <div 
                                  className="bg-primary-600 h-1.5 rounded-full transition-all" 
                                  style={{ width: `${item.progress}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Recommended for You */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-dark-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent-500" /> Recommended for You
                </h2>
              </div>
              
              {!recommendations || recommendations.length === 0 ? (
                <div className="bg-white dark:bg-dark-900 rounded-xl p-8 text-center border border-gray-100 dark:border-dark-800">
                  <Sparkles className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <p className="text-secondary-500">No recommendations available yet.</p>
                  <p className="text-sm text-secondary-400 mt-2">Start exploring more content to get personalized recommendations.</p>
                  <Link to="/explore" className="inline-block mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    Explore Content
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {recommendations.slice(0, 4).map((item, index) => (
                    <motion.div
                      key={item._id || item.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ContentCard 
                        item={item} 
                        type={item.type || item.contentType || 'poem'} 
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar - Same as before */}
          <div className="space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-dark-900 rounded-xl p-6 border border-gray-100 dark:border-dark-800"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={user?.avatar || '/default-avatar.jpg'}
                  alt={user?.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary-100"
                  onError={(e) => { e.target.src = '/default-avatar.jpg' }}
                />
                <div>
                  <h3 className="font-semibold text-dark-900 dark:text-white">{user?.name}</h3>
                  <p className="text-sm text-secondary-500">{user?.email}</p>
                  <span className="inline-block px-2 py-0.5 bg-primary-100 text-primary-700 text-xs rounded-full mt-1 capitalize">
                    {user?.role || 'User'}
                  </span>
                </div>
              </div>
              <Link to="/dashboard/profile" className="block w-full text-center px-4 py-2 border border-gray-200 dark:border-dark-700 rounded-lg text-sm font-medium text-dark-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors">
                Edit Profile
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-dark-900 rounded-xl p-6 border border-gray-100 dark:border-dark-800"
            >
              <h3 className="font-semibold text-dark-900 dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary-600" />
                Your Stats
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-dark-800">
                  <span className="text-secondary-500 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> Poems Read
                  </span>
                  <span className="font-semibold text-dark-900 dark:text-white">{poemsRead}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-dark-800">
                  <span className="text-secondary-500 flex items-center gap-2">
                    <Heart className="w-4 h-4" /> Favorites
                  </span>
                  <span className="font-semibold text-dark-900 dark:text-white">{favoritesCount}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-dark-800">
                  <span className="text-secondary-500 flex items-center gap-2">
                    <User className="w-4 h-4" /> Following
                  </span>
                  <span className="font-semibold text-dark-900 dark:text-white">
                    {user?.following?.length || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-secondary-500 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Member Since
                  </span>
                  <span className="font-semibold text-dark-900 dark:text-white">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Subscription Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={`rounded-xl p-6 text-white relative overflow-hidden bg-gradient-to-br ${getPlanColor(subscriptionPlan)}`}
            >
              <div className="absolute top-0 right-0 opacity-10">
                <Crown className="w-24 h-24" />
              </div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Crown className="w-5 h-5" /> Current Plan
              </h3>
              <p className="text-3xl font-bold mb-1">
                {formatPlanName(subscriptionPlan)}
              </p>
              {subscriptionExpiry && (
                <p className="text-white/80 text-sm mb-4">
                  Expires: {new Date(subscriptionExpiry).toLocaleDateString()}
                </p>
              )}
              <Link 
                to="/subscription" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-medium transition-all"
              >
                {subscriptionPlan === 'free' ? 'Upgrade Now' : 'Manage Plan'}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Quick Tip */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 rounded-xl p-6 border border-accent-100 dark:border-accent-800"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-accent-100 dark:bg-accent-900/30 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-accent-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-dark-900 dark:text-white mb-1">Daily Inspiration</h4>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Discover new poems every day based on your reading preferences.
                  </p>
                  <Link to="/explore" className="text-sm text-accent-600 hover:text-accent-700 mt-2 inline-block">
                    Explore Now →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard