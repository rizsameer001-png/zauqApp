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














// client/src/components/common/ContentCard.jsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Bookmark, Eye, Play, Headphones, BookOpen, User } from 'lucide-react'

const ContentCard = ({ 
  item, 
  type = 'poem',
  showStats = true,
  showBadges = true,
  className = '',
  size = 'normal', // normal, small, large
  onFavoriteToggle // Callback when favorite is toggled (for favorites page)
}) => {
  // Get the correct link URL using slug or id
  const getLink = () => {
    if (!item) return '#'
    
    // Use slug if available, otherwise use id
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

  // Get the image source based on content type
  const getImage = () => {
    if (!item) return '/placeholder.jpg'
    
    switch (type) {
      case 'poem':
        return item.images?.[0] || item.coverImage || item.image || '/placeholder-poem.jpg'
      case 'book':
        return item.coverImage || item.image || '/placeholder-book.jpg'
      case 'audio':
        return item.thumbnail || item.coverImage || item.image || '/placeholder-audio.jpg'
      case 'video':
        return item.thumbnail || item.coverImage || item.image || '/placeholder-video.jpg'
      case 'author':
        return item.avatar || item.image || '/placeholder-author.jpg'
      default:
        return '/placeholder.jpg'
    }
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
          badgeClass: 'text-xs px-1.5 py-0.5'
        }
      case 'large':
        return {
          card: '',
          imageAspect: 'aspect-[16/9]',
          titleClass: 'text-xl font-bold',
          authorClass: 'text-sm',
          statsClass: 'text-sm',
          badgeClass: 'text-xs px-2 py-1'
        }
      default:
        return {
          card: '',
          imageAspect: 'aspect-[4/3]',
          titleClass: 'font-semibold',
          authorClass: 'text-sm',
          statsClass: 'text-sm',
          badgeClass: 'text-xs px-2 py-1'
        }
    }
  }

  const sizeClasses = getSizeClasses()
  const badge = getBadge()
  const authorName = getAuthorName()
  
  // Don't render if no item
  if (!item) return null

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`group ${sizeClasses.card} ${className}`}
    >
      <Link to={getLink()} className="block">
        <div className="card-hover overflow-hidden rounded-xl bg-white dark:bg-dark-900 shadow-sm hover:shadow-xl transition-all duration-300">
          {/* Image Section */}
          <div className={`relative ${sizeClasses.imageAspect} overflow-hidden bg-gray-100 dark:bg-dark-800`}>
            <img
              src={getImage()}
              alt={item.title || item.name || 'Content'}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              onError={(e) => {
                e.target.src = '/placeholder.jpg'
              }}
            />
            
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
              <div className="absolute top-2 right-2 px-2 py-1 text-white text-xs font-medium rounded shadow-md z-10"
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
            <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg">
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
                  <Eye className="w-4 h-4" />
                  {(item.stats.views || 0).toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {(item.stats.likes || 0).toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Bookmark className="w-4 h-4" />
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