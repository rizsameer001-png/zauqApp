// import api from './apiConfig'

// const audioAPI = {
//   getAudio: (params) => api.get('/audio', { params }).then(res => res.data),
//   getAudioBySlug: (slug) => api.get(`/audio/${slug}`).then(res => res.data),
//   getFeaturedAudio: () => api.get('/audio/featured').then(res => res.data),
//   getAudioStream: (slug) => api.get(`/audio/${slug}/stream`).then(res => res.data),
//   getAudioTranscript: (slug) => api.get(`/audio/${slug}/transcript`).then(res => res.data),
//   getPlaylistAudio: (playlistId) => api.get(`/audio/playlist/${playlistId}`).then(res => res.data),
//   createAudio: (data) => api.post('/audio', data).then(res => res.data),
//   updateAudio: (id, data) => api.put(`/audio/${id}`, data).then(res => res.data),
//   deleteAudio: (id) => api.delete(`/audio/${id}`).then(res => res.data),
// }

// export default audioAPI






// // client/src/api/audioAPI.js
// import api from './apiConfig';

// const audioAPI = {
//   // Get all audio items
//   getAudioItems: (params) => api.get('/audio', { params }).then(res => res.data),
  
//   // Get single audio by slug
//   getAudio: (slug) => api.get(`/audio/${slug}`).then(res => res.data),
  
//   // Get featured audio
//   getFeaturedAudio: () => api.get('/audio/featured').then(res => res.data),
  
//   // Get audio stream URL
//   getAudioStream: (slug) => api.get(`/audio/${slug}/stream`).then(res => res.data),
  
//   // Get audio transcript
//   getAudioTranscript: (slug) => api.get(`/audio/${slug}/transcript`).then(res => res.data),
  
//   // Get playlist audio
//   getPlaylistAudio: (playlistId) => api.get(`/audio/playlist/${playlistId}`).then(res => res.data),
  
//   // Create new audio
//   createAudio: (data) => api.post('/audio', data).then(res => res.data),
  
//   // Update audio
//   updateAudio: (id, data) => api.put(`/audio/${id}`, data).then(res => res.data),
  
//   // Delete audio
//   deleteAudio: (id) => api.delete(`/audio/${id}`).then(res => res.data),
  
//   // Like audio
//   likeAudio: (id) => api.post(`/audio/${id}/like`).then(res => res.data),
  
//   // Bookmark audio
//   bookmarkAudio: (id) => api.post(`/audio/${id}/bookmark`).then(res => res.data),
// };

// export default audioAPI;








// // client/src/api/audioAPI.js
// import api from './apiConfig';

// const audioAPI = {
//   // ============================================
//   // BASIC CRUD OPERATIONS
//   // ============================================
  
//   // Get all audio items with pagination and filters
//   getAudioItems: (params) => api.get('/audio', { params }).then(res => res.data),
  
//   // Get single audio by slug
//   getAudio: (slug) => api.get(`/audio/${slug}`).then(res => res.data),
  
//   // Create new audio (admin only)
//   createAudio: (data) => api.post('/audio', data).then(res => res.data),
  
//   // Update audio (admin only)
//   updateAudio: (id, data) => api.put(`/audio/${id}`, data).then(res => res.data),
  
//   // Delete audio (admin only)
//   deleteAudio: (id) => api.delete(`/audio/${id}`).then(res => res.data),
  
//   // ============================================
//   // CATEGORY & FILTERING ENDPOINTS
//   // ============================================
  
//   // Get featured audio
//   getFeaturedAudio: () => api.get('/audio/featured').then(res => res.data),
  
//   // Get audio by type (nauha, marsiya, soz, salam, majlis, etc.)
//   getAudioByType: (type, params) => api.get(`/audio/type/${type}`, { params }).then(res => res.data),
  
//   // Get audio by occasion (muharram, ramadan, eid, milad, general)
//   getAudioByOccasion: (occasion, params) => api.get(`/audio/occasion/${occasion}`, { params }).then(res => res.data),
  
//   // Get audio statistics by type
//   getAudioStats: () => api.get('/audio/stats').then(res => res.data),
  
//   // Get playlist audio
//   getPlaylistAudio: (playlistId, params) => api.get(`/audio/playlist/${playlistId}`, { params }).then(res => res.data),
  
//   // ============================================
//   // PLAYER & STREAMING ENDPOINTS
//   // ============================================
  
//   // Get audio stream URL
//   getAudioStream: (slug) => api.get(`/audio/${slug}/stream`).then(res => res.data),
  
//   // Get audio transcript
//   getAudioTranscript: (slug) => api.get(`/audio/${slug}/transcript`).then(res => res.data),
  
//   // ============================================
//   // USER INTERACTION ENDPOINTS
//   // ============================================
  
//   // Like audio
//   likeAudio: (id) => api.post(`/audio/${id}/like`).then(res => res.data),
  
//   // Unlike audio
//   unlikeAudio: (id) => api.delete(`/audio/${id}/like`).then(res => res.data),
  
//   // Bookmark audio
//   bookmarkAudio: (id) => api.post(`/audio/${id}/bookmark`).then(res => res.data),
  
//   // Remove bookmark
//   removeBookmarkAudio: (id) => api.delete(`/audio/${id}/bookmark`).then(res => res.data),
  
//   // ============================================
//   // PLAYLIST MANAGEMENT (User specific)
//   // ============================================
  
//   // Add to custom playlist
//   addToPlaylist: (audioId, playlistId) => api.post(`/audio/${audioId}/playlist/${playlistId}`).then(res => res.data),
  
//   // Remove from playlist
//   removeFromPlaylist: (audioId, playlistId) => api.delete(`/audio/${audioId}/playlist/${playlistId}`).then(res => res.data),
  
//   // Get user's playlists
//   getUserPlaylists: () => api.get('/audio/playlists').then(res => res.data),
  
//   // Create new playlist
//   createPlaylist: (data) => api.post('/audio/playlists', data).then(res => res.data),
  
//   // ============================================
//   // RECENT & TRENDING ENDPOINTS
//   // ============================================
  
//   // Get recently played audio
//   getRecentlyPlayed: (params) => api.get('/audio/recent', { params }).then(res => res.data),
  
//   // Get trending audio
//   getTrendingAudio: (params) => api.get('/audio/trending', { params }).then(res => res.data),
  
//   // Get popular audio by type
//   getPopularByType: (type, params) => api.get(`/audio/popular/${type}`, { params }).then(res => res.data),
  
//   // ============================================
//   // SEARCH & DISCOVERY
//   // ============================================
  
//   // Search audio
//   searchAudio: (query, params) => api.get('/audio/search', { params: { q: query, ...params } }).then(res => res.data),
  
//   // Get audio by author
//   getAudioByAuthor: (authorId, params) => api.get(`/audio/author/${authorId}`, { params }).then(res => res.data),
  
//   // Get audio by tag
//   getAudioByTag: (tag, params) => api.get(`/audio/tag/${tag}`, { params }).then(res => res.data),
  
//   // ============================================
//   // RECOMMENDATIONS
//   // ============================================
  
//   // Get recommended audio for user
//   getRecommendedAudio: (params) => api.get('/audio/recommended', { params }).then(res => res.data),
  
//   // Get similar audio (based on current audio)
//   getSimilarAudio: (slug, params) => api.get(`/audio/${slug}/similar`, { params }).then(res => res.data),
  
//   // ============================================
//   // ADMIN & ANALYTICS
//   // ============================================
  
//   // Get audio analytics (admin only)
//   getAudioAnalytics: (params) => api.get('/admin/audio/analytics', { params }).then(res => res.data),
  
//   // Bulk upload audio (admin only)
//   bulkUploadAudio: (data) => api.post('/admin/audio/bulk', data).then(res => res.data),
  
//   // Update audio metadata (admin only)
//   updateAudioMetadata: (id, data) => api.patch(`/admin/audio/${id}/metadata`, data).then(res => res.data),
// };

// // Helper function to get audio type label
// export const getAudioTypeLabel = (type) => {
//   const typeMap = {
//     'nauha': 'Nauha',
//     'marsiya': 'Marsiya',
//     'soz': 'Soz',
//     'salam': 'Salam',
//     'majlis': 'Majlis',
//     'mushaira': 'Mushaira',
//     'podcast': 'Podcast',
//     'poem_recitation': 'Poem Recitation',
//     'ghazal': 'Ghazal',
//     'nazm': 'Nazm',
//     'naat': 'Naat',
//     'hamd': 'Hamd',
//     'manqabat': 'Manqabat',
//     'munajat': 'Munajat',
//     'audiobook': 'Audiobook',
//     'lecture': 'Lecture',
//     'interview': 'Interview',
//     'other': 'Other'
//   };
//   return typeMap[type] || type;
// };

// // Helper function to get occasion label
// export const getOccasionLabel = (occasion) => {
//   const occasionMap = {
//     'muharram': 'Muharram',
//     'ramadan': 'Ramadan',
//     'eid': 'Eid',
//     'milad': 'Milad un-Nabi',
//     'general': 'General'
//   };
//   return occasionMap[occasion] || occasion;
// };

// // Helper function to get audio icon
// export const getAudioIcon = (type) => {
//   const iconMap = {
//     'nauha': '😢',
//     'marsiya': '💔',
//     'soz': '🔥',
//     'salam': '🕊️',
//     'majlis': '🕌',
//     'mushaira': '🎤',
//     'podcast': '🎙️',
//     'poem_recitation': '📖',
//     'ghazal': '🎵',
//     'nazm': '📝',
//     'naat': '⭐',
//     'hamd': '🕌',
//     'manqabat': '✨',
//     'munajat': '🙏',
//     'audiobook': '📚',
//     'lecture': '🎓',
//     'interview': '🎙️',
//     'other': '📀'
//   };
//   return iconMap[type] || '🎵';
// };

// export default audioAPI;



















// client/src/api/audioAPI.js
import api from './apiConfig';

const audioAPI = {
  // ============================================
  // BASIC CRUD OPERATIONS
  // ============================================
  
  // Get all audio items with pagination and filters
  getAudioItems: (params) => api.get('/audio', { params }).then(res => res.data),
  
  // Get single audio by slug
  getAudio: (slug) => api.get(`/audio/${slug}`).then(res => res.data),
  
  // Create new audio (admin only)
  createAudio: (data) => api.post('/audio', data).then(res => res.data),
  
  // Update audio (admin only)
  updateAudio: (id, data) => api.put(`/audio/${id}`, data).then(res => res.data),
  
  // Delete audio (admin only)
  deleteAudio: (id) => api.delete(`/audio/${id}`).then(res => res.data),
  
  // ============================================
  // CATEGORY & FILTERING ENDPOINTS
  // ============================================
  
  // Get featured audio
  getFeaturedAudio: () => api.get('/audio/featured').then(res => res.data),
  
  // Get audio by type (nauha, marsiya, soz, salam, majlis, etc.)
  getAudioByType: (type, params) => api.get(`/audio/type/${type}`, { params }).then(res => res.data),
  
  // Get audio by occasion (muharram, ramadan, eid, milad, general)
  getAudioByOccasion: (occasion, params) => api.get(`/audio/occasion/${occasion}`, { params }).then(res => res.data),
  
  // Get audio statistics by type
  getAudioStats: () => api.get('/audio/stats').then(res => res.data),
  
  // Get playlist audio (public playlists)
  getPlaylistAudio: (playlistId, params) => api.get(`/audio/playlist/${playlistId}`, { params }).then(res => res.data),
  
  // ============================================
  // PLAYER & STREAMING ENDPOINTS
  // ============================================
  
  // Get audio stream URL
  getAudioStream: (slug) => api.get(`/audio/${slug}/stream`).then(res => res.data),
  
  // Get audio transcript
  getAudioTranscript: (slug) => api.get(`/audio/${slug}/transcript`).then(res => res.data),
  
  // ============================================
  // USER INTERACTION ENDPOINTS
  // ============================================
  
  // Like audio
  likeAudio: (id) => api.post(`/audio/${id}/like`).then(res => res.data),
  
  // Unlike audio
  unlikeAudio: (id) => api.delete(`/audio/${id}/like`).then(res => res.data),
  
  // Bookmark audio
  bookmarkAudio: (id) => api.post(`/audio/${id}/bookmark`).then(res => res.data),
  
  // Remove bookmark
  removeBookmarkAudio: (id) => api.delete(`/audio/${id}/bookmark`).then(res => res.data),
  
  // ============================================
  // PLAYLIST MANAGEMENT (Full CRUD)
  // ============================================
  
  // Get all playlists (with filters)
  getAllPlaylists: (params) => api.get('/playlists', { params }).then(res => res.data),
  
  // Get single playlist by slug or ID
  getPlaylist: (id) => api.get(`/playlists/${id}`).then(res => res.data),
  
  // Get user's playlists
  getUserPlaylists: (params) => api.get('/playlists/user/me', { params }).then(res => res.data),
  
  // Create new playlist
  createPlaylist: (data) => api.post('/playlists', data).then(res => res.data),
  
  // Update playlist
  updatePlaylist: (id, data) => api.put(`/playlists/${id}`, data).then(res => res.data),
  
  // Delete playlist
  deletePlaylist: (id) => api.delete(`/playlists/${id}`).then(res => res.data),
  
  // Add audio to playlist
  addToPlaylist: (playlistId, audioId) => api.post(`/playlists/${playlistId}/audios`, { audioId }).then(res => res.data),
  
  // Remove audio from playlist
  removeFromPlaylist: (playlistId, audioId) => api.delete(`/playlists/${playlistId}/audios/${audioId}`).then(res => res.data),
  
  // Reorder playlist items
  reorderPlaylist: (playlistId, audioIds) => api.put(`/playlists/${playlistId}/reorder`, { audioIds }).then(res => res.data),
  
  // Get playlist stats
  getPlaylistStats: (playlistId) => api.get(`/playlists/${playlistId}/stats`).then(res => res.data),
  
  // Follow playlist
  followPlaylist: (playlistId) => api.post(`/playlists/${playlistId}/follow`).then(res => res.data),
  
  // Unfollow playlist
  unfollowPlaylist: (playlistId) => api.delete(`/playlists/${playlistId}/follow`).then(res => res.data),
  
  // Get followed playlists
  getFollowedPlaylists: (params) => api.get('/playlists/followed', { params }).then(res => res.data),
  
  // ============================================
  // RECENT & TRENDING ENDPOINTS
  // ============================================
  
  // Get recently played audio
  getRecentlyPlayed: (params) => api.get('/audio/recent/played', { params }).then(res => res.data),
  
  // Get trending audio
  getTrendingAudio: (params) => api.get('/audio/trending', { params }).then(res => res.data),
  
  // Get popular audio by type
  getPopularByType: (type, params) => api.get(`/audio/popular/${type}`, { params }).then(res => res.data),
  
  // ============================================
  // SEARCH & DISCOVERY
  // ============================================
  
  // Search audio
  searchAudio: (query, params) => api.get('/audio/search', { params: { q: query, ...params } }).then(res => res.data),
  
  // Search playlists
  searchPlaylists: (query, params) => api.get('/playlists/search', { params: { q: query, ...params } }).then(res => res.data),
  
  // Get audio by author
  getAudioByAuthor: (authorId, params) => api.get(`/audio/author/${authorId}`, { params }).then(res => res.data),
  
  // Get audio by tag
  getAudioByTag: (tag, params) => api.get(`/audio/tag/${tag}`, { params }).then(res => res.data),
  
  // ============================================
  // RECOMMENDATIONS
  // ============================================
  
  // Get recommended audio for user
  getRecommendedAudio: (params) => api.get('/audio/recommended', { params }).then(res => res.data),
  
  // Get similar audio (based on current audio)
  getSimilarAudio: (slug, params) => api.get(`/audio/${slug}/similar`, { params }).then(res => res.data),
  
  // Get recommended playlists
  getRecommendedPlaylists: (params) => api.get('/playlists/recommended', { params }).then(res => res.data),
  
  // ============================================
  // ADMIN & ANALYTICS
  // ============================================
  
  // Get audio analytics (admin only)
  getAudioAnalytics: (params) => api.get('/admin/audio/analytics', { params }).then(res => res.data),
  
  // Bulk upload audio (admin only)
  bulkUploadAudio: (data) => api.post('/admin/audio/bulk', data).then(res => res.data),
  
  // Update audio metadata (admin only)
  updateAudioMetadata: (id, data) => api.patch(`/admin/audio/${id}/metadata`, data).then(res => res.data),
  
  // Get all categories (admin only)
  getAllCategories: (params) => api.get('/admin/categories', { params }).then(res => res.data),
  
  // Get dashboard stats (admin only)
  getDashboardStats: () => api.get('/admin/dashboard/stats').then(res => res.data),
};

// Helper function to get audio type label
export const getAudioTypeLabel = (type) => {
  const typeMap = {
    'nauha': 'Nauha',
    'marsiya': 'Marsiya',
    'soz': 'Soz',
    'salam': 'Salam',
    'majlis': 'Majlis',
    'mushaira': 'Mushaira',
    'podcast': 'Podcast',
    'poem_recitation': 'Poem Recitation',
    'ghazal': 'Ghazal',
    'nazm': 'Nazm',
    'naat': 'Naat',
    'hamd': 'Hamd',
    'manqabat': 'Manqabat',
    'munajat': 'Munajat',
    'audiobook': 'Audiobook',
    'lecture': 'Lecture',
    'interview': 'Interview',
    'other': 'Other'
  };
  return typeMap[type] || type;
};

// Helper function to get occasion label
export const getOccasionLabel = (occasion) => {
  const occasionMap = {
    'muharram': 'Muharram',
    'ramadan': 'Ramadan',
    'eid': 'Eid',
    'milad': 'Milad un-Nabi',
    'general': 'General'
  };
  return occasionMap[occasion] || occasion;
};

// Helper function to get audio icon
export const getAudioIcon = (type) => {
  const iconMap = {
    'nauha': '😢',
    'marsiya': '💔',
    'soz': '🔥',
    'salam': '🕊️',
    'majlis': '🕌',
    'mushaira': '🎤',
    'podcast': '🎙️',
    'poem_recitation': '📖',
    'ghazal': '🎵',
    'nazm': '📝',
    'naat': '⭐',
    'hamd': '🕌',
    'manqabat': '✨',
    'munajat': '🙏',
    'audiobook': '📚',
    'lecture': '🎓',
    'interview': '🎙️',
    'other': '📀'
  };
  return iconMap[type] || '🎵';
};

// Helper function to format duration
export const formatDuration = (seconds) => {
  if (!seconds) return '0:00';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

// Helper function to get time ago
export const getTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';
  
  return Math.floor(seconds) + ' seconds ago';
};

// Helper function to truncate text
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export default audioAPI;