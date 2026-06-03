// import React, { useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { motion } from 'framer-motion'
// import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react'
// import { Link } from 'react-router-dom'

// const tabs = [
//   { id: 'all', label: 'All' },
//   { id: 'poetry', label: 'Poetry' },
//   { id: 'authors', label: 'Authors' },
//   { id: 'books', label: 'Books' },
//   { id: 'videos', label: 'Videos' },
// ]

// const filters = {
//   poetry: ['Ghazals', 'Nazms', 'Sher', 'Rubai', 'Rekhti'],
//   authors: ['Classical', 'Modern', 'Female', 'Trending'],
//   books: ['Rare Books', 'Journals', 'Magazines'],
//   videos: ['Mushaira', 'Podcasts', 'Documentaries'],
// }

// const ExplorePage = () => {
//   const { t } = useTranslation()
//   const [activeTab, setActiveTab] = useState('all')
//   const [viewMode, setViewMode] = useState('grid')
//   const [showFilters, setShowFilters] = useState(false)
//   const [searchQuery, setSearchQuery] = useState('')

//   return (
//     <div className="page-container">
//       <div className="mb-8">
//         <h1 className="section-title">{t('common.explore')}</h1>
//         <p className="section-subtitle">Discover literary treasures across genres and eras</p>
//       </div>

//       {/* Search & Controls */}
//       <div className="flex flex-col md:flex-row gap-4 mb-6">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search poetry, authors, books..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="input-field pl-10"
//           />
//         </div>
//         <div className="flex items-center space-x-2">
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="flex items-center space-x-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             <SlidersHorizontal className="h-5 w-5" />
//             <span>Filters</span>
//           </button>
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

//       {/* Tabs */}
//       <div className="flex overflow-x-auto space-x-2 mb-6 pb-2">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//               activeTab === tab.id
//                 ? 'bg-primary-600 text-white'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Filters Panel */}
//       {showFilters && activeTab !== 'all' && (
//         <motion.div
//           initial={{ height: 0, opacity: 0 }}
//           animate={{ height: 'auto', opacity: 1 }}
//           className="mb-6 p-4 bg-gray-50 rounded-lg"
//         >
//           <div className="flex flex-wrap gap-2">
//             {filters[activeTab]?.map((filter) => (
//               <button
//                 key={filter}
//                 className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-primary-300 hover:text-primary-600 transition-colors"
//               >
//                 {filter}
//               </button>
//             ))}
//           </div>
//         </motion.div>
//       )}

//       {/* Content Grid */}
//       <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
//         {/* Placeholder content cards */}
//         {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
//           <motion.div
//             key={item}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: item * 0.05 }}
//             className="card p-4"
//           >
//             <div className="h-40 bg-gray-200 rounded-lg mb-4 animate-pulse" />
//             <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
//             <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default ExplorePage











// // client/src/pages/public/ExplorePage.jsx
// import React, { useState, useEffect, useCallback } from 'react'
// import { useTranslation } from 'react-i18next'
// import { motion } from 'framer-motion'
// import { useNavigate, useSearchParams, Link } from 'react-router-dom'
// import { Search, Filter, Grid, List, SlidersHorizontal, X, Loader2, AlertCircle } from 'lucide-react'
// import { useQuery } from '@tanstack/react-query'
// import poemAPI from '../../api/poemAPI'
// import authorAPI from '../../api/authorAPI'
// import bookAPI from '../../api/bookAPI'
// import audioAPI from '../../api/audioAPI'
// import videoAPI from '../../api/videoAPI'
// import ContentCard from '../../components/common/ContentCard'

// const tabs = [
//   { id: 'all', label: 'All', icon: '🔍' },
//   { id: 'poetry', label: 'Poetry', icon: '📖' },
//   { id: 'authors', label: 'Authors', icon: '👤' },
//   { id: 'books', label: 'Books', icon: '📚' },
//   { id: 'audio', label: 'Audio', icon: '🎵' },
//   { id: 'videos', label: 'Videos', icon: '🎬' },
// ]

// const ExplorePage = () => {
//   const { t } = useTranslation()
//   const navigate = useNavigate()
//   const [searchParams, setSearchParams] = useSearchParams()
//   const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'all')
//   const [viewMode, setViewMode] = useState('grid')
//   const [showFilters, setShowFilters] = useState(false)
//   const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
//   const [selectedFilters, setSelectedFilters] = useState([])
//   const [debouncedQuery, setDebouncedQuery] = useState(searchQuery)

//   // Filters configuration
//   const filters = {
//     poetry: ['Ghazal', 'Nazm', 'Sher', 'Rubai', 'Rekhti', 'Qasida', 'Marsiya'],
//     authors: ['Classical', 'Modern', 'Contemporary', 'Female', 'Sufi'],
//     books: ['Ebook', 'Journal', 'Magazine', 'Rare', 'Manuscript'],
//     audio: ['Nauha', 'Marsiya', 'Majlis', 'Naat', 'Hamd', 'Ghazal', 'Podcast'],
//     videos: ['Mushaira', 'Documentary', 'Interview', 'Lecture', 'Performance'],
//   }

//   // Debounce search query
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedQuery(searchQuery)
//       if (searchQuery) {
//         setSearchParams({ q: searchQuery, tab: activeTab })
//       } else {
//         setSearchParams({ tab: activeTab })
//       }
//     }, 500)
//     return () => clearTimeout(timer)
//   }, [searchQuery, activeTab, setSearchParams])

//   // Fetch results based on active tab and search query
//   const fetchAllResults = async () => {
//     const params = { search: debouncedQuery, limit: 20 }
//     const [poems, authors, books, audio, videos] = await Promise.all([
//       poemAPI.getPoems(params).catch(() => ({ data: [] })),
//       authorAPI.getAuthors(params).catch(() => ({ data: [] })),
//       bookAPI.getBooks(params).catch(() => ({ data: [] })),
//       audioAPI.getAudioItems(params).catch(() => ({ data: [] })),
//       videoAPI.getVideos(params).catch(() => ({ data: [] })),
//     ])
//     return {
//       poems: poems?.data?.data || poems?.data || poems || [],
//       authors: authors?.data?.data || authors?.data || authors || [],
//       books: books?.data?.data || books?.data || books || [],
//       audio: audio?.data?.data || audio?.data || audio || [],
//       videos: videos?.data?.data || videos?.data || videos || [],
//     }
//   }

//   const fetchFilteredResults = async () => {
//     const params = { 
//       search: debouncedQuery, 
//       limit: 20,
//       ...(selectedFilters.length > 0 && { genre: selectedFilters.join(',') })
//     }
    
//     switch (activeTab) {
//       case 'poetry':
//         const poems = await poemAPI.getPoems(params)
//         return { poems: poems?.data?.data || poems?.data || poems || [] }
//       case 'authors':
//         const authors = await authorAPI.getAuthors(params)
//         return { authors: authors?.data?.data || authors?.data || authors || [] }
//       case 'books':
//         const books = await bookAPI.getBooks(params)
//         return { books: books?.data?.data || books?.data || books || [] }
//       case 'audio':
//         const audio = await audioAPI.getAudioItems(params)
//         return { audio: audio?.data?.data || audio?.data || audio || [] }
//       case 'videos':
//         const videos = await videoAPI.getVideos(params)
//         return { videos: videos?.data?.data || videos?.data || videos || [] }
//       default:
//         return fetchAllResults()
//     }
//   }

//   const { data, isLoading, error, refetch } = useQuery({
//     queryKey: ['explore', activeTab, debouncedQuery, selectedFilters],
//     queryFn: fetchFilteredResults,
//     enabled: true,
//     staleTime: 30000
//   })

//   // Extract data based on active tab
//   const results = {
//     poems: data?.poems || [],
//     authors: data?.authors || [],
//     books: data?.books || [],
//     audio: data?.audio || [],
//     videos: data?.videos || [],
//   }

//   const totalResults = 
//     results.poems.length + 
//     results.authors.length + 
//     results.books.length + 
//     results.audio.length + 
//     results.videos.length

//   const handleTabChange = (tabId) => {
//     setActiveTab(tabId)
//     setSelectedFilters([])
//     setSearchParams({ tab: tabId, ...(searchQuery && { q: searchQuery }) })
//   }

//   const handleFilterToggle = (filter) => {
//     setSelectedFilters(prev => 
//       prev.includes(filter) 
//         ? prev.filter(f => f !== filter)
//         : [...prev, filter]
//     )
//   }

//   const clearFilters = () => {
//     setSelectedFilters([])
//     setSearchQuery('')
//     setDebouncedQuery('')
//     setSearchParams({ tab: activeTab })
//   }

//   const renderContent = () => {
//     if (activeTab === 'all') {
//       return (
//         <div className="space-y-8">
//           {/* Poems Section */}
//           {results.poems.length > 0 && (
//             <div>
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//                   <span>📖</span> Poetry
//                 </h2>
//                 <button 
//                   onClick={() => handleTabChange('poetry')}
//                   className="text-sm text-primary-600 hover:text-primary-700"
//                 >
//                   View All →
//                 </button>
//               </div>
//               <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
//                 {results.poems.slice(0, 4).map((item) => (
//                   <ContentCard key={item._id} item={item} type="poem" />
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Authors Section */}
//           {results.authors.length > 0 && (
//             <div>
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//                   <span>👤</span> Authors
//                 </h2>
//                 <button 
//                   onClick={() => handleTabChange('authors')}
//                   className="text-sm text-primary-600 hover:text-primary-700"
//                 >
//                   View All →
//                 </button>
//               </div>
//               <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
//                 {results.authors.slice(0, 4).map((item) => (
//                   <ContentCard key={item._id} item={item} type="author" />
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Books Section */}
//           {results.books.length > 0 && (
//             <div>
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//                   <span>📚</span> Books
//                 </h2>
//                 <button 
//                   onClick={() => handleTabChange('books')}
//                   className="text-sm text-primary-600 hover:text-primary-700"
//                 >
//                   View All →
//                 </button>
//               </div>
//               <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
//                 {results.books.slice(0, 4).map((item) => (
//                   <ContentCard key={item._id} item={item} type="book" />
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Audio Section */}
//           {results.audio.length > 0 && (
//             <div>
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//                   <span>🎵</span> Audio
//                 </h2>
//                 <button 
//                   onClick={() => handleTabChange('audio')}
//                   className="text-sm text-primary-600 hover:text-primary-700"
//                 >
//                   View All →
//                 </button>
//               </div>
//               <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
//                 {results.audio.slice(0, 4).map((item) => (
//                   <ContentCard key={item._id} item={item} type="audio" />
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Videos Section */}
//           {results.videos.length > 0 && (
//             <div>
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//                   <span>🎬</span> Videos
//                 </h2>
//                 <button 
//                   onClick={() => handleTabChange('videos')}
//                   className="text-sm text-primary-600 hover:text-primary-700"
//                 >
//                   View All →
//                 </button>
//               </div>
//               <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
//                 {results.videos.slice(0, 4).map((item) => (
//                   <ContentCard key={item._id} item={item} type="video" />
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )
//     }

//     // Single tab view
//     const items = results[activeTab] || []
//     const typeMap = {
//       poetry: 'poem',
//       authors: 'author',
//       books: 'book',
//       audio: 'audio',
//       videos: 'video',
//     }

//     if (items.length === 0 && !isLoading) {
//       return (
//         <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
//           <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
//           <p className="text-gray-500">
//             {searchQuery 
//               ? `No ${activeTab} matching "${searchQuery}" found. Try a different search term.`
//               : `No ${activeTab} available yet.`}
//           </p>
//           {searchQuery && (
//             <button 
//               onClick={() => setSearchQuery('')}
//               className="mt-4 text-primary-600 hover:text-primary-700"
//             >
//               Clear search
//             </button>
//           )}
//         </div>
//       )
//     }

//     return (
//       <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
//         {items.map((item) => (
//           <ContentCard key={item._id} item={item} type={typeMap[activeTab]} />
//         ))}
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
//             {t('common.explore', 'Explore')}
//           </h1>
//           <p className="text-gray-500">
//             Discover literary treasures across genres and eras
//           </p>
//         </div>

//         {/* Search & Controls */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search poetry, authors, books, audio, videos..."
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
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg transition-colors ${
//                 showFilters ? 'border-primary-500 bg-primary-50 text-primary-600' : 'border-gray-300 hover:bg-gray-50 text-gray-600'
//               }`}
//             >
//               <SlidersHorizontal className="h-5 w-5" />
//               <span>Filters</span>
//               {selectedFilters.length > 0 && (
//                 <span className="ml-1 px-1.5 py-0.5 bg-primary-600 text-white text-xs rounded-full">
//                   {selectedFilters.length}
//                 </span>
//               )}
//             </button>
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

//         {/* Results Count */}
//         {debouncedQuery && (
//           <div className="mb-4 text-sm text-gray-500">
//             Found {totalResults} result{totalResults !== 1 ? 's' : ''} for "{debouncedQuery}"
//           </div>
//         )}

//         {/* Tabs */}
//         <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-6 pb-2">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => handleTabChange(tab.id)}
//               className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//                 activeTab === tab.id
//                   ? 'bg-primary-600 text-white'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               <span>{tab.icon}</span>
//               <span>{tab.label}</span>
//             </button>
//           ))}
//         </div>

//         {/* Filters Panel */}
//         {showFilters && activeTab !== 'all' && filters[activeTab] && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: 'auto', opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             className="mb-6 p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
//           >
//             <div className="flex items-center justify-between mb-3">
//               <h4 className="text-sm font-medium text-gray-700">Filter by category</h4>
//               {selectedFilters.length > 0 && (
//                 <button
//                   onClick={() => setSelectedFilters([])}
//                   className="text-xs text-red-600 hover:text-red-700"
//                 >
//                   Clear all
//                 </button>
//               )}
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {filters[activeTab].map((filter) => (
//                 <button
//                   key={filter}
//                   onClick={() => handleFilterToggle(filter)}
//                   className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
//                     selectedFilters.includes(filter)
//                       ? 'bg-primary-600 text-white'
//                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }`}
//                 >
//                   {filter}
//                 </button>
//               ))}
//             </div>
//           </motion.div>
//         )}

//         {/* Loading State */}
//         {isLoading && (
//           <div className="flex items-center justify-center py-12">
//             <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//           </div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="text-center py-12">
//             <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
//             <p className="text-gray-500">Failed to load results. Please try again.</p>
//             <button onClick={() => refetch()} className="mt-4 btn-primary">
//               Try Again
//             </button>
//           </div>
//         )}

//         {/* Content */}
//         {!isLoading && !error && renderContent()}
//       </div>
//     </div>
//   )
// }

// export default ExplorePage








// // client/src/pages/public/ExplorePage.jsx
// import React, { useState, useEffect, useCallback, useRef } from 'react'
// import { useTranslation } from 'react-i18next'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useNavigate, useSearchParams, Link } from 'react-router-dom'
// import { Search, Filter, Grid, List, SlidersHorizontal, X, Loader2, AlertCircle, TrendingUp, Clock } from 'lucide-react'
// import { useQuery } from '@tanstack/react-query'
// import searchAPI from '../../api/searchAPI'
// import ContentCard from '../../components/common/ContentCard'

// const tabs = [
//   { id: 'all', label: 'All', icon: '🔍', color: 'primary' },
//   { id: 'poetry', label: 'Poetry', icon: '📖', color: 'blue' },
//   { id: 'authors', label: 'Authors', icon: '👤', color: 'green' },
//   { id: 'books', label: 'Books', icon: '📚', color: 'purple' },
//   { id: 'audio', label: 'Audio', icon: '🎵', color: 'orange' },
//   { id: 'videos', label: 'Videos', icon: '🎬', color: 'red' },
// ]

// const filters = {
//   poetry: ['Ghazal', 'Nazm', 'Sher', 'Rubai', 'Rekhti', 'Qasida', 'Marsiya', 'Nauha', 'Soz', 'Salam'],
//   authors: ['Classical', 'Modern', 'Contemporary', 'Female', 'Sufi', 'Urdu', 'Persian'],
//   books: ['Ebook', 'Journal', 'Magazine', 'Rare', 'Manuscript', 'Poetry Collection', 'Prose'],
//   audio: ['Nauha', 'Marsiya', 'Majlis', 'Naat', 'Hamd', 'Manqabat', 'Ghazal', 'Nazm', 'Podcast', 'Mushaira'],
//   videos: ['Mushaira', 'Majlis', 'Documentary', 'Interview', 'Lecture', 'Performance', 'Karbala', 'Azadari'],
// }

// const ExplorePage = () => {
//   const { t } = useTranslation()
//   const navigate = useNavigate()
//   const [searchParams, setSearchParams] = useSearchParams()
//   const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'all')
//   const [viewMode, setViewMode] = useState('grid')
//   const [showFilters, setShowFilters] = useState(false)
//   const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
//   const [selectedFilters, setSelectedFilters] = useState([])
//   const [debouncedQuery, setDebouncedQuery] = useState(searchQuery)
//   const [suggestions, setSuggestions] = useState([])
//   const [showSuggestions, setShowSuggestions] = useState(false)
//   const [trendingSearches, setTrendingSearches] = useState([])
//   const [recentSearches, setRecentSearches] = useState([])
//   const inputRef = useRef(null)

//   // Load trending searches
//   useEffect(() => {
//     const loadTrending = async () => {
//       try {
//         const response = await searchAPI.getTrendingSearches()
//         setTrendingSearches(response?.data || response || [])
//       } catch (error) {
//         console.error('Error loading trending searches:', error)
//       }
//     }
//     loadTrending()
    
//     // Load recent searches from localStorage
//     const saved = localStorage.getItem('recentSearches')
//     if (saved) {
//       setRecentSearches(JSON.parse(saved).slice(0, 5))
//     }
//   }, [])

//   // Save search to recent searches
//   const saveRecentSearch = (query) => {
//     if (!query || query.length < 2) return
//     const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5)
//     setRecentSearches(updated)
//     localStorage.setItem('recentSearches', JSON.stringify(updated))
//   }

//   // Debounce search query
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedQuery(searchQuery)
//       if (searchQuery && searchQuery.length >= 2) {
//         setSearchParams({ q: searchQuery, tab: activeTab })
//         saveRecentSearch(searchQuery)
//       } else if (!searchQuery) {
//         setSearchParams({ tab: activeTab })
//       }
//     }, 500)
//     return () => clearTimeout(timer)
//   }, [searchQuery, activeTab, setSearchParams])

//   // Fetch suggestions
//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       if (searchQuery.length >= 2) {
//         try {
//           const response = await searchAPI.getSuggestions(searchQuery)
//           setSuggestions(response?.data || response || [])
//           setShowSuggestions(true)
//         } catch (error) {
//           console.error('Error fetching suggestions:', error)
//         }
//       } else {
//         setSuggestions([])
//         setShowSuggestions(false)
//       }
//     }
//     const timer = setTimeout(fetchSuggestions, 300)
//     return () => clearTimeout(timer)
//   }, [searchQuery])

//   // Fetch search results
//   const fetchSearchResults = async () => {
//     if (!debouncedQuery || debouncedQuery.length < 2) {
//       return { poems: [], authors: [], books: [], audio: [], videos: [] }
//     }

//     try {
//       const params = {
//         q: debouncedQuery,
//         limit: 20,
//         ...(selectedFilters.length > 0 && { genre: selectedFilters.join(',') })
//       }

//       let response
//       switch (activeTab) {
//         case 'poetry':
//           response = await searchAPI.searchPoems(debouncedQuery, { limit: 20, genre: selectedFilters.join(',') })
//           return { poems: response?.data?.data || response?.data || response || [] }
//         case 'authors':
//           response = await searchAPI.searchAuthors(debouncedQuery, { limit: 20 })
//           return { authors: response?.data?.data || response?.data || response || [] }
//         case 'books':
//           response = await searchAPI.searchBooks(debouncedQuery, { limit: 20 })
//           return { books: response?.data?.data || response?.data || response || [] }
//         case 'audio':
//           response = await searchAPI.searchAudio(debouncedQuery, { limit: 20 })
//           return { audio: response?.data?.data || response?.data || response || [] }
//         case 'videos':
//           response = await searchAPI.searchVideos(debouncedQuery, { limit: 20 })
//           return { videos: response?.data?.data || response?.data || response || [] }
//         default:
//           response = await searchAPI.search(debouncedQuery, 'all', { limit: 20 })
//           return {
//             poems: response?.data?.poems || response?.poems || [],
//             authors: response?.data?.authors || response?.authors || [],
//             books: response?.data?.books || response?.books || [],
//             audio: response?.data?.audio || response?.audio || [],
//             videos: response?.data?.videos || response?.videos || [],
//           }
//       }
//     } catch (error) {
//       console.error('Search error:', error)
//       return activeTab === 'poetry' ? { poems: [] } :
//              activeTab === 'authors' ? { authors: [] } :
//              activeTab === 'books' ? { books: [] } :
//              activeTab === 'audio' ? { audio: [] } :
//              activeTab === 'videos' ? { videos: [] } :
//              { poems: [], authors: [], books: [], audio: [], videos: [] }
//     }
//   }

//   const { data, isLoading, error, refetch } = useQuery({
//     queryKey: ['explore', activeTab, debouncedQuery, selectedFilters],
//     queryFn: fetchSearchResults,
//     enabled: true,
//     staleTime: 30000,
//   })

//   const results = {
//     poems: data?.poems || [],
//     authors: data?.authors || [],
//     books: data?.books || [],
//     audio: data?.audio || [],
//     videos: data?.videos || [],
//   }

//   const totalResults = 
//     results.poems.length + 
//     results.authors.length + 
//     results.books.length + 
//     results.audio.length + 
//     results.videos.length

//   const handleTabChange = (tabId) => {
//     setActiveTab(tabId)
//     setSelectedFilters([])
//     setSearchParams({ tab: tabId, ...(searchQuery && { q: searchQuery }) })
//   }

//   const handleFilterToggle = (filter) => {
//     setSelectedFilters(prev => 
//       prev.includes(filter) 
//         ? prev.filter(f => f !== filter)
//         : [...prev, filter]
//     )
//   }

//   const clearFilters = () => {
//     setSelectedFilters([])
//     setSearchQuery('')
//     setDebouncedQuery('')
//     setSearchParams({ tab: activeTab })
//   }

//   const handleSuggestionClick = (suggestion) => {
//     setSearchQuery(suggestion.title)
//     setShowSuggestions(false)
//     inputRef.current?.focus()
//   }

//   const handleTrendingClick = (term) => {
//     setSearchQuery(term)
//     setDebouncedQuery(term)
//     setSearchParams({ q: term, tab: activeTab })
//   }

//   const renderContent = () => {
//     if (activeTab === 'all') {
//       const sections = [
//         { key: 'poems', title: 'Poetry', icon: '📖', data: results.poems, type: 'poem', color: 'blue' },
//         { key: 'authors', title: 'Authors', icon: '👤', data: results.authors, type: 'author', color: 'green' },
//         { key: 'books', title: 'Books', icon: '📚', data: results.books, type: 'book', color: 'purple' },
//         { key: 'audio', title: 'Audio', icon: '🎵', data: results.audio, type: 'audio', color: 'orange' },
//         { key: 'videos', title: 'Videos', icon: '🎬', data: results.videos, type: 'video', color: 'red' },
//       ]

//       return (
//         <div className="space-y-8">
//           {sections.map((section) => (
//             section.data.length > 0 && (
//               <div key={section.key}>
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//                     <span>{section.icon}</span> {section.title}
//                   </h2>
//                   <button 
//                     onClick={() => handleTabChange(section.key)}
//                     className="text-sm text-primary-600 hover:text-primary-700"
//                   >
//                     View All →
//                   </button>
//                 </div>
//                 <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
//                   {section.data.slice(0, 4).map((item) => (
//                     <ContentCard key={item._id} item={item} type={section.type} />
//                   ))}
//                 </div>
//               </div>
//             )
//           ))}
//           {totalResults === 0 && !isLoading && debouncedQuery && (
//             <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
//               <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
//               <p className="text-gray-500">
//                 No content matching "{debouncedQuery}" found. Try a different search term.
//               </p>
//             </div>
//           )}
//         </div>
//       )
//     }

//     const items = results[activeTab] || []
//     const typeMap = {
//       poetry: 'poem',
//       authors: 'author',
//       books: 'book',
//       audio: 'audio',
//       videos: 'video',
//     }

//     if (items.length === 0 && !isLoading && debouncedQuery) {
//       return (
//         <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
//           <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
//           <p className="text-gray-500">
//             No {activeTab} matching "{debouncedQuery}" found. Try a different search term.
//           </p>
//           {searchQuery && (
//             <button 
//               onClick={() => setSearchQuery('')}
//               className="mt-4 text-primary-600 hover:text-primary-700"
//             >
//               Clear search
//             </button>
//           )}
//         </div>
//       )
//     }

//     if (items.length === 0 && !isLoading && !debouncedQuery) {
//       return (
//         <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
//           <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">Start exploring</h3>
//           <p className="text-gray-500">
//             Enter a search term above to discover {activeTab} content.
//           </p>
//         </div>
//       )
//     }

//     return (
//       <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
//         {items.map((item) => (
//           <ContentCard key={item._id} item={item} type={typeMap[activeTab]} />
//         ))}
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
//             {t('common.explore', 'Explore')}
//           </h1>
//           <p className="text-gray-500">
//             Discover literary treasures across poetry, authors, books, audio, and videos
//           </p>
//         </div>

//         {/* Search Bar with Suggestions */}
//         <div className="mb-6">
//           <div className="relative">
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <input
//               ref={inputRef}
//               type="text"
//               placeholder="Search poetry, authors, books, audio, videos..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
//               onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
//               className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white shadow-sm text-base"
//             />
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery('')}
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             )}
            
//             {/* Suggestions Dropdown */}
//             <AnimatePresence>
//               {showSuggestions && suggestions.length > 0 && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto"
//                 >
//                   {suggestions.map((suggestion, index) => (
//                     <button
//                       key={index}
//                       onClick={() => handleSuggestionClick(suggestion)}
//                       className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 last:border-0"
//                     >
//                       <span className="text-xl">{suggestion.type === 'poem' ? '📖' : '👤'}</span>
//                       <div className="flex-1">
//                         <p className="text-sm font-medium text-gray-900">{suggestion.title}</p>
//                         <p className="text-xs text-gray-500 capitalize">{suggestion.type}</p>
//                       </div>
//                       <Search className="h-4 w-4 text-gray-400" />
//                     </button>
//                   ))}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>

//         {/* Trending and Recent Searches */}
//         {(trendingSearches.length > 0 || recentSearches.length > 0) && !searchQuery && (
//           <div className="mb-6 flex flex-wrap gap-6">
//             {trendingSearches.length > 0 && (
//               <div>
//                 <div className="flex items-center gap-2 mb-2">
//                   <TrendingUp className="h-4 w-4 text-orange-500" />
//                   <span className="text-xs font-medium text-gray-500">Trending</span>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {trendingSearches.slice(0, 5).map((term, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => handleTrendingClick(term)}
//                       className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
//                     >
//                       {term}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//             {recentSearches.length > 0 && (
//               <div>
//                 <div className="flex items-center gap-2 mb-2">
//                   <Clock className="h-4 w-4 text-blue-500" />
//                   <span className="text-xs font-medium text-gray-500">Recent</span>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {recentSearches.map((term, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => handleTrendingClick(term)}
//                       className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
//                     >
//                       {term}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Results Count */}
//         {debouncedQuery && totalResults > 0 && (
//           <div className="mb-4 text-sm text-gray-500">
//             Found {totalResults} result{totalResults !== 1 ? 's' : ''} for "{debouncedQuery}"
//           </div>
//         )}

//         {/* Tabs */}
//         <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-6 pb-2">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => handleTabChange(tab.id)}
//               className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//                 activeTab === tab.id
//                   ? 'bg-primary-600 text-white'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               <span>{tab.icon}</span>
//               <span>{tab.label}</span>
//               {activeTab === tab.id && selectedFilters.length > 0 && (
//                 <span className="ml-1 px-1.5 py-0.5 bg-white/20 text-white text-xs rounded-full">
//                   {selectedFilters.length}
//                 </span>
//               )}
//             </button>
//           ))}
//         </div>

//         {/* Filters Panel */}
//         {showFilters && activeTab !== 'all' && filters[activeTab] && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: 'auto', opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             className="mb-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm"
//           >
//             <div className="flex items-center justify-between mb-3">
//               <h4 className="text-sm font-medium text-gray-700">Filter by category</h4>
//               {selectedFilters.length > 0 && (
//                 <button
//                   onClick={() => setSelectedFilters([])}
//                   className="text-xs text-red-600 hover:text-red-700"
//                 >
//                   Clear all
//                 </button>
//               )}
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {filters[activeTab].map((filter) => (
//                 <button
//                   key={filter}
//                   onClick={() => handleFilterToggle(filter)}
//                   className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
//                     selectedFilters.includes(filter)
//                       ? 'bg-primary-600 text-white'
//                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }`}
//                 >
//                   {filter}
//                 </button>
//               ))}
//             </div>
//           </motion.div>
//         )}

//         {/* Filter Toggle Button (Mobile) */}
//         {activeTab !== 'all' && filters[activeTab] && (
//           <div className="mb-4 md:hidden">
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className="flex items-center gap-2 text-sm text-gray-600"
//             >
//               <SlidersHorizontal className="h-4 w-4" />
//               {showFilters ? 'Hide Filters' : 'Show Filters'}
//             </button>
//           </div>
//         )}

//         {/* View Mode Toggle (Mobile) */}
//         <div className="flex justify-end mb-4 md:hidden">
//           <div className="flex border border-gray-300 rounded-lg overflow-hidden">
//             <button
//               onClick={() => setViewMode('grid')}
//               className={`p-2 ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'text-gray-600'}`}
//             >
//               <Grid className="h-4 w-4" />
//             </button>
//             <button
//               onClick={() => setViewMode('list')}
//               className={`p-2 ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'text-gray-600'}`}
//             >
//               <List className="h-4 w-4" />
//             </button>
//           </div>
//         </div>

//         {/* Loading State */}
//         {isLoading && (
//           <div className="flex items-center justify-center py-12">
//             <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//           </div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="text-center py-12">
//             <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
//             <p className="text-gray-500">Failed to load results. Please try again.</p>
//             <button onClick={() => refetch()} className="mt-4 btn-primary">
//               Try Again
//             </button>
//           </div>
//         )}

//         {/* Content */}
//         {!isLoading && !error && renderContent()}
//       </div>
//     </div>
//   )
// }

// export default ExplorePage















// client/src/pages/public/ExplorePage.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { Search, Filter, Grid, List, SlidersHorizontal, X, Loader2, AlertCircle, TrendingUp, Clock, Mic, MicOff, Sparkles } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import searchAPI from '../../api/searchAPI'
import ContentCard from '../../components/common/ContentCard'

const tabs = [
  { id: 'all', label: 'All', icon: '🔍', color: 'primary' },
  { id: 'poetry', label: 'Poetry', icon: '📖', color: 'blue' },
  { id: 'authors', label: 'Authors', icon: '👤', color: 'green' },
  { id: 'books', label: 'Books', icon: '📚', color: 'purple' },
  { id: 'audio', label: 'Audio', icon: '🎵', color: 'orange' },
  { id: 'videos', label: 'Videos', icon: '🎬', color: 'red' },
]

const filters = {
  poetry: ['Ghazal', 'Nazm', 'Sher', 'Rubai', 'Rekhti', 'Qasida', 'Marsiya', 'Nauha', 'Soz', 'Salam'],
  authors: ['Classical', 'Modern', 'Contemporary', 'Female', 'Sufi', 'Urdu', 'Persian'],
  books: ['Ebook', 'Journal', 'Magazine', 'Rare', 'Manuscript', 'Poetry Collection', 'Prose'],
  audio: ['Nauha', 'Marsiya', 'Majlis', 'Naat', 'Hamd', 'Manqabat', 'Ghazal', 'Nazm', 'Podcast', 'Mushaira'],
  videos: ['Mushaira', 'Majlis', 'Documentary', 'Interview', 'Lecture', 'Performance', 'Karbala', 'Azadari'],
}

const ExplorePage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'all')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [selectedFilters, setSelectedFilters] = useState([])
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery)
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [trendingSearches, setTrendingSearches] = useState([])
  const [recentSearches, setRecentSearches] = useState([])
  const [isListening, setIsListening] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(true)
  const [isAISearch, setIsAISearch] = useState(false)
  const [recognition, setRecognition] = useState(null)
  const inputRef = useRef(null)

  // Initialize speech recognition
  useEffect(() => {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()
      recognitionInstance.continuous = false
      recognitionInstance.interimResults = false
      recognitionInstance.lang = 'en-US' // Can be changed based on user preference
      setRecognition(recognitionInstance)
      setVoiceSupported(true)
    } else {
      setVoiceSupported(false)
      console.warn('Speech recognition not supported in this browser')
    }
  }, [])

  // Load trending searches
  useEffect(() => {
    const loadTrending = async () => {
      try {
        const response = await searchAPI.getTrendingSearches()
        setTrendingSearches(response?.data || response || [])
      } catch (error) {
        console.error('Error loading trending searches:', error)
      }
    }
    loadTrending()
    
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches')
    if (saved) {
      setRecentSearches(JSON.parse(saved).slice(0, 5))
    }
  }, [])

  // Save search to recent searches
  const saveRecentSearch = (query) => {
    if (!query || query.length < 2) return
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem('recentSearches', JSON.stringify(updated))
  }

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
      if (searchQuery && searchQuery.length >= 2) {
        setSearchParams({ q: searchQuery, tab: activeTab })
        saveRecentSearch(searchQuery)
      } else if (!searchQuery) {
        setSearchParams({ tab: activeTab })
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [searchQuery, activeTab, setSearchParams])

  // Fetch suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length >= 2) {
        try {
          const response = await searchAPI.getSuggestions(searchQuery)
          setSuggestions(response?.data || response || [])
          setShowSuggestions(true)
        } catch (error) {
          console.error('Error fetching suggestions:', error)
        }
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
    }
    const timer = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Voice search handler
  const handleVoiceSearch = useCallback(() => {
    if (!recognition) {
      alert('Voice search is not supported in your browser. Please try Chrome, Edge, or Safari.')
      return
    }

    if (isListening) {
      recognition.stop()
      setIsListening(false)
      return
    }

    try {
      setIsListening(true)
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        console.log('Voice transcript:', transcript)
        setSearchQuery(transcript)
        setDebouncedQuery(transcript)
        saveRecentSearch(transcript)
        setIsListening(false)
      }
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        let errorMessage = 'Voice search failed. '
        if (event.error === 'not-allowed') {
          errorMessage += 'Please allow microphone access.'
        } else if (event.error === 'no-speech') {
          errorMessage += 'No speech detected. Please try again.'
        } else {
          errorMessage += 'Please try typing your search.'
        }
        alert(errorMessage)
        setIsListening(false)
      }
      
      recognition.onend = () => {
        setIsListening(false)
      }
      
      recognition.start()
    } catch (error) {
      console.error('Voice search error:', error)
      alert('Voice search failed. Please type your search.')
      setIsListening(false)
    }
  }, [recognition, isListening, saveRecentSearch])

  // AI Semantic Search
  const handleAISearch = async () => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      alert('Please enter a search term first')
      return
    }
    
    setIsAISearch(true)
    try {
      const searchType = activeTab === 'all' ? 'all' : activeTab.slice(0, -1)
      const response = await searchAPI.semanticSearch(debouncedQuery, searchType)
      
      if (response?.results && response.results.length > 0) {
        // Process AI search results
        console.log('AI Search Results:', response.results)
        
        // You can show a toast or notification that AI search is being used
        const aiMessage = document.createElement('div')
        aiMessage.className = 'fixed bottom-4 right-4 bg-primary-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in'
        aiMessage.textContent = `AI found ${response.results.length} relevant results for "${debouncedQuery}"`
        document.body.appendChild(aiMessage)
        setTimeout(() => aiMessage.remove(), 3000)
      } else {
        // Fall back to regular search if no AI results
        refetch()
      }
    } catch (error) {
      console.error('AI search error:', error)
      // Fall back to regular search
      refetch()
    } finally {
      setIsAISearch(false)
    }
  }

  // Fetch search results
  const fetchSearchResults = async () => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      return { poems: [], authors: [], books: [], audio: [], videos: [] }
    }

    try {
      const params = {
        limit: 20,
        ...(selectedFilters.length > 0 && { genre: selectedFilters.join(',') })
      }

      let response
      switch (activeTab) {
        case 'poetry':
          response = await searchAPI.searchPoems(debouncedQuery, params)
          return { poems: response?.data?.data || response?.data || response || [] }
        case 'authors':
          response = await searchAPI.searchAuthors(debouncedQuery, params)
          return { authors: response?.data?.data || response?.data || response || [] }
        case 'books':
          response = await searchAPI.searchBooks(debouncedQuery, params)
          return { books: response?.data?.data || response?.data || response || [] }
        case 'audio':
          response = await searchAPI.searchAudio(debouncedQuery, params)
          return { audio: response?.data?.data || response?.data || response || [] }
        case 'videos':
          response = await searchAPI.searchVideos(debouncedQuery, params)
          return { videos: response?.data?.data || response?.data || response || [] }
        default:
          response = await searchAPI.search(debouncedQuery, 'all', params)
          return {
            poems: response?.data?.poems || response?.poems || [],
            authors: response?.data?.authors || response?.authors || [],
            books: response?.data?.books || response?.books || [],
            audio: response?.data?.audio || response?.audio || [],
            videos: response?.data?.videos || response?.videos || [],
          }
      }
    } catch (error) {
      console.error('Search error:', error)
      return activeTab === 'poetry' ? { poems: [] } :
             activeTab === 'authors' ? { authors: [] } :
             activeTab === 'books' ? { books: [] } :
             activeTab === 'audio' ? { audio: [] } :
             activeTab === 'videos' ? { videos: [] } :
             { poems: [], authors: [], books: [], audio: [], videos: [] }
    }
  }

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['explore', activeTab, debouncedQuery, selectedFilters],
    queryFn: fetchSearchResults,
    enabled: true,
    staleTime: 30000,
  })

  const results = {
    poems: data?.poems || [],
    authors: data?.authors || [],
    books: data?.books || [],
    audio: data?.audio || [],
    videos: data?.videos || [],
  }

  const totalResults = 
    results.poems.length + 
    results.authors.length + 
    results.books.length + 
    results.audio.length + 
    results.videos.length

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    setSelectedFilters([])
    setSearchParams({ tab: tabId, ...(searchQuery && { q: searchQuery }) })
  }

  const handleFilterToggle = (filter) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  const clearFilters = () => {
    setSelectedFilters([])
    setSearchQuery('')
    setDebouncedQuery('')
    setSearchParams({ tab: activeTab })
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.title)
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  const handleTrendingClick = (term) => {
    setSearchQuery(term)
    setDebouncedQuery(term)
    setSearchParams({ q: term, tab: activeTab })
  }

  const renderContent = () => {
    if (activeTab === 'all') {
      const sections = [
        { key: 'poems', title: 'Poetry', icon: '📖', data: results.poems, type: 'poem', color: 'blue' },
        { key: 'authors', title: 'Authors', icon: '👤', data: results.authors, type: 'author', color: 'green' },
        { key: 'books', title: 'Books', icon: '📚', data: results.books, type: 'book', color: 'purple' },
        { key: 'audio', title: 'Audio', icon: '🎵', data: results.audio, type: 'audio', color: 'orange' },
        { key: 'videos', title: 'Videos', icon: '🎬', data: results.videos, type: 'video', color: 'red' },
      ]

      return (
        <div className="space-y-8">
          {sections.map((section) => (
            section.data.length > 0 && (
              <div key={section.key}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <span>{section.icon}</span> {section.title}
                  </h2>
                  <button 
                    onClick={() => handleTabChange(section.key)}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    View All →
                  </button>
                </div>
                <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                  {section.data.slice(0, 4).map((item) => (
                    <ContentCard key={item._id} item={item} type={section.type} />
                  ))}
                </div>
              </div>
            )
          ))}
          {totalResults === 0 && !isLoading && debouncedQuery && (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-500">
                No content matching "{debouncedQuery}" found. Try a different search term.
              </p>
            </div>
          )}
        </div>
      )
    }

    const items = results[activeTab] || []
    const typeMap = {
      poetry: 'poem',
      authors: 'author',
      books: 'book',
      audio: 'audio',
      videos: 'video',
    }

    if (items.length === 0 && !isLoading && debouncedQuery) {
      return (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-500">
            No {activeTab} matching "{debouncedQuery}" found. Try a different search term.
          </p>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 text-primary-600 hover:text-primary-700"
            >
              Clear search
            </button>
          )}
        </div>
      )
    }

    if (items.length === 0 && !isLoading && !debouncedQuery) {
      return (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Start exploring</h3>
          <p className="text-gray-500">
            Enter a search term above to discover {activeTab} content.
          </p>
        </div>
      )
    }

    return (
      <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
        {items.map((item) => (
          <ContentCard key={item._id} item={item} type={typeMap[activeTab]} />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {t('common.explore', 'Explore')}
          </h1>
          <p className="text-gray-500">
            Discover literary treasures across poetry, authors, books, audio, and videos
          </p>
        </div>

        {/* Search Bar with Voice and AI */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder={voiceSupported ? "Search poetry, authors, books, audio, videos... (Try voice search 🎤)" : "Search poetry, authors, books, audio, videos..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              onKeyPress={(e) => e.key === 'Enter' && handleAISearch()}
              className="w-full pl-12 pr-32 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white shadow-sm text-base"
            />
            
            {/* Voice Search Button */}
            {voiceSupported && (
              <button
                onClick={handleVoiceSearch}
                className={`absolute right-24 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-200 ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse shadow-lg' 
                    : 'text-gray-400 hover:text-primary-600 hover:bg-primary-50'
                }`}
                title="Voice Search"
              >
                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>
            )}
            
            {/* AI Search Button */}
            <button
              onClick={handleAISearch}
              disabled={!debouncedQuery || debouncedQuery.length < 2 || isAISearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full text-primary-600 hover:bg-primary-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="AI Semantic Search"
            >
              {isAISearch ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Sparkles className="h-5 w-5" />
              )}
            </button>
            
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-48 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
            
            {/* Voice Recording Indicator */}
            {isListening && (
              <div className="absolute -bottom-8 left-0 right-0 text-center">
                <span className="text-xs text-red-500 animate-pulse">
                  🎤 Listening... Speak now
                </span>
              </div>
            )}
            
            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto"
                >
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 last:border-0 transition-colors"
                    >
                      <span className="text-xl">
                        {suggestion.type === 'poem' ? '📖' : suggestion.type === 'author' ? '👤' : '🎵'}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{suggestion.title}</p>
                        <p className="text-xs text-gray-500">{suggestion.category || suggestion.type}</p>
                      </div>
                      <Search className="h-4 w-4 text-gray-400" />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Trending and Recent Searches */}
        {(trendingSearches.length > 0 || recentSearches.length > 0) && !searchQuery && (
          <div className="mb-6 flex flex-wrap gap-6">
            {trendingSearches.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-orange-500" />
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Trending</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.slice(0, 5).map((term, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleTrendingClick(typeof term === 'string' ? term : term.term)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                    >
                      {typeof term === 'string' ? term : term.term}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Recent</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleTrendingClick(term)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Results Count */}
        {debouncedQuery && totalResults > 0 && (
          <div className="mb-4 text-sm text-gray-500">
            Found {totalResults} result{totalResults !== 1 ? 's' : ''} for "{debouncedQuery}"
          </div>
        )}

        {/* Tabs */}
        <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-6 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {activeTab === tab.id && selectedFilters.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-white/20 text-white text-xs rounded-full">
                  {selectedFilters.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Filters Panel */}
        {showFilters && activeTab !== 'all' && filters[activeTab] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">Filter by category</h4>
              {selectedFilters.length > 0 && (
                <button
                  onClick={() => setSelectedFilters([])}
                  className="text-xs text-red-600 hover:text-red-700"
                >
                  Clear all
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {filters[activeTab].map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilterToggle(filter)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    selectedFilters.includes(filter)
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Filter Toggle Button (Mobile) */}
        {activeTab !== 'all' && filters[activeTab] && (
          <div className="mb-4 md:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm text-gray-600"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
        )}

        {/* View Mode Toggle (Mobile) */}
        <div className="flex justify-end mb-4 md:hidden">
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'text-gray-600'}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'text-gray-600'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-gray-500">Failed to load results. Please try again.</p>
            <button onClick={() => refetch()} className="mt-4 btn-primary">
              Try Again
            </button>
          </div>
        )}

        {/* Content */}
        {!isLoading && !error && renderContent()}
      </div>
    </div>
  )
}

export default ExplorePage