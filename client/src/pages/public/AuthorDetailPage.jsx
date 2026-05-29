// // client/src/pages/public/AuthorDetailPage.jsx
// import React, { useState } from 'react'
// import { useParams, Link, useNavigate } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion } from 'framer-motion'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { useSelector } from 'react-redux'
// import toast from 'react-hot-toast'
// import {
//   Heart, Share2, BookOpen, Calendar, MapPin, Users,
//   ChevronLeft, Clock, Play, Grid, List, Loader2,
//   AlertCircle, UserPlus, UserCheck, Eye, Music, Video
// } from 'lucide-react'
// import authorAPI from '../../api/authorAPI'
// import poemAPI from '../../api/poemAPI'
// import userAPI from '../../api/userAPI'

// const AuthorDetailPage = () => {
//   // Get slug from URL params (not id)
//   const { slug } = useParams()
//   const navigate = useNavigate()
//   const { t } = useTranslation()
//   const queryClient = useQueryClient()
//   const { user } = useSelector(state => state.auth)
  
//   const [activeTab, setActiveTab] = useState('works')
//   const [viewMode, setViewMode] = useState('grid')
//   const [poemsPage, setPoemsPage] = useState(1)
//   const [booksPage, setBooksPage] = useState(1)

//   // Fetch author data using slug
//   const { 
//     data: authorData, 
//     isLoading: authorLoading, 
//     error: authorError 
//   } = useQuery({
//     queryKey: ['author', slug],
//     queryFn: () => authorAPI.getAuthor(slug),
//     enabled: !!slug,
//     retry: 1
//   })

//   // Extract author from response
//   const author = authorData?.data || authorData

//   // Fetch author's poems
//   const { 
//     data: poemsData, 
//     isLoading: poemsLoading 
//   } = useQuery({
//     queryKey: ['author-poems', author?._id, poemsPage],
//     queryFn: () => authorAPI.getAuthorPoems(author?._id, { page: poemsPage, limit: 12 }),
//     enabled: !!author?._id && activeTab === 'works'
//   })

//   // Fetch author's books
//   const { 
//     data: booksData, 
//     isLoading: booksLoading 
//   } = useQuery({
//     queryKey: ['author-books', author?._id, booksPage],
//     queryFn: () => authorAPI.getAuthorBooks(author?._id, { page: booksPage, limit: 8 }),
//     enabled: !!author?._id && activeTab === 'books'
//   })

//   // Fetch author's audio
//   const { 
//     data: audioData, 
//     isLoading: audioLoading 
//   } = useQuery({
//     queryKey: ['author-audio', author?._id],
//     queryFn: () => authorAPI.getAuthorAudio(author?._id, { limit: 6 }),
//     enabled: !!author?._id && activeTab === 'audio'
//   })

//   // Fetch author's videos
//   const { 
//     data: videosData, 
//     isLoading: videosLoading 
//   } = useQuery({
//     queryKey: ['author-videos', author?._id],
//     queryFn: () => authorAPI.getAuthorVideos(author?._id, { limit: 6 }),
//     enabled: !!author?._id && activeTab === 'videos'
//   })

//   // Fetch author's timeline
//   const { 
//     data: timelineData, 
//     isLoading: timelineLoading 
//   } = useQuery({
//     queryKey: ['author-timeline', author?._id],
//     queryFn: () => authorAPI.getAuthorTimeline(author?._id),
//     enabled: !!author?._id && activeTab === 'timeline'
//   })

//   // Fetch author's gallery
//   const { 
//     data: galleryData, 
//     isLoading: galleryLoading 
//   } = useQuery({
//     queryKey: ['author-gallery', author?._id],
//     queryFn: () => authorAPI.getAuthorGallery(author?._id),
//     enabled: !!author?._id && activeTab === 'gallery'
//   })

//   // Follow mutation
//   const followMutation = useMutation({
//     mutationFn: () => userAPI.followAuthor(author?._id),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['author', slug])
//       toast.success(t('author.followed', `Now following ${author?.name}`))
//     },
//     onError: () => toast.error(t('author.followFailed', 'Failed to follow author'))
//   })

//   // Unfollow mutation
//   const unfollowMutation = useMutation({
//     mutationFn: () => userAPI.unfollowAuthor(author?._id),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['author', slug])
//       toast.success(t('author.unfollowed', `Unfollowed ${author?.name}`))
//     },
//     onError: () => toast.error(t('author.unfollowFailed', 'Failed to unfollow author'))
//   })

//   // Check if user is following this author
//   const isFollowing = user?.following?.includes(author?._id) || false

//   // Handle follow/unfollow
//   const handleFollowToggle = () => {
//     if (!user) {
//       toast.error(t('common.loginRequired', 'Please login to follow authors'))
//       return
//     }
//     if (isFollowing) {
//       unfollowMutation.mutate()
//     } else {
//       followMutation.mutate()
//     }
//   }

//   // Handle share
//   const handleShare = async () => {
//     const url = window.location.href
//     try {
//       await navigator.clipboard.writeText(url)
//       toast.success(t('common.linkCopied', 'Link copied to clipboard!'))
//     } catch (err) {
//       toast.error(t('common.copyFailed', 'Failed to copy link'))
//     }
//   }

//   // Tabs configuration
//   const tabs = [
//     { id: 'works', label: t('author.popularWorks', 'Popular Works'), icon: BookOpen },
//     { id: 'books', label: t('author.books', 'Books'), icon: BookOpen },
//     { id: 'audio', label: t('author.audio', 'Audio'), icon: Music },
//     { id: 'videos', label: t('author.videos', 'Videos'), icon: Video },
//     { id: 'timeline', label: t('author.timeline', 'Timeline'), icon: Calendar },
//     { id: 'gallery', label: t('author.gallery', 'Gallery'), icon: Eye }
//   ]

//   // Loading state
//   if (authorLoading) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
//           <p className="text-gray-500">{t('common.loading', 'Loading author...')}</p>
//         </div>
//       </div>
//     )
//   }

//   // Error state - author not found
//   if (authorError || !author) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">
//             {t('author.notFound', 'Author Not Found')}
//           </h1>
//           <p className="text-gray-500 mb-6">
//             {t('author.notFoundMessage', 'The author you are looking for does not exist.')}
//           </p>
//           <Link to="/authors" className="btn-primary inline-flex items-center space-x-2">
//             <ChevronLeft className="h-4 w-4" />
//             <span>{t('author.browseAll', 'Browse All Authors')}</span>
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   // Extract pagination info
//   const poems = poemsData?.data || poemsData?.poems || []
//   const poemsPagination = poemsData?.pagination || { page: 1, totalPages: 1, total: 0 }
  
//   const books = booksData?.data || booksData?.books || []
//   const booksPagination = booksData?.pagination || { page: 1, totalPages: 1, total: 0 }
  
//   const audioItems = audioData?.data || audioData?.audio || []
//   const videos = videosData?.data || videosData?.videos || []
//   const timeline = timelineData?.data || timelineData || []
//   const gallery = galleryData?.data || galleryData || []

//   // Render works (poems)
//   const renderWorks = () => {
//     if (poemsLoading) {
//       return (
//         <div className="flex justify-center py-12">
//           <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//         </div>
//       )
//     }

//     if (poems.length === 0) {
//       return (
//         <div className="text-center py-12 text-gray-500">
//           {t('author.noWorks', 'No works available.')}
//         </div>
//       )
//     }

//     return (
//       <>
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="font-semibold text-gray-900">
//             {t('author.popularWorks', 'Popular Works')} ({poemsPagination.total || poems.length})
//           </h3>
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
        
//         <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
//           {poems.map((poem) => (
//             <Link
//               key={poem._id}
//               to={`/poem/${poem.slug}`}
//               className="card p-4 hover:shadow-md transition-all hover:-translate-y-0.5 group"
//             >
//               <div className="flex items-start justify-between">
//                 <div className="flex-1">
//                   <h4 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
//                     {poem.title}
//                   </h4>
//                   {poem.contentUrdu && (
//                     <p className="urdu-text text-sm text-gray-500 line-clamp-1 mt-1" dir="rtl">
//                       {poem.contentUrdu}
//                     </p>
//                   )}
//                   <div className="flex flex-wrap items-center gap-3 mt-2">
//                     <span className="text-xs text-gray-500 capitalize px-2 py-0.5 bg-gray-100 rounded-full">
//                       {poem.genre}
//                     </span>
//                     <div className="flex items-center gap-2 text-xs text-gray-400">
//                       <span className="flex items-center gap-1">
//                         <Eye className="h-3 w-3" />
//                         {poem.stats?.views?.toLocaleString() || 0}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <Heart className="h-3 w-3" />
//                         {poem.stats?.likes?.toLocaleString() || 0}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {/* Pagination for poems */}
//         {poemsPagination.totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-6">
//             <button
//               onClick={() => setPoemsPage(p => Math.max(1, p - 1))}
//               disabled={poemsPage === 1}
//               className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
//             >
//               {t('common.previous', 'Previous')}
//             </button>
//             <span className="px-3 py-1 text-sm text-gray-600">
//               {poemsPage} / {poemsPagination.totalPages}
//             </span>
//             <button
//               onClick={() => setPoemsPage(p => Math.min(poemsPagination.totalPages, p + 1))}
//               disabled={poemsPage === poemsPagination.totalPages}
//               className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
//             >
//               {t('common.next', 'Next')}
//             </button>
//           </div>
//         )}
//       </>
//     )
//   }

//   // Render books
//   const renderBooks = () => {
//     if (booksLoading) {
//       return (
//         <div className="flex justify-center py-12">
//           <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//         </div>
//       )
//     }

//     if (books.length === 0) {
//       return (
//         <div className="text-center py-12 text-gray-500">
//           {t('author.noBooks', 'No books available.')}
//         </div>
//       )
//     }

//     return (
//       <>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {books.map((book) => (
//             <Link
//               key={book._id}
//               to={`/book/${book.slug}`}
//               className="card p-4 hover:shadow-md transition-all hover:-translate-y-0.5"
//             >
//               {book.coverImage && (
//                 <img 
//                   src={book.coverImage} 
//                   alt={book.title}
//                   className="w-full h-40 object-cover rounded-lg mb-3"
//                 />
//               )}
//               <h4 className="font-medium text-gray-900 line-clamp-1">{book.title}</h4>
//               <p className="text-sm text-gray-500 line-clamp-2 mt-1">{book.description}</p>
//               <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
//                 <span className="capitalize">{book.type}</span>
//                 <span className="flex items-center gap-1">
//                   <Eye className="h-3 w-3" />
//                   {book.stats?.views?.toLocaleString() || 0}
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <Download className="h-3 w-3" />
//                   {book.stats?.downloads?.toLocaleString() || 0}
//                 </span>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {booksPagination.totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-6">
//             <button
//               onClick={() => setBooksPage(p => Math.max(1, p - 1))}
//               disabled={booksPage === 1}
//               className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
//             >
//               {t('common.previous', 'Previous')}
//             </button>
//             <span className="px-3 py-1 text-sm text-gray-600">
//               {booksPage} / {booksPagination.totalPages}
//             </span>
//             <button
//               onClick={() => setBooksPage(p => Math.min(booksPagination.totalPages, p + 1))}
//               disabled={booksPage === booksPagination.totalPages}
//               className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
//             >
//               {t('common.next', 'Next')}
//             </button>
//           </div>
//         )}
//       </>
//     )
//   }

//   // Render audio
//   const renderAudio = () => {
//     if (audioLoading) {
//       return (
//         <div className="flex justify-center py-12">
//           <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//         </div>
//       )
//     }

//     if (audioItems.length === 0) {
//       return (
//         <div className="text-center py-12 text-gray-500">
//           {t('author.noAudio', 'No audio available.')}
//         </div>
//       )
//     }

//     return (
//       <div className="space-y-3">
//         {audioItems.map((audio) => (
//           <Link
//             key={audio._id}
//             to={`/audio/${audio.slug}`}
//             className="card p-4 hover:shadow-md transition-all flex items-center gap-4"
//           >
//             <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
//               <Play className="h-6 w-6 text-primary-600" />
//             </div>
//             <div className="flex-1">
//               <h4 className="font-medium text-gray-900">{audio.title}</h4>
//               <p className="text-sm text-gray-500">{audio.type}</p>
//             </div>
//             <div className="text-sm text-gray-400">
//               {audio.duration ? `${Math.floor(audio.duration / 60)}:${(audio.duration % 60).toString().padStart(2, '0')}` : '--:--'}
//             </div>
//           </Link>
//         ))}
//       </div>
//     )
//   }

//   // Render videos
//   const renderVideos = () => {
//     if (videosLoading) {
//       return (
//         <div className="flex justify-center py-12">
//           <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//         </div>
//       )
//     }

//     if (videos.length === 0) {
//       return (
//         <div className="text-center py-12 text-gray-500">
//           {t('author.noVideos', 'No videos available.')}
//         </div>
//       )
//     }

//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {videos.map((video) => (
//           <Link
//             key={video._id}
//             to={`/video/${video.slug}`}
//             className="card overflow-hidden hover:shadow-md transition-all"
//           >
//             <div className="relative h-40 bg-gray-900">
//               {video.thumbnail ? (
//                 <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
//               ) : (
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <Play className="h-12 w-12 text-white/50" />
//                 </div>
//               )}
//             </div>
//             <div className="p-4">
//               <h4 className="font-medium text-gray-900 line-clamp-1">{video.title}</h4>
//               <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
//                 <span className="capitalize">{video.type}</span>
//                 <span className="flex items-center gap-1">
//                   <Eye className="h-3 w-3" />
//                   {video.stats?.views?.toLocaleString() || 0}
//                 </span>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     )
//   }

//   // Render timeline
//   const renderTimeline = () => {
//     if (timelineLoading) {
//       return (
//         <div className="flex justify-center py-12">
//           <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//         </div>
//       )
//     }

//     if (timeline.length === 0) {
//       return (
//         <div className="text-center py-12 text-gray-500">
//           {t('author.noTimeline', 'No timeline available.')}
//         </div>
//       )
//     }

//     return (
//       <div className="card p-6">
//         <div className="space-y-6">
//           {timeline.map((event, index) => (
//             <div key={index} className="flex items-start space-x-4">
//               <div className="flex-shrink-0 w-20 text-right">
//                 <span className="font-bold text-primary-600">{event.year}</span>
//               </div>
//               <div className="flex-shrink-0 w-3 h-3 bg-primary-600 rounded-full mt-1.5" />
//               <div className="flex-1 pb-6 border-l-2 border-gray-200 pl-4 -ml-1.5">
//                 <p className="text-gray-700 font-medium">{event.event}</p>
//                 {event.description && (
//                   <p className="text-sm text-gray-500 mt-1">{event.description}</p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     )
//   }

//   // Render gallery
//   const renderGallery = () => {
//     if (galleryLoading) {
//       return (
//         <div className="flex justify-center py-12">
//           <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//         </div>
//       )
//     }

//     if (gallery.length === 0) {
//       return (
//         <div className="text-center py-12 text-gray-500">
//           {t('author.noGallery', 'No gallery images available.')}
//         </div>
//       )
//     }

//     return (
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {gallery.map((item, index) => (
//           <div key={index} className="card overflow-hidden hover:shadow-md transition-all cursor-pointer">
//             <img 
//               src={item.url} 
//               alt={item.caption || `Image ${index + 1}`}
//               className="w-full h-48 object-cover"
//             />
//             {item.caption && (
//               <div className="p-2">
//                 <p className="text-xs text-gray-500 line-clamp-2">{item.caption}</p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Back Link */}
//         <div className="mb-6">
//           <Link 
//             to="/authors" 
//             className="inline-flex items-center space-x-1 text-sm text-gray-500 hover:text-primary-600 transition-colors"
//           >
//             <ChevronLeft className="h-4 w-4" />
//             <span>{t('author.backToAuthors', 'Back to Authors')}</span>
//           </Link>
//         </div>

//         {/* Cover & Profile */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="relative mb-8"
//         >
//           <div className="h-48 md:h-64 rounded-xl overflow-hidden">
//             {author.coverImage ? (
//               <img src={author.coverImage} alt="" className="w-full h-full object-cover" />
//             ) : (
//               <div className="w-full h-full bg-gradient-to-r from-primary-600 to-primary-800" />
//             )}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//           </div>
//           <div className="relative -mt-16 md:-mt-20 px-6 flex flex-col md:flex-row items-end md:items-center space-y-4 md:space-y-0 md:space-x-6">
//             <img
//               src={author.avatar || `https://ui-avatars.com/api/?name=${author.name}&background=8B4513&color=fff&size=128`}
//               alt={author.name}
//               className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover bg-white"
//             />
//             <div className="flex-1 pb-2">
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//                 <div>
//                   <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{author.name}</h1>
//                   {author.nameUrdu && (
//                     <p className="urdu-text text-lg text-gray-600" dir="rtl">{author.nameUrdu}</p>
//                   )}
//                 </div>
//                 <div className="flex items-center space-x-3 mt-4 md:mt-0">
//                   <button
//                     onClick={handleFollowToggle}
//                     disabled={followMutation.isPending || unfollowMutation.isPending}
//                     className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
//                       isFollowing
//                         ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                         : 'bg-primary-600 text-white hover:bg-primary-700'
//                     }`}
//                   >
//                     {isFollowing ? (
//                       <>
//                         <UserCheck className="h-4 w-4" />
//                         <span>{t('author.following', 'Following')}</span>
//                       </>
//                     ) : (
//                       <>
//                         <UserPlus className="h-4 w-4" />
//                         <span>{t('author.follow', 'Follow')}</span>
//                       </>
//                     )}
//                   </button>
//                   <button 
//                     onClick={handleShare}
//                     className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
//                   >
//                     <Share2 className="h-5 w-5 text-gray-600" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//           {[
//             { icon: BookOpen, label: t('author.poems', 'Poems'), value: author.stats?.poemsCount || 0 },
//             { icon: BookOpen, label: t('author.books', 'Books'), value: author.stats?.booksCount || 0 },
//             { icon: Users, label: t('author.followers', 'Followers'), value: (author.stats?.followers || 0).toLocaleString() },
//             { icon: Eye, label: t('author.views', 'Views'), value: (author.stats?.views || 0).toLocaleString() },
//           ].map((stat, index) => (
//             <div key={index} className="card p-4 text-center">
//               <stat.icon className="h-6 w-6 text-primary-600 mx-auto mb-2" />
//               <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//               <p className="text-sm text-gray-500">{stat.label}</p>
//             </div>
//           ))}
//         </div>

//         {/* Bio & Info */}
//         <div className="grid md:grid-cols-3 gap-6 mb-8">
//           <div className="md:col-span-2">
//             <div className="card p-6">
//               <h2 className="font-semibold text-gray-900 mb-4">{t('author.biography', 'Biography')}</h2>
//               <p className="text-gray-700 leading-relaxed whitespace-pre-line">{author.bio}</p>
//               {author.bioUrdu && (
//                 <p className="urdu-text text-gray-700 leading-relaxed mt-4" dir="rtl">{author.bioUrdu}</p>
//               )}
//               <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100">
//                 {author.birthDate && (
//                   <span className="flex items-center space-x-1 text-sm text-gray-500">
//                     <Calendar className="h-4 w-4" />
//                     <span>
//                       {new Date(author.birthDate).getFullYear()} 
//                       {author.deathDate && ` - ${new Date(author.deathDate).getFullYear()}`}
//                     </span>
//                   </span>
//                 )}
//                 {author.birthPlace && (
//                   <span className="flex items-center space-x-1 text-sm text-gray-500">
//                     <MapPin className="h-4 w-4" />
//                     <span>{author.birthPlace}</span>
//                   </span>
//                 )}
//                 {author.era && (
//                   <span className="px-2 py-0.5 bg-primary-50 text-primary-700 rounded-full text-xs capitalize">
//                     {author.era} {t('author.era', 'Era')}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//           <div>
//             <div className="card p-6">
//               <h3 className="font-semibold text-gray-900 mb-4">{t('author.genres', 'Genres')}</h3>
//               <div className="flex flex-wrap gap-2">
//                 {author.genres?.map((genre, index) => (
//                   <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-700 capitalize">
//                     {genre}
//                   </span>
//                 ))}
//                 {(!author.genres || author.genres.length === 0) && (
//                   <p className="text-gray-500 text-sm">{t('author.noGenres', 'No genres listed')}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex overflow-x-auto scrollbar-hide gap-1 mb-6 border-b border-gray-200">
//           {tabs.map((tab) => {
//             const Icon = tab.icon
//             return (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
//                   activeTab === tab.id
//                     ? 'border-primary-600 text-primary-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 <Icon className="h-4 w-4" />
//                 <span>{tab.label}</span>
//               </button>
//             )
//           })}
//         </div>

//         {/* Tab Content */}
//         <div className="mb-8">
//           {activeTab === 'works' && renderWorks()}
//           {activeTab === 'books' && renderBooks()}
//           {activeTab === 'audio' && renderAudio()}
//           {activeTab === 'videos' && renderVideos()}
//           {activeTab === 'timeline' && renderTimeline()}
//           {activeTab === 'gallery' && renderGallery()}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AuthorDetailPage
















// // client/src/pages/public/AuthorDetailPage.jsx
// import React, { useState } from 'react'
// import { useParams, Link, useNavigate } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion } from 'framer-motion'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { useSelector } from 'react-redux'
// import toast from 'react-hot-toast'
// import {
//   Heart, Share2, BookOpen, Calendar, MapPin, Users,
//   ChevronLeft, Clock, Play, Grid, List, Loader2,
//   AlertCircle, UserPlus, UserCheck, Eye, Music, Video,
//   Quote, Image as ImageIcon, Twitter, Facebook, Instagram,
//   Youtube, Globe, ExternalLink
// } from 'lucide-react'
// import authorAPI from '../../api/authorAPI'
// import userAPI from '../../api/userAPI'

// const AuthorDetailPage = () => {
//   // Get slug from URL params (not id)
//   const { slug } = useParams()
//   const navigate = useNavigate()
//   const { t } = useTranslation()
//   const queryClient = useQueryClient()
//   const { user } = useSelector(state => state.auth)
  
//   const [activeTab, setActiveTab] = useState('works')
//   const [viewMode, setViewMode] = useState('grid')
//   const [poemsPage, setPoemsPage] = useState(1)
//   const [booksPage, setBooksPage] = useState(1)

//   // Fetch author data using slug
//   const { 
//     data: authorData, 
//     isLoading: authorLoading, 
//     error: authorError 
//   } = useQuery({
//     queryKey: ['author', slug],
//     queryFn: () => authorAPI.getAuthor(slug),
//     enabled: !!slug,
//     retry: 1
//   })

//   // Extract author from response
//   const author = authorData?.data || authorData

//   // ============================================
//   // FETCH AUTHOR CONTENT USING SLUG (NOT ID)
//   // ============================================
  
//   // Fetch author's poems using slug
//   const { 
//     data: poemsData, 
//     isLoading: poemsLoading 
//   } = useQuery({
//     queryKey: ['author-poems', slug, poemsPage],
//     queryFn: () => authorAPI.getAuthorPoems(slug, { page: poemsPage, limit: 12 }),
//     enabled: !!slug && activeTab === 'works'
//   })

//   // Fetch author's books using slug
//   const { 
//     data: booksData, 
//     isLoading: booksLoading 
//   } = useQuery({
//     queryKey: ['author-books', slug, booksPage],
//     queryFn: () => authorAPI.getAuthorBooks(slug, { page: booksPage, limit: 8 }),
//     enabled: !!slug && activeTab === 'books'
//   })

//   // Fetch author's audio using slug
//   const { 
//     data: audioData, 
//     isLoading: audioLoading 
//   } = useQuery({
//     queryKey: ['author-audio', slug],
//     queryFn: () => authorAPI.getAuthorAudio(slug, { limit: 6 }),
//     enabled: !!slug && activeTab === 'audio'
//   })

//   // Fetch author's videos using slug
//   const { 
//     data: videosData, 
//     isLoading: videosLoading 
//   } = useQuery({
//     queryKey: ['author-videos', slug],
//     queryFn: () => authorAPI.getAuthorVideos(slug, { limit: 6 }),
//     enabled: !!slug && activeTab === 'videos'
//   })

//   // Fetch author's timeline using slug
//   const { 
//     data: timelineData, 
//     isLoading: timelineLoading 
//   } = useQuery({
//     queryKey: ['author-timeline', slug],
//     queryFn: () => authorAPI.getAuthorTimeline(slug),
//     enabled: !!slug && activeTab === 'timeline'
//   })

//   // Fetch author's gallery using slug
//   const { 
//     data: galleryData, 
//     isLoading: galleryLoading 
//   } = useQuery({
//     queryKey: ['author-gallery', slug],
//     queryFn: () => authorAPI.getAuthorGallery(slug),
//     enabled: !!slug && activeTab === 'gallery'
//   })

//   // Fetch author's quotes using slug
//   const { 
//     data: quotesData, 
//     isLoading: quotesLoading 
//   } = useQuery({
//     queryKey: ['author-quotes', slug],
//     queryFn: () => authorAPI.getAuthorQuotes(slug),
//     enabled: !!slug && activeTab === 'quotes'
//   })

//   // Fetch author's social links from author data
//   const socialLinks = author?.socialLinks || {}

//   // Follow mutation
//   const followMutation = useMutation({
//     mutationFn: () => userAPI.followAuthor(author?._id),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['author', slug])
//       toast.success(`Now following ${author?.name}`)
//     },
//     onError: () => toast.error('Failed to follow author')
//   })

//   // Unfollow mutation
//   const unfollowMutation = useMutation({
//     mutationFn: () => userAPI.unfollowAuthor(author?._id),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['author', slug])
//       toast.success(`Unfollowed ${author?.name}`)
//     },
//     onError: () => toast.error('Failed to unfollow author')
//   })

//   // Check if user is following this author
//   const isFollowing = user?.following?.includes(author?._id) || false

//   // Handle follow/unfollow
//   const handleFollowToggle = () => {
//     if (!user) {
//       toast.error('Please login to follow authors')
//       navigate('/login')
//       return
//     }
//     if (isFollowing) {
//       unfollowMutation.mutate()
//     } else {
//       followMutation.mutate()
//     }
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

//   // Extract data from responses
//   const poems = poemsData?.data || poemsData || []
//   const poemsPagination = poemsData?.pagination || { page: 1, totalPages: 1, total: 0 }
  
//   const books = booksData?.data || booksData || []
//   const booksPagination = booksData?.pagination || { page: 1, totalPages: 1, total: 0 }
  
//   const audioItems = audioData?.data || audioData || []
//   const videos = videosData?.data || videosData || []
//   const timeline = timelineData?.data || timelineData || []
//   const gallery = galleryData?.data || galleryData || []
//   const quotes = quotesData?.data || quotesData || []

//   // Format duration
//   const formatDuration = (seconds) => {
//     if (!seconds) return 'N/A'
//     const mins = Math.floor(seconds / 60)
//     const secs = seconds % 60
//     return `${mins}:${secs.toString().padStart(2, '0')}`
//   }

//   // Tabs configuration - Add quotes tab
//   const tabs = [
//     { id: 'works', label: 'Poems', icon: BookOpen, count: poemsPagination.total || poems.length },
//     { id: 'books', label: 'Books', icon: BookOpen, count: booksPagination.total || books.length },
//     { id: 'audio', label: 'Audio', icon: Music, count: audioItems.length },
//     { id: 'videos', label: 'Videos', icon: Video, count: videos.length },
//     { id: 'timeline', label: 'Timeline', icon: Calendar, count: timeline.length },
//     { id: 'gallery', label: 'Gallery', icon: ImageIcon, count: gallery.length },
//     { id: 'quotes', label: 'Quotes', icon: Quote, count: quotes.length }
//   ]

//   // Loading state
//   if (authorLoading) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
//           <p className="text-gray-500">Loading author...</p>
//         </div>
//       </div>
//     )
//   }

//   // Error state - author not found
//   if (authorError || !author) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Author Not Found</h1>
//           <p className="text-gray-500 mb-6">The author you are looking for does not exist.</p>
//           <Link to="/authors" className="btn-primary inline-flex items-center space-x-2">
//             <ChevronLeft className="h-4 w-4" />
//             <span>Browse All Authors</span>
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   // Render works (poems)
//   const renderWorks = () => {
//     if (poemsLoading) {
//       return (
//         <div className="flex justify-center py-12">
//           <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//         </div>
//       )
//     }

//     if (poems.length === 0) {
//       return (
//         <div className="text-center py-12 text-gray-500">
//           No poems available for this author.
//         </div>
//       )
//     }

//     return (
//       <>
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="font-semibold text-gray-900">
//             Poems ({poemsPagination.total || poems.length})
//           </h3>
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
        
//         <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
//           {poems.map((poem) => (
//             <Link
//               key={poem._id}
//               to={`/poem/${poem.slug}`}
//               className="card p-4 hover:shadow-md transition-all hover:-translate-y-0.5 group"
//             >
//               <div className="flex items-start justify-between">
//                 <div className="flex-1">
//                   <h4 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
//                     {poem.title}
//                   </h4>
//                   {poem.contentUrdu && (
//                     <p className="urdu-text text-sm text-gray-500 line-clamp-1 mt-1" dir="rtl">
//                       {poem.contentUrdu.substring(0, 50)}...
//                     </p>
//                   )}
//                   <div className="flex flex-wrap items-center gap-3 mt-2">
//                     <span className="text-xs text-gray-500 capitalize px-2 py-0.5 bg-gray-100 rounded-full">
//                       {poem.genre}
//                     </span>
//                     <div className="flex items-center gap-2 text-xs text-gray-400">
//                       <span className="flex items-center gap-1">
//                         <Eye className="h-3 w-3" />
//                         {poem.stats?.views?.toLocaleString() || 0}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <Heart className="h-3 w-3" />
//                         {poem.stats?.likes?.toLocaleString() || 0}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {/* Pagination for poems */}
//         {poemsPagination.totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-6">
//             <button
//               onClick={() => setPoemsPage(p => Math.max(1, p - 1))}
//               disabled={poemsPage === 1}
//               className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
//             >
//               Previous
//             </button>
//             <span className="px-3 py-1 text-sm text-gray-600">
//               {poemsPage} / {poemsPagination.totalPages}
//             </span>
//             <button
//               onClick={() => setPoemsPage(p => Math.min(poemsPagination.totalPages, p + 1))}
//               disabled={poemsPage === poemsPagination.totalPages}
//               className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </>
//     )
//   }

//   // Render books
//   const renderBooks = () => {
//     if (booksLoading) {
//       return (
//         <div className="flex justify-center py-12">
//           <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//         </div>
//       )
//     }

//     if (books.length === 0) {
//       return (
//         <div className="text-center py-12 text-gray-500">
//           No books available for this author.
//         </div>
//       )
//     }

//     return (
//       <>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {books.map((book) => (
//             <Link
//               key={book._id}
//               to={`/book/${book.slug}`}
//               className="card p-4 hover:shadow-md transition-all hover:-translate-y-0.5"
//             >
//               {book.coverImage && (
//                 <img 
//                   src={book.coverImage} 
//                   alt={book.title}
//                   className="w-full h-40 object-cover rounded-lg mb-3"
//                 />
//               )}
//               <h4 className="font-medium text-gray-900 line-clamp-1">{book.title}</h4>
//               <p className="text-sm text-gray-500 line-clamp-2 mt-1">{book.description}</p>
//               <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
//                 <span className="capitalize">{book.type}</span>
//                 <span className="flex items-center gap-1">
//                   <Eye className="h-3 w-3" />
//                   {book.stats?.views?.toLocaleString() || 0}
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <Download className="h-3 w-3" />
//                   {book.stats?.downloads?.toLocaleString() || 0}
//                 </span>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {booksPagination.totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-6">
//             <button
//               onClick={() => setBooksPage(p => Math.max(1, p - 1))}
//               disabled={booksPage === 1}
//               className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
//             >
//               Previous
//             </button>
//             <span className="px-3 py-1 text-sm text-gray-600">
//               {booksPage} / {booksPagination.totalPages}
//             </span>
//             <button
//               onClick={() => setBooksPage(p => Math.min(booksPagination.totalPages, p + 1))}
//               disabled={booksPage === booksPagination.totalPages}
//               className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </>
//     )
//   }

//   // Render audio
//   const renderAudio = () => {
//     if (audioLoading) {
//       return (
//         <div className="flex justify-center py-12">
//           <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//         </div>
//       )
//     }

//     if (audioItems.length === 0) {
//       return (
//         <div className="text-center py-12 text-gray-500">
//           No audio available for this author.
//         </div>
//       )
//     }

//     return (
//       <div className="space-y-3">
//         {audioItems.map((audio) => (
//           <Link
//             key={audio._id}
//             to={`/audio/${audio.slug}`}
//             className="card p-4 hover:shadow-md transition-all flex items-center gap-4"
//           >
//             <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
//               <Play className="h-6 w-6 text-primary-600" />
//             </div>
//             <div className="flex-1">
//               <h4 className="font-medium text-gray-900">{audio.title}</h4>
//               <p className="text-sm text-gray-500 capitalize">{audio.type}</p>
//             </div>
//             <div className="text-sm text-gray-400">
//               {formatDuration(audio.duration)}
//             </div>
//           </Link>
//         ))}
//       </div>
//     )
//   }

//   // Render videos
//   const renderVideos = () => {
//     if (videosLoading) {
//       return (
//         <div className="flex justify-center py-12">
//           <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//         </div>
//       )
//     }

//     if (videos.length === 0) {
//       return (
//         <div className="text-center py-12 text-gray-500">
//           No videos available for this author.
//         </div>
//       )
//     }

//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {videos.map((video) => (
//           <Link
//             key={video._id}
//             to={`/video/${video.slug}`}
//             className="card overflow-hidden hover:shadow-md transition-all"
//           >
//             <div className="relative h-40 bg-gray-900">
//               {video.thumbnail ? (
//                 <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
//               ) : (
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <Play className="h-12 w-12 text-white/50" />
//                 </div>
//               )}
//             </div>
//             <div className="p-4">
//               <h4 className="font-medium text-gray-900 line-clamp-1">{video.title}</h4>
//               <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
//                 <span className="capitalize">{video.type}</span>
//                 <span className="flex items-center gap-1">
//                   <Eye className="h-3 w-3" />
//                   {video.stats?.views?.toLocaleString() || 0}
//                 </span>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     )
//   }

//   // Render timeline
//   const renderTimeline = () => {
//     if (timelineLoading) {
//       return (
//         <div className="flex justify-center py-12">
//           <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//         </div>
//       )
//     }

//     if (timeline.length === 0) {
//       return (
//         <div className="text-center py-12 text-gray-500">
//           No timeline available for this author.
//         </div>
//       )
//     }

//     return (
//       <div className="card p-6">
//         <div className="space-y-6">
//           {timeline.map((event, index) => (
//             <div key={index} className="flex items-start space-x-4">
//               <div className="flex-shrink-0 w-20 text-right">
//                 <span className="font-bold text-primary-600">{event.year}</span>
//               </div>
//               <div className="flex-shrink-0 w-3 h-3 bg-primary-600 rounded-full mt-1.5" />
//               <div className="flex-1 pb-6 border-l-2 border-gray-200 pl-4 -ml-1.5">
//                 <p className="text-gray-700 font-medium">{event.event}</p>
//                 {event.description && (
//                   <p className="text-sm text-gray-500 mt-1">{event.description}</p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     )
//   }

//   // Render gallery
//   const renderGallery = () => {
//     if (galleryLoading) {
//       return (
//         <div className="flex justify-center py-12">
//           <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//         </div>
//       )
//     }

//     if (gallery.length === 0) {
//       return (
//         <div className="text-center py-12 text-gray-500">
//           No gallery images available for this author.
//         </div>
//       )
//     }

//     return (
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {gallery.map((item, index) => (
//           <div key={index} className="card overflow-hidden hover:shadow-md transition-all cursor-pointer group">
//             <img 
//               src={item.url} 
//               alt={item.caption || `Image ${index + 1}`}
//               className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//             />
//             {item.caption && (
//               <div className="p-2">
//                 <p className="text-xs text-gray-500 line-clamp-2">{item.caption}</p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     )
//   }

//   // Render quotes
//   const renderQuotes = () => {
//     if (quotesLoading) {
//       return (
//         <div className="flex justify-center py-12">
//           <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//         </div>
//       )
//     }

//     if (quotes.length === 0) {
//       return (
//         <div className="text-center py-12 text-gray-500">
//           No quotes available for this author.
//         </div>
//       )
//     }

//     return (
//       <div className="space-y-4">
//         {quotes.map((quote, index) => (
//           <div key={index} className="card p-6 border-l-4 border-primary-500">
//             <p className="text-lg text-gray-700 italic">"{quote.text}"</p>
//             {quote.source && (
//               <p className="text-sm text-gray-500 mt-2">— {quote.source}</p>
//             )}
//           </div>
//         ))}
//       </div>
//     )
//   }

//   // Render social links
//   const renderSocialLinks = () => {
//     const hasSocialLinks = Object.values(socialLinks).some(v => v)
    
//     if (!hasSocialLinks) return null

//     return (
//       <div className="mt-6 pt-6 border-t border-gray-200">
//         <h3 className="font-semibold text-gray-900 mb-3">Connect</h3>
//         <div className="flex flex-wrap gap-3">
//           {socialLinks.website && (
//             <a href={socialLinks.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600">
//               <Globe className="h-4 w-4" /> Website
//             </a>
//           )}
//           {socialLinks.twitter && (
//             <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-500">
//               <Twitter className="h-4 w-4" /> Twitter
//             </a>
//           )}
//           {socialLinks.facebook && (
//             <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-700">
//               <Facebook className="h-4 w-4" /> Facebook
//             </a>
//           )}
//           {socialLinks.instagram && (
//             <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-pink-600">
//               <Instagram className="h-4 w-4" /> Instagram
//             </a>
//           )}
//           {socialLinks.youtube && (
//             <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600">
//               <Youtube className="h-4 w-4" /> YouTube
//             </a>
//           )}
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Back Link */}
//         <div className="mb-6">
//           <Link 
//             to="/authors" 
//             className="inline-flex items-center space-x-1 text-sm text-gray-500 hover:text-primary-600 transition-colors"
//           >
//             <ChevronLeft className="h-4 w-4" />
//             <span>Back to Authors</span>
//           </Link>
//         </div>

//         {/* Cover & Profile */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="relative mb-8"
//         >
//           <div className="h-48 md:h-64 rounded-xl overflow-hidden">
//             {author.coverImage ? (
//               <img src={author.coverImage} alt="" className="w-full h-full object-cover" />
//             ) : (
//               <div className="w-full h-full bg-gradient-to-r from-primary-600 to-primary-800" />
//             )}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//           </div>
//           <div className="relative -mt-16 md:-mt-20 px-6 flex flex-col md:flex-row items-end md:items-center space-y-4 md:space-y-0 md:space-x-6">
//             <img
//               src={author.avatar || `https://ui-avatars.com/api/?name=${author.name}&background=8B4513&color=fff&size=128`}
//               alt={author.name}
//               className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover bg-white"
//             />
//             <div className="flex-1 pb-2">
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//                 <div>
//                   <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{author.name}</h1>
//                   {author.nameUrdu && (
//                     <p className="urdu-text text-lg text-gray-600" dir="rtl">{author.nameUrdu}</p>
//                   )}
//                   <div className="flex flex-wrap gap-2 mt-1">
//                     {author.era && (
//                       <span className="px-2 py-0.5 bg-primary-50 text-primary-700 text-xs rounded-full capitalize">
//                         {author.era} Era
//                       </span>
//                     )}
//                     {author.isVerified && (
//                       <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">
//                         ✓ Verified
//                       </span>
//                     )}
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-3 mt-4 md:mt-0">
//                   <button
//                     onClick={handleFollowToggle}
//                     disabled={followMutation.isPending || unfollowMutation.isPending}
//                     className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
//                       isFollowing
//                         ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                         : 'bg-primary-600 text-white hover:bg-primary-700'
//                     }`}
//                   >
//                     {isFollowing ? (
//                       <>
//                         <UserCheck className="h-4 w-4" />
//                         <span>Following</span>
//                       </>
//                     ) : (
//                       <>
//                         <UserPlus className="h-4 w-4" />
//                         <span>Follow</span>
//                       </>
//                     )}
//                   </button>
//                   <button 
//                     onClick={handleShare}
//                     className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
//                   >
//                     <Share2 className="h-5 w-5 text-gray-600" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//           {[
//             { icon: BookOpen, label: 'Poems', value: author.stats?.poemsCount || 0 },
//             { icon: BookOpen, label: 'Books', value: author.stats?.booksCount || 0 },
//             { icon: Users, label: 'Followers', value: (author.stats?.followers || 0).toLocaleString() },
//             { icon: Eye, label: 'Views', value: (author.stats?.views || 0).toLocaleString() },
//           ].map((stat, index) => (
//             <div key={index} className="card p-4 text-center">
//               <stat.icon className="h-6 w-6 text-primary-600 mx-auto mb-2" />
//               <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//               <p className="text-sm text-gray-500">{stat.label}</p>
//             </div>
//           ))}
//         </div>

//         {/* Bio & Info */}
//         <div className="grid md:grid-cols-3 gap-6 mb-8">
//           <div className="md:col-span-2">
//             <div className="card p-6">
//               <h2 className="font-semibold text-gray-900 mb-4">Biography</h2>
//               <p className="text-gray-700 leading-relaxed whitespace-pre-line">{author.bio}</p>
//               {author.bioUrdu && (
//                 <p className="urdu-text text-gray-700 leading-relaxed mt-4" dir="rtl">{author.bioUrdu}</p>
//               )}
//               <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100">
//                 {author.birthDate && (
//                   <span className="flex items-center space-x-1 text-sm text-gray-500">
//                     <Calendar className="h-4 w-4" />
//                     <span>
//                       {new Date(author.birthDate).getFullYear()} 
//                       {author.deathDate && ` - ${new Date(author.deathDate).getFullYear()}`}
//                     </span>
//                   </span>
//                 )}
//                 {author.birthPlace && (
//                   <span className="flex items-center space-x-1 text-sm text-gray-500">
//                     <MapPin className="h-4 w-4" />
//                     <span>{author.birthPlace}</span>
//                   </span>
//                 )}
//               </div>
//               {renderSocialLinks()}
//             </div>
//           </div>
//           <div>
//             <div className="card p-6">
//               <h3 className="font-semibold text-gray-900 mb-4">Genres</h3>
//               <div className="flex flex-wrap gap-2">
//                 {author.genres?.map((genre, index) => (
//                   <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-700 capitalize">
//                     {genre}
//                   </span>
//                 ))}
//                 {(!author.genres || author.genres.length === 0) && (
//                   <p className="text-gray-500 text-sm">No genres listed</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex overflow-x-auto scrollbar-hide gap-1 mb-6 border-b border-gray-200">
//           {tabs.filter(tab => tab.count > 0 || tab.id === 'works').map((tab) => {
//             const Icon = tab.icon
//             return (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
//                   activeTab === tab.id
//                     ? 'border-primary-600 text-primary-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 <Icon className="h-4 w-4" />
//                 <span>{tab.label}</span>
//                 {tab.count > 0 && (
//                   <span className="ml-1 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
//                     {tab.count}
//                   </span>
//                 )}
//               </button>
//             )
//           })}
//         </div>

//         {/* Tab Content */}
//         <div className="mb-8">
//           {activeTab === 'works' && renderWorks()}
//           {activeTab === 'books' && renderBooks()}
//           {activeTab === 'audio' && renderAudio()}
//           {activeTab === 'videos' && renderVideos()}
//           {activeTab === 'timeline' && renderTimeline()}
//           {activeTab === 'gallery' && renderGallery()}
//           {activeTab === 'quotes' && renderQuotes()}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AuthorDetailPage























// // client/src/pages/public/AuthorDetailPage.jsx
// import React, { useState } from 'react'
// import { useParams, Link, useNavigate } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion } from 'framer-motion'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { useSelector } from 'react-redux'
// import toast from 'react-hot-toast'
// import {
//   Heart, Share2, BookOpen, Calendar, MapPin, Users,
//   ChevronLeft, Clock, Play, Grid, List, Loader2,
//   AlertCircle, UserPlus, UserCheck, Eye, Music, Video,
//   Quote, Image as ImageIcon, Twitter, Facebook, Instagram,
//   Youtube, Globe, ExternalLink
// } from 'lucide-react'
// import authorAPI from '../../api/authorAPI'
// import userAPI from '../../api/userAPI'

// const AuthorDetailPage = () => {
//   // Get slug from URL params
//   const { slug } = useParams()
//   const navigate = useNavigate()
//   const { t } = useTranslation()
//   const queryClient = useQueryClient()
//   const { user } = useSelector(state => state.auth)
  
//   const [activeTab, setActiveTab] = useState('works')
//   const [viewMode, setViewMode] = useState('grid')
//   const [poemsPage, setPoemsPage] = useState(1)
//   const [booksPage, setBooksPage] = useState(1)

//   // Fetch author data using slug
//   const { 
//     data: authorData, 
//     isLoading: authorLoading, 
//     error: authorError 
//   } = useQuery({
//     queryKey: ['author', slug],
//     queryFn: () => authorAPI.getAuthor(slug),
//     enabled: !!slug,
//     retry: 1
//   })

//   // Extract author from response (handle nested data structures)
//   const author = authorData?.data || authorData

//   // ============================================
//   // FETCH AUTHOR CONTENT USING SLUG
//   // ============================================
  
//   // Fetch author's poems using slug
//   const { 
//     data: poemsResponse, 
//     isLoading: poemsLoading 
//   } = useQuery({
//     queryKey: ['author-poems', slug, poemsPage],
//     queryFn: () => authorAPI.getAuthorPoems(slug, { page: poemsPage, limit: 12 }),
//     enabled: !!slug && (activeTab === 'works' || activeTab === 'works')
//   })

//   // Fetch author's books using slug
//   const { 
//     data: booksResponse, 
//     isLoading: booksLoading 
//   } = useQuery({
//     queryKey: ['author-books', slug, booksPage],
//     queryFn: () => authorAPI.getAuthorBooks(slug, { page: booksPage, limit: 8 }),
//     enabled: !!slug && activeTab === 'books'
//   })

//   // Fetch author's audio using slug
//   const { 
//     data: audioResponse, 
//     isLoading: audioLoading 
//   } = useQuery({
//     queryKey: ['author-audio', slug],
//     queryFn: () => authorAPI.getAuthorAudio(slug, { limit: 6 }),
//     enabled: !!slug && activeTab === 'audio'
//   })

//   // Fetch author's videos using slug
//   const { 
//     data: videosResponse, 
//     isLoading: videosLoading 
//   } = useQuery({
//     queryKey: ['author-videos', slug],
//     queryFn: () => authorAPI.getAuthorVideos(slug, { limit: 6 }),
//     enabled: !!slug && activeTab === 'videos'
//   })

//   // Fetch author's timeline using slug
//   const { 
//     data: timelineResponse, 
//     isLoading: timelineLoading 
//   } = useQuery({
//     queryKey: ['author-timeline', slug],
//     queryFn: () => authorAPI.getAuthorTimeline(slug),
//     enabled: !!slug && activeTab === 'timeline'
//   })

//   // Fetch author's gallery using slug
//   const { 
//     data: galleryResponse, 
//     isLoading: galleryLoading 
//   } = useQuery({
//     queryKey: ['author-gallery', slug],
//     queryFn: () => authorAPI.getAuthorGallery(slug),
//     enabled: !!slug && activeTab === 'gallery'
//   })

//   // Fetch author's quotes using slug
//   const { 
//     data: quotesResponse, 
//     isLoading: quotesLoading 
//   } = useQuery({
//     queryKey: ['author-quotes', slug],
//     queryFn: () => authorAPI.getAuthorQuotes(slug),
//     enabled: !!slug && activeTab === 'quotes'
//   })

//   // Extract data from responses (handle different nested structures)
//   const extractData = (response, defaultValue = []) => {
//     if (!response) return defaultValue
//     // Handle response.data.data structure
//     if (response.data?.data) return response.data.data
//     // Handle response.data structure
//     if (response.data) return response.data
//     // Handle direct array
//     if (Array.isArray(response)) return response
//     // Handle response with data property that is array
//     if (response.data && Array.isArray(response.data)) return response.data
//     return defaultValue
//   }

//   const extractPagination = (response) => {
//     if (!response) return { page: 1, totalPages: 1, total: 0 }
//     if (response.data?.pagination) return response.data.pagination
//     if (response.pagination) return response.pagination
//     return { page: 1, totalPages: 1, total: 0 }
//   }

//   const poems = extractData(poemsResponse, [])
//   const poemsPagination = extractPagination(poemsResponse)
  
//   const books = extractData(booksResponse, [])
//   const booksPagination = extractPagination(booksResponse)
  
//   const audioItems = extractData(audioResponse, [])
//   const videos = extractData(videosResponse, [])
//   const timeline = extractData(timelineResponse, [])
//   const gallery = extractData(galleryResponse, [])
//   const quotes = extractData(quotesResponse, [])

//   // Social links from author data
//   const socialLinks = author?.socialLinks || {}

//   // Follow mutation
//   const followMutation = useMutation({
//     mutationFn: () => userAPI.followAuthor(author?._id),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['author', slug])
//       toast.success(`Now following ${author?.name}`)
//     },
//     onError: () => toast.error('Failed to follow author')
//   })

//   // Unfollow mutation
//   const unfollowMutation = useMutation({
//     mutationFn: () => userAPI.unfollowAuthor(author?._id),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['author', slug])
//       toast.success(`Unfollowed ${author?.name}`)
//     },
//     onError: () => toast.error('Failed to unfollow author')
//   })

//   // Check if user is following this author
//   const isFollowing = user?.following?.includes(author?._id) || false

//   // Handle follow/unfollow
//   const handleFollowToggle = () => {
//     if (!user) {
//       toast.error('Please login to follow authors')
//       navigate('/login')
//       return
//     }
//     if (isFollowing) {
//       unfollowMutation.mutate()
//     } else {
//       followMutation.mutate()
//     }
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

//   // Format duration
//   const formatDuration = (seconds) => {
//     if (!seconds) return 'N/A'
//     const mins = Math.floor(seconds / 60)
//     const secs = seconds % 60
//     return `${mins}:${secs.toString().padStart(2, '0')}`
//   }

//   // Get counts for tabs
//   const getCounts = () => {
//     return {
//       poems: poemsPagination.total || poems.length,
//       books: booksPagination.total || books.length,
//       audio: audioItems.length,
//       videos: videos.length,
//       timeline: timeline.length,
//       gallery: gallery.length,
//       quotes: quotes.length
//     }
//   }

//   const counts = getCounts()

//   // Tabs configuration
//   const tabs = [
//     { id: 'works', label: 'Poems', icon: BookOpen, count: counts.poems },
//     { id: 'books', label: 'Books', icon: BookOpen, count: counts.books },
//     { id: 'audio', label: 'Audio', icon: Music, count: counts.audio },
//     { id: 'videos', label: 'Videos', icon: Video, count: counts.videos },
//     { id: 'timeline', label: 'Timeline', icon: Calendar, count: counts.timeline },
//     { id: 'gallery', label: 'Gallery', icon: ImageIcon, count: counts.gallery },
//     { id: 'quotes', label: 'Quotes', icon: Quote, count: counts.quotes }
//   ]

//   // Filter tabs to only show those with content
//   const visibleTabs = tabs.filter(tab => tab.count > 0 || tab.id === 'works')

//   // Loading state
//   if (authorLoading) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
//           <p className="text-gray-500">Loading author...</p>
//         </div>
//       </div>
//     )
//   }

//   // Error state - author not found
//   if (authorError || !author) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Author Not Found</h1>
//           <p className="text-gray-500 mb-6">The author you are looking for does not exist.</p>
//           <Link to="/authors" className="btn-primary inline-flex items-center space-x-2">
//             <ChevronLeft className="h-4 w-4" />
//             <span>Browse All Authors</span>
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   // ============================================
//   // RENDER FUNCTIONS
//   // ============================================

//   const renderWorks = () => {
//     if (poemsLoading) {
//       return (
//         <div className="flex justify-center py-12">
//           <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//         </div>
//       )
//     }

//     if (poems.length === 0) {
//       return (
//         <div className="text-center py-12 text-gray-500">
//           No poems available for this author.
//         </div>
//       )
//     }

//     return (
//       <>
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="font-semibold text-gray-900">
//             Poems ({poemsPagination.total || poems.length})
//           </h3>
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
        
//         <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
//           {poems.map((poem) => (
//             <Link
//               key={poem._id}
//               to={`/poem/${poem.slug}`}
//               className="card p-4 hover:shadow-md transition-all hover:-translate-y-0.5 group"
//             >
//               <div className="flex-1">
//                 <h4 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
//                   {poem.title}
//                 </h4>
//                 {poem.contentUrdu && (
//                   <p className="urdu-text text-sm text-gray-500 line-clamp-1 mt-1" dir="rtl">
//                     {poem.contentUrdu.substring(0, 50)}...
//                   </p>
//                 )}
//                 <div className="flex flex-wrap items-center gap-3 mt-2">
//                   <span className="text-xs text-gray-500 capitalize px-2 py-0.5 bg-gray-100 rounded-full">
//                     {poem.genre}
//                   </span>
//                   <div className="flex items-center gap-2 text-xs text-gray-400">
//                     <span className="flex items-center gap-1">
//                       <Eye className="h-3 w-3" />
//                       {poem.stats?.views?.toLocaleString() || 0}
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <Heart className="h-3 w-3" />
//                       {poem.stats?.likes?.toLocaleString() || 0}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {poemsPagination.totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-6">
//             <button
//               onClick={() => setPoemsPage(p => Math.max(1, p - 1))}
//               disabled={poemsPage === 1}
//               className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
//             >
//               Previous
//             </button>
//             <span className="px-3 py-1 text-sm text-gray-600">
//               {poemsPage} / {poemsPagination.totalPages}
//             </span>
//             <button
//               onClick={() => setPoemsPage(p => Math.min(poemsPagination.totalPages, p + 1))}
//               disabled={poemsPage === poemsPagination.totalPages}
//               className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </>
//     )
//   }

//   const renderBooks = () => {
//     if (booksLoading) {
//       return (
//         <div className="flex justify-center py-12">
//           <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//         </div>
//       )
//     }

//     if (books.length === 0) {
//       return (
//         <div className="text-center py-12 text-gray-500">
//           No books available for this author.
//         </div>
//       )
//     }

//     return (
//       <>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {books.map((book) => (
//             <Link
//               key={book._id}
//               to={`/book/${book.slug}`}
//               className="card p-4 hover:shadow-md transition-all hover:-translate-y-0.5"
//             >
//               {book.coverImage && (
//                 <img 
//                   src={book.coverImage} 
//                   alt={book.title}
//                   className="w-full h-40 object-cover rounded-lg mb-3"
//                 />
//               )}
//               <h4 className="font-medium text-gray-900 line-clamp-1">{book.title}</h4>
//               <p className="text-sm text-gray-500 line-clamp-2 mt-1">{book.description}</p>
//               <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
//                 <span className="capitalize">{book.type}</span>
//                 <span className="flex items-center gap-1">
//                   <Eye className="h-3 w-3" />
//                   {book.stats?.views?.toLocaleString() || 0}
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <Download className="h-3 w-3" />
//                   {book.stats?.downloads?.toLocaleString() || 0}
//                 </span>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {booksPagination.totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-6">
//             <button
//               onClick={() => setBooksPage(p => Math.max(1, p - 1))}
//               disabled={booksPage === 1}
//               className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
//             >
//               Previous
//             </button>
//             <span className="px-3 py-1 text-sm text-gray-600">
//               {booksPage} / {booksPagination.totalPages}
//             </span>
//             <button
//               onClick={() => setBooksPage(p => Math.min(booksPagination.totalPages, p + 1))}
//               disabled={booksPage === booksPagination.totalPages}
//               className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </>
//     )
//   }

//   const renderAudio = () => {
//     if (audioLoading) {
//       return (
//         <div className="flex justify-center py-12">
//           <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//         </div>
//       )
//     }

//     if (audioItems.length === 0) {
//       return (
//         <div className="text-center py-12 text-gray-500">
//           No audio available for this author.
//         </div>
//       )
//     }

//     return (
//       <div className="space-y-3">
//         {audioItems.map((audio) => (
//           <Link
//             key={audio._id}
//             to={`/audio/${audio.slug}`}
//             className="card p-4 hover:shadow-md transition-all flex items-center gap-4"
//           >
//             <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
//               <Play className="h-6 w-6 text-primary-600" />
//             </div>
//             <div className="flex-1">
//               <h4 className="font-medium text-gray-900">{audio.title}</h4>
//               <p className="text-sm text-gray-500 capitalize">{audio.type}</p>
//             </div>
//             <div className="text-sm text-gray-400">
//               {formatDuration(audio.duration)}
//             </div>
//           </Link>
//         ))}
//       </div>
//     )
//   }

//   const renderVideos = () => {
//     if (videosLoading) {
//       return (
//         <div className="flex justify-center py-12">
//           <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//         </div>
//       )
//     }

//     if (videos.length === 0) {
//       return (
//         <div className="text-center py-12 text-gray-500">
//           No videos available for this author.
//         </div>
//       )
//     }

//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {videos.map((video) => (
//           <Link
//             key={video._id}
//             to={`/video/${video.slug}`}
//             className="card overflow-hidden hover:shadow-md transition-all"
//           >
//             <div className="relative h-40 bg-gray-900">
//               {video.thumbnail ? (
//                 <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
//               ) : (
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <Play className="h-12 w-12 text-white/50" />
//                 </div>
//               )}
//             </div>
//             <div className="p-4">
//               <h4 className="font-medium text-gray-900 line-clamp-1">{video.title}</h4>
//               <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
//                 <span className="capitalize">{video.type}</span>
//                 <span className="flex items-center gap-1">
//                   <Eye className="h-3 w-3" />
//                   {video.stats?.views?.toLocaleString() || 0}
//                 </span>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     )
//   }

//   const renderTimeline = () => {
//     if (timelineLoading) {
//       return (
//         <div className="flex justify-center py-12">
//           <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//         </div>
//       )
//     }

//     if (timeline.length === 0) {
//       return (
//         <div className="text-center py-12 text-gray-500">
//           No timeline available for this author.
//         </div>
//       )
//     }

//     return (
//       <div className="card p-6">
//         <div className="space-y-6">
//           {timeline.map((event, index) => (
//             <div key={index} className="flex items-start space-x-4">
//               <div className="flex-shrink-0 w-20 text-right">
//                 <span className="font-bold text-primary-600">{event.year}</span>
//               </div>
//               <div className="flex-shrink-0 w-3 h-3 bg-primary-600 rounded-full mt-1.5" />
//               <div className="flex-1 pb-6 border-l-2 border-gray-200 pl-4 -ml-1.5">
//                 <p className="text-gray-700 font-medium">{event.event}</p>
//                 {event.description && (
//                   <p className="text-sm text-gray-500 mt-1">{event.description}</p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     )
//   }

//   const renderGallery = () => {
//     if (galleryLoading) {
//       return (
//         <div className="flex justify-center py-12">
//           <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//         </div>
//       )
//     }

//     if (gallery.length === 0) {
//       return (
//         <div className="text-center py-12 text-gray-500">
//           No gallery images available for this author.
//         </div>
//       )
//     }

//     return (
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {gallery.map((item, index) => (
//           <div key={index} className="card overflow-hidden hover:shadow-md transition-all cursor-pointer group">
//             <img 
//               src={item.url} 
//               alt={item.caption || `Image ${index + 1}`}
//               className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//             />
//             {item.caption && (
//               <div className="p-2">
//                 <p className="text-xs text-gray-500 line-clamp-2">{item.caption}</p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     )
//   }

//   const renderQuotes = () => {
//     if (quotesLoading) {
//       return (
//         <div className="flex justify-center py-12">
//           <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//         </div>
//       )
//     }

//     if (quotes.length === 0) {
//       return (
//         <div className="text-center py-12 text-gray-500">
//           No quotes available for this author.
//         </div>
//       )
//     }

//     return (
//       <div className="space-y-4">
//         {quotes.map((quote, index) => (
//           <div key={index} className="card p-6 border-l-4 border-primary-500">
//             <p className="text-lg text-gray-700 italic">"{quote.text}"</p>
//             {quote.source && (
//               <p className="text-sm text-gray-500 mt-2">— {quote.source}</p>
//             )}
//           </div>
//         ))}
//       </div>
//     )
//   }

//   const renderSocialLinks = () => {
//     const hasSocialLinks = Object.values(socialLinks).some(v => v)
    
//     if (!hasSocialLinks) return null

//     return (
//       <div className="mt-6 pt-6 border-t border-gray-200">
//         <h3 className="font-semibold text-gray-900 mb-3">Connect</h3>
//         <div className="flex flex-wrap gap-3">
//           {socialLinks.website && (
//             <a href={socialLinks.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600">
//               <Globe className="h-4 w-4" /> Website
//             </a>
//           )}
//           {socialLinks.twitter && (
//             <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-500">
//               <Twitter className="h-4 w-4" /> Twitter
//             </a>
//           )}
//           {socialLinks.facebook && (
//             <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-700">
//               <Facebook className="h-4 w-4" /> Facebook
//             </a>
//           )}
//           {socialLinks.instagram && (
//             <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-pink-600">
//               <Instagram className="h-4 w-4" /> Instagram
//             </a>
//           )}
//           {socialLinks.youtube && (
//             <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600">
//               <Youtube className="h-4 w-4" /> YouTube
//             </a>
//           )}
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Back Link */}
//         <div className="mb-6">
//           <Link 
//             to="/authors" 
//             className="inline-flex items-center space-x-1 text-sm text-gray-500 hover:text-primary-600 transition-colors"
//           >
//             <ChevronLeft className="h-4 w-4" />
//             <span>Back to Authors</span>
//           </Link>
//         </div>

//         {/* Cover & Profile */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="relative mb-8"
//         >
//           <div className="h-48 md:h-64 rounded-xl overflow-hidden">
//             {author.coverImage ? (
//               <img src={author.coverImage} alt="" className="w-full h-full object-cover" />
//             ) : (
//               <div className="w-full h-full bg-gradient-to-r from-primary-600 to-primary-800" />
//             )}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//           </div>
//           <div className="relative -mt-16 md:-mt-20 px-6 flex flex-col md:flex-row items-end md:items-center space-y-4 md:space-y-0 md:space-x-6">
//             <img
//               src={author.avatar || `https://ui-avatars.com/api/?name=${author.name}&background=8B4513&color=fff&size=128`}
//               alt={author.name}
//               className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover bg-white"
//             />
//             <div className="flex-1 pb-2">
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//                 <div>
//                   <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{author.name}</h1>
//                   {author.nameUrdu && (
//                     <p className="urdu-text text-lg text-gray-600" dir="rtl">{author.nameUrdu}</p>
//                   )}
//                   <div className="flex flex-wrap gap-2 mt-1">
//                     {author.era && (
//                       <span className="px-2 py-0.5 bg-primary-50 text-primary-700 text-xs rounded-full capitalize">
//                         {author.era} Era
//                       </span>
//                     )}
//                     {author.isVerified && (
//                       <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">
//                         ✓ Verified
//                       </span>
//                     )}
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-3 mt-4 md:mt-0">
//                   <button
//                     onClick={handleFollowToggle}
//                     disabled={followMutation.isPending || unfollowMutation.isPending}
//                     className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
//                       isFollowing
//                         ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                         : 'bg-primary-600 text-white hover:bg-primary-700'
//                     }`}
//                   >
//                     {isFollowing ? (
//                       <>
//                         <UserCheck className="h-4 w-4" />
//                         <span>Following</span>
//                       </>
//                     ) : (
//                       <>
//                         <UserPlus className="h-4 w-4" />
//                         <span>Follow</span>
//                       </>
//                     )}
//                   </button>
//                   <button 
//                     onClick={handleShare}
//                     className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
//                   >
//                     <Share2 className="h-5 w-5 text-gray-600" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//           {[
//             { icon: BookOpen, label: 'Poems', value: author.stats?.poemsCount || 0 },
//             { icon: BookOpen, label: 'Books', value: author.stats?.booksCount || 0 },
//             { icon: Users, label: 'Followers', value: (author.stats?.followers || 0).toLocaleString() },
//             { icon: Eye, label: 'Views', value: (author.stats?.views || 0).toLocaleString() },
//           ].map((stat, index) => (
//             <div key={index} className="card p-4 text-center">
//               <stat.icon className="h-6 w-6 text-primary-600 mx-auto mb-2" />
//               <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//               <p className="text-sm text-gray-500">{stat.label}</p>
//             </div>
//           ))}
//         </div>

//         {/* Bio & Info */}
//         <div className="grid md:grid-cols-3 gap-6 mb-8">
//           <div className="md:col-span-2">
//             <div className="card p-6">
//               <h2 className="font-semibold text-gray-900 mb-4">Biography</h2>
//               <p className="text-gray-700 leading-relaxed whitespace-pre-line">{author.bio}</p>
//               {author.bioUrdu && (
//                 <p className="urdu-text text-gray-700 leading-relaxed mt-4" dir="rtl">{author.bioUrdu}</p>
//               )}
//               <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100">
//                 {author.birthDate && (
//                   <span className="flex items-center space-x-1 text-sm text-gray-500">
//                     <Calendar className="h-4 w-4" />
//                     <span>
//                       {new Date(author.birthDate).getFullYear()} 
//                       {author.deathDate && ` - ${new Date(author.deathDate).getFullYear()}`}
//                     </span>
//                   </span>
//                 )}
//                 {author.birthPlace && (
//                   <span className="flex items-center space-x-1 text-sm text-gray-500">
//                     <MapPin className="h-4 w-4" />
//                     <span>{author.birthPlace}</span>
//                   </span>
//                 )}
//               </div>
//               {renderSocialLinks()}
//             </div>
//           </div>
//           <div>
//             <div className="card p-6">
//               <h3 className="font-semibold text-gray-900 mb-4">Genres</h3>
//               <div className="flex flex-wrap gap-2">
//                 {author.genres?.map((genre, index) => (
//                   <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-700 capitalize">
//                     {genre}
//                   </span>
//                 ))}
//                 {(!author.genres || author.genres.length === 0) && (
//                   <p className="text-gray-500 text-sm">No genres listed</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs - Only show tabs that have content */}
//         {visibleTabs.length > 1 && (
//           <div className="flex overflow-x-auto scrollbar-hide gap-1 mb-6 border-b border-gray-200">
//             {visibleTabs.map((tab) => {
//               const Icon = tab.icon
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
//                     activeTab === tab.id
//                       ? 'border-primary-600 text-primary-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//                 >
//                   <Icon className="h-4 w-4" />
//                   <span>{tab.label}</span>
//                   {tab.count > 0 && (
//                     <span className="ml-1 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
//                       {tab.count}
//                     </span>
//                   )}
//                 </button>
//               )
//             })}
//           </div>
//         )}

//         {/* Tab Content */}
//         <div className="mb-8">
//           {activeTab === 'works' && renderWorks()}
//           {activeTab === 'books' && renderBooks()}
//           {activeTab === 'audio' && renderAudio()}
//           {activeTab === 'videos' && renderVideos()}
//           {activeTab === 'timeline' && renderTimeline()}
//           {activeTab === 'gallery' && renderGallery()}
//           {activeTab === 'quotes' && renderQuotes()}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AuthorDetailPage
















// client/src/pages/public/AuthorDetailPage.jsx
import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import {
  Heart, Share2, BookOpen, Calendar, MapPin, Users,
  ChevronLeft, Clock, Play, Grid, List, Loader2,
  AlertCircle, UserPlus, UserCheck, Eye, Music, Video,
  Quote, Image as ImageIcon, Twitter, Facebook, Instagram,
  Youtube, Globe, ExternalLink, BookMarked, Headphones, Download
} from 'lucide-react'
import authorAPI from '../../api/authorAPI'
import userAPI from '../../api/userAPI'

const AuthorDetailPage = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { user } = useSelector(state => state.auth)
  
  const [activeTab, setActiveTab] = useState('works')
  const [viewMode, setViewMode] = useState('grid')
  const [poemsPage, setPoemsPage] = useState(1)
  const [booksPage, setBooksPage] = useState(1)

  // Fetch author data using slug
  const { 
    data: authorData, 
    isLoading: authorLoading, 
    error: authorError 
  } = useQuery({
    queryKey: ['author', slug],
    queryFn: () => authorAPI.getAuthor(slug),
    enabled: !!slug,
    retry: 1
  })

  const author = authorData?.data || authorData

  // ============================================
  // FETCH AUTHOR CONTENT USING SLUG
  // ============================================
  
  const { 
    data: poemsResponse, 
    isLoading: poemsLoading 
  } = useQuery({
    queryKey: ['author-poems', slug, poemsPage],
    queryFn: () => authorAPI.getAuthorPoems(slug, { page: poemsPage, limit: 12 }),
    enabled: !!slug
  })

  const { 
    data: booksResponse, 
    isLoading: booksLoading 
  } = useQuery({
    queryKey: ['author-books', slug, booksPage],
    queryFn: () => authorAPI.getAuthorBooks(slug, { page: booksPage, limit: 8 }),
    enabled: !!slug
  })

  const { 
    data: audioResponse, 
    isLoading: audioLoading 
  } = useQuery({
    queryKey: ['author-audio', slug],
    queryFn: () => authorAPI.getAuthorAudio(slug, { limit: 6 }),
    enabled: !!slug
  })

  const { 
    data: videosResponse, 
    isLoading: videosLoading 
  } = useQuery({
    queryKey: ['author-videos', slug],
    queryFn: () => authorAPI.getAuthorVideos(slug, { limit: 6 }),
    enabled: !!slug
  })

  const { 
    data: timelineResponse, 
    isLoading: timelineLoading 
  } = useQuery({
    queryKey: ['author-timeline', slug],
    queryFn: () => authorAPI.getAuthorTimeline(slug),
    enabled: !!slug
  })

  const { 
    data: galleryResponse, 
    isLoading: galleryLoading 
  } = useQuery({
    queryKey: ['author-gallery', slug],
    queryFn: () => authorAPI.getAuthorGallery(slug),
    enabled: !!slug
  })

  const { 
    data: quotesResponse, 
    isLoading: quotesLoading 
  } = useQuery({
    queryKey: ['author-quotes', slug],
    queryFn: () => authorAPI.getAuthorQuotes(slug),
    enabled: !!slug
  })

  // Extract data from responses
  const extractData = (response, defaultValue = []) => {
    if (!response) return defaultValue
    if (response.data?.data) return response.data.data
    if (response.data) return response.data
    if (Array.isArray(response)) return response
    if (response.data && Array.isArray(response.data)) return response.data
    return defaultValue
  }

  const extractPagination = (response) => {
    if (!response) return { page: 1, totalPages: 1, total: 0 }
    if (response.data?.pagination) return response.data.pagination
    if (response.pagination) return response.pagination
    return { page: 1, totalPages: 1, total: 0 }
  }

  const poems = extractData(poemsResponse, [])
  const poemsPagination = extractPagination(poemsResponse)
  
  const books = extractData(booksResponse, [])
  const booksPagination = extractPagination(booksResponse)
  
  const audioItems = extractData(audioResponse, [])
  const videos = extractData(videosResponse, [])
  const timeline = extractData(timelineResponse, [])
  const gallery = extractData(galleryResponse, [])
  const quotes = extractData(quotesResponse, [])

  const socialLinks = author?.socialLinks || {}

  // Follow mutation
  const followMutation = useMutation({
    mutationFn: () => userAPI.followAuthor(author?._id),
    onSuccess: () => {
      queryClient.invalidateQueries(['author', slug])
      toast.success(`Now following ${author?.name}`)
    },
    onError: () => toast.error('Failed to follow author')
  })

  const unfollowMutation = useMutation({
    mutationFn: () => userAPI.unfollowAuthor(author?._id),
    onSuccess: () => {
      queryClient.invalidateQueries(['author', slug])
      toast.success(`Unfollowed ${author?.name}`)
    },
    onError: () => toast.error('Failed to unfollow author')
  })

  const isFollowing = user?.following?.includes(author?._id) || false

  const handleFollowToggle = () => {
    if (!user) {
      toast.error('Please login to follow authors')
      navigate('/login')
      return
    }
    if (isFollowing) {
      unfollowMutation.mutate()
    } else {
      followMutation.mutate()
    }
  }

  const handleShare = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      toast.success('Link copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy link')
    }
  }

  const formatDuration = (seconds) => {
    if (!seconds) return 'N/A'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // ALL TABS - always show, even with 0 count
  const tabs = [
    { id: 'works', label: 'Poems', icon: BookOpen },
    { id: 'books', label: 'Books', icon: BookMarked },
    { id: 'audio', label: 'Audio', icon: Headphones },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'timeline', label: 'Timeline', icon: Calendar },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'quotes', label: 'Quotes', icon: Quote }
  ]

  // Loading state
  if (authorLoading) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-500">Loading author...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (authorError || !author) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Author Not Found</h1>
          <p className="text-gray-500 mb-6">The author you are looking for does not exist.</p>
          <Link to="/authors" className="btn-primary inline-flex items-center space-x-2">
            <ChevronLeft className="h-4 w-4" />
            <span>Browse All Authors</span>
          </Link>
        </div>
      </div>
    )
  }

  // ============================================
  // RENDER FUNCTIONS WITH EMPTY STATES
  // ============================================

  const EmptyState = ({ icon: Icon, title, message }) => (
    <div className="text-center py-16 bg-gray-50 rounded-xl">
      <Icon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500">{message}</p>
    </div>
  )

  const renderWorks = () => {
    if (poemsLoading) {
      return (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </div>
      )
    }

    if (poems.length === 0) {
      return (
        <EmptyState 
          icon={BookOpen}
          title="No Poems Yet"
          message="Poems by this author will appear here once added."
        />
      )
    }

    return (
      <>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-900">
            Poems ({poemsPagination.total || poems.length})
          </h3>
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
        
        <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {poems.map((poem) => (
            <Link
              key={poem._id}
              to={`/poem/${poem.slug}`}
              className="card p-4 hover:shadow-md transition-all hover:-translate-y-0.5 group"
            >
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                  {poem.title}
                </h4>
                {poem.contentUrdu && (
                  <p className="urdu-text text-sm text-gray-500 line-clamp-1 mt-1" dir="rtl">
                    {poem.contentUrdu.substring(0, 50)}...
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <span className="text-xs text-gray-500 capitalize px-2 py-0.5 bg-gray-100 rounded-full">
                    {poem.genre}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {poem.stats?.views?.toLocaleString() || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {poem.stats?.likes?.toLocaleString() || 0}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {poemsPagination.totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <button
              onClick={() => setPoemsPage(p => Math.max(1, p - 1))}
              disabled={poemsPage === 1}
              className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-sm text-gray-600">
              {poemsPage} / {poemsPagination.totalPages}
            </span>
            <button
              onClick={() => setPoemsPage(p => Math.min(poemsPagination.totalPages, p + 1))}
              disabled={poemsPage === poemsPagination.totalPages}
              className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </>
    )
  }

  const renderBooks = () => {
    if (booksLoading) {
      return (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </div>
      )
    }

    if (books.length === 0) {
      return (
        <EmptyState 
          icon={BookMarked}
          title="No Books Available"
          message="Books by this author will appear here once added."
        />
      )
    }

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <Link
              key={book._id}
              to={`/book/${book.slug}`}
              className="card p-4 hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              {book.coverImage && (
                <img 
                  src={book.coverImage} 
                  alt={book.title}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
              )}
              <h4 className="font-medium text-gray-900 line-clamp-1">{book.title}</h4>
              <p className="text-sm text-gray-500 line-clamp-2 mt-1">{book.description}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                <span className="capitalize">{book.type}</span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {book.stats?.views?.toLocaleString() || 0}
                </span>
                <span className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  {book.stats?.downloads?.toLocaleString() || 0}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {booksPagination.totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <button
              onClick={() => setBooksPage(p => Math.max(1, p - 1))}
              disabled={booksPage === 1}
              className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-sm text-gray-600">
              {booksPage} / {booksPagination.totalPages}
            </span>
            <button
              onClick={() => setBooksPage(p => Math.min(booksPagination.totalPages, p + 1))}
              disabled={booksPage === booksPagination.totalPages}
              className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </>
    )
  }

  const renderAudio = () => {
    if (audioLoading) {
      return (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </div>
      )
    }

    if (audioItems.length === 0) {
      return (
        <EmptyState 
          icon={Headphones}
          title="No Audio Content"
          message="Audio recordings will appear here once added."
        />
      )
    }

    return (
      <div className="space-y-3">
        {audioItems.map((audio) => (
          <Link
            key={audio._id}
            to={`/audio/${audio.slug}`}
            className="card p-4 hover:shadow-md transition-all flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
              <Play className="h-6 w-6 text-primary-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{audio.title}</h4>
              <p className="text-sm text-gray-500 capitalize">{audio.type}</p>
            </div>
            <div className="text-sm text-gray-400">
              {formatDuration(audio.duration)}
            </div>
          </Link>
        ))}
      </div>
    )
  }

  const renderVideos = () => {
    if (videosLoading) {
      return (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </div>
      )
    }

    if (videos.length === 0) {
      return (
        <EmptyState 
          icon={Video}
          title="No Video Content"
          message="Videos will appear here once added."
        />
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <Link
            key={video._id}
            to={`/video/${video.slug}`}
            className="card overflow-hidden hover:shadow-md transition-all"
          >
            <div className="relative h-40 bg-gray-900">
              {video.thumbnail ? (
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="h-12 w-12 text-white/50" />
                </div>
              )}
            </div>
            <div className="p-4">
              <h4 className="font-medium text-gray-900 line-clamp-1">{video.title}</h4>
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                <span className="capitalize">{video.type}</span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {video.stats?.views?.toLocaleString() || 0}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    )
  }

  const renderTimeline = () => {
    if (timelineLoading) {
      return (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </div>
      )
    }

    if (timeline.length === 0) {
      return (
        <EmptyState 
          icon={Calendar}
          title="No Timeline Events"
          message="Important life events will be added to the timeline."
        />
      )
    }

    return (
      <div className="card p-6">
        <div className="space-y-6">
          {timeline.map((event, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-20 text-right">
                <span className="font-bold text-primary-600">{event.year}</span>
              </div>
              <div className="flex-shrink-0 w-3 h-3 bg-primary-600 rounded-full mt-1.5" />
              <div className="flex-1 pb-6 border-l-2 border-gray-200 pl-4 -ml-1.5">
                <p className="text-gray-700 font-medium">{event.event}</p>
                {event.description && (
                  <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderGallery = () => {
    if (galleryLoading) {
      return (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </div>
      )
    }

    if (gallery.length === 0) {
      return (
        <EmptyState 
          icon={ImageIcon}
          title="No Gallery Images"
          message="Images will appear here once added to the gallery."
        />
      )
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((item, index) => (
          <div key={index} className="card overflow-hidden hover:shadow-md transition-all cursor-pointer group">
            <img 
              src={item.url} 
              alt={item.caption || `Image ${index + 1}`}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {item.caption && (
              <div className="p-2">
                <p className="text-xs text-gray-500 line-clamp-2">{item.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  const renderQuotes = () => {
    if (quotesLoading) {
      return (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </div>
      )
    }

    if (quotes.length === 0) {
      return (
        <EmptyState 
          icon={Quote}
          title="No Quotes Available"
          message="Famous quotes by this author will appear here."
        />
      )
    }

    return (
      <div className="space-y-4">
        {quotes.map((quote, index) => (
          <div key={index} className="card p-6 border-l-4 border-primary-500">
            <p className="text-lg text-gray-700 italic">"{quote.text}"</p>
            {quote.source && (
              <p className="text-sm text-gray-500 mt-2">— {quote.source}</p>
            )}
          </div>
        ))}
      </div>
    )
  }

  const renderSocialLinks = () => {
    const hasSocialLinks = Object.values(socialLinks).some(v => v)
    
    if (!hasSocialLinks) return null

    return (
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3">Connect</h3>
        <div className="flex flex-wrap gap-3">
          {socialLinks.website && (
            <a href={socialLinks.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600">
              <Globe className="h-4 w-4" /> Website
            </a>
          )}
          {socialLinks.twitter && (
            <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-500">
              <Twitter className="h-4 w-4" /> Twitter
            </a>
          )}
          {socialLinks.facebook && (
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-700">
              <Facebook className="h-4 w-4" /> Facebook
            </a>
          )}
          {socialLinks.instagram && (
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-pink-600">
              <Instagram className="h-4 w-4" /> Instagram
            </a>
          )}
          {socialLinks.youtube && (
            <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600">
              <Youtube className="h-4 w-4" /> YouTube
            </a>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link 
            to="/authors" 
            className="inline-flex items-center space-x-1 text-sm text-gray-500 hover:text-primary-600 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Authors</span>
          </Link>
        </div>

        {/* Cover & Profile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative mb-8"
        >
          <div className="h-48 md:h-64 rounded-xl overflow-hidden">
            {author.coverImage ? (
              <img src={author.coverImage} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-primary-600 to-primary-800" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="relative -mt-16 md:-mt-20 px-6 flex flex-col md:flex-row items-end md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={author.avatar || `https://ui-avatars.com/api/?name=${author.name}&background=8B4513&color=fff&size=128`}
              alt={author.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover bg-white"
            />
            <div className="flex-1 pb-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{author.name}</h1>
                  {author.nameUrdu && (
                    <p className="urdu-text text-lg text-gray-600" dir="rtl">{author.nameUrdu}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-1">
                    {author.era && (
                      <span className="px-2 py-0.5 bg-primary-50 text-primary-700 text-xs rounded-full capitalize">
                        {author.era} Era
                      </span>
                    )}
                    {author.isVerified && (
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3 mt-4 md:mt-0">
                  <button
                    onClick={handleFollowToggle}
                    disabled={followMutation.isPending || unfollowMutation.isPending}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                      isFollowing
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                  >
                    {isFollowing ? (
                      <>
                        <UserCheck className="h-4 w-4" />
                        <span>Following</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4" />
                        <span>Follow</span>
                      </>
                    )}
                  </button>
                  <button 
                    onClick={handleShare}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    <Share2 className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: BookOpen, label: 'Poems', value: author.stats?.poemsCount || 0 },
            { icon: BookMarked, label: 'Books', value: author.stats?.booksCount || 0 },
            { icon: Users, label: 'Followers', value: (author.stats?.followers || 0).toLocaleString() },
            { icon: Eye, label: 'Views', value: (author.stats?.views || 0).toLocaleString() },
          ].map((stat, index) => (
            <div key={index} className="card p-4 text-center">
              <stat.icon className="h-6 w-6 text-primary-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Bio & Info */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <div className="card p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Biography</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{author.bio}</p>
              {author.bioUrdu && (
                <p className="urdu-text text-gray-700 leading-relaxed mt-4" dir="rtl">{author.bioUrdu}</p>
              )}
              <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100">
                {author.birthDate && (
                  <span className="flex items-center space-x-1 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(author.birthDate).getFullYear()} 
                      {author.deathDate && ` - ${new Date(author.deathDate).getFullYear()}`}
                    </span>
                  </span>
                )}
                {author.birthPlace && (
                  <span className="flex items-center space-x-1 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    <span>{author.birthPlace}</span>
                  </span>
                )}
              </div>
              {renderSocialLinks()}
            </div>
          </div>
          <div>
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {author.genres?.map((genre, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-700 capitalize">
                    {genre}
                  </span>
                ))}
                {(!author.genres || author.genres.length === 0) && (
                  <p className="text-gray-500 text-sm">No genres listed</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs - ALL TABS SHOWN, even with 0 content */}
        <div className="flex overflow-x-auto scrollbar-hide gap-1 mb-6 border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const counts = {
              works: poemsPagination.total || poems.length,
              books: booksPagination.total || books.length,
              audio: audioItems.length,
              videos: videos.length,
              timeline: timeline.length,
              gallery: gallery.length,
              quotes: quotes.length
            }
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
                <span className="ml-1 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
                  {counts[tab.id]}
                </span>
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className="mb-8">
          {activeTab === 'works' && renderWorks()}
          {activeTab === 'books' && renderBooks()}
          {activeTab === 'audio' && renderAudio()}
          {activeTab === 'videos' && renderVideos()}
          {activeTab === 'timeline' && renderTimeline()}
          {activeTab === 'gallery' && renderGallery()}
          {activeTab === 'quotes' && renderQuotes()}
        </div>
      </div>
    </div>
  )
}

export default AuthorDetailPage