
// //client/src/services/api.js
// import axios from 'axios'

// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })

// // Request interceptor
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token')
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => Promise.reject(error)
// )

// // Response interceptor
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('token')
//       window.location.href = '/login'
//     }
//     return Promise.reject(error)
//   }
// )

// export default api






















// // client/src/services/api.js
// // LAST UPDATED: 2026-06-06
// // PURPOSE: Axios instance with token refresh interceptor

// import axios from 'axios'

// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// // ============================================
// // CREATE AXIOS INSTANCE
// // ============================================

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true, // ✅ IMPORTANT: Send cookies with requests
// })

// // ============================================
// // REQUEST INTERCEPTOR (Add token to headers)
// // ============================================

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token')
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => Promise.reject(error)
// )

// // ============================================
// // RESPONSE INTERCEPTOR (Handle token refresh)
// // ============================================

// let isRefreshing = false
// let failedQueue = []

// const processQueue = (error, token = null) => {
//   failedQueue.forEach(promise => {
//     if (error) {
//       promise.reject(error)
//     } else {
//       promise.resolve(token)
//     }
//   })
//   failedQueue = []
// }

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config
    
//     // ✅ Check if error is 401 and not already retrying
//     if (error.response?.status === 401 && !originalRequest._retry) {
      
//       // ✅ Special case: Don't retry refresh token endpoint
//       if (originalRequest.url?.includes('/auth/refresh-token')) {
//         localStorage.removeItem('token')
//         localStorage.removeItem('user')
//         window.location.href = '/login'
//         return Promise.reject(error)
//       }
      
//       if (isRefreshing) {
//         // ✅ Queue the request while token is being refreshed
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject })
//         })
//           .then(token => {
//             originalRequest.headers.Authorization = `Bearer ${token}`
//             return api(originalRequest)
//           })
//           .catch(err => Promise.reject(err))
//       }
      
//       originalRequest._retry = true
//       isRefreshing = true
      
//       try {
//         // ✅ Try to refresh the token
//         const refreshToken = localStorage.getItem('refreshToken')
        
//         if (!refreshToken) {
//           throw new Error('No refresh token available')
//         }
        
//         const response = await axios.post(
//           `${API_BASE_URL}/auth/refresh-token`,
//           { refreshToken },
//           { withCredentials: true }
//         )
        
//         const { token: newToken } = response.data.data || response.data
        
//         if (newToken) {
//           // ✅ Store new token
//           localStorage.setItem('token', newToken)
          
//           // ✅ Update Authorization header
//           originalRequest.headers.Authorization = `Bearer ${newToken}`
          
//           // ✅ Process queued requests
//           processQueue(null, newToken)
          
//           // ✅ Retry original request
//           return api(originalRequest)
//         } else {
//           throw new Error('No token in refresh response')
//         }
        
//       } catch (refreshError) {
//         // ✅ Refresh failed - logout user
//         processQueue(refreshError, null)
//         localStorage.removeItem('token')
//         localStorage.removeItem('user')
//         localStorage.removeItem('refreshToken')
//         window.location.href = '/login'
//         return Promise.reject(refreshError)
//       } finally {
//         isRefreshing = false
//       }
//     }
    
//     return Promise.reject(error)
//   }
// )

// export default api





















// client/src/services/api.js
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // Important for cookies
})

// Request interceptor - add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - handle token refresh
let refreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach(promise => {
    if (error) promise.reject(error)
    else promise.resolve(token)
  })
  failedQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    
    // If 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      // Don't retry refresh token endpoint
      if (originalRequest.url?.includes('/refresh-token')) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
        return Promise.reject(error)
      }
      
      if (refreshing) {
        // Queue request while refreshing
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return api(originalRequest)
        }).catch(err => Promise.reject(err))
      }
      
      originalRequest._retry = true
      refreshing = true
      
      try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) throw new Error('No refresh token')
        
        const response = await axios.post(
          `${API_BASE_URL}/auth/refresh-token`,
          { refreshToken },
          { withCredentials: true }
        )
        
        const newToken = response.data.data?.token || response.data.token
        if (newToken) {
          localStorage.setItem('token', newToken)
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          processQueue(null, newToken)
          return api(originalRequest)
        }
        throw new Error('No token in response')
        
      } catch (refreshError) {
        processQueue(refreshError, null)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      } finally {
        refreshing = false
      }
    }
    
    return Promise.reject(error)
  }
)

export default api