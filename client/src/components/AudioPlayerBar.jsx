// // client/src/components/AudioPlayerBar.jsx
// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, 
//   X, Headphones, Heart, Share2 
// } from 'lucide-react';
// import { useAudioPlayer } from '../context/AudioPlayerContext';

// const AudioPlayerBar = () => {
//   const {
//     currentAudio,
//     isPlaying,
//     currentTime,
//     duration,
//     playAudio,
//     pauseAudio,
//     resumeAudio,
//     nextAudio,
//     previousAudio,
//     seekTo,
//     volume,
//     setVolume,
//     toggleMute,
//     isMuted,
//     formatTime,
//     stopAudio
//   } = useAudioPlayer();

//   if (!currentAudio) return null;

//   const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

//   const handleSeek = (e) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const percentage = x / rect.width;
//     seekTo(percentage * duration);
//   };

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ y: 100 }}
//         animate={{ y: 0 }}
//         exit={{ y: 100 }}
//         className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-2xl z-50 border-t border-gray-700"
//       >
//         <div className="max-w-7xl mx-auto px-4 py-3">
//           {/* Progress Bar */}
//           <div 
//             className="absolute top-0 left-0 right-0 h-1 bg-gray-700 cursor-pointer"
//             onClick={handleSeek}
//           >
//             <div 
//               className="h-full bg-primary-500 rounded-full relative"
//               style={{ width: `${progress}%` }}
//             >
//               <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg" />
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             {/* Audio Info */}
//             <div className="flex items-center gap-4 flex-1 min-w-0">
//               <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
//                 <Headphones className="h-6 w-6" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="font-medium text-sm truncate">{currentAudio.title}</p>
//                 <p className="text-xs text-gray-400 truncate">
//                   {currentAudio.author?.name || 'Unknown Artist'} • {currentAudio.type}
//                 </p>
//               </div>
//             </div>

//             {/* Playback Controls */}
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={previousAudio}
//                 className="p-2 hover:bg-white/10 rounded-full transition"
//                 title="Previous"
//               >
//                 <SkipBack className="h-5 w-5" />
//               </button>
              
//               <button
//                 onClick={isPlaying ? pauseAudio : resumeAudio}
//                 className="p-3 bg-primary-600 hover:bg-primary-700 rounded-full transition shadow-lg"
//                 title={isPlaying ? "Pause" : "Play"}
//               >
//                 {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
//               </button>
              
//               <button
//                 onClick={nextAudio}
//                 className="p-2 hover:bg-white/10 rounded-full transition"
//                 title="Next"
//               >
//                 <SkipForward className="h-5 w-5" />
//               </button>
//             </div>

//             {/* Time Display */}
//             <div className="hidden md:flex items-center gap-2 text-xs text-gray-400">
//               <span>{formatTime(currentTime)}</span>
//               <span>/</span>
//               <span>{formatTime(duration)}</span>
//             </div>

//             {/* Volume Control */}
//             <div className="hidden md:flex items-center gap-2">
//               <button
//                 onClick={toggleMute}
//                 className="p-2 hover:bg-white/10 rounded-full transition"
//                 title={isMuted ? "Unmute" : "Mute"}
//               >
//                 {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
//               </button>
//               <input
//                 type="range"
//                 min="0"
//                 max="1"
//                 step="0.01"
//                 value={isMuted ? 0 : volume}
//                 onChange={(e) => setVolume(parseFloat(e.target.value))}
//                 className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
//                 style={{
//                   background: `linear-gradient(to right, #fff 0%, #fff ${(isMuted ? 0 : volume) * 100}%, #4b5563 ${(isMuted ? 0 : volume) * 100}%, #4b5563 100%)`
//                 }}
//               />
//             </div>

//             {/* Close Button */}
//             <button
//               onClick={stopAudio}
//               className="p-2 hover:bg-white/10 rounded-full transition ml-2"
//               title="Close"
//             >
//               <X className="h-5 w-5" />
//             </button>
//           </div>
//         </div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default AudioPlayerBar;























// client/src/components/AudioPlayerBar.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, 
  X, Headphones, Loader2 
} from 'lucide-react';
import { useAudioPlayer } from '../context/AudioPlayerContext';

const AudioPlayerBar = () => {
  const audioPlayer = useAudioPlayer();
  
  if (!audioPlayer) return null;
  
  const {
    currentAudio,
    isPlaying,
    isLoading,
    error,
    currentTime,
    duration,
    pauseAudio,
    resumeAudio,
    nextAudio,
    previousAudio,
    seekTo,
    volume,
    setVolume,
    toggleMute,
    isMuted,
    formatTime,
    stopAudio
  } = audioPlayer;

  if (!currentAudio) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    seekTo(percentage * duration);
  };

  // Test audio URL - you can use a sample audio for testing
  // const testAudioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-2xl z-50 border-t border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Progress Bar */}
          <div 
            className="absolute top-0 left-0 right-0 h-1 bg-gray-700 cursor-pointer"
            onClick={handleSeek}
          >
            <div 
              className="h-full bg-primary-500 rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            {/* Audio Info */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <Headphones className="h-6 w-6" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{currentAudio.title}</p>
                <p className="text-xs text-gray-400 truncate">
                  {currentAudio.author?.name || 'Unknown Artist'} • {currentAudio.type}
                </p>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={previousAudio}
                disabled={isLoading}
                className="p-2 hover:bg-white/10 rounded-full transition disabled:opacity-50"
                title="Previous"
              >
                <SkipBack className="h-5 w-5" />
              </button>
              
              <button
                onClick={isPlaying ? pauseAudio : resumeAudio}
                disabled={isLoading}
                className="p-3 bg-primary-600 hover:bg-primary-700 rounded-full transition shadow-lg disabled:opacity-50"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5 ml-0.5" />
                )}
              </button>
              
              <button
                onClick={nextAudio}
                disabled={isLoading}
                className="p-2 hover:bg-white/10 rounded-full transition disabled:opacity-50"
                title="Next"
              >
                <SkipForward className="h-5 w-5" />
              </button>
            </div>

            {/* Time Display */}
            <div className="hidden md:flex items-center gap-2 text-xs text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span>/</span>
              <span>{formatTime(duration)}</span>
            </div>

            {/* Volume Control */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="p-2 hover:bg-white/10 rounded-full transition"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #fff 0%, #fff ${(isMuted ? 0 : volume) * 100}%, #4b5563 ${(isMuted ? 0 : volume) * 100}%, #4b5563 100%)`
                }}
              />
            </div>

            {/* Close Button */}
            <button
              onClick={stopAudio}
              className="p-2 hover:bg-white/10 rounded-full transition ml-2"
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AudioPlayerBar;