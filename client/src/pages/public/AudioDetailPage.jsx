// client/src/pages/public/AudioDetailPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
  Headphones, Play, Pause, Heart, Share2, Bookmark, Download,
  ChevronLeft, Clock, Eye, Calendar, User, Loader2, AlertCircle,
  Mic, Music, FileText, Volume2, SkipBack, SkipForward,
  Repeat, Shuffle, ListMusic, Maximize2, Minimize2, X
} from 'lucide-react';
import audioAPI from '../../api/audioAPI';
import authorAPI from '../../api/authorAPI';

const AudioDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { user } = useSelector(state => state.auth);
  const audioRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerContainerRef = useRef(null);

  // Fetch audio data using slug
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
    queryFn: () => audioAPI.getAudioItems({ limit: 4, type: audio?.type }),
    enabled: !!audio?._id
  });

  const relatedAudio = relatedData?.data?.data || relatedData?.data || relatedData || [];

  // Like mutation
  const likeMutation = useMutation({
    mutationFn: () => audioAPI.likeAudio(audio?._id),
    onSuccess: () => {
      setIsLiked(!isLiked);
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
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
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

  // Handle keyboard shortcuts
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

  const getCategoryName = () => {
    if (!audio?.category) return 'Audio';
    if (typeof audio.category === 'object') return audio.category.name || 'Audio';
    return audio.category || 'Audio';
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-500">Loading audio...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !audio) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Audio Not Found</h1>
          <p className="text-gray-500 mb-6">The audio you are looking for does not exist or has been removed.</p>
          <Link to="/audio" className="btn-primary inline-flex items-center space-x-2">
            <ChevronLeft className="h-4 w-4" />
            <span>Browse All Audio</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/audio" className="inline-flex items-center space-x-1 text-sm text-gray-500 hover:text-primary-600 transition-colors">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Audio</span>
          </Link>
        </div>

        {/* Audio Player Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Album Art */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="card overflow-hidden rounded-xl shadow-lg">
              {audio.thumbnail || audio.coverImage ? (
                <img 
                  src={audio.thumbnail || audio.coverImage} 
                  alt={audio.title} 
                  className="w-full aspect-square object-cover"
                />
              ) : (
                <div className="w-full aspect-square bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <Headphones className="h-20 w-20 text-white" />
                </div>
              )}
            </div>
          </motion.div>

          {/* Audio Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full capitalize">
                {audio.type?.replace('_', ' ')}
              </span>
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                {audio.language === 'urdu' ? 'Urdu' : audio.language === 'hindi' ? 'Hindi' : audio.language || 'English'}
              </span>
              {audio.isPremium && <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">Premium</span>}
              {audio.isFeatured && <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">Featured</span>}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{audio.title}</h1>
            {audio.description && (
              <p className="text-gray-600 mb-4">{audio.description}</p>
            )}

            <div className="flex items-center flex-wrap gap-4 mb-6">
              <Link to={`/author/${getAuthorSlug()}`} className="inline-flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-medium">
                <User className="h-4 w-4" />
                <span>{getAuthorName()}</span>
              </Link>
              <span className="flex items-center space-x-1 text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>{new Date(audio.createdAt).toLocaleDateString()}</span>
              </span>
            </div>

            {/* Audio Player */}
            <div ref={playerContainerRef} className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 shadow-xl">
              <audio
                ref={audioRef}
                src={audio.audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
              />
              
              {/* Player Controls */}
              <div className="space-y-4">
                {/* Title */}
                <div className="text-center">
                  <h3 className="text-white font-medium text-lg">{audio.title}</h3>
                  <p className="text-green-200 text-sm">{getAuthorName()}</p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1 bg-green-400 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #fff 0%, #fff ${(currentTime / duration) * 100}%, #4ade80 ${(currentTime / duration) * 100}%, #4ade80 100%)`
                    }}
                  />
                  <div className="flex justify-between text-green-200 text-sm">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Main Controls */}
                <div className="flex items-center justify-center gap-4">
                  <button className="p-2 rounded-full hover:bg-green-500 text-white transition-colors">
                    <Shuffle className="h-5 w-5" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-green-500 text-white transition-colors">
                    <SkipBack className="h-5 w-5" />
                  </button>
                  <button
                    onClick={togglePlay}
                    className="w-14 h-14 rounded-full bg-white text-green-600 flex items-center justify-center hover:scale-105 transition-transform"
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
                  </button>
                  <button className="p-2 rounded-full hover:bg-green-500 text-white transition-colors">
                    <SkipForward className="h-5 w-5" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-green-500 text-white transition-colors">
                    <Repeat className="h-5 w-5" />
                  </button>
                </div>

                {/* Volume and Extra Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button onClick={toggleMute} className="text-white hover:text-green-200">
                      <Volume2 className="h-5 w-5" />
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-24 h-1 bg-green-400 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setShowTranscript(!showTranscript)} className="text-white hover:text-green-200">
                      <FileText className="h-5 w-5" />
                    </button>
                    <button onClick={toggleFullscreen} className="text-white hover:text-green-200">
                      {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={handleLike}
                disabled={likeMutation.isPending}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isLiked ? 'bg-red-50 text-red-600' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
                <span>{likeMutation.isPending ? '...' : 'Like'}</span>
              </button>
              <button
                onClick={handleBookmark}
                disabled={bookmarkMutation.isPending}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isBookmarked ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-primary-500' : ''}`} />
                <span>{bookmarkMutation.isPending ? '...' : 'Save'}</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              >
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Play className="h-4 w-4" />
                {audio.stats?.plays?.toLocaleString() || 0} plays
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {audio.stats?.views?.toLocaleString() || 0} views
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                {audio.stats?.likes?.toLocaleString() || 0} likes
              </span>
            </div>
          </motion.div>
        </div>

        {/* Transcript Section */}
        {showTranscript && audio.transcript && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6 mb-8"
          >
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary-600" />
              Transcript
            </h3>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 whitespace-pre-line">{audio.transcript}</p>
            </div>
          </motion.div>
        )}

        {/* Related Audio */}
        {relatedAudio.length > 0 && (
          <div className="mt-8">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ListMusic className="h-5 w-5 text-primary-600" />
              More Like This
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedAudio.filter(item => item._id !== audio._id).slice(0, 4).map((related) => (
                <Link
                  key={related._id}
                  to={`/audio/${related.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all">
                    <div className="relative aspect-square bg-gray-100">
                      {related.thumbnail || related.coverImage ? (
                        <img 
                          src={related.thumbnail || related.coverImage} 
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Headphones className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                      {related.duration && (
                        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded-md">
                          {formatTime(related.duration)}
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-gray-900 text-sm line-clamp-1">{related.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {typeof related.author === 'object' ? related.author?.name : related.author || 'Unknown'}
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

export default AudioDetailPage;









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