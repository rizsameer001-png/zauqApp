// // client/src/context/AudioPlayerContext.jsx
// import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
// import toast from 'react-hot-toast';

// const AudioPlayerContext = createContext();

// export const useAudioPlayer = () => {
//   const context = useContext(AudioPlayerContext);
//   if (!context) {
//     throw new Error('useAudioPlayer must be used within AudioPlayerProvider');
//   }
//   return context;
// };

// export const AudioPlayerProvider = ({ children }) => {
//   const [currentAudio, setCurrentAudio] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [playlist, setPlaylist] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(-1);
//   const [volume, setVolume] = useState(0.7);
//   const [isMuted, setIsMuted] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const audioRef = useRef(null);

//   // Create audio element on mount
//   useEffect(() => {
//     if (!audioRef.current) {
//       audioRef.current = new Audio();
      
//       audioRef.current.addEventListener('timeupdate', () => {
//         setCurrentTime(audioRef.current.currentTime);
//       });
      
//       audioRef.current.addEventListener('loadedmetadata', () => {
//         setDuration(audioRef.current.duration);
//       });
      
//       audioRef.current.addEventListener('ended', () => {
//         nextAudio();
//       });
      
//       audioRef.current.addEventListener('error', (e) => {
//         console.error('Audio error:', e);
//         toast.error('Playback error occurred');
//       });
//     }
    
//     return () => {
//       if (audioRef.current) {
//         audioRef.current.pause();
//         audioRef.current.src = '';
//       }
//     };
//   }, []);

//   // Apply volume settings
//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.volume = isMuted ? 0 : volume;
//     }
//   }, [volume, isMuted]);

//   const playAudio = useCallback((audio, audioList = [], index = 0) => {
//     if (!audio || !audio.audioUrl) {
//       toast.error('Invalid audio file');
//       return;
//     }

//     setCurrentAudio(audio);
//     setPlaylist(audioList);
//     setCurrentIndex(index);
    
//     if (audioRef.current) {
//       audioRef.current.src = audio.audioUrl;
//       audioRef.current.play()
//         .then(() => {
//           setIsPlaying(true);
//           toast.success(`Now playing: ${audio.title}`);
//         })
//         .catch(err => {
//           console.error('Play error:', err);
//           toast.error('Failed to play audio. Please try again.');
//         });
//     }
//   }, []);

//   const pauseAudio = useCallback(() => {
//     if (audioRef.current && isPlaying) {
//       audioRef.current.pause();
//       setIsPlaying(false);
//       toast.success('Audio paused');
//     }
//   }, [isPlaying]);

//   const resumeAudio = useCallback(() => {
//     if (audioRef.current && currentAudio && !isPlaying) {
//       audioRef.current.play()
//         .then(() => {
//           setIsPlaying(true);
//           toast.success('Audio resumed');
//         })
//         .catch(err => {
//           console.error('Resume error:', err);
//           toast.error('Failed to resume audio');
//         });
//     }
//   }, [currentAudio, isPlaying]);

//   const stopAudio = useCallback(() => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       audioRef.current.currentTime = 0;
//       setIsPlaying(false);
//       setCurrentAudio(null);
//       setPlaylist([]);
//       setCurrentIndex(-1);
//       setCurrentTime(0);
//       toast.success('Audio stopped');
//     }
//   }, []);

//   const nextAudio = useCallback(() => {
//     if (playlist.length > 0 && currentIndex < playlist.length - 1) {
//       const nextIndex = currentIndex + 1;
//       playAudio(playlist[nextIndex], playlist, nextIndex);
//     } else if (playlist.length > 0 && currentIndex === playlist.length - 1) {
//       toast('End of playlist');
//     } else {
//       toast.error('No more tracks in playlist');
//     }
//   }, [playlist, currentIndex, playAudio]);

//   const previousAudio = useCallback(() => {
//     if (playlist.length > 0 && currentIndex > 0) {
//       const prevIndex = currentIndex - 1;
//       playAudio(playlist[prevIndex], playlist, prevIndex);
//     } else {
//       toast.error('Already at the first track');
//     }
//   }, [playlist, currentIndex, playAudio]);

//   const seekTo = useCallback((time) => {
//     if (audioRef.current && duration) {
//       const seekTime = Math.min(Math.max(time, 0), duration);
//       audioRef.current.currentTime = seekTime;
//       setCurrentTime(seekTime);
//     }
//   }, [duration]);

//   const setVolumeLevel = useCallback((level) => {
//     const newVolume = Math.min(Math.max(level, 0), 1);
//     setVolume(newVolume);
//     if (audioRef.current) {
//       audioRef.current.volume = newVolume;
//     }
//     if (newVolume > 0 && isMuted) {
//       setIsMuted(false);
//     }
//     toast.success(`Volume: ${Math.round(newVolume * 100)}%`);
//   }, [isMuted]);

//   const toggleMute = useCallback(() => {
//     if (isMuted) {
//       setIsMuted(false);
//       if (audioRef.current) {
//         audioRef.current.volume = volume;
//       }
//       toast.success('Sound on');
//     } else {
//       setIsMuted(true);
//       if (audioRef.current) {
//         audioRef.current.volume = 0;
//       }
//       toast.success('Muted');
//     }
//   }, [isMuted, volume]);

//   const volumeUp = useCallback(() => {
//     if (isMuted) {
//       setIsMuted(false);
//     }
//     const newVolume = Math.min(volume + 0.1, 1);
//     setVolume(newVolume);
//     if (audioRef.current) {
//       audioRef.current.volume = newVolume;
//     }
//     toast.success(`Volume: ${Math.round(newVolume * 100)}%`);
//   }, [volume, isMuted]);

//   const volumeDown = useCallback(() => {
//     if (isMuted) {
//       setIsMuted(false);
//     }
//     const newVolume = Math.max(volume - 0.1, 0);
//     setVolume(newVolume);
//     if (audioRef.current) {
//       audioRef.current.volume = newVolume;
//     }
//     toast.success(`Volume: ${Math.round(newVolume * 100)}%`);
//   }, [volume, isMuted]);

//   // Voice command handler
//   const handleVoiceCommand = useCallback(async (command, searchAPI) => {
//     const lowerCommand = command.toLowerCase();
//     console.log('Processing voice command:', command);
    
//     // Volume control commands
//     if (lowerCommand.includes('volume up') || lowerCommand.includes('louder') || lowerCommand.includes('increase volume')) {
//       volumeUp();
//       return true;
//     }
    
//     if (lowerCommand.includes('volume down') || lowerCommand.includes('softer') || lowerCommand.includes('decrease volume')) {
//       volumeDown();
//       return true;
//     }
    
//     if (lowerCommand.includes('mute') || lowerCommand.includes('silence')) {
//       toggleMute();
//       return true;
//     }
    
//     if (lowerCommand.includes('unmute') || lowerCommand.includes('sound on')) {
//       if (isMuted) toggleMute();
//       return true;
//     }
    
//     // Playback control commands
//     if (lowerCommand.includes('play')) {
//       let searchTerms = command.replace(/play|चलाएं|چلائیں/gi, '').trim();
      
//       if (searchTerms && searchAPI) {
//         toast.loading(`Searching for "${searchTerms}"...`, { id: 'voice-play' });
        
//         try {
//           const response = await searchAPI(searchTerms);
//           const results = response?.data?.data || response?.data || response || [];
          
//           if (results.length > 0) {
//             const audioToPlay = results[0];
//             playAudio(audioToPlay, results, 0);
//             toast.success(`Playing: ${audioToPlay.title}`, { id: 'voice-play' });
//           } else {
//             toast.error(`No audio found for "${searchTerms}"`, { id: 'voice-play' });
//           }
//         } catch (error) {
//           console.error('Search error:', error);
//           toast.error('Failed to search audio', { id: 'voice-play' });
//         }
//       } else if (currentAudio && !isPlaying) {
//         resumeAudio();
//       } else if (!currentAudio) {
//         toast.error('Please specify what to play or say "play [song name]"');
//       }
//       return true;
//     }
    
//     if (lowerCommand.includes('pause') || lowerCommand.includes('stop')) {
//       pauseAudio();
//       return true;
//     }
    
//     if (lowerCommand.includes('resume') || lowerCommand.includes('continue')) {
//       if (currentAudio) {
//         resumeAudio();
//       } else {
//         toast.error('No audio to resume');
//       }
//       return true;
//     }
    
//     if (lowerCommand.includes('next') || lowerCommand.includes('skip')) {
//       nextAudio();
//       return true;
//     }
    
//     if (lowerCommand.includes('previous') || lowerCommand.includes('back')) {
//       previousAudio();
//       return true;
//     }
    
//     return false;
//   }, [currentAudio, isPlaying, playAudio, pauseAudio, resumeAudio, nextAudio, previousAudio, volumeUp, volumeDown, toggleMute, isMuted]);

//   const formatTime = (time) => {
//     if (isNaN(time)) return '0:00';
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds.toString().padStart(2, '0')}`;
//   };

//   const value = {
//     currentAudio,
//     isPlaying,
//     playlist,
//     currentIndex,
//     volume,
//     isMuted,
//     currentTime,
//     duration,
//     playAudio,
//     pauseAudio,
//     resumeAudio,
//     stopAudio,
//     nextAudio,
//     previousAudio,
//     seekTo,
//     setVolume: setVolumeLevel,
//     volumeUp,
//     volumeDown,
//     toggleMute,
//     handleVoiceCommand,
//     formatTime
//   };

//   return (
//     <AudioPlayerContext.Provider value={value}>
//       {children}
//     </AudioPlayerContext.Provider>
//   );
// };

// export default AudioPlayerProvider;

















// client/src/context/AudioPlayerContext.jsx
import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';

const AudioPlayerContext = createContext(null);

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within AudioPlayerProvider');
  }
  return context;
};

export const AudioPlayerProvider = ({ children }) => {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  // Create audio element on mount
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      
      const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
      };
      
      const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
        setIsLoading(false);
        setError(null);
        console.log('Audio loaded successfully:', {
          duration: audioRef.current.duration,
          src: audioRef.current.src
        });
      };
      
      const handleCanPlay = () => {
        console.log('Audio can play');
        setIsLoading(false);
      };
      
      const handleWaiting = () => {
        console.log('Audio buffering...');
        setIsLoading(true);
      };
      
      const handlePlaying = () => {
        console.log('Audio playing');
        setIsLoading(false);
      };
      
      const handleEnded = () => {
        console.log('Audio ended');
        nextAudio();
      };
      
      const handleError = (e) => {
        console.error('Audio error details:', {
          error: e,
          src: audioRef.current?.src,
          readyState: audioRef.current?.readyState,
          networkState: audioRef.current?.networkState,
          errorCode: audioRef.current?.error?.code,
          errorMessage: audioRef.current?.error?.message
        });
        
        setIsLoading(false);
        setError('Failed to play audio');
        
        // Show user-friendly error message
        if (audioRef.current?.error) {
          switch (audioRef.current.error.code) {
            case 1:
              toast.error('Audio playback was aborted');
              break;
            case 2:
              toast.error('Network error - please check your connection');
              break;
            case 3:
              toast.error('Audio decoding failed - file may be corrupted');
              break;
            case 4:
              toast.error('Audio file not found or URL is invalid');
              break;
            default:
              toast.error('Failed to play audio');
          }
        } else {
          toast.error('Failed to play audio');
        }
      };
      
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('canplay', handleCanPlay);
      audioRef.current.addEventListener('waiting', handleWaiting);
      audioRef.current.addEventListener('playing', handlePlaying);
      audioRef.current.addEventListener('ended', handleEnded);
      audioRef.current.addEventListener('error', handleError);
      
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
          audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
          audioRef.current.removeEventListener('canplay', handleCanPlay);
          audioRef.current.removeEventListener('waiting', handleWaiting);
          audioRef.current.removeEventListener('playing', handlePlaying);
          audioRef.current.removeEventListener('ended', handleEnded);
          audioRef.current.removeEventListener('error', handleError);
          audioRef.current.pause();
          audioRef.current.src = '';
        }
      };
    }
  }, []);

  // Apply volume settings
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const playAudio = useCallback((audio, audioList = [], index = 0) => {
    if (!audio || !audio.audioUrl) {
      toast.error('Invalid audio file');
      console.error('Invalid audio:', audio);
      return;
    }

    console.log('Attempting to play audio:', {
      title: audio.title,
      url: audio.audioUrl,
      type: audio.type
    });

    setCurrentAudio(audio);
    setPlaylist(audioList);
    setCurrentIndex(index);
    setIsLoading(true);
    setError(null);
    
    if (audioRef.current) {
      // Reset any previous errors
      audioRef.current.onerror = null;
      
      // Set new source
      audioRef.current.src = audio.audioUrl;
      audioRef.current.load(); // Reload the audio element
      
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
          toast.success(`Now playing: ${audio.title}`);
          console.log('Playback started successfully');
        })
        .catch(err => {
          console.error('Play error details:', {
            error: err,
            name: err.name,
            message: err.message,
            audioUrl: audio.audioUrl
          });
          
          setIsPlaying(false);
          setIsLoading(false);
          
          // Handle specific play errors
          if (err.name === 'NotAllowedError') {
            toast.error('Please interact with the page first to play audio');
          } else if (err.name === 'NotSupportedError') {
            toast.error('Audio format not supported');
          } else if (err.name === 'AbortError') {
            toast.error('Playback was interrupted');
          } else {
            toast.error('Failed to play audio. Please try again.');
          }
        });
    }
  }, []);

  const pauseAudio = useCallback(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      console.log('Audio paused');
    }
  }, [isPlaying]);

  const resumeAudio = useCallback(() => {
    if (audioRef.current && currentAudio && !isPlaying) {
      setIsLoading(true);
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
          console.log('Audio resumed');
        })
        .catch(err => {
          console.error('Resume error:', err);
          setIsLoading(false);
          toast.error('Failed to resume audio');
        });
    }
  }, [currentAudio, isPlaying]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentAudio(null);
      setPlaylist([]);
      setCurrentIndex(-1);
      setCurrentTime(0);
      setError(null);
      console.log('Audio stopped');
    }
  }, []);

  const nextAudio = useCallback(() => {
    if (playlist.length > 0 && currentIndex < playlist.length - 1) {
      const nextIndex = currentIndex + 1;
      playAudio(playlist[nextIndex], playlist, nextIndex);
    } else if (playlist.length > 0 && currentIndex === playlist.length - 1) {
      toast('End of playlist');
    } else {
      toast.error('No more tracks in playlist');
    }
  }, [playlist, currentIndex, playAudio]);

  const previousAudio = useCallback(() => {
    if (playlist.length > 0 && currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      playAudio(playlist[prevIndex], playlist, prevIndex);
    } else {
      toast.error('Already at the first track');
    }
  }, [playlist, currentIndex, playAudio]);

  const seekTo = useCallback((time) => {
    if (audioRef.current && duration) {
      const seekTime = Math.min(Math.max(time, 0), duration);
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
      console.log('Seeked to:', seekTime);
    }
  }, [duration]);

  const setVolumeLevel = useCallback((level) => {
    const newVolume = Math.min(Math.max(level, 0), 1);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
    console.log('Volume set to:', newVolume);
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    if (isMuted) {
      setIsMuted(false);
      if (audioRef.current) {
        audioRef.current.volume = volume;
      }
      toast.success('Sound on');
    } else {
      setIsMuted(true);
      if (audioRef.current) {
        audioRef.current.volume = 0;
      }
      toast.success('Muted');
    }
  }, [isMuted, volume]);

  const volumeUp = useCallback(() => {
    if (isMuted) {
      setIsMuted(false);
    }
    const newVolume = Math.min(volume + 0.1, 1);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    toast.success(`Volume: ${Math.round(newVolume * 100)}%`);
  }, [volume, isMuted]);

  const volumeDown = useCallback(() => {
    if (isMuted) {
      setIsMuted(false);
    }
    const newVolume = Math.max(volume - 0.1, 0);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    toast.success(`Volume: ${Math.round(newVolume * 100)}%`);
  }, [volume, isMuted]);

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const value = {
    currentAudio,
    isPlaying,
    isLoading,
    error,
    playlist,
    currentIndex,
    volume,
    isMuted,
    currentTime,
    duration,
    playAudio,
    pauseAudio,
    resumeAudio,
    stopAudio,
    nextAudio,
    previousAudio,
    seekTo,
    setVolume: setVolumeLevel,
    volumeUp,
    volumeDown,
    toggleMute,
    formatTime
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export default AudioPlayerProvider;