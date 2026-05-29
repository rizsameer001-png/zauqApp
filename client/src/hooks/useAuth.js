
//client/src/hooks/useAuth.js
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import { logout } from '../store/slices/authSlice.js'

export const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isAuthenticated, isLoading, error } = useSelector((state) => state.auth)

  const handleLogout = useCallback(() => {
    dispatch(logout())
    navigate('/')
  }, [dispatch, navigate])

  const hasRole = useCallback((role) => {
    return user?.role === role || user?.roles?.includes(role)
  }, [user])

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    isAdmin: hasRole('admin'),
    isCreator: hasRole('creator'),
    isUser: hasRole('user'),
    logout: handleLogout,
    hasRole,
  }
}

export default useAuth