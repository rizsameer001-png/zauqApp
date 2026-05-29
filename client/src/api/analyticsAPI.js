import api from './apiConfig'

const analyticsAPI = {
  getDashboardStats: () => api.get('/analytics/dashboard').then(res => res.data),
  getUserAnalytics: (params) => api.get('/analytics/users', { params }).then(res => res.data),
  getContentAnalytics: () => api.get('/analytics/content').then(res => res.data),
  getRevenueAnalytics: () => api.get('/analytics/revenue').then(res => res.data),
  getReadingAnalytics: () => api.get('/analytics/reading').then(res => res.data),
  getAIUsage: () => api.get('/analytics/ai-usage').then(res => res.data),
  trackEvent: (event, data) => api.post('/analytics/track', { event, data }).then(res => res.data),
}

export default analyticsAPI
