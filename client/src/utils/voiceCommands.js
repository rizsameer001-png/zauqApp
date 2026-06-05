// client/src/utils/voiceCommands.js
import audioAPI from '../api/audioAPI';

export const parseVoiceCommand = async (command, context = {}) => {
  const lowerCommand = command.toLowerCase().trim();
  
  // Play command patterns
  const playPatterns = [
    /^play\s+(.+)$/i,
    /^play\s+audio\s+(.+)$/i,
    /^चलाएं\s+(.+)$/i,
    /^چلائیں\s+(.+)$/i,
    /^सुनाएं\s+(.+)$/i
  ];
  
  // Pause commands
  if (lowerCommand.match(/^(pause|stop|रोकें|روکیں)$/i)) {
    return { type: 'PAUSE' };
  }
  
  // Resume commands
  if (lowerCommand.match(/^(resume|continue|play|फिर से चलाएं|دوبارہ چلائیں)$/i)) {
    return { type: 'RESUME' };
  }
  
  // Next commands
  if (lowerCommand.match(/^(next|skip|अगला|اگلا)$/i)) {
    return { type: 'NEXT' };
  }
  
  // Previous commands
  if (lowerCommand.match(/^(previous|back|पिछला|پچھلا)$/i)) {
    return { type: 'PREVIOUS' };
  }
  
  // Volume up commands
  if (lowerCommand.match(/^(volume up|louder|आवाज बढ़ाएं|آواز بڑھائیں)$/i)) {
    return { type: 'VOLUME_UP' };
  }
  
  // Volume down commands
  if (lowerCommand.match(/^(volume down|softer|आवाज कम करें|آواز کم کریں)$/i)) {
    return { type: 'VOLUME_DOWN' };
  }
  
  // Mute commands
  if (lowerCommand.match(/^(mute|silence|म्यूट|خاموش)$/i)) {
    return { type: 'MUTE' };
  }
  
  // Unmute commands
  if (lowerCommand.match(/^(unmute|sound on|आवाज चालू करें|آواز آن کریں)$/i)) {
    return { type: 'UNMUTE' };
  }
  
  // Search for play command with specific audio
  for (const pattern of playPatterns) {
    const match = command.match(pattern);
    if (match) {
      const searchTerm = match[1].trim();
      
      // Try to search from context first (author's audio or current playlist)
      if (context.playlist && context.playlist.length > 0) {
        const matchedAudio = context.playlist.find(audio => 
          audio.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (matchedAudio) {
          const index = context.playlist.findIndex(a => a._id === matchedAudio._id);
          return { type: 'PLAY_FROM_PLAYLIST', index, audio: matchedAudio };
        }
      }
      
      // Search from API
      try {
        const response = await audioAPI.searchAudio(searchTerm, { limit: 5 });
        const results = response?.data?.data || response?.data || response || [];
        
        if (results.length > 0) {
          return { type: 'PLAY_SEARCH_RESULT', audio: results[0], playlist: results };
        } else {
          return { type: 'ERROR', message: `No audio found for "${searchTerm}"` };
        }
      } catch (error) {
        console.error('Search error:', error);
        return { type: 'ERROR', message: 'Failed to search audio' };
      }
    }
  }
  
  // Category filters
  const categories = ['nauha', 'marsiya', 'soz', 'salam', 'naat', 'hamd', 'manqabat', 'ghazal'];
  for (const category of categories) {
    if (lowerCommand.includes(category)) {
      return { type: 'FILTER_CATEGORY', category };
    }
  }
  
  return { type: 'UNKNOWN', command };
};