// client/src/components/ai/VoiceInput.jsx
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Loader2, Volume2 } from 'lucide-react';

const VoiceInput = ({ onResult, language = 'ur-PK', buttonClassName = '' }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);
  const [isSupported, setIsSupported] = useState(true);
  
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      setError('Voice search not supported in this browser');
      return;
    }
    
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = language;
    
    recognitionInstance.onstart = () => {
      setIsListening(true);
      setError(null);
    };
    
    recognitionInstance.onend = () => {
      setIsListening(false);
    };
    
    recognitionInstance.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        setTranscript(finalTranscript);
        if (onResult) onResult(finalTranscript);
      }
    };
    
    recognitionInstance.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setError(`Error: ${event.error}`);
      setIsListening(false);
    };
    
    setRecognition(recognitionInstance);
    
    return () => {
      if (recognitionInstance) {
        recognitionInstance.abort();
      }
    };
  }, [language]);
  
  const startListening = () => {
    if (recognition) {
      setTranscript('');
      setError(null);
      recognition.start();
    }
  };
  
  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };
  
  if (!isSupported) {
    return (
      <div className="text-red-500 text-xs flex items-center gap-1">
        <MicOff className="h-3 w-3" />
        <span>Voice not supported</span>
      </div>
    );
  }
  
  return (
    <div className="relative">
      <button
        type="button"
        onClick={isListening ? stopListening : startListening}
        className={`p-2 rounded-full transition-all ${
          isListening 
            ? 'bg-red-500 text-white animate-pulse shadow-lg' 
            : 'bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-600'
        } ${buttonClassName}`}
        title={isListening ? 'Stop listening' : 'Voice input'}
      >
        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      </button>
      
      {isListening && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
          <Volume2 className="h-3 w-3 inline mr-1" />
          Listening...
        </div>
      )}
      
      {error && !isListening && (
        <div className="absolute top-full mt-1 text-red-500 text-xs whitespace-nowrap">
          {error}
        </div>
      )}
      
      {transcript && !isListening && (
        <div className="absolute top-full mt-1 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full whitespace-nowrap">
          "{transcript}"
        </div>
      )}
    </div>
  );
};

export default VoiceInput;