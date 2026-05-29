// //client/src/pages/public/VideoDetailPage.jsx
// import React, { useState } from 'react'
// import { useParams, Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion } from 'framer-motion'
// import {
//   Heart, Share2, Bookmark, MessageCircle, ChevronLeft,
//   Clock, Eye, ThumbsUp, Play, Volume2, Subtitles
// } from 'lucide-react'

// const VideoDetailPage = () => {
//   const { id } = useParams()
//   const { t } = useTranslation()
//   const [isLiked, setIsLiked] = useState(false)
//   const [isBookmarked, setIsBookmarked] = useState(false)
//   const [showSubtitles, setShowSubtitles] = useState(false)

//   const video = {
//     id: 1,
//     title: 'Jashn-e-Rekhta 2024 Highlights',
//     category: 'Mushaira',
//     duration: '45:20',
//     views: 125000,
//     likes: 8500,
//     comments: 234,
//     bookmarks: 1200,
//     thumbnail: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=1200',
//     description: 'Experience the magic of Jashn-e-Rekhta 2024 with highlights from the biggest mushaira event of the year. Featuring renowned poets and their mesmerizing performances.',
//     author: 'Jashn-e-Rekhta',
//     publishedDate: '2024-01-15',
//     hasSubtitles: true,
//     relatedVideos: [
//       { id: 2, title: 'Mushaira Night - Delhi 2024', duration: '1:20:00', views: 210000, thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400' },
//       { id: 3, title: 'Urdu Shayari Workshop', duration: '55:00', views: 45000, thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400' },
//     ],
//     relatedAuthors: [
//       { id: 1, name: 'Mirza Ghalib', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
//       { id: 2, name: 'Faiz Ahmed Faiz', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200' },
//     ],
//   }

//   return (
//     <div className="page-container max-w-5xl">
//       {/* Breadcrumb */}
//       <div className="mb-4">
//         <Link to="/videos" className="flex items-center space-x-1 text-sm text-gray-500 hover:text-primary-600">
//           <ChevronLeft className="h-4 w-4" />
//           <span>Back to Videos</span>
//         </Link>
//       </div>

//       {/* Video Player */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden mb-6"
//       >
//         <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-60" />
//         <div className="absolute inset-0 flex items-center justify-center">
//           <button className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
//             <Play className="h-10 w-10 text-primary-600 ml-1" />
//           </button>
//         </div>
//         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
//           <div className="flex items-center justify-between text-white">
//             <div className="flex items-center space-x-4">
//               <span className="flex items-center space-x-1">
//                 <Clock className="h-4 w-4" />
//                 <span className="text-sm">{video.duration}</span>
//               </span>
//               {video.hasSubtitles && (
//                 <button
//                   onClick={() => setShowSubtitles(!showSubtitles)}
//                   className={`flex items-center space-x-1 px-2 py-1 rounded text-sm ${
//                     showSubtitles ? 'bg-primary-600' : 'bg-white/20'
//                   }`}
//                 >
//                   <Subtitles className="h-4 w-4" />
//                   <span>CC</span>
//                 </button>
//               )}
//             </div>
//             <div className="flex items-center space-x-2">
//               <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
//                 <Volume2 className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* Video Info */}
//       <div className="mb-8">
//         <div className="flex items-start justify-between mb-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">{video.title}</h1>
//             <div className="flex items-center space-x-4 text-sm text-gray-500">
//               <span className="px-2 py-0.5 bg-primary-50 text-primary-700 rounded-full text-xs font-medium">
//                 {video.category}
//               </span>
//               <span className="flex items-center space-x-1">
//                 <Eye className="h-4 w-4" />
//                 <span>{(video.views / 1000).toFixed(1)}K views</span>
//               </span>
//               <span>{video.publishedDate}</span>
//             </div>
//           </div>
//         </div>

//         <p className="text-gray-700 mb-4">{video.description}</p>

//         <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={() => setIsLiked(!isLiked)}
//               className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
//                 isLiked ? 'bg-red-50 text-red-600' : 'hover:bg-gray-100 text-gray-600'
//               }`}
//             >
//               <ThumbsUp className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
//               <span className="text-sm font-medium">{video.likes.toLocaleString()}</span>
//             </button>
//             <button
//               onClick={() => setIsBookmarked(!isBookmarked)}
//               className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
//                 isBookmarked ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-100 text-gray-600'
//               }`}
//             >
//               <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-primary-500' : ''}`} />
//               <span className="text-sm font-medium">{video.bookmarks.toLocaleString()}</span>
//             </button>
//             <button className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
//               <MessageCircle className="h-5 w-5" />
//               <span className="text-sm font-medium">{video.comments}</span>
//             </button>
//           </div>
//           <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
//             <Share2 className="h-5 w-5" />
//           </button>
//         </div>
//       </div>

//       {/* Related Content */}
//       <div className="grid md:grid-cols-2 gap-8">
//         <div>
//           <h3 className="font-semibold text-gray-900 mb-4">Related Videos</h3>
//           <div className="space-y-4">
//             {video.relatedVideos.map((related) => (
//               <Link
//                 key={related.id}
//                 to={`/videos/${related.id}`}
//                 className="flex space-x-4 group"
//               >
//                 <div className="relative w-40 flex-shrink-0">
//                   <img
//                     src={related.thumbnail}
//                     alt=""
//                     className="w-full aspect-video object-cover rounded-lg"
//                   />
//                   <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded">
//                     {related.duration}
//                   </div>
//                 </div>
//                 <div>
//                   <h4 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
//                     {related.title}
//                   </h4>
//                   <p className="text-sm text-gray-500 mt-1">{(related.views / 1000).toFixed(1)}K views</p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>

//         <div>
//           <h3 className="font-semibold text-gray-900 mb-4">Related Authors</h3>
//           <div className="space-y-3">
//             {video.relatedAuthors.map((author) => (
//               <Link
//                 key={author.id}
//                 to={`/authors/${author.id}`}
//                 className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 <img src={author.image} alt="" className="w-12 h-12 rounded-full object-cover" />
//                 <span className="font-medium text-gray-900">{author.name}</span>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default VideoDetailPage








// // client/src/pages/public/VideoDetailPage.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { useSelector } from 'react-redux';
// import toast from 'react-hot-toast';
// import {
//   Heart, Share2, Bookmark, MessageCircle, ChevronLeft,
//   Clock, Eye, ThumbsUp, Play, Volume2, Subtitles, Loader2,
//   AlertCircle, User, Calendar, Download, Maximize2, Minimize2,
//   X, ChevronRight, Film, Tag
// } from 'lucide-react';
// import videoAPI from '../../api/videoAPI';
// import authorAPI from '../../api/authorAPI';

// const VideoDetailPage = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const { t } = useTranslation();
//   const queryClient = useQueryClient();
//   const { user } = useSelector(state => state.auth);
  
//   const [isLiked, setIsLiked] = useState(false);
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [showSubtitles, setShowSubtitles] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [selectedSubtitle, setSelectedSubtitle] = useState(null);
//   const videoRef = React.useRef(null);
//   const containerRef = React.useRef(null);

//   // Fetch video data using slug
//   const { data: videoData, isLoading, error, refetch } = useQuery({
//     queryKey: ['video', slug],
//     queryFn: () => videoAPI.getVideo(slug),
//     enabled: !!slug,
//     retry: 1
//   });

//   const video = videoData?.data || videoData;

//   // Fetch related videos
//   const { data: relatedData } = useQuery({
//     queryKey: ['related-videos', video?._id],
//     queryFn: () => videoAPI.getVideos({ 
//       type: video?.type,
//       limit: 6,
//       exclude: video?._id 
//     }),
//     enabled: !!video?._id
//   });

//   const relatedVideos = relatedData?.data?.data || relatedData?.data || relatedData || [];

//   // Fetch subtitles
//   const { data: subtitlesData } = useQuery({
//     queryKey: ['video-subtitles', video?._id],
//     queryFn: () => videoAPI.getVideoSubtitles(slug),
//     enabled: !!slug && !!video?.subtitles?.length
//   });

//   const subtitles = subtitlesData?.data || subtitlesData || video?.subtitles || [];

//   // Like mutation
//   const likeMutation = useMutation({
//     mutationFn: () => videoAPI.likeVideo(video?._id),
//     onSuccess: () => {
//       setIsLiked(!isLiked);
//       queryClient.invalidateQueries(['video', slug]);
//       toast.success(isLiked ? 'Removed from likes' : 'Added to likes');
//     },
//     onError: () => toast.error('Failed to update like status')
//   });

//   // Bookmark mutation
//   const bookmarkMutation = useMutation({
//     mutationFn: () => videoAPI.bookmarkVideo(video?._id),
//     onSuccess: () => {
//       setIsBookmarked(!isBookmarked);
//       queryClient.invalidateQueries(['video', slug]);
//       toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
//     },
//     onError: () => toast.error('Failed to update bookmark status')
//   });

//   // Helper functions
//   const formatDuration = (seconds) => {
//     if (!seconds) return 'N/A';
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     if (hrs > 0) {
//       return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//     }
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   const formatViews = (views) => {
//     if (!views) return '0';
//     if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
//     if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
//     return views.toString();
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'Unknown';
//     try {
//       return new Date(dateString).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//       });
//     } catch {
//       return 'Unknown';
//     }
//   };

//   const getAuthorName = () => {
//     if (!video?.author) return 'Unknown Author';
//     if (typeof video.author === 'object') return video.author.name || 'Unknown Author';
//     return video.author || 'Unknown Author';
//   };

//   const getAuthorSlug = () => {
//     if (!video?.author) return '#';
//     if (typeof video.author === 'object') return video.author.slug || '#';
//     return '#';
//   };

//   const getCategoryName = () => {
//     if (!video?.category) return 'Uncategorized';
//     if (typeof video.category === 'object') return video.category.name || 'Uncategorized';
//     return video.category || 'Uncategorized';
//   };

//   // Handle like
//   const handleLike = () => {
//     if (!user) {
//       toast.error('Please login to like videos');
//       navigate('/login');
//       return;
//     }
//     likeMutation.mutate();
//   };

//   // Handle bookmark
//   const handleBookmark = () => {
//     if (!user) {
//       toast.error('Please login to bookmark videos');
//       navigate('/login');
//       return;
//     }
//     bookmarkMutation.mutate();
//   };

//   // Handle share
//   const handleShare = async () => {
//     const url = window.location.href;
//     try {
//       await navigator.clipboard.writeText(url);
//       toast.success('Link copied to clipboard!');
//     } catch (err) {
//       toast.error('Failed to copy link');
//     }
//   };

//   // Toggle fullscreen
//   const toggleFullscreen = () => {
//     const playerElement = containerRef.current;
//     if (!isFullscreen) {
//       if (playerElement?.requestFullscreen) {
//         playerElement.requestFullscreen();
//       }
//     } else {
//       if (document.exitFullscreen) {
//         document.exitFullscreen();
//       }
//     }
//     setIsFullscreen(!isFullscreen);
//   };

//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       setIsFullscreen(!!document.fullscreenElement);
//     };
//     document.addEventListener('fullscreenchange', handleFullscreenChange);
//     return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
//   }, []);

//   // Check if video is YouTube URL
//   const isYouTubeUrl = (url) => {
//     if (!url) return false;
//     return url.includes('youtube.com') || url.includes('youtu.be');
//   };

//   // Get YouTube embed URL
//   const getYouTubeEmbedUrl = (url) => {
//     const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)?.[1];
//     return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
//   };

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
//           <p className="text-gray-500">Loading video...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error || !video) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Video Not Found</h1>
//           <p className="text-gray-500 mb-6">The video you are looking for does not exist or has been removed.</p>
//           <Link to="/videos" className="btn-primary inline-flex items-center space-x-2">
//             <ChevronLeft className="h-4 w-4" />
//             <span>Browse All Videos</span>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // Check if user has interacted
//   const userLiked = video?.userInteraction?.isLiked || false;
//   const userBookmarked = video?.userInteraction?.isBookmarked || false;

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Breadcrumb */}
//         <div className="mb-4">
//           <Link to="/videos" className="inline-flex items-center space-x-1 text-sm text-gray-500 hover:text-primary-600 transition-colors">
//             <ChevronLeft className="h-4 w-4" />
//             <span>Back to Videos</span>
//           </Link>
//         </div>

//         {/* Video Player */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           ref={containerRef}
//           className="relative bg-gray-900 rounded-xl overflow-hidden mb-6"
//         >
//           {isYouTubeUrl(video.videoUrl) ? (
//             <iframe
//               src={getYouTubeEmbedUrl(video.videoUrl)}
//               title={video.title}
//               className="w-full aspect-video"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             />
//           ) : (
//             <video
//               ref={videoRef}
//               src={video.videoUrl}
//               poster={video.thumbnail}
//               className="w-full aspect-video"
//               controls
//               controlsList="nodownload"
//             >
//               {subtitles.map((sub, idx) => (
//                 <track
//                   key={idx}
//                   kind="subtitles"
//                   srcLang={sub.language}
//                   label={sub.language}
//                   src={sub.url}
//                 />
//               ))}
//             </video>
//           )}

//           {/* Premium Overlay */}
//           {video.isPremium && (!user || user?.subscription?.plan === 'free') && (
//             <div className="absolute inset-0 bg-black/70 flex items-center justify-center flex-col">
//               <Lock className="h-16 w-16 text-white mb-4" />
//               <h3 className="text-white text-xl font-bold mb-2">Premium Content</h3>
//               <p className="text-gray-300 mb-4">Subscribe to premium to watch this video</p>
//               <Link to="/subscription" className="btn-primary">
//                 Upgrade to Premium
//               </Link>
//             </div>
//           )}
//         </motion.div>

//         {/* Video Info */}
//         <div className="mb-8">
//           <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{video.title}</h1>
//               <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
//                 <span className="inline-flex px-2 py-0.5 bg-primary-50 text-primary-700 rounded-full text-xs font-medium capitalize">
//                   {getCategoryName()}
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <Eye className="h-4 w-4" />
//                   {formatViews(video.stats?.views)} views
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <Calendar className="h-4 w-4" />
//                   {formatDate(video.createdAt)}
//                 </span>
//                 {video.duration && (
//                   <span className="flex items-center gap-1">
//                     <Clock className="h-4 w-4" />
//                     {formatDuration(video.duration)}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Description */}
//           <p className="text-gray-700 leading-relaxed mb-4">
//             {video.description || 'No description available.'}
//           </p>

//           {/* Author Info */}
//           {video.author && (
//             <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-100 mb-4">
//               <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
//                 {typeof video.author === 'object' && video.author.avatar ? (
//                   <img src={video.author.avatar} alt={getAuthorName()} className="w-full h-full object-cover" />
//                 ) : (
//                   <User className="h-6 w-6 text-gray-400" />
//                 )}
//               </div>
//               <div>
//                 <Link to={`/author/${getAuthorSlug()}`} className="font-medium text-gray-900 hover:text-primary-600">
//                   {getAuthorName()}
//                 </Link>
//                 <p className="text-sm text-gray-500">Author / Poet</p>
//               </div>
//             </div>
//           )}

//           {/* Action Buttons */}
//           <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-lg border border-gray-100">
//             <div className="flex flex-wrap items-center gap-2">
//               <button
//                 onClick={handleLike}
//                 disabled={likeMutation.isPending}
//                 className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors ${
//                   userLiked ? 'bg-red-50 text-red-600' : 'hover:bg-gray-100 text-gray-600'
//                 }`}
//               >
//                 <Heart className={`h-5 w-5 ${userLiked ? 'fill-red-500' : ''}`} />
//                 <span className="text-sm font-medium">{formatViews(video.stats?.likes)}</span>
//               </button>
              
//               <button
//                 onClick={handleBookmark}
//                 disabled={bookmarkMutation.isPending}
//                 className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors ${
//                   userBookmarked ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-100 text-gray-600'
//                 }`}
//               >
//                 <Bookmark className={`h-5 w-5 ${userBookmarked ? 'fill-primary-500' : ''}`} />
//                 <span className="text-sm font-medium">{formatViews(video.stats?.bookmarks)}</span>
//               </button>
              
//               <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
//                 <MessageCircle className="h-5 w-5" />
//                 <span className="text-sm font-medium">{formatViews(video.stats?.comments)}</span>
//               </button>
//             </div>
            
//             <div className="flex items-center gap-2">
//               {subtitles.length > 0 && (
//                 <button
//                   onClick={() => setShowSubtitles(!showSubtitles)}
//                   className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
//                   title="Subtitles"
//                 >
//                   <Subtitles className="h-5 w-5" />
//                 </button>
//               )}
//               <button
//                 onClick={handleShare}
//                 className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
//                 title="Share"
//               >
//                 <Share2 className="h-5 w-5" />
//               </button>
//             </div>
//           </div>

//           {/* Subtitles List */}
//           <AnimatePresence>
//             {showSubtitles && subtitles.length > 0 && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="mt-4 p-4 bg-white rounded-lg border border-gray-100"
//               >
//                 <h4 className="font-semibold text-gray-900 mb-3">Available Subtitles</h4>
//                 <div className="flex flex-wrap gap-2">
//                   {subtitles.map((sub, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => setSelectedSubtitle(sub)}
//                       className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
//                         selectedSubtitle?.language === sub.language
//                           ? 'bg-primary-600 text-white'
//                           : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                       }`}
//                     >
//                       {sub.language.toUpperCase()}
//                     </button>
//                   ))}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Tags */}
//         {video.tags && video.tags.length > 0 && (
//           <div className="mb-8">
//             <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
//               <Tag className="h-5 w-5 text-primary-600" />
//               Tags
//             </h3>
//             <div className="flex flex-wrap gap-2">
//               {video.tags.map((tag, idx) => (
//                 <Link
//                   key={idx}
//                   to={`/videos?tag=${tag}`}
//                   className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors"
//                 >
//                   #{tag}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Related Videos */}
//         {relatedVideos.length > 0 && (
//           <div className="mt-8">
//             <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//               <Film className="h-5 w-5 text-primary-600" />
//               Related Videos
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {relatedVideos.slice(0, 6).map((related) => (
//                 <Link
//                   key={related._id}
//                   to={`/video/${related.slug}`}
//                   className="group"
//                 >
//                   <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all">
//                     <div className="relative aspect-video">
//                       {related.thumbnail ? (
//                         <img
//                           src={related.thumbnail}
//                           alt={related.title}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                         />
//                       ) : (
//                         <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                           <Play className="h-8 w-8 text-gray-400" />
//                         </div>
//                       )}
//                       {related.duration && (
//                         <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded">
//                           {formatDuration(related.duration)}
//                         </div>
//                       )}
//                       {related.isPremium && (
//                         <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-yellow-500 text-white text-xs rounded">
//                           Premium
//                         </div>
//                       )}
//                     </div>
//                     <div className="p-3">
//                       <h4 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 text-sm">
//                         {related.title}
//                       </h4>
//                       <p className="text-xs text-gray-500 mt-1">
//                         {formatViews(related.stats?.views)} views
//                       </p>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VideoDetailPage;














// client/src/pages/public/VideoDetailPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
  Heart, Share2, Bookmark, MessageCircle, ChevronLeft,
  Clock, Eye, Play, Volume2, Subtitles, Loader2,
  AlertCircle, User, Calendar, Download, Maximize2, Minimize2,
  X, ChevronRight, Film, Tag, ThumbsUp, Star, Lock
} from 'lucide-react';
import videoAPI from '../../api/videoAPI';
import authorAPI from '../../api/authorAPI';

const VideoDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { user } = useSelector(state => state.auth);
  
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedSubtitle, setSelectedSubtitle] = useState(null);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Fetch video data using slug
  const { data: videoData, isLoading, error } = useQuery({
    queryKey: ['video', slug],
    queryFn: () => videoAPI.getVideo(slug),
    enabled: !!slug,
    retry: 1
  });

  const video = videoData?.data || videoData;

  // Fetch related videos
  const { data: relatedData } = useQuery({
    queryKey: ['related-videos', video?._id],
    queryFn: () => videoAPI.getVideos({ 
      type: video?.type,
      limit: 6,
      exclude: video?._id 
    }),
    enabled: !!video?._id
  });

  const relatedVideos = relatedData?.data?.data || relatedData?.data || relatedData || [];

  // Fetch subtitles
  const { data: subtitlesData } = useQuery({
    queryKey: ['video-subtitles', video?._id],
    queryFn: () => videoAPI.getVideoSubtitles(slug),
    enabled: !!slug && !!(video?.subtitles?.length)
  });

  const subtitles = subtitlesData?.data || subtitlesData || video?.subtitles || [];

  // Like mutation
  const likeMutation = useMutation({
    mutationFn: () => videoAPI.likeVideo(video?._id),
    onSuccess: () => {
      setIsLiked(!isLiked);
      queryClient.invalidateQueries(['video', slug]);
      toast.success(isLiked ? 'Removed from likes' : 'Added to likes');
    },
    onError: () => toast.error('Failed to update like status')
  });

  // Bookmark mutation
  const bookmarkMutation = useMutation({
    mutationFn: () => videoAPI.bookmarkVideo(video?._id),
    onSuccess: () => {
      setIsBookmarked(!isBookmarked);
      queryClient.invalidateQueries(['video', slug]);
      toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
    },
    onError: () => toast.error('Failed to update bookmark status')
  });

  // Helper functions
  const formatDuration = (seconds) => {
    if (!seconds) return 'N/A';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatViews = (views) => {
    if (!views) return '0';
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Unknown';
    }
  };

  const getAuthorName = () => {
    if (!video?.author) return 'Unknown Author';
    if (typeof video.author === 'object') return video.author.name || 'Unknown Author';
    return video.author || 'Unknown Author';
  };

  const getAuthorSlug = () => {
    if (!video?.author) return '#';
    if (typeof video.author === 'object') return video.author.slug || '#';
    return '#';
  };

  const getCategoryName = () => {
    if (!video?.category) return 'Uncategorized';
    if (typeof video.category === 'object') return video.category.name || 'Uncategorized';
    return video.category || 'Uncategorized';
  };

  // Handle like
  const handleLike = () => {
    if (!user) {
      toast.error('Please login to like videos');
      navigate('/login');
      return;
    }
    likeMutation.mutate();
  };

  // Handle bookmark
  const handleBookmark = () => {
    if (!user) {
      toast.error('Please login to bookmark videos');
      navigate('/login');
      return;
    }
    bookmarkMutation.mutate();
  };

  // Handle share
  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    const playerElement = containerRef.current;
    if (!isFullscreen) {
      if (playerElement?.requestFullscreen) {
        playerElement.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Check if video is YouTube URL
  const isYouTubeUrl = (url) => {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  // Get YouTube embed URL
  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  // Check if user can access premium content
  const hasPremiumAccess = () => {
    if (!video?.isPremium) return true;
    if (!user) return false;
    return user.subscription?.plan !== 'free';
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-500">Loading video...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !video) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Video Not Found</h1>
          <p className="text-gray-500 mb-6">The video you are looking for does not exist or has been removed.</p>
          <Link to="/videos" className="btn-primary inline-flex items-center space-x-2">
            <ChevronLeft className="h-4 w-4" />
            <span>Browse All Videos</span>
          </Link>
        </div>
      </div>
    );
  }

  const hasAccess = hasPremiumAccess();

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-4">
          <Link to="/videos" className="inline-flex items-center space-x-1 text-sm text-gray-500 hover:text-primary-600 transition-colors">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Videos</span>
          </Link>
        </div>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          ref={containerRef}
          className="relative bg-gray-900 rounded-xl overflow-hidden mb-6"
        >
          {hasAccess ? (
            isYouTubeUrl(video.videoUrl) ? (
              <iframe
                src={getYouTubeEmbedUrl(video.videoUrl)}
                title={video.title}
                className="w-full aspect-video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                ref={videoRef}
                src={video.videoUrl}
                poster={video.thumbnail}
                className="w-full aspect-video"
                controls
                controlsList="nodownload"
              >
                {subtitles.map((sub, idx) => (
                  <track
                    key={idx}
                    kind="subtitles"
                    srcLang={sub.language}
                    label={sub.language}
                    src={sub.url}
                  />
                ))}
              </video>
            )
          ) : (
            <div className="w-full aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center flex-col">
              <Lock className="h-16 w-16 text-white mb-4" />
              <h3 className="text-white text-xl font-bold mb-2">Premium Content</h3>
              <p className="text-gray-300 mb-4">Subscribe to premium to watch this video</p>
              <Link to="/subscription" className="btn-primary">
                Upgrade to Premium
              </Link>
            </div>
          )}
        </motion.div>

        {/* Video Info */}
        <div className="mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{video.title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span className="inline-flex px-2 py-0.5 bg-primary-50 text-primary-700 rounded-full text-xs font-medium capitalize">
                  {getCategoryName()}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {formatViews(video.stats?.views)} views
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(video.createdAt)}
                </span>
                {video.duration && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {formatDuration(video.duration)}
                  </span>
                )}
                {video.isPremium && (
                  <span className="inline-flex px-2 py-0.5 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium">
                    Premium
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          {video.description && (
            <p className="text-gray-700 leading-relaxed mb-4">
              {video.description}
            </p>
          )}

          {/* Author Info */}
          {video.author && (
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-100 mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {typeof video.author === 'object' && video.author.avatar ? (
                  <img src={video.author.avatar} alt={getAuthorName()} className="w-full h-full object-cover" />
                ) : (
                  <User className="h-6 w-6 text-gray-400" />
                )}
              </div>
              <div>
                <Link to={`/author/${getAuthorSlug()}`} className="font-medium text-gray-900 hover:text-primary-600">
                  {getAuthorName()}
                </Link>
                <p className="text-sm text-gray-500">Author / Poet</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-lg border border-gray-100">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleLike}
                disabled={likeMutation.isPending}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors ${
                  isLiked ? 'bg-red-50 text-red-600' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
                <span className="text-sm font-medium">{formatViews(video.stats?.likes)}</span>
              </button>
              
              <button
                onClick={handleBookmark}
                disabled={bookmarkMutation.isPending}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors ${
                  isBookmarked ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-primary-500' : ''}`} />
                <span className="text-sm font-medium">{formatViews(video.stats?.bookmarks)}</span>
              </button>
              
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
                <MessageCircle className="h-5 w-5" />
                <span className="text-sm font-medium">{formatViews(video.stats?.comments)}</span>
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              {subtitles.length > 0 && (
                <button
                  onClick={() => setShowSubtitles(!showSubtitles)}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                  title="Subtitles"
                >
                  <Subtitles className="h-5 w-5" />
                </button>
              )}
              <button
                onClick={handleShare}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                title="Share"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Subtitles List */}
          <AnimatePresence>
            {showSubtitles && subtitles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-white rounded-lg border border-gray-100"
              >
                <h4 className="font-semibold text-gray-900 mb-3">Available Subtitles</h4>
                <div className="flex flex-wrap gap-2">
                  {subtitles.map((sub, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSubtitle(sub)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        selectedSubtitle?.language === sub.language
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {sub.language?.toUpperCase() || 'Unknown'}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tags */}
        {video.tags && video.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Tag className="h-5 w-5 text-primary-600" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {video.tags.map((tag, idx) => (
                <Link
                  key={idx}
                  to={`/videos?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Videos */}
        {relatedVideos.length > 0 && (
          <div className="mt-8">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Film className="h-5 w-5 text-primary-600" />
              Related Videos
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {relatedVideos.slice(0, 6).map((related) => (
                <Link
                  key={related._id}
                  to={`/video/${related.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all">
                    <div className="relative aspect-video">
                      {related.thumbnail ? (
                        <img
                          src={related.thumbnail}
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <Play className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                      {related.duration && (
                        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded">
                          {formatDuration(related.duration)}
                        </div>
                      )}
                      {related.isPremium && (
                        <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-yellow-500 text-white text-xs rounded">
                          Premium
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 text-sm">
                        {related.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatViews(related.stats?.views)} views
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoDetailPage;