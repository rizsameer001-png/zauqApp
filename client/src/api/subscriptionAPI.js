// import api from './apiConfig'

// const subscriptionAPI = {
//   getPlans: () => api.get('/subscriptions/plans').then(res => res.data),
//   getFeatures: () => api.get('/subscriptions/features').then(res => res.data),
//   getCurrent: () => api.get('/subscriptions/current').then(res => res.data),
//   getBillingHistory: () => api.get('/subscriptions/billing-history').then(res => res.data),
//   subscribe: (plan, billingCycle, paymentMethod) => api.post('/subscriptions/subscribe', { plan, billingCycle, paymentMethod }).then(res => res.data),
//   verifyPayment: (subscriptionId, paymentId) => api.post('/subscriptions/verify-payment', { subscriptionId, paymentId }).then(res => res.data),
//   cancel: () => api.post('/subscriptions/cancel').then(res => res.data),
// }

// export default subscriptionAPI







// import api from './apiConfig'

// const subscriptionAPI = {
//   // Public routes
//   getPlans: () => api.get('/subscriptions/plans').then(res => res.data),
//   getFeatures: () => api.get('/subscriptions/features').then(res => res.data),
  
//   // User routes
//   getCurrent: () => api.get('/subscriptions/current').then(res => res.data),
//   getBillingHistory: () => api.get('/subscriptions/billing-history').then(res => res.data),
//   subscribe: (plan, billingCycle, paymentMethod) => api.post('/subscriptions/subscribe', { plan, billingCycle, paymentMethod }).then(res => res.data),
//   verifyPayment: (subscriptionId, paymentId) => api.post('/subscriptions/verify-payment', { subscriptionId, paymentId }).then(res => res.data),
//   cancel: () => api.post('/subscriptions/cancel').then(res => res.data),
  
//   // Admin CMS routes
//   getAllPlansCMS: () => api.get('/subscriptions/cms/plans').then(res => res.data),
//   getPlanByIdCMS: (id) => api.get(`/subscriptions/cms/plans/${id}`).then(res => res.data),
//   createPlanCMS: (planData) => api.post('/subscriptions/cms/plans', planData).then(res => res.data),
//   updatePlanCMS: (id, planData) => api.put(`/subscriptions/cms/plans/${id}`, planData).then(res => res.data),
//   deletePlanCMS: (id, permanent = false) => api.delete(`/subscriptions/cms/plans/${id}`, { params: { permanent } }).then(res => res.data),
//   togglePlanStatusCMS: (id) => api.patch(`/subscriptions/cms/plans/${id}/toggle`).then(res => res.data),
//   reorderPlansCMS: (orders) => api.post('/subscriptions/cms/plans/reorder', { orders }).then(res => res.data),
//   getSubscriptionStatsCMS: () => api.get('/subscriptions/cms/stats').then(res => res.data),
// }

// export default subscriptionAPI

















// client/src/services/subscriptionAPI.js
import api from './apiConfig'

// Helper function to handle responses and errors
const handleResponse = (promise) => {
  return promise
    .then(res => res.data)
    .catch(error => {
      console.error('API Error:', error.response?.data || error.message);
      throw error.response?.data || { message: 'An error occurred' };
    });
};

const subscriptionAPI = {
  // ============== Public Routes ==============
  getPlans: () => handleResponse(api.get('/subscriptions/plans')),
  getFeatures: () => handleResponse(api.get('/subscriptions/features')),
  
  // ============== User Routes ==============
  getCurrent: () => handleResponse(api.get('/subscriptions/current')),
  getBillingHistory: () => handleResponse(api.get('/subscriptions/billing-history')),
  subscribe: (plan, billingCycle, paymentMethod) => 
    handleResponse(api.post('/subscriptions/subscribe', { plan, billingCycle, paymentMethod })),
  verifyPayment: (subscriptionId, paymentId) => 
    handleResponse(api.post('/subscriptions/verify-payment', { subscriptionId, paymentId })),
  cancel: () => handleResponse(api.post('/subscriptions/cancel')),
  
  // ============== Admin CMS Routes - Plans ==============
  getAllPlansCMS: () => handleResponse(api.get('/subscriptions/cms/plans')),
  getPlanByIdCMS: (id) => handleResponse(api.get(`/subscriptions/cms/plans/${id}`)),
  createPlanCMS: (planData) => handleResponse(api.post('/subscriptions/cms/plans', planData)),
  updatePlanCMS: (id, planData) => handleResponse(api.put(`/subscriptions/cms/plans/${id}`, planData)),
  deletePlanCMS: (id, permanent = false) => 
    handleResponse(api.delete(`/subscriptions/cms/plans/${id}`, { params: { permanent } })),
  togglePlanStatusCMS: (id) => handleResponse(api.patch(`/subscriptions/cms/plans/${id}/toggle`)),
  reorderPlansCMS: (orders) => handleResponse(api.post('/subscriptions/cms/plans/reorder', { orders })),
  getSubscriptionStatsCMS: () => handleResponse(api.get('/subscriptions/cms/stats')),
  
  // ============== Admin CMS Routes - Subscribers ==============
  getAllSubscribers: () => handleResponse(api.get('/subscriptions/cms/subscribers')),
  getSubscriberById: (id) => handleResponse(api.get(`/subscriptions/cms/subscribers/${id}`)),
  getSubscribersByPlan: (plan) => handleResponse(api.get(`/subscriptions/cms/subscribers/plan/${plan}`)),
  getSubscribersByStatus: (status) => handleResponse(api.get(`/subscriptions/cms/subscribers/status/${status}`)),
  updateSubscriberStatus: (id, status) => 
    handleResponse(api.patch(`/subscriptions/cms/subscribers/${id}/status`, { status })),
  cancelSubscriberSubscription: (id) => 
    handleResponse(api.post(`/subscriptions/cms/subscribers/${id}/cancel`)),
  getSubscriberStats: () => handleResponse(api.get('/subscriptions/cms/subscribers/stats')),
  exportSubscribers: (format = 'csv') => 
    api.get(`/subscriptions/cms/subscribers/export/${format}`, { responseType: 'blob' })
      .then(res => res.data),
  
  // ============== Admin CMS Routes - Transactions ==============
  getAllTransactions: () => handleResponse(api.get('/subscriptions/cms/transactions')),
  getTransactionById: (id) => handleResponse(api.get(`/subscriptions/cms/transactions/${id}`)),
  getTransactionsByUser: (userId) => handleResponse(api.get(`/subscriptions/cms/transactions/user/${userId}`)),
  getTransactionsByStatus: (status) => handleResponse(api.get(`/subscriptions/cms/transactions/status/${status}`)),
  getTransactionsByDateRange: (startDate, endDate) => 
    handleResponse(api.get('/subscriptions/cms/transactions/date-range', { params: { startDate, endDate } })),
  getTransactionStats: () => handleResponse(api.get('/subscriptions/cms/transactions/stats')),
  exportTransactions: (format = 'csv') => 
    api.get(`/subscriptions/cms/transactions/export/${format}`, { responseType: 'blob' })
      .then(res => res.data),
  refundTransaction: (id, reason) => 
    handleResponse(api.post(`/subscriptions/cms/transactions/${id}/refund`, { reason })),
}

export default subscriptionAPI