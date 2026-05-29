
// //client/src/pages/auth/RegisterPage.jsx
// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { useDispatch } from 'react-redux'
// import { motion } from 'framer-motion'
// import { UserPlus, Mail, Lock, Eye, EyeOff, User } from 'lucide-react'
// import { setUser, setLoading, setError } from '../../store/slices/authSlice.js'
// import authAPI from '../../services/authService.js'
// import toast from 'react-hot-toast'

// const RegisterPage = () => {
//   const { t } = useTranslation()
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   })
//   const [errors, setErrors] = useState({})

//   const validate = () => {
//     const newErrors = {}
//     if (!formData.name) newErrors.name = 'Name is required'
//     if (!formData.email) newErrors.email = 'Email is required'
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email'
//     if (!formData.password) newErrors.password = 'Password is required'
//     else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
//     if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!validate()) return

//     dispatch(setLoading(true))
//     try {
//       const { data } = await authAPI.register({
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//       })
//       dispatch(setUser(data))
//       toast.success(t('auth.registerSuccess'))
//       navigate('/dashboard')
//     } catch (error) {
//       dispatch(setError(error.response?.data?.message || 'Registration failed'))
//       toast.error(error.response?.data?.message || 'Registration failed')
//     } finally {
//       dispatch(setLoading(false))
//     }
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
//             <UserPlus className="h-8 w-8 text-primary-600" />
//             <span className="text-2xl font-bold text-gray-900">Zauq</span>
//           </Link>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('auth.createAccount')}</h1>
//           <p className="text-gray-600">Join our literary community</p>
//         </div>

//         <div className="card p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 {t('auth.name')}
//               </label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   className={`input-field pl-10 ${errors.name ? 'border-red-500' : ''}`}
//                   placeholder="John Doe"
//                 />
//               </div>
//               {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
//             </div>

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
//                   className={`input-field pl-10 ${errors.email ? 'border-red-500' : ''}`}
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
//                   className={`input-field pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
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

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 {t('auth.confirmPassword')}
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   value={formData.confirmPassword}
//                   onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
//                   className={`input-field pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
//                   placeholder="••••••••"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                 </button>
//               </div>
//               {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
//             </div>

//             <div className="flex items-center">
//               <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
//               <span className="ml-2 text-sm text-gray-600">
//                 I agree to the <Link to="/terms" className="text-primary-600 hover:text-primary-700">Terms</Link> and{' '}
//                 <Link to="/privacy" className="text-primary-600 hover:text-primary-700">Privacy Policy</Link>
//               </span>
//             </div>

//             <button type="submit" className="w-full btn-primary py-3">
//               {t('common.register')}
//             </button>
//           </form>
//         </div>

//         <p className="text-center mt-6 text-sm text-gray-600">
//           {t('auth.alreadyHaveAccount')}{' '}
//           <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
//             {t('common.login')}
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   )
// }

// export default RegisterPage








// client/src/pages/auth/RegisterPage.jsx
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { UserPlus, Mail, Lock, Eye, EyeOff, User, ArrowRight, AlertCircle, Loader2, Check } from 'lucide-react'
import { setUser, setLoading, setError, clearError } from '../../store/slices/authSlice.js'
import authAPI from '../../services/authService.js'
import toast from 'react-hot-toast'

const RegisterPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error: reduxError } = useSelector((state) => state.auth)
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  })
  const [fieldErrors, setFieldErrors] = useState({})
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  const checkPasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 6) strength += 1
    if (password.length >= 10) strength += 1
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1
    if (/\d/.test(password)) strength += 1
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1
    setPasswordStrength(strength)
  }

  const validate = () => {
    const errors = {}
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters'
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email'
    }
    
    if (!formData.password) {
      errors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }
    
    if (!formData.agreeTerms) {
      errors.terms = 'You must agree to the terms'
    }
    
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value
    
    setFormData(prev => ({ ...prev, [name]: newValue }))
    
    if (name === 'password') {
      checkPasswordStrength(value)
    }
    
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }))
    }
    if (reduxError) dispatch(clearError())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    dispatch(setLoading(true))
    dispatch(clearError())

    try {
      const response = await authAPI.register({
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password
      })
      
      if (response.token) {
        localStorage.setItem('token', response.token)
      }
      
      dispatch(setUser(response))
      toast.success(t('auth.registerSuccess') || 'Account created successfully!')
      navigate('/dashboard')
      
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Registration failed'
      dispatch(setError(message))
      toast.error(message)
    } finally {
      setIsSubmitting(false)
      dispatch(setLoading(false))
    }
  }

  const strengthConfig = [
    { width: '0%', color: 'bg-gray-200', label: '' },
    { width: '20%', color: 'bg-red-500', label: 'Weak' },
    { width: '40%', color: 'bg-orange-500', label: 'Fair' },
    { width: '60%', color: 'bg-yellow-500', label: 'Good' },
    { width: '80%', color: 'bg-blue-500', label: 'Strong' },
    { width: '100%', color: 'bg-green-500', label: 'Very Strong' }
  ]

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
              <UserPlus className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">ZauqApp</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{t('auth.createAccount') || 'Create Account'}</h1>
          <p className="text-gray-500 mt-1">Join our literary community</p>
        </div>

        {/* Error Alert */}
        {reduxError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2"
          >
            <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{reduxError}</p>
          </motion.div>
        )}

        {/* Register Form */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t('auth.name') || 'Full Name'}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-colors ${
                    fieldErrors.name 
                      ? 'border-red-300 focus:ring-red-200 focus:border-red-400' 
                      : 'border-gray-200 focus:ring-primary-100 focus:border-primary-400'
                  }`}
                  placeholder="John Doe"
                  autoComplete="name"
                />
              </div>
              {fieldErrors.name && <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>}
            </div>

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
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              
              {/* Password Strength */}
              {formData.password && (
                <div className="mt-2">
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${strengthConfig[passwordStrength].color} transition-all duration-300`}
                      style={{ width: strengthConfig[passwordStrength].width }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {strengthConfig[passwordStrength].label}
                  </p>
                </div>
              )}
              
              {fieldErrors.password && <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t('auth.confirmPassword') || 'Confirm Password'}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-10 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-colors ${
                    fieldErrors.confirmPassword 
                      ? 'border-red-300 focus:ring-red-200 focus:border-red-400' 
                      : 'border-gray-200 focus:ring-primary-100 focus:border-primary-400'
                  }`}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {fieldErrors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.confirmPassword}</p>
              )}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-600 leading-relaxed">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary-600 hover:text-primary-700 font-medium">Terms of Service</Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-primary-600 hover:text-primary-700 font-medium">Privacy Policy</Link>
                </span>
              </label>
              {fieldErrors.terms && <p className="text-red-500 text-xs mt-1">{fieldErrors.terms}</p>}
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
                  <span>{t('common.register') || 'Create Account'}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600">
          {t('auth.alreadyHaveAccount') || 'Already have an account?'}{' '}
          <Link to="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
            {t('common.login') || 'Sign in'}
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default RegisterPage