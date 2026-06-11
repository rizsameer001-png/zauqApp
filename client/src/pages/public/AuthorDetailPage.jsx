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
//   Youtube, Globe, ExternalLink, BookMarked, Headphones, Download
// } from 'lucide-react'
// import authorAPI from '../../api/authorAPI'
// import userAPI from '../../api/userAPI'

// const AuthorDetailPage = () => {
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

//   const author = authorData?.data || authorData

//   // ============================================
//   // FETCH AUTHOR CONTENT USING SLUG
//   // ============================================
  
//   const { 
//     data: poemsResponse, 
//     isLoading: poemsLoading 
//   } = useQuery({
//     queryKey: ['author-poems', slug, poemsPage],
//     queryFn: () => authorAPI.getAuthorPoems(slug, { page: poemsPage, limit: 12 }),
//     enabled: !!slug
//   })

//   const { 
//     data: booksResponse, 
//     isLoading: booksLoading 
//   } = useQuery({
//     queryKey: ['author-books', slug, booksPage],
//     queryFn: () => authorAPI.getAuthorBooks(slug, { page: booksPage, limit: 8 }),
//     enabled: !!slug
//   })

//   const { 
//     data: audioResponse, 
//     isLoading: audioLoading 
//   } = useQuery({
//     queryKey: ['author-audio', slug],
//     queryFn: () => authorAPI.getAuthorAudio(slug, { limit: 6 }),
//     enabled: !!slug
//   })

//   const { 
//     data: videosResponse, 
//     isLoading: videosLoading 
//   } = useQuery({
//     queryKey: ['author-videos', slug],
//     queryFn: () => authorAPI.getAuthorVideos(slug, { limit: 6 }),
//     enabled: !!slug
//   })

//   const { 
//     data: timelineResponse, 
//     isLoading: timelineLoading 
//   } = useQuery({
//     queryKey: ['author-timeline', slug],
//     queryFn: () => authorAPI.getAuthorTimeline(slug),
//     enabled: !!slug
//   })

//   const { 
//     data: galleryResponse, 
//     isLoading: galleryLoading 
//   } = useQuery({
//     queryKey: ['author-gallery', slug],
//     queryFn: () => authorAPI.getAuthorGallery(slug),
//     enabled: !!slug
//   })

//   const { 
//     data: quotesResponse, 
//     isLoading: quotesLoading 
//   } = useQuery({
//     queryKey: ['author-quotes', slug],
//     queryFn: () => authorAPI.getAuthorQuotes(slug),
//     enabled: !!slug
//   })

//   // Extract data from responses
//   const extractData = (response, defaultValue = []) => {
//     if (!response) return defaultValue
//     if (response.data?.data) return response.data.data
//     if (response.data) return response.data
//     if (Array.isArray(response)) return response
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

//   const unfollowMutation = useMutation({
//     mutationFn: () => userAPI.unfollowAuthor(author?._id),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['author', slug])
//       toast.success(`Unfollowed ${author?.name}`)
//     },
//     onError: () => toast.error('Failed to unfollow author')
//   })

//   const isFollowing = user?.following?.includes(author?._id) || false

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

//   const handleShare = async () => {
//     const url = window.location.href
//     try {
//       await navigator.clipboard.writeText(url)
//       toast.success('Link copied to clipboard!')
//     } catch (err) {
//       toast.error('Failed to copy link')
//     }
//   }

//   const formatDuration = (seconds) => {
//     if (!seconds) return 'N/A'
//     const mins = Math.floor(seconds / 60)
//     const secs = seconds % 60
//     return `${mins}:${secs.toString().padStart(2, '0')}`
//   }

//   // ALL TABS - always show, even with 0 count
//   const tabs = [
//     { id: 'works', label: 'Poems', icon: BookOpen },
//     { id: 'books', label: 'Books', icon: BookMarked },
//     { id: 'audio', label: 'Audio', icon: Headphones },
//     { id: 'videos', label: 'Videos', icon: Video },
//     { id: 'timeline', label: 'Timeline', icon: Calendar },
//     { id: 'gallery', label: 'Gallery', icon: ImageIcon },
//     { id: 'quotes', label: 'Quotes', icon: Quote }
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

//   // Error state
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
//   // RENDER FUNCTIONS WITH EMPTY STATES
//   // ============================================

//   const EmptyState = ({ icon: Icon, title, message }) => (
//     <div className="text-center py-16 bg-gray-50 rounded-xl">
//       <Icon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//       <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
//       <p className="text-gray-500">{message}</p>
//     </div>
//   )

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
//         <EmptyState 
//           icon={BookOpen}
//           title="No Poems Yet"
//           message="Poems by this author will appear here once added."
//         />
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
//         <EmptyState 
//           icon={BookMarked}
//           title="No Books Available"
//           message="Books by this author will appear here once added."
//         />
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
//         <EmptyState 
//           icon={Headphones}
//           title="No Audio Content"
//           message="Audio recordings will appear here once added."
//         />
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
//         <EmptyState 
//           icon={Video}
//           title="No Video Content"
//           message="Videos will appear here once added."
//         />
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
//         <EmptyState 
//           icon={Calendar}
//           title="No Timeline Events"
//           message="Important life events will be added to the timeline."
//         />
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
//         <EmptyState 
//           icon={ImageIcon}
//           title="No Gallery Images"
//           message="Images will appear here once added to the gallery."
//         />
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
//         <EmptyState 
//           icon={Quote}
//           title="No Quotes Available"
//           message="Famous quotes by this author will appear here."
//         />
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
//             { icon: BookMarked, label: 'Books', value: author.stats?.booksCount || 0 },
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

//         {/* Tabs - ALL TABS SHOWN, even with 0 content */}
//         <div className="flex overflow-x-auto scrollbar-hide gap-1 mb-6 border-b border-gray-200">
//           {tabs.map((tab) => {
//             const Icon = tab.icon
//             const counts = {
//               works: poemsPagination.total || poems.length,
//               books: booksPagination.total || books.length,
//               audio: audioItems.length,
//               videos: videos.length,
//               timeline: timeline.length,
//               gallery: gallery.length,
//               quotes: quotes.length
//             }
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
//                 <span className="ml-1 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
//                   {counts[tab.id]}
//                 </span>
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


















// //working client/src/pages/public/AuthorDetailPage.jsx
// import React, { useState } from 'react'
// import { useParams, Link, useNavigate } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { useSelector } from 'react-redux'
// import toast from 'react-hot-toast'
// import {
//   Heart, Share2, BookOpen, Calendar, MapPin, Users,
//   ChevronLeft, Clock, Play, Grid, List, Loader2,
//   AlertCircle, UserPlus, UserCheck, Eye, Music, Video,
//   Quote, Image as ImageIcon, Twitter, Facebook, Instagram,
//   Youtube, Globe, ExternalLink, BookMarked, Headphones, Download,
//   Copy, Check, MessageCircle, Linkedin, Mail, X, ChevronDown,
//   Award, Star, TrendingUp, Zap, Sparkles, Crown, FileText, Volume2,
//   InstagramIcon, FacebookIcon, TwitterIcon, LinkedinIcon, Share
// } from 'lucide-react'
// import authorAPI from '../../api/authorAPI'
// import userAPI from '../../api/userAPI'

// const AuthorDetailPage = () => {
//   const { slug } = useParams()
//   const navigate = useNavigate()
//   const { t } = useTranslation()
//   const queryClient = useQueryClient()
//   const { user } = useSelector(state => state.auth)
  
//   const [activeTab, setActiveTab] = useState('works')
//   const [viewMode, setViewMode] = useState('grid')
//   const [poemsPage, setPoemsPage] = useState(1)
//   const [booksPage, setBooksPage] = useState(1)
//   const [showShareMenu, setShowShareMenu] = useState(false)
//   const [copiedLink, setCopiedLink] = useState(false)

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

//   const author = authorData?.data || authorData

//   // ============================================
//   // FETCH AUTHOR CONTENT USING SLUG
//   // ============================================
  
//   const { 
//     data: poemsResponse, 
//     isLoading: poemsLoading 
//   } = useQuery({
//     queryKey: ['author-poems', slug, poemsPage],
//     queryFn: () => authorAPI.getAuthorPoems(slug, { page: poemsPage, limit: 12 }),
//     enabled: !!slug
//   })

//   const { 
//     data: booksResponse, 
//     isLoading: booksLoading 
//   } = useQuery({
//     queryKey: ['author-books', slug, booksPage],
//     queryFn: () => authorAPI.getAuthorBooks(slug, { page: booksPage, limit: 8 }),
//     enabled: !!slug
//   })

//   const { 
//     data: audioResponse, 
//     isLoading: audioLoading 
//   } = useQuery({
//     queryKey: ['author-audio', slug],
//     queryFn: () => authorAPI.getAuthorAudio(slug, { limit: 6 }),
//     enabled: !!slug
//   })

//   const { 
//     data: videosResponse, 
//     isLoading: videosLoading 
//   } = useQuery({
//     queryKey: ['author-videos', slug],
//     queryFn: () => authorAPI.getAuthorVideos(slug, { limit: 6 }),
//     enabled: !!slug
//   })

//   const { 
//     data: timelineResponse, 
//     isLoading: timelineLoading 
//   } = useQuery({
//     queryKey: ['author-timeline', slug],
//     queryFn: () => authorAPI.getAuthorTimeline(slug),
//     enabled: !!slug
//   })

//   const { 
//     data: galleryResponse, 
//     isLoading: galleryLoading 
//   } = useQuery({
//     queryKey: ['author-gallery', slug],
//     queryFn: () => authorAPI.getAuthorGallery(slug),
//     enabled: !!slug
//   })

//   const { 
//     data: quotesResponse, 
//     isLoading: quotesLoading 
//   } = useQuery({
//     queryKey: ['author-quotes', slug],
//     queryFn: () => authorAPI.getAuthorQuotes(slug),
//     enabled: !!slug
//   })

//   // Extract data from responses
//   const extractData = (response, defaultValue = []) => {
//     if (!response) return defaultValue
//     if (response.data?.data) return response.data.data
//     if (response.data) return response.data
//     if (Array.isArray(response)) return response
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

//   const unfollowMutation = useMutation({
//     mutationFn: () => userAPI.unfollowAuthor(author?._id),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['author', slug])
//       toast.success(`Unfollowed ${author?.name}`)
//     },
//     onError: () => toast.error('Failed to unfollow author')
//   })

//   const isFollowing = user?.following?.includes(author?._id) || false

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

//   // ============================================
//   // SOCIAL SHARE FUNCTIONALITY
//   // ============================================
  
//   const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
//   const shareTitle = author ? `Check out ${author.name} on ZauqApp` : 'Check out this author on ZauqApp'
//   const shareText = author?.bio ? author.bio.substring(0, 100) : 'Explore the literary works of this renowned poet and author.'

//   const shareLinks = [
//     {
//       name: 'WhatsApp',
//       icon: MessageCircle,
//       color: 'bg-green-500 hover:bg-green-600',
//       url: `https://wa.me/?text=${encodeURIComponent(`${shareTitle}\n\n${shareText}\n\n${shareUrl}`)}`
//     },
//     {
//       name: 'Twitter',
//       icon: Twitter,
//       color: 'bg-[#1DA1F2] hover:bg-[#1a8cd8]',
//       url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`
//     },
//     {
//       name: 'Facebook',
//       icon: Facebook,
//       color: 'bg-[#1877F2] hover:bg-[#1664d9]',
//       url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
//     },
//     {
//       name: 'LinkedIn',
//       icon: Linkedin,
//       color: 'bg-[#0077B5] hover:bg-[#006396]',
//       url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
//     },
//     {
//       name: 'Email',
//       icon: Mail,
//       color: 'bg-gray-600 hover:bg-gray-700',
//       url: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`
//     }
//   ]

//   const copyToClipboard = async () => {
//     try {
//       await navigator.clipboard.writeText(shareUrl)
//       setCopiedLink(true)
//       toast.success('Link copied to clipboard!')
//       setTimeout(() => setCopiedLink(false), 2000)
//     } catch (err) {
//       toast.error('Failed to copy link')
//     }
//   }

//   const handleShare = () => {
//     setShowShareMenu(!showShareMenu)
//   }

//   const formatDuration = (seconds) => {
//     if (!seconds) return 'N/A'
//     const mins = Math.floor(seconds / 60)
//     const secs = seconds % 60
//     return `${mins}:${secs.toString().padStart(2, '0')}`
//   }

//   // ALL TABS - always show, even with 0 count
//   const tabs = [
//     { id: 'works', label: 'Poems', icon: BookOpen },
//     { id: 'books', label: 'Books', icon: BookMarked },
//     { id: 'audio', label: 'Audio', icon: Headphones },
//     { id: 'videos', label: 'Videos', icon: Video },
//     { id: 'timeline', label: 'Timeline', icon: Calendar },
//     { id: 'gallery', label: 'Gallery', icon: ImageIcon },
//     { id: 'quotes', label: 'Quotes', icon: Quote }
//   ]

//   // Loading state
//   if (authorLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="relative">
//             <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-amber-500 rounded-2xl animate-pulse mx-auto mb-6 flex items-center justify-center">
//               <Users className="h-10 w-10 text-white" />
//             </div>
//             <div className="absolute -top-2 -right-2">
//               <Sparkles className="h-6 w-6 text-amber-400 animate-spin" />
//             </div>
//           </div>
//           <p className="text-gray-600 font-medium">Loading author...</p>
//           <p className="text-sm text-gray-400 mt-1">Discovering literary greatness</p>
//         </div>
//       </div>
//     )
//   }

//   // Error state
//   if (authorError || !author) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
//         <div className="max-w-4xl mx-auto px-4 pt-32 pb-16 text-center">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-2xl mb-6">
//             <AlertCircle className="h-10 w-10 text-red-500" />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Author Not Found</h1>
//           <p className="text-gray-500 mb-6">The author you are looking for does not exist.</p>
//           <Link to="/authors" className="btn-primary inline-flex items-center gap-2">
//             <ChevronLeft className="h-4 w-4" />
//             <span>Browse All Authors</span>
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   // ============================================
//   // RENDER FUNCTIONS WITH EMPTY STATES
//   // ============================================

//   const EmptyState = ({ icon: Icon, title, message }) => (
//     <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
//       <Icon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//       <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
//       <p className="text-gray-500">{message}</p>
//     </div>
//   )

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
//         <EmptyState 
//           icon={BookOpen}
//           title="No Poems Yet"
//           message="Poems by this author will appear here once added."
//         />
//       )
//     }

//     return (
//       <>
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="font-semibold text-gray-900">
//             Poems ({poemsPagination.total || poems.length})
//           </h3>
//           <div className="flex border border-gray-200 rounded-lg overflow-hidden">
//             <button
//               onClick={() => setViewMode('grid')}
//               className={`p-2 transition-all ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
//             >
//               <Grid className="h-4 w-4" />
//             </button>
//             <button
//               onClick={() => setViewMode('list')}
//               className={`p-2 transition-all ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
//             >
//               <List className="h-4 w-4" />
//             </button>
//           </div>
//         </div>
        
//         <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
//           {poems.map((poem, index) => (
//             <motion.div
//               key={poem._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: Math.min(index * 0.05, 0.3) }}
//               whileHover={{ y: -4 }}
//             >
//               <Link
//                 to={`/poem/${poem.slug}`}
//                 className="block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all group"
//               >
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
//               </Link>
//             </motion.div>
//           ))}
//         </div>

//         {poemsPagination.totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-6">
//             <button
//               onClick={() => setPoemsPage(p => Math.max(1, p - 1))}
//               disabled={poemsPage === 1}
//               className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 transition-all"
//             >
//               Previous
//             </button>
//             <span className="px-3 py-1 text-sm text-gray-600">
//               {poemsPage} / {poemsPagination.totalPages}
//             </span>
//             <button
//               onClick={() => setPoemsPage(p => Math.min(poemsPagination.totalPages, p + 1))}
//               disabled={poemsPage === poemsPagination.totalPages}
//               className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 transition-all"
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
//         <EmptyState 
//           icon={BookMarked}
//           title="No Books Available"
//           message="Books by this author will appear here once added."
//         />
//       )
//     }

//     return (
//       <>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {books.map((book, index) => (
//             <motion.div
//               key={book._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: Math.min(index * 0.05, 0.3) }}
//               whileHover={{ y: -4 }}
//             >
//               <Link
//                 to={`/book/${book.slug}`}
//                 className="block bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group"
//               >
//                 {book.coverImage && (
//                   <div className="relative h-48 overflow-hidden">
//                     <img 
//                       src={book.coverImage} 
//                       alt={book.title}
//                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                     />
//                     {book.isPremium && (
//                       <div className="absolute top-2 right-2">
//                         <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-medium rounded-full">
//                           <Crown className="h-3 w-3" />
//                           Premium
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 )}
//                 <div className="p-4">
//                   <h4 className="font-medium text-gray-900 line-clamp-1">{book.title}</h4>
//                   <p className="text-sm text-gray-500 line-clamp-2 mt-1">{book.description}</p>
//                   <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
//                     <span className="capitalize">{book.type || 'Ebook'}</span>
//                     <span className="flex items-center gap-1">
//                       <Eye className="h-3 w-3" />
//                       {book.stats?.views?.toLocaleString() || 0}
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <Download className="h-3 w-3" />
//                       {book.stats?.downloads?.toLocaleString() || 0}
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>

//         {booksPagination.totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-6">
//             <button
//               onClick={() => setBooksPage(p => Math.max(1, p - 1))}
//               disabled={booksPage === 1}
//               className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 transition-all"
//             >
//               Previous
//             </button>
//             <span className="px-3 py-1 text-sm text-gray-600">
//               {booksPage} / {booksPagination.totalPages}
//             </span>
//             <button
//               onClick={() => setBooksPage(p => Math.min(booksPagination.totalPages, p + 1))}
//               disabled={booksPage === booksPagination.totalPages}
//               className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 transition-all"
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
//         <EmptyState 
//           icon={Headphones}
//           title="No Audio Content"
//           message="Audio recordings will appear here once added."
//         />
//       )
//     }

//     return (
//       <div className="space-y-3">
//         {audioItems.map((audio, index) => (
//           <motion.div
//             key={audio._id}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: Math.min(index * 0.05, 0.3) }}
//           >
//             <Link
//               to={`/audio/${audio.slug}`}
//               className="block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all flex items-center gap-4 group"
//             >
//               <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-amber-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
//                 <Play className="h-6 w-6 text-primary-600" />
//               </div>
//               <div className="flex-1">
//                 <h4 className="font-medium text-gray-900">{audio.title}</h4>
//                 <p className="text-sm text-gray-500 capitalize">{audio.type}</p>
//               </div>
//               <div className="text-sm text-gray-400">
//                 {formatDuration(audio.duration)}
//               </div>
//             </Link>
//           </motion.div>
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
//         <EmptyState 
//           icon={Video}
//           title="No Video Content"
//           message="Videos will appear here once added."
//         />
//       )
//     }

//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {videos.map((video, index) => (
//           <motion.div
//             key={video._id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: Math.min(index * 0.05, 0.3) }}
//             whileHover={{ y: -4 }}
//           >
//             <Link
//               to={`/video/${video.slug}`}
//               className="block bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group"
//             >
//               <div className="relative h-40 bg-gradient-to-br from-gray-900 to-gray-800">
//                 {video.thumbnail ? (
//                   <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
//                 ) : (
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <Play className="h-12 w-12 text-white/50" />
//                   </div>
//                 )}
//                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
//                 <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 rounded-md text-white text-xs">
//                   {formatDuration(video.duration)}
//                 </div>
//               </div>
//               <div className="p-4">
//                 <h4 className="font-medium text-gray-900 line-clamp-1">{video.title}</h4>
//                 <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
//                   <span className="capitalize">{video.type}</span>
//                   <span className="flex items-center gap-1">
//                     <Eye className="h-3 w-3" />
//                     {video.stats?.views?.toLocaleString() || 0}
//                   </span>
//                 </div>
//               </div>
//             </Link>
//           </motion.div>
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
//         <EmptyState 
//           icon={Calendar}
//           title="No Timeline Events"
//           message="Important life events will be added to the timeline."
//         />
//       )
//     }

//     return (
//       <div className="bg-white rounded-xl p-6 border border-gray-100">
//         <div className="space-y-6">
//           {timeline.map((event, index) => (
//             <div key={index} className="relative flex items-start">
//               <div className="flex-shrink-0 w-24">
//                 <span className="font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-full text-sm">
//                   {event.year}
//                 </span>
//               </div>
//               <div className="flex-shrink-0 w-0.5 bg-gradient-to-b from-primary-500 to-amber-500 h-full absolute left-28 top-0 bottom-0" />
//               <div className="flex-1 ml-8 pb-6">
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <p className="text-gray-800 font-medium">{event.event}</p>
//                   {event.description && (
//                     <p className="text-sm text-gray-500 mt-1">{event.description}</p>
//                   )}
//                 </div>
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
//         <EmptyState 
//           icon={ImageIcon}
//           title="No Gallery Images"
//           message="Images will appear here once added to the gallery."
//         />
//       )
//     }

//     return (
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {gallery.map((item, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: Math.min(index * 0.05, 0.3) }}
//             whileHover={{ scale: 1.05 }}
//             className="group cursor-pointer"
//           >
//             <div className="relative overflow-hidden rounded-xl shadow-sm">
//               <img 
//                 src={item.url} 
//                 alt={item.caption || `Image ${index + 1}`}
//                 className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
//               />
//               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
//               <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
//                 {item.caption && (
//                   <p className="text-white text-xs line-clamp-2">{item.caption}</p>
//                 )}
//               </div>
//             </div>
//           </motion.div>
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
//         <EmptyState 
//           icon={Quote}
//           title="No Quotes Available"
//           message="Famous quotes by this author will appear here."
//         />
//       )
//     }

//     return (
//       <div className="space-y-4">
//         {quotes.map((quote, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: Math.min(index * 0.05, 0.3) }}
//             className="bg-gradient-to-r from-primary-50 to-amber-50 rounded-xl p-6 border-l-4 border-primary-500"
//           >
//             <Quote className="h-8 w-8 text-primary-400 mb-3 opacity-50" />
//             <p className="text-lg text-gray-700 italic">"{quote.text}"</p>
//             {quote.source && (
//               <p className="text-sm text-gray-500 mt-3">— {quote.source}</p>
//             )}
//           </motion.div>
//         ))}
//       </div>
//     )
//   }

//   const renderSocialLinks = () => {
//     const hasSocialLinks = Object.values(socialLinks).some(v => v)
    
//     if (!hasSocialLinks) return null

//     const socialIcons = {
//       website: { icon: Globe, color: 'text-gray-600 hover:text-gray-900' },
//       twitter: { icon: Twitter, color: 'text-gray-600 hover:text-[#1DA1F2]' },
//       facebook: { icon: Facebook, color: 'text-gray-600 hover:text-[#1877F2]' },
//       instagram: { icon: Instagram, color: 'text-gray-600 hover:text-[#E4405F]' },
//       youtube: { icon: Youtube, color: 'text-gray-600 hover:text-[#FF0000]' },
//       wikipedia: { icon: ExternalLink, color: 'text-gray-600 hover:text-gray-900' }
//     }

//     return (
//       <div className="mt-6 pt-6 border-t border-gray-100">
//         <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//           <Share2 className="h-4 w-4 text-primary-600" />
//           Connect & Follow
//         </h3>
//         <div className="flex flex-wrap gap-3">
//           {Object.entries(socialLinks).map(([platform, url]) => {
//             if (!url) return null
//             const social = socialIcons[platform]
//             if (!social) return null
//             const Icon = social.icon
//             return (
//               <a
//                 key={platform}
//                 href={url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all ${social.color}`}
//               >
//                 <Icon className="h-4 w-4" />
//                 <span className="text-sm capitalize">{platform}</span>
//               </a>
//             )
//           })}
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        
//         {/* Back Link */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="mb-6"
//         >
//           <Link 
//             to="/authors" 
//             className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors group"
//           >
//             <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
//             <span>Back to Authors</span>
//           </Link>
//         </motion.div>

//         {/* Cover Section - With Author Name Inside */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="relative mb-16"
//         >
//           {/* Cover Image Container - 3:1 aspect ratio */}
//           <div className="relative w-full rounded-2xl overflow-hidden shadow-xl">
//             <div className="relative" style={{ paddingBottom: '33.33%' }}>
//               {author.coverImage ? (
//                 <>
//                   <img 
//                     src={author.coverImage} 
//                     alt={`${author.name} cover`}
//                     className="absolute inset-0 w-full h-full object-cover object-center"
//                   />
//                   {/* Dark Gradient Overlay for Text Readability */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
//                 </>
//               ) : (
//                 <div className="absolute inset-0 bg-gradient-to-r from-primary-800 via-primary-700 to-amber-800">
//                   <div className="absolute inset-0 opacity-20">
//                     <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full filter blur-3xl animate-pulse" />
//                     <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200 rounded-full filter blur-3xl animate-pulse delay-1000" />
//                   </div>
//                 </div>
//               )}
              
//               {/* Author Name Overlay - Inside Cover Image */}
//               <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10">
//                 <div className="space-y-2">
//                   {/* Roman Name */}
//                   <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
//                     {author.name}
//                   </h1>
//                   {/* Urdu Name */}
//                   {author.nameUrdu && (
//                     <p className="urdu-text text-xl md:text-2xl text-white/90 drop-shadow-lg" dir="rtl">
//                       {author.nameUrdu}
//                     </p>
//                   )}
//                   {/* Era & Verified Badges */}
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {author.era && (
//                       <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-xs md:text-sm font-medium">
//                         <Award className="h-3.5 w-3.5" />
//                         {author.era} Era
//                       </span>
//                     )}
//                     {author.isVerified && (
//                       <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/80 backdrop-blur-md rounded-full text-white text-xs md:text-sm font-medium">
//                         <Check className="h-3.5 w-3.5" />
//                         Verified Author
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           {/* Profile Image - Positioned Above Cover (overlapping) */}
//           <div className="absolute -bottom-12 left-6 md:left-8 z-20">
//             <div className="relative">
//               <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
//                 <img
//                   src={author.avatar || `https://ui-avatars.com/api/?name=${author.name}&background=8B4513&color=fff&size=128&bold=true`}
//                   alt={author.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               {author.isVerified && (
//                 <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 border-2 border-white">
//                   <Check className="h-3 w-3 text-white" />
//                 </div>
//               )}
//             </div>
//           </div>
//         </motion.div>

//         {/* Empty spacer to account for overlapping profile image */}
//         <div className="h-12 md:h-16"></div>

//         {/* Stats Cards - Premium Design */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
//         >
//           {[
//             { icon: BookOpen, label: 'Poems', value: author.stats?.poemsCount || 0, color: 'from-blue-500 to-blue-600' },
//             { icon: BookMarked, label: 'Books', value: author.stats?.booksCount || 0, color: 'from-purple-500 to-purple-600' },
//             { icon: Users, label: 'Followers', value: (author.stats?.followers || 0).toLocaleString(), color: 'from-amber-500 to-amber-600' },
//             { icon: Eye, label: 'Views', value: (author.stats?.views || 0).toLocaleString(), color: 'from-green-500 to-green-600' },
//           ].map((stat, index) => (
//             <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
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

//         {/* Action Buttons Row */}
//         <div className="flex justify-end items-center gap-3 mb-8">
//           <button
//             onClick={handleFollowToggle}
//             disabled={followMutation.isPending || unfollowMutation.isPending}
//             className={`px-6 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 ${
//               isFollowing
//                 ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 : 'bg-gradient-to-r from-primary-600 to-amber-500 text-white hover:shadow-lg hover:-translate-y-0.5'
//             }`}
//           >
//             {isFollowing ? (
//               <>
//                 <UserCheck className="h-4 w-4" />
//                 <span>Following</span>
//               </>
//             ) : (
//               <>
//                 <UserPlus className="h-4 w-4" />
//                 <span>Follow</span>
//               </>
//             )}
//           </button>
          
//           {/* Share Button with Menu */}
//           <div className="relative">
//             <button 
//               onClick={handleShare}
//               className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all hover:shadow-md"
//             >
//               <Share2 className="h-5 w-5 text-gray-600" />
//             </button>
            
//             <AnimatePresence>
//               {showShareMenu && (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.9, y: -10 }}
//                   animate={{ opacity: 1, scale: 1, y: 0 }}
//                   exit={{ opacity: 0, scale: 0.9, y: -10 }}
//                   className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden"
//                 >
//                   <div className="p-3 border-b border-gray-100">
//                     <p className="text-sm font-medium text-gray-700">Share this author</p>
//                   </div>
//                   <div className="p-2">
//                     {shareLinks.map((link) => (
//                       <a
//                         key={link.name}
//                         href={link.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         onClick={() => setShowShareMenu(false)}
//                         className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg ${link.color} text-white mb-1 transition-all hover:shadow-md`}
//                       >
//                         <link.icon className="h-4 w-4" />
//                         <span className="text-sm font-medium">{link.name}</span>
//                       </a>
//                     ))}
//                     <button
//                       onClick={copyToClipboard}
//                       className="flex items-center gap-3 w-full px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all mt-1"
//                     >
//                       {copiedLink ? (
//                         <>
//                           <Check className="h-4 w-4 text-green-600" />
//                           <span className="text-sm font-medium text-green-600">Copied!</span>
//                         </>
//                       ) : (
//                         <>
//                           <Copy className="h-4 w-4 text-gray-600" />
//                           <span className="text-sm font-medium text-gray-700">Copy Link</span>
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>

//         {/* Bio & Info Section */}
//         <div className="grid md:grid-cols-3 gap-6 mb-8">
//           <div className="md:col-span-2">
//             <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//               <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                 <Quote className="h-5 w-5 text-primary-600" />
//                 Biography
//               </h2>
//               <p className="text-gray-700 leading-relaxed whitespace-pre-line">{author.bio}</p>
//               {author.bioUrdu && (
//                 <p className="urdu-text text-gray-700 leading-relaxed mt-4 pt-4 border-t border-gray-100" dir="rtl">
//                   {author.bioUrdu}
//                 </p>
//               )}
//               <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100">
//                 {author.birthDate && (
//                   <span className="flex items-center gap-2 text-sm text-gray-500">
//                     <Calendar className="h-4 w-4 text-primary-500" />
//                     <span>
//                       {new Date(author.birthDate).getFullYear()} 
//                       {author.deathDate && ` - ${new Date(author.deathDate).getFullYear()}`}
//                     </span>
//                   </span>
//                 )}
//                 {author.birthPlace && (
//                   <span className="flex items-center gap-2 text-sm text-gray-500">
//                     <MapPin className="h-4 w-4 text-primary-500" />
//                     <span>{author.birthPlace}</span>
//                   </span>
//                 )}
//               </div>
//               {renderSocialLinks()}
//             </div>
//           </div>
          
//           <div>
//             <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//               <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                 <Star className="h-5 w-5 text-amber-500" />
//                 Literary Genres
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {author.genres?.map((genre, index) => (
//                   <span key={index} className="px-3 py-1.5 bg-gradient-to-r from-primary-50 to-amber-50 rounded-full text-sm text-gray-700 capitalize">
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

//         {/* Tabs - Premium Design */}
//         <div className="flex overflow-x-auto scrollbar-hide gap-1 mb-6 border-b border-gray-200">
//           {tabs.map((tab) => {
//             const Icon = tab.icon
//             const counts = {
//               works: poemsPagination.total || poems.length,
//               books: booksPagination.total || books.length,
//               audio: audioItems.length,
//               videos: videos.length,
//               timeline: timeline.length,
//               gallery: gallery.length,
//               quotes: quotes.length
//             }
//             return (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center gap-2 px-5 py-3 text-sm font-medium whitespace-nowrap transition-all ${
//                   activeTab === tab.id
//                     ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50/30'
//                     : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
//                 }`}
//               >
//                 <Icon className="h-4 w-4" />
//                 <span>{tab.label}</span>
//                 <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${
//                   activeTab === tab.id ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600'
//                 }`}>
//                   {counts[tab.id]}
//                 </span>
//               </button>
//             )
//           })}
//         </div>

//         {/* Tab Content */}
//         <motion.div
//           key={activeTab}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//           className="mb-8"
//         >
//           {activeTab === 'works' && renderWorks()}
//           {activeTab === 'books' && renderBooks()}
//           {activeTab === 'audio' && renderAudio()}
//           {activeTab === 'videos' && renderVideos()}
//           {activeTab === 'timeline' && renderTimeline()}
//           {activeTab === 'gallery' && renderGallery()}
//           {activeTab === 'quotes' && renderQuotes()}
//         </motion.div>
//       </div>
//     </div>
//   )
// }

// export default AuthorDetailPage

























// // working audio video on the AuthorDetailPage
// // client/src/pages/public/AuthorDetailPage.jsx
// import React, { useState } from 'react'
// import { useParams, Link, useNavigate } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { useSelector } from 'react-redux'
// import toast from 'react-hot-toast'
// import {
//   Heart, Share2, BookOpen, Calendar, MapPin, Users,
//   ChevronLeft, Clock, Play, Grid, List, Loader2,
//   AlertCircle, UserPlus, UserCheck, Eye, Music, Video,
//   Quote, Image as ImageIcon, Twitter, Facebook, Instagram,
//   Youtube, Globe, ExternalLink, BookMarked, Headphones, Download,
//   Copy, Check, MessageCircle, Linkedin, Mail, X, ChevronDown,
//   Award, Star, TrendingUp, Zap, Sparkles, Crown, FileText, Volume2,
//   InstagramIcon, FacebookIcon, TwitterIcon, LinkedinIcon, Share,
//   Pause, VolumeX, FileVideo
// } from 'lucide-react'
// import authorAPI from '../../api/authorAPI'
// import userAPI from '../../api/userAPI'

// const AuthorDetailPage = () => {
//   const { slug } = useParams()
//   const navigate = useNavigate()
//   const { t } = useTranslation()
//   const queryClient = useQueryClient()
//   const { user } = useSelector(state => state.auth)

//   const [activeTab, setActiveTab] = useState('works')
//   const [viewMode, setViewMode] = useState('grid')
//   const [poemsPage, setPoemsPage] = useState(1)
//   const [booksPage, setBooksPage] = useState(1)
//   const [showShareMenu, setShowShareMenu] = useState(false)
//   const [copiedLink, setCopiedLink] = useState(false)

//   // ============================================
//   // VIDEO & AUDIO PLAYER MODAL STATE
//   // ============================================
//   const [playerModal, setPlayerModal] = useState({
//     isOpen: false,
//     type: null, // 'video' | 'audio'
//     item: null
//   })

//   // Check if URL is YouTube
//   const isYouTubeUrl = (url) => {
//     if (!url) return false
//     return url.includes('youtube.com') || url.includes('youtu.be')
//   }

//   // Get YouTube embed URL
//   const getYouTubeEmbedUrl = (url) => {
//     const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)?.[1]
//     return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1` : url
//   }

//   // Open player modal
//   const openPlayer = (item, type) => {
//     if (!item?.videoUrl && !item?.audioUrl) {
//       // Fallback: navigate to detail page if no direct URL
//       navigate(`/${type}/${item.slug}`)
//       return
//     }
//     setPlayerModal({ isOpen: true, type, item })
//   }

//   // Close player modal
//   const closePlayer = () => {
//     setPlayerModal({ isOpen: false, type: null, item: null })
//   }

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

//   const author = authorData?.data || authorData

//   // ============================================
//   // FETCH AUTHOR CONTENT USING SLUG
//   // ============================================

//   const { 
//     data: poemsResponse, 
//     isLoading: poemsLoading 
//   } = useQuery({
//     queryKey: ['author-poems', slug, poemsPage],
//     queryFn: () => authorAPI.getAuthorPoems(slug, { page: poemsPage, limit: 12 }),
//     enabled: !!slug
//   })

//   const { 
//     data: booksResponse, 
//     isLoading: booksLoading 
//   } = useQuery({
//     queryKey: ['author-books', slug, booksPage],
//     queryFn: () => authorAPI.getAuthorBooks(slug, { page: booksPage, limit: 8 }),
//     enabled: !!slug
//   })

//   const { 
//     data: audioResponse, 
//     isLoading: audioLoading 
//   } = useQuery({
//     queryKey: ['author-audio', slug],
//     queryFn: () => authorAPI.getAuthorAudio(slug, { limit: 6 }),
//     enabled: !!slug
//   })

//   const { 
//     data: videosResponse, 
//     isLoading: videosLoading 
//   } = useQuery({
//     queryKey: ['author-videos', slug],
//     queryFn: () => authorAPI.getAuthorVideos(slug, { limit: 6 }),
//     enabled: !!slug
//   })

//   const { 
//     data: timelineResponse, 
//     isLoading: timelineLoading 
//   } = useQuery({
//     queryKey: ['author-timeline', slug],
//     queryFn: () => authorAPI.getAuthorTimeline(slug),
//     enabled: !!slug
//   })

//   const { 
//     data: galleryResponse, 
//     isLoading: galleryLoading 
//   } = useQuery({
//     queryKey: ['author-gallery', slug],
//     queryFn: () => authorAPI.getAuthorGallery(slug),
//     enabled: !!slug
//   })

//   const { 
//     data: quotesResponse, 
//     isLoading: quotesLoading 
//   } = useQuery({
//     queryKey: ['author-quotes', slug],
//     queryFn: () => authorAPI.getAuthorQuotes(slug),
//     enabled: !!slug
//   })

//   // Extract data from responses
//   const extractData = (response, defaultValue = []) => {
//     if (!response) return defaultValue
//     if (response.data?.data) return response.data.data
//     if (response.data) return response.data
//     if (Array.isArray(response)) return response
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

//   const unfollowMutation = useMutation({
//     mutationFn: () => userAPI.unfollowAuthor(author?._id),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['author', slug])
//       toast.success(`Unfollowed ${author?.name}`)
//     },
//     onError: () => toast.error('Failed to unfollow author')
//   })

//   const isFollowing = user?.following?.includes(author?._id) || false

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

//   // ============================================
//   // SOCIAL SHARE FUNCTIONALITY
//   // ============================================

//   const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
//   const shareTitle = author ? `Check out ${author.name} on ZauqApp` : 'Check out this author on ZauqApp'
//   const shareText = author?.bio ? author.bio.substring(0, 100) : 'Explore the literary works of this renowned poet and author.'

//   const shareLinks = [
//     {
//       name: 'WhatsApp',
//       icon: MessageCircle,
//       color: 'bg-green-500 hover:bg-green-600',
//       url: `https://wa.me/?text=${encodeURIComponent(`${shareTitle}\n\n${shareText}\n\n${shareUrl}`)}`
//     },
//     {
//       name: 'Twitter',
//       icon: Twitter,
//       color: 'bg-[#1DA1F2] hover:bg-[#1a8cd8]',
//       url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`
//     },
//     {
//       name: 'Facebook',
//       icon: Facebook,
//       color: 'bg-[#1877F2] hover:bg-[#1664d9]',
//       url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
//     },
//     {
//       name: 'LinkedIn',
//       icon: Linkedin,
//       color: 'bg-[#0077B5] hover:bg-[#006396]',
//       url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
//     },
//     {
//       name: 'Email',
//       icon: Mail,
//       color: 'bg-gray-600 hover:bg-gray-700',
//       url: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`
//     }
//   ]

//   const copyToClipboard = async () => {
//     try {
//       await navigator.clipboard.writeText(shareUrl)
//       setCopiedLink(true)
//       toast.success('Link copied to clipboard!')
//       setTimeout(() => setCopiedLink(false), 2000)
//     } catch (err) {
//       toast.error('Failed to copy link')
//     }
//   }

//   const handleShare = () => {
//     setShowShareMenu(!showShareMenu)
//   }

//   const formatDuration = (seconds) => {
//     if (!seconds) return 'N/A'
//     const mins = Math.floor(seconds / 60)
//     const secs = seconds % 60
//     return `${mins}:${secs.toString().padStart(2, '0')}`
//   }

//   // ALL TABS - always show, even with 0 count
//   const tabs = [
//     { id: 'works', label: 'Poems', icon: BookOpen },
//     { id: 'books', label: 'Books', icon: BookMarked },
//     { id: 'audio', label: 'Audio', icon: Headphones },
//     { id: 'videos', label: 'Videos', icon: Video },
//     { id: 'timeline', label: 'Timeline', icon: Calendar },
//     { id: 'gallery', label: 'Gallery', icon: ImageIcon },
//     { id: 'quotes', label: 'Quotes', icon: Quote }
//   ]

//   // Loading state
//   if (authorLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="relative">
//             <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-amber-500 rounded-2xl animate-pulse mx-auto mb-6 flex items-center justify-center">
//               <Users className="h-10 w-10 text-white" />
//             </div>
//             <div className="absolute -top-2 -right-2">
//               <Sparkles className="h-6 w-6 text-amber-400 animate-spin" />
//             </div>
//           </div>
//           <p className="text-gray-600 font-medium">Loading author...</p>
//           <p className="text-sm text-gray-400 mt-1">Discovering literary greatness</p>
//         </div>
//       </div>
//     )
//   }

//   // Error state
//   if (authorError || !author) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
//         <div className="max-w-4xl mx-auto px-4 pt-32 pb-16 text-center">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-2xl mb-6">
//             <AlertCircle className="h-10 w-10 text-red-500" />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Author Not Found</h1>
//           <p className="text-gray-500 mb-6">The author you are looking for does not exist.</p>
//           <Link to="/authors" className="btn-primary inline-flex items-center gap-2">
//             <ChevronLeft className="h-4 w-4" />
//             <span>Browse All Authors</span>
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   // ============================================
//   // RENDER FUNCTIONS WITH EMPTY STATES
//   // ============================================

//   const EmptyState = ({ icon: Icon, title, message }) => (
//     <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
//       <Icon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//       <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
//       <p className="text-gray-500">{message}</p>
//     </div>
//   )

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
//         <EmptyState 
//           icon={BookOpen}
//           title="No Poems Yet"
//           message="Poems by this author will appear here once added."
//         />
//       )
//     }

//     return (
//       <>
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="font-semibold text-gray-900">
//             Poems ({poemsPagination.total || poems.length})
//           </h3>
//           <div className="flex border border-gray-200 rounded-lg overflow-hidden">
//             <button
//               onClick={() => setViewMode('grid')}
//               className={`p-2 transition-all ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
//             >
//               <Grid className="h-4 w-4" />
//             </button>
//             <button
//               onClick={() => setViewMode('list')}
//               className={`p-2 transition-all ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
//             >
//               <List className="h-4 w-4" />
//             </button>
//           </div>
//         </div>

//         <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
//           {poems.map((poem, index) => (
//             <motion.div
//               key={poem._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: Math.min(index * 0.05, 0.3) }}
//               whileHover={{ y: -4 }}
//             >
//               <Link
//                 to={`/poem/${poem.slug}`}
//                 className="block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all group"
//               >
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
//               </Link>
//             </motion.div>
//           ))}
//         </div>

//         {poemsPagination.totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-6">
//             <button
//               onClick={() => setPoemsPage(p => Math.max(1, p - 1))}
//               disabled={poemsPage === 1}
//               className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 transition-all"
//             >
//               Previous
//             </button>
//             <span className="px-3 py-1 text-sm text-gray-600">
//               {poemsPage} / {poemsPagination.totalPages}
//             </span>
//             <button
//               onClick={() => setPoemsPage(p => Math.min(poemsPagination.totalPages, p + 1))}
//               disabled={poemsPage === poemsPagination.totalPages}
//               className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 transition-all"
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
//         <EmptyState 
//           icon={BookMarked}
//           title="No Books Available"
//           message="Books by this author will appear here once added."
//         />
//       )
//     }

//     return (
//       <>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {books.map((book, index) => (
//             <motion.div
//               key={book._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: Math.min(index * 0.05, 0.3) }}
//               whileHover={{ y: -4 }}
//             >
//               <Link
//                 to={`/book/${book.slug}`}
//                 className="block bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group"
//               >
//                 {book.coverImage && (
//                   <div className="relative h-48 overflow-hidden">
//                     <img 
//                       src={book.coverImage} 
//                       alt={book.title}
//                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                     />
//                     {book.isPremium && (
//                       <div className="absolute top-2 right-2">
//                         <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-medium rounded-full">
//                           <Crown className="h-3 w-3" />
//                           Premium
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 )}
//                 <div className="p-4">
//                   <h4 className="font-medium text-gray-900 line-clamp-1">{book.title}</h4>
//                   <p className="text-sm text-gray-500 line-clamp-2 mt-1">{book.description}</p>
//                   <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
//                     <span className="capitalize">{book.type || 'Ebook'}</span>
//                     <span className="flex items-center gap-1">
//                       <Eye className="h-3 w-3" />
//                       {book.stats?.views?.toLocaleString() || 0}
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <Download className="h-3 w-3" />
//                       {book.stats?.downloads?.toLocaleString() || 0}
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>

//         {booksPagination.totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-6">
//             <button
//               onClick={() => setBooksPage(p => Math.max(1, p - 1))}
//               disabled={booksPage === 1}
//               className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 transition-all"
//             >
//               Previous
//             </button>
//             <span className="px-3 py-1 text-sm text-gray-600">
//               {booksPage} / {booksPagination.totalPages}
//             </span>
//             <button
//               onClick={() => setBooksPage(p => Math.min(booksPagination.totalPages, p + 1))}
//               disabled={booksPage === booksPagination.totalPages}
//               className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 transition-all"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </>
//     )
//   }

//   // ============================================
//   // AUDIO: Play inline modal OR navigate
//   // ============================================
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
//         <EmptyState 
//           icon={Headphones}
//           title="No Audio Content"
//           message="Audio recordings will appear here once added."
//         />
//       )
//     }

//     return (
//       <div className="space-y-3">
//         {audioItems.map((audio, index) => (
//           <motion.div
//             key={audio._id}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: Math.min(index * 0.05, 0.3) }}
//           >
//             <div
//               onClick={() => openPlayer(audio, 'audio')}
//               className="block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all flex items-center gap-4 group cursor-pointer"
//             >
//               <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-amber-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
//                 <Play className="h-6 w-6 text-primary-600" />
//               </div>
//               <div className="flex-1">
//                 <h4 className="font-medium text-gray-900">{audio.title}</h4>
//                 <p className="text-sm text-gray-500 capitalize">{audio.type}</p>
//               </div>
//               <div className="text-sm text-gray-400">
//                 {formatDuration(audio.duration)}
//               </div>
//               {/* View Details link - stops propagation */}
//               <Link
//                 to={`/audio/${audio.slug}`}
//                 onClick={(e) => e.stopPropagation()}
//                 className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-primary-600 transition-colors"
//                 title="View Details"
//               >
//                 <ExternalLink className="h-4 w-4" />
//               </Link>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     )
//   }

//   // ============================================
//   // VIDEOS: Play inline modal OR navigate
//   // ============================================
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
//         <EmptyState 
//           icon={Video}
//           title="No Video Content"
//           message="Videos will appear here once added."
//         />
//       )
//     }

//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {videos.map((video, index) => (
//           <motion.div
//             key={video._id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: Math.min(index * 0.05, 0.3) }}
//             whileHover={{ y: -4 }}
//           >
//             <div
//               onClick={() => openPlayer(video, 'video')}
//               className="block bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group cursor-pointer"
//             >
//               <div className="relative h-40 bg-gradient-to-br from-gray-900 to-gray-800">
//                 {video.thumbnail ? (
//                   <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
//                 ) : (
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <Play className="h-12 w-12 text-white/50" />
//                   </div>
//                 )}
//                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
//                   <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform opacity-0 group-hover:opacity-100">
//                     <Play className="h-5 w-5 text-primary-600 ml-0.5" />
//                   </div>
//                 </div>
//                 {video.duration && (
//                   <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 rounded-md text-white text-xs">
//                     {formatDuration(video.duration)}
//                   </div>
//                 )}
//                 {/* Source badge */}
//                 <div className="absolute bottom-2 left-2">
//                   <span className="px-2 py-0.5 bg-black/70 text-white text-xs rounded-full flex items-center gap-1">
//                     {isYouTubeUrl(video.videoUrl) ? 
//                       <Youtube className="h-3 w-3" /> : 
//                       <FileVideo className="h-3 w-3" />
//                     }
//                     <span>{isYouTubeUrl(video.videoUrl) ? 'YouTube' : 'Video'}</span>
//                   </span>
//                 </div>
//                 {video.isPremium && (
//                   <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-yellow-500 text-white text-xs rounded">
//                     Premium
//                   </div>
//                 )}
//               </div>
//               <div className="p-4">
//                 <h4 className="font-medium text-gray-900 line-clamp-1">{video.title}</h4>
//                 <div className="flex items-center justify-between mt-2">
//                   <div className="flex items-center gap-3 text-xs text-gray-500">
//                     <span className="capitalize">{video.type}</span>
//                     <span className="flex items-center gap-1">
//                       <Eye className="h-3 w-3" />
//                       {video.stats?.views?.toLocaleString() || 0}
//                     </span>
//                   </div>
//                   {/* View Details link - stops propagation */}
//                   <Link
//                     to={`/video/${video.slug}`}
//                     onClick={(e) => e.stopPropagation()}
//                     className="text-primary-600 hover:text-primary-700 text-xs font-medium flex items-center gap-1"
//                   >
//                     Details <ExternalLink className="h-3 w-3" />
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
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
//         <EmptyState 
//           icon={Calendar}
//           title="No Timeline Events"
//           message="Important life events will be added to the timeline."
//         />
//       )
//     }

//     return (
//       <div className="bg-white rounded-xl p-6 border border-gray-100">
//         <div className="space-y-6">
//           {timeline.map((event, index) => (
//             <div key={index} className="relative flex items-start">
//               <div className="flex-shrink-0 w-24">
//                 <span className="font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-full text-sm">
//                   {event.year}
//                 </span>
//               </div>
//               <div className="flex-shrink-0 w-0.5 bg-gradient-to-b from-primary-500 to-amber-500 h-full absolute left-28 top-0 bottom-0" />
//               <div className="flex-1 ml-8 pb-6">
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <p className="text-gray-800 font-medium">{event.event}</p>
//                   {event.description && (
//                     <p className="text-sm text-gray-500 mt-1">{event.description}</p>
//                   )}
//                 </div>
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
//         <EmptyState 
//           icon={ImageIcon}
//           title="No Gallery Images"
//           message="Images will appear here once added to the gallery."
//         />
//       )
//     }

//     return (
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {gallery.map((item, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: Math.min(index * 0.05, 0.3) }}
//             whileHover={{ scale: 1.05 }}
//             className="group cursor-pointer"
//           >
//             <div className="relative overflow-hidden rounded-xl shadow-sm">
//               <img 
//                 src={item.url} 
//                 alt={item.caption || `Image ${index + 1}`}
//                 className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
//               />
//               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
//               <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
//                 {item.caption && (
//                   <p className="text-white text-xs line-clamp-2">{item.caption}</p>
//                 )}
//               </div>
//             </div>
//           </motion.div>
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
//         <EmptyState 
//           icon={Quote}
//           title="No Quotes Available"
//           message="Famous quotes by this author will appear here."
//         />
//       )
//     }

//     return (
//       <div className="space-y-4">
//         {quotes.map((quote, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: Math.min(index * 0.05, 0.3) }}
//             className="bg-gradient-to-r from-primary-50 to-amber-50 rounded-xl p-6 border-l-4 border-primary-500"
//           >
//             <Quote className="h-8 w-8 text-primary-400 mb-3 opacity-50" />
//             <p className="text-lg text-gray-700 italic">"{quote.text}"</p>
//             {quote.source && (
//               <p className="text-sm text-gray-500 mt-3">— {quote.source}</p>
//             )}
//           </motion.div>
//         ))}
//       </div>
//     )
//   }

//   const renderSocialLinks = () => {
//     const hasSocialLinks = Object.values(socialLinks).some(v => v)

//     if (!hasSocialLinks) return null

//     const socialIcons = {
//       website: { icon: Globe, color: 'text-gray-600 hover:text-gray-900' },
//       twitter: { icon: Twitter, color: 'text-gray-600 hover:text-[#1DA1F2]' },
//       facebook: { icon: Facebook, color: 'text-gray-600 hover:text-[#1877F2]' },
//       instagram: { icon: Instagram, color: 'text-gray-600 hover:text-[#E4405F]' },
//       youtube: { icon: Youtube, color: 'text-gray-600 hover:text-[#FF0000]' },
//       wikipedia: { icon: ExternalLink, color: 'text-gray-600 hover:text-gray-900' }
//     }

//     return (
//       <div className="mt-6 pt-6 border-t border-gray-100">
//         <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//           <Share2 className="h-4 w-4 text-primary-600" />
//           Connect & Follow
//         </h3>
//         <div className="flex flex-wrap gap-3">
//           {Object.entries(socialLinks).map(([platform, url]) => {
//             if (!url) return null
//             const social = socialIcons[platform]
//             if (!social) return null
//             const Icon = social.icon
//             return (
//               <a
//                 key={platform}
//                 href={url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all ${social.color}`}
//               >
//                 <Icon className="h-4 w-4" />
//                 <span className="text-sm capitalize">{platform}</span>
//               </a>
//             )
//           })}
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">

//         {/* ============================================
//             VIDEO & AUDIO PLAYER MODAL
//         ============================================ */}
//         <AnimatePresence>
//           {playerModal.isOpen && playerModal.item && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
//               onClick={closePlayer}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 className="relative w-full max-w-5xl bg-black rounded-xl overflow-hidden"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 {/* Close button */}
//                 <button
//                   onClick={closePlayer}
//                   className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors text-white"
//                 >
//                   <X className="h-6 w-6" />
//                 </button>

//                 {/* Title overlay */}
//                 <div className="absolute top-4 left-4 z-10 text-white pointer-events-none">
//                   <h3 className="text-lg font-semibold">{playerModal.item.title}</h3>
//                   <p className="text-sm text-gray-300">{author?.name}</p>
//                 </div>

//                 {/* Player */}
//                 <div className="w-full bg-black" style={{ minHeight: '400px' }}>
//                   {playerModal.type === 'video' ? (
//                     isYouTubeUrl(playerModal.item.videoUrl) ? (
//                       /* YouTube video - iframe */
//                       <iframe
//                         src={getYouTubeEmbedUrl(playerModal.item.videoUrl)}
//                         title={playerModal.item.title}
//                         className="w-full aspect-video"
//                         style={{ height: '70vh', border: 'none' }}
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                         allowFullScreen
//                       />
//                     ) : (
//                       /* Uploaded video - native video tag */
//                       <video
//                         src={playerModal.item.videoUrl}
//                         poster={playerModal.item.thumbnail}
//                         className="w-full"
//                         style={{ height: '70vh' }}
//                         controls
//                         controlsList="nodownload"
//                         autoPlay
//                       />
//                     )
//                   ) : (
//                     /* Audio player */
//                     <div className="flex flex-col items-center justify-center h-[70vh] text-white px-8">
//                       <div className="w-48 h-48 bg-gradient-to-br from-primary-500 to-amber-500 rounded-2xl flex items-center justify-center mb-8 shadow-2xl">
//                         <Headphones className="h-24 w-24 text-white" />
//                       </div>
//                       <h3 className="text-2xl font-bold mb-2">{playerModal.item.title}</h3>
//                       <p className="text-gray-400 mb-8">{author?.name}</p>
//                       <audio
//                         src={playerModal.item.audioUrl || playerModal.item.videoUrl}
//                         controls
//                         autoPlay
//                         className="w-full max-w-md"
//                         controlsList="nodownload"
//                       />
//                     </div>
//                   )}
//                 </div>

//                 {/* Footer */}
//                 <div className="p-4 bg-gray-900">
//                   <div className="flex items-center justify-between">
//                     <span className="text-white text-sm">
//                       {playerModal.type === 'video' 
//                         ? (isYouTubeUrl(playerModal.item.videoUrl) ? 'YouTube' : 'Direct Video')
//                         : 'Audio'
//                       }
//                     </span>
//                     <Link
//                       to={`/${playerModal.type}/${playerModal.item.slug}`}
//                       onClick={closePlayer}
//                       className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
//                     >
//                       <ExternalLink className="h-4 w-4" />
//                       <span>View Full Page</span>
//                     </Link>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Back Link */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="mb-6"
//         >
//           <Link 
//             to="/authors" 
//             className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors group"
//           >
//             <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
//             <span>Back to Authors</span>
//           </Link>
//         </motion.div>

//         {/* Cover Section - With Author Name Inside */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="relative mb-16"
//         >
//           {/* Cover Image Container - 3:1 aspect ratio */}
//           <div className="relative w-full rounded-2xl overflow-hidden shadow-xl">
//             <div className="relative" style={{ paddingBottom: '33.33%' }}>
//               {author.coverImage ? (
//                 <>
//                   <img 
//                     src={author.coverImage} 
//                     alt={`${author.name} cover`}
//                     className="absolute inset-0 w-full h-full object-cover object-center"
//                   />
//                   {/* Dark Gradient Overlay for Text Readability */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
//                 </>
//               ) : (
//                 <div className="absolute inset-0 bg-gradient-to-r from-primary-800 via-primary-700 to-amber-800">
//                   <div className="absolute inset-0 opacity-20">
//                     <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full filter blur-3xl animate-pulse" />
//                     <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200 rounded-full filter blur-3xl animate-pulse delay-1000" />
//                   </div>
//                 </div>
//               )}

//               {/* Author Name Overlay - Inside Cover Image */}
//               <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10">
//                 <div className="space-y-2">
//                   {/* Roman Name */}
//                   <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
//                     {author.name}
//                   </h1>
//                   {/* Urdu Name */}
//                   {author.nameUrdu && (
//                     <p className="urdu-text text-xl md:text-2xl text-white/90 drop-shadow-lg" dir="rtl">
//                       {author.nameUrdu}
//                     </p>
//                   )}
//                   {/* Era & Verified Badges */}
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {author.era && (
//                       <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-xs md:text-sm font-medium">
//                         <Award className="h-3.5 w-3.5" />
//                         {author.era} Era
//                       </span>
//                     )}
//                     {author.isVerified && (
//                       <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/80 backdrop-blur-md rounded-full text-white text-xs md:text-sm font-medium">
//                         <Check className="h-3.5 w-3.5" />
//                         Verified Author
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Profile Image - Positioned Above Cover (overlapping) */}
//           <div className="absolute -bottom-12 left-6 md:left-8 z-20">
//             <div className="relative">
//               <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
//                 <img
//                   src={author.avatar || `https://ui-avatars.com/api/?name=${author.name}&background=8B4513&color=fff&size=128&bold=true`}
//                   alt={author.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               {author.isVerified && (
//                 <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 border-2 border-white">
//                   <Check className="h-3 w-3 text-white" />
//                 </div>
//               )}
//             </div>
//           </div>
//         </motion.div>

//         {/* Empty spacer to account for overlapping profile image */}
//         <div className="h-12 md:h-16"></div>

//         {/* Stats Cards - Premium Design */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
//         >
//           {[
//             { icon: BookOpen, label: 'Poems', value: author.stats?.poemsCount || 0, color: 'from-blue-500 to-blue-600' },
//             { icon: BookMarked, label: 'Books', value: author.stats?.booksCount || 0, color: 'from-purple-500 to-purple-600' },
//             { icon: Users, label: 'Followers', value: (author.stats?.followers || 0).toLocaleString(), color: 'from-amber-500 to-amber-600' },
//             { icon: Eye, label: 'Views', value: (author.stats?.views || 0).toLocaleString(), color: 'from-green-500 to-green-600' },
//           ].map((stat, index) => (
//             <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
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

//         {/* Action Buttons Row */}
//         <div className="flex justify-end items-center gap-3 mb-8">
//           <button
//             onClick={handleFollowToggle}
//             disabled={followMutation.isPending || unfollowMutation.isPending}
//             className={`px-6 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 ${
//               isFollowing
//                 ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 : 'bg-gradient-to-r from-primary-600 to-amber-500 text-white hover:shadow-lg hover:-translate-y-0.5'
//             }`}
//           >
//             {isFollowing ? (
//               <>
//                 <UserCheck className="h-4 w-4" />
//                 <span>Following</span>
//               </>
//             ) : (
//               <>
//                 <UserPlus className="h-4 w-4" />
//                 <span>Follow</span>
//               </>
//             )}
//           </button>

//           {/* Share Button with Menu */}
//           <div className="relative">
//             <button 
//               onClick={handleShare}
//               className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all hover:shadow-md"
//             >
//               <Share2 className="h-5 w-5 text-gray-600" />
//             </button>

//             <AnimatePresence>
//               {showShareMenu && (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.9, y: -10 }}
//                   animate={{ opacity: 1, scale: 1, y: 0 }}
//                   exit={{ opacity: 0, scale: 0.9, y: -10 }}
//                   className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden"
//                 >
//                   <div className="p-3 border-b border-gray-100">
//                     <p className="text-sm font-medium text-gray-700">Share this author</p>
//                   </div>
//                   <div className="p-2">
//                     {shareLinks.map((link) => (
//                       <a
//                         key={link.name}
//                         href={link.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         onClick={() => setShowShareMenu(false)}
//                         className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg ${link.color} text-white mb-1 transition-all hover:shadow-md`}
//                       >
//                         <link.icon className="h-4 w-4" />
//                         <span className="text-sm font-medium">{link.name}</span>
//                       </a>
//                     ))}
//                     <button
//                       onClick={copyToClipboard}
//                       className="flex items-center gap-3 w-full px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all mt-1"
//                     >
//                       {copiedLink ? (
//                         <>
//                           <Check className="h-4 w-4 text-green-600" />
//                           <span className="text-sm font-medium text-green-600">Copied!</span>
//                         </>
//                       ) : (
//                         <>
//                           <Copy className="h-4 w-4 text-gray-600" />
//                           <span className="text-sm font-medium text-gray-700">Copy Link</span>
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>

//         {/* Bio & Info Section */}
//         <div className="grid md:grid-cols-3 gap-6 mb-8">
//           <div className="md:col-span-2">
//             <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//               <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                 <Quote className="h-5 w-5 text-primary-600" />
//                 Biography
//               </h2>
//               <p className="text-gray-700 leading-relaxed whitespace-pre-line">{author.bio}</p>
//               {author.bioUrdu && (
//                 <p className="urdu-text text-gray-700 leading-relaxed mt-4 pt-4 border-t border-gray-100" dir="rtl">
//                   {author.bioUrdu}
//                 </p>
//               )}
//               <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100">
//                 {author.birthDate && (
//                   <span className="flex items-center gap-2 text-sm text-gray-500">
//                     <Calendar className="h-4 w-4 text-primary-500" />
//                     <span>
//                       {new Date(author.birthDate).getFullYear()} 
//                       {author.deathDate && ` - ${new Date(author.deathDate).getFullYear()}`}
//                     </span>
//                   </span>
//                 )}
//                 {author.birthPlace && (
//                   <span className="flex items-center gap-2 text-sm text-gray-500">
//                     <MapPin className="h-4 w-4 text-primary-500" />
//                     <span>{author.birthPlace}</span>
//                   </span>
//                 )}
//               </div>
//               {renderSocialLinks()}
//             </div>
//           </div>

//           <div>
//             <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//               <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                 <Star className="h-5 w-5 text-amber-500" />
//                 Literary Genres
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {author.genres?.map((genre, index) => (
//                   <span key={index} className="px-3 py-1.5 bg-gradient-to-r from-primary-50 to-amber-50 rounded-full text-sm text-gray-700 capitalize">
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

//         {/* Tabs - Premium Design */}
//         <div className="flex overflow-x-auto scrollbar-hide gap-1 mb-6 border-b border-gray-200">
//           {tabs.map((tab) => {
//             const Icon = tab.icon
//             const counts = {
//               works: poemsPagination.total || poems.length,
//               books: booksPagination.total || books.length,
//               audio: audioItems.length,
//               videos: videos.length,
//               timeline: timeline.length,
//               gallery: gallery.length,
//               quotes: quotes.length
//             }
//             return (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center gap-2 px-5 py-3 text-sm font-medium whitespace-nowrap transition-all ${
//                   activeTab === tab.id
//                     ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50/30'
//                     : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
//                 }`}
//               >
//                 <Icon className="h-4 w-4" />
//                 <span>{tab.label}</span>
//                 <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${
//                   activeTab === tab.id ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600'
//                 }`}>
//                   {counts[tab.id]}
//                 </span>
//               </button>
//             )
//           })}
//         </div>

//         {/* Tab Content */}
//         <motion.div
//           key={activeTab}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//           className="mb-8"
//         >
//           {activeTab === 'works' && renderWorks()}
//           {activeTab === 'books' && renderBooks()}
//           {activeTab === 'audio' && renderAudio()}
//           {activeTab === 'videos' && renderVideos()}
//           {activeTab === 'timeline' && renderTimeline()}
//           {activeTab === 'gallery' && renderGallery()}
//           {activeTab === 'quotes' && renderQuotes()}
//         </motion.div>
//       </div>
//     </div>
//   )
// }

// export default AuthorDetailPage




















// // client/src/pages/public/AuthorDetailPage.jsx
// import React, { useState } from 'react'
// import { useParams, Link, useNavigate } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { useSelector } from 'react-redux'
// import toast from 'react-hot-toast'
// import {
//   Heart, Share2, BookOpen, Calendar, MapPin, Users,
//   ChevronLeft, Clock, Play, Grid, List, Loader2,
//   AlertCircle, UserPlus, UserCheck, Eye, Music, Video,
//   Quote, Image as ImageIcon, Twitter, Facebook, Instagram,
//   Youtube, Globe, ExternalLink, BookMarked, Headphones, Download,
//   Copy, Check, MessageCircle, Linkedin, Mail, X, ChevronDown,
//   Award, Star, TrendingUp, Zap, Sparkles, Crown, FileText, Volume2,
//   InstagramIcon, FacebookIcon, TwitterIcon, LinkedinIcon, Share,
//   Pause, VolumeX, FileVideo
// } from 'lucide-react'
// import authorAPI from '../../api/authorAPI'
// import userAPI from '../../api/userAPI'
// import { useAudioPlayer } from '../../context/AudioPlayerContext' // <-- ADDED

// const AuthorDetailPage = () => {
//   const { slug } = useParams()
//   const navigate = useNavigate()
//   const { t } = useTranslation()
//   const queryClient = useQueryClient()
//   const { user } = useSelector(state => state.auth)
//   const audioPlayer = useAudioPlayer() // <-- ADDED
  
//   const [activeTab, setActiveTab] = useState('works')
//   const [viewMode, setViewMode] = useState('grid')
//   const [poemsPage, setPoemsPage] = useState(1)
//   const [booksPage, setBooksPage] = useState(1)
//   const [showShareMenu, setShowShareMenu] = useState(false)
//   const [copiedLink, setCopiedLink] = useState(false)

//   // ============================================
//   // VIDEO PLAYER MODAL STATE (Audio uses global player)
//   // ============================================
//   const [videoModal, setVideoModal] = useState({
//     isOpen: false,
//     video: null
//   })

//   // Check if URL is YouTube
//   const isYouTubeUrl = (url) => {
//     if (!url) return false
//     return url.includes('youtube.com') || url.includes('youtu.be')
//   }

//   // Get YouTube embed URL
//   const getYouTubeEmbedUrl = (url) => {
//     const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)?.[1]
//     return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1` : url
//   }

//   // Open video modal
//   const openVideoPlayer = (video) => {
//     if (!video?.videoUrl) {
//       navigate(`/video/${video.slug}`)
//       return
//     }
//     setVideoModal({ isOpen: true, video })
//   }

//   // Close video modal
//   const closeVideoPlayer = () => {
//     setVideoModal({ isOpen: false, video: null })
//   }

//   // Play audio using global AudioPlayerContext
//   const playAudioGlobal = (audio, audioList = []) => {
//     if (!audio?.audioUrl) {
//       navigate(`/audio/${audio.slug}`)
//       return
//     }
//     // Find index in list for playlist support
//     const index = audioList.findIndex(a => a._id === audio._id)
//     audioPlayer.playAudio(audio, audioList, index >= 0 ? index : 0)
//   }

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

//   const author = authorData?.data || authorData

//   // ============================================
//   // FETCH AUTHOR CONTENT USING SLUG
//   // ============================================
  
//   const { 
//     data: poemsResponse, 
//     isLoading: poemsLoading 
//   } = useQuery({
//     queryKey: ['author-poems', slug, poemsPage],
//     queryFn: () => authorAPI.getAuthorPoems(slug, { page: poemsPage, limit: 12 }),
//     enabled: !!slug
//   })

//   const { 
//     data: booksResponse, 
//     isLoading: booksLoading 
//   } = useQuery({
//     queryKey: ['author-books', slug, booksPage],
//     queryFn: () => authorAPI.getAuthorBooks(slug, { page: booksPage, limit: 8 }),
//     enabled: !!slug
//   })

//   const { 
//     data: audioResponse, 
//     isLoading: audioLoading 
//   } = useQuery({
//     queryKey: ['author-audio', slug],
//     queryFn: () => authorAPI.getAuthorAudio(slug, { limit: 6 }),
//     enabled: !!slug
//   })

//   const { 
//     data: videosResponse, 
//     isLoading: videosLoading 
//   } = useQuery({
//     queryKey: ['author-videos', slug],
//     queryFn: () => authorAPI.getAuthorVideos(slug, { limit: 6 }),
//     enabled: !!slug
//   })

//   const { 
//     data: timelineResponse, 
//     isLoading: timelineLoading 
//   } = useQuery({
//     queryKey: ['author-timeline', slug],
//     queryFn: () => authorAPI.getAuthorTimeline(slug),
//     enabled: !!slug
//   })

//   const { 
//     data: galleryResponse, 
//     isLoading: galleryLoading 
//   } = useQuery({
//     queryKey: ['author-gallery', slug],
//     queryFn: () => authorAPI.getAuthorGallery(slug),
//     enabled: !!slug
//   })

//   const { 
//     data: quotesResponse, 
//     isLoading: quotesLoading 
//   } = useQuery({
//     queryKey: ['author-quotes', slug],
//     queryFn: () => authorAPI.getAuthorQuotes(slug),
//     enabled: !!slug
//   })

//   // Extract data from responses
//   const extractData = (response, defaultValue = []) => {
//     if (!response) return defaultValue
//     if (response.data?.data) return response.data.data
//     if (response.data) return response.data
//     if (Array.isArray(response)) return response
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

//   const unfollowMutation = useMutation({
//     mutationFn: () => userAPI.unfollowAuthor(author?._id),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['author', slug])
//       toast.success(`Unfollowed ${author?.name}`)
//     },
//     onError: () => toast.error('Failed to unfollow author')
//   })

//   const isFollowing = user?.following?.includes(author?._id) || false

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

//   // ============================================
//   // SOCIAL SHARE FUNCTIONALITY
//   // ============================================
  
//   const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
//   const shareTitle = author ? `Check out ${author.name} on ZauqApp` : 'Check out this author on ZauqApp'
//   const shareText = author?.bio ? author.bio.substring(0, 100) : 'Explore the literary works of this renowned poet and author.'

//   const shareLinks = [
//     {
//       name: 'WhatsApp',
//       icon: MessageCircle,
//       color: 'bg-green-500 hover:bg-green-600',
//       url: `https://wa.me/?text=${encodeURIComponent(`${shareTitle}\n\n${shareText}\n\n${shareUrl}`)}`
//     },
//     {
//       name: 'Twitter',
//       icon: Twitter,
//       color: 'bg-[#1DA1F2] hover:bg-[#1a8cd8]',
//       url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`
//     },
//     {
//       name: 'Facebook',
//       icon: Facebook,
//       color: 'bg-[#1877F2] hover:bg-[#1664d9]',
//       url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
//     },
//     {
//       name: 'LinkedIn',
//       icon: Linkedin,
//       color: 'bg-[#0077B5] hover:bg-[#006396]',
//       url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
//     },
//     {
//       name: 'Email',
//       icon: Mail,
//       color: 'bg-gray-600 hover:bg-gray-700',
//       url: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`
//     }
//   ]

//   const copyToClipboard = async () => {
//     try {
//       await navigator.clipboard.writeText(shareUrl)
//       setCopiedLink(true)
//       toast.success('Link copied to clipboard!')
//       setTimeout(() => setCopiedLink(false), 2000)
//     } catch (err) {
//       toast.error('Failed to copy link')
//     }
//   }

//   const handleShare = () => {
//     setShowShareMenu(!showShareMenu)
//   }

//   const formatDuration = (seconds) => {
//     if (!seconds) return 'N/A'
//     const mins = Math.floor(seconds / 60)
//     const secs = seconds % 60
//     return `${mins}:${secs.toString().padStart(2, '0')}`
//   }

//   // ALL TABS - always show, even with 0 count
//   const tabs = [
//     { id: 'works', label: 'Poems', icon: BookOpen },
//     { id: 'books', label: 'Books', icon: BookMarked },
//     { id: 'audio', label: 'Audio', icon: Headphones },
//     { id: 'videos', label: 'Videos', icon: Video },
//     { id: 'timeline', label: 'Timeline', icon: Calendar },
//     { id: 'gallery', label: 'Gallery', icon: ImageIcon },
//     { id: 'quotes', label: 'Quotes', icon: Quote }
//   ]

//   // Loading state
//   if (authorLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="relative">
//             <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-amber-500 rounded-2xl animate-pulse mx-auto mb-6 flex items-center justify-center">
//               <Users className="h-10 w-10 text-white" />
//             </div>
//             <div className="absolute -top-2 -right-2">
//               <Sparkles className="h-6 w-6 text-amber-400 animate-spin" />
//             </div>
//           </div>
//           <p className="text-gray-600 font-medium">Loading author...</p>
//           <p className="text-sm text-gray-400 mt-1">Discovering literary greatness</p>
//         </div>
//       </div>
//     )
//   }

//   // Error state
//   if (authorError || !author) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
//         <div className="max-w-4xl mx-auto px-4 pt-32 pb-16 text-center">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-2xl mb-6">
//             <AlertCircle className="h-10 w-10 text-red-500" />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Author Not Found</h1>
//           <p className="text-gray-500 mb-6">The author you are looking for does not exist.</p>
//           <Link to="/authors" className="btn-primary inline-flex items-center gap-2">
//             <ChevronLeft className="h-4 w-4" />
//             <span>Browse All Authors</span>
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   // ============================================
//   // RENDER FUNCTIONS WITH EMPTY STATES
//   // ============================================

//   const EmptyState = ({ icon: Icon, title, message }) => (
//     <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
//       <Icon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//       <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
//       <p className="text-gray-500">{message}</p>
//     </div>
//   )

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
//         <EmptyState 
//           icon={BookOpen}
//           title="No Poems Yet"
//           message="Poems by this author will appear here once added."
//         />
//       )
//     }

//     return (
//       <>
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="font-semibold text-gray-900">
//             Poems ({poemsPagination.total || poems.length})
//           </h3>
//           <div className="flex border border-gray-200 rounded-lg overflow-hidden">
//             <button
//               onClick={() => setViewMode('grid')}
//               className={`p-2 transition-all ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
//             >
//               <Grid className="h-4 w-4" />
//             </button>
//             <button
//               onClick={() => setViewMode('list')}
//               className={`p-2 transition-all ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
//             >
//               <List className="h-4 w-4" />
//             </button>
//           </div>
//         </div>
        
//         <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
//           {poems.map((poem, index) => (
//             <motion.div
//               key={poem._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: Math.min(index * 0.05, 0.3) }}
//               whileHover={{ y: -4 }}
//             >
//               <Link
//                 to={`/poem/${poem.slug}`}
//                 className="block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all group"
//               >
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
//               </Link>
//             </motion.div>
//           ))}
//         </div>

//         {poemsPagination.totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-6">
//             <button
//               onClick={() => setPoemsPage(p => Math.max(1, p - 1))}
//               disabled={poemsPage === 1}
//               className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 transition-all"
//             >
//               Previous
//             </button>
//             <span className="px-3 py-1 text-sm text-gray-600">
//               {poemsPage} / {poemsPagination.totalPages}
//             </span>
//             <button
//               onClick={() => setPoemsPage(p => Math.min(poemsPagination.totalPages, p + 1))}
//               disabled={poemsPage === poemsPagination.totalPages}
//               className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 transition-all"
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
//         <EmptyState 
//           icon={BookMarked}
//           title="No Books Available"
//           message="Books by this author will appear here once added."
//         />
//       )
//     }

//     return (
//       <>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {books.map((book, index) => (
//             <motion.div
//               key={book._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: Math.min(index * 0.05, 0.3) }}
//               whileHover={{ y: -4 }}
//             >
//               <Link
//                 to={`/book/${book.slug}`}
//                 className="block bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group"
//               >
//                 {book.coverImage && (
//                   <div className="relative h-48 overflow-hidden">
//                     <img 
//                       src={book.coverImage} 
//                       alt={book.title}
//                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                     />
//                     {book.isPremium && (
//                       <div className="absolute top-2 right-2">
//                         <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-medium rounded-full">
//                           <Crown className="h-3 w-3" />
//                           Premium
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 )}
//                 <div className="p-4">
//                   <h4 className="font-medium text-gray-900 line-clamp-1">{book.title}</h4>
//                   <p className="text-sm text-gray-500 line-clamp-2 mt-1">{book.description}</p>
//                   <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
//                     <span className="capitalize">{book.type || 'Ebook'}</span>
//                     <span className="flex items-center gap-1">
//                       <Eye className="h-3 w-3" />
//                       {book.stats?.views?.toLocaleString() || 0}
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <Download className="h-3 w-3" />
//                       {book.stats?.downloads?.toLocaleString() || 0}
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>

//         {booksPagination.totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-6">
//             <button
//               onClick={() => setBooksPage(p => Math.max(1, p - 1))}
//               disabled={booksPage === 1}
//               className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 transition-all"
//             >
//               Previous
//             </button>
//             <span className="px-3 py-1 text-sm text-gray-600">
//               {booksPage} / {booksPagination.totalPages}
//             </span>
//             <button
//               onClick={() => setBooksPage(p => Math.min(booksPagination.totalPages, p + 1))}
//               disabled={booksPage === booksPagination.totalPages}
//               className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 transition-all"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </>
//     )
//   }

//   // ============================================
//   // AUDIO: Uses global AudioPlayerContext (bottom bar)
//   // ============================================
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
//         <EmptyState 
//           icon={Headphones}
//           title="No Audio Content"
//           message="Audio recordings will appear here once added."
//         />
//       )
//     }

//     const isCurrentlyPlaying = (audio) => {
//       return audioPlayer?.currentAudio?._id === audio._id && audioPlayer?.isPlaying
//     }

//     return (
//       <div className="space-y-3">
//         {audioItems.map((audio, index) => (
//           <motion.div
//             key={audio._id}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: Math.min(index * 0.05, 0.3) }}
//           >
//             <div
//               onClick={() => playAudioGlobal(audio, audioItems)}
//               className={`block rounded-xl p-4 shadow-sm border transition-all flex items-center gap-4 group cursor-pointer ${
//                 isCurrentlyPlaying(audio) 
//                   ? 'bg-primary-50 border-primary-200 shadow-md' 
//                   : 'bg-white border-gray-100 hover:shadow-md'
//               }`}
//             >
//               <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 ${
//                 isCurrentlyPlaying(audio)
//                   ? 'bg-primary-600'
//                   : 'bg-gradient-to-br from-primary-100 to-amber-100'
//               }`}>
//                 {isCurrentlyPlaying(audio) ? (
//                   <div className="flex gap-0.5">
//                     <div className="w-1 h-4 bg-white animate-pulse" />
//                     <div className="w-1 h-4 bg-white animate-pulse delay-75" />
//                     <div className="w-1 h-4 bg-white animate-pulse delay-150" />
//                   </div>
//                 ) : (
//                   <Play className="h-6 w-6 text-primary-600" />
//                 )}
//               </div>
//               <div className="flex-1">
//                 <h4 className={`font-medium line-clamp-1 ${
//                   isCurrentlyPlaying(audio) ? 'text-primary-700' : 'text-gray-900'
//                 }`}>
//                   {audio.title}
//                 </h4>
//                 <p className="text-sm text-gray-500 capitalize">{audio.type}</p>
//               </div>
//               <div className="text-sm text-gray-400">
//                 {formatDuration(audio.duration)}
//               </div>
//               {/* View Details link - stops propagation */}
//               <Link
//                 to={`/audio/${audio.slug}`}
//                 onClick={(e) => e.stopPropagation()}
//                 className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-primary-600 transition-colors"
//                 title="View Details"
//               >
//                 <ExternalLink className="h-4 w-4" />
//               </Link>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     )
//   }

//   // ============================================
//   // VIDEOS: Play inline modal
//   // ============================================
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
//         <EmptyState 
//           icon={Video}
//           title="No Video Content"
//           message="Videos will appear here once added."
//         />
//       )
//     }

//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {videos.map((video, index) => (
//           <motion.div
//             key={video._id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: Math.min(index * 0.05, 0.3) }}
//             whileHover={{ y: -4 }}
//           >
//             <div
//               onClick={() => openVideoPlayer(video)}
//               className="block bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group cursor-pointer"
//             >
//               <div className="relative h-40 bg-gradient-to-br from-gray-900 to-gray-800">
//                 {video.thumbnail ? (
//                   <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
//                 ) : (
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <Play className="h-12 w-12 text-white/50" />
//                   </div>
//                 )}
//                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
//                   <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform opacity-0 group-hover:opacity-100">
//                     <Play className="h-5 w-5 text-primary-600 ml-0.5" />
//                   </div>
//                 </div>
//                 {video.duration && (
//                   <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 rounded-md text-white text-xs">
//                     {formatDuration(video.duration)}
//                   </div>
//                 )}
//                 {/* Source badge */}
//                 <div className="absolute bottom-2 left-2">
//                   <span className="px-2 py-0.5 bg-black/70 text-white text-xs rounded-full flex items-center gap-1">
//                     {isYouTubeUrl(video.videoUrl) ? 
//                       <Youtube className="h-3 w-3" /> : 
//                       <FileVideo className="h-3 w-3" />
//                     }
//                     <span>{isYouTubeUrl(video.videoUrl) ? 'YouTube' : 'Video'}</span>
//                   </span>
//                 </div>
//                 {video.isPremium && (
//                   <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-yellow-500 text-white text-xs rounded">
//                     Premium
//                   </div>
//                 )}
//               </div>
//               <div className="p-4">
//                 <h4 className="font-medium text-gray-900 line-clamp-1">{video.title}</h4>
//                 <div className="flex items-center justify-between mt-2">
//                   <div className="flex items-center gap-3 text-xs text-gray-500">
//                     <span className="capitalize">{video.type}</span>
//                     <span className="flex items-center gap-1">
//                       <Eye className="h-3 w-3" />
//                       {video.stats?.views?.toLocaleString() || 0}
//                     </span>
//                   </div>
//                   {/* View Details link - stops propagation */}
//                   <Link
//                     to={`/video/${video.slug}`}
//                     onClick={(e) => e.stopPropagation()}
//                     className="text-primary-600 hover:text-primary-700 text-xs font-medium flex items-center gap-1"
//                   >
//                     Details <ExternalLink className="h-3 w-3" />
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
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
//         <EmptyState 
//           icon={Calendar}
//           title="No Timeline Events"
//           message="Important life events will be added to the timeline."
//         />
//       )
//     }

//     return (
//       <div className="bg-white rounded-xl p-6 border border-gray-100">
//         <div className="space-y-6">
//           {timeline.map((event, index) => (
//             <div key={index} className="relative flex items-start">
//               <div className="flex-shrink-0 w-24">
//                 <span className="font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-full text-sm">
//                   {event.year}
//                 </span>
//               </div>
//               <div className="flex-shrink-0 w-0.5 bg-gradient-to-b from-primary-500 to-amber-500 h-full absolute left-28 top-0 bottom-0" />
//               <div className="flex-1 ml-8 pb-6">
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <p className="text-gray-800 font-medium">{event.event}</p>
//                   {event.description && (
//                     <p className="text-sm text-gray-500 mt-1">{event.description}</p>
//                   )}
//                 </div>
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
//         <EmptyState 
//           icon={ImageIcon}
//           title="No Gallery Images"
//           message="Images will appear here once added to the gallery."
//         />
//       )
//     }

//     return (
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {gallery.map((item, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: Math.min(index * 0.05, 0.3) }}
//             whileHover={{ scale: 1.05 }}
//             className="group cursor-pointer"
//           >
//             <div className="relative overflow-hidden rounded-xl shadow-sm">
//               <img 
//                 src={item.url} 
//                 alt={item.caption || `Image ${index + 1}`}
//                 className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
//               />
//               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
//               <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
//                 {item.caption && (
//                   <p className="text-white text-xs line-clamp-2">{item.caption}</p>
//                 )}
//               </div>
//             </div>
//           </motion.div>
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
//         <EmptyState 
//           icon={Quote}
//           title="No Quotes Available"
//           message="Famous quotes by this author will appear here."
//         />
//       )
//     }

//     return (
//       <div className="space-y-4">
//         {quotes.map((quote, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: Math.min(index * 0.05, 0.3) }}
//             className="bg-gradient-to-r from-primary-50 to-amber-50 rounded-xl p-6 border-l-4 border-primary-500"
//           >
//             <Quote className="h-8 w-8 text-primary-400 mb-3 opacity-50" />
//             <p className="text-lg text-gray-700 italic">"{quote.text}"</p>
//             {quote.source && (
//               <p className="text-sm text-gray-500 mt-3">— {quote.source}</p>
//             )}
//           </motion.div>
//         ))}
//       </div>
//     )
//   }

//   const renderSocialLinks = () => {
//     const hasSocialLinks = Object.values(socialLinks).some(v => v)
    
//     if (!hasSocialLinks) return null

//     const socialIcons = {
//       website: { icon: Globe, color: 'text-gray-600 hover:text-gray-900' },
//       twitter: { icon: Twitter, color: 'text-gray-600 hover:text-[#1DA1F2]' },
//       facebook: { icon: Facebook, color: 'text-gray-600 hover:text-[#1877F2]' },
//       instagram: { icon: Instagram, color: 'text-gray-600 hover:text-[#E4405F]' },
//       youtube: { icon: Youtube, color: 'text-gray-600 hover:text-[#FF0000]' },
//       wikipedia: { icon: ExternalLink, color: 'text-gray-600 hover:text-gray-900' }
//     }

//     return (
//       <div className="mt-6 pt-6 border-t border-gray-100">
//         <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//           <Share2 className="h-4 w-4 text-primary-600" />
//           Connect & Follow
//         </h3>
//         <div className="flex flex-wrap gap-3">
//           {Object.entries(socialLinks).map(([platform, url]) => {
//             if (!url) return null
//             const social = socialIcons[platform]
//             if (!social) return null
//             const Icon = social.icon
//             return (
//               <a
//                 key={platform}
//                 href={url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all ${social.color}`}
//               >
//                 <Icon className="h-4 w-4" />
//                 <span className="text-sm capitalize">{platform}</span>
//               </a>
//             )
//           })}
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        
//         {/* ============================================
//             VIDEO PLAYER MODAL ONLY (Audio uses global bar)
//         ============================================ */}
//         <AnimatePresence>
//           {videoModal.isOpen && videoModal.video && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
//               onClick={closeVideoPlayer}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 className="relative w-full max-w-5xl bg-black rounded-xl overflow-hidden"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 {/* Close button */}
//                 <button
//                   onClick={closeVideoPlayer}
//                   className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors text-white"
//                 >
//                   <X className="h-6 w-6" />
//                 </button>

//                 {/* Title overlay */}
//                 <div className="absolute top-4 left-4 z-10 text-white pointer-events-none">
//                   <h3 className="text-lg font-semibold">{videoModal.video.title}</h3>
//                   <p className="text-sm text-gray-300">{author?.name}</p>
//                 </div>

//                 {/* Video Player */}
//                 <div className="w-full bg-black" style={{ minHeight: '400px' }}>
//                   {isYouTubeUrl(videoModal.video.videoUrl) ? (
//                     /* YouTube video - iframe */
//                     <iframe
//                       src={getYouTubeEmbedUrl(videoModal.video.videoUrl)}
//                       title={videoModal.video.title}
//                       className="w-full aspect-video"
//                       style={{ height: '70vh', border: 'none' }}
//                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                       allowFullScreen
//                     />
//                   ) : (
//                     /* Uploaded video - native video tag */
//                     <video
//                       src={videoModal.video.videoUrl}
//                       poster={videoModal.video.thumbnail}
//                       className="w-full"
//                       style={{ height: '70vh' }}
//                       controls
//                       controlsList="nodownload"
//                       autoPlay
//                     />
//                   )}
//                 </div>

//                 {/* Footer */}
//                 <div className="p-4 bg-gray-900">
//                   <div className="flex items-center justify-between">
//                     <span className="text-white text-sm">
//                       {isYouTubeUrl(videoModal.video.videoUrl) ? 'YouTube' : 'Direct Video'}
//                     </span>
//                     <Link
//                       to={`/video/${videoModal.video.slug}`}
//                       onClick={closeVideoPlayer}
//                       className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
//                     >
//                       <ExternalLink className="h-4 w-4" />
//                       <span>View Full Page</span>
//                     </Link>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Back Link */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="mb-6"
//         >
//           <Link 
//             to="/authors" 
//             className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors group"
//           >
//             <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
//             <span>Back to Authors</span>
//           </Link>
//         </motion.div>

//         {/* Cover Section - With Author Name Inside */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="relative mb-16"
//         >
//           {/* Cover Image Container - 3:1 aspect ratio */}
//           <div className="relative w-full rounded-2xl overflow-hidden shadow-xl">
//             <div className="relative" style={{ paddingBottom: '33.33%' }}>
//               {author.coverImage ? (
//                 <>
//                   <img 
//                     src={author.coverImage} 
//                     alt={`${author.name} cover`}
//                     className="absolute inset-0 w-full h-full object-cover object-center"
//                   />
//                   {/* Dark Gradient Overlay for Text Readability */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
//                 </>
//               ) : (
//                 <div className="absolute inset-0 bg-gradient-to-r from-primary-800 via-primary-700 to-amber-800">
//                   <div className="absolute inset-0 opacity-20">
//                     <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full filter blur-3xl animate-pulse" />
//                     <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200 rounded-full filter blur-3xl animate-pulse delay-1000" />
//                   </div>
//                 </div>
//               )}
              
//               {/* Author Name Overlay - Inside Cover Image */}
//               <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10">
//                 <div className="space-y-2">
//                   {/* Roman Name */}
//                   <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
//                     {author.name}
//                   </h1>
//                   {/* Urdu Name */}
//                   {author.nameUrdu && (
//                     <p className="urdu-text text-xl md:text-2xl text-white/90 drop-shadow-lg" dir="rtl">
//                       {author.nameUrdu}
//                     </p>
//                   )}
//                   {/* Era & Verified Badges */}
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {author.era && (
//                       <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-xs md:text-sm font-medium">
//                         <Award className="h-3.5 w-3.5" />
//                         {author.era} Era
//                       </span>
//                     )}
//                     {author.isVerified && (
//                       <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/80 backdrop-blur-md rounded-full text-white text-xs md:text-sm font-medium">
//                         <Check className="h-3.5 w-3.5" />
//                         Verified Author
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           {/* Profile Image - Positioned Above Cover (overlapping) */}
//           <div className="absolute -bottom-12 left-6 md:left-8 z-20">
//             <div className="relative">
//               <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
//                 <img
//                   src={author.avatar || `https://ui-avatars.com/api/?name=${author.name}&background=8B4513&color=fff&size=128&bold=true`}
//                   alt={author.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               {author.isVerified && (
//                 <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 border-2 border-white">
//                   <Check className="h-3 w-3 text-white" />
//                 </div>
//               )}
//             </div>
//           </div>
//         </motion.div>

//         {/* Empty spacer to account for overlapping profile image */}
//         <div className="h-12 md:h-16"></div>

//         {/* Stats Cards - Premium Design */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
//         >
//           {[
//             { icon: BookOpen, label: 'Poems', value: author.stats?.poemsCount || 0, color: 'from-blue-500 to-blue-600' },
//             { icon: BookMarked, label: 'Books', value: author.stats?.booksCount || 0, color: 'from-purple-500 to-purple-600' },
//             { icon: Users, label: 'Followers', value: (author.stats?.followers || 0).toLocaleString(), color: 'from-amber-500 to-amber-600' },
//             { icon: Eye, label: 'Views', value: (author.stats?.views || 0).toLocaleString(), color: 'from-green-500 to-green-600' },
//           ].map((stat, index) => (
//             <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
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

//         {/* Action Buttons Row */}
//         <div className="flex justify-end items-center gap-3 mb-8">
//           <button
//             onClick={handleFollowToggle}
//             disabled={followMutation.isPending || unfollowMutation.isPending}
//             className={`px-6 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 ${
//               isFollowing
//                 ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 : 'bg-gradient-to-r from-primary-600 to-amber-500 text-white hover:shadow-lg hover:-translate-y-0.5'
//             }`}
//           >
//             {isFollowing ? (
//               <>
//                 <UserCheck className="h-4 w-4" />
//                 <span>Following</span>
//               </>
//             ) : (
//               <>
//                 <UserPlus className="h-4 w-4" />
//                 <span>Follow</span>
//               </>
//             )}
//           </button>
          
//           {/* Share Button with Menu */}
//           <div className="relative">
//             <button 
//               onClick={handleShare}
//               className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all hover:shadow-md"
//             >
//               <Share2 className="h-5 w-5 text-gray-600" />
//             </button>
            
//             <AnimatePresence>
//               {showShareMenu && (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.9, y: -10 }}
//                   animate={{ opacity: 1, scale: 1, y: 0 }}
//                   exit={{ opacity: 0, scale: 0.9, y: -10 }}
//                   className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden"
//                 >
//                   <div className="p-3 border-b border-gray-100">
//                     <p className="text-sm font-medium text-gray-700">Share this author</p>
//                   </div>
//                   <div className="p-2">
//                     {shareLinks.map((link) => (
//                       <a
//                         key={link.name}
//                         href={link.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         onClick={() => setShowShareMenu(false)}
//                         className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg ${link.color} text-white mb-1 transition-all hover:shadow-md`}
//                       >
//                         <link.icon className="h-4 w-4" />
//                         <span className="text-sm font-medium">{link.name}</span>
//                       </a>
//                     ))}
//                     <button
//                       onClick={copyToClipboard}
//                       className="flex items-center gap-3 w-full px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all mt-1"
//                     >
//                       {copiedLink ? (
//                         <>
//                           <Check className="h-4 w-4 text-green-600" />
//                           <span className="text-sm font-medium text-green-600">Copied!</span>
//                         </>
//                       ) : (
//                         <>
//                           <Copy className="h-4 w-4 text-gray-600" />
//                           <span className="text-sm font-medium text-gray-700">Copy Link</span>
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>

//         {/* Bio & Info Section */}
//         <div className="grid md:grid-cols-3 gap-6 mb-8">
//           <div className="md:col-span-2">
//             <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//               <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                 <Quote className="h-5 w-5 text-primary-600" />
//                 Biography
//               </h2>
//               <p className="text-gray-700 leading-relaxed whitespace-pre-line">{author.bio}</p>
//               {author.bioUrdu && (
//                 <p className="urdu-text text-gray-700 leading-relaxed mt-4 pt-4 border-t border-gray-100" dir="rtl">
//                   {author.bioUrdu}
//                 </p>
//               )}
//               <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100">
//                 {author.birthDate && (
//                   <span className="flex items-center gap-2 text-sm text-gray-500">
//                     <Calendar className="h-4 w-4 text-primary-500" />
//                     <span>
//                       {new Date(author.birthDate).getFullYear()} 
//                       {author.deathDate && ` - ${new Date(author.deathDate).getFullYear()}`}
//                     </span>
//                   </span>
//                 )}
//                 {author.birthPlace && (
//                   <span className="flex items-center gap-2 text-sm text-gray-500">
//                     <MapPin className="h-4 w-4 text-primary-500" />
//                     <span>{author.birthPlace}</span>
//                   </span>
//                 )}
//               </div>
//               {renderSocialLinks()}
//             </div>
//           </div>
          
//           <div>
//             <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//               <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                 <Star className="h-5 w-5 text-amber-500" />
//                 Literary Genres
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {author.genres?.map((genre, index) => (
//                   <span key={index} className="px-3 py-1.5 bg-gradient-to-r from-primary-50 to-amber-50 rounded-full text-sm text-gray-700 capitalize">
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

//         {/* Tabs - Premium Design */}
//         <div className="flex overflow-x-auto scrollbar-hide gap-1 mb-6 border-b border-gray-200">
//           {tabs.map((tab) => {
//             const Icon = tab.icon
//             const counts = {
//               works: poemsPagination.total || poems.length,
//               books: booksPagination.total || books.length,
//               audio: audioItems.length,
//               videos: videos.length,
//               timeline: timeline.length,
//               gallery: gallery.length,
//               quotes: quotes.length
//             }
//             return (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center gap-2 px-5 py-3 text-sm font-medium whitespace-nowrap transition-all ${
//                   activeTab === tab.id
//                     ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50/30'
//                     : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
//                 }`}
//               >
//                 <Icon className="h-4 w-4" />
//                 <span>{tab.label}</span>
//                 <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${
//                   activeTab === tab.id ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600'
//                 }`}>
//                   {counts[tab.id]}
//                 </span>
//               </button>
//             )
//           })}
//         </div>

//         {/* Tab Content */}
//         <motion.div
//           key={activeTab}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//           className="mb-8"
//         >
//           {activeTab === 'works' && renderWorks()}
//           {activeTab === 'books' && renderBooks()}
//           {activeTab === 'audio' && renderAudio()}
//           {activeTab === 'videos' && renderVideos()}
//           {activeTab === 'timeline' && renderTimeline()}
//           {activeTab === 'gallery' && renderGallery()}
//           {activeTab === 'quotes' && renderQuotes()}
//         </motion.div>
//       </div>
//     </div>
//   )
// }

// export default AuthorDetailPage

































// // Good working 6-11-2026 
// //client/src/pages/public/AuthorDetailPage.jsx
// import React, { useState } from 'react'
// import { useParams, Link, useNavigate } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { useSelector } from 'react-redux'
// import toast from 'react-hot-toast'
// import {
//   Heart, Share2, BookOpen, Calendar, MapPin, Users,
//   ChevronLeft, Clock, Play, Grid, List, Loader2,
//   AlertCircle, UserPlus, UserCheck, Eye, Music, Video,
//   Quote, Image as ImageIcon, Twitter, Facebook, Instagram,
//   Youtube, Globe, ExternalLink, BookMarked, Headphones, Download,
//   Copy, Check, MessageCircle, Linkedin, Mail, X, ChevronDown,
//   Award, Star, TrendingUp, Zap, Sparkles, Crown, FileText, Volume2,
//   InstagramIcon, FacebookIcon, TwitterIcon, LinkedinIcon, Share,
//   Pause, VolumeX, FileVideo
// } from 'lucide-react'
// import authorAPI from '../../api/authorAPI'
// import userAPI from '../../api/userAPI'
// import { useAudioPlayer } from '../../context/AudioPlayerContext' // <-- ADDED

// const AuthorDetailPage = () => {
//   const { slug } = useParams()
//   const navigate = useNavigate()
//   const { t } = useTranslation()
//   const queryClient = useQueryClient()
//   const { user } = useSelector(state => state.auth)
//   const audioPlayer = useAudioPlayer() // <-- ADDED
  
//   const [activeTab, setActiveTab] = useState('poems') // <-- CHANGED: default to 'poems'
//   const [viewMode, setViewMode] = useState('grid')
//   const [poemsPage, setPoemsPage] = useState(1)
//   const [booksPage, setBooksPage] = useState(1)
//   const [showShareMenu, setShowShareMenu] = useState(false)
//   const [copiedLink, setCopiedLink] = useState(false)

//   // ============================================
//   // VIDEO PLAYER MODAL STATE (Audio uses global player)
//   // ============================================
//   const [videoModal, setVideoModal] = useState({
//     isOpen: false,
//     video: null
//   })

//   // Check if URL is YouTube
//   const isYouTubeUrl = (url) => {
//     if (!url) return false
//     return url.includes('youtube.com') || url.includes('youtu.be')
//   }

//   // Get YouTube embed URL
//   const getYouTubeEmbedUrl = (url) => {
//     const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)?.[1]
//     return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1` : url
//   }

//   // Open video modal
//   const openVideoPlayer = (video) => {
//     if (!video?.videoUrl) {
//       navigate(`/video/${video.slug}`)
//       return
//     }
//     setVideoModal({ isOpen: true, video })
//   }

//   // Close video modal
//   const closeVideoPlayer = () => {
//     setVideoModal({ isOpen: false, video: null })
//   }

//   // Play audio using global AudioPlayerContext
//   const playAudioGlobal = (audio, audioList = []) => {
//     if (!audio?.audioUrl) {
//       navigate(`/audio/${audio.slug}`)
//       return
//     }
//     // Find index in list for playlist support
//     const index = audioList.findIndex(a => a._id === audio._id)
//     audioPlayer.playAudio(audio, audioList, index >= 0 ? index : 0)
//   }

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

//   const author = authorData?.data || authorData

//   // ============================================
//   // FETCH AUTHOR CONTENT USING SLUG
//   // ============================================
  
//   const { 
//     data: poemsResponse, 
//     isLoading: poemsLoading 
//   } = useQuery({
//     queryKey: ['author-poems', slug, poemsPage],
//     queryFn: () => authorAPI.getAuthorPoems(slug, { page: poemsPage, limit: 12 }),
//     enabled: !!slug
//   })

//   const { 
//     data: booksResponse, 
//     isLoading: booksLoading 
//   } = useQuery({
//     queryKey: ['author-books', slug, booksPage],
//     queryFn: () => authorAPI.getAuthorBooks(slug, { page: booksPage, limit: 8 }),
//     enabled: !!slug
//   })

//   const { 
//     data: audioResponse, 
//     isLoading: audioLoading 
//   } = useQuery({
//     queryKey: ['author-audio', slug],
//     queryFn: () => authorAPI.getAuthorAudio(slug, { limit: 6 }),
//     enabled: !!slug
//   })

//   const { 
//     data: videosResponse, 
//     isLoading: videosLoading 
//   } = useQuery({
//     queryKey: ['author-videos', slug],
//     queryFn: () => authorAPI.getAuthorVideos(slug, { limit: 6 }),
//     enabled: !!slug
//   })

//   const { 
//     data: timelineResponse, 
//     isLoading: timelineLoading 
//   } = useQuery({
//     queryKey: ['author-timeline', slug],
//     queryFn: () => authorAPI.getAuthorTimeline(slug),
//     enabled: !!slug
//   })

//   const { 
//     data: galleryResponse, 
//     isLoading: galleryLoading 
//   } = useQuery({
//     queryKey: ['author-gallery', slug],
//     queryFn: () => authorAPI.getAuthorGallery(slug),
//     enabled: !!slug
//   })

//   const { 
//     data: quotesResponse, 
//     isLoading: quotesLoading 
//   } = useQuery({
//     queryKey: ['author-quotes', slug],
//     queryFn: () => authorAPI.getAuthorQuotes(slug),
//     enabled: !!slug
//   })

//   // Extract data from responses
//   const extractData = (response, defaultValue = []) => {
//     if (!response) return defaultValue
//     if (response.data?.data) return response.data.data
//     if (response.data) return response.data
//     if (Array.isArray(response)) return response
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

//   const unfollowMutation = useMutation({
//     mutationFn: () => userAPI.unfollowAuthor(author?._id),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['author', slug])
//       toast.success(`Unfollowed ${author?.name}`)
//     },
//     onError: () => toast.error('Failed to unfollow author')
//   })

//   const isFollowing = user?.following?.includes(author?._id) || false

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

//   // ============================================
//   // SOCIAL SHARE FUNCTIONALITY
//   // ============================================
  
//   const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
//   const shareTitle = author ? `Check out ${author.name} on ZauqApp` : 'Check out this author on ZauqApp'
//   const shareText = author?.bio ? author.bio.substring(0, 100) : 'Explore the literary works of this renowned poet and author.'

//   const shareLinks = [
//     {
//       name: 'WhatsApp',
//       icon: MessageCircle,
//       color: 'bg-green-500 hover:bg-green-600',
//       url: `https://wa.me/?text=${encodeURIComponent(`${shareTitle}\n\n${shareText}\n\n${shareUrl}`)}`
//     },
//     {
//       name: 'Twitter',
//       icon: Twitter,
//       color: 'bg-[#1DA1F2] hover:bg-[#1a8cd8]',
//       url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`
//     },
//     {
//       name: 'Facebook',
//       icon: Facebook,
//       color: 'bg-[#1877F2] hover:bg-[#1664d9]',
//       url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
//     },
//     {
//       name: 'LinkedIn',
//       icon: Linkedin,
//       color: 'bg-[#0077B5] hover:bg-[#006396]',
//       url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
//     },
//     {
//       name: 'Email',
//       icon: Mail,
//       color: 'bg-gray-600 hover:bg-gray-700',
//       url: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`
//     }
//   ]

//   const copyToClipboard = async () => {
//     try {
//       await navigator.clipboard.writeText(shareUrl)
//       setCopiedLink(true)
//       toast.success('Link copied to clipboard!')
//       setTimeout(() => setCopiedLink(false), 2000)
//     } catch (err) {
//       toast.error('Failed to copy link')
//     }
//   }

//   const handleShare = () => {
//     setShowShareMenu(!showShareMenu)
//   }

//   const formatDuration = (seconds) => {
//     if (!seconds) return 'N/A'
//     const mins = Math.floor(seconds / 60)
//     const secs = seconds % 60
//     return `${mins}:${secs.toString().padStart(2, '0')}`
//   }

//   // ALL TABS - REORDERED: Poems, Books, Audio, Videos, Timeline, Gallery, Quotes
//   const tabs = [
//     { id: 'poems', label: 'Poems', icon: BookOpen },
//     { id: 'books', label: 'Books', icon: BookMarked },
//     { id: 'audio', label: 'Audio', icon: Headphones },
//     { id: 'videos', label: 'Videos', icon: Video },
//     { id: 'timeline', label: 'Timeline', icon: Calendar },
//     { id: 'gallery', label: 'Gallery', icon: ImageIcon },
//     { id: 'quotes', label: 'Quotes', icon: Quote }
//   ]

//   // Loading state
//   if (authorLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="relative">
//             <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-amber-500 rounded-2xl animate-pulse mx-auto mb-6 flex items-center justify-center">
//               <Users className="h-10 w-10 text-white" />
//             </div>
//             <div className="absolute -top-2 -right-2">
//               <Sparkles className="h-6 w-6 text-amber-400 animate-spin" />
//             </div>
//           </div>
//           <p className="text-gray-600 font-medium">Loading author...</p>
//           <p className="text-sm text-gray-400 mt-1">Discovering literary greatness</p>
//         </div>
//       </div>
//     )
//   }

//   // Error state
//   if (authorError || !author) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
//         <div className="max-w-4xl mx-auto px-4 pt-32 pb-16 text-center">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-2xl mb-6">
//             <AlertCircle className="h-10 w-10 text-red-500" />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Author Not Found</h1>
//           <p className="text-gray-500 mb-6">The author you are looking for does not exist.</p>
//           <Link to="/authors" className="btn-primary inline-flex items-center gap-2">
//             <ChevronLeft className="h-4 w-4" />
//             <span>Browse All Authors</span>
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   // ============================================
//   // RENDER FUNCTIONS WITH EMPTY STATES
//   // ============================================

//   const EmptyState = ({ icon: Icon, title, message }) => (
//     <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
//       <Icon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//       <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
//       <p className="text-gray-500">{message}</p>
//     </div>
//   )

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
//         <EmptyState 
//           icon={BookOpen}
//           title="No Poems Yet"
//           message="Poems by this author will appear here once added."
//         />
//       )
//     }

//     return (
//       <>
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="font-semibold text-gray-900">
//             Poems ({poemsPagination.total || poems.length})
//           </h3>
//           <div className="flex border border-gray-200 rounded-lg overflow-hidden">
//             <button
//               onClick={() => setViewMode('grid')}
//               className={`p-2 transition-all ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
//             >
//               <Grid className="h-4 w-4" />
//             </button>
//             <button
//               onClick={() => setViewMode('list')}
//               className={`p-2 transition-all ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
//             >
//               <List className="h-4 w-4" />
//             </button>
//           </div>
//         </div>
        
//         <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
//           {poems.map((poem, index) => (
//             <motion.div
//               key={poem._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: Math.min(index * 0.05, 0.3) }}
//               whileHover={{ y: -4 }}
//             >
//               <Link
//                 to={`/poem/${poem.slug}`}
//                 className="block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all group"
//               >
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
//               </Link>
//             </motion.div>
//           ))}
//         </div>

//         {poemsPagination.totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-6">
//             <button
//               onClick={() => setPoemsPage(p => Math.max(1, p - 1))}
//               disabled={poemsPage === 1}
//               className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 transition-all"
//             >
//               Previous
//             </button>
//             <span className="px-3 py-1 text-sm text-gray-600">
//               {poemsPage} / {poemsPagination.totalPages}
//             </span>
//             <button
//               onClick={() => setPoemsPage(p => Math.min(poemsPagination.totalPages, p + 1))}
//               disabled={poemsPage === poemsPagination.totalPages}
//               className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 transition-all"
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
//         <EmptyState 
//           icon={BookMarked}
//           title="No Books Available"
//           message="Books by this author will appear here once added."
//         />
//       )
//     }

//     return (
//       <>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {books.map((book, index) => (
//             <motion.div
//               key={book._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: Math.min(index * 0.05, 0.3) }}
//               whileHover={{ y: -4 }}
//             >
//               <Link
//                 to={`/book/${book.slug}`}
//                 className="block bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group"
//               >
//                 {book.coverImage && (
//                   <div className="relative h-48 overflow-hidden">
//                     <img 
//                       src={book.coverImage} 
//                       alt={book.title}
//                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                     />
//                     {book.isPremium && (
//                       <div className="absolute top-2 right-2">
//                         <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-medium rounded-full">
//                           <Crown className="h-3 w-3" />
//                           Premium
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 )}
//                 <div className="p-4">
//                   <h4 className="font-medium text-gray-900 line-clamp-1">{book.title}</h4>
//                   <p className="text-sm text-gray-500 line-clamp-2 mt-1">{book.description}</p>
//                   <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
//                     <span className="capitalize">{book.type || 'Ebook'}</span>
//                     <span className="flex items-center gap-1">
//                       <Eye className="h-3 w-3" />
//                       {book.stats?.views?.toLocaleString() || 0}
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <Download className="h-3 w-3" />
//                       {book.stats?.downloads?.toLocaleString() || 0}
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>

//         {booksPagination.totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-6">
//             <button
//               onClick={() => setBooksPage(p => Math.max(1, p - 1))}
//               disabled={booksPage === 1}
//               className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 transition-all"
//             >
//               Previous
//             </button>
//             <span className="px-3 py-1 text-sm text-gray-600">
//               {booksPage} / {booksPagination.totalPages}
//             </span>
//             <button
//               onClick={() => setBooksPage(p => Math.min(booksPagination.totalPages, p + 1))}
//               disabled={booksPage === booksPagination.totalPages}
//               className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 transition-all"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </>
//     )
//   }

//   // ============================================
//   // AUDIO: Uses global AudioPlayerContext (bottom bar)
//   // ============================================
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
//         <EmptyState 
//           icon={Headphones}
//           title="No Audio Content"
//           message="Audio recordings will appear here once added."
//         />
//       )
//     }

//     const isCurrentlyPlaying = (audio) => {
//       return audioPlayer?.currentAudio?._id === audio._id && audioPlayer?.isPlaying
//     }

//     return (
//       <div className="space-y-3">
//         {audioItems.map((audio, index) => (
//           <motion.div
//             key={audio._id}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: Math.min(index * 0.05, 0.3) }}
//           >
//             <div
//               onClick={() => playAudioGlobal(audio, audioItems)}
//               className={`block rounded-xl p-4 shadow-sm border transition-all flex items-center gap-4 group cursor-pointer ${
//                 isCurrentlyPlaying(audio) 
//                   ? 'bg-primary-50 border-primary-200 shadow-md' 
//                   : 'bg-white border-gray-100 hover:shadow-md'
//               }`}
//             >
//               <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 ${
//                 isCurrentlyPlaying(audio)
//                   ? 'bg-primary-600'
//                   : 'bg-gradient-to-br from-primary-100 to-amber-100'
//               }`}>
//                 {isCurrentlyPlaying(audio) ? (
//                   <div className="flex gap-0.5">
//                     <div className="w-1 h-4 bg-white animate-pulse" />
//                     <div className="w-1 h-4 bg-white animate-pulse delay-75" />
//                     <div className="w-1 h-4 bg-white animate-pulse delay-150" />
//                   </div>
//                 ) : (
//                   <Play className="h-6 w-6 text-primary-600" />
//                 )}
//               </div>
//               <div className="flex-1">
//                 <h4 className={`font-medium line-clamp-1 ${
//                   isCurrentlyPlaying(audio) ? 'text-primary-700' : 'text-gray-900'
//                 }`}>
//                   {audio.title}
//                 </h4>
//                 <p className="text-sm text-gray-500 capitalize">{audio.type}</p>
//               </div>
//               <div className="text-sm text-gray-400">
//                 {formatDuration(audio.duration)}
//               </div>
//               {/* View Details link - stops propagation */}
//               <Link
//                 to={`/audio/${audio.slug}`}
//                 onClick={(e) => e.stopPropagation()}
//                 className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-primary-600 transition-colors"
//                 title="View Details"
//               >
//                 <ExternalLink className="h-4 w-4" />
//               </Link>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     )
//   }

//   // ============================================
//   // VIDEOS: Play inline modal
//   // ============================================
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
//         <EmptyState 
//           icon={Video}
//           title="No Video Content"
//           message="Videos will appear here once added."
//         />
//       )
//     }

//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {videos.map((video, index) => (
//           <motion.div
//             key={video._id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: Math.min(index * 0.05, 0.3) }}
//             whileHover={{ y: -4 }}
//           >
//             <div
//               onClick={() => openVideoPlayer(video)}
//               className="block bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group cursor-pointer"
//             >
//               <div className="relative h-40 bg-gradient-to-br from-gray-900 to-gray-800">
//                 {video.thumbnail ? (
//                   <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
//                 ) : (
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <Play className="h-12 w-12 text-white/50" />
//                   </div>
//                 )}
//                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
//                   <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform opacity-0 group-hover:opacity-100">
//                     <Play className="h-5 w-5 text-primary-600 ml-0.5" />
//                   </div>
//                 </div>
//                 {video.duration && (
//                   <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 rounded-md text-white text-xs">
//                     {formatDuration(video.duration)}
//                   </div>
//                 )}
//                 {/* Source badge */}
//                 <div className="absolute bottom-2 left-2">
//                   <span className="px-2 py-0.5 bg-black/70 text-white text-xs rounded-full flex items-center gap-1">
//                     {isYouTubeUrl(video.videoUrl) ? 
//                       <Youtube className="h-3 w-3" /> : 
//                       <FileVideo className="h-3 w-3" />
//                     }
//                     <span>{isYouTubeUrl(video.videoUrl) ? 'YouTube' : 'Video'}</span>
//                   </span>
//                 </div>
//                 {video.isPremium && (
//                   <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-yellow-500 text-white text-xs rounded">
//                     Premium
//                   </div>
//                 )}
//               </div>
//               <div className="p-4">
//                 <h4 className="font-medium text-gray-900 line-clamp-1">{video.title}</h4>
//                 <div className="flex items-center justify-between mt-2">
//                   <div className="flex items-center gap-3 text-xs text-gray-500">
//                     <span className="capitalize">{video.type}</span>
//                     <span className="flex items-center gap-1">
//                       <Eye className="h-3 w-3" />
//                       {video.stats?.views?.toLocaleString() || 0}
//                     </span>
//                   </div>
//                   {/* View Details link - stops propagation */}
//                   <Link
//                     to={`/video/${video.slug}`}
//                     onClick={(e) => e.stopPropagation()}
//                     className="text-primary-600 hover:text-primary-700 text-xs font-medium flex items-center gap-1"
//                   >
//                     Details <ExternalLink className="h-3 w-3" />
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
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
//         <EmptyState 
//           icon={Calendar}
//           title="No Timeline Events"
//           message="Important life events will be added to the timeline."
//         />
//       )
//     }

//     return (
//       <div className="bg-white rounded-xl p-6 border border-gray-100">
//         <div className="space-y-6">
//           {timeline.map((event, index) => (
//             <div key={index} className="relative flex items-start">
//               <div className="flex-shrink-0 w-24">
//                 <span className="font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-full text-sm">
//                   {event.year}
//                 </span>
//               </div>
//               <div className="flex-shrink-0 w-0.5 bg-gradient-to-b from-primary-500 to-amber-500 h-full absolute left-28 top-0 bottom-0" />
//               <div className="flex-1 ml-8 pb-6">
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <p className="text-gray-800 font-medium">{event.event}</p>
//                   {event.description && (
//                     <p className="text-sm text-gray-500 mt-1">{event.description}</p>
//                   )}
//                 </div>
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
//         <EmptyState 
//           icon={ImageIcon}
//           title="No Gallery Images"
//           message="Images will appear here once added to the gallery."
//         />
//       )
//     }

//     return (
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {gallery.map((item, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: Math.min(index * 0.05, 0.3) }}
//             whileHover={{ scale: 1.05 }}
//             className="group cursor-pointer"
//           >
//             <div className="relative overflow-hidden rounded-xl shadow-sm">
//               <img 
//                 src={item.url} 
//                 alt={item.caption || `Image ${index + 1}`}
//                 className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
//               />
//               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
//               <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
//                 {item.caption && (
//                   <p className="text-white text-xs line-clamp-2">{item.caption}</p>
//                 )}
//               </div>
//             </div>
//           </motion.div>
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
//         <EmptyState 
//           icon={Quote}
//           title="No Quotes Available"
//           message="Famous quotes by this author will appear here."
//         />
//       )
//     }

//     return (
//       <div className="space-y-4">
//         {quotes.map((quote, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: Math.min(index * 0.05, 0.3) }}
//             className="bg-gradient-to-r from-primary-50 to-amber-50 rounded-xl p-6 border-l-4 border-primary-500"
//           >
//             <Quote className="h-8 w-8 text-primary-400 mb-3 opacity-50" />
//             <p className="text-lg text-gray-700 italic">"{quote.text}"</p>
//             {quote.source && (
//               <p className="text-sm text-gray-500 mt-3">— {quote.source}</p>
//             )}
//           </motion.div>
//         ))}
//       </div>
//     )
//   }

//   const renderSocialLinks = () => {
//     const hasSocialLinks = Object.values(socialLinks).some(v => v)
    
//     if (!hasSocialLinks) return null

//     const socialIcons = {
//       website: { icon: Globe, color: 'text-gray-600 hover:text-gray-900' },
//       twitter: { icon: Twitter, color: 'text-gray-600 hover:text-[#1DA1F2]' },
//       facebook: { icon: Facebook, color: 'text-gray-600 hover:text-[#1877F2]' },
//       instagram: { icon: Instagram, color: 'text-gray-600 hover:text-[#E4405F]' },
//       youtube: { icon: Youtube, color: 'text-gray-600 hover:text-[#FF0000]' },
//       wikipedia: { icon: ExternalLink, color: 'text-gray-600 hover:text-gray-900' }
//     }

//     return (
//       <div className="mt-6 pt-6 border-t border-gray-100">
//         <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//           <Share2 className="h-4 w-4 text-primary-600" />
//           Connect & Follow
//         </h3>
//         <div className="flex flex-wrap gap-3">
//           {Object.entries(socialLinks).map(([platform, url]) => {
//             if (!url) return null
//             const social = socialIcons[platform]
//             if (!social) return null
//             const Icon = social.icon
//             return (
//               <a
//                 key={platform}
//                 href={url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all ${social.color}`}
//               >
//                 <Icon className="h-4 w-4" />
//                 <span className="text-sm capitalize">{platform}</span>
//               </a>
//             )
//           })}
//         </div>
//       </div>
//     )
//   }

//   // Get counts for each tab
//   const tabCounts = {
//     poems: poemsPagination.total || poems.length,
//     books: booksPagination.total || books.length,
//     audio: audioItems.length,
//     videos: videos.length,
//     timeline: timeline.length,
//     gallery: gallery.length,
//     quotes: quotes.length
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        
//         {/* ============================================
//             VIDEO PLAYER MODAL ONLY (Audio uses global bar)
//         ============================================ */}
//         <AnimatePresence>
//           {videoModal.isOpen && videoModal.video && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
//               onClick={closeVideoPlayer}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 className="relative w-full max-w-5xl bg-black rounded-xl overflow-hidden"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 {/* Close button */}
//                 <button
//                   onClick={closeVideoPlayer}
//                   className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors text-white"
//                 >
//                   <X className="h-6 w-6" />
//                 </button>

//                 {/* Title overlay */}
//                 <div className="absolute top-4 left-4 z-10 text-white pointer-events-none">
//                   <h3 className="text-lg font-semibold">{videoModal.video.title}</h3>
//                   <p className="text-sm text-gray-300">{author?.name}</p>
//                 </div>

//                 {/* Video Player */}
//                 <div className="w-full bg-black" style={{ minHeight: '400px' }}>
//                   {isYouTubeUrl(videoModal.video.videoUrl) ? (
//                     /* YouTube video - iframe */
//                     <iframe
//                       src={getYouTubeEmbedUrl(videoModal.video.videoUrl)}
//                       title={videoModal.video.title}
//                       className="w-full aspect-video"
//                       style={{ height: '70vh', border: 'none' }}
//                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                       allowFullScreen
//                     />
//                   ) : (
//                     /* Uploaded video - native video tag */
//                     <video
//                       src={videoModal.video.videoUrl}
//                       poster={videoModal.video.thumbnail}
//                       className="w-full"
//                       style={{ height: '70vh' }}
//                       controls
//                       controlsList="nodownload"
//                       autoPlay
//                     />
//                   )}
//                 </div>

//                 {/* Footer */}
//                 <div className="p-4 bg-gray-900">
//                   <div className="flex items-center justify-between">
//                     <span className="text-white text-sm">
//                       {isYouTubeUrl(videoModal.video.videoUrl) ? 'YouTube' : 'Direct Video'}
//                     </span>
//                     <Link
//                       to={`/video/${videoModal.video.slug}`}
//                       onClick={closeVideoPlayer}
//                       className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
//                     >
//                       <ExternalLink className="h-4 w-4" />
//                       <span>View Full Page</span>
//                     </Link>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Back Link */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="mb-6"
//         >
//           <Link 
//             to="/authors" 
//             className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors group"
//           >
//             <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
//             <span>Back to Authors</span>
//           </Link>
//         </motion.div>

//         {/* Cover Section - With Author Name Inside */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="relative mb-16"
//         >
//           {/* Cover Image Container - 3:1 aspect ratio */}
//           <div className="relative w-full rounded-2xl overflow-hidden shadow-xl">
//             <div className="relative" style={{ paddingBottom: '33.33%' }}>
//               {author.coverImage ? (
//                 <>
//                   <img 
//                     src={author.coverImage} 
//                     alt={`${author.name} cover`}
//                     className="absolute inset-0 w-full h-full object-cover object-center"
//                   />
//                   {/* Dark Gradient Overlay for Text Readability */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
//                 </>
//               ) : (
//                 <div className="absolute inset-0 bg-gradient-to-r from-primary-800 via-primary-700 to-amber-800">
//                   <div className="absolute inset-0 opacity-20">
//                     <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full filter blur-3xl animate-pulse" />
//                     <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200 rounded-full filter blur-3xl animate-pulse delay-1000" />
//                   </div>
//                 </div>
//               )}
              
//               {/* Author Name Overlay - Inside Cover Image */}
//               <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10">
//                 <div className="space-y-2">
//                   {/* Roman Name */}
//                   <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
//                     {author.name}
//                   </h1>
//                   {/* Urdu Name */}
//                   {author.nameUrdu && (
//                     <p className="urdu-text text-xl md:text-2xl text-white/90 drop-shadow-lg" dir="rtl">
//                       {author.nameUrdu}
//                     </p>
//                   )}
//                   {/* Era & Verified Badges */}
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {author.era && (
//                       <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-xs md:text-sm font-medium">
//                         <Award className="h-3.5 w-3.5" />
//                         {author.era} Era
//                       </span>
//                     )}
//                     {author.isVerified && (
//                       <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/80 backdrop-blur-md rounded-full text-white text-xs md:text-sm font-medium">
//                         <Check className="h-3.5 w-3.5" />
//                         Verified Author
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           {/* Profile Image - Positioned Above Cover (overlapping) */}
//           <div className="absolute -bottom-12 left-6 md:left-8 z-20">
//             <div className="relative">
//               <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
//                 <img
//                   src={author.avatar || `https://ui-avatars.com/api/?name=${author.name}&background=8B4513&color=fff&size=128&bold=true`}
//                   alt={author.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               {author.isVerified && (
//                 <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 border-2 border-white">
//                   <Check className="h-3 w-3 text-white" />
//                 </div>
//               )}
//             </div>
//           </div>
//         </motion.div>

//         {/* Empty spacer to account for overlapping profile image */}
//         <div className="h-12 md:h-16"></div>

//         {/* Stats Cards - Premium Design */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
//         >
//           {[
//             { icon: BookOpen, label: 'Poems', value: author.stats?.poemsCount || 0, color: 'from-blue-500 to-blue-600' },
//             { icon: BookMarked, label: 'Books', value: author.stats?.booksCount || 0, color: 'from-purple-500 to-purple-600' },
//             { icon: Users, label: 'Followers', value: (author.stats?.followers || 0).toLocaleString(), color: 'from-amber-500 to-amber-600' },
//             { icon: Eye, label: 'Views', value: (author.stats?.views || 0).toLocaleString(), color: 'from-green-500 to-green-600' },
//           ].map((stat, index) => (
//             <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
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

//         {/* Action Buttons Row */}
//         <div className="flex justify-end items-center gap-3 mb-8">
//           <button
//             onClick={handleFollowToggle}
//             disabled={followMutation.isPending || unfollowMutation.isPending}
//             className={`px-6 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 ${
//               isFollowing
//                 ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 : 'bg-gradient-to-r from-primary-600 to-amber-500 text-white hover:shadow-lg hover:-translate-y-0.5'
//             }`}
//           >
//             {isFollowing ? (
//               <>
//                 <UserCheck className="h-4 w-4" />
//                 <span>Following</span>
//               </>
//             ) : (
//               <>
//                 <UserPlus className="h-4 w-4" />
//                 <span>Follow</span>
//               </>
//             )}
//           </button>
          
//           {/* Share Button with Menu */}
//           <div className="relative">
//             <button 
//               onClick={handleShare}
//               className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all hover:shadow-md"
//             >
//               <Share2 className="h-5 w-5 text-gray-600" />
//             </button>
            
//             <AnimatePresence>
//               {showShareMenu && (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.9, y: -10 }}
//                   animate={{ opacity: 1, scale: 1, y: 0 }}
//                   exit={{ opacity: 0, scale: 0.9, y: -10 }}
//                   className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden"
//                 >
//                   <div className="p-3 border-b border-gray-100">
//                     <p className="text-sm font-medium text-gray-700">Share this author</p>
//                   </div>
//                   <div className="p-2">
//                     {shareLinks.map((link) => (
//                       <a
//                         key={link.name}
//                         href={link.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         onClick={() => setShowShareMenu(false)}
//                         className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg ${link.color} text-white mb-1 transition-all hover:shadow-md`}
//                       >
//                         <link.icon className="h-4 w-4" />
//                         <span className="text-sm font-medium">{link.name}</span>
//                       </a>
//                     ))}
//                     <button
//                       onClick={copyToClipboard}
//                       className="flex items-center gap-3 w-full px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all mt-1"
//                     >
//                       {copiedLink ? (
//                         <>
//                           <Check className="h-4 w-4 text-green-600" />
//                           <span className="text-sm font-medium text-green-600">Copied!</span>
//                         </>
//                       ) : (
//                         <>
//                           <Copy className="h-4 w-4 text-gray-600" />
//                           <span className="text-sm font-medium text-gray-700">Copy Link</span>
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>

//         {/* Bio & Info Section */}
//         <div className="grid md:grid-cols-3 gap-6 mb-8">
//           <div className="md:col-span-2">
//             <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//               <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                 <Quote className="h-5 w-5 text-primary-600" />
//                 Biography
//               </h2>
//               <p className="text-gray-700 leading-relaxed whitespace-pre-line">{author.bio}</p>
//               {author.bioUrdu && (
//                 <p className="urdu-text text-gray-700 leading-relaxed mt-4 pt-4 border-t border-gray-100" dir="rtl">
//                   {author.bioUrdu}
//                 </p>
//               )}
//               <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100">
//                 {author.birthDate && (
//                   <span className="flex items-center gap-2 text-sm text-gray-500">
//                     <Calendar className="h-4 w-4 text-primary-500" />
//                     <span>
//                       {new Date(author.birthDate).getFullYear()} 
//                       {author.deathDate && ` - ${new Date(author.deathDate).getFullYear()}`}
//                     </span>
//                   </span>
//                 )}
//                 {author.birthPlace && (
//                   <span className="flex items-center gap-2 text-sm text-gray-500">
//                     <MapPin className="h-4 w-4 text-primary-500" />
//                     <span>{author.birthPlace}</span>
//                   </span>
//                 )}
//               </div>
//               {renderSocialLinks()}
//             </div>
//           </div>
          
//           <div>
//             <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//               <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                 <Star className="h-5 w-5 text-amber-500" />
//                 Literary Genres
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {author.genres?.map((genre, index) => (
//                   <span key={index} className="px-3 py-1.5 bg-gradient-to-r from-primary-50 to-amber-50 rounded-full text-sm text-gray-700 capitalize">
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

//         {/* Tabs - Premium Design - NOW AT TOP OF CONTENT */}
//         <div className="flex flex-wrap overflow-x-auto scrollbar-hide gap-2 mb-6 border-b border-gray-200 pb-0">
//           {tabs.map((tab) => {
//             const Icon = tab.icon
//             return (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`relative flex items-center gap-2 px-5 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 rounded-t-xl ${
//                   activeTab === tab.id
//                     ? 'text-primary-600 bg-white shadow-sm'
//                     : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50/50'
//                 }`}
//               >
//                 <Icon className={`h-4 w-4 transition-transform duration-200 ${activeTab === tab.id ? 'scale-110' : ''}`} />
//                 <span>{tab.label}</span>
//                 <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full transition-all ${
//                   activeTab === tab.id 
//                     ? 'bg-primary-100 text-primary-700 ring-1 ring-primary-200/50' 
//                     : 'bg-gray-100 text-gray-500'
//                 }`}>
//                   {tabCounts[tab.id]}
//                 </span>
//                 {activeTab === tab.id && (
//                   <motion.div
//                     layoutId="activeTabIndicator"
//                     className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-amber-500 rounded-full"
//                     transition={{ type: "spring", stiffness: 500, damping: 30 }}
//                   />
//                 )}
//               </button>
//             )
//           })}
//         </div>

//         {/* Tab Content */}
//         <motion.div
//           key={activeTab}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//           className="mb-8"
//         >
//           {activeTab === 'poems' && renderWorks()}
//           {activeTab === 'books' && renderBooks()}
//           {activeTab === 'audio' && renderAudio()}
//           {activeTab === 'videos' && renderVideos()}
//           {activeTab === 'timeline' && renderTimeline()}
//           {activeTab === 'gallery' && renderGallery()}
//           {activeTab === 'quotes' && renderQuotes()}
//         </motion.div>
//       </div>
//     </div>
//   )
// }

// export default AuthorDetailPage




















// client/src/pages/public/AuthorDetailPage.jsx
import React, { useState, useEffect, lazy, Suspense } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import {
  Heart, Share2, BookOpen, Calendar, MapPin, Users,
  ChevronLeft, Clock, Play, Grid, List, Loader2,
  AlertCircle, UserPlus, UserCheck, Eye, Music, Video,
  Quote, Image as ImageIcon, Twitter, Facebook, Instagram,
  Youtube, Globe, ExternalLink, BookMarked, Headphones, Download,
  Copy, Check, MessageCircle, Linkedin, Mail, X, ChevronDown,
  Award, Star, TrendingUp, Zap, Sparkles, Crown, FileText, Volume2,
  User, Menu, FileVideo
} from 'lucide-react'
import authorAPI from '../../api/authorAPI'
import userAPI from '../../api/userAPI'
import { useAudioPlayer } from '../../context/AudioPlayerContext'

// Lazy load components for better performance
const PoemCard = lazy(() => import('../../components/PoemCard'))
const BookCard = lazy(() => import('../../components/BookCard'))
const AudioCard = lazy(() => import('../../components/AudioCard'))
const VideoCard = lazy(() => import('../../components/VideoCard'))

const AuthorDetailPage = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { user } = useSelector(state => state.auth)
  const audioPlayer = useAudioPlayer()
  
  const [activeTab, setActiveTab] = useState('biography')
  const [viewMode, setViewMode] = useState('grid')
  const [poemsPage, setPoemsPage] = useState(1)
  const [booksPage, setBooksPage] = useState(1)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Fetch author data FIRST
  const { 
    data: authorData, 
    isLoading: authorLoading, 
    error: authorError 
  } = useQuery({
    queryKey: ['author', slug],
    queryFn: () => authorAPI.getAuthor(slug),
    enabled: !!slug,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  })

  const author = authorData?.data || authorData

  // Fetch all content data upfront (not conditionally) to get counts
  const { 
    data: poemsResponse, 
    isLoading: poemsLoading,
    isFetching: poemsFetching
  } = useQuery({
    queryKey: ['author-poems', slug, poemsPage],
    queryFn: () => authorAPI.getAuthorPoems(slug, { page: poemsPage, limit: 12 }),
    enabled: !!slug,
    staleTime: 2 * 60 * 1000,
  })

  const { 
    data: booksResponse, 
    isLoading: booksLoading 
  } = useQuery({
    queryKey: ['author-books', slug, booksPage],
    queryFn: () => authorAPI.getAuthorBooks(slug, { page: booksPage, limit: 8 }),
    enabled: !!slug,
    staleTime: 2 * 60 * 1000,
  })

  const { 
    data: audioResponse, 
    isLoading: audioLoading 
  } = useQuery({
    queryKey: ['author-audio', slug],
    queryFn: () => authorAPI.getAuthorAudio(slug, { limit: 12 }),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  })

  const { 
    data: videosResponse, 
    isLoading: videosLoading 
  } = useQuery({
    queryKey: ['author-videos', slug],
    queryFn: () => authorAPI.getAuthorVideos(slug, { limit: 12 }),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  })

  const { 
    data: timelineResponse, 
    isLoading: timelineLoading 
  } = useQuery({
    queryKey: ['author-timeline', slug],
    queryFn: () => authorAPI.getAuthorTimeline(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  })

  const { 
    data: galleryResponse, 
    isLoading: galleryLoading 
  } = useQuery({
    queryKey: ['author-gallery', slug],
    queryFn: () => authorAPI.getAuthorGallery(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  })

  const { 
    data: quotesResponse, 
    isLoading: quotesLoading 
  } = useQuery({
    queryKey: ['author-quotes', slug],
    queryFn: () => authorAPI.getAuthorQuotes(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  })

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

  // Get counts from author stats or fetched data
  const poemsCount = author?.stats?.poemsCount || poemsPagination.total || poems.length || 0
  const booksCount = author?.stats?.booksCount || booksPagination.total || books.length || 0
  const audioCount = audioItems.length || 0
  const videosCount = videos.length || 0
  const timelineCount = timeline.length || 0
  const galleryCount = gallery.length || 0
  const quotesCount = quotes.length || 0

  // Update document title for SEO
  useEffect(() => {
    if (author?.name) {
      document.title = `${author.name} | ZauqApp - Poet, Author & Literary Works`
    }
    return () => {
      document.title = 'ZauqApp - Literary Platform'
    }
  }, [author?.name])

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Video modal state
  const [videoModal, setVideoModal] = useState({
    isOpen: false,
    video: null
  })

  const isYouTubeUrl = (url) => {
    if (!url) return false
    return url.includes('youtube.com') || url.includes('youtu.be')
  }

  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)?.[1]
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1` : url
  }

  const openVideoPlayer = (video) => {
    if (!video?.videoUrl) {
      navigate(`/video/${video.slug}`)
      return
    }
    setVideoModal({ isOpen: true, video })
    document.body.style.overflow = 'hidden'
  }

  const closeVideoPlayer = () => {
    setVideoModal({ isOpen: false, video: null })
    document.body.style.overflow = 'unset'
  }

  const playAudioGlobal = (audio, audioList = []) => {
    if (!audio?.audioUrl) {
      navigate(`/audio/${audio.slug}`)
      return
    }
    const index = audioList.findIndex(a => a._id === audio._id)
    audioPlayer.playAudio(audio, audioList, index >= 0 ? index : 0)
  }

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

  // Share functionality
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = author ? `Check out ${author.name} on ZauqApp` : 'Check out this author on ZauqApp'
  const shareText = author?.bio ? author.bio.substring(0, 100) : 'Explore the literary works of this renowned poet and author.'

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500 hover:bg-green-600',
      url: `https://wa.me/?text=${encodeURIComponent(`${shareTitle}\n\n${shareText}\n\n${shareUrl}`)}`
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-[#1DA1F2] hover:bg-[#1a8cd8]',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-[#1877F2] hover:bg-[#1664d9]',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-[#0077B5] hover:bg-[#006396]',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-gray-600 hover:bg-gray-700',
      url: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`
    }
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopiedLink(true)
      toast.success('Link copied to clipboard!')
      setTimeout(() => setCopiedLink(false), 2000)
    } catch (err) {
      toast.error('Failed to copy link')
    }
  }

  const handleShare = () => {
    setShowShareMenu(!showShareMenu)
  }

  const formatDuration = (seconds) => {
    if (!seconds) return 'N/A'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Tabs with counts - using the calculated counts
  const tabs = [
    { id: 'biography', label: 'Biography', icon: User, mobileLabel: 'Bio' },
    { id: 'poems', label: 'Poems', icon: BookOpen, count: poemsCount, mobileLabel: 'Poems' },
    { id: 'books', label: 'Books', icon: BookMarked, count: booksCount, mobileLabel: 'Books' },
    { id: 'audio', label: 'Audio', icon: Headphones, count: audioCount, mobileLabel: 'Audio' },
    { id: 'videos', label: 'Videos', icon: Video, count: videosCount, mobileLabel: 'Videos' },
    { id: 'timeline', label: 'Timeline', icon: Calendar, count: timelineCount, mobileLabel: 'Timeline' },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon, count: galleryCount, mobileLabel: 'Gallery' },
    { id: 'quotes', label: 'Quotes', icon: Quote, count: quotesCount, mobileLabel: 'Quotes' }
  ]

  // Loading skeleton for better UX
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3 mt-2"></div>
        </div>
      ))}
    </div>
  )

  // Early return for loading state
  if (authorLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-amber-500 rounded-2xl animate-pulse mx-auto mb-6 flex items-center justify-center">
              <Users className="h-10 w-10 text-white animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="h-6 w-6 text-amber-400 animate-spin" />
            </div>
          </div>
          <p className="text-gray-600 font-medium">Loading author...</p>
          <p className="text-sm text-gray-400 mt-1">Discovering literary greatness</p>
        </div>
      </div>
    )
  }

  // Early return for error state
  if (authorError || !author) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
        <div className="max-w-4xl mx-auto px-4 pt-32 pb-16 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-2xl mb-6"
          >
            <AlertCircle className="h-10 w-10 text-red-500" />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Author Not Found</h1>
          <p className="text-gray-500 mb-6">The author you are looking for does not exist.</p>
          <Link to="/authors" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all">
            <ChevronLeft className="h-4 w-4" />
            <span>Browse All Authors</span>
          </Link>
        </div>
      </div>
    )
  }

  // Render functions with animations
  const EmptyState = ({ icon: Icon, title, message }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16 bg-white rounded-2xl border border-gray-100"
    >
      <Icon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500">{message}</p>
    </motion.div>
  )

  const renderBiography = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-3 gap-6"
      >
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Quote className="h-5 w-5 text-primary-600" />
              Biography
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{author.bio}</p>
            {author.bioUrdu && (
              <p className="urdu-text text-gray-700 leading-relaxed mt-4 pt-4 border-t border-gray-100" dir="rtl">
                {author.bioUrdu}
              </p>
            )}
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100">
              {author.birthDate && (
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full"
                >
                  <Calendar className="h-4 w-4 text-primary-500" />
                  <span>
                    Born: {new Date(author.birthDate).toLocaleDateString()} 
                    {author.deathDate && ` - Died: ${new Date(author.deathDate).toLocaleDateString()}`}
                  </span>
                </motion.span>
              )}
              {author.birthPlace && (
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full"
                >
                  <MapPin className="h-4 w-4 text-primary-500" />
                  <span>Birth Place: {author.birthPlace}</span>
                </motion.span>
              )}
            </div>
            {renderSocialLinks()}
          </div>
        </div>
        
        <div>
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
          >
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-500" />
              Literary Genres
            </h3>
            <div className="flex flex-wrap gap-2">
              {author.genres?.map((genre, index) => (
                <motion.span 
                  key={index} 
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1.5 bg-gradient-to-r from-primary-50 to-amber-50 rounded-full text-sm text-gray-700 capitalize cursor-default"
                >
                  {genre}
                </motion.span>
              ))}
              {(!author.genres || author.genres.length === 0) && (
                <p className="text-gray-500 text-sm">No genres listed</p>
              )}
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-4 hover:shadow-lg transition-all duration-300"
          >
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Author Stats
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Total Poems', value: poemsCount },
                { label: 'Total Books', value: booksCount },
                { label: 'Total Followers', value: (author.stats?.followers || 0).toLocaleString() },
                { label: 'Total Views', value: (author.stats?.views || 0).toLocaleString() }
              ].map((stat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex justify-between items-center"
                >
                  <span className="text-gray-600">{stat.label}</span>
                  <span className="font-bold text-gray-900 text-lg">{stat.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  const renderWorks = () => {
    if (poemsLoading) return <LoadingSkeleton />

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
            Poems ({poemsCount})
          </h3>
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-all ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Grid className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('list')}
              className={`p-2 transition-all ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <List className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
        
        <motion.div 
          layout
          className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
        >
          <AnimatePresence mode="wait">
            {poems.map((poem, index) => (
              <motion.div
                key={poem._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: Math.min(index * 0.05, 0.3) }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="cursor-pointer"
              >
                <Link
                  to={`/poem/${poem.slug}`}
                  className="block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group"
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
                      <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className="text-xs text-gray-500 capitalize px-2 py-0.5 bg-gray-100 rounded-full"
                      >
                        {poem.genre}
                      </motion.span>
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
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {poemsPagination.totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPoemsPage(p => Math.max(1, p - 1))}
              disabled={poemsPage === 1}
              className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 transition-all"
            >
              Previous
            </motion.button>
            <span className="px-3 py-1 text-sm text-gray-600">
              {poemsPage} / {poemsPagination.totalPages}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPoemsPage(p => Math.min(poemsPagination.totalPages, p + 1))}
              disabled={poemsPage === poemsPagination.totalPages}
              className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 transition-all"
            >
              Next
            </motion.button>
          </div>
        )}
      </>
    )
  }

  const renderBooks = () => {
    if (booksLoading) return <LoadingSkeleton />

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
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <AnimatePresence mode="wait">
          {books.map((book, index) => (
            <motion.div
              key={book._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: Math.min(index * 0.05, 0.3) }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Link
                to={`/book/${book.slug}`}
                className="block bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                {book.coverImage && (
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={book.coverImage} 
                      alt={book.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {book.isPremium && (
                      <div className="absolute top-2 right-2">
                        <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-medium rounded-full">
                          <Crown className="h-3 w-3" />
                          Premium
                        </span>
                      </div>
                    )}
                  </div>
                )}
                <div className="p-4">
                  <h4 className="font-medium text-gray-900 line-clamp-1 group-hover:text-primary-600 transition-colors">{book.title}</h4>
                  <p className="text-sm text-gray-500 line-clamp-2 mt-1">{book.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                    <span className="capitalize">{book.type || 'Ebook'}</span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {book.stats?.views?.toLocaleString() || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      {book.stats?.downloads?.toLocaleString() || 0}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    )
  }

  const renderAudio = () => {
    if (audioLoading) return <LoadingSkeleton />

    if (audioItems.length === 0) {
      return (
        <EmptyState 
          icon={Headphones}
          title="No Audio Content"
          message="Audio recordings will appear here once added."
        />
      )
    }

    const isCurrentlyPlaying = (audio) => {
      return audioPlayer?.currentAudio?._id === audio._id && audioPlayer?.isPlaying
    }

    return (
      <div className="space-y-3">
        <AnimatePresence mode="wait">
          {audioItems.map((audio, index) => (
            <motion.div
              key={audio._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: Math.min(index * 0.05, 0.3) }}
              whileHover={{ scale: 1.01 }}
            >
              <div
                onClick={() => playAudioGlobal(audio, audioItems)}
                className={`block rounded-xl p-4 shadow-sm border transition-all duration-300 flex items-center gap-4 group cursor-pointer ${
                  isCurrentlyPlaying(audio) 
                    ? 'bg-primary-50 border-primary-200 shadow-md' 
                    : 'bg-white border-gray-100 hover:shadow-lg'
                }`}
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    isCurrentlyPlaying(audio)
                      ? 'bg-primary-600'
                      : 'bg-gradient-to-br from-primary-100 to-amber-100'
                  }`}
                >
                  {isCurrentlyPlaying(audio) ? (
                    <div className="flex gap-0.5">
                      <div className="w-1 h-4 bg-white animate-pulse" />
                      <div className="w-1 h-4 bg-white animate-pulse delay-75" />
                      <div className="w-1 h-4 bg-white animate-pulse delay-150" />
                    </div>
                  ) : (
                    <Play className="h-6 w-6 text-primary-600" />
                  )}
                </motion.div>
                <div className="flex-1">
                  <h4 className={`font-medium line-clamp-1 ${
                    isCurrentlyPlaying(audio) ? 'text-primary-700' : 'text-gray-900'
                  }`}>
                    {audio.title}
                  </h4>
                  <p className="text-sm text-gray-500 capitalize">{audio.type}</p>
                </div>
                <div className="text-sm text-gray-400">
                  {formatDuration(audio.duration)}
                </div>
                <Link
                  to={`/audio/${audio.slug}`}
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-primary-600 transition-colors"
                  title="View Details"
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    )
  }

  const renderVideos = () => {
    if (videosLoading) return <LoadingSkeleton />

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
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <AnimatePresence mode="wait">
          {videos.map((video, index) => (
            <motion.div
              key={video._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: Math.min(index * 0.05, 0.3) }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div
                onClick={() => openVideoPlayer(video)}
                className="block bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="relative h-40 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
                  {video.thumbnail ? (
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="h-12 w-12 text-white/50" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Play className="h-5 w-5 text-primary-600 ml-0.5" />
                    </motion.div>
                  </div>
                  {video.duration && (
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 rounded-md text-white text-xs">
                      {formatDuration(video.duration)}
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2">
                    <span className="px-2 py-0.5 bg-black/70 text-white text-xs rounded-full flex items-center gap-1">
                      {isYouTubeUrl(video.videoUrl) ? 
                        <Youtube className="h-3 w-3" /> : 
                        <FileVideo className="h-3 w-3" />
                      }
                      <span>{isYouTubeUrl(video.videoUrl) ? 'YouTube' : 'Video'}</span>
                    </span>
                  </div>
                  {video.isPremium && (
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-yellow-500 text-white text-xs rounded">
                      Premium
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-gray-900 line-clamp-1 group-hover:text-primary-600 transition-colors">{video.title}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="capitalize">{video.type}</span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {video.stats?.views?.toLocaleString() || 0}
                      </span>
                    </div>
                    <Link
                      to={`/video/${video.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-primary-600 hover:text-primary-700 text-xs font-medium flex items-center gap-1"
                    >
                      Details <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    )
  }

  const renderTimeline = () => {
    if (timelineLoading) return <LoadingSkeleton />

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
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <div className="space-y-6">
          {timeline.map((event, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 10 }}
              className="relative flex items-start"
            >
              <div className="flex-shrink-0 w-24">
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-full text-sm inline-block"
                >
                  {event.year}
                </motion.span>
              </div>
              <div className="flex-shrink-0 w-0.5 bg-gradient-to-b from-primary-500 to-amber-500 h-full absolute left-28 top-0 bottom-0" />
              <div className="flex-1 ml-8 pb-6">
                <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all duration-300">
                  <p className="text-gray-800 font-medium">{event.event}</p>
                  {event.description && (
                    <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  const renderGallery = () => {
    if (galleryLoading) return <LoadingSkeleton />

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
      <motion.div 
        layout
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <AnimatePresence mode="wait">
          {gallery.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: Math.min(index * 0.05, 0.3) }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl shadow-sm">
                <img 
                  src={item.url} 
                  alt={item.caption || `Image ${index + 1}`}
                  loading="lazy"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.caption && (
                    <p className="text-white text-xs line-clamp-2">{item.caption}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    )
  }

  const renderQuotes = () => {
    if (quotesLoading) return <LoadingSkeleton />

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
        <AnimatePresence mode="wait">
          {quotes.map((quote, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: Math.min(index * 0.05, 0.3) }}
              whileHover={{ scale: 1.02, x: 10 }}
              className="bg-gradient-to-r from-primary-50 to-amber-50 rounded-xl p-6 border-l-4 border-primary-500 cursor-pointer"
            >
              <Quote className="h-8 w-8 text-primary-400 mb-3 opacity-50" />
              <p className="text-lg text-gray-700 italic">"{quote.text}"</p>
              {quote.source && (
                <p className="text-sm text-gray-500 mt-3">— {quote.source}</p>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    )
  }

  const renderSocialLinks = () => {
    const hasSocialLinks = Object.values(socialLinks).some(v => v)
    
    if (!hasSocialLinks) return null

    const socialIcons = {
      website: { icon: Globe, color: 'text-gray-600 hover:text-gray-900' },
      twitter: { icon: Twitter, color: 'text-gray-600 hover:text-[#1DA1F2]' },
      facebook: { icon: Facebook, color: 'text-gray-600 hover:text-[#1877F2]' },
      instagram: { icon: Instagram, color: 'text-gray-600 hover:text-[#E4405F]' },
      youtube: { icon: Youtube, color: 'text-gray-600 hover:text-[#FF0000]' },
      wikipedia: { icon: ExternalLink, color: 'text-gray-600 hover:text-gray-900' }
    }

    return (
      <div className="mt-6 pt-6 border-t border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Share2 className="h-4 w-4 text-primary-600" />
          Connect & Follow
        </h3>
        <div className="flex flex-wrap gap-3">
          {Object.entries(socialLinks).map(([platform, url]) => {
            if (!url) return null
            const social = socialIcons[platform]
            if (!social) return null
            const Icon = social.icon
            return (
              <motion.a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all ${social.color}`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm capitalize">{platform}</span>
              </motion.a>
            )
          })}
        </div>
      </div>
    )
  }

  // Main return with all content
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      {/* Sticky Header for Mobile */}
      {isScrolled && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-40 md:hidden"
        >
          <div className="px-4 py-2 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 truncate">{author?.name}</h2>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-primary-50"
            >
              <Menu className="h-5 w-5 text-primary-600" />
            </button>
          </div>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-100 p-2"
            >
              <div className="flex flex-wrap gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab.mobileLabel}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        
        {/* Video Player Modal */}
        <AnimatePresence>
          {videoModal.isOpen && videoModal.video && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
              onClick={closeVideoPlayer}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-6xl bg-black rounded-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeVideoPlayer}
                  className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors text-white"
                >
                  <X className="h-6 w-6" />
                </button>
                <div className="absolute top-4 left-4 z-10 text-white pointer-events-none">
                  <h3 className="text-lg font-semibold">{videoModal.video.title}</h3>
                  <p className="text-sm text-gray-300">{author?.name}</p>
                </div>
                <div className="w-full bg-black" style={{ minHeight: '400px' }}>
                  {isYouTubeUrl(videoModal.video.videoUrl) ? (
                    <iframe
                      src={getYouTubeEmbedUrl(videoModal.video.videoUrl)}
                      title={videoModal.video.title}
                      className="w-full aspect-video"
                      style={{ height: '70vh', border: 'none' }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={videoModal.video.videoUrl}
                      poster={videoModal.video.thumbnail}
                      className="w-full"
                      style={{ height: '70vh' }}
                      controls
                      controlsList="nodownload"
                      autoPlay
                    />
                  )}
                </div>
                <div className="p-4 bg-gray-900">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">
                      {isYouTubeUrl(videoModal.video.videoUrl) ? 'YouTube' : 'Direct Video'}
                    </span>
                    <Link
                      to={`/video/${videoModal.video.slug}`}
                      onClick={closeVideoPlayer}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>View Full Page</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link 
            to="/authors" 
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors group"
          >
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Authors</span>
          </Link>
        </motion.div>

        {/* Cover Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-16"
        >
          <div className="relative w-full rounded-2xl overflow-hidden shadow-xl">
            <div className="relative" style={{ paddingBottom: '33.33%' }}>
              {author.coverImage ? (
                <>
                  <img 
                    src={author.coverImage} 
                    alt={`${author.name} cover`}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-r from-primary-800 via-primary-700 to-amber-800">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full filter blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200 rounded-full filter blur-3xl animate-pulse delay-1000" />
                  </div>
                </div>
              )}
              
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10">
                <div className="space-y-2">
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
                    {author.name}
                  </h1>
                  {author.nameUrdu && (
                    <p className="urdu-text text-xl md:text-2xl text-white/90 drop-shadow-lg" dir="rtl">
                      {author.nameUrdu}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {author.era && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-xs md:text-sm font-medium">
                        <Award className="h-3.5 w-3.5" />
                        {author.era} Era
                      </span>
                    )}
                    {author.isVerified && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/80 backdrop-blur-md rounded-full text-white text-xs md:text-sm font-medium">
                        <Check className="h-3.5 w-3.5" />
                        Verified Author
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-12 left-6 md:left-8 z-20">
            <div className="relative">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white"
              >
                <img
                  src={author.avatar || `https://ui-avatars.com/api/?name=${author.name}&background=8B4513&color=fff&size=128&bold=true`}
                  alt={author.name}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </motion.div>
              {author.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 border-2 border-white">
                  <Check className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <div className="h-12 md:h-16"></div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFollowToggle}
            disabled={followMutation.isPending || unfollowMutation.isPending}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 ${
              isFollowing
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-gradient-to-r from-primary-600 to-amber-500 text-white hover:shadow-lg'
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
          </motion.button>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">{(author.stats?.followers || 0).toLocaleString()}</p>
                <p className="text-xs text-gray-500">Followers</p>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">{(author.stats?.views || 0).toLocaleString()}</p>
                <p className="text-xs text-gray-500">Views</p>
              </div>
            </div>
            
            <div className="relative">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all hover:shadow-md"
              >
                <Share2 className="h-5 w-5 text-gray-600" />
              </motion.button>
              
              <AnimatePresence>
                {showShareMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden"
                  >
                    <div className="p-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-700">Share this author</p>
                    </div>
                    <div className="p-2">
                      {shareLinks.map((link) => (
                        <a
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setShowShareMenu(false)}
                          className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg ${link.color} text-white mb-1 transition-all hover:shadow-md`}
                        >
                          <link.icon className="h-4 w-4" />
                          <span className="text-sm font-medium">{link.name}</span>
                        </a>
                      ))}
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-3 w-full px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all mt-1"
                      >
                        {copiedLink ? (
                          <>
                            <Check className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-600">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">Copy Link</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Tabs - All in One Line with Responsive Design */}
        <div className="relative mb-6">
          {/* Desktop Tabs */}
          <div className="hidden md:block overflow-x-auto scrollbar-hide">
            <div className="flex gap-1 border-b border-gray-200 min-w-max">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <motion.button
                    key={tab.id}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 rounded-t-lg ${
                      activeTab === tab.id
                        ? 'text-primary-600 bg-white shadow-sm'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50/50'
                    }`}
                  >
                    <Icon className={`h-4 w-4 transition-transform duration-200 ${activeTab === tab.id ? 'scale-110' : ''}`} />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.mobileLabel}</span>
                    {tab.count !== undefined && (
                      <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full transition-all ${
                        activeTab === tab.id 
                          ? 'bg-primary-100 text-primary-700 ring-1 ring-primary-200/50' 
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-amber-500 rounded-full"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Mobile Tabs - Scrollable */}
          <div className="md:hidden overflow-x-auto scrollbar-hide">
            <div className="flex gap-1 border-b border-gray-200 min-w-max">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <motion.button
                    key={tab.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? 'text-primary-600 border-b-2 border-primary-600'
                        : 'text-gray-500'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{tab.mobileLabel}</span>
                    {tab.count !== undefined && (
                      <span className={`text-xs px-1 ${
                        activeTab === tab.id ? 'text-primary-600' : 'text-gray-400'
                      }`}>
                        ({tab.count})
                      </span>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Tab Content with Lazy Loading */}
        <Suspense fallback={<LoadingSkeleton />}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              {activeTab === 'biography' && renderBiography()}
              {activeTab === 'poems' && renderWorks()}
              {activeTab === 'books' && renderBooks()}
              {activeTab === 'audio' && renderAudio()}
              {activeTab === 'videos' && renderVideos()}
              {activeTab === 'timeline' && renderTimeline()}
              {activeTab === 'gallery' && renderGallery()}
              {activeTab === 'quotes' && renderQuotes()}
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </div>
    </div>
  )
}

export default AuthorDetailPage