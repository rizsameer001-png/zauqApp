// client/src/hooks/useVoiceSearch.js
import { useState, useEffect, useRef, useCallback } from 'react';
import toast from 'react-hot-toast';

export const useVoiceSearch = (onVoiceCommand) => {
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setVoiceSupported(false);
      console.warn('Speech recognition not supported');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'ur-PK'; // Urdu, also supports 'hi-IN' for Hindi, 'en-US' for English

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const currentTranscript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      
      setTranscript(currentTranscript);
      
      if (event.results[0].isFinal && onVoiceCommand) {
        onVoiceCommand(currentTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      
      if (event.error === 'not-allowed') {
        toast.error('Please allow microphone access');
      } else if (event.error !== 'no-speech') {
        toast.error('Voice recognition failed. Please try again.');
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onVoiceCommand]);

  const startListening = useCallback(() => {
    if (!voiceSupported) {
      toast.error('Voice search is not supported in your browser');
      return;
    }
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        toast.success('Listening... Speak now');
      } catch (error) {
        console.error('Error starting recognition:', error);
      }
    }
  }, [voiceSupported]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  return {
    isListening,
    voiceSupported,
    transcript,
    startListening,
    stopListening
  };
};