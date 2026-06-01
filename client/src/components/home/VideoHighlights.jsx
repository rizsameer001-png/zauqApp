// // client/src/components/home/VideoHighlights.jsx
// import React from 'react'
// import { Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion } from 'framer-motion'
// import { Play, ArrowRight, Clock, Eye } from 'lucide-react'

// const videos = [
//   {
//     id: 1,
//     title: 'Jashn-e-Rekhta 2024 Highlights',
//     category: 'Mushaira',
//     duration: '45:20',
//     views: 125000,
//     thumbnail: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=600',
//   },
//   {
//     id: 2,
//     title: 'Ghazal Recitation by Gulzar',
//     category: 'Podcast',
//     duration: '12:35',
//     views: 87000,
//     thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600',
//   },
//   {
//     id: 3,
//     title: 'Understanding Mirza Ghalib',
//     category: 'Documentary',
//     duration: '28:15',
//     views: 65000,
//     thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600',
//   },
// ]

// const VideoHighlights = () => {
//   const { t } = useTranslation()

//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center space-x-3">
//             <div className="p-2 bg-red-100 rounded-lg">
//               <Play className="h-6 w-6 text-red-600" />
//             </div>
//             <div>
//               <h2 className="section-title mb-0">{t('home.videoHighlights')}</h2>
//               <p className="text-gray-500 text-sm">Mushaira, podcasts, and documentaries</p>
//             </div>
//           </div>
//           <Link
//             to="/videos"
//             className="hidden sm:flex items-center space-x-1 text-red-600 hover:text-red-700 font-medium"
//           >
//             <span>{t('common.viewAll')}</span>
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {videos.map((video, index) => (
//             <motion.div
//               key={video.id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               viewport={{ once: true }}
//             >
//               <Link to={`/videos/${video.id}`} className="card block overflow-hidden group">
//                 <div className="relative h-48 overflow-hidden">
//                   <img
//                     src={video.thumbnail}
//                     alt={video.title}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                   />
//                   <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
//                     <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
//                       <Play className="h-6 w-6 text-primary-600 ml-1" />
//                     </div>
//                   </div>
//                   <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white text-xs rounded-md flex items-center space-x-1">
//                     <Clock className="h-3 w-3" />
//                     <span>{video.duration}</span>
//                   </div>
//                   <div className="absolute top-3 left-3">
//                     <span className="px-2 py-1 bg-white/90 text-gray-700 text-xs font-medium rounded-full">
//                       {video.category}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="p-4">
//                   <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
//                     {video.title}
//                   </h3>
//                   <div className="flex items-center space-x-1 mt-2 text-sm text-gray-500">
//                     <Eye className="h-4 w-4" />
//                     <span>{(video.views / 1000).toFixed(1)}K views</span>
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// export default VideoHighlights










// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion } from 'framer-motion'
// import { Play, ArrowRight, Clock, Eye } from 'lucide-react'
// import videoAPI from '../../api/videoAPI'

// const VideoHighlights = () => {
//   const { t } = useTranslation()
//   const [videos, setVideos] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     fetchVideos()
//   }, [])

//   const fetchVideos = async () => {
//     try {
//       setLoading(true)
//       const response = await videoAPI.getFeaturedVideos()
//       // Handle different response structures
//       const videoData = response?.data || response || []
//       // Take only first 3 videos
//       setVideos(Array.isArray(videoData) ? videoData.slice(0, 3) : [])
//       setError(null)
//     } catch (err) {
//       console.error('Error fetching videos:', err)
//       setError(t('common.errorLoading'))
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Format view count (e.g., 125000 -> 125K)
//   const formatViews = (views) => {
//     if (!views) return '0 views'
//     if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M views`
//     if (views >= 1000) return `${(views / 1000).toFixed(1)}K views`
//     return `${views} views`
//   }

//   // Loading skeleton
//   if (loading) {
//     return (
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between mb-8">
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-red-100 rounded-lg">
//                 <Play className="h-6 w-6 text-red-600" />
//               </div>
//               <div>
//                 <h2 className="section-title mb-0">{t('home.videoHighlights')}</h2>
//                 <p className="text-gray-500 text-sm">Mushaira, podcasts, and documentaries</p>
//               </div>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[1, 2, 3].map((i) => (
//               <div key={i} className="card animate-pulse">
//                 <div className="h-48 bg-gray-200 rounded-t-lg" />
//                 <div className="p-4">
//                   <div className="h-5 bg-gray-200 rounded mb-2" />
//                   <div className="h-4 bg-gray-200 rounded w-2/3" />
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
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center py-12">
//             <p className="text-red-500">{error}</p>
//             <button 
//               onClick={fetchVideos}
//               className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//             >
//               {t('common.retry')}
//             </button>
//           </div>
//         </div>
//       </section>
//     )
//   }

//   // No data state
//   if (!videos.length) {
//     return null
//   }

//   // Main render with 3 videos only
//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Header Section */}
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center space-x-3">
//             <div className="p-2 bg-red-100 rounded-lg">
//               <Play className="h-6 w-6 text-red-600" />
//             </div>
//             <div>
//               <h2 className="section-title mb-0">{t('home.videoHighlights')}</h2>
//               <p className="text-gray-500 text-sm">Mushaira, podcasts, and documentaries</p>
//             </div>
//           </div>
//           <Link
//             to="/videos"
//             className="hidden sm:flex items-center space-x-1 text-red-600 hover:text-red-700 font-medium"
//           >
//             <span>{t('common.viewAll')}</span>
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>

//         {/* Videos Grid - Shows ONLY 3 videos */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {videos.map((video, index) => (
//             <motion.div
//               key={video.id || video._id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               viewport={{ once: true }}
//             >
//               <Link 
//                 to={`/videos/${video.slug || video.id}`} 
//                 className="card block overflow-hidden group"
//               >
//                 {/* Thumbnail Section */}
//                 <div className="relative h-48 overflow-hidden">
//                   <img
//                     src={video.thumbnail || video.thumbnailUrl || 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=600'}
//                     alt={video.title}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                     onError={(e) => {
//                       e.target.src = 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=600'
//                     }}
//                   />
                  
//                   {/* Play Button Overlay */}
//                   <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
//                     <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
//                       <Play className="h-6 w-6 text-primary-600 ml-1" />
//                     </div>
//                   </div>
                  
//                   {/* Duration Badge */}
//                   <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white text-xs rounded-md flex items-center space-x-1">
//                     <Clock className="h-3 w-3" />
//                     <span>{video.duration || '00:00'}</span>
//                   </div>
                  
//                   {/* Category Badge - FIXED: Only shows if category exists */}
//                   {(video.category || video.videoType) && (
//                     <div className="absolute top-3 left-3">
//                       <span className="px-2 py-1 bg-white/90 text-gray-700 text-xs font-medium rounded-full">
//                         {video.category || video.videoType}
//                       </span>
//                     </div>
//                   )}
//                 </div>
                
//                 {/* Content Section */}
//                 <div className="p-4">
//                   <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
//                     {video.title}
//                   </h3>
//                   <div className="flex items-center space-x-1 mt-2 text-sm text-gray-500">
//                     <Eye className="h-4 w-4" />
//                     <span>{formatViews(video.views || video.viewCount || 0)}</span>
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>

//         {/* Mobile View All Button */}
//         <div className="mt-6 text-center sm:hidden">
//           <Link 
//             to="/videos" 
//             className="inline-flex items-center space-x-2 px-6 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
//           >
//             <span>{t('common.viewAll')}</span>
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default VideoHighlights











// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion } from 'framer-motion'
// import { Play, ArrowRight, Clock, Eye } from 'lucide-react'
// import videoAPI from '../../api/videoAPI'

// const VideoHighlights = () => {
//   const { t } = useTranslation()
//   const [videos, setVideos] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     fetchVideos()
//   }, [])

//   const fetchVideos = async () => {
//     try {
//       setLoading(true)
//       const response = await videoAPI.getFeaturedVideos()
//       console.log('Full API Response:', response) // Debug: See what API returns
      
//       // Handle different response structures
//       const videoData = response?.data || response || []
//       console.log('Video Data:', videoData) // Debug: See video array
//       console.log('First video object:', videoData[0]) // Debug: See first video structure
      
//       // Take only first 3 videos
//       setVideos(Array.isArray(videoData) ? videoData.slice(0, 3) : [])
//       setError(null)
//     } catch (err) {
//       console.error('Error fetching videos:', err)
//       setError(t('common.errorLoading'))
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Format view count
//   const formatViews = (views) => {
//     if (!views) return '0 views'
//     if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M views`
//     if (views >= 1000) return `${(views / 1000).toFixed(1)}K views`
//     return `${views} views`
//   }

//   // Loading skeleton
//   if (loading) {
//     return (
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between mb-8">
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-red-100 rounded-lg">
//                 <Play className="h-6 w-6 text-red-600" />
//               </div>
//               <div>
//                 <h2 className="section-title mb-0">{t('home.videoHighlights')}</h2>
//                 <p className="text-gray-500 text-sm">Mushaira, podcasts, and documentaries</p>
//               </div>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[1, 2, 3].map((i) => (
//               <div key={i} className="card animate-pulse">
//                 <div className="h-48 bg-gray-200 rounded-t-lg" />
//                 <div className="p-4">
//                   <div className="h-5 bg-gray-200 rounded mb-2" />
//                   <div className="h-4 bg-gray-200 rounded w-2/3" />
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
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center py-12">
//             <p className="text-red-500">{error}</p>
//             <button 
//               onClick={fetchVideos}
//               className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//             >
//               {t('common.retry')}
//             </button>
//           </div>
//         </div>
//       </section>
//     )
//   }

//   // No data state
//   if (!videos.length) {
//     return null
//   }

//   // Main render with 3 videos only
//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Header Section */}
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center space-x-3">
//             <div className="p-2 bg-red-100 rounded-lg">
//               <Play className="h-6 w-6 text-red-600" />
//             </div>
//             <div>
//               <h2 className="section-title mb-0">{t('home.videoHighlights')}</h2>
//               <p className="text-gray-500 text-sm">Mushaira, podcasts, and documentaries</p>
//             </div>
//           </div>
//           <Link
//             to="/videos"
//             className="hidden sm:flex items-center space-x-1 text-red-600 hover:text-red-700 font-medium"
//           >
//             <span>{t('common.viewAll')}</span>
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>

//         {/* Videos Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {videos.map((video, index) => (
//             <motion.div
//               key={video.id || video._id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               viewport={{ once: true }}
//             >
//               <Link 
//                 to={`/videos/${video.slug || video.id}`} 
//                 className="card block overflow-hidden group"
//               >
//                 {/* Thumbnail Section */}
//                 <div className="relative h-48 overflow-hidden">
//                   <img
//                     src={video.thumbnail || video.thumbnailUrl || 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=600'}
//                     alt={video.title}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                     onError={(e) => {
//                       e.target.src = 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=600'
//                     }}
//                   />
                  
//                   {/* Play Button Overlay */}
//                   <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
//                     <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
//                       <Play className="h-6 w-6 text-primary-600 ml-1" />
//                     </div>
//                   </div>
                  
//                   {/* Duration Badge */}
//                   <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white text-xs rounded-md flex items-center space-x-1">
//                     <Clock className="h-3 w-3" />
//                     <span>{video.duration || '00:00'}</span>
//                   </div>
                  
//                   {/* REMOVED Category Badge completely to test */}
//                 </div>
                
//                 {/* Content Section */}
//                 <div className="p-4">
//                   <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
//                     {video.title}
//                   </h3>
//                   <div className="flex items-center space-x-1 mt-2 text-sm text-gray-500">
//                     <Eye className="h-4 w-4" />
//                     <span>{formatViews(video.views || video.viewCount || 0)}</span>
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>

//         {/* Mobile View All Button */}
//         <div className="mt-6 text-center sm:hidden">
//           <Link 
//             to="/videos" 
//             className="inline-flex items-center space-x-2 px-6 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
//           >
//             <span>{t('common.viewAll')}</span>
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default VideoHighlights










import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Play, ArrowRight, Clock, Eye } from 'lucide-react'
import videoAPI from '../../api/videoAPI'

const VideoHighlights = () => {
  const { t } = useTranslation()
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      setLoading(true)
      const response = await videoAPI.getFeaturedVideos()

      const videoData = response?.data || response || []
      setVideos(Array.isArray(videoData) ? videoData.slice(0, 3) : [])
      setError(null)
    } catch (err) {
      console.error('Error fetching videos:', err)
      setError(t('common.errorLoading'))
    } finally {
      setLoading(false)
    }
  }

  const formatViews = (views) => {
    if (!views) return '0 views'
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M views`
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K views`
    return `${views} views`
  }

  // ================= LOADING =================
  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-100 rounded-xl shadow-sm">
                <Play className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {t('home.videoHighlights')}
                </h2>
                <p className="text-gray-500 text-sm">
                  Mushaira, podcasts, and documentaries
                </p>
              </div>
            </div>
          </div>

          {/* Skeleton Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden bg-white shadow-md animate-pulse"
              >
                <div className="h-52 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ================= ERROR =================
  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="text-center">
          <p className="text-red-500 text-lg">{error}</p>
          <button
            onClick={fetchVideos}
            className="mt-5 px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition shadow-md"
          >
            {t('common.retry')}
          </button>
        </div>
      </section>
    )
  }

  if (!videos.length) return null

  // ================= MAIN =================
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-100 rounded-xl shadow-sm">
              <Play className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t('home.videoHighlights')}
              </h2>
              <p className="text-gray-500 text-sm">
                Mushaira, podcasts, and documentaries
              </p>
            </div>
          </div>

          <Link
            to="/videos"
            className="hidden sm:flex items-center gap-2 text-red-600 font-medium hover:gap-3 transition-all"
          >
            {t('common.viewAll')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id || video._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/videos/${video.slug || video.id}`}
                className="group block rounded-2xl overflow-hidden bg-white/70 backdrop-blur-lg border border-gray-200 shadow-md hover:shadow-xl transition-all duration-500"
              >

                {/* Thumbnail */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={
                      video.thumbnail ||
                      video.thumbnailUrl ||
                      'https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=600'
                    }
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="h-6 w-6 text-red-600 ml-1" />
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {video.duration || '00:00'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition line-clamp-2">
                    {video.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                    <Eye className="h-4 w-4" />
                    {formatViews(video.views || video.viewCount || 0)}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Button */}
        <div className="mt-10 text-center sm:hidden">
          <Link
            to="/videos"
            className="inline-flex items-center gap-2 px-6 py-3 border border-red-600 text-red-600 rounded-xl hover:bg-red-50 transition"
          >
            {t('common.viewAll')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default VideoHighlights