// client/src/components/home/TrendingSection.jsx
// import React from 'react'
// import { Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion } from 'framer-motion'
// import { TrendingUp, ArrowRight, Heart, Eye } from 'lucide-react'

// const trendingPoems = [
//   {
//     id: 1,
//     title: 'Hazaaron Khwahishein Aisi',
//     titleUr: 'ہزاروں خواہشیں ایسی',
//     author: 'Mirza Ghalib',
//     excerpt: 'Hazaaron khwahishein aisi ke har khwahish pe dam nikle...',
//     likes: 12500,
//     views: 45000,
//     image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400',
//   },
//   {
//     id: 2,
//     title: 'Gulon Mein Rang Bhare',
//     titleUr: 'گلوں میں رنگ بھرے',
//     author: 'Faiz Ahmed Faiz',
//     excerpt: 'Gulon mein rang bhare baad-e-naubahaar chale...',
//     likes: 9800,
//     views: 32000,
//     image: 'https://images.unsplash.com/photo-1490750967868-88aa4f44d55e?w=400',
//   },
//   {
//     id: 3,
//     title: 'Dil-e-Nadaan Tujhe Hua Kya Hai',
//     titleUr: 'دلِ ناداں تجھے ہوا کیا ہے',
//     author: 'Mirza Ghalib',
//     excerpt: 'Dil-e-nadaan tujhe hua kya hai...',
//     likes: 8700,
//     views: 28000,
//     image: 'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=400',
//   },
//   {
//     id: 4,
//     title: 'Aaj Bazar Mein',
//     titleUr: 'آج بازار میں',
//     author: 'Faiz Ahmed Faiz',
//     excerpt: 'Aaj bazar mein pa-bajolaan chalo...',
//     likes: 7600,
//     views: 24000,
//     image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400',
//   },
// ]

// const TrendingSection = () => {
//   const { t } = useTranslation()

//   return (
//     <section className="py-16 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center space-x-3">
//             <div className="p-2 bg-primary-100 rounded-lg">
//               <TrendingUp className="h-6 w-6 text-primary-600" />
//             </div>
//             <div>
//               <h2 className="section-title mb-0">{t('home.trendingPoems')}</h2>
//               <p className="text-gray-500 text-sm">Most loved by our community</p>
//             </div>
//           </div>
//           <Link
//             to="/poetry"
//             className="hidden sm:flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-medium"
//           >
//             <span>{t('common.viewAll')}</span>
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {trendingPoems.map((poem, index) => (
//             <motion.div
//               key={poem.id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               viewport={{ once: true }}
//             >
//               <Link to={`/poetry/${poem.id}`} className="card block overflow-hidden group">
//                 <div className="relative h-48 overflow-hidden">
//                   <img
//                     src={poem.image}
//                     alt={poem.title}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                   <div className="absolute bottom-3 left-3 right-3">
//                     <p className="text-white font-medium text-sm">{poem.author}</p>
//                   </div>
//                 </div>
//                 <div className="p-4">
//                   <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
//                     {poem.title}
//                   </h3>
//                   <p className="urdu-text text-gray-600 text-sm mb-3">{poem.titleUr}</p>
//                   <p className="text-gray-500 text-sm line-clamp-2 mb-3">{poem.excerpt}</p>
//                   <div className="flex items-center justify-between text-sm text-gray-500">
//                     <span className="flex items-center space-x-1">
//                       <Heart className="h-4 w-4 text-red-500" />
//                       <span>{poem.likes.toLocaleString()}</span>
//                     </span>
//                     <span className="flex items-center space-x-1">
//                       <Eye className="h-4 w-4" />
//                       <span>{poem.views.toLocaleString()}</span>
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>

//         <div className="mt-6 text-center sm:hidden">
//           <Link to="/poetry" className="btn-outline inline-flex items-center space-x-2">
//             <span>{t('common.viewAll')}</span>
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default TrendingSection









// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion } from 'framer-motion'
// import { TrendingUp, ArrowRight, Heart, Eye } from 'lucide-react'
// import poemAPI from '../../api/poemAPI'

// const TrendingSection = () => {
//   const { t } = useTranslation()
//   const [trendingPoems, setTrendingPoems] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     fetchTrendingPoems()
//   }, [])

//   const fetchTrendingPoems = async () => {
//     try {
//       setLoading(true)
//       const response = await poemAPI.getTrendingPoems()
//       // Handle both direct array response and response with data property
//       const poems = response.data?.data || response.data || response
//       setTrendingPoems(Array.isArray(poems) ? poems : [])
//       setError(null)
//     } catch (err) {
//       console.error('Error fetching trending poems:', err)
//       setError(t('common.errorLoading'))
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Loading skeleton
//   if (loading) {
//     return (
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between mb-8">
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-primary-100 rounded-lg">
//                 <TrendingUp className="h-6 w-6 text-primary-600" />
//               </div>
//               <div>
//                 <h2 className="section-title mb-0">{t('home.trendingPoems')}</h2>
//                 <p className="text-gray-500 text-sm">Most loved by our community</p>
//               </div>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="card animate-pulse">
//                 <div className="h-48 bg-gray-200 rounded-t-lg" />
//                 <div className="p-4">
//                   <div className="h-5 bg-gray-200 rounded mb-2" />
//                   <div className="h-4 bg-gray-200 rounded mb-3 w-3/4" />
//                   <div className="h-4 bg-gray-200 rounded mb-3" />
//                   <div className="h-4 bg-gray-200 rounded w-1/2" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     )
//   }

//   // Error state
//   if (error) {
//     return (
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center py-12">
//             <p className="text-red-500">{error}</p>
//             <button 
//               onClick={fetchTrendingPoems}
//               className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
//             >
//               {t('common.retry')}
//             </button>
//           </div>
//         </div>
//       </section>
//     )
//   }

//   // No data state
//   if (!trendingPoems.length) {
//     return null
//   }

//   // Main render with all trending poems
//   return (
//     <section className="py-16 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Header Section */}
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center space-x-3">
//             <div className="p-2 bg-primary-100 rounded-lg">
//               <TrendingUp className="h-6 w-6 text-primary-600" />
//             </div>
//             <div>
//               <h2 className="section-title mb-0">{t('home.trendingPoems')}</h2>
//               <p className="text-gray-500 text-sm">Most loved by our community</p>
//             </div>
//           </div>
//           <Link
//             to="/poetry"
//             className="hidden sm:flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-medium"
//           >
//             <span>{t('common.viewAll')}</span>
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>

//         {/* Poems Grid - Shows ALL poems from API */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {trendingPoems.slice(0,4).map((poem, index) => (    ///To limit to 4 poems (if needed):
//             <motion.div
//               key={poem.id || poem._id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               viewport={{ once: true }}
//             >
//               <Link 
//                 to={`/poetry/${poem.slug || poem.id}`} 
//                 className="card block overflow-hidden group"
//               >
//                 {/* Image Section */}
//                 <div className="relative h-48 overflow-hidden">
//                   <img
//                     src={poem.image || poem.coverImage || 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400'}
//                     alt={poem.title}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                     onError={(e) => {
//                       e.target.src = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400'
//                     }}
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                   <div className="absolute bottom-3 left-3 right-3">
//                     <p className="text-white font-medium text-sm">
//                       {poem.author?.name || poem.author}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Content Section */}
//                 <div className="p-4">
//                   <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors line-clamp-1">
//                     {poem.title}
//                   </h3>
//                   <p className="urdu-text text-gray-600 text-sm mb-3 line-clamp-1">
//                     {poem.titleUr || poem.titleTranslation?.ur || ''}
//                   </p>
//                   <p className="text-gray-500 text-sm line-clamp-2 mb-3">
//                     {poem.excerpt || (poem.content?.substring(0, 100) + '...') || ''}
//                   </p>

//                   {/* Stats Section */}
//                   <div className="flex items-center justify-between text-sm text-gray-500">
//                     <span className="flex items-center space-x-1">
//                       <Heart className="h-4 w-4 text-red-500" />
//                       <span>{(poem.likes || poem.likeCount || 0).toLocaleString()}</span>
//                     </span>
//                     <span className="flex items-center space-x-1">
//                       <Eye className="h-4 w-4" />
//                       <span>{(poem.views || poem.viewCount || 0).toLocaleString()}</span>
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>

//         {/* Mobile View All Button */}
//         <div className="mt-6 text-center sm:hidden">
//           <Link 
//             to="/poetry" 
//             className="inline-flex items-center space-x-2 px-6 py-2 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
//           >
//             <span>{t('common.viewAll')}</span>
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>

//         {/* Optional: Show count of poems */}
//         <div className="mt-8 text-center text-sm text-gray-500">
//           Showing {trendingPoems.length} trending {trendingPoems.length === 1 ? 'poem' : 'poems'}
//         </div>
//       </div>
//     </section>
//   )
// }

// export default TrendingSection








// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion } from 'framer-motion'
// import { TrendingUp, ArrowRight, Heart, Eye } from 'lucide-react'
// import poemAPI from '../../api/poemAPI'

// const TrendingSection = () => {
//   const { t } = useTranslation()
//   const [trendingPoems, setTrendingPoems] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     fetchTrendingPoems()
//   }, [])

//   const fetchTrendingPoems = async () => {
//     try {
//       setLoading(true)
//       const response = await poemAPI.getTrendingPoems()
//       const poems = response.data?.data || response.data || response
//       setTrendingPoems(Array.isArray(poems) ? poems : [])
//       setError(null)
//     } catch (err) {
//       console.error('Error fetching trending poems:', err)
//       setError(t('common.errorLoading'))
//     } finally {
//       setLoading(false)
//     }
//   }

//   // 🔥 PREMIUM LOADER
//   if (loading) {
//     return (
//       <section className="py-20 bg-gradient-to-b from-white to-gray-50">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex items-center gap-3 mb-10">
//             <div className="p-3 bg-primary-100 rounded-xl">
//               <TrendingUp className="h-6 w-6 text-primary-600" />
//             </div>
//             <div>
//               <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
//               <div className="h-4 w-56 bg-gray-200 rounded mt-2 animate-pulse" />
//             </div>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {[1,2,3,4].map(i => (
//               <div key={i} className="rounded-2xl overflow-hidden bg-white/70 backdrop-blur-lg shadow-lg animate-pulse">
//                 <div className="h-52 bg-gray-200" />
//                 <div className="p-5 space-y-3">
//                   <div className="h-4 bg-gray-200 rounded w-3/4" />
//                   <div className="h-3 bg-gray-200 rounded w-1/2" />
//                   <div className="h-3 bg-gray-200 rounded w-full" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     )
//   }

//   // ❌ ERROR
//   if (error) {
//     return (
//       <section className="py-20">
//         <div className="text-center">
//           <p className="text-red-500">{error}</p>
//           <button
//             onClick={fetchTrendingPoems}
//             className="mt-4 px-5 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition"
//           >
//             {t('common.retry')}
//           </button>
//         </div>
//       </section>
//     )
//   }

//   if (!trendingPoems.length) return null

//   // ✅ MAIN UI
//   return (
//     <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white">

//       <div className="max-w-7xl mx-auto px-6">

//         {/* HEADER */}
//         <div className="flex items-center justify-between mb-12">
//           <div className="flex items-center gap-4">
//             <div className="p-3 rounded-xl bg-gradient-to-r from-primary-500 to-indigo-500 shadow-md">
//               <TrendingUp className="h-6 w-6 text-white" />
//             </div>

//             <div>
//               <h2 className="text-3xl font-bold text-gray-900">
//                 {t('home.trendingPoems')}
//               </h2>
//               <p className="text-gray-500 text-sm">
//                 Most loved by our community
//               </p>
//             </div>
//           </div>

//           <Link
//             to="/poetry"
//             className="hidden sm:flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
//           >
//             {t('common.viewAll')} <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>

//         {/* CARDS */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {trendingPoems.slice(0,4).map((poem, index) => (
//             <motion.div
//               key={poem.id || poem._id}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               viewport={{ once: true }}
//             >
//               <Link
//                 to={`/poetry/${poem.slug || poem.id}`}
//                 className="group block rounded-2xl overflow-hidden relative"
//               >

//                 {/* IMAGE */}
//                 <div className="relative h-56 overflow-hidden rounded-2xl">
//                   <img
//                     src={poem.image || poem.coverImage || 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400'}
//                     alt={poem.title}
//                     className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
//                     onError={(e) => {
//                       e.target.src = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400'
//                     }}
//                   />

//                   {/* PREMIUM OVERLAY */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90" />

//                   {/* AUTHOR */}
//                   <div className="absolute bottom-4 left-4 right-4 text-white">
//                     <p className="text-sm opacity-80">
//                       {poem.author?.name || poem.author}
//                     </p>
//                   </div>
//                 </div>

//                 {/* GLASS CARD */}
//                 <div className="relative -mt-12 mx-4 p-5 rounded-2xl bg-white/80 backdrop-blur-lg shadow-xl border border-white/40 group-hover:-translate-y-1 transition">

//                   <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition line-clamp-1">
//                     {poem.title}
//                   </h3>

//                   <p className="urdu-text text-gray-600 text-sm mt-1 line-clamp-1">
//                     {poem.titleUr || poem.titleTranslation?.ur || ''}
//                   </p>

//                   <p className="text-gray-500 text-sm mt-2 line-clamp-2">
//                     {poem.excerpt || (poem.content?.substring(0, 100) + '...') || ''}
//                   </p>

//                   {/* STATS */}
//                   <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
//                     <span className="flex items-center gap-1">
//                       <Heart className="h-4 w-4 text-red-500" />
//                       {(poem.likes || poem.likeCount || 0).toLocaleString()}
//                     </span>

//                     <span className="flex items-center gap-1">
//                       <Eye className="h-4 w-4" />
//                       {(poem.views || poem.viewCount || 0).toLocaleString()}
//                     </span>
//                   </div>

//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>

//         {/* MOBILE BUTTON */}
//         <div className="mt-10 text-center sm:hidden">
//           <Link
//             to="/poetry"
//             className="inline-flex items-center gap-2 px-6 py-2 border-2 border-primary-600 text-primary-600 rounded-full hover:bg-primary-50 transition"
//           >
//             {t('common.viewAll')} <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>

//         {/* COUNT */}
//         <div className="mt-10 text-center text-sm text-gray-400">
//           Showing {trendingPoems.length} trending {trendingPoems.length === 1 ? 'poem' : 'poems'}
//         </div>

//       </div>
//     </section>
//   )
// }

// export default TrendingSection














// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion } from 'framer-motion'
// import { TrendingUp, ArrowRight, Heart, Eye } from 'lucide-react'
// import poemAPI from '../../api/poemAPI'

// const TrendingSection = () => {
//   const { t } = useTranslation()
//   const [trendingPoems, setTrendingPoems] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     fetchTrendingPoems()
//   }, [])

//   const fetchTrendingPoems = async () => {
//     try {
//       setLoading(true)
//       const response = await poemAPI.getTrendingPoems()
//       const poems = response.data?.data || response.data || response
//       setTrendingPoems(Array.isArray(poems) ? poems : [])
//       setError(null)
//     } catch (err) {
//       console.error('Error fetching trending poems:', err)
//       setError(t('common.errorLoading'))
//     } finally {
//       setLoading(false)
//     }
//   }

//   // 🌈 COLORFUL LOADER
//   if (loading) {
//     return (
//       <section className="py-20 bg-gradient-to-br from-primary-50 via-pink-50 to-purple-50">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex items-center gap-3 mb-10">
//             <div className="p-3 bg-gradient-to-r from-primary-500 to-pink-500 rounded-xl animate-pulse" />
//             <div>
//               <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
//               <div className="h-4 w-56 bg-gray-200 rounded mt-2 animate-pulse" />
//             </div>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {[1,2,3,4].map(i => (
//               <div key={i} className="rounded-3xl overflow-hidden bg-white/60 backdrop-blur-lg shadow-xl animate-pulse">
//                 <div className="h-52 bg-gradient-to-r from-pink-100 to-purple-100" />
//                 <div className="p-5 space-y-3">
//                   <div className="h-4 bg-gray-200 rounded w-3/4" />
//                   <div className="h-3 bg-gray-200 rounded w-1/2" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     )
//   }

//   if (error) {
//     return (
//       <section className="py-20 text-center">
//         <p className="text-red-500">{error}</p>
//         <button
//           onClick={fetchTrendingPoems}
//           className="mt-4 px-5 py-2 rounded-full bg-gradient-to-r from-primary-500 to-pink-500 text-white"
//         >
//           {t('common.retry')}
//         </button>
//       </section>
//     )
//   }

//   if (!trendingPoems.length) return null

//   return (
//     <section className="py-24 relative overflow-hidden">

//       {/* 🌈 Background Glow */}
//       <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-pink-50 to-purple-50" />
//       <div className="absolute -top-32 left-0 w-96 h-96 bg-pink-300 opacity-20 blur-3xl rounded-full" />
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 opacity-20 blur-3xl rounded-full" />

//       <div className="relative max-w-7xl mx-auto px-6">

//         {/* HEADER */}
//         <div className="flex items-center justify-between mb-14">
//           <div className="flex items-center gap-4">
//             <div className="p-3 rounded-xl bg-gradient-to-r from-primary-500 via-pink-500 to-purple-500 shadow-lg">
//               <TrendingUp className="h-6 w-6 text-white" />
//             </div>

//             <div>
//               <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 via-pink-500 to-purple-500 bg-clip-text text-transparent">
//                 {t('home.trendingPoems')}
//               </h2>
//               <p className="text-gray-500 text-sm">
//                 Most loved poetry by our community ❤️
//               </p>
//             </div>
//           </div>

//           <Link
//             to="/poetry"
//             className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md hover:shadow-lg transition"
//           >
//             {t('common.viewAll')}
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>

//         {/* CARDS */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

//           {trendingPoems.slice(0,4).map((poem, index) => (
//             <motion.div
//               key={poem.id || poem._id}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//             >
//               <Link
//                 to={`/poetry/${poem.slug || poem.id}`}
//                 className="group block relative rounded-3xl overflow-hidden"
//               >

//                 {/* 🌈 Gradient Border */}
//                 <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 blur-lg transition" />

//                 <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl group-hover:-translate-y-2 transition duration-500">

//                   {/* IMAGE */}
//                   <div className="relative h-56 overflow-hidden">
//                     <img
//                       src={poem.image || poem.coverImage || 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400'}
//                       alt={poem.title}
//                       className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
//                     />

//                     {/* 🎨 Poetry Overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-pink-500/20 to-transparent" />

//                     {/* AUTHOR */}
//                     <div className="absolute bottom-4 left-4 right-4 text-white">
//                       <p className="text-sm opacity-90">
//                         {poem.author?.name || poem.author}
//                       </p>
//                     </div>
//                   </div>

//                   {/* CONTENT */}
//                   <div className="p-5">
//                     <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition line-clamp-1">
//                       {poem.title}
//                     </h3>

//                     <p className="urdu-text text-gray-600 text-sm mt-1 line-clamp-1">
//                       {poem.titleUr || poem.titleTranslation?.ur || ''}
//                     </p>

//                     <p className="text-gray-500 text-sm mt-2 line-clamp-2">
//                       {poem.excerpt || (poem.content?.substring(0, 100) + '...') || ''}
//                     </p>

//                     {/* STATS */}
//                     <div className="flex items-center justify-between mt-4 text-sm">
//                       <span className="flex items-center gap-1 text-pink-500">
//                         <Heart className="h-4 w-4" />
//                         {(poem.likes || poem.likeCount || 0).toLocaleString()}
//                       </span>

//                       <span className="flex items-center gap-1 text-purple-500">
//                         <Eye className="h-4 w-4" />
//                         {(poem.views || poem.viewCount || 0).toLocaleString()}
//                       </span>
//                     </div>

//                   </div>

//                 </div>
//               </Link>
//             </motion.div>
//           ))}

//         </div>

//         {/* MOBILE BUTTON */}
//         <div className="mt-12 text-center sm:hidden">
//           <Link
//             to="/poetry"
//             className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-primary-500 to-pink-500 text-white shadow-lg"
//           >
//             {t('common.viewAll')}
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>

//         {/* COUNT */}
//         <div className="mt-10 text-center text-sm text-gray-500">
//           Showing {trendingPoems.length} trending {trendingPoems.length === 1 ? 'poem' : 'poems'}
//         </div>

//       </div>
//     </section>
//   )
// }

// export default TrendingSection











// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion } from 'framer-motion'
// import { TrendingUp, ArrowRight, Heart, Eye, Sparkles, Flame } from 'lucide-react'
// import poemAPI from '../../api/poemAPI'

// // Beautiful poem-specific images (different for each)
// const poemImages = [
//   'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600',
//   'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600',
//   'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=600',
//   'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600'
// ]

// const TrendingSection = () => {
//   const { t } = useTranslation()
//   const [trendingPoems, setTrendingPoems] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     fetchTrendingPoems()
//   }, [])

//   const fetchTrendingPoems = async () => {
//     try {
//       setLoading(true)
//       const response = await poemAPI.getTrendingPoems()
//       const poems = response.data?.data || response.data || response
//       setTrendingPoems(Array.isArray(poems) ? poems.slice(0, 4) : [])
//       setError(null)
//     } catch (err) {
//       console.error('Error fetching trending poems:', err)
//       setError(t('common.errorLoading'))
//     } finally {
//       setLoading(false)
//     }
//   }

//   const getPoemImage = (index) => {
//     return poemImages[index % poemImages.length]
//   }

//   const formatNumber = (num) => {
//     if (!num) return '0'
//     if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
//     if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
//     return num.toString()
//   }

//   if (loading) {
//     return (
//       <section className="py-20 bg-gradient-to-br from-amber-50 via-pink-50 to-purple-50">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex items-center gap-3 mb-10">
//             <div className="p-3 bg-gradient-to-r from-amber-500 to-pink-500 rounded-xl animate-pulse" />
//             <div>
//               <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
//               <div className="h-4 w-56 bg-gray-200 rounded mt-2 animate-pulse" />
//             </div>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="rounded-3xl overflow-hidden bg-white/60 backdrop-blur-lg shadow-xl animate-pulse">
//                 <div className="h-64 bg-gradient-to-r from-amber-100 via-pink-100 to-purple-100" />
//                 <div className="p-5 space-y-3">
//                   <div className="h-5 bg-gray-200 rounded w-3/4" />
//                   <div className="h-4 bg-gray-200 rounded w-1/2" />
//                   <div className="h-3 bg-gray-200 rounded w-full" />
//                   <div className="flex justify-between pt-2">
//                     <div className="h-4 bg-pink-200 rounded w-16" />
//                     <div className="h-4 bg-purple-200 rounded w-16" />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     )
//   }

//   if (error) {
//     return (
//       <section className="py-20 text-center bg-gradient-to-br from-amber-50 to-pink-50">
//         <p className="text-red-500">{error}</p>
//         <button
//           onClick={fetchTrendingPoems}
//           className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition"
//         >
//           {t('common.retry')}
//         </button>
//       </section>
//     )
//   }

//   if (!trendingPoems.length) return null

//   return (
//     <section className="py-24 relative overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-pink-50 to-purple-50" />
      
//       <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300 opacity-20 blur-3xl rounded-full animate-pulse" />
//       <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300 opacity-20 blur-3xl rounded-full animate-pulse" />
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-300 opacity-10 blur-3xl rounded-full animate-pulse" />

//       <div className="relative max-w-7xl mx-auto px-6">
//         <div className="flex items-center justify-between mb-14">
//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-pink-500 to-purple-500 rounded-2xl blur-lg animate-pulse" />
//               <div className="relative p-3 rounded-2xl bg-gradient-to-r from-amber-500 via-pink-500 to-purple-500 shadow-xl">
//                 <TrendingUp className="h-7 w-7 text-white" />
//               </div>
//             </div>

//             <div>
//               <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
//                 {t('home.trendingPoems')}
//               </h2>
//               <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
//                 <Sparkles className="h-3 w-3 text-amber-500" />
//                 Most loved poetry by our community
//                 <Sparkles className="h-3 w-3 text-pink-500" />
//               </p>
//             </div>
//           </div>

//           <Link
//             to="/poetry"
//             className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:shadow-xl transition-all hover:scale-105 group border border-amber-200"
//           >
//             <span className="bg-gradient-to-r from-amber-600 to-pink-600 bg-clip-text text-transparent font-medium">
//               {t('common.viewAll')}
//             </span>
//             <ArrowRight className="h-4 w-4 text-pink-500 group-hover:translate-x-1 transition" />
//           </Link>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {trendingPoems.map((poem, index) => {
//             const poemImage = getPoemImage(index)
            
//             return (
//               <motion.div
//                 key={poem.id || poem._id}
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 whileHover={{ y: -8 }}
//               >
//                 <Link
//                   to={`/poetry/${poem.slug || poem.id}`}
//                   className="group block relative"
//                 >
//                   <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-pink-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
                  
//                   <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500">
//                     <div className="relative h-64 overflow-hidden">
//                       <img
//                         src={poemImage}
//                         alt={poem.title}
//                         className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out"
//                       />
                      
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
//                       <div className="absolute top-4 right-4">
//                         <div className="bg-gradient-to-r from-amber-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
//                           <Flame className="h-3 w-3" />
//                           Trending #{index + 1}
//                         </div>
//                       </div>

//                       <div className="absolute top-4 left-4">
//                         <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
//                           <Heart className="h-3 w-3 text-pink-400 fill-pink-400" />
//                           {formatNumber(poem.likes || poem.likeCount || 0)}
//                         </div>
//                       </div>

//                       <div className="absolute bottom-4 left-4 right-4">
//                         <p className="text-white/90 text-sm font-medium flex items-center gap-2">
//                           <span className="w-6 h-px bg-gradient-to-r from-amber-400 to-transparent" />
//                           {poem.author?.name || poem.author}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="p-5">
//                       <h3 className="font-bold text-lg text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-amber-600 group-hover:to-pink-600 group-hover:bg-clip-text transition line-clamp-1">
//                         {poem.title}
//                       </h3>

//                       <p className="urdu-text text-gray-500 text-sm mt-1 line-clamp-1">
//                         {poem.titleUr || poem.titleTranslation?.ur || ''}
//                       </p>

//                       <div className="relative mt-3 pt-2">
//                         <div className="absolute -top-1 left-0 text-2xl text-amber-300 opacity-50">"</div>
//                         <p className="text-gray-600 text-sm pl-4 line-clamp-2 italic">
//                           {poem.excerpt || (poem.content?.substring(0, 80) + '...') || ''}
//                         </p>
//                       </div>

//                       <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
//                         <div className="flex items-center gap-3">
//                           <span className="flex items-center gap-1.5 text-pink-500 group-hover:scale-105 transition">
//                             <Heart className="h-4 w-4 fill-pink-500/20" />
//                             <span className="text-sm font-medium">{formatNumber(poem.likes || poem.likeCount || 0)}</span>
//                           </span>
                          
//                           <span className="flex items-center gap-1.5 text-purple-500 group-hover:scale-105 transition">
//                             <Eye className="h-4 w-4" />
//                             <span className="text-sm font-medium">{formatNumber(poem.views || poem.viewCount || 0)}</span>
//                           </span>
//                         </div>

//                         <div className="flex items-center gap-1 text-xs text-amber-500 opacity-0 group-hover:opacity-100 transition">
//                           <span>Read</span>
//                           <ArrowRight className="h-3 w-3" />
//                         </div>
//                       </div>

//                       <div className="mt-3 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent w-0 group-hover:w-full transition-all duration-700" />
//                     </div>
//                   </div>
//                 </Link>
//               </motion.div>
//             )
//           })}
//         </div>

//         <div className="mt-12 text-center sm:hidden">
//           <Link
//             to="/poetry"
//             className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 via-pink-500 to-purple-500 text-white shadow-xl hover:shadow-2xl transition-all hover:scale-105"
//           >
//             <span className="font-semibold">{t('common.viewAll')}</span>
//             <ArrowRight className="h-5 w-5" />
//           </Link>
//         </div>

//         <div className="mt-12 text-center">
//           <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-amber-200">
//             <Sparkles className="h-4 w-4 text-amber-500" />
//             <span className="text-sm text-gray-600">
//               Showing {trendingPoems.length} trending {trendingPoems.length === 1 ? 'poem' : 'poems'}
//             </span>
//             <Sparkles className="h-4 w-4 text-pink-500" />
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default TrendingSection


















// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion } from 'framer-motion'
// import { TrendingUp, ArrowRight, Heart, Eye, Sparkles, Flame } from 'lucide-react'
// import poemAPI from '../../api/poemAPI'

// // Beautiful poem-specific images (different for each)
// const poemImages = [
//   'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600',
//   'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600',
//   'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=600',
//   'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600'
// ]

// const TrendingSection = () => {
//   const { t } = useTranslation()
//   const [trendingPoems, setTrendingPoems] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     fetchTrendingPoems()
//   }, [])

//   const fetchTrendingPoems = async () => {
//     try {
//       setLoading(true)
//       const response = await poemAPI.getTrendingPoems()
//       const poems = response.data?.data || response.data || response
//       setTrendingPoems(Array.isArray(poems) ? poems.slice(0, 4) : [])
//       setError(null)
//     } catch (err) {
//       console.error('Error fetching trending poems:', err)
//       setError(t('common.errorLoading'))
//     } finally {
//       setLoading(false)
//     }
//   }

//   const getPoemImage = (index) => {
//     return poemImages[index % poemImages.length]
//   }

//   const formatNumber = (num) => {
//     if (!num) return '0'
//     if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
//     if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
//     return num.toString()
//   }

//   // Function to get correct poem URL based on routes in App.jsx
//   const getPoemUrl = (poem) => {
//     // Your route is "/poem/:slug" not "/poetry/:slug"
//     if (poem.slug) {
//       return `/poem/${poem.slug}`  // ✅ FIXED: Changed from /poetry/ to /poem/
//     }
//     if (poem.id || poem._id) {
//       return `/poem/${poem.id || poem._id}`
//     }
//     return '/poetry'
//   }

//   if (loading) {
//     return (
//       <section className="py-20 bg-gradient-to-br from-amber-50 via-pink-50 to-purple-50">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex items-center gap-3 mb-10">
//             <div className="p-3 bg-gradient-to-r from-amber-500 to-pink-500 rounded-xl animate-pulse" />
//             <div>
//               <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
//               <div className="h-4 w-56 bg-gray-200 rounded mt-2 animate-pulse" />
//             </div>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="rounded-3xl overflow-hidden bg-white/60 backdrop-blur-lg shadow-xl animate-pulse">
//                 <div className="h-64 bg-gradient-to-r from-amber-100 via-pink-100 to-purple-100" />
//                 <div className="p-5 space-y-3">
//                   <div className="h-5 bg-gray-200 rounded w-3/4" />
//                   <div className="h-4 bg-gray-200 rounded w-1/2" />
//                   <div className="h-3 bg-gray-200 rounded w-full" />
//                   <div className="flex justify-between pt-2">
//                     <div className="h-4 bg-pink-200 rounded w-16" />
//                     <div className="h-4 bg-purple-200 rounded w-16" />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     )
//   }

//   if (error) {
//     return (
//       <section className="py-20 text-center bg-gradient-to-br from-amber-50 to-pink-50">
//         <p className="text-red-500">{error}</p>
//         <button
//           onClick={fetchTrendingPoems}
//           className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition"
//         >
//           {t('common.retry')}
//         </button>
//       </section>
//     )
//   }

//   if (!trendingPoems.length) return null

//   return (
//     <section className="py-24 relative overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-pink-50 to-purple-50" />
      
//       <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300 opacity-20 blur-3xl rounded-full animate-pulse" />
//       <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300 opacity-20 blur-3xl rounded-full animate-pulse" />
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-300 opacity-10 blur-3xl rounded-full animate-pulse" />

//       <div className="relative max-w-7xl mx-auto px-6">
//         <div className="flex items-center justify-between mb-14">
//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-pink-500 to-purple-500 rounded-2xl blur-lg animate-pulse" />
//               <div className="relative p-3 rounded-2xl bg-gradient-to-r from-amber-500 via-pink-500 to-purple-500 shadow-xl">
//                 <TrendingUp className="h-7 w-7 text-white" />
//               </div>
//             </div>

//             <div>
//               <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
//                 {t('home.trendingPoems')}
//               </h2>
//               <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
//                 <Sparkles className="h-3 w-3 text-amber-500" />
//                 Most loved poetry by our community
//                 <Sparkles className="h-3 w-3 text-pink-500" />
//               </p>
//             </div>
//           </div>

//           <Link
//             to="/poetry"
//             className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:shadow-xl transition-all hover:scale-105 group border border-amber-200"
//           >
//             <span className="bg-gradient-to-r from-amber-600 to-pink-600 bg-clip-text text-transparent font-medium">
//               {t('common.viewAll')}
//             </span>
//             <ArrowRight className="h-4 w-4 text-pink-500 group-hover:translate-x-1 transition" />
//           </Link>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {trendingPoems.map((poem, index) => {
//             const poemImage = getPoemImage(index)
//             const poemUrl = getPoemUrl(poem)
            
//             return (
//               <motion.div
//                 key={poem.id || poem._id}
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 whileHover={{ y: -8 }}
//               >
//                 <Link
//                   to={poemUrl}
//                   className="group block relative"
//                 >
//                   <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-pink-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
                  
//                   <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500">
//                     <div className="relative h-64 overflow-hidden">
//                       <img
//                         src={poemImage}
//                         alt={poem.title}
//                         className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out"
//                       />
                      
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
//                       <div className="absolute top-4 right-4">
//                         <div className="bg-gradient-to-r from-amber-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
//                           <Flame className="h-3 w-3" />
//                           Trending #{index + 1}
//                         </div>
//                       </div>

//                       <div className="absolute top-4 left-4">
//                         <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
//                           <Heart className="h-3 w-3 text-pink-400 fill-pink-400" />
//                           {formatNumber(poem.likes || poem.likeCount || 0)}
//                         </div>
//                       </div>

//                       <div className="absolute bottom-4 left-4 right-4">
//                         <p className="text-white/90 text-sm font-medium flex items-center gap-2">
//                           <span className="w-6 h-px bg-gradient-to-r from-amber-400 to-transparent" />
//                           {poem.author?.name || poem.author}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="p-5">
//                       <h3 className="font-bold text-lg text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-amber-600 group-hover:to-pink-600 group-hover:bg-clip-text transition line-clamp-1">
//                         {poem.title}
//                       </h3>

//                       <p className="urdu-text text-gray-500 text-sm mt-1 line-clamp-1">
//                         {poem.titleUr || poem.titleTranslation?.ur || ''}
//                       </p>

//                       <div className="relative mt-3 pt-2">
//                         <div className="absolute -top-1 left-0 text-2xl text-amber-300 opacity-50">"</div>
//                         <p className="text-gray-600 text-sm pl-4 line-clamp-2 italic">
//                           {poem.excerpt || (poem.content?.substring(0, 80) + '...') || ''}
//                         </p>
//                       </div>

//                       <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
//                         <div className="flex items-center gap-3">
//                           <span className="flex items-center gap-1.5 text-pink-500 group-hover:scale-105 transition">
//                             <Heart className="h-4 w-4 fill-pink-500/20" />
//                             <span className="text-sm font-medium">{formatNumber(poem.likes || poem.likeCount || 0)}</span>
//                           </span>
                          
//                           <span className="flex items-center gap-1.5 text-purple-500 group-hover:scale-105 transition">
//                             <Eye className="h-4 w-4" />
//                             <span className="text-sm font-medium">{formatNumber(poem.views || poem.viewCount || 0)}</span>
//                           </span>
//                         </div>

//                         <div className="flex items-center gap-1 text-xs text-amber-500 opacity-0 group-hover:opacity-100 transition">
//                           <span>Read</span>
//                           <ArrowRight className="h-3 w-3" />
//                         </div>
//                       </div>

//                       <div className="mt-3 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent w-0 group-hover:w-full transition-all duration-700" />
//                     </div>
//                   </div>
//                 </Link>
//               </motion.div>
//             )
//           })}
//         </div>

//         <div className="mt-12 text-center sm:hidden">
//           <Link
//             to="/poetry"
//             className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 via-pink-500 to-purple-500 text-white shadow-xl hover:shadow-2xl transition-all hover:scale-105"
//           >
//             <span className="font-semibold">{t('common.viewAll')}</span>
//             <ArrowRight className="h-5 w-5" />
//           </Link>
//         </div>

//         <div className="mt-12 text-center">
//           <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-amber-200">
//             <Sparkles className="h-4 w-4 text-amber-500" />
//             <span className="text-sm text-gray-600">
//               Showing {trendingPoems.length} trending {trendingPoems.length === 1 ? 'poem' : 'poems'}
//             </span>
//             <Sparkles className="h-4 w-4 text-pink-500" />
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default TrendingSection

















// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion } from 'framer-motion'
// import { TrendingUp, ArrowRight, Heart, Eye, Sparkles, Flame } from 'lucide-react'
// import poemAPI from '../../api/poemAPI'

// // Beautiful poem-specific images (different for each)
// const poemImages = [
//   'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600',
//   'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600',
//   'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=600',
//   'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600'
// ]

// const TrendingSection = () => {
//   const { t } = useTranslation()
//   const [trendingPoems, setTrendingPoems] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     fetchTrendingPoems()
//   }, [])

//   const fetchTrendingPoems = async () => {
//     try {
//       setLoading(true)
//       const response = await poemAPI.getTrendingPoems()
//       const poems = response.data?.data || response.data || response
//       setTrendingPoems(Array.isArray(poems) ? poems.slice(0, 4) : [])
//       setError(null)
//     } catch (err) {
//       console.error('Error fetching trending poems:', err)
//       setError(t('common.errorLoading'))
//     } finally {
//       setLoading(false)
//     }
//   }

//   const getPoemImage = (index) => {
//     return poemImages[index % poemImages.length]
//   }

//   const formatNumber = (num) => {
//     if (!num) return '0'
//     if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
//     if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
//     return num.toString()
//   }

//   // Function to get correct poem URL based on routes in App.jsx
//   const getPoemUrl = (poem) => {
//     if (poem.slug) {
//       return `/poem/${poem.slug}`
//     }
//     if (poem.id || poem._id) {
//       return `/poem/${poem.id || poem._id}`
//     }
//     return '/poetry'
//   }

//   if (loading) {
//     return (
//       <section className="py-16 bg-gradient-to-br from-amber-50 via-pink-50 to-purple-50">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex items-center gap-3 mb-8">
//             <div className="p-3 bg-gradient-to-r from-amber-500 to-pink-500 rounded-xl animate-pulse" />
//             <div>
//               <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
//               <div className="h-4 w-56 bg-gray-200 rounded mt-2 animate-pulse" />
//             </div>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="rounded-2xl overflow-hidden bg-white/60 backdrop-blur-lg shadow-xl animate-pulse">
//                 <div className="h-56 bg-gradient-to-r from-amber-100 via-pink-100 to-purple-100" />
//                 <div className="p-4 space-y-2">
//                   <div className="h-5 bg-gray-200 rounded w-3/4" />
//                   <div className="h-4 bg-gray-200 rounded w-1/2" />
//                   <div className="h-3 bg-gray-200 rounded w-full" />
//                   <div className="flex justify-between pt-2">
//                     <div className="h-4 bg-pink-200 rounded w-16" />
//                     <div className="h-4 bg-purple-200 rounded w-16" />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     )
//   }

//   if (error) {
//     return (
//       <section className="py-16 text-center bg-gradient-to-br from-amber-50 to-pink-50">
//         <p className="text-red-500">{error}</p>
//         <button
//           onClick={fetchTrendingPoems}
//           className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition"
//         >
//           {t('common.retry')}
//         </button>
//       </section>
//     )
//   }

//   if (!trendingPoems.length) return null

//   return (
//     <section className="py-16 relative overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-pink-50 to-purple-50" />
      
//       <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300 opacity-20 blur-3xl rounded-full animate-pulse" />
//       <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300 opacity-20 blur-3xl rounded-full animate-pulse" />
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-300 opacity-10 blur-3xl rounded-full animate-pulse" />

//       <div className="relative max-w-7xl mx-auto px-6">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-10">
//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-pink-500 to-purple-500 rounded-2xl blur-lg animate-pulse" />
//               <div className="relative p-3 rounded-2xl bg-gradient-to-r from-amber-500 via-pink-500 to-purple-500 shadow-xl">
//                 <TrendingUp className="h-6 w-6 text-white" />
//               </div>
//             </div>

//             <div>
//               <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
//                 {t('home.trendingPoems')}
//               </h2>
//               <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
//                 <Sparkles className="h-3 w-3 text-amber-500" />
//                 Most loved poetry by our community
//                 <Sparkles className="h-3 w-3 text-pink-500" />
//               </p>
//             </div>
//           </div>

//           <Link
//             to="/poetry"
//             className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:shadow-xl transition-all hover:scale-105 group border border-amber-200"
//           >
//             <span className="bg-gradient-to-r from-amber-600 to-pink-600 bg-clip-text text-transparent font-medium text-sm">
//               {t('common.viewAll')}
//             </span>
//             <ArrowRight className="h-3 w-3 text-pink-500 group-hover:translate-x-1 transition" />
//           </Link>
//         </div>

//         {/* Cards Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {trendingPoems.map((poem, index) => {
//             const poemImage = getPoemImage(index)
//             const poemUrl = getPoemUrl(poem)
            
//             return (
//               <motion.div
//                 key={poem.id || poem._id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 whileHover={{ y: -5 }}
//               >
//                 <Link
//                   to={poemUrl}
//                   className="group block relative"
//                 >
//                   <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-pink-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
                  
//                   <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-500">
//                     <div className="relative h-56 overflow-hidden">
//                       <img
//                         src={poemImage}
//                         alt={poem.title}
//                         className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out"
//                       />
                      
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
//                       <div className="absolute top-3 right-3">
//                         <div className="bg-gradient-to-r from-amber-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
//                           <Flame className="h-3 w-3" />
//                           #{index + 1}
//                         </div>
//                       </div>

//                       <div className="absolute top-3 left-3">
//                         <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
//                           <Heart className="h-3 w-3 text-pink-400 fill-pink-400" />
//                           {formatNumber(poem.likes || poem.likeCount || 0)}
//                         </div>
//                       </div>

//                       <div className="absolute bottom-3 left-3 right-3">
//                         <p className="text-white/90 text-xs font-medium flex items-center gap-2">
//                           <span className="w-6 h-px bg-gradient-to-r from-amber-400 to-transparent" />
//                           {poem.author?.name || poem.author}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="p-4">
//                       <h3 className="font-bold text-base text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-amber-600 group-hover:to-pink-600 group-hover:bg-clip-text transition line-clamp-1">
//                         {poem.title}
//                       </h3>

//                       <p className="urdu-text text-gray-500 text-sm mt-1 line-clamp-1">
//                         {poem.titleUr || poem.titleTranslation?.ur || ''}
//                       </p>

//                       {/* UPDATED: Increased text size for excerpt */}
//                       <div className="relative mt-3 pt-2">
//                         <div className="absolute -top-1 left-0 text-2xl text-amber-300 opacity-50">"</div>
//                         <p className="text-gray-600 text-sm pl-4 line-clamp-2 italic">
//                           {poem.excerpt || (poem.content?.substring(0, 80) + '...') || ''}
//                         </p>
//                       </div>

//                       <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-100">
//                         <div className="flex items-center gap-3">
//                           <span className="flex items-center gap-1.5 text-pink-500 group-hover:scale-105 transition">
//                             <Heart className="h-4 w-4 fill-pink-500/20" />
//                             <span className="text-sm font-medium">{formatNumber(poem.likes || poem.likeCount || 0)}</span>
//                           </span>
                          
//                           <span className="flex items-center gap-1.5 text-purple-500 group-hover:scale-105 transition">
//                             <Eye className="h-4 w-4" />
//                             <span className="text-sm font-medium">{formatNumber(poem.views || poem.viewCount || 0)}</span>
//                           </span>
//                         </div>

//                         <div className="flex items-center gap-1 text-xs text-amber-500 opacity-0 group-hover:opacity-100 transition">
//                           <span>Read</span>
//                           <ArrowRight className="h-3 w-3" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               </motion.div>
//             )
//           })}
//         </div>

//         {/* Mobile View All Button */}
//         <div className="mt-8 text-center sm:hidden">
//           <Link
//             to="/poetry"
//             className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-amber-500 via-pink-500 to-purple-500 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm"
//           >
//             <span className="font-semibold">{t('common.viewAll')}</span>
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>

//         {/* Stats Counter */}
//         <div className="mt-6 text-center">
//           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-sm border border-amber-200">
//             <Sparkles className="h-3 w-3 text-amber-500" />
//             <span className="text-xs text-gray-600">
//               {trendingPoems.length} trending {trendingPoems.length === 1 ? 'poem' : 'poems'}
//             </span>
//             <Sparkles className="h-3 w-3 text-pink-500" />
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default TrendingSection












// client/src/components/home/TrendingSection.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { TrendingUp, ArrowRight, Heart, Eye, Sparkles, Flame } from 'lucide-react'
import poemAPI from '../../api/poemAPI'

// Beautiful poem-specific images (different for each)
const poemImages = [
  'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600',
  'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=600',
  'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600'
]

const TrendingSection = () => {
  const { t, i18n } = useTranslation()
  const [trendingPoems, setTrendingPoems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const currentLang = i18n.language
  const isRTL = currentLang === 'ur'

  useEffect(() => {
    fetchTrendingPoems()
  }, [])

  const fetchTrendingPoems = async () => {
    try {
      setLoading(true)
      const response = await poemAPI.getTrendingPoems()
      const poems = response.data?.data || response.data || response
      setTrendingPoems(Array.isArray(poems) ? poems.slice(0, 4) : [])
      setError(null)
    } catch (err) {
      console.error('Error fetching trending poems:', err)
      setError(t('common.errorLoading'))
    } finally {
      setLoading(false)
    }
  }

  const getPoemImage = (index) => {
    return poemImages[index % poemImages.length]
  }

  const formatNumber = (num) => {
    if (!num) return '0'
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  // Function to get correct poem URL based on routes
  const getPoemUrl = (poem) => {
    if (poem.slug) {
      return `/poem/${poem.slug}`
    }
    if (poem.id || poem._id) {
      return `/poem/${poem.id || poem._id}`
    }
    return '/poetry'
  }

  // Get poem title based on language
  const getPoemTitle = (poem) => {
    if (currentLang === 'ur' && poem.titleUrdu) {
      return poem.titleUrdu
    }
    if (currentLang === 'hi' && poem.titleHindi) {
      return poem.titleHindi
    }
    return poem.title
  }

  // Get poem excerpt based on language
  const getPoemExcerpt = (poem) => {
    if (currentLang === 'ur' && poem.contentUrdu) {
      const excerpt = poem.contentUrdu.substring(0, 80)
      return excerpt.length < poem.contentUrdu.length ? excerpt + '...' : excerpt
    }
    if (currentLang === 'hi' && poem.contentHindi) {
      const excerpt = poem.contentHindi.substring(0, 80)
      return excerpt.length < poem.contentHindi.length ? excerpt + '...' : excerpt
    }
    if (poem.content) {
      const excerpt = poem.content.substring(0, 80)
      return excerpt.length < poem.content.length ? excerpt + '...' : excerpt
    }
    if (poem.excerpt) return poem.excerpt
    return t('poetry.readMore')
  }

  // Get author name based on language
  const getAuthorName = (poem) => {
    const author = poem.author?.name || poem.author
    if (currentLang === 'ur' && poem.author?.nameUrdu) {
      return poem.author.nameUrdu
    }
    if (currentLang === 'hi' && poem.author?.nameHindi) {
      return poem.author.nameHindi
    }
    return author || t('common.unknown')
  }

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-amber-50 via-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="p-3 bg-gradient-to-r from-amber-500 to-pink-500 rounded-xl animate-pulse" />
            <div>
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-56 bg-gray-200 rounded mt-2 animate-pulse" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-white/60 backdrop-blur-lg shadow-xl animate-pulse">
                <div className="h-56 bg-gradient-to-r from-amber-100 via-pink-100 to-purple-100" />
                <div className="p-4 space-y-2">
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="flex justify-between pt-2">
                    <div className="h-4 bg-pink-200 rounded w-16" />
                    <div className="h-4 bg-purple-200 rounded w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 text-center bg-gradient-to-br from-amber-50 to-pink-50">
        <p className="text-red-500">{error}</p>
        <button
          onClick={fetchTrendingPoems}
          className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition"
        >
          {t('common.retry')}
        </button>
      </section>
    )
  }

  if (!trendingPoems.length) return null

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-pink-50 to-purple-50" />
      
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300 opacity-20 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300 opacity-20 blur-3xl rounded-full animate-pulse" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-300 opacity-10 blur-3xl rounded-full animate-pulse" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-10" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-pink-500 to-purple-500 rounded-2xl blur-lg animate-pulse" />
              <div className="relative p-3 rounded-2xl bg-gradient-to-r from-amber-500 via-pink-500 to-purple-500 shadow-xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>

            <div className={isRTL ? 'text-right' : ''}>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                {t('home.trendingPoems')}
              </h2>
              <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                <Sparkles className="h-3 w-3 text-amber-500" />
                {t('home.trendingSubtitle')}
                <Sparkles className="h-3 w-3 text-pink-500" />
              </p>
            </div>
          </div>

          <Link
            to="/poetry"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:shadow-xl transition-all hover:scale-105 group border border-amber-200"
          >
            <span className="bg-gradient-to-r from-amber-600 to-pink-600 bg-clip-text text-transparent font-medium text-sm">
              {t('common.viewAll')}
            </span>
            <ArrowRight className="h-3 w-3 text-pink-500 group-hover:translate-x-1 transition" />
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingPoems.map((poem, index) => {
            const poemImage = getPoemImage(index)
            const poemUrl = getPoemUrl(poem)
            const poemTitle = getPoemTitle(poem)
            const poemExcerpt = getPoemExcerpt(poem)
            const authorName = getAuthorName(poem)
            
            return (
              <motion.div
                key={poem.id || poem._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Link
                  to={poemUrl}
                  className="group block relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-pink-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
                  
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-500">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={poemImage}
                        alt={poemTitle}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      <div className="absolute top-3 right-3">
                        <div className="bg-gradient-to-r from-amber-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                          <Flame className="h-3 w-3" />
                          #{index + 1}
                        </div>
                      </div>

                      <div className="absolute top-3 left-3">
                        <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                          <Heart className="h-3 w-3 text-pink-400 fill-pink-400" />
                          {formatNumber(poem.stats?.likes || poem.likes || poem.likeCount || 0)}
                        </div>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-white/90 text-xs font-medium flex items-center gap-2">
                          <span className="w-6 h-px bg-gradient-to-r from-amber-400 to-transparent" />
                          {authorName}
                        </p>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className={`font-bold text-base group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-amber-600 group-hover:to-pink-600 group-hover:bg-clip-text transition line-clamp-1 ${isRTL ? 'urdu-text' : ''}`}>
                        {poemTitle}
                      </h3>

                      {/* Urdu subtitle if available */}
                      {currentLang !== 'ur' && poem.titleUrdu && (
                        <p className="urdu-text text-gray-500 text-xs mt-1 line-clamp-1" dir="rtl">
                          {poem.titleUrdu}
                        </p>
                      )}

                      <div className="relative mt-3 pt-2">
                        <div className={`absolute -top-1 text-2xl text-amber-300 opacity-50 ${isRTL ? 'right-0' : 'left-0'}`}>
                          {isRTL ? '”' : '"'}
                        </div>
                        <p className={`text-gray-600 text-sm ${isRTL ? 'pr-4 text-right' : 'pl-4'} line-clamp-2 italic ${isRTL ? 'urdu-text' : ''}`}>
                          {poemExcerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1.5 text-pink-500 group-hover:scale-105 transition">
                            <Heart className="h-4 w-4 fill-pink-500/20" />
                            <span className="text-sm font-medium">{formatNumber(poem.stats?.likes || poem.likes || poem.likeCount || 0)}</span>
                          </span>
                          
                          <span className="flex items-center gap-1.5 text-purple-500 group-hover:scale-105 transition">
                            <Eye className="h-4 w-4" />
                            <span className="text-sm font-medium">{formatNumber(poem.stats?.views || poem.views || poem.viewCount || 0)}</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-amber-500 opacity-0 group-hover:opacity-100 transition">
                          <span>{t('poetry.readMore')}</span>
                          {!isRTL && <ArrowRight className="h-3 w-3" />}
                          {isRTL && <ArrowRight className="h-3 w-3 rotate-180" />}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/poetry"
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-amber-500 via-pink-500 to-purple-500 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm"
          >
            <span className="font-semibold">{t('common.viewAll')}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Stats Counter */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-sm border border-amber-200">
            <Sparkles className="h-3 w-3 text-amber-500" />
            <span className="text-xs text-gray-600">
              {trendingPoems.length} {trendingPoems.length === 1 ? t('home.trendingPoem') : t('home.trendingPoems')}
            </span>
            <Sparkles className="h-3 w-3 text-pink-500" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrendingSection