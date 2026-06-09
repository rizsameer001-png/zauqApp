// client/src/components/common/TextToSpeech.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Volume2, Pause, Play, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const TextToSpeech = ({ text, title, className = '', autoDetectLanguage = true }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [supported, setSupported] = useState(true);
  const [availableVoices, setAvailableVoices] = useState([]);
  const utteranceRef = useRef(null);
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  // Language mapping for speech synthesis
  const getSpeechLanguage = () => {
    if (!autoDetectLanguage) return currentLang;
    
    switch (currentLang) {
      case 'ur':
        return 'ur-PK';
      case 'hi':
        return 'hi-IN';
      default:
        return 'en-US';
    }
  };

  // Get appropriate voice for the language
  const getVoiceForLanguage = (speechSynthesis, language) => {
    const voices = speechSynthesis.getVoices();
    setAvailableVoices(voices);
    
    // Try to find exact match first
    let voice = voices.find(v => v.lang === language);
    
    // If not found, try partial match
    if (!voice) {
      const langPrefix = language.split('-')[0];
      voice = voices.find(v => v.lang.startsWith(langPrefix));
    }
    
    // Fallback to any voice
    if (!voice && voices.length > 0) {
      voice = voices[0];
    }
    
    return voice;
  };

  // Load voices when component mounts
  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setSupported(false);
      return;
    }

    // Load voices
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if (utteranceRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = () => {
    if (!supported) {
      toast.error(t('common.ttsNotSupported'));
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    // Clean the text (remove HTML tags)
    const cleanText = text?.replace(/<[^>]*>/g, '') || '';
    if (!cleanText.trim()) {
      toast.error(t('common.noContentToRead'));
      return;
    }

    setIsLoading(true);

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Create utterance
    utteranceRef.current = new SpeechSynthesisUtterance(cleanText);
    
    // Set language based on current UI language
    const speechLang = getSpeechLanguage();
    utteranceRef.current.lang = speechLang;
    
    // Get and set appropriate voice
    const voice = getVoiceForLanguage(window.speechSynthesis, speechLang);
    if (voice) {
      utteranceRef.current.voice = voice;
    }
    
    // Configure speech properties
    utteranceRef.current.rate = 0.9; // Slightly slower for better clarity
    utteranceRef.current.pitch = 1.0;
    utteranceRef.current.volume = 1.0;

    // Event handlers
    utteranceRef.current.onstart = () => {
      setIsPlaying(true);
      setIsLoading(false);
      toast.success(t('common.readingStarted'));
    };
    
    utteranceRef.current.onend = () => {
      setIsPlaying(false);
      setIsLoading(false);
      toast.success(t('common.readingCompleted'));
    };
    
    utteranceRef.current.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsPlaying(false);
      setIsLoading(false);
      toast.error(t('common.ttsError'));
    };

    // Speak
    window.speechSynthesis.speak(utteranceRef.current);
  };

  // Get button text based on language
  const getButtonText = () => {
    if (isLoading) return t('common.preparing');
    if (isPlaying) return t('common.stopReading');
    return t('common.listenToBlog');
  };

  if (!supported) return null;

  return (
    <button
      onClick={speak}
      disabled={isLoading}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${className} ${
        isPlaying 
          ? 'bg-primary-600 text-white shadow-md' 
          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
      } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
      title={isPlaying ? t('common.stopReading') : t('common.listenToBlog')}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isPlaying ? (
        <Pause className="h-4 w-4" />
      ) : (
        <Volume2 className="h-4 w-4" />
      )}
      <span className="text-sm hidden sm:inline">{getButtonText()}</span>
      <span className="text-xs sm:hidden">
        {isPlaying ? '⏹️' : '🔊'}
      </span>
    </button>
  );
};

export default TextToSpeech;