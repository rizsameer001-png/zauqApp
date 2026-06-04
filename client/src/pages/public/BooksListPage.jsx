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










// // working revert if requred 
// //client/src/pages/public/BooksListPage.jsx
// import React, { useState, useEffect } from 'react'
// import { useTranslation } from 'react-i18next'
// import { motion } from 'framer-motion'
// import { Search, BookOpen, Star, Download, Filter, Grid, List, Loader2 } from 'lucide-react'
// import { Link } from 'react-router-dom'
// import { useQuery } from '@tanstack/react-query'
// import bookAPI from '../../api/bookAPI'
// import { BOOK_CATEGORIES } from '../../utils/constants.js'

// const BooksListPage = () => {
//   const { t } = useTranslation()
//   const [activeCategory, setActiveCategory] = useState('all')
//   const [searchQuery, setSearchQuery] = useState('')
//   const [viewMode, setViewMode] = useState('grid')
//   const [sortBy, setSortBy] = useState('popular')
//   const [currentPage, setCurrentPage] = useState(1)
//   const itemsPerPage = 12

//   // Fetch books from API
//   const { data: booksData, isLoading, error } = useQuery({
//     queryKey: ['books', activeCategory, sortBy, currentPage],
//     queryFn: () => bookAPI.getBooks({
//       page: currentPage,
//       limit: itemsPerPage,
//       category: activeCategory !== 'all' ? activeCategory : undefined,
//       sort: sortBy,
//       search: searchQuery || undefined
//     }),
//     staleTime: 5 * 60 * 1000 // 5 minutes
//   })

//   // Extract books and pagination from response
//   const books = booksData?.data?.data || booksData?.data || booksData?.books || []
//   const pagination = booksData?.data?.pagination || booksData?.pagination || { 
//     page: currentPage, 
//     totalPages: 1, 
//     total: 0 
//   }

//   // Handle search with debounce
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (searchQuery) {
//         setCurrentPage(1)
//       }
//     }, 500)
//     return () => clearTimeout(timer)
//   }, [searchQuery])

//   // Handle category change
//   useEffect(() => {
//     setCurrentPage(1)
//   }, [activeCategory, sortBy])

//   // Sort options
//   const sortOptions = [
//     { value: 'popular', label: 'Most Popular' },
//     { value: 'newest', label: 'Newest' },
//     { value: 'oldest', label: 'Oldest' },
//     { value: 'rating', label: 'Highest Rated' },
//     { value: 'downloads', label: 'Most Downloads' }
//   ]

//   // Get sort label
//   const getSortLabel = (value) => {
//     const option = sortOptions.find(opt => opt.value === value)
//     return option ? option.label : 'Most Popular'
//   }

//   // Render loading state
//   if (isLoading && books.length === 0) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-center min-h-[60vh]">
//             <div className="text-center">
//               <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
//               <p className="text-gray-500">Loading books...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Render error state
//   if (error) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center py-12">
//             <BookOpen className="h-12 w-12 text-red-300 mx-auto mb-4" />
//             <p className="text-red-500">Failed to load books. Please try again later.</p>
//             <button 
//               onClick={() => window.location.reload()} 
//               className="mt-4 btn-primary"
//             >
//               Retry
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
//             {t('common.books', 'Books & Ebooks')}
//           </h1>
//           <p className="text-gray-500 text-lg">
//             Rare collections, journals, and literary magazines
//           </p>
//         </div>

//         {/* Search & Controls */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search by title, author, or description..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="input-field pl-10"
//             />
//           </div>
//           <div className="flex items-center gap-2">
//             <select 
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="input-field w-40"
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
//                 className={`p-2.5 transition-colors ${
//                   viewMode === 'grid' 
//                     ? 'bg-primary-50 text-primary-600' 
//                     : 'text-gray-600 hover:bg-gray-50'
//                 }`}
//                 title="Grid view"
//               >
//                 <Grid className="h-5 w-5" />
//               </button>
//               <button
//                 onClick={() => setViewMode('list')}
//                 className={`p-2.5 transition-colors ${
//                   viewMode === 'list' 
//                     ? 'bg-primary-50 text-primary-600' 
//                     : 'text-gray-600 hover:bg-gray-50'
//                 }`}
//                 title="List view"
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
//                 ? 'bg-primary-600 text-white shadow-sm'
//                 : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
//             }`}
//           >
//             All Books
//           </button>
//           {BOOK_CATEGORIES.map((cat) => (
//             <button
//               key={cat.id}
//               onClick={() => setActiveCategory(cat.label)}
//               className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
//                 activeCategory === cat.label
//                   ? 'bg-primary-600 text-white shadow-sm'
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
//             Showing {books.length} of {pagination.total || 0} books
//           </p>
//           {searchQuery && (
//             <p className="text-sm text-gray-500">
//               Search results for: "{searchQuery}"
//             </p>
//           )}
//         </div>

//         {/* Books Grid/List */}
//         {books.length === 0 ? (
//           <div className="text-center py-12 bg-white rounded-xl shadow-sm">
//             <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//             <p className="text-gray-500 mb-2">No books found</p>
//             <p className="text-sm text-gray-400">Try adjusting your search or filter criteria</p>
//             {(searchQuery || activeCategory !== 'all') && (
//               <button
//                 onClick={() => {
//                   setSearchQuery('')
//                   setActiveCategory('all')
//                 }}
//                 className="mt-4 text-primary-600 hover:text-primary-700"
//               >
//                 Clear all filters
//               </button>
//             )}
//           </div>
//         ) : viewMode === 'grid' ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {books.map((book, index) => (
//               <motion.div
//                 key={book._id || book.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.05 }}
//                 whileHover={{ y: -4 }}
//               >
//                 <Link to={`/book/${book.slug}`} className="block card overflow-hidden group h-full">
//                   {/* Image */}
//                   <div className="relative h-56 overflow-hidden bg-gray-100">
//                     {book.coverImage ? (
//                       <img
//                         src={book.coverImage}
//                         alt={book.title}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center bg-primary-50">
//                         <BookOpen className="h-12 w-12 text-primary-300" />
//                       </div>
//                     )}
//                     {/* Category Badge */}
//                     <div className="absolute top-3 left-3">
//                       <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium rounded-full capitalize">
//                         {book.type || book.category || 'Book'}
//                       </span>
//                     </div>
//                     {/* Rating Badge */}
//                     {book.stats?.averageRating > 0 && (
//                       <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded-full">
//                         <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
//                         <span>{book.stats.averageRating.toFixed(1)}</span>
//                       </div>
//                     )}
//                   </div>
                  
//                   {/* Content */}
//                   <div className="p-4">
//                     <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-primary-600 transition-colors">
//                       {book.title}
//                     </h3>
//                     {book.titleUrdu && (
//                       <p className="urdu-text text-gray-500 text-sm mb-2 line-clamp-1" dir="rtl">
//                         {book.titleUrdu}
//                       </p>
//                     )}
//                     <p className="text-gray-600 text-sm mb-3 line-clamp-1">
//                       {typeof book.author === 'object' ? book.author?.name : book.author || 'Unknown Author'}
//                     </p>
//                     <div className="flex items-center justify-between text-sm text-gray-500">
//                       <span>{book.totalPages || 'N/A'} pages</span>
//                       <span className="flex items-center gap-1">
//                         <Download className="h-4 w-4" />
//                         <span>{(book.stats?.downloads || 0).toLocaleString()}</span>
//                       </span>
//                     </div>
//                     {book.isPremium && (
//                       <div className="mt-2">
//                         <span className="text-xs px-2 py-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full">
//                           Premium
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         ) : (
//           // List View
//           <div className="space-y-4">
//             {books.map((book, index) => (
//               <motion.div
//                 key={book._id || book.id}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: index * 0.05 }}
//               >
//                 <Link to={`/book/${book.slug}`} className="block card p-4 hover:shadow-md transition-shadow group">
//                   <div className="flex gap-4">
//                     {/* Image */}
//                     <div className="flex-shrink-0 w-24 h-32 overflow-hidden rounded-lg bg-gray-100">
//                       {book.coverImage ? (
//                         <img
//                           src={book.coverImage}
//                           alt={book.title}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center bg-primary-50">
//                           <BookOpen className="h-8 w-8 text-primary-300" />
//                         </div>
//                       )}
//                     </div>
                    
//                     {/* Content */}
//                     <div className="flex-1">
//                       <div className="flex items-start justify-between">
//                         <div>
//                           <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
//                             {book.title}
//                           </h3>
//                           {book.titleUrdu && (
//                             <p className="urdu-text text-gray-500 text-sm mb-1" dir="rtl">
//                               {book.titleUrdu}
//                             </p>
//                           )}
//                           <p className="text-gray-600 text-sm">
//                             {typeof book.author === 'object' ? book.author?.name : book.author || 'Unknown Author'}
//                           </p>
//                         </div>
//                         {book.isPremium && (
//                           <span className="text-xs px-2 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full">
//                             Premium
//                           </span>
//                         )}
//                       </div>
                      
//                       <p className="text-gray-500 text-sm mt-2 line-clamp-2">
//                         {book.description}
//                       </p>
                      
//                       <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
//                         <span className="flex items-center gap-1">
//                           <BookOpen className="h-4 w-4" />
//                           {book.totalPages || 'N/A'} pages
//                         </span>
//                         <span className="flex items-center gap-1">
//                           <Download className="h-4 w-4" />
//                           {(book.stats?.downloads || 0).toLocaleString()} downloads
//                         </span>
//                         {book.stats?.averageRating > 0 && (
//                           <span className="flex items-center gap-1">
//                             <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
//                             {book.stats.averageRating.toFixed(1)}
//                           </span>
//                         )}
//                         <span className="capitalize">{book.type || 'Ebook'}</span>
//                         {book.publishYear && <span>{book.publishYear}</span>}
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {/* Pagination */}
//         {pagination.totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-8">
//             <button
//               onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//               disabled={currentPage === 1}
//               className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               Previous
//             </button>
//             <div className="flex gap-1">
//               {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
//                 let pageNum
//                 if (pagination.totalPages <= 5) {
//                   pageNum = i + 1
//                 } else if (currentPage <= 3) {
//                   pageNum = i + 1
//                 } else if (currentPage >= pagination.totalPages - 2) {
//                   pageNum = pagination.totalPages - 4 + i
//                 } else {
//                   pageNum = currentPage - 2 + i
//                 }
//                 return (
//                   <button
//                     key={pageNum}
//                     onClick={() => setCurrentPage(pageNum)}
//                     className={`w-10 h-10 rounded-lg font-medium transition-colors ${
//                       currentPage === pageNum
//                         ? 'bg-primary-600 text-white'
//                         : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
//                     }`}
//                   >
//                     {pageNum}
//                   </button>
//                 )
//               })}
//             </div>
//             <button
//               onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
//               disabled={currentPage === pagination.totalPages}
//               className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default BooksListPage

















// // client/src/pages/public/BooksListPage.jsx
// import React, { useState, useEffect, useCallback, useRef } from 'react'
// import { useTranslation } from 'react-i18next'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Search, BookOpen, Star, Download, Filter, Grid, List, Loader2, X, Sparkles, TrendingUp, Clock, Eye, Heart, Mic, MicOff } from 'lucide-react'
// import { Link } from 'react-router-dom'
// import { useQuery } from '@tanstack/react-query'
// import bookAPI from '../../api/bookAPI'
// import { BOOK_CATEGORIES } from '../../utils/constants.js'

// const BooksListPage = () => {
//   const { t } = useTranslation()
//   const [activeCategory, setActiveCategory] = useState('all')
//   const [searchInputValue, setSearchInputValue] = useState('')
//   const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
//   const [viewMode, setViewMode] = useState('grid')
//   const [sortBy, setSortBy] = useState('popular')
//   const [currentPage, setCurrentPage] = useState(1)
//   const [isListening, setIsListening] = useState(false)
//   const [voiceSupported, setVoiceSupported] = useState(true)
//   const itemsPerPage = 12
//   const searchInputRef = useRef(null)
//   const debounceTimerRef = useRef(null)
//   const recognitionRef = useRef(null)

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

//   // Fetch books from API - FIXED: Include search in queryKey
//   const { data: booksData, isLoading, error, refetch, isFetching } = useQuery({
//     queryKey: ['books', currentPage, activeCategory, sortBy, debouncedSearchQuery],
//     queryFn: () => {
//       const params = {
//         page: currentPage,
//         limit: itemsPerPage,
//         sort: sortBy
//       }
      
//       if (activeCategory !== 'all') {
//         params.category = activeCategory
//       }
      
//       // IMPORTANT: Pass search query to API
//       if (debouncedSearchQuery && debouncedSearchQuery.trim()) {
//         params.search = debouncedSearchQuery.trim()
//       }
      
//       console.log('📡 Fetching books with params:', params)
//       return bookAPI.getBooks(params)
//     },
//     enabled: true,
//     staleTime: 30000,
//     keepPreviousData: true,
//     refetchOnWindowFocus: false,
//   })

//   // Extract books and pagination from response
//   const books = booksData?.data?.data || booksData?.data || booksData?.books || []
//   const pagination = booksData?.data?.pagination || booksData?.pagination || { 
//     page: currentPage, 
//     totalPages: 1, 
//     total: 0 
//   }

//   // Debounced search function
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

//   // Handle search input change
//   const handleSearchChange = useCallback((e) => {
//     const value = e.target.value
//     setSearchInputValue(value)
//     updateDebouncedSearch(value)
//   }, [updateDebouncedSearch])

//   // Clear search
//   const clearSearch = useCallback(() => {
//     setSearchInputValue('')
//     setDebouncedSearchQuery('')
//     if (searchInputRef.current) {
//       searchInputRef.current.focus()
//     }
//   }, [])

//   // Voice search handlers
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

//   // Handle category change
//   useEffect(() => {
//     setCurrentPage(1)
//     setDebouncedSearchQuery('')
//     setSearchInputValue('')
//   }, [activeCategory, sortBy])

//   // Cleanup debounce on unmount
//   useEffect(() => {
//     return () => {
//       if (debounceTimerRef.current) {
//         clearTimeout(debounceTimerRef.current)
//       }
//     }
//   }, [])

//   // Clear all filters
//   const clearFilters = useCallback(() => {
//     clearSearch()
//     setActiveCategory('all')
//     setCurrentPage(1)
//   }, [clearSearch])

//   // Sort options
//   const sortOptions = [
//     { value: 'popular', label: 'Most Popular', icon: TrendingUp },
//     { value: 'newest', label: 'Newest', icon: Clock },
//     { value: 'oldest', label: 'Oldest', icon: Clock },
//     { value: 'rating', label: 'Highest Rated', icon: Star },
//     { value: 'downloads', label: 'Most Downloads', icon: Download }
//   ]

//   // Format number
//   const formatNumber = (num) => {
//     if (!num) return '0'
//     if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
//     if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
//     return num.toString()
//   }

//   // Loading state
//   if (isLoading && books.length === 0) {
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
//               <p className="text-gray-600 font-medium">Loading books...</p>
//               <p className="text-sm text-gray-400 mt-1">Discovering literary treasures</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Error state
//   if (error && books.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
//           <div className="text-center py-12">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-2xl mb-6">
//               <BookOpen className="h-10 w-10 text-red-500" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to load books</h2>
//             <p className="text-gray-500 mb-6">There was an error loading the books. Please try again.</p>
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
//               <span className="text-sm text-white font-medium">Digital Library</span>
//             </div>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
//               Books & Ebooks
//             </h1>
//             <p className="text-base text-white/90 max-w-2xl mx-auto">
//               Rare collections, journals, and literary magazines from legendary authors
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
        
//         {/* Search & Controls */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6"
//         >
//           <div className="flex flex-col md:flex-row gap-4">
//             {/* Search Input with Voice Search and Clear Button */}
//             <div className="flex-1 relative">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//               <input
//                 ref={searchInputRef}
//                 type="text"
//                 placeholder="Search by title, author, or description..."
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

//             <div className="flex items-center gap-2">
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
              
//               <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-gray-50/50">
//                 <button
//                   onClick={() => setViewMode('grid')}
//                   className={`p-2.5 transition-all ${
//                     viewMode === 'grid' 
//                       ? 'bg-primary-600 text-white' 
//                       : 'text-gray-600 hover:bg-gray-100'
//                   }`}
//                   title="Grid view"
//                 >
//                   <Grid className="h-5 w-5" />
//                 </button>
//                 <button
//                   onClick={() => setViewMode('list')}
//                   className={`p-2.5 transition-all ${
//                     viewMode === 'list' 
//                       ? 'bg-primary-600 text-white' 
//                       : 'text-gray-600 hover:bg-gray-100'
//                   }`}
//                   title="List view"
//                 >
//                   <List className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Search Results Info */}
//           {debouncedSearchQuery && (
//             <div className="mt-3 px-3 py-2 bg-primary-50 rounded-lg">
//               <p className="text-sm text-primary-700">
//                 Searching for: <span className="font-semibold">"{debouncedSearchQuery}"</span>
//                 {!isFetching && !isLoading && (
//                   <span className="ml-2">({pagination.total || books.length} books found)</span>
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
//                 Listening... Speak the book title or author name
//               </p>
//             </div>
//           )}
//         </motion.div>

//         {/* Categories */}
//         <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-6 pb-2">
//           <button
//             onClick={() => setActiveCategory('all')}
//             className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
//               activeCategory === 'all'
//                 ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
//                 : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
//             }`}
//           >
//             All Books
//           </button>
//           {BOOK_CATEGORIES.map((cat) => (
//             <button
//               key={cat.id}
//               onClick={() => setActiveCategory(cat.label)}
//               className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
//                 activeCategory === cat.label
//                   ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
//                   : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
//               }`}
//             >
//               {cat.label}
//             </button>
//           ))}
//         </div>

//         {/* Results Count */}
//         <div className="flex justify-between items-center mb-4">
//           <div className="flex items-center gap-2">
//             <div className="w-1 h-6 bg-gradient-to-b from-primary-600 to-amber-500 rounded-full" />
//             <p className="text-sm text-gray-600">
//               Showing <span className="font-semibold text-gray-900">{books.length}</span> of{' '}
//               <span className="font-semibold text-gray-900">{pagination.total || 0}</span> books
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

//         {/* Books Grid/List */}
//         {books.length === 0 && !isLoading ? (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="bg-white rounded-2xl p-12 text-center border border-gray-100"
//           >
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-2xl mb-6">
//               <BookOpen className="h-10 w-10 text-amber-600" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">No books found</h3>
//             <p className="text-gray-500 max-w-md mx-auto">
//               {debouncedSearchQuery 
//                 ? `No books matching "${debouncedSearchQuery}" found. Try a different search term.`
//                 : 'No books available in this category yet.'}
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
//         ) : viewMode === 'grid' ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {books.map((book, index) => (
//               <motion.div
//                 key={book._id || book.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: Math.min(index * 0.05, 0.3) }}
//                 whileHover={{ y: -4 }}
//               >
//                 <Link to={`/book/${book.slug}`} className="block group">
//                   <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
//                     {/* Image */}
//                     <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary-100 to-amber-100">
//                       {book.coverImage ? (
//                         <img
//                           src={book.coverImage}
//                           alt={book.title}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center">
//                           <BookOpen className="h-16 w-16 text-primary-300" />
//                         </div>
//                       )}
//                       {/* Category Badge */}
//                       <div className="absolute top-3 left-3">
//                         <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium rounded-full capitalize">
//                           {book.type || book.category || 'Book'}
//                         </span>
//                       </div>
//                       {/* Rating Badge */}
//                       {book.stats?.averageRating > 0 && (
//                         <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded-full">
//                           <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
//                           <span>{book.stats.averageRating.toFixed(1)}</span>
//                         </div>
//                       )}
//                       {/* Premium Badge */}
//                       {book.isPremium && (
//                         <div className="absolute top-3 right-3">
//                           <span className="px-2 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-medium rounded-full">
//                             Premium
//                           </span>
//                         </div>
//                       )}
//                     </div>
                    
//                     {/* Content */}
//                     <div className="p-4 flex-1">
//                       <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-primary-600 transition-colors">
//                         {book.title}
//                       </h3>
//                       {book.titleUrdu && (
//                         <p className="urdu-text text-gray-500 text-sm mb-2 line-clamp-1" dir="rtl">
//                           {book.titleUrdu}
//                         </p>
//                       )}
//                       <p className="text-gray-600 text-sm mb-3 line-clamp-1">
//                         {typeof book.author === 'object' ? book.author?.name : book.author || 'Unknown Author'}
//                       </p>
//                       <div className="flex items-center justify-between text-sm text-gray-500">
//                         <span>{book.totalPages || 'N/A'} pages</span>
//                         <span className="flex items-center gap-1">
//                           <Download className="h-4 w-4" />
//                           <span>{formatNumber(book.stats?.downloads || 0)}</span>
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         ) : (
//           // List View
//           <div className="space-y-4">
//             {books.map((book, index) => (
//               <motion.div
//                 key={book._id || book.id}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: Math.min(index * 0.05, 0.3) }}
//               >
//                 <Link to={`/book/${book.slug}`} className="block group">
//                   <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:bg-gray-50/50">
//                     <div className="flex gap-4">
//                       {/* Image */}
//                       <div className="flex-shrink-0 w-24 h-32 overflow-hidden rounded-lg bg-gradient-to-br from-primary-100 to-amber-100">
//                         {book.coverImage ? (
//                           <img
//                             src={book.coverImage}
//                             alt={book.title}
//                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                           />
//                         ) : (
//                           <div className="w-full h-full flex items-center justify-center">
//                             <BookOpen className="h-8 w-8 text-primary-300" />
//                           </div>
//                         )}
//                       </div>
                      
//                       {/* Content */}
//                       <div className="flex-1">
//                         <div className="flex items-start justify-between">
//                           <div>
//                             <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
//                               {book.title}
//                             </h3>
//                             {book.titleUrdu && (
//                               <p className="urdu-text text-gray-500 text-sm mb-1" dir="rtl">
//                                 {book.titleUrdu}
//                               </p>
//                             )}
//                             <p className="text-gray-600 text-sm">
//                               {typeof book.author === 'object' ? book.author?.name : book.author || 'Unknown Author'}
//                             </p>
//                           </div>
//                           {book.isPremium && (
//                             <span className="text-xs px-2 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full">
//                               Premium
//                             </span>
//                           )}
//                         </div>
                        
//                         <p className="text-gray-500 text-sm mt-2 line-clamp-2">
//                           {book.description}
//                         </p>
                        
//                         <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
//                           <span className="flex items-center gap-1">
//                             <BookOpen className="h-4 w-4" />
//                             {book.totalPages || 'N/A'} pages
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <Download className="h-4 w-4" />
//                             {formatNumber(book.stats?.downloads || 0)} downloads
//                           </span>
//                           {book.stats?.averageRating > 0 && (
//                             <span className="flex items-center gap-1">
//                               <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
//                               {book.stats.averageRating.toFixed(1)}
//                             </span>
//                           )}
//                           <span className="capitalize">{book.type || 'Ebook'}</span>
//                           {book.publishYear && <span>{book.publishYear}</span>}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {/* Loading indicator */}
//         <AnimatePresence>
//           {(isFetching || isLoading) && books.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="flex justify-center mt-8"
//             >
//               <div className="flex items-center gap-2">
//                 <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
//                 <span className="text-sm text-gray-500">Loading more books...</span>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Pagination */}
//         {pagination.totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-8">
//             <button
//               onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//               disabled={currentPage === 1}
//               className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//             >
//               Previous
//             </button>
//             <div className="flex gap-1">
//               <span className="px-4 py-2 text-sm text-gray-600">
//                 Page {currentPage} of {pagination.totalPages}
//               </span>
//             </div>
//             <button
//               onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
//               disabled={currentPage === pagination.totalPages}
//               className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default BooksListPage


















// // client/src/pages/public/BooksListPage.jsx
// import React, { useState, useEffect, useCallback, useRef } from 'react'
// import { useTranslation } from 'react-i18next'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Search, BookOpen, Star, Download, Filter, Grid, List, Loader2, X, Sparkles, TrendingUp, Clock, Eye, Heart, Mic, MicOff, Award, Crown, ChevronRight, Bookmark, Share2, Zap, Volume2 } from 'lucide-react'
// import { Link } from 'react-router-dom'
// import { useQuery } from '@tanstack/react-query'
// import bookAPI from '../../api/bookAPI'
// import { BOOK_CATEGORIES } from '../../utils/constants.js'

// const BooksListPage = () => {
//   const { t } = useTranslation()
//   const [activeCategory, setActiveCategory] = useState('all')
//   const [searchInputValue, setSearchInputValue] = useState('')
//   const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
//   const [viewMode, setViewMode] = useState('grid')
//   const [sortBy, setSortBy] = useState('popular')
//   const [currentPage, setCurrentPage] = useState(1)
//   const [isListening, setIsListening] = useState(false)
//   const [voiceSupported, setVoiceSupported] = useState(true)
//   const itemsPerPage = 12
//   const searchInputRef = useRef(null)
//   const debounceTimerRef = useRef(null)
//   const recognitionRef = useRef(null)

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

//   // Fetch books from API
//   const { data: booksData, isLoading, error, refetch, isFetching } = useQuery({
//     queryKey: ['books', currentPage, activeCategory, sortBy, debouncedSearchQuery],
//     queryFn: () => {
//       const params = {
//         page: currentPage,
//         limit: itemsPerPage,
//         sort: sortBy
//       }
      
//       if (activeCategory !== 'all') {
//         params.category = activeCategory
//       }
      
//       if (debouncedSearchQuery && debouncedSearchQuery.trim()) {
//         params.search = debouncedSearchQuery.trim()
//       }
      
//       console.log('📡 Fetching books with params:', params)
//       return bookAPI.getBooks(params)
//     },
//     enabled: true,
//     staleTime: 30000,
//     keepPreviousData: true,
//     refetchOnWindowFocus: false,
//   })

//   // Extract books and pagination from response
//   const books = booksData?.data?.data || booksData?.data || booksData?.books || []
//   const pagination = booksData?.data?.pagination || booksData?.pagination || { 
//     page: currentPage, 
//     totalPages: 1, 
//     total: 0 
//   }

//   // Debounced search function
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

//   // Handle search input change
//   const handleSearchChange = useCallback((e) => {
//     const value = e.target.value
//     setSearchInputValue(value)
//     updateDebouncedSearch(value)
//   }, [updateDebouncedSearch])

//   // Clear search
//   const clearSearch = useCallback(() => {
//     setSearchInputValue('')
//     setDebouncedSearchQuery('')
//     if (searchInputRef.current) {
//       searchInputRef.current.focus()
//     }
//   }, [])

//   // Voice search handlers
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

//   // Handle category change
//   useEffect(() => {
//     setCurrentPage(1)
//     setDebouncedSearchQuery('')
//     setSearchInputValue('')
//   }, [activeCategory, sortBy])

//   // Cleanup debounce on unmount
//   useEffect(() => {
//     return () => {
//       if (debounceTimerRef.current) {
//         clearTimeout(debounceTimerRef.current)
//       }
//     }
//   }, [])

//   // Clear all filters
//   const clearFilters = useCallback(() => {
//     clearSearch()
//     setActiveCategory('all')
//     setCurrentPage(1)
//   }, [clearSearch])

//   // Sort options
//   const sortOptions = [
//     { value: 'popular', label: 'Most Popular', icon: TrendingUp },
//     { value: 'newest', label: 'Newest', icon: Clock },
//     { value: 'oldest', label: 'Oldest', icon: Clock },
//     { value: 'rating', label: 'Highest Rated', icon: Star },
//     { value: 'downloads', label: 'Most Downloads', icon: Download }
//   ]

//   // Format number
//   const formatNumber = (num) => {
//     if (!num) return '0'
//     if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
//     if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
//     return num.toString()
//   }

//   // Get rating stars
//   const getRatingStars = (rating) => {
//     if (!rating) return null
//     const fullStars = Math.floor(rating)
//     const hasHalfStar = rating % 1 >= 0.5
//     const stars = []
//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />)
//     }
//     if (hasHalfStar) {
//       stars.push(<Star key="half" className="h-3 w-3 fill-amber-400 text-amber-400" />)
//     }
//     return stars
//   }

//   // Loading state
//   if (isLoading && books.length === 0) {
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
//               <p className="text-gray-600 font-medium">Loading books...</p>
//               <p className="text-sm text-gray-400 mt-1">Discovering literary treasures</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Error state
//   if (error && books.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
//           <div className="text-center py-12">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-2xl mb-6">
//               <BookOpen className="h-10 w-10 text-red-500" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to load books</h2>
//             <p className="text-gray-500 mb-6">There was an error loading the books. Please try again.</p>
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
//               <span className="text-sm text-white font-medium">Digital Library</span>
//             </div>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
//               Books & Ebooks
//             </h1>
//             <p className="text-base text-white/90 max-w-2xl mx-auto">
//               Rare collections, journals, and literary magazines from legendary authors
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
        
//         {/* Search & Controls */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6"
//         >
//           <div className="flex flex-col md:flex-row gap-4">
//             {/* Search Input with Voice Search and Clear Button */}
//             <div className="flex-1 relative">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//               <input
//                 ref={searchInputRef}
//                 type="text"
//                 placeholder="Search by title, author, or description..."
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

//             <div className="flex items-center gap-2">
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
              
//               <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-gray-50/50">
//                 <button
//                   onClick={() => setViewMode('grid')}
//                   className={`p-2.5 transition-all ${
//                     viewMode === 'grid' 
//                       ? 'bg-primary-600 text-white' 
//                       : 'text-gray-600 hover:bg-gray-100'
//                   }`}
//                   title="Grid view"
//                 >
//                   <Grid className="h-5 w-5" />
//                 </button>
//                 <button
//                   onClick={() => setViewMode('list')}
//                   className={`p-2.5 transition-all ${
//                     viewMode === 'list' 
//                       ? 'bg-primary-600 text-white' 
//                       : 'text-gray-600 hover:bg-gray-100'
//                   }`}
//                   title="List view"
//                 >
//                   <List className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Search Results Info */}
//           {debouncedSearchQuery && (
//             <div className="mt-3 px-3 py-2 bg-primary-50 rounded-lg">
//               <p className="text-sm text-primary-700">
//                 Searching for: <span className="font-semibold">"{debouncedSearchQuery}"</span>
//                 {!isFetching && !isLoading && (
//                   <span className="ml-2">({pagination.total || books.length} books found)</span>
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
//                 Listening... Speak the book title or author name
//               </p>
//             </div>
//           )}
//         </motion.div>

//         {/* Categories */}
//         <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-6 pb-2">
//           <button
//             onClick={() => setActiveCategory('all')}
//             className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
//               activeCategory === 'all'
//                 ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
//                 : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
//             }`}
//           >
//             All Books
//           </button>
//           {BOOK_CATEGORIES.map((cat) => (
//             <button
//               key={cat.id}
//               onClick={() => setActiveCategory(cat.label)}
//               className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
//                 activeCategory === cat.label
//                   ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
//                   : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
//               }`}
//             >
//               {cat.label}
//             </button>
//           ))}
//         </div>

//         {/* Results Count */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center gap-2">
//             <div className="w-1 h-6 bg-gradient-to-b from-primary-600 to-amber-500 rounded-full" />
//             <p className="text-sm text-gray-600">
//               Showing <span className="font-semibold text-gray-900">{books.length}</span> of{' '}
//               <span className="font-semibold text-gray-900">{pagination.total || 0}</span> books
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

//         {/* Books Grid - PREMIUM UI WITH INCREASED CARD HEIGHT */}
//         {books.length === 0 && !isLoading ? (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="bg-white rounded-2xl p-12 text-center border border-gray-100"
//           >
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-2xl mb-6">
//               <BookOpen className="h-10 w-10 text-amber-600" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">No books found</h3>
//             <p className="text-gray-500 max-w-md mx-auto">
//               {debouncedSearchQuery 
//                 ? `No books matching "${debouncedSearchQuery}" found. Try a different search term.`
//                 : 'No books available in this category yet.'}
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
//         ) : viewMode === 'grid' ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {books.map((book, index) => (
//               <motion.div
//                 key={book._id || book.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: Math.min(index * 0.05, 0.3) }}
//                 whileHover={{ y: -8 }}
//               >
//                 <Link to={`/book/${book.slug}`} className="block group">
//                   {/* PREMIUM CARD - INCREASED HEIGHT */}
//                   <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 h-full flex flex-col min-h-[520px]">
                    
//                     {/* Book Cover Section with Premium Overlay */}
//                     <div className="relative h-72 overflow-hidden bg-gradient-to-br from-primary-100 to-amber-100">
//                       {book.coverImage ? (
//                         <>
//                           <img
//                             src={book.coverImage}
//                             alt={book.title}
//                             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                           />
//                           {/* Premium Overlay */}
//                           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                         </>
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center">
//                           <BookOpen className="h-20 w-20 text-primary-300" />
//                         </div>
//                       )}
                      
//                       {/* Category Badge */}
//                       <div className="absolute top-3 left-3">
//                         <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm text-gray-700 text-xs font-medium rounded-lg capitalize shadow-sm">
//                           {book.type || book.category || 'Book'}
//                         </span>
//                       </div>
                      
//                       {/* Premium Badge */}
//                       {book.isPremium && (
//                         <div className="absolute top-3 right-3">
//                           <span className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-medium rounded-lg shadow-lg">
//                             <Crown className="h-3 w-3" />
//                             Premium
//                           </span>
//                         </div>
//                       )}
                      
//                       {/* Rating Badge Overlay */}
//                       {book.stats?.averageRating > 0 && (
//                         <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/70 backdrop-blur-sm text-white text-xs rounded-lg">
//                           <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
//                           <span>{book.stats.averageRating.toFixed(1)}</span>
//                           <span className="text-white/60">({book.stats?.ratings || 0})</span>
//                         </div>
//                       )}
                      
//                       {/* Quick Actions Overlay on Hover */}
//                       <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
//                         <button className="p-2 bg-white rounded-full hover:bg-primary-600 hover:text-white transition-all transform hover:scale-110">
//                           <Bookmark className="h-4 w-4" />
//                         </button>
//                         <button className="p-2 bg-white rounded-full hover:bg-primary-600 hover:text-white transition-all transform hover:scale-110">
//                           <Share2 className="h-4 w-4" />
//                         </button>
//                         <button className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-all transform hover:scale-110">
//                           <ChevronRight className="h-4 w-4" />
//                         </button>
//                       </div>
//                     </div>
                    
//                     {/* Book Info Section */}
//                     <div className="p-5 flex-1 flex flex-col">
//                       {/* Title */}
//                       <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors min-h-[56px]">
//                         {book.title}
//                       </h3>
                      
//                       {/* Urdu/Hindi Title */}
//                       {book.titleUrdu && (
//                         <p className="urdu-text text-gray-500 text-sm mb-2 line-clamp-1" dir="rtl">
//                           {book.titleUrdu}
//                         </p>
//                       )}
                      
//                       {/* Author */}
//                       <div className="flex items-center gap-1.5 mb-2">
//                         <div className="w-5 h-5 bg-gradient-to-br from-primary-100 to-amber-100 rounded-full flex items-center justify-center">
//                           <svg className="w-3 h-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                           </svg>
//                         </div>
//                         <p className="text-gray-600 text-sm font-medium">
//                           {typeof book.author === 'object' ? book.author?.name : book.author || 'Unknown Author'}
//                         </p>
//                       </div>
                      
//                       {/* Rating Stars */}
//                       {book.stats?.averageRating > 0 && (
//                         <div className="flex items-center gap-1 mb-3">
//                           {getRatingStars(book.stats.averageRating)}
//                           <span className="text-xs text-gray-400 ml-1">
//                             ({book.stats?.ratings || 0} reviews)
//                           </span>
//                         </div>
//                       )}
                      
//                       {/* Description Preview */}
//                       {book.description && (
//                         <p className="text-gray-500 text-sm line-clamp-3 mb-4 leading-relaxed min-h-[60px]">
//                           {book.description}
//                         </p>
//                       )}
                      
//                       {/* Book Details Grid */}
//                       <div className="grid grid-cols-2 gap-3 mb-4 pt-2 border-t border-gray-100">
//                         <div className="flex items-center gap-2 text-gray-500">
//                           <BookOpen className="h-4 w-4 text-primary-500" />
//                           <div>
//                             <p className="text-xs text-gray-400">Pages</p>
//                             <p className="text-sm font-semibold text-gray-700">{book.totalPages || 'N/A'}</p>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-2 text-gray-500">
//                           <Download className="h-4 w-4 text-green-500" />
//                           <div>
//                             <p className="text-xs text-gray-400">Downloads</p>
//                             <p className="text-sm font-semibold text-gray-700">{formatNumber(book.stats?.downloads || 0)}</p>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-2 text-gray-500">
//                           <Eye className="h-4 w-4 text-blue-500" />
//                           <div>
//                             <p className="text-xs text-gray-400">Views</p>
//                             <p className="text-sm font-semibold text-gray-700">{formatNumber(book.stats?.views || 0)}</p>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-2 text-gray-500">
//                           <Heart className="h-4 w-4 text-red-500" />
//                           <div>
//                             <p className="text-xs text-gray-400">Likes</p>
//                             <p className="text-sm font-semibold text-gray-700">{formatNumber(book.likes?.length || 0)}</p>
//                           </div>
//                         </div>
//                       </div>
                      
//                       {/* Publish Year & Language */}
//                       <div className="flex items-center justify-between pt-2 border-t border-gray-100">
//                         {book.publishYear && (
//                           <div className="flex items-center gap-1">
//                             <Clock className="h-3 w-3 text-gray-400" />
//                             <span className="text-xs text-gray-500">{book.publishYear}</span>
//                           </div>
//                         )}
//                         {book.language && (
//                           <div className="flex items-center gap-1">
//                             <span className="text-xs text-gray-400 capitalize">{book.language}</span>
//                           </div>
//                         )}
//                         {book.isFree && !book.isPremium && (
//                           <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
//                             Free
//                           </span>
//                         )}
//                       </div>
//                     </div>
                    
//                     {/* Card Footer - Read More Button */}
//                     <div className="px-5 py-3 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100">
//                       <div className="flex items-center justify-between">
//                         <span className="text-primary-600 text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
//                           Read More
//                           <ChevronRight className="h-4 w-4" />
//                         </span>
//                         {book.isPremium && (
//                           <Zap className="h-4 w-4 text-amber-500" />
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         ) : (
//           // List View - Also Premium Design
//           <div className="space-y-4">
//             {books.map((book, index) => (
//               <motion.div
//                 key={book._id || book.id}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: Math.min(index * 0.05, 0.3) }}
//               >
//                 <Link to={`/book/${book.slug}`} className="block group">
//                   <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-xl transition-all hover:bg-gray-50/50">
//                     <div className="flex gap-5">
//                       {/* Image */}
//                       <div className="flex-shrink-0 w-28 h-36 overflow-hidden rounded-lg bg-gradient-to-br from-primary-100 to-amber-100 relative">
//                         {book.coverImage ? (
//                           <img
//                             src={book.coverImage}
//                             alt={book.title}
//                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                           />
//                         ) : (
//                           <div className="w-full h-full flex items-center justify-center">
//                             <BookOpen className="h-10 w-10 text-primary-300" />
//                           </div>
//                         )}
//                         {book.isPremium && (
//                           <div className="absolute top-2 right-2">
//                             <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-medium rounded-full">
//                               <Crown className="h-2 w-2" />
//                               Premium
//                             </span>
//                           </div>
//                         )}
//                       </div>
                      
//                       {/* Content */}
//                       <div className="flex-1">
//                         <div className="flex items-start justify-between mb-2">
//                           <div>
//                             <h3 className="font-semibold text-gray-900 text-lg group-hover:text-primary-600 transition-colors">
//                               {book.title}
//                             </h3>
//                             {book.titleUrdu && (
//                               <p className="urdu-text text-gray-500 text-sm mb-1" dir="rtl">
//                                 {book.titleUrdu}
//                               </p>
//                             )}
//                             <p className="text-gray-600 text-sm">
//                               {typeof book.author === 'object' ? book.author?.name : book.author || 'Unknown Author'}
//                             </p>
//                           </div>
//                           {book.stats?.averageRating > 0 && (
//                             <div className="flex items-center gap-1">
//                               {getRatingStars(book.stats.averageRating)}
//                               <span className="text-xs text-gray-400 ml-1">({book.stats?.ratings || 0})</span>
//                             </div>
//                           )}
//                         </div>
                        
//                         <p className="text-gray-500 text-sm mt-2 line-clamp-2 mb-3">
//                           {book.description}
//                         </p>
                        
//                         <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
//                           <div className="flex items-center gap-1.5">
//                             <BookOpen className="h-4 w-4 text-primary-500" />
//                             <span>{book.totalPages || 'N/A'} pages</span>
//                           </div>
//                           <div className="flex items-center gap-1.5">
//                             <Download className="h-4 w-4 text-green-500" />
//                             <span>{formatNumber(book.stats?.downloads || 0)} downloads</span>
//                           </div>
//                           <div className="flex items-center gap-1.5">
//                             <Eye className="h-4 w-4 text-blue-500" />
//                             <span>{formatNumber(book.stats?.views || 0)} views</span>
//                           </div>
//                           <div className="flex items-center gap-1.5">
//                             <Heart className="h-4 w-4 text-red-500" />
//                             <span>{formatNumber(book.likes?.length || 0)} likes</span>
//                           </div>
//                           {book.publishYear && (
//                             <div className="flex items-center gap-1.5">
//                               <Clock className="h-4 w-4 text-gray-400" />
//                               <span>{book.publishYear}</span>
//                             </div>
//                           )}
//                           <span className="capitalize px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
//                             {book.type || 'Ebook'}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {/* Loading indicator */}
//         <AnimatePresence>
//           {(isFetching || isLoading) && books.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="flex justify-center mt-8"
//             >
//               <div className="flex items-center gap-2">
//                 <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
//                 <span className="text-sm text-gray-500">Loading more books...</span>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Pagination */}
//         {pagination.totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-8">
//             <button
//               onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//               disabled={currentPage === 1}
//               className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//             >
//               Previous
//             </button>
//             <div className="flex gap-1">
//               <span className="px-4 py-2 text-sm text-gray-600">
//                 Page {currentPage} of {pagination.totalPages}
//               </span>
//             </div>
//             <button
//               onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
//               disabled={currentPage === pagination.totalPages}
//               className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default BooksListPage






















// // client/src/pages/public/BooksListPage.jsx
// import React, { useState, useEffect, useCallback, useRef } from 'react'
// import { useTranslation } from 'react-i18next'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Search, BookOpen, Star, Download, Filter, Grid, List, Loader2, X, Sparkles, TrendingUp, Clock, Eye, Heart, Mic, MicOff, Award, Crown, ChevronRight, Bookmark, Share2, Zap, Volume2 } from 'lucide-react'
// import { Link } from 'react-router-dom'
// import { useQuery } from '@tanstack/react-query'
// import bookAPI from '../../api/bookAPI'
// import { BOOK_CATEGORIES } from '../../utils/constants.js'

// const BooksListPage = () => {
//   const { t } = useTranslation()
//   const [activeCategory, setActiveCategory] = useState('all')
//   const [searchInputValue, setSearchInputValue] = useState('')
//   const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
//   const [viewMode, setViewMode] = useState('grid')
//   const [sortBy, setSortBy] = useState('popular')
//   const [currentPage, setCurrentPage] = useState(1)
//   const [isListening, setIsListening] = useState(false)
//   const [voiceSupported, setVoiceSupported] = useState(true)
//   const itemsPerPage = 12
//   const searchInputRef = useRef(null)
//   const debounceTimerRef = useRef(null)
//   const recognitionRef = useRef(null)

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

//   // Fetch books from API
//   const { data: booksData, isLoading, error, refetch, isFetching } = useQuery({
//     queryKey: ['books', currentPage, activeCategory, sortBy, debouncedSearchQuery],
//     queryFn: () => {
//       const params = {
//         page: currentPage,
//         limit: itemsPerPage,
//         sort: sortBy
//       }
      
//       if (activeCategory !== 'all') {
//         params.category = activeCategory
//       }
      
//       if (debouncedSearchQuery && debouncedSearchQuery.trim()) {
//         params.search = debouncedSearchQuery.trim()
//       }
      
//       return bookAPI.getBooks(params)
//     },
//     enabled: true,
//     staleTime: 30000,
//     keepPreviousData: true,
//     refetchOnWindowFocus: false,
//   })

//   // Extract books and pagination from response
//   const books = booksData?.data?.data || booksData?.data || booksData?.books || []
//   const pagination = booksData?.data?.pagination || booksData?.pagination || { 
//     page: currentPage, 
//     totalPages: 1, 
//     total: 0 
//   }

//   // Debounced search function
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

//   // Handle search input change
//   const handleSearchChange = useCallback((e) => {
//     const value = e.target.value
//     setSearchInputValue(value)
//     updateDebouncedSearch(value)
//   }, [updateDebouncedSearch])

//   // Clear search
//   const clearSearch = useCallback(() => {
//     setSearchInputValue('')
//     setDebouncedSearchQuery('')
//     if (searchInputRef.current) {
//       searchInputRef.current.focus()
//     }
//   }, [])

//   // Voice search handlers
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

//   // Handle category change
//   useEffect(() => {
//     setCurrentPage(1)
//     setDebouncedSearchQuery('')
//     setSearchInputValue('')
//   }, [activeCategory, sortBy])

//   // Cleanup debounce on unmount
//   useEffect(() => {
//     return () => {
//       if (debounceTimerRef.current) {
//         clearTimeout(debounceTimerRef.current)
//       }
//     }
//   }, [])

//   // Clear all filters
//   const clearFilters = useCallback(() => {
//     clearSearch()
//     setActiveCategory('all')
//     setCurrentPage(1)
//   }, [clearSearch])

//   // Sort options
//   const sortOptions = [
//     { value: 'popular', label: 'Most Popular', icon: TrendingUp },
//     { value: 'newest', label: 'Newest', icon: Clock },
//     { value: 'oldest', label: 'Oldest', icon: Clock },
//     { value: 'rating', label: 'Highest Rated', icon: Star },
//     { value: 'downloads', label: 'Most Downloads', icon: Download }
//   ]

//   // Format number
//   const formatNumber = (num) => {
//     if (!num) return '0'
//     if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
//     if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
//     return num.toString()
//   }

//   // Get rating stars
//   const getRatingStars = (rating) => {
//     if (!rating) return null
//     const fullStars = Math.floor(rating)
//     const hasHalfStar = rating % 1 >= 0.5
//     const stars = []
//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />)
//     }
//     if (hasHalfStar) {
//       stars.push(<Star key="half" className="h-3 w-3 fill-amber-400 text-amber-400" />)
//     }
//     return stars
//   }

//   // Loading state
//   if (isLoading && books.length === 0) {
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
//               <p className="text-gray-600 font-medium">Loading books...</p>
//               <p className="text-sm text-gray-400 mt-1">Discovering literary treasures</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Error state
//   if (error && books.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
//           <div className="text-center py-12">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-2xl mb-6">
//               <BookOpen className="h-10 w-10 text-red-500" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to load books</h2>
//             <p className="text-gray-500 mb-6">There was an error loading the books. Please try again.</p>
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
//               <span className="text-sm text-white font-medium">Digital Library</span>
//             </div>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
//               Books & Ebooks
//             </h1>
//             <p className="text-base text-white/90 max-w-2xl mx-auto">
//               Rare collections, journals, and literary magazines from legendary authors
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
        
//         {/* Search & Controls */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6"
//         >
//           <div className="flex flex-col md:flex-row gap-4">
//             {/* Search Input with Voice Search and Clear Button */}
//             <div className="flex-1 relative">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//               <input
//                 ref={searchInputRef}
//                 type="text"
//                 placeholder="Search by title, author, or description..."
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

//             <div className="flex items-center gap-2">
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
              
//               <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-gray-50/50">
//                 <button
//                   onClick={() => setViewMode('grid')}
//                   className={`p-2.5 transition-all ${
//                     viewMode === 'grid' 
//                       ? 'bg-primary-600 text-white' 
//                       : 'text-gray-600 hover:bg-gray-100'
//                   }`}
//                   title="Grid view"
//                 >
//                   <Grid className="h-5 w-5" />
//                 </button>
//                 <button
//                   onClick={() => setViewMode('list')}
//                   className={`p-2.5 transition-all ${
//                     viewMode === 'list' 
//                       ? 'bg-primary-600 text-white' 
//                       : 'text-gray-600 hover:bg-gray-100'
//                   }`}
//                   title="List view"
//                 >
//                   <List className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Search Results Info */}
//           {debouncedSearchQuery && (
//             <div className="mt-3 px-3 py-2 bg-primary-50 rounded-lg">
//               <p className="text-sm text-primary-700">
//                 Searching for: <span className="font-semibold">"{debouncedSearchQuery}"</span>
//                 {!isFetching && !isLoading && (
//                   <span className="ml-2">({pagination.total || books.length} books found)</span>
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
//                 Listening... Speak the book title or author name
//               </p>
//             </div>
//           )}
//         </motion.div>

//         {/* Categories */}
//         <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-6 pb-2">
//           <button
//             onClick={() => setActiveCategory('all')}
//             className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
//               activeCategory === 'all'
//                 ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
//                 : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
//             }`}
//           >
//             All Books
//           </button>
//           {BOOK_CATEGORIES.map((cat) => (
//             <button
//               key={cat.id}
//               onClick={() => setActiveCategory(cat.label)}
//               className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
//                 activeCategory === cat.label
//                   ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
//                   : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
//               }`}
//             >
//               {cat.label}
//             </button>
//           ))}
//         </div>

//         {/* Results Count */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center gap-2">
//             <div className="w-1 h-6 bg-gradient-to-b from-primary-600 to-amber-500 rounded-full" />
//             <p className="text-sm text-gray-600">
//               Showing <span className="font-semibold text-gray-900">{books.length}</span> of{' '}
//               <span className="font-semibold text-gray-900">{pagination.total || 0}</span> books
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

//         {/* Books Grid - OPTIMIZED CARD WITH 3:4 IMAGE RATIO */}
//         {books.length === 0 && !isLoading ? (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="bg-white rounded-2xl p-12 text-center border border-gray-100"
//           >
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-2xl mb-6">
//               <BookOpen className="h-10 w-10 text-amber-600" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">No books found</h3>
//             <p className="text-gray-500 max-w-md mx-auto">
//               {debouncedSearchQuery 
//                 ? `No books matching "${debouncedSearchQuery}" found. Try a different search term.`
//                 : 'No books available in this category yet.'}
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
//         ) : viewMode === 'grid' ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//             {books.map((book, index) => (
//               <motion.div
//                 key={book._id || book.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: Math.min(index * 0.05, 0.3) }}
//                 whileHover={{ y: -4 }}
//               >
//                 <Link to={`/book/${book.slug}`} className="block group">
//                   {/* OPTIMIZED CARD - REDUCED SIZE, 3:4 IMAGE RATIO */}
//                   <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col max-w-[280px] mx-auto">
                    
//                     {/* Book Cover - 3:4 Aspect Ratio (portrait) */}
//                     <div className="relative bg-gradient-to-br from-primary-100 to-amber-100" style={{ paddingBottom: '133.33%' }}>
//                       {book.coverImage ? (
//                         <>
//                           <img
//                             src={book.coverImage}
//                             alt={book.title}
//                             className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
//                           />
//                           {/* Premium Overlay */}
//                           <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                         </>
//                       ) : (
//                         <div className="absolute inset-0 flex items-center justify-center">
//                           <BookOpen className="h-12 w-12 text-primary-300" />
//                         </div>
//                       )}
                      
//                       {/* Category Badge */}
//                       <div className="absolute top-2 left-2">
//                         <span className="px-2 py-0.5 bg-white/95 backdrop-blur-sm text-gray-700 text-[10px] font-medium rounded-md capitalize shadow-sm">
//                           {book.type || book.category || 'Book'}
//                         </span>
//                       </div>
                      
//                       {/* Premium Badge */}
//                       {book.isPremium && (
//                         <div className="absolute top-2 right-2">
//                           <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-medium rounded-md shadow-lg">
//                             <Crown className="h-2.5 w-2.5" />
//                             Premium
//                           </span>
//                         </div>
//                       )}
                      
//                       {/* Rating Badge */}
//                       {book.stats?.averageRating > 0 && (
//                         <div className="absolute bottom-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 bg-black/70 backdrop-blur-sm text-white text-[10px] rounded-md">
//                           <Star className="h-2.5 w-2.5 text-yellow-400 fill-yellow-400" />
//                           <span>{book.stats.averageRating.toFixed(1)}</span>
//                         </div>
//                       )}
//                     </div>
                    
//                     {/* Book Info Section - COMPACT */}
//                     <div className="p-3 flex-1 flex flex-col">
//                       {/* Title */}
//                       <h3 className="font-semibold text-gray-900 text-sm mb-0.5 line-clamp-2 group-hover:text-primary-600 transition-colors min-h-[40px]">
//                         {book.title}
//                       </h3>
                      
//                       {/* Author */}
//                       <div className="flex items-center gap-1 mb-2">
//                         <p className="text-gray-500 text-xs truncate">
//                           {typeof book.author === 'object' ? book.author?.name : book.author || 'Unknown Author'}
//                         </p>
//                       </div>
                      
//                       {/* Rating Stars - Small */}
//                       {book.stats?.averageRating > 0 && (
//                         <div className="flex items-center gap-0.5 mb-2">
//                           {getRatingStars(book.stats.averageRating)}
//                           <span className="text-[10px] text-gray-400 ml-0.5">
//                             ({book.stats?.ratings || 0})
//                           </span>
//                         </div>
//                       )}
                      
//                       {/* Stats - IN ONE LINE (Pages, Likes, Downloads - NO VIEWS) */}
//                       <div className="flex items-center justify-between gap-2 mt-1 pt-2 border-t border-gray-100">
//                         <div className="flex items-center gap-1 text-gray-500">
//                           <BookOpen className="h-3 w-3 text-primary-500" />
//                           <span className="text-xs font-medium">{book.totalPages || 'N/A'}</span>
//                         </div>
//                         <div className="flex items-center gap-1 text-gray-500">
//                           <Heart className="h-3 w-3 text-red-500" />
//                           <span className="text-xs font-medium">{formatNumber(book.likes?.length || 0)}</span>
//                         </div>
//                         <div className="flex items-center gap-1 text-gray-500">
//                           <Download className="h-3 w-3 text-green-500" />
//                           <span className="text-xs font-medium">{formatNumber(book.stats?.downloads || 0)}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         ) : (
//           // List View - Compact
//           <div className="space-y-3">
//             {books.map((book, index) => (
//               <motion.div
//                 key={book._id || book.id}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: Math.min(index * 0.05, 0.3) }}
//               >
//                 <Link to={`/book/${book.slug}`} className="block group">
//                   <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:bg-gray-50/50">
//                     <div className="flex gap-3">
//                       {/* Image - 3:4 Ratio Small */}
//                       <div className="flex-shrink-0 w-16 h-24 overflow-hidden rounded-lg bg-gradient-to-br from-primary-100 to-amber-100 relative">
//                         {book.coverImage ? (
//                           <img
//                             src={book.coverImage}
//                             alt={book.title}
//                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                           />
//                         ) : (
//                           <div className="w-full h-full flex items-center justify-center">
//                             <BookOpen className="h-6 w-6 text-primary-300" />
//                           </div>
//                         )}
//                         {book.isPremium && (
//                           <div className="absolute top-1 right-1">
//                             <span className="flex items-center gap-0.5 px-1 py-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[8px] font-medium rounded">
//                               <Crown className="h-2 w-2" />
//                             </span>
//                           </div>
//                         )}
//                       </div>
                      
//                       {/* Content */}
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-start justify-between gap-2">
//                           <div className="min-w-0 flex-1">
//                             <h3 className="font-semibold text-gray-900 text-sm group-hover:text-primary-600 transition-colors truncate">
//                               {book.title}
//                             </h3>
//                             <p className="text-gray-500 text-xs">
//                               {typeof book.author === 'object' ? book.author?.name : book.author || 'Unknown Author'}
//                             </p>
//                           </div>
//                           {book.stats?.averageRating > 0 && (
//                             <div className="flex items-center gap-0.5">
//                               {getRatingStars(book.stats.averageRating)}
//                             </div>
//                           )}
//                         </div>
                        
//                         {/* Stats in one line */}
//                         <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
//                           <div className="flex items-center gap-1">
//                             <BookOpen className="h-3 w-3 text-primary-500" />
//                             <span>{book.totalPages || 'N/A'}</span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <Heart className="h-3 w-3 text-red-500" />
//                             <span>{formatNumber(book.likes?.length || 0)}</span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <Download className="h-3 w-3 text-green-500" />
//                             <span>{formatNumber(book.stats?.downloads || 0)}</span>
//                           </div>
//                           {book.publishYear && (
//                             <div className="flex items-center gap-1">
//                               <Clock className="h-3 w-3 text-gray-400" />
//                               <span>{book.publishYear}</span>
//                             </div>
//                           )}
//                           <span className="capitalize text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
//                             {book.type || 'Ebook'}
//                           </span>
//                         </div>
                        
//                         {/* Description - one line */}
//                         {book.description && (
//                           <p className="text-gray-400 text-xs mt-1 truncate">
//                             {book.description}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {/* Loading indicator */}
//         <AnimatePresence>
//           {(isFetching || isLoading) && books.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="flex justify-center mt-8"
//             >
//               <div className="flex items-center gap-2">
//                 <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
//                 <span className="text-sm text-gray-500">Loading more books...</span>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Pagination */}
//         {pagination.totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-8">
//             <button
//               onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//               disabled={currentPage === 1}
//               className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//             >
//               Previous
//             </button>
//             <div className="flex gap-1">
//               <span className="px-4 py-2 text-sm text-gray-600">
//                 Page {currentPage} of {pagination.totalPages}
//               </span>
//             </div>
//             <button
//               onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
//               disabled={currentPage === pagination.totalPages}
//               className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default BooksListPage














// client/src/pages/public/BooksListPage.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, BookOpen, Star, Download, Filter, Grid, List, Loader2, X, Sparkles, TrendingUp, Clock, Eye, Heart, Mic, MicOff, Award, Crown, ChevronRight, Bookmark, Share2, Zap, Volume2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import bookAPI from '../../api/bookAPI'
import { BOOK_CATEGORIES } from '../../utils/constants.js'

const BooksListPage = () => {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchInputValue, setSearchInputValue] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('popular')
  const [currentPage, setCurrentPage] = useState(1)
  const [isListening, setIsListening] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(true)
  const itemsPerPage = 12
  const searchInputRef = useRef(null)
  const debounceTimerRef = useRef(null)
  const recognitionRef = useRef(null)

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
      console.log('Speech recognition not supported in this browser')
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [])

  // Fetch books from API
  const { data: booksData, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ['books', currentPage, activeCategory, sortBy, debouncedSearchQuery],
    queryFn: () => {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        sort: sortBy
      }
      
      if (activeCategory !== 'all') {
        params.category = activeCategory
      }
      
      if (debouncedSearchQuery && debouncedSearchQuery.trim()) {
        params.search = debouncedSearchQuery.trim()
      }
      
      return bookAPI.getBooks(params)
    },
    enabled: true,
    staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  })

  // Extract books and pagination from response
  const books = booksData?.data?.data || booksData?.data || booksData?.books || []
  const pagination = booksData?.data?.pagination || booksData?.pagination || { 
    page: currentPage, 
    totalPages: 1, 
    total: 0 
  }

  // Debounced search function
  const updateDebouncedSearch = useCallback((value) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
    
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedSearchQuery(value)
      if (currentPage !== 1) {
        setCurrentPage(1)
      }
    }, 500)
  }, [currentPage])

  // Handle search input change
  const handleSearchChange = useCallback((e) => {
    const value = e.target.value
    setSearchInputValue(value)
    updateDebouncedSearch(value)
  }, [updateDebouncedSearch])

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchInputValue('')
    setDebouncedSearchQuery('')
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [])

  // Voice search handlers
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

  // Handle category change
  useEffect(() => {
    setCurrentPage(1)
    setDebouncedSearchQuery('')
    setSearchInputValue('')
  }, [activeCategory, sortBy])

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  // Clear all filters
  const clearFilters = useCallback(() => {
    clearSearch()
    setActiveCategory('all')
    setCurrentPage(1)
  }, [clearSearch])

  // Sort options
  const sortOptions = [
    { value: 'popular', label: 'Most Popular', icon: TrendingUp },
    { value: 'newest', label: 'Newest', icon: Clock },
    { value: 'oldest', label: 'Oldest', icon: Clock },
    { value: 'rating', label: 'Highest Rated', icon: Star },
    { value: 'downloads', label: 'Most Downloads', icon: Download }
  ]

  // Format number
  const formatNumber = (num) => {
    if (!num) return '0'
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  // Get rating stars
  const getRatingStars = (rating) => {
    if (!rating) return null
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const stars = []
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />)
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-3 w-3 fill-amber-400 text-amber-400" />)
    }
    return stars
  }

  // Loading state
  if (isLoading && books.length === 0) {
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
              <p className="text-gray-600 font-medium">Loading books...</p>
              <p className="text-sm text-gray-400 mt-1">Discovering literary treasures</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error && books.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-2xl mb-6">
              <BookOpen className="h-10 w-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to load books</h2>
            <p className="text-gray-500 mb-6">There was an error loading the books. Please try again.</p>
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
              <span className="text-sm text-white font-medium">Digital Library</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
              Books & Ebooks
            </h1>
            <p className="text-base text-white/90 max-w-2xl mx-auto">
              Rare collections, journals, and literary magazines from legendary authors
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
        
        {/* Search & Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input with Voice Search and Clear Button */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search by title, author, or description..."
                value={searchInputValue}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-24 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50/50 transition-all"
                autoComplete="off"
              />
              {/* Clear Button */}
              {searchInputValue && (
                <button
                  onClick={clearSearch}
                  className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  type="button"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              {/* Voice Search Button */}
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

            <div className="flex items-center gap-2">
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
              
              <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-gray-50/50">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 transition-all ${
                    viewMode === 'grid' 
                      ? 'bg-primary-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Grid view"
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 transition-all ${
                    viewMode === 'list' 
                      ? 'bg-primary-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="List view"
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Search Results Info */}
          {debouncedSearchQuery && (
            <div className="mt-3 px-3 py-2 bg-primary-50 rounded-lg">
              <p className="text-sm text-primary-700">
                Searching for: <span className="font-semibold">"{debouncedSearchQuery}"</span>
                {!isFetching && !isLoading && (
                  <span className="ml-2">({pagination.total || books.length} books found)</span>
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

          {/* Voice Search Listening Indicator */}
          {isListening && (
            <div className="mt-3 px-3 py-2 bg-red-50 rounded-lg animate-pulse">
              <p className="text-sm text-red-600 flex items-center gap-2">
                <Mic className="h-4 w-4 animate-pulse" />
                Listening... Speak the book title or author name
              </p>
            </div>
          )}
        </motion.div>

        {/* Categories */}
        <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-6 pb-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            All Books
          </button>
          {BOOK_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.label)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.label
                  ? 'bg-gradient-to-r from-primary-600 to-amber-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-primary-600 to-amber-500 rounded-full" />
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{books.length}</span> of{' '}
              <span className="font-semibold text-gray-900">{pagination.total || 0}</span> books
            </p>
          </div>
          {(activeCategory !== 'all' || debouncedSearchQuery) && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors"
            >
              Clear all filters
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        {/* Books Grid - OPTIMIZED CARD WITH 3:4 IMAGE RATIO */}
        {books.length === 0 && !isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl p-12 text-center border border-gray-100"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-2xl mb-6">
              <BookOpen className="h-10 w-10 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No books found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {debouncedSearchQuery 
                ? `No books matching "${debouncedSearchQuery}" found. Try a different search term.`
                : 'No books available in this category yet.'}
            </p>
            {(debouncedSearchQuery || activeCategory !== 'all') && (
              <button
                onClick={clearFilters}
                className="mt-6 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear all filters
                <X className="h-3 w-3" />
              </button>
            )}
          </motion.div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {books.map((book, index) => (
              <motion.div
                key={book._id || book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.05, 0.3) }}
                whileHover={{ y: -4 }}
              >
                <Link to={`/book/${book.slug}`} className="block group">
                  {/* OPTIMIZED CARD - REDUCED SIZE, 3:4 IMAGE RATIO */}
                  <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col max-w-[280px] mx-auto">
                    
                    {/* Book Cover - 3:4 Aspect Ratio (portrait) */}
                    <div className="relative bg-gradient-to-br from-primary-100 to-amber-100" style={{ paddingBottom: '133.33%' }}>
                      {book.coverImage ? (
                        <>
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          />
                          {/* Premium Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <BookOpen className="h-12 w-12 text-primary-300" />
                        </div>
                      )}
                      
                      {/* Category Badge */}
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-0.5 bg-white/95 backdrop-blur-sm text-gray-700 text-[10px] font-medium rounded-md capitalize shadow-sm">
                          {book.type || book.category || 'Book'}
                        </span>
                      </div>
                      
                      {/* Premium Badge */}
                      {book.isPremium && (
                        <div className="absolute top-2 right-2">
                          <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-medium rounded-md shadow-lg">
                            <Crown className="h-2.5 w-2.5" />
                            Premium
                          </span>
                        </div>
                      )}
                      
                      {/* Rating Badge */}
                      {book.stats?.averageRating > 0 && (
                        <div className="absolute bottom-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 bg-black/70 backdrop-blur-sm text-white text-[10px] rounded-md">
                          <Star className="h-2.5 w-2.5 text-yellow-400 fill-yellow-400" />
                          <span>{book.stats.averageRating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Book Info Section - COMPACT */}
                    <div className="p-3 flex-1 flex flex-col">
                      {/* Title */}
                      <h3 className="font-semibold text-gray-900 text-sm mb-0.5 line-clamp-2 group-hover:text-primary-600 transition-colors min-h-[40px]">
                        {book.title}
                      </h3>
                      
                      {/* Author */}
                      <div className="flex items-center gap-1 mb-2">
                        <p className="text-gray-500 text-xs truncate">
                          {typeof book.author === 'object' ? book.author?.name : book.author || 'Unknown Author'}
                        </p>
                      </div>
                      
                      {/* Rating Stars - Small */}
                      {book.stats?.averageRating > 0 && (
                        <div className="flex items-center gap-0.5 mb-2">
                          {getRatingStars(book.stats.averageRating)}
                          <span className="text-[10px] text-gray-400 ml-0.5">
                            ({book.stats?.ratings || 0})
                          </span>
                        </div>
                      )}
                      
                      {/* Stats - IN ONE LINE (Pages, Likes, Downloads - NO VIEWS) */}
                      <div className="flex items-center justify-between gap-2 mt-1 pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-1 text-gray-500">
                          <BookOpen className="h-3 w-3 text-primary-500" />
                          <span className="text-xs font-medium">{book.totalPages || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Heart className="h-3 w-3 text-red-500" />
                          <span className="text-xs font-medium">{formatNumber(book.likes?.length || 0)}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Download className="h-3 w-3 text-green-500" />
                          <span className="text-xs font-medium">{formatNumber(book.stats?.downloads || 0)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          // List View - Compact
          <div className="space-y-3">
            {books.map((book, index) => (
              <motion.div
                key={book._id || book.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Math.min(index * 0.05, 0.3) }}
              >
                <Link to={`/book/${book.slug}`} className="block group">
                  <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:bg-gray-50/50">
                    <div className="flex gap-3">
                      {/* Image - 3:4 Ratio Small */}
                      <div className="flex-shrink-0 w-16 h-24 overflow-hidden rounded-lg bg-gradient-to-br from-primary-100 to-amber-100 relative">
                        {book.coverImage ? (
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="h-6 w-6 text-primary-300" />
                          </div>
                        )}
                        {book.isPremium && (
                          <div className="absolute top-1 right-1">
                            <span className="flex items-center gap-0.5 px-1 py-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[8px] font-medium rounded">
                              <Crown className="h-2 w-2" />
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-gray-900 text-sm group-hover:text-primary-600 transition-colors truncate">
                              {book.title}
                            </h3>
                            <p className="text-gray-500 text-xs">
                              {typeof book.author === 'object' ? book.author?.name : book.author || 'Unknown Author'}
                            </p>
                          </div>
                          {book.stats?.averageRating > 0 && (
                            <div className="flex items-center gap-0.5">
                              {getRatingStars(book.stats.averageRating)}
                            </div>
                          )}
                        </div>
                        
                        {/* Stats in one line */}
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3 text-primary-500" />
                            <span>{book.totalPages || 'N/A'}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3 text-red-500" />
                            <span>{formatNumber(book.likes?.length || 0)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Download className="h-3 w-3 text-green-500" />
                            <span>{formatNumber(book.stats?.downloads || 0)}</span>
                          </div>
                          {book.publishYear && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-gray-400" />
                              <span>{book.publishYear}</span>
                            </div>
                          )}
                          <span className="capitalize text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                            {book.type || 'Ebook'}
                          </span>
                        </div>
                        
                        {/* Description - one line */}
                        {book.description && (
                          <p className="text-gray-400 text-xs mt-1 truncate">
                            {book.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Loading indicator */}
        <AnimatePresence>
          {(isFetching || isLoading) && books.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center mt-8"
            >
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
                <span className="text-sm text-gray-500">Loading more books...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            <div className="flex gap-1">
              <span className="px-4 py-2 text-sm text-gray-600">
                Page {currentPage} of {pagination.totalPages}
              </span>
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
              disabled={currentPage === pagination.totalPages}
              className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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