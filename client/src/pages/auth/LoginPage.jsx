// //client/src/pages/auth/LoginPage.jsx
// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { useDispatch } from 'react-redux'
// import { motion } from 'framer-motion'
// import { LogIn, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
// import { setUser, setLoading, setError } from '../../store/slices/authSlice.js'
// import authAPI from '../../services/authService.js'
// import toast from 'react-hot-toast'

// const LoginPage = () => {
//   const { t } = useTranslation()
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const [showPassword, setShowPassword] = useState(false)
//   const [formData, setFormData] = useState({ email: '', password: '' })
//   const [errors, setErrors] = useState({})

//   const validate = () => {
//     const newErrors = {}
//     if (!formData.email) newErrors.email = 'Email is required'
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email'
//     if (!formData.password) newErrors.password = 'Password is required'
//     else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!validate()) return

//     dispatch(setLoading(true))
//     try {
//       const { data } = await authAPI.login(formData)
//       dispatch(setUser(data))
//       toast.success(t('auth.welcomeBack'))
//       navigate('/dashboard')
//     } catch (error) {
//       dispatch(setError(error.response?.data?.message || 'Login failed'))
//       toast.error(error.response?.data?.message || 'Login failed')
//     } finally {
//       dispatch(setLoading(false))
//     }
//   }

//   const handleGoogleLogin = () => {
//     // Google OAuth implementation
//     toast.info('Google login coming soon')
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-md w-full"
//       >
//         <div className="text-center mb-8">
//           <Link to="/" className="inline-flex items-center space-x-2 mb-6">
//             <LogIn className="h-8 w-8 text-primary-600" />
//             <span className="text-2xl font-bold text-gray-900">Zauq</span>
//           </Link>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('auth.welcomeBack')}</h1>
//           <p className="text-gray-600">Sign in to your account</p>
//         </div>

//         <div className="card p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 {t('auth.email')}
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   className={`input-field pl-10 ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
//                   placeholder="you@example.com"
//                 />
//               </div>
//               {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 {t('auth.password')}
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   value={formData.password}
//                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                   className={`input-field pl-10 pr-10 ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
//                   placeholder="••••••••"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                 </button>
//               </div>
//               {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//             </div>

//             <div className="flex items-center justify-between">
//               <label className="flex items-center space-x-2">
//                 <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
//                 <span className="text-sm text-gray-600">Remember me</span>
//               </label>
//               <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700">
//                 {t('auth.forgotPassword')}
//               </Link>
//             </div>

//             <button type="submit" className="w-full btn-primary py-3">
//               {t('common.login')}
//             </button>
//           </form>

//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-200" />
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">{t('auth.orContinueWith')}</span>
//               </div>
//             </div>

//             <button
//               onClick={handleGoogleLogin}
//               className="mt-4 w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5" />
//               <span className="text-sm font-medium text-gray-700">{t('auth.googleSignIn')}</span>
//             </button>
//           </div>
//         </div>

//         <p className="text-center mt-6 text-sm text-gray-600">
//           {t('auth.dontHaveAccount')}{' '}
//           <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
//             {t('common.register')}
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   )
// }

// export default LoginPage







// client/src/pages/auth/LoginPage.jsx
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { LogIn, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Loader2 } from 'lucide-react'
import { setUser, setLoading, setError, clearError } from '../../store/slices/authSlice.js'
import authAPI from '../../services/authService.js'
import toast from 'react-hot-toast'

const TEST_ACCOUNTS = [
  { email: 'admin@zauqapp.com', password: '12345678', label: 'Admin', color: 'bg-red-50 text-red-700 hover:bg-red-100' },
  { email: 'moderator@zauqapp.com', password: '12345678', label: 'Moderator', color: 'bg-orange-50 text-orange-700 hover:bg-orange-100' },
  { email: 'creator@zauqapp.com', password: '12345678', label: 'Creator', color: 'bg-blue-50 text-blue-700 hover:bg-blue-100' },
  { email: 'john@example.com', password: '12345678', label: 'User', color: 'bg-green-50 text-green-700 hover:bg-green-100' },
]

const LoginPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { isLoading, error: reduxError } = useSelector((state) => state.auth)
  
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [fieldErrors, setFieldErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Clear Redux error on mount
  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  // Pre-fill email from registration redirect
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const email = params.get('email')
    if (email) setFormData(prev => ({ ...prev, email }))
  }, [location])

  const validate = () => {
    const newErrors = {}
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    }
    setFieldErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear field error when user types
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }))
    }
    // Clear Redux error
    if (reduxError) dispatch(clearError())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    dispatch(setLoading(true))
    dispatch(clearError())

    try {
      const response = await authAPI.login(formData)
      
      // Store token
      if (response.token) {
        localStorage.setItem('token', response.token)
      }
      
      // Update Redux store
      // dispatch(setUser(response))
      dispatch(setUser({
        ...response.user,
        token: response.token
      }))
      
      toast.success(t('auth.welcomeBack') || 'Welcome back!')
      
      // Redirect
      // const from = location.state?.from?.pathname || '/dashboard'
      // navigate(from, { replace: true })

      // ✅ FIXED ROLE-BASED REDIRECT
        const user = response.user || response; // depends on your API shape
        const role = user.role;

        let redirectPath = '/dashboard';

        if (role === 'admin') {
          redirectPath = '/admin/dashboard';
        } else if (role === 'moderator') {
          redirectPath = '/moderator/dashboard';
        } else if (role === 'creator') {
          redirectPath = '/creator/dashboard';
        }

        navigate(redirectPath, { replace: true });
      
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Login failed'
      dispatch(setError(message))
      toast.error(message)
    } finally {
      setIsSubmitting(false)
      dispatch(setLoading(false))
    }
  }

  const handleGoogleLogin = () => {
    authAPI.googleAuth?.() || toast.info('Google login coming soon')
  }

  const quickLogin = (email, password) => {
    setFormData({ email, password })
    toast.success(`Filled: ${email}`)
  }

  const isDev = import.meta.env.DEV

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full space-y-6"
      >
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <LogIn className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">ZauqApp</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{t('auth.welcomeBack') || 'Welcome Back'}</h1>
          <p className="text-gray-500 mt-1">Sign in to your account</p>
        </div>

        {/* Error Alert */}
        {(reduxError || fieldErrors.form) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2"
          >
            <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{reduxError || fieldErrors.form}</p>
          </motion.div>
        )}

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t('auth.email') || 'Email'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-colors ${
                    fieldErrors.email 
                      ? 'border-red-300 focus:ring-red-200 focus:border-red-400' 
                      : 'border-gray-200 focus:ring-primary-100 focus:border-primary-400'
                  }`}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
              {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t('auth.password') || 'Password'}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-10 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-colors ${
                    fieldErrors.password 
                      ? 'border-red-300 focus:ring-red-200 focus:border-red-400' 
                      : 'border-gray-200 focus:ring-primary-100 focus:border-primary-400'
                  }`}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {fieldErrors.password && <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" 
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-primary-600 hover:text-primary-700 font-medium">
                {t('auth.forgotPassword') || 'Forgot password?'}
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <span>{t('common.login') || 'Sign In'}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-gray-400">or continue with</span>
            </div>
          </div>

          {/* Google */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="font-medium text-gray-700">Google</span>
          </button>
        </div>

        {/* Test Accounts (Dev Only) */}
        {isDev && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Test Accounts</p>
            <div className="grid grid-cols-2 gap-2">
              {TEST_ACCOUNTS.map((account) => (
                <button
                  key={account.email}
                  type="button"
                  onClick={() => quickLogin(account.email, account.password)}
                  className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${account.color}`}
                >
                  <span className="font-bold">{account.label}</span>
                  <span className="block opacity-75 truncate text-[10px]">{account.email}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600">
          {t('auth.dontHaveAccount') || "Don't have an account?"}{' '}
          <Link to="/register" className="text-primary-600 hover:text-primary-700 font-semibold">
            {t('common.register') || 'Create one'}
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default LoginPage