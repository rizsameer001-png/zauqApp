
// // client/src/pages/public/AudioListPage.jsx
// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useSearchParams, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useQuery } from '@tanstack/react-query';
// import {
//   Search, Headphones, Play, Clock, Eye,
//   Grid, List, Loader2, AlertCircle,
//   ChevronLeft, ChevronRight, Mic, MicOff,
//   Volume2, VolumeX, Zap, X, Pause, SkipForward, SkipBack
// } from 'lucide-react';
// import audioAPI from '../../api/audioAPI';
// import { AUDIO_CATEGORIES } from '../../utils/constants.js';
// import { useAudioPlayer } from '../../context/AudioPlayerContext';
// import toast from 'react-hot-toast';

// const AudioListPage = () => {
//   const { t } = useTranslation();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [viewMode, setViewMode] = useState('grid');
//   const [sortBy, setSortBy] = useState('popular');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isListening, setIsListening] = useState(false);
//   const [voiceSupported, setVoiceSupported] = useState(true);
//   const [voiceTranscript, setVoiceTranscript] = useState('');
//   const recognitionRef = useRef(null);
//   const itemsPerPage = 9;

//   // Get audio player functions
//   const { 
//     currentAudio, 
//     isPlaying, 
//     playAudio, 
//     pauseAudio, 
//     resumeAudio,
//     nextAudio,
//     previousAudio,
//     handleVoiceCommand 
//   } = useAudioPlayer();

//   // Initialize speech recognition
//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
//     if (!SpeechRecognition) {
//       setVoiceSupported(false);
//       console.warn('Speech recognition not supported in this browser');
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.continuous = false;
//     recognition.interimResults = true;
//     recognition.lang = 'ur-PK'; // Urdu language, also supports en-US, hi-IN

//     recognition.onstart = () => {
//       setIsListening(true);
//       toast.success('Listening... Speak now');
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//     };

//     recognition.onresult = (event) => {
//       const transcript = Array.from(event.results)
//         .map(result => result[0].transcript)
//         .join('');
      
//       setVoiceTranscript(transcript);
      
//       if (event.results[0].isFinal) {
//         // Process the voice command
//         processVoiceCommand(transcript);
//       }
//     };

//     recognition.onerror = (event) => {
//       console.error('Speech recognition error:', event.error);
//       setIsListening(false);
      
//       if (event.error === 'not-allowed') {
//         toast.error('Microphone access denied. Please allow microphone access.');
//       } else if (event.error === 'no-speech') {
//         toast.error('No speech detected. Please try again.');
//       } else {
//         toast.error('Voice recognition failed. Please try again.');
//       }
//     };

//     recognitionRef.current = recognition;

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//       }
//     };
//   }, []);

//   // Process voice commands
//   const processVoiceCommand = async (command) => {
//     const lowerCommand = command.toLowerCase();
//     console.log('Voice command:', command);
    
//     // Volume control commands
//     if (lowerCommand.includes('volume up') || lowerCommand.includes('louder') || lowerCommand.includes('increase volume')) {
//       const audioElement = document.querySelector('audio');
//       if (audioElement && !audioElement.muted) {
//         let newVolume = Math.min(audioElement.volume + 0.1, 1);
//         audioElement.volume = newVolume;
//         toast.success(`Volume: ${Math.round(newVolume * 100)}%`);
//       } else {
//         toast.error('No audio playing');
//       }
//       return;
//     }
    
//     if (lowerCommand.includes('volume down') || lowerCommand.includes('softer') || lowerCommand.includes('decrease volume')) {
//       const audioElement = document.querySelector('audio');
//       if (audioElement && !audioElement.muted) {
//         let newVolume = Math.max(audioElement.volume - 0.1, 0);
//         audioElement.volume = newVolume;
//         toast.success(`Volume: ${Math.round(newVolume * 100)}%`);
//       } else {
//         toast.error('No audio playing');
//       }
//       return;
//     }
    
//     if (lowerCommand.includes('mute') || lowerCommand.includes('silence')) {
//       const audioElement = document.querySelector('audio');
//       if (audioElement) {
//         audioElement.muted = true;
//         toast.success('Audio muted');
//       }
//       return;
//     }
    
//     if (lowerCommand.includes('unmute') || lowerCommand.includes('sound on')) {
//       const audioElement = document.querySelector('audio');
//       if (audioElement) {
//         audioElement.muted = false;
//         toast.success('Audio unmuted');
//       }
//       return;
//     }
    
//     // Playback control commands
//     if (lowerCommand.includes('play')) {
//       // Check if it's a specific song request
//       let searchTerms = command.replace(/play|चलाएं|چلائیں/gi, '').trim();
      
//       if (searchTerms) {
//         toast.loading(`Searching for "${searchTerms}"...`, { id: 'voice-play' });
        
//         try {
//           const response = await audioAPI.searchAudio(searchTerms, { limit: 10 });
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
//         toast.success('Resumed playback');
//       } else {
//         toast.error('Please specify what to play or say "play [song name]"');
//       }
//       return;
//     }
    
//     if (lowerCommand.includes('pause') || lowerCommand.includes('stop')) {
//       pauseAudio();
//       toast.success('Audio paused');
//       return;
//     }
    
//     if (lowerCommand.includes('resume') || lowerCommand.includes('continue')) {
//       if (currentAudio) {
//         resumeAudio();
//         toast.success('Audio resumed');
//       } else {
//         toast.error('No audio to resume');
//       }
//       return;
//     }
    
//     if (lowerCommand.includes('next') || lowerCommand.includes('skip')) {
//       nextAudio();
//       return;
//     }
    
//     if (lowerCommand.includes('previous') || lowerCommand.includes('back')) {
//       previousAudio();
//       return;
//     }
    
//     // Category filter commands
//     const categoryCommands = {
//       'nauha': 'nauha',
//       'नौहा': 'nauha',
//       'نوحہ': 'nauha',
//       'marsiya': 'marsiya',
//       'मरसिया': 'marsiya',
//       'مرثیہ': 'marsiya',
//       'soz': 'soz',
//       'सोज़': 'soz',
//       'سوز': 'soz',
//       'salam': 'salam',
//       'सलाम': 'salam',
//       'سلام': 'salam',
//       'naat': 'naat',
//       'नात': 'naat',
//       'نعت': 'naat',
//       'hamd': 'hamd',
//       'हम्द': 'hamd',
//       'حمد': 'hamd',
//       'manqabat': 'manqabat',
//       'मनक़बत': 'manqabat',
//       'منقبت': 'manqabat',
//       'ghazal': 'ghazal',
//       'ग़ज़ल': 'ghazal',
//       'غزل': 'ghazal',
//       'nazm': 'nazm',
//       'नज़्म': 'nazm',
//       'نظم': 'nazm',
//       'podcast': 'podcast',
//       'पॉडकास्ट': 'podcast',
//       'پوڈکاسٹ': 'podcast',
//       'audiobook': 'audiobook',
//       'ऑडियोबुक': 'audiobook',
//       'آڈیو بک': 'audiobook'
//     };
    
//     for (const [keyword, category] of Object.entries(categoryCommands)) {
//       if (lowerCommand.includes(keyword)) {
//         setActiveCategory(category);
//         setSearchQuery('');
//         setCurrentPage(1);
//         toast.success(`Showing ${category} audio`);
//         return;
//       }
//     }
    
//     // Show all command
//     if (lowerCommand.includes('all') || lowerCommand.includes('सभी') || lowerCommand.includes('سب') || 
//         lowerCommand.includes('show all') || lowerCommand.includes('सब दिखाएं') || lowerCommand.includes('سب دکھائیں')) {
//       setActiveCategory('all');
//       setSearchQuery('');
//       setCurrentPage(1);
//       toast.success('Showing all audio');
//       return;
//     }
    
//     // Search command
//     if (lowerCommand.includes('search') || lowerCommand.includes('खोजें') || lowerCommand.includes('تلاش کریں')) {
//       let searchTerms = command.replace(/search|खोजें|تلاش کریں/gi, '').trim();
      
//       if (searchTerms) {
//         setSearchQuery(searchTerms);
//         setActiveCategory('all');
//         setCurrentPage(1);
//         toast.success(`Searching for: ${searchTerms}`);
//       } else {
//         toast.error('Please specify what to search for');
//       }
//       return;
//     }
    
//     // Default: Just search with the command if it's longer than 2 characters
//     if (command.length > 3 && !lowerCommand.includes('play')) {
//       setSearchQuery(command);
//       setActiveCategory('all');
//       setCurrentPage(1);
//       toast.success(`Searching for: ${command}`);
//     } else if (command.length <= 3) {
//       toast.error('Command not recognized. Try saying "play nauha" or "search ghazal"');
//     }
//   };

//   const startVoiceSearch = () => {
//     if (!voiceSupported) {
//       toast.error('Voice search is not supported in your browser');
//       return;
//     }
    
//     if (recognitionRef.current) {
//       try {
//         recognitionRef.current.start();
//       } catch (error) {
//         console.error('Error starting recognition:', error);
//         toast.error('Failed to start voice recognition');
//       }
//     }
//   };

//   const stopVoiceSearch = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//     }
//   };

//   const { data: response, isLoading, error, refetch } = useQuery({
//     queryKey: ['audio', currentPage, activeCategory, sortBy, searchQuery],
//     queryFn: () => audioAPI.getAudioItems({
//       page: currentPage,
//       limit: itemsPerPage,
//       type: activeCategory !== 'all' ? activeCategory.toLowerCase() : undefined,
//       search: searchQuery || undefined,
//       sort: sortBy
//     }),
//     enabled: true,
//     staleTime: 30000
//   });

//   const audioData = response?.data?.data || response?.data || response || [];
//   const audioItems = Array.isArray(audioData) ? audioData : [];
//   const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 };

//   useEffect(() => {
//     if (activeCategory && activeCategory !== 'all') {
//       setSearchParams({ category: activeCategory, ...(searchQuery && { search: searchQuery }) });
//     } else {
//       setSearchParams(searchQuery ? { search: searchQuery } : {});
//     }
//     setCurrentPage(1);
//   }, [activeCategory, searchQuery, setSearchParams]);

//   const goToPage = (page) => {
//     if (page >= 1 && page <= (pagination.totalPages || 1)) {
//       setCurrentPage(page);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const formatDuration = (seconds) => {
//     if (!seconds) return 'N/A';
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return hrs > 0
//       ? `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
//       : `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   const formatPlays = (plays) => {
//     if (!plays) return '0';
//     if (plays >= 1000000) return `${(plays / 1000000).toFixed(1)}M`;
//     if (plays >= 1000) return `${(plays / 1000).toFixed(1)}K`;
//     return plays.toString();
//   };

//   const clearFilters = () => {
//     setSearchQuery('');
//     setActiveCategory('all');
//     setSortBy('popular');
//     setCurrentPage(1);
//     toast.success('Filters cleared');
//   };

//   const getCategoryDisplayName = (type) => {
//     const category = AUDIO_CATEGORIES.find(cat => cat.id === type?.toLowerCase());
//     return category?.label || type || 'Audio';
//   };

//   // Now playing bar component
//   const NowPlayingBar = () => {
//     if (!currentAudio) return null;
    
//     return (
//       <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg z-50">
//         <div className="max-w-7xl mx-auto px-4 py-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4 flex-1">
//               <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
//                 <Headphones className="h-6 w-6" />
//               </div>
//               <div className="flex-1">
//                 <p className="font-medium text-sm truncate">{currentAudio.title}</p>
//                 <p className="text-xs text-gray-400">
//                   {currentAudio.author?.name || 'Unknown Artist'}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={previousAudio}
//                 className="p-2 hover:bg-white/10 rounded-full transition"
//               >
//                 <SkipBack className="h-5 w-5" />
//               </button>
//               <button
//                 onClick={isPlaying ? pauseAudio : resumeAudio}
//                 className="p-3 bg-primary-600 hover:bg-primary-700 rounded-full transition"
//               >
//                 {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
//               </button>
//               <button
//                 onClick={nextAudio}
//                 className="p-2 hover:bg-white/10 rounded-full transition"
//               >
//                 <SkipForward className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   /* ================= LOADING ================= */
//   if (isLoading && audioItems.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
//         <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   /* ================= ERROR ================= */
//   if (error && audioItems.length === 0) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
//         <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
//         <h2 className="text-xl font-semibold mb-2">Failed to load audio</h2>
//         <p className="text-gray-500 mb-4">Please check your connection and try again</p>
//         <button onClick={() => refetch()} className="btn-primary">Retry</button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 via-white to-gray-100">
//       {/* Now Playing Bar */}
//       <NowPlayingBar />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         {/* HEADER */}
//         <div className="mb-10 text-center">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
//             {t('common.audio', 'Audio Library')}
//           </h1>
//           <p className="text-gray-500 mt-2">
//             Discover premium Urdu audio experiences
//           </p>
          
//           {/* Voice Search Badge */}
//           {voiceSupported && (
//             <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-primary-50 text-primary-600 text-sm rounded-full">
//               <Mic className="h-4 w-4" />
//               <span>Voice search available - Click the mic to speak</span>
//             </div>
//           )}
//         </div>

//         {/* CONTROLS */}
//         <div className="sticky top-20 z-10 bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-4 mb-8 shadow-sm flex flex-col md:flex-row gap-4">

//           {/* SEARCH with Voice */}
//           <div className="flex-1 relative">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
//             <input
//               type="text"
//               placeholder={isListening ? "Listening..." : "Search audio by title, artist, or type..."}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-11 pr-24 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 bg-white"
//             />
            
//             {/* Voice Search Button */}
//             {voiceSupported && (
//               <button
//                 onClick={isListening ? stopVoiceSearch : startVoiceSearch}
//                 className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${
//                   isListening 
//                     ? 'bg-red-500 text-white animate-pulse' 
//                     : 'bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-600'
//                 }`}
//                 title={isListening ? "Stop listening" : "Voice search"}
//               >
//                 {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
//               </button>
//             )}
            
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery('')}
//                 className="absolute right-14 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200"
//               >
//                 <X className="h-4 w-4 text-gray-400" />
//               </button>
//             )}
//           </div>

//           {/* Voice Transcript Display */}
//           {voiceTranscript && !isListening && (
//             <div className="text-xs text-primary-600 bg-primary-50 px-3 py-1 rounded-full flex items-center gap-1">
//               <Volume2 className="h-3 w-3" />
//               <span>"{voiceTranscript}"</span>
//               <button onClick={() => setVoiceTranscript('')} className="ml-1">
//                 <X className="h-3 w-3" />
//               </button>
//             </div>
//           )}

//           {/* SORT */}
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-primary-500"
//           >
//             <option value="popular">Most Popular</option>
//             <option value="recent">Newest First</option>
//             <option value="plays">Most Played</option>
//             <option value="oldest">Oldest First</option>
//           </select>

//           {/* VIEW MODE */}
//           <div className="flex rounded-xl border overflow-hidden bg-white">
//             <button
//               onClick={() => setViewMode('grid')}
//               className={`p-3 transition-colors ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
//               title="Grid view"
//             >
//               <Grid className="h-5 w-5" />
//             </button>
//             <button
//               onClick={() => setViewMode('list')}
//               className={`p-3 transition-colors ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
//               title="List view"
//             >
//               <List className="h-5 w-5" />
//             </button>
//           </div>

//           {/* Clear Filters */}
//           {(searchQuery || activeCategory !== 'all' || sortBy !== 'popular') && (
//             <button
//               onClick={clearFilters}
//               className="px-4 py-3 text-gray-600 hover:text-gray-800 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
//             >
//               Clear All
//             </button>
//           )}
//         </div>

//         {/* Voice Command Examples */}
//         {voiceSupported && (
//           <div className="mb-6 p-4 bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl">
//             <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
//               <Zap className="h-4 w-4 text-primary-600" />
//               <span className="font-medium">Voice Commands Examples:</span>
//             </div>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
//               <div className="space-y-1">
//                 <p className="font-medium text-primary-600">Playback:</p>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"Play Alvida Alvida"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block ml-1">"Pause"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block ml-1">"Resume"</span>
//               </div>
//               <div className="space-y-1">
//                 <p className="font-medium text-primary-600">Navigation:</p>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"Next"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block ml-1">"Previous"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block ml-1">"Skip"</span>
//               </div>
//               <div className="space-y-1">
//                 <p className="font-medium text-primary-600">Volume:</p>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"Volume up"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block ml-1">"Mute"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block ml-1">"Louder"</span>
//               </div>
//               <div className="space-y-1">
//                 <p className="font-medium text-primary-600">Categories:</p>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"Show nauha"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block ml-1">"Search ghazal"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block ml-1">"Marsiya"</span>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* CATEGORY PILLS */}
//         <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
//           <button
//             onClick={() => setActiveCategory('all')}
//             className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
//               activeCategory === 'all'
//                 ? 'bg-primary-600 text-white shadow-md'
//                 : 'bg-white border border-gray-200 hover:bg-gray-50'
//             }`}
//           >
//             All Audio
//           </button>
//           {AUDIO_CATEGORIES.map(cat => (
//             <button
//               key={cat.id}
//               onClick={() => setActiveCategory(cat.id)}
//               className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1 ${
//                 activeCategory === cat.id
//                   ? 'bg-primary-600 text-white shadow-md'
//                   : 'bg-white border border-gray-200 hover:bg-gray-50'
//               }`}
//             >
//               <span>{cat.icon}</span>
//               <span>{cat.label}</span>
//             </button>
//           ))}
//         </div>

//         {/* RESULTS COUNT */}
//         <div className="mb-4 text-sm text-gray-500">
//           Found {pagination.total || audioItems.length} audio items
//           {searchQuery && <span> matching "{searchQuery}"</span>}
//           {activeCategory !== 'all' && <span> in {activeCategory}</span>}
//         </div>

//         {/* EMPTY STATE */}
//         {audioItems.length === 0 ? (
//           <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
//             <Headphones className="mx-auto h-12 w-12 text-gray-300 mb-4" />
//             <p className="text-gray-500">No audio found</p>
//             {(searchQuery || activeCategory !== 'all') && (
//               <button onClick={clearFilters} className="text-primary-600 mt-2 hover:underline">
//                 Clear filters to see all audio
//               </button>
//             )}
//           </div>
//         ) : (
//           <>
//             {/* GRID/LIST VIEW */}
//             <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
//               {audioItems.map((audio, index) => (
//                 <motion.div
//                   key={audio._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: Math.min(index * 0.05, 0.5) }}
//                 >
//                   <div className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
//                     <Link to={`/audio/${audio.slug}`}>
//                       <div className={`${viewMode === 'list' ? 'flex' : ''}`}>
//                         {/* IMAGE */}
//                         <div className={`${viewMode === 'list' ? 'w-40 md:w-60' : 'w-full'} relative overflow-hidden`}>
//                           <img
//                             src={audio.thumbnail || audio.coverImage || 'https://via.placeholder.com/300x300?text=Audio'}
//                             alt={audio.title}
//                             className="w-full aspect-square object-cover group-hover:scale-110 transition duration-500"
//                             onError={(e) => {
//                               e.target.src = 'https://via.placeholder.com/300x300?text=Audio';
//                             }}
//                           />
//                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                             <div className="bg-white/90 p-3 rounded-full transform scale-90 group-hover:scale-110 transition">
//                               <Play className="text-primary-600 h-6 w-6 ml-0.5" />
//                             </div>
//                           </div>
//                           {audio.duration && (
//                             <div className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded-md flex items-center gap-1">
//                               <Clock className="h-3 w-3" />
//                               {formatDuration(audio.duration)}
//                             </div>
//                           )}
//                           {audio.isPremium && (
//                             <div className="absolute top-2 right-2 px-2 py-1 bg-yellow-500 text-white text-xs rounded-md">
//                               Premium
//                             </div>
//                           )}
//                         </div>

//                         {/* CONTENT */}
//                         <div className="p-5 flex-1">
//                           <div className="flex items-center gap-2 mb-2">
//                             <span className="px-2 py-0.5 bg-primary-50 text-primary-600 text-xs rounded-full capitalize">
//                               {getCategoryDisplayName(audio.type)}
//                             </span>
//                             {audio.language && (
//                               <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
//                                 {audio.language}
//                               </span>
//                             )}
//                           </div>

//                           <h3 className="font-semibold text-lg group-hover:text-primary-600 line-clamp-2 transition-colors">
//                             {audio.title}
//                           </h3>

//                           {audio.author && (
//                             <p className="text-sm text-gray-500 mt-1">
//                               {typeof audio.author === 'object' ? audio.author.name : audio.author}
//                             </p>
//                           )}

//                           {audio.description && (
//                             <p className="text-sm text-gray-500 mt-2 line-clamp-2">
//                               {audio.description}
//                             </p>
//                           )}

//                           <div className="flex gap-4 text-sm text-gray-400 mt-3">
//                             <span className="flex items-center gap-1">
//                               <Play className="h-4 w-4" /> {formatPlays(audio.stats?.plays)}
//                             </span>
//                             <span className="flex items-center gap-1">
//                               <Eye className="h-4 w-4" /> {formatPlays(audio.stats?.views)}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
                    
//                     {/* Quick Play Button */}
//                     <div className="px-5 pb-4">
//                       <button
//                         onClick={() => playAudio(audio, audioItems, index)}
//                         className="w-full py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg flex items-center justify-center gap-2 transition"
//                       >
//                         <Play className="h-4 w-4" />
//                         <span>Play Now</span>
//                       </button>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* PAGINATION */}
//             {(pagination.totalPages || 1) > 1 && (
//               <div className="flex justify-center gap-2 mt-12">
//                 <button
//                   onClick={() => goToPage(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="p-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                 >
//                   <ChevronLeft className="h-5 w-5" />
//                 </button>

//                 {[...Array(Math.min(pagination.totalPages || 1, 7))].map((_, i) => {
//                   let pageNum;
//                   const totalPages = pagination.totalPages || 1;
                  
//                   if (totalPages <= 7) {
//                     pageNum = i + 1;
//                   } else if (currentPage <= 4) {
//                     pageNum = i + 1;
//                     if (i === 6) pageNum = totalPages;
//                   } else if (currentPage >= totalPages - 3) {
//                     pageNum = totalPages - 6 + i;
//                   } else {
//                     pageNum = currentPage - 3 + i;
//                     if (i === 0) pageNum = 1;
//                     if (i === 6) pageNum = totalPages;
//                   }
                  
//                   if (i === 5 && totalPages > 7 && currentPage > 4 && currentPage < totalPages - 3) {
//                     return <span key="ellipsis" className="px-4 py-2">...</span>;
//                   }
                  
//                   return (
//                     <button
//                       key={pageNum}
//                       onClick={() => goToPage(pageNum)}
//                       className={`px-4 py-2 rounded-lg ${
//                         currentPage === pageNum
//                           ? 'bg-primary-600 text-white'
//                           : 'bg-white border hover:bg-gray-50'
//                       }`}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 })}

//                 <button
//                   onClick={() => goToPage(currentPage + 1)}
//                   disabled={currentPage === (pagination.totalPages || 1)}
//                   className="p-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                 >
//                   <ChevronRight className="h-5 w-5" />
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AudioListPage;
























// // client/src/pages/public/AudioListPage.jsx
// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useSearchParams, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useQuery } from '@tanstack/react-query';
// import {
//   Search, Headphones, Play, Clock, Eye,
//   Grid, List, Loader2, AlertCircle,
//   ChevronLeft, ChevronRight, Mic, MicOff,
//   Volume2, VolumeX, Zap, X, Pause, SkipForward, SkipBack,
//   ChevronLeftCircle, ChevronRightCircle
// } from 'lucide-react';
// import audioAPI from '../../api/audioAPI';
// import { AUDIO_CATEGORIES } from '../../utils/constants.js';
// import { useAudioPlayer } from '../../context/AudioPlayerContext';
// import toast from 'react-hot-toast';

// const AudioListPage = () => {
//   const { t } = useTranslation();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [viewMode, setViewMode] = useState('grid');
//   const [sortBy, setSortBy] = useState('popular');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isListening, setIsListening] = useState(false);
//   const [voiceSupported, setVoiceSupported] = useState(true);
//   const [voiceTranscript, setVoiceTranscript] = useState('');
//   const recognitionRef = useRef(null);
//   const categoryScrollRef = useRef(null);
//   const itemsPerPage = 9;

//   // Get audio player functions
//   const { 
//     currentAudio, 
//     isPlaying, 
//     playAudio, 
//     pauseAudio, 
//     resumeAudio,
//     nextAudio,
//     previousAudio,
//     volumeUp,
//     volumeDown,
//     toggleMute,
//     isMuted
//   } = useAudioPlayer();

//   // Scroll category pills
//   const scrollCategories = (direction) => {
//     if (categoryScrollRef.current) {
//       const scrollAmount = 200;
//       const currentScroll = categoryScrollRef.current.scrollLeft;
//       const newScroll = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;
//       categoryScrollRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });
//     }
//   };

//   // Initialize speech recognition
//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
//     if (!SpeechRecognition) {
//       setVoiceSupported(false);
//       console.warn('Speech recognition not supported in this browser');
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.continuous = false;
//     recognition.interimResults = true;
//     recognition.lang = 'ur-PK';
    
//     // Add support for multiple languages
//     recognition.continuous = false;
//     recognition.interimResults = true;
//     recognition.lang = 'ur-PK';
//     recognition.maxAlternatives = 3;

//     recognition.onstart = () => {
//       setIsListening(true);
//       toast.success('Listening... Speak now');
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//     };

//     recognition.onresult = (event) => {
//       // Get best transcript
//       let transcript = event.results[0][0].transcript;
      
//       // Also check alternatives for better matching
//       const alternatives = [];
//       for (let i = 0; i < event.results[0].length; i++) {
//         alternatives.push(event.results[0][i].transcript);
//       }
      
//       console.log('Voice transcripts:', alternatives);
//       setVoiceTranscript(transcript);
      
//       if (event.results[0].isFinal) {
//         // Try to process with best matching transcript
//         let bestMatch = transcript;
//         for (const alt of alternatives) {
//           if (alt.includes('play') || alt.includes('پلے') || alt.includes('नौहा') || 
//               alt.includes('نوحہ') || alt.includes('marsiya') || alt.includes('غزل')) {
//             bestMatch = alt;
//             break;
//           }
//         }
//         processVoiceCommand(bestMatch);
//       }
//     };

//     recognition.onerror = (event) => {
//       console.error('Speech recognition error:', event.error);
//       setIsListening(false);
      
//       if (event.error === 'not-allowed') {
//         toast.error('Microphone access denied. Please allow microphone access.');
//       } else if (event.error === 'no-speech') {
//         toast.error('No speech detected. Please try again.');
//       } else {
//         toast.error('Voice recognition failed. Please try again.');
//       }
//     };

//     recognitionRef.current = recognition;

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//       }
//     };
//   }, []);

//   // Process voice commands - Enhanced for Urdu script
//   const processVoiceCommand = async (command) => {
//     const lowerCommand = command.toLowerCase().trim();
//     const urduCommand = command;
    
//     console.log('Processing command:', { command, lowerCommand });
    
//     // ============================================
//     // CHECK FOR URDU/ARABIC SCRIPT COMMANDS FIRST
//     // ============================================
    
//     // Play Nauha command (Urdu script: پلے نوحہ)
//     if (urduCommand.includes('پلے') || (lowerCommand.includes('play') && lowerCommand.includes('nauha'))) {
//       toast.loading('Searching for nauha audio...', { id: 'voice-play' });
//       try {
//         const response = await audioAPI.searchAudio('nauha', { limit: 10, type: 'nauha' });
//         const results = response?.data?.data || response?.data || response || [];
        
//         if (results.length > 0) {
//           const audioToPlay = results[0];
//           const allAudio = await audioAPI.getAudioItems({ limit: 50, type: 'nauha' });
//           const allAudioItems = allAudio?.data?.data || allAudio?.data || allAudio || [];
//           playAudio(audioToPlay, allAudioItems, 0);
//           toast.success(`Playing nauha: ${audioToPlay.title}`, { id: 'voice-play' });
//         } else {
//           toast.error('No nauha audio found', { id: 'voice-play' });
//         }
//       } catch (error) {
//         console.error('Search error:', error);
//         toast.error('Failed to play nauha', { id: 'voice-play' });
//       }
//       setVoiceTranscript('');
//       return;
//     }
    
//     // Play Marsiya command
//     if (urduCommand.includes('مرثیہ') || (lowerCommand.includes('play') && lowerCommand.includes('marsiya'))) {
//       toast.loading('Searching for marsiya audio...', { id: 'voice-play' });
//       try {
//         const response = await audioAPI.searchAudio('marsiya', { limit: 10, type: 'marsiya' });
//         const results = response?.data?.data || response?.data || response || [];
        
//         if (results.length > 0) {
//           const audioToPlay = results[0];
//           const allAudio = await audioAPI.getAudioItems({ limit: 50, type: 'marsiya' });
//           const allAudioItems = allAudio?.data?.data || allAudio?.data || allAudio || [];
//           playAudio(audioToPlay, allAudioItems, 0);
//           toast.success(`Playing marsiya: ${audioToPlay.title}`, { id: 'voice-play' });
//         } else {
//           toast.error('No marsiya audio found', { id: 'voice-play' });
//         }
//       } catch (error) {
//         console.error('Search error:', error);
//         toast.error('Failed to play marsiya', { id: 'voice-play' });
//       }
//       setVoiceTranscript('');
//       return;
//     }
    
//     // Play Ghazal command
//     if (urduCommand.includes('غزل') || (lowerCommand.includes('play') && lowerCommand.includes('ghazal'))) {
//       toast.loading('Searching for ghazal audio...', { id: 'voice-play' });
//       try {
//         const response = await audioAPI.searchAudio('ghazal', { limit: 10, type: 'ghazal' });
//         const results = response?.data?.data || response?.data || response || [];
        
//         if (results.length > 0) {
//           const audioToPlay = results[0];
//           const allAudio = await audioAPI.getAudioItems({ limit: 50, type: 'ghazal' });
//           const allAudioItems = allAudio?.data?.data || allAudio?.data || allAudio || [];
//           playAudio(audioToPlay, allAudioItems, 0);
//           toast.success(`Playing ghazal: ${audioToPlay.title}`, { id: 'voice-play' });
//         } else {
//           toast.error('No ghazal audio found', { id: 'voice-play' });
//         }
//       } catch (error) {
//         console.error('Search error:', error);
//         toast.error('Failed to play ghazal', { id: 'voice-play' });
//       }
//       setVoiceTranscript('');
//       return;
//     }
    
//     // Play Naat command
//     if (urduCommand.includes('نعت') || (lowerCommand.includes('play') && lowerCommand.includes('naat'))) {
//       toast.loading('Searching for naat audio...', { id: 'voice-play' });
//       try {
//         const response = await audioAPI.searchAudio('naat', { limit: 10, type: 'naat' });
//         const results = response?.data?.data || response?.data || response || [];
        
//         if (results.length > 0) {
//           const audioToPlay = results[0];
//           const allAudio = await audioAPI.getAudioItems({ limit: 50, type: 'naat' });
//           const allAudioItems = allAudio?.data?.data || allAudio?.data || allAudio || [];
//           playAudio(audioToPlay, allAudioItems, 0);
//           toast.success(`Playing naat: ${audioToPlay.title}`, { id: 'voice-play' });
//         } else {
//           toast.error('No naat audio found', { id: 'voice-play' });
//         }
//       } catch (error) {
//         console.error('Search error:', error);
//         toast.error('Failed to play naat', { id: 'voice-play' });
//       }
//       setVoiceTranscript('');
//       return;
//     }
    
//     // Play specific audio (e.g., "play Alvida")
//     if (lowerCommand.includes('play') && !lowerCommand.includes('nauha') && !lowerCommand.includes('marsiya')) {
//       let searchTerms = command.replace(/play|چلائیں|प्ले|پلے/gi, '').trim();
      
//       if (searchTerms) {
//         toast.loading(`Searching for "${searchTerms}"...`, { id: 'voice-play' });
        
//         try {
//           const response = await audioAPI.searchAudio(searchTerms, { limit: 10 });
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
//       } else {
//         toast.error('Please say what to play, e.g., "play Alvida"');
//       }
//       setVoiceTranscript('');
//       return;
//     }
    
//     // ============================================
//     // VOLUME CONTROL COMMANDS
//     // ============================================
//     if (lowerCommand.includes('volume up') || lowerCommand.includes('louder') || 
//         lowerCommand.includes('تیز') || urduCommand.includes('آواز بڑھائیں')) {
//       volumeUp();
//       toast.success('Volume increased');
//       setVoiceTranscript('');
//       return;
//     }
    
//     if (lowerCommand.includes('volume down') || lowerCommand.includes('softer') || 
//         urduCommand.includes('آہستہ') || urduCommand.includes('آواز کم کریں')) {
//       volumeDown();
//       toast.success('Volume decreased');
//       setVoiceTranscript('');
//       return;
//     }
    
//     if (lowerCommand.includes('mute') || urduCommand.includes('خاموش')) {
//       toggleMute();
//       toast.success(isMuted ? 'Unmuted' : 'Muted');
//       setVoiceTranscript('');
//       return;
//     }
    
//     // ============================================
//     // PLAYBACK CONTROL COMMANDS
//     // ============================================
//     if (lowerCommand.includes('pause') || lowerCommand.includes('stop') || urduCommand.includes('روکیں')) {
//       pauseAudio();
//       toast.success('Paused');
//       setVoiceTranscript('');
//       return;
//     }
    
//     if (lowerCommand.includes('resume') || lowerCommand.includes('continue') || urduCommand.includes('جاری')) {
//       if (currentAudio) {
//         resumeAudio();
//         toast.success('Resumed');
//       } else {
//         toast.error('No audio to resume');
//       }
//       setVoiceTranscript('');
//       return;
//     }
    
//     if (lowerCommand.includes('next') || lowerCommand.includes('skip') || urduCommand.includes('اگلا')) {
//       nextAudio();
//       setVoiceTranscript('');
//       return;
//     }
    
//     if (lowerCommand.includes('previous') || lowerCommand.includes('back') || urduCommand.includes('پچھلا')) {
//       previousAudio();
//       setVoiceTranscript('');
//       return;
//     }
    
//     // ============================================
//     // CATEGORY FILTER COMMANDS
//     // ============================================
//     const categoryMap = [
//       { keywords: ['nauha', 'نوحہ', 'नौहा'], category: 'nauha', label: 'Nauha' },
//       { keywords: ['marsiya', 'مرثیہ', 'मरसिया'], category: 'marsiya', label: 'Marsiya' },
//       { keywords: ['soz', 'سوز', 'सोज़'], category: 'soz', label: 'Soz' },
//       { keywords: ['salam', 'سلام', 'सलाम'], category: 'salam', label: 'Salam' },
//       { keywords: ['naat', 'نعت', 'नात'], category: 'naat', label: 'Naat' },
//       { keywords: ['hamd', 'حمد', 'हम्द'], category: 'hamd', label: 'Hamd' },
//       { keywords: ['manqabat', 'منقبت', 'मनक़बत'], category: 'manqabat', label: 'Manqabat' },
//       { keywords: ['ghazal', 'غزل', 'ग़ज़ल'], category: 'ghazal', label: 'Ghazal' },
//       { keywords: ['nazm', 'نظم', 'नज़्म'], category: 'nazm', label: 'Nazm' },
//       { keywords: ['podcast', 'پوڈکاسٹ', 'पॉडकास्ट'], category: 'podcast', label: 'Podcast' },
//       { keywords: ['audiobook', 'آڈیو بک', 'ऑडियोबुक'], category: 'audiobook', label: 'Audiobook' }
//     ];
    
//     for (const item of categoryMap) {
//       if (item.keywords.some(kw => lowerCommand.includes(kw) || urduCommand.includes(kw))) {
//         setActiveCategory(item.category);
//         setSearchQuery('');
//         setCurrentPage(1);
//         toast.success(`Showing ${item.label} audio`);
//         setVoiceTranscript('');
//         return;
//       }
//     }
    
//     // ============================================
//     // SHOW ALL COMMAND
//     // ============================================
//     if (lowerCommand.includes('all') || lowerCommand.includes('سب') || lowerCommand.includes('सभी')) {
//       setActiveCategory('all');
//       setSearchQuery('');
//       setCurrentPage(1);
//       toast.success('Showing all audio');
//       setVoiceTranscript('');
//       return;
//     }
    
//     // ============================================
//     // SEARCH COMMAND
//     // ============================================
//     if (lowerCommand.includes('search') || lowerCommand.includes('تلاش') || lowerCommand.includes('खोजें')) {
//       let searchTerms = command.replace(/search|تلاش|खोजें/gi, '').trim();
      
//       if (searchTerms) {
//         setSearchQuery(searchTerms);
//         setActiveCategory('all');
//         setCurrentPage(1);
//         toast.success(`Searching for: ${searchTerms}`);
//       } else {
//         toast.error('What would you like to search for?');
//       }
//       setVoiceTranscript('');
//       return;
//     }
    
//     // ============================================
//     // HELP COMMAND
//     // ============================================
//     if (lowerCommand.includes('help') || urduCommand.includes('مدد')) {
//       toast.success(
//         '🎤 Voice Commands:\n\n' +
//         '• "play nauha" - Play Nauha\n' +
//         '• "play marsiya" - Play Marsiya\n' +
//         '• "play Alvida" - Play specific audio\n' +
//         '• "pause", "resume" - Control playback\n' +
//         '• "next", "previous" - Change track\n' +
//         '• "volume up/down" - Adjust volume\n' +
//         '• "mute" - Mute audio\n' +
//         '• "search ghazal" - Search audio\n' +
//         '• "help" - Show this menu',
//         { duration: 8000 }
//       );
//       setVoiceTranscript('');
//       return;
//     }
    
//     // ============================================
//     // DEFAULT: Search with command
//     // ============================================
//     if (command.length > 3) {
//       setSearchQuery(command);
//       setActiveCategory('all');
//       setCurrentPage(1);
//       toast.success(`Searching for: ${command}`);
//     } else {
//       toast.error('Command not recognized. Try "help" for available commands');
//     }
    
//     setVoiceTranscript('');
//   };

//   const startVoiceSearch = () => {
//     if (!voiceSupported) {
//       toast.error('Voice search is not supported in your browser');
//       return;
//     }
    
//     if (recognitionRef.current) {
//       try {
//         recognitionRef.current.start();
//       } catch (error) {
//         console.error('Error starting recognition:', error);
//         toast.error('Failed to start voice recognition');
//       }
//     }
//   };

//   const stopVoiceSearch = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//     }
//   };

//   const { data: response, isLoading, error, refetch } = useQuery({
//     queryKey: ['audio', currentPage, activeCategory, sortBy, searchQuery],
//     queryFn: () => audioAPI.getAudioItems({
//       page: currentPage,
//       limit: itemsPerPage,
//       type: activeCategory !== 'all' ? activeCategory.toLowerCase() : undefined,
//       search: searchQuery || undefined,
//       sort: sortBy
//     }),
//     enabled: true,
//     staleTime: 30000
//   });

//   const audioData = response?.data?.data || response?.data || response || [];
//   const audioItems = Array.isArray(audioData) ? audioData : [];
//   const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 };

//   useEffect(() => {
//     if (activeCategory && activeCategory !== 'all') {
//       setSearchParams({ category: activeCategory, ...(searchQuery && { search: searchQuery }) });
//     } else {
//       setSearchParams(searchQuery ? { search: searchQuery } : {});
//     }
//     setCurrentPage(1);
//   }, [activeCategory, searchQuery, setSearchParams]);

//   const goToPage = (page) => {
//     if (page >= 1 && page <= (pagination.totalPages || 1)) {
//       setCurrentPage(page);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const formatDuration = (seconds) => {
//     if (!seconds) return 'N/A';
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return hrs > 0
//       ? `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
//       : `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   const formatPlays = (plays) => {
//     if (!plays) return '0';
//     if (plays >= 1000000) return `${(plays / 1000000).toFixed(1)}M`;
//     if (plays >= 1000) return `${(plays / 1000).toFixed(1)}K`;
//     return plays.toString();
//   };

//   const clearFilters = () => {
//     setSearchQuery('');
//     setActiveCategory('all');
//     setSortBy('popular');
//     setCurrentPage(1);
//     toast.success('Filters cleared');
//   };

//   const getCategoryDisplayName = (type) => {
//     const category = AUDIO_CATEGORIES.find(cat => cat.id === type?.toLowerCase());
//     return category?.label || type || 'Audio';
//   };

//   // Now playing bar component
//   const NowPlayingBar = () => {
//     if (!currentAudio) return null;
    
//     return (
//       <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg z-50 border-t border-gray-700">
//         <div className="max-w-7xl mx-auto px-4 py-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4 flex-1">
//               <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
//                 <Headphones className="h-6 w-6" />
//               </div>
//               <div className="flex-1">
//                 <p className="font-medium text-sm truncate">{currentAudio.title}</p>
//                 <p className="text-xs text-gray-400">
//                   {currentAudio.author?.name || 'Unknown Artist'}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={previousAudio}
//                 className="p-2 hover:bg-white/10 rounded-full transition"
//               >
//                 <SkipBack className="h-5 w-5" />
//               </button>
//               <button
//                 onClick={isPlaying ? pauseAudio : resumeAudio}
//                 className="p-3 bg-primary-600 hover:bg-primary-700 rounded-full transition"
//               >
//                 {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
//               </button>
//               <button
//                 onClick={nextAudio}
//                 className="p-2 hover:bg-white/10 rounded-full transition"
//               >
//                 <SkipForward className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   /* ================= LOADING ================= */
//   if (isLoading && audioItems.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
//         <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   /* ================= ERROR ================= */
//   if (error && audioItems.length === 0) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
//         <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
//         <h2 className="text-xl font-semibold mb-2">Failed to load audio</h2>
//         <p className="text-gray-500 mb-4">Please check your connection and try again</p>
//         <button onClick={() => refetch()} className="btn-primary">Retry</button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 via-white to-gray-100">
//       {/* Now Playing Bar */}
//       <NowPlayingBar />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         {/* HEADER */}
//         <div className="mb-10 text-center">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
//             {t('common.audio', 'Audio Library')}
//           </h1>
//           <p className="text-gray-500 mt-2">
//             Discover premium Urdu audio experiences
//           </p>
          
//           {/* Voice Search Badge */}
//           {voiceSupported && (
//             <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-primary-50 text-primary-600 text-sm rounded-full">
//               <Mic className="h-4 w-4" />
//               <span>Voice search available - Click the mic to speak</span>
//             </div>
//           )}
//         </div>

//         {/* CONTROLS */}
//         <div className="sticky top-20 z-10 bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-4 mb-8 shadow-sm flex flex-col md:flex-row gap-4">

//           {/* SEARCH with Voice */}
//           <div className="flex-1 relative">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
//             <input
//               type="text"
//               placeholder={isListening ? "Listening..." : "Search audio by title, artist, or type..."}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-11 pr-24 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 bg-white"
//             />
            
//             {/* Voice Search Button */}
//             {voiceSupported && (
//               <button
//                 onClick={isListening ? stopVoiceSearch : startVoiceSearch}
//                 className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${
//                   isListening 
//                     ? 'bg-red-500 text-white animate-pulse' 
//                     : 'bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-600'
//                 }`}
//                 title={isListening ? "Stop listening" : "Voice search"}
//               >
//                 {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
//               </button>
//             )}
            
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery('')}
//                 className="absolute right-14 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200"
//               >
//                 <X className="h-4 w-4 text-gray-400" />
//               </button>
//             )}
//           </div>

//           {/* Voice Transcript Display */}
//           {voiceTranscript && !isListening && (
//             <div className="text-xs text-primary-600 bg-primary-50 px-3 py-1 rounded-full flex items-center gap-1">
//               <Volume2 className="h-3 w-3" />
//               <span>"{voiceTranscript}"</span>
//               <button onClick={() => setVoiceTranscript('')} className="ml-1">
//                 <X className="h-3 w-3" />
//               </button>
//             </div>
//           )}

//           {/* SORT */}
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-primary-500"
//           >
//             <option value="popular">Most Popular</option>
//             <option value="recent">Newest First</option>
//             <option value="plays">Most Played</option>
//             <option value="oldest">Oldest First</option>
//           </select>

//           {/* VIEW MODE */}
//           <div className="flex rounded-xl border overflow-hidden bg-white">
//             <button
//               onClick={() => setViewMode('grid')}
//               className={`p-3 transition-colors ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
//               title="Grid view"
//             >
//               <Grid className="h-5 w-5" />
//             </button>
//             <button
//               onClick={() => setViewMode('list')}
//               className={`p-3 transition-colors ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
//               title="List view"
//             >
//               <List className="h-5 w-5" />
//             </button>
//           </div>

//           {/* Clear Filters */}
//           {(searchQuery || activeCategory !== 'all' || sortBy !== 'popular') && (
//             <button
//               onClick={clearFilters}
//               className="px-4 py-3 text-gray-600 hover:text-gray-800 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
//             >
//               Clear All
//             </button>
//           )}
//         </div>

//         {/* Voice Command Examples */}
//         {voiceSupported && (
//           <div className="mb-6 p-4 bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl">
//             <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
//               <Zap className="h-4 w-4 text-primary-600" />
//               <span className="font-medium">Try saying:</span>
//             </div>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
//               <div className="space-y-1">
//                 <p className="font-medium text-primary-600">🎵 Play:</p>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"play nauha"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block ml-1">"پلے نوحہ"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"play Alvida"</span>
//               </div>
//               <div className="space-y-1">
//                 <p className="font-medium text-primary-600">⏮️ Controls:</p>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"pause"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block ml-1">"resume"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"next"</span>
//               </div>
//               <div className="space-y-1">
//                 <p className="font-medium text-primary-600">🔊 Volume:</p>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"volume up"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block ml-1">"mute"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"louder"</span>
//               </div>
//               <div className="space-y-1">
//                 <p className="font-medium text-primary-600">📂 Categories:</p>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"marsiya"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block ml-1">"ghazal"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"naat"</span>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* CATEGORY PILLS WITH SCROLL BUTTONS */}
//         <div className="relative mb-8">
//           {/* Left Scroll Button */}
//           <button
//             onClick={() => scrollCategories('left')}
//             className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1.5 border border-gray-200 hover:bg-gray-50 transition-all"
//           >
//             <ChevronLeftCircle className="h-6 w-6 text-gray-600" />
//           </button>
          
//           {/* Scrollable Categories Container */}
//           <div
//             ref={categoryScrollRef}
//             className="flex gap-2 overflow-x-auto scrollbar-hide px-8"
//             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//           >
//             <button
//               onClick={() => setActiveCategory('all')}
//               className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
//                 activeCategory === 'all'
//                   ? 'bg-primary-600 text-white shadow-md'
//                   : 'bg-white border border-gray-200 hover:bg-gray-50'
//               }`}
//             >
//               All Audio
//             </button>
//             {AUDIO_CATEGORIES.map(cat => (
//               <button
//                 key={cat.id}
//                 onClick={() => setActiveCategory(cat.id)}
//                 className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1 flex-shrink-0 ${
//                   activeCategory === cat.id
//                     ? 'bg-primary-600 text-white shadow-md'
//                     : 'bg-white border border-gray-200 hover:bg-gray-50'
//                 }`}
//               >
//                 <span>{cat.icon}</span>
//                 <span>{cat.label}</span>
//               </button>
//             ))}
//           </div>
          
//           {/* Right Scroll Button */}
//           <button
//             onClick={() => scrollCategories('right')}
//             className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1.5 border border-gray-200 hover:bg-gray-50 transition-all"
//           >
//             <ChevronRightCircle className="h-6 w-6 text-gray-600" />
//           </button>
//         </div>

//         {/* RESULTS COUNT */}
//         <div className="mb-4 text-sm text-gray-500">
//           Found {pagination.total || audioItems.length} audio items
//           {searchQuery && <span> matching "{searchQuery}"</span>}
//           {activeCategory !== 'all' && <span> in {activeCategory}</span>}
//         </div>

//         {/* EMPTY STATE */}
//         {audioItems.length === 0 ? (
//           <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
//             <Headphones className="mx-auto h-12 w-12 text-gray-300 mb-4" />
//             <p className="text-gray-500">No audio found</p>
//             {(searchQuery || activeCategory !== 'all') && (
//               <button onClick={clearFilters} className="text-primary-600 mt-2 hover:underline">
//                 Clear filters to see all audio
//               </button>
//             )}
//           </div>
//         ) : (
//           <>
//             {/* GRID/LIST VIEW */}
//             <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
//               {audioItems.map((audio, index) => (
//                 <motion.div
//                   key={audio._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: Math.min(index * 0.05, 0.5) }}
//                 >
//                   <div className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
//                     <Link to={`/audio/${audio.slug}`}>
//                       <div className={`${viewMode === 'list' ? 'flex' : ''}`}>
//                         {/* IMAGE */}
//                         <div className={`${viewMode === 'list' ? 'w-40 md:w-60' : 'w-full'} relative overflow-hidden`}>
//                           <img
//                             src={audio.thumbnail || audio.coverImage || 'https://via.placeholder.com/300x300?text=Audio'}
//                             alt={audio.title}
//                             className="w-full aspect-square object-cover group-hover:scale-110 transition duration-500"
//                             onError={(e) => {
//                               e.target.src = 'https://via.placeholder.com/300x300?text=Audio';
//                             }}
//                           />
//                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                             <div className="bg-white/90 p-3 rounded-full transform scale-90 group-hover:scale-110 transition">
//                               <Play className="text-primary-600 h-6 w-6 ml-0.5" />
//                             </div>
//                           </div>
//                           {audio.duration && (
//                             <div className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded-md flex items-center gap-1">
//                               <Clock className="h-3 w-3" />
//                               {formatDuration(audio.duration)}
//                             </div>
//                           )}
//                           {audio.isPremium && (
//                             <div className="absolute top-2 right-2 px-2 py-1 bg-yellow-500 text-white text-xs rounded-md">
//                               Premium
//                             </div>
//                           )}
//                         </div>

//                         {/* CONTENT */}
//                         <div className="p-5 flex-1">
//                           <div className="flex items-center gap-2 mb-2">
//                             <span className="px-2 py-0.5 bg-primary-50 text-primary-600 text-xs rounded-full capitalize">
//                               {getCategoryDisplayName(audio.type)}
//                             </span>
//                             {audio.language && (
//                               <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
//                                 {audio.language}
//                               </span>
//                             )}
//                           </div>

//                           <h3 className="font-semibold text-lg group-hover:text-primary-600 line-clamp-2 transition-colors">
//                             {audio.title}
//                           </h3>

//                           {audio.author && (
//                             <p className="text-sm text-gray-500 mt-1">
//                               {typeof audio.author === 'object' ? audio.author.name : audio.author}
//                             </p>
//                           )}

//                           {audio.description && (
//                             <p className="text-sm text-gray-500 mt-2 line-clamp-2">
//                               {audio.description}
//                             </p>
//                           )}

//                           <div className="flex gap-4 text-sm text-gray-400 mt-3">
//                             <span className="flex items-center gap-1">
//                               <Play className="h-4 w-4" /> {formatPlays(audio.stats?.plays)}
//                             </span>
//                             <span className="flex items-center gap-1">
//                               <Eye className="h-4 w-4" /> {formatPlays(audio.stats?.views)}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
                    
//                     {/* Quick Play Button */}
//                     <div className="px-5 pb-4">
//                       <button
//                         onClick={() => playAudio(audio, audioItems, index)}
//                         className="w-full py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg flex items-center justify-center gap-2 transition"
//                       >
//                         <Play className="h-4 w-4" />
//                         <span>Play Now</span>
//                       </button>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* PAGINATION */}
//             {(pagination.totalPages || 1) > 1 && (
//               <div className="flex justify-center gap-2 mt-12">
//                 <button
//                   onClick={() => goToPage(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="p-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                 >
//                   <ChevronLeft className="h-5 w-5" />
//                 </button>

//                 {[...Array(Math.min(pagination.totalPages || 1, 7))].map((_, i) => {
//                   let pageNum;
//                   const totalPages = pagination.totalPages || 1;
                  
//                   if (totalPages <= 7) {
//                     pageNum = i + 1;
//                   } else if (currentPage <= 4) {
//                     pageNum = i + 1;
//                     if (i === 6) pageNum = totalPages;
//                   } else if (currentPage >= totalPages - 3) {
//                     pageNum = totalPages - 6 + i;
//                   } else {
//                     pageNum = currentPage - 3 + i;
//                     if (i === 0) pageNum = 1;
//                     if (i === 6) pageNum = totalPages;
//                   }
                  
//                   if (i === 5 && totalPages > 7 && currentPage > 4 && currentPage < totalPages - 3) {
//                     return <span key="ellipsis" className="px-4 py-2">...</span>;
//                   }
                  
//                   return (
//                     <button
//                       key={pageNum}
//                       onClick={() => goToPage(pageNum)}
//                       className={`px-4 py-2 rounded-lg ${
//                         currentPage === pageNum
//                           ? 'bg-primary-600 text-white'
//                           : 'bg-white border hover:bg-gray-50'
//                       }`}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 })}

//                 <button
//                   onClick={() => goToPage(currentPage + 1)}
//                   disabled={currentPage === (pagination.totalPages || 1)}
//                   className="p-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                 >
//                   <ChevronRight className="h-5 w-5" />
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AudioListPage;



















// // client/src/pages/public/AudioListPage.jsx
// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useSearchParams, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useQuery } from '@tanstack/react-query';
// import {
//   Search, Headphones, Play, Clock, Eye,
//   Grid, List, Loader2, AlertCircle,
//   ChevronLeft, ChevronRight, Mic, MicOff,
//   Volume2, VolumeX, Zap, X, Pause, SkipForward, SkipBack,
//   ChevronLeftCircle, ChevronRightCircle
// } from 'lucide-react';
// import audioAPI from '../../api/audioAPI';
// import { AUDIO_CATEGORIES } from '../../utils/constants.js';
// import { useAudioPlayer } from '../../context/AudioPlayerContext';
// import toast from 'react-hot-toast';

// const AudioListPage = () => {
//   const { t } = useTranslation();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [viewMode, setViewMode] = useState('grid');
//   const [sortBy, setSortBy] = useState('popular');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isListening, setIsListening] = useState(false);
//   const [voiceSupported, setVoiceSupported] = useState(true);
//   const [voiceTranscript, setVoiceTranscript] = useState('');
//   const recognitionRef = useRef(null);
//   const categoryScrollRef = useRef(null);
//   const itemsPerPage = 9;

//   // Get audio player functions
//   const { 
//     currentAudio, 
//     isPlaying, 
//     playAudio, 
//     pauseAudio, 
//     resumeAudio,
//     nextAudio,
//     previousAudio,
//     volumeUp,
//     volumeDown,
//     toggleMute,
//     isMuted
//   } = useAudioPlayer();

//   // Scroll category pills
//   const scrollCategories = (direction) => {
//     if (categoryScrollRef.current) {
//       const scrollAmount = 200;
//       const currentScroll = categoryScrollRef.current.scrollLeft;
//       const newScroll = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;
//       categoryScrollRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });
//     }
//   };

//   // Initialize speech recognition - ENGLISH FIRST
//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
//     if (!SpeechRecognition) {
//       setVoiceSupported(false);
//       console.warn('Speech recognition not supported in this browser');
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.continuous = false;
//     recognition.interimResults = true;
//     recognition.lang = 'en-US'; // Default to English for better recognition
//     recognition.maxAlternatives = 5;

//     recognition.onstart = () => {
//       setIsListening(true);
//       toast.success('Listening... Speak in English', { duration: 2000 });
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//     };

//     recognition.onresult = (event) => {
//       // Get best transcript (English)
//       let transcript = event.results[0][0].transcript;
      
//       // Also check alternatives
//       const alternatives = [];
//       for (let i = 0; i < event.results[0].length; i++) {
//         alternatives.push(event.results[0][i].transcript);
//       }
      
//       console.log('Voice transcripts:', alternatives);
//       setVoiceTranscript(transcript);
      
//       if (event.results[0].isFinal) {
//         // Try to process with best matching transcript
//         let bestMatch = transcript;
//         for (const alt of alternatives) {
//           // Look for English command patterns
//           if (alt.toLowerCase().includes('play') || alt.toLowerCase().includes('pause') || 
//               alt.toLowerCase().includes('next') || alt.toLowerCase().includes('volume') ||
//               alt.toLowerCase().includes('resume') || alt.toLowerCase().includes('mute')) {
//             bestMatch = alt;
//             break;
//           }
//         }
//         processVoiceCommand(bestMatch);
//       }
//     };

//     recognition.onerror = (event) => {
//       console.error('Speech recognition error:', event.error);
//       setIsListening(false);
      
//       if (event.error === 'not-allowed') {
//         toast.error('Microphone access denied. Please allow microphone access.');
//       } else if (event.error === 'no-speech') {
//         toast.error('No speech detected. Please try again.');
//       } else {
//         toast.error('Voice recognition failed. Please try again.');
//       }
//     };

//     recognitionRef.current = recognition;

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//       }
//     };
//   }, []);

//   // Process voice commands - ENGLISH FIRST, then Urdu
//   const processVoiceCommand = async (command) => {
//     const lowerCommand = command.toLowerCase().trim();
    
//     console.log('Processing command:', { command, lowerCommand });
    
//     // ============================================
//     // PLAYBACK CONTROL COMMANDS (English)
//     // ============================================
    
//     // PAUSE command
//     if (lowerCommand === 'pause' || lowerCommand === 'stop' || 
//         lowerCommand.includes('pause') || lowerCommand.includes('stop')) {
//       console.log('✅ Executing PAUSE command');
//       pauseAudio();
//       toast.success('Audio paused');
//       setVoiceTranscript('');
//       return true;
//     }
    
//     // RESUME command
//     if (lowerCommand === 'resume' || lowerCommand === 'play' ||
//         lowerCommand.includes('resume') || (lowerCommand.includes('play') && lowerCommand.length < 10)) {
//       if (currentAudio) {
//         console.log('✅ Executing RESUME command');
//         resumeAudio();
//         toast.success('Audio resumed');
//       } else {
//         toast.error('No audio to resume');
//       }
//       setVoiceTranscript('');
//       return true;
//     }
    
//     // NEXT command
//     if (lowerCommand === 'next' || lowerCommand === 'skip' || 
//         lowerCommand.includes('next') || lowerCommand.includes('skip')) {
//       console.log('✅ Executing NEXT command');
//       nextAudio();
//       toast.success('Next track');
//       setVoiceTranscript('');
//       return true;
//     }
    
//     // PREVIOUS command
//     if (lowerCommand === 'previous' || lowerCommand === 'back' || 
//         lowerCommand.includes('previous') || lowerCommand.includes('back')) {
//       console.log('✅ Executing PREVIOUS command');
//       previousAudio();
//       toast.success('Previous track');
//       setVoiceTranscript('');
//       return true;
//     }
    
//     // ============================================
//     // VOLUME CONTROL COMMANDS (English)
//     // ============================================
//     if (lowerCommand === 'volume up' || lowerCommand.includes('volume up') || 
//         lowerCommand === 'louder' || lowerCommand.includes('louder')) {
//       console.log('✅ Executing VOLUME UP command');
//       volumeUp();
//       setVoiceTranscript('');
//       return true;
//     }
    
//     if (lowerCommand === 'volume down' || lowerCommand.includes('volume down') || 
//         lowerCommand === 'softer' || lowerCommand.includes('softer')) {
//       console.log('✅ Executing VOLUME DOWN command');
//       volumeDown();
//       setVoiceTranscript('');
//       return true;
//     }
    
//     if (lowerCommand === 'mute' || lowerCommand.includes('mute')) {
//       console.log('✅ Executing MUTE command');
//       toggleMute();
//       setVoiceTranscript('');
//       return true;
//     }
    
//     // ============================================
//     // PLAY SPECIFIC AUDIO COMMANDS (English)
//     // ============================================
    
//     // Play Nauha command
//     if (lowerCommand.includes('play nauha')) {
//       console.log('✅ Executing PLAY NAUHA command');
//       toast.loading('Searching for nauha audio...', { id: 'voice-play' });
//       try {
//         const response = await audioAPI.searchAudio('nauha', { limit: 10, type: 'nauha' });
//         const results = response?.data?.data || response?.data || response || [];
        
//         if (results.length > 0) {
//           const audioToPlay = results[0];
//           playAudio(audioToPlay, results, 0);
//           toast.success(`Playing nauha: ${audioToPlay.title}`, { id: 'voice-play' });
//         } else {
//           toast.error('No nauha audio found', { id: 'voice-play' });
//         }
//       } catch (error) {
//         console.error('Search error:', error);
//         toast.error('Failed to play nauha', { id: 'voice-play' });
//       }
//       setVoiceTranscript('');
//       return true;
//     }
    
//     // Play Marsiya command
//     if (lowerCommand.includes('play marsiya')) {
//       console.log('✅ Executing PLAY MARSIYA command');
//       toast.loading('Searching for marsiya audio...', { id: 'voice-play' });
//       try {
//         const response = await audioAPI.searchAudio('marsiya', { limit: 10, type: 'marsiya' });
//         const results = response?.data?.data || response?.data || response || [];
        
//         if (results.length > 0) {
//           const audioToPlay = results[0];
//           playAudio(audioToPlay, results, 0);
//           toast.success(`Playing marsiya: ${audioToPlay.title}`, { id: 'voice-play' });
//         } else {
//           toast.error('No marsiya audio found', { id: 'voice-play' });
//         }
//       } catch (error) {
//         console.error('Search error:', error);
//         toast.error('Failed to play marsiya', { id: 'voice-play' });
//       }
//       setVoiceTranscript('');
//       return true;
//     }
    
//     // Play Ghazal command
//     if (lowerCommand.includes('play ghazal')) {
//       console.log('✅ Executing PLAY GHAZAL command');
//       toast.loading('Searching for ghazal audio...', { id: 'voice-play' });
//       try {
//         const response = await audioAPI.searchAudio('ghazal', { limit: 10, type: 'ghazal' });
//         const results = response?.data?.data || response?.data || response || [];
        
//         if (results.length > 0) {
//           const audioToPlay = results[0];
//           playAudio(audioToPlay, results, 0);
//           toast.success(`Playing ghazal: ${audioToPlay.title}`, { id: 'voice-play' });
//         } else {
//           toast.error('No ghazal audio found', { id: 'voice-play' });
//         }
//       } catch (error) {
//         console.error('Search error:', error);
//         toast.error('Failed to play ghazal', { id: 'voice-play' });
//       }
//       setVoiceTranscript('');
//       return true;
//     }
    
//     // Play Naat command
//     if (lowerCommand.includes('play naat')) {
//       console.log('✅ Executing PLAY NAAT command');
//       toast.loading('Searching for naat audio...', { id: 'voice-play' });
//       try {
//         const response = await audioAPI.searchAudio('naat', { limit: 10, type: 'naat' });
//         const results = response?.data?.data || response?.data || response || [];
        
//         if (results.length > 0) {
//           const audioToPlay = results[0];
//           playAudio(audioToPlay, results, 0);
//           toast.success(`Playing naat: ${audioToPlay.title}`, { id: 'voice-play' });
//         } else {
//           toast.error('No naat audio found', { id: 'voice-play' });
//         }
//       } catch (error) {
//         console.error('Search error:', error);
//         toast.error('Failed to play naat', { id: 'voice-play' });
//       }
//       setVoiceTranscript('');
//       return true;
//     }
    
//     // Play specific audio (e.g., "play Alvida")
//     if (lowerCommand.includes('play ') && lowerCommand.length > 5) {
//       let searchTerms = command.replace(/play/gi, '').trim();
      
//       if (searchTerms && searchTerms.length > 2) {
//         console.log(`🔍 Searching for specific audio: ${searchTerms}`);
//         toast.loading(`Searching for "${searchTerms}"...`, { id: 'voice-play' });
        
//         try {
//           const response = await audioAPI.searchAudio(searchTerms, { limit: 10 });
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
//         setVoiceTranscript('');
//         return true;
//       }
//     }
    
//     // ============================================
//     // CATEGORY FILTER COMMANDS (English)
//     // ============================================
//     const categoryCommands = {
//       'nauha': 'Nauha',
//       'marsiya': 'Marsiya',
//       'soz': 'Soz',
//       'salam': 'Salam',
//       'naat': 'Naat',
//       'hamd': 'Hamd',
//       'manqabat': 'Manqabat',
//       'ghazal': 'Ghazal',
//       'nazm': 'Nazm',
//       'podcast': 'Podcast',
//       'audiobook': 'Audiobook'
//     };
    
//     for (const [cmd, label] of Object.entries(categoryCommands)) {
//       if (lowerCommand === cmd || lowerCommand.includes(cmd)) {
//         console.log(`✅ Setting category to: ${cmd}`);
//         setActiveCategory(cmd);
//         setSearchQuery('');
//         setCurrentPage(1);
//         toast.success(`Showing ${label} audio`);
//         setVoiceTranscript('');
//         return true;
//       }
//     }
    
//     // ============================================
//     // SHOW ALL COMMAND
//     // ============================================
//     if (lowerCommand === 'all' || lowerCommand === 'show all' || lowerCommand.includes('all audio')) {
//       setActiveCategory('all');
//       setSearchQuery('');
//       setCurrentPage(1);
//       toast.success('Showing all audio');
//       setVoiceTranscript('');
//       return true;
//     }
    
//     // ============================================
//     // SEARCH COMMAND
//     // ============================================
//     if (lowerCommand.includes('search')) {
//       let searchTerms = command.replace(/search/gi, '').trim();
      
//       if (searchTerms && searchTerms.length > 1) {
//         setSearchQuery(searchTerms);
//         setActiveCategory('all');
//         setCurrentPage(1);
//         toast.success(`Searching for: ${searchTerms}`);
//         setVoiceTranscript('');
//         return true;
//       }
//     }
    
//     // ============================================
//     // HELP COMMAND
//     // ============================================
//     if (lowerCommand === 'help' || lowerCommand.includes('help')) {
//       toast.success(
//         '🎤 Voice Commands:\n\n' +
//         '• "play nauha" - Play Nauha\n' +
//         '• "play marsiya" - Play Marsiya\n' +
//         '• "play Alvida" - Play specific audio\n' +
//         '• "pause" - Pause playback\n' +
//         '• "resume" - Resume playback\n' +
//         '• "next" - Next track\n' +
//         '• "previous" - Previous track\n' +
//         '• "volume up" - Increase volume\n' +
//         '• "volume down" - Decrease volume\n' +
//         '• "mute" - Mute audio\n' +
//         '• "search ghazal" - Search audio\n' +
//         '• "nauha" - Show Nauha category\n' +
//         '• "all" - Show all audio',
//         { duration: 8000 }
//       );
//       setVoiceTranscript('');
//       return true;
//     }
    
//     // ============================================
//     // DEFAULT: Search with command (if meaningful)
//     // ============================================
//     if (command.length > 3) {
//       setSearchQuery(command);
//       setActiveCategory('all');
//       setCurrentPage(1);
//       toast.success(`Searching for: ${command}`);
//       setVoiceTranscript('');
//       return true;
//     }
    
//     console.log('❌ No command matched');
//     toast.error('Command not recognized. Try "pause", "play nauha", or "help"');
//     setVoiceTranscript('');
//     return false;
//   };

//   const startVoiceSearch = () => {
//     if (!voiceSupported) {
//       toast.error('Voice search is not supported in your browser');
//       return;
//     }
    
//     if (recognitionRef.current) {
//       try {
//         recognitionRef.current.lang = 'en-US';
//         recognitionRef.current.start();
//       } catch (error) {
//         console.error('Error starting recognition:', error);
//         toast.error('Failed to start voice recognition');
//       }
//     }
//   };

//   const stopVoiceSearch = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//     }
//   };

//   const { data: response, isLoading, error, refetch } = useQuery({
//     queryKey: ['audio', currentPage, activeCategory, sortBy, searchQuery],
//     queryFn: () => audioAPI.getAudioItems({
//       page: currentPage,
//       limit: itemsPerPage,
//       type: activeCategory !== 'all' ? activeCategory.toLowerCase() : undefined,
//       search: searchQuery || undefined,
//       sort: sortBy
//     }),
//     enabled: true,
//     staleTime: 30000
//   });

//   const audioData = response?.data?.data || response?.data || response || [];
//   const audioItems = Array.isArray(audioData) ? audioData : [];
//   const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 };

//   useEffect(() => {
//     if (activeCategory && activeCategory !== 'all') {
//       setSearchParams({ category: activeCategory, ...(searchQuery && { search: searchQuery }) });
//     } else {
//       setSearchParams(searchQuery ? { search: searchQuery } : {});
//     }
//     setCurrentPage(1);
//   }, [activeCategory, searchQuery, setSearchParams]);

//   const goToPage = (page) => {
//     if (page >= 1 && page <= (pagination.totalPages || 1)) {
//       setCurrentPage(page);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const formatDuration = (seconds) => {
//     if (!seconds) return 'N/A';
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return hrs > 0
//       ? `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
//       : `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   const formatPlays = (plays) => {
//     if (!plays) return '0';
//     if (plays >= 1000000) return `${(plays / 1000000).toFixed(1)}M`;
//     if (plays >= 1000) return `${(plays / 1000).toFixed(1)}K`;
//     return plays.toString();
//   };

//   const clearFilters = () => {
//     setSearchQuery('');
//     setActiveCategory('all');
//     setSortBy('popular');
//     setCurrentPage(1);
//     toast.success('Filters cleared');
//   };

//   const getCategoryDisplayName = (type) => {
//     const category = AUDIO_CATEGORIES.find(cat => cat.id === type?.toLowerCase());
//     return category?.label || type || 'Audio';
//   };

//   // Now playing bar component
//   const NowPlayingBar = () => {
//     if (!currentAudio) return null;
    
//     return (
//       <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg z-50 border-t border-gray-700">
//         <div className="max-w-7xl mx-auto px-4 py-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4 flex-1">
//               <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
//                 <Headphones className="h-6 w-6" />
//               </div>
//               <div className="flex-1">
//                 <p className="font-medium text-sm truncate">{currentAudio.title}</p>
//                 <p className="text-xs text-gray-400">
//                   {currentAudio.author?.name || 'Unknown Artist'}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={previousAudio}
//                 className="p-2 hover:bg-white/10 rounded-full transition"
//               >
//                 <SkipBack className="h-5 w-5" />
//               </button>
//               <button
//                 onClick={isPlaying ? pauseAudio : resumeAudio}
//                 className="p-3 bg-primary-600 hover:bg-primary-700 rounded-full transition"
//               >
//                 {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
//               </button>
//               <button
//                 onClick={nextAudio}
//                 className="p-2 hover:bg-white/10 rounded-full transition"
//               >
//                 <SkipForward className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   /* ================= LOADING ================= */
//   if (isLoading && audioItems.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
//         <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   /* ================= ERROR ================= */
//   if (error && audioItems.length === 0) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
//         <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
//         <h2 className="text-xl font-semibold mb-2">Failed to load audio</h2>
//         <p className="text-gray-500 mb-4">Please check your connection and try again</p>
//         <button onClick={() => refetch()} className="btn-primary">Retry</button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 via-white to-gray-100">
//       {/* Now Playing Bar */}
//       <NowPlayingBar />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         {/* HEADER */}
//         <div className="mb-10 text-center">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
//             {t('common.audio', 'Audio Library')}
//           </h1>
//           <p className="text-gray-500 mt-2">
//             Discover premium Urdu audio experiences
//           </p>
          
//           {/* Voice Search Badge */}
//           {voiceSupported && (
//             <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-primary-50 text-primary-600 text-sm rounded-full">
//               <Mic className="h-4 w-4" />
//               <span>Voice search available - Speak English commands</span>
//             </div>
//           )}
//         </div>

//         {/* CONTROLS */}
//         <div className="sticky top-20 z-10 bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-4 mb-8 shadow-sm flex flex-col md:flex-row gap-4">

//           {/* SEARCH with Voice */}
//           <div className="flex-1 relative">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
//             <input
//               type="text"
//               placeholder={isListening ? "Listening..." : "Search audio by title, artist, or type..."}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-11 pr-24 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 bg-white"
//             />
            
//             {/* Voice Search Button */}
//             {voiceSupported && (
//               <button
//                 onClick={isListening ? stopVoiceSearch : startVoiceSearch}
//                 className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${
//                   isListening 
//                     ? 'bg-red-500 text-white animate-pulse' 
//                     : 'bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-600'
//                 }`}
//                 title={isListening ? "Stop listening" : "Voice search"}
//               >
//                 {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
//               </button>
//             )}
            
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery('')}
//                 className="absolute right-14 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200"
//               >
//                 <X className="h-4 w-4 text-gray-400" />
//               </button>
//             )}
//           </div>

//           {/* Voice Transcript Display */}
//           {voiceTranscript && !isListening && (
//             <div className="text-xs text-primary-600 bg-primary-50 px-3 py-1 rounded-full flex items-center gap-1">
//               <Volume2 className="h-3 w-3" />
//               <span>"{voiceTranscript}"</span>
//               <button onClick={() => setVoiceTranscript('')} className="ml-1">
//                 <X className="h-3 w-3" />
//               </button>
//             </div>
//           )}

//           {/* SORT */}
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-primary-500"
//           >
//             <option value="popular">Most Popular</option>
//             <option value="recent">Newest First</option>
//             <option value="plays">Most Played</option>
//             <option value="oldest">Oldest First</option>
//           </select>

//           {/* VIEW MODE */}
//           <div className="flex rounded-xl border overflow-hidden bg-white">
//             <button
//               onClick={() => setViewMode('grid')}
//               className={`p-3 transition-colors ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
//               title="Grid view"
//             >
//               <Grid className="h-5 w-5" />
//             </button>
//             <button
//               onClick={() => setViewMode('list')}
//               className={`p-3 transition-colors ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
//               title="List view"
//             >
//               <List className="h-5 w-5" />
//             </button>
//           </div>

//           {/* Clear Filters */}
//           {(searchQuery || activeCategory !== 'all' || sortBy !== 'popular') && (
//             <button
//               onClick={clearFilters}
//               className="px-4 py-3 text-gray-600 hover:text-gray-800 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
//             >
//               Clear All
//             </button>
//           )}
//         </div>

//         {/* Voice Command Examples */}
//         {voiceSupported && (
//           <div className="mb-6 p-4 bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl">
//             <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
//               <Zap className="h-4 w-4 text-primary-600" />
//               <span className="font-medium">Try these English voice commands:</span>
//             </div>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
//               <div className="space-y-1">
//                 <p className="font-medium text-primary-600">🎵 Play:</p>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"play nauha"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"play Alvida"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"play marsiya"</span>
//               </div>
//               <div className="space-y-1">
//                 <p className="font-medium text-primary-600">⏮️ Controls:</p>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"pause"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"resume"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"next"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"previous"</span>
//               </div>
//               <div className="space-y-1">
//                 <p className="font-medium text-primary-600">🔊 Volume:</p>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"volume up"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"volume down"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"mute"</span>
//               </div>
//               <div className="space-y-1">
//                 <p className="font-medium text-primary-600">📂 Categories:</p>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"nauha"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"ghazal"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"search naat"</span>
//               </div>
//             </div>
//             <div className="mt-3 text-center text-xs text-gray-500">
//               💡 Say <span className="font-medium text-primary-600">"help"</span> for all commands
//             </div>
//           </div>
//         )}

//         {/* CATEGORY PILLS WITH SCROLL BUTTONS */}
//         <div className="relative mb-8">
//           <button
//             onClick={() => scrollCategories('left')}
//             className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1.5 border border-gray-200 hover:bg-gray-50 transition-all"
//           >
//             <ChevronLeftCircle className="h-6 w-6 text-gray-600" />
//           </button>
          
//           <div
//             ref={categoryScrollRef}
//             className="flex gap-2 overflow-x-auto scrollbar-hide px-8"
//             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//           >
//             <button
//               onClick={() => setActiveCategory('all')}
//               className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
//                 activeCategory === 'all'
//                   ? 'bg-primary-600 text-white shadow-md'
//                   : 'bg-white border border-gray-200 hover:bg-gray-50'
//               }`}
//             >
//               All Audio
//             </button>
//             {AUDIO_CATEGORIES.map(cat => (
//               <button
//                 key={cat.id}
//                 onClick={() => setActiveCategory(cat.id)}
//                 className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1 flex-shrink-0 ${
//                   activeCategory === cat.id
//                     ? 'bg-primary-600 text-white shadow-md'
//                     : 'bg-white border border-gray-200 hover:bg-gray-50'
//                 }`}
//               >
//                 <span>{cat.icon}</span>
//                 <span>{cat.label}</span>
//               </button>
//             ))}
//           </div>
          
//           <button
//             onClick={() => scrollCategories('right')}
//             className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1.5 border border-gray-200 hover:bg-gray-50 transition-all"
//           >
//             <ChevronRightCircle className="h-6 w-6 text-gray-600" />
//           </button>
//         </div>

//         {/* RESULTS COUNT */}
//         <div className="mb-4 text-sm text-gray-500">
//           Found {pagination.total || audioItems.length} audio items
//           {searchQuery && <span> matching "{searchQuery}"</span>}
//           {activeCategory !== 'all' && <span> in {activeCategory}</span>}
//         </div>

//         {/* EMPTY STATE */}
//         {audioItems.length === 0 ? (
//           <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
//             <Headphones className="mx-auto h-12 w-12 text-gray-300 mb-4" />
//             <p className="text-gray-500">No audio found</p>
//             {(searchQuery || activeCategory !== 'all') && (
//               <button onClick={clearFilters} className="text-primary-600 mt-2 hover:underline">
//                 Clear filters to see all audio
//               </button>
//             )}
//           </div>
//         ) : (
//           <>
//             {/* GRID/LIST VIEW */}
//             <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
//               {audioItems.map((audio, index) => (
//                 <motion.div
//                   key={audio._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: Math.min(index * 0.05, 0.5) }}
//                 >
//                   <div className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
//                     <Link to={`/audio/${audio.slug}`}>
//                       <div className={`${viewMode === 'list' ? 'flex' : ''}`}>
//                         {/* IMAGE */}
//                         <div className={`${viewMode === 'list' ? 'w-40 md:w-60' : 'w-full'} relative overflow-hidden`}>
//                           <img
//                             src={audio.thumbnail || audio.coverImage || 'https://via.placeholder.com/300x300?text=Audio'}
//                             alt={audio.title}
//                             className="w-full aspect-square object-cover group-hover:scale-110 transition duration-500"
//                             onError={(e) => {
//                               e.target.src = 'https://via.placeholder.com/300x300?text=Audio';
//                             }}
//                           />
//                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                             <div className="bg-white/90 p-3 rounded-full transform scale-90 group-hover:scale-110 transition">
//                               <Play className="text-primary-600 h-6 w-6 ml-0.5" />
//                             </div>
//                           </div>
//                           {audio.duration && (
//                             <div className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded-md flex items-center gap-1">
//                               <Clock className="h-3 w-3" />
//                               {formatDuration(audio.duration)}
//                             </div>
//                           )}
//                           {audio.isPremium && (
//                             <div className="absolute top-2 right-2 px-2 py-1 bg-yellow-500 text-white text-xs rounded-md">
//                               Premium
//                             </div>
//                           )}
//                         </div>

//                         {/* CONTENT */}
//                         <div className="p-5 flex-1">
//                           <div className="flex items-center gap-2 mb-2">
//                             <span className="px-2 py-0.5 bg-primary-50 text-primary-600 text-xs rounded-full capitalize">
//                               {getCategoryDisplayName(audio.type)}
//                             </span>
//                             {audio.language && (
//                               <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
//                                 {audio.language}
//                               </span>
//                             )}
//                           </div>

//                           <h3 className="font-semibold text-lg group-hover:text-primary-600 line-clamp-2 transition-colors">
//                             {audio.title}
//                           </h3>

//                           {audio.author && (
//                             <p className="text-sm text-gray-500 mt-1">
//                               {typeof audio.author === 'object' ? audio.author.name : audio.author}
//                             </p>
//                           )}

//                           {audio.description && (
//                             <p className="text-sm text-gray-500 mt-2 line-clamp-2">
//                               {audio.description}
//                             </p>
//                           )}

//                           <div className="flex gap-4 text-sm text-gray-400 mt-3">
//                             <span className="flex items-center gap-1">
//                               <Play className="h-4 w-4" /> {formatPlays(audio.stats?.plays)}
//                             </span>
//                             <span className="flex items-center gap-1">
//                               <Eye className="h-4 w-4" /> {formatPlays(audio.stats?.views)}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
                    
//                     {/* Quick Play Button */}
//                     <div className="px-5 pb-4">
//                       <button
//                         onClick={() => playAudio(audio, audioItems, index)}
//                         className="w-full py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg flex items-center justify-center gap-2 transition"
//                       >
//                         <Play className="h-4 w-4" />
//                         <span>Play Now</span>
//                       </button>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* PAGINATION */}
//             {(pagination.totalPages || 1) > 1 && (
//               <div className="flex justify-center gap-2 mt-12">
//                 <button
//                   onClick={() => goToPage(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="p-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                 >
//                   <ChevronLeft className="h-5 w-5" />
//                 </button>

//                 {[...Array(Math.min(pagination.totalPages || 1, 7))].map((_, i) => {
//                   let pageNum;
//                   const totalPages = pagination.totalPages || 1;
                  
//                   if (totalPages <= 7) {
//                     pageNum = i + 1;
//                   } else if (currentPage <= 4) {
//                     pageNum = i + 1;
//                     if (i === 6) pageNum = totalPages;
//                   } else if (currentPage >= totalPages - 3) {
//                     pageNum = totalPages - 6 + i;
//                   } else {
//                     pageNum = currentPage - 3 + i;
//                     if (i === 0) pageNum = 1;
//                     if (i === 6) pageNum = totalPages;
//                   }
                  
//                   if (i === 5 && totalPages > 7 && currentPage > 4 && currentPage < totalPages - 3) {
//                     return <span key="ellipsis" className="px-4 py-2">...</span>;
//                   }
                  
//                   return (
//                     <button
//                       key={pageNum}
//                       onClick={() => goToPage(pageNum)}
//                       className={`px-4 py-2 rounded-lg ${
//                         currentPage === pageNum
//                           ? 'bg-primary-600 text-white'
//                           : 'bg-white border hover:bg-gray-50'
//                       }`}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 })}

//                 <button
//                   onClick={() => goToPage(currentPage + 1)}
//                   disabled={currentPage === (pagination.totalPages || 1)}
//                   className="p-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                 >
//                   <ChevronRight className="h-5 w-5" />
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AudioListPage;


















// // client/src/pages/public/AudioListPage.jsx
// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useSearchParams, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useQuery } from '@tanstack/react-query';
// import {
//   Search, Headphones, Play, Clock, Eye,
//   Grid, List, Loader2, AlertCircle,
//   ChevronLeft, ChevronRight, Mic, MicOff,
//   Volume2, VolumeX, Zap, X, Pause, SkipForward, SkipBack,
//   ChevronLeftCircle, ChevronRightCircle
// } from 'lucide-react';
// import audioAPI from '../../api/audioAPI';
// import { AUDIO_CATEGORIES } from '../../utils/constants.js';
// import { useAudioPlayer } from '../../context/AudioPlayerContext';
// import toast from 'react-hot-toast';

// const AudioListPage = () => {
//   const { t } = useTranslation();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [viewMode, setViewMode] = useState('grid');
//   const [sortBy, setSortBy] = useState('popular');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isListening, setIsListening] = useState(false);
//   const [voiceSupported, setVoiceSupported] = useState(true);
//   const [voiceTranscript, setVoiceTranscript] = useState('');
//   const recognitionRef = useRef(null);
//   const categoryScrollRef = useRef(null);
//   const itemsPerPage = 9;

//   // Get audio player functions
//   const { 
//     currentAudio, 
//     isPlaying, 
//     playAudio, 
//     pauseAudio, 
//     resumeAudio,
//     nextAudio,
//     previousAudio,
//     volumeUp,
//     volumeDown,
//     toggleMute,
//     isMuted
//   } = useAudioPlayer();

//   // Debug audio player state
//   useEffect(() => {
//     console.log('🎵 Audio Player State:', {
//       currentAudio: currentAudio?.title,
//       isPlaying,
//       hasAudio: !!currentAudio
//     });
//   }, [currentAudio, isPlaying]);

//   // Scroll category pills
//   const scrollCategories = (direction) => {
//     if (categoryScrollRef.current) {
//       const scrollAmount = 200;
//       const currentScroll = categoryScrollRef.current.scrollLeft;
//       const newScroll = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;
//       categoryScrollRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });
//     }
//   };

//   // Initialize speech recognition - ENGLISH FIRST
//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
//     if (!SpeechRecognition) {
//       setVoiceSupported(false);
//       console.warn('Speech recognition not supported in this browser');
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.continuous = false;
//     recognition.interimResults = true;
//     recognition.lang = 'en-US';
//     recognition.maxAlternatives = 5;

//     recognition.onstart = () => {
//       setIsListening(true);
//       toast.success('Listening... Speak English commands', { duration: 2000 });
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//     };

//     recognition.onresult = (event) => {
//       let transcript = event.results[0][0].transcript;
//       const alternatives = [];
//       for (let i = 0; i < event.results[0].length; i++) {
//         alternatives.push(event.results[0][i].transcript);
//       }
      
//       console.log('🎤 Voice transcripts:', alternatives);
//       setVoiceTranscript(transcript);
      
//       if (event.results[0].isFinal) {
//         let bestMatch = transcript;
//         for (const alt of alternatives) {
//           const lowerAlt = alt.toLowerCase();
//           if (lowerAlt === 'pause' || lowerAlt === 'next' || lowerAlt === 'previous' || 
//               lowerAlt === 'resume' || lowerAlt === 'play' || lowerAlt.includes('play ')) {
//             bestMatch = alt;
//             break;
//           }
//         }
//         processVoiceCommand(bestMatch);
//       }
//     };

//     recognition.onerror = (event) => {
//       console.error('Speech recognition error:', event.error);
//       setIsListening(false);
      
//       if (event.error === 'not-allowed') {
//         toast.error('Microphone access denied. Please allow microphone access.');
//       } else if (event.error === 'no-speech') {
//         toast.error('No speech detected. Please try again.');
//       } else {
//         toast.error('Voice recognition failed. Please try again.');
//       }
//     };

//     recognitionRef.current = recognition;

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//       }
//     };
//   }, []);

//   // Process voice commands - FIXED ORDER (Playback controls FIRST)
//   const processVoiceCommand = async (command) => {
//     const lowerCommand = command.toLowerCase().trim();
    
//     console.log('🎤 Processing command:', { original: command, lower: lowerCommand });
    
//     // ============================================
//     // PLAYBACK CONTROL COMMANDS - HIGHEST PRIORITY
//     // ============================================
    
//     // PAUSE command - Check EXACT matches first
//     if (lowerCommand === 'pause' || lowerCommand === 'stop' || 
//         lowerCommand === 'paus' || lowerCommand === 'pawse' ||
//         lowerCommand.includes('pause') || lowerCommand.includes('stop')) {
//       console.log('✅ Executing PAUSE command');
//       pauseAudio();
//       toast.success('⏸️ Audio paused');
//       setVoiceTranscript('');
//       return true;
//     }
    
//     // RESUME command
//     if (lowerCommand === 'resume' || lowerCommand === 'play' || 
//         lowerCommand === 'resum' || lowerCommand === 'start' ||
//         lowerCommand.includes('resume') || lowerCommand.includes('start')) {
//       if (currentAudio) {
//         console.log('✅ Executing RESUME command');
//         resumeAudio();
//         toast.success('▶️ Audio resumed');
//       } else {
//         toast.error('No audio to resume');
//       }
//       setVoiceTranscript('');
//       return true;
//     }
    
//     // NEXT command
//     if (lowerCommand === 'next' || lowerCommand === 'skip' || 
//         lowerCommand === 'next track' || lowerCommand === 'next song' ||
//         lowerCommand.includes('next') || lowerCommand.includes('skip')) {
//       console.log('✅ Executing NEXT command');
//       nextAudio();
//       toast.success('⏭️ Next track');
//       setVoiceTranscript('');
//       return true;
//     }
    
//     // PREVIOUS command
//     if (lowerCommand === 'previous' || lowerCommand === 'back' || 
//         lowerCommand === 'prev' || lowerCommand === 'previous track' ||
//         lowerCommand.includes('previous') || lowerCommand.includes('back')) {
//       console.log('✅ Executing PREVIOUS command');
//       previousAudio();
//       toast.success('⏮️ Previous track');
//       setVoiceTranscript('');
//       return true;
//     }
    
//     // ============================================
//     // VOLUME CONTROL COMMANDS
//     // ============================================
//     if (lowerCommand === 'volume up' || lowerCommand === 'louder' || 
//         lowerCommand === 'increase volume' || lowerCommand.includes('volume up')) {
//       console.log('✅ Executing VOLUME UP command');
//       volumeUp();
//       toast.success('🔊 Volume increased');
//       setVoiceTranscript('');
//       return true;
//     }
    
//     if (lowerCommand === 'volume down' || lowerCommand === 'softer' || 
//         lowerCommand === 'decrease volume' || lowerCommand.includes('volume down')) {
//       console.log('✅ Executing VOLUME DOWN command');
//       volumeDown();
//       toast.success('🔉 Volume decreased');
//       setVoiceTranscript('');
//       return true;
//     }
    
//     if (lowerCommand === 'mute' || lowerCommand === 'silence' || 
//         lowerCommand.includes('mute')) {
//       console.log('✅ Executing MUTE command');
//       toggleMute();
//       toast.success(isMuted ? '🔇 Unmuted' : '🔇 Muted');
//       setVoiceTranscript('');
//       return true;
//     }
    
//     // ============================================
//     // PLAY SPECIFIC AUDIO COMMANDS
//     // ============================================
    
//     // Play Nauha command
//     if (lowerCommand.includes('play nauha')) {
//       console.log('✅ Executing PLAY NAUHA command');
//       toast.loading('Searching for nauha audio...', { id: 'voice-play' });
//       try {
//         const response = await audioAPI.searchAudio('nauha', { limit: 10, type: 'nauha' });
//         const results = response?.data?.data || response?.data || response || [];
        
//         if (results.length > 0) {
//           const audioToPlay = results[0];
//           playAudio(audioToPlay, results, 0);
//           toast.success(`Playing nauha: ${audioToPlay.title}`, { id: 'voice-play' });
//         } else {
//           toast.error('No nauha audio found', { id: 'voice-play' });
//         }
//       } catch (error) {
//         console.error('Search error:', error);
//         toast.error('Failed to play nauha', { id: 'voice-play' });
//       }
//       setVoiceTranscript('');
//       return true;
//     }
    
//     // Play Marsiya command
//     if (lowerCommand.includes('play marsiya')) {
//       console.log('✅ Executing PLAY MARSIYA command');
//       toast.loading('Searching for marsiya audio...', { id: 'voice-play' });
//       try {
//         const response = await audioAPI.searchAudio('marsiya', { limit: 10, type: 'marsiya' });
//         const results = response?.data?.data || response?.data || response || [];
        
//         if (results.length > 0) {
//           const audioToPlay = results[0];
//           playAudio(audioToPlay, results, 0);
//           toast.success(`Playing marsiya: ${audioToPlay.title}`, { id: 'voice-play' });
//         } else {
//           toast.error('No marsiya audio found', { id: 'voice-play' });
//         }
//       } catch (error) {
//         console.error('Search error:', error);
//         toast.error('Failed to play marsiya', { id: 'voice-play' });
//       }
//       setVoiceTranscript('');
//       return true;
//     }
    
//     // Play Ghazal command
//     if (lowerCommand.includes('play ghazal')) {
//       console.log('✅ Executing PLAY GHAZAL command');
//       toast.loading('Searching for ghazal audio...', { id: 'voice-play' });
//       try {
//         const response = await audioAPI.searchAudio('ghazal', { limit: 10, type: 'ghazal' });
//         const results = response?.data?.data || response?.data || response || [];
        
//         if (results.length > 0) {
//           const audioToPlay = results[0];
//           playAudio(audioToPlay, results, 0);
//           toast.success(`Playing ghazal: ${audioToPlay.title}`, { id: 'voice-play' });
//         } else {
//           toast.error('No ghazal audio found', { id: 'voice-play' });
//         }
//       } catch (error) {
//         console.error('Search error:', error);
//         toast.error('Failed to play ghazal', { id: 'voice-play' });
//       }
//       setVoiceTranscript('');
//       return true;
//     }
    
//     // Play Naat command
//     if (lowerCommand.includes('play naat')) {
//       console.log('✅ Executing PLAY NAAT command');
//       toast.loading('Searching for naat audio...', { id: 'voice-play' });
//       try {
//         const response = await audioAPI.searchAudio('naat', { limit: 10, type: 'naat' });
//         const results = response?.data?.data || response?.data || response || [];
        
//         if (results.length > 0) {
//           const audioToPlay = results[0];
//           playAudio(audioToPlay, results, 0);
//           toast.success(`Playing naat: ${audioToPlay.title}`, { id: 'voice-play' });
//         } else {
//           toast.error('No naat audio found', { id: 'voice-play' });
//         }
//       } catch (error) {
//         console.error('Search error:', error);
//         toast.error('Failed to play naat', { id: 'voice-play' });
//       }
//       setVoiceTranscript('');
//       return true;
//     }
    
//     // Play specific audio (e.g., "play Alvida")
//     if (lowerCommand.startsWith('play ') && lowerCommand.length > 5) {
//       let searchTerms = command.replace(/play/gi, '').trim();
      
//       if (searchTerms && searchTerms.length > 2) {
//         console.log(`🔍 Searching for specific audio: ${searchTerms}`);
//         toast.loading(`Searching for "${searchTerms}"...`, { id: 'voice-play' });
        
//         try {
//           const response = await audioAPI.searchAudio(searchTerms, { limit: 10 });
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
//         setVoiceTranscript('');
//         return true;
//       }
//     }
    
//     // ============================================
//     // CATEGORY FILTER COMMANDS
//     // ============================================
//     const categoryCommands = {
//       'nauha': 'Nauha',
//       'marsiya': 'Marsiya',
//       'soz': 'Soz',
//       'salam': 'Salam',
//       'naat': 'Naat',
//       'hamd': 'Hamd',
//       'manqabat': 'Manqabat',
//       'ghazal': 'Ghazal',
//       'nazm': 'Nazm',
//       'podcast': 'Podcast',
//       'audiobook': 'Audiobook'
//     };
    
//     for (const [cmd, label] of Object.entries(categoryCommands)) {
//       if (lowerCommand === cmd || lowerCommand.includes(cmd)) {
//         console.log(`✅ Setting category to: ${cmd}`);
//         setActiveCategory(cmd);
//         setSearchQuery('');
//         setCurrentPage(1);
//         toast.success(`Showing ${label} audio`);
//         setVoiceTranscript('');
//         return true;
//       }
//     }
    
//     // ============================================
//     // SHOW ALL COMMAND
//     // ============================================
//     if (lowerCommand === 'all' || lowerCommand === 'show all' || lowerCommand.includes('all audio')) {
//       setActiveCategory('all');
//       setSearchQuery('');
//       setCurrentPage(1);
//       toast.success('Showing all audio');
//       setVoiceTranscript('');
//       return true;
//     }
    
//     // ============================================
//     // SEARCH COMMAND
//     // ============================================
//     if (lowerCommand.startsWith('search ') || lowerCommand.includes('search for')) {
//       let searchTerms = command.replace(/search|search for/gi, '').trim();
      
//       if (searchTerms && searchTerms.length > 1) {
//         setSearchQuery(searchTerms);
//         setActiveCategory('all');
//         setCurrentPage(1);
//         toast.success(`Searching for: ${searchTerms}`);
//         setVoiceTranscript('');
//         return true;
//       } else {
//         toast.error('What would you like to search for?');
//         setVoiceTranscript('');
//         return true;
//       }
//     }
    
//     // ============================================
//     // HELP COMMAND
//     // ============================================
//     if (lowerCommand === 'help' || lowerCommand.includes('help') || lowerCommand === 'what can i say') {
//       toast.success(
//         '🎤 Voice Commands:\n\n' +
//         '• "pause" - Pause playback\n' +
//         '• "resume" - Resume playback\n' +
//         '• "next" - Next track\n' +
//         '• "previous" - Previous track\n' +
//         '• "play nauha" - Play Nauha\n' +
//         '• "play Alvida" - Play specific audio\n' +
//         '• "volume up" - Increase volume\n' +
//         '• "volume down" - Decrease volume\n' +
//         '• "mute" - Mute audio\n' +
//         '• "search ghazal" - Search audio\n' +
//         '• "nauha" - Show Nauha category\n' +
//         '• "all" - Show all audio',
//         { duration: 8000 }
//       );
//       setVoiceTranscript('');
//       return true;
//     }
    
//     // ============================================
//     // DEFAULT: If no command matched, try search
//     // ============================================
//     if (command.length > 3) {
//       console.log(`🔍 No command matched, searching for: ${command}`);
//       setSearchQuery(command);
//       setActiveCategory('all');
//       setCurrentPage(1);
//       toast.success(`Searching for: ${command}`);
//       setVoiceTranscript('');
//       return true;
//     }
    
//     console.log('❌ No command matched');
//     toast.error('Command not recognized. Try "pause", "play nauha", or "help"');
//     setVoiceTranscript('');
//     return false;
//   };

//   const startVoiceSearch = () => {
//     if (!voiceSupported) {
//       toast.error('Voice search is not supported in your browser');
//       return;
//     }
    
//     if (recognitionRef.current) {
//       try {
//         // Stop any existing recognition
//         recognitionRef.current.stop();
//         // Small delay before starting new one
//         setTimeout(() => {
//           recognitionRef.current.lang = 'en-US';
//           recognitionRef.current.start();
//           toast.success('Listening... Say "pause", "next", or "play nauha"', { duration: 2000 });
//         }, 100);
//       } catch (error) {
//         console.error('Error starting recognition:', error);
//         toast.error('Failed to start voice recognition');
//       }
//     }
//   };

//   const stopVoiceSearch = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//     }
//   };

//   const { data: response, isLoading, error, refetch } = useQuery({
//     queryKey: ['audio', currentPage, activeCategory, sortBy, searchQuery],
//     queryFn: () => audioAPI.getAudioItems({
//       page: currentPage,
//       limit: itemsPerPage,
//       type: activeCategory !== 'all' ? activeCategory.toLowerCase() : undefined,
//       search: searchQuery || undefined,
//       sort: sortBy
//     }),
//     enabled: true,
//     staleTime: 30000
//   });

//   const audioData = response?.data?.data || response?.data || response || [];
//   const audioItems = Array.isArray(audioData) ? audioData : [];
//   const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 };

//   useEffect(() => {
//     if (activeCategory && activeCategory !== 'all') {
//       setSearchParams({ category: activeCategory, ...(searchQuery && { search: searchQuery }) });
//     } else {
//       setSearchParams(searchQuery ? { search: searchQuery } : {});
//     }
//     setCurrentPage(1);
//   }, [activeCategory, searchQuery, setSearchParams]);

//   const goToPage = (page) => {
//     if (page >= 1 && page <= (pagination.totalPages || 1)) {
//       setCurrentPage(page);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const formatDuration = (seconds) => {
//     if (!seconds) return 'N/A';
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return hrs > 0
//       ? `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
//       : `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   const formatPlays = (plays) => {
//     if (!plays) return '0';
//     if (plays >= 1000000) return `${(plays / 1000000).toFixed(1)}M`;
//     if (plays >= 1000) return `${(plays / 1000).toFixed(1)}K`;
//     return plays.toString();
//   };

//   const clearFilters = () => {
//     setSearchQuery('');
//     setActiveCategory('all');
//     setSortBy('popular');
//     setCurrentPage(1);
//     toast.success('Filters cleared');
//   };

//   const getCategoryDisplayName = (type) => {
//     const category = AUDIO_CATEGORIES.find(cat => cat.id === type?.toLowerCase());
//     return category?.label || type || 'Audio';
//   };

//   // Now playing bar component
//   const NowPlayingBar = () => {
//     if (!currentAudio) return null;
    
//     return (
//       <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg z-50 border-t border-gray-700">
//         <div className="max-w-7xl mx-auto px-4 py-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4 flex-1">
//               <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
//                 <Headphones className="h-6 w-6" />
//               </div>
//               <div className="flex-1">
//                 <p className="font-medium text-sm truncate">{currentAudio.title}</p>
//                 <p className="text-xs text-gray-400">
//                   {currentAudio.author?.name || 'Unknown Artist'}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={previousAudio}
//                 className="p-2 hover:bg-white/10 rounded-full transition"
//               >
//                 <SkipBack className="h-5 w-5" />
//               </button>
//               <button
//                 onClick={isPlaying ? pauseAudio : resumeAudio}
//                 className="p-3 bg-primary-600 hover:bg-primary-700 rounded-full transition"
//               >
//                 {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
//               </button>
//               <button
//                 onClick={nextAudio}
//                 className="p-2 hover:bg-white/10 rounded-full transition"
//               >
//                 <SkipForward className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   /* ================= LOADING ================= */
//   if (isLoading && audioItems.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
//         <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   /* ================= ERROR ================= */
//   if (error && audioItems.length === 0) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
//         <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
//         <h2 className="text-xl font-semibold mb-2">Failed to load audio</h2>
//         <p className="text-gray-500 mb-4">Please check your connection and try again</p>
//         <button onClick={() => refetch()} className="btn-primary">Retry</button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 via-white to-gray-100">
//       {/* Now Playing Bar */}
//       <NowPlayingBar />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         {/* HEADER */}
//         <div className="mb-10 text-center">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
//             {t('common.audio', 'Audio Library')}
//           </h1>
//           <p className="text-gray-500 mt-2">
//             Discover premium Urdu audio experiences
//           </p>
          
//           {/* Voice Search Badge */}
//           {voiceSupported && (
//             <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-primary-50 text-primary-600 text-sm rounded-full">
//               <Mic className="h-4 w-4" />
//               <span>Voice search - Say "pause", "next", or "help"</span>
//             </div>
//           )}
//         </div>

//         {/* CONTROLS */}
//         <div className="sticky top-20 z-10 bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-4 mb-8 shadow-sm flex flex-col md:flex-row gap-4">

//           {/* SEARCH with Voice */}
//           <div className="flex-1 relative">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
//             <input
//               type="text"
//               placeholder={isListening ? "Listening..." : "Search audio by title, artist, or type..."}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-11 pr-24 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 bg-white"
//             />
            
//             {/* Voice Search Button */}
//             {voiceSupported && (
//               <button
//                 onClick={isListening ? stopVoiceSearch : startVoiceSearch}
//                 className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${
//                   isListening 
//                     ? 'bg-red-500 text-white animate-pulse' 
//                     : 'bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-600'
//                 }`}
//                 title={isListening ? "Stop listening" : "Voice search"}
//               >
//                 {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
//               </button>
//             )}
            
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery('')}
//                 className="absolute right-14 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200"
//               >
//                 <X className="h-4 w-4 text-gray-400" />
//               </button>
//             )}
//           </div>

//           {/* Voice Transcript Display */}
//           {voiceTranscript && !isListening && (
//             <div className="text-xs text-primary-600 bg-primary-50 px-3 py-1 rounded-full flex items-center gap-1">
//               <Volume2 className="h-3 w-3" />
//               <span>You said: "{voiceTranscript}"</span>
//               <button onClick={() => setVoiceTranscript('')} className="ml-1">
//                 <X className="h-3 w-3" />
//               </button>
//             </div>
//           )}

//           {/* SORT */}
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-primary-500"
//           >
//             <option value="popular">Most Popular</option>
//             <option value="recent">Newest First</option>
//             <option value="plays">Most Played</option>
//             <option value="oldest">Oldest First</option>
//           </select>

//           {/* VIEW MODE */}
//           <div className="flex rounded-xl border overflow-hidden bg-white">
//             <button
//               onClick={() => setViewMode('grid')}
//               className={`p-3 transition-colors ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
//               title="Grid view"
//             >
//               <Grid className="h-5 w-5" />
//             </button>
//             <button
//               onClick={() => setViewMode('list')}
//               className={`p-3 transition-colors ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
//               title="List view"
//             >
//               <List className="h-5 w-5" />
//             </button>
//           </div>

//           {/* Clear Filters */}
//           {(searchQuery || activeCategory !== 'all' || sortBy !== 'popular') && (
//             <button
//               onClick={clearFilters}
//               className="px-4 py-3 text-gray-600 hover:text-gray-800 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
//             >
//               Clear All
//             </button>
//           )}
//         </div>

//         {/* Voice Command Examples */}
//         {voiceSupported && (
//           <div className="mb-6 p-4 bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl">
//             <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
//               <Zap className="h-4 w-4 text-primary-600" />
//               <span className="font-medium">Try these voice commands:</span>
//             </div>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
//               <div className="space-y-1">
//                 <p className="font-medium text-primary-600">🎮 Controls:</p>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"pause"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"resume"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"next"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"previous"</span>
//               </div>
//               <div className="space-y-1">
//                 <p className="font-medium text-primary-600">🎵 Play:</p>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"play nauha"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"play Alvida"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"play marsiya"</span>
//               </div>
//               <div className="space-y-1">
//                 <p className="font-medium text-primary-600">🔊 Volume:</p>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"volume up"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"volume down"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"mute"</span>
//               </div>
//               <div className="space-y-1">
//                 <p className="font-medium text-primary-600">📂 Other:</p>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"nauha"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"search ghazal"</span>
//                 <span className="px-2 py-1 bg-white rounded-full inline-block">"help"</span>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* CATEGORY PILLS WITH SCROLL BUTTONS */}
//         <div className="relative mb-8">
//           <button
//             onClick={() => scrollCategories('left')}
//             className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1.5 border border-gray-200 hover:bg-gray-50 transition-all"
//           >
//             <ChevronLeftCircle className="h-6 w-6 text-gray-600" />
//           </button>
          
//           <div
//             ref={categoryScrollRef}
//             className="flex gap-2 overflow-x-auto scrollbar-hide px-8"
//             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//           >
//             <button
//               onClick={() => setActiveCategory('all')}
//               className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
//                 activeCategory === 'all'
//                   ? 'bg-primary-600 text-white shadow-md'
//                   : 'bg-white border border-gray-200 hover:bg-gray-50'
//               }`}
//             >
//               All Audio
//             </button>
//             {AUDIO_CATEGORIES.map(cat => (
//               <button
//                 key={cat.id}
//                 onClick={() => setActiveCategory(cat.id)}
//                 className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1 flex-shrink-0 ${
//                   activeCategory === cat.id
//                     ? 'bg-primary-600 text-white shadow-md'
//                     : 'bg-white border border-gray-200 hover:bg-gray-50'
//                 }`}
//               >
//                 <span>{cat.icon}</span>
//                 <span>{cat.label}</span>
//               </button>
//             ))}
//           </div>
          
//           <button
//             onClick={() => scrollCategories('right')}
//             className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1.5 border border-gray-200 hover:bg-gray-50 transition-all"
//           >
//             <ChevronRightCircle className="h-6 w-6 text-gray-600" />
//           </button>
//         </div>

//         {/* RESULTS COUNT */}
//         <div className="mb-4 text-sm text-gray-500">
//           Found {pagination.total || audioItems.length} audio items
//           {searchQuery && <span> matching "{searchQuery}"</span>}
//           {activeCategory !== 'all' && <span> in {activeCategory}</span>}
//         </div>

//         {/* EMPTY STATE */}
//         {audioItems.length === 0 ? (
//           <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
//             <Headphones className="mx-auto h-12 w-12 text-gray-300 mb-4" />
//             <p className="text-gray-500">No audio found</p>
//             {(searchQuery || activeCategory !== 'all') && (
//               <button onClick={clearFilters} className="text-primary-600 mt-2 hover:underline">
//                 Clear filters to see all audio
//               </button>
//             )}
//           </div>
//         ) : (
//           <>
//             {/* GRID/LIST VIEW */}
//             <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
//               {audioItems.map((audio, index) => (
//                 <motion.div
//                   key={audio._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: Math.min(index * 0.05, 0.5) }}
//                 >
//                   <div className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
//                     <Link to={`/audio/${audio.slug}`}>
//                       <div className={`${viewMode === 'list' ? 'flex' : ''}`}>
//                         {/* IMAGE */}
//                         <div className={`${viewMode === 'list' ? 'w-40 md:w-60' : 'w-full'} relative overflow-hidden`}>
//                           <img
//                             src={audio.thumbnail || audio.coverImage || 'https://via.placeholder.com/300x300?text=Audio'}
//                             alt={audio.title}
//                             className="w-full aspect-square object-cover group-hover:scale-110 transition duration-500"
//                             onError={(e) => {
//                               e.target.src = 'https://via.placeholder.com/300x300?text=Audio';
//                             }}
//                           />
//                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                             <div className="bg-white/90 p-3 rounded-full transform scale-90 group-hover:scale-110 transition">
//                               <Play className="text-primary-600 h-6 w-6 ml-0.5" />
//                             </div>
//                           </div>
//                           {audio.duration && (
//                             <div className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded-md flex items-center gap-1">
//                               <Clock className="h-3 w-3" />
//                               {formatDuration(audio.duration)}
//                             </div>
//                           )}
//                           {audio.isPremium && (
//                             <div className="absolute top-2 right-2 px-2 py-1 bg-yellow-500 text-white text-xs rounded-md">
//                               Premium
//                             </div>
//                           )}
//                         </div>

//                         {/* CONTENT */}
//                         <div className="p-5 flex-1">
//                           <div className="flex items-center gap-2 mb-2">
//                             <span className="px-2 py-0.5 bg-primary-50 text-primary-600 text-xs rounded-full capitalize">
//                               {getCategoryDisplayName(audio.type)}
//                             </span>
//                             {audio.language && (
//                               <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
//                                 {audio.language}
//                               </span>
//                             )}
//                           </div>

//                           <h3 className="font-semibold text-lg group-hover:text-primary-600 line-clamp-2 transition-colors">
//                             {audio.title}
//                           </h3>

//                           {audio.author && (
//                             <p className="text-sm text-gray-500 mt-1">
//                               {typeof audio.author === 'object' ? audio.author.name : audio.author}
//                             </p>
//                           )}

//                           {audio.description && (
//                             <p className="text-sm text-gray-500 mt-2 line-clamp-2">
//                               {audio.description}
//                             </p>
//                           )}

//                           <div className="flex gap-4 text-sm text-gray-400 mt-3">
//                             <span className="flex items-center gap-1">
//                               <Play className="h-4 w-4" /> {formatPlays(audio.stats?.plays)}
//                             </span>
//                             <span className="flex items-center gap-1">
//                               <Eye className="h-4 w-4" /> {formatPlays(audio.stats?.views)}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
                    
//                     {/* Quick Play Button */}
//                     <div className="px-5 pb-4">
//                       <button
//                         onClick={() => playAudio(audio, audioItems, index)}
//                         className="w-full py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg flex items-center justify-center gap-2 transition"
//                       >
//                         <Play className="h-4 w-4" />
//                         <span>Play Now</span>
//                       </button>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* PAGINATION */}
//             {(pagination.totalPages || 1) > 1 && (
//               <div className="flex justify-center gap-2 mt-12">
//                 <button
//                   onClick={() => goToPage(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="p-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                 >
//                   <ChevronLeft className="h-5 w-5" />
//                 </button>

//                 {[...Array(Math.min(pagination.totalPages || 1, 7))].map((_, i) => {
//                   let pageNum;
//                   const totalPages = pagination.totalPages || 1;
                  
//                   if (totalPages <= 7) {
//                     pageNum = i + 1;
//                   } else if (currentPage <= 4) {
//                     pageNum = i + 1;
//                     if (i === 6) pageNum = totalPages;
//                   } else if (currentPage >= totalPages - 3) {
//                     pageNum = totalPages - 6 + i;
//                   } else {
//                     pageNum = currentPage - 3 + i;
//                     if (i === 0) pageNum = 1;
//                     if (i === 6) pageNum = totalPages;
//                   }
                  
//                   if (i === 5 && totalPages > 7 && currentPage > 4 && currentPage < totalPages - 3) {
//                     return <span key="ellipsis" className="px-4 py-2">...</span>;
//                   }
                  
//                   return (
//                     <button
//                       key={pageNum}
//                       onClick={() => goToPage(pageNum)}
//                       className={`px-4 py-2 rounded-lg ${
//                         currentPage === pageNum
//                           ? 'bg-primary-600 text-white'
//                           : 'bg-white border hover:bg-gray-50'
//                       }`}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 })}

//                 <button
//                   onClick={() => goToPage(currentPage + 1)}
//                   disabled={currentPage === (pagination.totalPages || 1)}
//                   className="p-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                 >
//                   <ChevronRight className="h-5 w-5" />
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AudioListPage;





















// //Flexiable -image container in grid view doesn't have a fixed aspect ratio-so image is free to adjust
// // client/src/pages/public/AudioListPage.jsx
// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useSearchParams, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useQuery } from '@tanstack/react-query';
// import {
//   Search, Headphones, Play, Clock, Eye,
//   Grid, List, Loader2, AlertCircle,
//   ChevronLeft, ChevronRight, Mic, MicOff,
//   Volume2, VolumeX, Zap, X, Pause, SkipForward, SkipBack,
//   ChevronLeftCircle, ChevronRightCircle
// } from 'lucide-react';
// import audioAPI from '../../api/audioAPI';
// import { AUDIO_CATEGORIES } from '../../utils/constants.js';
// import { useAudioPlayer } from '../../context/AudioPlayerContext';
// import toast from 'react-hot-toast';

// const AudioListPage = () => {
//   const { t } = useTranslation();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [viewMode, setViewMode] = useState('grid');
//   const [sortBy, setSortBy] = useState('popular');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isListening, setIsListening] = useState(false);
//   const [voiceSupported, setVoiceSupported] = useState(true);
//   const [voiceTranscript, setVoiceTranscript] = useState('');
//   const recognitionRef = useRef(null);
//   const categoryScrollRef = useRef(null);
//   const itemsPerPage = 9;

//   // Get audio player functions
//   const { 
//     currentAudio, 
//     isPlaying, 
//     playAudio, 
//     pauseAudio, 
//     resumeAudio,
//     nextAudio,
//     previousAudio,
//     volumeUp,
//     volumeDown,
//     toggleMute,
//     isMuted
//   } = useAudioPlayer();

//   // Debug audio player state
//   useEffect(() => {
//     console.log('🎵 Audio Player State:', {
//       currentAudio: currentAudio?.title,
//       isPlaying,
//       hasAudio: !!currentAudio
//     });
//   }, [currentAudio, isPlaying]);

//   // Scroll category pills
//   const scrollCategories = (direction) => {
//     if (categoryScrollRef.current) {
//       const scrollAmount = 200;
//       const currentScroll = categoryScrollRef.current.scrollLeft;
//       const newScroll = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;
//       categoryScrollRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });
//     }
//   };

//   // Initialize speech recognition - ENGLISH FIRST
//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
//     if (!SpeechRecognition) {
//       setVoiceSupported(false);
//       console.warn('Speech recognition not supported in this browser');
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.continuous = false;
//     recognition.interimResults = true;
//     recognition.lang = 'en-US';
//     recognition.maxAlternatives = 5;

//     recognition.onstart = () => {
//       setIsListening(true);
//       toast.success('Listening... Speak English commands', { duration: 2000 });
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//     };

//     recognition.onresult = (event) => {
//       let transcript = event.results[0][0].transcript;
//       const alternatives = [];
//       for (let i = 0; i < event.results[0].length; i++) {
//         alternatives.push(event.results[0][i].transcript);
//       }
      
//       console.log('🎤 Voice transcripts:', alternatives);
//       setVoiceTranscript(transcript);
      
//       if (event.results[0].isFinal) {
//         let bestMatch = transcript;
//         for (const alt of alternatives) {
//           const lowerAlt = alt.toLowerCase();
//           if (lowerAlt === 'pause' || lowerAlt === 'next' || lowerAlt === 'previous' || 
//               lowerAlt === 'resume' || lowerAlt === 'play' || lowerAlt.includes('play ')) {
//             bestMatch = alt;
//             break;
//           }
//         }
//         processVoiceCommand(bestMatch);
//       }
//     };

//     recognition.onerror = (event) => {
//       console.error('Speech recognition error:', event.error);
//       setIsListening(false);
      
//       if (event.error === 'not-allowed') {
//         toast.error('Microphone access denied. Please allow microphone access.');
//       } else if (event.error === 'no-speech') {
//         toast.error('No speech detected. Please try again.');
//       } else {
//         toast.error('Voice recognition failed. Please try again.');
//       }
//     };

//     recognitionRef.current = recognition;

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//       }
//     };
//   }, []);

//   // Process voice commands - FIXED ORDER (Playback controls FIRST)
//   const processVoiceCommand = async (command) => {
//     const lowerCommand = command.toLowerCase().trim();
    
//     console.log('🎤 Processing command:', { original: command, lower: lowerCommand });
    
//     // ============================================
//     // PLAYBACK CONTROL COMMANDS - HIGHEST PRIORITY
//     // ============================================
    
//     // PAUSE command
//     if (lowerCommand === 'pause' || lowerCommand === 'stop' || 
//         lowerCommand === 'paus' || lowerCommand === 'pawse' ||
//         lowerCommand.includes('pause') || lowerCommand.includes('stop')) {
//       console.log('✅ Executing PAUSE command');
//       pauseAudio();
//       toast.success('⏸️ Audio paused');
//       setVoiceTranscript('');
//       return true;
//     }
    
//     // RESUME command
//     if (lowerCommand === 'resume' || lowerCommand === 'play' || 
//         lowerCommand === 'resum' || lowerCommand === 'start' ||
//         lowerCommand.includes('resume') || lowerCommand.includes('start')) {
//       if (currentAudio) {
//         console.log('✅ Executing RESUME command');
//         resumeAudio();
//         toast.success('▶️ Audio resumed');
//       } else {
//         toast.error('No audio to resume');
//       }
//       setVoiceTranscript('');
//       return true;
//     }
    
//     // NEXT command
//     if (lowerCommand === 'next' || lowerCommand === 'skip' || 
//         lowerCommand === 'next track' || lowerCommand === 'next song' ||
//         lowerCommand.includes('next') || lowerCommand.includes('skip')) {
//       console.log('✅ Executing NEXT command');
//       nextAudio();
//       toast.success('⏭️ Next track');
//       setVoiceTranscript('');
//       return true;
//     }
    
//     // PREVIOUS command
//     if (lowerCommand === 'previous' || lowerCommand === 'back' || 
//         lowerCommand === 'prev' || lowerCommand === 'previous track' ||
//         lowerCommand.includes('previous') || lowerCommand.includes('back')) {
//       console.log('✅ Executing PREVIOUS command');
//       previousAudio();
//       toast.success('⏮️ Previous track');
//       setVoiceTranscript('');
//       return true;
//     }
    
//     // VOLUME commands
//     if (lowerCommand === 'volume up' || lowerCommand === 'louder' || 
//         lowerCommand === 'increase volume' || lowerCommand.includes('volume up')) {
//       console.log('✅ Executing VOLUME UP command');
//       volumeUp();
//       toast.success('🔊 Volume increased');
//       setVoiceTranscript('');
//       return true;
//     }
    
//     if (lowerCommand === 'volume down' || lowerCommand === 'softer' || 
//         lowerCommand === 'decrease volume' || lowerCommand.includes('volume down')) {
//       console.log('✅ Executing VOLUME DOWN command');
//       volumeDown();
//       toast.success('🔉 Volume decreased');
//       setVoiceTranscript('');
//       return true;
//     }
    
//     if (lowerCommand === 'mute' || lowerCommand === 'silence' || 
//         lowerCommand.includes('mute')) {
//       console.log('✅ Executing MUTE command');
//       toggleMute();
//       toast.success(isMuted ? '🔇 Unmuted' : '🔇 Muted');
//       setVoiceTranscript('');
//       return true;
//     }
    
//     // ============================================
//     // PLAY SPECIFIC AUDIO COMMANDS
//     // ============================================
    
//     // Play Nauha command
//     if (lowerCommand.includes('play nauha')) {
//       console.log('✅ Executing PLAY NAUHA command');
//       toast.loading('Searching for nauha audio...', { id: 'voice-play' });
//       try {
//         const response = await audioAPI.searchAudio('nauha', { limit: 10, type: 'nauha' });
//         const results = response?.data?.data || response?.data || response || [];
        
//         if (results.length > 0) {
//           const audioToPlay = results[0];
//           playAudio(audioToPlay, results, 0);
//           toast.success(`Playing nauha: ${audioToPlay.title}`, { id: 'voice-play' });
//         } else {
//           toast.error('No nauha audio found', { id: 'voice-play' });
//         }
//       } catch (error) {
//         console.error('Search error:', error);
//         toast.error('Failed to play nauha', { id: 'voice-play' });
//       }
//       setVoiceTranscript('');
//       return true;
//     }
    
//     // Play specific audio (e.g., "play Alvida")
//     if (lowerCommand.startsWith('play ') && lowerCommand.length > 5) {
//       let searchTerms = command.replace(/play/gi, '').trim();
      
//       if (searchTerms && searchTerms.length > 2) {
//         console.log(`🔍 Searching for specific audio: ${searchTerms}`);
//         toast.loading(`Searching for "${searchTerms}"...`, { id: 'voice-play' });
        
//         try {
//           const response = await audioAPI.searchAudio(searchTerms, { limit: 10 });
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
//         setVoiceTranscript('');
//         return true;
//       }
//     }
    
//     // Category filter commands
//     const categoryCommands = {
//       'nauha': 'Nauha',
//       'marsiya': 'Marsiya',
//       'soz': 'Soz',
//       'salam': 'Salam',
//       'naat': 'Naat',
//       'hamd': 'Hamd',
//       'manqabat': 'Manqabat',
//       'ghazal': 'Ghazal',
//       'nazm': 'Nazm'
//     };
    
//     for (const [cmd, label] of Object.entries(categoryCommands)) {
//       if (lowerCommand === cmd || lowerCommand.includes(cmd)) {
//         console.log(`✅ Setting category to: ${cmd}`);
//         setActiveCategory(cmd);
//         setSearchQuery('');
//         setCurrentPage(1);
//         toast.success(`Showing ${label} audio`);
//         setVoiceTranscript('');
//         return true;
//       }
//     }
    
//     // Show all command
//     if (lowerCommand === 'all' || lowerCommand === 'show all' || lowerCommand.includes('all audio')) {
//       setActiveCategory('all');
//       setSearchQuery('');
//       setCurrentPage(1);
//       toast.success('Showing all audio');
//       setVoiceTranscript('');
//       return true;
//     }
    
//     // Search command
//     if (lowerCommand.startsWith('search ') || lowerCommand.includes('search for')) {
//       let searchTerms = command.replace(/search|search for/gi, '').trim();
      
//       if (searchTerms && searchTerms.length > 1) {
//         setSearchQuery(searchTerms);
//         setActiveCategory('all');
//         setCurrentPage(1);
//         toast.success(`Searching for: ${searchTerms}`);
//         setVoiceTranscript('');
//         return true;
//       }
//     }
    
//     // Help command
//     if (lowerCommand === 'help' || lowerCommand.includes('help')) {
//       toast.success(
//         '🎤 Voice Commands:\n\n' +
//         '• "pause" - Pause playback\n' +
//         '• "resume" - Resume playback\n' +
//         '• "next" - Next track\n' +
//         '• "previous" - Previous track\n' +
//         '• "play nauha" - Play Nauha\n' +
//         '• "play Alvida" - Play specific audio\n' +
//         '• "volume up/down" - Adjust volume\n' +
//         '• "mute" - Mute audio\n' +
//         '• "nauha" - Show Nauha category\n' +
//         '• "all" - Show all audio',
//         { duration: 8000 }
//       );
//       setVoiceTranscript('');
//       return true;
//     }
    
//     // Default search
//     if (command.length > 3) {
//       setSearchQuery(command);
//       setActiveCategory('all');
//       setCurrentPage(1);
//       toast.success(`Searching for: ${command}`);
//       setVoiceTranscript('');
//       return true;
//     }
    
//     toast.error('Command not recognized. Try "pause", "play nauha", or "help"');
//     setVoiceTranscript('');
//     return false;
//   };

//   const startVoiceSearch = () => {
//     if (!voiceSupported) {
//       toast.error('Voice search is not supported in your browser');
//       return;
//     }
    
//     if (recognitionRef.current) {
//       try {
//         recognitionRef.current.stop();
//         setTimeout(() => {
//           recognitionRef.current.lang = 'en-US';
//           recognitionRef.current.start();
//           toast.success('Listening... Say "pause", "next", or "play nauha"', { duration: 2000 });
//         }, 100);
//       } catch (error) {
//         console.error('Error starting recognition:', error);
//         toast.error('Failed to start voice recognition');
//       }
//     }
//   };

//   const stopVoiceSearch = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//     }
//   };

//   const { data: response, isLoading, error, refetch } = useQuery({
//     queryKey: ['audio', currentPage, activeCategory, sortBy, searchQuery],
//     queryFn: () => audioAPI.getAudioItems({
//       page: currentPage,
//       limit: itemsPerPage,
//       type: activeCategory !== 'all' ? activeCategory.toLowerCase() : undefined,
//       search: searchQuery || undefined,
//       sort: sortBy
//     }),
//     enabled: true,
//     staleTime: 30000
//   });

//   const audioData = response?.data?.data || response?.data || response || [];
//   const audioItems = Array.isArray(audioData) ? audioData : [];
//   const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 };

//   useEffect(() => {
//     if (activeCategory && activeCategory !== 'all') {
//       setSearchParams({ category: activeCategory, ...(searchQuery && { search: searchQuery }) });
//     } else {
//       setSearchParams(searchQuery ? { search: searchQuery } : {});
//     }
//     setCurrentPage(1);
//   }, [activeCategory, searchQuery, setSearchParams]);

//   const goToPage = (page) => {
//     if (page >= 1 && page <= (pagination.totalPages || 1)) {
//       setCurrentPage(page);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const formatDuration = (seconds) => {
//     if (!seconds) return 'N/A';
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   const formatPlays = (plays) => {
//     if (!plays) return '0';
//     if (plays >= 1000000) return `${(plays / 1000000).toFixed(1)}M`;
//     if (plays >= 1000) return `${(plays / 1000).toFixed(1)}K`;
//     return plays.toString();
//   };

//   const clearFilters = () => {
//     setSearchQuery('');
//     setActiveCategory('all');
//     setSortBy('popular');
//     setCurrentPage(1);
//     toast.success('Filters cleared');
//   };

//   const getCategoryDisplayName = (type) => {
//     const category = AUDIO_CATEGORIES.find(cat => cat.id === type?.toLowerCase());
//     return category?.label || type || 'Audio';
//   };

//   // Now playing bar component
//   const NowPlayingBar = () => {
//     if (!currentAudio) return null;
    
//     return (
//       <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg z-50 border-t border-gray-700">
//         <div className="max-w-7xl mx-auto px-4 py-2">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3 flex-1">
//               <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
//                 <Headphones className="h-4 w-4" />
//               </div>
//               <div className="flex-1">
//                 <p className="font-medium text-xs truncate">{currentAudio.title}</p>
//                 <p className="text-xs text-gray-400">
//                   {currentAudio.author?.name || 'Unknown Artist'}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={previousAudio}
//                 className="p-1.5 hover:bg-white/10 rounded-full transition"
//               >
//                 <SkipBack className="h-4 w-4" />
//               </button>
//               <button
//                 onClick={isPlaying ? pauseAudio : resumeAudio}
//                 className="p-2 bg-primary-600 hover:bg-primary-700 rounded-full transition"
//               >
//                 {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
//               </button>
//               <button
//                 onClick={nextAudio}
//                 className="p-1.5 hover:bg-white/10 rounded-full transition"
//               >
//                 <SkipForward className="h-4 w-4" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   /* ================= LOADING ================= */
//   if (isLoading && audioItems.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
//         <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   /* ================= ERROR ================= */
//   if (error && audioItems.length === 0) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
//         <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
//         <h2 className="text-xl font-semibold mb-2">Failed to load audio</h2>
//         <p className="text-gray-500 mb-4">Please check your connection and try again</p>
//         <button onClick={() => refetch()} className="btn-primary">Retry</button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 via-white to-gray-100">
//       <NowPlayingBar />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         {/* HEADER */}
//         <div className="mb-8 text-center">
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
//             Audio Library
//           </h1>
//           <p className="text-gray-500 text-sm mt-1">Discover premium Urdu audio experiences</p>
          
//           {voiceSupported && (
//             <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-primary-50 text-primary-600 text-xs rounded-full">
//               <Mic className="h-3 w-3" />
//               <span>Voice search - Say "pause", "next", or "help"</span>
//             </div>
//           )}
//         </div>

//         {/* CONTROLS */}
//         <div className="sticky top-20 z-10 bg-white/70 backdrop-blur-xl border border-gray-200 rounded-xl p-3 mb-6 shadow-sm flex flex-col md:flex-row gap-3">

//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <input
//               type="text"
//               placeholder={isListening ? "Listening..." : "Search audio..."}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-9 pr-20 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 bg-white text-sm"
//             />
            
//             {voiceSupported && (
//               <button
//                 onClick={isListening ? stopVoiceSearch : startVoiceSearch}
//                 className={`absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all ${
//                   isListening 
//                     ? 'bg-red-500 text-white animate-pulse' 
//                     : 'bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-600'
//                 }`}
//               >
//                 {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
//               </button>
//             )}
            
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery('')}
//                 className="absolute right-10 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200"
//               >
//                 <X className="h-3 w-3 text-gray-400" />
//               </button>
//             )}
//           </div>

//           {voiceTranscript && !isListening && (
//             <div className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded-full flex items-center gap-1">
//               <Volume2 className="h-3 w-3" />
//               <span>"{voiceTranscript}"</span>
//               <button onClick={() => setVoiceTranscript('')} className="ml-1">
//                 <X className="h-3 w-3" />
//               </button>
//             </div>
//           )}

//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm"
//           >
//             <option value="popular">Most Popular</option>
//             <option value="recent">Newest First</option>
//             <option value="plays">Most Played</option>
//           </select>

//           <div className="flex rounded-lg border overflow-hidden bg-white">
//             <button
//               onClick={() => setViewMode('grid')}
//               className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
//             >
//               <Grid className="h-4 w-4" />
//             </button>
//             <button
//               onClick={() => setViewMode('list')}
//               className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
//             >
//               <List className="h-4 w-4" />
//             </button>
//           </div>

//           {(searchQuery || activeCategory !== 'all' || sortBy !== 'popular') && (
//             <button
//               onClick={clearFilters}
//               className="px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm"
//             >
//               Clear
//             </button>
//           )}
//         </div>

//         {/* Voice Command Examples */}
//         {voiceSupported && (
//           <div className="mb-5 p-3 bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl">
//             <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
//               <Zap className="h-3 w-3 text-primary-600" />
//               <span className="font-medium">Voice commands:</span>
//               <span className="text-gray-400">|</span>
//               <span>"pause"</span>
//               <span>"next"</span>
//               <span>"play nauha"</span>
//               <span>"play Alvida"</span>
//               <span>"volume up"</span>
//               <span>"help"</span>
//             </div>
//           </div>
//         )}

//         {/* CATEGORY PILLS WITH SCROLL BUTTONS */}
//         <div className="relative mb-6">
//           <button
//             onClick={() => scrollCategories('left')}
//             className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1 border border-gray-200 hover:bg-gray-50"
//           >
//             <ChevronLeftCircle className="h-5 w-5 text-gray-600" />
//           </button>
          
//           <div
//             ref={categoryScrollRef}
//             className="flex gap-1.5 overflow-x-auto scrollbar-hide px-7"
//             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//           >
//             <button
//               onClick={() => setActiveCategory('all')}
//               className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 ${
//                 activeCategory === 'all'
//                   ? 'bg-primary-600 text-white shadow-md'
//                   : 'bg-white border border-gray-200 hover:bg-gray-50'
//               }`}
//             >
//               All
//             </button>
//             {AUDIO_CATEGORIES.map(cat => (
//               <button
//                 key={cat.id}
//                 onClick={() => setActiveCategory(cat.id)}
//                 className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1 flex-shrink-0 ${
//                   activeCategory === cat.id
//                     ? 'bg-primary-600 text-white shadow-md'
//                     : 'bg-white border border-gray-200 hover:bg-gray-50'
//                 }`}
//               >
//                 <span className="text-sm">{cat.icon}</span>
//                 <span>{cat.label}</span>
//               </button>
//             ))}
//           </div>
          
//           <button
//             onClick={() => scrollCategories('right')}
//             className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1 border border-gray-200 hover:bg-gray-50"
//           >
//             <ChevronRightCircle className="h-5 w-5 text-gray-600" />
//           </button>
//         </div>

//         {/* RESULTS COUNT */}
//         <div className="mb-3 text-xs text-gray-500">
//           Found {pagination.total || audioItems.length} items
//           {searchQuery && <span> for "{searchQuery}"</span>}
//           {activeCategory !== 'all' && <span> in {activeCategory}</span>}
//         </div>

//         {/* EMPTY STATE */}
//         {audioItems.length === 0 ? (
//           <div className="text-center py-12 bg-white rounded-xl shadow-sm">
//             <Headphones className="mx-auto h-10 w-10 text-gray-300 mb-3" />
//             <p className="text-gray-500 text-sm">No audio found</p>
//             {(searchQuery || activeCategory !== 'all') && (
//               <button onClick={clearFilters} className="text-primary-600 mt-2 text-sm hover:underline">
//                 Clear filters
//               </button>
//             )}
//           </div>
//         ) : (
//           <>
//             {/* GRID/LIST VIEW */}
//             <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'}`}>
//               {audioItems.map((audio, index) => (
//                 <motion.div
//                   key={audio._id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: Math.min(index * 0.03, 0.3) }}
//                 >
//                   <div className={`group rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all ${viewMode === 'list' ? 'flex' : ''}`}>
//                     <Link to={`/audio/${audio.slug}`} className={`${viewMode === 'list' ? 'flex flex-1' : ''}`}>
//                       {/* IMAGE - Smaller */}
//                       <div className={`${viewMode === 'list' ? 'w-20 h-20' : 'w-full'} relative overflow-hidden bg-gray-100`}>
//                         <img
//                           src={audio.thumbnail || audio.coverImage || 'https://via.placeholder.com/200x200?text=Audio'}
//                           alt={audio.title}
//                           className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
//                           onError={(e) => {
//                             e.target.src = 'https://via.placeholder.com/200x200?text=Audio';
//                           }}
//                         />
//                         <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                           <div className="bg-white/90 p-1.5 rounded-full">
//                             <Play className="text-primary-600 h-3 w-3 ml-0.5" />
//                           </div>
//                         </div>
//                         {audio.duration && (
//                           <div className="absolute bottom-1 right-1 text-[10px] bg-black/70 text-white px-1 py-0.5 rounded">
//                             {formatDuration(audio.duration)}
//                           </div>
//                         )}
//                         {audio.isPremium && (
//                           <div className="absolute top-1 right-1 px-1 py-0.5 bg-yellow-500 text-white text-[9px] rounded">
//                             Premium
//                           </div>
//                         )}
//                       </div>

//                       {/* CONTENT - Compact */}
//                       <div className={`p-2 ${viewMode === 'list' ? 'flex-1' : ''}`}>
//                         <div className="flex items-center gap-1 mb-1">
//                           <span className="px-1.5 py-0.5 bg-primary-50 text-primary-600 text-[10px] rounded capitalize">
//                             {getCategoryDisplayName(audio.type)}
//                           </span>
//                           {audio.language && (
//                             <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded">
//                               {audio.language}
//                             </span>
//                           )}
//                         </div>

//                         <h3 className="font-medium text-sm group-hover:text-primary-600 line-clamp-1">
//                           {audio.title}
//                         </h3>

//                         {audio.author && (
//                           <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
//                             {typeof audio.author === 'object' ? audio.author.name : audio.author}
//                           </p>
//                         )}

//                         <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400">
//                           <span className="flex items-center gap-0.5">
//                             <Play className="h-2.5 w-2.5" /> {formatPlays(audio.stats?.plays)}
//                           </span>
//                           <span className="flex items-center gap-0.5">
//                             <Eye className="h-2.5 w-2.5" /> {formatPlays(audio.stats?.views)}
//                           </span>
//                         </div>
//                       </div>
//                     </Link>
                    
//                     {/* Quick Play Button - Small */}
//                     <div className={`${viewMode === 'list' ? 'px-2 py-2 flex items-center' : 'px-2 pb-2'}`}>
//                       <button
//                         onClick={() => playAudio(audio, audioItems, index)}
//                         className={`${
//                           viewMode === 'list' 
//                             ? 'p-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg' 
//                             : 'w-full py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-xs flex items-center justify-center gap-1'
//                         } transition`}
//                       >
//                         <Play className="h-3 w-3" />
//                         {viewMode !== 'list' && <span>Play</span>}
//                       </button>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* PAGINATION */}
//             {(pagination.totalPages || 1) > 1 && (
//               <div className="flex justify-center gap-1 mt-6">
//                 <button
//                   onClick={() => goToPage(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="p-1.5 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
//                 >
//                   <ChevronLeft className="h-4 w-4" />
//                 </button>

//                 {[...Array(Math.min(pagination.totalPages || 1, 5))].map((_, i) => {
//                   let pageNum;
//                   const totalPages = pagination.totalPages || 1;
                  
//                   if (totalPages <= 5) {
//                     pageNum = i + 1;
//                   } else if (currentPage <= 3) {
//                     pageNum = i + 1;
//                   } else if (currentPage >= totalPages - 2) {
//                     pageNum = totalPages - 4 + i;
//                   } else {
//                     pageNum = currentPage - 2 + i;
//                   }
                  
//                   return (
//                     <button
//                       key={pageNum}
//                       onClick={() => goToPage(pageNum)}
//                       className={`px-3 py-1.5 text-sm rounded-lg ${
//                         currentPage === pageNum
//                           ? 'bg-primary-600 text-white'
//                           : 'bg-white border hover:bg-gray-50'
//                       }`}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 })}

//                 <button
//                   onClick={() => goToPage(currentPage + 1)}
//                   disabled={currentPage === (pagination.totalPages || 1)}
//                   className="p-1.5 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
//                 >
//                   <ChevronRight className="h-4 w-4" />
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AudioListPage;




















// client/src/pages/public/AudioListPage.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import {
  Search, Headphones, Play, Clock, Eye,
  Grid, List, Loader2, AlertCircle,
  ChevronLeft, ChevronRight, Mic, MicOff,
  Volume2, VolumeX, Zap, X, Pause, SkipForward, SkipBack,
  ChevronLeftCircle, ChevronRightCircle
} from 'lucide-react';
import audioAPI from '../../api/audioAPI';
import { AUDIO_CATEGORIES } from '../../utils/constants.js';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import toast from 'react-hot-toast';

const AudioListPage = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const recognitionRef = useRef(null);
  const categoryScrollRef = useRef(null);
  const itemsPerPage = 9;

  // Get audio player functions
  const { 
    currentAudio, 
    isPlaying, 
    playAudio, 
    pauseAudio, 
    resumeAudio,
    nextAudio,
    previousAudio,
    volumeUp,
    volumeDown,
    toggleMute,
    isMuted
  } = useAudioPlayer();

  // Debug audio player state
  useEffect(() => {
    console.log('🎵 Audio Player State:', {
      currentAudio: currentAudio?.title,
      isPlaying,
      hasAudio: !!currentAudio
    });
  }, [currentAudio, isPlaying]);

  // Scroll category pills
  const scrollCategories = (direction) => {
    if (categoryScrollRef.current) {
      const scrollAmount = 200;
      const currentScroll = categoryScrollRef.current.scrollLeft;
      const newScroll = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;
      categoryScrollRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });
    }
  };

  // Initialize speech recognition - ENGLISH FIRST
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setVoiceSupported(false);
      console.warn('Speech recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 5;

    recognition.onstart = () => {
      setIsListening(true);
      toast.success('Listening... Speak English commands', { duration: 2000 });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      let transcript = event.results[0][0].transcript;
      const alternatives = [];
      for (let i = 0; i < event.results[0].length; i++) {
        alternatives.push(event.results[0][i].transcript);
      }
      
      console.log('🎤 Voice transcripts:', alternatives);
      setVoiceTranscript(transcript);
      
      if (event.results[0].isFinal) {
        let bestMatch = transcript;
        for (const alt of alternatives) {
          const lowerAlt = alt.toLowerCase();
          if (lowerAlt === 'pause' || lowerAlt === 'next' || lowerAlt === 'previous' || 
              lowerAlt === 'resume' || lowerAlt === 'play' || lowerAlt.includes('play ')) {
            bestMatch = alt;
            break;
          }
        }
        processVoiceCommand(bestMatch);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      
      if (event.error === 'not-allowed') {
        toast.error('Microphone access denied. Please allow microphone access.');
      } else if (event.error === 'no-speech') {
        toast.error('No speech detected. Please try again.');
      } else {
        toast.error('Voice recognition failed. Please try again.');
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Process voice commands - FIXED ORDER (Playback controls FIRST)
  const processVoiceCommand = async (command) => {
    const lowerCommand = command.toLowerCase().trim();
    
    console.log('🎤 Processing command:', { original: command, lower: lowerCommand });
    
    // ============================================
    // PLAYBACK CONTROL COMMANDS - HIGHEST PRIORITY
    // ============================================
    
    // PAUSE command
    if (lowerCommand === 'pause' || lowerCommand === 'stop' || 
        lowerCommand === 'paus' || lowerCommand === 'pawse' ||
        lowerCommand.includes('pause') || lowerCommand.includes('stop')) {
      console.log('✅ Executing PAUSE command');
      pauseAudio();
      toast.success('⏸️ Audio paused');
      setVoiceTranscript('');
      return true;
    }
    
    // RESUME command
    if (lowerCommand === 'resume' || lowerCommand === 'play' || 
        lowerCommand === 'resum' || lowerCommand === 'start' ||
        lowerCommand.includes('resume') || lowerCommand.includes('start')) {
      if (currentAudio) {
        console.log('✅ Executing RESUME command');
        resumeAudio();
        toast.success('▶️ Audio resumed');
      } else {
        toast.error('No audio to resume');
      }
      setVoiceTranscript('');
      return true;
    }
    
    // NEXT command
    if (lowerCommand === 'next' || lowerCommand === 'skip' || 
        lowerCommand === 'next track' || lowerCommand === 'next song' ||
        lowerCommand.includes('next') || lowerCommand.includes('skip')) {
      console.log('✅ Executing NEXT command');
      nextAudio();
      toast.success('⏭️ Next track');
      setVoiceTranscript('');
      return true;
    }
    
    // PREVIOUS command
    if (lowerCommand === 'previous' || lowerCommand === 'back' || 
        lowerCommand === 'prev' || lowerCommand === 'previous track' ||
        lowerCommand.includes('previous') || lowerCommand.includes('back')) {
      console.log('✅ Executing PREVIOUS command');
      previousAudio();
      toast.success('⏮️ Previous track');
      setVoiceTranscript('');
      return true;
    }
    
    // VOLUME commands
    if (lowerCommand === 'volume up' || lowerCommand === 'louder' || 
        lowerCommand === 'increase volume' || lowerCommand.includes('volume up')) {
      console.log('✅ Executing VOLUME UP command');
      volumeUp();
      toast.success('🔊 Volume increased');
      setVoiceTranscript('');
      return true;
    }
    
    if (lowerCommand === 'volume down' || lowerCommand === 'softer' || 
        lowerCommand === 'decrease volume' || lowerCommand.includes('volume down')) {
      console.log('✅ Executing VOLUME DOWN command');
      volumeDown();
      toast.success('🔉 Volume decreased');
      setVoiceTranscript('');
      return true;
    }
    
    if (lowerCommand === 'mute' || lowerCommand === 'silence' || 
        lowerCommand.includes('mute')) {
      console.log('✅ Executing MUTE command');
      toggleMute();
      toast.success(isMuted ? '🔇 Unmuted' : '🔇 Muted');
      setVoiceTranscript('');
      return true;
    }
    
    // ============================================
    // PLAY SPECIFIC AUDIO COMMANDS
    // ============================================
    
    // Play Nauha command
    if (lowerCommand.includes('play nauha')) {
      console.log('✅ Executing PLAY NAUHA command');
      toast.loading('Searching for nauha audio...', { id: 'voice-play' });
      try {
        const response = await audioAPI.searchAudio('nauha', { limit: 10, type: 'nauha' });
        const results = response?.data?.data || response?.data || response || [];
        
        if (results.length > 0) {
          const audioToPlay = results[0];
          playAudio(audioToPlay, results, 0);
          toast.success(`Playing nauha: ${audioToPlay.title}`, { id: 'voice-play' });
        } else {
          toast.error('No nauha audio found', { id: 'voice-play' });
        }
      } catch (error) {
        console.error('Search error:', error);
        toast.error('Failed to play nauha', { id: 'voice-play' });
      }
      setVoiceTranscript('');
      return true;
    }
    
    // Play specific audio (e.g., "play Alvida")
    if (lowerCommand.startsWith('play ') && lowerCommand.length > 5) {
      let searchTerms = command.replace(/play/gi, '').trim();
      
      if (searchTerms && searchTerms.length > 2) {
        console.log(`🔍 Searching for specific audio: ${searchTerms}`);
        toast.loading(`Searching for "${searchTerms}"...`, { id: 'voice-play' });
        
        try {
          const response = await audioAPI.searchAudio(searchTerms, { limit: 10 });
          const results = response?.data?.data || response?.data || response || [];
          
          if (results.length > 0) {
            const audioToPlay = results[0];
            playAudio(audioToPlay, results, 0);
            toast.success(`Playing: ${audioToPlay.title}`, { id: 'voice-play' });
          } else {
            toast.error(`No audio found for "${searchTerms}"`, { id: 'voice-play' });
          }
        } catch (error) {
          console.error('Search error:', error);
          toast.error('Failed to search audio', { id: 'voice-play' });
        }
        setVoiceTranscript('');
        return true;
      }
    }
    
    // Category filter commands
    const categoryCommands = {
      'nauha': 'Nauha',
      'marsiya': 'Marsiya',
      'soz': 'Soz',
      'salam': 'Salam',
      'naat': 'Naat',
      'hamd': 'Hamd',
      'manqabat': 'Manqabat',
      'ghazal': 'Ghazal',
      'nazm': 'Nazm'
    };
    
    for (const [cmd, label] of Object.entries(categoryCommands)) {
      if (lowerCommand === cmd || lowerCommand.includes(cmd)) {
        console.log(`✅ Setting category to: ${cmd}`);
        setActiveCategory(cmd);
        setSearchQuery('');
        setCurrentPage(1);
        toast.success(`Showing ${label} audio`);
        setVoiceTranscript('');
        return true;
      }
    }
    
    // Show all command
    if (lowerCommand === 'all' || lowerCommand === 'show all' || lowerCommand.includes('all audio')) {
      setActiveCategory('all');
      setSearchQuery('');
      setCurrentPage(1);
      toast.success('Showing all audio');
      setVoiceTranscript('');
      return true;
    }
    
    // Search command
    if (lowerCommand.startsWith('search ') || lowerCommand.includes('search for')) {
      let searchTerms = command.replace(/search|search for/gi, '').trim();
      
      if (searchTerms && searchTerms.length > 1) {
        setSearchQuery(searchTerms);
        setActiveCategory('all');
        setCurrentPage(1);
        toast.success(`Searching for: ${searchTerms}`);
        setVoiceTranscript('');
        return true;
      }
    }
    
    // Help command
    if (lowerCommand === 'help' || lowerCommand.includes('help')) {
      toast.success(
        '🎤 Voice Commands:\n\n' +
        '• "pause" - Pause playback\n' +
        '• "resume" - Resume playback\n' +
        '• "next" - Next track\n' +
        '• "previous" - Previous track\n' +
        '• "play nauha" - Play Nauha\n' +
        '• "play Alvida" - Play specific audio\n' +
        '• "volume up/down" - Adjust volume\n' +
        '• "mute" - Mute audio\n' +
        '• "nauha" - Show Nauha category\n' +
        '• "all" - Show all audio',
        { duration: 8000 }
      );
      setVoiceTranscript('');
      return true;
    }
    
    // Default search
    if (command.length > 3) {
      setSearchQuery(command);
      setActiveCategory('all');
      setCurrentPage(1);
      toast.success(`Searching for: ${command}`);
      setVoiceTranscript('');
      return true;
    }
    
    toast.error('Command not recognized. Try "pause", "play nauha", or "help"');
    setVoiceTranscript('');
    return false;
  };

  const startVoiceSearch = () => {
    if (!voiceSupported) {
      toast.error('Voice search is not supported in your browser');
      return;
    }
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        setTimeout(() => {
          recognitionRef.current.lang = 'en-US';
          recognitionRef.current.start();
          toast.success('Listening... Say "pause", "next", or "play nauha"', { duration: 2000 });
        }, 100);
      } catch (error) {
        console.error('Error starting recognition:', error);
        toast.error('Failed to start voice recognition');
      }
    }
  };

  const stopVoiceSearch = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const { data: response, isLoading, error, refetch } = useQuery({
    queryKey: ['audio', currentPage, activeCategory, sortBy, searchQuery],
    queryFn: () => audioAPI.getAudioItems({
      page: currentPage,
      limit: itemsPerPage,
      type: activeCategory !== 'all' ? activeCategory.toLowerCase() : undefined,
      search: searchQuery || undefined,
      sort: sortBy
    }),
    enabled: true,
    staleTime: 30000
  });

  const audioData = response?.data?.data || response?.data || response || [];
  const audioItems = Array.isArray(audioData) ? audioData : [];
  const pagination = response?.data?.pagination || response?.pagination || { total: 0, page: 1, totalPages: 1 };

  useEffect(() => {
    if (activeCategory && activeCategory !== 'all') {
      setSearchParams({ category: activeCategory, ...(searchQuery && { search: searchQuery }) });
    } else {
      setSearchParams(searchQuery ? { search: searchQuery } : {});
    }
    setCurrentPage(1);
  }, [activeCategory, searchQuery, setSearchParams]);

  const goToPage = (page) => {
    if (page >= 1 && page <= (pagination.totalPages || 1)) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const formatDuration = (seconds) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatPlays = (plays) => {
    if (!plays) return '0';
    if (plays >= 1000000) return `${(plays / 1000000).toFixed(1)}M`;
    if (plays >= 1000) return `${(plays / 1000).toFixed(1)}K`;
    return plays.toString();
  };

  const clearFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setSortBy('popular');
    setCurrentPage(1);
    toast.success('Filters cleared');
  };

  const getCategoryDisplayName = (type) => {
    const category = AUDIO_CATEGORIES.find(cat => cat.id === type?.toLowerCase());
    return category?.label || type || 'Audio';
  };

  // Now playing bar component
  const NowPlayingBar = () => {
    if (!currentAudio) return null;
    
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg z-50 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Headphones className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-xs truncate">{currentAudio.title}</p>
                <p className="text-xs text-gray-400">
                  {currentAudio.author?.name || 'Unknown Artist'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={previousAudio}
                className="p-1.5 hover:bg-white/10 rounded-full transition"
              >
                <SkipBack className="h-4 w-4" />
              </button>
              <button
                onClick={isPlaying ? pauseAudio : resumeAudio}
                className="p-2 bg-primary-600 hover:bg-primary-700 rounded-full transition"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
              </button>
              <button
                onClick={nextAudio}
                className="p-1.5 hover:bg-white/10 rounded-full transition"
              >
                <SkipForward className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* ================= LOADING ================= */
  if (isLoading && audioItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (error && audioItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Failed to load audio</h2>
        <p className="text-gray-500 mb-4">Please check your connection and try again</p>
        <button onClick={() => refetch()} className="btn-primary">Retry</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <NowPlayingBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
            Audio Library
          </h1>
          <p className="text-gray-500 text-sm mt-1">Discover premium Urdu audio experiences</p>
          
          {voiceSupported && (
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-primary-50 text-primary-600 text-xs rounded-full">
              <Mic className="h-3 w-3" />
              <span>Voice search - Say "pause", "next", or "help"</span>
            </div>
          )}
        </div>

        {/* CONTROLS */}
        <div className="sticky top-20 z-10 bg-white/70 backdrop-blur-xl border border-gray-200 rounded-xl p-3 mb-6 shadow-sm flex flex-col md:flex-row gap-3">

          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder={isListening ? "Listening..." : "Search audio..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-20 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 bg-white text-sm"
            />
            
            {voiceSupported && (
              <button
                onClick={isListening ? stopVoiceSearch : startVoiceSearch}
                className={`absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-600'
                }`}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>
            )}
            
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-10 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200"
              >
                <X className="h-3 w-3 text-gray-400" />
              </button>
            )}
          </div>

          {voiceTranscript && !isListening && (
            <div className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded-full flex items-center gap-1">
              <Volume2 className="h-3 w-3" />
              <span>"{voiceTranscript}"</span>
              <button onClick={() => setVoiceTranscript('')} className="ml-1">
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm"
          >
            <option value="popular">Most Popular</option>
            <option value="recent">Newest First</option>
            <option value="plays">Most Played</option>
          </select>

          <div className="flex rounded-lg border overflow-hidden bg-white">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          {(searchQuery || activeCategory !== 'all' || sortBy !== 'popular') && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm"
            >
              Clear
            </button>
          )}
        </div>

        {/* Voice Command Examples */}
        {voiceSupported && (
          <div className="mb-5 p-3 bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl">
            <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
              <Zap className="h-3 w-3 text-primary-600" />
              <span className="font-medium">Voice commands:</span>
              <span className="text-gray-400">|</span>
              <span>"pause"</span>
              <span>"next"</span>
              <span>"play nauha"</span>
              <span>"play Alvida"</span>
              <span>"volume up"</span>
              <span>"help"</span>
            </div>
          </div>
        )}

        {/* CATEGORY PILLS WITH SCROLL BUTTONS */}
        <div className="relative mb-6">
          <button
            onClick={() => scrollCategories('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1 border border-gray-200 hover:bg-gray-50"
          >
            <ChevronLeftCircle className="h-5 w-5 text-gray-600" />
          </button>
          
          <div
            ref={categoryScrollRef}
            className="flex gap-1.5 overflow-x-auto scrollbar-hide px-7"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                activeCategory === 'all'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
            >
              All
            </button>
            {AUDIO_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1 flex-shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span className="text-sm">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
          
          <button
            onClick={() => scrollCategories('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1 border border-gray-200 hover:bg-gray-50"
          >
            <ChevronRightCircle className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* RESULTS COUNT */}
        <div className="mb-3 text-xs text-gray-500">
          Found {pagination.total || audioItems.length} items
          {searchQuery && <span> for "{searchQuery}"</span>}
          {activeCategory !== 'all' && <span> in {activeCategory}</span>}
        </div>

        {/* EMPTY STATE */}
        {audioItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <Headphones className="mx-auto h-10 w-10 text-gray-300 mb-3" />
            <p className="text-gray-500 text-sm">No audio found</p>
            {(searchQuery || activeCategory !== 'all') && (
              <button onClick={clearFilters} className="text-primary-600 mt-2 text-sm hover:underline">
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* GRID/LIST VIEW */}
            <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'}`}>
              {audioItems.map((audio, index) => (
                <motion.div
                  key={audio._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.03, 0.3) }}
                >
                  <div className={`group rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all ${viewMode === 'list' ? 'flex' : ''}`}>
                    <Link to={`/audio/${audio.slug}`} className={`${viewMode === 'list' ? 'flex flex-1' : ''}`}>
                      {/* IMAGE - FIXED ASPECT RATIO for consistent sizing */}
                      <div className={`${viewMode === 'list' ? 'w-20 h-20 flex-shrink-0' : 'w-full aspect-square'} relative overflow-hidden bg-gradient-to-br from-primary-100 to-purple-100`}>
                        <img
                          src={audio.thumbnail || audio.coverImage || 'https://via.placeholder.com/300x300?text=🎵'}
                          alt={audio.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/300x300?text=🎵';
                          }}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="bg-white/90 p-2 rounded-full transform scale-90 group-hover:scale-110 transition">
                            <Play className="text-primary-600 h-4 w-4 ml-0.5" />
                          </div>
                        </div>
                        {audio.duration && (
                          <div className="absolute bottom-1 right-1 text-[10px] bg-black/70 text-white px-1.5 py-0.5 rounded-md">
                            {formatDuration(audio.duration)}
                          </div>
                        )}
                        {audio.isPremium && (
                          <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-[9px] rounded-md font-medium">
                            Premium
                          </div>
                        )}
                      </div>

                      {/* CONTENT - Compact */}
                      <div className={`p-2 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <div className="flex items-center gap-1 mb-1">
                          <span className="px-1.5 py-0.5 bg-primary-50 text-primary-700 text-[10px] rounded-full capitalize font-medium">
                            {getCategoryDisplayName(audio.type)}
                          </span>
                          {audio.language && (
                            <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded-full">
                              {audio.language}
                            </span>
                          )}
                        </div>

                        <h3 className="font-semibold text-sm group-hover:text-primary-600 line-clamp-1 transition-colors">
                          {audio.title}
                        </h3>

                        {audio.author && (
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                            {typeof audio.author === 'object' ? audio.author.name : audio.author}
                          </p>
                        )}

                        <div className="flex items-center gap-2 mt-1.5 text-[10px] text-gray-400">
                          <span className="flex items-center gap-0.5">
                            <Play className="h-2.5 w-2.5" /> {formatPlays(audio.stats?.plays)}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <Eye className="h-2.5 w-2.5" /> {formatPlays(audio.stats?.views)}
                          </span>
                        </div>
                      </div>
                    </Link>
                    
                    {/* Quick Play Button - Small */}
                    <div className={`${viewMode === 'list' ? 'px-2 py-2 flex items-center' : 'px-2 pb-2'}`}>
                      <button
                        onClick={() => playAudio(audio, audioItems, index)}
                        className={`${
                          viewMode === 'list' 
                            ? 'p-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg' 
                            : 'w-full py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-xs flex items-center justify-center gap-1 font-medium'
                        } transition-all duration-200 hover:shadow-md`}
                      >
                        <Play className="h-3 w-3" />
                        {viewMode !== 'list' && <span>Play</span>}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* PAGINATION */}
            {(pagination.totalPages || 1) > 1 && (
              <div className="flex justify-center gap-1 mt-6">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-1.5 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {[...Array(Math.min(pagination.totalPages || 1, 5))].map((_, i) => {
                  let pageNum;
                  const totalPages = pagination.totalPages || 1;
                  
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`px-3 py-1.5 text-sm rounded-lg ${
                        currentPage === pageNum
                          ? 'bg-primary-600 text-white'
                          : 'bg-white border hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === (pagination.totalPages || 1)}
                  className="p-1.5 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AudioListPage;