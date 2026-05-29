import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice.js'
import uiReducer from './slices/uiSlice.js'
import contentReducer from './slices/contentSlice.js'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    content: contentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setUser'],
      },
    }),
})

export default store