
//client/src/store/slices/uiSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarOpen: false,
  theme: localStorage.getItem('theme') || 'light',
  language: localStorage.getItem('language') || 'en',
  notifications: [],
  modal: {
    isOpen: false,
    type: null,
    data: null,
  },
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setTheme: (state, action) => {
      state.theme = action.payload
      localStorage.setItem('theme', action.payload)
    },
    setLanguage: (state, action) => {
      state.language = action.payload
      localStorage.setItem('language', action.payload)
    },
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload)
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload)
    },
    openModal: (state, action) => {
      state.modal = { isOpen: true, ...action.payload }
    },
    closeModal: (state) => {
      state.modal = { isOpen: false, type: null, data: null }
    },
  },
})

export const { toggleSidebar, setTheme, setLanguage, addNotification, removeNotification, openModal, closeModal } = uiSlice.actions
export default uiSlice.reducer