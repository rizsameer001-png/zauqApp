// // client/src/components/home/PopularBooks.jsx
// import React from 'react'
// import { Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion } from 'framer-motion'
// import { BookOpen, ArrowRight, Star, Download } from 'lucide-react'

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
//     image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400',
//   },
// ]

// const PopularBooks = () => {
//   const { t } = useTranslation()

//   return (
//     <section className="py-16 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center space-x-3">
//             <div className="p-2 bg-blue-100 rounded-lg">
//               <BookOpen className="h-6 w-6 text-blue-600" />
//             </div>
//             <div>
//               <h2 className="section-title mb-0">{t('home.popularBooks')}</h2>
//               <p className="text-gray-500 text-sm">Rare collections and literary journals</p>
//             </div>
//           </div>
//           <Link
//             to="/books"
//             className="hidden sm:flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium"
//           >
//             <span>{t('common.viewAll')}</span>
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {books.map((book, index) => (
//             <motion.div
//               key={book.id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               viewport={{ once: true }}
//             >
//               <Link to={`/books/${book.id}`} className="card block overflow-hidden group">
//                 <div className="relative h-56 overflow-hidden bg-gray-100">
//                   <img
//                     src={book.image}
//                     alt={book.title}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                   />
//                   <div className="absolute top-3 left-3">
//                     <span className="px-2 py-1 bg-white/90 text-gray-700 text-xs font-medium rounded-full">
//                       {book.category}
//                     </span>
//                   </div>
//                   <div className="absolute bottom-3 right-3 flex items-center space-x-1 px-2 py-1 bg-black/60 text-white text-xs rounded-full">
//                     <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
//                     <span>{book.rating}</span>
//                   </div>
//                 </div>
//                 <div className="p-4">
//                   <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
//                     {book.title}
//                   </h3>
//                   <p className="urdu-text text-gray-600 text-sm mb-2">{book.titleUr}</p>
//                   <p className="text-gray-500 text-sm mb-3">{book.author}</p>
//                   <div className="flex items-center justify-between text-sm text-gray-500">
//                     <span>{book.pages} pages</span>
//                     <span className="flex items-center space-x-1">
//                       <Download className="h-4 w-4" />
//                       <span>{(book.downloads / 1000).toFixed(1)}K</span>
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// export default PopularBooks














// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion } from 'framer-motion'
// import { BookOpen, ArrowRight, Star, Download } from 'lucide-react'
// import bookAPI from '../../api/bookAPI'

// const PopularBooks = () => {
//   const { t } = useTranslation()
//   const [books, setBooks] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     fetchBooks()
//   }, [])

//   const fetchBooks = async () => {
//     try {
//       setLoading(true)
//       let bookData = []
      
//       // Try multiple endpoints to get books
//       try {
//         // Try 1: Get featured books (likely exists)
//         console.log('Trying getFeaturedBooks...')
//         const response = await bookAPI.getFeaturedBooks()
//         console.log('Featured Books Response:', response)
//         bookData = response?.data || response || []
//       } catch (err1) {
//         console.log('getFeaturedBooks failed, trying getBooks...', err1)
        
//         try {
//           // Try 2: Get all books with limit parameter
//           const response = await bookAPI.getBooks({ limit: 4, sort: '-downloads' })
//           console.log('All Books Response:', response)
//           bookData = response?.data || response || []
//         } catch (err2) {
//           console.log('getBooks failed, trying getNewReleases...', err2)
          
//           try {
//             // Try 3: Get new releases
//             const response = await bookAPI.getNewReleases()
//             console.log('New Releases Response:', response)
//             bookData = response?.data || response || []
//           } catch (err3) {
//             console.log('All attempts failed:', err3)
//             throw new Error('No book endpoints available')
//           }
//         }
//       }
      
//       // Take only first 4 books
//       setBooks(Array.isArray(bookData) ? bookData.slice(0, 4) : [])
//       setError(null)
//     } catch (err) {
//       console.error('Error fetching books:', err)
//       setError(t('common.errorLoading'))
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Format download count (e.g., 12500 -> 12.5K)
//   const formatDownloads = (downloads) => {
//     if (!downloads) return '0'
//     if (downloads >= 1000000) return `${(downloads / 1000000).toFixed(1)}M`
//     if (downloads >= 1000) return `${(downloads / 1000).toFixed(1)}K`
//     return downloads.toString()
//   }

//   // Loading skeleton
//   if (loading) {
//     return (
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between mb-8">
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <BookOpen className="h-6 w-6 text-blue-600" />
//               </div>
//               <div>
//                 <h2 className="section-title mb-0">{t('home.popularBooks')}</h2>
//                 <p className="text-gray-500 text-sm">Rare collections and literary journals</p>
//               </div>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="card animate-pulse">
//                 <div className="h-72 bg-gray-200 rounded-t-lg" />
//                 <div className="p-4">
//                   <div className="h-5 bg-gray-200 rounded mb-2" />
//                   <div className="h-4 bg-gray-200 rounded mb-3 w-3/4" />
//                   <div className="h-4 bg-gray-200 rounded mb-3 w-1/2" />
//                   <div className="flex justify-between">
//                     <div className="h-4 bg-gray-200 rounded w-1/4" />
//                     <div className="h-4 bg-gray-200 rounded w-1/4" />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     )
//   }

//   // Error state
//   if (error) {
//     return (
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center py-12">
//             <p className="text-red-500">{error}</p>
//             <button 
//               onClick={fetchBooks}
//               className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               {t('common.retry')}
//             </button>
//           </div>
//         </div>
//       </section>
//     )
//   }

//   // No data state
//   if (!books.length) {
//     return null
//   }

//   // Main render with 4 books only
//   return (
//     <section className="py-16 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Header Section */}
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center space-x-3">
//             <div className="p-2 bg-blue-100 rounded-lg">
//               <BookOpen className="h-6 w-6 text-blue-600" />
//             </div>
//             <div>
//               <h2 className="section-title mb-0">{t('home.popularBooks')}</h2>
//               <p className="text-gray-500 text-sm">Rare collections and literary journals</p>
//             </div>
//           </div>
//           <Link
//             to="/books"
//             className="hidden sm:flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium"
//           >
//             <span>{t('common.viewAll')}</span>
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>

//         {/* Books Grid - Shows ONLY 4 books */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {books.map((book, index) => (
//             <motion.div
//               key={book.id || book._id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               viewport={{ once: true }}
//             >
//               <Link 
//                 to={`/books/${book.slug || book.id}`} 
//                 className="card block overflow-hidden group"
//               >
//                 {/* Image Section */}
//                 <div className="relative h-72 overflow-hidden bg-gray-100">
//                   <img
//                     src={book.image || book.coverImage || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400'}
//                     alt={book.title}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                     onError={(e) => {
//                       e.target.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400'
//                     }}
//                   />
                  
//                   {/* Category Badge - Only show if category exists and not an ID */}
//                   {(book.category || book.genre) && (book.category !== book._id && book.genre !== book._id) && (
//                     <div className="absolute top-3 left-3">
//                       <span className="px-2 py-1 bg-white/90 text-gray-700 text-xs font-medium rounded-full">
//                         {book.category || book.genre}
//                       </span>
//                     </div>
//                   )}
                  
//                   {/* Rating Badge */}
//                   {(book.rating || book.averageRating) && (
//                     <div className="absolute bottom-3 right-3 flex items-center space-x-1 px-2 py-1 bg-black/60 text-white text-xs rounded-full">
//                       <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
//                       <span>{(book.rating || book.averageRating || 0).toFixed(1)}</span>
//                     </div>
//                   )}
//                 </div>
                
//                 {/* Content Section */}
//                 <div className="p-4">
//                   <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors line-clamp-1">
//                     {book.title}
//                   </h3>
//                   <p className="urdu-text text-gray-600 text-sm mb-2 line-clamp-1">
//                     {book.titleUr || book.titleTranslation?.ur || ''}
//                   </p>
//                   <p className="text-gray-500 text-sm mb-3">
//                     {book.author?.name || book.author}
//                   </p>
//                   <div className="flex items-center justify-between text-sm text-gray-500">
//                     <span>{book.pages || book.pageCount || 0} pages</span>
//                     <span className="flex items-center space-x-1">
//                       <Download className="h-4 w-4" />
//                       <span>{formatDownloads(book.downloads || book.downloadCount || 0)}</span>
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>

//         {/* Mobile View All Button */}
//         <div className="mt-6 text-center sm:hidden">
//           <Link 
//             to="/books" 
//             className="inline-flex items-center space-x-2 px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
//           >
//             <span>{t('common.viewAll')}</span>
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default PopularBooks
















import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { BookOpen, ArrowRight, Star, Download } from 'lucide-react'
import bookAPI from '../../api/bookAPI'

const PopularBooks = () => {
  const { t } = useTranslation()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      setLoading(true)
      let bookData = []
      
      // Try multiple endpoints to get books
      try {
        console.log('Trying getFeaturedBooks...')
        const response = await bookAPI.getFeaturedBooks()
        console.log('Featured Books Response:', response)
        bookData = response?.data || response || []
      } catch (err1) {
        console.log('getFeaturedBooks failed, trying getBooks...', err1)
        
        try {
          // Try 2: Get all books with limit parameter
          const response = await bookAPI.getBooks({ limit: 4, sort: '-downloads' })
          console.log('All Books Response:', response)
          bookData = response?.data || response || []
        } catch (err2) {
          console.log('getBooks failed, trying getNewReleases...', err2)
          
          try {
            // Try 3: Get new releases
            const response = await bookAPI.getNewReleases()
            console.log('New Releases Response:', response)
            bookData = response?.data || response || []
          } catch (err3) {
            console.log('All attempts failed:', err3)
            throw new Error('No book endpoints available')
          }
        }
      }
      
      // Take only first 4 books
      setBooks(Array.isArray(bookData) ? bookData.slice(0, 4) : [])
      setError(null)
    } catch (err) {
      console.error('Error fetching books:', err)
      setError(t('common.errorLoading'))
    } finally {
      setLoading(false)
    }
  }

  // Format download count (e.g., 12500 -> 12.5K)
  const formatDownloads = (downloads) => {
    if (!downloads) return '0'
    if (downloads >= 1000000) return `${(downloads / 1000000).toFixed(1)}M`
    if (downloads >= 1000) return `${(downloads / 1000).toFixed(1)}K`
    return downloads.toString()
  }

  // Loading skeleton with responsive heights
  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="section-title mb-0">{t('home.popularBooks')}</h2>
                <p className="text-gray-500 text-sm">Rare collections and literary journals</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card animate-pulse">
                {/* Responsive skeleton image height */}
                <div className="h-64 sm:h-80 md:h-96 lg:h-80 xl:h-96 bg-gray-200 rounded-t-lg" />
                <div className="p-4">
                  <div className="h-5 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded mb-3 w-3/4" />
                  <div className="h-4 bg-gray-200 rounded mb-3 w-1/2" />
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <button 
              onClick={fetchBooks}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('common.retry')}
            </button>
          </div>
        </div>
      </section>
    )
  }

  // No data state
  if (!books.length) {
    return null
  }

  // Main render with 4 books only
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="section-title mb-0">{t('home.popularBooks')}</h2>
              <p className="text-gray-500 text-sm">Rare collections and literary journals</p>
            </div>
          </div>
          <Link
            to="/books"
            className="hidden sm:flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium"
          >
            <span>{t('common.viewAll')}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Books Grid - Shows ONLY 4 books */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <motion.div
              key={book.id || book._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link 
                to={`/books/${book.slug || book.id}`} 
                className="card block overflow-hidden group"
              >
                {/* Image Section - Responsive vertical size */}
                <div className="relative overflow-hidden bg-gray-100 h-64 sm:h-80 md:h-96 lg:h-80 xl:h-96">
                  <img
                    src={book.image || book.coverImage || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400'}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400'
                    }}
                  />
                  
                  {/* Category Badge - Only show if category exists and not an ID */}
                  {(book.category || book.genre) && (book.category !== book._id && book.genre !== book._id) && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-white/90 text-gray-700 text-xs font-medium rounded-full">
                        {book.category || book.genre}
                      </span>
                    </div>
                  )}
                  
                  {/* Rating Badge */}
                  {(book.rating || book.averageRating) && (
                    <div className="absolute bottom-3 right-3 flex items-center space-x-1 px-2 py-1 bg-black/60 text-white text-xs rounded-full">
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      <span>{(book.rating || book.averageRating || 0).toFixed(1)}</span>
                    </div>
                  )}
                </div>
                
                {/* Content Section */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="urdu-text text-gray-600 text-sm mb-2 line-clamp-1">
                    {book.titleUr || book.titleTranslation?.ur || ''}
                  </p>
                  <p className="text-gray-500 text-sm mb-3">
                    {book.author?.name || book.author}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{book.pages || book.pageCount || 0} pages</span>
                    <span className="flex items-center space-x-1">
                      <Download className="h-4 w-4" />
                      <span>{formatDownloads(book.downloads || book.downloadCount || 0)}</span>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-6 text-center sm:hidden">
          <Link 
            to="/books" 
            className="inline-flex items-center space-x-2 px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <span>{t('common.viewAll')}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default PopularBooks