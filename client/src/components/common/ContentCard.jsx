// // client/src/components/common/ContentCard.jsx
// import { Link } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import { Heart, Bookmark, Eye, Play, Headphones, BookOpen, User } from 'lucide-react'

// const ContentCard = ({ 
//   item, 
//   type = 'poem',
//   showStats = true,
//   showBadges = true,
//   className = '',
//   size = 'normal' // normal, small, large
// }) => {
//   // Get the correct link URL using slug
//   const getLink = () => {
//     if (!item || !item.slug) return '#'
    
//     switch (type) {
//       case 'poem':
//         return `/poem/${item.slug}`
//       case 'book':
//         return `/book/${item.slug}`
//       case 'audio':
//         return `/audio/${item.slug}`
//       case 'video':
//         return `/video/${item.slug}`
//       case 'author':
//         return `/author/${item.slug}`
//       default:
//         return '#'
//     }
//   }

//   // Get the image source based on content type
//   const getImage = () => {
//     if (!item) return '/placeholder.jpg'
    
//     switch (type) {
//       case 'poem':
//         return item.images?.[0] || item.coverImage || '/placeholder-poem.jpg'
//       case 'book':
//         return item.coverImage || '/placeholder-book.jpg'
//       case 'audio':
//         return item.thumbnail || item.coverImage || '/placeholder-audio.jpg'
//       case 'video':
//         return item.thumbnail || item.coverImage || '/placeholder-video.jpg'
//       case 'author':
//         return item.avatar || '/placeholder-author.jpg'
//       default:
//         return '/placeholder.jpg'
//     }
//   }

//   // Get badge info based on content type
//   const getBadge = () => {
//     if (!item) return null
    
//     if (item.isPremium) {
//       return { text: 'Premium', color: 'bg-accent-500' }
//     }
//     if (item.isFree) {
//       return { text: 'Free', color: 'bg-green-500' }
//     }
//     if (item.isFeatured) {
//       return { text: 'Featured', color: 'bg-primary-500' }
//     }
//     if (type === 'author' && item.isVerified) {
//       return { text: 'Verified', color: 'bg-blue-500' }
//     }
//     return null
//   }

//   // Get size-specific classes
//   const getSizeClasses = () => {
//     switch (size) {
//       case 'small':
//         return {
//           card: '',
//           imageAspect: 'aspect-[4/3]',
//           titleClass: 'text-sm font-medium',
//           authorClass: 'text-xs',
//           statsClass: 'text-xs',
//           badgeClass: 'text-xs px-1.5 py-0.5'
//         }
//       case 'large':
//         return {
//           card: '',
//           imageAspect: 'aspect-[16/9]',
//           titleClass: 'text-xl font-bold',
//           authorClass: 'text-sm',
//           statsClass: 'text-sm',
//           badgeClass: 'text-xs px-2 py-1'
//         }
//       default:
//         return {
//           card: '',
//           imageAspect: 'aspect-[4/3]',
//           titleClass: 'font-semibold',
//           authorClass: 'text-sm',
//           statsClass: 'text-sm',
//           badgeClass: 'text-xs px-2 py-1'
//         }
//     }
//   }

//   const sizeClasses = getSizeClasses()
//   const badge = getBadge()
  
//   // Don't render if no item
//   if (!item) return null

//   return (
//     <motion.div
//       whileHover={{ y: -4 }}
//       transition={{ duration: 0.2 }}
//       className={`group ${sizeClasses.card} ${className}`}
//     >
//       <Link to={getLink()} className="block">
//         <div className="card-hover overflow-hidden rounded-xl bg-white dark:bg-dark-900 shadow-sm hover:shadow-xl transition-all duration-300">
//           {/* Image Section */}
//           <div className={`relative ${sizeClasses.imageAspect} overflow-hidden bg-gray-100 dark:bg-dark-800`}>
//             <img
//               src={getImage()}
//               alt={item.title || item.name}
//               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//               loading="lazy"
//               onError={(e) => {
//                 e.target.src = '/placeholder.jpg'
//               }}
//             />
            
//             {/* Play Overlay for Audio/Video */}
//             {(type === 'audio' || type === 'video') && (
//               <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300">
//                 <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform">
//                   {type === 'audio' ? (
//                     <Headphones className="w-6 h-6 text-primary-600" />
//                   ) : (
//                     <Play className="w-6 h-6 text-primary-600 ml-0.5" />
//                   )}
//                 </div>
//               </div>
//             )}
            
//             {/* Badges */}
//             {showBadges && badge && (
//               <div className="absolute top-2 right-2 px-2 py-1 text-white text-xs font-medium rounded shadow-md z-10"
//                    style={{ backgroundColor: badge.color }}>
//                 {badge.text}
//               </div>
//             )}
            
//             {/* Language Badge */}
//             {item.language && (
//               <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded">
//                 {item.language === 'urdu' ? 'اردو' : 
//                  item.language === 'hindi' ? 'हिंदी' : 
//                  item.language === 'english' ? 'EN' : 
//                  item.language}
//               </div>
//             )}
            
//             {/* Type Icon */}
//             <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg">
//               {type === 'poem' && <BookOpen className="w-4 h-4 text-white" />}
//               {type === 'book' && <BookOpen className="w-4 h-4 text-white" />}
//               {type === 'audio' && <Headphones className="w-4 h-4 text-white" />}
//               {type === 'video' && <Play className="w-4 h-4 text-white" />}
//               {type === 'author' && <User className="w-4 h-4 text-white" />}
//             </div>
//           </div>

//           {/* Content Section */}
//           <div className="p-4">
//             {/* Title */}
//             <h3 className={`${sizeClasses.titleClass} text-dark-900 dark:text-white line-clamp-2 mb-1 group-hover:text-primary-600 transition-colors duration-200`}>
//               {item.title || item.name}
//             </h3>

//             {/* Subtitle/Urdu Title */}
//             {(item.titleUrdu || item.nameUrdu) && (
//               <p className="urdu-text text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mb-2" dir="rtl">
//                 {item.titleUrdu || item.nameUrdu}
//               </p>
//             )}

//             {/* Author */}
//             {item.author && (
//               <p className={`${sizeClasses.authorClass} text-secondary-500 dark:text-secondary-400 mb-2 line-clamp-1`}>
//                 {typeof item.author === 'object' ? item.author.name : item.author}
//               </p>
//             )}

//             {/* Genre/Era Tags */}
//             <div className="flex flex-wrap gap-2 mb-2">
//               {item.genre && (
//                 <span className="inline-block px-2 py-1 text-xs bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full capitalize">
//                   {item.genre}
//                 </span>
//               )}
//               {item.era && (
//                 <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-dark-800 text-gray-600 dark:text-gray-400 rounded-full capitalize">
//                   {item.era}
//                 </span>
//               )}
//             </div>

//             {/* Stats */}
//             {showStats && item.stats && (
//               <div className={`flex items-center gap-4 mt-3 ${sizeClasses.statsClass} text-secondary-400`}>
//                 <span className="flex items-center gap-1">
//                   <Eye className="w-4 h-4" />
//                   {(item.stats.views || 0).toLocaleString()}
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <Heart className="w-4 h-4" />
//                   {(item.stats.likes || 0).toLocaleString()}
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <Bookmark className="w-4 h-4" />
//                   {(item.stats.bookmarks || 0).toLocaleString()}
//                 </span>
//               </div>
//             )}

//             {/* Duration for Audio/Video */}
//             {(type === 'audio' || type === 'video') && item.duration && (
//               <div className="mt-2 text-xs text-gray-500">
//                 {Math.floor(item.duration / 60)}:{(item.duration % 60).toString().padStart(2, '0')}
//               </div>
//             )}

//             {/* Page Count for Books */}
//             {type === 'book' && item.totalPages && (
//               <div className="mt-2 text-xs text-gray-500">
//                 {item.totalPages} pages
//               </div>
//             )}
//           </div>
//         </div>
//       </Link>
//     </motion.div>
//   )
// }

// export default ContentCard














// // client/src/components/common/ContentCard.jsx
// import { Link } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import { Heart, Bookmark, Eye, Play, Headphones, BookOpen, User } from 'lucide-react'

// const ContentCard = ({ 
//   item, 
//   type = 'poem',
//   showStats = true,
//   showBadges = true,
//   className = '',
//   size = 'normal', // normal, small, large
//   onFavoriteToggle // Callback when favorite is toggled (for favorites page)
// }) => {
//   // Get the correct link URL using slug or id
//   const getLink = () => {
//     if (!item) return '#'
    
//     // Use slug if available, otherwise use id
//     const slugOrId = item.slug || item._id || item.id
//     if (!slugOrId) return '#'
    
//     switch (type) {
//       case 'poem':
//         return `/poem/${slugOrId}`
//       case 'book':
//         return `/book/${slugOrId}`
//       case 'audio':
//         return `/audio/${slugOrId}`
//       case 'video':
//         return `/video/${slugOrId}`
//       case 'author':
//         return `/author/${item.slug || slugOrId}`
//       default:
//         return '#'
//     }
//   }

//   // Get the image source based on content type
//   const getImage = () => {
//     if (!item) return '/placeholder.jpg'
    
//     switch (type) {
//       case 'poem':
//         return item.images?.[0] || item.coverImage || item.image || '/placeholder-poem.jpg'
//       case 'book':
//         return item.coverImage || item.image || '/placeholder-book.jpg'
//       case 'audio':
//         return item.thumbnail || item.coverImage || item.image || '/placeholder-audio.jpg'
//       case 'video':
//         return item.thumbnail || item.coverImage || item.image || '/placeholder-video.jpg'
//       case 'author':
//         return item.avatar || item.image || '/placeholder-author.jpg'
//       default:
//         return '/placeholder.jpg'
//     }
//   }

//   // Get badge info based on content type
//   const getBadge = () => {
//     if (!item) return null
    
//     if (item.isPremium) {
//       return { text: 'Premium', color: 'bg-accent-500' }
//     }
//     if (item.isFree) {
//       return { text: 'Free', color: 'bg-green-500' }
//     }
//     if (item.isFeatured) {
//       return { text: 'Featured', color: 'bg-primary-500' }
//     }
//     if (type === 'author' && item.isVerified) {
//       return { text: 'Verified', color: 'bg-blue-500' }
//     }
//     return null
//   }

//   // Get author name (handles both populated and string author fields)
//   const getAuthorName = () => {
//     if (!item.author) return null
//     if (typeof item.author === 'object') {
//       return item.author.name
//     }
//     return item.author
//   }

//   // Get size-specific classes
//   const getSizeClasses = () => {
//     switch (size) {
//       case 'small':
//         return {
//           card: '',
//           imageAspect: 'aspect-[4/3]',
//           titleClass: 'text-sm font-medium',
//           authorClass: 'text-xs',
//           statsClass: 'text-xs',
//           badgeClass: 'text-xs px-1.5 py-0.5'
//         }
//       case 'large':
//         return {
//           card: '',
//           imageAspect: 'aspect-[16/9]',
//           titleClass: 'text-xl font-bold',
//           authorClass: 'text-sm',
//           statsClass: 'text-sm',
//           badgeClass: 'text-xs px-2 py-1'
//         }
//       default:
//         return {
//           card: '',
//           imageAspect: 'aspect-[4/3]',
//           titleClass: 'font-semibold',
//           authorClass: 'text-sm',
//           statsClass: 'text-sm',
//           badgeClass: 'text-xs px-2 py-1'
//         }
//     }
//   }

//   const sizeClasses = getSizeClasses()
//   const badge = getBadge()
//   const authorName = getAuthorName()
  
//   // Don't render if no item
//   if (!item) return null

//   return (
//     <motion.div
//       whileHover={{ y: -4 }}
//       transition={{ duration: 0.2 }}
//       className={`group ${sizeClasses.card} ${className}`}
//     >
//       <Link to={getLink()} className="block">
//         <div className="card-hover overflow-hidden rounded-xl bg-white dark:bg-dark-900 shadow-sm hover:shadow-xl transition-all duration-300">
//           {/* Image Section */}
//           <div className={`relative ${sizeClasses.imageAspect} overflow-hidden bg-gray-100 dark:bg-dark-800`}>
//             <img
//               src={getImage()}
//               alt={item.title || item.name || 'Content'}
//               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//               loading="lazy"
//               onError={(e) => {
//                 e.target.src = '/placeholder.jpg'
//               }}
//             />
            
//             {/* Play Overlay for Audio/Video */}
//             {(type === 'audio' || type === 'video') && (
//               <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300">
//                 <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform">
//                   {type === 'audio' ? (
//                     <Headphones className="w-6 h-6 text-primary-600" />
//                   ) : (
//                     <Play className="w-6 h-6 text-primary-600 ml-0.5" />
//                   )}
//                 </div>
//               </div>
//             )}
            
//             {/* Badges */}
//             {showBadges && badge && (
//               <div className="absolute top-2 right-2 px-2 py-1 text-white text-xs font-medium rounded shadow-md z-10"
//                    style={{ backgroundColor: badge.color }}>
//                 {badge.text}
//               </div>
//             )}
            
//             {/* Language Badge */}
//             {item.language && (
//               <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded">
//                 {item.language === 'urdu' ? 'اردو' : 
//                  item.language === 'hindi' ? 'हिंदी' : 
//                  item.language === 'english' ? 'EN' : 
//                  item.language}
//               </div>
//             )}
            
//             {/* Type Icon */}
//             <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg">
//               {type === 'poem' && <BookOpen className="w-4 h-4 text-white" />}
//               {type === 'book' && <BookOpen className="w-4 h-4 text-white" />}
//               {type === 'audio' && <Headphones className="w-4 h-4 text-white" />}
//               {type === 'video' && <Play className="w-4 h-4 text-white" />}
//               {type === 'author' && <User className="w-4 h-4 text-white" />}
//             </div>
//           </div>

//           {/* Content Section */}
//           <div className="p-4">
//             {/* Title */}
//             <h3 className={`${sizeClasses.titleClass} text-dark-900 dark:text-white line-clamp-2 mb-1 group-hover:text-primary-600 transition-colors duration-200`}>
//               {item.title || item.name || 'Untitled'}
//             </h3>

//             {/* Subtitle/Urdu Title */}
//             {(item.titleUrdu || item.nameUrdu) && (
//               <p className="urdu-text text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mb-2" dir="rtl">
//                 {item.titleUrdu || item.nameUrdu}
//               </p>
//             )}

//             {/* Author */}
//             {authorName && (
//               <p className={`${sizeClasses.authorClass} text-secondary-500 dark:text-secondary-400 mb-2 line-clamp-1`}>
//                 by {authorName}
//               </p>
//             )}

//             {/* Genre/Era Tags */}
//             <div className="flex flex-wrap gap-2 mb-2">
//               {item.genre && (
//                 <span className="inline-block px-2 py-1 text-xs bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full capitalize">
//                   {item.genre}
//                 </span>
//               )}
//               {item.era && (
//                 <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-dark-800 text-gray-600 dark:text-gray-400 rounded-full capitalize">
//                   {item.era}
//                 </span>
//               )}
//             </div>

//             {/* Stats */}
//             {showStats && item.stats && (
//               <div className={`flex items-center gap-4 mt-3 ${sizeClasses.statsClass} text-secondary-400`}>
//                 <span className="flex items-center gap-1">
//                   <Eye className="w-4 h-4" />
//                   {(item.stats.views || 0).toLocaleString()}
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <Heart className="w-4 h-4" />
//                   {(item.stats.likes || 0).toLocaleString()}
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <Bookmark className="w-4 h-4" />
//                   {(item.stats.bookmarks || 0).toLocaleString()}
//                 </span>
//               </div>
//             )}

//             {/* Duration for Audio/Video */}
//             {(type === 'audio' || type === 'video') && item.duration && (
//               <div className="mt-2 text-xs text-gray-500">
//                 {Math.floor(item.duration / 60)}:{(item.duration % 60).toString().padStart(2, '0')}
//               </div>
//             )}

//             {/* Page Count for Books */}
//             {type === 'book' && item.totalPages && (
//               <div className="mt-2 text-xs text-gray-500">
//                 {item.totalPages} pages
//               </div>
//             )}
//           </div>
//         </div>
//       </Link>
//     </motion.div>
//   )
// }

// export default ContentCard



























// // client/src/components/common/ContentCard.jsx
// // LAST UPDATED: 2026-06-06
// // ADDED: Favorite button functionality with toast notifications

// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import { Heart, Bookmark, Eye, Play, Headphones, BookOpen, User } from 'lucide-react'
// import { useDispatch, useSelector } from 'react-redux'
// import toast from 'react-hot-toast'

// import userAPI from '../../api/userAPI'
// import { useQueryClient } from '@tanstack/react-query'

// const ContentCard = ({ 
//   item, 
//   type = 'poem',
//   showStats = true,
//   showBadges = true,
//   showFavoriteButton = true, // ✅ NEW: Control favorite button visibility
//   className = '',
//   size = 'normal',
//   onFavoriteToggle, // Callback when favorite is toggled
//   isFavoritedProp, // Optional prop to control favorite state from parent
// }) => {
//   const queryClient = useQueryClient()
//   const { user, isAuthenticated } = useSelector((state) => state.auth)
//   const [isFavoritedLocal, setIsFavoritedLocal] = useState(item?.isFavorited || false)
//   const [isLoading, setIsLoading] = useState(false)
  
//   // Use prop if provided, otherwise use local state
//   const isFavorited = isFavoritedProp !== undefined ? isFavoritedProp : isFavoritedLocal

//   // Get the correct link URL using slug or id
//   const getLink = () => {
//     if (!item) return '#'
    
//     const slugOrId = item.slug || item._id || item.id
//     if (!slugOrId) return '#'
    
//     switch (type) {
//       case 'poem':
//         return `/poem/${slugOrId}`
//       case 'book':
//         return `/book/${slugOrId}`
//       case 'audio':
//         return `/audio/${slugOrId}`
//       case 'video':
//         return `/video/${slugOrId}`
//       case 'author':
//         return `/author/${item.slug || slugOrId}`
//       default:
//         return '#'
//     }
//   }

//   // Get the image source based on content type
//   const getImage = () => {
//     if (!item) return '/placeholder.jpg'
    
//     switch (type) {
//       case 'poem':
//         return item.images?.[0] || item.coverImage || item.image || '/placeholder-poem.jpg'
//       case 'book':
//         return item.coverImage || item.image || '/placeholder-book.jpg'
//       case 'audio':
//         return item.thumbnail || item.coverImage || item.image || '/placeholder-audio.jpg'
//       case 'video':
//         return item.thumbnail || item.coverImage || item.image || '/placeholder-video.jpg'
//       case 'author':
//         return item.avatar || item.image || '/placeholder-author.jpg'
//       default:
//         return '/placeholder.jpg'
//     }
//   }

//   // Get badge info based on content type
//   const getBadge = () => {
//     if (!item) return null
    
//     if (item.isPremium) {
//       return { text: 'Premium', color: 'bg-accent-500' }
//     }
//     if (item.isFree) {
//       return { text: 'Free', color: 'bg-green-500' }
//     }
//     if (item.isFeatured) {
//       return { text: 'Featured', color: 'bg-primary-500' }
//     }
//     if (type === 'author' && item.isVerified) {
//       return { text: 'Verified', color: 'bg-blue-500' }
//     }
//     return null
//   }

//   // Get author name (handles both populated and string author fields)
//   const getAuthorName = () => {
//     if (!item.author) return null
//     if (typeof item.author === 'object') {
//       return item.author.name
//     }
//     return item.author
//   }

//   // ============================================
//   // ✅ FAVORITE BUTTON HANDLER
//   // ============================================
  
//   const handleFavoriteClick = async (e) => {
//     e.preventDefault()
//     e.stopPropagation()
    
//     // Check if user is logged in
//     if (!isAuthenticated || !user) {
//       toast.error('Please login to add to favorites')
//       return
//     }
    
//     // Prevent double clicks
//     if (isLoading) return
    
//     setIsLoading(true)
    
//     try {
//       const contentId = item._id || item.id
//       const contentType = type === 'poems' ? 'poems' : `${type}s`
      
//       if (isFavorited) {
//         // Remove from favorites
//         await userAPI.removeFromFavorites(contentType, contentId)
//         setIsFavoritedLocal(false)
//         toast.success(`Removed from favorites`, {
//           icon: '❤️',
//           duration: 2000,
//         })
//         console.log(`✅ Removed ${type} from favorites:`, contentId)
//       } else {
//         // Add to favorites
//         await userAPI.addToFavorites(contentType, contentId)
//         setIsFavoritedLocal(true)
//         toast.success(`Added to favorites!`, {
//           icon: '❤️',
//           duration: 2000,
//         })
//         console.log(`✅ Added ${type} to favorites:`, contentId)
//       }
      
//       // ✅ Invalidate favorites queries to refresh all favorite pages
//       queryClient.invalidateQueries({ queryKey: ['user-favorites'] })
      
//       // ✅ Call the parent callback if provided
//       if (onFavoriteToggle) {
//         onFavoriteToggle()
//       }
      
//     } catch (error) {
//       console.error('Favorite error:', error)
//       const errorMessage = error.response?.data?.message || 'Failed to update favorites'
//       toast.error(errorMessage)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // Get size-specific classes
//   const getSizeClasses = () => {
//     switch (size) {
//       case 'small':
//         return {
//           card: '',
//           imageAspect: 'aspect-[4/3]',
//           titleClass: 'text-sm font-medium',
//           authorClass: 'text-xs',
//           statsClass: 'text-xs',
//           badgeClass: 'text-xs px-1.5 py-0.5',
//           iconSize: 'w-3 h-3',
//           heartSize: 'w-3 h-3'
//         }
//       case 'large':
//         return {
//           card: '',
//           imageAspect: 'aspect-[16/9]',
//           titleClass: 'text-xl font-bold',
//           authorClass: 'text-sm',
//           statsClass: 'text-sm',
//           badgeClass: 'text-xs px-2 py-1',
//           iconSize: 'w-5 h-5',
//           heartSize: 'w-5 h-5'
//         }
//       default:
//         return {
//           card: '',
//           imageAspect: 'aspect-[4/3]',
//           titleClass: 'font-semibold',
//           authorClass: 'text-sm',
//           statsClass: 'text-sm',
//           badgeClass: 'text-xs px-2 py-1',
//           iconSize: 'w-4 h-4',
//           heartSize: 'w-4 h-4'
//         }
//     }
//   }

//   const sizeClasses = getSizeClasses()
//   const badge = getBadge()
//   const authorName = getAuthorName()
  
//   // Don't render if no item
//   if (!item) return null

//   return (
//     <motion.div
//       whileHover={{ y: -4 }}
//       transition={{ duration: 0.2 }}
//       className={`group ${sizeClasses.card} ${className} relative`}
//     >
//       <Link to={getLink()} className="block">
//         <div className="card-hover overflow-hidden rounded-xl bg-white dark:bg-dark-900 shadow-sm hover:shadow-xl transition-all duration-300">
//           {/* Image Section */}
//           <div className={`relative ${sizeClasses.imageAspect} overflow-hidden bg-gray-100 dark:bg-dark-800`}>
//             <img
//               src={getImage()}
//               alt={item.title || item.name || 'Content'}
//               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//               loading="lazy"
//               onError={(e) => {
//                 e.target.src = '/placeholder.jpg'
//               }}
//             />
            
//             {/* ✅ FAVORITE BUTTON - Heart icon overlay */}
//             {showFavoriteButton && (
//               <button
//                 onClick={handleFavoriteClick}
//                 disabled={isLoading}
//                 className={`absolute top-2 right-2 z-20 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
//                   isFavorited 
//                     ? 'bg-red-500 text-white' 
//                     : 'bg-black/50 text-white hover:bg-red-500/80'
//                 } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
//                 aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
//               >
//                 <Heart className={`${sizeClasses.heartSize} ${isFavorited ? 'fill-current' : ''}`} />
//               </button>
//             )}
            
//             {/* Play Overlay for Audio/Video */}
//             {(type === 'audio' || type === 'video') && (
//               <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300">
//                 <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform">
//                   {type === 'audio' ? (
//                     <Headphones className="w-6 h-6 text-primary-600" />
//                   ) : (
//                     <Play className="w-6 h-6 text-primary-600 ml-0.5" />
//                   )}
//                 </div>
//               </div>
//             )}
            
//             {/* Badges */}
//             {showBadges && badge && (
//               <div className="absolute bottom-2 left-2 px-2 py-1 text-white text-xs font-medium rounded shadow-md z-10"
//                    style={{ backgroundColor: badge.color }}>
//                 {badge.text}
//               </div>
//             )}
            
//             {/* Language Badge */}
//             {item.language && (
//               <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded">
//                 {item.language === 'urdu' ? 'اردو' : 
//                  item.language === 'hindi' ? 'हिंदी' : 
//                  item.language === 'english' ? 'EN' : 
//                  item.language}
//               </div>
//             )}
            
//             {/* Type Icon */}
//             <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg">
//               {type === 'poem' && <BookOpen className="w-4 h-4 text-white" />}
//               {type === 'book' && <BookOpen className="w-4 h-4 text-white" />}
//               {type === 'audio' && <Headphones className="w-4 h-4 text-white" />}
//               {type === 'video' && <Play className="w-4 h-4 text-white" />}
//               {type === 'author' && <User className="w-4 h-4 text-white" />}
//             </div>
//           </div>

//           {/* Content Section */}
//           <div className="p-4">
//             {/* Title */}
//             <h3 className={`${sizeClasses.titleClass} text-dark-900 dark:text-white line-clamp-2 mb-1 group-hover:text-primary-600 transition-colors duration-200`}>
//               {item.title || item.name || 'Untitled'}
//             </h3>

//             {/* Subtitle/Urdu Title */}
//             {(item.titleUrdu || item.nameUrdu) && (
//               <p className="urdu-text text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mb-2" dir="rtl">
//                 {item.titleUrdu || item.nameUrdu}
//               </p>
//             )}

//             {/* Author */}
//             {authorName && (
//               <p className={`${sizeClasses.authorClass} text-secondary-500 dark:text-secondary-400 mb-2 line-clamp-1`}>
//                 by {authorName}
//               </p>
//             )}

//             {/* Genre/Era Tags */}
//             <div className="flex flex-wrap gap-2 mb-2">
//               {item.genre && (
//                 <span className="inline-block px-2 py-1 text-xs bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full capitalize">
//                   {item.genre}
//                 </span>
//               )}
//               {item.era && (
//                 <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-dark-800 text-gray-600 dark:text-gray-400 rounded-full capitalize">
//                   {item.era}
//                 </span>
//               )}
//             </div>

//             {/* Stats */}
//             {showStats && item.stats && (
//               <div className={`flex items-center gap-4 mt-3 ${sizeClasses.statsClass} text-secondary-400`}>
//                 <span className="flex items-center gap-1">
//                   <Eye className={sizeClasses.iconSize} />
//                   {(item.stats.views || 0).toLocaleString()}
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <Heart className={sizeClasses.iconSize} />
//                   {((item.stats.likes || 0) + (isFavorited ? 1 : 0)).toLocaleString()}
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <Bookmark className={sizeClasses.iconSize} />
//                   {(item.stats.bookmarks || 0).toLocaleString()}
//                 </span>
//               </div>
//             )}

//             {/* Duration for Audio/Video */}
//             {(type === 'audio' || type === 'video') && item.duration && (
//               <div className="mt-2 text-xs text-gray-500">
//                 {Math.floor(item.duration / 60)}:{(item.duration % 60).toString().padStart(2, '0')}
//               </div>
//             )}

//             {/* Page Count for Books */}
//             {type === 'book' && item.totalPages && (
//               <div className="mt-2 text-xs text-gray-500">
//                 {item.totalPages} pages
//               </div>
//             )}
//           </div>
//         </div>
//       </Link>
//     </motion.div>
//   )
// }

// export default ContentCard























// client/src/components/common/ContentCard.jsx
// LAST UPDATED: 2026-06-06
// FIXED: Placeholder images with proper fallback handling

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Bookmark, Eye, Play, Headphones, BookOpen, User } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'

import userAPI from '../../api/userAPI'
import { useQueryClient } from '@tanstack/react-query'

// ✅ FIXED: SVG-based placeholder images (no external files needed)
const PLACEHOLDERS = {
  default: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='14' font-family='Arial'%3ENo Image%3C/text%3E%3C/svg%3E",
  poem: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23fef3c7'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23d97706' font-size='16' font-family='Arial'%3E📖 Poem%3C/text%3E%3C/svg%3E",
  book: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23dbeafe'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%233b82f6' font-size='16' font-family='Arial'%3E📚 Book%3C/text%3E%3C/svg%3E",
  audio: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23e0e7ff'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%234f46e5' font-size='16' font-family='Arial'%3E🎵 Audio%3C/text%3E%3C/svg%3E",
  video: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23fce7f3'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23db2777' font-size='16' font-family='Arial'%3E🎬 Video%3C/text%3E%3C/svg%3E",
  author: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23ecfdf5'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23059c6e' font-size='16' font-family='Arial'%3E👤 Author%3C/text%3E%3C/svg%3E"
}

const ContentCard = ({ 
  item, 
  type = 'poem',
  showStats = true,
  showBadges = true,
  showFavoriteButton = true,
  className = '',
  size = 'normal',
  onFavoriteToggle,
  isFavoritedProp,
}) => {
  const queryClient = useQueryClient()
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const [isFavoritedLocal, setIsFavoritedLocal] = useState(item?.isFavorited || false)
  const [isLoading, setIsLoading] = useState(false)
  const [imgError, setImgError] = useState(false)
  
  // Use prop if provided, otherwise use local state
  const isFavorited = isFavoritedProp !== undefined ? isFavoritedProp : isFavoritedLocal

  // Get the correct link URL using slug or id
  const getLink = () => {
    if (!item) return '#'
    
    const slugOrId = item.slug || item._id || item.id
    if (!slugOrId) return '#'
    
    switch (type) {
      case 'poem':
        return `/poem/${slugOrId}`
      case 'book':
        return `/book/${slugOrId}`
      case 'audio':
        return `/audio/${slugOrId}`
      case 'video':
        return `/video/${slugOrId}`
      case 'author':
        return `/author/${item.slug || slugOrId}`
      default:
        return '#'
    }
  }

  // ✅ FIXED: Get placeholder based on type
  const getPlaceholder = () => {
    switch (type) {
      case 'poem': return PLACEHOLDERS.poem
      case 'book': return PLACEHOLDERS.book
      case 'audio': return PLACEHOLDERS.audio
      case 'video': return PLACEHOLDERS.video
      case 'author': return PLACEHOLDERS.author
      default: return PLACEHOLDERS.default
    }
  }

  // ✅ FIXED: Get the image source with better fallback handling
  const getImage = () => {
    if (imgError) return getPlaceholder()
    if (!item) return getPlaceholder()
    
    // Try to get image from various sources
    let imageUrl = null
    
    switch (type) {
      case 'poem':
        imageUrl = item.images?.[0] || item.coverImage || item.image || item.thumbnail
        break
      case 'book':
        imageUrl = item.coverImage || item.image || item.thumbnail
        break
      case 'audio':
        imageUrl = item.thumbnail || item.coverImage || item.image
        break
      case 'video':
        imageUrl = item.thumbnail || item.coverImage || item.image
        break
      case 'author':
        imageUrl = item.avatar || item.image
        break
      default:
        imageUrl = item.image || item.coverImage || item.thumbnail
    }
    
    // Check if URL is valid (not empty and not a placeholder loop)
    if (imageUrl && imageUrl !== '/placeholder.jpg' && !imageUrl.includes('placeholder')) {
      return imageUrl
    }
    
    return getPlaceholder()
  }

  // Get badge info based on content type
  const getBadge = () => {
    if (!item) return null
    
    if (item.isPremium) {
      return { text: 'Premium', color: 'bg-accent-500' }
    }
    if (item.isFree) {
      return { text: 'Free', color: 'bg-green-500' }
    }
    if (item.isFeatured) {
      return { text: 'Featured', color: 'bg-primary-500' }
    }
    if (type === 'author' && item.isVerified) {
      return { text: 'Verified', color: 'bg-blue-500' }
    }
    return null
  }

  // Get author name (handles both populated and string author fields)
  const getAuthorName = () => {
    if (!item.author) return null
    if (typeof item.author === 'object') {
      return item.author.name
    }
    return item.author
  }

  // ============================================
  // FAVORITE BUTTON HANDLER
  // ============================================
  
  const handleFavoriteClick = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!isAuthenticated || !user) {
      toast.error('Please login to add to favorites')
      return
    }
    
    if (isLoading) return
    
    setIsLoading(true)
    
    try {
      const contentId = item._id || item.id
      const contentType = type === 'poems' ? 'poems' : `${type}s`
      
      if (isFavorited) {
        await userAPI.removeFromFavorites(contentType, contentId)
        setIsFavoritedLocal(false)
        toast.success('Removed from favorites', { icon: '❤️', duration: 2000 })
      } else {
        await userAPI.addToFavorites(contentType, contentId)
        setIsFavoritedLocal(true)
        toast.success('Added to favorites!', { icon: '❤️', duration: 2000 })
      }
      
      queryClient.invalidateQueries({ queryKey: ['user-favorites'] })
      
      if (onFavoriteToggle) {
        onFavoriteToggle()
      }
      
    } catch (error) {
      console.error('Favorite error:', error)
      const errorMessage = error.response?.data?.message || 'Failed to update favorites'
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle image error
  const handleImageError = () => {
    setImgError(true)
  }

  // Get size-specific classes
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return {
          card: '',
          imageAspect: 'aspect-[4/3]',
          titleClass: 'text-sm font-medium',
          authorClass: 'text-xs',
          statsClass: 'text-xs',
          badgeClass: 'text-xs px-1.5 py-0.5',
          iconSize: 'w-3 h-3',
          heartSize: 'w-3 h-3'
        }
      case 'large':
        return {
          card: '',
          imageAspect: 'aspect-[16/9]',
          titleClass: 'text-xl font-bold',
          authorClass: 'text-sm',
          statsClass: 'text-sm',
          badgeClass: 'text-xs px-2 py-1',
          iconSize: 'w-5 h-5',
          heartSize: 'w-5 h-5'
        }
      default:
        return {
          card: '',
          imageAspect: 'aspect-[4/3]',
          titleClass: 'font-semibold',
          authorClass: 'text-sm',
          statsClass: 'text-sm',
          badgeClass: 'text-xs px-2 py-1',
          iconSize: 'w-4 h-4',
          heartSize: 'w-4 h-4'
        }
    }
  }

  const sizeClasses = getSizeClasses()
  const badge = getBadge()
  const authorName = getAuthorName()
  const imageSrc = getImage()
  
  if (!item) return null

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`group ${sizeClasses.card} ${className} relative`}
    >
      <Link to={getLink()} className="block">
        <div className="card-hover overflow-hidden rounded-xl bg-white dark:bg-dark-900 shadow-sm hover:shadow-xl transition-all duration-300">
          {/* Image Section */}
          <div className={`relative ${sizeClasses.imageAspect} overflow-hidden bg-gray-100 dark:bg-dark-800`}>
            <img
              src={imageSrc}
              alt={item.title || item.name || 'Content'}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              onError={handleImageError}
            />
            
            {/* FAVORITE BUTTON - Heart icon overlay */}
            {showFavoriteButton && (
              <button
                onClick={handleFavoriteClick}
                disabled={isLoading}
                className={`absolute top-2 right-2 z-20 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                  isFavorited 
                    ? 'bg-red-500 text-white' 
                    : 'bg-black/50 text-white hover:bg-red-500/80'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart className={`${sizeClasses.heartSize} ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            )}
            
            {/* Play Overlay for Audio/Video */}
            {(type === 'audio' || type === 'video') && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform">
                  {type === 'audio' ? (
                    <Headphones className="w-6 h-6 text-primary-600" />
                  ) : (
                    <Play className="w-6 h-6 text-primary-600 ml-0.5" />
                  )}
                </div>
              </div>
            )}
            
            {/* Badges */}
            {showBadges && badge && (
              <div className="absolute bottom-2 left-2 px-2 py-1 text-white text-xs font-medium rounded shadow-md z-10"
                   style={{ backgroundColor: badge.color }}>
                {badge.text}
              </div>
            )}
            
            {/* Language Badge */}
            {item.language && (
              <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded">
                {item.language === 'urdu' ? 'اردو' : 
                 item.language === 'hindi' ? 'हिंदी' : 
                 item.language === 'english' ? 'EN' : 
                 item.language}
              </div>
            )}
            
            {/* Type Icon */}
            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg">
              {type === 'poem' && <BookOpen className="w-4 h-4 text-white" />}
              {type === 'book' && <BookOpen className="w-4 h-4 text-white" />}
              {type === 'audio' && <Headphones className="w-4 h-4 text-white" />}
              {type === 'video' && <Play className="w-4 h-4 text-white" />}
              {type === 'author' && <User className="w-4 h-4 text-white" />}
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4">
            {/* Title */}
            <h3 className={`${sizeClasses.titleClass} text-dark-900 dark:text-white line-clamp-2 mb-1 group-hover:text-primary-600 transition-colors duration-200`}>
              {item.title || item.name || 'Untitled'}
            </h3>

            {/* Subtitle/Urdu Title */}
            {(item.titleUrdu || item.nameUrdu) && (
              <p className="urdu-text text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mb-2" dir="rtl">
                {item.titleUrdu || item.nameUrdu}
              </p>
            )}

            {/* Author */}
            {authorName && (
              <p className={`${sizeClasses.authorClass} text-secondary-500 dark:text-secondary-400 mb-2 line-clamp-1`}>
                by {authorName}
              </p>
            )}

            {/* Genre/Era Tags */}
            <div className="flex flex-wrap gap-2 mb-2">
              {item.genre && (
                <span className="inline-block px-2 py-1 text-xs bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full capitalize">
                  {item.genre}
                </span>
              )}
              {item.era && (
                <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-dark-800 text-gray-600 dark:text-gray-400 rounded-full capitalize">
                  {item.era}
                </span>
              )}
            </div>

            {/* Stats */}
            {showStats && item.stats && (
              <div className={`flex items-center gap-4 mt-3 ${sizeClasses.statsClass} text-secondary-400`}>
                <span className="flex items-center gap-1">
                  <Eye className={sizeClasses.iconSize} />
                  {(item.stats.views || 0).toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className={sizeClasses.iconSize} />
                  {((item.stats.likes || 0) + (isFavorited ? 1 : 0)).toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Bookmark className={sizeClasses.iconSize} />
                  {(item.stats.bookmarks || 0).toLocaleString()}
                </span>
              </div>
            )}

            {/* Duration for Audio/Video */}
            {(type === 'audio' || type === 'video') && item.duration && (
              <div className="mt-2 text-xs text-gray-500">
                {Math.floor(item.duration / 60)}:{(item.duration % 60).toString().padStart(2, '0')}
              </div>
            )}

            {/* Page Count for Books */}
            {type === 'book' && item.totalPages && (
              <div className="mt-2 text-xs text-gray-500">
                {item.totalPages} pages
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ContentCard