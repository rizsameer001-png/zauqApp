// //client/src/pages/public/BookDetailPage.jsx

// import React, { useState } from 'react'
// import { useParams, Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion } from 'framer-motion'
// import {
//   Heart, Share2, Bookmark, Download, BookOpen, Star,
//   ChevronLeft, Clock, Eye, FileText, Calendar
// } from 'lucide-react'

// const BookDetailPage = () => {
//   const { id } = useParams()
//   const { t } = useTranslation()
//   const [isLiked, setIsLiked] = useState(false)
//   const [isBookmarked, setIsBookmarked] = useState(false)
//   const [showPreview, setShowPreview] = useState(false)

//   const book = {
//     id: 1,
//     title: 'Diwan-e-Ghalib',
//     titleUr: 'دیوانِ غالب',
//     author: 'Mirza Ghalib',
//     authorId: 1,
//     category: 'Rare Books',
//     rating: 4.9,
//     downloads: 12500,
//     pages: 450,
//     year: 1841,
//     language: 'Urdu',
//     format: 'PDF',
//     size: '12.5 MB',
//     image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600',
//     description: 'Diwan-e-Ghalib is a collection of ghazals written by Mirza Ghalib, one of the most prominent poets in Urdu literature. This collection represents the pinnacle of Urdu poetry and has been celebrated for centuries for its depth, beauty, and philosophical insight.',
//     previewPages: 5,
//     relatedBooks: [
//       { id: 2, title: 'Bang-e-Dara', author: 'Allama Iqbal' },
//       { id: 3, title: 'Kulliyat-e-Faiz', author: 'Faiz Ahmed Faiz' },
//     ],
//   }

//   return (
//     <div className="page-container max-w-5xl">
//       {/* Breadcrumb */}
//       <div className="mb-6">
//         <Link to="/books" className="flex items-center space-x-1 text-sm text-gray-500 hover:text-primary-600">
//           <ChevronLeft className="h-4 w-4" />
//           <span>Back to Books</span>
//         </Link>
//       </div>

//       <div className="grid md:grid-cols-3 gap-8 mb-8">
//         {/* Book Cover */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//         >
//           <div className="card overflow-hidden">
//             <img
//               src={book.image}
//               alt={book.title}
//               className="w-full aspect-[3/4] object-cover"
//             />
//           </div>
//           <div className="flex space-x-2 mt-4">
//             <button
//               onClick={() => setIsLiked(!isLiked)}
//               className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg transition-colors ${
//                 isLiked ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//               }`}
//             >
//               <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
//               <span className="text-sm font-medium">Like</span>
//             </button>
//             <button
//               onClick={() => setIsBookmarked(!isBookmarked)}
//               className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg transition-colors ${
//                 isBookmarked ? 'bg-primary-50 text-primary-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//               }`}
//             >
//               <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-primary-500' : ''}`} />
//               <span className="text-sm font-medium">Save</span>
//             </button>
//           </div>
//         </motion.div>

//         {/* Book Info */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="md:col-span-2"
//         >
//           <div className="flex items-center space-x-2 mb-2">
//             <span className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full">
//               {book.category}
//             </span>
//             <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
//               {book.format}
//             </span>
//           </div>

//           <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
//           <p className="urdu-text text-xl text-gray-600 mb-4">{book.titleUr}</p>

//           <div className="flex items-center space-x-4 mb-6">
//             <Link to={`/authors/${book.authorId}`} className="text-primary-600 hover:text-primary-700 font-medium">
//               {book.author}
//             </Link>
//             <span className="text-gray-300">|</span>
//             <div className="flex items-center space-x-1">
//               <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
//               <span className="font-medium">{book.rating}</span>
//             </div>
//             <span className="text-gray-300">|</span>
//             <span className="text-gray-500">{book.year}</span>
//           </div>

//           <p className="text-gray-700 leading-relaxed mb-6">{book.description}</p>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//             {[
//               { icon: FileText, label: 'Pages', value: book.pages },
//               { icon: Calendar, label: 'Year', value: book.year },
//               { icon: Download, label: 'Downloads', value: `${(book.downloads / 1000).toFixed(1)}K` },
//               { icon: BookOpen, label: 'Size', value: book.size },
//             ].map((stat, index) => (
//               <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
//                 <stat.icon className="h-5 w-5 text-primary-600 mx-auto mb-1" />
//                 <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
//                 <p className="text-xs text-gray-500">{stat.label}</p>
//               </div>
//             ))}
//           </div>

//           <div className="flex flex-wrap gap-3">
//             <button
//               onClick={() => setShowPreview(!showPreview)}
//               className="btn-outline inline-flex items-center space-x-2"
//             >
//               <Eye className="h-5 w-5" />
//               <span>{showPreview ? 'Close Preview' : 'Preview'}</span>
//             </button>
//             <button className="btn-primary inline-flex items-center space-x-2">
//               <Download className="h-5 w-5" />
//               <span>Download</span>
//             </button>
//             <button className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//               <Share2 className="h-5 w-5 text-gray-600" />
//             </button>
//           </div>
//         </motion.div>
//       </div>

//       {/* Preview */}
//       {showPreview && (
//         <motion.div
//           initial={{ opacity: 0, height: 0 }}
//           animate={{ opacity: 1, height: 'auto' }}
//           className="card p-6 mb-8"
//         >
//           <h3 className="font-semibold text-gray-900 mb-4">Book Preview</h3>
//           <div className="bg-gray-100 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
//             <p className="text-gray-500">PDF/EPUB Reader Component would render here</p>
//           </div>
//         </motion.div>
//       )}

//       {/* Related Books */}
//       <div>
//         <h3 className="font-semibold text-gray-900 mb-4">Related Books</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {book.relatedBooks.map((related) => (
//             <Link
//               key={related.id}
//               to={`/books/${related.id}`}
//               className="card p-4 hover:shadow-md transition-shadow"
//             >
//               <h4 className="font-medium text-gray-900">{related.title}</h4>
//               <p className="text-sm text-gray-500">{related.author}</p>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default BookDetailPage











// // client/src/pages/public/BookDetailPage.jsx
// import React, { useState } from 'react'
// import { useParams, Link, useNavigate } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion } from 'framer-motion'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { useSelector } from 'react-redux'
// import toast from 'react-hot-toast'
// import {
//   Heart, Share2, Bookmark, Download, BookOpen, Star,
//   ChevronLeft, Clock, Eye, FileText, Calendar, Loader2,
//   AlertCircle, ChevronRight, User, Languages, File, PenTool
// } from 'lucide-react'
// import bookAPI from '../../api/bookAPI'
// import authorAPI from '../../api/authorAPI'

// const BookDetailPage = () => {
//   const { slug } = useParams()
//   const navigate = useNavigate()
//   const { t } = useTranslation()
//   const queryClient = useQueryClient()
//   const { user } = useSelector(state => state.auth)
  
//   const [showPreview, setShowPreview] = useState(false)
//   const [isLiked, setIsLiked] = useState(false)
//   const [isBookmarked, setIsBookmarked] = useState(false)

//   // Fetch book data using slug
//   const { data: bookData, isLoading, error } = useQuery({
//     queryKey: ['book', slug],
//     queryFn: () => bookAPI.getBook(slug),
//     enabled: !!slug,
//     retry: 1
//   })

//   // Extract book from response
//   const book = bookData?.data || bookData

//   // Fetch related books
//   const { data: relatedData } = useQuery({
//     queryKey: ['related-books', book?._id],
//     queryFn: () => bookAPI.getRelatedBooks(slug),
//     enabled: !!slug && !!book?._id
//   })

//   const relatedBooks = relatedData?.data || relatedData || []

//   // Download mutation
//   const downloadMutation = useMutation({
//     mutationFn: () => bookAPI.downloadBook(slug),
//     onSuccess: (response) => {
//       const downloadUrl = response.data?.downloadUrl || response?.downloadUrl
//       if (downloadUrl) {
//         window.open(downloadUrl, '_blank')
//         toast.success('Download started!')
//       }
//     },
//     onError: () => toast.error('Failed to download book')
//   })

//   // Helper function to format date
//   const formatDate = (dateString) => {
//     if (!dateString) return 'Unknown'
//     try {
//       return new Date(dateString).getFullYear()
//     } catch {
//       return 'Unknown'
//     }
//   }

//   // Helper function to get author name safely
//   const getAuthorName = () => {
//     if (!book?.author) return 'Unknown Author'
//     if (typeof book.author === 'object') return book.author.name || 'Unknown Author'
//     return book.author || 'Unknown Author'
//   }

//   // Helper function to get author slug
//   const getAuthorSlug = () => {
//     if (!book?.author) return '#'
//     if (typeof book.author === 'object') return book.author.slug || '#'
//     return '#'
//   }

//   // Helper function to get category name
//   const getCategoryName = () => {
//     if (!book?.category) return 'Uncategorized'
//     if (typeof book.category === 'object') return book.category.name || 'Uncategorized'
//     return book.category || 'Uncategorized'
//   }

//   // Format file size
//   const formatFileSize = (bytes) => {
//     if (!bytes) return 'Unknown'
//     const sizes = ['Bytes', 'KB', 'MB', 'GB']
//     const i = Math.floor(Math.log(bytes) / Math.log(1024))
//     return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i]
//   }

//   // Handle download
//   const handleDownload = () => {
//     if (!user) {
//       toast.error('Please login to download books')
//       navigate('/login')
//       return
//     }
//     downloadMutation.mutate()
//   }

//   // Handle share
//   const handleShare = async () => {
//     const url = window.location.href
//     try {
//       await navigator.clipboard.writeText(url)
//       toast.success('Link copied to clipboard!')
//     } catch (err) {
//       toast.error('Failed to copy link')
//     }
//   }

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
//           <p className="text-gray-500">Loading book details...</p>
//         </div>
//       </div>
//     )
//   }

//   // Error state
//   if (error || !book) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Book Not Found</h1>
//           <p className="text-gray-500 mb-6">
//             The book you are looking for does not exist or has been removed.
//           </p>
//           <Link to="/books" className="btn-primary inline-flex items-center space-x-2">
//             <ChevronLeft className="h-4 w-4" />
//             <span>Browse All Books</span>
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   // Stats for display
//   const stats = [
//     { icon: FileText, label: 'Pages', value: book.totalPages || 'N/A' },
//     { icon: Calendar, label: 'Year', value: formatDate(book.publishYear || book.createdAt) },
//     { icon: Download, label: 'Downloads', value: (book.stats?.downloads || 0).toLocaleString() },
//     { icon: BookOpen, label: 'Format', value: book.type?.toUpperCase() || 'PDF' },
//   ]

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Breadcrumb */}
//         <div className="mb-6">
//           <Link 
//             to="/books" 
//             className="inline-flex items-center space-x-1 text-sm text-gray-500 hover:text-primary-600 transition-colors"
//           >
//             <ChevronLeft className="h-4 w-4" />
//             <span>Back to Books</span>
//           </Link>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8 mb-8">
//           {/* Book Cover */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//           >
//             <div className="card overflow-hidden rounded-xl">
//               {book.coverImage ? (
//                 <img
//                   src={book.coverImage}
//                   alt={book.title}
//                   className="w-full aspect-[3/4] object-cover"
//                 />
//               ) : (
//                 <div className="w-full aspect-[3/4] bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
//                   <BookOpen className="h-20 w-20 text-primary-400" />
//                 </div>
//               )}
//             </div>
            
//             {/* Action Buttons */}
//             <div className="flex space-x-2 mt-4">
//               <button
//                 onClick={() => setIsLiked(!isLiked)}
//                 className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg transition-colors ${
//                   isLiked ? 'bg-red-50 text-red-600' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
//                 }`}
//               >
//                 <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
//                 <span className="text-sm font-medium">Like</span>
//               </button>
//               <button
//                 onClick={() => setIsBookmarked(!isBookmarked)}
//                 className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg transition-colors ${
//                   isBookmarked ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
//                 }`}
//               >
//                 <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-primary-500' : ''}`} />
//                 <span className="text-sm font-medium">Save</span>
//               </button>
//             </div>
//           </motion.div>

//           {/* Book Info */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="md:col-span-2"
//           >
//             {/* Badges */}
//             <div className="flex flex-wrap items-center gap-2 mb-3">
//               <span className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full capitalize">
//                 {getCategoryName()}
//               </span>
//               <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full uppercase">
//                 {book.type || 'Ebook'}
//               </span>
//               <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
//                 {book.language === 'urdu' ? 'Urdu' : book.language === 'hindi' ? 'Hindi' : book.language || 'English'}
//               </span>
//               {book.isFree && (
//                 <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
//                   Free
//                 </span>
//               )}
//               {book.isPremium && (
//                 <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
//                   Premium
//                 </span>
//               )}
//               {book.isFeatured && (
//                 <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
//                   Featured
//                 </span>
//               )}
//             </div>

//             {/* Title */}
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
//             {book.subtitle && (
//               <p className="text-lg text-gray-600 mb-3">{book.subtitle}</p>
//             )}

//             {/* Author */}
//             <div className="flex items-center flex-wrap gap-4 mb-6">
//               <Link 
//                 to={`/author/${getAuthorSlug()}`} 
//                 className="inline-flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-medium"
//               >
//                 <User className="h-4 w-4" />
//                 <span>{getAuthorName()}</span>
//               </Link>
              
//               {book.stats?.averageRating > 0 && (
//                 <>
//                   <span className="text-gray-300">|</span>
//                   <div className="flex items-center space-x-1">
//                     <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
//                     <span className="font-medium">{book.stats.averageRating.toFixed(1)}</span>
//                     <span className="text-gray-500">({book.stats.ratings || 0} reviews)</span>
//                   </div>
//                 </>
//               )}
//             </div>

//             {/* Description */}
//             <p className="text-gray-700 leading-relaxed mb-6">
//               {book.description || 'No description available for this book.'}
//             </p>

//             {/* Stats Grid */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//               {stats.map((stat, index) => (
//                 <div key={index} className="bg-white rounded-lg p-3 text-center border border-gray-100">
//                   <stat.icon className="h-5 w-5 text-primary-600 mx-auto mb-1" />
//                   <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
//                   <p className="text-xs text-gray-500">{stat.label}</p>
//                 </div>
//               ))}
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-wrap gap-3">
//               {book.pdfUrl || book.epubUrl ? (
//                 <button
//                   onClick={handleDownload}
//                   disabled={downloadMutation.isPending}
//                   className="btn-primary inline-flex items-center space-x-2"
//                 >
//                   {downloadMutation.isPending ? (
//                     <Loader2 className="h-5 w-5 animate-spin" />
//                   ) : (
//                     <Download className="h-5 w-5" />
//                   )}
//                   <span>Download {book.type?.toUpperCase()}</span>
//                 </button>
//               ) : (
//                 <button className="btn-primary inline-flex items-center space-x-2 opacity-50 cursor-not-allowed">
//                   <Download className="h-5 w-5" />
//                   <span>Coming Soon</span>
//                 </button>
//               )}
              
//               {(book.pdfUrl || book.epubUrl) && (
//                 <button
//                   onClick={() => setShowPreview(!showPreview)}
//                   className="btn-outline inline-flex items-center space-x-2"
//                 >
//                   <Eye className="h-5 w-5" />
//                   <span>{showPreview ? 'Close Preview' : 'Preview'}</span>
//                 </button>
//               )}
              
//               <button 
//                 onClick={handleShare}
//                 className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 <Share2 className="h-5 w-5 text-gray-600" />
//               </button>
//             </div>

//             {/* Additional Info */}
//             {book.publisher && (
//               <div className="mt-6 pt-6 border-t border-gray-200">
//                 <p className="text-sm text-gray-500">
//                   Published by <span className="font-medium text-gray-700">{book.publisher}</span>
//                   {book.publishYear && ` in ${book.publishYear}`}
//                   {book.isbn && ` • ISBN: ${book.isbn}`}
//                 </p>
//               </div>
//             )}
//           </motion.div>
//         </div>

//         {/* Preview Section */}
//         {showPreview && (book.pdfUrl || book.epubUrl) && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             className="card p-6 mb-8"
//           >
//             <h3 className="font-semibold text-gray-900 mb-4">Book Preview</h3>
//             <div className="bg-gray-100 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
//               {book.pdfUrl ? (
//                 <iframe
//                   src={`${book.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
//                   title={book.title}
//                   className="w-full h-[500px] rounded-lg"
//                   frameBorder="0"
//                 />
//               ) : (
//                 <div className="text-center">
//                   <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
//                   <p className="text-gray-500">Preview not available for EPUB format</p>
//                   <button
//                     onClick={handleDownload}
//                     className="mt-4 text-primary-600 hover:text-primary-700"
//                   >
//                     Download to read
//                   </button>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         )}

//         {/* Related Books */}
//         {relatedBooks.length > 0 && (
//           <div className="mt-8">
//             <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//               <BookOpen className="h-5 w-5 text-primary-600" />
//               Related Books
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {relatedBooks.slice(0, 3).map((related) => (
//                 <Link
//                   key={related._id}
//                   to={`/book/${related.slug}`}
//                   className="card p-4 hover:shadow-md transition-all hover:-translate-y-0.5 flex items-center gap-3"
//                 >
//                   {related.coverImage ? (
//                     <img 
//                       src={related.coverImage} 
//                       alt={related.title}
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                   ) : (
//                     <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
//                       <BookOpen className="h-6 w-6 text-gray-400" />
//                     </div>
//                   )}
//                   <div className="flex-1">
//                     <h4 className="font-medium text-gray-900 line-clamp-1">{related.title}</h4>
//                     <p className="text-sm text-gray-500">
//                       {typeof related.author === 'object' ? related.author?.name : related.author || 'Unknown'}
//                     </p>
//                     <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
//                       <span className="flex items-center gap-1">
//                         <Eye className="h-3 w-3" />
//                         {related.stats?.views?.toLocaleString() || 0}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <Download className="h-3 w-3" />
//                         {related.stats?.downloads?.toLocaleString() || 0}
//                       </span>
//                     </div>
//                   </div>
//                   <ChevronRight className="h-4 w-4 text-gray-400" />
//                 </Link>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default BookDetailPage









// // client/src/pages/public/BookDetailPage.jsx
// import React, { useState, useEffect, useRef, useCallback } from 'react'
// import { useParams, Link, useNavigate } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { useSelector } from 'react-redux'
// import toast from 'react-hot-toast'
// import {
//   Heart, Share2, Bookmark, Download, BookOpen, Star,
//   ChevronLeft, Clock, Eye, FileText, Calendar, Loader2,
//   AlertCircle, ChevronRight, User, Languages, File, PenTool,
//   ChevronRight as NextIcon, ChevronLeft as PrevIcon,
//   Maximize2, Minimize2, Settings, BookMarked, History
// } from 'lucide-react'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Navigation, Pagination, Keyboard, Mousewheel } from 'swiper/modules'
// import 'swiper/css'
// import 'swiper/css/navigation'
// import 'swiper/css/pagination'
// import bookAPI from '../../api/bookAPI'
// import authorAPI from '../../api/authorAPI'

// const BookDetailPage = () => {
//   const { slug } = useParams()
//   const navigate = useNavigate()
//   const { t } = useTranslation()
//   const queryClient = useQueryClient()
//   const { user } = useSelector(state => state.auth)
//   const swiperRef = useRef(null)
  
//   const [showPreview, setShowPreview] = useState(false)
//   const [isLiked, setIsLiked] = useState(false)
//   const [isBookmarked, setIsBookmarked] = useState(false)
//   const [currentPage, setCurrentPage] = useState(1)
//   const [totalPages, setTotalPages] = useState(0)
//   const [isFullscreen, setIsFullscreen] = useState(false)
//   const [readingProgress, setReadingProgress] = useState(0)
//   const [pageImages, setPageImages] = useState([])
//   const [isLoadingPages, setIsLoadingPages] = useState(false)

//   // Fetch book data using slug
//   const { data: bookData, isLoading, error } = useQuery({
//     queryKey: ['book', slug],
//     queryFn: () => bookAPI.getBook(slug),
//     enabled: !!slug,
//     retry: 1
//   })

//   const book = bookData?.data || bookData

//   // Fetch related books
//   const { data: relatedData } = useQuery({
//     queryKey: ['related-books', book?._id],
//     queryFn: () => bookAPI.getRelatedBooks(slug),
//     enabled: !!slug && !!book?._id
//   })

//   const relatedBooks = relatedData?.data || relatedData || []

//   // Fetch similar books by same author
//   const { data: authorBooksData } = useQuery({
//     queryKey: ['author-books', book?.author?._id],
//     queryFn: () => bookAPI.getBooksByAuthor(book?.author?._id),
//     enabled: !!book?.author?._id
//   })

//   const authorBooks = authorBooksData?.data || authorBooksData || []

//   // Fetch reading progress from localStorage
//   useEffect(() => {
//     if (book?._id) {
//       const savedProgress = localStorage.getItem(`book_progress_${book._id}`)
//       if (savedProgress) {
//         const progress = JSON.parse(savedProgress)
//         setReadingProgress(progress.page || 0)
//         setCurrentPage(progress.page || 1)
//       }
//     }
//   }, [book?._id])

//   // Save reading progress
//   const saveReadingProgress = useCallback((page) => {
//     if (book?._id) {
//       const progress = {
//         bookId: book._id,
//         page: page,
//         timestamp: new Date().toISOString(),
//         percentage: (page / totalPages) * 100
//       }
//       localStorage.setItem(`book_progress_${book._id}`, JSON.stringify(progress))
//       setReadingProgress(page)
//     }
//   }, [book?._id, totalPages])

//   // Load page images for PDF/EPUB
//   const loadPageImages = useCallback(async () => {
//     if (!book?.pageImages || book.pageImages.length === 0) {
//       // If no pre-generated images, use PDF.js to render
//       if (book?.pdfUrl) {
//         setIsLoadingPages(true)
//         try {
//           // This would integrate with PDF.js to render pages
//           // For now, use placeholder or backend API
//           const response = await bookAPI.getBookPages(slug)
//           setPageImages(response.data || [])
//           setTotalPages(response.totalPages || 0)
//         } catch (error) {
//           console.error('Error loading pages:', error)
//         } finally {
//           setIsLoadingPages(false)
//         }
//       }
//     } else {
//       setPageImages(book.pageImages)
//       setTotalPages(book.totalPages || book.pageImages.length)
//     }
//   }, [book, slug])

//   // Handle page change
//   const handlePageChange = (page) => {
//     setCurrentPage(page)
//     saveReadingProgress(page)
//   }

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       handlePageChange(currentPage + 1)
//       if (swiperRef.current) {
//         swiperRef.current.slideTo(currentPage)
//       }
//     }
//   }

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       handlePageChange(currentPage - 1)
//       if (swiperRef.current) {
//         swiperRef.current.slideTo(currentPage - 2)
//       }
//     }
//   }

//   // Toggle fullscreen
//   const toggleFullscreen = () => {
//     const readerElement = document.getElementById('book-reader')
//     if (!isFullscreen) {
//       if (readerElement.requestFullscreen) {
//         readerElement.requestFullscreen()
//       }
//     } else {
//       if (document.exitFullscreen) {
//         document.exitFullscreen()
//       }
//     }
//     setIsFullscreen(!isFullscreen)
//   }

//   // Download mutation
//   const downloadMutation = useMutation({
//     mutationFn: () => bookAPI.downloadBook(slug),
//     onSuccess: (response) => {
//       const downloadUrl = response.data?.downloadUrl || response?.downloadUrl
//       if (downloadUrl) {
//         window.open(downloadUrl, '_blank')
//         toast.success('Download started!')
//       }
//     },
//     onError: () => toast.error('Failed to download book')
//   })

//   // Helper functions
//   const formatDate = (dateString) => {
//     if (!dateString) return 'Unknown'
//     try {
//       return new Date(dateString).getFullYear()
//     } catch {
//       return 'Unknown'
//     }
//   }

//   const getAuthorName = () => {
//     if (!book?.author) return 'Unknown Author'
//     if (typeof book.author === 'object') return book.author.name || 'Unknown Author'
//     return book.author || 'Unknown Author'
//   }

//   const getAuthorSlug = () => {
//     if (!book?.author) return '#'
//     if (typeof book.author === 'object') return book.author.slug || '#'
//     return '#'
//   }

//   const getCategoryName = () => {
//     if (!book?.category) return 'Uncategorized'
//     if (typeof book.category === 'object') return book.category.name || 'Uncategorized'
//     return book.category || 'Uncategorized'
//   }

//   // Group similar books by genre/author
//   const groupedSimilarBooks = {
//     bySameAuthor: authorBooks.filter(b => b._id !== book?._id).slice(0, 4),
//     bySameGenre: relatedBooks.filter(b => b._id !== book?._id).slice(0, 4),
//     recommended: [...relatedBooks, ...authorBooks].filter((v, i, a) => 
//       a.findIndex(t => t._id === v._id) === i && v._id !== book?._id
//     ).slice(0, 6)
//   }

//   // Handle download
//   const handleDownload = () => {
//     if (!user) {
//       toast.error('Please login to download books')
//       navigate('/login')
//       return
//     }
    
//     if (book.isPremium && user?.subscription?.plan === 'free') {
//       toast.error('Premium subscription required to download this book')
//       return
//     }
    
//     downloadMutation.mutate()
//   }

//   // Handle share
//   const handleShare = async () => {
//     const url = window.location.href
//     try {
//       await navigator.clipboard.writeText(url)
//       toast.success('Link copied to clipboard!')
//     } catch (err) {
//       toast.error('Failed to copy link')
//     }
//   }

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
//           <p className="text-gray-500">Loading book details...</p>
//         </div>
//       </div>
//     )
//   }

//   // Error state
//   if (error || !book) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Book Not Found</h1>
//           <p className="text-gray-500 mb-6">The book you are looking for does not exist or has been removed.</p>
//           <Link to="/books" className="btn-primary inline-flex items-center space-x-2">
//             <ChevronLeft className="h-4 w-4" />
//             <span>Browse All Books</span>
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   const stats = [
//     { icon: FileText, label: 'Pages', value: book.totalPages || 'N/A' },
//     { icon: Calendar, label: 'Year', value: formatDate(book.publishYear || book.createdAt) },
//     { icon: Download, label: 'Downloads', value: (book.stats?.downloads || 0).toLocaleString() },
//     { icon: BookOpen, label: 'Format', value: book.type?.toUpperCase() || 'PDF' },
//   ]

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Breadcrumb */}
//         <div className="mb-6">
//           <Link to="/books" className="inline-flex items-center space-x-1 text-sm text-gray-500 hover:text-primary-600 transition-colors">
//             <ChevronLeft className="h-4 w-4" />
//             <span>Back to Books</span>
//           </Link>
//         </div>

//         {/* Book Info Section */}
//         <div className="grid lg:grid-cols-3 gap-8 mb-8">
//           {/* Book Cover */}
//           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
//             <div className="card overflow-hidden rounded-xl shadow-lg">
//               {book.coverImage ? (
//                 <img src={book.coverImage} alt={book.title} className="w-full aspect-[3/4] object-cover" />
//               ) : (
//                 <div className="w-full aspect-[3/4] bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
//                   <BookOpen className="h-20 w-20 text-primary-400" />
//                 </div>
//               )}
//             </div>
            
//             {/* Action Buttons */}
//             <div className="flex space-x-2 mt-4">
//               <button
//                 onClick={() => setIsLiked(!isLiked)}
//                 className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg transition-colors ${
//                   isLiked ? 'bg-red-50 text-red-600' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
//                 }`}
//               >
//                 <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
//                 <span className="text-sm font-medium">Like</span>
//               </button>
//               <button
//                 onClick={() => setIsBookmarked(!isBookmarked)}
//                 className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg transition-colors ${
//                   isBookmarked ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
//                 }`}
//               >
//                 <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-primary-500' : ''}`} />
//                 <span className="text-sm font-medium">Save</span>
//               </button>
//             </div>
//           </motion.div>

//           {/* Book Info */}
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
//             {/* Badges */}
//             <div className="flex flex-wrap items-center gap-2 mb-3">
//               <span className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full capitalize">
//                 {getCategoryName()}
//               </span>
//               <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full uppercase">
//                 {book.type || 'Ebook'}
//               </span>
//               <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
//                 {book.language === 'urdu' ? 'Urdu' : book.language === 'hindi' ? 'Hindi' : book.language || 'English'}
//               </span>
//               {book.isFree && <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Free</span>}
//               {book.isPremium && <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">Premium</span>}
//               {book.isFeatured && <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">Featured</span>}
//             </div>

//             <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
//             {book.subtitle && <p className="text-lg text-gray-600 mb-3">{book.subtitle}</p>}

//             {/* Author */}
//             <div className="flex items-center flex-wrap gap-4 mb-6">
//               <Link to={`/author/${getAuthorSlug()}`} className="inline-flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-medium">
//                 <User className="h-4 w-4" />
//                 <span>{getAuthorName()}</span>
//               </Link>
              
//               {book.stats?.averageRating > 0 && (
//                 <>
//                   <span className="text-gray-300">|</span>
//                   <div className="flex items-center space-x-1">
//                     <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
//                     <span className="font-medium">{book.stats.averageRating.toFixed(1)}</span>
//                     <span className="text-gray-500">({book.stats.ratings || 0} reviews)</span>
//                   </div>
//                 </>
//               )}
//             </div>

//             {/* Description */}
//             <p className="text-gray-700 leading-relaxed mb-6">{book.description || 'No description available for this book.'}</p>

//             {/* Stats Grid */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//               {stats.map((stat, index) => (
//                 <div key={index} className="bg-white rounded-lg p-3 text-center border border-gray-100">
//                   <stat.icon className="h-5 w-5 text-primary-600 mx-auto mb-1" />
//                   <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
//                   <p className="text-xs text-gray-500">{stat.label}</p>
//                 </div>
//               ))}
//             </div>

//             {/* Reading Progress */}
//             {readingProgress > 0 && (
//               <div className="mb-4 p-3 bg-blue-50 rounded-lg">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-sm text-blue-700 flex items-center gap-2">
//                     <History className="h-4 w-4" />
//                     Continue Reading
//                   </span>
//                   <span className="text-sm text-blue-700">Page {readingProgress} of {totalPages}</span>
//                 </div>
//                 <div className="w-full bg-blue-200 rounded-full h-2">
//                   <div 
//                     className="bg-blue-600 h-2 rounded-full transition-all duration-300"
//                     style={{ width: `${(readingProgress / totalPages) * 100}%` }}
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Action Buttons */}
//             <div className="flex flex-wrap gap-3">
//               {(book.pdfUrl || book.epubUrl) && (
//                 <button
//                   onClick={() => {
//                     setShowPreview(!showPreview)
//                     if (!showPreview && (book.pdfUrl || book.pageImages)) {
//                       loadPageImages()
//                     }
//                   }}
//                   className="btn-primary inline-flex items-center space-x-2"
//                 >
//                   <BookOpen className="h-5 w-5" />
//                   <span>{showPreview ? 'Close Reader' : 'Read Book'}</span>
//                 </button>
//               )}
              
//               <button
//                 onClick={handleDownload}
//                 disabled={downloadMutation.isPending || (book.isPremium && user?.subscription?.plan === 'free')}
//                 className="btn-outline inline-flex items-center space-x-2"
//               >
//                 {downloadMutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
//                 <span>Download {book.type?.toUpperCase()}</span>
//               </button>
              
//               <button onClick={handleShare} className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//                 <Share2 className="h-5 w-5 text-gray-600" />
//               </button>
//             </div>

//             {/* Additional Info */}
//             {book.publisher && (
//               <div className="mt-6 pt-6 border-t border-gray-200">
//                 <p className="text-sm text-gray-500">
//                   Published by <span className="font-medium text-gray-700">{book.publisher}</span>
//                   {book.publishYear && ` in ${book.publishYear}`}
//                   {book.isbn && ` • ISBN: ${book.isbn}`}
//                 </p>
//               </div>
//             )}
//           </motion.div>
//         </div>

//         {/* Book Reader Section with Page Flip */}
//         <AnimatePresence>
//           {showPreview && (book.pdfUrl || book.pageImages?.length > 0) && (
//             <motion.div
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 50 }}
//               className="mt-8"
//             >
//               <div id="book-reader" className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
//                 {/* Reader Header */}
//                 <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <BookOpen className="h-5 w-5 text-white" />
//                     <span className="text-white font-medium">{book.title}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <span className="text-gray-400 text-sm">
//                       Page {currentPage} of {totalPages}
//                     </span>
//                     <button onClick={toggleFullscreen} className="p-1.5 rounded-lg hover:bg-gray-700 text-white">
//                       {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
//                     </button>
//                     <button onClick={() => setShowPreview(false)} className="p-1.5 rounded-lg hover:bg-gray-700 text-white">
//                       <Settings className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Page Flip/Swipe Navigation */}
//                 <div className="relative">
//                   {isLoadingPages ? (
//                     <div className="flex items-center justify-center h-[600px] bg-gray-900">
//                       <Loader2 className="h-12 w-12 animate-spin text-white" />
//                       <p className="text-white ml-3">Loading pages...</p>
//                     </div>
//                   ) : book.pageImages && book.pageImages.length > 0 ? (
//                     <>
//                       {/* Previous Page Button */}
//                       <button
//                         onClick={handlePrevPage}
//                         disabled={currentPage === 1}
//                         className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
//                       >
//                         <PrevIcon className="h-6 w-6" />
//                       </button>

//                       {/* Swiper for Page Navigation */}
//                       <Swiper
//                         onSwiper={(swiper) => { swiperRef.current = swiper }}
//                         initialSlide={currentPage - 1}
//                         onSlideChange={(swiper) => handlePageChange(swiper.activeIndex + 1)}
//                         modules={[Navigation, Pagination, Keyboard, Mousewheel]}
//                         navigation={false}
//                         pagination={{ clickable: true, dynamicBullets: true }}
//                         keyboard={{ enabled: true }}
//                         mousewheel={{ enabled: true }}
//                         spaceBetween={0}
//                         slidesPerView={1}
//                         className="book-swiper"
//                         style={{ height: '600px' }}
//                       >
//                         {book.pageImages.map((image, idx) => (
//                           <SwiperSlide key={idx}>
//                             <div className="flex items-center justify-center h-full bg-gray-900 p-8">
//                               <img 
//                                 src={image} 
//                                 alt={`Page ${idx + 1}`}
//                                 className="max-h-full max-w-full object-contain shadow-lg"
//                                 loading="lazy"
//                               />
//                             </div>
//                           </SwiperSlide>
//                         ))}
//                       </Swiper>

//                       {/* Next Page Button */}
//                       <button
//                         onClick={handleNextPage}
//                         disabled={currentPage === totalPages}
//                         className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
//                       >
//                         <NextIcon className="h-6 w-6" />
//                       </button>

//                       {/* Page Number Indicator */}
//                       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full">
//                         <span className="text-white text-sm">
//                           Page {currentPage} of {totalPages}
//                         </span>
//                       </div>
//                     </>
//                   ) : book.pdfUrl ? (
//                     <iframe
//                       src={`${book.pdfUrl}#page=${currentPage}&toolbar=0&navpanes=0&scrollbar=0`}
//                       title={book.title}
//                       className="w-full h-[600px]"
//                       frameBorder="0"
//                     />
//                   ) : (
//                     <div className="flex items-center justify-center h-[600px] bg-gray-900">
//                       <p className="text-gray-400">Reader preview not available. Download to read.</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Grouped Similar Books Section */}
//         <div className="mt-12 space-y-8">
//           {/* Books by Same Author - Horizontal Scroll */}
//           {groupedSimilarBooks.bySameAuthor.length > 0 && (
//             <div>
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-semibold text-gray-900 flex items-center gap-2">
//                   <PenTool className="h-5 w-5 text-primary-600" />
//                   More by {getAuthorName()}
//                 </h3>
//                 <Link to={`/author/${getAuthorSlug()}`} className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
//                   View All <ChevronRight className="h-4 w-4" />
//                 </Link>
//               </div>
//               <div className="overflow-x-auto scrollbar-hide pb-4">
//                 <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
//                   {groupedSimilarBooks.bySameAuthor.map((relatedBook) => (
//                     <Link
//                       key={relatedBook._id}
//                       to={`/book/${relatedBook.slug}`}
//                       className="w-48 flex-shrink-0 group"
//                     >
//                       <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all">
//                         <div className="aspect-[3/4] bg-gray-100">
//                           {relatedBook.coverImage ? (
//                             <img src={relatedBook.coverImage} alt={relatedBook.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
//                           ) : (
//                             <div className="w-full h-full flex items-center justify-center">
//                               <BookOpen className="h-8 w-8 text-gray-400" />
//                             </div>
//                           )}
//                         </div>
//                         <div className="p-3">
//                           <h4 className="font-medium text-gray-900 text-sm line-clamp-1">{relatedBook.title}</h4>
//                           <p className="text-xs text-gray-500 mt-1">{relatedBook.stats?.downloads?.toLocaleString() || 0} downloads</p>
//                         </div>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Recommended for You - Grid */}
//           {groupedSimilarBooks.recommended.length > 0 && (
//             <div>
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-semibold text-gray-900 flex items-center gap-2">
//                   <BookMarked className="h-5 w-5 text-primary-600" />
//                   Recommended for You
//                 </h3>
//               </div>
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//                 {groupedSimilarBooks.recommended.slice(0, 6).map((recBook) => (
//                   <Link key={recBook._id} to={`/book/${recBook.slug}`} className="group">
//                     <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all">
//                       <div className="aspect-[3/4] bg-gray-100">
//                         {recBook.coverImage ? (
//                           <img src={recBook.coverImage} alt={recBook.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
//                         ) : (
//                           <div className="w-full h-full flex items-center justify-center">
//                             <BookOpen className="h-8 w-8 text-gray-400" />
//                           </div>
//                         )}
//                       </div>
//                       <div className="p-2">
//                         <h4 className="font-medium text-gray-900 text-xs line-clamp-1">{recBook.title}</h4>
//                         <p className="text-xs text-gray-500 truncate">{typeof recBook.author === 'object' ? recBook.author?.name : recBook.author}</p>
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default BookDetailPage
















// // client/src/pages/public/BookDetailPage.jsx
// import React, { useState, useEffect, useRef, useCallback } from 'react'
// import { useParams, Link, useNavigate } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { useSelector } from 'react-redux'
// import toast from 'react-hot-toast'
// import {
//   Heart, Share2, Bookmark, Download, BookOpen, Star,
//   ChevronLeft, Clock, Eye, FileText, Calendar, Loader2,
//   AlertCircle, ChevronRight, User, Languages, File, PenTool,
//   ChevronRight as NextIcon, ChevronLeft as PrevIcon,
//   Maximize2, Minimize2, Settings, BookMarked, History,
//   ZoomIn, ZoomOut, RotateCw, Grid, List, X, File as FileIcon
// } from 'lucide-react'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Navigation, Pagination, Keyboard, Mousewheel, Zoom } from 'swiper/modules'
// import 'swiper/css'
// import 'swiper/css/navigation'
// import 'swiper/css/pagination'
// import 'swiper/css/zoom'
// import bookAPI from '../../api/bookAPI'
// import authorAPI from '../../api/authorAPI'

// const BookDetailPage = () => {
//   const { slug } = useParams()
//   const navigate = useNavigate()
//   const { t } = useTranslation()
//   const queryClient = useQueryClient()
//   const { user } = useSelector(state => state.auth)
//   const swiperRef = useRef(null)
//   const readerContainerRef = useRef(null)
  
//   const [showPreview, setShowPreview] = useState(false)
//   const [isLiked, setIsLiked] = useState(false)
//   const [isBookmarked, setIsBookmarked] = useState(false)
//   const [currentPage, setCurrentPage] = useState(1)
//   const [totalPages, setTotalPages] = useState(0)
//   const [isFullscreen, setIsFullscreen] = useState(false)
//   const [readingProgress, setReadingProgress] = useState(0)
//   const [pageImages, setPageImages] = useState([])
//   const [isLoadingPages, setIsLoadingPages] = useState(false)
//   const [viewMode, setViewMode] = useState('single')
//   const [zoomLevel, setZoomLevel] = useState(1)
//   const [isThumbnailView, setIsThumbnailView] = useState(false)
//   const [bookmarks, setBookmarks] = useState([])
//   const [showBookmarks, setShowBookmarks] = useState(false)

//   // Fetch book data using slug
//   const { data: bookData, isLoading, error } = useQuery({
//     queryKey: ['book', slug],
//     queryFn: () => bookAPI.getBook(slug),
//     enabled: !!slug,
//     retry: 1
//   })

//   const book = bookData?.data || bookData

//   // Fetch related books
//   const { data: relatedData } = useQuery({
//     queryKey: ['related-books', book?._id],
//     queryFn: () => bookAPI.getRelatedBooks(slug),
//     enabled: !!slug && !!book?._id
//   })

//   const relatedBooks = relatedData?.data || relatedData || []

//   // Fetch similar books by same author
//   const { data: authorBooksData } = useQuery({
//     queryKey: ['author-books', book?.author?._id],
//     queryFn: () => bookAPI.getBooksByAuthor(book?.author?._id),
//     enabled: !!book?.author?._id
//   })

//   const authorBooks = authorBooksData?.data || authorBooksData || []

//   // Load bookmarks from localStorage
//   useEffect(() => {
//     if (book?._id) {
//       const savedBookmarks = localStorage.getItem(`book_bookmarks_${book._id}`)
//       if (savedBookmarks) {
//         setBookmarks(JSON.parse(savedBookmarks))
//       }
//     }
//   }, [book?._id])

//   // Fetch reading progress from localStorage
//   useEffect(() => {
//     if (book?._id) {
//       const savedProgress = localStorage.getItem(`book_progress_${book._id}`)
//       if (savedProgress) {
//         const progress = JSON.parse(savedProgress)
//         setReadingProgress(progress.page || 0)
//         setCurrentPage(progress.page || 1)
//       }
//     }
//   }, [book?._id])

//   // Save reading progress
//   const saveReadingProgress = useCallback((page) => {
//     if (book?._id) {
//       const progress = {
//         bookId: book._id,
//         page: page,
//         timestamp: new Date().toISOString(),
//         percentage: (page / totalPages) * 100
//       }
//       localStorage.setItem(`book_progress_${book._id}`, JSON.stringify(progress))
//       setReadingProgress(page)
//     }
//   }, [book?._id, totalPages])

//   // Add bookmark
//   const addBookmark = () => {
//     const existingBookmark = bookmarks.find(b => b.page === currentPage)
//     if (existingBookmark) {
//       toast.error(`Bookmark already exists for page ${currentPage}`)
//       return
//     }
    
//     const newBookmark = {
//       page: currentPage,
//       timestamp: new Date().toISOString(),
//       note: ''
//     }
//     const updatedBookmarks = [...bookmarks, newBookmark]
//     setBookmarks(updatedBookmarks)
//     localStorage.setItem(`book_bookmarks_${book._id}`, JSON.stringify(updatedBookmarks))
//     toast.success(`Bookmark added at page ${currentPage}`)
//   }

//   // Remove bookmark
//   const removeBookmark = (pageToRemove) => {
//     const updatedBookmarks = bookmarks.filter(b => b.page !== pageToRemove)
//     setBookmarks(updatedBookmarks)
//     localStorage.setItem(`book_bookmarks_${book._id}`, JSON.stringify(updatedBookmarks))
//     toast.success(`Bookmark removed from page ${pageToRemove}`)
//   }

//   // Go to bookmark
//   const goToBookmark = (page) => {
//     setCurrentPage(page)
//     if (swiperRef.current) {
//       swiperRef.current.slideTo(page - 1)
//     }
//     setShowBookmarks(false)
//     toast.success(`Jumped to page ${page}`)
//   }

//   // Load page images
//   const loadPageImages = useCallback(async () => {
//     if (book?.pageImages && book.pageImages.length > 0) {
//       setPageImages(book.pageImages)
//       setTotalPages(book.totalPages || book.pageImages.length)
//     } else if (book?.pdfUrl) {
//       setIsLoadingPages(true)
//       try {
//         // For PDF, we could extract pages or just show PDF viewer
//         // For now, we'll show PDF iframe
//         setPageImages([])
//         setTotalPages(book.totalPages || 0)
//       } catch (error) {
//         console.error('Error loading pages:', error)
//         toast.error('Failed to load book pages')
//       } finally {
//         setIsLoadingPages(false)
//       }
//     } else {
//       setPageImages([])
//       setTotalPages(0)
//     }
//   }, [book])

//   // Handle page change
//   const handlePageChange = (page) => {
//     setCurrentPage(page)
//     saveReadingProgress(page)
//   }

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       handlePageChange(currentPage + 1)
//       if (swiperRef.current) {
//         swiperRef.current.slideTo(currentPage)
//       }
//     }
//   }

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       handlePageChange(currentPage - 1)
//       if (swiperRef.current) {
//         swiperRef.current.slideTo(currentPage - 2)
//       }
//     }
//   }

//   // Zoom controls
//   const handleZoomIn = () => {
//     setZoomLevel(prev => Math.min(prev + 0.25, 3))
//   }

//   const handleZoomOut = () => {
//     setZoomLevel(prev => Math.max(prev - 0.25, 0.5))
//   }

//   const handleResetZoom = () => {
//     setZoomLevel(1)
//   }

//   // Toggle fullscreen
//   const toggleFullscreen = () => {
//     const readerElement = readerContainerRef.current
//     if (!isFullscreen) {
//       if (readerElement?.requestFullscreen) {
//         readerElement.requestFullscreen()
//       }
//     } else {
//       if (document.exitFullscreen) {
//         document.exitFullscreen()
//       }
//     }
//     setIsFullscreen(!isFullscreen)
//   }

//   // Download mutation
//   const downloadMutation = useMutation({
//     mutationFn: () => bookAPI.downloadBook(slug),
//     onSuccess: (response) => {
//       const downloadUrl = response.data?.downloadUrl || response?.downloadUrl
//       if (downloadUrl) {
//         window.open(downloadUrl, '_blank')
//         toast.success('Download started!')
//       }
//     },
//     onError: () => toast.error('Failed to download book')
//   })

//   // Helper functions
//   const formatDate = (dateString) => {
//     if (!dateString) return 'Unknown'
//     try {
//       return new Date(dateString).getFullYear()
//     } catch {
//       return 'Unknown'
//     }
//   }

//   const getAuthorName = () => {
//     if (!book?.author) return 'Unknown Author'
//     if (typeof book.author === 'object') return book.author.name || 'Unknown Author'
//     return book.author || 'Unknown Author'
//   }

//   const getAuthorSlug = () => {
//     if (!book?.author) return '#'
//     if (typeof book.author === 'object') return book.author.slug || '#'
//     return '#'
//   }

//   const getCategoryName = () => {
//     if (!book?.category) return 'Uncategorized'
//     if (typeof book.category === 'object') return book.category.name || 'Uncategorized'
//     return book.category || 'Uncategorized'
//   }

//   // Handle download
//   const handleDownload = () => {
//     if (!user) {
//       toast.error('Please login to download books')
//       navigate('/login')
//       return
//     }
    
//     if (book.isPremium && user?.subscription?.plan === 'free') {
//       toast.error('Premium subscription required to download this book')
//       return
//     }
    
//     downloadMutation.mutate()
//   }

//   // Handle share
//   const handleShare = async () => {
//     const url = window.location.href
//     try {
//       await navigator.clipboard.writeText(url)
//       toast.success('Link copied to clipboard!')
//     } catch (err) {
//       toast.error('Failed to copy link')
//     }
//   }

//   // Group similar books
//   const groupedSimilarBooks = {
//     bySameAuthor: authorBooks.filter(b => b._id !== book?._id).slice(0, 4),
//     recommended: [...relatedBooks, ...authorBooks].filter((v, i, a) => 
//       a.findIndex(t => t._id === v._id) === i && v._id !== book?._id
//     ).slice(0, 6)
//   }

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
//           <p className="text-gray-500">Loading book details...</p>
//         </div>
//       </div>
//     )
//   }

//   // Error state
//   if (error || !book) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Book Not Found</h1>
//           <p className="text-gray-500 mb-6">The book you are looking for does not exist or has been removed.</p>
//           <Link to="/books" className="btn-primary inline-flex items-center space-x-2">
//             <ChevronLeft className="h-4 w-4" />
//             <span>Browse All Books</span>
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   const stats = [
//     { icon: FileText, label: 'Pages', value: book.totalPages || 'N/A' },
//     { icon: Calendar, label: 'Year', value: formatDate(book.publishYear || book.createdAt) },
//     { icon: Download, label: 'Downloads', value: (book.stats?.downloads || 0).toLocaleString() },
//     { icon: BookOpen, label: 'Format', value: book.type?.toUpperCase() || 'PDF' },
//   ]

//   const hasReadableContent = (book.pdfUrl || book.pageImages?.length > 0)

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Breadcrumb */}
//         <div className="mb-6">
//           <Link to="/books" className="inline-flex items-center space-x-1 text-sm text-gray-500 hover:text-primary-600 transition-colors">
//             <ChevronLeft className="h-4 w-4" />
//             <span>Back to Books</span>
//           </Link>
//         </div>

//         {/* Book Info Section */}
//         <div className="grid lg:grid-cols-3 gap-8 mb-8">
//           {/* Book Cover */}
//           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
//             <div className="card overflow-hidden rounded-xl shadow-lg">
//               {book.coverImage ? (
//                 <img src={book.coverImage} alt={book.title} className="w-full aspect-[3/4] object-cover" />
//               ) : (
//                 <div className="w-full aspect-[3/4] bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
//                   <BookOpen className="h-20 w-20 text-primary-400" />
//                 </div>
//               )}
//             </div>
            
//             {/* Action Buttons */}
//             <div className="flex space-x-2 mt-4">
//               <button
//                 onClick={() => setIsLiked(!isLiked)}
//                 className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg transition-colors ${
//                   isLiked ? 'bg-red-50 text-red-600' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
//                 }`}
//               >
//                 <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
//                 <span className="text-sm font-medium">Like</span>
//               </button>
//               <button
//                 onClick={() => setIsBookmarked(!isBookmarked)}
//                 className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg transition-colors ${
//                   isBookmarked ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
//                 }`}
//               >
//                 <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-primary-500' : ''}`} />
//                 <span className="text-sm font-medium">Save</span>
//               </button>
//             </div>
//           </motion.div>

//           {/* Book Info */}
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
//             {/* Badges */}
//             <div className="flex flex-wrap items-center gap-2 mb-3">
//               <span className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full capitalize">
//                 {getCategoryName()}
//               </span>
//               <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full uppercase">
//                 {book.type || 'Ebook'}
//               </span>
//               <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
//                 {book.language === 'urdu' ? 'Urdu' : book.language === 'hindi' ? 'Hindi' : book.language || 'English'}
//               </span>
//               {book.isFree && <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Free</span>}
//               {book.isPremium && <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">Premium</span>}
//               {book.isFeatured && <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">Featured</span>}
//             </div>

//             <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
//             {book.subtitle && <p className="text-lg text-gray-600 mb-3">{book.subtitle}</p>}

//             <div className="flex items-center flex-wrap gap-4 mb-6">
//               <Link to={`/author/${getAuthorSlug()}`} className="inline-flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-medium">
//                 <User className="h-4 w-4" />
//                 <span>{getAuthorName()}</span>
//               </Link>
              
//               {book.stats?.averageRating > 0 && (
//                 <>
//                   <span className="text-gray-300">|</span>
//                   <div className="flex items-center space-x-1">
//                     <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
//                     <span className="font-medium">{book.stats.averageRating.toFixed(1)}</span>
//                     <span className="text-gray-500">({book.stats.ratings || 0} reviews)</span>
//                   </div>
//                 </>
//               )}
//             </div>

//             <p className="text-gray-700 leading-relaxed mb-6">{book.description || 'No description available for this book.'}</p>

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//               {stats.map((stat, index) => (
//                 <div key={index} className="bg-white rounded-lg p-3 text-center border border-gray-100">
//                   <stat.icon className="h-5 w-5 text-primary-600 mx-auto mb-1" />
//                   <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
//                   <p className="text-xs text-gray-500">{stat.label}</p>
//                 </div>
//               ))}
//             </div>

//             {/* Reading Progress */}
//             {readingProgress > 0 && totalPages > 0 && (
//               <div className="mb-4 p-3 bg-blue-50 rounded-lg">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-sm text-blue-700 flex items-center gap-2">
//                     <History className="h-4 w-4" />
//                     Continue Reading
//                   </span>
//                   <span className="text-sm text-blue-700">Page {readingProgress} of {totalPages}</span>
//                 </div>
//                 <div className="w-full bg-blue-200 rounded-full h-2">
//                   <div 
//                     className="bg-blue-600 h-2 rounded-full transition-all duration-300"
//                     style={{ width: `${(readingProgress / totalPages) * 100}%` }}
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Action Buttons */}
//             <div className="flex flex-wrap gap-3">
//               {hasReadableContent && (
//                 <button
//                   onClick={() => {
//                     setShowPreview(!showPreview)
//                     if (!showPreview) {
//                       loadPageImages()
//                     }
//                   }}
//                   className="btn-primary inline-flex items-center space-x-2"
//                 >
//                   <BookOpen className="h-5 w-5" />
//                   <span>{showPreview ? 'Close Reader' : 'Read Book'}</span>
//                 </button>
//               )}
              
//               <button
//                 onClick={handleDownload}
//                 disabled={downloadMutation.isPending || (book.isPremium && user?.subscription?.plan === 'free')}
//                 className="btn-outline inline-flex items-center space-x-2"
//               >
//                 {downloadMutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
//                 <span>Download {book.type?.toUpperCase()}</span>
//               </button>
              
//               <button onClick={handleShare} className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//                 <Share2 className="h-5 w-5 text-gray-600" />
//               </button>
//             </div>

//             {book.publisher && (
//               <div className="mt-6 pt-6 border-t border-gray-200">
//                 <p className="text-sm text-gray-500">
//                   Published by <span className="font-medium text-gray-700">{book.publisher}</span>
//                   {book.publishYear && ` in ${book.publishYear}`}
//                   {book.isbn && ` • ISBN: ${book.isbn}`}
//                 </p>
//               </div>
//             )}
//           </motion.div>
//         </div>

//         {/* Enhanced Flipbook Reader Section */}
//         <AnimatePresence>
//           {showPreview && hasReadableContent && (
//             <motion.div
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 50 }}
//               className="mt-8"
//             >
//               <div 
//                 ref={readerContainerRef}
//                 id="book-reader" 
//                 className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl"
//               >
//                 {/* Reader Header */}
//                 <div className="bg-gray-800 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
//                   <div className="flex items-center gap-2">
//                     <BookOpen className="h-5 w-5 text-white" />
//                     <span className="text-white font-medium truncate max-w-[200px]">{book.title}</span>
//                   </div>
                  
//                   <div className="flex items-center gap-1">
//                     {/* View Mode Toggle */}
//                     <button
//                       onClick={() => setViewMode('single')}
//                       className={`p-1.5 rounded ${viewMode === 'single' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
//                       title="Single Page View"
//                     >
//                       <FileIcon className="h-4 w-4" />
//                     </button>
                    
//                     {/* Zoom Controls */}
//                     <button onClick={handleZoomOut} className="p-1.5 rounded hover:bg-gray-700 text-white" title="Zoom Out">
//                       <ZoomOut className="h-4 w-4" />
//                     </button>
//                     <span className="text-white text-sm px-2">{Math.round(zoomLevel * 100)}%</span>
//                     <button onClick={handleZoomIn} className="p-1.5 rounded hover:bg-gray-700 text-white" title="Zoom In">
//                       <ZoomIn className="h-4 w-4" />
//                     </button>
//                     <button onClick={handleResetZoom} className="p-1.5 rounded hover:bg-gray-700 text-white" title="Reset Zoom">
//                       <RotateCw className="h-4 w-4" />
//                     </button>
                    
//                     {/* Bookmark Controls */}
//                     <button
//                       onClick={addBookmark}
//                       className="p-1.5 rounded hover:bg-gray-700 text-yellow-400"
//                       title="Add Bookmark"
//                     >
//                       <Bookmark className="h-4 w-4" />
//                     </button>
//                     <button
//                       onClick={() => setShowBookmarks(!showBookmarks)}
//                       className={`p-1.5 rounded hover:bg-gray-700 text-white ${showBookmarks ? 'bg-gray-700' : ''}`}
//                       title="View Bookmarks"
//                     >
//                       <BookMarked className="h-4 w-4" />
//                     </button>
                    
//                     {/* Thumbnail View */}
//                     <button
//                       onClick={() => setIsThumbnailView(!isThumbnailView)}
//                       className={`p-1.5 rounded hover:bg-gray-700 text-white ${isThumbnailView ? 'bg-gray-700' : ''}`}
//                       title="Thumbnail View"
//                     >
//                       <Grid className="h-4 w-4" />
//                     </button>
                    
//                     {/* Fullscreen Toggle */}
//                     <button onClick={toggleFullscreen} className="p-1.5 rounded hover:bg-gray-700 text-white" title="Fullscreen">
//                       {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
//                     </button>
                    
//                     {/* Close Reader */}
//                     <button onClick={() => setShowPreview(false)} className="p-1.5 rounded hover:bg-gray-700 text-white ml-2" title="Close">
//                       <X className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Bookmarks Sidebar */}
//                 <AnimatePresence>
//                   {showBookmarks && bookmarks.length > 0 && (
//                     <motion.div
//                       initial={{ x: -300 }}
//                       animate={{ x: 0 }}
//                       exit={{ x: -300 }}
//                       className="absolute left-0 top-12 bottom-0 w-64 bg-gray-800 z-20 shadow-xl overflow-y-auto"
//                     >
//                       <div className="p-4">
//                         <h3 className="text-white font-medium mb-3">Bookmarks</h3>
//                         {bookmarks.map((bookmark, idx) => (
//                           <div key={idx} className="mb-2 p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
//                             <button
//                               onClick={() => goToBookmark(bookmark.page)}
//                               className="w-full text-left"
//                             >
//                               <p className="text-white text-sm">Page {bookmark.page}</p>
//                               <p className="text-gray-400 text-xs">
//                                 {new Date(bookmark.timestamp).toLocaleDateString()}
//                               </p>
//                             </button>
//                             <button
//                               onClick={() => removeBookmark(bookmark.page)}
//                               className="text-red-400 text-xs mt-1 hover:text-red-300"
//                             >
//                               Remove
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 {/* Main Reader Content */}
//                 <div className="relative min-h-[600px]">
//                   {isLoadingPages ? (
//                     <div className="flex items-center justify-center h-[600px] bg-gray-900">
//                       <Loader2 className="h-12 w-12 animate-spin text-white" />
//                       <p className="text-white ml-3">Loading pages...</p>
//                     </div>
//                   ) : pageImages.length > 0 ? (
//                     <>
//                       {/* Previous Page Button */}
//                       <button
//                         onClick={handlePrevPage}
//                         disabled={currentPage === 1}
//                         className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
//                       >
//                         <PrevIcon className="h-6 w-6" />
//                       </button>

//                       {/* Thumbnail Strip */}
//                       {isThumbnailView && (
//                         <div className="absolute top-0 left-0 right-0 bg-black/80 p-2 z-10 overflow-x-auto whitespace-nowrap">
//                           {pageImages.map((_, idx) => (
//                             <button
//                               key={idx}
//                               onClick={() => {
//                                 setCurrentPage(idx + 1)
//                                 if (swiperRef.current) {
//                                   swiperRef.current.slideTo(idx)
//                                 }
//                               }}
//                               className={`inline-block mx-1 p-1 rounded ${currentPage === idx + 1 ? 'bg-primary-600' : 'bg-gray-700'}`}
//                             >
//                               <div className="w-16 h-24 bg-gray-600 rounded overflow-hidden">
//                                 <img src={pageImages[idx]} alt={`Page ${idx + 1}`} className="w-full h-full object-cover" />
//                               </div>
//                               <span className="text-white text-xs block text-center mt-1">{idx + 1}</span>
//                             </button>
//                           ))}
//                         </div>
//                       )}

//                       {/* Main Swiper */}
//                       <Swiper
//                         onSwiper={(swiper) => { swiperRef.current = swiper }}
//                         initialSlide={currentPage - 1}
//                         onSlideChange={(swiper) => handlePageChange(swiper.activeIndex + 1)}
//                         modules={[Navigation, Pagination, Keyboard, Mousewheel, Zoom]}
//                         navigation={false}
//                         pagination={{ clickable: true, dynamicBullets: true }}
//                         keyboard={{ enabled: true }}
//                         mousewheel={{ enabled: true }}
//                         spaceBetween={0}
//                         slidesPerView={viewMode === 'double' ? 2 : 1}
//                         centeredSlides={false}
//                         className="book-swiper"
//                         style={{ height: isThumbnailView ? '540px' : '600px' }}
//                       >
//                         {pageImages.map((image, idx) => (
//                           <SwiperSlide key={idx}>
//                             <div className="swiper-zoom-container">
//                               <div 
//                                 className="flex items-center justify-center h-full bg-gray-900 p-8"
//                                 style={{ transform: `scale(${zoomLevel})` }}
//                               >
//                                 <img 
//                                   src={image} 
//                                   alt={`Page ${idx + 1}`}
//                                   className="max-h-full max-w-full object-contain shadow-lg transition-transform duration-300"
//                                   loading="lazy"
//                                 />
//                               </div>
//                             </div>
//                             <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full">
//                               <span className="text-white text-xs">Page {idx + 1} of {totalPages}</span>
//                             </div>
//                           </SwiperSlide>
//                         ))}
//                       </Swiper>

//                       {/* Next Page Button */}
//                       <button
//                         onClick={handleNextPage}
//                         disabled={currentPage === totalPages}
//                         className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
//                       >
//                         <NextIcon className="h-6 w-6" />
//                       </button>
//                     </>
//                   ) : book.pdfUrl ? (
//                     <iframe
//                       src={`${book.pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
//                       title={book.title}
//                       className="w-full h-[600px]"
//                       frameBorder="0"
//                     />
//                   ) : (
//                     <div className="flex items-center justify-center h-[600px] bg-gray-900 flex-col">
//                       <FileIcon className="h-16 w-16 text-gray-600 mb-4" />
//                       <p className="text-gray-400">No preview available. Download to read.</p>
//                       <button
//                         onClick={handleDownload}
//                         className="mt-4 btn-primary"
//                       >
//                         Download Book
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {/* Page Navigation Footer */}
//                 {pageImages.length > 0 && (
//                   <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
//                     <div className="text-gray-400 text-sm">
//                       {bookmarks.length > 0 && `${bookmarks.length} bookmarks`}
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={handlePrevPage}
//                         disabled={currentPage === 1}
//                         className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
//                       >
//                         Previous
//                       </button>
//                       <span className="text-white text-sm">
//                         Page {currentPage} of {totalPages}
//                       </span>
//                       <button
//                         onClick={handleNextPage}
//                         disabled={currentPage === totalPages}
//                         className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
//                       >
//                         Next
//                       </button>
//                     </div>
//                     <div className="w-24"></div>
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Related Books Sections */}
//         <div className="mt-12 space-y-8">
//           {groupedSimilarBooks.bySameAuthor.length > 0 && (
//             <div>
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-semibold text-gray-900 flex items-center gap-2">
//                   <PenTool className="h-5 w-5 text-primary-600" />
//                   More by {getAuthorName()}
//                 </h3>
//                 <Link to={`/author/${getAuthorSlug()}`} className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
//                   View All <ChevronRight className="h-4 w-4" />
//                 </Link>
//               </div>
//               <div className="overflow-x-auto scrollbar-hide pb-4">
//                 <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
//                   {groupedSimilarBooks.bySameAuthor.map((relatedBook) => (
//                     <Link
//                       key={relatedBook._id}
//                       to={`/book/${relatedBook.slug}`}
//                       className="w-48 flex-shrink-0 group"
//                     >
//                       <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all">
//                         <div className="aspect-[3/4] bg-gray-100">
//                           {relatedBook.coverImage ? (
//                             <img src={relatedBook.coverImage} alt={relatedBook.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
//                           ) : (
//                             <div className="w-full h-full flex items-center justify-center">
//                               <BookOpen className="h-8 w-8 text-gray-400" />
//                             </div>
//                           )}
//                         </div>
//                         <div className="p-3">
//                           <h4 className="font-medium text-gray-900 text-sm line-clamp-1">{relatedBook.title}</h4>
//                           <p className="text-xs text-gray-500 mt-1">{relatedBook.stats?.downloads?.toLocaleString() || 0} downloads</p>
//                         </div>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {groupedSimilarBooks.recommended.length > 0 && (
//             <div>
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-semibold text-gray-900 flex items-center gap-2">
//                   <BookMarked className="h-5 w-5 text-primary-600" />
//                   Recommended for You
//                 </h3>
//               </div>
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//                 {groupedSimilarBooks.recommended.map((recBook) => (
//                   <Link key={recBook._id} to={`/book/${recBook.slug}`} className="group">
//                     <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all">
//                       <div className="aspect-[3/4] bg-gray-100">
//                         {recBook.coverImage ? (
//                           <img src={recBook.coverImage} alt={recBook.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
//                         ) : (
//                           <div className="w-full h-full flex items-center justify-center">
//                             <BookOpen className="h-8 w-8 text-gray-400" />
//                           </div>
//                         )}
//                       </div>
//                       <div className="p-2">
//                         <h4 className="font-medium text-gray-900 text-xs line-clamp-1">{recBook.title}</h4>
//                         <p className="text-xs text-gray-500 truncate">{typeof recBook.author === 'object' ? recBook.author?.name : recBook.author}</p>
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default BookDetailPage




















// client/src/pages/public/BookDetailPage.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import {
  Heart, Share2, Bookmark, Download, BookOpen, Star,
  ChevronLeft, Clock, Eye, FileText, Calendar, Loader2,
  AlertCircle, ChevronRight, User, Languages, File, PenTool,
  ChevronRight as NextIcon, ChevronLeft as PrevIcon,
  Maximize2, Minimize2, Settings, BookMarked, History,
  ZoomIn, ZoomOut, RotateCw, Grid, List, X, File as FileIcon,
  ThumbsUp, MessageCircle, Send
} from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Keyboard, Mousewheel, Zoom } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/zoom'
import bookAPI from '../../api/bookAPI'
import authorAPI from '../../api/authorAPI'

const BookDetailPage = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { user } = useSelector(state => state.auth)
  const swiperRef = useRef(null)
  const readerContainerRef = useRef(null)
  
  // State variables
  const [showPreview, setShowPreview] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const [pageImages, setPageImages] = useState([])
  const [isLoadingPages, setIsLoadingPages] = useState(false)
  const [viewMode, setViewMode] = useState('single')
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isThumbnailView, setIsThumbnailView] = useState(false)
  const [bookmarks, setBookmarks] = useState([])
  const [showBookmarks, setShowBookmarks] = useState(false)
  
  // Rating modal state
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [ratingValue, setRatingValue] = useState(0)
  const [ratingReview, setRatingReview] = useState('')
  const [hoverRating, setHoverRating] = useState(0)
  const [isSubmittingRating, setIsSubmittingRating] = useState(false)
  
  // Comment state
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState([])
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)

  // Fetch book data using slug
  const { data: bookData, isLoading, error, refetch } = useQuery({
    queryKey: ['book', slug],
    queryFn: () => bookAPI.getBook(slug),
    enabled: !!slug,
    retry: 1
  })

  const book = bookData?.data || bookData

  // Fetch related books
  const { data: relatedData } = useQuery({
    queryKey: ['related-books', book?._id],
    queryFn: () => bookAPI.getRelatedBooks(slug),
    enabled: !!slug && !!book?._id
  })

  const relatedBooks = relatedData?.data || relatedData || []

  // Fetch books by same author
  const { data: authorBooksData } = useQuery({
    queryKey: ['author-books', book?.author?._id],
    queryFn: () => bookAPI.getBooksByAuthor(book?.author?._id, { limit: 6 }),
    enabled: !!book?.author?._id
  })

  const authorBooks = authorBooksData?.data || authorBooksData || []

  // Load bookmarks from localStorage
  useEffect(() => {
    if (book?._id) {
      const savedBookmarks = localStorage.getItem(`book_bookmarks_${book._id}`)
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks))
      }
    }
  }, [book?._id])

  // Fetch reading progress from localStorage
  useEffect(() => {
    if (book?._id) {
      const savedProgress = localStorage.getItem(`book_progress_${book._id}`)
      if (savedProgress) {
        const progress = JSON.parse(savedProgress)
        setReadingProgress(progress.page || 0)
        setCurrentPage(progress.page || 1)
      }
    }
  }, [book?._id])

  // Save reading progress
  const saveReadingProgress = useCallback((page) => {
    if (book?._id) {
      const progress = {
        bookId: book._id,
        page: page,
        timestamp: new Date().toISOString(),
        percentage: (page / totalPages) * 100
      }
      localStorage.setItem(`book_progress_${book._id}`, JSON.stringify(progress))
      setReadingProgress(page)
    }
  }, [book?._id, totalPages])

  // Add bookmark
  const addBookmark = () => {
    if (!user) {
      toast.error('Please login to add bookmarks')
      navigate('/login')
      return
    }
    
    const existingBookmark = bookmarks.find(b => b.page === currentPage)
    if (existingBookmark) {
      toast.error(`Bookmark already exists for page ${currentPage}`)
      return
    }
    
    const newBookmark = {
      page: currentPage,
      timestamp: new Date().toISOString(),
      note: ''
    }
    const updatedBookmarks = [...bookmarks, newBookmark]
    setBookmarks(updatedBookmarks)
    localStorage.setItem(`book_bookmarks_${book._id}`, JSON.stringify(updatedBookmarks))
    toast.success(`Bookmark added at page ${currentPage}`)
  }

  // Remove bookmark
  const removeBookmark = (pageToRemove) => {
    const updatedBookmarks = bookmarks.filter(b => b.page !== pageToRemove)
    setBookmarks(updatedBookmarks)
    localStorage.setItem(`book_bookmarks_${book._id}`, JSON.stringify(updatedBookmarks))
    toast.success(`Bookmark removed from page ${pageToRemove}`)
  }

  // Go to bookmark
  const goToBookmark = (page) => {
    setCurrentPage(page)
    if (swiperRef.current) {
      swiperRef.current.slideTo(page - 1)
    }
    setShowBookmarks(false)
    toast.success(`Jumped to page ${page}`)
  }

  // Load page images
  const loadPageImages = useCallback(async () => {
    if (book?.pageImages && book.pageImages.length > 0) {
      setPageImages(book.pageImages)
      setTotalPages(book.totalPages || book.pageImages.length)
    } else if (book?.pdfUrl) {
      setIsLoadingPages(true)
      try {
        const response = await bookAPI.getBookPages(slug)
        const pages = response?.data?.pages || response?.pages || []
        setPageImages(pages)
        setTotalPages(response?.data?.totalPages || response?.totalPages || pages.length)
      } catch (error) {
        console.error('Error loading pages:', error)
        // Don't show error, just use PDF viewer
        setPageImages([])
        setTotalPages(book.totalPages || 0)
      } finally {
        setIsLoadingPages(false)
      }
    } else {
      setPageImages([])
      setTotalPages(0)
    }
  }, [book, slug])

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
    saveReadingProgress(page)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1)
      if (swiperRef.current) {
        swiperRef.current.slideTo(currentPage)
      }
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1)
      if (swiperRef.current) {
        swiperRef.current.slideTo(currentPage - 2)
      }
    }
  }

  // Zoom controls
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5))
  }

  const handleResetZoom = () => {
    setZoomLevel(1)
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    const readerElement = readerContainerRef.current
    if (!isFullscreen) {
      if (readerElement?.requestFullscreen) {
        readerElement.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setIsFullscreen(!isFullscreen)
  }

  // Download mutation
  const downloadMutation = useMutation({
    mutationFn: () => bookAPI.downloadBook(slug),
    onSuccess: (response) => {
      const downloadUrl = response.data?.downloadUrl || response?.downloadUrl
      if (downloadUrl) {
        window.open(downloadUrl, '_blank')
        toast.success('Download started!')
      } else {
        toast.error('No download URL available')
      }
    },
    onError: () => toast.error('Failed to download book')
  })

  // Rate book mutation
  const rateBookMutation = useMutation({
    mutationFn: ({ rating, review }) => bookAPI.rateBook(book?._id, rating, review),
    onSuccess: () => {
      queryClient.invalidateQueries(['book', slug])
      toast.success('Thank you for your rating!')
      setShowRatingModal(false)
      setRatingValue(0)
      setRatingReview('')
    },
    onError: () => toast.error('Failed to submit rating')
  })

  // Like book mutation
  const likeMutation = useMutation({
    mutationFn: () => bookAPI.likeBook(book?._id),
    onSuccess: () => {
      setIsLiked(!isLiked)
      queryClient.invalidateQueries(['book', slug])
      toast.success(isLiked ? 'Removed from likes' : 'Added to likes')
    },
    onError: () => toast.error('Failed to update like status')
  })

  // Bookmark mutation
  const bookmarkMutation = useMutation({
    mutationFn: () => bookAPI.bookmarkBook(book?._id),
    onSuccess: () => {
      setIsBookmarked(!isBookmarked)
      queryClient.invalidateQueries(['book', slug])
      toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks')
    },
    onError: () => toast.error('Failed to update bookmark status')
  })

  // Submit rating
  const handleSubmitRating = () => {
    if (ratingValue === 0) {
      toast.error('Please select a rating')
      return
    }
    
    if (!user) {
      toast.error('Please login to rate this book')
      navigate('/login')
      return
    }
    
    setIsSubmittingRating(true)
    rateBookMutation.mutate({ rating: ratingValue, review: ratingReview })
    setIsSubmittingRating(false)
  }

  // Handle like
  const handleLike = () => {
    if (!user) {
      toast.error('Please login to like books')
      navigate('/login')
      return
    }
    likeMutation.mutate()
  }

  // Handle bookmark
  const handleBookmarkToggle = () => {
    if (!user) {
      toast.error('Please login to bookmark books')
      navigate('/login')
      return
    }
    bookmarkMutation.mutate()
  }

  // Handle share
  const handleShare = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      toast.success('Link copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy link')
    }
  }

  // Handle download
  const handleDownload = () => {
    if (!user) {
      toast.error('Please login to download books')
      navigate('/login')
      return
    }
    
    if (book.isPremium && user?.subscription?.plan === 'free') {
      toast.error('Premium subscription required to download this book')
      return
    }
    
    downloadMutation.mutate()
  }

  // Helper functions
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown'
    try {
      return new Date(dateString).getFullYear()
    } catch {
      return 'Unknown'
    }
  }

  const getAuthorName = () => {
    if (!book?.author) return 'Unknown Author'
    if (typeof book.author === 'object') return book.author.name || 'Unknown Author'
    return book.author || 'Unknown Author'
  }

  const getAuthorSlug = () => {
    if (!book?.author) return '#'
    if (typeof book.author === 'object') return book.author.slug || '#'
    return '#'
  }

  const getCategoryName = () => {
    if (!book?.category) return 'Uncategorized'
    if (typeof book.category === 'object') return book.category.name || 'Uncategorized'
    return book.category || 'Uncategorized'
  }

  // Group similar books
  const groupedSimilarBooks = {
    bySameAuthor: authorBooks.filter(b => b._id !== book?._id).slice(0, 4),
    recommended: [...relatedBooks, ...authorBooks].filter((v, i, a) => 
      a.findIndex(t => t._id === v._id) === i && v._id !== book?._id
    ).slice(0, 6)
  }

  const hasReadableContent = !!(book?.pdfUrl || (book?.pageImages && book.pageImages.length > 0))
  const isAlreadyRated = book?.userRating !== undefined

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-500">Loading book details...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !book) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Book Not Found</h1>
          <p className="text-gray-500 mb-6">The book you are looking for does not exist or has been removed.</p>
          <Link to="/books" className="btn-primary inline-flex items-center space-x-2">
            <ChevronLeft className="h-4 w-4" />
            <span>Browse All Books</span>
          </Link>
        </div>
      </div>
    )
  }

  const stats = [
    { icon: FileText, label: 'Pages', value: book.totalPages || 'N/A' },
    { icon: Calendar, label: 'Year', value: formatDate(book.publishYear || book.createdAt) },
    { icon: Download, label: 'Downloads', value: (book.stats?.downloads || 0).toLocaleString() },
    { icon: BookOpen, label: 'Format', value: book.type?.toUpperCase() || 'PDF' },
  ]

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/books" className="inline-flex items-center space-x-1 text-sm text-gray-500 hover:text-primary-600 transition-colors">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Books</span>
          </Link>
        </div>

        {/* Book Info Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Book Cover */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="card overflow-hidden rounded-xl shadow-lg">
              {book.coverImage ? (
                <img src={book.coverImage} alt={book.title} className="w-full aspect-[3/4] object-cover" />
              ) : (
                <div className="w-full aspect-[3/4] bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <BookOpen className="h-20 w-20 text-primary-400" />
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-2 mt-4">
              <button
                onClick={handleLike}
                disabled={likeMutation.isPending}
                className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg transition-colors ${
                  isLiked ? 'bg-red-50 text-red-600' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
                <span className="text-sm font-medium">{likeMutation.isPending ? '...' : 'Like'}</span>
              </button>
              <button
                onClick={handleBookmarkToggle}
                disabled={bookmarkMutation.isPending}
                className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg transition-colors ${
                  isBookmarked ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-primary-500' : ''}`} />
                <span className="text-sm font-medium">{bookmarkMutation.isPending ? '...' : 'Save'}</span>
              </button>
            </div>
          </motion.div>

          {/* Book Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full capitalize">
                {getCategoryName()}
              </span>
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full uppercase">
                {book.type || 'Ebook'}
              </span>
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                {book.language === 'urdu' ? 'Urdu' : book.language === 'hindi' ? 'Hindi' : book.language || 'English'}
              </span>
              {book.isFree && <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Free</span>}
              {book.isPremium && <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">Premium</span>}
              {book.isFeatured && <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">Featured</span>}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
            {book.subtitle && <p className="text-lg text-gray-600 mb-3">{book.subtitle}</p>}

            <div className="flex items-center flex-wrap gap-4 mb-6">
              <Link to={`/author/${getAuthorSlug()}`} className="inline-flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-medium">
                <User className="h-4 w-4" />
                <span>{getAuthorName()}</span>
              </Link>
              
              {book.stats?.averageRating > 0 && (
                <>
                  <span className="text-gray-300">|</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium">{book.stats.averageRating.toFixed(1)}</span>
                    <span className="text-gray-500">({book.stats.ratings || 0} reviews)</span>
                  </div>
                </>
              )}
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">{book.description || 'No description available for this book.'}</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg p-3 text-center border border-gray-100">
                  <stat.icon className="h-5 w-5 text-primary-600 mx-auto mb-1" />
                  <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Rating Stars */}
            <div className="mb-4 flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRatingValue(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none transition-transform hover:scale-110"
                    disabled={isAlreadyRated}
                  >
                    <Star 
                      className={`h-5 w-5 ${
                        star <= (hoverRating || ratingValue) 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {!isAlreadyRated && ratingValue > 0 && (
                <button
                  onClick={handleSubmitRating}
                  disabled={isSubmittingRating}
                  className="text-sm bg-primary-600 text-white px-3 py-1 rounded-lg hover:bg-primary-700"
                >
                  {isSubmittingRating ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Submit Rating'}
                </button>
              )}
              {isAlreadyRated && (
                <span className="text-sm text-green-600">✓ You rated this book</span>
              )}
            </div>

            {/* Reading Progress */}
            {readingProgress > 0 && totalPages > 0 && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-700 flex items-center gap-2">
                    <History className="h-4 w-4" />
                    Continue Reading
                  </span>
                  <span className="text-sm text-blue-700">Page {readingProgress} of {totalPages}</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(readingProgress / totalPages) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {hasReadableContent && (
                <button
                  onClick={() => {
                    setShowPreview(!showPreview)
                    if (!showPreview) {
                      loadPageImages()
                    }
                  }}
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <BookOpen className="h-5 w-5" />
                  <span>{showPreview ? 'Close Reader' : 'Read Book'}</span>
                </button>
              )}
              
              <button
                onClick={handleDownload}
                disabled={downloadMutation.isPending || (book.isPremium && user?.subscription?.plan === 'free')}
                className="btn-outline inline-flex items-center space-x-2"
              >
                {downloadMutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
                <span>Download {book.type?.toUpperCase()}</span>
              </button>
              
              <button onClick={handleShare} className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Premium Info */}
            {book.isPremium && (
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  🔒 Premium Book - Requires subscription to download
                </p>
                {user?.subscription?.plan === 'free' && (
                  <Link to="/subscription" className="text-sm text-yellow-800 underline mt-1 inline-block">
                    Upgrade to Premium →
                  </Link>
                )}
              </div>
            )}

            {book.isFree && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-800">
                  📖 Free Book - Available for all users
                </p>
              </div>
            )}

            {/* Publisher Info */}
            {book.publisher && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Published by <span className="font-medium text-gray-700">{book.publisher}</span>
                  {book.publishYear && ` in ${book.publishYear}`}
                  {book.isbn && ` • ISBN: ${book.isbn}`}
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Enhanced Flipbook Reader Section */}
        <AnimatePresence>
          {showPreview && hasReadableContent && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="mt-8"
            >
              <div 
                ref={readerContainerRef}
                id="book-reader" 
                className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl"
              >
                {/* Reader Header */}
                <div className="bg-gray-800 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-white" />
                    <span className="text-white font-medium truncate max-w-[200px]">{book.title}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {/* View Mode Toggle */}
                    <button
                      onClick={() => setViewMode('single')}
                      className={`p-1.5 rounded ${viewMode === 'single' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
                      title="Single Page View"
                    >
                      <FileIcon className="h-4 w-4" />
                    </button>
                    
                    {/* Zoom Controls */}
                    <button onClick={handleZoomOut} className="p-1.5 rounded hover:bg-gray-700 text-white" title="Zoom Out">
                      <ZoomOut className="h-4 w-4" />
                    </button>
                    <span className="text-white text-sm px-2">{Math.round(zoomLevel * 100)}%</span>
                    <button onClick={handleZoomIn} className="p-1.5 rounded hover:bg-gray-700 text-white" title="Zoom In">
                      <ZoomIn className="h-4 w-4" />
                    </button>
                    <button onClick={handleResetZoom} className="p-1.5 rounded hover:bg-gray-700 text-white" title="Reset Zoom">
                      <RotateCw className="h-4 w-4" />
                    </button>
                    
                    {/* Bookmark Controls */}
                    <button
                      onClick={addBookmark}
                      className="p-1.5 rounded hover:bg-gray-700 text-yellow-400"
                      title="Add Bookmark"
                    >
                      <Bookmark className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setShowBookmarks(!showBookmarks)}
                      className={`p-1.5 rounded hover:bg-gray-700 text-white ${showBookmarks ? 'bg-gray-700' : ''}`}
                      title="View Bookmarks"
                    >
                      <BookMarked className="h-4 w-4" />
                    </button>
                    
                    {/* Thumbnail View */}
                    <button
                      onClick={() => setIsThumbnailView(!isThumbnailView)}
                      className={`p-1.5 rounded hover:bg-gray-700 text-white ${isThumbnailView ? 'bg-gray-700' : ''}`}
                      title="Thumbnail View"
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    
                    {/* Fullscreen Toggle */}
                    <button onClick={toggleFullscreen} className="p-1.5 rounded hover:bg-gray-700 text-white" title="Fullscreen">
                      {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                    </button>
                    
                    {/* Close Reader */}
                    <button onClick={() => setShowPreview(false)} className="p-1.5 rounded hover:bg-gray-700 text-white ml-2" title="Close">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Bookmarks Sidebar */}
                <AnimatePresence>
                  {showBookmarks && bookmarks.length > 0 && (
                    <motion.div
                      initial={{ x: -300 }}
                      animate={{ x: 0 }}
                      exit={{ x: -300 }}
                      className="absolute left-0 top-12 bottom-0 w-64 bg-gray-800 z-20 shadow-xl overflow-y-auto"
                    >
                      <div className="p-4">
                        <h3 className="text-white font-medium mb-3">Bookmarks</h3>
                        {bookmarks.map((bookmark, idx) => (
                          <div key={idx} className="mb-2 p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                            <button
                              onClick={() => goToBookmark(bookmark.page)}
                              className="w-full text-left"
                            >
                              <p className="text-white text-sm">Page {bookmark.page}</p>
                              <p className="text-gray-400 text-xs">
                                {new Date(bookmark.timestamp).toLocaleDateString()}
                              </p>
                            </button>
                            <button
                              onClick={() => removeBookmark(bookmark.page)}
                              className="text-red-400 text-xs mt-1 hover:text-red-300"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Main Reader Content */}
                <div className="relative min-h-[600px]">
                  {isLoadingPages ? (
                    <div className="flex items-center justify-center h-[600px] bg-gray-900">
                      <Loader2 className="h-12 w-12 animate-spin text-white" />
                      <p className="text-white ml-3">Loading pages...</p>
                    </div>
                  ) : pageImages.length > 0 ? (
                    <>
                      {/* Previous Page Button */}
                      <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      >
                        <PrevIcon className="h-6 w-6" />
                      </button>

                      {/* Thumbnail Strip */}
                      {isThumbnailView && (
                        <div className="absolute top-0 left-0 right-0 bg-black/80 p-2 z-10 overflow-x-auto whitespace-nowrap">
                          {pageImages.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                setCurrentPage(idx + 1)
                                if (swiperRef.current) {
                                  swiperRef.current.slideTo(idx)
                                }
                              }}
                              className={`inline-block mx-1 p-1 rounded ${currentPage === idx + 1 ? 'bg-primary-600' : 'bg-gray-700'}`}
                            >
                              <div className="w-16 h-24 bg-gray-600 rounded overflow-hidden">
                                <img src={pageImages[idx]} alt={`Page ${idx + 1}`} className="w-full h-full object-cover" />
                              </div>
                              <span className="text-white text-xs block text-center mt-1">{idx + 1}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Main Swiper */}
                      <Swiper
                        onSwiper={(swiper) => { swiperRef.current = swiper }}
                        initialSlide={currentPage - 1}
                        onSlideChange={(swiper) => handlePageChange(swiper.activeIndex + 1)}
                        modules={[Navigation, Pagination, Keyboard, Mousewheel, Zoom]}
                        navigation={false}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        keyboard={{ enabled: true }}
                        mousewheel={{ enabled: true }}
                        spaceBetween={0}
                        slidesPerView={viewMode === 'double' ? 2 : 1}
                        centeredSlides={false}
                        className="book-swiper"
                        style={{ height: isThumbnailView ? '540px' : '600px' }}
                      >
                        {pageImages.map((image, idx) => (
                          <SwiperSlide key={idx}>
                            <div className="swiper-zoom-container">
                              <div 
                                className="flex items-center justify-center h-full bg-gray-900 p-8"
                                style={{ transform: `scale(${zoomLevel})` }}
                              >
                                <img 
                                  src={image} 
                                  alt={`Page ${idx + 1}`}
                                  className="max-h-full max-w-full object-contain shadow-lg transition-transform duration-300"
                                  loading="lazy"
                                />
                              </div>
                            </div>
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full">
                              <span className="text-white text-xs">Page {idx + 1} of {totalPages}</span>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>

                      {/* Next Page Button */}
                      <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      >
                        <NextIcon className="h-6 w-6" />
                      </button>
                    </>
                  ) : book.pdfUrl ? (
                    <iframe
                      src={`${book.pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                      title={book.title}
                      className="w-full h-[600px]"
                      frameBorder="0"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-[600px] bg-gray-900 flex-col">
                      <FileIcon className="h-16 w-16 text-gray-600 mb-4" />
                      <p className="text-gray-400">No preview available. Download to read.</p>
                      <button
                        onClick={handleDownload}
                        className="mt-4 btn-primary"
                      >
                        Download Book
                      </button>
                    </div>
                  )}
                </div>

                {/* Page Navigation Footer */}
                {pageImages.length > 0 && (
                  <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                    <div className="text-gray-400 text-sm">
                      {bookmarks.length > 0 && `${bookmarks.length} bookmark${bookmarks.length !== 1 ? 's' : ''}`}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <span className="text-white text-sm">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                    <div className="w-24"></div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Related Books Sections */}
        <div className="mt-12 space-y-8">
          {/* Books by Same Author */}
          {groupedSimilarBooks.bySameAuthor.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <PenTool className="h-5 w-5 text-primary-600" />
                  More by {getAuthorName()}
                </h3>
                <Link to={`/author/${getAuthorSlug()}`} className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
                  View All <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="overflow-x-auto scrollbar-hide pb-4">
                <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
                  {groupedSimilarBooks.bySameAuthor.map((relatedBook) => (
                    <Link
                      key={relatedBook._id}
                      to={`/book/${relatedBook.slug}`}
                      className="w-48 flex-shrink-0 group"
                    >
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all">
                        <div className="aspect-[3/4] bg-gray-100">
                          {relatedBook.coverImage ? (
                            <img src={relatedBook.coverImage} alt={relatedBook.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <BookOpen className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <h4 className="font-medium text-gray-900 text-sm line-clamp-1">{relatedBook.title}</h4>
                          <p className="text-xs text-gray-500 mt-1">{relatedBook.stats?.downloads?.toLocaleString() || 0} downloads</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Recommended for You */}
          {groupedSimilarBooks.recommended.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <BookMarked className="h-5 w-5 text-primary-600" />
                  Recommended for You
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {groupedSimilarBooks.recommended.map((recBook) => (
                  <Link key={recBook._id} to={`/book/${recBook.slug}`} className="group">
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all">
                      <div className="aspect-[3/4] bg-gray-100">
                        {recBook.coverImage ? (
                          <img src={recBook.coverImage} alt={recBook.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="p-2">
                        <h4 className="font-medium text-gray-900 text-xs line-clamp-1">{recBook.title}</h4>
                        <p className="text-xs text-gray-500 truncate">{typeof recBook.author === 'object' ? recBook.author?.name : recBook.author}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookDetailPage