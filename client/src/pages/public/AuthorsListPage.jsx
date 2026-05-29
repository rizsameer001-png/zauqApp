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











// client/src/pages/public/AuthorsListPage.jsx
import React, { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { Search, Users, BookOpen, Heart, Filter, Loader2, ChevronLeft, ChevronRight, Eye, UserPlus, Headphones, Music, Mic } from 'lucide-react'
import authorAPI from '../../api/authorAPI'
import { AUTHOR_CATEGORIES } from '../../utils/constants.js'

const AuthorsListPage = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  // Extended author categories including religious/audio categories
  const extendedCategories = [
    ...AUTHOR_CATEGORIES,
    { id: 'sufi', label: 'Sufi Poets', labelHi: 'सूफ़ी कवि', labelUr: 'صوفی شعراء' },
    { id: 'marsiya', label: 'Marsiya Writers', labelHi: 'मर्सिया लेखक', labelUr: 'مرثیہ نگار' },
    { id: 'nauha', label: 'Nauha Reciters', labelHi: 'नौहा ख्वान', labelUr: 'نوحہ خوان' },
    { id: 'manqabat', label: 'Manqabat Writers', labelHi: 'मनक़बत लेखक', labelUr: 'منقبت نگار' },
  ]

  // Fetch real authors from API
  const { data: response, isLoading, error, refetch } = useQuery({
    queryKey: ['authors', currentPage, activeCategory, sortBy, searchQuery],
    queryFn: () => authorAPI.getAuthors({
      page: currentPage,
      limit: itemsPerPage,
      category: activeCategory !== 'all' ? activeCategory : undefined,
      search: searchQuery || undefined,
      sort: sortBy
    }),
    enabled: true,
    staleTime: 30000
  })

  // Extract authors and pagination from response
  const authorsData = response?.data?.data || response?.data || response || []
  const authors = Array.isArray(authorsData) ? authorsData : []
  const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 }

  // Update URL when category changes
  useEffect(() => {
    if (activeCategory && activeCategory !== 'all') {
      setSearchParams({ category: activeCategory })
    } else {
      setSearchParams({})
    }
    setCurrentPage(1)
  }, [activeCategory, setSearchParams])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage === 1) {
        refetch()
      } else {
        setCurrentPage(1)
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [searchQuery, refetch, currentPage])

  // Handle page change
  const goToPage = (page) => {
    if (page >= 1 && page <= (pagination.totalPages || 1)) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Sort options
  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'poems', label: 'Most Poems' },
    { value: 'followers', label: 'Most Followers' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'recent', label: 'Recently Added' }
  ]

  // Get era badge color
  const getEraColor = (era) => {
    switch (era?.toLowerCase()) {
      case 'classical': return 'bg-purple-100 text-purple-700'
      case 'modern': return 'bg-blue-100 text-blue-700'
      case 'contemporary': return 'bg-green-100 text-green-700'
      case 'sufi': return 'bg-orange-100 text-orange-700'
      case 'marsiya': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  // Get category icon
  const getCategoryIcon = (categoryId) => {
    switch (categoryId) {
      case 'sufi': return <Music className="h-4 w-4" />
      case 'marsiya': return <Mic className="h-4 w-4" />
      case 'nauha': return <Headphones className="h-4 w-4" />
      default: return null
    }
  }

  // Format follower count
  const formatFollowers = (count) => {
    if (!count) return '0'
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
    return count.toString()
  }

  // Loading state
  if (isLoading && authors.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
              <p className="text-gray-500">Loading authors...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error && authors.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <Users className="h-12 w-12 mx-auto" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to load authors</h2>
            <p className="text-gray-500 mb-6">There was an error loading the authors. Please try again.</p>
            <button onClick={() => refetch()} className="btn-primary">
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {t('common.authors', 'Literary Authors')}
          </h1>
          <p className="text-gray-500">
            Discover legendary poets, marsiya writers, nauha reciters, and literary figures from Urdu, Hindi, and Persian literature
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search authors by name or genre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white w-full md:w-48"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-6 pb-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Authors
          </button>
          {extendedCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {getCategoryIcon(cat.id)}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-500">
            Showing {authors.length} of {pagination.total || authors.length} authors
          </p>
          {(searchQuery || activeCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('')
                setActiveCategory('all')
              }}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Authors Grid */}
        {authors.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No authors found</h3>
            <p className="text-gray-500">
              {searchQuery 
                ? `No authors matching "${searchQuery}" found. Try a different search term.`
                : 'No authors available in this category yet.'}
            </p>
            {(searchQuery || activeCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setActiveCategory('all')
                }}
                className="mt-4 text-primary-600 hover:text-primary-700"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {authors.map((author, index) => (
                <motion.div
                  key={author._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={`/author/${author.slug}`} className="block">
                    <div className="bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden group">
                      <div className="p-6">
                        <div className="flex items-start space-x-4">
                          {/* Avatar */}
                          <div className="flex-shrink-0">
                            {author.avatar ? (
                              <img
                                src={author.avatar}
                                alt={author.name}
                                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                              />
                            ) : (
                              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center border-4 border-white shadow-md">
                                <span className="text-2xl font-bold text-primary-600">
                                  {author.name.charAt(0)}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors truncate">
                                {author.name}
                              </h3>
                              <span className={`px-2 py-0.5 text-xs rounded-full ${getEraColor(author.era)} capitalize ml-2 flex-shrink-0`}>
                                {author.era || 'Classical'}
                              </span>
                            </div>
                            
                            {author.nameUrdu && (
                              <p className="urdu-text text-gray-600 text-sm mb-2 truncate" dir="rtl">
                                {author.nameUrdu}
                              </p>
                            )}
                            
                            <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                              {author.bio?.substring(0, 100)}...
                            </p>
                            
                            {/* Stats */}
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center space-x-3 text-gray-500">
                                <span className="flex items-center space-x-1">
                                  <BookOpen className="h-4 w-4" />
                                  <span>{author.stats?.poemsCount || 0} Poems</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Users className="h-4 w-4" />
                                  <span>{formatFollowers(author.stats?.followers || 0)}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Eye className="h-4 w-4" />
                                  <span>{formatFollowers(author.stats?.views || 0)}</span>
                                </span>
                              </div>
                              
                              {/* Verified Badge */}
                              {author.isVerified && (
                                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                                  Verified
                                </span>
                              )}
                            </div>
                            
                            {/* Genres */}
                            {author.genres && author.genres.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-3">
                                {author.genres.slice(0, 3).map((genre, idx) => (
                                  <span key={idx} className="text-xs text-gray-400 capitalize">
                                    {genre}{idx < Math.min(author.genres.length, 3) - 1 ? ',' : ''}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {(pagination.totalPages > 1 || Math.ceil(authors.length / itemsPerPage) > 1) && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: pagination.totalPages || Math.ceil(authors.length / itemsPerPage) }, (_, i) => i + 1)
                    .filter(page => {
                      const totalPages = pagination.totalPages || Math.ceil(authors.length / itemsPerPage)
                      if (totalPages <= 7) return true
                      if (page === 1 || page === totalPages) return true
                      if (page >= currentPage - 1 && page <= currentPage + 1) return true
                      return false
                    })
                    .map((page, index, array) => {
                      if (index > 0 && array[index - 1] !== page - 1) {
                        return (
                          <span key={`ellipsis-${page}`} className="px-3 py-2 text-gray-500">
                            ...
                          </span>
                        )
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
                      )
                    })}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === (pagination.totalPages || Math.ceil(authors.length / itemsPerPage))}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            )}

            {/* Loading more indicator */}
            {isLoading && authors.length > 0 && (
              <div className="flex justify-center mt-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary-600" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default AuthorsListPage