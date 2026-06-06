// // client/src/components/AuthProvider.jsx
// // LAST UPDATED: 2026-06-06
// // PURPOSE: Restore authentication session on page refresh

// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { setUser, setLoading, logout, setToken } from '../store/slices/authSlice'
// import authAPI from '../services/authService'

// export const AuthProvider = ({ children }) => {
//   const dispatch = useDispatch()
//   const { token, isAuthenticated, refreshToken } = useSelector((state) => state.auth)

//   // ============================================
//   // RESTORE SESSION ON PAGE REFRESH
//   // ============================================
  
//   useEffect(() => {
//     const restoreSession = async () => {
//       const storedToken = localStorage.getItem('token')
//       const storedUser = localStorage.getItem('user')
      
//       // ✅ Case 1: No token at all - not logged in
//       if (!storedToken) {
//         console.log('🔓 No token found, user not authenticated')
//         dispatch(setLoading(false))
//         return
//       }
      
//       // ✅ Case 2: Have token but no user in Redux (page refresh scenario)
//       if (storedToken && !isAuthenticated) {
//         console.log('🔄 Attempting to restore session from token...')
        
//         try {
//           // ✅ Try to verify existing token
//           const response = await authAPI.verifyToken()
          
//           if (response.success && response.data?.valid) {
//             // ✅ Token is valid - restore user session
//             const userData = response.data.user || response.data
//             dispatch(setUser({
//               user: userData,
//               token: storedToken,
//               refreshToken: localStorage.getItem('refreshToken')
//             }))
//             console.log('✅ Session restored successfully for:', userData.email)
//           } else {
//             // ✅ Token invalid - try to refresh
//             console.log('⚠️ Token invalid, attempting refresh...')
//             const storedRefreshToken = localStorage.getItem('refreshToken')
            
//             if (storedRefreshToken) {
//               const refreshResponse = await authAPI.refreshToken(storedRefreshToken)
              
//               if (refreshResponse.success && refreshResponse.data?.token) {
//                 const newToken = refreshResponse.data.token
//                 localStorage.setItem('token', newToken)
//                 dispatch(setToken(newToken))
                
//                 // ✅ Get fresh user data with new token
//                 const profileResponse = await authAPI.getProfile()
//                 if (profileResponse.success && profileResponse.data?.user) {
//                   dispatch(setUser({
//                     user: profileResponse.data.user,
//                     token: newToken,
//                     refreshToken: storedRefreshToken
//                   }))
//                   console.log('✅ Token refreshed and session restored')
//                 }
//               } else {
//                 throw new Error('Refresh failed')
//               }
//             } else {
//               throw new Error('No refresh token available')
//             }
//           }
//         } catch (error) {
//           console.error('❌ Session restoration failed:', error.message)
//           // ✅ Clear invalid data and redirect to login
//           localStorage.removeItem('token')
//           localStorage.removeItem('user')
//           localStorage.removeItem('refreshToken')
//           dispatch(logout())
          
//           // ✅ Redirect to login if not already there
//           if (!window.location.pathname.includes('/login')) {
//             window.location.href = '/login'
//           }
//         } finally {
//           dispatch(setLoading(false))
//         }
//       } else {
//         dispatch(setLoading(false))
//       }
//     }
    
//     restoreSession()
//   }, [dispatch, isAuthenticated])

//   return children
// }


















// client/src/components/AuthProvider.jsx
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, setToken, logout, setLoading } from '../store/slices/authSlice'
import api from '../services/api'

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()
  const { isAuthenticated, token, refreshToken } = useSelector((state) => state.auth)

  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = localStorage.getItem('token')
      const storedUser = localStorage.getItem('user')
      
      // No token - not logged in
      if (!storedToken) {
        dispatch(setLoading(false))
        return
      }
      
      // Already have user in Redux - no need to restore
      if (isAuthenticated) {
        dispatch(setLoading(false))
        return
      }
      
      // Try to restore session
      try {
        // First, try to verify the token
        const response = await api.post('/auth/verify-token')
        
        if (response.data?.success && response.data?.data?.valid) {
          // Token valid - restore user from localStorage
          const user = JSON.parse(storedUser)
          dispatch(setUser({
            user,
            token: storedToken,
            refreshToken: localStorage.getItem('refreshToken')
          }))
          console.log('✅ Session restored on refresh')
        } else {
          // Token invalid - try to refresh
          const refreshTokenStored = localStorage.getItem('refreshToken')
          if (refreshTokenStored) {
            const refreshResponse = await api.post('/auth/refresh-token', { refreshToken: refreshTokenStored })
            
            if (refreshResponse.data?.success) {
              const newToken = refreshResponse.data.data?.token || refreshResponse.data.token
              if (newToken) {
                dispatch(setToken(newToken))
                // Get fresh user data
                const profileResponse = await api.get('/auth/me')
                if (profileResponse.data?.success) {
                  const userData = profileResponse.data.data?.user || profileResponse.data.user
                  dispatch(setUser({
                    user: userData,
                    token: newToken,
                    refreshToken: refreshTokenStored
                  }))
                  console.log('✅ Token refreshed and session restored')
                }
              }
            } else {
              throw new Error('Refresh failed')
            }
          } else {
            throw new Error('No refresh token')
          }
        }
      } catch (error) {
        console.error('Session restoration failed:', error)
        dispatch(logout())
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login'
        }
      } finally {
        dispatch(setLoading(false))
      }
    }
    
    restoreSession()
  }, [dispatch, isAuthenticated])

  return children
}