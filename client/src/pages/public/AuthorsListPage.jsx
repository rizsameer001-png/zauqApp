// //client/src/pages/public/AuthorsListPage.jsx
// import React, { useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { motion } from 'framer-motion'
// import { Search, Users, BookOpen, Heart, Filter } from 'lucide-react'
// import { Link } from 'react-router-dom'
// import { AUTHOR_CATEGORIES } from '../../utils/constants.js'

// const authors = [
//   {
//     id: 1,
//     name: 'Mirza Ghalib',
//     nameUr: 'مرزا غالب',
//     era: 'Classical',
//     category: 'classical',
//     poems: 234,
//     followers: 45000,
//     image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
//     bio: 'The most renowned Urdu and Persian poet of the Mughal era, known for his profound ghazals.',
//   },
//   {
//     id: 2,
//     name: 'Faiz Ahmed Faiz',
//     nameUr: 'فیض احمد فیض',
//     era: 'Modern',
//     category: 'modern',
//     poems: 186,
//     followers: 38000,
//     image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
//     bio: 'Revolutionary poet known for his progressive and humanistic poetry.',
//   },
//   {
//     id: 3,
//     name: 'Allama Iqbal',
//     nameUr: 'علامہ اقبال',
//     era: 'Modern',
//     category: 'modern',
//     poems: 312,
//     followers: 52000,
//     image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
//     bio: 'Philosopher, poet, and politician who inspired the Pakistan Movement.',
//   },
//   {
//     id: 4,
//     name: 'Mir Taqi Mir',
//     nameUr: 'میر تقی میر',
//     era: 'Classical',
//     category: 'classical',
//     poems: 278,
//     followers: 29000,
//     image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
//     bio: 'One of the pioneers of Urdu poetry and the chief poet of his time.',
//   },
//   {
//     id: 5,
//     name: 'Parveen Shakir',
//     nameUr: 'پروین شاکر',
//     era: 'Modern',
//     category: 'female',
//     poems: 156,
//     followers: 34000,
//     image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
//     bio: 'Renowned female poet known for her romantic and feminist poetry.',
//   },
//   {
//     id: 6,
//     name: 'Jaun Elia',
//     nameUr: 'جون ایلیا',
//     era: 'Modern',
//     category: 'trending',
//     poems: 198,
//     followers: 41000,
//     image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
//     bio: 'Pakistani poet known for his unique style and philosophical depth.',
//   },
// ]

// const AuthorsListPage = () => {
//   const { t } = useTranslation()
//   const [activeCategory, setActiveCategory] = useState('all')
//   const [searchQuery, setSearchQuery] = useState('')
//   const [sortBy, setSortBy] = useState('popular')

//   const filteredAuthors = authors.filter((author) => {
//     if (activeCategory !== 'all' && author.category !== activeCategory) return false
//     if (searchQuery && !author.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
//     return true
//   })

//   return (
//     <div className="page-container">
//       <div className="mb-8">
//         <h1 className="section-title">{t('common.authors')}</h1>
//         <p className="section-subtitle">Discover legendary poets and literary figures</p>
//       </div>

//       {/* Search & Filters */}
//       <div className="flex flex-col md:flex-row gap-4 mb-6">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search authors..."
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
//           <option value="poems">Most Poems</option>
//           <option value="followers">Most Followers</option>
//           <option value="name">Name A-Z</option>
//         </select>
//       </div>

//       {/* Category Tabs */}
//       <div className="flex overflow-x-auto space-x-2 mb-6 pb-2">
//         <button
//           onClick={() => setActiveCategory('all')}
//           className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//             activeCategory === 'all'
//               ? 'bg-primary-600 text-white'
//               : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//           }`}
//         >
//           All Authors
//         </button>
//         {AUTHOR_CATEGORIES.map((cat) => (
//           <button
//             key={cat.id}
//             onClick={() => setActiveCategory(cat.id)}
//             className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//               activeCategory === cat.id
//                 ? 'bg-primary-600 text-white'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             {cat.label}
//           </button>
//         ))}
//       </div>

//       {/* Authors Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredAuthors.map((author, index) => (
//           <motion.div
//             key={author.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//           >
//             <Link to={`/authors/${author.id}`} className="card block overflow-hidden group">
//               <div className="p-6">
//                 <div className="flex items-start space-x-4">
//                   <img
//                     src={author.image}
//                     alt={author.name}
//                     className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
//                   />
//                   <div className="flex-1">
//                     <div className="flex items-center justify-between mb-1">
//                       <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
//                         {author.name}
//                       </h3>
//                       <span className="px-2 py-0.5 bg-primary-50 text-primary-700 text-xs rounded-full">
//                         {author.era}
//                       </span>
//                     </div>
//                     <p className="urdu-text text-gray-600 text-sm mb-2">{author.nameUr}</p>
//                     <p className="text-gray-500 text-sm line-clamp-2 mb-3">{author.bio}</p>
//                     <div className="flex items-center space-x-4 text-sm text-gray-500">
//                       <span className="flex items-center space-x-1">
//                         <BookOpen className="h-4 w-4" />
//                         <span>{author.poems} Poems</span>
//                       </span>
//                       <span className="flex items-center space-x-1">
//                         <Users className="h-4 w-4" />
//                         <span>{(author.followers / 1000).toFixed(1)}K</span>
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           </motion.div>
//         ))}
//       </div>

//       {filteredAuthors.length === 0 && (
//         <div className="text-center py-12">
//           <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//           <p className="text-gray-500">No authors found matching your criteria</p>
//         </div>
//       )}
//     </div>
//   )
// }

// export default AuthorsListPage










// // client/src/pages/public/AuthorsListPage.jsx
// import React, { useState, useEffect, useCallback } from 'react'
// import { useTranslation } from 'react-i18next'
// import { useSearchParams, Link } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import { useQuery } from '@tanstack/react-query'
// import { Search, Users, BookOpen, Heart, Filter, Loader2, ChevronLeft, ChevronRight, Eye, UserPlus } from 'lucide-react'
// import authorAPI from '../../api/authorAPI'
// import { AUTHOR_CATEGORIES } from '../../utils/constants.js'

// const AuthorsListPage = () => {
//   const { t } = useTranslation()
//   const [searchParams, setSearchParams] = useSearchParams()
//   const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all')
//   const [searchQuery, setSearchQuery] = useState('')
//   const [sortBy, setSortBy] = useState('popular')
//   const [currentPage, setCurrentPage] = useState(1)
//   const itemsPerPage = 9

//   // Fetch real authors from API
//   const { data: response, isLoading, error, refetch } = useQuery({
//     queryKey: ['authors', currentPage, activeCategory, sortBy],
//     queryFn: () => authorAPI.getAuthors({
//       page: currentPage,
//       limit: itemsPerPage,
//       category: activeCategory !== 'all' ? activeCategory : undefined,
//       search: searchQuery || undefined,
//       sort: sortBy
//     }),
//     enabled: true,
//     staleTime: 30000
//   })

//   // Extract authors and pagination from response
//   const authorsData = response?.data?.data || response?.data || response || []
//   const authors = Array.isArray(authorsData) ? authorsData : []
//   const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 }

//   // Update URL when category changes
//   useEffect(() => {
//     if (activeCategory && activeCategory !== 'all') {
//       setSearchParams({ category: activeCategory })
//     } else {
//       setSearchParams({})
//     }
//     setCurrentPage(1)
//   }, [activeCategory, setSearchParams])

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

//   // Sort options
//   const sortOptions = [
//     { value: 'popular', label: 'Most Popular' },
//     { value: 'poems', label: 'Most Poems' },
//     { value: 'followers', label: 'Most Followers' },
//     { value: 'name', label: 'Name A-Z' }
//   ]

//   // Client-side sorting function (if API doesn't support sorting)
//   const getSortedAuthors = (authorsList) => {
//     switch (sortBy) {
//       case 'poems':
//         return [...authorsList].sort((a, b) => (b.stats?.poemsCount || 0) - (a.stats?.poemsCount || 0))
//       case 'followers':
//         return [...authorsList].sort((a, b) => (b.stats?.followers || 0) - (a.stats?.followers || 0))
//       case 'name':
//         return [...authorsList].sort((a, b) => a.name.localeCompare(b.name))
//       default:
//         return [...authorsList].sort((a, b) => (b.stats?.views || 0) - (a.stats?.views || 0))
//     }
//   }

//   const sortedAuthors = getSortedAuthors(authors)

//   // Get era badge color
//   const getEraColor = (era) => {
//     switch (era?.toLowerCase()) {
//       case 'classical': return 'bg-purple-100 text-purple-700'
//       case 'modern': return 'bg-blue-100 text-blue-700'
//       case 'contemporary': return 'bg-green-100 text-green-700'
//       default: return 'bg-gray-100 text-gray-700'
//     }
//   }

//   // Format follower count
//   const formatFollowers = (count) => {
//     if (!count) return '0'
//     if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
//     if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
//     return count.toString()
//   }

//   // Loading state
//   if (isLoading && authors.length === 0) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-center min-h-[60vh]">
//             <div className="text-center">
//               <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
//               <p className="text-gray-500">Loading authors...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Error state
//   if (error && authors.length === 0) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center py-12">
//             <div className="text-red-500 mb-4">
//               <Users className="h-12 w-12 mx-auto" />
//             </div>
//             <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to load authors</h2>
//             <p className="text-gray-500 mb-6">There was an error loading the authors. Please try again.</p>
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
//             {t('common.authors', 'Literary Authors')}
//           </h1>
//           <p className="text-gray-500">
//             Discover legendary poets and literary figures from Urdu, Hindi, and Persian literature
//           </p>
//         </div>

//         {/* Search & Filters */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search authors by name..."
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

//         {/* Category Tabs */}
//         <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-6 pb-2">
//           <button
//             onClick={() => setActiveCategory('all')}
//             className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//               activeCategory === 'all'
//                 ? 'bg-primary-600 text-white'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             All Authors
//           </button>
//           {AUTHOR_CATEGORIES.map((cat) => (
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
//             Showing {sortedAuthors.length} of {pagination.total || sortedAuthors.length} authors
//           </p>
//         </div>

//         {/* Authors Grid */}
//         {sortedAuthors.length === 0 ? (
//           <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
//             <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No authors found</h3>
//             <p className="text-gray-500">
//               {searchQuery 
//                 ? `No authors matching "${searchQuery}" found. Try a different search term.`
//                 : 'No authors available in this category yet.'}
//             </p>
//             {(searchQuery || activeCategory !== 'all') && (
//               <button
//                 onClick={() => {
//                   setSearchQuery('')
//                   setActiveCategory('all')
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
//               {sortedAuthors.map((author, index) => (
//                 <motion.div
//                   key={author._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                 >
//                   <Link to={`/author/${author.slug}`} className="block">
//                     <div className="bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden group">
//                       <div className="p-6">
//                         <div className="flex items-start space-x-4">
//                           {/* Avatar */}
//                           <div className="flex-shrink-0">
//                             {author.avatar ? (
//                               <img
//                                 src={author.avatar}
//                                 alt={author.name}
//                                 className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
//                               />
//                             ) : (
//                               <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center border-4 border-white shadow-md">
//                                 <span className="text-2xl font-bold text-primary-600">
//                                   {author.name.charAt(0)}
//                                 </span>
//                               </div>
//                             )}
//                           </div>
                          
//                           {/* Info */}
//                           <div className="flex-1 min-w-0">
//                             <div className="flex items-center justify-between mb-1">
//                               <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors truncate">
//                                 {author.name}
//                               </h3>
//                               <span className={`px-2 py-0.5 text-xs rounded-full ${getEraColor(author.era)} capitalize ml-2 flex-shrink-0`}>
//                                 {author.era || 'Classical'}
//                               </span>
//                             </div>
                            
//                             {author.nameUrdu && (
//                               <p className="urdu-text text-gray-600 text-sm mb-2 truncate" dir="rtl">
//                                 {author.nameUrdu}
//                               </p>
//                             )}
                            
//                             <p className="text-gray-500 text-sm line-clamp-2 mb-3">
//                               {author.bio?.substring(0, 100)}...
//                             </p>
                            
//                             {/* Stats */}
//                             <div className="flex items-center justify-between text-sm">
//                               <div className="flex items-center space-x-3 text-gray-500">
//                                 <span className="flex items-center space-x-1">
//                                   <BookOpen className="h-4 w-4" />
//                                   <span>{author.stats?.poemsCount || 0} Poems</span>
//                                 </span>
//                                 <span className="flex items-center space-x-1">
//                                   <Users className="h-4 w-4" />
//                                   <span>{formatFollowers(author.stats?.followers || 0)}</span>
//                                 </span>
//                                 <span className="flex items-center space-x-1">
//                                   <Eye className="h-4 w-4" />
//                                   <span>{formatFollowers(author.stats?.views || 0)}</span>
//                                 </span>
//                               </div>
                              
//                               {/* Verified Badge */}
//                               {author.isVerified && (
//                                 <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
//                                   Verified
//                                 </span>
//                               )}
//                             </div>
                            
//                             {/* Genres */}
//                             {author.genres && author.genres.length > 0 && (
//                               <div className="flex flex-wrap gap-1 mt-3">
//                                 {author.genres.slice(0, 3).map((genre, idx) => (
//                                   <span key={idx} className="text-xs text-gray-400 capitalize">
//                                     {genre}{idx < Math.min(author.genres.length, 3) - 1 ? ',' : ''}
//                                   </span>
//                                 ))}
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Pagination */}
//             {(pagination.totalPages > 1 || Math.ceil(sortedAuthors.length / itemsPerPage) > 1) && (
//               <div className="flex items-center justify-center gap-2 mt-8">
//                 <button
//                   onClick={() => goToPage(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <ChevronLeft className="h-5 w-5 text-gray-600" />
//                 </button>
                
//                 <div className="flex items-center gap-1">
//                   {Array.from({ length: pagination.totalPages || Math.ceil(sortedAuthors.length / itemsPerPage) }, (_, i) => i + 1)
//                     .filter(page => {
//                       const totalPages = pagination.totalPages || Math.ceil(sortedAuthors.length / itemsPerPage)
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
//                   disabled={currentPage === (pagination.totalPages || Math.ceil(sortedAuthors.length / itemsPerPage))}
//                   className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <ChevronRight className="h-5 w-5 text-gray-600" />
//                 </button>
//               </div>
//             )}

//             {/* Loading more indicator */}
//             {isLoading && authors.length > 0 && (
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

// export default AuthorsListPage











// // client/src/pages/public/AuthorsListPage.jsx
// import React, { useState, useEffect, useCallback } from 'react'
// import { useTranslation } from 'react-i18next'
// import { useSearchParams, Link } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import { useQuery } from '@tanstack/react-query'
// import { Search, Users, BookOpen, Heart, Filter, Loader2, ChevronLeft, ChevronRight, Eye, UserPlus, Headphones, Music, Mic } from 'lucide-react'
// import authorAPI from '../../api/authorAPI'
// import { AUTHOR_CATEGORIES } from '../../utils/constants.js'

// const AuthorsListPage = () => {
//   const { t } = useTranslation()
//   const [searchParams, setSearchParams] = useSearchParams()
//   const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all')
//   const [searchQuery, setSearchQuery] = useState('')
//   const [sortBy, setSortBy] = useState('popular')
//   const [currentPage, setCurrentPage] = useState(1)
//   const itemsPerPage = 9

//   // Extended author categories including religious/audio categories
//   const extendedCategories = [
//     ...AUTHOR_CATEGORIES,
//     { id: 'sufi', label: 'Sufi Poets', labelHi: 'सूफ़ी कवि', labelUr: 'صوفی شعراء' },
//     { id: 'marsiya', label: 'Marsiya Writers', labelHi: 'मर्सिया लेखक', labelUr: 'مرثیہ نگار' },
//     { id: 'nauha', label: 'Nauha Reciters', labelHi: 'नौहा ख्वान', labelUr: 'نوحہ خوان' },
//     { id: 'manqabat', label: 'Manqabat Writers', labelHi: 'मनक़बत लेखक', labelUr: 'منقبت نگار' },
//   ]

//   // Fetch real authors from API
//   const { data: response, isLoading, error, refetch } = useQuery({
//     queryKey: ['authors', currentPage, activeCategory, sortBy, searchQuery],
//     queryFn: () => authorAPI.getAuthors({
//       page: currentPage,
//       limit: itemsPerPage,
//       category: activeCategory !== 'all' ? activeCategory : undefined,
//       search: searchQuery || undefined,
//       sort: sortBy
//     }),
//     enabled: true,
//     staleTime: 30000
//   })

//   // Extract authors and pagination from response
//   const authorsData = response?.data?.data || response?.data || response || []
//   const authors = Array.isArray(authorsData) ? authorsData : []
//   const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 }

//   // Update URL when category changes
//   useEffect(() => {
//     if (activeCategory && activeCategory !== 'all') {
//       setSearchParams({ category: activeCategory })
//     } else {
//       setSearchParams({})
//     }
//     setCurrentPage(1)
//   }, [activeCategory, setSearchParams])

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

//   // Sort options
//   const sortOptions = [
//     { value: 'popular', label: 'Most Popular' },
//     { value: 'poems', label: 'Most Poems' },
//     { value: 'followers', label: 'Most Followers' },
//     { value: 'name', label: 'Name A-Z' },
//     { value: 'recent', label: 'Recently Added' }
//   ]

//   // Get era badge color
//   const getEraColor = (era) => {
//     switch (era?.toLowerCase()) {
//       case 'classical': return 'bg-purple-100 text-purple-700'
//       case 'modern': return 'bg-blue-100 text-blue-700'
//       case 'contemporary': return 'bg-green-100 text-green-700'
//       case 'sufi': return 'bg-orange-100 text-orange-700'
//       case 'marsiya': return 'bg-red-100 text-red-700'
//       default: return 'bg-gray-100 text-gray-700'
//     }
//   }

//   // Get category icon
//   const getCategoryIcon = (categoryId) => {
//     switch (categoryId) {
//       case 'sufi': return <Music className="h-4 w-4" />
//       case 'marsiya': return <Mic className="h-4 w-4" />
//       case 'nauha': return <Headphones className="h-4 w-4" />
//       default: return null
//     }
//   }

//   // Format follower count
//   const formatFollowers = (count) => {
//     if (!count) return '0'
//     if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
//     if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
//     return count.toString()
//   }

//   // Loading state
//   if (isLoading && authors.length === 0) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-center min-h-[60vh]">
//             <div className="text-center">
//               <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
//               <p className="text-gray-500">Loading authors...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Error state
//   if (error && authors.length === 0) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center py-12">
//             <div className="text-red-500 mb-4">
//               <Users className="h-12 w-12 mx-auto" />
//             </div>
//             <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to load authors</h2>
//             <p className="text-gray-500 mb-6">There was an error loading the authors. Please try again.</p>
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
//             {t('common.authors', 'Literary Authors')}
//           </h1>
//           <p className="text-gray-500">
//             Discover legendary poets, marsiya writers, nauha reciters, and literary figures from Urdu, Hindi, and Persian literature
//           </p>
//         </div>

//         {/* Search & Filters */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search authors by name or genre..."
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

//         {/* Category Tabs */}
//         <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-6 pb-2">
//           <button
//             onClick={() => setActiveCategory('all')}
//             className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//               activeCategory === 'all'
//                 ? 'bg-primary-600 text-white'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             All Authors
//           </button>
//           {extendedCategories.map((cat) => (
//             <button
//               key={cat.id}
//               onClick={() => setActiveCategory(cat.id)}
//               className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//                 activeCategory === cat.id
//                   ? 'bg-primary-600 text-white'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               {getCategoryIcon(cat.id)}
//               <span>{cat.label}</span>
//             </button>
//           ))}
//         </div>

//         {/* Results Count */}
//         <div className="flex justify-between items-center mb-4">
//           <p className="text-sm text-gray-500">
//             Showing {authors.length} of {pagination.total || authors.length} authors
//           </p>
//           {(searchQuery || activeCategory !== 'all') && (
//             <button
//               onClick={() => {
//                 setSearchQuery('')
//                 setActiveCategory('all')
//               }}
//               className="text-sm text-primary-600 hover:text-primary-700"
//             >
//               Clear filters
//             </button>
//           )}
//         </div>

//         {/* Authors Grid */}
//         {authors.length === 0 ? (
//           <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
//             <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No authors found</h3>
//             <p className="text-gray-500">
//               {searchQuery 
//                 ? `No authors matching "${searchQuery}" found. Try a different search term.`
//                 : 'No authors available in this category yet.'}
//             </p>
//             {(searchQuery || activeCategory !== 'all') && (
//               <button
//                 onClick={() => {
//                   setSearchQuery('')
//                   setActiveCategory('all')
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
//               {authors.map((author, index) => (
//                 <motion.div
//                   key={author._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                 >
//                   <Link to={`/author/${author.slug}`} className="block">
//                     <div className="bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden group">
//                       <div className="p-6">
//                         <div className="flex items-start space-x-4">
//                           {/* Avatar */}
//                           <div className="flex-shrink-0">
//                             {author.avatar ? (
//                               <img
//                                 src={author.avatar}
//                                 alt={author.name}
//                                 className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
//                               />
//                             ) : (
//                               <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center border-4 border-white shadow-md">
//                                 <span className="text-2xl font-bold text-primary-600">
//                                   {author.name.charAt(0)}
//                                 </span>
//                               </div>
//                             )}
//                           </div>
                          
//                           {/* Info */}
//                           <div className="flex-1 min-w-0">
//                             <div className="flex items-center justify-between mb-1">
//                               <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors truncate">
//                                 {author.name}
//                               </h3>
//                               <span className={`px-2 py-0.5 text-xs rounded-full ${getEraColor(author.era)} capitalize ml-2 flex-shrink-0`}>
//                                 {author.era || 'Classical'}
//                               </span>
//                             </div>
                            
//                             {author.nameUrdu && (
//                               <p className="urdu-text text-gray-600 text-sm mb-2 truncate" dir="rtl">
//                                 {author.nameUrdu}
//                               </p>
//                             )}
                            
//                             <p className="text-gray-500 text-sm line-clamp-2 mb-3">
//                               {author.bio?.substring(0, 100)}...
//                             </p>
                            
//                             {/* Stats */}
//                             <div className="flex items-center justify-between text-sm">
//                               <div className="flex items-center space-x-3 text-gray-500">
//                                 <span className="flex items-center space-x-1">
//                                   <BookOpen className="h-4 w-4" />
//                                   <span>{author.stats?.poemsCount || 0} Poems</span>
//                                 </span>
//                                 <span className="flex items-center space-x-1">
//                                   <Users className="h-4 w-4" />
//                                   <span>{formatFollowers(author.stats?.followers || 0)}</span>
//                                 </span>
//                                 <span className="flex items-center space-x-1">
//                                   <Eye className="h-4 w-4" />
//                                   <span>{formatFollowers(author.stats?.views || 0)}</span>
//                                 </span>
//                               </div>
                              
//                               {/* Verified Badge */}
//                               {author.isVerified && (
//                                 <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
//                                   Verified
//                                 </span>
//                               )}
//                             </div>
                            
//                             {/* Genres */}
//                             {author.genres && author.genres.length > 0 && (
//                               <div className="flex flex-wrap gap-1 mt-3">
//                                 {author.genres.slice(0, 3).map((genre, idx) => (
//                                   <span key={idx} className="text-xs text-gray-400 capitalize">
//                                     {genre}{idx < Math.min(author.genres.length, 3) - 1 ? ',' : ''}
//                                   </span>
//                                 ))}
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Pagination */}
//             {(pagination.totalPages > 1 || Math.ceil(authors.length / itemsPerPage) > 1) && (
//               <div className="flex items-center justify-center gap-2 mt-8">
//                 <button
//                   onClick={() => goToPage(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <ChevronLeft className="h-5 w-5 text-gray-600" />
//                 </button>
                
//                 <div className="flex items-center gap-1">
//                   {Array.from({ length: pagination.totalPages || Math.ceil(authors.length / itemsPerPage) }, (_, i) => i + 1)
//                     .filter(page => {
//                       const totalPages = pagination.totalPages || Math.ceil(authors.length / itemsPerPage)
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
//                   disabled={currentPage === (pagination.totalPages || Math.ceil(authors.length / itemsPerPage))}
//                   className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <ChevronRight className="h-5 w-5 text-gray-600" />
//                 </button>
//               </div>
//             )}

//             {/* Loading more indicator */}
//             {isLoading && authors.length > 0 && (
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
















// // client/src/pages/public/AuthorsListPage.jsx
// import React, { useState, useEffect, useCallback, useRef } from 'react'
// import { useTranslation } from 'react-i18next'
// import { useSearchParams, Link } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useQuery } from '@tanstack/react-query'
// import { 
//   Search, Users, BookOpen, Heart, Filter, Loader2, ChevronLeft, ChevronRight, 
//   Eye, UserPlus, Headphones, Music, Mic, X, MicOff, Volume2, Zap, Sparkles,
//   Award, Star, TrendingUp, Clock, Calendar, MapPin, Quote, BookMarked,Flame
// } from 'lucide-react'
// import authorAPI from '../../api/authorAPI'
// import { AUTHOR_CATEGORIES } from '../../utils/constants.js'

// const AuthorsListPage = () => {
//   const { t } = useTranslation()
//   const [searchParams, setSearchParams] = useSearchParams()
//   const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all')
//   const [searchInputValue, setSearchInputValue] = useState('')
//   const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
//   const [sortBy, setSortBy] = useState('popular')
//   const [currentPage, setCurrentPage] = useState(1)
//   const [isListening, setIsListening] = useState(false)
//   const [voiceSupported, setVoiceSupported] = useState(true)
//   const itemsPerPage = 9
//   const searchInputRef = useRef(null)
//   const debounceTimerRef = useRef(null)
//   const recognitionRef = useRef(null)

//   // Extended author categories including religious/audio categories
//   const extendedCategories = [
//     ...AUTHOR_CATEGORIES,
//     { id: 'sufi', label: 'Sufi Poets', labelHi: 'सूफ़ी कवि', labelUr: 'صوفی شعراء' },
//     { id: 'marsiya', label: 'Marsiya Writers', labelHi: 'मर्सिया लेखक', labelUr: 'مرثیہ نگار' },
//     { id: 'nauha', label: 'Nauha Reciters', labelHi: 'नौहा ख्वान', labelUr: 'نوحہ خوان' },
//     { id: 'manqabat', label: 'Manqabat Writers', labelHi: 'मनक़बत लेखक', labelUr: 'منقبت نگار' },
//   ]

//   // Initialize speech recognition
//   useEffect(() => {
//     if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
//       recognitionRef.current = new SpeechRecognition()
//       recognitionRef.current.continuous = false
//       recognitionRef.current.interimResults = false
//       recognitionRef.current.lang = 'ur-PK, hi-IN, en-US'
      
//       recognitionRef.current.onresult = (event) => {
//         const transcript = event.results[0][0].transcript
//         setSearchInputValue(transcript)
//         updateDebouncedSearch(transcript)
//         setIsListening(false)
//       }
      
//       recognitionRef.current.onerror = (event) => {
//         console.error('Speech recognition error:', event.error)
//         setIsListening(false)
//       }
      
//       recognitionRef.current.onend = () => {
//         setIsListening(false)
//       }
//     } else {
//       setVoiceSupported(false)
//       console.log('Speech recognition not supported in this browser')
//     }
    
//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.abort()
//       }
//     }
//   }, [])

//   // Fetch authors from API
//   const { data: response, isLoading, error, refetch, isFetching } = useQuery({
//     queryKey: ['authors', currentPage, activeCategory, sortBy, debouncedSearchQuery],
//     queryFn: () => authorAPI.getAuthors({
//       page: currentPage,
//       limit: itemsPerPage,
//       category: activeCategory !== 'all' ? activeCategory : undefined,
//       search: debouncedSearchQuery || undefined,
//       sort: sortBy
//     }),
//     enabled: true,
//     staleTime: 30000,
//     keepPreviousData: true,
//     refetchOnWindowFocus: false,
//   })

//   // Extract authors and pagination from response
//   const authorsData = response?.data?.data || response?.data || response || []
//   const authors = Array.isArray(authorsData) ? authorsData : []
//   const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 }

//   // Update URL when category changes
//   useEffect(() => {
//     if (activeCategory && activeCategory !== 'all') {
//       setSearchParams({ category: activeCategory })
//     } else {
//       setSearchParams({})
//     }
//     setCurrentPage(1)
//   }, [activeCategory, setSearchParams])

//   // Debounce search - FIXED: No focus loss
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

//   // Handle search input change - maintains focus
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

//   // Voice search handler
//   const startVoiceSearch = useCallback(() => {
//     if (recognitionRef.current && !isListening) {
//       try {
//         recognitionRef.current.start()
//         setIsListening(true)
//       } catch (error) {
//         console.error('Failed to start voice recognition:', error)
//       }
//     }
//   }, [isListening])

//   // Stop voice search
//   const stopVoiceSearch = useCallback(() => {
//     if (recognitionRef.current && isListening) {
//       recognitionRef.current.stop()
//       setIsListening(false)
//     }
//   }, [isListening])

//   // Handle page change
//   const goToPage = useCallback((page) => {
//     if (page >= 1 && page <= (pagination.totalPages || 1)) {
//       setCurrentPage(page)
//       window.scrollTo({ top: 0, behavior: 'smooth' })
//     }
//   }, [pagination.totalPages])

//   // Clear all filters
//   const clearFilters = useCallback(() => {
//     clearSearch()
//     setActiveCategory('all')
//     setCurrentPage(1)
//   }, [clearSearch])

//   // Sort options
//   const sortOptions = [
//     { value: 'popular', label: 'Most Popular', icon: Flame },
//     { value: 'poems', label: 'Most Poems', icon: BookOpen },
//     { value: 'followers', label: 'Most Followers', icon: Users },
//     { value: 'name', label: 'Name A-Z', icon: Quote },
//     { value: 'recent', label: 'Recently Added', icon: Clock }
//   ]

//   // Get era badge color
//   const getEraColor = (era) => {
//     switch (era?.toLowerCase()) {
//       case 'classical': return 'bg-purple-100 text-purple-700'
//       case 'modern': return 'bg-blue-100 text-blue-700'
//       case 'contemporary': return 'bg-green-100 text-green-700'
//       case 'sufi': return 'bg-orange-100 text-orange-700'
//       case 'marsiya': return 'bg-red-100 text-red-700'
//       default: return 'bg-gray-100 text-gray-700'
//     }
//   }

//   // Get category icon
//   const getCategoryIcon = (categoryId) => {
//     switch (categoryId) {
//       case 'sufi': return <Music className="h-4 w-4" />
//       case 'marsiya': return <Mic className="h-4 w-4" />
//       case 'nauha': return <Headphones className="h-4 w-4" />
//       default: return null
//     }
//   }

//   // Format follower count
//   const formatFollowers = (count) => {
//     if (!count) return '0'
//     if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
//     if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
//     return count.toString()
//   }

//   // Loading state
//   if (isLoading && authors.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
//           <div className="flex items-center justify-center min-h-[60vh]">
//             <div className="text-center">
//               <div className="relative">
//                 <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-amber-500 rounded-2xl animate-pulse mx-auto mb-6 flex items-center justify-center">
//                   <Users className="h-10 w-10 text-white" />
//                 </div>
//                 <div className="absolute -top-2 -right-2">
//                   <Sparkles className="h-6 w-6 text-amber-400 animate-spin" />
//                 </div>
//               </div>
//               <p className="text-gray-600 font-medium">Loading literary legends...</p>
//               <p className="text-sm text-gray-400 mt-1">Discovering poets and writers</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Error state
//   if (error && authors.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
//           <div className="text-center py-12">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-2xl mb-6">
//               <Users className="h-10 w-10 text-red-500" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to load authors</h2>
//             <p className="text-gray-500 mb-6">There was an error loading the authors. Please try again.</p>
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
//               <span className="text-sm text-white font-medium">Discover Literary Legends</span>
//             </div>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
//               Literary Authors
//             </h1>
//             <p className="text-lg text-white/90 max-w-2xl mx-auto">
//               Discover legendary poets, marsiya writers, nauha reciters, and literary figures from Urdu, Hindi, and Persian literature
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
//             { label: 'Total Authors', value: pagination.total?.toLocaleString() || '0', icon: Users, color: 'from-blue-500 to-blue-600' },
//             { label: 'Categories', value: extendedCategories.length, icon: Filter, color: 'from-purple-500 to-purple-600' },
//             { label: 'Poems', value: '10K+', icon: BookOpen, color: 'from-amber-500 to-amber-600' },
//             { label: 'Readers', value: '50K+', icon: Eye, color: 'from-green-500 to-green-600' }
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
//             {/* Search Input with Voice Search and Clear Button */}
//             <div className="flex-1 relative">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//               <input
//                 ref={searchInputRef}
//                 type="text"
//                 placeholder="Search authors by name or genre..."
//                 value={searchInputValue}
//                 onChange={handleSearchChange}
//                 className="w-full pl-12 pr-24 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 transition-all"
//                 autoComplete="off"
//               />
//               {/* Clear Button */}
//               {searchInputValue && (
//                 <button
//                   onClick={clearSearch}
//                   className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                   type="button"
//                 >
//                   <X className="h-4 w-4" />
//                 </button>
//               )}
//               {/* Voice Search Button */}
//               {voiceSupported && (
//                 <button
//                   onClick={isListening ? stopVoiceSearch : startVoiceSearch}
//                   className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg transition-all ${
//                     isListening 
//                       ? 'bg-red-500 text-white animate-pulse' 
//                       : 'text-gray-400 hover:text-primary-600 hover:bg-primary-50'
//                   }`}
//                   type="button"
//                   title={isListening ? "Stop listening" : "Voice search"}
//                 >
//                   {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
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
//             </div>
//           </div>

//           {/* Search Results Info */}
//           {debouncedSearchQuery && (
//             <div className="mt-3 px-3 py-2 bg-primary-50 rounded-lg">
//               <p className="text-sm text-primary-700">
//                 Searching for: <span className="font-semibold">"{debouncedSearchQuery}"</span>
//                 {!isFetching && !isLoading && (
//                   <span className="ml-2">({pagination.total || authors.length} authors found)</span>
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

//           {/* Voice Search Listening Indicator */}
//           {isListening && (
//             <div className="mt-3 px-3 py-2 bg-red-50 rounded-lg animate-pulse">
//               <p className="text-sm text-red-600 flex items-center gap-2">
//                 <Mic className="h-4 w-4 animate-pulse" />
//                 Listening... Speak the author name you want to search
//               </p>
//             </div>
//           )}

//           {/* Category Tabs */}
//           <div className="flex overflow-x-auto scrollbar-hide gap-2 mt-4 pb-2">
//             <button
//               onClick={() => setActiveCategory('all')}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
//                 activeCategory === 'all'
//                   ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               All Authors
//             </button>
//             {extendedCategories.map((cat) => (
//               <button
//                 key={cat.id}
//                 onClick={() => setActiveCategory(cat.id)}
//                 className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
//                   activeCategory === cat.id
//                     ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 {getCategoryIcon(cat.id)}
//                 <span>{cat.label}</span>
//               </button>
//             ))}
//           </div>
//         </motion.div>

//         {/* Results Header */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center gap-2">
//             <div className="w-1 h-6 bg-gradient-to-b from-primary-600 to-amber-500 rounded-full" />
//             <p className="text-sm text-gray-600">
//               Showing <span className="font-semibold text-gray-900">{authors.length}</span> of{' '}
//               <span className="font-semibold text-gray-900">{pagination.total || authors.length}</span> authors
//             </p>
//           </div>
//           {(activeCategory !== 'all' || debouncedSearchQuery) && (
//             <button
//               onClick={clearFilters}
//               className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors"
//             >
//               Clear all filters
//               <X className="h-3 w-3" />
//             </button>
//           )}
//         </div>

//         {/* Authors Grid */}
//         {authors.length === 0 && !isLoading ? (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="bg-white rounded-2xl p-12 text-center border border-gray-100"
//           >
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-2xl mb-6">
//               <Users className="h-10 w-10 text-amber-600" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">No authors found</h3>
//             <p className="text-gray-500 max-w-md mx-auto">
//               {debouncedSearchQuery 
//                 ? `No authors matching "${debouncedSearchQuery}" found. Try a different search term.`
//                 : 'No authors available in this category yet.'}
//             </p>
//             {(debouncedSearchQuery || activeCategory !== 'all') && (
//               <button
//                 onClick={clearFilters}
//                 className="mt-6 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
//               >
//                 Clear all filters
//                 <X className="h-3 w-3" />
//               </button>
//             )}
//           </motion.div>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {authors.map((author, index) => (
//                 <motion.div
//                   key={author._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: Math.min(index * 0.05, 0.3) }}
//                   whileHover={{ y: -4 }}
//                 >
//                   <Link to={`/author/${author.slug}`} className="block group">
//                     <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
//                       <div className="relative bg-gradient-to-r from-primary-600 via-primary-500 to-amber-500 p-4">
//                         <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
//                         <div className="relative flex items-center gap-4">
//                           {/* Avatar */}
//                           <div className="flex-shrink-0">
//                             {author.avatar ? (
//                               <img
//                                 src={author.avatar}
//                                 alt={author.name}
//                                 className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
//                               />
//                             ) : (
//                               <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white shadow-md">
//                                 <span className="text-2xl font-bold text-white">
//                                   {author.name?.charAt(0) || 'A'}
//                                 </span>
//                               </div>
//                             )}
//                           </div>
                          
//                           {/* Info */}
//                           <div className="flex-1 min-w-0">
//                             <h3 className="font-bold text-white text-lg group-hover:translate-x-1 transition-transform truncate">
//                               {author.name}
//                             </h3>
//                             {author.nameUrdu && (
//                               <p className="urdu-text text-white/80 text-sm truncate" dir="rtl">
//                                 {author.nameUrdu}
//                               </p>
//                             )}
//                             <div className="flex items-center gap-2 mt-1">
//                               <span className={`px-2 py-0.5 text-xs rounded-full bg-white/20 backdrop-blur-sm text-white capitalize`}>
//                                 {author.era || 'Classical'}
//                               </span>
//                               {author.isVerified && (
//                                 <span className="px-2 py-0.5 text-xs rounded-full bg-amber-500 text-white">
//                                   Verified
//                                 </span>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="p-4">
//                         <p className="text-gray-600 text-sm line-clamp-2 mb-3">
//                           {author.bio?.substring(0, 100)}...
//                         </p>
                        
//                         {/* Stats */}
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-3 text-gray-500">
//                             <span className="flex items-center gap-1">
//                               <BookOpen className="h-4 w-4" />
//                               <span>{author.stats?.poemsCount || 0}</span>
//                             </span>
//                             <span className="flex items-center gap-1">
//                               <Users className="h-4 w-4" />
//                               <span>{formatFollowers(author.stats?.followers || 0)}</span>
//                             </span>
//                             <span className="flex items-center gap-1">
//                               <Eye className="h-4 w-4" />
//                               <span>{formatFollowers(author.stats?.views || 0)}</span>
//                             </span>
//                           </div>
//                         </div>
                        
//                         {/* Genres */}
//                         {author.genres && author.genres.length > 0 && (
//                           <div className="flex flex-wrap gap-1 mt-3 pt-2 border-t border-gray-100">
//                             {author.genres.slice(0, 3).map((genre, idx) => (
//                               <span key={idx} className="text-xs text-gray-400 capitalize">
//                                 {genre}{idx < Math.min(author.genres.length, 3) - 1 ? ',' : ''}
//                               </span>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </Link>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Pagination */}
//             {(pagination.totalPages > 1 || Math.ceil(authors.length / itemsPerPage) > 1) && (
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
//                   {Array.from({ length: pagination.totalPages || Math.ceil(authors.length / itemsPerPage) }, (_, i) => i + 1)
//                     .filter(page => {
//                       const totalPages = pagination.totalPages || Math.ceil(authors.length / itemsPerPage)
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
//                   disabled={currentPage === (pagination.totalPages || Math.ceil(authors.length / itemsPerPage))}
//                   className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                 >
//                   <ChevronRight className="h-5 w-5 text-gray-600" />
//                 </button>
//               </motion.div>
//             )}

//             {/* Loading indicator */}
//             <AnimatePresence>
//               {(isFetching || isLoading) && authors.length > 0 && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="flex justify-center mt-8"
//                 >
//                   <div className="flex items-center gap-2">
//                     <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
//                     <span className="text-sm text-gray-500">Loading more authors...</span>
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

// export default AuthorsListPage

// // export default AuthorsListPage

















// // client/src/pages/public/AuthorsListPage.jsx
// import React, { useState, useEffect, useCallback, useRef } from 'react'
// import { useTranslation } from 'react-i18next'
// import { useSearchParams, Link } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useQuery } from '@tanstack/react-query'
// import { 
//   Search, Users, BookOpen, Heart, Filter, Loader2, ChevronLeft, ChevronRight, 
//   Eye, UserPlus, Headphones, Music, Mic, X, MicOff, Volume2, Zap, Sparkles,
//   Award, Star, TrendingUp, Clock, Calendar, MapPin, Quote, BookMarked, Flame,
//   ChevronDown, ChevronUp
// } from 'lucide-react'
// import authorAPI from '../../api/authorAPI'
// import { AUTHOR_CATEGORIES } from '../../utils/constants.js'

// const AuthorsListPage = () => {
//   const { t } = useTranslation()
//   const [searchParams, setSearchParams] = useSearchParams()
//   const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all')
//   const [searchInputValue, setSearchInputValue] = useState('')
//   const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
//   const [sortBy, setSortBy] = useState('popular')
//   const [currentPage, setCurrentPage] = useState(1)
//   const [isListening, setIsListening] = useState(false)
//   const [voiceSupported, setVoiceSupported] = useState(true)
//   const [selectedLetter, setSelectedLetter] = useState(null)
//   const [showIndex, setShowIndex] = useState(true)
//   const itemsPerPage = 12
//   const searchInputRef = useRef(null)
//   const debounceTimerRef = useRef(null)
//   const recognitionRef = useRef(null)
//   const letterRefs = useRef({})

//   // Alphabetical index letters
//   const alphabetIndex = [
//     'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
//     'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V/W', 'Y', 'Z'
//   ]

//   // Extended author categories including religious/audio categories
//   const extendedCategories = [
//     ...AUTHOR_CATEGORIES,
//     { id: 'sufi', label: 'Sufi Poets', labelHi: 'सूफ़ी कवि', labelUr: 'صوفی شعراء' },
//     { id: 'marsiya', label: 'Marsiya Writers', labelHi: 'मर्सिया लेखक', labelUr: 'مرثیہ نگار' },
//     { id: 'nauha', label: 'Nauha Reciters', labelHi: 'नौहा ख्वान', labelUr: 'نوحہ خوان' },
//     { id: 'manqabat', label: 'Manqabat Writers', labelHi: 'मनक़बत लेखक', labelUr: 'منقبت نگار' },
//   ]

//   // Initialize speech recognition
//   useEffect(() => {
//     if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
//       recognitionRef.current = new SpeechRecognition()
//       recognitionRef.current.continuous = false
//       recognitionRef.current.interimResults = false
//       recognitionRef.current.lang = 'ur-PK, hi-IN, en-US'
      
//       recognitionRef.current.onresult = (event) => {
//         const transcript = event.results[0][0].transcript
//         setSearchInputValue(transcript)
//         updateDebouncedSearch(transcript)
//         setIsListening(false)
//       }
      
//       recognitionRef.current.onerror = (event) => {
//         console.error('Speech recognition error:', event.error)
//         setIsListening(false)
//       }
      
//       recognitionRef.current.onend = () => {
//         setIsListening(false)
//       }
//     } else {
//       setVoiceSupported(false)
//       console.log('Speech recognition not supported in this browser')
//     }
    
//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.abort()
//       }
//     }
//   }, [])

//   // Fetch authors from API
//   const { data: response, isLoading, error, refetch, isFetching } = useQuery({
//     queryKey: ['authors', currentPage, activeCategory, sortBy, debouncedSearchQuery, selectedLetter],
//     queryFn: () => authorAPI.getAuthors({
//       page: currentPage,
//       limit: itemsPerPage,
//       category: activeCategory !== 'all' ? activeCategory : undefined,
//       search: debouncedSearchQuery || undefined,
//       sort: sortBy,
//       letter: selectedLetter
//     }),
//     enabled: true,
//     staleTime: 30000,
//     keepPreviousData: true,
//     refetchOnWindowFocus: false,
//   })

//   // Extract authors and pagination from response
//   const authorsData = response?.data?.data || response?.data || response || []
//   const authors = Array.isArray(authorsData) ? authorsData : []
//   const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 }

//   // Update URL when category changes
//   useEffect(() => {
//     if (activeCategory && activeCategory !== 'all') {
//       setSearchParams({ category: activeCategory })
//     } else {
//       setSearchParams({})
//     }
//     setCurrentPage(1)
//     setSelectedLetter(null)
//   }, [activeCategory, setSearchParams])

//   // Debounce search - FIXED: No focus loss
//   const updateDebouncedSearch = useCallback((value) => {
//     if (debounceTimerRef.current) {
//       clearTimeout(debounceTimerRef.current)
//     }
    
//     debounceTimerRef.current = setTimeout(() => {
//       setDebouncedSearchQuery(value)
//       if (currentPage !== 1) {
//         setCurrentPage(1)
//       }
//       setSelectedLetter(null)
//     }, 500)
//   }, [currentPage])

//   // Handle search input change - maintains focus
//   const handleSearchChange = useCallback((e) => {
//     const value = e.target.value
//     setSearchInputValue(value)
//     updateDebouncedSearch(value)
//   }, [updateDebouncedSearch])

//   // Clear search
//   const clearSearch = useCallback(() => {
//     setSearchInputValue('')
//     setDebouncedSearchQuery('')
//     setSelectedLetter(null)
//     // Keep focus on input
//     if (searchInputRef.current) {
//       searchInputRef.current.focus()
//     }
//   }, [])

//   // Voice search handler
//   const startVoiceSearch = useCallback(() => {
//     if (recognitionRef.current && !isListening) {
//       try {
//         recognitionRef.current.start()
//         setIsListening(true)
//       } catch (error) {
//         console.error('Failed to start voice recognition:', error)
//       }
//     }
//   }, [isListening])

//   // Stop voice search
//   const stopVoiceSearch = useCallback(() => {
//     if (recognitionRef.current && isListening) {
//       recognitionRef.current.stop()
//       setIsListening(false)
//     }
//   }, [isListening])

//   // Handle page change
//   const goToPage = useCallback((page) => {
//     if (page >= 1 && page <= (pagination.totalPages || 1)) {
//       setCurrentPage(page)
//       window.scrollTo({ top: 0, behavior: 'smooth' })
//     }
//   }, [pagination.totalPages])

//   // Clear all filters
//   const clearFilters = useCallback(() => {
//     clearSearch()
//     setActiveCategory('all')
//     setCurrentPage(1)
//     setSelectedLetter(null)
//   }, [clearSearch])

//   // Handle letter click - scroll to section
//   const handleLetterClick = (letter) => {
//     setSelectedLetter(letter)
//     setCurrentPage(1)
//     setDebouncedSearchQuery('')
//     setSearchInputValue('')
//     // Scroll to authors section
//     setTimeout(() => {
//       const element = document.getElementById('authors-section')
//       if (element) {
//         element.scrollIntoView({ behavior: 'smooth', block: 'start' })
//       }
//     }, 100)
//   }

//   // Sort options
//   const sortOptions = [
//     { value: 'popular', label: 'Most Popular', icon: Flame },
//     { value: 'poems', label: 'Most Poems', icon: BookOpen },
//     { value: 'followers', label: 'Most Followers', icon: Users },
//     { value: 'name', label: 'Name A-Z', icon: Quote },
//     { value: 'recent', label: 'Recently Added', icon: Clock }
//   ]

//   // Get era badge color
//   const getEraColor = (era) => {
//     switch (era?.toLowerCase()) {
//       case 'classical': return 'bg-purple-100 text-purple-700'
//       case 'modern': return 'bg-blue-100 text-blue-700'
//       case 'contemporary': return 'bg-green-100 text-green-700'
//       case 'sufi': return 'bg-orange-100 text-orange-700'
//       case 'marsiya': return 'bg-red-100 text-red-700'
//       default: return 'bg-gray-100 text-gray-700'
//     }
//   }

//   // Get category icon
//   const getCategoryIcon = (categoryId) => {
//     switch (categoryId) {
//       case 'sufi': return <Music className="h-4 w-4" />
//       case 'marsiya': return <Mic className="h-4 w-4" />
//       case 'nauha': return <Headphones className="h-4 w-4" />
//       default: return null
//     }
//   }

//   // Format follower count
//   const formatFollowers = (count) => {
//     if (!count) return '0'
//     if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
//     if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
//     return count.toString()
//   }

//   // Loading state
//   if (isLoading && authors.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
//           <div className="flex items-center justify-center min-h-[60vh]">
//             <div className="text-center">
//               <div className="relative">
//                 <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-amber-500 rounded-2xl animate-pulse mx-auto mb-6 flex items-center justify-center">
//                   <Users className="h-10 w-10 text-white" />
//                 </div>
//                 <div className="absolute -top-2 -right-2">
//                   <Sparkles className="h-6 w-6 text-amber-400 animate-spin" />
//                 </div>
//               </div>
//               <p className="text-gray-600 font-medium">Loading literary legends...</p>
//               <p className="text-sm text-gray-400 mt-1">Discovering poets and writers</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Error state
//   if (error && authors.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
//           <div className="text-center py-12">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-2xl mb-6">
//               <Users className="h-10 w-10 text-red-500" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to load authors</h2>
//             <p className="text-gray-500 mb-6">There was an error loading the authors. Please try again.</p>
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
//               <span className="text-sm text-white font-medium">INDEX OF POETS</span>
//             </div>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
//               Literary Authors
//             </h1>
//             <p className="text-base text-white/90 max-w-2xl mx-auto">
//               Discover legendary poets, marsiya writers, nauha reciters, and literary figures
//             </p>
//           </motion.div>
//         </div>
        
//         <div className="absolute bottom-0 left-0 right-0">
//           <svg className="w-full h-10 text-slate-50" preserveAspectRatio="none" viewBox="0 0 1440 54">
//             <path fill="currentColor" d="M0,22L80,27.3C160,33,320,43,480,42.7C640,43,800,32,960,26.7C1120,21,1280,21,1360,21.3L1440,22L1440,54L1360,54C1280,54,1120,54,960,54C800,54,640,54,480,54C320,54,160,54,80,54L0,54Z"/>
//           </svg>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        
//         {/* Alphabetical Index */}
//         <motion.div 
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 mb-6"
//         >
//           <div className="flex items-center justify-between mb-2 px-2">
//             <h3 className="text-sm font-semibold text-gray-700">INDEX OF POETS</h3>
//             <button
//               onClick={() => setShowIndex(!showIndex)}
//               className="text-gray-400 hover:text-gray-600 transition-colors"
//             >
//               {showIndex ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
//             </button>
//           </div>
          
//           {showIndex && (
//             <div className="flex flex-wrap justify-center gap-1">
//               {alphabetIndex.map((letter) => (
//                 <button
//                   key={letter}
//                   onClick={() => handleLetterClick(letter)}
//                   className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${
//                     selectedLetter === letter
//                       ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
//                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }`}
//                 >
//                   {letter}
//                 </button>
//               ))}
//             </div>
//           )}
//         </motion.div>

//         {/* Search & Filters Bar */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6"
//         >
//           <div className="flex flex-col lg:flex-row gap-4">
//             {/* Search Input with Voice Search and Clear Button */}
//             <div className="flex-1 relative">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//               <input
//                 ref={searchInputRef}
//                 type="text"
//                 placeholder="Search authors by name or genre..."
//                 value={searchInputValue}
//                 onChange={handleSearchChange}
//                 className="w-full pl-12 pr-24 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 transition-all"
//                 autoComplete="off"
//               />
//               {/* Clear Button */}
//               {searchInputValue && (
//                 <button
//                   onClick={clearSearch}
//                   className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                   type="button"
//                 >
//                   <X className="h-4 w-4" />
//                 </button>
//               )}
//               {/* Voice Search Button */}
//               {voiceSupported && (
//                 <button
//                   onClick={isListening ? stopVoiceSearch : startVoiceSearch}
//                   className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg transition-all ${
//                     isListening 
//                       ? 'bg-red-500 text-white animate-pulse' 
//                       : 'text-gray-400 hover:text-primary-600 hover:bg-primary-50'
//                   }`}
//                   type="button"
//                   title={isListening ? "Stop listening" : "Voice search"}
//                 >
//                   {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
//                 </button>
//               )}
//             </div>

//             {/* Sort Dropdown */}
//             <div className="flex gap-2">
//               <select
//                 value={sortBy}
//                 onChange={(e) => {
//                   setSortBy(e.target.value)
//                   setSelectedLetter(null)
//                 }}
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
//             </div>
//           </div>

//           {/* Search Results Info */}
//           {debouncedSearchQuery && (
//             <div className="mt-3 px-3 py-2 bg-primary-50 rounded-lg">
//               <p className="text-sm text-primary-700">
//                 Searching for: <span className="font-semibold">"{debouncedSearchQuery}"</span>
//                 {!isFetching && !isLoading && (
//                   <span className="ml-2">({pagination.total || authors.length} authors found)</span>
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

//           {/* Selected Letter Info */}
//           {selectedLetter && !debouncedSearchQuery && (
//             <div className="mt-3 px-3 py-2 bg-amber-50 rounded-lg">
//               <p className="text-sm text-amber-700">
//                 Showing authors starting with: <span className="font-semibold">{selectedLetter}</span>
//                 <button
//                   onClick={() => setSelectedLetter(null)}
//                   className="ml-3 text-amber-600 hover:text-amber-800"
//                 >
//                   Clear filter
//                 </button>
//               </p>
//             </div>
//           )}

//           {/* Voice Search Listening Indicator */}
//           {isListening && (
//             <div className="mt-3 px-3 py-2 bg-red-50 rounded-lg animate-pulse">
//               <p className="text-sm text-red-600 flex items-center gap-2">
//                 <Mic className="h-4 w-4 animate-pulse" />
//                 Listening... Speak the author name you want to search
//               </p>
//             </div>
//           )}

//           {/* Category Tabs */}
//           <div className="flex overflow-x-auto scrollbar-hide gap-2 mt-4 pb-2">
//             <button
//               onClick={() => {
//                 setActiveCategory('all')
//                 setSelectedLetter(null)
//               }}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
//                 activeCategory === 'all'
//                   ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               All Authors
//             </button>
//             {extendedCategories.map((cat) => (
//               <button
//                 key={cat.id}
//                 onClick={() => {
//                   setActiveCategory(cat.id)
//                   setSelectedLetter(null)
//                 }}
//                 className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
//                   activeCategory === cat.id
//                     ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 {getCategoryIcon(cat.id)}
//                 <span>{cat.label}</span>
//               </button>
//             ))}
//           </div>
//         </motion.div>

//         {/* Results Header */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center gap-2">
//             <div className="w-1 h-6 bg-gradient-to-b from-primary-600 to-amber-500 rounded-full" />
//             <p className="text-sm text-gray-600">
//               Showing <span className="font-semibold text-gray-900">{authors.length}</span> authors
//             </p>
//           </div>
//           {(activeCategory !== 'all' || debouncedSearchQuery || selectedLetter) && (
//             <button
//               onClick={clearFilters}
//               className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors"
//             >
//               Clear all filters
//               <X className="h-3 w-3" />
//             </button>
//           )}
//         </div>

//         {/* Authors Grid Section */}
//         <div id="authors-section">
//           {authors.length === 0 && !isLoading ? (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="bg-white rounded-2xl p-12 text-center border border-gray-100"
//             >
//               <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-2xl mb-6">
//                 <Users className="h-10 w-10 text-amber-600" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">No authors found</h3>
//               <p className="text-gray-500 max-w-md mx-auto">
//                 {debouncedSearchQuery 
//                   ? `No authors matching "${debouncedSearchQuery}" found. Try a different search term.`
//                   : selectedLetter
//                   ? `No authors found starting with "${selectedLetter}".`
//                   : 'No authors available in this category yet.'}
//               </p>
//               {(debouncedSearchQuery || activeCategory !== 'all' || selectedLetter) && (
//                 <button
//                   onClick={clearFilters}
//                   className="mt-6 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
//                 >
//                   Clear all filters
//                   <X className="h-3 w-3" />
//                 </button>
//               )}
//             </motion.div>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//                 {authors.map((author, index) => (
//                   <motion.div
//                     key={author._id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: Math.min(index * 0.03, 0.3) }}
//                     whileHover={{ y: -4 }}
//                   >
//                     <Link to={`/author/${author.slug}`} className="block group">
//                       <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
//                         <div className="relative bg-gradient-to-r from-primary-600 via-primary-500 to-amber-500 p-3">
//                           <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
//                           <div className="relative flex items-center gap-3">
//                             {/* Avatar */}
//                             <div className="flex-shrink-0">
//                               {author.avatar ? (
//                                 <img
//                                   src={author.avatar}
//                                   alt={author.name}
//                                   className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
//                                 />
//                               ) : (
//                                 <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white shadow-md">
//                                   <span className="text-xl font-bold text-white">
//                                     {author.name?.charAt(0) || 'A'}
//                                   </span>
//                                 </div>
//                               )}
//                             </div>
                            
//                             {/* Info */}
//                             <div className="flex-1 min-w-0">
//                               <h3 className="font-bold text-white text-base group-hover:translate-x-1 transition-transform truncate">
//                                 {author.name}
//                               </h3>
//                               {author.nameUrdu && (
//                                 <p className="urdu-text text-white/80 text-xs truncate" dir="rtl">
//                                   {author.nameUrdu}
//                                 </p>
//                               )}
//                               <div className="flex items-center gap-1 mt-1">
//                                 <span className={`px-1.5 py-0.5 text-[10px] rounded-full bg-white/20 backdrop-blur-sm text-white capitalize`}>
//                                   {author.era || 'Classical'}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className="p-3">
//                           <p className="text-gray-600 text-xs line-clamp-2 mb-2">
//                             {author.bio?.substring(0, 80)}...
//                           </p>
                          
//                           {/* Stats */}
//                           <div className="flex items-center justify-between text-xs">
//                             <div className="flex items-center gap-2 text-gray-500">
//                               <span className="flex items-center gap-0.5">
//                                 <BookOpen className="h-3 w-3" />
//                                 <span>{author.stats?.poemsCount || 0}</span>
//                               </span>
//                               <span className="flex items-center gap-0.5">
//                                 <Users className="h-3 w-3" />
//                                 <span>{formatFollowers(author.stats?.followers || 0)}</span>
//                               </span>
//                               <span className="flex items-center gap-0.5">
//                                 <Eye className="h-3 w-3" />
//                                 <span>{formatFollowers(author.stats?.views || 0)}</span>
//                               </span>
//                             </div>
//                             {author.isVerified && (
//                               <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">
//                                 Verified
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Pagination */}
//               {(pagination.totalPages > 1 || Math.ceil(authors.length / itemsPerPage) > 1) && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="flex items-center justify-center gap-2 mt-8"
//                 >
//                   <button
//                     onClick={() => goToPage(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                   >
//                     <ChevronLeft className="h-5 w-5 text-gray-600" />
//                   </button>
                  
//                   <div className="flex items-center gap-1">
//                     {Array.from({ length: pagination.totalPages || Math.ceil(authors.length / itemsPerPage) }, (_, i) => i + 1)
//                       .filter(page => {
//                         const totalPages = pagination.totalPages || Math.ceil(authors.length / itemsPerPage)
//                         if (totalPages <= 7) return true
//                         if (page === 1 || page === totalPages) return true
//                         if (page >= currentPage - 1 && page <= currentPage + 1) return true
//                         return false
//                       })
//                       .map((page, index, array) => {
//                         if (index > 0 && array[index - 1] !== page - 1) {
//                           return <span key={`ellipsis-${page}`} className="px-3 py-2 text-gray-400">...</span>
//                         }
//                         return (
//                           <button
//                             key={page}
//                             onClick={() => goToPage(page)}
//                             className={`min-w-[36px] h-9 rounded-xl font-medium transition-all ${
//                               currentPage === page
//                                 ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
//                                 : 'text-gray-600 hover:bg-gray-100'
//                             }`}
//                           >
//                             {page}
//                           </button>
//                         )
//                       })}
//                   </div>

//                   <button
//                     onClick={() => goToPage(currentPage + 1)}
//                     disabled={currentPage === (pagination.totalPages || Math.ceil(authors.length / itemsPerPage))}
//                     className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                   >
//                     <ChevronRight className="h-5 w-5 text-gray-600" />
//                   </button>
//                 </motion.div>
//               )}

//               {/* Loading indicator */}
//               <AnimatePresence>
//                 {(isFetching || isLoading) && authors.length > 0 && (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="flex justify-center mt-6"
//                   >
//                     <div className="flex items-center gap-2">
//                       <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
//                       <span className="text-sm text-gray-500">Loading more authors...</span>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AuthorsListPage














// // client/src/pages/public/AuthorsListPage.jsx
// import React, { useState, useEffect, useCallback, useRef } from 'react'
// import { useTranslation } from 'react-i18next'
// import { useSearchParams, Link } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useQuery } from '@tanstack/react-query'
// import { 
//   Search, Users, BookOpen, Heart, Filter, Loader2, ChevronLeft, ChevronRight, 
//   Eye, UserPlus, Headphones, Music, Mic, X, MicOff, Volume2, Zap, Sparkles,
//   Award, Star, TrendingUp, Clock, Calendar, MapPin, Quote, BookMarked, Flame,
//   ChevronDown, ChevronUp
// } from 'lucide-react'
// import authorAPI from '../../api/authorAPI'
// import { AUTHOR_CATEGORIES } from '../../utils/constants.js'

// const AuthorsListPage = () => {
//   const { t } = useTranslation()
//   const [searchParams, setSearchParams] = useSearchParams()
//   const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all')
//   const [searchInputValue, setSearchInputValue] = useState('')
//   const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
//   const [sortBy, setSortBy] = useState('popular')
//   const [currentPage, setCurrentPage] = useState(1)
//   const [isListening, setIsListening] = useState(false)
//   const [voiceSupported, setVoiceSupported] = useState(true)
//   const [selectedLetter, setSelectedLetter] = useState(null)
//   const [showIndex, setShowIndex] = useState(true)
//   const itemsPerPage = 12
//   const searchInputRef = useRef(null)
//   const debounceTimerRef = useRef(null)
//   const recognitionRef = useRef(null)
//   const letterRefs = useRef({})

//   // Alphabetical index letters
//   const alphabetIndex = [
//     'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
//     'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V/W', 'Y', 'Z'
//   ]

//   // Extended author categories including religious/audio categories
//   const extendedCategories = [
//     ...AUTHOR_CATEGORIES,
//     { id: 'sufi', label: 'Sufi Poets', labelHi: 'सूफ़ी कवि', labelUr: 'صوفی شعراء' },
//     { id: 'marsiya', label: 'Marsiya Writers', labelHi: 'मर्सिया लेखक', labelUr: 'مرثیہ نگار' },
//     { id: 'nauha', label: 'Nauha Reciters', labelHi: 'नौहा ख्वान', labelUr: 'نوحہ خوان' },
//     { id: 'manqabat', label: 'Manqabat Writers', labelHi: 'मनक़बत लेखक', labelUr: 'منقبت نگار' },
//   ]

//   // Initialize speech recognition
//   useEffect(() => {
//     if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
//       recognitionRef.current = new SpeechRecognition()
//       recognitionRef.current.continuous = false
//       recognitionRef.current.interimResults = false
//       recognitionRef.current.lang = 'ur-PK, hi-IN, en-US'
      
//       recognitionRef.current.onresult = (event) => {
//         const transcript = event.results[0][0].transcript
//         setSearchInputValue(transcript)
//         updateDebouncedSearch(transcript)
//         setIsListening(false)
//         setSelectedLetter(null) // Clear letter filter when searching
//       }
      
//       recognitionRef.current.onerror = (event) => {
//         console.error('Speech recognition error:', event.error)
//         setIsListening(false)
//       }
      
//       recognitionRef.current.onend = () => {
//         setIsListening(false)
//       }
//     } else {
//       setVoiceSupported(false)
//       console.log('Speech recognition not supported in this browser')
//     }
    
//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.abort()
//       }
//     }
//   }, [])

//   // Fetch authors from API
//   const { data: response, isLoading, error, refetch, isFetching } = useQuery({
//     queryKey: ['authors', currentPage, activeCategory, sortBy, debouncedSearchQuery, selectedLetter],
//     queryFn: () => {
//       const params = {
//         page: currentPage,
//         limit: itemsPerPage,
//         sort: sortBy
//       }
      
//       if (activeCategory !== 'all') {
//         params.category = activeCategory
//       }
      
//       if (debouncedSearchQuery) {
//         params.search = debouncedSearchQuery
//       }
      
//       if (selectedLetter && !debouncedSearchQuery) {
//         params.letter = selectedLetter
//       }
      
//       console.log('📡 Fetching authors with params:', params)
//       return authorAPI.getAuthors(params)
//     },
//     enabled: true,
//     staleTime: 30000,
//     keepPreviousData: true,
//     refetchOnWindowFocus: false,
//   })

//   // Extract authors and pagination from response
//   const authorsData = response?.data?.data || response?.data || response || []
//   const authors = Array.isArray(authorsData) ? authorsData : []
//   const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 }

//   // Update URL when category changes
//   useEffect(() => {
//     if (activeCategory && activeCategory !== 'all') {
//       setSearchParams({ category: activeCategory })
//     } else {
//       setSearchParams({})
//     }
//     setCurrentPage(1)
//     setSelectedLetter(null)
//   }, [activeCategory, setSearchParams])

//   // Debounce search - FIXED: No focus loss
//   const updateDebouncedSearch = useCallback((value) => {
//     if (debounceTimerRef.current) {
//       clearTimeout(debounceTimerRef.current)
//     }
    
//     debounceTimerRef.current = setTimeout(() => {
//       setDebouncedSearchQuery(value)
//       if (currentPage !== 1) {
//         setCurrentPage(1)
//       }
//       if (value) {
//         setSelectedLetter(null) // Clear letter filter when searching
//       }
//     }, 500)
//   }, [currentPage])

//   // Handle search input change - maintains focus
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

//   // Voice search handler
//   const startVoiceSearch = useCallback(() => {
//     if (recognitionRef.current && !isListening) {
//       try {
//         recognitionRef.current.start()
//         setIsListening(true)
//       } catch (error) {
//         console.error('Failed to start voice recognition:', error)
//       }
//     }
//   }, [isListening])

//   // Stop voice search
//   const stopVoiceSearch = useCallback(() => {
//     if (recognitionRef.current && isListening) {
//       recognitionRef.current.stop()
//       setIsListening(false)
//     }
//   }, [isListening])

//   // Handle page change
//   const goToPage = useCallback((page) => {
//     if (page >= 1 && page <= (pagination.totalPages || 1)) {
//       setCurrentPage(page)
//       window.scrollTo({ top: 0, behavior: 'smooth' })
//     }
//   }, [pagination.totalPages])

//   // Clear all filters
//   const clearFilters = useCallback(() => {
//     clearSearch()
//     setActiveCategory('all')
//     setCurrentPage(1)
//     setSelectedLetter(null)
//   }, [clearSearch])

//   // Handle letter click - filter by letter
//   const handleLetterClick = (letter) => {
//     if (selectedLetter === letter) {
//       setSelectedLetter(null) // Toggle off if same letter
//     } else {
//       setSelectedLetter(letter)
//       setCurrentPage(1)
//       setDebouncedSearchQuery('')
//       setSearchInputValue('')
//     }
//     // Scroll to authors section
//     setTimeout(() => {
//       const element = document.getElementById('authors-section')
//       if (element) {
//         element.scrollIntoView({ behavior: 'smooth', block: 'start' })
//       }
//     }, 100)
//   }

//   // Sort options
//   const sortOptions = [
//     { value: 'popular', label: 'Most Popular', icon: Flame },
//     { value: 'poems', label: 'Most Poems', icon: BookOpen },
//     { value: 'followers', label: 'Most Followers', icon: Users },
//     { value: 'name', label: 'Name A-Z', icon: Quote },
//     { value: 'recent', label: 'Recently Added', icon: Clock }
//   ]

//   // Get era badge color
//   const getEraColor = (era) => {
//     switch (era?.toLowerCase()) {
//       case 'classical': return 'bg-purple-100 text-purple-700'
//       case 'modern': return 'bg-blue-100 text-blue-700'
//       case 'contemporary': return 'bg-green-100 text-green-700'
//       case 'sufi': return 'bg-orange-100 text-orange-700'
//       case 'marsiya': return 'bg-red-100 text-red-700'
//       default: return 'bg-gray-100 text-gray-700'
//     }
//   }

//   // Get category icon
//   const getCategoryIcon = (categoryId) => {
//     switch (categoryId) {
//       case 'sufi': return <Music className="h-4 w-4" />
//       case 'marsiya': return <Mic className="h-4 w-4" />
//       case 'nauha': return <Headphones className="h-4 w-4" />
//       default: return null
//     }
//   }

//   // Format follower count
//   const formatFollowers = (count) => {
//     if (!count) return '0'
//     if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
//     if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
//     return count.toString()
//   }

//   // Loading state
//   if (isLoading && authors.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
//           <div className="flex items-center justify-center min-h-[60vh]">
//             <div className="text-center">
//               <div className="relative">
//                 <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-amber-500 rounded-2xl animate-pulse mx-auto mb-6 flex items-center justify-center">
//                   <Users className="h-10 w-10 text-white" />
//                 </div>
//                 <div className="absolute -top-2 -right-2">
//                   <Sparkles className="h-6 w-6 text-amber-400 animate-spin" />
//                 </div>
//               </div>
//               <p className="text-gray-600 font-medium">Loading literary legends...</p>
//               <p className="text-sm text-gray-400 mt-1">Discovering poets and writers</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Error state
//   if (error && authors.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
//           <div className="text-center py-12">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-2xl mb-6">
//               <Users className="h-10 w-10 text-red-500" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to load authors</h2>
//             <p className="text-gray-500 mb-6">There was an error loading the authors. Please try again.</p>
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
//               <span className="text-sm text-white font-medium">INDEX OF POETS</span>
//             </div>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
//               Literary Authors
//             </h1>
//             <p className="text-base text-white/90 max-w-2xl mx-auto">
//               Discover legendary poets, marsiya writers, nauha reciters, and literary figures
//             </p>
//           </motion.div>
//         </div>
        
//         <div className="absolute bottom-0 left-0 right-0">
//           <svg className="w-full h-10 text-slate-50" preserveAspectRatio="none" viewBox="0 0 1440 54">
//             <path fill="currentColor" d="M0,22L80,27.3C160,33,320,43,480,42.7C640,43,800,32,960,26.7C1120,21,1280,21,1360,21.3L1440,22L1440,54L1360,54C1280,54,1120,54,960,54C800,54,640,54,480,54C320,54,160,54,80,54L0,54Z"/>
//           </svg>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        
//         {/* Alphabetical Index */}
//         <motion.div 
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 mb-6"
//         >
//           <div className="flex items-center justify-between mb-2 px-2">
//             <h3 className="text-sm font-semibold text-gray-700">INDEX OF POETS</h3>
//             <button
//               onClick={() => setShowIndex(!showIndex)}
//               className="text-gray-400 hover:text-gray-600 transition-colors"
//             >
//               {showIndex ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
//             </button>
//           </div>
          
//           {showIndex && (
//             <div className="flex flex-wrap justify-center gap-1">
//               {alphabetIndex.map((letter) => (
//                 <button
//                   key={letter}
//                   onClick={() => handleLetterClick(letter)}
//                   className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${
//                     selectedLetter === letter
//                       ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
//                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }`}
//                 >
//                   {letter}
//                 </button>
//               ))}
//             </div>
//           )}
//         </motion.div>

//         {/* Search & Filters Bar */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6"
//         >
//           <div className="flex flex-col lg:flex-row gap-4">
//             {/* Search Input with Voice Search and Clear Button */}
//             <div className="flex-1 relative">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//               <input
//                 ref={searchInputRef}
//                 type="text"
//                 placeholder="Search authors by name or genre..."
//                 value={searchInputValue}
//                 onChange={handleSearchChange}
//                 className="w-full pl-12 pr-24 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 transition-all"
//                 autoComplete="off"
//               />
//               {/* Clear Button */}
//               {searchInputValue && (
//                 <button
//                   onClick={clearSearch}
//                   className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                   type="button"
//                 >
//                   <X className="h-4 w-4" />
//                 </button>
//               )}
//               {/* Voice Search Button */}
//               {voiceSupported && (
//                 <button
//                   onClick={isListening ? stopVoiceSearch : startVoiceSearch}
//                   className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg transition-all ${
//                     isListening 
//                       ? 'bg-red-500 text-white animate-pulse' 
//                       : 'text-gray-400 hover:text-primary-600 hover:bg-primary-50'
//                   }`}
//                   type="button"
//                   title={isListening ? "Stop listening" : "Voice search"}
//                 >
//                   {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
//                 </button>
//               )}
//             </div>

//             {/* Sort Dropdown */}
//             <div className="flex gap-2">
//               <select
//                 value={sortBy}
//                 onChange={(e) => {
//                   setSortBy(e.target.value)
//                   setSelectedLetter(null)
//                 }}
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
//             </div>
//           </div>

//           {/* Search Results Info */}
//           {debouncedSearchQuery && (
//             <div className="mt-3 px-3 py-2 bg-primary-50 rounded-lg">
//               <p className="text-sm text-primary-700">
//                 Searching for: <span className="font-semibold">"{debouncedSearchQuery}"</span>
//                 {!isFetching && !isLoading && (
//                   <span className="ml-2">({pagination.total || authors.length} authors found)</span>
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

//           {/* Selected Letter Info */}
//           {selectedLetter && !debouncedSearchQuery && (
//             <div className="mt-3 px-3 py-2 bg-amber-50 rounded-lg">
//               <p className="text-sm text-amber-700">
//                 Showing authors starting with: <span className="font-semibold">{selectedLetter}</span>
//                 <button
//                   onClick={() => setSelectedLetter(null)}
//                   className="ml-3 text-amber-600 hover:text-amber-800"
//                 >
//                   Clear filter
//                 </button>
//               </p>
//             </div>
//           )}

//           {/* Voice Search Listening Indicator */}
//           {isListening && (
//             <div className="mt-3 px-3 py-2 bg-red-50 rounded-lg animate-pulse">
//               <p className="text-sm text-red-600 flex items-center gap-2">
//                 <Mic className="h-4 w-4 animate-pulse" />
//                 Listening... Speak the author name you want to search
//               </p>
//             </div>
//           )}

//           {/* Category Tabs */}
//           <div className="flex overflow-x-auto scrollbar-hide gap-2 mt-4 pb-2">
//             <button
//               onClick={() => {
//                 setActiveCategory('all')
//                 setSelectedLetter(null)
//               }}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
//                 activeCategory === 'all'
//                   ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               All Authors
//             </button>
//             {extendedCategories.map((cat) => (
//               <button
//                 key={cat.id}
//                 onClick={() => {
//                   setActiveCategory(cat.id)
//                   setSelectedLetter(null)
//                 }}
//                 className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
//                   activeCategory === cat.id
//                     ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 {getCategoryIcon(cat.id)}
//                 <span>{cat.label}</span>
//               </button>
//             ))}
//           </div>
//         </motion.div>

//         {/* Results Header */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center gap-2">
//             <div className="w-1 h-6 bg-gradient-to-b from-primary-600 to-amber-500 rounded-full" />
//             <p className="text-sm text-gray-600">
//               Showing <span className="font-semibold text-gray-900">{authors.length}</span> authors
//             </p>
//           </div>
//           {(activeCategory !== 'all' || debouncedSearchQuery || selectedLetter) && (
//             <button
//               onClick={clearFilters}
//               className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors"
//             >
//               Clear all filters
//               <X className="h-3 w-3" />
//             </button>
//           )}
//         </div>

//         {/* Authors Grid Section */}
//         <div id="authors-section">
//           {authors.length === 0 && !isLoading ? (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="bg-white rounded-2xl p-12 text-center border border-gray-100"
//             >
//               <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-2xl mb-6">
//                 <Users className="h-10 w-10 text-amber-600" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">No authors found</h3>
//               <p className="text-gray-500 max-w-md mx-auto">
//                 {debouncedSearchQuery 
//                   ? `No authors matching "${debouncedSearchQuery}" found. Try a different search term.`
//                   : selectedLetter
//                   ? `No authors found starting with "${selectedLetter}".`
//                   : 'No authors available in this category yet.'}
//               </p>
//               {(debouncedSearchQuery || activeCategory !== 'all' || selectedLetter) && (
//                 <button
//                   onClick={clearFilters}
//                   className="mt-6 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
//                 >
//                   Clear all filters
//                   <X className="h-3 w-3" />
//                 </button>
//               )}
//             </motion.div>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//                 {authors.map((author, index) => (
//                   <motion.div
//                     key={author._id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: Math.min(index * 0.03, 0.3) }}
//                     whileHover={{ y: -4 }}
//                   >
//                     <Link to={`/author/${author.slug}`} className="block group">
//                       <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
//                         <div className="relative bg-gradient-to-r from-primary-600 via-primary-500 to-amber-500 p-3">
//                           <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
//                           <div className="relative flex items-center gap-3">
//                             {/* Avatar */}
//                             <div className="flex-shrink-0">
//                               {author.avatar ? (
//                                 <img
//                                   src={author.avatar}
//                                   alt={author.name}
//                                   className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
//                                 />
//                               ) : (
//                                 <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white shadow-md">
//                                   <span className="text-xl font-bold text-white">
//                                     {author.name?.charAt(0) || 'A'}
//                                   </span>
//                                 </div>
//                               )}
//                             </div>
                            
//                             {/* Info */}
//                             <div className="flex-1 min-w-0">
//                               <h3 className="font-bold text-white text-base group-hover:translate-x-1 transition-transform truncate">
//                                 {author.name}
//                               </h3>
//                               {author.nameUrdu && (
//                                 <p className="urdu-text text-white/80 text-xs truncate" dir="rtl">
//                                   {author.nameUrdu}
//                                 </p>
//                               )}
//                               <div className="flex items-center gap-1 mt-1">
//                                 <span className={`px-1.5 py-0.5 text-[10px] rounded-full bg-white/20 backdrop-blur-sm text-white capitalize`}>
//                                   {author.era || 'Classical'}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className="p-3">
//                           <p className="text-gray-600 text-xs line-clamp-2 mb-2">
//                             {author.bio?.substring(0, 80)}...
//                           </p>
                          
//                           {/* Stats */}
//                           <div className="flex items-center justify-between text-xs">
//                             <div className="flex items-center gap-2 text-gray-500">
//                               <span className="flex items-center gap-0.5">
//                                 <BookOpen className="h-3 w-3" />
//                                 <span>{author.stats?.poemsCount || 0}</span>
//                               </span>
//                               <span className="flex items-center gap-0.5">
//                                 <Users className="h-3 w-3" />
//                                 <span>{formatFollowers(author.stats?.followers || 0)}</span>
//                               </span>
//                               <span className="flex items-center gap-0.5">
//                                 <Eye className="h-3 w-3" />
//                                 <span>{formatFollowers(author.stats?.views || 0)}</span>
//                               </span>
//                             </div>
//                             {author.isVerified && (
//                               <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">
//                                 Verified
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Pagination */}
//               {(pagination.totalPages > 1 || Math.ceil(authors.length / itemsPerPage) > 1) && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="flex items-center justify-center gap-2 mt-8"
//                 >
//                   <button
//                     onClick={() => goToPage(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                   >
//                     <ChevronLeft className="h-5 w-5 text-gray-600" />
//                   </button>
                  
//                   <div className="flex items-center gap-1">
//                     {Array.from({ length: pagination.totalPages || Math.ceil(authors.length / itemsPerPage) }, (_, i) => i + 1)
//                       .filter(page => {
//                         const totalPages = pagination.totalPages || Math.ceil(authors.length / itemsPerPage)
//                         if (totalPages <= 7) return true
//                         if (page === 1 || page === totalPages) return true
//                         if (page >= currentPage - 1 && page <= currentPage + 1) return true
//                         return false
//                       })
//                       .map((page, index, array) => {
//                         if (index > 0 && array[index - 1] !== page - 1) {
//                           return <span key={`ellipsis-${page}`} className="px-3 py-2 text-gray-400">...</span>
//                         }
//                         return (
//                           <button
//                             key={page}
//                             onClick={() => goToPage(page)}
//                             className={`min-w-[36px] h-9 rounded-xl font-medium transition-all ${
//                               currentPage === page
//                                 ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
//                                 : 'text-gray-600 hover:bg-gray-100'
//                             }`}
//                           >
//                             {page}
//                           </button>
//                         )
//                       })}
//                   </div>

//                   <button
//                     onClick={() => goToPage(currentPage + 1)}
//                     disabled={currentPage === (pagination.totalPages || Math.ceil(authors.length / itemsPerPage))}
//                     className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                   >
//                     <ChevronRight className="h-5 w-5 text-gray-600" />
//                   </button>
//                 </motion.div>
//               )}

//               {/* Loading indicator */}
//               <AnimatePresence>
//                 {(isFetching || isLoading) && authors.length > 0 && (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="flex justify-center mt-6"
//                   >
//                     <div className="flex items-center gap-2">
//                       <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
//                       <span className="text-sm text-gray-500">Loading more authors...</span>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AuthorsListPage


















// // working revert if 
// //client/src/pages/public/AuthorsListPage.jsx
// import React, { useState, useEffect, useCallback, useRef } from 'react'
// import { useTranslation } from 'react-i18next'
// import { useSearchParams, Link } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useQuery } from '@tanstack/react-query'
// import { 
//   Search, Users, BookOpen, Heart, Filter, Loader2, ChevronLeft, ChevronRight, 
//   Eye, UserPlus, Headphones, Music, Mic, X, MicOff, Volume2, Zap, Sparkles,
//   Award, Star, TrendingUp, Clock, Calendar, MapPin, Quote, BookMarked, Flame,
//   ChevronDown, ChevronUp, Mail, Globe, Twitter, Facebook, Instagram, Youtube,
//   Verified, Library, PenTool, Bookmark, Share2, MoreHorizontal
// } from 'lucide-react'
// import authorAPI from '../../api/authorAPI'
// import { AUTHOR_CATEGORIES } from '../../utils/constants.js'

// const AuthorsListPage = () => {
//   const { t } = useTranslation()
//   const [searchParams, setSearchParams] = useSearchParams()
//   const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all')
//   const [searchInputValue, setSearchInputValue] = useState('')
//   const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
//   const [sortBy, setSortBy] = useState('popular')
//   const [currentPage, setCurrentPage] = useState(1)
//   const [isListening, setIsListening] = useState(false)
//   const [voiceSupported, setVoiceSupported] = useState(true)
//   const [selectedLetter, setSelectedLetter] = useState(null)
//   const [showIndex, setShowIndex] = useState(true)
  
//   // ============================================
//   // 🔴 CHANGE 1: UPDATED itemsPerPage to 12 (from 9)
//   // ============================================
//   const itemsPerPage = 12
  
//   const searchInputRef = useRef(null)
//   const debounceTimerRef = useRef(null)
//   const recognitionRef = useRef(null)
//   const letterRefs = useRef({})

//   // Alphabetical index letters
//   const alphabetIndex = [
//     'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
//     'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V/W', 'Y', 'Z'
//   ]

//   // Extended author categories
//   const extendedCategories = [
//     ...AUTHOR_CATEGORIES,
//     { id: 'sufi', label: 'Sufi Poets', labelHi: 'सूफ़ी कवि', labelUr: 'صوفی شعراء' },
//     { id: 'marsiya', label: 'Marsiya Writers', labelHi: 'मर्सिया लेखक', labelUr: 'مرثیہ نگار' },
//     { id: 'nauha', label: 'Nauha Reciters', labelHi: 'नौहा ख्वान', labelUr: 'نوحہ خوان' },
//     { id: 'manqabat', label: 'Manqabat Writers', labelHi: 'मनक़बत लेखक', labelUr: 'منقبت نگار' },
//   ]

//   // Initialize speech recognition
//   useEffect(() => {
//     if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
//       recognitionRef.current = new SpeechRecognition()
//       recognitionRef.current.continuous = false
//       recognitionRef.current.interimResults = false
//       recognitionRef.current.lang = 'ur-PK, hi-IN, en-US'
      
//       recognitionRef.current.onresult = (event) => {
//         const transcript = event.results[0][0].transcript
//         setSearchInputValue(transcript)
//         updateDebouncedSearch(transcript)
//         setIsListening(false)
//         setSelectedLetter(null)
//       }
      
//       recognitionRef.current.onerror = (event) => {
//         console.error('Speech recognition error:', event.error)
//         setIsListening(false)
//       }
      
//       recognitionRef.current.onend = () => {
//         setIsListening(false)
//       }
//     } else {
//       setVoiceSupported(false)
//     }
    
//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.abort()
//       }
//     }
//   }, [])

//   // Fetch authors from API
//   const { data: response, isLoading, error, refetch, isFetching } = useQuery({
//     queryKey: ['authors', currentPage, activeCategory, sortBy, debouncedSearchQuery, selectedLetter],
//     queryFn: () => {
//       const params = {
//         page: currentPage,
//         limit: itemsPerPage,
//         sort: sortBy
//       }
      
//       if (activeCategory !== 'all') {
//         params.category = activeCategory
//       }
      
//       if (debouncedSearchQuery) {
//         params.search = debouncedSearchQuery
//       }
      
//       if (selectedLetter && !debouncedSearchQuery) {
//         params.letter = selectedLetter
//       }
      
//       return authorAPI.getAuthors(params)
//     },
//     enabled: true,
//     staleTime: 30000,
//     keepPreviousData: true,
//     refetchOnWindowFocus: false,
//   })

//   // Extract authors and pagination
//   const authorsData = response?.data?.data || response?.data || response || []
//   const authors = Array.isArray(authorsData) ? authorsData : []
//   const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 }

//   // Update URL when category changes
//   useEffect(() => {
//     if (activeCategory && activeCategory !== 'all') {
//       setSearchParams({ category: activeCategory })
//     } else {
//       setSearchParams({})
//     }
//     setCurrentPage(1)
//     setSelectedLetter(null)
//   }, [activeCategory, setSearchParams])

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
//       if (value) {
//         setSelectedLetter(null)
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

//   const startVoiceSearch = useCallback(() => {
//     if (recognitionRef.current && !isListening) {
//       try {
//         recognitionRef.current.start()
//         setIsListening(true)
//       } catch (error) {
//         console.error('Failed to start voice recognition:', error)
//       }
//     }
//   }, [isListening])

//   const stopVoiceSearch = useCallback(() => {
//     if (recognitionRef.current && isListening) {
//       recognitionRef.current.stop()
//       setIsListening(false)
//     }
//   }, [isListening])

//   const goToPage = useCallback((page) => {
//     if (page >= 1 && page <= (pagination.totalPages || 1)) {
//       setCurrentPage(page)
//       window.scrollTo({ top: 0, behavior: 'smooth' })
//     }
//   }, [pagination.totalPages])

//   const clearFilters = useCallback(() => {
//     clearSearch()
//     setActiveCategory('all')
//     setCurrentPage(1)
//     setSelectedLetter(null)
//   }, [clearSearch])

//   const handleLetterClick = (letter) => {
//     if (selectedLetter === letter) {
//       setSelectedLetter(null)
//     } else {
//       setSelectedLetter(letter)
//       setCurrentPage(1)
//       setDebouncedSearchQuery('')
//       setSearchInputValue('')
//     }
//     setTimeout(() => {
//       const element = document.getElementById('authors-section')
//       if (element) {
//         element.scrollIntoView({ behavior: 'smooth', block: 'start' })
//       }
//     }, 100)
//   }

//   // Sort options
//   const sortOptions = [
//     { value: 'popular', label: 'Most Popular', icon: Flame },
//     { value: 'poems', label: 'Most Poems', icon: BookOpen },
//     { value: 'followers', label: 'Most Followers', icon: Users },
//     { value: 'name', label: 'Name A-Z', icon: Quote },
//     { value: 'recent', label: 'Recently Added', icon: Clock }
//   ]

//   const getEraColor = (era) => {
//     switch (era?.toLowerCase()) {
//       case 'classical': return 'bg-purple-100 text-purple-700 border-purple-200'
//       case 'modern': return 'bg-blue-100 text-blue-700 border-blue-200'
//       case 'contemporary': return 'bg-green-100 text-green-700 border-green-200'
//       case 'sufi': return 'bg-orange-100 text-orange-700 border-orange-200'
//       case 'marsiya': return 'bg-red-100 text-red-700 border-red-200'
//       default: return 'bg-gray-100 text-gray-700 border-gray-200'
//     }
//   }

//   const getCategoryIcon = (categoryId) => {
//     switch (categoryId) {
//       case 'sufi': return <Music className="h-4 w-4" />
//       case 'marsiya': return <Mic className="h-4 w-4" />
//       case 'nauha': return <Headphones className="h-4 w-4" />
//       default: return null
//     }
//   }

//   const formatNumber = (count) => {
//     if (!count) return '0'
//     if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
//     if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
//     return count.toString()
//   }

//   // Loading state
//   if (isLoading && authors.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
//           <div className="flex items-center justify-center min-h-[60vh]">
//             <div className="text-center">
//               <div className="relative">
//                 <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-amber-500 rounded-2xl animate-pulse mx-auto mb-6 flex items-center justify-center">
//                   <Users className="h-10 w-10 text-white" />
//                 </div>
//                 <div className="absolute -top-2 -right-2">
//                   <Sparkles className="h-6 w-6 text-amber-400 animate-spin" />
//                 </div>
//               </div>
//               <p className="text-gray-600 font-medium">Loading literary legends...</p>
//               <p className="text-sm text-gray-400 mt-1">Discovering poets and writers</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Error state
//   if (error && authors.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
//           <div className="text-center py-12">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-2xl mb-6">
//               <Users className="h-10 w-10 text-red-500" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to load authors</h2>
//             <p className="text-gray-500 mb-6">There was an error loading the authors. Please try again.</p>
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
//               <span className="text-sm text-white font-medium">INDEX OF POETS</span>
//             </div>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
//               Literary Authors
//             </h1>
//             <p className="text-base text-white/90 max-w-2xl mx-auto">
//               Discover legendary poets, marsiya writers, nauha reciters, and literary figures
//             </p>
//           </motion.div>
//         </div>
        
//         <div className="absolute bottom-0 left-0 right-0">
//           <svg className="w-full h-10 text-slate-50" preserveAspectRatio="none" viewBox="0 0 1440 54">
//             <path fill="currentColor" d="M0,22L80,27.3C160,33,320,43,480,42.7C640,43,800,32,960,26.7C1120,21,1280,21,1360,21.3L1440,22L1440,54L1360,54C1280,54,1120,54,960,54C800,54,640,54,480,54C320,54,160,54,80,54L0,54Z"/>
//           </svg>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        
//         {/* Alphabetical Index */}
//         <motion.div 
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 mb-6"
//         >
//           <div className="flex items-center justify-between mb-2 px-2">
//             <h3 className="text-sm font-semibold text-gray-700">INDEX OF POETS</h3>
//             <button
//               onClick={() => setShowIndex(!showIndex)}
//               className="text-gray-400 hover:text-gray-600 transition-colors"
//             >
//               {showIndex ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
//             </button>
//           </div>
          
//           {showIndex && (
//             <div className="flex flex-wrap justify-center gap-1">
//               {alphabetIndex.map((letter) => (
//                 <button
//                   key={letter}
//                   onClick={() => handleLetterClick(letter)}
//                   className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${
//                     selectedLetter === letter
//                       ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
//                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }`}
//                 >
//                   {letter}
//                 </button>
//               ))}
//             </div>
//           )}
//         </motion.div>

//         {/* Search & Filters Bar */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6"
//         >
//           <div className="flex flex-col lg:flex-row gap-4">
//             <div className="flex-1 relative">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//               <input
//                 ref={searchInputRef}
//                 type="text"
//                 placeholder="Search authors by name or genre..."
//                 value={searchInputValue}
//                 onChange={handleSearchChange}
//                 className="w-full pl-12 pr-24 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 transition-all"
//                 autoComplete="off"
//               />
//               {searchInputValue && (
//                 <button
//                   onClick={clearSearch}
//                   className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                   type="button"
//                 >
//                   <X className="h-4 w-4" />
//                 </button>
//               )}
//               {voiceSupported && (
//                 <button
//                   onClick={isListening ? stopVoiceSearch : startVoiceSearch}
//                   className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg transition-all ${
//                     isListening 
//                       ? 'bg-red-500 text-white animate-pulse' 
//                       : 'text-gray-400 hover:text-primary-600 hover:bg-primary-50'
//                   }`}
//                   type="button"
//                   title={isListening ? "Stop listening" : "Voice search"}
//                 >
//                   {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
//                 </button>
//               )}
//             </div>

//             <div className="flex gap-2">
//               <select
//                 value={sortBy}
//                 onChange={(e) => {
//                   setSortBy(e.target.value)
//                   setSelectedLetter(null)
//                 }}
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
//             </div>
//           </div>

//           {/* Search Results Info */}
//           {debouncedSearchQuery && (
//             <div className="mt-3 px-3 py-2 bg-primary-50 rounded-lg">
//               <p className="text-sm text-primary-700">
//                 Searching for: <span className="font-semibold">"{debouncedSearchQuery}"</span>
//                 {!isFetching && !isLoading && (
//                   <span className="ml-2">({pagination.total || authors.length} authors found)</span>
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

//           {/* Selected Letter Info */}
//           {selectedLetter && !debouncedSearchQuery && (
//             <div className="mt-3 px-3 py-2 bg-amber-50 rounded-lg">
//               <p className="text-sm text-amber-700">
//                 Showing authors starting with: <span className="font-semibold">{selectedLetter}</span>
//                 <button
//                   onClick={() => setSelectedLetter(null)}
//                   className="ml-3 text-amber-600 hover:text-amber-800"
//                 >
//                   Clear filter
//                 </button>
//               </p>
//             </div>
//           )}

//           {/* Voice Search Listening Indicator */}
//           {isListening && (
//             <div className="mt-3 px-3 py-2 bg-red-50 rounded-lg animate-pulse">
//               <p className="text-sm text-red-600 flex items-center gap-2">
//                 <Mic className="h-4 w-4 animate-pulse" />
//                 Listening... Speak the author name you want to search
//               </p>
//             </div>
//           )}

//           {/* Category Tabs */}
//           <div className="flex overflow-x-auto scrollbar-hide gap-2 mt-4 pb-2">
//             <button
//               onClick={() => {
//                 setActiveCategory('all')
//                 setSelectedLetter(null)
//               }}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
//                 activeCategory === 'all'
//                   ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               All Authors
//             </button>
//             {extendedCategories.map((cat) => (
//               <button
//                 key={cat.id}
//                 onClick={() => {
//                   setActiveCategory(cat.id)
//                   setSelectedLetter(null)
//                 }}
//                 className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
//                   activeCategory === cat.id
//                     ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 {getCategoryIcon(cat.id)}
//                 <span>{cat.label}</span>
//               </button>
//             ))}
//           </div>
//         </motion.div>

//         {/* Results Header */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center gap-2">
//             <div className="w-1 h-6 bg-gradient-to-b from-primary-600 to-amber-500 rounded-full" />
//             <p className="text-sm text-gray-600">
//               Showing <span className="font-semibold text-gray-900">{authors.length}</span> of{' '}
//               <span className="font-semibold text-gray-900">{pagination.total || authors.length}</span> authors
//             </p>
//           </div>
//           {(activeCategory !== 'all' || debouncedSearchQuery || selectedLetter) && (
//             <button
//               onClick={clearFilters}
//               className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors"
//             >
//               Clear all filters
//               <X className="h-3 w-3" />
//             </button>
//           )}
//         </div>

//         {/* ============================================
//             🔴 CHANGE 2: REDESIGNED AUTHOR CARD
//             🔴 CHANGE 3: 3 COLUMN GRID (xl:grid-cols-3)
//         ============================================ */}
//         <div id="authors-section">
//           {authors.length === 0 && !isLoading ? (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="bg-white rounded-2xl p-12 text-center border border-gray-100"
//             >
//               <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-2xl mb-6">
//                 <Users className="h-10 w-10 text-amber-600" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">No authors found</h3>
//               <p className="text-gray-500 max-w-md mx-auto">
//                 {debouncedSearchQuery 
//                   ? `No authors matching "${debouncedSearchQuery}" found. Try a different search term.`
//                   : selectedLetter
//                   ? `No authors found starting with "${selectedLetter}".`
//                   : 'No authors available in this category yet.'}
//               </p>
//               {(debouncedSearchQuery || activeCategory !== 'all' || selectedLetter) && (
//                 <button
//                   onClick={clearFilters}
//                   className="mt-6 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
//                 >
//                   Clear all filters
//                   <X className="h-3 w-3" />
//                 </button>
//               )}
//             </motion.div>
//           ) : (
//             <>
//               {/* 
//                 🔴 CHANGE 3: Column change from 4 to 3 columns
//                 Previously: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
//                 Now:       grid-cols-1 md:grid-cols-2 lg:grid-cols-3
//               */}
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {authors.map((author, index) => (
//                   <motion.div
//                     key={author._id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: Math.min(index * 0.05, 0.3) }}
//                     whileHover={{ y: -4 }}
//                   >
//                     <Link to={`/author/${author.slug}`} className="block group">
//                       {/* REDESIGNED AUTHOR CARD */}
//                       <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                        
//                         {/* Card Header with Gradient Background */}
//                         <div className="relative bg-gradient-to-r from-primary-600 via-primary-500 to-amber-500 p-5">
//                           <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                          
//                           {/* Era Badge */}
//                           <div className="relative flex justify-end mb-2">
//                             <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getEraColor(author.era)} border`}>
//                               {author.era || 'Classical'} Era
//                             </span>
//                           </div>
                          
//                           {/* Avatar and Name Section */}
//                           <div className="relative flex flex-col items-center text-center">
//                             {/* Avatar */}
//                             <div className="mb-3">
//                               {author.avatar ? (
//                                 <img
//                                   src={author.avatar}
//                                   alt={author.name}
//                                   className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg ring-4 ring-white/30"
//                                 />
//                               ) : (
//                                 <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white shadow-lg ring-4 ring-white/30">
//                                   <span className="text-4xl font-bold text-white">
//                                     {author.name?.charAt(0) || 'A'}
//                                   </span>
//                                 </div>
//                               )}
//                             </div>
                            
//                             {/* Author Name */}
//                             <h3 className="font-bold text-white text-xl group-hover:translate-x-1 transition-transform">
//                               {author.name}
//                             </h3>
                            
//                             {/* Urdu/Hindi Name */}
//                             {author.nameUrdu && (
//                               <p className="urdu-text text-white/80 text-sm mt-1" dir="rtl">
//                                 {author.nameUrdu}
//                               </p>
//                             )}
                            
//                             {/* Verified Badge */}
//                             {author.isVerified && (
//                               <div className="inline-flex items-center gap-1 mt-2 bg-amber-500/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
//                                 <Verified className="h-3 w-3 text-amber-300" />
//                                 <span className="text-xs text-amber-100">Verified Poet</span>
//                               </div>
//                             )}
//                           </div>
//                         </div>
                        
//                         {/* Card Body */}
//                         <div className="p-5 flex-1">
//                           {/* Bio */}
//                           <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
//                             {author.bio?.substring(0, 120)}...
//                           </p>
                          
//                           {/* Stats Grid */}
//                           <div className="grid grid-cols-3 gap-3 mb-4 pt-2 border-t border-gray-100">
//                             <div className="text-center">
//                               <div className="flex items-center justify-center gap-1 text-primary-600 mb-1">
//                                 <BookOpen className="h-4 w-4" />
//                               </div>
//                               <p className="text-lg font-bold text-gray-800">{author.stats?.poemsCount || 0}</p>
//                               <p className="text-xs text-gray-400">Poems</p>
//                             </div>
//                             <div className="text-center">
//                               <div className="flex items-center justify-center gap-1 text-pink-500 mb-1">
//                                 <Heart className="h-4 w-4" />
//                               </div>
//                               <p className="text-lg font-bold text-gray-800">{formatNumber(author.stats?.followers || 0)}</p>
//                               <p className="text-xs text-gray-400">Followers</p>
//                             </div>
//                             <div className="text-center">
//                               <div className="flex items-center justify-center gap-1 text-blue-500 mb-1">
//                                 <Eye className="h-4 w-4" />
//                               </div>
//                               <p className="text-lg font-bold text-gray-800">{formatNumber(author.stats?.views || 0)}</p>
//                               <p className="text-xs text-gray-400">Views</p>
//                             </div>
//                           </div>
                          
//                           {/* Genres Tags */}
//                           {author.genres && author.genres.length > 0 && (
//                             <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-gray-100">
//                               {author.genres.slice(0, 3).map((genre, idx) => (
//                                 <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full capitalize">
//                                   {genre}
//                                 </span>
//                               ))}
//                               {author.genres.length > 3 && (
//                                 <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-full">
//                                   +{author.genres.length - 3}
//                                 </span>
//                               )}
//                             </div>
//                           )}
//                         </div>
                        
//                         {/* Card Footer */}
//                         <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
//                           <div className="flex items-center gap-1 text-gray-400 text-xs">
//                             <Calendar className="h-3 w-3" />
//                             <span>Joined {new Date(author.createdAt).getFullYear()}</span>
//                           </div>
//                           <div className="text-primary-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
//                             View Profile →
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* ============================================
//                   🔴 CHANGE 4: PAGINATION - 12 items per page
//               ============================================ */}
//               {(pagination.totalPages > 1 || Math.ceil(authors.length / itemsPerPage) > 1) && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="flex items-center justify-center gap-2 mt-12"
//                 >
//                   <button
//                     onClick={() => goToPage(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                   >
//                     <ChevronLeft className="h-5 w-5 text-gray-600" />
//                   </button>
                  
//                   <div className="flex items-center gap-1">
//                     {/* Show current page indicator */}
//                     <span className="px-4 py-2 text-sm text-gray-600">
//                       Page {currentPage} of {pagination.totalPages || Math.ceil(authors.length / itemsPerPage)}
//                     </span>
//                   </div>

//                   <button
//                     onClick={() => goToPage(currentPage + 1)}
//                     disabled={currentPage === (pagination.totalPages || Math.ceil(authors.length / itemsPerPage))}
//                     className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                   >
//                     <ChevronRight className="h-5 w-5 text-gray-600" />
//                   </button>
//                 </motion.div>
//               )}

//               {/* Loading indicator */}
//               <AnimatePresence>
//                 {(isFetching || isLoading) && authors.length > 0 && (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="flex justify-center mt-8"
//                   >
//                     <div className="flex items-center gap-2">
//                       <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
//                       <span className="text-sm text-gray-500">Loading more authors...</span>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AuthorsListPage





















// // client/src/pages/public/AuthorsListPage.jsx
// import React, { useState, useEffect, useCallback, useRef } from 'react'
// import { useTranslation } from 'react-i18next'
// import { useSearchParams, Link } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { 
//   Search, Users, BookOpen, Heart, Filter, Loader2, ChevronLeft, ChevronRight, 
//   Eye, UserPlus, Headphones, Music, Mic, X, MicOff, Volume2, Zap, Sparkles,
//   Award, Star, TrendingUp, Clock, Calendar, MapPin, Quote, BookMarked, Flame,
//   ChevronDown, ChevronUp, Mail, Globe, Twitter, Facebook, Instagram, Youtube,
//   Verified, Library, PenTool, Bookmark, Share2, MoreHorizontal
// } from 'lucide-react'
// import authorAPI from '../../api/authorAPI'
// import bookAPI from '../../api/bookAPI'
// import { AUTHOR_CATEGORIES } from '../../utils/constants.js'
// import { useSelector } from 'react-redux'
// import toast from 'react-hot-toast'

// const AuthorsListPage = () => {
//   const { t } = useTranslation()
//   const [searchParams, setSearchParams] = useSearchParams()
//   const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all')
//   const [searchInputValue, setSearchInputValue] = useState('')
//   const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
//   const [sortBy, setSortBy] = useState('popular')
//   const [currentPage, setCurrentPage] = useState(1)
//   const [isListening, setIsListening] = useState(false)
//   const [voiceSupported, setVoiceSupported] = useState(true)
//   const [selectedLetter, setSelectedLetter] = useState(null)
//   const [showIndex, setShowIndex] = useState(true)
//   const [carouselIndices, setCarouselIndices] = useState({})
  
//   const itemsPerPage = 12
//   const searchInputRef = useRef(null)
//   const debounceTimerRef = useRef(null)
//   const recognitionRef = useRef(null)
//   const queryClient = useQueryClient()
//   const { user } = useSelector(state => state.auth)

//   // Alphabetical index letters
//   const alphabetIndex = [
//     'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
//     'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V/W', 'Y', 'Z'
//   ]

//   // Extended author categories
//   const extendedCategories = [
//     ...AUTHOR_CATEGORIES,
//     { id: 'sufi', label: 'Sufi Poets', labelHi: 'सूफ़ी कवि', labelUr: 'صوفی شعراء' },
//     { id: 'marsiya', label: 'Marsiya Writers', labelHi: 'मर्सिया लेखक', labelUr: 'مرثیہ نگار' },
//     { id: 'nauha', label: 'Nauha Reciters', labelHi: 'नौहा ख्वान', labelUr: 'نوحہ خوان' },
//     { id: 'manqabat', label: 'Manqabat Writers', labelHi: 'मनक़बत लेखक', labelUr: 'منقبت نگار' },
//   ]

//   // Initialize speech recognition
//   useEffect(() => {
//     if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
//       recognitionRef.current = new SpeechRecognition()
//       recognitionRef.current.continuous = false
//       recognitionRef.current.interimResults = false
//       recognitionRef.current.lang = 'ur-PK, hi-IN, en-US'
      
//       recognitionRef.current.onresult = (event) => {
//         const transcript = event.results[0][0].transcript
//         setSearchInputValue(transcript)
//         updateDebouncedSearch(transcript)
//         setIsListening(false)
//         setSelectedLetter(null)
//       }
      
//       recognitionRef.current.onerror = (event) => {
//         console.error('Speech recognition error:', event.error)
//         setIsListening(false)
//       }
      
//       recognitionRef.current.onend = () => {
//         setIsListening(false)
//       }
//     } else {
//       setVoiceSupported(false)
//     }
    
//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.abort()
//       }
//     }
//   }, [])

//   // Fetch authors from API
//   const { data: response, isLoading, error, refetch, isFetching } = useQuery({
//     queryKey: ['authors', currentPage, activeCategory, sortBy, debouncedSearchQuery, selectedLetter],
//     queryFn: () => {
//       const params = {
//         page: currentPage,
//         limit: itemsPerPage,
//         sort: sortBy
//       }
      
//       if (activeCategory !== 'all') {
//         params.category = activeCategory
//       }
      
//       if (debouncedSearchQuery) {
//         params.search = debouncedSearchQuery
//       }
      
//       if (selectedLetter && !debouncedSearchQuery) {
//         params.letter = selectedLetter
//       }
      
//       return authorAPI.getAuthors(params)
//     },
//     enabled: true,
//     staleTime: 30000,
//     keepPreviousData: true,
//     refetchOnWindowFocus: false,
//   })

//   // Extract authors and pagination from response
//   const authorsData = response?.data?.data || response?.data || response || []
//   const authors = Array.isArray(authorsData) ? authorsData : []
//   const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 }

//   // Like book mutation
//   const likeBookMutation = useMutation({
//     mutationFn: ({ bookId, isLiked }) => {
//       if (isLiked) {
//         return bookAPI.unlikeBook(bookId)
//       }
//       return bookAPI.likeBook(bookId)
//     },
//     onSuccess: (data, variables) => {
//       queryClient.invalidateQueries(['author-books'])
//       toast.success(variables.isLiked ? 'Book unliked' : 'Book liked')
//     },
//     onError: () => {
//       toast.error('Failed to update like status')
//     }
//   })

//   // Handle like click
//   const handleLikeBook = (e, bookId, isLiked) => {
//     e.preventDefault()
//     e.stopPropagation()
    
//     if (!user) {
//       toast.error('Please login to like books')
//       return
//     }
    
//     likeBookMutation.mutate({ bookId, isLiked })
//   }

//   // Handle carousel navigation
//   const handlePrevBook = (authorId, booksLength, e) => {
//     e.preventDefault()
//     e.stopPropagation()
//     setCarouselIndices(prev => ({
//       ...prev,
//       [authorId]: Math.max(0, (prev[authorId] || 0) - 1)
//     }))
//   }

//   const handleNextBook = (authorId, booksLength, e) => {
//     e.preventDefault()
//     e.stopPropagation()
//     setCarouselIndices(prev => ({
//       ...prev,
//       [authorId]: Math.min(booksLength - 1, (prev[authorId] || 0) + 1)
//     }))
//   }

//   // Update URL when category changes
//   useEffect(() => {
//     if (activeCategory && activeCategory !== 'all') {
//       setSearchParams({ category: activeCategory })
//     } else {
//       setSearchParams({})
//     }
//     setCurrentPage(1)
//     setSelectedLetter(null)
//   }, [activeCategory, setSearchParams])

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
//       if (value) {
//         setSelectedLetter(null)
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

//   const startVoiceSearch = useCallback(() => {
//     if (recognitionRef.current && !isListening) {
//       try {
//         recognitionRef.current.start()
//         setIsListening(true)
//       } catch (error) {
//         console.error('Failed to start voice recognition:', error)
//       }
//     }
//   }, [isListening])

//   const stopVoiceSearch = useCallback(() => {
//     if (recognitionRef.current && isListening) {
//       recognitionRef.current.stop()
//       setIsListening(false)
//     }
//   }, [isListening])

//   const goToPage = useCallback((page) => {
//     if (page >= 1 && page <= (pagination.totalPages || 1)) {
//       setCurrentPage(page)
//       window.scrollTo({ top: 0, behavior: 'smooth' })
//     }
//   }, [pagination.totalPages])

//   const clearFilters = useCallback(() => {
//     clearSearch()
//     setActiveCategory('all')
//     setCurrentPage(1)
//     setSelectedLetter(null)
//   }, [clearSearch])

//   const handleLetterClick = (letter) => {
//     if (selectedLetter === letter) {
//       setSelectedLetter(null)
//     } else {
//       setSelectedLetter(letter)
//       setCurrentPage(1)
//       setDebouncedSearchQuery('')
//       setSearchInputValue('')
//     }
//     setTimeout(() => {
//       const element = document.getElementById('authors-section')
//       if (element) {
//         element.scrollIntoView({ behavior: 'smooth', block: 'start' })
//       }
//     }, 100)
//   }

//   // Sort options
//   const sortOptions = [
//     { value: 'popular', label: 'Most Popular', icon: Flame },
//     { value: 'poems', label: 'Most Poems', icon: BookOpen },
//     { value: 'followers', label: 'Most Followers', icon: Users },
//     { value: 'name', label: 'Name A-Z', icon: Quote },
//     { value: 'recent', label: 'Recently Added', icon: Clock }
//   ]

//   const getEraColor = (era) => {
//     switch (era?.toLowerCase()) {
//       case 'classical': return 'bg-purple-100 text-purple-700 border-purple-200'
//       case 'modern': return 'bg-blue-100 text-blue-700 border-blue-200'
//       case 'contemporary': return 'bg-green-100 text-green-700 border-green-200'
//       case 'sufi': return 'bg-orange-100 text-orange-700 border-orange-200'
//       case 'marsiya': return 'bg-red-100 text-red-700 border-red-200'
//       default: return 'bg-gray-100 text-gray-700 border-gray-200'
//     }
//   }

//   const getCategoryIcon = (categoryId) => {
//     switch (categoryId) {
//       case 'sufi': return <Music className="h-4 w-4" />
//       case 'marsiya': return <Mic className="h-4 w-4" />
//       case 'nauha': return <Headphones className="h-4 w-4" />
//       default: return null
//     }
//   }

//   const formatNumber = (count) => {
//     if (!count) return '0'
//     if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
//     if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
//     return count.toString()
//   }

//   // Mock books data - in production, fetch from API
//   const getAuthorBooks = (authorId) => {
//     // This should be replaced with actual API call
//     return []
//   }

//   // Loading state
//   if (isLoading && authors.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
//           <div className="flex items-center justify-center min-h-[60vh]">
//             <div className="text-center">
//               <div className="relative">
//                 <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-amber-500 rounded-2xl animate-pulse mx-auto mb-6 flex items-center justify-center">
//                   <Users className="h-10 w-10 text-white" />
//                 </div>
//                 <div className="absolute -top-2 -right-2">
//                   <Sparkles className="h-6 w-6 text-amber-400 animate-spin" />
//                 </div>
//               </div>
//               <p className="text-gray-600 font-medium">Loading literary legends...</p>
//               <p className="text-sm text-gray-400 mt-1">Discovering poets and writers</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Error state
//   if (error && authors.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
//           <div className="text-center py-12">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-2xl mb-6">
//               <Users className="h-10 w-10 text-red-500" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to load authors</h2>
//             <p className="text-gray-500 mb-6">There was an error loading the authors. Please try again.</p>
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
//               <span className="text-sm text-white font-medium">INDEX OF POETS</span>
//             </div>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
//               Literary Authors
//             </h1>
//             <p className="text-base text-white/90 max-w-2xl mx-auto">
//               Discover legendary poets, marsiya writers, nauha reciters, and literary figures
//             </p>
//           </motion.div>
//         </div>
        
//         <div className="absolute bottom-0 left-0 right-0">
//           <svg className="w-full h-10 text-slate-50" preserveAspectRatio="none" viewBox="0 0 1440 54">
//             <path fill="currentColor" d="M0,22L80,27.3C160,33,320,43,480,42.7C640,43,800,32,960,26.7C1120,21,1280,21,1360,21.3L1440,22L1440,54L1360,54C1280,54,1120,54,960,54C800,54,640,54,480,54C320,54,160,54,80,54L0,54Z"/>
//           </svg>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        
//         {/* Alphabetical Index */}
//         <motion.div 
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 mb-6"
//         >
//           <div className="flex items-center justify-between mb-2 px-2">
//             <h3 className="text-sm font-semibold text-gray-700">INDEX OF POETS</h3>
//             <button
//               onClick={() => setShowIndex(!showIndex)}
//               className="text-gray-400 hover:text-gray-600 transition-colors"
//             >
//               {showIndex ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
//             </button>
//           </div>
          
//           {showIndex && (
//             <div className="flex flex-wrap justify-center gap-1">
//               {alphabetIndex.map((letter) => (
//                 <button
//                   key={letter}
//                   onClick={() => handleLetterClick(letter)}
//                   className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${
//                     selectedLetter === letter
//                       ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
//                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }`}
//                 >
//                   {letter}
//                 </button>
//               ))}
//             </div>
//           )}
//         </motion.div>

//         {/* Search & Filters Bar */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6"
//         >
//           <div className="flex flex-col lg:flex-row gap-4">
//             <div className="flex-1 relative">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//               <input
//                 ref={searchInputRef}
//                 type="text"
//                 placeholder="Search authors by name or genre..."
//                 value={searchInputValue}
//                 onChange={handleSearchChange}
//                 className="w-full pl-12 pr-24 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 transition-all"
//                 autoComplete="off"
//               />
//               {searchInputValue && (
//                 <button
//                   onClick={clearSearch}
//                   className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                   type="button"
//                 >
//                   <X className="h-4 w-4" />
//                 </button>
//               )}
//               {voiceSupported && (
//                 <button
//                   onClick={isListening ? stopVoiceSearch : startVoiceSearch}
//                   className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg transition-all ${
//                     isListening 
//                       ? 'bg-red-500 text-white animate-pulse' 
//                       : 'text-gray-400 hover:text-primary-600 hover:bg-primary-50'
//                   }`}
//                   type="button"
//                   title={isListening ? "Stop listening" : "Voice search"}
//                 >
//                   {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
//                 </button>
//               )}
//             </div>

//             <div className="flex gap-2">
//               <select
//                 value={sortBy}
//                 onChange={(e) => {
//                   setSortBy(e.target.value)
//                   setSelectedLetter(null)
//                 }}
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
//             </div>
//           </div>

//           {/* Search Results Info */}
//           {debouncedSearchQuery && (
//             <div className="mt-3 px-3 py-2 bg-primary-50 rounded-lg">
//               <p className="text-sm text-primary-700">
//                 Searching for: <span className="font-semibold">"{debouncedSearchQuery}"</span>
//                 {!isFetching && !isLoading && (
//                   <span className="ml-2">({pagination.total || authors.length} authors found)</span>
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

//           {/* Selected Letter Info */}
//           {selectedLetter && !debouncedSearchQuery && (
//             <div className="mt-3 px-3 py-2 bg-amber-50 rounded-lg">
//               <p className="text-sm text-amber-700">
//                 Showing authors starting with: <span className="font-semibold">{selectedLetter}</span>
//                 <button
//                   onClick={() => setSelectedLetter(null)}
//                   className="ml-3 text-amber-600 hover:text-amber-800"
//                 >
//                   Clear filter
//                 </button>
//               </p>
//             </div>
//           )}

//           {/* Voice Search Listening Indicator */}
//           {isListening && (
//             <div className="mt-3 px-3 py-2 bg-red-50 rounded-lg animate-pulse">
//               <p className="text-sm text-red-600 flex items-center gap-2">
//                 <Mic className="h-4 w-4 animate-pulse" />
//                 Listening... Speak the author name you want to search
//               </p>
//             </div>
//           )}

//           {/* Category Tabs */}
//           <div className="flex overflow-x-auto scrollbar-hide gap-2 mt-4 pb-2">
//             <button
//               onClick={() => {
//                 setActiveCategory('all')
//                 setSelectedLetter(null)
//               }}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
//                 activeCategory === 'all'
//                   ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               All Authors
//             </button>
//             {extendedCategories.map((cat) => (
//               <button
//                 key={cat.id}
//                 onClick={() => {
//                   setActiveCategory(cat.id)
//                   setSelectedLetter(null)
//                 }}
//                 className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
//                   activeCategory === cat.id
//                     ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 {getCategoryIcon(cat.id)}
//                 <span>{cat.label}</span>
//               </button>
//             ))}
//           </div>
//         </motion.div>

//         {/* Results Header */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center gap-2">
//             <div className="w-1 h-6 bg-gradient-to-b from-primary-600 to-amber-500 rounded-full" />
//             <p className="text-sm text-gray-600">
//               Showing <span className="font-semibold text-gray-900">{authors.length}</span> of{' '}
//               <span className="font-semibold text-gray-900">{pagination.total || authors.length}</span> authors
//             </p>
//           </div>
//           {(activeCategory !== 'all' || debouncedSearchQuery || selectedLetter) && (
//             <button
//               onClick={clearFilters}
//               className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors"
//             >
//               Clear all filters
//               <X className="h-3 w-3" />
//             </button>
//           )}
//         </div>

//         {/* Authors Grid */}
//         <div id="authors-section">
//           {authors.length === 0 && !isLoading ? (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="bg-white rounded-2xl p-12 text-center border border-gray-100"
//             >
//               <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-2xl mb-6">
//                 <Users className="h-10 w-10 text-amber-600" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">No authors found</h3>
//               <p className="text-gray-500 max-w-md mx-auto">
//                 {debouncedSearchQuery 
//                   ? `No authors matching "${debouncedSearchQuery}" found. Try a different search term.`
//                   : selectedLetter
//                   ? `No authors found starting with "${selectedLetter}".`
//                   : 'No authors available in this category yet.'}
//               </p>
//               {(debouncedSearchQuery || activeCategory !== 'all' || selectedLetter) && (
//                 <button
//                   onClick={clearFilters}
//                   className="mt-6 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
//                 >
//                   Clear all filters
//                   <X className="h-3 w-3" />
//                 </button>
//               )}
//             </motion.div>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {authors.map((author, index) => {
//                   const currentIndex = carouselIndices[author._id] || 0
//                   const authorBooks = getAuthorBooks(author._id)
//                   const hasBooks = authorBooks.length > 0
                  
//                   return (
//                     <motion.div
//                       key={author._id}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: Math.min(index * 0.05, 0.3) }}
//                       whileHover={{ y: -4 }}
//                     >
//                       <Link to={`/author/${author.slug}`} className="block group">
//                         <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                          
//                           {/* Card Header with Gradient Background */}
//                           <div className="relative bg-gradient-to-r from-primary-600 via-primary-500 to-amber-500 p-5">
//                             <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                            
//                             {/* Era Badge */}
//                             <div className="relative flex justify-end mb-2">
//                               <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getEraColor(author.era)} border`}>
//                                 {author.era || 'Classical'} Era
//                               </span>
//                             </div>
                            
//                             {/* Avatar and Name Section */}
//                             <div className="relative flex flex-col items-center text-center">
//                               {/* Avatar */}
//                               <div className="mb-3">
//                                 {author.avatar ? (
//                                   <img
//                                     src={author.avatar}
//                                     alt={author.name}
//                                     className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg ring-4 ring-white/30"
//                                   />
//                                 ) : (
//                                   <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white shadow-lg ring-4 ring-white/30">
//                                     <span className="text-4xl font-bold text-white">
//                                       {author.name?.charAt(0) || 'A'}
//                                     </span>
//                                   </div>
//                                 )}
//                               </div>
                              
//                               {/* Author Name */}
//                               <h3 className="font-bold text-white text-xl group-hover:translate-x-1 transition-transform">
//                                 {author.name}
//                               </h3>
                              
//                               {/* Urdu/Hindi Name */}
//                               {author.nameUrdu && (
//                                 <p className="urdu-text text-white/80 text-sm mt-1" dir="rtl">
//                                   {author.nameUrdu}
//                                 </p>
//                               )}
                              
//                               {/* Verified Badge */}
//                               {author.isVerified && (
//                                 <div className="inline-flex items-center gap-1 mt-2 bg-amber-500/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
//                                   <Verified className="h-3 w-3 text-amber-300" />
//                                   <span className="text-xs text-amber-100">Verified Poet</span>
//                                 </div>
//                               )}
//                             </div>
//                           </div>
                          
//                           {/* Card Body */}
//                           <div className="p-5 flex-1">
//                             {/* Bio */}
//                             <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
//                               {author.bio?.substring(0, 100)}...
//                             </p>
                            
//                             {/* Book Carousel Section */}
//                             {hasBooks && (
//                               <div className="mb-4">
//                                 <div className="flex items-center justify-between mb-2">
//                                   <div className="flex items-center gap-1">
//                                     <Library className="h-3.5 w-3.5 text-primary-600" />
//                                     <span className="text-xs font-medium text-gray-700">Books by Author</span>
//                                   </div>
//                                   <span className="text-xs text-gray-400">{authorBooks.length} books</span>
//                                 </div>
                                
//                                 <div className="relative">
//                                   {/* Book Carousel */}
//                                   <div className="overflow-hidden">
//                                     <div 
//                                       className="flex transition-transform duration-300 ease-out"
//                                       style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//                                     >
//                                       {authorBooks.map((book, bookIdx) => (
//                                         <div key={book._id || bookIdx} className="w-full flex-shrink-0 px-1">
//                                           <div 
//                                             className="bg-gray-50 rounded-lg p-3 border border-gray-100 hover:border-primary-200 transition-colors cursor-pointer"
//                                             onClick={(e) => {
//                                               e.preventDefault()
//                                               e.stopPropagation()
//                                               window.location.href = `/book/${book.slug}`
//                                             }}
//                                           >
//                                             <div className="flex gap-3">
//                                               {/* Book Cover */}
//                                               <div className="flex-shrink-0">
//                                                 {book.coverImage ? (
//                                                   <img 
//                                                     src={book.coverImage} 
//                                                     alt={book.title}
//                                                     className="w-12 h-16 object-cover rounded-md shadow-sm"
//                                                   />
//                                                 ) : (
//                                                   <div className="w-12 h-16 bg-gradient-to-br from-primary-100 to-amber-100 rounded-md flex items-center justify-center">
//                                                     <BookOpen className="h-6 w-6 text-primary-500" />
//                                                   </div>
//                                                 )}
//                                               </div>
                                              
//                                               {/* Book Info */}
//                                               <div className="flex-1 min-w-0">
//                                                 <h4 className="font-medium text-gray-800 text-sm line-clamp-1">
//                                                   {book.title}
//                                                 </h4>
//                                                 {book.language && (
//                                                   <p className="text-xs text-gray-500 mt-0.5">
//                                                     {book.language === 'urdu' ? 'اردو' : 
//                                                      book.language === 'hindi' ? 'हिंदी' : 
//                                                      book.language === 'english' ? 'English' : book.language}
//                                                   </p>
//                                                 )}
//                                                 <div className="flex items-center justify-between mt-2">
//                                                   <div className="flex items-center gap-1">
//                                                     <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
//                                                     <span className="text-xs text-gray-600">
//                                                       {book.stats?.averageRating?.toFixed(1) || '4.5'}
//                                                     </span>
//                                                   </div>
//                                                   <button
//                                                     onClick={(e) => handleLikeBook(e, book._id, book.isLiked)}
//                                                     className="p-1 rounded-full hover:bg-red-50 transition-colors"
//                                                   >
//                                                     {book.isLiked ? (
//                                                       <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
//                                                     ) : (
//                                                       <Heart className="h-3.5 w-3.5 text-gray-400 hover:text-red-400" />
//                                                     )}
//                                                   </button>
//                                                 </div>
//                                               </div>
//                                             </div>
//                                           </div>
//                                         </div>
//                                       ))}
//                                     </div>
//                                   </div>
                                  
//                                   {/* Carousel Navigation Buttons */}
//                                   {authorBooks.length > 1 && (
//                                     <>
//                                       <button
//                                         onClick={(e) => handlePrevBook(author._id, authorBooks.length, e)}
//                                         disabled={currentIndex === 0}
//                                         className={`absolute left-0 top-1/2 -translate-y-1/2 -ml-2 w-6 h-6 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center transition-all ${
//                                           currentIndex === 0 
//                                             ? 'opacity-50 cursor-not-allowed' 
//                                             : 'hover:bg-gray-50 hover:scale-110'
//                                         }`}
//                                       >
//                                         <ChevronLeft className="h-3.5 w-3.5 text-gray-600" />
//                                       </button>
//                                       <button
//                                         onClick={(e) => handleNextBook(author._id, authorBooks.length, e)}
//                                         disabled={currentIndex === authorBooks.length - 1}
//                                         className={`absolute right-0 top-1/2 -translate-y-1/2 -mr-2 w-6 h-6 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center transition-all ${
//                                           currentIndex === authorBooks.length - 1 
//                                             ? 'opacity-50 cursor-not-allowed' 
//                                             : 'hover:bg-gray-50 hover:scale-110'
//                                         }`}
//                                       >
//                                         <ChevronRight className="h-3.5 w-3.5 text-gray-600" />
//                                       </button>
//                                     </>
//                                   )}
//                                 </div>
                                
//                                 {/* Carousel Dots */}
//                                 {authorBooks.length > 1 && (
//                                   <div className="flex justify-center gap-1 mt-2">
//                                     {authorBooks.map((_, dotIdx) => (
//                                       <button
//                                         key={dotIdx}
//                                         onClick={(e) => {
//                                           e.preventDefault()
//                                           e.stopPropagation()
//                                           setCarouselIndices(prev => ({
//                                             ...prev,
//                                             [author._id]: dotIdx
//                                           }))
//                                         }}
//                                         className={`h-1.5 rounded-full transition-all ${
//                                           currentIndex === dotIdx 
//                                             ? 'w-4 bg-primary-500' 
//                                             : 'w-1.5 bg-gray-300'
//                                         }`}
//                                       />
//                                     ))}
//                                   </div>
//                                 )}
//                               </div>
//                             )}
                            
//                             {/* Stats Grid */}
//                             <div className="grid grid-cols-3 gap-3 mb-4 pt-2 border-t border-gray-100">
//                               <div className="text-center">
//                                 <div className="flex items-center justify-center gap-1 text-primary-600 mb-1">
//                                   <BookOpen className="h-4 w-4" />
//                                 </div>
//                                 <p className="text-lg font-bold text-gray-800">{author.stats?.poemsCount || 0}</p>
//                                 <p className="text-xs text-gray-400">Poems</p>
//                               </div>
//                               <div className="text-center">
//                                 <div className="flex items-center justify-center gap-1 text-pink-500 mb-1">
//                                   <Heart className="h-4 w-4" />
//                                 </div>
//                                 <p className="text-lg font-bold text-gray-800">{formatNumber(author.stats?.followers || 0)}</p>
//                                 <p className="text-xs text-gray-400">Followers</p>
//                               </div>
//                               <div className="text-center">
//                                 <div className="flex items-center justify-center gap-1 text-blue-500 mb-1">
//                                   <Eye className="h-4 w-4" />
//                                 </div>
//                                 <p className="text-lg font-bold text-gray-800">{formatNumber(author.stats?.views || 0)}</p>
//                                 <p className="text-xs text-gray-400">Views</p>
//                               </div>
//                             </div>
                            
//                             {/* Genres Tags */}
//                             {author.genres && author.genres.length > 0 && (
//                               <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-gray-100">
//                                 {author.genres.slice(0, 3).map((genre, idx) => (
//                                   <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full capitalize">
//                                     {genre}
//                                   </span>
//                                 ))}
//                                 {author.genres.length > 3 && (
//                                   <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-full">
//                                     +{author.genres.length - 3}
//                                   </span>
//                                 )}
//                               </div>
//                             )}
//                           </div>
                          
//                           {/* Card Footer */}
//                           <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
//                             <div className="flex items-center gap-1 text-gray-400 text-xs">
//                               <Calendar className="h-3 w-3" />
//                               <span>Joined {new Date(author.createdAt).getFullYear()}</span>
//                             </div>
//                             <div className="text-primary-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
//                               View Profile →
//                             </div>
//                           </div>
//                         </div>
//                       </Link>
//                     </motion.div>
//                   )
//                 })}
//               </div>

//               {/* Pagination */}
//               {(pagination.totalPages > 1 || Math.ceil(authors.length / itemsPerPage) > 1) && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="flex items-center justify-center gap-2 mt-12"
//                 >
//                   <button
//                     onClick={() => goToPage(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                   >
//                     <ChevronLeft className="h-5 w-5 text-gray-600" />
//                   </button>
                  
//                   <div className="flex items-center gap-1">
//                     <span className="px-4 py-2 text-sm text-gray-600">
//                       Page {currentPage} of {pagination.totalPages || Math.ceil(authors.length / itemsPerPage)}
//                     </span>
//                   </div>

//                   <button
//                     onClick={() => goToPage(currentPage + 1)}
//                     disabled={currentPage === (pagination.totalPages || Math.ceil(authors.length / itemsPerPage))}
//                     className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                   >
//                     <ChevronRight className="h-5 w-5 text-gray-600" />
//                   </button>
//                 </motion.div>
//               )}

//               {/* Loading indicator */}
//               <AnimatePresence>
//                 {(isFetching || isLoading) && authors.length > 0 && (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="flex justify-center mt-8"
//                   >
//                     <div className="flex items-center gap-2">
//                       <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
//                       <span className="text-sm text-gray-500">Loading more authors...</span>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AuthorsListPage























// //working- client/src/pages/public/AuthorsListPage.jsx
// import React, { useState, useEffect, useCallback, useRef } from 'react'
// import { useTranslation } from 'react-i18next'
// import { useSearchParams, Link } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { 
//   Search, Users, BookOpen, Heart, Filter, Loader2, ChevronLeft, ChevronRight, 
//   Eye, UserPlus, Headphones, Music, Mic, X, MicOff, Volume2, Zap, Sparkles,
//   Award, Star, TrendingUp, Clock, Calendar, MapPin, Quote, BookMarked, Flame,
//   ChevronDown, ChevronUp, Mail, Globe, Twitter, Facebook, Instagram, Youtube,
//   Verified, Library, PenTool, Bookmark, Share2, MoreHorizontal
// } from 'lucide-react'
// import authorAPI from '../../api/authorAPI'
// import bookAPI from '../../api/bookAPI'
// import { AUTHOR_CATEGORIES } from '../../utils/constants.js'
// import { useSelector } from 'react-redux'
// import toast from 'react-hot-toast'

// const AuthorsListPage = () => {
//   const { t } = useTranslation()
//   const [searchParams, setSearchParams] = useSearchParams()
//   const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all')
//   const [searchInputValue, setSearchInputValue] = useState('')
//   const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
//   const [sortBy, setSortBy] = useState('popular')
//   const [currentPage, setCurrentPage] = useState(1)
//   const [isListening, setIsListening] = useState(false)
//   const [voiceSupported, setVoiceSupported] = useState(true)
//   const [selectedLetter, setSelectedLetter] = useState(null)
//   const [showIndex, setShowIndex] = useState(true)
//   const [carouselIndices, setCarouselIndices] = useState({})
//   const [authorBooksCache, setAuthorBooksCache] = useState({})
//   const [loadingBooks, setLoadingBooks] = useState({})
  
//   const itemsPerPage = 12
//   const searchInputRef = useRef(null)
//   const debounceTimerRef = useRef(null)
//   const recognitionRef = useRef(null)
//   const queryClient = useQueryClient()
//   const { user } = useSelector(state => state.auth)

//   // Alphabetical index letters
//   const alphabetIndex = [
//     'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
//     'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V/W', 'Y', 'Z'
//   ]

//   // Extended author categories
//   const extendedCategories = [
//     ...AUTHOR_CATEGORIES,
//     { id: 'sufi', label: 'Sufi Poets', labelHi: 'सूफ़ी कवि', labelUr: 'صوفی شعراء' },
//     { id: 'marsiya', label: 'Marsiya Writers', labelHi: 'मर्सिया लेखक', labelUr: 'مرثیہ نگار' },
//     { id: 'nauha', label: 'Nauha Reciters', labelHi: 'नौहा ख्वान', labelUr: 'نوحہ خوان' },
//     { id: 'manqabat', label: 'Manqabat Writers', labelHi: 'मनक़बत लेखक', labelUr: 'منقبت نگار' },
//   ]

//   // Initialize speech recognition
//   useEffect(() => {
//     if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
//       recognitionRef.current = new SpeechRecognition()
//       recognitionRef.current.continuous = false
//       recognitionRef.current.interimResults = false
//       recognitionRef.current.lang = 'ur-PK, hi-IN, en-US'
      
//       recognitionRef.current.onresult = (event) => {
//         const transcript = event.results[0][0].transcript
//         setSearchInputValue(transcript)
//         updateDebouncedSearch(transcript)
//         setIsListening(false)
//         setSelectedLetter(null)
//       }
      
//       recognitionRef.current.onerror = (event) => {
//         console.error('Speech recognition error:', event.error)
//         setIsListening(false)
//       }
      
//       recognitionRef.current.onend = () => {
//         setIsListening(false)
//       }
//     } else {
//       setVoiceSupported(false)
//     }
    
//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.abort()
//       }
//     }
//   }, [])

//   // Fetch authors from API
//   const { data: response, isLoading, error, refetch, isFetching } = useQuery({
//     queryKey: ['authors', currentPage, activeCategory, sortBy, debouncedSearchQuery, selectedLetter],
//     queryFn: () => {
//       const params = {
//         page: currentPage,
//         limit: itemsPerPage,
//         sort: sortBy
//       }
      
//       if (activeCategory !== 'all') {
//         params.category = activeCategory
//       }
      
//       if (debouncedSearchQuery) {
//         params.search = debouncedSearchQuery
//       }
      
//       if (selectedLetter && !debouncedSearchQuery) {
//         params.letter = selectedLetter
//       }
      
//       return authorAPI.getAuthors(params)
//     },
//     enabled: true,
//     staleTime: 30000,
//     keepPreviousData: true,
//     refetchOnWindowFocus: false,
//   })

//   // Extract authors and pagination from response
//   const authorsData = response?.data?.data || response?.data || response || []
//   const authors = Array.isArray(authorsData) ? authorsData : []
//   const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 }

//   // Function to fetch books for an author
//   const fetchAuthorBooks = useCallback(async (authorId, authorSlug) => {
//     // Don't fetch if already cached or currently loading
//     if (authorBooksCache[authorId] || loadingBooks[authorId]) return
    
//     setLoadingBooks(prev => ({ ...prev, [authorId]: true }))
    
//     try {
//       const result = await authorAPI.getAuthorBooks(authorSlug)
//       if (result.success && result.data) {
//         setAuthorBooksCache(prev => ({ ...prev, [authorId]: result.data }))
//       } else if (result.data?.data) {
//         setAuthorBooksCache(prev => ({ ...prev, [authorId]: result.data.data }))
//       }
//     } catch (err) {
//       console.error(`Failed to fetch books for author ${authorId}:`, err)
//       setAuthorBooksCache(prev => ({ ...prev, [authorId]: [] }))
//     } finally {
//       setLoadingBooks(prev => ({ ...prev, [authorId]: false }))
//     }
//   }, [authorBooksCache, loadingBooks])

//   // Load books for authors when they become visible
//   useEffect(() => {
//     if (authors && authors.length > 0) {
//       authors.forEach(author => {
//         if (author._id && !authorBooksCache[author._id] && !loadingBooks[author._id]) {
//           fetchAuthorBooks(author._id, author.slug)
//         }
//       })
//     }
//   }, [authors, fetchAuthorBooks, authorBooksCache, loadingBooks])

//   // Like book mutation
//   const likeBookMutation = useMutation({
//     mutationFn: async ({ bookId, isLiked }) => {
//       if (isLiked) {
//         return await bookAPI.unlikeBook(bookId)
//       } else {
//         return await bookAPI.likeBook(bookId)
//       }
//     },
//     onSuccess: (data, variables) => {
//       // Update the cache to reflect the new like status
//       const { bookId, isLiked } = variables
//       // Update authorBooksCache with new like status
//       setAuthorBooksCache(prev => {
//         const newCache = { ...prev }
//         Object.keys(newCache).forEach(authorId => {
//           newCache[authorId] = newCache[authorId].map(book => 
//             book._id === bookId ? { ...book, isLiked: !isLiked } : book
//           )
//         })
//         return newCache
//       })
//       toast.success(isLiked ? 'Book removed from likes' : 'Book added to likes')
//     },
//     onError: (error) => {
//       console.error('Like mutation error:', error)
//       toast.error('Failed to update like status')
//     }
//   })

//   // Handle like click
//   const handleLikeBook = (e, bookId, isLiked) => {
//     e.preventDefault()
//     e.stopPropagation()
    
//     if (!user) {
//       toast.error('Please login to like books')
//       return
//     }
    
//     likeBookMutation.mutate({ bookId, isLiked })
//   }

//   // Handle carousel navigation
//   const handlePrevBook = (authorId, booksLength, e) => {
//     e.preventDefault()
//     e.stopPropagation()
//     setCarouselIndices(prev => ({
//       ...prev,
//       [authorId]: Math.max(0, (prev[authorId] || 0) - 1)
//     }))
//   }

//   const handleNextBook = (authorId, booksLength, e) => {
//     e.preventDefault()
//     e.stopPropagation()
//     setCarouselIndices(prev => ({
//       ...prev,
//       [authorId]: Math.min(booksLength - 1, (prev[authorId] || 0) + 1)
//     }))
//   }

//   // Update URL when category changes
//   useEffect(() => {
//     if (activeCategory && activeCategory !== 'all') {
//       setSearchParams({ category: activeCategory })
//     } else {
//       setSearchParams({})
//     }
//     setCurrentPage(1)
//     setSelectedLetter(null)
//   }, [activeCategory, setSearchParams])

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
//       if (value) {
//         setSelectedLetter(null)
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

//   const startVoiceSearch = useCallback(() => {
//     if (recognitionRef.current && !isListening) {
//       try {
//         recognitionRef.current.start()
//         setIsListening(true)
//       } catch (error) {
//         console.error('Failed to start voice recognition:', error)
//       }
//     }
//   }, [isListening])

//   const stopVoiceSearch = useCallback(() => {
//     if (recognitionRef.current && isListening) {
//       recognitionRef.current.stop()
//       setIsListening(false)
//     }
//   }, [isListening])

//   const goToPage = useCallback((page) => {
//     if (page >= 1 && page <= (pagination.totalPages || 1)) {
//       setCurrentPage(page)
//       window.scrollTo({ top: 0, behavior: 'smooth' })
//     }
//   }, [pagination.totalPages])

//   const clearFilters = useCallback(() => {
//     clearSearch()
//     setActiveCategory('all')
//     setCurrentPage(1)
//     setSelectedLetter(null)
//   }, [clearSearch])

//   const handleLetterClick = (letter) => {
//     if (selectedLetter === letter) {
//       setSelectedLetter(null)
//     } else {
//       setSelectedLetter(letter)
//       setCurrentPage(1)
//       setDebouncedSearchQuery('')
//       setSearchInputValue('')
//     }
//     setTimeout(() => {
//       const element = document.getElementById('authors-section')
//       if (element) {
//         element.scrollIntoView({ behavior: 'smooth', block: 'start' })
//       }
//     }, 100)
//   }

//   // Sort options
//   const sortOptions = [
//     { value: 'popular', label: 'Most Popular', icon: Flame },
//     { value: 'poems', label: 'Most Poems', icon: BookOpen },
//     { value: 'followers', label: 'Most Followers', icon: Users },
//     { value: 'name', label: 'Name A-Z', icon: Quote },
//     { value: 'recent', label: 'Recently Added', icon: Clock }
//   ]

//   const getEraColor = (era) => {
//     switch (era?.toLowerCase()) {
//       case 'classical': return 'bg-purple-100 text-purple-700 border-purple-200'
//       case 'modern': return 'bg-blue-100 text-blue-700 border-blue-200'
//       case 'contemporary': return 'bg-green-100 text-green-700 border-green-200'
//       case 'sufi': return 'bg-orange-100 text-orange-700 border-orange-200'
//       case 'marsiya': return 'bg-red-100 text-red-700 border-red-200'
//       default: return 'bg-gray-100 text-gray-700 border-gray-200'
//     }
//   }

//   const getCategoryIcon = (categoryId) => {
//     switch (categoryId) {
//       case 'sufi': return <Music className="h-4 w-4" />
//       case 'marsiya': return <Mic className="h-4 w-4" />
//       case 'nauha': return <Headphones className="h-4 w-4" />
//       default: return null
//     }
//   }

//   const formatNumber = (count) => {
//     if (!count) return '0'
//     if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
//     if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
//     return count.toString()
//   }

//   // Loading state
//   if (isLoading && authors.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
//           <div className="flex items-center justify-center min-h-[60vh]">
//             <div className="text-center">
//               <div className="relative">
//                 <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-amber-500 rounded-2xl animate-pulse mx-auto mb-6 flex items-center justify-center">
//                   <Users className="h-10 w-10 text-white" />
//                 </div>
//                 <div className="absolute -top-2 -right-2">
//                   <Sparkles className="h-6 w-6 text-amber-400 animate-spin" />
//                 </div>
//               </div>
//               <p className="text-gray-600 font-medium">Loading literary legends...</p>
//               <p className="text-sm text-gray-400 mt-1">Discovering poets and writers</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Error state
//   if (error && authors.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
//           <div className="text-center py-12">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-2xl mb-6">
//               <Users className="h-10 w-10 text-red-500" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to load authors</h2>
//             <p className="text-gray-500 mb-6">There was an error loading the authors. Please try again.</p>
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
//               <span className="text-sm text-white font-medium">INDEX OF POETS</span>
//             </div>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
//               Literary Authors
//             </h1>
//             <p className="text-base text-white/90 max-w-2xl mx-auto">
//               Discover legendary poets, marsiya writers, nauha reciters, and literary figures
//             </p>
//           </motion.div>
//         </div>
        
//         <div className="absolute bottom-0 left-0 right-0">
//           <svg className="w-full h-10 text-slate-50" preserveAspectRatio="none" viewBox="0 0 1440 54">
//             <path fill="currentColor" d="M0,22L80,27.3C160,33,320,43,480,42.7C640,43,800,32,960,26.7C1120,21,1280,21,1360,21.3L1440,22L1440,54L1360,54C1280,54,1120,54,960,54C800,54,640,54,480,54C320,54,160,54,80,54L0,54Z"/>
//           </svg>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        
//         {/* Alphabetical Index */}
//         <motion.div 
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 mb-6"
//         >
//           <div className="flex items-center justify-between mb-2 px-2">
//             <h3 className="text-sm font-semibold text-gray-700">INDEX OF POETS</h3>
//             <button
//               onClick={() => setShowIndex(!showIndex)}
//               className="text-gray-400 hover:text-gray-600 transition-colors"
//             >
//               {showIndex ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
//             </button>
//           </div>
          
//           {showIndex && (
//             <div className="flex flex-wrap justify-center gap-1">
//               {alphabetIndex.map((letter) => (
//                 <button
//                   key={letter}
//                   onClick={() => handleLetterClick(letter)}
//                   className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${
//                     selectedLetter === letter
//                       ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
//                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }`}
//                 >
//                   {letter}
//                 </button>
//               ))}
//             </div>
//           )}
//         </motion.div>

//         {/* Search & Filters Bar */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6"
//         >
//           <div className="flex flex-col lg:flex-row gap-4">
//             <div className="flex-1 relative">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//               <input
//                 ref={searchInputRef}
//                 type="text"
//                 placeholder="Search authors by name or genre..."
//                 value={searchInputValue}
//                 onChange={handleSearchChange}
//                 className="w-full pl-12 pr-24 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 transition-all"
//                 autoComplete="off"
//               />
//               {searchInputValue && (
//                 <button
//                   onClick={clearSearch}
//                   className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                   type="button"
//                 >
//                   <X className="h-4 w-4" />
//                 </button>
//               )}
//               {voiceSupported && (
//                 <button
//                   onClick={isListening ? stopVoiceSearch : startVoiceSearch}
//                   className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg transition-all ${
//                     isListening 
//                       ? 'bg-red-500 text-white animate-pulse' 
//                       : 'text-gray-400 hover:text-primary-600 hover:bg-primary-50'
//                   }`}
//                   type="button"
//                   title={isListening ? "Stop listening" : "Voice search"}
//                 >
//                   {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
//                 </button>
//               )}
//             </div>

//             <div className="flex gap-2">
//               <select
//                 value={sortBy}
//                 onChange={(e) => {
//                   setSortBy(e.target.value)
//                   setSelectedLetter(null)
//                 }}
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
//             </div>
//           </div>

//           {/* Search Results Info */}
//           {debouncedSearchQuery && (
//             <div className="mt-3 px-3 py-2 bg-primary-50 rounded-lg">
//               <p className="text-sm text-primary-700">
//                 Searching for: <span className="font-semibold">"{debouncedSearchQuery}"</span>
//                 {!isFetching && !isLoading && (
//                   <span className="ml-2">({pagination.total || authors.length} authors found)</span>
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

//           {/* Selected Letter Info */}
//           {selectedLetter && !debouncedSearchQuery && (
//             <div className="mt-3 px-3 py-2 bg-amber-50 rounded-lg">
//               <p className="text-sm text-amber-700">
//                 Showing authors starting with: <span className="font-semibold">{selectedLetter}</span>
//                 <button
//                   onClick={() => setSelectedLetter(null)}
//                   className="ml-3 text-amber-600 hover:text-amber-800"
//                 >
//                   Clear filter
//                 </button>
//               </p>
//             </div>
//           )}

//           {/* Voice Search Listening Indicator */}
//           {isListening && (
//             <div className="mt-3 px-3 py-2 bg-red-50 rounded-lg animate-pulse">
//               <p className="text-sm text-red-600 flex items-center gap-2">
//                 <Mic className="h-4 w-4 animate-pulse" />
//                 Listening... Speak the author name you want to search
//               </p>
//             </div>
//           )}

//           {/* Category Tabs */}
//           <div className="flex overflow-x-auto scrollbar-hide gap-2 mt-4 pb-2">
//             <button
//               onClick={() => {
//                 setActiveCategory('all')
//                 setSelectedLetter(null)
//               }}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
//                 activeCategory === 'all'
//                   ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               All Authors
//             </button>
//             {extendedCategories.map((cat) => (
//               <button
//                 key={cat.id}
//                 onClick={() => {
//                   setActiveCategory(cat.id)
//                   setSelectedLetter(null)
//                 }}
//                 className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
//                   activeCategory === cat.id
//                     ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 {getCategoryIcon(cat.id)}
//                 <span>{cat.label}</span>
//               </button>
//             ))}
//           </div>
//         </motion.div>

//         {/* Results Header */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center gap-2">
//             <div className="w-1 h-6 bg-gradient-to-b from-primary-600 to-amber-500 rounded-full" />
//             <p className="text-sm text-gray-600">
//               Showing <span className="font-semibold text-gray-900">{authors.length}</span> of{' '}
//               <span className="font-semibold text-gray-900">{pagination.total || authors.length}</span> authors
//             </p>
//           </div>
//           {(activeCategory !== 'all' || debouncedSearchQuery || selectedLetter) && (
//             <button
//               onClick={clearFilters}
//               className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors"
//             >
//               Clear all filters
//               <X className="h-3 w-3" />
//             </button>
//           )}
//         </div>

//         {/* Authors Grid */}
//         <div id="authors-section">
//           {authors.length === 0 && !isLoading ? (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="bg-white rounded-2xl p-12 text-center border border-gray-100"
//             >
//               <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-2xl mb-6">
//                 <Users className="h-10 w-10 text-amber-600" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">No authors found</h3>
//               <p className="text-gray-500 max-w-md mx-auto">
//                 {debouncedSearchQuery 
//                   ? `No authors matching "${debouncedSearchQuery}" found. Try a different search term.`
//                   : selectedLetter
//                   ? `No authors found starting with "${selectedLetter}".`
//                   : 'No authors available in this category yet.'}
//               </p>
//               {(debouncedSearchQuery || activeCategory !== 'all' || selectedLetter) && (
//                 <button
//                   onClick={clearFilters}
//                   className="mt-6 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
//                 >
//                   Clear all filters
//                   <X className="h-3 w-3" />
//                 </button>
//               )}
//             </motion.div>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {authors.map((author, index) => {
//                   const currentIndex = carouselIndices[author._id] || 0
//                   const authorBooks = authorBooksCache[author._id] || []
//                   const hasBooks = authorBooks.length > 0
//                   const isLoadingBooks = loadingBooks[author._id]
                  
//                   return (
//                     <motion.div
//                       key={author._id}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: Math.min(index * 0.05, 0.3) }}
//                       whileHover={{ y: -4 }}
//                     >
//                       <Link to={`/author/${author.slug}`} className="block group">
//                         <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                          
//                           {/* Card Header with Gradient Background */}
//                           <div className="relative bg-gradient-to-r from-primary-600 via-primary-500 to-amber-500 p-5">
//                             <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                            
//                             {/* Era Badge */}
//                             <div className="relative flex justify-end mb-2">
//                               <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getEraColor(author.era)} border`}>
//                                 {author.era || 'Classical'} Era
//                               </span>
//                             </div>
                            
//                             {/* Avatar and Name Section */}
//                             <div className="relative flex flex-col items-center text-center">
//                               {/* Avatar */}
//                               <div className="mb-3">
//                                 {author.avatar ? (
//                                   <img
//                                     src={author.avatar}
//                                     alt={author.name}
//                                     className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg ring-4 ring-white/30"
//                                   />
//                                 ) : (
//                                   <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white shadow-lg ring-4 ring-white/30">
//                                     <span className="text-4xl font-bold text-white">
//                                       {author.name?.charAt(0) || 'A'}
//                                     </span>
//                                   </div>
//                                 )}
//                               </div>
                              
//                               {/* Author Name */}
//                               <h3 className="font-bold text-white text-xl group-hover:translate-x-1 transition-transform">
//                                 {author.name}
//                               </h3>
                              
//                               {/* Urdu/Hindi Name */}
//                               {author.nameUrdu && (
//                                 <p className="urdu-text text-white/80 text-sm mt-1" dir="rtl">
//                                   {author.nameUrdu}
//                                 </p>
//                               )}
                              
//                               {/* Verified Badge */}
//                               {author.isVerified && (
//                                 <div className="inline-flex items-center gap-1 mt-2 bg-amber-500/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
//                                   <Verified className="h-3 w-3 text-amber-300" />
//                                   <span className="text-xs text-amber-100">Verified Poet</span>
//                                 </div>
//                               )}
//                             </div>
//                           </div>
                          
//                           {/* Card Body */}
//                           <div className="p-5 flex-1">
//                             {/* Bio */}
//                             <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
//                               {author.bio?.substring(0, 100)}...
//                             </p>
                            
//                             {/* Book Carousel Section */}
//                             {isLoadingBooks ? (
//                               <div className="mb-4 flex justify-center py-4">
//                                 <Loader2 className="h-5 w-5 animate-spin text-primary-500" />
//                               </div>
//                             ) : hasBooks ? (
//                               <div className="mb-4">
//                                 <div className="flex items-center justify-between mb-2">
//                                   <div className="flex items-center gap-1">
//                                     <Library className="h-3.5 w-3.5 text-primary-600" />
//                                     <span className="text-xs font-medium text-gray-700">Books by Author</span>
//                                   </div>
//                                   <span className="text-xs text-gray-400">{authorBooks.length} books</span>
//                                 </div>
                                
//                                 <div className="relative">
//                                   {/* Book Carousel */}
//                                   <div className="overflow-hidden">
//                                     <div 
//                                       className="flex transition-transform duration-300 ease-out"
//                                       style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//                                     >
//                                       {authorBooks.map((book, bookIdx) => (
//                                         <div key={book._id || bookIdx} className="w-full flex-shrink-0 px-1">
//                                           <div 
//                                             className="bg-gray-50 rounded-lg p-3 border border-gray-100 hover:border-primary-200 transition-colors cursor-pointer"
//                                             onClick={(e) => {
//                                               e.preventDefault()
//                                               e.stopPropagation()
//                                               window.location.href = `/book/${book.slug}`
//                                             }}
//                                           >
//                                             <div className="flex gap-3">
//                                               {/* Book Cover */}
//                                               <div className="flex-shrink-0">
//                                                 {book.coverImage ? (
//                                                   <img 
//                                                     src={book.coverImage} 
//                                                     alt={book.title}
//                                                     className="w-12 h-16 object-cover rounded-md shadow-sm"
//                                                   />
//                                                 ) : (
//                                                   <div className="w-12 h-16 bg-gradient-to-br from-primary-100 to-amber-100 rounded-md flex items-center justify-center">
//                                                     <BookOpen className="h-6 w-6 text-primary-500" />
//                                                   </div>
//                                                 )}
//                                               </div>
                                              
//                                               {/* Book Info */}
//                                               <div className="flex-1 min-w-0">
//                                                 <h4 className="font-medium text-gray-800 text-sm line-clamp-1">
//                                                   {book.title}
//                                                 </h4>
//                                                 {book.language && (
//                                                   <p className="text-xs text-gray-500 mt-0.5">
//                                                     {book.language === 'urdu' ? 'اردو' : 
//                                                      book.language === 'hindi' ? 'हिंदी' : 
//                                                      book.language === 'english' ? 'English' : book.language}
//                                                   </p>
//                                                 )}
//                                                 <div className="flex items-center justify-between mt-2">
//                                                   <div className="flex items-center gap-1">
//                                                     <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
//                                                     <span className="text-xs text-gray-600">
//                                                       {book.stats?.averageRating?.toFixed(1) || '4.5'}
//                                                     </span>
//                                                   </div>
//                                                   <button
//                                                     onClick={(e) => handleLikeBook(e, book._id, book.isLiked)}
//                                                     className="p-1 rounded-full hover:bg-red-50 transition-colors"
//                                                   >
//                                                     {book.isLiked ? (
//                                                       <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
//                                                     ) : (
//                                                       <Heart className="h-3.5 w-3.5 text-gray-400 hover:text-red-400" />
//                                                     )}
//                                                   </button>
//                                                 </div>
//                                               </div>
//                                             </div>
//                                           </div>
//                                         </div>
//                                       ))}
//                                     </div>
//                                   </div>
                                  
//                                   {/* Carousel Navigation Buttons */}
//                                   {authorBooks.length > 1 && (
//                                     <>
//                                       <button
//                                         onClick={(e) => handlePrevBook(author._id, authorBooks.length, e)}
//                                         disabled={currentIndex === 0}
//                                         className={`absolute left-0 top-1/2 -translate-y-1/2 -ml-2 w-6 h-6 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center transition-all ${
//                                           currentIndex === 0 
//                                             ? 'opacity-50 cursor-not-allowed' 
//                                             : 'hover:bg-gray-50 hover:scale-110'
//                                         }`}
//                                       >
//                                         <ChevronLeft className="h-3.5 w-3.5 text-gray-600" />
//                                       </button>
//                                       <button
//                                         onClick={(e) => handleNextBook(author._id, authorBooks.length, e)}
//                                         disabled={currentIndex === authorBooks.length - 1}
//                                         className={`absolute right-0 top-1/2 -translate-y-1/2 -mr-2 w-6 h-6 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center transition-all ${
//                                           currentIndex === authorBooks.length - 1 
//                                             ? 'opacity-50 cursor-not-allowed' 
//                                             : 'hover:bg-gray-50 hover:scale-110'
//                                         }`}
//                                       >
//                                         <ChevronRight className="h-3.5 w-3.5 text-gray-600" />
//                                       </button>
//                                     </>
//                                   )}
//                                 </div>
                                
//                                 {/* Carousel Dots */}
//                                 {authorBooks.length > 1 && (
//                                   <div className="flex justify-center gap-1 mt-2">
//                                     {authorBooks.map((_, dotIdx) => (
//                                       <button
//                                         key={dotIdx}
//                                         onClick={(e) => {
//                                           e.preventDefault()
//                                           e.stopPropagation()
//                                           setCarouselIndices(prev => ({
//                                             ...prev,
//                                             [author._id]: dotIdx
//                                           }))
//                                         }}
//                                         className={`h-1.5 rounded-full transition-all ${
//                                           currentIndex === dotIdx 
//                                             ? 'w-4 bg-primary-500' 
//                                             : 'w-1.5 bg-gray-300'
//                                         }`}
//                                       />
//                                     ))}
//                                   </div>
//                                 )}
//                               </div>
//                             ) : null}
                            
//                             {/* Stats Grid */}
//                             <div className="grid grid-cols-3 gap-3 mb-4 pt-2 border-t border-gray-100">
//                               <div className="text-center">
//                                 <div className="flex items-center justify-center gap-1 text-primary-600 mb-1">
//                                   <BookOpen className="h-4 w-4" />
//                                 </div>
//                                 <p className="text-lg font-bold text-gray-800">{author.stats?.poemsCount || 0}</p>
//                                 <p className="text-xs text-gray-400">Poems</p>
//                               </div>
//                               <div className="text-center">
//                                 <div className="flex items-center justify-center gap-1 text-pink-500 mb-1">
//                                   <Heart className="h-4 w-4" />
//                                 </div>
//                                 <p className="text-lg font-bold text-gray-800">{formatNumber(author.stats?.followers || 0)}</p>
//                                 <p className="text-xs text-gray-400">Followers</p>
//                               </div>
//                               <div className="text-center">
//                                 <div className="flex items-center justify-center gap-1 text-blue-500 mb-1">
//                                   <Eye className="h-4 w-4" />
//                                 </div>
//                                 <p className="text-lg font-bold text-gray-800">{formatNumber(author.stats?.views || 0)}</p>
//                                 <p className="text-xs text-gray-400">Views</p>
//                               </div>
//                             </div>
                            
//                             {/* Genres Tags */}
//                             {author.genres && author.genres.length > 0 && (
//                               <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-gray-100">
//                                 {author.genres.slice(0, 3).map((genre, idx) => (
//                                   <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full capitalize">
//                                     {genre}
//                                   </span>
//                                 ))}
//                                 {author.genres.length > 3 && (
//                                   <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-full">
//                                     +{author.genres.length - 3}
//                                   </span>
//                                 )}
//                               </div>
//                             )}
//                           </div>
                          
//                           {/* Card Footer */}
//                           <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
//                             <div className="flex items-center gap-1 text-gray-400 text-xs">
//                               <Calendar className="h-3 w-3" />
//                               <span>Joined {new Date(author.createdAt).getFullYear()}</span>
//                             </div>
//                             <div className="text-primary-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
//                               View Profile →
//                             </div>
//                           </div>
//                         </div>
//                       </Link>
//                     </motion.div>
//                   )
//                 })}
//               </div>

//               {/* Pagination */}
//               {(pagination.totalPages > 1 || Math.ceil(authors.length / itemsPerPage) > 1) && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="flex items-center justify-center gap-2 mt-12"
//                 >
//                   <button
//                     onClick={() => goToPage(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                   >
//                     <ChevronLeft className="h-5 w-5 text-gray-600" />
//                   </button>
                  
//                   <div className="flex items-center gap-1">
//                     <span className="px-4 py-2 text-sm text-gray-600">
//                       Page {currentPage} of {pagination.totalPages || Math.ceil(authors.length / itemsPerPage)}
//                     </span>
//                   </div>

//                   <button
//                     onClick={() => goToPage(currentPage + 1)}
//                     disabled={currentPage === (pagination.totalPages || Math.ceil(authors.length / itemsPerPage))}
//                     className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                   >
//                     <ChevronRight className="h-5 w-5 text-gray-600" />
//                   </button>
//                 </motion.div>
//               )}

//               {/* Loading indicator */}
//               <AnimatePresence>
//                 {(isFetching || isLoading) && authors.length > 0 && (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="flex justify-center mt-8"
//                   >
//                     <div className="flex items-center gap-2">
//                       <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
//                       <span className="text-sm text-gray-500">Loading more authors...</span>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AuthorsListPage




















// client/src/pages/public/AuthorsListPage.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  Search, Users, BookOpen, Heart, Filter, Loader2, ChevronLeft, ChevronRight, 
  Eye, UserPlus, Headphones, Music, Mic, X, MicOff, Volume2, Zap, Sparkles,
  Award, Star, TrendingUp, Clock, Calendar, MapPin, Quote, BookMarked, Flame,
  ChevronDown, ChevronUp, Mail, Globe, Twitter, Facebook, Instagram, Youtube,
  Verified, Library, PenTool, Bookmark, Share2, MoreHorizontal
} from 'lucide-react'
import authorAPI from '../../api/authorAPI'
import bookAPI from '../../api/bookAPI'
import { AUTHOR_CATEGORIES } from '../../utils/constants.js'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const AuthorsListPage = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all')
  const [searchInputValue, setSearchInputValue] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [currentPage, setCurrentPage] = useState(1)
  const [isListening, setIsListening] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(true)
  const [selectedLetter, setSelectedLetter] = useState(null)
  const [showIndex, setShowIndex] = useState(true)
  const [carouselIndices, setCarouselIndices] = useState({})
  const [authorBooksCache, setAuthorBooksCache] = useState({})
  const [loadingBooks, setLoadingBooks] = useState({})
  
  const itemsPerPage = 12
  const searchInputRef = useRef(null)
  const debounceTimerRef = useRef(null)
  const recognitionRef = useRef(null)
  const queryClient = useQueryClient()
  const { user } = useSelector(state => state.auth)

  // Alphabetical index letters
  const alphabetIndex = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V/W', 'Y', 'Z'
  ]

  // Extended author categories
  const extendedCategories = [
    ...AUTHOR_CATEGORIES,
    { id: 'sufi', label: 'Sufi Poets', labelHi: 'सूफ़ी कवि', labelUr: 'صوفی شعراء' },
    { id: 'marsiya', label: 'Marsiya Writers', labelHi: 'मर्सिया लेखक', labelUr: 'مرثیہ نگار' },
    { id: 'nauha', label: 'Nauha Reciters', labelHi: 'नौहा ख्वान', labelUr: 'نوحہ خوان' },
    { id: 'manqabat', label: 'Manqabat Writers', labelHi: 'मनक़बत लेखक', labelUr: 'منقبت نگار' },
  ]

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = 'ur-PK, hi-IN, en-US'
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setSearchInputValue(transcript)
        updateDebouncedSearch(transcript)
        setIsListening(false)
        setSelectedLetter(null)
      }
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }
      
      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    } else {
      setVoiceSupported(false)
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [])

  // Fetch authors from API
  const { data: response, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ['authors', currentPage, activeCategory, sortBy, debouncedSearchQuery, selectedLetter],
    queryFn: () => {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        sort: sortBy
      }
      
      if (activeCategory !== 'all') {
        params.category = activeCategory
      }
      
      if (debouncedSearchQuery) {
        params.search = debouncedSearchQuery
      }
      
      if (selectedLetter && !debouncedSearchQuery) {
        params.letter = selectedLetter
      }
      
      return authorAPI.getAuthors(params)
    },
    enabled: true,
    staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  })

  // Extract authors and pagination from response
  const authorsData = response?.data?.data || response?.data || response || []
  const authors = Array.isArray(authorsData) ? authorsData : []
  const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 }

  // Function to fetch books for an author
  const fetchAuthorBooks = useCallback(async (authorId, authorSlug) => {
    // Don't fetch if already cached or currently loading
    if (authorBooksCache[authorId] || loadingBooks[authorId]) return
    
    setLoadingBooks(prev => ({ ...prev, [authorId]: true }))
    
    try {
      const result = await authorAPI.getAuthorBooks(authorSlug)
      if (result.success && result.data) {
        setAuthorBooksCache(prev => ({ ...prev, [authorId]: result.data }))
      } else if (result.data?.data) {
        setAuthorBooksCache(prev => ({ ...prev, [authorId]: result.data.data }))
      }
    } catch (err) {
      console.error(`Failed to fetch books for author ${authorId}:`, err)
      setAuthorBooksCache(prev => ({ ...prev, [authorId]: [] }))
    } finally {
      setLoadingBooks(prev => ({ ...prev, [authorId]: false }))
    }
  }, [authorBooksCache, loadingBooks])

  // Load books for authors when they become visible
  useEffect(() => {
    if (authors && authors.length > 0) {
      authors.forEach(author => {
        if (author._id && !authorBooksCache[author._id] && !loadingBooks[author._id]) {
          fetchAuthorBooks(author._id, author.slug)
        }
      })
    }
  }, [authors, fetchAuthorBooks, authorBooksCache, loadingBooks])

  // Like book mutation
  const likeBookMutation = useMutation({
    mutationFn: async ({ bookId, isLiked }) => {
      if (isLiked) {
        return await bookAPI.unlikeBook(bookId)
      } else {
        return await bookAPI.likeBook(bookId)
      }
    },
    onSuccess: (data, variables) => {
      // Update the cache to reflect the new like status
      const { bookId, isLiked } = variables
      // Update authorBooksCache with new like status
      setAuthorBooksCache(prev => {
        const newCache = { ...prev }
        Object.keys(newCache).forEach(authorId => {
          newCache[authorId] = newCache[authorId].map(book => 
            book._id === bookId ? { ...book, isLiked: !isLiked } : book
          )
        })
        return newCache
      })
      toast.success(isLiked ? 'Book removed from likes' : 'Book added to likes')
    },
    onError: (error) => {
      console.error('Like mutation error:', error)
      toast.error('Failed to update like status')
    }
  })

  // Handle like click
  const handleLikeBook = (e, bookId, isLiked) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!user) {
      toast.error('Please login to like books')
      return
    }
    
    likeBookMutation.mutate({ bookId, isLiked })
  }

  // Handle carousel navigation
  const handlePrevBook = (authorId, booksLength, e) => {
    e.preventDefault()
    e.stopPropagation()
    setCarouselIndices(prev => ({
      ...prev,
      [authorId]: Math.max(0, (prev[authorId] || 0) - 1)
    }))
  }

  const handleNextBook = (authorId, booksLength, e) => {
    e.preventDefault()
    e.stopPropagation()
    setCarouselIndices(prev => ({
      ...prev,
      [authorId]: Math.min(booksLength - 1, (prev[authorId] || 0) + 1)
    }))
  }

  // Update URL when category changes
  useEffect(() => {
    if (activeCategory && activeCategory !== 'all') {
      setSearchParams({ category: activeCategory })
    } else {
      setSearchParams({})
    }
    setCurrentPage(1)
    setSelectedLetter(null)
  }, [activeCategory, setSearchParams])

  // Debounce search
  const updateDebouncedSearch = useCallback((value) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
    
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedSearchQuery(value)
      if (currentPage !== 1) {
        setCurrentPage(1)
      }
      if (value) {
        setSelectedLetter(null)
      }
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
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [])

  const startVoiceSearch = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start()
        setIsListening(true)
      } catch (error) {
        console.error('Failed to start voice recognition:', error)
      }
    }
  }, [isListening])

  const stopVoiceSearch = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }, [isListening])

  const goToPage = useCallback((page) => {
    if (page >= 1 && page <= (pagination.totalPages || 1)) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [pagination.totalPages])

  const clearFilters = useCallback(() => {
    clearSearch()
    setActiveCategory('all')
    setCurrentPage(1)
    setSelectedLetter(null)
  }, [clearSearch])

  const handleLetterClick = (letter) => {
    if (selectedLetter === letter) {
      setSelectedLetter(null)
    } else {
      setSelectedLetter(letter)
      setCurrentPage(1)
      setDebouncedSearchQuery('')
      setSearchInputValue('')
    }
    setTimeout(() => {
      const element = document.getElementById('authors-section')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  // Sort options
  const sortOptions = [
    { value: 'popular', label: 'Most Popular', icon: Flame },
    { value: 'poems', label: 'Most Poems', icon: BookOpen },
    { value: 'followers', label: 'Most Followers', icon: Users },
    { value: 'name', label: 'Name A-Z', icon: Quote },
    { value: 'recent', label: 'Recently Added', icon: Clock }
  ]

  const getEraColor = (era) => {
    switch (era?.toLowerCase()) {
      case 'classical': return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'modern': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'contemporary': return 'bg-green-100 text-green-700 border-green-200'
      case 'sufi': return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'marsiya': return 'bg-red-100 text-red-700 border-red-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getCategoryIcon = (categoryId) => {
    switch (categoryId) {
      case 'sufi': return <Music className="h-4 w-4" />
      case 'marsiya': return <Mic className="h-4 w-4" />
      case 'nauha': return <Headphones className="h-4 w-4" />
      default: return null
    }
  }

  const formatNumber = (count) => {
    if (!count) return '0'
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
    return count.toString()
  }

  // Loading state
  if (isLoading && authors.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-amber-500 rounded-2xl animate-pulse mx-auto mb-6 flex items-center justify-center">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="h-6 w-6 text-amber-400 animate-spin" />
                </div>
              </div>
              <p className="text-gray-600 font-medium">Loading literary legends...</p>
              <p className="text-sm text-gray-400 mt-1">Discovering poets and writers</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error && authors.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-2xl mb-6">
              <Users className="h-10 w-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to load authors</h2>
            <p className="text-gray-500 mb-6">There was an error loading the authors. Please try again.</p>
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
              <span className="text-sm text-white font-medium">INDEX OF POETS</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
              Literary Authors
            </h1>
            <p className="text-base text-white/90 max-w-2xl mx-auto">
              Discover legendary poets, marsiya writers, nauha reciters, and literary figures
            </p>
          </motion.div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-10 text-slate-50" preserveAspectRatio="none" viewBox="0 0 1440 54">
            <path fill="currentColor" d="M0,22L80,27.3C160,33,320,43,480,42.7C640,43,800,32,960,26.7C1120,21,1280,21,1360,21.3L1440,22L1440,54L1360,54C1280,54,1120,54,960,54C800,54,640,54,480,54C320,54,160,54,80,54L0,54Z"/>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        
        {/* Alphabetical Index */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 mb-6"
        >
          <div className="flex items-center justify-between mb-2 px-2">
            <h3 className="text-sm font-semibold text-gray-700">INDEX OF POETS</h3>
            <button
              onClick={() => setShowIndex(!showIndex)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showIndex ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
          
          {showIndex && (
            <div className="flex flex-wrap justify-center gap-1">
              {alphabetIndex.map((letter) => (
                <button
                  key={letter}
                  onClick={() => handleLetterClick(letter)}
                  className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${
                    selectedLetter === letter
                      ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Search & Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search authors by name or genre..."
                value={searchInputValue}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-24 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 transition-all"
                autoComplete="off"
              />
              {searchInputValue && (
                <button
                  onClick={clearSearch}
                  className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  type="button"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              {voiceSupported && (
                <button
                  onClick={isListening ? stopVoiceSearch : startVoiceSearch}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg transition-all ${
                    isListening 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'text-gray-400 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                  type="button"
                  title={isListening ? "Stop listening" : "Voice search"}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value)
                  setSelectedLetter(null)
                }}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 cursor-pointer"
              >
                {sortOptions.map(option => {
                  const Icon = option.icon
                  return (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>

          {/* Search Results Info */}
          {debouncedSearchQuery && (
            <div className="mt-3 px-3 py-2 bg-primary-50 rounded-lg">
              <p className="text-sm text-primary-700">
                Searching for: <span className="font-semibold">"{debouncedSearchQuery}"</span>
                {!isFetching && !isLoading && (
                  <span className="ml-2">({pagination.total || authors.length} authors found)</span>
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

          {/* Selected Letter Info */}
          {selectedLetter && !debouncedSearchQuery && (
            <div className="mt-3 px-3 py-2 bg-amber-50 rounded-lg">
              <p className="text-sm text-amber-700">
                Showing authors starting with: <span className="font-semibold">{selectedLetter}</span>
                <button
                  onClick={() => setSelectedLetter(null)}
                  className="ml-3 text-amber-600 hover:text-amber-800"
                >
                  Clear filter
                </button>
              </p>
            </div>
          )}

          {/* Voice Search Listening Indicator */}
          {isListening && (
            <div className="mt-3 px-3 py-2 bg-red-50 rounded-lg animate-pulse">
              <p className="text-sm text-red-600 flex items-center gap-2">
                <Mic className="h-4 w-4 animate-pulse" />
                Listening... Speak the author name you want to search
              </p>
            </div>
          )}

          {/* Category Tabs */}
          <div className="flex overflow-x-auto scrollbar-hide gap-2 mt-4 pb-2">
            <button
              onClick={() => {
                setActiveCategory('all')
                setSelectedLetter(null)
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Authors
            </button>
            {extendedCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id)
                  setSelectedLetter(null)
                }}
                className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-primary-600 to-amber-500 rounded-full" />
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{authors.length}</span> of{' '}
              <span className="font-semibold text-gray-900">{pagination.total || authors.length}</span> authors
            </p>
          </div>
          {(activeCategory !== 'all' || debouncedSearchQuery || selectedLetter) && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors"
            >
              Clear all filters
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        {/* Authors Grid */}
        <div id="authors-section">
          {authors.length === 0 && !isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-12 text-center border border-gray-100"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-2xl mb-6">
                <Users className="h-10 w-10 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No authors found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {debouncedSearchQuery 
                  ? `No authors matching "${debouncedSearchQuery}" found. Try a different search term.`
                  : selectedLetter
                  ? `No authors found starting with "${selectedLetter}".`
                  : 'No authors available in this category yet.'}
              </p>
              {(debouncedSearchQuery || activeCategory !== 'all' || selectedLetter) && (
                <button
                  onClick={clearFilters}
                  className="mt-6 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear all filters
                  <X className="h-3 w-3" />
                </button>
              )}
            </motion.div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {authors.map((author, index) => {
                  const currentIndex = carouselIndices[author._id] || 0
                  const authorBooks = authorBooksCache[author._id] || []
                  const hasBooks = authorBooks.length > 0
                  const isLoadingBooks = loadingBooks[author._id]
                  
                  return (
                    <motion.div
                      key={author._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(index * 0.05, 0.3) }}
                      whileHover={{ y: -4 }}
                    >
                      <Link to={`/author/${author.slug}`} className="block group">
                        <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                          
                          {/* Card Header with Gradient Background - Optimized for larger avatar */}
                          <div className="relative bg-gradient-to-r from-primary-600 via-primary-500 to-amber-500 pt-3 pb-3">
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                            
                            {/* Era Badge */}
                            <div className="relative flex justify-end px-4">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getEraColor(author.era)} border`}>
                                {author.era || 'Classical'} Era
                              </span>
                            </div>
                            
                            {/* Avatar and Name Section */}
                            <div className="relative flex flex-col items-center text-center -mt-1">
                              {/* Avatar - DOUBLED SIZE with negative margin top to overlap card properly */}
                              <div className="mb-2">
                                {author.avatar ? (
                                  <img
                                    src={author.avatar}
                                    alt={author.name}
                                    className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg ring-4 ring-white/30 -mt-2"
                                  />
                                ) : (
                                  <div className="w-40 h-40 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white shadow-lg ring-4 ring-white/30 -mt-4">
                                    <span className="text-5xl font-bold text-white">
                                      {author.name?.charAt(0) || 'A'}
                                    </span>
                                  </div>
                                )}
                              </div>
                              
                              {/* Author Name */}
                              <h3 className="font-bold text-white text-xl group-hover:translate-x-1 transition-transform px-4 mt-2">
                                {author.name}
                              </h3>
                              
                              {/* Urdu/Hindi Name */}
                              {author.nameUrdu && (
                                <p className="urdu-text text-white/80 text-sm mt-1 px-4" dir="rtl">
                                  {author.nameUrdu}
                                </p>
                              )}
                              
                              {/* Verified Badge */}
                              {author.isVerified && (
                                <div className="inline-flex items-center gap-1 mt-2 bg-amber-500/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                                  <Verified className="h-3 w-3 text-amber-300" />
                                  <span className="text-xs text-amber-100">Verified Poet</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Card Body */}
                          <div className="p-5 flex-1">
                            {/* Bio */}
                            <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
                              {author.bio?.substring(0, 100)}...
                            </p>
                            
                            {/* Book Carousel Section */}
                            {isLoadingBooks ? (
                              <div className="mb-4 flex justify-center py-4">
                                <Loader2 className="h-5 w-5 animate-spin text-primary-500" />
                              </div>
                            ) : hasBooks ? (
                              <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-1">
                                    <Library className="h-3.5 w-3.5 text-primary-600" />
                                    <span className="text-xs font-medium text-gray-700">Books by Author</span>
                                  </div>
                                  <span className="text-xs text-gray-400">{authorBooks.length} books</span>
                                </div>
                                
                                <div className="relative">
                                  {/* Book Carousel */}
                                  <div className="overflow-hidden">
                                    <div 
                                      className="flex transition-transform duration-300 ease-out"
                                      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                                    >
                                      {authorBooks.map((book, bookIdx) => (
                                        <div key={book._id || bookIdx} className="w-full flex-shrink-0 px-1">
                                          <div 
                                            className="bg-gray-50 rounded-lg p-3 border border-gray-100 hover:border-primary-200 transition-colors cursor-pointer"
                                            onClick={(e) => {
                                              e.preventDefault()
                                              e.stopPropagation()
                                              window.location.href = `/book/${book.slug}`
                                            }}
                                          >
                                            <div className="flex gap-3">
                                              {/* Book Cover */}
                                              <div className="flex-shrink-0">
                                                {book.coverImage ? (
                                                  <img 
                                                    src={book.coverImage} 
                                                    alt={book.title}
                                                    className="w-12 h-16 object-cover rounded-md shadow-sm"
                                                  />
                                                ) : (
                                                  <div className="w-12 h-16 bg-gradient-to-br from-primary-100 to-amber-100 rounded-md flex items-center justify-center">
                                                    <BookOpen className="h-6 w-6 text-primary-500" />
                                                  </div>
                                                )}
                                              </div>
                                              
                                              {/* Book Info */}
                                              <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-gray-800 text-sm line-clamp-1">
                                                  {book.title}
                                                </h4>
                                                {book.language && (
                                                  <p className="text-xs text-gray-500 mt-0.5">
                                                    {book.language === 'urdu' ? 'اردو' : 
                                                     book.language === 'hindi' ? 'हिंदी' : 
                                                     book.language === 'english' ? 'English' : book.language}
                                                  </p>
                                                )}
                                                <div className="flex items-center justify-between mt-2">
                                                  <div className="flex items-center gap-1">
                                                    <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                                                    <span className="text-xs text-gray-600">
                                                      {book.stats?.averageRating?.toFixed(1) || '4.5'}
                                                    </span>
                                                  </div>
                                                  <button
                                                    onClick={(e) => handleLikeBook(e, book._id, book.isLiked)}
                                                    className="p-1 rounded-full hover:bg-red-50 transition-colors"
                                                  >
                                                    {book.isLiked ? (
                                                      <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
                                                    ) : (
                                                      <Heart className="h-3.5 w-3.5 text-gray-400 hover:text-red-400" />
                                                    )}
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  {/* Carousel Navigation Buttons */}
                                  {authorBooks.length > 1 && (
                                    <>
                                      <button
                                        onClick={(e) => handlePrevBook(author._id, authorBooks.length, e)}
                                        disabled={currentIndex === 0}
                                        className={`absolute left-0 top-1/2 -translate-y-1/2 -ml-2 w-6 h-6 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center transition-all ${
                                          currentIndex === 0 
                                            ? 'opacity-50 cursor-not-allowed' 
                                            : 'hover:bg-gray-50 hover:scale-110'
                                        }`}
                                      >
                                        <ChevronLeft className="h-3.5 w-3.5 text-gray-600" />
                                      </button>
                                      <button
                                        onClick={(e) => handleNextBook(author._id, authorBooks.length, e)}
                                        disabled={currentIndex === authorBooks.length - 1}
                                        className={`absolute right-0 top-1/2 -translate-y-1/2 -mr-2 w-6 h-6 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center transition-all ${
                                          currentIndex === authorBooks.length - 1 
                                            ? 'opacity-50 cursor-not-allowed' 
                                            : 'hover:bg-gray-50 hover:scale-110'
                                        }`}
                                      >
                                        <ChevronRight className="h-3.5 w-3.5 text-gray-600" />
                                      </button>
                                    </>
                                  )}
                                </div>
                                
                                {/* Carousel Dots */}
                                {authorBooks.length > 1 && (
                                  <div className="flex justify-center gap-1 mt-2">
                                    {authorBooks.map((_, dotIdx) => (
                                      <button
                                        key={dotIdx}
                                        onClick={(e) => {
                                          e.preventDefault()
                                          e.stopPropagation()
                                          setCarouselIndices(prev => ({
                                            ...prev,
                                            [author._id]: dotIdx
                                          }))
                                        }}
                                        className={`h-1.5 rounded-full transition-all ${
                                          currentIndex === dotIdx 
                                            ? 'w-4 bg-primary-500' 
                                            : 'w-1.5 bg-gray-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                )}
                              </div>
                            ) : null}
                            
                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-3 mb-4 pt-2 border-t border-gray-100">
                              <div className="text-center">
                                <div className="flex items-center justify-center gap-1 text-primary-600 mb-1">
                                  <BookOpen className="h-4 w-4" />
                                </div>
                                <p className="text-lg font-bold text-gray-800">{author.stats?.poemsCount || 0}</p>
                                <p className="text-xs text-gray-400">Poems</p>
                              </div>
                              <div className="text-center">
                                <div className="flex items-center justify-center gap-1 text-pink-500 mb-1">
                                  <Heart className="h-4 w-4" />
                                </div>
                                <p className="text-lg font-bold text-gray-800">{formatNumber(author.stats?.followers || 0)}</p>
                                <p className="text-xs text-gray-400">Followers</p>
                              </div>
                              <div className="text-center">
                                <div className="flex items-center justify-center gap-1 text-blue-500 mb-1">
                                  <Eye className="h-4 w-4" />
                                </div>
                                <p className="text-lg font-bold text-gray-800">{formatNumber(author.stats?.views || 0)}</p>
                                <p className="text-xs text-gray-400">Views</p>
                              </div>
                            </div>
                            
                            {/* Genres Tags */}
                            {author.genres && author.genres.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-gray-100">
                                {author.genres.slice(0, 3).map((genre, idx) => (
                                  <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full capitalize">
                                    {genre}
                                  </span>
                                ))}
                                {author.genres.length > 3 && (
                                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-full">
                                    +{author.genres.length - 3}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                          
                          {/* Card Footer */}
                          <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-1 text-gray-400 text-xs">
                              <Calendar className="h-3 w-3" />
                              <span>Joined {new Date(author.createdAt).getFullYear()}</span>
                            </div>
                            <div className="text-primary-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                              View Profile →
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              {/* Pagination */}
              {(pagination.totalPages > 1 || Math.ceil(authors.length / itemsPerPage) > 1) && (
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
                    <span className="px-4 py-2 text-sm text-gray-600">
                      Page {currentPage} of {pagination.totalPages || Math.ceil(authors.length / itemsPerPage)}
                    </span>
                  </div>

                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === (pagination.totalPages || Math.ceil(authors.length / itemsPerPage))}
                    className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-600" />
                  </button>
                </motion.div>
              )}

              {/* Loading indicator */}
              <AnimatePresence>
                {(isFetching || isLoading) && authors.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-center mt-8"
                  >
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
                      <span className="text-sm text-gray-500">Loading more authors...</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthorsListPage