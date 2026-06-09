// client/src/components/blog/VoiceSearch.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const VoiceSearch = ({ onResult, onListeningChange, className = '' }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  // Get speech recognition language based on current UI language
  const getSpeechLanguage = () => {
    switch (currentLang) {
      case 'ur':
        return 'ur-PK';
      case 'hi':
        return 'hi-IN';
      default:
        return 'en-US';
    }
  };

  useEffect(() => {
    // Check browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = getSpeechLanguage();

    recognitionRef.current.onstart = () => {
      setIsListening(true);
      onListeningChange?.(true);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
      onListeningChange?.(false);
    };

    recognitionRef.current.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        setTranscript(finalTranscript);
        onResult?.(finalTranscript);
      } else if (interimTranscript) {
        setTranscript(interimTranscript);
      }
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      onListeningChange?.(false);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [currentLang]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert(t('blog.voiceNotSupported'));
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setTranscript('');
      recognitionRef.current.lang = getSpeechLanguage();
      recognitionRef.current.start();
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={toggleListening}
      className={`relative p-2 rounded-lg transition-all duration-200 ${className} ${
        isListening 
          ? 'bg-red-500 text-white ring-2 ring-red-300 animate-pulse' 
          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
      title={isListening ? t('blog.listening') : t('blog.voiceSearch')}
    >
      {isListening ? (
        <>
          <Mic className="h-5 w-5 animate-pulse" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </>
      ) : (
        <Mic className="h-5 w-5" />
      )}
    </button>
  );
};

export default VoiceSearch;