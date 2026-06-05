// client/src/api/playlistAPI.js
import api from './apiConfig';

const playlistAPI = {
  // Get all playlists (with pagination and filters)
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
  
  // Search playlists
  searchPlaylists: (query, params) => api.get('/playlists/search', { params: { q: query, ...params } }).then(res => res.data),
  
  // Get recommended playlists
  getRecommendedPlaylists: (params) => api.get('/playlists/recommended', { params }).then(res => res.data),
};

export default playlistAPI;