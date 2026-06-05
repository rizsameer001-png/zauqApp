// // client/src/pages/public/AudioDetailPage.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { motion } from 'framer-motion';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { useSelector } from 'react-redux';
// import toast from 'react-hot-toast';
// import {
//   Headphones, Play, Pause, Heart, Share2, Bookmark, Download,
//   ChevronLeft, Clock, Eye, Calendar, User, Loader2, AlertCircle,
//   Mic, Music, FileText, Volume2, SkipBack, SkipForward,
//   Repeat, Shuffle, ListMusic, Maximize2, Minimize2, X
// } from 'lucide-react';
// import audioAPI from '../../api/audioAPI';
// import authorAPI from '../../api/authorAPI';

// const AudioDetailPage = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const { t } = useTranslation();
//   const queryClient = useQueryClient();
//   const { user } = useSelector(state => state.auth);
//   const audioRef = useRef(null);
  
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [volume, setVolume] = useState(1);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isLiked, setIsLiked] = useState(false);
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [showTranscript, setShowTranscript] = useState(false);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const playerContainerRef = useRef(null);

//   // Fetch audio data using slug
//   const { data: audioData, isLoading, error } = useQuery({
//     queryKey: ['audio', slug],
//     queryFn: () => audioAPI.getAudio(slug),
//     enabled: !!slug,
//     retry: 1
//   });

//   const audio = audioData?.data || audioData;

//   // Fetch related audio
//   const { data: relatedData } = useQuery({
//     queryKey: ['related-audio', audio?._id],
//     queryFn: () => audioAPI.getAudioItems({ limit: 4, type: audio?.type }),
//     enabled: !!audio?._id
//   });

//   const relatedAudio = relatedData?.data?.data || relatedData?.data || relatedData || [];

//   // Like mutation
//   const likeMutation = useMutation({
//     mutationFn: () => audioAPI.likeAudio(audio?._id),
//     onSuccess: () => {
//       setIsLiked(!isLiked);
//       queryClient.invalidateQueries(['audio', slug]);
//       toast.success(isLiked ? 'Removed from likes' : 'Added to likes');
//     },
//     onError: () => toast.error('Failed to update like status')
//   });

//   // Bookmark mutation
//   const bookmarkMutation = useMutation({
//     mutationFn: () => audioAPI.bookmarkAudio(audio?._id),
//     onSuccess: () => {
//       setIsBookmarked(!isBookmarked);
//       queryClient.invalidateQueries(['audio', slug]);
//       toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
//     },
//     onError: () => toast.error('Failed to update bookmark status')
//   });

//   // Audio player controls
//   const togglePlay = () => {
//     if (audioRef.current) {
//       if (isPlaying) {
//         audioRef.current.pause();
//       } else {
//         audioRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const handleTimeUpdate = () => {
//     if (audioRef.current) {
//       setCurrentTime(audioRef.current.currentTime);
//     }
//   };

//   const handleLoadedMetadata = () => {
//     if (audioRef.current) {
//       setDuration(audioRef.current.duration);
//     }
//   };

//   const handleSeek = (e) => {
//     const seekTime = parseFloat(e.target.value);
//     setCurrentTime(seekTime);
//     if (audioRef.current) {
//       audioRef.current.currentTime = seekTime;
//     }
//   };

//   const handleVolumeChange = (e) => {
//     const newVolume = parseFloat(e.target.value);
//     setVolume(newVolume);
//     if (audioRef.current) {
//       audioRef.current.volume = newVolume;
//     }
//     setIsMuted(newVolume === 0);
//   };

//   const toggleMute = () => {
//     if (audioRef.current) {
//       audioRef.current.muted = !isMuted;
//       setIsMuted(!isMuted);
//     }
//   };

//   const formatTime = (time) => {
//     if (isNaN(time)) return '0:00';
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds.toString().padStart(2, '0')}`;
//   };

//   const toggleFullscreen = () => {
//     if (!isFullscreen) {
//       if (playerContainerRef.current?.requestFullscreen) {
//         playerContainerRef.current.requestFullscreen();
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

//   // Handle keyboard shortcuts
//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (e.code === 'Space') {
//         e.preventDefault();
//         togglePlay();
//       } else if (e.code === 'ArrowLeft') {
//         if (audioRef.current) {
//           audioRef.current.currentTime = Math.max(0, currentTime - 10);
//         }
//       } else if (e.code === 'ArrowRight') {
//         if (audioRef.current) {
//           audioRef.current.currentTime = Math.min(duration, currentTime + 10);
//         }
//       }
//     };
//     window.addEventListener('keydown', handleKeyPress);
//     return () => window.removeEventListener('keydown', handleKeyPress);
//   }, [currentTime, duration]);

//   const handleLike = () => {
//     if (!user) {
//       toast.error('Please login to like audio');
//       navigate('/login');
//       return;
//     }
//     likeMutation.mutate();
//   };

//   const handleBookmark = () => {
//     if (!user) {
//       toast.error('Please login to bookmark audio');
//       navigate('/login');
//       return;
//     }
//     bookmarkMutation.mutate();
//   };

//   const handleShare = async () => {
//     const url = window.location.href;
//     try {
//       await navigator.clipboard.writeText(url);
//       toast.success('Link copied to clipboard!');
//     } catch (err) {
//       toast.error('Failed to copy link');
//     }
//   };

//   const getAuthorName = () => {
//     if (!audio?.author) return 'Unknown Artist';
//     if (typeof audio.author === 'object') return audio.author.name || 'Unknown Artist';
//     return audio.author || 'Unknown Artist';
//   };

//   const getAuthorSlug = () => {
//     if (!audio?.author) return '#';
//     if (typeof audio.author === 'object') return audio.author.slug || '#';
//     return '#';
//   };

//   const getCategoryName = () => {
//     if (!audio?.category) return 'Audio';
//     if (typeof audio.category === 'object') return audio.category.name || 'Audio';
//     return audio.category || 'Audio';
//   };

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
//           <p className="text-gray-500">Loading audio...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error || !audio) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Audio Not Found</h1>
//           <p className="text-gray-500 mb-6">The audio you are looking for does not exist or has been removed.</p>
//           <Link to="/audio" className="btn-primary inline-flex items-center space-x-2">
//             <ChevronLeft className="h-4 w-4" />
//             <span>Browse All Audio</span>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Breadcrumb */}
//         <div className="mb-6">
//           <Link to="/audio" className="inline-flex items-center space-x-1 text-sm text-gray-500 hover:text-primary-600 transition-colors">
//             <ChevronLeft className="h-4 w-4" />
//             <span>Back to Audio</span>
//           </Link>
//         </div>

//         {/* Audio Player Section */}
//         <div className="grid lg:grid-cols-3 gap-8 mb-8">
//           {/* Album Art */}
//           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
//             <div className="card overflow-hidden rounded-xl shadow-lg">
//               {audio.thumbnail || audio.coverImage ? (
//                 <img 
//                   src={audio.thumbnail || audio.coverImage} 
//                   alt={audio.title} 
//                   className="w-full aspect-square object-cover"
//                 />
//               ) : (
//                 <div className="w-full aspect-square bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
//                   <Headphones className="h-20 w-20 text-white" />
//                 </div>
//               )}
//             </div>
//           </motion.div>

//           {/* Audio Info */}
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
//             <div className="flex flex-wrap items-center gap-2 mb-3">
//               <span className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full capitalize">
//                 {audio.type?.replace('_', ' ')}
//               </span>
//               <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
//                 {audio.language === 'urdu' ? 'Urdu' : audio.language === 'hindi' ? 'Hindi' : audio.language || 'English'}
//               </span>
//               {audio.isPremium && <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">Premium</span>}
//               {audio.isFeatured && <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">Featured</span>}
//             </div>

//             <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{audio.title}</h1>
//             {audio.description && (
//               <p className="text-gray-600 mb-4">{audio.description}</p>
//             )}

//             <div className="flex items-center flex-wrap gap-4 mb-6">
//               <Link to={`/author/${getAuthorSlug()}`} className="inline-flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-medium">
//                 <User className="h-4 w-4" />
//                 <span>{getAuthorName()}</span>
//               </Link>
//               <span className="flex items-center space-x-1 text-gray-500">
//                 <Calendar className="h-4 w-4" />
//                 <span>{new Date(audio.createdAt).toLocaleDateString()}</span>
//               </span>
//             </div>

//             {/* Audio Player */}
//             <div ref={playerContainerRef} className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 shadow-xl">
//               <audio
//                 ref={audioRef}
//                 src={audio.audioUrl}
//                 onTimeUpdate={handleTimeUpdate}
//                 onLoadedMetadata={handleLoadedMetadata}
//                 onEnded={() => setIsPlaying(false)}
//               />
              
//               {/* Player Controls */}
//               <div className="space-y-4">
//                 {/* Title */}
//                 <div className="text-center">
//                   <h3 className="text-white font-medium text-lg">{audio.title}</h3>
//                   <p className="text-green-200 text-sm">{getAuthorName()}</p>
//                 </div>

//                 {/* Progress Bar */}
//                 <div className="space-y-2">
//                   <input
//                     type="range"
//                     min="0"
//                     max={duration || 0}
//                     value={currentTime}
//                     onChange={handleSeek}
//                     className="w-full h-1 bg-green-400 rounded-lg appearance-none cursor-pointer"
//                     style={{
//                       background: `linear-gradient(to right, #fff 0%, #fff ${(currentTime / duration) * 100}%, #4ade80 ${(currentTime / duration) * 100}%, #4ade80 100%)`
//                     }}
//                   />
//                   <div className="flex justify-between text-green-200 text-sm">
//                     <span>{formatTime(currentTime)}</span>
//                     <span>{formatTime(duration)}</span>
//                   </div>
//                 </div>

//                 {/* Main Controls */}
//                 <div className="flex items-center justify-center gap-4">
//                   <button className="p-2 rounded-full hover:bg-green-500 text-white transition-colors">
//                     <Shuffle className="h-5 w-5" />
//                   </button>
//                   <button className="p-2 rounded-full hover:bg-green-500 text-white transition-colors">
//                     <SkipBack className="h-5 w-5" />
//                   </button>
//                   <button
//                     onClick={togglePlay}
//                     className="w-14 h-14 rounded-full bg-white text-green-600 flex items-center justify-center hover:scale-105 transition-transform"
//                   >
//                     {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
//                   </button>
//                   <button className="p-2 rounded-full hover:bg-green-500 text-white transition-colors">
//                     <SkipForward className="h-5 w-5" />
//                   </button>
//                   <button className="p-2 rounded-full hover:bg-green-500 text-white transition-colors">
//                     <Repeat className="h-5 w-5" />
//                   </button>
//                 </div>

//                 {/* Volume and Extra Controls */}
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <button onClick={toggleMute} className="text-white hover:text-green-200">
//                       <Volume2 className="h-5 w-5" />
//                     </button>
//                     <input
//                       type="range"
//                       min="0"
//                       max="1"
//                       step="0.01"
//                       value={volume}
//                       onChange={handleVolumeChange}
//                       className="w-24 h-1 bg-green-400 rounded-lg appearance-none cursor-pointer"
//                     />
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <button onClick={() => setShowTranscript(!showTranscript)} className="text-white hover:text-green-200">
//                       <FileText className="h-5 w-5" />
//                     </button>
//                     <button onClick={toggleFullscreen} className="text-white hover:text-green-200">
//                       {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-wrap gap-3 mt-6">
//               <button
//                 onClick={handleLike}
//                 disabled={likeMutation.isPending}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
//                   isLiked ? 'bg-red-50 text-red-600' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
//                 }`}
//               >
//                 <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
//                 <span>{likeMutation.isPending ? '...' : 'Like'}</span>
//               </button>
//               <button
//                 onClick={handleBookmark}
//                 disabled={bookmarkMutation.isPending}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
//                   isBookmarked ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
//                 }`}
//               >
//                 <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-primary-500' : ''}`} />
//                 <span>{bookmarkMutation.isPending ? '...' : 'Save'}</span>
//               </button>
//               <button
//                 onClick={handleShare}
//                 className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
//               >
//                 <Share2 className="h-5 w-5" />
//                 <span>Share</span>
//               </button>
//             </div>

//             {/* Stats */}
//             <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
//               <span className="flex items-center gap-1">
//                 <Play className="h-4 w-4" />
//                 {audio.stats?.plays?.toLocaleString() || 0} plays
//               </span>
//               <span className="flex items-center gap-1">
//                 <Eye className="h-4 w-4" />
//                 {audio.stats?.views?.toLocaleString() || 0} views
//               </span>
//               <span className="flex items-center gap-1">
//                 <Heart className="h-4 w-4" />
//                 {audio.stats?.likes?.toLocaleString() || 0} likes
//               </span>
//             </div>
//           </motion.div>
//         </div>

//         {/* Transcript Section */}
//         {showTranscript && audio.transcript && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="card p-6 mb-8"
//           >
//             <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//               <FileText className="h-5 w-5 text-primary-600" />
//               Transcript
//             </h3>
//             <div className="prose prose-sm max-w-none">
//               <p className="text-gray-700 whitespace-pre-line">{audio.transcript}</p>
//             </div>
//           </motion.div>
//         )}

//         {/* Related Audio */}
//         {relatedAudio.length > 0 && (
//           <div className="mt-8">
//             <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//               <ListMusic className="h-5 w-5 text-primary-600" />
//               More Like This
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               {relatedAudio.filter(item => item._id !== audio._id).slice(0, 4).map((related) => (
//                 <Link
//                   key={related._id}
//                   to={`/audio/${related.slug}`}
//                   className="group"
//                 >
//                   <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all">
//                     <div className="relative aspect-square bg-gray-100">
//                       {related.thumbnail || related.coverImage ? (
//                         <img 
//                           src={related.thumbnail || related.coverImage} 
//                           alt={related.title}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center">
//                           <Headphones className="h-8 w-8 text-gray-400" />
//                         </div>
//                       )}
//                       <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                         <Play className="h-8 w-8 text-white" />
//                       </div>
//                       {related.duration && (
//                         <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded-md">
//                           {formatTime(related.duration)}
//                         </div>
//                       )}
//                     </div>
//                     <div className="p-3">
//                       <h4 className="font-medium text-gray-900 text-sm line-clamp-1">{related.title}</h4>
//                       <p className="text-xs text-gray-500 mt-1">
//                         {typeof related.author === 'object' ? related.author?.name : related.author || 'Unknown'}
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

// export default AudioDetailPage;




























// // client/src/pages/public/AudioDetailPage.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { motion } from 'framer-motion';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { useSelector } from 'react-redux';
// import toast from 'react-hot-toast';
// import {
//   Headphones, Play, Pause, Heart, Share2, Bookmark, Download,
//   ChevronLeft, Clock, Eye, Calendar, User, Loader2, AlertCircle,
//   Mic, Music, FileText, Volume2, SkipBack, SkipForward,
//   Repeat, Shuffle, ListMusic, Maximize2, Minimize2, X,
//   ChevronRight, ChevronLeft as ChevronLeftIcon
// } from 'lucide-react';
// import audioAPI from '../../api/audioAPI';
// import authorAPI from '../../api/authorAPI';
// import { useAudioPlayer } from '../../context/AudioPlayerContext';

// const AudioDetailPage = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const { t } = useTranslation();
//   const queryClient = useQueryClient();
//   const { user } = useSelector(state => state.auth);
  
//   // Get audio player functions from context
//   const { 
//     playAudio, 
//     currentAudio,
//     isPlaying: globalIsPlaying
//   } = useAudioPlayer();
  
//   const audioRef = useRef(null);
//   const categoryScrollRef = useRef(null);
//   const playlistScrollRef = useRef(null);
  
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [volume, setVolume] = useState(1);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isLiked, setIsLiked] = useState(false);
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [showTranscript, setShowTranscript] = useState(false);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [activeTab, setActiveTab] = useState('related'); // 'related', 'categories', 'playlists'
//   const [categories, setCategories] = useState([]);
//   const [playlists, setPlaylists] = useState([]);
//   const [loadingCategories, setLoadingCategories] = useState(false);
//   const [loadingPlaylists, setLoadingPlaylists] = useState(false);
  
//   const playerContainerRef = useRef(null);

//   // Scroll functions
//   const scrollCategories = (direction) => {
//     if (categoryScrollRef.current) {
//       const scrollAmount = 300;
//       const currentScroll = categoryScrollRef.current.scrollLeft;
//       const newScroll = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;
//       categoryScrollRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });
//     }
//   };

//   const scrollPlaylists = (direction) => {
//     if (playlistScrollRef.current) {
//       const scrollAmount = 300;
//       const currentScroll = playlistScrollRef.current.scrollLeft;
//       const newScroll = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;
//       playlistScrollRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });
//     }
//   };

//   // Fetch audio data using slug
//   const { data: audioData, isLoading, error } = useQuery({
//     queryKey: ['audio', slug],
//     queryFn: () => audioAPI.getAudio(slug),
//     enabled: !!slug,
//     retry: 1
//   });

//   const audio = audioData?.data || audioData;

//   // Fetch related audio
//   const { data: relatedData } = useQuery({
//     queryKey: ['related-audio', audio?._id],
//     queryFn: () => audioAPI.getAudioItems({ limit: 10, type: audio?.type }),
//     enabled: !!audio?._id
//   });

//   // Fetch all categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       setLoadingCategories(true);
//       try {
//         const response = await audioAPI.getAudioItems({ limit: 50 });
//         const allAudio = response?.data?.data || response?.data || response || [];
        
//         // Extract unique categories from audio items
//         const uniqueCategories = [...new Map(
//           allAudio.filter(item => item.type)
//             .map(item => [item.type, { 
//               id: item.type, 
//               name: item.type?.replace('_', ' '),
//               count: allAudio.filter(a => a.type === item.type).length,
//               icon: getCategoryIcon(item.type)
//             }])
//         ).values()];
        
//         setCategories(uniqueCategories.slice(0, 15));
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       } finally {
//         setLoadingCategories(false);
//       }
//     };
    
//     const fetchPlaylists = async () => {
//       setLoadingPlaylists(true);
//       try {
//         // Fetch public playlists
//         const response = await audioAPI.getAllPlaylists?.({ limit: 10 }) || { data: [] };
//         const playlistsData = response?.data?.data || response?.data || response || [];
//         setPlaylists(playlistsData.slice(0, 10));
//       } catch (error) {
//         console.error('Error fetching playlists:', error);
//         setPlaylists([]);
//       } finally {
//         setLoadingPlaylists(false);
//       }
//     };
    
//     fetchCategories();
//     fetchPlaylists();
//   }, []);

//   const relatedAudio = relatedData?.data?.data || relatedData?.data || relatedData || [];

//   // Get category icon
//   const getCategoryIcon = (type) => {
//     const icons = {
//       nauha: '😢',
//       marsiya: '💔',
//       soz: '🔥',
//       salam: '🕊️',
//       majlis: '🎙️',
//       naat: '⭐',
//       hamd: '🕌',
//       manqabat: '⚔️',
//       ghazal: '💕',
//       nazm: '📝',
//       podcast: '🎙️',
//       audiobook: '📚',
//       lecture: '🎓'
//     };
//     return icons[type] || '🎵';
//   };

//   // Like mutation
//   const likeMutation = useMutation({
//     mutationFn: () => audioAPI.likeAudio(audio?._id),
//     onSuccess: () => {
//       setIsLiked(!isLiked);
//       queryClient.invalidateQueries(['audio', slug]);
//       toast.success(isLiked ? 'Removed from likes' : 'Added to likes');
//     },
//     onError: () => toast.error('Failed to update like status')
//   });

//   // Bookmark mutation
//   const bookmarkMutation = useMutation({
//     mutationFn: () => audioAPI.bookmarkAudio(audio?._id),
//     onSuccess: () => {
//       setIsBookmarked(!isBookmarked);
//       queryClient.invalidateQueries(['audio', slug]);
//       toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
//     },
//     onError: () => toast.error('Failed to update bookmark status')
//   });

//   // Audio player controls
//   const togglePlay = () => {
//     if (audioRef.current) {
//       if (isPlaying) {
//         audioRef.current.pause();
//       } else {
//         audioRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const handleTimeUpdate = () => {
//     if (audioRef.current) {
//       setCurrentTime(audioRef.current.currentTime);
//     }
//   };

//   const handleLoadedMetadata = () => {
//     if (audioRef.current) {
//       setDuration(audioRef.current.duration);
//     }
//   };

//   const handleSeek = (e) => {
//     const seekTime = parseFloat(e.target.value);
//     setCurrentTime(seekTime);
//     if (audioRef.current) {
//       audioRef.current.currentTime = seekTime;
//     }
//   };

//   const handleVolumeChange = (e) => {
//     const newVolume = parseFloat(e.target.value);
//     setVolume(newVolume);
//     if (audioRef.current) {
//       audioRef.current.volume = newVolume;
//     }
//     setIsMuted(newVolume === 0);
//   };

//   const toggleMute = () => {
//     if (audioRef.current) {
//       audioRef.current.muted = !isMuted;
//       setIsMuted(!isMuted);
//     }
//   };

//   const formatTime = (time) => {
//     if (isNaN(time)) return '0:00';
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds.toString().padStart(2, '0')}`;
//   };

//   const toggleFullscreen = () => {
//     if (!isFullscreen) {
//       if (playerContainerRef.current?.requestFullscreen) {
//         playerContainerRef.current.requestFullscreen();
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

//   // Handle keyboard shortcuts
//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (e.code === 'Space') {
//         e.preventDefault();
//         togglePlay();
//       } else if (e.code === 'ArrowLeft') {
//         if (audioRef.current) {
//           audioRef.current.currentTime = Math.max(0, currentTime - 10);
//         }
//       } else if (e.code === 'ArrowRight') {
//         if (audioRef.current) {
//           audioRef.current.currentTime = Math.min(duration, currentTime + 10);
//         }
//       }
//     };
//     window.addEventListener('keydown', handleKeyPress);
//     return () => window.removeEventListener('keydown', handleKeyPress);
//   }, [currentTime, duration]);

//   const handleLike = () => {
//     if (!user) {
//       toast.error('Please login to like audio');
//       navigate('/login');
//       return;
//     }
//     likeMutation.mutate();
//   };

//   const handleBookmark = () => {
//     if (!user) {
//       toast.error('Please login to bookmark audio');
//       navigate('/login');
//       return;
//     }
//     bookmarkMutation.mutate();
//   };

//   const handleShare = async () => {
//     const url = window.location.href;
//     try {
//       await navigator.clipboard.writeText(url);
//       toast.success('Link copied to clipboard!');
//     } catch (err) {
//       toast.error('Failed to copy link');
//     }
//   };

//   const getAuthorName = () => {
//     if (!audio?.author) return 'Unknown Artist';
//     if (typeof audio.author === 'object') return audio.author.name || 'Unknown Artist';
//     return audio.author || 'Unknown Artist';
//   };

//   const getAuthorSlug = () => {
//     if (!audio?.author) return '#';
//     if (typeof audio.author === 'object') return audio.author.slug || '#';
//     return '#';
//   };

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
//           <p className="text-gray-500">Loading audio...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error || !audio) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Audio Not Found</h1>
//           <p className="text-gray-500 mb-6">The audio you are looking for does not exist or has been removed.</p>
//           <Link to="/audio" className="btn-primary inline-flex items-center space-x-2">
//             <ChevronLeft className="h-4 w-4" />
//             <span>Browse All Audio</span>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Breadcrumb */}
//         <div className="mb-6">
//           <Link to="/audio" className="inline-flex items-center space-x-1 text-sm text-gray-500 hover:text-primary-600 transition-colors">
//             <ChevronLeft className="h-4 w-4" />
//             <span>Back to Audio</span>
//           </Link>
//         </div>

//         {/* Audio Player Section */}
//         <div className="grid lg:grid-cols-3 gap-8 mb-8">
//           {/* Album Art */}
//           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
//             <div className="card overflow-hidden rounded-xl shadow-lg">
//               {audio.thumbnail || audio.coverImage ? (
//                 <img 
//                   src={audio.thumbnail || audio.coverImage} 
//                   alt={audio.title} 
//                   className="w-full aspect-square object-cover"
//                 />
//               ) : (
//                 <div className="w-full aspect-square bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
//                   <Headphones className="h-20 w-20 text-white" />
//                 </div>
//               )}
//             </div>
//           </motion.div>

//           {/* Audio Info */}
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
//             <div className="flex flex-wrap items-center gap-2 mb-3">
//               <span className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full capitalize">
//                 {audio.type?.replace('_', ' ')}
//               </span>
//               <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
//                 {audio.language === 'urdu' ? 'Urdu' : audio.language === 'hindi' ? 'Hindi' : audio.language || 'English'}
//               </span>
//               {audio.isPremium && <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">Premium</span>}
//               {audio.isFeatured && <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">Featured</span>}
//             </div>

//             <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{audio.title}</h1>
//             {audio.description && (
//               <p className="text-gray-600 mb-4">{audio.description}</p>
//             )}

//             <div className="flex items-center flex-wrap gap-4 mb-6">
//               <Link to={`/author/${getAuthorSlug()}`} className="inline-flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-medium">
//                 <User className="h-4 w-4" />
//                 <span>{getAuthorName()}</span>
//               </Link>
//               <span className="flex items-center space-x-1 text-gray-500">
//                 <Calendar className="h-4 w-4" />
//                 <span>{new Date(audio.createdAt).toLocaleDateString()}</span>
//               </span>
//             </div>

//             {/* Audio Player */}
//             <div ref={playerContainerRef} className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 shadow-xl">
//               <audio
//                 ref={audioRef}
//                 src={audio.audioUrl}
//                 onTimeUpdate={handleTimeUpdate}
//                 onLoadedMetadata={handleLoadedMetadata}
//                 onEnded={() => setIsPlaying(false)}
//               />
              
//               {/* Player Controls */}
//               <div className="space-y-4">
//                 <div className="text-center">
//                   <h3 className="text-white font-medium text-lg">{audio.title}</h3>
//                   <p className="text-green-200 text-sm">{getAuthorName()}</p>
//                 </div>

//                 <div className="space-y-2">
//                   <input
//                     type="range"
//                     min="0"
//                     max={duration || 0}
//                     value={currentTime}
//                     onChange={handleSeek}
//                     className="w-full h-1 bg-green-400 rounded-lg appearance-none cursor-pointer"
//                     style={{
//                       background: `linear-gradient(to right, #fff 0%, #fff ${(currentTime / duration) * 100}%, #4ade80 ${(currentTime / duration) * 100}%, #4ade80 100%)`
//                     }}
//                   />
//                   <div className="flex justify-between text-green-200 text-sm">
//                     <span>{formatTime(currentTime)}</span>
//                     <span>{formatTime(duration)}</span>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-center gap-4">
//                   <button className="p-2 rounded-full hover:bg-green-500 text-white transition-colors">
//                     <Shuffle className="h-5 w-5" />
//                   </button>
//                   <button className="p-2 rounded-full hover:bg-green-500 text-white transition-colors">
//                     <SkipBack className="h-5 w-5" />
//                   </button>
//                   <button
//                     onClick={togglePlay}
//                     className="w-14 h-14 rounded-full bg-white text-green-600 flex items-center justify-center hover:scale-105 transition-transform"
//                   >
//                     {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
//                   </button>
//                   <button className="p-2 rounded-full hover:bg-green-500 text-white transition-colors">
//                     <SkipForward className="h-5 w-5" />
//                   </button>
//                   <button className="p-2 rounded-full hover:bg-green-500 text-white transition-colors">
//                     <Repeat className="h-5 w-5" />
//                   </button>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <button onClick={toggleMute} className="text-white hover:text-green-200">
//                       <Volume2 className="h-5 w-5" />
//                     </button>
//                     <input
//                       type="range"
//                       min="0"
//                       max="1"
//                       step="0.01"
//                       value={volume}
//                       onChange={handleVolumeChange}
//                       className="w-24 h-1 bg-green-400 rounded-lg appearance-none cursor-pointer"
//                     />
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <button onClick={() => setShowTranscript(!showTranscript)} className="text-white hover:text-green-200">
//                       <FileText className="h-5 w-5" />
//                     </button>
//                     <button onClick={toggleFullscreen} className="text-white hover:text-green-200">
//                       {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-wrap gap-3 mt-6">
//               <button
//                 onClick={handleLike}
//                 disabled={likeMutation.isPending}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
//                   isLiked ? 'bg-red-50 text-red-600' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
//                 }`}
//               >
//                 <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
//                 <span>{likeMutation.isPending ? '...' : 'Like'}</span>
//               </button>
//               <button
//                 onClick={handleBookmark}
//                 disabled={bookmarkMutation.isPending}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
//                   isBookmarked ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
//                 }`}
//               >
//                 <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-primary-500' : ''}`} />
//                 <span>{bookmarkMutation.isPending ? '...' : 'Save'}</span>
//               </button>
//               <button
//                 onClick={handleShare}
//                 className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
//               >
//                 <Share2 className="h-5 w-5" />
//                 <span>Share</span>
//               </button>
//             </div>

//             {/* Stats */}
//             <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
//               <span className="flex items-center gap-1">
//                 <Play className="h-4 w-4" />
//                 {audio.stats?.plays?.toLocaleString() || 0} plays
//               </span>
//               <span className="flex items-center gap-1">
//                 <Eye className="h-4 w-4" />
//                 {audio.stats?.views?.toLocaleString() || 0} views
//               </span>
//               <span className="flex items-center gap-1">
//                 <Heart className="h-4 w-4" />
//                 {audio.stats?.likes?.toLocaleString() || 0} likes
//               </span>
//             </div>
//           </motion.div>
//         </div>

//         {/* Tabs for Related, Categories, Playlists */}
//         <div className="mt-8">
//           <div className="flex gap-2 border-b border-gray-200 mb-6">
//             <button
//               onClick={() => setActiveTab('related')}
//               className={`px-4 py-2 text-sm font-medium transition-colors ${
//                 activeTab === 'related'
//                   ? 'text-primary-600 border-b-2 border-primary-600'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               <ListMusic className="h-4 w-4 inline mr-2" />
//               Related Audio
//             </button>
//             <button
//               onClick={() => setActiveTab('categories')}
//               className={`px-4 py-2 text-sm font-medium transition-colors ${
//                 activeTab === 'categories'
//                   ? 'text-primary-600 border-b-2 border-primary-600'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               <Music className="h-4 w-4 inline mr-2" />
//               Categories
//             </button>
//             <button
//               onClick={() => setActiveTab('playlists')}
//               className={`px-4 py-2 text-sm font-medium transition-colors ${
//                 activeTab === 'playlists'
//                   ? 'text-primary-600 border-b-2 border-primary-600'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               <ListMusic className="h-4 w-4 inline mr-2" />
//               Playlists
//             </button>
//           </div>

//           {/* Related Audio Tab */}
//           {activeTab === 'related' && (
//             <div>
//               {relatedAudio.filter(item => item._id !== audio._id).length === 0 ? (
//                 <div className="text-center py-8 text-gray-500">
//                   <Headphones className="h-12 w-12 mx-auto mb-3 text-gray-300" />
//                   <p>No related audio found</p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {relatedAudio.filter(item => item._id !== audio._id).slice(0, 6).map((related) => (
//                     <div
//                       key={related._id}
//                       className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all group cursor-pointer"
//                       onClick={() => {
//                         window.location.href = `/audio/${related.slug}`;
//                       }}
//                     >
//                       <div className="relative aspect-square bg-gray-100">
//                         {related.thumbnail || related.coverImage ? (
//                           <img 
//                             src={related.thumbnail || related.coverImage} 
//                             alt={related.title}
//                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                           />
//                         ) : (
//                           <div className="w-full h-full flex items-center justify-center">
//                             <Headphones className="h-8 w-8 text-gray-400" />
//                           </div>
//                         )}
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             playAudio(related, relatedAudio, relatedAudio.findIndex(r => r._id === related._id));
//                           }}
//                           className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
//                         >
//                           <div className="bg-white/90 p-3 rounded-full">
//                             <Play className="h-6 w-6 text-primary-600 ml-0.5" />
//                           </div>
//                         </button>
//                         {related.duration && (
//                           <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded-md">
//                             {formatTime(related.duration)}
//                           </div>
//                         )}
//                       </div>
//                       <div className="p-3">
//                         <h4 className="font-medium text-gray-900 text-sm line-clamp-1">{related.title}</h4>
//                         <p className="text-xs text-gray-500 mt-1">
//                           {typeof related.author === 'object' ? related.author?.name : related.author || 'Unknown'}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Categories Tab - Scrollable */}
//           {activeTab === 'categories' && (
//             <div className="relative">
//               {categories.length > 4 && (
//                 <button
//                   onClick={() => scrollCategories('left')}
//                   className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1.5 border border-gray-200 hover:bg-gray-50"
//                 >
//                   <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
//                 </button>
//               )}
              
//               <div
//                 ref={categoryScrollRef}
//                 className="flex gap-4 overflow-x-auto scrollbar-hide px-8 pb-4"
//                 style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//               >
//                 {loadingCategories ? (
//                   <div className="flex justify-center py-8 w-full">
//                     <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//                   </div>
//                 ) : (
//                   categories.map((category) => (
//                     <Link
//                       key={category.id}
//                       to={`/audio/type/${category.id}`}
//                       className="flex-shrink-0 w-32 text-center group"
//                     >
//                       <div className="bg-gradient-to-br from-primary-100 to-purple-100 rounded-xl p-4 group-hover:shadow-lg transition-all">
//                         <span className="text-3xl">{category.icon}</span>
//                       </div>
//                       <p className="mt-2 text-sm font-medium text-gray-700 capitalize">{category.name}</p>
//                       <p className="text-xs text-gray-400">{category.count} items</p>
//                     </Link>
//                   ))
//                 )}
//               </div>
              
//               {categories.length > 4 && (
//                 <button
//                   onClick={() => scrollCategories('right')}
//                   className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1.5 border border-gray-200 hover:bg-gray-50"
//                 >
//                   <ChevronRight className="h-5 w-5 text-gray-600" />
//                 </button>
//               )}
//             </div>
//           )}

//           {/* Playlists Tab - Scrollable */}
//           {activeTab === 'playlists' && (
//             <div className="relative">
//               {playlists.length > 4 && (
//                 <button
//                   onClick={() => scrollPlaylists('left')}
//                   className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1.5 border border-gray-200 hover:bg-gray-50"
//                 >
//                   <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
//                 </button>
//               )}
              
//               <div
//                 ref={playlistScrollRef}
//                 className="flex gap-4 overflow-x-auto scrollbar-hide px-8 pb-4"
//                 style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//               >
//                 {loadingPlaylists ? (
//                   <div className="flex justify-center py-8 w-full">
//                     <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//                   </div>
//                 ) : playlists.length === 0 ? (
//                   <div className="text-center py-8 text-gray-500 w-full">
//                     <ListMusic className="h-12 w-12 mx-auto mb-3 text-gray-300" />
//                     <p>No playlists available</p>
//                     <Link to="/admin/audio/playlists" className="text-primary-600 text-sm mt-2 inline-block">
//                       Create Playlist
//                     </Link>
//                   </div>
//                 ) : (
//                   playlists.map((playlist) => (
//                     <div
//                       key={playlist._id}
//                       className="flex-shrink-0 w-48 bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group"
//                       onClick={() => {
//                         if (playlist.audios?.length > 0) {
//                           playAudio(playlist.audios[0], playlist.audios, 0);
//                           toast.success(`Playing playlist: ${playlist.name}`);
//                         } else {
//                           toast.error('Empty playlist');
//                         }
//                       }}
//                     >
//                       <div className="relative aspect-square bg-gradient-to-br from-primary-400 to-purple-500 rounded-t-xl overflow-hidden">
//                         {playlist.coverImage ? (
//                           <img 
//                             src={playlist.coverImage} 
//                             alt={playlist.name}
//                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                           />
//                         ) : (
//                           <div className="w-full h-full flex items-center justify-center">
//                             <ListMusic className="h-12 w-12 text-white/70" />
//                           </div>
//                         )}
//                         <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                           <div className="bg-white/90 p-2 rounded-full">
//                             <Play className="h-5 w-5 text-primary-600 ml-0.5" />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="p-3">
//                         <h4 className="font-medium text-gray-900 text-sm line-clamp-1">{playlist.name}</h4>
//                         <p className="text-xs text-gray-500 mt-1">
//                           {playlist.audios?.length || 0} tracks
//                         </p>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
              
//               {playlists.length > 4 && (
//                 <button
//                   onClick={() => scrollPlaylists('right')}
//                   className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1.5 border border-gray-200 hover:bg-gray-50"
//                 >
//                   <ChevronRight className="h-5 w-5 text-gray-600" />
//                 </button>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Transcript Section */}
//         {showTranscript && audio.transcript && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="card p-6 mt-8"
//           >
//             <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//               <FileText className="h-5 w-5 text-primary-600" />
//               Transcript
//             </h3>
//             <div className="prose prose-sm max-w-none">
//               <p className="text-gray-700 whitespace-pre-line">{audio.transcript}</p>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AudioDetailPage;









// // client/src/pages/public/AudioDetailPage.jsx
// // Glassmorphism + gradient surfaces
// // Spotify/Apple Music–style player feel

// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { useSelector } from 'react-redux';
// import toast from 'react-hot-toast';
// import {
//   Headphones, Play, Pause, Heart, Share2, Bookmark,
//   ChevronLeft, Eye, Calendar, User, Loader2, AlertCircle,
//   FileText, Volume2, SkipBack, SkipForward,
//   Repeat, Shuffle, ListMusic, Maximize2, Minimize2
// } from 'lucide-react';
// import audioAPI from '../../api/audioAPI';

// const AudioDetailPage = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();
//   const { user } = useSelector(state => state.auth);
//   const audioRef = useRef(null);
//   const playerContainerRef = useRef(null);

//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [volume, setVolume] = useState(1);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isLiked, setIsLiked] = useState(false);
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [showTranscript, setShowTranscript] = useState(false);
//   const [isFullscreen, setIsFullscreen] = useState(false);

//   const { data: audioData, isLoading, error } = useQuery({
//     queryKey: ['audio', slug],
//     queryFn: () => audioAPI.getAudio(slug),
//     enabled: !!slug
//   });

//   const audio = audioData?.data || audioData;

//   const { data: relatedData } = useQuery({
//     queryKey: ['related-audio', audio?._id],
//     queryFn: () => audioAPI.getAudioItems({ limit: 4, type: audio?.type }),
//     enabled: !!audio?._id
//   });

//   const relatedAudio = relatedData?.data?.data || [];

//   const likeMutation = useMutation({
//     mutationFn: () => audioAPI.likeAudio(audio?._id),
//     onSuccess: () => {
//       setIsLiked(!isLiked);
//       queryClient.invalidateQueries(['audio', slug]);
//     }
//   });

//   const bookmarkMutation = useMutation({
//     mutationFn: () => audioAPI.bookmarkAudio(audio?._id),
//     onSuccess: () => {
//       setIsBookmarked(!isBookmarked);
//       queryClient.invalidateQueries(['audio', slug]);
//     }
//   });

//   const togglePlay = () => {
//     if (!audioRef.current) return;
//     isPlaying ? audioRef.current.pause() : audioRef.current.play();
//     setIsPlaying(!isPlaying);
//   };

//   const formatTime = (t) => {
//     if (!t) return "0:00";
//     const m = Math.floor(t / 60);
//     const s = Math.floor(t % 60);
//     return `${m}:${s.toString().padStart(2, '0')}`;
//   };

//   const handleSeek = (e) => {
//     const t = e.target.value;
//     setCurrentTime(t);
//     audioRef.current.currentTime = t;
//   };

//   const toggleFullscreen = () => {
//     if (!isFullscreen) playerContainerRef.current?.requestFullscreen();
//     else document.exitFullscreen();
//   };

//   useEffect(() => {
//     const handleFs = () => setIsFullscreen(!!document.fullscreenElement);
//     document.addEventListener('fullscreenchange', handleFs);
//     return () => document.removeEventListener('fullscreenchange', handleFs);
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-black">
//         <Loader2 className="animate-spin text-green-400 w-10 h-10" />
//       </div>
//     );
//   }

//   if (error || !audio) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black">
//         <AlertCircle className="w-12 h-12 mb-4 text-red-500" />
//         <p>Audio not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-20 pb-16">

//       <div className="max-w-6xl mx-auto px-4">

//         {/* Back */}
//         <Link to="/audio" className="flex items-center text-gray-400 hover:text-white mb-6">
//           <ChevronLeft className="w-4 h-4 mr-1" />
//           Back
//         </Link>

//         <div className="grid lg:grid-cols-3 gap-10">

//           {/* COVER */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="relative group"
//           >
//             <div className="rounded-2xl overflow-hidden shadow-2xl">
//               {audio.thumbnail ? (
//                 <img src={audio.thumbnail} className="w-full aspect-square object-cover group-hover:scale-105 transition duration-500" />
//               ) : (
//                 <div className="aspect-square flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-700">
//                   <Headphones size={60} />
//                 </div>
//               )}
//             </div>
//           </motion.div>

//           {/* INFO + PLAYER */}
//           <div className="lg:col-span-2 space-y-6">

//             <div>
//               <h1 className="text-3xl font-bold">{audio.title}</h1>
//               <p className="text-gray-400 mt-2">{audio.description}</p>

//               <div className="flex gap-4 mt-4 text-sm text-gray-400">
//                 <span className="flex items-center gap-1">
//                   <User size={14} /> {audio.author?.name || 'Unknown'}
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <Calendar size={14} /> {new Date(audio.createdAt).toLocaleDateString()}
//                 </span>
//               </div>
//             </div>

//             {/* PLAYER */}
//             <div
//               ref={playerContainerRef}
//               className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl"
//             >
//               <audio
//                 ref={audioRef}
//                 src={audio.audioUrl}
//                 onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
//                 onLoadedMetadata={() => setDuration(audioRef.current.duration)}
//                 onEnded={() => setIsPlaying(false)}
//               />

//               {/* progress */}
//               <input
//                 type="range"
//                 min="0"
//                 max={duration}
//                 value={currentTime}
//                 onChange={handleSeek}
//                 className="w-full accent-green-400"
//               />

//               <div className="flex justify-between text-xs text-gray-400 mt-1">
//                 <span>{formatTime(currentTime)}</span>
//                 <span>{formatTime(duration)}</span>
//               </div>

//               {/* controls */}
//               <div className="flex justify-center items-center gap-6 mt-6">
//                 <Shuffle className="cursor-pointer opacity-70 hover:opacity-100" />
//                 <SkipBack className="cursor-pointer" />

//                 <button
//                   onClick={togglePlay}
//                   className="w-14 h-14 flex items-center justify-center rounded-full bg-green-500 hover:scale-105 transition"
//                 >
//                   {isPlaying ? <Pause /> : <Play className="ml-1" />}
//                 </button>

//                 <SkipForward className="cursor-pointer" />
//                 <Repeat className="cursor-pointer opacity-70 hover:opacity-100" />
//               </div>

//               {/* bottom controls */}
//               <div className="flex justify-between items-center mt-6">
//                 <div className="flex items-center gap-2">
//                   <Volume2 />
//                   <input
//                     type="range"
//                     min="0"
//                     max="1"
//                     step="0.01"
//                     value={volume}
//                     onChange={(e) => {
//                       const v = e.target.value;
//                       setVolume(v);
//                       audioRef.current.volume = v;
//                     }}
//                   />
//                 </div>

//                 <div className="flex gap-3">
//                   <button onClick={() => setShowTranscript(!showTranscript)}>
//                     <FileText />
//                   </button>
//                   <button onClick={toggleFullscreen}>
//                     {isFullscreen ? <Minimize2 /> : <Maximize2 />}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* ACTIONS */}
//             <div className="flex gap-3">
//               <button
//                 onClick={() => likeMutation.mutate()}
//                 className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 flex items-center gap-2"
//               >
//                 <Heart className={isLiked ? "fill-red-500 text-red-500" : ""} />
//                 Like
//               </button>

//               <button
//                 onClick={() => bookmarkMutation.mutate()}
//                 className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 flex items-center gap-2"
//               >
//                 <Bookmark />
//                 Save
//               </button>

//               <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 flex items-center gap-2">
//                 <Share2 />
//                 Share
//               </button>
//             </div>

//             {/* STATS */}
//             <div className="flex gap-6 text-sm text-gray-400">
//               <span className="flex items-center gap-1">
//                 <Play size={14} /> {audio.stats?.plays || 0}
//               </span>
//               <span className="flex items-center gap-1">
//                 <Eye size={14} /> {audio.stats?.views || 0}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* TRANSCRIPT */}
//         {showTranscript && audio.transcript && (
//           <div className="mt-10 bg-white/5 p-6 rounded-xl backdrop-blur">
//             <h3 className="mb-3 font-semibold">Transcript</h3>
//             <p className="text-gray-300 whitespace-pre-line">{audio.transcript}</p>
//           </div>
//         )}

//         {/* RELATED */}
//         {relatedAudio.length > 0 && (
//           <div className="mt-12">
//             <h3 className="mb-4 font-semibold flex items-center gap-2">
//               <ListMusic /> More Like This
//             </h3>

//             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
//               {relatedAudio.slice(0, 4).map(item => (
//                 <Link key={item._id} to={`/audio/${item.slug}`}>
//                   <div className="bg-white/5 hover:bg-white/10 rounded-xl overflow-hidden transition group">
//                     <div className="aspect-square">
//                       <img
//                         src={item.thumbnail}
//                         className="w-full h-full object-cover group-hover:scale-105 transition"
//                       />
//                     </div>
//                     <div className="p-3">
//                       <p className="text-sm font-medium">{item.title}</p>
//                       <p className="text-xs text-gray-400">{item.author?.name}</p>
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

// export default AudioDetailPage;















// // client/src/pages/public/AudioDetailPage.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { useSelector } from 'react-redux';
// import toast from 'react-hot-toast';
// import {
//   Headphones, Play, Pause, Heart, Share2, Bookmark, Download,
//   ChevronLeft, Clock, Eye, Calendar, User, Loader2, AlertCircle,
//   Mic, Music, FileText, Volume2, SkipBack, SkipForward,
//   Repeat, Shuffle, ListMusic, Maximize2, Minimize2, X,
//   ChevronRight, ChevronLeft as ChevronLeftIcon, Crown, Star, Sparkles,
//   Award, Gem, Shield, Zap, TrendingUp, Radio, Disc, Album, Users
// } from 'lucide-react';
// import audioAPI from '../../api/audioAPI';
// import authorAPI from '../../api/authorAPI';
// import { useAudioPlayer } from '../../context/AudioPlayerContext';

// const AudioDetailPage = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const { t } = useTranslation();
//   const queryClient = useQueryClient();
//   const { user } = useSelector(state => state.auth);
  
//   // Get audio player functions from context
//   const { 
//     playAudio, 
//     currentAudio,
//     isPlaying: globalIsPlaying
//   } = useAudioPlayer();
  
//   const audioRef = useRef(null);
//   const categoryScrollRef = useRef(null);
//   const playlistScrollRef = useRef(null);
  
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [volume, setVolume] = useState(1);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isLiked, setIsLiked] = useState(false);
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [showTranscript, setShowTranscript] = useState(false);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [activeTab, setActiveTab] = useState('related');
//   const [categories, setCategories] = useState([]);
//   const [playlists, setPlaylists] = useState([]);
//   const [loadingCategories, setLoadingCategories] = useState(false);
//   const [loadingPlaylists, setLoadingPlaylists] = useState(false);
//   const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  
//   const playerContainerRef = useRef(null);

//   // Premium Plans
//   const premiumPlans = [
//     {
//       id: 'basic',
//       name: 'Basic',
//       price: 99,
//       period: 'month',
//       icon: Headphones,
//       features: ['HD Audio', 'Ad-free', 'Basic support']
//     },
//     {
//       id: 'premium',
//       name: 'Premium',
//       price: 199,
//       period: 'month',
//       icon: Crown,
//       features: ['Ultra HD Audio', 'Ad-free', 'Unlimited downloads', 'Priority support', 'Offline mode'],
//       recommended: true
//     },
//     {
//       id: 'family',
//       name: 'Family',
//       price: 399,
//       period: 'month',
//       icon: Users,
//       features: ['Everything in Premium', '5 family members', 'Family playlists', 'Parental controls']
//     }
//   ];

//   // Scroll functions
//   const scrollCategories = (direction) => {
//     if (categoryScrollRef.current) {
//       const scrollAmount = 300;
//       const currentScroll = categoryScrollRef.current.scrollLeft;
//       const newScroll = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;
//       categoryScrollRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });
//     }
//   };

//   const scrollPlaylists = (direction) => {
//     if (playlistScrollRef.current) {
//       const scrollAmount = 300;
//       const currentScroll = playlistScrollRef.current.scrollLeft;
//       const newScroll = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;
//       playlistScrollRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });
//     }
//   };

//   // Fetch audio data using slug
//   const { data: audioData, isLoading, error } = useQuery({
//     queryKey: ['audio', slug],
//     queryFn: () => audioAPI.getAudio(slug),
//     enabled: !!slug,
//     retry: 1
//   });

//   const audio = audioData?.data || audioData;

//   // Fetch related audio
//   const { data: relatedData } = useQuery({
//     queryKey: ['related-audio', audio?._id],
//     queryFn: () => audioAPI.getAudioItems({ limit: 10, type: audio?.type }),
//     enabled: !!audio?._id
//   });

//   // Fetch all categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       setLoadingCategories(true);
//       try {
//         const response = await audioAPI.getAudioItems({ limit: 50 });
//         const allAudio = response?.data?.data || response?.data || response || [];
        
//         const uniqueCategories = [...new Map(
//           allAudio.filter(item => item.type)
//             .map(item => [item.type, { 
//               id: item.type, 
//               name: item.type?.replace('_', ' '),
//               count: allAudio.filter(a => a.type === item.type).length,
//               icon: getCategoryIcon(item.type)
//             }])
//         ).values()];
        
//         setCategories(uniqueCategories.slice(0, 15));
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       } finally {
//         setLoadingCategories(false);
//       }
//     };
    
//     const fetchPlaylists = async () => {
//       setLoadingPlaylists(true);
//       try {
//         const response = await audioAPI.getAllPlaylists?.({ limit: 10 }) || { data: [] };
//         const playlistsData = response?.data?.data || response?.data || response || [];
//         setPlaylists(playlistsData.slice(0, 10));
//       } catch (error) {
//         console.error('Error fetching playlists:', error);
//         setPlaylists([]);
//       } finally {
//         setLoadingPlaylists(false);
//       }
//     };
    
//     fetchCategories();
//     fetchPlaylists();
//   }, []);

//   const relatedAudio = relatedData?.data?.data || relatedData?.data || relatedData || [];

//   const getCategoryIcon = (type) => {
//     const icons = {
//       nauha: '😢', marsiya: '💔', soz: '🔥', salam: '🕊️', majlis: '🎙️',
//       naat: '⭐', hamd: '🕌', manqabat: '⚔️', ghazal: '💕', nazm: '📝',
//       podcast: '🎙️', audiobook: '📚', lecture: '🎓'
//     };
//     return icons[type] || '🎵';
//   };

//   // Like mutation
//   const likeMutation = useMutation({
//     mutationFn: () => audioAPI.likeAudio(audio?._id),
//     onSuccess: () => {
//       setIsLiked(!isLiked);
//       queryClient.invalidateQueries(['audio', slug]);
//       toast.success(isLiked ? 'Removed from likes' : 'Added to likes');
//     },
//     onError: () => toast.error('Failed to update like status')
//   });

//   // Bookmark mutation
//   const bookmarkMutation = useMutation({
//     mutationFn: () => audioAPI.bookmarkAudio(audio?._id),
//     onSuccess: () => {
//       setIsBookmarked(!isBookmarked);
//       queryClient.invalidateQueries(['audio', slug]);
//       toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
//     },
//     onError: () => toast.error('Failed to update bookmark status')
//   });

//   const togglePlay = () => {
//     if (audioRef.current) {
//       if (isPlaying) {
//         audioRef.current.pause();
//       } else {
//         audioRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const handleTimeUpdate = () => {
//     if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
//   };

//   const handleLoadedMetadata = () => {
//     if (audioRef.current) setDuration(audioRef.current.duration);
//   };

//   const handleSeek = (e) => {
//     const seekTime = parseFloat(e.target.value);
//     setCurrentTime(seekTime);
//     if (audioRef.current) audioRef.current.currentTime = seekTime;
//   };

//   const handleVolumeChange = (e) => {
//     const newVolume = parseFloat(e.target.value);
//     setVolume(newVolume);
//     if (audioRef.current) audioRef.current.volume = newVolume;
//     setIsMuted(newVolume === 0);
//   };

//   const toggleMute = () => {
//     if (audioRef.current) {
//       audioRef.current.muted = !isMuted;
//       setIsMuted(!isMuted);
//     }
//   };

//   const formatTime = (time) => {
//     if (isNaN(time)) return '0:00';
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds.toString().padStart(2, '0')}`;
//   };

//   const toggleFullscreen = () => {
//     if (!isFullscreen) {
//       if (playerContainerRef.current?.requestFullscreen) {
//         playerContainerRef.current.requestFullscreen();
//       }
//     } else {
//       if (document.exitFullscreen) document.exitFullscreen();
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

//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (e.code === 'Space') {
//         e.preventDefault();
//         togglePlay();
//       } else if (e.code === 'ArrowLeft') {
//         if (audioRef.current) {
//           audioRef.current.currentTime = Math.max(0, currentTime - 10);
//         }
//       } else if (e.code === 'ArrowRight') {
//         if (audioRef.current) {
//           audioRef.current.currentTime = Math.min(duration, currentTime + 10);
//         }
//       }
//     };
//     window.addEventListener('keydown', handleKeyPress);
//     return () => window.removeEventListener('keydown', handleKeyPress);
//   }, [currentTime, duration]);

//   const handleLike = () => {
//     if (!user) {
//       toast.error('Please login to like audio');
//       navigate('/login');
//       return;
//     }
//     likeMutation.mutate();
//   };

//   const handleBookmark = () => {
//     if (!user) {
//       toast.error('Please login to bookmark audio');
//       navigate('/login');
//       return;
//     }
//     bookmarkMutation.mutate();
//   };

//   const handleShare = async () => {
//     const url = window.location.href;
//     try {
//       await navigator.clipboard.writeText(url);
//       toast.success('Link copied to clipboard!');
//     } catch (err) {
//       toast.error('Failed to copy link');
//     }
//   };

//   const getAuthorName = () => {
//     if (!audio?.author) return 'Unknown Artist';
//     if (typeof audio.author === 'object') return audio.author.name || 'Unknown Artist';
//     return audio.author || 'Unknown Artist';
//   };

//   const getAuthorSlug = () => {
//     if (!audio?.author) return '#';
//     if (typeof audio.author === 'object') return audio.author.slug || '#';
//     return '#';
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
//         <div className="text-center">
//           <div className="relative">
//             <div className="w-20 h-20 rounded-full border-4 border-amber-500/30 border-t-amber-500 animate-spin mx-auto mb-4"></div>
//             <Sparkles className="h-8 w-8 text-amber-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
//           </div>
//           <p className="text-white/70">Loading audio...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !audio) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//         <div className="max-w-4xl mx-auto px-4 pt-32 pb-16 text-center">
//           <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
//             <AlertCircle className="h-10 w-10 text-red-400" />
//           </div>
//           <h1 className="text-2xl font-bold text-white mb-2">Audio Not Found</h1>
//           <p className="text-white/50 mb-6">The audio you are looking for does not exist or has been removed.</p>
//           <Link to="/audio" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
//             <ChevronLeft className="h-4 w-4" />
//             <span>Browse All Audio</span>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//       {/* Premium Modal */}
//       <AnimatePresence>
//         {isPremiumModalOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
//             onClick={() => setIsPremiumModalOpen(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="relative max-w-4xl w-full bg-gradient-to-br from-gray-900 to-purple-900 rounded-2xl overflow-hidden"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="absolute top-0 right-0 p-4">
//                 <button onClick={() => setIsPremiumModalOpen(false)} className="text-white/50 hover:text-white">
//                   <X className="h-6 w-6" />
//                 </button>
//               </div>
//               <div className="p-8">
//                 <div className="text-center mb-8">
//                   <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 mb-4">
//                     <Crown className="h-4 w-4 text-amber-400" />
//                     <span className="text-amber-400 text-sm">Premium Access Required</span>
//                   </div>
//                   <h2 className="text-3xl font-bold text-white mb-2">Unlock Premium Audio</h2>
//                   <p className="text-white/50">Get unlimited access to all premium content</p>
//                 </div>
//                 <div className="grid md:grid-cols-3 gap-4">
//                   {premiumPlans.map((plan) => (
//                     <div key={plan.id} className={`relative bg-white/5 backdrop-blur-sm rounded-xl p-4 border ${plan.recommended ? 'border-amber-500/50 shadow-lg shadow-amber-500/20' : 'border-white/10'}`}>
//                       {plan.recommended && (
//                         <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-xs font-semibold text-white">
//                           RECOMMENDED
//                         </div>
//                       )}
//                       <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.id === 'basic' ? 'from-blue-500 to-cyan-500' : plan.id === 'premium' ? 'from-amber-500 to-orange-500' : 'from-purple-500 to-pink-500'} flex items-center justify-center mb-3`}>
//                         <plan.icon className="h-6 w-6 text-white" />
//                       </div>
//                       <h3 className="text-xl font-bold text-white">{plan.name}</h3>
//                       <div className="mt-2">
//                         <span className="text-2xl font-bold text-white">₹{plan.price}</span>
//                         <span className="text-white/50">/{plan.period}</span>
//                       </div>
//                       <ul className="mt-4 space-y-2">
//                         {plan.features.slice(0, 3).map((feature, idx) => (
//                           <li key={idx} className="flex items-center gap-2 text-sm text-white/60">
//                             <Check className="h-3 w-3 text-green-400" />
//                             <span>{feature}</span>
//                           </li>
//                         ))}
//                       </ul>
//                       <button className="w-full mt-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
//                         Subscribe Now
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Floating Particles */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         {[...Array(30)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-1 h-1 bg-white/10 rounded-full"
//             animate={{ 
//               y: [0, -100, -200],
//               x: [0, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
//               opacity: [0, 0.5, 0]
//             }}
//             transition={{ duration: 8 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }}
//             style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
//           />
//         ))}
//       </div>

//       <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
//         {/* Breadcrumb */}
//         <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
//           <Link to="/audio" className="inline-flex items-center gap-2 text-white/50 hover:text-amber-400 transition-colors">
//             <ChevronLeft className="h-4 w-4" />
//             <span>Back to Audio</span>
//           </Link>
//         </motion.div>

//         {/* Premium Banner */}
//         {audio.isPremium && !user?.subscription?.plan !== 'premium' && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mb-6 p-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl border border-amber-500/30 flex items-center justify-between flex-wrap gap-4"
//           >
//             <div className="flex items-center gap-3">
//               <Crown className="h-8 w-8 text-amber-400" />
//               <div>
//                 <h3 className="text-white font-semibold">Premium Content</h3>
//                 <p className="text-white/50 text-sm">Subscribe to unlock this audio and many more</p>
//               </div>
//             </div>
//             <button
//               onClick={() => setIsPremiumModalOpen(true)}
//               className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
//             >
//               Upgrade Now
//             </button>
//           </motion.div>
//         )}

//         {/* Audio Player Section - Premium Glassmorphism Design */}
//         <div className="grid lg:grid-cols-3 gap-8 mb-12">
//           {/* Album Art with Glow Effect */}
//           <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
//             <div className="relative group">
//               <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/30 to-purple-500/30 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//               <div className="relative rounded-2xl overflow-hidden shadow-2xl">
//                 {audio.thumbnail || audio.coverImage ? (
//                   <img src={audio.thumbnail || audio.coverImage} alt={audio.title} className="w-full aspect-square object-cover" />
//                 ) : (
//                   <div className="w-full aspect-square bg-gradient-to-br from-amber-500/30 to-purple-500/30 flex items-center justify-center">
//                     <Disc className="h-24 w-24 text-white/50 animate-spin-slow" />
//                   </div>
//                 )}
//                 {audio.isPremium && (
//                   <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-xs font-semibold text-white flex items-center gap-1">
//                     <Crown className="h-3 w-3" />
//                     Premium
//                   </div>
//                 )}
//               </div>
//             </div>
//           </motion.div>

//           {/* Audio Info */}
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
//             <div className="flex flex-wrap items-center gap-2 mb-4">
//               <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm text-purple-300 text-xs font-semibold rounded-full capitalize border border-purple-500/30">
//                 {audio.type?.replace('_', ' ')}
//               </span>
//               <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white/60 text-xs rounded-full">
//                 {audio.language === 'urdu' ? 'Urdu' : audio.language === 'hindi' ? 'Hindi' : audio.language || 'English'}
//               </span>
//               {audio.isFeatured && (
//                 <span className="px-3 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 text-xs rounded-full flex items-center gap-1">
//                   <Star className="h-3 w-3" />
//                   Featured
//                 </span>
//               )}
//             </div>

//             <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{audio.title}</h1>
//             {audio.description && (
//               <p className="text-white/50 mb-4 leading-relaxed">{audio.description}</p>
//             )}

//             <div className="flex items-center flex-wrap gap-4 mb-6">
//               <Link to={`/author/${getAuthorSlug()}`} className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors">
//                 <User className="h-4 w-4" />
//                 <span>{getAuthorName()}</span>
//               </Link>
//               <span className="flex items-center gap-2 text-white/40">
//                 <Calendar className="h-4 w-4" />
//                 <span>{new Date(audio.createdAt).toLocaleDateString()}</span>
//               </span>
//               <span className="flex items-center gap-2 text-white/40">
//                 <Headphones className="h-4 w-4" />
//                 <span>{audio.stats?.plays?.toLocaleString() || 0} plays</span>
//               </span>
//             </div>

//             {/* Premium Audio Player */}
//             <div ref={playerContainerRef} className="relative bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl">
//               {/* Ambient Light Effect */}
//               <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl"></div>
//               <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
              
//               <audio ref={audioRef} src={audio.audioUrl} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onEnded={() => setIsPlaying(false)} />
              
//               <div className="relative z-10 space-y-5">
//                 <div className="text-center">
//                   <h3 className="text-white font-medium text-lg">{audio.title}</h3>
//                   <p className="text-white/40 text-sm">{getAuthorName()}</p>
//                 </div>

//                 {/* Progress Bar */}
//                 <div className="space-y-2">
//                   <input
//                     type="range"
//                     min="0"
//                     max={duration || 0}
//                     value={currentTime}
//                     onChange={handleSeek}
//                     className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-400"
//                     style={{
//                       background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${(currentTime / duration) * 100}%, rgba(255,255,255,0.1) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.1) 100%)`
//                     }}
//                   />
//                   <div className="flex justify-between text-white/40 text-xs">
//                     <span>{formatTime(currentTime)}</span>
//                     <span>{formatTime(duration)}</span>
//                   </div>
//                 </div>

//                 {/* Main Controls */}
//                 <div className="flex items-center justify-center gap-5">
//                   <button className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all">
//                     <Shuffle className="h-5 w-5" />
//                   </button>
//                   <button className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all">
//                     <SkipBack className="h-5 w-5" />
//                   </button>
//                   <button
//                     onClick={togglePlay}
//                     className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center justify-center hover:scale-105 hover:shadow-lg transition-all duration-300"
//                   >
//                     {isPlaying ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7 ml-1" />}
//                   </button>
//                   <button className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all">
//                     <SkipForward className="h-5 w-5" />
//                   </button>
//                   <button className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all">
//                     <Repeat className="h-5 w-5" />
//                   </button>
//                 </div>

//                 {/* Volume & Extras */}
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <button onClick={toggleMute} className="text-white/60 hover:text-white">
//                       <Volume2 className="h-5 w-5" />
//                     </button>
//                     <input
//                       type="range"
//                       min="0"
//                       max="1"
//                       step="0.01"
//                       value={volume}
//                       onChange={handleVolumeChange}
//                       className="w-24 h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-400"
//                     />
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <button onClick={() => setShowTranscript(!showTranscript)} className="text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all">
//                       <FileText className="h-5 w-5" />
//                     </button>
//                     <button onClick={toggleFullscreen} className="text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all">
//                       {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons - Premium Style */}
//             <div className="flex flex-wrap gap-3 mt-6">
//               <button
//                 onClick={handleLike}
//                 disabled={likeMutation.isPending}
//                 className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
//                   isLiked 
//                     ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-400 border border-red-500/30' 
//                     : 'bg-white/5 backdrop-blur-sm text-white/70 hover:bg-white/10 border border-white/10'
//                 }`}
//               >
//                 <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
//                 <span>{likeMutation.isPending ? '...' : 'Like'}</span>
//               </button>
//               <button
//                 onClick={handleBookmark}
//                 disabled={bookmarkMutation.isPending}
//                 className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
//                   isBookmarked 
//                     ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30' 
//                     : 'bg-white/5 backdrop-blur-sm text-white/70 hover:bg-white/10 border border-white/10'
//                 }`}
//               >
//                 <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-amber-500' : ''}`} />
//                 <span>{bookmarkMutation.isPending ? '...' : 'Save'}</span>
//               </button>
//               <button
//                 onClick={handleShare}
//                 className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium bg-white/5 backdrop-blur-sm text-white/70 hover:bg-white/10 border border-white/10 transition-all"
//               >
//                 <Share2 className="h-5 w-5" />
//                 <span>Share</span>
//               </button>
//             </div>
//           </motion.div>
//         </div>

//         {/* Tabs - Premium Design */}
//         <div className="mt-12">
//           <div className="flex gap-1 border-b border-white/10 mb-8">
//             {[
//               { id: 'related', label: 'Related Audio', icon: ListMusic },
//               { id: 'categories', label: 'Categories', icon: Music },
//               { id: 'playlists', label: 'Playlists', icon: ListMusic }
//             ].map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`px-6 py-3 text-sm font-medium transition-all rounded-t-xl ${
//                   activeTab === tab.id
//                     ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border-b-2 border-amber-500'
//                     : 'text-white/50 hover:text-white/80'
//                 }`}
//               >
//                 <tab.icon className="h-4 w-4 inline mr-2" />
//                 {tab.label}
//               </button>
//             ))}
//           </div>

//           {/* Related Audio Tab */}
//           {activeTab === 'related' && (
//             <div>
//               {relatedAudio.filter(item => item._id !== audio._id).length === 0 ? (
//                 <div className="text-center py-12 bg-white/5 backdrop-blur-sm rounded-xl">
//                   <Headphones className="h-12 w-12 mx-auto mb-3 text-white/20" />
//                   <p className="text-white/40">No related audio found</p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//                   {relatedAudio.filter(item => item._id !== audio._id).slice(0, 6).map((related, idx) => (
//                     <motion.div
//                       key={related._id}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: idx * 0.1 }}
//                       className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/10 transition-all cursor-pointer border border-white/5 hover:border-amber-500/30"
//                       onClick={() => window.location.href = `/audio/${related.slug}`}
//                     >
//                       <div className="relative aspect-square">
//                         {related.thumbnail || related.coverImage ? (
//                           <img src={related.thumbnail || related.coverImage} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
//                         ) : (
//                           <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
//                             <Headphones className="h-10 w-10 text-white/30" />
//                           </div>
//                         )}
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             playAudio(related, relatedAudio, relatedAudio.findIndex(r => r._id === related._id));
//                           }}
//                           className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
//                         >
//                           <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
//                             <Play className="h-6 w-6 text-white ml-0.5" />
//                           </div>
//                         </button>
//                         {related.duration && (
//                           <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 rounded-md text-white text-xs">
//                             {formatTime(related.duration)}
//                           </div>
//                         )}
//                       </div>
//                       <div className="p-4">
//                         <h4 className="font-medium text-white text-sm line-clamp-1">{related.title}</h4>
//                         <p className="text-xs text-white/40 mt-1">
//                           {typeof related.author === 'object' ? related.author?.name : related.author || 'Unknown'}
//                         </p>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Categories Tab - Scrollable Premium Design */}
//           {activeTab === 'categories' && (
//             <div className="relative">
//               {categories.length > 4 && (
//                 <button onClick={() => scrollCategories('left')} className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all border border-white/10">
//                   <ChevronLeftIcon className="h-4 w-4 text-white" />
//                 </button>
//               )}
//               <div ref={categoryScrollRef} className="flex gap-5 overflow-x-auto scrollbar-hide px-6 pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
//                 {loadingCategories ? (
//                   <div className="flex justify-center py-8 w-full"><Loader2 className="h-8 w-8 animate-spin text-amber-400" /></div>
//                 ) : (
//                   categories.map((category) => (
//                     <Link key={category.id} to={`/audio/type/${category.id}`} className="flex-shrink-0 w-28 text-center group">
//                       <div className="relative">
//                         <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                         <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/10 group-hover:border-amber-500/30">
//                           <span className="text-3xl">{category.icon}</span>
//                         </div>
//                       </div>
//                       <p className="mt-2 text-sm font-medium text-white/70 capitalize group-hover:text-amber-400 transition-colors">{category.name}</p>
//                       <p className="text-xs text-white/30">{category.count} items</p>
//                     </Link>
//                   ))
//                 )}
//               </div>
//               {categories.length > 4 && (
//                 <button onClick={() => scrollCategories('right')} className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all border border-white/10">
//                   <ChevronRight className="h-4 w-4 text-white" />
//                 </button>
//               )}
//             </div>
//           )}

//           {/* Playlists Tab - Scrollable Premium Design */}
//           {activeTab === 'playlists' && (
//             <div className="relative">
//               {playlists.length > 4 && (
//                 <button onClick={() => scrollPlaylists('left')} className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all border border-white/10">
//                   <ChevronLeftIcon className="h-4 w-4 text-white" />
//                 </button>
//               )}
//               <div ref={playlistScrollRef} className="flex gap-5 overflow-x-auto scrollbar-hide px-6 pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
//                 {loadingPlaylists ? (
//                   <div className="flex justify-center py-8 w-full"><Loader2 className="h-8 w-8 animate-spin text-amber-400" /></div>
//                 ) : playlists.length === 0 ? (
//                   <div className="text-center py-8 text-white/40 w-full flex flex-col items-center">
//                     <ListMusic className="h-12 w-12 mb-3 text-white/20" />
//                     <p>No playlists available</p>
//                   </div>
//                 ) : (
//                   playlists.map((playlist) => (
//                     <div key={playlist._id} className="flex-shrink-0 w-44 bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/10 transition-all cursor-pointer group border border-white/5 hover:border-amber-500/30"
//                       onClick={() => {
//                         if (playlist.audios?.length > 0) {
//                           playAudio(playlist.audios[0], playlist.audios, 0);
//                           toast.success(`Playing playlist: ${playlist.name}`);
//                         } else toast.error('Empty playlist');
//                       }}>
//                       <div className="relative aspect-square bg-gradient-to-br from-amber-500/20 to-purple-500/20">
//                         {playlist.coverImage ? (
//                           <img src={playlist.coverImage} alt={playlist.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
//                         ) : (
//                           <div className="w-full h-full flex items-center justify-center"><Album className="h-12 w-12 text-white/30" /></div>
//                         )}
//                         <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                           <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
//                             <Play className="h-5 w-5 text-white ml-0.5" />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="p-3">
//                         <h4 className="font-medium text-white text-sm line-clamp-1">{playlist.name}</h4>
//                         <p className="text-xs text-white/40 mt-1">{playlist.audios?.length || 0} tracks</p>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//               {playlists.length > 4 && (
//                 <button onClick={() => scrollPlaylists('right')} className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all border border-white/10">
//                   <ChevronRight className="h-4 w-4 text-white" />
//                 </button>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Transcript Section - Premium Design */}
//         <AnimatePresence>
//           {showTranscript && audio.transcript && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 20 }}
//               className="mt-8 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
//             >
//               <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
//                 <FileText className="h-5 w-5 text-amber-400" />
//                 Transcript
//               </h3>
//               <div className="prose prose-sm max-w-none text-white/60">
//                 <p className="whitespace-pre-line">{audio.transcript}</p>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default AudioDetailPage;























// // client/src/pages/public/AudioDetailPage.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { useSelector } from 'react-redux';
// import toast from 'react-hot-toast';
// import {
//   Headphones, Play, Pause, Heart, Share2, Bookmark, Download,
//   ChevronLeft, Clock, Eye, Calendar, User, Loader2, AlertCircle,
//   Mic, Music, FileText, Volume2, SkipBack, SkipForward,
//   Repeat, Shuffle, ListMusic, Maximize2, Minimize2, X,
//   ChevronRight, ChevronLeft as ChevronLeftIcon, Crown, Star, Sparkles,
//   Award, Gem, Shield, Zap, TrendingUp, Radio, Disc, Album, Users, Check
// } from 'lucide-react';
// import audioAPI from '../../api/audioAPI';
// import authorAPI from '../../api/authorAPI';
// import { useAudioPlayer } from '../../context/AudioPlayerContext';

// const AudioDetailPage = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const { t } = useTranslation();
//   const queryClient = useQueryClient();
//   const { user } = useSelector(state => state.auth);
  
//   const { playAudio } = useAudioPlayer();
  
//   const audioRef = useRef(null);
//   const categoryScrollRef = useRef(null);
//   const playlistScrollRef = useRef(null);
//   const playerContainerRef = useRef(null);
  
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [volume, setVolume] = useState(1);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isLiked, setIsLiked] = useState(false);
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [showTranscript, setShowTranscript] = useState(false);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [activeTab, setActiveTab] = useState('related');
//   const [categories, setCategories] = useState([]);
//   const [playlists, setPlaylists] = useState([]);
//   const [loadingCategories, setLoadingCategories] = useState(false);
//   const [loadingPlaylists, setLoadingPlaylists] = useState(false);
//   const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);

//   // Premium Plans
//   const premiumPlans = [
//     {
//       id: 'basic',
//       name: 'Basic',
//       price: 99,
//       period: 'month',
//       icon: Headphones,
//       features: ['HD Audio Quality', 'Ad-free Experience', 'Basic Support', 'Save to Favorites'],
//       color: 'from-blue-500 to-cyan-500'
//     },
//     {
//       id: 'premium',
//       name: 'Premium',
//       price: 199,
//       period: 'month',
//       icon: Crown,
//       features: ['Ultra HD Audio', 'Ad-free Experience', 'Unlimited Downloads', 'Priority Support', 'Offline Mode', 'Voice Commands', 'Early Access'],
//       recommended: true,
//       color: 'from-amber-500 to-orange-500'
//     },
//     {
//       id: 'family',
//       name: 'Family',
//       price: 399,
//       period: 'month',
//       icon: Users,
//       features: ['Everything in Premium', 'Up to 5 Members', 'Family Playlists', 'Parental Controls', 'Separate History', 'Dedicated Support'],
//       color: 'from-purple-500 to-pink-500'
//     }
//   ];

//   const scrollCategories = (direction) => {
//     if (categoryScrollRef.current) {
//       const scrollAmount = 300;
//       const newScroll = direction === 'left' 
//         ? categoryScrollRef.current.scrollLeft - scrollAmount 
//         : categoryScrollRef.current.scrollLeft + scrollAmount;
//       categoryScrollRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });
//     }
//   };

//   const scrollPlaylists = (direction) => {
//     if (playlistScrollRef.current) {
//       const scrollAmount = 300;
//       const newScroll = direction === 'left' 
//         ? playlistScrollRef.current.scrollLeft - scrollAmount 
//         : playlistScrollRef.current.scrollLeft + scrollAmount;
//       playlistScrollRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });
//     }
//   };

//   const { data: audioData, isLoading, error } = useQuery({
//     queryKey: ['audio', slug],
//     queryFn: () => audioAPI.getAudio(slug),
//     enabled: !!slug,
//     retry: 1
//   });

//   const audio = audioData?.data || audioData;

//   const { data: relatedData } = useQuery({
//     queryKey: ['related-audio', audio?._id],
//     queryFn: () => audioAPI.getAudioItems({ limit: 10, type: audio?.type }),
//     enabled: !!audio?._id
//   });

//   useEffect(() => {
//     const fetchCategories = async () => {
//       setLoadingCategories(true);
//       try {
//         const response = await audioAPI.getAudioItems({ limit: 50 });
//         const allAudio = response?.data?.data || response?.data || response || [];
//         const uniqueCategories = [...new Map(
//           allAudio.filter(item => item.type)
//             .map(item => [item.type, { 
//               id: item.type, 
//               name: item.type?.replace('_', ' '),
//               count: allAudio.filter(a => a.type === item.type).length,
//               icon: getCategoryIcon(item.type)
//             }])
//         ).values()];
//         setCategories(uniqueCategories.slice(0, 15));
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       } finally {
//         setLoadingCategories(false);
//       }
//     };
    
//     const fetchPlaylists = async () => {
//       setLoadingPlaylists(true);
//       try {
//         const response = await audioAPI.getAllPlaylists?.({ limit: 10 }) || { data: [] };
//         const playlistsData = response?.data?.data || response?.data || response || [];
//         setPlaylists(playlistsData.slice(0, 10));
//       } catch (error) {
//         console.error('Error fetching playlists:', error);
//         setPlaylists([]);
//       } finally {
//         setLoadingPlaylists(false);
//       }
//     };
    
//     fetchCategories();
//     fetchPlaylists();
//   }, []);

//   const relatedAudio = relatedData?.data?.data || relatedData?.data || relatedData || [];

//   const getCategoryIcon = (type) => {
//     const icons = {
//       nauha: '😢', marsiya: '💔', soz: '🔥', salam: '🕊️', majlis: '🎙️',
//       naat: '⭐', hamd: '🕌', manqabat: '⚔️', ghazal: '💕', nazm: '📝',
//       podcast: '🎙️', audiobook: '📚', lecture: '🎓'
//     };
//     return icons[type] || '🎵';
//   };

//   const likeMutation = useMutation({
//     mutationFn: () => audioAPI.likeAudio(audio?._id),
//     onSuccess: () => {
//       setIsLiked(!isLiked);
//       queryClient.invalidateQueries(['audio', slug]);
//       toast.success(isLiked ? 'Removed from likes' : 'Added to likes');
//     },
//     onError: () => toast.error('Failed to update like status')
//   });

//   const bookmarkMutation = useMutation({
//     mutationFn: () => audioAPI.bookmarkAudio(audio?._id),
//     onSuccess: () => {
//       setIsBookmarked(!isBookmarked);
//       queryClient.invalidateQueries(['audio', slug]);
//       toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
//     },
//     onError: () => toast.error('Failed to update bookmark status')
//   });

//   const togglePlay = () => {
//     if (audioRef.current) {
//       if (isPlaying) audioRef.current.pause();
//       else audioRef.current.play();
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const handleTimeUpdate = () => {
//     if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
//   };

//   const handleLoadedMetadata = () => {
//     if (audioRef.current) setDuration(audioRef.current.duration);
//   };

//   const handleSeek = (e) => {
//     const seekTime = parseFloat(e.target.value);
//     setCurrentTime(seekTime);
//     if (audioRef.current) audioRef.current.currentTime = seekTime;
//   };

//   const handleVolumeChange = (e) => {
//     const newVolume = parseFloat(e.target.value);
//     setVolume(newVolume);
//     if (audioRef.current) audioRef.current.volume = newVolume;
//     setIsMuted(newVolume === 0);
//   };

//   const toggleMute = () => {
//     if (audioRef.current) {
//       audioRef.current.muted = !isMuted;
//       setIsMuted(!isMuted);
//     }
//   };

//   const formatTime = (time) => {
//     if (isNaN(time)) return '0:00';
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds.toString().padStart(2, '0')}`;
//   };

//   const toggleFullscreen = () => {
//     if (!isFullscreen) {
//       if (playerContainerRef.current?.requestFullscreen) {
//         playerContainerRef.current.requestFullscreen();
//       }
//     } else {
//       if (document.exitFullscreen) document.exitFullscreen();
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

//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (e.code === 'Space') {
//         e.preventDefault();
//         togglePlay();
//       } else if (e.code === 'ArrowLeft') {
//         if (audioRef.current) {
//           audioRef.current.currentTime = Math.max(0, currentTime - 10);
//         }
//       } else if (e.code === 'ArrowRight') {
//         if (audioRef.current) {
//           audioRef.current.currentTime = Math.min(duration, currentTime + 10);
//         }
//       }
//     };
//     window.addEventListener('keydown', handleKeyPress);
//     return () => window.removeEventListener('keydown', handleKeyPress);
//   }, [currentTime, duration]);

//   const handleLike = () => {
//     if (!user) {
//       toast.error('Please login to like audio');
//       navigate('/login');
//       return;
//     }
//     likeMutation.mutate();
//   };

//   const handleBookmark = () => {
//     if (!user) {
//       toast.error('Please login to bookmark audio');
//       navigate('/login');
//       return;
//     }
//     bookmarkMutation.mutate();
//   };

//   const handleShare = async () => {
//     const url = window.location.href;
//     try {
//       await navigator.clipboard.writeText(url);
//       toast.success('Link copied to clipboard!');
//     } catch (err) {
//       toast.error('Failed to copy link');
//     }
//   };

//   const getAuthorName = () => {
//     if (!audio?.author) return 'Unknown Artist';
//     if (typeof audio.author === 'object') return audio.author.name || 'Unknown Artist';
//     return audio.author || 'Unknown Artist';
//   };

//   const getAuthorSlug = () => {
//     if (!audio?.author) return '#';
//     if (typeof audio.author === 'object') return audio.author.slug || '#';
//     return '#';
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
//         <div className="text-center">
//           <div className="relative">
//             <div className="w-20 h-20 rounded-full border-4 border-amber-500/30 border-t-amber-500 animate-spin mx-auto mb-4"></div>
//             <Sparkles className="h-8 w-8 text-amber-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
//           </div>
//           <p className="text-white/70">Loading audio...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !audio) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//         <div className="max-w-4xl mx-auto px-4 pt-32 pb-16 text-center">
//           <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
//             <AlertCircle className="h-10 w-10 text-red-400" />
//           </div>
//           <h1 className="text-2xl font-bold text-white mb-2">Audio Not Found</h1>
//           <p className="text-white/50 mb-6">The audio you are looking for does not exist or has been removed.</p>
//           <Link to="/audio" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
//             <ChevronLeft className="h-4 w-4" />
//             <span>Browse All Audio</span>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//       {/* Premium Modal */}
//       <AnimatePresence>
//         {isPremiumModalOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
//             onClick={() => setIsPremiumModalOpen(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="relative max-w-4xl w-full bg-gradient-to-br from-gray-900 to-purple-900 rounded-2xl overflow-hidden"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="absolute top-0 right-0 p-4">
//                 <button onClick={() => setIsPremiumModalOpen(false)} className="text-white/50 hover:text-white">
//                   <X className="h-6 w-6" />
//                 </button>
//               </div>
//               <div className="p-8">
//                 <div className="text-center mb-8">
//                   <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 mb-4">
//                     <Crown className="h-4 w-4 text-amber-400" />
//                     <span className="text-amber-400 text-sm">Premium Access Required</span>
//                   </div>
//                   <h2 className="text-3xl font-bold text-white mb-2">Unlock Premium Audio</h2>
//                   <p className="text-white/50">Get unlimited access to all premium content</p>
//                 </div>
//                 <div className="grid md:grid-cols-3 gap-4">
//                   {premiumPlans.map((plan) => (
//                     <div key={plan.id} className={`relative bg-white/5 backdrop-blur-sm rounded-xl p-4 border ${plan.recommended ? 'border-amber-500/50 shadow-lg shadow-amber-500/20' : 'border-white/10'}`}>
//                       {plan.recommended && (
//                         <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-xs font-semibold text-white">
//                           RECOMMENDED
//                         </div>
//                       )}
//                       <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-3`}>
//                         <plan.icon className="h-6 w-6 text-white" />
//                       </div>
//                       <h3 className="text-xl font-bold text-white">{plan.name}</h3>
//                       <div className="mt-2">
//                         <span className="text-2xl font-bold text-white">₹{plan.price}</span>
//                         <span className="text-white/50">/{plan.period}</span>
//                       </div>
//                       <ul className="mt-4 space-y-2">
//                         {plan.features.slice(0, 4).map((feature, idx) => (
//                           <li key={idx} className="flex items-center gap-2 text-sm text-white/60">
//                             <Check className="h-3 w-3 text-green-400" />
//                             <span>{feature}</span>
//                           </li>
//                         ))}
//                       </ul>
//                       <button className="w-full mt-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
//                         Subscribe Now
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Floating Particles Background */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         {[...Array(30)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-1 h-1 bg-white/10 rounded-full"
//             animate={{ 
//               y: [0, -100, -200],
//               x: [0, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
//               opacity: [0, 0.5, 0]
//             }}
//             transition={{ duration: 8 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }}
//             style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
//           />
//         ))}
//       </div>

//       <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
//         {/* Breadcrumb */}
//         <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
//           <Link to="/audio" className="inline-flex items-center gap-2 text-white/50 hover:text-amber-400 transition-colors">
//             <ChevronLeft className="h-4 w-4" />
//             <span>Back to Audio</span>
//           </Link>
//         </motion.div>

//         {/* Premium Banner */}
//         {audio.isPremium && (!user?.subscription?.plan || user?.subscription?.plan === 'free') && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mb-6 p-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl border border-amber-500/30 flex items-center justify-between flex-wrap gap-4"
//           >
//             <div className="flex items-center gap-3">
//               <Crown className="h-8 w-8 text-amber-400" />
//               <div>
//                 <h3 className="text-white font-semibold">Premium Content</h3>
//                 <p className="text-white/50 text-sm">Subscribe to unlock this audio and many more</p>
//               </div>
//             </div>
//             <button
//               onClick={() => setIsPremiumModalOpen(true)}
//               className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
//             >
//               Upgrade Now
//             </button>
//           </motion.div>
//         )}

//         {/* Main Content Grid */}
//         <div className="grid lg:grid-cols-3 gap-8 mb-12">
//           {/* Album Art */}
//           <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
//             <div className="relative group">
//               <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/30 to-purple-500/30 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//               <div className="relative rounded-2xl overflow-hidden shadow-2xl">
//                 {audio.thumbnail || audio.coverImage ? (
//                   <img src={audio.thumbnail || audio.coverImage} alt={audio.title} className="w-full aspect-square object-cover" />
//                 ) : (
//                   <div className="w-full aspect-square bg-gradient-to-br from-amber-500/30 to-purple-500/30 flex items-center justify-center">
//                     <Disc className="h-24 w-24 text-white/50 animate-spin-slow" />
//                   </div>
//                 )}
//                 {audio.isPremium && (
//                   <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-xs font-semibold text-white flex items-center gap-1">
//                     <Crown className="h-3 w-3" />
//                     Premium
//                   </div>
//                 )}
//               </div>
//             </div>
//           </motion.div>

//           {/* Audio Info & Player */}
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
//             {/* Tags */}
//             <div className="flex flex-wrap items-center gap-2 mb-4">
//               <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm text-purple-300 text-xs font-semibold rounded-full capitalize border border-purple-500/30">
//                 {audio.type?.replace('_', ' ')}
//               </span>
//               <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white/60 text-xs rounded-full">
//                 {audio.language === 'urdu' ? 'Urdu' : audio.language === 'hindi' ? 'Hindi' : audio.language || 'English'}
//               </span>
//               {audio.isFeatured && (
//                 <span className="px-3 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 text-xs rounded-full flex items-center gap-1">
//                   <Star className="h-3 w-3" />
//                   Featured
//                 </span>
//               )}
//             </div>

//             <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{audio.title}</h1>
//             {audio.description && (
//               <p className="text-white/50 mb-4 leading-relaxed">{audio.description}</p>
//             )}

//             <div className="flex items-center flex-wrap gap-4 mb-6">
//               <Link to={`/author/${getAuthorSlug()}`} className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors">
//                 <User className="h-4 w-4" />
//                 <span>{getAuthorName()}</span>
//               </Link>
//               <span className="flex items-center gap-2 text-white/40">
//                 <Calendar className="h-4 w-4" />
//                 <span>{new Date(audio.createdAt).toLocaleDateString()}</span>
//               </span>
//               <span className="flex items-center gap-2 text-white/40">
//                 <Headphones className="h-4 w-4" />
//                 <span>{audio.stats?.plays?.toLocaleString() || 0} plays</span>
//               </span>
//             </div>

//             {/* Audio Player */}
//             <div ref={playerContainerRef} className="relative bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl">
//               <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl"></div>
//               <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
              
//               <audio ref={audioRef} src={audio.audioUrl} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onEnded={() => setIsPlaying(false)} />
              
//               <div className="relative z-10 space-y-5">
//                 <div className="text-center">
//                   <h3 className="text-white font-medium text-lg">{audio.title}</h3>
//                   <p className="text-white/40 text-sm">{getAuthorName()}</p>
//                 </div>

//                 {/* Progress Bar */}
//                 <div className="space-y-2">
//                   <input
//                     type="range"
//                     min="0"
//                     max={duration || 0}
//                     value={currentTime}
//                     onChange={handleSeek}
//                     className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-400"
//                     style={{
//                       background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${(currentTime / duration) * 100}%, rgba(255,255,255,0.1) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.1) 100%)`
//                     }}
//                   />
//                   <div className="flex justify-between text-white/40 text-xs">
//                     <span>{formatTime(currentTime)}</span>
//                     <span>{formatTime(duration)}</span>
//                   </div>
//                 </div>

//                 {/* Controls */}
//                 <div className="flex items-center justify-center gap-5">
//                   <button className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all">
//                     <Shuffle className="h-5 w-5" />
//                   </button>
//                   <button className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all">
//                     <SkipBack className="h-5 w-5" />
//                   </button>
//                   <button
//                     onClick={togglePlay}
//                     className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center justify-center hover:scale-105 hover:shadow-lg transition-all duration-300"
//                   >
//                     {isPlaying ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7 ml-1" />}
//                   </button>
//                   <button className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all">
//                     <SkipForward className="h-5 w-5" />
//                   </button>
//                   <button className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all">
//                     <Repeat className="h-5 w-5" />
//                   </button>
//                 </div>

//                 {/* Volume & Extras */}
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <button onClick={toggleMute} className="text-white/60 hover:text-white">
//                       <Volume2 className="h-5 w-5" />
//                     </button>
//                     <input
//                       type="range"
//                       min="0"
//                       max="1"
//                       step="0.01"
//                       value={volume}
//                       onChange={handleVolumeChange}
//                       className="w-24 h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-400"
//                     />
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <button onClick={() => setShowTranscript(!showTranscript)} className="text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all">
//                       <FileText className="h-5 w-5" />
//                     </button>
//                     <button onClick={toggleFullscreen} className="text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all">
//                       {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-wrap gap-3 mt-6">
//               <button
//                 onClick={handleLike}
//                 disabled={likeMutation.isPending}
//                 className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
//                   isLiked 
//                     ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-400 border border-red-500/30' 
//                     : 'bg-white/5 backdrop-blur-sm text-white/70 hover:bg-white/10 border border-white/10'
//                 }`}
//               >
//                 <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
//                 <span>{likeMutation.isPending ? '...' : 'Like'}</span>
//               </button>
//               <button
//                 onClick={handleBookmark}
//                 disabled={bookmarkMutation.isPending}
//                 className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
//                   isBookmarked 
//                     ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30' 
//                     : 'bg-white/5 backdrop-blur-sm text-white/70 hover:bg-white/10 border border-white/10'
//                 }`}
//               >
//                 <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-amber-500' : ''}`} />
//                 <span>{bookmarkMutation.isPending ? '...' : 'Save'}</span>
//               </button>
//               <button
//                 onClick={handleShare}
//                 className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium bg-white/5 backdrop-blur-sm text-white/70 hover:bg-white/10 border border-white/10 transition-all"
//               >
//                 <Share2 className="h-5 w-5" />
//                 <span>Share</span>
//               </button>
//             </div>
//           </motion.div>
//         </div>

//         {/* Tabs */}
//         <div className="mt-12">
//           <div className="flex gap-1 border-b border-white/10 mb-8">
//             {[
//               { id: 'related', label: 'Related Audio', icon: ListMusic },
//               { id: 'categories', label: 'Categories', icon: Music },
//               { id: 'playlists', label: 'Playlists', icon: ListMusic }
//             ].map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`px-6 py-3 text-sm font-medium transition-all rounded-t-xl ${
//                   activeTab === tab.id
//                     ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border-b-2 border-amber-500'
//                     : 'text-white/50 hover:text-white/80'
//                 }`}
//               >
//                 <tab.icon className="h-4 w-4 inline mr-2" />
//                 {tab.label}
//               </button>
//             ))}
//           </div>

//           {/* Related Audio Tab */}
//           {activeTab === 'related' && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//               {relatedAudio.filter(item => item._id !== audio._id).slice(0, 6).map((related, idx) => (
//                 <motion.div
//                   key={related._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: idx * 0.1 }}
//                   className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/10 transition-all cursor-pointer border border-white/5 hover:border-amber-500/30"
//                   onClick={() => window.location.href = `/audio/${related.slug}`}
//                 >
//                   <div className="relative aspect-square">
//                     <img src={related.thumbnail || related.coverImage || 'https://via.placeholder.com/300x300?text=🎵'} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         playAudio(related, relatedAudio, relatedAudio.findIndex(r => r._id === related._id));
//                       }}
//                       className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
//                     >
//                       <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
//                         <Play className="h-6 w-6 text-white ml-0.5" />
//                       </div>
//                     </button>
//                     {related.duration && (
//                       <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 rounded-md text-white text-xs">
//                         {formatTime(related.duration)}
//                       </div>
//                     )}
//                   </div>
//                   <div className="p-4">
//                     <h4 className="font-medium text-white text-sm line-clamp-1">{related.title}</h4>
//                     <p className="text-xs text-white/40 mt-1">
//                       {typeof related.author === 'object' ? related.author?.name : related.author || 'Unknown'}
//                     </p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           )}

//           {/* Categories Tab */}
//           {activeTab === 'categories' && (
//             <div className="relative">
//               {categories.length > 4 && (
//                 <button onClick={() => scrollCategories('left')} className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all border border-white/10">
//                   <ChevronLeftIcon className="h-4 w-4 text-white" />
//                 </button>
//               )}
//               <div ref={categoryScrollRef} className="flex gap-5 overflow-x-auto scrollbar-hide px-6 pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
//                 {categories.map((category) => (
//                   <Link key={category.id} to={`/audio/type/${category.id}`} className="flex-shrink-0 w-28 text-center group">
//                     <div className="relative">
//                       <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                       <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/10 group-hover:border-amber-500/30">
//                         <span className="text-3xl">{category.icon}</span>
//                       </div>
//                     </div>
//                     <p className="mt-2 text-sm font-medium text-white/70 capitalize group-hover:text-amber-400 transition-colors">{category.name}</p>
//                     <p className="text-xs text-white/30">{category.count} items</p>
//                   </Link>
//                 ))}
//               </div>
//               {categories.length > 4 && (
//                 <button onClick={() => scrollCategories('right')} className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all border border-white/10">
//                   <ChevronRight className="h-4 w-4 text-white" />
//                 </button>
//               )}
//             </div>
//           )}

//           {/* Playlists Tab */}
//           {activeTab === 'playlists' && (
//             <div className="relative">
//               {playlists.length > 4 && (
//                 <button onClick={() => scrollPlaylists('left')} className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all border border-white/10">
//                   <ChevronLeftIcon className="h-4 w-4 text-white" />
//                 </button>
//               )}
//               <div ref={playlistScrollRef} className="flex gap-5 overflow-x-auto scrollbar-hide px-6 pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
//                 {playlists.map((playlist) => (
//                   <div key={playlist._id} className="flex-shrink-0 w-44 bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/10 transition-all cursor-pointer group border border-white/5 hover:border-amber-500/30"
//                     onClick={() => {
//                       if (playlist.audios?.length > 0) {
//                         playAudio(playlist.audios[0], playlist.audios, 0);
//                         toast.success(`Playing playlist: ${playlist.name}`);
//                       } else toast.error('Empty playlist');
//                     }}>
//                     <div className="relative aspect-square bg-gradient-to-br from-amber-500/20 to-purple-500/20">
//                       {playlist.coverImage ? (
//                         <img src={playlist.coverImage} alt={playlist.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center"><Album className="h-12 w-12 text-white/30" /></div>
//                       )}
//                       <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                         <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
//                           <Play className="h-5 w-5 text-white ml-0.5" />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="p-3">
//                       <h4 className="font-medium text-white text-sm line-clamp-1">{playlist.name}</h4>
//                       <p className="text-xs text-white/40 mt-1">{playlist.audios?.length || 0} tracks</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               {playlists.length > 4 && (
//                 <button onClick={() => scrollPlaylists('right')} className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all border border-white/10">
//                   <ChevronRight className="h-4 w-4 text-white" />
//                 </button>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Transcript Section */}
//         <AnimatePresence>
//           {showTranscript && audio.transcript && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 20 }}
//               className="mt-8 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
//             >
//               <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
//                 <FileText className="h-5 w-5 text-amber-400" />
//                 Transcript
//               </h3>
//               <div className="prose prose-sm max-w-none text-white/60">
//                 <p className="whitespace-pre-line">{audio.transcript}</p>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default AudioDetailPage;

























// client/src/pages/public/AudioDetailPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
  Headphones, Play, Pause, Heart, Share2, Bookmark, Download,
  ChevronLeft, Clock, Eye, Calendar, User, Loader2, AlertCircle,
  Mic, Music, FileText, Volume2, SkipBack, SkipForward,
  Repeat, Shuffle, ListMusic, Maximize2, Minimize2, X,
  ChevronRight, ChevronLeft as ChevronLeftIcon, Crown, Star, Sparkles,
  Award, Gem, Shield, Zap, TrendingUp, Radio, Disc, Album, Users, Check,
  Activity, Speaker, VolumeX
} from 'lucide-react';
import audioAPI from '../../api/audioAPI';
import { useAudioPlayer } from '../../context/AudioPlayerContext';

const AudioDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { user } = useSelector(state => state.auth);
  
  const { playAudio } = useAudioPlayer();
  
  const audioRef = useRef(null);
  const categoryScrollRef = useRef(null);
  const playlistScrollRef = useRef(null);
  const playerContainerRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState('related');
  const [categories, setCategories] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingPlaylists, setLoadingPlaylists] = useState(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [isLikedAnimate, setIsLikedAnimate] = useState(false);
  const [isBookmarkedAnimate, setIsBookmarkedAnimate] = useState(false);

  // Premium Plans
  const premiumPlans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 99,
      originalPrice: 199,
      period: 'month',
      icon: Headphones,
      features: ['HD Audio Quality', 'Ad-free Experience', 'Basic Support', 'Save to Favorites', '10 Downloads/month'],
      color: 'from-blue-500 to-cyan-500',
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 199,
      originalPrice: 499,
      period: 'month',
      icon: Crown,
      features: ['Ultra HD Audio', 'Ad-free Experience', 'Unlimited Downloads', 'Priority Support', 'Offline Mode', 'Voice Commands', 'Early Access', 'Cross-device Sync'],
      recommended: true,
      color: 'from-primary-500 to-secondary-500',
      popular: true
    },
    {
      id: 'family',
      name: 'Family',
      price: 399,
      originalPrice: 999,
      period: 'month',
      icon: Users,
      features: ['Everything in Premium', 'Up to 5 Members', 'Family Playlists', 'Parental Controls', 'Separate History', 'Dedicated Support', 'Kids Mode'],
      color: 'from-purple-500 to-pink-500',
      popular: false
    }
  ];

  // Scroll functions
  const scrollCategories = (direction) => {
    if (categoryScrollRef.current) {
      const scrollAmount = 300;
      const currentScroll = categoryScrollRef.current.scrollLeft;
      const newScroll = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;
      categoryScrollRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });
    }
  };

  const scrollPlaylists = (direction) => {
    if (playlistScrollRef.current) {
      const scrollAmount = 300;
      const currentScroll = playlistScrollRef.current.scrollLeft;
      const newScroll = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;
      playlistScrollRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });
    }
  };

  // Fetch audio data
  const { data: audioData, isLoading, error } = useQuery({
    queryKey: ['audio', slug],
    queryFn: () => audioAPI.getAudio(slug),
    enabled: !!slug,
    retry: 1
  });

  const audio = audioData?.data || audioData;

  // Fetch related audio
  const { data: relatedData } = useQuery({
    queryKey: ['related-audio', audio?._id],
    queryFn: () => audioAPI.getAudioItems({ limit: 10, type: audio?.type }),
    enabled: !!audio?._id
  });

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await audioAPI.getAudioItems({ limit: 50 });
        const allAudio = response?.data?.data || response?.data || response || [];
        const uniqueCategories = [...new Map(
          allAudio.filter(item => item.type)
            .map(item => [item.type, { 
              id: item.type, 
              name: item.type?.replace('_', ' '),
              count: allAudio.filter(a => a.type === item.type).length,
              icon: getCategoryIcon(item.type)
            }])
        ).values()];
        setCategories(uniqueCategories.slice(0, 15));
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };
    
    const fetchPlaylists = async () => {
      setLoadingPlaylists(true);
      try {
        const response = await audioAPI.getAllPlaylists?.({ limit: 10 }) || { data: [] };
        const playlistsData = response?.data?.data || response?.data || response || [];
        setPlaylists(playlistsData.slice(0, 10));
      } catch (error) {
        console.error('Error fetching playlists:', error);
        setPlaylists([]);
      } finally {
        setLoadingPlaylists(false);
      }
    };
    
    fetchCategories();
    fetchPlaylists();
  }, []);

  const relatedAudio = relatedData?.data?.data || relatedData?.data || relatedData || [];

  const getCategoryIcon = (type) => {
    const icons = {
      nauha: '😢', marsiya: '💔', soz: '🔥', salam: '🕊️', majlis: '🎙️',
      naat: '⭐', hamd: '🕌', manqabat: '⚔️', ghazal: '💕', nazm: '📝',
      podcast: '🎙️', audiobook: '📚', lecture: '🎓'
    };
    return icons[type] || '🎵';
  };

  // Like mutation
  const likeMutation = useMutation({
    mutationFn: () => audioAPI.likeAudio(audio?._id),
    onSuccess: () => {
      setIsLiked(!isLiked);
      setIsLikedAnimate(true);
      setTimeout(() => setIsLikedAnimate(false), 500);
      queryClient.invalidateQueries(['audio', slug]);
      toast.success(isLiked ? 'Removed from likes' : 'Added to likes');
    },
    onError: () => toast.error('Failed to update like status')
  });

  // Bookmark mutation
  const bookmarkMutation = useMutation({
    mutationFn: () => audioAPI.bookmarkAudio(audio?._id),
    onSuccess: () => {
      setIsBookmarked(!isBookmarked);
      setIsBookmarkedAnimate(true);
      setTimeout(() => setIsBookmarkedAnimate(false), 500);
      queryClient.invalidateQueries(['audio', slug]);
      toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
    },
    onError: () => toast.error('Failed to update bookmark status')
  });

  // Audio player controls
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (audioRef.current) audioRef.current.currentTime = seekTime;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (playerContainerRef.current?.requestFullscreen) {
        playerContainerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
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

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowLeft') {
        if (audioRef.current) {
          audioRef.current.currentTime = Math.max(0, currentTime - 10);
        }
      } else if (e.code === 'ArrowRight') {
        if (audioRef.current) {
          audioRef.current.currentTime = Math.min(duration, currentTime + 10);
        }
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentTime, duration]);

  const handleLike = () => {
    if (!user) {
      toast.error('Please login to like audio');
      navigate('/login');
      return;
    }
    likeMutation.mutate();
  };

  const handleBookmark = () => {
    if (!user) {
      toast.error('Please login to bookmark audio');
      navigate('/login');
      return;
    }
    bookmarkMutation.mutate();
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const getAuthorName = () => {
    if (!audio?.author) return 'Unknown Artist';
    if (typeof audio.author === 'object') return audio.author.name || 'Unknown Artist';
    return audio.author || 'Unknown Artist';
  };

  const getAuthorSlug = () => {
    if (!audio?.author) return '#';
    if (typeof audio.author === 'object') return audio.author.slug || '#';
    return '#';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-primary-50/30 to-secondary-50/30 dark:from-gray-950 dark:via-primary-950/20 dark:to-secondary-950/20 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-primary-500/30 border-t-primary-500 animate-spin mx-auto mb-4"></div>
            <Sparkles className="h-8 w-8 text-primary-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-4">Loading audio...</p>
        </div>
      </div>
    );
  }

  if (error || !audio) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-primary-50/30 to-secondary-50/30 dark:from-gray-950 dark:via-primary-950/20 dark:to-secondary-950/20">
        <div className="max-w-4xl mx-auto px-4 pt-32 pb-16 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Audio Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The audio you are looking for does not exist or has been removed.</p>
          <Link to="/audio" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300">
            <ChevronLeft className="h-4 w-4" />
            <span>Browse All Audio</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50/30 to-secondary-50/30 dark:from-gray-950 dark:via-primary-950/20 dark:to-secondary-950/20">
      {/* Premium Modal */}
      <AnimatePresence>
        {isPremiumModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsPremiumModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full bg-gradient-to-br from-gray-900 to-purple-900 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 right-0 p-4">
                <button onClick={() => setIsPremiumModalOpen(false)} className="text-white/50 hover:text-white transition-colors">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-primary-500/30 mb-4">
                    <Crown className="h-4 w-4 text-primary-400" />
                    <span className="text-primary-400 text-sm font-medium">Premium Access Required</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">Unlock Premium Audio</h2>
                  <p className="text-white/50">Get unlimited access to all premium content</p>
                </div>
                <div className="grid md:grid-cols-3 gap-5">
                  {premiumPlans.map((plan) => (
                    <motion.div
                      key={plan.id}
                      whileHover={{ y: -4 }}
                      className={`relative bg-white/5 backdrop-blur-sm rounded-xl p-5 border ${plan.recommended ? 'border-primary-500/50 shadow-lg shadow-primary-500/20' : 'border-white/10'}`}
                    >
                      {plan.recommended && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full text-xs font-semibold text-white shadow-lg">
                          MOST POPULAR
                        </div>
                      )}
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-3`}>
                        <plan.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                      <div className="mt-2">
                        <span className="text-2xl font-bold text-white">₹{plan.price}</span>
                        <span className="text-white/50">/{plan.period}</span>
                        {plan.originalPrice && (
                          <span className="ml-2 text-sm text-white/40 line-through">₹{plan.originalPrice}</span>
                        )}
                      </div>
                      <ul className="mt-4 space-y-2">
                        {plan.features.slice(0, 5).map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-white/60">
                            <Check className="h-3.5 w-3.5 text-green-400 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button className="w-full mt-5 py-2.5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300">
                        Subscribe Now
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Breadcrumb */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
          <Link to="/audio" className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group">
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Audio</span>
          </Link>
        </motion.div>

        {/* Premium Banner */}
        {audio.isPremium && (!user?.subscription?.plan || user?.subscription?.plan === 'free') && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 backdrop-blur-sm rounded-xl border border-primary-500/30 flex items-center justify-between flex-wrap gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                <Crown className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900 dark:text-white font-semibold">Premium Content</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Subscribe to unlock this audio and many more</p>
              </div>
            </div>
            <button
              onClick={() => setIsPremiumModalOpen(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300"
            >
              Upgrade Now
            </button>
          </motion.div>
        )}

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Album Art */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                {audio.thumbnail || audio.coverImage ? (
                  <img 
                    src={audio.thumbnail || audio.coverImage} 
                    alt={audio.title} 
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full aspect-square bg-gradient-to-br from-primary-500/30 to-secondary-500/30 flex items-center justify-center">
                    <Disc className="h-24 w-24 text-white/50 animate-spin-slow" />
                  </div>
                )}
                {audio.isPremium && (
                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full text-xs font-semibold text-white flex items-center gap-1 shadow-lg">
                    <Crown className="h-3 w-3" />
                    Premium
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Audio Info & Player */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-primary-700 dark:text-primary-300 text-xs font-semibold rounded-full capitalize border border-primary-500/30">
                {audio.type?.replace('_', ' ')}
              </span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                {audio.language === 'urdu' ? 'Urdu' : audio.language === 'hindi' ? 'Hindi' : audio.language || 'English'}
              </span>
              {audio.isFeatured && (
                <span className="px-3 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400 text-xs rounded-full flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  Featured
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">{audio.title}</h1>
            {audio.description && (
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{audio.description}</p>
            )}

            <div className="flex items-center flex-wrap gap-4 mb-6">
              <Link to={`/author/${getAuthorSlug()}`} className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors font-medium">
                <User className="h-4 w-4" />
                <span>{getAuthorName()}</span>
              </Link>
              <span className="flex items-center gap-2 text-gray-500 dark:text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>{new Date(audio.createdAt).toLocaleDateString()}</span>
              </span>
              <span className="flex items-center gap-2 text-gray-500 dark:text-gray-500">
                <Headphones className="h-4 w-4" />
                <span>{audio.stats?.plays?.toLocaleString() || 0} plays</span>
              </span>
            </div>

            {/* Premium Audio Player */}
            <div 
              ref={playerContainerRef} 
              className="relative bg-gradient-to-r from-gray-900/90 to-gray-800/90 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 border border-gray-700/50 shadow-2xl overflow-hidden"
            >
              {/* Ambient Light Effect */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-500/30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary-500/30 rounded-full blur-3xl"></div>
              
              <audio
                ref={audioRef}
                src={audio.audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
              />
              
              <div className="relative z-10 space-y-5">
                <div className="text-center">
                  <h3 className="text-white font-medium text-lg">{audio.title}</h3>
                  <p className="text-gray-400 text-sm">{getAuthorName()}</p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #db2777 0%, #db2777 ${(currentTime / duration) * 100}%, #374151 ${(currentTime / duration) * 100}%, #374151 100%)`
                    }}
                  />
                  <div className="flex justify-between text-gray-400 text-xs">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Main Controls */}
                <div className="flex items-center justify-center gap-6">
                  <button className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                    <Shuffle className="h-5 w-5" />
                  </button>
                  <button className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                    <SkipBack className="h-5 w-5" />
                  </button>
                  <button
                    onClick={togglePlay}
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white flex items-center justify-center hover:scale-105 hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300"
                  >
                    {isPlaying ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7 ml-1" />}
                  </button>
                  <button className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                    <SkipForward className="h-5 w-5" />
                  </button>
                  <button className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                    <Repeat className="h-5 w-5" />
                  </button>
                </div>

                {/* Volume & Extras */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button onClick={toggleMute} className="text-gray-400 hover:text-white transition-colors">
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-24 h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500"
                      style={{
                        background: `linear-gradient(to right, #db2777 0%, #db2777 ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setShowTranscript(!showTranscript)} className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all">
                      <FileText className="h-5 w-5" />
                    </button>
                    <button onClick={toggleFullscreen} className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all">
                      {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <motion.button
                onClick={handleLike}
                disabled={likeMutation.isPending}
                animate={isLikedAnimate ? { scale: [1, 1.2, 1] } : {}}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  isLiked 
                    ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-500 border border-red-500/30' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
                <span>{likeMutation.isPending ? '...' : 'Like'}</span>
              </motion.button>
              <motion.button
                onClick={handleBookmark}
                disabled={bookmarkMutation.isPending}
                animate={isBookmarkedAnimate ? { scale: [1, 1.2, 1] } : {}}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  isBookmarked 
                    ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-primary-600 dark:text-primary-400 border border-primary-500/30' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-primary-500' : ''}`} />
                <span>{bookmarkMutation.isPending ? '...' : 'Save'}</span>
              </motion.button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-5 mt-5 text-sm text-gray-500 dark:text-gray-500">
              <span className="flex items-center gap-1.5">
                <Activity className="h-4 w-4" />
                {audio.stats?.plays?.toLocaleString() || 0} plays
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                {audio.stats?.views?.toLocaleString() || 0} views
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="h-4 w-4" />
                {audio.stats?.likes?.toLocaleString() || 0} likes
              </span>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <div className="flex gap-1 border-b border-gray-200 dark:border-gray-800 mb-8">
            {[
              { id: 'related', label: 'Related Audio', icon: ListMusic },
              { id: 'categories', label: 'Categories', icon: Music },
              { id: 'playlists', label: 'Playlists', icon: ListMusic }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all rounded-t-xl ${
                  activeTab === tab.id
                    ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400 bg-primary-50/50 dark:bg-primary-950/30'
                    : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Related Audio Tab */}
          <AnimatePresence mode="wait">
            {activeTab === 'related' && (
              <motion.div
                key="related"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {relatedAudio.filter(item => item._id !== audio._id).slice(0, 6).map((related, idx) => (
                  <motion.div
                    key={related._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-200 dark:border-gray-800 hover:border-primary-500/50 dark:hover:border-primary-500/50"
                    onClick={() => window.location.href = `/audio/${related.slug}`}
                  >
                    <div className="relative aspect-square">
                      <img 
                        src={related.thumbnail || related.coverImage || 'https://via.placeholder.com/300x300?text=🎵'} 
                        alt={related.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playAudio(related, relatedAudio, relatedAudio.findIndex(r => r._id === related._id));
                        }}
                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 flex items-center justify-center transform scale-90 group-hover:scale-110 transition">
                          <Play className="h-6 w-6 text-white ml-0.5" />
                        </div>
                      </button>
                      {related.duration && (
                        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 rounded-md text-white text-xs">
                          {formatTime(related.duration)}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">{related.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {typeof related.author === 'object' ? related.author?.name : related.author || 'Unknown'}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Categories Tab */}
            {activeTab === 'categories' && (
              <motion.div
                key="categories"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {categories.length > 4 && (
                  <button
                    onClick={() => scrollCategories('left')}
                    className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-700"
                  >
                    <ChevronLeftIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                )}
                <div 
                  ref={categoryScrollRef}
                  className="flex gap-5 overflow-x-auto scrollbar-hide px-6 pb-4"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/audio/type/${category.id}`}
                      className="flex-shrink-0 w-28 text-center group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative w-20 h-20 mx-auto bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-2xl flex items-center justify-center group-hover:shadow-lg transition-all"
                      >
                        <span className="text-3xl">{category.icon}</span>
                      </motion.div>
                      <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300 capitalize group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {category.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">{category.count} items</p>
                    </Link>
                  ))}
                </div>
                {categories.length > 4 && (
                  <button
                    onClick={() => scrollCategories('right')}
                    className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-700"
                  >
                    <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                )}
              </motion.div>
            )}

            {/* Playlists Tab */}
            {activeTab === 'playlists' && (
              <motion.div
                key="playlists"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {playlists.length > 4 && (
                  <button
                    onClick={() => scrollPlaylists('left')}
                    className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-700"
                  >
                    <ChevronLeftIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                )}
                <div 
                  ref={playlistScrollRef}
                  className="flex gap-5 overflow-x-auto scrollbar-hide px-6 pb-4"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {playlists.map((playlist) => (
                    <motion.div
                      key={playlist._id}
                      whileHover={{ y: -4 }}
                      className="flex-shrink-0 w-44 bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group border border-gray-200 dark:border-gray-800 hover:border-primary-500/50 dark:hover:border-primary-500/50"
                      onClick={() => {
                        if (playlist.audios?.length > 0) {
                          playAudio(playlist.audios[0], playlist.audios, 0);
                          toast.success(`Playing playlist: ${playlist.name}`);
                        } else {
                          toast.error('Empty playlist');
                        }
                      }}
                    >
                      <div className="relative aspect-square bg-gradient-to-br from-primary-500/30 to-secondary-500/30">
                        {playlist.coverImage ? (
                          <img 
                            src={playlist.coverImage} 
                            alt={playlist.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Album className="h-12 w-12 text-gray-400" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 flex items-center justify-center">
                            <Play className="h-5 w-5 text-white ml-0.5" />
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">{playlist.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {playlist.audios?.length || 0} tracks
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                {playlists.length > 4 && (
                  <button
                    onClick={() => scrollPlaylists('right')}
                    className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-700"
                  >
                    <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Transcript Section */}
        <AnimatePresence>
          {showTranscript && audio.transcript && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-800"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                Transcript
              </h3>
              <div className="prose prose-sm max-w-none text-gray-600 dark:text-gray-400">
                <p className="whitespace-pre-line">{audio.transcript}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AudioDetailPage;