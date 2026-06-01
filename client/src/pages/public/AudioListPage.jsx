// // client/src/pages/public/AudioListPage.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useSearchParams, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useQuery } from '@tanstack/react-query';
// import { Search, Headphones, Play, Clock, Eye, Filter, Grid, List, Loader2, AlertCircle, ChevronLeft, ChevronRight, Mic, Heart, Bookmark } from 'lucide-react';
// import audioAPI from '../../api/audioAPI';
// import { AUDIO_CATEGORIES } from '../../utils/constants.js';

// const AudioListPage = () => {
//   const { t } = useTranslation();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [viewMode, setViewMode] = useState('grid');
//   const [sortBy, setSortBy] = useState('popular');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 9;

//   // Fetch real audio from API
//   const { data: response, isLoading, error, refetch } = useQuery({
//     queryKey: ['audio', currentPage, activeCategory, sortBy],
//     queryFn: () => audioAPI.getAudioItems({
//       page: currentPage,
//       limit: itemsPerPage,
//       type: activeCategory !== 'all' ? activeCategory.toLowerCase() : undefined,
//       search: searchQuery || undefined,
//       sort: sortBy
//     }),
//     enabled: true,
//     staleTime: 30000
//   });

//   // Extract audio and pagination from response
//   const audioData = response?.data?.data || response?.data || response || [];
//   const audioItems = Array.isArray(audioData) ? audioData : [];
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

//   // Format duration from seconds to MM:SS or HH:MM:SS
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

//   // Format play count
//   const formatPlays = (plays) => {
//     if (!plays) return '0';
//     if (plays >= 1000000) return `${(plays / 1000000).toFixed(1)}M`;
//     if (plays >= 1000) return `${(plays / 1000).toFixed(1)}K`;
//     return plays.toString();
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
//     { value: 'plays', label: 'Most Played' },
//     { value: 'longest', label: 'Longest' },
//     { value: 'shortest', label: 'Shortest' }
//   ];

//   // Get category display name
//   const getCategoryDisplayName = (type) => {
//     const category = AUDIO_CATEGORIES.find(cat => cat.id === type?.toLowerCase());
//     return category?.label || type?.replace('_', ' ') || 'Audio';
//   };

//   // Get icon for audio type
//   const getAudioIcon = (type) => {
//     switch (type) {
//       case 'podcast':
//         return <Mic className="h-4 w-4" />;
//       case 'mushaira':
//         return <Mic className="h-4 w-4" />;
//       case 'poem_recitation':
//         return <Headphones className="h-4 w-4" />;
//       case 'ghazal':
//         return <Headphones className="h-4 w-4" />;
//       case 'audiobook':
//         return <Headphones className="h-4 w-4" />;
//       default:
//         return <Headphones className="h-4 w-4" />;
//     }
//   };

//   // Loading state
//   if (isLoading && audioItems.length === 0) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-center min-h-[60vh]">
//             <div className="text-center">
//               <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
//               <p className="text-gray-500">Loading audio...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error && audioItems.length === 0) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center py-12">
//             <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
//             <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to load audio</h2>
//             <p className="text-gray-500 mb-6">There was an error loading the audio content. Please try again.</p>
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
//             {t('common.audio', 'Audio Library')}
//           </h1>
//           <p className="text-gray-500">
//             Podcasts, mushairas, poem recitations, ghazals, and audiobooks from the world of Urdu literature
//           </p>
//         </div>

//         {/* Search & Controls */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search audio by title..."
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
//             All Audio
//           </button>
//           {AUDIO_CATEGORIES.map((cat) => (
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
//             Showing {audioItems.length} of {pagination.total || audioItems.length} audio items
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

//         {/* Audio Grid/List */}
//         {audioItems.length === 0 ? (
//           <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
//             <Headphones className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No audio found</h3>
//             <p className="text-gray-500">
//               {searchQuery 
//                 ? `No audio matching "${searchQuery}" found. Try a different search term.`
//                 : 'No audio available in this category yet.'}
//             </p>
//           </div>
//         ) : (
//           <>
//             <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
//               {audioItems.map((audio, index) => (
//                 <motion.div
//                   key={audio._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                 >
//                   <Link to={`/audio/${audio.slug}`} className="block group">
//                     <div className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all ${viewMode === 'list' ? 'flex gap-4' : ''}`}>
//                       {/* Thumbnail */}
//                       <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'w-full'}`}>
//                         {audio.thumbnail || audio.coverImage ? (
//                           <img
//                             src={audio.thumbnail || audio.coverImage}
//                             alt={audio.title}
//                             className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
//                           />
//                         ) : (
//                           <div className="w-full aspect-square bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
//                             <Headphones className="h-12 w-12 text-green-600" />
//                           </div>
//                         )}
//                         <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
//                           <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
//                             <Play className="h-5 w-5 text-primary-600 ml-0.5" />
//                           </div>
//                         </div>
//                         {/* Duration Badge */}
//                         {audio.duration && (
//                           <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded-md flex items-center gap-1">
//                             <Clock className="h-3 w-3" />
//                             <span>{formatDuration(audio.duration)}</span>
//                           </div>
//                         )}
//                         {/* Category Badge */}
//                         <div className="absolute top-2 left-2">
//                           <span className="px-2 py-0.5 bg-white/90 text-gray-700 text-xs font-medium rounded-full capitalize flex items-center gap-1">
//                             {getAudioIcon(audio.type)}
//                             {getCategoryDisplayName(audio.type)}
//                           </span>
//                         </div>
//                         {/* Premium Badge */}
//                         {audio.isPremium && (
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
//                           {audio.title}
//                         </h3>
//                         {audio.description && (
//                           <p className="text-sm text-gray-500 line-clamp-2 mb-2">
//                             {audio.description}
//                           </p>
//                         )}
//                         {audio.author && (
//                           <p className="text-sm text-gray-500 mb-2">
//                             {typeof audio.author === 'object' ? audio.author.name : audio.author}
//                           </p>
//                         )}
//                         <div className="flex items-center gap-3 text-sm text-gray-500">
//                           <span className="flex items-center gap-1">
//                             <Play className="h-4 w-4" />
//                             {formatPlays(audio.stats?.plays || 0)} plays
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <Eye className="h-4 w-4" />
//                             {formatPlays(audio.stats?.views || 0)} views
//                           </span>
//                           {audio.language && (
//                             <span className="capitalize">{audio.language}</span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Pagination */}
//             {(pagination.totalPages > 1 || Math.ceil(audioItems.length / itemsPerPage) > 1) && (
//               <div className="flex items-center justify-center gap-2 mt-8">
//                 <button
//                   onClick={() => goToPage(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <ChevronLeft className="h-5 w-5 text-gray-600" />
//                 </button>
                
//                 <div className="flex items-center gap-1">
//                   {Array.from({ length: pagination.totalPages || Math.ceil(audioItems.length / itemsPerPage) }, (_, i) => i + 1)
//                     .filter(page => {
//                       const totalPages = pagination.totalPages || Math.ceil(audioItems.length / itemsPerPage);
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
//                   disabled={currentPage === (pagination.totalPages || Math.ceil(audioItems.length / itemsPerPage))}
//                   className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <ChevronRight className="h-5 w-5 text-gray-600" />
//                 </button>
//               </div>
//             )}

//             {/* Loading more indicator */}
//             {isLoading && audioItems.length > 0 && (
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

// export default AudioListPage;












// client/src/pages/public/AudioListPage.jsx 
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import {
  Search, Headphones, Play, Clock, Eye,
  Grid, List, Loader2, AlertCircle,
  ChevronLeft, ChevronRight, Mic
} from 'lucide-react';
import audioAPI from '../../api/audioAPI';
import { AUDIO_CATEGORIES } from '../../utils/constants.js';

const AudioListPage = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const { data: response, isLoading, error, refetch } = useQuery({
    queryKey: ['audio', currentPage, activeCategory, sortBy],
    queryFn: () => audioAPI.getAudioItems({
      page: currentPage,
      limit: itemsPerPage,
      type: activeCategory !== 'all' ? activeCategory.toLowerCase() : undefined,
      search: searchQuery || undefined,
      sort: sortBy
    }),
    enabled: true,
    staleTime: 30000
  });

  const audioData = response?.data?.data || response?.data || response || [];
  const audioItems = Array.isArray(audioData) ? audioData : [];
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
    const timer = setTimeout(() => {
      if (currentPage === 1) refetch();
      else setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, refetch, currentPage]);

  const goToPage = (page) => {
    if (page >= 1 && page <= (pagination.totalPages || 1)) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const formatDuration = (seconds) => {
    if (!seconds) return 'N/A';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return hrs > 0
      ? `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
      : `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatPlays = (plays) => {
    if (!plays) return '0';
    if (plays >= 1000000) return `${(plays / 1000000).toFixed(1)}M`;
    if (plays >= 1000) return `${(plays / 1000).toFixed(1)}K`;
    return plays.toString();
  };

  const clearFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setSortBy('popular');
    setCurrentPage(1);
  };

  const getCategoryDisplayName = (type) => {
    const category = AUDIO_CATEGORIES.find(cat => cat.id === type?.toLowerCase());
    return category?.label || type || 'Audio';
  };

  const getAudioIcon = () => <Headphones className="h-4 w-4" />;

  /* ================= LOADING ================= */
  if (isLoading && audioItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (error && audioItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
        <button onClick={() => refetch()} className="btn-primary">Retry</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 via-white to-gray-100">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
            {t('common.audio', 'Audio Library')}
          </h1>
          <p className="text-gray-500 mt-2">
            Discover premium Urdu audio experiences
          </p>
        </div>

        {/* CONTROLS */}
        <div className="sticky top-20 z-10 bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-4 mb-8 shadow-sm flex flex-col md:flex-row gap-4">

          {/* SEARCH */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search audio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 bg-white"
            />
          </div>

          {/* SORT */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-200 bg-white"
          >
            <option value="popular">Popular</option>
            <option value="recent">Recent</option>
            <option value="plays">Most Played</option>
          </select>

          {/* VIEW */}
          <div className="flex rounded-xl border overflow-hidden">
            <button onClick={() => setViewMode('grid')} className={`p-3 ${viewMode==='grid'?'bg-primary-600 text-white':'text-gray-600'}`}>
              <Grid />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-3 ${viewMode==='list'?'bg-primary-600 text-white':'text-gray-600'}`}>
              <List />
            </button>
          </div>

        </div>

        {/* CATEGORY PILLS */}
        <div className="flex gap-2 overflow-x-auto mb-8">
          {['all', ...AUDIO_CATEGORIES.map(c=>c.id)].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                activeCategory===cat
                  ? 'bg-primary-600 text-white shadow'
                  : 'bg-white border hover:bg-gray-50'
              }`}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>

        {/* EMPTY */}
        {audioItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <Headphones className="mx-auto h-12 w-12 text-gray-300 mb-4"/>
            <p className="text-gray-500">No audio found</p>
          </div>
        ) : (
          <>
            {/* GRID */}
            <div className={`grid gap-8 ${viewMode==='grid'?'grid-cols-1 md:grid-cols-2 lg:grid-cols-3':'grid-cols-1'}`}>
              {audioItems.map((audio, index) => (
                <motion.div key={audio._id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:index*0.05}}>
                  <Link to={`/audio/${audio.slug}`}>

                    <div className={`group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all ${viewMode==='list'?'flex':''}`}>

                      {/* IMAGE */}
                      <div className={`${viewMode==='list'?'w-60':'w-full'} relative`}>
                        <img
                          src={audio.thumbnail || audio.coverImage}
                          alt={audio.title}
                          className="w-full aspect-square object-cover group-hover:scale-110 transition duration-500"
                        />

                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="bg-white/90 p-3 rounded-full">
                            <Play className="text-primary-600"/>
                          </div>
                        </div>

                        {audio.duration && (
                          <div className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded">
                            {formatDuration(audio.duration)}
                          </div>
                        )}
                      </div>

                      {/* CONTENT */}
                      <div className="p-5 flex-1">
                        <h3 className="font-semibold text-lg group-hover:text-primary-600 line-clamp-2">
                          {audio.title}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {audio.description}
                        </p>

                        <div className="flex gap-4 text-sm text-gray-400 mt-3">
                          <span className="flex items-center gap-1">
                            <Play className="h-4 w-4"/> {formatPlays(audio.stats?.plays)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4"/> {formatPlays(audio.stats?.views)}
                          </span>
                        </div>

                      </div>
                    </div>

                  </Link>
                </motion.div>
              ))}
            </div>

            {/* PAGINATION */}
            <div className="flex justify-center gap-2 mt-12">
              <button onClick={()=>goToPage(currentPage-1)} className="p-2 border rounded-lg">
                <ChevronLeft/>
              </button>

              {[...Array(pagination.totalPages || 1)].map((_,i)=>(
                <button
                  key={i}
                  onClick={()=>goToPage(i+1)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage===i+1 ? 'bg-primary-600 text-white' : 'bg-white border'
                  }`}
                >
                  {i+1}
                </button>
              ))}

              <button onClick={()=>goToPage(currentPage+1)} className="p-2 border rounded-lg">
                <ChevronRight/>
              </button>
            </div>

          </>
        )}

      </div>
    </div>
  );
};

export default AudioListPage;