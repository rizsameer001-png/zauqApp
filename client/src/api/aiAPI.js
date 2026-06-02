// client/src/api/aiAPI.js
import api from './apiConfig';

const aiAPI = {
  // Generate poem using AI
  generatePoem: (data) => api.post('/ai/generate', data).then(res => res.data),
  
  // Analyze existing poem
  analyzePoem: (data) => api.post('/ai/analyze', data).then(res => res.data),
  
  // Get user's AI usage statistics
  getUsageStats: () => api.get('/ai/usage').then(res => res.data),
  
  // Voice search (transcribe speech to text)
  transcribeVoice: (audioBlob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    return api.post('/ai/voice-search', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data);
  },
  
  // Quick analyze for existing poem (by slug)
  analyzePoemBySlug: (slug) => api.get(`/poems/${slug}/ai-analysis`).then(res => res.data),
  
  // Get sentiment for poem
  getSentiment: (slug) => api.get(`/poems/${slug}/sentiment`).then(res => res.data),
  
  // Get theme analysis
  getThemes: (slug) => api.get(`/poems/${slug}/themes`).then(res => res.data)

  // Add these to your aiAPI.js
// getSentiment: (slug) => api.get(`/poems/${slug}/sentiment`).then(res => res.data),
// getThemes: (slug) => api.get(`/poems/${slug}/themes`).then(res => res.data),
// analyzePoem: (data) => api.post('/ai/analyze', data).then(res => res.data),
};

export default aiAPI;