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

















// // client/src/services/subscriptionAPI.js
// import api from './apiConfig'

// // Helper function to handle responses and errors
// const handleResponse = (promise) => {
//   return promise
//     .then(res => res.data)
//     .catch(error => {
//       console.error('API Error:', error.response?.data || error.message);
//       throw error.response?.data || { message: 'An error occurred' };
//     });
// };

// const subscriptionAPI = {
//   // ============== Public Routes ==============
//   getPlans: () => handleResponse(api.get('/subscriptions/plans')),
//   getFeatures: () => handleResponse(api.get('/subscriptions/features')),
  
//   // ============== User Routes ==============
//   getCurrent: () => handleResponse(api.get('/subscriptions/current')),
//   getBillingHistory: () => handleResponse(api.get('/subscriptions/billing-history')),
//   subscribe: (plan, billingCycle, paymentMethod) => 
//     handleResponse(api.post('/subscriptions/subscribe', { plan, billingCycle, paymentMethod })),
//   verifyPayment: (subscriptionId, paymentId) => 
//     handleResponse(api.post('/subscriptions/verify-payment', { subscriptionId, paymentId })),
//   cancel: () => handleResponse(api.post('/subscriptions/cancel')),
  
//   // ============== Admin CMS Routes - Plans ==============
//   getAllPlansCMS: () => handleResponse(api.get('/subscriptions/cms/plans')),
//   getPlanByIdCMS: (id) => handleResponse(api.get(`/subscriptions/cms/plans/${id}`)),
//   createPlanCMS: (planData) => handleResponse(api.post('/subscriptions/cms/plans', planData)),
//   updatePlanCMS: (id, planData) => handleResponse(api.put(`/subscriptions/cms/plans/${id}`, planData)),
//   deletePlanCMS: (id, permanent = false) => 
//     handleResponse(api.delete(`/subscriptions/cms/plans/${id}`, { params: { permanent } })),
//   togglePlanStatusCMS: (id) => handleResponse(api.patch(`/subscriptions/cms/plans/${id}/toggle`)),
//   reorderPlansCMS: (orders) => handleResponse(api.post('/subscriptions/cms/plans/reorder', { orders })),
//   getSubscriptionStatsCMS: () => handleResponse(api.get('/subscriptions/cms/stats')),
  
//   // ============== Admin CMS Routes - Subscribers ==============
//   getAllSubscribers: () => handleResponse(api.get('/subscriptions/cms/subscribers')),
//   getSubscriberById: (id) => handleResponse(api.get(`/subscriptions/cms/subscribers/${id}`)),
//   getSubscribersByPlan: (plan) => handleResponse(api.get(`/subscriptions/cms/subscribers/plan/${plan}`)),
//   getSubscribersByStatus: (status) => handleResponse(api.get(`/subscriptions/cms/subscribers/status/${status}`)),
//   updateSubscriberStatus: (id, status) => 
//     handleResponse(api.patch(`/subscriptions/cms/subscribers/${id}/status`, { status })),
//   cancelSubscriberSubscription: (id) => 
//     handleResponse(api.post(`/subscriptions/cms/subscribers/${id}/cancel`)),
//   getSubscriberStats: () => handleResponse(api.get('/subscriptions/cms/subscribers/stats')),
//   exportSubscribers: (format = 'csv') => 
//     api.get(`/subscriptions/cms/subscribers/export/${format}`, { responseType: 'blob' })
//       .then(res => res.data),
  
//   // ============== Admin CMS Routes - Transactions ==============
//   getAllTransactions: () => handleResponse(api.get('/subscriptions/cms/transactions')),
//   getTransactionById: (id) => handleResponse(api.get(`/subscriptions/cms/transactions/${id}`)),
//   getTransactionsByUser: (userId) => handleResponse(api.get(`/subscriptions/cms/transactions/user/${userId}`)),
//   getTransactionsByStatus: (status) => handleResponse(api.get(`/subscriptions/cms/transactions/status/${status}`)),
//   getTransactionsByDateRange: (startDate, endDate) => 
//     handleResponse(api.get('/subscriptions/cms/transactions/date-range', { params: { startDate, endDate } })),
//   getTransactionStats: () => handleResponse(api.get('/subscriptions/cms/transactions/stats')),
//   exportTransactions: (format = 'csv') => 
//     api.get(`/subscriptions/cms/transactions/export/${format}`, { responseType: 'blob' })
//       .then(res => res.data),
//   refundTransaction: (id, reason) => 
//     handleResponse(api.post(`/subscriptions/cms/transactions/${id}/refund`, { reason })),
// }

// export default subscriptionAPI













// // client/src/services/subscriptionAPI.js
// import api from './apiConfig'

// // Helper function to handle responses and errors
// const handleResponse = (promise) => {
//   return promise
//     .then(res => res.data)
//     .catch(error => {
//       console.error('API Error:', error.response?.data || error.message);
//       throw error.response?.data || { message: 'An error occurred' };
//     });
// };

// const subscriptionAPI = {
//   // ============== Public Routes ==============
//   getPlans: () => handleResponse(api.get('/subscriptions/plans')),
//   getFeatures: () => handleResponse(api.get('/subscriptions/features')),
  
//   // ============== User Routes ==============
//   getCurrent: () => handleResponse(api.get('/subscriptions/current')),
//   getBillingHistory: () => handleResponse(api.get('/subscriptions/billing-history')),
//   subscribe: (plan, billingCycle, paymentMethod) => 
//     handleResponse(api.post('/subscriptions/subscribe', { plan, billingCycle, paymentMethod })),
//   verifyPayment: (subscriptionId, paymentId, paymentDetails) => 
//     handleResponse(api.post('/subscriptions/verify-payment', { subscriptionId, paymentId, paymentDetails })),
//   cancel: () => handleResponse(api.post('/subscriptions/cancel')),
  
//   // ============== Payment Gateway Routes ==============
  
//   // Razorpay Payment Gateway
//   createRazorpayOrder: (plan, billingCycle) => 
//     handleResponse(api.post('/subscriptions/create-razorpay-order', { plan, billingCycle })),
  
//   verifyRazorpayPayment: (orderId, paymentId, signature, subscriptionId) => 
//     handleResponse(api.post('/subscriptions/verify-razorpay', { 
//       orderId, 
//       paymentId, 
//       signature, 
//       subscriptionId 
//     })),
  
//   // Stripe Payment Gateway
//   createStripePaymentIntent: (plan, billingCycle) => 
//     handleResponse(api.post('/subscriptions/create-stripe-payment', { plan, billingCycle })),
  
//   verifyStripePayment: (paymentIntentId, subscriptionId) => 
//     handleResponse(api.post('/subscriptions/verify-stripe', { 
//       paymentIntentId, 
//       subscriptionId 
//     })),
  
//   // ============== Admin CMS Routes - Plans ==============
//   getAllPlansCMS: () => handleResponse(api.get('/subscriptions/cms/plans')),
//   getPlanByIdCMS: (id) => handleResponse(api.get(`/subscriptions/cms/plans/${id}`)),
//   createPlanCMS: (planData) => handleResponse(api.post('/subscriptions/cms/plans', planData)),
//   updatePlanCMS: (id, planData) => handleResponse(api.put(`/subscriptions/cms/plans/${id}`, planData)),
//   deletePlanCMS: (id, permanent = false) => 
//     handleResponse(api.delete(`/subscriptions/cms/plans/${id}`, { params: { permanent } })),
//   togglePlanStatusCMS: (id) => handleResponse(api.patch(`/subscriptions/cms/plans/${id}/toggle`)),
//   reorderPlansCMS: (orders) => handleResponse(api.post('/subscriptions/cms/plans/reorder', { orders })),
//   getSubscriptionStatsCMS: () => handleResponse(api.get('/subscriptions/cms/stats')),
  
//   // ============== Admin CMS Routes - Subscribers ==============
//   getAllSubscribers: (params) => handleResponse(api.get('/subscriptions/cms/subscribers', { params })),
//   getSubscriberById: (id) => handleResponse(api.get(`/subscriptions/cms/subscribers/${id}`)),
//   getSubscribersByPlan: (plan) => handleResponse(api.get(`/subscriptions/cms/subscribers/plan/${plan}`)),
//   getSubscribersByStatus: (status) => handleResponse(api.get(`/subscriptions/cms/subscribers/status/${status}`)),
//   updateSubscriberStatus: (id, status) => 
//     handleResponse(api.patch(`/subscriptions/cms/subscribers/${id}/status`, { status })),
//   cancelSubscriberSubscription: (id) => 
//     handleResponse(api.post(`/subscriptions/cms/subscribers/${id}/cancel`)),
//   getSubscriberStats: () => handleResponse(api.get('/subscriptions/cms/subscribers/stats')),
//   exportSubscribers: (format = 'csv') => 
//     api.get(`/subscriptions/cms/subscribers/export/${format}`, { responseType: 'blob' })
//       .then(res => res.data),
  
//   // ============== Admin CMS Routes - Transactions ==============
//   getAllTransactions: (params) => handleResponse(api.get('/subscriptions/cms/transactions', { params })),
//   getTransactionById: (id) => handleResponse(api.get(`/subscriptions/cms/transactions/${id}`)),
//   getTransactionsByUser: (userId) => handleResponse(api.get(`/subscriptions/cms/transactions/user/${userId}`)),
//   getTransactionsByStatus: (status) => handleResponse(api.get(`/subscriptions/cms/transactions/status/${status}`)),
//   getTransactionsByDateRange: (startDate, endDate) => 
//     handleResponse(api.get('/subscriptions/cms/transactions/date-range', { params: { startDate, endDate } })),
//   getTransactionStats: () => handleResponse(api.get('/subscriptions/cms/transactions/stats')),
//   exportTransactions: (format = 'csv') => 
//     api.get(`/subscriptions/cms/transactions/export/${format}`, { responseType: 'blob' })
//       .then(res => res.data),
//   refundTransaction: (id, reason) => 
//     handleResponse(api.post(`/subscriptions/cms/transactions/${id}/refund`, { reason })),
// }

// export default subscriptionAPI











// // client/src/services/subscriptionAPI.js
// import api from './apiConfig'

// // Helper function to handle responses and errors
// const handleResponse = (promise) => {
//   return promise
//     .then(res => res.data)
//     .catch(error => {
//       console.error('API Error:', error.response?.data || error.message);
//       throw error.response?.data || { message: 'An error occurred' };
//     });
// };

// const subscriptionAPI = {
//   // ============== Public Routes ==============
//   getPlans: () => handleResponse(api.get('/subscriptions/plans')),
//   getFeatures: () => handleResponse(api.get('/subscriptions/features')),
  
//   // ============== Payment Gateway Configuration ==============
//   getRazorpayKey: () => handleResponse(api.get('/subscriptions/config/razorpay-key')),
//   getStripeKey: () => handleResponse(api.get('/subscriptions/config/stripe-key')),
//   getPaymentGatewayStatus: () => handleResponse(api.get('/subscriptions/config/payment-status')),
  
//   // ============== User Routes ==============
//   getCurrent: () => handleResponse(api.get('/subscriptions/current')),
//   getBillingHistory: () => handleResponse(api.get('/subscriptions/billing-history')),
//   subscribe: (plan, billingCycle, paymentMethod) => 
//     handleResponse(api.post('/subscriptions/subscribe', { plan, billingCycle, paymentMethod })),
//   verifyPayment: (subscriptionId, paymentId, paymentDetails) => 
//     handleResponse(api.post('/subscriptions/verify-payment', { subscriptionId, paymentId, paymentDetails })),
//   cancel: () => handleResponse(api.post('/subscriptions/cancel')),
  
//   // ============== Payment Gateway Routes ==============
  
//   // Razorpay Payment Gateway
//   createRazorpayOrder: (plan, billingCycle) => 
//     handleResponse(api.post('/subscriptions/create-razorpay-order', { plan, billingCycle })),
  
//   verifyRazorpayPayment: (orderId, paymentId, signature, subscriptionId) => 
//     handleResponse(api.post('/subscriptions/verify-razorpay', { 
//       orderId, 
//       paymentId, 
//       signature, 
//       subscriptionId 
//     })),
  
//   // Stripe Payment Gateway
//   createStripePaymentIntent: (plan, billingCycle) => 
//     handleResponse(api.post('/subscriptions/create-stripe-payment', { plan, billingCycle })),
  
//   verifyStripePayment: (paymentIntentId, subscriptionId) => 
//     handleResponse(api.post('/subscriptions/verify-stripe', { 
//       paymentIntentId, 
//       subscriptionId 
//     })),
  
//   // ============== Analytics Routes ==============
//   getDailySubscriptionAnalytics: (params) => 
//     handleResponse(api.get('/subscriptions/analytics/daily', { params })),
//   getMonthlySubscriptionAnalytics: (params) => 
//     handleResponse(api.get('/subscriptions/analytics/monthly', { params })),
//   getYearlySubscriptionAnalytics: (params) => 
//     handleResponse(api.get('/subscriptions/analytics/yearly', { params })),
  
//   // ============== Invoice Routes ==============
//   getInvoiceById: (id) => handleResponse(api.get(`/subscriptions/invoices/${id}`)),
//   downloadInvoice: (id) => 
//     api.get(`/subscriptions/invoices/download/${id}`, { responseType: 'blob' })
//       .then(res => res.data),
//   sendInvoiceEmail: (id) => handleResponse(api.post(`/subscriptions/invoices/send/${id}`)),
  
//   // ============== Coupon/Discount Routes ==============
//   validateCoupon: (code) => handleResponse(api.get(`/subscriptions/coupons/validate/${code}`)),
//   applyCoupon: (data) => handleResponse(api.post('/subscriptions/coupons/apply', data)),
  
//   // ============== Admin CMS Routes - Plans ==============
//   getAllPlansCMS: () => handleResponse(api.get('/subscriptions/cms/plans')),
//   getPlanByIdCMS: (id) => handleResponse(api.get(`/subscriptions/cms/plans/${id}`)),
//   createPlanCMS: (planData) => handleResponse(api.post('/subscriptions/cms/plans', planData)),
//   updatePlanCMS: (id, planData) => handleResponse(api.put(`/subscriptions/cms/plans/${id}`, planData)),
//   deletePlanCMS: (id, permanent = false) => 
//     handleResponse(api.delete(`/subscriptions/cms/plans/${id}`, { params: { permanent } })),
//   togglePlanStatusCMS: (id) => handleResponse(api.patch(`/subscriptions/cms/plans/${id}/toggle`)),
//   reorderPlansCMS: (orders) => handleResponse(api.post('/subscriptions/cms/plans/reorder', { orders })),
//   getSubscriptionStatsCMS: () => handleResponse(api.get('/subscriptions/cms/stats')),
  
//   // ============== Admin CMS Routes - Subscribers ==============
//   getAllSubscribers: (params) => handleResponse(api.get('/subscriptions/cms/subscribers', { params })),
//   getSubscriberById: (id) => handleResponse(api.get(`/subscriptions/cms/subscribers/${id}`)),
//   getSubscribersByPlan: (plan) => handleResponse(api.get(`/subscriptions/cms/subscribers/plan/${plan}`)),
//   getSubscribersByStatus: (status) => handleResponse(api.get(`/subscriptions/cms/subscribers/status/${status}`)),
//   updateSubscriberStatus: (id, status) => 
//     handleResponse(api.patch(`/subscriptions/cms/subscribers/${id}/status`, { status })),
//   cancelSubscriberSubscription: (id) => 
//     handleResponse(api.post(`/subscriptions/cms/subscribers/${id}/cancel`)),
//   getSubscriberStats: () => handleResponse(api.get('/subscriptions/cms/subscribers/stats')),
//   exportSubscribers: (format = 'csv') => 
//     api.get(`/subscriptions/cms/subscribers/export/${format}`, { responseType: 'blob' })
//       .then(res => res.data),
  
//   // ============== Admin CMS Routes - Transactions ==============
//   getAllTransactions: (params) => handleResponse(api.get('/subscriptions/cms/transactions', { params })),
//   getTransactionById: (id) => handleResponse(api.get(`/subscriptions/cms/transactions/${id}`)),
//   getTransactionsByUser: (userId) => handleResponse(api.get(`/subscriptions/cms/transactions/user/${userId}`)),
//   getTransactionsByStatus: (status) => handleResponse(api.get(`/subscriptions/cms/transactions/status/${status}`)),
//   getTransactionsByDateRange: (startDate, endDate) => 
//     handleResponse(api.get('/subscriptions/cms/transactions/date-range', { params: { startDate, endDate } })),
//   getTransactionStats: () => handleResponse(api.get('/subscriptions/cms/transactions/stats')),
//   exportTransactions: (format = 'csv') => 
//     api.get(`/subscriptions/cms/transactions/export/${format}`, { responseType: 'blob' })
//       .then(res => res.data),
//   refundTransaction: (id, reason) => 
//     handleResponse(api.post(`/subscriptions/cms/transactions/${id}/refund`, { reason })),
  
//   // ============== Subscription Upgrade/Downgrade ==============
//   upgradeSubscription: (currentPlanId, newPlanId, billingCycle) => 
//     handleResponse(api.post('/subscriptions/upgrade', { currentPlanId, newPlanId, billingCycle })),
//   downgradeSubscription: (currentPlanId, newPlanId, billingCycle) => 
//     handleResponse(api.post('/subscriptions/downgrade', { currentPlanId, newPlanId, billingCycle })),
  
//   // ============== Payment Method Management ==============
//   getPaymentMethods: () => handleResponse(api.get('/subscriptions/payment-methods')),
//   addPaymentMethod: (paymentMethodData) => 
//     handleResponse(api.post('/subscriptions/payment-methods', paymentMethodData)),
//   removePaymentMethod: (methodId) => 
//     handleResponse(api.delete(`/subscriptions/payment-methods/${methodId}`)),
//   setDefaultPaymentMethod: (methodId) => 
//     handleResponse(api.patch(`/subscriptions/payment-methods/${methodId}/default`)),
  
//   // ============== Subscription Features ==============
//   getSubscriptionFeatures: () => handleResponse(api.get('/subscriptions/features')),
//   getFeatureUsage: () => handleResponse(api.get('/subscriptions/features/usage')),
  
//   // ============== Webhook Management (Admin only) ==============
//   getWebhookLogs: (params) => handleResponse(api.get('/subscriptions/cms/webhook-logs', { params })),
//   retryFailedWebhook: (logId) => handleResponse(api.post(`/subscriptions/cms/webhook-logs/${logId}/retry`)),
// }

// export default subscriptionAPI;













// // client/src/services/subscriptionAPI.js
// import api from './apiConfig'

// // Helper function to handle responses and errors
// const handleResponse = (promise) => {
//   return promise
//     .then(res => {
//       // Handle both wrapped and unwrapped responses
//       if (res.data && res.data.success !== undefined) {
//         return res.data;
//       }
//       return { success: true, data: res.data };
//     })
//     .catch(error => {
//       console.error('API Error:', error.response?.data || error.message);
//       throw error.response?.data || { success: false, message: 'An error occurred' };
//     });
// };

// const subscriptionAPI = {
//   // ============== Public Routes ==============
//   getPlans: () => handleResponse(api.get('/subscriptions/plans')),
//   getFeatures: () => handleResponse(api.get('/subscriptions/features')),
  
//   // ============== Payment Gateway Configuration ==============
//   getRazorpayKey: () => handleResponse(api.get('/subscriptions/config/razorpay-key')),
//   getStripeKey: () => handleResponse(api.get('/subscriptions/config/stripe-key')),
//   getPaymentGatewayStatus: () => handleResponse(api.get('/subscriptions/config/payment-status')),
  
//   // ============== User Routes ==============
//   getCurrent: () => handleResponse(api.get('/subscriptions/current')),
//   getBillingHistory: () => handleResponse(api.get('/subscriptions/billing-history')),
//   subscribe: (plan, billingCycle, paymentMethod) => 
//     handleResponse(api.post('/subscriptions/subscribe', { plan, billingCycle, paymentMethod })),
//   verifyPayment: (subscriptionId, paymentId, paymentDetails) => 
//     handleResponse(api.post('/subscriptions/verify-payment', { subscriptionId, paymentId, paymentDetails })),
//   cancel: () => handleResponse(api.post('/subscriptions/cancel')),
  
//   // ============== Payment Gateway Routes ==============
  
//   // Razorpay Payment Gateway
//   createRazorpayOrder: (plan, billingCycle) => 
//     handleResponse(api.post('/subscriptions/create-razorpay-order', { plan, billingCycle })),
  
//   verifyRazorpayPayment: (orderId, paymentId, signature, subscriptionId) => 
//     handleResponse(api.post('/subscriptions/verify-razorpay', { 
//       orderId, 
//       paymentId, 
//       signature, 
//       subscriptionId 
//     })),
  
//   // Stripe Payment Gateway
//   createStripePaymentIntent: (plan, billingCycle) => 
//     handleResponse(api.post('/subscriptions/create-stripe-payment', { plan, billingCycle })),
  
//   verifyStripePayment: (paymentIntentId, subscriptionId) => 
//     handleResponse(api.post('/subscriptions/verify-stripe', { 
//       paymentIntentId, 
//       subscriptionId 
//     })),
  
//   // ============== Analytics Routes ==============
//   getDailySubscriptionAnalytics: (params) => 
//     handleResponse(api.get('/subscriptions/analytics/daily', { params })),
//   getMonthlySubscriptionAnalytics: (params) => 
//     handleResponse(api.get('/subscriptions/analytics/monthly', { params })),
//   getYearlySubscriptionAnalytics: (params) => 
//     handleResponse(api.get('/subscriptions/analytics/yearly', { params })),
  
//   // ============== Invoice Routes ==============
//   getInvoiceById: (id) => handleResponse(api.get(`/subscriptions/invoices/${id}`)),
//   downloadInvoice: async (id) => {
//     try {
//       const response = await api.get(`/subscriptions/invoices/download/${id}`, { 
//         responseType: 'blob' 
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Download invoice error:', error);
//       throw error.response?.data || { message: 'Failed to download invoice' };
//     }
//   },
//   sendInvoiceEmail: (id) => handleResponse(api.post(`/subscriptions/invoices/send/${id}`)),
  
//   // ============== Coupon/Discount Routes ==============
//   validateCoupon: (code, params) => handleResponse(api.get(`/subscriptions/coupons/validate/${code}`, { params })),
//   applyCoupon: (data) => handleResponse(api.post('/subscriptions/coupons/apply', data)),
  
//   // ============== Payment Method Management ==============
//   getPaymentMethods: async () => {
//     try {
//       const response = await api.get('/subscriptions/payment-methods');
//       // Handle response consistently
//       if (response.data && response.data.success !== undefined) {
//         return response.data;
//       }
//       return { success: true, data: response.data || [] };
//     } catch (error) {
//       console.error('Get payment methods error:', error);
//       // Return empty array instead of throwing for better UX
//       return { success: true, data: [] };
//     }
//   },
  
//   addPaymentMethod: async (paymentMethodData) => {
//     try {
//       const response = await api.post('/subscriptions/payment-methods', paymentMethodData);
//       if (response.data && response.data.success !== undefined) {
//         return response.data;
//       }
//       return { success: true, data: response.data };
//     } catch (error) {
//       console.error('Add payment method error:', error);
//       throw error.response?.data || { success: false, message: 'Failed to add payment method' };
//     }
//   },
  
//   removePaymentMethod: async (methodId) => {
//     try {
//       const response = await api.delete(`/subscriptions/payment-methods/${methodId}`);
//       if (response.data && response.data.success !== undefined) {
//         return response.data;
//       }
//       return { success: true, data: response.data };
//     } catch (error) {
//       console.error('Remove payment method error:', error);
//       throw error.response?.data || { success: false, message: 'Failed to remove payment method' };
//     }
//   },
  
//   setDefaultPaymentMethod: async (methodId) => {
//     try {
//       const response = await api.patch(`/subscriptions/payment-methods/${methodId}/default`);
//       if (response.data && response.data.success !== undefined) {
//         return response.data;
//       }
//       return { success: true, data: response.data };
//     } catch (error) {
//       console.error('Set default payment method error:', error);
//       throw error.response?.data || { success: false, message: 'Failed to set default payment method' };
//     }
//   },
  
//   // ============== Subscription Features ==============
//   getSubscriptionFeatures: () => handleResponse(api.get('/subscriptions/features')),
//   getFeatureUsage: () => handleResponse(api.get('/subscriptions/features/usage')),
  
//   // ============== Admin CMS Routes - Plans ==============
//   getAllPlansCMS: () => handleResponse(api.get('/subscriptions/cms/plans')),
//   getPlanByIdCMS: (id) => handleResponse(api.get(`/subscriptions/cms/plans/${id}`)),
//   createPlanCMS: (planData) => handleResponse(api.post('/subscriptions/cms/plans', planData)),
//   updatePlanCMS: (id, planData) => handleResponse(api.put(`/subscriptions/cms/plans/${id}`, planData)),
//   deletePlanCMS: (id, permanent = false) => 
//     handleResponse(api.delete(`/subscriptions/cms/plans/${id}`, { params: { permanent } })),
//   togglePlanStatusCMS: (id) => handleResponse(api.patch(`/subscriptions/cms/plans/${id}/toggle`)),
//   reorderPlansCMS: (orders) => handleResponse(api.post('/subscriptions/cms/plans/reorder', { orders })),
//   getSubscriptionStatsCMS: () => handleResponse(api.get('/subscriptions/cms/stats')),
  
//   // ============== Admin CMS Routes - Subscribers ==============
//   getAllSubscribers: (params) => handleResponse(api.get('/subscriptions/cms/subscribers', { params })),
//   getSubscriberById: (id) => handleResponse(api.get(`/subscriptions/cms/subscribers/${id}`)),
//   getSubscribersByPlan: (plan) => handleResponse(api.get(`/subscriptions/cms/subscribers/plan/${plan}`)),
//   getSubscribersByStatus: (status) => handleResponse(api.get(`/subscriptions/cms/subscribers/status/${status}`)),
//   updateSubscriberStatus: (id, status) => 
//     handleResponse(api.patch(`/subscriptions/cms/subscribers/${id}/status`, { status })),
//   cancelSubscriberSubscription: (id) => 
//     handleResponse(api.post(`/subscriptions/cms/subscribers/${id}/cancel`)),
//   getSubscriberStats: () => handleResponse(api.get('/subscriptions/cms/subscribers/stats')),
//   exportSubscribers: (format = 'csv') => 
//     api.get(`/subscriptions/cms/subscribers/export/${format}`, { responseType: 'blob' })
//       .then(res => res.data),
  
//   // ============== Admin CMS Routes - Transactions ==============
//   getAllTransactions: (params) => handleResponse(api.get('/subscriptions/cms/transactions', { params })),
//   getTransactionById: (id) => handleResponse(api.get(`/subscriptions/cms/transactions/${id}`)),
//   getTransactionsByUser: (userId) => handleResponse(api.get(`/subscriptions/cms/transactions/user/${userId}`)),
//   getTransactionsByStatus: (status) => handleResponse(api.get(`/subscriptions/cms/transactions/status/${status}`)),
//   getTransactionsByDateRange: (startDate, endDate) => 
//     handleResponse(api.get('/subscriptions/cms/transactions/date-range', { params: { startDate, endDate } })),
//   getTransactionStats: () => handleResponse(api.get('/subscriptions/cms/transactions/stats')),
//   exportTransactions: (format = 'csv') => 
//     api.get(`/subscriptions/cms/transactions/export/${format}`, { responseType: 'blob' })
//       .then(res => res.data),
//   refundTransaction: (id, reason) => 
//     handleResponse(api.post(`/subscriptions/cms/transactions/${id}/refund`, { reason })),
  
//   // ============== Subscription Upgrade/Downgrade ==============
//   upgradeSubscription: (currentPlanId, newPlanId, billingCycle) => 
//     handleResponse(api.post('/subscriptions/upgrade', { currentPlanId, newPlanId, billingCycle })),
//   downgradeSubscription: (currentPlanId, newPlanId, billingCycle) => 
//     handleResponse(api.post('/subscriptions/downgrade', { currentPlanId, newPlanId, billingCycle })),
  
//   // ============== Webhook Management (Admin only) ==============
//   getWebhookLogs: (params) => handleResponse(api.get('/subscriptions/cms/webhook-logs', { params })),
//   retryFailedWebhook: (logId) => handleResponse(api.post(`/subscriptions/cms/webhook-logs/${logId}/retry`)),
  
//   // ============== Helper Methods ==============
  
//   // Format payment method for display
//   formatPaymentMethod: (paymentMethod) => {
//     if (!paymentMethod) return null;
//     return {
//       ...paymentMethod,
//       cardNumberDisplay: `•••• •••• •••• ${paymentMethod.lastFourDigits || paymentMethod.cardNumber?.slice(-4)}`,
//       expiryDisplay: `${paymentMethod.expiryMonth}/${paymentMethod.expiryYear}`,
//       cardBrandIcon: subscriptionAPI.getCardBrandIcon(paymentMethod.cardBrand)
//     };
//   },
  
//   // Get card brand icon
//   getCardBrandIcon: (brand) => {
//     const icons = {
//       visa: '💳',
//       mastercard: '💳',
//       amex: '💳',
//       rupay: '💳',
//       other: '💳'
//     };
//     return icons[brand] || icons.other;
//   },
  
//   // Format invoice for display
//   formatInvoice: (invoice) => {
//     if (!invoice) return null;
//     return {
//       ...invoice,
//       amountDisplay: `${invoice.currency} ${invoice.amount?.toLocaleString()}`,
//       dateDisplay: new Date(invoice.createdAt).toLocaleDateString(),
//       statusBadge: invoice.status === 'paid' ? 'success' : invoice.status === 'pending' ? 'warning' : 'error',
//       statusText: invoice.status === 'paid' ? 'Paid' : invoice.status === 'pending' ? 'Pending' : 'Failed'
//     };
//   },
  
//   // Calculate subscription savings
//   calculateSavings: (monthlyPrice, yearlyPrice) => {
//     const monthlyTotal = monthlyPrice * 12;
//     const savings = monthlyTotal - yearlyPrice;
//     const savingsPercentage = Math.round((savings / monthlyTotal) * 100);
//     return { savings, savingsPercentage };
//   }
// };

// export default subscriptionAPI;






















// // client/src/api/subscriptionAPI.js
// import api from './apiConfig';

// const subscriptionAPI = {
//   // Get all subscription plans
//   getPlans: () => api.get('/subscriptions/plans').then(res => res.data),
  
//   // Get subscription features
//   getFeatures: () => api.get('/subscriptions/features').then(res => res.data),
  
//   // Get current user subscription
//   getCurrent: () => api.get('/subscriptions/current').then(res => res.data),
  
//   // Subscribe to a plan
//   subscribe: (plan, billingCycle, paymentMethod) => 
//     api.post('/subscriptions/subscribe', { plan, billingCycle, paymentMethod }).then(res => res.data),
  
//   // Verify payment
//   verifyPayment: (data) => api.post('/subscriptions/verify-payment', data).then(res => res.data),
  
//   // Cancel subscription
//   cancelSubscription: () => api.post('/subscriptions/cancel').then(res => res.data),
  
//   // Get billing history
//   getBillingHistory: () => api.get('/subscriptions/billing-history').then(res => res.data),
  
//   // FIXED: Download invoice as blob
//   downloadInvoice: async (invoiceId) => {
//     try {
//       const response = await api.get(`/subscriptions/invoice/${invoiceId}/download`, {
//         responseType: 'blob'
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Download invoice error:', error);
//       throw error;
//     }
//   },
  
//   // Send invoice email
//   sendInvoiceEmail: (invoiceId) => 
//     api.post(`/subscriptions/invoice/${invoiceId}/send`).then(res => res.data),
  
//   // Get invoice by ID
//   getInvoice: (invoiceId) => 
//     api.get(`/subscriptions/invoice/${invoiceId}`).then(res => res.data),
  
//   // Payment Methods
//   getPaymentMethods: () => api.get('/subscriptions/payment-methods').then(res => res.data),
  
//   addPaymentMethod: (data) => api.post('/subscriptions/payment-methods', data).then(res => res.data),
  
//   removePaymentMethod: (methodId) => 
//     api.delete(`/subscriptions/payment-methods/${methodId}`).then(res => res.data),
  
//   setDefaultPaymentMethod: (methodId) => 
//     api.put(`/subscriptions/payment-methods/${methodId}/default`).then(res => res.data),
  
//   // Coupons
//   validateCoupon: (code, plan, amount) => 
//     api.get(`/subscriptions/coupon/${code}/validate`, { params: { plan, amount } }).then(res => res.data),
  
//   applyCoupon: (data) => api.post('/subscriptions/coupon/apply', data).then(res => res.data),
  
//   // Razorpay
//   createRazorpayOrder: (data) => api.post('/subscriptions/razorpay/create-order', data).then(res => res.data),
  
//   verifyRazorpayPayment: (data) => api.post('/subscriptions/razorpay/verify', data).then(res => res.data),
  
//   // Stripe
//   createStripePaymentIntent: (data) => api.post('/subscriptions/stripe/create-intent', data).then(res => res.data),
  
//   verifyStripePayment: (data) => api.post('/subscriptions/stripe/verify', data).then(res => res.data),
// };

// export default subscriptionAPI;





















// // client/src/api/subscriptionAPI.js
// import api from './apiConfig';

// const subscriptionAPI = {
//   // Get all subscription plans
//   getPlans: () => api.get('/subscriptions/plans').then(res => res.data),
  
//   // Get subscription features
//   getFeatures: () => api.get('/subscriptions/features').then(res => res.data),
  
//   // Get current user subscription
//   getCurrent: () => api.get('/subscriptions/current').then(res => res.data),
  
//   // Subscribe to a plan
//   subscribe: (plan, billingCycle, paymentMethod, couponCode = null) => 
//     api.post('/subscriptions/subscribe', { plan, billingCycle, paymentMethod, couponCode }).then(res => res.data),
  
//   // Verify payment
//   verifyPayment: (data) => api.post('/subscriptions/verify-payment', data).then(res => res.data),
  
//   // Cancel subscription
//   cancelSubscription: () => api.post('/subscriptions/cancel').then(res => res.data),
  
//   // Get billing history
//   getBillingHistory: () => api.get('/subscriptions/billing-history').then(res => res.data),
  
//   // ============================================
//   // FIXED: Download invoice as PDF with proper blob handling
//   // ============================================
//   downloadInvoice: async (invoiceId) => {
//     try {
//       const response = await api.get(`/subscriptions/invoice/${invoiceId}/download`, {
//         responseType: 'blob'
//       });
      
//       // Check if response is valid
//       if (!response.data || response.data.size === 0) {
//         throw new Error('Empty file received');
//       }
      
//       // Create blob URL and trigger download
//       const blob = new Blob([response.data], { type: 'application/pdf' });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `invoice_${invoiceId}.pdf`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);
      
//       return { success: true };
//     } catch (error) {
//       console.error('Download invoice error:', error);
//       throw error;
//     }
//   },
  
//   // Alternative: View invoice in new tab
//   viewInvoice: async (invoiceId) => {
//     try {
//       const response = await api.get(`/subscriptions/invoice/${invoiceId}/download`, {
//         responseType: 'blob'
//       });
      
//       if (!response.data || response.data.size === 0) {
//         throw new Error('Empty file received');
//       }
      
//       const blob = new Blob([response.data], { type: 'application/pdf' });
//       const url = window.URL.createObjectURL(blob);
//       window.open(url, '_blank');
//       setTimeout(() => window.URL.revokeObjectURL(url), 1000);
      
//       return { success: true };
//     } catch (error) {
//       console.error('View invoice error:', error);
//       throw error;
//     }
//   },
  
//   // Send invoice email
//   sendInvoiceEmail: (invoiceId) => 
//     api.post(`/subscriptions/invoice/${invoiceId}/send`).then(res => res.data),
  
//   // Get invoice by ID (JSON data)
//   getInvoice: (invoiceId) => 
//     api.get(`/subscriptions/invoice/${invoiceId}`).then(res => res.data),
  
//   // ============================================
//   // Payment Methods
//   // ============================================
//   getPaymentMethods: () => api.get('/subscriptions/payment-methods').then(res => res.data),
  
//   addPaymentMethod: (data) => api.post('/subscriptions/payment-methods', data).then(res => res.data),
  
//   removePaymentMethod: (methodId) => 
//     api.delete(`/subscriptions/payment-methods/${methodId}`).then(res => res.data),
  
//   setDefaultPaymentMethod: (methodId) => 
//     api.put(`/subscriptions/payment-methods/${methodId}/default`).then(res => res.data),
  
//   // ============================================
//   // Coupons
//   // ============================================
//   validateCoupon: (code, plan, amount) => 
//     api.get(`/subscriptions/coupon/${code}/validate`, { params: { plan, amount } }).then(res => res.data),
  
//   applyCoupon: (data) => api.post('/subscriptions/coupon/apply', data).then(res => res.data),
  
//   // ============================================
//   // Razorpay Integration
//   // ============================================
//   createRazorpayOrder: (data) => api.post('/subscriptions/razorpay/create-order', data).then(res => res.data),
  
//   verifyRazorpayPayment: (data) => api.post('/subscriptions/razorpay/verify', data).then(res => res.data),
  
//   // ============================================
//   // Stripe Integration
//   // ============================================
//   createStripePaymentIntent: (data) => api.post('/subscriptions/stripe/create-intent', data).then(res => res.data),
  
//   verifyStripePayment: (data) => api.post('/subscriptions/stripe/verify', data).then(res => res.data),
  
//   // ============================================
//   // Admin Routes
//   // ============================================
//   getAllPlansAdmin: () => api.get('/subscriptions/admin/plans').then(res => res.data),
  
//   getPlanByIdAdmin: (id) => api.get(`/subscriptions/admin/plans/${id}`).then(res => res.data),
  
//   createPlanAdmin: (data) => api.post('/subscriptions/admin/plans', data).then(res => res.data),
  
//   updatePlanAdmin: (id, data) => api.put(`/subscriptions/admin/plans/${id}`, data).then(res => res.data),
  
//   deletePlanAdmin: (id, permanent = false) => 
//     api.delete(`/subscriptions/admin/plans/${id}`, { params: { permanent } }).then(res => res.data),
  
//   togglePlanStatusAdmin: (id) => 
//     api.patch(`/subscriptions/admin/plans/${id}/toggle`).then(res => res.data),
  
//   reorderPlansAdmin: (orders) => 
//     api.post('/subscriptions/admin/plans/reorder', { orders }).then(res => res.data),
  
//   getSubscriptionStatsAdmin: () => 
//     api.get('/subscriptions/admin/stats').then(res => res.data),
  
//   // Subscriber management (admin)
//   getAllSubscribers: (params) => 
//     api.get('/subscriptions/admin/subscribers', { params }).then(res => res.data),
  
//   getSubscriberById: (id) => 
//     api.get(`/subscriptions/admin/subscribers/${id}`).then(res => res.data),
  
//   // Transaction management (admin)
//   getAllTransactions: (params) => 
//     api.get('/subscriptions/admin/transactions', { params }).then(res => res.data),
  
//   getTransactionById: (id) => 
//     api.get(`/subscriptions/admin/transactions/${id}`).then(res => res.data),
  
//   getTransactionStats: () => 
//     api.get('/subscriptions/admin/transactions/stats').then(res => res.data),
// };

// export default subscriptionAPI;

















// // client/src/api/subscriptionAPI.js
// import api from './apiConfig';

// const subscriptionAPI = {
//   // ============================================
//   // PUBLIC ROUTES (No authentication required)
//   // ============================================
  
//   // Get all subscription plans
//   getPlans: () => api.get('/subscriptions/plans').then(res => res.data),
  
//   // Get subscription features
//   getFeatures: () => api.get('/subscriptions/features').then(res => res.data),
  
//   // ============================================
//   // PROTECTED ROUTES (Authentication required)
//   // ============================================
  
//   // Get current user subscription
//   getCurrent: async () => {
//     try {
//       const response = await api.get('/subscriptions/current');
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching current subscription:', error);
//       return { plan: 'free', status: 'active', features: [] };
//     }
//   },
  
//   // Subscribe to a plan
//   subscribe: (plan, billingCycle, paymentMethod, couponCode = null) => 
//     api.post('/subscriptions/subscribe', { plan, billingCycle, paymentMethod, couponCode }).then(res => res.data),
  
//   // Verify payment
//   verifyPayment: (data) => api.post('/subscriptions/verify-payment', data).then(res => res.data),
  
//   // Cancel subscription
//   cancelSubscription: () => api.post('/subscriptions/cancel').then(res => res.data),
  
//   // Get billing history
//   getBillingHistory: () => api.get('/subscriptions/billing-history').then(res => res.data),
  
//   // ============================================
//   // INVOICE ROUTES
//   // ============================================
  
//   // Download invoice as PDF
//   downloadInvoice: async (invoiceId) => {
//     try {
//       const response = await api.get(`/subscriptions/invoice/${invoiceId}/download`, {
//         responseType: 'blob'
//       });
      
//       if (!response.data || response.data.size === 0) {
//         throw new Error('Empty file received');
//       }
      
//       const blob = new Blob([response.data], { type: 'application/pdf' });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `invoice_${invoiceId}.pdf`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);
      
//       return { success: true };
//     } catch (error) {
//       console.error('Download invoice error:', error);
//       throw error;
//     }
//   },
  
//   // View invoice in new tab
//   viewInvoice: async (invoiceId) => {
//     try {
//       const response = await api.get(`/subscriptions/invoice/${invoiceId}/download`, {
//         responseType: 'blob'
//       });
      
//       if (!response.data || response.data.size === 0) {
//         throw new Error('Empty file received');
//       }
      
//       const blob = new Blob([response.data], { type: 'application/pdf' });
//       const url = window.URL.createObjectURL(blob);
//       window.open(url, '_blank');
//       setTimeout(() => window.URL.revokeObjectURL(url), 1000);
      
//       return { success: true };
//     } catch (error) {
//       console.error('View invoice error:', error);
//       throw error;
//     }
//   },
  
//   // Send invoice email
//   sendInvoiceEmail: (invoiceId) => 
//     api.post(`/subscriptions/invoice/${invoiceId}/send`).then(res => res.data),
  
//   // Get invoice by ID (JSON data)
//   getInvoice: (invoiceId) => 
//     api.get(`/subscriptions/invoice/${invoiceId}`).then(res => res.data),
  
//   // ============================================
//   // PAYMENT METHODS
//   // ============================================
  
//   getPaymentMethods: () => api.get('/subscriptions/payment-methods').then(res => res.data),
  
//   addPaymentMethod: (data) => api.post('/subscriptions/payment-methods', data).then(res => res.data),
  
//   removePaymentMethod: (methodId) => 
//     api.delete(`/subscriptions/payment-methods/${methodId}`).then(res => res.data),
  
//   setDefaultPaymentMethod: (methodId) => 
//     api.put(`/subscriptions/payment-methods/${methodId}/default`).then(res => res.data),
  
//   // ============================================
//   // COUPON ROUTES
//   // ============================================
  
//   validateCoupon: (code, plan, amount) => 
//     api.get(`/subscriptions/coupon/${code}/validate`, { params: { plan, amount } }).then(res => res.data),
  
//   applyCoupon: (data) => api.post('/subscriptions/coupon/apply', data).then(res => res.data),
  
//   // ============================================
//   // ============== ADMIN CMS ROUTES ==============
//   // ============================================
  
//   // Get all plans (including inactive) for admin
//   getAllPlansCMS: () => api.get('/subscriptions/admin/plans').then(res => res.data),
  
//   // Get plan by ID
//   getPlanByIdCMS: (id) => api.get(`/subscriptions/admin/plans/${id}`).then(res => res.data),
  
//   // Create new plan
//   createPlanCMS: (data) => api.post('/subscriptions/admin/plans', data).then(res => res.data),
  
//   // Update plan
//   updatePlanCMS: (id, data) => api.put(`/subscriptions/admin/plans/${id}`, data).then(res => res.data),
  
//   // Delete plan (soft delete or permanent)
//   deletePlanCMS: (id, permanent = false) => 
//     api.delete(`/subscriptions/admin/plans/${id}`, { params: { permanent } }).then(res => res.data),
  
//   // Toggle plan status (activate/deactivate)
//   togglePlanStatusCMS: (id) => 
//     api.patch(`/subscriptions/admin/plans/${id}/toggle`).then(res => res.data),
  
//   // Reorder plans
//   reorderPlansCMS: (orders) => 
//     api.post('/subscriptions/admin/plans/reorder', { orders }).then(res => res.data),
  
//   // Get subscription statistics for admin dashboard
//   getSubscriptionStatsCMS: () => api.get('/subscriptions/admin/stats').then(res => res.data),
  
//   // ============================================
//   // SUBSCRIBER MANAGEMENT (Admin only)
//   // ============================================
  
//   // Get all subscribers (with filters)
//   getAllSubscribers: (params) => 
//     api.get('/subscriptions/admin/subscribers', { params }).then(res => res.data),
  
//   // Get subscriber by ID
//   getSubscriberById: (id) => 
//     api.get(`/subscriptions/admin/subscribers/${id}`).then(res => res.data),
  
//   // ============================================
//   // TRANSACTION MANAGEMENT (Admin only)
//   // ============================================
  
//   // Get all transactions (with filters)
//   getAllTransactions: (params) => 
//     api.get('/subscriptions/admin/transactions', { params }).then(res => res.data),
  
//   // Get transaction by ID
//   getTransactionById: (id) => 
//     api.get(`/subscriptions/admin/transactions/${id}`).then(res => res.data),
  
//   // Get transaction statistics
//   getTransactionStats: () => 
//     api.get('/subscriptions/admin/transactions/stats').then(res => res.data),
  
//   // ============================================
//   // RAZORPAY INTEGRATION
//   // ============================================
  
//   createRazorpayOrder: (data) => api.post('/subscriptions/razorpay/create-order', data).then(res => res.data),
  
//   verifyRazorpayPayment: (data) => api.post('/subscriptions/razorpay/verify', data).then(res => res.data),
  
//   // ============================================
//   // STRIPE INTEGRATION
//   // ============================================
  
//   createStripePaymentIntent: (data) => api.post('/subscriptions/stripe/create-intent', data).then(res => res.data),
  
//   verifyStripePayment: (data) => api.post('/subscriptions/stripe/verify', data).then(res => res.data)
// };

// export default subscriptionAPI;





















// // client/src/api/subscriptionAPI.js
// import api from './apiConfig';

// const subscriptionAPI = {
//   // ============================================
//   // PUBLIC ROUTES (No authentication required)
//   // ============================================
  
//   // Get all subscription plans
//   getPlans: () => api.get('/subscriptions/plans').then(res => res.data),
  
//   // Get subscription features
//   getFeatures: () => api.get('/subscriptions/features').then(res => res.data),
  
//   // ============================================
//   // PROTECTED ROUTES (Authentication required)
//   // ============================================
  
//   // Get current user subscription
//   getCurrent: async () => {
//     try {
//       const response = await api.get('/subscriptions/current');
//       // Handle different response structures
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       if (response.data && response.data.data) {
//         return response.data.data;
//       }
//       return response.data || { plan: 'free', status: 'active', features: [] };
//     } catch (error) {
//       console.error('Error fetching current subscription:', error);
//       return { plan: 'free', status: 'active', features: [] };
//     }
//   },
  
//   // Subscribe to a plan
//   subscribe: (plan, billingCycle, paymentMethod, couponCode = null) => 
//     api.post('/subscriptions/subscribe', { plan, billingCycle, paymentMethod, couponCode }).then(res => res.data),
  
//   // Verify payment
//   verifyPayment: (data) => api.post('/subscriptions/verify-payment', data).then(res => res.data),
  
//   // Cancel subscription
//   cancelSubscription: () => api.post('/subscriptions/cancel').then(res => res.data),
  
//   // Get billing history
//   getBillingHistory: () => api.get('/subscriptions/billing-history').then(res => res.data),
  
//   // ============================================
//   // INVOICE ROUTES
//   // ============================================
  
//   // Download invoice as PDF
//   downloadInvoice: async (invoiceId) => {
//     try {
//       const response = await api.get(`/subscriptions/invoice/${invoiceId}/download`, {
//         responseType: 'blob'
//       });
      
//       if (!response.data || response.data.size === 0) {
//         throw new Error('Empty file received');
//       }
      
//       const blob = new Blob([response.data], { type: 'application/pdf' });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `invoice_${invoiceId}.pdf`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);
      
//       return { success: true };
//     } catch (error) {
//       console.error('Download invoice error:', error);
//       throw error;
//     }
//   },
  
//   // View invoice in new tab
//   viewInvoice: async (invoiceId) => {
//     try {
//       const response = await api.get(`/subscriptions/invoice/${invoiceId}/download`, {
//         responseType: 'blob'
//       });
      
//       if (!response.data || response.data.size === 0) {
//         throw new Error('Empty file received');
//       }
      
//       const blob = new Blob([response.data], { type: 'application/pdf' });
//       const url = window.URL.createObjectURL(blob);
//       window.open(url, '_blank');
//       setTimeout(() => window.URL.revokeObjectURL(url), 1000);
      
//       return { success: true };
//     } catch (error) {
//       console.error('View invoice error:', error);
//       throw error;
//     }
//   },
  
//   // Send invoice email
//   sendInvoiceEmail: (invoiceId) => 
//     api.post(`/subscriptions/invoice/${invoiceId}/send`).then(res => res.data),
  
//   // Get invoice by ID (JSON data)
//   getInvoice: (invoiceId) => 
//     api.get(`/subscriptions/invoice/${invoiceId}`).then(res => res.data),
  
//   // ============================================
//   // PAYMENT METHODS
//   // ============================================
  
//   getPaymentMethods: () => api.get('/subscriptions/payment-methods').then(res => res.data),
  
//   addPaymentMethod: (data) => api.post('/subscriptions/payment-methods', data).then(res => res.data),
  
//   removePaymentMethod: (methodId) => 
//     api.delete(`/subscriptions/payment-methods/${methodId}`).then(res => res.data),
  
//   setDefaultPaymentMethod: (methodId) => 
//     api.put(`/subscriptions/payment-methods/${methodId}/default`).then(res => res.data),
  
//   // ============================================
//   // COUPON ROUTES
//   // ============================================
  
//   validateCoupon: (code, plan, amount) => 
//     api.get(`/subscriptions/coupon/${code}/validate`, { params: { plan, amount } }).then(res => res.data),
  
//   applyCoupon: (data) => api.post('/subscriptions/coupon/apply', data).then(res => res.data),
  
//   // ============================================
//   // ============== ADMIN CMS ROUTES ==============
//   // ============================================
  
//   // Get all plans (including inactive) for admin
//   getAllPlansCMS: async () => {
//     try {
//       const response = await api.get('/subscriptions/admin/plans');
//       // Handle different response structures
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       if (response.data && response.data.data) {
//         return response.data.data;
//       }
//       return response.data || [];
//     } catch (error) {
//       console.error('Error fetching plans:', error);
//       return [];
//     }
//   },
  
//   // Get plan by ID
//   getPlanByIdCMS: async (id) => {
//     try {
//       const response = await api.get(`/subscriptions/admin/plans/${id}`);
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching plan:', error);
//       return null;
//     }
//   },
  
//   // Create new plan
//   createPlanCMS: (data) => api.post('/subscriptions/admin/plans', data).then(res => res.data),
  
//   // Update plan
//   updatePlanCMS: (id, data) => api.put(`/subscriptions/admin/plans/${id}`, data).then(res => res.data),
  
//   // Delete plan (soft delete or permanent)
//   deletePlanCMS: (id, permanent = false) => 
//     api.delete(`/subscriptions/admin/plans/${id}`, { params: { permanent } }).then(res => res.data),
  
//   // Toggle plan status (activate/deactivate)
//   togglePlanStatusCMS: (id) => 
//     api.patch(`/subscriptions/admin/plans/${id}/toggle`).then(res => res.data),
  
//   // Reorder plans
//   reorderPlansCMS: (orders) => 
//     api.post('/subscriptions/admin/plans/reorder', { orders }).then(res => res.data),
  
//   // Get subscription statistics for admin dashboard
//   getSubscriptionStatsCMS: async () => {
//     try {
//       const response = await api.get('/subscriptions/admin/stats');
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       if (response.data && response.data.data) {
//         return response.data.data;
//       }
//       return response.data || {};
//     } catch (error) {
//       console.error('Error fetching subscription stats:', error);
//       return {};
//     }
//   },
  
//   // ============================================
//   // SUBSCRIBER MANAGEMENT (Admin only)
//   // ============================================
  
//   // Get all subscribers (with filters)
//   getAllSubscribers: async (params = {}) => {
//     try {
//       const response = await api.get('/subscriptions/admin/subscribers', { params });
//       // Handle different response structures
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       if (response.data && response.data.subscribers) {
//         return response.data;
//       }
//       return response.data || { subscribers: [], pagination: { total: 0 } };
//     } catch (error) {
//       console.error('Error fetching subscribers:', error);
//       return { subscribers: [], pagination: { total: 0 } };
//     }
//   },
  
//   // Get subscriber by ID
//   getSubscriberById: async (id) => {
//     try {
//       const response = await api.get(`/subscriptions/admin/subscribers/${id}`);
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching subscriber:', error);
//       return null;
//     }
//   },
  
//   // ============================================
//   // TRANSACTION MANAGEMENT (Admin only)
//   // ============================================
  
//   // Get all transactions (with filters)
//   getAllTransactions: async (params = {}) => {
//     try {
//       const response = await api.get('/subscriptions/admin/transactions', { params });
//       // Handle different response structures
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       if (response.data && response.data.transactions) {
//         return response.data;
//       }
//       return response.data || { transactions: [], pagination: { total: 0 } };
//     } catch (error) {
//       console.error('Error fetching transactions:', error);
//       return { transactions: [], pagination: { total: 0 } };
//     }
//   },
  
//   // Get transaction by ID
//   getTransactionById: async (id) => {
//     try {
//       const response = await api.get(`/subscriptions/admin/transactions/${id}`);
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching transaction:', error);
//       return null;
//     }
//   },
  
//   // Get transaction statistics
//   getTransactionStats: async () => {
//     try {
//       const response = await api.get('/subscriptions/admin/transactions/stats');
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       if (response.data && response.data.data) {
//         return response.data.data;
//       }
//       return response.data || {};
//     } catch (error) {
//       console.error('Error fetching transaction stats:', error);
//       return {};
//     }
//   },
  
//   // ============================================
//   // TEST ROUTE (Admin only)
//   // ============================================
  
//   testAdminAccess: async () => {
//     try {
//       const response = await api.get('/subscriptions/admin/test');
//       return response.data;
//     } catch (error) {
//       console.error('Admin test failed:', error);
//       return { success: false, error: error.message };
//     }
//   },
  
//   // ============================================
//   // RAZORPAY INTEGRATION
//   // ============================================
  
//   createRazorpayOrder: (data) => api.post('/subscriptions/razorpay/create-order', data).then(res => res.data),
  
//   verifyRazorpayPayment: (data) => api.post('/subscriptions/razorpay/verify', data).then(res => res.data),
  
//   // ============================================
//   // STRIPE INTEGRATION
//   // ============================================
  
//   createStripePaymentIntent: (data) => api.post('/subscriptions/stripe/create-intent', data).then(res => res.data),
  
//   verifyStripePayment: (data) => api.post('/subscriptions/stripe/verify', data).then(res => res.data),
  
//   // ============================================
//   // HEALTH CHECK
//   // ============================================
  
//   healthCheck: () => api.get('/subscriptions/health').then(res => res.data)
// };

// export default subscriptionAPI;




















// // client/src/api/subscriptionAPI.js
// import api from './apiConfig';

// const subscriptionAPI = {
//   // ============================================
//   // PUBLIC ROUTES (No authentication required)
//   // ============================================
  
//   // Get all subscription plans - FIXED: Format features properly
//   getPlans: async () => {
//     try {
//       const response = await api.get('/subscriptions/plans');
//       let plansData = response.data?.data || response.data;
      
//       // Format plans to ensure features are strings
//       if (plansData && typeof plansData === 'object') {
//         Object.keys(plansData).forEach(planId => {
//           if (plansData[planId].features && Array.isArray(plansData[planId].features)) {
//             plansData[planId].features = plansData[planId].features.map(feature => {
//               // If feature is an object, extract the name property
//               if (typeof feature === 'object' && feature !== null) {
//                 return feature.name || feature.feature || JSON.stringify(feature);
//               }
//               return String(feature);
//             });
//           }
//         });
//       }
      
//       return plansData;
//     } catch (error) {
//       console.error('Error fetching plans:', error);
//       throw error;
//     }
//   },
  
//   // Get subscription features
//   getFeatures: () => api.get('/subscriptions/features').then(res => res.data),
  
//   // ============================================
//   // PROTECTED ROUTES (Authentication required)
//   // ============================================
  
//   // Get current user subscription
//   getCurrent: async () => {
//     try {
//       const response = await api.get('/subscriptions/current');
//       // Handle different response structures
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       if (response.data && response.data.data) {
//         return response.data.data;
//       }
//       return response.data || { plan: 'free', status: 'active', features: [] };
//     } catch (error) {
//       console.error('Error fetching current subscription:', error);
//       return { plan: 'free', status: 'active', features: [] };
//     }
//   },
  
//   // Subscribe to a plan
//   subscribe: (plan, billingCycle, paymentMethod, couponCode = null) => 
//     api.post('/subscriptions/subscribe', { plan, billingCycle, paymentMethod, couponCode }).then(res => res.data),
  
//   // Verify payment
//   verifyPayment: (data) => api.post('/subscriptions/verify-payment', data).then(res => res.data),
  
//   // Cancel subscription
//   cancelSubscription: () => api.post('/subscriptions/cancel').then(res => res.data),
  
//   // Get billing history
//   getBillingHistory: () => api.get('/subscriptions/billing-history').then(res => res.data),
  
//   // ============================================
//   // INVOICE ROUTES
//   // ============================================
  
//   // Download invoice as PDF
//   downloadInvoice: async (invoiceId) => {
//     try {
//       const response = await api.get(`/subscriptions/invoice/${invoiceId}/download`, {
//         responseType: 'blob'
//       });
      
//       if (!response.data || response.data.size === 0) {
//         throw new Error('Empty file received');
//       }
      
//       const blob = new Blob([response.data], { type: 'application/pdf' });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `invoice_${invoiceId}.pdf`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);
      
//       return { success: true };
//     } catch (error) {
//       console.error('Download invoice error:', error);
//       throw error;
//     }
//   },
  
//   // View invoice in new tab
//   viewInvoice: async (invoiceId) => {
//     try {
//       const response = await api.get(`/subscriptions/invoice/${invoiceId}/download`, {
//         responseType: 'blob'
//       });
      
//       if (!response.data || response.data.size === 0) {
//         throw new Error('Empty file received');
//       }
      
//       const blob = new Blob([response.data], { type: 'application/pdf' });
//       const url = window.URL.createObjectURL(blob);
//       window.open(url, '_blank');
//       setTimeout(() => window.URL.revokeObjectURL(url), 1000);
      
//       return { success: true };
//     } catch (error) {
//       console.error('View invoice error:', error);
//       throw error;
//     }
//   },
  
//   // Send invoice email
//   sendInvoiceEmail: (invoiceId) => 
//     api.post(`/subscriptions/invoice/${invoiceId}/send`).then(res => res.data),
  
//   // Get invoice by ID (JSON data)
//   getInvoice: (invoiceId) => 
//     api.get(`/subscriptions/invoice/${invoiceId}`).then(res => res.data),
  
//   // ============================================
//   // PAYMENT METHODS
//   // ============================================
  
//   getPaymentMethods: () => api.get('/subscriptions/payment-methods').then(res => res.data),
  
//   addPaymentMethod: (data) => api.post('/subscriptions/payment-methods', data).then(res => res.data),
  
//   removePaymentMethod: (methodId) => 
//     api.delete(`/subscriptions/payment-methods/${methodId}`).then(res => res.data),
  
//   setDefaultPaymentMethod: (methodId) => 
//     api.put(`/subscriptions/payment-methods/${methodId}/default`).then(res => res.data),
  
//   // ============================================
//   // COUPON ROUTES
//   // ============================================
  
//   validateCoupon: (code, plan, amount) => 
//     api.get(`/subscriptions/coupon/${code}/validate`, { params: { plan, amount } }).then(res => res.data),
  
//   applyCoupon: (data) => api.post('/subscriptions/coupon/apply', data).then(res => res.data),
  
//   // ============================================
//   // ============== ADMIN CMS ROUTES ==============
//   // ============================================
  
//   // Get all plans (including inactive) for admin
//   getAllPlansCMS: async () => {
//     try {
//       const response = await api.get('/subscriptions/admin/plans');
//       // Handle different response structures
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       if (response.data && response.data.data) {
//         return response.data.data;
//       }
//       return response.data || [];
//     } catch (error) {
//       console.error('Error fetching plans:', error);
//       return [];
//     }
//   },
  
//   // Get plan by ID
//   getPlanByIdCMS: async (id) => {
//     try {
//       const response = await api.get(`/subscriptions/admin/plans/${id}`);
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching plan:', error);
//       return null;
//     }
//   },
  
//   // Create new plan
//   createPlanCMS: (data) => api.post('/subscriptions/admin/plans', data).then(res => res.data),
  
//   // Update plan
//   updatePlanCMS: (id, data) => api.put(`/subscriptions/admin/plans/${id}`, data).then(res => res.data),
  
//   // Delete plan (soft delete or permanent)
//   deletePlanCMS: (id, permanent = false) => 
//     api.delete(`/subscriptions/admin/plans/${id}`, { params: { permanent } }).then(res => res.data),
  
//   // Toggle plan status (activate/deactivate)
//   togglePlanStatusCMS: (id) => 
//     api.patch(`/subscriptions/admin/plans/${id}/toggle`).then(res => res.data),
  
//   // Reorder plans
//   reorderPlansCMS: (orders) => 
//     api.post('/subscriptions/admin/plans/reorder', { orders }).then(res => res.data),
  
//   // Get subscription statistics for admin dashboard
//   getSubscriptionStatsCMS: async () => {
//     try {
//       const response = await api.get('/subscriptions/admin/stats');
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       if (response.data && response.data.data) {
//         return response.data.data;
//       }
//       return response.data || {};
//     } catch (error) {
//       console.error('Error fetching subscription stats:', error);
//       return {};
//     }
//   },
  
//   // ============================================
//   // SUBSCRIBER MANAGEMENT (Admin only)
//   // ============================================
  
//   // Get all subscribers (with filters)
//   getAllSubscribers: async (params = {}) => {
//     try {
//       const response = await api.get('/subscriptions/admin/subscribers', { params });
//       // Handle different response structures
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       if (response.data && response.data.subscribers) {
//         return response.data;
//       }
//       return response.data || { subscribers: [], pagination: { total: 0 } };
//     } catch (error) {
//       console.error('Error fetching subscribers:', error);
//       return { subscribers: [], pagination: { total: 0 } };
//     }
//   },
  
//   // Get subscriber by ID
//   getSubscriberById: async (id) => {
//     try {
//       const response = await api.get(`/subscriptions/admin/subscribers/${id}`);
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching subscriber:', error);
//       return null;
//     }
//   },
  
//   // ============================================
//   // TRANSACTION MANAGEMENT (Admin only)
//   // ============================================
  
//   // Get all transactions (with filters)
//   getAllTransactions: async (params = {}) => {
//     try {
//       const response = await api.get('/subscriptions/admin/transactions', { params });
//       // Handle different response structures
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       if (response.data && response.data.transactions) {
//         return response.data;
//       }
//       return response.data || { transactions: [], pagination: { total: 0 } };
//     } catch (error) {
//       console.error('Error fetching transactions:', error);
//       return { transactions: [], pagination: { total: 0 } };
//     }
//   },
  
//   // Get transaction by ID
//   getTransactionById: async (id) => {
//     try {
//       const response = await api.get(`/subscriptions/admin/transactions/${id}`);
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching transaction:', error);
//       return null;
//     }
//   },
  
//   // Get transaction statistics
//   getTransactionStats: async () => {
//     try {
//       const response = await api.get('/subscriptions/admin/transactions/stats');
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       if (response.data && response.data.data) {
//         return response.data.data;
//       }
//       return response.data || {};
//     } catch (error) {
//       console.error('Error fetching transaction stats:', error);
//       return {};
//     }
//   },
  
//   // ============================================
//   // TEST ROUTE (Admin only)
//   // ============================================
  
//   testAdminAccess: async () => {
//     try {
//       const response = await api.get('/subscriptions/admin/test');
//       return response.data;
//     } catch (error) {
//       console.error('Admin test failed:', error);
//       return { success: false, error: error.message };
//     }
//   },
  
//   // ============================================
//   // REFRESH SUBSCRIPTION (Clear cache)
//   // ============================================
  
//   refreshSubscription: async () => {
//     try {
//       const response = await api.get('/subscriptions/refresh');
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Error refreshing subscription:', error);
//       return null;
//     }
//   },
  
//   // ============================================
//   // RAZORPAY INTEGRATION
//   // ============================================
  
//   createRazorpayOrder: (data) => api.post('/subscriptions/razorpay/create-order', data).then(res => res.data),
  
//   verifyRazorpayPayment: (data) => api.post('/subscriptions/razorpay/verify', data).then(res => res.data),
  
//   // ============================================
//   // STRIPE INTEGRATION
//   // ============================================
  
//   createStripePaymentIntent: (data) => api.post('/subscriptions/stripe/create-intent', data).then(res => res.data),
  
//   verifyStripePayment: (data) => api.post('/subscriptions/stripe/verify', data).then(res => res.data),
  
//   // ============================================
//   // HEALTH CHECK
//   // ============================================
  
//   healthCheck: () => api.get('/subscriptions/health').then(res => res.data)
// };

// export default subscriptionAPI;

























// // client/src/api/subscriptionAPI.js
// import api from './apiConfig';

// const subscriptionAPI = {
//   // ============================================
//   // PUBLIC ROUTES (No authentication required)
//   // ============================================
  
//   // Get all subscription plans - FIXED: Format features properly
//   getPlans: async () => {
//     try {
//       const response = await api.get('/subscriptions/plans');
//       let plansData = response.data?.data || response.data;
      
//       // Format plans to ensure features are strings
//       if (plansData && typeof plansData === 'object') {
//         Object.keys(plansData).forEach(planId => {
//           if (plansData[planId].features && Array.isArray(plansData[planId].features)) {
//             plansData[planId].features = plansData[planId].features.map(feature => {
//               // If feature is an object, extract the name property
//               if (typeof feature === 'object' && feature !== null) {
//                 return feature.name || feature.feature || JSON.stringify(feature);
//               }
//               return String(feature);
//             });
//           }
//         });
//       }
      
//       return plansData;
//     } catch (error) {
//       console.error('Error fetching plans:', error);
//       throw error;
//     }
//   },
  
//   // Get subscription features
//   getFeatures: () => api.get('/subscriptions/features').then(res => res.data),
  
//   // ============================================
//   // PROTECTED ROUTES (Authentication required)
//   // ============================================
  
//   // Get current user subscription
//   getCurrent: async () => {
//     try {
//       const response = await api.get('/subscriptions/current');
//       // Handle different response structures
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       if (response.data && response.data.data) {
//         return response.data.data;
//       }
//       return response.data || { plan: 'free', status: 'active', features: [] };
//     } catch (error) {
//       console.error('Error fetching current subscription:', error);
//       return { plan: 'free', status: 'active', features: [] };
//     }
//   },
  
//   // Subscribe to a plan
//   subscribe: (plan, billingCycle, paymentMethod, couponCode = null) => 
//     api.post('/subscriptions/subscribe', { plan, billingCycle, paymentMethod, couponCode }).then(res => res.data),
  
//   // Verify payment (legacy)
//   verifyPayment: (data) => api.post('/subscriptions/verify-payment', data).then(res => res.data),
  
//   // Cancel subscription
//   cancelSubscription: () => api.post('/subscriptions/cancel').then(res => res.data),
  
//   // Get billing history
//   getBillingHistory: () => api.get('/subscriptions/billing-history').then(res => res.data),
  
//   // ============================================
//   // INVOICE ROUTES
//   // ============================================
  
//   // Download invoice as PDF
//   downloadInvoice: async (invoiceId) => {
//     try {
//       const response = await api.get(`/subscriptions/invoice/${invoiceId}/download`, {
//         responseType: 'blob'
//       });
      
//       if (!response.data || response.data.size === 0) {
//         throw new Error('Empty file received');
//       }
      
//       const blob = new Blob([response.data], { type: 'application/pdf' });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `invoice_${invoiceId}.pdf`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);
      
//       return { success: true };
//     } catch (error) {
//       console.error('Download invoice error:', error);
//       throw error;
//     }
//   },
  
//   // View invoice in new tab
//   viewInvoice: async (invoiceId) => {
//     try {
//       const response = await api.get(`/subscriptions/invoice/${invoiceId}/download`, {
//         responseType: 'blob'
//       });
      
//       if (!response.data || response.data.size === 0) {
//         throw new Error('Empty file received');
//       }
      
//       const blob = new Blob([response.data], { type: 'application/pdf' });
//       const url = window.URL.createObjectURL(blob);
//       window.open(url, '_blank');
//       setTimeout(() => window.URL.revokeObjectURL(url), 1000);
      
//       return { success: true };
//     } catch (error) {
//       console.error('View invoice error:', error);
//       throw error;
//     }
//   },
  
//   // Send invoice email
//   sendInvoiceEmail: (invoiceId) => 
//     api.post(`/subscriptions/invoice/${invoiceId}/send`).then(res => res.data),
  
//   // Get invoice by ID (JSON data)
//   getInvoice: (invoiceId) => 
//     api.get(`/subscriptions/invoice/${invoiceId}`).then(res => res.data),
  
//   // ============================================
//   // PAYMENT METHODS
//   // ============================================
  
//   getPaymentMethods: () => api.get('/subscriptions/payment-methods').then(res => res.data),
  
//   addPaymentMethod: (data) => api.post('/subscriptions/payment-methods', data).then(res => res.data),
  
//   removePaymentMethod: (methodId) => 
//     api.delete(`/subscriptions/payment-methods/${methodId}`).then(res => res.data),
  
//   setDefaultPaymentMethod: (methodId) => 
//     api.put(`/subscriptions/payment-methods/${methodId}/default`).then(res => res.data),
  
//   // ============================================
//   // COUPON ROUTES
//   // ============================================
  
//   validateCoupon: (code, plan, amount) => 
//     api.get(`/subscriptions/coupon/${code}/validate`, { params: { plan, amount } }).then(res => res.data),
  
//   applyCoupon: (data) => api.post('/subscriptions/coupon/apply', data).then(res => res.data),
  
//   // ============================================
//   // ============== RAZORPAY INTEGRATION ==============
//   // ============================================
  
//   // Create Razorpay order
//   createRazorpayOrder: async (planId, planName, amount, currency = 'INR') => {
//     try {
//       const response = await api.post('/subscriptions/razorpay/create-order', {
//         planId,
//         planName,
//         amount,
//         currency
//       });
      
//       if (response.data && response.data.success) {
//         return response.data;
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Create Razorpay order error:', error);
//       throw error;
//     }
//   },
  
//   // Verify Razorpay payment
//   verifyRazorpayPayment: async (orderId, paymentId, signature, subscriptionId) => {
//     try {
//       const response = await api.post('/subscriptions/razorpay/verify-payment', {
//         orderId,
//         paymentId,
//         signature,
//         subscriptionId
//       });
      
//       return response.data;
//     } catch (error) {
//       console.error('Verify Razorpay payment error:', error);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // ============== STRIPE INTEGRATION ==============
//   // ============================================
  
//   // Create Stripe checkout session
//   createStripeCheckoutSession: async (planId, planName, amount, currency = 'INR') => {
//     try {
//       const response = await api.post('/subscriptions/stripe/create-checkout-session', {
//         planId,
//         planName,
//         amount,
//         currency,
//         successUrl: `${window.location.origin}/dashboard/subscriptions?session_id={CHECKOUT_SESSION_ID}`,
//         cancelUrl: `${window.location.origin}/dashboard/subscriptions?canceled=true`
//       });
      
//       if (response.data && response.data.success) {
//         return response.data;
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Create Stripe checkout session error:', error);
//       throw error;
//     }
//   },
  
//   // Create Stripe payment intent (for direct card payment)
//   createStripePaymentIntent: async (planId, planName, amount, currency = 'INR') => {
//     try {
//       const response = await api.post('/subscriptions/stripe/create-payment-intent', {
//         planId,
//         planName,
//         amount,
//         currency
//       });
      
//       return response.data;
//     } catch (error) {
//       console.error('Create Stripe payment intent error:', error);
//       throw error;
//     }
//   },
  
//   // Verify Stripe payment
//   verifyStripePayment: async (sessionId, paymentIntentId, subscriptionId) => {
//     try {
//       const response = await api.post('/subscriptions/stripe/verify-payment', {
//         sessionId,
//         paymentIntentId,
//         subscriptionId
//       });
      
//       return response.data;
//     } catch (error) {
//       console.error('Verify Stripe payment error:', error);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // ============== ADMIN CMS ROUTES ==============
//   // ============================================
  
//   // Get all plans (including inactive) for admin
//   getAllPlansCMS: async () => {
//     try {
//       const response = await api.get('/subscriptions/admin/plans');
//       // Handle different response structures
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       if (response.data && response.data.data) {
//         return response.data.data;
//       }
//       return response.data || [];
//     } catch (error) {
//       console.error('Error fetching plans:', error);
//       return [];
//     }
//   },
  
//   // Get plan by ID
//   getPlanByIdCMS: async (id) => {
//     try {
//       const response = await api.get(`/subscriptions/admin/plans/${id}`);
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching plan:', error);
//       return null;
//     }
//   },
  
//   // Create new plan
//   createPlanCMS: (data) => api.post('/subscriptions/admin/plans', data).then(res => res.data),
  
//   // Update plan
//   updatePlanCMS: (id, data) => api.put(`/subscriptions/admin/plans/${id}`, data).then(res => res.data),
  
//   // Delete plan (soft delete or permanent)
//   deletePlanCMS: (id, permanent = false) => 
//     api.delete(`/subscriptions/admin/plans/${id}`, { params: { permanent } }).then(res => res.data),
  
//   // Toggle plan status (activate/deactivate)
//   togglePlanStatusCMS: (id) => 
//     api.patch(`/subscriptions/admin/plans/${id}/toggle`).then(res => res.data),
  
//   // Reorder plans
//   reorderPlansCMS: (orders) => 
//     api.post('/subscriptions/admin/plans/reorder', { orders }).then(res => res.data),
  
//   // Get subscription statistics for admin dashboard
//   getSubscriptionStatsCMS: async () => {
//     try {
//       const response = await api.get('/subscriptions/admin/stats');
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       if (response.data && response.data.data) {
//         return response.data.data;
//       }
//       return response.data || {};
//     } catch (error) {
//       console.error('Error fetching subscription stats:', error);
//       return {};
//     }
//   },
  
//   // ============================================
//   // SUBSCRIBER MANAGEMENT (Admin only)
//   // ============================================
  
//   // Get all subscribers (with filters)
//   getAllSubscribers: async (params = {}) => {
//     try {
//       const response = await api.get('/subscriptions/admin/subscribers', { params });
//       // Handle different response structures
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       if (response.data && response.data.subscribers) {
//         return response.data;
//       }
//       return response.data || { subscribers: [], pagination: { total: 0 } };
//     } catch (error) {
//       console.error('Error fetching subscribers:', error);
//       return { subscribers: [], pagination: { total: 0 } };
//     }
//   },
  
//   // Get subscriber by ID
//   getSubscriberById: async (id) => {
//     try {
//       const response = await api.get(`/subscriptions/admin/subscribers/${id}`);
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching subscriber:', error);
//       return null;
//     }
//   },
  
//   // ============================================
//   // TRANSACTION MANAGEMENT (Admin only)
//   // ============================================
  
//   // Get all transactions (with filters)
//   getAllTransactions: async (params = {}) => {
//     try {
//       const response = await api.get('/subscriptions/admin/transactions', { params });
//       // Handle different response structures
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       if (response.data && response.data.transactions) {
//         return response.data;
//       }
//       return response.data || { transactions: [], pagination: { total: 0 } };
//     } catch (error) {
//       console.error('Error fetching transactions:', error);
//       return { transactions: [], pagination: { total: 0 } };
//     }
//   },
  
//   // Get transaction by ID
//   getTransactionById: async (id) => {
//     try {
//       const response = await api.get(`/subscriptions/admin/transactions/${id}`);
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching transaction:', error);
//       return null;
//     }
//   },
  
//   // Get transaction statistics
//   getTransactionStats: async () => {
//     try {
//       const response = await api.get('/subscriptions/admin/transactions/stats');
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       if (response.data && response.data.data) {
//         return response.data.data;
//       }
//       return response.data || {};
//     } catch (error) {
//       console.error('Error fetching transaction stats:', error);
//       return {};
//     }
//   },
  
//   // ============================================
//   // TEST ROUTE (Admin only)
//   // ============================================
  
//   testAdminAccess: async () => {
//     try {
//       const response = await api.get('/subscriptions/admin/test');
//       return response.data;
//     } catch (error) {
//       console.error('Admin test failed:', error);
//       return { success: false, error: error.message };
//     }
//   },
  
//   // ============================================
//   // REFRESH SUBSCRIPTION (Clear cache)
//   // ============================================
  
//   refreshSubscription: async () => {
//     try {
//       const response = await api.get('/subscriptions/refresh');
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Error refreshing subscription:', error);
//       return null;
//     }
//   },
  
//   // ============================================
//   // HEALTH CHECK
//   // ============================================
  
//   healthCheck: () => api.get('/subscriptions/health').then(res => res.data)
// };

// export default subscriptionAPI;
















// // client/src/api/subscriptionAPI.js
// import api from './apiConfig';

// const subscriptionAPI = {
//   // ============================================
//   // PUBLIC ROUTES (No authentication required)
//   // ============================================
  
//   // Get all subscription plans - FIXED: Format features properly
//   getPlans: async () => {
//     try {
//       const response = await api.get('/subscriptions/plans');
//       let plansData = response.data?.data || response.data;
      
//       // Format plans to ensure features are strings
//       if (plansData && typeof plansData === 'object') {
//         Object.keys(plansData).forEach(planId => {
//           if (plansData[planId].features && Array.isArray(plansData[planId].features)) {
//             plansData[planId].features = plansData[planId].features.map(feature => {
//               // If feature is an object, extract the name property
//               if (typeof feature === 'object' && feature !== null) {
//                 return feature.name || feature.feature || JSON.stringify(feature);
//               }
//               return String(feature);
//             });
//           }
//         });
//       }
      
//       return plansData;
//     } catch (error) {
//       console.error('Error fetching plans:', error);
//       throw error;
//     }
//   },
  
//   // Get subscription features
//   getFeatures: () => api.get('/subscriptions/features').then(res => res.data),
  
//   // ============================================
//   // PROTECTED ROUTES (Authentication required)
//   // ============================================
  
//   // Get current user subscription
//   getCurrent: async () => {
//     try {
//       const response = await api.get('/subscriptions/current');
//       // Handle different response structures
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       if (response.data && response.data.data) {
//         return response.data.data;
//       }
//       return response.data || { plan: 'free', status: 'active', features: [] };
//     } catch (error) {
//       console.error('Error fetching current subscription:', error);
//       return { plan: 'free', status: 'active', features: [] };
//     }
//   },
  
//   // Subscribe to a plan
//   subscribe: (plan, billingCycle, paymentMethod, couponCode = null) => 
//     api.post('/subscriptions/subscribe', { plan, billingCycle, paymentMethod, couponCode }).then(res => res.data),
  
//   // Verify payment (legacy)
//   verifyPayment: (data) => api.post('/subscriptions/verify-payment', data).then(res => res.data),
  
//   // Cancel subscription
//   cancelSubscription: () => api.post('/subscriptions/cancel').then(res => res.data),
  
//   // Get billing history
//   getBillingHistory: () => api.get('/subscriptions/billing-history').then(res => res.data),
  
//   // ============================================
//   // INVOICE ROUTES
//   // ============================================
  
//   // Download invoice as PDF
//   downloadInvoice: async (invoiceId) => {
//     try {
//       const response = await api.get(`/subscriptions/invoice/${invoiceId}/download`, {
//         responseType: 'blob'
//       });
      
//       if (!response.data || response.data.size === 0) {
//         throw new Error('Empty file received');
//       }
      
//       const blob = new Blob([response.data], { type: 'application/pdf' });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `invoice_${invoiceId}.pdf`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);
      
//       return { success: true };
//     } catch (error) {
//       console.error('Download invoice error:', error);
//       throw error;
//     }
//   },
  
//   // View invoice in new tab
//   viewInvoice: async (invoiceId) => {
//     try {
//       const response = await api.get(`/subscriptions/invoice/${invoiceId}/download`, {
//         responseType: 'blob'
//       });
      
//       if (!response.data || response.data.size === 0) {
//         throw new Error('Empty file received');
//       }
      
//       const blob = new Blob([response.data], { type: 'application/pdf' });
//       const url = window.URL.createObjectURL(blob);
//       window.open(url, '_blank');
//       setTimeout(() => window.URL.revokeObjectURL(url), 1000);
      
//       return { success: true };
//     } catch (error) {
//       console.error('View invoice error:', error);
//       throw error;
//     }
//   },
  
//   // Send invoice email
//   sendInvoiceEmail: (invoiceId) => 
//     api.post(`/subscriptions/invoice/${invoiceId}/send`).then(res => res.data),
  
//   // Get invoice by ID (JSON data)
//   getInvoice: (invoiceId) => 
//     api.get(`/subscriptions/invoice/${invoiceId}`).then(res => res.data),
  
//   // ============================================
//   // PAYMENT METHODS
//   // ============================================
  
//   getPaymentMethods: () => api.get('/subscriptions/payment-methods').then(res => res.data),
  
//   addPaymentMethod: (data) => api.post('/subscriptions/payment-methods', data).then(res => res.data),
  
//   removePaymentMethod: (methodId) => 
//     api.delete(`/subscriptions/payment-methods/${methodId}`).then(res => res.data),
  
//   setDefaultPaymentMethod: (methodId) => 
//     api.put(`/subscriptions/payment-methods/${methodId}/default`).then(res => res.data),
  
//   // ============================================
//   // COUPON ROUTES
//   // ============================================
  
//   validateCoupon: (code, plan, amount) => 
//     api.get(`/subscriptions/coupon/${code}/validate`, { params: { plan, amount } }).then(res => res.data),
  
//   applyCoupon: (data) => api.post('/subscriptions/coupon/apply', data).then(res => res.data),
  
//   // ============================================
//   // ============== RAZORPAY INTEGRATION ==============
//   // ============================================
  
//   // Create Razorpay order
//   createRazorpayOrder: async (planId, planName, amount, currency = 'INR') => {
//     try {
//       const response = await api.post('/subscriptions/razorpay/create-order', {
//         planId,
//         planName,
//         amount,
//         currency
//       });
      
//       if (response.data && response.data.success) {
//         return response.data;
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Create Razorpay order error:', error);
//       throw error;
//     }
//   },
  
//   // ✅ FIXED: Verify Razorpay payment with all required fields
//   verifyRazorpayPayment: async (paymentData) => {
//     try {
//       // Support both object parameter and individual parameters
//       let orderId, paymentId, signature, planId, subscriptionId;
      
//       if (typeof paymentData === 'object') {
//         // Handle object parameter
//         orderId = paymentData.orderId;
//         paymentId = paymentData.paymentId;
//         signature = paymentData.signature;
//         planId = paymentData.planId;
//         subscriptionId = paymentData.subscriptionId;
//       } else {
//         // Handle individual parameters (backward compatibility)
//         orderId = arguments[0];
//         paymentId = arguments[1];
//         signature = arguments[2];
//         planId = arguments[3];
//         subscriptionId = arguments[4];
//       }
      
//       // Validate required fields
//       if (!orderId || !paymentId || !signature) {
//         console.error('Missing required fields for Razorpay verification:', { 
//           hasOrderId: !!orderId, 
//           hasPaymentId: !!paymentId, 
//           hasSignature: !!signature 
//         });
//         throw new Error('Missing payment verification details');
//       }
      
//       const response = await api.post('/subscriptions/razorpay/verify-payment', {
//         orderId,
//         paymentId,
//         signature,
//         planId: planId || null,
//         subscriptionId: subscriptionId || null
//       });
      
//       return response.data;
//     } catch (error) {
//       console.error('Verify Razorpay payment error:', error);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // ============== STRIPE INTEGRATION ==============
//   // ============================================
  
//   // Create Stripe checkout session
//   createStripeCheckoutSession: async (planId, planName, amount, currency = 'INR') => {
//     try {
//       const response = await api.post('/subscriptions/stripe/create-checkout-session', {
//         planId,
//         planName,
//         amount,
//         currency,
//         successUrl: `${window.location.origin}/dashboard/subscriptions?session_id={CHECKOUT_SESSION_ID}`,
//         cancelUrl: `${window.location.origin}/dashboard/subscriptions?canceled=true`
//       });
      
//       if (response.data && response.data.success) {
//         return response.data;
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Create Stripe checkout session error:', error);
//       throw error;
//     }
//   },
  
//   // Create Stripe payment intent (for direct card payment)
//   createStripePaymentIntent: async (planId, planName, amount, currency = 'INR') => {
//     try {
//       const response = await api.post('/subscriptions/stripe/create-payment-intent', {
//         planId,
//         planName,
//         amount,
//         currency
//       });
      
//       return response.data;
//     } catch (error) {
//       console.error('Create Stripe payment intent error:', error);
//       throw error;
//     }
//   },
  
//   // Verify Stripe payment
//   verifyStripePayment: async (paymentData) => {
//     try {
//       let sessionId, paymentIntentId, subscriptionId;
      
//       if (typeof paymentData === 'object') {
//         sessionId = paymentData.sessionId;
//         paymentIntentId = paymentData.paymentIntentId;
//         subscriptionId = paymentData.subscriptionId;
//       } else {
//         sessionId = arguments[0];
//         paymentIntentId = arguments[1];
//         subscriptionId = arguments[2];
//       }
      
//       const response = await api.post('/subscriptions/stripe/verify-payment', {
//         sessionId,
//         paymentIntentId,
//         subscriptionId
//       });
      
//       return response.data;
//     } catch (error) {
//       console.error('Verify Stripe payment error:', error);
//       throw error;
//     }
//   },
  
//   // ============================================
//   // ============== ADMIN CMS ROUTES ==============
//   // ============================================
  
//   // Get all plans (including inactive) for admin
//   getAllPlansCMS: async () => {
//     try {
//       const response = await api.get('/subscriptions/admin/plans');
//       // Handle different response structures
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       if (response.data && response.data.data) {
//         return response.data.data;
//       }
//       return response.data || [];
//     } catch (error) {
//       console.error('Error fetching plans:', error);
//       return [];
//     }
//   },
  
//   // Get plan by ID
//   getPlanByIdCMS: async (id) => {
//     try {
//       const response = await api.get(`/subscriptions/admin/plans/${id}`);
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching plan:', error);
//       return null;
//     }
//   },
  
//   // Create new plan
//   createPlanCMS: (data) => api.post('/subscriptions/admin/plans', data).then(res => res.data),
  
//   // Update plan
//   updatePlanCMS: (id, data) => api.put(`/subscriptions/admin/plans/${id}`, data).then(res => res.data),
  
//   // Delete plan (soft delete or permanent)
//   deletePlanCMS: (id, permanent = false) => 
//     api.delete(`/subscriptions/admin/plans/${id}`, { params: { permanent } }).then(res => res.data),
  
//   // Toggle plan status (activate/deactivate)
//   togglePlanStatusCMS: (id) => 
//     api.patch(`/subscriptions/admin/plans/${id}/toggle`).then(res => res.data),
  
//   // Reorder plans
//   reorderPlansCMS: (orders) => 
//     api.post('/subscriptions/admin/plans/reorder', { orders }).then(res => res.data),
  
//   // Get subscription statistics for admin dashboard
//   getSubscriptionStatsCMS: async () => {
//     try {
//       const response = await api.get('/subscriptions/admin/stats');
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       if (response.data && response.data.data) {
//         return response.data.data;
//       }
//       return response.data || {};
//     } catch (error) {
//       console.error('Error fetching subscription stats:', error);
//       return {};
//     }
//   },
  
//   // ============================================
//   // SUBSCRIBER MANAGEMENT (Admin only)
//   // ============================================
  
//   // Get all subscribers (with filters)
//   getAllSubscribers: async (params = {}) => {
//     try {
//       const response = await api.get('/subscriptions/admin/subscribers', { params });
//       // Handle different response structures
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       if (response.data && response.data.subscribers) {
//         return response.data;
//       }
//       return response.data || { subscribers: [], pagination: { total: 0 } };
//     } catch (error) {
//       console.error('Error fetching subscribers:', error);
//       return { subscribers: [], pagination: { total: 0 } };
//     }
//   },
  
//   // Get subscriber by ID
//   getSubscriberById: async (id) => {
//     try {
//       const response = await api.get(`/subscriptions/admin/subscribers/${id}`);
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching subscriber:', error);
//       return null;
//     }
//   },
  
//   // ============================================
//   // TRANSACTION MANAGEMENT (Admin only)
//   // ============================================
  
//   // Get all transactions (with filters)
//   getAllTransactions: async (params = {}) => {
//     try {
//       const response = await api.get('/subscriptions/admin/transactions', { params });
//       // Handle different response structures
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       if (response.data && response.data.transactions) {
//         return response.data;
//       }
//       return response.data || { transactions: [], pagination: { total: 0 } };
//     } catch (error) {
//       console.error('Error fetching transactions:', error);
//       return { transactions: [], pagination: { total: 0 } };
//     }
//   },
  
//   // Get transaction by ID
//   getTransactionById: async (id) => {
//     try {
//       const response = await api.get(`/subscriptions/admin/transactions/${id}`);
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching transaction:', error);
//       return null;
//     }
//   },
  
//   // Get transaction statistics
//   getTransactionStats: async () => {
//     try {
//       const response = await api.get('/subscriptions/admin/transactions/stats');
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       if (response.data && response.data.data) {
//         return response.data.data;
//       }
//       return response.data || {};
//     } catch (error) {
//       console.error('Error fetching transaction stats:', error);
//       return {};
//     }
//   },
  
//   // ============================================
//   // TEST ROUTE (Admin only)
//   // ============================================
  
//   testAdminAccess: async () => {
//     try {
//       const response = await api.get('/subscriptions/admin/test');
//       return response.data;
//     } catch (error) {
//       console.error('Admin test failed:', error);
//       return { success: false, error: error.message };
//     }
//   },
  
//   // ============================================
//   // REFRESH SUBSCRIPTION (Clear cache)
//   // ============================================
  
//   refreshSubscription: async () => {
//     try {
//       const response = await api.get('/subscriptions/refresh');
//       if (response.data && response.data.success) {
//         return response.data.data;
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Error refreshing subscription:', error);
//       return null;
//     }
//   },
  
//   // ============================================
//   // HEALTH CHECK
//   // ============================================
  
//   healthCheck: () => api.get('/subscriptions/health').then(res => res.data)
// };

// export default subscriptionAPI;























// client/src/api/subscriptionAPI.js
import api from './apiConfig';

const subscriptionAPI = {
  // ============================================
  // PUBLIC ROUTES (No authentication required)
  // ============================================
  
  // Get all subscription plans - FIXED: Format features properly
  getPlans: async () => {
    try {
      const response = await api.get('/subscriptions/plans');
      let plansData = response.data?.data || response.data;
      
      // Format plans to ensure features are strings
      if (plansData && typeof plansData === 'object') {
        Object.keys(plansData).forEach(planId => {
          if (plansData[planId].features && Array.isArray(plansData[planId].features)) {
            plansData[planId].features = plansData[planId].features.map(feature => {
              // If feature is an object, extract the name property
              if (typeof feature === 'object' && feature !== null) {
                return feature.name || feature.feature || JSON.stringify(feature);
              }
              return String(feature);
            });
          }
        });
      }
      
      return plansData;
    } catch (error) {
      console.error('Error fetching plans:', error);
      throw error;
    }
  },
  
  // Get subscription features
  getFeatures: () => api.get('/subscriptions/features').then(res => res.data),
  
  // ============================================
  // PROTECTED ROUTES (Authentication required)
  // ============================================
  
  // Get current user subscription
  getCurrent: async () => {
    try {
      const response = await api.get('/subscriptions/current');
      // Handle different response structures
      if (response.data && response.data.success) {
        return response.data.data;
      }
      if (response.data && response.data.data) {
        return response.data.data;
      }
      return response.data || { plan: 'free', status: 'active', features: [] };
    } catch (error) {
      console.error('Error fetching current subscription:', error);
      return { plan: 'free', status: 'active', features: [] };
    }
  },
  
  // Subscribe to a plan
  subscribe: (plan, billingCycle, paymentMethod, couponCode = null) => 
    api.post('/subscriptions/subscribe', { plan, billingCycle, paymentMethod, couponCode }).then(res => res.data),
  
  // Verify payment (legacy)
  verifyPayment: (data) => api.post('/subscriptions/verify-payment', data).then(res => res.data),
  
  // Cancel subscription
  cancelSubscription: () => api.post('/subscriptions/cancel').then(res => res.data),
  
  // Get billing history
  getBillingHistory: () => api.get('/subscriptions/billing-history').then(res => res.data),
  
  // ============================================
  // INVOICE ROUTES - FIXED PDF DOWNLOAD
  // ============================================
  
  // Download invoice as PDF - FIXED with proper blob handling
  downloadInvoice: async (invoiceId) => {
    try {
      console.log('📥 Downloading invoice:', invoiceId);
      
      const response = await api.get(`/subscriptions/invoice/${invoiceId}/download`, {
        responseType: 'blob',
        timeout: 30000
      });
      
      // Check if response has data
      if (!response.data || response.data.size === 0) {
        throw new Error('Empty file received');
      }
      
      // Create blob with proper PDF type
      const blob = new Blob([response.data], { type: 'application/pdf' });
      
      // Validate PDF signature (first 4 bytes should be %PDF)
      const arrayBuffer = await blob.slice(0, 4).arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const isPDF = uint8Array[0] === 37 && uint8Array[1] === 80 && uint8Array[2] === 68 && uint8Array[3] === 70;
      
      if (!isPDF) {
        console.error('Generated file is not a valid PDF. First bytes:', uint8Array);
        throw new Error('Invalid PDF file generated. Please contact support.');
      }
      
      // Create download URL
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice_${invoiceId}.pdf`);
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
      
      return { success: true };
    } catch (error) {
      console.error('Download invoice error:', error);
      throw error;
    }
  },
  
  // View invoice in new tab - FIXED
  viewInvoice: async (invoiceId) => {
    try {
      console.log('👁️ Viewing invoice:', invoiceId);
      
      const response = await api.get(`/subscriptions/invoice/${invoiceId}/download`, {
        responseType: 'blob',
        timeout: 30000
      });
      
      if (!response.data || response.data.size === 0) {
        throw new Error('Empty file received');
      }
      
      // Validate PDF signature
      const arrayBuffer = await response.data.slice(0, 4).arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const isPDF = uint8Array[0] === 37 && uint8Array[1] === 80 && uint8Array[2] === 68 && uint8Array[3] === 70;
      
      if (!isPDF) {
        throw new Error('Invalid PDF file generated');
      }
      
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      
      // Clean up after a delay
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 5000);
      
      return { success: true };
    } catch (error) {
      console.error('View invoice error:', error);
      throw error;
    }
  },
  
  // Send invoice email
  sendInvoiceEmail: (invoiceId) => 
    api.post(`/subscriptions/invoice/${invoiceId}/send`).then(res => res.data),
  
  // Get invoice by ID (JSON data)
  getInvoice: (invoiceId) => 
    api.get(`/subscriptions/invoice/${invoiceId}`).then(res => res.data),
  
  // ============================================
  // PAYMENT METHODS
  // ============================================
  
  getPaymentMethods: () => api.get('/subscriptions/payment-methods').then(res => res.data),
  
  addPaymentMethod: (data) => api.post('/subscriptions/payment-methods', data).then(res => res.data),
  
  removePaymentMethod: (methodId) => 
    api.delete(`/subscriptions/payment-methods/${methodId}`).then(res => res.data),
  
  setDefaultPaymentMethod: (methodId) => 
    api.put(`/subscriptions/payment-methods/${methodId}/default`).then(res => res.data),
  
  // ============================================
  // COUPON ROUTES
  // ============================================
  
  validateCoupon: (code, plan, amount) => 
    api.get(`/subscriptions/coupon/${code}/validate`, { params: { plan, amount } }).then(res => res.data),
  
  applyCoupon: (data) => api.post('/subscriptions/coupon/apply', data).then(res => res.data),
  
  // ============================================
  // ============== RAZORPAY INTEGRATION ==============
  // ============================================
  
  // Create Razorpay order
  createRazorpayOrder: async (planId, planName, amount, currency = 'INR') => {
    try {
      const response = await api.post('/subscriptions/razorpay/create-order', {
        planId,
        planName,
        amount,
        currency
      });
      
      if (response.data && response.data.success) {
        return response.data;
      }
      return response.data;
    } catch (error) {
      console.error('Create Razorpay order error:', error);
      throw error;
    }
  },
  
  // ✅ FIXED: Verify Razorpay payment with all required fields
  verifyRazorpayPayment: async (paymentData) => {
    try {
      // Support both object parameter and individual parameters
      let orderId, paymentId, signature, planId, subscriptionId;
      
      if (typeof paymentData === 'object') {
        // Handle object parameter
        orderId = paymentData.orderId;
        paymentId = paymentData.paymentId;
        signature = paymentData.signature;
        planId = paymentData.planId;
        subscriptionId = paymentData.subscriptionId;
      } else {
        // Handle individual parameters (backward compatibility)
        orderId = arguments[0];
        paymentId = arguments[1];
        signature = arguments[2];
        planId = arguments[3];
        subscriptionId = arguments[4];
      }
      
      // Validate required fields
      if (!orderId || !paymentId || !signature) {
        console.error('Missing required fields for Razorpay verification:', { 
          hasOrderId: !!orderId, 
          hasPaymentId: !!paymentId, 
          hasSignature: !!signature 
        });
        throw new Error('Missing payment verification details');
      }
      
      const response = await api.post('/subscriptions/razorpay/verify-payment', {
        orderId,
        paymentId,
        signature,
        planId: planId || null,
        subscriptionId: subscriptionId || null
      });
      
      return response.data;
    } catch (error) {
      console.error('Verify Razorpay payment error:', error);
      throw error;
    }
  },
  
  // ============================================
  // ============== STRIPE INTEGRATION ==============
  // ============================================
  
  // Create Stripe checkout session
  createStripeCheckoutSession: async (planId, planName, amount, currency = 'INR') => {
    try {
      const response = await api.post('/subscriptions/stripe/create-checkout-session', {
        planId,
        planName,
        amount,
        currency,
        successUrl: `${window.location.origin}/dashboard/subscriptions?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/dashboard/subscriptions?canceled=true`
      });
      
      if (response.data && response.data.success) {
        return response.data;
      }
      return response.data;
    } catch (error) {
      console.error('Create Stripe checkout session error:', error);
      throw error;
    }
  },
  
  // Create Stripe payment intent (for direct card payment)
  createStripePaymentIntent: async (planId, planName, amount, currency = 'INR') => {
    try {
      const response = await api.post('/subscriptions/stripe/create-payment-intent', {
        planId,
        planName,
        amount,
        currency
      });
      
      return response.data;
    } catch (error) {
      console.error('Create Stripe payment intent error:', error);
      throw error;
    }
  },
  
  // Verify Stripe payment
  verifyStripePayment: async (paymentData) => {
    try {
      let sessionId, paymentIntentId, subscriptionId;
      
      if (typeof paymentData === 'object') {
        sessionId = paymentData.sessionId;
        paymentIntentId = paymentData.paymentIntentId;
        subscriptionId = paymentData.subscriptionId;
      } else {
        sessionId = arguments[0];
        paymentIntentId = arguments[1];
        subscriptionId = arguments[2];
      }
      
      const response = await api.post('/subscriptions/stripe/verify-payment', {
        sessionId,
        paymentIntentId,
        subscriptionId
      });
      
      return response.data;
    } catch (error) {
      console.error('Verify Stripe payment error:', error);
      throw error;
    }
  },
  
  // ============================================
  // ============== ADMIN CMS ROUTES ==============
  // ============================================
  
  // Get all plans (including inactive) for admin
  getAllPlansCMS: async () => {
    try {
      const response = await api.get('/subscriptions/admin/plans');
      // Handle different response structures
      if (response.data && response.data.success) {
        return response.data.data;
      }
      if (response.data && response.data.data) {
        return response.data.data;
      }
      return response.data || [];
    } catch (error) {
      console.error('Error fetching plans:', error);
      return [];
    }
  },
  
  // Get plan by ID
  getPlanByIdCMS: async (id) => {
    try {
      const response = await api.get(`/subscriptions/admin/plans/${id}`);
      if (response.data && response.data.success) {
        return response.data.data;
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching plan:', error);
      return null;
    }
  },
  
  // Create new plan
  createPlanCMS: (data) => api.post('/subscriptions/admin/plans', data).then(res => res.data),
  
  // Update plan
  updatePlanCMS: (id, data) => api.put(`/subscriptions/admin/plans/${id}`, data).then(res => res.data),
  
  // Delete plan (soft delete or permanent)
  deletePlanCMS: (id, permanent = false) => 
    api.delete(`/subscriptions/admin/plans/${id}`, { params: { permanent } }).then(res => res.data),
  
  // Toggle plan status (activate/deactivate)
  togglePlanStatusCMS: (id) => 
    api.patch(`/subscriptions/admin/plans/${id}/toggle`).then(res => res.data),
  
  // Reorder plans
  reorderPlansCMS: (orders) => 
    api.post('/subscriptions/admin/plans/reorder', { orders }).then(res => res.data),
  
  // Get subscription statistics for admin dashboard
  getSubscriptionStatsCMS: async () => {
    try {
      const response = await api.get('/subscriptions/admin/stats');
      if (response.data && response.data.success) {
        return response.data.data;
      }
      if (response.data && response.data.data) {
        return response.data.data;
      }
      return response.data || {};
    } catch (error) {
      console.error('Error fetching subscription stats:', error);
      return {};
    }
  },
  
  // ============================================
  // SUBSCRIBER MANAGEMENT (Admin only)
  // ============================================
  
  // Get all subscribers (with filters)
  getAllSubscribers: async (params = {}) => {
    try {
      const response = await api.get('/subscriptions/admin/subscribers', { params });
      // Handle different response structures
      if (response.data && response.data.success) {
        return response.data.data;
      }
      if (response.data && response.data.subscribers) {
        return response.data;
      }
      return response.data || { subscribers: [], pagination: { total: 0 } };
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      return { subscribers: [], pagination: { total: 0 } };
    }
  },
  
  // Get subscriber by ID
  getSubscriberById: async (id) => {
    try {
      const response = await api.get(`/subscriptions/admin/subscribers/${id}`);
      if (response.data && response.data.success) {
        return response.data.data;
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching subscriber:', error);
      return null;
    }
  },
  
  // ============================================
  // TRANSACTION MANAGEMENT (Admin only)
  // ============================================
  
  // Get all transactions (with filters)
  getAllTransactions: async (params = {}) => {
    try {
      const response = await api.get('/subscriptions/admin/transactions', { params });
      // Handle different response structures
      if (response.data && response.data.success) {
        return response.data.data;
      }
      if (response.data && response.data.transactions) {
        return response.data;
      }
      return response.data || { transactions: [], pagination: { total: 0 } };
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return { transactions: [], pagination: { total: 0 } };
    }
  },
  
  // Get transaction by ID
  getTransactionById: async (id) => {
    try {
      const response = await api.get(`/subscriptions/admin/transactions/${id}`);
      if (response.data && response.data.success) {
        return response.data.data;
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching transaction:', error);
      return null;
    }
  },
  
  // Get transaction statistics
  getTransactionStats: async () => {
    try {
      const response = await api.get('/subscriptions/admin/transactions/stats');
      if (response.data && response.data.success) {
        return response.data.data;
      }
      if (response.data && response.data.data) {
        return response.data.data;
      }
      return response.data || {};
    } catch (error) {
      console.error('Error fetching transaction stats:', error);
      return {};
    }
  },
  
  // ============================================
  // TEST ROUTE (Admin only)
  // ============================================
  
  testAdminAccess: async () => {
    try {
      const response = await api.get('/subscriptions/admin/test');
      return response.data;
    } catch (error) {
      console.error('Admin test failed:', error);
      return { success: false, error: error.message };
    }
  },
  
  // ============================================
  // REFRESH SUBSCRIPTION (Clear cache)
  // ============================================
  
  refreshSubscription: async () => {
    try {
      const response = await api.get('/subscriptions/refresh');
      if (response.data && response.data.success) {
        return response.data.data;
      }
      return response.data;
    } catch (error) {
      console.error('Error refreshing subscription:', error);
      return null;
    }
  },
  
  // ============================================
  // HEALTH CHECK
  // ============================================
  
  healthCheck: () => api.get('/subscriptions/health').then(res => res.data)
};

export default subscriptionAPI;