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






















// // client/src/pages/public/PoetryListPage.jsx
// import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
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
//   const [searchInputValue, setSearchInputValue] = useState('')
//   const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
//   const [sortBy, setSortBy] = useState('popular')
//   const [currentPage, setCurrentPage] = useState(1)
//   const [viewMode, setViewMode] = useState('grid')
//   const [showFilters, setShowFilters] = useState(false)
//   const itemsPerPage = 9
//   const searchInputRef = useRef(null)
//   const debounceTimerRef = useRef(null)
//   const isInitialMount = useRef(true)

//   // Fetch poems - separate query for initial load and search
//   const { data: response, isLoading, error, refetch, isFetching } = useQuery({
//     queryKey: ['poems', currentPage, activeGenre, sortBy, debouncedSearchQuery],
//     queryFn: () => poemAPI.getPoems({
//       page: currentPage,
//       limit: itemsPerPage,
//       genre: activeGenre !== 'all' ? activeGenre : undefined,
//       search: debouncedSearchQuery || undefined,
//       sort: sortBy
//     }),
//     enabled: true,
//     staleTime: 30000,
//     keepPreviousData: true,
//     refetchOnWindowFocus: false,
//     refetchOnReconnect: false,
//   })

//   // Extract poems and pagination from response
//   const poemsData = response?.data?.data || response?.data || response || []
//   const poems = useMemo(() => Array.isArray(poemsData) ? poemsData : [], [poemsData])
//   const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 }

//   // Debounce search - FIXED: Proper cleanup
//   const updateDebouncedSearch = useCallback((value) => {
//     // Clear existing timer
//     if (debounceTimerRef.current) {
//       clearTimeout(debounceTimerRef.current)
//     }
    
//     // Set new timer
//     debounceTimerRef.current = setTimeout(() => {
//       setDebouncedSearchQuery(value)
//       if (currentPage !== 1) {
//         setCurrentPage(1)
//       }
//     }, 500)
//   }, [currentPage])

//   // Handle search input change - NO re-render issues
//   const handleSearchChange = useCallback((e) => {
//     const value = e.target.value
//     setSearchInputValue(value)
//     updateDebouncedSearch(value)
//   }, [updateDebouncedSearch])

//   // Clear search
//   const clearSearch = useCallback(() => {
//     setSearchInputValue('')
//     setDebouncedSearchQuery('')
//     // Keep focus on input
//     if (searchInputRef.current) {
//       searchInputRef.current.focus()
//     }
//   }, [])

//   // Update URL when genre changes
//   useEffect(() => {
//     if (activeGenre && activeGenre !== 'all') {
//       setSearchParams({ genre: activeGenre })
//     } else {
//       setSearchParams({})
//     }
//     setCurrentPage(1)
//   }, [activeGenre, setSearchParams])

//   // Cleanup debounce on unmount
//   useEffect(() => {
//     return () => {
//       if (debounceTimerRef.current) {
//         clearTimeout(debounceTimerRef.current)
//       }
//     }
//   }, [])

//   // Handle page change
//   const goToPage = useCallback((page) => {
//     if (page >= 1 && page <= (pagination.totalPages || 1)) {
//       setCurrentPage(page)
//       window.scrollTo({ top: 0, behavior: 'smooth' })
//     }
//   }, [pagination.totalPages])

//   // Get sort options
//   const sortOptions = useMemo(() => [
//     { value: 'popular', label: 'Most Popular', icon: Flame },
//     { value: 'recent', label: 'Most Recent', icon: Clock },
//     { value: 'views', label: 'Most Viewed', icon: Eye },
//     { value: 'likes', label: 'Most Liked', icon: Heart }
//   ], [])

//   // Get sort function for client-side sorting
//   const sortedPoems = useMemo(() => {
//     if (!poems.length) return []
//     switch (sortBy) {
//       case 'recent':
//         return [...poems].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//       case 'views':
//         return [...poems].sort((a, b) => (b.stats?.views || 0) - (a.stats?.views || 0))
//       case 'likes':
//         return [...poems].sort((a, b) => (b.stats?.likes || 0) - (a.stats?.likes || 0))
//       default:
//         return poems
//     }
//   }, [poems, sortBy])

//   // Get genre icon
//   const getGenreIcon = useCallback((genreId) => {
//     const genre = POETRY_GENRES.find(g => g.id === genreId)
//     return genre?.icon || '📖'
//   }, [])

//   // Clear all filters
//   const clearFilters = useCallback(() => {
//     clearSearch()
//     setActiveGenre('all')
//     setCurrentPage(1)
//   }, [clearSearch])

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
//             {/* Search Input */}
//             <div className="flex-1 relative">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//               <input
//                 ref={searchInputRef}
//                 type="text"
//                 placeholder="Search poems by title, poet, or verse..."
//                 value={searchInputValue}
//                 onChange={handleSearchChange}
//                 className="w-full pl-12 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 transition-all"
//                 autoComplete="off"
//               />
//               {searchInputValue && (
//                 <button
//                   onClick={clearSearch}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                   type="button"
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
//                 {sortOptions.map(option => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </select>

//               <button
//                 onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
//                 className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
//               >
//                 {viewMode === 'grid' ? <List className="h-5 w-5 text-gray-600" /> : <Grid3x3 className="h-5 w-5 text-gray-600" />}
//               </button>

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
//             <div className="mt-3 px-3 py-2 bg-primary-50 rounded-lg">
//               <p className="text-sm text-primary-700">
//                 Searching for: <span className="font-semibold">"{debouncedSearchQuery}"</span>
//                 {!isFetching && !isLoading && (
//                   <span className="ml-2">
//                     ({pagination.total || poems.length} results found)
//                   </span>
//                 )}
//                 {(isFetching || isLoading) && (
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
//               className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors"
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
//                 className="mt-6 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
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
//                     transition={{ delay: Math.min(index * 0.05, 0.3) }}
//                     whileHover={{ y: -4 }}
//                   >
//                     <Link to={`/poem/${poem.slug}`} className="block group">
//                       <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
//                         <div className="relative h-32 bg-gradient-to-r from-primary-600 via-primary-500 to-amber-500 p-4">
//                           <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
//                           <div className="relative flex justify-between items-start">
//                             <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-white text-xs font-medium capitalize">
//                               {getGenreIcon(poem.genre)} {poem.genre || 'Poem'}
//                             </span>
//                             <button 
//                               className="p-1.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
//                               onClick={(e) => e.preventDefault()}
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
                        
//                         <div className="p-4">
//                           {poem.contentUrdu && (
//                             <p className="urdu-text text-gray-700 text-sm line-clamp-3 mb-3" dir="rtl">
//                               {poem.contentUrdu.split('\n')[0]}
//                             </p>
//                           )}
                          
//                           <div className="flex items-center gap-2 mb-3">
//                             <div className="w-6 h-6 bg-gradient-to-br from-primary-100 to-amber-100 rounded-full flex items-center justify-center">
//                               <User className="h-3 w-3 text-primary-600" />
//                             </div>
//                             <span className="text-sm text-gray-600">
//                               {typeof poem.author === 'object' ? poem.author?.name : poem.author || 'Unknown Author'}
//                             </span>
//                           </div>
                          
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
//                     transition={{ delay: Math.min(index * 0.05, 0.3) }}
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

//             {/* Pagination */}
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

//             {/* Loading indicator */}
//             <AnimatePresence>
//               {(isFetching || isLoading) && poems.length > 0 && (
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


















// // client/src/pages/public/PoetryListPage.jsx
// import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
// import { useTranslation } from 'react-i18next'
// import { useSearchParams, Link } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useQuery } from '@tanstack/react-query'
// import { 
//   Search, Filter, Heart, Eye, Bookmark, BookOpen, Loader2, 
//   ChevronLeft, ChevronRight, Sparkles, TrendingUp, Clock, 
//   Award, Star, Flame, Menu, X, Grid3x3, List, 
//   Calendar, User, Quote, Zap, Crown, ArrowRight,
//   Play, Mic, Headphones, Volume2, Languages
// } from 'lucide-react'
// import poemAPI from '../../api/poemAPI'
// import { POETRY_GENRES } from '../../utils/constants.js'

// const PoetryListPage = () => {
//   const { t } = useTranslation()
//   const [searchParams, setSearchParams] = useSearchParams()
//   const [activeGenre, setActiveGenre] = useState(searchParams.get('genre') || 'all')
//   const [searchInputValue, setSearchInputValue] = useState('')
//   const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
//   const [sortBy, setSortBy] = useState('popular')
//   const [currentPage, setCurrentPage] = useState(1)
//   const [viewMode, setViewMode] = useState('grid')
//   const [showFilters, setShowFilters] = useState(false)
//   const itemsPerPage = 9
//   const searchInputRef = useRef(null)
//   const debounceTimerRef = useRef(null)

//   // Fetch poems
//   const { data: response, isLoading, error, refetch, isFetching } = useQuery({
//     queryKey: ['poems', currentPage, activeGenre, sortBy, debouncedSearchQuery],
//     queryFn: () => poemAPI.getPoems({
//       page: currentPage,
//       limit: itemsPerPage,
//       genre: activeGenre !== 'all' ? activeGenre : undefined,
//       search: debouncedSearchQuery || undefined,
//       sort: sortBy
//     }),
//     enabled: true,
//     staleTime: 30000,
//     keepPreviousData: true,
//     refetchOnWindowFocus: false,
//     refetchOnReconnect: false,
//   })

//   // Extract poems and pagination
//   const poemsData = response?.data?.data || response?.data || response || []
//   const poems = useMemo(() => Array.isArray(poemsData) ? poemsData : [], [poemsData])
//   const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 }

//   // Debounce search
//   const updateDebouncedSearch = useCallback((value) => {
//     if (debounceTimerRef.current) {
//       clearTimeout(debounceTimerRef.current)
//     }
    
//     debounceTimerRef.current = setTimeout(() => {
//       setDebouncedSearchQuery(value)
//       if (currentPage !== 1) {
//         setCurrentPage(1)
//       }
//     }, 500)
//   }, [currentPage])

//   const handleSearchChange = useCallback((e) => {
//     const value = e.target.value
//     setSearchInputValue(value)
//     updateDebouncedSearch(value)
//   }, [updateDebouncedSearch])

//   const clearSearch = useCallback(() => {
//     setSearchInputValue('')
//     setDebouncedSearchQuery('')
//     if (searchInputRef.current) {
//       searchInputRef.current.focus()
//     }
//   }, [])

//   // Update URL when genre changes
//   useEffect(() => {
//     if (activeGenre && activeGenre !== 'all') {
//       setSearchParams({ genre: activeGenre })
//     } else {
//       setSearchParams({})
//     }
//     setCurrentPage(1)
//   }, [activeGenre, setSearchParams])

//   // Cleanup
//   useEffect(() => {
//     return () => {
//       if (debounceTimerRef.current) {
//         clearTimeout(debounceTimerRef.current)
//       }
//     }
//   }, [])

//   const goToPage = useCallback((page) => {
//     if (page >= 1 && page <= (pagination.totalPages || 1)) {
//       setCurrentPage(page)
//       window.scrollTo({ top: 0, behavior: 'smooth' })
//     }
//   }, [pagination.totalPages])

//   const sortOptions = useMemo(() => [
//     { value: 'popular', label: 'Most Popular', icon: Flame },
//     { value: 'recent', label: 'Most Recent', icon: Clock },
//     { value: 'views', label: 'Most Viewed', icon: Eye },
//     { value: 'likes', label: 'Most Liked', icon: Heart }
//   ], [])

//   // Get poem display content - 4 lines total
//   const getPoemDisplayContent = useCallback((poem) => {
//     // Get Urdu lines (2 lines)
//     let urduLines = []
//     if (poem.contentUrdu) {
//       urduLines = poem.contentUrdu.split('\n').filter(line => line.trim())
//     } else if (poem.content) {
//       urduLines = poem.content.split('\n').filter(line => line.trim())
//     }
    
//     // Get Hindi/Roman lines (2 lines)
//     let hindiLines = []
//     if (poem.contentHindi && poem.contentHindi !== poem.contentUrdu) {
//       hindiLines = poem.contentHindi.split('\n').filter(line => line.trim())
//     }
    
//     // Get transliteration/Roman lines if available
//     let romanLines = []
//     if (poem.transliteration) {
//       romanLines = poem.transliteration.split('\n').filter(line => line.trim())
//     }
    
//     // Determine second language content (prefer Hindi, then Roman, then English)
//     let secondLangLines = hindiLines.length > 0 ? hindiLines : romanLines
    
//     // If still no second language, use English content
//     if (secondLangLines.length === 0 && poem.translation?.english) {
//       secondLangLines = poem.translation.english.split('\n').filter(line => line.trim())
//     }
    
//     // Take first 2 lines from each
//     const firstTwoUrdu = urduLines.slice(0, 2)
//     const firstTwoSecondLang = secondLangLines.slice(0, 2)
    
//     // Determine second language type
//     let secondLangType = 'hindi'
//     if (hindiLines.length > 0) {
//       secondLangType = 'hindi'
//     } else if (romanLines.length > 0) {
//       secondLangType = 'roman'
//     } else if (poem.translation?.english) {
//       secondLangType = 'english'
//     }
    
//     return {
//       urduLines: firstTwoUrdu,
//       secondLangLines: firstTwoSecondLang,
//       secondLangType,
//       hasUrdu: firstTwoUrdu.length > 0,
//       hasSecondLang: firstTwoSecondLang.length > 0
//     }
//   }, [])

//   const sortedPoems = useMemo(() => {
//     if (!poems.length) return []
//     switch (sortBy) {
//       case 'recent':
//         return [...poems].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//       case 'views':
//         return [...poems].sort((a, b) => (b.stats?.views || 0) - (a.stats?.views || 0))
//       case 'likes':
//         return [...poems].sort((a, b) => (b.stats?.likes || 0) - (a.stats?.likes || 0))
//       default:
//         return poems
//     }
//   }, [poems, sortBy])

//   const getGenreIcon = useCallback((genreId) => {
//     const genre = POETRY_GENRES.find(g => g.id === genreId)
//     return genre?.icon || '📖'
//   }, [])

//   const getSecondLangLabel = useCallback((type) => {
//     switch(type) {
//       case 'hindi':
//         return { label: 'हिंदी', icon: '🇮🇳' }
//       case 'roman':
//         return { label: 'Roman', icon: '🔤' }
//       case 'english':
//         return { label: 'English', icon: '🇬🇧' }
//       default:
//         return { label: 'Translation', icon: '📝' }
//     }
//   }, [])

//   const clearFilters = useCallback(() => {
//     clearSearch()
//     setActiveGenre('all')
//     setCurrentPage(1)
//   }, [clearSearch])

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
//             <div className="flex-1 relative">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//               <input
//                 ref={searchInputRef}
//                 type="text"
//                 placeholder="Search poems by title, poet, or verse..."
//                 value={searchInputValue}
//                 onChange={handleSearchChange}
//                 className="w-full pl-12 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 transition-all"
//                 autoComplete="off"
//               />
//               {searchInputValue && (
//                 <button
//                   onClick={clearSearch}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                   type="button"
//                 >
//                   <X className="h-4 w-4" />
//                 </button>
//               )}
//             </div>

//             <div className="flex gap-2">
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 cursor-pointer"
//               >
//                 {sortOptions.map(option => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </select>

//               <button
//                 onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
//                 className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
//               >
//                 {viewMode === 'grid' ? <List className="h-5 w-5 text-gray-600" /> : <Grid3x3 className="h-5 w-5 text-gray-600" />}
//               </button>

//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="lg:hidden px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
//               >
//                 <Filter className="h-5 w-5 text-gray-600" />
//               </button>
//             </div>
//           </div>

//           {debouncedSearchQuery && (
//             <div className="mt-3 px-3 py-2 bg-primary-50 rounded-lg">
//               <p className="text-sm text-primary-700">
//                 Searching for: <span className="font-semibold">"{debouncedSearchQuery}"</span>
//                 {!isFetching && !isLoading && (
//                   <span className="ml-2">({pagination.total || poems.length} results found)</span>
//                 )}
//                 {(isFetching || isLoading) && (
//                   <span className="ml-2 inline-flex items-center gap-1">
//                     <Loader2 className="h-3 w-3 animate-spin" />
//                     Searching...
//                   </span>
//                 )}
//               </p>
//             </div>
//           )}

//           {/* Filter Chips */}
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

//           {/* Mobile Filter Panel */}
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
//               className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors"
//             >
//               Clear all filters
//               <X className="h-3 w-3" />
//             </button>
//           )}
//         </div>

//         {/* Poems Grid */}
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
//           </motion.div>
//         ) : (
//           <>
//             <div className={viewMode === 'grid' 
//               ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//               : "space-y-4"
//             }>
//               {sortedPoems.map((poem, index) => {
//                 const { urduLines, secondLangLines, secondLangType, hasUrdu, hasSecondLang } = getPoemDisplayContent(poem)
//                 const secondLangLabel = getSecondLangLabel(secondLangType)
                
//                 return viewMode === 'grid' ? (
//                   <motion.div
//                     key={poem._id || poem.id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: Math.min(index * 0.05, 0.3) }}
//                     whileHover={{ y: -4 }}
//                   >
//                     <Link to={`/poem/${poem.slug}`} className="block group">
//                       <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
//                         {/* Card Header */}
//                         <div className="relative h-28 bg-gradient-to-r from-primary-600 via-primary-500 to-amber-500 p-4">
//                           <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
//                           <div className="relative flex justify-between items-start">
//                             <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-white text-xs font-medium capitalize">
//                               {getGenreIcon(poem.genre)} {poem.genre || 'Poem'}
//                             </span>
//                             <button 
//                               className="p-1.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
//                               onClick={(e) => e.preventDefault()}
//                             >
//                               <Bookmark className="h-4 w-4 text-white" />
//                             </button>
//                           </div>
//                           <div className="absolute bottom-3 left-4 right-4">
//                             <h3 className="font-bold text-white text-base line-clamp-1 group-hover:translate-x-1 transition-transform">
//                               {poem.title}
//                             </h3>
//                           </div>
//                         </div>
                        
//                         {/* Card Body - 4 Lines Display (2 Urdu + 2 Translation) */}
//                         <div className="p-4 flex-1">
//                           {/* Urdu Lines (2 lines) */}
//                           {hasUrdu && (
//                             <div className="mb-3">
//                               <div className="flex items-center gap-1 mb-1">
//                                 <Languages className="h-3 w-3 text-gray-400" />
//                                 <span className="text-xs text-gray-400 uppercase">اردو</span>
//                               </div>
//                               <div className="space-y-1">
//                                 {urduLines.map((line, lineIdx) => (
//                                   <p 
//                                     key={`urdu-${lineIdx}`}
//                                     className="text-gray-700 text-sm line-clamp-1 leading-relaxed urdu-text text-right"
//                                     dir="rtl"
//                                   >
//                                     {line.length > 50 ? line.substring(0, 50) + '...' : line}
//                                   </p>
//                                 ))}
//                                 {/* If only 1 line, add placeholder empty line for consistent height */}
//                                 {urduLines.length === 1 && (
//                                   <p className="text-transparent text-sm">.</p>
//                                 )}
//                               </div>
//                             </div>
//                           )}
                          
//                           {/* Separator Line */}
//                           {hasUrdu && hasSecondLang && (
//                             <div className="border-t border-gray-100 my-2"></div>
//                           )}
                          
//                           {/* Second Language Lines (2 lines - Hindi/Roman/English) */}
//                           {hasSecondLang && (
//                             <div>
//                               <div className="flex items-center gap-1 mb-1">
//                                 <span className="text-xs">{secondLangLabel.icon}</span>
//                                 <span className="text-xs text-gray-400 uppercase">{secondLangLabel.label}</span>
//                               </div>
//                               <div className="space-y-1">
//                                 {secondLangLines.map((line, lineIdx) => (
//                                   <p 
//                                     key={`second-${lineIdx}`}
//                                     className="text-gray-600 text-sm line-clamp-1 leading-relaxed"
//                                   >
//                                     {line.length > 50 ? line.substring(0, 50) + '...' : line}
//                                   </p>
//                                 ))}
//                                 {/* If only 1 line, add placeholder empty line for consistent height */}
//                                 {secondLangLines.length === 1 && (
//                                   <p className="text-transparent text-sm">.</p>
//                                 )}
//                               </div>
//                             </div>
//                           )}
                          
//                           {/* Author */}
//                           <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-100">
//                             <div className="w-6 h-6 bg-gradient-to-br from-primary-100 to-amber-100 rounded-full flex items-center justify-center">
//                               <User className="h-3 w-3 text-primary-600" />
//                             </div>
//                             <span className="text-sm text-gray-600 truncate flex-1">
//                               {typeof poem.author === 'object' ? poem.author?.name : poem.author || 'Unknown Author'}
//                             </span>
//                           </div>
                          
//                           {/* Stats */}
//                           <div className="flex items-center justify-between pt-2">
//                             <div className="flex items-center gap-3">
//                               <div className="flex items-center gap-1 text-gray-500">
//                                 <Heart className="h-3.5 w-3.5 text-red-400" />
//                                 <span className="text-xs">{poem.stats?.likes?.toLocaleString() || 0}</span>
//                               </div>
//                               <div className="flex items-center gap-1 text-gray-500">
//                                 <Eye className="h-3.5 w-3.5" />
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
//                     transition={{ delay: Math.min(index * 0.05, 0.3) }}
//                   >
//                     <Link to={`/poem/${poem.slug}`} className="block group">
//                       <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:bg-gray-50/50">
//                         <div className="flex items-start justify-between">
//                           <div className="flex-1 min-w-0">
//                             <div className="flex items-center gap-2 mb-2 flex-wrap">
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
//                             <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors truncate">
//                               {poem.title}
//                             </h3>
//                             <p className="text-sm text-gray-500 mt-1">
//                               {typeof poem.author === 'object' ? poem.author?.name : poem.author || 'Unknown Author'}
//                             </p>
//                             {/* List view - show first line of Urdu and first line of translation */}
//                             {urduLines.length > 0 && (
//                               <p className="text-gray-600 text-sm mt-2 line-clamp-1 urdu-text" dir="rtl">
//                                 {urduLines[0]}
//                               </p>
//                             )}
//                             {secondLangLines.length > 0 && (
//                               <p className="text-gray-500 text-sm line-clamp-1">
//                                 {secondLangLines[0]}
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
//               })}
//             </div>

//             {/* Pagination */}
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
//                         return <span key={`ellipsis-${page}`} className="px-3 py-2 text-gray-400">...</span>
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

//             {/* Loading indicator */}
//             <AnimatePresence>
//               {(isFetching || isLoading) && poems.length > 0 && (
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



















// // client/src/pages/public/PoetryListPage.jsx
// import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
// import { useTranslation } from 'react-i18next'
// import { useSearchParams, Link } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useQuery } from '@tanstack/react-query'
// import { 
//   Search, Filter, Heart, Eye, Bookmark, BookOpen, Loader2, 
//   ChevronLeft, ChevronRight, Sparkles, Clock, 
//   X, Grid3x3, List, User, Languages
// } from 'lucide-react'
// import poemAPI from '../../api/poemAPI'
// import { POETRY_GENRES } from '../../utils/constants.js'

// const PoetryListPage = () => {
//   const { t, i18n } = useTranslation()
//   const [searchParams, setSearchParams] = useSearchParams()
//   const [activeGenre, setActiveGenre] = useState(searchParams.get('genre') || 'all')
//   const [searchInputValue, setSearchInputValue] = useState('')
//   const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
//   const [sortBy, setSortBy] = useState('popular')
//   const [currentPage, setCurrentPage] = useState(1)
//   const [viewMode, setViewMode] = useState('grid')
//   const [showFilters, setShowFilters] = useState(false)
//   const itemsPerPage = 12
//   const searchInputRef = useRef(null)
//   const debounceTimerRef = useRef(null)

//   const currentLang = i18n.language

//   // Fetch poems
//   const { data: response, isLoading, error, refetch, isFetching } = useQuery({
//     queryKey: ['poems', currentPage, activeGenre, sortBy, debouncedSearchQuery],
//     queryFn: () => poemAPI.getPoems({
//       page: currentPage,
//       limit: itemsPerPage,
//       genre: activeGenre !== 'all' ? activeGenre : undefined,
//       search: debouncedSearchQuery || undefined,
//       sort: sortBy
//     }),
//     enabled: true,
//     staleTime: 30000,
//     keepPreviousData: true,
//   })

//   // Extract poems and pagination
//   const poemsData = response?.data?.data || response?.data || response || []
//   const poemsList = useMemo(() => Array.isArray(poemsData) ? poemsData : [], [poemsData])
//   const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 }

//   // Sort poems based on selected sort option
//   const getSortedPoems = useCallback(() => {
//     if (!poemsList.length) return []
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
//   }, [poemsList, sortBy])

//   const sortedPoemsList = getSortedPoems()

//   // Debounce search
//   const updateDebouncedSearch = useCallback((value) => {
//     if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
//     debounceTimerRef.current = setTimeout(() => {
//       setDebouncedSearchQuery(value)
//       if (currentPage !== 1) setCurrentPage(1)
//     }, 500)
//   }, [currentPage])

//   const handleSearchChange = useCallback((e) => {
//     const value = e.target.value
//     setSearchInputValue(value)
//     updateDebouncedSearch(value)
//   }, [updateDebouncedSearch])

//   const clearSearch = useCallback(() => {
//     setSearchInputValue('')
//     setDebouncedSearchQuery('')
//     searchInputRef.current?.focus()
//   }, [])

//   useEffect(() => {
//     if (activeGenre && activeGenre !== 'all') {
//       setSearchParams({ genre: activeGenre })
//     } else {
//       setSearchParams({})
//     }
//     setCurrentPage(1)
//   }, [activeGenre, setSearchParams])

//   useEffect(() => {
//     return () => {
//       if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
//     }
//   }, [])

//   const goToPage = useCallback((page) => {
//     if (page >= 1 && page <= (pagination.totalPages || 1)) {
//       setCurrentPage(page)
//       window.scrollTo({ top: 0, behavior: 'smooth' })
//     }
//   }, [pagination.totalPages])

//   // Get poem display content based on current language
//   const getPoemDisplayContent = useCallback((poem) => {
//     const language = poem.language || 'urdu'
    
//     // Primary content (based on poem's original language)
//     let primaryLines = []
//     let primaryLangName = ''
    
//     if (language === 'urdu') {
//       primaryLines = poem.contentUrdu ? poem.contentUrdu.split('\n').filter(l => l.trim()) : []
//       if (primaryLines.length === 0 && poem.content) primaryLines = poem.content.split('\n').filter(l => l.trim())
//       primaryLangName = 'اردو'
//     } else if (language === 'hindi') {
//       primaryLines = poem.contentHindi ? poem.contentHindi.split('\n').filter(l => l.trim()) : []
//       if (primaryLines.length === 0 && poem.content) primaryLines = poem.content.split('\n').filter(l => l.trim())
//       primaryLangName = 'हिंदी'
//     } else {
//       primaryLines = poem.content ? poem.content.split('\n').filter(l => l.trim()) : []
//       primaryLangName = 'English'
//     }
    
//     // Translation/Secondary content (based on current UI language)
//     let secondaryLines = []
//     let secondaryLangName = ''
    
//     if (currentLang === 'ur' && language !== 'urdu') {
//       if (poem.contentUrdu) {
//         secondaryLines = poem.contentUrdu.split('\n').filter(l => l.trim())
//         secondaryLangName = 'اردو ترجمہ'
//       } else if (poem.transliteration) {
//         secondaryLines = poem.transliteration.split('\n').filter(l => l.trim())
//         secondaryLangName = 'رومن'
//       }
//     } else if (currentLang === 'hi' && language !== 'hindi') {
//       if (poem.contentHindi) {
//         secondaryLines = poem.contentHindi.split('\n').filter(l => l.trim())
//         secondaryLangName = 'हिंदी अनुवाद'
//       } else if (poem.translation?.hindi) {
//         secondaryLines = poem.translation.hindi.split('\n').filter(l => l.trim())
//         secondaryLangName = 'हिंदी अनुवाद'
//       }
//     } else if (currentLang === 'en' && language !== 'english') {
//       if (poem.translation?.english) {
//         secondaryLines = poem.translation.english.split('\n').filter(l => l.trim())
//         secondaryLangName = 'English Translation'
//       }
//     }
    
//     // Take first 2 lines from primary (for card preview)
//     const primaryPreview = primaryLines.slice(0, 2)
//     const secondaryPreview = secondaryLines.slice(0, 2)
    
//     return {
//       primaryLines: primaryPreview,
//       secondaryLines: secondaryPreview,
//       primaryLangName,
//       secondaryLangName,
//       hasPrimary: primaryPreview.length > 0,
//       hasSecondary: secondaryPreview.length > 0
//     }
//   }, [currentLang])

//   const getGenreIcon = useCallback((genreId) => {
//     const genre = POETRY_GENRES.find(g => g.id === genreId)
//     return genre?.icon || '📖'
//   }, [])

//   const clearFilters = useCallback(() => {
//     clearSearch()
//     setActiveGenre('all')
//     setCurrentPage(1)
//   }, [clearSearch])

//   // Loading state
//   if (isLoading && poemsList.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
//           <div className="flex items-center justify-center min-h-[60vh]">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-amber-500 rounded-2xl animate-pulse mx-auto mb-4 flex items-center justify-center">
//                 <BookOpen className="h-8 w-8 text-white" />
//               </div>
//               <p className="text-gray-600">Loading poems...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
//       {/* Hero Section */}
//       <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-primary-500 to-amber-500 pt-20 pb-12">
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
//             <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
//               Poetry Collection
//             </h1>
//             <p className="text-white/80 max-w-2xl mx-auto">
//               Explore ghazals, nazms, sher, and more from legendary poets across generations
//             </p>
//           </motion.div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
//         {/* Search & Filters Bar */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 mb-6"
//         >
//           <div className="flex flex-col lg:flex-row gap-3">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <input
//                 ref={searchInputRef}
//                 type="text"
//                 placeholder="Search poems by title, poet, or verse..."
//                 value={searchInputValue}
//                 onChange={handleSearchChange}
//                 className="w-full pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50"
//                 autoComplete="off"
//               />
//               {searchInputValue && (
//                 <button onClick={clearSearch} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
//                   <X className="h-3 w-3" />
//                 </button>
//               )}
//             </div>

//             <div className="flex gap-2">
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50/50 cursor-pointer"
//               >
//                 <option value="popular">Most Popular</option>
//                 <option value="recent">Most Recent</option>
//                 <option value="views">Most Viewed</option>
//                 <option value="likes">Most Liked</option>
//               </select>

//               <button
//                 onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
//                 className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
//               >
//                 {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid3x3 className="h-4 w-4" />}
//               </button>

//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="lg:hidden px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
//               >
//                 <Filter className="h-4 w-4" />
//               </button>
//             </div>
//           </div>

//           {/* Genre Filters */}
//           <div className="hidden lg:flex overflow-x-auto gap-1.5 mt-3 pt-2 border-t border-gray-100">
//             <button
//               onClick={() => setActiveGenre('all')}
//               className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
//                 activeGenre === 'all'
//                   ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white'
//                   : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//               }`}
//             >
//               All Genres
//             </button>
//             {POETRY_GENRES.map((genre) => (
//               <button
//                 key={genre.id}
//                 onClick={() => setActiveGenre(genre.id)}
//                 className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
//                   activeGenre === genre.id
//                     ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white'
//                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                 }`}
//               >
//                 <span className="mr-1">{getGenreIcon(genre.id)}</span>
//                 {genre.label}
//               </button>
//             ))}
//           </div>

//           {/* Mobile Filters */}
//           <AnimatePresence>
//             {showFilters && (
//               <motion.div
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: 'auto', opacity: 1 }}
//                 exit={{ height: 0, opacity: 0 }}
//                 className="lg:hidden overflow-hidden mt-3"
//               >
//                 <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100">
//                   <button
//                     onClick={() => { setActiveGenre('all'); setShowFilters(false) }}
//                     className={`px-3 py-1 rounded-full text-xs ${
//                       activeGenre === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'
//                     }`}
//                   >
//                     All Genres
//                   </button>
//                   {POETRY_GENRES.map((genre) => (
//                     <button
//                       key={genre.id}
//                       onClick={() => { setActiveGenre(genre.id); setShowFilters(false) }}
//                       className={`px-3 py-1 rounded-full text-xs ${
//                         activeGenre === genre.id ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'
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

//         {/* Results Count */}
//         <div className="flex justify-between items-center mb-4">
//           <p className="text-xs text-gray-500">
//             Showing <span className="font-semibold text-gray-700">{sortedPoemsList.length}</span> of{' '}
//             <span className="font-semibold text-gray-700">{pagination.total || sortedPoemsList.length}</span> poems
//           </p>
//           {(activeGenre !== 'all' || debouncedSearchQuery) && (
//             <button onClick={clearFilters} className="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1">
//               Clear filters
//               <X className="h-3 w-3" />
//             </button>
//           )}
//         </div>

//         {/* Poems Grid */}
//         {sortedPoemsList.length === 0 && !isLoading ? (
//           <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
//             <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//             <h3 className="text-lg font-semibold text-gray-900 mb-1">No poems found</h3>
//             <p className="text-sm text-gray-500">Try a different search term</p>
//           </div>
//         ) : (
//           <>
//             <div className={viewMode === 'grid' 
//               ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
//               : "space-y-3"
//             }>
//               {sortedPoemsList.map((poem, index) => {
//                 const { primaryLines, secondaryLines, primaryLangName, secondaryLangName, hasPrimary, hasSecondary } = getPoemDisplayContent(poem)
                
//                 return viewMode === 'grid' ? (
//                   <motion.div
//                     key={poem._id || poem.id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: Math.min(index * 0.03, 0.3) }}
//                     whileHover={{ y: -2 }}
//                   >
//                     <Link to={`/poem/${poem.slug}`} className="block group">
//                       <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all h-full flex flex-col">
//                         {/* Card Header - Compact */}
//                         <div className="relative h-14 bg-gradient-to-r from-primary-600 via-primary-500 to-amber-500 px-3 py-2">
//                           <div className="flex justify-between items-start">
//                             <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded text-white text-xs capitalize">
//                               {getGenreIcon(poem.genre)} {poem.genre}
//                             </span>
//                             <button 
//                               className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
//                               onClick={(e) => e.preventDefault()}
//                             >
//                               <Bookmark className="h-3 w-3 text-white" />
//                             </button>
//                           </div>
//                           {/* Title - Single line only */}
//                           <h3 className="font-semibold text-white text-sm mt-1 truncate">
//                             {poem.title}
//                           </h3>
//                         </div>
                        
//                         {/* Card Body - Content focused */}
//                         <div className="p-3 flex-1">
//                           {/* Primary Language Lines (2 lines) */}
//                           {hasPrimary && (
//                             <div className="mb-2">
//                               <div className="flex items-center gap-1 mb-0.5">
//                                 <Languages className="h-2.5 w-2.5 text-gray-400" />
//                                 <span className="text-[10px] text-gray-400">{primaryLangName}</span>
//                               </div>
//                               <div className="space-y-0.5">
//                                 {primaryLines.slice(0, 2).map((line, lineIdx) => (
//                                   <p 
//                                     key={`primary-${lineIdx}`}
//                                     className={`text-gray-700 text-xs line-clamp-1 leading-relaxed ${poem.language === 'urdu' ? 'urdu-text text-right' : ''}`}
//                                     dir={poem.language === 'urdu' ? 'rtl' : 'ltr'}
//                                   >
//                                     {line.length > 45 ? line.substring(0, 45) + '...' : line}
//                                   </p>
//                                 ))}
//                               </div>
//                             </div>
//                           )}
                          
//                           {/* Secondary Language Lines (if available) */}
//                           {hasSecondary && (
//                             <>
//                               <div className="border-t border-gray-100 my-1.5"></div>
//                               <div>
//                                 <div className="flex items-center gap-1 mb-0.5">
//                                   <span className="text-[10px] text-gray-400">{secondaryLangName}</span>
//                                 </div>
//                                 <div className="space-y-0.5">
//                                   {secondaryLines.slice(0, 1).map((line, lineIdx) => (
//                                     <p key={`secondary-${lineIdx}`} className="text-gray-500 text-xs line-clamp-1">
//                                       {line.length > 45 ? line.substring(0, 45) + '...' : line}
//                                     </p>
//                                   ))}
//                                 </div>
//                               </div>
//                             </>
//                           )}
                          
//                           {/* Author */}
//                           <div className="flex items-center gap-1.5 mt-2 pt-1.5 border-t border-gray-100">
//                             <div className="w-5 h-5 bg-gradient-to-br from-primary-100 to-amber-100 rounded-full flex items-center justify-center">
//                               <User className="h-2.5 w-2.5 text-primary-600" />
//                             </div>
//                             <span className="text-xs text-gray-500 truncate flex-1">
//                               {typeof poem.author === 'object' ? poem.author?.name : poem.author || 'Unknown'}
//                             </span>
//                           </div>
                          
//                           {/* Stats - Small badges at bottom */}
//                           <div className="flex items-center justify-end gap-2 mt-2 pt-1">
//                             <div className="flex items-center gap-1">
//                               <Heart className="h-3 w-3 text-red-400" />
//                               <span className="text-[10px] text-gray-500">{poem.stats?.likes?.toLocaleString() || 0}</span>
//                             </div>
//                             <div className="flex items-center gap-1">
//                               <Eye className="h-3 w-3 text-gray-400" />
//                               <span className="text-[10px] text-gray-500">{poem.stats?.views?.toLocaleString() || 0}</span>
//                             </div>
//                             {poem.language && (
//                               <span className="text-[10px] text-gray-400">
//                                 {poem.language === 'urdu' ? 'اردو' : 
//                                  poem.language === 'hindi' ? 'हिंदी' : 'EN'}
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   </motion.div>
//                 ) : (
//                   // List View
//                   <motion.div
//                     key={poem._id || poem.id}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: Math.min(index * 0.03, 0.3) }}
//                   >
//                     <Link to={`/poem/${poem.slug}`} className="block group">
//                       <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-all">
//                         <div className="flex items-start justify-between">
//                           <div className="flex-1 min-w-0">
//                             <div className="flex items-center gap-2 mb-1 flex-wrap">
//                               <span className="text-xs text-gray-400 capitalize">{poem.genre}</span>
//                               {poem.language && (
//                                 <span className="text-xs text-gray-400">
//                                   {poem.language === 'urdu' ? 'اردو' : 
//                                    poem.language === 'hindi' ? 'हिंदी' : 'EN'}
//                                 </span>
//                               )}
//                             </div>
//                             <h3 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors truncate text-sm">
//                               {poem.title}
//                             </h3>
//                             <p className="text-xs text-gray-500">
//                               {typeof poem.author === 'object' ? poem.author?.name : poem.author || 'Unknown'}
//                             </p>
//                             {primaryLines.length > 0 && (
//                               <p className={`text-gray-600 text-xs mt-1 line-clamp-1 ${poem.language === 'urdu' ? 'urdu-text' : ''}`}>
//                                 {primaryLines[0]}
//                               </p>
//                             )}
//                           </div>
//                           <div className="flex items-center gap-3 ml-3">
//                             <div className="flex items-center gap-0.5">
//                               <Heart className="h-3 w-3 text-gray-400" />
//                               <span className="text-xs text-gray-500">{poem.stats?.likes || 0}</span>
//                             </div>
//                             <div className="flex items-center gap-0.5">
//                               <Eye className="h-3 w-3 text-gray-400" />
//                               <span className="text-xs text-gray-500">{poem.stats?.views || 0}</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   </motion.div>
//                 )
//               })}
//             </div>

//             {/* Pagination */}
//             {pagination.totalPages > 1 && (
//               <div className="flex items-center justify-center gap-1 mt-8">
//                 <button
//                   onClick={() => goToPage(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <ChevronLeft className="h-4 w-4" />
//                 </button>
                
//                 <div className="flex items-center gap-1">
//                   {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
//                     let pageNum
//                     if (pagination.totalPages <= 5) {
//                       pageNum = i + 1
//                     } else if (currentPage <= 3) {
//                       pageNum = i + 1
//                     } else if (currentPage >= pagination.totalPages - 2) {
//                       pageNum = pagination.totalPages - 4 + i
//                     } else {
//                       pageNum = currentPage - 2 + i
//                     }
//                     return (
//                       <button
//                         key={pageNum}
//                         onClick={() => goToPage(pageNum)}
//                         className={`min-w-[32px] h-8 rounded-lg text-sm font-medium transition-all ${
//                           currentPage === pageNum
//                             ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white'
//                             : 'text-gray-600 hover:bg-gray-100'
//                         }`}
//                       >
//                         {pageNum}
//                       </button>
//                     )
//                   })}
//                 </div>

//                 <button
//                   onClick={() => goToPage(currentPage + 1)}
//                   disabled={currentPage === pagination.totalPages}
//                   className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <ChevronRight className="h-4 w-4" />
//                 </button>
//               </div>
//             )}

//             {/* Loading indicator */}
//             {(isFetching || isLoading) && poemsList.length > 0 && (
//               <div className="flex justify-center mt-6">
//                 <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   )
// }

// export default PoetryListPage




















// // working client/src/pages/public/PoetryListPage.jsx
// import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
// import { useTranslation } from 'react-i18next'
// import { useSearchParams, Link } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useQuery } from '@tanstack/react-query'
// import { 
//   Search, Filter, Heart, Eye, Bookmark, BookOpen, Loader2, 
//   ChevronLeft, ChevronRight, Sparkles, Clock, 
//   X, Grid3x3, List, User, Languages, Mic
// } from 'lucide-react'
// import poemAPI from '../../api/poemAPI'
// import { POETRY_GENRES } from '../../utils/constants.js'

// // Voice Search Component
// const VoiceSearchButton = ({ onResult, language = 'ur-PK', className = '' }) => {
//   const [isListening, setIsListening] = useState(false)
//   const [supportMessage, setSupportMessage] = useState('')
//   const recognitionRef = useRef(null)

//   useEffect(() => {
//     // Check for browser support
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
//     if (!SpeechRecognition) {
//       setSupportMessage('Voice search not supported in this browser')
//       return
//     }

//     recognitionRef.current = new SpeechRecognition()
//     recognitionRef.current.continuous = false
//     recognitionRef.current.interimResults = false
//     recognitionRef.current.lang = language

//     recognitionRef.current.onstart = () => {
//       setIsListening(true)
//     }

//     recognitionRef.current.onend = () => {
//       setIsListening(false)
//     }

//     recognitionRef.current.onresult = (event) => {
//       const transcript = event.results[0][0].transcript
//       if (onResult) {
//         onResult(transcript)
//       }
//     }

//     recognitionRef.current.onerror = (event) => {
//       console.error('Speech recognition error:', event.error)
//       setIsListening(false)
//       if (event.error === 'not-allowed') {
//         setSupportMessage('Microphone permission denied')
//       }
//     }

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.abort()
//       }
//     }
//   }, [language, onResult])

//   const toggleListening = () => {
//     if (!recognitionRef.current) {
//       alert('Voice search is not supported in your browser. Please use Chrome, Edge, or Safari.')
//       return
//     }

//     if (isListening) {
//       recognitionRef.current.stop()
//     } else {
//       try {
//         recognitionRef.current.start()
//       } catch (error) {
//         console.error('Failed to start recognition:', error)
//       }
//     }
//   }

//   return (
//     <button
//       type="button"
//       onClick={toggleListening}
//       className={`relative ${className} transition-all duration-200 ${
//         isListening 
//           ? 'bg-red-500 text-white ring-2 ring-red-300 animate-pulse' 
//           : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//       }`}
//       title={isListening ? 'Listening...' : 'Voice Search'}
//     >
//       <Mic className={`h-4 w-4 ${isListening ? 'animate-pulse' : ''}`} />
//       {isListening && (
//         <span className="absolute -top-1 -right-1 flex h-3 w-3">
//           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//           <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
//         </span>
//       )}
//     </button>
//   )
// }

// const PoetryListPage = () => {
//   const { t, i18n } = useTranslation()
//   const [searchParams, setSearchParams] = useSearchParams()
//   const [activeGenre, setActiveGenre] = useState(searchParams.get('genre') || 'all')
//   const [searchInputValue, setSearchInputValue] = useState('')
//   const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
//   const [sortBy, setSortBy] = useState('popular')
//   const [currentPage, setCurrentPage] = useState(1)
//   const [viewMode, setViewMode] = useState('grid')
//   const [showFilters, setShowFilters] = useState(false)
//   const itemsPerPage = 12
//   const searchInputRef = useRef(null)
//   const debounceTimerRef = useRef(null)

//   const currentLang = i18n.language

//   // Voice search handler
//   const handleVoiceResult = useCallback((transcript) => {
//     setSearchInputValue(transcript)
//     updateDebouncedSearch(transcript)
//     // Flash effect to show voice input was received
//     if (searchInputRef.current) {
//       searchInputRef.current.classList.add('ring-2', 'ring-green-400')
//       setTimeout(() => {
//         searchInputRef.current?.classList.remove('ring-2', 'ring-green-400')
//       }, 1000)
//     }
//   }, [])

//   // Fetch poems
//   const { data: response, isLoading, error, refetch, isFetching } = useQuery({
//     queryKey: ['poems', currentPage, activeGenre, sortBy, debouncedSearchQuery],
//     queryFn: () => poemAPI.getPoems({
//       page: currentPage,
//       limit: itemsPerPage,
//       genre: activeGenre !== 'all' ? activeGenre : undefined,
//       search: debouncedSearchQuery || undefined,
//       sort: sortBy
//     }),
//     enabled: true,
//     staleTime: 30000,
//     keepPreviousData: true,
//   })

//   // Extract poems and pagination
//   const poemsData = response?.data?.data || response?.data || response || []
//   const poemsList = useMemo(() => Array.isArray(poemsData) ? poemsData : [], [poemsData])
//   const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 }

//   // Sort poems based on selected sort option
//   const getSortedPoems = useCallback(() => {
//     if (!poemsList.length) return []
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
//   }, [poemsList, sortBy])

//   const sortedPoemsList = getSortedPoems()

//   // Debounce search
//   const updateDebouncedSearch = useCallback((value) => {
//     if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
//     debounceTimerRef.current = setTimeout(() => {
//       setDebouncedSearchQuery(value)
//       if (currentPage !== 1) setCurrentPage(1)
//     }, 500)
//   }, [currentPage])

//   const handleSearchChange = useCallback((e) => {
//     const value = e.target.value
//     setSearchInputValue(value)
//     updateDebouncedSearch(value)
//   }, [updateDebouncedSearch])

//   const clearSearch = useCallback(() => {
//     setSearchInputValue('')
//     setDebouncedSearchQuery('')
//     searchInputRef.current?.focus()
//   }, [])

//   useEffect(() => {
//     if (activeGenre && activeGenre !== 'all') {
//       setSearchParams({ genre: activeGenre })
//     } else {
//       setSearchParams({})
//     }
//     setCurrentPage(1)
//   }, [activeGenre, setSearchParams])

//   useEffect(() => {
//     return () => {
//       if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
//     }
//   }, [])

//   const goToPage = useCallback((page) => {
//     if (page >= 1 && page <= (pagination.totalPages || 1)) {
//       setCurrentPage(page)
//       window.scrollTo({ top: 0, behavior: 'smooth' })
//     }
//   }, [pagination.totalPages])

//   // Get poem display content based on current language
//   const getPoemDisplayContent = useCallback((poem) => {
//     const language = poem.language || 'urdu'
    
//     // Primary content (based on poem's original language)
//     let primaryLines = []
//     let primaryLangName = ''
    
//     if (language === 'urdu') {
//       primaryLines = poem.contentUrdu ? poem.contentUrdu.split('\n').filter(l => l.trim()) : []
//       if (primaryLines.length === 0 && poem.content) primaryLines = poem.content.split('\n').filter(l => l.trim())
//       primaryLangName = 'اردو'
//     } else if (language === 'hindi') {
//       primaryLines = poem.contentHindi ? poem.contentHindi.split('\n').filter(l => l.trim()) : []
//       if (primaryLines.length === 0 && poem.content) primaryLines = poem.content.split('\n').filter(l => l.trim())
//       primaryLangName = 'हिंदी'
//     } else {
//       primaryLines = poem.content ? poem.content.split('\n').filter(l => l.trim()) : []
//       primaryLangName = 'English'
//     }
    
//     // Translation/Secondary content (based on current UI language)
//     let secondaryLines = []
//     let secondaryLangName = ''
    
//     if (currentLang === 'ur' && language !== 'urdu') {
//       if (poem.contentUrdu) {
//         secondaryLines = poem.contentUrdu.split('\n').filter(l => l.trim())
//         secondaryLangName = 'اردو ترجمہ'
//       } else if (poem.transliteration) {
//         secondaryLines = poem.transliteration.split('\n').filter(l => l.trim())
//         secondaryLangName = 'رومن'
//       }
//     } else if (currentLang === 'hi' && language !== 'hindi') {
//       if (poem.contentHindi) {
//         secondaryLines = poem.contentHindi.split('\n').filter(l => l.trim())
//         secondaryLangName = 'हिंदी अनुवाद'
//       } else if (poem.translation?.hindi) {
//         secondaryLines = poem.translation.hindi.split('\n').filter(l => l.trim())
//         secondaryLangName = 'हिंदी अनुवाद'
//       }
//     } else if (currentLang === 'en' && language !== 'english') {
//       if (poem.translation?.english) {
//         secondaryLines = poem.translation.english.split('\n').filter(l => l.trim())
//         secondaryLangName = 'English Translation'
//       }
//     }
    
//     // Take first 2 lines from primary (for card preview)
//     const primaryPreview = primaryLines.slice(0, 2)
//     const secondaryPreview = secondaryLines.slice(0, 2)
    
//     return {
//       primaryLines: primaryPreview,
//       secondaryLines: secondaryPreview,
//       primaryLangName,
//       secondaryLangName,
//       hasPrimary: primaryPreview.length > 0,
//       hasSecondary: secondaryPreview.length > 0
//     }
//   }, [currentLang])

//   const getGenreIcon = useCallback((genreId) => {
//     const genre = POETRY_GENRES.find(g => g.id === genreId)
//     return genre?.icon || '📖'
//   }, [])

//   const clearFilters = useCallback(() => {
//     clearSearch()
//     setActiveGenre('all')
//     setCurrentPage(1)
//   }, [clearSearch])

//   // Get voice search language based on current UI language
//   const getVoiceLanguage = useCallback(() => {
//     switch (currentLang) {
//       case 'ur': return 'ur-PK'
//       case 'hi': return 'hi-IN'
//       default: return 'en-US'
//     }
//   }, [currentLang])

//   // Loading state
//   if (isLoading && poemsList.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
//           <div className="flex items-center justify-center min-h-[60vh]">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-amber-500 rounded-2xl animate-pulse mx-auto mb-4 flex items-center justify-center">
//                 <BookOpen className="h-8 w-8 text-white" />
//               </div>
//               <p className="text-gray-600">Loading poems...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
//       {/* Hero Section */}
//       <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-primary-500 to-amber-500 pt-20 pb-12">
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
//             <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
//               Poetry Collection
//             </h1>
//             <p className="text-white/80 max-w-2xl mx-auto">
//               Explore ghazals, nazms, sher, and more from legendary poets across generations
//             </p>
//           </motion.div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 pb-12">
//         {/* Search & Filters Bar */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 mb-6"
//         >
//           <div className="flex flex-col lg:flex-row gap-3">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <input
//                 ref={searchInputRef}
//                 type="text"
//                 placeholder="Search poems by title, poet, or verse..."
//                 value={searchInputValue}
//                 onChange={handleSearchChange}
//                 className="w-full pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 transition-all"
//                 autoComplete="off"
//               />
//               {searchInputValue && (
//                 <button onClick={clearSearch} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
//                   <X className="h-3 w-3" />
//                 </button>
//               )}
//             </div>

//             <div className="flex gap-2">
//               {/* Voice Search Button */}
//               <VoiceSearchButton 
//                 onResult={handleVoiceResult}
//                 language={getVoiceLanguage()}
//                 className="px-3 py-2 rounded-lg transition-all"
//               />

//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50/50 cursor-pointer"
//               >
//                 <option value="popular">Most Popular</option>
//                 <option value="recent">Most Recent</option>
//                 <option value="views">Most Viewed</option>
//                 <option value="likes">Most Liked</option>
//               </select>

//               <button
//                 onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
//                 className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
//               >
//                 {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid3x3 className="h-4 w-4" />}
//               </button>

//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="lg:hidden px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
//               >
//                 <Filter className="h-4 w-4" />
//               </button>
//             </div>
//           </div>

//           {/* Genre Filters */}
//           <div className="hidden lg:flex overflow-x-auto gap-1.5 mt-3 pt-2 border-t border-gray-100">
//             <button
//               onClick={() => setActiveGenre('all')}
//               className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
//                 activeGenre === 'all'
//                   ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white'
//                   : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//               }`}
//             >
//               All Genres
//             </button>
//             {POETRY_GENRES.map((genre) => (
//               <button
//                 key={genre.id}
//                 onClick={() => setActiveGenre(genre.id)}
//                 className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
//                   activeGenre === genre.id
//                     ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white'
//                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                 }`}
//               >
//                 <span className="mr-1">{getGenreIcon(genre.id)}</span>
//                 {genre.label}
//               </button>
//             ))}
//           </div>

//           {/* Mobile Filters */}
//           <AnimatePresence>
//             {showFilters && (
//               <motion.div
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: 'auto', opacity: 1 }}
//                 exit={{ height: 0, opacity: 0 }}
//                 className="lg:hidden overflow-hidden mt-3"
//               >
//                 <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100">
//                   <button
//                     onClick={() => { setActiveGenre('all'); setShowFilters(false) }}
//                     className={`px-3 py-1 rounded-full text-xs ${
//                       activeGenre === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'
//                     }`}
//                   >
//                     All Genres
//                   </button>
//                   {POETRY_GENRES.map((genre) => (
//                     <button
//                       key={genre.id}
//                       onClick={() => { setActiveGenre(genre.id); setShowFilters(false) }}
//                       className={`px-3 py-1 rounded-full text-xs ${
//                         activeGenre === genre.id ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'
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

//         {/* Results Count */}
//         <div className="flex justify-between items-center mb-4">
//           <p className="text-xs text-gray-500">
//             Showing <span className="font-semibold text-gray-700">{sortedPoemsList.length}</span> of{' '}
//             <span className="font-semibold text-gray-700">{pagination.total || sortedPoemsList.length}</span> poems
//           </p>
//           {(activeGenre !== 'all' || debouncedSearchQuery) && (
//             <button onClick={clearFilters} className="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1">
//               Clear filters
//               <X className="h-3 w-3" />
//             </button>
//           )}
//         </div>

//         {/* Poems Grid */}
//         {sortedPoemsList.length === 0 && !isLoading ? (
//           <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
//             <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//             <h3 className="text-lg font-semibold text-gray-900 mb-1">No poems found</h3>
//             <p className="text-sm text-gray-500">Try a different search term</p>
//           </div>
//         ) : (
//           <>
//             <div className={viewMode === 'grid' 
//               ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
//               : "space-y-3"
//             }>
//               {sortedPoemsList.map((poem, index) => {
//                 const { primaryLines, secondaryLines, primaryLangName, secondaryLangName, hasPrimary, hasSecondary } = getPoemDisplayContent(poem)
                
//                 return viewMode === 'grid' ? (
//                   <motion.div
//                     key={poem._id || poem.id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: Math.min(index * 0.03, 0.3) }}
//                     whileHover={{ y: -2 }}
//                   >
//                     <Link to={`/poem/${poem.slug}`} className="block group">
//                       <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all h-full flex flex-col">
//                         {/* Card Header - Compact */}
//                         <div className="relative h-14 bg-gradient-to-r from-primary-600 via-primary-500 to-amber-500 px-3 py-2">
//                           <div className="flex justify-between items-start">
//                             <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded text-white text-xs capitalize">
//                               {getGenreIcon(poem.genre)} {poem.genre}
//                             </span>
//                             <button 
//                               className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
//                               onClick={(e) => e.preventDefault()}
//                             >
//                               <Bookmark className="h-3 w-3 text-white" />
//                             </button>
//                           </div>
//                           {/* Title - Single line only */}
//                           <h3 className="font-semibold text-white text-sm mt-1 truncate">
//                             {poem.title}
//                           </h3>
//                         </div>
                        
//                         {/* Card Body - Content focused */}
//                         <div className="p-3 flex-1">
//                           {/* Primary Language Lines (2 lines) */}
//                           {hasPrimary && (
//                             <div className="mb-2">
//                               <div className="flex items-center gap-1 mb-0.5">
//                                 <Languages className="h-2.5 w-2.5 text-gray-400" />
//                                 <span className="text-[10px] text-gray-400">{primaryLangName}</span>
//                               </div>
//                               <div className="space-y-0.5">
//                                 {primaryLines.slice(0, 2).map((line, lineIdx) => (
//                                   <p 
//                                     key={`primary-${lineIdx}`}
//                                     className={`text-gray-700 text-xs line-clamp-1 leading-relaxed ${poem.language === 'urdu' ? 'urdu-text text-right' : ''}`}
//                                     dir={poem.language === 'urdu' ? 'rtl' : 'ltr'}
//                                   >
//                                     {line.length > 45 ? line.substring(0, 45) + '...' : line}
//                                   </p>
//                                 ))}
//                               </div>
//                             </div>
//                           )}
                          
//                           {/* Secondary Language Lines (if available) */}
//                           {hasSecondary && (
//                             <>
//                               <div className="border-t border-gray-100 my-1.5"></div>
//                               <div>
//                                 <div className="flex items-center gap-1 mb-0.5">
//                                   <span className="text-[10px] text-gray-400">{secondaryLangName}</span>
//                                 </div>
//                                 <div className="space-y-0.5">
//                                   {secondaryLines.slice(0, 1).map((line, lineIdx) => (
//                                     <p key={`secondary-${lineIdx}`} className="text-gray-500 text-xs line-clamp-1">
//                                       {line.length > 45 ? line.substring(0, 45) + '...' : line}
//                                     </p>
//                                   ))}
//                                 </div>
//                               </div>
//                             </>
//                           )}
                          
//                           {/* Author */}
//                           <div className="flex items-center gap-1.5 mt-2 pt-1.5 border-t border-gray-100">
//                             <div className="w-5 h-5 bg-gradient-to-br from-primary-100 to-amber-100 rounded-full flex items-center justify-center">
//                               <User className="h-2.5 w-2.5 text-primary-600" />
//                             </div>
//                             <span className="text-xs text-gray-500 truncate flex-1">
//                               {typeof poem.author === 'object' ? poem.author?.name : poem.author || 'Unknown'}
//                             </span>
//                           </div>
                          
//                           {/* Stats - Small badges at bottom */}
//                           <div className="flex items-center justify-end gap-2 mt-2 pt-1">
//                             <div className="flex items-center gap-1">
//                               <Heart className="h-3 w-3 text-red-400" />
//                               <span className="text-[10px] text-gray-500">{poem.stats?.likes?.toLocaleString() || 0}</span>
//                             </div>
//                             <div className="flex items-center gap-1">
//                               <Eye className="h-3 w-3 text-gray-400" />
//                               <span className="text-[10px] text-gray-500">{poem.stats?.views?.toLocaleString() || 0}</span>
//                             </div>
//                             {poem.language && (
//                               <span className="text-[10px] text-gray-400">
//                                 {poem.language === 'urdu' ? 'اردو' : 
//                                  poem.language === 'hindi' ? 'हिंदी' : 'EN'}
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   </motion.div>
//                 ) : (
//                   // List View
//                   <motion.div
//                     key={poem._id || poem.id}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: Math.min(index * 0.03, 0.3) }}
//                   >
//                     <Link to={`/poem/${poem.slug}`} className="block group">
//                       <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-all">
//                         <div className="flex items-start justify-between">
//                           <div className="flex-1 min-w-0">
//                             <div className="flex items-center gap-2 mb-1 flex-wrap">
//                               <span className="text-xs text-gray-400 capitalize">{poem.genre}</span>
//                               {poem.language && (
//                                 <span className="text-xs text-gray-400">
//                                   {poem.language === 'urdu' ? 'اردو' : 
//                                    poem.language === 'hindi' ? 'हिंदी' : 'EN'}
//                                 </span>
//                               )}
//                             </div>
//                             <h3 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors truncate text-sm">
//                               {poem.title}
//                             </h3>
//                             <p className="text-xs text-gray-500">
//                               {typeof poem.author === 'object' ? poem.author?.name : poem.author || 'Unknown'}
//                             </p>
//                             {primaryLines.length > 0 && (
//                               <p className={`text-gray-600 text-xs mt-1 line-clamp-1 ${poem.language === 'urdu' ? 'urdu-text' : ''}`}>
//                                 {primaryLines[0]}
//                               </p>
//                             )}
//                           </div>
//                           <div className="flex items-center gap-3 ml-3">
//                             <div className="flex items-center gap-0.5">
//                               <Heart className="h-3 w-3 text-gray-400" />
//                               <span className="text-xs text-gray-500">{poem.stats?.likes || 0}</span>
//                             </div>
//                             <div className="flex items-center gap-0.5">
//                               <Eye className="h-3 w-3 text-gray-400" />
//                               <span className="text-xs text-gray-500">{poem.stats?.views || 0}</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   </motion.div>
//                 )
//               })}
//             </div>

//             {/* Pagination with spacing from footer */}
//             {pagination.totalPages > 1 && (
//               <div className="flex items-center justify-center gap-1 mt-10 mb-8">
//                 <button
//                   onClick={() => goToPage(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                 >
//                   <ChevronLeft className="h-4 w-4" />
//                 </button>
                
//                 <div className="flex items-center gap-1">
//                   {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
//                     let pageNum
//                     if (pagination.totalPages <= 5) {
//                       pageNum = i + 1
//                     } else if (currentPage <= 3) {
//                       pageNum = i + 1
//                     } else if (currentPage >= pagination.totalPages - 2) {
//                       pageNum = pagination.totalPages - 4 + i
//                     } else {
//                       pageNum = currentPage - 2 + i
//                     }
//                     return (
//                       <button
//                         key={pageNum}
//                         onClick={() => goToPage(pageNum)}
//                         className={`min-w-[36px] h-9 rounded-lg text-sm font-medium transition-all ${
//                           currentPage === pageNum
//                             ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
//                             : 'text-gray-600 hover:bg-gray-100'
//                         }`}
//                       >
//                         {pageNum}
//                       </button>
//                     )
//                   })}
//                 </div>

//                 <button
//                   onClick={() => goToPage(currentPage + 1)}
//                   disabled={currentPage === pagination.totalPages}
//                   className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                 >
//                   <ChevronRight className="h-4 w-4" />
//                 </button>
//               </div>
//             )}

//             {/* Loading indicator */}
//             {(isFetching || isLoading) && poemsList.length > 0 && (
//               <div className="flex justify-center mt-4 mb-4">
//                 <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
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
// import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
// import { useTranslation } from 'react-i18next'
// import { useSearchParams, Link } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useQuery } from '@tanstack/react-query'
// import { 
//   Search, Filter, Heart, Eye, Bookmark, BookOpen, Loader2, 
//   ChevronLeft, ChevronRight, Sparkles, Clock, 
//   X, Grid3x3, List, User, Languages, Mic
// } from 'lucide-react'
// import poemAPI from '../../api/poemAPI'
// import { POETRY_GENRES } from '../../utils/constants.js'

// // Voice Search Component
// const VoiceSearchButton = ({ onResult, language = 'ur-PK', className = '', isUrdu = false, isHindi = false }) => {
//   const [isListening, setIsListening] = useState(false)
//   const [supportMessage, setSupportMessage] = useState('')
//   const recognitionRef = useRef(null)

//   // Get voice prompt text based on language
//   const getVoicePrompt = () => {
//     if (isUrdu) return 'آواز سے تلاش کریں'
//     if (isHindi) return 'आवाज़ से खोजें'
//     return 'Voice Search'
//   }

//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
//     if (!SpeechRecognition) {
//       setSupportMessage('Voice search not supported in this browser')
//       return
//     }

//     recognitionRef.current = new SpeechRecognition()
//     recognitionRef.current.continuous = false
//     recognitionRef.current.interimResults = false
//     recognitionRef.current.lang = language

//     recognitionRef.current.onstart = () => {
//       setIsListening(true)
//     }

//     recognitionRef.current.onend = () => {
//       setIsListening(false)
//     }

//     recognitionRef.current.onresult = (event) => {
//       const transcript = event.results[0][0].transcript
//       if (onResult) {
//         onResult(transcript)
//       }
//     }

//     recognitionRef.current.onerror = (event) => {
//       console.error('Speech recognition error:', event.error)
//       setIsListening(false)
//       if (event.error === 'not-allowed') {
//         setSupportMessage('Microphone permission denied')
//       }
//     }

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.abort()
//       }
//     }
//   }, [language, onResult])

//   const toggleListening = () => {
//     if (!recognitionRef.current) {
//       alert(getVoicePrompt() + ' - ' + (isUrdu ? 'آپ کا براؤزر سپورٹ نہیں کرتا' : isHindi ? 'आपका ब्राउज़र समर्थन नहीं करता' : 'Your browser does not support voice search'))
//       return
//     }

//     if (isListening) {
//       recognitionRef.current.stop()
//     } else {
//       try {
//         recognitionRef.current.start()
//       } catch (error) {
//         console.error('Failed to start recognition:', error)
//       }
//     }
//   }

//   return (
//     <button
//       type="button"
//       onClick={toggleListening}
//       className={`relative ${className} transition-all duration-200 ${
//         isListening 
//           ? 'bg-red-500 text-white ring-2 ring-red-300 animate-pulse' 
//           : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//       }`}
//       title={getVoicePrompt()}
//     >
//       <Mic className={`h-4 w-4 ${isListening ? 'animate-pulse' : ''}`} />
//       {isListening && (
//         <span className="absolute -top-1 -right-1 flex h-3 w-3">
//           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//           <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
//         </span>
//       )}
//     </button>
//   )
// }

// const PoetryListPage = () => {
//   const { t, i18n } = useTranslation()
//   const [searchParams, setSearchParams] = useSearchParams()
//   const [activeGenre, setActiveGenre] = useState(searchParams.get('genre') || 'all')
//   const [searchInputValue, setSearchInputValue] = useState('')
//   const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
//   const [sortBy, setSortBy] = useState('popular')
//   const [currentPage, setCurrentPage] = useState(1)
//   const [viewMode, setViewMode] = useState('grid')
//   const [showFilters, setShowFilters] = useState(false)
//   const itemsPerPage = 12
//   const searchInputRef = useRef(null)
//   const debounceTimerRef = useRef(null)

//   const currentLang = i18n.language
//   const isUrdu = currentLang === 'ur'
//   const isHindi = currentLang === 'hi'
//   const isEnglish = currentLang === 'en'

//   // Translations for UI text
//   const getTranslation = (key) => {
//     return t(key) || key
//   }

//   // Voice search handler
//   const handleVoiceResult = useCallback((transcript) => {
//     setSearchInputValue(transcript)
//     updateDebouncedSearch(transcript)
//     if (searchInputRef.current) {
//       searchInputRef.current.classList.add('ring-2', 'ring-green-400')
//       setTimeout(() => {
//         searchInputRef.current?.classList.remove('ring-2', 'ring-green-400')
//       }, 1000)
//     }
//   }, [])

//   // Fetch poems
//   const { data: response, isLoading, error, refetch, isFetching } = useQuery({
//     queryKey: ['poems', currentPage, activeGenre, sortBy, debouncedSearchQuery],
//     queryFn: () => poemAPI.getPoems({
//       page: currentPage,
//       limit: itemsPerPage,
//       genre: activeGenre !== 'all' ? activeGenre : undefined,
//       search: debouncedSearchQuery || undefined,
//       sort: sortBy
//     }),
//     enabled: true,
//     staleTime: 30000,
//     keepPreviousData: true,
//   })

//   // Extract poems and pagination
//   const poemsData = response?.data?.data || response?.data || response || []
//   const poemsList = useMemo(() => Array.isArray(poemsData) ? poemsData : [], [poemsData])
//   const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 }

//   // Sort poems based on selected sort option
//   const getSortedPoems = useCallback(() => {
//     if (!poemsList.length) return []
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
//   }, [poemsList, sortBy])

//   const sortedPoemsList = getSortedPoems()

//   // Debounce search
//   const updateDebouncedSearch = useCallback((value) => {
//     if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
//     debounceTimerRef.current = setTimeout(() => {
//       setDebouncedSearchQuery(value)
//       if (currentPage !== 1) setCurrentPage(1)
//     }, 500)
//   }, [currentPage])

//   const handleSearchChange = useCallback((e) => {
//     const value = e.target.value
//     setSearchInputValue(value)
//     updateDebouncedSearch(value)
//   }, [updateDebouncedSearch])

//   const clearSearch = useCallback(() => {
//     setSearchInputValue('')
//     setDebouncedSearchQuery('')
//     searchInputRef.current?.focus()
//   }, [])

//   useEffect(() => {
//     if (activeGenre && activeGenre !== 'all') {
//       setSearchParams({ genre: activeGenre })
//     } else {
//       setSearchParams({})
//     }
//     setCurrentPage(1)
//   }, [activeGenre, setSearchParams])

//   useEffect(() => {
//     return () => {
//       if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
//     }
//   }, [])

//   const goToPage = useCallback((page) => {
//     if (page >= 1 && page <= (pagination.totalPages || 1)) {
//       setCurrentPage(page)
//       window.scrollTo({ top: 0, behavior: 'smooth' })
//     }
//   }, [pagination.totalPages])

//   // Get poem display content based on current language
//   const getPoemDisplayContent = useCallback((poem) => {
//     const language = poem.language || 'urdu'
    
//     // Primary content (based on poem's original language)
//     let primaryLines = []
//     let primaryLangName = ''
    
//     if (language === 'urdu') {
//       primaryLines = poem.contentUrdu ? poem.contentUrdu.split('\n').filter(l => l.trim()) : []
//       if (primaryLines.length === 0 && poem.content) primaryLines = poem.content.split('\n').filter(l => l.trim())
//       primaryLangName = isUrdu ? 'اردو' : isHindi ? 'उर्दू' : 'Urdu'
//     } else if (language === 'hindi') {
//       primaryLines = poem.contentHindi ? poem.contentHindi.split('\n').filter(l => l.trim()) : []
//       if (primaryLines.length === 0 && poem.content) primaryLines = poem.content.split('\n').filter(l => l.trim())
//       primaryLangName = isUrdu ? 'ہندی' : isHindi ? 'हिंदी' : 'Hindi'
//     } else {
//       primaryLines = poem.content ? poem.content.split('\n').filter(l => l.trim()) : []
//       primaryLangName = 'English'
//     }
    
//     // Translation/Secondary content (based on current UI language)
//     let secondaryLines = []
//     let secondaryLangName = ''
    
//     if (isUrdu && language !== 'urdu') {
//       if (poem.contentUrdu) {
//         secondaryLines = poem.contentUrdu.split('\n').filter(l => l.trim())
//         secondaryLangName = 'اردو ترجمہ'
//       } else if (poem.transliteration) {
//         secondaryLines = poem.transliteration.split('\n').filter(l => l.trim())
//         secondaryLangName = 'رومن'
//       }
//     } else if (isHindi && language !== 'hindi') {
//       if (poem.contentHindi) {
//         secondaryLines = poem.contentHindi.split('\n').filter(l => l.trim())
//         secondaryLangName = 'हिंदी अनुवाद'
//       } else if (poem.translation?.hindi) {
//         secondaryLines = poem.translation.hindi.split('\n').filter(l => l.trim())
//         secondaryLangName = 'हिंदी अनुवाद'
//       }
//     } else if (isEnglish && language !== 'english') {
//       if (poem.translation?.english) {
//         secondaryLines = poem.translation.english.split('\n').filter(l => l.trim())
//         secondaryLangName = 'English Translation'
//       }
//     }
    
//     // Take first 2 lines from primary (for card preview)
//     const primaryPreview = primaryLines.slice(0, 2)
//     const secondaryPreview = secondaryLines.slice(0, 2)
    
//     return {
//       primaryLines: primaryPreview,
//       secondaryLines: secondaryPreview,
//       primaryLangName,
//       secondaryLangName,
//       hasPrimary: primaryPreview.length > 0,
//       hasSecondary: secondaryPreview.length > 0
//     }
//   }, [isUrdu, isHindi, isEnglish])

//   const getGenreIcon = useCallback((genreId) => {
//     const genre = POETRY_GENRES.find(g => g.id === genreId)
//     return genre?.icon || '📖'
//   }, [])

//   const clearFilters = useCallback(() => {
//     clearSearch()
//     setActiveGenre('all')
//     setCurrentPage(1)
//   }, [clearSearch])

//   // Get voice search language based on current UI language
//   const getVoiceLanguage = useCallback(() => {
//     if (isUrdu) return 'ur-PK'
//     if (isHindi) return 'hi-IN'
//     return 'en-US'
//   }, [isUrdu, isHindi])

//   // Get search placeholder based on language
//   const getSearchPlaceholder = () => {
//     if (isUrdu) return 'عنوان، شاعر یا شعر سے تلاش کریں...'
//     if (isHindi) return 'शीर्षक, कवि या कविता से खोजें...'
//     return 'Search poems by title, poet, or verse...'
//   }

//   // Get sort options based on language
//   const getSortOptions = () => {
//     if (isUrdu) {
//       return [
//         { value: 'popular', label: 'مقبول ترین' },
//         { value: 'recent', label: 'تازہ ترین' },
//         { value: 'views', label: 'سب سے زیادہ دیکھی گئی' },
//         { value: 'likes', label: 'سب سے زیادہ پسند کی گئی' }
//       ]
//     }
//     if (isHindi) {
//       return [
//         { value: 'popular', label: 'सबसे लोकप्रिय' },
//         { value: 'recent', label: 'सबसे नया' },
//         { value: 'views', label: 'सबसे अधिक देखा गया' },
//         { value: 'likes', label: 'सबसे अधिक पसंद किया गया' }
//       ]
//     }
//     return [
//       { value: 'popular', label: 'Most Popular' },
//       { value: 'recent', label: 'Most Recent' },
//       { value: 'views', label: 'Most Viewed' },
//       { value: 'likes', label: 'Most Liked' }
//     ]
//   }

//   const sortOptions = getSortOptions()

//   // Get genre label based on language
//   const getAllGenresLabel = () => {
//     if (isUrdu) return 'تمام اصناف'
//     if (isHindi) return 'सभी विधाएँ'
//     return 'All Genres'
//   }

//   // Get clear filters label
//   const getClearFiltersLabel = () => {
//     if (isUrdu) return 'فلٹر صاف کریں'
//     if (isHindi) return 'फ़िल्टर साफ़ करें'
//     return 'Clear filters'
//   }

//   // Get showing text
//   const getShowingText = () => {
//     if (isUrdu) return 'دکھا رہے ہیں'
//     if (isHindi) return 'दिखा रहे हैं'
//     return 'Showing'
//   }

//   // Get of text
//   const getOfText = () => {
//     if (isUrdu) return 'میں سے'
//     if (isHindi) return 'में से'
//     return 'of'
//   }

//   // Get poems text
//   const getPoemsText = () => {
//     if (isUrdu) return 'نظمیں'
//     if (isHindi) return 'कविताएँ'
//     return 'poems'
//   }

//   // Get no poems found text
//   const getNoPoemsText = () => {
//     if (isUrdu) return 'کوئی نظم نہیں ملی'
//     if (isHindi) return 'कोई कविता नहीं मिली'
//     return 'No poems found'
//   }

//   // Get try different search text
//   const getTryDifferentText = () => {
//     if (isUrdu) return 'مختلف تلاش کی اصطلاح آزمائیں'
//     if (isHindi) return 'अलग खोज शब्द आज़माएं'
//     return 'Try a different search term'
//   }

//   // Get hero title
//   const getHeroTitle = () => {
//     if (isUrdu) return 'شاعری کا مجموعہ'
//     if (isHindi) return 'कविता संग्रह'
//     return 'Poetry Collection'
//   }

//   // Get hero subtitle
//   const getHeroSubtitle = () => {
//     if (isUrdu) return 'مختلف ادوار کے مشہور شعرا کی غزلیں، نظمیں، شعر اور بہت کچھ دریافت کریں'
//     if (isHindi) return 'विभिन्न पीढ़ियों के महान शायरों की ग़ज़लें, नज़्में, शेर और बहुत कुछ खोजें'
//     return 'Explore ghazals, nazms, sher, and more from legendary poets across generations'
//   }

//   // Get discover poetry text
//   const getDiscoverText = () => {
//     if (isUrdu) return 'شاعری دریافت کریں'
//     if (isHindi) return 'कविता खोजें'
//     return 'Discover Poetry'
//   }

//   // Loading state
//   if (isLoading && poemsList.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
//           <div className="flex items-center justify-center min-h-[60vh]">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-amber-500 rounded-2xl animate-pulse mx-auto mb-4 flex items-center justify-center">
//                 <BookOpen className="h-8 w-8 text-white" />
//               </div>
//               <p className="text-gray-600">{isUrdu ? 'لوڈ ہو رہا ہے...' : isHindi ? 'लोड हो रहा है...' : 'Loading poems...'}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
//       {/* Hero Section */}
//       <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-primary-500 to-amber-500 pt-20 pb-12">
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
//             <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
//               <Sparkles className="h-4 w-4 text-amber-200" />
//               <span className="text-sm text-white font-medium">{getDiscoverText()}</span>
//             </div>
//             <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
//               {getHeroTitle()}
//             </h1>
//             <p className="text-white/80 max-w-2xl mx-auto text-sm md:text-base">
//               {getHeroSubtitle()}
//             </p>
//           </motion.div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 pb-12">
//         {/* Search & Filters Bar */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 mb-6"
//         >
//           <div className="flex flex-col lg:flex-row gap-3">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <input
//                 ref={searchInputRef}
//                 type="text"
//                 placeholder={getSearchPlaceholder()}
//                 value={searchInputValue}
//                 onChange={handleSearchChange}
//                 className={`w-full pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 transition-all ${isUrdu ? 'text-right' : ''}`}
//                 autoComplete="off"
//                 dir={isUrdu ? 'rtl' : 'ltr'}
//               />
//               {searchInputValue && (
//                 <button onClick={clearSearch} className={`absolute ${isUrdu ? 'left-2' : 'right-2'} top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600`}>
//                   <X className="h-3 w-3" />
//                 </button>
//               )}
//             </div>

//             <div className="flex gap-2">
//               {/* Voice Search Button */}
//               <VoiceSearchButton 
//                 onResult={handleVoiceResult}
//                 language={getVoiceLanguage()}
//                 isUrdu={isUrdu}
//                 isHindi={isHindi}
//                 className="px-3 py-2 rounded-lg transition-all"
//               />

//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className={`px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50/50 cursor-pointer ${isUrdu ? 'text-right' : ''}`}
//                 dir={isUrdu ? 'rtl' : 'ltr'}
//               >
//                 {sortOptions.map(option => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </select>

//               <button
//                 onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
//                 className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
//               >
//                 {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid3x3 className="h-4 w-4" />}
//               </button>

//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="lg:hidden px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
//               >
//                 <Filter className="h-4 w-4" />
//               </button>
//             </div>
//           </div>

//           {/* Genre Filters */}
//           <div className="hidden lg:flex overflow-x-auto gap-1.5 mt-3 pt-2 border-t border-gray-100">
//             <button
//               onClick={() => setActiveGenre('all')}
//               className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
//                 activeGenre === 'all'
//                   ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white'
//                   : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//               }`}
//             >
//               {getAllGenresLabel()}
//             </button>
//             {POETRY_GENRES.map((genre) => (
//               <button
//                 key={genre.id}
//                 onClick={() => setActiveGenre(genre.id)}
//                 className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
//                   activeGenre === genre.id
//                     ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white'
//                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                 }`}
//               >
//                 <span className="mr-1">{getGenreIcon(genre.id)}</span>
//                 {genre.label}
//               </button>
//             ))}
//           </div>

//           {/* Mobile Filters */}
//           <AnimatePresence>
//             {showFilters && (
//               <motion.div
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: 'auto', opacity: 1 }}
//                 exit={{ height: 0, opacity: 0 }}
//                 className="lg:hidden overflow-hidden mt-3"
//               >
//                 <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100">
//                   <button
//                     onClick={() => { setActiveGenre('all'); setShowFilters(false) }}
//                     className={`px-3 py-1 rounded-full text-xs ${
//                       activeGenre === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'
//                     }`}
//                   >
//                     {getAllGenresLabel()}
//                   </button>
//                   {POETRY_GENRES.map((genre) => (
//                     <button
//                       key={genre.id}
//                       onClick={() => { setActiveGenre(genre.id); setShowFilters(false) }}
//                       className={`px-3 py-1 rounded-full text-xs ${
//                         activeGenre === genre.id ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'
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

//         {/* Results Count */}
//         <div className="flex justify-between items-center mb-4">
//           <p className="text-xs text-gray-500" dir={isUrdu ? 'rtl' : 'ltr'}>
//             {getShowingText()} <span className="font-semibold text-gray-700">{sortedPoemsList.length}</span> {getOfText()}{' '}
//             <span className="font-semibold text-gray-700">{pagination.total || sortedPoemsList.length}</span> {getPoemsText()}
//           </p>
//           {(activeGenre !== 'all' || debouncedSearchQuery) && (
//             <button onClick={clearFilters} className="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1">
//               {getClearFiltersLabel()}
//               <X className="h-3 w-3" />
//             </button>
//           )}
//         </div>

//         {/* Poems Grid */}
//         {sortedPoemsList.length === 0 && !isLoading ? (
//           <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
//             <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//             <h3 className="text-lg font-semibold text-gray-900 mb-1">{getNoPoemsText()}</h3>
//             <p className="text-sm text-gray-500">{getTryDifferentText()}</p>
//           </div>
//         ) : (
//           <>
//             <div className={viewMode === 'grid' 
//               ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
//               : "space-y-3"
//             }>
//               {sortedPoemsList.map((poem, index) => {
//                 const { primaryLines, secondaryLines, primaryLangName, secondaryLangName, hasPrimary, hasSecondary } = getPoemDisplayContent(poem)
                
//                 return viewMode === 'grid' ? (
//                   <motion.div
//                     key={poem._id || poem.id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: Math.min(index * 0.03, 0.3) }}
//                     whileHover={{ y: -2 }}
//                   >
//                     <Link to={`/poem/${poem.slug}`} className="block group">
//                       <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all h-full flex flex-col">
//                         {/* Card Header - Compact */}
//                         <div className="relative h-14 bg-gradient-to-r from-primary-600 via-primary-500 to-amber-500 px-3 py-2">
//                           <div className="flex justify-between items-start">
//                             <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded text-white text-xs capitalize">
//                               {getGenreIcon(poem.genre)} {poem.genre}
//                             </span>
//                             <button 
//                               className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
//                               onClick={(e) => e.preventDefault()}
//                             >
//                               <Bookmark className="h-3 w-3 text-white" />
//                             </button>
//                           </div>
//                           {/* Title - Single line only */}
//                           <h3 className={`font-semibold text-white text-sm mt-1 truncate ${isUrdu ? 'text-right' : ''}`} dir={isUrdu ? 'rtl' : 'ltr'}>
//                             {poem.title}
//                           </h3>
//                         </div>
                        
//                         {/* Card Body - Content focused */}
//                         <div className="p-3 flex-1">
//                           {/* Primary Language Lines (2 lines) */}
//                           {hasPrimary && (
//                             <div className="mb-2">
//                               <div className="flex items-center gap-1 mb-0.5">
//                                 <Languages className="h-2.5 w-2.5 text-gray-400" />
//                                 <span className="text-[10px] text-gray-400">{primaryLangName}</span>
//                               </div>
//                               <div className="space-y-0.5">
//                                 {primaryLines.slice(0, 2).map((line, lineIdx) => (
//                                   <p 
//                                     key={`primary-${lineIdx}`}
//                                     className={`text-gray-700 text-xs line-clamp-1 leading-relaxed ${poem.language === 'urdu' ? 'urdu-text text-right' : ''}`}
//                                     dir={poem.language === 'urdu' ? 'rtl' : 'ltr'}
//                                   >
//                                     {line.length > 45 ? line.substring(0, 45) + '...' : line}
//                                   </p>
//                                 ))}
//                               </div>
//                             </div>
//                           )}
                          
//                           {/* Secondary Language Lines (if available) */}
//                           {hasSecondary && (
//                             <>
//                               <div className="border-t border-gray-100 my-1.5"></div>
//                               <div>
//                                 <div className="flex items-center gap-1 mb-0.5">
//                                   <span className="text-[10px] text-gray-400">{secondaryLangName}</span>
//                                 </div>
//                                 <div className="space-y-0.5">
//                                   {secondaryLines.slice(0, 1).map((line, lineIdx) => (
//                                     <p key={`secondary-${lineIdx}`} className="text-gray-500 text-xs line-clamp-1">
//                                       {line.length > 45 ? line.substring(0, 45) + '...' : line}
//                                     </p>
//                                   ))}
//                                 </div>
//                               </div>
//                             </>
//                           )}
                          
//                           {/* Author */}
//                           <div className="flex items-center gap-1.5 mt-2 pt-1.5 border-t border-gray-100">
//                             <div className="w-5 h-5 bg-gradient-to-br from-primary-100 to-amber-100 rounded-full flex items-center justify-center">
//                               <User className="h-2.5 w-2.5 text-primary-600" />
//                             </div>
//                             <span className="text-xs text-gray-500 truncate flex-1">
//                               {typeof poem.author === 'object' ? poem.author?.name : poem.author || 'Unknown'}
//                             </span>
//                           </div>
                          
//                           {/* Stats - Small badges at bottom */}
//                           <div className="flex items-center justify-end gap-2 mt-2 pt-1">
//                             <div className="flex items-center gap-1">
//                               <Heart className="h-3 w-3 text-red-400" />
//                               <span className="text-[10px] text-gray-500">{poem.stats?.likes?.toLocaleString() || 0}</span>
//                             </div>
//                             <div className="flex items-center gap-1">
//                               <Eye className="h-3 w-3 text-gray-400" />
//                               <span className="text-[10px] text-gray-500">{poem.stats?.views?.toLocaleString() || 0}</span>
//                             </div>
//                             {poem.language && (
//                               <span className="text-[10px] text-gray-400">
//                                 {poem.language === 'urdu' ? 'اردو' : 
//                                  poem.language === 'hindi' ? 'हिंदी' : 'EN'}
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   </motion.div>
//                 ) : (
//                   // List View
//                   <motion.div
//                     key={poem._id || poem.id}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: Math.min(index * 0.03, 0.3) }}
//                   >
//                     <Link to={`/poem/${poem.slug}`} className="block group">
//                       <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-all">
//                         <div className="flex items-start justify-between">
//                           <div className="flex-1 min-w-0">
//                             <div className="flex items-center gap-2 mb-1 flex-wrap">
//                               <span className="text-xs text-gray-400 capitalize">{poem.genre}</span>
//                               {poem.language && (
//                                 <span className="text-xs text-gray-400">
//                                   {poem.language === 'urdu' ? 'اردو' : 
//                                    poem.language === 'hindi' ? 'हिंदी' : 'EN'}
//                                 </span>
//                               )}
//                             </div>
//                             <h3 className={`font-medium text-gray-900 group-hover:text-primary-600 transition-colors truncate text-sm ${isUrdu ? 'text-right' : ''}`} dir={isUrdu ? 'rtl' : 'ltr'}>
//                               {poem.title}
//                             </h3>
//                             <p className="text-xs text-gray-500">
//                               {typeof poem.author === 'object' ? poem.author?.name : poem.author || 'Unknown'}
//                             </p>
//                             {primaryLines.length > 0 && (
//                               <p className={`text-gray-600 text-xs mt-1 line-clamp-1 ${poem.language === 'urdu' ? 'urdu-text text-right' : ''}`} dir={poem.language === 'urdu' ? 'rtl' : 'ltr'}>
//                                 {primaryLines[0]}
//                               </p>
//                             )}
//                           </div>
//                           <div className="flex items-center gap-3 ml-3">
//                             <div className="flex items-center gap-0.5">
//                               <Heart className="h-3 w-3 text-gray-400" />
//                               <span className="text-xs text-gray-500">{poem.stats?.likes || 0}</span>
//                             </div>
//                             <div className="flex items-center gap-0.5">
//                               <Eye className="h-3 w-3 text-gray-400" />
//                               <span className="text-xs text-gray-500">{poem.stats?.views || 0}</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   </motion.div>
//                 )
//               })}
//             </div>

//             {/* Pagination with spacing from footer */}
//             {pagination.totalPages > 1 && (
//               <div className="flex items-center justify-center gap-1 mt-10 mb-8">
//                 <button
//                   onClick={() => goToPage(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                 >
//                   <ChevronLeft className="h-4 w-4" />
//                 </button>
                
//                 <div className="flex items-center gap-1">
//                   {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
//                     let pageNum
//                     if (pagination.totalPages <= 5) {
//                       pageNum = i + 1
//                     } else if (currentPage <= 3) {
//                       pageNum = i + 1
//                     } else if (currentPage >= pagination.totalPages - 2) {
//                       pageNum = pagination.totalPages - 4 + i
//                     } else {
//                       pageNum = currentPage - 2 + i
//                     }
//                     return (
//                       <button
//                         key={pageNum}
//                         onClick={() => goToPage(pageNum)}
//                         className={`min-w-[36px] h-9 rounded-lg text-sm font-medium transition-all ${
//                           currentPage === pageNum
//                             ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
//                             : 'text-gray-600 hover:bg-gray-100'
//                         }`}
//                       >
//                         {pageNum}
//                       </button>
//                     )
//                   })}
//                 </div>

//                 <button
//                   onClick={() => goToPage(currentPage + 1)}
//                   disabled={currentPage === pagination.totalPages}
//                   className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                 >
//                   <ChevronRight className="h-4 w-4" />
//                 </button>
//               </div>
//             )}

//             {/* Loading indicator */}
//             {(isFetching || isLoading) && poemsList.length > 0 && (
//               <div className="flex justify-center mt-4 mb-4">
//                 <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
//               </div>
//             )}
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
  ChevronLeft, ChevronRight, Sparkles, Clock, 
  X, Grid3x3, List, User, Languages, Mic
} from 'lucide-react'
import poemAPI from '../../api/poemAPI'
import { POETRY_GENRES } from '../../utils/constants.js'

// Voice Search Component
const VoiceSearchButton = ({ onResult, language = 'ur-PK', className = '' }) => {
  const { t, i18n } = useTranslation()
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef(null)
  
  const isUrdu = i18n.language === 'ur'
  const isHindi = i18n.language === 'hi'

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      return
    }

    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.continuous = false
    recognitionRef.current.interimResults = false
    recognitionRef.current.lang = language

    recognitionRef.current.onstart = () => {
      setIsListening(true)
    }

    recognitionRef.current.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      if (onResult) {
        onResult(transcript)
      }
    }

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [language, onResult])

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert(t('common.voiceSearchNotSupported'))
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
    } else {
      try {
        recognitionRef.current.start()
      } catch (error) {
        console.error('Failed to start recognition:', error)
      }
    }
  }

  return (
    <button
      type="button"
      onClick={toggleListening}
      className={`relative ${className} transition-all duration-200 ${
        isListening 
          ? 'bg-red-500 text-white ring-2 ring-red-300 animate-pulse' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
      title={t('common.voiceSearch')}
    >
      <Mic className={`h-4 w-4 ${isListening ? 'animate-pulse' : ''}`} />
      {isListening && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      )}
    </button>
  )
}

const PoetryListPage = () => {
  const { t, i18n } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeGenre, setActiveGenre] = useState(searchParams.get('genre') || 'all')
  const [searchInputValue, setSearchInputValue] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const itemsPerPage = 12
  const searchInputRef = useRef(null)
  const debounceTimerRef = useRef(null)

  const currentLang = i18n.language
  const isUrdu = currentLang === 'ur'
  const isHindi = currentLang === 'hi'

  // Voice search handler
  const handleVoiceResult = useCallback((transcript) => {
    setSearchInputValue(transcript)
    updateDebouncedSearch(transcript)
    if (searchInputRef.current) {
      searchInputRef.current.classList.add('ring-2', 'ring-green-400')
      setTimeout(() => {
        searchInputRef.current?.classList.remove('ring-2', 'ring-green-400')
      }, 1000)
    }
  }, [])

  // Fetch poems
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
  })

  // Extract poems and pagination
  const poemsData = response?.data?.data || response?.data || response || []
  const poemsList = useMemo(() => Array.isArray(poemsData) ? poemsData : [], [poemsData])
  const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 }

  // Sort poems based on selected sort option
  const getSortedPoems = useCallback(() => {
    if (!poemsList.length) return []
    switch (sortBy) {
      case 'recent':
        return [...poemsList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      case 'views':
        return [...poemsList].sort((a, b) => (b.stats?.views || 0) - (a.stats?.views || 0))
      case 'likes':
        return [...poemsList].sort((a, b) => (b.stats?.likes || 0) - (a.stats?.likes || 0))
      default:
        return poemsList
    }
  }, [poemsList, sortBy])

  const sortedPoemsList = getSortedPoems()

  // Debounce search
  const updateDebouncedSearch = useCallback((value) => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedSearchQuery(value)
      if (currentPage !== 1) setCurrentPage(1)
    }, 500)
  }, [currentPage])

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value
    setSearchInputValue(value)
    updateDebouncedSearch(value)
  }, [updateDebouncedSearch])

  const clearSearch = useCallback(() => {
    setSearchInputValue('')
    setDebouncedSearchQuery('')
    searchInputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (activeGenre && activeGenre !== 'all') {
      setSearchParams({ genre: activeGenre })
    } else {
      setSearchParams({})
    }
    setCurrentPage(1)
  }, [activeGenre, setSearchParams])

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
    }
  }, [])

  const goToPage = useCallback((page) => {
    if (page >= 1 && page <= (pagination.totalPages || 1)) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [pagination.totalPages])

  // Get poem display content based on current language
  const getPoemDisplayContent = useCallback((poem) => {
    const language = poem.language || 'urdu'
    
    // Primary content (based on poem's original language)
    let primaryLines = []
    let primaryLangName = ''
    
    if (language === 'urdu') {
      primaryLines = poem.contentUrdu ? poem.contentUrdu.split('\n').filter(l => l.trim()) : []
      if (primaryLines.length === 0 && poem.content) primaryLines = poem.content.split('\n').filter(l => l.trim())
      primaryLangName = t('poetry.urdu')
    } else if (language === 'hindi') {
      primaryLines = poem.contentHindi ? poem.contentHindi.split('\n').filter(l => l.trim()) : []
      if (primaryLines.length === 0 && poem.content) primaryLines = poem.content.split('\n').filter(l => l.trim())
      primaryLangName = t('poetry.hindi')
    } else {
      primaryLines = poem.content ? poem.content.split('\n').filter(l => l.trim()) : []
      primaryLangName = t('poetry.english')
    }
    
    // Translation/Secondary content (based on current UI language)
    let secondaryLines = []
    let secondaryLangName = ''
    
    if (isUrdu && language !== 'urdu') {
      if (poem.contentUrdu) {
        secondaryLines = poem.contentUrdu.split('\n').filter(l => l.trim())
        secondaryLangName = t('poetry.urduTranslation')
      } else if (poem.transliteration) {
        secondaryLines = poem.transliteration.split('\n').filter(l => l.trim())
        secondaryLangName = t('poetry.roman')
      }
    } else if (isHindi && language !== 'hindi') {
      if (poem.contentHindi) {
        secondaryLines = poem.contentHindi.split('\n').filter(l => l.trim())
        secondaryLangName = t('poetry.hindiTranslation')
      } else if (poem.translation?.hindi) {
        secondaryLines = poem.translation.hindi.split('\n').filter(l => l.trim())
        secondaryLangName = t('poetry.hindiTranslation')
      }
    } else if (!isUrdu && !isHindi && language !== 'english') {
      if (poem.translation?.english) {
        secondaryLines = poem.translation.english.split('\n').filter(l => l.trim())
        secondaryLangName = t('poetry.englishTranslation')
      }
    }
    
    // Take first 2 lines from primary (for card preview)
    const primaryPreview = primaryLines.slice(0, 2)
    const secondaryPreview = secondaryLines.slice(0, 2)
    
    return {
      primaryLines: primaryPreview,
      secondaryLines: secondaryPreview,
      primaryLangName,
      secondaryLangName,
      hasPrimary: primaryPreview.length > 0,
      hasSecondary: secondaryPreview.length > 0
    }
  }, [isUrdu, isHindi, t])

  const getGenreIcon = useCallback((genreId) => {
    const genre = POETRY_GENRES.find(g => g.id === genreId)
    return genre?.icon || '📖'
  }, [])

  const clearFilters = useCallback(() => {
    clearSearch()
    setActiveGenre('all')
    setCurrentPage(1)
  }, [clearSearch])

  // Get voice search language based on current UI language
  const getVoiceLanguage = useCallback(() => {
    if (isUrdu) return 'ur-PK'
    if (isHindi) return 'hi-IN'
    return 'en-US'
  }, [isUrdu, isHindi])

  // Sort options from translation
  const sortOptions = [
    { value: 'popular', label: t('poetry.popular') },
    { value: 'recent', label: t('poetry.recent') },
    { value: 'views', label: t('poetry.mostViewed') },
    { value: 'likes', label: t('poetry.mostLiked') }
  ]

  // Loading state
  if (isLoading && poemsList.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-amber-500 rounded-2xl animate-pulse mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <p className="text-gray-600">{t('common.loading')}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-primary-500 to-amber-500 pt-20 pb-12">
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
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
              <Sparkles className="h-4 w-4 text-amber-200" />
              <span className="text-sm text-white font-medium">{t('common.discoverPoetry')}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {t('common.poetryCollection')}
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto text-sm md:text-base">
              {t('common.exploreText')}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 pb-12">
        {/* Search & Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 mb-6"
        >
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder={t('common.search')}
                value={searchInputValue}
                onChange={handleSearchChange}
                className={`w-full pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 transition-all ${isUrdu ? 'text-right' : ''}`}
                autoComplete="off"
                dir={isUrdu ? 'rtl' : 'ltr'}
              />
              {searchInputValue && (
                <button onClick={clearSearch} className={`absolute ${isUrdu ? 'left-2' : 'right-2'} top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600`}>
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            <div className="flex gap-2">
              {/* Voice Search Button */}
              <VoiceSearchButton 
                onResult={handleVoiceResult}
                language={getVoiceLanguage()}
                className="px-3 py-2 rounded-lg transition-all"
              />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50/50 cursor-pointer ${isUrdu ? 'text-right' : ''}`}
                dir={isUrdu ? 'rtl' : 'ltr'}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid3x3 className="h-4 w-4" />}
              </button>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <Filter className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Genre Filters */}
          <div className="hidden lg:flex overflow-x-auto gap-1.5 mt-3 pt-2 border-t border-gray-100">
            <button
              onClick={() => setActiveGenre('all')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                activeGenre === 'all'
                  ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t('poetry.allGenres')}
            </button>
            {POETRY_GENRES.map((genre) => (
              <button
                key={genre.id}
                onClick={() => setActiveGenre(genre.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  activeGenre === genre.id
                    ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span className="mr-1">{getGenreIcon(genre.id)}</span>
                {t(`poetry.${genre.id}`) || genre.label}
              </button>
            ))}
          </div>

          {/* Mobile Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden mt-3"
              >
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => { setActiveGenre('all'); setShowFilters(false) }}
                    className={`px-3 py-1 rounded-full text-xs ${
                      activeGenre === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {t('poetry.allGenres')}
                  </button>
                  {POETRY_GENRES.map((genre) => (
                    <button
                      key={genre.id}
                      onClick={() => { setActiveGenre(genre.id); setShowFilters(false) }}
                      className={`px-3 py-1 rounded-full text-xs ${
                        activeGenre === genre.id ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {t(`poetry.${genre.id}`) || genre.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-xs text-gray-500" dir={isUrdu ? 'rtl' : 'ltr'}>
            {t('common.showing')} <span className="font-semibold text-gray-700">{sortedPoemsList.length}</span> {t('common.of')}{' '}
            <span className="font-semibold text-gray-700">{pagination.total || sortedPoemsList.length}</span> {t('common.poems')}
          </p>
          {(activeGenre !== 'all' || debouncedSearchQuery) && (
            <button onClick={clearFilters} className="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1">
              {t('common.clearFilters')}
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        {/* Poems Grid */}
        {sortedPoemsList.length === 0 && !isLoading ? (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
            <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{t('common.noPoemsFound')}</h3>
            <p className="text-sm text-gray-500">{t('common.tryDifferentSearch')}</p>
          </div>
        ) : (
          <>
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              : "space-y-3"
            }>
              {sortedPoemsList.map((poem, index) => {
                const { primaryLines, secondaryLines, primaryLangName, secondaryLangName, hasPrimary, hasSecondary } = getPoemDisplayContent(poem)
                
                return viewMode === 'grid' ? (
                  <motion.div
                    key={poem._id || poem.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.03, 0.3) }}
                    whileHover={{ y: -2 }}
                  >
                    <Link to={`/poem/${poem.slug}`} className="block group">
                      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all h-full flex flex-col">
                        {/* Card Header - Compact */}
                        <div className="relative h-14 bg-gradient-to-r from-primary-600 via-primary-500 to-amber-500 px-3 py-2">
                          <div className="flex justify-between items-start">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded text-white text-xs capitalize">
                              {getGenreIcon(poem.genre)} {t(`poetry.${poem.genre}`) || poem.genre}
                            </span>
                            <button 
                              className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                              onClick={(e) => e.preventDefault()}
                            >
                              <Bookmark className="h-3 w-3 text-white" />
                            </button>
                          </div>
                          {/* Title - Single line only */}
                          <h3 className={`font-semibold text-white text-sm mt-1 truncate ${isUrdu ? 'text-right' : ''}`} dir={isUrdu ? 'rtl' : 'ltr'}>
                            {poem.title}
                          </h3>
                        </div>
                        
                        {/* Card Body - Content focused */}
                        <div className="p-3 flex-1">
                          {/* Primary Language Lines (2 lines) */}
                          {hasPrimary && (
                            <div className="mb-2">
                              <div className="flex items-center gap-1 mb-0.5">
                                <Languages className="h-2.5 w-2.5 text-gray-400" />
                                <span className="text-[10px] text-gray-400">{primaryLangName}</span>
                              </div>
                              <div className="space-y-0.5">
                                {primaryLines.slice(0, 2).map((line, lineIdx) => (
                                  <p 
                                    key={`primary-${lineIdx}`}
                                    className={`text-gray-700 text-xs line-clamp-1 leading-relaxed ${poem.language === 'urdu' ? 'urdu-text text-right' : ''}`}
                                    dir={poem.language === 'urdu' ? 'rtl' : 'ltr'}
                                  >
                                    {line.length > 45 ? line.substring(0, 45) + '...' : line}
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Secondary Language Lines (if available) */}
                          {hasSecondary && (
                            <>
                              <div className="border-t border-gray-100 my-1.5"></div>
                              <div>
                                <div className="flex items-center gap-1 mb-0.5">
                                  <span className="text-[10px] text-gray-400">{secondaryLangName}</span>
                                </div>
                                <div className="space-y-0.5">
                                  {secondaryLines.slice(0, 1).map((line, lineIdx) => (
                                    <p key={`secondary-${lineIdx}`} className="text-gray-500 text-xs line-clamp-1">
                                      {line.length > 45 ? line.substring(0, 45) + '...' : line}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            </>
                          )}
                          
                          {/* Author */}
                          <div className="flex items-center gap-1.5 mt-2 pt-1.5 border-t border-gray-100">
                            <div className="w-5 h-5 bg-gradient-to-br from-primary-100 to-amber-100 rounded-full flex items-center justify-center">
                              <User className="h-2.5 w-2.5 text-primary-600" />
                            </div>
                            <span className="text-xs text-gray-500 truncate flex-1">
                              {typeof poem.author === 'object' ? poem.author?.name : poem.author || t('common.unknown')}
                            </span>
                          </div>
                          
                          {/* Stats - Small badges at bottom */}
                          <div className="flex items-center justify-end gap-2 mt-2 pt-1">
                            <div className="flex items-center gap-1">
                              <Heart className="h-3 w-3 text-red-400" />
                              <span className="text-[10px] text-gray-500">{poem.stats?.likes?.toLocaleString() || 0}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3 text-gray-400" />
                              <span className="text-[10px] text-gray-500">{poem.stats?.views?.toLocaleString() || 0}</span>
                            </div>
                            {poem.language && (
                              <span className="text-[10px] text-gray-400">
                                {poem.language === 'urdu' ? t('poetry.urdu') : 
                                 poem.language === 'hindi' ? t('poetry.hindi') : 
                                 poem.language === 'english' ? t('poetry.english') : poem.language}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ) : (
                  // List View
                  <motion.div
                    key={poem._id || poem.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: Math.min(index * 0.03, 0.3) }}
                  >
                    <Link to={`/poem/${poem.slug}`} className="block group">
                      <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-xs text-gray-400 capitalize">{t(`poetry.${poem.genre}`) || poem.genre}</span>
                              {poem.language && (
                                <span className="text-xs text-gray-400">
                                  {poem.language === 'urdu' ? t('poetry.urdu') : 
                                   poem.language === 'hindi' ? t('poetry.hindi') : 
                                   poem.language === 'english' ? t('poetry.english') : poem.language}
                                </span>
                              )}
                            </div>
                            <h3 className={`font-medium text-gray-900 group-hover:text-primary-600 transition-colors truncate text-sm ${isUrdu ? 'text-right' : ''}`} dir={isUrdu ? 'rtl' : 'ltr'}>
                              {poem.title}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {typeof poem.author === 'object' ? poem.author?.name : poem.author || t('common.unknown')}
                            </p>
                            {primaryLines.length > 0 && (
                              <p className={`text-gray-600 text-xs mt-1 line-clamp-1 ${poem.language === 'urdu' ? 'urdu-text text-right' : ''}`} dir={poem.language === 'urdu' ? 'rtl' : 'ltr'}>
                                {primaryLines[0]}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-3 ml-3">
                            <div className="flex items-center gap-0.5">
                              <Heart className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-500">{poem.stats?.likes || 0}</span>
                            </div>
                            <div className="flex items-center gap-0.5">
                              <Eye className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-500">{poem.stats?.views || 0}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* Pagination with spacing from footer */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-1 mt-10 mb-8">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    let pageNum
                    if (pagination.totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= pagination.totalPages - 2) {
                      pageNum = pagination.totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`min-w-[36px] h-9 rounded-lg text-sm font-medium transition-all ${
                          currentPage === pageNum
                            ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === pagination.totalPages}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Loading indicator */}
            {(isFetching || isLoading) && poemsList.length > 0 && (
              <div className="flex justify-center mt-4 mb-4">
                <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default PoetryListPage