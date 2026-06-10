// import api from './apiConfig'

// const seoAPI = {
//   getMeta: (page) => api.get(`/seo/meta/${page}`).then(res => res.data),
//   updateMeta: (page, data) => api.put(`/seo/meta/${page}`, data).then(res => res.data),
//   getSitemap: () => api.get('/seo/sitemap.xml').then(res => res.data),
//   getRobots: () => api.get('/seo/robots.txt').then(res => res.data),
//   getStructuredData: (page) => api.get(`/seo/structured-data/${page}`).then(res => res.data),
//   updateStructuredData: (page, data) => api.put(`/seo/structured-data/${page}`, data).then(res => res.data),
//   getDashboard: () => api.get('/seo/dashboard').then(res => res.data),
// }

// export default seoAPI




import api from './apiConfig'

const seoAPI = {
  // Get SEO meta for a specific page
  getMeta: async (page) => {
    const response = await api.get(`/seo/meta/${page}`)
    return response.data // This contains { success: true, data: seoData }
  },
  
  // Update SEO meta for a specific page
  updateMeta: async (page, data) => {
    const response = await api.put(`/seo/meta/${page}`, data)
    return response.data
  },
  
  // Get sitemap.xml
  getSitemap: async () => {
    const response = await api.get('/seo/sitemap.xml', {
      responseType: 'text'
    })
    return response.data
  },
  
  // Get robots.txt
  getRobots: async () => {
    const response = await api.get('/seo/robots.txt', {
      responseType: 'text'
    })
    return response.data
  },
  
  // Get structured data for a specific page
  getStructuredData: async (page) => {
    const response = await api.get(`/seo/structured-data/${page}`)
    return response.data // Contains { success: true, data: structuredData }
  },
  
  // Update structured data for a specific page
  updateStructuredData: async (page, data) => {
    const response = await api.put(`/seo/structured-data/${page}`, data)
    return response.data
  },
  
  // Get SEO dashboard with all pages
  getDashboard: async () => {
    const response = await api.get('/seo/dashboard')
    return response.data // Contains { success: true, data: dashboardData }
  },
  
  // Trigger sitemap generation (optional - for logging)
  generateSitemap: async () => {
    const response = await api.post('/seo/generate-sitemap')
    return response.data
  }
}

export default seoAPI