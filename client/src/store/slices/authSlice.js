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


//client/src/store/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  token: localStorage.getItem('token') || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // ✅ Set full user (login/register)
    setUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = !!action.payload

      if (action.payload?.token) {
        state.token = action.payload.token
        localStorage.setItem('token', action.payload.token)
      }
    },

    // ✅ Update partial user (profile/avatar updates)
    updateUser: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        }
      }
    },

    // ✅ Logout
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.token = null
      localStorage.removeItem('token')
    },

    // ✅ Loading state
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },

    // ✅ Error handling
    setError: (state, action) => {
      state.error = action.payload
    },

    clearError: (state) => {
      state.error = null
    },
  },
})

// ✅ Export actions
export const {
  setUser,
  updateUser,   // ⭐ IMPORTANT (fixes your error)
  logout,
  setLoading,
  setError,
  clearError,
} = authSlice.actions

// ✅ Export reducer
export default authSlice.reducer