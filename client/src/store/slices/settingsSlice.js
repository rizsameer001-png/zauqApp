// client/src/store/slices/settingsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: localStorage.getItem('theme') || 'light',
  primaryColor: localStorage.getItem('primaryColor') || '#8B5CF6',
  secondaryColor: localStorage.getItem('secondaryColor') || '#F59E0B',
  fontFamily: localStorage.getItem('fontFamily') || 'Inter, system-ui, sans-serif',
  adsEnabled: localStorage.getItem('adsEnabled') !== 'false',
  notificationsEnabled: localStorage.getItem('notificationsEnabled') !== 'false',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    setPrimaryColor: (state, action) => {
      state.primaryColor = action.payload;
      localStorage.setItem('primaryColor', action.payload);
    },
    setSecondaryColor: (state, action) => {
      state.secondaryColor = action.payload;
      localStorage.setItem('secondaryColor', action.payload);
    },
    setFontFamily: (state, action) => {
      state.fontFamily = action.payload;
      localStorage.setItem('fontFamily', action.payload);
    },
    setAdsEnabled: (state, action) => {
      state.adsEnabled = action.payload;
      localStorage.setItem('adsEnabled', action.payload);
    },
    setNotificationsEnabled: (state, action) => {
      state.notificationsEnabled = action.payload;
      localStorage.setItem('notificationsEnabled', action.payload);
    },
  },
});

export const {
  setTheme,
  setPrimaryColor,
  setSecondaryColor,
  setFontFamily,
  setAdsEnabled,
  setNotificationsEnabled,
} = settingsSlice.actions;

export default settingsSlice.reducer;