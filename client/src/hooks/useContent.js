import { useSelector, useDispatch } from 'react-redux'
import { useCallback } from 'react'
import {
  setPoems, setAuthors, setBooks, setVideos,
  setTrending, setFeatured, setSearchResults,
  setCurrentContent, setLoading, setError
} from '../store/slices/contentSlice.js'
import contentAPI from '../services/contentService.js'

export const useContent = () => {
  const dispatch = useDispatch()
  const content = useSelector((state) => state.content)

  const fetchPoems = useCallback(async (params = {}) => {
    dispatch(setLoading(true))
    try {
      const { data } = await contentAPI.getPoems(params)
      dispatch(setPoems(data))
      return data
    } catch (error) {
      dispatch(setError(error.message))
      throw error
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch])

  const fetchAuthors = useCallback(async (params = {}) => {
    dispatch(setLoading(true))
    try {
      const { data } = await contentAPI.getAuthors(params)
      dispatch(setAuthors(data))
      return data
    } catch (error) {
      dispatch(setError(error.message))
      throw error
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch])

  const fetchBooks = useCallback(async (params = {}) => {
    dispatch(setLoading(true))
    try {
      const { data } = await contentAPI.getBooks(params)
      dispatch(setBooks(data))
      return data
    } catch (error) {
      dispatch(setError(error.message))
      throw error
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch])

  const fetchTrending = useCallback(async (type) => {
    try {
      const { data } = await contentAPI.getTrending(type)
      dispatch(setTrending({ [type]: data }))
      return data
    } catch (error) {
      dispatch(setError(error.message))
      throw error
    }
  }, [dispatch])

  const fetchFeatured = useCallback(async () => {
    try {
      const { data } = await contentAPI.getFeatured()
      dispatch(setFeatured(data))
      return data
    } catch (error) {
      dispatch(setError(error.message))
      throw error
    }
  }, [dispatch])

  const searchContent = useCallback(async (query, filters = {}) => {
    dispatch(setLoading(true))
    try {
      const { data } = await contentAPI.search(query, filters)
      dispatch(setSearchResults(data))
      return data
    } catch (error) {
      dispatch(setError(error.message))
      throw error
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch])

  return {
    ...content,
    fetchPoems,
    fetchAuthors,
    fetchBooks,
    fetchTrending,
    fetchFeatured,
    searchContent,
  }
}

export default useContent