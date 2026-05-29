//client/src/api/categoryAPI.js

import api from './apiConfig'

const categoryAPI = {
  getCategories: () => api.get('/categories').then(res => res.data),
  getCategoriesByType: (type) => api.get(`/categories/type/${type}`).then(res => res.data),
  getCategory: (id) => api.get(`/categories/${id}`).then(res => res.data),
  createCategory: (data) => api.post('/categories', data).then(res => res.data),
  updateCategory: (id, data) => api.put(`/categories/${id}`, data).then(res => res.data),
  deleteCategory: (id) => api.delete(`/categories/${id}`).then(res => res.data),
}

export default categoryAPI
