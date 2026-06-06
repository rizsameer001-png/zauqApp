//client/src/store/slices/authSlice.js


// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//   user: null,
//   isAuthenticated: false,
//   isLoading: false,
//   error: null,
//   token: localStorage.getItem('token') || null,
// }

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload
//       state.isAuthenticated = !!action.payload
//       if (action.payload?.token) {
//         state.token = action.payload.token
//         localStorage.setItem('token', action.payload.token)
//       }
//     },
//     logout: (state) => {
//       state.user = null
//       state.isAuthenticated = false
//       state.token = null
//       localStorage.removeItem('token')
//     },
//     setLoading: (state, action) => {
//       state.isLoading = action.payload
//     },
//     setError: (state, action) => {
//       state.error = action.payload
//     },
//     clearError: (state) => {
//       state.error = null
//     },
//   },
// })

// export const { setUser, logout, setLoading, setError, clearError } = authSlice.actions
// export default authSlice.reducer


// //client/src/store/slices/authSlice.js
// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//   user: null,
//   isAuthenticated: false,
//   isLoading: false,
//   error: null,
//   token: localStorage.getItem('token') || null,
// }

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     // ✅ Set full user (login/register)
//     setUser: (state, action) => {
//       state.user = action.payload
//       state.isAuthenticated = !!action.payload

//       if (action.payload?.token) {
//         state.token = action.payload.token
//         localStorage.setItem('token', action.payload.token)
//       }
//     },

//     // ✅ Update partial user (profile/avatar updates)
//     updateUser: (state, action) => {
//       if (state.user) {
//         state.user = {
//           ...state.user,
//           ...action.payload,
//         }
//       }
//     },

//     // ✅ Logout
//     logout: (state) => {
//       state.user = null
//       state.isAuthenticated = false
//       state.token = null
//       localStorage.removeItem('token')
//     },

//     // ✅ Loading state
//     setLoading: (state, action) => {
//       state.isLoading = action.payload
//     },

//     // ✅ Error handling
//     setError: (state, action) => {
//       state.error = action.payload
//     },

//     clearError: (state) => {
//       state.error = null
//     },
//   },
// })

// // ✅ Export actions
// export const {
//   setUser,
//   updateUser,   // ⭐ IMPORTANT (fixes your error)
//   logout,
//   setLoading,
//   setError,
//   clearError,
// } = authSlice.actions

// // ✅ Export reducer
// export default authSlice.reducer






















// client/src/store/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit'

// Helper to load initial state from localStorage
const loadInitialState = () => {
  try {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    const refreshToken = localStorage.getItem('refreshToken')
    
    return {
      user: user ? JSON.parse(user) : null,
      isAuthenticated: !!token && !!user,
      isLoading: false,
      error: null,
      token: token || null,
      refreshToken: refreshToken || null,
    }
  } catch {
    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      token: null,
      refreshToken: null,
    }
  }
}

const initialState = loadInitialState()

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token, refreshToken } = action.payload
      
      state.user = user
      state.isAuthenticated = !!user
      state.token = token || null
      state.refreshToken = refreshToken || null
      
      // Persist to localStorage
      if (user) localStorage.setItem('user', JSON.stringify(user))
      if (token) localStorage.setItem('token', token)
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken)
    },
    
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
        localStorage.setItem('user', JSON.stringify(state.user))
      }
    },
    
    setToken: (state, action) => {
      state.token = action.payload
      if (action.payload) localStorage.setItem('token', action.payload)
    },
    
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.token = null
      state.refreshToken = null
      
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('refreshToken')
    },
    
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    
    setError: (state, action) => {
      state.error = action.payload
    },
    
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { setUser, updateUser, setToken, logout, setLoading, setError, clearError } = authSlice.actions
export default authSlice.reducer