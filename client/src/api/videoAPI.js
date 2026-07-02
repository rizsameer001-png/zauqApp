// import api from './apiConfig'

// const videoAPI = {
//   getVideos: (params) => api.get('/videos', { params }).then(res => res.data),
//   getVideo: (slug) => api.get(`/videos/${slug}`).then(res => res.data),
//   getFeaturedVideos: () => api.get('/videos/featured').then(res => res.data),
//   getVideoStream: (slug) => api.get(`/videos/${slug}/stream`).then(res => res.data),
//   getVideoSubtitles: (slug) => api.get(`/videos/${slug}/subtitles`).then(res => res.data),
//   createVideo: (data) => api.post('/videos', data).then(res => res.data),
//   updateVideo: (id, data) => api.put(`/videos/${id}`, data).then(res => res.data),
//   deleteVideo: (id) => api.delete(`/videos/${id}`).then(res => res.data),
// }

// export default videoAPI













// // client/src/api/videoAPI.js
// import api from './apiConfig';

// const videoAPI = {
//   // Get all videos with pagination
//   getVideos: (params) => api.get('/videos', { params }).then(res => res.data),
  
//   // Get single video by slug
//   getVideo: (slug) => api.get(`/videos/${slug}`).then(res => res.data),
  
//   // Get featured videos
//   getFeaturedVideos: () => api.get('/videos/featured').then(res => res.data),
  
//   // Get video stream URL
//   getVideoStream: (slug) => api.get(`/videos/${slug}/stream`).then(res => res.data),
  
//   // Get video subtitles
//   getVideoSubtitles: (slug) => api.get(`/videos/${slug}/subtitles`).then(res => res.data),
  
//   // Create new video
//   createVideo: (data) => api.post('/videos', data).then(res => res.data),
  
//   // Update video
//   updateVideo: (id, data) => api.put(`/videos/${id}`, data).then(res => res.data),
  
//   // Delete video
//   deleteVideo: (id) => api.delete(`/videos/${id}`).then(res => res.data),
// };

// export default videoAPI;















// // client/src/api/videoAPI.js
// import api from './apiConfig';

// const videoAPI = {
//   // Get all videos with pagination and search
//   getVideos: (params) => api.get('/videos', { params }).then(res => res.data),
  
//   // Get single video by slug
//   getVideo: (slug) => api.get(`/videos/${slug}`).then(res => res.data),
  
//   // Get featured videos
//   getFeaturedVideos: () => api.get('/videos/featured').then(res => res.data),
  
//   // Get video stream URL
//   getVideoStream: (slug) => api.get(`/videos/${slug}/stream`).then(res => res.data),
  
//   // Get video subtitles
//   getVideoSubtitles: (slug) => api.get(`/videos/${slug}/subtitles`).then(res => res.data),
  
//   // Create new video
//   createVideo: (data) => api.post('/videos', data).then(res => res.data),
  
//   // Bulk create videos (for CSV/JSON batch upload)
//   bulkCreateVideos: (data) => api.post('/videos/bulk', data).then(res => res.data),
  
//   // Update video
//   updateVideo: (id, data) => api.put(`/videos/${id}`, data).then(res => res.data),
  
//   // Delete video
//   deleteVideo: (id) => api.delete(`/videos/${id}`).then(res => res.data),
// };

// export default videoAPI;












// client/src/api/videoAPI.js
import api from './apiConfig';

const videoAPI = {
  // ============================================
  // PUBLIC VIDEO ENDPOINTS (Unchanged)
  // ============================================
  
  // Get all videos with pagination and search
  getVideos: (params) => api.get('/videos', { params }).then(res => res.data),
  
  // Get single video by slug
  getVideo: (slug) => api.get(`/videos/${slug}`).then(res => res.data),
  
  // Get featured videos
  getFeaturedVideos: () => api.get('/videos/featured').then(res => res.data),
  
  // Get video stream URL
  getVideoStream: (slug) => api.get(`/videos/${slug}/stream`).then(res => res.data),
  
  // Get video subtitles
  getVideoSubtitles: (slug) => api.get(`/videos/${slug}/subtitles`).then(res => res.data),
  
  // ============================================
  // ADMIN VIDEO ENDPOINTS (Unchanged)
  // ============================================
  
  // Create new video (admin only)
  createVideo: (data) => api.post('/videos', data).then(res => res.data),
  
  // Bulk create videos (admin only)
  bulkCreateVideos: (data) => api.post('/videos/bulk', data).then(res => res.data),
  
  // Update video (admin only)
  updateVideo: (id, data) => api.put(`/videos/${id}`, data).then(res => res.data),
  
  // Delete video (admin only)
  deleteVideo: (id) => api.delete(`/videos/${id}`).then(res => res.data),
  
  // ============================================
  // CREATOR VIDEO ENDPOINTS (NEW)
  // ============================================
  
  // Upload video with thumbnail (creator only)
  uploadCreatorVideo: (formData, onProgress) => {
    return api.post('/videos/creator/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: onProgress
    }).then(res => res.data);
  },
  
  // Get creator's videos list
  getCreatorVideos: (params) => api.get('/videos/creator', { params }).then(res => res.data),
  
  // Get video presets (categories, types, etc.)
  getCreatorPresets: () => api.get('/videos/creator/presets').then(res => res.data),
  
  // Get creator video statistics
  getCreatorStatistics: () => api.get('/videos/creator/statistics').then(res => res.data),
  
  // Get single creator video by ID
  getCreatorVideo: (id) => api.get(`/videos/creator/${id}`).then(res => res.data),
  
  // Update creator video
  updateCreatorVideo: (id, data) => api.put(`/videos/creator/${id}`, data).then(res => res.data),
  
  // Delete creator video
  deleteCreatorVideo: (id) => api.delete(`/videos/creator/${id}`).then(res => res.data),
  
  // Publish creator video
  publishCreatorVideo: (id) => api.patch(`/videos/creator/${id}/publish`).then(res => res.data),
  
  // Unpublish creator video
  unpublishCreatorVideo: (id) => api.patch(`/videos/creator/${id}/unpublish`).then(res => res.data),
  
  // Bulk delete creator videos
  bulkDeleteCreatorVideos: (ids) => api.post('/videos/creator/bulk-delete', { ids }).then(res => res.data),
};

export default videoAPI;