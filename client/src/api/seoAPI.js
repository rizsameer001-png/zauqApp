import api from './apiConfig'

const seoAPI = {
  getMeta: (page) => api.get(`/seo/meta/${page}`).then(res => res.data),
  updateMeta: (page, data) => api.put(`/seo/meta/${page}`, data).then(res => res.data),
  getSitemap: () => api.get('/seo/sitemap.xml').then(res => res.data),
  getRobots: () => api.get('/seo/robots.txt').then(res => res.data),
  getStructuredData: (page) => api.get(`/seo/structured-data/${page}`).then(res => res.data),
  updateStructuredData: (page, data) => api.put(`/seo/structured-data/${page}`, data).then(res => res.data),
  getDashboard: () => api.get('/seo/dashboard').then(res => res.data),
}

export default seoAPI
