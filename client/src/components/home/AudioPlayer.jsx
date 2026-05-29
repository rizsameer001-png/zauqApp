// client/src/components/home/AudioPlayer.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  Heart, List, Repeat, Shuffle, Maximize2, Minimize2,
  Clock, Music, Headphones
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import subscriptionAPI from '../../api/subscriptionAPI';

const AudioPlayer = ({ tracks, currentTrackIndex, onTrackChange, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState('none'); // none, one, all
  const [userPlan, setUserPlan] = useState(null);
  
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    fetchUserPlan();
  }, []);

  const fetchUserPlan = async () => {
    try {
      const response = await subscriptionAPI.getCurrent();
      const data = response.data || response;
      setUserPlan(data.plan);
    } catch (error) {
      console.error('Error fetching user plan:', error);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const handlePrevious = () => {
    const newIndex = currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1;
    onTrackChange(newIndex);
  };

  const handleNext = () => {
    if (repeatMode === 'one') {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      const newIndex = currentTrackIndex === tracks.length - 1 ? 0 : currentTrackIndex + 1;
      onTrackChange(newIndex);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const checkPremiumFeature = () => {
    if (userPlan?.plan === 'free' && currentTrack?.isPremium) {
      return (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center p-4">
            <Crown className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
            <p className="text-white mb-3">Premium content</p>
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg">
              Upgrade to Premium
            </button>
          </div>
        </div>
      );
    }
    return null;
  };

  if (isMinimized) {
    return (
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50"
      >
        <div className="flex items-center justify-between p-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 flex-1">
            <img
              src={currentTrack?.coverArt || '/default-album.jpg'}
              alt={currentTrack?.title}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <p className="font-medium text-gray-900">{currentTrack?.title}</p>
              <p className="text-sm text-gray-500">{currentTrack?.artist}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handlePrevious} className="p-2 hover:bg-gray-100 rounded-full">
              <SkipBack className="h-5 w-5" />
            </button>
            <button onClick={handlePlayPause} className="p-3 bg-primary-600 hover:bg-primary-700 rounded-full text-white">
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            <button onClick={handleNext} className="p-2 hover:bg-gray-100 rounded-full">
              <SkipForward className="h-5 w-5" />
            </button>
            <button onClick={() => setIsMinimized(false)} className="p-2 hover:bg-gray-100 rounded-full">
              <Maximize2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-2xl z-50"
    >
      {/* Main Player */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <img
              src={currentTrack?.coverArt || '/default-album.jpg'}
              alt={currentTrack?.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h4 className="font-semibold">{currentTrack?.title}</h4>
              <p className="text-sm text-gray-400">{currentTrack?.artist}</p>
            </div>
            <button
              onClick={handleLike}
              className={`p-2 rounded-full transition-colors ${
                isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
              }`}
            >
              <Heart className="h-5 w-5" fill={isLiked ? 'currentColor' : 'none'} />
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPlaylist(!showPlaylist)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <List className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsMinimized(true)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Minimize2 className="h-5 w-5" />
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleProgressChange}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${(currentTime / duration) * 100}%, #4a5568 ${(currentTime / duration) * 100}%, #4a5568 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsShuffled(!isShuffled)}
              className={`p-2 rounded-full transition-colors ${
                isShuffled ? 'text-primary-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Shuffle className="h-5 w-5" />
            </button>
            <button
              onClick={() => {
                const modes = ['none', 'one', 'all'];
                const currentIndex = modes.indexOf(repeatMode);
                const nextMode = modes[(currentIndex + 1) % modes.length];
                setRepeatMode(nextMode);
              }}
              className={`p-2 rounded-full transition-colors ${
                repeatMode !== 'none' ? 'text-primary-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Repeat className="h-5 w-5" />
              {repeatMode === 'one' && (
                <span className="absolute text-xs ml-3 mt-2">1</span>
              )}
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={handlePrevious} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <SkipBack className="h-6 w-6" />
            </button>
            <button
              onClick={handlePlayPause}
              className="p-4 bg-primary-600 hover:bg-primary-700 rounded-full transition-colors"
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </button>
            <button onClick={handleNext} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <SkipForward className="h-6 w-6" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={toggleMute} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              onChange={handleVolumeChange}
              className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Playlist Sidebar */}
      <AnimatePresence>
        {showPlaylist && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="absolute bottom-full right-0 mb-2 w-80 bg-gray-800 rounded-lg shadow-xl max-h-96 overflow-y-auto"
          >
            <div className="p-4">
              <h4 className="font-semibold mb-3">Playlist</h4>
              <div className="space-y-2">
                {tracks.map((track, idx) => (
                  <button
                    key={idx}
                    onClick={() => onTrackChange(idx)}
                    className={`w-full text-left p-2 rounded-lg transition-colors ${
                      idx === currentTrackIndex
                        ? 'bg-primary-600/20 text-primary-400'
                        : 'hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-400">{idx + 1}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{track.title}</p>
                        <p className="text-xs text-gray-400">{track.artist}</p>
                      </div>
                      {track.isPremium && (
                        <Crown className="h-3 w-3 text-yellow-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <audio
        ref={audioRef}
        src={currentTrack?.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleNext}
      />
    </motion.div>
  );
};

export default AudioPlayer;