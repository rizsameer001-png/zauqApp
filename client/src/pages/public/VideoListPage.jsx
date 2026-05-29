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









// client/src/pages/public/VideoListPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Search, Play, Clock, Eye, Filter, Grid, List, Loader2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import videoAPI from '../../api/videoAPI';
import { VIDEO_CATEGORIES } from '../../utils/constants.js';

const VideoListPage = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Fetch real videos from API
  const { data: response, isLoading, error, refetch } = useQuery({
    queryKey: ['videos', currentPage, activeCategory, sortBy],
    queryFn: () => videoAPI.getVideos({
      page: currentPage,
      limit: itemsPerPage,
      type: activeCategory !== 'all' ? activeCategory.toLowerCase() : undefined,
      search: searchQuery || undefined,
      sort: sortBy
    }),
    enabled: true,
    staleTime: 30000
  });

  // Extract videos and pagination from response
  const videosData = response?.data?.data || response?.data || response || [];
  const videos = Array.isArray(videosData) ? videosData : [];
  const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 };

  // Update URL when category changes
  useEffect(() => {
    if (activeCategory && activeCategory !== 'all') {
      setSearchParams({ category: activeCategory });
    } else {
      setSearchParams({});
    }
    setCurrentPage(1);
  }, [activeCategory, setSearchParams]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage === 1) {
        refetch();
      } else {
        setCurrentPage(1);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, refetch, currentPage]);

  // Handle page change
  const goToPage = (page) => {
    if (page >= 1 && page <= (pagination.totalPages || 1)) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Format duration from seconds to HH:MM:SS or MM:SS
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

  // Format view count
  const formatViews = (views) => {
    if (!views) return '0';
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  // Clear filters
  const clearFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setSortBy('popular');
    setCurrentPage(1);
  };

  // Sort options
  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'recent', label: 'Most Recent' },
    { value: 'views', label: 'Most Viewed' },
    { value: 'longest', label: 'Longest' },
    { value: 'shortest', label: 'Shortest' }
  ];

  // Get category display name
  const getCategoryDisplayName = (type) => {
    const category = VIDEO_CATEGORIES.find(cat => cat.id === type?.toLowerCase());
    return category?.label || type || 'Video';
  };

  // Loading state
  if (isLoading && videos.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
              <p className="text-gray-500">Loading videos...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && videos.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to load videos</h2>
            <p className="text-gray-500 mb-6">There was an error loading the videos. Please try again.</p>
            <button onClick={() => refetch()} className="btn-primary">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {t('common.videos', 'Video Library')}
          </h1>
          <p className="text-gray-500">
            Mushaira, interviews, documentaries, lectures, and more from the world of Urdu literature
          </p>
        </div>

        {/* Search & Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search videos by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white w-40"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'}`}
                title="Grid View"
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'}`}
                title="List View"
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-6 pb-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-500">
            Showing {videos.length} of {pagination.total || videos.length} videos
          </p>
          {(searchQuery || activeCategory !== 'all') && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Videos Grid/List */}
        {videos.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <Play className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
            <p className="text-gray-500">
              {searchQuery 
                ? `No videos matching "${searchQuery}" found. Try a different search term.`
                : 'No videos available in this category yet.'}
            </p>
          </div>
        ) : (
          <>
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {videos.map((video, index) => (
                <motion.div
                  key={video._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={`/video/${video.slug}`} className="block group">
                    <div className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all ${viewMode === 'list' ? 'flex gap-4' : ''}`}>
                      {/* Thumbnail */}
                      <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'w-full'}`}>
                        {video.thumbnail ? (
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full aspect-video bg-gray-200 flex items-center justify-center">
                            <Play className="h-12 w-12 text-gray-400" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="h-5 w-5 text-primary-600 ml-0.5" />
                          </div>
                        </div>
                        {/* Duration Badge */}
                        {video.duration && (
                          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded-md flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{formatDuration(video.duration)}</span>
                          </div>
                        )}
                        {/* Category Badge */}
                        <div className="absolute top-2 left-2">
                          <span className="px-2 py-0.5 bg-white/90 text-gray-700 text-xs font-medium rounded-full capitalize">
                            {getCategoryDisplayName(video.type)}
                          </span>
                        </div>
                        {/* Premium Badge */}
                        {video.isPremium && (
                          <div className="absolute top-2 right-2">
                            <span className="px-2 py-0.5 bg-yellow-500 text-white text-xs font-medium rounded-full">
                              Premium
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-1">
                          {video.title}
                        </h3>
                        {video.description && (
                          <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                            {video.description}
                          </p>
                        )}
                        {video.author && (
                          <p className="text-sm text-gray-500 mb-2">
                            {typeof video.author === 'object' ? video.author.name : video.author}
                          </p>
                        )}
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {formatViews(video.stats?.views || 0)} views
                          </span>
                          {video.language && (
                            <span className="capitalize">{video.language}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {(pagination.totalPages > 1 || Math.ceil(videos.length / itemsPerPage) > 1) && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: pagination.totalPages || Math.ceil(videos.length / itemsPerPage) }, (_, i) => i + 1)
                    .filter(page => {
                      const totalPages = pagination.totalPages || Math.ceil(videos.length / itemsPerPage);
                      if (totalPages <= 7) return true;
                      if (page === 1 || page === totalPages) return true;
                      if (page >= currentPage - 1 && page <= currentPage + 1) return true;
                      return false;
                    })
                    .map((page, index, array) => {
                      if (index > 0 && array[index - 1] !== page - 1) {
                        return (
                          <span key={`ellipsis-${page}`} className="px-3 py-2 text-gray-500">
                            ...
                          </span>
                        );
                      }
                      return (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`min-w-[40px] h-10 rounded-lg font-medium transition-colors ${
                            currentPage === page
                              ? 'bg-primary-600 text-white'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === (pagination.totalPages || Math.ceil(videos.length / itemsPerPage))}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            )}

            {/* Loading more indicator */}
            {isLoading && videos.length > 0 && (
              <div className="flex justify-center mt-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary-600" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VideoListPage;