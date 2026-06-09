// client/src/api/adAPI.js
import api from './apiConfig';

const adAPI = {
  // Get all ads (Admin)
  getAllAds: () => api.get('/ads'),
  
  // Get active ads
  getActiveAds: (params) => api.get('/ads/active', { params }),
  
  // Get ads by position
  getAdsByPosition: (position, page = 'all') => 
    api.get(`/ads/position/${position}`, { params: { page } }),
  
  // Create ad (Admin)
  createAd: (data) => api.post('/ads', data),
  
  // Update ad (Admin)
  updateAd: (id, data) => api.put(`/ads/${id}`, data),
  
  // Delete ad (Admin)
  deleteAd: (id) => api.delete(`/ads/${id}`),
  
  // Track click
  trackClick: (id) => api.post(`/ads/${id}/click`),
  
  // Track impression
  trackImpression: (id) => api.post(`/ads/${id}/impression`)
};

export default adAPI;