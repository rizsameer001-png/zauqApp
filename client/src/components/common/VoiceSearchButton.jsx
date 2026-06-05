// client/src/components/common/VoiceSearchButton.jsx
import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { motion } from 'framer-motion';

const VoiceSearchButton = ({ isListening, onStart, onStop, className = '' }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={isListening ? onStop : onStart}
      className={`relative p-2 rounded-full transition-all ${
        isListening 
          ? 'bg-red-500 text-white animate-pulse' 
          : 'bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-600'
      } ${className}`}
      title={isListening ? "Stop listening" : "Voice search"}
    >
      {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
      
      {/* Ripple effect when listening */}
      {isListening && (
        <motion.span
          className="absolute inset-0 rounded-full bg-red-400"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      )}
    </motion.button>
  );
};

export default VoiceSearchButton;