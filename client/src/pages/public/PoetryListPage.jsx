// //client/src/pages/public/PoetryListPage.jsx


// import React, { useState, useEffect } from 'react'
// import { useTranslation } from 'react-i18next'
// import { useSearchParams } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import { Search, Filter, Heart, Eye, Bookmark, BookOpen } from 'lucide-react'
// import { Link } from 'react-router-dom'
// import { POETRY_GENRES } from '../../utils/constants.js'

// const PoetryListPage = () => {
//   const { t } = useTranslation()
//   const [searchParams] = useSearchParams()
//   const [activeGenre, setActiveGenre] = useState(searchParams.get('genre') || 'all')
//   const [searchQuery, setSearchQuery] = useState('')
//   const [sortBy, setSortBy] = useState('popular')

//   const poems = [
//     {
//       id: 1,
//       title: 'Hazaaron Khwahishein Aisi',
//       titleUr: 'ہزاروں خواہشیں ایسی',
//       author: 'Mirza Ghalib',
//       genre: 'ghazal',
//       excerpt: 'Hazaaron khwahishein aisi ke har khwahish pe dam nikle...',
//       likes: 12500,
//       views: 45000,
//       bookmarks: 3200,
//       language: 'ur',
//     },
//     {
//       id: 2,
//       title: 'Gulon Mein Rang Bhare',
//       titleUr: 'گلوں میں رنگ بھرے',
//       author: 'Faiz Ahmed Faiz',
//       genre: 'nazm',
//       excerpt: 'Gulon mein rang bhare baad-e-naubahaar chale...',
//       likes: 9800,
//       views: 32000,
//       bookmarks: 2100,
//       language: 'ur',
//     },
//     {
//       id: 3,
//       title: 'Aaj Bazar Mein',
//       titleUr: 'آج بازار میں',
//       author: 'Faiz Ahmed Faiz',
//       genre: 'nazm',
//       excerpt: 'Aaj bazar mein pa-bajolaan chalo...',
//       likes: 8700,
//       views: 28000,
//       bookmarks: 1800,
//       language: 'ur',
//     },
//     {
//       id: 4,
//       title: 'Dil-e-Nadaan Tujhe Hua Kya Hai',
//       titleUr: 'دلِ ناداں تجھے ہوا کیا ہے',
//       author: 'Mirza Ghalib',
//       genre: 'ghazal',
//       excerpt: 'Dil-e-nadaan tujhe hua kya hai...',
//       likes: 7600,
//       views: 24000,
//       bookmarks: 1500,
//       language: 'ur',
//     },
//     {
//       id: 5,
//       title: 'Lab Pe Aati Hai Dua',
//       titleUr: 'لب پہ آتی ہے دعا',
//       author: 'Allama Iqbal',
//       genre: 'nazm',
//       excerpt: 'Lab pe aati hai dua ban ke tamanna meri...',
//       likes: 11200,
//       views: 38000,
//       bookmarks: 2800,
//       language: 'ur',
//     },
//     {
//       id: 6,
//       title: 'Sarfaroshi Ki Tamanna',
//       titleUr: 'سرفروشی کی تمنا',
//       author: 'Ram Prasad Bismil',
//       genre: 'sher',
//       excerpt: 'Sarfaroshi ki tamanna ab hamare dil mein hai...',
//       likes: 9500,
//       views: 31000,
//       bookmarks: 2200,
//       language: 'hi',
//     },
//   ]

//   const filteredPoems = poems.filter((poem) => {
//     if (activeGenre !== 'all' && poem.genre !== activeGenre) return false
//     if (searchQuery && !poem.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
//     return true
//   })

//   return (
//     <div className="page-container">
//       <div className="mb-8">
//         <h1 className="section-title">{t('common.poetry')}</h1>
//         <p className="section-subtitle">Explore ghazals, nazms, sher, and more</p>
//       </div>

//       {/* Search & Filters */}
//       <div className="flex flex-col md:flex-row gap-4 mb-6">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search poems, poets..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="input-field pl-10"
//           />
//         </div>
//         <select
//           value={sortBy}
//           onChange={(e) => setSortBy(e.target.value)}
//           className="input-field w-full md:w-48"
//         >
//           <option value="popular">Most Popular</option>
//           <option value="recent">Most Recent</option>
//           <option value="likes">Most Liked</option>
//           <option value="views">Most Viewed</option>
//         </select>
//       </div>

//       {/* Genre Tabs */}
//       <div className="flex overflow-x-auto space-x-2 mb-6 pb-2">
//         <button
//           onClick={() => setActiveGenre('all')}
//           className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//             activeGenre === 'all'
//               ? 'bg-primary-600 text-white'
//               : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//           }`}
//         >
//           All Genres
//         </button>
//         {POETRY_GENRES.map((genre) => (
//           <button
//             key={genre.id}
//             onClick={() => setActiveGenre(genre.id)}
//             className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//               activeGenre === genre.id
//                 ? 'bg-primary-600 text-white'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             {genre.label}
//           </button>
//         ))}
//       </div>

//       {/* Poems Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredPoems.map((poem, index) => (
//           <motion.div
//             key={poem.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//           >
//             <Link to={`/poetry/${poem.id}`} className="card block p-6 group hover:shadow-lg transition-shadow">
//               <div className="flex items-start justify-between mb-4">
//                 <div>
//                   <span className="inline-block px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full mb-2 capitalize">
//                     {poem.genre}
//                   </span>
//                   <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
//                     {poem.title}
//                   </h3>
//                   <p className="urdu-text text-gray-600 text-sm mt-1">{poem.titleUr}</p>
//                 </div>
//                 <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
//                   <Bookmark className="h-5 w-5 text-gray-400" />
//                 </button>
//               </div>

//               <p className="text-gray-600 text-sm mb-4 line-clamp-2 italic">
//                 "{poem.excerpt}"
//               </p>

//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-gray-500">{poem.author}</span>
//                 <div className="flex items-center space-x-3 text-sm text-gray-500">
//                   <span className="flex items-center space-x-1">
//                     <Heart className="h-4 w-4 text-red-400" />
//                     <span>{(poem.likes / 1000).toFixed(1)}K</span>
//                   </span>
//                   <span className="flex items-center space-x-1">
//                     <Eye className="h-4 w-4" />
//                     <span>{(poem.views / 1000).toFixed(1)}K</span>
//                   </span>
//                 </div>
//               </div>
//             </Link>
//           </motion.div>
//         ))}
//       </div>

//       {filteredPoems.length === 0 && (
//         <div className="text-center py-12">
//           <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//           <p className="text-gray-500">No poems found matching your criteria</p>
//         </div>
//       )}
//     </div>
//   )
// }

// export default PoetryListPage







// // client/src/pages/public/PoetryListPage.jsx
// import React, { useState, useEffect } from 'react'
// import { useTranslation } from 'react-i18next'
// import { useSearchParams, Link } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import { useQuery } from '@tanstack/react-query'
// import { Search, Filter, Heart, Eye, Bookmark, BookOpen, Loader2, ChevronLeft, ChevronRight } from 'lucide-react'
// import poemAPI from '../../api/poemAPI'
// import { POETRY_GENRES } from '../../utils/constants.js'

// const PoetryListPage = () => {
//   const { t } = useTranslation()
//   const [searchParams, setSearchParams] = useSearchParams()
//   const [activeGenre, setActiveGenre] = useState(searchParams.get('genre') || 'all')
//   const [searchQuery, setSearchQuery] = useState('')
//   const [sortBy, setSortBy] = useState('popular')
//   const [currentPage, setCurrentPage] = useState(1)
//   const itemsPerPage = 9

//   // Fetch real poems from API
//   const { data: response, isLoading, error, refetch } = useQuery({
//     queryKey: ['poems', currentPage, activeGenre, sortBy],
//     queryFn: () => poemAPI.getPoems({
//       page: currentPage,
//       limit: itemsPerPage,
//       genre: activeGenre !== 'all' ? activeGenre : undefined,
//       search: searchQuery || undefined,
//       sort: sortBy
//     }),
//     enabled: true,
//     staleTime: 30000
//   })

//   // Extract poems and pagination from response
//   const poemsData = response?.data?.data || response?.data || response || []
//   const poems = Array.isArray(poemsData) ? poemsData : []
//   const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 }

//   // Update URL when genre changes
//   useEffect(() => {
//     if (activeGenre && activeGenre !== 'all') {
//       setSearchParams({ genre: activeGenre })
//     } else {
//       setSearchParams({})
//     }
//     setCurrentPage(1)
//   }, [activeGenre, setSearchParams])

//   // Debounced search
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (currentPage === 1) {
//         refetch()
//       } else {
//         setCurrentPage(1)
//       }
//     }, 500)
//     return () => clearTimeout(timer)
//   }, [searchQuery, refetch, currentPage])

//   // Handle page change
//   const goToPage = (page) => {
//     if (page >= 1 && page <= (pagination.totalPages || 1)) {
//       setCurrentPage(page)
//       window.scrollTo({ top: 0, behavior: 'smooth' })
//     }
//   }

//   // Get sort options
//   const sortOptions = [
//     { value: 'popular', label: 'Most Popular' },
//     { value: 'recent', label: 'Most Recent' },
//     { value: 'views', label: 'Most Viewed' },
//     { value: 'likes', label: 'Most Liked' }
//   ]

//   // Get sort function for client-side sorting (if API doesn't support)
//   const getSortedPoems = (poemsList) => {
//     switch (sortBy) {
//       case 'recent':
//         return [...poemsList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//       case 'views':
//         return [...poemsList].sort((a, b) => (b.stats?.views || 0) - (a.stats?.views || 0))
//       case 'likes':
//         return [...poemsList].sort((a, b) => (b.stats?.likes || 0) - (a.stats?.likes || 0))
//       default:
//         return poemsList
//     }
//   }

//   const sortedPoems = getSortedPoems(poems)

//   // Loading state
//   if (isLoading && poems.length === 0) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-center min-h-[60vh]">
//             <div className="text-center">
//               <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
//               <p className="text-gray-500">Loading poems...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Error state
//   if (error && poems.length === 0) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center py-12">
//             <div className="text-red-500 mb-4">
//               <BookOpen className="h-12 w-12 mx-auto" />
//             </div>
//             <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to load poems</h2>
//             <p className="text-gray-500 mb-6">There was an error loading the poems. Please try again.</p>
//             <button onClick={() => refetch()} className="btn-primary">
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
//             {t('common.poetry', 'Poetry Collection')}
//           </h1>
//           <p className="text-gray-500">
//             Explore ghazals, nazms, sher, and more from legendary poets
//           </p>
//         </div>

//         {/* Search & Filters */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search poems by title or poet..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
//             />
//           </div>
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white w-full md:w-48"
//           >
//             {sortOptions.map(option => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Genre Tabs */}
//         <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-6 pb-2">
//           <button
//             onClick={() => setActiveGenre('all')}
//             className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//               activeGenre === 'all'
//                 ? 'bg-primary-600 text-white'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             All Genres
//           </button>
//           {POETRY_GENRES.map((genre) => (
//             <button
//               key={genre.id}
//               onClick={() => setActiveGenre(genre.id)}
//               className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//                 activeGenre === genre.id
//                   ? 'bg-primary-600 text-white'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               {genre.label}
//             </button>
//           ))}
//         </div>

//         {/* Results Count */}
//         <div className="flex justify-between items-center mb-4">
//           <p className="text-sm text-gray-500">
//             Showing {sortedPoems.length} of {pagination.total || sortedPoems.length} poems
//           </p>
//         </div>

//         {/* Poems Grid */}
//         {sortedPoems.length === 0 ? (
//           <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
//             <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No poems found</h3>
//             <p className="text-gray-500">
//               {searchQuery 
//                 ? `No poems matching "${searchQuery}" found. Try a different search term.`
//                 : 'No poems available in this genre yet.'}
//             </p>
//             {(searchQuery || activeGenre !== 'all') && (
//               <button
//                 onClick={() => {
//                   setSearchQuery('')
//                   setActiveGenre('all')
//                 }}
//                 className="mt-4 text-primary-600 hover:text-primary-700"
//               >
//                 Clear filters
//               </button>
//             )}
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {sortedPoems.map((poem, index) => (
//                 <motion.div
//                   key={poem._id || poem.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                 >
//                   <Link to={`/poem/${poem.slug}`} className="block">
//                     <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 group">
//                       {/* Header */}
//                       <div className="flex items-start justify-between mb-3">
//                         <div>
//                           <span className="inline-block px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full mb-2 capitalize">
//                             {poem.genre || 'Poem'}
//                           </span>
//                           <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors text-lg line-clamp-1">
//                             {poem.title}
//                           </h3>
//                           {poem.contentUrdu && (
//                             <p className="urdu-text text-gray-500 text-sm mt-1 line-clamp-1" dir="rtl">
//                               {poem.contentUrdu.split('\n')[0]}
//                             </p>
//                           )}
//                         </div>
//                         <button 
//                           className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//                           onClick={(e) => {
//                             e.preventDefault()
//                             // Handle bookmark if needed
//                           }}
//                         >
//                           <Bookmark className="h-5 w-5 text-gray-400" />
//                         </button>
//                       </div>

//                       {/* Excerpt */}
//                       <p className="text-gray-600 text-sm mb-4 line-clamp-2 italic">
//                         "{poem.contentUrdu?.split('\n')[0] || poem.content?.split('\n')[0] || 'No preview available'}"
//                       </p>

//                       {/* Author & Stats */}
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm text-gray-500">
//                           {typeof poem.author === 'object' ? poem.author?.name : poem.author || 'Unknown Author'}
//                         </span>
//                         <div className="flex items-center space-x-3 text-sm text-gray-500">
//                           <span className="flex items-center space-x-1">
//                             <Heart className="h-4 w-4 text-red-400" />
//                             <span>{poem.stats?.likes?.toLocaleString() || 0}</span>
//                           </span>
//                           <span className="flex items-center space-x-1">
//                             <Eye className="h-4 w-4" />
//                             <span>{poem.stats?.views?.toLocaleString() || 0}</span>
//                           </span>
//                         </div>
//                       </div>

//                       {/* Language Badge */}
//                       {poem.language && (
//                         <div className="mt-3">
//                           <span className="text-xs text-gray-400">
//                             {poem.language === 'urdu' ? 'اردو' : 
//                              poem.language === 'hindi' ? 'हिंदी' : 
//                              poem.language === 'english' ? 'English' : poem.language}
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   </Link>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Pagination */}
//             {(pagination.totalPages > 1 || Math.ceil(sortedPoems.length / itemsPerPage) > 1) && (
//               <div className="flex items-center justify-center gap-2 mt-8">
//                 <button
//                   onClick={() => goToPage(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <ChevronLeft className="h-5 w-5 text-gray-600" />
//                 </button>
                
//                 <div className="flex items-center gap-1">
//                   {Array.from({ length: pagination.totalPages || Math.ceil(sortedPoems.length / itemsPerPage) }, (_, i) => i + 1)
//                     .filter(page => {
//                       const totalPages = pagination.totalPages || Math.ceil(sortedPoems.length / itemsPerPage)
//                       if (totalPages <= 7) return true
//                       if (page === 1 || page === totalPages) return true
//                       if (page >= currentPage - 1 && page <= currentPage + 1) return true
//                       return false
//                     })
//                     .map((page, index, array) => {
//                       if (index > 0 && array[index - 1] !== page - 1) {
//                         return (
//                           <span key={`ellipsis-${page}`} className="px-3 py-2 text-gray-500">
//                             ...
//                           </span>
//                         )
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
//                       )
//                     })}
//                 </div>

//                 <button
//                   onClick={() => goToPage(currentPage + 1)}
//                   disabled={currentPage === (pagination.totalPages || Math.ceil(sortedPoems.length / itemsPerPage))}
//                   className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <ChevronRight className="h-5 w-5 text-gray-600" />
//                 </button>
//               </div>
//             )}

//             {/* Loading more indicator */}
//             {isLoading && poems.length > 0 && (
//               <div className="flex justify-center mt-8">
//                 <Loader2 className="h-6 w-6 animate-spin text-primary-600" />
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   )
// }

// export default PoetryListPage












// // client/src/pages/public/PoetryListPage.jsx
// import React, { useState, useEffect, useRef, useCallback } from 'react'
// import { useTranslation } from 'react-i18next'
// import { useSearchParams, Link } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useQuery } from '@tanstack/react-query'
// import { 
//   Search, Filter, Heart, Eye, Bookmark, BookOpen, Loader2, 
//   ChevronLeft, ChevronRight, Sparkles, TrendingUp, Clock, 
//   Award, Star, Flame, Menu, X, Grid3x3, List, 
//   Calendar, User, Quote, Zap, Crown, ArrowRight,
//   Play, Mic, Headphones, Volume2
// } from 'lucide-react'
// import poemAPI from '../../api/poemAPI'
// import { POETRY_GENRES } from '../../utils/constants.js'

// const PoetryListPage = () => {
//   const { t } = useTranslation()
//   const [searchParams, setSearchParams] = useSearchParams()
//   const [activeGenre, setActiveGenre] = useState(searchParams.get('genre') || 'all')
//   const [searchQuery, setSearchQuery] = useState('')
//   const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
//   const [sortBy, setSortBy] = useState('popular')
//   const [currentPage, setCurrentPage] = useState(1)
//   const [viewMode, setViewMode] = useState('grid')
//   const [showFilters, setShowFilters] = useState(false)
//   const itemsPerPage = 9
//   const searchInputRef = useRef(null)
//   const debounceTimerRef = useRef(null)

//   // Fetch real poems from API - using debounced search query
//   const { data: response, isLoading, error, refetch } = useQuery({
//     queryKey: ['poems', currentPage, activeGenre, sortBy, debouncedSearchQuery],
//     queryFn: () => poemAPI.getPoems({
//       page: currentPage,
//       limit: itemsPerPage,
//       genre: activeGenre !== 'all' ? activeGenre : undefined,
//       search: debouncedSearchQuery || undefined,
//       sort: sortBy
//     }),
//     enabled: true,
//     staleTime: 30000
//   })

//   // Extract poems and pagination from response
//   const poemsData = response?.data?.data || response?.data || response || []
//   const poems = Array.isArray(poemsData) ? poemsData : []
//   const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 }

//   // Debounce search - FIXED: No re-render loss
//   useEffect(() => {
//     // Clear previous timer
//     if (debounceTimerRef.current) {
//       clearTimeout(debounceTimerRef.current)
//     }
    
//     // Set new timer
//     debounceTimerRef.current = setTimeout(() => {
//       setDebouncedSearchQuery(searchQuery)
//       if (currentPage !== 1) {
//         setCurrentPage(1)
//       }
//     }, 500)
    
//     return () => {
//       if (debounceTimerRef.current) {
//         clearTimeout(debounceTimerRef.current)
//       }
//     }
//   }, [searchQuery])

//   // Update URL when genre changes
//   useEffect(() => {
//     if (activeGenre && activeGenre !== 'all') {
//       setSearchParams({ genre: activeGenre })
//     } else {
//       setSearchParams({})
//     }
//     setCurrentPage(1)
//   }, [activeGenre, setSearchParams])

//   // Handle page change
//   const goToPage = (page) => {
//     if (page >= 1 && page <= (pagination.totalPages || 1)) {
//       setCurrentPage(page)
//       window.scrollTo({ top: 0, behavior: 'smooth' })
//     }
//   }

//   // Get sort options
//   const sortOptions = [
//     { value: 'popular', label: 'Most Popular', icon: Flame },
//     { value: 'recent', label: 'Most Recent', icon: Clock },
//     { value: 'views', label: 'Most Viewed', icon: Eye },
//     { value: 'likes', label: 'Most Liked', icon: Heart }
//   ]

//   // Get sort function for client-side sorting
//   const getSortedPoems = (poemsList) => {
//     switch (sortBy) {
//       case 'recent':
//         return [...poemsList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//       case 'views':
//         return [...poemsList].sort((a, b) => (b.stats?.views || 0) - (a.stats?.views || 0))
//       case 'likes':
//         return [...poemsList].sort((a, b) => (b.stats?.likes || 0) - (a.stats?.likes || 0))
//       default:
//         return poemsList
//     }
//   }

//   const sortedPoems = getSortedPoems(poems)

//   // Get genre icon
//   const getGenreIcon = (genreId) => {
//     const genre = POETRY_GENRES.find(g => g.id === genreId)
//     return genre?.icon || '📖'
//   }

//   // Clear all filters
//   const clearFilters = useCallback(() => {
//     setSearchQuery('')
//     setDebouncedSearchQuery('')
//     setActiveGenre('all')
//     setCurrentPage(1)
//     // Focus back on search input
//     setTimeout(() => {
//       if (searchInputRef.current) {
//         searchInputRef.current.focus()
//       }
//     }, 100)
//   }, [])

//   // Handle search input change - maintains focus
//   const handleSearchChange = (e) => {
//     const value = e.target.value
//     setSearchQuery(value)
//     // No immediate refetch - debounce handles it
//   }

//   // Loading state
//   if (isLoading && poems.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
//           <div className="flex items-center justify-center min-h-[60vh]">
//             <div className="text-center">
//               <div className="relative">
//                 <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-amber-500 rounded-2xl animate-pulse mx-auto mb-6 flex items-center justify-center">
//                   <BookOpen className="h-10 w-10 text-white" />
//                 </div>
//                 <div className="absolute -top-2 -right-2">
//                   <Sparkles className="h-6 w-6 text-amber-400 animate-spin" />
//                 </div>
//               </div>
//               <p className="text-gray-600 font-medium">Loading timeless verses...</p>
//               <p className="text-sm text-gray-400 mt-1">Preparing your poetic journey</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Error state
//   if (error && poems.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
//           <div className="text-center py-12">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-2xl mb-6">
//               <BookOpen className="h-10 w-10 text-red-500" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to load poems</h2>
//             <p className="text-gray-500 mb-6">There was an error loading the poems. Please try again.</p>
//             <button onClick={() => refetch()} className="btn-primary inline-flex items-center gap-2">
//               <Sparkles className="h-4 w-4" />
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
//       {/* Hero Section */}
//       <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-primary-500 to-amber-500 pt-24 pb-16">
//         {/* Animated background patterns */}
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full filter blur-3xl animate-pulse" />
//           <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200 rounded-full filter blur-3xl animate-pulse delay-1000" />
//         </div>
        
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-center"
//           >
//             <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
//               <Sparkles className="h-4 w-4 text-amber-200" />
//               <span className="text-sm text-white font-medium">Discover Poetry</span>
//             </div>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
//               Poetry Collection
//             </h1>
//             <p className="text-lg text-white/90 max-w-2xl mx-auto">
//               Explore ghazals, nazms, sher, and more from legendary poets across generations
//             </p>
//           </motion.div>
//         </div>
        
//         {/* Curved bottom */}
//         <div className="absolute bottom-0 left-0 right-0">
//           <svg className="w-full h-12 text-slate-50" preserveAspectRatio="none" viewBox="0 0 1440 54">
//             <path fill="currentColor" d="M0,22L80,27.3C160,33,320,43,480,42.7C640,43,800,32,960,26.7C1120,21,1280,21,1360,21.3L1440,22L1440,54L1360,54C1280,54,1120,54,960,54C800,54,640,54,480,54C320,54,160,54,80,54L0,54Z"/>
//           </svg>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
//         {/* Stats Cards */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
//         >
//           {[
//             { label: 'Total Poems', value: pagination.total?.toLocaleString() || '0', icon: BookOpen, color: 'from-blue-500 to-blue-600' },
//             { label: 'Genres', value: POETRY_GENRES.length, icon: Filter, color: 'from-purple-500 to-purple-600' },
//             { label: 'Poets', value: '150+', icon: User, color: 'from-amber-500 to-amber-600' },
//             { label: 'Readers', value: '10K+', icon: Eye, color: 'from-green-500 to-green-600' }
//           ].map((stat, idx) => (
//             <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//                   <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
//                 </div>
//                 <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
//                   <stat.icon className="h-5 w-5 text-white" />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </motion.div>

//         {/* Search & Filters Bar */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6"
//         >
//           <div className="flex flex-col lg:flex-row gap-4">
//             {/* Search Input - With ref to maintain focus */}
//             <div className="flex-1 relative">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//               <input
//                 ref={searchInputRef}
//                 type="text"
//                 placeholder="Search poems by title, poet, or verse..."
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 transition-all"
//                 autoComplete="off"
//               />
//               {searchQuery && (
//                 <button
//                   onClick={() => {
//                     setSearchQuery('')
//                     setDebouncedSearchQuery('')
//                     // Keep focus on input
//                     setTimeout(() => {
//                       if (searchInputRef.current) {
//                         searchInputRef.current.focus()
//                       }
//                     }, 0)
//                   }}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   <X className="h-4 w-4" />
//                 </button>
//               )}
//             </div>

//             {/* Sort Dropdown */}
//             <div className="flex gap-2">
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 cursor-pointer"
//               >
//                 {sortOptions.map(option => {
//                   const Icon = option.icon
//                   return (
//                     <option key={option.value} value={option.value}>
//                       {option.label}
//                     </option>
//                   )
//                 })}
//               </select>

//               {/* View Toggle */}
//               <button
//                 onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
//                 className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
//               >
//                 {viewMode === 'grid' ? <List className="h-5 w-5 text-gray-600" /> : <Grid3x3 className="h-5 w-5 text-gray-600" />}
//               </button>

//               {/* Filter Toggle (Mobile) */}
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="lg:hidden px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
//               >
//                 <Filter className="h-5 w-5 text-gray-600" />
//               </button>
//             </div>
//           </div>

//           {/* Search Results Info */}
//           {debouncedSearchQuery && (
//             <div className="mt-3 px-2 py-1.5 bg-primary-50 rounded-lg">
//               <p className="text-sm text-primary-700">
//                 Searching for: <span className="font-semibold">"{debouncedSearchQuery}"</span>
//                 {!isLoading && (
//                   <span className="ml-2">
//                     ({pagination.total || poems.length} results found)
//                   </span>
//                 )}
//                 {isLoading && (
//                   <span className="ml-2 inline-flex items-center gap-1">
//                     <Loader2 className="h-3 w-3 animate-spin" />
//                     Searching...
//                   </span>
//                 )}
//               </p>
//             </div>
//           )}

//           {/* Filter Chips - Desktop */}
//           <div className="hidden lg:flex overflow-x-auto gap-2 mt-4 pb-2">
//             <button
//               onClick={() => setActiveGenre('all')}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
//                 activeGenre === 'all'
//                   ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               All Genres
//             </button>
//             {POETRY_GENRES.map((genre) => (
//               <button
//                 key={genre.id}
//                 onClick={() => setActiveGenre(genre.id)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
//                   activeGenre === genre.id
//                     ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 <span className="mr-1">{getGenreIcon(genre.id)}</span>
//                 {genre.label}
//               </button>
//             ))}
//           </div>

//           {/* Filter Panel - Mobile */}
//           <AnimatePresence>
//             {showFilters && (
//               <motion.div
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: 'auto', opacity: 1 }}
//                 exit={{ height: 0, opacity: 0 }}
//                 className="lg:hidden overflow-hidden mt-4"
//               >
//                 <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
//                   <button
//                     onClick={() => {
//                       setActiveGenre('all')
//                       setShowFilters(false)
//                     }}
//                     className={`px-3 py-1.5 rounded-full text-sm transition-all ${
//                       activeGenre === 'all'
//                         ? 'bg-primary-600 text-white'
//                         : 'bg-gray-100 text-gray-700'
//                     }`}
//                   >
//                     All
//                   </button>
//                   {POETRY_GENRES.map((genre) => (
//                     <button
//                       key={genre.id}
//                       onClick={() => {
//                         setActiveGenre(genre.id)
//                         setShowFilters(false)
//                       }}
//                       className={`px-3 py-1.5 rounded-full text-sm transition-all ${
//                         activeGenre === genre.id
//                           ? 'bg-primary-600 text-white'
//                           : 'bg-gray-100 text-gray-700'
//                       }`}
//                     >
//                       {genre.label}
//                     </button>
//                   ))}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>

//         {/* Results Header */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center gap-2">
//             <div className="w-1 h-6 bg-gradient-to-b from-primary-600 to-amber-500 rounded-full" />
//             <p className="text-sm text-gray-600">
//               Showing <span className="font-semibold text-gray-900">{sortedPoems.length}</span> of{' '}
//               <span className="font-semibold text-gray-900">{pagination.total || sortedPoems.length}</span> poems
//             </p>
//           </div>
//           {(activeGenre !== 'all' || debouncedSearchQuery) && (
//             <button
//               onClick={clearFilters}
//               className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
//             >
//               Clear all filters
//               <X className="h-3 w-3" />
//             </button>
//           )}
//         </div>

//         {/* Poems Grid/List */}
//         {sortedPoems.length === 0 && !isLoading ? (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="bg-white rounded-2xl p-12 text-center border border-gray-100"
//           >
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-2xl mb-6">
//               <BookOpen className="h-10 w-10 text-amber-600" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">No poems found</h3>
//             <p className="text-gray-500 max-w-md mx-auto">
//               {debouncedSearchQuery 
//                 ? `No poems matching "${debouncedSearchQuery}" found. Try a different search term.`
//                 : 'No poems available in this genre yet.'}
//             </p>
//             {(debouncedSearchQuery || activeGenre !== 'all') && (
//               <button
//                 onClick={clearFilters}
//                 className="mt-6 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
//               >
//                 Clear all filters
//                 <ArrowRight className="h-4 w-4" />
//               </button>
//             )}
//           </motion.div>
//         ) : (
//           <>
//             <div className={viewMode === 'grid' 
//               ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//               : "space-y-4"
//             }>
//               {sortedPoems.map((poem, index) => (
//                 viewMode === 'grid' ? (
//                   <motion.div
//                     key={poem._id || poem.id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.05 }}
//                     whileHover={{ y: -4 }}
//                   >
//                     <Link to={`/poem/${poem.slug}`} className="block group">
//                       <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
//                         {/* Card Header with Gradient */}
//                         <div className="relative h-32 bg-gradient-to-r from-primary-600 via-primary-500 to-amber-500 p-4">
//                           <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
//                           <div className="relative flex justify-between items-start">
//                             <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-white text-xs font-medium capitalize">
//                               {getGenreIcon(poem.genre)} {poem.genre || 'Poem'}
//                             </span>
//                             <button 
//                               className="p-1.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
//                               onClick={(e) => {
//                                 e.preventDefault()
//                                 // Handle bookmark if needed
//                               }}
//                             >
//                               <Bookmark className="h-4 w-4 text-white" />
//                             </button>
//                           </div>
//                           <div className="absolute bottom-4 left-4 right-4">
//                             <h3 className="font-bold text-white text-lg line-clamp-1 group-hover:translate-x-1 transition-transform">
//                               {poem.title}
//                             </h3>
//                           </div>
//                         </div>
                        
//                         {/* Card Body */}
//                         <div className="p-4">
//                           {poem.contentUrdu && (
//                             <p className="urdu-text text-gray-700 text-sm line-clamp-3 mb-3" dir="rtl">
//                               {poem.contentUrdu.split('\n')[0]}
//                             </p>
//                           )}
                          
//                           {/* Author */}
//                           <div className="flex items-center gap-2 mb-3">
//                             <div className="w-6 h-6 bg-gradient-to-br from-primary-100 to-amber-100 rounded-full flex items-center justify-center">
//                               <User className="h-3 w-3 text-primary-600" />
//                             </div>
//                             <span className="text-sm text-gray-600">
//                               {typeof poem.author === 'object' ? poem.author?.name : poem.author || 'Unknown Author'}
//                             </span>
//                           </div>
                          
//                           {/* Stats */}
//                           <div className="flex items-center justify-between pt-3 border-t border-gray-100">
//                             <div className="flex items-center gap-3">
//                               <div className="flex items-center gap-1 text-gray-500">
//                                 <Heart className="h-4 w-4 text-red-400" />
//                                 <span className="text-xs">{poem.stats?.likes?.toLocaleString() || 0}</span>
//                               </div>
//                               <div className="flex items-center gap-1 text-gray-500">
//                                 <Eye className="h-4 w-4" />
//                                 <span className="text-xs">{poem.stats?.views?.toLocaleString() || 0}</span>
//                               </div>
//                             </div>
//                             {poem.language && (
//                               <span className="text-xs text-gray-400">
//                                 {poem.language === 'urdu' ? 'اردو' : 
//                                  poem.language === 'hindi' ? 'हिंदी' : 
//                                  poem.language === 'english' ? 'English' : poem.language}
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   </motion.div>
//                 ) : (
//                   <motion.div
//                     key={poem._id || poem.id}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.05 }}
//                   >
//                     <Link to={`/poem/${poem.slug}`} className="block group">
//                       <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:bg-gray-50/50">
//                         <div className="flex items-start justify-between">
//                           <div className="flex-1">
//                             <div className="flex items-center gap-2 mb-2">
//                               <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary-50 text-primary-700 rounded-lg text-xs font-medium capitalize">
//                                 {poem.genre || 'Poem'}
//                               </span>
//                               {poem.language && (
//                                 <span className="text-xs text-gray-400">
//                                   {poem.language === 'urdu' ? 'اردو' : 
//                                    poem.language === 'hindi' ? 'हिंदी' : 
//                                    poem.language === 'english' ? 'English' : poem.language}
//                                 </span>
//                               )}
//                             </div>
//                             <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
//                               {poem.title}
//                             </h3>
//                             <p className="text-sm text-gray-500 mt-1">
//                               {typeof poem.author === 'object' ? poem.author?.name : poem.author || 'Unknown Author'}
//                             </p>
//                             {poem.contentUrdu && (
//                               <p className="urdu-text text-gray-600 text-sm mt-2 line-clamp-1" dir="rtl">
//                                 {poem.contentUrdu.split('\n')[0]}
//                               </p>
//                             )}
//                           </div>
//                           <div className="flex items-center gap-3 ml-4">
//                             <div className="flex items-center gap-1">
//                               <Heart className="h-4 w-4 text-gray-400" />
//                               <span className="text-sm text-gray-600">{poem.stats?.likes?.toLocaleString() || 0}</span>
//                             </div>
//                             <div className="flex items-center gap-1">
//                               <Eye className="h-4 w-4 text-gray-400" />
//                               <span className="text-sm text-gray-600">{poem.stats?.views?.toLocaleString() || 0}</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   </motion.div>
//                 )
//               ))}
//             </div>

//             {/* Premium Pagination */}
//             {(pagination.totalPages > 1 || Math.ceil(sortedPoems.length / itemsPerPage) > 1) && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="flex items-center justify-center gap-2 mt-12"
//               >
//                 <button
//                   onClick={() => goToPage(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                 >
//                   <ChevronLeft className="h-5 w-5 text-gray-600" />
//                 </button>
                
//                 <div className="flex items-center gap-1">
//                   {Array.from({ length: pagination.totalPages || Math.ceil(sortedPoems.length / itemsPerPage) }, (_, i) => i + 1)
//                     .filter(page => {
//                       const totalPages = pagination.totalPages || Math.ceil(sortedPoems.length / itemsPerPage)
//                       if (totalPages <= 7) return true
//                       if (page === 1 || page === totalPages) return true
//                       if (page >= currentPage - 1 && page <= currentPage + 1) return true
//                       return false
//                     })
//                     .map((page, index, array) => {
//                       if (index > 0 && array[index - 1] !== page - 1) {
//                         return (
//                           <span key={`ellipsis-${page}`} className="px-3 py-2 text-gray-400">
//                             ...
//                           </span>
//                         )
//                       }
//                       return (
//                         <button
//                           key={page}
//                           onClick={() => goToPage(page)}
//                           className={`min-w-[40px] h-10 rounded-xl font-medium transition-all ${
//                             currentPage === page
//                               ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
//                               : 'text-gray-600 hover:bg-gray-100'
//                           }`}
//                         >
//                           {page}
//                         </button>
//                       )
//                     })}
//                 </div>

//                 <button
//                   onClick={() => goToPage(currentPage + 1)}
//                   disabled={currentPage === (pagination.totalPages || Math.ceil(sortedPoems.length / itemsPerPage))}
//                   className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                 >
//                   <ChevronRight className="h-5 w-5 text-gray-600" />
//                 </button>
//               </motion.div>
//             )}

//             {/* Loading more indicator */}
//             <AnimatePresence>
//               {isLoading && poems.length > 0 && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="flex justify-center mt-8"
//                 >
//                   <div className="flex items-center gap-2">
//                     <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
//                     <span className="text-sm text-gray-500">Loading more poems...</span>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </>
//         )}
//       </div>
//     </div>
//   )
// }

// export default PoetryListPage






















// client/src/pages/public/PoetryListPage.jsx
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { 
  Search, Filter, Heart, Eye, Bookmark, BookOpen, Loader2, 
  ChevronLeft, ChevronRight, Sparkles, TrendingUp, Clock, 
  Award, Star, Flame, Menu, X, Grid3x3, List, 
  Calendar, User, Quote, Zap, Crown, ArrowRight,
  Play, Mic, Headphones, Volume2
} from 'lucide-react'
import poemAPI from '../../api/poemAPI'
import { POETRY_GENRES } from '../../utils/constants.js'

const PoetryListPage = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeGenre, setActiveGenre] = useState(searchParams.get('genre') || 'all')
  const [searchInputValue, setSearchInputValue] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const itemsPerPage = 9
  const searchInputRef = useRef(null)
  const debounceTimerRef = useRef(null)
  const isInitialMount = useRef(true)

  // Fetch poems - separate query for initial load and search
  const { data: response, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ['poems', currentPage, activeGenre, sortBy, debouncedSearchQuery],
    queryFn: () => poemAPI.getPoems({
      page: currentPage,
      limit: itemsPerPage,
      genre: activeGenre !== 'all' ? activeGenre : undefined,
      search: debouncedSearchQuery || undefined,
      sort: sortBy
    }),
    enabled: true,
    staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  // Extract poems and pagination from response
  const poemsData = response?.data?.data || response?.data || response || []
  const poems = useMemo(() => Array.isArray(poemsData) ? poemsData : [], [poemsData])
  const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 }

  // Debounce search - FIXED: Proper cleanup
  const updateDebouncedSearch = useCallback((value) => {
    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
    
    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedSearchQuery(value)
      if (currentPage !== 1) {
        setCurrentPage(1)
      }
    }, 500)
  }, [currentPage])

  // Handle search input change - NO re-render issues
  const handleSearchChange = useCallback((e) => {
    const value = e.target.value
    setSearchInputValue(value)
    updateDebouncedSearch(value)
  }, [updateDebouncedSearch])

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchInputValue('')
    setDebouncedSearchQuery('')
    // Keep focus on input
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [])

  // Update URL when genre changes
  useEffect(() => {
    if (activeGenre && activeGenre !== 'all') {
      setSearchParams({ genre: activeGenre })
    } else {
      setSearchParams({})
    }
    setCurrentPage(1)
  }, [activeGenre, setSearchParams])

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  // Handle page change
  const goToPage = useCallback((page) => {
    if (page >= 1 && page <= (pagination.totalPages || 1)) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [pagination.totalPages])

  // Get sort options
  const sortOptions = useMemo(() => [
    { value: 'popular', label: 'Most Popular', icon: Flame },
    { value: 'recent', label: 'Most Recent', icon: Clock },
    { value: 'views', label: 'Most Viewed', icon: Eye },
    { value: 'likes', label: 'Most Liked', icon: Heart }
  ], [])

  // Get sort function for client-side sorting
  const sortedPoems = useMemo(() => {
    if (!poems.length) return []
    switch (sortBy) {
      case 'recent':
        return [...poems].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      case 'views':
        return [...poems].sort((a, b) => (b.stats?.views || 0) - (a.stats?.views || 0))
      case 'likes':
        return [...poems].sort((a, b) => (b.stats?.likes || 0) - (a.stats?.likes || 0))
      default:
        return poems
    }
  }, [poems, sortBy])

  // Get genre icon
  const getGenreIcon = useCallback((genreId) => {
    const genre = POETRY_GENRES.find(g => g.id === genreId)
    return genre?.icon || '📖'
  }, [])

  // Clear all filters
  const clearFilters = useCallback(() => {
    clearSearch()
    setActiveGenre('all')
    setCurrentPage(1)
  }, [clearSearch])

  // Loading state
  if (isLoading && poems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-amber-500 rounded-2xl animate-pulse mx-auto mb-6 flex items-center justify-center">
                  <BookOpen className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="h-6 w-6 text-amber-400 animate-spin" />
                </div>
              </div>
              <p className="text-gray-600 font-medium">Loading timeless verses...</p>
              <p className="text-sm text-gray-400 mt-1">Preparing your poetic journey</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error && poems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-2xl mb-6">
              <BookOpen className="h-10 w-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to load poems</h2>
            <p className="text-gray-500 mb-6">There was an error loading the poems. Please try again.</p>
            <button onClick={() => refetch()} className="btn-primary inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-primary-500 to-amber-500 pt-24 pb-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200 rounded-full filter blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-amber-200" />
              <span className="text-sm text-white font-medium">Discover Poetry</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Poetry Collection
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Explore ghazals, nazms, sher, and more from legendary poets across generations
            </p>
          </motion.div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 text-slate-50" preserveAspectRatio="none" viewBox="0 0 1440 54">
            <path fill="currentColor" d="M0,22L80,27.3C160,33,320,43,480,42.7C640,43,800,32,960,26.7C1120,21,1280,21,1360,21.3L1440,22L1440,54L1360,54C1280,54,1120,54,960,54C800,54,640,54,480,54C320,54,160,54,80,54L0,54Z"/>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Total Poems', value: pagination.total?.toLocaleString() || '0', icon: BookOpen, color: 'from-blue-500 to-blue-600' },
            { label: 'Genres', value: POETRY_GENRES.length, icon: Filter, color: 'from-purple-500 to-purple-600' },
            { label: 'Poets', value: '150+', icon: User, color: 'from-amber-500 to-amber-600' },
            { label: 'Readers', value: '10K+', icon: Eye, color: 'from-green-500 to-green-600' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                </div>
                <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Search & Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search poems by title, poet, or verse..."
                value={searchInputValue}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 transition-all"
                autoComplete="off"
              />
              {searchInputValue && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  type="button"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 cursor-pointer"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                {viewMode === 'grid' ? <List className="h-5 w-5 text-gray-600" /> : <Grid3x3 className="h-5 w-5 text-gray-600" />}
              </button>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Search Results Info */}
          {debouncedSearchQuery && (
            <div className="mt-3 px-3 py-2 bg-primary-50 rounded-lg">
              <p className="text-sm text-primary-700">
                Searching for: <span className="font-semibold">"{debouncedSearchQuery}"</span>
                {!isFetching && !isLoading && (
                  <span className="ml-2">
                    ({pagination.total || poems.length} results found)
                  </span>
                )}
                {(isFetching || isLoading) && (
                  <span className="ml-2 inline-flex items-center gap-1">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Searching...
                  </span>
                )}
              </p>
            </div>
          )}

          {/* Filter Chips - Desktop */}
          <div className="hidden lg:flex overflow-x-auto gap-2 mt-4 pb-2">
            <button
              onClick={() => setActiveGenre('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeGenre === 'all'
                  ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Genres
            </button>
            {POETRY_GENRES.map((genre) => (
              <button
                key={genre.id}
                onClick={() => setActiveGenre(genre.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeGenre === genre.id
                    ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-1">{getGenreIcon(genre.id)}</span>
                {genre.label}
              </button>
            ))}
          </div>

          {/* Filter Panel - Mobile */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden mt-4"
              >
                <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setActiveGenre('all')
                      setShowFilters(false)
                    }}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                      activeGenre === 'all'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    All
                  </button>
                  {POETRY_GENRES.map((genre) => (
                    <button
                      key={genre.id}
                      onClick={() => {
                        setActiveGenre(genre.id)
                        setShowFilters(false)
                      }}
                      className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                        activeGenre === genre.id
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {genre.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-primary-600 to-amber-500 rounded-full" />
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{sortedPoems.length}</span> of{' '}
              <span className="font-semibold text-gray-900">{pagination.total || sortedPoems.length}</span> poems
            </p>
          </div>
          {(activeGenre !== 'all' || debouncedSearchQuery) && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors"
            >
              Clear all filters
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        {/* Poems Grid/List */}
        {sortedPoems.length === 0 && !isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl p-12 text-center border border-gray-100"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-2xl mb-6">
              <BookOpen className="h-10 w-10 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No poems found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {debouncedSearchQuery 
                ? `No poems matching "${debouncedSearchQuery}" found. Try a different search term.`
                : 'No poems available in this genre yet.'}
            </p>
            {(debouncedSearchQuery || activeGenre !== 'all') && (
              <button
                onClick={clearFilters}
                className="mt-6 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                Clear all filters
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </motion.div>
        ) : (
          <>
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
            }>
              {sortedPoems.map((poem, index) => (
                viewMode === 'grid' ? (
                  <motion.div
                    key={poem._id || poem.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.05, 0.3) }}
                    whileHover={{ y: -4 }}
                  >
                    <Link to={`/poem/${poem.slug}`} className="block group">
                      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                        <div className="relative h-32 bg-gradient-to-r from-primary-600 via-primary-500 to-amber-500 p-4">
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                          <div className="relative flex justify-between items-start">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-white text-xs font-medium capitalize">
                              {getGenreIcon(poem.genre)} {poem.genre || 'Poem'}
                            </span>
                            <button 
                              className="p-1.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                              onClick={(e) => e.preventDefault()}
                            >
                              <Bookmark className="h-4 w-4 text-white" />
                            </button>
                          </div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="font-bold text-white text-lg line-clamp-1 group-hover:translate-x-1 transition-transform">
                              {poem.title}
                            </h3>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          {poem.contentUrdu && (
                            <p className="urdu-text text-gray-700 text-sm line-clamp-3 mb-3" dir="rtl">
                              {poem.contentUrdu.split('\n')[0]}
                            </p>
                          )}
                          
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 bg-gradient-to-br from-primary-100 to-amber-100 rounded-full flex items-center justify-center">
                              <User className="h-3 w-3 text-primary-600" />
                            </div>
                            <span className="text-sm text-gray-600">
                              {typeof poem.author === 'object' ? poem.author?.name : poem.author || 'Unknown Author'}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1 text-gray-500">
                                <Heart className="h-4 w-4 text-red-400" />
                                <span className="text-xs">{poem.stats?.likes?.toLocaleString() || 0}</span>
                              </div>
                              <div className="flex items-center gap-1 text-gray-500">
                                <Eye className="h-4 w-4" />
                                <span className="text-xs">{poem.stats?.views?.toLocaleString() || 0}</span>
                              </div>
                            </div>
                            {poem.language && (
                              <span className="text-xs text-gray-400">
                                {poem.language === 'urdu' ? 'اردو' : 
                                 poem.language === 'hindi' ? 'हिंदी' : 
                                 poem.language === 'english' ? 'English' : poem.language}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    key={poem._id || poem.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: Math.min(index * 0.05, 0.3) }}
                  >
                    <Link to={`/poem/${poem.slug}`} className="block group">
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:bg-gray-50/50">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary-50 text-primary-700 rounded-lg text-xs font-medium capitalize">
                                {poem.genre || 'Poem'}
                              </span>
                              {poem.language && (
                                <span className="text-xs text-gray-400">
                                  {poem.language === 'urdu' ? 'اردو' : 
                                   poem.language === 'hindi' ? 'हिंदी' : 
                                   poem.language === 'english' ? 'English' : poem.language}
                                </span>
                              )}
                            </div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                              {poem.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {typeof poem.author === 'object' ? poem.author?.name : poem.author || 'Unknown Author'}
                            </p>
                            {poem.contentUrdu && (
                              <p className="urdu-text text-gray-600 text-sm mt-2 line-clamp-1" dir="rtl">
                                {poem.contentUrdu.split('\n')[0]}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-3 ml-4">
                            <div className="flex items-center gap-1">
                              <Heart className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{poem.stats?.likes?.toLocaleString() || 0}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{poem.stats?.views?.toLocaleString() || 0}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              ))}
            </div>

            {/* Pagination */}
            {(pagination.totalPages > 1 || Math.ceil(sortedPoems.length / itemsPerPage) > 1) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 mt-12"
              >
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: pagination.totalPages || Math.ceil(sortedPoems.length / itemsPerPage) }, (_, i) => i + 1)
                    .filter(page => {
                      const totalPages = pagination.totalPages || Math.ceil(sortedPoems.length / itemsPerPage)
                      if (totalPages <= 7) return true
                      if (page === 1 || page === totalPages) return true
                      if (page >= currentPage - 1 && page <= currentPage + 1) return true
                      return false
                    })
                    .map((page, index, array) => {
                      if (index > 0 && array[index - 1] !== page - 1) {
                        return (
                          <span key={`ellipsis-${page}`} className="px-3 py-2 text-gray-400">
                            ...
                          </span>
                        )
                      }
                      return (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`min-w-[40px] h-10 rounded-xl font-medium transition-all ${
                            currentPage === page
                              ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    })}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === (pagination.totalPages || Math.ceil(sortedPoems.length / itemsPerPage))}
                  className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </motion.div>
            )}

            {/* Loading indicator */}
            <AnimatePresence>
              {(isFetching || isLoading) && poems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center mt-8"
                >
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
                    <span className="text-sm text-gray-500">Loading more poems...</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  )
}

export default PoetryListPage