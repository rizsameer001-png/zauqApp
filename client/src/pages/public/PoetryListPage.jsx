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







// client/src/pages/public/PoetryListPage.jsx
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { Search, Filter, Heart, Eye, Bookmark, BookOpen, Loader2, ChevronLeft, ChevronRight } from 'lucide-react'
import poemAPI from '../../api/poemAPI'
import { POETRY_GENRES } from '../../utils/constants.js'

const PoetryListPage = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeGenre, setActiveGenre] = useState(searchParams.get('genre') || 'all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  // Fetch real poems from API
  const { data: response, isLoading, error, refetch } = useQuery({
    queryKey: ['poems', currentPage, activeGenre, sortBy],
    queryFn: () => poemAPI.getPoems({
      page: currentPage,
      limit: itemsPerPage,
      genre: activeGenre !== 'all' ? activeGenre : undefined,
      search: searchQuery || undefined,
      sort: sortBy
    }),
    enabled: true,
    staleTime: 30000
  })

  // Extract poems and pagination from response
  const poemsData = response?.data?.data || response?.data || response || []
  const poems = Array.isArray(poemsData) ? poemsData : []
  const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 }

  // Update URL when genre changes
  useEffect(() => {
    if (activeGenre && activeGenre !== 'all') {
      setSearchParams({ genre: activeGenre })
    } else {
      setSearchParams({})
    }
    setCurrentPage(1)
  }, [activeGenre, setSearchParams])

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

  // Get sort options
  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'recent', label: 'Most Recent' },
    { value: 'views', label: 'Most Viewed' },
    { value: 'likes', label: 'Most Liked' }
  ]

  // Get sort function for client-side sorting (if API doesn't support)
  const getSortedPoems = (poemsList) => {
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
  }

  const sortedPoems = getSortedPoems(poems)

  // Loading state
  if (isLoading && poems.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
              <p className="text-gray-500">Loading poems...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error && poems.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <BookOpen className="h-12 w-12 mx-auto" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to load poems</h2>
            <p className="text-gray-500 mb-6">There was an error loading the poems. Please try again.</p>
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
            {t('common.poetry', 'Poetry Collection')}
          </h1>
          <p className="text-gray-500">
            Explore ghazals, nazms, sher, and more from legendary poets
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search poems by title or poet..."
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

        {/* Genre Tabs */}
        <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-6 pb-2">
          <button
            onClick={() => setActiveGenre('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeGenre === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Genres
          </button>
          {POETRY_GENRES.map((genre) => (
            <button
              key={genre.id}
              onClick={() => setActiveGenre(genre.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeGenre === genre.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {genre.label}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-500">
            Showing {sortedPoems.length} of {pagination.total || sortedPoems.length} poems
          </p>
        </div>

        {/* Poems Grid */}
        {sortedPoems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No poems found</h3>
            <p className="text-gray-500">
              {searchQuery 
                ? `No poems matching "${searchQuery}" found. Try a different search term.`
                : 'No poems available in this genre yet.'}
            </p>
            {(searchQuery || activeGenre !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setActiveGenre('all')
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
              {sortedPoems.map((poem, index) => (
                <motion.div
                  key={poem._id || poem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={`/poem/${poem.slug}`} className="block">
                    <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 group">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <span className="inline-block px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full mb-2 capitalize">
                            {poem.genre || 'Poem'}
                          </span>
                          <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors text-lg line-clamp-1">
                            {poem.title}
                          </h3>
                          {poem.contentUrdu && (
                            <p className="urdu-text text-gray-500 text-sm mt-1 line-clamp-1" dir="rtl">
                              {poem.contentUrdu.split('\n')[0]}
                            </p>
                          )}
                        </div>
                        <button 
                          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                          onClick={(e) => {
                            e.preventDefault()
                            // Handle bookmark if needed
                          }}
                        >
                          <Bookmark className="h-5 w-5 text-gray-400" />
                        </button>
                      </div>

                      {/* Excerpt */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 italic">
                        "{poem.contentUrdu?.split('\n')[0] || poem.content?.split('\n')[0] || 'No preview available'}"
                      </p>

                      {/* Author & Stats */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {typeof poem.author === 'object' ? poem.author?.name : poem.author || 'Unknown Author'}
                        </span>
                        <div className="flex items-center space-x-3 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Heart className="h-4 w-4 text-red-400" />
                            <span>{poem.stats?.likes?.toLocaleString() || 0}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{poem.stats?.views?.toLocaleString() || 0}</span>
                          </span>
                        </div>
                      </div>

                      {/* Language Badge */}
                      {poem.language && (
                        <div className="mt-3">
                          <span className="text-xs text-gray-400">
                            {poem.language === 'urdu' ? 'اردو' : 
                             poem.language === 'hindi' ? 'हिंदी' : 
                             poem.language === 'english' ? 'English' : poem.language}
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {(pagination.totalPages > 1 || Math.ceil(sortedPoems.length / itemsPerPage) > 1) && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                  disabled={currentPage === (pagination.totalPages || Math.ceil(sortedPoems.length / itemsPerPage))}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            )}

            {/* Loading more indicator */}
            {isLoading && poems.length > 0 && (
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

export default PoetryListPage