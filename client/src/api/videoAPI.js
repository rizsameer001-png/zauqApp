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















// client/src/api/videoAPI.js
import api from './apiConfig';

const videoAPI = {
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
  
  // Create new video
  createVideo: (data) => api.post('/videos', data).then(res => res.data),
  
  // Bulk create videos (for CSV/JSON batch upload)
  bulkCreateVideos: (data) => api.post('/videos/bulk', data).then(res => res.data),
  
  // Update video
  updateVideo: (id, data) => api.put(`/videos/${id}`, data).then(res => res.data),
  
  // Delete video
  deleteVideo: (id) => api.delete(`/videos/${id}`).then(res => res.data),
};

export default videoAPI;