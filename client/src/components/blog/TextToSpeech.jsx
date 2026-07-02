// // client/src/components/blog/TextToSpeech.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import { Volume2, Pause, Play, Loader2, SkipForward, SkipBack } from 'lucide-react';
// import { useTranslation } from 'react-i18next';
// import toast from 'react-hot-toast';

// const TextToSpeech = ({ content, title, className = '', autoDetectLanguage = true }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const [supported, setSupported] = useState(true);
//   const [availableVoices, setAvailableVoices] = useState([]);
//   const [selectedVoice, setSelectedVoice] = useState(null);
//   const [rate, setRate] = useState(0.9);
//   const [showControls, setShowControls] = useState(false);
//   const utteranceRef = useRef(null);
//   const { t, i18n } = useTranslation();
//   const currentLang = i18n.language;

//   // Language mapping for speech synthesis
//   const getSpeechLanguage = () => {
//     if (!autoDetectLanguage) return currentLang;
//     switch (currentLang) {
//       case 'ur':
//         return 'ur-PK';
//       case 'hi':
//         return 'hi-IN';
//       default:
//         return 'en-US';
//     }
//   };

//   // Get appropriate voice for the language
//   const getVoiceForLanguage = (speechSynthesis, language) => {
//     const voices = speechSynthesis.getVoices();
//     setAvailableVoices(voices);
    
//     // Try to find exact match first
//     let voice = voices.find(v => v.lang === language);
    
//     // If not found, try partial match
//     if (!voice) {
//       const langPrefix = language.split('-')[0];
//       voice = voices.find(v => v.lang.startsWith(langPrefix));
//     }
    
//     // Try to find a voice with the language in name
//     if (!voice) {
//       voice = voices.find(v => v.lang.includes(language) || v.name.includes(language));
//     }
    
//     return voice;
//   };

//   // Load voices when component mounts
//   useEffect(() => {
//     if (!('speechSynthesis' in window)) {
//       setSupported(false);
//       return;
//     }

//     const loadVoices = () => {
//       const voices = window.speechSynthesis.getVoices();
//       setAvailableVoices(voices);
//       const voice = getVoiceForLanguage(window.speechSynthesis, getSpeechLanguage());
//       setSelectedVoice(voice || voices[0]);
//     };

//     loadVoices();
//     window.speechSynthesis.onvoiceschanged = loadVoices;

//     return () => {
//       if (utteranceRef.current) {
//         window.speechSynthesis.cancel();
//       }
//     };
//   }, []);

//   // Clean text by removing HTML tags and special characters
//   const cleanText = (htmlText) => {
//     if (!htmlText) return '';
//     // Remove HTML tags
//     let text = htmlText.replace(/<[^>]*>/g, ' ');
//     // Remove extra whitespace
//     text = text.replace(/\s+/g, ' ').trim();
//     // Decode HTML entities
//     text = text.replace(/&nbsp;/g, ' ')
//                .replace(/&amp;/g, '&')
//                .replace(/&lt;/g, '<')
//                .replace(/&gt;/g, '>')
//                .replace(/&quot;/g, '"')
//                .replace(/&#39;/g, "'");
//     return text;
//   };

//   const speak = () => {
//     if (!supported) {
//       toast.error(t('blog.ttsNotSupported'));
//       return;
//     }

//     if (isPlaying && !isPaused) {
//       // Pause
//       window.speechSynthesis.cancel();
//       setIsPaused(true);
//       setIsPlaying(false);
//       return;
//     }

//     if (isPaused) {
//       // Resume
//       resume();
//       return;
//     }

//     const cleanContent = cleanText(content);
//     if (!cleanContent.trim()) {
//       toast.error(t('blog.noContentToRead'));
//       return;
//     }

//     setIsLoading(true);

//     // Cancel any ongoing speech
//     window.speechSynthesis.cancel();

//     // Create utterance
//     utteranceRef.current = new SpeechSynthesisUtterance(cleanContent);
    
//     // Set language
//     const speechLang = getSpeechLanguage();
//     utteranceRef.current.lang = speechLang;
    
//     // Set voice
//     if (selectedVoice) {
//       utteranceRef.current.voice = selectedVoice;
//     } else {
//       const voice = getVoiceForLanguage(window.speechSynthesis, speechLang);
//       if (voice) utteranceRef.current.voice = voice;
//     }
    
//     // Configure speech properties
//     utteranceRef.current.rate = rate;
//     utteranceRef.current.pitch = 1.0;
//     utteranceRef.current.volume = 1.0;

//     // Split content into sentences for better handling
//     const sentences = cleanContent.split(/[.!?]+/).filter(s => s.trim().length > 0);
//     let currentSentenceIndex = 0;

//     utteranceRef.current.onstart = () => {
//       setIsPlaying(true);
//       setIsPaused(false);
//       setIsLoading(false);
//       toast.success(t('blog.readingStarted'));
//     };
    
//     utteranceRef.current.onend = () => {
//       if (currentSentenceIndex < sentences.length - 1) {
//         currentSentenceIndex++;
//         const nextUtterance = new SpeechSynthesisUtterance(sentences[currentSentenceIndex]);
//         nextUtterance.lang = speechLang;
//         nextUtterance.rate = rate;
//         if (selectedVoice) nextUtterance.voice = selectedVoice;
//         window.speechSynthesis.speak(nextUtterance);
//       } else {
//         setIsPlaying(false);
//         setIsPaused(false);
//         toast.success(t('blog.readingCompleted'));
//       }
//     };
    
//     utteranceRef.current.onerror = (event) => {
//       console.error('Speech synthesis error:', event);
//       setIsPlaying(false);
//       setIsPaused(false);
//       setIsLoading(false);
//       toast.error(t('blog.ttsError'));
//     };

//     // Start speaking
//     window.speechSynthesis.speak(utteranceRef.current);
//   };

//   const resume = () => {
//     if (!utteranceRef.current) {
//       speak();
//       return;
//     }
//     window.speechSynthesis.resume();
//     setIsPlaying(true);
//     setIsPaused(false);
//   };

//   const stop = () => {
//     window.speechSynthesis.cancel();
//     setIsPlaying(false);
//     setIsPaused(false);
//     setIsLoading(false);
//   };

//   const changeVoice = (voiceName) => {
//     const voice = availableVoices.find(v => v.name === voiceName);
//     if (voice) {
//       setSelectedVoice(voice);
//       if (isPlaying || isPaused) {
//         // Restart with new voice
//         stop();
//         setTimeout(() => speak(), 100);
//       }
//     }
//   };

//   const changeRate = (newRate) => {
//     setRate(newRate);
//     if (isPlaying || isPaused) {
//       stop();
//       setTimeout(() => speak(), 100);
//     }
//   };

//   if (!supported) return null;

//   return (
//     <div className={`relative ${className}`}>
//       <button
//         onClick={() => setShowControls(!showControls)}
//         className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//         title={t('blog.listenToBlog')}
//       >
//         <Volume2 className="h-4 w-4" />
//         <span className="text-sm hidden sm:inline">{t('blog.listenToBlog')}</span>
//       </button>

//       {showControls && (
//         <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-50">
//           <div className="flex items-center justify-between mb-3">
//             <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
//               {t('blog.audioPlayer')}
//             </h4>
//             <button
//               onClick={() => setShowControls(false)}
//               className="text-gray-400 hover:text-gray-600"
//             >
//               ✕
//             </button>
//           </div>
          
//           <div className="flex items-center justify-center gap-3 mb-4">
//             {isPlaying ? (
//               <button
//                 onClick={speak}
//                 className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
//                 title={t('blog.pause')}
//               >
//                 <Pause className="h-5 w-5" />
//               </button>
//             ) : isLoading ? (
//               <button className="p-2 rounded-full bg-gray-400 text-white cursor-wait">
//                 <Loader2 className="h-5 w-5 animate-spin" />
//               </button>
//             ) : (
//               <button
//                 onClick={speak}
//                 className="p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition"
//                 title={t('blog.play')}
//               >
//                 <Play className="h-5 w-5" />
//               </button>
//             )}
            
//             <button
//               onClick={stop}
//               disabled={!isPlaying && !isPaused}
//               className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 disabled:opacity-50 transition"
//               title={t('blog.stop')}
//             >
//               <Volume2 className="h-5 w-5" />
//             </button>
//           </div>

//           {/* Voice Selection */}
//           <div className="mb-3">
//             <label className="text-xs text-gray-500 mb-1 block">{t('blog.voice')}</label>
//             <select
//               value={selectedVoice?.name || ''}
//               onChange={(e) => changeVoice(e.target.value)}
//               className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 bg-gray-50 dark:bg-gray-900"
//             >
//               <option value="">Default Voice</option>
//               {availableVoices.map((voice) => (
//                 <option key={voice.name} value={voice.name}>
//                   {voice.name} ({voice.lang})
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Speed Control */}
//           <div className="mb-2">
//             <label className="text-xs text-gray-500 mb-1 block">
//               {t('blog.speed')}: {rate.toFixed(1)}x
//             </label>
//             <input
//               type="range"
//               min="0.5"
//               max="2"
//               step="0.1"
//               value={rate}
//               onChange={(e) => changeRate(parseFloat(e.target.value))}
//               className="w-full"
//             />
//           </div>

//           <div className="text-xs text-gray-400 text-center mt-2">
//             {title && <p className="truncate">{title}</p>}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TextToSpeech;












// client/src/components/TextToSpeech.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Pause, Play, Loader2, Settings, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const TextToSpeech = ({ content, title, className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [supported, setSupported] = useState(true);
  const [availableVoices, setAvailableVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [rate, setRate] = useState(0.9);
  const [pitch, setPitch] = useState(1.0);
  const [showControls, setShowControls] = useState(false);
  const utteranceRef = useRef(null);
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  // Get appropriate language code for speech
  const getSpeechLanguage = () => {
    switch (currentLang) {
      case 'ur': return 'ur-PK';
      case 'hi': return 'hi-IN';
      default: return 'en-US';
    }
  };

  // Load available voices
  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setSupported(false);
      return;
    }

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      console.log('Available voices:', voices.map(v => ({ name: v.name, lang: v.lang })));
      
      setAvailableVoices(voices);
      
      // Try to find a good voice for the current language
      const targetLang = getSpeechLanguage();
      let bestVoice = null;
      
      // Priority order for Urdu/Hindi voices
      const preferredVoices = [
        'Google हिन्दी', 'Google हिंदी', 'Google Hindi',
        'Google Urdu', 'Microsoft Zira', 'Microsoft David',
        'Samantha', 'Alex', 'Google UK English Female'
      ];
      
      // First try to find exact language match
      bestVoice = voices.find(v => v.lang === targetLang);
      
      // If not found, try preferred voices
      if (!bestVoice) {
        for (const pref of preferredVoices) {
          bestVoice = voices.find(v => v.name.includes(pref));
          if (bestVoice) break;
        }
      }
      
      // Fallback to any voice that supports the language family
      if (!bestVoice && targetLang.startsWith('ur')) {
        bestVoice = voices.find(v => v.lang.startsWith('ur') || v.lang === 'hi-IN');
      }
      
      // Last fallback to first available voice
      if (!bestVoice && voices.length > 0) {
        bestVoice = voices[0];
      }
      
      setSelectedVoice(bestVoice);
    };

    loadVoices();
    
    // Chrome requires this event listener
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (utteranceRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentLang]);

  // Clean HTML content for text-to-speech
  const cleanText = (htmlText) => {
    if (!htmlText) return '';
    // Remove HTML tags
    let text = htmlText.replace(/<[^>]*>/g, ' ');
    // Remove extra whitespace
    text = text.replace(/\s+/g, ' ').trim();
    // Decode HTML entities
    text = text.replace(/&nbsp;/g, ' ')
               .replace(/&amp;/g, '&')
               .replace(/&lt;/g, '<')
               .replace(/&gt;/g, '>')
               .replace(/&quot;/g, '"')
               .replace(/&#39;/g, "'")
               .replace(/&[a-z]+;/gi, ' ');
    return text;
  };

  // Split text into smaller chunks for better handling
  const splitTextIntoChunks = (text, maxChunkLength = 300) => {
    const sentences = text.split(/(?<=[.!?।؟])\s+/);
    const chunks = [];
    let currentChunk = '';
    
    for (const sentence of sentences) {
      if ((currentChunk + sentence).length <= maxChunkLength) {
        currentChunk += (currentChunk ? ' ' : '') + sentence;
      } else {
        if (currentChunk) chunks.push(currentChunk);
        currentChunk = sentence;
      }
    }
    if (currentChunk) chunks.push(currentChunk);
    
    return chunks;
  };

  const speakChunk = (chunks, index = 0) => {
    if (index >= chunks.length) {
      setIsPlaying(false);
      setIsPaused(false);
      setIsLoading(false);
      toast.success(t('blog.readingCompleted'));
      return;
    }

    utteranceRef.current = new SpeechSynthesisUtterance(chunks[index]);
    utteranceRef.current.lang = getSpeechLanguage();
    
    if (selectedVoice) {
      utteranceRef.current.voice = selectedVoice;
    }
    
    utteranceRef.current.rate = rate;
    utteranceRef.current.pitch = pitch;
    utteranceRef.current.volume = 1.0;

    utteranceRef.current.onend = () => {
      if (!isPaused) {
        speakChunk(chunks, index + 1);
      }
    };
    
    utteranceRef.current.onerror = (event) => {
      console.error('Speech error:', event);
      // Try next chunk if this one fails
      if (!isPaused) {
        speakChunk(chunks, index + 1);
      }
    };

    window.speechSynthesis.speak(utteranceRef.current);
  };

  const speak = () => {
    if (!supported) {
      toast.error(t('blog.ttsNotSupported'));
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    if (isPlaying && !isPaused) {
      // Pause
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
      return;
    }

    if (isPaused) {
      // Resume
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    const cleanContent = cleanText(content);
    if (!cleanContent.trim()) {
      toast.error(t('blog.noContentToRead'));
      return;
    }

    setIsLoading(true);
    
    // Split content into manageable chunks
    const chunks = splitTextIntoChunks(cleanContent);
    
    if (chunks.length === 0) {
      setIsLoading(false);
      toast.error(t('blog.noContentToRead'));
      return;
    }

    setIsPlaying(true);
    setIsPaused(false);
    toast.success(`${t('blog.readingStarted')} (${chunks.length} parts)`);
    
    speakChunk(chunks, 0);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setIsLoading(false);
  };

  const testVoice = () => {
    if (!selectedVoice) {
      toast.error('Please select a voice first');
      return;
    }
    
    const testPhrase = currentLang === 'ur' 
      ? 'السلام علیکم، یہ ایک ٹیسٹ ہے۔'
      : currentLang === 'hi'
      ? 'नमस्ते, यह एक परीक्षण है।'
      : 'Hello, this is a test.';
    
    const utterance = new SpeechSynthesisUtterance(testPhrase);
    utterance.voice = selectedVoice;
    utterance.rate = rate;
    utterance.pitch = pitch;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  if (!supported) return null;

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setShowControls(!showControls)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
        title={t('blog.listenToBlog')}
      >
        <Volume2 className="h-4 w-4" />
        <span className="text-sm hidden sm:inline">{t('blog.listenToBlog')}</span>
      </button>

      {showControls && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-50">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
              {t('blog.audioPlayer')}
            </h4>
            <div className="flex items-center gap-2">
              <button
                onClick={testVoice}
                className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded hover:bg-primary-200"
              >
                Test Voice
              </button>
              <button 
                onClick={() => setShowControls(false)} 
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            {isPlaying ? (
              <button onClick={speak} className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition">
                <Pause className="h-5 w-5" />
              </button>
            ) : isLoading ? (
              <button className="p-2 rounded-full bg-gray-400 text-white cursor-wait">
                <Loader2 className="h-5 w-5 animate-spin" />
              </button>
            ) : (
              <button onClick={speak} className="p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition">
                <Play className="h-5 w-5" />
              </button>
            )}
            <button 
              onClick={stop} 
              disabled={!isPlaying && !isPaused} 
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 disabled:opacity-50 transition"
            >
              <Volume2 className="h-5 w-5" />
            </button>
          </div>

          <div className="mb-3">
            <label className="text-xs text-gray-500 mb-1 block flex items-center justify-between">
              <span>{t('blog.voice')}</span>
              <span className="text-xs text-primary-500">{selectedVoice?.lang || getSpeechLanguage()}</span>
            </label>
            <select
              value={selectedVoice?.name || ''}
              onChange={(e) => {
                const voice = availableVoices.find(v => v.name === e.target.value);
                setSelectedVoice(voice);
              }}
              className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 bg-gray-50 dark:bg-gray-900"
            >
              <option value="">Default Voice</option>
              {availableVoices.map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="text-xs text-gray-500 mb-1 block">
              {t('blog.speed')}: {rate.toFixed(1)}x
            </label>
            <input 
              type="range" 
              min="0.5" 
              max="2" 
              step="0.1" 
              value={rate} 
              onChange={(e) => setRate(parseFloat(e.target.value))} 
              className="w-full"
            />
          </div>

          <div className="mb-3">
            <label className="text-xs text-gray-500 mb-1 block">
              {t('blog.pitch')}: {pitch.toFixed(1)}
            </label>
            <input 
              type="range" 
              min="0.5" 
              max="2" 
              step="0.1" 
              value={pitch} 
              onChange={(e) => setPitch(parseFloat(e.target.value))} 
              className="w-full"
            />
          </div>

          <div className="text-xs text-gray-400 text-center mt-2">
            {title && <p className="truncate">{title}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default TextToSpeech;