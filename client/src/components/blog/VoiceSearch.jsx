// // client/src/components/blog/VoiceSearch.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import { Mic, MicOff, Loader2 } from 'lucide-react';
// import { useTranslation } from 'react-i18next';

// const VoiceSearch = ({ onResult, onListeningChange, className = '' }) => {
//   const [isListening, setIsListening] = useState(false);
//   const [isSupported, setIsSupported] = useState(true);
//   const [transcript, setTranscript] = useState('');
//   const recognitionRef = useRef(null);
//   const { t, i18n } = useTranslation();
//   const currentLang = i18n.language;

//   // Get speech recognition language based on current UI language
//   const getSpeechLanguage = () => {
//     switch (currentLang) {
//       case 'ur':
//         return 'ur-PK';
//       case 'hi':
//         return 'hi-IN';
//       default:
//         return 'en-US';
//     }
//   };

//   useEffect(() => {
//     // Check browser support
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       setIsSupported(false);
//       return;
//     }

//     recognitionRef.current = new SpeechRecognition();
//     recognitionRef.current.continuous = false;
//     recognitionRef.current.interimResults = true;
//     recognitionRef.current.lang = getSpeechLanguage();

//     recognitionRef.current.onstart = () => {
//       setIsListening(true);
//       onListeningChange?.(true);
//     };

//     recognitionRef.current.onend = () => {
//       setIsListening(false);
//       onListeningChange?.(false);
//     };

//     recognitionRef.current.onresult = (event) => {
//       let interimTranscript = '';
//       let finalTranscript = '';

//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         const transcript = event.results[i][0].transcript;
//         if (event.results[i].isFinal) {
//           finalTranscript += transcript;
//         } else {
//           interimTranscript += transcript;
//         }
//       }

//       if (finalTranscript) {
//         setTranscript(finalTranscript);
//         onResult?.(finalTranscript);
//       } else if (interimTranscript) {
//         setTranscript(interimTranscript);
//       }
//     };

//     recognitionRef.current.onerror = (event) => {
//       console.error('Speech recognition error:', event.error);
//       setIsListening(false);
//       onListeningChange?.(false);
//     };

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.abort();
//       }
//     };
//   }, [currentLang]);

//   const toggleListening = () => {
//     if (!recognitionRef.current) {
//       alert(t('blog.voiceNotSupported'));
//       return;
//     }

//     if (isListening) {
//       recognitionRef.current.stop();
//     } else {
//       setTranscript('');
//       recognitionRef.current.lang = getSpeechLanguage();
//       recognitionRef.current.start();
//     }
//   };

//   if (!isSupported) {
//     return null;
//   }

//   return (
//     <button
//       type="button"
//       onClick={toggleListening}
//       className={`relative p-2 rounded-lg transition-all duration-200 ${className} ${
//         isListening 
//           ? 'bg-red-500 text-white ring-2 ring-red-300 animate-pulse' 
//           : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
//       }`}
//       title={isListening ? t('blog.listening') : t('blog.voiceSearch')}
//     >
//       {isListening ? (
//         <>
//           <Mic className="h-5 w-5 animate-pulse" />
//           <span className="absolute -top-1 -right-1 flex h-3 w-3">
//             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//             <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
//           </span>
//         </>
//       ) : (
//         <Mic className="h-5 w-5" />
//       )}
//     </button>
//   );
// };

// export default VoiceSearch;












// client/src/components/blog/VoiceSearch.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Loader2, AlertCircle, Volume2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

const VoiceSearch = ({ onResult, onListeningChange, className = '', autoStopDelay = 3000 }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);
  const [volume, setVolume] = useState(0);
  const [interimText, setInterimText] = useState('');
  const recognitionRef = useRef(null);
  const autoStopTimeoutRef = useRef(null);
  const volumeIntervalRef = useRef(null);
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  // Get speech recognition language based on current UI language
  const getSpeechLanguage = () => {
    switch (currentLang) {
      case 'ur':
        return 'ur-PK';
      case 'hi':
        return 'hi-IN';
      case 'ar':
        return 'ar-SA';
      default:
        return 'en-US';
    }
  };

  // Get language display name
  const getLanguageName = () => {
    switch (currentLang) {
      case 'ur': return 'Urdu (پاکستان)';
      case 'hi': return 'Hindi (भारत)';
      case 'ar': return 'Arabic (العربية)';
      default: return 'English (US)';
    }
  };

  // Simulate volume meter (since Web Speech API doesn't provide volume)
  const startVolumeSimulation = () => {
    if (volumeIntervalRef.current) clearInterval(volumeIntervalRef.current);
    volumeIntervalRef.current = setInterval(() => {
      setVolume(Math.random() * 100);
    }, 100);
  };

  const stopVolumeSimulation = () => {
    if (volumeIntervalRef.current) {
      clearInterval(volumeIntervalRef.current);
      volumeIntervalRef.current = null;
    }
    setVolume(0);
  };

  // Auto-stop listening after delay of silence
  const resetAutoStopTimer = () => {
    if (autoStopTimeoutRef.current) {
      clearTimeout(autoStopTimeoutRef.current);
    }
    if (isListening) {
      autoStopTimeoutRef.current = setTimeout(() => {
        if (recognitionRef.current && isListening) {
          recognitionRef.current.stop();
          toast.info(t('blog.autoStopped'), { duration: 2000 });
        }
      }, autoStopDelay);
    }
  };

  useEffect(() => {
    // Check browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      setError('browser_not_supported');
      return;
    }

    // Check if browser has permission
    const checkMicrophonePermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
        return true;
      } catch (err) {
        console.error('Microphone permission denied:', err);
        setError('microphone_denied');
        return false;
      }
    };

    const initRecognition = async () => {
      const hasPermission = await checkMicrophonePermission();
      if (!hasPermission) return;

      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true; // Changed to true for better continuous listening
      recognitionRef.current.interimResults = true;
      recognitionRef.current.maxAlternatives = 3;
      recognitionRef.current.lang = getSpeechLanguage();

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setError(null);
        setTranscript('');
        setInterimText('');
        onListeningChange?.(true);
        startVolumeSimulation();
        resetAutoStopTimer();
        toast.success(`${t('blog.listening')} (${getLanguageName()})`, { duration: 1500 });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        setInterimText('');
        onListeningChange?.(false);
        stopVolumeSimulation();
        if (autoStopTimeoutRef.current) {
          clearTimeout(autoStopTimeoutRef.current);
        }
        
        // If we have a final transcript, don't show the auto-stop message again
        if (!transcript) {
          toast.info(t('blog.listeningStopped'), { duration: 1500 });
        }
      };

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        let confidence = 0;

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const transcriptText = result[0].transcript;
          const resultConfidence = result[0].confidence;
          
          if (result.isFinal) {
            finalTranscript += transcriptText;
            confidence = Math.max(confidence, resultConfidence);
          } else {
            interimTranscript += transcriptText;
          }
        }

        setInterimText(interimTranscript);
        
        if (finalTranscript) {
          setTranscript(finalTranscript);
          setInterimText('');
          
          // Show confidence indicator
          const confidencePercent = Math.round(confidence * 100);
          if (confidencePercent > 70) {
            toast.success(`Recognized: "${finalTranscript}"`, { duration: 2000 });
          } else if (confidencePercent > 40) {
            toast(`Heard: "${finalTranscript}" (${confidencePercent}% sure)`, { duration: 2000 });
          }
          
          onResult?.(finalTranscript);
          resetAutoStopTimer();
          
          // Auto-stop after getting a good result
          if (confidencePercent > 80) {
            setTimeout(() => {
              if (recognitionRef.current && isListening) {
                recognitionRef.current.stop();
              }
            }, 1000);
          }
        } else if (interimTranscript) {
          // Update interim text for live feedback
          resetAutoStopTimer();
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setError(event.error);
        
        let errorMessage = t('blog.voiceError');
        let errorTitle = 'Voice Search Error';
        
        switch (event.error) {
          case 'not-allowed':
            errorMessage = 'Microphone access denied. Please check browser permissions.';
            errorTitle = 'Permission Denied';
            break;
          case 'no-speech':
            errorMessage = 'No speech detected. Please try speaking again.';
            break;
          case 'audio-capture':
            errorMessage = 'No microphone found. Please connect a microphone.';
            break;
          case 'network':
            errorMessage = 'Network error. Please check your connection.';
            break;
          case 'aborted':
            errorMessage = 'Voice recognition was stopped.';
            break;
          case 'language-not-supported':
            errorMessage = `${getLanguageName()} is not supported in your browser. Try English.`;
            break;
          default:
            errorMessage = `Error: ${event.error}. Please try again.`;
        }
        
        toast.error(errorMessage, { duration: 4000, icon: '🎤' });
        setIsListening(false);
        setInterimText('');
        onListeningChange?.(false);
        stopVolumeSimulation();
      };
    };

    initRecognition();

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (autoStopTimeoutRef.current) {
        clearTimeout(autoStopTimeoutRef.current);
      }
      stopVolumeSimulation();
    };
  }, [currentLang, autoStopDelay]);

  const toggleListening = async () => {
    if (!recognitionRef.current) {
      toast.error(t('blog.voiceNotSupported'));
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setError(null);
      setTranscript('');
      setInterimText('');
      
      // Reset language before starting
      recognitionRef.current.lang = getSpeechLanguage();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      try {
        await recognitionRef.current.start();
      } catch (err) {
        console.error('Failed to start recognition:', err);
        
        // Handle case where recognition is already started
        if (err.message === 'Failed to execute \'start\' on \'SpeechRecognition\': recognition has already started.') {
          recognitionRef.current.stop();
          setTimeout(() => {
            recognitionRef.current.start();
          }, 100);
        } else {
          toast.error('Failed to start voice recognition. Please try again.');
        }
      }
    }
  };

  // Get volume level indicator
  const getVolumeLevel = () => {
    if (volume > 70) return 'high';
    if (volume > 30) return 'medium';
    if (volume > 0) return 'low';
    return 'none';
  };

  const volumeLevel = getVolumeLevel();

  if (!isSupported) {
    return (
      <div className="relative group">
        <button
          type="button"
          disabled
          className={`relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed ${className}`}
          title={t('blog.voiceNotSupported')}
        >
          <MicOff className="h-5 w-5" />
        </button>
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
          Voice search not supported in your browser
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleListening}
        className={`relative p-2 rounded-lg transition-all duration-200 ${className} ${
          isListening 
            ? 'bg-gradient-to-r from-red-500 to-red-600 text-white ring-2 ring-red-300 shadow-lg' 
            : error === 'microphone_denied'
            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
        title={isListening ? t('blog.listening') : error === 'microphone_denied' ? 'Microphone access required' : t('blog.voiceSearch')}
      >
        {isListening ? (
          <>
            <div className="relative">
              <Mic className="h-5 w-5 animate-pulse" />
              {/* Volume indicator rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`absolute w-8 h-8 rounded-full border-2 border-red-300 animate-ping ${
                  volumeLevel === 'high' ? 'opacity-100' : 'opacity-50'
                }`}></div>
                <div className={`absolute w-10 h-10 rounded-full border border-red-200 animate-pulse ${
                  volumeLevel === 'high' ? 'opacity-75' : 'opacity-25'
                }`} style={{ animationDelay: '0.3s' }}></div>
              </div>
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </>
        ) : error === 'microphone_denied' ? (
          <AlertCircle className="h-5 w-5" />
        ) : (
          <Mic className="h-5 w-5" />
        )}
      </button>

      {/* Live transcript display */}
      {isListening && (interimText || transcript) && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3 min-w-[200px] max-w-[300px]">
            <div className="flex items-center gap-2 mb-1">
              <Volume2 className="h-3 w-3 text-primary-500 animate-pulse" />
              <span className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                {t('blog.listening')}
              </span>
              <span className="text-xs text-gray-400 ml-auto">
                {getLanguageName()}
              </span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 break-words">
              {interimText || transcript}
              {interimText && <span className="inline-block w-0.5 h-4 bg-primary-500 ml-0.5 animate-blink"></span>}
            </p>
            {/* Volume meter */}
            <div className="mt-2 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-100 ${
                  volumeLevel === 'high' ? 'bg-green-500' : 
                  volumeLevel === 'medium' ? 'bg-yellow-500' : 
                  'bg-red-500'
                }`}
                style={{ width: `${volume}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1 text-center">
              {t('blog.speakNow')}
            </p>
          </div>
        </div>
      )}

      {/* Error tooltip */}
      {error === 'microphone_denied' && !isListening && (
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-yellow-500 text-white text-xs rounded whitespace-nowrap z-50">
          Allow microphone access to use voice search
        </div>
      )}
    </div>
  );
};

// Add this CSS to your global styles for the blinking cursor
const style = document.createElement('style');
style.textContent = `
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  .animate-blink {
    animation: blink 1s infinite;
  }
`;
if (!document.querySelector('#voice-search-styles')) {
  style.id = 'voice-search-styles';
  document.head.appendChild(style);
}

export default VoiceSearch;