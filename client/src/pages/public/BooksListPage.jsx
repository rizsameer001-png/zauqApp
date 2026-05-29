// //client/src/pages/public/BooksListPage.jsx

// import React, { useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { motion } from 'framer-motion'
// import { Search, BookOpen, Star, Download, Filter, Grid, List } from 'lucide-react'
// import { Link } from 'react-router-dom'
// import { BOOK_CATEGORIES } from '../../utils/constants.js'

// const books = [
//   {
//     id: 1,
//     title: 'Diwan-e-Ghalib',
//     titleUr: 'دیوانِ غالب',
//     author: 'Mirza Ghalib',
//     category: 'Rare Books',
//     rating: 4.9,
//     downloads: 12500,
//     pages: 450,
//     year: 1841,
//     image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
//   },
//   {
//     id: 2,
//     title: 'Bang-e-Dara',
//     titleUr: 'بانگِ درا',
//     author: 'Allama Iqbal',
//     category: 'Rare Books',
//     rating: 4.8,
//     downloads: 9800,
//     pages: 320,
//     year: 1924,
//     image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
//   },
//   {
//     id: 3,
//     title: 'Nuskha-e-Haideri',
//     titleUr: 'نسخہِ حیدری',
//     author: 'Mir Taqi Mir',
//     category: 'Journals',
//     rating: 4.7,
//     downloads: 7600,
//     pages: 280,
//     year: 1816,
//     image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400',
//   },
//   {
//     id: 4,
//     title: 'Kulliyat-e-Faiz',
//     titleUr: 'کلیاتِ فیض',
//     author: 'Faiz Ahmed Faiz',
//     category: 'Rare Books',
//     rating: 4.9,
//     downloads: 11200,
//     pages: 520,
//     year: 1985,
//     image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400',
//   },
//   {
//     id: 5,
//     title: 'Urdu Adab Ki Tareekh',
//     titleUr: 'اردو ادب کی تاریخ',
//     author: 'Various',
//     category: 'Magazines',
//     rating: 4.6,
//     downloads: 5400,
//     pages: 380,
//     year: 2010,
//     image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',
//   },
//   {
//     id: 6,
//     title: 'Shair-ul-Hind',
//     titleUr: 'شاعر الہند',
//     author: 'Mir Taqi Mir',
//     category: 'Journals',
//     rating: 4.5,
//     downloads: 4300,
//     pages: 240,
//     year: 1800,
//     image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400',
//   },
// ]

// const BooksListPage = () => {
//   const { t } = useTranslation()
//   const [activeCategory, setActiveCategory] = useState('all')
//   const [searchQuery, setSearchQuery] = useState('')
//   const [viewMode, setViewMode] = useState('grid')

//   const filteredBooks = books.filter((book) => {
//     if (activeCategory !== 'all' && book.category !== activeCategory) return false
//     if (searchQuery && !book.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
//     return true
//   })

//   return (
//     <div className="page-container">
//       <div className="mb-8">
//         <h1 className="section-title">{t('common.books')}</h1>
//         <p className="section-subtitle">Rare collections, journals, and literary magazines</p>
//       </div>

//       {/* Search & Controls */}
//       <div className="flex flex-col md:flex-row gap-4 mb-6">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search books..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="input-field pl-10"
//           />
//         </div>
//         <div className="flex items-center space-x-2">
//           <select className="input-field w-40">
//             <option>Most Popular</option>
//             <option>Newest</option>
//             <option>Oldest</option>
//             <option>Highest Rated</option>
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
//           All Books
//         </button>
//         {BOOK_CATEGORIES.map((cat) => (
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

//       {/* Books Grid */}
//       <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
//         {filteredBooks.map((book, index) => (
//           <motion.div
//             key={book.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//           >
//             <Link to={`/books/${book.id}`} className="card block overflow-hidden group">
//               <div className={`relative overflow-hidden bg-gray-100 ${viewMode === 'grid' ? 'h-56' : 'h-40 w-32 flex-shrink-0'}`}>
//                 <img
//                   src={book.image}
//                   alt={book.title}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                 />
//                 <div className="absolute top-3 left-3">
//                   <span className="px-2 py-1 bg-white/90 text-gray-700 text-xs font-medium rounded-full">
//                     {book.category}
//                   </span>
//                 </div>
//                 <div className="absolute bottom-3 right-3 flex items-center space-x-1 px-2 py-1 bg-black/60 text-white text-xs rounded-full">
//                   <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
//                   <span>{book.rating}</span>
//                 </div>
//               </div>
//               <div className="p-4">
//                 <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
//                   {book.title}
//                 </h3>
//                 <p className="urdu-text text-gray-600 text-sm mb-2">{book.titleUr}</p>
//                 <p className="text-gray-500 text-sm mb-3">{book.author}</p>
//                 <div className="flex items-center justify-between text-sm text-gray-500">
//                   <span>{book.pages} pages</span>
//                   <span className="flex items-center space-x-1">
//                     <Download className="h-4 w-4" />
//                     <span>{(book.downloads / 1000).toFixed(1)}K</span>
//                   </span>
//                 </div>
//               </div>
//             </Link>
//           </motion.div>
//         ))}
//       </div>

//       {filteredBooks.length === 0 && (
//         <div className="text-center py-12">
//           <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//           <p className="text-gray-500">No books found matching your criteria</p>
//         </div>
//       )}
//     </div>
//   )
// }

// export default BooksListPage










// working revert if requred 
//client/src/pages/public/BooksListPage.jsx
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Search, BookOpen, Star, Download, Filter, Grid, List, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import bookAPI from '../../api/bookAPI'
import { BOOK_CATEGORIES } from '../../utils/constants.js'

const BooksListPage = () => {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('popular')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Fetch books from API
  const { data: booksData, isLoading, error } = useQuery({
    queryKey: ['books', activeCategory, sortBy, currentPage],
    queryFn: () => bookAPI.getBooks({
      page: currentPage,
      limit: itemsPerPage,
      category: activeCategory !== 'all' ? activeCategory : undefined,
      sort: sortBy,
      search: searchQuery || undefined
    }),
    staleTime: 5 * 60 * 1000 // 5 minutes
  })

  // Extract books and pagination from response
  const books = booksData?.data?.data || booksData?.data || booksData?.books || []
  const pagination = booksData?.data?.pagination || booksData?.pagination || { 
    page: currentPage, 
    totalPages: 1, 
    total: 0 
  }

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        setCurrentPage(1)
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Handle category change
  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory, sortBy])

  // Sort options
  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'downloads', label: 'Most Downloads' }
  ]

  // Get sort label
  const getSortLabel = (value) => {
    const option = sortOptions.find(opt => opt.value === value)
    return option ? option.label : 'Most Popular'
  }

  // Render loading state
  if (isLoading && books.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
              <p className="text-gray-500">Loading books...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-red-300 mx-auto mb-4" />
            <p className="text-red-500">Failed to load books. Please try again later.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 btn-primary"
            >
              Retry
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
            {t('common.books', 'Books & Ebooks')}
          </h1>
          <p className="text-gray-500 text-lg">
            Rare collections, journals, and literary magazines
          </p>
        </div>

        {/* Search & Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, author, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field w-40"
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
                className={`p-2.5 transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                title="Grid view"
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                title="List view"
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
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            All Books
          </button>
          {BOOK_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.label)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.label
                  ? 'bg-primary-600 text-white shadow-sm'
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
            Showing {books.length} of {pagination.total || 0} books
          </p>
          {searchQuery && (
            <p className="text-sm text-gray-500">
              Search results for: "{searchQuery}"
            </p>
          )}
        </div>

        {/* Books Grid/List */}
        {books.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No books found</p>
            <p className="text-sm text-gray-400">Try adjusting your search or filter criteria</p>
            {(searchQuery || activeCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setActiveCategory('all')
                }}
                className="mt-4 text-primary-600 hover:text-primary-700"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book, index) => (
              <motion.div
                key={book._id || book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <Link to={`/book/${book.slug}`} className="block card overflow-hidden group h-full">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-gray-100">
                    {book.coverImage ? (
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary-50">
                        <BookOpen className="h-12 w-12 text-primary-300" />
                      </div>
                    )}
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium rounded-full capitalize">
                        {book.type || book.category || 'Book'}
                      </span>
                    </div>
                    {/* Rating Badge */}
                    {book.stats?.averageRating > 0 && (
                      <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded-full">
                        <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                        <span>{book.stats.averageRating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-primary-600 transition-colors">
                      {book.title}
                    </h3>
                    {book.titleUrdu && (
                      <p className="urdu-text text-gray-500 text-sm mb-2 line-clamp-1" dir="rtl">
                        {book.titleUrdu}
                      </p>
                    )}
                    <p className="text-gray-600 text-sm mb-3 line-clamp-1">
                      {typeof book.author === 'object' ? book.author?.name : book.author || 'Unknown Author'}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{book.totalPages || 'N/A'} pages</span>
                      <span className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        <span>{(book.stats?.downloads || 0).toLocaleString()}</span>
                      </span>
                    </div>
                    {book.isPremium && (
                      <div className="mt-2">
                        <span className="text-xs px-2 py-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full">
                          Premium
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          // List View
          <div className="space-y-4">
            {books.map((book, index) => (
              <motion.div
                key={book._id || book.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/book/${book.slug}`} className="block card p-4 hover:shadow-md transition-shadow group">
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="flex-shrink-0 w-24 h-32 overflow-hidden rounded-lg bg-gray-100">
                      {book.coverImage ? (
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary-50">
                          <BookOpen className="h-8 w-8 text-primary-300" />
                        </div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                            {book.title}
                          </h3>
                          {book.titleUrdu && (
                            <p className="urdu-text text-gray-500 text-sm mb-1" dir="rtl">
                              {book.titleUrdu}
                            </p>
                          )}
                          <p className="text-gray-600 text-sm">
                            {typeof book.author === 'object' ? book.author?.name : book.author || 'Unknown Author'}
                          </p>
                        </div>
                        {book.isPremium && (
                          <span className="text-xs px-2 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full">
                            Premium
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                        {book.description}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {book.totalPages || 'N/A'} pages
                        </span>
                        <span className="flex items-center gap-1">
                          <Download className="h-4 w-4" />
                          {(book.stats?.downloads || 0).toLocaleString()} downloads
                        </span>
                        {book.stats?.averageRating > 0 && (
                          <span className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            {book.stats.averageRating.toFixed(1)}
                          </span>
                        )}
                        <span className="capitalize">{book.type || 'Ebook'}</span>
                        {book.publishYear && <span>{book.publishYear}</span>}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <div className="flex gap-1">
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
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                      currentPage === pageNum
                        ? 'bg-primary-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
              disabled={currentPage === pagination.totalPages}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default BooksListPage