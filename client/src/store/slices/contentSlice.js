
//client/src/store/slices/contentSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  poems: [],
  authors: [],
  books: [],
  videos: [],
  categories: [],
  trending: {
    poems: [],
    authors: [],
    books: [],
  },
  featured: {
    poem: null,
    author: null,
    book: null,
  },
  searchResults: [],
  currentContent: null,
  loading: false,
  error: null,
}

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setPoems: (state, action) => {
      state.poems = action.payload
    },
    setAuthors: (state, action) => {
      state.authors = action.payload
    },
    setBooks: (state, action) => {
      state.books = action.payload
    },
    setVideos: (state, action) => {
      state.videos = action.payload
    },
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    setTrending: (state, action) => {
      state.trending = { ...state.trending, ...action.payload }
    },
    setFeatured: (state, action) => {
      state.featured = { ...state.featured, ...action.payload }
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload
    },
    setCurrentContent: (state, action) => {
      state.currentContent = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    addPoem: (state, action) => {
      state.poems.unshift(action.payload)
    },
    updatePoem: (state, action) => {
      const index = state.poems.findIndex(p => p._id === action.payload._id)
      if (index !== -1) state.poems[index] = action.payload
    },
    deletePoem: (state, action) => {
      state.poems = state.poems.filter(p => p._id !== action.payload)
    },
  },
})

export const {
  setPoems, setAuthors, setBooks, setVideos, setCategories,
  setTrending, setFeatured, setSearchResults, setCurrentContent,
  setLoading, setError, addPoem, updatePoem, deletePoem
} = contentSlice.actions
export default contentSlice.reducer