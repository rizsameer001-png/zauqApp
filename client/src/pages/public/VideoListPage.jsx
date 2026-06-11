// //client/src/pages/public/VideoListPage.jsx

// import React, { useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { motion } from 'framer-motion'
// import { Search, Play, Clock, Eye, Filter, Grid, List } from 'lucide-react'
// import { Link } from 'react-router-dom'
// import { VIDEO_CATEGORIES } from '../../utils/constants.js'

// const videos = [
//   {
//     id: 1,
//     title: 'Jashn-e-Rekhta 2024 Highlights',
//     category: 'Mushaira',
//     duration: '45:20',
//     views: 125000,
//     thumbnail: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=600',
//     author: 'Various Artists',
//   },
//   {
//     id: 2,
//     title: 'Ghazal Recitation by Gulzar',
//     category: 'Podcast',
//     duration: '12:35',
//     views: 87000,
//     thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600',
//     author: 'Gulzar',
//   },
//   {
//     id: 3,
//     title: 'Understanding Mirza Ghalib',
//     category: 'Documentary',
//     duration: '28:15',
//     views: 65000,
//     thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600',
//     author: 'Literary Society',
//   },
//   {
//     id: 4,
//     title: 'Mushaira Night - Delhi 2024',
//     category: 'Mushaira',
//     duration: '1:20:00',
//     views: 210000,
//     thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600',
//     author: 'Delhi Poetry Club',
//   },
//   {
//     id: 5,
//     title: 'Faiz Ahmed Faiz - Life and Poetry',
//     category: 'Documentary',
//     duration: '35:40',
//     views: 78000,
//     thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600',
//     author: 'Documentary Films',
//   },
//   {
//     id: 6,
//     title: 'Urdu Shayari Workshop',
//     category: 'Podcast',
//     duration: '55:00',
//     views: 45000,
//     thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600',
//     author: 'Urdu Academy',
//   },
// ]

// const VideoListPage = () => {
//   const { t } = useTranslation()
//   const [activeCategory, setActiveCategory] = useState('all')
//   const [searchQuery, setSearchQuery] = useState('')
//   const [viewMode, setViewMode] = useState('grid')

//   const filteredVideos = videos.filter((video) => {
//     if (activeCategory !== 'all' && video.category !== activeCategory) return false
//     if (searchQuery && !video.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
//     return true
//   })

//   return (
//     <div className="page-container">
//       <div className="mb-8">
//         <h1 className="section-title">{t('common.videos')}</h1>
//         <p className="section-subtitle">Mushaira, podcasts, documentaries, and more</p>
//       </div>

//       {/* Search & Controls */}
//       <div className="flex flex-col md:flex-row gap-4 mb-6">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search videos..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="input-field pl-10"
//           />
//         </div>
//         <div className="flex items-center space-x-2">
//           <select className="input-field w-40">
//             <option>Most Popular</option>
//             <option>Newest</option>
//             <option>Longest</option>
//           </select>
//           <div className="flex border border-gray-300 rounded-lg overflow-hidden">
//             <button
//               onClick={() => setViewMode('grid')}
//               className={`p-2.5 ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'}`}
//             >
//               <Grid className="h-5 w-5" />
//             </button>
//             <button
//               onClick={() => setViewMode('list')}
//               className={`p-2.5 ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'}`}
//             >
//               <List className="h-5 w-5" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Categories */}
//       <div className="flex overflow-x-auto space-x-2 mb-6 pb-2">
//         <button
//           onClick={() => setActiveCategory('all')}
//           className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//             activeCategory === 'all'
//               ? 'bg-primary-600 text-white'
//               : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//           }`}
//         >
//           All Videos
//         </button>
//         {VIDEO_CATEGORIES.map((cat) => (
//           <button
//             key={cat.id}
//             onClick={() => setActiveCategory(cat.label)}
//             className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//               activeCategory === cat.label
//                 ? 'bg-primary-600 text-white'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             {cat.label}
//           </button>
//         ))}
//       </div>

//       {/* Videos Grid */}
//       <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
//         {filteredVideos.map((video, index) => (
//           <motion.div
//             key={video.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//           >
//             <Link to={`/videos/${video.id}`} className="card block overflow-hidden group">
//               <div className="relative overflow-hidden">
//                 <img
//                   src={video.thumbnail}
//                   alt={video.title}
//                   className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
//                 />
//                 <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
//                   <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
//                     <Play className="h-6 w-6 text-primary-600 ml-1" />
//                   </div>
//                 </div>
//                 <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white text-xs rounded-md flex items-center space-x-1">
//                   <Clock className="h-3 w-3" />
//                   <span>{video.duration}</span>
//                 </div>
//                 <div className="absolute top-3 left-3">
//                   <span className="px-2 py-1 bg-white/90 text-gray-700 text-xs font-medium rounded-full">
//                     {video.category}
//                   </span>
//                 </div>
//               </div>
//               <div className="p-4">
//                 <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-1">
//                   {video.title}
//                 </h3>
//                 <p className="text-sm text-gray-500 mb-2">{video.author}</p>
//                 <div className="flex items-center space-x-1 text-sm text-gray-500">
//                   <Eye className="h-4 w-4" />
//                   <span>{(video.views / 1000).toFixed(1)}K views</span>
//                 </div>
//               </div>
//             </Link>
//           </motion.div>
//         ))}
//       </div>

//       {filteredVideos.length === 0 && (
//         <div className="text-center py-12">
//           <Play className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//           <p className="text-gray-500">No videos found matching your criteria</p>
//         </div>
//       )}
//     </div>
//   )
// }

// export default VideoListPage









// // client/src/pages/public/VideoListPage.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useSearchParams, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useQuery } from '@tanstack/react-query';
// import { Search, Play, Clock, Eye, Filter, Grid, List, Loader2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
// import videoAPI from '../../api/videoAPI';
// import { VIDEO_CATEGORIES } from '../../utils/constants.js';

// const VideoListPage = () => {
//   const { t } = useTranslation();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [viewMode, setViewMode] = useState('grid');
//   const [sortBy, setSortBy] = useState('popular');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 9;

//   // Fetch real videos from API
//   const { data: response, isLoading, error, refetch } = useQuery({
//     queryKey: ['videos', currentPage, activeCategory, sortBy],
//     queryFn: () => videoAPI.getVideos({
//       page: currentPage,
//       limit: itemsPerPage,
//       type: activeCategory !== 'all' ? activeCategory.toLowerCase() : undefined,
//       search: searchQuery || undefined,
//       sort: sortBy
//     }),
//     enabled: true,
//     staleTime: 30000
//   });

//   // Extract videos and pagination from response
//   const videosData = response?.data?.data || response?.data || response || [];
//   const videos = Array.isArray(videosData) ? videosData : [];
//   const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 };

//   // Update URL when category changes
//   useEffect(() => {
//     if (activeCategory && activeCategory !== 'all') {
//       setSearchParams({ category: activeCategory });
//     } else {
//       setSearchParams({});
//     }
//     setCurrentPage(1);
//   }, [activeCategory, setSearchParams]);

//   // Debounced search
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (currentPage === 1) {
//         refetch();
//       } else {
//         setCurrentPage(1);
//       }
//     }, 500);
//     return () => clearTimeout(timer);
//   }, [searchQuery, refetch, currentPage]);

//   // Handle page change
//   const goToPage = (page) => {
//     if (page >= 1 && page <= (pagination.totalPages || 1)) {
//       setCurrentPage(page);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   // Format duration from seconds to HH:MM:SS or MM:SS
//   const formatDuration = (seconds) => {
//     if (!seconds) return 'N/A';
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     if (hrs > 0) {
//       return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//     }
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Format view count
//   const formatViews = (views) => {
//     if (!views) return '0';
//     if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
//     if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
//     return views.toString();
//   };

//   // Clear filters
//   const clearFilters = () => {
//     setSearchQuery('');
//     setActiveCategory('all');
//     setSortBy('popular');
//     setCurrentPage(1);
//   };

//   // Sort options
//   const sortOptions = [
//     { value: 'popular', label: 'Most Popular' },
//     { value: 'recent', label: 'Most Recent' },
//     { value: 'views', label: 'Most Viewed' },
//     { value: 'longest', label: 'Longest' },
//     { value: 'shortest', label: 'Shortest' }
//   ];

//   // Get category display name
//   const getCategoryDisplayName = (type) => {
//     const category = VIDEO_CATEGORIES.find(cat => cat.id === type?.toLowerCase());
//     return category?.label || type || 'Video';
//   };

//   // Loading state
//   if (isLoading && videos.length === 0) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-center min-h-[60vh]">
//             <div className="text-center">
//               <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
//               <p className="text-gray-500">Loading videos...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error && videos.length === 0) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center py-12">
//             <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
//             <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to load videos</h2>
//             <p className="text-gray-500 mb-6">There was an error loading the videos. Please try again.</p>
//             <button onClick={() => refetch()} className="btn-primary">
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
//             {t('common.videos', 'Video Library')}
//           </h1>
//           <p className="text-gray-500">
//             Mushaira, interviews, documentaries, lectures, and more from the world of Urdu literature
//           </p>
//         </div>

//         {/* Search & Controls */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search videos by title..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
//             />
//           </div>
//           <div className="flex items-center gap-2">
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white w-40"
//             >
//               {sortOptions.map(option => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//             <div className="flex border border-gray-300 rounded-lg overflow-hidden">
//               <button
//                 onClick={() => setViewMode('grid')}
//                 className={`p-2.5 ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'}`}
//                 title="Grid View"
//               >
//                 <Grid className="h-5 w-5" />
//               </button>
//               <button
//                 onClick={() => setViewMode('list')}
//                 className={`p-2.5 ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'}`}
//                 title="List View"
//               >
//                 <List className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Categories */}
//         <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-6 pb-2">
//           <button
//             onClick={() => setActiveCategory('all')}
//             className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//               activeCategory === 'all'
//                 ? 'bg-primary-600 text-white'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             All Videos
//           </button>
//           {VIDEO_CATEGORIES.map((cat) => (
//             <button
//               key={cat.id}
//               onClick={() => setActiveCategory(cat.id)}
//               className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//                 activeCategory === cat.id
//                   ? 'bg-primary-600 text-white'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               {cat.label}
//             </button>
//           ))}
//         </div>

//         {/* Results Count */}
//         <div className="flex justify-between items-center mb-4">
//           <p className="text-sm text-gray-500">
//             Showing {videos.length} of {pagination.total || videos.length} videos
//           </p>
//           {(searchQuery || activeCategory !== 'all') && (
//             <button
//               onClick={clearFilters}
//               className="text-sm text-primary-600 hover:text-primary-700"
//             >
//               Clear filters
//             </button>
//           )}
//         </div>

//         {/* Videos Grid/List */}
//         {videos.length === 0 ? (
//           <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
//             <Play className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
//             <p className="text-gray-500">
//               {searchQuery 
//                 ? `No videos matching "${searchQuery}" found. Try a different search term.`
//                 : 'No videos available in this category yet.'}
//             </p>
//           </div>
//         ) : (
//           <>
//             <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
//               {videos.map((video, index) => (
//                 <motion.div
//                   key={video._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                 >
//                   <Link to={`/video/${video.slug}`} className="block group">
//                     <div className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all ${viewMode === 'list' ? 'flex gap-4' : ''}`}>
//                       {/* Thumbnail */}
//                       <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'w-full'}`}>
//                         {video.thumbnail ? (
//                           <img
//                             src={video.thumbnail}
//                             alt={video.title}
//                             className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
//                           />
//                         ) : (
//                           <div className="w-full aspect-video bg-gray-200 flex items-center justify-center">
//                             <Play className="h-12 w-12 text-gray-400" />
//                           </div>
//                         )}
//                         <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
//                           <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
//                             <Play className="h-5 w-5 text-primary-600 ml-0.5" />
//                           </div>
//                         </div>
//                         {/* Duration Badge */}
//                         {video.duration && (
//                           <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded-md flex items-center gap-1">
//                             <Clock className="h-3 w-3" />
//                             <span>{formatDuration(video.duration)}</span>
//                           </div>
//                         )}
//                         {/* Category Badge */}
//                         <div className="absolute top-2 left-2">
//                           <span className="px-2 py-0.5 bg-white/90 text-gray-700 text-xs font-medium rounded-full capitalize">
//                             {getCategoryDisplayName(video.type)}
//                           </span>
//                         </div>
//                         {/* Premium Badge */}
//                         {video.isPremium && (
//                           <div className="absolute top-2 right-2">
//                             <span className="px-2 py-0.5 bg-yellow-500 text-white text-xs font-medium rounded-full">
//                               Premium
//                             </span>
//                           </div>
//                         )}
//                       </div>

//                       {/* Content */}
//                       <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
//                         <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-1">
//                           {video.title}
//                         </h3>
//                         {video.description && (
//                           <p className="text-sm text-gray-500 line-clamp-2 mb-2">
//                             {video.description}
//                           </p>
//                         )}
//                         {video.author && (
//                           <p className="text-sm text-gray-500 mb-2">
//                             {typeof video.author === 'object' ? video.author.name : video.author}
//                           </p>
//                         )}
//                         <div className="flex items-center gap-3 text-sm text-gray-500">
//                           <span className="flex items-center gap-1">
//                             <Eye className="h-4 w-4" />
//                             {formatViews(video.stats?.views || 0)} views
//                           </span>
//                           {video.language && (
//                             <span className="capitalize">{video.language}</span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Pagination */}
//             {(pagination.totalPages > 1 || Math.ceil(videos.length / itemsPerPage) > 1) && (
//               <div className="flex items-center justify-center gap-2 mt-8">
//                 <button
//                   onClick={() => goToPage(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <ChevronLeft className="h-5 w-5 text-gray-600" />
//                 </button>
                
//                 <div className="flex items-center gap-1">
//                   {Array.from({ length: pagination.totalPages || Math.ceil(videos.length / itemsPerPage) }, (_, i) => i + 1)
//                     .filter(page => {
//                       const totalPages = pagination.totalPages || Math.ceil(videos.length / itemsPerPage);
//                       if (totalPages <= 7) return true;
//                       if (page === 1 || page === totalPages) return true;
//                       if (page >= currentPage - 1 && page <= currentPage + 1) return true;
//                       return false;
//                     })
//                     .map((page, index, array) => {
//                       if (index > 0 && array[index - 1] !== page - 1) {
//                         return (
//                           <span key={`ellipsis-${page}`} className="px-3 py-2 text-gray-500">
//                             ...
//                           </span>
//                         );
//                       }
//                       return (
//                         <button
//                           key={page}
//                           onClick={() => goToPage(page)}
//                           className={`min-w-[40px] h-10 rounded-lg font-medium transition-colors ${
//                             currentPage === page
//                               ? 'bg-primary-600 text-white'
//                               : 'text-gray-600 hover:bg-gray-100'
//                           }`}
//                         >
//                           {page}
//                         </button>
//                       );
//                     })}
//                 </div>

//                 <button
//                   onClick={() => goToPage(currentPage + 1)}
//                   disabled={currentPage === (pagination.totalPages || Math.ceil(videos.length / itemsPerPage))}
//                   className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <ChevronRight className="h-5 w-5 text-gray-600" />
//                 </button>
//               </div>
//             )}

//             {/* Loading more indicator */}
//             {isLoading && videos.length > 0 && (
//               <div className="flex justify-center mt-8">
//                 <Loader2 className="h-6 w-6 animate-spin text-primary-600" />
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VideoListPage;






















// // client/src/pages/public/VideoListPage.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useSearchParams, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useQuery } from '@tanstack/react-query';
// import { Search, Play, Clock, Eye, Filter, Grid, List, Loader2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
// import videoAPI from '../../api/videoAPI';
// import { VIDEO_CATEGORIES } from '../../utils/constants.js';

// const VideoListPage = () => {
//   const { t } = useTranslation();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [viewMode, setViewMode] = useState('grid');
//   const [sortBy, setSortBy] = useState('popular');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 9;

//   // Get sort mapping for API
//   const getSortMapping = (sortValue) => {
//     switch (sortValue) {
//       case 'recent':
//         return '-createdAt';
//       case 'views':
//         return '-stats.views';
//       case 'longest':
//         return '-duration';
//       case 'shortest':
//         return 'duration';
//       case 'popular':
//       default:
//         return '-stats.views';
//     }
//   };

//   // Fetch real videos from API - INCLUDE searchQuery in queryKey
//   const { data: response, isLoading, error, refetch } = useQuery({
//     queryKey: ['videos', currentPage, activeCategory, sortBy, searchQuery],
//     queryFn: () => videoAPI.getVideos({
//       page: currentPage,
//       limit: itemsPerPage,
//       type: activeCategory !== 'all' ? activeCategory.toLowerCase() : undefined,
//       search: searchQuery || undefined,
//       sort: sortBy
//     }),
//     enabled: true,
//     staleTime: 30000,
//     keepPreviousData: true
//   });

//   // Extract videos and pagination from response
//   const videosData = response?.data?.data || response?.data || response || [];
//   const videos = Array.isArray(videosData) ? videosData : [];
//   const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 };

//   // Update URL when category changes
//   useEffect(() => {
//     if (activeCategory && activeCategory !== 'all') {
//       setSearchParams({ category: activeCategory });
//     } else {
//       setSearchParams({});
//     }
//     setCurrentPage(1);
//   }, [activeCategory, setSearchParams]);

//   // Reset to page 1 when search query changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery]);

//   // Debounced search - no need to manually refetch, React Query handles it via queryKey
//   const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearchQuery(searchQuery);
//     }, 500);
//     return () => clearTimeout(timer);
//   }, [searchQuery]);

//   // Update actual search query after debounce
//   useEffect(() => {
//     // This will trigger the useQuery refetch because searchQuery is in queryKey
//     // We use debouncedSearchQuery to avoid too many API calls
//     const timer = setTimeout(() => {
//       // The actual search value used in queryKey is searchQuery
//       // But we want to debounce it
//     }, 100);
//     return () => clearTimeout(timer);
//   }, [debouncedSearchQuery]);

//   // Handle page change
//   const goToPage = (page) => {
//     if (page >= 1 && page <= (pagination.totalPages || 1)) {
//       setCurrentPage(page);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   // Format duration from seconds to HH:MM:SS or MM:SS
//   const formatDuration = (seconds) => {
//     if (!seconds) return 'N/A';
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     if (hrs > 0) {
//       return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//     }
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Format view count
//   const formatViews = (views) => {
//     if (!views) return '0';
//     if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
//     if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
//     return views.toString();
//   };

//   // Clear filters
//   const clearFilters = () => {
//     setSearchQuery('');
//     setActiveCategory('all');
//     setSortBy('popular');
//     setCurrentPage(1);
//   };

//   // Sort options
//   const sortOptions = [
//     { value: 'popular', label: 'Most Popular' },
//     { value: 'recent', label: 'Most Recent' },
//     { value: 'views', label: 'Most Viewed' },
//     { value: 'longest', label: 'Longest' },
//     { value: 'shortest', label: 'Shortest' }
//   ];

//   // Get category display name
//   const getCategoryDisplayName = (type) => {
//     const category = VIDEO_CATEGORIES.find(cat => cat.id === type?.toLowerCase());
//     return category?.label || type || 'Video';
//   };

//   // Loading state
//   if (isLoading && videos.length === 0) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-center min-h-[60vh]">
//             <div className="text-center">
//               <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
//               <p className="text-gray-500">Loading videos...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error && videos.length === 0) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center py-12">
//             <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
//             <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to load videos</h2>
//             <p className="text-gray-500 mb-6">There was an error loading the videos. Please try again.</p>
//             <button onClick={() => refetch()} className="btn-primary">
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
//             {t('common.videos', 'Video Library')}
//           </h1>
//           <p className="text-gray-500">
//             Mushaira, interviews, documentaries, lectures, and more from the world of Urdu literature
//           </p>
//         </div>

//         {/* Search & Controls */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search videos by title, description, or tags..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
//             />
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery('')}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 ×
//               </button>
//             )}
//           </div>
//           <div className="flex items-center gap-2">
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white w-40"
//             >
//               {sortOptions.map(option => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//             <div className="flex border border-gray-300 rounded-lg overflow-hidden">
//               <button
//                 onClick={() => setViewMode('grid')}
//                 className={`p-2.5 ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'}`}
//                 title="Grid View"
//               >
//                 <Grid className="h-5 w-5" />
//               </button>
//               <button
//                 onClick={() => setViewMode('list')}
//                 className={`p-2.5 ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'}`}
//                 title="List View"
//               >
//                 <List className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Categories */}
//         <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-6 pb-2">
//           <button
//             onClick={() => setActiveCategory('all')}
//             className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//               activeCategory === 'all'
//                 ? 'bg-primary-600 text-white'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             All Videos
//           </button>
//           {VIDEO_CATEGORIES.map((cat) => (
//             <button
//               key={cat.id}
//               onClick={() => setActiveCategory(cat.id)}
//               className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//                 activeCategory === cat.id
//                   ? 'bg-primary-600 text-white'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               {cat.label}
//             </button>
//           ))}
//         </div>

//         {/* Results Count */}
//         <div className="flex justify-between items-center mb-4">
//           <p className="text-sm text-gray-500">
//             {searchQuery ? (
//               <>Found {pagination.total || videos.length} result(s) for "<strong>{searchQuery}</strong>"</>
//             ) : (
//               <>Showing {videos.length} of {pagination.total || videos.length} videos</>
//             )}
//           </p>
//           {(searchQuery || activeCategory !== 'all') && (
//             <button
//               onClick={clearFilters}
//               className="text-sm text-primary-600 hover:text-primary-700"
//             >
//               Clear filters
//             </button>
//           )}
//         </div>

//         {/* Videos Grid/List */}
//         {videos.length === 0 ? (
//           <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
//             <Play className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
//             <p className="text-gray-500">
//               {searchQuery 
//                 ? `No videos matching "${searchQuery}" found. Try a different search term.`
//                 : 'No videos available in this category yet.'}
//             </p>
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery('')}
//                 className="mt-4 text-primary-600 hover:text-primary-700"
//               >
//                 Clear search
//               </button>
//             )}
//           </div>
//         ) : (
//           <>
//             <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
//               {videos.map((video, index) => (
//                 <motion.div
//                   key={video._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                 >
//                   <Link to={`/video/${video.slug}`} className="block group">
//                     <div className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all ${viewMode === 'list' ? 'flex gap-4' : ''}`}>
//                       {/* Thumbnail */}
//                       <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'w-full'}`}>
//                         {video.thumbnail ? (
//                           <img
//                             src={video.thumbnail}
//                             alt={video.title}
//                             className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
//                             loading="lazy"
//                           />
//                         ) : (
//                           <div className="w-full aspect-video bg-gray-200 flex items-center justify-center">
//                             <Play className="h-12 w-12 text-gray-400" />
//                           </div>
//                         )}
//                         <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
//                           <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
//                             <Play className="h-5 w-5 text-primary-600 ml-0.5" />
//                           </div>
//                         </div>
//                         {/* Duration Badge */}
//                         {video.duration && (
//                           <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded-md flex items-center gap-1">
//                             <Clock className="h-3 w-3" />
//                             <span>{formatDuration(video.duration)}</span>
//                           </div>
//                         )}
//                         {/* Category Badge */}
//                         <div className="absolute top-2 left-2">
//                           <span className="px-2 py-0.5 bg-white/90 text-gray-700 text-xs font-medium rounded-full capitalize">
//                             {getCategoryDisplayName(video.type)}
//                           </span>
//                         </div>
//                         {/* Premium Badge */}
//                         {video.isPremium && (
//                           <div className="absolute top-2 right-2">
//                             <span className="px-2 py-0.5 bg-yellow-500 text-white text-xs font-medium rounded-full">
//                               Premium
//                             </span>
//                           </div>
//                         )}
//                       </div>

//                       {/* Content */}
//                       <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
//                         <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-1">
//                           {video.title}
//                         </h3>
//                         {video.description && (
//                           <p className="text-sm text-gray-500 line-clamp-2 mb-2">
//                             {video.description}
//                           </p>
//                         )}
//                         {video.author && (
//                           <p className="text-sm text-gray-500 mb-2">
//                             {typeof video.author === 'object' ? video.author.name : video.author}
//                           </p>
//                         )}
//                         <div className="flex items-center gap-3 text-sm text-gray-500">
//                           <span className="flex items-center gap-1">
//                             <Eye className="h-4 w-4" />
//                             {formatViews(video.stats?.views || 0)} views
//                           </span>
//                           {video.language && (
//                             <span className="capitalize">{video.language}</span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Pagination */}
//             {pagination.totalPages > 1 && (
//               <div className="flex items-center justify-center gap-2 mt-8">
//                 <button
//                   onClick={() => goToPage(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <ChevronLeft className="h-5 w-5 text-gray-600" />
//                 </button>
                
//                 <div className="flex items-center gap-1">
//                   {(() => {
//                     const totalPages = pagination.totalPages;
//                     const maxVisible = 5;
//                     let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
//                     let endPage = Math.min(totalPages, startPage + maxVisible - 1);
                    
//                     if (endPage - startPage + 1 < maxVisible) {
//                       startPage = Math.max(1, endPage - maxVisible + 1);
//                     }
                    
//                     const pages = [];
//                     if (startPage > 1) {
//                       pages.push(1);
//                       if (startPage > 2) pages.push('...');
//                     }
                    
//                     for (let i = startPage; i <= endPage; i++) {
//                       pages.push(i);
//                     }
                    
//                     if (endPage < totalPages) {
//                       if (endPage < totalPages - 1) pages.push('...');
//                       pages.push(totalPages);
//                     }
                    
//                     return pages.map((page, idx) => {
//                       if (page === '...') {
//                         return (
//                           <span key={`ellipsis-${idx}`} className="px-3 py-2 text-gray-500">
//                             ...
//                           </span>
//                         );
//                       }
//                       return (
//                         <button
//                           key={page}
//                           onClick={() => goToPage(page)}
//                           className={`min-w-[40px] h-10 rounded-lg font-medium transition-colors ${
//                             currentPage === page
//                               ? 'bg-primary-600 text-white'
//                               : 'text-gray-600 hover:bg-gray-100'
//                           }`}
//                         >
//                           {page}
//                         </button>
//                       );
//                     });
//                   })()}
//                 </div>

//                 <button
//                   onClick={() => goToPage(currentPage + 1)}
//                   disabled={currentPage === pagination.totalPages}
//                   className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <ChevronRight className="h-5 w-5 text-gray-600" />
//                 </button>
//               </div>
//             )}

//             {/* Loading more indicator */}
//             {isLoading && videos.length > 0 && (
//               <div className="flex justify-center mt-8">
//                 <Loader2 className="h-6 w-6 animate-spin text-primary-600" />
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VideoListPage;





















// // client/src/pages/public/VideoListPage.jsx
// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useSearchParams, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useQuery } from '@tanstack/react-query';
// import { 
//   Search, Play, Clock, Eye, Filter, Grid, List, Loader2, 
//   AlertCircle, ChevronLeft, ChevronRight, Mic, MicOff, 
//   Volume2, VolumeX, Headphones, Command, Sparkles, 
//   TrendingUp, Heart, Music, Star, Zap, X, Minimize2, Maximize2
// } from 'lucide-react';
// import videoAPI from '../../api/videoAPI';
// import { VIDEO_CATEGORIES } from '../../utils/constants.js';

// const VideoListPage = () => {
//   const { t } = useTranslation();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [viewMode, setViewMode] = useState('grid');
//   const [sortBy, setSortBy] = useState('popular');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isVoiceActive, setIsVoiceActive] = useState(false);
//   const [voiceStatus, setVoiceStatus] = useState(''); // listening, processing, error
//   const [voiceCommand, setVoiceCommand] = useState('');
//   const [aiSuggestions, setAiSuggestions] = useState([]);
//   const [showAiAssistant, setShowAiAssistant] = useState(false);
//   const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
//   const [miniPlayer, setMiniPlayer] = useState(null);
//   const itemsPerPage = 9;
  
//   const recognitionRef = useRef(null);
//   const audioRef = useRef(null);

//   // Initialize Speech Recognition
//   useEffect(() => {
//     if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
//       const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
//       recognitionRef.current = new SpeechRecognition();
//       recognitionRef.current.continuous = false;
//       recognitionRef.current.interimResults = false;
//       recognitionRef.current.lang = 'en-US';

//       recognitionRef.current.onstart = () => {
//         setIsVoiceActive(true);
//         setVoiceStatus('listening');
//       };

//       recognitionRef.current.onend = () => {
//         setIsVoiceActive(false);
//         setVoiceStatus('');
//       };

//       recognitionRef.current.onresult = (event) => {
//         const transcript = event.results[0][0].transcript.toLowerCase();
//         setVoiceCommand(transcript);
//         processVoiceCommand(transcript);
//         setVoiceStatus('processing');
//         setTimeout(() => setVoiceStatus(''), 2000);
//       };

//       recognitionRef.current.onerror = (event) => {
//         console.error('Speech recognition error:', event.error);
//         setVoiceStatus('error');
//         setIsVoiceActive(false);
//         setTimeout(() => setVoiceStatus(''), 2000);
//       };
//     } else {
//       console.warn('Speech recognition not supported');
//     }

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.abort();
//       }
//     };
//   }, []);

//   // AI Command Processing
//   const processVoiceCommand = async (command) => {
//     console.log('Processing command:', command);
    
//     // Play commands
//     if (command.includes('play') || command.includes('start')) {
//       // Extract search terms
//       let searchTerm = command.replace(/play|start|video|the|a|an/gi, '').trim();
      
//       if (searchTerm) {
//         // Search for matching videos
//         const searchResponse = await videoAPI.getVideos({ 
//           search: searchTerm, 
//           limit: 5 
//         });
//         const videosData = searchResponse?.data?.data || searchResponse?.data || searchResponse || [];
//         const videos = Array.isArray(videosData) ? videosData : [];
        
//         if (videos.length > 0) {
//           playVideoDirectly(videos[0]);
//           showVoiceFeedback(`Playing ${videos[0].title}`);
//         } else {
//           setSearchQuery(searchTerm);
//           showVoiceFeedback(`Searching for ${searchTerm}`);
//         }
//       }
//     }
//     // Stop command
//     else if (command.includes('stop') && currentlyPlaying) {
//       if (audioRef.current) {
//         audioRef.current.pause();
//         audioRef.current.currentTime = 0;
//         setCurrentlyPlaying(null);
//         setMiniPlayer(null);
//         showVoiceFeedback('Video stopped');
//       }
//     }
//     // Pause command
//     else if ((command.includes('pause') || command.includes('hold')) && currentlyPlaying) {
//       if (audioRef.current && !audioRef.current.paused) {
//         audioRef.current.pause();
//         showVoiceFeedback('Video paused');
//       }
//     }
//     // Resume command
//     else if ((command.includes('resume') || command.includes('continue')) && currentlyPlaying) {
//       if (audioRef.current && audioRef.current.paused) {
//         audioRef.current.play();
//         showVoiceFeedback('Video resumed');
//       }
//     }
//     // Volume up
//     else if (command.includes('volume up') || command.includes('louder')) {
//       if (audioRef.current) {
//         audioRef.current.volume = Math.min(1, audioRef.current.volume + 0.1);
//         showVoiceFeedback(`Volume increased to ${Math.round(audioRef.current.volume * 100)}%`);
//       }
//     }
//     // Volume down
//     else if (command.includes('volume down') || command.includes('quieter')) {
//       if (audioRef.current) {
//         audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.1);
//         showVoiceFeedback(`Volume decreased to ${Math.round(audioRef.current.volume * 100)}%`);
//       }
//     }
//     // Mute
//     else if (command.includes('mute')) {
//       if (audioRef.current) {
//         audioRef.current.muted = true;
//         showVoiceFeedback('Video muted');
//       }
//     }
//     // Unmute
//     else if (command.includes('unmute')) {
//       if (audioRef.current) {
//         audioRef.current.muted = false;
//         showVoiceFeedback('Video unmuted');
//       }
//     }
//     // Search commands
//     else if (command.includes('search for') || command.includes('find')) {
//       let searchTerm = command.replace(/search for|find|videos about|videos of/gi, '').trim();
//       setSearchQuery(searchTerm);
//       setCurrentPage(1);
//       showVoiceFeedback(`Searching for ${searchTerm}`);
//     }
//     // Top popular
//     else if (command.includes('top popular') || command.includes('most popular') || command.includes('trending')) {
//       setSortBy('popular');
//       setActiveCategory('all');
//       setSearchQuery('');
//       setCurrentPage(1);
//       showVoiceFeedback('Showing most popular videos');
//     }
//     // Latest/Recent
//     else if (command.includes('latest') || command.includes('newest') || command.includes('recent')) {
//       setSortBy('recent');
//       setCurrentPage(1);
//       showVoiceFeedback('Showing latest videos');
//     }
//     // Category selection
//     else if (command.includes('show') || command.includes('category')) {
//       for (const cat of VIDEO_CATEGORIES) {
//         if (command.includes(cat.id) || command.includes(cat.label.toLowerCase())) {
//           setActiveCategory(cat.id);
//           setCurrentPage(1);
//           showVoiceFeedback(`Showing ${cat.label} videos`);
//           break;
//         }
//       }
//     }
//     // Next page
//     else if (command.includes('next page') || command.includes('go to next')) {
//       if (currentPage < (pagination.totalPages || 1)) {
//         setCurrentPage(currentPage + 1);
//         showVoiceFeedback(`Page ${currentPage + 1}`);
//       }
//     }
//     // Previous page
//     else if (command.includes('previous page') || command.includes('go back')) {
//       if (currentPage > 1) {
//         setCurrentPage(currentPage - 1);
//         showVoiceFeedback(`Page ${currentPage - 1}`);
//       }
//     }
//     // AI Suggestions based on mood
//     else if (command.includes('sad song') || command.includes('emotional')) {
//       setSearchQuery('sad poetry emotional');
//       setCurrentPage(1);
//       showVoiceFeedback('Showing emotional and sad videos');
//     }
//     else if (command.includes('happy') || command.includes('funny')) {
//       setSearchQuery('funny comedy happy');
//       setCurrentPage(1);
//       showVoiceFeedback('Showing happy and entertaining videos');
//     }
//     else if (command.includes('romantic') || command.includes('love')) {
//       setSearchQuery('romantic love poetry');
//       setCurrentPage(1);
//       showVoiceFeedback('Showing romantic videos');
//     }
//     else if (command.includes('motivational') || command.includes('inspirational')) {
//       setSearchQuery('motivational inspirational lecture');
//       setCurrentPage(1);
//       showVoiceFeedback('Showing motivational videos');
//     }
//     // Help command
//     else if (command.includes('help') || command.includes('what can I say')) {
//       showVoiceFeedback('You can say: play [video name], search for [topic], show popular videos, or pause, resume, stop');
//     }
//     // Default: Show AI suggestions
//     else if (command.length > 3) {
//       generateAISuggestions(command);
//       showVoiceFeedback(`Searching for ${command}`);
//       setSearchQuery(command);
//       setCurrentPage(1);
//     }
//   };

//   // Generate AI suggestions based on voice input
//   const generateAISuggestions = (query) => {
//     const suggestions = [];
    
//     // Common patterns
//     if (query.includes('poetry')) {
//       suggestions.push('Famous Urdu poetry videos', 'Mushaira recordings', 'Classic poets');
//     }
//     if (query.includes('interview')) {
//       suggestions.push('Poet interviews', 'Literary discussions', 'Author talks');
//     }
//     if (query.includes('documentary')) {
//       suggestions.push('Literary documentaries', 'Poet biographies', 'Cultural heritage');
//     }
    
//     // Default suggestions
//     suggestions.push(`Videos about "${query}"`, `Related content`, `Popular in this category`);
    
//     setAiSuggestions(suggestions.slice(0, 3));
//     setTimeout(() => setAiSuggestions([]), 5000);
//   };

//   // Show voice feedback
//   const showVoiceFeedback = (message) => {
//     if ('speechSynthesis' in window) {
//       const utterance = new SpeechSynthesisUtterance(message);
//       utterance.lang = 'en-US';
//       utterance.rate = 0.9;
//       window.speechSynthesis.cancel();
//       window.speechSynthesis.speak(utterance);
//     }
//     setVoiceCommand(message);
//     setTimeout(() => setVoiceCommand(''), 3000);
//   };

//   // Direct video playback
//   const playVideoDirectly = async (video) => {
//     try {
//       const streamData = await videoAPI.getVideoStream(video.slug);
//       const videoUrl = streamData?.data?.streamUrl || streamData?.streamUrl;
      
//       if (videoUrl) {
//         setCurrentlyPlaying(video);
//         setMiniPlayer({
//           video: video,
//           url: videoUrl
//         });
//         showVoiceFeedback(`Now playing ${video.title}`);
        
//         // Scroll to mini player
//         setTimeout(() => {
//           const playerElement = document.getElementById('mini-player');
//           if (playerElement) {
//             playerElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
//           }
//         }, 100);
//       }
//     } catch (error) {
//       console.error('Error playing video:', error);
//       showVoiceFeedback('Sorry, unable to play this video');
//     }
//   };

//   // Start voice recognition
//   const startVoiceRecognition = () => {
//     if (recognitionRef.current) {
//       try {
//         recognitionRef.current.start();
//       } catch (error) {
//         console.error('Error starting recognition:', error);
//         setVoiceStatus('error');
//       }
//     } else {
//       alert('Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
//     }
//   };

//   // Stop voice recognition
//   const stopVoiceRecognition = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//     }
//     setIsVoiceActive(false);
//   };

//   // Get sort mapping for API
//   const getSortMapping = (sortValue) => {
//     switch (sortValue) {
//       case 'recent':
//         return '-createdAt';
//       case 'views':
//         return '-stats.views';
//       case 'longest':
//         return '-duration';
//       case 'shortest':
//         return 'duration';
//       case 'popular':
//       default:
//         return '-stats.views';
//     }
//   };

//   // Fetch videos - INCLUDE searchQuery in queryKey
//   const { data: response, isLoading, error, refetch } = useQuery({
//     queryKey: ['videos', currentPage, activeCategory, sortBy, searchQuery],
//     queryFn: () => videoAPI.getVideos({
//       page: currentPage,
//       limit: itemsPerPage,
//       type: activeCategory !== 'all' ? activeCategory.toLowerCase() : undefined,
//       search: searchQuery || undefined,
//       sort: sortBy
//     }),
//     enabled: true,
//     staleTime: 30000,
//     keepPreviousData: true
//   });

//   // Extract videos and pagination from response
//   const videosData = response?.data?.data || response?.data || response || [];
//   const videos = Array.isArray(videosData) ? videosData : [];
//   const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 };

//   // Update URL when category changes
//   useEffect(() => {
//     if (activeCategory && activeCategory !== 'all') {
//       setSearchParams({ category: activeCategory });
//     } else {
//       setSearchParams({});
//     }
//     setCurrentPage(1);
//   }, [activeCategory, setSearchParams]);

//   // Reset to page 1 when search query changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery]);

//   // Format duration from seconds
//   const formatDuration = (seconds) => {
//     if (!seconds) return 'N/A';
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     if (hrs > 0) {
//       return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//     }
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Format view count
//   const formatViews = (views) => {
//     if (!views) return '0';
//     if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
//     if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
//     return views.toString();
//   };

//   // Clear filters
//   const clearFilters = () => {
//     setSearchQuery('');
//     setActiveCategory('all');
//     setSortBy('popular');
//     setCurrentPage(1);
//   };

//   // Sort options
//   const sortOptions = [
//     { value: 'popular', label: 'Most Popular', icon: TrendingUp },
//     { value: 'recent', label: 'Most Recent', icon: Clock },
//     { value: 'views', label: 'Most Viewed', icon: Eye },
//     { value: 'longest', label: 'Longest', icon: Clock },
//     { value: 'shortest', label: 'Shortest', icon: Clock }
//   ];

//   // Get category display name
//   const getCategoryDisplayName = (type) => {
//     const category = VIDEO_CATEGORIES.find(cat => cat.id === type?.toLowerCase());
//     return category?.label || type || 'Video';
//   };

//   // Voice command suggestions
//   const voiceSuggestions = [
//     { command: "Play sad song video", icon: Music },
//     { command: "Show most popular videos", icon: TrendingUp },
//     { command: "Search for poetry", icon: Search },
//     { command: "Pause video", icon: Volume2 },
//     { command: "Resume video", icon: Play },
//     { command: "Stop video", icon: X },
//     { command: "Volume up", icon: Volume2 },
//     { command: "Show latest videos", icon: Sparkles },
//     { command: "Next page", icon: ChevronRight },
//   ];

//   // Close mini player
//   const closeMiniPlayer = () => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       audioRef.current.src = '';
//     }
//     setCurrentlyPlaying(null);
//     setMiniPlayer(null);
//   };

//   // Loading state
//   if (isLoading && videos.length === 0) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-center min-h-[60vh]">
//             <div className="text-center">
//               <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
//               <p className="text-gray-500">Loading videos...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Mini Player */}
//         {miniPlayer && (
//           <div id="mini-player" className="fixed bottom-4 right-4 z-50 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-slide-up">
//             <div className="relative">
//               {miniPlayer.video.thumbnail ? (
//                 <img src={miniPlayer.video.thumbnail} alt={miniPlayer.video.title} className="w-full h-40 object-cover" />
//               ) : (
//                 <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
//                   <Play className="h-12 w-12 text-gray-400" />
//                 </div>
//               )}
//               <button
//                 onClick={closeMiniPlayer}
//                 className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
//               >
//                 <X className="h-4 w-4 text-white" />
//               </button>
//             </div>
//             <div className="p-3">
//               <h4 className="font-medium text-gray-900 text-sm line-clamp-1">{miniPlayer.video.title}</h4>
//               <audio
//                 ref={audioRef}
//                 src={miniPlayer.url}
//                 controls
//                 autoPlay
//                 className="w-full mt-2"
//                 onEnded={() => closeMiniPlayer()}
//               />
//             </div>
//           </div>
//         )}

//         {/* Header with Voice Assistant */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between flex-wrap gap-4">
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
//                 Video Library
//               </h1>
//               <p className="text-gray-500">
//                 Mushaira, interviews, documentaries, lectures, and more from the world of Urdu literature
//               </p>
//             </div>
            
//             {/* Voice Assistant Button */}
//             <div className="relative">
//               <button
//                 onClick={isVoiceActive ? stopVoiceRecognition : startVoiceRecognition}
//                 className={`relative group flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all ${
//                   isVoiceActive 
//                     ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse' 
//                     : 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg hover:shadow-xl'
//                 }`}
//               >
//                 {isVoiceActive ? (
//                   <MicOff className="h-5 w-5" />
//                 ) : (
//                   <Mic className="h-5 w-5" />
//                 )}
//                 <span>{isVoiceActive ? 'Listening...' : 'Voice Assistant'}</span>
//                 <Command className="h-4 w-4 opacity-75" />
//               </button>
              
//               {/* Voice Status Indicator */}
//               {voiceStatus && (
//                 <div className="absolute -bottom-8 left-0 right-0 text-center text-sm">
//                   {voiceStatus === 'listening' && (
//                     <span className="text-green-600 animate-pulse">🔴 Listening...</span>
//                   )}
//                   {voiceStatus === 'processing' && (
//                     <span className="text-blue-600">⚙️ Processing...</span>
//                   )}
//                   {voiceStatus === 'error' && (
//                     <span className="text-red-600">❌ Error, please try again</span>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Voice Command Display */}
//         {voiceCommand && (
//           <motion.div 
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mb-4 p-3 bg-primary-50 border border-primary-200 rounded-lg"
//           >
//             <div className="flex items-center gap-2">
//               <Sparkles className="h-4 w-4 text-primary-600" />
//               <span className="text-sm text-gray-600">Command received:</span>
//               <span className="text-sm font-medium text-primary-700">"{voiceCommand}"</span>
//             </div>
//           </motion.div>
//         )}

//         {/* AI Suggestions */}
//         {aiSuggestions.length > 0 && (
//           <motion.div 
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-lg"
//           >
//             <div className="flex items-center gap-2 mb-2">
//               <Sparkles className="h-4 w-4 text-purple-600" />
//               <span className="text-sm font-medium text-purple-700">AI Suggestions</span>
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {aiSuggestions.map((suggestion, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => setSearchQuery(suggestion)}
//                   className="px-3 py-1.5 bg-white border border-purple-200 rounded-full text-sm text-purple-700 hover:bg-purple-100 transition-colors"
//                 >
//                   {suggestion}
//                 </button>
//               ))}
//             </div>
//           </motion.div>
//         )}

//         {/* Voice Command Suggestions Quick Access */}
//         <div className="mb-6 overflow-x-auto scrollbar-hide">
//           <div className="flex gap-2 pb-2">
//             {voiceSuggestions.map((suggestion, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => processVoiceCommand(suggestion.command.toLowerCase())}
//                 className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-gray-50 hover:border-primary-300 transition-all whitespace-nowrap"
//               >
//                 <suggestion.icon className="h-3.5 w-3.5" />
//                 <span>{suggestion.command}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Search & Controls */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search videos by title, description, or tags... (Try voice search!)"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
//             />
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery('')}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//             )}
//           </div>
//           <div className="flex items-center gap-2">
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white w-40"
//             >
//               {sortOptions.map(option => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//             <div className="flex border border-gray-300 rounded-lg overflow-hidden">
//               <button
//                 onClick={() => setViewMode('grid')}
//                 className={`p-2.5 ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'}`}
//                 title="Grid View"
//               >
//                 <Grid className="h-5 w-5" />
//               </button>
//               <button
//                 onClick={() => setViewMode('list')}
//                 className={`p-2.5 ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'}`}
//                 title="List View"
//               >
//                 <List className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Categories */}
//         <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-6 pb-2">
//           <button
//             onClick={() => setActiveCategory('all')}
//             className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//               activeCategory === 'all'
//                 ? 'bg-primary-600 text-white shadow-md'
//                 : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
//             }`}
//           >
//             All Videos
//           </button>
//           {VIDEO_CATEGORIES.map((cat) => (
//             <button
//               key={cat.id}
//               onClick={() => setActiveCategory(cat.id)}
//               className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//                 activeCategory === cat.id
//                   ? 'bg-primary-600 text-white shadow-md'
//                   : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
//               }`}
//             >
//               {cat.label}
//             </button>
//           ))}
//         </div>

//         {/* Results Count */}
//         <div className="flex justify-between items-center mb-4">
//           <p className="text-sm text-gray-500">
//             {searchQuery ? (
//               <>Found {pagination.total || videos.length} result(s) for "<strong>{searchQuery}</strong>"</>
//             ) : (
//               <>Showing {videos.length} of {pagination.total || videos.length} videos</>
//             )}
//           </p>
//           {(searchQuery || activeCategory !== 'all') && (
//             <button
//               onClick={clearFilters}
//               className="text-sm text-primary-600 hover:text-primary-700"
//             >
//               Clear filters
//             </button>
//           )}
//         </div>

//         {/* Videos Grid/List */}
//         {videos.length === 0 ? (
//           <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
//             <Play className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
//             <p className="text-gray-500">
//               {searchQuery 
//                 ? `No videos matching "${searchQuery}" found. Try a different search term or use voice search.`
//                 : 'No videos available in this category yet.'}
//             </p>
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery('')}
//                 className="mt-4 text-primary-600 hover:text-primary-700"
//               >
//                 Clear search
//               </button>
//             )}
//           </div>
//         ) : (
//           <>
//             <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
//               {videos.map((video, index) => (
//                 <motion.div
//                   key={video._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                 >
//                   <Link to={`/video/${video.slug}`} className="block group">
//                     <div className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${viewMode === 'list' ? 'flex gap-4' : ''}`}>
//                       {/* Thumbnail */}
//                       <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'w-full'}`}>
//                         {video.thumbnail ? (
//                           <img
//                             src={video.thumbnail}
//                             alt={video.title}
//                             className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
//                             loading="lazy"
//                           />
//                         ) : (
//                           <div className="w-full aspect-video bg-gray-200 flex items-center justify-center">
//                             <Play className="h-12 w-12 text-gray-400" />
//                           </div>
//                         )}
//                         <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
//                           <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
//                             <Play className="h-5 w-5 text-primary-600 ml-0.5" />
//                           </div>
//                         </div>
//                         {/* Duration Badge */}
//                         {video.duration && (
//                           <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded-md flex items-center gap-1">
//                             <Clock className="h-3 w-3" />
//                             <span>{formatDuration(video.duration)}</span>
//                           </div>
//                         )}
//                         {/* Category Badge */}
//                         <div className="absolute top-2 left-2">
//                           <span className="px-2 py-0.5 bg-white/90 text-gray-700 text-xs font-medium rounded-full capitalize">
//                             {getCategoryDisplayName(video.type)}
//                           </span>
//                         </div>
//                         {/* Premium Badge */}
//                         {video.isPremium && (
//                           <div className="absolute top-2 right-2">
//                             <span className="px-2 py-0.5 bg-yellow-500 text-white text-xs font-medium rounded-full">
//                               Premium
//                             </span>
//                           </div>
//                         )}
//                       </div>

//                       {/* Content */}
//                       <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
//                         <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-1">
//                           {video.title}
//                         </h3>
//                         {video.description && (
//                           <p className="text-sm text-gray-500 line-clamp-2 mb-2">
//                             {video.description}
//                           </p>
//                         )}
//                         {video.author && (
//                           <p className="text-sm text-gray-500 mb-2">
//                             {typeof video.author === 'object' ? video.author.name : video.author}
//                           </p>
//                         )}
//                         <div className="flex items-center gap-3 text-sm text-gray-500">
//                           <span className="flex items-center gap-1">
//                             <Eye className="h-4 w-4" />
//                             {formatViews(video.stats?.views || 0)} views
//                           </span>
//                           {video.language && (
//                             <span className="capitalize">{video.language}</span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Pagination */}
//             {pagination.totalPages > 1 && (
//               <div className="flex items-center justify-center gap-2 mt-8">
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//                   disabled={currentPage === 1}
//                   className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <ChevronLeft className="h-5 w-5 text-gray-600" />
//                 </button>
                
//                 <div className="flex items-center gap-1">
//                   {(() => {
//                     const totalPages = pagination.totalPages;
//                     const maxVisible = 5;
//                     let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
//                     let endPage = Math.min(totalPages, startPage + maxVisible - 1);
                    
//                     if (endPage - startPage + 1 < maxVisible) {
//                       startPage = Math.max(1, endPage - maxVisible + 1);
//                     }
                    
//                     const pages = [];
//                     if (startPage > 1) {
//                       pages.push(1);
//                       if (startPage > 2) pages.push('...');
//                     }
                    
//                     for (let i = startPage; i <= endPage; i++) {
//                       pages.push(i);
//                     }
                    
//                     if (endPage < totalPages) {
//                       if (endPage < totalPages - 1) pages.push('...');
//                       pages.push(totalPages);
//                     }
                    
//                     return pages.map((page, idx) => {
//                       if (page === '...') {
//                         return (
//                           <span key={`ellipsis-${idx}`} className="px-3 py-2 text-gray-500">
//                             ...
//                           </span>
//                         );
//                       }
//                       return (
//                         <button
//                           key={page}
//                           onClick={() => setCurrentPage(page)}
//                           className={`min-w-[40px] h-10 rounded-lg font-medium transition-colors ${
//                             currentPage === page
//                               ? 'bg-primary-600 text-white shadow-md'
//                               : 'text-gray-600 hover:bg-gray-100'
//                           }`}
//                         >
//                           {page}
//                         </button>
//                       );
//                     });
//                   })()}
//                 </div>

//                 <button
//                   onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
//                   disabled={currentPage === pagination.totalPages}
//                   className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <ChevronRight className="h-5 w-5 text-gray-600" />
//                 </button>
//               </div>
//             )}

//             {/* Loading indicator */}
//             {isLoading && videos.length > 0 && (
//               <div className="flex justify-center mt-8">
//                 <Loader2 className="h-6 w-6 animate-spin text-primary-600" />
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Add animation styles */}
//       <style jsx>{`
//         @keyframes slide-up {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-slide-up {
//           animation: slide-up 0.3s ease-out;
//         }
//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.5; }
//         }
//         .animate-pulse {
//           animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default VideoListPage;
























// // client/src/pages/public/VideoListPage.jsx
// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useSearchParams, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useQuery } from '@tanstack/react-query';
// import ReactPlayer from 'react-player';
// import { 
//   Search, Play, Clock, Eye, Grid, List, Loader2, 
//   AlertCircle, ChevronLeft, ChevronRight, Mic, MicOff, 
//   Volume2, VolumeX, X, Sparkles, TrendingUp, Music,
//   Pause, Square, Maximize2, Minimize2, Youtube, FileVideo
// } from 'lucide-react';
// import videoAPI from '../../api/videoAPI';
// import { VIDEO_CATEGORIES } from '../../utils/constants.js';

// const VideoListPage = () => {
//   const { t } = useTranslation();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [viewMode, setViewMode] = useState('grid');
//   const [sortBy, setSortBy] = useState('popular');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isVoiceActive, setIsVoiceActive] = useState(false);
//   const [voiceStatus, setVoiceStatus] = useState('');
//   const [voiceCommand, setVoiceCommand] = useState('');
//   const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [playerVolume, setPlayerVolume] = useState(0.7);
//   const [isMuted, setIsMuted] = useState(false);
//   const [playedSeconds, setPlayedSeconds] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  
//   const itemsPerPage = 9;
//   const recognitionRef = useRef(null);
//   const playerRef = useRef(null);

//   // Initialize Speech Recognition
//   useEffect(() => {
//     if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
//       const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
//       recognitionRef.current = new SpeechRecognition();
//       recognitionRef.current.continuous = false;
//       recognitionRef.current.interimResults = false;
//       recognitionRef.current.lang = 'en-US';

//       recognitionRef.current.onstart = () => {
//         setIsVoiceActive(true);
//         setVoiceStatus('listening');
//       };

//       recognitionRef.current.onend = () => {
//         setIsVoiceActive(false);
//         setTimeout(() => setVoiceStatus(''), 1000);
//       };

//       recognitionRef.current.onresult = (event) => {
//         const transcript = event.results[0][0].transcript.toLowerCase();
//         setVoiceCommand(transcript);
//         processVoiceCommand(transcript);
//         setVoiceStatus('processing');
//         setTimeout(() => setVoiceStatus(''), 2000);
//       };

//       recognitionRef.current.onerror = (event) => {
//         console.error('Speech recognition error:', event.error);
//         setVoiceStatus('error');
//         setIsVoiceActive(false);
//         setTimeout(() => setVoiceStatus(''), 2000);
//       };
//     }

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.abort();
//       }
//     };
//   }, []);

//   // Process voice commands
//   const processVoiceCommand = async (command) => {
//     console.log('Processing command:', command);
    
//     // Play commands
//     if (command.includes('play')) {
//       let searchTerm = command.replace(/play|start|video|the|a|an/gi, '').trim();
      
//       if (searchTerm) {
//         // Fuzzy search for videos
//         const searchResponse = await videoAPI.getVideos({ 
//           search: searchTerm, 
//           limit: 5 
//         });
//         const videosData = searchResponse?.data?.data || searchResponse?.data || searchResponse || [];
//         const videos = Array.isArray(videosData) ? videosData : [];
        
//         if (videos.length > 0) {
//           playVideo(videos[0]);
//           speak(`Playing ${videos[0].title}`);
//         } else {
//           setSearchQuery(searchTerm);
//           speak(`Searching for ${searchTerm}`);
//         }
//       }
//     }
//     // Stop command
//     else if (command.includes('stop')) {
//       stopVideo();
//       speak('Video stopped');
//     }
//     // Pause command
//     else if (command.includes('pause')) {
//       pauseVideo();
//       speak('Video paused');
//     }
//     // Resume command
//     else if (command.includes('resume') || command.includes('continue')) {
//       resumeVideo();
//       speak('Video resumed');
//     }
//     // Volume up
//     else if (command.includes('volume up')) {
//       setPlayerVolume(prev => Math.min(1, prev + 0.1));
//       speak(`Volume increased to ${Math.round((playerVolume + 0.1) * 100)}%`);
//     }
//     // Volume down
//     else if (command.includes('volume down')) {
//       setPlayerVolume(prev => Math.max(0, prev - 0.1));
//       speak(`Volume decreased to ${Math.round((playerVolume - 0.1) * 100)}%`);
//     }
//     // Mute
//     else if (command.includes('mute')) {
//       setIsMuted(true);
//       speak('Video muted');
//     }
//     // Unmute
//     else if (command.includes('unmute')) {
//       setIsMuted(false);
//       speak('Video unmuted');
//     }
//     // Search commands with fuzzy matching
//     else if (command.includes('search for')) {
//       let searchTerm = command.replace(/search for|find/gi, '').trim();
//       setSearchQuery(searchTerm);
//       setCurrentPage(1);
//       speak(`Searching for ${searchTerm}`);
//     }
//     // Category commands with fuzzy matching
//     else if (command.includes('mushaira') || command.includes('mushyr') || command.includes('mushayara')) {
//       setActiveCategory('mushaira');
//       setCurrentPage(1);
//       speak('Showing Mushaira videos');
//     }
//     else if (command.includes('interview')) {
//       setActiveCategory('interview');
//       setCurrentPage(1);
//       speak('Showing interviews');
//     }
//     else if (command.includes('documentary')) {
//       setActiveCategory('documentary');
//       setCurrentPage(1);
//       speak('Showing documentaries');
//     }
//     else if (command.includes('lecture')) {
//       setActiveCategory('lecture');
//       setCurrentPage(1);
//       speak('Showing lectures');
//     }
//     // Popular videos
//     else if (command.includes('popular') || command.includes('trending') || command.includes('top')) {
//       setSortBy('popular');
//       setActiveCategory('all');
//       setSearchQuery('');
//       setCurrentPage(1);
//       speak('Showing most popular videos');
//     }
//     // Latest videos
//     else if (command.includes('latest') || command.includes('newest') || command.includes('recent')) {
//       setSortBy('recent');
//       setCurrentPage(1);
//       speak('Showing latest videos');
//     }
//     // Sad songs / emotional content
//     else if (command.includes('sad') || command.includes('emotional')) {
//       setSearchQuery('sad poetry emotional');
//       setCurrentPage(1);
//       speak('Showing emotional and sad videos');
//     }
//     // Happy content
//     else if (command.includes('happy') || command.includes('funny')) {
//       setSearchQuery('funny comedy');
//       setCurrentPage(1);
//       speak('Showing happy and entertaining videos');
//     }
//     // Help
//     else if (command.includes('help')) {
//       speak('You can say: play video name, search for topic, show popular videos, pause, resume, stop, volume up, or volume down');
//     }
//   };

//   // Speak text
//   const speak = (message) => {
//     if ('speechSynthesis' in window) {
//       const utterance = new SpeechSynthesisUtterance(message);
//       utterance.lang = 'en-US';
//       utterance.rate = 0.9;
//       window.speechSynthesis.cancel();
//       window.speechSynthesis.speak(utterance);
//     }
//   };

//   // Video playback controls
//   const playVideo = (video) => {
//     setCurrentlyPlaying(video);
//     setShowMiniPlayer(true);
//     setIsPlaying(true);
//   };

//   const pauseVideo = () => {
//     setIsPlaying(false);
//   };

//   const resumeVideo = () => {
//     setIsPlaying(true);
//   };

//   const stopVideo = () => {
//     setIsPlaying(false);
//     setCurrentlyPlaying(null);
//     setShowMiniPlayer(false);
//     setPlayedSeconds(0);
//   };

//   const closeMiniPlayer = () => {
//     setIsPlaying(false);
//     setCurrentlyPlaying(null);
//     setShowMiniPlayer(false);
//     setPlayedSeconds(0);
//   };

//   const startVoiceRecognition = () => {
//     if (recognitionRef.current) {
//       try {
//         recognitionRef.current.start();
//       } catch (error) {
//         console.error('Error starting recognition:', error);
//         setVoiceStatus('error');
//       }
//     } else {
//       alert('Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
//     }
//   };

//   const stopVoiceRecognition = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//     }
//     setIsVoiceActive(false);
//   };

//   // Get sort mapping
//   const getSortMapping = (sortValue) => {
//     switch (sortValue) {
//       case 'recent':
//         return '-createdAt';
//       case 'views':
//         return '-stats.views';
//       case 'longest':
//         return '-duration';
//       case 'shortest':
//         return 'duration';
//       default:
//         return '-stats.views';
//     }
//   };

//   // Fetch videos with fuzzy search
//   const { data: response, isLoading, error, refetch } = useQuery({
//     queryKey: ['videos', currentPage, activeCategory, sortBy, searchQuery],
//     queryFn: () => videoAPI.getVideos({
//       page: currentPage,
//       limit: itemsPerPage,
//       type: activeCategory !== 'all' ? activeCategory : undefined,
//       search: searchQuery || undefined,
//       sort: sortBy
//     }),
//     enabled: true,
//     staleTime: 30000,
//     keepPreviousData: true
//   });

//   const videosData = response?.data?.data || response?.data || response || [];
//   const videos = Array.isArray(videosData) ? videosData : [];
//   const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 };

//   // Update URL when category changes
//   useEffect(() => {
//     if (activeCategory && activeCategory !== 'all') {
//       setSearchParams({ category: activeCategory });
//     } else {
//       setSearchParams({});
//     }
//     setCurrentPage(1);
//   }, [activeCategory, setSearchParams]);

//   // Reset to page 1 when search changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery]);

//   // Format duration
//   const formatDuration = (seconds) => {
//     if (!seconds) return 'N/A';
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     if (hrs > 0) {
//       return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//     }
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Format views
//   const formatViews = (views) => {
//     if (!views) return '0';
//     if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
//     if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
//     return views.toString();
//   };

//   const clearFilters = () => {
//     setSearchQuery('');
//     setActiveCategory('all');
//     setSortBy('popular');
//     setCurrentPage(1);
//   };

//   const sortOptions = [
//     { value: 'popular', label: 'Most Popular', icon: TrendingUp },
//     { value: 'recent', label: 'Most Recent', icon: Clock },
//     { value: 'views', label: 'Most Viewed', icon: Eye }
//   ];

//   const getCategoryDisplayName = (type) => {
//     const category = VIDEO_CATEGORIES.find(cat => cat.id === type?.toLowerCase());
//     return category?.label || type || 'Video';
//   };

//   // Voice command suggestions
//   const voiceSuggestions = [
//     { command: "Play video", icon: Play },
//     { command: "Search for Mushaira", icon: Search },
//     { command: "Show popular videos", icon: TrendingUp },
//     { command: "Pause", icon: Pause },
//     { command: "Resume", icon: Play },
//     { command: "Stop", icon: Square },
//     { command: "Volume up", icon: Volume2 },
//     { command: "Show latest videos", icon: Sparkles }
//   ];

//   if (isLoading && videos.length === 0) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-center min-h-[60vh]">
//             <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
//             <p className="text-gray-500">Loading videos...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Mini Player */}
//         {showMiniPlayer && currentlyPlaying && (
//           <div className="fixed bottom-4 right-4 z-50 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-slide-up">
//             <div className="relative">
//               <button
//                 onClick={closeMiniPlayer}
//                 className="absolute top-2 right-2 z-10 p-1.5 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
//               >
//                 <X className="h-4 w-4 text-white" />
//               </button>
//               <ReactPlayer
//                 ref={playerRef}
//                 url={currentlyPlaying.videoUrl}
//                 playing={isPlaying}
//                 volume={isMuted ? 0 : playerVolume}
//                 width="100%"
//                 height="200px"
//                 controls={true}
//                 config={{
//                   youtube: {
//                     playerVars: { showinfo: 1, controls: 1, modestbranding: 1 }
//                   }
//                 }}
//                 onEnded={() => stopVideo()}
//                 onProgress={({ playedSeconds }) => setPlayedSeconds(playedSeconds)}
//                 onDuration={(d) => setDuration(d)}
//               />
//               <div className="p-3 bg-white">
//                 <h4 className="font-medium text-gray-900 text-sm line-clamp-1">{currentlyPlaying.title}</h4>
//                 <div className="flex items-center gap-3 mt-2">
//                   <button
//                     onClick={() => setIsPlaying(!isPlaying)}
//                     className="p-1.5 rounded-lg bg-primary-600 text-white hover:bg-primary-700"
//                   >
//                     {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
//                   </button>
//                   <button
//                     onClick={() => setIsMuted(!isMuted)}
//                     className="p-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
//                   >
//                     {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
//                   </button>
//                   <input
//                     type="range"
//                     min="0"
//                     max="1"
//                     step="0.01"
//                     value={playerVolume}
//                     onChange={(e) => setPlayerVolume(parseFloat(e.target.value))}
//                     className="w-24 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between flex-wrap gap-4">
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
//                 Video Library
//               </h1>
//               <p className="text-gray-500">
//                 Mushaira, interviews, documentaries, lectures, and more from Urdu literature
//               </p>
//             </div>
            
//             {/* Voice Assistant Button */}
//             <div className="relative">
//               <button
//                 onClick={isVoiceActive ? stopVoiceRecognition : startVoiceRecognition}
//                 className={`relative group flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all ${
//                   isVoiceActive 
//                     ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse' 
//                     : 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg hover:shadow-xl'
//                 }`}
//               >
//                 {isVoiceActive ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
//                 <span>{isVoiceActive ? 'Listening...' : 'Voice Assistant'}</span>
//               </button>
              
//               {voiceStatus === 'listening' && (
//                 <div className="absolute -bottom-8 left-0 right-0 text-center">
//                   <span className="text-xs text-green-600 animate-pulse">🔴 Listening... Speak now</span>
//                 </div>
//               )}
//               {voiceStatus === 'processing' && (
//                 <div className="absolute -bottom-8 left-0 right-0 text-center">
//                   <span className="text-xs text-blue-600">⚙️ Processing...</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Voice Command Display */}
//         {voiceCommand && (
//           <motion.div 
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mb-4 p-3 bg-primary-50 border border-primary-200 rounded-lg"
//           >
//             <div className="flex items-center gap-2">
//               <Mic className="h-4 w-4 text-primary-600" />
//               <span className="text-sm text-gray-600">You said:</span>
//               <span className="text-sm font-medium text-primary-700">"{voiceCommand}"</span>
//             </div>
//           </motion.div>
//         )}

//         {/* Voice Command Suggestions */}
//         <div className="mb-6 overflow-x-auto">
//           <div className="flex gap-2 pb-2">
//             {voiceSuggestions.map((suggestion, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => processVoiceCommand(suggestion.command.toLowerCase())}
//                 className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-gray-50 hover:border-primary-300 transition-all whitespace-nowrap"
//               >
//                 <suggestion.icon className="h-3.5 w-3.5" />
//                 <span>{suggestion.command}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Search & Controls */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search videos... (Try 'mushyr' for Mushaira)"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white"
//             />
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery('')}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//             )}
//           </div>
//           <div className="flex items-center gap-2">
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="px-4 py-2.5 border border-gray-200 rounded-lg bg-white"
//             >
//               {sortOptions.map(option => (
//                 <option key={option.value} value={option.value}>{option.label}</option>
//               ))}
//             </select>
//             <div className="flex border border-gray-300 rounded-lg overflow-hidden">
//               <button
//                 onClick={() => setViewMode('grid')}
//                 className={`p-2.5 ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-600'}`}
//               >
//                 <Grid className="h-5 w-5" />
//               </button>
//               <button
//                 onClick={() => setViewMode('list')}
//                 className={`p-2.5 ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-600'}`}
//               >
//                 <List className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Categories */}
//         <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
//           <button
//             onClick={() => setActiveCategory('all')}
//             className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//               activeCategory === 'all'
//                 ? 'bg-primary-600 text-white shadow-md'
//                 : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
//             }`}
//           >
//             All Videos
//           </button>
//           {VIDEO_CATEGORIES.map((cat) => (
//             <button
//               key={cat.id}
//               onClick={() => setActiveCategory(cat.id)}
//               className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//                 activeCategory === cat.id
//                   ? 'bg-primary-600 text-white shadow-md'
//                   : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
//               }`}
//             >
//               {cat.label}
//             </button>
//           ))}
//         </div>

//         {/* Results Count */}
//         <div className="flex justify-between items-center mb-4">
//           <p className="text-sm text-gray-500">
//             {searchQuery ? (
//               <>Found {pagination.total || videos.length} result(s) for "<strong>{searchQuery}</strong>"</>
//             ) : (
//               <>Showing {videos.length} of {pagination.total || videos.length} videos</>
//             )}
//           </p>
//           {(searchQuery || activeCategory !== 'all') && (
//             <button onClick={clearFilters} className="text-sm text-primary-600 hover:text-primary-700">
//               Clear filters
//             </button>
//           )}
//         </div>

//         {/* Videos Grid */}
//         {videos.length === 0 ? (
//           <div className="text-center py-12 bg-white rounded-xl">
//             <Play className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
//             <p className="text-gray-500">
//               {searchQuery 
//                 ? `No videos matching "${searchQuery}". Try "mushyr" for Mushaira videos.`
//                 : 'No videos available in this category yet.'}
//             </p>
//           </div>
//         ) : (
//           <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
//             {videos.map((video, index) => (
//               <motion.div
//                 key={video._id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.05 }}
//               >
//                 <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group">
//                   <div onClick={() => playVideo(video)}>
//                     {/* Thumbnail */}
//                     <div className="relative overflow-hidden">
//                       {video.thumbnail ? (
//                         <img
//                           src={video.thumbnail}
//                           alt={video.title}
//                           className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
//                           loading="lazy"
//                         />
//                       ) : (
//                         <div className="w-full aspect-video bg-gray-200 flex items-center justify-center">
//                           {video.videoUrl?.includes('youtube') ? 
//                             <Youtube className="h-12 w-12 text-red-500" /> : 
//                             <FileVideo className="h-12 w-12 text-gray-400" />
//                           }
//                         </div>
//                       )}
//                       <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
//                         <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
//                           <Play className="h-5 w-5 text-primary-600 ml-0.5" />
//                         </div>
//                       </div>
//                       {video.duration && (
//                         <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded-md flex items-center gap-1">
//                           <Clock className="h-3 w-3" />
//                           <span>{formatDuration(video.duration)}</span>
//                         </div>
//                       )}
//                       <div className="absolute top-2 left-2">
//                         <span className="px-2 py-0.5 bg-white/90 text-gray-700 text-xs font-medium rounded-full capitalize">
//                           {getCategoryDisplayName(video.type)}
//                         </span>
//                       </div>
//                       {video.isPremium && (
//                         <div className="absolute top-2 right-2">
//                           <span className="px-2 py-0.5 bg-yellow-500 text-white text-xs font-medium rounded-full">
//                             Premium
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     {/* Content */}
//                     <div className="p-4">
//                       <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-1">
//                         {video.title}
//                       </h3>
//                       {video.description && (
//                         <p className="text-sm text-gray-500 line-clamp-2 mb-2">{video.description}</p>
//                       )}
//                       <div className="flex items-center gap-3 text-sm text-gray-500">
//                         <span className="flex items-center gap-1">
//                           <Eye className="h-4 w-4" />
//                           {formatViews(video.stats?.views || 0)} views
//                         </span>
//                         {video.language && <span className="capitalize">{video.language}</span>}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {/* Pagination */}
//         {pagination.totalPages > 1 && (
//           <div className="flex items-center justify-center gap-2 mt-8">
//             <button
//               onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//               disabled={currentPage === 1}
//               className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
//             >
//               <ChevronLeft className="h-5 w-5" />
//             </button>
//             <span className="px-4 py-2 text-sm">
//               Page {currentPage} of {pagination.totalPages}
//             </span>
//             <button
//               onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
//               disabled={currentPage === pagination.totalPages}
//               className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
//             >
//               <ChevronRight className="h-5 w-5" />
//             </button>
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         @keyframes slide-up {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-slide-up { animation: slide-up 0.3s ease-out; }
//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.5; }
//         }
//         .animate-pulse { animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
//       `}</style>
//     </div>
//   );
// };

// export default VideoListPage;
























// // client/src/pages/public/VideoListPage.jsx
// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useSearchParams, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useQuery } from '@tanstack/react-query';
// import ReactPlayer from 'react-player';
// import { 
//   Search, Play, Clock, Eye, Grid, List, Loader2, 
//   AlertCircle, ChevronLeft, ChevronRight, Mic, MicOff, 
//   Volume2, VolumeX, X, Sparkles, TrendingUp, Music,
//   Pause, Square, Maximize2, Minimize2, Youtube, FileVideo,
//   SkipBack, SkipForward, Heart, Share2
// } from 'lucide-react';
// import videoAPI from '../../api/videoAPI';
// import { VIDEO_CATEGORIES } from '../../utils/constants.js';

// const VideoListPage = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [viewMode, setViewMode] = useState('grid');
//   const [sortBy, setSortBy] = useState('popular');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isVoiceActive, setIsVoiceActive] = useState(false);
//   const [voiceStatus, setVoiceStatus] = useState('');
//   const [voiceCommand, setVoiceCommand] = useState('');
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [isPlayerOpen, setIsPlayerOpen] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [playerVolume, setPlayerVolume] = useState(0.7);
//   const [isMuted, setIsMuted] = useState(false);
//   const [playedSeconds, setPlayedSeconds] = useState(0);
//   const [duration, setDuration] = useState(0);
  
//   const itemsPerPage = 9;
//   const recognitionRef = useRef(null);
//   const playerRef = useRef(null);

//   // Initialize Speech Recognition
//   useEffect(() => {
//     if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
//       const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
//       recognitionRef.current = new SpeechRecognition();
//       recognitionRef.current.continuous = false;
//       recognitionRef.current.interimResults = false;
//       recognitionRef.current.lang = 'en-US';

//       recognitionRef.current.onstart = () => {
//         setIsVoiceActive(true);
//         setVoiceStatus('listening');
//       };

//       recognitionRef.current.onend = () => {
//         setIsVoiceActive(false);
//         setTimeout(() => setVoiceStatus(''), 1000);
//       };

//       recognitionRef.current.onresult = (event) => {
//         const transcript = event.results[0][0].transcript.toLowerCase();
//         setVoiceCommand(transcript);
//         processVoiceCommand(transcript);
//         setVoiceStatus('processing');
//         setTimeout(() => setVoiceStatus(''), 2000);
//       };

//       recognitionRef.current.onerror = (event) => {
//         console.error('Speech recognition error:', event.error);
//         setVoiceStatus('error');
//         setIsVoiceActive(false);
//         setTimeout(() => setVoiceStatus(''), 2000);
//       };
//     }

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.abort();
//       }
//     };
//   }, []);

//   // Process voice commands
//   const processVoiceCommand = async (command) => {
//     console.log('Processing command:', command);
    
//     // Play commands
//     if (command.includes('play')) {
//       let searchTerm = command.replace(/play|start|video|the|a|an/gi, '').trim();
      
//       if (searchTerm) {
//         const searchResponse = await videoAPI.getVideos({ 
//           search: searchTerm, 
//           limit: 5 
//         });
//         const videosData = searchResponse?.data?.data || searchResponse?.data || searchResponse || [];
//         const videos = Array.isArray(videosData) ? videosData : [];
        
//         if (videos.length > 0) {
//           handlePlayVideo(videos[0]);
//           speak(`Playing ${videos[0].title}`);
//         } else {
//           setSearchQuery(searchTerm);
//           speak(`Searching for ${searchTerm}`);
//         }
//       }
//     }
//     // Stop command
//     else if (command.includes('stop')) {
//       handleClosePlayer();
//       speak('Video stopped');
//     }
//     // Pause command
//     else if (command.includes('pause')) {
//       setIsPlaying(false);
//       speak('Video paused');
//     }
//     // Resume command
//     else if (command.includes('resume') || command.includes('continue')) {
//       setIsPlaying(true);
//       speak('Video resumed');
//     }
//     // Volume up
//     else if (command.includes('volume up')) {
//       setPlayerVolume(prev => Math.min(1, prev + 0.1));
//       speak(`Volume increased to ${Math.round((playerVolume + 0.1) * 100)}%`);
//     }
//     // Volume down
//     else if (command.includes('volume down')) {
//       setPlayerVolume(prev => Math.max(0, prev - 0.1));
//       speak(`Volume decreased to ${Math.round((playerVolume - 0.1) * 100)}%`);
//     }
//     // Mute
//     else if (command.includes('mute')) {
//       setIsMuted(true);
//       speak('Video muted');
//     }
//     // Unmute
//     else if (command.includes('unmute')) {
//       setIsMuted(false);
//       speak('Video unmuted');
//     }
//     // Search commands
//     else if (command.includes('search for')) {
//       let searchTerm = command.replace(/search for|find/gi, '').trim();
//       setSearchQuery(searchTerm);
//       setCurrentPage(1);
//       speak(`Searching for ${searchTerm}`);
//     }
//     // Category commands
//     else if (command.includes('mushaira') || command.includes('mushyr') || command.includes('mushayara')) {
//       setActiveCategory('mushaira');
//       setCurrentPage(1);
//       speak('Showing Mushaira videos');
//     }
//     else if (command.includes('interview')) {
//       setActiveCategory('interview');
//       setCurrentPage(1);
//       speak('Showing interviews');
//     }
//     else if (command.includes('popular') || command.includes('trending')) {
//       setSortBy('popular');
//       setActiveCategory('all');
//       setSearchQuery('');
//       setCurrentPage(1);
//       speak('Showing most popular videos');
//     }
//     else if (command.includes('latest') || command.includes('newest')) {
//       setSortBy('recent');
//       setCurrentPage(1);
//       speak('Showing latest videos');
//     }
//     else if (command.includes('sad') || command.includes('emotional')) {
//       setSearchQuery('sad poetry emotional');
//       setCurrentPage(1);
//       speak('Showing emotional and sad videos');
//     }
//     else if (command.includes('help')) {
//       speak('You can say: play video name, search for topic, show popular videos, pause, resume, stop, volume up, or volume down');
//     }
//   };

//   // Speak text
//   const speak = (message) => {
//     if ('speechSynthesis' in window) {
//       const utterance = new SpeechSynthesisUtterance(message);
//       utterance.lang = 'en-US';
//       utterance.rate = 0.9;
//       window.speechSynthesis.cancel();
//       window.speechSynthesis.speak(utterance);
//     }
//   };

//   // Handle play video
//   const handlePlayVideo = (video) => {
//     setSelectedVideo(video);
//     setIsPlayerOpen(true);
//     setIsPlaying(true);
//   };

//   // Handle close player
//   const handleClosePlayer = () => {
//     setIsPlaying(false);
//     setSelectedVideo(null);
//     setIsPlayerOpen(false);
//     setPlayedSeconds(0);
//   };

//   // Format duration
//   const formatDuration = (seconds) => {
//     if (!seconds) return 'N/A';
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     if (hrs > 0) {
//       return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//     }
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Format time for display
//   const formatTime = (seconds) => {
//     if (!seconds) return '0:00';
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Format views
//   const formatViews = (views) => {
//     if (!views) return '0';
//     if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
//     if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
//     return views.toString();
//   };

//   // Get sort mapping
//   const getSortMapping = (sortValue) => {
//     switch (sortValue) {
//       case 'recent':
//         return '-createdAt';
//       case 'views':
//         return '-stats.views';
//       default:
//         return '-stats.views';
//     }
//   };

//   // Fetch videos
//   const { data: response, isLoading, error, refetch } = useQuery({
//     queryKey: ['videos', currentPage, activeCategory, sortBy, searchQuery],
//     queryFn: () => videoAPI.getVideos({
//       page: currentPage,
//       limit: itemsPerPage,
//       type: activeCategory !== 'all' ? activeCategory : undefined,
//       search: searchQuery || undefined,
//       sort: sortBy
//     }),
//     enabled: true,
//     staleTime: 30000,
//     keepPreviousData: true
//   });

//   const videosData = response?.data?.data || response?.data || response || [];
//   const videos = Array.isArray(videosData) ? videosData : [];
//   const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 };

//   // Update URL when category changes
//   useEffect(() => {
//     if (activeCategory && activeCategory !== 'all') {
//       setSearchParams({ category: activeCategory });
//     } else {
//       setSearchParams({});
//     }
//     setCurrentPage(1);
//   }, [activeCategory, setSearchParams]);

//   // Reset to page 1 when search changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery]);

//   const clearFilters = () => {
//     setSearchQuery('');
//     setActiveCategory('all');
//     setSortBy('popular');
//     setCurrentPage(1);
//   };

//   const sortOptions = [
//     { value: 'popular', label: 'Most Popular', icon: TrendingUp },
//     { value: 'recent', label: 'Most Recent', icon: Clock },
//     { value: 'views', label: 'Most Viewed', icon: Eye }
//   ];

//   const getCategoryDisplayName = (type) => {
//     const category = VIDEO_CATEGORIES.find(cat => cat.id === type?.toLowerCase());
//     return category?.label || type || 'Video';
//   };

//   const voiceSuggestions = [
//     { command: "Play video", icon: Play },
//     { command: "Search for Mushaira", icon: Search },
//     { command: "Show popular videos", icon: TrendingUp },
//     { command: "Pause", icon: Pause },
//     { command: "Resume", icon: Play },
//     { command: "Stop", icon: Square },
//     { command: "Volume up", icon: Volume2 }
//   ];

//   const startVoiceRecognition = () => {
//     if (recognitionRef.current) {
//       try {
//         recognitionRef.current.start();
//       } catch (error) {
//         console.error('Error starting recognition:', error);
//         setVoiceStatus('error');
//       }
//     } else {
//       alert('Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
//     }
//   };

//   const stopVoiceRecognition = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//     }
//     setIsVoiceActive(false);
//   };

//   if (isLoading && videos.length === 0) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-center min-h-[60vh]">
//             <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
//             <p className="text-gray-500">Loading videos...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Video Player Modal */}
//         {isPlayerOpen && selectedVideo && (
//           <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
//             <div className="relative w-full max-w-5xl bg-black rounded-xl overflow-hidden">
//               {/* Close button */}
//               <button
//                 onClick={handleClosePlayer}
//                 className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors text-white"
//               >
//                 <X className="h-6 w-6" />
//               </button>

//               {/* Video Title */}
//               <div className="absolute top-4 left-4 z-10 text-white">
//                 <h3 className="text-lg font-semibold">{selectedVideo.title}</h3>
//                 {selectedVideo.author && (
//                   <p className="text-sm text-gray-300">
//                     {typeof selectedVideo.author === 'object' ? selectedVideo.author.name : selectedVideo.author}
//                   </p>
//                 )}
//               </div>

//               {/* React Player */}
//               <div className="w-full bg-black">
//                 <ReactPlayer
//                   ref={playerRef}
//                   url={selectedVideo.videoUrl}
//                   playing={isPlaying}
//                   volume={isMuted ? 0 : playerVolume}
//                   width="100%"
//                   height="70vh"
//                   controls={true}
//                   config={{
//                     youtube: {
//                       playerVars: {
//                         modestbranding: 1,
//                         rel: 0,
//                         showinfo: 1,
//                         controls: 1,
//                         autoplay: 1
//                       }
//                     },
//                     file: {
//                       attributes: {
//                         controlsList: 'nodownload'
//                       }
//                     }
//                   }}
//                   onEnded={() => {
//                     setIsPlaying(false);
//                     speak('Video ended');
//                   }}
//                   onPlay={() => {
//                     setIsPlaying(true);
//                   }}
//                   onPause={() => {
//                     setIsPlaying(false);
//                   }}
//                   onDuration={(d) => setDuration(d)}
//                   onProgress={({ playedSeconds }) => setPlayedSeconds(playedSeconds)}
//                 />
//               </div>

//               {/* Custom Controls */}
//               <div className="p-4 bg-gray-900">
//                 <div className="flex items-center justify-between flex-wrap gap-4">
//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={() => setIsPlaying(!isPlaying)}
//                       className="p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors"
//                     >
//                       {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
//                     </button>
//                     <button
//                       onClick={() => setIsMuted(!isMuted)}
//                       className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
//                     >
//                       {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
//                     </button>
//                     <div className="flex items-center gap-2">
//                       <input
//                         type="range"
//                         min="0"
//                         max="1"
//                         step="0.01"
//                         value={playerVolume}
//                         onChange={(e) => setPlayerVolume(parseFloat(e.target.value))}
//                         className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
//                       />
//                     </div>
//                     <div className="text-white text-sm">
//                       {formatTime(playedSeconds)} / {formatTime(duration)}
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => {
//                         if (playerRef.current) {
//                           playerRef.current.seekTo(playedSeconds - 10, 'seconds');
//                         }
//                       }}
//                       className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
//                     >
//                       <SkipBack className="h-4 w-4" />
//                     </button>
//                     <button
//                       onClick={() => {
//                         if (playerRef.current) {
//                           playerRef.current.seekTo(playedSeconds + 10, 'seconds');
//                         }
//                       }}
//                       className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
//                     >
//                       <SkipForward className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between flex-wrap gap-4">
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
//                 Video Library
//               </h1>
//               <p className="text-gray-500">
//                 Mushaira, interviews, documentaries, lectures, and more from Urdu literature
//               </p>
//             </div>
            
//             {/* Voice Assistant Button */}
//             <div className="relative">
//               <button
//                 onClick={isVoiceActive ? stopVoiceRecognition : startVoiceRecognition}
//                 className={`relative group flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all ${
//                   isVoiceActive 
//                     ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse' 
//                     : 'bg-primary-600 text-white shadow-lg hover:shadow-xl'
//                 }`}
//               >
//                 {isVoiceActive ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
//                 <span>{isVoiceActive ? 'Listening...' : 'Voice Assistant'}</span>
//               </button>
              
//               {voiceStatus === 'listening' && (
//                 <div className="absolute -bottom-8 left-0 right-0 text-center">
//                   <span className="text-xs text-green-600 animate-pulse">🔴 Listening... Speak now</span>
//                 </div>
//               )}
//               {voiceStatus === 'processing' && (
//                 <div className="absolute -bottom-8 left-0 right-0 text-center">
//                   <span className="text-xs text-blue-600">⚙️ Processing...</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Voice Command Display */}
//         {voiceCommand && (
//           <motion.div 
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mb-4 p-3 bg-primary-50 border border-primary-200 rounded-lg"
//           >
//             <div className="flex items-center gap-2">
//               <Mic className="h-4 w-4 text-primary-600" />
//               <span className="text-sm text-gray-600">You said:</span>
//               <span className="text-sm font-medium text-primary-700">"{voiceCommand}"</span>
//             </div>
//           </motion.div>
//         )}

//         {/* Voice Command Suggestions */}
//         <div className="mb-6 overflow-x-auto">
//           <div className="flex gap-2 pb-2">
//             {voiceSuggestions.map((suggestion, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => processVoiceCommand(suggestion.command.toLowerCase())}
//                 className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-gray-50 hover:border-primary-300 transition-all whitespace-nowrap"
//               >
//                 <suggestion.icon className="h-3.5 w-3.5" />
//                 <span>{suggestion.command}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Search & Controls */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search videos... (Try 'mushyr' for Mushaira)"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white"
//             />
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery('')}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//             )}
//           </div>
//           <div className="flex items-center gap-2">
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="px-4 py-2.5 border border-gray-200 rounded-lg bg-white"
//             >
//               {sortOptions.map(option => (
//                 <option key={option.value} value={option.value}>{option.label}</option>
//               ))}
//             </select>
//             <div className="flex border border-gray-300 rounded-lg overflow-hidden">
//               <button
//                 onClick={() => setViewMode('grid')}
//                 className={`p-2.5 ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-600'}`}
//               >
//                 <Grid className="h-5 w-5" />
//               </button>
//               <button
//                 onClick={() => setViewMode('list')}
//                 className={`p-2.5 ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-600'}`}
//               >
//                 <List className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Categories */}
//         <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
//           <button
//             onClick={() => setActiveCategory('all')}
//             className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//               activeCategory === 'all'
//                 ? 'bg-primary-600 text-white shadow-md'
//                 : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
//             }`}
//           >
//             All Videos
//           </button>
//           {VIDEO_CATEGORIES.map((cat) => (
//             <button
//               key={cat.id}
//               onClick={() => setActiveCategory(cat.id)}
//               className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//                 activeCategory === cat.id
//                   ? 'bg-primary-600 text-white shadow-md'
//                   : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
//               }`}
//             >
//               {cat.label}
//             </button>
//           ))}
//         </div>

//         {/* Results Count */}
//         <div className="flex justify-between items-center mb-4">
//           <p className="text-sm text-gray-500">
//             {searchQuery ? (
//               <>Found {pagination.total || videos.length} result(s) for "<strong>{searchQuery}</strong>"</>
//             ) : (
//               <>Showing {videos.length} of {pagination.total || videos.length} videos</>
//             )}
//           </p>
//           {(searchQuery || activeCategory !== 'all') && (
//             <button onClick={clearFilters} className="text-sm text-primary-600 hover:text-primary-700">
//               Clear filters
//             </button>
//           )}
//         </div>

//         {/* Videos Grid */}
//         {videos.length === 0 ? (
//           <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
//             <Play className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
//             <p className="text-gray-500">
//               {searchQuery 
//                 ? `No videos matching "${searchQuery}". Try "mushyr" for Mushaira videos.`
//                 : 'No videos available in this category yet.'}
//             </p>
//           </div>
//         ) : (
//           <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
//             {videos.map((video, index) => (
//               <motion.div
//                 key={video._id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.05 }}
//               >
//                 <div 
//                   onClick={() => handlePlayVideo(video)}
//                   className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group"
//                 >
//                   {/* Thumbnail */}
//                   <div className="relative overflow-hidden">
//                     {video.thumbnail ? (
//                       <img
//                         src={video.thumbnail}
//                         alt={video.title}
//                         className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
//                         loading="lazy"
//                       />
//                     ) : (
//                       <div className="w-full aspect-video bg-gray-200 flex items-center justify-center">
//                         {video.videoUrl?.includes('youtube') ? 
//                           <Youtube className="h-12 w-12 text-red-500" /> : 
//                           <FileVideo className="h-12 w-12 text-gray-400" />
//                         }
//                       </div>
//                     )}
//                     <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
//                       <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
//                         <Play className="h-5 w-5 text-primary-600 ml-0.5" />
//                       </div>
//                     </div>
//                     {video.duration && (
//                       <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded-md flex items-center gap-1">
//                         <Clock className="h-3 w-3" />
//                         <span>{formatDuration(video.duration)}</span>
//                       </div>
//                     )}
//                     <div className="absolute top-2 left-2">
//                       <span className="px-2 py-0.5 bg-white/90 text-gray-700 text-xs font-medium rounded-full capitalize">
//                         {getCategoryDisplayName(video.type)}
//                       </span>
//                     </div>
//                     {video.isPremium && (
//                       <div className="absolute top-2 right-2">
//                         <span className="px-2 py-0.5 bg-yellow-500 text-white text-xs font-medium rounded-full">
//                           Premium
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   {/* Content */}
//                   <div className="p-4">
//                     <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-1">
//                       {video.title}
//                     </h3>
//                     {video.description && (
//                       <p className="text-sm text-gray-500 line-clamp-2 mb-2">{video.description}</p>
//                     )}
//                     <div className="flex items-center gap-3 text-sm text-gray-500">
//                       <span className="flex items-center gap-1">
//                         <Eye className="h-4 w-4" />
//                         {formatViews(video.stats?.views || 0)} views
//                       </span>
//                       {video.language && <span className="capitalize">{video.language}</span>}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {/* Pagination */}
//         {pagination.totalPages > 1 && (
//           <div className="flex items-center justify-center gap-2 mt-8">
//             <button
//               onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//               disabled={currentPage === 1}
//               className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
//             >
//               <ChevronLeft className="h-5 w-5" />
//             </button>
//             <span className="px-4 py-2 text-sm">
//               Page {currentPage} of {pagination.totalPages}
//             </span>
//             <button
//               onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
//               disabled={currentPage === pagination.totalPages}
//               className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
//             >
//               <ChevronRight className="h-5 w-5" />
//             </button>
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.5; }
//         }
//         .animate-pulse { animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
//       `}</style>
//     </div>
//   );
// };

// export default VideoListPage;
















// // client/src/pages/public/VideoListPage.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import { useSearchParams, Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useQuery } from '@tanstack/react-query';
// import ReactPlayer from 'react-player';
// import { 
//   Search, Play, Clock, Eye, Grid, List, Loader2, 
//   ChevronLeft, ChevronRight, Mic, MicOff, 
//   Volume2, VolumeX, X, Sparkles, TrendingUp,
//   Pause, Square, Youtube, FileVideo, ExternalLink
// } from 'lucide-react';
// import videoAPI from '../../api/videoAPI';
// import { VIDEO_CATEGORIES } from '../../utils/constants.js';

// const VideoListPage = () => {
//   const navigate = useNavigate();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [viewMode, setViewMode] = useState('grid');
//   const [sortBy, setSortBy] = useState('popular');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isVoiceActive, setIsVoiceActive] = useState(false);
//   const [voiceStatus, setVoiceStatus] = useState('');
//   const [voiceCommand, setVoiceCommand] = useState('');
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [isPlayerOpen, setIsPlayerOpen] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [playerVolume, setPlayerVolume] = useState(0.7);
//   const [isMuted, setIsMuted] = useState(false);
//   const [playedSeconds, setPlayedSeconds] = useState(0);
//   const [duration, setDuration] = useState(0);
  
//   const itemsPerPage = 9;
//   const recognitionRef = useRef(null);
//   const playerRef = useRef(null);

//   // Initialize Speech Recognition
//   useEffect(() => {
//     if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
//       const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
//       recognitionRef.current = new SpeechRecognition();
//       recognitionRef.current.continuous = false;
//       recognitionRef.current.interimResults = false;
//       recognitionRef.current.lang = 'en-US';

//       recognitionRef.current.onstart = () => {
//         setIsVoiceActive(true);
//         setVoiceStatus('listening');
//       };

//       recognitionRef.current.onend = () => {
//         setIsVoiceActive(false);
//         setTimeout(() => setVoiceStatus(''), 1000);
//       };

//       recognitionRef.current.onresult = (event) => {
//         const transcript = event.results[0][0].transcript.toLowerCase();
//         setVoiceCommand(transcript);
//         processVoiceCommand(transcript);
//         setVoiceStatus('processing');
//         setTimeout(() => setVoiceStatus(''), 2000);
//       };

//       recognitionRef.current.onerror = (event) => {
//         console.error('Speech recognition error:', event.error);
//         setVoiceStatus('error');
//         setIsVoiceActive(false);
//         setTimeout(() => setVoiceStatus(''), 2000);
//       };
//     }

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.abort();
//       }
//     };
//   }, []);

//   // Process voice commands
//   const processVoiceCommand = async (command) => {
//     console.log('Processing command:', command);
    
//     if (command.includes('play')) {
//       let searchTerm = command.replace(/play|start|video|the|a|an/gi, '').trim();
//       if (searchTerm) {
//         const searchResponse = await videoAPI.getVideos({ search: searchTerm, limit: 5 });
//         const videosData = searchResponse?.data?.data || searchResponse?.data || searchResponse || [];
//         const videos = Array.isArray(videosData) ? videosData : [];
//         if (videos.length > 0) {
//           handlePlayVideo(videos[0]);
//           speak(`Playing ${videos[0].title}`);
//         } else {
//           setSearchQuery(searchTerm);
//           speak(`Searching for ${searchTerm}`);
//         }
//       }
//     }
//     else if (command.includes('stop')) {
//       handleClosePlayer();
//       speak('Video stopped');
//     }
//     else if (command.includes('pause')) {
//       setIsPlaying(false);
//       speak('Video paused');
//     }
//     else if (command.includes('resume') || command.includes('continue')) {
//       setIsPlaying(true);
//       speak('Video resumed');
//     }
//     else if (command.includes('volume up')) {
//       setPlayerVolume(prev => Math.min(1, prev + 0.1));
//       speak(`Volume increased to ${Math.round((playerVolume + 0.1) * 100)}%`);
//     }
//     else if (command.includes('volume down')) {
//       setPlayerVolume(prev => Math.max(0, prev - 0.1));
//       speak(`Volume decreased to ${Math.round((playerVolume - 0.1) * 100)}%`);
//     }
//     else if (command.includes('mute')) {
//       setIsMuted(true);
//       speak('Video muted');
//     }
//     else if (command.includes('unmute')) {
//       setIsMuted(false);
//       speak('Video unmuted');
//     }
//     else if (command.includes('search for')) {
//       let searchTerm = command.replace(/search for|find/gi, '').trim();
//       setSearchQuery(searchTerm);
//       setCurrentPage(1);
//       speak(`Searching for ${searchTerm}`);
//     }
//     else if (command.includes('mushaira') || command.includes('mushyr') || command.includes('mushayara')) {
//       setActiveCategory('mushaira');
//       setCurrentPage(1);
//       speak('Showing Mushaira videos');
//     }
//     else if (command.includes('popular') || command.includes('trending')) {
//       setSortBy('popular');
//       setActiveCategory('all');
//       setSearchQuery('');
//       setCurrentPage(1);
//       speak('Showing most popular videos');
//     }
//     else if (command.includes('latest') || command.includes('newest')) {
//       setSortBy('recent');
//       setCurrentPage(1);
//       speak('Showing latest videos');
//     }
//     else if (command.includes('sad') || command.includes('emotional')) {
//       setSearchQuery('sad poetry emotional');
//       setCurrentPage(1);
//       speak('Showing emotional and sad videos');
//     }
//     else if (command.includes('help')) {
//       speak('You can say: play video name, search for topic, show popular videos, pause, resume, stop, volume up, or volume down');
//     }
//   };

//   const speak = (message) => {
//     if ('speechSynthesis' in window) {
//       const utterance = new SpeechSynthesisUtterance(message);
//       utterance.lang = 'en-US';
//       utterance.rate = 0.9;
//       window.speechSynthesis.cancel();
//       window.speechSynthesis.speak(utterance);
//     }
//   };

//   // Handle play video in modal
//   const handlePlayVideo = (video) => {
//     setSelectedVideo(video);
//     setIsPlayerOpen(true);
//     setIsPlaying(true);
//   };

//   // Handle close player
//   const handleClosePlayer = () => {
//     setIsPlaying(false);
//     setSelectedVideo(null);
//     setIsPlayerOpen(false);
//     setPlayedSeconds(0);
//   };

//   // Handle navigate to detail page
//   const handleViewDetails = (slug) => {
//     navigate(`/video/${slug}`);
//   };

//   const formatDuration = (seconds) => {
//     if (!seconds) return 'N/A';
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     if (hrs > 0) {
//       return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//     }
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   const formatTime = (seconds) => {
//     if (!seconds) return '0:00';
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   const formatViews = (views) => {
//     if (!views) return '0';
//     if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
//     if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
//     return views.toString();
//   };

//   // Fetch videos
//   const { data: response, isLoading, error, refetch } = useQuery({
//     queryKey: ['videos', currentPage, activeCategory, sortBy, searchQuery],
//     queryFn: () => videoAPI.getVideos({
//       page: currentPage,
//       limit: itemsPerPage,
//       type: activeCategory !== 'all' ? activeCategory : undefined,
//       search: searchQuery || undefined,
//       sort: sortBy
//     }),
//     enabled: true,
//     staleTime: 30000,
//     keepPreviousData: true
//   });

//   const videosData = response?.data?.data || response?.data || response || [];
//   const videos = Array.isArray(videosData) ? videosData : [];
//   const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 };

//   useEffect(() => {
//     if (activeCategory && activeCategory !== 'all') {
//       setSearchParams({ category: activeCategory });
//     } else {
//       setSearchParams({});
//     }
//     setCurrentPage(1);
//   }, [activeCategory, setSearchParams]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery]);

//   const clearFilters = () => {
//     setSearchQuery('');
//     setActiveCategory('all');
//     setSortBy('popular');
//     setCurrentPage(1);
//   };

//   const sortOptions = [
//     { value: 'popular', label: 'Most Popular', icon: TrendingUp },
//     { value: 'recent', label: 'Most Recent', icon: Clock },
//     { value: 'views', label: 'Most Viewed', icon: Eye }
//   ];

//   const getCategoryDisplayName = (type) => {
//     const category = VIDEO_CATEGORIES.find(cat => cat.id === type?.toLowerCase());
//     return category?.label || type || 'Video';
//   };

//   const voiceSuggestions = [
//     { command: "Play video", icon: Play },
//     { command: "Search for Mushaira", icon: Search },
//     { command: "Show popular videos", icon: TrendingUp },
//     { command: "Pause", icon: Pause },
//     { command: "Resume", icon: Play },
//     { command: "Stop", icon: Square },
//     { command: "Volume up", icon: Volume2 }
//   ];

//   const startVoiceRecognition = () => {
//     if (recognitionRef.current) {
//       try {
//         recognitionRef.current.start();
//       } catch (error) {
//         console.error('Error starting recognition:', error);
//         setVoiceStatus('error');
//       }
//     } else {
//       alert('Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
//     }
//   };

//   const stopVoiceRecognition = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//     }
//     setIsVoiceActive(false);
//   };

//   if (isLoading && videos.length === 0) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-center min-h-[60vh]">
//             <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
//             <p className="text-gray-500">Loading videos...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Video Player Modal */}
//         {isPlayerOpen && selectedVideo && (
//           <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
//             <div className="relative w-full max-w-5xl bg-black rounded-xl overflow-hidden">
//               <button
//                 onClick={handleClosePlayer}
//                 className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors text-white"
//               >
//                 <X className="h-6 w-6" />
//               </button>

//               <div className="absolute top-4 left-4 z-10 text-white">
//                 <h3 className="text-lg font-semibold">{selectedVideo.title}</h3>
//                 {selectedVideo.author && (
//                   <p className="text-sm text-gray-300">
//                     {typeof selectedVideo.author === 'object' ? selectedVideo.author.name : selectedVideo.author}
//                   </p>
//                 )}
//               </div>

//               <div className="w-full bg-black">
//                 <ReactPlayer
//                   ref={playerRef}
//                   url={selectedVideo.videoUrl}
//                   playing={isPlaying}
//                   volume={isMuted ? 0 : playerVolume}
//                   width="100%"
//                   height="70vh"
//                   controls={true}
//                   config={{
//                     youtube: {
//                       playerVars: {
//                         modestbranding: 1,
//                         rel: 0,
//                         showinfo: 1,
//                         controls: 1,
//                         autoplay: 1
//                       }
//                     },
//                     file: {
//                       attributes: {
//                         controlsList: 'nodownload'
//                       }
//                     }
//                   }}
//                   onEnded={() => {
//                     setIsPlaying(false);
//                     speak('Video ended');
//                   }}
//                   onPlay={() => setIsPlaying(true)}
//                   onPause={() => setIsPlaying(false)}
//                   onDuration={(d) => setDuration(d)}
//                   onProgress={({ playedSeconds }) => setPlayedSeconds(playedSeconds)}
//                 />
//               </div>

//               <div className="p-4 bg-gray-900">
//                 <div className="flex items-center justify-between flex-wrap gap-4">
//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={() => setIsPlaying(!isPlaying)}
//                       className="p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors"
//                     >
//                       {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
//                     </button>
//                     <button
//                       onClick={() => setIsMuted(!isMuted)}
//                       className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
//                     >
//                       {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
//                     </button>
//                     <input
//                       type="range"
//                       min="0"
//                       max="1"
//                       step="0.01"
//                       value={playerVolume}
//                       onChange={(e) => setPlayerVolume(parseFloat(e.target.value))}
//                       className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
//                     />
//                     <div className="text-white text-sm">
//                       {formatTime(playedSeconds)} / {formatTime(duration)}
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => {
//                       handleClosePlayer();
//                       navigate(`/video/${selectedVideo.slug}`);
//                     }}
//                     className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
//                   >
//                     <ExternalLink className="h-4 w-4" />
//                     <span>View Details</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between flex-wrap gap-4">
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
//                 Video Library
//               </h1>
//               <p className="text-gray-500">
//                 Mushaira, interviews, documentaries, lectures, and more from Urdu literature
//               </p>
//             </div>
            
//             <div className="relative">
//               <button
//                 onClick={isVoiceActive ? stopVoiceRecognition : startVoiceRecognition}
//                 className={`relative group flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all ${
//                   isVoiceActive 
//                     ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse' 
//                     : 'bg-primary-600 text-white shadow-lg hover:shadow-xl'
//                 }`}
//               >
//                 {isVoiceActive ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
//                 <span>{isVoiceActive ? 'Listening...' : 'Voice Assistant'}</span>
//               </button>
              
//               {voiceStatus === 'listening' && (
//                 <div className="absolute -bottom-8 left-0 right-0 text-center">
//                   <span className="text-xs text-green-600 animate-pulse">🔴 Listening... Speak now</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Voice Command Display */}
//         {voiceCommand && (
//           <motion.div 
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mb-4 p-3 bg-primary-50 border border-primary-200 rounded-lg"
//           >
//             <div className="flex items-center gap-2">
//               <Mic className="h-4 w-4 text-primary-600" />
//               <span className="text-sm text-gray-600">You said:</span>
//               <span className="text-sm font-medium text-primary-700">"{voiceCommand}"</span>
//             </div>
//           </motion.div>
//         )}

//         {/* Voice Command Suggestions */}
//         <div className="mb-6 overflow-x-auto">
//           <div className="flex gap-2 pb-2">
//             {voiceSuggestions.map((suggestion, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => processVoiceCommand(suggestion.command.toLowerCase())}
//                 className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-gray-50 hover:border-primary-300 transition-all whitespace-nowrap"
//               >
//                 <suggestion.icon className="h-3.5 w-3.5" />
//                 <span>{suggestion.command}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Search & Controls */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search videos... (Try 'mushyr' for Mushaira)"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white"
//             />
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery('')}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//             )}
//           </div>
//           <div className="flex items-center gap-2">
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="px-4 py-2.5 border border-gray-200 rounded-lg bg-white"
//             >
//               {sortOptions.map(option => (
//                 <option key={option.value} value={option.value}>{option.label}</option>
//               ))}
//             </select>
//             <div className="flex border border-gray-300 rounded-lg overflow-hidden">
//               <button
//                 onClick={() => setViewMode('grid')}
//                 className={`p-2.5 ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-600'}`}
//               >
//                 <Grid className="h-5 w-5" />
//               </button>
//               <button
//                 onClick={() => setViewMode('list')}
//                 className={`p-2.5 ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-600'}`}
//               >
//                 <List className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Categories */}
//         <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
//           <button
//             onClick={() => setActiveCategory('all')}
//             className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//               activeCategory === 'all'
//                 ? 'bg-primary-600 text-white shadow-md'
//                 : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
//             }`}
//           >
//             All Videos
//           </button>
//           {VIDEO_CATEGORIES.map((cat) => (
//             <button
//               key={cat.id}
//               onClick={() => setActiveCategory(cat.id)}
//               className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//                 activeCategory === cat.id
//                   ? 'bg-primary-600 text-white shadow-md'
//                   : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
//               }`}
//             >
//               {cat.label}
//             </button>
//           ))}
//         </div>

//         {/* Results Count */}
//         <div className="flex justify-between items-center mb-4">
//           <p className="text-sm text-gray-500">
//             {searchQuery ? (
//               <>Found {pagination.total || videos.length} result(s) for "<strong>{searchQuery}</strong>"</>
//             ) : (
//               <>Showing {videos.length} of {pagination.total || videos.length} videos</>
//             )}
//           </p>
//           {(searchQuery || activeCategory !== 'all') && (
//             <button onClick={clearFilters} className="text-sm text-primary-600 hover:text-primary-700">
//               Clear filters
//             </button>
//           )}
//         </div>

//         {/* Videos Grid */}
//         {videos.length === 0 ? (
//           <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
//             <Play className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
//             <p className="text-gray-500">
//               {searchQuery 
//                 ? `No videos matching "${searchQuery}". Try "mushyr" for Mushaira videos.`
//                 : 'No videos available in this category yet.'}
//             </p>
//           </div>
//         ) : (
//           <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
//             {videos.map((video, index) => (
//               <motion.div
//                 key={video._id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.05 }}
//                 className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
//               >
//                 {/* Thumbnail with Play Button */}
//                 <div className="relative overflow-hidden cursor-pointer" onClick={() => handlePlayVideo(video)}>
//                   {video.thumbnail ? (
//                     <img
//                       src={video.thumbnail}
//                       alt={video.title}
//                       className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
//                       loading="lazy"
//                     />
//                   ) : (
//                     <div className="w-full aspect-video bg-gray-200 flex items-center justify-center">
//                       {video.videoUrl?.includes('youtube') ? 
//                         <Youtube className="h-12 w-12 text-red-500" /> : 
//                         <FileVideo className="h-12 w-12 text-gray-400" />
//                       }
//                     </div>
//                   )}
//                   <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
//                     <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
//                       <Play className="h-5 w-5 text-primary-600 ml-0.5" />
//                     </div>
//                   </div>
//                   {video.duration && (
//                     <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded-md flex items-center gap-1">
//                       <Clock className="h-3 w-3" />
//                       <span>{formatDuration(video.duration)}</span>
//                     </div>
//                   )}
//                   <div className="absolute top-2 left-2">
//                     <span className="px-2 py-0.5 bg-white/90 text-gray-700 text-xs font-medium rounded-full capitalize">
//                       {getCategoryDisplayName(video.type)}
//                     </span>
//                   </div>
//                   {video.isPremium && (
//                     <div className="absolute top-2 right-2">
//                       <span className="px-2 py-0.5 bg-yellow-500 text-white text-xs font-medium rounded-full">
//                         Premium
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Content */}
//                 <div className="p-4">
//                   <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
//                     {video.title}
//                   </h3>
//                   {video.description && (
//                     <p className="text-sm text-gray-500 line-clamp-2 mb-2">{video.description}</p>
//                   )}
//                   <div className="flex items-center justify-between mt-2">
//                     <div className="flex items-center gap-3 text-sm text-gray-500">
//                       <span className="flex items-center gap-1">
//                         <Eye className="h-4 w-4" />
//                         {formatViews(video.stats?.views || 0)} views
//                       </span>
//                       {video.language && <span className="capitalize">{video.language}</span>}
//                     </div>
//                     <Link
//                       to={`/video/${video.slug}`}
//                       className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1"
//                       onClick={(e) => e.stopPropagation()}
//                     >
//                       View Details <ExternalLink className="h-3 w-3" />
//                     </Link>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {/* Pagination */}
//         {pagination.totalPages > 1 && (
//           <div className="flex items-center justify-center gap-2 mt-8">
//             <button
//               onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//               disabled={currentPage === 1}
//               className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
//             >
//               <ChevronLeft className="h-5 w-5" />
//             </button>
//             <span className="px-4 py-2 text-sm">
//               Page {currentPage} of {pagination.totalPages}
//             </span>
//             <button
//               onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
//               disabled={currentPage === pagination.totalPages}
//               className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
//             >
//               <ChevronRight className="h-5 w-5" />
//             </button>
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.5; }
//         }
//         .animate-pulse { animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
//       `}</style>
//     </div>
//   );
// };

// export default VideoListPage;



















// // client/src/pages/public/VideoListPage.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import { useSearchParams, Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useQuery } from '@tanstack/react-query';
// import ReactPlayer from 'react-player';
// import { 
//   Search, Play, Clock, Eye, Grid, List, Loader2, 
//   ChevronLeft, ChevronRight, Mic, MicOff, 
//   Volume2, VolumeX, X, Sparkles, TrendingUp,
//   Pause, Square, Youtube, FileVideo, ExternalLink
// } from 'lucide-react';
// import videoAPI from '../../api/videoAPI';
// import { VIDEO_CATEGORIES } from '../../utils/constants.js';

// const VideoListPage = () => {
//   const navigate = useNavigate();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [viewMode, setViewMode] = useState('grid');
//   const [sortBy, setSortBy] = useState('popular');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isVoiceActive, setIsVoiceActive] = useState(false);
//   const [voiceStatus, setVoiceStatus] = useState('');
//   const [voiceCommand, setVoiceCommand] = useState('');
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [isPlayerOpen, setIsPlayerOpen] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [playerVolume, setPlayerVolume] = useState(0.7);
//   const [isMuted, setIsMuted] = useState(false);
//   const [playedSeconds, setPlayedSeconds] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [playerError, setPlayerError] = useState(false);
  
//   const itemsPerPage = 9;
//   const recognitionRef = useRef(null);
//   const playerRef = useRef(null);

//   // Check if URL is a valid video URL (YouTube or direct video)
//   const isValidVideoUrl = (url) => {
//     if (!url) return false;
//     // Check for YouTube URLs
//     const youtubeRegex = /(youtube\.com|youtu\.be)/;
//     // Check for direct video files
//     const videoFileRegex = /\.(mp4|webm|mov|avi|mkv)(\?.*)?$/i;
//     return youtubeRegex.test(url) || videoFileRegex.test(url);
//   };

//   // Initialize Speech Recognition
//   useEffect(() => {
//     if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
//       const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
//       recognitionRef.current = new SpeechRecognition();
//       recognitionRef.current.continuous = false;
//       recognitionRef.current.interimResults = false;
//       recognitionRef.current.lang = 'en-US';

//       recognitionRef.current.onstart = () => {
//         setIsVoiceActive(true);
//         setVoiceStatus('listening');
//       };

//       recognitionRef.current.onend = () => {
//         setIsVoiceActive(false);
//         setTimeout(() => setVoiceStatus(''), 1000);
//       };

//       recognitionRef.current.onresult = (event) => {
//         const transcript = event.results[0][0].transcript.toLowerCase();
//         setVoiceCommand(transcript);
//         processVoiceCommand(transcript);
//         setVoiceStatus('processing');
//         setTimeout(() => setVoiceStatus(''), 2000);
//       };

//       recognitionRef.current.onerror = (event) => {
//         console.error('Speech recognition error:', event.error);
//         setVoiceStatus('error');
//         setIsVoiceActive(false);
//         setTimeout(() => setVoiceStatus(''), 2000);
//       };
//     }

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.abort();
//       }
//     };
//   }, []);

//   // Process voice commands
//   const processVoiceCommand = async (command) => {
//     console.log('Processing command:', command);
    
//     if (command.includes('play')) {
//       let searchTerm = command.replace(/play|start|video|the|a|an/gi, '').trim();
//       if (searchTerm) {
//         const searchResponse = await videoAPI.getVideos({ search: searchTerm, limit: 5 });
//         const videosData = searchResponse?.data?.data || searchResponse?.data || searchResponse || [];
//         const videos = Array.isArray(videosData) ? videosData : [];
//         if (videos.length > 0) {
//           handlePlayVideo(videos[0]);
//           speak(`Playing ${videos[0].title}`);
//         } else {
//           setSearchQuery(searchTerm);
//           speak(`Searching for ${searchTerm}`);
//         }
//       }
//     }
//     else if (command.includes('stop')) {
//       handleClosePlayer();
//       speak('Video stopped');
//     }
//     else if (command.includes('pause')) {
//       setIsPlaying(false);
//       speak('Video paused');
//     }
//     else if (command.includes('resume') || command.includes('continue')) {
//       setIsPlaying(true);
//       speak('Video resumed');
//     }
//     else if (command.includes('volume up')) {
//       setPlayerVolume(prev => Math.min(1, prev + 0.1));
//       speak(`Volume increased to ${Math.round((playerVolume + 0.1) * 100)}%`);
//     }
//     else if (command.includes('volume down')) {
//       setPlayerVolume(prev => Math.max(0, prev - 0.1));
//       speak(`Volume decreased to ${Math.round((playerVolume - 0.1) * 100)}%`);
//     }
//     else if (command.includes('mute')) {
//       setIsMuted(true);
//       speak('Video muted');
//     }
//     else if (command.includes('unmute')) {
//       setIsMuted(false);
//       speak('Video unmuted');
//     }
//     else if (command.includes('search for')) {
//       let searchTerm = command.replace(/search for|find/gi, '').trim();
//       setSearchQuery(searchTerm);
//       setCurrentPage(1);
//       speak(`Searching for ${searchTerm}`);
//     }
//     else if (command.includes('mushaira') || command.includes('mushyr') || command.includes('mushayara')) {
//       setActiveCategory('mushaira');
//       setCurrentPage(1);
//       speak('Showing Mushaira videos');
//     }
//     else if (command.includes('popular') || command.includes('trending')) {
//       setSortBy('popular');
//       setActiveCategory('all');
//       setSearchQuery('');
//       setCurrentPage(1);
//       speak('Showing most popular videos');
//     }
//     else if (command.includes('latest') || command.includes('newest')) {
//       setSortBy('recent');
//       setCurrentPage(1);
//       speak('Showing latest videos');
//     }
//     else if (command.includes('sad') || command.includes('emotional')) {
//       setSearchQuery('sad poetry emotional');
//       setCurrentPage(1);
//       speak('Showing emotional and sad videos');
//     }
//     else if (command.includes('help')) {
//       speak('You can say: play video name, search for topic, show popular videos, pause, resume, stop, volume up, or volume down');
//     }
//   };

//   const speak = (message) => {
//     if ('speechSynthesis' in window) {
//       const utterance = new SpeechSynthesisUtterance(message);
//       utterance.lang = 'en-US';
//       utterance.rate = 0.9;
//       window.speechSynthesis.cancel();
//       window.speechSynthesis.speak(utterance);
//     }
//   };

//   // Handle play video in modal
//   const handlePlayVideo = (video) => {
//     if (!video.videoUrl) {
//       toast.error('This video has no URL');
//       return;
//     }
    
//     if (!isValidVideoUrl(video.videoUrl)) {
//       toast.error('Invalid video URL format');
//       return;
//     }
    
//     setSelectedVideo(video);
//     setIsPlayerOpen(true);
//     setIsPlaying(true);
//     setPlayerError(false);
//   };

//   // Handle close player
//   const handleClosePlayer = () => {
//     setIsPlaying(false);
//     setSelectedVideo(null);
//     setIsPlayerOpen(false);
//     setPlayedSeconds(0);
//     setPlayerError(false);
//   };

//   // Handle player error
//   const handlePlayerError = () => {
//     setPlayerError(true);
//     console.error('Player error for URL:', selectedVideo?.videoUrl);
//   };

//   // Handle retry play
//   const handleRetryPlay = () => {
//     setPlayerError(false);
//     setIsPlaying(true);
//   };

//   const formatDuration = (seconds) => {
//     if (!seconds) return 'N/A';
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     if (hrs > 0) {
//       return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//     }
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   const formatTime = (seconds) => {
//     if (!seconds) return '0:00';
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   const formatViews = (views) => {
//     if (!views) return '0';
//     if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
//     if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
//     return views.toString();
//   };

//   // Fetch videos
//   const { data: response, isLoading, error, refetch } = useQuery({
//     queryKey: ['videos', currentPage, activeCategory, sortBy, searchQuery],
//     queryFn: () => videoAPI.getVideos({
//       page: currentPage,
//       limit: itemsPerPage,
//       type: activeCategory !== 'all' ? activeCategory : undefined,
//       search: searchQuery || undefined,
//       sort: sortBy
//     }),
//     enabled: true,
//     staleTime: 30000,
//     keepPreviousData: true
//   });

//   const videosData = response?.data?.data || response?.data || response || [];
//   const videos = Array.isArray(videosData) ? videosData : [];
//   const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 };

//   useEffect(() => {
//     if (activeCategory && activeCategory !== 'all') {
//       setSearchParams({ category: activeCategory });
//     } else {
//       setSearchParams({});
//     }
//     setCurrentPage(1);
//   }, [activeCategory, setSearchParams]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery]);

//   const clearFilters = () => {
//     setSearchQuery('');
//     setActiveCategory('all');
//     setSortBy('popular');
//     setCurrentPage(1);
//   };

//   const sortOptions = [
//     { value: 'popular', label: 'Most Popular', icon: TrendingUp },
//     { value: 'recent', label: 'Most Recent', icon: Clock },
//     { value: 'views', label: 'Most Viewed', icon: Eye }
//   ];

//   const getCategoryDisplayName = (type) => {
//     const category = VIDEO_CATEGORIES.find(cat => cat.id === type?.toLowerCase());
//     return category?.label || type || 'Video';
//   };

//   const voiceSuggestions = [
//     { command: "Play video", icon: Play },
//     { command: "Search for Mushaira", icon: Search },
//     { command: "Show popular videos", icon: TrendingUp },
//     { command: "Pause", icon: Pause },
//     { command: "Resume", icon: Play },
//     { command: "Stop", icon: Square },
//     { command: "Volume up", icon: Volume2 }
//   ];

//   const startVoiceRecognition = () => {
//     if (recognitionRef.current) {
//       try {
//         recognitionRef.current.start();
//       } catch (error) {
//         console.error('Error starting recognition:', error);
//         setVoiceStatus('error');
//       }
//     } else {
//       alert('Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
//     }
//   };

//   const stopVoiceRecognition = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//     }
//     setIsVoiceActive(false);
//   };

//   if (isLoading && videos.length === 0) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-center min-h-[60vh]">
//             <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
//             <p className="text-gray-500">Loading videos...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Video Player Modal */}
//         {isPlayerOpen && selectedVideo && (
//           <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
//             <div className="relative w-full max-w-5xl bg-black rounded-xl overflow-hidden">
//               <button
//                 onClick={handleClosePlayer}
//                 className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors text-white"
//               >
//                 <X className="h-6 w-6" />
//               </button>

//               <div className="absolute top-4 left-4 z-10 text-white">
//                 <h3 className="text-lg font-semibold">{selectedVideo.title}</h3>
//                 {selectedVideo.author && (
//                   <p className="text-sm text-gray-300">
//                     {typeof selectedVideo.author === 'object' ? selectedVideo.author.name : selectedVideo.author}
//                   </p>
//                 )}
//               </div>

//               <div className="w-full bg-black" style={{ minHeight: '400px' }}>
//                 {playerError ? (
//                   <div className="flex flex-col items-center justify-center h-[70vh] text-white">
//                     <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
//                     <h3 className="text-xl font-semibold mb-2">Unable to play video</h3>
//                     <p className="text-gray-400 mb-4">The video URL might be invalid or inaccessible</p>
//                     <div className="flex gap-3">
//                       <button
//                         onClick={handleRetryPlay}
//                         className="px-4 py-2 bg-primary-600 rounded-lg hover:bg-primary-700"
//                       >
//                         Try Again
//                       </button>
//                       <button
//                         onClick={() => navigate(`/video/${selectedVideo.slug}`)}
//                         className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
//                       >
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <ReactPlayer
//                     ref={playerRef}
//                     url={selectedVideo.videoUrl}
//                     playing={isPlaying}
//                     volume={isMuted ? 0 : playerVolume}
//                     width="100%"
//                     height="70vh"
//                     controls={true}
//                     config={{
//                       youtube: {
//                         playerVars: {
//                           modestbranding: 1,
//                           rel: 0,
//                           showinfo: 1,
//                           controls: 1,
//                           autoplay: 1
//                         }
//                       },
//                       file: {
//                         attributes: {
//                           controlsList: 'nodownload'
//                         }
//                       }
//                     }}
//                     onEnded={() => {
//                       setIsPlaying(false);
//                       speak('Video ended');
//                     }}
//                     onPlay={() => setIsPlaying(true)}
//                     onPause={() => setIsPlaying(false)}
//                     onDuration={(d) => setDuration(d)}
//                     onProgress={({ playedSeconds }) => setPlayedSeconds(playedSeconds)}
//                     onError={handlePlayerError}
//                   />
//                 )}
//               </div>

//               <div className="p-4 bg-gray-900">
//                 <div className="flex items-center justify-between flex-wrap gap-4">
//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={() => setIsPlaying(!isPlaying)}
//                       className="p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors"
//                       disabled={playerError}
//                     >
//                       {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
//                     </button>
//                     <button
//                       onClick={() => setIsMuted(!isMuted)}
//                       className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
//                       disabled={playerError}
//                     >
//                       {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
//                     </button>
//                     <input
//                       type="range"
//                       min="0"
//                       max="1"
//                       step="0.01"
//                       value={playerVolume}
//                       onChange={(e) => setPlayerVolume(parseFloat(e.target.value))}
//                       className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
//                       disabled={playerError}
//                     />
//                     <div className="text-white text-sm">
//                       {formatTime(playedSeconds)} / {formatTime(duration)}
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => {
//                       handleClosePlayer();
//                       navigate(`/video/${selectedVideo.slug}`);
//                     }}
//                     className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
//                   >
//                     <ExternalLink className="h-4 w-4" />
//                     <span>View Details</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between flex-wrap gap-4">
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
//                 Video Library
//               </h1>
//               <p className="text-gray-500">
//                 Mushaira, interviews, documentaries, lectures, and more from Urdu literature
//               </p>
//             </div>
            
//             <div className="relative">
//               <button
//                 onClick={isVoiceActive ? stopVoiceRecognition : startVoiceRecognition}
//                 className={`relative group flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all ${
//                   isVoiceActive 
//                     ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse' 
//                     : 'bg-primary-600 text-white shadow-lg hover:shadow-xl'
//                 }`}
//               >
//                 {isVoiceActive ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
//                 <span>{isVoiceActive ? 'Listening...' : 'Voice Assistant'}</span>
//               </button>
              
//               {voiceStatus === 'listening' && (
//                 <div className="absolute -bottom-8 left-0 right-0 text-center">
//                   <span className="text-xs text-green-600 animate-pulse">🔴 Listening... Speak now</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Voice Command Display */}
//         {voiceCommand && (
//           <motion.div 
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mb-4 p-3 bg-primary-50 border border-primary-200 rounded-lg"
//           >
//             <div className="flex items-center gap-2">
//               <Mic className="h-4 w-4 text-primary-600" />
//               <span className="text-sm text-gray-600">You said:</span>
//               <span className="text-sm font-medium text-primary-700">"{voiceCommand}"</span>
//             </div>
//           </motion.div>
//         )}

//         {/* Voice Command Suggestions */}
//         <div className="mb-6 overflow-x-auto">
//           <div className="flex gap-2 pb-2">
//             {voiceSuggestions.map((suggestion, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => processVoiceCommand(suggestion.command.toLowerCase())}
//                 className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-gray-50 hover:border-primary-300 transition-all whitespace-nowrap"
//               >
//                 <suggestion.icon className="h-3.5 w-3.5" />
//                 <span>{suggestion.command}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Search & Controls */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search videos... (Try 'mushyr' for Mushaira)"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white"
//             />
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery('')}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//             )}
//           </div>
//           <div className="flex items-center gap-2">
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="px-4 py-2.5 border border-gray-200 rounded-lg bg-white"
//             >
//               {sortOptions.map(option => (
//                 <option key={option.value} value={option.value}>{option.label}</option>
//               ))}
//             </select>
//             <div className="flex border border-gray-300 rounded-lg overflow-hidden">
//               <button
//                 onClick={() => setViewMode('grid')}
//                 className={`p-2.5 ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-600'}`}
//               >
//                 <Grid className="h-5 w-5" />
//               </button>
//               <button
//                 onClick={() => setViewMode('list')}
//                 className={`p-2.5 ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-600'}`}
//               >
//                 <List className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Categories */}
//         <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
//           <button
//             onClick={() => setActiveCategory('all')}
//             className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//               activeCategory === 'all'
//                 ? 'bg-primary-600 text-white shadow-md'
//                 : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
//             }`}
//           >
//             All Videos
//           </button>
//           {VIDEO_CATEGORIES.map((cat) => (
//             <button
//               key={cat.id}
//               onClick={() => setActiveCategory(cat.id)}
//               className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//                 activeCategory === cat.id
//                   ? 'bg-primary-600 text-white shadow-md'
//                   : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
//               }`}
//             >
//               {cat.label}
//             </button>
//           ))}
//         </div>

//         {/* Results Count */}
//         <div className="flex justify-between items-center mb-4">
//           <p className="text-sm text-gray-500">
//             {searchQuery ? (
//               <>Found {pagination.total || videos.length} result(s) for "<strong>{searchQuery}</strong>"</>
//             ) : (
//               <>Showing {videos.length} of {pagination.total || videos.length} videos</>
//             )}
//           </p>
//           {(searchQuery || activeCategory !== 'all') && (
//             <button onClick={clearFilters} className="text-sm text-primary-600 hover:text-primary-700">
//               Clear filters
//             </button>
//           )}
//         </div>

//         {/* Videos Grid */}
//         {videos.length === 0 ? (
//           <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
//             <Play className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
//             <p className="text-gray-500">
//               {searchQuery 
//                 ? `No videos matching "${searchQuery}". Try "mushyr" for Mushaira videos.`
//                 : 'No videos available in this category yet.'}
//             </p>
//           </div>
//         ) : (
//           <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
//             {videos.map((video, index) => (
//               <motion.div
//                 key={video._id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.05 }}
//                 className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
//               >
//                 {/* Thumbnail with Play Button */}
//                 <div 
//                   className="relative overflow-hidden cursor-pointer" 
//                   onClick={() => handlePlayVideo(video)}
//                 >
//                   {video.thumbnail ? (
//                     <img
//                       src={video.thumbnail}
//                       alt={video.title}
//                       className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
//                       loading="lazy"
//                       onError={(e) => {
//                         e.target.src = '';
//                         e.target.style.backgroundColor = '#f3f4f6';
//                       }}
//                     />
//                   ) : (
//                     <div className="w-full aspect-video bg-gray-200 flex items-center justify-center">
//                       {video.videoUrl?.includes('youtube') ? 
//                         <Youtube className="h-12 w-12 text-red-500" /> : 
//                         <FileVideo className="h-12 w-12 text-gray-400" />
//                       }
//                     </div>
//                   )}
//                   <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
//                     <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
//                       <Play className="h-5 w-5 text-primary-600 ml-0.5" />
//                     </div>
//                   </div>
//                   {video.duration && (
//                     <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded-md flex items-center gap-1">
//                       <Clock className="h-3 w-3" />
//                       <span>{formatDuration(video.duration)}</span>
//                     </div>
//                   )}
//                   <div className="absolute top-2 left-2">
//                     <span className="px-2 py-0.5 bg-white/90 text-gray-700 text-xs font-medium rounded-full capitalize">
//                       {getCategoryDisplayName(video.type)}
//                     </span>
//                   </div>
//                   {video.isPremium && (
//                     <div className="absolute top-2 right-2">
//                       <span className="px-2 py-0.5 bg-yellow-500 text-white text-xs font-medium rounded-full">
//                         Premium
//                       </span>
//                     </div>
//                   )}
//                   {/* Video Source Badge */}
//                   <div className="absolute bottom-2 left-2">
//                     <span className="px-2 py-0.5 bg-black/70 text-white text-xs rounded-full flex items-center gap-1">
//                       {video.videoUrl?.includes('youtube') ? 
//                         <Youtube className="h-3 w-3" /> : 
//                         <FileVideo className="h-3 w-3" />
//                       }
//                       <span>{video.videoUrl?.includes('youtube') ? 'YouTube' : 'Video'}</span>
//                     </span>
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <div className="p-4">
//                   <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
//                     {video.title}
//                   </h3>
//                   {video.description && (
//                     <p className="text-sm text-gray-500 line-clamp-2 mb-2">{video.description}</p>
//                   )}
//                   <div className="flex items-center justify-between mt-2">
//                     <div className="flex items-center gap-3 text-sm text-gray-500">
//                       <span className="flex items-center gap-1">
//                         <Eye className="h-4 w-4" />
//                         {formatViews(video.stats?.views || 0)} views
//                       </span>
//                       {video.language && <span className="capitalize">{video.language}</span>}
//                     </div>
//                     <Link
//                       to={`/video/${video.slug}`}
//                       className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1"
//                       onClick={(e) => e.stopPropagation()}
//                     >
//                       View Details <ExternalLink className="h-3 w-3" />
//                     </Link>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {/* Pagination */}
//         {pagination.totalPages > 1 && (
//           <div className="flex items-center justify-center gap-2 mt-8">
//             <button
//               onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//               disabled={currentPage === 1}
//               className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
//             >
//               <ChevronLeft className="h-5 w-5" />
//             </button>
//             <span className="px-4 py-2 text-sm">
//               Page {currentPage} of {pagination.totalPages}
//             </span>
//             <button
//               onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
//               disabled={currentPage === pagination.totalPages}
//               className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
//             >
//               <ChevronRight className="h-5 w-5" />
//             </button>
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.5; }
//         }
//         .animate-pulse { animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
//       `}</style>
//     </div>
//   );
// };

// export default VideoListPage;














// // client/src/pages/public/VideoListPage.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import { useSearchParams, Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useQuery } from '@tanstack/react-query';
// import ReactPlayer from 'react-player';
// import { toast } from 'sonner'; // or 'react-hot-toast' depending on your setupimport { toast } from 'react-toastify';
// //import { toast } from 'react-toastify';
// import { 
//   Search, Play, Clock, Eye, Grid, List, Loader2, 
//   ChevronLeft, ChevronRight, Mic, MicOff, 
//   Volume2, VolumeX, X, Sparkles, TrendingUp,
//   Pause, Square, Youtube, FileVideo, ExternalLink,
//   AlertCircle // <-- FIX #1: Added missing import
// } from 'lucide-react';
// import videoAPI from '../../api/videoAPI';
// import { VIDEO_CATEGORIES } from '../../utils/constants.js';

// const VideoListPage = () => {
//   const navigate = useNavigate();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [viewMode, setViewMode] = useState('grid');
//   const [sortBy, setSortBy] = useState('popular');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isVoiceActive, setIsVoiceActive] = useState(false);
//   const [voiceStatus, setVoiceStatus] = useState('');
//   const [voiceCommand, setVoiceCommand] = useState('');
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [isPlayerOpen, setIsPlayerOpen] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [playerVolume, setPlayerVolume] = useState(0.7);
//   const [isMuted, setIsMuted] = useState(false);
//   const [playedSeconds, setPlayedSeconds] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [playerError, setPlayerError] = useState(false);
//   const [streamUrl, setStreamUrl] = useState(null); // <-- FIX: Store actual playable URL
  
//   const itemsPerPage = 9;
//   const recognitionRef = useRef(null);
//   const playerRef = useRef(null);

//   // Check if URL is a valid video URL (YouTube or direct video)
//   const isValidVideoUrl = (url) => {
//     if (!url) return false;
//     // Check for YouTube URLs (various formats)
//     const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)/;
//     // Check for direct video files
//     const videoFileRegex = /\.(mp4|webm|ogg|mov|avi|mkv)(\?.*)?$/i;
//     // Check for common streaming protocols
//     const streamRegex = /^(https?:\/\/)/;
//     return youtubeRegex.test(url) || videoFileRegex.test(url) || streamRegex.test(url);
//   };

//   // Initialize Speech Recognition
//   useEffect(() => {
//     if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
//       const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
//       recognitionRef.current = new SpeechRecognition();
//       recognitionRef.current.continuous = false;
//       recognitionRef.current.interimResults = false;
//       recognitionRef.current.lang = 'en-US';

//       recognitionRef.current.onstart = () => {
//         setIsVoiceActive(true);
//         setVoiceStatus('listening');
//       };

//       recognitionRef.current.onend = () => {
//         setIsVoiceActive(false);
//         setTimeout(() => setVoiceStatus(''), 1000);
//       };

//       recognitionRef.current.onresult = (event) => {
//         const transcript = event.results[0][0].transcript.toLowerCase();
//         setVoiceCommand(transcript);
//         processVoiceCommand(transcript);
//         setVoiceStatus('processing');
//         setTimeout(() => setVoiceStatus(''), 2000);
//       };

//       recognitionRef.current.onerror = (event) => {
//         console.error('Speech recognition error:', event.error);
//         setVoiceStatus('error');
//         setIsVoiceActive(false);
//         setTimeout(() => setVoiceStatus(''), 2000);
//       };
//     }

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.abort();
//       }
//     };
//   }, []);

//   // Process voice commands
//   const processVoiceCommand = async (command) => {
//     console.log('Processing command:', command);
    
//     if (command.includes('play')) {
//       let searchTerm = command.replace(/play|start|video|the|a|an/gi, '').trim();
//       if (searchTerm) {
//         const searchResponse = await videoAPI.getVideos({ search: searchTerm, limit: 5 });
//         const videosData = searchResponse?.data?.data || searchResponse?.data || searchResponse || [];
//         const videos = Array.isArray(videosData) ? videosData : [];
//         if (videos.length > 0) {
//           handlePlayVideo(videos[0]);
//           speak(`Playing ${videos[0].title}`);
//         } else {
//           setSearchQuery(searchTerm);
//           speak(`Searching for ${searchTerm}`);
//         }
//       }
//     }
//     else if (command.includes('stop')) {
//       handleClosePlayer();
//       speak('Video stopped');
//     }
//     else if (command.includes('pause')) {
//       setIsPlaying(false);
//       speak('Video paused');
//     }
//     else if (command.includes('resume') || command.includes('continue')) {
//       setIsPlaying(true);
//       speak('Video resumed');
//     }
//     else if (command.includes('volume up')) {
//       setPlayerVolume(prev => Math.min(1, prev + 0.1));
//       speak(`Volume increased to ${Math.round((playerVolume + 0.1) * 100)}%`);
//     }
//     else if (command.includes('volume down')) {
//       setPlayerVolume(prev => Math.max(0, prev - 0.1));
//       speak(`Volume decreased to ${Math.round((playerVolume - 0.1) * 100)}%`);
//     }
//     else if (command.includes('mute')) {
//       setIsMuted(true);
//       speak('Video muted');
//     }
//     else if (command.includes('unmute')) {
//       setIsMuted(false);
//       speak('Video unmuted');
//     }
//     else if (command.includes('search for')) {
//       let searchTerm = command.replace(/search for|find/gi, '').trim();
//       setSearchQuery(searchTerm);
//       setCurrentPage(1);
//       speak(`Searching for ${searchTerm}`);
//     }
//     else if (command.includes('mushaira') || command.includes('mushyr') || command.includes('mushayara')) {
//       setActiveCategory('mushaira');
//       setCurrentPage(1);
//       speak('Showing Mushaira videos');
//     }
//     else if (command.includes('popular') || command.includes('trending')) {
//       setSortBy('popular');
//       setActiveCategory('all');
//       setSearchQuery('');
//       setCurrentPage(1);
//       speak('Showing most popular videos');
//     }
//     else if (command.includes('latest') || command.includes('newest')) {
//       setSortBy('recent');
//       setCurrentPage(1);
//       speak('Showing latest videos');
//     }
//     else if (command.includes('sad') || command.includes('emotional')) {
//       setSearchQuery('sad poetry emotional');
//       setCurrentPage(1);
//       speak('Showing emotional and sad videos');
//     }
//     else if (command.includes('help')) {
//       speak('You can say: play video name, search for topic, show popular videos, pause, resume, stop, volume up, or volume down');
//     }
//   };

//   const speak = (message) => {
//     if ('speechSynthesis' in window) {
//       const utterance = new SpeechSynthesisUtterance(message);
//       utterance.lang = 'en-US';
//       utterance.rate = 0.9;
//       window.speechSynthesis.cancel();
//       window.speechSynthesis.speak(utterance);
//     }
//   };

//   // FIX #2: Handle play video - properly fetch stream URL and validate
//   const handlePlayVideo = async (video) => {
//     if (!video?.videoUrl) {
//       toast.error('This video has no URL');
//       return;
//     }
    
//     if (!isValidVideoUrl(video.videoUrl)) {
//       toast.error('Invalid video URL format');
//       return;
//     }
    
//     setSelectedVideo(video);
//     setIsPlayerOpen(true);
//     setPlayerError(false);
//     setStreamUrl(null); // Reset while loading
    
//     try {
//       // For YouTube videos, use the direct URL (ReactPlayer handles YouTube URLs natively)
//       // For uploaded videos, try to get the stream URL from API first
//       if (!video.videoUrl.includes('youtube') && !video.videoUrl.includes('youtu.be')) {
//         // Try to get stream URL for non-YouTube videos
//         const streamResponse = await videoAPI.getVideoStream(video.slug);
//         const streamData = streamResponse?.data || streamResponse;
//         if (streamData?.streamUrl) {
//           setStreamUrl(streamData.streamUrl);
//         } else {
//           setStreamUrl(video.videoUrl); // Fallback to direct URL
//         }
//       } else {
//         // For YouTube, use direct URL - ReactPlayer will parse it
//         setStreamUrl(video.videoUrl);
//       }
      
//       // Small delay to ensure ReactPlayer has URL before playing
//       setTimeout(() => setIsPlaying(true), 300);
//     } catch (error) {
//       console.error('Error fetching stream:', error);
//       // Fallback to direct URL
//       setStreamUrl(video.videoUrl);
//       setTimeout(() => setIsPlaying(true), 300);
//     }
//   };

//   // Handle close player
//   const handleClosePlayer = () => {
//     setIsPlaying(false);
//     setSelectedVideo(null);
//     setIsPlayerOpen(false);
//     setPlayedSeconds(0);
//     setPlayerError(false);
//     setStreamUrl(null);
//   };

//   // Handle player error
//   const handlePlayerError = (error) => {
//     console.error('Player error for URL:', streamUrl, error);
//     setPlayerError(true);
//     setIsPlaying(false);
//   };

//   // Handle retry play
//   const handleRetryPlay = () => {
//     setPlayerError(false);
//     // Force ReactPlayer to remount by briefly clearing URL
//     const currentUrl = streamUrl;
//     setStreamUrl(null);
//     setTimeout(() => {
//       setStreamUrl(currentUrl);
//       setIsPlaying(true);
//     }, 100);
//   };

//   const formatDuration = (seconds) => {
//     if (!seconds) return 'N/A';
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = Math.floor(seconds % 60);
//     if (hrs > 0) {
//       return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//     }
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   const formatTime = (seconds) => {
//     if (!seconds) return '0:00';
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   const formatViews = (views) => {
//     if (!views) return '0';
//     if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
//     if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
//     return views.toString();
//   };

//   // Fetch videos
//   const { data: response, isLoading, error, refetch } = useQuery({
//     queryKey: ['videos', currentPage, activeCategory, sortBy, searchQuery],
//     queryFn: () => videoAPI.getVideos({
//       page: currentPage,
//       limit: itemsPerPage,
//       type: activeCategory !== 'all' ? activeCategory : undefined,
//       search: searchQuery || undefined,
//       sort: sortBy
//     }),
//     enabled: true,
//     staleTime: 30000,
//     keepPreviousData: true
//   });

//   const videosData = response?.data?.data || response?.data || response || [];
//   const videos = Array.isArray(videosData) ? videosData : [];
//   const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 };

//   useEffect(() => {
//     if (activeCategory && activeCategory !== 'all') {
//       setSearchParams({ category: activeCategory });
//     } else {
//       setSearchParams({});
//     }
//     setCurrentPage(1);
//   }, [activeCategory, setSearchParams]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery]);

//   const clearFilters = () => {
//     setSearchQuery('');
//     setActiveCategory('all');
//     setSortBy('popular');
//     setCurrentPage(1);
//   };

//   const sortOptions = [
//     { value: 'popular', label: 'Most Popular', icon: TrendingUp },
//     { value: 'recent', label: 'Most Recent', icon: Clock },
//     { value: 'views', label: 'Most Viewed', icon: Eye }
//   ];

//   const getCategoryDisplayName = (type) => {
//     const category = VIDEO_CATEGORIES.find(cat => cat.id === type?.toLowerCase());
//     return category?.label || type || 'Video';
//   };

//   const voiceSuggestions = [
//     { command: "Play video", icon: Play },
//     { command: "Search for Mushaira", icon: Search },
//     { command: "Show popular videos", icon: TrendingUp },
//     { command: "Pause", icon: Pause },
//     { command: "Resume", icon: Play },
//     { command: "Stop", icon: Square },
//     { command: "Volume up", icon: Volume2 }
//   ];

//   const startVoiceRecognition = () => {
//     if (recognitionRef.current) {
//       try {
//         recognitionRef.current.start();
//       } catch (error) {
//         console.error('Error starting recognition:', error);
//         setVoiceStatus('error');
//       }
//     } else {
//       alert('Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
//     }
//   };

//   const stopVoiceRecognition = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//     }
//     setIsVoiceActive(false);
//   };

//   if (isLoading && videos.length === 0) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-center min-h-[60vh]">
//             <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
//             <p className="text-gray-500">Loading videos...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Video Player Modal */}
//         {isPlayerOpen && selectedVideo && (
//           <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
//             <div className="relative w-full max-w-5xl bg-black rounded-xl overflow-hidden">
//               <button
//                 onClick={handleClosePlayer}
//                 className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors text-white"
//               >
//                 <X className="h-6 w-6" />
//               </button>

//               <div className="absolute top-4 left-4 z-10 text-white pointer-events-none">
//                 <h3 className="text-lg font-semibold">{selectedVideo.title}</h3>
//                 {selectedVideo.author && (
//                   <p className="text-sm text-gray-300">
//                     {typeof selectedVideo.author === 'object' ? selectedVideo.author.name : selectedVideo.author}
//                   </p>
//                 )}
//               </div>

//               <div className="w-full bg-black" style={{ minHeight: '400px' }}>
//                 {playerError ? (
//                   <div className="flex flex-col items-center justify-center h-[70vh] text-white">
//                     <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
//                     <h3 className="text-xl font-semibold mb-2">Unable to play video</h3>
//                     <p className="text-gray-400 mb-2">The video URL might be invalid or inaccessible</p>
//                     <p className="text-gray-500 text-sm mb-4 max-w-md text-center break-all">
//                       URL: {streamUrl || selectedVideo?.videoUrl || 'N/A'}
//                     </p>
//                     <div className="flex gap-3">
//                       <button
//                         onClick={handleRetryPlay}
//                         className="px-4 py-2 bg-primary-600 rounded-lg hover:bg-primary-700"
//                       >
//                         Try Again
//                       </button>
//                       <button
//                         onClick={() => {
//                           // Open in new tab as fallback
//                           const url = streamUrl || selectedVideo?.videoUrl;
//                           if (url) window.open(url, '_blank');
//                         }}
//                         className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
//                       >
//                         Open in New Tab
//                       </button>
//                       <button
//                         onClick={() => navigate(`/video/${selectedVideo.slug}`)}
//                         className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
//                       >
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 ) : !streamUrl ? (
//                   <div className="flex flex-col items-center justify-center h-[70vh] text-white">
//                     <Loader2 className="h-12 w-12 animate-spin text-primary-600 mb-4" />
//                     <p className="text-gray-400">Loading video...</p>
//                   </div>
//                 ) : (
//                   <ReactPlayer
//                     ref={playerRef}
//                     key={streamUrl} // <-- FIX #3: Force remount when URL changes
//                     url={streamUrl}
//                     playing={isPlaying}
//                     volume={isMuted ? 0 : playerVolume}
//                     width="100%"
//                     height="70vh"
//                     controls={true}
//                     config={{
//                       youtube: {
//                         playerVars: {
//                           modestbranding: 1,
//                           rel: 0,
//                           // FIX #4: Removed deprecated 'showinfo', use 'origin' for security
//                           controls: 1,
//                           autoplay: 0 // Let ReactPlayer handle autoplay via 'playing' prop
//                         },
//                         embedOptions: {
//                           host: 'https://www.youtube-nocookie.com' // Privacy-enhanced mode
//                         }
//                       },
//                       file: {
//                         forceVideo: true,
//                         attributes: {
//                           controlsList: 'nodownload',
//                           crossOrigin: 'anonymous'
//                         }
//                       }
//                     }}
//                     onReady={() => console.log('Player ready')}
//                     onStart={() => console.log('Player started')}
//                     onEnded={() => {
//                       setIsPlaying(false);
//                       speak('Video ended');
//                     }}
//                     onPlay={() => setIsPlaying(true)}
//                     onPause={() => setIsPlaying(false)}
//                     onDuration={(d) => setDuration(d)}
//                     onProgress={({ playedSeconds }) => setPlayedSeconds(playedSeconds)}
//                     onError={handlePlayerError}
//                     onBuffer={() => console.log('Buffering...')}
//                     onBufferEnd={() => console.log('Buffer ended')}
//                   />
//                 )}
//               </div>

//               <div className="p-4 bg-gray-900">
//                 <div className="flex items-center justify-between flex-wrap gap-4">
//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={() => setIsPlaying(!isPlaying)}
//                       className="p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors"
//                       disabled={playerError || !streamUrl}
//                     >
//                       {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
//                     </button>
//                     <button
//                       onClick={() => setIsMuted(!isMuted)}
//                       className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
//                       disabled={playerError || !streamUrl}
//                     >
//                       {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
//                     </button>
//                     <input
//                       type="range"
//                       min="0"
//                       max="1"
//                       step="0.01"
//                       value={playerVolume}
//                       onChange={(e) => setPlayerVolume(parseFloat(e.target.value))}
//                       className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
//                       disabled={playerError || !streamUrl}
//                     />
//                     <div className="text-white text-sm">
//                       {formatTime(playedSeconds)} / {formatTime(duration)}
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => {
//                       handleClosePlayer();
//                       navigate(`/video/${selectedVideo.slug}`);
//                     }}
//                     className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
//                   >
//                     <ExternalLink className="h-4 w-4" />
//                     <span>View Details</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between flex-wrap gap-4">
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
//                 Video Library
//               </h1>
//               <p className="text-gray-500">
//                 Mushaira, interviews, documentaries, lectures, and more from Urdu literature
//               </p>
//             </div>
            
//             <div className="relative">
//               <button
//                 onClick={isVoiceActive ? stopVoiceRecognition : startVoiceRecognition}
//                 className={`relative group flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all ${
//                   isVoiceActive 
//                     ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse' 
//                     : 'bg-primary-600 text-white shadow-lg hover:shadow-xl'
//                 }`}
//               >
//                 {isVoiceActive ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
//                 <span>{isVoiceActive ? 'Listening...' : 'Voice Assistant'}</span>
//               </button>
              
//               {voiceStatus === 'listening' && (
//                 <div className="absolute -bottom-8 left-0 right-0 text-center">
//                   <span className="text-xs text-green-600 animate-pulse">🔴 Listening... Speak now</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Voice Command Display */}
//         {voiceCommand && (
//           <motion.div 
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mb-4 p-3 bg-primary-50 border border-primary-200 rounded-lg"
//           >
//             <div className="flex items-center gap-2">
//               <Mic className="h-4 w-4 text-primary-600" />
//               <span className="text-sm text-gray-600">You said:</span>
//               <span className="text-sm font-medium text-primary-700">"{voiceCommand}"</span>
//             </div>
//           </motion.div>
//         )}

//         {/* Voice Command Suggestions */}
//         <div className="mb-6 overflow-x-auto">
//           <div className="flex gap-2 pb-2">
//             {voiceSuggestions.map((suggestion, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => processVoiceCommand(suggestion.command.toLowerCase())}
//                 className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-gray-50 hover:border-primary-300 transition-all whitespace-nowrap"
//               >
//                 <suggestion.icon className="h-3.5 w-3.5" />
//                 <span>{suggestion.command}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Search & Controls */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search videos... (Try 'mushyr' for Mushaira)"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white"
//             />
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery('')}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//             )}
//           </div>
//           <div className="flex items-center gap-2">
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="px-4 py-2.5 border border-gray-200 rounded-lg bg-white"
//             >
//               {sortOptions.map(option => (
//                 <option key={option.value} value={option.value}>{option.label}</option>
//               ))}
//             </select>
//             <div className="flex border border-gray-300 rounded-lg overflow-hidden">
//               <button
//                 onClick={() => setViewMode('grid')}
//                 className={`p-2.5 ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-600'}`}
//               >
//                 <Grid className="h-5 w-5" />
//               </button>
//               <button
//                 onClick={() => setViewMode('list')}
//                 className={`p-2.5 ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-600'}`}
//               >
//                 <List className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Categories */}
//         <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
//           <button
//             onClick={() => setActiveCategory('all')}
//             className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//               activeCategory === 'all'
//                 ? 'bg-primary-600 text-white shadow-md'
//                 : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
//             }`}
//           >
//             All Videos
//           </button>
//           {VIDEO_CATEGORIES.map((cat) => (
//             <button
//               key={cat.id}
//               onClick={() => setActiveCategory(cat.id)}
//               className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//                 activeCategory === cat.id
//                   ? 'bg-primary-600 text-white shadow-md'
//                   : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
//               }`}
//             >
//               {cat.label}
//             </button>
//           ))}
//         </div>

//         {/* Results Count */}
//         <div className="flex justify-between items-center mb-4">
//           <p className="text-sm text-gray-500">
//             {searchQuery ? (
//               <>Found {pagination.total || videos.length} result(s) for "<strong>{searchQuery}</strong>"</>
//             ) : (
//               <>Showing {videos.length} of {pagination.total || videos.length} videos</>
//             )}
//           </p>
//           {(searchQuery || activeCategory !== 'all') && (
//             <button onClick={clearFilters} className="text-sm text-primary-600 hover:text-primary-700">
//               Clear filters
//             </button>
//           )}
//         </div>

//         {/* Videos Grid */}
//         {videos.length === 0 ? (
//           <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
//             <Play className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
//             <p className="text-gray-500">
//               {searchQuery 
//                 ? `No videos matching "${searchQuery}". Try "mushyr" for Mushaira videos.`
//                 : 'No videos available in this category yet.'}
//             </p>
//           </div>
//         ) : (
//           <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
//             {videos.map((video, index) => (
//               <motion.div
//                 key={video._id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.05 }}
//                 className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
//               >
//                 {/* Thumbnail with Play Button */}
//                 <div 
//                   className="relative overflow-hidden cursor-pointer" 
//                   onClick={() => handlePlayVideo(video)}
//                 >
//                   {video.thumbnail ? (
//                     <img
//                       src={video.thumbnail}
//                       alt={video.title}
//                       className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
//                       loading="lazy"
//                       onError={(e) => {
//                         e.target.src = '';
//                         e.target.style.backgroundColor = '#f3f4f6';
//                       }}
//                     />
//                   ) : (
//                     <div className="w-full aspect-video bg-gray-200 flex items-center justify-center">
//                       {video.videoUrl?.includes('youtube') ? 
//                         <Youtube className="h-12 w-12 text-red-500" /> : 
//                         <FileVideo className="h-12 w-12 text-gray-400" />
//                       }
//                     </div>
//                   )}
//                   <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
//                     <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
//                       <Play className="h-5 w-5 text-primary-600 ml-0.5" />
//                     </div>
//                   </div>
//                   {video.duration && (
//                     <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded-md flex items-center gap-1">
//                       <Clock className="h-3 w-3" />
//                       <span>{formatDuration(video.duration)}</span>
//                     </div>
//                   )}
//                   <div className="absolute top-2 left-2">
//                     <span className="px-2 py-0.5 bg-white/90 text-gray-700 text-xs font-medium rounded-full capitalize">
//                       {getCategoryDisplayName(video.type)}
//                     </span>
//                   </div>
//                   {video.isPremium && (
//                     <div className="absolute top-2 right-2">
//                       <span className="px-2 py-0.5 bg-yellow-500 text-white text-xs font-medium rounded-full">
//                         Premium
//                       </span>
//                     </div>
//                   )}
//                   {/* Video Source Badge */}
//                   <div className="absolute bottom-2 left-2">
//                     <span className="px-2 py-0.5 bg-black/70 text-white text-xs rounded-full flex items-center gap-1">
//                       {video.videoUrl?.includes('youtube') ? 
//                         <Youtube className="h-3 w-3" /> : 
//                         <FileVideo className="h-3 w-3" />
//                       }
//                       <span>{video.videoUrl?.includes('youtube') ? 'YouTube' : 'Video'}</span>
//                     </span>
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <div className="p-4">
//                   <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
//                     {video.title}
//                   </h3>
//                   {video.description && (
//                     <p className="text-sm text-gray-500 line-clamp-2 mb-2">{video.description}</p>
//                   )}
//                   <div className="flex items-center justify-between mt-2">
//                     <div className="flex items-center gap-3 text-sm text-gray-500">
//                       <span className="flex items-center gap-1">
//                         <Eye className="h-4 w-4" />
//                         {formatViews(video.stats?.views || 0)} views
//                       </span>
//                       {video.language && <span className="capitalize">{video.language}</span>}
//                     </div>
//                     <Link
//                       to={`/video/${video.slug}`}
//                       className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1"
//                       onClick={(e) => e.stopPropagation()}
//                     >
//                       View Details <ExternalLink className="h-3 w-3" />
//                     </Link>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {/* Pagination */}
//         {pagination.totalPages > 1 && (
//           <div className="flex items-center justify-center gap-2 mt-8">
//             <button
//               onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//               disabled={currentPage === 1}
//               className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
//             >
//               <ChevronLeft className="h-5 w-5" />
//             </button>
//             <span className="px-4 py-2 text-sm">
//               Page {currentPage} of {pagination.totalPages}
//             </span>
//             <button
//               onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
//               disabled={currentPage === pagination.totalPages}
//               className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
//             >
//               <ChevronRight className="h-5 w-5" />
//             </button>
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.5; }
//         }
//         .animate-pulse { animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
//       `}</style>
//     </div>
//   );
// };

// export default VideoListPage;























// // client/src/pages/public/VideoListPage.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import { useSearchParams, Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useQuery } from '@tanstack/react-query';
// import ReactPlayer from 'react-player';
// import { 
//   Search, Play, Clock, Eye, Grid, List, Loader2, 
//   ChevronLeft, ChevronRight, Mic, MicOff, 
//   Volume2, VolumeX, X, Sparkles, TrendingUp,
//   Pause, Square, Youtube, FileVideo, ExternalLink,
//   AlertCircle
// } from 'lucide-react';
// import videoAPI from '../../api/videoAPI';
// import { VIDEO_CATEGORIES } from '../../utils/constants.js';

// const VideoListPage = () => {
//   const navigate = useNavigate();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [viewMode, setViewMode] = useState('grid');
//   const [sortBy, setSortBy] = useState('popular');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isVoiceActive, setIsVoiceActive] = useState(false);
//   const [voiceStatus, setVoiceStatus] = useState('');
//   const [voiceCommand, setVoiceCommand] = useState('');
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [isPlayerOpen, setIsPlayerOpen] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [playerVolume, setPlayerVolume] = useState(0.7);
//   const [isMuted, setIsMuted] = useState(false);
//   const [playedSeconds, setPlayedSeconds] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [playerError, setPlayerError] = useState(false);
//   const [streamUrl, setStreamUrl] = useState(null);
  
//   const itemsPerPage = 9;
//   const recognitionRef = useRef(null);
//   const playerRef = useRef(null);

//   // Check if URL is a valid video URL
//   const isValidVideoUrl = (url) => {
//     if (!url) return false;
//     const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)/;
//     const videoFileRegex = /\.(mp4|webm|ogg|mov|avi|mkv)(\?.*)?$/i;
//     const streamRegex = /^https?:\/\/.+/;
//     return youtubeRegex.test(url) || videoFileRegex.test(url) || streamRegex.test(url);
//   };

//   // Initialize Speech Recognition
//   useEffect(() => {
//     if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
//       const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
//       recognitionRef.current = new SpeechRecognition();
//       recognitionRef.current.continuous = false;
//       recognitionRef.current.interimResults = false;
//       recognitionRef.current.lang = 'en-US';

//       recognitionRef.current.onstart = () => {
//         setIsVoiceActive(true);
//         setVoiceStatus('listening');
//       };

//       recognitionRef.current.onend = () => {
//         setIsVoiceActive(false);
//         setTimeout(() => setVoiceStatus(''), 1000);
//       };

//       recognitionRef.current.onresult = (event) => {
//         const transcript = event.results[0][0].transcript.toLowerCase();
//         setVoiceCommand(transcript);
//         processVoiceCommand(transcript);
//         setVoiceStatus('processing');
//         setTimeout(() => setVoiceStatus(''), 2000);
//       };

//       recognitionRef.current.onerror = (event) => {
//         console.error('Speech recognition error:', event.error);
//         setVoiceStatus('error');
//         setIsVoiceActive(false);
//         setTimeout(() => setVoiceStatus(''), 2000);
//       };
//     }

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.abort();
//       }
//     };
//   }, []);

//   const processVoiceCommand = async (command) => {
//     console.log('Processing command:', command);
    
//     if (command.includes('play')) {
//       let searchTerm = command.replace(/play|start|video|the|a|an/gi, '').trim();
//       if (searchTerm) {
//         const searchResponse = await videoAPI.getVideos({ search: searchTerm, limit: 5 });
//         const videosData = searchResponse?.data?.data || searchResponse?.data || searchResponse || [];
//         const videos = Array.isArray(videosData) ? videosData : [];
//         if (videos.length > 0) {
//           handlePlayVideo(videos[0]);
//           speak(`Playing ${videos[0].title}`);
//         } else {
//           setSearchQuery(searchTerm);
//           speak(`Searching for ${searchTerm}`);
//         }
//       }
//     }
//     else if (command.includes('stop')) {
//       handleClosePlayer();
//       speak('Video stopped');
//     }
//     else if (command.includes('pause')) {
//       setIsPlaying(false);
//       speak('Video paused');
//     }
//     else if (command.includes('resume') || command.includes('continue')) {
//       setIsPlaying(true);
//       speak('Video resumed');
//     }
//     else if (command.includes('volume up')) {
//       setPlayerVolume(prev => Math.min(1, prev + 0.1));
//       speak(`Volume increased to ${Math.round((playerVolume + 0.1) * 100)}%`);
//     }
//     else if (command.includes('volume down')) {
//       setPlayerVolume(prev => Math.max(0, prev - 0.1));
//       speak(`Volume decreased to ${Math.round((playerVolume - 0.1) * 100)}%`);
//     }
//     else if (command.includes('mute')) {
//       setIsMuted(true);
//       speak('Video muted');
//     }
//     else if (command.includes('unmute')) {
//       setIsMuted(false);
//       speak('Video unmuted');
//     }
//     else if (command.includes('search for')) {
//       let searchTerm = command.replace(/search for|find/gi, '').trim();
//       setSearchQuery(searchTerm);
//       setCurrentPage(1);
//       speak(`Searching for ${searchTerm}`);
//     }
//     else if (command.includes('mushaira') || command.includes('mushyr') || command.includes('mushayara')) {
//       setActiveCategory('mushaira');
//       setCurrentPage(1);
//       speak('Showing Mushaira videos');
//     }
//     else if (command.includes('popular') || command.includes('trending')) {
//       setSortBy('popular');
//       setActiveCategory('all');
//       setSearchQuery('');
//       setCurrentPage(1);
//       speak('Showing most popular videos');
//     }
//     else if (command.includes('latest') || command.includes('newest')) {
//       setSortBy('recent');
//       setCurrentPage(1);
//       speak('Showing latest videos');
//     }
//     else if (command.includes('sad') || command.includes('emotional')) {
//       setSearchQuery('sad poetry emotional');
//       setCurrentPage(1);
//       speak('Showing emotional and sad videos');
//     }
//     else if (command.includes('help')) {
//       speak('You can say: play video name, search for topic, show popular videos, pause, resume, stop, volume up, or volume down');
//     }
//   };

//   const speak = (message) => {
//     if ('speechSynthesis' in window) {
//       const utterance = new SpeechSynthesisUtterance(message);
//       utterance.lang = 'en-US';
//       utterance.rate = 0.9;
//       window.speechSynthesis.cancel();
//       window.speechSynthesis.speak(utterance);
//     }
//   };

//   // ============================================
//   // CRITICAL FIX: handlePlayVideo
//   // ============================================
//   const handlePlayVideo = async (video) => {
//     console.log('=== handlePlayVideo called ===');
//     console.log('Video object:', video);
//     console.log('video.videoUrl:', video?.videoUrl);
//     console.log('video.sourceType:', video?.sourceType);
    
//     if (!video?.videoUrl) {
//       alert('This video has no URL');
//       return;
//     }
    
//     if (!isValidVideoUrl(video.videoUrl)) {
//       alert('Invalid video URL format: ' + video.videoUrl);
//       return;
//     }
    
//     // CRITICAL: Set streamUrl IMMEDIATELY from video.videoUrl
//     // Don't wait for API - ReactPlayer needs url on first render
//     const initialUrl = video.videoUrl;
//     console.log('Initial URL set:', initialUrl);
    
//     setSelectedVideo(video);
//     setStreamUrl(initialUrl);  // <-- SET THIS FIRST, before opening modal
//     setIsPlayerOpen(true);
//     setPlayerError(false);
//     setIsPlaying(true);        // Start playing immediately
//     setPlayedSeconds(0);
    
//     // Optional: Try to get better stream URL from API (but don't block)
//     const isYouTube = /(youtube\.com|youtu\.be)/.test(video.videoUrl);
    
//     if (!isYouTube) {
//       try {
//         const streamResponse = await videoAPI.getVideoStream(video.slug);
//         console.log('Stream API response:', streamResponse);
//         const streamData = streamResponse?.data || streamResponse;
//         if (streamData?.streamUrl && streamData.streamUrl !== initialUrl) {
//           console.log('Updating streamUrl from API:', streamData.streamUrl);
//           setStreamUrl(streamData.streamUrl);
//         }
//       } catch (error) {
//         console.error('Stream API error (non-critical):', error);
//         // Keep using initialUrl
//       }
//     }
//   };

//   const handleClosePlayer = () => {
//     setIsPlaying(false);
//     setSelectedVideo(null);
//     setIsPlayerOpen(false);
//     setPlayedSeconds(0);
//     setPlayerError(false);
//     setStreamUrl(null);
//   };

//   const handlePlayerError = (error) => {
//     console.error('=== Player Error ===');
//     console.error('Error:', error);
//     console.error('streamUrl:', streamUrl);
//     console.error('selectedVideo:', selectedVideo);
//     setPlayerError(true);
//     setIsPlaying(false);
//   };

//   const handleRetryPlay = () => {
//     setPlayerError(false);
//     const currentUrl = streamUrl;
//     setStreamUrl(null);
//     setTimeout(() => {
//       setStreamUrl(currentUrl);
//       setIsPlaying(true);
//     }, 100);
//   };

//   const formatDuration = (seconds) => {
//     if (!seconds) return 'N/A';
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = Math.floor(seconds % 60);
//     if (hrs > 0) {
//       return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//     }
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   const formatTime = (seconds) => {
//     if (!seconds) return '0:00';
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   const formatViews = (views) => {
//     if (!views) return '0';
//     if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
//     if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
//     return views.toString();
//   };

//   const { data: response, isLoading, error, refetch } = useQuery({
//     queryKey: ['videos', currentPage, activeCategory, sortBy, searchQuery],
//     queryFn: () => videoAPI.getVideos({
//       page: currentPage,
//       limit: itemsPerPage,
//       type: activeCategory !== 'all' ? activeCategory : undefined,
//       search: searchQuery || undefined,
//       sort: sortBy
//     }),
//     enabled: true,
//     staleTime: 30000,
//     keepPreviousData: true
//   });

//   const videosData = response?.data?.data || response?.data || response || [];
//   const videos = Array.isArray(videosData) ? videosData : [];
//   const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 };

//   useEffect(() => {
//     if (activeCategory && activeCategory !== 'all') {
//       setSearchParams({ category: activeCategory });
//     } else {
//       setSearchParams({});
//     }
//     setCurrentPage(1);
//   }, [activeCategory, setSearchParams]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery]);

//   const clearFilters = () => {
//     setSearchQuery('');
//     setActiveCategory('all');
//     setSortBy('popular');
//     setCurrentPage(1);
//   };

//   const sortOptions = [
//     { value: 'popular', label: 'Most Popular', icon: TrendingUp },
//     { value: 'recent', label: 'Most Recent', icon: Clock },
//     { value: 'views', label: 'Most Viewed', icon: Eye }
//   ];

//   const getCategoryDisplayName = (type) => {
//     const category = VIDEO_CATEGORIES.find(cat => cat.id === type?.toLowerCase());
//     return category?.label || type || 'Video';
//   };

//   const voiceSuggestions = [
//     { command: "Play video", icon: Play },
//     { command: "Search for Mushaira", icon: Search },
//     { command: "Show popular videos", icon: TrendingUp },
//     { command: "Pause", icon: Pause },
//     { command: "Resume", icon: Play },
//     { command: "Stop", icon: Square },
//     { command: "Volume up", icon: Volume2 }
//   ];

//   const startVoiceRecognition = () => {
//     if (recognitionRef.current) {
//       try {
//         recognitionRef.current.start();
//       } catch (error) {
//         console.error('Error starting recognition:', error);
//         setVoiceStatus('error');
//       }
//     } else {
//       alert('Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
//     }
//   };

//   const stopVoiceRecognition = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//     }
//     setIsVoiceActive(false);
//   };

//   if (isLoading && videos.length === 0) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-center min-h-[60vh]">
//             <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
//             <p className="text-gray-500">Loading videos...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* ============================================
//             VIDEO PLAYER MODAL - FIXED
//         ============================================ */}
//         {isPlayerOpen && selectedVideo && (
//           <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
//             <div className="relative w-full max-w-5xl bg-black rounded-xl overflow-hidden">
//               <button
//                 onClick={handleClosePlayer}
//                 className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors text-white"
//               >
//                 <X className="h-6 w-6" />
//               </button>

//               <div className="absolute top-4 left-4 z-10 text-white pointer-events-none">
//                 <h3 className="text-lg font-semibold">{selectedVideo.title}</h3>
//                 {selectedVideo.author && (
//                   <p className="text-sm text-gray-300">
//                     {typeof selectedVideo.author === 'object' ? selectedVideo.author.name : selectedVideo.author}
//                   </p>
//                 )}
//               </div>

//               <div className="w-full bg-black" style={{ minHeight: '400px' }}>
//                 {!streamUrl ? (
//                   <div className="flex flex-col items-center justify-center h-[70vh] text-white">
//                     <Loader2 className="h-12 w-12 animate-spin text-primary-600 mb-4" />
//                     <p className="text-gray-400">Loading video...</p>
//                     <p className="text-gray-500 text-xs mt-2 max-w-md text-center break-all">
//                       Waiting for video URL...
//                     </p>
//                   </div>
//                 ) : playerError ? (
//                   <div className="flex flex-col items-center justify-center h-[70vh] text-white">
//                     <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
//                     <h3 className="text-xl font-semibold mb-2">Unable to play video</h3>
//                     <p className="text-gray-400 mb-2">The video URL might be invalid or inaccessible</p>
//                     <p className="text-gray-500 text-sm mb-4 max-w-md text-center break-all">
//                       URL: {streamUrl}
//                     </p>
//                     <div className="flex gap-3">
//                       <button
//                         onClick={handleRetryPlay}
//                         className="px-4 py-2 bg-primary-600 rounded-lg hover:bg-primary-700"
//                       >
//                         Try Again
//                       </button>
//                       <button
//                         onClick={() => window.open(streamUrl, '_blank')}
//                         className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
//                       >
//                         Open in New Tab
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <ReactPlayer
//                     ref={playerRef}
//                     key={streamUrl}
//                     url={streamUrl}
//                     playing={isPlaying}
//                     volume={isMuted ? 0 : playerVolume}
//                     width="100%"
//                     height="70vh"
//                     controls={true}
//                     config={{
//                       youtube: {
//                         playerVars: {
//                           modestbranding: 1,
//                           rel: 0,
//                           controls: 1,
//                           autoplay: 1
//                         }
//                       },
//                       file: {
//                         forceVideo: true,
//                         attributes: {
//                           controlsList: 'nodownload',
//                           crossOrigin: 'anonymous'
//                         }
//                       }
//                     }}
//                     onReady={() => console.log('ReactPlayer ready, URL:', streamUrl)}
//                     onStart={() => console.log('ReactPlayer started')}
//                     onPlay={() => setIsPlaying(true)}
//                     onPause={() => setIsPlaying(false)}
//                     onEnded={() => {
//                       setIsPlaying(false);
//                       speak('Video ended');
//                     }}
//                     onDuration={(d) => setDuration(d)}
//                     onProgress={({ playedSeconds }) => setPlayedSeconds(playedSeconds)}
//                     onError={(e, data, hlsInstance, hlsGlobal) => {
//                       console.error('ReactPlayer onError:', { e, data, streamUrl });
//                       handlePlayerError(e);
//                     }}
//                   />
//                 )}
//               </div>

//               <div className="p-4 bg-gray-900">
//                 <div className="flex items-center justify-between flex-wrap gap-4">
//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={() => setIsPlaying(!isPlaying)}
//                       className="p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors"
//                       disabled={playerError || !streamUrl}
//                     >
//                       {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
//                     </button>
//                     <button
//                       onClick={() => setIsMuted(!isMuted)}
//                       className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
//                       disabled={playerError || !streamUrl}
//                     >
//                       {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
//                     </button>
//                     <input
//                       type="range"
//                       min="0"
//                       max="1"
//                       step="0.01"
//                       value={playerVolume}
//                       onChange={(e) => setPlayerVolume(parseFloat(e.target.value))}
//                       className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
//                       disabled={playerError || !streamUrl}
//                     />
//                     <div className="text-white text-sm">
//                       {formatTime(playedSeconds)} / {formatTime(duration)}
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => {
//                       handleClosePlayer();
//                       navigate(`/video/${selectedVideo.slug}`);
//                     }}
//                     className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
//                   >
//                     <ExternalLink className="h-4 w-4" />
//                     <span>View Details</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between flex-wrap gap-4">
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
//                 Video Library
//               </h1>
//               <p className="text-gray-500">
//                 Mushaira, interviews, documentaries, lectures, and more from Urdu literature
//               </p>
//             </div>
            
//             <div className="relative">
//               <button
//                 onClick={isVoiceActive ? stopVoiceRecognition : startVoiceRecognition}
//                 className={`relative group flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all ${
//                   isVoiceActive 
//                     ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse' 
//                     : 'bg-primary-600 text-white shadow-lg hover:shadow-xl'
//                 }`}
//               >
//                 {isVoiceActive ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
//                 <span>{isVoiceActive ? 'Listening...' : 'Voice Assistant'}</span>
//               </button>
              
//               {voiceStatus === 'listening' && (
//                 <div className="absolute -bottom-8 left-0 right-0 text-center">
//                   <span className="text-xs text-green-600 animate-pulse">🔴 Listening... Speak now</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Voice Command Display */}
//         {voiceCommand && (
//           <motion.div 
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mb-4 p-3 bg-primary-50 border border-primary-200 rounded-lg"
//           >
//             <div className="flex items-center gap-2">
//               <Mic className="h-4 w-4 text-primary-600" />
//               <span className="text-sm text-gray-600">You said:</span>
//               <span className="text-sm font-medium text-primary-700">"{voiceCommand}"</span>
//             </div>
//           </motion.div>
//         )}

//         {/* Voice Command Suggestions */}
//         <div className="mb-6 overflow-x-auto">
//           <div className="flex gap-2 pb-2">
//             {voiceSuggestions.map((suggestion, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => processVoiceCommand(suggestion.command.toLowerCase())}
//                 className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-gray-50 hover:border-primary-300 transition-all whitespace-nowrap"
//               >
//                 <suggestion.icon className="h-3.5 w-3.5" />
//                 <span>{suggestion.command}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Search & Controls */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search videos... (Try 'mushyr' for Mushaira)"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white"
//             />
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery('')}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//             )}
//           </div>
//           <div className="flex items-center gap-2">
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="px-4 py-2.5 border border-gray-200 rounded-lg bg-white"
//             >
//               {sortOptions.map(option => (
//                 <option key={option.value} value={option.value}>{option.label}</option>
//               ))}
//             </select>
//             <div className="flex border border-gray-300 rounded-lg overflow-hidden">
//               <button
//                 onClick={() => setViewMode('grid')}
//                 className={`p-2.5 ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-600'}`}
//               >
//                 <Grid className="h-5 w-5" />
//               </button>
//               <button
//                 onClick={() => setViewMode('list')}
//                 className={`p-2.5 ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-600'}`}
//               >
//                 <List className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Categories */}
//         <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
//           <button
//             onClick={() => setActiveCategory('all')}
//             className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//               activeCategory === 'all'
//                 ? 'bg-primary-600 text-white shadow-md'
//                 : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
//             }`}
//           >
//             All Videos
//           </button>
//           {VIDEO_CATEGORIES.map((cat) => (
//             <button
//               key={cat.id}
//               onClick={() => setActiveCategory(cat.id)}
//               className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//                 activeCategory === cat.id
//                   ? 'bg-primary-600 text-white shadow-md'
//                   : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
//               }`}
//             >
//               {cat.label}
//             </button>
//           ))}
//         </div>

//         {/* Results Count */}
//         <div className="flex justify-between items-center mb-4">
//           <p className="text-sm text-gray-500">
//             {searchQuery ? (
//               <>Found {pagination.total || videos.length} result(s) for "<strong>{searchQuery}</strong>"</>
//             ) : (
//               <>Showing {videos.length} of {pagination.total || videos.length} videos</>
//             )}
//           </p>
//           {(searchQuery || activeCategory !== 'all') && (
//             <button onClick={clearFilters} className="text-sm text-primary-600 hover:text-primary-700">
//               Clear filters
//             </button>
//           )}
//         </div>

//         {/* Videos Grid */}
//         {videos.length === 0 ? (
//           <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
//             <Play className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
//             <p className="text-gray-500">
//               {searchQuery 
//                 ? `No videos matching "${searchQuery}". Try "mushyr" for Mushaira videos.`
//                 : 'No videos available in this category yet.'}
//             </p>
//           </div>
//         ) : (
//           <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
//             {videos.map((video, index) => (
//               <motion.div
//                 key={video._id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.05 }}
//                 className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
//               >
//                 {/* Thumbnail with Play Button */}
//                 <div 
//                   className="relative overflow-hidden cursor-pointer" 
//                   onClick={() => handlePlayVideo(video)}
//                 >
//                   {video.thumbnail ? (
//                     <img
//                       src={video.thumbnail}
//                       alt={video.title}
//                       className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
//                       loading="lazy"
//                       onError={(e) => {
//                         e.target.src = '';
//                         e.target.style.backgroundColor = '#f3f4f6';
//                       }}
//                     />
//                   ) : (
//                     <div className="w-full aspect-video bg-gray-200 flex items-center justify-center">
//                       {video.sourceType === 'youtube' || video.videoUrl?.includes('youtube') ? 
//                         <Youtube className="h-12 w-12 text-red-500" /> : 
//                         <FileVideo className="h-12 w-12 text-gray-400" />
//                       }
//                     </div>
//                   )}
//                   <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
//                     <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
//                       <Play className="h-5 w-5 text-primary-600 ml-0.5" />
//                     </div>
//                   </div>
//                   {video.duration && (
//                     <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded-md flex items-center gap-1">
//                       <Clock className="h-3 w-3" />
//                       <span>{formatDuration(video.duration)}</span>
//                     </div>
//                   )}
//                   <div className="absolute top-2 left-2">
//                     <span className="px-2 py-0.5 bg-white/90 text-gray-700 text-xs font-medium rounded-full capitalize">
//                       {getCategoryDisplayName(video.type)}
//                     </span>
//                   </div>
//                   {video.isPremium && (
//                     <div className="absolute top-2 right-2">
//                       <span className="px-2 py-0.5 bg-yellow-500 text-white text-xs font-medium rounded-full">
//                         Premium
//                       </span>
//                     </div>
//                   )}
//                   {/* Video Source Badge - USE sourceType FIELD */}
//                   <div className="absolute bottom-2 left-2">
//                     <span className="px-2 py-0.5 bg-black/70 text-white text-xs rounded-full flex items-center gap-1">
//                       {video.sourceType === 'youtube' || video.videoUrl?.includes('youtube') || video.videoUrl?.includes('youtu.be') ? 
//                         <Youtube className="h-3 w-3" /> : 
//                         <FileVideo className="h-3 w-3" />
//                       }
//                       <span>{video.sourceType === 'youtube' || video.videoUrl?.includes('youtube') || video.videoUrl?.includes('youtu.be') ? 'YouTube' : 'Video'}</span>
//                     </span>
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <div className="p-4">
//                   <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
//                     {video.title}
//                   </h3>
//                   {video.description && (
//                     <p className="text-sm text-gray-500 line-clamp-2 mb-2">{video.description}</p>
//                   )}
//                   <div className="flex items-center justify-between mt-2">
//                     <div className="flex items-center gap-3 text-sm text-gray-500">
//                       <span className="flex items-center gap-1">
//                         <Eye className="h-4 w-4" />
//                         {formatViews(video.stats?.views || 0)} views
//                       </span>
//                       {video.language && <span className="capitalize">{video.language}</span>}
//                     </div>
//                     <Link
//                       to={`/video/${video.slug}`}
//                       className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1"
//                       onClick={(e) => e.stopPropagation()}
//                     >
//                       View Details <ExternalLink className="h-3 w-3" />
//                     </Link>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {/* Pagination */}
//         {pagination.totalPages > 1 && (
//           <div className="flex items-center justify-center gap-2 mt-8">
//             <button
//               onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//               disabled={currentPage === 1}
//               className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
//             >
//               <ChevronLeft className="h-5 w-5" />
//             </button>
//             <span className="px-4 py-2 text-sm">
//               Page {currentPage} of {pagination.totalPages}
//             </span>
//             <button
//               onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
//               disabled={currentPage === pagination.totalPages}
//               className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
//             >
//               <ChevronRight className="h-5 w-5" />
//             </button>
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.5; }
//         }
//         .animate-pulse { animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
//       `}</style>
//     </div>
//   );
// };

// export default VideoListPage;




















// client/src/pages/public/VideoListPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { 
  Search, Play, Clock, Eye, Grid, List, Loader2, 
  ChevronLeft, ChevronRight, Mic, MicOff, 
  Volume2, VolumeX, X, Sparkles, TrendingUp,
  Pause, Square, Youtube, FileVideo, ExternalLink,
  AlertCircle
} from 'lucide-react';
import videoAPI from '../../api/videoAPI';
import { VIDEO_CATEGORIES } from '../../utils/constants.js';

const VideoListPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState('');
  const [voiceCommand, setVoiceCommand] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  
  const itemsPerPage = 9;
  const recognitionRef = useRef(null);

  // Check if URL is YouTube
  const isYouTubeUrl = (url) => {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  // Get YouTube embed URL
  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1` : url;
  };

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsVoiceActive(true);
        setVoiceStatus('listening');
      };

      recognitionRef.current.onend = () => {
        setIsVoiceActive(false);
        setTimeout(() => setVoiceStatus(''), 1000);
      };

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setVoiceCommand(transcript);
        processVoiceCommand(transcript);
        setVoiceStatus('processing');
        setTimeout(() => setVoiceStatus(''), 2000);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setVoiceStatus('error');
        setIsVoiceActive(false);
        setTimeout(() => setVoiceStatus(''), 2000);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const processVoiceCommand = async (command) => {
    console.log('Processing command:', command);
    
    if (command.includes('play')) {
      let searchTerm = command.replace(/play|start|video|the|a|an/gi, '').trim();
      if (searchTerm) {
        const searchResponse = await videoAPI.getVideos({ search: searchTerm, limit: 5 });
        const videosData = searchResponse?.data?.data || searchResponse?.data || searchResponse || [];
        const videos = Array.isArray(videosData) ? videosData : [];
        if (videos.length > 0) {
          handlePlayVideo(videos[0]);
          speak(`Playing ${videos[0].title}`);
        } else {
          setSearchQuery(searchTerm);
          speak(`Searching for ${searchTerm}`);
        }
      }
    }
    else if (command.includes('stop')) {
      handleClosePlayer();
      speak('Video stopped');
    }
    else if (command.includes('pause')) {
      speak('Video paused');
    }
    else if (command.includes('resume') || command.includes('continue')) {
      speak('Video resumed');
    }
    else if (command.includes('volume up')) {
      speak('Volume increased');
    }
    else if (command.includes('volume down')) {
      speak('Volume decreased');
    }
    else if (command.includes('mute')) {
      speak('Video muted');
    }
    else if (command.includes('unmute')) {
      speak('Video unmuted');
    }
    else if (command.includes('search for')) {
      let searchTerm = command.replace(/search for|find/gi, '').trim();
      setSearchQuery(searchTerm);
      setCurrentPage(1);
      speak(`Searching for ${searchTerm}`);
    }
    else if (command.includes('mushaira') || command.includes('mushyr') || command.includes('mushayara')) {
      setActiveCategory('mushaira');
      setCurrentPage(1);
      speak('Showing Mushaira videos');
    }
    else if (command.includes('popular') || command.includes('trending')) {
      setSortBy('popular');
      setActiveCategory('all');
      setSearchQuery('');
      setCurrentPage(1);
      speak('Showing most popular videos');
    }
    else if (command.includes('latest') || command.includes('newest')) {
      setSortBy('recent');
      setCurrentPage(1);
      speak('Showing latest videos');
    }
    else if (command.includes('sad') || command.includes('emotional')) {
      setSearchQuery('sad poetry emotional');
      setCurrentPage(1);
      speak('Showing emotional and sad videos');
    }
    else if (command.includes('help')) {
      speak('You can say: play video name, search for topic, show popular videos, pause, resume, stop, volume up, or volume down');
    }
  };

  const speak = (message) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  // Handle play video in modal — SAME APPROACH AS VideoDetailPage
  const handlePlayVideo = (video) => {
    if (!video?.videoUrl) {
      alert('This video has no URL');
      return;
    }
    
    setSelectedVideo(video);
    setIsPlayerOpen(true);
  };

  // Handle close player
  const handleClosePlayer = () => {
    setSelectedVideo(null);
    setIsPlayerOpen(false);
  };

  const formatDuration = (seconds) => {
    if (!seconds) return 'N/A';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatViews = (views) => {
    if (!views) return '0';
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  // Fetch videos
  const { data: response, isLoading, error, refetch } = useQuery({
    queryKey: ['videos', currentPage, activeCategory, sortBy, searchQuery],
    queryFn: () => videoAPI.getVideos({
      page: currentPage,
      limit: itemsPerPage,
      type: activeCategory !== 'all' ? activeCategory : undefined,
      search: searchQuery || undefined,
      sort: sortBy
    }),
    enabled: true,
    staleTime: 30000,
    keepPreviousData: true
  });

  const videosData = response?.data?.data || response?.data || response || [];
  const videos = Array.isArray(videosData) ? videosData : [];
  const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 };

  useEffect(() => {
    if (activeCategory && activeCategory !== 'all') {
      setSearchParams({ category: activeCategory });
    } else {
      setSearchParams({});
    }
    setCurrentPage(1);
  }, [activeCategory, setSearchParams]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const clearFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setSortBy('popular');
    setCurrentPage(1);
  };

  const sortOptions = [
    { value: 'popular', label: 'Most Popular', icon: TrendingUp },
    { value: 'recent', label: 'Most Recent', icon: Clock },
    { value: 'views', label: 'Most Viewed', icon: Eye }
  ];

  const getCategoryDisplayName = (type) => {
    const category = VIDEO_CATEGORIES.find(cat => cat.id === type?.toLowerCase());
    return category?.label || type || 'Video';
  };

  const voiceSuggestions = [
    { command: "Play video", icon: Play },
    { command: "Search for Mushaira", icon: Search },
    { command: "Show popular videos", icon: TrendingUp },
    { command: "Pause", icon: Pause },
    { command: "Resume", icon: Play },
    { command: "Stop", icon: Square },
    { command: "Volume up", icon: Volume2 }
  ];

  const startVoiceRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
        setVoiceStatus('error');
      }
    } else {
      alert('Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
    }
  };

  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsVoiceActive(false);
  };

  if (isLoading && videos.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
            <p className="text-gray-500">Loading videos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================
            VIDEO PLAYER MODAL — SAME AS VideoDetailPage
        ============================================ */}
        {isPlayerOpen && selectedVideo && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-5xl bg-black rounded-xl overflow-hidden">
              <button
                onClick={handleClosePlayer}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors text-white"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="absolute top-4 left-4 z-10 text-white pointer-events-none">
                <h3 className="text-lg font-semibold">{selectedVideo.title}</h3>
                {selectedVideo.author && (
                  <p className="text-sm text-gray-300">
                    {typeof selectedVideo.author === 'object' ? selectedVideo.author.name : selectedVideo.author}
                  </p>
                )}
              </div>

              <div className="w-full bg-black" style={{ minHeight: '400px' }}>
                {isYouTubeUrl(selectedVideo.videoUrl) ? (
                  /* YouTube — iframe (same as VideoDetailPage) */
                  <iframe
                    src={getYouTubeEmbedUrl(selectedVideo.videoUrl)}
                    title={selectedVideo.title}
                    className="w-full aspect-video"
                    style={{ height: '70vh', border: 'none' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  /* Uploaded video — native video tag (same as VideoDetailPage) */
                  <video
                    src={selectedVideo.videoUrl}
                    poster={selectedVideo.thumbnail}
                    className="w-full"
                    style={{ height: '70vh' }}
                    controls
                    controlsList="nodownload"
                    autoPlay
                  />
                )}
              </div>

              <div className="p-4 bg-gray-900">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-white text-sm">
                      {isYouTubeUrl(selectedVideo.videoUrl) ? 'YouTube' : 'Direct Video'}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      handleClosePlayer();
                      navigate(`/video/${selectedVideo.slug}`);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Video Library
              </h1>
              <p className="text-gray-500">
                Mushaira, interviews, documentaries, lectures, and more from Urdu literature
              </p>
            </div>
            
            <div className="relative">
              <button
                onClick={isVoiceActive ? stopVoiceRecognition : startVoiceRecognition}
                className={`relative group flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all ${
                  isVoiceActive 
                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse' 
                    : 'bg-primary-600 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {isVoiceActive ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                <span>{isVoiceActive ? 'Listening...' : 'Voice Assistant'}</span>
              </button>
              
              {voiceStatus === 'listening' && (
                <div className="absolute -bottom-8 left-0 right-0 text-center">
                  <span className="text-xs text-green-600 animate-pulse">🔴 Listening... Speak now</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Voice Command Display */}
        {voiceCommand && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-primary-50 border border-primary-200 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <Mic className="h-4 w-4 text-primary-600" />
              <span className="text-sm text-gray-600">You said:</span>
              <span className="text-sm font-medium text-primary-700">"{voiceCommand}"</span>
            </div>
          </motion.div>
        )}

        {/* Voice Command Suggestions */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {voiceSuggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => processVoiceCommand(suggestion.command.toLowerCase())}
                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-gray-50 hover:border-primary-300 transition-all whitespace-nowrap"
              >
                <suggestion.icon className="h-3.5 w-3.5" />
                <span>{suggestion.command}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search & Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search videos... (Try 'mushyr' for Mushaira)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg bg-white"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-600'}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-600'}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === 'all'
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            All Videos
          </button>
          {VIDEO_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-500">
            {searchQuery ? (
              <>Found {pagination.total || videos.length} result(s) for "<strong>{searchQuery}</strong>"</>
            ) : (
              <>Showing {videos.length} of {pagination.total || videos.length} videos</>
            )}
          </p>
          {(searchQuery || activeCategory !== 'all') && (
            <button onClick={clearFilters} className="text-sm text-primary-600 hover:text-primary-700">
              Clear filters
            </button>
          )}
        </div>

        {/* Videos Grid */}
        {videos.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <Play className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
            <p className="text-gray-500">
              {searchQuery 
                ? `No videos matching "${searchQuery}". Try "mushyr" for Mushaira videos.`
                : 'No videos available in this category yet.'}
            </p>
          </div>
        ) : (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {videos.map((video, index) => (
              <motion.div
                key={video._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
              >
                {/* Thumbnail with Play Button */}
                <div 
                  className="relative overflow-hidden cursor-pointer" 
                  onClick={() => handlePlayVideo(video)}
                >
                  {video.thumbnail ? (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = '';
                        e.target.style.backgroundColor = '#f3f4f6';
                      }}
                    />
                  ) : (
                    <div className="w-full aspect-video bg-gray-200 flex items-center justify-center">
                      {isYouTubeUrl(video.videoUrl) ? 
                        <Youtube className="h-12 w-12 text-red-500" /> : 
                        <FileVideo className="h-12 w-12 text-gray-400" />
                      }
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="h-5 w-5 text-primary-600 ml-0.5" />
                    </div>
                  </div>
                  {video.duration && (
                    <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded-md flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatDuration(video.duration)}</span>
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 bg-white/90 text-gray-700 text-xs font-medium rounded-full capitalize">
                      {getCategoryDisplayName(video.type)}
                    </span>
                  </div>
                  {video.isPremium && (
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-0.5 bg-yellow-500 text-white text-xs font-medium rounded-full">
                        Premium
                      </span>
                    </div>
                  )}
                  {/* Video Source Badge */}
                  <div className="absolute bottom-2 left-2">
                    <span className="px-2 py-0.5 bg-black/70 text-white text-xs rounded-full flex items-center gap-1">
                      {isYouTubeUrl(video.videoUrl) ? 
                        <Youtube className="h-3 w-3" /> : 
                        <FileVideo className="h-3 w-3" />
                      }
                      <span>{isYouTubeUrl(video.videoUrl) ? 'YouTube' : 'Video'}</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="text-sm text-gray-500 line-clamp-2 mb-2">{video.description}</p>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {formatViews(video.stats?.views || 0)} views
                      </span>
                      {video.language && <span className="capitalize">{video.language}</span>}
                    </div>
                    <Link
                      to={`/video/${video.slug}`}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Details <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="px-4 py-2 text-sm">
              Page {currentPage} of {pagination.totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
              disabled={currentPage === pagination.totalPages}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse { animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>
    </div>
  );
};

export default VideoListPage;